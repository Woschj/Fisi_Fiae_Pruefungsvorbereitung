---
bereich: Planen eines Softwareproduktes
tags: [ap2/aufgaben, ap2/fiae]
---
# Aufgaben Planen eines Softwareproduktes

Aufgaben im Stil der AP2 „Planen eines Softwareproduktes“ mit Punkten und Musterlösung – eigene Aufgaben, die sich an den Aufgabentypen der AP2-Aufgaben orientieren. Schwierigkeit: ★ Einstieg · ★★ Prüfungsniveau · ★★★ anspruchsvoll.
**Arbeitsweise:** Zeit stoppen (≈ 0,9 Minuten pro Punkt), Diagramme auf Papier zeichnen, dann Lösung aufklappen und selbst bewerten. Fehler → [[AP2 FIAE Fehlerlog]].
Rechen- und Übungsaufgaben: [[AP2 FIAE Trainer]] · Probeprüfungen: [[AP2/FIAE/20 Aufgaben/Pruefungen/Uebersicht FIAE AP2|Probeprüfungen]].

> [!info] Ausgangssituation für alle Aufgaben
> Die **FlexiRad GmbH** (fiktiv) betreibt in Köln 2 000 Leihfahrräder an 80 Stationen. Ein Softwarehaus – Ihr Ausbildungsbetrieb – entwickelt eine neue App mit Backend, über die Kundinnen und Kunden Räder finden, reservieren, ausleihen und bezahlen.

---

## FIAE-1 Projektmanagement in der Softwareentwicklung

