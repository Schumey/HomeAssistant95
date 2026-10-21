"""HA 95 – Windows-95-Design für Home Assistant.

Kopiert die gewählten Themes nach /config/themes/ha95/, stellt die Module
unter /ha95/ bereit und trägt sie als Frontend-Skripte ein. Ändern lässt sich
das unter Geräte & Dienste → HA 95 → Konfigurieren.
"""
from __future__ import annotations

import logging
import re
from pathlib import Path

from homeassistant.components.frontend import add_extra_js_url, remove_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.loader import async_get_integration

from .const import (
    CONF_ICONS,
    CONF_STARTMENU,
    CONF_THEMES,
    DEFAULT_OPTIONS,
    DOMAIN,
    ICONS_OFF,
    ICONS_QUERY,
    MODULES,
    URL_BASE,
)

_LOGGER = logging.getLogger(__name__)

HERE = Path(__file__).parent
THEMES_SRC = HERE / "themes"
WWW = HERE / "www"
STARTMENU_DEFAULT = HERE / "defaults" / "ha95-startmenu.json"
THEME_NAME = re.compile(r'^# HA 95 – Theme "(.*)"$', re.M)


def theme_names() -> dict[str, str]:
    """Dateiname ohne .yaml -> Name des Themes (steht in der Kopfzeile)."""
    names = {}
    for path in sorted(THEMES_SRC.glob("*.yaml")):
        match = THEME_NAME.search(path.read_text(encoding="utf-8")[:300])
        names[path.stem] = match.group(1) if match else path.stem
    return names


def _sync_themes(target: Path, selected: list[str]) -> None:
    """Gewählte Themes kopieren, abgewählte aus dem Zielordner entfernen."""
    target.mkdir(parents=True, exist_ok=True)
    for src in THEMES_SRC.glob("*.yaml"):
        dst = target / src.name
        if src.stem in selected:
            data = src.read_bytes()
            if not dst.exists() or dst.read_bytes() != data:
                dst.write_bytes(data)
        elif dst.exists():
            dst.unlink()


def _ensure_startmenu_config(target: Path) -> None:
    """Beispielmenü nach /config/www/ legen, falls dort noch keins liegt (nie überschreiben)."""
    if target.exists():
        return
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(STARTMENU_DEFAULT.read_bytes())
    _LOGGER.info(
        "Beispielmenü nach %s kopiert. Erscheint /local/ha95-startmenu.json erst nach "
        "einem Neustart von Home Assistant, war der Ordner www/ bisher nicht da.",
        target,
    )


def _module_urls(options: dict, version: str) -> list[str]:
    urls = []
    for key, name in MODULES.items():
        if options.get(key, DEFAULT_OPTIONS[key]):
            urls.append(f"{URL_BASE}/{name}?v={version}")
    icons = options.get(CONF_ICONS, DEFAULT_OPTIONS[CONF_ICONS])
    if icons != ICONS_OFF:
        urls.append(f"{URL_BASE}/ha95-icons.js?{ICONS_QUERY[icons]}v={version}")
    return urls


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    version = (await async_get_integration(hass, DOMAIN)).version
    store = hass.data.setdefault(DOMAIN, {})

    if not store.get("static"):
        await hass.http.async_register_static_paths(
            [StaticPathConfig(URL_BASE, str(WWW), True)]
        )
        store["static"] = True

    options = {**DEFAULT_OPTIONS, **entry.options}
    selected = options.get(CONF_THEMES)
    if selected is None:
        selected = list(await hass.async_add_executor_job(theme_names))
    await hass.async_add_executor_job(
        _sync_themes, Path(hass.config.path("themes", "ha95")), selected
    )
    if options.get(CONF_STARTMENU, DEFAULT_OPTIONS[CONF_STARTMENU]):
        await hass.async_add_executor_job(
            _ensure_startmenu_config, Path(hass.config.path("www", "ha95-startmenu.json"))
        )
    try:
        await hass.services.async_call("frontend", "reload_themes", blocking=True)
    except Exception:  # noqa: BLE001 - ohne themes: in der Konfiguration kein Drama
        _LOGGER.warning(
            "Designs konnten nicht neu geladen werden. Steht in der configuration.yaml "
            "'frontend: themes: !include_dir_merge_named themes'?"
        )

    urls = _module_urls(options, version)
    for url in urls:
        add_extra_js_url(hass, url)
    store[entry.entry_id] = urls

    entry.async_on_unload(entry.add_update_listener(_async_options_updated))
    return True


async def _async_options_updated(hass: HomeAssistant, entry: ConfigEntry) -> None:
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    for url in hass.data[DOMAIN].pop(entry.entry_id, []):
        remove_extra_js_url(hass, url)
    return True
