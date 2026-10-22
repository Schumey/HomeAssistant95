# HomeAssistant95 – Notizen für Claude

Ein Windows-95-Design für Home Assistant, verteilt über HACS als Integration (Typ Integration, seit 4.0.0; vorher Typ Theme). Diese Datei beschreibt, wie das Repo aufgebaut ist, wie Releases laufen und welche Fallstricke es beim Stylen von Home Assistant gibt.

## Aufbau

| Pfad | Inhalt |
|---|---|
| `custom_components/ha95/` | Die Integration: `__init__.py` (kopiert die gewählten Themes nach `/config/themes/ha95/`, stellt `www/` unter `/ha95/` bereit, trägt die Module per `add_extra_js_url` ein, mit `?v=<manifest-Version>` gegen Cache), `config_flow.py` (Einrichtung und Optionen: Themes, Module, Pixel-Icons-Modus), `const.py`, `manifest.json` (Version dort mitziehen), `strings.json` und `translations/{en,de}.json`. |
| `custom_components/ha95/themes/*.yaml` | Das Design: je Theme eine Datei, 15 Themes (HA 95, HA 98, HA 95 Rose/Spruce/Desert/Regenwald/Patriot/Kontrast/Dark/Auto, HA 3.11 mit Hot Dog Stand/Arizona/Ozean/Schwarze Lederjacke). **Wird generiert**, siehe Theme-Generator (Anker und Merge sind je Datei aufgelöst; der Name steht in der Kopfzeile `# HA 95 – Theme "…"`, die die Integration ausliest). In der Quelle ist Variante = YAML-Anker `&ha95` plus überschriebene `ha95-*`-Farben. Die dunklen Farben stehen einmal als Anker `&ha95dark` unter `HA 95 Auto` → `modes: dark:`; `HA 95 Dark` nutzt `<<: [*ha95dark, *ha95]`. |
| `custom_components/ha95/www/ha95.css` | Pixel-Schrift, Mauszeiger, Scrollbars; geladen über `ha95-css.js` (legt ein `<link>` an). |
| `custom_components/ha95/www/ha95-screensaver.js` | Bildschirmschoner (Sterne, Logos, Röhren), Einstellungen unter `screensaver` in `/config/www/ha95-startmenu.json`; Startmenü-Aktion `screensaver`. |
| `custom_components/ha95/www/ha95-minesweeper.js` | Minesweeper als Win95-Fenster; Startmenü-Aktion `minesweeper`. |
| `custom_components/ha95/www/ha95-icons.js` | Pixel-Icon-Set (`ha95:`), Modus `?replace` / `?pixelate` (setzt die Integration je nach Auswahl). **Wird generiert**, siehe unten. |
| `custom_components/ha95/www/ha95-startmenu.js` | Startmenü: senkrechter Streifen, bunte Icons in Seitenleiste und Menüs, Win95-Ausklappmenüs an Einträgen mit `data-ha95-menu`; Menüs und Optionen aus `/config/www/ha95-startmenu.json`. Der Block zwischen `// <color-icons>` und `// </color-icons>` **wird generiert**, siehe unten. |
| `examples/custom-sidebar/` | Beispielkonfiguration für Custom Sidebar (Seitenleiste als Startmenü). |
| `examples/startmenu/` | Beispielmenü für `ha95-startmenu.js`. |
| `examples/test-dashboard/` | Prüfseite „HA95 Test“ mit je einer Karte jeder Art. Die Fassung mit den echten Entitäten des Nutzers liegt in `local/dashboard-test.yaml` (in HA als Dashboard `ha95-test`). |
| `docs/` | Ausführliche Anleitungen, je `name.md` (Englisch) und `name.de.md` (Deutsch): Fenster-Look, Startmenü (mit „Eigenes Menü bauen“), Pixel-Icons, Farbschemata, Deinstallieren. Die README ist nur die Übersicht und verlinkt dorthin. |
| `local/` | Gitignored: persönliche Dateien des Nutzers, Theme- und Icon-Generator. Eigenes privates Repo `Schumey/HomeAssistant95-local`; auf einem neuen PC mit `git clone https://github.com/Schumey/HomeAssistant95-local.git local` holen, Änderungen dort committen und pushen. |

