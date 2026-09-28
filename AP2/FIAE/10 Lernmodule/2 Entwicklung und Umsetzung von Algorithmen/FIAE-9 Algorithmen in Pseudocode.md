---
modul: FIAE-9
titel: Algorithmen in Pseudocode
bereich: Algorithmen
pruefungsteil: "AP2 Teil 2 – Entwicklung und Umsetzung von Algorithmen"
reihenfolge: 9
dauer: 180
status: neu
sicherheit: 0
zuletzt:
tags: [ap2/modul, ap2/fiae]
---
# FIAE-9 · Algorithmen in Pseudocode

> [!abstract] Überblick
> **Bereich:** [[Übersicht FIAE Algorithmen]]
> **Prüfung:** „Entwicklung und Umsetzung von Algorithmen“ (90 min) – Aufgabe 1 ist praktisch immer „Entwickeln Sie eine Methode in Pseudocode“ mit **25–30 Punkten**
> **Dauer:** ca. 180 min · **Prüfungsrelevanz:** ★★★ – in jedem Termin: Liste von Objekten durchlaufen, filtern, zählen, Durchschnitt/Minimum/Maximum, Ergebnisliste zurückgeben
> **Grundlagen aus AP1:** [[S2 Programmierung – Grundlagen]] · [[S3 Algorithmen, Darstellung und Testen]]

## Lernziele
- [ ] Ich schreibe Methoden in Pseudocode mit Signatur, Variablen, Schleifen, Verzweigungen und Rückgabe.
- [ ] Ich durchlaufe Arrays und Listen von Objekten und greife über Getter auf Attribute zu.
- [ ] Ich beherrsche die Standardmuster: zählen, summieren, Durchschnitt, Minimum/Maximum mit Index, filtern, Häufigkeiten je Kategorie, verschachtelte Schleifen.
- [ ] Ich kann Sortieren (Bubblesort mit Vergleichsfunktion) und Suchen (linear, binär) umsetzen und die Laufzeit einschätzen.
- [ ] Ich rechne mit Ganzzahldivision und Modulo und kann einen Schreibtischtest durchführen.

## So wird das geprüft
> [!info] Typische AP2-Aufgabentypen
> - **Methode entwickeln**, die eine Liste von Objekten durchläuft und etwas **zählt oder filtert**: Werte über einer Grenze zählen, **Häufigkeiten je Kategorie** in einem Array zählen, **freie Ressourcen** nach Kapazität und bestehenden Buchungen filtern und die **bestpassende** finden, **Tage im Zeitraum** zählen, Objekte erzeugen und **Durchschnitt im Zeitraum** berechnen.
> - **Sortieren mit Vergleichsfunktion**.
> - **Nächste Termine** mit Datumsvergleich und Höchstanzahl sammeln.
> - **Fehler in einem Algorithmus** finden.

---

## 1. Pseudocode-Konventionen

Die IHK gibt keine feste Syntax vor – es muss **eindeutig, vollständig und nachvollziehbar** sein. Ein bewährter Stil:

```
methode zaehleTreffer(werte : Integer[], grenze : Integer) : Integer
    anzahl : Integer = 0
    für i = 0 bis werte.length − 1
        wenn werte[i] > grenze dann
            anzahl = anzahl + 1
        ende wenn
    ende für
    rückgabe anzahl
ende methode
```

- **Signatur** mit Parametern und Rückgabetyp aus der Aufgabenstellung **exakt übernehmen**.
- Variablen **vor** der Schleife initialisieren (Zähler 0, Summe 0, Liste `new List<Typ>()`).
- Zugriff auf Objekte über die **vorgegebenen Getter** (`kurs.getProzVAktie()`), Listen mit `size()`/`get(i)`/`add(x)`, Arrays mit `length` und `[i]`.
- Datums- und Zeitvergleiche mit der vorgegebenen Methode (`jetzt.compare(zeit) >= 0`) – nicht mit `<` auf Objekten.
- **Einrückung** zeigt die Blockstruktur; jedes `wenn`/`für` wird geschlossen.

---

## 2. Standardmuster

