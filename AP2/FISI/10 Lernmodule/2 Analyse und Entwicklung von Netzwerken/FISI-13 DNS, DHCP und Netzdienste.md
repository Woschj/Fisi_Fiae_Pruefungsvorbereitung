---
modul: FISI-13
titel: DNS, DHCP und Netzdienste
bereich: Netzwerke
pruefungsteil: "AP2 Teil 2 – Analyse und Entwicklung von Netzwerken"
reihenfolge: 13
dauer: 150
status: neu
sicherheit: 0
zuletzt:
tags: [ap2/modul, ap2/fisi]
---
# FISI-13 · DNS, DHCP und Netzdienste

> [!abstract] Überblick
> **Bereich:** [[Übersicht FISI Netzwerke]]
> **Prüfung:** „Analyse und Entwicklung von Netzwerken“ (E-Mail-Sicherheit auch im Konzeptionsteil)
> **Dauer:** ca. 150 min · **Prüfungsrelevanz:** ★★★ – DNS-Abfragen analysieren, Forwarder und Einträge prüfen sowie den DHCP-Ablauf erläutern.
> **Grundlagen aus AP1:** [[N4 Netzwerkdienste und Protokolle]] · [[N7 Internet und Webanwendungen]]

## Lernziele
- [ ] Ich kann die rekursive und iterative Namensauflösung sowie einen DNS-Forwarder erklären.
- [ ] Ich kenne die Ressourceneinträge A, AAAA, CNAME, MX, NS, PTR, TXT und finde Fehler in einer Zonendatei.
- [ ] Ich kann die Ausgabe von `nslookup` Zeile für Zeile deuten.
- [ ] Ich kann SPF, DKIM und DMARC sowie DNSSEC erklären und DNS-Spoofing einordnen.
- [ ] Ich kann den DHCP-Ablauf (DORA), Leases, Reservierungen und DHCP-Relay erklären.
- [ ] Ich kann E-Mail-Protokolle mit Ports und Verbindungssicherheit (STARTTLS, TLS) konfigurieren.

## So wird das geprüft
> [!info] Typische AP2-Aufgabentypen
> - **`nslookup`-Ausgabe erklären:** antwortender Server, seine IP, „nicht autorisierende Antwort“, IPv6- und IPv4-Adresse des Ziels.
> - **Namensauflösung Schritt für Schritt** über Root → de → ihk.de, **Forwarder** und Vorteil; warum intern kein öffentlicher DNS-Server eingetragen wird.
> - **Zonendatei-Fehler:** fehlende A-Records der Mailserver, SPF erlaubt Newsletter-Dienst nicht, **CNAME zeigt auf falschen Host**.
> - **DNSSEC** (Authentizität, Integrität) und **DNS-Spoofing**, **Split-Horizon-DNS**.
> - **DKIM/SPF** aus englischem RFC-Text beantworten.
> - **DHCP:** DORA benennen, warum Discover als Broadcast, was der Client vor dem Nutzen einer Adresse prüft, DHCP-Parameter aus Mitschnitt vs. `ipconfig /all`.
> - **E-Mail-Client einrichten:** IMAP, STARTTLS, Passwort normal.

---

## 1. DNS – Namensauflösung

**DNS** übersetzt Namen in IP-Adressen (Forward Lookup) und umgekehrt (Reverse Lookup, PTR). Port **53** (UDP, bei großen Antworten und Zonentransfer TCP).

**Ablauf** für `www.ihk.de`:
1. Client fragt seinen eingetragenen DNS-Server (z. B. Router oder Domain Controller) – **rekursive Anfrage**: „Liefere mir die fertige Antwort.“
2. Hat der Server die Antwort im **Cache**, antwortet er sofort (**nicht autoritativ**).
3. Sonst löst er **iterativ** auf: Root-Server → Verweis auf die Server der Zone **.de** → Verweis auf die Server von **ihk.de** → diese kennen die IP von **www.ihk.de** (autoritative Antwort).
4. Er speichert das Ergebnis für die Dauer der **TTL** im Cache und antwortet dem Client.

**Forwarder (Weiterleitung):** Der lokale DNS-Server löst externe Namen nicht selbst iterativ auf, sondern gibt die komplette Anfrage an einen anderen DNS-Server weiter (z. B. beim Provider). Vorteil: dessen großer Cache liefert viele Antworten sofort, weniger eigene Last und Verkehr.

**Warum intern keinen öffentlichen DNS (8.8.8.8) eintragen?** Öffentliche Server kennen die **internen Namen** (Fileserver, Domain Controller, `firma.local`) nicht → Anmeldung an der Domäne und Zugriffe per Namen scheitern. Richtig: **Domain Controller/interner DNS** als DNS-Server, der seinerseits nach außen weiterleitet.

