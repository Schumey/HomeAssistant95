/*
 * HA 95 – Feinschliff für Stellen, die das Theme nicht erreicht
 * Version: 4.0.0
 * Wird von der Integration HA 95 geladen (Option "Feinschliff").
 * Optional: Ohne das Modul bleibt das Design an wenigen Stellen unfertig
 * (Logbuch: Hinweisfeld, Kontrollkästchen, runde Symbole, Pfeilknöpfe beim
 * Zeitraum; überall: Scrollleisten im Windows-Look). Alles andere im Design
 * läuft ohne.
 *
 * 1. Scrollleisten: Windows-Look mit Pfeilknöpfen und gerastertem Schacht.
 *    Das geht nur mit ::-webkit-scrollbar, und das muss in jedem Shadow-Root
 *    stehen. Darum hängt das Modul ein Stylesheet an alle vorhandenen und
 *    alle künftigen Shadow-Roots (auch wenn Lit deren Liste neu setzt).
 * 2. Einzelne Bauteile (BAUTEIL_CSS): Regeln, die beim Anlegen des jeweiligen
 *    Bauteils in dessen Shadow-Root kommen (Suchfeld, Schiebeschalter,
 *    Symbolknöpfe, Zurück-Pfeil, Hauptknopf). Greift auch auf Fehlerseiten
 *    und in den Einstellungen, wohin das Theme keinen Pfad hat.
 * 3. Logbuch (siehe PANELS unten).
 *
 * Warum: UIX kennt für das Logbuch keinen Einstiegspunkt, die Bauteile
 * liegen tief in Shadow-Roots. Dieses Modul legt darum in die Shadow-Roots
 * der betroffenen Bauteile ein <style> mit Regeln, die die ha95-*-Variablen
 * des Designs nutzen (folgt also allen Farbschemata).
 *
 * Bewusst einfach: kein MutationObserver (der hat die Oberfläche schon
 * einmal eingefroren), sondern ein ruhiger Takt, der nur läuft, solange das
 * Logbuch offen ist. Neue Regeln für weitere Seiten: PANELS ergänzen.
 */

const TAKT = 800; // ms zwischen zwei Durchläufen

const KNOPF_OHNE_KREIS = `
  /* kein runder Hover-Kreis hinter dem eckigen Knopf */
  ha-button::after {
    display: none !important;
  }
`;

const PANELS = [
  {
    pfad: /^\/logbook(\/|$)/,
    host: "ha-panel-logbook",
    regeln: {
      // Hinweisfeld "Alle Aktivitäten werden angezeigt …" mit Rahmen
      "ha-sources-picker": `
        .description {
          box-sizing: border-box;
          padding: 8px 10px;
          background: var(--ha95-window);
          color: var(--ha95-window-text);
          box-shadow: var(--ha95-sunken);
        }
      `,
      // Pfeile beim Zeitraum und andere Symbolknöpfe
      "ha-icon-button": KNOPF_OHNE_KREIS,
      // Zeitraum-Auswahl: kein runder Außenrahmen um Pfeile und Datumsfeld
      "ha-date-range-nav": `
        .date-range-inputs {
          gap: 3px !important;
          overflow: visible !important;
          border: none !important;
          border-radius: 0 !important;
        }
        /* rechts schmilzt die helle Kante des Feldes mit der des Knopfs
           optisch zusammen, darum dort etwas mehr Luft */
        ha-icon-button-next {
          margin-inline-start: 2px;
        }
        .range {
          border-inline: none !important;
        }
      `,
      // Kontrollkästchen in den Filterlisten wie im Rest des Designs
      "ha-checkbox": `
        :host {
          --checked-icon-color: var(--ha95-window-text);
        }
        [part~="control"],
        [part~="control"]:has(:checked, :indeterminate) {
          width: 13px;
          height: 13px;
          border: none !important;
          border-radius: 0 !important;
          background: var(--ha95-window) !important;
          color: var(--ha95-window-text) !important;
          box-shadow: var(--ha95-sunken) !important;
        }
      `,
      // Zeitleiste: eckige statt runde Symbole
      "ha-logbook-entry": `
        .node-glyph,
        .node-glyph::before,
        .node-badge {
          border-radius: 0 !important;
        }
      `,
    },
  },
];

