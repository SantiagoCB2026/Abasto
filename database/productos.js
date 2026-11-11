import * as SQLite from 'expo-sqlite';

// Productos iniciales con los que se siembra la tabla la primera vez
const PRODUCTOS_INICIALES = [
  { nombre: 'Arroz Diana 500g', existencia: 12 },
  { nombre: 'Aceite Girasol 1L', existencia: 5 },
  { nombre: 'Panela cuadrada', existencia: 20 },
  { nombre: 'Gaseosa Postobón 400ml', existencia: 30 },
  { nombre: 'Jabón Rey', existencia: 9 },
  { nombre: 'Huevos AA', existencia: 15 },
  { nombre: 'Chocolate Sol', existencia: 41 },
  { nombre: 'Salsa de tomate Fruco', existencia: 28 },
  { nombre: "Atún Van Camp's", existencia: 35 },
  { nombre: 'Gelatina Royal', existencia: 22 },
  { nombre: 'Caldo Knorr', existencia: 60 },
];

// 1) Abre (o crea si no existe) el archivo de base de datos de la app
export async function abrirBD() {
  return SQLite.openDatabaseAsync('abasto.db');
}

// 2) Crea la tabla una sola vez; no falla si ya existía
export async function crearTablaProductos(db) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY NOT NULL,
      nombre TEXT NOT NULL,
      existencia INTEGER NOT NULL
    );
  `);
}

// 3) Si la tabla está vacía, la siembra con los productos iniciales
export async function sembrarProductosSiVacia(db) {
  const fila = await db.getFirstAsync('SELECT COUNT(*) as total FROM productos');
  if (fila.total > 0) return;

  for (const producto of PRODUCTOS_INICIALES) {
    await db.runAsync(
      'INSERT INTO productos (nombre, existencia) VALUES (?, ?)',
      producto.nombre,
      producto.existencia
    );
  }
}

// 4) Lee todos los productos guardados en la base de datos
export async function obtenerProductos(db) {
  return db.getAllAsync('SELECT * FROM productos ORDER BY id');
}

// 5) Para guardar el producto nuevo que se escribe en el formulario
export async function agregarProducto(db, nombre, existencia) {
  await db.runAsync(
    'INSERT INTO productos (nombre, existencia) VALUES (?, ?)',
    nombre,
    existencia
  );
}

// 6) Para borrar un producto, se busca por su id
export async function eliminarProducto(db, id) {
  await db.runAsync('DELETE FROM productos WHERE id = ?', id);
}

// Atajo: abre la BD, crea la tabla, la siembra si hace falta y devuelve los productos
export async function iniciarYCargarProductos() {
  const db = await abrirBD();
  await crearTablaProductos(db);
  await sembrarProductosSiVacia(db);
  return obtenerProductos(db);
}
