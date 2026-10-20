/* =========================================================
   INICIO — portada inmersiva (solo index.html)
   ========================================================= */
const PR_LOGO = `<svg class="pr-logo" viewBox="0 0 1776 228" fill="currentColor" role="img" aria-label="BLUNT"><path class="l" style="--i:0" fill-rule="evenodd" d="M0.0 112.6L0.0 0.0L136.8 0.0L273.5 0.0L273.5 0.4L273.5 0.7L274.6 0.8C276.5 1.0 281.5 1.6 284.1 2.1C291.2 3.3 297.5 4.9 303.8 7.0C315.8 11.1 324.1 16.0 331.6 23.4C340.5 32.3 346.5 44.1 348.7 56.6C349.2 59.9 349.4 61.7 349.5 65.7C349.5 70.2 349.5 71.6 348.6 77.8L348.0 82.5L346.0 86.6C344.9 88.8 343.2 92.2 342.4 94.1L340.7 97.4L336.4 101.8L332.1 106.1L332.1 107.8L332.1 109.6L334.3 110.7C337.4 112.4 339.1 113.5 341.6 115.6C348.0 121.1 353.7 128.1 356.8 134.1C358.7 137.7 360.7 143.7 361.6 148.2C362.2 151.4 362.5 152.8 362.8 152.8C363.0 152.9 363.0 153.3 363.0 159.5C363.0 164.7 363.0 166.1 362.8 166.1C362.7 166.1 362.5 167.2 362.1 169.5C361.8 171.4 361.3 173.7 361.1 174.7C358.5 184.8 352.6 195.0 345.2 202.1C339.9 207.2 333.7 211.5 327.2 214.6C319.8 218.2 312.1 220.6 298.9 223.6L295.6 224.4L211.2 224.6C136.4 224.7 81.5 224.9 19.3 225.1L0.0 225.1L0.0 112.6ZM152.6 175.9C176.3 175.8 212.1 175.7 232.1 175.6L268.5 175.5L271.3 174.2C274.2 172.9 275.4 172.2 276.8 171.2C280.6 168.4 283.5 163.9 284.3 159.5C284.4 158.8 284.5 157.7 284.5 156.0C284.5 153.9 284.5 153.4 284.2 152.2C283.3 148.3 281.9 145.6 279.6 143.2C277.8 141.3 276.3 140.2 272.2 138.0L269.5 136.5L175.0 136.5L80.5 136.5L80.5 140.1C80.1 155.4 80.1 170.5 80.4 173.6C80.4 174.2 80.6 175.0 80.7 175.4L81.0 176.1L95.3 176.1C103.1 176.0 128.9 175.9 152.6 175.9ZM148.1 86.9C170.3 86.8 205.6 86.7 226.5 86.6L264.5 86.5L266.3 85.5C268.5 84.3 269.3 83.8 270.6 82.8C274.4 79.8 277.0 75.4 277.6 70.6C277.8 69.3 277.7 65.9 277.4 64.6C276.7 61.4 275.3 58.7 272.9 56.3C271.4 54.6 270.4 53.9 267.1 52.0L264.5 50.5L226.7 50.4C195.8 50.3 104.7 50.0 84.8 50.0L80.0 50.0L80.0 68.6L80.0 87.2L93.8 87.1C101.5 87.0 125.9 86.9 148.1 86.9Z"/><path class="l" style="--i:1" fill-rule="evenodd" d="M571.0 224.9C534.3 224.8 482.4 224.7 455.7 224.6C429.0 224.6 404.2 224.5 400.6 224.5L394.0 224.5L394.0 112.2L394.0 0.0L431.2 -0.0L468.5 -0.0L468.5 16.4C468.6 25.4 468.7 52.9 468.8 77.5C468.8 102.1 468.9 134.4 469.0 149.2L469.0 176.2L471.2 176.2C472.4 176.2 474.5 176.2 475.9 176.1C484.0 175.7 499.5 175.2 530.4 174.3C536.2 174.1 543.6 173.9 546.8 173.8C553.3 173.6 558.4 173.5 569.3 173.2C575.9 173.0 579.8 172.9 594.2 172.5C596.7 172.4 601.3 172.3 604.4 172.2C607.6 172.1 613.0 171.9 616.4 171.8C619.9 171.7 623.3 171.6 624.1 171.6C624.9 171.5 628.2 171.4 631.5 171.3C634.8 171.2 638.1 171.1 638.9 171.1C639.7 171.0 642.1 170.9 644.2 170.9C647.7 170.8 652.3 170.6 661.9 170.2C663.8 170.2 667.1 170.0 669.2 169.9C671.3 169.8 673.9 169.7 675.0 169.8L677.0 169.8L677.0 197.4L677.0 225.0L657.4 225.0C646.6 225.0 607.7 224.9 571.0 224.9Z"/><path class="l" style="--i:2" fill-rule="evenodd" d="M804.5 227.8C804.5 227.6 804.3 227.6 798.5 227.2C785.5 226.4 776.1 225.1 766.8 222.8C743.4 216.8 726.0 205.8 714.0 189.2C707.8 180.7 703.1 170.3 700.2 158.9C698.6 152.4 697.6 146.6 696.9 137.9C696.3 131.8 696.4 132.1 696.2 132.1C696.0 132.1 696.0 122.2 696.0 66.1L696.0 0.0L732.4 0.0L768.8 0.0L768.9 6.5C769.0 14.5 769.2 48.5 769.4 99.5L769.6 137.6L770.8 141.4C772.5 146.7 773.5 149.3 775.1 152.5C778.1 158.2 782.0 162.7 787.0 166.2C792.3 169.8 799.4 172.6 808.1 174.3C812.2 175.1 817.8 175.9 821.1 176.1C833.2 176.9 878.0 177.1 900.2 176.5C906.9 176.3 909.5 176.2 913.1 175.7C925.3 174.2 934.5 171.6 941.4 167.5C947.2 164.0 951.7 159.5 955.1 153.6C956.6 150.8 957.6 148.6 959.3 143.8L960.4 140.6L960.6 107.4C960.9 68.6 961.3 16.9 961.4 7.0L961.5 0.0L998.3 0.0L1035.0 0.0L1035.0 70.1C1035.0 126.4 1035.0 140.2 1034.8 140.2C1034.7 140.2 1034.5 141.6 1034.0 144.7C1032.0 158.1 1029.2 167.5 1024.4 177.3C1020.1 186.0 1015.5 192.4 1008.8 199.0C1004.6 203.1 1000.6 206.3 995.9 209.3C981.2 218.7 963.5 224.2 940.9 226.6C939.6 226.7 927.7 227.6 927.3 227.6C927.3 227.6 927.2 227.7 927.2 227.8C927.2 228.0 920.3 228.0 865.9 228.0C813.4 228.0 804.5 228.0 804.5 227.8Z"/><path class="l" style="--i:3" fill-rule="evenodd" d="M1075.1 224.7C1075.0 224.5 1074.4 220.1 1074.4 219.9C1074.4 219.9 1074.3 219.9 1074.2 219.9C1074.0 219.9 1074.0 208.9 1074.0 121.9L1074.0 23.9L1074.3 23.9C1074.7 23.9 1074.7 23.5 1074.7 20.0C1074.7 16.5 1074.7 16.1 1074.3 16.1L1074.0 16.1L1074.0 8.1L1074.0 0.0L1111.4 0.0C1131.9 0.0 1148.7 0.0 1148.8 0.1C1148.8 0.2 1150.9 1.0 1153.4 1.9L1158.0 3.5L1191.0 31.0C1233.0 66.0 1241.4 73.0 1261.6 89.4C1264.6 91.9 1268.1 94.8 1269.4 95.8C1275.1 100.5 1282.9 106.8 1299.2 119.9C1308.2 127.2 1320.1 136.6 1327.9 142.6L1330.8 144.9L1332.6 144.9L1334.3 144.9L1334.4 143.7C1334.8 137.9 1335.0 105.0 1335.0 47.8L1335.0 0.0L1373.5 0.0L1412.0 0.0L1412.0 112.5L1412.0 225.0L1369.2 225.0L1326.4 225.0L1324.3 224.4C1323.1 224.0 1320.8 223.3 1319.0 222.8L1315.9 221.9L1305.2 213.3C1299.4 208.6 1293.6 203.9 1292.4 202.9C1282.6 195.1 1278.1 191.5 1272.3 186.7C1269.9 184.8 1266.4 182.0 1264.6 180.5C1262.8 179.0 1260.2 176.9 1258.9 175.8C1257.5 174.7 1255.7 173.3 1254.9 172.6C1254.0 171.9 1251.5 169.8 1249.2 167.9C1246.9 166.1 1243.3 163.1 1241.1 161.3C1238.9 159.5 1235.3 156.6 1233.1 154.9C1231.0 153.1 1226.4 149.4 1223.0 146.7C1219.6 143.9 1215.1 140.3 1213.0 138.6C1203.3 130.8 1191.1 121.0 1175.4 108.4C1166.1 100.9 1157.0 93.5 1155.2 92.1L1152.0 89.5L1150.3 89.5L1148.5 89.5L1148.5 100.7C1148.4 110.7 1148.3 126.7 1148.0 202.9L1148.0 225.0L1111.5 225.0L1075.1 225.0L1075.1 224.7Z"/><path class="l" style="--i:4" fill-rule="evenodd" d="M1557.0 137.5L1557.0 50.0L1499.0 50.0L1441.0 50.0L1441.0 25.0L1441.0 0.0L1608.5 0.0L1776.0 0.0L1776.0 24.2L1776.0 48.4L1775.6 48.4C1775.3 48.4 1775.3 48.4 1775.1 49.2L1774.9 49.9L1706.0 50.0L1637.0 50.0L1637.0 137.5L1637.0 225.0L1597.0 225.0L1557.0 225.0L1557.0 137.5Z"/></svg>`;
window.initHome = function () {
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hero = $("#prHero"), media = $("#prMedia"), cap = $("#prCap"), prog = $("#prProg"), header = $("header.site");
  if (!hero) return;


  /* Logo grande: reutiliza el SVG del header */
  /* Versión limpia del logotipo para tamaño grande (sin las astillas finas del trazado original,
     que a este tamaño se veían como palitos/muescas en los bordes de las letras) */
  $("#prMark").innerHTML = PR_LOGO.replace('aria-label="BLUNT"', `aria-label="${esc(CONFIG.nombre)}"`);

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
    const fade = parseFloat(getComputedStyle(hero).paddingBottom) || 0;
    const over = hero.getBoundingClientRect().bottom - fade * 0.8 > header.offsetHeight + 1 && !(nav && nav.classList.contains("open"));
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
