---
bereich: Netzwerke
tags: [ap2/kartenquelle, ap2/fisi]
---
# Kartenquelle Netzwerke

> [!warning] Hier stehen die Antworten
> Zum Lernen [[Karten Netzwerke]] öffnen. Diese Datei ist nur zum Bearbeiten und Ergänzen da – Format: `Frage::Antwort`, eine Karte pro Zeile. IPv6-Kurzschreibweisen mit Doppel-Doppelpunkt sind hier ausgeschrieben, weil das Kartenformat den Doppelpunkt als Trenner nutzt.

#flashcards/ap2/fisi/netzwerke

## FISI-9 IPv4-Subnetting und Routing

Wie viele nutzbare Hosts hat ein /26-Netz?::62 (2⁶ − 2)
Wie viele nutzbare Hosts hat ein /30-Netz – und wofür wird es genutzt?::2 – für Transfernetze zwischen zwei Routern
Was ist das Besondere an einem /31-Netz?::Nur zwei Adressen ohne Netz- und Broadcastadresse – für Punkt-zu-Punkt-Verbindungen (RFC 3021)
Welche privaten IPv4-Bereiche gibt es?::10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16
Welcher Bereich ist APIPA?::169.254.0.0/16 – Selbstvergabe, wenn kein DHCP-Server antwortet
Welcher Adressbereich ist für Multicast reserviert?::224.0.0.0/4 (224.0.0.0 bis 239.255.255.255)
Was ist VLSM?::Variable Length Subnet Mask – Subnetze unterschiedlicher Größe aus einem Netz, größte zuerst vergeben
Was bedeutet die Route 0.0.0.0/0?::Default-Route – für alle Ziele, zu denen es keine genauere Route gibt
Nach welcher Regel wählt ein Router bei mehreren passenden Routen?::Longest Prefix Match – die Route mit dem längsten Präfix gewinnt
Was sagt die Metrik einer Route aus?::Kosten eines Weges – bei gleichem Präfix wird die kleinere Metrik bevorzugt
Unterschied Distanzvektor- und Link-State-Routing?::Distanzvektor (RIP): Nachbarn tauschen Tabellen aus, Hop-Anzahl · Link-State (OSPF): jeder Router kennt die gesamte Topologie, schnellere Konvergenz
Was ist ein FHRP wie VRRP?::Protokoll für ein redundantes Standardgateway – zwei Router teilen sich eine virtuelle IP
Wozu dient die Broadcastadresse?::Paket an alle Hosts des Subnetzes (z. B. ARP-Anfrage, DHCP-Discover)
Welche Aufgabe hat das Feld TTL im IP-Header?::Wird an jedem Router um 1 verringert; bei 0 wird das Paket verworfen – verhindert endlos kreisende Pakete

## FISI-10 IPv6 im Unternehmen

Wie lang ist eine IPv6-Adresse?::128 Bit, 8 Blöcke zu je 16 Bit in Hexadezimal
Welche Kürzungsregeln gelten bei IPv6?::Führende Nullen je Block weglassen; eine zusammenhängende Folge von Nullblöcken einmal durch zwei Doppelpunkte ersetzen
Wie viele /64-Netze enthält ein /56?::2⁸ = 256
Wie viele /64-Netze enthält ein /48?::2¹⁶ = 65 536
Woran erkennst du eine Link-Local-Adresse?::Beginnt mit fe80 (Bereich fe80/10) – nur im eigenen Segment gültig, jede IPv6-Schnittstelle hat eine
Was ist eine Unique Local Address?::Private IPv6-Adresse im Bereich fc00/7 (in der Praxis fd…)
Was ist eine Global Unicast Address?::Öffentlich routbare Adresse, derzeit aus 2000/3 (beginnt mit 2 oder 3)
Wofür steht die Adresse ff02 mit Interface-ID 1?::Multicast an alle Knoten im lokalen Link (ersetzt den Broadcast)
Wie lautet die IPv6-Loopback-Adresse ausgeschrieben?::0:0:0:0:0:0:0:1
Was ist SLAAC?::Stateless Address Autoconfiguration – Client bildet seine Adresse aus dem Präfix im Router Advertisement
Wozu DHCPv6 statt SLAAC?::Zentrale Kontrolle/Protokollierung der Adressen, feste Zuordnungen, weitere Optionen
Welches Protokoll ersetzt ARP bei IPv6?::NDP (Neighbor Discovery Protocol) mit ICMPv6
Nenne drei Vorteile von IPv6.::Riesiger Adressraum (kein NAT nötig), Autokonfiguration, vereinfachter Header, kein Broadcast, IPsec integriert
Was bedeutet Dual Stack?::IPv4 und IPv6 laufen parallel auf denselben Geräten

