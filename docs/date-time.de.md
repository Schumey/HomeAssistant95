# Eigenschaften von Datum/Uhrzeit

🇬🇧 [English](date-time.md) · 🇩🇪 **Deutsch** · [← zurück zur README](../README.de.md)

Das Fenster „Eigenschaften von Datum/Uhrzeit“ aus Windows 95: Monatskalender, die Analoguhr mit türkisen Zeigern und laufendem Sekundenzeiger, die Digitalanzeige und die Registerkarte „Zeitzone“ mit der Weltkarte. Tage mit Terminen aus deinen Home-Assistant-Kalendern sind fett, ein Klick auf einen Tag zeigt seine Termine.

Es ist nur eine Anzeige. Home Assistant kann die Systemzeit nicht stellen, OK und Abbrechen schließen nur das Fenster. Monat und Jahr lassen sich durchblättern (Pfeiltasten wandern durch die Tage). Die Uhrzeit folgt der Zeitzonen-Einstellung im Profil (Server oder Browser).

Es gibt zwei Wege, beide aus `www/ha95/ha95-clock.js`:

| Wo | Wie |
|---|---|
| [Dashboard-Karte](#dashboard-karte) | `type: custom:ha95-clock-card` |
| [Uhr im Startmenü](#uhr-im-startmenü) | Doppelklick auf die Uhr oben in der Seitenleiste, wie auf die Uhr der Taskleiste in Windows 95 |

## Dashboard-Karte

1. `www/ha95/ha95-clock.js` nach `/config/www/ha95/` kopieren.
2. **Einstellungen → Dashboards → ⋮ → Ressourcen** → `/local/ha95/ha95-clock.js?v=3.14.4`, Typ **JavaScript-Modul**. Die Zahl nach `?v=` bei jedem Update ändern.
3. Karte anlegen:
   ```yaml
   type: custom:ha95-clock-card
   title: Datum/Uhrzeit
   calendars:
     - calendar.familie
     - calendar.feiertage
   ```

| Option | Bedeutung |
|---|---|
| `title` | Optionale Titelleiste der Karte. Ohne sie zeigt die Karte nur die Registerkarten. |
| `calendars` | Optionale Liste von Kalender-Entitäten. Ihre Termine machen Tage fett und erscheinen unter dem Kalender. Für einen einzelnen geht auch `calendar: calendar.x`. |

Unter etwa 400 px Breite stehen Kalender und Uhr untereinander.

## Uhr im Startmenü

Braucht das [Startmenü-Modul](start-menu.de.md#2-startmenü-modul) und den „Start“-Titel mit Uhr aus dem [Custom-Sidebar-Beispiel](start-menu.de.md#1-seitenleisten-look-custom-sidebar).

1. `www/ha95/ha95-clock.js` nach `/config/www/ha95/` kopieren, neben `ha95-startmenu.js`. Das Startmenü lädt es beim ersten Doppelklick selbst nach, ein Eintrag unter Ressourcen ist nicht nötig.
2. Doppelt auf den Titel mit der Uhr klicken (auf Touch-Bildschirmen reicht einmal Tippen).

Optionen in `/config/www/ha95-startmenu.json`:

```json
{
  "clock": true,
  "clock_calendars": ["calendar.familie"],
  "menus": { }
}
```

| Option | Bedeutung |
|---|---|
| `clock` | `false` schaltet den Doppelklick ab. |
| `clock_calendars` | Kalender-Entitäten, deren Termine das Fenster zeigt. |

Auch ein Menüeintrag kann das Fenster öffnen: `{ "name": "Datum/Uhrzeit", "icon": "mdi:clock", "action": "clock" }`.

Aus eigenem Code (z. B. einer `javascript`-Aktion in Custom Sidebar), sobald das Modul geladen ist: `window.ha95ShowDateTime({ calendars: ["calendar.familie"] })`.
