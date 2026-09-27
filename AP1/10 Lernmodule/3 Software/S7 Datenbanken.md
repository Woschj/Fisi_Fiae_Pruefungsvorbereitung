---
modul: S7
titel: Datenbanken
bereich: Software
reihenfolge: 20
dauer: 90
status: neu
sicherheit: 0
zuletzt:
berufsschule: "LF5 (Software zur Verwaltung von Daten anpassen) – Grundlagen"
tags: [ap1/modul, ap1/software]
---
# S7 · Datenbanken

> [!warning] AP1-Hinweis (Prüfungskatalog 2025)
> ER-Modell, Kardinalitäten, Tabellen und Redundanz/Anomalien gehören zur AP1-Vorbereitung. Die AkA ordnet **SQL ausschließlich der AP2** zu. SQL-Grundlagen unten sind optionale Vertiefung, keine AP1-Pflicht. [[Prüfung AP1]]

> [!abstract] Überblick
> **Bereich:** [[Übersicht Software]]
> **Dauer:** ca. 90 min · **Prüfungsrelevanz:** ★★☆ – ER-Modell lesen/ergänzen, Kardinalitäten bestimmen, Tabellen mit Schlüsseln ableiten
> **Voraussetzungen:** [[S2 Programmierung – Grundlagen]] (Datentypen)
> **Berufsschule:** Lernfeld 5 – im 1. Lehrjahr meist nur angerissen, in der AP1 aber als Modellierungsaufgabe möglich

## Lernziele
- [ ] Ich kann erklären, wozu ein Datenbankmanagementsystem dient und welche Aufgaben es übernimmt.
- [ ] Ich kann ein ER-Modell in Chen-Notation lesen und ergänzen (Entitätstyp, Attribut, Beziehung, Kardinalität).
- [ ] Ich kann Kardinalitäten (1:1, 1:n, n:m) sicher bestimmen.
- [ ] Ich kann ein ER-Modell in Tabellen mit Primär- und Fremdschlüsseln überführen.
- [ ] Ich kann Redundanz und Anomalien erklären und begründen, warum man Tabellen aufteilt.
- [ ] Ich kann einfache SQL-Abfragen lesen und schreiben.

## Worum geht es?
Ein Handwerksbetrieb verwaltet Kunden, Aufträge und Material in einer riesigen Excel-Liste. Jede Zeile enthält Kundenname, Adresse und Auftrag – ändert ein Kunde seine Adresse, müssen zwanzig Zeilen angepasst werden, und irgendwann stimmen die Daten nicht mehr. Eine **relationale Datenbank** löst das: Jede Information steht nur **einmal** da und wird über **Schlüssel** verknüpft.

---

## 1. Datenbank und DBMS
- **Datenbank (DB):** strukturierte Sammlung zusammengehöriger Daten.
- **Datenbankmanagementsystem (DBMS):** Software, die die Datenbank verwaltet – z. B. MariaDB/MySQL, PostgreSQL, Microsoft SQL Server, SQLite.
- **Datenbanksystem (DBS)** = Datenbank + DBMS.

| Aufgabe des DBMS | Bedeutung |
|---|---|
| **Datenintegrität** | Regeln prüfen: Datentypen, Pflichtfelder, eindeutige Schlüssel, gültige Verweise (referenzielle Integrität) |
| **Mehrbenutzerbetrieb** | viele greifen gleichzeitig zu, ohne sich gegenseitig Daten zu überschreiben (Sperren, **Transaktionen**) |
| **Zugriffsschutz** | Benutzer und Rechte (wer darf lesen, ändern, löschen?) |
| **Datensicherheit** | Protokoll (Log), Backup und Wiederherstellung nach Absturz |
| **Abfragesprache** | Daten mit **SQL** suchen, einfügen, ändern, löschen |
| **Datenunabhängigkeit** | Programme müssen nicht wissen, wie die Daten auf der Platte liegen |

**Transaktion:** eine Folge von Änderungen, die **ganz oder gar nicht** ausgeführt wird (Beispiel Überweisung: Abbuchung und Gutschrift gehören zusammen). Eigenschaften: **ACID** – Atomarität, Konsistenz, Isolation, Dauerhaftigkeit.

