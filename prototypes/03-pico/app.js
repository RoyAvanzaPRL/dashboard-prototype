const NAV = {
  resumen: "Inicio",
  expedientes: "Expedientes",
  clientes: "Clientes",
  agenda: "Agenda",
  documentos: "Documentos",
  equipo: "Equipo",
};

const MODULES = {
  resumen: "modules/resumen.html",
  expedientes: "modules/expedientes.html",
  clientes: "modules/clientes.html",
  agenda: "modules/agenda.html",
  documentos: "modules/documentos.html",
  equipo: "modules/equipo.html",
  expediente: "modules/expediente.html",
  cliente: "modules/cliente.html",
};

const STATUS = {
  abierto: { label: "Abierto", dot: "bg-tide" },
  urgente: { label: "Urgente", dot: "bg-hot" },
  cerrado: { label: "Cerrado", dot: "bg-slate-300" },
};

const AREAS = {
  mercantil: "Mercantil",
  laboral: "Laboral",
  civil: "Civil",
  familia: "Familia",
  contencioso: "Contencioso",
};

const HOURS = ["9h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h"];

const WEEKS = {
  w1: {
    label: "5–11 oct 2026",
    days: [
      { key: "5", letter: "L", name: "lunes 5" },
      { key: "6", letter: "M", name: "martes 6" },
      { key: "7", letter: "X", name: "miércoles 7", today: true },
      { key: "8", letter: "J", name: "jueves 8" },
      { key: "9", letter: "V", name: "viernes 9" },
      { key: "10", letter: "S", name: "sábado 10" },
      { key: "11", letter: "D", name: "domingo 11" },
    ],
    grid: [
      [2, 1, 1, 3, 8, 1, 0],
      [3, 2, 6, 4, 5, 1, 0],
      [2, 3, 4, 5, 4, 0, 1],
      [1, 2, 2, 3, 2, 0, 0],
      [2, 1, 3, 11, 3, 1, 0],
      [4, 3, 2, 9, 4, 0, 0],
      [3, 4, 3, 8, 3, 1, 0],
      [2, 2, 5, 6, 2, 0, 0],
      [1, 1, 2, 4, 1, 0, 0],
    ],
    busy: [
      { when: "Jue, 13:00", title: "Contestación de Nou Transport", meta: "1 vencimiento", href: "#/expediente/EXP-2026-019" },
      { when: "Vie, 9:30", title: "Informe pericial de Helvetia", meta: "1 revisión", href: "#/expediente/EXP-2026-003" },
      { when: "Hoy, 16:30", title: "Llamada con Olga Serra", meta: "1 reunión", href: "#/expediente/EXP-2026-003" },
    ],
    byDay: {
      5: [],
      6: [],
      7: [
        { when: "Hoy, 10:00", title: "Estrategia de la vista, con Jordi", meta: "Sala 2", href: "#/expediente/EXP-2026-014" },
        { when: "Hoy, 16:30", title: "Olga Serra, Helvetia", meta: "Decidir el perito de parte", href: "#/expediente/EXP-2026-003" },
      ],
      8: [{ when: "Jueves 8, 13:00", title: "Presentar la contestación", meta: "Cerrar con Ricard antes de las 11", href: "#/expediente/EXP-2026-019" }],
      9: [{ when: "Viernes 9, 9:30", title: "Lectura del informe pericial", meta: "Helvetia", href: "#/expediente/EXP-2026-003" }],
      10: [],
      11: [],
    },
    panel: {
      title: "Revisar el jueves",
      lede: "Mañana se concentra el vencimiento de Nou Transport. La contestación tiene que quedar cerrada con Ricard Puig antes de las 11:00.",
      bars: [
        { label: "8h", v: 22, hot: false },
        { label: "", v: 30, hot: false },
        { label: "10h", v: 26, hot: false },
        { label: "", v: 18, hot: false },
        { label: "12h", v: 24, hot: false },
        { label: "", v: 86, hot: true },
        { label: "14h", v: 100, hot: true },
        { label: "", v: 94, hot: true },
        { label: "16h", v: 72, hot: true },
        { label: "", v: 28, hot: false },
        { label: "18h", v: 16, hot: false },
      ],
      predictTitle: "Predicción de mañana",
      predicts: ["Pico 13:00–16:00 · contestación", "Cierre con Ricard antes de las 11:00"],
      blockTitle: "Plazos de mañana",
      blockHref: "#/agenda",
      metrics: [
        { n: "2", label: "Hitos en el día", hint: "11:00 y 13:00", tone: "good" },
        { n: "1", label: "Sin presentar", hint: "vence mañana", tone: "bad" },
      ],
      actionHref: "#/expediente/EXP-2026-019",
      action: "Preparar contestación",
    },
  },
  w2: {
    label: "12–18 oct 2026",
    days: [
      { key: "12", letter: "L", name: "lunes 12" },
      { key: "13", letter: "M", name: "martes 13" },
      { key: "14", letter: "X", name: "miércoles 14" },
      { key: "15", letter: "J", name: "jueves 15" },
      { key: "16", letter: "V", name: "viernes 16" },
      { key: "17", letter: "S", name: "sábado 17" },
      { key: "18", letter: "D", name: "domingo 18" },
    ],
    grid: [
      [1, 2, 4, 2, 1, 0, 0],
      [2, 3, 5, 3, 2, 0, 0],
      [2, 3, 10, 3, 2, 1, 0],
      [1, 2, 7, 2, 3, 0, 0],
      [2, 2, 4, 3, 4, 0, 0],
      [1, 2, 3, 2, 8, 0, 0],
      [1, 1, 2, 2, 6, 0, 0],
      [1, 1, 2, 1, 4, 0, 0],
      [0, 1, 1, 1, 2, 0, 0],
    ],
    busy: [
      { when: "Mié 14, 11:30", title: "Vista preliminar de Mora & Hijos", meta: "1 vista", href: "#/expediente/EXP-2026-014" },
      { when: "Vie 16", title: "Propuesta de inventario, familia Riera", meta: "1 envío", href: "#/expediente/EXP-2025-088" },
    ],
    byDay: {
      12: [],
      13: [],
      14: [{ when: "Miércoles 14, 11:30", title: "Vista preliminar", meta: "Mercantil n.º 7 · Jordi Palau", href: "#/expediente/EXP-2026-014" }],
      15: [],
      16: [{ when: "Viernes 16", title: "Propuesta de inventario", meta: "Clara la envía a la otra parte", href: "#/expediente/EXP-2025-088" }],
      17: [],
      18: [],
    },
    panel: {
      title: "Revisar el miércoles 14",
      lede: "La vista preliminar de Mora & Hijos es el hito de esa semana. Acude Jordi Palau al Mercantil n.º 7.",
      bars: [
        { label: "8h", v: 16, hot: false },
        { label: "", v: 24, hot: false },
        { label: "10h", v: 40, hot: false },
        { label: "", v: 100, hot: true },
        { label: "12h", v: 78, hot: true },
        { label: "", v: 48, hot: true },
        { label: "14h", v: 22, hot: false },
        { label: "", v: 18, hot: false },
        { label: "16h", v: 14, hot: false },
        { label: "", v: 12, hot: false },
        { label: "18h", v: 8, hot: false },
      ],
      predictTitle: "Predicción del día 14",
      predicts: ["Pico 11:30 · vista preliminar", "Jordi lleva el señalamiento"],
      blockTitle: "Esa semana",
      blockHref: "#/agenda",
      metrics: [
        { n: "1", label: "Vista señalada", hint: "miércoles 11:30", tone: "good" },
        { n: "1", label: "Envío de Clara", hint: "inventario, viernes 16", tone: "bad" },
      ],
      actionHref: "#/expediente/EXP-2026-014",
      action: "Abrir la vista",
    },
  },
  w3: {
    label: "19–25 oct 2026",
    days: [
      { key: "19", letter: "L", name: "lunes 19" },
      { key: "20", letter: "M", name: "martes 20" },
      { key: "21", letter: "X", name: "miércoles 21" },
      { key: "22", letter: "J", name: "jueves 22" },
      { key: "23", letter: "V", name: "viernes 23" },
      { key: "24", letter: "S", name: "sábado 24" },
      { key: "25", letter: "D", name: "domingo 25" },
    ],
    grid: [
      [1, 1, 3, 1, 1, 0, 0],
      [1, 2, 6, 2, 1, 0, 0],
      [2, 2, 9, 2, 1, 0, 0],
      [1, 1, 7, 1, 1, 0, 0],
      [1, 2, 4, 1, 1, 0, 0],
      [1, 1, 3, 1, 0, 0, 0],
      [0, 1, 2, 1, 0, 0, 0],
      [0, 1, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
    ],
    busy: [{ when: "Mié 21", title: "Alegaciones de la terraza", meta: "Adrià Bosch", href: "#/expediente/EXP-2026-011" }],
    byDay: {
      19: [],
      20: [],
      21: [{ when: "Miércoles 21", title: "Alegaciones de la licencia", meta: "Braseria del Port · Adrià Bosch", href: "#/expediente/EXP-2026-011" }],
      22: [],
      23: [],
      24: [],
      25: [],
    },
    panel: {
      title: "Revisar el miércoles 21",
      lede: "Adrià presenta las alegaciones de la terraza de Sitges. Joana Vidal quiere saber si cabe una medida cautelar.",
      bars: [
        { label: "8h", v: 12, hot: false },
        { label: "", v: 20, hot: false },
        { label: "10h", v: 70, hot: true },
        { label: "", v: 100, hot: true },
        { label: "12h", v: 84, hot: true },
        { label: "", v: 36, hot: false },
        { label: "14h", v: 22, hot: false },
        { label: "", v: 16, hot: false },
        { label: "16h", v: 12, hot: false },
        { label: "", v: 10, hot: false },
        { label: "18h", v: 8, hot: false },
      ],
      predictTitle: "Predicción del día 21",
      predicts: ["Pico por la mañana · alegaciones", "El plano de 2019 ya está pedido"],
      blockTitle: "Esa semana",
      blockHref: "#/expediente/EXP-2026-011",
      metrics: [
        { n: "1", label: "Escrito a presentar", hint: "miércoles 21", tone: "good" },
        { n: "1", label: "Cliente esperando", hint: "Joana, esta semana", tone: "bad" },
      ],
      actionHref: "#/expediente/EXP-2026-011",
      action: "Abrir la terraza",
    },
  },
};

const ui = {
  compact: false,
  panelOpen: true,
  span: "week",
  week: "w1",
  day: 2,
  sede: "barcelona",
};

const main = document.querySelector("#main");
const sidebar = document.querySelector("#sidebar");
const noticeToggle = document.querySelector("#notice-toggle");
const noticePanel = document.querySelector("#notice-panel");
const sedeToggle = document.querySelector("#sede-toggle");
const sedePanel = document.querySelector("#sede-panel");
const sedeLabel = document.querySelector("#sede-label");
const inviteToggle = document.querySelector("#invite-toggle");
const invitePanel = document.querySelector("#invite-panel");
const tutorialsToggle = document.querySelector("#tutorials-toggle");
const tutorialsPanel = document.querySelector("#tutorials-panel");
const palette = document.querySelector("#palette");
const paletteList = palette.querySelector("div");
const globalSearch = document.querySelector("#q-global");

function parseRoute() {
  const raw = decodeURIComponent(location.hash.replace(/^#/, ""));
  const path = raw.startsWith("/") ? raw : `/${raw}`;
  const [pathname, search = ""] = path.split("?");
  const parts = pathname.split("/").filter(Boolean);
  return {
    name: parts[0] || "resumen",
    param: parts[1] ? decodeURIComponent(parts[1]) : "",
    query: new URLSearchParams(search),
  };
}

function navKey(name) {
  if (name === "expediente") return "expedientes";
  if (name === "cliente") return "clientes";
  return name;
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function fill(root, record) {
  root.querySelectorAll("[data-bind]").forEach((node) => {
    const key = node.dataset.bind;
    if (key === "clientLink" || key === "emailLink") return;
    node.textContent = record[key] ?? "";
  });
}

function statusMarkup(status) {
  const item = STATUS[status] || STATUS.abierto;
  return `<span class="inline-flex items-center gap-2 text-sm"><span class="size-1.5 rounded-full ${item.dot}"></span>${item.label}</span>`;
}

function closeLayer(panel, toggle) {
  if (!panel || !toggle) return;
  panel.hidden = true;
  toggle.setAttribute("aria-expanded", "false");
}

function closeFloaters() {
  closeLayer(noticePanel, noticeToggle);
  closeLayer(sedePanel, sedeToggle);
  closeLayer(invitePanel, inviteToggle);
  closeLayer(tutorialsPanel, tutorialsToggle);
  palette.hidden = true;
}

function heatTone(n) {
  if (n <= 0) return ["#f3f6f6", "#a3aaaa"];
  if (n <= 2) return ["#d7f4ef", "#3e6d67"];
  if (n <= 4) return ["#9fe6dc", "#145e56"];
  if (n <= 7) return ["#3dcec0", "#ffffff"];
  if (n <= 9) return ["#14b5a5", "#ffffff"];
  return ["#0c857c", "#ffffff"];
}

function renderHeat() {
  const week = WEEKS[ui.week];
  const heat = main.querySelector("#heat");
  const busy = main.querySelector("#busy");
  if (!heat || !week) return;

  const dayMode = ui.span === "day";
  const dayIndex = Math.min(ui.day, week.days.length - 1);
  const columns = dayMode ? [dayIndex] : week.days.map((_, index) => index);
  const template = dayMode ? "2.4rem 4.5rem" : `2.4rem repeat(${columns.length}, minmax(0, 1fr))`;

  const heads = columns
    .map((index) => {
      const day = week.days[index];
      const mark = day.today ? "box-shadow:inset 0 0 0 1.5px #12b5a4;color:#0f766e;" : "";
      return `<button type="button" data-pick-day="${index}" class="grid h-7 place-items-center rounded-full text-xs font-semibold text-[#66707a]" style="${mark}" aria-pressed="${dayMode && index === dayIndex ? "true" : "false"}">${day.letter}</button>`;
    })
    .join("");

  const rows = week.grid
    .map((row, hour) => {
      const cells = columns
        .map((index) => {
          const n = row[index];
          const [bg, fg] = heatTone(n);
          const day = week.days[index];
          return `<span class="grid h-7 place-items-center rounded-md text-[11px] font-semibold tabular-nums" style="background:${bg};color:${fg}" title="${esc(day.name)} · ${HOURS[hour]} · ${n}">${n}</span>`;
        })
        .join("");
      return `<div class="grid items-center gap-1.5" style="grid-template-columns:${template}"><span class="text-[11px] text-mute">${HOURS[hour]}</span>${cells}</div>`;
    })
    .join("");

  heat.innerHTML = `<div class="grid items-center gap-1.5" style="grid-template-columns:${template}"><span></span>${heads}</div><div class="mt-1.5 grid gap-1.5">${rows}</div>`;

  const items = dayMode ? week.byDay[week.days[dayIndex].key] || [] : week.busy;
  busy.innerHTML = items.length
    ? items
        .map(
          (item) => `
            <a href="${esc(item.href)}" class="mt-3 block first:mt-2">
              <p class="text-[13px] font-semibold leading-snug">${esc(item.when)}</p>
              <p class="mt-0.5 text-[13px] leading-snug text-[#3c424a]">${esc(item.title)}</p>
              <p class="text-[11px] text-mute">${esc(item.meta)}</p>
            </a>`,
        )
        .join("")
    : `<p class="mt-3 text-sm text-mute">Ese día no hay señalamiento.</p>`;

  heat.querySelectorAll("[data-pick-day]").forEach((button) => {
    button.addEventListener("click", () => {
      ui.day = Number(button.dataset.pickDay);
      ui.span = "day";
      syncSpan();
      renderHeat();
    });
  });
}

function renderPanel() {
  const panel = WEEKS[ui.week]?.panel;
  const root = main.querySelector("#peak-panel");
  if (!panel || !root) return;
  root.querySelector("#peak-title").textContent = panel.title;
  root.querySelector("#peak-lede").textContent = panel.lede;
  root.querySelector("#peak-predict-title").textContent = panel.predictTitle;
  root.querySelector("#peak-block-title").textContent = panel.blockTitle;
  const blockLink = root.querySelector("#peak-block-link");
  blockLink.href = panel.blockHref;
  const action = root.querySelector("#peak-action");
  action.href = panel.actionHref;
  action.textContent = panel.action;

  root.querySelector("#peak-bars").innerHTML = panel.bars
    .map((bar) => {
      const color = bar.hot ? "#ef4444" : "#dfe3e8";
      return `<div class="flex min-w-0 flex-1 flex-col">
        <span class="flex min-h-0 flex-1 items-end"><span class="block w-full rounded-t-[4px]" style="height:${bar.v}%;background:${color}"></span></span>
        <span class="h-4 text-center text-[10px] leading-4 text-mute">${bar.label}</span>
      </div>`;
    })
    .join("");

  root.querySelector("#peak-predicts").innerHTML = panel.predicts
    .map(
      (line) => `<p class="mt-1.5 flex items-start gap-2 text-sm text-[#3c424a]"><svg viewBox="0 0 24 24" class="line mt-0.5 size-3.5 shrink-0 text-mute"><circle cx="12" cy="12" r="8"></circle><path d="M12 8v4l2.5 2"></path></svg><span>${esc(line)}</span></p>`,
    )
    .join("");

  root.querySelector("#peak-metrics").innerHTML = panel.metrics
    .map((metric) => {
      const hint = metric.tone === "bad" ? "text-hot" : "text-good";
      const num = metric.tone === "bad" ? "text-hot" : "text-ink";
      return `<div class="flex items-end justify-between gap-3 border-t border-line py-3 first:border-t-0">
        <div>
          <p class="text-[28px] font-semibold leading-none ${num}">${esc(metric.n)}</p>
          <p class="mt-1 text-sm text-[#3c424a]">${esc(metric.label)}</p>
        </div>
        <p class="pb-1 text-xs font-medium ${hint}">${esc(metric.hint)}</p>
      </div>`;
    })
    .join("");
}

function renderAssistant() {
  const box = main.querySelector("#assistant");
  if (!box) return;
  if (ui.sede === "sitges") {
    box.innerHTML = `<svg viewBox="0 0 24 24" class="line size-4 shrink-0 text-tide"><path d="M12 3l1.6 4.2L18 9l-4.4 1.8L12 15l-1.6-4.2L6 9l4.4-1.8L12 3Z"></path><path d="M18 14l.7 1.8L20.5 16.5 18.7 17.2 18 19l-.7-1.8L15.5 16.5l1.8-.7L18 14Z"></path></svg>
      <p class="text-sm text-[#24584e]">Asistente · En Sitges está la terraza de Braseria del Port. Las alegaciones vencen el 21 de octubre. <a href="#/expediente/EXP-2026-011" class="font-semibold text-tide">Ver el asunto</a></p>`;
    return;
  }
  box.innerHTML = `<svg viewBox="0 0 24 24" class="line size-4 shrink-0 text-tide"><path d="M12 3l1.6 4.2L18 9l-4.4 1.8L12 15l-1.6-4.2L6 9l4.4-1.8L12 3Z"></path><path d="M18 14l.7 1.8L20.5 16.5 18.7 17.2 18 19l-.7-1.8L15.5 16.5l1.8-.7L18 14Z"></path></svg>
    <p class="text-sm text-[#24584e]">Asistente · Hay 5 asuntos abiertos. La contestación de Nou Transport vence mañana. <a href="#/expediente/EXP-2026-019" class="font-semibold text-tide">Ver el plazo</a></p>`;
}

function syncSpan() {
  main.querySelectorAll("[data-span]").forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.span === ui.span ? "true" : "false");
  });
}

function applyPanel() {
  const home = main.querySelector("#home");
  if (!home) return;
  home.classList.toggle("is-panel-closed", !ui.panelOpen);
  const toggle = main.querySelector("#panel-toggle");
  if (toggle) {
    toggle.setAttribute("aria-expanded", ui.panelOpen ? "true" : "false");
    toggle.setAttribute("aria-label", ui.panelOpen ? "Ocultar el plazo" : "Mostrar el plazo");
  }
}

function bindResumen() {
  const weekSelect = main.querySelector("#week");
  if (weekSelect) weekSelect.value = ui.week;
  syncSpan();
  applyPanel();
  renderAssistant();
  renderHeat();
  renderPanel();

  const setSpan = (span) => {
    ui.span = span;
    if (ui.span === "day") {
      const today = WEEKS[ui.week].days.findIndex((day) => day.today);
      if (today >= 0) ui.day = today;
    }
    syncSpan();
    renderHeat();
    main.querySelectorAll("[data-menu-panel]").forEach((panel) => {
      panel.hidden = true;
    });
  };

  main.querySelectorAll("[data-span]").forEach((button) => {
    button.addEventListener("click", () => setSpan(button.dataset.span));
  });
  main.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => setSpan(button.dataset.jump));
  });

  weekSelect?.addEventListener("change", () => {
    ui.week = weekSelect.value;
    const today = WEEKS[ui.week].days.findIndex((day) => day.today);
    ui.day = today >= 0 ? today : 0;
    renderHeat();
    renderPanel();
  });

  main.querySelector("#panel-toggle")?.addEventListener("click", () => {
    ui.panelOpen = !ui.panelOpen;
    applyPanel();
  });

  main.querySelector("#peak-later")?.addEventListener("click", () => {
    ui.panelOpen = false;
    applyPanel();
  });

  main.querySelectorAll("[data-menu]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const panel = main.querySelector(`[data-menu-panel="${button.dataset.menu}"]`);
      const open = panel.hidden;
      main.querySelectorAll("[data-menu-panel]").forEach((item) => {
        item.hidden = true;
      });
      panel.hidden = !open;
      button.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  main.querySelectorAll("[data-target]").forEach((box) => {
    box.addEventListener("click", () => {
      const on = box.getAttribute("aria-pressed") === "true";
      box.setAttribute("aria-pressed", on ? "false" : "true");
      box.closest("li")?.classList.toggle("is-done", !on);
    });
  });
}

