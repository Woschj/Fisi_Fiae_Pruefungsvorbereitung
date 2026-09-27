from svgkit import *

BILDER = {}


def platte(s, x, y, w, name, bloecke, f):
    """Festplatte als Zylinder-Symbol mit Datenblöcken."""
    h = 34 + len(bloecke) * 30
    s.rect(x, y, w, h, BOX, RAND, 10)
    s.add(f'<ellipse cx="{x + w / 2}" cy="{y + 10}" rx="{w / 2 - 4}" ry="6" fill="{BOX2}" stroke="{RAND}"/>')
    s.text(x + w / 2, y + h + 14, name, 11.5, LEISE)
    for i, b in enumerate(bloecke):
        par = b.startswith(("P", "Q"))
        farbe = ORANGE if par else f
        s.box(x + 8, y + 24 + i * 30, w - 16, 24, b, farbe, farbe, 12, 600, op=0.4 if par else 0.25, rx=5, mono=True)


def raid():
    s = Svg(1010, 330, "RAID 0, 1, 5, 6 und 10: Blockverteilung, Kapazität und Ausfallsicherheit")
    gruppen = [
        ("RAID 0 · Striping", 20, [["A1", "A3", "A5"], ["A2", "A4", "A6"]], "n × C · 0 Ausfälle", BLAU),
        ("RAID 1 · Mirroring", 175, [["A1", "A2", "A3"], ["A1", "A2", "A3"]], "C · 1 Ausfall", GRUEN),
        ("RAID 5 · verteilte Parität", 330, [["A1", "B1", "Pc"], ["A2", "Pb", "C1"], ["Pa", "B2", "C2"]], "(n−1) × C · 1 Ausfall", LILA),
        ("RAID 6 · doppelte Parität", 540, [["A1", "Pb", "Qc"], ["A2", "Qb", "C1"], ["Pa", "B1", "C2"], ["Qa", "B2", "Pc"]], "(n−2) × C · 2 Ausfälle", ROT),
        ("RAID 10 · Spiegel + Striping", 800, [["A1", "A3", "A5"], ["A1", "A3", "A5"], ["A2", "A4", "A6"], ["A2", "A4", "A6"]], "n/2 × C · 1 garantiert", TUERKIS),
    ]
    for titel, x0, platten, formel, f in gruppen:
        schritt = 48 if len(platten) == 4 and x0 == 800 else 62
        pw = 42 if schritt == 48 else 54
        breite = len(platten) * schritt - (schritt - pw)
        s.text(x0 + breite / 2, 26, titel, 13, TXT, 700)
        for i, b in enumerate(platten):
            platte(s, x0 + i * schritt, 44, pw, f"P{i + 1}" if schritt == 48 else f"Platte {i + 1}", b, f)
        s.text(x0 + breite / 2, 216, formel, 12.5, f, 700)
        if x0 == 800:
            s.path(f"M{x0} 184 v6 H{x0 + 90} v-6", TUERKIS, sw=1.4); s.path(f"M{x0 + 96} 184 v6 H{x0 + 186} v-6", TUERKIS, sw=1.4)
    s.line(20, 240, 990, 240, RAND, 1)
    s.text(505, 262, "A1, A2 … = Datenblöcke · Pa, Qa = Paritätsblöcke (per XOR) · C = Kapazität einer Platte, n = Anzahl Platten", 12.5, LEISE)
    s.text(505, 286, "Mindestanzahl: RAID 0 → 2 · RAID 1 → 2 · RAID 5 → 3 · RAID 6 → 4 · RAID 10 → 4", 12.5, TXT, 600)
    s.text(505, 310, "RAID erhöht die Verfügbarkeit – es ersetzt kein Backup (Löschen, Ransomware, Brand betreffen alle Platten).", 12.5, ROT, 600)
    return s


