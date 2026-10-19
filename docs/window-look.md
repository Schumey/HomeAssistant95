# Window look with UIX

🇬🇧 **English** · 🇩🇪 [Deutsch](window-look.de.md) · [← back to the README](../README.md)

The theme alone sets colors, fonts and square corners. For real Win95 windows it needs [UIX – UI eXtension](https://github.com/Lint-Free-Technology/uix) (HACS), which lets a theme style the inside of cards and dialogs. Without UIX this part is simply ignored.

## Setup

1. Install UIX from HACS.
2. Add it under **Settings → Devices & services** (it is an integration).
3. If you still have card-mod installed, remove it first, including any `extra_module_url` entry for it.
4. Reload the page.

## What changes

| Where | Look |
|---|---|
| Cards with a title | Window with a title bar and _ □ × buttons, also for cards that draw their own title (e.g. markdown). Cards look pressed in when clicked. Rounded corners set by a dashboard are made square. |
| Detail dialogs (more-info) | Win95 window: title bar "Name - Area" with a small × button on the right, below it a toolbar with the buttons (history, settings, ⋮) as square 3D buttons. |
| Top bar of dashboards and settings | Win95 title bar (36 px, bold title), the buttons as small square 3D buttons of equal size (24×22). |
| Settings page | Icons as square 3D tiles like in the Control Panel. |
| Thermostat and humidifier | Ring with square ends, solid colors and a square handle; + and − as square 3D buttons. |
| Switches in entities cards | Win95 checkboxes: a sunken white box with a pixel check mark. The header toggle sits in its own row below the title bar. |
| Sliders | Win95 trackbars: a sunken white groove and a raised gray handle. |
| Dropdowns, date and time fields | Win95 dialog controls: the label on the left, a white sunken box next to it. Dropdowns get a 3D ▼ button. |
| Pixel font | With UIX 8.4.0 or later the theme loads the font itself (`uix-fonts`), so it also shows up on the settings pages. |

## Still on card-mod?

[card-mod](https://github.com/thomasloven/lovelace-card-mod) 4.2.1 is no longer maintained. Since HA 2026.8 it stops styling completely as soon as a theme contains `card-mod-…-yaml` keys. This theme therefore gives card-mod only the basic look (title bars of cards, pressed effect, top bar, the 3D buttons in dialogs, trackbars). Everything else is in `uix-…-yaml` keys, which only UIX reads. Switching to UIX is recommended.

> UIX and card-mod rely on frontend internals. Check that everything still looks right after Home Assistant updates.
