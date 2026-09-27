---
bereich: Projekt
tags: [ap1/aufgaben, ap1/projekt]
---
# Aufgaben Projekt & Service

★ Einstieg · ★★ Prüfungsniveau · ★★★ anspruchsvoll. Unbegrenzte Netzplan- und SLA-Aufgaben: [[Trainer#Projekt & Service]].

> [!info] Ausgangssituation
> Das **Stadtarchiv Weißenburg** (fiktiv, Behörde mit 45 Arbeitsplätzen) zieht in ein saniertes Gebäude. Dein Ausbildungsbetrieb übernimmt als IT-Dienstleister Planung, Umzug und anschließenden Support.

---

## P1 Projektmanagement und Vorgehensmodelle

### P1.1 ★ – Projektmerkmale und Ziel (6 Punkte)
📘 **Nachlernen:** [[P1 Projektmanagement und Vorgehensmodelle#1. Was ist ein Projekt|P1 › Was ist ein Projekt]] · [[P1 Projektmanagement und Vorgehensmodelle#SMART-Ziele|P1 › SMART-Ziele]]

a) Begründe mit drei Merkmalen, warum der IT-Umzug ein Projekt ist. b) Formuliere ein SMART-Ziel für den Umzug.

> [!success]- Lösung
> a) **einmalig** (kein Routineumzug), **zeitlich begrenzt** (Start- und Umzugstermin), **klares Ziel** (alle Arbeitsplätze im neuen Gebäude funktionsfähig), **begrenzte Ressourcen** (Budget, Techniker), fachübergreifend (Archiv, Hausverwaltung, IT) – je 1 P, max. 3
> b) z. B. „Bis zum 14.11. sind alle 45 Arbeitsplätze im neuen Gebäude angeschlossen und getestet; die Ausfallzeit je Arbeitsplatz beträgt höchstens einen Arbeitstag.“ (3 P: spezifisch, messbar, terminiert)

