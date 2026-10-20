/*
 * HA 95 – "Eigenschaften von Datum/Uhrzeit" für Home Assistant
 * Version: 3.13.0
 * Ablage:  /config/www/ha95/ha95-clock.js
 *
 * Als Dashboard-Karte (Ressource /local/ha95/ha95-clock.js?v=3.13.0, Typ Modul):
 *   type: custom:ha95-clock-card
 *   title: Datum/Uhrzeit            # optional, Titelleiste der Karte
 *   calendars:                      # optional, Tage mit Terminen fett
 *     - calendar.familie
 *
 * Als Dialog: ha95-startmenu.js lädt dieses Modul selbst nach, sobald man
 * die Uhr oben in der Seitenleiste doppelt anklickt (Option "clock").
 * Aus eigenem Code: window.ha95ShowDateTime({ calendars: ["calendar.x"] })
 *
 * Nur Anzeige: Home Assistant kann die Systemzeit nicht stellen. Monat und
 * Jahr lassen sich durchblättern, ein Klick auf einen Tag zeigt die Termine.
 */

const haRoot = () => document.querySelector("home-assistant");

// Dialoge hängen in der Seitenleiste, wenn sie als modale Schublade offen
// ist (Handy), sonst wäre der Dialog gesperrt. Wie in ha95-startmenu.js.
const layer = () => {
  const sb = haRoot()
    ?.shadowRoot?.querySelector("home-assistant-main")
    ?.shadowRoot?.querySelector("ha-sidebar");
  return sb?.shadowRoot && sb.checkVisibility?.() ? sb.shadowRoot : document.body;
};

const TEXT = {
  de: {
    title: "Eigenschaften von Datum/Uhrzeit",
    tab_date: "<u>D</u>atum/Uhrzeit",
    tab_zone: "<u>Z</u>eitzone",
    date: "<u>D</u>atum",
    time: "<u>U</u>hrzeit",
    month: "Monat",
    year: "Jahr",
    zone: "Aktuelle Zeitzone:",
    dst: "Uhr automatisch auf Sommer-/Winterzeit umstellen",
    events: "Termine am",
    none: "Keine Termine",
    allday: "ganztägig",
    error: "Kalender nicht lesbar",
    ok: "OK",
    cancel: "Abbrechen",
    apply: "<u>Ü</u>bernehmen",
    close: "Schließen",
  },
  en: {
    title: "Date/Time Properties",
    tab_date: "<u>D</u>ate &amp; Time",
    tab_zone: "<u>T</u>ime Zone",
    date: "<u>D</u>ate",
    time: "<u>T</u>ime",
    month: "Month",
    year: "Year",
    zone: "Current time zone:",
    dst: "Automatically adjust clock for daylight saving changes",
    events: "Events on",
    none: "No events",
    allday: "all day",
    error: "Calendar not readable",
    ok: "OK",
    cancel: "Cancel",
    apply: "<u>A</u>pply",
    close: "Close",
  },
};
const lang = (hass) => (hass?.locale?.language || hass?.language || navigator.language || "en").slice(0, 2);
const tx = (hass) => TEXT[lang(hass)] || TEXT.en;

const pad = (n) => String(n).padStart(2, "0");
const dayKey = (y, m, d) => `${y}-${pad(m)}-${pad(d)}`;
const daysInMonth = (y, m) => new Date(Date.UTC(y, m, 0)).getUTCDate();
// Wochentag 1 = Montag … 7 = Sonntag
const weekday = (y, m, d) => new Date(Date.UTC(y, m - 1, d)).getUTCDay() || 7;
const addDays = (key, n) => {
  const [y, m, d] = key.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return dayKey(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate());
};
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// Zeitzone wie im Profil eingestellt: Server (Standard) oder Browser
const timeZone = (hass) => (hass?.locale?.time_zone === "local" ? undefined : hass?.config?.time_zone);

function partsIn(tz, date = new Date()) {
  const p = {};
  new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  })
    .formatToParts(date)
    .forEach(({ type, value }) => (p[type] = Number(value)));
  return { y: p.year, m: p.month, d: p.day, h: p.hour % 24, min: p.minute, s: p.second };
}

