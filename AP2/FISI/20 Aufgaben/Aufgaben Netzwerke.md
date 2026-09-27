---
bereich: Netzwerke
tags: [ap2/aufgaben, ap2/fisi]
---
# Aufgaben Netzwerke

Aufgaben im Stil der AP2 „Analyse und Entwicklung von Netzwerken“ mit Punkten und Musterlösung – eigene Aufgaben, die sich an den Aufgabentypen der AP2-Aufgaben orientieren. Schwierigkeit: ★ Einstieg · ★★ Prüfungsniveau · ★★★ anspruchsvoll.
**So arbeitest du:** Zeit stoppen (≈ 0,9 Minuten pro Punkt), schriftlich lösen, dann Lösung aufklappen und selbst bewerten. Fehler → [[AP2 FISI Fehlerlog]].
Unbegrenzte Rechenaufgaben (Subnetting, IPv6, Bandbreite, Übertragungszeit): [[AP2 FISI Trainer]] · Probeprüfungen: [[AP2/FISI/20 Aufgaben/Pruefungen/Uebersicht FISI AP2|Probeprüfungen]].

> [!info] Ausgangssituation für alle Aufgaben
> Die **Brenner Logistik GmbH** (fiktiv) vernetzt ihre Zentrale in Dortmund und das Lager in Hamm neu: VLANs, eine DMZ für Webshop und Mailserver, WLAN im Lager und ein Site-to-Site-VPN. Du planst und dokumentierst das Netz.

---

## FISI-9 IPv4-Subnetting und Routing