function bindChecks() {
  main.querySelectorAll("[data-check]").forEach((box) => {
    box.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const row = box.closest("[data-row]");
      if (!row) {
        const on = box.getAttribute("aria-pressed") === "true";
        box.setAttribute("aria-pressed", on ? "false" : "true");
        return;
      }
      const selected = row.classList.contains("is-selected");
      main.querySelectorAll("[data-row]").forEach((item) => {
        item.classList.remove("is-selected");
        item.querySelector("[data-check]")?.setAttribute("aria-pressed", "false");
      });
      row.classList.toggle("is-selected", !selected);
      box.setAttribute("aria-pressed", !selected ? "true" : "false");
    });
  });
}

function applyRows(rows, status, q, area) {
  let visible = 0;
  rows.forEach((row) => {
    const okStatus = status === "todos" || row.dataset.status === status;
    const okArea = !area || row.dataset.area === area;
    const okQuery = !q || row.dataset.search.includes(q);
    const show = okStatus && okArea && okQuery;
    row.classList.toggle("hidden", !show);
    if (show) visible += 1;
  });
  const empty = main.querySelector("#result-empty");
  if (empty) empty.hidden = visible !== 0;
  const count = main.querySelector("#result-count");
  if (count) {
    const noun = count.dataset.noun || "asuntos";
    count.textContent = visible === 1 ? `1 ${count.dataset.one || "asunto"}` : `${visible} ${noun}`;
  }
  return visible;
}

