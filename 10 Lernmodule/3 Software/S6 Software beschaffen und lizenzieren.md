---
modul: S6
titel: Software beschaffen und lizenzieren
bereich: Software
reihenfolge: 19
dauer: 75
status: neu
sicherheit: 0
zuletzt:
berufsschule: "SuD · LF5 LS5.3 (Standard- vs. Individualsoftware) · GiD · LF2 (Beschaffung)"
tags: [ap1/modul, ap1/software]
---
# S6 · Software beschaffen und lizenzieren

> [!abstract] Überblick
> **Bereich:** [[Übersicht Software]]
> **Dauer:** ca. 75 min · **Prüfungsrelevanz:** ★★☆ – Lizenzmodelle auswählen und begründen, Open-Source-Lizenzen einordnen
> **Voraussetzungen:** keine
> **Berufsschule:** SuD LF5 LS5.3 (Standard- vs. Individualsoftware, Werkvertrag)

## Lernziele
- [ ] Ich kann Standard- und Individualsoftware vergleichen und die passende Vertragsart nennen.
- [ ] Ich kann Lizenzmodelle (OEM, Retail, Volumen, Abo, Named/Concurrent User, Device, CAL, Core) unterscheiden und für ein Szenario das günstigste auswählen.
- [ ] Ich kann Freeware, Shareware und Open Source (Copyleft vs. permissiv) abgrenzen.
- [ ] Ich kann Aufgaben und Risiken des Lizenzmanagements erklären.

## Worum geht es?
Eine Firma mit 30 Mitarbeitenden im Schichtbetrieb braucht eine teure Konstruktionssoftware – aber nie arbeiten mehr als 8 Personen gleichzeitig damit. 30 Einzellizenzen wären Geldverschwendung. Und das kostenlose Tool, das ein Kollege aus dem Internet geladen hat? Es ist „nur für private Nutzung“ freigegeben – ein Lizenzverstoß.

---

## 1. Standard- vs. Individualsoftware
| | **Standardsoftware** | **Individualsoftware** |
|---|---|---|
| Beispiele | Office-Paket, Browser, ERP-Standard | eigene Web-App, spezielle Steuerungssoftware |
| Verfügbarkeit | **sofort** | Entwicklung dauert |
| Kosten | geringer (Kosten teilen sich viele Kunden) | hoch (alles zahlt ein Kunde) |
| Anpassung | begrenzt (Customizing, Einstellungen) | **exakt an Prozesse angepasst** |
| Qualität | erprobt, viele Nutzer, Support, Updates | Kinderkrankheiten möglich, Wartung selbst organisieren |
| Abhängigkeit | vom Hersteller (Preise, Produktende) | vom Entwickler (Know-how, Dokumentation) |
| Vertragsart | **Kaufvertrag** bzw. Lizenz-/Mietvertrag (Abo) | **Werkvertrag** (Erfolg geschuldet), Grundlage **Pflichtenheft** |

Zwischenform: **Branchensoftware** (Standard für eine Branche) und **angepasste Standardsoftware** (Customizing, Add-ons).

---

## 2. Was ist eine Lizenz?
Man kauft nicht die Software, sondern ein **Nutzungsrecht**. Die Bedingungen stehen im **Lizenzvertrag / EULA** (End User License Agreement). Software ist urheberrechtlich geschützt – unerlaubte Nutzung ist ein Rechtsverstoß.

### Lizenzarten nach Vertrieb und Laufzeit
| Art | Merkmal |
|---|---|
| **OEM** | zusammen mit Hardware verkauft, **an das Gerät gebunden**, günstig, meist nicht übertragbar |
| **Retail/Box (FPP)** | einzeln gekauft, übertragbar |
| **Volumenlizenz** | Rahmenvertrag für Organisationen, viele Installationen mit einem Schlüssel, zentrale Verwaltung, Mengenrabatt |
| **Kauflizenz (perpetual)** | zeitlich unbegrenzte Nutzung einer Version, Updates ggf. gegen Wartungsgebühr |
| **Abonnement (Subscription)** | laufende Gebühr (monatlich/jährlich), **immer aktuelle Version**, Nutzung endet mit dem Abo; oft als Cloud-Dienst |

### Lizenzarten nach Zählweise
| Modell | gezählt wird | passt für |
|---|---|---|
| **Einzelplatz/Device** | ein Gerät | Arbeitsplatz, an dem wechselnde Personen arbeiten |
| **Named User** | eine benannte Person (auf mehreren Geräten) | Mitarbeitende mit PC, Notebook und Smartphone |
| **Concurrent User (Floating)** | **gleichzeitige** Nutzer, ein Lizenzserver verwaltet den Pool | teure Spezialsoftware, **Schichtbetrieb**, gelegentliche Nutzung |
| **CAL** (Client Access License) | Zugriff eines Users oder Geräts **auf einen Server** | Windows Server, Exchange, SQL Server |
| **Core-basiert** | CPU-Kerne des Servers | Windows Server, Datenbanken |
| **Site/Enterprise** | ganze Organisation/Standort | sehr viele Nutzer |