### P1.1 ★★ – Stakeholder (6 Punkte)
📘 **Nachlernen:** [[FIAE-1 Projektmanagement in der Softwareentwicklung#Stakeholderanalyse|FIAE-1 › Stakeholderanalyse]]

Nennen Sie drei Stakeholder des Projekts mit je einer Erwartung und einer Befürchtung.

> [!success]- Lösung (je Stakeholder 2 P, Beispiele)
> | Stakeholder | Erwartung | Befürchtung |
> |---|---|---|
> | Kundschaft | schnelle, einfache Ausleihe | Datenmissbrauch (Standortdaten) |
> | Servicepersonal | defekte Räder sofort sichtbar | mehr Arbeit, Überwachung |
> | Geschäftsführung | mehr Ausleihen, weniger Verwaltungskosten | Budget-/Terminüberschreitung |
> | Datenschutzbeauftragte:r | DSGVO-konforme Lösung | unzulässige Bewegungsprofile |
> | Betriebsrat | Beteiligung bei Einführung | Leistungskontrolle der Beschäftigten |

### P1.2 ★★★ – Netzplan (10 Punkte)
📘 **Nachlernen:** [[FIAE-1 Projektmanagement in der Softwareentwicklung#Netzplan|FIAE-1 › Netzplan]]

| Vorgang | Beschreibung | Dauer (Tage) | Vorgänger |
|---|---|---|---|
| A | Anforderungen | 5 | – |
| B | Entwurf | 4 | A |
| C | Backend | 8 | B |
| D | App-Oberfläche | 6 | B |
| E | Integrationstest | 3 | C, D |
| F | Schulungsunterlagen | 2 | D |
| G | Einführung | 1 | E, F |

Berechnen Sie FAZ, FEZ, SAZ, SEZ, Gesamtpuffer und freien Puffer. Geben Sie den kritischen Pfad und die Projektdauer an.

> [!success]- Lösung
> | Vorgang | FAZ | FEZ | SAZ | SEZ | GP | FP |
> |---|---|---|---|---|---|---|
> | A | 0 | 5 | 0 | 5 | 0 | 0 |
> | B | 5 | 9 | 5 | 9 | 0 | 0 |
> | C | 9 | 17 | 9 | 17 | 0 | 0 |
> | D | 9 | 15 | 11 | 17 | 2 | 0 |
> | E | 17 | 20 | 17 | 20 | 0 | 0 |
> | F | 15 | 17 | 18 | 20 | 3 | 3 |
> | G | 20 | 21 | 20 | 21 | 0 | 0 |
> Vorwärts: FAZ = größtes FEZ der Vorgänger. Rückwärts: SEZ = kleinstes SAZ der Nachfolger. GP = SAZ − FAZ; FP = kleinstes FAZ der Nachfolger − FEZ (D: min(17, 15) − 15 = 0).
> **Kritischer Pfad A – B – C – E – G, Dauer 21 Tage.** (Tabelle 7 P, Pfad 2 P, Dauer 1 P)

### P1.3 ★★ – Klassisch oder agil (5 Punkte)
📘 **Nachlernen:** [[FIAE-1 Projektmanagement in der Softwareentwicklung#1. Vorgehensmodelle|FIAE-1 › Vorgehensmodelle]] · [[FIAE-1 Projektmanagement in der Softwareentwicklung#Scrum|FIAE-1 › Scrum]]

Die Anforderungen an die App sind zu Beginn nur grob bekannt, FlexiRad möchte früh testen. Empfehlen Sie ein Vorgehensmodell mit zwei Begründungen und erklären Sie drei Scrum-Artefakte oder -Ereignisse.

> [!success]- Lösung
> - **Agil (Scrum)**, weil sich Anforderungen ändern dürfen und nach jedem Sprint ein nutzbares Inkrement entsteht, das FlexiRad früh ausprobieren kann (2 P)
> - z. B. **Product Backlog** (priorisierte Anforderungsliste des Product Owners), **Sprint Planning** (Auswahl für den Sprint), **Daily Scrum** (15-min-Abstimmung), **Sprint Review** (Inkrement vorführen), **Retrospektive** (Zusammenarbeit verbessern) (3 P)

### P1.4 ★ – Risiken und Maßnahmen (4 Punkte)
📘 **Nachlernen:** [[FIAE-1 Projektmanagement in der Softwareentwicklung#Risiken|FIAE-1 › Risiken]]

Nennen Sie zwei Projektrisiken mit je einer Gegenmaßnahme.

> [!success]- Lösung (je 2 P)
> - Ausfall einer Schlüsselperson → Wissen dokumentieren, Pair Programming, Vertretung
> - Schnittstelle der Schlösser-Hardware ist schlecht dokumentiert → früher Prototyp/Spike, Ansprechpartner beim Hersteller
> - Termindruck → Puffer einplanen, Funktionen priorisieren (MVP)

---

## FIAE-2 Anforderungen und Use Cases

### P2.1 ★★ – Anforderungen einordnen (5 Punkte)
📘 **Nachlernen:** [[FIAE-2 Anforderungen und Use Cases#Funktional und nichtfunktional|FIAE-2 › Funktional und nichtfunktional]]

Ordnen Sie funktional (F) oder nichtfunktional (NF) zu: a) Die App zeigt freie Räder auf einer Karte an. b) Die Karte lädt in unter 2 Sekunden. c) Kunden können eine Reservierung stornieren. d) Die App ist mit Screenreader bedienbar. e) Das System ist zu 99,5 % verfügbar.

> [!success]- Lösung (je 1 P)
> a) F · b) NF (Effizienz) · c) F · d) NF (Benutzbarkeit/Barrierefreiheit) · e) NF (Zuverlässigkeit)

