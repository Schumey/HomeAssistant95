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
| Kopfleiste von Dashboards und Einstellungen | Win95-Titelleiste (36 px, fetter Titel), die Knöpfe als kleine, gleich große eckige 3D-Knöpfe (24×22). |
| Einstellungsseite | Icons als eckige 3D-Kacheln wie in der Systemsteuerung. |
| Thermostat und Luftbefeuchter | Ring mit eckigen Enden, vollen Farben und eckigem Griff; + und − als eckige 3D-Knöpfe. |
| Schalter in Entitätskarten | Win95-Kontrollkästchen: ein eingelassenes weißes Kästchen mit Pixel-Häkchen. Der Sammelschalter steht in einer eigenen Zeile unter der Titelleiste. |
| Schieberegler | Win95-Trackbars: eingelassene weiße Rille, erhabener grauer Griff. |
| Auswahl-, Datums- und Zeitfelder | Win95-Dialogelemente: Beschriftung links, daneben ein weißes, eingelassenes Feld. Auswahlfelder bekommen einen 3D-▼-Knopf. |
| Pixel-Schrift | Mit UIX ab 8.4.0 lädt das Design die Schrift selbst (`uix-fonts`), sie erscheint dann auch auf den Einstellungsseiten. |

## Noch card-mod?

[card-mod](https://github.com/thomasloven/lovelace-card-mod) 4.2.1 wird nicht mehr gepflegt. Seit HA 2026.8 hört es komplett auf zu stylen, sobald ein Design `card-mod-…-yaml`-Schlüssel enthält. Dieses Design gibt card-mod deshalb nur den Grundlook (Titelleisten der Karten, Klick-Effekt, Kopfleiste, 3D-Knöpfe in Dialogen, Trackbars). Alles andere steht in `uix-…-yaml`-Schlüsseln, die nur UIX liest. Der Umstieg auf UIX lohnt sich.

> UIX und card-mod greifen in Interna des Frontends ein. Nach Home-Assistant-Updates kurz prüfen, ob alles noch passt.
