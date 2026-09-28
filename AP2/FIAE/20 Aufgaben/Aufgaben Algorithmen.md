---
bereich: Algorithmen
tags: [ap2/aufgaben, ap2/fiae]
---
# Aufgaben Algorithmen

Aufgaben im Stil der AP2 „Entwicklung und Umsetzung von Algorithmen“ mit Punkten und Musterlösung – eigene Aufgaben, die sich an den Aufgabentypen der AP2-Aufgaben orientieren. Schwierigkeit: ★ Einstieg · ★★ Prüfungsniveau · ★★★ anspruchsvoll.
**Arbeitsweise:** Zeit stoppen (≈ 0,9 Minuten pro Punkt), Pseudocode und SQL **handschriftlich** schreiben, dann Lösung aufklappen und selbst bewerten. Andere, gleichwertige Lösungen sind ebenfalls richtig. Fehler → [[AP2 FIAE Fehlerlog]].
Rechen- und Übungsaufgaben (SQL-Ergebnisse, Modulo, Datentypen): [[AP2 FIAE Trainer]] · Probeprüfungen: [[AP2/FIAE/20 Aufgaben/Pruefungen/Uebersicht FIAE AP2|Probeprüfungen]].

> [!info] Ausgangssituation für alle Aufgaben
> Die **FlexiRad GmbH** (fiktiv) betreibt in Köln 2 000 Leihfahrräder an 80 Stationen. Sie entwickeln Teile des Backends.
> Gegebene Klasse für alle Pseudocode-Aufgaben:
> ```
> Ausleihe
>   - radId : Integer
>   - kundenId : Integer
>   - start : Date
>   - minuten : Integer
>   - zielStationNr : Integer      // 1 bis 80
>   + getRadId() : Integer
>   + getKundenId() : Integer
>   + getStart() : Date
>   + getMinuten() : Integer
>   + getZielStationNr() : Integer
> ```
> `Date` hat die Methode `compare(d : Date) : Integer` (< 0: früher, 0: gleich, > 0: später als d).

---

## FIAE-9 Algorithmen in Pseudocode

