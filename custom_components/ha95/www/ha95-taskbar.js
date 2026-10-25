/*
 * HA 95 – Taskleiste für Home Assistant
 * Version: 4.10.1
 * Wird von der Integration HA 95 geladen (Option "Taskleiste", standardmäßig aus).
 *
 * Eine Win95-Taskleiste am unteren Rand: "Start" (klappt die Seitenleiste
 * auf und zu), Schnellstart-Symbole, Knöpfe für die zuletzt besuchten Seiten
 * und den offenen Detail-Dialog, rechts der Infobereich mit Symbolen für
 * Entitäten, Benachrichtigungen und der Uhr.
 *
 * Einstellungen unter "taskbar" in /config/www/ha95-startmenu.json:
 *   "taskbar": {
 *     "quicklaunch": [ { "name": "Einstellungen", "icon": "mdi:cog", "navigation_path": "/config" } ],
 *     "tray": [ { "entity": "climate.wohnzimmer", "icon": "mdi:thermostat", "navigation_path": "/energy" } ],
 *     "pages": 6,               Knöpfe für besuchte Seiten (0 = keine)
 *     "dialogs": true,          offenen Detail-Dialog als Knopf zeigen
 *     "notifications": true,    Glocke mit Anzahl im Infobereich
 *     "clock": true,            Uhr (Doppelklick: "Eigenschaften von Datum/Uhrzeit")
 *     "start": "Start"          Beschriftung des Start-Knopfs
 *   }
 * Einträge: name, icon, entity (liefert Name, Icon, Zustand), navigation_path,
 * url_path. Ohne Aktion öffnet ein Eintrag mit entity "Mehr Infos".
 */

const CONFIG_URL = "/local/ha95-startmenu.json";
const HEIGHT = 28;
const DEFAULTS = {
  quicklaunch: [],
  tray: [],
  pages: 6,
  dialogs: true,
  notifications: true,
  clock: true,
  start: "Start",
};
const TEXT = {
  de: { close: "Schließen", dialog: "Dialog schließen", notifications: "Benachrichtigungen", start: "Start" },
  en: { close: "Close", dialog: "Close dialog", notifications: "Notifications", start: "Start" },
};

const haRoot = () => document.querySelector("home-assistant");
const hass = () => haRoot()?.hass;
const tx = () => TEXT[(hass()?.language || navigator.language || "en").slice(0, 2)] || TEXT.en;
const storage = {
  get: (k) => {
    try {
      return JSON.parse(sessionStorage.getItem(k));
    } catch {
      return null;
    }
  },
  set: (k, v) => {
    try {
      sessionStorage.setItem(k, JSON.stringify(v));
    } catch {
      /* Speicher gesperrt: dann eben ohne Merken */
    }
  },
};

const CSS = `
  :host {
    position: fixed; left: 0; right: 0; bottom: 0; height: ${HEIGHT}px; z-index: 5;
    display: flex; align-items: stretch; gap: 2px; padding: 2px; box-sizing: border-box;
    background: var(--ha95-face, #c0c0c0); color: var(--ha95-text, #000);
    box-shadow: inset 0 1px var(--ha95-face, #c0c0c0), inset 0 2px var(--ha95-highlight, #fff);
    font-family: var(--ha95-font, Tahoma, sans-serif); font-size: 12px; user-select: none;
  }
  button {
    display: flex; align-items: center; gap: 4px; min-width: 0; margin: 0; padding: 0 6px;
    border: none; font: inherit; color: inherit; cursor: default;
    background: var(--ha95-face, #c0c0c0); box-shadow: var(--ha95-raised, inset -1px -1px #000, inset 1px 1px #fff);
  }
  button:active, button.on { box-shadow: var(--ha95-sunken, inset 1px 1px #000); }
  button.on { font-weight: bold; background: repeating-conic-gradient(var(--ha95-face, #c0c0c0) 0 25%, var(--ha95-highlight, #fff) 0 50%) 0 0 / 2px 2px; }
  button:focus-visible { outline: 1px dotted currentColor; outline-offset: -4px; }
  .start { font-weight: bold; padding: 0 8px 0 4px; }
  .sep { width: 2px; margin: 1px 2px; box-shadow: inset 1px 0 var(--ha95-shadow, #808080), inset -1px 0 var(--ha95-highlight, #fff); }
  .quick { padding: 0 4px; }
  .tasks { display: flex; flex: 1 1 0; gap: 2px; min-width: 0; }
  .task { flex: 0 1 160px; min-width: 40px; }
  .task span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .tray {
    display: flex; align-items: center; gap: 6px; padding: 0 8px; flex: none;
    box-shadow: var(--ha95-sunken, inset 1px 1px #000);
  }
  .tray button { box-shadow: none; background: none; padding: 0; position: relative; height: 100%; }
  .tray button.dim { opacity: 0.45; }
  .badge {
    position: absolute; top: 1px; right: -5px; min-width: 11px; padding: 0 2px; box-sizing: border-box;
    font: bold 9px/11px sans-serif; text-align: center; background: #f00; color: #fff;
  }
  .clock { padding: 0; min-width: 40px; text-align: center; }
  ha-icon, svg.ci { width: 16px; height: 16px; --mdc-icon-size: 16px; flex: none; }
  svg.ci { image-rendering: pixelated; }
  .tray ha-icon { color: inherit; }
`;

