/*
 * HA 95 – Startmenü mit Untermenüs für Home Assistant
 * Version: 3.7.0
 * Ablage:  /config/www/ha95/ha95-startmenu.js
 * Laden:   configuration.yaml
 *            frontend:
 *              extra_module_url:
 *                - /local/ha95/ha95-startmenu.js
 * Menüs:   /config/www/ha95-startmenu.json (Beispiel im Repo unter
 *          examples/startmenu/ha95-startmenu.json)
 *
 * Ein Eintrag der Seitenleiste bekommt ein Untermenü, wenn er das Attribut
 * data-ha95-menu="<id>" trägt. Mit Custom Sidebar geht das so:
 *   - new_item: true
 *     item: Werkzeuge
 *     icon: mdi:tools
 *     attributes:
 *       data-ha95-menu: werkzeuge
 *     on_click:
 *       action: javascript
 *       code: ""
 *
 * Einträge im Menü (JSON):
 *   { "name": "…", "icon": "mdi:…", "path": "/config/…" }   Seite öffnen
 *   { "name": "…", "file": "configuration.yaml" }           Datei im File editor öffnen
 *   { "name": "…", "action": "restart" }                    Home Assistant neu starten (mit Rückfrage)
 *   { "name": "…", "url": "https://…" }                     Adresse in neuem Tab öffnen
 *   { "name": "…", "items": [ … ] }                         weiteres Untermenü
 *   { "divider": true }                                     Trennlinie
 */

const CONFIG_URL = "/local/ha95-startmenu.json";
const DEFAULTS = {
  file_editor_panel: "core_configurator",
  file_editor_base: "/homeassistant",
  menus: {},
};

let config = null;
const openMenus = []; // Stapel offener Menüs: { el, anchor }
let closeTimer = null;

// ---------- Hilfsfunktionen ----------

const haRoot = () => document.querySelector("home-assistant");
const hass = () => haRoot()?.hass;

const deepQuery = (selector, root = document) => {
  let found = null;
  const walk = (node) => {
    for (const el of node.querySelectorAll("*")) {
      if (found) return;
      if (el.matches(selector)) {
        found = el;
        return;
      }
      if (el.shadowRoot) walk(el.shadowRoot);
    }
  };
  walk(root);
  return found;
};

const sidebar = () =>
  haRoot()
    ?.shadowRoot?.querySelector("home-assistant-main")
    ?.shadowRoot?.querySelector("ha-sidebar");

// Menüs hängen in der Seitenleiste: Ist sie als modale Schublade aufgeklappt
// (Handy, schmale Fenster), wäre alles außerhalb davon gesperrt.
const layer = () => {
  const sb = sidebar();
  return sb?.shadowRoot && sb.checkVisibility?.() ? sb.shadowRoot : document.body;
};

