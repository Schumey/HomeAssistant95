# Fine-tuning module (`ha95-panels.js`)

Optional. Without it the theme still works, but a few places stay unfinished. The module covers what the theme cannot reach on its own, because Home Assistant hides those parts deep inside components.

## What it does

| Where | What you get |
|---|---|
| **Everywhere** | Windows scroll bars: 16 px wide with arrow buttons, a dithered channel and a raised thumb. They follow every color scheme. |
| **Settings pages** | Title bar above the tab row with the name of the page tile (e.g. "Devices & services"), tabs as real tab cards (the active one is taller), search field, check boxes instead of switches, small square icon buttons. |
| **Tools** | Title bar with the tabs underneath, separators between the entities on the "States" page, the pick list of the "Actions" page as a Win95 drop-down. |
| **Logbook and History** | Info box with a frame, check boxes, square icons in the timeline, square arrow buttons for the time range. |
| **Dialogs** | Dimmer slider as a horizontal bar, number slider (helpers) as a trackbar. |

## Installation

On by default. Switch it under **Settings → Devices & services → HA 95 → Configure** (**Finishing touches**). Reload the page afterwards (**Ctrl+F5**).

## How it works

The module attaches a stylesheet to every shadow root of Home Assistant, including the ones created later, and adds rules for individual components when they are created. It uses no `MutationObserver`; the logbook rules run in a slow 0.8 s cycle that only runs while the logbook is open. It changes only the look, never the function. If a Home Assistant update changes the inside of a component, the affected rule simply stops having an effect.

Switching it off: untick **Finishing touches** in the integration.