def anschluesse():
    s = Svg(880, 320, "Schnittstellen im Vergleich: USB-A, USB-C, HDMI, DisplayPort, RJ45")
    def karte(x, titel, daten):
        s.rect(x, 20, 160, 262, BOX, RAND, 12)
        s.text(x + 80, 44, titel, 14, TXT, 700)
        s.text(x + 80, 232, daten, 11.5, LEISE)
    stahl, dunkel = "#c4c9cf", "#1b1b1b"
    # USB-A
    karte(15, "USB-A", "USB 2.0 bis USB 3.2\nblau = ab USB 3.x\nnicht verdrehsicher")
    s.rect(55, 90, 80, 44, stahl, "#8d949c", 4, op=0.9); s.rect(63, 98, 64, 16, "#3d6fd6", "#2a4f9c", 2)
    # USB-C
    karte(190, "USB-C", "nur Steckerform!\nUSB 2 … USB4/TB\nDP Alt Mode · PD bis 240 W")
    s.rect(225, 96, 90, 34, stahl, "#8d949c", 17, op=0.9); s.rect(237, 106, 66, 14, dunkel, dunkel, 7)
    # HDMI
    karte(365, "HDMI", "2.0: 18 Gbit/s\n2.1: 48 Gbit/s\nTV, Beamer, Monitor")
    s.poly([(398, 92), (492, 92), (492, 118), (480, 132), (410, 132), (398, 118)], stahl, "#8d949c", op=0.9)
    s.poly([(406, 100), (484, 100), (484, 114), (476, 124), (414, 124), (406, 114)], dunkel, dunkel)
    # DisplayPort
    karte(540, "DisplayPort", "1.4: 32,4 Gbit/s\n2.1: bis 80 Gbit/s\nDaisy Chain (MST)")
    s.poly([(575, 92), (665, 92), (665, 132), (590, 132), (575, 118)], stahl, "#8d949c", op=0.9)
    s.poly([(583, 100), (657, 100), (657, 124), (594, 124), (583, 114)], dunkel, dunkel)
    # RJ45
    karte(715, "RJ45 (8P8C)", "Ethernet Twisted Pair\n1 / 2,5 / 10 Gbit/s\nmax. 100 m Kanal")
    s.rect(755, 82, 80, 66, stahl, "#8d949c", 4, op=0.9); s.rect(763, 90, 64, 42, dunkel, dunkel, 2)
    s.rect(783, 132, 24, 12, dunkel, dunkel, 1)
    for i in range(8):
        s.rect(767 + i * 7.3, 92, 4, 12, "#d4af37", "#d4af37", 1)
    s.text(440, 304, "Symbolische Draufsicht auf die Buchse – nicht maßstäblich", 11, BLASS, italic=True)
    return s


