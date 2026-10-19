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
| **HA 95 Kontrast** | "High Contrast Black" |
| **HA 95 Dark** | Dark mode: dark gray windows, dark teal desktop |
| **HA 95 Auto** | Switches between HA 95 and HA 95 Dark with the light/dark mode |

More about dark mode and your own colors: [Color schemes](docs/color-schemes.md).

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

## What the theme does on its own

- Gray 3D windows with square corners on a teal desktop, navy title bar at the top.
- Win95 colors for switches (white track, gray thumb), sliders, input fields and tables.
- Climate and humidifier entities in the 16-color palette: heat red, cool blue, auto green, humidifier teal.
- Charts in the 16-color palette.

## Extras (optional)

Each extra works on its own. Pick what you like:

| Extra | What you get | Guide |
|---|---|---|
| **Window look** | Cards and dialogs as real Win95 windows with title bars, toolbars, checkboxes, trackbars and 3D buttons. Needs [UIX](https://github.com/Lint-Free-Technology/uix). | [Window look](docs/window-look.md) |
| **Start menu** | Sidebar as a Start menu: "HomeAssistant95" banner, colorful icons, flyout menus with submenus, and how to build your own menu. | [Start menu](docs/start-menu.md) |
| **Pixel icons** | 537 icons in Win95 pixel style (`ha95:`), optionally replacing all MDI icons automatically. | [Pixel icons](docs/pixel-icons.md) |
| **Pixel font & pointer** | The "Pixelated MS Sans Serif" font and the classic arrow pointer. | [below](#pixel-font--mouse-pointer) |

### Pixel font & mouse pointer

1. Copy `www/ha95/ha95.css` to `/config/www/ha95/`.
2. **Settings → Dashboards → ⋮ → Resources** → `/local/ha95/ha95.css`, type **Stylesheet**.

The "Pixelated MS Sans Serif" font comes from [98.css](https://github.com/jdan/98.css) (MIT) and is loaded from jsDelivr. With UIX 8.4.0 or later the theme loads the font itself, so it also shows up on the settings pages. `ha95.css` is then only needed for the mouse pointer.

## Uninstall

See [Uninstall](docs/uninstall.md).

## License

MIT. Windows is a trademark of Microsoft Corporation. This project is a homage and is not affiliated with Microsoft.
