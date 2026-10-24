# Desktop-Karte

🇬🇧 [English](desktop.md) · 🇩🇪 **Deutsch**

Große Symbole mit Beschriftung wie auf dem Windows-95-Desktop: „Arbeitsplatz“, „Papierkorb“ und so weiter. Sie stehen direkt auf dem Desktop-Hintergrund, ohne Fenster. Ein Klick markiert ein Symbol, ein Doppelklick öffnet es. Auf Touch-Bildschirmen öffnet ein Tippen.

**Desktop-Karte** in der Integration einschalten (standardmäßig an), dann die Karte in ein Dashboard setzen:

```yaml
type: custom:ha95-desktop-card
columns: 6            # optional, Symbole pro Zeile (sonst so viele, wie passen)
icons:
  - name: Arbeitsplatz
    icon: mdi:desktop-classic
    navigation_path: /config
  - name: Wohnzimmer
    entity: light.wohnzimmer         # Name und Symbol kommen aus der Entität
    tap_action: { action: toggle }   # das tut der Doppelklick
  - name: Anleitung
    icon: mdi:book-open-variant
    url_path: https://www.home-assistant.io/docs/
```

| Option | Bedeutung |
|---|---|
| `name` | Beschriftung unter dem Symbol. Ohne Angabe der Name der Entität. |
| `icon` | Name des Symbols. Kennt das Startmenü-Modul ein buntes Symbol dazu (`mdi:cog`, `mdi:lightbulb` …), erscheint es bunt, sonst als weißes Symbol. |
| `entity` | Optional. Liefert Name, Symbol und einen Hinweistext mit dem Zustand; ohne Aktion öffnet der Doppelklick „Mehr Infos“. |
| `navigation_path`, `url_path` | Kurzformen für die zwei häufigsten Aktionen. |
| `tap_action` | `navigate`, `url`, `more-info`, `toggle`, `perform-action` oder `none`. |
| `double_tap_action` | Optional, ersetzt `tap_action` beim Doppelklick. |

Die Farben folgen dem Farbschema: Die Beschriftung nutzt `ha95-desktop-text`, die Markierung `ha95-select`. Tastatur: Tab wechselt zwischen den Symbolen, Leertaste markiert, Eingabe öffnet.
