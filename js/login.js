/* Ingreso de artistas: login, registro y recuperación de contraseña */
import { sb } from "./db.js";
window.startApp();
const $ = s => document.querySelector(s);
const msg = (txt, ok) => { const m = $("#msg"); m.textContent = txt; m.classList.toggle("ok", !!ok); };
const errEs = (e) => {
  const m = (e && e.message || "").toLowerCase();
  if (m.includes("invalid login")) return "Email o contraseña incorrectos.";
  if (m.includes("email not confirmed")) return "Tenés que confirmar tu email antes de ingresar. Revisá tu casilla.";
  if (m.includes("already registered") || m.includes("already been registered")) return "Ese email ya tiene una cuenta. Probá ingresar.";
  if (m.includes("password")) return "La contraseña debe tener al menos 8 caracteres.";
  if (m.includes("rate limit")) return "Demasiados intentos. Esperá unos minutos.";
  return "No se pudo completar la operación. Intentá de nuevo.";
};
function show(tab) {
  document.querySelectorAll("[data-pane]").forEach(f => f.hidden = f.dataset.pane !== tab);
  document.querySelectorAll(".tab").forEach(b => b.setAttribute("aria-selected", b.dataset.tab === tab));
  document.querySelector(".tabs").hidden = tab === "new";
  msg("");
}
document.querySelectorAll("[data-tab]").forEach(b => b.addEventListener("click", () => show(b.dataset.tab)));
const busy = (form, on) => form.querySelectorAll("button").forEach(b => b.disabled = on);
const base = location.href.replace(/[^/]*$/, "");

let recovering = /type=recovery/.test(location.hash);
sb.auth.onAuthStateChange((ev) => { if (ev === "PASSWORD_RECOVERY") { recovering = true; show("new"); } });
const { data: { session } } = await sb.auth.getSession();
if (recovering) show("new");
else if (session) location.replace("panel.html");

$("#fIn").addEventListener("submit", async e => {
  e.preventDefault(); const f = e.target, d = new FormData(f); busy(f, true);
  const { error } = await sb.auth.signInWithPassword({ email: d.get("email").trim(), password: d.get("password") });
  busy(f, false);
  if (error) return msg(errEs(error));
  location.href = "panel.html";
});
$("#fUp").addEventListener("submit", async e => {
  e.preventDefault(); const f = e.target, d = new FormData(f); busy(f, true);
  const { data, error } = await sb.auth.signUp({
    email: d.get("email").trim(), password: d.get("password"),
    options: { data: { name: d.get("name").trim() }, emailRedirectTo: base + "panel.html" }
  });
  busy(f, false);
  if (error) return msg(errEs(error));
  if (data.session) location.href = "panel.html";
  else { f.reset(); msg("Listo. Te enviamos un email para confirmar tu cuenta.", true); }
});
$("#fReset").addEventListener("submit", async e => {
  e.preventDefault(); const f = e.target, d = new FormData(f); busy(f, true);
  const { error } = await sb.auth.resetPasswordForEmail(d.get("email").trim(), { redirectTo: base + "login.html" });
  busy(f, false);
  if (error) return msg(errEs(error));
  msg("Si el email está registrado, vas a recibir un link para restablecer tu contraseña.", true);
});
$("#fNew").addEventListener("submit", async e => {
  e.preventDefault(); const f = e.target, d = new FormData(f); busy(f, true);
  const { error } = await sb.auth.updateUser({ password: d.get("password") });
  busy(f, false);
  if (error) return msg(errEs(error));
  msg("Contraseña actualizada.", true); setTimeout(() => location.href = "panel.html", 900);
});
