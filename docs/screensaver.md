# Screensaver

🇬🇧 **English** · 🇩🇪 [Deutsch](screensaver.de.md)

A screensaver for wall tablets: after some time without input the screen turns black and shows one of three classics. Any touch, click or key press ends it. It also keeps the display from burning in.

Switch on **Screensaver** in the integration (**HomeAssistant95 → Configure**, off by default).

| Motif | Looks like |
|---|---|
| `stars` | Flight through a star field. |
| `logos` | Pixel houses in window colors flying across the screen. |
| `pipes` | Growing 3D pipes in all colors, as in the classic. When the screen is full, it starts over. |
| `random` | A random motif each time. |

## Settings

Everything is optional and lives in `/config/www/ha95-startmenu.json`, next to the Start menu:

```json
{
  "screensaver": {
    "minutes": 10,
    "mode": "random",
    "clock": true,
    "entities": ["sensor.living_room_temperature"]
  }
}
```

| Option | Effect |
|---|---|
| `minutes` | Idle time in minutes. `0` never starts it by itself. Default `10`. |
| `mode` | `stars`, `logos`, `pipes` or `random` (default). |
| `clock` | Shows the time and date at the bottom right. Default `true`. |
| `entities` | Entities whose state is shown under the clock. |

## Start it by hand

- Start menu: `{ "name": "Screensaver", "action": "screensaver" }` (the default menu has it under "Games").
- From your own code: `window.ha95Screensaver.start("pipes")`.