### Ressourceneinträge
| Typ | Bedeutung | Beispiel |
|---|---|---|
| **A** | Name → IPv4 | `www  A  203.0.113.80` |
| **AAAA** | Name → IPv6 | `www  AAAA  2001:db8:1234::80` |
| **CNAME** | Alias → anderer **Name** | `ftp  CNAME  ftp1.firma.de.` |
| **MX** | Mailserver der Domäne (mit Priorität) | `@  MX 10  mail1.firma.de.` |
| **NS** | zuständige Nameserver der Zone | |
| **PTR** | IP → Name (Reverse-Zone) | |
| **TXT** | beliebiger Text, u. a. **SPF**, **DKIM**-Schlüssel, **DMARC** | `v=spf1 mx include:newsletter.de -all` |
| **SOA** | Start of Authority: Primärserver, Seriennummer, Timer | |
| SRV | Dienst mit Port (z. B. `_ldap._tcp` für Active Directory) | |

**Häufige Fehler in Zonen:** MX zeigt auf einen Namen ohne A-/AAAA-Record · CNAME zeigt auf den falschen Host (z. B. `ftp` → `firma.de` statt `ftp1.firma.de`) · CNAME und andere Einträge für denselben Namen · fehlender Punkt am Ende eines FQDN (`ftp1.firma.de.`) · SPF enthält einen berechtigten Versender nicht.

### nslookup lesen
```
> nslookup www.google.de
Server:   router.local                     ← (2) Name des antwortenden DNS-Servers
Address:  fe80::1                          ← (3) seine IP (hier Link-Local IPv6)
Nicht autorisierende Antwort:              ← (4) Antwort aus dem Cache, nicht vom zuständigen Server
Name:     www.google.de                    ← (5) abgefragter Name
Addresses: 2a00:1450:4001:815::2003        ← (6) IPv6-Adresse (AAAA)
           216.58.208.35                   ← (7) IPv4-Adresse (A)
```

**Unterschiedliche Adressen bei zwei Abfragen:** Lastverteilung per DNS (mehrere A-Records, Round Robin), unterschiedliche DNS-Server mit verschiedenem Cache-Stand, Geo-DNS.

### Split-Horizon-DNS
Derselbe Name liefert **intern eine andere Antwort als extern**: Ein Mitarbeiter im LAN bekommt für `shop.firma.de` die **interne** IP (direkter Weg), jemand aus dem Internet die **öffentliche** IP (Reverse Proxy/Portforwarding). Vorteil: kein Umweg über die Firewall, interne Struktur bleibt verborgen.

---

## 2. DNS-Sicherheit und E-Mail-Authentifizierung

**Angriffe:** **DNS-Spoofing/Cache Poisoning** – gefälschte Antworten landen im Cache des Resolvers, Nutzer werden auf falsche Server gelenkt; **DNS-Injection** – falsche Daten direkt im Server konfiguriert; Hijacking der Domain beim Registrar.

**DNSSEC** sichert DNS-Antworten mit **digitalen Signaturen**:
- **Authentizität:** die Antwort stammt vom zuständigen Server (Signatur mit dessen Schlüssel, Vertrauenskette ab der Root-Zone)
- **Integrität:** die Antwort wurde unterwegs nicht verändert (Hash wird mit der Signatur geprüft)
DNSSEC verschlüsselt **nicht** – Vertraulichkeit bieten DNS over TLS/HTTPS (DoT/DoH).

| Verfahren | Zweck | wo |
|---|---|---|
| **SPF** (Sender Policy Framework) | legt fest, **welche Server** für eine Domäne Mails versenden dürfen (`HELO`/`MAIL FROM`) | TXT-Record der Domäne |
| **DKIM** (DomainKeys Identified Mail) | der sendende Server **signiert** die Mail; der **öffentliche Schlüssel** liegt im DNS; die Signatur steht im Header `DKIM-Signature` | TXT-Record `selector._domainkey` |
| **DMARC** | Richtlinie, was mit Mails passiert, die SPF/DKIM nicht bestehen (none/quarantine/reject), plus Berichte | TXT-Record `_dmarc` |

„**DKIM signature verification failed**“ bedeutet: Signatur fehlerhaft, fehlt, oder die Mail wurde **nach dem Signieren verändert** (z. B. durch einen Mailinglisten-Server). Ein Newsletter-Dienst darf nur mit eurer Absenderdomäne verschicken, wenn er im **SPF-Eintrag** steht.

---

## 3. DHCP

Der **DHCP-Server** vergibt IP-Adresse, Subnetzmaske, **Standardgateway**, **DNS-Server**, Lease-Dauer und weitere Optionen (NTP, Domänenname, TFTP/PXE, Optionen für IP-Telefone). Ports **67 (Server) / 68 (Client)**, UDP.

**DORA:**
1. **Discover** – Client sucht per **Broadcast** (er hat noch keine IP und kennt den Server nicht)
2. **Offer** – Server bietet eine Adresse an
3. **Request** – Client fordert die angebotene Adresse an (Broadcast, damit andere Server wissen, dass ihr Angebot nicht genommen wird)
4. **Acknowledge** – Server bestätigt, die Lease beginnt

