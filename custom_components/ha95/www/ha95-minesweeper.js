/*
 * HA 95 – Minesweeper für Home Assistant
 * Version: 4.10.1
 * Wird von der Integration HA 95 geladen (Option "Minesweeper").
 *
 * Öffnen:
 *   Startmenü:     { "name": "Minesweeper", "action": "minesweeper" }
 *   Eigener Code:  window.ha95ShowMinesweeper()
 * Bedienung: Klick deckt auf, Rechtsklick (Touch: lange drücken) setzt eine
 * Fahne, Klick auf eine Zahl mit passend vielen Fahnen deckt den Rest auf.
 * Bestzeiten stehen im Browser (localStorage).
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
    title: "Minesweeper",
    beginner: "Anfänger",
    intermediate: "Fortgeschritten",
    expert: "Profi",
    best: "Bestzeit",
    won: "Gewonnen!",
    lost: "Verloren.",
    new: "Neues Spiel",
    close: "Schließen",
    s: "s",
  },
  en: {
    title: "Minesweeper",
    beginner: "Beginner",
    intermediate: "Intermediate",
    expert: "Expert",
    best: "Best time",
    won: "You won!",
    lost: "Game over.",
    new: "New game",
    close: "Close",
    s: "s",
  },
};
const lang = (hass) => (hass?.locale?.language || hass?.language || navigator.language || "en").slice(0, 2);
const tx = (hass) => TEXT[lang(hass)] || TEXT.en;

const LEVELS = {
  beginner: { w: 9, h: 9, mines: 10 },
  intermediate: { w: 16, h: 16, mines: 40 },
  expert: { w: 30, h: 16, mines: 99 },
};
const NUMBER_COLORS = ["", "#0000ff", "#008000", "#ff0000", "#000080", "#800000", "#008080", "#000000", "#808080"];

const store = {
  read() {
    try {
      return JSON.parse(localStorage.getItem("ha95-minesweeper") || "{}");
    } catch {
      return {};
    }
  },
  write(data) {
    try {
      localStorage.setItem("ha95-minesweeper", JSON.stringify(data));
    } catch {
      // Speichern ist nur ein Extra
    }
  },
};

const FACES = {
  smile: '<path d="M4 9q4 4 8 0" fill="none" stroke="#000" stroke-width="1.2"/><circle cx="5.2" cy="6" r="1" /><circle cx="10.8" cy="6" r="1"/>',
  worry: '<ellipse cx="8" cy="10.5" rx="1.6" ry="2"/><circle cx="5.2" cy="6" r="1"/><circle cx="10.8" cy="6" r="1"/>',
  cool: '<path d="M4.5 11q3.5 3 7 0" fill="none" stroke="#000" stroke-width="1.2"/><rect x="2.5" y="4.5" width="4.6" height="3" /><rect x="8.9" y="4.5" width="4.6" height="3"/><path d="M7 5.5h2" stroke="#000"/>',
  dead: '<path d="M4.5 11q3.5 -3 7 0" fill="none" stroke="#000" stroke-width="1.2"/><path d="M3.8 4.8l2.8 2.8M6.6 4.8l-2.8 2.8M9.4 4.8l2.8 2.8M12.2 4.8l-2.8 2.8" stroke="#000" stroke-width="1"/>',
};
const face = (kind) =>
  `<svg viewBox="0 0 16 16" width="22" height="22" aria-hidden="true"><circle cx="8" cy="8" r="7" fill="#ff0" stroke="#000"/>${FACES[kind]}</svg>`;

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
  .levels { display: flex; gap: 2px; padding: 3px 2px; flex-wrap: wrap; }
  .levels button {
    border: none; background: none; font: inherit; color: inherit; padding: 1px 6px; cursor: default;
  }
  .levels button[aria-pressed="true"] { background: var(--ha95-select, #000080); color: var(--ha95-select-text, #fff); }
  .game { margin: 3px; padding: 6px; box-shadow: var(--ha95-raised, inset -1px -1px #000, inset 1px 1px #fff); }
  .head {
    display: flex; align-items: center; justify-content: space-between; padding: 4px 5px; margin-bottom: 6px;
    box-shadow: var(--ha95-sunken, inset 1px 1px #808080, inset -1px -1px #fff);
  }
  .lcd {
    min-width: 42px; padding: 1px 3px; background: #000; color: #f00; text-align: center;
    font: bold 22px/26px "Courier New", monospace; letter-spacing: 1px;
    box-shadow: inset 1px 1px #808080, inset -1px -1px #fff;
  }
  .face {
    width: 30px; height: 30px; padding: 0; border: none; display: grid; place-items: center;
    background: var(--ha95-face, #c0c0c0);
    box-shadow: var(--ha95-raised, inset -1px -1px #000, inset 1px 1px #fff);
  }
  .face:active { box-shadow: var(--ha95-sunken, inset 1px 1px #000); }
  .board {
    display: grid; width: max-content; max-width: 100%; touch-action: manipulation; user-select: none;
    box-shadow: var(--ha95-sunken, inset 1px 1px #808080, inset -1px -1px #fff);
    padding: 3px; overflow: auto;
  }
  .cell {
    width: var(--c, 22px); height: var(--c, 22px); padding: 0; border: none; font: bold 15px/1 "Courier New", monospace;
    display: grid; place-items: center; cursor: default;
    background: var(--ha95-face, #c0c0c0);
    box-shadow: inset -1px -1px #808080, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;
    -webkit-tap-highlight-color: transparent;
  }
  .cell.open {
    box-shadow: inset 1px 1px #808080; background: var(--ha95-face, #c0c0c0);
  }
  .cell.boom { background: #f00; }
  .cell.flag::before { content: "\\2691"; color: #f00; text-shadow: 1px 1px #000; font-size: 15px; }
  .cell.wrong::before { content: "\\2715"; color: #000; font-size: 14px; }
  .cell.mine::before { content: ""; width: 10px; height: 10px; background: #000; border-radius: 50%; box-shadow: 0 0 0 1px #000; }
  .cell.mine.boom::before { background: #000; }
  .status { padding: 4px 6px 2px; min-height: 22px; }
  .status b { font-weight: bold; }
`;

class Ha95Minesweeper extends HTMLElement {
  open() {
    this._hass = haRoot()?.hass;
    this._s = tx(this._hass);
    const saved = store.read();
    this._level = LEVELS[saved.level] ? saved.level : "beginner";
    this._root = this.shadowRoot || this.attachShadow({ mode: "open" });
    this._root.innerHTML = `<style>${CSS}</style>
      <div class="window" role="dialog" aria-modal="true" aria-labelledby="t">
        <div class="titlebar"><span id="t">${this._s.title}</span>
          <button class="x" aria-label="${this._s.close}">×</button></div>
        <div class="levels"></div>
        <div class="game">
          <div class="head">
            <div class="lcd mines">000</div>
            <button class="face" aria-label="${this._s.new}"></button>
            <div class="lcd time">000</div>
          </div>
          <div class="board"></div>
        </div>
        <div class="status" aria-live="polite"></div>
      </div>`;
    const close = () => {
      this._stopTimer();
      this.remove();
    };
    this._root.querySelector(".x").onclick = close;
    this._root.querySelector(".face").onclick = () => this._reset();
    this.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
      if (e.key === "F2") this._reset();
    });
    this.addEventListener("click", (e) => e.composedPath()[0] === this && close());
    this._root.querySelector(".levels").innerHTML = Object.keys(LEVELS)
      .map((k) => `<button data-level="${k}">${this._s[k]}</button>`)
      .join("");
    this._root.querySelector(".levels").onclick = (e) => {
      const k = e.target.dataset?.level;
      if (!k) return;
      this._level = k;
      store.write({ ...store.read(), level: k });
      this._reset();
    };
    this.popover = "manual";
    layer().appendChild(this);
    this.showPopover?.();
    this._reset();
  }

  _reset() {
    this._stopTimer();
    const { w, h, mines } = LEVELS[this._level];
    this._w = w;
    this._h = h;
    this._mines = mines;
    this._cells = Array.from({ length: w * h }, () => ({ mine: false, open: false, flag: false, n: 0 }));
    this._started = false;
    this._over = false;
    this._seconds = 0;
    this._flags = 0;
    this._opened = 0;
    this._boom = undefined;

    this._root.querySelectorAll(".levels button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.level === this._level));
    const board = this._root.querySelector(".board");
    // Auf schmalen Schirmen die Felder verkleinern, damit das Brett passt
    const cell = Math.max(14, Math.min(22, Math.floor((window.innerWidth - 56) / w)));
    board.style.setProperty("--c", `${cell}px`);
    board.style.gridTemplateColumns = `repeat(${w}, ${cell}px)`;
    board.innerHTML = this._cells.map((_, i) => `<button class="cell" data-i="${i}" aria-label=""></button>`).join("");
    board.oncontextmenu = (e) => e.preventDefault();
    board.onpointerdown = (e) => this._down(e);
    board.onpointerup = (e) => this._up(e);
    board.onpointercancel = board.onpointerleave = () => clearTimeout(this._press?.timer);
    this._setFace("smile");
    this._status("");
    this._draw();
  }

  _idx(e) {
    const i = e.target.closest?.(".cell")?.dataset.i;
    return i === undefined ? -1 : Number(i);
  }

  // Lange drücken (Touch) oder rechte Taste setzt die Fahne
  _down(e) {
    const i = this._idx(e);
    if (i < 0 || this._over) return;
    if (e.button === 2) {
      this._press = null;
      return this._flag(i);
    }
    if (e.button > 0) return;
    this._setFace("worry");
    this._press = { i, timer: setTimeout(() => ((this._press.done = true), this._flag(i), navigator.vibrate?.(30)), 450) };
  }

  _up(e) {
    const p = this._press;
    this._press = null;
    if (!p) return;
    clearTimeout(p.timer);
    if (!this._over) this._setFace("smile");
    if (p.done || e.button !== 0 || this._idx(e) !== p.i) return;
    this._reveal(p.i);
  }

  _neighbors(i) {
    const x = i % this._w;
    const y = Math.floor(i / this._w);
    const out = [];
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx;
        const ny = y + dy;
        if ((dx || dy) && nx >= 0 && ny >= 0 && nx < this._w && ny < this._h) out.push(ny * this._w + nx);
      }
    return out;
  }

  _place(first) {
    const banned = new Set([first, ...this._neighbors(first)]);
    const free = this._cells.map((_, i) => i).filter((i) => !banned.has(i));
    for (let k = 0; k < this._mines; k++) {
      const j = k + Math.floor(Math.random() * (free.length - k));
      [free[k], free[j]] = [free[j], free[k]];
      this._cells[free[k]].mine = true;
    }
    this._cells.forEach((c, i) => (c.n = this._neighbors(i).filter((n) => this._cells[n].mine).length));
  }

  _flag(i) {
    const c = this._cells[i];
    if (c.open || this._over) return;
    c.flag = !c.flag;
    this._flags += c.flag ? 1 : -1;
    this._draw();
  }

  _reveal(i) {
    const c = this._cells[i];
    if (this._over || c.flag) return;
    if (c.open) return this._chord(i);
    if (!this._started) {
      this._started = true;
      this._place(i);
      this._timer = setInterval(() => {
        this._seconds = Math.min(999, this._seconds + 1);
        this._draw();
      }, 1000);
    }
    if (c.mine) return this._lose(i);
    const stack = [i];
    while (stack.length) {
      const cur = this._cells[stack.pop()];
      if (cur.open || cur.flag) continue;
      cur.open = true;
      this._opened++;
      if (!cur.n) this._neighbors(this._cells.indexOf(cur)).forEach((n) => stack.push(n));
    }
    if (this._opened === this._w * this._h - this._mines) this._win();
    this._draw();
  }

  _chord(i) {
    const c = this._cells[i];
    const around = this._neighbors(i);
    if (!c.n || around.filter((n) => this._cells[n].flag).length !== c.n) return;
    for (const n of around) {
      if (!this._cells[n].open && !this._cells[n].flag) {
        this._reveal(n);
        if (this._over) return;
      }
    }
  }

  _stopTimer() {
    clearInterval(this._timer);
    clearTimeout(this._press?.timer);
  }

  _lose(i) {
    this._over = true;
    this._stopTimer();
    this._boom = i;
    this._setFace("dead");
    window.ha95Sound?.("error");
    this._status(`<b>${this._s.lost}</b>`);
    this._draw();
  }

  _win() {
    this._over = true;
    this._stopTimer();
    this._cells.forEach((c) => c.mine && (c.flag = true));
    this._flags = this._mines;
    this._setFace("cool");
    window.ha95Sound?.("win");
    const saved = store.read();
    const best = saved.best || {};
    let msg = `<b>${this._s.won}</b> ${this._seconds} ${this._s.s}`;
    if (!best[this._level] || this._seconds < best[this._level]) {
      best[this._level] = this._seconds;
      store.write({ ...saved, best });
    } else {
      msg += ` · ${this._s.best}: ${best[this._level]} ${this._s.s}`;
    }
    this._status(msg);
  }

  _setFace(kind) {
    this._root.querySelector(".face").innerHTML = face(kind);
  }

  _status(html) {
    const best = store.read().best?.[this._level];
    this._root.querySelector(".status").innerHTML = html || (best ? `${this._s.best}: ${best} ${this._s.s}` : "&nbsp;");
  }

  _draw() {
    const lcd = (n) => String(Math.max(-99, Math.min(999, n))).padStart(3, "0");
    this._root.querySelector(".mines").textContent = lcd(this._mines - this._flags);
    this._root.querySelector(".time").textContent = lcd(this._seconds);
    const buttons = this._root.querySelectorAll(".cell");
    this._cells.forEach((c, i) => {
      const b = buttons[i];
      const lost = this._boom !== undefined;
      let cls = "cell";
      let text = "";
      if (c.open) {
        cls += " open";
        if (c.n) {
          text = c.n;
          b.style.color = NUMBER_COLORS[c.n];
        }
      } else if (this._over && lost && c.mine && !c.flag) {
        cls += " open mine" + (i === this._boom ? " boom" : "");
      } else if (this._over && lost && c.flag && !c.mine) {
        cls += " open wrong";
      } else if (c.flag) {
        cls += " flag";
      }
      if (b.className !== cls) b.className = cls;
      if (b.textContent !== String(text)) b.textContent = text;
    });
  }
}

if (!customElements.get("ha95-minesweeper")) customElements.define("ha95-minesweeper", Ha95Minesweeper);

// Nur ein Spiel auf einmal
export function showMinesweeper() {
  [document, layer()].forEach((r) => r.querySelectorAll("ha95-minesweeper").forEach((d) => d.remove()));
  const game = document.createElement("ha95-minesweeper");
  game.open();
  return game;
}
window.ha95ShowMinesweeper ??= showMinesweeper;