| Muster | Kern |
|---|---|
| **Zählen mit Bedingung** | `wenn bedingung dann anzahl++` |
| **Summe / Durchschnitt** | summieren **und** mitzählen; am Ende `summe / anzahl` – vorher prüfen, ob `anzahl > 0`; **keine Ganzzahldivision**, wenn ein Kommawert gebraucht wird |
| **Maximum / Minimum** | Startwert = **erstes Element** (oder kleinstmöglicher Wert), dann vergleichen; bei Bedarf **Index** mitspeichern |
| **Filtern** | neue Ergebnisliste, passende Elemente `add` |
| **Häufigkeit je Kategorie** | Zählarray mit einem Feld je Kategorie: `zaehler[nr − 1]++` |
| **Paarweise Vergleiche** | Schleife ab `i = 1`, Vergleich mit Element `i − 1` (Differenzen, Anstieg gegenüber dem Vorgänger) |
| **Verschachtelte Suche** | äußere Schleife über Kandidaten, innere prüft Konflikte (Flag `frei = true`, bei Treffer `false`, Schleife mit `und frei` vorzeitig beenden) |
| **Bestes Element** | wie Maximum, aber mit selbst definierter Güte (kleinste Differenz zur gewünschten Größe) |
| **Begrenzte Ergebnismenge** | Schleifenbedingung `i < n und zaehler < max` |

> [!example] Häufigkeit je Kategorie
> ```
> // Messungen sind nach Zeit sortiert; gezählt wird je Messstation (1..15),
> // wie oft der Wert gegenüber der vorherigen Messung desselben Tages um mehr als 2 Grad steigt.
> methode zaehleSpruenge(messungen : Messung[]) : Integer[]
>     spruenge : Integer[] = new Integer[15]           // Stationen 1..15 → Index 0..14
>     für i = 1 bis messungen.length − 1
>         wenn messungen[i].getDatum() == messungen[i − 1].getDatum() dann
>             anstieg = messungen[i].getWert() − messungen[i − 1].getWert()
>             wenn anstieg > 2 dann
>                 spruenge[messungen[i].getStationNr() − 1]++
>             ende wenn
>         ende wenn
>     ende für
>     rückgabe spruenge
> ende methode
> ```

> [!example] Filtern mit innerer Prüfung
> ```
> // Besprechungsräume: passend, wenn genug Plätze da sind, der Raum aber mindestens zur Hälfte genutzt wird
> methode freieRaeume(raeume : List<Raum>, buchungen : List<Buchung>, datum : Date, personen : Integer) : List<Raum>
>     ergebnis = new List<Raum>()
>     für jeden r in raeume
>         wenn personen <= r.getPlaetze() und personen >= r.getPlaetze() / 2.0 dann   // keine Ganzzahldivision!
>             frei = true
>             für j = 0 bis buchungen.size() − 1, solange frei
>                 wenn buchungen.get(j).getRaumNr() == r.getRaumNr() und buchungen.get(j).getDatum() == datum dann
>                     frei = false
>                 ende wenn
>             ende für
>             wenn frei dann ergebnis.add(r)
>         ende wenn
>     ende für
>     rückgabe ergebnis
> ende methode
> ```

**Durchschnitt im Zeitraum:** nur Werte berücksichtigen, deren Datum zwischen `start` und `ende` liegt (Grenzen inklusive? – Aufgabenstellung genau lesen), Summe und Anzahl mitführen, Division erst am Ende.

---

## 3. Sortieren und Suchen

**Bubblesort** mit Vergleichsfunktion (die Funktion liefert > 0, wenn a hinter b gehört):
```
methode sortiere(liste : Messung[], vergleiche : Function)
    für i = 0 bis liste.length − 2
        für j = 0 bis liste.length − 2 − i
            wenn vergleiche(liste[j], liste[j + 1]) > 0 dann
                tmp = liste[j] ; liste[j] = liste[j + 1] ; liste[j + 1] = tmp
            ende wenn
        ende für
    ende für
ende methode
```

| Verfahren | Idee | Laufzeit |
|---|---|---|
| **Bubblesort** | benachbarte Elemente tauschen, große „blubbern“ nach hinten | O(n²) |
| **Selectionsort** | kleinstes Element suchen und nach vorn tauschen | O(n²) |
| **Insertionsort** | Element in den sortierten Teil einfügen | O(n²), fast sortiert O(n) |
| Quicksort / Mergesort | teile und herrsche | O(n log n) |
| **lineare Suche** | Element für Element | O(n) |
| **binäre Suche** | nur in **sortierten** Daten: Mitte prüfen, Hälfte verwerfen | O(log n) |

