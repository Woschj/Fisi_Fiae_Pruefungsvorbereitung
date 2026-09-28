---
tags: [ap2/probepruefung, ap2/fiae]
fachrichtung: FIAE
---
# FIAE · AP2-Probeprüfung 3

> [!info] Durchführung
> Bearbeiten Sie die Prüfungsteile jeweils innerhalb der angegebenen Zeit. Öffnen Sie die Lösungshinweise erst nach Abschluss des jeweiligen Prüfungsteils, bewerten Sie sich anhand der **Bewertungshinweise** und tragen Sie Ihre erreichten Punkte anschließend im Dashboard ein. Szenarien und Datensätze sind eigens für diese Probeprüfung erstellt.

## Teil 1 – Planen eines Softwareproduktes

> [!abstract] Ausgangssituation
> Die **RheinStrom Mobil GmbH** (Tochter eines Energieversorgers im Rhein-Erft-Kreis) betreibt 180 öffentliche Ladepunkte für Elektrofahrzeuge. Sie beauftragt Ihren Ausbildungsbetrieb mit der Entwicklung einer **Lade-App**: Kundinnen und Kunden sollen freie Ladepunkte finden, einen Ladevorgang per App starten und ihre Ladevorgänge mit Kosten einsehen können. Abgerechnet wird nach Energie (kWh) zuzüglich einer Blockiergebühr bei langer Standzeit.

**90 Minuten · 4 Aufgaben à 25 Punkte · Hilfsmittel: nicht programmierbarer Taschenrechner**

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FIAE Probeprüfung 3 – Planen", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – Vorgehensmodell und Aufwand (25 Punkte)
Das Projekt soll mit Scrum umgesetzt werden. Das Product Backlog für die erste Version umfasst Stories mit insgesamt **136 Story Points**. Das Team hat in vergleichbaren Projekten eine durchschnittliche Velocity von **24 Story Points** je Sprint erreicht; ein Sprint dauert zwei Wochen.

**a) (6 P)** Berechnen Sie, wie viele Sprints und wie viele Wochen für die erste Version voraussichtlich benötigt werden.

**b) (9 P)** Beschreiben Sie die Rollen Product Owner, Scrum Master und Developer und ordnen Sie jeder Rolle eine konkrete Aufgabe in diesem Projekt zu.

**c) (10 P)** Formulieren Sie eine User Story für das Starten eines Ladevorgangs nach dem üblichen Muster und ergänzen Sie drei prüfbare Akzeptanzkriterien.

> [!success]- Lösung Aufgabe 1
> **a)** 136 / 24 = 5,67 → aufgerundet **6 Sprints** à 2 Wochen = **12 Wochen**.
>
> **b)** **Product Owner**: verantwortet das Product Backlog und priorisiert nach Nutzen – z. B. entscheidet, ob „Ladepunktsuche“ vor „Rechnungsexport“ kommt; vertritt die RheinStrom Mobil GmbH. **Scrum Master**: sorgt für die Einhaltung von Scrum, moderiert Ereignisse und beseitigt Hindernisse – z. B. klärt den fehlenden Testzugang zur Ladesäulen-Schnittstelle. **Developer**: schätzen und setzen die Stories um, liefern jedes Sprint ein fertiges Inkrement – z. B. implementieren und testen die Startfunktion.
>
> **c)** „**Als** registrierte Kundin **möchte ich** einen Ladevorgang per App an einem ausgewählten Ladepunkt starten, **damit** ich keine Ladekarte mitführen muss.“ Akzeptanzkriterien: Der Start ist nur an Ladepunkten mit Status „verfügbar“ möglich · Nach dem Start zeigt die App innerhalb von 5 Sekunden den Status „lädt“ und die bisher geladene Energie · Ist kein Zahlungsmittel hinterlegt, wird der Start verweigert und ein Hinweis angezeigt.
>
> **Bewertungshinweise:** a) Rechnung 2 P, Aufrunden 2 P, Wochen 2 P · b) je Rolle mit Aufgabe 3 P · c) User Story im Muster 4 P, je prüfbares Kriterium 2 P.