function bindExpedientes(route) {
  const q = (route.query.get("q") || "").trim().toLowerCase();
  const status = route.query.get("estado") || "todos";
  const area = route.query.get("area") || "";
  const input = main.querySelector("#q");
  const form = main.querySelector("#list-search");
  if (input) input.value = route.query.get("q") || "";

  main.querySelectorAll("[data-filter]").forEach((chip) => {
    chip.setAttribute("aria-pressed", chip.dataset.filter === status ? "true" : "false");
    chip.addEventListener("click", () => {
      const params = new URLSearchParams(route.query);
      if (chip.dataset.filter === "todos") params.delete("estado");
      else params.set("estado", chip.dataset.filter);
      const query = params.toString();
      location.hash = query ? `#/expedientes?${query}` : "#/expedientes";
    });
  });

  const chip = main.querySelector("#area-chip");
  if (chip) {
    if (AREAS[area]) {
      chip.hidden = false;
      chip.querySelector("span").textContent = AREAS[area];
    } else chip.hidden = true;
  }

  const go = () => {
    const params = new URLSearchParams(route.query);
    const value = input.value.trim();
    if (value) params.set("q", value);
    else params.delete("q");
    const query = params.toString();
    location.hash = query ? `#/expedientes?${query}` : "#/expedientes";
  };

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    go();
  });

  applyRows([...main.querySelectorAll("[data-matter]")], status, q, area);
  bindSheet("matter-sheet");
}

