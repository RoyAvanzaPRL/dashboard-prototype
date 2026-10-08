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

const COPY = {
  expedientes: {
    "": { h: "Todos", d: "Seis asuntos en la mesa. La contestación de Nou Transport vence mañana." },
    mercantil: { h: "Mercantil", d: "La vista preliminar de Mora & Hijos es el 14 de octubre, a las 11:30." },
    laboral: { h: "Laboral", d: "La contestación del despido colectivo vence mañana a las 13:00." },
    civil: { h: "Civil", d: "Helvetia espera la lectura del peritaje. La clínica ya está cerrada." },
    familia: { h: "Familia", d: "Clara envía la propuesta de inventario el viernes 16." },
    contencioso: { h: "Contencioso", d: "Las alegaciones de la terraza de Sitges vencen el 21 de octubre." },
    cerrado: { h: "Cerrados", d: "La mutua consignó el principal. Las costas las lleva el procurador." },
  },
  clientes: {
    "": { h: "Todos", d: "Seis clientes con asunto en la mesa." },
    empresa: { h: "Empresas", d: "Mora, Nou Transport, la brasería y la clínica." },
    particular: { h: "Particulares", d: "Elena Vives lleva la liquidación de gananciales." },
    aseguradora: { h: "Aseguradoras", d: "Helvetia encargó la defensa del arquitecto." },
  },
  agenda: {
    "": { h: "Semana", d: "De hoy al 21 de octubre. Vistas, vencimientos y reuniones." },
    vista: { h: "Vistas", d: "Una vista señalada: Mora & Hijos, mercantil n.º 7, el día 14." },
    vencimiento: { h: "Vencimientos", d: "Cuatro plazos. El primero es mañana a las 13:00." },
    reunion: { h: "Reuniones", d: "Hoy hay dos: la estrategia con Jordi y la llamada con Olga." },
  },
  documentos: {
    "": { h: "Recientes", d: "Lo último que ha entrado en la mesa." },
    escrito: { h: "Escritos", d: "Contestación, memoria del ERE y el auto de admisión." },
    prueba: { h: "Prueba", d: "Peritaje, tasación de Sant Gervasi y el plano de la terraza." },
    archivo: { h: "Archivo", d: "Expediente administrativo, póliza y la sentencia de la clínica." },
  },
  equipo: {
    "": { h: "Todos", d: "Quién lleva qué, esta mañana." },
    socio: { h: "Socios", d: "Jordi en mercantil. Marina tiene la contestación y el peritaje." },
    asociado: { h: "Asociados", d: "Clara cierra el inventario. Adrià vuelve a las 16." },
    mesa: { h: "Mesa", d: "Laia lleva provisiones y señalamientos." },
  },
};

const STATUS = {
  abierto: { label: "Abierto", cls: "pill pill-open" },
  urgente: { label: "Urgente", cls: "pill pill-hot" },
  cerrado: { label: "Cerrado", cls: "pill pill-shut" },
};

const AREA_KEY = {
  Mercantil: "mercantil",
  Laboral: "laboral",
  Civil: "civil",
  Familia: "familia",
  Contencioso: "contencioso",
};

const PIN_META = {
  "EXP-2026-019": { letter: "N", name: "Nou Transport", color: "#e07a2f" },
  "EXP-2026-014": { letter: "M", name: "Mora & Hijos", color: "#3b6fd8" },
  "EXP-2026-003": { letter: "H", name: "Helvetia", color: "#0f9f8f" },
  "EXP-2025-088": { letter: "E", name: "Elena Vives", color: "#7c5cfc" },
  "EXP-2026-011": { letter: "B", name: "Braseria", color: "#178a4c" },
  "EXP-2025-072": { letter: "L", name: "Clínica Llevant", color: "#d4537e" },
};

const ui = {
  noticeOpen: true,
  noticeFilter: "all",
  readAll: false,
  banner: true,
  sede: "barcelona",
  pins: ["EXP-2026-019", "EXP-2026-014", "EXP-2026-003"],
};

