# Uninstall

🇬🇧 **English** · 🇩🇪 [Deutsch](uninstall.de.md) · [← back to the README](../README.md)

1. **Switch the theme back:** **Profile → Theme** → back to the default. If dashboards, views or cards have `theme: HA 95` (or another HA 95 variant) set, remove it there too.
2. **Remove the theme:** HACS → HomeAssistant95 → ⋮ → **Remove**. For a manual install, delete `/config/themes/ha95.yaml`. Then **Tools → YAML → reload Themes**.
3. **Remove the extras** (only what you installed):
   - Delete `/config/www/ha95/` (`ha95.css`, `ha95-icons.js`, `ha95-startmenu.js`) and `/config/www/ha95-startmenu.json`.
   - **Settings → Dashboards → ⋮ → Resources:** delete `/local/ha95/ha95.css`.
   - In `configuration.yaml`, delete the lines `/local/ha95/ha95-icons.js` and `/local/ha95/ha95-startmenu.js` under `frontend: extra_module_url:` (and `extra_module_url:` itself if nothing is left), then restart Home Assistant.
4. **Replace pixel icons:** everything that still uses `ha95:` icons (dashboards, entities, sidebar config) shows an empty icon afterwards. Change `ha95:` back to `mdi:`.
5. **Custom Sidebar:** the example config uses the `ha95-*` colors, which no longer exist without the theme. Restore your previous `/config/www/custom-sidebar-config.yaml` or delete the color, `styles` and "Tools" parts.
6. **UIX, card-mod and Custom Sidebar** are separate HACS installs. Only remove them if nothing else uses them.
7. Reload the browser with **Ctrl+F5**. In the companion app, clear the frontend cache or restart the app.
