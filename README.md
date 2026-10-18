# HomeAssistant95

🇬🇧 **English** · 🇩🇪 [Deutsch](README.de.md)

A Windows 95 theme for [Home Assistant](https://www.home-assistant.io/): teal desktop, gray 3D windows, navy title bars, square corners and a pixel font.

## Included themes

| Theme | Description |
|---|---|
| **HA 95** | The standard color scheme |
| **HA 98** | Like 95, with gradient title bars |
| **HA 95 Rose** | Based on the "Rose" color scheme |
| **HA 95 Spruce** | Based on the "Spruce" color scheme |
| **HA 95 Desert** | Based on the "Desert" color scheme |
| **HA 95 Kontrast** | "High Contrast Black", the dark variant |

## Installation

### With HACS

1. HACS → ⋮ → **Custom repositories** → URL of this repo, type **Theme**.
2. Install "HomeAssistant95".
3. **Tools → YAML → reload Themes**.
4. Pick one of the variants under **Profile → Theme**.

### Manual

1. Copy `themes/ha95.yaml` to `/config/themes/`.
2. Add this to `configuration.yaml` if it isn't there yet:
   ```yaml
   frontend:
     themes: !include_dir_merge_named themes
   ```
3. Check the configuration, then **Tools → YAML → reload Themes**. If `frontend:` is new, restart once.
4. Pick it under **Profile → Theme**.

## Climate & humidifier

The theme colors climate and humidifier entities with the 16-color palette: heat red, cool blue, auto green, humidifier teal. This covers the thermostat card ring, icons, tiles and history. The colors are `ha95-heat`, `ha95-cool`, `ha95-auto`, `ha95-heat-cool`, `ha95-dry`, `ha95-fan` and `ha95-humid` in the color scheme and can be changed per variant.

With UIX (see below) the thermostat and humidifier cards also get a Win95-style ring (square ends, solid colors, a square handle) and square 3D + and − buttons.

## Switches

Toggle switches get Win95 colors everywhere: a white track, gray thumb and navy when on. With UIX, the switches in entities cards (rows and the header toggle) become real Win95 checkboxes: a sunken white box with a pixel check mark.

## Sliders & input fields

Sliders (e.g. for `input_number`) become Win95 trackbars: a sunken white groove and a raised gray handle. This works with card-mod and UIX. With UIX, dropdowns, date and time fields in entities cards look like Win95 dialog controls: the label on the left, aligned with the other rows, and a white sunken box next to it. Dropdowns take the right half of the row with a 3D ▼ button at the edge. Date and time boxes are only as wide as their content, without the "hh"/"mm" labels. Outside dashboards, fields are at least white.

## Extras (optional)

### Pixel font & mouse pointer

1. Copy `www/ha95/ha95.css` to `/config/www/ha95/`.
2. **Settings → Dashboards → ⋮ → Resources** → `/local/ha95/ha95.css`, type **Stylesheet**.

The "Pixelated MS Sans Serif" font comes from [98.css](https://github.com/jdan/98.css) (MIT) and is loaded from jsDelivr.

### Pixel icons

`www/ha95/ha95-icons.js` adds an icon set in Win95 pixel style: 89 icons on a 24×24 grid, with an outline in full color and a fill at half opacity. They are colored by entity state like every other icon. The names follow MDI, so `mdi:lightbulb-on` becomes `ha95:lightbulb-on`. Unknown names show `ha95:help`.

1. Copy `www/ha95/ha95-icons.js` to `/config/www/ha95/`.
2. In `configuration.yaml`:
   ```yaml
   frontend:
     extra_module_url:
       - /local/ha95/ha95-icons.js
   ```
3. Restart Home Assistant and reload the page.
4. Use the icons anywhere you can pick an icon, for example `icon: ha95:thermostat`. The icon picker lists them when you type `ha95`.

Alternatively you can add the file as a dashboard resource (type **JavaScript module**), but then the icons only show up in dashboards, not in the sidebar.

Included: `account`, `air-humidifier`, `alert`, `alert-circle`, `battery`, `battery-10`, `battery-20`, `battery-30`, `battery-40`, `battery-50`, `battery-60`, `battery-70`, `battery-80`, `battery-90`, `battery-alert`, `battery-charging`, `battery-outline`, `bell`, `blinds`, `blinds-open`, `calendar`, `camera`, `chart-line`, `check-circle`, `clock`, `cog`, `door-closed`, `door-open`, `eye`, `fan`, `fan-off`, `file-document`, `fire`, `flash`, `flower`, `folder`, `folder-open`, `garage`, `garage-open`, `help`, `home`, `information`, `leaf`, `lightbulb`, `lightbulb-off`, `lightbulb-on`, `lock`, `lock-open`, `magnify`, `map`, `monitor`, `motion-sensor`, `music`, `music-note`, `pause`, `play`, `power`, `power-plug`, `power-plug-off`, `power-socket-de`, `radiator`, `robot-vacuum`, `shield`, `snowflake`, `speaker`, `stop`, `television`, `thermometer`, `thermostat`, `toggle-switch-variant`, `toggle-switch-variant-off`, `trash-can`, `view-dashboard`, `volume-high`, `volume-medium`, `volume-mute`, `washing-machine`, `water`, `weather-cloudy`, `weather-fog`, `weather-lightning`, `weather-night`, `weather-partly-cloudy`, `weather-rainy`, `weather-snowy`, `weather-sunny`, `wifi`, `window-closed`, `window-open`. Many more MDI names point to one of these, e.g. `lightbulb-outline`, `home-outline`, `roller-shade-closed` or `toggle-switch`. Each icon is a readable text grid in the file, so you can edit or add your own.

#### Automatic mode

Instead of changing every icon by hand, the file can do it for you. Add an option to the URL in `configuration.yaml`:

| URL | Effect |
|---|---|
| `/local/ha95/ha95-icons.js?replace` | Every `mdi:` icon that exists as `ha95:` is replaced automatically, including the default icons of your entities. |
| `/local/ha95/ha95-icons.js?pixelate` | Every other icon (all of MDI, including buttons and menus) is snapped to the 24×24 pixel grid. |
| `/local/ha95/ha95-icons.js?replace&pixelate` | Both: hand-drawn icons where available, pixelated MDI for the rest. |

Restart Home Assistant after changing the URL. Both modes hook into the frontend's icon components, so like UIX, check them after Home Assistant updates. Icons with their own `viewBox` (from other icon sets) are left alone.

### Window look with UIX (or card-mod)

With [UIX – UI eXtension](https://github.com/Lint-Free-Technology/uix) (HACS), cards with a title become windows with a title bar and _ □ × buttons, cards look pressed in when clicked, the thermostat and humidifier cards get square 3D buttons, and switches in entities cards become checkboxes. Without UIX or card-mod this part is ignored.

UIX is the maintained successor of card-mod and reads card-mod settings too. Install it from HACS, then add it under **Settings → Devices & services** (it is an integration). If you still have card-mod installed, remove it first, including any `extra_module_url` entry for it.

**Still on card-mod?** [card-mod](https://github.com/thomasloven/lovelace-card-mod) 4.2.1 is no longer maintained. Since HA 2026.8 it stops styling completely as soon as a theme contains `card-mod-…-yaml` keys. This theme therefore gives card-mod only the basic look (title bars, pressed effect). The thermostat buttons and checkboxes are in `uix-…-yaml` keys, which only UIX reads.

> UIX and card-mod rely on frontend internals. Check that everything still looks right after Home Assistant updates.

### Sidebar as Start menu

With [Custom Sidebar](https://github.com/elchininet/custom-sidebar) (HACS) the sidebar becomes a Start menu: a "Start" title with a clock, a 3D frame, blue selection and the vertical "HomeAssistant95" banner on the left. Items can show extra info, such as the current temperature below "Heating" or a red "!" when the vacuum reports an error.

1. Copy [`examples/custom-sidebar/custom-sidebar-config.yaml`](examples/custom-sidebar/custom-sidebar-config.yaml) to `/config/www/custom-sidebar-config.yaml`.
2. Adjust the names and entity IDs in the `order` section to your setup.
3. Reload the page.

All colors come from the `ha95-*` variables, so the sidebar follows the selected theme. The example uses the [pixel icons](#pixel-icons). Without them, swap `ha95:` for `mdi:`.

### Start menu with submenus

`www/ha95/ha95-startmenu.js` adds Win95 flyout menus to the sidebar: hover over (or tap) an item and a menu opens to the right, with further submenus. The example builds a "Tools" menu with:

- **File Editor ▶** opens frequently used files (e.g. `configuration.yaml`, `automations.yaml`) directly in the [File editor](https://github.com/home-assistant/addons/tree/master/configurator) app
- Automations, scripts, scenes, helpers, developer tools ▶, devices & services, entities, logs
- **Restart …** with a Win95-style confirmation dialog

Setup:

1. Copy `www/ha95/ha95-startmenu.js` to `/config/www/ha95/` and load it in `configuration.yaml`:
   ```yaml
   frontend:
     extra_module_url:
       - /local/ha95/ha95-startmenu.js
   ```
2. Copy [`examples/startmenu/ha95-startmenu.json`](examples/startmenu/ha95-startmenu.json) to `/config/www/ha95-startmenu.json` and adjust it.
3. In the Custom Sidebar config, add an item with the attribute `data-ha95-menu` (see the "Tools" item at the end of the [example](examples/custom-sidebar/custom-sidebar-config.yaml)).
4. Restart Home Assistant and reload the page.

Menu entries in the JSON file:

| Entry | Does |
|---|---|
| `{ "name": "…", "icon": "mdi:…", "path": "/config/…" }` | opens a page |
| `{ "name": "…", "file": "configuration.yaml" }` | opens the file in the File editor (relative to `file_editor_base`, default `/homeassistant`) |
| `{ "name": "…", "action": "restart" }` | restarts Home Assistant after a confirmation |
| `{ "name": "…", "url": "https://…" }` | opens an address in a new tab |
| `{ "name": "…", "items": [ … ] }` | another submenu |
| `{ "divider": true }` | separator line |

If the File editor runs under a different panel name than `core_configurator`, set `file_editor_panel` in the JSON file.

## Your own color scheme

Every color goes through the `ha95-*` variables at the top of the file. Copy a variant, give it a new name (also in `card-mod-theme`) and change only those values and the `rgb-*` lines.

## License

MIT. Windows is a trademark of Microsoft Corporation. This project is a homage and is not affiliated with Microsoft.
