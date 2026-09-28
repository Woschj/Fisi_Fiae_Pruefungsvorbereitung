---
tags: [ap2/probepruefung, ap2/fiae]
fachrichtung: FIAE
---
# FIAE · AP2-Probeprüfung 2

> [!info] Durchführung
> Bearbeiten Sie die Prüfungsteile jeweils innerhalb der angegebenen Zeit. Öffnen Sie die Lösungshinweise erst nach Abschluss des jeweiligen Prüfungsteils, bewerten Sie sich anhand der **Bewertungshinweise** und tragen Sie Ihre erreichten Punkte anschließend im Dashboard ein.

## Teil 1 – Planen eines Softwareproduktes

> [!abstract] Ausgangssituation
> Die **KulturPass gGmbH** (Köln) entwickelt ein Portal, über das teilnehmende Einrichtungen Veranstaltungen veröffentlichen und Jugendliche Tickets reservieren können. Das Portal muss verfügbare Plätze zuverlässig anzeigen und Buchungen vor Doppelreservierungen schützen.

**90 Minuten · 4 Aufgaben à 25 Punkte · Hilfsmittel: nicht programmierbarer Taschenrechner**

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FIAE Probeprüfung 2 – Planen", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – Netzplan (25 Punkte)
Für die erste Projektplanung sind folgende Vorgänge und Abhängigkeiten festgelegt: A Anforderungen klären (3 Tage); nach A laufen B Datenmodell entwerfen (2 Tage) und C Benutzeroberfläche prototypisieren (4 Tage) parallel. Nach B folgt D Ticket-API implementieren (5 Tage), nach C folgt E Nutzertest (2 Tage). F Integration und Abnahme (2 Tage) beginnt, sobald D und E abgeschlossen sind.

**a) (12 P)** Berechnen Sie die frühesten und spätesten Anfangs- und Endzeitpunkte der Vorgänge. Bestimmen Sie anschließend den kritischen Pfad und die Projektdauer.

**b) (7 P)** Bestimmen Sie, um wie viele Arbeitstage sich Vorgang C verzögern kann, ohne den Projektendtermin zu verschieben. Begründen Sie Ihre Antwort.

**c) (6 P)** Nennen Sie zwei Risiken beim Einsatz einer externen Ticket-API und schlagen Sie für jedes Risiko eine geeignete Gegenmaßnahme vor.

> [!success]- Lösung Aufgabe 1
> **a)**
>
> | Vorgang | Dauer | FAZ | FEZ | SAZ | SEZ | GP |
> |---|---:|---:|---:|---:|---:|---:|
> | A | 3 | 0 | 3 | 0 | 3 | 0 |
> | B | 2 | 3 | 5 | 3 | 5 | 0 |
> | C | 4 | 3 | 7 | 4 | 8 | 1 |
> | D | 5 | 5 | 10 | 5 | 10 | 0 |
> | E | 2 | 7 | 9 | 8 | 10 | 1 |
> | F | 2 | 10 | 12 | 10 | 12 | 0 |
>
> Kritischer Pfad **A–B–D–F**, Projektdauer **12 Tage**.
>
> **b)** Der Pfad A–C–E–F dauert 11 Tage → C hat **1 Tag Gesamtpuffer**. C darf sich um höchstens einen Tag verzögern; jede weitere Verzögerung verschiebt den Endtermin.
>
> **c)** Ausfall oder lange Antwortzeiten der API → Timeout, Wiederholversuche, Fallback-Anzeige, SLA mit dem Anbieter · inkompatible Änderung der Schnittstelle → versionierte API nutzen, automatisierte Integrationstests · Kosten/Abhängigkeit vom Anbieter → Vertrag mit Kündigungsfristen, Kapselung hinter eigener Schnittstelle.
>
> **Bewertungshinweise:** a) Vorwärtsrechnung 5 P, Rückwärtsrechnung 4 P, kritischer Pfad und Dauer 3 P · b) Puffer 4 P, Begründung 3 P · c) je Risiko mit Maßnahme 3 P.

### Aufgabe 2 – Anforderungen und Priorisierung (25 Punkte)
**a) (8 P)** Nennen Sie vier relevante Stakeholder des Portals und beschreiben Sie jeweils ein Interesse oder eine Erwartung.

**b) (9 P)** Formulieren Sie zwei funktionale und zwei messbare nichtfunktionale Anforderungen an das Portal.

**c) (8 P)** Erläutern Sie die MoSCoW-Priorisierung und ordnen Sie je eine konkrete Anforderung des Portals als „Must“ und „Could“ ein.

