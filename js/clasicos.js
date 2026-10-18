/* =========================================================
   CLÁSICOS — muestra de obras de dominio público (no están a la venta)
   Imágenes: Wikimedia Commons, marcadas como dominio público.
   Se guardan localmente en img/clasicos/ (sin enlazar a sitios externos).
   ========================================================= */
var CLASICOS = [
  { id: "van-gogh", titulo: "La noche estrellada", titulo_en: "The Starry Night", artista: "Vincent van Gogh", anio: "1889",
    museo: "Museum of Modern Art (MoMA), Nueva York", museo_en: "Museum of Modern Art (MoMA), New York",
    img: "img/clasicos/van-gogh-noche-estrellada.svg", fuente: "https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg" },
  { id: "hokusai", titulo: "La gran ola de Kanagawa", titulo_en: "The Great Wave off Kanagawa", artista: "Katsushika Hokusai", anio: "c. 1830–1832",
    museo: "The Metropolitan Museum of Art, Nueva York", museo_en: "The Metropolitan Museum of Art, New York",
    img: "img/clasicos/hokusai-la-gran-ola.svg", fuente: "https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg" },
  { id: "klimt", titulo: "El beso", titulo_en: "The Kiss", artista: "Gustav Klimt", anio: "1907–1908",
    museo: "Österreichische Galerie Belvedere, Viena", museo_en: "Österreichische Galerie Belvedere, Vienna",
    img: "img/clasicos/klimt-el-beso.svg", fuente: "https://commons.wikimedia.org/wiki/File:The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg" },
  { id: "vermeer", titulo: "La joven de la perla", titulo_en: "Girl with a Pearl Earring", artista: "Johannes Vermeer", anio: "c. 1665",
    museo: "Mauritshuis, La Haya", museo_en: "Mauritshuis, The Hague",
    img: "img/clasicos/vermeer-joven-de-la-perla.svg", fuente: "https://commons.wikimedia.org/wiki/File:1665_Girl_with_a_Pearl_Earring.jpg" },
  { id: "monet", titulo: "Impresión, sol naciente", titulo_en: "Impression, Sunrise", artista: "Claude Monet", anio: "1872",
    museo: "Musée Marmottan Monet, París", museo_en: "Musée Marmottan Monet, Paris",
    img: "img/clasicos/monet-impresion-sol-naciente.svg", fuente: "https://commons.wikimedia.org/wiki/File:Monet_-_Impression,_Sunrise.jpg" },
  { id: "turner", titulo: "El Temerario remolcado a su último atracadero", titulo_en: "The Fighting Temeraire", artista: "J. M. W. Turner", anio: "1839",
    museo: "National Gallery, Londres", museo_en: "National Gallery, London",
    img: "img/clasicos/turner-temeraire.svg", fuente: "https://commons.wikimedia.org/wiki/File:The_Fighting_Temeraire,_JMW_Turner,_National_Gallery.jpg" },
  { id: "seurat", titulo: "Tarde de domingo en la isla de la Grande Jatte", titulo_en: "A Sunday on La Grande Jatte", artista: "Georges Seurat", anio: "1884–1886",
    museo: "Art Institute of Chicago, Chicago", museo_en: "Art Institute of Chicago, Chicago",
    img: "img/clasicos/seurat-grande-jatte.svg", fuente: "https://commons.wikimedia.org/wiki/File:A_Sunday_on_La_Grande_Jatte,_Georges_Seurat,_1884.jpg" },
  { id: "botticelli", titulo: "El nacimiento de Venus", titulo_en: "The Birth of Venus", artista: "Sandro Botticelli", anio: "c. 1485",
    museo: "Galleria degli Uffizi, Florencia", museo_en: "Uffizi Gallery, Florence",
    img: "img/clasicos/botticelli-nacimiento-de-venus.svg", fuente: "https://commons.wikimedia.org/wiki/File:Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg" }
];
if (typeof I18N_EN !== "undefined") CLASICOS.forEach(c => { I18N_EN[c.titulo] = c.titulo_en; I18N_EN[c.museo] = c.museo_en; });
