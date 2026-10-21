# Pixel-Icons

🇬🇧 [English](pixel-icons.md) · 🇩🇪 **Deutsch** · [← zurück zur README](../README.de.md)

`ha95-icons.js` bringt ein Icon-Set in Win95-Pixeloptik mit: 537 Icons im 24×24-Raster, Umriss in voller Farbe, Füllung mit halber Deckkraft. Sie werden wie alle Icons nach dem Zustand der Entität eingefärbt. Die Namen folgen MDI, aus `mdi:lightbulb-on` wird `ha95:lightbulb-on`. Unbekannte Namen zeigen `ha95:help`.

## Einrichtung

Unter **Einstellungen → Geräte & Dienste → HA 95 → Konfigurieren** die Auswahl **Pixel-Icons** setzen. Die Integration lädt die Datei selbst, danach die Seite neu laden (**Strg+F5**).

Überall, wo man ein Icon wählen kann, z. B. `icon: ha95:thermostat` eintragen. Die Icon-Auswahl zeigt sie an, wenn man `ha95` tippt.

## Was enthalten ist

Die 500 MDI-Icons, die Home Assistant am häufigsten nutzt (die Standard-Icons aller Core-Integrationen und die Icons der Oberfläche), außer den Markenlogos `home-assistant` und `bluetooth`. Weitere 94 MDI-Namen zeigen auf eins davon, z. B. `lightbulb-outline`, `home-outline`, `roller-shade-closed` oder `toggle-switch`. In der Icon-Auswahl `ha95` tippen, um alle zu sehen. Jedes Icon steht als lesbares Textraster in der Datei, man kann sie also anpassen oder eigene ergänzen.

## Automatischer Modus

Statt jedes Icon von Hand umzustellen, kann die Datei das selbst erledigen. Den Modus wählst du in der Auswahl **Pixel-Icons** der Integration:

| Option | Wirkung |
|---|---|
| Nur zusätzlich | Es kommen nur die `ha95:`-Icons dazu, nichts wird automatisch geändert. |
| Ersetzen | Jedes `mdi:`-Icon, das es auch als `ha95:` gibt, wird automatisch ersetzt, auch die Standard-Icons der Entitäten. |
| Pixeln | Alle übrigen Icons (ganz MDI, auch Knöpfe und Menüs) werden auf das 24×24-Pixelraster gebracht. |
| Ersetzen und pixeln | Beides: gezeichnete Icons, wo vorhanden, verpixeltes MDI für den Rest. |

Beide Modi greifen in die Icon-Komponenten des Frontends ein, wie bei UIX also nach Home-Assistant-Updates kurz prüfen. Icons mit eigener `viewBox` (aus anderen Icon-Sets) bleiben unverändert.

## Bunte Icons im Startmenü

Das [Startmenü-Modul](start-menu.de.md#streifen-und-bunte-icons) zeichnet rund 70 dieser Icons bunt (schwarzer Umriss, farbige Füllung, 3D-Schattierung), in der Seitenleiste und in den Ausklappmenüs.