function bindClientes(route) {
  const q = (route.query.get("q") || "").trim().toLowerCase();
  const status = route.query.get("tipo") || "todos";
  const input = main.querySelector("#q");
  const form = main.querySelector("#list-search");
  if (input) input.value = route.query.get("q") || "";

  main.querySelectorAll("[data-filter]").forEach((chip) => {
    chip.setAttribute("aria-pressed", chip.dataset.filter === status ? "true" : "false");
    chip.addEventListener("click", () => {
      const params = new URLSearchParams();
      if (input?.value.trim()) params.set("q", input.value.trim());
      if (chip.dataset.filter !== "todos") params.set("tipo", chip.dataset.filter);
      const query = params.toString();
      location.hash = query ? `#/clientes?${query}` : "#/clientes";
    });
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (status !== "todos") params.set("tipo", status);
    const value = input.value.trim();
    if (value) params.set("q", value);
    const query = params.toString();
    location.hash = query ? `#/clientes?${query}` : "#/clientes";
  });

  applyRows([...main.querySelectorAll("[data-client]")], status, q, "");
  bindSheet("client-sheet");
}

function bindSheet(id) {
  const open = main.querySelector(`[data-open="${id}"]`);
  const sheet = main.querySelector(`#${id}`);
  const close = sheet?.querySelector("[data-close]");
  open?.addEventListener("click", () => {
    sheet.hidden = false;
  });
  close?.addEventListener("click", () => {
    sheet.hidden = true;
  });
  sheet?.querySelector("form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = sheet.querySelector("[data-sheet-note]");
    if (note) {
      note.hidden = false;
      note.textContent = "Anotado en la mesa. No se abre ficha nueva desde aquí.";
    }
  });
  sheet?.addEventListener("click", (event) => {
    if (event.target === sheet) sheet.hidden = true;
  });
}

