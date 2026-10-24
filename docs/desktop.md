# Desktop card

🇬🇧 **English** · 🇩🇪 [Deutsch](desktop.de.md)

Big icons with labels like on the Windows 95 desktop: "My Computer", "Recycle Bin" and so on. They sit directly on the desktop background, without a window. A click selects an icon, a double-click opens it. On touch screens one tap opens it.

Switch on **Desktop card** in the integration (on by default), then add the card to a dashboard:

```yaml
type: custom:ha95-desktop-card
columns: 6            # optional, icons per row (default: as many as fit)
icons:
  - name: My Computer
    icon: mdi:desktop-classic
    navigation_path: /config
  - name: Living room
    entity: light.living_room        # name and icon come from the entity
    tap_action: { action: toggle }   # a double-click does this
  - name: Docs
    icon: mdi:book-open-variant
    url_path: https://www.home-assistant.io/docs/
```

| Option | Meaning |
|---|---|
| `name` | Label under the icon. Without it the entity's name is used. |
| `icon` | Icon name. If the Start menu module knows a colorful icon of that name (`mdi:cog`, `mdi:lightbulb` …), it is shown in color, otherwise as a white icon. |
| `entity` | Optional. Supplies name, icon and a tooltip with the state; without any action a double-click opens "more info". |
| `navigation_path`, `url_path` | Shortcuts for the two most common actions. |
| `tap_action` | `navigate`, `url`, `more-info`, `toggle`, `perform-action` or `none`. |
| `double_tap_action` | Optional, replaces `tap_action` for the double-click. |

The color follows the scheme: the label uses `ha95-desktop-text`, the selection `ha95-select`. Keyboard: Tab moves between the icons, Space selects, Enter opens.
