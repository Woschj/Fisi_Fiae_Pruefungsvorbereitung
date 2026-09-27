from svgkit import *
import math

BILDER = {}


def backup_arten():
    s = Svg(860, 470, "Voll-, differenzielle und inkrementelle Sicherung im Wochenverlauf")
    tage = ["So", "Mo", "Di", "Mi", "Do"]
    x0, tw = 200, 128
    for i, t in enumerate(tage):
        s.text(x0 + i * tw + tw / 2, 24, t, 13, LEISE, 700)
        s.line(x0 + i * tw, 36, x0 + i * tw, 440, "#333", 1)
    s.text(100, 24, "Sicherung am …", 12, LEISE, 600)
    arten = [("Vollsicherung", BLAU, lambda i: (i, "Voll"), "Restore: nur die letzte Sicherung · viel Speicher, lange Laufzeit"),
             ("Differenziell", ORANGE, lambda i: (1, f"alles seit So"), "Restore: Voll + letzte differenzielle · Menge wächst täglich"),
             ("Inkrementell", GRUEN, lambda i: (i, f"nur {tage[i]}"), "Restore: Voll + alle Inkremente in Reihenfolge · schnellste Sicherung")]
    y = 44
    for name, f, fn, fuss in arten:
        s.text(20, y + 50, name, 14, f, 700, "start")
        for i in range(5):
            yy = y + i * 18
            if i == 0:
                von, t, ff = 0, "Voll", BLAU
            else:
                von, t = fn(i); ff = BLAU if t == "Voll" else f
            s.text(x0 - 10, yy + 7, tage[i], 10.5, LEISE, anchor="end")
            s.box(x0 + von * tw + 4, yy, (i + 1 - von) * tw - 8, 14, t, ff, ff, 9.5, 600, op=0.35, rx=4)
        s.text(x0 + 5 * tw / 2, y + 104, fuss, 12, TXT)
        y += 134
    s.text(430, 458, "Balkenlänge = Zeitraum der Änderungen, die in dieser Sicherung stecken", 11.5, LEISE)
    return s


def regel_321():
    s = Svg(860, 280, "3-2-1-Regel der Datensicherung")
    s.text(430, 26, "3 Kopien · 2 verschiedene Medien · 1 Kopie außer Haus (+ 1 offline/unveränderbar)", 15, TXT, 700)
    kopien = [("Originaldaten", "Fileserver\n(SSD, RAID)", BLAU, "Kopie 1"), ("Backup vor Ort", "NAS im Serverraum\n(schneller Restore)", GRUEN, "Kopie 2"),
              ("Backup außer Haus", "Cloud-Speicher oder\nLTO-Band im Tresor", ORANGE, "Kopie 3")]
    for i, (t, u, f, k) in enumerate(kopien):
        x = 40 + i * 270
        s.rect(x, 60, 240, 150, f, f, 14, op=0.12); s.rect(x, 60, 240, 150, "none", f, 14, sw=1.8)
        s.text(x + 120, 84, k, 12, f, 700)
        s.text(x + 120, 112, t, 15, TXT, 700)
        s.text(x + 120, 152, u, 12.5, LEISE)
        if i < 2:
            s.line(x + 244, 135, x + 266, 135, LEISE, 1.8, pfeil=True)
    s.path("M40 222 H550", LEISE, sw=1.4); s.text(295, 240, "Standort 1 (Firma) – Medium 1: Festplatten", 12, LEISE)
    s.path("M580 222 H820", ORANGE, sw=1.4); s.text(700, 240, "Standort 2 – Medium 2", 12, ORANGE)
    s.text(430, 266, "Schützt gegen Plattendefekt, Löschen, Ransomware, Brand und Diebstahl – aber nur mit regelmäßigen Restore-Tests.", 12, TXT)
    return s


def schluessel(s, x, y, f, text=None):
    s.circle(x, y, 10, "none", f, 3)
    s.path(f"M{x + 10} {y} H{x + 38} M{x + 30} {y} v8 M{x + 36} {y} v6", f, sw=3)
    if text:
        s.text(x + 20, y - 20, text, 11.5, f, 700)


