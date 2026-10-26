# Changelog

🇬🇧 **English** · 🇩🇪 [Deutsch](CHANGELOG.de.md)

All notable changes to this project. Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning follows [SemVer](https://semver.org/).

## [4.10.3] – 2026-10-26

### Fixed
- **Taskbar:** on the phone (Companion app) the page could no longer be scrolled while the taskbar was on. The fixed page height now only applies in wide windows and for iframe/add-on panels; elsewhere the page just gets room at the bottom.
- **Menu button:** on dashboards it is no longer stretched to the height of the title bar but as tall as the buttons on the right (22 px).
- **Add-on pages** (e.g. MyDietAssistant): the header bar now has the title bar look and a 24×22 menu button instead of the large unstyled one (UIX type `app`).
- **Select field** (e.g. Profile → Theme): the clear "x" no longer sits under the arrow button.

## [4.10.2] – 2026-10-25

### Fixed
- **Taskbar:** while the narrow sidebar was open, the taskbar was covered and could not be clicked (HACS and the other entries did nothing). The sidebar now ends above the taskbar, and clicks on the bar still reach it.
- **Taskbar:** the Start button did nothing in narrow windows; it now opens the sidebar there too.
- **Taskbar:** buttons that float over the page (e.g. "Create automation") sit above the taskbar instead of behind it.
- **Menu button:** on pages such as Profile the menu button was larger than the title bar buttons; it is now the same size (24×22).
- **Select field** (e.g. Profile → Theme): the arrow button no longer covers the clear "x".

## [4.10.1] – 2026-10-25

### Fixed
- **Taskbar:** panels shown in an iframe (e.g. add-on panels) were only about 150 px tall while the taskbar was on; the page now has a fixed height, so they fill the window again.

## [4.10.0] – 2026-10-25

### Added
- **Start menu: "Check for updates"** (`{ "action": "check-updates" }`): checks for updates everywhere at once. Every update entity (Core, apps, system, HACS, devices) asks again, the Supervisor reloads its sources, and a message tells how many updates are available. The example menu has it under Tools. See [Start menu](docs/start-menu.md).

- **Start menu update:** the integration's options (Settings → Devices & services → HA 95 → Configure) have a new switch that adds entries missing from your `ha95-startmenu.json` (taken from the example menu, like "Check for updates") next to a neighbouring entry you already have. Nothing else changes, a backup is saved first. See [Start menu](docs/start-menu.md#adding-new-entries-after-an-update).

### Fixed
- **Sidebar:** the menu button at the top left was 48 px and stuck out of the 36 px header; it is now 28 px.

## [4.9.1] – 2026-10-25

### Fixed
- **Taskbar:** Start menu flyouts (Tools, File Editor …) no longer cover the taskbar; they end above it.

## [4.9.0] – 2026-10-24

### Added
- **Taskbar** (`ha95-taskbar.js`, new option, off by default): a Win95 taskbar at the bottom with the Start button (opens the sidebar), quick launch icons, buttons for the pages you visited and for the open detail dialog, and a tray with entity icons, the notification bell and the clock. Configured under `taskbar` in the Start menu file. See [Taskbar](docs/taskbar.md).

## [4.8.3] – 2026-10-24

### Fixed
- **Media card:** the seek bar is centered: it now spans the full width of the black video area instead of ending 12 px short on the right.

## [4.8.2] – 2026-10-24

### Fixed
- **Desktop card:** icons are 48 px again, and the white icons fill their square (they were drawn at half size).
- **Media card:** the black video area ran 6 px past the right edge of the card; it now has the same margin on the right as on the left.

## [4.8.1] – 2026-10-24

### Changed
- **Desktop card:** bigger icons (64 px) and the desktop color as the card background, so the white labels stay readable inside the window. Selecting a white icon now tints only the icon instead of the whole square.

## [4.8.0] – 2026-10-24

### Added
- **Desktop card** (`ha95-desktop.js`, new option, on by default): `custom:ha95-desktop-card` shows big icons with labels like on the Windows 95 desktop, directly on the desktop background. Click selects, double-click (tap on touch screens) opens a dashboard, URL, entity or action. Colorful icons come from the Start menu module. See [Desktop card](docs/desktop.md).

## [4.7.0] – 2026-10-24

### Added
- **New start menu icon `diet-assistant`** (red apple with leaf) as a logo for MyDietAssistant. Use it with `mdi:food-apple`, `mdi:nutrition` or `diet-assistant`.

## [4.6.2] – 2026-10-24

### Fixed
- **Solitaire:** moves from the waste pile or between columns often did nothing, because a click whose mouse moved slightly between press and release was lost. Clicks now work reliably, and cards (with the cards on top of them) can also be dragged with the mouse or finger.

## [4.6.1] – 2026-10-24

### Fixed
- Start menu: with a mouse, clicking an entry such as "Tools" closed the menu again that hovering had just opened, so the menu seemed not to work. A mouse click now only opens it; touch still toggles.

## [4.6.0] – 2026-10-24

### Added
- **Energy cards in Win95 look:** the distribution card shows PV, gas, home and battery as raised 3D boxes with the name inside, on a sunken white area, with right-angled solid connection lines. The date selection of the energy cards is a toolbar with a sunken date field and equally sized buttons (needs UIX).
- Test dashboard: new "Energy" view with all energy cards.

## [4.5.0] – 2026-10-24

### Added
- **Media player card in Media Player Classic style:** black sunken "video area" with device, title and cover (with some margin), below it a Win95 seek bar and a gray toolbar with square 3D buttons for previous, play/pause, next, more info and browse media. Works with the theme alone (card-mod or UIX).

### Fixed
- Dialogs that bring their own menu button (e.g. "Media sources"): the ⋮ button is now toolbar size instead of 48 px, the close button sits in the title bar. Needs UIX.

## [4.4.0] – 2026-10-23

### Added
- **Solitaire** (`ha95-solitaire.js`, new option, on by default): Klondike in a Win95 window, draw one or three cards, double-click to an ace pile, undo, wins and best time. Open it with the Start menu action `solitaire`, see [Solitaire](docs/solitaire.md). The default Start menu has it under "Games" (only for newly created menu files).

## [4.3.0] – 2026-10-22

### Added
- **Screensaver** (`ha95-screensaver.js`, new option in the integration, off by default): after some idle time a star field, flying pixel houses or growing 3D pipes, with an optional clock and entity states. Any input ends it. Settings under `screensaver` in the Start menu file, see [Screensaver](docs/screensaver.md).
- **Minesweeper** (`ha95-minesweeper.js`, new option, on by default) in a Win95 window with three levels, flags (right click or press and hold), chording and best times. Open it with the Start menu action `minesweeper`, see [Minesweeper](docs/minesweeper.md).
- **Two color schemes:** HA 95 Regenwald (moss green) and HA 95 Patriot (red, white and blue).
- **Blue screen** when the connection to Home Assistant is gone for more than 20 seconds (`"bsod": true` in the Start menu file, off by default). Goes away by itself. The Start menu action `bsod` previews it.
- **Sounds** (`"sounds": true`, off by default): small self-made tones for menus, notifications, restart, blue screen and Minesweeper.
- The default Start menu has a "Games" entry with Minesweeper and the screensaver (only for newly created menu files).
- Timeflow card: the ring counter is now a Win95 progress bar made of blue blocks (needs the fine-tuning module).

## [4.2.0] – 2026-10-22

### Added
- **Task Manager look for Settings → System → Hardware:** the value (CPU, memory) sits in a sunken white field on the right, the graph on a black sunken background with a green grid and green line, like the Windows Task Manager performance tab. Needs [UIX](https://github.com/Lint-Free-Technology/uix).

## [4.1.3] – 2026-10-22

### Added
- **Apps in the tools menu:** the example start menu (and the default menu the integration creates) now has an "Apps" entry (`/config/apps`) below "Helpers".

## [4.1.2] – 2026-10-22

### Fixed
- **Dialog close buttons:** dialogs that bring their own header (for example "Add to dashboard") use the slots `navigationIcon` and `actionItems`. The global rules did not know them, so the close button stayed 48 px and sat crooked in the title bar. It is now 16 × 16 like everywhere else, header toolbar buttons are 24 × 22.

## [4.1.1] – 2026-10-21

### Added
- **Icon** for the integration (`custom_components/ha95/brand/`), shown in Settings → Devices & services and in HACS.

## [4.1.0] – 2026-10-21

### Added
- **Start menu:** if `/config/www/ha95-startmenu.json` does not exist, the integration now copies the example menu there. An existing file is never overwritten. If `/config/www/` was missing, restart Home Assistant once so `/local/` works.

## [4.0.1] – 2026-10-21

### Fixed
- **Start menu:** if `/local/ha95-startmenu.json` could not be loaded once (for example a 404 during a restart), the menus stayed empty until the page was reloaded ("Menu … is missing"). A failed load is no longer remembered, and the next click tries again.

## [4.0.0] – 2026-10-21

### Changed (breaking)
- **HA 95 is now an integration instead of a theme.** Install it from HACS as type *Integration* and add it under **Settings → Devices & services**. It copies the themes you pick to `/config/themes/ha95/` and loads the extras (pixel font and cursor, start menu, pixel icons, fine-tuning module, clock card) by itself: no files to copy, no dashboard resources, no `extra_module_url` lines, and the scripts get a new version number with every update.
- **Choose themes and extras** in the setup and later under **HA 95 → Configure**: any of the 13 themes, each extra on or off, and the pixel icons as *Off / Add only / Replace / Pixelate / Replace and pixelate*.
- The repo contains one file per theme in `custom_components/ha95/themes/` instead of `themes/ha95.yaml`; the modules moved from `www/ha95/` to `custom_components/ha95/www/`. Theme names are unchanged.
- **Upgrading from 3.x:** remove the old HACS entry, add the repo again as type *Integration*, delete `/config/www/ha95/`, the `/local/ha95/…` dashboard resources and `extra_module_url` lines. See the README, "Upgrading from 3.x".

### Added
- Demo GIF in the README (themes, start menu, window look, forms, alerts, clock card, charts) and a demo dashboard with made-up names in `examples/demo-dashboard/`.

### Fixed
- **Light card:** the icon in the middle of the round dimmer no longer has a frame.

## [3.14.4] – 2026-10-21

### Fixed
- **Dialogs with their own header buttons** (e.g. "Edit card"): the close button is a 16 × 16 square and the help button 24 × 22, now set by the panels module so it works in every dialog.
- **Automation editor:** space between the ⋮ menu and the frame of the row.

## [3.14.3] – 2026-10-21

### Fixed
- **Automation editor:** the drag handle and the ⋮ menu of every row are vertically centred instead of sitting at the top; more space between the expand button and the row icon.
- **Automation editor:** entity chips in the rows (e.g. "Door") are a sunken Win95 field with square corners.

## [3.14.2] – 2026-10-21

### Fixed
- **Detail dialog (more-info):** the back arrow on sub pages (e.g. a group member) is a small 16 × 16 button in the title bar instead of a 48 px button with a light frame sticking out of the bar.
- **Dialogs with their own header buttons** (e.g. "Edit card"): the close button is a small square in the title bar, the help button in the toolbar a 24 × 22 button.
- **Edit mode of a dashboard:** "Done" is as high as the icon buttons next to it (22 px).
- **Pick fields with a label** (profile "Theme", "Secondary info attribute" in the card editor): a white sunken field 40 px high with a small 3D arrow button and a small × without a frame of its own, instead of a 56 px field with a tall gray strip and a large clear button.
- **Tile switch** (on/off feature of a tile, e.g. lights): raised Win95 frame, sunken when on; the thumb shows the light color when on.
- **Automation editor:** "Traces" and the menu are as high as the other header buttons, the expand buttons of the rows are small 3D buttons (16 × 16) next to the icon instead of 28 px boxes covering it, disabled buttons (Undo/Redo) show an engraved gray icon instead of vanishing.

### Added
- README: section "Updating" (reload themes, raise `?v=`, reload the browser, reset the app cache).

## [3.14.1] – 2026-10-21

### Fixed
- The close button (×) of every dialog is now a square 16 × 16 button, also in dialogs without a theme rule of their own (e.g. resources). The rule lives in `ha95-panels.js`, on the button itself.
- The counter in the sidebar (notifications) is centred in its box.

## [3.14.0] – 2026-10-21

Settings pages, dialogs, scroll bars and a lot of fine-tuning.

### Added
- **Fine-tuning module** `www/ha95/ha95-panels.js` (optional, see [Fine-tuning](docs/panels.md)) for what the theme cannot reach on its own: Windows scroll bars everywhere (arrow buttons, dithered channel, raised thumb), and rules for single components (search field, check boxes, icon buttons, tab cards, pick lists, logbook).
- **Sections as windows:** a section of a sections view with a heading is a Win95 window, the heading is its title bar with _ □ ×. Sections without a heading are not framed, cards that already have a title (history, lists) stay windows on their own. Further headings in the same section (areas on the lights page) become group labels with an etched line; the on/off button in a heading is a Win95 button.
- **Settings pages:** a title bar above the tab row with the name of the page tile ("Devices & services", "Automations & scenes" …), tabs as real tab cards (the active one is taller), search field, check boxes instead of switches, small square icon buttons. Tools: title bar with the tabs underneath, back arrow and menu in the tab row, separators between the entities on the "States" page, the "Actions" pick list as a Win95 drop-down with a framed list.
- **Dialogs:** dimmer slider as a horizontal bar, on/off switch as a horizontal rocker, number slider (helpers) as a trackbar, timer and counter buttons as Win95 buttons, pixel font for state and time, the duration field as a white sunken field, the restart dialog with square icons and pixel font, "Run" with a close button.
- **Notifications:** the drawer is a window with a raised frame, a title bar with the gradient and a square × button.
- **Logbook and History:** framed info box, check boxes, square icons in the timeline, square arrow buttons and a sunken field for the time range, "Sources" as a button.
- **Buttons everywhere:** `ha-button` as a gray 3D button (new variables `ha-button-*`, `wa-color-brand-*`, `ha-assist-chip-container-shape`), the history link on chart cards as a small chart button.
- **Timeflow card** (`custom:timeflow-card`) in the tile look.
- Pixel logo of Home Assistant for the update row (`ha95-icon-ha`).
- Start menu: pixel font in the entries and their sub texts.
- Tiles: no tinted square behind the icon when the entity is off.

### Changed
- All × buttons are square (16 × 16 px) now: title bars of cards, dialogs, the "Run" window and the notifications. The title buttons image (`ha95-title-buttons`) is 16 px high.
- Heading cards: content centered vertically in the title bar.

### Fixed
- Icon buttons sat too low in their frame (back arrow, help button, ⋮ menu): the line height made the button taller than the frame.
- Chips (filter, sources, time range) had a rounded gray layer behind the square button.
- Date/Time: the highlight edge ran as a white line right under the group headings, and the up button of the year and time fields looked pressed all the time (the rotated button turned its 3D edges around).

## [3.13.0] – 2026-10-20

Charts and headings.

### Added
- ApexCharts cards ([apexcharts-card](https://github.com/RomRider/apexcharts-card)): title as a Win95 title bar with _ □ ×, the chart in a sunken white field, pixel font for axes, legend and tooltips, solid gray grid lines, and a yellow Win95 tooltip with a black frame. Works with card-mod and UIX. See [Window look](docs/window-look.md).
- New variable `ha95-desktop-text` for text that sits directly on the desktop (white, black in HA 3.11).

### Fixed
- Heading cards stand on the desktop without a window, their title and subtitle were dark on teal. They now use `ha95-desktop-text`.

## [3.12.0] – 2026-10-20

Fixes for phones and the companion app, and the Windows 95 clock.

### Added
- "Date/Time Properties" (`www/ha95/ha95-clock.js`): the Windows 95 window with month calendar, analog clock with teal hands and second hand, digital time and a "Time Zone" tab. Days with events from Home Assistant calendars are bold, clicking a day lists its events. As a dashboard card `custom:ha95-clock-card` (options `title`, `calendars`) and in the Start menu: double-clicking the clock in the sidebar title opens it (tap on touch screens), options `clock` and `clock_calendars`, menu entry `{ "action": "clock" }`. See [Date/Time](docs/date-time.md).
- Test dashboard: "Date/Time" card.

### Fixed
- Start menu on touch screens: tapping an item with a flyout menu (e.g. "Tools") opened the menu and closed it again right away, because the browser sends a fake mouse hover before the tap. Hovering now only counts for a real mouse, a tap opens the menu and a second tap closes it.
- Start menu on narrow screens: menus that do not fit to the right of the sidebar move left into view. A submenu then opens to the left of its parent menu or, if there is no room there either, slightly indented below its item.
- Detail dialogs on phones (bottom sheet): the Win95 title bar and toolbar were missing, the white title stood on gray. The drag handle now sits above the title bar instead of covering the title. This also applies to other dialogs that open as a bottom sheet.

### Changed
- Setup guides: load the modules and `ha95.css` with a version, e.g. `/local/ha95/ha95-startmenu.js?v=3.12.0`. Home Assistant lets browsers and the companion app keep files from `/local/` for 31 days, so after an update the app often still ran the old start menu (no banner, no colorful icons, no ▶ arrow). The guides also explain how to reset the app's frontend cache.

## [3.11.0] – 2026-10-19

"Home Assistant for Workgroups": named after Windows for Workgroups 3.11.

### Added
- New theme **HA 3.11** in the Windows 3.1 look: white workspace and windows, flat frames with thin black lines, centered title, the system menu box on the left of the title bar and ▼ ▲ on the right. Plus the Windows 3.1 color schemes **HA 3.11 Hot Dog Stand**, **HA 3.11 Arizona**, **HA 3.11 Ozean** and **HA 3.11 Schwarze Lederjacke** (colors recreated).
- New variables for the window style, usable in any scheme: `ha95-card` (card background), `ha95-frame`, `ha95-frame-pressed`, `ha95-frame-width`, `ha95-title-buttons`, `ha95-title-buttons-width`, `ha95-title-menu`, `ha95-title-menu-width`, `ha95-title-align`, and the symbols `ha95-icon-info`, `-warning`, `-error`, `-success`, `-run`.
- UIX: all dialogs as Win95 windows (new UIX type `dialog`): title bar, OK/Cancel as Win95 buttons (75×23) with a black frame on the main button and a dotted focus frame.
- UIX: the search (key `e`, Ctrl+K, magnifier) as the Win95 "Run" dialog with title bar, program icon, explanation, a sunken input field, the sections as buttons and a white list.
- Start menu: `{ "action": "run" }` opens "Run …". The example menus have the entry.
- Start menu: after "Restart …" the black "It's now safe to turn off Home Assistant." screen appears and disappears by itself once Home Assistant is back.
- Start menu: hourglass pointer while Home Assistant is busy (a request taking longer than 0.3 s, no connection, changing pages). Option `busy_cursor`.
- View tabs as tabs of a properties dialog: gray and raised, the active one taller and merging with the edge below (card-mod and UIX).
- UIX: sliders in tile features and in the detail dialog (brightness, position, volume, numbers) as Win95 progress bars with blocks, the value in a yellow tooltip while dragging.
- UIX: the rings of the thermostat, humidifier and light cards made of blocks.
- UIX: messages at the bottom (`ha-toast`) as gray Win95 windows with the info icon; notes (`ha-alert`) in cards, dialogs and detail dialogs with an etched frame and the Win95 icons for info, warning, error and success.
- Colorful Start menu icons for `console`, `dock-left`, `hacs`, `key`, `math-log`, `menu` and `view-grid` (11 more MDI names point to them). Icons with any prefix (e.g. `hacs:hacs`) are now recognized.
- Test dashboard [examples/test-dashboard/ha95-test.yaml](examples/test-dashboard/ha95-test.yaml) with one card of every kind, for checking the look after Home Assistant updates.

### Changed
- `themes/ha95.yaml` is now generated from building blocks, so rules that card-mod and UIX (or the thermostat and humidifier) share only exist once in the source. The theme looks the same.
- The more-info toolbar takes no space when a dialog has no buttons.

### Fixed
- Start menu: if the sidebar keeps changing many times a second for several seconds (a loop), the module stops redrawing banner and icons and writes a warning to the console, instead of freezing the whole interface. The menus keep working.

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
