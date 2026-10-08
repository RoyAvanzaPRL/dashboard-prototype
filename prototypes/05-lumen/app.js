const MODULES = {
  resumen: "modules/resumen.html",
  expedientes: "modules/expedientes.html",
  clientes: "modules/clientes.html",
  agenda: "modules/agenda.html",
  documentos: "modules/documentos.html",
  equipo: "modules/equipo.html",
  avisos: "modules/avisos.html",
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
  avisos: {
    "": { h: "Todas", d: "Lo que ha pasado en la mesa, de hoy hacia atrás." },
    unread: { h: "Sin leer", d: "Lo que todavía no se ha abierto." },
    plazo: { h: "Plazos", d: "Avisos que mueven una fecha." },
  },
};

const AREA_KEY = {
  Mercantil: "mercantil",
  Laboral: "laboral",
  Civil: "civil",
  Familia: "familia",
  Contencioso: "contencioso",
};

const TONE = {
  "EXP-2026-019": "dusk",
  "EXP-2026-014": "royal",
  "EXP-2025-088": "night",
  "EXP-2026-011": "grove",
  "EXP-2026-003": "tide",
  "EXP-2025-072": "sand",
};

const CLIENT_TONE = {
  nou: "dusk",
  mora: "royal",
  elena: "night",
  braseria: "grove",
  helvetia: "tide",
  llevant: "sand",
};

const SHORT = {
  nou: "Nou Transport",
  mora: "Mora & Hijos",
  elena: "Elena Vives",
  braseria: "Braseria",
  helvetia: "Helvetia",
  llevant: "Clínica Llevant",
};

const DOC_TONES = ["poster", "dusk", "night", "royal", "grove", "tide", "sand"];

const ui = {
  sede: "barcelona",
  narrow: false,
  readAll: false,
  notes: {},
  promptHidden: {},
};