### N9.1 ★★ – Adresse analysieren (6 Punkte)
📘 **Nachlernen:** [[FISI-9 IPv4-Subnetting und Routing#1. Adresse analysieren|FISI-9 › Adresse analysieren]]

Ein Scanner im Lager hat die Adresse **172.20.37.130/26**. Bestimme Netzadresse, Broadcastadresse, ersten und letzten nutzbaren Host sowie die Anzahl nutzbarer Hosts.

> [!success]- Lösung
> /26 → Blockgröße 64 im 4. Oktett; 130 liegt im Block 128–191.
> Netz **172.20.37.128** · Broadcast **172.20.37.191** · Hosts **.129 bis .190** · **62** Hosts (2⁶ − 2) – je Angabe 1 P, Anzahl 2 P

### N9.2 ★★★ – VLSM planen (10 Punkte)
📘 **Nachlernen:** [[FISI-9 IPv4-Subnetting und Routing#VLSM|FISI-9 › VLSM]]

Für die Zentrale steht **10.40.8.0/22** zur Verfügung. Benötigt werden: Lager 400 Hosts, Verwaltung 200 Hosts, Server 50 Hosts, Management 20 Hosts und zwei Transfernetze mit je 2 Hosts. Vergib die Netze lückenlos, beginnend mit dem größten, und gib jeweils Netzadresse/Präfix und Broadcast an.

> [!success]- Lösung
> | Netz | Bedarf | Präfix | Netzadresse | Broadcast |
> |---|---|---|---|---|
> | Lager | 400 | /23 (510) | 10.40.8.0/23 | 10.40.9.255 |
> | Verwaltung | 200 | /24 (254) | 10.40.10.0/24 | 10.40.10.255 |
> | Server | 50 | /26 (62) | 10.40.11.0/26 | 10.40.11.63 |
> | Management | 20 | /27 (30) | 10.40.11.64/27 | 10.40.11.95 |
> | Transfer 1 | 2 | /30 (2) | 10.40.11.96/30 | 10.40.11.99 |
> | Transfer 2 | 2 | /30 (2) | 10.40.11.100/30 | 10.40.11.103 |
> je Zeile 1,5 P, sinnvolle Reihenfolge 1 P. Frei bleibt 10.40.11.104 bis 10.40.11.255.

### N9.3 ★★ – Routingtabelle erstellen (6 Punkte)
📘 **Nachlernen:** [[FISI-9 IPv4-Subnetting und Routing#3. Routing|FISI-9 › Routing]]

Router R1 (Zentrale) hat: eth0 192.168.10.1/24 (LAN Zentrale), eth1 10.255.0.1/30 (Transfernetz zu R2 in Hamm, R2 = 10.255.0.2), eth2 203.0.113.2/30 (Provider, Gateway 203.0.113.1). Hinter R2 liegt das LAN Hamm 192.168.20.0/24. Erstelle die Routingtabelle von R1.

> [!success]- Lösung
> | Ziel | Maske/Präfix | Gateway | Interface |
> |---|---|---|---|
> | 192.168.10.0 | /24 | direkt | eth0 |
> | 10.255.0.0 | /30 | direkt | eth1 |
> | 203.0.113.0 | /30 | direkt | eth2 |
> | 192.168.20.0 | /24 | 10.255.0.2 | eth1 |
> | 0.0.0.0 | /0 | 203.0.113.1 | eth2 |
> je Zeile 1 P, Default-Route korrekt 1 P zusätzlich

### N9.4 ★ – Statisch oder dynamisch routen (4 Punkte)
📘 **Nachlernen:** [[FISI-9 IPv4-Subnetting und Routing#Statisch oder dynamisch|FISI-9 › Statisch oder dynamisch]]

Nenne je zwei Vor- oder Nachteile von statischem und dynamischem Routing und entscheide für das Netz mit zwei Standorten.

> [!success]- Lösung
> - **Statisch:** + einfach, kein Protokoll-Overhead, gut kontrollierbar · − passt sich bei Ausfällen nicht an, Pflegeaufwand in großen Netzen (1,5 P)
> - **Dynamisch** (z. B. OSPF): + reagiert automatisch auf Ausfälle, skaliert · − komplexer, Protokollverkehr, Fehlkonfiguration wirkt netzweit (1,5 P)
> - Bei zwei Standorten mit einer Verbindung reicht **statisches Routing**. (1 P)

### N9.5 ★★ – Redundantes Gateway (4 Punkte)
📘 **Nachlernen:** [[FISI-9 IPv4-Subnetting und Routing#Redundantes Gateway (FHRP)|FISI-9 › Redundantes Gateway]]

In der Zentrale sollen zwei Router das Standardgateway bereitstellen. Erkläre, wie VRRP funktioniert und was die Clients davon bemerken.

> [!success]- Lösung
> - Beide Router teilen sich eine **virtuelle IP- und MAC-Adresse**; einer ist Master und beantwortet sie, der andere ist Backup und überwacht den Master über Hello-Nachrichten. (2 P)
> - Fällt der Master aus, übernimmt der Backup die virtuelle Adresse. (1 P)
> - Clients haben nur die virtuelle IP als Gateway eingetragen und merken den Wechsel nicht (höchstens kurze Unterbrechung). (1 P)

---

## FISI-10 IPv6 im Unternehmen

### N10.1 ★ – Adressen kürzen (4 Punkte)
📘 **Nachlernen:** [[FISI-10 IPv6 im Unternehmen#1. Schreibweise|FISI-10 › Schreibweise]]

Kürze: a) `2001:0db8:0a00:0000:0000:0000:0000:0010` b) `fe80:0000:0000:0000:0212:34ff:fe56:789a`

> [!success]- Lösung
> a) `2001:db8:a00::10` (2 P) · b) `fe80::212:34ff:fe56:789a` (2 P)
> Führende Nullen je Block weglassen, **eine** zusammenhängende Nullfolge durch `::` ersetzen.

### N10.2 ★★ – /64-Netze aus einem /56 (6 Punkte)
📘 **Nachlernen:** [[FISI-10 IPv6 im Unternehmen#2. /64-Netze bilden|FISI-10 › /64-Netze bilden]]

Der Provider weist das Präfix **2001:db8:4c:ab00::/56** zu. a) Wie viele /64-Netze sind möglich? b) Gib die ersten drei und das letzte /64-Netz an. c) Warum sollte man bei IPv6 keine kleineren Netze als /64 für Endgeräte bilden?

> [!success]- Lösung
> a) 2⁶⁴⁻⁵⁶ = 2⁸ = **256** (1 P)
> b) 2001:db8:4c:ab00::/64 · 2001:db8:4c:ab01::/64 · 2001:db8:4c:ab02::/64 · letztes 2001:db8:4c:abff::/64 (3 P)
> c) **SLAAC** braucht einen 64-Bit-Interface-Identifier; kleinere Netze brechen die automatische Adressvergabe. (2 P)

### N10.3 ★★ – Adresstypen erkennen (5 Punkte)
📘 **Nachlernen:** [[FISI-10 IPv6 im Unternehmen#Adresstypen|FISI-10 › Adresstypen]]

Ordne zu: a) `::1` b) `fe80::1a2b` c) `fd12:3456:789a::10` d) `ff02::1` e) `2a02:8100:1:2::5`

> [!success]- Lösung (je 1 P)
> a) Loopback · b) Link-Local (nur im eigenen Segment) · c) Unique Local Address (privat, ähnlich 10.0.0.0/8) · d) Multicast an alle Knoten im Link · e) Global Unicast (öffentlich routbar)

