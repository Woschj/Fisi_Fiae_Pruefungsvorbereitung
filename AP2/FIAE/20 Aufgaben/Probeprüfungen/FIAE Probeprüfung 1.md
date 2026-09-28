---
tags: [ap2/probepruefung, ap2/fiae]
fachrichtung: FIAE
---
# FIAE · AP2-Probeprüfung 1

> [!info] Durchführung
> Bearbeiten Sie die drei Prüfungsteile jeweils innerhalb der angegebenen Zeit. Öffnen Sie die Lösungshinweise erst nach Abschluss des jeweiligen Prüfungsteils, bewerten Sie sich anhand der **Bewertungshinweise** und tragen Sie Ihre erreichten Punkte anschließend im Dashboard ein. Szenarien und Datensätze sind eigens für diese Probeprüfung erstellt.

## Teil 1 – Planen eines Softwareproduktes

> [!abstract] Ausgangssituation
> Die **Radwerk Service GmbH** möchte eine Webanwendung zur Annahme und Verwaltung von Reparaturaufträgen. Kundinnen und Kunden sollen Reparaturen beauftragen und den Bearbeitungsstatus verfolgen können. Werkstattmitarbeitende erfassen Ersatzteile und Arbeitszeiten. Die Anwendung soll barrierearm sein und personenbezogene Daten schützen.

**90 Minuten · 4 Aufgaben à 25 Punkte · Hilfsmittel: nicht programmierbarer Taschenrechner**

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FIAE Probeprüfung 1 – Planen eines Softwareproduktes", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – Projektplanung (25 Punkte)

Das Projekt startet am Tag 0. Vorgänge:

| Vorgang | Dauer (Arbeitstage) | Vorgänger |
|---|---:|---|
| A Anforderungen klären | 2 | – |
| B Datenmodell entwerfen | 3 | A |
| C UI-Prototyp erstellen | 4 | A |
| D API implementieren | 5 | B |
| E Usability-Test | 2 | C |
| F Integration und Abnahme | 2 | D, E |

**a) (12 P)** Berechnen Sie die frühesten Anfangs- und Endzeitpunkte aller Vorgänge. Bestimmen Sie anschließend den kritischen Pfad und die Projektdauer.

**b) (7 P)** Vorgang C verzögert sich um einen Arbeitstag. Beurteilen Sie, ob sich dadurch der Projektendtermin verschiebt, und begründen Sie Ihre Entscheidung anhand des Puffers.

**c) (6 P)** Nennen Sie zwei projektspezifische Risiken und schlagen Sie für jedes Risiko eine geeignete Gegenmaßnahme vor.

> [!success]- Lösung Aufgabe 1
> | Vorgang | FAZ | FEZ |
> |---|---:|---:|
> | A | 0 | 2 |
> | B | 2 | 5 |
> | C | 2 | 6 |
> | D | 5 | 10 |
> | E | 6 | 8 |
> | F | 10 | 12 |
>
> Kritischer Pfad **A–B–D–F**, Dauer **12 Arbeitstage**. Der Pfad A–C–E–F dauert 10 Tage; C und E haben je **2 Tage Gesamtpuffer** (SAZ C = 4, SEZ C = 8). Eine Verzögerung von C um einen Tag verschiebt den Endtermin daher **nicht**; der Puffer sinkt auf 1 Tag.
>
> Risiken: unklare Anforderungen → Workshops und abgenommene Akzeptanzkriterien · Ausfall des einzigen Backend-Entwicklers (kritischer Pfad!) → Wissensteilung, Code-Reviews, Vertretung · verspätetes Feedback aus dem Usability-Test → Testtermine und Teilnehmende früh fest einplanen.
>
> **Bewertungshinweise:** a) FAZ/FEZ je Vorgang 1 P, kritischer Pfad 3 P, Dauer 3 P · b) Puffer 4 P, Beurteilung 3 P · c) je Risiko mit Maßnahme 3 P.

### Aufgabe 2 – Anforderungen und Use Cases (25 Punkte)

**a) (10 P)** Formulieren Sie zwei funktionale und zwei nichtfunktionale Anforderungen an das Reparaturportal. Achten Sie darauf, dass alle Anforderungen eindeutig und prüfbar sind.

**b) (8 P)** Beschreiben Sie den Use Case „Reparaturauftrag erfassen“ mit Akteur, Vorbedingung, Ablauf und einem möglichen Alternativfall.