### Aufgabe 2 – UML-Zustands- und Aktivitätsdiagramm (25 Punkte)
Ein Ladepunkt kann die Zustände **verfügbar**, **reserviert**, **belegt (lädt)**, **belegt (Laden beendet)** und **gestört** annehmen. Eine Reservierung verfällt nach 15 Minuten. Ein Ladevorgang endet, wenn das Fahrzeug voll ist oder die Kundin ihn in der App beendet; der Ladepunkt wird erst wieder verfügbar, wenn der Stecker gezogen wurde. Eine Störung kann in jedem Zustand auftreten und wird durch den Service behoben.

**a) (12 P)** Erstellen Sie ein UML-Zustandsdiagramm für den Ladepunkt. Beschriften Sie die Übergänge mit den auslösenden Ereignissen.

**b) (13 P)** Erstellen Sie ein UML-Aktivitätsdiagramm für den Ablauf „Ladevorgang per App starten“: Die App sendet die Startanfrage an das Backend. Das Backend prüft, ob ein gültiges Zahlungsmittel hinterlegt ist. Ist das nicht der Fall, erhält die Kundin eine Fehlermeldung. Andernfalls sendet das Backend den Startbefehl an den Ladepunkt; parallel wird ein Ladevorgang in der Datenbank angelegt und eine Push-Nachricht vorbereitet. Wenn beides erledigt ist, zeigt die App den Status „lädt“ an.

> [!success]- Lösung Aufgabe 2
> **a)**
> ```mermaid
> stateDiagram-v2
>     [*] --> verfuegbar
>     verfuegbar --> reserviert: reservieren
>     reserviert --> verfuegbar: 15 min abgelaufen / storniert
>     reserviert --> laedt: Start durch Reservierende
>     verfuegbar --> laedt: Start (App/Ladekarte)
>     laedt --> beendet: Akku voll / Stopp in App
>     beendet --> verfuegbar: Stecker gezogen
>     verfuegbar --> gestoert: Fehler
>     reserviert --> gestoert: Fehler
>     laedt --> gestoert: Fehler
>     beendet --> gestoert: Fehler
>     gestoert --> verfuegbar: Störung behoben
> ```
>
> **b)**
> ```mermaid
> flowchart TD
>     S((Start)) --> A(Startanfrage senden)
>     A --> B(Zahlungsmittel prüfen)
>     B --> D{ }
>     D -- "[nicht gültig]" --> F(Fehlermeldung anzeigen) --> E1(((Ende)))
>     D -- "[gültig]" --> G[Gabelung / Fork]
>     G --> H(Startbefehl an Ladepunkt senden)
>     G --> I(Ladevorgang in DB anlegen)
>     G --> J(Push-Nachricht vorbereiten)
>     H --> K[Vereinigung / Join]
>     I --> K
>     J --> K
>     K --> L(Status „lädt“ anzeigen) --> E2(((Ende)))
> ```
> Im UML-Diagramm: Startknoten (gefüllter Kreis), Aktionen (abgerundete Rechtecke), **Entscheidungsknoten** (Raute) mit Bedingungen `[gültig]`/`[nicht gültig]`, **Gabelung (Fork)** und **Vereinigung (Join)** als Balken für die parallelen Aktionen, Endknoten. Optional Aktivitätsbereiche (Swimlanes) App/Backend/Ladepunkt.
>
> **Bewertungshinweise:** a) je Zustand 1 P, Anfangszustand 1 P, Übergänge mit Ereignissen 6 P · b) Start-/Endknoten 2 P, Aktionen 3 P, Entscheidung mit Bedingungen 3 P, Fork/Join 4 P, Fehlerzweig 1 P.

### Aufgabe 3 – Datenmodell (25 Punkte)
Bisher werden Ladevorgänge in einer Tabellenkalkulation erfasst:

