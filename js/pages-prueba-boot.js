/* Páginas de prueba: el encabezado ya está armado (pages-prueba.js).
   data-boot="now": la app arranca enseguida y los datos completan después.
   data-boot="data": la app espera los datos (catálogo / artistas), como en las páginas en vivo. */
const now = document.body.dataset.boot === "now";
let started = false;
const go = () => { if (started) return; started = true; window.startApp(); if (window.pgAfterApp) window.pgAfterApp(); };
if (now) go();
const done = () => { go(); if (now && ((window.OBRAS || []).length || (window.ARTISTAS || []).length) && window.refreshPublic) window.refreshPublic(); if (window.pgData) window.pgData(); };
const s = document.createElement("script");
s.src = "js/vendor/supabase.min.js";
s.onload = () => import("./db.js").then(m => m.loadPublic()).then(done).catch(e => { console.warn("No se pudieron cargar los datos", e); done(); });
s.onerror = done;
document.head.appendChild(s);