**c) (7 P)** Erläutern Sie den Zweck von Akzeptanzkriterien und formulieren Sie ein messbares Akzeptanzkriterium für das Erfassen eines Reparaturauftrags.

> [!success]- Lösung Aufgabe 2
> **a)** Funktional: „Ein angemeldeter Kunde kann einen Reparaturauftrag erfassen“ und „Nach erfolgreicher Erfassung zeigt das Portal eine Auftragsnummer an“. Nichtfunktional: „95 % der Statusabfragen werden innerhalb von zwei Sekunden beantwortet“ und „Alle Kernfunktionen sind per Tastatur bedienbar und zeigen den Fokus sichtbar an“.
>
> **b)** Akteur: Kunde. Vorbedingung: Kunde ist angemeldet und hat die erforderlichen Auftragsdaten angegeben. Ablauf: Reparaturdaten und gegebenenfalls ein Foto eingeben → Auftrag absenden → Portal speichert den Auftrag und zeigt die Auftragsnummer an. Alternativ: Pflichtangaben fehlen oder die Datei ist unzulässig; das Portal weist auf den Fehler hin und speichert den Auftrag nicht.
>
> **c)** Ein Akzeptanzkriterium ist eine überprüfbare Bedingung, die erfüllt sein muss, damit der Auftraggeber eine Anforderung abnimmt – es schafft ein gemeinsames Verständnis von „fertig“ und ist Grundlage für Abnahmetests. Beispiel: „Gegeben ein angemeldeter Kunde, wenn er alle Pflichtfelder ausfüllt und absendet, dann wird innerhalb von 2 Sekunden eine Auftragsnummer angezeigt und der Auftrag mit dem Status ‚eingegangen‘ gespeichert.“
>
> **Bewertungshinweise:** a) je eindeutige, prüfbare Anforderung 2,5 P (nicht prüfbare Formulierungen wie „schnell“ oder „benutzerfreundlich“ 0 P) · b) Akteur 1 P, Vorbedingung 2 P, Ablauf 3 P, Alternativfall 2 P · c) Zweck 3 P, messbares Kriterium 4 P.

### Aufgabe 3 – Datenmodell und Schnittstelle (25 Punkte)

Es gibt Kundinnen und Kunden, Reparaturaufträge und Arbeitspositionen. Ein Kunde kann mehrere Aufträge erteilen; jeder Auftrag kann mehrere Positionen enthalten. Jede Position gehört genau zu einem Auftrag.

**a) (10 P)** Nennen Sie geeignete Entitäten mit jeweils mindestens drei passenden Attributen. Kennzeichnen Sie Primär- und Fremdschlüssel.

**b) (7 P)** Beschreiben Sie die Beziehungen zwischen den Entitäten und geben Sie jeweils die Kardinalitäten an.

**c) (8 P)** Entwerfen Sie einen HTTP-Endpunkt, über den ein Kunde den Status eines Reparaturauftrags abfragen kann. Geben Sie HTTP-Methode, Pfad, eine Beispielantwort und den Statuscode für einen unbekannten Auftrag an.

> [!success]- Lösung Aufgabe 3
> **a)** Kunde(kunde_id PK, name, email), Auftrag(auftrag_id PK, angelegt_am, status, kunde_id FK), Position(position_id PK, typ, menge, einzelpreis, auftrag_id FK). Geeignete weitere Attribute sind etwa Artikelbezeichnung oder Arbeitszeit.
>
> **b)** Kunde 1:n Auftrag: ein Kunde kann mehrere Aufträge erteilen. Auftrag 1:n Position: ein Auftrag kann mehrere Positionen enthalten; jede Position gehört zu genau einem Auftrag.
>
> **c)** Zum Beispiel `GET /api/auftraege/4711/status`; bei Erfolg `200 OK` mit einer JSON-Antwort, die Status und Zeitstempel enthält:
> ```json
> { "auftragId": 4711, "status": "in Bearbeitung", "geaendertAm": "2026-03-12T14:05:00Z" }
> ```
> Für einen unbekannten Auftrag antwortet der Dienst mit **404 Not Found**; eine fehlende Anmeldung kann mit **401 Unauthorized** beantwortet werden.
>
> **Bewertungshinweise:** a) je Entität mit Attributen 2 P, Schlüssel korrekt 4 P · b) je Beziehung mit Kardinalität 3,5 P · c) Methode 1 P, Pfad 2 P, Beispielantwort 3 P, Statuscode 2 P.