// Erster Wochentag aus dem Profil, sonst aus der Sprache
const WEEKDAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
function firstWeekday(hass) {
  const fw = WEEKDAYS.indexOf(hass?.locale?.first_weekday);
  if (fw >= 0) return fw + 1;
  try {
    const loc = new Intl.Locale(hass?.locale?.language || navigator.language);
    return (loc.getWeekInfo?.() || loc.weekInfo)?.firstDay || 1;
  } catch {
    return 1;
  }
}

function zoneLabel(tz) {
  try {
    const off = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "longOffset" })
      .formatToParts(new Date())
      .find((p) => p.type === "timeZoneName")?.value;
    const name = tz || Intl.DateTimeFormat().resolvedOptions().timeZone;
    return `(${off === "GMT" ? "GMT+00:00" : off}) ${name.replace(/_/g, " ")}`;
  } catch {
    return tz || "";
  }
}

// ---------- Analoguhr ----------

// Zeiger wie in Windows 95: schmale Raute, eine Hälfte hell, eine türkis
const hand = (cls, len, w) => {
  const tail = 6;
  const side = -len * 0.22;
  return `<g class="${cls}">
    <path d="M0 ${tail}L${-w} ${side}L0 ${-len}z" class="hand-light"/>
    <path d="M0 ${tail}L0 ${-len}L${w} ${side}z" class="hand-dark"/>
  </g>`;
};

function clockFace() {
  let marks = "";
  for (let i = 0; i < 60; i++) {
    const a = (i * Math.PI) / 30;
    const x = (Math.sin(a) * 44).toFixed(2);
    const y = (-Math.cos(a) * 44).toFixed(2);
    marks +=
      i % 5
        ? `<rect x="${x - 0.8}" y="${y - 0.8}" width="1.6" height="1.6" class="dot"/>`
        : `<g transform="translate(${x} ${y})"><rect x="-2" y="-2" width="4.4" height="4.4" class="mark-dark"/>` +
          `<rect x="-2.4" y="-2.4" width="4.4" height="4.4" class="mark-light"/>` +
          `<rect x="-2" y="-2" width="3.6" height="3.6" class="mark"/></g>`;
  }
  return `<svg viewBox="-50 -50 100 100" class="clock" role="img">
    ${marks}
    ${hand("hour", 25, 5.5)}
    ${hand("minute", 38, 4.6)}
    <line class="second" x1="0" y1="7" x2="0" y2="-40"/>
  </svg>`;
}

// ---------- Inhalt des Dialogs ----------

