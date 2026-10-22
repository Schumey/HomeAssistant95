# HomeAssistant95

🇬🇧 [English](README.md) · 🇩🇪 **Deutsch**

Ein Windows-95-Theme für [Home Assistant](https://www.home-assistant.io/): Teal-Desktop, graue 3D-Fenster, Navy-Titelleisten, eckige Kanten und Pixel-Schrift.

![HA 95 in sechs seiner Designs](https://raw.githubusercontent.com/Schumey/HomeAssistant95/main/docs/img/demo.gif)

## Enthaltene Designs

| Design | Beschreibung |
|---|---|
| **HA 95** | Das Standard-Farbschema |
| **HA 98** | Wie 95, aber mit Farbverlauf in den Titelleisten |
| **HA 95 Rose** | Nachempfunden dem Farbschema „Rose“ |
| **HA 95 Spruce** | Nachempfunden dem Farbschema „Fichte“ |
| **HA 95 Desert** | Nachempfunden dem Farbschema „Wüste“ |
| **HA 95 Regenwald** | Moosgrüne Fenster, tiefgrüner Desktop |
| **HA 95 Patriot** | Rot, Weiß und Blau |
| **HA 95 Kontrast** | „Kontrast Schwarz“ |
| **HA 95 Dark** | Dunkelmodus: dunkelgraue Fenster, dunkler Teal-Desktop |
| **HA 95 Auto** | Wechselt mit dem Hell-/Dunkelmodus zwischen HA 95 und HA 95 Dark |
| **HA 3.11** | Windows-3.1-Look: weiße Fenster, flache Rahmen, zentrierter Titel, Knöpfe ▼ ▲ |
| **HA 3.11 Hot Dog Stand** / **Arizona** / **Ozean** / **Schwarze Lederjacke** | Die Farbschemata aus Windows 3.1, samt dem berüchtigten rot-gelben „Hot Dog Stand“ |

Mehr zu Dunkelmodus, Windows-3.1-Look und eigenen Farben: [Farbschemata](docs/color-schemes.de.md).

## Installation

HA 95 ist eine Integration: Sie installiert die Designs, die du auswählst, und lädt die Extras selbst. Nichts von Hand kopieren, in der `configuration.yaml` nur die Zeile für Designs (falls noch nicht vorhanden).

[![Öffne deine Home-Assistant-Instanz und dieses Repository im Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=Schumey&repository=HomeAssistant95&category=integration)

1. HACS → ⋮ → **Benutzerdefinierte Repositories** → URL dieses Repos, Typ **Integration** (oder auf den Knopf oben klicken).
2. „HomeAssistant95“ installieren und Home Assistant neu starten.
3. In `configuration.yaml` eintragen (falls noch nicht vorhanden), danach noch einmal neu starten:
   ```yaml
   frontend:
     themes: !include_dir_merge_named themes
   ```
4. **Einstellungen → Geräte & Dienste → Integration hinzufügen → HA 95**. Die gewünschten Designs und die Extras auswählen.
5. Den Browser mit **Strg+F5** neu laden, dann unter **Profil → Design** eine Variante auswählen.

### Designs und Extras später ändern

**Einstellungen → Geräte & Dienste → HA 95 → Konfigurieren.** Abgewählte Designs werden aus `/config/themes/ha95/` entfernt, die Designs werden sofort neu geladen. Danach den Browser neu laden (**Strg+F5**).

### Aktualisieren

HACS → **Aktualisieren**, Home Assistant neu starten, Browser mit **Strg+F5** neu laden. Die Integration kopiert die neuen Theme-Dateien und gibt ihren Skripten eine neue Versionsnummer, damit Browser und Companion-App sie frisch laden. Sieht die Companion-App noch alt aus, ihren Frontend-Cache zurücksetzen (Android: **Einstellungen → Companion-App → Fehlerbehebung**, iOS: **App-Konfiguration → Debugging**).

### Umstieg von 3.x

Version 4.0 ersetzt das Design durch eine Integration. Einmalig nötig:

1. HACS → HomeAssistant95 → ⋮ → **Entfernen**, dann das Repo noch einmal als Typ **Integration** hinzufügen (siehe oben).
2. Alles löschen, was du von Hand eingerichtet hattest, sonst lädt alles doppelt: den Ordner `/config/www/ha95/`, die Dashboard-Ressourcen `/local/ha95/…` und die Zeilen `/local/ha95/…` unter `frontend: extra_module_url:` in der `configuration.yaml`. `/config/www/ha95-startmenu.json` (dein Menü) behalten.
3. Die Integration wie oben einrichten und den Browser mit **Strg+F5** neu laden.

Die Namen der Designs bleiben gleich, Profile und Dashboards mit `HA 95` laufen also weiter.

## Was das Design allein macht

- Graue 3D-Fenster mit eckigen Kanten auf Teal-Desktop, oben eine Navy-Titelleiste.
- Win95-Farben für Schalter (weiße Spur, grauer Knopf), Schieberegler, Eingabefelder und Tabellen.
- Klima- und Luftbefeuchter-Entitäten in der 16-Farben-Palette: Heizen rot, Kühlen blau, Automatik grün, Luftbefeuchter teal.
- Diagramme in der 16-Farben-Palette.

## Extras (optional)

Jedes Extra funktioniert für sich. Einfach aussuchen:

| Extra | Was man bekommt | Anleitung |
|---|---|---|
| **Fenster-Look** | Karten und Dialoge als echte Win95-Fenster mit Titelleisten, OK/Abbrechen-Schaltflächen, Kontrollkästchen, Trackbars, Fortschrittsbalken, Registerkarten, Meldungsfenstern und ApexCharts-Diagrammen, dazu die Suche als Dialog „Ausführen“. Braucht [UIX](https://github.com/Lint-Free-Technology/uix). | [Fenster-Look](docs/window-look.de.md) |
| **Startmenü** | Seitenleiste als Startmenü: Streifen „HomeAssistant95“, bunte Icons, Ausklappmenüs mit Untermenüs, „Ausführen …“, der Bildschirm „Es ist jetzt sicher …“ nach dem Neustart, die Sanduhr als Mauszeiger, und wie man ein eigenes Menü baut. | [Startmenü](docs/start-menu.de.md) |
| **Datum/Uhrzeit** | Das Fenster „Eigenschaften von Datum/Uhrzeit“ mit Monatskalender, Analoguhr und deinen Kalenderterminen: als Dashboard-Karte und per Doppelklick auf die Uhr im Startmenü. | [Datum/Uhrzeit](docs/date-time.de.md) |
| **Bildschirmschoner** | Sterne, fliegende Logos oder 3D-Röhren nach einiger Zeit ohne Eingabe, für Wandtablets. Standardmäßig aus. | [Bildschirmschoner](docs/screensaver.de.md) |
| **Minesweeper** | Das Minenspiel im Win95-Fenster, aus dem Startmenü geöffnet. | [Minesweeper](docs/minesweeper.de.md) |
| **Pixel-Icons** | 537 Icons in Win95-Pixeloptik (`ha95:`), auf Wunsch automatisch statt aller MDI-Icons. | [Pixel-Icons](docs/pixel-icons.de.md) |
| **Feinschliff** | Windows-Scrollleisten, Registerkarten und Titelleisten auf Einstellungsseiten und Werkzeugen, Logbuch, Verlauf, Hardware-Seite als Task-Manager, Auswahllisten, Dimmer-Regler. Ein kleines optionales Modul für das, was das Design allein nicht erreicht. | [Feinschliff](docs/panels.de.md) |
| **Pixel-Schrift & Mauszeiger** | Die Schrift „Pixelated MS Sans Serif“ und der klassische Pfeil. | [unten](#pixel-schrift--mauszeiger) |

### Pixel-Schrift & Mauszeiger

In der Integration **Pixel-Schrift, Mauszeiger, Scrollleisten** einschalten (standardmäßig an).

Die Schrift „Pixelated MS Sans Serif“ stammt aus [98.css](https://github.com/jdan/98.css) (MIT) und wird über jsDelivr geladen. Mit UIX ab 8.4.0 lädt das Design die Schrift selbst, sie erscheint dann auch auf den Einstellungsseiten. `ha95.css` braucht man dann nur noch für den Mauszeiger.

## Prüfseite

[examples/test-dashboard/ha95-test.yaml](examples/test-dashboard/ha95-test.yaml) ist ein Dashboard mit je einer Karte jeder Art (Entitäten, Kacheln mit Features, Thermostat, Gauge, Markdown mit Hinweisen, Verlauf, Kalender, Formulare, Stapel, Masonry-Ansicht …). Nach einem Home-Assistant-Update einmal alle Tabs im hellen und dunklen Modus durchklicken, dann sieht man auf einen Blick, ob noch alles passt.

## Deinstallieren

Siehe [Deinstallieren](docs/uninstall.de.md).

## Lizenz

MIT. Windows ist eine Marke der Microsoft Corporation. Dieses Projekt ist eine Hommage und steht in keiner Verbindung zu Microsoft.
