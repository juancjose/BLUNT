/* =========================================================
   ESCENAS del probador de enmarcado — fotos reales con licencia libre
   (Pexels License / Unsplash License: uso comercial permitido; igual se acreditan).
   H = homografía 3x3 que lleva coordenadas del plano de la pared, en METROS
       (origen = centro del borde superior del cuadro; x a la derecha, y hacia abajo),
       a píxeles de la foto (base 1600×1067). Se midió sobre la foto: líneas de piso/techo,
       esquinas y puntos de fuga (galería) o escala con objetos conocidos (apliques, muebles).
   w / pw = ancho exterior del marco en metros (obra horizontal / vertical).
   sombra = dirección de la luz [x, y]; lado = canto visible del marco en mm [x, y].
   ajuste / luz = corrección de color e iluminación para igualar la foto.
   ========================================================= */
var ESCENAS = [
 {
  "id": "living",
  "nombre": "Living",
  "img": "img/escenas/living.svg",
  "H": [
   [
    181,
    0,
    755.2
   ],
   [
    0,
    181,
    341.44
   ],
   [
    0,
    0,
    1
   ]
  ],
  "w": 1.2,
  "pw": 0.8,
  "sombra": [
   0,
   1
  ],
  "lado": [
   0,
   5
  ],
  "ajuste": "brightness(1.03) contrast(.94) saturate(.9)",
  "luz": "linear-gradient(180deg,rgba(255,255,255,.10),rgba(0,0,0,.06))",
  "autor": "Max Vakhtbovych",
  "sitio": "Pexels",
  "url": "https://www.pexels.com/photo/gray-couch-beside-white-wall-7195873/",
  "thumb": "data:image/jpeg;base64,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"
 },
 {
  "id": "dormitorio",
  "nombre": "Dormitorio",
  "img": "img/escenas/dormitorio.svg?v=2",
  "H": [
   [
    290,
    0,
    795
   ],
   [
    0,
    290,
    192.4
   ],
   [
    0,
    0,
    1
   ]
  ],
  "w": 1.25,
  "pw": 0.85,
  "sombra": [
   -0.5,
   1
  ],
  "lado": [
   0,
   3
  ],
  "ajuste": "brightness(.93) contrast(.9) saturate(.84) sepia(.07)",
  "luz": "linear-gradient(90deg,rgba(0,0,0,.06),rgba(255,245,230,.07))",
  "autor": "Max Vakhtbovych",
  "sitio": "Pexels",
  "url": "https://www.pexels.com/photo/interior-with-bed-and-closet-at-home-6980703/",
  "thumb": "data:image/jpeg;base64,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"
 },
 {
  "id": "galeria",
  "nombre": "Galería",
  "img": "img/escenas/galeria.svg?v=2",
  "H": [
   [
    230.303125,
    0.0,
    800.0
   ],
   [
    0.949664,
    228.821125,
    269.993134
   ],
   [
    0.001852,
    0.0,
    1.0
   ]
  ],
  "w": 2.0,
  "pw": 1.4,
  "sombra": [
   0,
   1
  ],
  "lado": [
   0,
   3
  ],
  "ajuste": "brightness(.98) contrast(.92) saturate(.86)",
  "luz": "linear-gradient(180deg,rgba(255,255,255,.09),rgba(0,0,0,.06))",
  "autor": "Julia Taubitz",
  "sitio": "Unsplash",
  "url": "https://unsplash.com/photos/empty-white-wall-with-concrete-and-glass-above-ZCDWq4ffnng",
  "thumb": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABWAIADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDdYSBeLW5z/wBe7/4U6J3VcG2us/8AXu/+Fd5ilqeUfMeeSrM9wXFvc4KgAmB/U+1OQzeXhrS4z/1wb/CvQqKOULnn+ZeMWtzx/wBMG/wpCsxPFvcf9+G/wr0HFFHKFzz6OKUyzF7a4wxGCIG54HtTzvX/AJdbnHtbt/hXfUUuQdzz8SODzb3I+sDf4U1ixJPkzHHQeQ3+FehUmKOQLnnMIkRCGgnGWJ/1Lnv9KYVl3cW859/Ifj9K9JxSYo5BXPNWSUsD9ln9f9S3+FMlSXYdtpOT6eQ3P6V6ZijFHKFzy6OCcRqGhmGF6GJv8KayS52/Z7gj/rk3+Feo4FIQPSjlC5JS0lFWIWlpKKAFopKKAFoopKAFpKKKACiikoAKbS0hoASkNLTSaAH5pc03NGaAH5ozTc0ZoAdmikzRmgB2aM03NGaAFzRmkzSZoAXNGaTNJmgBSaaTQTTSaAFzTSaM00mgB+aXNNpc0wHZpc03NGRSAdmjNJmjIoAXNGaTNGR60ALmkzSZ96M0AKTSZpCfekzQAuaaTRkUhIoAM00mgmmk0AcINc1QcDUJz9WH+FOXXNUPXUJvzH+FYyMT1p/mH04qLlGudb1I/wDMQn/Bh/hSDWNSP/MRuv8Av5/9asrzCacG9c0XCxqHVdSPXUrsfSX/AOtSf2tqQ5/tK6/GX/61Z3mCk8ylcLGl/bGpH/mI3P8A38/+tR/a2o/9BG6/7+1m+YeuaDKMc0XHY0Dquo/9BG8/7+mj+1NQ/wCgjef9/TWb5o9KTzcUXCxonVdR/wCgjd/9/TTP7V1DP/ISvP8Av8ao+b/kU0yUXFYvnU7/ADn+0rz/AL/tSHVNQ/6CN3/3+as4yEdDSGY96LhY0Tq+of8AQRuv+/ppjatqB/5iV1/3+NZ7Pmoy/wBadwH7z0pQ3eiikMcJMGl8049KKKQAHJ7/AKUu7vRRQAhfikJ4oooAaW5wKTJz1oooAXcaQv2oooAjLUwvRRQAm+ms2aKKAP/Z"
 },
 {
  "id": "sala-gris",
  "nombre": "Sala gris",
  "img": "img/escenas/sala-gris.svg?v=1",
  "H": [
   [
    312,
    0,
    840
   ],
   [
    0,
    312,
    108.4
   ],
   [
    0,
    0,
    1
   ]
  ],
  "w": 1.25,
  "pw": 0.85,
  "sombra": [
   0.4,
   1
  ],
  "lado": [
   0,
   3
  ],
  "ajuste": "brightness(.88) contrast(.92) saturate(.85)",
  "luz": "linear-gradient(90deg,rgba(255,255,255,.04),rgba(0,0,0,.12))",
  "autor": "Max Vakhtbovych",
  "sitio": "Pexels",
  "url": "https://www.pexels.com/photo/comfortable-couch-in-light-room-6958125/",
  "thumb": "data:image/jpeg;base64,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"
 },
 {
  "id": "sala-calida",
  "nombre": "Sala cálida",
  "img": "img/escenas/sala-calida.svg?v=1",
  "H": [
   [
    523.4,
    0,
    801.6
   ],
   [
    0,
    523.4,
    131
   ],
   [
    0,
    0,
    1
   ]
  ],
  "w": 0.9,
  "pw": 0.65,
  "sombra": [
   -0.7,
   1
  ],
  "lado": [
   -2,
   3
  ],
  "ajuste": "brightness(.8) contrast(.9) saturate(.8) sepia(.35)",
  "luz": "linear-gradient(90deg,rgba(70,40,5,.36),rgba(200,130,40,.16))",
  "autor": "Josh Sorenson",
  "sitio": "Pexels",
  "url": "https://www.pexels.com/photo/cozy-living-room-with-sofa-and-lamp-36363112/",
  "thumb": "data:image/jpeg;base64,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"
 }
];
