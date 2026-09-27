---
modul: FIAE-6
titel: Benutzeroberflächen, Barrierefreiheit und Usability
bereich: Planen eines Softwareproduktes
pruefungsteil: "AP2 Teil 2 – Planen eines Softwareproduktes"
reihenfolge: 6
dauer: 90
status: neu
sicherheit: 0
zuletzt:
tags: [ap2/modul, ap2/fiae]
---
# FIAE-6 · Benutzeroberflächen, Barrierefreiheit und Usability

> [!abstract] Überblick
> **Bereich:** [[Übersicht FIAE Planen eines Softwareproduktes]]
> **Prüfung:** „Planen eines Softwareproduktes“
> **Dauer:** ca. 90 min · **Prüfungsrelevanz:** ★★★ – Mockup-Mängel finden und verbessern, Eingabemaske entwerfen, App-Seite ergänzen, Vorteile von Mockups und barrierefreie Software, Usability-Kriterien und -Tests
> **Grundlagen aus AP1:** [[P5 Arbeitsplatz, Ergonomie und Umwelt]] · [[N7 Internet und Webanwendungen]]

## Lernziele
- [ ] Ich kann Wireframe, Mockup und Prototyp unterscheiden und Vorteile von Mockups nennen.
- [ ] Ich kann eine Eingabemaske oder App-Seite mit passenden Steuerelementen entwerfen.
- [ ] Ich kann Mängel eines Oberflächenentwurfs nach Usability-Kriterien benennen und beheben.
- [ ] Ich kann Anforderungen an barrierefreie Software (WCAG, BITV, BFSG) mit Maßnahmen beschreiben.
- [ ] Ich kenne Verfahren für Usability-Tests.

## So wird das geprüft
> [!info] Typische AP2-Aufgabentypen
> - **Mängel im Mockup beschreiben und verbessertes Layout skizzieren**.
> - **Eingabemaske entwerfen:** Punkte für Überschrift, Beschriftungen, Eingabefelder, **Auswahlliste** (Krankenkasse), **Speichern** und **Abbrechen**.
> - **Vorteile von Mockups**, App-Seite für Tankfüllstand ergänzen, **Barrierefreiheit** mit Maßnahmen.
> - **Usability-Anforderungen an eine Website**, **Barrierefreiheit definieren**, **Usability testen**.

---

## 1. Vom Skizzieren zum Prototyp

| Stufe | Inhalt | Zweck |
|---|---|---|
| **Wireframe** | grobe Struktur (Kästen, Platzhalter), keine Farben | Anordnung und Navigation klären |
| **Mockup** | realistisches, **statisches** Design mit Farben, Schrift, echten Beschriftungen | Aussehen abstimmen |
| **Klickbarer Prototyp** | verlinkte Mockups, simulierte Interaktion | Abläufe testen |

**Vorteile von Mockups:** frühes **Feedback** der Kunden und Nutzer, Missverständnisse und Anforderungslücken werden **früh und billig** erkannt, gemeinsame Diskussionsgrundlage, Grundlage für Entwicklung und Tests, Aufwand besser schätzbar. Werkzeuge: Figma, Balsamiq, Pen & Paper.

### Steuerelemente passend wählen
| Eingabe | Element |
|---|---|
| freier Text (Name) | Textfeld mit Beschriftung |
| eine Auswahl aus vielen festen Werten (Krankenkasse, Land) | **Dropdown/Auswahlliste** |
| eine aus wenigen Optionen | Optionsfelder (Radio Buttons) |
| ja/nein, mehrere unabhängige Optionen | Kontrollkästchen (Checkbox) |
| Datum | Datumsauswahl (Kalender) |
| Zahl in einem Bereich | Zahlenfeld, Schieberegler |
| Aktionen | Schaltflächen **Speichern**, **Abbrechen/Zurück** |
| Füllstand, Fortschritt | Balken/Anzeige mit Wert und Einheit, Warnfarbe |

**Eine gute Eingabemaske:** klare Überschrift, Beschriftung **links oder über** jedem Feld, logische Reihenfolge (Tab-Reihenfolge), Pflichtfelder markieren, **Validierung** mit verständlichen Fehlermeldungen direkt am Feld, Standardwerte, Speichern und Abbrechen, Bestätigung nach dem Speichern.

---

## 2. Usability

**Grundsätze der Dialoggestaltung (DIN EN ISO 9241-110):** **aufgabenangemessen** · **selbstbeschreibend** · **erwartungskonform** · **erlernbar** · **steuerbar** · **robust gegen Benutzungsfehler** (fehlertolerant) · **benutzerbindend**.

**Usability einer Website/App:**
- effiziente, übersichtliche **Navigation**, Logo oben links führt zur Startseite, klickbare Elemente als solche erkennbar
- Funktionsweise schnell verständlich, Gesuchtes schnell auffindbar (Suche mit **Autovervollständigung**)
- **Responsive Design** – nutzbar auf allen Endgeräten
- kurze Ladezeiten, konsistentes Erscheinungsbild (Corporate Design)
- Rückmeldung des Systems (Ladeanzeige, Erfolgsmeldung)