const main = document.querySelector("#main");
const helpPanel = document.querySelector("#help-panel");
const helpToggle = document.querySelector("#help-toggle");
const searchPanel = document.querySelector("#search-panel");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#q-global");
const searchList = document.querySelector("#search-list");
const sedePanel = document.querySelector("#sede-panel");
const sedeToggle = document.querySelector("#sede-toggle");
const userPanel = document.querySelector("#user-panel");
const userToggle = document.querySelector("#user-toggle");
const draftDialog = document.querySelector("#draft-dialog");
const draftNote = document.querySelector("#draft-note");
const draftDone = document.querySelector("#draft-done");
const draftSubmit = document.querySelector("#draft-submit");
const collapse = document.querySelector("#collapse");

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
    const matter = window.LUMEN.matters[route.param];
    return matter ? AREA_KEY[matter.area] || "" : "";
  }
  if (route.name === "clientes") return route.query.get("tipo") || "";
  if (route.name === "cliente") return window.LUMEN.clients[route.param]?.type || "";
  if (route.name === "agenda") return route.query.get("tipo") || "";
  if (route.name === "documentos") return route.query.get("tipo") || "";
  if (route.name === "equipo") return route.query.get("rol") || "";
  if (route.name === "avisos") return route.query.get("vista") || "";
  return "";
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function norm(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function art(tone, label) {
  if (tone === "poster") {
    return `<span class="art art-poster" aria-hidden="true"><b>${esc(label || "Doc")}</b></span>`;
  }
  const glyph = label ? `<b class="art-glyph">${esc(label)}</b>` : "";
  return `<span class="art art-${esc(tone)}" aria-hidden="true"><i></i><i></i><i></i><i></i>${glyph}</span>`;
}

function tile(href, caption, tone, flag) {
  const badge = flag ? `<span class="flag${flag === "Cerrado" ? " flag-mute" : ""}">${esc(flag)}</span>` : "";
  return `<a class="tile" href="${esc(href)}">${art(tone)}${badge}<span class="tile-cap">${esc(caption)}</span></a>`;
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
  document.querySelectorAll(".nav-group").forEach((group) => {
    group.classList.toggle("is-current", group.dataset.group === section);
  });
  document.querySelectorAll("[data-subnav]").forEach((link) => {
    const on = link.dataset.subnav === section && link.dataset.subkey === sub;
    link.classList.toggle("is-active", on);
    if (on) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  if (section) setGroupOpen(section, true);
  document.querySelector(".sub-link.is-active")?.scrollIntoView({ block: "nearest" });
}

function closeLayer(panel, toggle) {
  if (!panel || !toggle) return;
  panel.hidden = true;
  toggle.setAttribute("aria-expanded", "false");
}

function closeSearch() {
  searchPanel.hidden = true;
  searchInput.setAttribute("aria-expanded", "false");
}

function closePopovers() {
  closeLayer(helpPanel, helpToggle);
  closeLayer(sedePanel, sedeToggle);
  closeLayer(userPanel, userToggle);
  closeSearch();
}

function togglePopover(panel, toggle) {
  const willOpen = panel.hidden;
  closePopovers();
  draftDialog.hidden = true;
  if (!willOpen) return;
  panel.hidden = false;
  toggle.setAttribute("aria-expanded", "true");
}

function syncBadge() {
  const unread = ui.readAll ? 0 : window.LUMEN.notices.filter((item) => item.unread).length;
  const badge = document.querySelector("#notice-badge");
  badge.hidden = unread === 0;
  badge.textContent = String(unread);
  const count = document.querySelector("#unread-count");
  if (count) count.textContent = String(unread);
}

function renderSearch() {
  const q = norm(searchInput.value.trim());
  if (!q) {
    searchList.innerHTML = `
      <a href="#/expediente/EXP-2026-019"><p class="hit-title">Contestación de Nou Transport</p><p class="hit-meta">Vence mañana · 13:00</p></a>
      <a href="#/expediente/EXP-2026-014"><p class="hit-title">Vista de Mora &amp; Hijos</p><p class="hit-meta">Mercantil n.º 7 · 14 oct</p></a>
      <a href="#/resumen?vista=plazos"><p class="hit-title">Plazos de la semana</p><p class="hit-meta">Cinco señalamientos</p></a>`;
    return;
  }
  const items = [];
  Object.entries(window.LUMEN.matters).forEach(([id, matter]) => {
    const clientName = window.LUMEN.clients[matter.clientId]?.name || "";
    const blob = norm(`${id} ${matter.title} ${matter.area} ${matter.lead} ${matter.opponent} ${clientName}`);
    if (blob.includes(q)) items.push({ href: `#/expediente/${id}`, title: matter.title, meta: `${id} · ${matter.area}` });
  });
  Object.entries(window.LUMEN.clients).forEach(([id, client]) => {
    const blob = norm(`${client.name} ${client.contact} ${client.email} ${client.sector}`);
    if (blob.includes(q)) items.push({ href: `#/cliente/${id}`, title: client.name, meta: client.sector });
  });
  searchList.innerHTML = items.length
    ? items
        .slice(0, 8)
        .map(
          (item) => `<a href="${esc(item.href)}"><p class="hit-title">${esc(item.title)}</p><p class="hit-meta">${esc(item.meta)}</p></a>`,
        )
        .join("")
    : `<p class="hit-meta" style="padding:10px">Nada coincide con esa búsqueda.</p>`;
}

function openSearch() {
  searchPanel.hidden = false;
  searchInput.setAttribute("aria-expanded", "true");
  renderSearch();
}

function renderNotices(filter) {
  syncBadge();
  const list = main.querySelector("#notice-list");
  if (!list) return;
  let items = window.LUMEN.notices;
  if (filter === "unread") items = items.filter((item) => item.unread && !ui.readAll);
  if (filter === "plazo") items = items.filter((item) => item.kind === "plazo");
  if (!items.length) {
    list.innerHTML = `<p class="lede">No quedan avisos en esta vista.</p>`;
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
      const head = `<p class="notice-group">${esc(group.label)}</p>`;
      const rows = group.items
        .map((item) => {
          const dot = item.unread && !ui.readAll ? `<span class="unread-dot"></span>` : "";
          return `<a class="notice" href="${esc(item.href)}">
            <span class="bubble" style="background:${esc(item.color)}">${esc(item.letter)}</span>
            <span>
              <span class="notice-line"><b>${esc(item.name)}</b> ${esc(item.action)}</span>
              <span class="notice-time">${esc(item.time)}</span>
            </span>
            ${dot}
          </a>`;
        })
        .join("");
      return head + rows;
    })
    .join("");
}

function fill(root, record) {
  root.querySelectorAll("[data-bind]").forEach((node) => {
    const key = node.dataset.bind;
    if (key === "clientLink" || key === "emailLink") return;
    node.textContent = record[key] ?? "";
  });
}

function applyCopy(section, sub) {
  const copy = COPY[section]?.[sub] || COPY[section]?.[""];
  if (!copy) return;
  const heading = main.querySelector("#heading");
  const lede = main.querySelector("#lede");
  if (heading) heading.textContent = copy.h;
  if (lede) lede.textContent = copy.d;
  document.title = `${copy.h} · Lumen`;
}

function bindFilter(route, match) {
  const q = norm(route.query.get("q") || "");
  let visible = 0;
  main.querySelectorAll("[data-row]").forEach((row) => {
    const show = match(row) && (!q || norm(row.dataset.search || "").includes(q));
    row.hidden = !show;
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

function updateRails() {
  main.querySelectorAll(".rail-wrap").forEach((wrap) => {
    const rail = wrap.querySelector(".rail");
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth - 1;
    const prev = wrap.querySelector("[data-dir='prev']");
    const next = wrap.querySelector("[data-dir='next']");
    if (prev) prev.hidden = rail.scrollLeft < 8;
    if (next) next.hidden = max <= 8 || rail.scrollLeft >= max - 4;
  });
}

function bindRails() {
  main.querySelectorAll(".rail").forEach((rail) => {
    if (rail.dataset.bound) return;
    rail.dataset.bound = "1";
    rail.addEventListener("scroll", updateRails, { passive: true });
  });
  requestAnimationFrame(updateRails);
}

function restoreNotes() {
  main.querySelectorAll(".note-form").forEach((form) => {
    const id = form.dataset.matter;
    if (!id) return;
    form.hidden = !!ui.promptHidden[id];
    const slot = form.closest(".stage")?.querySelector("[data-note-slot]");
    if (!slot) return;
    const note = ui.notes[id];
    slot.hidden = !note;
    slot.textContent = note || "";
  });
}

function applySede() {
  main.querySelectorAll("[data-sede-view]").forEach((node) => {
    node.hidden = node.dataset.sedeView !== ui.sede;
  });
  const label = document.querySelector("#sede-label");
  if (label) label.textContent = ui.sede === "sitges" ? "Sitges" : "Barcelona";
  sedePanel.querySelectorAll("[data-sede]").forEach((button) => {
    const on = button.dataset.sede === ui.sede;
    button.setAttribute("aria-pressed", on ? "true" : "false");
    const mark = button.querySelector(".sede-mark");
    if (mark) mark.hidden = !on;
  });
  restoreNotes();
  requestAnimationFrame(updateRails);
}

function bindResumen(route) {
  const plazos = route.query.get("vista") === "plazos";
  const mesa = main.querySelector('[data-pane="mesa"]');
  const pane = main.querySelector('[data-pane="plazos"]');
  if (mesa) mesa.hidden = plazos;
  if (pane) pane.hidden = !plazos;
  document.title = plazos ? "Plazos · Lumen" : "Mesa · Lumen";
  applySede();
}

function bindMatter(id) {
  const matter = window.LUMEN.matters[id];
  const view = main.querySelector("#matter");
  const missing = main.querySelector("#matter-missing");
  if (!matter || !view) {
    if (view) view.hidden = true;
    if (missing) missing.hidden = false;
    document.title = "Lumen";
    return;
  }
  view.hidden = false;
  if (missing) missing.hidden = true;
  const client = window.LUMEN.clients[matter.clientId];
  document.title = `${matter.title} · Lumen`;
  fill(view, matter);
  const kicker = view.querySelector(".kicker");
  if (kicker) {
    kicker.textContent = matter.status === "urgente" ? `${matter.area} · urgente` : matter.status === "cerrado" ? `${matter.area} · cerrado` : matter.area;
    kicker.classList.toggle("hot", matter.status === "urgente");
  }
  const clientLink = view.querySelector('[data-bind="clientLink"]');
  if (clientLink && client) {
    clientLink.href = `#/cliente/${matter.clientId}`;
    clientLink.textContent = client.name;
  }
  const when = view.querySelector(".fact-when");
  if (when) when.classList.toggle("hot", matter.status === "urgente");
  const host = view.querySelector("#matter-art");
  if (host) host.innerHTML = art(TONE[id] || "dusk");
  const form = view.querySelector(".note-form");
  if (form) form.dataset.matter = id;

  view.querySelector("#documents").innerHTML = matter.documents
    .map((doc, index) => {
      const tone = DOC_TONES[index % DOC_TONES.length];
      const label = tone === "poster" ? doc.name.match(/v\d+/)?.[0] || "Doc" : "";
      return `<a class="tile" href="#/documentos">${art(tone, label)}<span class="tile-cap">${esc(doc.name)}</span></a>`;
    })
    .join("");

  view.querySelector("#timeline").innerHTML = matter.timeline
    .map((item, index) => {
      const last = index === matter.timeline.length - 1;
      return `<article class="moment${last ? " is-next" : ""}"><p>${last ? "Siguiente · " : ""}${esc(item.when)}</p><h3>${esc(item.label)}</h3></article>`;
    })
    .join("");

  view.querySelector("#related").innerHTML = Object.entries(window.LUMEN.matters)
    .filter(([mid]) => mid !== id)
    .map(([mid, item]) => {
      const flag = item.status === "urgente" ? "Urgente" : item.status === "cerrado" ? "Cerrado" : "";
      return tile(`#/expediente/${mid}`, `${SHORT[item.clientId] || item.area} · ${item.area}`, TONE[mid] || "dusk", flag);
    })
    .join("");
}

function bindClient(id) {
  const client = window.LUMEN.clients[id];
  const view = main.querySelector("#client");
  const missing = main.querySelector("#client-missing");
  if (!client || !view) {
    if (view) view.hidden = true;
    if (missing) missing.hidden = false;
    document.title = "Lumen";
    return;
  }
  view.hidden = false;
  if (missing) missing.hidden = true;
  document.title = `${client.name} · Lumen`;
  fill(view, client);
  const mail = view.querySelector('[data-bind="emailLink"]');
  if (mail) {
    mail.href = `mailto:${client.email}`;
    mail.textContent = client.email;
  }
  const host = view.querySelector("#client-art");
  if (host) host.innerHTML = art(CLIENT_TONE[id] || "dusk", client.name.slice(0, 1));
  const form = view.querySelector(".note-form");
  if (form) form.dataset.matter = id;
  const matters = Object.entries(window.LUMEN.matters).filter(([, matter]) => matter.clientId === id);
  const rail = view.querySelector("#client-matters");
  rail.innerHTML = matters.length
    ? matters
        .map(([mid, matter]) => {
          const flag = matter.status === "urgente" ? "Urgente" : matter.status === "cerrado" ? "Cerrado" : "";
          return tile(`#/expediente/${mid}`, matter.title, TONE[mid] || "dusk", flag);
        })
        .join("")
    : `<p class="lede">Este cliente no tiene asuntos abiertos en la mesa.</p>`;
}

function onMainClick(event) {
  const railBtn = event.target.closest("[data-dir]");
  if (railBtn && main.contains(railBtn)) {
    const rail = railBtn.closest(".rail-wrap")?.querySelector(".rail");
    rail?.scrollBy({ left: railBtn.dataset.dir === "prev" ? -420 : 420, behavior: "smooth" });
    return;
  }
  const closePrompt = event.target.closest("[data-close-prompt]");
  if (closePrompt) {
    const form = closePrompt.closest(".note-form");
    if (form) {
      form.hidden = true;
      ui.promptHidden[form.dataset.matter] = true;
    }
    return;
  }
  if (event.target.closest("#mark-read")) {
    ui.readAll = true;
    renderNotices(subKey(parseRoute()));
  }
}

function onMainSubmit(event) {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || !form.classList.contains("note-form")) return;
  event.preventDefault();
  const input = form.querySelector("input");
  const text = input.value.trim();
  if (!text) return;
  const id = form.dataset.matter;
  ui.notes[id] = text;
  input.value = "";
  const slot = form.closest(".stage")?.querySelector("[data-note-slot]");
  if (slot) {
    slot.hidden = false;
    slot.textContent = text;
  }
}

function fillDrafts() {
  document.querySelector("#draft-matter").innerHTML = Object.entries(window.LUMEN.matters)
    .map(([id, matter]) => `<option value="${esc(id)}">${esc(matter.title)}</option>`)
    .join("");
}

function openDraft() {
  closePopovers();
  draftDone.hidden = true;
  draftNote.hidden = false;
  draftSubmit.hidden = false;
  draftDialog.hidden = false;
  draftNote.focus();
}

let renderToken = 0;
let booted = false;

async function render() {
  const token = ++renderToken;
  const route = parseRoute();
  const file = MODULES[route.name];
  if (booted) {
    closePopovers();
    draftDialog.hidden = true;
    searchInput.value = "";
  }
  booted = true;
  syncNav(route);

  if (!file) {
    document.title = "Lumen";
    main.innerHTML = '<div class="page"><p class="miss">Esa pantalla no existe.</p><a class="link-go" href="#/resumen">Volver a la mesa</a></div>';
    return;
  }

  try {
    const response = await fetch(file);
    if (token !== renderToken) return;
    if (!response.ok) throw new Error(String(response.status));
    main.innerHTML = await response.text();
  } catch {
    if (token !== renderToken) return;
    main.innerHTML = '<div class="page"><p class="miss">No se ha podido abrir el módulo.</p><p class="lede">Sirve la carpeta con un servidor local.</p></div>';
    return;
  }

  if (token !== renderToken) return;
  hydrate(route);
}

function hydrate(route) {
  const sub = subKey(route);
  if (route.name === "resumen") bindResumen(route);
  if (route.name === "expedientes") {
    applyCopy("expedientes", sub);
    const cerrado = route.query.get("estado") === "cerrado";
    const area = route.query.get("area") || "";
    bindFilter(route, (row) => {
      if (cerrado) return row.dataset.status === "cerrado";
      if (area) return row.dataset.area === area;
      return true;
    });
  }
  if (route.name === "clientes") {
    applyCopy("clientes", sub);
    const tipo = route.query.get("tipo") || "";
    bindFilter(route, (row) => !tipo || row.dataset.tipo === tipo);
  }
  if (route.name === "agenda") {
    applyCopy("agenda", sub);
    const tipo = route.query.get("tipo") || "";
    bindFilter(route, (row) => !tipo || row.dataset.kind === tipo);
    main.querySelectorAll("[data-day]").forEach((day) => {
      const rows = [...day.querySelectorAll("[data-row]")];
      day.hidden = rows.length > 0 && rows.every((row) => row.hidden);
    });
  }
  if (route.name === "documentos") {
    applyCopy("documentos", sub);
    const tipo = route.query.get("tipo") || "";
    bindFilter(route, (row) => !tipo || row.dataset.kind === tipo);
  }
  if (route.name === "equipo") {
    applyCopy("equipo", sub);
    const rol = route.query.get("rol") || "";
    bindFilter(route, (row) => !rol || row.dataset.rol === rol);
  }
  if (route.name === "avisos") {
    applyCopy("avisos", sub);
    renderNotices(sub);
  }
  if (route.name === "expediente") bindMatter(route.param);
  if (route.name === "cliente") bindClient(route.param);
  bindRails();
  restoreNotes();
}

document.querySelectorAll("[data-group-link]").forEach((link) => {
  link.addEventListener("click", () => setGroupOpen(link.dataset.groupLink, true));
});

document.querySelectorAll("[data-toggle]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const id = button.dataset.toggle;
    const group = document.querySelector(`[data-group="${id}"]`);
    setGroupOpen(id, !group.classList.contains("is-open"));
  });
});

helpToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  togglePopover(helpPanel, helpToggle);
});

sedeToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  togglePopover(sedePanel, sedeToggle);
});

sedePanel.querySelectorAll("[data-sede]").forEach((button) => {
  button.addEventListener("click", () => {
    ui.sede = button.dataset.sede;
    closeLayer(sedePanel, sedeToggle);
    applySede();
  });
});

userToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  togglePopover(userPanel, userToggle);
});

searchInput.addEventListener("focus", openSearch);
searchInput.addEventListener("input", openSearch);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const first = searchList.querySelector("a");
    if (first) location.hash = first.getAttribute("href");
  }
});
searchForm.addEventListener("submit", (event) => event.preventDefault());
searchPanel.addEventListener("mousedown", (event) => event.preventDefault());

collapse.addEventListener("click", () => {
  ui.narrow = !ui.narrow;
  document.querySelector(".app").classList.toggle("is-narrow", ui.narrow);
  collapse.setAttribute("aria-pressed", ui.narrow ? "true" : "false");
  collapse.setAttribute("aria-label", ui.narrow ? "Expandir el menú" : "Contraer el menú");
  requestAnimationFrame(updateRails);
  setTimeout(updateRails, 220);
});

document.querySelector("#draft-open").addEventListener("click", (event) => {
  event.stopPropagation();
  openDraft();
});

document.querySelector("#draft-cancel").addEventListener("click", () => {
  draftDialog.hidden = true;
});