### N10.4 ★★ – SLAAC oder DHCPv6 (4 Punkte)
📘 **Nachlernen:** [[FISI-10 IPv6 im Unternehmen#3. Adressvergabe|FISI-10 › Adressvergabe]]

Erkläre SLAAC und nenne zwei Gründe, warum ein Unternehmen stattdessen DHCPv6 (stateful) einsetzen könnte.

> [!success]- Lösung
> - **SLAAC:** Der Router sendet Router Advertisements mit dem Präfix; der Client bildet seine Adresse selbst (Präfix + Interface-ID). (2 P)
> - **Gründe für DHCPv6:** zentrale Kontrolle und Protokollierung, welche Adresse welches Gerät hat; feste Zuordnungen/Reservierungen; Verteilung weiterer Optionen (z. B. NTP-, Domänenname). (2 P)

---

## FISI-11 Switching, VLAN und Verkabelung

### N11.1 ★★ – VLAN und Tagging (6 Punkte)
📘 **Nachlernen:** [[FISI-11 Switching, VLAN und Verkabelung#1. VLAN|FISI-11 › VLAN]] · [[FISI-11 Switching, VLAN und Verkabelung#Tagging nach IEEE 802.1Q|FISI-11 › Tagging]]

a) Nenne drei Vorteile von VLANs. b) Erkläre, was beim Tagging nach IEEE 802.1Q mit dem Ethernet-Frame passiert. c) Auf welcher OSI-Schicht arbeitet das Tag?

> [!success]- Lösung
> a) kleinere Broadcast-Domänen, Sicherheit durch Trennung (Verkehr zwischen VLANs nur über Router/Firewall), flexible Zuordnung unabhängig vom Standort, Priorisierung (je 1 P)
> b) Ein **4-Byte-Tag** wird zwischen Quell-MAC und Typfeld eingefügt; es enthält u. a. die **12-Bit-VLAN-ID** (max. 4 094 VLANs) und 3 Bit Priorität. (2 P)
> c) **Schicht 2** (1 P)

### N11.2 ★★ – Switchports konfigurieren (6 Punkte)
📘 **Nachlernen:** [[FISI-11 Switching, VLAN und Verkabelung#Tagging nach IEEE 802.1Q|FISI-11 › Tagging]]

VLANs: 10 Verwaltung, 20 Lager, 30 Voice, 99 Management. Gib für jeden Port an, welche VLANs **untagged** und welche **tagged** konfiguriert werden: a) PC der Buchhaltung, b) IP-Telefon mit angeschlossenem PC der Verwaltung, c) Uplink zum Router (Router-on-a-Stick), d) Access Point mit SSIDs für Lager und Verwaltung, der selbst im Management-VLAN verwaltet wird.

> [!success]- Lösung
> | Port | untagged | tagged |
> |---|---|---|
> | a) PC Buchhaltung | 10 | – |
> | b) Telefon + PC | 10 (PC) | 30 (Telefon) |
> | c) Uplink Router | – | 10, 20, 30, 99 |
> | d) Access Point | 99 | 10, 20 |
> a) 1 P · b) 2 P · c) 1,5 P · d) 1,5 P