> [!success]- Lösung Aufgabe 2
> Beispiele: Jugendliche benötigen einen verständlichen Buchungsablauf; teilnehmende Einrichtungen müssen Kontingente verwalten können; der Support benötigt nachvollziehbare Buchungsstatus; der Datenschutzbeauftragte achtet auf Datenminimierung. Funktionale Anforderungen: Veranstaltungen suchen und Tickets reservieren. Messbare nichtfunktionale Anforderungen: 95 % der Suchanfragen werden binnen zwei Sekunden beantwortet; alle Kernfunktionen sind per Tastatur bedienbar. MoSCoW unterscheidet Must, Should, Could und Won't (nicht im aktuellen Umfang). Beispiel Must: Kontingent vor einer Buchung prüfen; Beispiel Could: Veranstaltungen nach Ort filtern.
>
> **Bewertungshinweise:** a) je Stakeholder mit Interesse 2 P · b) je funktionale Anforderung 2 P, je messbare nichtfunktionale Anforderung 2,5 P · c) Erläuterung MoSCoW 4 P, je Einordnung 2 P.

### Aufgabe 3 – Use Case, Sequenz und API (25 Punkte)
**a) (10 P)** Beschreiben Sie den Use Case „Ticket reservieren“ mit Akteur, Vorbedingung, Ablauf und einem Alternativfall.

**b) (7 P)** Stellen Sie die wesentlichen Schritte als UML-Sequenzdiagramm dar, in dem das Portal das Kontingent prüft, die Reservierung speichert und anschließend eine Bestätigung versendet. Beteiligte: Frontend, ReservierungsService, Datenbank, MailService.

**c) (8 P)** Entwerfen Sie einen REST-Endpunkt für eine Reservierung (Methode, Pfad, Beispiel für den Request-Body). Geben Sie den HTTP-Erfolgsstatus sowie passende Statuscodes für eine fehlende Anmeldung und ein ausverkauftes Kontingent an.

> [!success]- Lösung Aufgabe 3
> **a)** Akteur: angemeldeter Jugendlicher. Vorbedingung: Veranstaltung ist veröffentlicht, Nutzer ist angemeldet. Ablauf: Veranstaltung wählen → Anzahl Tickets wählen → Reservierung bestätigen → Portal prüft und reduziert das Kontingent atomar, speichert die Reservierung und zeigt eine Bestätigung an. Alternativfall: Kontingent reicht nicht → keine Buchung, Hinweis „ausverkauft“ bzw. Angebot der Restplätze.
>
> **b)**
> ```mermaid
> sequenceDiagram
>     Frontend->>ReservierungsService: reservieren(veranstaltungId, anzahl)
>     ReservierungsService->>Datenbank: Kontingent prüfen und reduzieren (Transaktion)
>     Datenbank-->>ReservierungsService: ok / nicht genug Plätze
>     alt Plätze verfügbar
>         ReservierungsService->>Datenbank: Reservierung speichern
>         ReservierungsService-)MailService: Bestätigung senden (asynchron)
>         ReservierungsService-->>Frontend: Bestätigung mit Reservierungsnummer
>     else ausverkauft
>         ReservierungsService-->>Frontend: Fehlermeldung
>     end
> ```
>
> **c)** `POST /api/veranstaltungen/{id}/reservierungen` mit Body `{ "anzahl": 2 }`; Erfolg **201 Created** (mit Location-Header), fehlende Anmeldung **401 Unauthorized**, ausverkauft **409 Conflict**.
>
> **Bewertungshinweise:** a) Akteur 1 P, Vorbedingung 2 P, Ablauf 4 P, Alternativfall 3 P · b) Beteiligte/Lebenslinien 2 P, Nachrichten in richtiger Reihenfolge 3 P, Verzweigung 2 P · c) Methode und Pfad 3 P, Body 1 P, je Statuscode 1–2 P.

### Aufgabe 4 – Datenschutz und Qualität (25 Punkte)
**a) (8 P)** Nennen Sie die wesentlichen Schritte, die vor der Verarbeitung personenbezogener Daten zu klären sind.

**b) (9 P)** Beschreiben Sie drei geeignete Sicherheitsmaßnahmen für das Portal und ordnen Sie jeder Maßnahme ein Schutzziel zu.

**c) (8 P)** Nennen Sie zwei Maßnahmen zur Barrierefreiheit des Portals und beschreiben Sie jeweils einen geeigneten Test.

> [!success]- Lösung Aufgabe 4
> Zweck/Rechtsgrundlage klären, Daten minimieren, Fristen und Betroffenenrechte definieren, Auftragsverarbeitung prüfen. Maßnahmen: Rollenrechte (Vertraulichkeit), TLS (Vertraulichkeit/Integrität), Audit-Log und atomare Buchung (Integrität), Rate-Limit (Verfügbarkeit). Tastatur/Fokus testen; Labels/Alternativtexte mit Screenreader; Kontrast prüfen.
>
> **Bewertungshinweise:** a) je Schritt 2 P · b) je Maßnahme mit Schutzziel 3 P · c) je Maßnahme 2 P, je Test 2 P.

