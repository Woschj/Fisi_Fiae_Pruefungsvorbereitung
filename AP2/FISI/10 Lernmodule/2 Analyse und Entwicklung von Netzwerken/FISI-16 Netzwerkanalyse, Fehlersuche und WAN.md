---
modul: FISI-16
titel: Netzwerkanalyse, Fehlersuche und WAN
bereich: Netzwerke
pruefungsteil: "AP2 Teil 2 – Analyse und Entwicklung von Netzwerken"
reihenfolge: 16
dauer: 150
status: neu
sicherheit: 0
zuletzt:
tags: [ap2/modul, ap2/fisi]
---
# FISI-16 · Netzwerkanalyse, Fehlersuche und WAN

> [!abstract] Überblick
> **Bereich:** [[Übersicht FISI Netzwerke]]
> **Prüfung:** „Analyse und Entwicklung von Netzwerken“ – der Name ist Programm: fast jede Prüfung hat einen **Paketmitschnitt** oder eine **Befehlsausgabe** zum Auswerten
> **Dauer:** ca. 150 min · **Prüfungsrelevanz:** ★★★ – Netzwerkmitschnitte und Erreichbarkeitsprobleme analysieren, Übertragungsraten berechnen, WAN-Angebote vergleichen sowie MitM- und ARP-Poisoning-Angriffe einordnen.
> **Grundlagen aus AP1:** [[N1 Netzwerkgrundlagen und OSI-Modell]] · [[N4 Netzwerkdienste und Protokolle]] · [[H3 Datenmengen und Übertragung]]

## Lernziele
- [ ] Ich gehe bei der Fehlersuche systematisch von Schicht 1 bis 7 vor und kenne die Werkzeuge.
- [ ] Ich werte Ausgaben von `ipconfig /all`, `ping`, `tracert` und einen Paketmitschnitt aus (DNS, ICMP, TTL/Hop Limit, ARP, DHCP).
- [ ] Ich erkenne Man-in-the-Middle und ARP-Poisoning im Mitschnitt und kenne Gegenmaßnahmen.
- [ ] Ich kann Monitoring per SNMP (Polling, Traps) und einen Monitoring-Port (SPAN) erklären.
- [ ] Ich berechne Übertragungszeiten mit Overhead sowie Bandbreiten für VoIP, Video und IoT.
- [ ] Ich vergleiche WAN-Anbindungen (FTTH, GPON, VDSL, LTE, Business-SLA) und die Verfügbarkeit redundanter Leitungen.

## So wird das geprüft
> [!info] Typische AP2-Aufgabentypen
> - **Mitschnitt auswerten:** DNS-Anfrage/-Antwort finden, IPv4-/IPv6-Adressen von Client und DNS-Server, lokale (ULA) und öffentliche Adresse, **Hop Limit 128 − 118 = 10 Router**; DHCP-Parameter aus Mitschnitt vs. `ipconfig /all`.
> - **ping scheitert, Webseite geht:** ICMP gesperrt; **tracert-Sterne** und wechselnde Routen; **Webserver liefert 403/404**; **100 Mbit/s statt 1 Gbit/s**.
> - **APIPA/Adresskonflikt**, falscher DNS-Server, Client im falschen VLAN.
> - **Monitoring:** Datentypen der Messwerte, Polling-Nachteil, **Trap**, **Monitoring-Port und ARP-Poisoning**, auffälliger Switchport.
> - **Rechnen:** Upload-Zeit einer Datei bei 16 Mbit/s, 15 GiB mit 10 % Overhead bei 250 Mbit/s, **VoIP-Bandbreite** mit Overhead, Videokonferenz auf ADSL, **MQTT-Datenrate**, **Verfügbarkeit zweier Leitungen** 1 − 0,01 × 0,01.
> - **WAN:** Geschäftskundentarif, **GPON als Shared Medium**, **LTE mit CGN**, Latenz, **QoS**.

---

## 1. Systematische Fehlersuche

**Von unten nach oben** (OSI-Modell) – oder von der Vergleichsstation aus („Geht es bei anderen?“):

