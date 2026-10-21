# Start menu

🇬🇧 **English** · 🇩🇪 [Deutsch](start-menu.de.md) · [← back to the README](../README.md)

The sidebar can look and work like the Windows 95 Start menu. There are two parts, and you can use either one on its own:

| Part | What it does | Needs |
|---|---|---|
| [Sidebar look](#1-sidebar-look-custom-sidebar) | "Start" title with a clock, 3D frame, blue selection, extra info below items | [Custom Sidebar](https://github.com/elchininet/custom-sidebar) (HACS) |
| [Start menu module](#2-start-menu-module) | Vertical "HomeAssistant**95**" banner, colorful Win95 icons, flyout menus with submenus | `www/ha95/ha95-startmenu.js` |

Flyout menus hang off a sidebar entry, so for those you need both parts.

## 1. Sidebar look (Custom Sidebar)

1. Install [Custom Sidebar](https://github.com/elchininet/custom-sidebar) from HACS.
2. Copy [`examples/custom-sidebar/custom-sidebar-config.yaml`](../examples/custom-sidebar/custom-sidebar-config.yaml) to `/config/www/custom-sidebar-config.yaml`.
3. Adjust the names and entity IDs in the `order` section to your setup. `item` is the visible name of a sidebar entry (case-insensitive).
4. Reload the page.

All colors come from the `ha95-*` variables, so the sidebar follows the selected theme. The example uses the [pixel icons](pixel-icons.md). Without them, swap `ha95:` for `mdi:`.

## 2. Start menu module

1. Copy `www/ha95/ha95-startmenu.js` to `/config/www/ha95/`.
2. Load it in `configuration.yaml`:
   ```yaml
   frontend:
     extra_module_url:
       - /local/ha95/ha95-startmenu.js?v=3.14.3
   ```
   The `?v=3.14.3` makes browsers and the companion app load the new file after an update: Home Assistant lets them keep files from `/local/` for 31 days. Change the number with every update. If the app still shows the old version, clear its cache: **Settings → Companion app → Troubleshooting → Reset frontend cache** (Android) or **App Configuration → Debugging → Reset frontend cache** (iOS).
3. Copy [`examples/startmenu/ha95-startmenu.json`](../examples/startmenu/ha95-startmenu.json) to `/config/www/ha95-startmenu.json`.
4. Restart Home Assistant and reload the page.

You now have the banner and the colorful icons. The flyout menus need one more step, see [Build your own menu](#build-your-own-menu).

### Banner and colorful icons

All of them are on by default. They are set at the top of `ha95-startmenu.json`:

```json
{
  "banner": true,
  "banner_text": "HomeAssistant95",
  "color_icons": true,
  "busy_cursor": true,
  "menus": { }
}
```

| Option | Effect |
|---|---|
| `banner` | `false` hides the vertical banner. |
| `banner_text` | Text of the banner. Digits at the end are drawn lighter, like the "95" in "Windows 95". |
| `color_icons` | `false` keeps the normal icons. |
| `busy_cursor` | Hourglass pointer while Home Assistant is busy: when a request (saving, an action) takes longer than 0.3 s, while the connection is gone (restart) and briefly after changing pages. `false` turns it off. |
| `clock` | Double-clicking the title with the clock (tapping on touch screens) opens "Date/Time Properties" with calendar and analog clock. Needs `ha95-clock.js` next to the module, see [Date/Time](date-time.md#start-menu-clock). `false` turns it off. |
| `clock_calendars` | Calendar entities whose events that window shows, e.g. `["calendar.family"]`. |

The banner color is the `ha95-banner` variable of the theme: gray in HA 95, a blue gradient in HA 98 (like the Windows 98 Start menu).

The module replaces an icon with a colorful one when it has a matching drawing. That works for sidebar entries (by their icon name, whatever the prefix, e.g. `mdi:`, `ha95:` or `hacs:`, and for built-in pages such as Settings, Notifications, Activity, History, Energy, Map, Media, To-do lists, Calendar and Developer tools) and for the icons in the flyout menus. Everything else keeps its normal icon.

Colorful icons (more MDI names point to these, e.g. `home-outline`, `cog-outline`, `hammer`, `thermometer-lines`, `lightning-bolt`):

`account`, `account-group`, `battery` (all levels), `battery-arrow-down`, `battery-arrow-up`, `battery-clock`, `battery-sync`, `bed`, `bell`, `calendar`, `camera`, `car`, `ceiling-light`, `chart-box`, `chart-line`, `clipboard-list`, `code-braces`, `coffee-to-go`, `cog`, `desk-lamp`, `devices`, `door-closed`, `fan`, `file-document`, `fire`, `flash`, `flower`, `folder-open`, `format-list-bulleted`, `garage`, `help`, `history`, `home`, `information`, `lamps`, `lightbulb`, `lock`, `lock-open`, `map`, `music-note`, `palette`, `play-box`, `power`, `printer-3d-nozzle`, `radiator`, `restart`, `robot`, `robot-vacuum`, `script-text`, `shape-outline`, `shield`, `shield-home`, `snowflake`, `sofa`, `speaker`, `sprout`, `television`, `thermometer`, `thermostat`, `tools`, `view-dashboard`, `washing-machine`, `water`, `weather-partly-cloudy`, `weather-sunny`, `window-closed`, `wrench`, `console`, `dock-left`, `hacs`, `key`, `math-log`, `menu`, `view-grid`

## Build your own menu

The example comes with a "Tools" menu. This walk-through builds a second one, a "Rooms" menu that opens your dashboards, with a "Lights" submenu.

### Step 1: describe the menu in the JSON file

Every menu is a list under `menus` with a name of your choice (the *menu ID*). Add `rooms` next to `tools` in `/config/www/ha95-startmenu.json`:

```json
{
  "menus": {
    "tools": [ … ],
    "rooms": [
      { "name": "Living room", "icon": "mdi:sofa", "path": "/dashboard-home/living-room" },
      { "name": "Bedroom", "icon": "mdi:bed", "path": "/dashboard-home/bedroom" },
      { "name": "Garage", "icon": "mdi:garage", "path": "/dashboard-home/garage" },
      { "divider": true },
      {
        "name": "Lights",
        "icon": "mdi:lightbulb",
        "items": [
          { "name": "All lights", "icon": "mdi:ceiling-light", "path": "/light" },
          { "name": "Light automations", "icon": "mdi:robot", "path": "/config/automation/dashboard" }
        ]
      },
      { "divider": true },
      { "name": "Weather radar", "icon": "mdi:weather-partly-cloudy", "url": "https://www.rainviewer.com/" }
    ]
  }
}
```

Each line is one entry. What it does depends on its key:

| Entry | Does |
|---|---|
| `{ "name": "…", "icon": "mdi:…", "path": "/…" }` | Opens a page in Home Assistant. Copy the path from the address bar, without the host (e.g. `/dashboard-home/living-room`). |
| `{ "name": "…", "file": "configuration.yaml" }` | Opens the file in the [File editor](https://github.com/home-assistant/addons/tree/master/configurator) app, relative to `file_editor_base` (default `/homeassistant`). Without `icon` it gets a document icon. |
| `{ "name": "…", "action": "restart" }` | Restarts Home Assistant after a Win95 confirmation dialog. Then the black "It's now safe to turn off Home Assistant." screen appears until Home Assistant is back (click or Escape closes it earlier). |
| `{ "name": "…", "action": "run" }` | Opens the Home Assistant search as the Win95 "Run" dialog (with UIX, see [Window look](window-look.md)). Good with `"icon": "mdi:console"`. |
| `{ "name": "…", "action": "clock" }` | Opens "Date/Time Properties" (see [Date/Time](date-time.md)). Good with `"icon": "mdi:clock"`. |
| `{ "name": "…", "url": "https://…" }` | Opens an address in a new tab. |
| `{ "name": "…", "items": [ … ] }` | Opens another submenu. Submenus can be nested as deep as you like. |
| `{ "divider": true }` | Separator line. |

`icon` is optional and takes any `mdi:` or `ha95:` icon. Icons from the [list above](#banner-and-colorful-icons) are drawn in color.

> The file must be valid JSON: double quotes, a comma between entries, no comma after the last one. If the menu does not open, check the file with any JSON validator.

### Step 2: add a sidebar entry that opens the menu

A sidebar entry opens a menu when it has the attribute `data-ha95-menu` with the menu ID. With Custom Sidebar, add a new entry to the `order` section of `/config/www/custom-sidebar-config.yaml`:

```yaml
order:
  # … your other entries …
  - new_item: true
    item: Rooms
    icon: mdi:home
    order: 2
    attributes:
      data-ha95-menu: rooms
    on_click:
      action: javascript
      code: "// opened by ha95-startmenu.js"
```

- `item` is the label in the sidebar.
- `data-ha95-menu: rooms` connects the entry to the `rooms` menu from step 1.
- `on_click` with an empty script keeps the entry from navigating anywhere. The click opens the menu.
- `bottom: true` puts the entry at the bottom of the sidebar, next to Settings (like "Tools" in the example).

You can also give an existing entry a menu, e.g. `- item: Settings` with the same `attributes`. Clicking it then opens the menu instead of the page.

### Step 3: reload

Reload the page (Ctrl+F5). Hover over "Rooms" (or tap it on a phone) and the menu opens to the right. Changes to the JSON file only need a page reload, not a restart.

### Other options in the JSON file

| Option | Default | Meaning |
|---|---|---|
| `file_editor_panel` | `core_configurator` | Panel name of the File editor app (the part after the host in its address). |
| `file_editor_base` | `/homeassistant` | Folder that `file` entries are relative to. |

Instead of the JSON file you can also set `window.ha95StartmenuConfig = { menus: { … } }` from another module that loads first.

### Troubleshooting

| Problem | Fix |
|---|---|
| Nothing happens on hover or tap | Is `ha95-startmenu.js` in `extra_module_url` and did you restart? The browser console shows `HA95 Startmenü: Menü "…" fehlt` when the menu ID in the sidebar does not exist in the JSON file. |
| Menu is empty or old | The JSON file has a syntax error, or the page has not been reloaded. |
| File editor opens, but not the file | Check `file_editor_panel` and `file_editor_base`. |
| No banner | The banner only shows while the sidebar is expanded. |
| Works in the browser, but not in the companion app (no banner, no colorful icons, no ▶ arrow) | The app still uses an old copy of the module. Raise the number after `?v=` in `extra_module_url` and restart, or reset the app's frontend cache (see [setup](#2-start-menu-module)). |
| Banner and colorful icons disappear | The browser console shows `HA95 Startmenü: Seitenleiste ändert sich mehr als …`. Something changed the sidebar many times a second for several seconds, so the module stopped redrawing it instead of freezing the interface. The menus keep working. Reload the page; if it happens again, please open an issue. |
