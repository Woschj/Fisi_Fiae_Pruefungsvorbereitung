---
modul: FISI-12
titel: NAT, Firewall, DMZ und Proxy
bereich: Netzwerke
pruefungsteil: "AP2 Teil 2 – Analyse und Entwicklung von Netzwerken"
reihenfolge: 12
dauer: 150
status: neu
sicherheit: 0
zuletzt:
tags: [ap2/modul, ap2/fisi]
---
# FISI-12 · NAT, Firewall, DMZ und Proxy

> [!abstract] Überblick
> **Bereich:** [[Übersicht FISI Netzwerke]]
> **Prüfung:** „Analyse und Entwicklung von Netzwerken“
> **Dauer:** ca. 150 min · **Prüfungsrelevanz:** ★★★ – Firewall-Regeltabellen, NAT/PAT-Tabellen und die Absicherung einer DMZ sicher analysieren und erstellen.
> **Grundlagen aus AP1:** [[N4 Netzwerkdienste und Protokolle]] · [[I5 Bedrohungen und Schutzmaßnahmen]]

## Lernziele
- [ ] Ich kann NAT und PAT erklären und eine Übersetzungstabelle (Quelle/Ziel, IP:Port, vor und nach dem Router) ausfüllen.
- [ ] Ich kann Portforwarding (Destination NAT) und Carrier-Grade-NAT erklären.
- [ ] Ich kann Paketfilter, Stateful Packet Inspection, Application-Level-Gateway und Next-Generation-Firewall unterscheiden.
- [ ] Ich schreibe Firewallregeln mit Richtung, Protokoll, Adressen, Ports und abschließender Deny-Regel.
- [ ] Ich platziere Server sinnvoll in DMZ oder LAN und erkläre Reverse Proxy und TLS-Inspection.

## So wird das geprüft
> [!info] Typische AP2-Aufgabentypen
> - **Firewallregeln erstellen:** eingehend auf Webserver 443 und Mailserver 25/465/587/993, zum Schluss `deny any`; mit Interfaces; ausgehend 443/587/993/4711 und eingehend 443 auf einen Server; je Interface bei SPI.
> - **SPI erklären** und **Firewall-Arten nach OSI-Schicht**, **Bedrohungen, gegen die eine Firewall nicht schützt**.
> - **NAT/PAT:** Begriffe, **Tabelle mit Quell-/Ziel-IP und Ports** in vier Abschnitten, warum neue Quellports, **Portforwarding**, **CGN** beim Mobilfunk.
> - **DMZ:** welche Server gehören hinein.
> - **Reverse Proxy**, **Proxy mit TLS-Aufbruch** und Zertifikatswarnung.
> - **Zusatzfunktionen einer UTM/NGFW:** IDS/IPS, Malwarefilter, Spamfilter, QoS, Application Control.

---

## 1. NAT und PAT

**NAT (Network Address Translation):** Der Router ersetzt beim Verlassen des Netzes die **private Quell-IP** durch seine **öffentliche IP**. Private Adressen werden im Internet nicht geroutet – ohne NAT käme keine Antwort zurück.
**PAT (Port Address Translation, NAT-Overload, Masquerading):** Zusätzlich wird der **Quellport** ersetzt. So können **viele Geräte eine öffentliche IP** teilen. Der Router merkt sich in der **NAT-Tabelle**, welcher neue Port zu welchem internen Gerät gehört, und übersetzt die Antwort zurück.

**Warum neue Quellports?** Zwei interne PCs könnten zufällig denselben Quellport verwenden. Nur mit eindeutigen Ports kann der Router Antworten dem richtigen PC zuordnen.

> [!example] PAT-Tabelle (Muster )
> Zwei PCs (10.0.0.1 und 10.0.0.2, jeweils Quellport 45123) rufen denselben Webserver 12.7.51.9:443 auf. Öffentliche IP des Routers: 31.101.17.41.
>
> | Abschnitt | Quelle | Ziel |
> |---|---|---|
> | 1 – PC → Router (intern) | 10.0.0.1:45123 | 12.7.51.9:443 |
> | 2 – Router → Internet | **31.101.17.41:45123** | 12.7.51.9:443 |
> | 1 – zweiter PC intern | 10.0.0.2:45123 | 12.7.51.9:443 |
> | 2 – Router → Internet | **31.101.17.41:45124** (anderer Port!) | 12.7.51.9:443 |
> | 3 – Antwort aus dem Internet | 12.7.51.9:443 | 31.101.17.41:45124 |
> | 4 – Router → PC 2 | 12.7.51.9:443 | 10.0.0.2:45123 |
>
> Die Ports in Abschnitt 2 sind frei wählbar (1 024–65 535), müssen aber je Verbindung **eindeutig** sein und in Abschnitt 3 wieder auftauchen.

**TLS und NAT:** TLS verschlüsselt nur die **Nutzdaten**. IP-Adressen und Ports stehen in den unverschlüsselten IP-/TCP-Headern und dürfen vom Router geändert werden – die Verschlüsselung bleibt intakt.

