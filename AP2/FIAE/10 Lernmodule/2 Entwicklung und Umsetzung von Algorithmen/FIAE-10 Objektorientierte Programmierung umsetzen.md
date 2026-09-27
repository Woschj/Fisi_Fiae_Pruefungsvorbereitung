---
modul: FIAE-10
titel: Objektorientierte Programmierung umsetzen
bereich: Algorithmen
pruefungsteil: "AP2 Teil 2 – Entwicklung und Umsetzung von Algorithmen"
reihenfolge: 10
dauer: 150
status: neu
sicherheit: 0
zuletzt:
tags: [ap2/modul, ap2/fiae]
---
# FIAE-10 · Objektorientierte Programmierung umsetzen

> [!abstract] Überblick
> **Bereich:** [[Übersicht FIAE Algorithmen]]
> **Prüfung:** „Entwicklung und Umsetzung von Algorithmen“ (teilweise „Planen eines Softwareproduktes“)
> **Dauer:** ca. 150 min · **Prüfungsrelevanz:** ★★★ – Methoden einer Klasse implementieren, Objekte erzeugen und verarbeiten, Service-Methoden mit Listen, Observer im Code, Polymorphie
> **Grundlagen aus AP1:** [[S2 Programmierung – Grundlagen]] · [[S1 Zahlensysteme und Codierung]]

## Lernziele
- [ ] Ich kann aus einem Klassendiagramm Klassen mit Attributen, Konstruktor, Gettern/Settern und Methoden in Pseudocode umsetzen.
- [ ] Ich kann mit Listen/Collections von Objekten arbeiten (hinzufügen, durchlaufen, suchen, entfernen).
- [ ] Ich kann Vererbung, abstrakte Methoden, Interfaces und Polymorphie im Code anwenden.
- [ ] Ich kann Ausnahmen (Exceptions) werfen und behandeln.
- [ ] Ich wähle passende Datentypen und kenne ihre Wertebereiche.

## So wird das geprüft
> [!info] Typische AP2-Aufgabentypen
> - **Methoden einer Klasse ausprogrammieren:** Einladung an alle Aktionäre verschicken und merken, prüfen ob jemand angemeldet ist, anmelden mit Code-Erzeugung.
> - **Methode, die für jedes Element ein neues Objekt erzeugt** und eine Liste zurückgibt, darauf aufbauend eine Auswertung.
> - **Service-Methode:** Abfahrten von einem Service holen, filtern, in Array mit Höchstzahl sammeln.
> - **Polymorphie/dynamische Bindung** erklären: der Container ruft `heuteAusfuehrbar()` auf, welche Implementierung läuft, entscheidet sich zur Laufzeit.
> - **Observer implementieren**, Klasse mit Attributen und Methoden.

---

## 1. Von der Klasse zum Code

```
klasse Versammlung
    - eingeladene : List<Aktionaer>
    - angemeldete : List<Teilnehmer>

    + einladen(aktionaere : List<Aktionaer>) : void
        für jeden a in aktionaere
            sendeEinladungsmail(a.getEmailAdresse())
            eingeladene.add(a)
        ende für
    ende methode

    - istAngemeldet(a : Aktionaer) : Boolean
        für jeden t in angemeldete
            wenn t.getAktionaer().equals(a) dann
                rückgabe true
            ende wenn
        ende für
        rückgabe false
    ende methode

    + anmelden(a : Aktionaer) : void
        wenn nicht istAngemeldet(a) dann
            code = erstelleCode()
            angemeldete.add(new Teilnehmer(a, code))
        ende wenn
    ende methode
ende klasse
```

**Bausteine:**
- **Konstruktor** initialisiert die Attribute (`new Teilnehmer(a, code)`), Listen werden im Konstruktor oder bei der Deklaration mit `new List<…>()` angelegt.
- **Getter/Setter** kapseln den Zugriff; Setter können Werte prüfen (`wenn prozent < 0 dann Exception`).
- **`this`** verweist auf das aktuelle Objekt (`this.fahrplanService.getAbfahrten(id)`).
- **Statische** Elemente gehören zur Klasse, nicht zum Objekt (Zähler für IDs, Hilfsmethoden, Singleton).
- **Objekte vergleichen** mit `equals` (Inhalt) statt `==` (Referenz).

### Collections
| Struktur | Eigenschaft | typische Operationen |
|---|---|---|
| **Array** | feste Länge, schneller Indexzugriff | `a[i]`, `a.length` |
| **Liste** (ArrayList/List) | dynamisch, geordnet, Duplikate erlaubt | `add`, `get(i)`, `size()`, `remove`, `contains` |
| **Map/Dictionary** | Schlüssel → Wert, schnelle Suche per Schlüssel | `put(k, v)`, `get(k)`, `containsKey` |
| **Set** | keine Duplikate | `add`, `contains` |
| **Queue / Stack** | FIFO / LIFO | `enqueue/dequeue`, `push/pop` |

---

## 2. Vererbung und Polymorphie im Code

