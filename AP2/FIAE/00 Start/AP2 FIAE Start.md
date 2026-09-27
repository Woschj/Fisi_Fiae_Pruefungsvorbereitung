---
tags: [ap2/start, ap2/fiae]
cssclasses: [ap1-start]
---
# AP2 FIAE – Fachinformatik Anwendungsentwicklung

**Abschlussprüfung Teil 2** · [[AP2 Pruefung|Prüfungsaufbau und Bestehen]] · [[AP2 FIAE Lernplan|Lernplan]] · [[AP2/FIAE/20 Aufgaben/Pruefungen/Uebersicht FIAE AP2|Probeprüfungen]]

> [!example] Heute
> **[[AP2 FIAE Quiz|Quiz]]** (10 min Wiederholung) · **[[AP2 FIAE Trainer|Trainer]]** (Rechnen) · **[[AP2 FIAE Karteikarten|Karteikarten]]** · **[[AP2 FIAE Fehlerlog|Fehlerlog]]** · **[[WiSo-Quiz]]**

```dataviewjs
await dv.view("AP2/99 System/views/dashboard")
```

**Navigation:** [[AP2 Start|AP2-Übersicht]] · [[AP2/FISI/00 Start/AP2 FISI Start|andere Fachrichtung]] · [[AP1/00 Start/Start|AP1]] · [[Ausbildungspruefungen|Startseite]]

## Lernmodule
| [[Übersicht FIAE Planen eines Softwareproduktes\|Planen eines Softwareproduktes]] | [[Übersicht FIAE Algorithmen\|Algorithmen]] | [[Übersicht WiSo und Projektarbeit\|WiSo & Projektarbeit]] |
|---|---|---|
| [[FIAE-1 Projektmanagement in der Softwareentwicklung\|FIAE-1 Projektmanagement]] | [[FIAE-9 Algorithmen in Pseudocode\|FIAE-9 Pseudocode]] | [[WISO-1 Ausbildung und Jugendarbeitsschutz\|WISO-1 Ausbildung & JArbSchG]] |
| [[FIAE-2 Anforderungen und Use Cases\|FIAE-2 Anforderungen & Use Cases]] | [[FIAE-10 Objektorientierte Programmierung umsetzen\|FIAE-10 OOP im Code]] | [[WISO-2 Arbeitsvertrag, Kündigung und Arbeitsschutz\|WISO-2 Arbeitsvertrag & Arbeitsschutz]] |
| [[FIAE-3 UML Aktivität, Sequenz und Zustand\|FIAE-3 UML-Verhalten]] | [[FIAE-11 Testen und Qualitätssicherung\|FIAE-11 Testen]] | [[WISO-3 Mitbestimmung und Tarifrecht\|WISO-3 Mitbestimmung & Tarif]] |
| [[FIAE-4 Objektorientierter Entwurf und Entwurfsmuster\|FIAE-4 Klassen & Muster]] | [[FIAE-12 SQL für Entwickler\|FIAE-12 SQL]] | [[WISO-4 Sozialversicherung und Entgelt\|WISO-4 Sozialversicherung]] |
| [[FIAE-5 Datenmodellierung und Normalisierung\|FIAE-5 ER-Modell & Normalformen]] |  | [[WISO-5 Unternehmen, Rechtsformen und Organisation\|WISO-5 Rechtsformen & Organisation]] |
| [[FIAE-6 Benutzeroberflächen, Barrierefreiheit und Usability\|FIAE-6 UI & Barrierefreiheit]] |  | [[WISO-6 Markt, Wirtschaft und Nachhaltigkeit\|WISO-6 Markt & Nachhaltigkeit]] |
| [[FIAE-7 Schnittstellen, Web und Architektur\|FIAE-7 REST & Architektur]] |  | [[PA-1 Projektantrag, Durchführung und Dokumentation\|PA-1 Projektantrag & Doku]] |
| [[FIAE-8 Sicherheit in der Softwareentwicklung\|FIAE-8 Sicherheit]] |  | [[PA-2 Präsentation und Fachgespräch\|PA-2 Präsentation & Fachgespräch]] |

## Üben
| Aufgaben (IHK-Stil) | Probeprüfungen | Karteikarten | Nachschlagen |
|---|---|---|---|
| [[Aufgaben Planen eines Softwareproduktes]] | [[AP2/FIAE/20 Aufgaben/Pruefungen/Uebersicht FIAE AP2\|Probeprüfungen FIAE]] | [[Karten Planen eines Softwareproduktes]] | [[AP2 FIAE Formelsammlung]] |
| [[Aufgaben Algorithmen]] | [[WiSo-Quiz\|WiSo-Simulation]] | [[Karten Algorithmen]] | [[AP2 FIAE Glossar]] |
| [[Aufgaben WiSo]] | | [[Karten WiSo]] | [[AP2 Pruefung]] |
| [[Aufgaben Projektarbeit]] | | [[Karten Projektarbeit]] | |

## Module als Tabelle
```dataview
TABLE WITHOUT ID link(file.link, modul) AS "Nr.", titel AS "Thema", bereich AS "Bereich", status AS "Status", sicherheit AS "Sicherheit", zuletzt AS "Zuletzt"
FROM "AP2/FIAE/10 Lernmodule" OR "AP2/Gemeinsam/10 Lernmodule"
WHERE modul
SORT bereich ASC, reihenfolge ASC
```

