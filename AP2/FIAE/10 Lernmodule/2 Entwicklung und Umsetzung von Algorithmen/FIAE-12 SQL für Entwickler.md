---
modul: FIAE-12
titel: SQL für Entwickler
bereich: Algorithmen
pruefungsteil: "AP2 Teil 2 – Entwicklung und Umsetzung von Algorithmen"
reihenfolge: 12
dauer: 180
status: neu
sicherheit: 0
zuletzt:
tags: [ap2/modul, ap2/fiae]
---
# FIAE-12 · SQL für Entwickler

> [!abstract] Überblick
> **Bereich:** [[Übersicht FIAE Algorithmen]]
> **Prüfung:** „Entwicklung und Umsetzung von Algorithmen“ – Aufgabe 4 ist seit Jahren **SQL mit 21–30 Punkten**
> **Dauer:** ca. 180 min · **Prüfungsrelevanz:** ★★★ – JOIN mit GROUP BY/HAVING, Aggregatfunktionen, INSERT/UPDATE/DELETE, Archivierung mit INSERT…SELECT, ALTER TABLE, GRANT/REVOKE, Unterabfragen, UNION, Datumsfunktionen
> **Prüfungskatalog:** SQL ist seit 2025 ausdrücklich AP2-Stoff.
> **Grundlagen aus AP1:** [[S7 Datenbanken]]

## Lernziele
- [ ] Ich schreibe SELECT-Abfragen mit WHERE, JOIN (INNER/LEFT), GROUP BY, HAVING, ORDER BY und Aggregatfunktionen.
- [ ] Ich verwende Unterabfragen, UNION und Datumsfunktionen.
- [ ] Ich ändere Daten mit INSERT, UPDATE, DELETE und archiviere mit INSERT…SELECT.
- [ ] Ich ändere Strukturen mit CREATE, ALTER und DROP und setze Constraints.
- [ ] Ich vergebe Rechte mit GRANT/REVOKE und kenne Transaktionen, Views, Stored Procedures, Trigger und Indizes.

## So wird das geprüft
> [!info] Typische AP2-Aufgabentypen
> - **Auswertung je Gruppe:** Min/Max/Durchschnitt/Anzahl je Gruppe mit JOIN und GROUP BY, Anzahl Bestellungen je Kunde mit **HAVING ≥ 3**, Verkaufszahl je Kategorie absteigend.
> - **Archivieren:** Datensätze per `INSERT INTO … SELECT` in eine Archivtabelle kopieren und danach `DELETE`, Auswertung über Aktiv- und Archivtabelle mit **UNION ALL**.
> - **DML:** INSERT eines neuen Datensatzes, UPDATE mit Unterabfrage (+5 %), fehlende Werte ergänzen und Spalte zum Pflichtfeld machen.
> - **DDL:** CREATE TABLE mit PRIMARY KEY, Spalten hinzufügen, Werte aufteilen, Spalte löschen.
> - **DCL:** `GRANT INSERT, UPDATE` und `REVOKE`.
> - **JOIN über mehrere Tabellen** mit Sortierung und **DATEDIFF** für Zeitdifferenzen, **CRUD ↔ SQL**, Stored Procedure, Trigger, Index.

---

## 1. SELECT Schritt für Schritt

```sql
-- Beispielschema Onlineshop: Kunde(KundenID, Name, Ort) · Bestellung(BestellID, KundenID, Datum)
-- Position(BestellID, ArtikelID, Menge) · Artikel(ArtikelID, Bezeichnung, Preis, KategorieID, HerstellerID)
-- Kategorie(KategorieID, Name) · Hersteller(HerstellerID, Bezeichnung, Email)
SELECT   k.KategorieID, k.Name,
         MIN(a.Preis) AS PreisMin, MAX(a.Preis) AS PreisMax,
         AVG(a.Preis) AS PreisDurchschnitt, COUNT(a.ArtikelID) AS Anzahl
FROM     Kategorie AS k
         INNER JOIN Artikel AS a ON a.KategorieID = k.KategorieID
WHERE    a.HerstellerID = 6
GROUP BY k.KategorieID, k.Name
HAVING   COUNT(a.ArtikelID) > 10
ORDER BY PreisDurchschnitt DESC;
```

**Auswertungsreihenfolge:** `FROM`/`JOIN` → `WHERE` (Zeilen filtern) → `GROUP BY` (Gruppen bilden) → `HAVING` (Gruppen filtern) → `SELECT` (Spalten, Aggregate, Aliase) → `ORDER BY` (sortieren).

