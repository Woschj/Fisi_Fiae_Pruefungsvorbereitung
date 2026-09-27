---
tags: [ap2/start, ap2/fisi]
cssclasses: [ap1-start]
---
# AP2 FISI – Fachinformatik Systemintegration

**Abschlussprüfung Teil 2** · [[AP2 Pruefung|Prüfungsaufbau und Bestehen]] · [[AP2 FISI Lernplan|Lernplan]] · [[AP2/FISI/20 Aufgaben/Pruefungen/Uebersicht FISI AP2|Probeprüfungen]]

> [!example] Heute
> **[[AP2 FISI Quiz|Quiz]]** (10 min Wiederholung) · **[[AP2 FISI Trainer|Trainer]]** (Rechnen) · **[[AP2 FISI Karteikarten|Karteikarten]]** · **[[AP2 FISI Fehlerlog|Fehlerlog]]** · **[[WiSo-Quiz]]**

```dataviewjs
await dv.view("AP2/99 System/views/dashboard")
```

**Navigation:** [[AP2 Start|AP2-Übersicht]] · [[AP2/FIAE/00 Start/AP2 FIAE Start|andere Fachrichtung]] · [[AP1/00 Start/Start|AP1]] · [[Ausbildungspruefungen|Startseite]]

## Lernmodule
| [[Übersicht FISI Konzeption und Administration\|Konzeption und Administration]] | [[Übersicht FISI Netzwerke\|Netzwerke]] | [[Übersicht WiSo und Projektarbeit\|WiSo & Projektarbeit]] |
|---|---|---|
| [[FISI-1 Server, Virtualisierung und Container\|FISI-1 Server & Virtualisierung]] | [[FISI-9 IPv4-Subnetting und Routing\|FISI-9 Subnetting & Routing]] | [[WISO-1 Ausbildung und Jugendarbeitsschutz\|WISO-1 Ausbildung & JArbSchG]] |
| [[FISI-2 Cloud und Betriebsmodelle\|FISI-2 Cloud]] | [[FISI-10 IPv6 im Unternehmen\|FISI-10 IPv6]] | [[WISO-2 Arbeitsvertrag, Kündigung und Arbeitsschutz\|WISO-2 Arbeitsvertrag & Arbeitsschutz]] |
| [[FISI-3 Speicher und RAID planen\|FISI-3 Speicher & RAID]] | [[FISI-11 Switching, VLAN und Verkabelung\|FISI-11 VLAN & Switching]] | [[WISO-3 Mitbestimmung und Tarifrecht\|WISO-3 Mitbestimmung & Tarif]] |
| [[FISI-4 Datensicherung, Archivierung und Notfallvorsorge\|FISI-4 Backup & USV]] | [[FISI-12 NAT, Firewall, DMZ und Proxy\|FISI-12 NAT & Firewall]] | [[WISO-4 Sozialversicherung und Entgelt\|WISO-4 Sozialversicherung]] |
| [[FISI-5 Systemhärtung, Malware und Angriffe\|FISI-5 Härtung & Malware]] | [[FISI-13 DNS, DHCP und Netzdienste\|FISI-13 DNS & DHCP]] | [[WISO-5 Unternehmen, Rechtsformen und Organisation\|WISO-5 Rechtsformen & Organisation]] |
| [[FISI-6 Datenschutz, Geräteverwaltung und Lizenzen\|FISI-6 Datenschutz & Lizenzen]] | [[FISI-14 WLAN und Netzzugangskontrolle\|FISI-14 WLAN & 802.1X]] | [[WISO-6 Markt, Wirtschaft und Nachhaltigkeit\|WISO-6 Markt & Nachhaltigkeit]] |
| [[FISI-7 Programmierung und Skripte für Admins\|FISI-7 Code & Befehle]] | [[FISI-15 VPN, TLS und PKI\|FISI-15 VPN & PKI]] | [[PA-1 Projektantrag, Durchführung und Dokumentation\|PA-1 Projektantrag & Doku]] |
| [[FISI-8 Datenbanken und Modellierung\|FISI-8 SQL & UML]] | [[FISI-16 Netzwerkanalyse, Fehlersuche und WAN\|FISI-16 Analyse & WAN]] | [[PA-2 Präsentation und Fachgespräch\|PA-2 Präsentation & Fachgespräch]] |

## Üben
| Aufgaben (IHK-Stil) | Probeprüfungen | Karteikarten | Nachschlagen |
|---|---|---|---|
| [[Aufgaben Konzeption und Administration]] | [[AP2/FISI/20 Aufgaben/Pruefungen/Uebersicht FISI AP2\|Probeprüfungen FISI]] | [[Karten Konzeption und Administration]] | [[AP2 FISI Formelsammlung]] |
| [[Aufgaben Netzwerke]] | [[WiSo-Quiz\|WiSo-Simulation]] | [[Karten Netzwerke]] | [[AP2 FISI Glossar]] |
| [[Aufgaben WiSo]] | | [[Karten WiSo]] | [[AP2 Pruefung]] |
| [[Aufgaben Projektarbeit]] | | [[Karten Projektarbeit]] | |

## Module als Tabelle
```dataview
TABLE WITHOUT ID link(file.link, modul) AS "Nr.", titel AS "Thema", bereich AS "Bereich", status AS "Status", sicherheit AS "Sicherheit", zuletzt AS "Zuletzt"
FROM "AP2/FISI/10 Lernmodule" OR "AP2/Gemeinsam/10 Lernmodule"
WHERE modul
SORT bereich ASC, reihenfolge ASC
```