| VorgangNr | KundenNr | Name | E-Mail | LadepunktNr | Standort | Start | Ende | kWh | Tarif | Preis_je_kWh |
|---|---|---|---|---|---|---|---|---|---|---|
| 5001 | K17 | Aylin Demir | a.demir@example.org | LP042 | Kerpen, Rathausplatz | 2026-05-04 07:58 | 2026-05-04 09:10 | 31,4 | Standard | 0,59 |
| 5002 | K23 | Jonas Weber | j.weber@example.org | LP042 | Kerpen, Rathausplatz | 2026-05-04 09:30 | 2026-05-04 10:02 | 12,0 | Abo | 0,49 |
| 5003 | K17 | Aylin Demir | a.demir@example.org | LP107 | Hürth, Park & Ride | 2026-05-05 17:40 | 2026-05-05 19:05 | 40,2 | Standard | 0,59 |

**a) (4 P)** Nennen Sie zwei Anomalien, die bei dieser Datenhaltung auftreten können, jeweils mit Beispiel aus der Tabelle.

**b) (14 P)** Überführen Sie die Daten in die dritte Normalform. Geben Sie alle Tabellen mit Attributen an und kennzeichnen Sie Primär- und Fremdschlüssel.

**c) (7 P)** Erläutern Sie, warum der Preis je kWh zusätzlich im Ladevorgang gespeichert werden sollte, obwohl er sich aus dem Tarif ergibt.

> [!success]- Lösung Aufgabe 3
> **a)** **Änderungsanomalie**: Ändert Aylin Demir ihre E-Mail-Adresse, muss sie in mehreren Zeilen geändert werden, sonst entstehen widersprüchliche Daten. **Einfügeanomalie**: Ein neuer Ladepunkt kann erst erfasst werden, wenn an ihm geladen wurde. **Löschanomalie**: Wird Vorgang 5002 gelöscht, geht die Information verloren, dass Jonas Weber Kunde mit Abo ist.
>
> **b)**
> - `Kunde(`<u>KundenNr</u>`, Name, E-Mail, TarifID#)`
> - `Tarif(`<u>TarifID</u>`, Bezeichnung, Preis_je_kWh)`
> - `Ladepunkt(`<u>LadepunktNr</u>`, StandortID#)`
> - `Standort(`<u>StandortID</u>`, Ort, Bezeichnung)`
> - `Ladevorgang(`<u>VorgangNr</u>`, KundenNr#, LadepunktNr#, Start, Ende, kWh, Preis_je_kWh)`
>
> Name zerlegt in Vorname/Nachname (atomar, 1. NF) ist ebenfalls richtig. Der Tarif hängt vom Kunden ab, der Standort vom Ladepunkt – ohne diese Auslagerung bestünden transitive Abhängigkeiten (Verstoß gegen die 3. NF).
>
> **c)** Tarifpreise ändern sich im Zeitverlauf. Ohne gespeicherten Preis würden alte Ladevorgänge nach einer Preisänderung mit dem neuen Preis berechnet – Rechnungen wären nicht mehr nachvollziehbar (Revisionssicherheit, GoBD). Der Preis zum Zeitpunkt des Vorgangs ist daher ein eigenes, historisches Attribut und keine Redundanz.
>
> **Bewertungshinweise:** a) je Anomalie mit Beispiel 2 P · b) je sinnvolle Tabelle 2 P, Schlüssel korrekt 4 P · c) Begründung 7 P.

### Aufgabe 4 – Wirtschaftlichkeit und Qualität (25 Punkte)
Für die Abrechnung prüft die RheinStrom Mobil GmbH, ob sie ein Standardprodukt mietet oder die Abrechnung selbst entwickeln lässt:

| | Standardsoftware (SaaS) | Eigenentwicklung |
|---|---:|---:|
| Einmalige Kosten | 4.000 € Einrichtung | 58.000 € Entwicklung |
| Laufende Kosten | 1,20 € je Ladepunkt und Monat + 450 € Grundgebühr pro Monat | 900 € Wartung pro Monat |

**a) (10 P)** Berechnen Sie die Gesamtkosten beider Varianten für eine Laufzeit von 5 Jahren bei 180 Ladepunkten und geben Sie an, welche Variante günstiger ist.

**b) (7 P)** Nennen Sie außer den Kosten drei Kriterien, die bei der Make-or-Buy-Entscheidung zu berücksichtigen sind, und erläutern Sie eines davon.