| Baustein | Regel |
|---|---|
| **Aggregatfunktionen** | `COUNT(*)`, `COUNT(spalte)` (ohne NULL), `SUM`, `AVG`, `MIN`, `MAX` |
| **GROUP BY** | alle Spalten im SELECT, die **nicht** aggregiert sind, müssen im GROUP BY stehen |
| **WHERE vs. HAVING** | WHERE filtert **Zeilen** (keine Aggregate erlaubt), HAVING filtert **Gruppen** (mit Aggregaten) |
| **Aliase** | `AS PreisMin` für Spalten, `Kategorie AS k` für Tabellen |
| **Vergleiche** | `=`, `<>`, `<`, `BETWEEN a AND b`, `IN (…)`, `LIKE 'A%'`, `IS NULL` / `IS NOT NULL` (nie `= NULL`) |
| **DISTINCT** | doppelte Ergebniszeilen entfernen |
| **Rechnen** | `SUM(a.Preis * p.Menge) AS Gesamtpreis` |

### JOINs
| JOIN | Ergebnis |
|---|---|
| **INNER JOIN** | nur Zeilen mit passendem Partner in **beiden** Tabellen |
| **LEFT (OUTER) JOIN** | **alle** Zeilen der linken Tabelle, rechts NULL, wenn kein Partner (z. B. Kunden **ohne** Bestellung finden: `WHERE b.BestellID IS NULL`) |
| RIGHT JOIN | alle Zeilen der rechten Tabelle |
| über mehrere Tabellen | Kette: `FROM A JOIN B ON … JOIN C ON …` – jede Verknüpfung über **Fremdschlüssel = Primärschlüssel** |

> [!example] Drei Tabellen
> ```sql
> SELECT   k.Name AS Kategorie, SUM(p.Menge) AS Verkaufsanzahl
> FROM     Position AS p
>          JOIN Artikel AS a ON p.ArtikelID = a.ArtikelID
>          JOIN Kategorie AS k ON a.KategorieID = k.KategorieID
> GROUP BY k.Name
> ORDER BY Verkaufsanzahl DESC;
> ```

### Unterabfragen, UNION, Datum
- **Unterabfrage im WHERE:** `WHERE HerstellerID = (SELECT HerstellerID FROM Hersteller WHERE Bezeichnung = 'Rheintec')` bzw. mit `IN` bei mehreren Werten.
- **Unterabfrage im FROM** (abgeleitete Tabelle): durchschnittliche Anzahl Bestellungen je Kunde:
  `SELECT AVG(Anzahl) FROM (SELECT COUNT(*) AS Anzahl FROM Bestellung GROUP BY KundenID) AS t;`
- **UNION** fügt Ergebnisse zweier SELECTs mit gleicher Spaltenzahl und -typen **untereinander** zusammen; `UNION` entfernt Duplikate, **`UNION ALL`** behält alle. `ORDER BY` steht einmal am Ende.
- **Datumsfunktionen** (dialektabhängig): `YEAR(datum)`, `CURRENT_DATE`/`GETDATE()`, `DATEDIFF(minute, start, ende)` (SQL Server) – in der Prüfung wird jede sinnvolle Schreibweise akzeptiert.

---

## 2. Daten ändern (DML)

```sql
INSERT INTO Kunde (Name, Ort)
VALUES ('Lena Brandt', 'Bonn');

UPDATE Artikel SET Preis = Preis * 1.05
WHERE  HerstellerID = (SELECT HerstellerID FROM Hersteller WHERE Bezeichnung = 'Rheintec');

DELETE FROM Position WHERE BestellID = 4711;
```
- **UPDATE und DELETE immer mit WHERE** – ohne WHERE betrifft es **alle** Zeilen.
- **Archivieren** in zwei Schritten (am besten in einer Transaktion):
```sql
INSERT INTO BestellungArchiv (BestellID, KundenID, Datum)
SELECT BestellID, KundenID, Datum
FROM   Bestellung
WHERE  YEAR(Datum) < YEAR(CURRENT_DATE);

DELETE FROM Bestellung WHERE YEAR(Datum) < YEAR(CURRENT_DATE);
```
- Beim Löschen **abhängige Datensätze** zuerst (oder `ON DELETE CASCADE`), sonst verletzt man die referenzielle Integrität.

---

## 3. Struktur und Rechte (DDL, DCL)

