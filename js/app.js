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
  const links = [["index.html", "Inicio", "inicio"], ["obras.html", "Obras", "obras"], ["clasicos.html", "Clásicos", "clasicos"], ["artistas.html", "Artistas", "artistas"], ["enmarcado.html", "Enmarcado", "enmarcado"], ["contacto.html", "Contacto", "contacto"]];
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
  /* ---------- Hero: slideshow (obras reales si hay; si no, clásicos de dominio público) ---------- */
  if (el("heroImg")) {
    const fig = el("heroImg");
    const real = OBRAS.filter(x => x.img).slice(0, 8).map(o => ({ img: o.img, alt: `${o.titulo}, de ${artista(o.artista).nombre}` }));
    let CLh = typeof CLASICOS !== "undefined" ? CLASICOS.slice() : [];
    const vi = CLh.findIndex(c => c.id === "vermeer"); if (vi > 0) CLh = CLh.slice(vi).concat(CLh.slice(0, vi));
    const slides = real.length ? real : CLh.map(c => ({ img: c.img, alt: `${c.titulo}, de ${c.artista}`, c }));
    const withCap = !real.length && slides.length > 0;
    fig.classList.toggle("has-cap", withCap);
    if (!slides.length) fig.innerHTML = `<img src="img/enmarcado.svg" alt="">`;
    else {
      const capHTML = c => `<span class="hero-cap-t">${esc(c.titulo)}</span><span>${esc(c.artista)}, ${esc(c.anio)}</span> · <span>Dominio público</span>`;
      fig.innerHTML = `<div class="hero-slides">${slides.map((s, k) => `<img class="hero-slide${k ? "" : " on"}" ${k ? `data-src="${s.img}"` : `src="${s.img}"`} alt="${esc(s.alt)}"${k ? ' aria-hidden="true"' : ""}>`).join("")}</div>` +
        (slides.length > 1 ? `<div class="hero-dots" role="group" aria-label="Diapositivas">${slides.map((s, k) => `<button type="button" class="hero-dot${k ? "" : " on"}" data-hs="${k}" aria-label="${k + 1} / ${slides.length}"></button>`).join("")}</div>` : "") +
        (withCap ? `<figcaption class="hero-cap" aria-live="polite">${capHTML(slides[0].c)}</figcaption>` : "");
      const imgs = [...fig.querySelectorAll(".hero-slide")], dots = [...fig.querySelectorAll(".hero-dot")], cap = fig.querySelector(".hero-cap");
      const load = k => { const im = imgs[k]; if (im && im.dataset.src) { im.src = im.dataset.src; delete im.dataset.src; } };
      let cur = 0, timer = null, paused = false;
      const go = k => {
        k = (k + slides.length) % slides.length; if (k === cur) return; load(k);
        imgs[cur].classList.remove("on"); imgs[cur].setAttribute("aria-hidden", "true");
        imgs[k].classList.add("on"); imgs[k].removeAttribute("aria-hidden");
        dots.forEach((d, j) => d.classList.toggle("on", j === k));
        if (cap) { cap.classList.add("swap"); setTimeout(() => { cap.innerHTML = capHTML(slides[k].c); cap.classList.remove("swap"); }, 350); }
        cur = k; load(k + 1 < slides.length ? k + 1 : 0);
      };
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const stop = () => { clearInterval(timer); timer = null; };
      const start = () => { stop(); if (!reduce && !paused && !document.hidden && slides.length > 1) timer = setInterval(() => go(cur + 1), 5500); };
      dots.forEach(d => d.addEventListener("click", () => { go(+d.dataset.hs); start(); }));
      document.addEventListener("visibilitychange", start);
      if (slides.length > 1) { if (imgs[0].complete) load(1); else imgs[0].addEventListener("load", () => load(1), { once: true }); }
      start();
    }
  }
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
      el("catalog").innerHTML = list.map(card).join("") || (OBRAS.length ? '<p class="muted">No hay obras para este filtro.</p>' : soon("Próximamente nuevas obras") + (typeof CLASICOS !== "undefined" ? '<p class="classic-cta"><span>Mientras tanto, conocé nuestra selección de clásicos.</span> <a class="link" href="clasicos.html">Clásicos</a></p>' : ""));
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


  /* ---------- Clásicos (dominio público, no a la venta) ---------- */
  const CL = typeof CLASICOS !== "undefined" ? CLASICOS : [];
  const clCard = (c, i) => `<article class="work classic"><button type="button" class="classic-btn" data-cl="${i}" aria-label="${esc(c.titulo)}, ${esc(c.artista)}">
    <div class="ph"><img src="${c.img}" alt="${esc(c.titulo)}, de ${esc(c.artista)}" loading="lazy"></div>
    <div class="meta"><div><h3>${esc(c.titulo)}</h3><p class="by">${esc(c.artista)} · ${esc(c.anio)}</p></div></div></button></article>`;
  if (el("classicsHome")) {
    el("classicsHome").innerHTML = CL.slice(0, 4).map(clCard).join("");
    if (!OBRAS.length && el("featured")) el("featured").closest("section").hidden = true;
    if (!ARTISTAS.length && el("artistsStrip")) el("artistsStrip").closest("section").hidden = true;
  }
  if (el("classicsGrid")) el("classicsGrid").innerHTML = CL.map(clCard).join("");
  /* Lightbox reutilizable para obras de dominio público (clásicos y maestros argentinos) */
  let lbList = [], lbCur = 0;
  const lbShow = i => { lbCur = (i + lbList.length) % lbList.length; const c = lbList[lbCur];
    el("lbImg").src = c.img; el("lbImg").alt = `${c.titulo}, de ${c.artista}`; el("lbArtist").textContent = c.artista;
    el("lbTitle").textContent = c.titulo; el("lbMeta").textContent = [c.anio, c.museo].filter(Boolean).join(" · "); el("lbSrc").href = c.fuente;
    const many = lbList.length > 1; el("lbPrev").hidden = el("lbNext").hidden = !many; };
  const lbOpen = (list, i) => {
    if (!el("lb")) {
      document.body.insertAdjacentHTML("beforeend", `<dialog class="lb" id="lb" aria-labelledby="lbTitle">
      <button class="icon-btn lb-close" type="button" id="lbClose" aria-label="Cerrar">✕</button>
      <figure><img id="lbImg" alt=""><figcaption><p class="eyebrow" id="lbArtist"></p><h3 id="lbTitle"></h3><p class="muted small" id="lbMeta"></p>
      <p class="small muted lb-credit"><span>Dominio público · Wikimedia Commons</span> · <a id="lbSrc" target="_blank" rel="noopener">Ver fuente</a></p></figcaption></figure>
      <button class="icon-btn lb-nav lb-prev" type="button" id="lbPrev" aria-label="Anterior">‹</button><button class="icon-btn lb-nav lb-next" type="button" id="lbNext" aria-label="Siguiente">›</button></dialog>`);
      const lb = el("lb");
      el("lbClose").onclick = () => lb.close(); el("lbPrev").onclick = () => lbShow(lbCur - 1); el("lbNext").onclick = () => lbShow(lbCur + 1);
      lb.addEventListener("click", e => { if (e.target === lb) lb.close(); });
      lb.addEventListener("keydown", e => { if (e.key === "ArrowLeft") lbShow(lbCur - 1); if (e.key === "ArrowRight") lbShow(lbCur + 1); });
    }
    lbList = list; lbShow(i); el("lb").showModal();
  };
  if (CL.length && (el("classicsHome") || el("classicsGrid")))
    document.addEventListener("click", e => { const b = e.target.closest("[data-cl]"); if (b) lbOpen(CL, +b.dataset.cl); });

  /* ---------- Maestros argentinos (dominio público, no a la venta; datos estáticos en js/maestros.js) ---------- */
  const MA = typeof MAESTROS !== "undefined" ? MAESTROS : [];
  const PD_TAG = "Muestra · Dominio público · No a la venta";
  if (el("maestrosList")) {
    el("maestrosList").innerHTML = MA.map(m => `<article class="artist-card maestro-card"><a class="maestro-link" href="artista.html?id=${m.id}">
      <img src="${m.retrato.img}" alt="Retrato de ${esc(m.nombre)}" loading="lazy" decoding="async" width="${m.retrato.w}" height="${m.retrato.h}"></a>
      <p class="eyebrow">${esc(m.vida)} · <span>${esc(m.movimiento)}</span></p><h3 style="margin-top:6px"><a href="artista.html?id=${m.id}">${esc(m.nombre)}</a></h3>
      <p>${esc(m.resumen)}</p><a class="link" href="artista.html?id=${m.id}">Obras</a></article>`).join("");
  }
  if (el("maestro")) {
    const id = new URLSearchParams(location.search).get("id"), m = MA.find(x => x.id === id);
    if (!m) {
      const real = ARTISTAS.find(x => x.id === id || x.slug === id);
      if (real) location.replace(`obras.html?artista=${real.id}`);
      el("maestro").innerHTML = '<div><h1>Artista no encontrado</h1><p class="muted" style="margin:16px 0 32px">Puede que el enlace sea incorrecto.</p><a class="btn" href="artistas.html">Ver artistas</a></div>';
      el("maestroWorks").closest("section").hidden = true;
    } else {
      document.title = `${m.nombre} — ${CONFIG.nombre}`;
      const works = m.obras.map(o => ({ ...o, artista: m.nombre }));
      const r = m.retrato;
      el("maestro").innerHTML = `<figure class="ph maestro-portrait"><img src="${r.img}" alt="Retrato de ${esc(m.nombre)}" width="${r.w}" height="${r.h}" decoding="async">
        <figcaption class="small muted"><span>${esc(r.tipo)}</span>${r.anio ? `, ${esc(r.anio)}` : ""}${r.museo ? ` · <span>${esc(r.museo)}</span>` : ""} · <a href="${r.fuente}" target="_blank" rel="noopener">Wikimedia Commons</a></figcaption></figure>
        <div><p class="crumbs"><a href="artistas.html">Artistas</a> / ${esc(m.nombre)}</p><p class="pd-tag">${PD_TAG}</p>
        <h1 style="font-size:clamp(2.2rem,4vw,3.4rem);margin-top:10px">${esc(m.nombre)}</h1>
        <p class="eyebrow" style="margin-top:12px">${esc(m.lugar)}</p>
        <div class="maestro-bio">${m.bio.map(p => `<p>${esc(p)}</p>`).join("")}</div>
        <dl><dt>Años</dt><dd>${esc(m.vida)}</dd><dt>Movimiento</dt><dd><span>${esc(m.movimiento)}</span></dd><dt>Obras</dt><dd>${m.obras.length}</dd></dl>
        <p class="muted small">Obra en dominio público, exhibida como muestra. No está a la venta.</p></div>`;
      el("maestroWorks").innerHTML = works.map((o, i) => `<article class="work classic"><button type="button" class="classic-btn" data-mw="${i}" aria-label="${esc(o.titulo)}, ${esc(m.nombre)}">
        <div class="ph"><img src="${o.img}" alt="${esc(o.titulo)}, de ${esc(m.nombre)}" loading="lazy" decoding="async" width="${o.w}" height="${o.h}"></div>
        <div class="meta"><div><h3>${esc(o.titulo)}</h3><p class="by">${esc(o.anio)}${o.museo ? ` · <span>${esc(o.museo)}</span>` : ""}</p></div></div></button></article>`).join("");
      document.addEventListener("click", e => { const b = e.target.closest("[data-mw]"); if (b) lbOpen(works, +b.dataset.mw); });
      const others = MA.filter(x => x.id !== m.id);
      if (el("maestroOthers")) el("maestroOthers").innerHTML = others.map(x => `<a class="maestro-chip" href="artista.html?id=${x.id}"><img src="${x.retrato.img}" alt="" loading="lazy" decoding="async"><span>${esc(x.nombre)}</span></a>`).join("");
    }
  }

  /* ---------- Probador de enmarcado (ambientes + obra/espacio propios; arrastre en tu espacio) ---------- */
  document.querySelectorAll("[data-framer]").forEach(box => {
    const pick = ["van-gogh", "hokusai", "monet", "vermeer"].map(id => CL.find(c => c.id === id)).filter(Boolean);
    const SC = typeof ESCENAS !== "undefined" ? ESCENAS : [];
    if (!pick.length || !SC.length) return;
    const frames = [["negro", "Negro"], ["madera", "Madera"], ["blanco", "Blanco"]];
    const mats = [["sin", "Sin"], ["fino", "Fino"], ["medio", "Medio"], ["ancho", "Ancho"]];
    const st = { s: 0, f: "negro", m: "medio", a: 0 };
    let customArt = "", customArtThumb = null, customSpace = "", customSpaceBtn = null;
    let pos = { x: 0.5, y: 0.42 }, drag = null;
    const grp = (key, label, opts) => `<div class="fr-row"><span class="fr-lab">${label}</span><div class="fr-opts" role="group" aria-label="${label}">${opts.map(([v, t]) => `<button type="button" class="chip fr-opt" data-k="${key}" data-v="${v}" aria-pressed="false">${key === "f" ? `<i class="fr-sw fr-sw-${v}" aria-hidden="true"></i>` : ""}${t}</button>`).join("")}</div></div>`;
    box.innerHTML = `<div class="fr-scene"><img class="fr-photo on" alt="" src="${SC[0].img}"><img class="fr-photo" alt="" aria-hidden="true">
      <div class="fr-frame" tabindex="0" aria-grabbed="false"><div class="fr-mat"><div class="fr-art"><img alt=""></div></div><div class="fr-glass" aria-hidden="true"></div><div class="fr-luz" aria-hidden="true"></div></div></div>
      <div class="fr-controls"><p class="eyebrow fr-title">Probador de enmarcado</p>
      <div class="fr-row fr-row-amb"><span class="fr-lab">Ambiente</span><div class="fr-opts fr-scenes" role="group" aria-label="Ambiente">${SC.map((e, i) => `<button type="button" class="fr-scn" data-k="s" data-v="${i}" aria-pressed="false"><img src="${e.thumb}" alt=""><span>${esc(e.nombre)}</span></button>`).join("")}<button type="button" class="fr-scn fr-scn-upload fr-scn-sticky" data-space-upload aria-label="Cargar tu espacio" title="Cargar tu espacio"><span class="fr-scn-plus" aria-hidden="true">+</span><span>Tu espacio</span></button></div><input type="file" accept="image/*" hidden data-space-file></div>
      ${grp("f", "Marco", frames)}${grp("m", "Passepartout", mats)}
      <div class="fr-row"><span class="fr-lab">Obra</span><div class="fr-opts fr-thumbs" role="group" aria-label="Obra">${pick.map((c, i) => `<button type="button" class="fr-thumb" data-k="a" data-v="${i}" aria-pressed="false" aria-label="${esc(c.titulo)}, de ${esc(c.artista)}"><img src="${c.img}" alt="" loading="lazy"></button>`).join("")}<button type="button" class="fr-thumb fr-upload" data-art-upload aria-label="Cargar tu foto" title="Cargar tu foto">+</button><input type="file" accept="image/jpeg,image/png,image/webp,image/*" hidden data-art-file></div></div>
      <p class="fr-note"><span class="fr-hint">Vista de muestra. También podés cargar tu obra o tu espacio.</span> <span class="fr-credit"></span></p></div>`;
    const scene = box.querySelector(".fr-scene"), photos = [...box.querySelectorAll(".fr-photo")], frame = box.querySelector(".fr-frame"), img = box.querySelector(".fr-art img"), art = box.querySelector(".fr-art"), credit = box.querySelector(".fr-credit"), hint = box.querySelector(".fr-hint");
    const thumbs = box.querySelector(".fr-thumbs"), scenes = box.querySelector(".fr-scenes");
    const artFile = box.querySelector("[data-art-file]"), spaceFile = box.querySelector("[data-space-file]");
    const MOLD = { negro: 20, blanco: 20, madera: 28 }, MAT = { sin: 0, fino: 50, medio: 90, ancho: 140 };
    let shown = 0, curScene = 0, ratio = 0.8;
    const isCustom = () => st.s === "custom" && customSpace;
    const mul = (A, B) => A.map(r => [0, 1, 2].map(j => r[0] * B[0][j] + r[1] * B[1][j] + r[2] * B[2][j]));
    const place = () => {
      const Wmm = Math.round((ratio > 1 ? 0.85 : 1.2) * 1000);
      if (isCustom()) {
        const sw = scene.clientWidth || 1, sh = scene.clientHeight || 1;
        const target = Math.min(sw, sh) * 0.32;
        const u = Math.max(0.05, target / Wmm);
        const inner = Wmm - 2 * (MOLD[st.f] + MAT[st.m]);
        const fw = Wmm * u, fh = (inner * ratio + 2 * (MOLD[st.f] + MAT[st.m])) * u;
        frame.style.setProperty("--u", u.toFixed(4));
        art.style.width = (inner * u).toFixed(2) + "px"; art.style.height = (inner * ratio * u).toFixed(2) + "px";
        frame.style.width = fw.toFixed(2) + "px";
        frame.style.setProperty("--mold", (MOLD[st.f] * u).toFixed(2) + "px"); frame.style.setProperty("--matw", (MAT[st.m] * u).toFixed(2) + "px");
        const minX = (fw / 2) / sw, maxX = 1 - minX, minY = (fh / 2) / sh, maxY = 1 - minY;
        pos.x = Math.min(maxX, Math.max(minX, pos.x)); pos.y = Math.min(maxY, Math.max(minY, pos.y));
        frame.style.left = (pos.x * 100).toFixed(3) + "%"; frame.style.top = (pos.y * 100).toFixed(3) + "%";
        frame.style.transform = "translate(-50%, -50%)";
        frame.style.setProperty("--grade", "brightness(.98) contrast(.95) saturate(.92)");
        frame.style.setProperty("--luz", "linear-gradient(180deg,rgba(255,255,255,.06),rgba(0,0,0,.05))");
        frame.style.setProperty("--shx", "0"); frame.style.setProperty("--shy", "1");
        frame.style.setProperty("--sdx", "0px"); frame.style.setProperty("--sdy", (4 * u).toFixed(2) + "px");
        scene.classList.add("is-custom"); frame.classList.add("fr-draggable");
        return;
      }
      scene.classList.remove("is-custom"); frame.classList.remove("fr-draggable");
      frame.style.left = "0"; frame.style.top = "0";
      const e = SC[typeof st.s === "number" ? st.s : curScene] || SC[curScene];
      const W = Math.round((ratio > 1 ? e.pw : e.w) * 1000);
      const k = scene.clientWidth / 1600, H = e.H;
      const T = [[0.001, 0, -W / 2000], [0, 0.001, 0], [0, 0, 1]];
      let M = mul(mul([[k, 0, 0], [0, k, 0], [0, 0, 1]], H), T); const z = M[2][2]; M = M.map(r => r.map(v => v / z));
      const u = Math.max(0.05, Math.hypot(M[0][0], M[1][0]));
      M = M.map(r => [r[0] / u, r[1] / u, r[2]]);
      const inner = W - 2 * (MOLD[st.f] + MAT[st.m]);
      frame.style.setProperty("--u", u.toFixed(4));
      art.style.width = (inner * u).toFixed(2) + "px"; art.style.height = (inner * ratio * u).toFixed(2) + "px";
      frame.style.width = (W * u).toFixed(2) + "px";
      frame.style.setProperty("--mold", (MOLD[st.f] * u).toFixed(2) + "px"); frame.style.setProperty("--matw", (MAT[st.m] * u).toFixed(2) + "px");
      const flat = (Math.abs(M[2][0]) + Math.abs(M[2][1])) * W * u < 0.005;
      frame.style.transform = flat ? `matrix(${M[0][0]},${M[1][0]},${M[0][1]},${M[1][1]},${M[0][2]},${M[1][2]})`
        : `matrix3d(${M[0][0]},${M[1][0]},0,${M[2][0]},${M[0][1]},${M[1][1]},0,${M[2][1]},0,0,1,0,${M[0][2]},${M[1][2]},0,${M[2][2]})`;
      frame.style.setProperty("--grade", e.ajuste); frame.style.setProperty("--luz", e.luz);
      frame.style.setProperty("--shx", e.sombra[0]); frame.style.setProperty("--shy", e.sombra[1]);
      frame.style.setProperty("--sdx", (e.lado[0] * u).toFixed(2) + "px"); frame.style.setProperty("--sdy", (e.lado[1] * u).toFixed(2) + "px");
    };
    let placeQ = 0; const placeSoon = () => { if (!placeQ) placeQ = requestAnimationFrame(() => { placeQ = 0; place(); }); };
    const setScene = () => {
      if (isCustom()) {
        credit.innerHTML = "";
        hint.textContent = "Arrastrá el cuadro para ubicarlo en tu pared.";
        const next = photos[1 - shown];
        if (photos[shown].src === customSpace && curScene === "custom") { scene.classList.remove("fr-moving"); return; }
        scene.classList.add("fr-moving");
        const swap = () => { photos[shown].classList.remove("on"); next.classList.add("on"); shown = 1 - shown; curScene = "custom"; place(); setTimeout(() => scene.classList.remove("fr-moving"), 60); };
        next.onload = null; next.src = customSpace;
        (next.decode ? next.decode() : Promise.reject()).then(swap, () => { if (next.complete) swap(); else next.onload = swap; });
        return;
      }
      const e = SC[st.s];
      credit.innerHTML = `<span>Foto</span>: <a href="${e.url}" target="_blank" rel="noopener">${esc(e.autor)} / ${e.sitio}</a>`;
      hint.textContent = "Vista de muestra. También podés cargar tu obra o tu espacio.";
      if (curScene === st.s) { scene.classList.remove("fr-moving"); return; }
      const next = photos[1 - shown], target = st.s;
      scene.classList.add("fr-moving");
      const swap = () => { if (st.s !== target) return; photos[shown].classList.remove("on"); next.classList.add("on"); shown = 1 - shown; curScene = target; place(); setTimeout(() => scene.classList.remove("fr-moving"), 60); };
      next.onload = null; next.src = e.img;
      (next.decode ? next.decode() : Promise.reject()).then(swap, () => { if (next.complete) swap(); else next.onload = swap; });
    };
    const currentArt = () => st.a === "custom" && customArt
      ? { img: customArt, titulo: "Tu foto", artista: "" }
      : pick[st.a];
    const syncArtThumb = () => {
      if (customArtThumb) { customArtThumb.remove(); customArtThumb = null; }
      if (!customArt) return;
      const b = document.createElement("button");
      b.type = "button"; b.className = "fr-thumb fr-custom"; b.dataset.k = "a"; b.dataset.v = "custom";
      b.setAttribute("aria-label", "Tu foto"); b.setAttribute("aria-pressed", "false");
      b.innerHTML = `<img src="${customArt}" alt=""><span class="fr-clear" data-clear-art title="Quitar foto" aria-label="Quitar foto">×</span>`;
      thumbs.insertBefore(b, thumbs.querySelector("[data-art-upload]"));
      customArtThumb = b;
    };
    const spaceUploadBtn = () => box.querySelector("[data-space-upload]");
    const syncSpaceBtn = () => {
      const up = spaceUploadBtn();
      if (customSpaceBtn) { customSpaceBtn.remove(); customSpaceBtn = null; }
      if (up) up.hidden = false;
      if (!customSpace) return;
      if (up) up.hidden = true;
      const b = document.createElement("button");
      b.type = "button"; b.className = "fr-scn fr-scn-custom fr-scn-sticky"; b.dataset.k = "s"; b.dataset.v = "custom";
      b.setAttribute("aria-pressed", "false");
      b.setAttribute("aria-label", "Tu espacio");
      b.innerHTML = `<img src="${customSpace}" alt=""><span>Tu espacio</span><span class="fr-clear fr-clear-scn" data-clear-space title="Quitar espacio" aria-label="Quitar espacio">×</span>`;
      if (up && up.parentNode) up.parentNode.insertBefore(b, up);
      else scenes.appendChild(b);
      customSpaceBtn = b;
    };
    const clearArt = () => {
      if (customArt) { try { URL.revokeObjectURL(customArt); } catch (_) {} }
      customArt = ""; syncArtThumb(); if (st.a === "custom") st.a = 0; artFile.value = ""; render();
    };
    const clearSpace = () => {
      if (customSpace) { try { URL.revokeObjectURL(customSpace); } catch (_) {} }
      customSpace = ""; syncSpaceBtn();
      if (st.s === "custom") st.s = 0;
      spaceFile.value = ""; render();
    };
    const readImage = (file, onOk) => {
      if (!file || !/^image\//.test(file.type)) return;
      if (file.size > 8 * 1024 * 1024) { alert("Esa imagen es demasiado pesada (máx. 8 MB)."); return; }
      onOk(URL.createObjectURL(file));
    };
    const render = () => {
      const c = currentArt();
      if (!c) return;
      frame.className = `fr-frame fr-${st.f} fr-mat-${st.m}` + (isCustom() ? " fr-draggable" : "");
      const src = c.img;
      if (img.getAttribute("src") !== src) {
        img.classList.add("fr-swap");
        setTimeout(() => {
          img.src = src;
          img.alt = c.artista ? `${typeof tr === "function" ? tr(c.titulo) : c.titulo}${LANG === "en" ? ", by " : ", de "}${c.artista}` : (typeof tr === "function" ? tr(c.titulo) : c.titulo);
        }, 220);
      }
      img.onload = () => { ratio = img.naturalHeight / img.naturalWidth || 0.8; place(); img.classList.remove("fr-swap"); };
      if (img.complete && img.naturalWidth) ratio = img.naturalHeight / img.naturalWidth || 0.8;
      setScene(); place();
      box.querySelectorAll("[data-k]").forEach(b => b.setAttribute("aria-pressed", String(String(st[b.dataset.k]) === String(b.dataset.v))));
    };
    if (window.ResizeObserver) new ResizeObserver(placeSoon).observe(scene);
    box.addEventListener("click", e => {
      if (e.target.closest("[data-clear-art]")) { e.preventDefault(); e.stopPropagation(); clearArt(); return; }
      if (e.target.closest("[data-clear-space]")) { e.preventDefault(); e.stopPropagation(); clearSpace(); return; }
      if (e.target.closest("[data-art-upload]")) { artFile.click(); return; }
      if (e.target.closest("[data-space-upload]")) {
        const touch = window.matchMedia("(hover: none) and (pointer: coarse)").matches || "ontouchstart" in window;
        if (touch) spaceFile.setAttribute("capture", "environment");
        else spaceFile.removeAttribute("capture");
        spaceFile.click(); return;
      }
      const b = e.target.closest("[data-k]"); if (!b) return;
      const k = b.dataset.k, v = b.dataset.v;
      if (k === "s") st.s = v === "custom" ? "custom" : +v;
      else if (k === "a") st.a = v === "custom" ? "custom" : +v;
      else st[k] = v;
      render();
    });
    artFile.addEventListener("change", () => {
      const f = artFile.files && artFile.files[0]; if (!f) return;
      readImage(f, url => { if (customArt) try { URL.revokeObjectURL(customArt); } catch (_) {} customArt = url; st.a = "custom"; syncArtThumb(); render(); });
    });
    spaceFile.addEventListener("change", () => {
      const f = spaceFile.files && spaceFile.files[0]; if (!f) return;
      readImage(f, url => {
        if (customSpace) try { URL.revokeObjectURL(customSpace); } catch (_) {}
        customSpace = url; st.s = "custom"; pos = { x: 0.5, y: 0.42 }; syncSpaceBtn(); render();
      });
    });
    const onMove = e => {
      if (!drag || !isCustom()) return;
      const r = scene.getBoundingClientRect();
      pos.x = (e.clientX - r.left - drag.ox) / r.width;
      pos.y = (e.clientY - r.top - drag.oy) / r.height;
      place();
    };
    const endDrag = () => {
      if (!drag) return;
      drag = null; frame.classList.remove("is-dragging"); frame.setAttribute("aria-grabbed", "false");
      window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", endDrag); window.removeEventListener("pointercancel", endDrag);
    };
    frame.addEventListener("pointerdown", e => {
      if (!isCustom() || e.button) return;
      e.preventDefault();
      const r = scene.getBoundingClientRect();
      drag = { ox: e.clientX - r.left - pos.x * r.width, oy: e.clientY - r.top - pos.y * r.height };
      frame.classList.add("is-dragging"); frame.setAttribute("aria-grabbed", "true");
      try { frame.setPointerCapture(e.pointerId); } catch (_) {}
      window.addEventListener("pointermove", onMove); window.addEventListener("pointerup", endDrag); window.addEventListener("pointercancel", endDrag);
    });
    render();
  });

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
