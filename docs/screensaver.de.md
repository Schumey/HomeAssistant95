# Bildschirmschoner

🇬🇧 [English](screensaver.md) · 🇩🇪 **Deutsch**

Ein Bildschirmschoner für Wandtablets: Nach einiger Zeit ohne Eingabe wird der Schirm schwarz und zeigt einen von drei Klassikern. Jede Berührung, jeder Klick und jede Taste beendet ihn. Er schützt auch vor dem Einbrennen.

In der Integration **Bildschirmschoner** einschalten (**HomeAssistant95 → Konfigurieren**, standardmäßig aus).

| Motiv | Sieht aus wie |
|---|---|
| `stars` | Flug durch ein Sternenfeld. |
| `logos` | Pixel-Häuser in Fensterfarben, die über den Schirm fliegen. |
| `pipes` | Wachsende 3D-Röhren in allen Farben, wie im Klassiker. Ist der Schirm voll, beginnt er von vorn. |
| `random` | Jedes Mal ein zufälliges Motiv. |

## Einstellungen

Alles ist optional und steht in `/config/www/ha95-startmenu.json`, neben dem Startmenü:

```json
{
  "screensaver": {
    "minutes": 10,
    "mode": "random",
    "clock": true,
    "entities": ["sensor.wohnzimmer_temperatur"]
  }
}
```

| Option | Wirkung |
|---|---|
| `minutes` | Leerlauf in Minuten. `0` startet ihn nie von selbst. Standard `10`. |
| `mode` | `stars`, `logos`, `pipes` oder `random` (Standard). |
| `clock` | Blendet unten rechts Uhrzeit und Datum ein. Standard `true`. |
| `entities` | Entitäten, deren Zustand unter der Uhr steht. |

## Von Hand starten

- Startmenü: `{ "name": "Bildschirmschoner", "action": "screensaver" }` (das Standardmenü hat ihn unter „Games“).
- Aus eigenem Code: `window.ha95Screensaver.start("pipes")`.
