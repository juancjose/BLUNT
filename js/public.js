/* Páginas públicas: cargan datos y arrancan la app */
import { loadPublic } from "./db.js";
loadPublic().finally(() => window.startApp());