def krypto():
    s = Svg(880, 420, "Symmetrische und asymmetrische Verschlüsselung")
    # symmetrisch
    s.text(440, 24, "Symmetrisch – ein gemeinsamer geheimer Schlüssel (z. B. AES)", 15, TXT, 700)
    for x, t in [(40, "Alice"), (740, "Bob")]:
        s.box(x, 60, 100, 44, t, BOX2, RAND, 14, 650)
    s.box(210, 56, 140, 52, "Klartext\n→ verschlüsseln", BLAU, BLAU, 12, 600, op=0.25)
    s.box(390, 56, 120, 52, "Geheimtext\n%$#&@!", BOX, RAND, 12, 600, mono=True)
    s.box(550, 56, 140, 52, "entschlüsseln\n→ Klartext", BLAU, BLAU, 12, 600, op=0.25)
    for a, b in [(140, 210), (350, 390), (510, 550), (690, 740)]:
        s.line(a, 82, b, 82, LEISE, 1.6, pfeil=True)
    schluessel(s, 262, 140, ROT, "Schlüssel K"); schluessel(s, 602, 140, ROT, "derselbe K")
    s.text(440, 176, "schnell · Problem: K muss vorher sicher ausgetauscht werden · n Personen → n(n−1)/2 Schlüssel", 12, LEISE)
    s.line(30, 198, 850, 198, RAND, 1, dash="4 4")
    # asymmetrisch
    s.text(440, 224, "Asymmetrisch – Schlüsselpaar des Empfängers (z. B. RSA, ECC)", 15, TXT, 700)
    for x, t in [(40, "Alice"), (740, "Bob")]:
        s.box(x, 260, 100, 44, t, BOX2, RAND, 14, 650)
    s.box(210, 256, 140, 52, "Klartext\n→ verschlüsseln", GRUEN, GRUEN, 12, 600, op=0.25)
    s.box(390, 256, 120, 52, "Geheimtext\n%$#&@!", BOX, RAND, 12, 600, mono=True)
    s.box(550, 256, 140, 52, "entschlüsseln\n→ Klartext", GRUEN, GRUEN, 12, 600, op=0.25)
    for a, b in [(140, 210), (350, 390), (510, 550), (690, 740)]:
        s.line(a, 282, b, 282, LEISE, 1.6, pfeil=True)
    schluessel(s, 262, 340, GRUEN, "Bobs öffentlicher"); schluessel(s, 602, 340, ROT, "Bobs privater")
    s.text(440, 380, "Verschlüsseln mit dem öffentlichen Schlüssel des Empfängers – nur sein privater Schlüssel entschlüsselt.", 12, LEISE)
    s.text(440, 402, "Signieren umgekehrt: mit dem eigenen privaten Schlüssel, prüfen mit dem öffentlichen. Praxis: hybrid (TLS).", 12, LEISE)
    return s


def dmz():
    s = Svg(860, 300, "Netz mit DMZ: öffentlich erreichbare Server getrennt vom internen LAN")
    s.path("M40 150 a24 24 0 0 1 34 -26 a30 30 0 0 1 52 6 a22 22 0 0 1 18 38 z", LEISE, BOX, 1.4)
    s.text(92, 148, "Internet", 13, TXT, 650)
    s.box(180, 120, 130, 56, "Firewall\n(3 Zonen)", ROT, ROT, 13, 700, op=0.25)
    s.line(144, 148, 180, 148, LEISE, 1.8)
    s.rect(380, 30, 220, 110, ORANGE, ORANGE, 12, op=0.1, dash="5 4")
    s.text(490, 48, "DMZ (Demilitarized Zone)", 13, ORANGE, 700)
    s.box(395, 64, 90, 56, "Webserver", BOX2, RAND, 12, 600); s.box(495, 64, 90, 56, "Mail-\nRelay", BOX2, RAND, 12, 600)
    s.rect(380, 170, 220, 110, BLAU, BLAU, 12, op=0.1, dash="5 4")
    s.text(490, 188, "Internes LAN", 13, BLAU, 700)
    s.box(395, 204, 90, 56, "Clients", BOX2, RAND, 12, 600); s.box(495, 204, 90, 56, "File-/\nDB-Server", BOX2, RAND, 12, 600)
    s.path("M310 140 L380 90", LEISE, sw=1.8); s.path("M310 160 L380 220", LEISE, sw=1.8)
    regeln = [("Internet → DMZ", "nur 443 (Web), 25 (Mail) erlaubt", GRUEN), ("Internet → LAN", "alles gesperrt (Default Deny)", ROT),
              ("LAN → Internet", "erlaubt (Web, Mail), protokolliert", GRUEN), ("DMZ → LAN", "gesperrt – nur gezielte Ausnahmen", ROT)]
    for i, (a, b, f) in enumerate(regeln):
        y = 70 + i * 50
        s.text(630, y, a, 12.5, f, 700, "start"); s.text(630, y + 18, b, 12, LEISE, anchor="start")
    s.text(230, 270, "Wird ein Server in der DMZ\nübernommen, ist das LAN\nweiter geschützt.", 11.5, LEISE)
    return s