**c) (8 P)** Für die App soll eine Open-Source-Bibliothek unter der Lizenz **GPL-3.0** verwendet werden, eine andere steht unter der **MIT-Lizenz**. Erläutern Sie den wesentlichen Unterschied der beiden Lizenzen und die Folge für die App, die der Auftraggeber nicht als Open Source veröffentlichen möchte.

> [!success]- Lösung Aufgabe 4
> **a)** Laufzeit 60 Monate. SaaS: 4.000 € + (180 × 1,20 € + 450 €) × 60 = 4.000 € + 666 € × 60 = 4.000 € + 39.960 € = **43.960 €**. Eigenentwicklung: 58.000 € + 900 € × 60 = 58.000 € + 54.000 € = **112.000 €**. Die **Standardsoftware** ist um **68.040 €** günstiger.
>
> **b)** Abdeckung der Anforderungen (Blockiergebühr, Abo-Tarife) · Abhängigkeit vom Anbieter (Vendor Lock-in, Preiserhöhungen) · Datenschutz und Serverstandort · Integration in vorhandene Systeme (Buchhaltung, Ladesäulen-Backend) · Zeit bis zur Einführung · vorhandenes Know-how. Erläuterung z. B.: Kann das Standardprodukt die Blockiergebühr nicht abbilden, entstehen zusätzliche Anpassungskosten oder Prozessänderungen.
>
> **c)** **MIT** ist eine freizügige Lizenz: Nutzung, Änderung und Einbindung in proprietäre Software erlaubt, nur Copyright- und Lizenzhinweis müssen erhalten bleiben. **GPL-3.0** ist eine **Copyleft**-Lizenz: Wird die Bibliothek in ein weitergegebenes Programm eingebunden, muss das Gesamtwerk ebenfalls unter der GPL mit Quellcode veröffentlicht werden. Folge: Die GPL-Bibliothek darf in der verteilten App nicht verwendet werden → Alternative mit freizügiger Lizenz wählen oder kommerzielle Lizenz erwerben.
>
> **Bewertungshinweise:** a) je Variante Rechenweg 3 P und Ergebnis 1 P, Vergleich 2 P · b) je Kriterium 1 P, Erläuterung 4 P · c) MIT 3 P, GPL/Copyleft 3 P, Folge 2 P.

---

## Teil 2 – Entwicklung und Umsetzung von Algorithmen

> [!abstract] Ausgangssituation
> Das Backend der Lade-App berechnet die Kosten der Ladevorgänge und stellt Auswertungen für die RheinStrom Mobil GmbH bereit.

**90 Minuten · 4 Aufgaben à 25 Punkte · Hilfsmittel: nicht programmierbarer Taschenrechner**

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FIAE Probeprüfung 3 – Algorithmen", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – Kostenberechnung (25 Punkte)
Die Kosten eines Ladevorgangs setzen sich wie folgt zusammen:
- Energiekosten: geladene kWh × Preis je kWh
- Blockiergebühr: Ab der **241. Minute** Standzeit werden **0,10 € je angefangene Minute** berechnet, höchstens jedoch **12,00 €**.
- Das Ergebnis wird auf zwei Nachkommastellen gerundet (Funktion `runden(wert, 2)` steht zur Verfügung).

**a) (12 P)** Entwickeln Sie die Funktion `berechneKosten(kwh, preisJeKwh, minuten)` in Pseudocode.

**b) (6 P)** Berechnen Sie die Kosten für folgende Ladevorgänge:
1. 31,4 kWh, 0,59 €/kWh, 72 Minuten
2. 40,0 kWh, 0,49 €/kWh, 300 Minuten
3. 45,5 kWh, 0,59 €/kWh, 500 Minuten

**c) (7 P)** Ein Kollege hat die Blockiergebühr so umgesetzt. Nennen Sie die beiden Fehler und korrigieren Sie den Code.

<pre>
gebuehr ← 0
WENN minuten > 240 DANN
    gebuehr ← minuten * 0.10
ENDE WENN
WENN gebuehr < 12 DANN
    gebuehr ← 12
