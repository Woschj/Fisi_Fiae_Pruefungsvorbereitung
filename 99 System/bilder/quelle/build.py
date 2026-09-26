# Erzeugt alle Schaubilder nach "99 System/bilder" und eine Galerie zur Sichtprüfung.
import os, sys, importlib
sys.path.insert(0, os.path.dirname(__file__))
ZIEL = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")  # = 99 System/bilder
os.makedirs(ZIEL, exist_ok=True)
alle = {}
for m in ["netzwerk", "hardware_software", "sicherheit_projekt", "uml_db"]:
    alle.update(importlib.import_module(m).BILDER)
nur = sys.argv[1:]
galerie = []
for name, fn in alle.items():
    if nur and name not in nur: continue
    svg = fn().svg()
    open(f"{ZIEL}/{name}.svg", "w", encoding="utf8").write(svg)
    import base64
    galerie.append(f"<h3 style='color:#aaa;font:14px system-ui'>{name}</h3><img style='max-width:100%' src='data:image/svg+xml;base64,{base64.b64encode(svg.encode()).decode()}'>")
html = "<!doctype html><meta charset=utf-8><body style='background:#1e1e1e;margin:20px'>" + "".join(galerie) + "</body>"
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "galerie.html"), "w", encoding="utf8").write(html)
print(len(galerie), "Bilder")
