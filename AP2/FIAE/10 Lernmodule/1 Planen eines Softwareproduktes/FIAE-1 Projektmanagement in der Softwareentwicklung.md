---
modul: FIAE-1
titel: Projektmanagement in der Softwareentwicklung
bereich: Planen eines Softwareproduktes
pruefungsteil: "AP2 Teil 2 – Planen eines Softwareproduktes"
reihenfolge: 1
dauer: 150
status: neu
sicherheit: 0
zuletzt:
tags: [ap2/modul, ap2/fiae]
---
# FIAE-1 · Projektmanagement in der Softwareentwicklung

> [!abstract] Überblick
> **Bereich:** [[Übersicht FIAE Planen eines Softwareproduktes]]
> **Prüfung:** „Planen eines Softwareproduktes“ (90 min, 4 Aufgaben) – Aufgabe 1 ist fast immer Projektmanagement
> **Dauer:** ca. 150 min · **Prüfungsrelevanz:** ★★★ – Stakeholder und ihre Interessen, klassische und agile Vorgehensmodelle, Risiken, Machbarkeit, Abschlussprotokolle und Netzpläne.
> **Grundlagen aus AP1:** [[P1 Projektmanagement und Vorgehensmodelle]] · [[P2 Netzplan und Zeitplanung]] · [[P6 Teamarbeit, Verhandlung und Veränderung]]

## Lernziele
- [ ] Ich kann klassisches und agiles Projektmanagement vergleichen und ein Vorgehensmodell begründet wählen.
- [ ] Ich kann Stakeholder mit Erwartungen, Befürchtungen und Maßnahmen analysieren.
- [ ] Ich kann eine Umfeldanalyse und eine Machbarkeitsprüfung (Markt, Technik, Organisation, Recht, Wirtschaft) durchführen.
- [ ] Ich kann Risiken mit Gegenmaßnahmen beschreiben und Change Requests, Meilensteine und Lessons Learned erklären.
- [ ] Ich kann einen Netzplan berechnen und den Projekterfolg und den Projektabschluss planen.

## So wird das geprüft
> [!info] Typische AP2-Aufgabentypen
> - **Stakeholder** nennen mit **Erwartung/Befürchtung und Maßnahme**.
> - **Klassisch vs. agil** beschreiben, Modelle nennen (Wasserfall, Scrum), Vergleich nach Planung und Flexibilität.
> - **Begriffe erläutern:** Change Request Management, Meilenstein, Stakeholder, Lessons Learned.
> - **Umfeldanalyse** (technisch, rechtlich), **Machbarkeitskriterien**, **Risiken mit Gegenmaßnahme**.
> - **Abschlussprotokoll vorbereiten** (Soll-Ist-Vergleich, Folgeaktivitäten), **Projekterfolg nach Projektende messen**.
> - **Netzplan zeichnen, kritischer Pfad, freier vs. Gesamtpuffer**.
> - **Qualitätsmaßnahmen** in der Entwicklung (Vorgehensmodell, Werkzeuge, Testumgebungen, Code-Reviews), **Outsourcing** Vor-/Nachteile.

---

## 1. Vorgehensmodelle

| | **klassisch** (plangetrieben) | **agil** |
|---|---|---|
| Anforderungen | zu Beginn **vollständig festgelegt** (Lasten-/Pflichtenheft) | entwickeln sich, werden **iterativ** angepasst |
| Planung | komplett im Voraus, lineare Phasen | schrittweise in kurzen Zyklen |
| Änderungen | aufwendig, Change-Request-Verfahren, Mehrkosten | **erwünscht**, Teil des Prozesses |
| Kunde | vor allem am Anfang und bei der Abnahme beteiligt | **laufend eingebunden** (Reviews) |
| Ergebnis | am Ende | nach jedem Sprint ein nutzbares Inkrement |
| passt bei | klaren, stabilen Anforderungen, Festpreis, Regulierung | unklaren oder sich ändernden Anforderungen, Innovation |

**Klassische Modelle:** **Wasserfall** (Phasen nacheinander, Ergebnis jeder Phase ist Eingang der nächsten), **V-Modell** (jeder Entwicklungsphase steht eine Testphase gegenüber), **Spiralmodell** (iterativ mit Risikoanalyse).
**Agile Modelle:** **Scrum**, **Kanban** (Board, WIP-Limits, kontinuierlicher Fluss), Extreme Programming (Pair Programming, TDD). **Hybride** Ansätze kombinieren beides.

