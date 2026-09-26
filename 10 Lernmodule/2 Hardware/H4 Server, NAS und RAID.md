---
modul: H4
titel: Server, NAS und RAID
bereich: Hardware
reihenfolge: 11
dauer: 90
status: neu
sicherheit: 0
zuletzt:
berufsschule: "Evp-CPS · LF3 LS3.5 (Server, NAS, RAID)"
tags: [ap1/modul, ap1/hardware]
---
# H4 · Server, NAS und RAID

> [!abstract] Überblick
> **Bereich:** [[Übersicht Hardware]]
> **Dauer:** ca. 90 min · **Prüfungsrelevanz:** ★★★ – RAID-Kapazitäten und „RAID ist kein Backup“ sind Klassiker
> **Voraussetzungen:** [[H2 Massenspeicher und Schnittstellen]], [[H3 Datenmengen und Übertragung]]
> **Berufsschule:** Evp-CPS LF3 LS3.5 (Server vs. Client, NAS/RAID-Übungen)

## Lernziele
- [ ] Ich kann Server und Client-PCs unterscheiden und typische Serverdienste nennen.
- [ ] Ich kann Anforderungen an Server (Verfügbarkeit, Redundanz, Fernwartung) begründen.
- [ ] Ich kann DAS, NAS und SAN abgrenzen.
- [ ] Ich kann RAID 0, 1, 5, 6 und 10 erklären, Nutzkapazität und Ausfallsicherheit berechnen und begründet auswählen.
- [ ] Ich kann erklären, warum RAID kein Backup ersetzt.

## Worum geht es?
Der Fileserver eines Architekturbüros fällt aus – eine Festplatte ist defekt. Mit RAID läuft er weiter, ohne RAID steht das Büro still. Aber als ein Mitarbeiter versehentlich einen Projektordner löscht, hilft das RAID überhaupt nicht. Du musst beides erklären können.

---

## 1. Server vs. Client
Ein **Server** stellt Dienste für viele Clients bereit, ein **Client** nutzt sie. Der Begriff meint sowohl die **Software** (Serverdienst) als auch die **Hardware**.

| Serverdienste (Beispiele) | |
|---|---|
| Datei- und Druckserver | Freigaben, zentrale Drucker |
| Verzeichnisdienst | Active Directory/LDAP: Benutzer, Gruppen, Rechte |
| Mail, Web, Datenbank | Exchange, Webserver, SQL |
| Infrastruktur | DHCP, DNS, NTP, RADIUS |
| Anwendungen | ERP, Terminalserver, Virtualisierungshost |

### Besondere Anforderungen an Serverhardware
| Anforderung | Umsetzung |
|---|---|
| **hohe Verfügbarkeit** (24/7) | redundante **Netzteile** (Hot-Plug), **RAID**, **ECC-RAM**, redundante Lüfter, zwei Netzwerkkarten (Teaming) |
| **Wartbarkeit** | **Hot-Swap**-Laufwerke, Fernwartung per **iDRAC/iLO/IPMI** (auch bei ausgeschaltetem System), Diagnose-LEDs |
| **Leistung** | mehrere CPUs/viele Kerne, viel RAM, schnelle SSDs |
| **Bauform** | **19"-Rack** (Höheneinheiten U), Tower, Blade |
| **Umgebung** | klimatisierter Serverraum, **USV**, Zutrittsschutz, Brandschutz |
| **Service** | Garantie mit **Vor-Ort-Service** und Reaktionszeit (z. B. Next Business Day) |

## 2. DAS, NAS, SAN
| | **DAS** (Direct Attached Storage) | **NAS** (Network Attached Storage) | **SAN** (Storage Area Network) |
|---|---|---|---|
| Anbindung | direkt am Server (SATA, SAS, USB) | per **LAN**, eigenständiges Gerät | eigenes Speichernetz (**Fibre Channel**, iSCSI) |
| Zugriff | nur der eine Server | **dateibasiert** (SMB, NFS) für viele Clients | **blockbasiert** – Server sehen „eigene Festplatten“ |
| Einsatz | Einzelserver | Dateiablage, Backup-Ziel, kleine Firmen | Rechenzentrum, Virtualisierungscluster |
| Kosten | gering | gering bis mittel | hoch |