ENDE WENN
</pre>

> [!success]- Lösung Aufgabe 1
> **a)**
> <pre>
> FUNKTION berechneKosten(kwh, preisJeKwh, minuten): Gleitkommazahl
>     energie ← kwh * preisJeKwh
>     gebuehr ← 0
>     WENN minuten > 240 DANN
>         gebuehr ← (minuten - 240) * 0.10
>         WENN gebuehr > 12 DANN
>             gebuehr ← 12
>         ENDE WENN
>     ENDE WENN
>     RÜCKGABE runden(energie + gebuehr, 2)
> ENDE FUNKTION
> </pre>
> (Minuten sind ganzzahlig und damit bereits „angefangen“ gezählt.)
>
> **b)** 1. 31,4 × 0,59 = 18,526 → **18,53 €** · 2. 40,0 × 0,49 = 19,60 € + (300 − 240) × 0,10 = 6,00 € → **25,60 €** · 3. 45,5 × 0,59 = 26,845 € + min(260 × 0,10; 12) = 12,00 € → 38,845 → **38,85 €** (kaufmännisch gerundet).
>
> **c)** Fehler 1: Die Gebühr wird für **alle** Minuten berechnet (`minuten * 0.10`), nicht erst ab der 241. Minute → `gebuehr ← (minuten - 240) * 0.10`. Fehler 2: Der Vergleich der Obergrenze ist umgekehrt: `WENN gebuehr < 12` setzt jede Gebühr unter 12 € – auch 0 € bei kurzen Ladevorgängen – auf 12 € → `WENN gebuehr > 12 DANN gebuehr ← 12`.
>
> **Bewertungshinweise:** a) Energiekosten 2 P, Bedingung 241. Minute 3 P, Gebührenberechnung 3 P, Obergrenze 3 P, Rundung/Rückgabe 1 P · b) je Vorgang 2 P · c) je Fehler 2 P, Korrektur 3 P.

### Aufgabe 2 – Objektorientierung (25 Punkte)
Es gibt verschiedene Tarife: den **StandardTarif** (fester Preis je kWh) und den **AboTarif** (monatliche Grundgebühr, reduzierter Preis je kWh, die ersten 20 kWh im Monat sind frei). Alle Tarife sollen über die Methode `berechnePreis(kwh: double, bereitsGeladenImMonat: double): double` angesprochen werden.

**a) (9 P)** Erstellen Sie ein UML-Klassendiagramm mit einer Schnittstelle `Tarif`, den beiden Tarifklassen und der Klasse `Kunde`, die genau einen Tarif besitzt. Geben Sie Attribute mit Sichtbarkeit und Datentyp an.

**b) (10 P)** Implementieren Sie die Methode `berechnePreis` der Klasse `AboTarif` in Pseudocode oder einer Programmiersprache Ihrer Wahl. Berücksichtigen Sie die Freimenge, die im laufenden Monat bereits teilweise verbraucht sein kann.

**c) (6 P)** Erläutern Sie den Unterschied zwischen einer Schnittstelle (Interface) und einer abstrakten Klasse.