function bindMatter(id) {
  const matter = window.ALBOR.matters[id];
  const view = main.querySelector("#matter");
  const missing = main.querySelector("#matter-missing");
  if (!matter || !view) {
    if (view) view.hidden = true;
    if (missing) missing.hidden = false;
    return;
  }

  const client = window.ALBOR.clients[matter.clientId];
  document.title = `${id} · Albor`;
  fill(view, { ...matter, id });
  const status = view.querySelector('[data-bind="status"]');
  if (status) status.innerHTML = statusMarkup(matter.status);
  const clientLink = view.querySelector('[data-bind="clientLink"]');
  if (clientLink && client) {
    clientLink.href = `#/cliente/${matter.clientId}`;
    clientLink.textContent = client.name;
  }

  view.querySelector("#timeline").innerHTML = matter.timeline
    .map(
      (item, index) => `
        <li class="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-line py-3.5 text-sm">
          <span class="text-mute">${esc(item.when)}</span>
          <span class="${index === matter.timeline.length - 1 ? "font-medium text-tide" : ""}">${esc(item.label)}</span>
        </li>`,
    )
    .join("");

  view.querySelector("#documents").innerHTML = matter.documents
    .map(
      (doc) => `
        <li class="flex items-center justify-between gap-3 border-t border-line py-3.5 text-sm">
          <span>${esc(doc.name)}</span>
          <span class="shrink-0 text-mute">${esc(doc.meta)}</span>
        </li>`,
    )
    .join("");
}