## 2. Das ER-Modell (Entity-Relationship)
Vor dem Anlegen der Tabellen wird die Datenwelt **modelliert**. In der Prüfung ist die **Chen-Notation** üblich:

<!-- abb:er-modell -->
![[er-modell.svg]]
*Abb.: ER-Modell in Chen-Notation*

| Begriff | Bedeutung | Symbol |
|---|---|---|
| **Entität** | ein konkretes Objekt, z. B. der Kunde „Müller GmbH“ | – |
| **Entitätstyp** | Gruppe gleichartiger Entitäten, z. B. *Kunde* | **Rechteck** |
| **Attribut** | Eigenschaft, z. B. *Name*, *Ort* | **Ellipse** |
| **Schlüsselattribut** | identifiziert eine Entität eindeutig, z. B. *KundenNr* | Ellipse, **unterstrichen** |
| **Beziehungstyp** | Zusammenhang zwischen Entitätstypen, meist mit einem **Verb** benannt | **Raute** |
| **Kardinalität** | wie viele Entitäten an einer Beziehung beteiligt sind | **1, n, m** an den Linien |

### Kardinalitäten
| Kardinalität | Bedeutung | Beispiel |
|---|---|---|
| **1:1** | einer gehört zu genau einem | Mitarbeiter – Dienstlaptop (wenn jeder genau einen hat) |
| **1:n** | einer hat viele, jeder davon gehört zu genau einem | Kunde – Auftrag |
| **n:m** | viele zu vielen | Auftrag – Artikel (ein Auftrag enthält viele Artikel, ein Artikel kommt in vielen Aufträgen vor) |

> [!tip] So bestimmst du die Kardinalität sicher
> Lies die Beziehung **in beide Richtungen** als Satz – jeweils mit „**ein**“ am Anfang:
> 1. „**Ein** Kunde erteilt **wie viele** Aufträge?“ → **mehrere** (n)
> 2. „**Ein** Auftrag wird von **wie vielen** Kunden erteilt?“ → **genau einem** (1)
>
> Die Zahl schreibst du **an die gegenüberliegende Seite**: n steht beim Auftrag, 1 beim Kunden → **1:n**. Beide Sätze in der Prüfung ruhig mit aufschreiben – das zeigt den Denkweg.

**Beziehungsattribute:** Ein Attribut, das weder zur einen noch zur anderen Entität allein gehört, hängt an der **Beziehung**. Beispiel: Die *Menge* gehört weder zum Auftrag (der hat viele Artikel) noch zum Artikel (der steckt in vielen Aufträgen), sondern zur Kombination „dieser Artikel in diesem Auftrag“.

> [!question]- Kurz nachgedacht: Mitarbeiter und Schulung – welche Kardinalität, und wo gehört das Attribut „Teilnahmedatum“ hin?
> Ein Mitarbeiter besucht **mehrere** Schulungen, eine Schulung hat **mehrere** Teilnehmer → **n:m**. Das Teilnahmedatum gehört an die **Beziehung** „besucht“, denn es beschreibt die Teilnahme eines bestimmten Mitarbeiters an einer bestimmten Schulung.

## 3. Vom ER-Modell zu Tabellen (relationales Modell)
In einer relationalen Datenbank liegen die Daten in **Tabellen** (Relationen): Spalten = Attribute, Zeilen = Datensätze (Tupel).

<!-- abb:tabellenmodell -->
![[tabellenmodell.svg]]
*Abb.: Tabellenmodell mit Primär- und Fremdschlüsseln*

| Begriff | Bedeutung |
|---|---|
| **Primärschlüssel (PK)** | Spalte(n), die jede Zeile **eindeutig** identifizieren – darf nicht leer sein und sich nicht wiederholen. Oft eine fortlaufende Nummer (künstlicher Schlüssel). |
| **Fremdschlüssel (FK)** | Spalte, die auf den **Primärschlüssel einer anderen Tabelle** verweist und so die Beziehung herstellt |
| **zusammengesetzter Schlüssel** | PK aus mehreren Spalten, z. B. (auftrag_nr, art_nr) in einer Zwischentabelle |
| **referenzielle Integrität** | Ein FK darf nur auf existierende Datensätze zeigen – das DBMS verhindert z. B. einen Auftrag für einen nicht existierenden Kunden |

