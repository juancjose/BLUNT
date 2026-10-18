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
js/data.js        ← CONFIGURACIÓN (nombre, WhatsApp, mail)
js/db.js          Conexión a Supabase y carga de datos
js/login.js       Ingreso / registro de artistas
js/panel.js       Panel de artistas y administración
login.html        Acceso de artistas
panel.html        Panel de artistas
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

## Obras y artistas (Supabase)
Las obras y los artistas ya **no** se editan en archivos: se cargan desde una base de datos Supabase (proyecto `blunt-gallery`).
- Cada artista crea su cuenta en `login.html` (link “Artistas: ingresar” en el pie) y gestiona su perfil, bio (ES/EN), foto y obras en `panel.html`.
- Las cuentas nuevas quedan **pendientes**: no se ven en el sitio hasta que un administrador las aprueba desde el panel.
- El email del administrador (`juanjosecaceres95@hotmail.com`) se convierte en admin automáticamente al registrarse. El admin puede aprobar artistas y editar cualquier perfil u obra.
- Si no hay datos publicados, el sitio muestra “Próximamente nuevas obras”.
- Conexión: `js/supabase-config.js` (URL y clave pública *publishable*, segura en el navegador). **Nunca** subas la `service_role` key.
- Esquema y políticas de seguridad (RLS): `supabase/migrations/`.
- Las imágenes se reducen en el navegador y se guardan en los buckets `artworks` y `avatars`.

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

## Idiomas (español / inglés)
El botón **EN/ES** del encabezado cambia el idioma y la elección queda guardada. El idioma por defecto se define en `CONFIG.idioma` (`"es"` o `"en"`) en `js/data.js`.
- Los textos de la interfaz se traducen en `js/i18n.js` (diccionario `"Texto en español": "English text"`). Si agregás o cambiás un texto en español, sumá su traducción ahí.
- Para obras y artistas, los textos en inglés se cargan desde el panel (campos “EN”). Si están vacíos, se muestra el texto en español.

## Clásicos (dominio público)

`clasicos.html` y la sección "Clásicos del arte" de la home muestran 8 obras de dominio público
(Wikimedia Commons) como muestra. **No están a la venta**: no tienen precio ni botón de carrito.
Los datos están en `js/clasicos.js` y las imágenes en `img/clasicos/` (JPEG optimizado embebido en
un `.svg` para poder subirlo como texto). En la home, cuando todavía no hay obras/artistas cargados
en Supabase, se ocultan esas secciones vacías y se muestra la de clásicos.

## Probador de enmarcado: fotos de ambientes

Las escenas del probador (`js/escenas.js`, imágenes en `img/escenas/`) son fotos reales con licencia libre
(Pexels License / Unsplash License: uso comercial permitido, sin atribución obligatoria; igual se acreditan en el sitio).
Para cada foto se midió el plano de la pared (líneas de piso/techo, esquinas, puntos de fuga o escala con objetos conocidos) y se guardó una homografía `H` (metros de pared → píxeles de la foto); el marco se dibuja en milímetros y se proyecta con `matrix3d`, con sombra de contacto, sombra suave según la luz y ajuste de color por escena.

| Escena | Autor | Fuente |
|---|---|---|
| Living | Max Vakhtbovych | [Pexels](https://www.pexels.com/photo/gray-couch-beside-white-wall-7195873/) |
| Dormitorio | Aljona Ovtšinnikova | [Pexels](https://www.pexels.com/photo/minimalist-white-bedroom-interior-design-28536695/) |
| Galería | Julia Taubitz (Kunsthalle Düsseldorf) | [Unsplash](https://unsplash.com/photos/empty-white-wall-with-concrete-and-glass-above-ZCDWq4ffnng) |