| Schicht | Prüfen | Werkzeuge |
|---|---|---|
| 1 Bitübertragung | Kabel, Link-LED, Port aktiv, Speed/Duplex, SFP, WLAN-Signal | Kabeltester, Switch-Portstatus |
| 2 Sicherung | richtiges VLAN, MAC-Tabelle, STP-Blockade, Port Security | `show mac address-table`, `arp -a` |
| 3 Vermittlung | IP-Konfiguration, Maske, Gateway, Routing, Firewall | `ipconfig /all`, `ip a`, `ping`, `tracert`/`traceroute`, `route print` |
| 4 Transport | Port offen, Firewallregel | `Test-NetConnection -Port`, `telnet host port`, `netstat`/`ss` |
| 7 Anwendung | DNS, Dienst läuft, Zertifikat, Anmeldedaten | `nslookup`/`dig`, Browser, Logs |

### Typische Fehlerbilder
| Beobachtung | wahrscheinliche Ursache |
|---|---|
| IP **169.254.x.x** | kein DHCP-Server erreichbar (Kabel, VLAN, fehlendes Relay) oder Adresskonflikt |
| Ping auf IP klappt, auf Namen nicht | **DNS**: falscher/öffentlicher DNS-Server eingetragen, Server down |
| Ping ins eigene Netz klappt, ins Internet nicht | Gateway falsch/fehlt, NAT, Routing, Firewall |
| Ping scheitert, **Webseite lädt aber** | **ICMP** am Ziel, auf dem Weg oder in der eigenen Firewall gesperrt |
| `tracert` zeigt Zeilen mit `* * *` | Router antwortet nicht auf ICMP bzw. gibt kein „Time Exceeded“ zurück – Paket läuft trotzdem weiter |
| Route ändert sich zwischen zwei Traces | dynamisches Routing im Internet, DNS-Lastverteilung auf andere Server |
| Nur 100 Mbit/s statt 1 Gbit/s | NIC oder Switchport fest auf 100 Mbit/s, defektes Kabel (nur 2 Adernpaare), Duplex-Mismatch |
| Webserver antwortet **403/404** | keine Indexdatei konfiguriert, `index.html` fehlt, falscher Pfad/Rechte |
| Client erreicht Router nicht, IP stimmt | Client und Router in **verschiedenen VLANs** ohne Routing |
| Adresse doppelt | Adresskonflikt → Gerät mit der IP finden, statische Adressen außerhalb des DHCP-Pools |

---

## 2. Mitschnitte und Befehlsausgaben lesen

**`ipconfig /all`** zeigt je Adapter: IPv4/IPv6-Adressen, Maske, **Standardgateway**, **DHCP aktiviert / DHCP-Server**, **DNS-Server**, Lease-Zeiten, MAC (physische Adresse).

**Paketmitschnitt (Wireshark):** Spalten No., Time, Source, Destination, Protocol, Length, Info.
- **DNS:** Anfrage `Standard query A www.example.de` und Antwort `Standard query response … A 142.250.x.x` – die Antwort nennt die aufgelöste Adresse. Eine Antwort, die **nach** dem Ping eintrifft, wurde für diesen Ping nicht mehr verwendet (Zeitstempel!).
- **ICMP/ICMPv6:** `Echo (ping) request` und `reply`.
- **TTL/Hop Limit:** Startwert je Betriebssystem meist **128 (Windows)** oder **64 (Linux)**; jeder Router zieht 1 ab. Antwort mit Hop Limit 118 → **10 Router** auf dem Weg.
- **ARP:** `Who has 192.168.1.1? Tell 192.168.1.20` (Broadcast) und `192.168.1.1 is at aa:bb:…`.
- **DHCP:** Discover, Offer (enthält angebotene IP, Maske, Router, DNS, Lease), Request, ACK.
- **Adresstypen erkennen:** fe80:: Link-Local, fd00:: ULA (intern), 2xxx: global, 10./172.16–31./192.168. privat.

---

## 3. Angriffe im LAN erkennen

**Man-in-the-Middle (MitM):** Ein Angreifer schaltet sich unbemerkt zwischen zwei Kommunikationspartner und kann Daten **mitlesen, verändern oder umleiten** (Zugangsdaten, Zahlungsdaten, eingeschleuste Schadsoftware).

**ARP-Poisoning (ARP-Spoofing):** Der Angreifer verschickt **gefälschte ARP-Antworten** („Die IP des Gateways gehört zu **meiner** MAC“). Opfer schicken ihren Verkehr dann an den Angreifer, der ihn weiterleitet → MitM.
**Im Mitschnitt erkennbar:** **eine IP-Adresse erscheint mit zwei verschiedenen MAC-Adressen** (Wireshark: „duplicate use of … detected“), ungefragte ARP-Replies in großer Zahl, Verkehr zum Gateway geht an eine Client-MAC.
**Gegenmaßnahmen:** Dynamic ARP Inspection + DHCP-Snooping am Switch, 802.1X, VLAN-Segmentierung, verschlüsselte Protokolle (TLS, SSH), IDS/SIEM-Alarme. **Port Security allein hilft nicht**, wenn der Angreifer ein zugelassenes Gerät nutzt.