**Rekursion:** Methode ruft sich selbst mit einem kleineren Problem auf und braucht eine **Abbruchbedingung** (Fakultät, Baum durchlaufen). Ohne Abbruch → Stack Overflow.

---

## 4. Schreibtischtest

Trace-Tabelle: **Spalte je Variable**, **Zeile je Schleifendurchlauf**, Werte **am Ende** des Durchlaufs eintragen. So findest du auch Fehler wie falsche Startwerte, falsche Grenzen oder vertauschte Variablen.

> [!example] Fehler finden
> Eine Passwortprüfung verlangt mindestens 10 Zeichen und eine Ziffer. Typische eingebaute Fehler: `länge > 10` statt `>= 10`, Schleife `i <= länge` statt `< länge`, im Nein-Zweig wird ein bereits gefundenes Ergebnis wieder auf `false` gesetzt, **Rückgabe fehlt**.

### Ganzzahldivision und Modulo
- `17 / 5` = **3** bei ganzen Zahlen, `17 % 5` = **2**.
- Letzte Ziffer: `n % 10`; Stelle k von rechts: `(n / 10^k) % 10`.
- Gerade: `n % 2 == 0`; zyklischer Index: `(i + 1) % n`.
- **Achtung** bei Durchschnitt und Hälften: `max / 2` ist bei Ganzzahlen abgeschnitten → `max / 2.0`.

### Datentypen und Grenzen
Überläufe beachten (Summe vieler `int`), Gleitkomma nicht auf Gleichheit prüfen, `null` und leere Listen abfangen (→ [[FIAE-11 Testen und Qualitätssicherung]]).

---

> [!warning] Typische Fehler in Prüfungen
> - Signatur verändern (andere Parameter, anderer Rückgabetyp) oder die **Rückgabe vergessen**.
> - Zähler/Summe **innerhalb** der Schleife initialisieren.
> - Index-Verschiebung vergessen (Station 1 steht in Feld 0).
> - Ganzzahldivision bei Durchschnitt oder „Hälfte“.
> - Objekte mit `==` vergleichen statt über Getter bzw. `equals`/`compare`.
> - Beim „besten Raum“ den Betrag der Differenz oder den Fall „leere Liste“ vergessen.

## Verwandte Themen
- [[FIAE-10 Objektorientierte Programmierung umsetzen]] – Klassen, Listen, Getter
- [[FIAE-11 Testen und Qualitätssicherung]] – Testfälle für die Methode
- [[FIAE-3 UML Aktivität, Sequenz und Zustand]] – Ablauf grafisch darstellen
- [[S3 Algorithmen, Darstellung und Testen]] – Grundlagen aus AP1

## Zusammenfassung
- Signatur übernehmen, Variablen vor der Schleife initialisieren, Getter nutzen, Rückgabe nicht vergessen.
- Muster: zählen, summieren/Durchschnitt (anzahl > 0, keine Ganzzahldivision), Max/Min mit Index, filtern in neue Liste, Zählarray `[nr − 1]++`, Vergleich mit Vorgänger ab i = 1, verschachtelte Suche mit Flag.
- Bubblesort O(n²), binäre Suche O(log n) nur sortiert, Rekursion braucht Abbruch.
- Schreibtischtest mit Trace-Tabelle; `/` und `%` sicher beherrschen.

## Direkt üben
```dataviewjs
await dv.view("AP2/99 System/views/trainer", { typen: ["trace", "ganzzahl-modulo"] })
```

## Selbstcheck
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { modul: "FIAE-9" })
```

**Weitere Aufgaben:** [[Aufgaben Algorithmen#FIAE-9 Algorithmen in Pseudocode]] · **Karteikarten:** [[Karten Algorithmen]]

## Einschätzung
```dataviewjs
await dv.view("AP2/99 System/views/selbstcheck")
```

---
← [[Übersicht FIAE Algorithmen]] · Weiter: [[FIAE-10 Objektorientierte Programmierung umsetzen]] →
