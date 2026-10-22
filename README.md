# HomeAssistant95

🇬🇧 **English** · 🇩🇪 [Deutsch](README.de.md)

A Windows 95 theme for [Home Assistant](https://www.home-assistant.io/): teal desktop, gray 3D windows, navy title bars, square corners and a pixel font.

![HA 95 in six of its themes](https://raw.githubusercontent.com/Schumey/HomeAssistant95/main/docs/img/demo.gif)

## Included themes

| Theme | Description |
|---|---|
| **HA 95** | The standard color scheme |
| **HA 98** | Like 95, with gradient title bars |
| **HA 95 Rose** | Based on the "Rose" color scheme |
| **HA 95 Spruce** | Based on the "Spruce" color scheme |
| **HA 95 Desert** | Based on the "Desert" color scheme |
| **HA 95 Kontrast** | "High Contrast Black" |
| **HA 95 Dark** | Dark mode: dark gray windows, dark teal desktop |
| **HA 95 Auto** | Switches between HA 95 and HA 95 Dark with the light/dark mode |
| **HA 3.11** | Windows 3.1 look: white windows, flat frames, centered title, ▼ ▲ buttons |
| **HA 3.11 Hot Dog Stand** / **Arizona** / **Ozean** / **Schwarze Lederjacke** | The Windows 3.1 color schemes, including the infamous red and yellow "Hot Dog Stand" |

More about dark mode, the Windows 3.1 look and your own colors: [Color schemes](docs/color-schemes.md).

## Installation

HA 95 is an integration: it installs the themes you pick and loads the extras for you. Nothing to copy by hand, nothing to add to `configuration.yaml` except the line for themes (if you don't have it yet).

[![Open your Home Assistant instance and open this repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=Schumey&repository=HomeAssistant95&category=integration)

1. HACS → ⋮ → **Custom repositories** → URL of this repo, type **Integration** (or click the button above).
2. Install "HomeAssistant95" and restart Home Assistant.
3. Add this to `configuration.yaml` if it isn't there yet, then restart once more:
   ```yaml
   frontend:
     themes: !include_dir_merge_named themes
   ```
4. **Settings → Devices & services → Add integration → HA 95**. Pick the themes you want and the extras to switch on.
5. Reload the browser with **Ctrl+F5**, then pick a variant under **Profile → Theme**.

### Change themes and extras later

**Settings → Devices & services → HA 95 → Configure.** Themes you untick are removed from `/config/themes/ha95/`; the themes are reloaded right away. Reload the browser afterwards (**Ctrl+F5**).

### Updating

HACS → **Update**, restart Home Assistant, reload the browser with **Ctrl+F5**. The integration copies the new theme files and gives its scripts a new version number, so browsers and the companion app load them fresh. If the companion app still looks old, reset its frontend cache (Android: **Settings → Companion app → Troubleshooting**, iOS: **App Configuration → Debugging**).

### Upgrading from 3.x

Version 4.0 replaces the theme with an integration. Do this once:

1. HACS → HomeAssistant95 → ⋮ → **Remove**, then add the repo again as type **Integration** (see above).
2. Delete the files and entries you set up by hand, otherwise everything loads twice: the folder `/config/www/ha95/`, the dashboard resources `/local/ha95/…` and the `/local/ha95/…` lines under `frontend: extra_module_url:` in `configuration.yaml`. Keep `/config/www/ha95-startmenu.json` (your menu).
3. Set up the integration as above and reload the browser with **Ctrl+F5**.

Theme names stay the same, so profiles and dashboards that use `HA 95` keep working.

## What the theme does on its own

- Gray 3D windows with square corners on a teal desktop, navy title bar at the top.
- Win95 colors for switches (white track, gray thumb), sliders, input fields and tables.
- Climate and humidifier entities in the 16-color palette: heat red, cool blue, auto green, humidifier teal.
- Charts in the 16-color palette.

## Extras (optional)

Each extra works on its own. Pick what you like:

| Extra | What you get | Guide |
|---|---|---|
| **Window look** | Cards and dialogs as real Win95 windows with title bars, OK/Cancel buttons, checkboxes, trackbars, progress bars, tabs, message boxes and ApexCharts charts, and the search as the "Run" dialog. Needs [UIX](https://github.com/Lint-Free-Technology/uix). | [Window look](docs/window-look.md) |
| **Start menu** | Sidebar as a Start menu: "HomeAssistant95" banner, colorful icons, flyout menus with submenus, "Run …", the "It's now safe to turn off" screen after a restart, the hourglass pointer, and how to build your own menu. | [Start menu](docs/start-menu.md) |
| **Date/Time** | The "Date/Time Properties" window with month calendar, analog clock and your calendar events: as a dashboard card and on double-click on the Start menu clock. | [Date/Time](docs/date-time.md) |
| **Pixel icons** | 537 icons in Win95 pixel style (`ha95:`), optionally replacing all MDI icons automatically. | [Pixel icons](docs/pixel-icons.md) |
| **Fine-tuning** | Windows scroll bars, tab cards and title bars on the settings pages and tools, logbook, history, dropdown lists, dimmer slider. A small optional module for what the theme cannot reach on its own. | [Fine-tuning](docs/panels.md) |
| **Pixel font & pointer** | The "Pixelated MS Sans Serif" font and the classic arrow pointer. | [below](#pixel-font--mouse-pointer) |

### Pixel font & mouse pointer

Switch on **Pixel font, mouse cursor, scrollbars** in the integration (on by default).

The "Pixelated MS Sans Serif" font comes from [98.css](https://github.com/jdan/98.css) (MIT) and is loaded from jsDelivr. With UIX 8.4.0 or later the theme loads the font itself, so it also shows up on the settings pages. `ha95.css` is then only needed for the mouse pointer.

## Test dashboard

[examples/test-dashboard/ha95-test.yaml](examples/test-dashboard/ha95-test.yaml) is a dashboard with one card of every kind (entities, tiles with features, thermostat, gauge, markdown with notes, history, calendar, forms, stacks, masonry view …). After a Home Assistant update, click through its tabs once in light and dark mode to see at a glance whether everything still looks right.

## Uninstall

See [Uninstall](docs/uninstall.md).

## License

MIT. Windows is a trademark of Microsoft Corporation. This project is a homage and is not affiliated with Microsoft.