**Überführungsregeln:**
| Beziehung | Umsetzung |
|---|---|
| **1:n** | Der Primärschlüssel der **1-Seite** wird als **Fremdschlüssel** in die Tabelle der **n-Seite** aufgenommen (kunden_nr kommt in *auftrag*). |
| **n:m** | Eigene **Zwischentabelle** (Verbindungstabelle) mit den Primärschlüsseln beider Tabellen als Fremdschlüssel; zusammen bilden sie den Primärschlüssel. Beziehungsattribute (menge) kommen in die Zwischentabelle. |
| **1:1** | FK in eine der beiden Tabellen (mit Eindeutigkeit) – oder beide Tabellen zusammenlegen |

**Schreibweise im Text** (häufig in Prüfungen): Primärschlüssel unterstrichen, Fremdschlüssel mit ↑ oder # markiert:
- Kunde(<u>KundenNr</u>, Name, Ort)
- Auftrag(<u>AuftragNr</u>, Datum, ↑KundenNr)
- Position(<u>↑AuftragNr, ↑ArtNr</u>, Menge)
- Artikel(<u>ArtNr</u>, Bezeichnung, Preis)

## 4. Redundanz, Anomalien und Normalisierung
**Redundanz** = dieselbe Information ist mehrfach gespeichert. Folgen sind **Anomalien**:

| Anomalie | Beispiel in einer Tabelle „Auftrag mit Kundendaten“ |
|---|---|
| **Änderungsanomalie** | Kunde zieht um → Adresse muss in allen seinen Aufträgen geändert werden; wird eine Zeile vergessen, sind die Daten widersprüchlich |
| **Einfügeanomalie** | Ein neuer Kunde kann erst gespeichert werden, wenn er einen Auftrag hat |
| **Löschanomalie** | Löscht man den einzigen Auftrag eines Kunden, sind auch seine Kundendaten weg |

**Normalisierung** zerlegt Tabellen schrittweise, bis jede Information nur einmal steht:
| Normalform | Regel (vereinfacht) | typischer Verstoß |
|---|---|---|
| **1. NF** | Jede Zelle enthält nur **einen** (atomaren) Wert, keine Wiederholungsgruppen | Spalte „Telefon“ mit „0351 123, 0171 456“ oder „Name“ mit Vor- und Nachname, obwohl getrennt gesucht wird |
| **2. NF** | 1. NF + jedes Nicht-Schlüssel-Attribut hängt vom **ganzen** Primärschlüssel ab | In *Position(<u>AuftragNr, ArtNr</u>, Menge, Artikelbezeichnung)* hängt die Bezeichnung nur von ArtNr ab → gehört in *Artikel* |
| **3. NF** | 2. NF + kein Nicht-Schlüssel-Attribut hängt von einem anderen Nicht-Schlüssel-Attribut ab | In *Kunde(<u>KundenNr</u>, PLZ, Ort)* hängt Ort von PLZ ab (in der Praxis oft bewusst toleriert) |

> [!tip] Faustregel für die Prüfung
> „Jede Information gehört in genau **eine** Tabelle, und zwar in die, deren Schlüssel sie beschreibt.“ Wiederholen sich in einer Tabelle Werte wie Kundenname oder Artikelbezeichnung, fehlt eine eigene Tabelle.

<!-- erg:Katalog SQL -->
> [!note] Prüfungskatalog ab 2025
> **SQL-Abfragen** sind laut AkA in der zweiten Katalogauflage AP2-Thema. **ER-Modell, Kardinalitäten, Tabellen und Redundanz/Anomalien** bilden hier die AP1-nahe Vertiefung; für den genauen Umfang den aktuellen Katalog des eigenen Ausbildungsberufs prüfen. [[Prüfung AP1]]

## 5. SQL-Grundlagen
**SQL** (Structured Query Language) ist die Standardsprache relationaler Datenbanken.

| Bereich | Befehle |
|---|---|
| Abfragen (DQL) | `SELECT` |
| Daten ändern (DML) | `INSERT`, `UPDATE`, `DELETE` |
| Struktur (DDL) | `CREATE TABLE`, `ALTER TABLE`, `DROP TABLE` |
| Rechte (DCL) | `GRANT`, `REVOKE` |

