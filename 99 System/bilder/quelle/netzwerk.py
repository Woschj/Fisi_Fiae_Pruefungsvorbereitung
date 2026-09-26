from svgkit import *

BILDER = {}


def osi():
    s = Svg(860, 430, "OSI- und TCP/IP-Modell mit PDUs, Protokollen und Geräten")
    spalten = [(20, 50, "Nr."), (74, 190, "OSI-Schicht"), (268, 130, "TCP/IP"), (402, 150, "PDU"), (556, 170, "Protokolle (Beispiele)"), (730, 110, "Geräte")]
    for x, w, t in spalten:
        s.text(x + w / 2, 26, t, 13, LEISE, 600)
    reihen = [
        (7, "Anwendung", "HTTP, DNS, SMTP", "–"),
        (6, "Darstellung", "TLS, JPEG, UTF-8", "–"),
        (5, "Sitzung", "RPC, NetBIOS", "–"),
        (4, "Transport", "TCP, UDP (Ports)", "Firewall (L4)"),
        (3, "Vermittlung", "IPv4, IPv6, ICMP", "Router, L3-Switch"),
        (2, "Sicherung", "Ethernet, WLAN, ARP", "Switch, Bridge, AP"),
        (1, "Bitübertragung", "Kabel, Funk, Stecker", "Hub, Repeater"),
    ]
    farben = {7: LILA, 6: LILA, 5: LILA, 4: BLAU, 3: GRUEN, 2: ORANGE, 1: ROT}
    y0, rh = 44, 52
    for i, (nr, name, prot, ger) in enumerate(reihen):
        y = y0 + i * rh
        f = farben[nr]
        s.box(20, y + 3, 50, rh - 6, str(nr), f, f, 17, 700, op=0.85)
        s.box(74, y + 3, 190, rh - 6, name, f, f, 15, 600, op=0.18)
        s.box(556, y + 3, 170, rh - 6, prot, BOX, RAND, 12.5, 400)
        s.box(730, y + 3, 110, rh - 6, ger, BOX, RAND, 12, 400, fg=LEISE if ger == "–" else TXT)
    # TCP/IP (zusammengefasst) und PDU
    for von, bis, name, pdu, f in [(0, 3, "Anwendung", "Daten", LILA), (3, 4, "Transport", "Segment (TCP)\nDatagramm (UDP)", BLAU),
                                   (4, 5, "Internet", "Paket", GRUEN), (5, 7, "Netzzugang", None, ORANGE)]:
        y = y0 + von * rh + 3; h = (bis - von) * rh - 6
        s.box(268, y, 130, h, name, f, f, 14, 600, op=0.18)
        if pdu:
            s.box(402, y, 150, h, pdu, BOX, RAND, 13, 500)
    s.box(402, y0 + 5 * rh + 3, 150, rh - 6, "Frame", BOX, RAND, 13, 500)
    s.box(402, y0 + 6 * rh + 3, 150, rh - 6, "Bit", BOX, RAND, 13, 500)
    s.text(430, 418, "Merksatz von 1 nach 7: „Bitte Sag Vati Tschüss, Sonst Droht Aufregung“", 12.5, LEISE, italic=True)
    return s


