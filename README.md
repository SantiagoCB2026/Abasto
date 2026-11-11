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

Se necesita tener instalado Node.js y la app Expo Go en el celular.

```
git clone https://github.com/SantiagoCB2026/Abasto.git
cd Abasto
npm install
npx expo start
```

Después se escanea el código QR que sale en la terminal con Expo Go (en iPhone con la cámara). El celular y el computador tienen que estar en la misma red Wi-Fi. Si no conecta, se puede usar `npx expo start --tunnel`.

### Con el emulador de Expo Snack

1. Entrar a snack.expo.dev y crear un Snack nuevo.
2. Pegar el código de `App.js` y crear el archivo `database/productos.js` con su código.
3. Agregar la dependencia `expo-sqlite` cuando Snack la pida (Add dependency).
4. En el panel de la derecha elegir la pestaña Android y darle "Tap to play". La app se abre en el emulador.

Hay que usar la pestaña Android o iOS, porque la base de datos no funciona en la vista Web.

## Cómo se usa

Al abrir la app sale Qué pedir. Con el botón "Ver todo el inventario" se pasa al inventario, donde se puede buscar un producto, agregar uno nuevo con su nombre y cantidad, o quitarlo con el botón Quitar. Con la flecha de arriba se vuelve a la pantalla anterior.
