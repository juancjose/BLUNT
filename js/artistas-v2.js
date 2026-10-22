/* =========================================================
   PRUEBA — Artista destacado (artistas-prueba.html y clasicos-prueba.html)
   Columna de miniaturas, nombre grande, datos (origen · disciplina · obras),
   retrato limpio con epígrafe y, debajo, las obras del artista (una vez cada una).
   data-src en #arHero:
     "galeria"  → solo artistas de BLUNT (Supabase); sin artistas, muestra #arEmpty.
     "maestros" → maestros argentinos (datos locales, dominio público).
   ========================================================= */
(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const hero = $("#arHero"); if (!hero) return;
  const rail = $("#arRail"), stage = $("#arStage"), info = $("#arInfo"), countEl = $("#arCount");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const en = () => (localStorage.getItem("idioma") || (typeof CONFIG !== "undefined" && CONFIG.idioma) || "es") === "en";
  const T = (o, k) => (en() && o[k + "_en"]) || o[k] || "";
  const pad = n => String(n).padStart(2, "0");
  const base = p => p.split("/").pop();
  const thumb = p => "img/prueba/" + base(p).replace(/\.svg$/, ".jpg");
  const isReal = u => u && !/^data:/.test(u);
  const MA = typeof MAESTROS !== "undefined" ? MAESTROS : [];
  const SRC = hero.dataset.src || "galeria";

  const list = () => {
    const ART = window.ARTISTAS || [], OB = window.OBRAS || [];
    const real = SRC === "maestros" ? [] : ART.map(a => {
      const ws = OB.filter(o => o.artista === a.id);
      const por = isReal(a.img) ? a.img : ((ws.find(w => isReal(w.img)) || {}).img || "");
      return { key: "a-" + a.id, name: a.nombre, thumb: por || a.img, por, pos: "50% 25%", cap: [[a.ciudad, T(a, "disciplina")].filter(Boolean).join(" · ")], city: a.ciudad, disc: T(a, "disciplina"), n: ws.length,
        bio: T(a, "bio"), href: `obras.html?artista=${a.id}`, pd: false,
        works: ws.slice(0, 10).map(w => ({ t: T(w, "titulo"), y: w.anio, img: w.img, href: `obra.html?id=${w.id}` })) };
    });
    const ma = SRC !== "maestros" ? [] : MA.map(m => {
      const k = base(m.retrato.img).split("-retrato")[0];
      return { key: "m-" + m.id, name: m.nombre, thumb: thumb(m.retrato.img), por: `img/prueba/port-${k}.jpg`, pos: "50% 40%",
        cap: [T(m, "lugar"), [T(m.retrato, "tipo"), m.retrato.anio].filter(Boolean).join(", ")],
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
    const w = Math.max(0, ...$$(".ar-nl", h).map(x => x.getBoundingClientRect().width));
    if (w > max) h.style.fontSize = (parseFloat(getComputedStyle(h).fontSize) * max / w * 0.98).toFixed(2) + "px";
  };

  const infoHTML = (a, i) => {
    const words = a.name.split(/\s+/);
    /* dos líneas como en una portada: el último apellido abajo (o "de la Cárcova" junto) */
    let cut = words.length > 1 ? Math.ceil(words.length / 2) : 1;
    if (words.length === 4) cut = 1;
    const l1 = words.slice(0, cut).join(" "), l2 = words.slice(cut).join(" ");
    const wspan = s => `<span class="ar-nl">${esc(s)}</span>`;
    const lab = en() ? ["From", "Discipline", "Works"] : ["Origen", "Disciplina", "Obras"];
    const meta = [[lab[0], a.city], [lab[1], a.disc], [lab[2], a.n ? pad(a.n) : "—"]].filter(x => x[1]);
    return `<p class="ar-num"><span>${pad(i + 1)}</span> / ${pad(L.length)}</p>
      <h2 class="ar-name" id="arName">${wspan(l1)}${l2 ? `<br>${wspan(l2)}` : ""}</h2>
      <dl class="ar-meta">${meta.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
      <a class="ar-link" href="${a.href}">${en() ? "Full profile & bio" : "Ver perfil completo"} <i aria-hidden="true">→</i></a>${a.pd ? `<p class="ar-pd">${en() ? "Showcase · Public domain · Not for sale" : "Muestra · Dominio público · No a la venta"}</p>` : ""}`;
  };
  /* Obras del artista debajo del destacado: cada obra una sola vez, en una grilla estática.
     Al cambiar de artista, fundido corto (sale la grilla anterior y entra la nueva). */
  const row = $("#arRow"), rowH = $("#arRowH");
  let rowKey = "", rowT = 0;
  const rowCard = w => `<a class="ar-wc" href="${w.href}"><span class="ar-wc-im"><img src="${w.bg || w.img}" alt="" loading="lazy" decoding="async" onload="this.classList.add('ok')"></span><span class="ar-wc-t">${esc(w.t)}</span>${w.y ? `<span class="ar-wc-y">${esc(w.y)}</span>` : ""}</a>`;
  const renderRow = (a, anim) => {
    if (!row || !a) return;
    if (row.closest(".ar-row")) row.closest(".ar-row").hidden = !a.works.length;
    const key = a.key + "|" + (en() ? "en" : "es"); if (key === rowKey) return; rowKey = key;
    const n = a.works.length, sec = row.closest(".ar-row");
    const fill = () => {
      if (sec) { sec.setAttribute("aria-label", en() ? "Works by " + a.name : "Obras de " + a.name); }
      if (rowH) rowH.innerHTML = `<span>${en() ? "Works by" : "Obras de"}</span> ${esc(a.name)}<i aria-hidden="true"></i><span class="ar-row-n">${pad(n)}</span>`;
      row.className = "ar-row-g n" + Math.min(n, 4);
      row.innerHTML = a.works.map(rowCard).join("");
      requestAnimationFrame(() => sec && sec.classList.remove("swap"));
    };
    clearTimeout(rowT);
    if (!anim || reduce || !row.children.length) fill();
    else { sec && sec.classList.add("swap"); rowT = setTimeout(fill, 260); }
  };
  /* Sin artistas de la galería: estado vacío (invitación a sumarse). Se decide recién
     cuando llegan los datos de Supabase, para no mostrarlo de más mientras cargan. */
  const emptyEl = $("#arEmpty"), allSec = $("#galeria-artistas");
  let dataReady = SRC !== "galeria";
  const setEmpty = () => {
    if (SRC !== "galeria") return;
    const has = L.length > 0;
    hero.hidden = !has;
    if (row && row.closest(".ar-row")) row.closest(".ar-row").hidden = !has || !(L[Math.max(cur, 0)] || L[0]).works.length;
    if (allSec) allSec.hidden = !has;
    if (emptyEl) emptyEl.hidden = has || !dataReady;
    document.body.classList.toggle("ar-wait", !has && !dataReady);
  };
  const build = () => {
    L = list(); setEmpty();
    const s = (en() ? "en" : "es") + "|" + L.map(a => a.key).join(",");
    if (s === sig) return; 
    const prevKey = curKey;
    sig = s;
    let start = 0;
    if (touched && prevKey) start = Math.max(0, L.findIndex(a => a.key === prevKey));
    rail.innerHTML = L.map((a, i) => `<button type="button" class="ar-th" role="tab" id="arTab${i}" aria-controls="arInfo" aria-selected="false" tabindex="-1" data-i="${i}" aria-label="${esc(a.name)}">
      <span class="ar-th-im"><img src="${a.thumb}" alt="" loading="${i < 8 ? "eager" : "lazy"}" decoding="async"></span><span class="ar-th-n">${esc(a.name)}</span></button>`).join("");
    /* los retratos se crean una vez por artista y se cargan cuando hacen falta */
    /* retrato completo, limpio, con epígrafe tipo museo */
    stage.innerHTML = `<figure class="ar-fr"><a class="ar-fr-frame" id="arFrame" href="#" tabindex="-1"><span class="ar-fr-mat"><span class="ar-fr-media">${L.map((a, i) => a.por
      ? `<img class="ar-por" data-key="${a.key}" ${i === start ? `src="${a.por}" fetchpriority="high"` : `data-src="${a.por}"`} alt="" decoding="async" style="object-position:${a.pos}">`
      : `<span class="ar-por ar-mono" data-key="${a.key}">${esc(a.name.trim().charAt(0))}</span>`).join("")}</span></span></a><figcaption class="ar-fr-cap" id="arCap"></figcaption></figure>`;
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
    renderRow(a, anim && prev >= 0);
    const fr = $("#arFrame"); if (fr) { fr.href = a.href; fr.setAttribute("aria-label", (en() ? "Profile of " : "Perfil de ") + a.name); }
    const fill = () => { info.innerHTML = infoHTML(a, i); const cp = $("#arCap"); if (cp) cp.innerHTML = `<strong>${esc(a.name)}</strong>${(a.cap || []).filter(Boolean).map(c => `<span>${esc(c)}</span>`).join("")}`; fitName(); hero.classList.remove("swap"); };
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
  let rz = 0; addEventListener("resize", () => { cancelAnimationFrame(rz); rz = requestAnimationFrame(() => { fitName(); }); });

  /* datos de Supabase e idioma: se enganchan a los de pages.js */
  const oData = window.pgData; window.pgData = () => { oData && oData(); dataReady = true; build(); setEmpty(); };
  setTimeout(() => { if (!dataReady) { dataReady = true; setEmpty(); } }, 8000);
  const relang = () => { sig = ""; rowKey = ""; touched = true; build(); };
  const oAfter = window.pgAfterApp;
  window.pgAfterApp = () => {
    oAfter && oAfter();
    if (typeof setLang === "function" && !window.setLang._ar) { const o = window.setLang; window.setLang = l => { o(l); relang(); }; window.setLang._ar = true; }
    build();
  };
})();
