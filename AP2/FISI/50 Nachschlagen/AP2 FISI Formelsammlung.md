---
tags: [ap2/nachschlagen, ap2/fisi]
---
# AP2 FISI – Formelsammlung

Alle Rechenwege, die in den FISI-AP2-Aufgaben vorkamen. In der Prüfung gibt es keine Formelsammlung – nur einen nicht programmierbaren Taschenrechner. Üben: [[AP2 FISI Trainer]].

## Einheiten

| Präfix | dezimal (SI) | binär (IEC) |
|---|---|---|
| Kilo / Kibi | 10³ = 1 000 | 2¹⁰ = 1 024 |
| Mega / Mebi | 10⁶ | 2²⁰ = 1 048 576 |
| Giga / Gibi | 10⁹ | 2³⁰ = 1 073 741 824 |
| Tera / Tebi | 10¹² | 2⁴⁰ = 1 099 511 627 776 |

- Datenraten (Mbit/s, Gbit/s) sind **immer dezimal**. 1 Byte = 8 Bit.
- TB → TiB: · 10¹² ÷ 2⁴⁰ (≈ · 0,9095) · TiB → TB: · 2⁴⁰ ÷ 10¹²

→ [[FISI-3 Speicher und RAID planen#1. Binäre Einheiten|FISI-3 › Binäre Einheiten]]

## Speicher und RAID

| Rechnung | Formel |
|---|---|
| Speicherbedarf mit Wachstum | heute · (1 + p)ⁿ · (1 + Reserve) |
| Bild/Video | Pixel · Farbtiefe (Bit) ÷ 8 · Bilder je Sekunde · Sekunden (bei Bitrate: Bitrate · Zeit ÷ 8) |
| RAID 0 | n · Platte |
| RAID 1 | 1 · Platte (n Spiegel) |
| RAID 5 | (n − 1) · Platte, mindestens 3 |
| RAID 6 | (n − 2) · Platte, mindestens 4 |
| RAID 10 | n ÷ 2 · Platte, mindestens 4, gerade Anzahl |
| Plattenanzahl | Nettobedarf ÷ Plattengröße (aufrunden) + Paritäts-/Spiegelplatten + Hot Spare |

→ [[FISI-3 Speicher und RAID planen#4. Plattenanzahl planen|FISI-3 › Plattenanzahl planen]]

## Energie und Verfügbarkeit

| Rechnung | Formel |
|---|---|
| Netzteil | Summe der Komponenten · (1 + Reserve), nächstgrößeres Modell |
| Energie | Leistung (kW) · Stunden = kWh; 1 Jahr = 8 760 h |
| Kosten | kWh · Preis je kWh |
| USV-Überbrückung | Batteriekapazität (Wh) ÷ Last (W) = Stunden (vereinfacht) |
| Verfügbarkeit | Betriebszeit ÷ Gesamtzeit · 100 % |
| Ausfallzeit pro Jahr | (1 − Verfügbarkeit) · 8 760 h |
| Reihenschaltung (alle müssen laufen) | V = V₁ · V₂ · … |
| Parallelschaltung (eine reicht) | V = 1 − (1 − V₁) · (1 − V₂) · … |
| Umsatzverlust | Ausfallstunden · Umsatz je Stunde |

→ [[FISI-1 Server, Virtualisierung und Container#Netzteil dimensionieren|FISI-1 › Netzteil]] · [[FISI-16 Netzwerkanalyse, Fehlersuche und WAN#Verfügbarkeit von Verbindungen|FISI-16 › Verfügbarkeit]]

## Backup

| Verfahren | Rücksicherung benötigt |
|---|---|
| Voll | letzte Vollsicherung |
| Differenziell | letzte Voll + **letzte** differenzielle |
| Inkrementell | letzte Voll + **alle** inkrementellen danach |

- Archivbit: Voll und inkrementell **löschen** es, differenziell **lässt es stehen**.
- GVS mit 4 Sohn-, 4 Vater-, 12 Großvater-Medien = 20 Medien für ein Jahr Rückgriff (Beispielplan).

→ [[FISI-4 Datensicherung, Archivierung und Notfallvorsorge#1. Sicherungsarten|FISI-4 › Sicherungsarten]]

## IPv4

| Größe | Formel |
|---|---|
| Hosts je Netz | 2^(32 − Präfix) − 2 |
| Anzahl Subnetze | 2^(geliehene Bits) |
| Blockgröße im betroffenen Oktett | 256 − Maskenwert |
| Netzadresse | IP UND Maske |
| Broadcast | nächste Netzadresse − 1 |

| Präfix | Maske | Hosts |
|---|---|---|
| /22 | 255.255.252.0 | 1 022 |
| /23 | 255.255.254.0 | 510 |
| /24 | 255.255.255.0 | 254 |
| /25 | 255.255.255.128 | 126 |
| /26 | 255.255.255.192 | 62 |
| /27 | 255.255.255.224 | 30 |
| /28 | 255.255.255.240 | 14 |
| /29 | 255.255.255.248 | 6 |
| /30 | 255.255.255.252 | 2 |

→ [[FISI-9 IPv4-Subnetting und Routing#2. Subnetze bilden|FISI-9 › Subnetze bilden]]

## IPv6

- Anzahl /64-Netze aus einem /n: 2^(64 − n) → /48: 65 536 · /56: 256 · /60: 16
- Beim /56 zählen die letzten **zwei Hexziffern des 4. Blocks** hoch (…:ab00 bis …:abff).

→ [[FISI-10 IPv6 im Unternehmen#2. /64-Netze bilden|FISI-10 › /64-Netze bilden]]

## Übertragung und Bandbreite

| Rechnung | Formel |
|---|---|
| Übertragungszeit | Datenmenge (Bit) ÷ Datenrate (Bit/s) |
| Datenmenge | Datenrate · Zeit |
| VoIP: Pakete je Sekunde | 1 000 ms ÷ Paketierungszeit (20 ms → 50) |
| VoIP: Nutzdaten je Paket | Codec-Bitrate ÷ Pakete je Sekunde ÷ 8 (G.711: 160 Byte) |
| VoIP: Bandbreite | (Nutzdaten + RTP 12 + UDP 8 + IP 20 + Ethernet 18 Byte) · 8 · Pakete/s |
| Video | Bitrate je Stream · Anzahl Streams |

→ [[FISI-16 Netzwerkanalyse, Fehlersuche und WAN#5. Bandbreite berechnen|FISI-16 › Bandbreite berechnen]]

## Programmlogik

- `a div b` Ganzzahldivision · `a mod b` Rest · letzte Ziffer: `x mod 10` · Ziffer entfernen: `x div 10`
- Wertebereich n Bit mit Vorzeichen: −2^(n−1) bis 2^(n−1) − 1 · ohne Vorzeichen: 0 bis 2ⁿ − 1
- Array der Länge n: Indizes **0 bis n − 1**

→ [[FISI-7 Programmierung und Skripte für Admins#2. Ganzzahldivision und Modulo|FISI-7 › Ganzzahldivision und Modulo]]

## Projekt und Wirtschaft

| Rechnung | Formel |
|---|---|
| Nutzwert | Σ Gewichtung · Punkte |
| Amortisation | Investition ÷ Ersparnis je Periode |
| Personalkosten | Stunden · Stundensatz |

→ [[PA-1 Projektantrag, Durchführung und Dokumentation#4. Wirtschaftlichkeit|PA-1 › Wirtschaftlichkeit]]

← [[AP2 FISI Start]]