def break_even():
    s = Svg(760, 380, "Break-even: Kauf gegen Miete eines Kopierers")
    x0, y0, bx, by = 80, 320, 600, 260  # Ursprung, Breite, Höhe
    mmax, kmax = 48, 4800
    def P(m, k): return (x0 + m / mmax * bx, y0 - k / kmax * by)
    s.line(x0, y0, x0 + bx + 10, y0, LEISE, 1.4, pfeil=True); s.line(x0, y0, x0, y0 - by - 10, LEISE, 1.4, pfeil=True)
    for m in range(0, 49, 12):
        x, _ = P(m, 0); s.line(x, y0, x, y0 + 5, LEISE); s.text(x, y0 + 18, str(m), 11.5, LEISE)
    for k in range(0, 4801, 1200):
        _, y = P(0, k); s.line(x0 - 5, y, x0, y, LEISE); s.text(x0 - 10, y, f"{k:,}".replace(",", "."), 11.5, LEISE, anchor="end")
        s.line(x0, y, x0 + bx, y, "#333", 1)
    s.text(x0 + bx, y0 + 36, "Monate", 12, LEISE, anchor="end"); s.text(x0 - 10, 40, "Kosten in €", 12, LEISE, anchor="start")
    a, b = P(0, 2400), P(48, 2400 + 20 * 48)
    s.line(*a, *b, BLAU, 3)
    c, d = P(0, 0), P(48, 95 * 48)
    s.line(*c, *d, ORANGE, 3)
    be = P(32, 3040)
    s.circle(*be, 7, ROT, ROT)
    s.line(be[0], be[1], be[0], y0, ROT, 1.4, dash="4 4")
    s.text(be[0] + 12, be[1] + 28, "Break-even\n32 Monate · 3 040 €", 12.5, ROT, 700, "start")
    s.text(P(2, 0)[0], P(0, 2400)[1] - 18, "Kauf: 2 400 € + 20 €/Monat", 12.5, BLAU, 700, "start")
    s.text(P(16, 0)[0] + 10, P(0, 95 * 16)[1] + 16, "Miete: 95 €/Monat", 12.5, ORANGE, 700, "start")
    s.text(380, 24, "2 400 + 20·m = 95·m  →  m = 32", 15, TXT, 700, mono=True)
    s.text(380, 364, "Nutzung kürzer als 32 Monate → Miete günstiger · länger → Kauf günstiger", 12.5, LEISE)
    return s


def magisches_dreieck():
    s = Svg(640, 350, "Magisches Dreieck des Projektmanagements")
    a, b, c = (320, 50), (90, 280), (550, 280)
    s.poly([a, b, c], ROT, ROT, op=0.08, sw=2)
    s.box(250, 18, 140, 40, "Leistung / Qualität", BLAU, BLAU, 13, 700, op=0.35)
    s.box(30, 270, 120, 40, "Zeit", ORANGE, ORANGE, 14, 700, op=0.35)
    s.box(490, 270, 120, 40, "Kosten", GRUEN, GRUEN, 14, 700, op=0.35)
    s.text(320, 190, "Projekt-\nziel", 15, TXT, 700)
    s.text(320, 334, "Ändert sich eine Größe, müssen die anderen angepasst werden.", 12.5, LEISE)
    s.text(150, 150, "mehr Funktionen\n→ mehr Zeit/Geld", 11.5, LEISE)
    s.text(490, 150, "Budget gekürzt\n→ weniger Leistung", 11.5, LEISE)
    return s