### P2.2 ★★★ – Use-Case-Diagramm (8 Punkte)
📘 **Nachlernen:** [[FIAE-2 Anforderungen und Use Cases#3. Use-Case-Diagramm|FIAE-2 › Use-Case-Diagramm]]

Beschreibung: Kundinnen können Räder suchen, reservieren und ausleihen. Beim Ausleihen wird immer das Rad entsperrt. Wer ein Rad ausleiht, kann optional einen Schaden melden. Servicekräfte bearbeiten Schadensmeldungen. Der Zahlungsdienstleister ist beim Bezahlen beteiligt, das bei jeder Rückgabe erfolgt. Zeichnen Sie das Diagramm (Systemgrenze, Akteure, Anwendungsfälle, Beziehungen).

> [!success]- Lösung
> - **Systemgrenze** „FlexiRad-App“ (1 P)
> - **Akteure:** Kundin (links), Servicekraft, Zahlungsdienstleister (sekundär, rechts) (2 P)
> - **Anwendungsfälle:** Rad suchen, Rad reservieren, Rad ausleihen, Rad entsperren, Schaden melden, Rad zurückgeben, Bezahlen, Schadensmeldung bearbeiten (2 P)
> - **Beziehungen:** Ausleihen `«include»` Entsperren (Pfeil zu Entsperren) · Schaden melden `«extend»` Ausleihen (Pfeil von Schaden melden zu Ausleihen) · Zurückgeben `«include»` Bezahlen · Zahlungsdienstleister–Bezahlen · Servicekraft–Schadensmeldung bearbeiten (3 P)

### P2.3 ★★ – Qualitätsmerkmale (5 Punkte)
📘 **Nachlernen:** [[FIAE-2 Anforderungen und Use Cases#2. Softwarequalität nach ISO/IEC 25010|FIAE-2 › Softwarequalität nach ISO/IEC 25010]]

Nennen Sie fünf Qualitätsmerkmale nach ISO/IEC 25010 mit je einer konkreten Anforderung an die App.

> [!success]- Lösung (je 1 P)
> Funktionale Eignung – Preise korrekt berechnet · Leistungseffizienz – Kartenaufbau < 2 s · Kompatibilität – läuft auf Android und iOS · Benutzbarkeit – Ausleihe in 3 Schritten · Zuverlässigkeit – 99,5 % Verfügbarkeit · Sicherheit – verschlüsselte Übertragung · Wartbarkeit – modulare Architektur, Tests · Übertragbarkeit – Betrieb in anderen Städten

### P2.4 ★ – User Story (3 Punkte)
📘 **Nachlernen:** [[FIAE-2 Anforderungen und Use Cases#User Stories|FIAE-2 › User Stories]]

Formulieren Sie eine User Story mit zwei Akzeptanzkriterien für die Reservierung.

> [!success]- Lösung
> „Als **Pendlerin** möchte ich **ein Rad für 15 Minuten reservieren**, damit **es bei meiner Ankunft an der Station noch frei ist**.“ (1 P)
> Akzeptanzkriterien: Reservierung verfällt automatisch nach 15 min · reserviertes Rad ist für andere nicht auswählbar · Bestätigung in der App (2 P)

---

## FIAE-3 UML Aktivität, Sequenz und Zustand

### P3.1 ★★★ – Zustandsdiagramm (8 Punkte)
📘 **Nachlernen:** [[FIAE-3 UML Aktivität, Sequenz und Zustand#3. Zustandsdiagramm|FIAE-3 › Zustandsdiagramm]]

Ein Rad ist nach der Inbetriebnahme **verfügbar**. Es kann reserviert werden; wird es nicht innerhalb von 15 Minuten ausgeliehen, ist es wieder verfügbar. Aus „verfügbar“ oder „reserviert“ kann es ausgeliehen werden. Bei Rückgabe ist es wieder verfügbar, außer es wurde ein Schaden gemeldet – dann ist es **defekt**. Nach der Reparatur ist es verfügbar. Ausgemusterte defekte Räder erreichen den Endzustand. Im Zustand „ausgeliehen“ wird laufend die Position gesendet.

> [!success]- Lösung
> | Von | Ereignis [Bedingung] | Nach |
> |---|---|---|
> | ● Start | Inbetriebnahme | Verfügbar |
> | Verfügbar | reservieren | Reserviert |
> | Reserviert | after(15 min) | Verfügbar |
> | Verfügbar | ausleihen | Ausgeliehen |
> | Reserviert | ausleihen | Ausgeliehen |
> | Ausgeliehen | zurückgeben [kein Schaden] | Verfügbar |
> | Ausgeliehen | zurückgeben [Schaden gemeldet] | Defekt |
> | Defekt | reparieren | Verfügbar |
> | Defekt | ausmustern | ◉ Ende |
> Im Zustand Ausgeliehen: `do / Position senden`. (Zustände 2 P, Übergänge 5 P, do-Aktivität 1 P)

### P3.2 ★★ – Sequenzdiagramm mit alt (6 Punkte)
📘 **Nachlernen:** [[FIAE-3 UML Aktivität, Sequenz und Zustand#2. Sequenzdiagramm|FIAE-3 › Sequenzdiagramm]]

Beschreiben Sie ein Sequenzdiagramm für „Rad ausleihen“ mit den Lebenslinien App, Backend und Schloss: Die App sendet `ausleihen(radId)`, das Backend prüft die Verfügbarkeit. Ist das Rad frei, sendet es `entsperren()` an das Schloss und bestätigt der App; sonst meldet es einen Fehler.

> [!success]- Lösung
> - Lebenslinien `:App`, `:Backend`, `:Schloss` mit Aktivierungsbalken (1 P)
> - `ausleihen(radId)` App → Backend (synchron, gefüllte Pfeilspitze); Backend ruft sich selbst `pruefeVerfuegbar(radId)` (1 P)
> - **alt-Fragment** mit Wächtern `[frei]` und `[belegt]` (2 P)
> - `[frei]`: `entsperren()` Backend → Schloss, Antwort (gestrichelt) `ok`, dann `bestaetigung` an App · `[belegt]`: `fehler("Rad nicht verfügbar")` an App (2 P)

### P3.3 ★★ – Aktivitätsdiagramm lesen (5 Punkte)
📘 **Nachlernen:** [[FIAE-3 UML Aktivität, Sequenz und Zustand#1. Aktivitätsdiagramm|FIAE-3 › Aktivitätsdiagramm]]

Benennen Sie die Elemente und ihre Bedeutung: a) gefüllter Kreis, b) Raute mit einem Ein- und mehreren Ausgängen, c) dicker Balken mit einem Eingang und mehreren Ausgängen, d) dicker Balken mit mehreren Eingängen, e) Swimlanes.

> [!success]- Lösung (je 1 P)
> a) Startknoten · b) Entscheidung (Verzweigung mit Bedingungen in [ ]) · c) Gabelung (Fork) – ab hier **parallel** · d) Vereinigung (Join) – wartet auf alle parallelen Abläufe · e) Partitionen – zeigen, **wer** die Aktion ausführt

---

## FIAE-4 Objektorientierter Entwurf und Entwurfsmuster

### P4.1 ★★ – Beziehungen im Klassendiagramm (6 Punkte)
📘 **Nachlernen:** [[FIAE-4 Objektorientierter Entwurf und Entwurfsmuster#1. Klassendiagramm|FIAE-4 › Klassendiagramm]]

a) Eine Station hat 0 bis 20 Stellplätze, die ohne Station nicht existieren. b) Eine Station verwaltet beliebig viele Räder, die auch ohne Station existieren. c) E-Bike und Lastenrad sind spezielle Räder. Geben Sie jeweils die Beziehungsart, das UML-Symbol und die Multiplizitäten an.

> [!success]- Lösung
> a) **Komposition** – gefüllte Raute an Station; Station `1` — Stellplatz `0..20` (2 P)
> b) **Aggregation** – leere Raute an Station; Station `0..1` — Rad `*` (2 P)
> c) **Generalisierung/Vererbung** – Pfeil mit leerer Dreiecksspitze von E-Bike bzw. Lastenrad zu Rad (2 P)