const CSS = `
  :host {
    display: block; container-type: inline-size;
    font-family: var(--ha95-font, Tahoma, sans-serif); font-size: 13px;
    color: var(--ha95-text, #000);
    -webkit-font-smoothing: none;
  }
  *, *::before, *::after { box-sizing: border-box; }
  u { text-decoration: underline; }
  button, select, input { font: inherit; color: inherit; }

  .tabs { display: flex; padding: 0 0 0 2px; position: relative; z-index: 1; }
  .tab {
    border: none; margin: 2px 0 0; padding: 2px 8px 3px; cursor: default;
    background: var(--ha95-face, #c0c0c0);
    box-shadow: inset 1px 1px var(--ha95-highlight, #fff), inset 2px 2px var(--ha95-light, #dfdfdf),
      inset -1px 0 var(--ha95-dark, #000), inset -2px 0 var(--ha95-shadow, #808080);
    border-radius: 3px 3px 0 0;
  }
  .tab[aria-selected="true"] { margin: 0 -2px -2px; padding: 3px 10px 6px; z-index: 1; }
  .tab:focus-visible span { outline: 1px dotted currentColor; }
  .sheet {
    padding: 10px; background: var(--ha95-face, #c0c0c0);
    box-shadow: var(--ha95-raised, inset -1px -1px #000, inset 1px 1px #fff);
  }
  /* beide Seiten im selben Feld, damit das Fenster beim Umschalten gleich groß bleibt */
  .sheets { display: grid; }
  .sheet { grid-area: 1 / 1; }
  .sheet[hidden] { display: block; visibility: hidden; }

  .groups { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 10px; }
  @container (max-width: 400px) { .groups { grid-template-columns: minmax(0, 1fr); } }
  fieldset {
    margin: 0; padding: 8px 8px 10px; min-width: 0;
    border: 1px solid var(--ha95-shadow, #808080);
    box-shadow: inset 1px 1px var(--ha95-highlight, #fff), 1px 1px var(--ha95-highlight, #fff);
  }
  legend { padding: 0 3px; }

  .sunken {
    background: var(--ha95-window, #fff); color: var(--ha95-window-text, #000);
    box-shadow: var(--ha95-sunken, inset 1px 1px #808080, inset -1px -1px #fff);
  }
  .row { display: flex; gap: 8px; margin-bottom: 8px; }
  .combo { position: relative; flex: 1 1 auto; min-width: 0; }
  .combo select {
    appearance: none; -webkit-appearance: none; width: 100%; height: 22px;
    border: none; border-radius: 0; padding: 0 22px 0 4px; cursor: default;
  }
  .combo::after, .spin button {
    content: ""; position: absolute; right: 2px; top: 2px; width: 16px; height: 18px; pointer-events: none;
    background: var(--ha95-face, #c0c0c0)
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='7' height='4'%3E%3Cpath d='M0 0h7L3.5 4z'/%3E%3C/svg%3E")
      no-repeat center;
    box-shadow: var(--ha95-raised, inset -1px -1px #000, inset 1px 1px #fff);
  }
  .spin { position: relative; display: flex; height: 22px; flex: none; }
  .spin input {
    width: 72px; height: 22px; border: none; border-radius: 0; padding: 0 20px 0 4px; outline: none;
    -moz-appearance: textfield;
  }
  .spin input::-webkit-inner-spin-button { -webkit-appearance: none; }
  .spin.year input { width: 66px; }
  .spin.time input { width: 92px; text-align: left; }
  .spin button {
    pointer-events: auto; border: none; padding: 0; height: 9px; cursor: default;
    background-size: 5px 3px;
  }
  .spin button.up { top: 2px; transform: rotate(180deg); }
  .spin button.down { top: 11px; }
  .spin button:active { box-shadow: var(--ha95-sunken, inset 1px 1px #000); }
  .spin button[disabled] { opacity: 0.6; }
  .combo select:focus-visible, .spin input:focus-visible { outline: 1px dotted currentColor; outline-offset: -3px; }

  .cal { padding: 2px; }
  .cal-grid { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); text-align: center; }
  .cal-head {
    background: var(--ha95-shadow, #808080); color: var(--ha95-face, #c0c0c0);
    line-height: 18px;
  }
  .day {
    border: none; background: none; padding: 0; height: 20px; line-height: 20px; cursor: default;
    color: var(--ha95-window-text, #000);
  }
  .day.events { font-weight: bold; }
  .day.today { outline: 1px solid var(--ha95-heat, #f00); outline-offset: -2px; }
  .day[aria-selected="true"] { background: var(--ha95-select, #000080); color: var(--ha95-select-text, #fff); }
  .day:focus-visible { outline: 1px dotted var(--ha95-select-text, #fff); outline-offset: -3px; }

  .time-box { display: flex; flex-direction: column; align-items: center; gap: 8px; height: 100%; }
  .clock { width: min(100%, 170px); aspect-ratio: 1; flex: none; }
  .clock .dot { fill: var(--ha95-highlight, #fff); stroke: var(--ha95-shadow, #808080); stroke-width: 0.3; }
  .clock .mark { fill: #008080; }
  .clock .mark-light { fill: #00ffff; }
  .clock .mark-dark { fill: var(--ha95-dark, #000); }
  .clock .hand-light { fill: var(--ha95-highlight, #fff); }
  .clock .hand-dark { fill: #008080; }
  .clock g path { stroke: var(--ha95-dark, #000); stroke-width: 0.5; stroke-linejoin: round; }
  .clock .second { stroke: var(--ha95-text-dim, #404040); stroke-width: 0.7; }

  .zone-line { margin: 10px 2px 0; }
  .events-box { margin-top: 10px; }
  .events-list { min-height: 48px; max-height: 140px; overflow: auto; padding: 3px 4px; }
  .events-list div { display: flex; gap: 8px; line-height: 18px; }
  .events-list .when { flex: none; min-width: 64px; color: var(--ha95-shadow, #808080); }
  .events-list .muted { color: var(--ha95-shadow, #808080); }

  .zone-sheet .combo { margin-bottom: 12px; }
  .zone-sheet .combo select { opacity: 1; }
  .map {
    height: 110px; margin-bottom: 12px;
    /* grobe Weltkarte: Erdteile als Ellipsen auf Türkis */
    background:
      radial-gradient(ellipse 13% 22% at 22% 32%, #00a000 98%, transparent),
      radial-gradient(ellipse 7% 22% at 30% 72%, #00a000 98%, transparent),
      radial-gradient(ellipse 6% 12% at 50% 30%, #00a000 98%, transparent),
      radial-gradient(ellipse 8% 22% at 53% 62%, #00a000 98%, transparent),
      radial-gradient(ellipse 18% 18% at 72% 30%, #00a000 98%, transparent),
      radial-gradient(ellipse 6% 8% at 85% 75%, #00a000 98%, transparent),
      #008080;
    position: relative;
  }
  .map::after {
    content: ""; position: absolute; top: 0; bottom: 0; left: var(--zone-x, 50%); width: 1px;
    background: #ffff00;
  }
  label.check { display: flex; gap: 6px; align-items: center; }
  label.check input { margin: 0; accent-color: var(--ha95-select, #000080); }
`;

