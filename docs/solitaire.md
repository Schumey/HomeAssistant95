# Solitaire

🇬🇧 **English** · 🇩🇪 [Deutsch](solitaire.de.md)

Klondike in a Win95 window: green table, seven columns, four ace piles and the stock. You can draw one card at a time or three.

Switch on **Solitaire** in the integration (on by default), then open it from the Start menu: `{ "name": "Solitaire", "action": "solitaire" }` (the default menu has it under "Games"), or from your own code with `window.ha95ShowSolitaire()`.

| Action | Mouse | Touch |
|---|---|---|
| Draw cards / turn the stock over again | Click the stock | Tap the stock |
| Pick up a card (with all cards on top of it) | Click it | Tap it |
| Put it down | Click the target column or ace pile | Tap the target |
| Move cards | Drag them onto the target | Drag with a finger |
| Move a card to an ace pile | Double-click it | Double-tap it |
| New game | "New game" or `F2` | "New game" |
| Take back a move | "Undo" | "Undo" |

Columns build down in alternating colors (red on black), only a king goes on an empty column. The ace piles build up by suit. The timer starts with the first move. Wins and the best time are kept in the browser. With `"sounds": true` in the Start menu file the game plays a small tune on a win.
