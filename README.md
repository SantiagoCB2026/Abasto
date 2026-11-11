# Abasto

Aplicación móvil para el dueño de una tienda de barrio. Le muestra qué productos tiene que pedir y cuánto le queda de cada uno. Todo se maneja en unidades: la app no muestra precios ni maneja dinero.

Proyecto de la asignatura Desarrollo de Aplicaciones Móviles, Ingeniería de Sistemas, Uniciencia (2026).
Autor: Santiago Castillo Barrios.

## Qué hace

- **Qué pedir:** lista de los productos que se están acabando, con cuántas unidades conviene pedir. Por ahora usa datos de ejemplo.
- **Inventario:** lista de todos los productos con su existencia, guardada en una base de datos SQLite en el celular.
  - Buscador por nombre (no distingue tildes ni mayúsculas).
  - Formulario para agregar un producto con su nombre y cantidad.
  - Botón Quitar en cada producto.

Los datos quedan guardados en el celular, así que la app funciona sin internet y no se pierden al cerrarla.

## Tecnologías

- React Native con Expo (SDK 58)
- React Navigation (Stack Navigator)
- expo-sqlite para la base de datos local

## Estructura

```
Abasto/
├── App.js                 Pantallas Qué pedir e Inventario, y la navegación
├── database/
│   └── productos.js       Conexión a SQLite: crear la tabla, sembrar, leer, agregar y eliminar
├── assets/                Íconos de la app
├── app.json               Configuración de Expo
└── package.json           Dependencias del proyecto
```

## Requisitos

- [Node.js](https://nodejs.org) en versión LTS.
- La app **Expo Go** en el celular (Google Play o App Store), o un emulador de Android (ver más abajo).

## Instalación

1. Clonar el repositorio:

   ```
   git clone https://github.com/SantiagoCB2026/Abasto.git
   cd Abasto
   ```

2. Instalar las dependencias:

   ```
   npm install
   ```

## Cómo ejecutarlo

```
npx expo start
```

En la terminal aparece un código QR.

### En el celular

- **Android:** abrir Expo Go y tocar *Scan QR code*.
- **iPhone:** apuntar la cámara al código QR y tocar la notificación.

El celular y el computador deben estar en la misma red Wi-Fi. Si la red no deja conectar (pasa en algunas redes de universidad), usar:

```
npx expo start --tunnel
```

### En un emulador de Android

1. Instalar [Android Studio](https://developer.android.com/studio).
2. En Android Studio, abrir **Device Manager** y crear un dispositivo virtual (por ejemplo, un *Medium Phone* con una versión reciente de Android).
3. Encender el emulador y dejarlo abierto.
4. Correr `npx expo start` y presionar la tecla **a** en la terminal. Expo instala Expo Go en el emulador y abre la app.

En Windows no hay simulador de iOS; para iOS se necesita un Mac con Xcode (tecla **i**).

### En Expo Snack

El código también se puede pegar en [snack.expo.dev](https://snack.expo.dev) agregando la dependencia `expo-sqlite`. La base de datos no funciona en la vista **Web** de Snack: hay que abrirla en la pestaña Android o iOS.

## Cómo usarla

1. La app abre en **Qué pedir**.
2. Tocar **Ver todo el inventario** para ir al inventario. La primera vez se crean los 11 productos de ejemplo.
3. Escribir en el buscador para filtrar productos.
4. Para agregar un producto, escribir el nombre y la cantidad y tocar **+ Agregar**.
5. Para quitar un producto, tocar **Quitar** en su tarjeta.
6. Con la flecha del encabezado se vuelve a Qué pedir.