class Ha95DateTime extends HTMLElement {
  constructor() {
    super();
    this._calendars = [];
    this._events = new Map(); // Tagesschlüssel → Termine
    this._loaded = ""; // Monat, dessen Termine geladen sind
    this._loadedAt = 0;
    this.attachShadow({ mode: "open" });
  }

  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (first && this.isConnected) this._render();
    else this._loadEvents();
  }
  get hass() {
    return this._hass || haRoot()?.hass;
  }

  set calendars(list) {
    const next = [].concat(list || []).filter(Boolean);
    if (next.join() === this._calendars.join()) return;
    this._calendars = next;
    this._loaded = "";
    if (this.shadowRoot.firstChild) this._render();
  }

  connectedCallback() {
    this._render();
    this._timer = setInterval(() => this._tick(), 1000);
  }
  disconnectedCallback() {
    clearInterval(this._timer);
  }

  _now() {
    return partsIn(timeZone(this.hass));
  }

  _render() {
    const s = tx(this.hass);
    const now = this._now();
    this._today = dayKey(now.y, now.m, now.d);
    this._view ??= { y: now.y, m: now.m };
    this._selected ??= now.d;
    const loc = this.hass?.locale?.language || navigator.language;
    const months = Array.from({ length: 12 }, (_, i) =>
      new Intl.DateTimeFormat(loc, { month: "long", timeZone: "UTC" }).format(new Date(Date.UTC(2000, i, 1)))
    );
    const withEvents = this._calendars.length > 0;
    this.shadowRoot.innerHTML = `<style>${CSS}</style>
      <div class="tabs" role="tablist">
        <button class="tab" role="tab" aria-selected="true" data-tab="date"><span>${s.tab_date}</span></button>
        <button class="tab" role="tab" aria-selected="false" data-tab="zone" tabindex="-1"><span>${s.tab_zone}</span></button>
      </div>
      <div class="sheets">
      <div class="sheet" data-sheet="date" role="tabpanel">
        <div class="groups">
          <fieldset>
            <legend>${s.date}</legend>
            <div class="row">
              <div class="combo"><select class="sunken month" aria-label="${s.month}">
                ${months.map((n, i) => `<option value="${i + 1}">${esc(n)}</option>`).join("")}
              </select></div>
              <div class="spin year">
                <input class="sunken" type="number" min="1" max="9999" aria-label="${s.year}">
                <button class="up" tabindex="-1" aria-hidden="true"></button>
                <button class="down" tabindex="-1" aria-hidden="true"></button>
              </div>
            </div>
            <div class="cal sunken">
              <div class="cal-grid cal-head" aria-hidden="true"></div>
              <div class="cal-grid cal-days" role="grid"></div>
            </div>
          </fieldset>
          <fieldset>
            <legend>${s.time}</legend>
            <div class="time-box">
              ${clockFace()}
              <div class="spin time">
                <input class="sunken" readonly aria-label="${s.time.replace(/<\/?u>/g, "")}">
                <button class="up" tabindex="-1" aria-hidden="true" disabled></button>
                <button class="down" tabindex="-1" aria-hidden="true" disabled></button>
              </div>
            </div>
          </fieldset>
        </div>
        ${
          withEvents
            ? `<fieldset class="events-box"><legend class="events-title"></legend>
                 <div class="events-list sunken" role="list"></div></fieldset>`
            : ""
        }
        <div class="zone-line">${s.zone} <span class="zone-name"></span></div>
      </div>
      <div class="sheet zone-sheet" data-sheet="zone" role="tabpanel" hidden>
        <div class="combo"><select class="sunken" disabled><option class="zone-name"></option></select></div>
        <div class="map sunken" aria-hidden="true"></div>
        <label class="check"><input type="checkbox" checked disabled> ${s.dst}</label>
      </div>
      </div>`;

    const root = this.shadowRoot;
    root.querySelectorAll(".tab").forEach((tab) => (tab.onclick = () => this._tab(tab.dataset.tab)));
    root.querySelector(".tabs").onkeydown = (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") this._tab(this._activeTab === "zone" ? "date" : "zone", true);
    };
    const month = root.querySelector(".month");
    month.onchange = () => this._go(this._view.y, Number(month.value));
    const year = root.querySelector(".year input");
    year.onchange = () => this._go(Number(year.value) || this._view.y, this._view.m);
    root.querySelector(".year .up").onclick = () => this._go(this._view.y + 1, this._view.m);
    root.querySelector(".year .down").onclick = () => this._go(this._view.y - 1, this._view.m);

    const days = root.querySelector(".cal-days");
    days.onclick = (e) => {
      const d = e.target.closest(".day")?.dataset.day;
      if (d) this._select(Number(d), true);
    };
    days.onkeydown = (e) => {
      const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
      if (!step) return;
      e.preventDefault();
      const t = new Date(Date.UTC(this._view.y, this._view.m - 1, this._selected + step));
      this._view = { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1 };
      this._selected = t.getUTCDate();
      this._renderMonth(true);
    };

    const tz = timeZone(this.hass);
    root.querySelectorAll(".zone-name").forEach((el) => (el.textContent = zoneLabel(tz)));
    const off = partsIn(tz).h - partsIn("UTC").h;
    root.querySelector(".map").style.setProperty("--zone-x", `${(((off + 36) % 24) / 24) * 100}%`);

    this._tab(this._activeTab || "date");
    this._renderMonth();
    this._tick();
  }

  _tab(name, focus) {
    this._activeTab = name;
    const root = this.shadowRoot;
    root.querySelectorAll(".tab").forEach((tab) => {
      const on = tab.dataset.tab === name;
      tab.setAttribute("aria-selected", on);
      tab.tabIndex = on ? 0 : -1;
      if (on && focus) tab.focus();
    });
    root.querySelectorAll(".sheet").forEach((sheet) => (sheet.hidden = sheet.dataset.sheet !== name));
  }

  _go(y, m) {
    if (m < 1) [y, m] = [y - 1, 12];
    if (m > 12) [y, m] = [y + 1, 1];
    y = Math.min(9999, Math.max(1, y));
    this._view = { y, m };
    this._selected = Math.min(this._selected, daysInMonth(y, m));
    this._renderMonth();
  }

  _select(d, focus) {
    this._selected = d;
    this._renderMonth(focus);
  }

  _renderMonth(focus) {
    const root = this.shadowRoot;
    const { y, m } = this._view;
    root.querySelector(".month").value = m;
    root.querySelector(".year input").value = y;

    const first = firstWeekday(this.hass);
    const loc = this.hass?.locale?.language || navigator.language;
    const narrow = new Intl.DateTimeFormat(loc, { weekday: "narrow", timeZone: "UTC" });
    // 2024-01-01 war ein Montag
    root.querySelector(".cal-head").innerHTML = Array.from({ length: 7 }, (_, i) => {
      const wd = ((first - 1 + i) % 7) + 1;
      return `<span>${esc(narrow.format(new Date(Date.UTC(2024, 0, wd))))}</span>`;
    }).join("");

    const lead = (weekday(y, m, 1) - first + 7) % 7;
    let html = "<span></span>".repeat(lead);
    for (let d = 1, n = daysInMonth(y, m); d <= n; d++) {
      const key = dayKey(y, m, d);
      const cls = ["day", key === this._today && "today", this._events.has(key) && "events"].filter(Boolean).join(" ");
      const sel = d === this._selected;
      html += `<button class="${cls}" role="gridcell" data-day="${d}" aria-selected="${sel}" tabindex="${sel ? 0 : -1}">${d}</button>`;
    }
    const days = root.querySelector(".cal-days");
    days.innerHTML = html;
    if (focus) days.querySelector('[aria-selected="true"]')?.focus();
    this._renderEvents();
    this._loadEvents();
  }

  _renderEvents() {
    const list = this.shadowRoot.querySelector(".events-list");
    if (!list) return;
    const s = tx(this.hass);
    const { y, m } = this._view;
    const key = dayKey(y, m, this._selected);
    const loc = this.hass?.locale?.language || navigator.language;
    const date = new Intl.DateTimeFormat(loc, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
      new Date(Date.UTC(y, m - 1, this._selected))
    );
    this.shadowRoot.querySelector(".events-title").textContent = `${s.events} ${date}`;
    const tz = timeZone(this.hass);
    const time = new Intl.DateTimeFormat(loc, { hour: "2-digit", minute: "2-digit", timeZone: tz });
    const items = (this._events.get(key) || []).slice().sort((a, b) => (a.sort < b.sort ? -1 : 1));
    if (this._error) list.innerHTML = `<div class="muted">${esc(s.error)}</div>`;
    else if (!items.length) list.innerHTML = this._loaded ? `<div class="muted">${esc(s.none)}</div>` : "";
    else
      list.innerHTML = items
        .map((ev) => {
          const when = ev.allDay || ev.startKey !== key ? s.allday : time.format(ev.start);
          return `<div role="listitem"><span class="when">${esc(when)}</span><span>${esc(ev.summary)}</span></div>`;
        })
        .join("");
  }

  async _loadEvents() {
    const hass = this.hass;
    if (!this._calendars.length || !hass?.callApi || !this._view) return;
    const { y, m } = this._view;
    const month = `${y}-${pad(m)}`;
    if (this._loaded === month && Date.now() - this._loadedAt < 5 * 60 * 1000) return;
    if (this._loading === month) return;
    this._loading = month;
    // einen Tag Rand, damit Zeitzonen-Versatz keine Termine abschneidet
    const start = new Date(Date.UTC(y, m - 1, 0)).toISOString();
    const end = new Date(Date.UTC(y, m, 2)).toISOString();
    const tz = timeZone(hass);
    const map = new Map();
    let error = false;
    await Promise.all(
      this._calendars.map(async (id) => {
        try {
          const evs = await hass.callApi("GET", `calendars/${id}?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`);
          for (const ev of evs || []) {
            const allDay = !!ev.start?.date;
            let startKey, endKey, startDate;
            if (allDay) {
              startKey = ev.start.date;
              endKey = addDays(ev.end?.date || ev.start.date, -1); // Ende ist exklusiv
              startDate = null;
            } else {
              startDate = new Date(ev.start.dateTime);
              const endDate = new Date(Math.max(+startDate, new Date(ev.end?.dateTime || ev.start.dateTime) - 1));
              const sp = partsIn(tz, startDate);
              const ep = partsIn(tz, endDate);
              startKey = dayKey(sp.y, sp.m, sp.d);
              endKey = dayKey(ep.y, ep.m, ep.d);
            }
            if (endKey < startKey) endKey = startKey;
            const item = { summary: ev.summary, allDay, start: startDate, startKey, sort: allDay ? "" : startDate.toISOString() };
            for (let k = startKey, i = 0; k <= endKey && i < 62; k = addDays(k, 1), i++) {
              if (!map.has(k)) map.set(k, []);
              map.get(k).push(item);
            }
          }
        } catch (err) {
          error = true;
          console.warn(`HA95 Uhr: Kalender ${id} nicht lesbar`, err);
        }
      })
    );
    this._loading = "";
    if (month !== `${this._view.y}-${pad(this._view.m)}`) return this._loadEvents();
    this._events = map;
    this._error = error;
    this._loaded = month;
    this._loadedAt = Date.now();
    this._renderMonth();
  }

  _tick() {
    const root = this.shadowRoot;
    if (!root.querySelector(".clock")) return;
    const now = this._now();
    const today = dayKey(now.y, now.m, now.d);
    if (today !== this._today) {
      // Mitternacht: Markierung auf den neuen Tag, wenn der alte gewählt war
      const was = this._today;
      this._today = today;
      if (was === dayKey(this._view.y, this._view.m, this._selected)) {
        this._view = { y: now.y, m: now.m };
        this._selected = now.d;
      }
      this._renderMonth();
    }
    const rot = (sel, deg) => root.querySelector(sel).setAttribute("transform", `rotate(${deg.toFixed(2)})`);
    rot(".hour", ((now.h % 12) + now.min / 60) * 30);
    rot(".minute", (now.min + now.s / 60) * 6);
    rot(".second", now.s * 6);
    root.querySelector(".time input").value = `${pad(now.h)}:${pad(now.min)}:${pad(now.s)}`;
    // Termine alle fünf Minuten auffrischen
    if (this._calendars.length && Date.now() - this._loadedAt > 5 * 60 * 1000) this._loadEvents();
  }
}