**Monitoring-Port (Port Mirroring/SPAN):** Der Switch **kopiert** den Verkehr anderer Ports oder VLANs auf einen Analyseport, an dem ein Sniffer (Wireshark) oder IDS hängt. **Auffällig hohe Last an einem Port** kann heißen: Uplink (bündelt den Abteilungsverkehr), Monitoring-Port – oder ein MitM-Angreifer, der Verkehr über sich umleitet.

### Monitoring mit SNMP
Überwachte Werte haben **Datentypen**: Port Link up (**bool**), Port-Speed (**integer**, 1 000 Mbit/s), Lüfterdrehzahl (integer), Systemlast (**float**, 10,5 %), Standortbezeichnung (**string**), Toner leer (bool).
- **Polling:** Das Monitoring fragt die Geräte regelmäßig ab (SNMP GET, Port 161). **Nachteil:** Ein Vorfall zwischen zwei Abfragen wird erst bei der nächsten erkannt.
- **Trap:** Das Gerät (bzw. ein Agent) **meldet selbst**, sobald ein Schwellwert überschritten ist (Port 162) – sofortige Alarmierung.
- Weitere Quellen: Syslog, NetFlow (wer spricht mit wem), SIEM (Korrelation von Sicherheitsereignissen).

---

## 4. Übertragungszeit

**Dauer = Datenmenge in Bit ÷ Datenrate in bit/s.**
- Datenmenge in **Byte binär** (GiB, MiB) → × 1 024 je Stufe × **8** für Bit.
- Datenrate **dezimal**: 250 Mbit/s = 250 000 000 bit/s.
- **Overhead** (Header, Protokolle) als Aufschlag, z. B. × 1,1.

> [!example] Durchgerechnet
> 15 GiB = 15 × 1 073 741 824 Byte = 16 106 127 360 Byte × 8 = 128 849 018 880 bit · × 1,1 = 141 733 920 768 bit · ÷ 250 000 000 bit/s = **566,94 s ≈ 9 min 27 s**.

---

## 5. Bandbreite berechnen

| Anwendung | Rechnung |
|---|---|
| **VoIP** | Gespräche × Codecrate (G.711: 64 kbit/s je Richtung) × (1 + Overhead) |
| **Videokonferenz** | Teilnehmer × Upload bzw. Download je Person – **Upload** asymmetrischer Anschlüsse reicht oft nicht |
| **IoT/MQTT** | Geräte × Byte je Nachricht × 8 ÷ Intervall in s |

> [!example] VoIP
> 15 externe Gespräche × 64 kbit/s = 960 kbit/s, dazu interne Gespräche über dieselbe Leitung; + Overhead laut Aufgabe (z. B. 10 %). Die Software priorisiert bei Engpass **Audio vor Video**.
>
> **Overhead exakt berechnen** (wenn die Header angegeben sind): 20 ms Paketierung → 50 Pakete/s, Nutzlast 64 000 ÷ 50 ÷ 8 = 160 Byte; + RTP 12 + UDP 8 + IPv4 20 + Ethernet 18 = **218 Byte** → 218 × 8 × 50 = **87,2 kbit/s** je Gespräch und Richtung (rund 36 % Overhead).

> [!example] MQTT
> 500 Geräte × 66 Byte pro Minute = 33 000 Byte/min ÷ 60 = 550 Byte/s × 8 = **4 400 bit/s = 4,4 kbit/s** → eine 10-kbit/s-Funkstrecke reicht.

**QoS (Quality of Service):** priorisiert **Echtzeitverkehr** (Sprache, Video) vor Datenverkehr (Markierung per DSCP bzw. 802.1p, Warteschlangen) → weniger Aussetzer, geringere Latenz und Jitter. **Fax über VoIP** scheitert oft, weil Sprachcodecs verlustbehaftet sind und Paketverluste verschleiern – bei Sprache unhörbar, bei Fax Abbruch.

---

## 6. WAN-Anbindung

