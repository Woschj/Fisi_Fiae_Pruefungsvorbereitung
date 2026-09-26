---
bereich: Netzwerk
tags: [ap1/kartenquelle]
---
# Kartenquelle Netzwerk

> [!warning] Hier stehen die Antworten
> Zum Lernen [[Karten Netzwerk]] öffnen. Diese Datei ist nur zum Bearbeiten und Ergänzen da – Format: `Frage::Antwort` (eine Zeile) oder mehrzeilig: Frage, Zeile mit `?`, Antwort, Leerzeile. Ein `::` in der Antwort einer mehrzeiligen Karte in Backticks setzen.

#flashcards/ap1/netzwerk

Auf welcher OSI-Schicht arbeitet ein Switch – und anhand welcher Adressen?::Schicht 2 (Sicherungsschicht), anhand von MAC-Adressen
Auf welcher OSI-Schicht arbeitet ein Router – und anhand welcher Adressen?::Schicht 3 (Vermittlungsschicht), anhand von IP-Adressen
Wie heißen die Dateneinheiten (PDUs) der OSI-Schichten 1 bis 4?::Schicht 1 Bit · Schicht 2 Frame · Schicht 3 Paket · Schicht 4 Segment (TCP) bzw. Datagramm (UDP)
Wie heißen die sieben OSI-Schichten von unten nach oben?::Bitübertragung, Sicherung, Vermittlung, Transport, Sitzung, Darstellung, Anwendung
Welche vier Schichten hat das TCP/IP-Modell und welchen OSI-Schichten entsprechen sie?::Netzzugang (OSI 1–2), Internet (3), Transport (4), Anwendung (5–7)
Wie läuft der Verbindungsaufbau bei TCP (3-Way-Handshake) ab?::SYN → SYN-ACK → ACK
Warum nutzt VoIP UDP statt TCP?::Bei Echtzeit ist Verzögerung schlimmer als ein verlorenes Paket – UDP hat keine Neuübertragung und weniger Overhead
Welche Adressen ändern sich, wenn ein Paket einen Router passiert?::Die MAC-Adressen – die IP-Adressen bleiben Ende-zu-Ende gleich (außer bei NAT)
Welchen Dezimalwert hat das Hex-Byte `c8`?::12 · 16 + 8 = 200
Wie lang ist eine MAC-Adresse und was steht in den ersten 3 Byte?::48 Bit = 6 Byte – die ersten 3 Byte kennzeichnen den Hersteller (OUI)

Welche Werte kann ein Oktett einer Subnetzmaske annehmen?::0, 128, 192, 224, 240, 248, 252, 254, 255
Wie lautet die Subnetzmaske zum Präfix /26?::255.255.255.192
Wie lautet die Subnetzmaske zum Präfix /21?::255.255.248.0
Wie viele Hosts sind in einem /27-Netz nutzbar?::30 (2⁵ − 2)
Wie viele Hosts sind in einem /23-Netz nutzbar?::510 (2⁹ − 2)
Mit welcher Formel berechnest du die nutzbaren Hosts eines Subnetzes?::2^(32 − Präfix) − 2 (Netz- und Broadcastadresse abziehen)
Wie bestimmst du die Blockgröße (Schrittweite) eines Subnetzes?::256 − Wert der Maske im „interessanten“ Oktett
Wie viele Bits musst du leihen, um ein Netz in n Subnetze zu teilen?::Das kleinste s mit 2^s ≥ n
Welche IPv4-Adressbereiche sind privat?::10.0.0.0/8 · 172.16.0.0/12 · 192.168.0.0/16
Was bedeutet es, wenn ein Client eine Adresse aus 169.254.0.0/16 hat?::APIPA – er hat keinen DHCP-Server erreicht und sich selbst eine Adresse gegeben
Wofür steht die Adresse 127.0.0.1?::Loopback (localhost) – der eigene Rechner
In welcher Reihenfolge verteilst du Subnetze bei VLSM?::Anforderungen absteigend sortieren und die größten Netze zuerst vergeben
Wozu dient das Standardgateway und wo muss es liegen?::Router für alle Ziele außerhalb des eigenen Subnetzes – es muss im eigenen Subnetz liegen

Wie ist eine IPv6-Adresse aufgebaut?::128 Bit in 8 Blöcken zu je 16 Bit (4 Hex-Ziffern), getrennt durch Doppelpunkte

