---
modul: W2
titel: Nutzwertanalyse und Entscheidungen
bereich: Wirtschaft
reihenfolge: 29
dauer: 60
status: neu
sicherheit: 0
zuletzt:
berufsschule: "GiD · LF2 LS2.1 (qualitativer Vergleich, NWA der Raspberry-Pi-Modelle)"
tags: [ap1/modul, ap1/wirtschaft]
---
# W2 · Nutzwertanalyse und Entscheidungen

> [!abstract] Überblick
> **Bereich:** [[Übersicht Wirtschaft]]
> **Dauer:** ca. 60 min · **Prüfungsrelevanz:** ★★★ – NWA berechnen und das Ergebnis kritisch bewerten
> **Voraussetzungen:** [[W1 Beschaffung und Kalkulation]]
> **Berufsschule:** GiD LF2 LS2.1 (qualitativer Vergleich per NWA)

## Lernziele
- [ ] Ich kann quantitative und qualitative Entscheidungskriterien unterscheiden.
- [ ] Ich kann eine Nutzwertanalyse aufstellen, berechnen und das Ergebnis interpretieren.
- [ ] Ich kann Stärken und Schwächen der Methode nennen und eine Sensitivitätsbetrachtung durchführen.
- [ ] Ich kann Ausschlusskriterien (K.-o.-Kriterien) korrekt einsetzen.

## Worum geht es?
Das günstigste Angebot ist nicht automatisch das beste. Was nützt der billigste Drucker, wenn der Toner teuer ist, der Service eine Woche braucht und das Gerät keine Netzwerkschnittstelle hat? Mit der **Nutzwertanalyse (NWA)** macht man auch nicht in Euro messbare Kriterien vergleichbar – nachvollziehbar und dokumentiert.

---

## 1. Quantitativ und qualitativ
| **quantitative** Kriterien (in Zahlen/€ messbar) | **qualitative** Kriterien (nicht direkt in € messbar) |
|---|---|
| Preis, Betriebskosten, Stromverbrauch, Lieferzeit in Tagen, Garantiedauer | Service und Erreichbarkeit, Zuverlässigkeit des Lieferanten, Bedienbarkeit, Design, Umweltfreundlichkeit, Kompatibilität, Image |

## 2. Ablauf der Nutzwertanalyse
1. **Ausschlusskriterien** (K.-o.) prüfen – Alternativen, die eine Muss-Anforderung nicht erfüllen, fliegen **vorher** raus (z. B. „muss 802.1X unterstützen“).
2. **Bewertungskriterien** festlegen (unabhängig voneinander, keine Doppelbewertung).
3. **Gewichtung** festlegen – Summe **100 %** (bzw. 1,0 oder 100 Punkte).
4. **Bewertungsskala** festlegen (z. B. 1–10 oder 0–5 Punkte) und je Alternative und Kriterium **Punkte** vergeben.
5. **Teilnutzen** = Gewichtung × Punkte.
6. **Gesamtnutzen** = Summe der Teilnutzen → höchster Nutzwert = beste Alternative.
7. Ergebnis **kritisch prüfen** (Sensitivität) und **begründen**.

> [!example] Beispiel: Multifunktionsdrucker
> | Kriterium | Gewicht | A Punkte | A Teilnutzen | B Punkte | B Teilnutzen | C Punkte | C Teilnutzen |
> |---|---|---|---|---|---|---|---|
> | Anschaffungspreis | 25 % | 9 | 2,25 | 6 | 1,50 | 7 | 1,75 |
> | Seitenkosten | 30 % | 4 | 1,20 | 9 | 2,70 | 7 | 2,10 |
> | Druckgeschwindigkeit | 15 % | 6 | 0,90 | 8 | 1,20 | 7 | 1,05 |
> | Service vor Ort | 20 % | 5 | 1,00 | 8 | 1,60 | 6 | 1,20 |
> | Energieverbrauch | 10 % | 7 | 0,70 | 6 | 0,60 | 9 | 0,90 |
> | **Summe** | **100 %** | | **6,05** | | **7,60** | | **7,00** |
>
> **B** hat den höchsten Nutzwert, obwohl A in der Anschaffung am günstigsten ist – die niedrigen Seitenkosten und der Service geben den Ausschlag.

### Punkte aus Zahlen ableiten
Damit die Bewertung nachvollziehbar ist, kann man quantitative Kriterien umrechnen, z. B. beim Preis: **günstigstes Angebot = 10 Punkte**, die anderen anteilig (Punkte = 10 × günstigster Preis / eigener Preis).

---

### Gewichte per Paarvergleich
Wenn sich niemand auf Prozente einigen kann, hilft der **paarweise Vergleich**: Jedes Kriterium wird mit jedem anderen verglichen. Wichtiger = **2**, gleich wichtig = **1**, weniger wichtig = **0**. Die Zeilensumme ergibt das Gewicht.

