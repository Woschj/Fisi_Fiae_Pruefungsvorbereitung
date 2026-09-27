---
modul: PA-1
titel: Projektantrag, Durchführung und Dokumentation
bereich: Projektarbeit
pruefungsteil: "AP2 – Planen und Umsetzen eines Projektes (50 % der Gesamtnote)"
reihenfolge: 201
dauer: 120
status: neu
sicherheit: 0
zuletzt:
tags: [ap2/modul, ap2/projekt]
---
# PA-1 · Projektantrag, Durchführung und Dokumentation

> [!abstract] Überblick
> **Bereich:** [[Übersicht WiSo und Projektarbeit]]
> **Prüfung:** betriebliche Projektarbeit mit Dokumentation – zusammen mit Präsentation und Fachgespräch **50 % der Gesamtnote**
> **Dauer:** ca. 120 min · **Quellen:** gemeinsame [[AP2/Gemeinsam/50 Nachschlagen/IHK-Handreichungen|IHK-Handreichungen]] und formale Vorgaben deiner zuständigen IHK
> **Grundlagen aus AP1:** [[P1 Projektmanagement und Vorgehensmodelle]] · [[P2 Netzplan und Zeitplanung]] · [[W2 Nutzwertanalyse und Entscheidungen]] · [[W3 Investition und Finanzierung]]

## Lernziele
- [ ] Ich kenne Umfang, Zeitbudget und Seitenzahl der Projektarbeit für FISI und FIAE.
- [ ] Ich kann einen Projektantrag mit Ausgangssituation, Ziel, Umfeld, Phasen und Stunden formulieren.
- [ ] Ich weiß, wonach der Prüfungsausschuss den Antrag genehmigt und die Dokumentation bewertet.
- [ ] Ich kann Entscheidungen begründen (Nutzwertanalyse) und eine Wirtschaftlichkeitsbetrachtung aufstellen.
- [ ] Ich kann einen prozessorientierten Projektbericht gliedern und die formalen Vorgaben einhalten.

---

## 1. Rahmen

| | **FISI** | **FIAE** |
|---|---|---|
| Prüfungsbereich | Planen und Umsetzen eines Projektes der Systemintegration | Planen und Umsetzen eines Softwareprojektes |
| Zeit für Projekt **inkl. Dokumentation** | **40 Stunden** | **80 Stunden** |
| reiner Projektbericht | max. **15 Seiten** | max. **20 Seiten** |
| gesamte Dokumentation inkl. Deckblatt, Verzeichnisse, Anlagen | max. **50 Seiten** | max. **60 Seiten** |
| Präsentation + Fachgespräch | 15 + 15 Minuten | 15 + 15 Minuten |

**Ablauf:** Antrag im Online-Portal der IHK → Genehmigung (ggf. mit Auflagen oder Rückgabe zur Nachbesserung, meist 1 Woche Frist) → **erst dann** Projekt durchführen → Dokumentation fristgerecht als **eine PDF-Datei** (bei der IHK Köln max. 6 MB) hochladen → Präsentation und Fachgespräch.

> [!danger] Nicht vor der Genehmigung anfangen
> Wer mit der Durchführung vor der Genehmigung beginnt, riskiert eine Wertung als **Täuschungsversuch (0 Punkte)**. Erlaubt ist nur, was für das Stellen des Antrags nötig ist (z. B. Ist-Analyse, Lastenheft) – diese Zeit zählt nicht zum Stundenbudget.

**Was ist ein geeignetes Projekt?** Ein **echter betrieblicher Auftrag** (kein Übungsprojekt, kein Routine-Tagesgeschäft wie Helpdesk), abgegrenzt, mit Projektmerkmalen (einmalig, Ziel, Zeit- und Ressourcenrahmen), passend zum Ausbildungsniveau und zum Zeitbudget, mit **Entscheidungsspielraum** (Alternativen, die du begründet auswählst). Beteiligte – vor allem der Kunde/Auftraggeber – werden namentlich genannt.
Typisch FISI: Einführung eines Backup-Konzepts, Migration eines Servers/Dienstes, Aufbau eines Monitoring-Systems, WLAN mit 802.1X, Virtualisierungscluster, MDM-Einführung. Typisch FIAE: Anwendung oder Modul, die einen Geschäftsprozess automatisiert, Schnittstelle, Datenbankanwendung, Web-App.

---

## 2. Projektantrag

