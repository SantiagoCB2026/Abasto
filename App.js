import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  abrirBD,
  agregarProducto,
  eliminarProducto,
  iniciarYCargarProductos,
  obtenerProductos,
} from './database/productos';
 
// Datos de ejemplo, los mismos del diseño en Figma
 
const PEDIDOS = [
  {
    id: '1',
    nombre: 'Arroz Diana 500g',
    cantidad: 12,
    razon: 'Se le acaba en 3 días',
    urgente: true,
  },
  {
    id: '2',
    nombre: 'Aceite Girasol 1L',
    cantidad: 8,
    razon: 'Se le acaba en 4 días',
    urgente: true,
  },
  {
    id: '3',
    nombre: 'Huevos AA',
    cantidad: 30,
    razon: 'Vende 10 por día',
    urgente: true,
  },
  {
    id: '4',
    nombre: 'Panela cuadrada',
    cantidad: 6,
    razon: 'Stock bajo la próxima semana',
    urgente: false,
  },
  {
    id: '5',
    nombre: 'Jabón Rey',
    cantidad: 4,
    razon: 'Se agota en 8 días',
    urgente: false,
  },
];
 
// Quita tildes y mayúsculas para que "jabon" encuentre "Jabón"
const normalizar = (texto) =>
  texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
 
// Pantalla 1: Qué pedir
 
function QuePedirScreen({ navigation }) {
  const renderTarjeta = ({ item }) => (
    <View style={[styles.card, item.urgente && styles.cardUrgente]}>
      <View style={styles.foto}>
        <Text style={styles.fotoInicial}>{item.nombre[0]}</Text>
      </View>
      <View style={styles.cardTexto}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.pedir}>Pedir {item.cantidad} unidades</Text>
        <Text style={styles.detalle}>{item.razon}</Text>
      </View>
    </View>
  );
 
  return (
    <SafeAreaView style={styles.pantalla}>
      <FlatList
        data={PEDIDOS}
        keyExtractor={(item) => item.id}
        renderItem={renderTarjeta}
        contentContainerStyle={styles.lista}
        ListHeaderComponent={
          <View style={styles.encabezado}>
            <Text style={styles.titulo}>Qué pedir</Text>
            <Text style={styles.subtitulo}>
              Según lo que se vendió las últimas semanas
            </Text>
          </View>
        }
        ListFooterComponent={
          // Elemento 1: botón con Pressable
          // Elemento 4: navigate() lleva a la pantalla "Inventario"
          <Pressable
            style={({ pressed }) => [
              styles.botonBorde,
              pressed && styles.botonPresionado,
            ]}
            onPress={() => navigation.navigate('Inventario')}
            accessibilityRole="button"
            accessibilityLabel="Ver todo el inventario"
          >
            <Text style={styles.botonBordeTexto}>Ver todo el inventario</Text>
          </Pressable>
        }
      />
    </SafeAreaView>
  );
}
 
// Pantalla 2: Inventario (ahora cargada desde SQLite)
 