const main = document.querySelector("#main");
const noticePanel = document.querySelector("#notice-panel");
const noticeToggle = document.querySelector("#notice-toggle");
const scrim = document.querySelector("#scrim");
const pinPanel = document.querySelector("#pin-panel");
const pinToggle = document.querySelector("#pin-toggle");
const helpPanel = document.querySelector("#help-panel");
const helpToggle = document.querySelector("#help-toggle");
const searchPanel = document.querySelector("#search-panel");
const searchToggle = document.querySelector("#search-toggle");
const searchInput = document.querySelector("#q-global");
const searchList = document.querySelector("#search-list");
const sedePanel = document.querySelector("#sede-panel");
const sedeToggle = document.querySelector("#sede-toggle");
const userPanel = document.querySelector("#user-panel");
const userToggle = document.querySelector("#user-toggle");
const draftDialog = document.querySelector("#draft-dialog");

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

function sectionOf(route) {
  if (route.name === "expediente") return "expedientes";
  if (route.name === "cliente") return "clientes";
  if (route.name === "resumen") return "inicio";
  return route.name;
}

function subKey(route) {
  if (route.name === "resumen") return route.query.get("vista") || "";
  if (route.name === "expedientes") {
    if (route.query.get("estado") === "cerrado") return "cerrado";
    return route.query.get("area") || "";
  }
  if (route.name === "expediente") {
    const matter = window.FOLIO.matters[route.param];
    return matter ? AREA_KEY[matter.area] || "" : "";
  }
  if (route.name === "clientes") return route.query.get("tipo") || "";
  if (route.name === "cliente") return window.FOLIO.clients[route.param]?.type || "";
  if (route.name === "agenda") return route.query.get("tipo") || "";
  if (route.name === "documentos") return route.query.get("tipo") || "";
  if (route.name === "equipo") return route.query.get("rol") || "";
  return "";
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function setGroupOpen(id, open) {
  const group = document.querySelector(`[data-group="${id}"]`);
  if (!group) return;
  group.classList.toggle("is-open", open);
  const sub = group.querySelector(".nav-sub");
  if (sub) sub.hidden = !open;
  const toggle = group.querySelector("[data-toggle]");
  if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
}

function syncNav(route) {
  const section = sectionOf(route);
  const sub = subKey(route);
  document.querySelectorAll("[data-group-link]").forEach((link) => {
    link.classList.toggle("is-section", link.dataset.groupLink === section);
  });
  document.querySelectorAll("[data-subnav]").forEach((link) => {
    const on = link.dataset.subnav === section && link.dataset.subkey === sub;
    link.classList.toggle("is-active", on);
    if (on) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  if (section) setGroupOpen(section, true);
  document.querySelectorAll("[data-pin]").forEach((link) => {
    const on = route.name === "expediente" && route.param === link.dataset.pin;
    link.classList.toggle("is-active", on);
    if (on) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function closeLayer(panel, toggle) {
  if (!panel || !toggle) return;
  panel.hidden = true;
  toggle.setAttribute("aria-expanded", "false");
}

function closePopovers() {
  closeLayer(pinPanel, pinToggle);
  closeLayer(helpPanel, helpToggle);
  closeLayer(searchPanel, searchToggle);
  closeLayer(sedePanel, sedeToggle);
  closeLayer(userPanel, userToggle);
}

function openNotice() {
  closePopovers();
  ui.noticeOpen = true;
  noticePanel.hidden = false;
  scrim.hidden = false;
  noticeToggle.setAttribute("aria-expanded", "true");
  noticeToggle.classList.add("is-open-panel");
  document.querySelector('[data-group="avisos"]').classList.add("is-panel");
  setGroupOpen("avisos", true);
  renderNotices();
}

function closeNotice() {
  ui.noticeOpen = false;
  noticePanel.hidden = true;
  scrim.hidden = true;
  noticeToggle.setAttribute("aria-expanded", "false");
  noticeToggle.classList.remove("is-open-panel");
  document.querySelector('[data-group="avisos"]').classList.remove("is-panel");
  renderNotices();
}

function closeFloaters() {
  closeNotice();
  closePopovers();
  draftDialog.hidden = true;
}

function renderNotices() {
  const notices = window.FOLIO.notices;
  const unreadLeft = ui.readAll ? 0 : notices.filter((item) => item.unread).length;
  const badge = document.querySelector("#notice-badge");
  badge.hidden = unreadLeft === 0;
  badge.textContent = String(unreadLeft);
  document.querySelector("#unread-count").textContent = String(unreadLeft);
  document.querySelector("#notice-all-label").textContent = `Todas (${notices.length})`;

  document.querySelectorAll("[data-notice-filter]").forEach((button) => {
    const on = ui.noticeOpen && button.dataset.noticeFilter === ui.noticeFilter;
    button.classList.toggle("is-active", on);
    button.setAttribute("aria-pressed", on ? "true" : "false");
  });

  let items = notices;
  if (ui.noticeFilter === "unread") items = notices.filter((item) => item.unread && !ui.readAll);
  if (ui.noticeFilter === "plazo") items = notices.filter((item) => item.kind === "plazo");

  const list = document.querySelector("#notice-list");
  if (!items.length) {
    list.innerHTML = `<p class="px-3 py-8 text-sm text-mute">No quedan avisos en esta vista.</p>`;
    return;
  }

  const groups = [];
  items.forEach((item) => {
    let group = groups.find((entry) => entry.label === item.group);
    if (!group) {
      group = { label: item.group, items: [] };
      groups.push(group);
    }
    group.items.push(item);
  });

  list.innerHTML = groups
    .map((group) => {
      const head = group.label === "Hoy" ? "" : `<p class="px-2 pb-1 pt-4 text-xs text-[#9aa1ab]">${esc(group.label)}</p>`;
      const rows = group.items
        .map((item) => {
          const dot = item.unread && !ui.readAll ? `<span class="mt-1.5 size-2 shrink-0 rounded-full bg-[#ff3b5c]"></span>` : `<span class="size-2 shrink-0"></span>`;
          return `<a href="${esc(item.href)}" class="flex items-start gap-3 rounded-xl px-2 py-3 hover:bg-[#f6f7f8]">
            <span class="grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white" style="background:${esc(item.color)}">${esc(item.letter)}</span>
            <span class="min-w-0 flex-1">
              <span class="block truncate text-sm"><span class="font-semibold">${esc(item.name)}</span> ${esc(item.action)}</span>
              <span class="mt-0.5 block text-xs text-mute">${esc(item.time)}</span>
            </span>
            ${dot}
          </a>`;
        })
        .join("");
      return head + rows;
    })
    .join("");
}

function renderPins() {
  const route = parseRoute();
  document.querySelector("#pins-label").textContent = `MIS ASUNTOS (${ui.pins.length})`;
  document.querySelector("#pins").innerHTML = ui.pins
    .map((id) => {
      const pin = PIN_META[id];
      const on = route.name === "expediente" && route.param === id;
      return `<a href="#/expediente/${id}" data-pin="${id}" class="pin-link${on ? " is-active" : ""}"${on ? ' aria-current="page"' : ""}>
        <span class="pin-mark" style="background:${pin.color}">${pin.letter}</span>
        <span class="truncate">${esc(pin.name)}</span>
      </a>`;
    })
    .join("");

  const rest = Object.keys(PIN_META).filter((id) => !ui.pins.includes(id));
  pinPanel.innerHTML = rest.length
    ? rest
        .map(
          (id) => `<button type="button" data-add-pin="${id}" class="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm hover:bg-[#f6f7f8]">
            <span class="pin-mark" style="background:${PIN_META[id].color}">${PIN_META[id].letter}</span>
            <span>${esc(PIN_META[id].name)}</span>
          </button>`,
        )
        .join("")
    : `<p class="px-2 py-2 text-sm text-mute">La mesa ya tiene los seis asuntos.</p>`;

  pinPanel.querySelectorAll("[data-add-pin]").forEach((button) => {
    button.addEventListener("click", () => {
      ui.pins.push(button.dataset.addPin);
      renderPins();
      closeLayer(pinPanel, pinToggle);
    });
  });
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
  return `<span class="${item.cls}">${item.label}</span>`;
}

function applyCopy(section, sub) {
  const copy = COPY[section]?.[sub] || COPY[section]?.[""];
  if (!copy) return;
  const heading = main.querySelector("#heading");
  const lede = main.querySelector("#lede");
  if (heading) heading.textContent = copy.h;
  if (lede) lede.textContent = copy.d;
  document.title = `${copy.h} · Albor`;
}

function bindFilter(route, base, match) {
  const q = (route.query.get("q") || "").trim().toLowerCase();
  const input = main.querySelector("#q");
  const form = main.querySelector("#list-search");
  if (input) input.value = route.query.get("q") || "";
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const params = new URLSearchParams(route.query);
    const value = input.value.trim();
    if (value) params.set("q", value);
    else params.delete("q");
    const query = params.toString();
    location.hash = query ? `#/${base}?${query}` : `#/${base}`;
  });

  let visible = 0;
  main.querySelectorAll("[data-row]").forEach((row) => {
    const show = match(row) && (!q || (row.dataset.search || "").includes(q));
    row.classList.toggle("hidden", !show);
    if (show) visible += 1;
  });
  const empty = main.querySelector("#result-empty");
  if (empty) empty.hidden = visible !== 0;
  const count = main.querySelector("#result-count");
  if (count) {
    const noun = visible === 1 ? count.dataset.one : count.dataset.noun;
    count.textContent = `${visible} ${noun}`;
  }
}

function applyHero() {
  const title = main.querySelector("#hero-title");
  if (!title) return;
  const lede = main.querySelector("#hero-lede");
  const action = main.querySelector("#hero-action");
  if (ui.sede === "sitges") {
    title.textContent = "La terraza de Sitges vence el 21 de octubre";
    lede.textContent = "Joana Vidal quiere saber si cabe una cautelar. Adrià presenta las alegaciones el miércoles.";
    action.href = "#/expediente/EXP-2026-011";
    action.textContent = "Abrir la terraza";
    return;
  }
  title.textContent = "La contestación de Nou Transport vence mañana";
  lede.textContent = "Ricard Puig tiene que verla antes de las 11:00. El consejo se reúne a mediodía.";
  action.href = "#/expediente/EXP-2026-019";
  action.textContent = "Abrir el plazo";
}

function bindResumen(route) {
  const plazos = route.query.get("vista") === "plazos";
  main.querySelector('[data-pane="mesa"]').hidden = plazos;
  main.querySelector('[data-pane="plazos"]').hidden = !plazos;
  document.title = plazos ? "Plazos · Albor" : "Mesa · Albor";
  applyHero();
  const hero = main.querySelector("#hero");
  if (hero && !ui.banner) hero.hidden = true;
  main.querySelector("#hero-hide")?.addEventListener("click", () => {
    ui.banner = false;
    hero.hidden = true;
  });
}

function bindMatter(id) {
  const matter = window.FOLIO.matters[id];
  const view = main.querySelector("#matter");
  const missing = main.querySelector("#matter-missing");
  if (!matter || !view) {
    if (view) view.hidden = true;
    if (missing) missing.hidden = false;
    return;
  }
  const client = window.FOLIO.clients[matter.clientId];
  document.title = `${matter.title} · Albor`;
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
          <span class="${index === matter.timeline.length - 1 ? "font-semibold text-brand" : ""}">${esc(item.label)}</span>
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
  const client = window.FOLIO.clients[id];
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
  const matters = Object.entries(window.FOLIO.matters).filter(([, matter]) => matter.clientId === id);
  view.querySelector("#client-matters").innerHTML = matters
    .map(
      ([matterId, matter]) => `
        <a href="#/expediente/${esc(matterId)}" class="flex items-center justify-between gap-4 border-t border-line px-4 py-3.5 text-sm first:border-t-0 hover:bg-[#fafafa]">
          <span>
            <span class="block font-medium">${esc(matter.title)}</span>
            <span class="text-xs text-mute">${esc(matterId)}</span>
          </span>
          ${statusMarkup(matter.status)}
        </a>`,
    )
    .join("");
}

function renderPalette() {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) {
    searchList.innerHTML = `<p class="px-2 py-3 text-sm text-mute">Escribe un asunto o un cliente.</p>`;
    return;
  }
  const items = [];
  Object.entries(window.FOLIO.matters).forEach(([id, matter]) => {
    const clientName = window.FOLIO.clients[matter.clientId]?.name || "";
    const blob = `${id} ${matter.title} ${matter.area} ${matter.lead} ${matter.opponent} ${clientName}`.toLowerCase();
    if (blob.includes(q)) items.push({ href: `#/expediente/${id}`, title: matter.title, meta: `${id} · ${matter.area}` });
  });
  Object.entries(window.FOLIO.clients).forEach(([id, client]) => {
    const blob = `${client.name} ${client.contact} ${client.email} ${client.sector}`.toLowerCase();
    if (blob.includes(q)) items.push({ href: `#/cliente/${id}`, title: client.name, meta: client.sector });
  });
  searchList.innerHTML = items.length
    ? items
        .slice(0, 8)
        .map(
          (item) => `<a href="${esc(item.href)}" class="block rounded-lg px-2 py-2 hover:bg-[#f6f7f8]">
            <p class="text-sm font-medium">${esc(item.title)}</p>
            <p class="text-xs text-mute">${esc(item.meta)}</p>
          </a>`,
        )
        .join("")
    : `<p class="px-2 py-3 text-sm text-mute">Nada coincide con esa búsqueda.</p>`;
}

function fillDrafts() {
  const select = document.querySelector("#draft-matter");
  select.innerHTML = Object.entries(window.FOLIO.matters)
    .map(([id, matter]) => `<option value="${esc(id)}">${esc(matter.title)}</option>`)
    .join("");
}

function togglePopover(panel, toggle) {
  const open = panel.hidden;
  closePopovers();
  if (ui.noticeOpen) closeNotice();
  panel.hidden = !open;
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
  return open;
}

let renderToken = 0;
let booted = false;

async function render() {
  const token = ++renderToken;
  const route = parseRoute();
  const file = MODULES[route.name];
  if (booted) closeFloaters();
  booted = true;
  syncNav(route);
  renderPins();

  if (!file) {
    document.title = "Albor";
    main.innerHTML = '<div class="p-8"><p class="text-lg font-semibold">Esa pantalla no existe.</p><a class="mt-3 inline-block text-sm font-semibold text-brand" href="#/resumen">Volver a la mesa</a></div>';
    return;
  }

  try {
    const response = await fetch(file);
    if (token !== renderToken) return;
    if (!response.ok) throw new Error(String(response.status));
    main.innerHTML = await response.text();
  } catch {
    if (token !== renderToken) return;
    main.innerHTML = '<div class="p-8"><p class="text-lg font-semibold">No se ha podido abrir el módulo.</p><p class="mt-2 text-sm text-mute">Sirve la carpeta con un servidor local.</p></div>';
    return;
  }

  if (token !== renderToken) return;
  hydrate(route);
}

function hydrate(route) {
  const section = sectionOf(route);
  const sub = subKey(route);
  if (route.name === "resumen") bindResumen(route);
  if (route.name === "expedientes") {
    applyCopy("expedientes", sub);
    const cerrado = route.query.get("estado") === "cerrado";
    const area = route.query.get("area") || "";
    bindFilter(route, "expedientes", (row) => {
      if (cerrado) return row.dataset.status === "cerrado";
      if (area) return row.dataset.area === area;
      return true;
    });
  }
  if (route.name === "clientes") {
    applyCopy("clientes", sub);
    const tipo = route.query.get("tipo") || "";
    bindFilter(route, "clientes", (row) => !tipo || row.dataset.tipo === tipo);
  }
  if (route.name === "agenda") {
    applyCopy("agenda", sub);
    const tipo = route.query.get("tipo") || "";
    bindFilter(route, "agenda", (row) => !tipo || row.dataset.kind === tipo);
  }
  if (route.name === "documentos") {
    applyCopy("documentos", sub);
    const tipo = route.query.get("tipo") || "";
    bindFilter(route, "documentos", (row) => !tipo || row.dataset.kind === tipo);
  }
  if (route.name === "equipo") {
    applyCopy("equipo", sub);
    const rol = route.query.get("rol") || "";
    bindFilter(route, "equipo", (row) => !rol || row.dataset.rol === rol);
  }
  if (route.name === "expediente") bindMatter(route.param);
  if (route.name === "cliente") bindClient(route.param);
  if (!COPY[section] && route.name !== "resumen" && route.name !== "expediente" && route.name !== "cliente") {
    document.title = "Albor";
  }
}

document.querySelectorAll("[data-group-link]").forEach((link) => {
  link.addEventListener("click", () => setGroupOpen(link.dataset.groupLink, true));
});

document.querySelectorAll("[data-toggle]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const id = button.dataset.toggle;
    const group = document.querySelector(`[data-group="${id}"]`);
    const open = !group.classList.contains("is-open");
    setGroupOpen(id, open);
    if (id === "avisos") {
      if (open) openNotice();
      else closeNotice();
    }
  });
});

noticeToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  if (ui.noticeOpen) closeNotice();
  else openNotice();
});

document.querySelector("#notice-close").addEventListener("click", closeNotice);
scrim.addEventListener("click", closeNotice);

document.querySelectorAll("[data-notice-filter]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    ui.noticeFilter = button.dataset.noticeFilter;
    openNotice();
  });
});

document.querySelector("#mark-read").addEventListener("click", () => {
  ui.readAll = true;
  renderNotices();
});

pinToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  togglePopover(pinPanel, pinToggle);
});

helpToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  togglePopover(helpPanel, helpToggle);
});

searchToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  const opened = togglePopover(searchPanel, searchToggle);
  if (opened) {
    renderPalette();
    searchInput.focus();
  }
});

searchInput.addEventListener("input", renderPalette);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const first = searchList.querySelector("a");
    if (first) location.hash = first.getAttribute("href");
  }
});

sedeToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  togglePopover(sedePanel, sedeToggle);
});

sedePanel.querySelectorAll("[data-sede]").forEach((button) => {
  button.addEventListener("click", () => {
    ui.sede = button.dataset.sede;
    sedePanel.querySelectorAll("[data-sede]").forEach((item) => {
      const on = item.dataset.sede === ui.sede;
      item.setAttribute("aria-pressed", on ? "true" : "false");
      item.querySelector(".sede-mark").hidden = !on;
    });
    closeLayer(sedePanel, sedeToggle);
    applyHero();
  });
});

userToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  togglePopover(userPanel, userToggle);
});

document.querySelector("#draft-open").addEventListener("click", (event) => {
  event.stopPropagation();
  closePopovers();
  if (ui.noticeOpen) closeNotice();
  document.querySelector("#draft-done").hidden = true;
  document.querySelector("#draft-note").hidden = false;
  document.querySelector("#draft-submit").hidden = false;
  draftDialog.hidden = false;
});

document.querySelector("#draft-cancel").addEventListener("click", () => {
  draftDialog.hidden = true;
});

draftDialog.addEventListener("click", (event) => {
  if (event.target === draftDialog) draftDialog.hidden = true;
});

document.querySelector("#draft-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const matter = window.FOLIO.matters[document.querySelector("#draft-matter").value];
  const note = document.querySelector("#draft-note");
  const done = document.querySelector("#draft-done");
  done.hidden = false;
  done.textContent = `Anotado en ${matter.title}. Laia lo verá con las provisiones.`;
  note.value = "";
  note.hidden = true;
  document.querySelector("#draft-submit").hidden = true;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeFloaters();
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    closePopovers();
    if (ui.noticeOpen) closeNotice();
    searchPanel.hidden = false;
    searchToggle.setAttribute("aria-expanded", "true");
    renderPalette();
    searchInput.focus();
    searchInput.select();
  }
});

document.addEventListener("click", (event) => {
  if (!pinPanel.hidden && !pinPanel.contains(event.target) && !pinToggle.contains(event.target)) closeLayer(pinPanel, pinToggle);
  if (!helpPanel.hidden && !helpPanel.contains(event.target) && !helpToggle.contains(event.target)) closeLayer(helpPanel, helpToggle);
  if (!searchPanel.hidden && !searchPanel.contains(event.target) && !searchToggle.contains(event.target)) closeLayer(searchPanel, searchToggle);
  if (!sedePanel.hidden && !sedePanel.contains(event.target) && !sedeToggle.contains(event.target)) closeLayer(sedePanel, sedeToggle);
  if (!userPanel.hidden && !userPanel.contains(event.target) && !userToggle.contains(event.target)) closeLayer(userPanel, userToggle);
});

fillDrafts();
renderPins();
renderNotices();

window.addEventListener("hashchange", render);
if (!location.hash) location.replace("#/resumen");
else render();