const navigate = (path) => {
  history.pushState(null, "", path);
  window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function loadConfig() {
  if (config) return config;
  // Alternativ ohne Datei: window.ha95StartmenuConfig = { menus: { … } }
  if (window.ha95StartmenuConfig) return (config = { ...DEFAULTS, ...window.ha95StartmenuConfig });
  try {
    const res = await fetch(CONFIG_URL, { cache: "no-store" });
    config = { ...DEFAULTS, ...(res.ok ? await res.json() : {}) };
  } catch (err) {
    console.warn("HA95 Startmenü: Konfiguration nicht lesbar", err);
    config = { ...DEFAULTS };
  }
  return config;
}

// ---------- Aktionen ----------

async function openFile(file) {
  const cfg = await loadConfig();
  const full = file.startsWith("/") ? file : `${cfg.file_editor_base}/${file}`;
  const name = full.split("/").pop();
  if (location.pathname !== `/${cfg.file_editor_panel}`) navigate(`/${cfg.file_editor_panel}`);
  // Warten, bis der File editor im iframe geladen ist, dann die Datei öffnen
  for (let i = 0; i < 60; i++) {
    const frame = deepQuery("iframe");
    const win = frame?.contentWindow;
    if (win && typeof win.loadfile === "function" && win.document.readyState === "complete") {
      win.loadfile(full, name);
      return;
    }
    await sleep(250);
  }
  console.warn("HA95 Startmenü: File editor nicht gefunden", cfg.file_editor_panel);
}

const TEXT = {
  de: {
    title: "Home Assistant neu starten",
    question: "Soll Home Assistant jetzt neu gestartet werden?",
    note: "Die Oberfläche ist danach kurz nicht erreichbar.",
    yes: "Ja",
    no: "Nein",
    close: "Schließen",
  },
  en: {
    title: "Restart Home Assistant",
    question: "Do you want to restart Home Assistant now?",
    note: "The interface will be unavailable for a moment.",
    yes: "Yes",
    no: "No",
    close: "Close",
  },
};
const t = () => TEXT[(hass()?.language || "en").slice(0, 2)] || TEXT.en;

function confirmRestart() {
  const s = t();
  const overlay = document.createElement("div");
  overlay.className = "ha95-modal";
  overlay.innerHTML = `
    <div class="ha95-window" role="dialog" aria-modal="true" aria-labelledby="ha95-restart-title">
      <div class="ha95-titlebar">
        <span id="ha95-restart-title">${s.title}</span>
        <button class="ha95-close" aria-label="${s.close}">×</button>
      </div>
      <div class="ha95-body">
        <ha-icon icon="mdi:restart"></ha-icon>
        <p>${s.question}<br>${s.note}</p>
      </div>
      <div class="ha95-buttons">
        <button class="ha95-button" data-ok>${s.yes}</button>
        <button class="ha95-button" data-cancel>${s.no}</button>
      </div>
    </div>`;
  const close = () => overlay.remove();
  overlay.querySelector("[data-cancel]").onclick = close;
  overlay.querySelector(".ha95-close").onclick = close;
  overlay.addEventListener("keydown", (e) => e.key === "Escape" && close());
  overlay.querySelector("[data-ok]").onclick = () => {
    close();
    hass()?.callService("homeassistant", "restart");
  };
  overlay.popover = "manual";
  layer().appendChild(overlay);
  overlay.showPopover?.();
  overlay.querySelector("[data-cancel]").focus();
}

function runItem(item) {
  closeAll();
  if (item.action === "restart") return confirmRestart();
  if (item.file) return openFile(item.file);
  if (item.url) return window.open(item.url, "_blank", "noopener");
  if (item.path) return navigate(item.path);
}

// ---------- Menüs ----------

function closeFrom(level) {
  while (openMenus.length > level) {
    const m = openMenus.pop();
    m.el.remove();
    m.anchor?.classList?.remove("ha95-open");
  }
}
const closeAll = () => closeFrom(0);

const scheduleClose = () => {
  clearTimeout(closeTimer);
  closeTimer = setTimeout(closeAll, 400);
};
const cancelClose = () => clearTimeout(closeTimer);

function showMenu(items, anchorRect, level, anchorEl) {
  closeFrom(level);
  const menu = document.createElement("div");
  menu.className = "ha95-menu";
  menu.setAttribute("role", "menu");

  for (const item of items) {
    if (item.divider) {
      const hr = document.createElement("div");
      hr.className = "ha95-divider";
      menu.appendChild(hr);
      continue;
    }
    const row = document.createElement("button");
    row.className = "ha95-item";
    row.setAttribute("role", "menuitem");
    const icon = item.icon || (item.file ? "mdi:file-document-outline" : "");
    row.innerHTML = `
      <span class="ha95-icon">${icon ? `<ha-icon icon="${icon}"></ha-icon>` : ""}</span>
      <span class="ha95-label"></span>
      <span class="ha95-arrow">${item.items ? "▶" : ""}</span>`;
    row.querySelector(".ha95-label").textContent = item.name ?? item.file ?? "";

    if (item.items) {
      const open = () => {
        if (openMenus[level + 1]?.anchor === row) return;
        showMenu(item.items, row.getBoundingClientRect(), level + 1, row);
        row.classList.add("ha95-open");
      };
      row.addEventListener("mouseenter", open);
      row.addEventListener("click", open);
    } else {
      row.addEventListener("mouseenter", () => closeFrom(level + 1));
      row.addEventListener("click", () => runItem(item));
    }
    menu.appendChild(row);
  }

  menu.addEventListener("mouseenter", cancelClose);
  menu.addEventListener("mouseleave", scheduleClose);
  // Als Popover in die oberste Ebene, damit es auch über der
  // aufgeklappten Seitenleiste (Handy, schmale Fenster) liegt
  menu.popover = "manual";
  layer().appendChild(menu);
  menu.showPopover?.();

  // Rechts neben dem Anker, nicht über den unteren Rand hinaus.
  // Das erste Menü setzt bündig an den Rand der Seitenleiste an.
  const right = level === 0 ? sidebar()?.getBoundingClientRect().right ?? anchorRect.right : anchorRect.right - 3;
  const h = menu.offsetHeight;
  const top = Math.max(0, Math.min(anchorRect.top - 3, innerHeight - h));
  menu.style.left = `${Math.round(right)}px`;
  menu.style.top = `${Math.round(top)}px`;
  openMenus.push({ el: menu, anchor: anchorEl });
}

async function openRootMenu(anchor) {
  const cfg = await loadConfig();
  const id = anchor.getAttribute("data-ha95-menu");
  const items = cfg.menus?.[id];
  if (!items) {
    console.warn(`HA95 Startmenü: Menü "${id}" fehlt in ${CONFIG_URL}`);
    return;
  }
  if (openMenus[0]?.anchor === anchor) return;
  showMenu(items, anchor.getBoundingClientRect(), 0, anchor);
}

// ---------- Anbindung an die Seitenleiste ----------

const findAnchor = (ev) =>
  ev.composedPath().find((el) => el instanceof Element && el.hasAttribute?.("data-ha95-menu"));

function attach(sb) {
  if (!sb?.shadowRoot || sb.__ha95menu) return;
  sb.__ha95menu = true;
  const root = sb.shadowRoot;

  const style = document.createElement("style");
  style.textContent = `
    .ha95-sb-arrow { font-size: 10px; padding-inline-end: 4px; pointer-events: none; }
    :host(:not([expanded])) .ha95-sb-arrow { display: none; }
    ${MENU_CSS}
  `;
  root.appendChild(style);

  const addArrows = () =>
    root.querySelectorAll("[data-ha95-menu]").forEach((el) => {
      if (el.querySelector(":scope > .ha95-sb-arrow")) return;
      const a = document.createElement("span");
      a.className = "ha95-sb-arrow";
      a.slot = "end";
      a.textContent = "▶";
      el.appendChild(a);
    });
  addArrows();
  new MutationObserver(addArrows).observe(root, { subtree: true, childList: true, attributes: true, attributeFilter: ["data-ha95-menu"] });

  root.addEventListener("mouseover", (ev) => {
    const anchor = findAnchor(ev);
    if (anchor) {
      cancelClose();
      openRootMenu(anchor);
    }
  });
  root.addEventListener("mouseout", (ev) => {
    if (findAnchor(ev) && !findAnchor({ composedPath: () => [ev.relatedTarget] })) scheduleClose();
  });
  // Klick/Tippen öffnet das Menü (für Touch), statt zu navigieren
  root.addEventListener(
    "click",
    (ev) => {
      const anchor = findAnchor(ev);
      if (!anchor) return;
      ev.preventDefault();
      ev.stopPropagation();
      if (openMenus[0]?.anchor === anchor) closeAll();
      else openRootMenu(anchor);
    },
    true
  );
}

// ---------- Stil der Menüs (Farben aus dem HA-95-Design) ----------

const MENU_CSS = `
  .ha95-menu {
    position: fixed; z-index: 10000; min-width: 180px; padding: 2px;
    inset: auto; margin: 0; border: none; overflow: visible;
    background: var(--ha95-face, #c0c0c0);
    box-shadow: var(--ha95-raised, inset -1px -1px #000, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf);
    font-family: var(--ha95-font, Tahoma, sans-serif); font-size: 14px;
    color: var(--ha95-text, #000);
  }
  .ha95-item {
    display: flex; align-items: center; gap: 8px; width: 100%;
    height: 26px; padding: 0 8px 0 4px; border: none; margin: 0;
    background: transparent; color: inherit; font: inherit; text-align: left;
    cursor: default; white-space: nowrap;
  }
  .ha95-item:hover, .ha95-item:focus-visible, .ha95-item.ha95-open {
    background: var(--ha95-select, #000080); color: var(--ha95-select-text, #fff); outline: none;
  }
  .ha95-icon { width: 20px; display: inline-flex; justify-content: center; }
  .ha95-icon ha-icon { --mdc-icon-size: 18px; }
  .ha95-label { flex: 1; }
  .ha95-arrow { font-size: 10px; padding-left: 16px; }
  .ha95-divider {
    height: 0; margin: 3px 2px;
    border-top: 1px solid var(--ha95-shadow, #808080);
    border-bottom: 1px solid var(--ha95-highlight, #fff);
  }
  .ha95-modal {
    position: fixed; inset: 0; z-index: 10001;
    width: auto; height: auto; max-width: none; max-height: none;
    margin: 0; padding: 0; border: none;
    display: flex; align-items: center; justify-content: center;
    background: rgba(0, 0, 0, 0.2);
    font-family: var(--ha95-font, Tahoma, sans-serif); font-size: 14px;
  }
  .ha95-window {
    min-width: 320px; padding: 3px;
    background: var(--ha95-face, #c0c0c0); color: var(--ha95-text, #000);
    box-shadow: var(--ha95-raised, inset -1px -1px #000, inset 1px 1px #fff);
  }
  .ha95-titlebar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 2px 2px 2px 4px; font-weight: bold;
    background: var(--ha95-title-bar, #000080); color: var(--ha95-title-text, #fff);
  }
  .ha95-close {
    width: 16px; height: 14px; padding: 0; border: none; line-height: 12px; font-size: 12px; font-weight: bold;
    background: var(--ha95-face, #c0c0c0); color: var(--ha95-text, #000);
    box-shadow: var(--ha95-raised, inset -1px -1px #000, inset 1px 1px #fff);
  }
  .ha95-body { display: flex; gap: 16px; align-items: flex-start; padding: 16px 16px 8px; }
  .ha95-body ha-icon { --mdc-icon-size: 32px; flex: none; }
  .ha95-body p { margin: 0; line-height: 1.4; }
  .ha95-buttons { display: flex; justify-content: center; gap: 8px; padding: 8px 16px 12px; }
  .ha95-button {
    min-width: 75px; height: 23px; border: none; font: inherit;
    background: var(--ha95-face, #c0c0c0); color: var(--ha95-text, #000);
    box-shadow: var(--ha95-raised, inset -1px -1px #000, inset 1px 1px #fff);
  }
  .ha95-button:active { box-shadow: var(--ha95-sunken, inset 1px 1px #000, inset -1px -1px #fff); }
  .ha95-button:focus-visible { outline: 1px dotted currentColor; outline-offset: -5px; }
`;
const css = document.createElement("style");
css.textContent = MENU_CSS;
document.head.appendChild(css);

// Schließen bei Klick daneben, Escape oder Seitenwechsel
document.addEventListener("pointerdown", (ev) => {
  if (!openMenus.length) return;
  const path = ev.composedPath();
  if (openMenus.some((m) => path.includes(m.el)) || findAnchor(ev)) return;
  closeAll();
});
document.addEventListener("keydown", (ev) => ev.key === "Escape" && closeAll());
window.addEventListener("location-changed", () => closeAll());

// Warten, bis die Seitenleiste da ist (und neu andocken, falls HA sie neu baut)
(async () => {
  for (;;) {
    const sb = sidebar();
    if (sb) attach(sb);
    await sleep(1000);
  }
})();
