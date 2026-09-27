---
tags: [ap1/start]
cssclasses: [ap1-start]
---
# AP1-Lernbereich

**Abschlussprüfung Teil 1 – Einrichten eines IT-gestützten Arbeitsplatzes** · [[Anleitung]] · [[Prüfung AP1]] · [[Lernplan]]

> [!example] Heute
> **[[Quiz]]** (10 min Wiederholung) · **[[Trainer]]** (Rechnen) · **[[Fehlerlog]]** · **[[Karteikarten]]** (alle Stapel)

```dataviewjs
await dv.view("AP1/99 System/views/dashboard")
```

**AP2:** [[AP2/00 Start/AP2 Start|Lernbereich]] | [[AP2/FISI/00 Start/AP2 FISI Start|FISI]] | [[AP2/FIAE/00 Start/AP2 FIAE Start|FIAE]] | [[Ausbildungspruefungen|Startseite]]

## Lernmodule

| [[Übersicht Netzwerk\|Netzwerk]] | [[Übersicht Hardware\|Hardware]] | [[Übersicht Software\|Software]] |
|---|---|---|
| [[N1 Netzwerkgrundlagen und OSI-Modell\|N1 OSI-Modell]] | [[H1 PC-Komponenten und Arbeitsplatzgeräte\|H1 PC-Komponenten]] | [[S1 Zahlensysteme und Codierung\|S1 Zahlensysteme]] |
| [[N2 IPv4 und Subnetting\|N2 IPv4 & Subnetting]] | [[H2 Massenspeicher und Schnittstellen\|H2 Speicher & Schnittstellen]] | [[S2 Programmierung – Grundlagen\|S2 Programmierung]] |
| [[N3 IPv6\|N3 IPv6]] | [[H3 Datenmengen und Übertragung\|H3 Datenmengen]] | [[S3 Algorithmen, Darstellung und Testen\|S3 Algorithmen & Testen]] |
| [[N4 Netzwerkdienste und Protokolle\|N4 Dienste & Ports]] | [[H4 Server, NAS und RAID\|H4 Server & RAID]] | [[S4 Betriebssysteme, Dateisysteme und Rechte\|S4 Betriebssysteme]] |
| [[N5 Verkabelung und Netzwerkkomponenten\|N5 Verkabelung & Komponenten]] | [[H5 Elektrotechnik, USV und Energie\|H5 Strom & USV]] | [[S5 Virtualisierung und Cloud\|S5 Virtualisierung & Cloud]] |
| [[N6 WLAN\|N6 WLAN]] | [[H6 Drucker, Peripherie und Mobilgeräte\|H6 Drucker & Mobilgeräte]] | [[S6 Software beschaffen und lizenzieren\|S6 Lizenzen]] |
| [[N7 Internet und Webanwendungen\|N7 Internet & Web]] | | [[S7 Datenbanken\|S7 Datenbanken]] |
| | | [[S8 UML und Softwareentwurf\|S8 UML & Softwareentwurf]] |
| | | [[S9 KI und Unternehmenssoftware\|S9 KI & Unternehmenssoftware]] |

| [[Übersicht IT-Sicherheit\|IT-Sicherheit]] | [[Übersicht Wirtschaft\|Wirtschaft & Recht]] | [[Übersicht Projekt und Service\|Projekt & Service]] |
|---|---|---|
| [[I1 Informationssicherheit und IT-Grundschutz\|I1 Schutzziele & Grundschutz]] | [[W1 Beschaffung und Kalkulation\|W1 Beschaffung & Kalkulation]] | [[P1 Projektmanagement und Vorgehensmodelle\|P1 Projektmanagement]] |
| [[I2 Datenschutz\|I2 Datenschutz]] | [[W2 Nutzwertanalyse und Entscheidungen\|W2 Nutzwertanalyse]] | [[P2 Netzplan und Zeitplanung\|P2 Netzplan]] |
| [[I3 Datensicherung\|I3 Backup]] | [[W3 Investition und Finanzierung\|W3 Kauf, Leasing, Darlehen]] | [[P3 IT-Service, Support und Qualität\|P3 Support & Qualität]] |
| [[I4 Kryptografie\|I4 Kryptografie]] | [[W4 Verträge und Kaufvertragsstörungen\|W4 Verträge & Mängel]] | [[P4 Kommunikation und Kundenberatung\|P4 Kommunikation]] |
| [[I5 Bedrohungen und Schutzmaßnahmen\|I5 Angriffe & Schutz]] | [[W5 Unternehmen und Ausbildung\|W5 Unternehmen & Ausbildung]] | [[P5 Arbeitsplatz, Ergonomie und Umwelt\|P5 Ergonomie & Umwelt]] |
| | [[W6 Markt, Marketing und Kostenrechnung\|W6 Markt & Kostenrechnung]] | [[P6 Teamarbeit, Verhandlung und Veränderung\|P6 Team & Veränderung]] |

## Üben
| Aufgaben (IHK-Stil) | Probeprüfungen | Karteikarten | Nachschlagen |
|---|---|---|---|
| [[Aufgaben Netzwerk]] | [[Probeprüfung 1]] | [[Karten Netzwerk]] | [[Formelsammlung]] |
| [[Aufgaben Hardware]] | [[Probeprüfung 2]] | [[Karten Hardware]] | [[Spickzettel]] |
| [[Aufgaben Software]] | [[Probeprüfung 3]] | [[Karten Software]] | [[Glossar]] |
| [[Aufgaben IT-Sicherheit]] | | [[Karten IT-Sicherheit]] | [[Fachenglisch]] |
| [[Aufgaben Wirtschaft]] | | [[Karten Wirtschaft]] | |
| [[Aufgaben Projekt und Service]] | | [[Karten Projekt und Service]] | |

## Module als Tabelle
```dataview
TABLE WITHOUT ID link(file.link, modul) AS "Nr.", titel AS "Thema", bereich AS "Bereich", status AS "Status", sicherheit AS "Sicherheit", zuletzt AS "Zuletzt", berufsschule AS "Berufsschule"
FROM "AP1/10 Lernmodule"
WHERE modul
SORT reihenfolge ASC
```
