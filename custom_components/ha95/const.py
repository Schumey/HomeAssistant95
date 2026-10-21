"""Konstanten der Integration HA 95."""

DOMAIN = "ha95"
URL_BASE = "/ha95"

CONF_THEMES = "themes"
CONF_CSS = "css"
CONF_STARTMENU = "startmenu"
CONF_ICONS = "icons"
CONF_PANELS = "panels"
CONF_CLOCK = "clock"

# Werte der Auswahl "Pixel-Icons" (siehe docs/pixel-icons.md)
ICONS_OFF = "off"
ICONS_ADD = "add"
ICONS_REPLACE = "replace"
ICONS_PIXELATE = "pixelate"
ICONS_BOTH = "both"
ICONS_QUERY = {
    ICONS_ADD: "",
    ICONS_REPLACE: "replace&",
    ICONS_PIXELATE: "pixelate&",
    ICONS_BOTH: "replace&pixelate&",
}

# Modul-Schalter -> Datei in www/
MODULES = {
    CONF_CSS: "ha95-css.js",
    CONF_STARTMENU: "ha95-startmenu.js",
    CONF_PANELS: "ha95-panels.js",
    CONF_CLOCK: "ha95-clock.js",
}

DEFAULT_OPTIONS = {
    CONF_CSS: True,
    CONF_STARTMENU: True,
    CONF_ICONS: ICONS_ADD,
    CONF_PANELS: True,
    CONF_CLOCK: True,
}
