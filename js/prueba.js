/* =========================================================
   PRUEBA — portada inmersiva (solo prueba.html, no afecta al inicio actual)
   ========================================================= */
window.initPrueba = function () {
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hero = $("#prHero"), media = $("#prMedia"), cap = $("#prCap"), prog = $("#prProg"), header = $("header.site");
  if (!hero) return;

  /* En la prueba, "Inicio" y el logo vuelven a la prueba */
  document.querySelectorAll('header.site a.logo, nav.main a[href="index.html"]').forEach(a => a.setAttribute("href", "prueba.html"));

  /* Logo grande: reutiliza el SVG del header */
  const logo = header && header.querySelector(".logo-svg");
  if (logo) { const big = logo.cloneNode(true); big.classList.add("pr-logo"); $("#prMark").appendChild(big); }

  /* Diapositivas: obras reales si hay; si no, clásicos de dominio público (muestra) */
  const ART = typeof ARTISTAS !== "undefined" ? ARTISTAS : [], OB = typeof OBRAS !== "undefined" ? OBRAS : [];
  const artName = id => (ART.find(a => a.id === id) || {}).nombre || "";
  const FOCO = { "van-gogh": "55% 45%", hokusai: "35% 50%", klimt: "50% 28%", vermeer: "50% 28%", monet: "50% 55%", turner: "38% 55%", seurat: "50% 55%", botticelli: "50% 35%" };
  const portrait = innerHeight > innerWidth;
  const ORDEN = portrait ? ["vermeer", "klimt", "van-gogh", "botticelli", "hokusai", "monet", "turner", "seurat"]
                         : ["van-gogh", "hokusai", "monet", "klimt", "turner", "seurat", "botticelli", "vermeer"];
  const real = OB.filter(o => o.img).slice(0, 8).map(o => ({ img: o.img, alt: `${o.titulo}, de ${artName(o.artista)}`, t: o.titulo, a: artName(o.artista), y: o.anio, href: `obra.html?id=${o.id}`, real: true }));
  const CL = (typeof CLASICOS !== "undefined" ? CLASICOS.slice() : []).sort((a, b) => ORDEN.indexOf(a.id) - ORDEN.indexOf(b.id));
  const slides = real.length ? real : CL.map(c => ({ img: c.img, alt: `${c.titulo}, de ${c.artista}`, t: c.titulo, a: c.artista, y: c.anio, pos: FOCO[c.id], href: "clasicos.html" }));
  if (!slides.length) slides.push({ img: "img/escenas/galeria.svg", alt: "", t: "", a: "" });

  media.innerHTML = slides.map((s, k) => `<div class="pr-slide${k ? "" : " on"}" style="--kb:${k % 3}"><img ${k ? `data-src="${s.img}"` : `src="${s.img}" fetchpriority="high"`} alt="" style="object-position:${s.pos || "50% 50%"}"></div>`).join("");
  const els = [...media.children], imgs = els.map(e => e.querySelector("img"));
  const load = k => { const im = imgs[k]; if (im && im.dataset.src) { im.src = im.dataset.src; delete im.dataset.src; } };
  const n = slides.length, pad = x => String(x).padStart(2, "0");
  const capHTML = k => { const s = slides[k]; if (!s.t) return "";
    return `<p class="pr-count"><span>${pad(k + 1)}</span> / ${pad(n)}</p><p class="pr-cap-t"><a href="${s.href}">${esc(s.t)}</a></p><p class="pr-cap-m">${esc(s.a)}${s.y ? `, ${esc(s.y)}` : ""}</p>` +
      `<p class="pr-cap-n">${s.real ? "Obra original" : "Muestra · Dominio público · No a la venta"}</p>`; };
  cap.innerHTML = capHTML(0);
  const DUR = 7000;
  prog.style.setProperty("--dur", DUR + "ms");
  prog.innerHTML = n > 1 ? slides.map((s, k) => `<button type="button" class="pr-seg${k ? "" : " on"}" data-k="${k}" aria-label="${k + 1} / ${n}"><i></i></button>`).join("") : "";
  const segs = [...prog.children];

  let cur = 0, timer = null;
  const go = k => {
    k = (k + n) % n; if (k === cur) return; load(k);
    els[cur].classList.remove("on"); els[cur].classList.add("off");
    const prev = els[cur]; setTimeout(() => prev.classList.remove("off"), 2200);
    els[k].classList.remove("off"); els[k].classList.add("on");
    segs.forEach((s, j) => { s.classList.toggle("on", j === k); s.classList.toggle("done", j < k); });
    cap.classList.add("swap"); setTimeout(() => { cap.innerHTML = capHTML(k); cap.classList.remove("swap"); }, 450);
    cur = k; load((k + 1) % n);
  };
  const stop = () => { clearInterval(timer); timer = null; };
  const start = () => { stop(); if (!reduce && !document.hidden && n > 1) timer = setInterval(() => go(cur + 1), DUR); };
  /* reinicia la barra de progreso del segmento activo */
  const restartBar = () => { const s = segs[cur]; if (s) { s.classList.remove("on"); void s.offsetWidth; s.classList.add("on"); } };
  prog.addEventListener("click", e => { const b = e.target.closest(".pr-seg"); if (!b) return; go(+b.dataset.k); restartBar(); start(); });
  document.addEventListener("visibilitychange", () => { start(); restartBar(); });
  if (n > 1) { if (imgs[0].complete) load(1); else imgs[0].addEventListener("load", () => load(1), { once: true }); }

  /* Entrada: espera la primera imagen (máx. 1.2 s) para que el fundido sea limpio */
  let started = false;
  const begin = () => { if (started) return; started = true; requestAnimationFrame(() => { hero.classList.add("is-ready"); restartBar(); start(); }); };
  if (imgs[0].complete) begin(); else { imgs[0].addEventListener("load", begin, { once: true }); imgs[0].addEventListener("error", begin, { once: true }); setTimeout(begin, 1200); }

  /* Header transparente sobre la portada */
  const nav = $("#nav");
  const syncHeader = () => {
    if (!header) return;
    const over = hero.getBoundingClientRect().bottom > header.offsetHeight + 1 && !(nav && nav.classList.contains("open"));
    header.classList.toggle("is-over", over);
  };
  const mb = $("#menuBtn"); if (mb) mb.addEventListener("click", syncHeader);

  /* Parallax suave del contenido al hacer scroll */
  const inner = hero.querySelector(".pr-inner");
  let ticking = false;
  const onScroll = () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      ticking = false; syncHeader();
      if (reduce) return;
      const y = Math.max(0, scrollY), h = hero.offsetHeight;
      if (y > h) return;
      media.style.transform = `translate3d(0,${(y * 0.35).toFixed(1)}px,0)`;
      inner.style.transform = `translate3d(0,${(y * 0.12).toFixed(1)}px,0)`;
      inner.style.opacity = Math.max(0, 1 - y / (h * 0.75)).toFixed(3);
    });
  };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  syncHeader();

  /* Revelado al scroll para los bloques nuevos (mismo efecto que el resto del sitio) */
  if ("IntersectionObserver" in window && !reduce) {
    const items = [...document.querySelectorAll(".pr-intro-grid > *, .pr-points li, .pr-frame-grid > *")];
    items.forEach(el => { const sib = [...el.parentElement.children]; el.style.setProperty("--d", `${Math.min(sib.indexOf(el), 5) * 90}ms`); el.classList.add("reveal"); });
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(el => io.observe(el));
  }
};
