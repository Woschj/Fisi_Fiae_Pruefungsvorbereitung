---
modul: S2
titel: Programmierung – Grundlagen
bereich: Software
reihenfolge: 15
dauer: 150
status: neu
sicherheit: 0
zuletzt:
berufsschule: "SuD · LF5 LS5.2 (Verzweigungen, Duisbyte) · LS5.4 (Funktionen)"
tags: [ap1/modul, ap1/software]
---
# S2 · Programmierung – Grundlagen

> [!abstract] Überblick
> **Bereich:** [[Übersicht Software]]
> **Dauer:** ca. 2,5 h · **Prüfungsrelevanz:** ★★★ – die AP1 enthält regelmäßig eine Pseudocode-Aufgabe (ergänzen, korrigieren, nachvollziehen)
> **Voraussetzungen:** [[S1 Zahlensysteme und Codierung]] · **Danach:** [[S3 Algorithmen, Darstellung und Testen]]
> **Berufsschule:** SuD LF5 – Python (Verzweigungen im Tarifrechner, Funktionen im Passwort-Validator)

## Lernziele
- [ ] Ich kann Variablen, Datentypen und Operatoren korrekt verwenden und den passenden Datentyp begründen.
- [ ] Ich kann Sequenz, Verzweigung (auch mehrstufig) und die drei Schleifenarten in Pseudocode und Python schreiben.
- [ ] Ich kann Arrays/Listen durchlaufen und dabei zählen, summieren und Extremwerte finden.
- [ ] Ich kann Funktionen mit Parametern und Rückgabewert definieren und aufrufen.
- [ ] Ich kann Pseudocode einer Prüfungsaufgabe lesen und ergänzen.

## Worum geht es?
In der AP1 sollst du nicht in einer bestimmten Sprache programmieren, sondern **Programmlogik** beherrschen: Eine Rabattberechnung ergänzen, eine Schleife korrigieren, einen Algorithmus Schritt für Schritt nachvollziehen. Die Notation ist **Pseudocode** – eine an Programmiersprachen angelehnte, aber sprachunabhängige Schreibweise. In der Berufsschule setzt du dieselbe Logik in Python um.

---

## 1. Die fünf Grundkonzepte
**Anweisung → Sequenz → Verzweigung → Wiederholung → Funktion.** Jedes Programm, egal wie groß, besteht aus diesen Bausteinen.

## 2. Variablen und Datentypen
Eine **Variable** ist ein benannter Speicherplatz für einen Wert. Der **Datentyp** legt fest, welche Werte und Operationen erlaubt sind.

| Datentyp | Beispielwerte | Pseudocode | Python |
|---|---|---|---|
| Ganzzahl (Integer) | 42, −7 | `anzahl : Ganzzahl` | `int` |
| Gleitkommazahl | 3,14; 0,19 | `preis : Dezimal` | `float` |
| Wahrheitswert | wahr/falsch | `bezahlt : Boolean` | `bool` (`True`/`False`) |
| Zeichen | 'A' | `Zeichen` | (String der Länge 1) |
| Zeichenkette | "Hallo" | `Text/String` | `str` |
| Feld/Liste | [3, 8, 1] | `Array` | `list` |

> [!example] Datentyp begründen (typische Prüfungsfrage)
> - **Postleitzahl** → **String**, weil führende Nullen erhalten bleiben müssen (`01067`) und nicht gerechnet wird.
> - **Telefonnummer** → String (führende 0, `+`, Leerzeichen).
> - **Preis** → Dezimal/Festkomma bzw. in **Cent als Ganzzahl**, weil Gleitkommazahlen Rundungsfehler haben (0,1 + 0,2 = 0,30000000000000004).
> - **Lagerbestand** → Ganzzahl · **„Kunde aktiv?“** → Boolean.

### Operatoren
| Art | Pseudocode | Python | Beispiel |
|---|---|---|---|
| Zuweisung | `x ← 5` | `x = 5` | |
| Rechnen | `+ − * /` | `+ - * /` | `7 / 2` = 3,5 |
| Ganzzahldivision | `DIV` | `//` | `7 DIV 2` = 3 |
| Rest (Modulo) | `MOD` | `%` | `7 MOD 2` = 1 → „ist ungerade“ |
| Vergleich | `= ≠ < > ≤ ≥` | `== != < > <= >=` | |
| Logik | `UND ODER NICHT` | `and or not` | |

> [!warning] `=` ist nicht gleich `=`
> Im Pseudocode ist `←` die **Zuweisung** und `=` der **Vergleich**. In Python ist `=` die Zuweisung und `==` der Vergleich. Verwechslungen sind ein Klassiker.

