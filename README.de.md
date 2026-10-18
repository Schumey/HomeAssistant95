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

Schieberegler (z. B. für `input_number`) werden zu Win95-Trackbars: eine eingelassene weiße Rille und ein erhabener grauer Griff. Das klappt mit card-mod und UIX. Mit UIX werden in Entitätskarten außerdem Eingabe-, Auswahl-, Datums- und Zeitfelder zu weißen, eingelassenen Kästchen, der Pfeil im Auswahlfeld wird zum 3D-Knopf. Außerhalb von Dashboards sind die Felder zumindest weiß.

## Extras (optional)

### Pixel-Schrift & Mauszeiger

1. `www/ha95/ha95.css` nach `/config/www/ha95/` kopieren.
2. **Einstellungen → Dashboards → ⋮ → Ressourcen** → `/local/ha95/ha95.css`, Typ **Stylesheet**.

Die Schrift „Pixelated MS Sans Serif“ stammt aus [98.css](https://github.com/jdan/98.css) (MIT) und wird über jsDelivr geladen.

### Pixel-Icons

`www/ha95/ha95-icons.js` bringt ein Icon-Set in Win95-Pixeloptik mit: 57 Icons im 24×24-Raster, Umriss in voller Farbe, Füllung mit halber Deckkraft. Sie werden wie alle Icons nach dem Zustand der Entität eingefärbt. Die Namen folgen MDI, aus `mdi:lightbulb-on` wird `ha95:lightbulb-on`. Unbekannte Namen zeigen `ha95:help`.

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

Enthalten: `account`, `air-humidifier`, `alert`, `battery`, `battery-50`, `battery-outline`, `bell`, `blinds`, `blinds-open`, `calendar`, `camera`, `chart-line`, `clock`, `cog`, `door-closed`, `door-open`, `fan`, `file-document`, `fire`, `flash`, `flower`, `folder`, `folder-open`, `help`, `home`, `information`, `lightbulb`, `lightbulb-on`, `lock`, `lock-open`, `magnify`, `map`, `monitor`, `motion-sensor`, `music`, `power`, `power-plug`, `power-plug-off`, `power-socket-de`, `radiator`, `robot-vacuum`, `snowflake`, `speaker`, `television`, `thermometer`, `thermostat`, `trash-can`, `view-dashboard`, `washing-machine`, `water`, `weather-cloudy`, `weather-night`, `weather-rainy`, `weather-sunny`, `wifi`, `window-closed`, `window-open`. Jedes Icon steht als lesbares Textraster in der Datei, man kann sie also anpassen oder eigene ergänzen.

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

## Eigenes Farbschema

Alle Farben laufen über die `ha95-*`-Variablen am Anfang der Datei. Kopiere eine Variante, gib ihr einen neuen Namen (auch bei `card-mod-theme`) und ändere nur diese Werte sowie die `rgb-*`-Zeilen.

## Lizenz

MIT. Windows ist eine Marke der Microsoft Corporation. Dieses Projekt ist eine Hommage und steht in keiner Verbindung zu Microsoft.
