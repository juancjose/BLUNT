# BLUNT — sitio web de galería de arte

Sitio estático (HTML, CSS y JavaScript puro, sin instalación ni compilación). Incluye modo claro/oscuro, catálogo con filtros, ficha de cada obra, artistas, enmarcado a medida, contacto y un carrito que envía el pedido por WhatsApp o mail.


## Estructura
```
index.html        Inicio
obras.html        Catálogo (filtro por artista y orden por precio)
obra.html?id=o1   Detalle de una obra
artistas.html     Artistas
enmarcado.html    Enmarcado y passepartout
contacto.html     Contacto
css/styles.css    Estilos (colores en las variables de :root y [data-theme="dark"])
js/data.js        ← CONFIGURACIÓN, OBRAS Y ARTISTAS
js/app.js         Lógica (tema, carrito, páginas)
img/              Imágenes
```

## Cambiar el nombre, WhatsApp y mail
Abrí `js/data.js` y editá el bloque `CONFIG`:
```js
nombre: "BLUNT",
whatsapp: "5491100000000",   // código de país + área + número, sin +, espacios ni guiones
email: "hola@blunt.com",
```
El nombre se actualiza solo en el encabezado, el pie y los títulos.

## Cargar obras
En `js/data.js`, dentro de `OBRAS`, copiá un bloque y modificalo:
```js
{ id: "o9", titulo: "Mi obra", artista: "a1", precio: 300, medidas: "50 × 70 cm",
  tecnica: "Óleo sobre tela", anio: 2026, img: "img/mi-obra.jpg",
  vendida: false, destacada: true, descripcion: "Texto breve." }
```
- `id` tiene que ser único. `artista` es el `id` de un artista.
- `vendida: true` muestra la etiqueta “Vendida” y desactiva la compra.
- `destacada: true` la muestra en la portada (se muestran hasta 4).
- Guardá la imagen en `img/` (ideal: vertical 4:5, ~1000 px de ancho, JPG optimizado).

## Cargar artistas
En `ARTISTAS`: `id`, `nombre`, `disciplina`, `ciudad`, `img` (cuadrada) y `bio`.

## Colores y tipografías
En `css/styles.css`, las variables `--bg`, `--fg`, etc. definen el modo claro y `[data-theme="dark"]` el oscuro. Las tipografías (Archivo expandida + Inter) se cargan desde Google Fonts en la primera línea.

## Ver el sitio en tu compu
Abrí `index.html` con doble clic, o mejor, desde la carpeta: `python3 -m http.server` y entrá a http://localhost:8000

## Publicar gratis
**Netlify:** entrá a https://app.netlify.com/drop y arrastrá la carpeta `galeria`. En segundos tenés un link; desde la configuración podés cambiar el nombre o conectar tu dominio.

**GitHub Pages:** creá un repositorio, subí todos los archivos (con `index.html` en la raíz), y en *Settings → Pages* elegí la rama `main` y la carpeta `/ (root)`. El sitio queda en `https://tu-usuario.github.io/nombre-del-repo/`.

## Próximos pasos posibles
Integrar Mercado Pago, conectar un formulario (Netlify Forms / Formspree) o migrar el catálogo a Tiendanube/WooCommerce.

## Logo
El logo está en `img/logo.svg` (vectorizado, fondo transparente) y además embebido en `js/app.js` (constante `LOGO`) para que tome el color del tema: negro en modo claro, blanco en modo oscuro. Para cambiarlo, reemplazá el `<path>` de esa constante. El favicon es `img/favicon.svg` (la “B”). También hay una versión `img/logo.png` transparente.
