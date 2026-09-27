---
tags: [ap2/nachschlagen, ap2/fiae]
---
# AP2 FIAE – Formelsammlung und Schemata

Rechenwege und feste Schemata aus den FIAE-AP2-Aufgaben. In der Prüfung gibt es keine Formelsammlung – nur einen nicht programmierbaren Taschenrechner. Üben: [[AP2 FIAE Trainer]].

## Netzplan

| Größe | Berechnung |
|---|---|
| FAZ | größtes FEZ aller Vorgänger (Start: 0) |
| FEZ | FAZ + Dauer |
| SEZ | kleinstes SAZ aller Nachfolger (Ende: FEZ des letzten Vorgangs) |
| SAZ | SEZ − Dauer |
| Gesamtpuffer | SAZ − FAZ |
| Freier Puffer | kleinstes FAZ der Nachfolger − FEZ |
| Kritischer Pfad | alle Vorgänge mit Gesamtpuffer 0 |

→ [[FIAE-1 Projektmanagement in der Softwareentwicklung#Netzplan|FIAE-1 › Netzplan]]

## Speicherbedarf

- Datensätze = Anzahl Quellen · Messungen je Zeiteinheit · Zeitraum
- Bytes = Datensätze · Größe je Datensatz
- Bild: Breite · Höhe · Farbtiefe (Bit) ÷ 8 · (1 − Kompression)
- Umrechnung: KiB = 2¹⁰, MiB = 2²⁰, GiB = 2³⁰, TiB = 2⁴⁰ Byte · 1 Tag = 86 400 s

→ [[FIAE-5 Datenmodellierung und Normalisierung#Speicherbedarf abschätzen|FIAE-5 › Speicherbedarf abschätzen]]

## Datentypen

| Typ | Größe | Bereich |
|---|---|---|
| byte | 8 Bit | −128 bis 127 |
| short | 16 Bit | −32 768 bis 32 767 |
| int | 32 Bit | ca. ±2,1 Milliarden |
| long | 64 Bit | ca. ±9,2 · 10¹⁸ |
| float / double | 32 / 64 Bit | Gleitkomma – nicht für Geld |
| BigDecimal / DECIMAL | variabel | exakte Dezimalzahlen (Geld) |

→ [[FIAE-10 Objektorientierte Programmierung umsetzen#4. Datentypen|FIAE-10 › Datentypen]]

## Ganzzahlen

- `a div b` bzw. `/` bei int: Ganzzahldivision · `a mod b` bzw. `%`: Rest
- Stunden und Minuten: `h = min div 60`, `m = min mod 60`
- Angefangene Blöcke: `x div b`, plus 1, wenn `x mod b ≠ 0`
- Gerade Zahl: `x mod 2 == 0`

→ [[FIAE-9 Algorithmen in Pseudocode#Ganzzahldivision und Modulo|FIAE-9 › Ganzzahldivision und Modulo]]

## Laufzeiten

| Verfahren | Laufzeit |
|---|---|
| Lineare Suche | O(n) |
| Binäre Suche (sortiert) | O(log n) |
| Bubblesort, Selection Sort, Insertion Sort | O(n²) |
| Quicksort (Mittel), Mergesort | O(n · log n) |

→ [[FIAE-9 Algorithmen in Pseudocode#3. Sortieren und Suchen|FIAE-9 › Sortieren und Suchen]]

## Testabdeckung

| Überdeckung | Minimale Testfälle |
|---|---|
| Anweisungen (C0) | jede Anweisung einmal – oft 1 Testfall, wenn alle `wenn`-Zweige wahr sein können |
| Zweige (C1) | jede Bedingung einmal wahr und einmal falsch |
| Pfade | alle Kombinationen – bei k unabhängigen `wenn` ohne `sonst` bis zu 2ᵏ |

Grenzwerte bei gültigem Bereich a bis b: **a − 1, a, b, b + 1**.

→ [[FIAE-11 Testen und Qualitätssicherung#Überdeckungsarten|FIAE-11 › Überdeckungsarten]]

## SQL-Schema

```sql
SELECT spalten, AGGREGAT(spalte) AS alias
FROM tabelle1 t1
  [INNER|LEFT] JOIN tabelle2 t2 ON t1.fk = t2.pk
WHERE zeilenbedingung
GROUP BY nicht-aggregierte Spalten
HAVING gruppenbedingung
ORDER BY spalte [ASC|DESC];
```

Logische Reihenfolge: FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.

| Aufgabe | Muster |
|---|---|
| Datensatz anlegen | `INSERT INTO t (a, b) VALUES (…, …)` |
| Ändern | `UPDATE t SET a = … WHERE …` |
| Löschen | `DELETE FROM t WHERE …` |
| Archivieren | `INSERT INTO archiv SELECT … WHERE …` + `DELETE … WHERE …` in einer Transaktion |
| Ohne Partner | `LEFT JOIN … WHERE rechts.id IS NULL` |
| Über Durchschnitt | `WHERE x > (SELECT AVG(x) FROM t)` |
| Rechte | `GRANT SELECT, INSERT ON t TO benutzer` · `REVOKE … FROM …` |
| Spalte ergänzen | `ALTER TABLE t ADD spalte TYP` |

→ [[FIAE-12 SQL für Entwickler#1. SELECT Schritt für Schritt|FIAE-12 › SELECT Schritt für Schritt]]

## HTTP

| Klasse | Bedeutung | Häufige Codes |
|---|---|---|
| 2xx | Erfolg | 200 OK, 201 Created, 204 No Content |
| 3xx | Umleitung | 301, 302, 304 Not Modified |
| 4xx | Clientfehler | 400, 401, 403, 404, 409 Conflict |
| 5xx | Serverfehler | 500, 502, 503 |

CRUD: POST – GET – PUT/PATCH – DELETE → [[FIAE-7 Schnittstellen, Web und Architektur#HTTP-Statuscodes|FIAE-7 › HTTP-Statuscodes]]

## Projekt und Wirtschaft

| Rechnung | Formel |
|---|---|
| Nutzwert | Σ Gewichtung · Punkte |
| Amortisation | Investition ÷ Ersparnis je Periode |
| Personalkosten | Stunden · Stundensatz |

→ [[PA-1 Projektantrag, Durchführung und Dokumentation#4. Wirtschaftlichkeit|PA-1 › Wirtschaftlichkeit]]

← [[AP2 FIAE Start]]