Vor der Nutzung prüft der Client per **ARP** (bzw. Gratuitous ARP), ob die Adresse wirklich frei ist – sonst Adresskonflikt.
**Lease:** Nach 50 % der Laufzeit versucht der Client zu verlängern. **Reservierung:** feste IP für eine bestimmte MAC (Drucker, Server). **Ausschlüsse:** Bereiche für statische Adressen.
**Kein DHCP-Server erreichbar** → Windows vergibt sich eine **APIPA-Adresse 169.254.x.x** → nur lokale Kommunikation. Abhilfe: Verbindung/Server prüfen, DHCP-Relay über VLAN-Grenzen, `ipconfig /release` und `/renew`.

**Parameter stimmen nicht mit dem Mitschnitt überein**: Ein **zweiter (fremder) DHCP-Server** im Netz (Rogue DHCP, z. B. ein privater Router) antwortet schneller, oder es sind statische Werte auf dem Client eingetragen. Abhilfe: **DHCP-Snooping** am Switch, fremdes Gerät finden und entfernen, Client auf „automatisch beziehen“ stellen und Lease erneuern.

---

## 4. Weitere Dienste

| Dienst | Port(s) | Hinweis |
|---|---|---|
| **SMTP** | 25 (Server ↔ Server), **587** Submission mit **STARTTLS**, **465** SMTPS (implizites TLS) | Mails versenden |
| **IMAP** | 143 (+ STARTTLS), **993** IMAPS | Mails auf dem Server verwalten, mehrere Geräte synchron |
| **POP3** | 110, **995** POP3S | Mails herunterladen (meist lokal löschen) |
| NTP | 123/UDP | Zeitsynchronisation – wichtig für Kerberos, Logs, Zertifikate |
| LDAP / LDAPS | 389 / 636 | Verzeichnisdienst (Active Directory) |
| SNMP | 161, Traps 162 | Monitoring (→ [[FISI-16 Netzwerkanalyse, Fehlersuche und WAN]]) |
| SIP / RTP | 5060/5061, dynamische UDP-Ports | VoIP-Signalisierung / Sprachdaten |
| MQTT | 1883, 8883 (TLS) | IoT: Sensoren „publishen“ an einen **Broker**, Clients „subscriben“; läuft über **TCP**, damit die Nachrichten zuverlässig ankommen |

**STARTTLS vs. TLS:** STARTTLS beginnt unverschlüsselt auf dem Standardport und wechselt dann per Befehl zu TLS; implizites TLS (465, 993, 995) ist von Anfang an verschlüsselt. Einstellung im Mailclient z. B.: Protokoll **IMAP**, Verbindungssicherheit **STARTTLS**, Authentifizierung **Passwort, normal**.

---

> [!warning] Typische Fehler in Prüfungen
> - „Nicht autorisierende Antwort“ als Fehler deuten – sie bedeutet nur: **aus dem Cache** eines nicht zuständigen Servers.
> - Rekursiv und iterativ vertauschen: **Client → Resolver rekursiv**, **Resolver → Root/TLD iterativ**.
> - CNAME auf eine **IP** zeigen lassen – CNAME zeigt immer auf einen **Namen**.
> - DNSSEC als Verschlüsselung beschreiben.
> - DORA-Schritte in falscher Reihenfolge oder Discover als Unicast.

## Verwandte Themen
- [[FISI-11 Switching, VLAN und Verkabelung]] – DHCP-Relay über VLANs
- [[FISI-12 NAT, Firewall, DMZ und Proxy]] – Ports in Firewallregeln
- [[FISI-15 VPN, TLS und PKI]] – Zertifikate, Signaturen
- [[FISI-16 Netzwerkanalyse, Fehlersuche und WAN]] – DNS in Mitschnitten
- [[N4 Netzwerkdienste und Protokolle]] – Grundlagen aus AP1

## Zusammenfassung
- DNS: Client rekursiv → Resolver iterativ (Root → TLD → Zone), Cache mit TTL, Forwarder spart Aufwand.
- A (IPv4), AAAA (IPv6), CNAME (Alias auf Namen), MX (Mailserver), TXT (SPF/DKIM/DMARC), PTR (Reverse).
- nslookup: Server, Adresse, „nicht autorisierend“ = Cache, Name, Adressen.
- DNSSEC = Signaturen (Authentizität, Integrität), keine Verschlüsselung. Split-Horizon: intern andere Antwort als extern.
- DHCP: DORA, Discover per Broadcast, ARP-Prüfung, Lease, Reservierung, APIPA bei Ausfall, DHCP-Snooping gegen fremde Server.
- Mail: SMTP 25/587/465, IMAP 143/993, POP3 110/995; STARTTLS vs. implizites TLS.

## Direkt üben
```dataviewjs
await dv.view("AP2/99 System/views/trainer", { typen: ["ports"] })
```

## Selbstcheck
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { modul: "FISI-13" })
```

**Weitere Aufgaben:** [[Aufgaben Netzwerke#FISI-13 DNS, DHCP und Netzdienste]] · **Karteikarten:** [[Karten Netzwerke]]

## Einschätzung
```dataviewjs
await dv.view("AP2/99 System/views/selbstcheck")
```

---
← [[FISI-12 NAT, Firewall, DMZ und Proxy]] · Weiter: [[FISI-14 WLAN und Netzzugangskontrolle]] →