### Scrum
| Rollen | Events | Artefakte |
|---|---|---|
| **Product Owner** – verantwortet den Produktwert, pflegt und priorisiert das Product Backlog | **Sprint** (1–4 Wochen) | **Product Backlog** (priorisierte Anforderungen, z. B. User Stories) |
| **Scrum Master** – sorgt für die Einhaltung von Scrum, beseitigt Hindernisse | **Sprint Planning** | **Sprint Backlog** (was im Sprint umgesetzt wird) |
| **Developers** – setzen um, organisieren sich selbst | **Daily Scrum** (15 min) | **Inkrement** (fertiges, nutzbares Ergebnis; Definition of Done) |
| | **Sprint Review** (Ergebnis mit Stakeholdern) · **Retrospektive** (Prozess verbessern) | |

---

## 2. Projektstart

### Stakeholderanalyse
Stakeholder sind alle, die ein **Interesse am Projekt** haben oder von ihm **betroffen** sind. Für jeden: Erwartungen, Befürchtungen, Einfluss, **Maßnahmen**.

> [!example] Muster: Einführung einer digitalen Arbeitszeiterfassung in Kliniken
>
> | Stakeholder | Erwartung | Befürchtung | Maßnahme |
> |---|---|---|---|
> | Vorstand des Auftraggebers | Lieferung in Zeit, Budget und Qualität | Verzug, Mehrkosten, Unruhe im Personal | Kostencontrolling, Meilensteinberichte |
> | Geschäftsführung des Softwarehauses | Gewinn, Referenzprojekt | zu hohe Komplexität, Abhängigkeit von Zulieferern | Risikomanagement, Puffer |
> | IT der Kliniken | Standardisierung, einfachere Abläufe | Jobverlust durch Zentralisierung | frühe Einbindung, Schulung |
> | Pflegepersonal/Ärzte | Entlastung durch ergonomische Software | Zeitverlust, Überwachung | Usability-Tests, Datenschutzkonzept, Betriebsrat einbeziehen |
> | Projektteam | spannendes Projekt | fachliche Überforderung | Qualifizierung, realistische Planung |

### Umfeld- und Machbarkeitsanalyse
- **Umfeldanalyse:** **technisches Umfeld** (vorhandene Hardware, Netz, Softwarelandschaft, Datenstrukturen), **rechtliches Umfeld** (Datenschutz, IT-Sicherheitsgesetz, branchenspezifische Vorgaben), organisatorisches und soziales Umfeld.
- **Machbarkeit:** **Markt** (Volumen, Bedarf), **Konkurrenz**, **Preis** (Zahlungsbereitschaft), **technische** Machbarkeit (Infrastruktur, Hosting), **organisatorische** (Auftragslage, Ressourcen), **rechtliche**, **wirtschaftliche** (Investitionsrechnung).

### Entscheidungen im Projekt
Make or Buy, Standard- vs. Individualsoftware, Outsourcing (+ Festpreis, Wettbewerb, weniger eigene Ressourcen · − Know-how-Verlust, Abhängigkeit, Sicherheit), Technologieauswahl – begründet per **Nutzwertanalyse** (→ [[W2 Nutzwertanalyse und Entscheidungen]]).

---

## 3. Planung und Steuerung

**Projektstrukturplan** (Arbeitspakete) → **Aufwandsschätzung** (Expertenschätzung, Analogie, Function Points, Planning Poker) → **Zeitplan** (Gantt, Netzplan) → **Ressourcen- und Kostenplan** → **Risikoplan** → **Kommunikationsplan**.

| Begriff | Bedeutung |
|---|---|
| **Meilenstein** | Ereignis **ohne Dauer**, markiert einen wichtigen Zwischenstand (z. B. Pflichtenheft abgenommen) – zur Fortschrittskontrolle |
| **Change Request Management** | geregelter Umgang mit Änderungswünschen: erfassen, Auswirkung auf Zeit/Kosten/Qualität bewerten, entscheiden, dokumentieren, umsetzen |
| **Lessons Learned** | am Projektende gesammelte positive und negative Erfahrungen für künftige Projekte (Wissensmanagement) |
| **Magisches Dreieck** | Leistung/Qualität – Zeit – Kosten beeinflussen sich gegenseitig |

### Risiken
Risiko = **Eintrittswahrscheinlichkeit × Schadensausmaß**. Für jedes Risiko: Problem → Auswirkung → **Gegenmaßnahme** (vermeiden, vermindern, übertragen, akzeptieren).