### P4.2 ★★ – Entwurfsmuster zuordnen (6 Punkte)
📘 **Nachlernen:** [[FIAE-4 Objektorientierter Entwurf und Entwurfsmuster#3. Entwurfsmuster|FIAE-4 › Entwurfsmuster]]

Welches Muster passt? a) Die App soll informiert werden, sobald sich der Akkustand eines E-Bikes ändert. b) Es darf nur ein Konfigurationsobjekt geben. c) Je nach Radtyp wird ein passendes Objekt erzeugt, ohne dass der Aufrufer die Klasse kennt. d) Eine alte Zahlungsbibliothek mit anderer Schnittstelle soll eingebunden werden. e) Der Tarif (Minuten-, Tages-, Abotarif) soll zur Laufzeit austauschbar sein. f) Nennen Sie die Kategorie von a).

> [!success]- Lösung (je 1 P)
> a) Observer · b) Singleton · c) Factory Method · d) Adapter · e) Strategy · f) Verhaltensmuster (Erzeugungs-, Struktur-, Verhaltensmuster)

### P4.3 ★★ – Abstrakte Klasse oder Interface (4 Punkte)
📘 **Nachlernen:** [[FIAE-4 Objektorientierter Entwurf und Entwurfsmuster#2. OOP-Prinzipien|FIAE-4 › OOP-Prinzipien]]

Erklären Sie zwei Unterschiede zwischen abstrakter Klasse und Interface und entscheiden Sie für „Rad“ (gemeinsame Attribute id, position) und „Bezahlbar“ (Methode `berechnePreis()` für Räder, Abos, Gutscheine).

> [!success]- Lösung
> - Abstrakte Klasse kann **Attribute und implementierte Methoden** enthalten; ein Interface beschreibt nur einen **Vertrag** (Methodensignaturen). Eine Klasse erbt nur von **einer** Klasse, kann aber **mehrere** Interfaces implementieren. (2 P)
> - **Rad** → abstrakte Klasse (gemeinsamer Zustand) · **Bezahlbar** → Interface (fachlich verschiedene Klassen teilen nur die Fähigkeit) (2 P)

---

## FIAE-5 Datenmodellierung und Normalisierung

### P5.1 ★★ – Anomalien erkennen (6 Punkte)
📘 **Nachlernen:** [[FIAE-5 Datenmodellierung und Normalisierung#2. Redundanz, Anomalien, Normalisierung|FIAE-5 › Redundanz, Anomalien, Normalisierung]]

| AusleihNr | KundenNr | Kundenname | RadNr | Station | Stationsadresse |
|---|---|---|---|---|---|
| 1 | 17 | Yilmaz | 305 | Hbf | Bahnhofstr. 1 |
| 2 | 17 | Yilmaz | 412 | Dom | Domplatz 5 |
| 3 | 21 | Becker | 305 | Hbf | Bahnhofstr. 1 |

Erklären Sie am Beispiel Einfüge-, Änderungs- und Löschanomalie und überführen Sie die Tabelle in die 3. Normalform.

> [!success]- Lösung
> - **Einfüge:** Eine neue Station kann erst gespeichert werden, wenn es eine Ausleihe gibt. (1 P)
> - **Änderung:** Ändert sich die Adresse der Station Hbf, muss sie in mehreren Zeilen geändert werden – sonst inkonsistent. (1 P)
> - **Lösch:** Wird Ausleihe 2 gelöscht, geht die Adresse der Station Dom verloren. (1 P)
> - **3. NF:** Kunde (<u>KundenNr</u>, Name) · Station (<u>StationID</u>, Name, Adresse) · Ausleihe (<u>AusleihNr</u>, *KundenNr*, *RadNr*, *StationID*) · ggf. Rad (<u>RadNr</u>, …) (3 P)

### P5.2 ★★★ – Tabellenmodell (8 Punkte)
📘 **Nachlernen:** [[FIAE-5 Datenmodellierung und Normalisierung#ER-Modell in Tabellen überführen|FIAE-5 › ER-Modell in Tabellen überführen]]

Kunden haben genau einen Tarif, ein Tarif gilt für viele Kunden. Kunden leihen Räder aus; zu jeder Ausleihe werden Start, Ende, Start- und Zielstation gespeichert. Räder können viele Schäden haben, ein Schaden gehört zu genau einem Rad und wird von genau einer Servicekraft behoben. Erstellen Sie das Tabellenmodell mit PK, FK und Kardinalitäten.

> [!success]- Lösung
> - **Tarif** (<u>TarifID</u>, Bezeichnung, PreisProMinute)
> - **Kunde** (<u>KundenID</u>, Name, E-Mail, *TarifID*) – Tarif 1 : n Kunde
> - **Station** (<u>StationID</u>, Name, Adresse)
> - **Rad** (<u>RadID</u>, Typ, Akkustand)
> - **Ausleihe** (<u>AusleihID</u>, *KundenID*, *RadID*, Start, Ende, *StartStationID*, *ZielStationID*) – Kunde 1 : n Ausleihe, Rad 1 : n Ausleihe, Station 1 : n Ausleihe (zweimal)
> - **Servicekraft** (<u>MitarbeiterID</u>, Name)
> - **Schaden** (<u>SchadenID</u>, *RadID*, *MitarbeiterID*, Beschreibung, Datum) – Rad 1 : n Schaden, Servicekraft 1 : n Schaden
> je Tabelle 1 P, Kardinalitäten 1 P

### P5.3 ★★ – Speicherbedarf abschätzen (4 Punkte)
📘 **Nachlernen:** [[FIAE-5 Datenmodellierung und Normalisierung#Speicherbedarf abschätzen|FIAE-5 › Speicherbedarf abschätzen]]

Jedes der 2 000 Räder sendet alle 30 Sekunden einen Datensatz mit 64 Byte. Berechnen Sie den Speicherbedarf für ein Jahr (365 Tage) in GiB.

> [!success]- Lösung
> - Datensätze je Rad und Tag: 86 400 s ÷ 30 s = 2 880 (1 P)
> - 2 880 · 2 000 · 64 B · 365 = 134 553 600 000 B (2 P)
> - ÷ 2³⁰ = **125,31 GiB** (1 P)

### P5.4 ★ – NoSQL (4 Punkte)
📘 **Nachlernen:** [[FIAE-5 Datenmodellierung und Normalisierung#4. NoSQL und große Datenmengen|FIAE-5 › NoSQL und große Datenmengen]]

Für die Positionsdaten wird eine NoSQL-Datenbank erwogen. Nennen Sie zwei Vorteile und zwei Nachteile gegenüber einer relationalen Datenbank.

> [!success]- Lösung
> - **Vorteile:** horizontale Skalierung, hoher Schreibdurchsatz, flexibles Schema (z. B. Zeitreihen-/Dokumentdatenbank) (2 P)
> - **Nachteile:** oft keine vollständigen ACID-Transaktionen, keine JOINs/referenzielle Integrität, eigene Abfragesprachen, weniger Know-how im Team (2 P)

---

## FIAE-6 Benutzeroberflächen, Barrierefreiheit und Usability

### P6.1 ★★ – Mockup bewerten (6 Punkte)
📘 **Nachlernen:** [[FIAE-6 Benutzeroberflächen, Barrierefreiheit und Usability#2. Usability|FIAE-6 › Usability]]

Der Entwurf der Registrierungsseite hat: graue Schrift auf hellgrauem Grund, ein Freitextfeld für das Geburtsdatum, keine Pflichtfeldmarkierung, den Button „Abbrechen“ grün und groß, „Registrieren“ klein und grau, Fehlermeldung „Error 17“. Nennen Sie drei Mängel mit Verbesserung.

> [!success]- Lösung (je 2 P)
> - Zu geringer **Kontrast** → mindestens 4,5 : 1 (WCAG)
> - Freitext für Datum → **Datumsauswahl** oder formatiertes Feld mit Beispiel
> - Pflichtfelder nicht erkennbar → mit * und Legende kennzeichnen
> - Hauptaktion schwächer als Nebenaktion → „Registrieren“ als primärer Button hervorheben
> - Unverständliche Meldung → Klartext mit Lösungsweg („Bitte gültige E-Mail-Adresse eingeben“)

### P6.2 ★★ – Barrierefreiheit (6 Punkte)
📘 **Nachlernen:** [[FIAE-6 Benutzeroberflächen, Barrierefreiheit und Usability#3. Barrierefreiheit|FIAE-6 › Barrierefreiheit]]

a) Warum ist Barrierefreiheit für die App auch rechtlich relevant? b) Nennen Sie vier Maßnahmen für Menschen mit Seh- oder Motorikeinschränkungen.

> [!success]- Lösung
> a) Das **Barrierefreiheitsstärkungsgesetz** (BFSG, seit 28.06.2025) verpflichtet u. a. Anbieter von Dienstleistungen im elektronischen Geschäftsverkehr zu barrierefreien Angeboten; Maßstab sind die WCAG-Kriterien. (2 P)
> b) Alternativtexte/Beschriftungen für Screenreader, skalierbare Schrift, ausreichender Kontrast, Information nicht nur über Farbe, große Schaltflächen, Bedienung ohne Zeitdruck, Tastatur-/Sprachsteuerung (4 P)

### P6.3 ★ – Steuerelemente wählen (4 Punkte)
📘 **Nachlernen:** [[FIAE-6 Benutzeroberflächen, Barrierefreiheit und Usability#Steuerelemente passend wählen|FIAE-6 › Steuerelemente passend wählen]]

Wählen Sie ein Steuerelement: a) genau eine von drei Tarifarten, b) beliebig viele Benachrichtigungen, c) Station aus 80 Einträgen, d) Zustimmung zu den AGB.

> [!success]- Lösung (je 1 P)
> a) Radiobuttons · b) Checkboxen bzw. Schalter · c) Dropdown mit Suche/Autovervollständigung · d) einzelne Checkbox (nicht vorausgewählt)

---

## FIAE-7 Schnittstellen, Web und Architektur

### P7.1 ★★ – REST-Schnittstelle (6 Punkte)
📘 **Nachlernen:** [[FIAE-7 Schnittstellen, Web und Architektur#1. REST-API|FIAE-7 › REST-API]] · [[FIAE-7 Schnittstellen, Web und Architektur#Aufbau eines Requests|FIAE-7 › Aufbau eines Requests]]

Die App nutzt die Ressource `/stationen/{id}/raeder`. a) Geben Sie Methode und URL an für: alle Räder der Station 12 lesen, eine Reservierung anlegen, Reservierung 99 stornieren, Akkustand von Rad 305 ändern. b) Erklären Sie zwei Merkmale von REST.

> [!success]- Lösung
> a) `GET /stationen/12/raeder` · `POST /reservierungen` (Daten im Body) · `DELETE /reservierungen/99` · `PATCH /raeder/305` bzw. PUT (je 1 P)
> b) **Zustandslos** (jede Anfrage enthält alle Informationen), **Ressourcen** über eindeutige URIs, einheitliche Schnittstelle über HTTP-Methoden, Repräsentation z. B. als JSON (2 P)

### P7.2 ★★ – HTTP-Statuscodes (5 Punkte)
📘 **Nachlernen:** [[FIAE-7 Schnittstellen, Web und Architektur#HTTP-Statuscodes|FIAE-7 › HTTP-Statuscodes]]

Welcher Statuscode passt? a) Reservierung angelegt, b) Rad-ID existiert nicht, c) Token fehlt, d) Nutzer:in ist angemeldet, darf aber fremde Reservierungen nicht sehen, e) Datenbank nicht erreichbar.