## Teil 2 – Entwicklung und Umsetzung von Algorithmen

> [!abstract] Ausgangssituation
> Das Portal der KulturPass gGmbH importiert Veranstaltungsdaten und wertet Reservierungen aus.

**90 Minuten · 4 Aufgaben à 25 Punkte · Hilfsmittel: nicht programmierbarer Taschenrechner**

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FIAE Probeprüfung 2 – Algorithmen", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – Algorithmus (25 Punkte)
Für die Auslastungsstatistik liegt ein Array `veranstaltungen` vor. Jedes Element hat die Attribute `titel`, `kontingent` (verfügbare Plätze insgesamt) und `reservierungen` (Array von Objekten mit den Attributen `anzahl` und `status`). Mögliche Statuswerte sind `"bestätigt"`, `"offen"` und `"storniert"`.

**a) (13 P)** Entwickeln Sie eine Funktion `auslastung(veranstaltungen)` in Pseudocode. Sie soll für jede Veranstaltung die Auslastung in Prozent ausgeben – gezählt werden die **Tickets** aller bestätigten und offenen Reservierungen. Zusätzlich soll die Funktion den Titel der Veranstaltung mit der höchsten Auslastung zurückgeben. Veranstaltungen mit einem Kontingent von 0 sind zu überspringen.

**b) (7 P)** Führen Sie einen Schreibtischtest mit folgenden Daten durch und geben Sie die Ausgaben und den Rückgabewert an:

| titel | kontingent | reservierungen (anzahl/status) |
|---|---:|---|
| Poetry Slam | 40 | 4/bestätigt, 2/offen, 6/storniert, 10/bestätigt |
| Jazz im Park | 0 | – |
| Theater-Workshop | 20 | 6/bestätigt, 5/bestätigt, 2/offen |

**c) (5 P)** Erläutern Sie, warum Veranstaltungen mit einem Kontingent von 0 gesondert behandelt werden müssen.

> [!success]- Lösung Aufgabe 1
> **a)**
> <pre>
> FUNKTION auslastung(veranstaltungen): Text
>     besteTitel ← ""
>     besteQuote ← -1
>     FÜR JEDE v IN veranstaltungen
>         WENN v.kontingent > 0 DANN
>             tickets ← 0
>             FÜR JEDE r IN v.reservierungen
>                 WENN r.status = "bestätigt" ODER r.status = "offen" DANN
>                     tickets ← tickets + r.anzahl
>                 ENDE WENN
>             ENDE FÜR
>             quote ← tickets / v.kontingent * 100
>             ausgabe(v.titel, quote)
>             WENN quote > besteQuote DANN
>                 besteQuote ← quote
>                 besteTitel ← v.titel
>             ENDE WENN
>         ENDE WENN
>     ENDE FÜR
>     RÜCKGABE besteTitel
> ENDE FUNKTION
> </pre>
>
> **b)** Poetry Slam: 4 + 2 + 10 = 16 Tickets → 16 / 40 = **40 %** · Jazz im Park: übersprungen · Theater-Workshop: 6 + 5 + 2 = 13 → 13 / 20 = **65 %** · Rückgabe: **„Theater-Workshop“**.
>
> **c)** Die Auslastung wird durch das Kontingent geteilt – bei 0 entstünde eine **Division durch null** (Laufzeitfehler bzw. undefiniertes Ergebnis). Außerdem ist eine Auslastung ohne Plätze fachlich nicht sinnvoll.
>
> **Bewertungshinweise:** a) äußere Schleife und Überspringen 3 P, innere Schleife mit Statusprüfung 4 P, Prozentberechnung 2 P, Maximum 3 P, Rückgabe 1 P · b) je Veranstaltung 2 P, Rückgabe 1 P · c) 5 P.

### Aufgabe 2 – Objektorientierung (25 Punkte)
**a) (8 P)** Entwerfen Sie Klassen für Veranstaltung, Einrichtung und Reservierung. Geben Sie geeignete Attribute und die Beziehungen zwischen den Klassen an.

**b) (9 P)** Erläutern Sie die Kapselung am Beispiel des Reservierungsstatus. Eine Buchungsbestätigung kann per E-Mail oder SMS versendet werden. Beschreiben Sie außerdem, wie dynamische Bindung bei unterschiedlichen Benachrichtigungsarten genutzt werden kann.

**c) (8 P)** Nennen Sie zwei Regeln für zulässige Statusänderungen einer Reservierung. Erläutern Sie, warum das Portal diese Regeln serverseitig prüfen muss.

