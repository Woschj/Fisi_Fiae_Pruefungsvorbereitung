---
modul: FISI-14
titel: WLAN und Netzzugangskontrolle
bereich: Netzwerke
pruefungsteil: "AP2 Teil 2 – Analyse und Entwicklung von Netzwerken"
reihenfolge: 14
dauer: 120
status: neu
sicherheit: 0
zuletzt:
tags: [ap2/modul, ap2/fisi]
---
# FISI-14 · WLAN und Netzzugangskontrolle

> [!abstract] Überblick
> **Bereich:** [[Übersicht FISI Netzwerke]]
> **Prüfung:** „Analyse und Entwicklung von Netzwerken“
> **Dauer:** ca. 120 min · **Prüfungsrelevanz:** ★★★ – WLAN-Verschlüsselung und Authentifizierung, Gästezugänge mit Captive Portal sowie Port Security unterscheiden und bewerten.
> **Grundlagen aus AP1:** [[N6 WLAN]] · [[N5 Verkabelung und Netzwerkkomponenten]]

## Lernziele
- [ ] Ich kann eine WLAN-Planung beschreiben (Ausleuchtung, Anzahl und Standort der Accesspoints, Kanäle, Anbindung).
- [ ] Ich kann Accesspoint und WLAN-Controller abgrenzen und die Werte einer WLAN-Übersicht (SSID, BSSID, Kanal, Kanalbreite, Signal) deuten.
- [ ] Ich kann WPA2/WPA3-Personal und -Enterprise vergleichen und AAA mit RADIUS erklären.
- [ ] Ich kann ein Gäste-WLAN mit eigener SSID, eigenem Netz und Captive Portal planen.
- [ ] Ich kann einen LAN-Port mit 802.1X und Port Security absichern.

## So wird das geprüft
> [!info] Typische AP2-Aufgabentypen
> - **Accesspoint vs. WLAN-Controller**, **Aspekte einer WLAN-Planung**.
> - **WPA2-PSK vs. Enterprise** und Vorteil individueller Zugangsdaten; **Schwächen von PSK**.
> - **AAA erklären** – Authentifizierung, Autorisierung, Accounting.
> - **Gäste-WLAN:** Voucher/Captive Portal und Vorteile, technische Voraussetzungen, Gründe für ein separates Gästenetz.
> - **WLAN-Scan deuten:** SSID, BSSID, Kanal, Bandbreite, Security, Signal; Kanalüberlappung; verstecktes Netz; Kamera verliert Verbindung nach AP-Tausch (5 GHz).
> - **SSID-Broadcast**, Authentifizierung und Vertraulichkeit mit Beispielen.
> - **Port Security** und **802.1X**.

---

## 1. WLAN planen

**Planung:** **Ausleuchtung (Site Survey)** vor Ort – Grundriss, Wände, Störquellen, Frequenzbänder; daraus **Anzahl und Standorte der Accesspoints**; Kanalplan; Anbindung ans LAN (PoE, VLAN-Trunk für mehrere SSIDs); Authentifizierung und Verschlüsselung; Gastzugang; Roaming.

| Komponente | Aufgabe |
|---|---|
| **Accesspoint (AP)** | Übergang zwischen kabelgebundenem Netz und Funk; strahlt das WLAN aus |
| **WLAN-Controller** | **zentrale Konfiguration**, Überwachung und Firmware der APs, Kanal- und Sendeleistungsmanagement, Roaming, Gäste-Portal |

### Frequenzen und Kanäle
| Band | Eigenschaften |
|---|---|
| **2,4 GHz** | hohe Reichweite, gute Wanddurchdringung; nur **3 überlappungsfreie Kanäle (1, 6, 11)** – in Europa mit 13 Kanälen bei 20 MHz Breite auch 1, 5, 9, 13 –, stark belegt (Bluetooth, Mikrowelle) |
| **5 GHz** | viele Kanäle, weniger Störungen, höhere Datenrate; geringere Reichweite |
| **6 GHz** (Wi-Fi 6E/7) | sehr viele breite Kanäle, kaum Störungen; noch geringere Reichweite |

**WLAN-Scan lesen:** **SSID** (Name des Netzes) · **BSSID** (MAC-Adresse des Accesspoints/Funkmoduls – eindeutig) · **Channel** (Kanal) · **Bandbreite** (20/40/80/160 MHz Kanalbreite) · **Security** (WPA2/WPA3, Personal/Enterprise) · **Signal** (Empfangsstärke, z. B. in dBm oder %). Zwei Netze auf **demselben Kanal** stören sich. „**hidden**“ = SSID-Broadcast deaktiviert (kein echter Schutz).
**Neue APs, altes Gerät verbindet sich nicht mehr:** AP sendet nur 5 GHz, das Gerät kann nur 2,4 GHz; falsche Kanalwahl; schwächeres Signal (interne statt externe Antennen).

---

## 2. Absicherung

| Verfahren | Authentifizierung | Bewertung |
|---|---|---|
| WEP | – | gebrochen, nie verwenden |
| **WPA2-Personal (PSK)** | **ein gemeinsamer Schlüssel** für alle | einfach; aber: Schlüssel wird weitergegeben, Brute-Force auf den Handshake, ausgeschiedene Mitarbeitende kennen ihn weiter, bei Änderung alle Geräte neu einrichten |
| **WPA2/WPA3-Enterprise (802.1X)** | **individuelle Zugangsdaten** oder **Zertifikate** je Benutzer/Gerät über **RADIUS** (EAP) | einzelne Konten sperrbar, Zuordnung zu VLANs, personalisierte Logs, unterschiedliche Rechte |
| **WPA3-Personal (SAE)** | gemeinsames Passwort, aber sicherer Handshake | schützt gegen Offline-Wörterbuchangriffe, Forward Secrecy |