Nach welchen Regeln kürzt du eine IPv6-Adresse?
?
1. Führende Nullen in jedem Block weglassen
2. Eine Folge von mindestens 2 Null-Blöcken durch `::` ersetzen – nur einmal pro Adresse
3. Die längste Folge ersetzen, bei Gleichstand die erste; Kleinbuchstaben verwenden

Mit welchem Präfix beginnen IPv6-Link-Local-Adressen?::fe80::/10
Welcher IPv6-Bereich entspricht den privaten IPv4-Adressen (Unique Local)?::fc00::/7 – in der Praxis fd00::/8
Aus welchem Bereich stammen öffentliche IPv6-Adressen (Global Unicast)?::2000::/3

Wie lautet die IPv6-Loopback-Adresse?
?
`::1` – entspricht 127.0.0.1

Gibt es bei IPv6 Broadcast?::Nein – stattdessen Multicast, z. B. ff02::1 für alle Knoten im Segment
Was ist SLAAC?::Stateless Address Autoconfiguration – der Host bildet seine Adresse selbst aus dem Präfix im Router Advertisement und einer Interface-ID
Wie wird mit EUI-64 aus einer MAC-Adresse eine Interface-ID?::MAC in der Mitte teilen, ff:fe einfügen und das 7. Bit (U/L-Bit) umkehren
Wie viele /64-Subnetze passen in ein /48-Präfix?::2¹⁶ = 65 536

Wie läuft die Adressvergabe per DHCP ab?::DORA: Discover → Offer → Request → Acknowledge
Welche Ports nutzt DHCP?::UDP 67 (Server) und UDP 68 (Client)
Wofür wird ARP verwendet?::Es ermittelt zu einer IP-Adresse im LAN die MAC-Adresse (Anfrage per Broadcast, Antwort per Unicast)
Wofür stehen die DNS-Einträge A, AAAA, MX, CNAME und PTR?::A: IPv4-Adresse · AAAA: IPv6-Adresse · MX: Mailserver · CNAME: Alias · PTR: Rückwärtsauflösung
Wie funktioniert NAT bzw. PAT am Internetrouter?::Private Quell-IPs werden durch die öffentliche IP des Routers ersetzt; die Verbindungen werden über Portnummern unterschieden
Welcher Dienst nutzt Port 22?::SSH (auch SFTP und SCP)
Welcher Dienst nutzt Port 25?::SMTP – Mailtransport zwischen Servern
Welcher Dienst nutzt Port 53?::DNS
Welche Dienste nutzen Port 80 und Port 443?::80 HTTP · 443 HTTPS
Welche Dienste nutzen Port 110 und Port 995?::110 POP3 · 995 POP3S (verschlüsselt)
Welche Dienste nutzen Port 143 und Port 993?::143 IMAP · 993 IMAPS (verschlüsselt)
Welcher Dienst nutzt Port 587?::SMTP Submission – Mailversand vom Client zum Server
Welcher Dienst nutzt Port 3389?::RDP (Remotedesktop)
Welcher Dienst nutzt Port 123?::NTP (Zeitsynchronisation)
Welcher Dienst nutzt Port 161?::SNMP (Netzwerküberwachung)
Welche Dienste nutzen Port 389 und Port 636?::389 LDAP · 636 LDAPS (verschlüsselt)
Welcher Dienst nutzt Port 445?::SMB – Windows-Datei- und Druckerfreigaben
Was ist der Unterschied zwischen IMAP und POP3?::IMAP synchronisiert, die Mails bleiben auf dem Server · POP3 lädt die Mails herunter

