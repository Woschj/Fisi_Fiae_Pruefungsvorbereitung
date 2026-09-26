from svgkit import *

BILDER = {}


def ellipse(s, cx, cy, rx, ry, t, f=BOX2, stroke=RAND, unterstrichen=False, size=12.5):
    s.add(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{f}" stroke="{stroke}" stroke-width="1.3"/>')
    deko = ' text-decoration="underline"' if unterstrichen else ""
    s.add(f'<text x="{cx}" y="{cy}" font-family="{FONT}" font-size="{size}" fill="{TXT}" text-anchor="middle" dominant-baseline="middle"{deko}>{t}</text>')


def raute(s, cx, cy, w, h, t, f=ORANGE):
    s.poly([(cx, cy - h / 2), (cx + w / 2, cy), (cx, cy + h / 2), (cx - w / 2, cy)], f, f, op=0.25, sw=1.5)
    s.text(cx, cy, t, 12.5, TXT, 650)


def er_modell():
    s = Svg(860, 330, "ER-Modell in Chen-Notation: Kunde erteilt Auftrag, Auftrag enthält Artikel")
    ents = [(60, 140, "Kunde"), (370, 140, "Auftrag"), (680, 140, "Artikel")]
    for x, y, t in ents:
        s.box(x, y, 120, 50, t, BLAU, BLAU, 14, 700, op=0.25, rx=2)
    raute(s, 272, 165, 110, 60, "erteilt")
    raute(s, 582, 165, 110, 60, "enthält")
    for a, b in [(180, 217), (327, 370), (490, 527), (637, 680)]:
        s.line(a, 165, b, 165, LEISE, 1.6)
    for x, t in [(196, "1"), (350, "n"), (505, "n"), (660, "m")]:
        s.text(x, 150, t, 15, ROT, 800)
    ellipse(s, 80, 60, 52, 20, "KundenNr", unterstrichen=True); ellipse(s, 170, 60, 38, 20, "Name")
    ellipse(s, 90, 270, 50, 20, "Ort")
    for (x1, y1), (x2, y2) in [((80, 80), (100, 140)), ((170, 80), (150, 140)), ((90, 250), (110, 190))]:
        s.line(x1, y1, x2, y2, RAND, 1.2)
    ellipse(s, 390, 60, 52, 20, "AuftragNr", unterstrichen=True); ellipse(s, 490, 60, 40, 20, "Datum")
    s.line(390, 80, 410, 140, RAND, 1.2); s.line(490, 80, 470, 140, RAND, 1.2)
    ellipse(s, 582, 250, 44, 20, "Menge", GELB, GELB); s.line(582, 195, 582, 230, RAND, 1.2)
    ellipse(s, 700, 60, 44, 20, "ArtNr", unterstrichen=True); ellipse(s, 800, 60, 40, 20, "Preis")
    s.line(700, 80, 720, 140, RAND, 1.2); s.line(800, 80, 780, 140, RAND, 1.2)
    s.text(430, 310, "Rechteck = Entitätstyp · Ellipse = Attribut (Schlüssel unterstrichen) · Raute = Beziehung · 1, n, m = Kardinalität", 12, LEISE)
    s.text(700, 260, "„Menge“ gehört zur\nBeziehung (n:m),\nnicht zu einer Entität", 11.5, GELB)
    return s


def tabelle(s, x, y, name, spalten, f=BLAU, breite=190):
    s.box(x, y, breite, 30, name, f, f, 13, 700, op=0.35, rx=4)
    for i, (sp, art) in enumerate(spalten):
        yy = y + 30 + i * 26
        s.rect(x, yy, breite, 26, BOX, RAND, 0)
        farbe = GELB if art == "PK" else (ORANGE if art == "FK" else TXT)
        if art:
            s.text(x + 22, yy + 13, art, 10.5, farbe, 800)
        s.text(x + 46, yy + 13, sp, 12.5, farbe if art else TXT, 600 if art else 400, "start", mono=True)
    return y + 30 + len(spalten) * 26


def tabellenmodell():
    s = Svg(880, 300, "Relationales Tabellenmodell mit Primär- und Fremdschlüsseln")
    tabelle(s, 20, 40, "kunde", [("kunden_nr", "PK"), ("name", ""), ("ort", "")])
    tabelle(s, 240, 40, "auftrag", [("auftrag_nr", "PK"), ("datum", ""), ("kunden_nr", "FK")])
    tabelle(s, 460, 40, "auftrag_position", [("auftrag_nr", "PK FK" and "FK"), ("art_nr", "FK"), ("menge", "")], ORANGE, 200)
    tabelle(s, 690, 40, "artikel", [("art_nr", "PK"), ("bezeichnung", ""), ("preis", "")])
    s.path("M210 83 H225 V148 H240", ORANGE, sw=1.8, pfeil=False)
    s.text(215, 168, "1 : n", 12, ROT, 800)
    s.path("M430 83 H445 V96 H460", ORANGE, sw=1.8)
    s.path("M690 83 H675 V122 H660", ORANGE, sw=1.8)
    s.text(560, 170, "Zwischentabelle löst n:m auf\nPK = (auftrag_nr, art_nr)", 12, ORANGE, 600)
    s.text(440, 230, "PK (Primärschlüssel): identifiziert jede Zeile eindeutig · FK (Fremdschlüssel): verweist auf den PK einer anderen Tabelle", 12, TXT)
    s.text(440, 254, "1:n → FK auf die n-Seite · n:m → eigene Tabelle mit beiden FKs (+ Beziehungsattribute wie „menge“)", 12, LEISE)
    s.text(440, 278, "Redundanzfrei: Kundenname steht nur in „kunde“ – Änderung an einer Stelle, keine Anomalien", 12, LEISE)
    return s


def use_case():
    s = Svg(820, 420, "UML-Anwendungsfalldiagramm eines Ticketsystems")
    def akteur(x, y, name):
        s.circle(x, y, 12, "none", TXT, 1.8)
        s.path(f"M{x} {y + 12} V{y + 48} M{x - 20} {y + 26} H{x + 20} M{x} {y + 48} L{x - 16} {y + 74} M{x} {y + 48} L{x + 16} {y + 74}", TXT, sw=1.8)
        s.text(x, y + 92, name, 13, TXT, 650)
    s.rect(200, 30, 420, 330, BOX, LEISE, 10, sw=1.5)
    s.text(214, 50, "Ticketsystem", 14, TXT, 700, "start")
    faelle = [(330, 110, "Störung melden"), (520, 74, "Anmelden"), (520, 190, "Anhang hochladen"),
              (330, 220, "Ticketstatus abfragen"), (330, 310, "Ticket bearbeiten")]
    for x, y, t in faelle:
        ellipse(s, x, y, 90, 25, t, BOX2, LEISE)
    akteur(90, 110, "Mitarbeiter:in"); akteur(730, 250, "Support")
    akteur(90, 290, "Auszubildende:r")
    s.line(112, 140, 240, 112, TXT, 1.3); s.line(112, 150, 240, 216, TXT, 1.3)
    s.line(710, 280, 420, 310, TXT, 1.3)
    s.line(90, 290, 90, 226, TXT, 1.3)
    s.poly([(90, 214), (82, 228), (98, 228)], BG, TXT, 1.3)
    s.path("M392 96 L436 82", LEISE, sw=1.3, dash="6 4", pfeil=True)
    s.text(404, 76, "«include»", 11.5, BLAU, 700, "end")
    s.path("M470 170 L396 130", LEISE, sw=1.3, dash="6 4", pfeil=True)
    s.text(462, 142, "«extend»", 11.5, ORANGE, 700, "start")
    s.text(410, 406, "«include»: immer enthalten (Pfeil zum eingebundenen Fall) · «extend»: optional (Pfeil zum Basisfall) · Linie ohne Pfeil: Akteur nutzt Fall", 11, LEISE)
    return s


def klasse(s, x, y, w, name, attrs, ops, f=BLAU):
    s.box(x, y, w, 30, name, f, f, 13.5, 700, op=0.3, rx=0)
    ha = 10 + 20 * len(attrs); ho = 10 + 20 * len(ops)
    s.rect(x, y + 30, w, ha, BOX, RAND, 0); s.rect(x, y + 30 + ha, w, ho, BOX, RAND, 0)
    for i, a in enumerate(attrs):
        s.text(x + 10, y + 45 + i * 20, a, 12, TXT, anchor="start", mono=True)
    for i, o in enumerate(ops):
        s.text(x + 10, y + 45 + ha + i * 20, o, 12, TXT, anchor="start", mono=True)
    return y + 30 + ha + ho


def klassendiagramm():
    s = Svg(880, 420, "UML-Klassendiagramm mit Vererbung, Komposition, Aggregation und Multiplizitäten")
    klasse(s, 330, 20, 220, "Geraet", ["- inventarNr : String", "- kaufdatum : Date", "# preis : double"], ["+ getAlter() : int", "+ ausleihen() : void"])
    klasse(s, 130, 230, 200, "Notebook", ["- akkuWh : int"], ["+ laden() : void"], GRUEN)
    klasse(s, 550, 230, 200, "Monitor", ["- zoll : double"], ["+ kalibrieren() : void"], GRUEN)
    # Vererbung (hohler Dreieckspfeil zur Oberklasse)
    s.path("M230 230 V200 H650 V230", TXT, sw=1.4); s.line(440, 200, 440, 172, TXT, 1.4)
    s.poly([(440, 160), (432, 174), (448, 174)], BG, TXT, 1.4)
    s.text(470, 186, "Vererbung", 11.5, LEISE, anchor="start")
    # Komposition Notebook ◆— Akku
    klasse(s, 20, 20, 170, "Akku", ["- zyklen : int"], [], ORANGE)
    s.poly([(150, 230), (144, 218), (150, 206), (156, 218)], TXT, TXT)
    s.line(150, 206, 150, 90, TXT, 1.4)
    s.text(162, 196, "1", 12, ROT, 800, "start"); s.text(162, 104, "1", 12, ROT, 800, "start")
    s.text(92, 150, "Komposition:\nAkku existiert\nnicht ohne Notebook", 11, LEISE)
    # Aggregation Abteilung ◇— Geraet
    klasse(s, 690, 20, 170, "Abteilung", ["- name : String"], [], LILA)
    s.poly([(690, 62), (678, 56), (666, 62), (678, 68)], BG, TXT, 1.4)
    s.line(666, 62, 550, 62, TXT, 1.4)
    s.text(655, 50, "1", 12, ROT, 800); s.text(562, 50, "0..*", 12, ROT, 800)
    s.text(610, 88, "Aggregation", 11, LEISE)
    leg = ["Sichtbarkeit: + public · - private · # protected · ~ package", "Multiplizität: 1 genau eins · 0..1 höchstens eins · * bzw. 0..* beliebig · 1..* mindestens eins",
           "◆ Komposition (Teil stirbt mit dem Ganzen) · ◇ Aggregation (Teil existiert eigenständig) · ▷ Vererbung (ist-ein)"]
    for i, t in enumerate(leg):
        s.text(440, 356 + i * 20, t, 11.5, LEISE)
    return s


def aktivitaet():
    s = Svg(820, 540, "UML-Aktivitätsdiagramm mit Swimlanes, Entscheidung und Parallelisierung")
    bahnen = [("Kunde", 20), ("Vertrieb", 290), ("Lager", 560)]
    for n, x in bahnen:
        s.rect(x, 20, 240, 480, BOX, RAND, 0)
        s.box(x, 20, 240, 30, n, BOX2, RAND, 13, 700, rx=0)
    def aktion(cx, y, t, w=170):
        s.box(cx - w / 2, y, w, 36, t, BLAU, BLAU, 12.5, 600, op=0.22, rx=16)
    s.circle(140, 80, 10, TXT, TXT)
    aktion(140, 110, "Bestellung aufgeben"); s.line(140, 90, 140, 110, LEISE, 1.5, pfeil=True)
    s.path("M225 128 H410 V160", LEISE, sw=1.5, pfeil=True)
    raute(s, 410, 185, 60, 50, "", GELB)
    s.text(446, 172, "[lieferbar]", 11.5, GRUEN, 700, "start"); s.text(374, 172, "[nicht lieferbar]", 11.5, ROT, 700, "end")
    s.path("M380 185 H140 V230", LEISE, sw=1.5, pfeil=True)
    aktion(140, 230, "Absage erhalten")
    s.path("M140 266 V300", LEISE, sw=1.5, pfeil=True)
    s.circle(140, 312, 11, "none", TXT, 2); s.circle(140, 312, 6, TXT, TXT)
    s.path("M410 210 V250", LEISE, sw=1.5, pfeil=True)
    s.rect(330, 252, 400, 6, TXT, TXT, 1)   # Fork
    s.text(740, 255, "Gabelung\n(parallel)", 10.5, LEISE, anchor="start")
    s.path("M410 258 V285", LEISE, sw=1.5, pfeil=True); aktion(410, 285, "Rechnung erstellen", 160)
    s.path("M680 258 V285", LEISE, sw=1.5, pfeil=True); aktion(680, 285, "Ware verpacken", 150)
    s.path("M410 321 V372", LEISE, sw=1.5, pfeil=True); s.path("M680 321 V372", LEISE, sw=1.5, pfeil=True)
    s.rect(330, 372, 400, 6, TXT, TXT, 1)   # Join
    s.text(740, 375, "Vereinigung\n(wartet auf alle)", 10.5, LEISE, anchor="start")
    s.path("M540 378 V410 H140 V430", LEISE, sw=1.5, pfeil=True)
    aktion(140, 430, "Ware erhalten")
    s.path("M140 466 V474", LEISE, sw=1.5)
    s.circle(140, 486, 11, "none", TXT, 2); s.circle(140, 486, 6, TXT, TXT)
    s.text(410, 524, "● Start · ◉ Ende · Raute: Entscheidung mit [Bedingungen] an den Kanten · Balken: Parallelität · Spalten: Swimlanes (wer tut was)", 10.5, LEISE)
    return s


BILDER.update({"er-modell": er_modell, "tabellenmodell": tabellenmodell, "uml-anwendungsfall": use_case,
               "uml-klassendiagramm": klassendiagramm, "uml-aktivitaet": aktivitaet})