### A9.1 ★★★ – Durchschnitt im Zeitraum (10 Punkte)
📘 **Nachlernen:** [[FIAE-9 Algorithmen in Pseudocode#2. Standardmuster|FIAE-9 › Standardmuster]] · [[FIAE-9 Algorithmen in Pseudocode#1. Pseudocode-Konventionen|FIAE-9 › Pseudocode-Konventionen]]

Schreiben Sie die Methode `durchschnittDauer(ausleihen : List<Ausleihe>, von : Date, bis : Date) : Double`. Sie liefert die durchschnittliche Ausleihdauer aller Ausleihen, deren Start im Zeitraum von `von` bis `bis` (jeweils einschließlich) liegt. Gibt es keine, wird 0 zurückgegeben.

> [!success]- Lösung
> ```
> methode durchschnittDauer(ausleihen : List<Ausleihe>, von : Date, bis : Date) : Double
>     summe : Integer = 0
>     anzahl : Integer = 0
>     für i = 0 bis ausleihen.size() − 1
>         a = ausleihen.get(i)
>         wenn a.getStart().compare(von) >= 0 und a.getStart().compare(bis) <= 0 dann
>             summe = summe + a.getMinuten()
>             anzahl = anzahl + 1
>         ende wenn
>     ende für
>     wenn anzahl == 0 dann
>         rückgabe 0
>     ende wenn
>     rückgabe summe / (Double) anzahl
> ende methode
> ```
> Bewertung: Signatur 1 P · Initialisierung 1 P · Schleife 2 P · Zeitraumbedingung inkl. Grenzen 2 P · Summieren und Zählen 2 P · Division durch 0 abgefangen 1 P · Kommadivision 1 P

### A9.2 ★★★ – Rückgaben je Station zählen (8 Punkte)
📘 **Nachlernen:** [[FIAE-9 Algorithmen in Pseudocode#2. Standardmuster|FIAE-9 › Standardmuster]]

Schreiben Sie `rueckgabenJeStation(ausleihen : Ausleihe[]) : Integer[]`. Das Ergebnis enthält für jede der 80 Stationen die Anzahl der Rückgaben (Index 0 = Station 1). Ausleihen mit weniger als 2 Minuten sollen nicht gezählt werden (Fehlausleihen).

> [!success]- Lösung
> ```
> methode rueckgabenJeStation(ausleihen : Ausleihe[]) : Integer[]
>     zaehler : Integer[] = new Integer[80]          // mit 0 initialisiert
>     für i = 0 bis ausleihen.length − 1
>         wenn ausleihen[i].getMinuten() >= 2 dann
>             nr = ausleihen[i].getZielStationNr()
>             zaehler[nr − 1] = zaehler[nr − 1] + 1
>         ende wenn
>     ende für
>     rückgabe zaehler
> ende methode
> ```
> Array anlegen 2 P · Schleife 2 P · Bedingung 1 P · Index **nr − 1** 2 P · Rückgabe 1 P

### A9.3 ★★ – Bubblesort im Schreibtischtest (6 Punkte)
📘 **Nachlernen:** [[FIAE-9 Algorithmen in Pseudocode#3. Sortieren und Suchen|FIAE-9 › Sortieren und Suchen]] · [[FIAE-9 Algorithmen in Pseudocode#4. Schreibtischtest|FIAE-9 › Schreibtischtest]]

Sortieren Sie `[5, 2, 8, 1]` aufsteigend mit Bubblesort. Geben Sie das Array nach jedem Durchlauf an und zählen Sie die Vertauschungen.

> [!success]- Lösung
> - Durchlauf 1: (5,2) tauschen → [2,5,8,1]; (5,8) –; (8,1) tauschen → **[2, 5, 1, 8]** (2 P)
> - Durchlauf 2: (2,5) –; (5,1) tauschen → **[2, 1, 5, 8]** (1,5 P)
> - Durchlauf 3: (2,1) tauschen → **[1, 2, 5, 8]** (1,5 P)
> - **4 Vertauschungen** – nach jedem Durchlauf steht das größte verbleibende Element am Ende. (1 P)

### A9.4 ★★ – Binäre Suche (4 Punkte)
📘 **Nachlernen:** [[FIAE-9 Algorithmen in Pseudocode#3. Sortieren und Suchen|FIAE-9 › Sortieren und Suchen]]

Im sortierten Array `[3, 8, 12, 17, 21, 30, 44]` wird die 30 gesucht. a) Geben Sie die geprüften Indizes bei binärer Suche an (Mitte = (links + rechts) div 2). b) Wie viele Vergleichen Sie bräuchte die lineare Suche? c) Welche Voraussetzung gilt?

> [!success]- Lösung
> a) links 0, rechts 6 → Mitte **3** (17 < 30) → links 4 → Mitte (4+6) div 2 = **5** → 30 gefunden (2 P)
> b) **6** Vergleiche (Index 0 bis 5) (1 P)
> c) Das Array muss **sortiert** sein. (1 P)

### A9.5 ★ – Ganzzahldivision und Modulo (4 Punkte)
📘 **Nachlernen:** [[FIAE-9 Algorithmen in Pseudocode#Ganzzahldivision und Modulo|FIAE-9 › Ganzzahldivision und Modulo]]

Eine Ausleihe dauert 437 Minuten. Berechnen Sie mit `div` und `mod` Stunden und Restminuten und geben Sie an, wie viele angefangene 30-Minuten-Blöcke berechnet werden.

> [!success]- Lösung
> - 437 div 60 = **7** Stunden, 437 mod 60 = **17** Minuten (2 P)
> - Blöcke: 437 div 30 = 14, 437 mod 30 = 17 ≠ 0 → **15** angefangene Blöcke (2 P)

---

## FIAE-10 Objektorientierte Programmierung umsetzen

### A10.1 ★★ – Klasse umsetzen (8 Punkte)
📘 **Nachlernen:** [[FIAE-10 Objektorientierte Programmierung umsetzen#1. Von der Klasse zum Code|FIAE-10 › Von der Klasse zum Code]]

Setzen Sie die Klasse in Pseudocode oder einer Programmiersprache um:
```
Rad
  - id : Integer
  - akkustand : Integer
  + Rad(id : Integer)
  + getAkkustand() : Integer
  + laden(prozent : Integer) : void
```
Der Konstruktor setzt den Akkustand auf 100. `laden` erhöht den Akkustand, höchstens bis 100; negative Werte lösen eine `IllegalArgumentException` aus.

> [!success]- Lösung (Java)
> ```java
> public class Rad {
>     private int id;
>     private int akkustand;
>
>     public Rad(int id) {
>         this.id = id;
>         this.akkustand = 100;
>     }
>
>     public int getAkkustand() {
>         return akkustand;
>     }
>
>     public void laden(int prozent) {
>         if (prozent < 0) {
>             throw new IllegalArgumentException("Wert darf nicht negativ sein");
>         }
>         akkustand = Math.min(100, akkustand + prozent);
>     }
> }
> ```
> private Attribute 1 P · Konstruktor 2 P · Getter 1 P · Begrenzung auf 100 2 P · Ausnahme 2 P

### A10.2 ★★ – Polymorphie (6 Punkte)
📘 **Nachlernen:** [[FIAE-10 Objektorientierte Programmierung umsetzen#2. Vererbung und Polymorphie im Code|FIAE-10 › Vererbung und Polymorphie im Code]]

Die abstrakte Klasse `Leihrad` hat die abstrakte Methode `preis(minuten : Integer) : Double`. `Standardrad` kostet 0,10 €/min, `EBike` 1,00 € Grundgebühr plus 0,25 €/min.
a) Setzen Sie beide `preis`-Methoden um. b) Eine Liste enthält ein Standardrad (30 min) und ein E-Bike (20 min). Berechnen Sie die Summe. c) Erklären Sie, warum die Schleife `summe = summe + rad.preis(min)` ohne Typprüfung auskommt.

> [!success]- Lösung
> a) `Standardrad.preis(m)`: `rückgabe m * 0.10` · `EBike.preis(m)`: `rückgabe 1.00 + m * 0.25` (2 P)
> b) 30 · 0,10 = 3,00 € und 1,00 + 20 · 0,25 = 6,00 € → **9,00 €** (2 P)
> c) **Dynamische Bindung:** Zur Laufzeit wird die Methode des tatsächlichen Objekttyps aufgerufen; neue Radtypen lassen sich ergänzen, ohne die Schleife zu ändern (Open-Closed-Prinzip). (2 P)

### A10.3 ★★ – Ausnahmebehandlung (5 Punkte)
📘 **Nachlernen:** [[FIAE-10 Objektorientierte Programmierung umsetzen#3. Ausnahmebehandlung|FIAE-10 › Ausnahmebehandlung]]

Beim Entsperren kann `SchlossNichtErreichbarException` auftreten. Beschreiben Sie mit Pseudocode, wie die Methode `ausleihen` die Ausnahme behandelt: bis zu drei Versuche, danach Meldung an die App und Protokolleintrag. Wozu dient `finally`?

> [!success]- Lösung
> ```
> versuche = 0
> erfolgreich = false
> solange nicht erfolgreich und versuche < 3
>     versuche = versuche + 1
>     try
>         schloss.entsperren()
>         erfolgreich = true
>     catch (SchlossNichtErreichbarException e)
>         log.warnung("Entsperren fehlgeschlagen, Versuch " + versuche)
>     ende try
> ende solange
> wenn nicht erfolgreich dann
>     meldeFehler("Rad konnte nicht entsperrt werden")
> ende wenn
> ```
> Schleife mit Zähler 2 P · try/catch mit spezifischer Ausnahme 2 P
> **finally** wird immer ausgeführt, egal ob eine Ausnahme auftrat – z. B. um Verbindungen oder Dateien zu schließen. (1 P)

### A10.4 ★ – Datentypen (4 Punkte)
📘 **Nachlernen:** [[FIAE-10 Objektorientierte Programmierung umsetzen#4. Datentypen|FIAE-10 › Datentypen]]

Wählen Sie je einen Datentyp und begründen Sie: a) Akkustand 0–100, b) Preis in Euro, c) gesperrt ja/nein, d) Anzahl aller Ausleihen seit Start des Systems (mehrere Milliarden möglich).

> [!success]- Lösung (je 1 P)
> a) `byte`/`int` – kleine Ganzzahl · b) `BigDecimal`/Dezimaltyp (bzw. Cent als `int`) – keine Rundungsfehler bei Geld · c) `boolean` · d) `long` – `int` reicht nur bis ca. 2,1 Milliarden