### N11.3 ★★ – DHCP über VLAN-Grenzen (5 Punkte)
📘 **Nachlernen:** [[FISI-11 Switching, VLAN und Verkabelung#DHCP über VLAN-Grenzen|FISI-11 › DHCP über VLAN-Grenzen]]

Der DHCP-Server steht im Server-VLAN. Clients im Lager-VLAN erhalten keine Adresse und haben 169.254.x.x. Erkläre die Ursache und die Lösung.

> [!success]- Lösung
> - DHCP-Discover ist ein **Broadcast**; Broadcasts werden vom Router nicht in andere VLANs weitergeleitet. Die Clients erreichen den Server nicht und vergeben sich eine **APIPA-Adresse**. (2,5 P)
> - Lösung: **DHCP-Relay** (IP Helper) auf dem Router-Interface des Lager-VLANs einrichten; es leitet die Anfrage als Unicast an den DHCP-Server weiter und trägt das Gateway des VLANs ein, damit der Server den passenden Bereich wählt. Auf dem Server einen Bereich für das Lager-VLAN anlegen. (2,5 P)

### N11.4 ★ – Glasfaser oder Kupfer (4 Punkte)
📘 **Nachlernen:** [[FISI-11 Switching, VLAN und Verkabelung#Glasfaser oder Kupfer|FISI-11 › Glasfaser oder Kupfer]]

Die Lagerhalle liegt 180 m vom Verteiler entfernt. Begründe, welches Medium du wählst, und nenne das nötige Bauteil am Switch.

> [!success]- Lösung
> - **Glasfaser** (Multimode OM4 oder Singlemode), weil Twisted-Pair nur **100 m** erlaubt; zusätzlich unempfindlich gegen elektromagnetische Störungen (Hallengeräte) und Potenzialunterschiede zwischen Gebäuden. (3 P)
> - Am Switch ein passendes **SFP/SFP+-Modul** (Transceiver). (1 P)

### N11.5 ★★ – STP und Link Aggregation (4 Punkte)
📘 **Nachlernen:** [[FISI-11 Switching, VLAN und Verkabelung#3. Redundanz zwischen Switches|FISI-11 › Redundanz zwischen Switches]]

Zwei Switches werden mit zwei Kabeln verbunden. Erkläre, was STP und was Link Aggregation (LACP) in dieser Situation bewirken.

> [!success]- Lösung
> - **STP:** verhindert Schleifen (Broadcast-Stürme), indem es eine Verbindung **blockiert**; sie wird erst bei Ausfall der anderen aktiv – Redundanz, aber keine höhere Bandbreite. (2 P)
> - **Link Aggregation:** bündelt beide Leitungen zu **einer logischen** Verbindung – höhere Bandbreite und Ausfallsicherheit, beide Leitungen aktiv. (2 P)

---

## FISI-12 NAT, Firewall, DMZ und Proxy

### N12.1 ★★ – PAT nachvollziehen (6 Punkte)
📘 **Nachlernen:** [[FISI-12 NAT, Firewall, DMZ und Proxy#1. NAT und PAT|FISI-12 › NAT und PAT]]

Der PC 192.168.10.23 ruft mit Quellport 51000 einen Webserver 93.184.216.34 auf. Der Router hat die öffentliche Adresse 198.51.100.7 und wählt den Port 40001. Gib Quell- und Ziel-Socket an a) vor dem Router, b) nach dem Router, c) für die Antwort im Internet, d) für die Antwort im LAN.

> [!success]- Lösung
> | | Quelle | Ziel |
> |---|---|---|
> | a) | 192.168.10.23:51000 | 93.184.216.34:443 |
> | b) | 198.51.100.7:40001 | 93.184.216.34:443 |
> | c) | 93.184.216.34:443 | 198.51.100.7:40001 |
> | d) | 93.184.216.34:443 | 192.168.10.23:51000 |
> je Zeile 1,5 P – der Router merkt sich die Zuordnung in seiner NAT-Tabelle.

### N12.2 ★★★ – Firewallregeln (8 Punkte)
📘 **Nachlernen:** [[FISI-12 NAT, Firewall, DMZ und Proxy#3. Firewallregeln|FISI-12 › Firewallregeln]] · [[FISI-12 NAT, Firewall, DMZ und Proxy#DMZ|FISI-12 › DMZ]]

LAN 192.168.10.0/24, DMZ mit Webserver 172.16.1.10 und Mailserver 172.16.1.20. Erstelle die Regeln einer Stateful Firewall (Antwortpakete werden automatisch erlaubt), damit: a) das Internet den Webshop per HTTPS erreicht, b) der Mailserver Mails aus dem Internet empfängt und versenden darf, c) die Clients im LAN surfen dürfen, d) die Clients ihre Mails per IMAPS und SMTP-Submission beim Mailserver abrufen/einliefern, e) alles andere verboten ist.

> [!success]- Lösung
> | Nr. | Quelle | Ziel | Protokoll/Port | Aktion |
> |---|---|---|---|---|
> | 1 | any (Internet) | 172.16.1.10 | TCP 443 | erlauben |
> | 2 | any (Internet) | 172.16.1.20 | TCP 25 | erlauben |
> | 3 | 172.16.1.20 | any (Internet) | TCP 25 | erlauben |
> | 4 | 192.168.10.0/24 | any (Internet) | TCP 80, 443 (+ DNS UDP/TCP 53 zum Resolver) | erlauben |
> | 5 | 192.168.10.0/24 | 172.16.1.20 | TCP 993, 587 | erlauben |
> | 6 | any | any | any | verwerfen |
> je Regel 1,5 P (Regel 6: 0,5 P). Keine Regel darf Verbindungen aus der DMZ ins LAN erlauben.