// ---------- Dashboard-Karte ----------

class Ha95ClockCard extends HTMLElement {
  setConfig(config) {
    this._config = config || {};
    this._build();
  }
  set hass(hass) {
    this._hass = hass;
    if (this._dt) this._dt.hass = hass;
  }
  _build() {
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    const card = document.createElement("ha-card");
    if (this._config.title) card.header = this._config.title;
    this._dt = document.createElement("ha95-datetime");
    this._dt.calendars = this._config.calendars || this._config.calendar;
    this._dt.style.padding = this._config.title ? "0 8px 8px" : "8px";
    if (this._hass) this._dt.hass = this._hass;
    card.appendChild(this._dt);
    this.shadowRoot.replaceChildren(card);
  }
  getCardSize() {
    return this._config?.calendars || this._config?.calendar ? 9 : 7;
  }
  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: "auto" };
  }
  static getStubConfig() {
    return {};
  }
}

// ---------- Dialog ----------

const DIALOG_CSS = `
  :host {
    position: fixed; inset: 0; z-index: 10001;
    width: auto; height: auto; max-width: none; max-height: none;
    margin: 0; padding: 8px; border: none; box-sizing: border-box;
    display: flex; align-items: center; justify-content: center;
    background: rgba(0, 0, 0, 0.2);
    font-family: var(--ha95-font, Tahoma, sans-serif); font-size: 13px;
  }
  :host(:not(:popover-open)) { display: none; }
  .window {
    width: 440px; max-width: 100%; max-height: 100%; overflow: auto; padding: 3px;
    background: var(--ha95-face, #c0c0c0); color: var(--ha95-text, #000);
    box-shadow: var(--ha95-raised, inset -1px -1px #000, inset 1px 1px #fff);
  }
  .titlebar {
    display: flex; align-items: center; gap: 2px; padding: 2px 2px 2px 4px; font-weight: bold;
    background: var(--ha95-title-bar, #000080); color: var(--ha95-title-text, #fff);
  }
  .titlebar span { flex: 1; }
  .titlebar button {
    width: 16px; height: 14px; padding: 0; border: none; line-height: 12px; font: bold 12px/12px sans-serif;
    background: var(--ha95-face, #c0c0c0); color: var(--ha95-text, #000);
    box-shadow: var(--ha95-raised, inset -1px -1px #000, inset 1px 1px #fff);
  }
  .titlebar button:active { box-shadow: var(--ha95-sunken, inset 1px 1px #000); }
  ha95-datetime { padding: 8px 6px 0; }
  .buttons { display: flex; justify-content: flex-end; gap: 6px; padding: 10px 6px 6px; }
  .buttons button {
    min-width: 75px; height: 23px; border: none; font: inherit;
    background: var(--ha95-face, #c0c0c0); color: var(--ha95-text, #000);
    box-shadow: var(--ha95-raised, inset -1px -1px #000, inset 1px 1px #fff);
  }
  .buttons button.default { outline: 1px solid var(--ha95-dark, #000); }
  .buttons button:active { box-shadow: var(--ha95-sunken, inset 1px 1px #000); }
  .buttons button:focus-visible { outline: 1px dotted currentColor; outline-offset: -5px; }
  .buttons button[disabled] { color: var(--ha95-disabled, #808080); text-shadow: 1px 1px var(--ha95-highlight, #fff); }
`;