function InventarioScreen() {
  const [busqueda, setBusqueda] = useState('');
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevaExistencia, setNuevaExistencia] = useState('');
  const [guardando, setGuardando] = useState(false);

  // Se ejecuta una sola vez, al montar la pantalla (no en cada render)
  useEffect(() => {
    iniciarYCargarProductos()
      .then((filas) => setProductos(filas))
      .catch((error) => console.log('Error cargando productos:', error))
      .finally(() => setCargando(false));
  }, []);

  // Inserta el producto del formulario y recarga la lista desde SQLite
  async function guardarNuevoProducto() {
    if (!nuevoNombre.trim() || !nuevaExistencia.trim()) return;

    setGuardando(true);
    try {
      const db = await abrirBD();
      await agregarProducto(db, nuevoNombre.trim(), parseInt(nuevaExistencia));
      const filas = await obtenerProductos(db);
      setProductos(filas);
      setNuevoNombre('');
      setNuevaExistencia('');
    } catch (error) {
      console.log('Error guardando producto:', error);
    } finally {
      setGuardando(false);
    }
  }

  // Cuando se toca Quitar: se borra de la base y se vuelve a cargar la lista
  async function quitarProducto(id) {
    try {
      const db = await abrirBD();
      await eliminarProducto(db, id);
      const filas = await obtenerProductos(db);
      setProductos(filas);
    } catch (error) {
      console.log('Error quitando producto:', error);
    }
  }
 
  const termino = normalizar(busqueda.trim());
  const resultados = productos.filter((p) => normalizar(p.nombre).includes(termino));
 
  const renderFila = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.foto}>
        <Text style={styles.fotoInicial}>{item.nombre[0]}</Text>
      </View>
      <View style={styles.cardTexto}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.detalle}>Existencia: {item.existencia} und</Text>
      </View>
      <Pressable
        style={styles.botonQuitar}
        onPress={() => quitarProducto(item.id)}
        accessibilityRole="button"
        accessibilityLabel={`Quitar ${item.nombre}`}
      >
        <Text style={styles.botonQuitarTexto}>Quitar</Text>
      </Pressable>
    </View>
  );
 
  if (cargando) {
    return (
      <View style={styles.cargandoContainer}>
        <ActivityIndicator size="large" color="#F4A62A" />
        <Text style={styles.cargandoTexto}>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.pantalla} edges={['left', 'right', 'bottom']}>
      <FlatList
        data={resultados}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderFila}
        contentContainerStyle={styles.lista}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        ListHeaderComponent={
          <View>
            {/* Elemento 2: campo de búsqueda con TextInput */}
            <TextInput
              style={styles.buscador}
              placeholder="Buscar producto"
              placeholderTextColor="#9FCFB7"
              value={busqueda}
              onChangeText={setBusqueda}
              autoCorrect={false}
              clearButtonMode="while-editing"
              returnKeyType="search"
              accessibilityLabel="Buscar producto por nombre"
            />

            <View style={styles.formNuevo}>
              <TextInput
                style={[styles.inputNuevo, { flex: 1.3 }]}
                value={nuevoNombre}
                onChangeText={setNuevoNombre}
                placeholder="Nombre del producto"
                placeholderTextColor="#9FCFB7"
              />
              <TextInput
                style={[styles.inputNuevo, { flex: 0.7 }]}
                value={nuevaExistencia}
                onChangeText={setNuevaExistencia}
                placeholder="Cantidad"
                placeholderTextColor="#9FCFB7"
                keyboardType="numeric"
              />
              <Pressable
                style={[styles.botonAgregar, guardando && { opacity: 0.6 }]}
                onPress={guardarNuevoProducto}
                disabled={guardando}
              >
                <Text style={styles.botonAgregarTexto}>{guardando ? '...' : '+ Agregar'}</Text>
              </Pressable>
            </View>
            <Text style={styles.contador}>
              {termino === ''
                ? `${productos.length} productos`
                : `${resultados.length} de ${productos.length} productos`}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.vacio}>
            No hay productos que coincidan con «{busqueda.trim()}»
          </Text>
        }
      />
    </SafeAreaView>
  );
}
 
// Elemento 3: Stack Navigator con 2 pantallas
 
const Stack = createNativeStackNavigator();
 
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="QuePedir"
          screenOptions={{
            headerStyle: { backgroundColor: '#1B4332' },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: 'bold' },
            headerShadowVisible: false,
            contentStyle: { backgroundColor: '#1B4332' },
          }}
        >
          <Stack.Screen
            name="QuePedir"
            component={QuePedirScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Inventario"
            component={InventarioScreen}
            options={{ title: 'Inventario', headerBackTitle: 'Qué pedir' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
 
// Estilos (paleta de Abasto)
 
const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#1B4332' },
  lista: { padding: 20, paddingBottom: 40 },
 
  encabezado: { marginBottom: 16 },
  titulo: { fontSize: 30, fontWeight: 'bold', color: '#FFFFFF' },
  subtitulo: { fontSize: 15, color: '#D1F2E0', marginTop: 4 },
 
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D6A4F',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  cardUrgente: { borderLeftWidth: 6, borderLeftColor: '#F4A62A' },
  foto: {
    width: 72,
    height: 72,
    borderRadius: 14,
    backgroundColor: '#D1F2E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  fotoInicial: { fontSize: 32, fontWeight: 'bold', color: '#1B4332' },
  cardTexto: { flex: 1 },
  nombre: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
  pedir: { fontSize: 16, fontWeight: 'bold', color: '#F4A62A', marginTop: 4 },
  detalle: { fontSize: 14, color: '#D1F2E0', marginTop: 4 },
 
  botonBorde: {
    minHeight: 56,
    borderWidth: 2,
    borderColor: '#F4A62A',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  botonPresionado: { backgroundColor: '#2D6A4F' },
  botonBordeTexto: { fontSize: 17, fontWeight: 'bold', color: '#F4A62A' },
 
  buscador: {
    minHeight: 52,
    backgroundColor: '#2D6A4F',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 17,
    color: '#FFFFFF',
  },
  formNuevo: { flexDirection: 'row', gap: 8, marginTop: 12 },
  inputNuevo: {
    minHeight: 48,
    backgroundColor: '#2D6A4F',
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#FFFFFF',
  },
  botonAgregar: {
    backgroundColor: '#F4A62A',
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonAgregarTexto: { fontSize: 15, fontWeight: 'bold', color: '#1B4332' },
  botonQuitar: {
    borderWidth: 1,
    borderColor: '#F4A62A',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginLeft: 8,
  },
  botonQuitarTexto: { fontSize: 13, fontWeight: 'bold', color: '#F4A62A' },
  contador: { fontSize: 14, color: '#D1F2E0', marginTop: 12, marginBottom: 14 },
  cargandoContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1B4332' },
  cargandoTexto: { marginTop: 12, color: '#D1F2E0', fontSize: 14 },
  vacio: { fontSize: 16, color: '#D1F2E0', textAlign: 'center', marginTop: 24 },
});
