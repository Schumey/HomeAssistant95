# Feinschliff-Modul (`ha95-panels.js`)

Optional. Ohne das Modul funktioniert das Design weiter, an einigen Stellen bleibt es aber unfertig. Das Modul deckt ab, was das Design allein nicht erreicht, weil Home Assistant diese Teile tief in Bauteilen versteckt.

## Was es macht

| Wo | Was du bekommst |
|---|---|
| **Überall** | Windows-Scrollleisten: 16 px breit mit Pfeilknöpfen, gerastertem Schacht und erhabenem Schieber. Sie folgen jedem Farbschema. |
| **Einstellungsseiten** | Titelleiste über der Reiterzeile mit dem Namen der Seitenkachel (z. B. „Geräte & Dienste“), Reiter als echte Registerkarten (die aktive ist höher), Suchfeld, Kontrollkästchen statt Schalter, kleine eckige Symbolknöpfe. |
| **Werkzeuge** | Titelleiste mit den Reitern darunter, Trennlinien zwischen den Entitäten auf der Seite „Zustände“, die Auswahlliste der Seite „Aktionen“ als Win95-Auswahlfeld. |
| **Logbuch und Verlauf** | Hinweisfeld mit Rahmen, Kontrollkästchen, eckige Symbole in der Zeitleiste, eckige Pfeilknöpfe beim Zeitraum. |
| **Dialoge** | Dimmer-Regler als waagerechter Balken, Zahlen-Regler (Helfer) als Trackbar. |

## Installation

1. `www/ha95/ha95-panels.js` nach `/config/www/ha95/` kopieren.
2. Entweder die Zeile in der `configuration.yaml` unter `frontend: extra_module_url:` eintragen und Home Assistant neu starten:
   ```yaml
   frontend:
     extra_module_url:
       - /local/ha95/ha95-panels.js?v=3.14.0
   ```
   oder als Ressource unter **Einstellungen → Dashboards → ⋮ → Ressourcen** eintragen (`/local/ha95/ha95-panels.js?v=3.14.0`, Typ **JavaScript-Modul**). Die Nummer nach `?v=` bei jedem Update ändern, sonst behalten Browser und Companion-App die alte Datei bis zu 31 Tage.

## So funktioniert es

Das Modul hängt ein Stylesheet an jeden Shadow-Root von Home Assistant, auch an später entstehende, und legt Regeln für einzelne Bauteile an, sobald sie entstehen. Es benutzt keinen `MutationObserver`; die Logbuch-Regeln laufen in einem ruhigen 0,8-Sekunden-Takt, der nur läuft, solange das Logbuch offen ist. Das Modul ändert nur das Aussehen, nie die Funktion. Ändert ein Home-Assistant-Update das Innere eines Bauteils, verliert die betroffene Regel einfach ihre Wirkung.

Deinstallieren: Zeile oder Ressource entfernen und `ha95-panels.js` löschen.