---

## FIAE-11 Testen und Qualitätssicherung

### A11.1 ★★★ – Überdeckungsarten (8 Punkte)
📘 **Nachlernen:** [[FIAE-11 Testen und Qualitätssicherung#Überdeckungsarten|FIAE-11 › Überdeckungsarten]]

```
methode zuschlag(minuten : Integer, istAbo : Boolean) : Double
    z = 0.0
    wenn minuten > 30 dann
        z = (minuten − 30) * 0.10
    ende wenn
    wenn istAbo dann
        z = z * 0.5
    ende wenn
    rückgabe z
ende methode
```
Geben Sie jeweils eine minimale Menge von Testfällen (minuten, istAbo) mit erwartetem Ergebnis an für a) Anweisungsüberdeckung, b) Zweigüberdeckung, c) Pfadüberdeckung.

> [!success]- Lösung
> a) **1 Testfall:** (40, true) → 0,50 € – alle Anweisungen werden ausgeführt (2 P)
> b) **2 Testfälle:** (40, true) → 0,50 € und (10, false) → 0,00 € – jede Bedingung einmal wahr, einmal falsch (3 P)
> c) **4 Testfälle:** (40, true) → 0,50 € · (40, false) → 1,00 € · (10, true) → 0,00 € · (10, false) → 0,00 € (3 P)

