# BLUNT — sitio web de galería de arte

Sitio estático (HTML, CSS y JavaScript puro, sin instalación ni compilación). Incluye modo claro/oscuro, catálogo con filtros, ficha de cada obra, artistas, enmarcado a medida, contacto y un carrito que envía el pedido por WhatsApp o mail.


## Estructura
```
index.html        Inicio
obras.html        Catálogo (filtro por artista y orden por precio)
obra.html?id=o1   Detalle de una obra
artistas.html     Artistas (reales + Maestros argentinos de dominio público)
artista.html?id=  Página de un maestro argentino (retrato, bio y obras)
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
js/maestros.js    Maestros argentinos (dominio público, datos estáticos)
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

## Maestros argentinos (dominio público)

`artistas.html` muestra, debajo de los artistas reales (Supabase), una sección **Maestros argentinos** con seis pintores fallecidos hace más de 70 años, cuya obra es de dominio público en la Argentina: Cándido López, Prilidiano Pueyrredón, Eduardo Sívori, Martín Malharro, Fernando Fader y Ernesto de la Cárcova. Cada uno tiene su página en `artista.html?id=...` con retrato, biografía (ES/EN) y obras que se amplían en un visor.

- Son **datos estáticos** en `js/maestros.js` (imágenes en `img/maestros/`): no se guardan en Supabase, no aparecen en el catálogo de obras a la venta, no tienen precio ni botones de compra y se marcan como *Muestra · Dominio público · No a la venta*.
- Los artistas que se registran desde el panel siguen funcionando igual; si `artista.html` recibe el id de un artista real, redirige a sus obras.
- Imágenes de Wikimedia Commons, todas marcadas como dominio público (PD-Art / PD-old / PD-AR-Photo), redimensionadas a ≤1400 px y comprimidas.

| Artista | Obra | Museo | Fuente |
|---|---|---|---|
| Cándido López | Autorretrato, c. 1857 (retrato) | Museo Nacional de Bellas Artes, Buenos Aires | [Commons](https://commons.wikimedia.org/wiki/File:C%C3%A1ndido_Lopez_-_Autorretrato_-_Google_Art_Project.jpg) |
| Cándido López | *Desembarco del Ejército Argentino frente a las trincheras de Curuzú*, 1891 | Museo Nacional de Bellas Artes, Buenos Aires | [Commons](https://commons.wikimedia.org/wiki/File:C%C3%A1ndido_Lopez_-_Desembarco_del_Ej%C3%A9rcito_Argentino_frente_a_las_trincheras_de_Curuz%C3%BA_-_Google_Art_Project.jpg) |
| Cándido López | *Después de la batalla de Curupaytí*, 1893 | Museo Nacional de Bellas Artes, Buenos Aires | [Commons](https://commons.wikimedia.org/wiki/File:C%C3%A1ndido_Lopez_-_Despu%C3%A9s_de_la_Batalla_de_Curupayt%C3%AD_-_Google_Art_Project.jpg) |
| Cándido López | *Trinchera de Curupaytí*, 1893 | Museo Nacional de Bellas Artes, Buenos Aires | [Commons](https://commons.wikimedia.org/wiki/File:C%C3%A1ndido_Lopez_-_Trinchera_de_Curupayt%C3%AD_-_Google_Art_Project_(497159).jpg) |
| Prilidiano Pueyrredón | Autorretrato, c. 1861 (retrato) | — | [Commons](https://commons.wikimedia.org/wiki/File:Prilidiano_Pueyrred%C3%B3n-Autorretrato.jpg) |
| Prilidiano Pueyrredón | *Retrato de Manuelita Rosas*, 1851 | Museo Nacional de Bellas Artes, Buenos Aires | [Commons](https://commons.wikimedia.org/wiki/File:Prilidiano_Pueyrredon_-_Retrato_de_Manuelita_Rosas_-_Google_Art_Project.jpg) |
| Prilidiano Pueyrredón | *Un alto en el campo*, 1861 | Museo Nacional de Bellas Artes, Buenos Aires | [Commons](https://commons.wikimedia.org/wiki/File:Prilidiano_Pueyrredon_-_Un_alto_en_el_campo_-_Google_Art_Project.jpg) |
| Prilidiano Pueyrredón | *Lavanderas en el bajo de Belgrano*, 1865 | Museo Nacional de Bellas Artes, Buenos Aires | [Commons](https://commons.wikimedia.org/wiki/File:Prilidiano_Pueyrredon_-_Lavanderas_en_el_bajo_de_Belgrano_-_Google_Art_Project.jpg) |
| Eduardo Sívori | Autorretrato, 1900 (retrato) | Museo Nacional de Bellas Artes, Buenos Aires | [Commons](https://commons.wikimedia.org/wiki/File:Autorretrato,_Eduardo_S%C3%ADvori.jpg) |
| Eduardo Sívori | *El despertar de la criada*, 1887 | Museo Nacional de Bellas Artes, Buenos Aires | [Commons](https://commons.wikimedia.org/wiki/File:Eduardo_Sivori_-_El_despertar_de_la_criada_-_Google_Art_Project.jpg) |
| Eduardo Sívori | *Pampa o chacra La Porteña (Moreno)*, 1899 | Museo Nacional de Bellas Artes, Buenos Aires | [Commons](https://commons.wikimedia.org/wiki/File:Pampa_o_Chacra_La_Porte%C3%B1a,_Moreno_-_Eduardo_S%C3%ADvori.jpg) |
| Eduardo Sívori | *A la querencia*, 1903 | Museo Nacional de Bellas Artes, Buenos Aires | [Commons](https://commons.wikimedia.org/wiki/File:A_la_querencia_-_Eduardo_S%C3%ADvori.jpg) |
| Martín Malharro | Fotografía publicada en 1925 (retrato) | — | [Commons](https://commons.wikimedia.org/wiki/File:Mart%C3%ADn_Malharro.png) |
| Martín Malharro | *Las parvas (La pampa de hoy)*, 1911 | Museo Nacional de Bellas Artes, Buenos Aires | [Commons](https://commons.wikimedia.org/wiki/File:Mart%C3%ADn_Malharro_-_Las_parvas_(la_pampa_de_hoy)_-_Google_Art_Project.jpg) |
| Martín Malharro | *Nocturno*, c. 1910 | Museo Nacional de Bellas Artes, Buenos Aires | [Commons](https://commons.wikimedia.org/wiki/File:Mart%C3%ADn_Malharro_-_Nocturno_-_Google_Art_Project.jpg) |
| Martín Malharro | *En plena naturaleza*, 1901 | Museo Nacional de Bellas Artes, Buenos Aires | [Commons](https://commons.wikimedia.org/wiki/File:Mart%C3%ADn_Malharro_-_En_plena_naturaleza_-_Google_Art_Project.jpg) |
| Fernando Fader | Autorretrato, 1925 (retrato) | Museo Castagnino, Rosario | [Commons](https://commons.wikimedia.org/wiki/File:Fernando_Fader_-_Autorretrato,_1925.jpg) |
| Fernando Fader | *Los mantones de Manila*, 1914 | Museo Nacional de Bellas Artes, Buenos Aires | [Commons](https://commons.wikimedia.org/wiki/File:Fernando_Fader_-_Los_mantones_de_Manila_-_Google_Art_Project.jpg) |
| Fernando Fader | *Al solcito*, 1922 | Museo Nacional de Bellas Artes, Buenos Aires | [Commons](https://commons.wikimedia.org/wiki/File:Fernando_Fader_-_Al_solcito_-_Google_Art_Project.jpg) |
| Fernando Fader | *La mazamorra*, 1927 | Museo Nacional de Bellas Artes, Buenos Aires | [Commons](https://commons.wikimedia.org/wiki/File:La_mazamorra_by_Fernando_Fader,_1927.jpg) |
| Ernesto de la Cárcova | Fotografía, antes de 1927 (retrato) | — | [Commons](https://commons.wikimedia.org/wiki/File:Ernesto_de_la_C%C3%A1rcova.jpg) |
| Ernesto de la Cárcova | *Sin pan y sin trabajo*, 1894 | Museo Nacional de Bellas Artes, Buenos Aires | [Commons](https://commons.wikimedia.org/wiki/File:Ernesto_de_la_C%C3%A1rcova_-_Sin_pan_y_sin_trabajo,_1894.jpg) |
| Ernesto de la Cárcova | *Retrato de la esposa del autor*, 1914 | Museo Nacional de Bellas Artes, Buenos Aires | [Commons](https://commons.wikimedia.org/wiki/File:Ernesto_DE_LA_Carcova_-_Retrato_de_la_esposa_del_autor_-_Google_Art_Project.jpg) |
| Ernesto de la Cárcova | *Naturaleza en silencio*, 1926 | Museo Nacional de Bellas Artes, Buenos Aires | [Commons](https://commons.wikimedia.org/wiki/File:Ernesto_de_la_C%C3%81Rcova_-_Naturaleza_en_silencio_-_Google_Art_Project.jpg) |

## Probador de enmarcado: fotos de ambientes

Las escenas del probador (`js/escenas.js`, imágenes en `img/escenas/`) son fotos reales con licencia libre
(Pexels License / Unsplash License: uso comercial permitido, sin atribución obligatoria; igual se acreditan en el sitio).
Para cada foto se midió el plano de la pared (líneas de piso/techo, esquinas, puntos de fuga o escala con objetos conocidos) y se guardó una homografía `H` (metros de pared → píxeles de la foto); el marco se dibuja en milímetros y se proyecta con `matrix3d`, con sombra de contacto, sombra suave según la luz y ajuste de color por escena.

| Escena | Autor | Fuente |
|---|---|---|
| Living | Max Vakhtbovych | [Pexels](https://www.pexels.com/photo/gray-couch-beside-white-wall-7195873/) |
| Dormitorio | Max Vakhtbovych | [Pexels](https://www.pexels.com/photo/interior-with-bed-and-closet-at-home-6980703/) |
| Galería | Julia Taubitz (Kunsthalle Düsseldorf) | [Unsplash](https://unsplash.com/photos/empty-white-wall-with-concrete-and-glass-above-ZCDWq4ffnng) |
| Sala gris | Max Vakhtbovych | [Pexels](https://www.pexels.com/photo/comfortable-couch-in-light-room-6958125/) |
| Sala cálida | Josh Sorenson | [Pexels](https://www.pexels.com/photo/cozy-living-room-with-sofa-and-lamp-36363112/) |