function bindClient(id) {
  const client = window.ALBOR.clients[id];
  const view = main.querySelector("#client");
  const missing = main.querySelector("#client-missing");
  if (!client || !view) {
    if (view) view.hidden = true;
    if (missing) missing.hidden = false;
    return;
  }

  document.title = `${client.name} · Albor`;
  fill(view, client);
  const mail = view.querySelector('[data-bind="emailLink"]');
  if (mail) {
    mail.href = `mailto:${client.email}`;
    mail.textContent = client.email;
  }

  const matters = Object.entries(window.ALBOR.matters).filter(([, matter]) => matter.clientId === id);
  view.querySelector("#client-matters").innerHTML = matters
    .map(
      ([matterId, matter]) => `
        <a href="#/expediente/${esc(matterId)}" class="grid grid-cols-[9rem_1fr_auto] items-center gap-4 border-t border-line py-3.5 text-sm hover:text-tide">
          <span class="text-mute">${esc(matterId)}</span>
          <span>${esc(matter.title)}</span>
          ${statusMarkup(matter.status)}
        </a>`,
    )
    .join("");
}

function paletteItems(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const items = [];
  Object.entries(window.ALBOR.matters).forEach(([id, matter]) => {
    const clientName = window.ALBOR.clients[matter.clientId]?.name || "";
    const blob = `${id} ${matter.title} ${matter.area} ${matter.lead} ${matter.opponent} ${clientName}`.toLowerCase();
    if (blob.includes(q)) items.push({ href: `#/expediente/${id}`, title: matter.title, meta: `${id} · ${matter.area}` });
  });
  Object.entries(window.ALBOR.clients).forEach(([id, client]) => {
    const blob = `${client.name} ${client.contact} ${client.email} ${client.sector}`.toLowerCase();
    if (blob.includes(q)) items.push({ href: `#/cliente/${id}`, title: client.name, meta: client.sector });
  });
  return items.slice(0, 8);
}