### N12.3 ★★ – Stateful Packet Inspection (4 Punkte)
📘 **Nachlernen:** [[FISI-12 NAT, Firewall, DMZ und Proxy#2. Firewall-Arten|FISI-12 › Firewall-Arten]]

Erkläre den Unterschied zwischen einem statischen Paketfilter und einer SPI-Firewall und den Vorteil für das Regelwerk.

> [!success]- Lösung
> - **Paketfilter:** prüft jedes Paket einzeln nach IP, Port und Protokoll – für Antworten müssen eigene Regeln (z. B. hohe Ports) freigegeben werden. (2 P)
> - **SPI:** führt eine **Zustandstabelle**; Antwortpakete zu einer erlaubten Verbindung werden automatisch zugelassen, gefälschte Antworten ohne Anfrage verworfen. Das Regelwerk wird kürzer und sicherer. (2 P)

### N12.4 ★★ – TLS-Inspection am Proxy (5 Punkte)
📘 **Nachlernen:** [[FISI-12 NAT, Firewall, DMZ und Proxy#Forward Proxy und TLS-Inspection|FISI-12 › Forward Proxy und TLS-Inspection]]

Die neue Next-Generation-Firewall soll HTTPS-Verkehr auf Schadsoftware prüfen. a) Erkläre das Prinzip. b) Warum erscheinen auf Clients Zertifikatswarnungen und wie werden sie behoben? c) Nenne einen Nachteil bzw. ein rechtliches Problem.

> [!success]- Lösung
> a) Die Firewall baut die TLS-Verbindung zum Server selbst auf, entschlüsselt, prüft den Inhalt und verschlüsselt zum Client mit einem **eigenen, dynamisch erzeugten Zertifikat** neu (gewollter Man-in-the-Middle). (2 P)
> b) Die Clients vertrauen der ausstellenden CA der Firewall nicht → deren **Root-Zertifikat** per Gruppenrichtlinie/MDM im Zertifikatsspeicher der Clients verteilen. (2 P)
> c) Performance, Probleme mit Certificate Pinning, **Datenschutz/Mitbestimmung** bei privater Nutzung (Banking, Gesundheit – Ausnahmen definieren, Betriebsrat beteiligen). (1 P)

---

## FISI-13 DNS, DHCP und Netzdienste

### N13.1 ★★ – DNS-Auflösung (6 Punkte)
📘 **Nachlernen:** [[FISI-13 DNS, DHCP und Netzdienste#1. DNS – Namensauflösung|FISI-13 › DNS – Namensauflösung]]

Ein Client fragt nach `shop.brenner-logistik.de`. Der interne DNS-Server kennt die Antwort nicht und hat keinen Forwarder. Beschreibe den Ablauf bis zur Antwort und unterscheide rekursive und iterative Anfragen.

> [!success]- Lösung
> 1. Client stellt eine **rekursive** Anfrage an den internen DNS-Server (er erwartet die endgültige Antwort). (1 P)
> 2. Der Server prüft seinen Cache und fragt dann **iterativ**: Root-Server → Verweis auf die `.de`-Server → Verweis auf die autoritativen Server von `brenner-logistik.de` → A-Record. (3 P)
> 3. Antwort an den Client, Speicherung im Cache für die TTL. (1 P)
> - Rekursiv: der Befragte liefert die fertige Antwort; iterativ: der Befragte liefert nur einen Verweis. (1 P)

### N13.2 ★★ – Ressourceneinträge (6 Punkte)
📘 **Nachlernen:** [[FISI-13 DNS, DHCP und Netzdienste#Ressourceneinträge|FISI-13 › Ressourceneinträge]]

Welcher Eintrag wird benötigt? a) IPv4-Adresse des Webshops, b) IPv6-Adresse des Webshops, c) Mailserver der Domain, d) `www` soll auf `shop` verweisen, e) Rückwärtsauflösung der IP des Mailservers, f) erlaubte Absender-Server für die Domain.

> [!success]- Lösung (je 1 P)
> a) A · b) AAAA · c) MX · d) CNAME · e) PTR · f) TXT mit SPF-Eintrag

