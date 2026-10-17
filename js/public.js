/* Páginas públicas: cargan datos y arrancan la app */
import { loadPublic } from "./db.js";
await loadPublic();
window.startApp();