function renderPalette() {
  const items = paletteItems(globalSearch.value);
  if (!globalSearch.value.trim()) {
    palette.hidden = true;
    return;
  }
  palette.hidden = false;
  paletteList.innerHTML = items.length
    ? items
        .map(
          (item) => `<a href="${esc(item.href)}" class="block rounded-lg px-3 py-2 hover:bg-[#f6f7f8]">
            <p class="text-sm font-medium">${esc(item.title)}</p>
            <p class="text-xs text-mute">${esc(item.meta)}</p>
          </a>`,
        )
        .join("")
    : `<p class="px-3 py-3 text-sm text-mute">Nada coincide con esa búsqueda.</p>`;
}

let renderToken = 0;

async function render() {
  const token = ++renderToken;
  const route = parseRoute();
  const file = MODULES[route.name];
  const section = navKey(route.name);
  const area = route.name === "expedientes" ? route.query.get("area") || "" : "";

  document.querySelectorAll("[data-nav]").forEach((link) => {
    const on = !area && link.dataset.nav === section;
    link.classList.toggle("is-active", on);
    if (on) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  document.querySelectorAll("[data-area-link]").forEach((link) => {
    const on = link.dataset.areaLink === area && area !== "";
    link.classList.toggle("is-active", on);
    if (on) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  closeFloaters();
  document.title = `${NAV[section] || "Albor"} · Albor`;

  if (!file) {
    main.innerHTML =
      '<div class="p-8"><p class="text-lg font-semibold">Esa pantalla no existe.</p><a class="mt-3 inline-block text-sm font-medium text-tide" href="#/resumen">Volver al inicio</a></div>';
    return;
  }

  try {
    const response = await fetch(file);
    if (token !== renderToken) return;
    if (!response.ok) throw new Error(String(response.status));
    main.innerHTML = await response.text();
  } catch {
    if (token !== renderToken) return;
    main.innerHTML =
      '<div class="p-8"><p class="text-lg font-semibold">No se ha podido abrir el módulo.</p><p class="mt-2 text-sm text-mute">Sirve la carpeta con un servidor local.</p></div>';
    return;
  }

  if (token !== renderToken) return;
  hydrate(route);
}

function hydrate(route) {
  if (route.name === "resumen") bindResumen();
  if (route.name === "expedientes") bindExpedientes(route);
  if (route.name === "clientes") bindClientes(route);
  if (route.name === "expediente") bindMatter(route.param);
  if (route.name === "cliente") bindClient(route.param);
  bindChecks();
}

function toggleLayer(panel, toggle) {
  const open = panel.hidden;
  closeFloaters();
  panel.hidden = !open;
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
}

document.querySelector("#sidebar-toggle").addEventListener("click", () => {
  ui.compact = !ui.compact;
  sidebar.classList.toggle("is-compact", ui.compact);
  document.querySelector("#sidebar-toggle").setAttribute("aria-pressed", ui.compact ? "true" : "false");
});

noticeToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleLayer(noticePanel, noticeToggle);
});

sedeToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleLayer(sedePanel, sedeToggle);
});

