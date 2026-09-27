---
tags: [ap2/probepruefung, ap2/fiae]
fachrichtung: FIAE
---
# FIAE · AP2-Probeprüfung 2

> [!info] Durchführung
> Bearbeiten Sie die Prüfungsteile jeweils innerhalb der angegebenen Zeit. Öffnen Sie die Musterlösungen erst nach Abschluss des jeweiligen Prüfungsteils und tragen Sie Ihre erreichten Punkte anschließend im Dashboard ein.

## Teil 1 – Planen eines Softwareproduktes (90 Minuten)

> [!abstract] Szenario
> Die **KulturPass gGmbH** entwickelt ein Portal, über das teilnehmende Einrichtungen Veranstaltungen veröffentlichen und Jugendliche Tickets reservieren können. Das Portal muss verfügbare Plätze zuverlässig anzeigen und Buchungen vor Doppelreservierungen schützen.

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FIAE Probeprüfung 2 – Planen", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – Netzplan (25 P)
Für die erste Projektplanung sind folgende Vorgänge und Abhängigkeiten festgelegt: A Anforderungen klären (3 Tage); nach A laufen B Datenmodell entwerfen (2 Tage) und C Benutzeroberfläche prototypisieren (4 Tage) parallel. Nach B folgt D Ticket-API implementieren (5 Tage), nach C folgt E Nutzertest (2 Tage). F Integration und Abnahme (2 Tage) beginnt, sobald D und E abgeschlossen sind.

**a) (12 P)** Berechnen Sie die frühesten Anfangs- und Endzeitpunkte der Vorgänge. Bestimmen Sie anschließend den kritischen Pfad und die Projektdauer.

**b) (7 P)** Bestimmen Sie, um wie viele Arbeitstage sich Vorgang C verzögern kann, ohne den Projektendtermin zu verschieben. Begründen Sie Ihre Antwort.

**c) (6 P)** Nennen Sie zwei Risiken beim Einsatz einer externen Ticket-API und schlagen Sie für jedes Risiko eine geeignete Gegenmaßnahme vor.

> [!success]- Lösung Aufgabe 1
> A endet Tag 3, B Tag 5, C Tag 7, D Tag 10, E Tag 9, F Tag 12. Kritischer Pfad **A–B–D–F**, Projektdauer **12 Tage**. C–E-Pfad ist 11 Tage lang und hat **1 Tag Puffer**. API-Ausfall: Timeout/Fallback; inkompatible Änderung: Versionierung und Integrationstests.

### Aufgabe 2 – Anforderungen und Priorisierung (25 P)
**a) (8 P)** Nennen Sie vier relevante Stakeholder des Portals und beschreiben Sie jeweils ein Interesse oder eine Erwartung.

**b) (9 P)** Formulieren Sie zwei funktionale und zwei messbare nichtfunktionale Anforderungen an das Portal.

**c) (8 P)** Erläutern Sie die MoSCoW-Priorisierung und ordnen Sie je eine konkrete Anforderung des Portals als „Must“ und „Could“ ein.

> [!success]- Lösung Aufgabe 2
> Beispiele: Jugendliche benötigen einen verständlichen Buchungsablauf; teilnehmende Einrichtungen müssen Kontingente verwalten können; der Support benötigt nachvollziehbare Buchungsstatus; der Datenschutzbeauftragte achtet auf Datenminimierung. Funktionale Anforderungen: Veranstaltungen suchen und Tickets reservieren. Messbare nichtfunktionale Anforderungen: 95 % der Suchanfragen werden binnen zwei Sekunden beantwortet; alle Kernfunktionen sind per Tastatur bedienbar. MoSCoW unterscheidet Must, Should, Could und Won't (nicht im aktuellen Umfang). Beispiel Must: Kontingent vor einer Buchung prüfen; Beispiel Could: Veranstaltungen nach Ort filtern.

### Aufgabe 3 – Use Case und API (25 P)
**a) (10 P)** Beschreiben Sie den Use Case „Ticket reservieren“ mit Akteur, Vorbedingung, Ablauf und einem Alternativfall.

**b) (7 P)** Stelle die wesentlichen Schritte einer Sequenz dar, in der das Portal das Kontingent prüft, die Reservierung speichert und anschließend eine Bestätigung versendet.

**c) (8 P)** Entwirf einen REST-Endpunkt für eine Reservierung. Gib den HTTP-Erfolgsstatus sowie passende Statuscodes für eine fehlende Anmeldung und ein ausverkauftes Kontingent an.

> [!success]- Lösung Aufgabe 3
> Der Akteur ist ein angemeldeter Jugendlicher; Voraussetzung ist ein verfügbares Kontingent. Er wählt eine Veranstaltung und bestätigt die Reservierung. Das Portal prüft und reduziert das Kontingent atomar, speichert die Reservierung und zeigt eine Bestätigung an. Ist kein Platz mehr verfügbar, wird keine Buchung angelegt und das Portal meldet den Grund. Die Sequenz kann UI → API → Kontingentdienst → Datenbank → Benachrichtigungsdienst umfassen. Beispiel: `POST /api/veranstaltungen/{id}/reservierungen`; Erfolg **201 Created**, fehlende Anmeldung **401 Unauthorized**, ausverkauft **409 Conflict**.

### Aufgabe 4 – Datenschutz und Qualität (25 P)
**a) (8 P)** Nennen Sie die wesentlichen Schritte, die vor der Verarbeitung personenbezogener Daten zu klären sind.

**b) (9 P)** Beschreiben Sie drei geeignete Sicherheitsmaßnahmen für das Portal und ordnen Sie jeder Maßnahme ein Schutzziel zu.

