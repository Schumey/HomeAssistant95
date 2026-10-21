# Date/Time Properties

🇬🇧 **English** · 🇩🇪 [Deutsch](date-time.de.md) · [← back to the README](../README.md)

The Windows 95 "Date/Time Properties" window: a month calendar, the analog clock with teal hands and a running second hand, the digital time, and a "Time Zone" tab with the world map. Days with events from your Home Assistant calendars are bold; click a day to see its events.

It is display only. Home Assistant cannot set the system clock, so OK and Cancel just close the window. Month and year can be browsed (arrow keys move through the days). The time follows the time zone setting of your profile (server or browser).

There are two ways to use it, both from `www/ha95/ha95-clock.js`:

| Where | How |
|---|---|
| [Dashboard card](#dashboard-card) | `type: custom:ha95-clock-card` |
| [Start menu clock](#start-menu-clock) | Double-click the clock at the top of the sidebar, like the taskbar clock in Windows 95 |

## Dashboard card

1. Copy `www/ha95/ha95-clock.js` to `/config/www/ha95/`.
2. **Settings → Dashboards → ⋮ → Resources** → `/local/ha95/ha95-clock.js?v=3.14.3`, type **JavaScript module**. Change the number after `?v=` with every update.
3. Add a card:
   ```yaml
   type: custom:ha95-clock-card
   title: Date/Time
   calendars:
     - calendar.family
     - calendar.holidays
   ```

| Option | Meaning |
|---|---|
| `title` | Optional title bar of the card. Without it the card shows only the tabs. |
| `calendars` | Optional list of calendar entities. Their events make days bold and show up below the calendar. `calendar: calendar.x` works for a single one. |

Below about 400 px width the calendar and the clock are stacked.

## Start menu clock

Needs the [start menu module](start-menu.md#2-start-menu-module) and the "Start" title with a clock from the [Custom Sidebar example](start-menu.md#1-sidebar-look-custom-sidebar).

1. Copy `www/ha95/ha95-clock.js` to `/config/www/ha95/`, next to `ha95-startmenu.js`. The start menu loads it by itself the first time you double-click; no resource entry is needed.
2. Double-click the title with the clock (on touch screens a single tap is enough).

Options in `/config/www/ha95-startmenu.json`:

```json
{
  "clock": true,
  "clock_calendars": ["calendar.family"],
  "menus": { }
}
```

| Option | Meaning |
|---|---|
| `clock` | `false` turns the double-click off. |
| `clock_calendars` | Calendar entities whose events the window shows. |

A menu entry can open the window too: `{ "name": "Date/Time", "icon": "mdi:clock", "action": "clock" }`.

From your own code (e.g. a Custom Sidebar `javascript` action), once the module is loaded: `window.ha95ShowDateTime({ calendars: ["calendar.family"] })`.
