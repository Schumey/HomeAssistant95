# Color schemes

🇬🇧 **English** · 🇩🇪 [Deutsch](color-schemes.de.md) · [← back to the README](../README.md)

## Dark mode

There are two ways to get a dark look:

| Theme | Behavior |
|---|---|
| **HA 95 Dark** | Always dark: dark gray windows, dark teal desktop, navy title bars. |
| **HA 95 Auto** | Switches by itself: light like HA 95, dark like HA 95 Dark. It follows **Profile → Theme → Mode** (Auto, Light, Dark), and with "Auto" the setting of your operating system. |
| **HA 95 Kontrast** | "High Contrast Black": black and white with bright colors, for maximum contrast. |

## Climate & humidifier colors

Climate and humidifier entities use the 16-color palette: heat red, cool blue, auto green, humidifier teal. This covers the thermostat card ring, icons, tiles and history. The colors are the variables `ha95-heat`, `ha95-cool`, `ha95-auto`, `ha95-heat-cool`, `ha95-dry`, `ha95-fan` and `ha95-humid` and can be changed per variant.

## Your own color scheme

Every color goes through the `ha95-*` variables at the top of `themes/ha95.yaml`. To make your own scheme:

1. Copy a variant at the end of the file (e.g. `HA 95 Rose`).
2. Give it a new name, also in `card-mod-theme`.
3. Change only the `ha95-*` values and the `rgb-*` lines (the same colors as comma-separated numbers).

| Variable | Used for |
|---|---|
| `ha95-desktop` | Dashboard background |
| `ha95-face` | Windows, cards, buttons |
| `ha95-highlight`, `ha95-light` | Light 3D edges (outer, inner) |
| `ha95-shadow`, `ha95-dark` | Dark 3D edges (inner, outer) |
| `ha95-text`, `ha95-text-dim`, `ha95-disabled` | Text |
| `ha95-window`, `ha95-window-text` | Input fields, lists |
| `ha95-title`, `ha95-title-bar`, `ha95-title-text` | Title bars (`ha95-title-bar` may be a gradient) |
| `ha95-select`, `ha95-select-text` | Selected items |
| `ha95-active` | Icons in the "on" state |
| `ha95-heat` … `ha95-humid` | Climate and humidifier |
| `ha95-banner` | Banner in the [Start menu](start-menu.md) (may be a gradient) |

Your copy is overwritten when HACS updates the theme. Keep your own scheme in a separate file in `/config/themes/` instead, with the variant name and all keys of `HA 95` (YAML anchors only work within one file).
