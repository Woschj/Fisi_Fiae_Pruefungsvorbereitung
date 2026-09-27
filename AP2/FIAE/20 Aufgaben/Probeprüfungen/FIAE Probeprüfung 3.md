---
tags: [ap2/probepruefung, ap2/fiae]
fachrichtung: FIAE
---
# FIAE · AP2-Probeprüfung 3

> [!info] Durchführung
> Bearbeiten Sie die Prüfungsteile jeweils innerhalb der angegebenen Zeit. Öffnen Sie die Musterlösungen erst nach Abschluss des jeweiligen Prüfungsteils und tragen Sie Ihre erreichten Punkte anschließend im Dashboard ein.

## Teil 1 – Planen eines Softwareproduktes (90 Minuten)

> [!abstract] Szenario
> Die WerkstattMobil GmbH plant ein Portal zur Annahme von Reparaturaufträgen und zur Statusanzeige für Kundinnen und Kunden.

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FIAE Probeprüfung 3 – Planen", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – Vorgehensmodelle (25 P)
Für das Statusportal stehen einige Anforderungen fest, während der genaue Ablauf für Kundinnen und Kunden noch durch Nutzertests geklärt werden soll.

**a) (8 P)** Vergleichen Sie ein sequenzielles Vorgehen mit Scrum für dieses Projekt. Gehen Sie dabei auf den Umgang mit Änderungen und auf frühes Feedback ein.

**b) (9 P)** Beschreiben Sie drei Scrum-Artefakte oder -Ereignisse und erläutern Sie jeweils deren Zweck.

**c) (8 P)** Während eines Sprints wird eine dringende Änderung verlangt. Beschreiben Sie, wie Product Owner und Entwicklungsteam mit dieser Anforderung umgehen sollten.

> [!success]- Lösung Aufgabe 1
> Ein sequenzielles Vorgehen eignet sich bei weitgehend stabilen Anforderungen und klarer Abnahme. Scrum ermöglicht frühzeitige Inkremente und Feedback, erfordert dafür eine laufende Priorisierung. Das Product Backlog enthält und priorisiert die Anforderungen (Artefakt). Im Sprint Planning vereinbaren Team und Product Owner Sprint-Ziel und geplante Arbeit (Ereignis). Im Sprint Review wird das Ergebnis geprüft und Feedback aufgenommen (Ereignis). Bei einer dringenden Änderung bewertet der Product Owner die Priorität gemeinsam mit dem Entwicklungsteam. Auswirkungen auf das Sprint-Ziel sind zu berücksichtigen; bei grundlegenden Änderungen ist das weitere Vorgehen abzustimmen.

### Aufgabe 2 – Datenmodell (25 P)
Ein Kunde kann mehrere Reparaturaufträge erteilen. Zu jedem Auftrag soll das Portal alle Statusänderungen mit Zeitpunkt speichern.

**a) (10 P)** Nennen Sie geeignete Entitäten und Attribute. Kennzeichnen Sie Primär- und Fremdschlüssel und geben Sie die Kardinalitäten an.

**b) (8 P)** Formulieren Sie zwei Geschäftsregeln, die der Server beim Anzeigen oder Ändern des Auftragsstatus durchsetzen muss.

**c) (7 P)** Erläutern Sie einen Vorteil eines gespeicherten Statusverlaufs gegenüber einem einzelnen Statusfeld im Auftrag.

> [!success]- Lösung Aufgabe 2
> Kunde(kunde_id PK, name, kontakt), Auftrag(auftrag_id PK, kunde_id FK, angelegt_am), Statusmeldung(id PK, auftrag_id FK, zeitpunkt, status). Kunde 1:n Auftrag, Auftrag 1:n Statusmeldung. Regeln: Nutzer darf nur eigene Aufträge sehen; Statusübergänge müssen gültig sein. Verlauf bietet Zeitstempel und Nachvollziehbarkeit.

### Aufgabe 3 – API und Zugriffsschutz (25 P)
**a) (8 P)** Entwerfen Sie einen REST-Endpunkt, über den ein angemeldeter Kunde den Status eines Auftrags abfragen kann. Geben Sie HTTP-Methode, Pfad und Erfolgsstatus an.

