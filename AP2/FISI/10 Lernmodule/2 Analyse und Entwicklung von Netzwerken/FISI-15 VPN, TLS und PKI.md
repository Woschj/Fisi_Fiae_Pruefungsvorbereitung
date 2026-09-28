---
modul: FISI-15
titel: VPN, TLS und PKI
bereich: Netzwerke
pruefungsteil: "AP2 Teil 2 – Analyse und Entwicklung von Netzwerken"
reihenfolge: 15
dauer: 150
status: neu
sicherheit: 0
zuletzt:
tags: [ap2/modul, ap2/fisi]
---
# FISI-15 · VPN, TLS und PKI

> [!abstract] Überblick
> **Bereich:** [[Übersicht FISI Netzwerke]]
> **Prüfung:** „Analyse und Entwicklung von Netzwerken“ (Kryptografie auch im Konzeptionsteil)
> **Dauer:** ca. 150 min · **Prüfungsrelevanz:** ★★★ – Zertifikate und hybride Verschlüsselung erläutern, TLS-Handshakes nachvollziehen sowie VPN-Arten und Verbindungsfehler beurteilen.
> **Grundlagen aus AP1:** [[I4 Kryptografie]] · [[N4 Netzwerkdienste und Protokolle]]

## Lernziele
- [ ] Ich kann symmetrische, asymmetrische und hybride Verschlüsselung erklären und Algorithmen bewerten.
- [ ] Ich kann Hashfunktionen, digitale Signaturen und Kollisionsangriffe erklären.
- [ ] Ich kann den Aufbau eines X.509-Zertifikats, die Rolle der CA und eine eigene vs. externe PKI beschreiben.
- [ ] Ich kann den TLS-Handshake und die Neuerungen von TLS 1.3 (Diffie-Hellman, PFS) erklären.
- [ ] Ich kann Site-to-Site- und Remote-Access-VPN unterscheiden und typische VPN-Probleme (NAT, MTU, IPv6) lösen.
- [ ] Ich kann Verfahren der Zwei-Faktor-Authentifizierung vergleichen.

## So wird das geprüft
> [!info] Typische AP2-Aufgabentypen
> - **Algorithmen bewerten:** AES-128, AES-256, MD5, SHA-256, DES/AES/RSA für Datenträger.
> - **Zertifikatsinhalte nennen**, **CA erklären**, **interne vs. externe CA**.
> - **Hybride Verschlüsselung bei TLS**, **TLS-Handshake in Schritten**, **TLS 1.2 vs. 1.3**, Diffie-Hellman.
> - **Kompromittierte CA** (privater Schlüssel per Mail verschickt) und **MD5-Kollision** bei Zertifikaten.
> - **VPN-Arten** End-to-Site/Site-to-Site, VPN-Fehler: **NAT-Traversal, MTU, IPv6-Breakout**, Fehlersuche, VPN mit/ohne CA, **Hardwarekriterien für VPN-Gateways**.
> - **Sicherheitsziele eines VPN**: Vertraulichkeit, Integrität, Authentizität.
> - **2FA-Varianten vergleichen**, Hardware-Token-Vorteile.

---

## 1. Verschlüsselungsverfahren

| | **symmetrisch** | **asymmetrisch** | **hybrid** |
|---|---|---|---|
| Schlüssel | **ein** gemeinsamer geheimer Schlüssel | **Schlüsselpaar**: öffentlicher (verschlüsseln/prüfen) und privater (entschlüsseln/signieren) | asymmetrisch für den **Schlüsselaustausch**, symmetrisch für die **Daten** |
| Geschwindigkeit | **schnell** | langsam, rechenintensiv | schnell |
| Problem | sicherer Schlüsselaustausch, n·(n−1)/2 Schlüssel | Echtheit des öffentlichen Schlüssels (→ PKI), 2n Schlüssel | – |
| Beispiele | **AES** (128/192/256), ChaCha20; veraltet: DES, 3DES | **RSA**, ECC; Diffie-Hellman (Schlüsselvereinbarung) | **TLS**, S/MIME, PGP, IPsec |

