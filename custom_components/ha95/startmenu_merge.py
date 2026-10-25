"""Neue Einträge des Beispielmenüs in die Startmenü-Datei des Nutzers einfügen.

Die Integration überschreibt /config/www/ha95-startmenu.json nie. Kommen mit
einer neuen Version Einträge dazu (z. B. "Nach Updates suchen"), fügt diese
Funktion nur die fehlenden ein: neben einen Nachbareintrag, den es in der
Datei schon gibt. Alles andere bleibt. Vorher entsteht eine Sicherung.
"""
from __future__ import annotations

import copy
import json
import shutil
from datetime import datetime
from pathlib import Path

KEYS = ("action", "path", "file", "url")

# Namen für Einträge, die es im Beispielmenü nur englisch gibt
NAMES = {
    "action:check-updates": {"de": "Nach Updates suchen"},
}


def _key(item: dict) -> str | None:
    for k in KEYS:
        if item.get(k):
            return f"{k}:{item[k]}"
    return None


def _lists(items: list):
    """Alle Listen eines Menübaums (die Liste selbst und alle Untermenüs)."""
    yield items
    for item in items:
        if isinstance(item.get("items"), list):
            yield from _lists(item["items"])


def _all_keys(menus: dict) -> set[str]:
    keys = set()
    for items in menus.values():
        for lst in _lists(items):
            keys.update(k for i in lst if (k := _key(i)))
    return keys


def _locate(menus: dict, key: str):
    for items in menus.values():
        for lst in _lists(items):
            for idx, item in enumerate(lst):
                if _key(item) == key:
                    return lst, idx
    return None


def merge(user: dict, default: dict, lang: str) -> tuple[list[str], list[str]]:
    """Fügt fehlende Einträge von default in user ein. Gibt (eingefügt, nicht untergebracht) zurück."""
    user_menus = user.setdefault("menus", {})
    added: list[str] = []
    skipped: list[str] = []
    for items in default.get("menus", {}).values():
        for lst in _lists(items):
            for idx, entry in enumerate(lst):
                key = _key(entry)
                if not key or key in _all_keys(user_menus):
                    continue
                spot = None
                for before in range(idx - 1, -1, -1):  # erst nach dem Vorgänger ...
                    k = _key(lst[before])
                    if k and (found := _locate(user_menus, k)):
                        spot = (found[0], found[1] + 1)
                        break
                if spot is None:
                    for after in range(idx + 1, len(lst)):  # ... sonst vor dem Nachfolger
                        k = _key(lst[after])
                        if k and (found := _locate(user_menus, k)):
                            spot = (found[0], found[1])
                            break
                name = entry.get("name", key)
                if spot is None:
                    skipped.append(name)
                    continue
                new = copy.deepcopy(entry)
                new["name"] = NAMES.get(key, {}).get(lang, new.get("name", key))
                spot[0].insert(spot[1], new)
                added.append(new["name"])
    return added, skipped


def update_file(target: Path, default_file: Path, lang: str) -> tuple[list[str], list[str]]:
    """Gibt (eingefügt, nicht untergebracht) zurück. Legt die Datei an, falls sie fehlt."""
    if not target.exists():
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(default_file, target)
        return ["*"], []
    user = json.loads(target.read_text(encoding="utf-8"))
    default = json.loads(default_file.read_text(encoding="utf-8"))
    added, skipped = merge(user, default, lang)
    if added:
        stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
        shutil.copyfile(target, target.with_name(f"{target.name}.bak-{stamp}"))
        target.write_text(json.dumps(user, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return added, skipped
