/* Lógica común: tema, header/footer, carrito y render de páginas */
window.startApp = function () {
  const LOGO = `<svg class="logo-svg" viewBox="0 0 1776 228" fill="currentColor" role="img" aria-label="${CONFIG.nombre}"><path class="l" style="--i:0" fill-rule="evenodd" d="M0.0 0H363.0V228H0.0ZM0.0 226.5L0.0 225.1L147.8 224.7L295.5 224.4L302.5 222.8C321.5 218.4 332.8 213.2 343.5 203.7C352.8 195.5 359.9 182.9 361.9 170.7L362.8 165.5L362.9 196.8L363.0 228.0L181.5 228.0L0.0 228.0L0.0 226.5ZM80.5 174.7C80.2 174.0 80.1 165.1 80.2 155.0L80.5 136.5L175.0 136.5L269.5 136.5L273.0 138.4C280.0 142.1 283.1 146.2 284.4 153.2C285.9 161.3 280.9 170.1 272.7 173.6L268.5 175.5L174.7 175.8L81.0 176.1L80.5 174.7ZM361.3 146.8C360.6 143.5 358.7 137.8 356.9 134.2C353.0 126.2 342.8 115.3 335.8 111.5C332.9 110.0 330.4 108.6 330.2 108.5C330.0 108.3 332.3 105.8 335.3 102.9L340.7 97.5L344.3 90.0L348.0 82.5L349.0 75.0C352.2 51.9 341.6 28.5 321.9 15.5C310.7 8.0 291.9 2.3 273.5 0.7C271.3 0.5 290.5 0.3 316.2 0.2L363.0 0.0L363.0 76.5C363.0 118.6 362.9 153.0 362.7 153.0C362.6 153.0 361.9 150.2 361.3 146.8ZM80.0 68.5L80.0 50.0L172.2 50.2L264.5 50.5L268.8 53.0C281.3 60.1 280.7 77.6 267.6 84.8L264.5 86.5L172.2 86.8L80.0 87.1L80.0 68.5Z"/><path class="l" style="--i:1" fill-rule="evenodd" d="M394.0 0H677.0V228H394.0ZM394.0 226.2L394.0 224.5L535.5 224.8L677.0 225.0L677.0 226.5L677.0 228.0L535.5 228.0L394.0 228.0L394.0 226.2ZM468.8 88.4L468.5 -0.0L572.8 -0.0L677.0 0.0L677.0 84.8L677.0 169.6L674.2 169.7C666.9 170.2 609.4 172.1 576.5 173.0C523.8 174.4 473.9 176.0 471.3 176.4L469.0 176.7L468.8 88.4Z"/><path class="l" style="--i:2" fill-rule="evenodd" d="M696.0 0H1035.0V228H696.0ZM696.1 179.8L696.3 131.5L697.1 140.5C701.9 193.1 735.6 223.0 794.5 227.0L805.5 227.7L750.8 227.9L696.0 228.0L696.1 179.8ZM937.0 226.9C994.4 222.4 1026.8 195.2 1033.9 145.5L1034.8 139.5L1034.9 183.8L1035.0 228.0L980.8 227.9L926.5 227.7L937.0 226.9ZM818.3 175.9C790.4 172.7 777.6 163.6 771.2 142.7L769.6 137.5L769.3 68.8L768.9 0.0L865.2 -0.0L961.5 -0.0L960.9 70.2L960.4 140.5L958.7 145.4C952.2 164.3 938.5 173.1 911.0 176.0C899.7 177.2 828.6 177.1 818.3 175.9Z"/><path class="l" style="--i:3" fill-rule="evenodd" d="M1074.0 0H1412.0V228H1074.0ZM1074.1 223.8L1074.3 219.5L1074.7 222.2L1075.1 225.0L1111.6 225.0L1148.0 225.0L1148.2 155.9L1148.5 86.7L1191.0 120.9C1214.4 139.7 1241.6 161.7 1251.5 169.8C1261.4 177.9 1279.9 192.9 1292.7 203.2L1315.9 221.9L1321.1 223.4L1326.4 225.0L1369.2 225.0L1412.0 225.0L1412.0 226.5L1412.0 228.0L1243.0 228.0L1074.0 228.0L1074.1 223.8ZM1327.5 142.3C1295.9 117.6 1253.8 83.4 1210.3 47.1L1158.0 3.5L1153.3 1.8L1148.5 0.1L1241.8 0.0L1335.0 0.0L1335.0 73.5C1335.0 113.9 1334.7 147.0 1334.2 147.0C1333.8 147.0 1330.8 144.9 1327.5 142.3ZM1074.3 20.0C1074.3 16.4 1074.5 15.0 1074.7 16.8C1074.9 18.5 1074.9 21.5 1074.7 23.2C1074.5 25.0 1074.3 23.6 1074.3 20.0Z"/><path class="l" style="--i:4" fill-rule="evenodd" d="M1441.0 0H1776.0V228H1441.0ZM1441.0 139.0L1441.0 50.0L1499.0 50.0L1557.0 50.0L1557.0 137.5L1557.0 225.0L1597.0 225.0L1637.0 225.0L1637.0 137.5L1637.0 50.0L1705.9 50.0L1774.9 50.0L1775.3 48.3C1775.6 47.3 1775.8 87.3 1775.9 137.2L1776.0 228.0L1608.5 228.0L1441.0 228.0L1441.0 139.0Z"/></svg>`;
  const $ = (s, r = document) => r.querySelector(s);
  const fmt = n => `${CONFIG.moneda} ${n.toLocaleString("es-AR")}`;
  const artista = id => ARTISTAS.find(a => a.id === id) || { nombre: "" };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- Tema ---------- */
  const root = document.documentElement;
  function setTheme(t, save) {
    root.dataset.theme = t;
    if (save) localStorage.setItem("tema", t);
    const b = $("#themeBtn");
    if (b) b.setAttribute("aria-label", t === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
  }
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
    if (!localStorage.getItem("tema")) setTheme(e.matches ? "dark" : "light");
  });

  /* ---------- Header / Footer ---------- */
  const page = document.body.dataset.page;
  const links = [["index.html", "Inicio", "inicio"], ["obras.html", "Obras", "obras"], ["artistas.html", "Artistas", "artistas"], ["enmarcado.html", "Enmarcado", "enmarcado"], ["contacto.html", "Contacto", "contacto"]];
  const ico = {
    moon: '<svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    sun: '<svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 7h12l-1 14H7L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 8h16M4 16h16"/></svg>'
  };
  document.body.insertAdjacentHTML("afterbegin", `
  <a class="skip" href="#main">Saltar al contenido</a>
  <header class="site"><div class="wrap">
    <a class="logo" href="index.html" aria-label="${esc(CONFIG.nombre)} — inicio">${LOGO}</a>
    <nav class="main" id="nav" aria-label="Principal"><ul>${links.map(([h, t, k]) => `<li><a href="${h}"${k === page ? ' aria-current="page"' : ""}>${t}</a></li>`).join("")}</ul></nav>
    <div class="tools">
      <button class="icon-btn lang-btn" id="langBtn" type="button" data-no-i18n>EN</button>
      <button class="icon-btn" id="themeBtn" type="button">${ico.moon}${ico.sun}</button>
      <button class="icon-btn" id="cartBtn" type="button" aria-label="Abrir carrito">${ico.bag}<span class="badge" id="cartCount" hidden>0</span></button>
      <button class="icon-btn menu-btn" id="menuBtn" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav">${ico.menu}</button>
    </div></div></header>`);
  document.body.insertAdjacentHTML("beforeend", `
  <footer class="site"><div class="wrap">
    <div class="cols">
      <div><div class="logo logo-foot">${LOGO}</div><p class="muted" style="margin-top:10px;max-width:340px">${esc(CONFIG.lema)}. Obra original de artistas argentinos y enmarcado a medida.</p></div>
      <div><h4>Explorar</h4><ul>${links.slice(1).map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul></div>
      <div><h4>Contacto</h4><ul><li><a href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></li><li><a href="mailto:${CONFIG.email}">${CONFIG.email}</a></li><li><a href="${CONFIG.instagram}" target="_blank" rel="noopener">Instagram</a></li><li class="muted">${CONFIG.ciudad}</li></ul></div>
    </div>
    <p class="legal"><span>© ${new Date().getFullYear()} ${esc(CONFIG.nombre)}. Todos los derechos reservados.</span> <a class="artist-login" href="login.html">Artistas: ingresar</a></p>
  </div></footer>
  <div class="overlay" id="overlay"></div>
  <aside class="drawer" id="drawer" role="dialog" aria-modal="true" aria-labelledby="cartTitle" aria-hidden="true">
    <header><h3 id="cartTitle">Tu selección</h3><button class="icon-btn" id="closeCart" type="button" aria-label="Cerrar carrito">✕</button></header>
    <div class="items" id="cartItems"></div>
    <footer><div class="total"><span>Total</span><strong id="cartTotal"></strong></div>
      <button class="btn" id="sendWa" type="button">Enviar pedido por WhatsApp</button>
      <button class="btn ghost" id="sendMail" type="button">Enviar por mail</button>
      <p class="muted" style="font-size:.78rem;text-align:center">Te respondemos para coordinar pago y envío.</p></footer>
  </aside><div class="toast" id="toast" role="status" aria-live="polite"></div>`);
  document.title = document.title.replace("{nombre}", CONFIG.nombre);

  setTheme(root.dataset.theme || "light");
  if (typeof setLang === "function") $("#langBtn").onclick = () => setLang(LANG === "es" ? "en" : "es");
  $("#themeBtn").onclick = () => setTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
  $("#menuBtn").onclick = e => { const o = $("#nav").classList.toggle("open"); e.currentTarget.setAttribute("aria-expanded", o); };

  /* ---------- Carrito ---------- */
  const getCart = () => { try { return JSON.parse(localStorage.getItem("carrito")) || []; } catch { return []; } };
  const saveCart = c => { localStorage.setItem("carrito", JSON.stringify(c)); renderCart(); };
  function toast(m) { const t = $("#toast"); t.textContent = m; t.classList.add("show"); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("show"), 2200); }
  window.addToCart = id => {
    const c = getCart(); const o = OBRAS.find(x => x.id === id);
    if (!o || o.vendida) return;
    if (c.includes(id)) { toast("Esta obra ya está en tu selección"); return; }
    c.push(id); saveCart(c); toast(`“${o.titulo}” se agregó a tu selección`);
  };
  function renderCart() {
    const items = getCart().map(id => OBRAS.find(o => o.id === id)).filter(Boolean);
    const n = $("#cartCount"); n.textContent = items.length; n.hidden = !items.length;
    $("#cartItems").innerHTML = items.length ? items.map(o => `
      <div class="citem"><img src="${o.img}" alt=""><div><strong style="font-weight:500">${esc(o.titulo)}</strong><br><span class="muted">${esc(artista(o.artista).nombre)}</span><br><button type="button" data-rm="${o.id}">Quitar</button></div><span>${fmt(o.precio)}</span></div>`).join("")
      : '<p class="empty">Todavía no agregaste obras.</p>';
    $("#cartTotal").textContent = fmt(items.reduce((s, o) => s + o.precio, 0));
    $("#sendWa").disabled = $("#sendMail").disabled = !items.length;
  }
  function orderText() {
    const items = getCart().map(id => OBRAS.find(o => o.id === id)).filter(Boolean);
    return `${t("Hola")} ${CONFIG.nombre}! ${t("Me interesan estas obras:")}\n` + items.map(o => `• ${t(o.titulo)} – ${artista(o.artista).nombre} (${fmt(o.precio)})`).join("\n") + `\nTotal: ${fmt(items.reduce((s, o) => s + o.precio, 0))}\n${t("¿Me pasan info de pago y envío?")}`;
  }
  $("#cartItems").onclick = e => { const id = e.target.dataset.rm; if (id) saveCart(getCart().filter(x => x !== id)); };
  $("#sendWa").onclick = () => window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(orderText())}`, "_blank", "noopener");
  $("#sendMail").onclick = () => location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(t("Pedido de obras") + " – " + CONFIG.nombre)}&body=${encodeURIComponent(orderText())}`;
  let lastFocus;
  const openCart = () => { lastFocus = document.activeElement; $("#drawer").classList.add("open"); $("#overlay").classList.add("open"); $("#drawer").setAttribute("aria-hidden", "false"); $("#closeCart").focus(); };
  const closeCart = () => { $("#drawer").classList.remove("open"); $("#overlay").classList.remove("open"); $("#drawer").setAttribute("aria-hidden", "true"); lastFocus && lastFocus.focus(); };
  $("#cartBtn").onclick = openCart; $("#closeCart").onclick = closeCart; $("#overlay").onclick = closeCart;
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeCart(); });
  window.addEventListener("storage", renderCart);
  renderCart();

  /* ---------- Componentes ---------- */
  const card = o => `<article class="work${o.vendida ? " is-sold" : ""}"><a href="obra.html?id=${o.id}">
    <div class="ph"><img src="${o.img}" alt="${esc(o.titulo)}, obra de ${esc(artista(o.artista).nombre)}" loading="lazy">${o.vendida ? '<span class="sold">Vendida</span>' : ""}</div>
    <div class="meta"><div><h3>${esc(o.titulo)}</h3><p class="by">${esc(artista(o.artista).nombre)}</p></div><span class="price">${o.vendida ? '<span class="muted">Vendida</span>' : fmt(o.precio)}</span></div></a></article>`;

  const el = id => document.getElementById(id);
  const soon = (txt) => `<p class="empty-state">${txt}</p>`;
  if (el("featured")) el("featured").innerHTML = OBRAS.slice(0, 4).map(card).join("") || soon("Próximamente nuevas obras");
  if (el("artistsStrip")) el("artistsStrip").innerHTML = (ARTISTAS.map(a => `<a class="artist" href="obras.html?artista=${a.id}"><img src="${a.img}" alt="" loading="lazy"><h3>${esc(a.nombre)}</h3><p>${esc(a.disciplina)}</p></a>`).join("") || soon("Próximamente nuevos artistas"));
  if (el("heroImg")) { const o = OBRAS.find(x => x.img); el("heroImg").innerHTML = o ? `<img src="${o.img}" alt="${esc(o.titulo)}, de ${esc(artista(o.artista).nombre)}">` : `<img src="img/enmarcado.svg" alt="">`; }
  document.querySelectorAll("[data-brand]").forEach(n => n.textContent = CONFIG.nombre);

  // Catálogo
  if (el("catalog")) {
    const params = new URLSearchParams(location.search);
    let filtro = params.get("artista") || "todos";
    const f = el("filters"), sort = el("sort");
    f.innerHTML = [["todos", "Todos"], ...ARTISTAS.map(a => [a.id, a.nombre])].map(([id, n]) => `<button class="chip" type="button" data-f="${id}">${esc(n)}</button>`).join("");
    const render = () => {
      f.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", c.dataset.f === filtro));
      let list = OBRAS.filter(o => filtro === "todos" || o.artista === filtro);
      if (sort.value === "asc") list.sort((a, b) => a.precio - b.precio);
      if (sort.value === "desc") list.sort((a, b) => b.precio - a.precio);
      el("catalog").innerHTML = list.map(card).join("") || (OBRAS.length ? '<p class="muted">No hay obras para este filtro.</p>' : soon("Próximamente nuevas obras"));
      el("count").textContent = `${list.length} ${list.length === 1 ? "obra" : "obras"}`;
    };
    f.onclick = e => { if (e.target.dataset.f) { filtro = e.target.dataset.f; render(); } };
    sort.onchange = render; render();
  }

  // Detalle
  if (el("detail")) {
    const o = OBRAS.find(x => x.id === new URLSearchParams(location.search).get("id"));
    if (!o) { el("detail").innerHTML = '<div><h1>Obra no encontrada</h1><p class="muted" style="margin:16px 0 32px">Puede que ya no esté disponible.</p><a class="btn" href="obras.html">Ver todas las obras</a></div>'; }
    else {
      const a = artista(o.artista);
      document.title = `${o.titulo} — ${CONFIG.nombre}`;
      el("detail").innerHTML = `<div class="ph"><img src="${o.img}" alt="${esc(o.titulo)}, obra de ${esc(a.nombre)}"></div>
      <div><p class="crumbs"><a href="obras.html">Obras</a> / ${esc(o.titulo)}</p><p class="eyebrow">${esc(a.nombre)}</p><h1 style="font-size:clamp(2.2rem,4vw,3.4rem);margin-top:8px">${esc(o.titulo)}</h1>
      <p class="price">${o.vendida ? "Vendida" : fmt(o.precio)}</p><p class="muted" style="margin-top:20px">${esc(o.descripcion)}</p>
      <dl><dt>Técnica</dt><dd>${esc(o.tecnica)}</dd><dt>Medidas</dt><dd>${esc(o.medidas)}</dd><dt>Año</dt><dd>${o.anio}</dd><dt>Artista</dt><dd>${esc(a.nombre)} · ${esc(a.ciudad)}</dd></dl>
      <div class="actions">${o.vendida ? `<a class="btn" href="https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(LANG === "en" ? `Hi! I saw “${t(o.titulo)}” is sold. Do you have similar works?` : `Hola! Vi que “${o.titulo}” está vendida. ¿Tienen obras similares?`)}" target="_blank" rel="noopener">Consultar obras similares</a>` : `<button class="btn" type="button" onclick="addToCart('${o.id}')">Agregar a mi selección</button>`}
      <a class="btn ghost" href="enmarcado.html">Enmarcarla</a></div>
      <p class="muted" style="font-size:.82rem;margin-top:24px">Incluye certificado de autenticidad. Envíos asegurados a todo el país.</p></div>`;
      const rel = OBRAS.filter(x => x.id !== o.id).slice(0, 4);
      el("related").innerHTML = rel.map(card).join("");
      if (!rel.length) el("related").closest("section").hidden = true;
    }
  }

  // Artistas
  if (el("artistList")) el("artistList").innerHTML = ARTISTAS.map(a => `<article class="artist-card"><img src="${a.img}" alt="Retrato de ${esc(a.nombre)}" loading="lazy"><p class="eyebrow">${esc(a.disciplina)} · ${esc(a.ciudad)}</p><h3 style="margin-top:6px">${esc(a.nombre)}</h3><p>${esc(a.bio)}</p><a class="link" href="obras.html?artista=${a.id}">Ver obras (${OBRAS.filter(o => o.artista === a.id).length})</a></article>`).join("") || soon("Próximamente nuevos artistas");

  // Contacto
  if (el("contactForm")) el("contactForm").onsubmit = e => {
    e.preventDefault(); const d = new FormData(e.target);
    const txt = `${LANG === "en" ? "Hi! I'm" : "Hola! Soy"} ${d.get("nombre")} (${d.get("email")}).\n${d.get("mensaje")}`;
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(txt)}`, "_blank", "noopener");
  };
  document.querySelectorAll("[data-wa]").forEach(a => { a.href = "#"; a.onclick = e => { e.preventDefault(); const m = a.dataset.wa.replace(/^Hola! /, ""); window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(t("Hola") + "! " + t(m))}`, "_blank", "noopener"); }; });
  document.querySelectorAll("[data-mail]").forEach(a => { a.href = `mailto:${CONFIG.email}`; a.textContent = CONFIG.email; });

  /* ---------- Revelado al hacer scroll ---------- */
  (function () {
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sel = ".sec-head, .page-head .wrap > *, .hero .wrap > *, .benefit, .work, .artist, .artist-card, .split > *, .steps li, .prices, form.contact, .detail > *, footer.site .cols > *";
    const items = [...document.querySelectorAll(sel)];
    items.forEach(el => {
      const sibs = [...el.parentElement.children].filter(c => c.matches(sel));
      el.style.setProperty("--d", `${Math.min(sibs.indexOf(el), 5) * 70}ms`);
      el.classList.add("reveal");
    });
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(el => io.observe(el));
  })();
  if (typeof initI18n === "function") initI18n();
};