Alle Farben laufen über `ha95-*`-Variablen. Neue Regeln nutzen diese Variablen statt fester Farben, damit alle Varianten mitziehen. Die Kommentare in den Dateien sind deutsch.

## Theme-Generator

Die Dateien in `custom_components/ha95/themes/` werden aus `local/theme-generator/` gebaut (je Theme eine Datei, per PyYAML aufgelöst und verlustfrei geprüft): `ha95.src.yaml` ist das Theme mit Zeilen `@include name`, die `build.py` durch `blocks/name.css` ersetzt (eingerückt wie die Zeile, verschachtelbar). So steht CSS, das `card-mod-*` und `uix-*-yaml` oder Thermostat und Luftbefeuchter gemeinsam nutzen, nur einmal da. Änderungen am Theme immer in der Quelle machen, dann `python local/theme-generator/build.py` (mit `--check` nur prüfen). Die Theme-Dateien nie von Hand ändern.

`HA 3.11` ist ein Anker `&ha311` (selbst `<<: *ha95`), seine Farbvarianten nutzen `<<: *ha311`. Fensterstil-Variablen: `ha95-card`, `ha95-frame(-pressed|-width)`, `ha95-title-buttons(-width)`, `ha95-title-menu(-width)`, `ha95-title-align`.

## Icon-Generator

`custom_components/ha95/www/ha95-icons.js` wird aus `local/icon-generator/` erzeugt (`build.py`, `template.js`, `icons*.py`). Die Datei nie von Hand ändern, sonst überschreibt der nächste Generator-Lauf die Änderung. Ausnahme: die Versionszeile, dann aber auch in `local/icon-generator/template.js`.

Die bunten Startmenü-Icons erzeugt `local/icon-generator/color_icons.py` (Icons ohne Raster in `ha95-icons.js` stehen dort als Rechteck-Zeichnungen in `DRAWN`): Es liest die Raster aus `ha95-icons.js`, färbt sie nach den Regeln in `SPEC` (Umriss schwarz, Füllfarbe, Rechtecke, Flutfüllung, automatische 3D-Schattierung) und schreibt den Block in `ha95-startmenu.js`. Vorschau als PNG (ohne PIL): `python local/icon-generator/preview_png.py [namen…]` → `local/color-icons-preview.png`, links auf Grau, rechts auf Navy (markiert). Reine Strich-Icons nicht in Navy färben, sonst verschwinden sie auf der Markierung.

## Release-Ablauf

0. Vorher `python local/release-check.py <x.y.z>` laufen lassen: prüft Versionszeilen, Theme-Generator, Changelogs, READMEs (jedes Theme und Modul genannt), JSON und `node --check`.

1. `git pull --ff-only`, `git status` prüfen.
2. Änderungen machen, Versionszeile (`Version: x.y.z`) in allen Dateiköpfen gleich setzen und `version` in `custom_components/ha95/manifest.json` (die Anleitungen haben kein `?v=` mehr, die Integration hängt die Manifest-Version selbst an): `custom_components/ha95/www/*.css`, `custom_components/ha95/www/*.js`, `examples/custom-sidebar/custom-sidebar-config.yaml` (und `local/icon-generator/template.js`, `local/theme-generator/ha95.src.yaml`, danach `build.py`).
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
- **Pfad herausfinden:** UIX bringt `uix_style_path(element)` und `uix_tree(element)` mit (in der Konsole aufrufen). Die Ausgabe nennt den UIX-Elternknoten und den genauen Pfad für das Theme. Vor dem Schreiben eines neuen Pfads immer damit prüfen.
- **`:scope` im Shadow-Root:** `shadowRoot.querySelector(":scope > …")` findet nichts. In `ha95-startmenu.js` führte das zu einer Endlosschleife mit dem MutationObserver und fror die ganze Oberfläche ein.
- **Gleiche Spezifität:** Ein eingefügtes `<style>` verliert gegen die `adoptedStyleSheets` der Komponente. Darum oft `!important`.

