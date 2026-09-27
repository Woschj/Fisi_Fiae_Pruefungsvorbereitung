"""Read-only structural check. Run: python -X utf8 "AP1/99 System/scripts/vault-pruefen.py"."""
from pathlib import Path
import json
import re
import sys
from collections import defaultdict

ROOT = Path(__file__).resolve().parents[3]
files = [p for p in ROOT.rglob('*') if p.is_file() and not any(x.startswith('.') for x in p.relative_to(ROOT).parts)]
notes = [p for p in files if p.suffix == '.md']
index = defaultdict(list)
for p in files:
    for key in {p.name, p.stem, p.relative_to(ROOT).as_posix(), p.relative_to(ROOT).with_suffix('').as_posix()}:
        index[key].append(p)
errors = []
modules = {}
for p in notes:
    text = p.read_text(encoding='utf-8-sig')
    label = p.relative_to(ROOT).as_posix()
    module = re.search(r'^modul: (\S+)', text, re.M)
    if module:
        if module[1] in modules:
            errors.append(f'{label}: duplicate module {module[1]}')
        modules[module[1]] = label
    # Code examples can contain placeholder links; inspect actual Markdown only.
    text = re.sub(r'^```.*?^```[^\n]*', '', text, flags=re.M | re.S)
    for match in re.finditer(r'\[\[([^\]\n]+)\]\]', text):
        target = match[1].replace('\\|', '|').split('|')[0]
        name, _, heading = target.partition('#')
        candidates = index.get(name, []) if name else [p]
        if not candidates:
            errors.append(f'{label}: missing target {target}')
        elif len(candidates) > 1:
            errors.append(f'{label}: ambiguous target {target}')
        elif heading and not heading.startswith('^'):
            body = candidates[0].read_text(encoding='utf-8-sig')
            headings = re.findall(r'^#{1,6}\s+(.+?)\s*#*$', body, re.M)
            def clean(s):
                return re.sub(r'[*_`]', '', s).strip()
            if clean(heading) not in [clean(h) for h in headings]:
                errors.append(f'{label}: missing heading {target}')
for p in files:
    if p.suffix == '.json':
        try:
            json.loads(p.read_text(encoding='utf-8-sig'))
        except ValueError as e:
            errors.append(f'{p.relative_to(ROOT)}: {e}')
print(f'{len(notes)} Markdown files; {len(modules)} modules; {len(errors)} structural findings')
for error in errors:
    print(error)
sys.exit(bool(errors))