def mainboard():
    s = Svg(960, 440, "Mainboard schematisch: Sockel, RAM, M.2, PCIe, Chipsatz, Anschlüsse")
    s.rect(160, 20, 560, 400, "#1f3a2b", "#2f6b48", 12, sw=1.6)
    def teil(x, y, w, h, t, f, size=12):
        s.box(x, y, w, h, t, f, f, size, 650, op=0.35, rx=6)
    teil(170, 40, 70, 250, "I/O-Panel\nUSB, LAN,\nHDMI/DP,\nAudio", LEISE, 11)
    teil(300, 70, 120, 120, "CPU-Sockel\n(z. B. AM5,\nLGA 1851)", ROT)
    for i in range(4):
        s.rect(460 + i * 24, 50, 14, 180, BLAU, BLAU, 3, op=0.45)
    s.text(505, 244, "4 × DIMM (RAM)\nDual Channel: Slot 2 + 4", 11, TXT)
    teil(620, 50, 80, 110, "ATX-\nStrom\n24-Pin", ORANGE, 11)
    teil(300, 215, 120, 30, "M.2 (NVMe, PCIe)", LILA, 11)
    teil(250, 270, 330, 26, "PCIe 5.0 x16 – Grafikkarte", GRUEN)
    teil(250, 320, 330, 20, "PCIe x4 / x1 – Erweiterungskarten", GRUEN, 11)
    teil(600, 290, 100, 70, "Chipsatz\n(PCH)", TUERKIS)
    teil(600, 375, 100, 30, "SATA-Ports", LILA, 11)
    teil(250, 360, 70, 45, "CMOS-\nBatterie", GELB, 10.5)
    teil(335, 360, 100, 45, "UEFI-Chip\n(Firmware)", GELB, 10.5)
    teil(450, 360, 120, 45, "TPM-Header /\nfTPM", GELB, 10.5)
    # Legende links/rechts
    leg = [(ROT, "CPU: Rechen- und Steuerwerk"), (BLAU, "RAM: flüchtiger Arbeitsspeicher"), (LILA, "Massenspeicher: M.2, SATA"),
           (GRUEN, "Erweiterung: PCIe-Slots"), (TUERKIS, "Chipsatz: verbindet Peripherie"), (ORANGE, "Stromversorgung"), (GELB, "Firmware, Sicherheit")]
    for i, (f, t) in enumerate(leg):
        y = 60 + i * 30
        s.rect(735, y - 7, 14, 14, f, f, 3, op=0.6)
        s.text(755, y, t, 11.5, TXT, anchor="start")
    s.text(80, 210, "Formfaktoren:\nATX 305×244 mm\nmicro-ATX\nMini-ITX 170×170", 11.5, LEISE)
    return s


def leistungsdreieck():
    s = Svg(700, 300, "Leistungsdreieck: Scheinleistung S, Wirkleistung P und Leistungsfaktor cos φ")
    s.poly([(80, 240), (480, 240), (480, 80)], ROT, ROT, op=0.08)
    s.line(80, 240, 480, 240, BLAU, 3); s.line(480, 240, 480, 80, ORANGE, 3); s.line(80, 240, 480, 80, ROT, 3)
    s.text(280, 262, "Wirkleistung P in Watt (W) – wird wirklich genutzt", 13, BLAU, 650)
    s.text(492, 160, "Blindleistung Q\nin var", 12.5, ORANGE, 650, "start")
    s.text(250, 140, "Scheinleistung S in VA", 13, ROT, 650)
    s.path("M150 240 A70 70 0 0 0 145 214", LEISE, sw=1.5)
    s.text(168, 226, "φ", 15, TXT, 700)
    s.text(350, 30, "P = S × cos φ     ·     S = P ÷ cos φ", 16, TXT, 700, mono=True)
    s.text(610, 250, "Beispiel USV:\n1 000 VA × 0,6\n= 600 W", 12, LEISE)
    return s


def struktogramm():
    s = Svg(700, 330, "Struktogramm: Summe aller positiven Werte einer Liste")
    x, w = 40, 620
    s.box(x, 20, w, 38, "summe ← 0", BOX, RAND, 14, 500, rx=0, mono=True)
    s.rect(x, 58, w, 196, BOX, RAND, 0)
    s.text(x + 14, 76, "FÜR i ← 0 BIS n − 1", 14, TXT, 500, "start", mono=True)
    ix = x + 36
    # Verzweigung
    s.rect(ix, 94, w - 36, 60, BOX2, RAND, 0)
    mx = ix + (w - 36) / 2
    s.path(f"M{ix} 94 L{mx} 154 L{ix + w - 36} 94", LEISE, sw=1.2)
    s.text(mx, 110, "werte[i] > 0 ?", 14, TXT, 600, mono=True)
    s.text(ix + 30, 142, "ja", 12.5, GRUEN, 700); s.text(ix + w - 66, 142, "nein", 12.5, ROT, 700)
    s.box(ix, 154, mx - ix, 100, "summe ← summe + werte[i]", BOX, RAND, 13.5, 500, rx=0, mono=True)
    s.box(mx, 154, ix + w - 36 - mx, 100, "∅", BOX, RAND, 18, 500, rx=0, fg=LEISE)
    s.box(x, 254, w, 38, "ausgabe(summe)", BOX, RAND, 14, 500, rx=0, mono=True)
    s.text(350, 312, "Blöcke statt Pfeile · Schleifenrumpf eingerückt · Verzweigung als Dreieck · ∅ = leerer Zweig", 12, LEISE)
    return s