**b) (9 P)** Ein Kunde ändert die Auftrags-ID in der URL. Beschreiben Sie, wie der Server verhindert, dass dadurch Auftragsdaten eines anderen Kunden sichtbar werden.

**c) (8 P)** Nennen Sie drei Maßnahmen, mit denen der öffentliche Status-Endpunkt gegen Missbrauch geschützt werden kann.

> [!success]- Lösung Aufgabe 3
> GET /api/auftraege/{id}/status, 200 OK; unbekannt oder unzugänglich 404, nicht angemeldet 401. Jede Anfrage serverseitig gegen Eigentümer/Rolle autorisieren; ID ist kein Berechtigungsnachweis. Rate-Limit, zufälliges widerrufbares Token, minimale Ausgabe, Eingabevalidierung und Protokollierung.

### Aufgabe 4 – Qualität und Usability (25 P)
**a) (9 P)** Erläutern Sie den Unterschied zwischen Verifikation und Validierung anhand eines Beispiels aus dem Statusportal.

**b) (8 P)** Nennen Sie zwei Anforderungen an die Barrierefreiheit des Portals und beschreiben Sie jeweils einen geeigneten Test.

**c) (8 P)** Erläutern Sie, welchen Zweck ein Mockup erfüllt und zu welchem Zeitpunkt ein Usability-Test für dieses Projekt sinnvoll ist.

> [!success]- Lösung Aufgabe 4
> Verifikation: Umsetzung entspricht Spezifikation, z. B. API-Vertragstest. Validierung: Produkt erfüllt tatsächlichen Bedarf, z. B. Nutzertest des Statusablaufs. Tastaturbedienung/Fokus mit Tastatur testen, Beschriftungen/Alternativtexte mit Screenreader, Kontrast messen. Mockup zeigt Struktur vor Umsetzung; Usability-Test mit repräsentativen Nutzern früh durchführen.

## Teil 2 – Entwicklung und Umsetzung von Algorithmen (90 Minuten)

> [!abstract] Szenario
> Das Statusportal wird um eine interne Werkstattansicht ergänzt. Dort werden Reparaturaufträge und die für sie benötigten Arbeits- und Ersatzteilpositionen verwaltet.

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FIAE Probeprüfung 3 – Algorithmen", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – Sortierverfahren und Laufzeit (25 P)
Das Portal soll Reparaturaufträge nach ihrer Bearbeitungsdauer sortieren.

**a) (10 P)** Beschreiben Sie den Ablauf von Selection Sort für eine aufsteigende Sortierung.

**b) (8 P)** Bestimmen Sie die Anzahl der Vergleiche, die Selection Sort im ungünstigsten Fall für n Elemente durchführt. Geben Sie das Ergebnis in der O-Notation an.

**c) (7 P)** Nennen Sie je einen Vorteil und einen Nachteil von Selection Sort im Vergleich zu einem Sortierverfahren mit einer Laufzeit von O(n log n).

> [!success]- Lösung Aufgabe 1
> Für jede Position das Minimum im Restbereich suchen und mit dieser Position tauschen. Vergleiche: (n−1)+…+1 = n(n−1)/2 = O(n²). Einfach und speichersparsam, aber bei großen Listen deutlich langsamer.

### Aufgabe 2 – Vererbung und Polymorphie (25 P)
Eine Auftragsposition kann entweder ein Ersatzteil oder eine Arbeitsleistung darstellen. Beide Arten haben eine Beschreibung und liefern einen Preis, berechnen diesen aber unterschiedlich.

**a) (8 P)** Entwerfen Sie eine gemeinsame Basisklasse oder Schnittstelle sowie zwei geeignete spezialisierte Klassen. Nennen Sie wichtige Attribute und geben Sie jeweils eine Methode zur Preisberechnung an.

**b) (9 P)** Erläutern Sie anhand Ihres Modells, wie Polymorphie und dynamische Bindung die Berechnung des Auftragspreises vereinfachen.

**c) (8 P)** Nennen Sie zwei Vorteile einer strukturierten Fehlerbehandlung, wenn eine Preisberechnung ungültige Eingabedaten erhält.

