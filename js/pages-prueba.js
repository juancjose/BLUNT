/* =========================================================
   PRUEBA — encabezados editoriales para las páginas internas
   (solo *-prueba.html; las páginas en vivo no cargan este archivo)
   ========================================================= */
(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const lang = () => localStorage.getItem("idioma") || (typeof CONFIG !== "undefined" && CONFIG.idioma) || "es";
  const en = () => lang() === "en";
  const pad = n => String(n).padStart(2, "0");
  const page = document.body.dataset.page;
  const head = $(".pg-head");
  const thumb = p => "img/prueba/" + p.split("/").pop().replace(/\.svg$/, ".jpg");
  const feat = p => "img/prueba/feat-" + p.split("/").pop().replace(/\.svg$/, ".jpg");
  const CL = typeof CLASICOS !== "undefined" ? CLASICOS : [];
  const MA = typeof MAESTROS !== "undefined" ? MAESTROS : [];
  const T = (o, k) => (en() && o[k + "_en"]) || o[k];
  /* proporción de las miniaturas (ancho / alto) para reservar el lugar antes de que carguen */
  const RATIO = {"hokusai-la-gran-ola.jpg":1.487,"monet-impresion-sol-naciente.jpg":1.289,"seurat-grande-jatte.jpg":1.503,"turner-temeraire.jpg":1.347,"van-gogh-noche-estrellada.jpg":1.261,"vermeer-joven-de-la-perla.jpg":.845,"carcova-sin-pan-y-sin-trabajo.jpg":1.726,"fader-mantones-de-manila.jpg":1.221,"lopez-desembarco-curuzu.jpg":3.189,"malharro-las-parvas.jpg":1.239,"pueyrredon-manuelita-rosas.jpg":.821,"sivori-despertar-criada.jpg":.663};
  const FOCO = { "van-gogh": "55% 45%", hokusai: "35% 50%", klimt: "50% 28%", vermeer: "50% 30%", monet: "50% 55%", turner: "38% 55%", seurat: "50% 55%", botticelli: "50% 35%" };

  if (typeof I18N_EN !== "undefined") Object.assign(I18N_EN, { "Formulario": "Form" });
  /* Contacto: datos de CONFIG */
  if ($("#pgIg") && typeof CONFIG !== "undefined") $("#pgIg").href = CONFIG.instagram;
  if ($("#pgCity") && typeof CONFIG !== "undefined") $("#pgCity").textContent = CONFIG.ciudad;

  /* ---------- Textos propios (ES/EN) ---------- */
  const applyText = () => {
    $$("[data-en]:not(.pg-title)").forEach(el => {
      if (!el.hasAttribute("data-es")) { el.setAttribute("data-es", el.textContent); el.setAttribute("data-no-i18n", ""); }
      const v = en() ? el.dataset.en : el.dataset.es;
      if (el.textContent !== v) el.textContent = v;
    });
    $$("[data-en-label]").forEach(el => {
      if (!el.hasAttribute("data-es-label")) el.setAttribute("data-es-label", el.getAttribute("aria-label") || "");
      el.setAttribute("aria-label", en() ? el.dataset.enLabel : el.dataset.esLabel);
    });
  };

  /* ---------- Título grande: letras escalonadas + ajuste al ancho ---------- */
  const titles = $$(".pg-title");
  const split = h => {
    const txt = en() ? h.dataset.en : h.dataset.es;
    if (h.dataset.cur === txt) return; h.dataset.cur = txt;
    h.setAttribute("aria-label", txt.replace(/\s*\|\s*/g, " "));
    let i = 0;
    /* "|" marca un salto de línea fijo (así el corte no depende de la fuente) */
    h.innerHTML = txt.split(/(\s*\|\s*|\s+)/).map(w => /\|/.test(w) ? "<br>" : /^\s+$/.test(w) ? " " :
      `<span class="pg-w" aria-hidden="true">${[...w].map(c => `<span class="pg-ch" style="--i:${i++}">${esc(c)}</span>`).join("")}</span>`).join("");
  };
  /* Ancho de la palabra más larga de cada título, en "em" de Archivo (medido con la fuente cargada).
     Con esto el tamaño se calcula solo con el ancho disponible: no depende de que la fuente ya
     haya llegado, así el título no cambia de tamaño (ni empuja el resto) cuando termina de cargar. */
  const TW = {"Obras":4.425,"Works":4.715,"Clásicos":6.32,"Classics":6.15,"Artistas":6.13,"Artists":5.255,"Enmarcado":6.285,"Framing":4.405,"Hablemos|de arte.":5.52,"Let’s talk|art.":2.555};
  const fit = () => titles.forEach(h => {
    h.style.fontSize = "";
    const par = h.parentElement, ps = getComputedStyle(par);
    const base = parseFloat(getComputedStyle(h).fontSize), r = TW[h.dataset.cur];
    const box = Math.min(h.clientWidth || 1e9, par.clientWidth - parseFloat(ps.paddingLeft) - parseFloat(ps.paddingRight));
    if (r) { const fs = Math.min(base, box / r * 0.985); if (fs < base) h.style.fontSize = fs.toFixed(2) + "px"; return; }
    const w = Math.max(0, ...$$(".pg-w", h).map(x => x.getBoundingClientRect().width));
    if (w > box + 1) h.style.fontSize = (base * box / w * 0.985).toFixed(2) + "px";
  });
  titles.forEach(h => { h.setAttribute("data-no-i18n", ""); if (!h.dataset.es) h.dataset.es = h.textContent.trim(); split(h); });

  /* ---------- Obras: franja de obras en movimiento ---------- */
  const strip = $("#pgStrip");
  /* Carrusel infinito: el track = un "tramo" (lo bastante largo para cubrir la pantalla) repetido 2 veces.
     Se anima de 0 a -50% (exactamente un tramo), así el final coincide píxel a píxel con el inicio: sin salto.
     Velocidad constante en px/s, sin pausa al pasar el mouse. */
  let stripSet = "", stripN = 0, stripCopies = 0;
  const STRIP_SPEED = 32; /* px por segundo */
  const layoutStrip = () => {
    if (!strip || !stripN) return;
    if (!strip.firstChild) { strip.innerHTML = `<div class="pg-strip-track">${stripSet}</div>`; stripCopies = -1; }
    /* ancho entero en px (4:5 de la altura): cada vuelta se desplaza un número exacto de píxeles,
       así el cuadro del final es idéntico al del comienzo (sin saltos de medio píxel) */
    const ph = strip.querySelector(".pg-strip-ph");
    const cw = Math.round(ph.getBoundingClientRect().height * .8);
    if (strip.style.getPropertyValue("--cw") !== cw + "px") { strip.style.setProperty("--cw", cw + "px"); stripCopies = -1; }
    const probe = strip.querySelector(".pg-strip-it");
    const itemW = probe.getBoundingClientRect().width + parseFloat(getComputedStyle(probe).marginRight);
    const setW = itemW * stripN;
    const copies = reduce ? 1 : Math.max(1, Math.ceil((strip.clientWidth || innerWidth) / setW));
    if (copies !== stripCopies) {
      stripCopies = copies;
      const tramo = stripSet.repeat(copies);
      strip.innerHTML = `<div class="pg-strip-track">${tramo}${reduce ? "" : tramo}</div>`;
    }
    const track = strip.firstChild;
    const dist = track.scrollWidth / (reduce ? 1 : 2);
    track.style.setProperty("--dur", (dist / STRIP_SPEED).toFixed(2) + "s");
  };
  const buildStrip = () => {
    if (!strip) return;
    const OB = (typeof OBRAS !== "undefined" ? OBRAS : []).filter(o => o.img);
    const real = OB.length >= 4;
    const sig = lang() + "|" + real;
    if (strip.dataset.sig === sig) return;
    strip.dataset.sig = sig;
    const ART = typeof ARTISTAS !== "undefined" ? ARTISTAS : [];
    const items = real
      ? OB.slice(0, 12).map(o => ({ img: o.img, href: `obra.html?id=${o.id}`, t: o.titulo, a: (ART.find(a => a.id === o.artista) || {}).nombre || "" }))
      : CL.filter(c => !["klimt", "botticelli"].includes(c.id)).map(c => ({ img: thumb(c.img), href: "clasicos-prueba.html", t: T(c, "titulo"), a: c.artista }))
        .flatMap((c, k) => { const m = MA[k]; return m ? [c, { img: thumb(m.obras[0].img), href: `artista.html?id=${m.id}`, t: T(m.obras[0], "titulo"), a: m.nombre }] : [c]; });
    const one = items.map(s => `<a class="pg-strip-it" href="${s.href}" tabindex="-1"><span class="pg-strip-ph"><img src="${s.img}" alt="" loading="lazy" decoding="async" onload="this.classList.add('ok')"></span><span class="pg-strip-t">${esc(s.t)}</span><span class="pg-strip-a">${esc(s.a)}</span></a>`).join("");
    stripSet = one; stripN = items.length; stripCopies = 0; strip.innerHTML = ""; layoutStrip();
    const note = $("#pgStripNote"); if (note) note.hidden = real;
  };
  const setCount = () => {
    const c = $("#pgCount"); if (!c) return;
    const n = (typeof OBRAS !== "undefined" ? OBRAS : []).length;
    c.innerHTML = n ? `<span class="pg-count-n">${pad(n)}</span><span class="pg-count-l">${en() ? (n === 1 ? "work available" : "works available") : (n === 1 ? "obra disponible" : "obras disponibles")}</span>`
      : `<span class="pg-count-l">${en() ? "New works coming soon" : "Nuevas obras muy pronto"}</span>`;
  };

  /* ---------- Clásicos: pieza destacada enmarcada ---------- */
  const fx = $("#pgFeature");
  let fxCur = 0, fxImgs = [], fxTimer = null, fxOrder = [];
  const fxCap = () => {
    const c = CL[fxOrder[fxCur]], cap = $("#pgFeatCap"); if (!c || !cap) return;
    cap.classList.add("swap");
    setTimeout(() => {
      cap.innerHTML = `<p class="pg-feat-n"><span>${pad(fxCur + 1)}</span> / ${pad(fxOrder.length)}</p><p class="pg-feat-t">${esc(T(c, "titulo"))}</p><p class="pg-feat-m">${esc(c.artista)}, ${esc(c.anio)} · ${esc(T(c, "museo"))}</p><p class="pg-feat-tag">${en() ? "Showcase · Public domain · Not for sale" : "Muestra · Dominio público · No a la venta"}</p>`;
      cap.classList.remove("swap");
    }, cap.innerHTML ? 380 : 0);
    const b = $("#pgFeatBtn"); if (b) { b.dataset.cl = fxOrder[fxCur]; b.setAttribute("aria-label", `${T(c, "titulo")}, ${c.artista}`); }
  };
  const buildFeature = () => {
    if (!fx) return;
    const order = ["van-gogh", "vermeer", "hokusai", "klimt", "monet", "turner", "seurat", "botticelli"];
    fxOrder = order.map(id => CL.findIndex(c => c.id === id)).filter(i => i >= 0);
    fx.innerHTML = fxOrder.map((ci, k) => `<img class="pg-feat-img${k ? "" : " on"}" ${k ? `data-src="${feat(CL[ci].img)}"` : `src="${feat(CL[ci].img)}" fetchpriority="high"`} alt="" decoding="async" style="object-position:${FOCO[CL[ci].id] || "50% 50%"}">`).join("");
    fxImgs = $$("img", fx); fxCap();
    const load = k => { const im = fxImgs[k]; if (im && im.dataset.src) { im.src = im.dataset.src; delete im.dataset.src; } };
    const go = () => {
      const k = (fxCur + 1) % fxImgs.length; load(k);
      const show = () => { fxImgs[fxCur].classList.remove("on"); fxImgs[fxCur].classList.add("off"); const prev = fxImgs[fxCur]; setTimeout(() => prev.classList.remove("off"), 1900);
        fxImgs[k].classList.add("on"); fxCur = k; fxCap(); load((k + 1) % fxImgs.length); };
      fxImgs[k].complete ? show() : fxImgs[k].addEventListener("load", show, { once: true });
    };
    const start = () => { clearInterval(fxTimer); fxTimer = null; if (!reduce && !document.hidden && fxImgs.length > 1) fxTimer = setInterval(go, 7500); };
    document.addEventListener("visibilitychange", start);
    if (fxImgs[0].complete) load(1); else fxImgs[0].addEventListener("load", () => load(1), { once: true });
    start();
  };

  /* ---------- Artistas: índice tipográfico de nombres ---------- */
  const idx = $("#pgIndex");
  const buildIndex = () => {
    if (!idx) return;
    const ART = typeof ARTISTAS !== "undefined" ? ARTISTAS : [];
    const sig = lang() + "|" + ART.map(a => a.id).join(",");
    if (idx.dataset.sig === sig) return; idx.dataset.sig = sig;
    let k = 0;
    const row = (href, img, name, meta) => `<li class="pg-ix-row"><a href="${href}"><span class="pg-ix-n">${pad(++k)}</span><img src="${img}" alt="" loading="lazy" decoding="async"><span class="pg-ix-name">${esc(name)}</span><span class="pg-ix-meta">${esc(meta)}</span></a></li>`;
    const real = ART.map(a => row(`obras.html?artista=${a.id}`, a.img, a.nombre, [en() && a.disciplina_en || a.disciplina, a.ciudad].filter(Boolean).join(" · ")));
    const mas = MA.map(m => row(`artista.html?id=${m.id}`, thumb(m.retrato.img), m.nombre, `${m.vida} · ${T(m, "movimiento").split(" · ")[0]}`));
    idx.innerHTML = (real.length ? `<li class="pg-ix-group">${en() ? "Gallery artists" : "Artistas de la galería"}</li>${real.join("")}` : "") +
      `<li class="pg-ix-group">${en() ? "Argentine masters · Showcase · Public domain" : "Maestros argentinos · Muestra · Dominio público"}</li>${mas.join("")}`;
    $$(".pg-ix-row", idx).forEach((li, i) => li.style.setProperty("--k", i));
  };

  /* ---------- Revelado al scroll (una vez) ---------- */
  const reveal = () => {
    const items = $$(".pg-rv:not(.reveal)");
    if (!items.length) return;
    if (reduce || !("IntersectionObserver" in window)) return;
    items.forEach(el => { const sib = [...el.parentElement.children].filter(c => c.classList.contains("pg-rv")); el.style.setProperty("--d", `${Math.min(sib.indexOf(el), 5) * 80}ms`); el.classList.add("reveal"); });
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(el => io.observe(el));
  };

  /* ---------- Arranque del encabezado (sin esperar a Supabase) ---------- */
  applyText(); buildStrip(); setCount(); buildFeature(); buildIndex(); fit();
  const ready = () => requestAnimationFrame(() => { fit(); head && head.classList.add("is-ready"); });
  if (document.fonts && document.fonts.ready) { Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 1500))]).then(ready); } else ready();
  let rz = 0; addEventListener("resize", () => { cancelAnimationFrame(rz); rz = requestAnimationFrame(() => { fit(); layoutStrip(); }); });
  reveal();

  /* Header: sin línea arriba de todo, con línea al bajar */
  const syncHeader = () => { const h = $("header.site"); if (h) h.classList.toggle("is-scrolled", scrollY > 8); };
  addEventListener("scroll", syncHeader, { passive: true });

  const relang = () => { applyText(); titles.forEach(split); fit(); setCount(); buildIndex(); buildStrip(); if (fx) fxCap(); };

  /* Lo que depende de la app común (header, i18n) y de los datos */
  window.pgAfterApp = () => {
    /* en la prueba, la navegación lleva a las otras páginas de prueba */
    const map = { "obras.html": "obras-prueba.html", "clasicos.html": "clasicos-prueba.html", "artistas.html": "artistas-prueba.html", "enmarcado.html": "enmarcado-prueba.html", "contacto.html": "contacto-prueba.html" };
    $$("header.site nav a, footer.site a").forEach(a => { const h = a.getAttribute("href"); if (map[h]) a.setAttribute("href", map[h]); });
    if (typeof setLang === "function" && !window.setLang._pg) { const orig = window.setLang; window.setLang = l => { orig(l); relang(); }; window.setLang._pg = true; }
    syncHeader(); relang(); reveal();
  };
  window.pgData = () => { buildStrip(); setCount(); buildIndex(); };
})();
