/*
 * HA 95 – Desktop-Karte für Home Assistant
 * Version: 4.10.4
 * Wird von der Integration HA 95 geladen (Option "Desktop-Karte").
 *
 * Große Symbole mit Beschriftung wie auf dem Windows-95-Desktop, direkt auf
 * dem Desktop-Hintergrund (ohne Fenster). Ein Doppelklick (auf Touch-
 * Bildschirmen ein Tippen) öffnet das Ziel, ein Klick markiert nur.
 *
 *   type: custom:ha95-desktop-card
 *   columns: 6                       # optional, Symbole pro Zeile (sonst automatisch)
 *   icons:
 *     - name: Arbeitsplatz
 *       icon: mdi:desktop-classic    # bunt, wenn das Startmenü-Modul das Icon kennt
 *       navigation_path: /config
 *     - name: Wohnzimmer
 *       entity: light.wohnzimmer     # Name und Icon kommen aus der Entität
 *       tap_action: { action: toggle }
 *       double_tap_action: { action: more-info }
 *
 * Aktionen (tap_action; double_tap_action gilt als Standard-Aktion für den
 * Doppelklick): navigate, url, more-info, toggle, perform-action, none.
 * Kurzform: navigation_path / url_path statt tap_action.
 */

const CSS = `
  :host { display: block; background: var(--ha95-desktop, #008080); }
  .desktop {
    display: grid; justify-content: start; align-content: start;
    gap: 8px 4px; padding: 8px;
    font-family: var(--ha95-font, Tahoma, sans-serif); font-size: 13px;
  }
  .icon {
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    width: 84px; padding: 4px 2px; margin: 0; border: 0; background: none;
    font: inherit; color: var(--ha95-desktop-text, #fff); cursor: default;
    text-align: center; -webkit-tap-highlight-color: transparent; user-select: none;
  }
  .glyph { position: relative; display: flex; width: 48px; height: 48px; align-items: center; justify-content: center; }
  .glyph svg, .glyph ha-icon { width: 48px; height: 48px; --mdc-icon-size: 48px; }
  .glyph svg { image-rendering: pixelated; }
  .glyph ha-icon { color: #fff; filter: drop-shadow(1px 1px 0 #000); }
  .label { max-width: 100%; padding: 1px 2px; line-height: 1.15; overflow-wrap: anywhere; }
  /* Markiert: Symbol bläulich überlagert, Beschriftung in der Auswahlfarbe */
  .icon.selected .glyph.m::after {
    content: ""; position: absolute; inset: 0; background: var(--ha95-select, #000080); opacity: 0.5;
    -webkit-mask: var(--mask) center / 100% 100% no-repeat; mask: var(--mask) center / 100% 100% no-repeat;
  }
  .icon.selected ha-icon { color: color-mix(in srgb, #fff 45%, var(--ha95-select, #000080)); }
  .icon.selected .label { background: var(--ha95-select, #000080); color: var(--ha95-select-text, #fff); }
  .icon:focus { outline: none; }
  .icon:focus-visible .label, .icon.selected:focus .label { outline: 1px dotted var(--ha95-select-text, #fff); outline-offset: -1px; }
  .empty { padding: 8px; color: var(--ha95-desktop-text, #fff); }
`;

const haRoot = () => document.querySelector("home-assistant");

const colorSvg = (icon) => (icon && window.ha95ColorIcon ? window.ha95ColorIcon(icon) : "");

