/* =========================================================
   PRUEBA — Artistas: artista destacado (artistas-prueba.html)
   Retrato grande fundido con el fondo, nombre grande, datos (origen · disciplina · obras),
   columna de miniaturas para cambiar de artista y fila de obras.
   Arranca con los maestros (datos locales) sin esperar a Supabase; cuando llegan
   los artistas de la galería se suman adelante.
   ========================================================= */
(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const hero = $("#arHero"); if (!hero) return;
  const rail = $("#arRail"), stage = $("#arStage"), info = $("#arInfo"), bg = $("#arBg"), countEl = $("#arCount");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const en = () => (localStorage.getItem("idioma") || (typeof CONFIG !== "undefined" && CONFIG.idioma) || "es") === "en";
  const T = (o, k) => (en() && o[k + "_en"]) || o[k] || "";
  const pad = n => String(n).padStart(2, "0");
  const base = p => p.split("/").pop();
  const thumb = p => "img/prueba/" + base(p).replace(/\.svg$/, ".jpg");
  const isReal = u => u && !/^data:/.test(u);
  const MA = typeof MAESTROS !== "undefined" ? MAESTROS : [];

  const list = () => {
    const ART = window.ARTISTAS || [], OB = window.OBRAS || [];
    const real = ART.map(a => {
      const ws = OB.filter(o => o.artista === a.id);
      const por = isReal(a.img) ? a.img : ((ws.find(w => isReal(w.img)) || {}).img || "");
      return { key: "a-" + a.id, name: a.nombre, thumb: por || a.img, por, cut: false, pos: "50% 25%", city: a.ciudad, disc: T(a, "disciplina"), n: ws.length,
        bio: T(a, "bio"), href: `obras.html?artista=${a.id}`, pd: false,
        works: ws.slice(0, 10).map(w => ({ t: T(w, "titulo"), y: w.anio, img: w.img, href: `obra.html?id=${w.id}` })) };
    });
    const ma = MA.map(m => {
      const k = base(m.retrato.img).split("-retrato")[0];
      return { key: "m-" + m.id, name: m.nombre, thumb: thumb(m.retrato.img), por: `img/prueba/cut-${k}.webp`, cut: true, pos: "50% 100%",
        city: (T(m, "lugar").split(/,\s*\d/)[0] || "").trim(), disc: T(m, "movimiento").split(" · ")[0], n: m.obras.length,
        bio: T(m, "resumen"), href: `artista.html?id=${m.id}`, pd: true,
        works: m.obras.map(o => ({ t: T(o, "titulo"), y: o.anio, img: thumb(o.img), bg: "img/prueba/bg-" + base(o.img).replace(/\.svg$/, ".jpg"), href: `artista.html?id=${m.id}` })) };
    });
    return real.concat(ma);
  };

  let L = [], cur = 0, curKey = "", touched = false, sig = "", swapT = 0;
  const imgs = () => $$(".ar-por", stage);

  /* ---------- Nombre: ajusta el tamaño para que la palabra más larga entre en el ancho ---------- */
  const fitName = () => {
    const h = $(".ar-name", info); if (!h) return;
    h.style.fontSize = "";
    const max = h.clientWidth; if (!max) return;
    const w = Math.max(0, ...$$(".ar-nw", h).map(x => x.getBoundingClientRect().width));
    if (w > max) h.style.fontSize = (parseFloat(getComputedStyle(h).fontSize) * max / w * 0.98).toFixed(2) + "px";
  };

  const infoHTML = (a, i) => {
    const words = a.name.split(/\s+/);
    /* dos líneas como en una portada: el último apellido abajo (o "de la Cárcova" junto) */
    let cut = words.length > 1 ? Math.ceil(words.length / 2) : 1;
    if (words.length === 4) cut = 1;
    const l1 = words.slice(0, cut).join(" "), l2 = words.slice(cut).join(" ");
    const wspan = s => s.split(" ").map(w => `<span class="ar-nw">${esc(w)}</span>`).join(" ");
    const lab = en() ? ["From", "Discipline", "Works"] : ["Origen", "Disciplina", "Obras"];
    const meta = [[lab[0], a.city], [lab[1], a.disc], [lab[2], a.n ? pad(a.n) : "—"]].filter(x => x[1]);
    return `<p class="ar-num"><span>${pad(i + 1)}</span> / ${pad(L.length)}</p>
      <h2 class="ar-name" id="arName">${wspan(l1)}${l2 ? `<br>${wspan(l2)}` : ""}</h2>
      <dl class="ar-meta">${meta.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
      <a class="ar-link" href="${a.href}">${en() ? "Full profile & bio" : "Ver perfil completo"} <i aria-hidden="true">→</i></a>${a.pd ? `<p class="ar-pd">${en() ? "Showcase · Public domain · Not for sale" : "Muestra · Dominio público · No a la venta"}</p>` : ""}`;
  };
  /* Obras del artista de fondo: franja infinita de tarjetas grandes 4:5 a lo ancho del encabezado,
     atenuada de forma pareja (opacidad uniforme: tiñe de negro en oscuro y de blanco en claro).
     Mismo método que obras.html: tramo = obras repetidas hasta cubrir el ancho (múltiplo de las obras),
     track = tramo × 2, de 0 a -50%. Lenta, sin pausa, también con "reducir movimiento".
     Al cambiar de artista, la capa nueva aparece con un fundido sobre la anterior. */
  const BG_SPEED = 14; /* px por segundo */
  let bgCur = null, bgKey = "";
  const bgCard = w => `<a class="ar-bgc" href="${w.href}" tabindex="-1" title="${esc(w.t)}${w.y ? ", " + esc(w.y) : ""}"><img src="${w.bg || w.img}" alt="" decoding="async" onload="this.classList.add('ok')"></a>`;
  const layoutBg = (fresh) => {
    const a = bgCur; if (!bg || !a) return;
    const W = bg.clientWidth || innerWidth, H = bg.clientHeight || innerHeight, small = W < 761;
    const flow = W < 981, ch = Math.round(small ? Math.min(innerHeight * .32, 290) : flow ? Math.min(innerHeight * .4, 440) : Math.min(H * .64, 620)), cw = Math.round(ch * .8), gap = Math.round(ch * .07), pitch = cw + gap;
    if (!(pitch >= 40) || !(W > 0)) return;
    const Lw = a.works.length;
    const m = Lw ? Lw * Math.ceil((Math.ceil(W / pitch) + 1) / Lw) : 0;
    const top = flow ? Math.max(0, Math.round(stage.offsetTop + (stage.offsetHeight - ch) / 2)) : -1;
    const key = a.key + "|" + W + "|" + ch + "|" + m + "|" + top;
    if (key === bgKey && !fresh) return; bgKey = key;
    const old = $$(".ar-bg-l", bg);
    if (!m) { old.forEach(o => { o.classList.remove("on"); setTimeout(() => o.remove(), 1200); }); return; }
    const tramo = Array.from({ length: m }, (_, i) => bgCard(a.works[i % Lw])).join("");
    const l = document.createElement("div"); l.className = "ar-bg-l";
    l.style.cssText = `--cw:${cw}px;--ch:${ch}px;--gap:${gap}px;--dur:${(m * pitch / BG_SPEED).toFixed(2)}s` + (top >= 0 ? `;align-items:flex-start;padding-top:${top}px` : "");
    l.innerHTML = `<div class="ar-bg-track">${tramo}${tramo}</div>`;
    bg.appendChild(l);
    if (!fresh) { old.forEach(o => o.remove()); l.classList.add("on", "now"); return; }
    void l.offsetWidth; l.classList.add("on");
    old.forEach(o => { o.classList.remove("on"); setTimeout(() => o.remove(), 1200); });
  };

  const build = () => {
    L = list();
    const s = (en() ? "en" : "es") + "|" + L.map(a => a.key).join(",");
    if (s === sig) return; 
    const prevKey = curKey;
    sig = s;
    let start = 0;
    if (touched && prevKey) start = Math.max(0, L.findIndex(a => a.key === prevKey));
    rail.innerHTML = L.map((a, i) => `<button type="button" class="ar-th" role="tab" id="arTab${i}" aria-controls="arInfo" aria-selected="false" tabindex="-1" data-i="${i}" aria-label="${esc(a.name)}">
      <span class="ar-th-im"><img src="${a.thumb}" alt="" loading="${i < 8 ? "eager" : "lazy"}" decoding="async"></span><span class="ar-th-n">${esc(a.name)}</span></button>`).join("");
    /* los retratos se crean una vez por artista y se cargan cuando hacen falta */
    stage.innerHTML = L.map((a, i) => a.por
      ? `<img class="ar-por ${a.cut ? "ar-cut" : "ar-frame"}" data-key="${a.key}" ${i === start ? `src="${a.por}" fetchpriority="high"` : `data-src="${a.por}"`} alt="" decoding="async" style="object-position:${a.pos}">`
      : `<span class="ar-por ar-mono" data-key="${a.key}">${esc(a.name.trim().charAt(0))}</span>`).join("");
    cur = -1; show(start, false);
    if (countEl) countEl.textContent = pad(L.length);
  };

  const load = i => { const im = imgs()[i]; if (im && im.dataset.src) { im.src = im.dataset.src; delete im.dataset.src; } };

  const show = (i, anim = true) => {
    if (!L.length) return;
    i = (i + L.length) % L.length;
    if (i === cur) return;
    const a = L[i], prev = cur; cur = i; curKey = a.key;
    $$(".ar-th", rail).forEach((b, k) => { const on = k === i; b.setAttribute("aria-selected", on); b.tabIndex = on ? 0 : -1; b.classList.toggle("on", on); });
    info.setAttribute("aria-labelledby", "arTab" + i);
    const P = imgs(); load(i);
    const swapImg = () => { P.forEach((p, k) => p.classList.toggle("on", k === i)); load((i + 1) % L.length); };
    const im = P[i];
    if (!anim || reduce || !im || im.tagName !== "IMG" || im.complete) swapImg(); else { im.addEventListener("load", swapImg, { once: true }); setTimeout(swapImg, 700); }
    bgCur = a; layoutBg(true);
    const fill = () => { info.innerHTML = infoHTML(a, i); fitName(); hero.classList.remove("swap"); };
    clearTimeout(swapT);
    if (!anim || reduce || prev < 0) fill();
    else { hero.classList.add("swap"); swapT = setTimeout(fill, 320); }
    /* en celular, la miniatura activa a la vista */
    const b = $$(".ar-th", rail)[i]; if (b && anim && rail.scrollWidth > rail.clientWidth + 2) rail.scrollTo({ left: b.offsetLeft - rail.clientWidth / 2 + b.offsetWidth / 2, behavior: reduce ? "auto" : "smooth" });
  };

  rail.addEventListener("click", e => { const b = e.target.closest(".ar-th"); if (b) { touched = true; show(+b.dataset.i); } });
  rail.addEventListener("keydown", e => {
    const k = e.key, nx = ["ArrowDown", "ArrowRight"].includes(k) ? cur + 1 : ["ArrowUp", "ArrowLeft"].includes(k) ? cur - 1 : k === "Home" ? 0 : k === "End" ? L.length - 1 : null;
    if (nx === null) return; e.preventDefault(); touched = true; show(nx); const b = $$(".ar-th", rail)[cur]; b && b.focus({ preventScroll: true });
  });

  /* entrada */
  build();
  const ready = () => requestAnimationFrame(() => { fitName(); hero.classList.add("is-ready"); });
  const first = imgs()[cur];
  Promise.race([Promise.all([document.fonts ? document.fonts.ready : 0, first && first.tagName === "IMG" && !first.complete ? new Promise(r => first.addEventListener("load", r, { once: true })) : 0]), new Promise(r => setTimeout(r, 1200))]).then(ready);
  let rz = 0; addEventListener("resize", () => { cancelAnimationFrame(rz); rz = requestAnimationFrame(() => { fitName(); layoutBg(false); }); });

  /* datos de Supabase e idioma: se enganchan a los de pages.js */
  const oData = window.pgData; window.pgData = () => { oData && oData(); build(); };
  const relang = () => { sig = ""; touched = true; build(); };
  const oAfter = window.pgAfterApp;
  window.pgAfterApp = () => {
    oAfter && oAfter();
    if (typeof setLang === "function" && !window.setLang._ar) { const o = window.setLang; window.setLang = l => { o(l); relang(); }; window.setLang._ar = true; }
    build();
  };
})();