const haRoot = () => document.querySelector("home-assistant");

// Tiefensuche durch alle Shadow-Roots nach dem ersten Element mit diesem Tag
const finde = (root, tag) => {
  const direkt = root.querySelector(tag);
  if (direkt) return direkt;
  for (const el of root.querySelectorAll("*")) {
    if (el.shadowRoot) {
      const treffer = finde(el.shadowRoot, tag);
      if (treffer) return treffer;
    }
  }
  return null;
};

// Regeln in alle passenden Bauteile unterhalb von root einspielen
const einspielen = (root, regeln) => {
  for (const el of root.querySelectorAll("*")) {
    const sr = el.shadowRoot;
    if (!sr) continue;
    const css = regeln[el.localName];
    // Nicht nach ":scope" suchen: das hat die Oberfläche schon einmal eingefroren
    if (css && !sr.querySelector("style[data-ha95-panels]")) {
      const s = document.createElement("style");
      s.dataset.ha95Panels = "";
      s.textContent = css;
      sr.appendChild(s);
    }
    einspielen(sr, regeln);
  }
};

let panelEl = null;

const takt = () => {
  const panel = PANELS.find((p) => p.pfad.test(location.pathname));
  if (!panel) {
    panelEl = null;
    return;
  }
  if (!panelEl || !panelEl.isConnected || panelEl.localName !== panel.host) {
    const ha = haRoot();
    panelEl = ha?.shadowRoot ? finde(ha.shadowRoot, panel.host) : null;
  }
  if (panelEl?.shadowRoot) einspielen(panelEl.shadowRoot, panel.regeln);
};

if (!window.__ha95Panels) {
  window.__ha95Panels = setInterval(takt, TAKT);
}

// ---------------------------------------------------------------------
// Scrollleisten im Windows-Look
// ---------------------------------------------------------------------

// Pfeil aus 1-Pixel-Streifen, Farbe = Textfarbe des Designs
const pfeil = (richtung) => {
  const f = "linear-gradient(var(--ha95-text, #000), var(--ha95-text, #000))";
  const stufen = richtung === "up" || richtung === "left" ? [1, 3, 5, 7] : [7, 5, 3, 1];
  return stufen
    .map((n, i) => {
      const versatz = 7 - (n - 1) / 2;
      return richtung === "up" || richtung === "down"
        ? `${f} ${versatz}px ${6 + i}px / ${n}px 1px no-repeat`
        : `${f} ${6 + i}px ${versatz}px / 1px ${n}px no-repeat`;
    })
    .join(", ");
};

const SCROLL_CSS = `
  /* sonst schalten scrollbar-color/-width die ::-webkit-scrollbar-Regeln ab */
  * { scrollbar-color: auto !important; }
  .ha-scrollbar { scrollbar-width: auto !important; }
  ::-webkit-scrollbar {
    width: 16px !important;
    height: 16px !important;
    background-color: var(--ha95-light, #dfdfdf) !important;
  }
  ::-webkit-scrollbar-track {
    border-radius: 0 !important;
    background: conic-gradient(var(--ha95-window, #fff) 25%, var(--ha95-face, #c0c0c0) 0 50%, var(--ha95-window, #fff) 0 75%, var(--ha95-face, #c0c0c0) 0) 0 0 / 2px 2px !important;
  }
  ::-webkit-scrollbar-thumb {
    border: none !important;
    border-radius: 0 !important;
    background: var(--ha95-face, #c0c0c0) !important;
    box-shadow: var(--ha95-raised) !important;
  }
  ::-webkit-scrollbar-corner {
    background: var(--ha95-face, #c0c0c0) !important;
  }
  ::-webkit-scrollbar-button:single-button {
    display: block !important;
    width: 16px !important;
    height: 16px !important;
    background-color: var(--ha95-face, #c0c0c0) !important;
    background-repeat: no-repeat !important;
    box-shadow: var(--ha95-raised) !important;
  }
  ::-webkit-scrollbar-button:single-button:active {
    box-shadow: var(--ha95-sunken) !important;
  }
  ::-webkit-scrollbar-button:vertical:start:decrement { background: ${pfeil("up")}, var(--ha95-face, #c0c0c0) !important; }
  ::-webkit-scrollbar-button:vertical:end:increment { background: ${pfeil("down")}, var(--ha95-face, #c0c0c0) !important; }
  ::-webkit-scrollbar-button:horizontal:start:decrement { background: ${pfeil("left")}, var(--ha95-face, #c0c0c0) !important; }
  ::-webkit-scrollbar-button:horizontal:end:increment { background: ${pfeil("right")}, var(--ha95-face, #c0c0c0) !important; }
  ::-webkit-scrollbar-button:vertical:start:increment,
  ::-webkit-scrollbar-button:vertical:end:decrement,
  ::-webkit-scrollbar-button:horizontal:start:increment,
  ::-webkit-scrollbar-button:horizontal:end:decrement {
    display: none !important;
  }
`;