## HA-2026.10-Frontend (Stand Oktober 2026)

- **Auswahlfeld:** `ha-select` → `ha-picker-field` → `ha-combo-box-item`. Die Beschriftung steht in `data-aria-label`.
- **Datum/Uhrzeit:** `ha-date-input` / `ha-base-time-input` mit `ha-input` → `wa-input` (Parts `base`, `label`, `input`, `hint`).
- **Schalter:** `ha-switch` (Web Awesome), Parts `control` und `thumb`.
- **Schieberegler:** `ha-slider`, Parts `track`, `indicator`, `thumb`.
- **Dialoge:** UIX-Typ `dialog` hängt an `ha-dialog`/`ha-adaptive-dialog` jedes Dialogs (Klasse `type-<dialog-tag ohne ha->`, z. B. `type-quick-bar`, `type-dialog-box`). Der `uix-node` liegt im Light-DOM des Dialogs, `.` wirkt im Shadow-Root des Dialog-Elements (Titel, `ha-dialog-footer` mit `ha-button[slot=primaryAction|secondaryAction]`). Pfade mit `&.type-quick-bar …` gelten nur für einen Dialog. `:host(:has(…))` geht in Chrome nicht.
- **Meldungen:** UIX-Typ `toast` an `ha-toast` (in `notification-manager`), `$` ist dessen Shadow-Root (`.toast`).
- **Schnellsuche:** `ha-quick-bar` (im Shadow-Root von `home-assistant`) → `ha-adaptive-dialog` → `ha-picker-combo-box` (Shadow: `ha-input-search`, `ha-chip-set.sections` mit `ha-filter-chip`, Liste). Öffnen per `quickBar.showDialog({})`; synthetische Tastendrücke sind unzuverlässig.
- **Regler:** `ha-control-slider` (Kachel-Features, Detail-Dialog) und `ha-control-circular-slider` setzen ihre Variablen in `:host`, darum UIX mit `$$`, z. B. `"hui-card-features $$ ha-control-slider $"`. `$$` sammelt alle Treffer über alle Shadow-Roots.
- **Ansichten-Tabs:** in `hui-root` als `ha-tab-group` > `ha-tab-group-tab` (Part `base`), erreichbar aus `uix-root-yaml` `.`.
- **Schmale Seitenleiste:** Sie ist ein modaler Dialog, alles außerhalb davon ist dann inert. Popups wie das Startmenü hängen deshalb als `popover` im Shadow-Root von `ha-sidebar`.
- **More-info-Dialog:** `ha-more-info-dialog $ ha-adaptive-dialog $ ha-dialog $ ha-dialog-header $`. In `uix-more-info-yaml` starten Pfade **bei `ha-adaptive-dialog` selbst**, also `"$ ha-dialog $ ha-dialog-header $"`. Die Knöpfe (`ha-icon-button[slot=headerNavigationIcon|headerActionItems]`, `ha-dropdown[slot=headerActionItems]`) und der Titel (`.title` mit `.breadcrumb` und `.main`) liegen im Shadow-Root von `ha-more-info-dialog`.
- **Bottom-Sheet (Handy, schmale Fenster):** `ha-adaptive-dialog` nimmt dann `ha-bottom-sheet` statt `ha-dialog`. Der Kopf liegt als `ha-dialog-header` direkt im Light-DOM des Sheets (UIX-Pfad `"$ ha-dialog-header $"`), der Zieh-Griff `.handle-wrapper` in `"$ ha-bottom-sheet $"` (absolut oben, verdeckte sonst den Titel).
- **Touch:** Beim Tippen schickt der Browser vor `click` ein nachgemachtes `mouseover`/`mouseenter`. Hover-Logik darum über `pointerover`/`pointerenter` mit `pointerType === "mouse"`.
- **Titel von `ha-card`:** Karten wie Markdown übergeben den Titel als `header` an `ha-card`, das ihn in seinem eigenen Shadow-Root als `h1.card-header` zeichnet. Erreichbar mit dem UIX-Pfad `"ha-card $"`.
- **Kopfleisten-Knöpfe:** In `hui-root` liegen sie in `.action-items`, einer davon steckt in einem `ha-dropdown` und war ohne feste Maße kleiner als die anderen.
- **Seitenleiste:** `ha-sidebar $` enthält `div.menu` (Titel) und `div.panels-list` (alle Einträge, auch die unteren). `.sidebar-shell` gibt es nicht mehr. Einträge sind `ha-list-item-button` mit `ha-icon` (benutzerdefiniert, `icon`-Name) oder `ha-svg-icon` (eingebaut, nur `href`).
- **Einstellungsseiten:** Kopfleiste `ha-top-app-bar-fixed`, Icons in `ha-config-navigation-list` (`.icon-background`).
- **File editor** (Panel `core_configurator`, Basis `/homeassistant`): Datei öffnen mit `iframe.contentWindow.loadfile(pfad, name)`, Lesen und Speichern über `api/file?filename=` bzw. POST `api/save` aus dem Ingress-iframe.

