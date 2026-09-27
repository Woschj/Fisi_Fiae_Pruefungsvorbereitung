# Baut Schaubilder (SVG) und Mermaid-Diagramme in die Lernmodule ein. Idempotent über Marker.
import glob, os, re, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", "AP1/10 Lernmodule")


def datei(prefix):
    treffer = [f for f in glob.glob(V + "/*/*.md") if re.search(r"[\\/]" + re.escape(prefix) + r" ", f)]
    assert len(treffer) == 1, (prefix, treffer)
    return treffer[0]


def bild(name, text):
    return f"![[{name}.svg]]\n*Abb.: {text}*\n"


def mermaid(code, text):
    return f"```mermaid\n{code.strip()}\n```\n*Abb.: {text}*\n"


# (Modul, Anker, Position, Block, Kennung) – Position "vor" = vor der Zeile, die mit dem Anker beginnt;
# "nach" = direkt nach der Überschriftenzeile; "ersetze" = ersetzt den ```text-Block direkt nach der Überschrift.
EINBAU = [
    ("N1", "### Das TCP/IP-Modell", "vor", bild("osi-modell", "OSI- und TCP/IP-Modell mit Dateneinheiten, Protokollen und Geräten"), "osi-modell"),
    ("N1", "> [!question]- Kurz nachgedacht: Warum nutzt eine Videokonferenz UDP", "vor", mermaid("""
sequenceDiagram
  participant C as Client
  participant S as Server (Port 443)
  C->>S: SYN (seq = x)
  S->>C: SYN-ACK (seq = y, ack = x+1)
  C->>S: ACK (ack = y+1)
  Note over C,S: Verbindung steht – Daten werden mit Bestätigungen (ACK) übertragen
  C->>S: FIN (Abbau)
  S->>C: ACK + FIN
  C->>S: ACK
""", "TCP-Verbindungsaufbau (3-Way-Handshake) und -abbau"), "tcp-handshake"),
    ("N2", "### Netzadresse per UND-Verknüpfung", "vor", bild("ipv4-subnetz-bits", "Netz- und Hostanteil einer IPv4-Adresse, Netzadresse und Broadcast binär"), "ipv4-subnetz-bits"),
    ("N3", "## 2. Kürzen und Ausschreiben", "vor", bild("ipv6-aufbau", "Aufbau einer IPv6-Adresse mit Präfix, Subnetz-ID und Interface-ID"), "ipv6-aufbau"),
    ("N4", "- **Reservierung:**", "vor", mermaid("""
sequenceDiagram
  participant C as Client (noch ohne IP)
  participant S as DHCP-Server
  C->>S: DHCPDISCOVER (Broadcast, UDP 68 → 67)
  S->>C: DHCPOFFER – 192.168.1.57, Maske, Gateway, DNS
  C->>S: DHCPREQUEST (Broadcast) – „ich nehme .57“
  S->>C: DHCPACK – Lease 8 h
  Note over C: Nach 50 % der Lease: Verlängerung direkt beim Server
""", "DHCP-Ablauf DORA"), "dhcp-dora"),
    ("N4", "| Record | Inhalt | Beispiel |", "vor", mermaid("""
sequenceDiagram
  participant C as Client
  participant R as DNS-Resolver (Firma/Router)
  participant W as Root-Server
  participant T as TLD-Server .de
  participant N as Nameserver beispiel.de
  C->>R: www.beispiel.de? (rekursiv)
  R->>W: www.beispiel.de?
  W-->>R: frag den .de-Server
  R->>T: www.beispiel.de?
  T-->>R: frag ns1.beispiel.de
  R->>N: www.beispiel.de?
  N-->>R: A 203.0.113.10 (TTL 3600)
  R-->>C: 203.0.113.10 – Antwort wird gecacht
""", "DNS-Auflösung: rekursive Anfrage an den Resolver, iterative Anfragen durch die Hierarchie"), "dns-ablauf"),
    ("N5", "## 2. Kupferkabel", "vor", bild("strukturierte-verkabelung", "Strukturierte Verkabelung mit Primär-, Sekundär- und Tertiärbereich"), "strukturierte-verkabelung"),
    ("N5", "## 3. Dämpfung", "vor", bild("rj45-belegung", "RJ45-Belegung nach T568A und T568B"), "rj45-belegung"),
    ("N5", "### PoE (Power over Ethernet)", "vor", bild("netz-buero", "Typisches Büronetz: Firewall, Core-Switch, VLANs für Verwaltung, Server, Gäste und VoIP"), "netz-buero"),
    ("N6", "## 3. Sendeleistung", "vor", bild("wlan-kanaele", "Kanäle im 2,4-GHz-Band – nur 1, 6 und 11 überlappen sich nicht"), "wlan-kanaele"),
    ("H1", "## 5. Grafikkarte", "vor", bild("mainboard", "Mainboard schematisch mit den wichtigsten Steckplätzen"), "mainboard"),
    ("H2", "### Netzwerk und Funk", "vor", bild("anschluesse", "Wichtige Anschlüsse im Vergleich"), "anschluesse"),
    ("H4", "### Welches RAID wofür", "vor", bild("raid-level", "Blockverteilung bei RAID 0, 1, 5, 6 und 10"), "raid-level"),
    ("H5", "## 4. USV", "vor", bild("leistungsdreieck", "Leistungsdreieck: Schein-, Wirk- und Blindleistung"), "leistungsdreieck"),
    ("S3", "### Struktogramm (Nassi-Shneiderman, DIN 66261)", "ersetze", bild("struktogramm", "Struktogramm mit Anweisung, Zählschleife und Verzweigung"), "struktogramm"),
    ("S3", "### Teststufen und Testpyramide", "nach", bild("testpyramide", "Teststufen als Testpyramide"), "testpyramide"),
    ("S5", "### Servicemodelle", "nach", bild("cloud-modelle", "Wer verwaltet was? On-Premises, IaaS, PaaS und SaaS"), "cloud-modelle"),
    ("I3", "### Weitere Verfahren", "vor", bild("backup-arten", "Voll-, differenzielle und inkrementelle Sicherung im Wochenverlauf"), "backup-arten"),
    ("I3", "### 3-2-1-Regel", "nach", bild("regel-3-2-1", "Die 3-2-1-Regel"), "regel-3-2-1"),
    ("I4", "## 4. Hybride Verschlüsselung", "vor", bild("verschluesselung", "Symmetrische und asymmetrische Verschlüsselung im Vergleich"), "verschluesselung"),
    ("I5", "### Weitere Maßnahmen", "vor", bild("dmz", "Netz mit DMZ und Firewall-Regeln zwischen den Zonen"), "dmz"),
    ("W3", "## 3. Darlehen", "vor", bild("break-even", "Break-even-Punkt zwischen Kauf und Miete"), "break-even"),
    ("W4", "## 3. Vertragsarten für IT-Leistungen", "vor", mermaid("""
sequenceDiagram
  participant K as Käufer
  participant V as Verkäufer
  K->>V: Anfrage (unverbindlich)
  V->>K: Angebot = Antrag (verbindlich)
  K->>V: Bestellung = Annahme
  Note over K,V: Kaufvertrag ist geschlossen (zwei übereinstimmende Willenserklärungen)
  V->>K: Auftragsbestätigung (optional, sichert Beweis)
  V->>K: Lieferung + Rechnung (Erfüllung)
  K->>V: Prüfung, Annahme, Zahlung
""", "Zustandekommen und Erfüllung eines Kaufvertrags"), "kaufvertrag"),
    ("W5", "## 5. Ausbildung", "vor", mermaid("""
flowchart TB
  subgraph E["Einliniensystem"]
    GL1[Geschäftsleitung] --> A1[Einkauf]
    GL1 --> A2[IT]
    A2 --> M1[Service Desk]
    A2 --> M2[Systemadministration]
  end
  subgraph S["Stabliniensystem"]
    GL2[Geschäftsleitung] -.- ST[Stab: Datenschutz / Recht]
    GL2 --> B1[Vertrieb]
    GL2 --> B2[IT]
  end
""", "Einlinien- und Stabliniensystem (gestrichelt: Stab ohne Weisungsbefugnis)"), "organigramm"),
    ("P1", "### Magisches Dreieck", "nach", bild("magisches-dreieck", "Das magische Dreieck"), "magisches-dreieck"),
    ("P1", "### Kanban", "vor", mermaid("""
flowchart LR
  PB[Product Backlog] --> SP[Sprint Planning]
  SP --> SB[Sprint Backlog]
  SB --> SPR["Sprint (1–4 Wochen)<br/>mit Daily Scrum"]
  SPR --> INK[Inkrement]
  INK --> REV[Sprint Review]
  REV --> RET[Retrospektive]
  RET -->|nächster Sprint| SP
  REV -.->|Feedback| PB
""", "Der Scrum-Zyklus"), "scrum"),
    ("P2", "## 1. Der Vorgangsknoten", "ersetze", bild("vorgangsknoten", "Vorgangsknoten mit Beispielwerten und den Rechenregeln"), "vorgangsknoten"),
    ("P3", "## 3. Priorisierung", "vor", mermaid("""
flowchart LR
  M["Meldung<br/>Mail, Telefon, Portal"] --> E[Ticket erfassen]
  E --> K[Klassifizieren und priorisieren]
  K --> L{Lösung im 1st Level?}
  L -- ja --> LOES[Lösen / Workaround]
  L -- nein --> ESK["Funktional eskalieren<br/>2nd / 3rd Level"]
  ESK --> LOES
  LOES --> R[Rückmeldung an Melder]
  R --> S[Ticket schließen und dokumentieren]
""", "Ablauf im Incident Management"), "incident"),
    ("P3", "## 4. Service Level Agreement", "vor", bild("eisenhower-matrix", "Eisenhower-Matrix"), "eisenhower-matrix"),
    ("P4", "### Vier-Seiten-Modell (Schulz von Thun)", "nach", bild("vier-seiten-modell", "Vier-Seiten-Modell einer Nachricht"), "vier-seiten-modell"),
    ("P5", "## 2. Der ergonomische Bildschirmarbeitsplatz", "nach", bild("ergonomie-arbeitsplatz", "Richtwerte am ergonomischen Bildschirmarbeitsplatz"), "ergonomie-arbeitsplatz"),
]


def einbauen():
    fehler = 0
    for modul, anker, pos, block, kennung in EINBAU:
        pfad = datei(modul)
        text = open(pfad, encoding="utf8").read()
        marker = f"<!-- abb:{kennung} -->"
        if marker in text:
            continue
        zeilen = text.split("\n")
        idx = next((i for i, z in enumerate(zeilen) if z.startswith(anker)), None)
        if idx is None:
            print("ANKER FEHLT:", modul, anker); fehler += 1; continue
        einfuegen = [marker] + block.rstrip("\n").split("\n") + [""]
        if pos == "vor":
            zeilen[idx:idx] = einfuegen
        elif pos == "nach":
            zeilen[idx + 1:idx + 1] = [""] + einfuegen
        elif pos == "ersetze":
            start = next(i for i in range(idx + 1, len(zeilen)) if zeilen[i].startswith("```text"))
            ende = next(i for i in range(start + 1, len(zeilen)) if zeilen[i].startswith("```"))
            zeilen[start:ende + 1] = einfuegen
        open(pfad, "w", encoding="utf8", newline="\n").write("\n".join(zeilen))
        print("eingebaut:", modul, kennung)
    return fehler


if __name__ == "__main__":
    sys.exit(einbauen())
