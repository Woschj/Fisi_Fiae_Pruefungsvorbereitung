---
tags: [ap1/trainer]
---
# Trainer

Unbegrenzt neue Rechenaufgaben mit sofortiger Kontrolle und Lösungsweg. Jede Aufgabe wird in deiner Statistik gezählt (Dashboard → „Trainer-Quote“).

> [!tip] So trainierst du effektiv
> - Erst den Lösungsweg im Modul verstehen, dann hier **ohne** Hilfe rechnen.
> - Ziel: **5 richtige in Folge** pro Aufgabentyp – dann sitzt es.
> - Zahlen deutsch oder englisch eingeben (`12,5` oder `12.5`), große Zahlen auch als `2,1e14`.
> - Nur der **erste** Prüfversuch zählt für die Statistik – danach kannst du korrigieren und lernen.

## Netzwerk
```dataviewjs
await dv.view("AP1/99 System/views/trainer", { typen: ["subnetz-analyse", "subnetz-teilen", "subnetz-hosts", "subnetz-gleich", "vlsm", "maske-praefix", "ipv6-kuerzen", "ipv6-expandieren", "ipv6-praefix", "ports", "hex-header", "db"] })
```

## Hardware
```dataviewjs
await dv.view("AP1/99 System/views/trainer", { typen: ["einheiten", "uebertragung", "datenmenge", "usv-dimension", "usv-akku", "strom", "ppi", "druckkosten", "pruefziffer"] })
```

## Software
```dataviewjs
await dv.view("AP1/99 System/views/trainer", { typen: ["zahlensysteme", "zweierkomplement", "trace"] })
```

## IT-Sicherheit
```dataviewjs
await dv.view("AP1/99 System/views/trainer", { typen: ["backup", "schluessel", "passwort"] })
```

## Wirtschaft
```dataviewjs
await dv.view("AP1/99 System/views/trainer", { typen: ["bezugskalkulation", "angebotsvergleich", "umsatzsteuer", "verkaufskalkulation", "nutzwert", "kauf-leasing", "afa-amortisation", "darlehen", "kostenrechnung"] })
```

## Projekt & Service
```dataviewjs
await dv.view("AP1/99 System/views/trainer", { typen: ["netzplan", "verfuegbarkeit"] })
```

## Prüfungsmix (alles gemischt)
```dataviewjs
await dv.view("AP1/99 System/views/trainer", {})
```

← [[Start]]
