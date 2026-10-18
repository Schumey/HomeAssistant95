# HomeAssistant95

Ein Windows-95-Theme für [Home Assistant](https://www.home-assistant.io/): Teal-Desktop, graue 3D-Fenster, Navy-Titelleisten und eckige Kanten.

## Installation

### Über HACS

1. HACS → ⋮ → **Benutzerdefinierte Repositories** → URL dieses Repos, Typ **Theme**.
2. „Windows 95“ installieren.
3. **Werkzeuge → YAML → Themes neu laden**.
4. Unter **Profil → Theme** „Windows 95“ auswählen.

### Manuell

1. `themes/windows95.yaml` nach `/config/themes/` kopieren.
2. In `configuration.yaml` (falls noch nicht vorhanden):
   ```yaml
   frontend:
     themes: !include_dir_merge_named themes
   ```
3. Konfiguration prüfen, dann Themes neu laden. Wenn `frontend:` neu ist, einmal neu starten.
4. Unter **Profil → Theme** auswählen.

## Optional: card-mod

Mit [card-mod](https://github.com/thomasloven/lovelace-card-mod) (HACS) bekommen Kartentitel eine Navy-Titelleiste und Karten sehen beim Klicken eingedrückt aus. Ohne card-mod wird dieser Teil ignoriert.

> card-mod greift in Interna des Frontends ein. Nach Home-Assistant-Updates kurz prüfen, ob alles noch passt.

## Lizenz

MIT. Windows ist eine Marke der Microsoft Corporation. Dieses Projekt ist eine Hommage und steht in keiner Verbindung zu Microsoft.