sedePanel.querySelectorAll("[data-sede]").forEach((button) => {
  button.addEventListener("click", () => {
    ui.sede = button.dataset.sede;
    sedeLabel.textContent = ui.sede === "sitges" ? "Sitges" : "Barcelona";
    closeLayer(sedePanel, sedeToggle);
    renderAssistant();
  });
});

inviteToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleLayer(invitePanel, inviteToggle);
});

tutorialsToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleLayer(tutorialsPanel, tutorialsToggle);
});

document.querySelector("#invite-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.querySelector("#invite-email").value.trim();
  const note = document.querySelector("#invite-note");
  note.hidden = false;
  note.textContent = `Invitación anotada para ${email}. Laia la verá con las provisiones.`;
  event.currentTarget.hidden = true;
});

globalSearch.addEventListener("input", renderPalette);
globalSearch.addEventListener("focus", renderPalette);
globalSearch.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const first = paletteList.querySelector("a");
    if (first) location.hash = first.getAttribute("href");
  }
  if (event.key === "Escape") palette.hidden = true;
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    globalSearch.focus();
    globalSearch.select();
  }
});

document.addEventListener("click", (event) => {
  if (!noticePanel.hidden && !noticePanel.contains(event.target) && !noticeToggle.contains(event.target)) closeLayer(noticePanel, noticeToggle);
  if (!sedePanel.hidden && !sedePanel.contains(event.target) && !sedeToggle.contains(event.target)) closeLayer(sedePanel, sedeToggle);
  if (!invitePanel.hidden && !invitePanel.contains(event.target) && !inviteToggle.contains(event.target)) closeLayer(invitePanel, inviteToggle);
  if (!tutorialsPanel.hidden && !tutorialsPanel.contains(event.target) && !tutorialsToggle.contains(event.target)) closeLayer(tutorialsPanel, tutorialsToggle);
  if (!palette.hidden && !palette.contains(event.target) && event.target !== globalSearch) palette.hidden = true;
  if (!event.target.closest("[data-menu]") && !event.target.closest("[data-menu-panel]")) {
    main.querySelectorAll("[data-menu-panel]").forEach((panel) => {
      panel.hidden = true;
    });
  }
});

window.addEventListener("hashchange", render);
if (!location.hash) location.replace("#/resumen");
else render();
