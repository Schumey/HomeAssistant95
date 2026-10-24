/*
 * HA 95 – Solitaire für Home Assistant
 * Version: 4.7.0
 * Wird von der Integration HA 95 geladen (Option "Solitaire").
 *
 * Öffnen:
 *   Startmenü:     { "name": "Solitaire", "action": "solitaire" }
 *   Eigener Code:  window.ha95ShowSolitaire()
 * Bedienung: Karte anklicken (wählt sie samt der Karten darauf), dann das Ziel
 * anklicken. Doppelklick auf eine Karte legt sie auf die Ablage, Klick auf den
 * Stapel zieht neue Karten. Siege und Bestzeit stehen im Browser (localStorage).
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
    title: "Solitaire",
    draw1: "Eine Karte",
    draw3: "Drei Karten",
    won: "Gewonnen!",
    new: "Neues Spiel",
    undo: "Rückgängig",
    close: "Schließen",
    moves: "Züge",
    time: "Zeit",
    wins: "Siege",
    best: "Bestzeit",
    s: "s",
  },
  en: {
    title: "Solitaire",
    draw1: "Draw one",
    draw3: "Draw three",
    won: "You won!",
    new: "New game",
    undo: "Undo",
    close: "Close",
    moves: "Moves",
    time: "Time",
    wins: "Wins",
    best: "Best time",
    s: "s",
  },
};
const lang = (hass) => (hass?.locale?.language || hass?.language || navigator.language || "en").slice(0, 2);
const tx = (hass) => TEXT[lang(hass)] || TEXT.en;

const SUITS = ["♠︎", "♥︎", "♦︎", "♣︎"];
const RANKS = ["", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const red = (c) => c.s === 1 || c.s === 2;

const store = {
  read() {
    try {
      return JSON.parse(localStorage.getItem("ha95-solitaire") || "{}");
    } catch {
      return {};
    }
  },
  write(data) {
    try {
      localStorage.setItem("ha95-solitaire", JSON.stringify(data));
    } catch {
      // Speichern ist nur ein Extra
    }
  },
};

const CSS = `
  :host {
    position: fixed; inset: 0; z-index: 10001;
    width: auto; height: auto; max-width: none; max-height: none;
    margin: 0; padding: 8px; border: none; box-sizing: border-box;
    display: flex; align-items: center; justify-content: center;
    background: rgba(0, 0, 0, 0.2);
    font-family: var(--ha95-font, Tahoma, sans-serif); font-size: 13px;
    -webkit-font-smoothing: none;
  }
  :host(:not(:popover-open)) { display: none; }
  *, *::before, *::after { box-sizing: border-box; }
  .window {
    max-width: 100%; max-height: 100%; overflow: auto; padding: 3px;
    background: var(--ha95-face, #c0c0c0); color: var(--ha95-text, #000);
    box-shadow: var(--ha95-raised, inset -1px -1px #000, inset 1px 1px #fff);
  }
  .titlebar {
    display: flex; align-items: center; gap: 2px; padding: 2px 2px 2px 4px; font-weight: bold;
    background: var(--ha95-title-bar, #000080); color: var(--ha95-title-text, #fff);
  }
  .titlebar span { flex: 1; }
  .titlebar button {
    width: 16px; height: 14px; padding: 0; border: none; font: bold 12px/12px sans-serif;
    background: var(--ha95-face, #c0c0c0); color: var(--ha95-text, #000);
    box-shadow: var(--ha95-raised, inset -1px -1px #000, inset 1px 1px #fff);
  }
  .bar { display: flex; gap: 2px; padding: 3px 2px; flex-wrap: wrap; }
  .bar button {
    border: none; background: none; font: inherit; color: inherit; padding: 1px 6px; cursor: default;
  }
  .bar button[aria-pressed="true"] { background: var(--ha95-select, #000080); color: var(--ha95-select-text, #fff); }
  .bar button:disabled { color: var(--ha95-disabled, #808080); }
  .table {
    position: relative; margin: 3px; padding: 8px; background: #008000; user-select: none;
    touch-action: none; -webkit-tap-highlight-color: transparent;
    box-shadow: var(--ha95-sunken, inset 1px 1px #808080, inset -1px -1px #fff);
  }
  .row { position: relative; height: calc(var(--h) + 4px); margin-bottom: 8px; }
  .tab { position: relative; }
  .slot, .card {
    position: absolute; width: var(--w); height: var(--h); border-radius: 3px;
  }
  .slot { border: 1px solid #004000; background: rgba(0, 0, 0, 0.12); }
  .slot.recycle::after {
    content: "\\21BB"; position: absolute; inset: 0; display: grid; place-items: center;
    color: #9c9; font-size: calc(var(--w) * 0.5);
  }
  .slot.ace::after {
    content: "A"; position: absolute; inset: 0; display: grid; place-items: center;
    color: #5a5; font: bold calc(var(--w) * 0.45) sans-serif;
  }
  .card {
    background: #fff; border: 1px solid #000; overflow: hidden;
    font-family: "Segoe UI Symbol", Arial, sans-serif; font-weight: bold; line-height: 1;
  }
  .card.red { color: #e00000; }
  .card.black { color: #000; }
  .card .corner { position: absolute; left: 3px; top: 2px; font-size: calc(var(--w) * 0.27); text-align: center; }
  .card .corner i { display: block; font-style: normal; }
  .card .big {
    position: absolute; right: 0; bottom: 0; left: 0; text-align: center;
    font-size: calc(var(--w) * 0.55); padding-bottom: calc(var(--h) * 0.06);
  }
  .card.down {
    background: #0000a8 repeating-linear-gradient(45deg, #fff 0 1px, transparent 1px 4px);
    box-shadow: inset 0 0 0 2px #fff;
  }
  .card.down * { display: none; }
  .card.sel { background: #9fb4ff; box-shadow: 0 0 0 2px #000080; }
  .status { padding: 4px 6px 2px; min-height: 22px; }
  .status b { font-weight: bold; }
`;

class Ha95Solitaire extends HTMLElement {
  open() {
    this._hass = haRoot()?.hass;
    this._s = tx(this._hass);
    const saved = store.read();
    this._draw3 = saved.draw === 3;
    this._root = this.shadowRoot || this.attachShadow({ mode: "open" });
    this._root.innerHTML = `<style>${CSS}</style>
      <div class="window" role="dialog" aria-modal="true" aria-labelledby="t">
        <div class="titlebar"><span id="t">${this._s.title}</span>
          <button class="x" aria-label="${this._s.close}">×</button></div>
        <div class="bar">
          <button data-do="new">${this._s.new}</button>
          <button data-do="undo">${this._s.undo}</button>
          <button data-draw="1">${this._s.draw1}</button>
          <button data-draw="3">${this._s.draw3}</button>
        </div>
        <div class="table"></div>
        <div class="status" aria-live="polite"></div>
      </div>`;
    const close = () => {
      this._stopTimer();
      this.remove();
    };
    this._root.querySelector(".x").onclick = close;
    this.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
      if (e.key === "F2") this._reset();
    });
    this.addEventListener("click", (e) => e.composedPath()[0] === this && close());
    this._root.querySelector(".bar").onclick = (e) => {
      const b = e.target.closest("button");
      if (!b || b.disabled) return;
      if (b.dataset.do === "new") this._reset();
      if (b.dataset.do === "undo") this._undo();
      if (b.dataset.draw) {
        this._draw3 = b.dataset.draw === "3";
        store.write({ ...store.read(), draw: this._draw3 ? 3 : 1 });
        this._reset();
      }
    };
    const table = this._root.querySelector(".table");
    // Klick und Ziehen laufen beide über Zeiger-Ereignisse: ein Klick, bei dem die
    // Maus zwischen Drücken und Loslassen das Element wechselt, ginge sonst verloren
    table.onpointerdown = (e) => this._pdown(e);
    table.onpointermove = (e) => this._pmove(e);
    table.onpointerup = (e) => this._pup(e);
    table.onpointercancel = () => this._pend();
    table.oncontextmenu = (e) => e.preventDefault();
    this.popover = "manual";
    layer().appendChild(this);
    this.showPopover?.();
    this._reset();
  }

  _reset() {
    this._stopTimer();
    const deck = [];
    for (let s = 0; s < 4; s++) for (let r = 1; r <= 13; r++) deck.push({ s, r, up: false });
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    this._tab = Array.from({ length: 7 }, (_, i) => {
      const pile = deck.splice(0, i + 1);
      pile[i].up = true;
      return pile;
    });
    this._stock = deck;
    this._waste = [];
    this._found = [[], [], [], []];
    this._sel = null;
    this._history = [];
    this._moves = 0;
    this._seconds = 0;
    this._over = false;
    this._root.querySelectorAll("[data-draw]").forEach((b) => b.setAttribute("aria-pressed", (b.dataset.draw === "3") === this._draw3));
    this._status();
    this._draw();
  }

  // Zeit läuft erst ab dem ersten Zug
  _startTimer() {
    if (this._timer || this._over) return;
    this._timer = setInterval(() => {
      this._seconds++;
      this._status();
    }, 1000);
  }

  _stopTimer() {
    clearInterval(this._timer);
    this._timer = null;
  }

  _snapshot() {
    this._history.push(JSON.stringify([this._tab, this._stock, this._waste, this._found, this._moves]));
    if (this._history.length > 200) this._history.shift();
  }

  _undo() {
    const last = this._history.pop();
    if (!last || this._over) return;
    [this._tab, this._stock, this._waste, this._found, this._moves] = JSON.parse(last);
    this._sel = null;
    this._draw();
  }

  _pile(zone, i) {
    return zone === "t" ? this._tab[i] : zone === "f" ? this._found[i] : zone === "waste" ? this._waste : this._stock;
  }

  _canTab(card, pile) {
    const top = pile[pile.length - 1];
    if (!top) return card.r === 13;
    return top.up && red(top) !== red(card) && top.r === card.r + 1;
  }

  _canFound(card, pile) {
    const top = pile[pile.length - 1];
    return top ? top.s === card.s && top.r + 1 === card.r : card.r === 1;
  }

  _pdown(e) {
    if (e.button > 0 || this._over) return;
    this._pd = { x: e.clientX, y: e.clientY, target: e.target, ghosts: null };
  }

  _pmove(e) {
    const pd = this._pd;
    if (!pd) return;
    if (!pd.ghosts) {
      if (Math.hypot(e.clientX - pd.x, e.clientY - pd.y) < 6) return;
      this._dragStart(pd, e);
      if (!pd.ghosts) return;
    }
    const dx = e.clientX - pd.x;
    const dy = e.clientY - pd.y;
    pd.ghosts.forEach((g) => (g.style.transform = `translate(${dx}px, ${dy}px)`));
  }

  // Ziehen: Karten (mit allen darauf) als Kopie am Zeiger, Originale ausgeblendet
  _dragStart(pd, e) {
    const el = pd.target.closest?.("[data-zone]");
    const zone = el?.dataset.zone;
    if (!el || el.dataset.idx === undefined || !["waste", "t", "f"].includes(zone)) return;
    const pile = Number(el.dataset.pile);
    const idx = Number(el.dataset.idx);
    if (!this._pile(zone, pile)[idx]?.up) return;
    if (zone === "waste" && idx !== this._waste.length - 1) return;
    pd.from = { zone, pile, idx };
    const table = this._root.querySelector(".table");
    const cards = [...table.querySelectorAll(`.card[data-zone="${zone}"][data-pile="${pile}"]`)].filter((c) => Number(c.dataset.idx) >= idx);
    pd.ghosts = cards.map((c) => {
      const r = c.getBoundingClientRect();
      const g = c.cloneNode(true);
      g.style.cssText = `position:fixed;left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;z-index:50;pointer-events:none;`;
      g.classList.remove("sel");
      c.style.visibility = "hidden";
      return g;
    });
    pd.ghosts.forEach((g) => table.appendChild(g));
    try {
      table.setPointerCapture(e.pointerId);
    } catch {
      // ohne Capture geht es auch, solange der Zeiger im Fenster bleibt
    }
  }

  _pup(e) {
    const pd = this._pd;
    if (!pd) return;
    if (!pd.ghosts) {
      this._pend();
      return this._click({ target: pd.target });
    }
    const hit = this._root.elementsFromPoint(e.clientX, e.clientY).find((n) => n.dataset?.zone === "t" || n.dataset?.zone === "f");
    const from = pd.from;
    this._pend();
    this._sel = null;
    if (!hit || !this._move(from, hit.dataset.zone, Number(hit.dataset.pile))) this._draw();
  }

  _pend() {
    this._pd?.ghosts?.forEach((g) => g.remove());
    this._pd = null;
  }

  _click(e) {
    if (this._over) return;
    const el = e.target.closest("[data-zone]");
    if (!el) return this._select(null);
    const zone = el.dataset.zone;
    const i = Number(el.dataset.pile || 0);
    const idx = el.dataset.idx === undefined ? -1 : Number(el.dataset.idx);

    if (zone === "stock") return this._deal();

    // Zweiter Klick auf dieselbe Karte kurz danach: auf die Ablage legen
    const key = `${zone}:${i}:${idx}`;
    const double = this._last?.key === key && Date.now() - this._last.at < 400;
    this._last = { key, at: Date.now() };

    if (this._sel) {
      const sel = this._sel;
      if (sel.zone === zone && sel.pile === i && sel.idx === idx) {
        if (double && this._autoFound(sel)) return;
        return this._select(null);
      }
      if (this._move(sel, zone, i)) return;
    }
    const pile = this._pile(zone, i);
    const card = idx >= 0 ? pile[idx] : null;
    if (!card?.up) return this._select(null);
    const from = { zone, pile: i, idx };
    if (double && this._autoFound(from)) return;
    this._select(from);
  }

  _select(sel) {
    this._sel = sel;
    this._draw();
  }

  _deal() {
    this._snapshot();
    this._startTimer();
    this._sel = null;
    if (this._stock.length) {
      for (let k = 0; k < (this._draw3 ? 3 : 1) && this._stock.length; k++) {
        const c = this._stock.pop();
        c.up = true;
        this._waste.push(c);
      }
    } else if (this._waste.length) {
      this._stock = this._waste.reverse();
      this._stock.forEach((c) => (c.up = false));
      this._waste = [];
    } else {
      this._history.pop();
      return;
    }
    this._moves++;
    this._draw();
  }

  // Karte (nur die oberste) auf die Ablage legen, wenn sie passt
  _autoFound(from) {
    const pile = this._pile(from.zone, from.pile);
    if (from.idx !== pile.length - 1 || from.zone === "f") return false;
    const card = pile[from.idx];
    const target = this._found.findIndex((f) => this._canFound(card, f));
    return target >= 0 && this._move(from, "f", target);
  }

  _move(from, zone, i) {
    if (zone !== "t" && zone !== "f") return false;
    const src = this._pile(from.zone, from.pile);
    const cards = src.slice(from.idx);
    if (!cards.length) return false;
    const dest = this._pile(zone, i);
    if (zone === "f" ? cards.length !== 1 || !this._canFound(cards[0], dest) : !this._canTab(cards[0], dest)) return false;
    this._snapshot();
    this._startTimer();
    src.length = from.idx;
    dest.push(...cards);
    const top = src[src.length - 1];
    if (top && !top.up) top.up = true;
    this._moves++;
    this._sel = null;
    this._last = null;
    if (this._found.every((f) => f.length === 13)) this._win();
    this._draw();
    return true;
  }

  _win() {
    this._over = true;
    this._stopTimer();
    window.ha95Sound?.("win");
    const saved = store.read();
    const best = saved.best;
    const wins = (saved.wins || 0) + 1;
    store.write({ ...saved, wins, best: !best || this._seconds < best ? this._seconds : best });
    this._status(`<b>${this._s.won}</b> ${this._seconds} ${this._s.s}`);
  }

  _status(html) {
    const saved = store.read();
    const info = [`${this._s.time}: ${this._seconds} ${this._s.s}`, `${this._s.moves}: ${this._moves}`];
    if (saved.wins) info.push(`${this._s.wins}: ${saved.wins}`);
    if (saved.best) info.push(`${this._s.best}: ${saved.best} ${this._s.s}`);
    this._root.querySelector(".status").innerHTML = html || info.join(" · ");
  }

  _draw() {
    const table = this._root.querySelector(".table");
    // Kartengröße nach Breite des Bildschirms, sieben Spalten plus Rand
    const w = Math.max(34, Math.min(71, Math.floor((window.innerWidth - 80) / 7) - 6));
    const h = Math.round(w * 1.4);
    const gap = Math.max(4, Math.round(w / 8));
    const downStep = Math.round(h * 0.14);
    const upStep = Math.round(h * 0.3);
    const colX = (n) => n * (w + gap);
    table.style.setProperty("--w", `${w}px`);
    table.style.setProperty("--h", `${h}px`);
    table.style.width = `${7 * w + 6 * gap + 16}px`;

    const sel = this._sel;
    const isSel = (zone, pile, idx) => sel && sel.zone === zone && sel.pile === pile && idx >= sel.idx;
    const card = (c, left, top, zone, pile, idx) =>
      `<div class="card ${c.up ? (red(c) ? "red" : "black") : "down"}${isSel(zone, pile, idx) ? " sel" : ""}"
        style="left:${left}px;top:${top}px" data-zone="${zone}" data-pile="${pile}" data-idx="${idx}">${
          c.up ? `<span class="corner"><i>${RANKS[c.r]}</i><i>${SUITS[c.s]}</i></span><span class="big">${SUITS[c.s]}</span>` : ""
        }</div>`;

    // Obere Reihe: Stapel, Ablage (Waste) und vier Zielstapel
    let top = `<div class="slot${this._stock.length ? "" : " recycle"}" style="left:0" data-zone="stock"></div>`;
    if (this._stock.length) top += card({ up: false, s: 0, r: 0 }, 0, 0, "stock", 0, 0);
    const shown = this._draw3 ? this._waste.slice(-3) : this._waste.slice(-1);
    const base = this._waste.length - shown.length;
    top += `<div class="slot" style="left:${colX(1)}px"></div>`;
    shown.forEach((c, k) => {
      top += card(c, colX(1) + k * Math.round(w * 0.22), 0, "waste", 0, base + k);
    });
    this._found.forEach((f, n) => {
      const x = colX(3 + n);
      top += `<div class="slot ace" style="left:${x}px" data-zone="f" data-pile="${n}"></div>`;
      if (f.length) top += card(f[f.length - 1], x, 0, "f", n, f.length - 1);
    });

    // Sieben Spalten
    let cols = "";
    let tallest = 0;
    this._tab.forEach((pile, n) => {
      const x = colX(n);
      cols += `<div class="slot" style="left:${x}px;top:0" data-zone="t" data-pile="${n}"></div>`;
      let y = 0;
      pile.forEach((c, k) => {
        cols += card(c, x, y, "t", n, k);
        y += c.up ? upStep : downStep;
      });
      tallest = Math.max(tallest, y - (pile.length ? (pile[pile.length - 1].up ? upStep : downStep) : 0) + h);
    });
    table.innerHTML = `<div class="row">${top}</div><div class="tab" style="height:${Math.max(h, tallest)}px">${cols}</div>`;
    this._root.querySelector("[data-do=undo]").disabled = !this._history.length || this._over;
    this._status(this._over ? this._root.querySelector(".status").innerHTML : "");
  }
}

if (!customElements.get("ha95-solitaire")) customElements.define("ha95-solitaire", Ha95Solitaire);

// Nur ein Spiel auf einmal
export function showSolitaire() {
  [document, layer()].forEach((r) => r.querySelectorAll("ha95-solitaire").forEach((d) => d.remove()));
  const game = document.createElement("ha95-solitaire");
  game.open();
  return game;
}
window.ha95ShowSolitaire ??= showSolitaire;
