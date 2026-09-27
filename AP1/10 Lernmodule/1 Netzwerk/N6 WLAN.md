---
modul: N6
titel: WLAN
bereich: Netzwerk
reihenfolge: 6
dauer: 90
status: neu
sicherheit: 0
zuletzt:
berufsschule: "Evp-CPS · LF3 LS3.1 (WLAN & BYOD, Messung, Nutzerordnung)"
tags: [ap1/modul, ap1/netzwerk]
---
# N6 · WLAN

> [!abstract] Überblick
> **Bereich:** [[Übersicht Netzwerk]]
> **Dauer:** ca. 90 min · **Prüfungsrelevanz:** ★★☆ – Standards, Frequenzbänder, Sicherheit und Fehlersuche
> **Voraussetzungen:** [[N5 Verkabelung und Netzwerkkomponenten]] (dBm, VLAN, PoE)
> **Berufsschule:** Evp-CPS LF3 LS3.1 (WLAN-Steckbrief, Messung, BYOD-Nutzerordnung)

## Lernziele
- [ ] Ich kann WLAN-Standards (Wi-Fi 4 bis 7) mit Frequenzbändern zuordnen.
- [ ] Ich kann 2,4 GHz, 5 GHz und 6 GHz begründet vergleichen und Kanäle planen.
- [ ] Ich kann Sendeleistung in dBm und mW umrechnen und EIRP erklären.
- [ ] Ich kann WLAN-Sicherheit (WPA2/WPA3, Personal/Enterprise, 802.1X/RADIUS) bewerten.
- [ ] Ich kann ein Gäste- bzw. BYOD-Konzept beschreiben und WLAN-Probleme systematisch eingrenzen.

## Worum geht es?
Im Besprechungsraum bricht das WLAN ständig ab, im Lager ist gar kein Empfang, und Gäste sollen ins Internet, aber auf keinen Fall ins Firmennetz. Außerdem wollen Mitarbeitende ihre privaten Handys nutzen (BYOD). Für all das brauchst du Wissen über Funktechnik **und** Sicherheit.

---

## 1. Standards

| IEEE | Wi-Fi | Frequenzbänder | max. brutto (theoretisch) | Besonderheit |
|---|---|---|---|---|
| 802.11b/g | – | 2,4 GHz | 11 / 54 Mbit/s | veraltet |
| 802.11n | **Wi-Fi 4** | 2,4 + 5 GHz | 600 Mbit/s | MIMO |
| 802.11ac | **Wi-Fi 5** | **nur 5 GHz** | ca. 6,9 Gbit/s | breitere Kanäle, MU-MIMO |
| 802.11ax | **Wi-Fi 6** | 2,4 + 5 GHz | ca. 9,6 Gbit/s | **OFDMA** – effizient bei vielen Clients, Target Wake Time |
| 802.11ax | **Wi-Fi 6E** | 2,4 + 5 + **6 GHz** | ca. 9,6 Gbit/s | zusätzliches, freies 6-GHz-Band |
| 802.11be | **Wi-Fi 7** | 2,4 + 5 + 6 GHz | ca. 46 Gbit/s | 320-MHz-Kanäle, Multi-Link Operation |

> [!info] Brutto ≠ netto
> Die Datenrate ist ein theoretischer Maximalwert **für alle Clients zusammen**. WLAN ist ein **geteiltes Medium** (halbduplex: auf einem Kanal sendet immer nur einer). Praktisch erreicht ein Client oft nur 30–60 % davon – in Rechenaufgaben steht dann „effektive Datenrate“.

---

## 2. Frequenzbänder und Kanäle

| | **2,4 GHz** | **5 GHz** | **6 GHz** |
|---|---|---|---|
| Reichweite / Wanddurchdringung | **am besten** | mittel | am geringsten |
| Datenrate | gering | hoch | sehr hoch |
| überlappungsfreie Kanäle | nur **3** (1, 6, 11 bei 20 MHz) | viele (ca. 19) | sehr viele |
| Störungen | hoch (Nachbar-WLANs, Bluetooth, Mikrowelle) | geringer; teils **DFS** (Radar-Rücksicht) nötig | kaum (neu, wenig genutzt) |
| Geräteunterstützung | alle | ab Wi-Fi 4/5 | nur Wi-Fi 6E/7 |