> [!success]- Lösung Aufgabe 2
> Veranstaltung(id, titel, beginn, kontingent, einrichtungId); Einrichtung(id, name); Reservierung(id, nutzerId, veranstaltungId, status). Einrichtung 1:n Veranstaltung, Veranstaltung 1:n Reservierung. Der Status wird nicht frei von außen gesetzt, sondern über Methoden geändert, die erlaubte Übergänge prüfen. Für Benachrichtigungen kann eine gemeinsame Schnittstelle `senden()` von `E-MailBenachrichtigung` und `SMSBenachrichtigung` implementiert werden; beim Aufruf wird die passende Methode des jeweiligen Objekts ausgeführt. Beispielsweise darf eine offene Reservierung bestätigt oder storniert, eine bereits stornierte Reservierung aber nicht bestätigt werden. Serverseitige Prüfungen verhindern ungültige Zustände und Doppelbuchungen, weil Clientprüfungen (JavaScript, App) umgangen oder manipuliert werden können.
>
> **Bewertungshinweise:** a) je Klasse mit Attributen 2 P, Beziehungen 2 P · b) Kapselung 4 P, dynamische Bindung 5 P · c) je Regel 2 P, Begründung 4 P.

### Aufgabe 3 – SQL (25 Punkte)
Die Datenbank enthält `Veranstaltung(id, titel)` und `Reservierung(id, veranstaltung_id, status)`. Für jede Veranstaltung soll die Zahl ihrer bestätigten Reservierungen ausgegeben werden.

**a) (8 P)** Erstellen Sie eine SQL-Abfrage, die auch Veranstaltungen ohne bestätigte Reservierungen enthält.

**b) (9 P)** Ergänzen Sie die Abfrage so, dass nur Veranstaltungen mit mindestens zehn bestätigten Reservierungen ausgegeben werden.

**c) (8 P)** Erläutern Sie, warum für diese Abfrage ein `LEFT JOIN` und `COUNT(r.id)` verwendet werden.

> [!success]- Lösung Aufgabe 3
> <pre>
> -- a)
> SELECT v.titel, COUNT(r.id) AS bestaetigte
> FROM Veranstaltung v
> LEFT JOIN Reservierung r
>   ON r.veranstaltung_id = v.id AND r.status = 'bestätigt'
> GROUP BY v.id, v.titel
> </pre>
> **b)** Ergänzen Sie die Abfrage um `HAVING COUNT(r.id) >= 10`.
>
> **c)** Der `LEFT JOIN` erhält auch Veranstaltungen ohne bestätigte Reservierung. Die Statusbedingung steht in der `ON`-Klausel – stünde sie im `WHERE`, würden die NULL-Zeilen wieder herausgefiltert. `COUNT(r.id)` zählt nur vorhandene Reservierungszeilen und nicht die beim `LEFT JOIN` ergänzte NULL-Zeile (`COUNT(*)` würde 1 statt 0 liefern).
>
> **Bewertungshinweise:** a) SELECT/COUNT 2 P, LEFT JOIN mit Bedingung in ON 4 P, GROUP BY 2 P · b) HAVING 6 P, Platzierung nach GROUP BY 3 P · c) LEFT JOIN 3 P, ON statt WHERE 2 P, COUNT(r.id) 3 P.

### Aufgabe 4 – Testen und Fehler (25 Punkte)
Bei einer Reservierung können pro Buchung zwischen einem und sechs Tickets ausgewählt werden.

**a) (8 P)** Bilden Sie Äquivalenzklassen für gültige und ungültige Ticketmengen und nennen Sie geeignete Grenzwerte.

**b) (9 P)** Erläutern Sie den Unterschied zwischen einem Fehler-, einem Regressions- und einem Integrationstest anhand des Reservierungsportals.

**c) (8 P)** Beschreiben Sie zwei mögliche Ursachen für Doppelbuchungen und nennen Sie zu jeder Ursache eine geeignete technische Gegenmaßnahme.

> [!success]- Lösung Aufgabe 4
> Gültig 1–6; ungültig <1 und >6. Grenzwerte 0, 1, 6, 7. Fehlertest reproduziert Defekt; Regressionstest schützt gegen Wiederauftreten; Integrationstest prüft Zusammenspiel. Ursachen: Wiederholung nach Timeout → Idempotency-Key; parallele Buchungen → Transaktion und atomare Kontingentprüfung/Unique Constraint.
>
> **Bewertungshinweise:** a) Klassen 4 P, Grenzwerte 4 P · b) je Testart 3 P · c) je Ursache 2 P, je Maßnahme 2 P.

## Teil 3 – Wirtschafts- und Sozialkunde
**60 Minuten · 30 Aufgaben · Hilfsmittel: nicht programmierbarer Taschenrechner.** [[WiSo Probeprüfung 2|WiSo-Teil öffnen]]

Nachbereitung: [[AP2 FIAE Fehlerlog]] · ← [[AP2 FIAE Start]]
