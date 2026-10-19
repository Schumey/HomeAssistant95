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
| **HA 95 Kontrast** | „Kontrast Schwarz“ |
| **HA 95 Dark** | Dunkelmodus: dunkelgraue Fenster, dunkler Teal-Desktop |
| **HA 95 Auto** | Wechselt mit dem Hell-/Dunkelmodus zwischen HA 95 und HA 95 Dark |

Mehr zu Dunkelmodus und eigenen Farben: [Farbschemata](docs/color-schemes.de.md).

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

## Was das Design allein macht

- Graue 3D-Fenster mit eckigen Kanten auf Teal-Desktop, oben eine Navy-Titelleiste.
- Win95-Farben für Schalter (weiße Spur, grauer Knopf), Schieberegler, Eingabefelder und Tabellen.
- Klima- und Luftbefeuchter-Entitäten in der 16-Farben-Palette: Heizen rot, Kühlen blau, Automatik grün, Luftbefeuchter teal.
- Diagramme in der 16-Farben-Palette.

## Extras (optional)

Jedes Extra funktioniert für sich. Einfach aussuchen:

| Extra | Was man bekommt | Anleitung |
|---|---|---|
| **Fenster-Look** | Karten und Dialoge als echte Win95-Fenster mit Titelleisten, Symbolleisten, Kontrollkästchen, Trackbars und 3D-Knöpfen. Braucht [UIX](https://github.com/Lint-Free-Technology/uix). | [Fenster-Look](docs/window-look.de.md) |
| **Startmenü** | Seitenleiste als Startmenü: Streifen „HomeAssistant95“, bunte Icons, Ausklappmenüs mit Untermenüs, und wie man ein eigenes Menü baut. | [Startmenü](docs/start-menu.de.md) |
| **Pixel-Icons** | 537 Icons in Win95-Pixeloptik (`ha95:`), auf Wunsch automatisch statt aller MDI-Icons. | [Pixel-Icons](docs/pixel-icons.de.md) |
| **Pixel-Schrift & Mauszeiger** | Die Schrift „Pixelated MS Sans Serif“ und der klassische Pfeil. | [unten](#pixel-schrift--mauszeiger) |

### Pixel-Schrift & Mauszeiger

1. `www/ha95/ha95.css` nach `/config/www/ha95/` kopieren.
2. **Einstellungen → Dashboards → ⋮ → Ressourcen** → `/local/ha95/ha95.css`, Typ **Stylesheet**.

Die Schrift „Pixelated MS Sans Serif“ stammt aus [98.css](https://github.com/jdan/98.css) (MIT) und wird über jsDelivr geladen. Mit UIX ab 8.4.0 lädt das Design die Schrift selbst, sie erscheint dann auch auf den Einstellungsseiten. `ha95.css` braucht man dann nur noch für den Mauszeiger.

## Deinstallieren

Siehe [Deinstallieren](docs/uninstall.de.md).

## Lizenz

MIT. Windows ist eine Marke der Microsoft Corporation. Dieses Projekt ist eine Hommage und steht in keiner Verbindung zu Microsoft.