Ein **NAS** ist ein kleiner Server mit eigenem Betriebssystem, meist mehreren Laufwerken im RAID, Benutzerverwaltung und Zusatzdiensten (Backup, Snapshots, Medienserver).

---

<!-- erg:Katalog RAID -->
> [!note] Prüfungskatalog ab 2025
> **RAID und SAN** wurden aus dem AP1-Katalog (ZPA Nord-West, ab Frühjahr 2025) gestrichen. Das Wissen bleibt wichtig für die Praxis und die AP2 (FISI) – für die AP1 hat dieser Abschnitt niedrigere Priorität.

## 3. RAID

**RAID** = Redundant Array of Independent Disks: mehrere Laufwerke bilden ein logisches Laufwerk. Ziele: **Ausfallsicherheit** (Redundanz) und/oder **Geschwindigkeit**.

### Grundprinzipien
- **Striping:** Daten werden blockweise auf mehrere Platten verteilt → parallel lesen/schreiben = schneller
- **Mirroring:** identische Kopie auf einer zweiten Platte
- **Parität:** aus den Datenblöcken berechnete Prüfinformation (XOR). Fällt eine Platte aus, lassen sich ihre Daten aus den übrigen Blöcken + Parität **rekonstruieren**

> [!example] Parität mit XOR – so funktioniert die Rekonstruktion
> Platte 1: `1011` · Platte 2: `0110` → Parität = 1011 XOR 0110 = `1101`
> Platte 2 fällt aus: 1011 XOR 1101 = **`0110`** ✓ – die Daten sind wiederhergestellt.

### Die RAID-Level

| Level | Prinzip | min. Platten | Nutzkapazität (n Platten à C) | verkraftet | Stärken / Schwächen |
|---|---|---|---|---|---|
| **RAID 0** | Striping | 2 | **n × C** | **0** | sehr schnell, volle Kapazität – **keine Redundanz**: eine Platte weg = alles weg |
| **RAID 1** | Mirroring | 2 | **C** (bei 2 Platten 50 %) | 1 (bei n Platten n − 1) | einfach, schnelles Lesen, teuer pro TB |
| **RAID 5** | Striping + **verteilte Parität** | 3 | **(n − 1) × C** | **1** | guter Kompromiss; langsameres Schreiben, riskanter **Rebuild** bei großen Platten |
| **RAID 6** | Striping + **doppelte Parität** | 4 | **(n − 2) × C** | **2** | sicher auch während eines Rebuilds; langsamer beim Schreiben |
| **RAID 10** (1+0) | Spiegelpaare, die gestriped werden | 4 | **n/2 × C** | 1 garantiert (1 je Spiegelpaar) | schnell **und** sicher, 50 % Kapazität |

- Bei unterschiedlich großen Platten zählt die **kleinste**.
- **Hot Spare:** Reserveplatte im System, springt bei Ausfall automatisch ein → Rebuild startet sofort.
- **Hot Swap:** defekte Platte im laufenden Betrieb tauschen.
- **Rebuild:** Wiederaufbau nach Tausch – dauert bei großen Platten viele Stunden, belastet alle Platten; bei RAID 5 ist das Array in dieser Zeit **ungeschützt**.
- **Hardware-RAID** (Controller mit Cache und Akku/Flash-Schutz) vs. **Software-RAID** (Betriebssystem, NAS) – beide sind heute verbreitet.