```
abstrakte klasse Aufgabe
    # beschreibung : String
    # mitarbeiter : Integer
    + aufgabeBeschreiben() : String
        rückgabe beschreibung + " (" + mitarbeiter + " Personen)"
    + abstrakt heuteAusfuehrbar() : Boolean
ende klasse

klasse AufgabeFixTermin erbt von Aufgabe
    - termin : Date
    + heuteAusfuehrbar() : Boolean
        rückgabe termin == Date.heute()
ende klasse

klasse AufgabenContainer
    - aufgaben : List<Aufgabe>
    + aufgabenHeute() : List<Aufgabe>
        ergebnis = new List<Aufgabe>()
        für jede a in aufgaben
            wenn a.heuteAusfuehrbar() dann ergebnis.add(a)    // dynamische Bindung
        ende für
        rückgabe ergebnis
ende klasse
```

**Polymorphie (dynamische Bindung):** Die Liste ist vom Typ `Aufgabe`, enthält aber Objekte der Unterklassen. Beim Aufruf von `heuteAusfuehrbar()` wird **zur Laufzeit** anhand des tatsächlichen Objekttyps die passende überschriebene Methode ausgeführt. Neue Aufgabenarten brauchen nur eine neue Unterklasse – der Container bleibt unverändert.
**Überschreiben** (Override: gleiche Signatur in der Unterklasse) ≠ **Überladen** (Overload: gleicher Name, andere Parameter in derselben Klasse).

**Interface implementieren** (Observer): Die Klasse sichert zu, alle Methoden des Interfaces bereitzustellen (`update(wert)`), und kann dadurch überall eingesetzt werden, wo ein `Observer` erwartet wird.

---

## 3. Ausnahmebehandlung

```
methode kleinsterWert(werte : Integer[]) : Integer
    wenn werte == null oder werte.length == 0 dann
        wirf new Exception("Array nicht auswertbar.")
    ende wenn
    min = werte[0]
    für i = 1 bis werte.length − 1
        wenn werte[i] < min dann min = werte[i]
    ende für
    rückgabe min
ende methode
```
- `throw`/„wirf“ meldet einen Fehler an den Aufrufer, `try … catch` fängt ihn ab, `finally` räumt immer auf (Datei/Verbindung schließen).
- **Checked** Exceptions müssen behandelt werden (Java), unchecked (NullPointer, IndexOutOfBounds) zeigen meist Programmierfehler.
- Nicht jede Ausnahme verschlucken: sinnvoll reagieren (Meldung, Standardwert, Protokoll).

---

## 4. Datentypen

| Typ | Größe | Wertebereich / Beispiel |
|---|---|---|
| `boolean` | – | true/false |
| `byte` | 8 Bit | −128 … 127 (Java) bzw. 0 … 255 (C#) |
| `short` | 16 Bit | −32 768 … 32 767 |
| `int` | 32 Bit | −2 147 483 648 … 2 147 483 647 |
| `long` | 64 Bit | ca. ±9,2 × 10¹⁸ |
| `float` / `double` | 32 / 64 Bit | Gleitkomma (≈ 7 / 15 Stellen genau) – **für Geld `decimal`** |
| `char` / `String` | – | Zeichen / Zeichenkette (Unicode) |
| `Date`/`DateTime` | – | Zeitpunkte, Vergleich über Methoden |

**Typumwandlung (Cast):** `(double) summe / anzahl` für Kommaergebnis; von `double` zu `int` wird abgeschnitten. **Zweierkomplement:** negative Ganzzahlen (Bits invertieren + 1) – siehe [[S1 Zahlensysteme und Codierung]].

---

> [!warning] Typische Fehler in Prüfungen
> - Liste nie initialisiert (`null`) und dann `add` aufgerufen.
> - Gefundenes Objekt nicht zurückgeben oder nach dem Fund weitersuchen und überschreiben.
> - `==` für Strings/Objekte statt `equals`.
> - In der Unterklasse die abstrakte Methode nicht implementieren.
> - Polymorphie als „mehrere Konstruktoren“ erklären (das ist Überladen).

## Verwandte Themen
- [[FIAE-4 Objektorientierter Entwurf und Entwurfsmuster]] – Klassendiagramm, Muster
- [[FIAE-9 Algorithmen in Pseudocode]] – Schleifenmuster
- [[FIAE-11 Testen und Qualitätssicherung]] – Klassen testen
- [[S2 Programmierung – Grundlagen]] – Grundlagen aus AP1

## Zusammenfassung
- Klasse → Attribute (private), Konstruktor, Getter/Setter, Methoden; Listen initialisieren.
- Collections: Array (fest), Liste (dynamisch), Map (Schlüssel), Set (eindeutig), Queue/Stack.
- Vererbung + abstrakte Methode + Überschreiben → Polymorphie mit dynamischer Bindung zur Laufzeit.
- Exceptions werfen bei ungültiger Eingabe, mit try/catch behandeln.
- Datentypen und Wertebereiche kennen; für Geld decimal, für Kommaergebnis casten.

## Direkt üben
```dataviewjs
await dv.view("AP2/99 System/views/trainer", { typen: ["datentyp-bereich", "zahlensysteme", "zweierkomplement"] })
```

## Selbstcheck
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { modul: "FIAE-10" })
```

**Weitere Aufgaben:** [[Aufgaben Algorithmen#FIAE-10 Objektorientierte Programmierung umsetzen]] · **Karteikarten:** [[Karten Algorithmen]]

## Einschätzung
```dataviewjs
await dv.view("AP2/99 System/views/selbstcheck")
```

---
← [[FIAE-9 Algorithmen in Pseudocode]] · Weiter: [[FIAE-11 Testen und Qualitätssicherung]] →
