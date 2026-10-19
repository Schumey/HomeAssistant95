# Pixel icons

🇬🇧 **English** · 🇩🇪 [Deutsch](pixel-icons.de.md) · [← back to the README](../README.md)

`www/ha95/ha95-icons.js` adds an icon set in Win95 pixel style: 537 icons on a 24×24 grid, with an outline in full color and a fill at half opacity. They are colored by entity state like every other icon. The names follow MDI, so `mdi:lightbulb-on` becomes `ha95:lightbulb-on`. Unknown names show `ha95:help`.

## Setup

1. Copy `www/ha95/ha95-icons.js` to `/config/www/ha95/`.
2. In `configuration.yaml`:
   ```yaml
   frontend:
     extra_module_url:
       - /local/ha95/ha95-icons.js?v=3.11.1
   ```
   The `?v=3.11.1` makes browsers and the companion app load the new file after an update: Home Assistant lets them keep files from `/local/` for 31 days. Change the number with every update. If the app still shows the old version, clear its cache: **Settings → Companion app → Troubleshooting → Reset frontend cache** (Android) or **App Configuration → Debugging → Reset frontend cache** (iOS).
3. Restart Home Assistant and reload the page.
4. Use the icons anywhere you can pick an icon, for example `icon: ha95:thermostat`. The icon picker lists them when you type `ha95`.

Alternatively you can add the file as a dashboard resource (type **JavaScript module**), but then the icons only show up in dashboards, not in the sidebar.

## What's included

The 500 MDI icons Home Assistant uses most (the default icons of all core integrations and the icons of the user interface), apart from the brand logos `home-assistant` and `bluetooth`. Another 94 MDI names point to one of them, e.g. `lightbulb-outline`, `home-outline`, `roller-shade-closed` or `toggle-switch`. Type `ha95` in the icon picker to browse them all. Each icon is a readable text grid in the file, so you can edit or add your own.

## Automatic mode

Instead of changing every icon by hand, the file can do it for you. Add an option to the URL in `configuration.yaml`:

| URL | Effect |
|---|---|
| `/local/ha95/ha95-icons.js?replace` | Every `mdi:` icon that exists as `ha95:` is replaced automatically, including the default icons of your entities. |
| `/local/ha95/ha95-icons.js?pixelate` | Every other icon (all of MDI, including buttons and menus) is snapped to the 24×24 pixel grid. |
| `/local/ha95/ha95-icons.js?replace&pixelate` | Both: hand-drawn icons where available, pixelated MDI for the rest. |

Add the version with `&`, e.g. `/local/ha95/ha95-icons.js?replace&pixelate&v=3.11.1`.

Restart Home Assistant after changing the URL. Both modes hook into the frontend's icon components, so like UIX, check them after Home Assistant updates. Icons with their own `viewBox` (from other icon sets) are left alone.

## Colorful icons in the Start menu

The [Start menu module](start-menu.md#banner-and-colorful-icons) draws about 70 of these icons in color (black outline, colored fill, 3D shading) in the sidebar and in flyout menus.
