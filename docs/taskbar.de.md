# Taskleiste

🇬🇧 [English](taskbar.md) · 🇩🇪 **Deutsch**

Eine Win95-Taskleiste am unteren Rand: der **Start**-Knopf, Schnellstart-Symbole, Knöpfe für die besuchten Seiten und den offenen Detail-Dialog und ein Infobereich mit Entitäts-Symbolen, Benachrichtigungen und der Uhr. Die Seitenleiste bleibt, was sie ist, das Startmenü. Die Taskleiste kommt zusätzlich.

**Taskleiste** in der Integration einschalten (standardmäßig aus), Seite neu laden. Die Leiste braucht keine Einstellung; die Extras stehen unter `taskbar` in `/config/www/ha95-startmenu.json` (dieselbe Datei wie das Startmenü):

```json
{
  "taskbar": {
    "quicklaunch": [
      { "name": "Einstellungen", "icon": "mdi:cog", "navigation_path": "/config" }
    ],
    "tray": [
      { "entity": "climate.wohnzimmer", "icon": "mdi:thermostat" },
      { "entity": "alarm_control_panel.haus", "navigation_path": "/lovelace/sicherheit" }
    ],
    "pages": 6
  }
}
```

| Was | Verhalten |
|---|---|
| **Start** | Öffnet und schließt die Seitenleiste (auf dem Handy die Schublade). |
| **Schnellstart** | Ein Symbol je Eintrag, ein Klick führt ihn aus. |
| **Seiten** | Jede geöffnete Seite bekommt einen Knopf, benannt nach Dashboard und Ansicht. Die aktuelle ist eingedrückt. Ein Klick wechselt zur Seite, ein Rechtsklick entfernt sie. Bleibt für die Browser-Sitzung erhalten. |
| **Dialog** | Solange ein Detail-Dialog offen ist, hat seine Entität einen eingedrückten Knopf. Ein Klick schließt den Dialog. |
| **Infobereich** | Entitäts-Symbole (blass bei `off`, `unavailable` oder `unknown`, der Zustand steht im Hinweistext), die Glocke mit der Zahl der Benachrichtigungen (ein Klick öffnet die Liste) und die Uhr (Doppelklick oder Tippen öffnet „Eigenschaften von Datum/Uhrzeit“, braucht das Uhr-Modul). |

| Option | Bedeutung |
|---|---|
| `quicklaunch`, `tray` | Einträge mit `name`, `icon`, `entity` (liefert Name, Symbol und Zustand), `navigation_path` oder `url_path`. Ein Eintrag nur mit `entity` öffnet „Mehr Infos“. |
| `pages` | Anzahl der Seiten-Knöpfe (Standard 6, `0` für keine). |
| `dialogs`, `notifications`, `clock` | `false` blendet den Dialog-Knopf, die Glocke oder die Uhr aus (Standard: sichtbar). |
| `start` | Beschriftung des Start-Knopfs (Standard „Start“). |

Die Symbole sind bunt, wenn das Startmenü-Modul sie kennt. Die Farben folgen dem Farbschema. Die Seite bekommt unten 28 px Platz, die Seitenleiste endet über der Leiste; die Leiste liegt unter Dialogen.
