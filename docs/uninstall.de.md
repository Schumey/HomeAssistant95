# Deinstallieren

🇬🇧 [English](uninstall.md) · 🇩🇪 **Deutsch** · [← zurück zur README](../README.de.md)

1. **Design zurückstellen:** **Profil → Design** → zurück auf den Standard. Wenn Dashboards, Ansichten oder Karten `theme: HA 95` (oder eine andere HA-95-Variante) gesetzt haben, dort ebenfalls entfernen.
2. **Integration entfernen:** **Einstellungen → Geräte & Dienste → HomeAssistant95 → ⋮ → Löschen**, dann HACS → HomeAssistant95 → ⋮ → **Entfernen**, danach Home Assistant neu starten. Den Ordner `/config/themes/ha95/` löschen und **Werkzeuge → YAML → Designs neu laden**.
3. **Alte Installation (vor 4.0):** Wer die Dateien von Hand eingebunden hatte, löscht `/config/www/ha95/`, die Dashboard-Ressourcen `/local/ha95/ha95.css` und `/local/ha95/ha95-clock.js` und die Zeilen unter `frontend: extra_module_url:` in der `configuration.yaml`. `/config/www/ha95-startmenu.json` behalten, wenn das Startmenü später wieder gebraucht wird, sonst löschen.
4. **Pixel-Icons ersetzen:** Alles, was noch `ha95:`-Icons nutzt (Dashboards, Entitäten, Seitenleisten-Konfiguration), zeigt danach ein leeres Icon. `ha95:` wieder durch `mdi:` ersetzen.
5. **Custom Sidebar:** Die Beispielkonfiguration nutzt die `ha95-*`-Farben, die es ohne das Design nicht mehr gibt. Die frühere `/config/www/custom-sidebar-config.yaml` wiederherstellen oder die Farb-, `styles`- und „Werkzeuge“-Teile löschen.
6. **UIX, card-mod und Custom Sidebar** sind eigene HACS-Installationen. Nur entfernen, wenn nichts anderes sie braucht.
7. Den Browser mit **Strg+F5** neu laden. In der Companion-App den Frontend-Cache leeren oder die App neu starten.