| Problem | Risiko | Gegenmaßnahme |
|---|---|---|
| Anforderungen ändern sich (Markt, Gesetz) | Nacharbeit, Zeit- und Budgetüberschreitung | agiles Vorgehen, regelmäßige Reviews mit Stakeholdern |
| schlechte Kommunikation | Missverständnisse, falsche Richtung | regelmäßige Meetings, transparente Tools, Protokolle |
| Schlüsselperson fällt aus | Stillstand | Wissensverteilung, Pair Programming, Dokumentation |
| neue Technik | Verzögerung | Prototyp, Schulung, Puffer |
| Datenschutzverstoß | Bußgeld, Imageschaden | Datenschutzkonzept, DSB früh einbinden |

### Netzplan
**Vorwärtsrechnung:** FAZ = größter FEZ der Vorgänger, FEZ = FAZ + Dauer. **Rückwärtsrechnung:** SEZ = kleinster SAZ der Nachfolger, SAZ = SEZ − Dauer.
- **Gesamtpuffer** GP = SAZ − FAZ: so weit kann ein Vorgang verschoben werden, **ohne das Projektende** zu gefährden.
- **Freier Puffer** FP = kleinster FAZ der Nachfolger − eigener FEZ: Verschiebung **ohne Auswirkung auf die Nachfolger**.
- **Kritischer Pfad:** alle Vorgänge mit GP = 0 – jede Verzögerung verschiebt das Projektende.
→ ausführlich in [[P2 Netzplan und Zeitplanung]]

---

## 4. Qualität und Abschluss

**Maßnahmen zur Qualitätssicherung in der Entwicklung:** standardisiertes Vorgehensmodell, übliche Werkzeuge (IDE, Versionsverwaltung, **CI/CD**), definierte Testumgebungen, -verfahren und -daten, **Code-Reviews**, Coding-Guidelines, Dokumentationsvorgaben, geschulte Mitarbeitende.

**Projektabschluss:** Abnahme durch den Auftraggeber (**Abnahmeprotokoll**), **Soll-Ist-Vergleich** gegenüber Pflichtenheft (Funktionen, Zeit, Kosten), offene Punkte und **Folgeaktivitäten** festhalten, Übergabe an Betrieb/Support, Dokumentation, Lessons Learned, Team auflösen.
**Projekterfolg nach dem Ende prüfen:** Zielerreichung anhand vorher definierter **Kennzahlen** (z. B. Bearbeitungszeit, Fehlerquote, Nutzungszahlen), **Umfragen** zur Nutzerzufriedenheit, Wirtschaftlichkeit (Amortisation erreicht?), Anzahl Supportanfragen.

---

> [!warning] Typische Fehler in Prüfungen
> - Stakeholder nennen, aber Erwartung/Befürchtung/Maßnahme nicht **auf den Fall** beziehen.
> - „Agil = ohne Planung“ – agil plant in kurzen Zyklen.
> - Meilenstein mit Dauer angeben.
> - Freien und Gesamtpuffer vertauschen.
> - Risiken ohne konkrete Gegenmaßnahme.

## Verwandte Themen
- [[FIAE-2 Anforderungen und Use Cases]] – Lasten- und Pflichtenheft
- [[PA-1 Projektantrag, Durchführung und Dokumentation]] – eigenes Abschlussprojekt
- [[P1 Projektmanagement und Vorgehensmodelle]] · [[P2 Netzplan und Zeitplanung]] – Grundlagen aus AP1

## Zusammenfassung
- Klassisch (Wasserfall, V-Modell): Anforderungen fest, Änderungen teuer · agil (Scrum, Kanban): iterativ, Änderungen willkommen.
- Scrum: PO, SM, Developers · Sprint, Planning, Daily, Review, Retro · Product/Sprint Backlog, Inkrement.
- Stakeholder: Erwartung – Befürchtung – Maßnahme. Umfeld technisch/rechtlich, Machbarkeit Markt/Technik/Organisation/Recht/Wirtschaft.
- Meilenstein ohne Dauer, Change Request geregelt, Lessons Learned am Ende. Risiko = Wahrscheinlichkeit × Schaden + Gegenmaßnahme.
- Netzplan: GP = SAZ − FAZ, FP = min FAZ Nachfolger − FEZ, kritischer Pfad GP = 0.

## Direkt üben
```dataviewjs
await dv.view("AP2/99 System/views/trainer", { typen: ["netzplan", "nutzwert"] })
```

## Selbstcheck
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { modul: "FIAE-1" })
```

**Weitere Aufgaben:** [[Aufgaben Planen eines Softwareproduktes#FIAE-1 Projektmanagement in der Softwareentwicklung]] · **Karteikarten:** [[Karten Planen eines Softwareproduktes]]

## Einschätzung
```dataviewjs
await dv.view("AP2/99 System/views/selbstcheck")
```

---
← [[Übersicht FIAE Planen eines Softwareproduktes]] · Weiter: [[FIAE-2 Anforderungen und Use Cases]] →