### P1.2 ★★ – Lastenheft und Pflichtenheft (6 Punkte)
📘 **Nachlernen:** [[P1 Projektmanagement und Vorgehensmodelle#2. Lastenheft und Pflichtenheft|P1 › Lastenheft und Pflichtenheft]]

Erkläre den Unterschied und nenne je zwei Inhalte für den Umzug.

> [!success]- Lösung
> **Lastenheft** vom **Auftraggeber** (Archiv): *was* gebraucht wird – z. B. „45 Arbeitsplätze mit Netzwerk und Telefonie“, „Digitalisierungsscanner im EG“, „Umzug am Wochenende“. (3 P)
> **Pflichtenheft** vom **Auftragnehmer** (IT-Dienstleister): *wie* es umgesetzt wird – z. B. „Cat-6A-Verkabelung, 2 Etagenswitches mit PoE+“, „VLAN-Konzept“, „Zeitplan mit Meilensteinen“, „Abnahmetests“. (3 P)

### P1.3 ★★ – Risikoanalyse (6 Punkte)
📘 **Nachlernen:** [[P1 Projektmanagement und Vorgehensmodelle#Stakeholder und Risiken|P1 › Stakeholder und Risiken]]

Nenne drei Risiken des Umzugs, bewerte sie grob und nenne je eine Gegenmaßnahme.

> [!success]- Lösung (je 2 P)
> | Risiko | Bewertung | Maßnahme |
> |---|---|---|
> | Verkabelung im neuen Gebäude nicht fertig | W mittel, A hoch | Baufortschritt prüfen, Puffer, Ausweichtermin |
> | Datenverlust/Hardwareschaden beim Transport | W gering, A sehr hoch | Vollsicherung vorher, Transportverpackung, Versicherung |
> | Scanner-Software läuft nicht mit neuem Netzwerk | W mittel, A mittel | vorab im Testaufbau prüfen, Herstellersupport informieren |

### P1.4 ★★ – Vorgehensmodell (6 Punkte)
📘 **Nachlernen:** [[P1 Projektmanagement und Vorgehensmodelle#Agile Vorgehensweisen – Scrum|P1 › Agile Vorgehensweisen – Scrum]]

Parallel soll eine Web-App für Bürgeranfragen entwickelt werden, deren Funktionen noch nicht genau feststehen. Empfiehl ein Vorgehensmodell und begründe; nenne die drei Scrum-Rollen.

> [!success]- Lösung
> **Scrum/agil**: Anforderungen unklar und veränderlich → kurze Sprints, nach jedem Sprint nutzbares Inkrement, frühes Feedback der Archivmitarbeitenden, Nachsteuern möglich. (3 P)
> Rollen: **Product Owner** (priorisiert das Backlog, vertritt die Anwender), **Scrum Master** (Prozess, Hindernisse), **Developers** (Umsetzung, selbstorganisiert). (3 P)

---

## P2 Netzplan und Zeitplanung

### P2.1 ★★ – Netzplan (12 Punkte)
📘 **Nachlernen:** [[P2 Netzplan und Zeitplanung#2. Rechenregeln|P2 › Rechenregeln]] · [[P2 Netzplan und Zeitplanung#3. Beispiel durchgerechnet|P2 › Beispiel durchgerechnet]]

| Vorgang | Beschreibung | Dauer (Tage) | Vorgänger |
|---|---|---|---|
| A | Bestandsaufnahme | 2 | – |
| B | Netzwerkplanung | 3 | A |
| C | Hardware bestellen/Lieferung | 7 | A |
| D | Verkabelung neues Gebäude | 5 | B |
| E | Switches konfigurieren | 2 | B, C |
| F | Umzug und Installation | 3 | D, E |
| G | Test und Abnahme | 1 | F |
a) Berechne FAZ, FEZ, SAZ, SEZ, GP und FP. b) Gib Projektdauer und kritischen Pfad an. c) Die Lieferung (C) verzögert sich um 2 Tage. Auswirkung?

> [!success]- Lösung
> **Vorwärts:** A 0–2 · B 2–5 · C 2–9 · D 5–10 · E: FAZ = max(FEZ B 5, FEZ C 9) = **9**, FEZ 11 · F: FAZ = max(FEZ D 10, FEZ E 11) = **11**, FEZ 14 · G 14–15 → **Projektdauer 15**
> **Rückwärts:** G SEZ 15, SAZ 14 · F SEZ 14, SAZ 11 · D SEZ 11, SAZ 6 · E SEZ 11, SAZ 9 · C SEZ = SAZ E = 9, SAZ 2 · B SEZ = min(SAZ D 6, SAZ E 9) = 6, SAZ 3 · A SEZ = min(SAZ B 3, SAZ C 2) = 2, SAZ 0
>
> | | D | FAZ | FEZ | SAZ | SEZ | GP | FP |
> |---|---|---|---|---|---|---|---|
> | A | 2 | 0 | 2 | 0 | 2 | 0 | 0 |
> | B | 3 | 2 | 5 | 3 | 6 | 1 | 0 |
> | C | 7 | 2 | 9 | 2 | 9 | 0 | 0 |
> | D | 5 | 5 | 10 | 6 | 11 | 1 | 1 |
> | E | 2 | 9 | 11 | 9 | 11 | 0 | 0 |
> | F | 3 | 11 | 14 | 11 | 14 | 0 | 0 |
> | G | 1 | 14 | 15 | 14 | 15 | 0 | 0 |
> a) 7 P · b) **15 Tage**, kritischer Pfad **A → C → E → F → G** (3 P)
> c) C ist kritisch (GP 0) → das Projektende verschiebt sich um **2 Tage auf Tag 17**. Gegenmaßnahme: Expresslieferung, Switches vorab mit Leihgeräten konfigurieren. (2 P)
> *Lerntipp: Immer erst die Vorwärtsrechnung vollständig abschließen, dann rückwärts rechnen – sonst entstehen falsche (sogar negative) Puffer.*

### P2.2 ★ – Puffer erklären (4 Punkte)
📘 **Nachlernen:** [[P2 Netzplan und Zeitplanung#2. Rechenregeln|P2 › Rechenregeln]]

Erkläre am Beispiel von Vorgang D aus P2.1 den Unterschied zwischen Gesamtpuffer und freiem Puffer.

> [!success]- Lösung
> D hat **GP = 1**: Die Verkabelung darf einen Tag später fertig werden, ohne dass sich das **Projektende** verschiebt. **FP = 1**: Auch der früheste Beginn des Nachfolgers F (Tag 11) wird dann nicht verschoben. Bei B dagegen ist GP = 1, aber FP = 0 – eine Verzögerung von B verschiebt D (dessen Puffer dann aufgebraucht ist), aber noch nicht das Projektende. (4 P)

---

## P3 IT-Service, Support und Qualität

### P3.1 ★★ – Tickets priorisieren (8 Punkte)
📘 **Nachlernen:** [[P3 IT-Service, Support und Qualität#1. IT-Service-Management (ITSM)|P3 › IT-Service-Management]] · [[P3 IT-Service, Support und Qualität#3. Priorisierung|P3 › Priorisierung]]

Nach dem Umzug gehen ein: (1) Das Archivsystem ist für alle nicht erreichbar. (2) Ein Scanner im Lesesaal druckt Barcodes unscharf, ein Ersatzscanner ist vorhanden. (3) Die Amtsleiterin kann keine Termine im Kalender anlegen, eine Sitzung steht in 30 Minuten an. (4) Ein Mitarbeiter wünscht einen zweiten Monitor.
a) Ordne jeweils Incident oder Service Request zu. b) Lege eine Bearbeitungsreihenfolge fest und begründe mit Auswirkung und Dringlichkeit.

> [!success]- Lösung
> a) (1) Incident · (2) Incident · (3) Incident · (4) **Service Request** (2 P)
> b) (1) **Prio 1** – alle betroffen, Kernsystem, sofort · (3) **Prio 2** – eine Person, aber hohe Dringlichkeit (Sitzung) · (2) **Prio 3** – Workaround vorhanden · (4) **Prio 4** – planbar. (6 P)

### P3.2 ★★ – SLA und Verfügbarkeit (8 Punkte)
📘 **Nachlernen:** [[P3 IT-Service, Support und Qualität#Verfügbarkeit berechnen|P3 › Verfügbarkeit berechnen]] · [[P3 IT-Service, Support und Qualität#4. Service Level Agreement (SLA)|P3 › Service Level Agreement]]

Das SLA garantiert für das Archivsystem **99,5 % Verfügbarkeit** in der Servicezeit Mo–Fr 7–19 Uhr (Monat mit 21 Arbeitstagen). Im Oktober fiel das System zweimal aus: 2 h und 45 min.
a) Wie viele Stunden Ausfall erlaubt das SLA im Monat? b) Wurde das SLA eingehalten? c) Nenne zwei weitere typische SLA-Inhalte.

> [!success]- Lösung
> a) Servicezeit: 21 × 12 h = 252 h → 252 × 0,005 = **1,26 h** (≈ 76 min) (3 P)
> b) Ausfall 2,75 h → Verfügbarkeit (252 − 2,75) / 252 = **98,91 %** → **nicht eingehalten** (3 P)
> c) Reaktionszeiten je Priorität, Wiederherstellungszeiten, Eskalationswege, Reporting, Gutschriften bei Nichteinhaltung (je 1 P)

