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

With card-mod (see below) the thermostat and humidifier cards also get a gray ring and square 3D + and − buttons.

## Extras (optional)

### Pixel font & mouse pointer

1. Copy `www/ha95/ha95.css` to `/config/www/ha95/`.
2. **Settings → Dashboards → ⋮ → Resources** → `/local/ha95/ha95.css`, type **Stylesheet**.

The "Pixelated MS Sans Serif" font comes from [98.css](https://github.com/jdan/98.css) (MIT) and is loaded from jsDelivr.

### Window look with card-mod

With [card-mod](https://github.com/thomasloven/lovelace-card-mod) (HACS), cards with a title become windows with a title bar and _ □ × buttons, and cards look pressed in when clicked. Without card-mod this part is ignored.

Also load card-mod as a frontend module. Otherwise the styles only apply in dashboards, not to the sidebar on other pages:

```yaml
frontend:
  extra_module_url:
    - /hacsfiles/lovelace-card-mod/card-mod.js
```

> card-mod relies on frontend internals. Check that everything still looks right after Home Assistant updates. The title bar in more-info dialogs may no longer apply in newer HA versions (2026.10+), because HA rebuilt those dialogs.

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