```sql
-- Alle Kunden aus Dresden, alphabetisch
SELECT name, ort FROM kunde WHERE ort = 'Dresden' ORDER BY name;

-- Anzahl Aufträge je Kunde (nur Kunden mit mehr als 2 Aufträgen)
SELECT k.name, COUNT(*) AS anzahl
FROM kunde k JOIN auftrag a ON a.kunden_nr = k.kunden_nr
GROUP BY k.name
HAVING COUNT(*) > 2;

-- Neuen Artikel anlegen, Preis ändern, Artikel löschen
INSERT INTO artikel (art_nr, bezeichnung, preis) VALUES (4711, 'Dockingstation', 189.00);
UPDATE artikel SET preis = 179.00 WHERE art_nr = 4711;
DELETE FROM artikel WHERE art_nr = 4711;
```

- **WHERE** filtert Zeilen, **ORDER BY** sortiert (ASC/DESC), **JOIN … ON** verknüpft Tabellen über PK = FK.
- **Aggregatfunktionen:** `COUNT`, `SUM`, `AVG`, `MIN`, `MAX` – mit **GROUP BY** je Gruppe, **HAVING** filtert Gruppen.
- `UPDATE`/`DELETE` **ohne WHERE** betreffen **alle** Zeilen – typischer, teurer Fehler.
- Eingaben aus Formularen nie direkt in SQL einsetzen → **SQL-Injection**, Schutz durch **Prepared Statements** ([[I5 Bedrohungen und Schutzmaßnahmen]]).

## 6. ER-Modell, Tabellenmodell, Klassendiagramm – was ist was?
| Modell | Zweck | Wann |
|---|---|---|
| **ER-Modell** | fachliche Datenwelt verstehen: Entitäten, Beziehungen, Kardinalitäten | Analyse, mit dem Fachbereich |
| **Tabellenmodell** (relationales Modell) | konkrete Tabellen mit Schlüsseln | technischer Entwurf der Datenbank |
| **UML-Klassendiagramm** | Klassen mit Attributen **und Methoden** für die Programmierung | Softwareentwurf ([[S8 UML und Softwareentwurf]]) |

---

> [!warning] Typische Fehler in Prüfungen
> - Kardinalität nur aus einer Richtung bestimmt – immer beide Sätze bilden.
> - Bei n:m den Fremdschlüssel einfach in eine der beiden Tabellen schreiben statt eine Zwischentabelle anzulegen.
> - Bei 1:n den Fremdschlüssel auf die 1-Seite setzen (richtig: auf die **n-Seite**).
> - Beziehungsattribute (Menge, Datum der Teilnahme) einer Entität zuordnen.
> - Verben/Tätigkeiten als Entitätstyp modellieren („Bestellen“ ist eine Beziehung, kein Entitätstyp).
> - `UPDATE` oder `DELETE` ohne `WHERE`.

## Verwandte Themen
- [[S8 UML und Softwareentwurf]] – Klassendiagramm statt ER-Modell
- [[I5 Bedrohungen und Schutzmaßnahmen]] – SQL-Injection verhindern
- [[I2 Datenschutz]] – personenbezogene Daten speichern

## Zusammenfassung
- DBMS: Integrität, Mehrbenutzerbetrieb (Transaktionen, ACID), Zugriffsschutz, Sicherung, SQL.
- ER-Modell (Chen): Rechteck = Entitätstyp, Ellipse = Attribut (Schlüssel unterstrichen), Raute = Beziehung, Kardinalität 1/n/m.
- Kardinalität: beide Richtungen als Satz lesen.
- 1:n → FK auf die n-Seite · n:m → Zwischentabelle mit beiden FKs (+ Beziehungsattribute).
- Redundanz führt zu Änderungs-, Einfüge- und Löschanomalien → Normalisierung (1. bis 3. NF).
- SQL: SELECT … FROM … WHERE … ORDER BY, JOIN über PK = FK, GROUP BY/HAVING, INSERT/UPDATE/DELETE.

## Selbstcheck
```dataviewjs
await dv.view("AP1/99 System/views/quiz", { modul: "S7" })
```

**Weitere Aufgaben:** [[Aufgaben Software#S7 Datenbanken]] · **Karteikarten:** [[Karten Software]]

## Einschätzung
```dataviewjs
await dv.view("AP1/99 System/views/selbstcheck")
```

---
← [[S6 Software beschaffen und lizenzieren]] · Weiter: [[S8 UML und Softwareentwurf]] →