**Inhalte** (IHK Köln – andere IHKs ähnlich):
1. **Projektbezeichnung**
2. **Projektbeschreibung:** 1.1 **Ausgangssituation** (Ist-Zustand, Geschäftsprozess, Beteiligte) · 1.2 **Zielsetzung** (Soll, Nutzen) · 1.3 **Konsequenzen bei Nichtverwirklichung**
3. **Projektumfeld/Rahmenbedingungen:** technische Schnittstellen (Systeme, Betriebssysteme, Programmiersprache, Datenbank, Netz) und organisatorische Schnittstellen (Auftraggeber, Abteilungen, Dienstleister); bei Teilprojekten die Schnittstellen zum Gesamtprojekt
4. **Projektplanung:** Phasen/Arbeitspakete mit **Stunden in ganzen Zahlen**, Summe = Budget
5. **Dokumentation:** geplante Unterlagen – prozessorientierter Projektbericht, Pflichtenheft/Konzept, Testprotokolle, Abnahmeprotokoll, Kunden-/Benutzerdokumentation, ggf. Quellcodeauszüge; nicht selbst erstellte Dokumente kennzeichnen

**Prüfkriterien des Ausschusses:** fachlich zum Beruf passend · betrieblich · verständlich beschrieben (auch für branchenfremde Prüfende), Abkürzungen erklärt · Anspruch passt zum Ende der Ausbildung · Umfang passt zur Zeit (nicht zu wenig verplant) · Schnittstellen beschrieben · Stunden realistisch und im Verhältnis · **Dokumentationszeit eingeplant** · Abnahme durch den Auftraggeber vorgesehen.

### Zeitplanung
> [!example] FISI (40 h) – Beispiel „Einführung eines zentralen Backups“
>
> | Phase | Stunden |
> |---|---|
> | Analyse: Ist-Aufnahme, Anforderungen, Soll-Konzept | 5 |
> | Planung: Alternativen vergleichen (Nutzwertanalyse), Kosten, Zeitplan, Test- und Rollback-Plan | 7 |
> | Durchführung: Installation, Konfiguration, Einbindung der Systeme | 13 |
> | Qualitätssicherung: Tests, Restore-Test, Abnahme | 5 |
> | Abschluss: Übergabe, Einweisung, Soll-Ist-Vergleich | 2 |
> | Projektdokumentation | 8 |
> | **Summe** | **40** |

Bei FIAE (80 h) nennt die IHK Köln als Richtwert ein Verhältnis von Planungs- zu Realisierungsphasen von etwa **50 : 50** und **12–14 Stunden** für den Projektbericht, der **nach** Abschluss der Arbeiten separat entsteht. Unter das Limit fallen nur **deine eigenen** Stunden; Zuarbeit von Kollegen planst du trotzdem und berücksichtigst sie in der Wirtschaftlichkeit.

---

## 3. Durchführung und Qualitätssicherung

Das Projekt wird mit **vollständigem Projektmanagement** durchgeführt – auch wenn es im Betrieb sonst „nebenbei“ laufen würde:
- **Vorgehensmodell** wählen und **begründen** (Wasserfall bei klaren Anforderungen, Scrum/iterativ bei unklaren) → [[FIAE-1 Projektmanagement in der Softwareentwicklung]]
- **Arbeitspakete**, Zeit- und Ressourcenplan, **Meilensteine**, **Risiken** mit Gegenmaßnahmen
- **Qualitätssicherung** planen, durchführen und dokumentieren: Reviews, Testkonzept und Testprotokolle, Zwischenabnahmen, Abnahme durch den Auftraggeber
- **Abweichungen** (Soll-Ist) dokumentieren und begründen – ein nicht vollständig erreichtes Ziel ist kein Todesurteil, wenn es nachvollziehbar erklärt wird

### Entscheidungen begründen
Jede wesentliche Entscheidung (Produkt, Architektur, Verfahren) wird **stichhaltig begründet** – idealerweise mit einer **Nutzwertanalyse**: Kriterien festlegen, gewichten (Summe 100 %), Alternativen bewerten (z. B. 1–10), Teilnutzwerte = Gewicht × Punkte, Summe vergleichen, Muss-Kriterien vorher prüfen (K.-o.). Weitere Werkzeuge: Make-or-Buy, Kostenvergleich, Risikoabwägung. → [[W2 Nutzwertanalyse und Entscheidungen]]

---

## 4. Wirtschaftlichkeit

Die Dokumentation enthält eine **Kosten-Nutzen-Betrachtung** – geplant und am Ende tatsächlich.
- **Kosten:** **Personalkosten** (eigene Stunden × Stundensatz inkl. Nebenkosten und Gemeinkosten, **plus** Stunden von Kollegen, Ausbilder, Auftraggeber für Abnahmen), Sachkosten (Hardware, Lizenzen), **einmalige vs. laufende** Kosten (Wartung, Cloudgebühren, Strom).
- **Nutzen:** monetär (eingesparte Arbeitszeit × Stundensatz, vermiedene Ausfallkosten, geringere Lizenz- oder Energiekosten) und nicht monetär (Sicherheit, Compliance, Zufriedenheit).
- **Amortisationszeit** = Investition ÷ jährliche Einsparung; **Break-even-Point** grafisch.

> [!example] Beispiel
> Projektkosten: 40 h × 25 €/h (Azubi inkl. Nebenkosten) + 6 h × 60 €/h (Kollegen) + 1 800 € Hardware = 3 160 €. Einsparung: 3 h/Woche × 45 €/h × 46 Wochen = 6 210 €/Jahr → **Amortisation nach ca. 0,5 Jahren**.