### P3.3 ★★ – Incident oder Problem (6 Punkte)
📘 **Nachlernen:** [[P3 IT-Service, Support und Qualität#1. IT-Service-Management (ITSM)|P3 › IT-Service-Management]]

Seit dem Umzug verlieren die PCs im 2. OG mehrmals täglich kurz die Netzwerkverbindung. Der Support startet die Switchports jedes Mal neu.
a) Bewerte dieses Vorgehen mit den Begriffen Incident, Workaround und Problem. b) Wie sollte weiter vorgegangen werden?

> [!success]- Lösung
> a) Jede Unterbrechung ist ein **Incident**; der Port-Neustart ist ein **Workaround**, der den Betrieb schnell wiederherstellt, aber die Ursache nicht beseitigt. Die wiederkehrenden Störungen deuten auf ein **Problem** hin. (3 P)
> b) **Problem-Management**: Tickets verknüpfen, Ursache analysieren (Logs, Kabelmessung, Switch-Firmware, Spanning Tree/Schleifen), dauerhafte Lösung als **Change** planen, testen, umsetzen; Known Error in der Wissensdatenbank dokumentieren. (3 P)

### P3.4 ★ – PDCA (4 Punkte)
📘 **Nachlernen:** [[P3 IT-Service, Support und Qualität#PDCA-Zyklus (Deming-Kreis)|P3 › PDCA-Zyklus]]

Die Nutzer beschweren sich, dass Tickets zu lange unbearbeitet bleiben. Beschreibe eine Verbesserung anhand des PDCA-Zyklus.

> [!success]- Lösung (je 1 P)
> **Plan:** Ticketdaten auswerten (Ursache: viele Passwort-Tickets binden den 1st Level), Ziel „Reaktion < 2 h“, Maßnahme Self-Service-Passwortportal · **Do:** Pilot in einer Abteilung · **Check:** Reaktionszeiten und Ticketanzahl messen und mit Ziel vergleichen · **Act:** bei Erfolg für alle einführen, Anleitung veröffentlichen; sonst anpassen und neu planen.

---

## P4 Kommunikation und Kundenberatung

### P4.1 ★★ – Vier-Seiten-Modell (8 Punkte)
📘 **Nachlernen:** [[P4 Kommunikation und Kundenberatung#Vier-Seiten-Modell (Schulz von Thun)|P4 › Vier-Seiten-Modell]]

Die Archivleiterin sagt beim Umzug zum Techniker: „Wir haben hier seit drei Stunden kein Netzwerk.“
a) Analysiere die Aussage mit dem Vier-Seiten-Modell. b) Formuliere eine professionelle Antwort des Technikers.

> [!success]- Lösung
> a) **Sachinhalt:** Das Netzwerk funktioniert seit drei Stunden nicht. **Selbstoffenbarung:** Ich bin besorgt/verärgert, wir können nicht arbeiten. **Beziehung:** Ihr kümmert euch nicht ausreichend. **Appell:** Löst das Problem jetzt sofort! (je 1,5 P)
> b) z. B. „Das ist ärgerlich, wenn Sie so lange nicht arbeiten können. Ich schaue mir das sofort an – können Sie mir kurz zeigen, welche Arbeitsplätze betroffen sind?“ (Verständnis, Sachebene, Handlung) (2 P)