def vorgangsknoten():
    s = Svg(760, 280, "Vorgangsknoten im Netzplan mit Beispielwerten")
    x, y, w = 60, 40, 330
    zw = w / 3
    def zelle(xx, yy, ww, hh, t, u, f=BOX):
        s.rect(xx, yy, ww, hh, f, RAND, 0, op=1 if f in (BOX, BOX2) else 0.3)
        s.text(xx + ww / 2, yy + hh / 2 - (9 if u else 0), t, 13, LEISE if u else TXT, 700)
        if u: s.text(xx + ww / 2, yy + hh / 2 + 11, u, 17, TXT, 800)
    zelle(x, y, zw, 56, "FAZ", "2", BLAU); zelle(x + zw, y, zw, 56, "D", "6"); zelle(x + 2 * zw, y, zw, 56, "FEZ", "8", BLAU)
    zelle(x, y + 56, w, 56, "C  Hardware liefern", None, BOX2)
    zelle(x, y + 112, zw, 56, "SAZ", "3", ORANGE); zelle(x + zw, y + 112, zw, 56, "GP", "1", ROT); zelle(x + 2 * zw, y + 112, zw, 56, "SEZ", "9", ORANGE)
    s.rect(x, y, w, 168, "none", LEISE, 6, sw=1.8)
    erk = [(BLAU, "Vorwärtsrechnung", "FEZ = FAZ + D · FAZ = größter FEZ der Vorgänger"),
           (ORANGE, "Rückwärtsrechnung", "SAZ = SEZ − D · SEZ = kleinster SAZ der Nachfolger"),
           (ROT, "Gesamtpuffer", "GP = SAZ − FAZ (= SEZ − FEZ) · GP = 0 → kritischer Pfad"),
           (LEISE, "Freier Puffer", "FP = kleinster FAZ der Nachfolger − eigener FEZ")]
    for i, (f, t, u) in enumerate(erk):
        yy = 52 + i * 44
        s.text(420, yy, t, 13, f, 700, "start"); s.text(420, yy + 18, u, 11.5, TXT, anchor="start")
    s.text(380, 250, "Die Anordnung kann in der Prüfung abweichen – die Legende der Aufgabe gilt.", 12, LEISE, italic=True)
    return s


def ergonomie():
    s = Svg(920, 420, "Ergonomischer Bildschirmarbeitsplatz – Seitenansicht mit Richtwerten")
    boden = 380
    s.line(20, boden, 800, boden, RAND, 2)
    # Tisch
    s.rect(330, 250, 330, 12, BOX2, RAND, 3); s.line(640, 262, 640, boden, RAND, 5); s.line(350, 262, 350, boden, RAND, 5)
    # Monitor
    s.rect(560, 120, 14, 110, "#555", "#777", 3); s.line(567, 230, 567, 250, "#777", 6); s.line(545, 250, 590, 250, "#777", 5)
    # Tastatur
    s.rect(420, 243, 70, 7, "#666", "#777", 2)
    # Stuhl
    s.rect(160, 290, 150, 12, BOX2, RAND, 4); s.line(235, 302, 235, 350, RAND, 6); s.line(180, 360, 290, 360, RAND, 5)
    s.circle(185, 368, 7, "#555", "#777"); s.circle(285, 368, 7, "#555", "#777")
    s.path("M170 290 C150 230 150 200 165 170", RAND, sw=10)
    # Person (Strichfigur)
    kopf = (215, 132)
    s.circle(*kopf, 22, "#444", LEISE, 2)
    s.path("M212 156 L205 285", LEISE, sw=7)                   # Rumpf
    s.path("M208 190 L230 240 L330 240", LEISE, sw=6)          # Arm: Oberarm senkrecht, Unterarm waagrecht
    s.path("M205 285 L330 290 L335 375 L360 375", LEISE, sw=7)  # Bein
    # Blicklinie
    s.line(236, 134, 560, 176, ROT, 1.8, dash="6 5", pfeil=True)
    s.line(236, 134, 560, 128, BLASS, 1.2, dash="3 4")
    s.text(430, 104, "Monitoroberkante auf oder\nleicht unter Augenhöhe", 12, TXT, 600)
    s.text(400, 190, "Sehabstand 50–80 cm", 12.5, ROT, 700)
    s.text(270, 226, "~90°", 12, ORANGE, 700)
    s.text(300, 322, "~90°", 12, ORANGE, 700)
    s.text(372, 346, "Füße flach\nauf dem Boden", 11.5, LEISE, anchor="start")
    # Hinweise rechts
    tipps = ["Blick leicht nach unten (ca. 15–20°)", "Fenster seitlich, Blick parallel zur Fensterfront", "mind. 500 Lux, blendfrei, entspiegeltes Display",
             "Tastatur mit Handballenfläche davor", "Stuhl mit Lordosenstütze, 5 Rollen", "Sitz-Steh-Wechsel, regelmäßige Pausen"]
    s.rect(620, 20, 285, 20 + 22 * len(tipps), BOX, RAND, 10)
    for i, t in enumerate(tipps):
        s.text(632, 40 + i * 22, "• " + t, 11, TXT, anchor="start")
    return s


