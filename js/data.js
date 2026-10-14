/* =========================================================
   CONFIGURACIÓN Y DATOS — editá este archivo para personalizar
   ========================================================= */
const CONFIG = {
  nombre: "BLUNT",
  lema: "Arte original para habitar tus espacios",
  whatsapp: "5491100000000",          // número en formato internacional, sin + ni espacios
  email: "hola@blunt.com",
  instagram: "https://instagram.com/",
  ciudad: "Buenos Aires, Argentina",
  moneda: "USD"
};

const ARTISTAS = [
  { id: "a1", nombre: "Lucía Ferrante", disciplina: "Pintura acrílica", ciudad: "Córdoba", img: "img/artista-1.jpg", bio: "Explora el color como estructura: campos planos que dialogan con la luz del lugar donde se cuelgan." },
  { id: "a2", nombre: "Tomás Ibarra", disciplina: "Técnica mixta", ciudad: "Rosario", img: "img/artista-2.jpg", bio: "Trabaja con capas, transparencias y materiales recuperados del paisaje urbano." },
  { id: "a3", nombre: "Valentina Ruiz", disciplina: "Óleo", ciudad: "Mendoza", img: "img/artista-3.jpg", bio: "Su obra parte de la memoria de los cerros y la quietud de la siesta mendocina." },
  { id: "a4", nombre: "Julián Ocampo", disciplina: "Grabado", ciudad: "La Plata", img: "img/artista-4.jpg", bio: "Grabador de formación, investiga la línea y el vacío en ediciones cortas." },
  { id: "a5", nombre: "Camila Sosa", disciplina: "Acuarela", ciudad: "Buenos Aires", img: "img/artista-5.jpg", bio: "Acuarelas de gran formato donde el agua decide tanto como la mano." },
  { id: "a6", nombre: "Martín Del Valle", disciplina: "Fotografía", ciudad: "Salta", img: "img/artista-6.jpg", bio: "Fotografía de autor sobre la geometría de la arquitectura del norte." }
];

const OBRAS = [
  { id: "o1", titulo: "Horizonte partido", artista: "a1", precio: 420, medidas: "60 × 75 cm", tecnica: "Acrílico sobre tela", anio: 2025, img: "img/obra-1.jpg", vendida: false, destacada: true, descripcion: "Un plano de color se quiebra y deja ver otro debajo. Obra serena, pensada para ambientes luminosos." },
  { id: "o2", titulo: "Verde de invierno", artista: "a2", precio: 280, medidas: "50 × 62 cm", tecnica: "Técnica mixta sobre papel", anio: 2024, img: "img/obra-2.jpg", vendida: false, destacada: true, descripcion: "Capas translúcidas de verde y ocre que remiten a un jardín en reposo." },
  { id: "o3", titulo: "Nocturno rojo", artista: "a3", precio: 650, medidas: "80 × 100 cm", tecnica: "Óleo sobre tela", anio: 2025, img: "img/obra-3.jpg", vendida: true, destacada: true, descripcion: "Una escena nocturna reducida a sus formas esenciales, con un acento rojo que organiza todo." },
  { id: "o4", titulo: "Rosa de siesta", artista: "a4", precio: 120, medidas: "30 × 40 cm", tecnica: "Grabado, edición 3/20", anio: 2024, img: "img/obra-4.jpg", vendida: false, destacada: true, descripcion: "Grabado de tirada corta, impreso a mano sobre papel de algodón." },
  { id: "o5", titulo: "Marea", artista: "a5", precio: 340, medidas: "56 × 76 cm", tecnica: "Acuarela sobre papel", anio: 2025, img: "img/obra-5.jpg", vendida: false, destacada: false, descripcion: "El agua avanza y retrocede sobre el papel; el blanco también es parte de la obra." },
  { id: "o6", titulo: "Patio norte", artista: "a6", precio: 210, medidas: "40 × 50 cm", tecnica: "Impresión fine art", anio: 2023, img: "img/obra-6.jpg", vendida: false, destacada: false, descripcion: "Fotografía de autor en papel de museo, edición limitada y firmada." },
  { id: "o7", titulo: "Señal", artista: "a1", precio: 90, medidas: "25 × 30 cm", tecnica: "Acrílico sobre madera", anio: 2025, img: "img/obra-7.jpg", vendida: false, destacada: false, descripcion: "Pequeño formato, gran presencia: ideal para empezar una colección." },
  { id: "o8", titulo: "Lavanda", artista: "a3", precio: 980, medidas: "100 × 120 cm", tecnica: "Óleo sobre tela", anio: 2025, img: "img/obra-8.jpg", vendida: false, destacada: false, descripcion: "Obra de gran formato en tonos fríos; protagonista de cualquier pared." }
];