**Kanalplanung:** Benachbarte Access Points auf **überlappungsfreie** Kanäle legen (2,4 GHz: 1 – 6 – 11 im Wechsel). **Kanalbreite:** breitere Kanäle (40/80/160 MHz) bringen mehr Tempo, aber weniger freie Kanäle – in dichten Umgebungen lieber schmal.

---

<!-- abb:wlan-kanaele -->
![[wlan-kanaele.svg]]
*Abb.: Kanäle im 2,4-GHz-Band – nur 1, 6 und 11 überlappen sich nicht*

## 3. Sendeleistung, Empfang und Planung

- **Sendeleistung** in mW oder **dBm**: dBm = 10 · log(P / 1 mW). 100 mW = 20 dBm, 1 W = 30 dBm.
- **Antennengewinn** in **dBi** bündelt die Leistung in eine Richtung.
- **EIRP** (äquivalente isotrope Strahlungsleistung) = Sendeleistung (dBm) + Antennengewinn (dBi) − Kabelverluste. In der EU gilt im 2,4-GHz-Band max. **100 mW = 20 dBm EIRP** (5 GHz je nach Kanal bis 200 mW bzw. 1 W).
- **Empfangspegel (RSSI)** ist negativ: −40 dBm = hervorragend, −67 dBm = gut für Sprache/Video, −80 dBm = kaum nutzbar.
- **Ausleuchtung (Site Survey)** mit Messsoftware und Grundriss: Wo reicht das Signal, wo überlappen Zellen, wo stören andere Netze?

**Mehrere Access Points** mit gleicher SSID bilden ein **Roaming-Netz**; zentrale Verwaltung per **Controller** (hardware- oder cloudbasiert). **Mesh**: APs verbinden sich untereinander per Funk, wenn kein Kabel liegt (kostet Bandbreite). Stromversorgung meist per **PoE**.

> [!example] Beispiel
> Ein AP sendet mit 17 dBm, Antenne 3 dBi, 1 dB Kabelverlust → EIRP = 17 + 3 − 1 = **19 dBm ≈ 79 mW** → im 2,4-GHz-Band zulässig (≤ 20 dBm).

---

## 4. WLAN-Sicherheit

| Verfahren | Bewertung |
|---|---|
| offenes WLAN | keine Verschlüsselung – nur mit Captive Portal und nie für Firmendaten; ggf. **OWE** („Enhanced Open“) |
| **WEP** | **gebrochen**, darf nicht mehr genutzt werden |
| **WPA** (TKIP) | unsicher, veraltet |
| **WPA2** (AES-CCMP) | noch verbreitet, mit langem, zufälligem Passwort akzeptabel; angreifbar per Wörterbuch-Angriff auf mitgeschnittenen Handshake |
| **WPA3** (SAE) | **Stand der Technik**: schützt gegen Offline-Wörterbuchangriffe, Forward Secrecy |

**Personal vs. Enterprise:**

| **Personal (PSK / SAE)** | **Enterprise (802.1X)** |
|---|---|
| ein gemeinsames Passwort für alle | jeder Nutzer/jedes Gerät meldet sich **einzeln** an (Benutzername/Passwort oder Zertifikat) |
| Passwortwechsel betrifft alle Geräte | Konto einzeln sperrbar (z. B. bei Kündigung) |
| für Privat/Kleinstbüro | für Firmen, Schulen, Hochschulen (eduroam) |

**802.1X-Ablauf:** Client (**Supplicant**) → Access Point (**Authenticator**) → **RADIUS-Server** (Authentication Server, oft angebunden an Active Directory). Verfahren z. B. **PEAP** (Passwort im TLS-Tunnel, Serverzertifikat prüfen!) oder **EAP-TLS** (Client-Zertifikat, am sichersten).

### Weitere Maßnahmen
- **Gäste-WLAN**: eigene SSID in einem **eigenen VLAN**, per Firewall nur Internetzugang, **Client-Isolation** (Gäste sehen sich nicht gegenseitig), Bandbreitenbegrenzung, Voucher/Captive Portal mit Nutzungsbedingungen.
- **WPS abschalten** (PIN-Verfahren ist angreifbar), Admin-Oberfläche nur aus dem Verwaltungsnetz, Firmware aktuell halten.
- **SSID verstecken** oder **MAC-Filter** sind *keine* echte Sicherheit (leicht zu umgehen).
- **Rogue Access Points** (unerlaubte, mitgebrachte APs) per Controller erkennen.

