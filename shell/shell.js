const list = document.querySelector("#proto-nav");
const frame = document.querySelector("#stage");

function activePrototype() {
  const id = location.hash.replace("#", "");
  return window.PROTOTYPES.find((item) => item.id === id) || window.PROTOTYPES[0];
}

function renderShell() {
  const active = activePrototype();
  if (location.hash !== `#${active.id}`) {
    history.replaceState(null, "", `#${active.id}`);
  }

  list.replaceChildren(
    ...window.PROTOTYPES.map((item) => {
      const link = document.createElement("a");
      link.href = `#${item.id}`;
      link.textContent = `${item.id} ${item.name}`;
      const on = item.id === active.id;
      link.classList.toggle("is-active", on);
      if (on) link.setAttribute("aria-current", "page");
      return link;
    }),
  );

  if (frame.dataset.src !== active.path) {
    frame.dataset.src = active.path;
    frame.src = active.path;
    frame.title = active.name;
  }
}

window.addEventListener("hashchange", renderShell);
renderShell();
