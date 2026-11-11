# Abasto

App móvil para el dueño de una tienda de barrio. Le muestra qué productos tiene que pedir y cuánto le queda de cada uno. Todo se maneja en unidades, la app no muestra precios.

Proyecto de Desarrollo de Aplicaciones Móviles - Ingeniería de Sistemas, Uniciencia 2026.
Santiago Castillo Barrios.

## Qué tiene

- Pantalla Qué pedir, con los productos que se están acabando (por ahora con datos de ejemplo).
- Pantalla Inventario, con todos los productos y su existencia. Tiene buscador, un formulario para agregar productos y un botón para quitarlos.

El inventario se guarda en una base de datos SQLite en el celular, así que funciona sin internet. La parte de la base de datos está en `database/productos.js` y las pantallas en `App.js`.

Hecho con React Native, Expo (SDK 58), React Navigation y expo-sqlite.

## Instalación

Antes de empezar hay que tener instalado Node.js (versión LTS), Git y la app Expo Go en el celular.

1. Clonar el repositorio (o descargarlo con Code → Download ZIP y abrir la carpeta en VS Code):

```
git clone https://github.com/SantiagoCB2026/Abasto.git
cd Abasto
```

2. Instalar las dependencias. Esto descarga React Navigation, expo-sqlite y lo demás que usa la app, y puede tardar un par de minutos:

```
npm install
```

3. Iniciar el proyecto:

```
npx expo start
```

En la terminal aparece un código QR.

## Abrir la app

En el celular: se abre Expo Go y se escanea el QR (en iPhone con la cámara). El celular y el computador tienen que estar en la misma red Wi-Fi.

En el emulador de Android: se instala Android Studio, se crea un dispositivo virtual en Device Manager y se enciende. Con `npx expo start` corriendo, se presiona la tecla `a` en la terminal y la app se abre en el emulador.

La primera vez se demora un poco en cargar. Al entrar al inventario sale "Cargando productos..." mientras se crea la base de datos con los productos de ejemplo.

## Problemas comunes

- Si el QR se queda cargando, casi siempre es la red (me pasó en la de la universidad). Se usa `npx expo start --tunnel`. Si pide iniciar sesión, se hace con `npx expo login`, o se puede usar `npx expo start --tunnel ngrok`.
- Si sale "Port 8081 is being used", es que hay otro `expo start` abierto. Hay que cerrarlo con Ctrl + C.
- Si Expo Go dice que la versión no es compatible, hay que actualizar Expo Go (el proyecto usa el SDK 58).
- Si "npm" no se reconoce, falta instalar Node.js o abrir una terminal nueva.
- Si la tecla `a` no encuentra el emulador, hay que revisar que esté encendido. Si sigue igual, toca configurar la variable `ANDROID_HOME` con la ruta del SDK de Android.
- Si Expo Go se queda en "Downloading 99,8 %", se cierra Expo Go y se vuelve a abrir, o se presiona `r` en la terminal.

## Cómo se usa

Al abrir la app sale Qué pedir. Con el botón "Ver todo el inventario" se pasa al inventario, donde se puede buscar un producto, agregar uno nuevo con su nombre y cantidad, o quitarlo con el botón Quitar. Con la flecha de arriba se vuelve a la pantalla anterior.