### P4.2 ★★ – Bedarfsermittlung (6 Punkte)
📘 **Nachlernen:** [[P4 Kommunikation und Kundenberatung#Fragetechniken („Wer fragt, der führt“)|P4 › Fragetechniken]]

Der Lesesaal soll neue Recherche-PCs für Besucher bekommen. Formuliere vier Fragen für das Gespräch mit der Archivleitung nach dem Fragetrichter und benenne die Fragetypen.

> [!success]- Lösung (Beispiel)
> 1. „Wofür sollen die Besucher die PCs nutzen?“ – **offen**
> 2. „Welche Programme oder Datenbanken müssen verfügbar sein?“ – **offen**
> 3. „Sollen Besucher auch drucken oder Dateien auf USB-Sticks speichern können?“ – **geschlossen**
> 4. „Habe ich richtig verstanden, dass vier Plätze mit Barrierefreiheit (Bildschirmlupe) benötigt werden?“ – **Kontrollfrage**
> Reihenfolge offen → geschlossen → Kontrolle (6 P)

### P4.3 ★ – E-Mail (4 Punkte)
📘 **Nachlernen:** [[P4 Kommunikation und Kundenberatung#5. Schriftliche Kommunikation – E-Mail-Etikette|P4 › Schriftliche Kommunikation – E-Mail-Etikette]]

Nenne vier Regeln für eine professionelle Mail an alle 45 Mitarbeitenden, die über die Umzugstermine informiert.

> [!success]- Lösung (je 1 P)
> aussagekräftiger Betreff („IT-Umzug: Ihre Termine und Vorbereitung“) · klare Struktur mit Terminen und Handlungsanweisungen · sachlich-freundlicher Ton, Anrede/Gruß · interner Verteiler bzw. BCC bei externen Empfängern · Ansprechpartner und Signatur · Rechtschreibung prüfen

---

## P5 Arbeitsplatz, Ergonomie und Umwelt

### P5.1 ★★ – Ergonomie (8 Punkte)
📘 **Nachlernen:** [[P5 Arbeitsplatz, Ergonomie und Umwelt#2. Der ergonomische Bildschirmarbeitsplatz|P5 › Der ergonomische Bildschirmarbeitsplatz]]

Im neuen Gebäude stehen die Schreibtische frontal vor großen Fenstern, die Monitore auf Notebookständern ohne externe Tastatur.
a) Nenne zwei Probleme. b) Beschreibe sechs Anforderungen an einen ergonomischen Bildschirmarbeitsplatz.

> [!success]- Lösung
> a) Blendung durch das Fenster/Gegenlicht; Notebook ohne externe Tastatur → ungünstige Haltung von Nacken und Händen (je 1 P)
> b) (je 1 P) Blickrichtung **parallel zum Fenster** · Monitor-Oberkante **auf/leicht unter Augenhöhe** · Sehabstand ca. **50–80 cm** · entspiegelter, verstellbarer Monitor · **separate Tastatur und Maus** (Dockingstation) · höhenverstellbarer Stuhl/Tisch · Beleuchtung **≥ 500 Lux**, Blendschutz · Pausen/Tätigkeitswechsel

### P5.2 ★★ – Barrierefreiheit (6 Punkte)
📘 **Nachlernen:** [[P5 Arbeitsplatz, Ergonomie und Umwelt#4. Barrierefreiheit|P5 › Barrierefreiheit]]

Das neue Bürgerportal des Archivs muss barrierefrei sein. Nenne die gesetzliche Grundlage und drei konkrete Maßnahmen nach den WCAG-Prinzipien.

> [!success]- Lösung
> Grundlage: **BITV 2.0** (öffentliche Stelle) bzw. BFSG für Angebote an Verbraucher; Standard **WCAG** (2 P)
> Maßnahmen (je 1 P, drei davon): **Alternativtexte** für Bilder (wahrnehmbar) · ausreichender **Kontrast** und skalierbare Schrift · vollständige **Tastaturbedienbarkeit** (bedienbar) · **verständliche Sprache** und eindeutige Fehlermeldungen · valides HTML, mit **Screenreadern** kompatibel (robust)

### P5.3 ★ – Entsorgung (4 Punkte)
📘 **Nachlernen:** [[P5 Arbeitsplatz, Ergonomie und Umwelt#6. Umwelt – Green IT und Entsorgung|P5 › Umwelt – Green IT und Entsorgung]] · [[H2 Massenspeicher und Schnittstellen#1. Massenspeicher|H2 › Massenspeicher]]

Beim Umzug werden 30 alte PCs ausgemustert. Beschreibe das Vorgehen unter Umwelt- und Datenschutzaspekten.

> [!success]- Lösung
> Datenträger **sicher löschen** (zertifizierte Löschsoftware, Secure Erase) oder **physisch vernichten** nach **DIN 66399** mit Nachweis (2 P). Geräte nicht in den Hausmüll: Rückgabe über zertifizierten Entsorger/Sammelstelle nach **ElektroG** bzw. Wiederverwendung (Spende, Refurbishing) (2 P).

---

## P6 Teamarbeit, Verhandlung und Veränderung

### P6.1 ★★ – Einführung der digitalen Akte (10 Punkte)
📘 **Nachlernen:** [[P6 Teamarbeit, Verhandlung und Veränderung#2. Kick-off-Meeting|P6 › Kick-off-Meeting]] · [[P6 Teamarbeit, Verhandlung und Veränderung#1. Teamentwicklung nach Tuckman|P6 › Teamentwicklung nach Tuckman]] · [[P6 Teamarbeit, Verhandlung und Veränderung#Widerstände verstehen|P6 › Widerstände verstehen]]

In der Kanzlei soll das Papierarchiv durch ein Dokumentenmanagementsystem ersetzt werden. Das Projektteam besteht aus Mitarbeitenden dreier Abteilungen, die sich kaum kennen.
a) Nenne vier Inhalte des Kick-off-Meetings. b) Nach zwei Wochen gibt es Streit über Zuständigkeiten. Ordne die Situation einer Teamphase nach Tuckman zu und nenne eine Maßnahme. c) Einige langjährige Mitarbeitende lehnen die Umstellung ab. Nenne zwei mögliche Ursachen und je eine passende Maßnahme.

> [!success]- Lösung
> a) je 1 P: Projektziele und Nutzen · Umfang/Abgrenzung · Rollen und Verantwortlichkeiten · Zeitplan und Meilensteine · Kommunikationswege · Risiken · nächste Schritte
> b) **Storming** (1 P) – Konflikt offen ansprechen und moderieren, Rollen und Zuständigkeiten klar festlegen und dokumentieren (1 P)
> c) je 2 P: **Nicht-Wissen** (Nutzen unbekannt) → Gründe und Vorteile erklären, Demonstration · **Nicht-Können** (Angst vor der Software) → Schulung, Key User als Ansprechpartner · **Nicht-Wollen** (Gewohnheit, Statusverlust) → einbinden, Erfahrung nutzen (z. B. Ablagestruktur mitgestalten)

### P6.2 ★ – Verhandlung mit dem Anbieter (6 Punkte)
📘 **Nachlernen:** [[P6 Teamarbeit, Verhandlung und Veränderung#3. Sachbezogen verhandeln – das Harvard-Konzept|P6 › Sachbezogen verhandeln – das Harvard-Konzept]]

Der DMS-Anbieter besteht auf einem Preis von 14 000 €, die Kanzlei hat 11 000 € eingeplant.
a) Erkläre zwei Prinzipien des Harvard-Konzepts an diesem Beispiel. b) Was ist die BATNA der Kanzlei?

> [!success]- Lösung
> a) je 2 P: **Interessen statt Positionen** – z. B. klären, dass die Kanzlei Planungssicherheit braucht und der Anbieter eine Referenz sucht → Ratenzahlung oder Referenzrabatt · **Optionen zum beiderseitigen Vorteil** – kleinerer Startumfang, Erweiterung später · **Objektive Kriterien** – Marktpreise vergleichbarer Systeme, Anzahl Lizenzen
> b) Die beste Alternative ohne Einigung, z. B. das vorliegende Angebot eines **anderen DMS-Anbieters** zu 11 500 € oder die Verschiebung des Projekts. (2 P)


Bereich: [[Übersicht Projekt und Service]]