### A11.2 ★★ – Äquivalenzklassen und Grenzwerte (6 Punkte)
📘 **Nachlernen:** [[FIAE-11 Testen und Qualitätssicherung#3. Testfälle entwerfen|FIAE-11 › Testfälle entwerfen]]

Eine Ausleihe darf 1 bis 720 Minuten dauern (ganze Zahlen). Bilden Sie die Äquivalenzklassen und geben Sie die Grenzwerte an, die Sie testen.

> [!success]- Lösung
> - Ungültig: **< 1** (z. B. −5) · gültig: **1 bis 720** (z. B. 60) · ungültig: **> 720** (z. B. 1 000) · zusätzlich ungültig: keine Zahl/leer (3 P)
> - Grenzwerte: **0, 1, 720, 721** (3 P)

### A11.3 ★★ – Unit-Test schreiben (5 Punkte)
📘 **Nachlernen:** [[FIAE-11 Testen und Qualitätssicherung#4. Unit-Tests|FIAE-11 › Unit-Tests]]

Schreiben Sie zwei Unit-Tests für `zuschlag` aus A11.1 und erklären Sie das AAA-Muster.

> [!success]- Lösung
> ```java
> @Test
> void zuschlagOhneAboUeber30Minuten() {
>     double ergebnis = tarif.zuschlag(40, false);   // Act
>     assertEquals(1.00, ergebnis, 0.001);           // Assert
> }
>
> @Test
> void keinZuschlagBis30Minuten() {
>     assertEquals(0.00, tarif.zuschlag(30, false), 0.001);
> }
> ```
> je Test 1,5 P (Toleranz bei Gleitkommazahlen beachten)
> **AAA:** Arrange (Testdaten/Objekt vorbereiten), Act (Methode aufrufen), Assert (Ergebnis prüfen). (2 P)

### A11.4 ★ – Teststufen (4 Punkte)
📘 **Nachlernen:** [[FIAE-11 Testen und Qualitätssicherung#1. Teststufen und Testarten|FIAE-11 › Teststufen und Testarten]]

Ordnen Sie zu: a) Einzelne Methode wird isoliert geprüft. b) App und Backend werden zusammen über die REST-Schnittstelle getestet. c) Das Gesamtsystem wird auf einer produktionsnahen Umgebung geprüft. d) FlexiRad prüft, ob die App ihre Anforderungen erfüllt.

> [!success]- Lösung (je 1 P)
> a) Komponenten-/Unit-Test · b) Integrationstest · c) Systemtest · d) Abnahmetest

---

## FIAE-12 SQL für Entwickler

> [!info] Tabellen für alle SQL-Aufgaben
> **Kunde** (<u>KundenID</u>, Name, Ort, *TarifID*) · **Tarif** (<u>TarifID</u>, Bezeichnung, PreisProMinute) · **Ausleihe** (<u>AusleihID</u>, *KundenID*, RadID, Start, Minuten, Betrag) · **Ausleihe_Archiv** mit denselben Spalten wie Ausleihe