---

## 5. Dokumentation und Bewertung

**Prozessorientierter Projektbericht** (keine reine Produktbeschreibung!) – chronologisch, mit Begründungen:
1. Einleitung/Projektauftrag: Ausgangssituation, Ziel, Umfeld, Schnittstellen, **Änderungen gegenüber dem Antrag**
2. Projektplanung: Vorgehensmodell, Arbeitspakete, Zeit- und Ressourcenplanung, Kosten/Wirtschaftlichkeit, QS-Planung, Risiken
3. Durchführung: Analyse, Entwurf, Umsetzung, Entscheidungen mit Alternativen, Tests
4. Abschluss: Abnahme, Soll-Ist-Vergleich (Zeit, Kosten, Funktionen), Fazit, **Lessons Learned**, Ausblick
5. Verzeichnisse und **Anlagen** (Pflichtenheft, Pläne, Testprotokolle, Auszüge, **unterschriebenes Abnahmeprotokoll**) – im Text auf die Anlagen mit Seitenzahl verweisen und erklären, welche Rolle sie im Prozess spielen

**Bewertungsschema** (IHK Köln, FIAE – 100 Punkte): Gestaltung des Berichts **17** · Beschreibung des Prozesses **68** (Projektauftrag 10, Planung 20, Durchführung 28, Abschluss 10) · beigefügte Dokumente **15**.

**Formale Vorgaben** (IHK Köln): jede Seite dem Prüfling zuzuordnen, **durchgängig nummeriert**; gut lesbare Schrift, Referenz **Times New Roman 12 pt** (keine Condensed-/Narrow-Schriften); **Zeilenabstand 1,5**; Ränder links und oben 2,5 cm, unten 2 cm, rechts 1,5 cm. Wer die Seitenzahl überschreitet, bekommt nur die erlaubten Seiten bewertet – und nur die Anlagen, auf die dort verwiesen wird.

**Checkliste:** Inhaltsverzeichnis passt · Ist-Zustand klar · Umfeld und Schnittstellen · Änderungen zum Antrag begründet · Vorgehensmodell begründet · Zeitplanung mit Methode · Wirtschaftlichkeit · QS mit Zielen · alle Entscheidungen begründet · Soll-Ist-Vergleich der Zeiten · Abnahmeprotokoll unterschrieben · Anlagen vollständig und verlinkt · Rechtschreibung geprüft · Quellen, Glossar, Abkürzungen.

---

> [!warning] Typische Fehler
> - Nur das Produkt beschreiben statt den **Prozess** und die **Begründungen**.
> - Keine Alternativen betrachtet – dann gibt es nichts zu entscheiden.
> - Zeitplanung ohne Dokumentation oder mit „Doku läuft parallel“.
> - Kosten ohne Personalkosten der Kollegen oder ohne Nebenkosten.
> - Abnahmeprotokoll fehlt oder ist nicht unterschrieben.

## Verwandte Themen
- [[PA-2 Präsentation und Fachgespräch]] – der zweite Teil desselben Prüfungsbereichs
- [[FIAE-1 Projektmanagement in der Softwareentwicklung]] – Vorgehensmodelle, Stakeholder, Risiken
- [[P1 Projektmanagement und Vorgehensmodelle]] · [[P2 Netzplan und Zeitplanung]] – Grundlagen aus AP1

## Zusammenfassung
- FISI 40 h / 15 S. Bericht / 50 S. gesamt · FIAE 80 h / 20 S. / 60 S. · Präsentation und Fachgespräch je 15 min.
- Antrag: Ausgangssituation, Ziel, Konsequenzen, Umfeld, Phasen mit Stunden, Dokumente. Erst nach Genehmigung beginnen.
- Durchführung mit PM-Methoden, begründeten Entscheidungen (Nutzwertanalyse), QS und Abnahme.
- Wirtschaftlichkeit: Personal- und Sachkosten, einmalig/laufend, Nutzen, Amortisation.
- Bericht prozessorientiert; Bewertung 17 / 68 / 15; formale Vorgaben (12 pt, 1,5 Zeilen, Ränder, Seitenlimit).

## Direkt üben
```dataviewjs
await dv.view("AP2/99 System/views/trainer", { typen: ["netzplan", "nutzwert", "afa-amortisation"] })
```

## Selbstcheck
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { modul: "PA-1" })
```

**Weitere Aufgaben:** [[Aufgaben Projektarbeit#PA-1 Projektantrag, Durchführung und Dokumentation]] · **Karteikarten:** [[Karten Projektarbeit]]

## Einschätzung
```dataviewjs
await dv.view("AP2/99 System/views/selbstcheck")
```

---
← [[WISO-6 Markt, Wirtschaft und Nachhaltigkeit]] · Weiter: [[PA-2 Präsentation und Fachgespräch]] →
