# BLUNT — Galería de arte online

Sitio web de una galería de arte original argentino con enmarcado a medida. Es un sitio estático (HTML, CSS y JavaScript puro): no necesita instalación ni compilación.

🔗 **Demo:** https://blunt-gallery.vercel.app

## Funcionalidades
- Modo claro / oscuro (respeta la preferencia del sistema y recuerda la elección).
- Catálogo de obras con filtro por artista y orden por precio.
- Ficha de detalle de cada obra (`obra.html?id=...`) con etiqueta "Vendida" cuando corresponde.
- Obras destacadas en la portada y sección de artistas.
- Página de enmarcado y passepartout a medida.
- Carrito que envía el pedido por WhatsApp o por mail.
- Contenido (obras, artistas, datos de contacto) centralizado en un solo archivo: `js/data.js`.

## Tecnologías
HTML5 · CSS3 (variables para temas) · JavaScript vanilla · Google Fonts (Archivo + Inter)

## Estructura
```
index.html        Inicio
obras.html        Catálogo
obra.html         Detalle de obra
artistas.html     Artistas
enmarcado.html    Enmarcado y passepartout
contacto.html     Contacto
css/styles.css    Estilos y colores de los temas
js/data.js        Configuración, obras y artistas
js/app.js         Lógica (tema, carrito, páginas)
img/              Imágenes y logo
```

## Cómo correrlo localmente
```bash
git clone https://github.com/juancjose/BLUNT.git
cd BLUNT
python3 -m http.server
```
Abrí http://localhost:8000

## Personalización
- **Nombre, WhatsApp y mail:** bloque `CONFIG` en `js/data.js`.
- **Obras:** array `OBRAS` en `js/data.js` (`id` único, `artista`, `precio`, `medidas`, `tecnica`, `anio`, `img`, `vendida`, `destacada`, `descripcion`).
- **Artistas:** array `ARTISTAS` (`id`, `nombre`, `disciplina`, `ciudad`, `img`, `bio`).
- **Colores:** variables de `:root` y `[data-theme="dark"]` en `css/styles.css`.
- **Logo:** `img/logo.svg`, y embebido en `js/app.js` (constante `LOGO`) para adaptarse al tema.

## Capturas
<!-- Agregá capturas del sitio, por ejemplo: ![Inicio](docs/inicio.png) -->

## Autor
**Juan José Cáceres** — [@juancjose](https://github.com/juancjose)

## Licencia
Distribuido bajo licencia MIT. Ver [`LICENSE`](LICENSE).
