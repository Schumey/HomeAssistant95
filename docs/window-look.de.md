# Fenster-Look mit UIX

🇬🇧 [English](window-look.md) · 🇩🇪 **Deutsch** · [← zurück zur README](../README.de.md)

Das Design allein setzt Farben, Schrift und eckige Kanten. Für echte Win95-Fenster braucht es [UIX – UI eXtension](https://github.com/Lint-Free-Technology/uix) (HACS). Damit kann ein Design auch das Innere von Karten und Dialogen gestalten. Ohne UIX wird dieser Teil einfach ignoriert.

## Einrichtung

1. UIX über HACS installieren.
2. Unter **Einstellungen → Geräte & Dienste** hinzufügen (es ist eine Integration).
3. Ist noch card-mod installiert, vorher entfernen, auch einen `extra_module_url`-Eintrag dafür.
4. Seite neu laden.

## Was sich ändert

| Wo | Aussehen |
|---|---|
| Karten mit Titel | Fenster mit Titelleiste und _ □ ×-Knöpfen, auch bei Karten, die ihren Titel selbst zeichnen (z. B. Markdown). Karten sehen beim Klicken eingedrückt aus. Runde Ecken, die ein Dashboard setzt, werden eckig. |
| Detail-Dialoge (more-info) | Win95-Fenster: Titelleiste „Name - Bereich“ mit kleinem ×-Knopf rechts, darunter eine Symbolleiste mit den Knöpfen (Verlauf, Einstellungen, ⋮) als eckige 3D-Knöpfe. |
| Andere Dialoge | Rückfragen („Wirklich löschen?“), Editoren und Einstellungsdialoge sind ebenfalls Win95-Fenster: Titelleiste oben, OK/Abbrechen als Win95-Schaltflächen (75×23), die Hauptschaltfläche mit schwarzem Rand, ein gepunkteter Fokusrahmen. |
| Suche („Ausführen“) | Die Suche von Home Assistant (Taste `e`, Strg+K oder die Lupe) sieht aus wie der Win95-Dialog „Ausführen“: Titelleiste „Ausführen“, Programm-Symbol mit Erklärung, eingelassenes Eingabefeld, die Bereiche als Knöpfe (der gewählte eingedrückt) und eine weiße Liste. Das [Startmenü](start-menu.de.md) öffnet sie mit `{ "action": "run" }`. |
| Meldungen | Meldungen unten („Verbindung verloren“, „Gelöscht“) sind graue Win95-Fenster mit Info-Symbol. Hinweise in Karten und Dialogen (`ha-alert`) bekommen einen eingeritzten Rahmen und die Win95-Symbole für Info, Warnung, Fehler und Erfolg. |
| Kopfleiste von Dashboards und Einstellungen | Win95-Titelleiste (36 px, fetter Titel), die Knöpfe als kleine, gleich große eckige 3D-Knöpfe (24×22). Die Ansichten-Tabs sind Registerkarten wie in einem Eigenschaften-Dialog: grau und erhaben, die aktive höher und mit der Kante darunter verschmolzen. |
| Einstellungsseite | Icons als eckige 3D-Kacheln wie in der Systemsteuerung. |
| Thermostat, Luftbefeuchter und Licht-Karte | Ring aus Blöcken wie ein Win95-Fortschrittsbalken, mit eckigen Enden, vollen Farben und eckigem Griff; + und − als eckige 3D-Knöpfe. |
| Regler in Kacheln und Dialogen | Helligkeit, Position, Lautstärke und Zahlenregler (in Kachel-Features und im Detail-Dialog) sind Win95-Fortschrittsbalken: ein eingelassenes weißes Feld mit Blöcken in der Markierungsfarbe. Beim Ziehen steht der Wert in einer gelben QuickInfo. |
| Schalter in Entitätskarten | Win95-Kontrollkästchen: ein eingelassenes weißes Kästchen mit Pixel-Häkchen. Der Sammelschalter steht in einer eigenen Zeile unter der Titelleiste. |
| Schieberegler in Entitätskarten | Win95-Trackbars: eingelassene weiße Rille, erhabener grauer Griff. |
| Auswahl-, Datums- und Zeitfelder | Win95-Dialogelemente: Beschriftung links, daneben ein weißes, eingelassenes Feld. Auswahlfelder bekommen einen 3D-▼-Knopf. |
| Pixel-Schrift | Mit UIX ab 8.4.0 lädt das Design die Schrift selbst (`uix-fonts`), sie erscheint dann auch auf den Einstellungsseiten. |

## Noch card-mod?

[card-mod](https://github.com/thomasloven/lovelace-card-mod) 4.2.1 wird nicht mehr gepflegt. Seit HA 2026.8 hört es komplett auf zu stylen, sobald ein Design `card-mod-…-yaml`-Schlüssel enthält. Dieses Design gibt card-mod deshalb nur den Grundlook (Titelleisten der Karten, Klick-Effekt, Kopfleiste mit Registerkarten, 3D-Knöpfe in Dialogen, Trackbars). Alles andere steht in `uix-…-yaml`-Schlüsseln, die nur UIX liest. Der Umstieg auf UIX lohnt sich.

> UIX und card-mod greifen in Interna des Frontends ein. Nach Home-Assistant-Updates kurz prüfen, ob alles noch passt.