**Modulo-Tricks:** gerade Zahl → `x MOD 2 = 0` · letzte Ziffer → `x MOD 10` · Schaltjahr-Prüfung mit `MOD 4`, `MOD 100`, `MOD 400`.

---

## 3. Verzweigung

**Pseudocode (IHK-Stil)**
```text
WENN alter < 14 DANN
    preis ← 2.50
SONST WENN alter ≤ 17 DANN
    preis ← 3.50
SONST
    preis ← 5.00
ENDE WENN
```
**Python (Berufsschule)**
```python
if alter < 14:
    preis = 2.50
elif alter <= 17:
    preis = 3.50
else:
    preis = 5.00
```

- Die Bedingungen werden **von oben nach unten** geprüft; die **erste zutreffende** gewinnt. Deshalb spezifische Fälle zuerst bzw. Grenzen lückenlos formulieren.
- **Fallauswahl** (mehrere feste Werte): `FALLS status GLEICH "A": … "B": … SONST: …` (Python: `match`/`case` oder `if`-Kette).
- Bedingungen kombinieren: `WENN alter ≥ 18 UND mitglied = wahr DANN …`

> [!question]- Kurz nachgedacht: Was ist an dieser Reihenfolge falsch? `WENN wert ≥ 100 … SONST WENN wert ≥ 500 …`
> Der zweite Zweig wird **nie** erreicht: Jeder Wert ≥ 500 ist auch ≥ 100 und landet im ersten Zweig. Größere Grenze zuerst prüfen oder mit Bereichen arbeiten (`≥ 100 UND < 500`).

---

## 4. Schleifen (Wiederholung)

| Art | Wann? | Pseudocode | Python |
|---|---|---|---|
| **Zählschleife** | Anzahl bekannt | `FÜR i ← 0 BIS 9 … ENDE FÜR` | `for i in range(10):` |
| **Für-jedes** | alle Elemente einer Liste | `FÜR JEDES x IN liste … ENDE FÜR` | `for x in liste:` |
| **kopfgesteuert** | Bedingung **vor** dem Durchlauf, evtl. 0 Durchläufe | `SOLANGE bedingung … ENDE SOLANGE` | `while bedingung:` |
| **fußgesteuert** | Bedingung **nach** dem Durchlauf, **mind. 1 Durchlauf** | `WIEDERHOLE … BIS bedingung` | (in Python: `while True:` + `break`) |

> [!info] Achtung bei `BIS`
> Bei `WIEDERHOLE … BIS bedingung` läuft die Schleife, **bis** die Bedingung wahr wird (Abbruchbedingung). Bei `SOLANGE` läuft sie, **solange** die Bedingung wahr ist (Laufbedingung).

> [!example] Eingabe prüfen – fußgesteuert
> ```text
> WIEDERHOLE
>     menge ← eingabe("Menge (1–99): ")
> BIS menge ≥ 1 UND menge ≤ 99
> ```
> Mindestens eine Eingabe ist immer nötig → fußgesteuerte Schleife passt.

**Zählschleife und Indizes:** Listen beginnen fast immer bei **Index 0**. Eine Liste mit n Elementen hat die Indizes **0 bis n − 1**. `FÜR i ← 0 BIS länge(liste) − 1` bzw. `for i in range(len(liste))`.

---

## 5. Arrays/Listen – die Standardmuster

**Pseudocode (IHK-Stil)**
```text
// Summe und Durchschnitt
summe ← 0
FÜR JEDES wert IN werte
    summe ← summe + wert
ENDE FÜR
WENN länge(werte) > 0 DANN
    schnitt ← summe / länge(werte)
ENDE WENN

// Maximum
max ← werte[0]
FÜR i ← 1 BIS länge(werte) − 1
    WENN werte[i] > max DANN
        max ← werte[i]
    ENDE WENN
ENDE FÜR

// Zählen mit Bedingung
anzahl ← 0
FÜR JEDES wert IN werte
    WENN wert < 0 DANN
        anzahl ← anzahl + 1
    ENDE WENN
ENDE FÜR
```
**Python (Berufsschule)**
```python
# Summe und Durchschnitt
summe = 0
for wert in werte:
    summe = summe + wert
if len(werte) > 0:
    schnitt = summe / len(werte)

# Maximum
maximum = werte[0]
for i in range(1, len(werte)):
    if werte[i] > maximum:
        maximum = werte[i]

# Zählen mit Bedingung
anzahl = 0
for wert in werte:
    if wert < 0:
        anzahl = anzahl + 1
```

