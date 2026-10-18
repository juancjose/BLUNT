/* Ingreso de artistas: login, registro y recuperación de contraseña */
import { sb } from "./db.js";
window.startApp();
window.BLUNT_LOGIN_READY = true;
const $ = s => document.querySelector(s);
let lastEmail = "";

function msg(txt, ok, extra) {
  const m = $("#msg");
  m.textContent = txt; m.classList.toggle("ok", !!ok);
  if (extra) { m.append(" "); m.append(extra); }
}
function linkBtn(label, fn) { const b = document.createElement("button"); b.type = "button"; b.className = "text-btn"; b.textContent = label; b.onclick = fn; return b; }

/* Traduce errores de Supabase a mensajes claros */
function explain(e, ctx) {
  const code = e?.code || e?.error_code || "";
  const m = (e?.message || "").toLowerCase();
  if (code === "invalid_credentials" || m.includes("invalid login"))
    return ["Email o contraseña incorrectos. ¿Todavía no tenés cuenta? Primero creala.", linkBtn("Crear cuenta", () => show("up", true))];
  if (code === "email_not_confirmed" || m.includes("email not confirmed"))
    return ["Tenés que confirmar tu email antes de ingresar. Revisá tu casilla (y la carpeta de spam).", linkBtn("Reenviar email", resend)];
  if (code === "user_already_exists" || m.includes("already registered") || m.includes("already been registered"))
    return ["Ese email ya tiene una cuenta. Ingresá con tu contraseña.", linkBtn("Ingresar", () => show("in", true))];
  if (code === "weak_password" || (m.includes("password") && m.includes("characters")))
    return ["La contraseña debe tener al menos 8 caracteres."];
  if (code === "email_address_invalid" || m.includes("is invalid")) return ["Ese email no es válido. Revisalo."];
  if (code === "email_address_not_authorized" || m.includes("not authorized"))
    return ["No pudimos enviar el email de confirmación a esa dirección. Escribinos para habilitarla."];
  if (code === "over_email_send_rate_limit" || code === "over_request_rate_limit" || m.includes("rate limit"))
    return ["Se alcanzó el límite de emails por hora. Esperá un rato y volvé a intentar."];
  if (code === "signup_disabled" || m.includes("signups not allowed")) return ["Los registros nuevos están desactivados por el momento."];
  if (code === "same_password") return ["La nueva contraseña tiene que ser distinta de la anterior."];
  if (m.includes("database error")) return ["Hubo un error al crear tu cuenta. Escribinos y lo resolvemos."];
  if (m.includes("failed to fetch") || m.includes("network")) return ["No hay conexión con el servidor. Revisá tu conexión e intentá de nuevo."];
  console.warn("Auth error", ctx, e);
  return ["No se pudo completar la operación. Intentá de nuevo."];
}
const fail = (e, ctx) => { const [t, x] = explain(e, ctx); msg(t, false, x); };

function show(tab, keepMsg) {
  document.querySelectorAll("[data-pane]").forEach(f => f.hidden = f.dataset.pane !== tab);
  document.querySelectorAll(".tab").forEach(b => b.setAttribute("aria-selected", b.dataset.tab === tab));
  document.querySelector(".tabs").hidden = tab === "new";
  if (lastEmail) document.querySelectorAll(`[data-pane="${tab}"] [name=email]`).forEach(i => { if (!i.value) i.value = lastEmail; });
  if (!keepMsg) msg("");
}
document.querySelectorAll("[data-tab]").forEach(b => b.addEventListener("click", () => show(b.dataset.tab)));
const busy = (form, on) => form.querySelectorAll("button").forEach(b => b.disabled = on);
const base = location.href.replace(/[?#].*$/, "").replace(/[^/]*$/, "");

async function resend() {
  if (!lastEmail) return;
  const { error } = await sb.auth.resend({ type: "signup", email: lastEmail, options: { emailRedirectTo: base + "panel.html" } });
  if (error) return fail(error, "resend");
  msg("Te reenviamos el email de confirmación.", true);
}

/* Errores que vienen en el link del email (link vencido, etc.) */
const hp = new URLSearchParams(location.hash.slice(1) || location.search.slice(1));
if (hp.get("error_description")) {
  const d = hp.get("error_code") === "otp_expired" ? "El link expiró o ya fue usado. Pedí uno nuevo." : hp.get("error_description");
  msg(d);
}

let recovering = /type=recovery/.test(location.hash);
sb.auth.onAuthStateChange(ev => { if (ev === "PASSWORD_RECOVERY") { recovering = true; show("new"); } });
sb.auth.getSession().then(({ data: { session } }) => {
  if (recovering) show("new");
  else if (session) location.replace("panel.html");
});
document.querySelectorAll("form button").forEach(b => b.disabled = false);

$("#fIn").addEventListener("submit", async e => {
  e.preventDefault(); const f = e.target, d = new FormData(f); busy(f, true); msg("Ingresando…", true);
  lastEmail = d.get("email").trim();
  try {
    const { error } = await sb.auth.signInWithPassword({ email: lastEmail, password: d.get("password") });
    if (error) return fail(error, "signin");
    location.href = "panel.html";
  } catch (err) { fail(err, "signin"); } finally { busy(f, false); }
});
$("#fUp").addEventListener("submit", async e => {
  e.preventDefault(); const f = e.target, d = new FormData(f); busy(f, true); msg("Creando cuenta…", true);
  lastEmail = d.get("email").trim();
  try {
    const { data, error } = await sb.auth.signUp({
      email: lastEmail, password: d.get("password"),
      options: { data: { name: d.get("name").trim() }, emailRedirectTo: base + "panel.html" }
    });
    if (error) return fail(error, "signup");
    if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0)
      return msg("Ese email ya tiene una cuenta. Ingresá con tu contraseña.", false, linkBtn("Ingresar", () => show("in", true)));
    if (data.session) { location.href = "panel.html"; return; }
    f.reset(); show("in", true);
    msg(`Cuenta creada. Te enviamos un email a ${lastEmail}: abrí el link para confirmarla y después ingresá.`, true, linkBtn("Reenviar email", resend));
  } catch (err) { fail(err, "signup"); } finally { busy(f, false); }
});
$("#fReset").addEventListener("submit", async e => {
  e.preventDefault(); const f = e.target, d = new FormData(f); busy(f, true);
  lastEmail = d.get("email").trim();
  try {
    const { error } = await sb.auth.resetPasswordForEmail(lastEmail, { redirectTo: base + "login.html" });
    if (error) return fail(error, "reset");
    msg("Si el email está registrado, vas a recibir un link para restablecer tu contraseña.", true);
  } catch (err) { fail(err, "reset"); } finally { busy(f, false); }
});
$("#fNew").addEventListener("submit", async e => {
  e.preventDefault(); const f = e.target, d = new FormData(f); busy(f, true);
  try {
    const { error } = await sb.auth.updateUser({ password: d.get("password") });
    if (error) return fail(error, "update");
    msg("Contraseña actualizada.", true); setTimeout(() => location.href = "panel.html", 900);
  } catch (err) { fail(err, "update"); } finally { busy(f, false); }
});
