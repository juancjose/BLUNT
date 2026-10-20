/* Inicio: carga datos, arranca la app común y luego la portada */
import { loadPublic } from "./db.js";
loadPublic().finally(() => { window.startApp(); if (window.initHome) window.initHome(); });
