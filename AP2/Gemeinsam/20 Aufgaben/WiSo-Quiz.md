---
tags: [ap2/wiso, ap2/pruefungssimulation]
---
# WiSo-Quiz – Prüfungssimulation

Die WiSo-Prüfung besteht aus **30 gebundenen Aufgaben in 60 Minuten** (ankreuzen, zuordnen, kurze Rechnungen) und ist für FISI und FIAE gleich. Hier simulierst du sie: Timer starten, 30 Fragen aus allen WiSo-Modulen beantworten, am Ende deine Quote als Punkte eintragen.

> [!tip] Taktik für die echte Prüfung
> - Erst alle Aufgaben lesen, die sicheren sofort lösen – **2 Minuten pro Aufgabe**.
> - Bei Rechenaufgaben (Urlaub, Gewinnanteil, Beiträge) Rechenweg auf dem Konzeptpapier notieren.
> - Aussagen wie „immer“, „nie“, „ausschließlich“ sind meistens falsch.
> - Für vollständige Multiple-Choice-Simulationen mit anklickbaren Kästchen: [[WiSo Probeprüfung 1]] · [[WiSo Probeprüfung 2]] · [[WiSo Probeprüfung 3]] · [[WiSo Probeprüfung 4]].

## Timer
```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "WiSo-Simulation", aufgaben: [100], minuten: 60 })
```

## 30 Fragen
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { bereich: "WiSo", modus: "alle", anzahl: 30 })
```

## Nur Wiederholung
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { bereich: "WiSo", modus: "faellig", anzahl: 15, auswahl: true })
```

**Trainer:** Urlaub, Sozialversicherung, Gewinnverteilung
```dataviewjs
await dv.view("AP2/99 System/views/trainer", { typen: ["urlaub-jugend", "sozialversicherung", "gewinnverteilung"] })
```

Bereich: [[Übersicht WiSo und Projektarbeit]] · ← [[AP2 Start]]