**Bewertung von Algorithmen:**
| Algorithmus | Art | Bewertung |
|---|---|---|
| DES | symmetrisch, 56 Bit | **unsicher** (Brute Force) |
| AES-128 | symmetrisch | sicher |
| AES-256 | symmetrisch | sehr sicher, Standard für Datenträger (BitLocker, LUKS) und Übertragung |
| RSA | asymmetrisch | für Schlüsselaustausch/Signaturen, **nicht** für große Datenmengen oder Festplattenverschlüsselung |
| MD5 | Hash | **nicht geeignet**, Kollisionen möglich |
| SHA-1 | Hash | veraltet |
| SHA-256/SHA-3 | Hash | sicher – aber **keine Verschlüsselung**, sondern Prüfsumme/Signaturbaustein |

**Hashfunktion:** erzeugt aus beliebigen Daten einen **Prüfwert fester Länge**, **Einwegfunktion** (nicht umkehrbar), kleine Änderung → völlig anderer Hash, kollisionsresistent. Einsatz: Integrität, Signaturen, **Passwortspeicherung mit Salt**.
**Digitale Signatur:** Hash der Nachricht wird mit dem **privaten Schlüssel des Absenders** verschlüsselt; der Empfänger prüft mit dessen **öffentlichem Schlüssel** → Integrität + Authentizität + Nichtabstreitbarkeit.

---

## 2. PKI und Zertifikate

Ein **Zertifikat** (X.509) bindet einen **öffentlichen Schlüssel an eine Identität** und ist von einer **Zertifizierungsstelle (CA)** signiert.

**Inhalte:** Version · **Seriennummer** · **Inhaber** (Common Name, Organisation, Subject Alternative Names) · **öffentlicher Schlüssel des Inhabers** · **Aussteller (CA)** · **Gültigkeitszeitraum** · Signaturalgorithmus · **Signatur der CA** · Verwendungszweck (Key Usage).

**CA (Certificate Authority):** vertrauenswürdige Stelle, die Zertifikate **ausstellt, verwaltet und widerruft** (CRL, OCSP). Browser und Betriebssysteme vertrauen einer Liste von **Root-CAs**; darunter signieren **Intermediate-CAs** die Serverzertifikate → **Vertrauenskette**. Beim Signieren wird ein **Hash** des Zertifikats mit dem privaten Schlüssel der CA verschlüsselt.

