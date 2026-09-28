---
bereich: Netzwerk
tags: [ap1/aufgaben, ap1/netzwerk]
---
# Aufgaben Netzwerk

Aufgaben im Stil der IHK-Prüfung mit Punkten und Musterlösung. Schwierigkeit: ★ Einstieg · ★★ Prüfungsniveau · ★★★ anspruchsvoll.
**So arbeitest du:** Zeit stoppen (≈ 1 Minute pro Punkt), schriftlich lösen, dann Lösung aufklappen und selbst bewerten. Fehler → [[Fehlerlog]].
Unbegrenzte Rechenaufgaben: [[Trainer#Netzwerk]].

> [!info] Ausgangssituation für alle Aufgaben
> Die **Lindner Haustechnik GmbH** (fiktiv, 60 Mitarbeitende) zieht in ein neues Bürogebäude mit drei Etagen und einer Lagerhalle. Du bist Auszubildende:r im IT-Dienstleister, der die Netzwerkinfrastruktur plant.

---

## N1 Netzwerkgrundlagen und OSI-Modell

### N1.1 ★ – Geräte einordnen (6 Punkte)
📘 **Nachlernen:** [[N5 Verkabelung und Netzwerkkomponenten#5. Netzwerkkomponenten|N5 › Netzwerkkomponenten]] · [[N1 Netzwerkgrundlagen und OSI-Modell#2. Das OSI-Modell|N1 › Das OSI-Modell]]

Ordne die Geräte **Switch, Router, Access Point, Hub, Firewall (Paketfilter), Medienkonverter** jeweils der OSI-Schicht zu, auf der sie hauptsächlich arbeiten.

> [!success]- Lösung
> | Gerät | Schicht |
> |---|---|
> | Switch | 2 – Sicherung (MAC) |
> | Router | 3 – Vermittlung (IP) |
> | Access Point | 2 – Sicherung |
> | Hub | 1 – Bitübertragung |
> | Firewall (Paketfilter) | 3/4 (IP-Adressen und Ports) |
> | Medienkonverter | 1 – Bitübertragung |
> je 1 Punkt

### N1.2 ★★ – Kapselung (6 Punkte)
📘 **Nachlernen:** [[N1 Netzwerkgrundlagen und OSI-Modell#Kapselung (Encapsulation)|N1 › Kapselung]]

Ein Mitarbeiter ruft im Browser `https://shop.lieferant.de` auf. Beschreibe, welche Adressinformationen auf den Schichten 2, 3 und 4 zum Frame hinzugefügt werden und welche davon sich auf dem Weg durch das Internet ändern.

> [!success]- Lösung
> - **Schicht 4 (TCP):** Quellport (zufällig, z. B. 52 311) und **Zielport 443** (2 P)
> - **Schicht 3 (IP):** Quell-IP des PCs und Ziel-IP des Webservers (2 P)
> - **Schicht 2 (Ethernet):** Quell-MAC des PCs und Ziel-MAC des **Gateways** (Router), weil der Server in einem fremden Netz liegt (1 P)
> - **Änderungen:** Die MAC-Adressen werden an jedem Router neu gesetzt. IP-Adressen und Ports bleiben gleich – außer am NAT-Router, der die private Quell-IP (und ggf. den Quellport) durch seine öffentliche ersetzt. (1 P)

### N1.3 ★★ – TCP oder UDP? (4 Punkte)
📘 **Nachlernen:** [[N1 Netzwerkgrundlagen und OSI-Modell#3. Transportschicht – TCP und UDP|N1 › Transportschicht – TCP und UDP]]

Für die Telefonanlage soll entschieden werden, ob Sprachdaten per TCP oder UDP übertragen werden. Begründe die Wahl mit zwei Argumenten.

> [!success]- Lösung
> **UDP**, weil …
> - bei Echtzeitsprache **geringe Verzögerung** wichtiger ist als Vollständigkeit – eine erneut gesendete Sprachprobe käme zu spät und wäre nutzlos (2 P);
> - UDP **weniger Overhead** (kein Verbindungsaufbau, keine Bestätigungen) hat und so Bandbreite und Latenz spart (2 P).

### N1.4 ★★ – Hex-Header lesen (6 Punkte)
📘 **Nachlernen:** [[N1 Netzwerkgrundlagen und OSI-Modell#4. Hex-Werte in Paketheadern lesen|N1 › Hex-Werte in Paketheadern lesen]] · [[S1 Zahlensysteme und Codierung#Beliebig → Dezimal – Stellenwerte addieren|S1 › Beliebig → Dezimal – Stellenwerte addieren]]

Ein Wireshark-Mitschnitt zeigt im IP-Header die Quelladresse `0a 00 14 65` und im TCP-Header den Zielport `0d 3d`.
a) Bestimme die IP-Adresse. b) Bestimme den Port und den zugehörigen Dienst.

> [!success]- Lösung
> a) 0a = 10, 00 = 0, 14 = 1·16+4 = 20, 65 = 6·16+5 = 101 → **10.0.20.101** (4 P)
> b) 0x0d3d = 13·256 + 3·16 + 13 = 3328 + 48 + 13 = **3389** → **RDP** (Remotedesktop) (2 P)

### N1.5 ★★ – Systematische Fehlersuche (6 Punkte)
📘 **Nachlernen:** [[N1 Netzwerkgrundlagen und OSI-Modell#5. Systematische Fehlersuche|N1 › Systematische Fehlersuche]] · [[N4 Netzwerkdienste und Protokolle#8. Diagnosebefehle|N4 › Diagnosebefehle]]

Eine Sachbearbeiterin meldet: „Mein PC hat kein Netzwerk mehr.“ Beschreibe ein systematisches Vorgehen mit mindestens vier Prüfschritten und nenne jeweils ein Werkzeug.

> [!success]- Lösung (Beispiel, bottom-up)
> 1. **Schicht 1:** Kabel gesteckt, Link-LED an der Netzwerkkarte/Switchport? – Sichtprüfung, Kabeltester, Ersatzkabel
> 2. **Schicht 2:** Switchport aktiv und im richtigen VLAN? – Switch-Weboberfläche
> 3. **Schicht 3:** IP-Konfiguration korrekt (keine 169.254.x.x)? Gateway erreichbar? – `ipconfig /all`, `ping <Gateway>`
> 4. **Schicht 7:** Namensauflösung funktioniert? – `nslookup`, `ping` auf IP vs. Name
> Dokumentation im Ticket. (je Schritt 1,5 P)

---

## N2 IPv4 und Subnetting

### N2.1 ★★ – Subnetze für Abteilungen (10 Punkte)
📘 **Nachlernen:** [[N2 IPv4 und Subnetting#5. Nach Hostanzahl planen (VLSM)|N2 › Nach Hostanzahl planen]]

Für das Firmennetz steht `192.168.50.0/24` zur Verfügung. Es werden benötigt:
Verwaltung **55** Geräte · Technik **24** Geräte · Lager **10** Geräte · Server **6** Geräte · Verbindung Router–Firewall **2** Adressen.
Plane die Netze per VLSM lückenlos ab `192.168.50.0`. Gib jeweils Präfix, Netzadresse und Broadcast an.

> [!success]- Lösung
> Sortiert: Verwaltung 55 → Technik 24 → Lager 10 → Server 6 → Link 2
>
> | Netz | Bedarf | Präfix (Hosts) | Netzadresse | Broadcast |
> |---|---|---|---|---|
> | Verwaltung | 55 | /26 (62) | 192.168.50.0 | 192.168.50.63 |
> | Technik | 24 | /27 (30) | 192.168.50.64 | 192.168.50.95 |
> | Lager | 10 | /28 (14) | 192.168.50.96 | 192.168.50.111 |
> | Server | 6 | /29 (6) | 192.168.50.112 | 192.168.50.119 |
> | Link | 2 | /30 (2) | 192.168.50.120 | 192.168.50.123 |
> je Zeile 2 P. Hinweis: Beim Server-Netz passen genau 6 Hosts – in der Praxis besser /28 wählen, um Reserve zu haben (Zusatzpunkt für diese Begründung).

### N2.2 ★★ – Konfigurationsfehler finden (6 Punkte)
📘 **Nachlernen:** [[N2 IPv4 und Subnetting#3. Die Blockgrößen-Methode (ohne Binärrechnung)|N2 › Die Blockgrößen-Methode]] · [[N2 IPv4 und Subnetting#Typische Fehlkonfigurationen|N2 › Typische Fehlkonfigurationen]]

Ein PC ist konfiguriert mit: IP `192.168.50.70`, Maske `255.255.255.192`, Gateway `192.168.50.1`, DNS `192.168.50.1`.
a) Erkläre, warum der PC nicht ins Internet kommt. b) Korrigiere die Konfiguration passend zu N2.1 (Technik-Netz).

> [!success]- Lösung
> a) Mit /26 liegt der PC im Netz **192.168.50.64/26** (Hosts .65–.126). Das Gateway `192.168.50.1` liegt im Netz .0/26 – also **nicht im eigenen Subnetz** und damit nicht direkt erreichbar. (3 P)
> b) Technik-Netz ist **192.168.50.64/27**: Maske **255.255.255.224**, IP z. B. 192.168.50.70 kann bleiben, Gateway = Router-Adresse im Technik-Netz, z. B. **192.168.50.65**, DNS entsprechend erreichbar (z. B. Server im Server-Netz). (3 P)

### N2.3 ★★★ – Wachstum einplanen (6 Punkte)
📘 **Nachlernen:** [[N2 IPv4 und Subnetting#5. Nach Hostanzahl planen (VLSM)|N2 › Nach Hostanzahl planen]] · [[N2 IPv4 und Subnetting#Tabelle zum Nachschlagen|N2 › Tabelle zum Nachschlagen]]

Die Firma will in zwei Jahren um 50 % wachsen. Prüfe, ob die Planung aus N2.1 dann noch ausreicht, und schlage eine Alternative vor.

> [!success]- Lösung
> Verwaltung 55 × 1,5 ≈ **83** → /26 (62) reicht **nicht** mehr, /25 nötig. Technik 36 → /27 (30) reicht nicht, /26 nötig. Lager 15 → /28 (14) reicht knapp nicht, /27 nötig.
> Summe neu: 128 + 64 + 32 + 16 (Server /28) + 4 = 244 → passt gerade noch in ein /24, aber ohne Reserve. (3 P)
> **Alternative:** größeren privaten Bereich nutzen, z. B. `10.10.0.0/16` und je Abteilung ein /24 (254 Hosts) – übersichtlich (3. Oktett = Abteilung/VLAN-ID) und genug Reserve. (3 P)

### N2.4 ★ – Private Adressen (4 Punkte)
📘 **Nachlernen:** [[N2 IPv4 und Subnetting#2. Besondere Adressen|N2 › Besondere Adressen]] · [[N4 Netzwerkdienste und Protokolle#4. NAT – viele private Adressen, eine öffentliche|N4 › NAT – viele private Adressen, eine öffentliche]]

Nenne die drei privaten IPv4-Bereiche und erkläre, wie Geräte mit privaten Adressen trotzdem ins Internet gelangen.

> [!success]- Lösung
> `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` (3 P) · Der Router übersetzt per **NAT/PAT** die private Quelladresse in seine öffentliche IP und merkt sich die Zuordnung über Ports (1 P).

---

## N3 IPv6

### N3.1 ★ – Adressen kürzen (4 Punkte)
📘 **Nachlernen:** [[N3 IPv6#2. Kürzen und Ausschreiben|N3 › Kürzen und Ausschreiben]]

Kürze regelkonform: a) `2001:0db8:0000:0042:0000:0000:0000:0100` b) `fd00:0000:0000:0000:0000:0000:0000:0001`

> [!success]- Lösung
> a) **`2001:db8:0:42::100`** (längste Null-Folge = Blöcke 5–7; `0100` → `100`, nicht `1`) (2 P)
> b) **`fd00::1`** (2 P)

### N3.2 ★★ – Adresstypen (6 Punkte)
📘 **Nachlernen:** [[N3 IPv6#3. Adresstypen|N3 › Adresstypen]]

Ein Server hat die Adressen `fe80::5054:ff:fe12:3456`, `fd12:3456:789a::10` und `2a01:4f8:1:2::10`. Ordne jeweils den Adresstyp zu und erkläre den Einsatzzweck.

> [!success]- Lösung
> - `fe80::…` → **Link-Local**: automatisch, nur im lokalen Segment gültig (z. B. Neighbor Discovery, Router-Kommunikation), nicht geroutet (2 P)
> - `fd12:…` → **Unique Local (ULA)**: private Adresse für interne Dienste, nicht im Internet geroutet (2 P)
> - `2a01:…` → **Global Unicast**: öffentlich erreichbare Adresse (2 P)

### N3.3 ★★ – Präfix planen (6 Punkte)
📘 **Nachlernen:** [[N3 IPv6#5. Subnetting mit IPv6|N3 › Subnetting mit IPv6]]

Die Firma erhält vom Provider `2001:db8:4c00::/48`. Jedes der bis zu 200 VLANs soll ein /64 bekommen.
a) Wie viele /64-Netze stehen zur Verfügung? b) Gib die Präfixe für VLAN 10 und VLAN 200 an, wenn die VLAN-ID hexadezimal im 4. Block steht.

> [!success]- Lösung
> a) 2^(64−48) = **65 536** (2 P)
> b) VLAN 10 = 0x000a → **`2001:db8:4c00:a::/64`** · VLAN 200 = 0x00c8 → **`2001:db8:4c00:c8::/64`** (je 2 P)

### N3.4 ★★ – Vorteile (4 Punkte)
📘 **Nachlernen:** [[N3 IPv6#6. Vorteile und Besonderheiten|N3 › Vorteile und Besonderheiten]]

Die Geschäftsführung fragt, warum IPv6 eingeführt werden soll. Erläutere zwei Vorteile.

> [!success]- Lösung (zwei davon)
> - **Riesiger Adressraum** – kein NAT nötig, jedes Gerät kann Ende-zu-Ende erreichbar sein; der Provider-Engpass bei IPv4 (CGNAT) entfällt.
> - **Autokonfiguration (SLAAC)** – Geräte konfigurieren sich selbst, weniger Verwaltungsaufwand.
> - **Effizienteres Routing** durch einfacheren Header und hierarchische Präfixe.
> - **Multicast statt Broadcast** – weniger Last im Netz.

---

## N4 Netzwerkdienste und Protokolle

### N4.1 ★ – Ports (6 Punkte)
📘 **Nachlernen:** [[N4 Netzwerkdienste und Protokolle#5. Wichtige Ports|N4 › Wichtige Ports]]

Die Firewall soll nur die nötigsten Dienste nach außen erlauben. Ordne zu: Webseiten verschlüsselt aufrufen · Namensauflösung · verschlüsselt Mails abrufen (IMAP) · Mails an den Provider einliefern · sichere Fernwartung eines Linux-Servers · Zeitsynchronisation.

> [!success]- Lösung
> HTTPS **443/TCP** · DNS **53/UDP (+TCP)** · IMAPS **993/TCP** · SMTP-Submission **587/TCP** (oder SMTPS 465) · SSH **22/TCP** · NTP **123/UDP** (je 1 P)

### N4.2 ★★ – DHCP (6 Punkte)
📘 **Nachlernen:** [[N4 Netzwerkdienste und Protokolle#2. DHCP – automatische Adressvergabe|N4 › DHCP – automatische Adressvergabe]]

a) Beschreibe den Ablauf, mit dem ein neuer PC eine IP-Adresse erhält. b) Die Drucker sollen immer dieselbe Adresse bekommen, aber zentral verwaltet werden. Nenne eine Lösung.

> [!success]- Lösung
> a) **Discover** (Client sucht per Broadcast einen Server) → **Offer** (Server bietet Adresse an) → **Request** (Client fordert die Adresse an, per Broadcast) → **Acknowledge** (Server bestätigt, Lease beginnt). Mitgeliefert werden Maske, Gateway, DNS, Lease-Dauer. (4 P)
> b) **DHCP-Reservierung**: Die MAC-Adresse des Druckers wird im DHCP-Server einer festen IP zugeordnet. (2 P)

### N4.3 ★★ – DNS (5 Punkte)
📘 **Nachlernen:** [[N4 Netzwerkdienste und Protokolle#3. DNS – Namen in Adressen auflösen|N4 › DNS – Namen in Adressen auflösen]] · [[N4 Netzwerkdienste und Protokolle#6. E-Mail – SMTP, IMAP, POP3|N4 › E-Mail – SMTP, IMAP, POP3]]

Der neue Mailserver `mail.lindner-ht.de` hat die IP `203.0.113.25`. Welche zwei DNS-Einträge sind nötig, damit Mails an `@lindner-ht.de` zugestellt werden? Nenne außerdem einen Eintrag gegen gefälschte Absender.

> [!success]- Lösung
> - **A-Record**: `mail.lindner-ht.de → 203.0.113.25` (2 P)
> - **MX-Record**: `lindner-ht.de → 10 mail.lindner-ht.de` (2 P)
> - **TXT-Record für SPF** (oder DKIM/DMARC), der festlegt, welche Server im Namen der Domain senden dürfen (1 P)

### N4.4 ★★ – IMAP oder POP3? (4 Punkte)
📘 **Nachlernen:** [[N4 Netzwerkdienste und Protokolle#6. E-Mail – SMTP, IMAP, POP3|N4 › E-Mail – SMTP, IMAP, POP3]]

Die Außendienstmitarbeitenden rufen Mails mit Smartphone und Notebook ab. Empfiehl ein Protokoll und begründe.

> [!success]- Lösung
> **IMAP (über TLS, Port 993)**: Die Mails bleiben auf dem Server, Ordner und Gelesen-Status werden **synchronisiert** – alle Geräte zeigen denselben Stand (2 P). Bei POP3 würden Mails auf ein Gerät heruntergeladen und fehlten auf dem anderen; außerdem wären sie bei Verlust des Geräts weg (2 P).

### N4.5 ★★★ – Webshop veröffentlichen (6 Punkte)
📘 **Nachlernen:** [[N4 Netzwerkdienste und Protokolle#4. NAT – viele private Adressen, eine öffentliche|N4 › NAT – viele private Adressen, eine öffentliche]] · [[I5 Bedrohungen und Schutzmaßnahmen#Firewall|I5 › Firewall]]

Ein Webserver (`192.168.60.10`) soll aus dem Internet erreichbar sein. Beschreibe die nötige Einrichtung am Router und eine sicherere Alternative.

> [!success]- Lösung
> - **Portweiterleitung** am Router: eingehend TCP 443 → 192.168.60.10:443 (NAT verhindert sonst den Zugriff von außen) (2 P)
> - DNS: A-Record der Domain auf die öffentliche IP (1 P)
> - **Sicherer:** Server in eine **DMZ** (eigenes Netz zwischen zwei Firewall-Zonen) stellen, damit ein kompromittierter Webserver keinen direkten Zugriff aufs interne Netz hat; nur 443 freigeben, Updates, TLS-Zertifikat (3 P)

---

## N5 Verkabelung und Netzwerkkomponenten

### N5.1 ★★ – Verkabelung planen (8 Punkte)
📘 **Nachlernen:** [[N5 Verkabelung und Netzwerkkomponenten#1. Strukturierte Verkabelung (EN 50173 / ISO/IEC 11801)|N5 › Strukturierte Verkabelung]] · [[N5 Verkabelung und Netzwerkkomponenten#4. Glasfaser (Lichtwellenleiter, LWL)|N5 › Glasfaser]] · [[N5 Verkabelung und Netzwerkkomponenten#Kategorien und Klassen|N5 › Kategorien und Klassen]]

Das Gebäude hat drei Etagen, der Serverraum liegt im Erdgeschoss, die Lagerhalle steht 250 m entfernt.
a) Nenne für Primär-, Sekundär- und Tertiärbereich je ein geeignetes Medium und begründe. b) Wie lang darf das Kabel von der Etagenverteilung zur Dose höchstens sein?

> [!success]- Lösung
> a) **Primär** (Gebäude ↔ Lagerhalle, 250 m): **Glasfaser Singlemode** (oder OM4 Multimode bis ca. 400 m bei 10G) – Länge über 100 m, kein Potenzialausgleich nötig, störfest. (2 P)
> **Sekundär** (Etagen): **Glasfaser Multimode (OM3/OM4)** – hohe Bandbreite für Uplinks. (2 P)
> **Tertiär** (Etage → Dose): **Cat 6A S/FTP oder U/FTP** – 10 Gbit/s auf 100 m, zukunftssicher, PoE-tauglich. (2 P)
> b) **90 m** Verlegekabel (+ max. 10 m Patchkabel = 100 m Kanal). (2 P)

### N5.2 ★★ – Dämpfung (6 Punkte)
📘 **Nachlernen:** [[N5 Verkabelung und Netzwerkkomponenten#3. Dämpfung, Pegel und Übersprechen (dB-Rechnung)|N5 › Dämpfung, Pegel und Übersprechen]] · [[N5 Verkabelung und Netzwerkkomponenten#Übersprechen (Crosstalk)|N5 › Übersprechen]]

Eine Kupferstrecke besteht aus Patchkabel (0,8 dB), Verlegekabel (7,4 dB), zwei Steckverbindungen (je 0,2 dB) und einem zweiten Patchkabel (0,6 dB).
a) Berechne die Gesamtdämpfung. b) Am Eingang liegen 2 V an – wie groß ist die Ausgangsspannung? c) NEXT = 38 dB – wie groß ist der ACR?

> [!success]- Lösung
> a) 0,8 + 7,4 + 0,2 + 0,2 + 0,6 = **9,2 dB** (2 P)
> b) U_aus = 2 V / 10^(9,2/20) = 2 / 2,884 = **0,69 V** (2 P)
> c) ACR = 38 − 9,2 = **28,8 dB** (2 P)

### N5.3 ★★ – Switch auswählen (8 Punkte)
📘 **Nachlernen:** [[N5 Verkabelung und Netzwerkkomponenten#Switch-Kennzahlen (Datenblatt)|N5 › Switch-Kennzahlen]] · [[N5 Verkabelung und Netzwerkkomponenten#PoE (Power over Ethernet)|N5 › PoE]] · [[N5 Verkabelung und Netzwerkkomponenten#VLAN (IEEE 802.1Q)|N5 › VLAN]]

Pro Etage werden 30 Arbeitsplätze (je PC + IP-Telefon an einer Dose über Telefon-Durchschleifung), 4 Access Points und 2 Drucker angeschlossen. Uplink per Glasfaser.
Nenne vier Anforderungen an den Etagenswitch und begründe sie.

> [!success]- Lösung (je 2 P)
> - **Portanzahl**: 30 + 4 + 2 = 36 → **48-Port**-Switch (Reserve).
> - **PoE+ (802.3at)** mit ausreichendem **PoE-Budget**: Telefone (je ~7 W) und Access Points (je bis 30 W) → mind. 30 × 7 + 4 × 30 = 330 W.
> - **SFP+-Uplinks** (10 Gbit/s) für die Glasfaseranbindung an den Kernswitch.
> - **Managed** mit **VLAN-Unterstützung (802.1Q)** für Trennung von Daten, VoIP, Gästen; QoS für Telefonie.

### N5.4 ★★ – VLANs begründen (6 Punkte)
📘 **Nachlernen:** [[N5 Verkabelung und Netzwerkkomponenten#VLAN (IEEE 802.1Q)|N5 › VLAN]]

Die Geschäftsführung fragt, warum man VLANs einrichten soll, statt „alles in ein Netz“ zu hängen. Erläutere drei Vorteile.

> [!success]- Lösung
> - **Sicherheit**: Gäste, Verwaltung, Server und Produktion sind logisch getrennt; Übergänge nur über Router/Firewall mit Regeln. (2 P)
> - **Kleinere Broadcast-Domänen** → weniger Grundlast, bessere Performance. (2 P)
> - **Flexibilität**: Arbeitsplätze wechseln durch Umkonfiguration des Ports statt Umverkabelung; **QoS** für Telefonie im Voice-VLAN. (2 P)

---

## N6 WLAN

### N6.1 ★★ – WLAN für Büro und Lager (8 Punkte)
📘 **Nachlernen:** [[N6 WLAN#1. Standards|N6 › Standards]] · [[N6 WLAN#2. Frequenzbänder und Kanäle|N6 › Frequenzbänder und Kanäle]] · [[N6 WLAN#3. Sendeleistung, Empfang und Planung|N6 › Sendeleistung, Empfang und Planung]]

In den Büros sollen 45 Notebooks, in der Lagerhalle Handscanner (nur 2,4 GHz) per WLAN arbeiten.
a) Empfiehl Standard und Frequenzbänder. b) Wie verteilst du Kanäle im 2,4-GHz-Band auf benachbarte Access Points? c) Begründe, warum mehrere Access Points besser sind als einer mit maximaler Sendeleistung.

> [!success]- Lösung
> a) **Wi-Fi 6/6E (802.11ax)**: Büro vorzugsweise **5 GHz** (bzw. 6 GHz) wegen Kapazität und vieler Kanäle; Lager **2,4 GHz**, weil die Scanner es brauchen und die Reichweite in der Halle besser ist. (3 P)
> b) Überlappungsfrei im Wechsel **1 – 6 – 11**. (2 P)
> c) WLAN ist ein geteiltes Medium – mehr APs verteilen die Clients (mehr Gesamtkapazität), bessere Signalqualität überall; hohe Sendeleistung hilft nicht, weil die Clients mit geringer Leistung zurücksenden müssen, und stört Nachbarzellen. (3 P)

### N6.2 ★★ – Sicherheit (6 Punkte)
📘 **Nachlernen:** [[N6 WLAN#4. WLAN-Sicherheit|N6 › WLAN-Sicherheit]]

Bisher nutzen alle Mitarbeitenden ein WPA2-Passwort, das seit Jahren nicht geändert wurde. Beurteile die Situation und schlage eine bessere Lösung vor.

> [!success]- Lösung
> - Problem: Das Passwort kennen auch **ehemalige** Mitarbeitende; bei Wechsel müssten alle Geräte neu eingerichtet werden; WPA2-PSK ist per Wörterbuchangriff angreifbar. (2 P)
> - Lösung: **WPA2/WPA3-Enterprise (802.1X)** mit **RADIUS**-Server angebunden an das Active Directory – jeder meldet sich mit eigenem Konto oder Zertifikat an (EAP-TLS/PEAP), Konten sind einzeln sperrbar, Anmeldungen werden protokolliert. (4 P)

### N6.3 ★★ – Gäste-WLAN (6 Punkte)
📘 **Nachlernen:** [[N6 WLAN#Weitere Maßnahmen|N6 › Weitere Maßnahmen]]

Kunden im Besprechungsraum sollen ins Internet. Beschreibe drei technische Maßnahmen.

> [!success]- Lösung (je 2 P)
> - **Eigene SSID in eigenem VLAN**; die **Firewall** erlaubt nur Internet, keinen Zugriff aufs Firmennetz.
> - **Client-Isolation**, damit sich Gästegeräte nicht gegenseitig erreichen.
> - **Captive Portal/Voucher** mit zeitlich begrenztem Zugang und Nutzungsbedingungen; **Bandbreitenbegrenzung**.

### N6.4 ★★ – Fehlersuche (4 Punkte)
📘 **Nachlernen:** [[N6 WLAN#5. Fehlersuche im WLAN|N6 › Fehlersuche im WLAN]]

In einem Besprechungsraum zeigt das Notebook volle Signalstärke, die Übertragung ist aber sehr langsam. Nenne zwei mögliche Ursachen mit passender Maßnahme.

> [!success]- Lösung (je 2 P)
> - **Kanalüberlappung** mit Nachbar-WLANs → freien Kanal wählen bzw. ins 5-/6-GHz-Band wechseln.
> - **Zu viele Clients** an einem AP → zusätzlichen AP installieren, Band Steering.
> - Alte Clients (802.11g/n) bremsen die Zelle → Mindest-Datenrate anheben, alte Geräte tauschen.

---

## N7 Internet und Webanwendungen

### N7.1 ★★ – Website der Lindner Haustechnik (10 Punkte)
📘 **Nachlernen:** [[N7 Internet und Webanwendungen#3. Statische und dynamische Websites|N7 › Statische und dynamische Websites]] · [[N7 Internet und Webanwendungen#5. Webserver, Hosting und CMS|N7 › Webserver, Hosting und CMS]] · [[N7 Internet und Webanwendungen#6. Anforderungen an eine Firmenwebsite|N7 › Anforderungen an eine Firmenwebsite]]

Die Lindner Haustechnik GmbH hat eine statische Website aus sechs HTML-Seiten. Künftig sollen die Mitarbeitenden Öffnungszeiten und Neuigkeiten selbst pflegen, und Kundinnen und Kunden sollen online Wartungstermine anfragen können.
a) Erkläre den Unterschied zwischen einer statischen und einer dynamischen Website. b) Nenne drei Sprachen, mit denen die dynamische Terminanfrage serverseitig umgesetzt werden kann. c) Empfiehl eine Lösung für die Pflege der Inhalte und nenne einen Vor- und einen Nachteil. d) Nenne zwei rechtliche Pflichtangaben bzw. Anforderungen an die Website.

> [!success]- Lösung
> a) **Statisch:** fertige HTML-Dateien, für alle gleich, Änderung nur durch Bearbeiten der Dateien. **Dynamisch:** Inhalte werden bei jedem Aufruf **auf dem Server erzeugt**, meist aus einer Datenbank; Formulare und Logins möglich. (3 P)
> b) z. B. **PHP, Python, Java**, C#, JavaScript mit Node.js (je 1 P, max. 3 P)
> c) **CMS** wie WordPress oder TYPO3: Vorteil – Pflege über die Weboberfläche ohne HTML-Kenntnisse; Nachteil – regelmäßige Updates von Kern und Plugins nötig, sonst Sicherheitslücken. (2 P)
> d) z. B. **Impressum** (Name, Anschrift, E-Mail/Telefon, Handelsregister, USt-IdNr.) · **Datenschutzerklärung** (Terminformular, Server-Logs, Cookies) · Einwilligung für nicht notwendige Cookies · HTTPS · Barrierefreiheit (je 1 P, max. 2 P)

### N7.2 ★ – URL und Seitenaufruf (6 Punkte)
📘 **Nachlernen:** [[N7 Internet und Webanwendungen#1. Aufbau einer URL|N7 › Aufbau einer URL]] · [[N7 Internet und Webanwendungen#2. Was passiert beim Aufruf einer Website|N7 › Was passiert beim Aufruf einer Website]]

Eine Kundin ruft `https://www.lindner-haustechnik.de/service/anfrage.php?techniker=2#formular` auf.
a) Benenne die Bestandteile der URL. b) Beschreibe in vier Schritten, was vom Eingeben der Adresse bis zur Anzeige passiert.

> [!success]- Lösung
> a) `https` Protokoll · `www.lindner-haustechnik.de` Host (Subdomain, Domain, TLD) · `/service/anfrage.php` Pfad · `?techniker=2` Query-String/Parameter · `#formular` Fragment/Sprungmarke (3 P)
> b) 1. **DNS** löst den Namen in eine IP-Adresse auf · 2. **TCP-Verbindung** zu Port 443 und **TLS-Handshake** · 3. Browser sendet eine **HTTP-GET-Anfrage**, der Server führt das PHP-Skript aus und antwortet mit HTML (Status 200) · 4. Browser lädt CSS, Bilder, Skripte nach und **stellt die Seite dar** (3 P)


Bereich: [[Übersicht Netzwerk]]
