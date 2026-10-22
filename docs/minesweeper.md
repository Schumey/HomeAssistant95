# Minesweeper

🇬🇧 **English** · 🇩🇪 [Deutsch](minesweeper.de.md)

The classic mine game in a Win95 window, with the red counters, the smiley and three levels (Beginner 9 × 9 with 10 mines, Intermediate 16 × 16 with 40, Expert 30 × 16 with 99).

Switch on **Minesweeper** in the integration (on by default), then open it from the Start menu: `{ "name": "Minesweeper", "action": "minesweeper" }` (the default menu has it under "Games"), or from your own code with `window.ha95ShowMinesweeper()`.

| Action | Mouse | Touch |
|---|---|---|
| Open a field | Click | Tap |
| Flag | Right click | Press and hold |
| Open the neighbours of a number with enough flags | Click the number | Tap the number |
| New game | Click the smiley or press `F2` | Tap the smiley |

The first click is always safe. Best times per level are kept in the browser. With `"sounds": true` in the Start menu file the game plays a small tune on a win and a buzz on a loss.