## FISI-11 Switching, VLAN und Verkabelung

Nenne drei Vorteile von VLANs.::Kleinere Broadcast-Domänen, Trennung aus Sicherheitsgründen, flexible Zuordnung unabhängig vom Standort
Wie groß ist das VLAN-Tag nach 802.1Q und was enthält es?::4 Byte – u. a. 12-Bit-VLAN-ID und 3 Bit Priorität
Wie viele VLAN-IDs sind nutzbar?::4 094 (1 bis 4094)
Was ist ein Access-Port?::Port in genau einem VLAN, Frames werden untagged übertragen
Was ist ein Trunk-Port?::Port, der mehrere VLANs tagged überträgt (z. B. Switch zu Switch/Router)
Was ist das Native VLAN?::VLAN, dessen Frames auf dem Trunk untagged laufen – sollte auf ein ungenutztes VLAN gesetzt werden (Schutz vor VLAN-Hopping)
Was ist Router-on-a-Stick?::Inter-VLAN-Routing über ein einziges Router-Interface mit Subinterfaces je VLAN auf einem Trunk
Was ist ein Layer-3-Switch?::Switch, der zusätzlich zwischen VLANs routen kann (SVI je VLAN)
Wozu dient ein DHCP-Relay?::Leitet DHCP-Broadcasts als Unicast an einen DHCP-Server in einem anderen Netz weiter
Was verhindert STP?::Schleifen im geswitchten Netz – blockiert redundante Verbindungen
Was bewirkt Link Aggregation (LACP)?::Bündelt mehrere Leitungen zu einer logischen Verbindung – mehr Bandbreite und Redundanz
Maximale Länge einer Twisted-Pair-Strecke?::100 m (90 m Verlegekabel + Patchkabel)
Nenne drei Vorteile von Glasfaser.::Große Reichweite, hohe Bandbreite, unempfindlich gegen elektromagnetische Störungen, galvanische Trennung
Was ist ein SFP-Modul?::Steckbarer Transceiver für Switchports (Glasfaser oder Kupfer), SFP+ für 10 Gbit/s
Was ist ein Voice-VLAN?::Eigenes VLAN für IP-Telefone, am Port tagged neben dem untagged Daten-VLAN des PCs – ermöglicht QoS

## FISI-12 NAT, Firewall, DMZ und Proxy

Was macht Source-NAT/PAT?::Ersetzt private Quelladressen (und Ports) durch die öffentliche Adresse des Routers – viele Geräte teilen sich eine IP
Was ist Portforwarding?::Destination-NAT: eingehende Verbindungen auf einen öffentlichen Port werden an einen internen Server weitergeleitet
Was ist Carrier-Grade-NAT (CGN)?::NAT beim Provider – der Kunde hat keine öffentliche IPv4-Adresse, eingehende Verbindungen sind nicht möglich
Wie lässt sich CGN umgehen?::IPv6 nutzen, feste öffentliche IPv4 buchen, VPN/Tunnel über einen Server mit öffentlicher IP
Was ist Stateful Packet Inspection?::Firewall merkt sich Verbindungszustände und lässt Antworten auf erlaubte Verbindungen automatisch zu
Was prüft eine Application-Layer-Firewall?::Inhalte auf Schicht 7 (z. B. HTTP-Befehle, Schadcode)
Was ist eine UTM/NGFW?::Firewall mit zusätzlichen Funktionen: IDS/IPS, Virenscan, Webfilter, VPN, Application Control, TLS-Inspection
Wie ist ein Firewall-Regelwerk aufgebaut?::Regeln von oben nach unten, erste passende gewinnt; am Ende Default Deny (alles verbieten)
Was ist eine DMZ?::Eigenes Netzsegment zwischen Internet und LAN für öffentlich erreichbare Server
Welche Verbindungen sollten aus der DMZ ins LAN erlaubt sein?::Keine (oder nur eng begrenzte) – ein übernommener DMZ-Server darf nicht ins LAN gelangen
Was macht ein Forward Proxy?::Stellvertreter für Clients beim Zugriff auf das Internet – Filter, Cache, Protokollierung
Was macht ein Reverse Proxy?::Nimmt Anfragen aus dem Internet für interne Server entgegen – TLS-Terminierung, Lastverteilung, Schutz
Warum erzeugt TLS-Inspection Zertifikatswarnungen?::Die Firewall stellt eigene Zertifikate aus; Clients vertrauen deren CA erst, wenn ihr Root-Zertifikat verteilt wurde

