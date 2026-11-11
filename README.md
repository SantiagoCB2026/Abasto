# Abasto

App móvil para el dueño de una tienda de barrio. Le muestra qué productos tiene que pedir y cuánto le queda de cada uno. Todo se maneja en unidades, la app no muestra precios.

Proyecto de Desarrollo de Aplicaciones Móviles - Ingeniería de Sistemas, Uniciencia 2026.
Santiago Castillo Barrios.

## Qué tiene

- Pantalla Qué pedir, con los productos que se están acabando (por ahora con datos de ejemplo).
- Pantalla Inventario, con todos los productos y su existencia. Tiene buscador, un formulario para agregar productos y un botón para quitarlos.

El inventario se guarda en una base de datos SQLite en el celular, así que funciona sin internet. La parte de la base de datos está en `database/productos.js` y las pantallas en `App.js`.

Hecho con React Native, Expo (SDK 58), React Navigation y expo-sqlite.

## Cómo se usa

Al abrir la app sale Qué pedir. Con el botón "Ver todo el inventario" se pasa al inventario, donde se puede buscar un producto, agregar uno nuevo con su nombre y cantidad, o quitarlo con el botón Quitar. Con la flecha de arriba se vuelve a la pantalla anterior.