class Ha95DateTimeDialog extends HTMLElement {
  open({ calendars } = {}) {
    const hass = haRoot()?.hass;
    const s = tx(hass);
    const root = this.shadowRoot || this.attachShadow({ mode: "open" });
    root.innerHTML = `<style>${DIALOG_CSS}</style>
      <div class="window" role="dialog" aria-modal="true" aria-labelledby="t">
        <div class="titlebar"><span id="t">${s.title}</span>
          <button class="x" aria-label="${s.close}">×</button></div>
        <ha95-datetime></ha95-datetime>
        <div class="buttons">
          <button class="default ok">${s.ok}</button>
          <button class="cancel">${s.cancel}</button>
          <button disabled>${s.apply}</button>
        </div>
      </div>`;
    const dt = root.querySelector("ha95-datetime");
    dt.calendars = calendars;
    if (hass) dt.hass = hass;
    const close = () => this.remove();
    root.querySelector(".x").onclick = close;
    root.querySelector(".ok").onclick = close;
    root.querySelector(".cancel").onclick = close;
    this.addEventListener("keydown", (e) => e.key === "Escape" && close());
    // Klick neben das Fenster schließt
    this.addEventListener("click", (e) => e.composedPath()[0] === this && close());
    this.popover = "manual";
    layer().appendChild(this);
    this.showPopover?.();
    root.querySelector(".ok").focus();
  }
}

if (!customElements.get("ha95-datetime")) customElements.define("ha95-datetime", Ha95DateTime);
if (!customElements.get("ha95-clock-card")) {
  customElements.define("ha95-clock-card", Ha95ClockCard);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "ha95-clock-card",
    name: "HA95 Date/Time",
    description: "Windows 95 Date/Time Properties: calendar, analog clock, events",
  });
}
if (!customElements.get("ha95-datetime-dialog")) customElements.define("ha95-datetime-dialog", Ha95DateTimeDialog);

// Nur ein Dialog auf einmal
export function showDateTime(options) {
  [document, layer()].forEach((r) => r.querySelectorAll("ha95-datetime-dialog").forEach((d) => d.remove()));
  const dlg = document.createElement("ha95-datetime-dialog");
  dlg.open(options);
  return dlg;
}
window.ha95ShowDateTime ??= showDateTime;