| ist wichtiger als → | Preis | Leistung | Service | Energie | Summe | Gewicht |
|---|---|---|---|---|---|---|
| **Preis** | – | 1 | 2 | 2 | 5 | 5 ÷ 12 ≈ **42 %** |
| **Leistung** | 1 | – | 2 | 1 | 4 | 4 ÷ 12 ≈ **33 %** |
| **Service** | 0 | 0 | – | 1 | 1 | 1 ÷ 12 ≈ **8 %** |
| **Energie** | 0 | 1 | 1 | – | 2 | 2 ÷ 12 ≈ **17 %** |
| | | | | | **12** | 100 % |

Kontrolle: Bei n Kriterien gibt es n·(n − 1) ÷ 2 Paare, jedes verteilt 2 Punkte → Summe = n·(n − 1) = 4 · 3 = **12**. Steht in einer Zelle 2, muss im gespiegelten Feld 0 stehen (bei 1 ebenfalls 1).


## 3. Stärken und Schwächen
| Stärken | Schwächen |
|---|---|
| auch **qualitative** Kriterien vergleichbar | Gewichtung und Punktvergabe sind **subjektiv** |
| **transparent** und nachvollziehbar dokumentiert | **Scheingenauigkeit**: 7,05 vs. 7,00 ist kein echter Unterschied |
| strukturiert Entscheidungen im Team | Kriterien können sich überschneiden (Doppelbewertung) |
| leicht anpassbar | schlechte Werte in einem Kriterium können durch andere ausgeglichen werden (→ K.-o.-Kriterien vorher prüfen) |

**Sensitivitätsanalyse:** Prüfen, ob sich die Rangfolge ändert, wenn man Gewichte leicht verschiebt. Bleibt der Sieger stabil, ist die Entscheidung robust. Bei knappen Ergebnissen weitere Informationen einholen (Testgerät, Referenzen) und quantitative Analyse (Kosten) ergänzen.

> [!question]- Kurz nachgedacht: Im Beispiel wird die Gewichtung von „Anschaffungspreis“ auf 40 % erhöht und „Seitenkosten“ auf 15 % gesenkt. Gewinnt dann A?
> A: 0,40×9 + 0,15×4 + 0,15×6 + 0,20×5 + 0,10×7 = 3,6 + 0,6 + 0,9 + 1,0 + 0,7 = **6,80**
> B: 0,40×6 + 0,15×9 + 0,15×8 + 0,20×8 + 0,10×6 = 2,4 + 1,35 + 1,2 + 1,6 + 0,6 = **7,15**
> B bleibt vorn → das Ergebnis ist relativ **robust**.

---

## 4. Die Entscheidung begründen
Gute Prüfungsantworten verbinden **quantitativen Vergleich** (Bezugspreis, laufende Kosten, TCO) mit **qualitativem Vergleich** (NWA) und formulieren eine klare Empfehlung mit Begründung am Szenario:

> „Ich empfehle Drucker B. Er ist in der Anschaffung 120 € teurer als A, hat aber mit 0,9 Cent je Seite deutlich niedrigere Folgekosten – bei 3 000 Seiten pro Monat amortisiert sich der Mehrpreis nach wenigen Monaten. Zusätzlich bietet der Händler Vor-Ort-Service am nächsten Werktag, was für die Buchhaltung mit festen Abgabeterminen wichtig ist.“

---

> [!warning] Typische Fehler in Prüfungen
> - Gewichtungen, die nicht 100 % ergeben.
> - Teilnutzen falsch (Gewicht in Prozent statt als Dezimalzahl multiplizieren und dann die Summe nicht normieren).
> - K.-o.-Kriterien in die Gewichtung einbauen statt vorher auszuschließen.
> - Ergebnis nur ablesen, ohne es zu interpretieren oder kritisch zu bewerten.

## Verwandte Themen
- [[W1 Beschaffung und Kalkulation]] – quantitativer Angebotsvergleich
- [[H1 PC-Komponenten und Arbeitsplatzgeräte]] – Hardwareauswahl begründen
- [[S6 Software beschaffen und lizenzieren]] – Software auswählen

## Zusammenfassung
- Quantitativ = messbar in Zahlen/€, qualitativ = Service, Qualität, Bedienbarkeit …
- Ablauf: K.-o.-Kriterien → Kriterien → Gewichtung (Σ 100 %) → Punkte → Teilnutzen → Summe → Interpretation.
- Stärke: macht Qualitatives vergleichbar, transparent · Schwäche: subjektiv, Scheingenauigkeit.
- Sensitivitätsanalyse prüft die Robustheit; Empfehlung immer am Szenario begründen.

## Direkt üben
```dataviewjs
await dv.view("AP1/99 System/views/trainer", { typen: ["nutzwert"] })
```

## Selbstcheck
```dataviewjs
await dv.view("AP1/99 System/views/quiz", { modul: "W2" })
```

**Weitere Aufgaben:** [[Aufgaben Wirtschaft#W2 Nutzwertanalyse und Entscheidungen]] · **Karteikarten:** [[Karten Wirtschaft]]

## Einschätzung
```dataviewjs
await dv.view("AP1/99 System/views/selbstcheck")
```

---
← [[W1 Beschaffung und Kalkulation]] · Weiter: [[W3 Investition und Finanzierung]] →
