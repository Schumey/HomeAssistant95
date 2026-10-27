"""Einrichtung und Optionen: welche Themes und Module laufen."""
from __future__ import annotations

from pathlib import Path
from typing import Any

import voluptuous as vol

from homeassistant.components import persistent_notification
from homeassistant.config_entries import ConfigFlow, ConfigFlowResult, OptionsFlow
from homeassistant.core import callback
from homeassistant.helpers.selector import (
    BooleanSelector,
    SelectOptionDict,
    SelectSelector,
    SelectSelectorConfig,
    SelectSelectorMode,
)

from . import STARTMENU_DEFAULT, theme_names
from .startmenu_merge import update_file
from .const import (
    CONF_CLOCK,
    CONF_CSS,
    CONF_DESKTOP,
    CONF_ICONS,
    CONF_MINESWEEPER,
    CONF_PANELS,
    CONF_SCREENSAVER,
    CONF_SOLITAIRE,
    CONF_STARTMENU,
    CONF_TASKBAR,
    CONF_THEMES,
    CONF_UPDATE_STARTMENU,
    DEFAULT_OPTIONS,
    DOMAIN,
    ICONS_ADD,
    ICONS_BOTH,
    ICONS_OFF,
    ICONS_PIXELATE,
    ICONS_REPLACE,
)


async def _schema(hass, current: dict[str, Any], with_update: bool = False) -> vol.Schema:
    names = await hass.async_add_executor_job(theme_names)
    values = {**DEFAULT_OPTIONS, CONF_THEMES: list(names), **current}
    fields = {
            vol.Required(CONF_THEMES, default=values[CONF_THEMES]): SelectSelector(
                SelectSelectorConfig(
                    options=[SelectOptionDict(value=k, label=v) for k, v in names.items()],
                    multiple=True,
                    mode=SelectSelectorMode.LIST,
                )
            ),
            vol.Required(CONF_CSS, default=values[CONF_CSS]): BooleanSelector(),
            vol.Required(CONF_STARTMENU, default=values[CONF_STARTMENU]): BooleanSelector(),
            vol.Required(CONF_ICONS, default=values[CONF_ICONS]): SelectSelector(
                SelectSelectorConfig(
                    options=[ICONS_OFF, ICONS_ADD, ICONS_REPLACE, ICONS_PIXELATE, ICONS_BOTH],
                    translation_key="icons",
                    mode=SelectSelectorMode.DROPDOWN,
                )
            ),
            vol.Required(CONF_PANELS, default=values[CONF_PANELS]): BooleanSelector(),
            vol.Required(CONF_CLOCK, default=values[CONF_CLOCK]): BooleanSelector(),
            vol.Required(CONF_SCREENSAVER, default=values[CONF_SCREENSAVER]): BooleanSelector(),
            vol.Required(CONF_MINESWEEPER, default=values[CONF_MINESWEEPER]): BooleanSelector(),
            vol.Required(CONF_SOLITAIRE, default=values[CONF_SOLITAIRE]): BooleanSelector(),
            vol.Required(CONF_DESKTOP, default=values[CONF_DESKTOP]): BooleanSelector(),
            vol.Required(CONF_TASKBAR, default=values[CONF_TASKBAR]): BooleanSelector(),
        }
    if with_update:
        # Einmalig: gilt nur für dieses Speichern und wird nicht in den Optionen abgelegt
        fields[vol.Optional(CONF_UPDATE_STARTMENU, default=False)] = BooleanSelector()
    return vol.Schema(fields)


async def _update_startmenu(hass) -> None:
    """Fehlende Einträge des Beispielmenüs in die Startmenü-Datei einfügen und melden."""
    de = (hass.config.language or "en").startswith("de")
    target = Path(hass.config.path("www", "ha95-startmenu.json"))
    try:
        added, skipped = await hass.async_add_executor_job(
            update_file, target, STARTMENU_DEFAULT, "de" if de else "en"
        )
    except (OSError, ValueError) as err:  # kaputtes JSON, Datei nicht lesbar/schreibbar
        message = (
            f"Das Startmenü konnte nicht aktualisiert werden: {err}"
            if de
            else f"The Start menu could not be updated: {err}"
        )
    else:
        if added == ["*"]:
            message = "Die Startmenü-Datei fehlte und wurde neu angelegt." if de else "The Start menu file was missing and has been created."
        elif added:
            names = ", ".join(added)
            message = (
                f"Startmenü ergänzt: {names}. Die alte Datei liegt als Sicherung daneben (ha95-startmenu.json.bak-…). Seite neu laden (Strg+F5)."
                if de
                else f"Start menu updated: {names}. The old file is kept next to it as a backup (ha95-startmenu.json.bak-…). Reload the page (Ctrl+F5)."
            )
        else:
            message = "Das Startmenü hat schon alle Einträge des Beispielmenüs." if de else "The Start menu already has every entry of the example menu."
        if skipped:
            names = ", ".join(skipped)
            message += (
                f" Nicht untergebracht (kein Nachbareintrag gefunden): {names}."
                if de
                else f" Could not place (no neighbouring entry found): {names}."
            )
    persistent_notification.async_create(hass, message, title="HomeAssistant95", notification_id="ha95_startmenu")


class HA95ConfigFlow(ConfigFlow, domain=DOMAIN):
    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")
        if user_input is not None:
            return self.async_create_entry(title="HomeAssistant95", data={}, options=user_input)
        return self.async_show_form(step_id="user", data_schema=await _schema(self.hass, {}))

    @staticmethod
    @callback
    def async_get_options_flow(config_entry) -> OptionsFlow:
        return HA95OptionsFlow()


class HA95OptionsFlow(OptionsFlow):
    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        if user_input is not None:
            if user_input.pop(CONF_UPDATE_STARTMENU, False):
                await _update_startmenu(self.hass)
            return self.async_create_entry(data=user_input)
        return self.async_show_form(
            step_id="init",
            data_schema=await _schema(self.hass, dict(self.config_entry.options), with_update=True),
        )
