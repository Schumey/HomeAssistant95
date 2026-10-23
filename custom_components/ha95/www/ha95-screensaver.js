/*
 * HA 95 – Bildschirmschoner für Home Assistant
 * Version: 4.6.0
 * Wird von der Integration HA 95 geladen (Option "Bildschirmschoner").
 *
 * Startet nach einer Zeit ohne Eingabe, jede Eingabe (Maus, Tippen, Taste)
 * beendet ihn. Einstellungen in /config/www/ha95-startmenu.json:
 *   "screensaver": {
 *     "minutes": 10,          Leerlauf in Minuten, 0 = nie von selbst
 *     "mode": "random",       stars | logos | pipes | random
 *     "clock": true,          Uhrzeit und Datum einblenden
 *     "entities": []          Entitäten, deren Zustand unter der Uhr steht
 *   }
 * Aus eigenem Code: window.ha95Screensaver.start("pipes"), .stop()
 * Im Startmenü: { "name": "Bildschirmschoner", "action": "screensaver" }
 */

const CONFIG_URL = "/local/ha95-startmenu.json";
const DEFAULTS = { minutes: 10, mode: "random", clock: true, entities: [] };
const MODES = ["stars", "logos", "pipes"];

const haRoot = () => document.querySelector("home-assistant");

let options = { ...DEFAULTS };
let timer = null;
let running = null; // { el, stop }
let lastMove = null;

// ---------- Motive ----------
// Jedes Motiv bekommt eine Zeichenfläche und liefert eine Funktion zum Beenden.

function animate(step) {
  let id = 0;
  let last = 0;
  const loop = (t) => {
    step(t, Math.min(0.05, (t - last) / 1000 || 0.016));
    last = t;
    id = requestAnimationFrame(loop);
  };
  id = requestAnimationFrame(loop);
  return () => cancelAnimationFrame(id);
}

// Sternenfeld: Flug durch den Weltraum, die Sterne ziehen Striche
function stars(ctx, w, h) {
  const stars = Array.from({ length: 420 }, () => spawn(true));
  function spawn(anywhere) {
    return { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2, z: anywhere ? Math.random() : 1 };
  }
  const scale = Math.max(w, h) / 4;
  const project = (s, z) => [w / 2 + (s.x / z) * scale, h / 2 + (s.y / z) * scale];
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);
  return animate((t, dt) => {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);
    for (const s of stars) {
      const [x0, y0] = project(s, s.z + dt * 0.5);
      s.z -= dt * 0.5;
      const [x, y] = project(s, Math.max(s.z, 0.01));
      if (s.z <= 0.01 || x < 0 || x >= w || y < 0 || y >= h) {
        Object.assign(s, spawn(false));
        continue;
      }
      const g = Math.round(130 + (1 - s.z) * 125);
      ctx.strokeStyle = `rgb(${g},${g},${g})`;
      ctx.lineWidth = Math.max(1, Math.round((1 - s.z) * 3));
      ctx.beginPath();
      ctx.moveTo(Math.round(x0), Math.round(y0));
      ctx.lineTo(Math.round(x), Math.round(y));
      ctx.stroke();
    }
  });
}

// Fliegende Logos: ein Pixel-Haus in Fensterfarben, schräg über den Schirm
const LOGO = [
  "......rr......",
  ".....rrrr.....",
  "....rrrrrr....",
  "...rrrrrrrr...",
  "..rrrrrrrrrr..",
  ".rrrrrrrrrrrr.",
  "..bbbbbbbbbb..",
  "..bgggbbyyyb..",
  "..bgggbbyyyb..",
  "..bgggbbyyyb..",
  "..bbbbbbkkkb..",
  "..bbbbbbkkkb..",
  "..bbbbbbkkkb..",
];
const LOGO_COLORS = { r: "#f00", b: "#0000ff", g: "#00ff00", y: "#ffff00", k: "#000" };

