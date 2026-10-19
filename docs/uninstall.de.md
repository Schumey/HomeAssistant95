# Deinstallieren

🇬🇧 [English](uninstall.md) · 🇩🇪 **Deutsch** · [← zurück zur README](../README.de.md)

1. **Design zurückstellen:** **Profil → Design** → zurück auf den Standard. Wenn Dashboards, Ansichten oder Karten `theme: HA 95` (oder eine andere HA-95-Variante) gesetzt haben, dort ebenfalls entfernen.
2. **Design entfernen:** HACS → HomeAssistant95 → ⋮ → **Entfernen**. Bei manueller Installation `/config/themes/ha95.yaml` löschen. Danach **Werkzeuge → YAML → Designs neu laden**.
3. **Extras entfernen** (nur, was du installiert hast):
   - `/config/www/ha95/` (`ha95.css`, `ha95-icons.js`, `ha95-startmenu.js`) und `/config/www/ha95-startmenu.json` löschen.
   - **Einstellungen → Dashboards → ⋮ → Ressourcen:** `/local/ha95/ha95.css` löschen.
   - In `configuration.yaml` unter `frontend: extra_module_url:` die Zeilen `/local/ha95/ha95-icons.js` und `/local/ha95/ha95-startmenu.js` löschen (und `extra_module_url:` selbst, wenn nichts mehr übrig ist), dann Home Assistant neu starten.
4. **Pixel-Icons ersetzen:** Alles, was noch `ha95:`-Icons nutzt (Dashboards, Entitäten, Seitenleisten-Konfiguration), zeigt danach ein leeres Icon. `ha95:` wieder durch `mdi:` ersetzen.
5. **Custom Sidebar:** Die Beispielkonfiguration nutzt die `ha95-*`-Farben, die es ohne das Design nicht mehr gibt. Die frühere `/config/www/custom-sidebar-config.yaml` wiederherstellen oder die Farb-, `styles`- und „Werkzeuge“-Teile löschen.
6. **UIX, card-mod und Custom Sidebar** sind eigene HACS-Installationen. Nur entfernen, wenn nichts anderes sie braucht.
7. Den Browser mit **Strg+F5** neu laden. In der Companion-App den Frontend-Cache leeren oder die App neu starten.
