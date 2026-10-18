# Changelog

Alle nennenswerten Änderungen an diesem Projekt. Format nach [Keep a Changelog](https://keepachangelog.com/de/1.1.0/), Versionierung nach [SemVer](https://semver.org/lang/de/).

## [3.0.0] – 2026-10-18

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
