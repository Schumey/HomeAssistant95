# Uninstall

🇬🇧 **English** · 🇩🇪 [Deutsch](uninstall.de.md) · [← back to the README](../README.md)

1. **Switch the theme back:** **Profile → Theme** → back to the default. If dashboards, views or cards have `theme: HA 95` (or another HA 95 variant) set, remove it there too.
2. **Remove the integration:** **Settings → Devices & services → HA 95 → ⋮ → Delete**, then HACS → HA 95 → ⋮ → **Remove**, then restart Home Assistant. Delete the folder `/config/themes/ha95/` and run **Tools → YAML → reload Themes**.
3. **Old installation (before 4.0):** if you used the files by hand, delete `/config/www/ha95/`, the dashboard resources `/local/ha95/ha95.css` and `/local/ha95/ha95-clock.js`, and the lines under `frontend: extra_module_url:` in `configuration.yaml`. Keep `/config/www/ha95-startmenu.json` if you want your start menu later; delete it otherwise.
4. **Replace pixel icons:** everything that still uses `ha95:` icons (dashboards, entities, sidebar config) shows an empty icon afterwards. Change `ha95:` back to `mdi:`.
5. **Custom Sidebar:** the example config uses the `ha95-*` colors, which no longer exist without the theme. Restore your previous `/config/www/custom-sidebar-config.yaml` or delete the color, `styles` and "Tools" parts.
6. **UIX, card-mod and Custom Sidebar** are separate HACS installs. Only remove them if nothing else uses them.
7. Reload the browser with **Ctrl+F5**. In the companion app, clear the frontend cache or restart the app.
