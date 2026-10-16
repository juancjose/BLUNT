/* =========================================================
   CONFIGURACIÓN Y DATOS — editá este archivo para personalizar
   ========================================================= */
const CONFIG = {
  idioma: "es",                        // idioma por defecto: "es" o "en"
  nombre: "BLUNT",
  lema: "Arte original para habitar tus espacios",
  whatsapp: "5491100000000",          // número en formato internacional, sin + ni espacios
  email: "hola@blunt.com",
  instagram: "https://instagram.com/",
  ciudad: "Buenos Aires, Argentina",
  moneda: "USD"
};

const ARTISTAS = [
  { id: "a1", nombre: "Lucía Ferrante", disciplina: "Pintura acrílica", ciudad: "Córdoba", img: "img/artista-1.jpg", bio: "Explora el color como estructura: campos planos que dialogan con la luz del lugar donde se cuelgan.", disciplina_en: "Acrylic painting", bio_en: "Explores color as structure: flat fields in dialogue with the light of the place where they hang." },
  { id: "a2", nombre: "Tomás Ibarra", disciplina: "Técnica mixta", ciudad: "Rosario", img: "img/artista-2.jpg", bio: "Trabaja con capas, transparencias y materiales recuperados del paisaje urbano.", disciplina_en: "Mixed media", bio_en: "Works with layers, transparencies and materials recovered from the urban landscape." },
  { id: "a3", nombre: "Valentina Ruiz", disciplina: "Óleo", ciudad: "Mendoza", img: "img/artista-3.jpg", bio: "Su obra parte de la memoria de los cerros y la quietud de la siesta mendocina.", disciplina_en: "Oil painting", bio_en: "Her work draws on the memory of the hills and the stillness of the Mendoza siesta." },
  { id: "a4", nombre: "Julián Ocampo", disciplina: "Grabado", ciudad: "La Plata", img: "img/artista-4.jpg", bio: "Grabador de formación, investiga la línea y el vacío en ediciones cortas.", disciplina_en: "Printmaking", bio_en: "A printmaker by training, he explores line and void in short editions." },
  { id: "a5", nombre: "Camila Sosa", disciplina: "Acuarela", ciudad: "Buenos Aires", img: "img/artista-5.jpg", bio: "Acuarelas de gran formato donde el agua decide tanto como la mano.", disciplina_en: "Watercolor", bio_en: "Large-format watercolors where water decides as much as the hand." },
  { id: "a6", nombre: "Martín Del Valle", disciplina: "Fotografía", ciudad: "Salta", img: "img/artista-6.jpg", bio: "Fotografía de autor sobre la geometría de la arquitectura del norte.", disciplina_en: "Photography", bio_en: "Fine art photography on the geometry of northern architecture." }
];

const OBRAS = [
  { id: "o1", titulo: "Horizonte partido", artista: "a1", precio: 420, medidas: "60 × 75 cm", tecnica: "Acrílico sobre tela", anio: 2025, img: "img/obra-1.jpg", vendida: false, destacada: true, descripcion: "Un plano de color se quiebra y deja ver otro debajo. Obra serena, pensada para ambientes luminosos.", titulo_en: "Broken Horizon", tecnica_en: "Acrylic on canvas", descripcion_en: "A plane of color breaks open to reveal another beneath. A serene work, made for bright spaces." },
  { id: "o2", titulo: "Verde de invierno", artista: "a2", precio: 280, medidas: "50 × 62 cm", tecnica: "Técnica mixta sobre papel", anio: 2024, img: "img/obra-2.jpg", vendida: false, destacada: true, descripcion: "Capas translúcidas de verde y ocre que remiten a un jardín en reposo.", titulo_en: "Winter Green", tecnica_en: "Mixed media on paper", descripcion_en: "Translucent layers of green and ochre that recall a garden at rest." },
  { id: "o3", titulo: "Nocturno rojo", artista: "a3", precio: 650, medidas: "80 × 100 cm", tecnica: "Óleo sobre tela", anio: 2025, img: "img/obra-3.jpg", vendida: true, destacada: true, descripcion: "Una escena nocturna reducida a sus formas esenciales, con un acento rojo que organiza todo.", titulo_en: "Red Nocturne", tecnica_en: "Oil on canvas", descripcion_en: "A night scene reduced to its essential forms, with a red accent that organizes everything." },
  { id: "o4", titulo: "Rosa de siesta", artista: "a4", precio: 120, medidas: "30 × 40 cm", tecnica: "Grabado, edición 3/20", anio: 2024, img: "img/obra-4.jpg", vendida: false, destacada: true, descripcion: "Grabado de tirada corta, impreso a mano sobre papel de algodón.", titulo_en: "Siesta Rose", tecnica_en: "Print, edition 3/20", descripcion_en: "A short-run print, hand-pulled on cotton paper." },
  { id: "o5", titulo: "Marea", artista: "a5", precio: 340, medidas: "56 × 76 cm", tecnica: "Acuarela sobre papel", anio: 2025, img: "img/obra-5.jpg", vendida: false, destacada: false, descripcion: "El agua avanza y retrocede sobre el papel; el blanco también es parte de la obra.", titulo_en: "Tide", tecnica_en: "Watercolor on paper", descripcion_en: "Water advances and recedes across the paper; the white is part of the work too." },
  { id: "o6", titulo: "Patio norte", artista: "a6", precio: 210, medidas: "40 × 50 cm", tecnica: "Impresión fine art", anio: 2023, img: "img/obra-6.jpg", vendida: false, destacada: false, descripcion: "Fotografía de autor en papel de museo, edición limitada y firmada.", titulo_en: "Northern Courtyard", tecnica_en: "Fine art print", descripcion_en: "Fine art photography on museum paper, signed limited edition." },
  { id: "o7", titulo: "Señal", artista: "a1", precio: 90, medidas: "25 × 30 cm", tecnica: "Acrílico sobre madera", anio: 2025, img: "img/obra-7.jpg", vendida: false, destacada: false, descripcion: "Pequeño formato, gran presencia: ideal para empezar una colección.", titulo_en: "Signal", tecnica_en: "Acrylic on wood", descripcion_en: "Small format, big presence: ideal for starting a collection." },
  { id: "o8", titulo: "Lavanda", artista: "a3", precio: 980, medidas: "100 × 120 cm", tecnica: "Óleo sobre tela", anio: 2025, img: "img/obra-8.jpg", vendida: false, destacada: false, descripcion: "Obra de gran formato en tonos fríos; protagonista de cualquier pared.", titulo_en: "Lavender", tecnica_en: "Oil on canvas", descripcion_en: "A large-format work in cool tones; the centerpiece of any wall." }
];