> [!success]- Lösung Aufgabe 2
> **a)**
> ```mermaid
> classDiagram
>     class Tarif {
>         <<interface>>
>         +berechnePreis(kwh: double, bereitsGeladenImMonat: double) double
>     }
>     class StandardTarif {
>         -preisJeKwh: double
>         +berechnePreis(kwh: double, bereitsGeladenImMonat: double) double
>     }
>     class AboTarif {
>         -grundgebuehr: double
>         -preisJeKwh: double
>         -freiKwh: double = 20
>         +berechnePreis(kwh: double, bereitsGeladenImMonat: double) double
>     }
>     class Kunde {
>         -kundenNr: String
>         -name: String
>         -tarif: Tarif
>     }
>     Tarif <|.. StandardTarif
>     Tarif <|.. AboTarif
>     Kunde "*" --> "1" Tarif
> ```
>
> **b)**
> ```java
> public double berechnePreis(double kwh, double bereitsGeladenImMonat) {
>     double restFrei = Math.max(0, freiKwh - bereitsGeladenImMonat);
>     double kostenpflichtig = Math.max(0, kwh - restFrei);
>     return kostenpflichtig * preisJeKwh;
> }
> ```
> (Die Grundgebühr wird monatlich getrennt abgerechnet, nicht je Ladevorgang.)
>
> **c)** Ein **Interface** legt nur fest, *welche* Methoden eine Klasse anbieten muss (Vertrag), enthält keinen Zustand (keine Instanzattribute); eine Klasse kann mehrere Interfaces implementieren. Eine **abstrakte Klasse** kann Attribute und bereits implementierte Methoden enthalten, die an Unterklassen vererbt werden; eine Klasse kann (in Java/C#) nur von einer Klasse erben. Beide können nicht instanziiert werden.
>
> **Bewertungshinweise:** a) Interface mit Stereotyp 2 P, Tarifklassen mit Attributen 3 P, Realisierungsbeziehungen 2 P, Assoziation Kunde–Tarif mit Multiplizität 2 P · b) Restfreimenge 4 P, kostenpflichtige Menge ohne negative Werte 4 P, Rückgabe 2 P · c) je Begriff 3 P.

### Aufgabe 3 – SQL (25 Punkte)
Gegeben sind die Tabellen:
- `Kunde(kunden_nr, name, email)`
- `Ladepunkt(ladepunkt_nr, standort_id)`
- `Standort(standort_id, ort, bezeichnung)`
- `Ladevorgang(vorgang_nr, kunden_nr, ladepunkt_nr, start, ende, kwh, preis_je_kwh)`

**a) (8 P)** Geben Sie für jeden Ort die insgesamt im **Mai 2026** geladene Energiemenge aus, absteigend sortiert nach der Energiemenge.

**b) (6 P)** Geben Sie Name und E-Mail aller Kundinnen und Kunden aus, die **noch nie** einen Ladevorgang hatten.

**c) (5 P)** Erhöhen Sie in allen Ladevorgängen des Ladepunkts `LP042` vom 04.05.2026 den Preis je kWh um 0,02 €, weil ein falscher Tarif hinterlegt war.

**d) (6 P)** Im Backend wird eine Abfrage so zusammengesetzt: `"SELECT * FROM Kunde WHERE email = '" + eingabe + "'"`. Erläutern Sie die Gefahr und die Gegenmaßnahme.

> [!success]- Lösung Aufgabe 3
> **a)**
> ```sql
> SELECT s.ort, SUM(lv.kwh) AS energie_kwh
> FROM Ladevorgang lv
> JOIN Ladepunkt lp ON lp.ladepunkt_nr = lv.ladepunkt_nr
> JOIN Standort s ON s.standort_id = lp.standort_id
> WHERE lv.start >= '2026-05-01' AND lv.start < '2026-06-01'
> GROUP BY s.ort
> ORDER BY energie_kwh DESC;
> ```
> **b)**
> ```sql
> SELECT k.name, k.email
> FROM Kunde k
> LEFT JOIN Ladevorgang lv ON lv.kunden_nr = k.kunden_nr
> WHERE lv.vorgang_nr IS NULL;
> ```
> (alternativ `WHERE NOT EXISTS (SELECT 1 FROM Ladevorgang lv WHERE lv.kunden_nr = k.kunden_nr)`)
>
> **c)**
> ```sql
> UPDATE Ladevorgang
> SET preis_je_kwh = preis_je_kwh + 0.02
> WHERE ladepunkt_nr = 'LP042'
>   AND start >= '2026-05-04' AND start < '2026-05-05';
> ```
> **d)** **SQL-Injection**: Eine Eingabe wie `' OR '1'='1` verändert die Abfrage und liefert alle Kunden; mit `'; DROP TABLE Kunde; --` könnten Daten zerstört werden. Gegenmaßnahme: **Prepared Statements** mit Platzhaltern (`WHERE email = ?`), zusätzlich Eingabevalidierung und minimale Rechte des Datenbankkontos.
>
> **Bewertungshinweise:** a) Joins 3 P, Datumsfilter 2 P, SUM/GROUP BY 2 P, ORDER BY 1 P · b) LEFT JOIN bzw. NOT EXISTS 4 P, IS NULL 2 P · c) SET 2 P, WHERE mit beiden Bedingungen 3 P · d) Gefahr mit Beispiel 3 P, Gegenmaßnahme 3 P.

