---
tags: [ap2/trainer, ap2/fiae]
---
# AP2 FIAE Trainer

Unbegrenzt neue Rechenaufgaben im Stil der AP2 mit sofortiger Kontrolle und Lösungsweg. Jeder erste Prüfversuch zählt in deiner Statistik (Dashboard → „Trainer-Quote“). Der Link „📘 Nachlernen“ springt in den passenden Modulabschnitt.

> [!tip] So trainierst du effektiv
> - Die Rechenwege der Prüfung sind fast immer gleich (Speicherbedarf → Plattenanzahl → Nettokapazität; Datenmenge → Übertragungszeit). Rechne sie so lange, bis sie automatisch sitzen.
> - Ziel: **5 richtige in Folge** pro Aufgabentyp.
> - Zahlen deutsch oder englisch eingeben (`12,5` oder `12.5`).

## Planen eines Softwareproduktes
```dataviewjs
await dv.view("AP2/99 System/views/trainer", { typen: ["netzplan", "nutzwert", "speicherbedarf", "datenmenge", "einheiten", "passwort", "schluessel"] })
```

## Algorithmen
```dataviewjs
await dv.view("AP2/99 System/views/trainer", { typen: ["trace", "ganzzahl-modulo", "datentyp-bereich", "zahlensysteme", "zweierkomplement", "sql-ergebnis"] })
```

## Wirtschafts- und Sozialkunde, Projektarbeit
```dataviewjs
await dv.view("AP2/99 System/views/trainer", { typen: ["urlaub-jugend", "sozialversicherung", "gewinnverteilung", "afa-amortisation"] })
```

← [[AP2 FIAE Start]]