> [!example] Beispiel durchgerechnet: 6 Platten à 4 TB
> | Level | Kapazität | Effizienz | Ausfall |
> |---|---|---|---|
> | RAID 0 | 24 TB | 100 % | 0 |
> | RAID 5 | 5 × 4 = **20 TB** | 83 % | 1 |
> | RAID 6 | 4 × 4 = **16 TB** | 67 % | 2 |
> | RAID 10 | 3 × 4 = **12 TB** | 50 % | 1 (bis 3, wenn aus verschiedenen Paaren) |
> In Windows-Anzeige (TiB): 20 TB → 20 · 10¹² / 2⁴⁰ = **18,19 TiB**

<!-- abb:raid-level -->
![[raid-level.svg]]
*Abb.: Blockverteilung bei RAID 0, 1, 5, 6 und 10*

### Welches RAID wofür
| Situation | Empfehlung |
|---|---|
| Systemlaufwerk eines Servers (2 SSDs) | **RAID 1** |
| Fileserver/NAS, viel Kapazität, moderates Budget | **RAID 5** (kleinere Platten) bzw. **RAID 6** (große Platten ≥ 8 TB, viele Platten) |
| Datenbank/Virtualisierung mit hoher Schreiblast | **RAID 10** |
| temporäre Daten, Videoschnitt-Scratch ohne Sicherheitsbedarf | RAID 0 (mit Backup!) |

> [!danger] RAID ist KEIN Backup
> RAID schützt nur vor dem **Ausfall einer Festplatte** (Verfügbarkeit). Es schützt **nicht** vor:
> - versehentlichem Löschen oder Überschreiben (wird sofort auf alle Platten übernommen)
> - **Ransomware** und Viren
> - Controller- oder Netzteildefekt, der alle Platten beschädigt
> - Brand, Wasser, Diebstahl
> - Softwarefehlern, die Daten zerstören
> → Zusätzlich **Datensicherung** nach der 3-2-1-Regel: [[I3 Datensicherung]].

---

> [!warning] Typische Fehler in Prüfungen
> - RAID 5 mit nur 2 Platten planen (min. **3**).
> - RAID 10 mit „verkraftet 2 Ausfälle“ beantworten – **garantiert** ist nur 1.
> - Kapazität in TB angeben, obwohl nach der Anzeige im Betriebssystem (TiB) gefragt ist.
> - RAID als Backup-Lösung bezeichnen.
> - NAS (dateibasiert) und SAN (blockbasiert) verwechseln.

## Verwandte Themen
- [[I3 Datensicherung]] – RAID ersetzt kein Backup
- [[H5 Elektrotechnik, USV und Energie]] – USV für den Serverraum
- [[S5 Virtualisierung und Cloud]] – Virtualisierungshosts

## Zusammenfassung
- Server: redundante Netzteile, ECC, RAID, Hot-Swap, Fernwartung (iDRAC/iLO), Rack, USV.
- DAS direkt · NAS per LAN dateibasiert (SMB/NFS) · SAN eigenes Netz blockbasiert.
- RAID 0 n·C/0 · RAID 1 C/1 · RAID 5 (n−1)·C/1 (min. 3) · RAID 6 (n−2)·C/2 (min. 4) · RAID 10 n/2·C/1 (min. 4).
- Parität per XOR ermöglicht Rekonstruktion; Hot Spare verkürzt die ungeschützte Zeit.
- RAID erhöht die Verfügbarkeit, ersetzt aber kein Backup.

## Direkt üben
```dataviewjs
await dv.view("99 System/views/trainer", { typen: ["raid"] })
```

## Selbstcheck
```dataviewjs
await dv.view("99 System/views/quiz", { modul: "H4" })
```

**Weitere Aufgaben:** [[Aufgaben Hardware#H4 Server, NAS und RAID]] · **Karteikarten:** [[Karten Hardware]]

## Einschätzung
```dataviewjs
await dv.view("99 System/views/selbstcheck")
```

---
← [[H3 Datenmengen und Übertragung]] · Weiter: [[H5 Elektrotechnik, USV und Energie]] →