> [!success]- Lösung (je 1 P)
> a) 201 Created · b) 404 Not Found · c) 401 Unauthorized · d) 403 Forbidden · e) 500 Internal Server Error bzw. 503 Service Unavailable

### P7.3 ★★ – Datenformate (4 Punkte)
📘 **Nachlernen:** [[FIAE-7 Schnittstellen, Web und Architektur#2. Datenformate|FIAE-7 › Datenformate]]

Geben Sie eine Station (id 12, name „Hbf“, freie Räder 7) als JSON und als XML an und erklären Sie die Aufgabe einer XSD.

> [!success]- Lösung
> - JSON: `{"id": 12, "name": "Hbf", "freieRaeder": 7}` (1 P)
> - XML: `<station id="12"><name>Hbf</name><freieRaeder>7</freieRaeder></station>` (1 P)
> - **XSD** beschreibt Struktur und Datentypen eines XML-Dokuments; damit lässt sich prüfen, ob ein Dokument **gültig** (valide) ist – nicht nur wohlgeformt. (2 P)

### P7.4 ★ – Netzwerkgrundlagen (4 Punkte)
📘 **Nachlernen:** [[FIAE-7 Schnittstellen, Web und Architektur#4. Netzwerkgrundlagen für Entwickler|FIAE-7 › Netzwerkgrundlagen für Entwickler]]

Nennen Sie Protokoll und Standardport: a) API-Zugriff verschlüsselt, b) Namensauflösung der API-Domain, c) Verbindung zur PostgreSQL-Datenbank, d) Wartungszugang zum Server.