> [!success]- Lösung Aufgabe 2
> Abstrakte `Position(beschreibung, preisBerechnen())`; `ErsatzteilPosition(menge, einzelpreis)` und `ArbeitsPosition(stunden, stundensatz)` implementieren die Preisberechnung unterschiedlich. Der Auftrag kann alle Positionen in einer gemeinsamen Liste halten und `preisBerechnen()` aufrufen; zur Laufzeit wird die Methode der jeweiligen Positionsklasse ausgeführt. Strukturierte Fehlerwerte machen ungültige Mengen, Zeiten oder Preise erkennbar und verhindern unklare Rückgaben; Fehlermeldungen können Kontext enthalten, ohne sensible Daten offenzulegen.

### Aufgabe 3 – SQL und Transaktionen (25 P)
Die Tabellen lauten `Auftrag(id, kunde_id, status)` und `Kunde(id, name)`. Für die Auswertung sollen offene Aufträge je Kunde gezählt werden.

**a) (9 P)** Erstellen Sie eine SQL-Abfrage, die für jeden Kunden die Anzahl seiner offenen Aufträge ausgibt. Berücksichtigen Sie auch Kunden, für die keine offenen Aufträge vorliegen.

**b) (8 P)** Ergänzen Sie die Abfrage so, dass nur Kunden mit mindestens drei offenen Aufträgen ausgegeben werden.

**c) (8 P)** Beim Anlegen eines Reparaturauftrags werden benötigte Ersatzteile im Lager reserviert. Erläutern Sie, warum das Anlegen des Auftrags und das Reservieren der Teile in einer Transaktion erfolgen sollte.

> [!success]- Lösung Aufgabe 3
> <pre>
> -- a)
> SELECT k.id, COUNT(a.id) AS offene
> FROM Kunde k
> LEFT JOIN Auftrag a ON a.kunde_id = k.id AND a.status = 'offen'
> GROUP BY k.id
> </pre>
> **b)** Ergänzen Sie die Abfrage um `HAVING COUNT(a.id) >= 3`.
>
> Der `LEFT JOIN` erhält auch Kunden ohne offene Aufträge; `COUNT(a.id)` zählt keine NULL-Zeile. Auftrag und Teile-Reservierung müssen atomar gespeichert werden: Entweder werden beide Änderungen übernommen oder bei einem Fehler beide zurückgerollt. So entstehen weder Aufträge ohne reservierte Teile noch blockierte Lagerbestände ohne Auftrag.

### Aufgabe 4 – Testen (25 P)
Ein Auftrag kann eine Reparaturdauer zwischen 0 und 480 Minuten enthalten.

**a) (8 P)** Bilden Sie gültige und ungültige Äquivalenzklassen und nennen Sie geeignete Grenzwerte.

**b) (9 P)** Nach der Behebung eines Fehlers in der Auftragssuche soll verhindert werden, dass dieser erneut auftritt. Beschreiben Sie einen geeigneten Regressionstest.

**c) (8 P)** Erläutern Sie den Unterschied zwischen Anweisungs- und Zweigüberdeckung anhand einer Bedingung, die prüft, ob ein Auftrag offen ist.

> [!success]- Lösung Aufgabe 4
> Gültig sind ganzzahlige Werte von 0 bis 480; ungültig sind Werte kleiner 0 oder größer 480. Geeignete Grenzwerte: −1, 0, 480 und 481. Für den Regressionstest wird der behobene Fehlerfall dauerhaft als Test aufgenommen und die relevante Testsuite nach Änderungen erneut ausgeführt. Bei der Bedingung `status = "offen"` verlangt Anweisungsüberdeckung, dass die zugehörigen Anweisungen mindestens einmal ausgeführt werden. Zweigüberdeckung verlangt zusätzlich Testfälle, in denen die Bedingung sowohl wahr als auch falsch ist.

## Teil 3 – Wirtschafts- und Sozialkunde
**60 Minuten · 20 Fragen à 5 Punkte.** [[WiSo Probeprüfung 3|WiSo-Teil öffnen und Antworten anklicken]]

Nachbereitung: [[AP2 FIAE Fehlerlog]] · ← [[AP2 FIAE Start]]