// Regeln für einzelne Bauteile, nach Tag des Bauteils (stehen in dessen eigenem
// Shadow-Root, also auch dort, wo kein UIX-Pfad hinkommt, z. B. Fehlerseiten)
const BAUTEIL_CSS = {
  // Zurück-Pfeil in Kopfleisten: klein und grau wie die anderen Knöpfe
  "ha-icon-button-arrow-prev": `
    :host {
      --ha-icon-button-size: 22px;
      --mdc-icon-size: 16px;
      --ha-button-box-shadow: none;
      display: inline-flex !important;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 22px;
      color: var(--ha95-text) !important;
      background: var(--ha95-face);
      box-shadow: var(--ha95-raised);
    }
    :host(:active) {
      box-shadow: var(--ha95-sunken);
    }
    /* Block statt Inline-Box: sonst sitzt der Pfeil um die Zeilenhöhe zu tief */
    ha-icon-button {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
    }
  `,
  // Gruppenüberschriften der Tabellen: etwas Luft zwischen Knopf und Text
  "ha-data-table": `
    .group-header ha-icon-button {
      margin-inline-end: 6px;
    }
  `,
  // Reiterzeile der Einstellungsseiten (Automationen, Szenen, …): Register-
  // karten statt Text mit Unterstrich; die aktive ist höher
  "hass-tabs-subpage": `
    .toolbar-content {
      padding: 0 6px !important;
      align-items: flex-end !important;
    }
    .toolbar-content ha-icon-button-arrow-prev {
      align-self: center;
    }
    #toolbar-icon {
      align-self: center;
    }
    #tabbar:not(.bottom-bar) {
      justify-content: flex-start;
      align-items: flex-end;
      align-self: stretch;
      margin-inline-start: 6px;
    }
    #tabbar > a {
      display: flex;
      align-items: flex-end;
      max-width: none;
    }
    .toolbar {
      box-shadow: inset 0 -1px var(--ha95-highlight);
      position: relative;
    }
    /* Blaue Titelleiste über der Reiterzeile: HA reserviert dafür oben Platz
       (--safe-area-inset-top), Toolbar und Inhalt rücken entsprechend nach unten */
    :host {
      --safe-area-inset-top: 24px;
    }
    .toolbar::before {
      content: var(--ha95-seitentitel, "Settings");
      position: absolute;
      top: 3px;
      left: 3px;
      right: 3px;
      height: 18px;
      box-sizing: border-box;
      padding: 0 60px 0 4px;
      background: var(--ha95-title-bar);
      color: var(--ha95-title-text);
      font-family: var(--ha95-font);
      font-size: 13px;
      font-weight: bold;
      line-height: 18px;
    }
    :host(:lang(de)) .toolbar::before {
      content: var(--ha95-seitentitel, "Einstellungen");
    }
    .toolbar::after {
      content: "";
      position: absolute;
      top: 4px;
      right: 5px;
      width: var(--ha95-title-buttons-width, 50px);
      height: 16px;
      background: var(--ha95-title-buttons) no-repeat;
    }
  `,
  "ha-tab": `
    :host {
      color: var(--ha95-text) !important;
      display: flex;
      align-items: flex-end;
    }
    div {
      box-sizing: border-box;
      width: auto;
      height: 24px;
      margin-bottom: 2px;
      padding: 0 10px !important;
      background: var(--ha95-face);
      color: var(--ha95-text);
      box-shadow: inset 1px 1px var(--ha95-highlight), inset 2px 2px var(--ha95-light), inset -1px 0 var(--ha95-dark), inset -2px 0 var(--ha95-shadow);
      clip-path: polygon(2px 0, calc(100% - 2px) 0, 100% 2px, 100% 100%, 0 100%, 0 2px);
    }
    :host([active]) {
      position: relative;
      z-index: 1;
      margin-inline: -2px;
    }
    :host([active]) div,
    :host(:not([narrow])[active]) div {
      height: 30px;
      margin-bottom: 0;
      padding: 0 12px 3px !important;
      border-bottom: none !important;
    }
    div:focus-visible::before {
      display: none;
    }
  `,
  // Reiterzeile unter der Titelleiste (Werkzeuge): nur für Gruppen im Unterzeilen-
  // Platz der Kopfleiste, damit die Dashboard-Reiter (UIX) unberührt bleiben
  "ha-tab-group": `
    :host([slot="subRow"]) {
      --track-width: 0px;
      --indicator-color: transparent;
    }
    :host([slot="subRow"]) .nav-container {
      padding: 0 !important;
    }
  `,
  // Dieselbe Registerkarten-Optik wie die Dashboard-Reiter (kopfleiste.css), hier
  // von innen, damit sie auch unter der Titelleiste (Werkzeuge) greift
  "ha-tab-group-tab": `
    :host {
      opacity: 1 !important;
      color: var(--ha95-text) !important;
      display: inline-flex !important;
      align-items: flex-end;
    }
    .tab {
      box-sizing: border-box;
      height: 24px;
      margin-bottom: 2px;
      padding: 0 10px;
      border: none;
      background: var(--ha95-face);
      color: var(--ha95-text) !important;
      font-weight: normal;
      box-shadow: inset 1px 1px var(--ha95-highlight), inset 2px 2px var(--ha95-light), inset -1px 0 var(--ha95-dark), inset -2px 0 var(--ha95-shadow);
      clip-path: polygon(2px 0, calc(100% - 2px) 0, 100% 2px, 100% 100%, 0 100%, 0 2px);
      transition: none;
    }
    :host([active]) {
      position: relative;
      z-index: 1;
      margin-inline: -2px;
    }
    :host([active]) .tab {
      height: 30px;
      margin-bottom: 0;
      padding: 0 12px 3px;
    }
  `,
  // Kontrollkästchen überall als Win95-Kästchen
  "ha-checkbox": `
    :host {
      --checked-icon-color: var(--ha95-window-text);
    }
    [part~="control"],
    [part~="control"]:has(:checked, :indeterminate) {
      width: 13px;
      height: 13px;
      border: none !important;
      border-radius: 0 !important;
      background: var(--ha95-window) !important;
      color: var(--ha95-window-text) !important;
      box-shadow: var(--ha95-sunken) !important;
    }
  `,
  // Werkzeuge → Zustände: Trennlinien zwischen den Entitäten
  "tools-state-renderer": `
    lit-virtualizer .row .cell {
      box-shadow: inset 0 -1px var(--ha95-shadow);
    }
  `,
  // Auswahlfelder (Aktion, Entität, Gerät, …): weißes, eingelassenes Feld mit 3D-Pfeil
  "ha-picker-field": `
    :host-context(ha-generic-picker) ha-combo-box-item {
      --md-list-item-one-line-container-height: 26px;
      --md-list-item-top-space: 0px;
      --md-list-item-bottom-space: 0px;
      --md-list-item-leading-space: 6px;
      --md-list-item-trailing-space: 22px;
      min-height: 0;
      border-radius: 0 !important;
      background: var(--ha95-window) !important;
      box-shadow: var(--ha95-sunken);
    }
    :host-context(ha-generic-picker) span[slot="headline"] {
      color: var(--ha95-window-text);
      font-family: var(--ha95-font);
      font-size: 13px;
      line-height: 22px;
    }
    :host-context(ha-generic-picker) .arrow {
      position: absolute;
      top: 2px;
      right: 2px;
      bottom: 2px;
      width: 16px !important;
      height: auto !important;
      margin: 0 !important;
      --mdc-icon-size: 16px;
      background: var(--ha95-face);
      box-shadow: var(--ha95-raised);
      color: var(--ha95-text) !important;
    }
    /* mit Beschriftung im Feld (zwei Zeilen): nicht 56 px hoch, der Pfeil
       bleibt ein kleiner Knopf statt eines hohen Streifens */
    :host-context(ha-generic-picker) ha-combo-box-item {
      --md-list-item-two-line-container-height: 40px;
      --md-list-item-trailing-space: 44px;
    }
    :host-context(ha-generic-picker) .arrow {
      top: 50% !important;
      bottom: auto !important;
      height: 22px !important;
      transform: translateY(-50%);
    }
    /* Löschen-Knopf (×): klein und ohne eigenen Rahmen, links vom Pfeil */
    :host-context(ha-generic-picker) ha-icon-button.clear {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      display: block;
      width: 16px;
      height: 16px;
      --ha-icon-button-size: 16px;
      --mdc-icon-size: 12px;
      --ha-button-box-shadow: none;
      color: var(--ha95-window-text);
    }
  `,
  // Auswahlfenster der Felder: Rahmen wie ein Win95-Menü
  "ha-generic-picker": `
    wa-popover::part(dialog),
    wa-popover::part(body) {
      border-radius: 0 !important;
    }
    wa-popover::part(body) {
      border: none !important;
      background: var(--ha95-face) !important;
      box-shadow: var(--ha95-frame) !important;
    }
  `,
  // Liste im Auswahlfenster (wie das Ausführen-Fenster): Bereiche als Knöpfe,
  // eingelassenes Listenfeld, eckige Symbole, Pixel-Schrift
  "ha-picker-combo-box": `
    .sections {
      margin: 8px 8px 4px !important;
      padding: 0 !important;
      gap: 4px !important;
    }
    .sections .separator {
      display: none;
    }
    ha-filter-chip::part(base) {
      height: 23px;
      border: none !important;
      border-radius: 0 !important;
      background: var(--ha95-face) !important;
      color: var(--ha95-text) !important;
      box-shadow: var(--ha95-raised) !important;
      transition: none;
    }
    ha-filter-chip[selected]::part(base) {
      background: var(--ha95-light) !important;
      box-shadow: var(--ha95-sunken) !important;
    }
    .section-title-wrapper {
      background: var(--ha95-face) !important;
      color: var(--ha95-text-dim) !important;
    }
    .list-wrapper {
      margin: 4px 8px 8px !important;
      padding: 2px;
      background: var(--ha95-window);
      box-shadow: var(--ha95-sunken);
    }
    .title,
    .section-title,
    .section-title-wrapper {
      font-family: var(--ha95-font) !important;
      font-size: 13px !important;
      font-weight: bold !important;
      letter-spacing: 0 !important;
      color: var(--ha95-text) !important;
    }
    ha-combo-box-item {
      border-radius: 0 !important;
      font-family: var(--ha95-font);
    }
    ha-combo-box-item [slot="headline"],
    ha-combo-box-item [slot="supporting-text"] {
      font-family: var(--ha95-font) !important;
      font-size: 13px;
    }
    ha-combo-box-item div[slot="start"] {
      border-radius: 0 !important;
      padding: 3px !important;
    }
    ha-combo-box-item[selected],
    ha-combo-box-item:hover,
    ha-combo-box-item:focus-visible {
      background: var(--ha95-select) !important;
      color: var(--ha95-select-text) !important;
      --md-list-item-label-text-color: var(--ha95-select-text);
      --md-list-item-supporting-text-color: var(--ha95-select-text);
      --md-list-item-trailing-supporting-text-color: var(--ha95-select-text);
      --mdc-icon-color: var(--ha95-select-text);
    }
  `,
  // Hinweisfeld in der Filterspalte (Logbuch, Verlauf): eingelassen mit Rahmen
  "ha-sources-picker": `
    .description {
      box-sizing: border-box;
      padding: 8px 10px;
      background: var(--ha95-window);
      color: var(--ha95-window-text);
      box-shadow: var(--ha95-sunken);
    }
  `,
  // Helligkeitsregler im Dialog: waagerecht statt als hohe Säule (die Drehung
  // selbst erledigt schieberDrehen unten, hier nur die Maße)
  "ha-state-control-light-brightness": `
    :host {
      display: block;
      width: 260px;
      max-width: 100%;
    }
    ha-control-slider {
      --control-slider-thickness: 48px;
      width: 100% !important;
      height: 48px !important;
      min-height: 0 !important;
      max-height: none !important;
    }
  `,
  // Symbolknöpfe: kein runder Hover-Kreis hinter dem eckigen Knopf
  "ha-icon-button": `
    ha-button::after {
      display: none !important;
    }
    /* Knopf als Block statt Inline-Box: sonst macht die Zeilenhöhe den Knopf
       höher als sein Rahmen und das Symbol sitzt zu tief */
    ha-button {
      display: block;
    }
    ha-button::part(base) {
      display: flex !important;
      align-items: center;
      justify-content: center;
      vertical-align: top !important;
    }
    /* Licht-Karte: das Symbol in der Mitte des runden Reglers ohne Rahmen */
    :host(.light-button) ha-button::part(base) {
      box-shadow: none !important;
      background: transparent !important;
    }
    /* ausgegraute Knöpfe (z. B. Rückgängig/Wiederholen): graues Symbol mit
       weißem Schatten wie eingeprägte Schrift, sonst unsichtbar auf Grau */
    :host([disabled]) ha-svg-icon {
      color: var(--ha95-shadow) !important;
      filter: drop-shadow(1px 1px 0 var(--ha95-highlight));
    }
    /* Hilfe-Knopf rechts in der Reiterzeile der Einstellungsseiten und in
       der Symbolleiste von Dialogen (z. B. "Karte bearbeiten") */
    :host([slot="toolbar-icon"]),
    :host([slot="headerActionItems"]) {
      --ha-icon-button-size: 22px;
      --mdc-icon-size: 16px;
      --ha-button-box-shadow: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 22px;
      color: var(--ha95-text);
      background: var(--ha95-face);
      box-shadow: var(--ha95-raised);
    }
    :host([slot="toolbar-icon"]) ha-button,
    :host([slot="headerActionItems"]) ha-button {
      display: block;
    }
    /* Schließen-Knopf jedes Dialogs (ha-dialog, ha-adaptive-dialog,
       ha-dialog-header): 16 x 16 wie überall, auch in Dialogen, für die es
       keine eigene Theme-Regel gibt */
    :host([data-dialog="close"]),
    :host([slot="headerNavigationIcon"]) {
      --ha-icon-button-size: 16px;
      --mdc-icon-size: 10px;
      --ha-button-box-shadow: none;
      display: inline-flex !important;
      align-items: center;
      justify-content: center;
      width: 16px !important;
      height: 16px !important;
      color: var(--ha95-text) !important;
      background: var(--ha95-face);
      box-shadow: var(--ha95-raised);
    }
    :host([data-dialog="close"]) ha-button,
    :host([slot="headerNavigationIcon"]) ha-button,
    :host([data-dialog="close"]) ha-button::part(base),
    :host([slot="headerNavigationIcon"]) ha-button::part(base) {
      width: 100% !important;
      height: 100% !important;
      min-height: 0 !important;
      padding: 0 !important;
      border-radius: 0 !important;
    }
  `,
  // Hauptknopf (z. B. "Automation erstellen"): 3D-Rahmen statt weichem Schatten
  "ha-button": `
    :host([appearance="accent"]) .button {
      border-radius: 0 !important;
      box-shadow: var(--ha95-raised) !important;
    }
  `,
  // Suchfeld (Einstellungslisten): weiß, eingelassen, Pixel-Schrift
  "ha-input-search": `
    wa-input::part(base) {
      background: var(--ha95-window) !important;
      border: none !important;
      border-radius: 0 !important;
      box-shadow: var(--ha95-sunken) !important;
    }
    wa-input::part(base)::after {
      display: none !important;
    }
    wa-input,
    wa-input::part(base),
    wa-input::part(input) {
      font-family: var(--ha95-font) !important;
      font-size: 13px !important;
    }
  `,
  // Schiebeschalter als Win95-Kontrollkästchen (wie in den Entitätszeilen)
  "ha-switch": `
    .switch {
      width: 13px !important;
      height: 13px !important;
      border: none !important;
      border-radius: 0 !important;
      background: var(--ha95-window) !important;
      box-shadow: var(--ha95-sunken) !important;
      transition: none !important;
    }
    .switch .thumb {
      display: none !important;
    }
    .checked .switch::after {
      content: "";
      position: absolute;
      left: 3px;
      top: 3px;
      width: 7px;
      height: 7px;
      background: var(--ha95-window-text);
      -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='7' height='7' shape-rendering='crispEdges'%3E%3Cpath d='M6 0h1v1H6zM5 1h2v1H5zM0 2h1v1H0zM4 2h3v1H4zM0 3h2v1H0zM3 3h3v1H3zM0 4h5v1H0zM1 5h3v1H1zM2 6h1v1H2z'/%3E%3C/svg%3E") no-repeat;
      mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='7' height='7' shape-rendering='crispEdges'%3E%3Cpath d='M6 0h1v1H6zM5 1h2v1H5zM0 2h1v1H0zM4 2h3v1H4zM0 3h2v1H0zM3 3h3v1H3zM0 4h5v1H0zM1 5h3v1H1zM2 6h1v1H2z'/%3E%3C/svg%3E") no-repeat;
    }
    label.disabled .switch {
      opacity: 1 !important;
      background: var(--ha95-face) !important;
    }
    label.disabled.checked .switch::after {
      background: var(--ha95-disabled);
    }
  `,
};