function logos(ctx, w, h) {
  const flyers = Array.from({ length: 9 }, () => fly(true));
  function fly(anywhere) {
    const size = 2 + Math.floor(Math.random() * 4);
    return {
      x: anywhere ? Math.random() * w : w + 20 * size,
      y: anywhere ? Math.random() * h : -20 * size + Math.random() * h * 0.3,
      v: 40 + Math.random() * 90,
      size,
    };
  }
  return animate((t, dt) => {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);
    for (const f of flyers) {
      f.x -= f.v * dt;
      f.y += f.v * dt * 0.55;
      if (f.x < -20 * f.size || f.y > h + 20 * f.size) Object.assign(f, fly(false));
      LOGO.forEach((row, ry) =>
        [...row].forEach((c, rx) => {
          if (c === ".") return;
          ctx.fillStyle = LOGO_COLORS[c];
          ctx.fillRect(Math.round(f.x + rx * f.size), Math.round(f.y + ry * f.size), f.size, f.size);
        })
      );
    }
  });
}

// Röhren: wachsende 3D-Rohre in isometrischer Ansicht
function pipes(ctx, w, h) {
  const N = 14;
  const cell = Math.min(w / (N * 1.8), h / (N * 2.1));
  const r = cell * 0.25;
  const dirs = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
  const COLORS = ["#ff2020", "#20c020", "#3060ff", "#ffd000", "#00d0d0", "#e040e0", "#ff8000", "#e0e0e0"];
  const key = (p) => p[0] + N * (p[1] + N * p[2]);
  let used = new Set();
  let pipe = null;
  let wait = 0;

  const proj = (p) => [
    w / 2 + (p[0] - p[2]) * cell * 0.866,
    h / 2 + (p[0] + p[2] - N) * cell * 0.5 - (p[1] - N / 2) * cell,
  ];
  const inside = (p) => p.every((v) => v >= 0 && v < N);
  const free = (p) => inside(p) && !used.has(key(p));

  function newPipe() {
    for (let i = 0; i < 40; i++) {
      const p = [0, 1, 2].map(() => Math.floor(Math.random() * N));
      if (free(p)) {
        used.add(key(p));
        pipe = { p, d: dirs[Math.floor(Math.random() * 6)], color: COLORS[Math.floor(Math.random() * COLORS.length)], len: 0 };
        joint(p, pipe.color);
        return;
      }
    }
    reset();
  }
  function reset() {
    used = new Set();
    pipe = null;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);
  }
  function joint(p, color) {
    const [x, y] = proj(p);
    const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r * 1.25);
    g.addColorStop(0, "#fff");
    g.addColorStop(0.25, color);
    g.addColorStop(1, "#000");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r * 1.25, 0, Math.PI * 2);
    ctx.fill();
  }
  function segment(a, b, color) {
    const [x1, y1] = proj(a);
    const [x2, y2] = proj(b);
    ctx.lineCap = "butt";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = r * 2.2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.strokeStyle = color;
    ctx.lineWidth = r * 1.8;
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.55)";
    ctx.lineWidth = r * 0.55;
    ctx.beginPath();
    ctx.moveTo(x1 - r * 0.4, y1 - r * 0.4);
    ctx.lineTo(x2 - r * 0.4, y2 - r * 0.4);
    ctx.stroke();
  }

  reset();
  let acc = 0;
  return animate((t, dt) => {
    acc += dt;
    if (acc < 0.045) return;
    acc = 0;
    if (wait > 0) return void (wait -= 1);
    if (used.size > N * N * N * 0.4) {
      wait = 30;
      return reset();
    }
    if (!pipe) return newPipe();
    let d = pipe.d;
    if (Math.random() < 0.28 || !free(pipe.p.map((v, i) => v + d[i]))) {
      const options = dirs.filter(
        (c) => (c[0] !== -d[0] || c[1] !== -d[1] || c[2] !== -d[2]) && free(pipe.p.map((v, i) => v + c[i]))
      );
      if (!options.length || pipe.len > 60) {
        pipe = null;
        return;
      }
      d = options[Math.floor(Math.random() * options.length)];
    }
    const next = pipe.p.map((v, i) => v + d[i]);
    segment(pipe.p, next, pipe.color);
    if (d !== pipe.d) joint(pipe.p, pipe.color);
    used.add(key(next));
    pipe.p = next;
    pipe.d = d;
    pipe.len++;
  });
}

