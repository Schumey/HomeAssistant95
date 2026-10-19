# Changelog

🇬🇧 [English](CHANGELOG.md) · 🇩🇪 **Deutsch**

Alle nennenswerten Änderungen an diesem Projekt. Format nach [Keep a Changelog](https://keepachangelog.com/de/1.1.0/), Versionierung nach [SemVer](https://semver.org/lang/de/).

## [3.10.0] – 2026-10-19

### Hinzugefügt
- Neue Designs **HA 95 Dark** (Dunkelmodus) und **HA 95 Auto**, das mit dem Hell-/Dunkelmodus des Profils oder des Betriebssystems zwischen HA 95 und HA 95 Dark wechselt.
- Startmenü: `ha95-startmenu.js` zeichnet jetzt den senkrechten Streifen „HomeAssistant**95**“ (Variable `ha95-banner`, bei HA 98 ein blauer Verlauf) und bunte Win95-Icons in der Seitenleiste und den Ausklappmenüs: rund 70 Icons mit schwarzem Umriss, farbiger Füllung und 3D-Schattierung, dazu 57 MDI-Namen, die darauf zeigen. Optionen `banner`, `banner_text` und `color_icons` in `ha95-startmenu.json`.
- UIX: Detail-Dialoge (more-info) als Win95-Fenster: Titelleiste „Name - Bereich“ mit kleinem ×-Knopf rechts, darunter eine Symbolleiste mit den Knöpfen als eckige 3D-Knöpfe.
- UIX: Karten, die ihren Titel selbst zeichnen (z. B. Markdown), bekommen ebenfalls eine Titelleiste.
- Doku: Schritt-für-Schritt-Anleitung für ein eigenes Startmenü ([docs/start-menu.de.md](docs/start-menu.de.md)). Die README ist jetzt eine kurze Übersicht, Details stehen in `docs/` (Fenster-Look, Startmenü, Pixel-Icons, Farbschemata, Deinstallieren), auf Englisch und Deutsch.

### Geändert
- Die Knöpfe in der Kopfleiste sind alle gleich groß (24×22) mit 2 px Abstand, auch der „+“-Knopf mit Ausklappmenü; ebenso auf den Einstellungsseiten.
- Karten bleiben eckig, auch wenn ein Dashboard per card-mod runde Ecken setzt.
- Custom-Sidebar-Beispiel: Der alte CSS-Streifen ist entfernt (er wirkte in HA 2026.10 nicht mehr), der Streifen kommt jetzt aus `ha95-startmenu.js`.

## [3.9.0] – 2026-10-18

### Hinzugefügt
- UIX: Kopfleiste von Dashboards und Einstellungsseiten als Win95-Titelleiste: 36 px hoch (`header-height`), Titelleistenfarbe bzw. Verlauf (HA 98), fetter Titel, kleine eckige graue 3D-Knöpfe ohne runden Hover-Kreis. card-mod bekommt den Grundlook über `card-mod-root` und `card-mod-top-app-bar-fixed`.
- UIX: Icons auf der Einstellungsseite als eckige 3D-Kacheln wie in der Win95-Systemsteuerung.
- UIX ab 8.4.0: Das Design lädt die Pixel-Schrift selbst (`uix-fonts`), sie erscheint damit auch auf Einstellungs- und anderen Nicht-Dashboard-Seiten.
- README: Anleitung zum Deinstallieren.

### Geändert
- Custom-Sidebar-Beispiel: „Start“-Titel und Uhr passen in die niedrigere Titelleiste.

## [3.8.0] – 2026-10-18

### Hinzugefügt
- Pixel-Icons: 537 Icons (vorher 89). Das Set deckt jetzt die 500 MDI-Icons ab, die Home Assistant am häufigsten nutzt, gezählt danach, wie oft sie in den `icons.json` aller Core-Integrationen und im Frontend vorkommen. Dazu gehören Knöpfe und Menüs (`plus`, `pencil`, `dots-vertical`, `chevron-*`, `arrow-*`, …), Energie (`solar-power`, `transmission-tower`, `ev-station`, `meter-electric`, …), Klima (`hvac`, `air-conditioner`, `fan-speed-1` bis `-3`, `heat-wave`, …), Wasser, Netzwerk, Medien, Zeit und viele `-off`-, `-alert`-, `-check`- und `-clock`-Varianten. Im automatischen Modus (`?replace`) ersetzen sie die MDI-Icons, für den Pixel-Filter bleiben also deutlich weniger übrig.
- 94 MDI-Aliasse (vorher 72).

### Nicht enthalten
- Markenlogos (`home-assistant`, `bluetooth`, `bluetooth-off`, `bluetooth-connect`, `zigbee`, `google-circles-communities`) sind nicht nachgezeichnet. Im automatischen Modus bringt der Pixel-Filter (`?pixelate`) sie trotzdem aufs Raster.

## [3.7.0] – 2026-10-18

### Hinzugefügt
- Startmenü mit Untermenüs: `www/ha95/ha95-startmenu.js` öffnet Win95-Ausklappmenüs rechts neben Einträgen der Seitenleiste, die `data-ha95-menu` tragen (per Custom-Sidebar-`attributes`). Die Menüs stehen in `/config/www/ha95-startmenu.json` und können Seiten öffnen, Dateien direkt im File editor öffnen, Home Assistant nach Win95-Rückfrage neu starten, Adressen öffnen und weitere Untermenüs enthalten. Funktioniert mit ausgeklappter Seitenleiste und als Schublade auf schmalen Bildschirmen.
- Beispielmenü `examples/startmenu/ha95-startmenu.json` („Tools“: File Editor mit häufig genutzten Dateien, Automationen, Skripte, Szenen, Helfer, Entwicklerwerkzeuge, Geräte & Dienste, Entitäten, Protokolle, Neustart) und ein passender Eintrag im Custom-Sidebar-Beispiel.

## [3.6.0] – 2026-10-18

### Geändert
- UIX: Auswahlfelder in Entitätskarten sehen jetzt wie eine Win95-Combobox aus: Beschriftung links (bündig mit den anderen Zeilen), einzeiliges weißes, eingelassenes Feld in der rechten Hälfte und ein 3D-▼-Knopf am Rand. Behebt die bisherigen Regeln, die in HA 2026.10 nicht mehr zum Aufbau des Auswahlfelds passten.
- UIX: Datums- und Zeitfelder in Entitätskarten: Beschriftung links, einzeilige weiße, eingelassene Felder so breit wie ihr Inhalt, Kalender-Knopf als 3D-Knopf, keine „hh“/„mm“-Beschriftungen.

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