| Technik | Eigenschaften |
|---|---|
| **FTTH** (Glasfaser bis ins Haus) | hohe, oft symmetrische Bandbreite; als **GPON** ein **Shared Medium** – mehrere Kunden teilen sich eine Faser und die Bandbreite |
| **VDSL/Vectoring** | Kupfer-Telefonleitung, Bandbreite sinkt mit der Entfernung zum Verteiler, asymmetrisch |
| **Kabel (DOCSIS)** | Koaxialkabel, Shared Medium im Segment |
| **LTE/5G** | Mobilfunk, schnell verfügbar, schwankende Leistung, meist **CGN** (keine öffentliche IPv4) |
| **Satellit** | überall verfügbar, hohe Latenz (geostationär), Wetter |
| **Standleitung/Ethernet-Anschluss** | garantierte Bandbreite, symmetrisch, teuer |

**Geschäftskundentarif – Vorteile:** kürzere Entstörzeiten und garantierte Reaktionszeit (SLA), Business-Hotline, **feste öffentliche IP-Adresse(n)**, garantierte Verfügbarkeit und Bandbreite.

### Verfügbarkeit von Verbindungen
- **Reihe** (alle Komponenten nötig): V = V₁ × V₂
- **Parallel** (eine Leitung genügt): V = 1 − (1 − V₁) × (1 − V₂)

> [!example] Zwei Leitungen à 99 %
> 1 − 0,01 × 0,01 = **0,9999 = 99,99 %**. Eine allein: 1 % von 8 760 h = 87,6 h Ausfall pro Jahr.

**Zwei unterschiedliche Anbindungen** (z. B. Glasfaser und LTE bei verschiedenen Providern): Ausfall eines Providers oder Baggerschaden trifft nicht beide. Umschaltung per Routing oder **FHRP** (→ [[FISI-9 IPv4-Subnetting und Routing]]).

---

> [!warning] Typische Fehler in Prüfungen
> - Mbit/s binär rechnen – **Datenraten sind dezimal**, Datenmengen in GiB **binär**.
> - Byte und Bit vertauschen (Faktor 8).
> - Aus einem fehlgeschlagenen Ping schließen, dass der Server aus ist.
> - Beim Hop Limit die Anzahl Router falsch zählen: Startwert − Empfangswert.
> - Parallele Verfügbarkeit wie Reihe rechnen.

## Verwandte Themen
- [[FISI-13 DNS, DHCP und Netzdienste]] – DNS und DHCP im Mitschnitt
- [[FISI-11 Switching, VLAN und Verkabelung]] – VLAN- und Portprobleme
- [[FISI-14 WLAN und Netzzugangskontrolle]] – Port Security, 802.1X
- [[FISI-4 Datensicherung, Archivierung und Notfallvorsorge]] – Verfügbarkeit, RTO
- [[H3 Datenmengen und Übertragung]] – Grundlagen aus AP1

## Zusammenfassung
- Fehlersuche Schicht 1 → 7, Vergleichsstation. APIPA = kein DHCP; IP ja/Name nein = DNS; Ping nein/Web ja = ICMP gesperrt.
- Mitschnitt: DNS-Anfrage/Antwort, Echo request/reply, Hop Limit 128 − Empfang = Router, ARP, DHCP.
- ARP-Poisoning: eine IP mit zwei MACs → DAI, DHCP-Snooping, 802.1X, TLS. SPAN spiegelt Verkehr.
- SNMP: Polling (verzögert) vs. Trap (sofort).
- Zeit = Bit ÷ bit/s (binär × 8, Overhead × 1,1, Rate dezimal). VoIP 64 kbit/s je Gespräch + Overhead.
- GPON und Kabel = Shared Medium, LTE = CGN, Business-Tarif = SLA + feste IP. Parallel: 1 − Π(1 − Vᵢ).

## Direkt üben
```dataviewjs
await dv.view("AP2/99 System/views/trainer", { typen: ["transferzeit", "bandbreite", "verfuegbarkeit-kombi", "uebertragung"] })
```

## Selbstcheck
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { modul: "FISI-16" })
```

**Weitere Aufgaben:** [[Aufgaben Netzwerke#FISI-16 Netzwerkanalyse, Fehlersuche und WAN]] · **Karteikarten:** [[Karten Netzwerke]]

## Einschätzung
```dataviewjs
await dv.view("AP2/99 System/views/selbstcheck")
```

---
← [[FISI-15 VPN, TLS und PKI]] · Weiter: [[Übersicht WiSo und Projektarbeit]] →
