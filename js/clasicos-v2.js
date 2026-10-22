/* =========================================================
   PRUEBA — Clásicos: sala internacional (clasicos-prueba.html)
   Cada obra maestra una sola vez, centrada: imagen grande, título, autor (solo texto),
   año, una nota breve y el museo. Datos: CLASICOS (js/clasicos.js) + notas de esta página.
   ========================================================= */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const list = $("#clRoom"); if (!list || typeof CLASICOS === "undefined") return;
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const en = () => (localStorage.getItem("idioma") || (typeof CONFIG !== "undefined" && CONFIG.idioma) || "es") === "en";
  const T = (o, k) => (en() && o[k + "_en"]) || o[k] || "";
  const pad = n => String(n).padStart(2, "0");
  const img = p => "img/prueba/room-" + p.split("/").pop().replace(/\.svg$/, ".jpg");
  /* tamaño real de cada imagen (evita saltos mientras cargan) */
  const SIZE = { "van-gogh": [1200, 951], vermeer: [1013, 1200], hokusai: [1200, 807], klimt: [1196, 1200], monet: [1200, 931], turner: [1200, 891], seurat: [1200, 799], botticelli: [1200, 753] };
  const NOTA = {
    "van-gogh": ["Pintada en el asilo de Saint-Rémy, a partir de la vista desde su ventana: un cielo en remolinos sobre un pueblo dormido.", "Painted at the Saint-Rémy asylum from the view out of his window: a swirling sky over a sleeping village."],
    vermeer: ["Más que un retrato, un «tronie»: un rostro anónimo, una mirada por encima del hombro y una perla hecha con dos toques de luz.", "Less a portrait than a tronie: an anonymous face, a glance over the shoulder and a pearl made of two touches of light."],
    hokusai: ["Grabado en madera de la serie Treinta y seis vistas del monte Fuji. El Fuji, diminuto, espera al fondo, bajo la ola.", "Woodblock print from the series Thirty-six Views of Mount Fuji. The tiny mountain waits in the distance, beneath the wave."],
    klimt: ["La obra cumbre de su período dorado: una pareja abrazada, envuelta en pan de oro y ornamento.", "The high point of his Golden Period: an embracing couple wrapped in gold leaf and ornament."],
    monet: ["Una mañana de niebla en el puerto de Le Havre. Su título terminó dándole nombre al impresionismo.", "A misty morning in the port of Le Havre. Its title ended up giving Impressionism its name."],
    turner: ["Un veterano buque de Trafalgar, remolcado por un vapor hacia el desguace bajo un atardecer encendido.", "A veteran warship of Trafalgar, towed by a steam tug to be broken up, under a blazing sunset."],
    seurat: ["Miles de puntos de color puro que se mezclan en el ojo de quien mira: el manifiesto del puntillismo.", "Thousands of dots of pure colour that blend in the viewer's eye: the manifesto of Pointillism."],
    botticelli: ["Venus llega a la orilla sobre una concha, empujada por los vientos: un emblema del Renacimiento florentino.", "Venus reaches the shore on a shell, blown by the winds: an emblem of the Florentine Renaissance."]
  };
  const ORDER = ["van-gogh", "vermeer", "hokusai", "klimt", "monet", "turner", "seurat", "botticelli"];
  const CL = ORDER.map(id => CLASICOS.find(c => c.id === id)).filter(Boolean).concat(CLASICOS.filter(c => !ORDER.includes(c.id)));
  let sig = "";
  const render = () => {
    const s = en() ? "en" : "es"; if (s === sig) return; sig = s;
    const cnt = $("#clRoomC"); if (cnt) cnt.textContent = pad(CL.length);
    list.innerHTML = CL.map((c, i) => {
      const [w, h] = SIZE[c.id] || [1200, 900], n = NOTA[c.id];
      return `<li class="cl-w${h > w ? " is-tall" : ""}">
        <figure class="cl-w-fig"><img src="${img(c.img)}" width="${w}" height="${h}" alt="${esc(T(c, "titulo"))}, ${esc(c.artista)}" loading="${i ? "lazy" : "auto"}" decoding="async" onload="this.classList.add('ok')"></figure>
        <div class="cl-w-cap">
          <p class="cl-w-n"><span>${pad(i + 1)}</span> / ${pad(CL.length)}</p>
          <h3 class="cl-w-t">${esc(T(c, "titulo"))}</h3>
          <p class="cl-w-a">${esc(c.artista)}<i aria-hidden="true"></i>${esc(c.anio)}</p>
          ${n ? `<p class="cl-w-note">${esc(n[en() ? 1 : 0])}</p>` : ""}
          <p class="cl-w-m">${esc(T(c, "museo"))}</p>
        </div></li>`;
    }).join("");
  };
  render();
  const oAfter = window.pgAfterApp;
  window.pgAfterApp = () => {
    oAfter && oAfter();
    if (typeof setLang === "function" && !window.setLang._cl) { const o = window.setLang; window.setLang = l => { o(l); render(); }; window.setLang._cl = true; }
    render();
  };
})();
