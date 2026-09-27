---
tags: [ap1/nachschlagen]
---
# Spickzettel – der letzte Blick vor der Prüfung

## Die 15 häufigsten Fallen
1. **Bit vs. Byte:** Datenrate in Bit/s → Datenmenge **× 8**.
2. **MB vs. MiB:** Datenraten immer dezimal; GiB nur, wenn es dasteht.
3. **Hosts = 2^h − 2** – Netz- und Broadcastadresse abziehen.
4. **2^s ≥ n** bei Subnetzen – bei n = 8 reichen 3 Bit.
5. **VLSM absteigend sortieren**, große Netze zuerst.
6. **IPv6:** `::` nur einmal, längste Nullfolge, bei Gleichstand die erste; Nullen am Blockende bleiben.
7. **RAID ≠ Backup**, Snapshot ≠ Backup.
8. **Inkrementell** = seit letzter *Sicherung*, **differenziell** = seit letzter *Vollsicherung*.
9. **Zutritt** (Raum) · **Zugang** (System) · **Zugriff** (Daten).
10. **Verschlüsseln** mit dem öffentlichen Schlüssel des **Empfängers**, **signieren** mit dem eigenen **privaten**.
11. **Rabatt vor Skonto**, Skonto vom **Zieleinkaufspreis**, Bezugskosten zum Schluss; Skontofrist erwähnen.
12. **Brutto → Netto: ÷ 1,19**, nicht × 0,81.
13. Mängelrechte: **zuerst Nacherfüllung** (Käufer wählt), dann Rücktritt/Minderung.
14. Netzplan: **vorwärts Maximum**, **rückwärts Minimum**; kritischer Pfad = GP 0.
15. Pseudocode: **Initialisierung**, Grenze **länge − 1**, Division durch 0 abfangen.

## Zahlen, die sitzen müssen
- Maskenwerte **128 192 224 240 248 252 254 255**
- Privat **10/8 · 172.16/12 · 192.168/16** · APIPA **169.254/16** · Loopback **127/8**
- IPv6 **fe80::/10** Link-Local · **fd00::/8** ULA · **2000::/3** global · **::1** · **ff00::/8** Multicast
- Kupfer max. **100 m** (90 + 10) · Cat 6A = 10 Gbit/s · PoE **15,4 / 30 / 60 / 90 W**
- WLAN **1-6-11** · Wi-Fi 4/5/6/7 = n/ac/ax/be · 802.11ac nur 5 GHz
- USB 2.0 **480 Mbit/s** · 3.2 Gen 1 **5** · Gen 2 **10** · USB4/TB4 **40 Gbit/s**
- Jahr **8 760 h** · DSGVO-Meldung **72 h** · DSB ab **20** Personen · Bußgeld bis **20 Mio. € / 4 %**
- Gewährleistung **2 Jahre**, Beweislastumkehr **12 Monate**, Widerruf **14 Tage**
- USt **19 %** · GWG **800 €** · GmbH **25 000 €** · AG **50 000 €** · Probezeit **1–4 Monate**
- 99,9 % Verfügbarkeit = **8,76 h** Ausfall/Jahr · Beleuchtung **500 lx** · BFSG seit **28.06.2025**

## Ports
**20/21** FTP · **22** SSH · **23** Telnet · **25** SMTP · **53** DNS · **67/68** DHCP · **80** HTTP · **110** POP3 · **123** NTP · **143** IMAP · **161** SNMP · **389** LDAP · **443** HTTPS · **445** SMB · **465** SMTPS · **587** Submission · **636** LDAPS · **993** IMAPS · **995** POP3S · **3389** RDP · **5060** SIP

## OSI
**1** Bit (Hub) · **2** Sicherung – Frame, MAC (Switch, AP) · **3** Vermittlung – Paket, IP (Router) · **4** Transport – Segment, Ports (TCP/UDP) · **5** Sitzung · **6** Darstellung · **7** Anwendung
*Bitte Sag Vati Tschüss, Sonst Droht Aufregung*

## Antwortmuster
- **„Erläutern Sie …“** = Aussage + **weil …** + **Bezug zum Szenario**
- **„Beurteilen Sie …“** = Pro + Contra + **eigene Entscheidung mit Begründung**
- **„Berechnen Sie …“** = Formel → Zahlen einsetzen → Ergebnis mit **Einheit**
- **Hardware:** Anforderung → Komponente → Begründung
- **Datenschutzfall:** betroffene Daten → Meldung (72 h) → Prävention (TOM, Schulung)
- **Sicherheitsvorfall:** trennen → melden → dokumentieren → eindämmen → aus Backup wiederherstellen

## Vor der Prüfung
- [ ] Taschenrechner, Ausweis, Einladung, Stifte
- [ ] Szenario zuerst lesen, Zeit pro Aufgabe ≈ 20 min
- [ ] Nicht festbeißen – markieren, weiter, später zurück

← [[Start]]
