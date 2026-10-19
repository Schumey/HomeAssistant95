# Farbschemata

🇬🇧 [English](color-schemes.md) · 🇩🇪 **Deutsch** · [← zurück zur README](../README.de.md)

## Dunkelmodus

Für einen dunklen Look gibt es zwei Wege:

| Design | Verhalten |
|---|---|
| **HA 95 Dark** | Immer dunkel: dunkelgraue Fenster, dunkler Teal-Desktop, Navy-Titelleisten. |
| **HA 95 Auto** | Wechselt selbst: hell wie HA 95, dunkel wie HA 95 Dark. Es folgt **Profil → Design → Modus** (Automatisch, Hell, Dunkel), bei „Automatisch“ der Einstellung des Betriebssystems. |
| **HA 95 Kontrast** | „Kontrast Schwarz“: Schwarz-Weiß mit kräftigen Farben, für maximalen Kontrast. |

## Windows-3.1-Look (HA 3.11)

**HA 3.11** ist nach Windows für Workgroups 3.11 benannt, dem Vorgänger von Windows 95: weißer Arbeitsbereich und weiße Fenster, flache Fensterrahmen mit dünnen schwarzen Linien, zentrierter Titel, links in der Titelleiste das Systemmenü-Kästchen, rechts die Knöpfe ▼ ▲. Die berühmten Farbschemata aus Windows 3.1 kommen als Varianten mit (Farben nachempfunden):

| Design | Farben |
|---|---|
| **HA 3.11** | Weißer Arbeitsbereich, Navy-Titelleisten |
| **HA 3.11 Hot Dog Stand** | Rot und Gelb, legendär hässlich |
| **HA 3.11 Arizona** | Sand und Türkis |
| **HA 3.11 Ozean** | Blau in Blau |
| **HA 3.11 Schwarze Lederjacke** | Schwarz und Grau |

Knöpfe in Karten und Dialogen bleiben 3D wie in Windows 3.1. Fensterrahmen, Titelleistenknöpfe und Kartenfarbe kommen aus den Variablen in der zweiten Tabelle unten. So geht auch ein Win95-Schema mit flachen Rahmen oder ein 3.11-Schema mit Win95-Knöpfen.

## Farben für Klima & Luftbefeuchter

Klima- und Luftbefeuchter-Entitäten nutzen die 16-Farben-Palette: Heizen rot, Kühlen blau, Automatik grün, Luftbefeuchter teal. Das betrifft den Ring der Thermostat-Karte, Icons, Kacheln und den Verlauf. Die Farben sind die Variablen `ha95-heat`, `ha95-cool`, `ha95-auto`, `ha95-heat-cool`, `ha95-dry`, `ha95-fan` und `ha95-humid` und lassen sich pro Variante ändern.

## Eigenes Farbschema

Alle Farben laufen über die `ha95-*`-Variablen am Anfang von `themes/ha95.yaml`. So entsteht ein eigenes Schema:

1. Eine Variante am Ende der Datei kopieren (z. B. `HA 95 Rose`).
2. Einen neuen Namen geben, auch bei `card-mod-theme`.
3. Nur die `ha95-*`-Werte und die `rgb-*`-Zeilen ändern (dieselben Farben als Zahlen mit Komma).

| Variable | Wofür |
|---|---|
| `ha95-desktop` | Hintergrund der Dashboards |
| `ha95-face` | Fenster, Karten, Knöpfe |
| `ha95-highlight`, `ha95-light` | Helle 3D-Kanten (außen, innen) |
| `ha95-shadow`, `ha95-dark` | Dunkle 3D-Kanten (innen, außen) |
| `ha95-text`, `ha95-text-dim`, `ha95-disabled` | Text |
| `ha95-window`, `ha95-window-text` | Eingabefelder, Listen |
| `ha95-title`, `ha95-title-bar`, `ha95-title-text` | Titelleisten (`ha95-title-bar` darf ein Verlauf sein) |
| `ha95-select`, `ha95-select-text` | Markierte Elemente |
| `ha95-active` | Icons im Zustand „an“ |
| `ha95-heat` … `ha95-humid` | Klima und Luftbefeuchter |
| `ha95-banner` | Streifen im [Startmenü](start-menu.de.md) (darf ein Verlauf sein) |
| `ha95-card` | Hintergrund der Karten (Fensterinhalt), standardmäßig `ha95-face` |

Fensterstil (nutzt HA 3.11):

| Variable | Wofür |
|---|---|
| `ha95-frame`, `ha95-frame-pressed` | Rahmen von Karten und Dialogen und einer angeklickten Karte (ein `box-shadow`, standardmäßig 3D) |
| `ha95-frame-width` | Abstand der Titelleiste vom Kartenrand (3px, 4px beim dickeren 3.11-Rahmen) |
| `ha95-title-buttons`, `ha95-title-buttons-width` | Grafik der Titelleistenknöpfe rechts und ihre Breite (_ □ × oder ▼ ▲) |
| `ha95-title-menu`, `ha95-title-menu-width` | Grafik links in der Titelleiste (Systemmenü-Kästchen bei 3.11, sonst `none`) |
| `ha95-title-align` | `left` oder `center` |
| `ha95-icon-info` … `ha95-icon-success`, `ha95-icon-run` | Symbole in Meldungen, Hinweisen und im Dialog „Ausführen“ |

Eine Kopie in `ha95.yaml` überschreibt HACS beim nächsten Update. Das eigene Schema besser in einer eigenen Datei in `/config/themes/` ablegen, mit dem Namen der Variante und allen Schlüsseln von `HA 95` (YAML-Anker gelten nur innerhalb einer Datei).