## FISI-13 DNS, DHCP und Netzdienste

Unterschied rekursive und iterative DNS-Anfrage?::Rekursiv: Server liefert die endgültige Antwort · iterativ: Server liefert nur einen Verweis auf den nächsten Server
Was ist ein DNS-Forwarder?::DNS-Server, an den ein interner Server unbekannte Anfragen weiterleitet (z. B. Provider-DNS)
Wofür steht ein A-Record?::Name → IPv4-Adresse
Wofür steht ein AAAA-Record?::Name → IPv6-Adresse
Wofür steht ein MX-Record?::Mailserver der Domain mit Priorität
Wofür steht ein CNAME-Record?::Alias – ein Name verweist auf einen anderen Namen
Wofür steht ein PTR-Record?::Rückwärtsauflösung IP → Name
Was steht in einem SPF-Eintrag?::TXT-Record mit den Servern, die Mails für die Domain senden dürfen
Was macht DKIM?::Signiert Mails; der öffentliche Schlüssel steht im DNS, Empfänger prüfen Echtheit und Unverändertheit
Was regelt DMARC?::Was bei fehlgeschlagener SPF/DKIM-Prüfung passiert (none, quarantine, reject) und wohin Berichte gehen
Was schützt DNSSEC?::Echtheit und Integrität von DNS-Antworten durch Signaturen – gegen DNS-Spoofing
Was ist Split-Horizon-DNS?::Derselbe Name liefert intern und extern unterschiedliche Antworten (interne bzw. öffentliche IP)
Nenne die vier DHCP-Nachrichten in Reihenfolge.::Discover, Offer, Request, Acknowledge (DORA)
Welche Optionen verteilt DHCP neben der IP-Adresse?::Subnetzmaske, Gateway, DNS-Server, Domänenname, Lease-Zeit, NTP
Was zeigt nslookup mit „Nicht autorisierende Antwort“?::Die Antwort stammt aus dem Cache eines Servers, der für die Zone nicht zuständig ist

## FISI-14 WLAN und Netzzugangskontrolle

Welche 2,4-GHz-Kanäle überlappen nicht?::1, 6 und 11
Vorteil und Nachteil von 5 GHz?::Mehr Kanäle, höhere Datenraten, weniger Störungen · aber geringere Reichweite
Schwächen von WPA2-PSK im Unternehmen?::Ein Schlüssel für alle, keine Personenzuordnung, bei Weggang Schlüssel überall ändern, Offline-Angriffe auf schwache Schlüssel
Vorteile von WPA-Enterprise?::Individuelle Anmeldung per 802.1X/RADIUS, einzelne Zugänge sperrbar, Protokollierung, dynamische VLANs
Was bringt WPA3 gegenüber WPA2?::SAE statt PSK-Handshake (Schutz vor Offline-Wörterbuchangriffen), Forward Secrecy, 192-Bit-Modus für Enterprise
Rollen bei IEEE 802.1X?::Supplicant (Client), Authenticator (Switch/AP), Authentication Server (RADIUS)
Was bedeutet AAA?::Authentication, Authorization, Accounting
Was ist ein Captive Portal?::Anmeldeseite im Gäste-WLAN (Voucher, Nutzungsbedingungen) vor dem Internetzugang
Was ist Client-Isolation?::Geräte im selben WLAN können sich nicht gegenseitig erreichen
Bringt eine versteckte SSID Sicherheit?::Nein – die SSID ist in Probe-Anfragen der Clients trotzdem sichtbar; nur Komfortverlust
Was ist Port Security?::Switchport erlaubt nur bestimmte/eine begrenzte Zahl von MAC-Adressen; bei Verstoß protect, restrict oder shutdown
Unterschied statische und sticky MAC bei Port Security?::Statisch: fest konfiguriert · sticky: die erste gelernte MAC wird automatisch in die Konfiguration übernommen
Was ist MAB?::MAC Authentication Bypass – Geräte ohne 802.1X-Unterstützung (Drucker) werden über ihre MAC am RADIUS angemeldet

## FISI-15 VPN, TLS und PKI

