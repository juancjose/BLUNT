/* Inicio: arranca la app y la portada enseguida (sin esperar a Supabase);
   supabase-js se carga después y, cuando llegan obras/artistas, se completa la página. */
window.startApp();
if (window.initHome) window.initHome();
const s = document.createElement("script");
s.src = "js/vendor/supabase.min.js";
s.onload = () => import("./db.js").then(m => m.loadPublic()).then(() => {
  if ((window.OBRAS || []).length || (window.ARTISTAS || []).length) {
    if (window.refreshPublic) window.refreshPublic();
    if (window.homeRefresh) window.homeRefresh();
  }
}).catch(e => console.warn("No se pudieron cargar los datos", e));
document.head.appendChild(s);