// Regler, die der Dialog senkrecht anlegt und die hier waagerecht werden
const SCHIEBER_WAAGERECHT = new Set(["ha-state-control-light-brightness"]);

// "vertical" entfernen, sobald der Regler da ist (er wird erst nach dem ersten
// Rendern eingefügt, darum ein paar Bildwiederholungen lang nachsehen)
const schieberDrehen = (root, versuche = 120) => {
  const regler = root.querySelector("ha-control-slider[vertical]");
  if (regler) {
    regler.removeAttribute("vertical");
    regler.vertical = false;
    return;
  }
  if (versuche > 0) requestAnimationFrame(() => schieberDrehen(root, versuche - 1));
};

const startScrollleisten = () => {
  if (window.__ha95Scroll) return;
  window.__ha95Scroll = true;
  const blatt = new CSSStyleSheet();
  blatt.replaceSync(SCROLL_CSS);
  const bauteilBlaetter = {};
  for (const [tag, css] of Object.entries(BAUTEIL_CSS)) {
    bauteilBlaetter[tag] = new CSSStyleSheet();
    bauteilBlaetter[tag].replaceSync(css);
  }
  // Welche Blätter gehören an diesen Shadow-Root (Dokument: nur die Scrollleisten)?
  const benoetigt = (root) => {
    const eigenes = bauteilBlaetter[root.host?.localName];
    return eigenes ? [blatt, eigenes] : [blatt];
  };
  const ergaenzt = (root, liste) => {
    const fehlt = benoetigt(root).filter((b) => !liste.includes(b));
    return fehlt.length ? [...liste, ...fehlt] : liste;
  };
  const beschreibung = Object.getOwnPropertyDescriptor(ShadowRoot.prototype, "adoptedStyleSheets");
  const anhaengen = (root) => {
    const liste = root.adoptedStyleSheets;
    const neu = ergaenzt(root, liste);
    if (neu !== liste) root.adoptedStyleSheets = neu;
  };
  // Künftige Shadow-Roots: gleich beim Anlegen, und wenn Lit die Liste neu setzt
  if (beschreibung?.set) {
    Object.defineProperty(ShadowRoot.prototype, "adoptedStyleSheets", {
      configurable: true,
      enumerable: beschreibung.enumerable,
      get() {
        return beschreibung.get.call(this);
      },
      set(liste) {
        beschreibung.set.call(this, ergaenzt(this, liste));
      },
    });
    const anlegen = Element.prototype.attachShadow;
    Element.prototype.attachShadow = function (...args) {
      const root = anlegen.apply(this, args);
      if (SCHIEBER_WAAGERECHT.has(this.localName)) schieberDrehen(root);
      try {
        anhaengen(root);
      } catch (e) {
        /* geschlossene oder gesperrte Roots einfach auslassen */
      }
      return root;
    };
  }
  // Vorhandene Shadow-Roots einmal durchgehen
  const durchgehen = (root) => {
    anhaengen(root);
    for (const el of root.querySelectorAll("*")) if (el.shadowRoot) durchgehen(el.shadowRoot);
  };
  try {
    durchgehen(document);
  } catch (e) {
    console.warn("ha95-panels: Scrollleisten konnten nicht überall angelegt werden", e);
  }
};

