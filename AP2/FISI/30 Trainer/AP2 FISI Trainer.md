---
tags: [ap2/trainer, ap2/fisi]
---
# AP2 FISI Trainer

Unbegrenzt neue Rechenaufgaben im Stil der AP2 mit sofortiger Kontrolle und Lösungsweg. Jeder erste Prüfversuch zählt in deiner Statistik (Dashboard → „Trainer-Quote“). Der Link „📘 Nachlernen“ springt in den passenden Modulabschnitt.

> [!tip] So trainierst du effektiv
> - Die Rechenwege der Prüfung sind fast immer gleich (Speicherbedarf → Plattenanzahl → Nettokapazität; Datenmenge → Übertragungszeit). Rechne sie so lange, bis sie automatisch sitzen.
> - Ziel: **5 richtige in Folge** pro Aufgabentyp.
> - Zahlen deutsch oder englisch eingeben (`12,5` oder `12.5`).

## Konzeption und Administration
```dataviewjs
await dv.view("AP2/99 System/views/trainer", { typen: ["netzteil", "stromkosten", "usv-dimension", "usv-akku", "speicherbedarf", "raid-planung", "raid", "einheiten", "datenmenge", "backup-plan", "backup", "generationen", "verfuegbarkeit", "passwort", "trace", "ganzzahl-modulo", "datentyp-bereich", "sql-ergebnis"] })
```

## Netzwerke
```dataviewjs
await dv.view("AP2/99 System/views/trainer", { typen: ["subnetz-analyse", "subnetz-teilen", "subnetz-hosts", "subnetz-gleich", "vlsm", "maske-praefix", "ipv6-subnetze", "ipv6-praefix", "ipv6-kuerzen", "ipv6-expandieren", "ports", "schluessel", "transferzeit", "uebertragung", "bandbreite", "verfuegbarkeit-kombi"] })
```

## Wirtschafts- und Sozialkunde, Projektarbeit
```dataviewjs
await dv.view("AP2/99 System/views/trainer", { typen: ["urlaub-jugend", "sozialversicherung", "gewinnverteilung", "afa-amortisation", "netzplan", "nutzwert"] })
```

← [[AP2 FISI Start]]