### Aufgabe 4 – Qualität, Datenschutz und Sicherheit (25 Punkte)

**a) (8 P)** Nennen Sie vier Softwarequalitätsmerkmale und geben Sie zu jedem Merkmal eine geeignete Maßnahme an, mit der es geprüft oder verbessert werden kann.

**b) (9 P)** Das Portal speichert Kontaktdaten und von Kunden hochgeladene Fotos. Nennen Sie drei geeignete Datenschutz- oder Sicherheitsmaßnahmen und ordnen Sie jeder Maßnahme das jeweilige Schutzziel zu.

**c) (8 P)** Nennen Sie zwei Maßnahmen zur barrierearmen Gestaltung des Portals und beschreiben Sie für jede Maßnahme einen geeigneten Test.

> [!success]- Lösung Aufgabe 4
> **a)** (ISO/IEC 25010) Funktionale Eignung → Abnahmetests gegen Akzeptanzkriterien · Zuverlässigkeit → Fehlerbehandlung, Monitoring, Lasttests · Benutzbarkeit → Usability-Test mit Kundinnen und Kunden · Wartbarkeit → Modularisierung, Code-Reviews, statische Codeanalyse · Sicherheit → Penetrationstest, Rechteprüfung · Leistungseffizienz → Antwortzeiten messen.
>
> **b)** Rollenrechte nach Minimalprinzip – Kunden sehen nur eigene Aufträge (**Vertraulichkeit**) · TLS für alle Verbindungen und Passwort-Hashes mit bcrypt/Argon2 (**Vertraulichkeit**, TLS auch **Integrität**) · Uploads nach Dateityp und Größe prüfen, außerhalb des Webroots speichern und auf Schadcode scannen (**Integrität**/**Verfügbarkeit**) · Datensicherung der Datenbank (**Verfügbarkeit**) · Löschfristen für Fotos nach Abschluss (Datenminimierung, Art. 5 DSGVO).
>
> **c)** Vollständige Tastaturbedienung mit sichtbarem Fokus → Test: Formular nur mit Tab/Enter ausfüllen · Formularfelder mit Labels und Bilder mit Alternativtexten → Test mit Screenreader (NVDA, VoiceOver) · Kontrast mindestens 4,5 : 1 (WCAG 2.1 AA) → Messung mit Kontrastprüfer.
>
> **Bewertungshinweise:** a) je Merkmal mit Maßnahme 2 P · b) je Maßnahme mit Schutzziel 3 P · c) je Maßnahme 2 P, je Test 2 P.

---

## Teil 2 – Entwicklung und Umsetzung von Algorithmen

> [!abstract] Ausgangssituation
> Die Werkstattanwendung der **Radwerk Service GmbH** speichert Reparaturaufträge samt Arbeitspositionen und wertet die erfassten Kosten aus.

**90 Minuten · 4 Aufgaben à 25 Punkte · Hilfsmittel: nicht programmierbarer Taschenrechner**

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FIAE Probeprüfung 1 – Algorithmen", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – Algorithmus und Test (25 Punkte)

Die Werkstattleitung möchte die **mittlere Bearbeitungszeit** unabhängig von Ausreißern auswerten und verwendet dafür den **Median**. Die Bearbeitungszeiten (in Minuten) liegen unsortiert in einem Array `zeiten` vor. Der Median ist bei ungerader Anzahl der mittlere Wert der sortierten Liste, bei gerader Anzahl der Mittelwert der beiden mittleren Werte.

**a) (12 P)** Entwickeln Sie eine Funktion `median(zeiten)` in Pseudocode. Sortieren Sie das Array zunächst mit einem selbst implementierten Sortierverfahren (keine Bibliotheksfunktion) und ermitteln Sie anschließend den Median. Ein leeres Array soll den Wert −1 liefern.

**b) (6 P)** Geben Sie das sortierte Array und den Median für die Eingaben `[45, 135, 90, 120, 30]` und `[45, 135, 90, 120]` an.

**c) (7 P)** Nennen Sie das von Ihnen verwendete Sortierverfahren, seine Laufzeitkomplexität im ungünstigsten Fall und zwei weitere Testfälle mit erwartetem Ergebnis.

> [!success]- Lösung Aufgabe 1
> **a)** (z. B. Insertion Sort)
> <pre>
> FUNKTION median(zeiten): Gleitkommazahl
>     n ← länge(zeiten)
>     WENN n = 0 DANN
>         RÜCKGABE -1
>     ENDE WENN
>     FÜR i ← 1 BIS n - 1
>         wert ← zeiten[i]
>         j ← i - 1
>         SOLANGE j >= 0 UND zeiten[j] > wert
>             zeiten[j + 1] ← zeiten[j]
>             j ← j - 1
>         ENDE SOLANGE
>         zeiten[j + 1] ← wert
>     ENDE FÜR
>     WENN n MOD 2 = 1 DANN
>         RÜCKGABE zeiten[n DIV 2]
>     SONST
>         RÜCKGABE (zeiten[n DIV 2 - 1] + zeiten[n DIV 2]) / 2
>     ENDE WENN
> ENDE FUNKTION
> </pre>
>
> **b)** `[30, 45, 90, 120, 135]` → Median **90** · `[45, 90, 120, 135]` → (90 + 120) / 2 = **105**
>
> **c)** Insertion Sort: **O(n²)** im ungünstigsten Fall (absteigend sortierte Eingabe). Testfälle: leeres Array → −1 · ein Element `[50]` → 50 · bereits sortiertes Array `[10, 20, 30]` → 20 · gleiche Werte `[60, 60]` → 60.
>
> **Bewertungshinweise:** a) Sortierverfahren korrekt 6 P, Median ungerade/gerade 4 P, leeres Array 2 P · b) je Eingabe 3 P · c) Verfahren und Komplexität 3 P, je Testfall 2 P.

### Aufgabe 2 – Objektorientierung (25 Punkte)

Ein Reparaturauftrag besitzt eine Auftragsnummer, ein Eingangsdatum und einen Status. Er besteht aus beliebig vielen Positionen. Eine Position kann ein Ersatzteil oder geleistete Arbeitszeit darstellen.

**a) (8 P)** Skizzieren Sie ein geeignetes Klassenmodell. Geben Sie für jede Klasse wichtige Attribute und die Beziehungen zwischen den Klassen an.

**b) (9 P)** Erläutern Sie anhand Ihres Modells die Begriffe Vererbung, Kapselung und Polymorphie.

**c) (8 P)** Beschreiben Sie, wie der Preis für eine Ersatzteilposition, eine Arbeitsposition und anschließend für den gesamten Auftrag berechnet wird.

> [!success]- Lösung Aufgabe 2
> **a)** `Auftrag(- auftragsNr, - eingang, - status, - positionen: Liste<Position>)` · abstrakte Klasse `Position(- bezeichnung, + berechnePreis())` · `ErsatzteilPosition(- menge, - einzelpreis)` und `ArbeitsPosition(- stunden, - stundensatz)` erben von Position. Auftrag 1 ◆— 1..* Position (Komposition).
>
> **b)** Vererbung bündelt gemeinsame Felder in Position. Kapselung schützt Zustände und ermöglicht kontrollierte Änderung über Methoden. Polymorphie erlaubt, unterschiedliche Positionsobjekte über dieselbe Methode berechnePreis() zu behandeln.
>
> **c)** Ersatzteil: Menge × Einzelpreis. Arbeitsposition: Stunden × Stundensatz. Der Auftrag durchläuft seine Positionsliste und summiert `berechnePreis()` jeder Position – welche Berechnung ausgeführt wird, entscheidet die dynamische Bindung. Negative Mengen, Zeiten und Preise werden bei der Erfassung abgewiesen.
>
> **Bewertungshinweise:** a) Klassen mit Attributen 5 P, Beziehungen (Aggregation/Komposition, Vererbung) 3 P · b) je Begriff am Modell 3 P · c) je Berechnung 2 P, Gesamtpreis 4 P.

### Aufgabe 3 – Relationale Datenbank und SQL (25 Punkte)

Die Datenbank enthält `Auftrag(auftrag_id, eingang, status, kunde_id)` und `Position(position_id, auftrag_id, typ, bezeichnung, menge, einzelpreis)`. In `Position` stehen sowohl Ersatzteile als auch Arbeitsleistungen.

**a) (8 P)** Kennzeichnen Sie Primär- und Fremdschlüssel und beschreiben Sie eine Beziehung zwischen den Tabellen.

**b) (9 P)** Erstellen Sie eine SQL-Abfrage, die für jeden Auftrag den Gesamtwert seiner Positionen ermittelt. Geben Sie nur Aufträge mit einem Gesamtwert von mehr als 200 Euro aus.

**c) (8 P)** Formulieren Sie eine `UPDATE`-Anweisung, die den Status des Auftrags mit der Nummer 4711 auf „abgeschlossen“ setzt. Nennen Sie eine Maßnahme, mit der unbeabsichtigte Änderungen verhindert werden können.

> [!success]- Lösung Aufgabe 3
> **a)** Auftrag.auftrag_id und Position.position_id sind Primärschlüssel. Position.auftrag_id verweist als Fremdschlüssel auf Auftrag.auftrag_id. Beziehung: Auftrag 1:n Position.
>
> **b)**
> <pre>
> SELECT a.auftrag_id, SUM(p.menge * p.einzelpreis) AS gesamtwert
> FROM Auftrag a
> JOIN Position p ON p.auftrag_id = a.auftrag_id
> GROUP BY a.auftrag_id
> HAVING SUM(p.menge * p.einzelpreis) > 200;
> </pre>
>
> **c)**
> <pre>
> UPDATE Auftrag SET status = 'abgeschlossen' WHERE auftrag_id = 4711;
> </pre>
> Maßnahmen: vorher mit `SELECT … WHERE auftrag_id = 4711` prüfen, welche Zeilen betroffen sind · in einer Transaktion ausführen und erst nach Kontrolle `COMMIT` · Anwendungskonto nur mit notwendigen Rechten.
>
> **Bewertungshinweise:** a) Schlüssel 4 P, Beziehung 4 P · b) SUM 2 P, JOIN 2 P, GROUP BY 2 P, HAVING 3 P · c) Anweisung 5 P, Maßnahme 3 P.

### Aufgabe 4 – Testen und Laufzeit (25 Punkte)

**a) (8 P)** Eine Funktion akzeptiert ganzzahlige Rabattwerte von 0 bis 30 Prozent einschließlich der Grenzwerte. Bilden Sie Äquivalenzklassen und nennen Sie geeignete Grenzwerte für einen Test.

**b) (9 P)** Erläutern Sie jeweils einen Unit-Test, Integrationstest und Abnahmetest für die Auftragsverwaltung.

**c) (8 P)** Die Werkstatt speichert 100.000 Aufträge in einem nach Auftragsnummer **sortierten** Array. Bestimmen Sie die maximale Anzahl an Vergleichen für eine lineare und für eine binäre Suche und geben Sie jeweils die Laufzeitklasse in O-Notation an.

> [!success]- Lösung Aufgabe 4
> **a)** Gültig: 0 bis 30. Ungültig: kleiner 0 und größer 30; ggf. zusätzlich falsches Format. Grenzwerte: −1, 0, 1, 29, 30, 31.
>
> **b)** Unit-Test prüft isoliert die Preisberechnung einer Position. Integrationstest prüft Zusammenspiel von Auftrag, Positionen und Datenbank. Abnahmetest prüft mit Werkstattmitarbeitenden vereinbarte Abläufe anhand der Akzeptanzkriterien.
>
> **c)** Lineare Suche: im ungünstigsten Fall **100.000** Vergleiche → **O(n)**. Binäre Suche: Suchbereich wird je Schritt halbiert; 2¹⁶ = 65.536 < 100.000 ≤ 2¹⁷ = 131.072 → höchstens **17** Vergleiche → **O(log n)**. Voraussetzung der binären Suche ist die Sortierung.
>
> **Bewertungshinweise:** a) Klassen 4 P, Grenzwerte 4 P · b) je Teststufe 3 P · c) je Suchverfahren Anzahl 2 P und O-Notation 2 P.

---

## Teil 3 – Wirtschafts- und Sozialkunde

**60 Minuten · 30 Aufgaben · Hilfsmittel: nicht programmierbarer Taschenrechner.** [[WiSo Probeprüfung 1|WiSo-Teil öffnen]]

Nachbereitung: [[AP2 FIAE Fehlerlog]] · Prüfungsübersicht: [[Uebersicht FIAE AP2]] · ← [[AP2 FIAE Start]]
