# HomeAssistant95

Ein Windows-95-Theme für [Home Assistant](https://www.home-assistant.io/): Teal-Desktop, graue 3D-Fenster, Navy-Titelleisten, eckige Kanten und Pixel-Schrift.

## Enthaltene Themes

| Theme | Beschreibung |
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
3. **Werkzeuge → YAML → Themes neu laden**.
4. Unter **Profil → Theme** eine der Varianten auswählen.

### Manuell

1. `themes/ha95.yaml` nach `/config/themes/` kopieren.
2. In `configuration.yaml` (falls noch nicht vorhanden):
   ```yaml
   frontend:
     themes: !include_dir_merge_named themes
   ```
3. Konfiguration prüfen, dann Themes neu laden. Wenn `frontend:` neu ist, einmal neu starten.
4. Unter **Profil → Theme** auswählen.

## Extras (optional)

### Pixel-Schrift & Mauszeiger

1. `www/win95/win95.css` nach `/config/www/win95/` kopieren.
2. **Einstellungen → Dashboards → ⋮ → Ressourcen** → `/local/win95/win95.css`, Typ **Stylesheet**.

Die Schrift „Pixelated MS Sans Serif“ stammt aus [98.css](https://github.com/jdan/98.css) (MIT) und wird über jsDelivr geladen.

### Fenster-Look mit card-mod

Mit [card-mod](https://github.com/thomasloven/lovelace-card-mod) (HACS) werden Karten mit Titel zu Fenstern mit Titelleiste und _ □ ×-Knöpfen. Karten sehen beim Klicken eingedrückt aus, und auch die Detail-Dialoge bekommen eine Titelleiste. Ohne card-mod wird dieser Teil ignoriert.

> card-mod greift in Interna des Frontends ein. Nach Home-Assistant-Updates kurz prüfen, ob alles noch passt.

## Eigenes Farbschema

Alle Farben laufen über die `win95-*`-Variablen am Anfang der Datei. Kopiere eine Variante, gib ihr einen neuen Namen (auch bei `card-mod-theme`) und ändere nur diese Werte sowie die `rgb-*`-Zeilen.

## Lizenz

MIT. Windows ist eine Marke der Microsoft Corporation. Dieses Projekt ist eine Hommage und steht in keiner Verbindung zu Microsoft.
