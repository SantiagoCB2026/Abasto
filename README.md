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

Antes de empezar se necesita:

- Node.js en versión LTS (nodejs.org).
- Git, si se va a clonar el repositorio.
- La app Expo Go en el celular (Google Play o App Store).

**1. Obtener el proyecto.** Se puede clonar:

```
git clone https://github.com/SantiagoCB2026/Abasto.git
cd Abasto
```

O descargarlo desde GitHub con el botón Code → Download ZIP, descomprimirlo y abrir la carpeta en VS Code.

**2. Instalar las dependencias.** En la terminal, dentro de la carpeta del proyecto:

```
npm install
```

Esto descarga las librerías que usa la app (React Navigation, expo-sqlite, etc.). Puede tardar uno o dos minutos.

**3. Iniciar el proyecto:**

```
npx expo start
```

En la terminal aparece un código QR.

## Abrir la app

**En el celular.** Abrir Expo Go y escanear el código QR (en iPhone se escanea con la cámara). El celular y el computador tienen que estar conectados a la misma red Wi-Fi.

**En el emulador de Android.**

1. Instalar Android Studio.
2. En Device Manager, crear un dispositivo virtual (por ejemplo, Medium Phone).
3. Encender el emulador y dejarlo abierto.
4. Con `npx expo start` corriendo, presionar la tecla `a` en la terminal. Expo instala Expo Go en el emulador y abre la app.

La primera vez tarda un poco mientras se arma la app. Al entrar al inventario sale "Cargando productos..." un momento, mientras SQLite crea la base de datos con los productos de ejemplo.

## Problemas comunes

- **El QR se queda cargando en el celular.** Pasa cuando la red bloquea la conexión, por ejemplo en la universidad. Se soluciona con el modo túnel: `npx expo start --tunnel`. Si pide iniciar sesión, se usa `npx expo login` con la cuenta de Expo, o se puede usar `npx expo start --tunnel ngrok`.
- **"Port 8081 is being used by another process".** Hay otro `expo start` abierto. Se cierra con Ctrl + C en esa terminal.
- **Expo Go dice que la versión no es compatible.** Hay que actualizar Expo Go, porque el proyecto usa el SDK 58.
- **"npm no se reconoce como comando".** Falta instalar Node.js o abrir una terminal nueva después de instalarlo.
- **La tecla `a` no encuentra el emulador.** Revisar que el emulador esté encendido. Si sigue igual, configurar la variable de entorno `ANDROID_HOME` con la ruta del SDK de Android (normalmente `C:\Users\<usuario>\AppData\Local\Android\Sdk`).
- **Expo Go se queda en "Downloading 99,8 %".** Cerrar Expo Go y volver a abrirlo, o presionar `r` en la terminal para recargar.

## Cómo se usa

Al abrir la app sale Qué pedir. Con el botón "Ver todo el inventario" se pasa al inventario, donde se puede buscar un producto, agregar uno nuevo con su nombre y cantidad, o quitarlo con el botón Quitar. Con la flecha de arriba se vuelve a la pantalla anterior.