### BYOD (Bring Your Own Device)
Private Geräte im Firmen-/Schulnetz sind bequem, aber riskant (unbekannter Patchstand, Schadsoftware, Datenabfluss). Lösung:
- eigenes BYOD-VLAN mit eingeschränktem Zugriff
- **Nutzungsordnung**, die Nutzer unterschreiben (erlaubte Nutzung, Haftung, Kontrollrechte, Datenschutz)
- ggf. MDM/Containerlösung für Firmendaten, Anmeldung per 802.1X mit Zertifikat

---

## 5. Fehlersuche im WLAN

| Symptom | mögliche Ursache | Maßnahme |
|---|---|---|
| schwaches Signal | Entfernung, Wände (Beton, Metall, Glas mit Beschichtung), falsche Antennenausrichtung | AP versetzen/mittiger, zusätzlichen AP, Antennen ausrichten |
| gutes Signal, aber langsam | Kanalüberlappung mit Nachbar-WLANs, zu viele Clients, alte Clients bremsen | Kanal wechseln, 5-/6-GHz-Band, Band Steering, weitere APs |
| Abbrüche | Störquellen (Mikrowelle, Bluetooth, Funkkameras), Roaming-Probleme | Band/Kanal wechseln, Controller-Einstellungen |
| Verbindung, aber keine IP | DHCP-Pool im VLAN leer, falsches VLAN am AP-Trunk | DHCP-Scope, Switch-Konfiguration prüfen |
| Anmeldung schlägt fehl | falsches Passwort, abgelaufenes Zertifikat, RADIUS nicht erreichbar | Logs am RADIUS/Controller |

---

> [!warning] Typische Fehler in Prüfungen
> - Wi-Fi 5 (802.11ac) das 2,4-GHz-Band zuschreiben – es arbeitet nur mit 5 GHz.
> - Mehr Kanalbreite automatisch als „besser“ bewerten.
> - SSID-Verstecken oder MAC-Filter als Sicherheitsmaßnahme nennen.
> - Beim Gäste-WLAN nur „eigenes Passwort“ nennen, aber die **Netztrennung** (VLAN + Firewall) vergessen.

## Verwandte Themen
- [[N5 Verkabelung und Netzwerkkomponenten]] – Access Points hängen am Switch (PoE, VLAN)
- [[I4 Kryptografie]] – Verschlüsselung bei WPA2/WPA3
- [[H6 Drucker, Peripherie und Mobilgeräte]] – MDM und BYOD für Mobilgeräte

## Zusammenfassung
- Wi-Fi 4 (n) 2,4+5 · Wi-Fi 5 (ac) 5 · Wi-Fi 6 (ax) 2,4+5 · 6E zusätzlich 6 GHz · Wi-Fi 7 (be).
- 2,4 GHz: Reichweite, aber nur 3 freie Kanäle (1/6/11); 5/6 GHz: Tempo, weniger Reichweite.
- dBm = 10·log(P/1 mW); EIRP = Sendeleistung + Antennengewinn − Verluste.
- WPA3 bzw. WPA2/3-Enterprise mit 802.1X + RADIUS; WEP/WPA/WPS nicht nutzen.
- Gäste/BYOD: eigenes VLAN, Firewall, Client-Isolation, Nutzungsordnung.

## Direkt üben
Pegelrechnung (dBm ↔ mW) ist Teil des dB-Trainers:
```dataviewjs
await dv.view("AP1/99 System/views/trainer", { typen: ["db"] })
```

## Selbstcheck
```dataviewjs
await dv.view("AP1/99 System/views/quiz", { modul: "N6" })
```

**Weitere Aufgaben:** [[Aufgaben Netzwerk#N6 WLAN]] · **Karteikarten:** [[Karten Netzwerk]]

## Einschätzung
```dataviewjs
await dv.view("AP1/99 System/views/selbstcheck")
```

---
← [[N5 Verkabelung und Netzwerkkomponenten]] · Weiter: [[N7 Internet und Webanwendungen]] →