const RENDER = { stars, logos, pipes };

// ---------- Start und Ende ----------

const pad = (n) => String(n).padStart(2, "0");

function overlayInfo(hass) {
  const now = new Date();
  const lang = hass?.locale?.language || navigator.language;
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const date = now.toLocaleDateString(lang, { weekday: "long", day: "numeric", month: "long" });
  const states = (options.entities || [])
    .map((id) => hass?.states?.[id])
    .filter(Boolean)
    .map((s) => `${s.attributes.friendly_name || s.entity_id}: ${s.state}${s.attributes.unit_of_measurement ? " " + s.attributes.unit_of_measurement : ""}`);
  return { time, date, states };
}

export function start(mode) {
  if (running) return;
  let pick = mode || options.mode;
  if (!RENDER[pick]) pick = MODES[Math.floor(Math.random() * MODES.length)];

  const el = document.createElement("div");
  el.popover = "manual";
  el.setAttribute("data-ha95-screensaver", "");
  el.style.cssText =
    "position:fixed;inset:0;margin:0;padding:0;border:0;width:100%;height:100%;max-width:none;max-height:none;background:#000;cursor:none;overflow:hidden;";
  const canvas = document.createElement("canvas");
  const dpr = 1; // Pixeloptik, bewusst nicht hochskaliert
  canvas.width = Math.ceil(window.innerWidth * dpr);
  canvas.height = Math.ceil(window.innerHeight * dpr);
  canvas.style.cssText = "display:block;width:100%;height:100%;image-rendering:pixelated";
  el.appendChild(canvas);

  let tick = null;
  if (options.clock) {
    const box = document.createElement("div");
    box.style.cssText =
      "position:absolute;right:5vmin;bottom:5vmin;text-align:right;color:#fff;font-family:var(--ha95-font,Tahoma,sans-serif);text-shadow:2px 2px #000;pointer-events:none";
    el.appendChild(box);
    const update = () => {
      const { time, date, states } = overlayInfo(haRoot()?.hass);
      box.innerHTML =
        `<div style="font-size:9vmin;font-weight:bold;line-height:1">${time}</div>` +
        `<div style="font-size:3vmin">${date}</div>` +
        states.map((s) => `<div style="font-size:2.4vmin">${s.replace(/[&<>]/g, "")}</div>`).join("");
    };
    update();
    tick = setInterval(update, 10000);
  }

  document.body.appendChild(el);
  el.showPopover?.();
  const stopMotif = RENDER[pick](canvas.getContext("2d"), canvas.width, canvas.height);
  running = {
    el,
    stop() {
      stopMotif();
      clearInterval(tick);
      el.remove();
      running = null;
    },
  };
  running.since = performance.now();
  lastMove = null;
}

export function stop() {
  running?.stop();
  restart();
}

function restart() {
  clearTimeout(timer);
  if (options.minutes > 0) timer = setTimeout(() => start(), options.minutes * 60 * 1000);
}

function onInput(ev) {
  if (running) {
    // Kleine Mausbewegungen in der ersten Sekunde sind noch kein Aufwecken
    if (ev.type === "pointermove") {
      if (performance.now() - running.since < 1000) return;
      if (lastMove && Math.hypot(ev.clientX - lastMove[0], ev.clientY - lastMove[1]) < 6) return;
      if (!lastMove) return void (lastMove = [ev.clientX, ev.clientY]);
    }
    ev.stopPropagation();
    if (ev.type !== "pointermove") ev.preventDefault();
    stop();
    return;
  }
  restart();
}

async function init() {
  try {
    const res = await fetch(CONFIG_URL, { cache: "no-cache" });
    if (res.ok) options = { ...DEFAULTS, ...((await res.json()).screensaver || {}) };
  } catch {
    // ohne Datei gelten die Standardwerte
  }
  ["pointermove", "pointerdown", "keydown", "wheel", "touchstart"].forEach((type) =>
    window.addEventListener(type, onInput, { capture: true, passive: false })
  );
  restart();
}

window.ha95Screensaver ??= { start, stop };
init();