> [!tip] Die drei Fragen vor jeder Schleife
> 1. **Initialisierung:** Mit welchem Wert starte ich? (Summe 0, Produkt **1**, Maximum = **erstes Element**, nicht 0!)
> 2. **Durchlauf:** Welche Elemente/Indizes? Grenzen prüfen (`− 1`).
> 3. **Aktualisierung:** Was ändert sich in jedem Durchlauf – und endet die Schleife sicher?

**Zweidimensionale Arrays** (Tabellen): `umsatz[zeile][spalte]`, durchlaufen mit zwei verschachtelten Schleifen.

---

## 6. Funktionen
Eine **Funktion** fasst Anweisungen unter einem Namen zusammen, bekommt **Parameter** und liefert einen **Rückgabewert**. Vorteile: Wiederverwendung, Übersicht, einzeln testbar (**Dekomposition**: großes Problem in kleine Funktionen zerlegen).

**Pseudocode (IHK-Stil)**
```text
FUNKTION brutto(netto : Dezimal) : Dezimal
    RÜCKGABE netto * 1.19
ENDE FUNKTION

FUNKTION hatZiffer(pw : Text) : Boolean
    FÜR JEDES z IN pw
        WENN istZiffer(z) DANN
            RÜCKGABE wahr
        ENDE WENN
    ENDE FÜR
    RÜCKGABE falsch
ENDE FUNKTION

ergebnis ← brutto(100)   // 119
```
**Python (Berufsschule)**
```python
def brutto(netto: float) -> float:
    return netto * 1.19

def hat_ziffer(pw: str) -> bool:
    for z in pw:
        if z.isdigit():
            return True    # Early Return
    return False

ergebnis = brutto(100)   # 119.0
```

- **Parameter** (in der Definition) vs. **Argument** (beim Aufruf übergebener Wert)
- **lokale Variablen** existieren nur innerhalb der Funktion
- **Early Return:** Sobald das Ergebnis feststeht, sofort zurückgeben – spart Durchläufe und macht den Code klarer
- **Prozedur** = Funktion ohne Rückgabewert

---

## 7. Objektorientierung (Grundbegriffe)
Für die AP1 genügen die Begriffe:
- **Klasse** = Bauplan (z. B. `Kunde` mit Attributen `name`, `kundennr` und Methode `rabattBerechnen()`)
- **Objekt** = konkrete Instanz (`kunde1 = Kunde("Meier", 4711)`)
- **Attribut** = Eigenschaft · **Methode** = Funktion einer Klasse
- **Kapselung** (Attribute privat, Zugriff über Methoden)
- Darstellung im **UML-Klassendiagramm** (Name, Attribute, Methoden; `+` public, `−` private)

---

> [!warning] Typische Fehler in Prüfungen
> - Variable nicht initialisiert (Summe ohne `← 0`).
> - Maximum mit 0 initialisiert (falsch bei nur negativen Werten).
> - Schleifengrenze `BIS länge(liste)` statt `länge(liste) − 1` (Off-by-one).
> - Endlosschleife, weil die Laufvariable in `SOLANGE` nie verändert wird.
> - Division durch 0 bei leerer Liste.
> - `SOLANGE` und `BIS`-Bedingung verwechselt (Lauf- vs. Abbruchbedingung).

## Verwandte Themen
- [[S3 Algorithmen, Darstellung und Testen]] – Algorithmen darstellen und testen
- [[S8 UML und Softwareentwurf]] – Objektorientierung im Klassendiagramm
- [[S7 Datenbanken]] – Datentypen in Tabellen

## Zusammenfassung
- Variablen haben einen Datentyp; PLZ/Telefon als String, Geld nicht als float.
- `←` Zuweisung, `=` Vergleich; DIV und MOD für Ganzzahlen.
- Verzweigung: erste zutreffende Bedingung gewinnt → Reihenfolge beachten.
- Schleifen: Zähl-, kopf- (0+ Durchläufe) und fußgesteuert (1+ Durchläufe).
- Standardmuster Summe/Durchschnitt/Max/Zählen: Initialisierung, Grenzen, Aktualisierung.
- Funktionen mit Parametern und Rückgabe, Early Return; OOP: Klasse, Objekt, Attribut, Methode.

## Direkt üben
```dataviewjs
await dv.view("AP1/99 System/views/trainer", { typen: ["trace"] })
```

## Selbstcheck
```dataviewjs
await dv.view("AP1/99 System/views/quiz", { modul: "S2" })
```

**Weitere Aufgaben:** [[Aufgaben Software#S2 Programmierung – Grundlagen]] · **Karteikarten:** [[Karten Software]]

## Einschätzung
```dataviewjs
await dv.view("AP1/99 System/views/selbstcheck")
```

---
← [[S1 Zahlensysteme und Codierung]] · Weiter: [[S3 Algorithmen, Darstellung und Testen]] →
