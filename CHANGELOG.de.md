# Changelog

🇬🇧 [English](CHANGELOG.md) · 🇩🇪 **Deutsch**

Alle nennenswerten Änderungen an diesem Projekt. Format nach [Keep a Changelog](https://keepachangelog.com/de/1.1.0/), Versionierung nach [SemVer](https://semver.org/lang/de/).

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
