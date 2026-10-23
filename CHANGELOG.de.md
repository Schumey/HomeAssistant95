# Changelog

🇬🇧 [English](CHANGELOG.md) · 🇩🇪 **Deutsch**

Alle nennenswerten Änderungen an diesem Projekt. Format nach [Keep a Changelog](https://keepachangelog.com/de/1.1.0/), Versionierung nach [SemVer](https://semver.org/lang/de/).

## [4.6.0] – 2026-10-24

### Hinzugefügt
- **Energie-Karten im Win95-Look:** Die Verteilungskarte zeigt PV, Gas, Home und Batterie als erhabene 3D-Kästchen mit dem Namen darin, auf einer versenkten weißen Fläche, mit rechtwinkligen, durchgezogenen Verbindungslinien. Die Datumsauswahl der Energie-Karten ist eine Symbolleiste mit versenktem Datumsfeld und gleich großen Knöpfen (braucht UIX).
- Prüfseite: neue Ansicht „Energie“ mit allen Energie-Karten.

## [4.5.0] – 2026-10-24

### Hinzugefügt
- **Medienkarte im Look des Media Player Classic:** schwarze, eingelassene „Videofläche“ mit Gerät, Titel und Cover (mit etwas Abstand zum Rand), darunter eine Win95-Suchleiste und eine graue Werkzeugleiste mit eckigen 3D-Knöpfen für Zurück, Wiedergabe/Pause, Weiter, Mehr-Info und Medien durchsuchen. Funktioniert allein mit dem Theme (card-mod oder UIX).

### Behoben
- Dialoge mit eigenem Menü-Knopf (z. B. „Medienquellen“): der ⋮-Knopf hat jetzt Symbolleistengröße statt 48 px, der Schließen-Knopf sitzt in der Titelleiste. Braucht UIX.

## [4.4.0] – 2026-10-23

### Hinzugefügt
- **Solitaire** (`ha95-solitaire.js`, neue Option, standardmäßig an): Klondike im Win95-Fenster, eine oder drei Karten ziehen, Doppelklick auf die Ablage, Rückgängig, Siege und Bestzeit. Öffnen über die Startmenü-Aktion `solitaire`, siehe [Solitaire](docs/solitaire.de.md). Das Standard-Startmenü hat es unter „Games“ (nur für neu angelegte Menü-Dateien).

## [4.3.0] – 2026-10-22

### Hinzugefügt
- **Bildschirmschoner** (`ha95-screensaver.js`, neue Option in der Integration, standardmäßig aus): nach einiger Zeit ohne Eingabe ein Sternenfeld, fliegende Pixel-Häuser oder wachsende 3D-Röhren, auf Wunsch mit Uhr und Entitätszuständen. Jede Eingabe beendet ihn. Einstellungen unter `screensaver` in der Startmenü-Datei, siehe [Bildschirmschoner](docs/screensaver.de.md).
- **Minesweeper** (`ha95-minesweeper.js`, neue Option, standardmäßig an) im Win95-Fenster mit drei Stufen, Fahnen (Rechtsklick oder lange drücken), Aufdecken der Nachbarn und Bestzeiten. Öffnen über die Startmenü-Aktion `minesweeper`, siehe [Minesweeper](docs/minesweeper.de.md).
- **Zwei Farbschemata:** HA 95 Regenwald (Moosgrün) und HA 95 Patriot (Rot, Weiß und Blau).
- **Bluescreen**, wenn die Verbindung zu Home Assistant länger als 20 Sekunden weg ist (`"bsod": true` in der Startmenü-Datei, standardmäßig aus). Verschwindet von selbst. Die Startmenü-Aktion `bsod` zeigt ihn zur Vorschau.
- **Klänge** (`"sounds": true`, standardmäßig aus): kleine selbst erzeugte Töne für Menüs, Meldungen, Neustart, Bluescreen und Minesweeper.
- Das Standard-Startmenü hat einen Eintrag „Games“ mit Minesweeper und Bildschirmschoner (nur für neu angelegte Menü-Dateien).
- Timeflow-Karte: Der Kreis-Zähler ist jetzt ein Win95-Fortschrittsbalken aus blauen Blöcken (braucht das Feinschliff-Modul).

## [4.2.0] – 2026-10-22

### Hinzugefügt
- **Task-Manager-Optik für Einstellungen → System → Hardware:** Der Wert (Prozessor, Arbeitsspeicher) steht rechts in einem eingesenkten weißen Feld, der Verlauf auf schwarzem, eingesenktem Grund mit grünem Raster und grüner Linie, wie in der Leistungsanzeige des Windows-Task-Managers. Braucht [UIX](https://github.com/Lint-Free-Technology/uix).

## [4.1.3] – 2026-10-22

### Hinzugefügt
- **Apps im Werkzeug-Menü:** Das Beispiel-Startmenü (und das Standardmenü, das die Integration anlegt) hat jetzt einen Eintrag „Apps“ (`/config/apps`) unter „Helfer“.

## [4.1.2] – 2026-10-22

### Behoben
- **Schließen-Knöpfe von Dialogen:** Dialoge mit eigener Kopfzeile (z. B. „Zum Dashboard hinzufügen“) nutzen die Slots `navigationIcon` und `actionItems`. Die globalen Regeln kannten sie nicht, der Schließen-Knopf blieb 48 px groß und saß schief in der Titelleiste. Er ist jetzt wie überall 16 × 16, Symbolleisten-Knöpfe der Kopfzeile 24 × 22.

## [4.1.1] – 2026-10-21

### Hinzugefügt
- **Icon** für die Integration (`custom_components/ha95/brand/`), sichtbar unter Einstellungen → Geräte & Dienste und in HACS.

## [4.1.0] – 2026-10-21

### Hinzugefügt
- **Startmenü:** Gibt es `/config/www/ha95-startmenu.json` nicht, kopiert die Integration jetzt das Beispielmenü dorthin. Eine vorhandene Datei wird nie überschrieben. Fehlte `/config/www/`, einmal Home Assistant neu starten, damit `/local/` geht.

## [4.0.1] – 2026-10-21

### Behoben
- **Startmenü:** Konnte `/local/ha95-startmenu.json` einmal nicht geladen werden (zum Beispiel 404 während eines Neustarts), blieben die Menüs bis zum Neuladen der Seite leer („Menü … fehlt“). Ein fehlgeschlagenes Laden wird nicht mehr gemerkt, der nächste Klick versucht es erneut.

## [4.0.0] – 2026-10-21

### Geändert (inkompatibel)
- **HA 95 ist jetzt eine Integration statt eines Designs.** Über HACS als Typ *Integration* installieren und unter **Einstellungen → Geräte & Dienste** hinzufügen. Sie kopiert die gewählten Designs nach `/config/themes/ha95/` und lädt die Extras (Pixel-Schrift und Mauszeiger, Startmenü, Pixel-Icons, Feinschliff-Modul, Uhr-Karte) selbst: keine Dateien kopieren, keine Dashboard-Ressourcen, keine `extra_module_url`-Zeilen, und die Skripte bekommen bei jedem Update eine neue Versionsnummer.
- **Designs und Extras wählen** bei der Einrichtung und später unter **HA 95 → Konfigurieren**: beliebige der 13 Designs, jedes Extra an oder aus, die Pixel-Icons als *Aus / Nur zusätzlich / Ersetzen / Pixeln / Ersetzen und pixeln*.
- Das Repo enthält je Design eine Datei in `custom_components/ha95/themes/` statt `themes/ha95.yaml`, die Module liegen in `custom_components/ha95/www/` statt `www/ha95/`. Die Namen der Designs sind gleich geblieben.
- **Umstieg von 3.x:** den alten HACS-Eintrag entfernen, das Repo als Typ *Integration* neu hinzufügen, `/config/www/ha95/`, die Dashboard-Ressourcen `/local/ha95/…` und die `extra_module_url`-Zeilen löschen. Siehe README, „Umstieg von 3.x“.

### Hinzugefügt
- Demo-GIF in der README (Designs, Startmenü, Fensterlook, Formulare, Hinweise, Uhr-Karte, Diagramme) und ein Demo-Dashboard mit erfundenen Namen in `examples/demo-dashboard/`.

### Behoben
- **Licht-Karte:** Das Symbol in der Mitte des runden Dimmers hat keinen Rahmen mehr.

## [3.14.4] – 2026-10-21

### Behoben
- **Dialoge mit eigenen Kopf-Knöpfen** (z. B. „Karte bearbeiten“): Der Schließen-Knopf ist ein 16 × 16-Quadrat, der Hilfe-Knopf 24 × 22. Das setzt jetzt das Feinschliff-Modul, damit es in jedem Dialog wirkt.
- **Automations-Editor:** Abstand zwischen ⋮-Menü und Rahmen der Zeile.

## [3.14.3] – 2026-10-21

### Behoben
- **Automations-Editor:** Ziehgriff und ⋮-Menü jeder Zeile sitzen senkrecht mittig statt oben; mehr Abstand zwischen Aufklapp-Knopf und Zeilen-Symbol.
- **Automations-Editor:** Entitäts-Chips in den Zeilen (z. B. „Tür“) sind ein eingedrücktes Win95-Feld mit eckigen Ecken.

## [3.14.2] – 2026-10-21

### Behoben
- **Detail-Dialog (more-info):** Der Zurück-Pfeil auf Unterseiten (z. B. ein Gruppenmitglied) ist ein kleiner 16 × 16-Knopf in der Titelleiste statt eines 48-px-Knopfes mit hellem Rahmen, der aus der Leiste ragt.
- **Dialoge mit eigenen Kopf-Knöpfen** (z. B. „Karte bearbeiten“): Der Schließen-Knopf ist ein kleines Quadrat in der Titelleiste, der Hilfe-Knopf in der Symbolleiste ein 24 × 22-Knopf.
- **Bearbeitungsmodus eines Dashboards:** „Fertig“ ist so hoch wie die Symbolknöpfe daneben (22 px).
- **Auswahlfelder mit Beschriftung** (Profil „Design“, „Zweitinfo-Attribut“ im Karteneditor): weißes, eingelassenes Feld mit 40 px Höhe, kleinem 3D-Pfeilknopf und einem kleinen × ohne eigenen Rahmen, statt eines 56 px hohen Feldes mit hohem grauem Streifen und großem Löschen-Knopf.
- **Schalter in Kacheln** (Ein/Aus-Feature einer Kachel, z. B. Licht): erhabener Win95-Rahmen, im Zustand „an“ eingedrückt; der Griff zeigt dann die Lichtfarbe.
- **Automations-Editor:** „Traces“ und das Menü sind so hoch wie die übrigen Kopfknöpfe, die Aufklapp-Knöpfe der Zeilen sind kleine 3D-Knöpfe (16 × 16) neben dem Symbol statt 28-px-Kästen, die es überdecken, ausgegraute Knöpfe (Rückgängig/Wiederholen) zeigen ein eingeprägtes graues Symbol statt zu verschwinden.

### Hinzugefügt
- README: Abschnitt „Aktualisieren“ (Designs neu laden, `?v=` erhöhen, Browser neu laden, App-Cache zurücksetzen).

## [3.14.1] – 2026-10-21

### Behoben
- Der Schließen-Knopf (×) jedes Dialogs ist jetzt ein quadratischer 16 × 16-Knopf, auch in Dialogen ohne eigene Theme-Regel (z. B. Ressourcen). Die Regel steht in `ha95-panels.js`, am Knopf selbst.
- Der Zähler in der Seitenleiste (Benachrichtigungen) sitzt mittig in seinem Kasten.

## [3.14.0] – 2026-10-21

Einstellungsseiten, Dialoge, Scrollleisten und viel Feinschliff.

### Hinzugefügt
- **Feinschliff-Modul** `www/ha95/ha95-panels.js` (optional, siehe [Feinschliff](docs/panels.de.md)) für das, was das Design allein nicht erreicht: Windows-Scrollleisten überall (Pfeilknöpfe, gerasterter Schacht, erhabener Schieber) und Regeln für einzelne Bauteile (Suchfeld, Kontrollkästchen, Symbolknöpfe, Registerkarten, Auswahllisten, Logbuch).
- **Abschnitte als Fenster:** Ein Abschnitt einer Abschnitts-Ansicht mit Überschrift ist ein Win95-Fenster, die Überschrift ist seine Titelleiste mit _ □ ×. Abschnitte ohne Überschrift bekommen keinen Rahmen, Karten mit eigenem Titel (Verlauf, Listen) bleiben eigene Fenster. Weitere Überschriften im selben Abschnitt (Bereiche auf der Beleuchtungsseite) werden Gruppenbeschriftungen mit geätzter Linie, der Ein/Aus-Knopf in einer Überschrift ist ein Win95-Knopf.
- **Einstellungsseiten:** Titelleiste über der Reiterzeile mit dem Namen der Seitenkachel („Geräte & Dienste“, „Automationen & Szenen“ …), Reiter als echte Registerkarten (die aktive ist höher), Suchfeld, Kontrollkästchen statt Schalter, kleine eckige Symbolknöpfe. Werkzeuge: Titelleiste mit den Reitern darunter, Zurück-Pfeil und Menü in der Reiterzeile, Trennlinien zwischen den Entitäten auf der Seite „Zustände“, die Auswahlliste bei „Aktionen“ als Win95-Auswahlfeld mit Rahmen um die Liste.
- **Dialoge:** Dimmer-Regler als waagerechter Balken, Ein/Aus-Schalter als waagerechter Wippschalter, Zahlen-Regler (Helfer) als Trackbar, Timer- und Zähler-Knöpfe als Win95-Knöpfe, Pixel-Schrift für Zustand und Zeit, das Dauer-Feld als weißes eingelassenes Feld, der Neustart-Dialog mit eckigen Symbolen und Pixel-Schrift, „Ausführen“ mit Schließen-Knopf.
- **Benachrichtigungen:** Die Schublade ist ein Fenster mit erhabenem Rahmen, Titelleiste mit Verlauf und quadratischem ×-Knopf.
- **Logbuch und Verlauf:** Hinweisfeld mit Rahmen, Kontrollkästchen, eckige Symbole in der Zeitleiste, eckige Pfeilknöpfe und eingelassenes Feld beim Zeitraum, „Quellen“ als Knopf.
- **Knöpfe überall:** `ha-button` als graue 3D-Schaltfläche (neue Variablen `ha-button-*`, `wa-color-brand-*`, `ha-assist-chip-container-shape`), der Verlaufs-Link der Diagrammkarten als kleiner Diagramm-Knopf.
- **Timeflow-Karte** (`custom:timeflow-card`) im Kachel-Look.
- Pixel-Logo von Home Assistant für die Update-Zeile (`ha95-icon-ha`).
- Startmenü: Pixel-Schrift in den Einträgen und ihren Untertexten.
- Kacheln: keine getönte Fläche hinter dem Symbol, wenn die Entität aus ist.

### Geändert
- Alle ×-Knöpfe sind jetzt quadratisch (16 × 16 px): Titelleisten der Karten, Dialoge, das „Ausführen“-Fenster und die Benachrichtigungen. Das Titelknopf-Bild (`ha95-title-buttons`) ist 16 px hoch.
- Überschriften-Karten: Inhalt senkrecht mittig in der Titelleiste.

### Behoben
- Symbolknöpfe saßen zu tief in ihrem Rahmen (Zurück-Pfeil, Hilfe-Knopf, ⋮-Menü): Die Zeilenhöhe machte den Knopf höher als den Rahmen.
- Chips (Filter, Quellen, Zeitraum) hatten eine abgerundete graue Fläche hinter dem eckigen Knopf.
- Datum/Uhrzeit: Die helle Kante lief als weiße Linie direkt unter den Gruppenüberschriften, und der Aufwärts-Knopf von Jahr und Uhrzeit sah dauerhaft gedrückt aus (der gedrehte Knopf kehrte seine 3D-Kanten um).

## [3.13.0] – 2026-10-20

Diagramme und Überschriften.

### Hinzugefügt
- ApexCharts-Karten ([apexcharts-card](https://github.com/RomRider/apexcharts-card)): Titel als Win95-Titelleiste mit _ □ ×, das Diagramm in einem eingelassenen weißen Feld, Pixel-Schrift für Achsen, Legende und QuickInfo, durchgezogene graue Gitterlinien und eine gelbe Win95-QuickInfo mit schwarzem Rand. Klappt mit card-mod und UIX. Siehe [Fenster-Look](docs/window-look.de.md).
- Neue Variable `ha95-desktop-text` für Schrift direkt auf dem Desktop (weiß, in HA 3.11 schwarz).

### Behoben
- Überschriften-Karten stehen ohne Fenster auf dem Desktop, ihr Titel und Untertitel waren dunkel auf Teal. Sie nutzen jetzt `ha95-desktop-text`.

## [3.12.0] – 2026-10-20

Korrekturen für Handys und die Companion-App, dazu die Uhr von Windows 95.

### Hinzugefügt
- „Eigenschaften von Datum/Uhrzeit“ (`www/ha95/ha95-clock.js`): das Fenster aus Windows 95 mit Monatskalender, Analoguhr mit türkisen Zeigern und Sekundenzeiger, Digitalanzeige und der Registerkarte „Zeitzone“. Tage mit Terminen aus Home-Assistant-Kalendern sind fett, ein Klick auf einen Tag listet die Termine. Als Dashboard-Karte `custom:ha95-clock-card` (Optionen `title`, `calendars`) und im Startmenü: Doppelklick auf die Uhr im Titel der Seitenleiste öffnet es (Tippen auf Touch-Bildschirmen), Optionen `clock` und `clock_calendars`, Menüeintrag `{ "action": "clock" }`. Siehe [Datum/Uhrzeit](docs/date-time.de.md).
- Prüfseite: Karte „Datum/Uhrzeit“.

### Behoben
- Startmenü auf Touch-Bildschirmen: Antippen eines Eintrags mit Ausklappmenü (z. B. „Werkzeuge“) öffnete das Menü und schloss es sofort wieder, weil der Browser vor dem Tippen ein nachgemachtes Darüberfahren der Maus schickt. Darüberfahren zählt jetzt nur noch mit echter Maus, Tippen öffnet das Menü, nochmal Tippen schließt es.
- Startmenü auf schmalen Bildschirmen: Menüs, die rechts neben der Seitenleiste keinen Platz haben, rücken nach links ins Bild. Ein Untermenü geht dann links neben sein Elternmenü oder, wenn auch dort kein Platz ist, leicht eingerückt unter seinen Eintrag.
- Detail-Dialoge auf Handys (Bottom-Sheet): Win95-Titelleiste und Symbolleiste fehlten, der weiße Titel stand auf Grau. Der Zieh-Griff steht jetzt über der Titelleiste, statt den Titel zu verdecken. Das gilt auch für andere Dialoge, die als Bottom-Sheet aufgehen.

### Geändert
- Anleitungen: Module und `ha95.css` mit Version laden, z. B. `/local/ha95/ha95-startmenu.js?v=3.12.0`. Home Assistant erlaubt Browsern und der Companion-App, Dateien aus `/local/` 31 Tage lang zwischenzuspeichern. Nach einem Update lief in der App deshalb oft noch das alte Startmenü (kein Streifen, keine bunten Icons, kein ▶-Pfeil). Die Anleitungen erklären auch, wie man den Frontend-Cache der App zurücksetzt.

## [3.11.0] – 2026-10-19

„Home Assistant für Workgroups“: benannt nach Windows für Workgroups 3.11.

### Hinzugefügt
- Neues Design **HA 3.11** im Windows-3.1-Look: weißer Arbeitsbereich und weiße Fenster, flache Rahmen mit dünnen schwarzen Linien, zentrierter Titel, links in der Titelleiste das Systemmenü-Kästchen, rechts ▼ ▲. Dazu die Windows-3.1-Farbschemata **HA 3.11 Hot Dog Stand**, **HA 3.11 Arizona**, **HA 3.11 Ozean** und **HA 3.11 Schwarze Lederjacke** (Farben nachempfunden).
- Neue Variablen für den Fensterstil, in jedem Schema nutzbar: `ha95-card` (Hintergrund der Karten), `ha95-frame`, `ha95-frame-pressed`, `ha95-frame-width`, `ha95-title-buttons`, `ha95-title-buttons-width`, `ha95-title-menu`, `ha95-title-menu-width`, `ha95-title-align`, dazu die Symbole `ha95-icon-info`, `-warning`, `-error`, `-success`, `-run`.
- UIX: alle Dialoge als Win95-Fenster (neuer UIX-Typ `dialog`): Titelleiste, OK/Abbrechen als Win95-Schaltflächen (75×23), die Hauptschaltfläche mit schwarzem Rand, gepunkteter Fokusrahmen.
- UIX: die Suche (Taste `e`, Strg+K, Lupe) als Win95-Dialog „Ausführen“ mit Titelleiste, Programm-Symbol, Erklärung, eingelassenem Eingabefeld, den Bereichen als Knöpfe und einer weißen Liste.
- Startmenü: `{ "action": "run" }` öffnet „Ausführen …“. Die Beispielmenüs haben den Eintrag.
- Startmenü: Nach „Neu starten …“ erscheint der schwarze Bildschirm „Es ist jetzt sicher, Home Assistant auszuschalten.“ und verschwindet von selbst, sobald Home Assistant wieder da ist.
- Startmenü: Sanduhr als Mauszeiger, solange Home Assistant arbeitet (Anfrage dauert länger als 0,3 s, keine Verbindung, Seitenwechsel). Option `busy_cursor`.
- Ansichten-Tabs als Registerkarten eines Eigenschaften-Dialogs: grau und erhaben, die aktive höher und mit der Kante darunter verschmolzen (card-mod und UIX).
- UIX: Regler in Kachel-Features und im Detail-Dialog (Helligkeit, Position, Lautstärke, Zahlen) als Win95-Fortschrittsbalken mit Blöcken, beim Ziehen der Wert in einer gelben QuickInfo.
- UIX: die Ringe der Thermostat-, Luftbefeuchter- und Licht-Karte aus Blöcken.
- UIX: Meldungen unten (`ha-toast`) als graue Win95-Fenster mit Info-Symbol; Hinweise (`ha-alert`) in Karten, Dialogen und Detail-Dialogen mit eingeritztem Rahmen und den Win95-Symbolen für Info, Warnung, Fehler und Erfolg.
- Bunte Startmenü-Icons für `console`, `dock-left`, `hacs`, `key`, `math-log`, `menu` und `view-grid` (dazu 11 weitere MDI-Namen). Icons mit beliebigem Präfix (z. B. `hacs:hacs`) werden jetzt erkannt.
- Prüfseite [examples/test-dashboard/ha95-test.yaml](examples/test-dashboard/ha95-test.yaml) mit je einer Karte jeder Art, um nach Home-Assistant-Updates den Look zu prüfen.

### Geändert
- `themes/ha95.yaml` wird jetzt aus Bausteinen erzeugt. Regeln, die card-mod und UIX (oder Thermostat und Luftbefeuchter) gemeinsam nutzen, stehen in der Quelle nur noch einmal. Das Design sieht gleich aus.
- Die Symbolleiste im Detail-Dialog braucht keinen Platz, wenn ein Dialog keine Knöpfe hat.

### Behoben
- Startmenü: Ändert sich die Seitenleiste mehrere Sekunden lang viele Male pro Sekunde (eine Schleife), zeichnet das Modul Streifen und Icons nicht mehr nach und schreibt eine Warnung in die Konsole, statt die ganze Oberfläche einzufrieren. Die Menüs funktionieren weiter.

## [3.10.0] – 2026-10-19

### Hinzugefügt
- Neue Designs **HA 95 Dark** (Dunkelmodus) und **HA 95 Auto**, das mit dem Hell-/Dunkelmodus des Profils oder des Betriebssystems zwischen HA 95 und HA 95 Dark wechselt.
- Startmenü: `ha95-startmenu.js` zeichnet jetzt den senkrechten Streifen „HomeAssistant**95**“ (Variable `ha95-banner`, bei HA 98 ein blauer Verlauf) und bunte Win95-Icons in der Seitenleiste und den Ausklappmenüs: rund 70 Icons mit schwarzem Umriss, farbiger Füllung und 3D-Schattierung, dazu 57 MDI-Namen, die darauf zeigen. Optionen `banner`, `banner_text` und `color_icons` in `ha95-startmenu.json`.
- UIX: Detail-Dialoge (more-info) als Win95-Fenster: Titelleiste „Name - Bereich“ mit kleinem ×-Knopf rechts, darunter eine Symbolleiste mit den Knöpfen als eckige 3D-Knöpfe.
- UIX: Karten, die ihren Titel selbst zeichnen (z. B. Markdown), bekommen ebenfalls eine Titelleiste.
- Doku: Schritt-für-Schritt-Anleitung für ein eigenes Startmenü ([docs/start-menu.de.md](docs/start-menu.de.md)). Die README ist jetzt eine kurze Übersicht, Details stehen in `docs/` (Fenster-Look, Startmenü, Pixel-Icons, Farbschemata, Deinstallieren), auf Englisch und Deutsch.

### Geändert
- Die Knöpfe in der Kopfleiste sind alle gleich groß (24×22) mit 2 px Abstand, auch der „+“-Knopf mit Ausklappmenü; ebenso auf den Einstellungsseiten.
- Karten bleiben eckig, auch wenn ein Dashboard per card-mod runde Ecken setzt.
- Custom-Sidebar-Beispiel: Der alte CSS-Streifen ist entfernt (er wirkte in HA 2026.10 nicht mehr), der Streifen kommt jetzt aus `ha95-startmenu.js`.

### Behoben
- UIX: Die Knöpfe + und − der Thermostat- und Luftbefeuchter-Karte sind wieder eckige 3D-Knöpfe (HA 2026.10 nutzt dort einen anderen Knopf).

## [3.9.0] – 2026-10-18

### Hinzugefügt
- UIX: Kopfleiste von Dashboards und Einstellungsseiten als Win95-Titelleiste: 36 px hoch (`header-height`), Titelleistenfarbe bzw. Verlauf (HA 98), fetter Titel, kleine eckige graue 3D-Knöpfe ohne runden Hover-Kreis. card-mod bekommt den Grundlook über `card-mod-root` und `card-mod-top-app-bar-fixed`.
- UIX: Icons auf der Einstellungsseite als eckige 3D-Kacheln wie in der Win95-Systemsteuerung.
- UIX ab 8.4.0: Das Design lädt die Pixel-Schrift selbst (`uix-fonts`), sie erscheint damit auch auf Einstellungs- und anderen Nicht-Dashboard-Seiten.
- README: Anleitung zum Deinstallieren.

### Geändert
- Custom-Sidebar-Beispiel: „Start“-Titel und Uhr passen in die niedrigere Titelleiste.

## [3.8.0] – 2026-10-18

### Hinzugefügt
- Pixel-Icons: 537 Icons (vorher 89). Das Set deckt jetzt die 500 MDI-Icons ab, die Home Assistant am häufigsten nutzt, gezählt danach, wie oft sie in den `icons.json` aller Core-Integrationen und im Frontend vorkommen. Dazu gehören Knöpfe und Menüs (`plus`, `pencil`, `dots-vertical`, `chevron-*`, `arrow-*`, …), Energie (`solar-power`, `transmission-tower`, `ev-station`, `meter-electric`, …), Klima (`hvac`, `air-conditioner`, `fan-speed-1` bis `-3`, `heat-wave`, …), Wasser, Netzwerk, Medien, Zeit und viele `-off`-, `-alert`-, `-check`- und `-clock`-Varianten. Im automatischen Modus (`?replace`) ersetzen sie die MDI-Icons, für den Pixel-Filter bleiben also deutlich weniger übrig.
- 94 MDI-Aliasse (vorher 72).

### Nicht enthalten
- Markenlogos (`home-assistant`, `bluetooth`, `bluetooth-off`, `bluetooth-connect`, `zigbee`, `google-circles-communities`) sind nicht nachgezeichnet. Im automatischen Modus bringt der Pixel-Filter (`?pixelate`) sie trotzdem aufs Raster.

## [3.7.0] – 2026-10-18

### Hinzugefügt
- Startmenü mit Untermenüs: `www/ha95/ha95-startmenu.js` öffnet Win95-Ausklappmenüs rechts neben Einträgen der Seitenleiste, die `data-ha95-menu` tragen (per Custom-Sidebar-`attributes`). Die Menüs stehen in `/config/www/ha95-startmenu.json` und können Seiten öffnen, Dateien direkt im File editor öffnen, Home Assistant nach Win95-Rückfrage neu starten, Adressen öffnen und weitere Untermenüs enthalten. Funktioniert mit ausgeklappter Seitenleiste und als Schublade auf schmalen Bildschirmen.
- Beispielmenü `examples/startmenu/ha95-startmenu.json` („Tools“: File Editor mit häufig genutzten Dateien, Automationen, Skripte, Szenen, Helfer, Entwicklerwerkzeuge, Geräte & Dienste, Entitäten, Protokolle, Neustart) und ein passender Eintrag im Custom-Sidebar-Beispiel.

## [3.6.0] – 2026-10-18

### Geändert
- UIX: Auswahlfelder in Entitätskarten sehen jetzt wie eine Win95-Combobox aus: Beschriftung links (bündig mit den anderen Zeilen), einzeiliges weißes, eingelassenes Feld in der rechten Hälfte und ein 3D-▼-Knopf am Rand. Behebt die bisherigen Regeln, die in HA 2026.10 nicht mehr zum Aufbau des Auswahlfelds passten.
- UIX: Datums- und Zeitfelder in Entitätskarten: Beschriftung links, einzeilige weiße, eingelassene Felder so breit wie ihr Inhalt, Kalender-Knopf als 3D-Knopf, keine „hh“/„mm“-Beschriftungen.

## [3.5.0] – 2026-10-18

### Hinzugefügt
- Pixel-Icons, automatischer Modus: `ha95-icons.js?replace` ersetzt jedes `mdi:`-Icon, das es auch als `ha95:` gibt, auch die Standard-Icons der Entitäten. `ha95-icons.js?pixelate` bringt alle übrigen Icons auf das 24×24-Pixelraster. Beides lässt sich kombinieren.
- 32 weitere Pixel-Icons (jetzt 89), vor allem für die Standard-Icons von Home Assistant: `lightbulb-off`, `fan-off`, `toggle-switch-variant` und `-off` (als Win95-Kontrollkästchen), Batteriestufen `battery-10` bis `battery-90`, `battery-charging`, `battery-alert`, `eye`, `shield`, `leaf`, `garage`, `garage-open`, `music-note`, `play`, `pause`, `stop`, `volume-high`, `volume-medium`, `volume-mute`, `check-circle`, `alert-circle`, `weather-partly-cloudy`, `weather-snowy`, `weather-lightning`, `weather-fog`.
- 72 MDI-Aliasse (vorher 14), z. B. `lightbulb-outline`, `home-outline`, `lock-open-variant`, `roller-shade-closed`, `window-shutter`, `blinds-horizontal`, `weather-pouring`, `white-balance-sunny`, `toggle-switch`.

### Geändert
- `ha95-icons.js` ist jetzt ein echtes JavaScript-Modul (es liest seine Optionen aus der URL). Laden über `extra_module_url` oder als Ressource vom Typ **JavaScript-Modul**, wie im README beschrieben.
- `battery-50` ist jetzt wie die anderen Batteriestufen gezeichnet (untere Hälfte voll).
- `power-plug-off` hat eine Lücke um den Schrägstrich, wie die anderen „aus“-Icons.

## [3.4.0] – 2026-10-18

### Hinzugefügt
- Pixel-Icon-Set `www/ha95/ha95-icons.js`: 57 Icons in Win95-Pixeloptik im 24×24-Raster (Umriss in voller Farbe, Füllung mit halber Deckkraft), nach dem Zustand der Entität eingefärbt wie andere Icons. Die Namen folgen MDI (`mdi:fan` → `ha95:fan`), weitere MDI-Namen zeigen auf ein vorhandenes Icon, unbekannte Namen zeigen `ha95:help`. Laden per `extra_module_url`, siehe README-Abschnitt „Pixel-Icons“.
- Das Custom-Sidebar-Beispiel nutzt die `ha95:`-Icons. Ohne die Icon-Datei `ha95:` durch `mdi:` ersetzen.

### Hinweis
- Diese Dateien waren versehentlich schon im Release 3.3.1 enthalten, ohne Changelog-Eintrag. 3.4.0 ist das richtige Release dafür.

## [3.3.1] – 2026-10-18

### Behoben
- Entitätskarten mit Sammelschalter: Der Schalter steht jetzt in einer eigenen Zeile unter der Titelleiste, bündig mit den Kontrollkästchen der Zeilen, statt in der Titelleiste.
- Custom-Sidebar-Beispiel: kein runder Hover-Kreis mehr hinter dem Menüknopf (`sidebar_button_background_hover_opacity: 0`).

## [3.3.0] – 2026-10-18

### Hinzugefügt
- Schieberegler in Entitätskarten als Win95-Trackbar: eingelassene weiße Rille, erhabener grauer Griff (card-mod und UIX). `ha-slider-*`-Farben global gesetzt.
- UIX: Eingabe-, Auswahl-, Datums- und Zeitfelder in Entitätskarten als weiße, eingelassene Kästchen, Pfeil im Auswahlfeld als 3D-Knopf.
- UIX: Thermostat- und Luftbefeuchter-Ring im Win95-Stil mit eckigen Enden, vollen Farben und eckigem Griff.
- Eingabefelder sind überall weiß (`ha-color-form-background`).

### Behoben
- Der Sammelschalter in der Titelleiste einer Entitätskarte klebt nicht mehr an den _ □ ×-Knöpfen.

## [3.2.1] – 2026-10-18

### Behoben
- Seit 3.1.0 wirkte kein card-mod-Styling mehr (keine Titelleisten, keine Thermostat-Knöpfe, keine Kontrollkästchen). Ursache: card-mod 4.2.1 hängt sich ab HA 2026.8 auf, sobald ein Design `card-mod-…-yaml`-Schlüssel enthält. Der Grundlook steht wieder in `card-mod-card`. Alles, was `-yaml` braucht, steht jetzt in `uix-card-yaml` und `uix-row-yaml`, die nur [UIX](https://github.com/Lint-Free-Technology/uix) liest.

### Geändert
- UIX (UI eXtension) ist jetzt die empfohlene Styling-Erweiterung. card-mod bekommt weiterhin den Grundlook.
- Die Spur von Thermostat- und Luftbefeuchter-Regler ist auch ohne UIX dunkler.

## [3.2.0] – 2026-10-18

### Hinzugefügt
- Schalter: Win95-Farben für das aktuelle `ha-switch` (weiße Spur, grauer Knopf, eingeschaltet navy) über die `ha-switch-*`-Variablen.
- card-mod: Schalter in Entitätskarten (Zeilen und Schalter in der Kopfzeile) werden zu Win95-Kontrollkästchen mit Pixel-Häkchen.

## [3.1.0] – 2026-10-18

### Hinzugefügt
- Farben für Klima und Luftbefeuchter aus der 16-Farben-Palette (`state-climate-*-color`, `state-humidifier-on-color`): Heizen rot, Kühlen blau, Automatik grün, Luftbefeuchter teal. Einstellbar über die neuen Variablen `ha95-heat`, `ha95-cool`, `ha95-auto`, `ha95-heat-cool`, `ha95-dry`, `ha95-fan` und `ha95-humid`. „HA 95 Kontrast“ nutzt helle Varianten.
- card-mod: Thermostat- und Luftbefeuchter-Karte bekommen einen grauen Ring und eckige 3D-Knöpfe für + und −. Beim Ziehen am Regler sinkt die Karte nicht mehr ein.
- Beispielkonfiguration für Custom Sidebar (`examples/custom-sidebar/`): Seitenleiste als Startmenü mit „Start“-Titel, Uhr, 3D-Rahmen, senkrechtem „HomeAssistant95“-Streifen und Zusatzinfos an den Einträgen.
- Dialoge ohne Rundungen und Weichzeichner, mit 3D-Rahmen.
- README und Changelog auf Englisch (`README.md`, `CHANGELOG.md`). Die deutschen Fassungen heißen jetzt `README.de.md` und `CHANGELOG.de.md`.

### Geändert
- Die card-mod-Styles für Karten stehen jetzt unter `card-mod-card-yaml` statt `card-mod-card`, weil card-mod nur einen der beiden Schlüssel liest. Wer das Theme um eigenes Karten-CSS erweitert hat, muss es in den `.`-Block verschieben.
- Anleitung an die aktuelle HA-Oberfläche angepasst: **Werkzeuge → YAML → Designs neu laden** und **Profil → Design**.
- Empfehlung ergänzt, card-mod zusätzlich per `extra_module_url` zu laden.

 – 2026-10-18

### Geändert (inkompatibel)
- „Win95“ heißt jetzt überall „HA95“. Die CSS-Variablen `win95-*` heißen jetzt `ha95-*`. Eigene Farbschemata und eigenes card-mod-CSS, die diese Variablen nutzen, müssen angepasst werden.
- Die Extras liegen jetzt unter `www/ha95/ha95.css` statt unter `www/win95/win95.css`. Die Dashboard-Ressource muss auf `/local/ha95/ha95.css` geändert werden.

## [2.0.0] – 2026-10-18

### Geändert (inkompatibel)
- Alle Themes umbenannt: „Windows 95“ → „HA 95“, „Windows 98“ → „HA 98“, „Windows 95 Rose/Spruce/Desert/Kontrast“ → „HA 95 Rose/Spruce/Desert/Kontrast“. Nach dem Update muss das Theme im Profil (und in Dashboards, die ein Theme festlegen) neu ausgewählt werden.
- Theme-Datei umbenannt: `themes/windows95.yaml` → `themes/ha95.yaml`. Bei manueller Installation die alte Datei löschen.

## [1.1.1] – 2026-10-18

### Geändert
- HACS zeigt das Paket jetzt als „HomeAssistant95“ an (vorher „Windows 95“). Die Namen der einzelnen Themes bleiben gleich.

## [1.1.0] – 2026-10-18

### Hinzugefügt
- Fünf weitere Themes: „Windows 98“ (Titelleisten mit Farbverlauf), „Windows 95 Rose“, „Windows 95 Spruce“, „Windows 95 Desert“ und „Windows 95 Kontrast“ (dunkel).
- `www/win95/win95.css` als Dashboard-Ressource: Pixel-Schrift „Pixelated MS Sans Serif“, Win95-Mauszeiger, graue Scrollbars, Markierungsfarbe.
- card-mod: Kartentitel als Fenster-Titelleiste mit _ □ ×-Knöpfen, Titelleiste in Detail-Dialogen, Seitenleiste mit 3D-Rahmen.
- Explizite `rgb-*`-Werte, damit halbtransparente Hervorhebungen zum Farbschema passen.

### Geändert
- Alle Farben laufen jetzt über `win95-*`-Variablen. So lassen sich eigene Farbschemata mit wenigen Zeilen anlegen.

## [1.0.0] – 2026-10-18

### Hinzugefügt
- Theme „Windows 95“: Teal-Desktop, graue 3D-Karten, Navy-Kopfzeile, Seitenleiste im Startmenü-Stil, eckige Kanten, weiße Eingabefelder, 16-Farben-Palette für Diagramme.
- Optionaler card-mod-Teil: Navy-Titelleisten für Kartentitel, eingedrückter Klick-Effekt.
