# HomeAssistant95

🇬🇧 [English](README.md) · 🇩🇪 **Deutsch**

Ein Windows-95-Theme für [Home Assistant](https://www.home-assistant.io/): Teal-Desktop, graue 3D-Fenster, Navy-Titelleisten, eckige Kanten und Pixel-Schrift.

## Enthaltene Designs

| Design | Beschreibung |
|---|---|
| **HA 95** | Das Standard-Farbschema |
| **HA 98** | Wie 95, aber mit Farbverlauf in den Titelleisten |
| **HA 95 Rose** | Nachempfunden dem Farbschema „Rose“ |
| **HA 95 Spruce** | Nachempfunden dem Farbschema „Fichte“ |
| **HA 95 Desert** | Nachempfunden dem Farbschema „Wüste“ |
| **HA 95 Kontrast** | „Kontrast Schwarz“, die dunkle Variante |

## Installation

### Über HACS

1. HACS → ⋮ → **Benutzerdefinierte Repositories** → URL dieses Repos, Typ **Theme**.
2. „HomeAssistant95“ installieren.
3. **Werkzeuge → YAML → Designs neu laden**.
4. Unter **Profil → Design** eine der Varianten auswählen.

### Manuell

1. `themes/ha95.yaml` nach `/config/themes/` kopieren.
2. In `configuration.yaml` (falls noch nicht vorhanden):
   ```yaml
   frontend:
     themes: !include_dir_merge_named themes
   ```
3. Konfiguration prüfen, dann **Werkzeuge → YAML → Designs neu laden**. Wenn `frontend:` neu ist, einmal neu starten.
4. Unter **Profil → Design** auswählen.

## Klima & Luftbefeuchter

Das Design färbt Klima- und Luftbefeuchter-Entitäten in der 16-Farben-Palette: Heizen rot, Kühlen blau, Automatik grün, Luftbefeuchter teal. Das betrifft den Ring der Thermostat-Karte, Icons, Kacheln und den Verlauf. Die Farben stehen als `ha95-heat`, `ha95-cool`, `ha95-auto`, `ha95-heat-cool`, `ha95-dry`, `ha95-fan` und `ha95-humid` im Farbschema und lassen sich pro Variante ändern.

Mit UIX (siehe unten) bekommen Thermostat- und Luftbefeuchter-Karte außerdem einen Ring im Win95-Stil (eckige Enden, volle Farben, eckiger Griff) und eckige 3D-Knöpfe für + und −.

## Schalter

Kippschalter bekommen überall Win95-Farben: weiße Spur, grauer Knopf, eingeschaltet navy. Mit UIX werden die Schalter in Entitätskarten (Zeilen und Schalter in der Kopfzeile) zu echten Win95-Kontrollkästchen: ein eingelassenes weißes Kästchen mit Pixel-Häkchen.

## Schieberegler & Eingabefelder

Schieberegler (z. B. für `input_number`) werden zu Win95-Trackbars: eine eingelassene weiße Rille und ein erhabener grauer Griff. Das klappt mit card-mod und UIX. Mit UIX sehen Auswahl-, Datums- und Zeitfelder in Entitätskarten wie Win95-Dialogelemente aus: Beschriftung links, bündig mit den anderen Zeilen, daneben ein weißes, eingelassenes Feld. Auswahlfelder nehmen die rechte Hälfte der Zeile ein, mit einem 3D-▼-Knopf am Rand. Datums- und Zeitfelder sind nur so breit wie ihr Inhalt, ohne die Beschriftungen „hh“/„mm“. Außerhalb von Dashboards sind die Felder zumindest weiß.

## Extras (optional)

### Pixel-Schrift & Mauszeiger

1. `www/ha95/ha95.css` nach `/config/www/ha95/` kopieren.
2. **Einstellungen → Dashboards → ⋮ → Ressourcen** → `/local/ha95/ha95.css`, Typ **Stylesheet**.

Die Schrift „Pixelated MS Sans Serif“ stammt aus [98.css](https://github.com/jdan/98.css) (MIT) und wird über jsDelivr geladen.

### Pixel-Icons

`www/ha95/ha95-icons.js` bringt ein Icon-Set in Win95-Pixeloptik mit: 89 Icons im 24×24-Raster, Umriss in voller Farbe, Füllung mit halber Deckkraft. Sie werden wie alle Icons nach dem Zustand der Entität eingefärbt. Die Namen folgen MDI, aus `mdi:lightbulb-on` wird `ha95:lightbulb-on`. Unbekannte Namen zeigen `ha95:help`.

1. `www/ha95/ha95-icons.js` nach `/config/www/ha95/` kopieren.
2. In `configuration.yaml`:
   ```yaml
   frontend:
     extra_module_url:
       - /local/ha95/ha95-icons.js
   ```
3. Home Assistant neu starten und die Seite neu laden.
4. Überall, wo man ein Icon wählen kann, z. B. `icon: ha95:thermostat` eintragen. Die Icon-Auswahl zeigt sie an, wenn man `ha95` tippt.

Alternativ geht die Datei auch als Dashboard-Ressource (Typ **JavaScript-Modul**). Dann erscheinen die Icons aber nur in Dashboards, nicht in der Seitenleiste.

Enthalten: `account`, `air-humidifier`, `alert`, `alert-circle`, `battery`, `battery-10`, `battery-20`, `battery-30`, `battery-40`, `battery-50`, `battery-60`, `battery-70`, `battery-80`, `battery-90`, `battery-alert`, `battery-charging`, `battery-outline`, `bell`, `blinds`, `blinds-open`, `calendar`, `camera`, `chart-line`, `check-circle`, `clock`, `cog`, `door-closed`, `door-open`, `eye`, `fan`, `fan-off`, `file-document`, `fire`, `flash`, `flower`, `folder`, `folder-open`, `garage`, `garage-open`, `help`, `home`, `information`, `leaf`, `lightbulb`, `lightbulb-off`, `lightbulb-on`, `lock`, `lock-open`, `magnify`, `map`, `monitor`, `motion-sensor`, `music`, `music-note`, `pause`, `play`, `power`, `power-plug`, `power-plug-off`, `power-socket-de`, `radiator`, `robot-vacuum`, `shield`, `snowflake`, `speaker`, `stop`, `television`, `thermometer`, `thermostat`, `toggle-switch-variant`, `toggle-switch-variant-off`, `trash-can`, `view-dashboard`, `volume-high`, `volume-medium`, `volume-mute`, `washing-machine`, `water`, `weather-cloudy`, `weather-fog`, `weather-lightning`, `weather-night`, `weather-partly-cloudy`, `weather-rainy`, `weather-snowy`, `weather-sunny`, `wifi`, `window-closed`, `window-open`. Viele weitere MDI-Namen zeigen auf eins davon, z. B. `lightbulb-outline`, `home-outline`, `roller-shade-closed` oder `toggle-switch`. Jedes Icon steht als lesbares Textraster in der Datei, man kann sie also anpassen oder eigene ergänzen.

#### Automatischer Modus

Statt jedes Icon von Hand umzustellen, kann die Datei das selbst erledigen. Dafür hängt man in `configuration.yaml` eine Option an die URL:

| URL | Wirkung |
|---|---|
| `/local/ha95/ha95-icons.js?replace` | Jedes `mdi:`-Icon, das es auch als `ha95:` gibt, wird automatisch ersetzt, auch die Standard-Icons der Entitäten. |
| `/local/ha95/ha95-icons.js?pixelate` | Alle übrigen Icons (ganz MDI, auch Knöpfe und Menüs) werden auf das 24×24-Pixelraster gebracht. |
| `/local/ha95/ha95-icons.js?replace&pixelate` | Beides: gezeichnete Icons, wo vorhanden, verpixeltes MDI für den Rest. |

Nach dem Ändern der URL Home Assistant neu starten. Beide Modi greifen in die Icon-Komponenten des Frontends ein, wie bei UIX also nach Home-Assistant-Updates kurz prüfen. Icons mit eigener `viewBox` (aus anderen Icon-Sets) bleiben unverändert.

### Fenster-Look mit UIX (oder card-mod)

Mit [UIX – UI eXtension](https://github.com/Lint-Free-Technology/uix) (HACS) werden Karten mit Titel zu Fenstern mit Titelleiste und _ □ ×-Knöpfen. Karten sehen beim Klicken eingedrückt aus, Thermostat- und Luftbefeuchter-Karte bekommen eckige 3D-Knöpfe, und Schalter in Entitätskarten werden zu Kontrollkästchen. Ohne UIX oder card-mod wird dieser Teil ignoriert.

UIX ist der gepflegte Nachfolger von card-mod und liest auch dessen Einstellungen. In HACS installieren, dann unter **Einstellungen → Geräte & Dienste** hinzufügen (es ist eine Integration). Ist noch card-mod installiert, vorher entfernen, auch einen `extra_module_url`-Eintrag dafür.

**Noch card-mod?** [card-mod](https://github.com/thomasloven/lovelace-card-mod) 4.2.1 wird nicht mehr gepflegt. Seit HA 2026.8 hört es komplett auf zu stylen, sobald ein Design `card-mod-…-yaml`-Schlüssel enthält. Dieses Design gibt card-mod deshalb nur den Grundlook (Titelleisten, Klick-Effekt). Thermostat-Knöpfe und Kontrollkästchen stehen in `uix-…-yaml`-Schlüsseln, die nur UIX liest.

> UIX und card-mod greifen in Interna des Frontends ein. Nach Home-Assistant-Updates kurz prüfen, ob alles noch passt.

### Seitenleiste als Startmenü

Mit [Custom Sidebar](https://github.com/elchininet/custom-sidebar) (HACS) wird die Seitenleiste zum Startmenü: „Start“-Titel mit Uhr, 3D-Rahmen, blaue Markierung und der senkrechte „HomeAssistant95“-Streifen links. Einträge können Zusatzinfos zeigen, z. B. die aktuelle Temperatur unter „Heizung“ oder ein rotes „!“, wenn der Saugroboter einen Fehler meldet.

1. [`examples/custom-sidebar/custom-sidebar-config.yaml`](examples/custom-sidebar/custom-sidebar-config.yaml) nach `/config/www/custom-sidebar-config.yaml` kopieren.
2. Im Abschnitt `order` die Namen und Entitäts-IDs an dein System anpassen.
3. Seite neu laden.

Alle Farben kommen aus den `ha95-*`-Variablen, die Seitenleiste wechselt also mit dem gewählten Design mit. Das Beispiel nutzt die [Pixel-Icons](#pixel-icons). Ohne sie `ha95:` durch `mdi:` ersetzen.

### Startmenü mit Untermenüs

`www/ha95/ha95-startmenu.js` bringt Win95-Ausklappmenüs in die Seitenleiste: Maus auf einen Eintrag (oder antippen), dann klappt rechts ein Menü auf, auch mit weiteren Untermenüs. Das Beispiel baut ein Menü „Werkzeuge“ mit:

- **File Editor ▶** öffnet häufig genutzte Dateien (z. B. `configuration.yaml`, `automations.yaml`) direkt in der App [File editor](https://github.com/home-assistant/addons/tree/master/configurator)
- Automationen, Skripte, Szenen, Helfer, Entwicklerwerkzeuge ▶, Geräte & Dienste, Entitäten, Protokolle
- **Neu starten …** mit Rückfrage im Win95-Stil

Einrichtung:

1. `www/ha95/ha95-startmenu.js` nach `/config/www/ha95/` kopieren und in `configuration.yaml` laden:
   ```yaml
   frontend:
     extra_module_url:
       - /local/ha95/ha95-startmenu.js
   ```
2. [`examples/startmenu/ha95-startmenu.json`](examples/startmenu/ha95-startmenu.json) nach `/config/www/ha95-startmenu.json` kopieren und anpassen (das Beispiel ist englisch beschriftet, die Namen sind frei wählbar).
3. In der Custom-Sidebar-Konfiguration einen Eintrag mit dem Attribut `data-ha95-menu` anlegen (siehe den Eintrag „Tools“ am Ende des [Beispiels](examples/custom-sidebar/custom-sidebar-config.yaml)).
4. Home Assistant neu starten und die Seite neu laden.

Einträge in der JSON-Datei:

| Eintrag | Bewirkt |
|---|---|
| `{ "name": "…", "icon": "mdi:…", "path": "/config/…" }` | öffnet eine Seite |
| `{ "name": "…", "file": "configuration.yaml" }` | öffnet die Datei im File editor (relativ zu `file_editor_base`, Standard `/homeassistant`) |
| `{ "name": "…", "action": "restart" }` | startet Home Assistant nach Rückfrage neu |
| `{ "name": "…", "url": "https://…" }` | öffnet eine Adresse in einem neuen Tab |
| `{ "name": "…", "items": [ … ] }` | weiteres Untermenü |
| `{ "divider": true }` | Trennlinie |

Läuft der File editor unter einem anderen Panel-Namen als `core_configurator`, in der JSON-Datei `file_editor_panel` setzen.

## Eigenes Farbschema

Alle Farben laufen über die `ha95-*`-Variablen am Anfang der Datei. Kopiere eine Variante, gib ihr einen neuen Namen (auch bei `card-mod-theme`) und ändere nur diese Werte sowie die `rgb-*`-Zeilen.

## Lizenz

MIT. Windows ist eine Marke der Microsoft Corporation. Dieses Projekt ist eine Hommage und steht in keiner Verbindung zu Microsoft.
