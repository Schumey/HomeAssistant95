# Pixel-Icons

🇬🇧 [English](pixel-icons.md) · 🇩🇪 **Deutsch** · [← zurück zur README](../README.de.md)

`www/ha95/ha95-icons.js` bringt ein Icon-Set in Win95-Pixeloptik mit: 537 Icons im 24×24-Raster, Umriss in voller Farbe, Füllung mit halber Deckkraft. Sie werden wie alle Icons nach dem Zustand der Entität eingefärbt. Die Namen folgen MDI, aus `mdi:lightbulb-on` wird `ha95:lightbulb-on`. Unbekannte Namen zeigen `ha95:help`.

## Einrichtung

1. `www/ha95/ha95-icons.js` nach `/config/www/ha95/` kopieren.
2. In `configuration.yaml`:
   ```yaml
   frontend:
     extra_module_url:
       - /local/ha95/ha95-icons.js?v=3.14.0
   ```
   Das `?v=3.14.0` sorgt dafür, dass Browser und Companion-App nach einem Update die neue Datei laden: Home Assistant erlaubt ihnen, Dateien aus `/local/` 31 Tage lang zwischenzuspeichern. Die Nummer bei jedem Update ändern. Zeigt die App trotzdem noch die alte Fassung, ihren Cache leeren: **Einstellungen → Companion-App → Fehlerbehebung → Frontend-Cache zurücksetzen** (Android) bzw. **App-Konfiguration → Debugging → Frontend-Cache zurücksetzen** (iOS).
3. Home Assistant neu starten und die Seite neu laden.
4. Überall, wo man ein Icon wählen kann, z. B. `icon: ha95:thermostat` eintragen. Die Icon-Auswahl zeigt sie an, wenn man `ha95` tippt.

Alternativ geht die Datei auch als Dashboard-Ressource (Typ **JavaScript-Modul**). Dann erscheinen die Icons aber nur in Dashboards, nicht in der Seitenleiste.

## Was enthalten ist

Die 500 MDI-Icons, die Home Assistant am häufigsten nutzt (die Standard-Icons aller Core-Integrationen und die Icons der Oberfläche), außer den Markenlogos `home-assistant` und `bluetooth`. Weitere 94 MDI-Namen zeigen auf eins davon, z. B. `lightbulb-outline`, `home-outline`, `roller-shade-closed` oder `toggle-switch`. In der Icon-Auswahl `ha95` tippen, um alle zu sehen. Jedes Icon steht als lesbares Textraster in der Datei, man kann sie also anpassen oder eigene ergänzen.

## Automatischer Modus

Statt jedes Icon von Hand umzustellen, kann die Datei das selbst erledigen. Dafür hängt man in `configuration.yaml` eine Option an die URL:

| URL | Wirkung |
|---|---|
| `/local/ha95/ha95-icons.js?replace` | Jedes `mdi:`-Icon, das es auch als `ha95:` gibt, wird automatisch ersetzt, auch die Standard-Icons der Entitäten. |
| `/local/ha95/ha95-icons.js?pixelate` | Alle übrigen Icons (ganz MDI, auch Knöpfe und Menüs) werden auf das 24×24-Pixelraster gebracht. |
| `/local/ha95/ha95-icons.js?replace&pixelate` | Beides: gezeichnete Icons, wo vorhanden, verpixeltes MDI für den Rest. |

Die Version mit `&` anhängen, z. B. `/local/ha95/ha95-icons.js?replace&pixelate&v=3.14.0`.

Nach dem Ändern der URL Home Assistant neu starten. Beide Modi greifen in die Icon-Komponenten des Frontends ein, wie bei UIX also nach Home-Assistant-Updates kurz prüfen. Icons mit eigener `viewBox` (aus anderen Icon-Sets) bleiben unverändert.

## Bunte Icons im Startmenü

Das [Startmenü-Modul](start-menu.de.md#streifen-und-bunte-icons) zeichnet rund 70 dieser Icons bunt (schwarzer Umriss, farbige Füllung, 3D-Schattierung), in der Seitenleiste und in den Ausklappmenüs.