> [!success]- Lösung (je 1 P)
> a) HTTPS, TCP 443 · b) DNS, UDP/TCP 53 · c) PostgreSQL, TCP 5432 · d) SSH, TCP 22

---

## FIAE-8 Sicherheit in der Softwareentwicklung

### P8.1 ★★ – Passwörter speichern (6 Punkte)
📘 **Nachlernen:** [[FIAE-8 Sicherheit in der Softwareentwicklung#3. Passwörter sicher speichern|FIAE-8 › Passwörter sicher speichern]]

Ein Kollege möchte Passwörter mit SHA-256 ohne Salt speichern. Erklären Sie das Problem, die Aufgabe eines Salts und ein besser geeignetes Verfahren.

> [!success]- Lösung
> - Gleiche Passwörter ergeben gleiche Hashes; mit **Rainbow Tables** und schnellen GPU-Angriffen lassen sich SHA-256-Hashes gängiger Passwörter schnell finden. (2 P)
> - **Salt:** zufälliger Wert je Benutzer, der vor dem Hashen angehängt und mit gespeichert wird → gleiche Passwörter ergeben unterschiedliche Hashes, vorberechnete Tabellen nutzen nichts. (2 P)
> - Besser: **langsame** Passwort-Hashverfahren wie **Argon2**, bcrypt oder PBKDF2 mit vielen Iterationen. (2 P)

### P8.2 ★★ – SQL-Injection (6 Punkte)
📘 **Nachlernen:** [[FIAE-8 Sicherheit in der Softwareentwicklung#4. Sichere Programmierung|FIAE-8 › Sichere Programmierung]]

```
sql = "SELECT * FROM kunde WHERE email = '" + eingabe + "'"
```
a) Zeigen Sie mit einer Eingabe, wie ein Angreifer alle Kunden ausliest. b) Beschreiben Sie die richtige Gegenmaßnahme. c) Nennen Sie eine weitere Schutzmaßnahme.

> [!success]- Lösung
> a) `' OR '1'='1` → `WHERE email = '' OR '1'='1'` ist immer wahr (2 P)
> b) **Prepared Statements** mit Parametern: `SELECT … WHERE email = ?`, der Wert wird getrennt übergeben und nie als SQL interpretiert. (2 P)
> c) Eingaben validieren (Whitelist), Datenbankbenutzer mit minimalen Rechten, ORM, Fehlermeldungen ohne Details (2 P)

