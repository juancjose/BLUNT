/* Panel de artista (y administración) */
import { sb, avatarFor, workPlaceholder } from "./db.js";
window.startApp();
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const say = (el, txt, ok) => { el.textContent = txt; el.classList.toggle("ok", !!ok); if (txt && ok) setTimeout(() => { if (el.textContent === txt) el.textContent = ""; }, 3500); };
const slugify = s => (s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const { data: { session } } = await sb.auth.getSession();
if (!session) { location.replace("login.html"); await new Promise(() => {}); }
const me = session.user;
$("#pWho").textContent = me.email;
$("#logout").onclick = async () => { await sb.auth.signOut(); location.href = "login.html"; };

const { data: adm } = await sb.from("admins").select("user_id").eq("user_id", me.id).maybeSingle();
const isAdmin = !!adm;
let current = me.id;          // id del artista que se está editando
let artist = null, works = [];

/* ---------- Imágenes: reducción en el navegador antes de subir ---------- */
async function shrink(file, max = 1800) {
  const img = await createImageBitmap(file);
  const k = Math.min(1, max / Math.max(img.width, img.height));
  const c = document.createElement("canvas"); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
  c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
  return await new Promise(r => c.toBlob(r, "image/jpeg", 0.86));
}
async function upload(bucket, file) {
  const blob = await shrink(file, bucket === "avatars" ? 800 : 1800);
  const path = `${current}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.jpg`;
  const { error } = await sb.storage.from(bucket).upload(path, blob, { contentType: "image/jpeg", upsert: false });
  if (error) throw error;
  return sb.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
async function removeStored(bucket, url) {
  const m = url && url.split(`/storage/v1/object/public/${bucket}/`)[1];
  if (m) await sb.storage.from(bucket).remove([decodeURIComponent(m)]);
}

/* ---------- Perfil ---------- */
const fP = $("#fProfile");
async function loadArtist() {
  let { data } = await sb.from("artists").select("*").eq("id", current).maybeSingle();
  if (!data && current === me.id) {
    const ins = await sb.from("artists").insert({ id: me.id, name: me.user_metadata?.name || me.email.split("@")[0] }).select().single();
    data = ins.data;
  }
  artist = data || {};
  ["name", "city", "discipline", "discipline_en", "instagram", "email_public", "bio_es", "bio_en"].forEach(k => fP.elements[k].value = artist[k] || "");
  $("#avatarImg").src = artist.photo_url || avatarFor(artist.name);
  $("#pTitle").textContent = current === me.id ? "Tu panel" : artist.name || "Artista";
  $("#pending").hidden = !!artist.approved || current !== me.id || isAdmin;
}
fP.addEventListener("submit", async e => {
  e.preventDefault();
  const v = Object.fromEntries(new FormData(fP)); Object.keys(v).forEach(k => v[k] = v[k].trim() || null);
  if (!v.name) return;
  v.slug = artist.slug || slugify(v.name) || null;
  let { error } = await sb.from("artists").update(v).eq("id", current);
  if (error && error.code === "23505") { v.slug = `${slugify(v.name)}-${current.slice(0, 4)}`; ({ error } = await sb.from("artists").update(v).eq("id", current)); }
  if (error) return say($("#profileMsg"), "No se pudo guardar el perfil.");
  Object.assign(artist, v); say($("#profileMsg"), "Perfil guardado.", true);
  if (isAdmin) loadAdmin();
});
$("#avatarFile").addEventListener("change", async e => {
  const f = e.target.files[0]; if (!f) return;
  say($("#profileMsg"), "Subiendo foto…");
  try {
    const url = await upload("avatars", f);
    const old = artist.photo_url;
    const { error } = await sb.from("artists").update({ photo_url: url }).eq("id", current);
    if (error) throw error;
    artist.photo_url = url; $("#avatarImg").src = url; await removeStored("avatars", old);
    say($("#profileMsg"), "Foto actualizada.", true);
  } catch { say($("#profileMsg"), "No se pudo subir la foto."); }
  e.target.value = "";
});

/* ---------- Obras ---------- */
async function loadWorks() {
  const { data } = await sb.from("works").select("*").eq("artist_id", current).order("created_at", { ascending: false });
  works = data || [];
  $("#workList").innerHTML = works.length ? works.map(w => `
    <article class="pw" data-id="${w.id}">
      <div class="pw-img"><img src="${esc(w.image_url || workPlaceholder)}" alt="">${w.sold ? '<span class="sold">Vendida</span>' : ""}${!w.published ? '<span class="sold draft">Oculta</span>' : ""}</div>
      <div class="pw-meta"><h3 data-no-i18n>${esc(w.title)}</h3><p class="muted small" data-no-i18n>${esc([w.medium, w.size, w.year].filter(Boolean).join(" · "))}</p><p class="small">${w.price_usd != null ? "USD " + Number(w.price_usd).toLocaleString("es-AR") : ""}</p></div>
      <div class="pw-actions">
        <button class="text-btn" type="button" data-act="edit">Editar</button>
        <button class="text-btn" type="button" data-act="sold">${w.sold ? "Marcar disponible" : "Marcar vendida"}</button>
        <button class="text-btn danger" type="button" data-act="del">Eliminar</button>
      </div>
    </article>`).join("") : '<p class="empty-state">Todavía no cargaste obras.</p>';
}
$("#workList").addEventListener("click", async e => {
  const b = e.target.closest("[data-act]"); if (!b) return;
  const w = works.find(x => x.id === b.closest(".pw").dataset.id);
  if (b.dataset.act === "edit") openWork(w);
  if (b.dataset.act === "sold") { await sb.from("works").update({ sold: !w.sold }).eq("id", w.id); loadWorks(); }
  if (b.dataset.act === "del") {
    if (!confirm(LANG === "en" ? `Delete “${w.title}”?` : `¿Eliminar “${w.title}”?`)) return;
    const { error } = await sb.from("works").delete().eq("id", w.id);
    if (!error) { await removeStored("artworks", w.image_url); loadWorks(); if (isAdmin) loadAdmin(); }
  }
});
const dlg = $("#workDlg"), fW = $("#fWork");
let editing = null, newImg = null;
function openWork(w) {
  editing = w || null; newImg = null; fW.reset(); say($("#workMsg"), "");
  $("#wdTitle").textContent = w ? "Editar obra" : "Nueva obra";
  ["title", "title_en", "medium", "medium_en", "size", "year", "price_usd", "description", "description_en"].forEach(k => fW.elements[k].value = w?.[k] ?? "");
  fW.elements.published.checked = w ? w.published : true; fW.elements.sold.checked = !!w?.sold;
  $("#wImgPrev").src = w?.image_url || workPlaceholder;
  dlg.showModal();
}
$("#newWork").onclick = () => openWork(null);
$("#wdClose").onclick = () => dlg.close();
$("#wImgFile").addEventListener("change", e => { newImg = e.target.files[0] || null; if (newImg) $("#wImgPrev").src = URL.createObjectURL(newImg); });
fW.addEventListener("submit", async e => {
  e.preventDefault();
  const fd = new FormData(fW), v = {};
  ["title", "title_en", "medium", "medium_en", "size", "description", "description_en"].forEach(k => v[k] = (fd.get(k) || "").trim() || null);
  v.year = fd.get("year") ? parseInt(fd.get("year"), 10) : null;
  v.price_usd = fd.get("price_usd") !== "" ? Number(fd.get("price_usd")) : null;
  v.published = fW.elements.published.checked; v.sold = fW.elements.sold.checked;
  if (!v.title) return;
  $("#wSave").disabled = true; say($("#workMsg"), newImg ? "Subiendo imagen…" : "Guardando…");
  try {
    if (newImg) v.image_url = await upload("artworks", newImg);
    const q = editing ? sb.from("works").update(v).eq("id", editing.id) : sb.from("works").insert({ ...v, artist_id: current });
    const { error } = await q; if (error) throw error;
    if (newImg && editing?.image_url) await removeStored("artworks", editing.image_url);
    dlg.close(); loadWorks(); if (isAdmin) loadAdmin();
  } catch { say($("#workMsg"), "No se pudo guardar la obra."); }
  $("#wSave").disabled = false;
});

/* ---------- Administración ---------- */
async function loadAdmin() {
  const [{ data: arts }, { data: ws }] = await Promise.all([
    sb.from("artists").select("id,name,approved,created_at,city").order("created_at"),
    sb.from("works").select("artist_id")
  ]);
  const count = id => (ws || []).filter(w => w.artist_id === id).length;
  $("#actAs").innerHTML = (arts || []).map(a => `<option value="${a.id}"${a.id === current ? " selected" : ""}>${esc(a.name || "—")}${a.id === me.id ? " (vos)" : ""}</option>`).join("");
  $("#adminList").innerHTML = (arts || []).map(a => `<tr data-id="${a.id}">
    <td data-no-i18n><strong style="font-weight:500">${esc(a.name || "—")}</strong>${a.city ? `<br><span class="muted small">${esc(a.city)}</span>` : ""}</td>
    <td>${count(a.id)}</td>
    <td>${a.approved ? '<span class="pill ok">Aprobado</span>' : '<span class="pill">Pendiente</span>'}</td>
    <td class="right"><button class="text-btn" data-adm="toggle" type="button">${a.approved ? "Quitar aprobación" : "Aprobar"}</button> <button class="text-btn" data-adm="edit" type="button">Editar</button></td></tr>`).join("") || '<tr><td colspan="4" class="muted">Todavía no hay artistas registrados.</td></tr>';
}
if (isAdmin) {
  $("#adminSec").hidden = false; $("#adminBar").hidden = false;
  $("#actAs").addEventListener("change", e => { current = e.target.value; loadArtist(); loadWorks(); });
  $("#adminList").addEventListener("click", async e => {
    const b = e.target.closest("[data-adm]"); if (!b) return;
    const id = b.closest("tr").dataset.id;
    if (b.dataset.adm === "edit") { current = id; $("#actAs").value = id; await loadArtist(); loadWorks(); scrollTo({ top: 0, behavior: "smooth" }); }
    if (b.dataset.adm === "toggle") {
      const { data: a } = await sb.from("artists").select("approved").eq("id", id).single();
      await sb.from("artists").update({ approved: !a.approved }).eq("id", id); loadAdmin(); if (id === current) loadArtist();
    }
  });
  loadAdmin();
}
await loadArtist();
await loadWorks();