Unterschied symmetrische und asymmetrische Verschlüsselung?::Symmetrisch: ein gemeinsamer Schlüssel, schnell (AES) · asymmetrisch: Schlüsselpaar, langsam, löst Schlüsselaustausch (RSA, ECC)
Was ist hybride Verschlüsselung?::Sitzungsschlüssel asymmetrisch austauschen/vereinbaren, Daten symmetrisch verschlüsseln
Womit wird eine digitale Signatur erstellt und geprüft?::Hash der Nachricht mit dem privaten Schlüssel des Absenders signiert, mit dessen öffentlichem Schlüssel geprüft
Was steht in einem X.509-Zertifikat?::Inhaber (CN/SAN), öffentlicher Schlüssel, Aussteller, Gültigkeitszeitraum, Seriennummer, Verwendungszweck, Signatur der CA
Was ist eine Zertifikatskette?::Serverzertifikat → Zwischenzertifikat(e) → Root-CA, der das System vertraut
Wie wird ein Zertifikat widerrufen geprüft?::Über Sperrlisten (CRL) oder OCSP
Wozu Diffie-Hellman in TLS?::Gemeinsamen Sitzungsschlüssel vereinbaren, ohne ihn zu übertragen – mit ephemeren Schlüsseln Forward Secrecy
Was hat TLS 1.3 gegenüber 1.2 verbessert?::Schnellerer Handshake (1 RTT), nur noch sichere Verfahren, immer Forward Secrecy
Warum ist MD5 unsicher?::Kollisionen lassen sich praktisch erzeugen – zwei Dokumente mit gleichem Hash
Unterschied Site-to-Site und End-to-Site-VPN?::Site-to-Site verbindet Netze über Gateways · End-to-Site verbindet einzelne Clients mit dem Firmennetz
Unterschied Full- und Split-Tunnel?::Full: gesamter Verkehr durchs VPN · Split: nur Firmenverkehr durchs VPN
Was ist NAT-Traversal bei IPsec?::Kapselt IPsec in UDP 4500, damit es NAT-Router passieren kann
Nenne die drei Faktoren der Authentifizierung.::Wissen, Besitz, Inhärenz (Biometrie)
Interne oder öffentliche CA – wann welche?::Interne CA für interne Dienste/Geräte (kostenlos, eigene Kontrolle) · öffentliche CA für Dienste, die externe Nutzer aufrufen

## FISI-16 Netzwerkanalyse, Fehlersuche und WAN

Wie berechnest du die Übertragungszeit?::Datenmenge in Bit ÷ Datenrate in Bit/s (GiB mit 2³⁰, Mbit/s mit 10⁶)
Wie viele Pakete pro Sekunde bei VoIP mit 20 ms Paketierung?::50
Welche Header zählen zum VoIP-Overhead?::RTP 12 Byte, UDP 8 Byte, IPv4 20 Byte, Ethernet 18 Byte (plus ggf. VLAN-Tag 4 Byte)
Bandbreite eines G.711-Gesprächs mit Overhead (Ethernet, 20 ms)?::ca. 87,2 kbit/s je Richtung
Verfügbarkeit zweier paralleler Leitungen mit je 99 %?::1 − 0,01 · 0,01 = 99,99 %
Wie viele Minuten Ausfall pro Jahr bedeuten 99,99 %?::ca. 52,6 Minuten
Was zeigt tracert/traceroute?::Die Router (Hops) auf dem Weg zum Ziel mit Laufzeiten – Sterne: keine Antwort des Hops
Warum antwortet ein Server nicht auf ping, obwohl er läuft?::ICMP wird von einer Firewall blockiert
Was bedeutet eine Duplexeinstellung „halb“ mit vielen Kollisionen?::Duplex-Mismatch – beide Seiten auf Auto oder gleich fest einstellen
Woran erkennst du ARP-Spoofing im Mitschnitt?::Eine IP (meist das Gateway) wird von zwei verschiedenen MAC-Adressen beansprucht
Schutz vor ARP-Spoofing?::Dynamic ARP Inspection mit DHCP-Snooping, Port Security, 802.1X
Was ist ein Mirror-/SPAN-Port?::Switchport, auf den der Verkehr anderer Ports kopiert wird – für Mitschnitte/IDS
Unterschied SNMP-Polling und Trap?::Polling: Manager fragt regelmäßig ab · Trap: Gerät meldet Ereignis selbstständig
Was bedeutet „Shared Medium“ bei GPON/Kabel?::Mehrere Kunden teilen sich die Bandbreite eines Segments – zu Stoßzeiten sinkt die Leistung
Nenne drei WAN-Anschlussarten.::DSL/VDSL, Glasfaser (FTTH/GPON), Kabel (DOCSIS), Standleitung, Mobilfunk (LTE/5G), Satellit
