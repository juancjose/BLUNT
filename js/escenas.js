/* =========================================================
   ESCENAS del probador de enmarcado — fotos reales con licencia libre
   (Pexels License / Unsplash License: uso comercial permitido, sin atribución obligatoria;
   igual las acreditamos). x/y/w/pw = posición del marco en % de la foto:
   x = centro horizontal, y = borde superior, w = ancho para obras horizontales, pw = ancho para verticales.
   bri = brillo del marco para igualar la luz de la foto; sx = desplazamiento horizontal de la sombra (px).
   ========================================================= */
var ESCENAS = [
 {
  "id": "living",
  "nombre": "Living",
  "img": "img/escenas/living.svg",
  "x": 40,
  "y": 24,
  "w": 24,
  "pw": 15,
  "bri": 1,
  "sx": 0,
  "autor": "Max Vakhtbovych",
  "sitio": "Pexels",
  "url": "https://www.pexels.com/photo/gray-couch-beside-white-wall-7195873/",
  "thumb": "data:image/jpeg;base64,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"
 },
 {
  "id": "dormitorio",
  "nombre": "Dormitorio",
  "img": "img/escenas/dormitorio.svg",
  "x": 40.5,
  "y": 21,
  "w": 28,
  "pw": 17,
  "bri": 0.86,
  "sx": 0,
  "autor": "Aljona Ovtšinnikova",
  "sitio": "Pexels",
  "url": "https://www.pexels.com/photo/minimalist-white-bedroom-interior-design-28536695/",
  "thumb": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAHgDASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAgMABAYFAQf/xAA7EAACAQMCAwUFBQUJAAAAAAABAgMABBEFIRJBYQYxUXGxEyIzgcEHI0KRoRQWNGJyJDJSU2OC0dLh/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAGBEBAQEBAQAAAAAAAAAAAAAAAAERIQL/2gAMAwEAAhEDEQA/AHCvGk4RmoKCRSVrAE30akBs5JxtXSRCEUnmM1npo3DhsHCnJrSIQbWE+KCg8FGKGiAqghRV4BRYoitc3Qtxk0Vhdpe8bIpAXG551X1G3klXCDNHoltJawSiVeE7Y60F+EYi+f0FDJu8Q/nHoaOP4Q8zQt8eIdSf0qiPzqtLVhzVeU7VBUbdjUqd7fOpRSlowM0C0xaCCMHlVhNhilrTVoGCjAoFpgFAQFEBXgFGKI84QeVQjEbeRoqGTaNvKiCj2iHmfWgP8SnRWPpRJ8Nfn60vP9oPSP6/+VVRzVWY092qnM+xqBanLqOtShibMy1KKFaYtJU05TQNWmrSlNMU0DRTFqv7QL3mmRzIfxD86CwBRAUsSpyNHxjr+VEFQSn7tqLOe6kTvgEUQYb7tfKlcX30nRQPWvOP3F8hSQ+Xlx4gfpRRSPVGeSnSs2O6ufOzZop1u+ZvIVKrW8mJGyeVSqHIXPSnKPFzS4wVUCjzg4xUFiNM8z+dWI40OzFh86REQEyTg0bTLFNjPLNBz+0DSWCpIrERPtxHkfCqekXy3dvlXDFDwtg860d1Fb6ppdxaTYZJIzjocZB/OvmXZHWbWwuLr9tciKTDAqCfeHLbzqEfSLfiIB8auog25k1l17a6WvwluG8PuSKB+28K/DtLh/8AaB6mrwytkqqpGKXfQkwNLEqkqPeB5iszY9r7i7IWLSruY/6ahvQ0+TtdNbOFk0q5jz/mkJV2GF3usRWihMhpDsqiqkWpXRjaTGMnJCbkVxNcW5mkOq2kHHAjcUsUW7RDHfjw68qoW/ay3XvWQDxK1lqNDNq43L3BxjOzHale0M0Bm4XCg/j2J64rn/vFpdyVMpRXXcFlx9K8vNdsBaExyrMxIAVD3U6ZHTtZgOLzqVyrK/imQmNwd9wdiKlVl3Je0+mLvGZZTj8EZ+uKozdqZG/h7L5yv9BXCUs3w0d/6VNPS0vZP7lo/mxArPWuL37w6oygAQJ1AJ+tLk1nVZDvdKvQRj61ItH1GQ7pEg6sTVtOzcz/ABLgD+hf+adOK0WrX65D3khBGCAAPQVxJYEtroHGIycZxWvg7NQowZ5JJCP8Rrorotu6hfYBvMVcNYlr23iUe8p23ANXtI0651Z1uTiO0VtywyXxyA8OtaC50m3gYItsEY/yYrvdnIkjzGE79txypIlpVrewaba8NuqCbGASNh1p0M1nqRMc0ayceAyyqMSdehrs3FhYIjzNaxk8JJIXvrLzxRJcH2XuqAAehrTLpW2gWdldCeD2sZPECvtCQBnYEVnO0/2drf8AHfaMqQ3fe8I2SX/qf0PStRaO97ZmLJM0Y9053YeFUTqN3bSYSVtuR3obXx25tprOYw3Vm0Eykgq6laUZWAwAo8hX2me5tNZtmstWsUuYW7lGxU+IPI1mtc+zWWzt3vdGjN5Aq8TQuo9sg9GHlv0qY3PTD6NIxvHZmzwptUr2yyl3cZUqQwXBGMY6VKJev//Z"
 },
 {
  "id": "comedor",
  "nombre": "Comedor",
  "img": "img/escenas/comedor.svg",
  "x": 28,
  "y": 11,
  "w": 30,
  "pw": 19,
  "bri": 0.95,
  "sx": -6,
  "autor": "Anna Tarazevich",
  "sitio": "Pexels",
  "url": "https://www.pexels.com/photo/white-table-and-chair-on-white-corner-wall-5598428/",
  "thumb": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAHgDASIAAhEBAxEB/8QAGwAAAQUBAQAAAAAAAAAAAAAABAACAwUGAQf/xAA0EAABBAEDAgQEAwgDAAAAAAABAAIDEQQFEiExQQYiYXETFFGxIyWRBxYyYnKBocFCY+H/xAAXAQEBAQEAAAAAAAAAAAAAAAABAAID/8QAHREBAQEAAQUBAAAAAAAAAAAAAAERAgMSEzFBIf/aAAwDAQACEQMRAD8A0LVI0KNqlakntTwmBPCickkuIJycEwFPbyUFNH1RkMTndAUPC0A2VYRSUFiukd+Uf13UmHHyeSx1gdbC7mZvyuHNP1+Gwu4F9Flz+0WBgoPHH/WVzthytZHh7xckp9gAhszDcwEsduCG0LXxrGPJOAQ1rtt7avhGz5FhMynKo5wWk2kn5fmJISXSOdANUrVC0qZpXRzPCeEwJ4QXUlxJSOAUjOFFu4XQ9Fagtj6UzZaHVBB66ZaB5WK3BjpPiMLS0ua4UfZeU6hp5xdRmx6B2PLR5u3b/C3Jkc021xHsaUb55CbLyT9Ss3pb9XkwZoGO7T9Ggi2Hc4b3UO5/8pHPnsKl+M89XuPuVLFPXltXj7Yp1O6ipX2khnvtJbkZtRRm1OwIeHqjI2cLbDoCeAnBieGqSPamO4RIYT2UGRHI1m5o3V2HVBQOcuMcbUfxNy6HUpCA6zQTJi8MNC/ZDnJbFM0vNNPBP0RZNgEEEHoQjNO4Ac4DrwVE53K7q2UImNYK3Hm+4AQUM5kBtajFowO4UJmrKDb7Bc38IR8n5gB/KFcvSlW5fwkhxJwkslGcwYrmvdy0EWPRaGMsLQ4VRFgrHZr7bVq50DPZNp2yV7Q6A7SXGuOy0IsMvWMLBcGTTxteejLG4/2Qr/EDXSNbCGuujyeT7DqlmZehPafnH4kn9TQ4qldl+FcWYSQ4skh7MZu2foTSLK1sXkep5RkLA0SOvgNbde9f7VljSTyRXkRCN99Ab4WYd4wjiZsxdPDG9tzqH6BQHxNqmRfwjFH/AEsv7qkF5NbPiRzW4Da/6jv7qtnBgdtfV+/VVePNm6hI5pyH03+Iuca/QI9mlR15p5CT12gBSCZ0w2cFD5udNhzymCQtquOo6DsrKXRYZAPx5RRB5AKq9c0rJiiyMtj2yR8ucBwWhF9JFlzyZkTch+0F7Q0AenVNxXlocD6KGd/woceEnzNZZHqlBJy61pgd8WkE+X8xv+UJmZnMw8d08gcWN67G2VRP8T4XzJla2QigK4VVGvbMCEllh4nlkZux9NmkbV7qNfZJDWrTLjy2EufjyAV9LVU+ezRC2eSA2Pe4gBvUnssZqMzJ82SWIUwnj19VUDI2Nk04OrkSH7ISuWn1/wBo3C82lu9JD9kFu8wH0cmpNXHCKwD+Jz34Q4IoKTGdsfd9DakfNqWTpeeXwEc1ua4WHK50/wAUtyJmwyYxa518tdx0VHr7A2WNw/51/hRaWAM+N30DvsVfVrR/vnilpLMOa7qnOAVZleKsnNDmujZBjtPmYzzF3uT2VPtFFxNcqB723K1rgdwsUjT+rXNmEwgymE7ZGp0MtAlA40om0hzO8JDh7LsUpLCbSyNdP1WR1hwzNYGPC1o2kRgNFeY9VopZhHE59E7QTQFkqp0fRtQdn/NZGK+Pq4GTiyUJoYmshxmQM/gY0NA9ElKMOUt80kbf72ks61j/2Q=="
 },
 {
  "id": "galeria",
  "nombre": "Galería",
  "img": "img/escenas/galeria.svg",
  "x": 57,
  "y": 32,
  "w": 18,
  "pw": 11.5,
  "bri": 0.97,
  "sx": 0,
  "autor": "Julia Taubitz",
  "sitio": "Unsplash",
  "url": "https://unsplash.com/photos/empty-art-gallery-with-concrete-floor-and-skylights-A-uqAGlvbj4",
  "thumb": "data:image/jpeg;base64,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"
 }
];
