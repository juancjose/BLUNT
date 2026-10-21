# BLUNT

**Arte original para habitar tus espacios.**

Galería de arte online con obra de artistas argentinos, muestra de clásicos de dominio público y un probador de enmarcado a medida.

🔗 **Sitio en vivo:** https://blunt-gallery.vercel.app

---

## Descripción

BLUNT es un sitio web de galería de arte hecho con HTML, CSS y JavaScript puro, sin frameworks ni paso de compilación. Las obras y los perfiles de artistas se gestionan desde un panel propio sobre Supabase (autenticación, base de datos y almacenamiento de imágenes). El sitio se publica en Vercel desde la rama `main`.

## Funcionalidades

**Inicio**
- Portada a pantalla completa con obras que se alternan con fundido y un zoom lento continuo (Ken Burns), logotipo grande con entrada letra por letra, epígrafe de cada obra y barras de progreso para navegar entre diapositivas.
- Si todavía no hay obras publicadas, la portada muestra clásicos de dominio público rotulados como *Muestra · Dominio público · No a la venta*.
- Carga sin esperar a la base de datos: la portada aparece enseguida y las obras/artistas se completan cuando llegan.

**Catálogo y artistas**
- Catálogo de obras con filtro por artista y orden por precio (`obras.html`), y ficha de cada obra con técnica, medidas, año y estado vendida/disponible (`obra.html`).
- Página de artistas con los perfiles aprobados (`artistas.html`).
- **Clásicos del arte** (`clasicos.html`): 8 obras de dominio público con visor ampliado. No están a la venta (sin precio ni carrito).
- **Maestros argentinos**: seis pintores de los siglos XIX y XX en dominio público, cada uno con página propia (`artista.html`), biografía y obras. También son solo muestra.

**Probador de enmarcado** (`enmarcado.html`)
- Vista de la obra enmarcada sobre fotos reales de ambientes (living, dormitorio, galería, sala cálida), con el marco proyectado en perspectiva sobre la pared, sombras y ajuste de color por escena.
- Opciones de marco (negro, madera, blanco) y passepartout (sin, fino, medio, ancho).
- Elección de obra entre los clásicos o carga de una foto propia.
- **Tu espacio**: subir una foto de la propia pared desde la cámara o la galería del celular, y arrastrar el cuadro para ubicarlo.
- Pasos de trabajo, precios orientativos y pedido de presupuesto por WhatsApp.

**Compra y contacto**
- Carrito ("Tu selección") que arma el pedido y lo envía por WhatsApp o por mail.
- Página de contacto con formulario que arma el mensaje y abre WhatsApp, más mail directo. WhatsApp, mail e Instagram también están en el pie de todas las páginas.

**Panel de artistas** (`login.html`, `panel.html`)
- Registro e ingreso de artistas. Cada artista gestiona su perfil (bio en español e inglés, foto) y sus obras (alta, edición, ocultar/publicar, marcar vendida).
- Las imágenes se reducen en el navegador antes de subirse.
- Las cuentas nuevas quedan pendientes hasta que un administrador las aprueba; el administrador puede editar cualquier perfil u obra.