```sql
CREATE TABLE Hersteller (
  HerstellerID INT          PRIMARY KEY,
  Bezeichnung  VARCHAR(30)  NOT NULL,
  Email        VARCHAR(100) UNIQUE
);

ALTER TABLE Kunde ADD COLUMN Vorname VARCHAR(50);
ALTER TABLE Kunde DROP COLUMN Ort;
ALTER TABLE Hersteller MODIFY Email VARCHAR(100) NOT NULL;   -- SQL Server: ALTER COLUMN

GRANT  INSERT, UPDATE ON Shop.Bestellung TO 'vertrieb';
REVOKE INSERT, UPDATE ON Shop.Bestellung FROM 'praktikant';
```
- **Spalte zum Pflichtfeld machen:** zuerst vorhandene `NULL`-Werte per `UPDATE … WHERE Email IS NULL` füllen, **dann** `NOT NULL` setzen – sonst schlägt die Änderung fehl.
- **Spalte aufteilen:** neue Spalten anlegen → per `UPDATE` mit Stringfunktionen befüllen (`SUBSTRING`, `SUBSTRING_INDEX`, `LEFT/RIGHT`) → alte Spalte löschen.
- **Constraints:** `PRIMARY KEY`, `FOREIGN KEY … REFERENCES`, `NOT NULL`, `UNIQUE`, `CHECK (Menge > 0)`, `DEFAULT`.

| Kategorie | Befehle |
|---|---|
| **DDL** (Definition) | CREATE, ALTER, DROP, TRUNCATE |
| **DML** (Manipulation) | INSERT, UPDATE, DELETE (+ SELECT als DQL) |
| **DCL** (Rechte) | GRANT, REVOKE |
| **TCL** (Transaktionen) | BEGIN/START TRANSACTION, COMMIT, ROLLBACK |

| CRUD | SQL |
|---|---|
| Create | INSERT (CREATE für Strukturen) |
| Read | SELECT |
| Update | UPDATE |
| Delete | DELETE |

---

## 4. Weitere Datenbankobjekte

- **Transaktion (ACID):** mehrere Anweisungen als Einheit – **Atomarität** (alles oder nichts), **Konsistenz**, **Isolation**, **Dauerhaftigkeit**. `COMMIT` bestätigt, `ROLLBACK` macht rückgängig (z. B. Archivieren: Kopieren **und** Löschen).
- **View:** gespeicherte Abfrage als virtuelle Tabelle – vereinfacht Zugriffe, schränkt Sichtbarkeit ein.
- **Stored Procedure:** im DBMS gespeicherte Folge von Anweisungen, vom Client aufrufbar (mit Parametern) – weniger Netzverkehr, zentrale Logik, Rechte über Prozeduren.
- **Trigger:** spezielle Prozedur, die **automatisch bei einem Ereignis** (INSERT/UPDATE/DELETE) ausgeführt wird – z. B. Änderungsprotokoll, Plausibilitätsprüfung.
- **Index:** beschleunigt Suchen und Sortieren auf großen Tabellen erheblich; kostet Speicher und verlangsamt Schreibvorgänge.
- **SQL-Injection** verhindern: Prepared Statements (→ [[FIAE-8 Sicherheit in der Softwareentwicklung]]).

---

> [!warning] Typische Fehler in Prüfungen
> - Aggregat im WHERE (`WHERE COUNT(*) >= 3`) – gehört ins **HAVING**.
> - Nicht aggregierte Spalte im SELECT fehlt im GROUP BY.
> - `= NULL` statt `IS NULL`.
> - JOIN ohne ON-Bedingung oder über falsche Spalten.
> - Beim Archivieren nur löschen oder nur kopieren; DELETE ohne WHERE.
> - NOT NULL setzen, bevor die NULL-Werte gefüllt sind.

## Verwandte Themen
- [[FIAE-5 Datenmodellierung und Normalisierung]] – Tabellenmodell und Schlüssel
- [[FISI-8 Datenbanken und Modellierung]] – DB-Betrieb, Index, Locking
- [[FIAE-8 Sicherheit in der Softwareentwicklung]] – Rechte, SQL-Injection
- [[S7 Datenbanken]] – Grundlagen aus AP1

## Zusammenfassung
- SELECT-Reihenfolge: FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.
- INNER JOIN nur Treffer, LEFT JOIN alle links (+ `IS NULL` für „ohne“). Aggregate COUNT/SUM/AVG/MIN/MAX.
- Unterabfrage in WHERE/FROM, UNION (ALL) untereinander, YEAR/DATEDIFF für Datumswerte.
- INSERT, UPDATE/DELETE mit WHERE; Archivieren = INSERT…SELECT + DELETE in einer Transaktion.
- CREATE/ALTER/DROP, Constraints; GRANT/REVOKE; ACID, View, Stored Procedure, Trigger, Index.

## Direkt üben
```dataviewjs
await dv.view("AP2/99 System/views/trainer", { typen: ["sql-ergebnis"] })
```

## Selbstcheck
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { modul: "FIAE-12" })
```

**Weitere Aufgaben:** [[Aufgaben Algorithmen#FIAE-12 SQL für Entwickler]] · **Karteikarten:** [[Karten Algorithmen]]

## Einschätzung
```dataviewjs
await dv.view("AP2/99 System/views/selbstcheck")
```

---
← [[FIAE-11 Testen und Qualitätssicherung]] · Weiter: [[Übersicht WiSo und Projektarbeit]] →
