# Solitaire

🇬🇧 [English](solitaire.md) · 🇩🇪 **Deutsch**

Klondike im Win95-Fenster: grüner Tisch, sieben Spalten, vier Ablagen für die Asse und der Stapel. Du kannst eine Karte oder drei auf einmal ziehen.

**Solitaire** in der Integration einschalten (standardmäßig an), dann im Startmenü öffnen: `{ "name": "Solitaire", "action": "solitaire" }` (das Standardmenü hat es unter „Games“), oder aus eigenem Code mit `window.ha95ShowSolitaire()`.

| Aktion | Maus | Touch |
|---|---|---|
| Karten ziehen / Stapel neu umdrehen | Stapel anklicken | Stapel antippen |
| Karte aufnehmen (samt den Karten darauf) | Anklicken | Antippen |
| Ablegen | Zielspalte oder Ablage anklicken | Ziel antippen |
| Karten verschieben | Aufs Ziel ziehen | Mit dem Finger ziehen |
| Karte auf die Ablage legen | Doppelklick | Doppeltippen |
| Neues Spiel | „Neues Spiel“ oder `F2` | „Neues Spiel“ |
| Zug zurücknehmen | „Rückgängig“ | „Rückgängig“ |

Spalten baut man absteigend in wechselnden Farben (Rot auf Schwarz), auf eine leere Spalte kommt nur ein König. Die Ablagen baut man aufsteigend nach Farbe. Die Zeit läuft ab dem ersten Zug. Siege und Bestzeit stehen im Browser. Mit `"sounds": true` in der Startmenü-Datei spielt das Spiel bei einem Sieg eine kleine Melodie.
