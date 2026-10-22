# Color schemes

🇬🇧 **English** · 🇩🇪 [Deutsch](color-schemes.de.md) · [← back to the README](../README.md)

## Dark mode

There are two ways to get a dark look:

| Theme | Behavior |
|---|---|
| **HA 95 Dark** | Always dark: dark gray windows, dark teal desktop, navy title bars. |
| **HA 95 Auto** | Switches by itself: light like HA 95, dark like HA 95 Dark. It follows **Profile → Theme → Mode** (Auto, Light, Dark), and with "Auto" the setting of your operating system. |
| **HA 95 Regenwald** | Moss green windows on a deep green desktop, green title bars. |
| **HA 95 Patriot** | Red, white and blue: navy title bars, red selection, white-gray windows. |
| **HA 95 Kontrast** | "High Contrast Black": black and white with bright colors, for maximum contrast. |

## Windows 3.1 look (HA 3.11)

**HA 3.11** is named after Windows for Workgroups 3.11, the predecessor of Windows 95: white workspace and windows, flat window frames with thin black lines, a centered title, the system menu box on the left of the title bar and the ▼ ▲ buttons on the right. The famous Windows 3.1 color schemes come along as variants (colors recreated):

| Theme | Colors |
|---|---|
| **HA 3.11** | White workspace, navy title bars |
| **HA 3.11 Hot Dog Stand** | Red and yellow, legendary and hideous |
| **HA 3.11 Arizona** | Sand and turquoise |
| **HA 3.11 Ozean** | Blue on blue ("Ocean") |
| **HA 3.11 Schwarze Lederjacke** | Black and gray ("Black Leather Jacket") |

Buttons in cards and dialogs stay 3D, like in Windows 3.1. Window frames, title bar buttons and the card color come from the variables in the second table below, so you can also build a Win95 scheme with flat frames or a 3.11 scheme with Win95 buttons.

## Climate & humidifier colors

Climate and humidifier entities use the 16-color palette: heat red, cool blue, auto green, humidifier teal. This covers the thermostat card ring, icons, tiles and history. The colors are the variables `ha95-heat`, `ha95-cool`, `ha95-auto`, `ha95-heat-cool`, `ha95-dry`, `ha95-fan` and `ha95-humid` and can be changed per variant.

## Your own color scheme

Every color goes through the `ha95-*` variables at the top of each theme file in `/config/themes/ha95/` (copy a theme to `/config/themes/` under a new name, so the integration does not overwrite it). To make your own scheme:

1. Copy the file of a variant (e.g. `/config/themes/ha95/ha-95-rose.yaml`) to `/config/themes/my-scheme.yaml`.
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
| `ha95-card` | Card background (window contents), `ha95-face` by default |

Window style (used by HA 3.11):

| Variable | Used for |
|---|---|
| `ha95-frame`, `ha95-frame-pressed` | Frame of cards and dialogs, and of a clicked card (a `box-shadow`, 3D by default) |
| `ha95-frame-width` | Gap between the title bar and the card edge (3px, 4px for the thicker 3.11 frame) |
| `ha95-title-buttons`, `ha95-title-buttons-width` | Image of the title bar buttons on the right and its width (_ □ × or ▼ ▲) |
| `ha95-title-menu`, `ha95-title-menu-width` | Image on the left of the title bar (system menu box in 3.11, otherwise `none`) |
| `ha95-title-align` | `left` or `center` |
| `ha95-icon-info` … `ha95-icon-success`, `ha95-icon-run` | Symbols in messages, notes and the "Run" dialog |

The integration overwrites the files in `/config/themes/ha95/` on every start. Keep your own scheme in a separate file directly in `/config/themes/` instead: copy a theme file from there, give the theme a new name and change only the `ha95-*` values.