**General**
- Modo claro y oscuro (respeta la preferencia del sistema y recuerda la elección).
- Español / inglés con un botón; los textos de obras y artistas usan sus campos en inglés cuando existen.
- Diseño responsive para celular y escritorio, y respeto de `prefers-reduced-motion`.

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | HTML, CSS y JavaScript (vanilla, sin dependencias de build) |
| Tipografías | Archivo e Inter (Google Fonts) |
| Datos, auth y archivos | [Supabase](https://supabase.com) (Postgres con RLS, Auth, Storage) mediante `supabase-js` incluido en `js/vendor/` |
| Hosting | [Vercel](https://vercel.com), despliegue automático desde `main` |

## Estructura del proyecto

```
├── index.html          Inicio (portada inmersiva)
├── obras.html          Catálogo de obras
├── obra.html           Ficha de una obra (?id=)
├── artistas.html       Artistas + Maestros argentinos
├── artista.html        Página de un maestro argentino (?id=)
├── clasicos.html       Clásicos del arte (muestra)
├── enmarcado.html      Probador de enmarcado y precios
├── contacto.html       Contacto
├── login.html          Ingreso / registro de artistas
├── panel.html          Panel de artistas y administración
├── css/
│   ├── styles.css      Estilos generales y temas claro/oscuro
│   └── home.css        Estilos de la portada
├── js/
│   ├── data.js         Configuración (nombre, WhatsApp, mail, idioma)
│   ├── app.js          Lógica común: header/footer, tema, carrito, páginas, probador
│   ├── home.js         Portada (diapositivas, entrada, header transparente)
│   ├── home-boot.js    Arranque del inicio
│   ├── i18n.js         Diccionario y motor de traducción ES → EN
│   ├── clasicos.js     Datos de los clásicos (dominio público)
│   ├── maestros.js     Datos de los maestros argentinos (dominio público)
│   ├── escenas.js      Ambientes del probador (homografías, luz, créditos)
│   ├── db.js           Cliente Supabase y carga de datos públicos
│   ├── login.js        Ingreso / registro
│   ├── panel.js        Panel de artistas y administración
│   ├── supabase-config.js  URL y clave pública de Supabase
│   └── vendor/         supabase-js
├── img/                Logo, favicon, clásicos, maestros y escenas
└── supabase/migrations/  Esquema, políticas RLS y buckets
```

> Quedan en el repo archivos de una versión de prueba anterior (`prueba.html`, que hoy redirige al inicio, y `css/prueba.css`, `js/prueba*.js`), que ya no se usan.

## Cómo correrlo localmente

No requiere instalación. Desde la carpeta del proyecto:

```bash
python3 -m http.server 8000
```

y abrí http://localhost:8000. Hace falta servirlo por HTTP (no con doble clic sobre el archivo) porque usa módulos de JavaScript.

Para personalizar nombre, WhatsApp, mail e idioma por defecto, editá el bloque `CONFIG` de `js/data.js`.

## Configuración de Supabase

- **Tablas:** `artists` (perfiles, con aprobación), `works` (obras: título, precio en USD, medidas, técnica, año, imagen, publicada, vendida, descripción, con campos en inglés) y `admins`.
- **Storage:** buckets `artworks` y `avatars`; cada usuario solo puede escribir en su propia carpeta.
- **Seguridad:** políticas RLS. El público solo lee artistas aprobados y obras publicadas, cada artista edita lo suyo y los administradores, todo.
- El esquema completo está en `supabase/migrations/`.
- La conexión se configura en `js/supabase-config.js` con la URL del proyecto y la clave pública (*publishable/anon*), que es segura en el navegador porque el acceso lo controla RLS. **Nunca** se debe poner la clave `service_role` en el frontend.

## Deploy

El sitio se despliega en Vercel automáticamente con cada push a `main` (sitio estático, sin build). Al no tener paso de compilación, también puede publicarse en cualquier hosting estático.

## Créditos de imágenes

Todas las obras de muestra son de **dominio público** (Wikimedia Commons) y se exhiben sin fines de venta. Las fotos de ambientes del probador tienen licencia libre (Pexels License / Unsplash License) y se acreditan también en el sitio.

<details>
<summary><strong>Clásicos del arte</strong></summary>

| Obra | Artista | Año | Museo | Fuente |
|---|---|---|---|---|
| *La noche estrellada* | Vincent van Gogh | 1889 | Museum of Modern Art (MoMA), Nueva York | [Commons](https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg) |
| *La gran ola de Kanagawa* | Katsushika Hokusai | c. 1830–1832 | The Metropolitan Museum of Art, Nueva York | [Commons](https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg) |
| *El beso* | Gustav Klimt | 1907–1908 | Österreichische Galerie Belvedere, Viena | [Commons](https://commons.wikimedia.org/wiki/File:The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg) |
| *La joven de la perla* | Johannes Vermeer | c. 1665 | Mauritshuis, La Haya | [Commons](https://commons.wikimedia.org/wiki/File:1665_Girl_with_a_Pearl_Earring.jpg) |
| *Impresión, sol naciente* | Claude Monet | 1872 | Musée Marmottan Monet, París | [Commons](https://commons.wikimedia.org/wiki/File:Monet_-_Impression,_Sunrise.jpg) |
| *El Temerario remolcado a su último atracadero* | J. M. W. Turner | 1839 | National Gallery, Londres | [Commons](https://commons.wikimedia.org/wiki/File:The_Fighting_Temeraire,_JMW_Turner,_National_Gallery.jpg) |
| *Tarde de domingo en la isla de la Grande Jatte* | Georges Seurat | 1884–1886 | Art Institute of Chicago, Chicago | [Commons](https://commons.wikimedia.org/wiki/File:A_Sunday_on_La_Grande_Jatte,_Georges_Seurat,_1884.jpg) |
| *El nacimiento de Venus* | Sandro Botticelli | c. 1485 | Galleria degli Uffizi, Florencia | [Commons](https://commons.wikimedia.org/wiki/File:Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg) |

</details>

<details>
<summary><strong>Maestros argentinos</strong></summary>

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

</details>

<details>
<summary><strong>Ambientes del probador de enmarcado</strong></summary>

| Escena | Autor | Fuente |
|---|---|---|
| Living | Max Vakhtbovych | [Pexels](https://www.pexels.com/photo/gray-couch-beside-white-wall-7195873/) |
| Dormitorio | Max Vakhtbovych | [Pexels](https://www.pexels.com/photo/interior-with-bed-and-closet-at-home-6980703/) |
| Galería | Julia Taubitz | [Unsplash](https://unsplash.com/photos/empty-white-wall-with-concrete-and-glass-above-ZCDWq4ffnng) |
| Sala cálida | Josh Sorenson | [Pexels](https://www.pexels.com/photo/cozy-living-room-with-sofa-and-lamp-36363112/) |

</details>

## Autor

**Juan José Cáceres**. Diseño y desarrollo.

## Licencia

[MIT](LICENSE)

---

### English summary

**BLUNT** is an online art gallery for original work by Argentine artists, live at https://blunt-gallery.vercel.app. It is a static site built with plain HTML, CSS and vanilla JavaScript, with Supabase (Postgres + RLS, Auth, Storage) for artist profiles and artworks, and is deployed on Vercel from `main`.

Features:
- Immersive full-screen home with slowly zooming artworks.
- Catalog and artwork pages, plus artist profiles managed from a built-in artist/admin panel.
- Public-domain classics and Argentine masters, shown as a showcase only (not for sale).
- Framing preview over real rooms or the visitor's own wall photo (camera or gallery, draggable).
- A WhatsApp/email order cart.
- Light/dark mode, Spanish/English, and a responsive layout.
