# HomeAssistant95 – Notizen für Claude

Ein Windows-95-Design für Home Assistant, verteilt über HACS (Typ Theme). Diese Datei beschreibt, wie das Repo aufgebaut ist, wie Releases laufen und welche Fallstricke es beim Stylen von Home Assistant gibt.

## Aufbau

| Pfad | Inhalt |
|---|---|
| `themes/ha95.yaml` | Das Design: 6 Themes (HA 95, HA 98, HA 95 Rose/Spruce/Desert/Kontrast). Variante = YAML-Anker `&ha95` plus überschriebene `ha95-*`-Farben. |
| `www/ha95/ha95.css` | Dashboard-Ressource: Pixel-Schrift, Mauszeiger, Scrollbars. |
| `www/ha95/ha95-icons.js` | Pixel-Icon-Set (`ha95:`), Modus `?replace` / `?pixelate`. **Wird generiert**, siehe unten. |
| `www/ha95/ha95-startmenu.js` | Win95-Ausklappmenüs an Seitenleisten-Einträgen mit `data-ha95-menu`; Menüs aus `/config/www/ha95-startmenu.json`. |
| `examples/custom-sidebar/` | Beispielkonfiguration für Custom Sidebar (Seitenleiste als Startmenü). |
| `examples/startmenu/` | Beispielmenü für `ha95-startmenu.js`. |
| `local/` | Gitignored: persönliche Dateien des Nutzers und der Icon-Generator. Ist nicht auf GitHub und muss beim PC-Wechsel von Hand mitgenommen werden. |

Alle Farben laufen über `ha95-*`-Variablen. Neue Regeln nutzen diese Variablen statt fester Farben, damit alle Varianten mitziehen. Die Kommentare in den Dateien sind deutsch.

## Icon-Generator

`www/ha95/ha95-icons.js` wird aus `local/icon-generator/` erzeugt (`build.py`, `template.js`, `icons*.py`). Die Datei nie von Hand ändern, sonst überschreibt der nächste Generator-Lauf die Änderung. Ausnahme: die Versionszeile, dann aber auch in `local/icon-generator/template.js`.

## Release-Ablauf

1. `git pull --ff-only`, `git status` prüfen.
2. Änderungen machen, Versionszeile (`Version: x.y.z`) in allen Dateiköpfen gleich setzen: `themes/ha95.yaml`, `www/ha95/*.css`, `www/ha95/*.js`, `examples/custom-sidebar/custom-sidebar-config.yaml` (und `local/icon-generator/template.js`).
3. Changelog **und** README immer in beiden Sprachen pflegen: `CHANGELOG.md` / `README.md` (Englisch, Standard, HACS zeigt README.md) und `CHANGELOG.de.md` / `README.de.md` (Deutsch).
4. Nur mit expliziten Pfaden committen (`git add -- datei …`), **nie** `git add -A`. Es arbeiten oft mehrere Sitzungen parallel im selben Ordner.
5. Annotiertes Tag `vX.Y.Z`, pushen, GitHub-Release mit dem Changelog-Abschnitt auf Englisch und Deutsch in den Notes.
6. SemVer: Umbenennungen von Themes, Variablen oder Dateipfaden sind inkompatibel (Hauptversion).
7. Arbeitet eine andere Sitzung parallel: Releases nacheinander, nach dem eigenen Release per Nachricht übergeben (Commit, Tag, was geändert wurde).

Deutsche HA-Oberfläche: „Werkzeuge → YAML → **Designs** neu laden“ und „Profil → **Design**“ (nicht „Themes“).

## card-mod und UIX

- **card-mod 4.2.1** ist ungepflegt. Ab HA 2026.8 hängt es sich komplett auf, sobald ein Theme irgendeinen `card-mod-…-yaml`-Schlüssel enthält. Deshalb gibt es im Theme nur einfache `card-mod-*`-Schlüssel (Grundlook) und **keine** `card-mod-…-yaml`.
- **UIX** (UI eXtension) ist der Nachfolger. Lesereihenfolge: `uix-X-yaml` > `card-mod-X-yaml` > `uix-X` > `card-mod-X`. `card-mod-theme` reicht als Theme-Name.
- **UIX-Pfade:**
  - Leerzeichen trennen Schritte, `>` oder `:scope` gehen nicht.
  - Zwischenschritte nehmen nur das **erste** Element.
  - `$` wechselt in den Shadow-Root aller Treffer, `$$` sucht über alle Shadow-Roots hinweg (nicht als erster Schritt).
  - Attribute in einem Schritt gehen, z. B. `ha-icon-button[slot=actionItems]`.
- **Wo Pfade starten:** am Elternknoten des `uix-node`. Bei `card`, `row`, `root` und `top-app-bar-fixed` ist das der Shadow-Root. Bei `top-app-bar-fixed` ist der Light-DOM (geslottete Knöpfe, Seiteninhalt) deshalb nicht erreichbar. Regeln für die Einstellungsseite gehören in `uix-config-yaml`, das an `ha-panel-config` hängt.
- **Pixel-Schrift** über `uix-fonts` (ab UIX 8.4.0). Damit erscheint sie auch außerhalb von Dashboards.
- **Theme-Variablen** wirken nicht, wenn eine Komponente sie in `:host` selbst setzt (z. B. `--control-circular-slider-*`, `--control-slider-*`). Dann braucht es UIX auf das Element.
- **Als Theme-Variablen funktionieren:** `ha-switch-*`, `ha-slider-*`, `ha-color-form-background*`, `header-height`, `state-climate-*-color`, `state-humidifier-on-color`.
- **Gleiche Spezifität:** Ein eingefügtes `<style>` verliert gegen die `adoptedStyleSheets` der Komponente. Darum oft `!important`.

## HA-2026.10-Frontend (Stand Oktober 2026)

- **Auswahlfeld:** `ha-select` → `ha-picker-field` → `ha-combo-box-item`. Die Beschriftung steht in `data-aria-label`.
- **Datum/Uhrzeit:** `ha-date-input` / `ha-base-time-input` mit `ha-input` → `wa-input` (Parts `base`, `label`, `input`, `hint`).
- **Schalter:** `ha-switch` (Web Awesome), Parts `control` und `thumb`.
- **Schieberegler:** `ha-slider`, Parts `track`, `indicator`, `thumb`.
- **Schmale Seitenleiste:** Sie ist ein modaler Dialog, alles außerhalb davon ist dann inert. Popups wie das Startmenü hängen deshalb als `popover` im Shadow-Root von `ha-sidebar`.
- **More-info-Dialog:** jetzt `ha-adaptive-dialog`.
- **Einstellungsseiten:** Kopfleiste `ha-top-app-bar-fixed`, Icons in `ha-config-navigation-list` (`.icon-background`).
- **File editor** (Panel `core_configurator`, Basis `/homeassistant`): Datei öffnen mit `iframe.contentWindow.loadfile(pfad, name)`, Lesen und Speichern über `api/file?filename=` bzw. POST `api/save` aus dem Ingress-iframe.

## Arbeitsweise

- Regeln möglichst **live abstimmen**: im HA-Tab des eingebauten Browsers Styles per JavaScript in die Shadow-Roots einspielen, Screenshot, nachjustieren, erst dann ins Theme übernehmen. Blind gebaute Selektoren treffen das echte DOM oft nicht.
- Die Quellen von HA-Frontend, UIX und Custom Sidebar auf GitHub lesen, bevor man Selektoren rät.
- Der Nutzer meldet sich im Browser selbst an. Änderungen an seiner HA-Konfiguration nur nach Rückfrage und mit Sicherungskopie.
