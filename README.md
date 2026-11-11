# Abasto

App móvil para el dueño de una tienda de barrio. Le muestra qué productos tiene que pedir y cuánto le queda de cada uno. Todo se maneja en unidades, la app no muestra precios.

Proyecto de Desarrollo de Aplicaciones Móviles - Ingeniería de Sistemas, Uniciencia 2026.
Santiago Castillo Barrios.

## Qué tiene

- Pantalla Qué pedir, con los productos que se están acabando (por ahora con datos de ejemplo).
- Pantalla Inventario, con todos los productos y su existencia. Tiene buscador, un formulario para agregar productos y un botón para quitarlos.

El inventario se guarda en una base de datos SQLite en el celular, así que funciona sin internet. La parte de la base de datos está en `database/productos.js` y las pantallas en `App.js`.

Hecho con React Native, Expo (SDK 58), React Navigation y expo-sqlite.

## Cómo ejecutarlo

Se necesita tener instalado Node.js y la app Expo Go en el celular. Todo se hace desde la terminal (en VS Code o en CMD).

1. Descargar el proyecto e instalar las dependencias:

```
git clone https://github.com/SantiagoCB2026/Abasto.git
cd Abasto
npm install
```

2. Iniciar el proyecto:

```
npx expo start
```

3. En la terminal sale un código QR. Se abre Expo Go en el celular y se escanea (en iPhone con la cámara). La app se abre en el celular.

El celular y el computador tienen que estar en la misma red Wi-Fi. Si no conecta, por ejemplo en la red de la universidad, se usa el modo túnel:

```
npx expo start --tunnel
```

Para el túnel puede pedir iniciar sesión con la cuenta de Expo (`npx expo login`). Si no, se puede usar `npx expo start --tunnel ngrok`, que instala ngrok la primera vez.

## Cómo se usa

Al abrir la app sale Qué pedir. Con el botón "Ver todo el inventario" se pasa al inventario, donde se puede buscar un producto, agregar uno nuevo con su nombre y cantidad, o quitarlo con el botón Quitar. Con la flecha de arriba se vuelve a la pantalla anterior.