### N13.3 ★★ – DHCP-Ablauf (6 Punkte)
📘 **Nachlernen:** [[FISI-13 DNS, DHCP und Netzdienste#3. DHCP|FISI-13 › DHCP]]

Beschreibe die vier Nachrichten der DHCP-Adressvergabe mit Absender, Ziel (Broadcast/Unicast) und Inhalt und nenne zwei Optionen, die der Server außer der IP-Adresse mitliefert.

> [!success]- Lösung
> - **Discover:** Client → Broadcast, sucht Server (1 P)
> - **Offer:** Server → Client, bietet Adresse an (1 P)
> - **Request:** Client → Broadcast, wählt ein Angebot (informiert auch andere Server) (1 P)
> - **Acknowledge:** Server → Client, bestätigt Adresse und Lease-Zeit (1 P)
> - Optionen: Subnetzmaske, Standardgateway, DNS-Server, Domänenname, Lease-Dauer, NTP-Server (2 P)

### N13.4 ★★ – E-Mail-Authentifizierung (4 Punkte)
📘 **Nachlernen:** [[FISI-13 DNS, DHCP und Netzdienste#2. DNS-Sicherheit und E-Mail-Authentifizierung|FISI-13 › DNS-Sicherheit und E-Mail-Authentifizierung]]

Mails der Firma landen bei Kunden im Spam. Erkläre SPF, DKIM und DMARC in je einem Satz.

> [!success]- Lösung
> - **SPF:** TXT-Eintrag, der festlegt, welche Server Mails für die Domain versenden dürfen. (1,5 P)
> - **DKIM:** Der Mailserver **signiert** die Mail; der öffentliche Schlüssel steht im DNS, der Empfänger prüft Integrität und Herkunft. (1,5 P)
> - **DMARC:** Richtlinie im DNS, was der Empfänger bei fehlgeschlagener SPF/DKIM-Prüfung tun soll (none/quarantine/reject) und wohin Berichte gehen. (1 P)

---

## FISI-14 WLAN und Netzzugangskontrolle

### N14.1 ★★ – PSK oder Enterprise (6 Punkte)
📘 **Nachlernen:** [[FISI-14 WLAN und Netzzugangskontrolle#2. Absicherung|FISI-14 › Absicherung]]

Im Lager arbeiten 60 Personen mit Handscannern im WLAN, bisher mit WPA2-PSK. Nenne zwei Schwächen von PSK und zwei Vorteile von WPA3-Enterprise mit RADIUS.

> [!success]- Lösung
> - **Schwächen PSK:** ein gemeinsamer Schlüssel für alle – verlässt eine Person die Firma, muss er überall geändert werden; keine Zuordnung zu Personen/Protokollierung; offline angreifbar bei schwachem Schlüssel. (3 P)
> - **Vorteile Enterprise:** individuelle Anmeldung (Benutzer/Zertifikat), einzelne Zugänge sperrbar, Protokollierung, dynamische VLAN-Zuweisung, individuelle Sitzungsschlüssel. (3 P)

### N14.2 ★★ – IEEE 802.1X (5 Punkte)
📘 **Nachlernen:** [[FISI-14 WLAN und Netzzugangskontrolle#AAA mit RADIUS|FISI-14 › AAA mit RADIUS]] · [[FISI-14 WLAN und Netzzugangskontrolle#3. Netzzugangskontrolle am Switch|FISI-14 › Netzzugangskontrolle am Switch]]

Nenne die drei Rollen bei 802.1X mit je einem Beispielgerät und erkläre AAA.

> [!success]- Lösung
> - **Supplicant** – Client/Notebook · **Authenticator** – Switch oder Access Point · **Authentication Server** – RADIUS-Server (3 P)
> - **AAA:** Authentication (wer bist du), Authorization (was darfst du, z. B. VLAN), Accounting (Protokollierung der Nutzung). (2 P)

### N14.3 ★ – Gäste-WLAN (4 Punkte)
📘 **Nachlernen:** [[FISI-14 WLAN und Netzzugangskontrolle#Gäste-WLAN|FISI-14 › Gäste-WLAN]]

Lkw-Fahrer sollen im Wartebereich WLAN nutzen. Nenne vier Maßnahmen, die das Firmennetz schützen.

> [!success]- Lösung (je 1 P)
> eigene SSID in eigenem VLAN · Firewallregel: nur Internet, kein Zugriff auf interne Netze · Client-Isolation · Captive Portal mit Voucher und Nutzungsbedingungen · Bandbreitenbegrenzung · zeitlich begrenzte Zugänge

### N14.4 ★★ – Frequenzen und Kanäle (4 Punkte)
📘 **Nachlernen:** [[FISI-14 WLAN und Netzzugangskontrolle#Frequenzen und Kanäle|FISI-14 › Frequenzen und Kanäle]]

Drei Access Points im 2,4-GHz-Band stören sich. Nenne die überlappungsfreien Kanäle und zwei Vorteile des 5-GHz-Bandes sowie einen Nachteil.

> [!success]- Lösung
> - Kanäle **1, 6, 11** (1 P)
> - 5 GHz: mehr überlappungsfreie Kanäle, höhere Datenraten, weniger Störungen durch andere Geräte (2 P)
> - Nachteil: geringere Reichweite/schlechtere Durchdringung von Wänden und Regalen (1 P)

---

## FISI-15 VPN, TLS und PKI

### N15.1 ★★ – Hybride Verschlüsselung (6 Punkte)
📘 **Nachlernen:** [[FISI-15 VPN, TLS und PKI#1. Verschlüsselungsverfahren|FISI-15 › Verschlüsselungsverfahren]] · [[FISI-15 VPN, TLS und PKI#3. TLS|FISI-15 › TLS]]

Erkläre, warum TLS symmetrische und asymmetrische Verfahren kombiniert, und beschreibe den Ablauf vereinfacht.

> [!success]- Lösung
> - Asymmetrische Verfahren lösen das **Schlüsselaustauschproblem**, sind aber langsam; symmetrische sind schnell, brauchen aber einen gemeinsamen geheimen Schlüssel. (2 P)
> - Ablauf: Server sendet Zertifikat → Client prüft es → beide vereinbaren über **Diffie-Hellman** (ECDHE) einen gemeinsamen **Sitzungsschlüssel** → Nutzdaten werden symmetrisch (z. B. AES-GCM) verschlüsselt. (4 P)

### N15.2 ★★ – Zertifikat prüfen (5 Punkte)
📘 **Nachlernen:** [[FISI-15 VPN, TLS und PKI#2. PKI und Zertifikate|FISI-15 › PKI und Zertifikate]]

Nenne fünf Prüfungen, die ein Browser bei einem Serverzertifikat durchführt.

> [!success]- Lösung (je 1 P)
> Signatur der ausstellenden CA gültig (Kette bis zu einer vertrauenswürdigen Root-CA) · Gültigkeitszeitraum · Hostname passt zu CN/SAN · nicht widerrufen (CRL/OCSP) · Verwendungszweck (Key Usage: Serverauthentifizierung) · Zwischenzertifikate vorhanden

### N15.3 ★★ – VPN-Arten (5 Punkte)
📘 **Nachlernen:** [[FISI-15 VPN, TLS und PKI#4. VPN|FISI-15 › VPN]]

a) Welche VPN-Art verbindet die Zentrale mit dem Lager, welche die Außendienstler? b) Erkläre Split- und Full-Tunnel mit je einem Vor- oder Nachteil.

> [!success]- Lösung
> a) Zentrale–Lager: **Site-to-Site** (Gateway zu Gateway, z. B. IPsec) · Außendienst: **End-to-Site** (Client zu Gateway) (2 P)
> b) **Full-Tunnel:** gesamter Verkehr durch das VPN – zentral kontrolliert/gefiltert, aber mehr Last auf der Firmenleitung. **Split-Tunnel:** nur Firmenverkehr durchs VPN – entlastet die Leitung, Internetverkehr aber ungeschützt durch Firmen-Firewall. (3 P)

### N15.4 ★ – Zwei-Faktor-Authentifizierung (4 Punkte)
📘 **Nachlernen:** [[FISI-15 VPN, TLS und PKI#5. Zwei-Faktor-Authentifizierung|FISI-15 › Zwei-Faktor-Authentifizierung]]

Nenne die drei Faktorkategorien mit Beispiel und erkläre, warum Passwort + Sicherheitsfrage keine 2FA ist.

> [!success]- Lösung
> - **Wissen** (Passwort, PIN) · **Besitz** (Smartphone mit TOTP-App, Hardware-Token, Smartcard) · **Inhärenz** (Fingerabdruck, Gesicht) (3 P)
> - Passwort und Sicherheitsfrage sind beide **Wissen** – 2FA braucht zwei **unterschiedliche** Kategorien. (1 P)

---

## FISI-16 Netzwerkanalyse, Fehlersuche und WAN

### N16.1 ★★ – Übertragungszeit (6 Punkte)
📘 **Nachlernen:** [[FISI-16 Netzwerkanalyse, Fehlersuche und WAN#4. Übertragungszeit|FISI-16 › Übertragungszeit]]

Ein Backup von **15 GiB** wird über das VPN mit **100 Mbit/s** nach Hamm übertragen. Berechne die Dauer in Minuten und Sekunden (ohne Overhead).

> [!success]- Lösung
> 15 · 2³⁰ Byte · 8 = 128 849 018 880 bit (3 P)
> 128 849 018 880 bit ÷ 100 000 000 bit/s = 1 288,49 s ≈ **21 min 28 s** (3 P)

### N16.2 ★★★ – VoIP-Bandbreite (6 Punkte)
📘 **Nachlernen:** [[FISI-16 Netzwerkanalyse, Fehlersuche und WAN#5. Bandbreite berechnen|FISI-16 › Bandbreite berechnen]]

Codec G.711 (64 kbit/s Nutzdaten), Paketierung 20 ms. Overhead je Paket: RTP 12 Byte, UDP 8 Byte, IPv4 20 Byte, Ethernet 18 Byte. Berechne die Bandbreite je Gespräch und Richtung und für 20 gleichzeitige Gespräche.

> [!success]- Lösung
> - 1 s ÷ 20 ms = **50 Pakete/s**; Nutzdaten je Paket: 64 000 bit/s ÷ 50 = 1 280 bit = **160 Byte** (2 P)
> - Paketgröße: 160 + 12 + 8 + 20 + 18 = **218 Byte** (1 P)
> - Je Gespräch: 218 · 8 · 50 = **87 200 bit/s = 87,2 kbit/s** (2 P)
> - 20 Gespräche: **1 744 kbit/s ≈ 1,74 Mbit/s** je Richtung (1 P)

### N16.3 ★★ – Fehlersuche mit ipconfig (5 Punkte)
📘 **Nachlernen:** [[FISI-16 Netzwerkanalyse, Fehlersuche und WAN#2. Mitschnitte und Befehlsausgaben lesen|FISI-16 › Mitschnitte und Befehlsausgaben lesen]]

`ipconfig /all` zeigt: IPv4 `169.254.12.7`, Maske `255.255.0.0`, kein Gateway, DHCP aktiviert: Ja. a) Was bedeutet das? b) Nenne drei mögliche Ursachen. c) Mit welchem Befehl versuchst du eine neue Adresse?

> [!success]- Lösung
> a) **APIPA** – der Client hat keine Antwort von einem DHCP-Server erhalten und sich selbst eine Link-Local-Adresse gegeben. (1 P)
> b) DHCP-Server/Dienst ausgefallen, Bereich erschöpft, Switchport im falschen VLAN, DHCP-Relay fehlt, Kabel/Port defekt, 802.1X-Authentifizierung gescheitert (3 P)
> c) `ipconfig /release` und `ipconfig /renew` (1 P)

### N16.4 ★★ – Verfügbarkeit von Leitungen (5 Punkte)
📘 **Nachlernen:** [[FISI-16 Netzwerkanalyse, Fehlersuche und WAN#Verfügbarkeit von Verbindungen|FISI-16 › Verfügbarkeit von Verbindungen]]

Die Internetanbindung hat eine Verfügbarkeit von 99 %. a) Wie viele Stunden Ausfall im Jahr sind möglich? b) Eine zweite, unabhängige Leitung mit ebenfalls 99 % wird parallel betrieben. Berechne die Gesamtverfügbarkeit und die mögliche Ausfallzeit in Minuten.

> [!success]- Lösung
> a) 1 % von 8 760 h = **87,6 h** (1 P)
> b) Ausfall nur, wenn beide gleichzeitig ausfallen: 0,01 · 0,01 = 0,0001 → Verfügbarkeit **99,99 %** (2 P); 0,0001 · 8 760 h = 0,876 h = **52,56 min** (2 P)

### N16.5 ★★ – Angriff im Mitschnitt (4 Punkte)
📘 **Nachlernen:** [[FISI-16 Netzwerkanalyse, Fehlersuche und WAN#3. Angriffe im LAN erkennen|FISI-16 › Angriffe im LAN erkennen]]

Im Mitschnitt melden zwei verschiedene MAC-Adressen per ARP-Reply „192.168.10.1 is at …“. Welcher Angriff liegt vermutlich vor, welches Ziel hat er, und wie lässt er sich am Switch verhindern?

> [!success]- Lösung
> - **ARP-Spoofing/Poisoning** – der Angreifer gibt sich als Gateway aus, um den Verkehr über sich zu leiten (**Man-in-the-Middle**, Mitlesen/Manipulieren). (2 P)
> - Schutz: **Dynamic ARP Inspection** mit DHCP-Snooping, Port Security, 802.1X, statische ARP-Einträge für kritische Systeme. (2 P)

---
← [[AP2 FISI Start]] · [[Übersicht FISI Netzwerke]]


