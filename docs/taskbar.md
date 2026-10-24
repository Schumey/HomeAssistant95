# Taskbar

🇬🇧 **English** · 🇩🇪 [Deutsch](taskbar.de.md)

A Win95 taskbar along the bottom edge: the **Start** button, quick launch icons, buttons for the pages you visited and the open detail dialog, and a tray with entity icons, notifications and the clock. The sidebar stays what it is, the Start menu. The taskbar sits in addition.

Switch on **Taskbar** in the integration (off by default), reload the page. The bar needs no configuration; the extras go under `taskbar` in `/config/www/ha95-startmenu.json` (the same file as the Start menu):

```json
{
  "taskbar": {
    "quicklaunch": [
      { "name": "Settings", "icon": "mdi:cog", "navigation_path": "/config" }
    ],
    "tray": [
      { "entity": "climate.living_room", "icon": "mdi:thermostat" },
      { "entity": "alarm_control_panel.home", "navigation_path": "/lovelace/security" }
    ],
    "pages": 6
  }
}
```

| What | Behavior |
|---|---|
| **Start** | Opens and closes the sidebar (on a phone the drawer). |
| **Quick launch** | One icon per entry, a click runs it. |
| **Pages** | Every page you open gets a button, named after the dashboard and the view. The current one is pressed. A click switches to the page, right-click removes it. Kept for the browser session. |
| **Dialog** | While a detail dialog is open, its entity gets a pressed button. A click closes the dialog. |
| **Tray** | Entity icons (dimmed when `off`, `unavailable` or `unknown`, with the state as a tooltip), the bell with the number of notifications (a click opens the list) and the clock (double-click or tap opens "Date/Time Properties", needs the Date/Time module). |

| Option | Meaning |
|---|---|
| `quicklaunch`, `tray` | Entries with `name`, `icon`, `entity` (supplies name, icon and state), `navigation_path` or `url_path`. An entry with only `entity` opens "More info". |
| `pages` | Number of page buttons (default 6, `0` for none). |
| `dialogs`, `notifications`, `clock` | `false` hides the dialog button, the bell or the clock (default: shown). |
| `start` | Label of the Start button (default "Start"). |

Icons are colorful when the Start menu module knows them. The colors follow the color scheme. The page gets 28 px of space at the bottom and the sidebar ends above the bar; the bar sits below dialogs.