class Ha95DesktopCard extends HTMLElement {
  setConfig(config) {
    if (!Array.isArray(config?.icons)) throw new Error("ha95-desktop-card: 'icons' fehlt (Liste)");
    this._config = config;
    this._selected = null;
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    this._render();
    // Das Startmenü-Modul liefert die bunten Icons; es kann später laden
    if (!window.ha95ColorIcon) {
      clearTimeout(this._retry);
      this._retry = setTimeout(() => window.ha95ColorIcon && this._render(), 1500);
    }
  }

  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    // Nur neu zeichnen, wenn sich eine verwendete Entität geändert hat
    const states = (this._config?.icons || []).map((i) => i.entity && hass.states[i.entity]);
    const same = this._states && states.length === this._states.length && states.every((s, i) => s === this._states[i]);
    this._states = states;
    if (first || !same) this._render();
  }

  getCardSize() {
    const per = this._config?.columns || 6;
    return Math.max(2, Math.ceil((this._config?.icons?.length || 1) / per) * 2);
  }

  getGridOptions() {
    return { columns: 12, min_columns: 3, rows: "auto" };
  }

  static getStubConfig() {
    return {
      icons: [
        { name: "Einstellungen", icon: "mdi:cog", navigation_path: "/config" },
        { name: "Logbuch", icon: "mdi:format-list-bulleted", navigation_path: "/logbook" },
      ],
    };
  }

  _entry(item) {
    const st = item.entity && this._hass?.states[item.entity];
    return {
      name: item.name ?? st?.attributes.friendly_name ?? item.entity ?? "",
      icon: item.icon ?? st?.attributes.icon ?? "mdi:help-circle-outline",
      title: st ? `${st.attributes.friendly_name ?? item.entity}: ${st.state}` : item.name,
    };
  }

  _render() {
    const root = this.shadowRoot;
    if (!root || !this._config) return;
    const cfg = this._config;
    const grid = cfg.columns ? `grid-template-columns: repeat(${+cfg.columns}, 84px);` : "grid-template-columns: repeat(auto-fill, 84px);";
    root.innerHTML = `<style>${CSS}</style><div class="desktop" style="${grid}"></div>`;
    const desk = root.querySelector(".desktop");
    if (!cfg.icons.length) desk.innerHTML = `<div class="empty">–</div>`;
    cfg.icons.forEach((item, i) => {
      const e = this._entry(item);
      const btn = document.createElement("button");
      btn.className = "icon" + (this._selected === i ? " selected" : "");
      btn.type = "button";
      if (e.title) btn.title = e.title;
      const color = colorSvg(e.icon);
      btn.innerHTML = `<span class="glyph${color ? " m" : ""}">${color || `<ha-icon icon="${e.icon.replace(/"/g, "")}"></ha-icon>`}</span><span class="label"></span>`;
      btn.querySelector(".label").textContent = e.name;
      if (color) {
        // Die Markierung färbt nur die Pixel des Symbols, nicht das ganze Quadrat
        const url = "data:image/svg+xml," + encodeURIComponent(btn.querySelector("svg").outerHTML.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" '));
        btn.querySelector(".glyph").style.setProperty("--mask", `url("${url}")`);
      }
      btn.addEventListener("click", (ev) => this._click(i, item, ev));
      btn.addEventListener("dblclick", () => this._run(item, item.double_tap_action || this._action(item)));
      btn.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") this._run(item, this._action(item));
        else if (ev.key === " ") {
          ev.preventDefault();
          this._select(i);
        }
      });
      desk.appendChild(btn);
    });
  }

  _select(i) {
    this._selected = i;
    this.shadowRoot.querySelectorAll(".icon").forEach((b, n) => b.classList.toggle("selected", n === i));
  }

  _click(i, item, ev) {
    this._select(i);
    // Touch: ein Tippen öffnet gleich (es gibt keinen Doppelklick)
    if (ev.pointerType === "touch" || matchMedia("(pointer: coarse)").matches) {
      this._run(item, this._action(item));
    }
  }

  _action(item) {
    if (item.tap_action) return item.tap_action;
    if (item.navigation_path) return { action: "navigate", navigation_path: item.navigation_path };
    if (item.url_path) return { action: "url", url_path: item.url_path };
    return { action: item.entity ? "more-info" : "none" };
  }

  _run(item, action) {
    const hass = this._hass || haRoot()?.hass;
    switch (action?.action) {
      case "navigate": {
        const path = action.navigation_path;
        if (!path) return;
        history.pushState(null, "", path);
        window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
        break;
      }
      case "url":
        if (action.url_path) window.open(action.url_path, action.new_tab === false ? "_self" : "_blank");
        break;
      case "more-info": {
        const entityId = action.entity || item.entity;
        if (entityId) this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId } }));
        break;
      }
      case "toggle": {
        const entityId = action.entity || item.entity;
        if (entityId && hass) hass.callService("homeassistant", "toggle", { entity_id: entityId });
        break;
      }
      case "perform-action":
      case "call-service": {
        const [domain, service] = String(action.perform_action || action.service || "").split(".");
        if (domain && service && hass) hass.callService(domain, service, action.data || action.service_data || {}, action.target);
        break;
      }
      default:
    }
  }
}

if (!customElements.get("ha95-desktop-card")) {
  customElements.define("ha95-desktop-card", Ha95DesktopCard);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "ha95-desktop-card",
    name: "HA95 Desktop",
    description: "Windows 95 desktop icons with labels: double-click opens a dashboard, entity or action",
  });
}