startScrollleisten();

// ---------------------------------------------------------------------
// Titel der Einstellungsseiten: wie die Kacheln auf dem Einstellungs-Dashboard
// ---------------------------------------------------------------------

// Pfad-Anfang unter /config/ -> [deutsch, englisch]
const SEITEN = [
  [/^(cloud)(\/|$)/, "Home Assistant Cloud", "Home Assistant Cloud"],
  [/^(integrations|devices|entities|helpers)(\/|$)/, "Geräte & Dienste", "Devices & services"],
  [/^(automation|scene|script|blueprint)(\/|$)/, "Automationen & Szenen", "Automations & scenes"],
  [/^(areas|labels|zone)(\/|$)/, "Bereiche, Labels & Zonen", "Areas, labels & zones"],
  [/^(apps|app)(\/|$)/, "Apps", "Apps"],
  [/^(lovelace)(\/|$)/, "Dashboards", "Dashboards"],
  [/^(connectivity|network|bluetooth|zha|zwave_js|matter|thread)(\/|$)/, "Konnektivität", "Connectivity"],
  [/^(voice-assistants)(\/|$)/, "Sprachassistenten", "Voice assistants"],
  [/^(person|users)(\/|$)/, "Personen", "People"],
  [/^(system|backup|logs|hardware|updates|analytics|storage)(\/|$)/, "System", "System"],
  [/^(tools)(\/|$)/, "Werkzeuge", "Tools"],
  [/^(info)(\/|$)/, "Über", "About"],
];

const setzeSeitentitel = () => {
  const wurzel = document.documentElement;
  const treffer = location.pathname.match(/^\/config\/(.*)$/);
  const eintrag = treffer && SEITEN.find(([muster]) => muster.test(treffer[1]));
  if (!eintrag) {
    wurzel.style.removeProperty("--ha95-seitentitel");
    return;
  }
  const deutsch = (wurzel.lang || navigator.language || "").toLowerCase().startsWith("de");
  wurzel.style.setProperty("--ha95-seitentitel", JSON.stringify(deutsch ? eintrag[1] : eintrag[2]));
};

if (!window.__ha95Titel) {
  window.__ha95Titel = true;
  window.addEventListener("location-changed", () => setTimeout(setzeSeitentitel, 0));
  window.addEventListener("popstate", () => setTimeout(setzeSeitentitel, 0));
  setzeSeitentitel();
}
