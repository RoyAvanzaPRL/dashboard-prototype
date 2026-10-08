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
  abierto: { label: "Abierto", dot: "bg-moss" },
  urgente: { label: "Urgente", dot: "bg-wine" },
  cerrado: { label: "Cerrado", dot: "bg-stone-400" },
};

const main = document.querySelector("#main");
const pageTitle = document.querySelector("#page-title");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search");
const sidebar = document.querySelector("#sidebar");
const backdrop = document.querySelector("#backdrop");
const navToggle = document.querySelector("#nav-toggle");
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

function setSidebar(open) {
  sidebar.classList.toggle("is-open", open);
  backdrop.classList.toggle("hidden", !open);
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
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
    if (key === "clientLink") return;
    node.textContent = record[key] ?? "";
  });
}

function statusMarkup(status) {
  const item = STATUS[status] || STATUS.abierto;
  return `<span class="inline-flex items-center gap-2 text-sm"><span class="size-1.5 rounded-full ${item.dot}"></span>${item.label}</span>`;
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
  setSidebar(false);
  searchInput.value = route.name === "expedientes" ? route.query.get("q") || "" : "";

  if (!file) {
    pageTitle.textContent = "Albor";
    document.title = "Albor · Intranet";
    main.innerHTML =
      '<div class="mx-auto max-w-6xl px-5 py-8"><p class="font-serif text-3xl">Esa pantalla no existe.</p><a class="mt-4 inline-block text-sm text-copper" href="#/resumen">Volver al resumen</a></div>';
    return;
  }

  pageTitle.textContent = NAV[section] || "Albor";
  document.title = `${pageTitle.textContent} · Albor`;

  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(String(response.status));
    main.innerHTML = await response.text();
  } catch {
    main.innerHTML =
      '<div class="mx-auto max-w-6xl px-5 py-8"><p class="font-serif text-3xl">No se ha podido abrir el módulo.</p><p class="mt-2 text-sm text-stone-600">Sirve la carpeta con un servidor local. Abrir el archivo directamente bloquea la carga de las pantallas.</p></div>';
    return;
  }

  main.scrollTop = 0;
  hydrate(route);
}

function hydrate(route) {
  if (route.name === "expedientes") bindExpedientes(route);
  if (route.name === "expediente") bindMatter(route.param);
  if (route.name === "cliente") bindClient(route.param);
}

function bindExpedientes(route) {
  const q = (route.query.get("q") || "").trim().toLowerCase();
  const status = route.query.get("estado") || "todos";
  const rows = [...main.querySelectorAll("[data-matter]")];
  const chips = [...main.querySelectorAll("[data-filter]")];
  let visible = 0;

  chips.forEach((chip) => {
    chip.setAttribute("aria-pressed", chip.dataset.filter === status ? "true" : "false");
    chip.addEventListener("click", () => {
      const params = new URLSearchParams(route.query);
      if (chip.dataset.filter === "todos") params.delete("estado");
      else params.set("estado", chip.dataset.filter);
      const query = params.toString();
      location.hash = query ? `#/expedientes?${query}` : "#/expedientes";
    });
  });

  rows.forEach((row) => {
    const okStatus = status === "todos" || row.dataset.status === status;
    const okQuery = !q || row.dataset.search.includes(q);
    const show = okStatus && okQuery;
    row.classList.toggle("hidden", !show);
    if (show) visible += 1;
  });

  const count = main.querySelector("#result-count");
  if (count) count.textContent = visible === 1 ? "1 asunto" : `${visible} asuntos`;
  const empty = main.querySelector("#result-empty");
  if (empty) empty.hidden = visible !== 0;
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
  pageTitle.textContent = id;
  document.title = `${id} · Albor`;
  fill(view, { ...matter, id });
  const status = view.querySelector('[data-bind="status"]');
  if (status) status.innerHTML = statusMarkup(matter.status);
  const clientLink = view.querySelector('[data-bind="clientLink"]');
  if (clientLink && client) {
    clientLink.href = `#/cliente/${matter.clientId}`;
    clientLink.textContent = client.name;
  }

  const timeline = view.querySelector("#timeline");
  timeline.innerHTML = matter.timeline
    .map(
      (item, index) => `
        <li class="relative border-l border-line py-3 pl-4">
          <span class="absolute -left-[3px] top-4 size-1.5 rounded-full ${index === matter.timeline.length - 1 ? "bg-copper" : "bg-stone-300"}"></span>
          <p class="text-xs text-stone-500">${esc(item.when)}</p>
          <p class="text-sm">${esc(item.label)}</p>
        </li>`,
    )
    .join("");

  const documents = view.querySelector("#documents");
  documents.innerHTML = matter.documents
    .map(
      (doc) => `
        <li class="border-t border-line py-3 first:border-t-0">
          <p class="text-sm">${esc(doc.name)}</p>
          <p class="text-xs text-stone-500">${esc(doc.meta)}</p>
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

  pageTitle.textContent = client.name;
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
        <a href="#/expediente/${esc(matterId)}" class="block border-t border-line py-3 first:border-t-0 hover:bg-paper">
          <span class="flex items-center justify-between gap-3">
            <span>
              <span class="block font-mono text-xs text-stone-500">${esc(matterId)}</span>
              <span class="mt-0.5 block text-sm">${esc(matter.title)}</span>
            </span>
            ${statusMarkup(matter.status)}
          </span>
        </a>`,
    )
    .join("");
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const q = searchInput.value.trim();
  location.hash = q ? `#/expedientes?q=${encodeURIComponent(q)}` : "#/expedientes";
});

navToggle.addEventListener("click", () => {
  const open = navToggle.getAttribute("aria-expanded") !== "true";
  setSidebar(open);
});

backdrop.addEventListener("click", () => setSidebar(false));

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
