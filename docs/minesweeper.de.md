# Minesweeper

🇬🇧 [English](minesweeper.md) · 🇩🇪 **Deutsch**

Das klassische Minenspiel im Win95-Fenster, mit den roten Zählern, dem Smiley und drei Stufen (Anfänger 9 × 9 mit 10 Minen, Fortgeschrittene 16 × 16 mit 40, Profi 30 × 16 mit 99).

In der Integration **Minesweeper** einschalten (standardmäßig an) und dann aus dem Startmenü öffnen: `{ "name": "Minesweeper", "action": "minesweeper" }` (das Standardmenü hat es unter „Games“), oder aus eigenem Code mit `window.ha95ShowMinesweeper()`.

| Aktion | Maus | Touch |
|---|---|---|
| Feld aufdecken | Klick | Tippen |
| Fahne setzen | Rechtsklick | Lange drücken |
| Nachbarn einer Zahl mit genug Fahnen aufdecken | Zahl anklicken | Zahl antippen |
| Neues Spiel | Smiley anklicken oder `F2` | Smiley antippen |

Der erste Klick ist immer sicher. Die Bestzeiten je Stufe bleiben im Browser. Mit `"sounds": true` in der Startmenü-Datei spielt das Spiel bei einem Sieg ein kleines Lied und bei einer Niederlage einen Summer.
