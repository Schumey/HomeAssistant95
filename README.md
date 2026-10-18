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

Sliders (e.g. for `input_number`) become Win95 trackbars: a sunken white groove and a raised gray handle. This works with card-mod and UIX. With UIX, input fields, dropdowns, date and time fields in entities cards also become white sunken boxes; the dropdown arrow becomes a 3D button. Outside dashboards, fields are at least white.

## Extras (optional)

### Pixel font & mouse pointer

1. Copy `www/ha95/ha95.css` to `/config/www/ha95/`.
2. **Settings → Dashboards → ⋮ → Resources** → `/local/ha95/ha95.css`, type **Stylesheet**.

The "Pixelated MS Sans Serif" font comes from [98.css](https://github.com/jdan/98.css) (MIT) and is loaded from jsDelivr.

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

All colors come from the `ha95-*` variables, so the sidebar follows the selected theme.

## Your own color scheme

Every color goes through the `ha95-*` variables at the top of the file. Copy a variant, give it a new name (also in `card-mod-theme`) and change only those values and the `rgb-*` lines.

## License

MIT. Windows is a trademark of Microsoft Corporation. This project is a homage and is not affiliated with Microsoft.