In welche Bereiche gliedert sich die strukturierte Verkabelung?::Primär: zwischen Gebäuden · Sekundär: zwischen Etagen · Tertiär: vom Etagenverteiler zur Anschlussdose
Wie lang darf eine Kupfer-Ethernet-Strecke höchstens sein?::100 m Kanal = 90 m Verlegekabel + 10 m Patchkabel
Was leistet ein Kabel der Kategorie Cat 6A?::Klasse EA, 500 MHz, 10 Gbit/s auf 100 m
Wie berechnest du die Dämpfung aus Spannungen bzw. Leistungen?::Spannung: a = 20 · log(U1 ÷ U2) · Leistung: a = 10 · log(P1 ÷ P2)
Was gibt die Einheit dBm an?::Leistungspegel bezogen auf 1 mW: 10 · log(P ÷ 1 mW) – 0 dBm = 1 mW, 20 dBm = 100 mW, 30 dBm = 1 W
Welcher Leistungsänderung entsprechen 3 dB?::Etwa einer Verdopplung (+3 dB) bzw. Halbierung (−3 dB) der Leistung
Was gibt der ACR-Wert eines Kabels an?::NEXT − Dämpfung – je größer, desto besser das Signal-Rausch-Verhältnis
Wie unterscheiden sich Multimode- und Singlemode-Glasfaser?::Multimode: dicker Kern (50/62,5 µm), kurze Strecken · Singlemode: 9 µm Kern, lange Strecken
Welche Leistung liefern die PoE-Normen 802.3af, at und bt?::af 15,4 W · at 30 W · bt Typ 3 60 W · bt Typ 4 90 W (jeweils am Switch-Port)
Was ist der Unterschied zwischen Access-Port und Trunk-Port?::Access: genau ein VLAN, ungetaggt (Endgeräte) · Trunk: mehrere VLANs, nach 802.1Q getaggt (Switch zu Switch)
Wie berechnest du die nötige Switching Capacity für einen nicht blockierenden Switch?::Anzahl Ports × Portgeschwindigkeit × 2 (Vollduplex)

Welche IEEE-Standards verbergen sich hinter Wi-Fi 4, 5, 6 und 7?::Wi-Fi 4 = 802.11n · Wi-Fi 5 = 802.11ac · Wi-Fi 6 = 802.11ax · Wi-Fi 7 = 802.11be
In welchem Frequenzband funkt 802.11ac?::Nur im 5-GHz-Band
Welche Kanäle im 2,4-GHz-Band überlappen sich nicht?::1, 6 und 11
Wie berechnest du die effektive Strahlungsleistung (EIRP)?::Sendeleistung + Antennengewinn − Kabelverlust (in dB bzw. dBm)
Wie funktioniert WPA2/WPA3-Enterprise?::Anmeldung per 802.1X mit einem RADIUS-Server – jede Person meldet sich individuell an
Wie richtest du ein sicheres Gäste-WLAN ein?::Eigenes VLAN, Firewall erlaubt nur Internet, Client-Isolation, Captive Portal

Wie ist eine URL aufgebaut?::Protokoll (https) · Host (Subdomain, Domain, TLD) · optional Port · Pfad · Query-String (?name=wert) · Fragment (#anker)
Was unterscheidet statische und dynamische Websites?::Statisch: fertige Dateien, für alle gleich · dynamisch: Inhalte werden bei jedem Aufruf auf dem Server erzeugt, meist aus einer Datenbank
Welche Sprachen nutzt man für dynamische Websites serverseitig?::PHP, Python, Java, C#, JavaScript mit Node.js – dazu SQL für die Datenbank
Welche Aufgaben haben HTML, CSS und JavaScript?::HTML: Struktur und Inhalt · CSS: Gestaltung und Layout · JavaScript: Verhalten im Browser
Was bedeuten die HTTP-Statuscodes 200, 404 und 500?::200 OK · 404 nicht gefunden · 500 interner Serverfehler
Was ist Responsive Webdesign?::Das Layout passt sich per CSS an Smartphone, Tablet und Desktop an
Was gehört ins Impressum einer Firmenwebsite?::Name und Anschrift, E-Mail und Telefon, Vertretungsberechtigte, Registereintrag, USt-IdNr. (bei Kammerberufen Kammer und Berufsbezeichnung)
Welche Vor- und Nachteile hat ein CMS?::Vorteil: Inhalte ohne HTML-Kenntnisse pflegen, Rollen und Vorlagen · Nachteil: regelmäßige Updates von Kern und Plugins nötig
Wann nutzt man SSH, Telnet und die serielle Konsole?::SSH: verschlüsselte Fernwartung · Telnet: unverschlüsselt, nicht mehr nutzen · Konsole: Erstkonfiguration ohne IP, Notfallzugang
Was unterscheidet Site-to-Site- und Client-to-Site-VPN?::Site-to-Site verbindet ganze Standorte dauerhaft · Client-to-Site verbindet einzelne Geräte (Homeoffice) mit dem Firmennetz
Wo wird CSMA/CD und wo CSMA/CA verwendet?::CSMA/CD im klassischen Ethernet mit Kollisionen (Hub) · CSMA/CA im WLAN
