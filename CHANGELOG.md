# Changelog

🇬🇧 **English** · 🇩🇪 [Deutsch](CHANGELOG.de.md)

All notable changes to this project. Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning follows [SemVer](https://semver.org/).

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