**c) (8 P)** Nennen Sie zwei Maßnahmen zur Barrierefreiheit des Portals und beschreiben Sie jeweils einen geeigneten Test.

> [!success]- Lösung Aufgabe 4
> Zweck/Rechtsgrundlage klären, Daten minimieren, Fristen und Betroffenenrechte definieren, Auftragsverarbeitung prüfen. Maßnahmen: Rollenrechte (Vertraulichkeit), TLS (Vertraulichkeit/Integrität), Audit-Log und atomare Buchung (Integrität), Rate-Limit (Verfügbarkeit). Tastatur/Fokus testen; Labels/Alternativtexte mit Screenreader; Kontrast prüfen.

## Teil 2 – Entwicklung und Umsetzung von Algorithmen (90 Minuten)

> [!abstract] Szenario
> Das Portal importiert Veranstaltungsdaten und wertet Reservierungen aus.

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FIAE Probeprüfung 2 – Algorithmen", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – Algorithmus (25 P)
Eine Auswertung soll für eine Veranstaltung zählen, wie viele Reservierungen bestätigt und wie viele noch offen sind. Die Statuswerte der fünf Datensätze lauten der Reihe nach: `bestätigt`, `offen`, `bestätigt`, `storniert`, `bestätigt`.

**a) (10 P)** Entwickeln Sie Pseudocode, der die Anzahl der bestätigten Reservierungen ermittelt.

**b) (8 P)** Führen Sie den Algorithmus mit den angegebenen Statuswerten aus und geben Sie das Ergebnis an.

**c) (7 P)** Ergänzen Sie den Algorithmus so, dass zusätzlich die Anzahl der offenen Reservierungen ermittelt wird.

> [!success]- Lösung Aufgabe 1
> <pre>
> anzahl ← 0
> FÜR i ← 0 BIS länge(reservierungen) - 1
>     WENN reservierungen[i].status = "bestätigt" DANN
>         anzahl ← anzahl + 1
>     ENDE WENN
> ENDE FÜR
> </pre>
> Ergebnis **3**. Einen zweiten Zähler initialisieren und bei Status offen erhöhen.

### Aufgabe 2 – Objektorientierung (25 P)
**a) (8 P)** Entwerfen Sie Klassen für Veranstaltung, Einrichtung und Reservierung. Geben Sie geeignete Attribute und die Beziehungen zwischen den Klassen an.

**b) (9 P)** Erläutern Sie die Kapselung am Beispiel des Reservierungsstatus. Eine Buchungsbestätigung kann per E-Mail oder SMS versendet werden. Beschreiben Sie außerdem, wie dynamische Bindung bei unterschiedlichen Benachrichtigungsarten genutzt werden kann.

**c) (8 P)** Nennen Sie zwei Regeln für zulässige Statusänderungen einer Reservierung. Erläutern Sie, warum das Portal diese Regeln serverseitig prüfen muss.

> [!success]- Lösung Aufgabe 2
> Veranstaltung(id, titel, beginn, kontingent, einrichtungId); Einrichtung(id, name); Reservierung(id, nutzerId, veranstaltungId, status). Einrichtung 1:n Veranstaltung, Veranstaltung 1:n Reservierung. Der Status wird nicht frei von außen gesetzt, sondern über Methoden geändert, die erlaubte Übergänge prüfen. Für Benachrichtigungen kann eine gemeinsame Schnittstelle `senden()` von `E-MailBenachrichtigung` und `SMSBenachrichtigung` implementiert werden; beim Aufruf wird die passende Methode des jeweiligen Objekts ausgeführt. Beispielsweise darf eine offene Reservierung bestätigt oder storniert, eine bereits stornierte Reservierung aber nicht bestätigt werden. Serverseitige Prüfungen verhindern ungültige Zustände und Doppelbuchungen.

### Aufgabe 3 – SQL (25 P)
Die Datenbank enthält `Veranstaltung(id, titel)` und `Reservierung(id, veranstaltung_id, status)`. Gib für jede Veranstaltung die Zahl ihrer bestätigten Reservierungen aus.

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
> Der `LEFT JOIN` erhält auch Veranstaltungen ohne bestätigte Reservierung. `COUNT(r.id)` zählt nur vorhandene Reservierungszeilen und nicht die beim `LEFT JOIN` ergänzte NULL-Zeile.

### Aufgabe 4 – Testen und Fehler (25 P)
Bei einer Reservierung können pro Buchung zwischen einem und sechs Tickets ausgewählt werden.

**a) (8 P)** Bilden Sie Äquivalenzklassen für gültige und ungültige Ticketmengen und nennen Sie geeignete Grenzwerte.

**b) (9 P)** Erläutern Sie den Unterschied zwischen einem Fehler-, einem Regressions- und einem Integrationstest anhand des Reservierungsportals.

**c) (8 P)** Beschreiben Sie zwei mögliche Ursachen für Doppelbuchungen und nennen Sie zu jeder Ursache eine geeignete technische Gegenmaßnahme.

> [!success]- Lösung Aufgabe 4
> Gültig 1–6; ungültig <1 und >6. Grenzwerte 0, 1, 6, 7. Fehlertest reproduziert Defekt; Regressionstest schützt gegen Wiederauftreten; Integrationstest prüft Zusammenspiel. Ursachen: Wiederholung nach Timeout → Idempotency-Key; parallele Buchungen → Transaktion und atomare Kontingentprüfung/Unique Constraint.

## Teil 3 – Wirtschafts- und Sozialkunde
**60 Minuten · 20 Fragen à 5 Punkte.** [[WiSo Probeprüfung 2|WiSo-Teil öffnen und Antworten anklicken]]

Nachbereitung: [[AP2 FIAE Fehlerlog]] · ← [[AP2 FIAE Start]]
