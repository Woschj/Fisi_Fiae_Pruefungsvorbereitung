---
tags: [ap2/probepruefung, ap2/fiae]
fachrichtung: FIAE
---
# FIAE · AP2-Probeprüfung 1

> [!info] Durchführung
> Bearbeiten Sie die drei Prüfungsteile jeweils innerhalb der angegebenen Zeit. Öffnen Sie die Lösungshinweise erst nach Abschluss des jeweiligen Prüfungsteils und tragen Sie Ihre erreichten Punkte anschließend im Dashboard ein. Szenarien und Datensätze sind eigens für diese Probeprüfung erstellt.

## Teil 1 – Planen eines Softwareproduktes

> [!abstract] Ausgangssituation
> Die **Radwerk Service GmbH** möchte eine Webanwendung zur Annahme und Verwaltung von Reparaturaufträgen. Kundinnen und Kunden sollen Reparaturen beauftragen und den Bearbeitungsstatus verfolgen können. Werkstattmitarbeitende erfassen Ersatzteile und Arbeitszeiten. Die Anwendung soll barrierearm sein und personenbezogene Daten schützen.

**90 Minuten · 4 Aufgaben à 25 Punkte · Hilfsmittel: Taschenrechner**

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
> Kritischer Pfad **A–B–D–F**, Dauer **12 Arbeitstage**. Der Pfad A–C–E–F dauert 10 Tage und hat zwei Tage Puffer. Eine Verzögerung von C um einen Tag verschiebt den Endtermin allein nicht.
>
> Risiken: unklare Anforderungen → priorisierte Workshops und Abnahme von Akzeptanzkriterien; fehlende Bildrechte → klare Uploadregeln, Rechtehinweise und Löschprozess; zu wenig Testzeit → Testdaten und Testfenster früh planen.

### Aufgabe 2 – Anforderungen und Use Cases (25 Punkte)

**a) (10 P)** Formulieren Sie zwei funktionale und zwei nichtfunktionale Anforderungen an das Reparaturportal. Achten Sie darauf, dass alle Anforderungen eindeutig und prüfbar sind.

**b) (8 P)** Beschreiben Sie den Use Case „Reparaturauftrag erfassen“ mit Akteur, Vorbedingung, Ablauf und einem möglichen Alternativfall.

**c) (7 P)** Erläutern Sie den Zweck von Akzeptanzkriterien und formulieren Sie ein messbares Akzeptanzkriterium für das Erfassen eines Reparaturauftrags.

> [!success]- Lösung Aufgabe 2
> **a)** Funktional: „Ein angemeldeter Kunde kann einen Reparaturauftrag erfassen“ und „Nach erfolgreicher Erfassung zeigt das Portal eine Auftragsnummer an“. Nichtfunktional: „95 % der Statusabfragen werden innerhalb von zwei Sekunden beantwortet“ und „Alle Kernfunktionen sind per Tastatur bedienbar und zeigen den Fokus sichtbar an“.
>
> **b)** Akteur: Kunde. Vorbedingung: Kunde ist angemeldet und hat die erforderlichen Auftragsdaten angegeben. Ablauf: Reparaturdaten und gegebenenfalls ein Foto eingeben → Auftrag absenden → Portal speichert den Auftrag und zeigt die Auftragsnummer an. Alternativ: Pflichtangaben fehlen oder die Datei ist unzulässig; das Portal weist auf den Fehler hin und speichert den Auftrag nicht.
>
> **c)** Ein Akzeptanzkriterium ist eine überprüfbare Bedingung für die Abnahme. Beispiel: Nach dem Absenden gültiger Auftragsdaten wird eine Auftragsnummer angezeigt und der Auftrag mit dem Status „eingegangen“ gespeichert.

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
> **c)** Zum Beispiel `GET /api/auftraege/4711/status`; bei Erfolg `200 OK` mit einer JSON-Antwort, die Status und Zeitstempel enthält. Für einen unbekannten Auftrag antwortet der Dienst mit **404 Not Found**; eine fehlende Anmeldung kann mit **401 Unauthorized** beantwortet werden.

### Aufgabe 4 – Qualität, Datenschutz und Sicherheit (25 Punkte)

**a) (8 P)** Nennen Sie vier Softwarequalitätsmerkmale und geben Sie zu jedem Merkmal eine geeignete Maßnahme an, mit der es geprüft oder verbessert werden kann.

**b) (9 P)** Das Portal speichert Kontaktdaten und von Kunden hochgeladene Fotos. Nennen Sie drei geeignete Datenschutz- oder Sicherheitsmaßnahmen und ordnen Sie jeder Maßnahme das jeweilige Schutzziel zu.

**c) (8 P)** Nennen Sie zwei Maßnahmen zur barrierearmen Gestaltung des Portals und beschreiben Sie für jede Maßnahme einen geeigneten Test.

> [!success]- Lösung Aufgabe 4
> **a)** Funktionale Eignung → Anforderungen/Abnahmetests; Zuverlässigkeit → Fehlerbehandlung und Monitoring; Benutzbarkeit → Usability-Test; Wartbarkeit → klare Module und Code-Reviews; Sicherheit → Rechteprüfung und sichere Speicherung. Vier begründete Beispiele.
>
> **b)** Rollenrechte nach Minimalprinzip (Vertraulichkeit); TLS und sichere Passwort-Hashes (Vertraulichkeit); Uploads nach Typ/Größe prüfen und außerhalb des Webroots speichern (Sicherheit/Verfügbarkeit); Löschfristen festlegen. Drei begründete Maßnahmen.
>
> **c)** Tastaturbedienung mit sichtbarem Fokus testen; aussagekräftige Labels und Alternativtexte mit Screenreader testen; Kontraste automatisiert und manuell prüfen.

