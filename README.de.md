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

Mit card-mod (siehe unten) bekommen Thermostat- und Luftbefeuchter-Karte außerdem einen grauen Ring und eckige 3D-Knöpfe für + und −.

## Schalter

Kippschalter bekommen überall Win95-Farben: weiße Spur, grauer Knopf, eingeschaltet navy. Mit card-mod werden die Schalter in Entitätskarten (Zeilen und Schalter in der Kopfzeile) zu echten Win95-Kontrollkästchen: ein eingelassenes weißes Kästchen mit Pixel-Häkchen.

## Extras (optional)

### Pixel-Schrift & Mauszeiger

1. `www/ha95/ha95.css` nach `/config/www/ha95/` kopieren.
2. **Einstellungen → Dashboards → ⋮ → Ressourcen** → `/local/ha95/ha95.css`, Typ **Stylesheet**.

Die Schrift „Pixelated MS Sans Serif“ stammt aus [98.css](https://github.com/jdan/98.css) (MIT) und wird über jsDelivr geladen.

### Fenster-Look mit card-mod

Mit [card-mod](https://github.com/thomasloven/lovelace-card-mod) (HACS) werden Karten mit Titel zu Fenstern mit Titelleiste und _ □ ×-Knöpfen, Karten sehen beim Klicken eingedrückt aus, und Schalter in Entitätskarten werden zu Kontrollkästchen. Ohne card-mod wird dieser Teil ignoriert.

card-mod sollte zusätzlich als Frontend-Modul geladen werden. Sonst greifen die Styles nur in Dashboards, nicht in der Seitenleiste auf anderen Seiten:

```yaml
frontend:
  extra_module_url:
    - /hacsfiles/lovelace-card-mod/card-mod.js
```

> card-mod greift in Interna des Frontends ein. Nach Home-Assistant-Updates kurz prüfen, ob alles noch passt. Die Titelleiste in Detail-Dialogen greift in neueren HA-Versionen (2026.10+) eventuell nicht mehr, weil HA diese Dialoge umgebaut hat.

### Seitenleiste als Startmenü

Mit [Custom Sidebar](https://github.com/elchininet/custom-sidebar) (HACS) wird die Seitenleiste zum Startmenü: „Start“-Titel mit Uhr, 3D-Rahmen, blaue Markierung und der senkrechte „HomeAssistant95“-Streifen links. Einträge können Zusatzinfos zeigen, z. B. die aktuelle Temperatur unter „Heizung“ oder ein rotes „!“, wenn der Saugroboter einen Fehler meldet.

1. [`examples/custom-sidebar/custom-sidebar-config.yaml`](examples/custom-sidebar/custom-sidebar-config.yaml) nach `/config/www/custom-sidebar-config.yaml` kopieren.
2. Im Abschnitt `order` die Namen und Entitäts-IDs an dein System anpassen.
3. Seite neu laden.

Alle Farben kommen aus den `ha95-*`-Variablen, die Seitenleiste wechselt also mit dem gewählten Design mit.

## Eigenes Farbschema

Alle Farben laufen über die `ha95-*`-Variablen am Anfang der Datei. Kopiere eine Variante, gib ihr einen neuen Namen (auch bei `card-mod-theme`) und ändere nur diese Werte sowie die `rgb-*`-Zeilen.

## Lizenz

MIT. Windows ist eine Marke der Microsoft Corporation. Dieses Projekt ist eine Hommage und steht in keiner Verbindung zu Microsoft.