### A12.1 ★★ – Abfrage mit JOIN (4 Punkte)
📘 **Nachlernen:** [[FIAE-12 SQL für Entwickler#JOINs|FIAE-12 › JOINs]]

Geben Sie Name, Ort und Tarifbezeichnung aller Kunden aus Köln aus, alphabetisch nach Name.

> [!success]- Lösung
> ```sql
> SELECT k.Name, k.Ort, t.Bezeichnung
> FROM Kunde k
> INNER JOIN Tarif t ON k.TarifID = t.TarifID
> WHERE k.Ort = 'Köln'
> ORDER BY k.Name;
> ```
> Spalten 1 P · JOIN mit Bedingung 1,5 P · WHERE 1 P · ORDER BY 0,5 P

### A12.2 ★★ – Gruppieren (5 Punkte)
📘 **Nachlernen:** [[FIAE-12 SQL für Entwickler#1. SELECT Schritt für Schritt|FIAE-12 › SELECT Schritt für Schritt]]

Geben Sie für jeden Kunden mit mindestens 10 Ausleihen den Namen, die Anzahl der Ausleihen und den Gesamtumsatz aus, absteigend nach Umsatz.

> [!success]- Lösung
> ```sql
> SELECT k.Name, COUNT(a.AusleihID) AS Anzahl, SUM(a.Betrag) AS Umsatz
> FROM Kunde k
> JOIN Ausleihe a ON a.KundenID = k.KundenID
> GROUP BY k.KundenID, k.Name
> HAVING COUNT(a.AusleihID) >= 10
> ORDER BY Umsatz DESC;
> ```
> Aggregatfunktionen 1,5 P · GROUP BY 1,5 P · HAVING (nicht WHERE!) 1,5 P · Sortierung 0,5 P

### A12.3 ★★ – Unterabfrage (5 Punkte)
📘 **Nachlernen:** [[FIAE-12 SQL für Entwickler#Unterabfragen, UNION, Datum|FIAE-12 › Unterabfragen, UNION, Datum]]

a) Geben Sie alle Ausleihen aus, deren Dauer über dem Durchschnitt aller Ausleihen liegt. b) Geben Sie alle Kunden aus, die noch nie ausgeliehen haben.

> [!success]- Lösung
> ```sql
> -- a) (2,5 P)
> SELECT * FROM Ausleihe
> WHERE Minuten > (SELECT AVG(Minuten) FROM Ausleihe);
>
> -- b) (2,5 P)
> SELECT k.KundenID, k.Name
> FROM Kunde k
> LEFT JOIN Ausleihe a ON a.KundenID = k.KundenID
> WHERE a.AusleihID IS NULL;
> -- alternativ: WHERE KundenID NOT IN (SELECT KundenID FROM Ausleihe)
> ```

### A12.4 ★★ – Daten ändern (6 Punkte)
📘 **Nachlernen:** [[FIAE-12 SQL für Entwickler#2. Daten ändern (DML)|FIAE-12 › Daten ändern]]

a) Legen Sie den Tarif 4 „Student“ mit 0,07 € pro Minute an. b) Erhöhen Sie alle Minutenpreise um 10 %. c) Löschen Sie alle Kunden ohne Tarif.

> [!success]- Lösung
> ```sql
> INSERT INTO Tarif (TarifID, Bezeichnung, PreisProMinute)
> VALUES (4, 'Student', 0.07);                              -- 2 P
>
> UPDATE Tarif SET PreisProMinute = PreisProMinute * 1.1;  -- 2 P
>
> DELETE FROM Kunde WHERE TarifID IS NULL;                 -- 2 P (IS NULL, nicht = NULL)
> ```

### A12.5 ★★★ – Archivieren (6 Punkte)
📘 **Nachlernen:** [[FIAE-12 SQL für Entwickler#2. Daten ändern (DML)|FIAE-12 › Daten ändern]]

Alle Ausleihen, die vor dem 01.01.2025 begonnen haben, sollen nach `Ausleihe_Archiv` verschoben werden. Schreiben Sie die Anweisungen und begründen Sie, warum sie in einer Transaktion laufen sollten.

> [!success]- Lösung
> ```sql
> START TRANSACTION;
> INSERT INTO Ausleihe_Archiv
>     SELECT * FROM Ausleihe WHERE Start < '2025-01-01';
> DELETE FROM Ausleihe WHERE Start < '2025-01-01';
> COMMIT;
> ```
> INSERT … SELECT 2 P · DELETE mit derselben Bedingung 2 P
> **Transaktion:** Beide Schritte gelingen gemeinsam oder gar nicht (Atomarität) – sonst drohen doppelte oder verlorene Datensätze, wenn nach dem INSERT ein Fehler auftritt. (2 P)

### A12.6 ★ – Struktur und Rechte (4 Punkte)
📘 **Nachlernen:** [[FIAE-12 SQL für Entwickler#3. Struktur und Rechte (DDL, DCL)|FIAE-12 › Struktur und Rechte]]

a) Fügen Sie der Tabelle Kunde die Spalte `Email` (max. 100 Zeichen) hinzu. b) Der Benutzer `auswertung` soll Ausleihen nur lesen dürfen.

> [!success]- Lösung
> ```sql
> ALTER TABLE Kunde ADD Email VARCHAR(100);     -- 2 P
> GRANT SELECT ON Ausleihe TO auswertung;       -- 2 P
> ```

---
← [[AP2 FIAE Start]] · [[Übersicht FIAE Algorithmen]]


