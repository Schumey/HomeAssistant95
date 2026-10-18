# Changelog

🇬🇧 [English](CHANGELOG.md) · 🇩🇪 **Deutsch**

Alle nennenswerten Änderungen an diesem Projekt. Format nach [Keep a Changelog](https://keepachangelog.com/de/1.1.0/), Versionierung nach [SemVer](https://semver.org/lang/de/).

## [3.5.0] – 2026-10-18

### Hinzugefügt
- Pixel-Icons, automatischer Modus: `ha95-icons.js?replace` ersetzt jedes `mdi:`-Icon, das es auch als `ha95:` gibt, auch die Standard-Icons der Entitäten. `ha95-icons.js?pixelate` bringt alle übrigen Icons auf das 24×24-Pixelraster. Beides lässt sich kombinieren.
- 32 weitere Pixel-Icons (jetzt 89), vor allem für die Standard-Icons von Home Assistant: `lightbulb-off`, `fan-off`, `toggle-switch-variant` und `-off` (als Win95-Kontrollkästchen), Batteriestufen `battery-10` bis `battery-90`, `battery-charging`, `battery-alert`, `eye`, `shield`, `leaf`, `garage`, `garage-open`, `music-note`, `play`, `pause`, `stop`, `volume-high`, `volume-medium`, `volume-mute`, `check-circle`, `alert-circle`, `weather-partly-cloudy`, `weather-snowy`, `weather-lightning`, `weather-fog`.
- 72 MDI-Aliasse (vorher 14), z. B. `lightbulb-outline`, `home-outline`, `lock-open-variant`, `roller-shade-closed`, `window-shutter`, `blinds-horizontal`, `weather-pouring`, `white-balance-sunny`, `toggle-switch`.

### Geändert
- `ha95-icons.js` ist jetzt ein echtes JavaScript-Modul (es liest seine Optionen aus der URL). Laden über `extra_module_url` oder als Ressource vom Typ **JavaScript-Modul**, wie im README beschrieben.
- `battery-50` ist jetzt wie die anderen Batteriestufen gezeichnet (untere Hälfte voll).
- `power-plug-off` hat eine Lücke um den Schrägstrich, wie die anderen „aus“-Icons.

## [3.4.0] – 2026-10-18

### Hinzugefügt
- Pixel-Icon-Set `www/ha95/ha95-icons.js`: 57 Icons in Win95-Pixeloptik im 24×24-Raster (Umriss in voller Farbe, Füllung mit halber Deckkraft), nach dem Zustand der Entität eingefärbt wie andere Icons. Die Namen folgen MDI (`mdi:fan` → `ha95:fan`), weitere MDI-Namen zeigen auf ein vorhandenes Icon, unbekannte Namen zeigen `ha95:help`. Laden per `extra_module_url`, siehe README-Abschnitt „Pixel-Icons“.
- Das Custom-Sidebar-Beispiel nutzt die `ha95:`-Icons. Ohne die Icon-Datei `ha95:` durch `mdi:` ersetzen.

### Hinweis
- Diese Dateien waren versehentlich schon im Release 3.3.1 enthalten, ohne Changelog-Eintrag. 3.4.0 ist das richtige Release dafür.

## [3.3.1] – 2026-10-18

### Behoben
- Entitätskarten mit Sammelschalter: Der Schalter steht jetzt in einer eigenen Zeile unter der Titelleiste, bündig mit den Kontrollkästchen der Zeilen, statt in der Titelleiste.
- Custom-Sidebar-Beispiel: kein runder Hover-Kreis mehr hinter dem Menüknopf (`sidebar_button_background_hover_opacity: 0`).

## [3.3.0] – 2026-10-18

### Hinzugefügt
- Schieberegler in Entitätskarten als Win95-Trackbar: eingelassene weiße Rille, erhabener grauer Griff (card-mod und UIX). `ha-slider-*`-Farben global gesetzt.
- UIX: Eingabe-, Auswahl-, Datums- und Zeitfelder in Entitätskarten als weiße, eingelassene Kästchen, Pfeil im Auswahlfeld als 3D-Knopf.
- UIX: Thermostat- und Luftbefeuchter-Ring im Win95-Stil mit eckigen Enden, vollen Farben und eckigem Griff.
- Eingabefelder sind überall weiß (`ha-color-form-background`).

### Behoben
- Der Sammelschalter in der Titelleiste einer Entitätskarte klebt nicht mehr an den _ □ ×-Knöpfen.

## [3.2.1] – 2026-10-18

### Behoben
- Seit 3.1.0 wirkte kein card-mod-Styling mehr (keine Titelleisten, keine Thermostat-Knöpfe, keine Kontrollkästchen). Ursache: card-mod 4.2.1 hängt sich ab HA 2026.8 auf, sobald ein Design `card-mod-…-yaml`-Schlüssel enthält. Der Grundlook steht wieder in `card-mod-card`. Alles, was `-yaml` braucht, steht jetzt in `uix-card-yaml` und `uix-row-yaml`, die nur [UIX](https://github.com/Lint-Free-Technology/uix) liest.

### Geändert
- UIX (UI eXtension) ist jetzt die empfohlene Styling-Erweiterung. card-mod bekommt weiterhin den Grundlook.
- Die Spur von Thermostat- und Luftbefeuchter-Regler ist auch ohne UIX dunkler.

## [3.2.0] – 2026-10-18

### Hinzugefügt
- Schalter: Win95-Farben für das aktuelle `ha-switch` (weiße Spur, grauer Knopf, eingeschaltet navy) über die `ha-switch-*`-Variablen.
- card-mod: Schalter in Entitätskarten (Zeilen und Schalter in der Kopfzeile) werden zu Win95-Kontrollkästchen mit Pixel-Häkchen.

## [3.1.0] – 2026-10-18

### Hinzugefügt
- Farben für Klima und Luftbefeuchter aus der 16-Farben-Palette (`state-climate-*-color`, `state-humidifier-on-color`): Heizen rot, Kühlen blau, Automatik grün, Luftbefeuchter teal. Einstellbar über die neuen Variablen `ha95-heat`, `ha95-cool`, `ha95-auto`, `ha95-heat-cool`, `ha95-dry`, `ha95-fan` und `ha95-humid`. „HA 95 Kontrast“ nutzt helle Varianten.
- card-mod: Thermostat- und Luftbefeuchter-Karte bekommen einen grauen Ring und eckige 3D-Knöpfe für + und −. Beim Ziehen am Regler sinkt die Karte nicht mehr ein.
- Beispielkonfiguration für Custom Sidebar (`examples/custom-sidebar/`): Seitenleiste als Startmenü mit „Start“-Titel, Uhr, 3D-Rahmen, senkrechtem „HomeAssistant95“-Streifen und Zusatzinfos an den Einträgen.
- Dialoge ohne Rundungen und Weichzeichner, mit 3D-Rahmen.
- README und Changelog auf Englisch (`README.md`, `CHANGELOG.md`). Die deutschen Fassungen heißen jetzt `README.de.md` und `CHANGELOG.de.md`.

### Geändert
- Die card-mod-Styles für Karten stehen jetzt unter `card-mod-card-yaml` statt `card-mod-card`, weil card-mod nur einen der beiden Schlüssel liest. Wer das Theme um eigenes Karten-CSS erweitert hat, muss es in den `.`-Block verschieben.
- Anleitung an die aktuelle HA-Oberfläche angepasst: **Werkzeuge → YAML → Designs neu laden** und **Profil → Design**.
- Empfehlung ergänzt, card-mod zusätzlich per `extra_module_url` zu laden.

 – 2026-10-18

### Geändert (inkompatibel)
- „Win95“ heißt jetzt überall „HA95“. Die CSS-Variablen `win95-*` heißen jetzt `ha95-*`. Eigene Farbschemata und eigenes card-mod-CSS, die diese Variablen nutzen, müssen angepasst werden.
- Die Extras liegen jetzt unter `www/ha95/ha95.css` statt unter `www/win95/win95.css`. Die Dashboard-Ressource muss auf `/local/ha95/ha95.css` geändert werden.

## [2.0.0] – 2026-10-18

### Geändert (inkompatibel)
- Alle Themes umbenannt: „Windows 95“ → „HA 95“, „Windows 98“ → „HA 98“, „Windows 95 Rose/Spruce/Desert/Kontrast“ → „HA 95 Rose/Spruce/Desert/Kontrast“. Nach dem Update muss das Theme im Profil (und in Dashboards, die ein Theme festlegen) neu ausgewählt werden.
- Theme-Datei umbenannt: `themes/windows95.yaml` → `themes/ha95.yaml`. Bei manueller Installation die alte Datei löschen.

## [1.1.1] – 2026-10-18

### Geändert
- HACS zeigt das Paket jetzt als „HomeAssistant95“ an (vorher „Windows 95“). Die Namen der einzelnen Themes bleiben gleich.

## [1.1.0] – 2026-10-18

### Hinzugefügt
- Fünf weitere Themes: „Windows 98“ (Titelleisten mit Farbverlauf), „Windows 95 Rose“, „Windows 95 Spruce“, „Windows 95 Desert“ und „Windows 95 Kontrast“ (dunkel).
- `www/win95/win95.css` als Dashboard-Ressource: Pixel-Schrift „Pixelated MS Sans Serif“, Win95-Mauszeiger, graue Scrollbars, Markierungsfarbe.
- card-mod: Kartentitel als Fenster-Titelleiste mit _ □ ×-Knöpfen, Titelleiste in Detail-Dialogen, Seitenleiste mit 3D-Rahmen.
- Explizite `rgb-*`-Werte, damit halbtransparente Hervorhebungen zum Farbschema passen.

### Geändert
- Alle Farben laufen jetzt über `win95-*`-Variablen. So lassen sich eigene Farbschemata mit wenigen Zeilen anlegen.

## [1.0.0] – 2026-10-18

### Hinzugefügt
- Theme „Windows 95“: Teal-Desktop, graue 3D-Karten, Navy-Kopfzeile, Seitenleiste im Startmenü-Stil, eckige Kanten, weiße Eingabefelder, 16-Farben-Palette für Diagramme.
- Optionaler card-mod-Teil: Navy-Titelleisten für Kartentitel, eingedrückter Klick-Effekt.