Verschlüsselung bei WPA2/3: **AES-CCMP** (bzw. GCMP). TKIP ist veraltet.
**Schutzziele im WLAN:** **Authentifizierung** – nur Berechtigte (PSK, RADIUS-Zugangsdaten, Zertifikat); **Vertraulichkeit** – Funkdaten verschlüsselt (AES).

### AAA mit RADIUS
- **Authentifizierung:** Wer bist du? (Benutzername/Passwort, Zertifikat)
- **Autorisierung:** Was darfst du? (Zugang zum Netz, VLAN-Zuweisung, Rechte)
- **Accounting:** Was hast du genutzt? (Zeit, Datenvolumen, Protokoll)

Ablauf 802.1X: **Supplicant** (Client) → **Authenticator** (AP bzw. Switch) → **Authentication Server** (RADIUS, z. B. mit Anbindung an Active Directory).

### Gäste-WLAN
| Voraussetzung | Begründung |
|---|---|
| eigene **SSID** | Gäste erkennen „ihr“ Netz |
| eigenes **VLAN/IP-Netz** | logische Trennung vom Firmennetz, eigenes Routing, nur Internet erlaubt |
| **Captive Portal mit Voucher** | Zugangsdaten zeitlich/volumenbegrenzt, Zustimmung zu Nutzungsbedingungen, Zuordnung des Verkehrs, Werbe-/Infoseite |
| Client Isolation | Gäste sehen sich untereinander nicht |
| Bandbreitenbegrenzung/QoS | Firmenverkehr bleibt priorisiert |

**Warum überhaupt ein getrenntes Gästenetz?** Nicht verwaltete Geräte können das interne Netz kompromittieren; interne Anwendungen und Daten bleiben unerreichbar; Internetverkehr lässt sich priorisieren und zeitlich begrenzen.

---

## 3. Netzzugangskontrolle am Switch

**Port Security** begrenzt die **MAC-Adressen** pro Switchport:
- **Configured/Static MAC:** zulässige MAC-Adresse fest eingetragen
- **Sticky MAC:** der Switch **lernt** die erste(n) MAC-Adresse(n) automatisch und speichert sie in der Konfiguration
- **Maximum:** Anzahl erlaubter MACs pro Port
- **Violation Mode:** Reaktion auf eine fremde MAC – **protect** (Pakete verwerfen), **restrict** (verwerfen + melden), **shutdown** (Port wird **err-disabled** und bleibt aus, bis ein Admin ihn wieder aktiviert oder ein Timer ihn zurücksetzt)

Port Security verhindert fremde Geräte, aber **nicht** ARP-Spoofing eines **zugelassenen** Geräts (dafür: Dynamic ARP Inspection, DHCP-Snooping). MAC-Adressen lassen sich fälschen, daher ist **802.1X** (Anmeldung mit Benutzer/Zertifikat über RADIUS, auch MAC-Authentication-Bypass für Drucker) die stärkere Lösung.

---

> [!warning] Typische Fehler in Prüfungen
> - PSK als „unsicher, weil unverschlüsselt“ bezeichnen – PSK verschlüsselt, das Problem ist der **gemeinsame** Schlüssel.
> - AAA-Begriffe vertauschen (Autorisierung ≠ Authentifizierung).
> - SSID verstecken als Sicherheitsmaßnahme verkaufen.
> - Beim Gäste-WLAN nur die SSID nennen und die Netztrennung (VLAN/eigenes Subnetz) vergessen.

## Verwandte Themen
- [[FISI-11 Switching, VLAN und Verkabelung]] – VLANs, PoE für Accesspoints
- [[FISI-15 VPN, TLS und PKI]] – Zertifikate für 802.1X
- [[FISI-16 Netzwerkanalyse, Fehlersuche und WAN]] – MitM, ARP-Spoofing
- [[N6 WLAN]] – Grundlagen aus AP1

## Zusammenfassung
- Planung: Site Survey → Anzahl/Standort APs, Kanalplan (2,4 GHz: 1/6/11), PoE, VLANs.
- AP strahlt aus, Controller verwaltet zentral. BSSID = MAC des APs.
- PSK = ein Schlüssel für alle · Enterprise = individuell über RADIUS/802.1X (sperrbar, VLAN, Logs). WPA3-SAE besser als WPA2-PSK.
- AAA = Authentifizierung, Autorisierung, Accounting.
- Gäste: eigene SSID + eigenes Netz + Captive Portal/Voucher + Isolation.
- Port Security: static/sticky MAC, Maximum, Violation protect/restrict/shutdown; stärker: 802.1X.

## Selbstcheck
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { modul: "FISI-14" })
```

**Weitere Aufgaben:** [[Aufgaben Netzwerke#FISI-14 WLAN und Netzzugangskontrolle]] · **Karteikarten:** [[Karten Netzwerke]]

## Einschätzung
```dataviewjs
await dv.view("AP2/99 System/views/selbstcheck")
```

---
← [[FISI-13 DNS, DHCP und Netzdienste]] · Weiter: [[FISI-15 VPN, TLS und PKI]] →