draftDialog.addEventListener("click", (event) => {
  if (event.target === draftDialog) draftDialog.hidden = true;
});

document.querySelector("#draft-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const matter = window.LUMEN.matters[document.querySelector("#draft-matter").value];
  draftDone.hidden = false;
  draftDone.textContent = `Anotado en ${matter.title}. Laia lo verá con las provisiones.`;
  draftNote.value = "";
  draftNote.hidden = true;
  draftSubmit.hidden = true;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePopovers();
    draftDialog.hidden = true;
  }
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    closePopovers();
    draftDialog.hidden = true;
    searchInput.focus();
    searchInput.select();
    openSearch();
  }
});

document.addEventListener("click", (event) => {
  if (!helpPanel.hidden && !helpPanel.contains(event.target) && !helpToggle.contains(event.target)) closeLayer(helpPanel, helpToggle);
  if (!sedePanel.hidden && !sedePanel.contains(event.target) && !sedeToggle.contains(event.target)) closeLayer(sedePanel, sedeToggle);
  if (!userPanel.hidden && !userPanel.contains(event.target) && !userToggle.contains(event.target)) closeLayer(userPanel, userToggle);
  if (!searchPanel.hidden && !searchForm.contains(event.target)) closeSearch();
});

main.addEventListener("click", onMainClick);
main.addEventListener("submit", onMainSubmit);

fillDrafts();
syncBadge();
window.addEventListener("hashchange", render);
if (!location.hash) location.replace("#/resumen");
else render();