class Ha95Taskbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.cfg = { ...DEFAULTS };
    this.pages = storage.get("ha95-taskbar-pages") || [];
    this.notifications = 0;
    this._timers = [];
  }

  connectedCallback() {
    this.render();
    const nav = () => this.onNavigate();
    window.addEventListener("location-changed", nav);
    window.addEventListener("popstate", nav);
    window.addEventListener("hass-more-info", () => setTimeout(nav, 50), true);
    this.onNavigate(true);
    this._timers.push(setInterval(() => this.tick(), 15000));
  }

  // ---------- Daten ----------

  iconHtml(icon) {
    const color = icon && window.ha95ColorIcon ? window.ha95ColorIcon(icon) : "";
    return color ? color.replace('class="ha95-cicon"', 'class="ci"') : `<ha-icon icon="${String(icon || "mdi:help-circle-outline").replace(/"/g, "")}"></ha-icon>`;
  }

  currentPath() {
    return location.pathname;
  }

  dialogEntity() {
    return new URLSearchParams(location.search).get("more-info-entity-id");
  }

  // Dashboard-Name (Seitentitel) und, falls vorhanden, die aktive Ansicht
  pageTitle() {
    const page = document.title.replace(/\s[–-]\s*Home Assistant$/, "");
    let view = "";
    const walk = (node, depth) => {
      for (const el of node.querySelectorAll("*")) {
        if (el.localName === "ha-tab-group-tab" && el.hasAttribute("active")) return (view = el.getAttribute("aria-label") || el.textContent.trim());
        if (el.shadowRoot && depth < 8 && walk(el.shadowRoot, depth + 1)) return true;
      }
    };
    const root = haRoot()?.shadowRoot?.querySelector("home-assistant-main")?.shadowRoot;
    if (root) walk(root, 0);
    return view && view !== page ? `${page} – ${view}` : page;
  }

  onNavigate(first) {
    const path = this.currentPath();
    const delay = first ? 1500 : 700; // HA setzt den Seitentitel erst kurz nach dem Wechsel
    clearTimeout(this._navTimer);
    this._navTimer = setTimeout(() => {
      if (this.cfg.pages > 0 && !this.dialogEntity()) {
        const title = this.pageTitle() || path;
        const known = this.pages.find((p) => p.path === path);
        if (known) known.title = title;
        else this.pages.push({ path, title });
        while (this.pages.length > this.cfg.pages) {
          const drop = this.pages.findIndex((p) => p.path !== path);
          this.pages.splice(drop, 1);
        }
        storage.set("ha95-taskbar-pages", this.pages);
      }
      this.renderTasks();
    }, delay);
    this.renderTasks();
  }

  // ---------- Aktionen ----------

  go(path) {
    history.pushState(null, "", path);
    window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
  }

  moreInfo(entityId) {
    haRoot()?.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId } }));
  }

  run(item) {
    if (item.navigation_path) this.go(item.navigation_path);
    else if (item.url_path) window.open(item.url_path, "_blank");
    else if (item.entity) this.moreInfo(item.entity);
  }

  closeDialog() {
    const dlg = haRoot()?.shadowRoot?.querySelector("ha-more-info-dialog");
    if (dlg?.closeDialog) dlg.closeDialog();
    else history.back();
  }

  toggleStart() {
    haRoot()?.dispatchEvent(new CustomEvent("hass-toggle-menu", { bubbles: true, composed: true }));
  }

  openNotifications() {
    const sb = haRoot()?.shadowRoot?.querySelector("home-assistant-main")?.shadowRoot?.querySelector("ha-sidebar");
    sb?.shadowRoot?.querySelector(".notifications")?.click();
  }

  async openClock() {
    try {
      const mod = await import(new URL("ha95-clock.js", import.meta.url).href);
      mod.showDateTime({ calendars: this.cfg.clock_calendars });
    } catch (err) {
      console.warn("HA95 Taskleiste: ha95-clock.js nicht ladbar", err);
    }
  }

  // ---------- Zeichnen ----------

  entry(item) {
    const st = item.entity && hass()?.states[item.entity];
    return {
      name: item.name ?? st?.attributes.friendly_name ?? item.entity ?? "",
      icon: item.icon ?? st?.attributes.icon ?? "mdi:help-circle-outline",
      state: st?.state,
    };
  }

  button(cls, html, onClick, title) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = cls;
    b.innerHTML = html;
    if (title) b.title = title;
    if (onClick) b.addEventListener("click", onClick);
    return b;
  }

  render() {
    const s = tx();
    const root = this.shadowRoot;
    root.innerHTML = `<style>${CSS}</style>`;
    const start = this.button("start", `${this.iconHtml("mdi:home-assistant")}<span>${this.cfg.start || s.start}</span>`, () => this.toggleStart());
    root.append(start, Object.assign(document.createElement("div"), { className: "sep" }));
    if (this.cfg.quicklaunch.length) {
      this.cfg.quicklaunch.forEach((item) => {
        const e = this.entry(item);
        root.append(this.button("quick", this.iconHtml(e.icon), () => this.run(item), e.name));
      });
      root.append(Object.assign(document.createElement("div"), { className: "sep" }));
    }
    this.tasks = Object.assign(document.createElement("div"), { className: "tasks" });
    this.trayEl = Object.assign(document.createElement("div"), { className: "tray" });
    root.append(this.tasks, this.trayEl);
    this.renderTasks();
    this.renderTray();
  }

  renderTasks() {
    if (!this.tasks) return;
    const s = tx();
    const path = this.currentPath();
    const entity = this.cfg.dialogs && this.dialogEntity();
    const nodes = this.pages.map((p) => {
      const b = this.button("task" + (p.path === path && !entity ? " on" : ""), `<span></span>`, () => p.path !== path && this.go(p.path), p.title);
      b.querySelector("span").textContent = p.title;
      b.addEventListener("contextmenu", (ev) => {
        ev.preventDefault();
        if (p.path === path || this.pages.length < 2) return;
        this.pages = this.pages.filter((x) => x !== p);
        storage.set("ha95-taskbar-pages", this.pages);
        this.renderTasks();
      });
      return b;
    });
    if (entity) {
      const e = this.entry({ entity });
      const b = this.button("task on", `${this.iconHtml(e.icon)}<span></span>`, () => this.closeDialog(), `${s.dialog}: ${e.name}`);
      b.querySelector("span").textContent = e.name;
      nodes.push(b);
    }
    this.tasks.replaceChildren(...nodes);
  }

  renderTray() {
    if (!this.trayEl) return;
    const s = tx();
    const nodes = this.cfg.tray.map((item) => {
      const e = this.entry(item);
      const dim = ["off", "unavailable", "unknown"].includes(e.state);
      const b = this.button(dim ? "dim" : "", this.iconHtml(e.icon), () => this.run(item), `${e.name}${e.state ? `: ${e.state}` : ""}`);
      return b;
    });
    if (this.cfg.notifications) {
      const b = this.button("", `${this.iconHtml("mdi:bell")}${this.notifications ? `<span class="badge">${this.notifications}</span>` : ""}`, () => this.openNotifications(), s.notifications);
      nodes.push(b);
    }
    if (this.cfg.clock) {
      const b = this.button("clock", "", null);
      b.addEventListener("dblclick", () => this.openClock());
      b.addEventListener("click", (ev) => ev.pointerType === "touch" && this.openClock());
      this.clockBtn = b;
      nodes.push(b);
    }
    this.trayEl.replaceChildren(...nodes);
    this.tick();
  }

  tick() {
    if (!this.clockBtn) return;
    const now = new Date();
    const lang = hass()?.language || navigator.language;
    this.clockBtn.textContent = now.toLocaleTimeString(lang, { hour: "2-digit", minute: "2-digit" });
    this.clockBtn.title = now.toLocaleDateString(lang, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  }

  // Zustände der Tray-Entitäten und Benachrichtigungen verfolgen
  async watch() {
    const h = hass();
    if (!h) return;
    const ids = this.cfg.tray.map((i) => i.entity).filter(Boolean);
    if (ids.length) {
      let last = ids.map((id) => h.states[id]);
      this._timers.push(
        setInterval(() => {
          const states = hass()?.states;
          const now = ids.map((id) => states?.[id]);
          if (now.some((st, i) => st !== last[i])) {
            last = now;
            this.renderTray();
          }
        }, 2000)
      );
    }
    if (this.cfg.notifications && h.connection?.subscribeMessage) {
      try {
        const items = new Map();
        await h.connection.subscribeMessage(
          (msg) => {
            if (msg.type === "current") {
              items.clear();
              Object.entries(msg.notifications || {}).forEach(([k, v]) => items.set(k, v));
            } else {
              Object.entries(msg.notifications || {}).forEach(([k, v]) => (msg.type === "removed" ? items.delete(k) : items.set(k, v)));
            }
            this.notifications = items.size;
            this.renderTray();
          },
          { type: "persistent_notification/subscribe" }
        );
      } catch (err) {
        console.warn("HA95 Taskleiste: Benachrichtigungen nicht abonnierbar", err);
      }
    }
  }
}

