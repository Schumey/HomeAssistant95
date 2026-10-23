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
| Other dialogs | Confirmations ("Really delete?"), editors and settings dialogs are Win95 windows too: title bar at the top, OK/Cancel as Win95 buttons (75×23), the main button with a black frame, a dotted focus frame. |
| Search ("Run") | The Home Assistant search (key `e`, Ctrl+K or the magnifier) looks like the Win95 "Run" dialog: title bar "Run", program icon with an explanation, a sunken input field, the sections as buttons (the selected one pressed in) and a white list. The [Start menu](start-menu.md) can open it with `{ "action": "run" }`. |
| Messages | Messages at the bottom ("Connection lost", "Deleted") are gray Win95 windows with the info icon. Notes in cards and dialogs (`ha-alert`) get an etched frame and the Win95 icons for info, warning, error and success. |
| Top bar of dashboards and settings | Win95 title bar (36 px, bold title), the buttons as small square 3D buttons of equal size (24×22). The view tabs are tabs like in a properties dialog: gray and raised, the active one taller and merging with the edge below. |
| Settings page | Icons as square 3D tiles like in the Control Panel. |
| Media control card | Media Player Classic look: black sunken video area with title and cover, Win95 seek bar and a gray toolbar with square 3D buttons. |
| Thermostat, humidifier and light card | Ring made of blocks like a Win95 progress bar, with square ends, solid colors and a square handle; + and − as square 3D buttons. |
| Sliders in tiles and dialogs | Brightness, position, volume and number sliders (in tile features and in the detail dialog) are Win95 progress bars: a sunken white field with blocks in the selection color. While dragging, the value shows in a yellow tooltip. |
| Switches in entities cards | Win95 checkboxes: a sunken white box with a pixel check mark. The header toggle sits in its own row below the title bar. |
| Sliders in entities cards | Win95 trackbars: a sunken white groove and a raised gray handle. |
| ApexCharts cards | [apexcharts-card](https://github.com/RomRider/apexcharts-card) gets the same title bar as other cards, the chart sits in a sunken white field, axes and legend use the pixel font, grid lines are solid gray and the tooltip is a yellow Win95 tooltip with a black frame. Also works with card-mod. |
| Dropdowns, date and time fields | Win95 dialog controls: the label on the left, a white sunken box next to it. Dropdowns get a 3D ▼ button. |
| Pixel font | With UIX 8.4.0 or later the theme loads the font itself (`uix-fonts`), so it also shows up on the settings pages. |

## Still on card-mod?

[card-mod](https://github.com/thomasloven/lovelace-card-mod) 4.2.1 is no longer maintained. Since HA 2026.8 it stops styling completely as soon as a theme contains `card-mod-…-yaml` keys. This theme therefore gives card-mod only the basic look (title bars of cards, pressed effect, top bar with tabs, the 3D buttons in dialogs, trackbars). Everything else is in `uix-…-yaml` keys, which only UIX reads. Switching to UIX is recommended.

> UIX and card-mod rely on frontend internals. Check that everything still looks right after Home Assistant updates.