## Arbeitsweise

- Regeln möglichst **live abstimmen**: im HA-Tab des eingebauten Browsers Styles per JavaScript in die Shadow-Roots einspielen, Screenshot, nachjustieren, erst dann ins Theme übernehmen. Blind gebaute Selektoren treffen das echte DOM oft nicht.
- HA im eingebauten Browser über Tailscale öffnen: `https://homeassistant.tail5ce62d.ts.net/` (die LAN-Adresse `http://192.168.178.27/` geht nur im Heimnetz). `homeassistant.local` wird dort blockiert, ebenso Zugriffe auf `localhost` (ein lokaler Testserver für geänderte Module geht also nicht) und `file://`. Geänderte JS-Module daher stückweise per JavaScript einspielen. Farbschemata testen: `ha95-*`-Variablen per `document.documentElement.style.setProperty` setzen.
- **Dateien in HA einspielen** (nur auf Wunsch des Nutzers): über die File-editor-API im Ingress, `GET api/file?filename=…` und `POST api/save` (Formular mit `filename`, `text`). Vorher immer eine Sicherung `*.bak-vor-x.y` daneben speichern. Große Dateien gzip+base64 übertragen, im Browser mit `DecompressionStream` entpacken und per Prüfsumme (h = h·31 + Zeichen, 32 Bit) gegen die lokale Datei prüfen. Danach `frontend.reload_themes` aufrufen und für JS-Module den Browser-Cache mit `fetch(url, {cache: "reload"})` erneuern. Hängt die HA-Oberfläche, ist der File editor direkt unter `/api/hassio_ingress/<token>/` erreichbar. Seit 4.0.0 liegt alles in `/homeassistant/custom_components/ha95/` (Theme-Dateien dort in `themes/`, Module in `www/`); Python-Änderungen brauchen einen HA-Neustart, Theme-Dateien muss die Integration erst nach `/config/themes/ha95/` kopieren (Integration neu laden).
- Das HA-MCP läuft nur lesend: Dashboards und Zustände lesen ja, schreiben nein. Vorschläge für persönliche Dashboards als YAML in `local/` ablegen (z. B. `local/dashboard-batterien.yaml`).
- Screenshots im eingebauten Browser sind verkleinert (1125 px CSS-Breite → 800 px). Für Maße `getBoundingClientRect()` statt Augenmaß nehmen.
- Die Quellen von HA-Frontend, UIX und Custom Sidebar auf GitHub lesen, bevor man Selektoren rät.
- Der Nutzer meldet sich im Browser selbst an. Änderungen an seiner HA-Konfiguration nur nach Rückfrage und mit Sicherungskopie.