def vier_seiten():
    s = Svg(760, 350, "Vier-Seiten-Modell einer Nachricht nach Schulz von Thun")
    cx, cy, r = 380, 170, 96
    s.poly([(cx, cy - r), (cx + r, cy), (cx, cy + r), (cx - r, cy)], BOX2, RAND)
    seiten = [((cx, cy - r - 24), "Sachinhalt", "Worüber informiere ich?", BLAU),
              ((cx + r + 16, cy), "Appell", "Wozu will ich dich bringen?", ROT),
              ((cx, cy + r + 24), "Beziehung", "Was halte ich von dir?", GRUEN),
              ((cx - r - 16, cy), "Selbstoffenbarung", "Was gebe ich von mir preis?", ORANGE)]
    for (x, y), t, u, f in seiten:
        anchor = "start" if x > cx + 10 else ("end" if x < cx - 10 else "middle")
        s.text(x, y - 8, t, 14, f, 700, anchor); s.text(x, y + 10, u, 11.5, LEISE, anchor=anchor)
    s.text(cx, cy - 8, "„Der Drucker ist\nschon wieder leer.“", 12.5, TXT, 600)
    s.text(90, 60, "Sender\n(„vier Schnäbel“)", 13, TXT, 700); s.text(670, 60, "Empfänger\n(„vier Ohren“)", 13, TXT, 700)
    s.line(110, 88, 326, 118, LEISE, 1.4, pfeil=True)
    s.line(434, 118, 650, 88, LEISE, 1.4, pfeil=True)
    s.text(380, 334, "Missverständnisse entstehen, wenn Sender und Empfänger unterschiedliche Seiten betonen.", 12, LEISE)
    return s


def eisenhower():
    s = Svg(640, 380, "Eisenhower-Matrix zur Priorisierung")
    x0, y0, w, h = 150, 50, 220, 140
    felder = [(0, 0, "A · sofort selbst erledigen", "Server ausgefallen", ROT), (1, 0, "B · terminieren", "Backupkonzept überarbeiten", BLAU),
              (0, 1, "C · delegieren", "Standard-Passwort-Reset", ORANGE), (1, 1, "D · weglassen", "Newsletter sortieren", BLASS)]
    for cx, cy, t, u, f in felder:
        x, y = x0 + cx * (w + 10), y0 + cy * (h + 10)
        s.rect(x, y, w, h, f, f, 10, op=0.16); s.rect(x, y, w, h, "none", f, 10, sw=1.6)
        s.text(x + w / 2, y + h / 2 - 12, t, 13.5, TXT, 700); s.text(x + w / 2, y + h / 2 + 14, "z. B. " + u, 11.5, LEISE)
    s.text(x0 + w / 2, 34, "dringend", 13, TXT, 700); s.text(x0 + w * 1.5 + 10, 34, "nicht dringend", 13, LEISE, 700)
    s.text(136, y0 + h / 2, "wichtig", 13, TXT, 700, "end"); s.text(136, y0 + h * 1.5 + 10, "nicht\nwichtig", 13, LEISE, 700, "end")
    s.text(320, 366, "Im Service-Desk gilt zusätzlich: Priorität = Auswirkung × Dringlichkeit (SLA-Reaktionszeiten)", 11.5, LEISE)
    return s


BILDER.update({"backup-arten": backup_arten, "regel-3-2-1": regel_321, "verschluesselung": krypto, "dmz": dmz,
               "break-even": break_even, "magisches-dreieck": magisches_dreieck, "vorgangsknoten": vorgangsknoten,
               "ergonomie-arbeitsplatz": ergonomie, "vier-seiten-modell": vier_seiten, "eisenhower-matrix": eisenhower})