> [!example] Beispiel
> 30 Mitarbeitende im Schichtbetrieb, maximal 8 arbeiten gleichzeitig mit der CAD-Software (Named User 1 800 €/Jahr, Concurrent 4 200 €/Jahr):
> - Named User: 30 × 1 800 € = **54 000 €**
> - Concurrent: 8 × 4 200 € = **33 600 €** → **Concurrent** ist günstiger (Reserve für Spitzen einplanen!).

---

## 3. Kostenlose und freie Software
| Art | Kosten | Quellcode | Wichtig |
|---|---|---|---|
| **Freeware** | kostenlos | geschlossen | häufig **nur private Nutzung** erlaubt → im Unternehmen Lizenz prüfen! |
| **Shareware** | kostenlose Testphase, dann kostenpflichtig | geschlossen | |
| **Open Source (OSS)** | meist kostenlos | **offen**, darf studiert, verändert, weitergegeben werden | Lizenzbedingungen gelten trotzdem |
| **Public Domain** | kostenlos | – | keine Rechte vorbehalten |

### Open-Source-Lizenzen
| Typ | Beispiele | Bedeutung |
|---|---|---|
| **Copyleft (stark)** | **GPL** | Wer veränderte Software **weitergibt**, muss sie **unter der gleichen Lizenz** samt Quellcode weitergeben |
| schwaches Copyleft | LGPL, MPL | Copyleft nur für die Bibliothek selbst, nicht für Programme, die sie nur nutzen |
| **permissiv** | **MIT**, **Apache 2.0**, BSD | darf auch in proprietäre Software eingebaut werden; nur Lizenz-/Copyright-Hinweis nötig |

**Vorteile Open Source:** keine Lizenzkosten, keine Herstellerabhängigkeit, Quellcode prüfbar (Sicherheit, Transparenz), große Community, offene Standards.
**Nachteile:** Support ggf. kostenpflichtig oder nur Community, Verantwortung für Updates, Know-how nötig, manche Fachsoftware fehlt.

---

## 4. Lizenzmanagement (Software Asset Management, SAM)
- Überblick: welche Software, welche Lizenzen, wie viele Installationen, Laufzeiten, Kündigungsfristen
- **Nachweise** aufbewahren (Rechnungen, Lizenzzertifikate, Verträge)
- **Unterlizenzierung** → Rechtsverstoß, Nachzahlungen, Schadensersatz, Imageschaden; Hersteller dürfen **Audits** durchführen
- **Überlizenzierung** → unnötige Kosten (nicht genutzte Abos kündigen)
- Werkzeuge: Inventarisierungssoftware, Softwareverteilung, CMDB
- **Beim Beschaffen prüfen:** Lizenzmodell passend zur Nutzung? Kompatibilität/Systemvoraussetzungen? Support und Update-Zeitraum? Datenschutz (Cloud)? Gesamtkosten über die Nutzungsdauer (**TCO**)?

---

> [!warning] Typische Fehler in Prüfungen
> - „Freeware darf man überall nutzen“ – im Unternehmen oft nicht.
> - GPL mit „kostenlos, ohne Bedingungen“ gleichsetzen.
> - Named User und Concurrent User verwechseln.
> - Bei Individualsoftware den Kaufvertrag statt Werkvertrag nennen.

## Verwandte Themen
- [[W4 Verträge und Kaufvertragsstörungen]] – Kauf-, Werk- und Dienstvertrag
- [[S5 Virtualisierung und Cloud]] – Software as a Service
- [[W1 Beschaffung und Kalkulation]] – Beschaffungsprozess

## Zusammenfassung
- Standardsoftware: sofort, günstig, erprobt · Individualsoftware: passgenau, teuer, Werkvertrag.
- Lizenz = Nutzungsrecht (EULA); OEM gerätegebunden, Volumenlizenz für Firmen, Abo mit laufender Gebühr.
- Named User (Person), Device (Gerät), Concurrent (gleichzeitig), CAL (Serverzugriff), Core (Serverkerne).
- Freeware oft nur privat; GPL = Copyleft; MIT/Apache = permissiv.
- SAM verhindert Unter- und Überlizenzierung.

## Selbstcheck
```dataviewjs
await dv.view("99 System/views/quiz", { modul: "S6" })
```

**Weitere Aufgaben:** [[Aufgaben Software#S6 Software beschaffen und lizenzieren]] · **Karteikarten:** [[Karten Software]]

## Einschätzung
```dataviewjs
await dv.view("99 System/views/selbstcheck")
```

---
← [[S5 Virtualisierung und Cloud]] · Weiter: [[S7 Datenbanken]] →
