"""Génère les fichiers de l'app (/app) à partir du moteur de l'atelier (tools/atelier.html).

L'atelier reste la référence pour les plantes, les règles de composition, le plan et le budget.
Ce script en extrait le style, le panneau de critères et le moteur, les adapte à l'app,
puis assemble app/index.html à partir de tools/app_template.html.

Usage : python3 tools/build_app.py   (depuis la racine du dépôt)
"""
import pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
src = (ROOT / "tools" / "atelier.html").read_text(encoding="utf-8")


def between(text, start, end, label):
    i = text.find(start)
    j = text.find(end, i + len(start))
    if i < 0 or j < 0:
        sys.exit(f"Bloc introuvable dans tools/atelier.html : {label}")
    return text[i + len(start):j]


def sub(pattern, repl, text, label, flags=re.S):
    out, n = re.subn(pattern, repl, text, count=1, flags=flags)
    if n != 1:
        sys.exit(f"Adaptation impossible : {label}")
    return out


# 1. Style de l'atelier : le bloc qui définit les jetons de couleur.
styles = re.findall(r"<style>(.*?)</style>", src, re.S)
css = next((s for s in styles if "--moss:" in s), None)
if not css:
    sys.exit("Style de l'atelier introuvable")

# 2. Panneau de critères (aside) de l'atelier.
aside = between(src, "<aside>", "</aside>", "panneau de critères")

# 3. Moteur : le script principal de l'atelier, adapté à l'app.
js = between(src, "<script>", "</script>", "script")
js = js.replace("`photos/${slugify(p.nom)}.jpg`", "`/photos/${slugify(p.nom)}.jpg`").replace("`photos/style-${k}.jpg`", "`/photos/style-${k}.jpg`")
js = sub(r"const ZONES = \[.*?\n\];", "let ZONES = [];", js, "zones préréglées")
js = sub(r'const ZKEY = "[^"]+";\nlet zoneData = [^\n]*\n', 'let ZKEY = "app-zones";\nlet zoneData = {};\n', js, "stockage des zones")
js = sub(r'const KEY="[^"]+";', 'const KEY="app-massifs-saved-v1";', js, "combinaisons gardées")
js = sub(r'document\.getElementById\("znote"\)\.textContent = z \? z\.note : "[^"]*";', "renderZoneDetail(z);", js, "détail de zone")
js = sub(r'try\{ document\.getElementById\("zones-t"\)\.scrollIntoView\(\{block:"nearest"\}\); \}catch\(e\)\{\}',
         'if(!window.__quiet){ try{ document.getElementById("zones-t").scrollIntoView({block:"nearest"}); }catch(e){} }', js, "défilement")
js = sub(r'\nsetZone\("[^"]*"\);\s*$', "\n", js, "zone de départ")

engine = "// Fichier généré par tools/build_app.py à partir de tools/atelier.html. Ne pas modifier à la main.\n" + js
(ROOT / "app" / "engine.js").write_text(engine, encoding="utf-8")
(ROOT / "app" / "atelier.css").write_text("/* Généré par tools/build_app.py à partir de tools/atelier.html. */\n" + css, encoding="utf-8")

tpl = (ROOT / "tools" / "app_template.html").read_text(encoding="utf-8")
if "<!--ATELIER_ASIDE-->" not in tpl:
    sys.exit("Repère <!--ATELIER_ASIDE--> absent du gabarit")
(ROOT / "app" / "index.html").write_text(tpl.replace("<!--ATELIER_ASIDE-->", aside.strip()), encoding="utf-8")
print("app/index.html, app/engine.js et app/atelier.css générés.")