**Weitere Folgen:** Beim Weiterleiten sinkt die **TTL** um 1, die **Header-Checksumme** wird neu berechnet.

### Portforwarding (Destination NAT)
Eingehende Pakete an **öffentliche IP + bestimmten Port** werden an eine **interne IP** weitergeleitet – so wird ein Webserver in der DMZ von außen erreichbar (z. B. 203.0.113.13:22 → 10.10.10.2:22).

### Carrier-Grade-NAT (CGN)
Mobilfunk- und manche Glasfaser-/Kabelprovider geben Kunden nur **private IPv4-Adressen** (100.64.0.0/10) und übersetzen erst beim Provider. **Folge:** Geräte beim Kunden sind **von außen nicht erreichbar**, Portforwarding und eingehende VPNs funktionieren nicht, ggf. doppeltes NAT. Lösungen: öffentliche IPv4 kostenpflichtig bestellen, **IPv6** verwenden, VPN von innen nach außen aufbauen.

**Vor- und Nachteile von NAT:** + interne Struktur verborgen, + viele Geräte mit einer öffentlichen IP · − keine echte Ende-zu-Ende-Verbindung, − interne Geräte nicht direkt adressierbar, − Probleme mit manchen Protokollen (IPsec → NAT-Traversal).

---

## 2. Firewall-Arten

| Art | OSI-Schicht | prüft | Grenze |
|---|---|---|---|
| **Paketfilter (stateless)** | 3/4 | Quell-/Ziel-IP, Protokoll, Ports – jedes Paket einzeln | Antwortverkehr muss mit eigener Regel erlaubt werden |
| **Stateful Packet Inspection (SPI)** | 3/4 | wie Paketfilter + **Verbindungszustand** (Session-Tabelle) | erkennt Antworten auf erlaubte Verbindungen automatisch |
| **Application Level Gateway / Proxy** | 7 | Inhalte eines Protokolls (HTTP, SMTP) | je Protokoll ein Proxy |
| **Next-Generation-Firewall / UTM** | 3–7 | zusätzlich Anwendungen erkennen, IDS/IPS, Malware- und Spamfilter, URL-Filter, TLS-Inspection, QoS | Leistung, Datenschutz |

**SPI:** Die Firewall erfasst erlaubte Verbindungen (TCP, UDP, ICMP) als **„States“**. Antworten auf eine erfasste Verbindung werden **ohne weitere Regel** durchgelassen – der Admin muss keine Rückwegregeln pflegen, und unaufgeforderte Pakete von außen werden verworfen.

**Wogegen eine Firewall nicht schützt:** Angriffe von **innen** (Innentäter, infizierte Laptops im LAN), Schadsoftware per USB-Stick, **Social Engineering/Phishing** mit erlaubten Protokollen, verschlüsselte Schadinhalte ohne TLS-Inspection, Angriffe über erlaubte Ports auf verwundbare Dienste, Fehlkonfiguration.

---

## 3. Firewallregeln

**Aufbau einer Regel:** Aktion (allow/permit, deny/drop, reject) · Protokoll · Quell-IP · Ziel-IP · Quellport · Zielport · Richtung bzw. Interface.
**Regeln werden von oben nach unten** abgearbeitet – **die erste passende Regel gilt**. Am Ende steht immer eine **Default-Deny-Regel** (whitelist-Prinzip).

> [!example] Regelwerk (Muster : Webserver 203.0.113.10, Mailserver 203.0.113.11)
>
> | Richtung | Quell-IP | Ziel-IP | Quellport | Zielport | Protokoll | Aktion |
> |---|---|---|---|---|---|---|
> | eingehend | any | 203.0.113.10 | any | 443 (HTTPS) | TCP | accept |
> | eingehend | any | 203.0.113.11 | any | 25 (SMTP zwischen Servern) | TCP | accept |
> | eingehend | any | 203.0.113.11 | any | 993 (IMAPS) | TCP | accept |
> | eingehend | any | 203.0.113.11 | any | 465 (SMTPS) | TCP | accept |
> | eingehend | any | 203.0.113.11 | any | 587 (Submission) | TCP | accept |
> | eingehend | any | any | any | any | any | **drop** |

- **Quellport ist meist `any`** – Clients wählen zufällige Ports ≥ 1 024.
- Ziel **so genau wie möglich** (Host mit /32 statt ganzem Netz).
- Bei SPI brauchst du **keine** Regeln für den Rückweg.
- `deny`/`drop` verwirft stillschweigend, `reject` antwortet mit einer Fehlermeldung.

**Wichtige Ports:** 20/21 FTP · 22 SSH/SFTP · 23 Telnet · 25 SMTP · 53 DNS · 67/68 DHCP · 80 HTTP · 110 POP3 · 123 NTP · 143 IMAP · 161/162 SNMP · 389 LDAP · 443 HTTPS · 465 SMTPS · 500/4500 IPsec (IKE, NAT-T) · 587 Submission · 636 LDAPS · 993 IMAPS · 995 POP3S · 1194 OpenVPN · 3389 RDP · 51820 WireGuard.

