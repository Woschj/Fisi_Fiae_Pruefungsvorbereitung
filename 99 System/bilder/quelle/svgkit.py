# Kleine Hilfsbibliothek für einheitliche SVG-Schaubilder im AP1-Stil.
from html import escape

BG = "#262626"; BOX = "#313131"; BOX2 = "#3a3a3a"; RAND = "#4d4d4d"
TXT = "#e2e3e4"; LEISE = "#a0a0a0"; BLASS = "#6f6f6f"
ROT = "#e5484d"; BLAU = "#4a8ff0"; GRUEN = "#2fb164"; ORANGE = "#ee8033"; LILA = "#9b7cf0"; GELB = "#e0b030"; TUERKIS = "#2bb3b3"
FONT = "system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif"
MONO = "ui-monospace, Consolas, 'Cascadia Mono', monospace"


class Svg:
    def __init__(self, w, h, titel=None):
        self.w, self.h, self.teile = w, h, []
        self.titel = titel

    def add(self, s):
        self.teile.append(s)
        return self

    def rect(self, x, y, w, h, fill=BOX, stroke=RAND, rx=8, sw=1.2, op=1, dash=None):
        d = f' stroke-dasharray="{dash}"' if dash else ""
        return self.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" fill-opacity="{op}" stroke="{stroke}" stroke-width="{sw}"{d}/>')

    def text(self, x, y, s, size=14, fill=TXT, weight=400, anchor="middle", mono=False, italic=False):
        fam = MONO if mono else FONT
        st = ' font-style="italic"' if italic else ""
        zeilen = str(s).split("\n")
        if len(zeilen) == 1:
            return self.add(f'<text x="{x}" y="{y}" font-family="{fam}" font-size="{size}" font-weight="{weight}" fill="{fill}" text-anchor="{anchor}" dominant-baseline="middle"{st}>{escape(zeilen[0])}</text>')
        lh = size * 1.25
        y0 = y - lh * (len(zeilen) - 1) / 2
        spans = "".join(f'<tspan x="{x}" y="{y0 + i * lh:.1f}">{escape(z)}</tspan>' for i, z in enumerate(zeilen))
        return self.add(f'<text font-family="{fam}" font-size="{size}" font-weight="{weight}" fill="{fill}" text-anchor="{anchor}" dominant-baseline="middle"{st}>{spans}</text>')

    def box(self, x, y, w, h, s, fill=BOX, stroke=RAND, size=14, weight=500, fg=TXT, rx=8, op=1, mono=False, sw=1.2):
        self.rect(x, y, w, h, fill, stroke, rx, sw=sw, op=op)
        return self.text(x + w / 2, y + h / 2, s, size, fg, weight, mono=mono)

    def line(self, x1, y1, x2, y2, stroke=LEISE, sw=1.6, pfeil=False, dash=None, pfeil_start=False):
        m = ' marker-end="url(#pf)"' if pfeil else ""
        m += ' marker-start="url(#pfs)"' if pfeil_start else ""
        d = f' stroke-dasharray="{dash}"' if dash else ""
        return self.add(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{stroke}" stroke-width="{sw}"{d}{m}/>')

    def path(self, d, stroke=LEISE, fill="none", sw=1.6, pfeil=False, dash=None, op=1):
        m = ' marker-end="url(#pf)"' if pfeil else ""
        da = f' stroke-dasharray="{dash}"' if dash else ""
        return self.add(f'<path d="{d}" stroke="{stroke}" fill="{fill}" fill-opacity="{op}" stroke-width="{sw}"{da}{m} stroke-linejoin="round" stroke-linecap="round"/>')

    def circle(self, cx, cy, r, fill=BOX, stroke=RAND, sw=1.2, op=1):
        return self.add(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" fill-opacity="{op}" stroke="{stroke}" stroke-width="{sw}"/>')

    def poly(self, punkte, fill=BOX, stroke=RAND, sw=1.2, op=1):
        p = " ".join(f"{x},{y}" for x, y in punkte)
        return self.add(f'<polygon points="{p}" fill="{fill}" fill-opacity="{op}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round"/>')

    def svg(self):
        kopf = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.w} {self.h}" width="{self.w}" height="{self.h}">'
        defs = (f'<defs><marker id="pf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">'
                f'<path d="M0,0 L10,5 L0,10 z" fill="{LEISE}"/></marker>'
                f'<marker id="pfs" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">'
                f'<path d="M0,0 L10,5 L0,10 z" fill="{LEISE}"/></marker></defs>')
        titel = f"<title>{escape(self.titel)}</title>" if self.titel else ""
        hg = f'<rect x="0" y="0" width="{self.w}" height="{self.h}" rx="14" fill="{BG}"/>'
        return kopf + titel + defs + hg + "".join(self.teile) + "</svg>\n"
