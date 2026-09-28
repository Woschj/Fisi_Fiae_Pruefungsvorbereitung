---
modul: H4
titel: Server und Netzwerkspeicher
bereich: Hardware
reihenfolge: 11
dauer: 45
status: neu
sicherheit: 0
zuletzt:
berufsschule: "Evp-CPS · LF3 LS3.5 (Server, NAS)"
tags: [ap1/modul, ap1/hardware]
---
# H4 · Server und Netzwerkspeicher

> [!abstract] Überblick
> **Bereich:** [[Übersicht Hardware]]
> **Dauer:** ca. 45 min · **AP1-Relevanz:** ★★☆ – Server vom Arbeitsplatz-PC abgrenzen, Anforderungen begründen, NAS einordnen
> **Voraussetzungen:** [[H2 Massenspeicher und Schnittstellen]], [[H3 Datenmengen und Übertragung]]
> **Berufsschule:** Evp-CPS LF3 LS3.5 (Server vs. Client, NAS)

> [!note] Prüfungskatalog ab 2025
> **RAID** (Level, Kapazität, Plattenanzahl) ist seit der zweiten Katalogauflage ausschließlich **AP2-Stoff** und wird deshalb in der AP2 behandelt: [[FISI-3 Speicher und RAID planen]]. Für die AP1 genügt es zu wissen, dass Server ihre Laufwerke meist redundant betreiben – und dass Redundanz **keine Datensicherung** ersetzt ([[I3 Datensicherung]]).

## Lernziele
- [ ] Ich kann Server und Client-PCs unterscheiden und typische Serverdienste nennen.
- [ ] Ich kann Anforderungen an Serverhardware (Verfügbarkeit, Wartbarkeit, Bauform, Umgebung) begründen.
- [ ] Ich kann DAS, NAS und SAN abgrenzen und für einen Einsatzzweck auswählen.

## Worum geht es?
Ein Architekturbüro speichert alle Pläne auf den Arbeitsplatz-PCs – Dateien gehen verloren, Versionen sind durcheinander. Sie sollen erklären, warum ein zentraler Server oder ein NAS sinnvoll ist und welche Eigenschaften die Hardware dafür braucht.

---

## 1. Server vs. Client
Ein **Server** stellt Dienste für viele Clients bereit, ein **Client** nutzt sie. Der Begriff meint sowohl die **Software** (Serverdienst) als auch die **Hardware**.

| Serverdienste (Beispiele) | |
|---|---|
| Datei- und Druckserver | Freigaben, zentrale Drucker |
| Verzeichnisdienst | Active Directory/LDAP: Benutzer, Gruppen, Rechte |
| Mail, Web, Datenbank | Mailserver, Webserver, Datenbankserver |
| Infrastruktur | DHCP, DNS, NTP |
| Anwendungen | ERP, Terminalserver, Virtualisierungshost |

### Besondere Anforderungen an Serverhardware
| Anforderung | Umsetzung |
|---|---|
| **hohe Verfügbarkeit** (24/7) | redundante **Netzteile** (Hot-Plug), redundante Laufwerke, **ECC-RAM**, redundante Lüfter, zwei Netzwerkanschlüsse |
| **Wartbarkeit** | **Hot-Swap**-Laufwerke, Fernwartung per **iDRAC/iLO/IPMI** (auch bei ausgeschaltetem System), Diagnose-LEDs |
| **Leistung** | mehrere CPUs/viele Kerne, viel RAM, schnelle SSDs |
| **Bauform** | **19"-Rack** (Höheneinheiten HE/U), Tower, Blade |
| **Umgebung** | klimatisierter Serverraum, **USV**, Zutrittsschutz, Brandschutz |
| **Service** | Garantie mit **Vor-Ort-Service** und Reaktionszeit (z. B. Next Business Day) |

> [!tip] Server oder leistungsstarker PC
> Ein Büro-PC mit viel Leistung ist **kein** Server: Es fehlen ECC-RAM, redundante Netzteile, Hot-Swap, Fernwartung und ein Servicevertrag mit kurzer Reaktionszeit. In der Prüfung werden solche Merkmale gern als Begründung verlangt.

## 2. DAS, NAS, SAN
| | **DAS** (Direct Attached Storage) | **NAS** (Network Attached Storage) | **SAN** (Storage Area Network) |
|---|---|---|---|
| Anbindung | direkt am Server (SATA, SAS, USB) | per **LAN**, eigenständiges Gerät | eigenes Speichernetz (**Fibre Channel**, iSCSI) |
| Zugriff | nur der eine Server | **dateibasiert** (SMB, NFS) für viele Clients | **blockbasiert** – Server sehen „eigene Festplatten“ |
| Einsatz | Einzelserver | Dateiablage, Backup-Ziel, kleine Firmen | Rechenzentrum, Virtualisierungscluster |
| Kosten | gering | gering bis mittel | hoch |

Ein **NAS** ist ein kleiner Server mit eigenem Betriebssystem, mehreren Laufwerken, Benutzerverwaltung und Zusatzdiensten (Backup, Snapshots, Medienserver). Für ein kleines Büro ist es meist die günstigste Lösung für eine zentrale Dateiablage.

---

> [!warning] Typische Fehler in Prüfungen
> - Einen leistungsstarken Büro-PC als Server empfehlen, ohne Serverausstattung (ECC, Redundanz, Fernwartung) zu begründen.
> - NAS (dateibasiert) und SAN (blockbasiert) verwechseln.
> - Redundante Laufwerke oder ein NAS als Ersatz für die Datensicherung bezeichnen.

## Verwandte Themen
- [[I3 Datensicherung]] – Redundanz ersetzt kein Backup
- [[H5 Elektrotechnik, USV und Energie]] – USV für den Serverraum
- [[S5 Virtualisierung und Cloud]] – Virtualisierungshosts
- AP2: [[FISI-3 Speicher und RAID planen]] – RAID-Level und Kapazitätsplanung

## Zusammenfassung
- Server stellen Dienste bereit; Serverhardware: redundante Netzteile, ECC-RAM, Hot-Swap, Fernwartung (iDRAC/iLO/IPMI), Rack, USV, Servicevertrag.
- DAS direkt am Server · NAS per LAN dateibasiert (SMB/NFS) · SAN eigenes Netz blockbasiert (iSCSI/Fibre Channel).
- Redundanz erhöht die Verfügbarkeit, ersetzt aber keine Datensicherung.

## Selbstcheck
```dataviewjs
await dv.view("AP1/99 System/views/quiz", { modul: "H4" })
```

**Weitere Aufgaben:** [[Aufgaben Hardware#H4 Server und Netzwerkspeicher]] · **Karteikarten:** [[Karten Hardware]]

## Einschätzung
```dataviewjs
await dv.view("AP1/99 System/views/selbstcheck")
```

---
← [[H3 Datenmengen und Übertragung]] · Weiter: [[H5 Elektrotechnik, USV und Energie]] →
