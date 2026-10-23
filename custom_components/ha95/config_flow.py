"""Einrichtung und Optionen: welche Themes und Module laufen."""
from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult, OptionsFlow
from homeassistant.core import callback
from homeassistant.helpers.selector import (
    BooleanSelector,
    SelectOptionDict,
    SelectSelector,
    SelectSelectorConfig,
    SelectSelectorMode,
)

from . import theme_names
from .const import (
    CONF_CLOCK,
    CONF_CSS,
    CONF_ICONS,
    CONF_MINESWEEPER,
    CONF_PANELS,
    CONF_SCREENSAVER,
    CONF_SOLITAIRE,
    CONF_STARTMENU,
    CONF_THEMES,
    DEFAULT_OPTIONS,
    DOMAIN,
    ICONS_ADD,
    ICONS_BOTH,
    ICONS_OFF,
    ICONS_PIXELATE,
    ICONS_REPLACE,
)


async def _schema(hass, current: dict[str, Any]) -> vol.Schema:
    names = await hass.async_add_executor_job(theme_names)
    values = {**DEFAULT_OPTIONS, CONF_THEMES: list(names), **current}
    return vol.Schema(
        {
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
        }
    )


class HA95ConfigFlow(ConfigFlow, domain=DOMAIN):
    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")
        if user_input is not None:
            return self.async_create_entry(title="HA 95", data={}, options=user_input)
        return self.async_show_form(step_id="user", data_schema=await _schema(self.hass, {}))

    @staticmethod
    @callback
    def async_get_options_flow(config_entry) -> OptionsFlow:
        return HA95OptionsFlow()


class HA95OptionsFlow(OptionsFlow):
    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        if user_input is not None:
            return self.async_create_entry(data=user_input)
        return self.async_show_form(
            step_id="init",
            data_schema=await _schema(self.hass, dict(self.config_entry.options)),
        )