| eigene (interne) CA | externe (öffentliche) CA |
|---|---|
| volle Kontrolle über Root-Schlüssel und Verfahren, Zertifikate sofort ausstellbar, kostenlos | Zertifikate werden von allen Browsern **automatisch akzeptiert** |
| Root-Zertifikat muss auf alle Clients verteilt werden (GPO/MDM) | keine eigene Infrastruktur, Erfahrung des Anbieters |
| nur für interne Dienste, 802.1X, VPN, TLS-Inspection | kostenpflichtig (außer Let's Encrypt), weniger Kontrolle |

**Fehlerbilder:**
- **Zertifikatswarnung** im Browser: Intermediate-CA fehlt (Kette unvollständig), Zertifikat **abgelaufen**, **Systemzeit** des Clients falsch, Name passt nicht, Root-CA unbekannt (z. B. Proxy-CA), veraltete TLS-Version/Cipher.
- **Privater Schlüssel der CA kompromittiert** (z. B. per Mail verschickt): Die **gesamte CA ist unbrauchbar** – neue CA mit neuen Schlüsseln aufbauen und **alle** von ihr signierten Zertifikate ersetzen.
- **MD5 bei Zertifikaten:** Weil die CA nur den **Hash** signiert, kann ein Angreifer bei einer kollisionsanfälligen Hashfunktion ein **gefälschtes Zertifikat mit gleichem Hash** erzeugen – die Signatur passt dann auch zur Fälschung.

**Serverzertifikat einrichten:** Schlüsselpaar und **CSR** (Certificate Signing Request) erzeugen → Zertifikat bei der CA beantragen → privaten Schlüssel mit Passwort schützen bzw. sicher ablegen → Zertifikat auf dem Server installieren **inklusive Intermediate-Zertifikaten**.
**„Zertifikat geprüft“** bedeutet nur: Die CA hat die Angaben nach ihren Regeln validiert und signiert – über die Vertrauenswürdigkeit des Inhabers sagt das nichts aus.

---

## 3. TLS

**TLS** (Transport Layer Security) sichert HTTPS, SMTPS, IMAPS, LDAPS. Ziele: **Authentifizierung des Servers**, **Vertraulichkeit**, **Integrität**.

**Handshake (vereinfacht):**
1. **Client Hello** – unterstützte TLS-Versionen und Cipher Suites, Zufallswert
2. **Server Hello** – gewählte Version und Cipher Suite; Server sendet sein **Zertifikat** mit öffentlichem Schlüssel
3. Client **prüft das Zertifikat** (Gültigkeit, Name/Domain, Vertrauenskette zur CA, Widerruf)
4. **Schlüsselaustausch** (bei TLS 1.3 immer **(EC)Diffie-Hellman**) → beide berechnen denselben **Sitzungsschlüssel**
5. Daten werden **symmetrisch** (z. B. AES-GCM) mit dem Sitzungsschlüssel verschlüsselt

Das ist **hybride Verschlüsselung**: Der aufwendige asymmetrische Teil läuft nur beim Verbindungsaufbau über die unsichere Leitung, danach das schnelle symmetrische Verfahren.

**TLS 1.3 gegenüber 1.2:** nur noch Schlüsselaustausch mit **Perfect Forward Secrecy** (ephemeral Diffie-Hellman – ein später gestohlener Serverschlüssel entschlüsselt keine alten Sitzungen), veraltete Algorithmen entfernt, Handshake großteils verschlüsselt und schneller (1-RTT), keine unsichere Session-Renegotiation. Asymmetrische Kryptografie dient in TLS 1.3 **nur noch zur Authentifizierung** (Signaturprüfung), nicht zur Verschlüsselung des Schlüssels.
**Diffie-Hellman:** Verfahren, mit dem zwei Parteien über einen **offenen Kanal** einen gemeinsamen geheimen Schlüssel **berechnen**, ohne ihn zu übertragen.

---

## 4. VPN

Ein **VPN** (Virtual Private Network) baut einen **verschlüsselten Tunnel** über ein unsicheres Netz (Internet). Ziele: **Vertraulichkeit**, **Integrität**, **Authentizität** beider Endpunkte.

| Art | Einsatz | Einrichtung |
|---|---|---|
| **Site-to-Site** | Filialen dauerhaft mit der Zentrale verbinden | VPN-Gateway/Router an beiden Standorten |
| **End-to-Site / Remote Access** („Roadwarrior“) | Außendienst, Homeoffice, Busfahrer mit Tablet | VPN-Gateway in der Firma + **VPN-Client** auf dem Endgerät |
| End-to-End | zwei Endgeräte direkt | Clients auf beiden Seiten |

**Protokolle:** **IPsec** (IKEv2, ESP; UDP 500/4500), **OpenVPN** (TLS-basiert, UDP/TCP 1194), **WireGuard** (UDP 51820, schlank, moderne Kryptografie), SSL-VPN im Browser.
**Split Tunneling:** nur Firmenverkehr durch den Tunnel; **Full Tunnel:** aller Verkehr, damit ihn die Firma filtern kann – bei sensiblen Daten sinnvoll.
**Authentifizierung:** Pre-Shared Key, Benutzer/Passwort + MFA, **Zertifikate** (sicher, braucht aber eine CA) oder Schlüsselpaare ohne CA (z. B. WireGuard – weniger Aufwand, aber mehr Disziplin bei der Schlüsselverwaltung).

**Typische Probleme:**
| Symptom | Ursache | Lösung |
|---|---|---|
| Tunnel baut sich im Hotel-/Hotspot-Netz nicht auf | **NAT/PAT** verändert IP und Ports, IPsec-ESP erkennt das als Manipulation | **NAT-Traversal** (ESP in UDP 4500) |
| Verbindung steht, aber große Pakete gehen verloren | **MTU zu groß** – VPN-Header passt nicht mehr, Fragmentierung | MTU/MSS im VPN-Client verringern |
| Datenverkehr läuft am Tunnel vorbei | **IPv6-Breakout**: Tunnel nur für IPv4 | IPv6 mit tunneln oder auf dem Client deaktivieren |
| Tunnel kommt gar nicht zustande | falsche Zugangsdaten, Client falsch konfiguriert, ISP/Hotspot blockiert VPN-Ports, Benutzer am Gateway nicht freigeschaltet, lokale Firewall | Internetverbindung, Konfiguration, Firewall, Protokoll, Rechte prüfen |
| Standort mit **CGN** nicht erreichbar | keine öffentliche IPv4 | VPN von diesem Standort aus aufbauen, öffentliche IP buchen oder IPv6 nutzen |

**Kriterien für ein VPN-Gateway:** **Hardwarebeschleunigung** der Kryptoalgorithmen (sonst starker Leistungsverlust), VPN-Durchsatz, Anzahl Tunnel, **Anzahl Netzwerkports** (ggf. Link Aggregation), **garantierte Firmware-Updates** über die Nutzungsdauer. Die Leistungsaufnahme beeinflusst nur die Betriebskosten, nicht die VPN-Leistung.

---

## 5. Zwei-Faktor-Authentifizierung

| Verfahren | Faktoren | Bewertung |
|---|---|---|
| Benutzername + Passwort | Wissen | einfach, von überall – aber **kein** 2FA |
| Passwort + **Zertifikatsdatei** auf dem Gerät | Wissen + Besitz | Anmeldung nur von Geräten mit Zertifikat |
| Passwort + **Hardware-Token/Smartcard** (FIDO2, YubiKey) | Wissen + Besitz | sehr sicher, phishingresistent, kostet Hardware |
| Passwort + **Authenticator-App** (TOTP) | Wissen + Besitz | keine Anschaffungskosten, jeder installiert selbst |
| Passwort + SMS-Code | Wissen + Besitz | besser als nichts, aber SIM-Swapping möglich |

**Kerberos** (Active Directory): Anmeldung über ein **Key Distribution Center**, das zeitlich begrenzte **Tickets** ausstellt – Single Sign-on ohne erneute Passwortübertragung; Voraussetzung ist eine synchrone Uhrzeit (NTP, Abweichung standardmäßig höchstens 5 Minuten).

**Hardware-Token/Zertifikat vs. Passwort:** kann nicht ausgespäht oder erraten werden, Social Engineering greift nicht, an Gerät oder Person gebunden, deutlich längere Schlüssel.

---

> [!warning] Typische Fehler in Prüfungen
> - SHA-256 als „Verschlüsselung“ bezeichnen – es ist ein **Hash**.
> - Bei der Signatur öffentlichen und privaten Schlüssel vertauschen: **signieren mit privat, prüfen mit öffentlich**.
> - Bei kompromittierter CA nur die CA neu aufsetzen – **alle** Zertifikate müssen ersetzt werden.
> - TLS als „asymmetrisch verschlüsselt“ beschreiben – die Nutzdaten sind **symmetrisch** verschlüsselt.
> - Site-to-Site und End-to-Site vertauschen.

## Verwandte Themen
- [[FISI-12 NAT, Firewall, DMZ und Proxy]] – NAT und VPN, TLS-Inspection
- [[FISI-14 WLAN und Netzzugangskontrolle]] – Zertifikate für 802.1X
- [[FISI-5 Systemhärtung, Malware und Angriffe]] – Passwortrichtlinien, MFA
- [[I4 Kryptografie]] – Grundlagen aus AP1

## Zusammenfassung
- Symmetrisch (AES) schnell, ein Schlüssel · asymmetrisch (RSA/ECC) Schlüsselpaar, langsam · hybrid (TLS) = beides.
- DES und MD5 unsicher; AES-256 und SHA-256 gut; Hash ≠ Verschlüsselung.
- Zertifikat: Inhaber, öffentlicher Schlüssel, Aussteller, Gültigkeit, Seriennummer, Signatur der CA. Kette Root → Intermediate → Server.
- TLS-Handshake: Hello, Zertifikat, Prüfung, (EC)DHE, symmetrische Sitzung. TLS 1.3: nur PFS, schneller, sicherer.
- VPN: Site-to-Site vs. Remote Access; Probleme NAT (→ NAT-T), MTU, IPv6-Breakout, CGN.
- 2FA = zwei **verschiedene** Faktorkategorien.

## Direkt üben
```dataviewjs
await dv.view("AP2/99 System/views/trainer", { typen: ["schluessel"] })
```

## Selbstcheck
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { modul: "FISI-15" })
```

**Weitere Aufgaben:** [[Aufgaben Netzwerke#FISI-15 VPN, TLS und PKI]] · **Karteikarten:** [[Karten Netzwerke]]

## Einschätzung
```dataviewjs
await dv.view("AP2/99 System/views/selbstcheck")
```

---
← [[FISI-14 WLAN und Netzzugangskontrolle]] · Weiter: [[FISI-16 Netzwerkanalyse, Fehlersuche und WAN]] →
