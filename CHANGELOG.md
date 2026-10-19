# Changelog

🇬🇧 **English** · 🇩🇪 [Deutsch](CHANGELOG.de.md)

All notable changes to this project. Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning follows [SemVer](https://semver.org/).

## [3.10.0] – 2026-10-19

### Added
- New themes **HA 95 Dark** (dark mode) and **HA 95 Auto**, which switches between HA 95 and HA 95 Dark with the light/dark mode of the profile or the operating system.
- Start menu: `ha95-startmenu.js` now draws the vertical "HomeAssistant**95**" banner (variable `ha95-banner`, a blue gradient in HA 98) and colorful Win95 icons in the sidebar and the flyout menus: about 70 icons with a black outline, colored fill and 3D shading, plus 57 MDI names that point to them. Options `banner`, `banner_text` and `color_icons` in `ha95-startmenu.json`.
- UIX: detail dialogs (more-info) as Win95 windows: title bar "Name - Area" with a small × button on the right, a toolbar below with the buttons as square 3D buttons.
- UIX: cards that draw their title themselves (e.g. markdown) get a title bar too.
- Docs: a step-by-step guide for building your own Start menu ([docs/start-menu.md](docs/start-menu.md)). The README is now a short overview; details are in `docs/` (window look, Start menu, pixel icons, color schemes, uninstall), in English and German.

### Changed
- Top bar buttons all have the same size (24×22) and a 2 px gap, including the "+" button with its dropdown; the same on settings pages.
- Cards stay square even when a dashboard sets rounded corners with card-mod.
- Custom Sidebar example: the old CSS banner is gone (it no longer worked in HA 2026.10), the banner comes from `ha95-startmenu.js`.

### Fixed
- UIX: the + and − buttons of the thermostat and humidifier cards are square 3D buttons again (HA 2026.10 uses a different button there).

## [3.9.0] – 2026-10-18

### Added
- UIX: the top bar of dashboards and settings pages as a Win95 title bar: 36 px high (`header-height`), title bar color or gradient (HA 98), bold title, small square gray 3D buttons without round hover circles. card-mod gets the basic look via `card-mod-root` and `card-mod-top-app-bar-fixed`.
- UIX: the icons on the settings page as square 3D tiles, like in the Win95 Control Panel.
- UIX 8.4.0+: the theme loads the pixel font itself (`uix-fonts`), so it also shows up on settings pages and other non-dashboard pages.
- README: uninstall instructions.

### Changed
- Custom Sidebar example: "Start" title and clock sized for the lower title bar.

## [3.8.0] – 2026-10-18

### Added
- Pixel icons: 537 icons (was 89). The set now covers the 500 MDI icons Home Assistant uses most, ranked by how often they appear in the `icons.json` of all core integrations and in the frontend. That includes buttons and menus (`plus`, `pencil`, `dots-vertical`, `chevron-*`, `arrow-*`, …), energy (`solar-power`, `transmission-tower`, `ev-station`, `meter-electric`, …), climate (`hvac`, `air-conditioner`, `fan-speed-1` to `-3`, `heat-wave`, …), water, network, media, time and many `-off`, `-alert`, `-check` and `-clock` variants. In automatic mode (`?replace`) they replace the MDI icons, so far fewer icons are left to the pixel filter.
- 94 MDI aliases (was 72).

### Not included
- Brand logos (`home-assistant`, `bluetooth`, `bluetooth-off`, `bluetooth-connect`, `zigbee`, `google-circles-communities`) are not redrawn. In automatic mode the pixel filter (`?pixelate`) still snaps them to the grid.

## [3.7.0] – 2026-10-18

### Added
- Start menu with submenus: `www/ha95/ha95-startmenu.js` opens Win95 flyout menus to the right of sidebar items that carry `data-ha95-menu` (set via Custom Sidebar `attributes`). Menus come from `/config/www/ha95-startmenu.json` and can open pages, open files directly in the File editor, restart Home Assistant after a Win95-style confirmation, open URLs and nest further submenus. Works with the sidebar expanded and as a drawer on narrow screens.
- Example menu `examples/startmenu/ha95-startmenu.json` ("Tools": File Editor with frequently used files, automations, scripts, scenes, helpers, developer tools, devices & services, entities, logs, restart) and a matching item in the Custom Sidebar example.

## [3.6.0] – 2026-10-18

### Changed
- UIX: dropdowns in entities cards now look like a Win95 combobox: label on the left (aligned with the other rows), a single-line white sunken box in the right half and a 3D ▼ button at the edge. Fixes the previous rules, which no longer matched the dropdown markup in HA 2026.10.
- UIX: date and time fields in entities cards: label on the left, single-line white sunken boxes sized to their content, calendar button as a 3D button, no "hh"/"mm" labels.

## [3.5.0] – 2026-10-18

### Added
- Pixel icons, automatic mode: `ha95-icons.js?replace` replaces every `mdi:` icon that has a `ha95:` counterpart, including the default entity icons. `ha95-icons.js?pixelate` snaps all other icons to the 24×24 pixel grid. Both can be combined.
- 32 more pixel icons (89 in total), mainly for Home Assistant's default icons: `lightbulb-off`, `fan-off`, `toggle-switch-variant` and `-off` (as Win95 checkboxes), battery levels `battery-10` to `battery-90`, `battery-charging`, `battery-alert`, `eye`, `shield`, `leaf`, `garage`, `garage-open`, `music-note`, `play`, `pause`, `stop`, `volume-high`, `volume-medium`, `volume-mute`, `check-circle`, `alert-circle`, `weather-partly-cloudy`, `weather-snowy`, `weather-lightning`, `weather-fog`.
- 72 MDI aliases (was 14), e.g. `lightbulb-outline`, `home-outline`, `lock-open-variant`, `roller-shade-closed`, `window-shutter`, `blinds-horizontal`, `weather-pouring`, `white-balance-sunny`, `toggle-switch`.

### Changed
- `ha95-icons.js` is now a real JavaScript module (it reads its options from the URL). Load it via `extra_module_url` or as a resource of type **JavaScript module**, as described in the README.
- `battery-50` is now drawn like the other battery levels (solid lower half).
- `power-plug-off` has a gap around the slash, like the other "off" icons.

## [3.4.0] – 2026-10-18

### Added
- Pixel icon set `www/ha95/ha95-icons.js`: 57 icons in Win95 pixel style on a 24×24 grid (outline in full color, fill at half opacity), colored by entity state like other icons. Names follow MDI (`mdi:fan` → `ha95:fan`), some more MDI names map to an existing icon, unknown names show `ha95:help`. Load it through `extra_module_url`; see the README section "Pixel icons".
- The Custom Sidebar example uses the `ha95:` icons. Without the icon file, replace `ha95:` with `mdi:`.

### Note
- These files were already included in the 3.3.1 release by mistake, without a changelog entry. 3.4.0 is the proper release for them.

## [3.3.1] – 2026-10-18

### Fixed
- Entities cards with a header toggle: the toggle now sits on its own line below the title bar, aligned with the row checkboxes, instead of inside the title bar.
- Custom Sidebar example: no more round hover circle behind the menu button (`sidebar_button_background_hover_opacity: 0`).

## [3.3.0] – 2026-10-18

### Added
- Sliders in entities cards as Win95 trackbars: sunken white groove, raised gray handle (card-mod and UIX). `ha-slider-*` colors set globally.
- UIX: input fields, dropdowns, date and time fields in entities cards as white sunken boxes, dropdown arrow as a 3D button.
- UIX: Win95-style thermostat and humidifier ring with square ends, solid colors and a square handle.
- Input fields are white everywhere (`ha-color-form-background`).

### Fixed
- The header toggle in an entities card title bar no longer sits right against the _ □ × buttons.

## [3.2.1] – 2026-10-18

### Fixed
- card-mod styling stopped working completely since 3.1.0 (no title bars, no thermostat buttons, no checkboxes). Cause: card-mod 4.2.1 hangs on HA 2026.8+ as soon as a theme contains `card-mod-…-yaml` keys. The basic look is back in `card-mod-card`. Everything that needs `-yaml` now lives in `uix-card-yaml` and `uix-row-yaml`, which only [UIX](https://github.com/Lint-Free-Technology/uix) reads.

### Changed
- UIX (UI eXtension) is now the recommended styling add-on. card-mod still gets the basic look.
- The thermostat and humidifier slider track is darker even without UIX.

## [3.2.0] – 2026-10-18

### Added
- Switches: Win95 colors for the current `ha-switch` (white track, gray thumb, navy when on) through the `ha-switch-*` variables.
- card-mod: switches in entities cards (rows and the header toggle) become Win95 checkboxes with a pixel check mark.

## [3.1.0] – 2026-10-18

### Added
- Climate and humidifier colors from the 16-color palette (`state-climate-*-color`, `state-humidifier-on-color`): heat red, cool blue, auto green, humidifier teal. Adjustable through the new variables `ha95-heat`, `ha95-cool`, `ha95-auto`, `ha95-heat-cool`, `ha95-dry`, `ha95-fan` and `ha95-humid`. "HA 95 Kontrast" uses bright versions.
- card-mod: the thermostat and humidifier cards get a gray ring and square 3D + and − buttons. The card no longer looks pressed in while you drag the slider.
- Example configuration for Custom Sidebar (`examples/custom-sidebar/`): the sidebar as a Start menu with a "Start" title, clock, 3D frame, vertical "HomeAssistant95" banner and extra info on items.
- Dialogs without rounded corners or blur, with a 3D frame.
- README and changelog in English (`README.md`, `CHANGELOG.md`). The German versions are now `README.de.md` and `CHANGELOG.de.md`.

### Changed
- The card-mod card styles now live in `card-mod-card-yaml` instead of `card-mod-card`, because card-mod reads only one of the two keys. If you added your own card CSS to the theme, move it into the `.` block.
- Instructions match the current HA UI wording.
- Added the recommendation to also load card-mod through `extra_module_url`.

## [3.0.0] – 2026-10-18

### Changed (breaking)
- "Win95" is now "HA95" everywhere. The CSS variables `win95-*` are now `ha95-*`. Custom color schemes and custom card-mod CSS that use these variables need to be updated.
- The extras now live in `www/ha95/ha95.css` instead of `www/win95/win95.css`. Change the dashboard resource to `/local/ha95/ha95.css`.

## [2.0.0] – 2026-10-18

### Changed (breaking)
- All themes renamed: "Windows 95" → "HA 95", "Windows 98" → "HA 98", "Windows 95 Rose/Spruce/Desert/Kontrast" → "HA 95 Rose/Spruce/Desert/Kontrast". After updating, select the theme again in your profile (and in dashboards that set a theme).
- Theme file renamed: `themes/windows95.yaml` → `themes/ha95.yaml`. For manual installs, delete the old file.

## [1.1.1] – 2026-10-18

### Changed
- HACS now lists the package as "HomeAssistant95" (previously "Windows 95"). The theme names stay the same.

## [1.1.0] – 2026-10-18

### Added
- Five more themes: "Windows 98" (gradient title bars), "Windows 95 Rose", "Windows 95 Spruce", "Windows 95 Desert" and "Windows 95 Kontrast" (dark).
- `www/win95/win95.css` as a dashboard resource: "Pixelated MS Sans Serif" pixel font, Win95 mouse pointer, gray scrollbars, selection color.
- card-mod: card titles as window title bars with _ □ × buttons, title bar in more-info dialogs, sidebar with a 3D frame.
- Explicit `rgb-*` values so semi-transparent highlights match the color scheme.

### Changed
- All colors now go through `win95-*` variables, so custom color schemes take only a few lines.

## [1.0.0] – 2026-10-18

### Added
- Theme "Windows 95": teal desktop, gray 3D cards, navy header, Start-menu-style sidebar, square corners, white input fields, 16-color palette for charts.
- Optional card-mod part: navy title bars for card titles, pressed-in click effect.