---

## Teil 2 – Entwicklung und Umsetzung von Algorithmen

> [!abstract] Ausgangssituation
> Die Werkstattanwendung der **Radwerk Service GmbH** speichert Reparaturaufträge samt Arbeitspositionen und wertet die erfassten Kosten aus.

**90 Minuten · 4 Aufgaben à 25 Punkte · Hilfsmittel: Taschenrechner**

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FIAE Probeprüfung 1 – Algorithmen", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – Algorithmus und Test (25 Punkte)

Die Werkstattleitung möchte Aufträge mit kurzer Bearbeitungszeit auswerten. Eine Liste enthält die Bearbeitungszeiten in Minuten. Für die Auswertung zählen nur Zeiten bis einschließlich 120 Minuten.

**a) (10 P)** Entwickeln Sie Pseudocode, der die Summe und die Anzahl der zu berücksichtigenden Bearbeitungszeiten ermittelt.

**b) (8 P)** Führen Sie den Algorithmus mit den Bearbeitungszeiten [45, 135, 90, 120, 30] aus. Geben Sie die resultierende Summe und Anzahl an.

**c) (7 P)** Nennen Sie drei Grenz- oder Sonderfälle, die Sie für den Algorithmus testen würden.

> [!success]- Lösung Aufgabe 1
> <pre>
> summe ← 0
> anzahl ← 0
> FÜR i ← 0 BIS länge(zeiten) - 1
>     WENN zeiten[i] <= 120 DANN
>         summe ← summe + zeiten[i]
>         anzahl ← anzahl + 1
>     ENDE WENN
> ENDE FÜR
> </pre>
>
> Berücksichtigt werden 45, 90, 120 und 30: Summe **285**, Anzahl **4**.
>
> Geeignete Tests: leere Liste; genau 120 (eingeschlossen); nur Werte über 120; ungültige oder negative Eingabe.

### Aufgabe 2 – Objektorientierung (25 Punkte)

Ein Reparaturauftrag besitzt eine Auftragsnummer, ein Eingangsdatum und einen Status. Er besteht aus beliebig vielen Positionen. Eine Position kann ein Ersatzteil oder geleistete Arbeitszeit darstellen.

**a) (8 P)** Skizzieren Sie ein geeignetes Klassenmodell. Geben Sie für jede Klasse wichtige Attribute und die Beziehungen zwischen den Klassen an.

**b) (9 P)** Erläutern Sie anhand Ihres Modells die Begriffe Vererbung, Kapselung und Polymorphie.

**c) (8 P)** Beschreiben Sie, wie der Preis für eine Ersatzteilposition, eine Arbeitsposition und anschließend für den gesamten Auftrag berechnet wird.

> [!success]- Lösung Aufgabe 2
> **a)** Auftrag(auftragsNr, eingang, status, positionen: Liste); abstrakte Position(menge); ErsatzteilPosition(artikel, einzelpreis); ArbeitsPosition(stunden, stundensatz). Ein Auftrag umfasst viele Positionen.
>
> **b)** Vererbung bündelt gemeinsame Felder in Position. Kapselung schützt Zustände und ermöglicht kontrollierte Änderung über Methoden. Polymorphie erlaubt, unterschiedliche Positionsobjekte über dieselbe Methode berechnePreis() zu behandeln.
>
> **c)** Ersatzteil: Menge × Einzelpreis. Arbeitsposition: Stunden × Stundensatz. Gesamtpreis = Summe der Positionspreise. Negative Mengen, Zeiten und Preise werden validiert.

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
> **c)** UPDATE Auftrag SET status = 'abgeschlossen' WHERE auftrag_id = 4711; Vorher Zeile mit demselben Filter prüfen und innerhalb einer Transaktion arbeiten; WHERE-Klausel kontrollieren.

### Aufgabe 4 – Testen und Laufzeit (25 Punkte)

**a) (8 P)** Eine Funktion akzeptiert ganzzahlige Rabattwerte von 0 bis 30 Prozent einschließlich der Grenzwerte. Bilden Sie Äquivalenzklassen und nennen Sie geeignete Grenzwerte für einen Test.

**b) (9 P)** Erläutern Sie jeweils einen Unit-Test, Integrationstest und Abnahmetest für die Auftragsverwaltung.

**c) (8 P)** Ein Algorithmus vergleicht jeden von n Aufträgen mit jedem anderen Auftrag. Bestimmen Sie die asymptotische Laufzeit in der O-Notation und begründen Sie Ihre Angabe.

> [!success]- Lösung Aufgabe 4
> **a)** Gültig: 0 bis 30. Ungültig: kleiner 0 und größer 30; ggf. zusätzlich falsches Format. Grenzwerte: −1, 0, 1, 29, 30, 31.
>
> **b)** Unit-Test prüft isoliert die Preisberechnung einer Position. Integrationstest prüft Zusammenspiel von Auftrag, Positionen und Datenbank. Abnahmetest prüft mit Werkstattmitarbeitenden vereinbarte Abläufe anhand der Akzeptanzkriterien.
>
> **c)** Im ungünstigsten Fall n × n Vergleiche, also **O(n²)**. Verdopplung von n führt ungefähr zu viermal so vielen Vergleichen.

---

## Teil 3 – Wirtschafts- und Sozialkunde

**60 Minuten · 20 Fragen à 5 Punkte.** [[WiSo Probeprüfung 1|WiSo-Teil öffnen und Antworten anklicken]]

Nachbereitung: [[AP2 FIAE Fehlerlog]] · Prüfungsübersicht: [[Uebersicht FIAE AP2]] · ← [[AP2 FIAE Start]]