def testpyramide():
    s = Svg(760, 320, "Testpyramide und Teststufen")
    stufen = [("Abnahmetest", "Kunde prüft gegen die Anforderungen (Pflichtenheft)", ROT),
              ("Systemtest", "ganzes System in einer Testumgebung", ORANGE),
              ("Integrationstest", "Zusammenspiel der Komponenten/Schnittstellen", BLAU),
              ("Unit-/Komponententest", "einzelne Funktionen, meist automatisiert", GRUEN)]
    top, hoehe, cx = 24, 62, 210
    for i, (n, t, f) in enumerate(stufen):
        y = top + i * hoehe
        h1, h2 = 40 + i * 42, 40 + (i + 1) * 42
        s.poly([(cx - h1, y), (cx + h1, y), (cx + h2, y + hoehe - 4), (cx - h2, y + hoehe - 4)], f, f, op=0.3)
        s.text(cx, y + hoehe / 2 - 2, n, 13, TXT, 700)
        s.line(cx + (h1 + h2) / 2 + 8, y + hoehe / 2 - 2, 420, y + hoehe / 2 - 2, RAND, 1, dash="3 4")
        s.text(430, y + hoehe / 2 - 2, t, 12.5, TXT, anchor="start")
    s.text(380, 290, "oben: wenige, langsame, aufwendige Tests · unten: viele, schnelle, günstige Tests", 12, LEISE)
    s.text(380, 308, "Nach jeder Änderung: Regressionstest – vorhandene Tests erneut ausführen", 12, LEISE)
    return s


def cloud_modelle():
    s = Svg(860, 410, "Verantwortung bei On-Premises, IaaS, PaaS und SaaS")
    schichten = ["Anwendungen", "Daten", "Laufzeit / Middleware", "Betriebssystem", "Virtualisierung", "Server & Speicher", "Netzwerk", "Rechenzentrum"]
    modelle = [("On-Premises", 8), ("IaaS", 4), ("PaaS", 2), ("SaaS", 0)]
    for m, (name, kunde) in enumerate(modelle):
        x = 30 + m * 205
        s.text(x + 90, 26, name, 15, TXT, 700)
        for i, sch in enumerate(schichten):
            ist_kunde = i < kunde
            f = BLAU if ist_kunde else ORANGE
            s.box(x, 42 + i * 36, 180, 30, sch, f, f, 12, 500, op=0.32, rx=6)
    s.rect(160, 350, 14, 14, BLAU, BLAU, 3, op=0.6); s.text(182, 357, "verwaltet der Kunde", 12.5, TXT, anchor="start")
    s.rect(400, 350, 14, 14, ORANGE, ORANGE, 3, op=0.6); s.text(422, 357, "verwaltet der Anbieter", 12.5, TXT, anchor="start")
    s.text(430, 398, "Daten, Benutzer und Zugriffsrechte bleiben auch bei SaaS in der Verantwortung des Kunden (DSGVO).", 11.5, GELB)
    s.text(430, 380, "Beispiele: IaaS = virtuelle Server (Azure VM, AWS EC2) · PaaS = App-Plattform/Datenbankdienst · SaaS = Microsoft 365, Webmail", 11.5, LEISE)
    return s


BILDER.update({"raid-level": raid, "anschluesse": anschluesse, "mainboard": mainboard, "leistungsdreieck": leistungsdreieck,
               "struktogramm": struktogramm, "testpyramide": testpyramide, "cloud-modelle": cloud_modelle})
