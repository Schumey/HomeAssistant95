# Startmenü

🇬🇧 [English](start-menu.md) · 🇩🇪 **Deutsch** · [← zurück zur README](../README.de.md)

Die Seitenleiste kann aussehen und funktionieren wie das Startmenü von Windows 95. Dazu gibt es zwei Teile, die man auch einzeln nutzen kann:

| Teil | Was er macht | Braucht |
|---|---|---|
| [Seitenleisten-Look](#1-seitenleisten-look-custom-sidebar) | „Start“-Titel mit Uhr, 3D-Rahmen, blaue Markierung, Zusatzinfos unter Einträgen | [Custom Sidebar](https://github.com/elchininet/custom-sidebar) (HACS) |
| [Startmenü-Modul](#2-startmenü-modul) | Senkrechter Streifen „HomeAssistant**95**“, bunte Win95-Icons, Ausklappmenüs mit Untermenüs | `www/ha95/ha95-startmenu.js` |

Ausklappmenüs hängen an einem Eintrag der Seitenleiste. Dafür braucht man also beide Teile.

## 1. Seitenleisten-Look (Custom Sidebar)

1. [Custom Sidebar](https://github.com/elchininet/custom-sidebar) über HACS installieren.
2. [`examples/custom-sidebar/custom-sidebar-config.yaml`](../examples/custom-sidebar/custom-sidebar-config.yaml) nach `/config/www/custom-sidebar-config.yaml` kopieren.
3. Im Abschnitt `order` die Namen und Entitäts-IDs an dein System anpassen. `item` ist der sichtbare Name eines Eintrags (Groß-/Kleinschreibung egal).
4. Seite neu laden.

Alle Farben kommen aus den `ha95-*`-Variablen, die Seitenleiste wechselt also mit dem gewählten Design mit. Das Beispiel nutzt die [Pixel-Icons](pixel-icons.de.md). Ohne sie `ha95:` durch `mdi:` ersetzen.

## 2. Startmenü-Modul

1. `www/ha95/ha95-startmenu.js` nach `/config/www/ha95/` kopieren.
2. In `configuration.yaml` laden:
   ```yaml
   frontend:
     extra_module_url:
       - /local/ha95/ha95-startmenu.js?v=3.11.1
   ```
   Das `?v=3.11.1` sorgt dafür, dass Browser und Companion-App nach einem Update die neue Datei laden: Home Assistant erlaubt ihnen, Dateien aus `/local/` 31 Tage lang zwischenzuspeichern. Die Nummer bei jedem Update ändern. Zeigt die App trotzdem noch die alte Fassung, ihren Cache leeren: **Einstellungen → Companion-App → Fehlerbehebung → Frontend-Cache zurücksetzen** (Android) bzw. **App-Konfiguration → Debugging → Frontend-Cache zurücksetzen** (iOS).
3. [`examples/startmenu/ha95-startmenu.json`](../examples/startmenu/ha95-startmenu.json) nach `/config/www/ha95-startmenu.json` kopieren.
4. Home Assistant neu starten und die Seite neu laden.

Damit sind Streifen und bunte Icons da. Für die Ausklappmenüs fehlt noch ein Schritt, siehe [Eigenes Menü bauen](#eigenes-menü-bauen).

### Streifen und bunte Icons

Alles ist standardmäßig an. Eingestellt wird es oben in `ha95-startmenu.json`:

```json
{
  "banner": true,
  "banner_text": "HomeAssistant95",
  "color_icons": true,
  "busy_cursor": true,
  "menus": { }
}
```

| Option | Wirkung |
|---|---|
| `banner` | `false` blendet den senkrechten Streifen aus. |
| `banner_text` | Text im Streifen. Ziffern am Ende werden heller gezeichnet, wie die „95“ in „Windows 95“. |
| `color_icons` | `false` lässt die normalen Icons stehen. |
| `busy_cursor` | Sanduhr als Mauszeiger, solange Home Assistant arbeitet: wenn eine Anfrage (Speichern, eine Aktion) länger als 0,3 s dauert, solange die Verbindung weg ist (Neustart) und kurz nach einem Seitenwechsel. `false` schaltet sie ab. |
| `clock` | Doppelklick auf den Titel mit der Uhr (Tippen auf Touch-Bildschirmen) öffnet „Eigenschaften von Datum/Uhrzeit“ mit Kalender und Analoguhr. Braucht `ha95-clock.js` neben dem Modul, siehe [Datum/Uhrzeit](date-time.de.md#uhr-im-startmenü). `false` schaltet es ab. |
| `clock_calendars` | Kalender-Entitäten, deren Termine das Fenster zeigt, z. B. `["calendar.familie"]`. |

Die Farbe des Streifens ist die Variable `ha95-banner` im Design: grau bei HA 95, ein blauer Verlauf bei HA 98 (wie im Startmenü von Windows 98).

Das Modul ersetzt ein Icon durch ein buntes, wenn es dafür eine Zeichnung gibt. Das klappt bei Einträgen der Seitenleiste (über den Namen des Icons, egal mit welchem Präfix, z. B. `mdi:`, `ha95:` oder `hacs:`, und bei eingebauten Seiten wie Einstellungen, Benachrichtigungen, Aktivität, Verlauf, Energie, Karte, Medien, To-do-Listen, Kalender und Entwicklerwerkzeuge) und bei den Icons in den Ausklappmenüs. Alles andere behält sein normales Icon.

Bunte Icons (weitere MDI-Namen zeigen darauf, z. B. `home-outline`, `cog-outline`, `hammer`, `thermometer-lines`, `lightning-bolt`):

`account`, `account-group`, `battery` (alle Stufen), `battery-arrow-down`, `battery-arrow-up`, `battery-clock`, `battery-sync`, `bed`, `bell`, `calendar`, `camera`, `car`, `ceiling-light`, `chart-box`, `chart-line`, `clipboard-list`, `code-braces`, `coffee-to-go`, `cog`, `desk-lamp`, `devices`, `door-closed`, `fan`, `file-document`, `fire`, `flash`, `flower`, `folder-open`, `format-list-bulleted`, `garage`, `help`, `history`, `home`, `information`, `lamps`, `lightbulb`, `lock`, `lock-open`, `map`, `music-note`, `palette`, `play-box`, `power`, `printer-3d-nozzle`, `radiator`, `restart`, `robot`, `robot-vacuum`, `script-text`, `shape-outline`, `shield`, `shield-home`, `snowflake`, `sofa`, `speaker`, `sprout`, `television`, `thermometer`, `thermostat`, `tools`, `view-dashboard`, `washing-machine`, `water`, `weather-partly-cloudy`, `weather-sunny`, `window-closed`, `wrench`, `console`, `dock-left`, `hacs`, `key`, `math-log`, `menu`, `view-grid`

## Eigenes Menü bauen

Das Beispiel bringt ein Menü „Tools“ mit. Diese Anleitung baut ein zweites dazu: ein Menü „Räume“, das deine Dashboards öffnet, mit einem Untermenü „Licht“.

### Schritt 1: Menü in der JSON-Datei beschreiben

Jedes Menü ist eine Liste unter `menus` mit einem frei wählbaren Namen (der *Menü-ID*). In `/config/www/ha95-startmenu.json` neben `tools` ein Menü `raeume` ergänzen:

```json
{
  "menus": {
    "tools": [ … ],
    "raeume": [
      { "name": "Wohnzimmer", "icon": "mdi:sofa", "path": "/dashboard-haus/wohnzimmer" },
      { "name": "Schlafzimmer", "icon": "mdi:bed", "path": "/dashboard-haus/schlafzimmer" },
      { "name": "Garage", "icon": "mdi:garage", "path": "/dashboard-haus/garage" },
      { "divider": true },
      {
        "name": "Licht",
        "icon": "mdi:lightbulb",
        "items": [
          { "name": "Alle Lampen", "icon": "mdi:ceiling-light", "path": "/light" },
          { "name": "Licht-Automationen", "icon": "mdi:robot", "path": "/config/automation/dashboard" }
        ]
      },
      { "divider": true },
      { "name": "Regenradar", "icon": "mdi:weather-partly-cloudy", "url": "https://www.rainviewer.com/" }
    ]
  }
}
```

Jede Zeile ist ein Eintrag. Was er tut, hängt vom Schlüssel ab:

| Eintrag | Bewirkt |
|---|---|
| `{ "name": "…", "icon": "mdi:…", "path": "/…" }` | Öffnet eine Seite in Home Assistant. Den Pfad aus der Adresszeile kopieren, ohne Host (z. B. `/dashboard-haus/wohnzimmer`). |
| `{ "name": "…", "file": "configuration.yaml" }` | Öffnet die Datei in der App [File editor](https://github.com/home-assistant/addons/tree/master/configurator), relativ zu `file_editor_base` (Standard `/homeassistant`). Ohne `icon` gibt es ein Dokument-Icon. |
| `{ "name": "…", "action": "restart" }` | Startet Home Assistant nach einer Win95-Rückfrage neu. Danach erscheint der schwarze Bildschirm „Es ist jetzt sicher, Home Assistant auszuschalten.“, bis Home Assistant wieder da ist (Klick oder Escape schließt ihn früher). |
| `{ "name": "…", "action": "run" }` | Öffnet die Suche von Home Assistant als Win95-Dialog „Ausführen“ (mit UIX, siehe [Fenster-Look](window-look.de.md)). Passt gut zu `"icon": "mdi:console"`. |
| `{ "name": "…", "action": "clock" }` | Öffnet „Eigenschaften von Datum/Uhrzeit“ (siehe [Datum/Uhrzeit](date-time.de.md)). Passt gut zu `"icon": "mdi:clock"`. |
| `{ "name": "…", "url": "https://…" }` | Öffnet eine Adresse in einem neuen Tab. |
| `{ "name": "…", "items": [ … ] }` | Öffnet ein weiteres Untermenü. Untermenüs lassen sich beliebig tief verschachteln. |
| `{ "divider": true }` | Trennlinie. |

`icon` ist optional und nimmt jedes `mdi:`- oder `ha95:`-Icon. Icons aus der [Liste oben](#streifen-und-bunte-icons) erscheinen bunt.

> Die Datei muss gültiges JSON sein: doppelte Anführungszeichen, Komma zwischen den Einträgen, kein Komma nach dem letzten. Wenn das Menü nicht aufgeht, die Datei mit einem JSON-Validator prüfen.

### Schritt 2: Eintrag in der Seitenleiste anlegen

Ein Eintrag der Seitenleiste öffnet ein Menü, wenn er das Attribut `data-ha95-menu` mit der Menü-ID trägt. Mit Custom Sidebar im Abschnitt `order` von `/config/www/custom-sidebar-config.yaml` einen neuen Eintrag anlegen:

```yaml
order:
  # … deine anderen Einträge …
  - new_item: true
    item: Räume
    icon: mdi:home
    order: 2
    attributes:
      data-ha95-menu: raeume
    on_click:
      action: javascript
      code: "// öffnet ha95-startmenu.js"
```

- `item` ist die Beschriftung in der Seitenleiste.
- `data-ha95-menu: raeume` verbindet den Eintrag mit dem Menü `raeume` aus Schritt 1.
- `on_click` mit leerem Skript sorgt dafür, dass der Eintrag nirgendwohin navigiert. Der Klick öffnet das Menü.
- `bottom: true` setzt den Eintrag nach unten zu den Einstellungen (wie „Tools“ im Beispiel).

Man kann auch einem vorhandenen Eintrag ein Menü geben, z. B. `- item: Einstellungen` mit denselben `attributes`. Ein Klick darauf öffnet dann das Menü statt der Seite.

### Schritt 3: Neu laden

Seite neu laden (Strg+F5). Mit der Maus auf „Räume“ zeigen (oder auf dem Handy antippen), dann klappt rechts das Menü auf. Änderungen an der JSON-Datei brauchen nur ein Neuladen der Seite, keinen Neustart.

### Weitere Optionen in der JSON-Datei

| Option | Standard | Bedeutung |
|---|---|---|
| `file_editor_panel` | `core_configurator` | Panel-Name der File-editor-App (der Teil nach dem Host in ihrer Adresse). |
| `file_editor_base` | `/homeassistant` | Ordner, auf den sich `file`-Einträge beziehen. |

Statt der JSON-Datei geht auch `window.ha95StartmenuConfig = { menus: { … } }` aus einem anderen Modul, das vorher lädt.

### Wenn etwas nicht klappt

| Problem | Lösung |
|---|---|
| Beim Darüberfahren oder Antippen passiert nichts | Steht `ha95-startmenu.js` in `extra_module_url`, und wurde neu gestartet? Die Browser-Konsole meldet `HA95 Startmenü: Menü "…" fehlt`, wenn es die Menü-ID aus der Seitenleiste in der JSON-Datei nicht gibt. |
| Menü leer oder veraltet | Die JSON-Datei hat einen Syntaxfehler, oder die Seite wurde nicht neu geladen. |
| File editor geht auf, aber nicht die Datei | `file_editor_panel` und `file_editor_base` prüfen. |
| Kein Streifen | Der Streifen erscheint nur bei ausgeklappter Seitenleiste. |
| Im Browser geht es, in der Companion-App nicht (kein Streifen, keine bunten Icons, kein ▶-Pfeil) | Die App nutzt noch eine alte Kopie des Moduls. Die Nummer nach `?v=` in `extra_module_url` erhöhen und neu starten oder den Frontend-Cache der App zurücksetzen (siehe [Einrichtung](#2-startmenü-modul)). |
| Streifen und bunte Icons verschwinden | In der Browser-Konsole steht `HA95 Startmenü: Seitenleiste ändert sich mehr als …`. Etwas hat die Seitenleiste mehrere Sekunden lang viele Male pro Sekunde geändert, darum zeichnet das Modul sie nicht mehr nach, statt die Oberfläche einzufrieren. Die Menüs funktionieren weiter. Seite neu laden; passiert es wieder, bitte ein Issue anlegen. |
