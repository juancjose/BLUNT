/* Cliente Supabase compartido + carga de obras y artistas publicados */
/* supabase-js se carga localmente desde js/vendor/supabase.min.js (sin depender de un CDN) */
if (!window.supabase || !window.supabase.createClient) throw new Error("supabase-js no se cargó");
const { createClient } = window.supabase;

export const sb = createClient(window.SUPABASE_URL, window.SUPABASE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});
window.sb = sb;

const svgData = (svg) => "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
export const workPlaceholder = svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect width="400" height="500" fill="#e9e9e9"/><rect x="150" y="200" width="100" height="100" fill="none" stroke="#bdbdbd" stroke-width="2"/></svg>');
export const avatarFor = (name) => svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#e6e6e6"/><text x="100" y="118" font-family="Helvetica,Arial,sans-serif" font-size="64" font-weight="600" text-anchor="middle" fill="#9a9a9a">${(name || "?").trim().charAt(0).toUpperCase()}</text></svg>`);

export const mapArtist = (a) => ({
  id: a.id, nombre: a.name || "", slug: a.slug, disciplina: a.discipline || "", disciplina_en: a.discipline_en || "",
  ciudad: a.city || "", img: a.photo_url || avatarFor(a.name), bio: a.bio_es || "", bio_en: a.bio_en || "",
  instagram: a.instagram || "", email: a.email_public || "", approved: a.approved
});
export const mapWork = (w) => ({
  id: w.id, titulo: w.title, titulo_en: w.title_en || "", artista: w.artist_id, precio: Number(w.price_usd || 0),
  medidas: w.size || "", tecnica: w.medium || "", tecnica_en: w.medium_en || "", anio: w.year || "",
  img: w.image_url || workPlaceholder, vendida: !!w.sold, descripcion: w.description || "", descripcion_en: w.description_en || ""
});

export async function loadPublic() {
  try {
    const [a, w] = await Promise.all([
      sb.from("artists").select("*").eq("approved", true).order("name"),
      sb.from("works").select("*").eq("published", true).order("created_at", { ascending: false })
    ]);
    if (a.error) throw a.error; if (w.error) throw w.error;
    const ids = new Set(a.data.map(x => x.id));
    window.ARTISTAS = a.data.map(mapArtist);
    window.OBRAS = w.data.filter(x => ids.has(x.artist_id)).map(mapWork);
  } catch (e) {
    console.warn("No se pudieron cargar los datos", e);
    window.ARTISTAS = []; window.OBRAS = [];
  }
}