def ipv4_bits():
    s = Svg(900, 330, "IPv4-Adresse 192.168.10.77/26 binär: Netz- und Hostanteil")
    bits_ip = "".join(f"{int(o):08b}" for o in "192.168.10.77".split("."))
    bits_m = "1" * 26 + "0" * 6
    bits_n = bits_ip[:26] + "0" * 6
    bits_b = bits_ip[:26] + "1" * 6
    x0, cw, gap = 124, 18.5, 9
    def xpos(i): return x0 + i * cw + (i // 8) * gap
    s.text(x0 + 16 * cw + 15, 24, "192.168.10.77 / 26", 16, TXT, 700)
    # Kopf: Oktett-Beschriftung
    for o, wert in enumerate(["192", "168", "10", "77"]):
        s.text(xpos(o * 8) + 4 * cw - 1, 52, f"{o + 1}. Oktett = {wert}", 12, LEISE)
    zeilen = [("IP-Adresse", bits_ip), ("Maske /26", bits_m), ("Netzadresse", bits_n), ("Broadcast", bits_b)]
    ergebnisse = ["192.168.10.77", "255.255.255.192", "192.168.10.64", "192.168.10.127"]
    for r, (name, bits) in enumerate(zeilen):
        y = 68 + r * 44
        s.text(x0 - 10, y + 16, name, 13, TXT, 600, "end")
        for i, b in enumerate(bits):
            netz = i < 26
            f = BLAU if netz else GRUEN
            s.box(xpos(i), y, cw - 2, 32, b, f, f, 13, 600, op=0.30 if netz else 0.35, rx=4, mono=True)
        s.text(xpos(31) + cw + 12, y + 16, ergebnisse[r], 13, TXT, 500, "start", mono=True)
    yb = 68 + 4 * 44 + 8
    s.path(f"M{xpos(0)} {yb} v8 H{xpos(25) + cw - 2} v-8", BLAU, sw=2)
    s.text((xpos(0) + xpos(25) + cw) / 2, yb + 24, "26 Bit Netzanteil (Präfix) – bei allen Hosts im Netz gleich", 13, BLAU, 600)
    s.path(f"M{xpos(26)} {yb} v8 H{xpos(31) + cw - 2} v-8", GRUEN, sw=2)
    s.text((xpos(26) + xpos(31) + cw) / 2, yb + 24, "6 Bit Host", 13, GRUEN, 600)
    s.text(450, 306, "Hosts: 2⁶ − 2 = 62 · Netzadresse = alle Hostbits 0 · Broadcast = alle Hostbits 1 · Blockgröße 256 − 192 = 64", 13, LEISE)
    return s


def geraet(s, x, y, w, h, titel, unter, f):
    s.rect(x, y, w, h, f, f, 10, op=0.16)
    s.rect(x, y, w, h, "none", f, 10, sw=1.6)
    s.text(x + w / 2, y + h / 2 - (8 if unter else 0), titel, 13.5, TXT, 650)
    if unter:
        s.text(x + w / 2, y + h / 2 + 11, unter, 11.5, LEISE)


def netz_buero():
    s = Svg(860, 470, "Typisches Büronetz mit Firewall, Core-Switch, VLANs, WLAN und Server")
    # Internet-Wolke
    s.path("M380 70 a28 28 0 0 1 40 -30 a34 34 0 0 1 60 6 a26 26 0 0 1 22 44 z", LEISE, BOX, 1.4)
    s.text(440, 64, "Internet", 14, TXT, 650)
    geraet(s, 360, 110, 160, 50, "Router / Firewall", "NAT · Paketfilter · VPN", ROT)
    s.line(440, 92, 440, 110)
    s.text(530, 100, "öffentliche IP (WAN)", 11.5, LEISE, anchor="start")
    geraet(s, 350, 200, 180, 50, "Core-Switch (L3)", "managed · VLANs · Trunk", BLAU)
    s.line(440, 160, 440, 200)
    s.text(450, 181, "Trunk (802.1Q)", 11.5, LEISE, anchor="start")
    # VLAN-Bereiche
    vlans = [(30, "VLAN 10 · Verwaltung", "192.168.10.0/24", ORANGE), (240, "VLAN 20 · Server", "192.168.20.0/24", GRUEN),
             (450, "VLAN 30 · Gäste-WLAN", "192.168.30.0/24", LILA), (660, "VLAN 40 · VoIP/Drucker", "192.168.40.0/24", TUERKIS)]
    for x, t, n, f in vlans:
        s.rect(x, 290, 180, 160, f, f, 12, op=0.07, dash="5 4")
        s.text(x + 90, 306, t, 12.5, f, 700)
        s.text(x + 90, 322, n, 11, LEISE, mono=True)
        s.path(f"M440 250 V270 H{x + 90} V290", LEISE, sw=1.4)
    geraet(s, 45, 340, 150, 40, "Access-Switch", "PoE", ORANGE)
    geraet(s, 45, 395, 70, 40, "PC", None, ORANGE); geraet(s, 125, 395, 70, 40, "PC", None, ORANGE)
    s.line(80, 380, 80, 395); s.line(160, 380, 160, 395)
    geraet(s, 255, 340, 150, 40, "Fileserver", "RAID · Backup", GRUEN)
    geraet(s, 255, 395, 150, 40, "NAS", "Backup-Ziel", GRUEN)
    geraet(s, 465, 340, 150, 40, "Access Point", "WPA3 · Isolation", LILA)
    s.text(540, 412, "Gäste: nur Internet,\nkein Zugriff aufs LAN", 11.5, LEISE)
    geraet(s, 675, 340, 150, 40, "IP-Telefone", "PoE", TUERKIS)
    geraet(s, 675, 395, 150, 40, "Netzwerkdrucker", None, TUERKIS)
    s.text(770, 130, "Firewall-Regeln\nzwischen den VLANs\n(Default Deny)", 12, LEISE)
    return s


def rj45():
    s = Svg(860, 360, "RJ45-Stecker und Belegung nach T568A und T568B")
    farben = {"orange": "#f08a2a", "gruen": "#2fa85a", "blau": "#3d7ee8", "braun": "#8a5a36"}
    b_norm = [("orange", True), ("orange", False), ("gruen", True), ("blau", False), ("blau", True), ("gruen", False), ("braun", True), ("braun", False)]
    a_norm = [("gruen", True), ("gruen", False), ("orange", True), ("blau", False), ("blau", True), ("orange", False), ("braun", True), ("braun", False)]
    s.add('<defs>' + "".join(
        f'<pattern id="st-{n}" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="10" height="10" fill="#eeeeee"/><rect width="5" height="10" fill="{c}"/></pattern>'
        for n, c in farben.items()) + '</defs>')
    def stecker(x0, titel, belegung, hinweis):
        s.text(x0 + 150, 30, titel, 16, TXT, 700)
        # Steckerkörper (Blick auf die Kontakte, Rastnase hinten)
        s.rect(x0 + 40, 50, 220, 150, "#d9dde2", "#9aa3ad", 12, op=0.18, sw=1.6)
        s.rect(x0 + 50, 60, 200, 38, "#b8c2cc", "#9aa3ad", 4, op=0.25)
        for i, (farbe, gestreift) in enumerate(belegung):
            x = x0 + 58 + i * 24
            s.rect(x, 64, 16, 30, "#d4af37", "#8a7020", 2)   # Kontakt
            fill = f"url(#st-{farbe})" if gestreift else farben[farbe]
            s.add(f'<rect x="{x}" y="104" width="16" height="96" rx="3" fill="{fill}" stroke="#222" stroke-width="0.8"/>')
            s.text(x + 8, 216, str(i + 1), 13, TXT, 700)
        s.text(x0 + 150, 240, "Kontakte oben, Rastnase hinten, Pin 1 links", 11.5, LEISE)
        # Tabelle
        namen = {"orange": "Orange", "gruen": "Grün", "blau": "Blau", "braun": "Braun"}
        for i, (farbe, gestreift) in enumerate(belegung):
            y = 256 + (i // 2) * 20
            x = x0 + 30 + (i % 2) * 140
            s.add(f'<rect x="{x}" y="{y}" width="14" height="14" rx="3" fill="{"url(#st-" + farbe + ")" if gestreift else farben[farbe]}"/>')
            s.text(x + 22, y + 7, f"{i + 1}: {'Weiß-' if gestreift else ''}{namen[farbe]}", 12, TXT, anchor="start")
        s.text(x0 + 150, 344, hinweis, 12, LEISE, italic=True)
    stecker(10, "T568A", a_norm, "Paare 2 (Orange) und 3 (Grün) tauschen die Plätze")
    stecker(440, "T568B (in Deutschland verbreitet)", b_norm, "Beide Enden gleich = Patchkabel (1:1)")
    s.line(430, 40, 430, 330, RAND, 1, dash="4 4")
    return s


def verkabelung():
    s = Svg(860, 490, "Strukturierte Verkabelung: Primär-, Sekundär- und Tertiärbereich")
    s.rect(40, 50, 420, 330, BOX, RAND, 10); s.text(250, 34, "Gebäude A", 14, TXT, 700)
    s.rect(600, 170, 220, 210, BOX, RAND, 10); s.text(710, 154, "Gebäude B", 14, TXT, 700)
    etagen = ["2. OG", "1. OG", "EG"]
    for i, et in enumerate(etagen):
        y = 50 + i * 80
        s.line(40, y + 80, 460, y + 80, RAND, 1)
        s.text(52, y + 14, et, 12, LEISE, 600, "start")
        s.box(140, y + 30, 60, 32, "EV", ORANGE, ORANGE, 13, 700, op=0.3)
        for k in range(3):
            tx = 270 + k * 60
            s.line(200, y + 46, tx, y + 46, BLAU, 2)
            s.box(tx, y + 35, 28, 22, "TA", BLAU, BLAU, 10, 700, op=0.3, rx=4)
    s.text(52, 304, "UG · Technikraum", 12, LEISE, 600, "start")
    s.box(140, 322, 60, 32, "GV", GRUEN, GRUEN, 13, 700, op=0.35)
    s.box(240, 322, 60, 32, "SV", ROT, ROT, 13, 700, op=0.35)
    s.line(200, 338, 240, 338, ROT, 2.4)
    s.path("M110 338 H140 M110 338 V96 H140 M110 176 H140 M110 256 H140", GRUEN, sw=2.4)
    s.path("M300 338 H540 V222 H640", ROT, sw=2.6, dash="8 5")
    s.box(640, 205, 60, 32, "GV", GRUEN, GRUEN, 13, 700, op=0.35)
    s.box(640, 300, 60, 32, "EV", ORANGE, ORANGE, 13, 700, op=0.3)
    s.line(670, 237, 670, 300, GRUEN, 2.4)
    s.line(700, 316, 750, 316, BLAU, 2); s.box(750, 305, 28, 22, "TA", BLAU, BLAU, 10, 700, op=0.3, rx=4)
    leg = [(ROT, "Primär (Campus): Standort-/Gebäudeverteiler ↔ anderes Gebäude · LWL Singlemode, bis 1 500 m", "8 5"),
           (GRUEN, "Sekundär (Steigbereich): Gebäudeverteiler ↔ Etagenverteiler · meist LWL, bis 500 m", None),
           (BLAU, "Tertiär (Etage): Etagenverteiler ↔ Anschlussdose · Kupfer, max. 90 m + 10 m Patchkabel", None)]
    for i, (f, t, d) in enumerate(leg):
        y = 402 + i * 20
        s.line(60, y, 92, y, f, 2.6, dash=d)
        s.text(102, y, t, 12, TXT, anchor="start")
    s.text(430, 476, "SV = Standortverteiler · GV = Gebäudeverteiler · EV = Etagenverteiler · TA = Telekommunikations-Anschlussdose", 11.5, LEISE)
    return s


def ipv6():
    s = Svg(860, 250, "Aufbau einer IPv6-Adresse: Präfix, Subnetz-ID und Interface-ID")
    bloecke = ["2001", "0db8", "85a3", "0010", "0000", "0000", "0000", "0001"]
    x0, bw = 40, 97
    for i, b in enumerate(bloecke):
        f = BLAU if i < 3 else (ORANGE if i == 3 else GRUEN)
        s.box(x0 + i * bw, 50, bw - 8, 42, b, f, f, 17, 600, op=0.28, mono=True)
        if i < 7:
            s.text(x0 + i * bw + bw - 4, 71, ":", 18, LEISE, 700)
    def klammer(i0, i1, t, u, f):
        xa, xb = x0 + i0 * bw, x0 + (i1 + 1) * bw - 8
        s.path(f"M{xa} 104 v8 H{xb} v-8", f, sw=2)
        s.text((xa + xb) / 2, 132, t, 14, f, 700)
        s.text((xa + xb) / 2, 152, u, 12, LEISE)
    klammer(0, 2, "Global Routing Prefix · 48 Bit", "vom Provider zugewiesen (/48)", BLAU)
    klammer(3, 3, "Subnetz-ID", "16 Bit → 65 536 Netze", ORANGE)
    klammer(4, 7, "Interface-ID · 64 Bit", "Host (SLAAC, EUI-64, zufällig, DHCPv6)", GRUEN)
    s.text(430, 24, "8 Blöcke × 16 Bit = 128 Bit · jeder Block 4 Hex-Ziffern", 13, LEISE)
    s.text(430, 190, "Gekürzt: 2001:db8:85a3:10::1", 16, TXT, 600, mono=True)
    s.text(430, 218, "Präfix /64 = Netzanteil (Blau + Orange) · In einem LAN-Segment ist das Präfix immer /64", 12.5, LEISE)
    return s


def wlan_kanaele():
    s = Svg(860, 300, "WLAN 2,4 GHz: Kanäle 1 bis 13 überlappen, nur 1, 6 und 11 sind überlappungsfrei")
    x0, dx = 110, 48
    base = 230
    s.line(40, base, 830, base, LEISE, 1.4)
    for k in range(1, 14):
        x = x0 + (k - 1) * dx + 40
        frei = k in (1, 6, 11)
        f = ROT if frei else BLASS
        breite = dx * 22 / 5 / 2 * 0.95
        s.path(f"M{x - breite} {base} Q{x} {base - (170 if frei else 120)} {x + breite} {base}", f, f, sw=2.2 if frei else 1.1, op=0.14 if frei else 0.03)
        s.text(x, base + 18, str(k), 13, ROT if frei else LEISE, 700 if frei else 400)
        s.text(x, base + 36, f"{2412 + 5 * (k - 1)}", 10, BLASS)
    s.text(430, 24, "2,4-GHz-Band: 5 MHz Kanalabstand, aber 20–22 MHz Kanalbreite", 14, TXT, 650)
    s.text(430, 46, "Rot = überlappungsfreie Kanäle 1 · 6 · 11 – benachbarte Access Points darauf verteilen", 12.5, LEISE)
    s.text(835, base + 36, "MHz", 10, BLASS, anchor="end")
    return s


BILDER.update({"osi-modell": osi, "ipv4-subnetz-bits": ipv4_bits, "netz-buero": netz_buero, "rj45-belegung": rj45,
               "strukturierte-verkabelung": verkabelung, "ipv6-aufbau": ipv6, "wlan-kanaele": wlan_kanaele})