---

## 4. DMZ und Proxy

### DMZ
Die **demilitarisierte Zone** ist ein eigenes Netzsegment **zwischen Internet und LAN**, getrennt durch eine oder zwei Firewalls. Dort stehen Dienste, die **von außen erreichbar** sein müssen. Wird ein DMZ-Server kompromittiert, gibt es **keinen direkten Durchgriff** ins LAN.

| in die DMZ | im internen LAN bleiben |
|---|---|
| Webserver, Reverse Proxy, Mail-Relay/Mailserver, öffentlicher DNS, VPN-Gateway | Datenbankserver, Active Directory/Domain Controller, Fileserver, Druckserver, Warenwirtschaft |

### Forward Proxy und TLS-Inspection
Ein **Forward Proxy** vermittelt die Webzugriffe der Clients: URL-Filter, Caching, Protokollierung, Virenscan. Um **verschlüsselte** Inhalte zu prüfen, bricht er die TLS-Verbindung auf („Entschlüsseln und scannen“): Er baut eine Verbindung zum Webserver auf und eine **zweite** zum Client – mit einem **selbst ausgestellten Zertifikat** (gewollter Man-in-the-Middle).
- **Zertifikatswarnung im Browser:** Das Root-Zertifikat des Proxys ist dem Client nicht als vertrauenswürdig bekannt. Lösung: Root-Zertifikat per **GPO/MDM** in die vertrauenswürdigen Stammzertifizierungsstellen verteilen.
- **Nachteile:** Ende-zu-Ende-Verschlüsselung aufgebrochen, Datenschutz der Mitarbeitenden betroffen (private Nutzung regeln, **Betriebsrat** und Mitarbeitende informieren), höhere Leistung nötig, Risiko falls der Proxy kompromittiert wird.

### Reverse Proxy
Steht **vor den eigenen Servern** und nimmt Anfragen aus dem Internet entgegen:
- **Anonymisierung/Schutz:** interne Server bleiben verborgen, einziger Zugang von außen
- **Sicherheit:** Virenscan, Web Application Firewall, **TLS-Terminierung** (Zertifikate zentral)
- **Load Balancing** auf mehrere Backend-Server, höhere Verfügbarkeit
- **Caching** statischer Inhalte und **Kompression**

**Unterschied zu Portforwarding:** Portforwarding reicht Pakete nur auf Netzwerkebene durch. Der Reverse Proxy **terminiert** die Verbindung, versteht HTTP (Schicht 7) und baut eine **neue** Verbindung zum internen Server auf.

---

> [!warning] Typische Fehler in Prüfungen
> - Die **abschließende Deny-Regel** vergessen.
> - Quell- und Zielport vertauschen – bei eingehenden Anfragen ist der **Zielport** der Dienstport.
> - In der PAT-Tabelle für beide PCs denselben öffentlichen Port verwenden.
> - Datenbank oder Domain Controller in die DMZ stellen.
> - SPI mit „prüft Inhalte“ verwechseln – das kann erst ein ALG/NGFW.

## Verwandte Themen
- [[FISI-9 IPv4-Subnetting und Routing]] – private Adressen
- [[FISI-13 DNS, DHCP und Netzdienste]] – Ports der Dienste, Split-Horizon-DNS
- [[FISI-15 VPN, TLS und PKI]] – Zertifikate, TLS
- [[FISI-5 Systemhärtung, Malware und Angriffe]] – Schutzschichten

## Zusammenfassung
- NAT ersetzt die IP, PAT zusätzlich den Port → viele Geräte, eine öffentliche IP; NAT-Tabelle ordnet Antworten zu.
- Portforwarding = Destination NAT nach innen. CGN = private IP beim Kunden, von außen nicht erreichbar.
- Paketfilter (L3/4) · SPI (+Zustand, Antworten automatisch) · ALG/Proxy (L7) · NGFW/UTM (IDS/IPS, Malware, TLS-Inspection).
- Regeln von oben nach unten, erste passende gilt, Default-Deny am Ende; Quellport meist any.
- DMZ: Web, Mail, Reverse Proxy; LAN: DB, AD, Fileserver. Reverse Proxy: Schutz, TLS, Load Balancing, Caching.

## Direkt üben
```dataviewjs
await dv.view("AP2/99 System/views/trainer", { typen: ["ports"] })
```

## Selbstcheck
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { modul: "FISI-12" })
```

**Weitere Aufgaben:** [[Aufgaben Netzwerke#FISI-12 NAT, Firewall, DMZ und Proxy]] · **Karteikarten:** [[Karten Netzwerke]]

## Einschätzung
```dataviewjs
await dv.view("AP2/99 System/views/selbstcheck")
```

---
← [[FISI-11 Switching, VLAN und Verkabelung]] · Weiter: [[FISI-13 DNS, DHCP und Netzdienste]] →
