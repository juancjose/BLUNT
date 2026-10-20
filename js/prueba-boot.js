/* Página de prueba: carga datos, arranca la app común y luego la portada nueva */
import { loadPublic } from "./db.js";
loadPublic().finally(() => { window.startApp(); if (window.initPrueba) window.initPrueba(); });