### Aufgabe 4 – Rekursion und Test (25 Punkte)
Für die Suche nach einem Ladepunkt in einem nach `ladepunktNr` sortierten Array wird folgende rekursive Funktion verwendet:

<pre>
FUNKTION suche(liste, ziel, links, rechts): Ganzzahl
    WENN links > rechts DANN
        RÜCKGABE -1
    ENDE WENN
    mitte ← (links + rechts) DIV 2
    WENN liste[mitte] = ziel DANN
        RÜCKGABE mitte
    SONST WENN liste[mitte] < ziel DANN
        RÜCKGABE suche(liste, ziel, mitte + 1, rechts)
    SONST
        RÜCKGABE suche(liste, ziel, links, mitte - 1)
    ENDE WENN
ENDE FUNKTION
</pre>

**a) (9 P)** Führen Sie den Aufruf `suche([12, 19, 27, 42, 55, 63, 71, 88], 63, 0, 7)` schrittweise aus. Geben Sie für jeden Aufruf `links`, `rechts`, `mitte` und `liste[mitte]` sowie das Ergebnis an.

**b) (4 P)** Nennen Sie die Abbruchbedingung(en) der Rekursion und erläutern Sie, was bei fehlender Abbruchbedingung passiert.

**c) (12 P)** Die Funktion `berechneKosten` aus Aufgabe 1 soll mit Unit-Tests geprüft werden. Bilden Sie für den Parameter `minuten` Äquivalenzklassen und geben Sie fünf Testfälle (Eingaben und erwartetes Ergebnis) an, die insbesondere die Grenzwerte abdecken. Verwenden Sie `kwh = 10` und `preisJeKwh = 0,50`.

> [!success]- Lösung Aufgabe 4
> **a)**
>
> | Aufruf | links | rechts | mitte | liste[mitte] | Aktion |
> |---:|---:|---:|---:|---:|---|
> | 1 | 0 | 7 | 3 | 42 | 42 < 63 → rechts suchen |
> | 2 | 4 | 7 | 5 | 63 | gefunden |
>
> Ergebnis: **5**.
>
> **b)** Abbruch, wenn das Element gefunden ist (`liste[mitte] = ziel`) oder der Suchbereich leer ist (`links > rechts`). Ohne Abbruchbedingung ruft sich die Funktion endlos selbst auf, bis der Aufrufstapel voll ist (**Stack Overflow**).
>
> **c)** Äquivalenzklassen: ungültig `minuten < 0` · gültig ohne Gebühr `0–240` · gültig mit Gebühr unter der Obergrenze `241–359` · gültig mit Obergrenze `≥ 360` (ab 360 Minuten ergibt sich 120 × 0,10 € = 12 €).
>
> | Nr. | minuten | Erwartung |
> |---:|---:|---|
> | 1 | −1 | Fehler/Ausnahme (ungültig) |
> | 2 | 240 | 5,00 € (keine Gebühr) |
> | 3 | 241 | 5,10 € |
> | 4 | 359 | 16,90 € (11,90 € Gebühr) |
> | 5 | 360 | 17,00 € (12 € Gebühr, Grenze) |
> | 6 | 361 | 17,00 € (gedeckelt) |
>
> **Bewertungshinweise:** a) je Aufrufzeile 3 P, Ergebnis 3 P · b) Abbruchbedingungen 2 P, Folge 2 P · c) Äquivalenzklassen 4 P, je Testfall 1,6 P (max. 8 P).

---

## Teil 3 – Wirtschafts- und Sozialkunde
**60 Minuten · 30 Aufgaben · Hilfsmittel: nicht programmierbarer Taschenrechner.** [[WiSo Probeprüfung 3|WiSo-Teil öffnen]]

Nachbereitung: [[AP2 FIAE Fehlerlog]] · ← [[AP2 FIAE Start]]