### P8.3 ★★ – Schutzziele (4 Punkte)
📘 **Nachlernen:** [[FIAE-8 Sicherheit in der Softwareentwicklung#1. Schutzziele|FIAE-8 › Schutzziele]]

Ordnen Sie dem passenden Schutzziel zu: a) Die Befehle an die Schlösser dürfen nicht verändert werden. b) Standortdaten dürfen nur Berechtigte sehen. c) Die Ausleihe muss rund um die Uhr funktionieren. d) Der Befehl muss nachweislich vom Backend stammen.

> [!success]- Lösung (je 1 P)
> a) Integrität · b) Vertraulichkeit · c) Verfügbarkeit · d) Authentizität (Verbindlichkeit)

### P8.4 ★ – Datenschutz in der App (4 Punkte)
📘 **Nachlernen:** [[FIAE-8 Sicherheit in der Softwareentwicklung#5. Datenschutz in Anwendungen|FIAE-8 › Datenschutz in Anwendungen]]

Erklären Sie „Privacy by Design“ und „Privacy by Default“ mit je einem Beispiel für die Standortdaten.

> [!success]- Lösung
> - **Privacy by Design:** Datenschutz schon in der Architektur berücksichtigen – z. B. Positionsdaten nur während der Ausleihe erheben und nach Abrechnung pseudonymisieren/löschen. (2 P)
> - **Privacy by Default:** datenschutzfreundliche Voreinstellungen – z. B. Standortfreigabe für Werbung oder Statistik ist standardmäßig **aus** und muss aktiv eingeschaltet werden. (2 P)

---
← [[AP2 FIAE Start]] · [[Übersicht FIAE Planen eines Softwareproduktes]]