if (!customElements.get("ha95-taskbar")) customElements.define("ha95-taskbar", Ha95Taskbar);

// Platz schaffen: Seite bekommt unten Luft, die Seitenleiste endet über der Leiste
function reserveSpace() {
  if (!document.getElementById("ha95-taskbar-space")) {
    const style = document.createElement("style");
    style.id = "ha95-taskbar-space";
    // Feste Höhe nötig: bei auto-Höhe + Padding lösen sich height:100%-Ketten auf (iframe-Panels fielen auf 150 px)
    style.textContent = `home-assistant { display: block; box-sizing: border-box; height: 100vh; height: 100dvh; padding-bottom: ${HEIGHT}px; }`;
    document.head.appendChild(style);
  }
  const main = haRoot()?.shadowRoot?.querySelector("home-assistant-main")?.shadowRoot;
  if (main && !main.getElementById?.("ha95-taskbar-space")) {
    const style = document.createElement("style");
    style.id = "ha95-taskbar-space";
    style.textContent = `ha-sidebar { height: calc(100vh - ${HEIGHT}px) !important; max-height: calc(100dvh - ${HEIGHT}px) !important; }`;
    main.appendChild(style);
    return true;
  }
  return false;
}

async function loadConfig() {
  try {
    const res = await fetch(CONFIG_URL, { cache: "no-store" });
    if (!res.ok) return {};
    const json = await res.json();
    return { ...(json.taskbar || {}), clock_calendars: json.clock_calendars };
  } catch {
    return {};
  }
}

async function start() {
  if (document.querySelector("ha95-taskbar")) return;
  for (let i = 0; i < 60 && !hass(); i++) await new Promise((r) => setTimeout(r, 500));
  const bar = document.createElement("ha95-taskbar");
  bar.cfg = { ...DEFAULTS, ...(await loadConfig()) };
  document.body.appendChild(bar);
  bar.render();
  bar.watch();
  // Die Seitenleiste entsteht später als das Modul
  for (let i = 0; i < 40 && !reserveSpace(); i++) await new Promise((r) => setTimeout(r, 500));
}

start();
