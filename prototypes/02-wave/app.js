const NAV = {
  resumen: "Resumen",
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
  abierto: { label: "Abierto", dot: "bg-aqua" },
  urgente: { label: "Urgente", dot: "bg-blush" },
  cerrado: { label: "Cerrado", dot: "bg-slate-300" },
};

const main = document.querySelector("#main");
const noticeToggle = document.querySelector("#notice-toggle");
const noticePanel = document.querySelector("#notice-panel");

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

function closeNotice() {
  noticePanel.hidden = true;
  noticeToggle.setAttribute("aria-expanded", "false");
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
  return `<span class="inline-flex items-center gap-2 text-sm text-ink"><span class="size-1.5 rounded-full ${item.dot}"></span>${item.label}</span>`;
}

async function render() {
  const route = parseRoute();
  const file = MODULES[route.name];
  const section = navKey(route.name);

  document.querySelectorAll("[data-nav]").forEach((link) => {
    const on = link.dataset.nav === section;
    link.classList.toggle("is-active", on);
    if (on) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  closeNotice();
  document.title = `${NAV[section] || "Albor"} · Albor`;

  if (!file) {
    main.innerHTML =
      '<div class="rounded-[28px] bg-white p-8"><p class="text-lg font-semibold">Esa pantalla no existe.</p><a class="mt-3 inline-block text-sm text-violet" href="#/resumen">Volver al resumen</a></div>';
    return;
  }

  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(String(response.status));
    main.innerHTML = await response.text();
  } catch {
    main.innerHTML =
      '<div class="rounded-[28px] bg-white p-8"><p class="text-lg font-semibold">No se ha podido abrir el módulo.</p><p class="mt-2 text-sm text-mute">Sirve la carpeta con un servidor local.</p></div>';
    return;
  }

  main.scrollTop = 0;
  hydrate(route);
}

function hydrate(route) {
  if (route.name === "expedientes") bindExpedientes(route);
  if (route.name === "clientes") bindClientes(route);
  if (route.name === "expediente") bindMatter(route.param);
  if (route.name === "cliente") bindClient(route.param);
  bindChecks();
}

function bindChecks() {
  main.querySelectorAll("[data-check]").forEach((box) => {
    box.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const row = box.closest("[data-row]");
      const selected = row.classList.contains("is-selected");
      main.querySelectorAll("[data-row]").forEach((item) => item.classList.remove("is-selected"));
      row.classList.toggle("is-selected", !selected);
      box.setAttribute("aria-pressed", !selected ? "true" : "false");
    });
  });
}

function applyRows(rows, status, q) {
  let visible = 0;
  rows.forEach((row) => {
    const okStatus = status === "todos" || row.dataset.status === status;
    const okQuery = !q || row.dataset.search.includes(q);
    const show = okStatus && okQuery;
    row.classList.toggle("hidden", !show);
    if (show) visible += 1;
  });
  const empty = main.querySelector("#result-empty");
  if (empty) empty.hidden = visible !== 0;
}

function bindExpedientes(route) {
  const q = (route.query.get("q") || "").trim().toLowerCase();
  const status = route.query.get("estado") || "todos";
  const input = main.querySelector("#q");
  const select = main.querySelector("#estado");
  const form = main.querySelector("#list-search");
  if (input) input.value = q;
  if (select) select.value = status;

  const go = () => {
    const params = new URLSearchParams();
    const value = input.value.trim();
    if (value) params.set("q", value);
    if (select.value !== "todos") params.set("estado", select.value);
    const query = params.toString();
    location.hash = query ? `#/expedientes?${query}` : "#/expedientes";
  };

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    go();
  });
  select?.addEventListener("change", go);
  applyRows([...main.querySelectorAll("[data-matter]")], status, q);
}

function bindClientes(route) {
  const q = (route.query.get("q") || "").trim().toLowerCase();
  const status = route.query.get("tipo") || "todos";
  const input = main.querySelector("#q");
  const select = main.querySelector("#tipo");
  const form = main.querySelector("#list-search");
  if (input) input.value = q;
  if (select) select.value = status;

  const go = () => {
    const params = new URLSearchParams();
    const value = input.value.trim();
    if (value) params.set("q", value);
    if (select.value !== "todos") params.set("tipo", select.value);
    const query = params.toString();
    location.hash = query ? `#/clientes?${query}` : "#/clientes";
  };

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    go();
  });
  select?.addEventListener("change", go);
  applyRows([...main.querySelectorAll("[data-client]")], status, q);
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
          <span class="${index === matter.timeline.length - 1 ? "font-medium text-violet" : ""}">${esc(item.label)}</span>
        </li>`,
    )
    .join("");

  view.querySelector("#documents").innerHTML = matter.documents
    .map(
      (doc) => `
        <li class="flex items-center justify-between border-t border-line py-3.5 text-sm">
          <span>${esc(doc.name)}</span>
          <span class="text-mute">${esc(doc.meta)}</span>
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
        <a href="#/expediente/${esc(matterId)}" class="grid grid-cols-[9rem_1fr_auto] items-center gap-4 border-t border-line py-3.5 text-sm hover:text-violet">
          <span class="text-mute">${esc(matterId)}</span>
          <span>${esc(matter.title)}</span>
          ${statusMarkup(matter.status)}
        </a>`,
    )
    .join("");
}

document.querySelector("#header-search").addEventListener("click", () => {
  const field = document.querySelector("#q");
  if (field) {
    field.focus();
    return;
  }
  location.hash = "#/expedientes";
});

noticeToggle.addEventListener("click", () => {
  const open = noticePanel.hidden;
  noticePanel.hidden = !open;
  noticeToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

document.addEventListener("click", (event) => {
  if (!noticePanel.hidden && !noticePanel.contains(event.target) && !noticeToggle.contains(event.target)) {
    closeNotice();
  }
});

window.addEventListener("hashchange", render);
if (!location.hash) location.replace("#/resumen");
else render();