**Typische Mängel in Entwürfen:** uneinheitliche Ausrichtung (nicht bündig), platzraubende oder doppelte Elemente, unklare Beschriftungen, Links öffnen ungefragt neue Fenster, zu kleine Schrift/Schaltflächen, fehlende Rückmeldung, schlechter Kontrast.

### Usability testen
- **Nutzerbefragung** (Fragebogen, Interview, Benutzertagebuch)
- **Beobachtung** von Testpersonen, **lautes Denken**, Aufzeichnung von Klickpfaden, **Eye-Tracking**
- **A/B-Tests**, Auswertung von **Logdaten** (Web-Analytics)
- Expertenmethoden: heuristische Evaluation, Cognitive Walkthrough; Personas, Card Sorting für die Struktur

---

## 3. Barrierefreiheit

**Barrierefreie Software** kann von **allen Menschen** – auch mit Seh-, Hör-, motorischen oder kognitiven Einschränkungen – ohne fremde Hilfe genutzt werden.
- **WCAG** (Web Content Accessibility Guidelines) mit den Prinzipien **wahrnehmbar, bedienbar, verständlich, robust**
- **BITV 2.0** für öffentliche Stellen, **Barrierefreiheitsstärkungsgesetz (BFSG)** seit **28.06.2025** für viele Produkte und Dienstleistungen privater Unternehmen (z. B. Onlineshops, Banking-Apps, E-Books)

| Anforderung | Maßnahme |
|---|---|
| Inhalte wahrnehmbar für Blinde/Sehbehinderte | **Alternativtexte** für Bilder, Bildschirmleser-taugliche Struktur (Überschriften, Labels), **Zoom bis 200 %** ohne Verlust |
| ausreichender Kontrast, Farbe nicht einziges Merkmal | Kontrast mindestens 4,5 : 1, Fehler zusätzlich mit Symbol/Text |
| bedienbar ohne Maus | vollständige **Tastaturbedienung**, sichtbarer Fokus, ausreichend große Klickflächen |
| Videos und Audio | **Untertitel**, Transkripte |
| verständlich | **einfache Sprache**, klare Fehlermeldungen, genug Zeit für Eingaben |
| robust | standardkonformer Code (semantisches HTML, ARIA), funktioniert mit Hilfstechnologien |

Barrierefreiheit nützt allen (Sonne auf dem Display, einhändige Bedienung, ältere Menschen) und ist zugleich **Qualitätsmerkmal** (Benutzbarkeit nach ISO 25010).

---

> [!warning] Typische Fehler in Prüfungen
> - Beim Maskenentwurf **Speichern/Abbrechen** oder die Feldbeschriftungen vergessen – das sind leicht verdiente Punkte.
> - Freitext statt Auswahlliste für feste Werte (Krankenkasse).
> - Barrierefreiheit auf „große Schrift“ reduzieren – nenne **Anforderung und Maßnahme** konkret.
> - Mängel nur aufzählen, ohne sie im verbesserten Entwurf zu beheben.

## Verwandte Themen
- [[FIAE-2 Anforderungen und Use Cases]] – Benutzbarkeit als nichtfunktionale Anforderung
- [[FIAE-7 Schnittstellen, Web und Architektur]] – Web-Anwendungen, HTTP-Fehler
- [[N7 Internet und Webanwendungen]] – Barrierefreiheit im Web (AP1)
- [[P5 Arbeitsplatz, Ergonomie und Umwelt]] – Software-Ergonomie (AP1)

## Zusammenfassung
- Wireframe (Struktur) → Mockup (Aussehen) → Prototyp (Interaktion); Mockups bringen frühes Feedback.
- Steuerelemente passend: Dropdown für feste Werte, Checkbox für ja/nein, Speichern/Abbrechen, Validierung.
- ISO 9241-110: aufgabenangemessen, selbstbeschreibend, erwartungskonform, erlernbar, steuerbar, fehlerrobust, benutzerbindend.
- Usability-Tests: Befragung, Beobachtung, lautes Denken, Eye-Tracking, A/B-Test, Logs.
- Barrierefreiheit: WCAG (wahrnehmbar, bedienbar, verständlich, robust), BFSG seit 28.06.2025; Alt-Texte, Kontrast, Tastatur, Untertitel, einfache Sprache.

## Selbstcheck
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { modul: "FIAE-6" })
```

**Weitere Aufgaben:** [[Aufgaben Planen eines Softwareproduktes#FIAE-6 Benutzeroberflächen, Barrierefreiheit und Usability]] · **Karteikarten:** [[Karten Planen eines Softwareproduktes]]

## Einschätzung
```dataviewjs
await dv.view("AP2/99 System/views/selbstcheck")
```

---
← [[FIAE-5 Datenmodellierung und Normalisierung]] · Weiter: [[FIAE-7 Schnittstellen, Web und Architektur]] →
