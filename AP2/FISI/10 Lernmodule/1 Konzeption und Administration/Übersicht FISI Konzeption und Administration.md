---
bereich: Konzeption und Administration
tags: [ap2/uebersicht, ap2/fisi]
---
# Übersicht FISI Konzeption und Administration

Server und Cloud planen, Speicher berechnen, Daten sichern, Systeme härten, Datenschutz umsetzen sowie Programmlogik lesen, prüfen und korrigieren.

> [!info] Prüfung
> **Konzeption und Administration von IT-Systemen** – schriftlich, 90 Minuten, 4 Aufgaben, 10 % der Gesamtnote. Typische Themen: Cloud/Virtualisierung/Server · Sicherheit/Datenschutz oder Speicher · Programmlogik · Speicher/Backup. [[AP2/FISI/20 Aufgaben/Pruefungen/Uebersicht FISI AP2|Zu den FISI-Probeprüfungen]]

## Lernpfad
```mermaid
flowchart LR
  FISI_1["FISI-1 Server, Virtualisierung und Container"]
  FISI_2["FISI-2 Cloud und Betriebsmodelle"]
  FISI_3["FISI-3 Speicher und RAID planen"]
  FISI_4["FISI-4 Datensicherung, Archivierung und Notfallvorsorge"]
  FISI_5["FISI-5 Systemhärtung, Malware und Angriffe"]
  FISI_6["FISI-6 Datenschutz, Geräteverwaltung und Lizenzen"]
  FISI_7["FISI-7 Programmierung und Skripte für Admins"]
  FISI_8["FISI-8 Datenbanken und Modellierung"]
  FISI_1 --> FISI_2
  FISI_1 --> FISI_3
  FISI_3 --> FISI_4
  FISI_2 --> FISI_6
  FISI_5 --> FISI_6
  FISI_4 --> FISI_5
  FISI_7 --> FISI_8
  class FISI_1,FISI_2,FISI_3,FISI_4,FISI_5,FISI_6,FISI_7,FISI_8 internal-link
```
*Pfeile: empfohlene Reihenfolge – was links steht, hilft beim Verständnis rechts. Die Knoten sind anklickbar.*

## Module
| | Modul | Inhalt |
|---|---|---|
| [[FISI-1 Server, Virtualisierung und Container\|FISI-1]] | Server, Virtualisierung und Container | Serverauswahl, Netzteil, Energiekosten, Hypervisor Typ 1/2, Container, Cluster, Load Balancing |
| [[FISI-2 Cloud und Betriebsmodelle\|FISI-2]] | Cloud und Betriebsmodelle | IaaS/PaaS/SaaS, Public/Private/Hybrid, On-Premises vs. Cloud, Anbieterauswahl, Latenz |
| [[FISI-3 Speicher und RAID planen\|FISI-3]] | Speicher und RAID planen | GiB/TiB, Speicherbedarf, Plattenanzahl RAID 5/6/10, Hot Spare, NAS/SAN, Dedup, MTBF |
| [[FISI-4 Datensicherung, Archivierung und Notfallvorsorge\|FISI-4]] | Datensicherung, Archivierung und Notfallvorsorge | Backuparten mit Archivbit, Rücksicherung, GVS, 3-2-1, Archiv/WORM, RTO/RPO, USV-Typen |
| [[FISI-5 Systemhärtung, Malware und Angriffe\|FISI-5]] | Systemhärtung, Malware und Angriffe | Härtung, BIOS/UEFI, Least Privilege, Zero Trust, Malware, Phishing, Passwörter |
| [[FISI-6 Datenschutz, Geräteverwaltung und Lizenzen\|FISI-6]] | Datenschutz, Geräteverwaltung und Lizenzen | Schutzziele, TOM, Datenpanne, Anonymisierung, Datenträgervernichtung, MDM/BYOD, CAL, Patches |
| [[FISI-7 Programmierung und Skripte für Admins\|FISI-7]] | Programmierung und Skripte für Admins | Schreibtischtest, Fehler finden, Datentypen, Modulo, Testarten, Windows/Linux-Befehle |
| [[FISI-8 Datenbanken und Modellierung\|FISI-8]] | Datenbanken und Modellierung | SQL-Grundlagen, Datentypen, ER-Modell, NoSQL, Index/Locking, UML statisch/dynamisch |

## Üben
- **Aufgaben im IHK-Stil:** [[Aufgaben Konzeption und Administration]]
- **Karteikarten:** [[Karten Konzeption und Administration]]
- **Rechentrainer und Quiz:** [[AP2 FISI Trainer]] · [[AP2 FISI Quiz]]
- **Probeprüfungen mit Timer:** [[AP2/FISI/20 Aufgaben/Pruefungen/Uebersicht FISI AP2|FISI-Probeprüfungen]]

← [[AP2 FISI Start]] · Weiter: [[Übersicht FISI Netzwerke]] →

