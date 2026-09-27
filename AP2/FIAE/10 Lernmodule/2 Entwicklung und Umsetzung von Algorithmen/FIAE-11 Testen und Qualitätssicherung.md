---
modul: FIAE-11
titel: Testen und Qualitätssicherung
bereich: Algorithmen
pruefungsteil: "AP2 Teil 2 – Entwicklung und Umsetzung von Algorithmen"
reihenfolge: 11
dauer: 150
status: neu
sicherheit: 0
zuletzt:
tags: [ap2/modul, ap2/fiae]
---
# FIAE-11 · Testen und Qualitätssicherung

> [!abstract] Überblick
> **Bereich:** [[Übersicht FIAE Algorithmen]]
> **Prüfung:** „Entwicklung und Umsetzung von Algorithmen“ – meist eine ganze Aufgabe (20–25 Punkte)
> **Dauer:** ca. 150 min · **Prüfungsrelevanz:** ★★★ – Überdeckungsarten und Pfade, Unit-Tests und F.I.R.S.T., Testtabelle mit erwarteten Ergebnissen und Fehlerstellen, White- vs. Black-Box, Regressionstest
> **Grundlagen aus AP1:** [[S3 Algorithmen, Darstellung und Testen]] · [[P3 IT-Service, Support und Qualität]]

## Lernziele
- [ ] Ich kann Teststufen und Testarten (Unit-, Integrations-, System-, Abnahme-, Regressionstest) einordnen.
- [ ] Ich kann White-Box- und Black-Box-Tests vergleichen und passend einsetzen.
- [ ] Ich kann Anweisungs-, Zweig- und Pfadüberdeckung erklären, Pfade eines Codes bestimmen und Testfälle ableiten.
- [ ] Ich kann Testfälle mit Äquivalenzklassen und Grenzwerten bilden und eine Testtabelle (Eingabe, Soll, Ist) ausfüllen.
- [ ] Ich kann Unit-Tests nach F.I.R.S.T. schreiben und Fehler im Code lokalisieren.

## So wird das geprüft
> [!info] Typische AP2-Aufgabentypen
> - **Vorteile von White-Box-Tests**, **Regressionstest** erklären, **Anweisungs-, Zweig- und Pfadüberdeckung** beschreiben und **alle Pfade** eines Codes angeben.
> - **Geeignete Überdeckung wählen und begründen**, White-Box erklären, **Sonderfall „nur Leerzeichen“** behandeln.
> - **Unit-Test erklären, F.I.R.S.T.-Prinzipien**, Testergebnisse OK/Fehler zuordnen, **Testfälle mit Grenzwerten** ergänzen.
> - **Testabdeckung**, Testtabelle mit **erwartetem vs. tatsächlichem Ergebnis**, **fehlerhafte Zeilen** finden.
> - **Black-Box vs. White-Box**, Grenzen automatisierter Tests.

---

## 1. Teststufen und Testarten

| Stufe | prüft | wer |
|---|---|---|
| **Unit-/Modultest** | einzelne Methode/Klasse isoliert (Abhängigkeiten per Mock/Stub ersetzt) | Entwickler, automatisiert |
| **Integrationstest** | Zusammenspiel von Komponenten und Schnittstellen | Entwickler/Tester |
| **Systemtest** | Gesamtsystem gegen die Anforderungen (funktional und nichtfunktional) | Testteam |
| **Abnahmetest** | Erfüllung des Vertrags/Pflichtenhefts aus Kundensicht | Auftraggeber → **Abnahmeprotokoll** |

| Testart | Bedeutung |
|---|---|
| **Regressionstest** | nach Änderungen, Optimierungen oder Fehlerbehebungen prüfen, dass **bestehende Funktionen weiterhin funktionieren** – meist automatisiert |
| Last-/Performancetest | Verhalten unter hoher Last |
| Usability-Test | Bedienbarkeit mit echten Nutzern |
| Sicherheitstest / Penetrationstest | Schwachstellen |
| Smoke-Test | schnelle Grundprüfung nach dem Deployment |

---

## 2. White-Box und Black-Box

| | **White-Box** (strukturorientiert) | **Black-Box** (funktionsorientiert) |
|---|---|---|
| Grundlage | **Quellcode** – Testdaten aus der Programmstruktur | **Spezifikation** – innere Struktur unbekannt |
| wer | Entwickler | Tester, Anwender, die nicht entwickelt haben |
| Methoden | **Überdeckungstests** (Anweisung, Zweig, Pfad), Code-Review | **Äquivalenzklassen**, **Grenzwertanalyse**, Entscheidungstabellen, Anwendungsfälle |
| Vorteile | Fehler genau lokalisierbar, auch nicht spezifizierte Programmteile werden getestet, hohe Codeabdeckung, hilft beim Optimieren | findet fehlende Funktionen und Abweichungen von den Anforderungen, unabhängig von der Implementierung |
| Nachteile | Code muss offengelegt werden, aufwendig bei großen Programmen, findet **fehlende** Funktionen nicht | Qualität hängt stark von der Auswahl der Testdaten ab, Fehlerursache nicht lokalisiert |

### Überdeckungsarten
| Überdeckung | Ziel | Stärke |
|---|---|---|
| **Anweisungsüberdeckung (C0)** | jede **Anweisung** mindestens einmal ausführen | schwächste |
| **Zweigüberdeckung (C1)** | jeder **Zweig** jeder Bedingung (wahr **und** falsch) mindestens einmal | beinhaltet C0 |
| **Pfadüberdeckung (C2)** | jeder mögliche **Weg** vom Start zum Ende | beinhaltet C1 – bei Schleifen meist **nicht vollständig erreichbar** (unendlich viele Pfade) |

Überdeckungsgrad = ausgeführte Elemente ÷ alle Elemente × 100 %.

> [!example] Pfade bestimmen
> ```
> B1: wenn liste leer        → A2: gib Standardwert zurück
>     sonst                  → A1: verarbeite …
>         B2: wenn Sonderfall → A3: …
>         B3: wenn Abschluss  → A4: …
> ```
> Pfade: (B1, A2) · (B1, A1, B2, A3, B3, A4) · (B1, A1, B2, B3, A4) · (B1, A1, B2, A3, B3) · (B1, A1, B2, B3) → **5 Pfade**. Für Zweigüberdeckung reichen weniger Testfälle, solange jeder Zweig einmal wahr und einmal falsch war.

**Optionale Anweisung (`if` ohne `else`)** – Anweisungsüberdeckung kann den leeren Zweig übersehen → **Zweigüberdeckung** wählen.

---

## 3. Testfälle entwerfen

**Äquivalenzklassen:** Eingaben in Gruppen teilen, die sich gleich verhalten; je Klasse **ein Vertreter** – **gültige und ungültige** Klassen.
**Grenzwertanalyse:** Fehler liegen oft an den Rändern → Werte **an, direkt unter und direkt über** jeder Grenze testen.

> [!example] Rabatt ab 100 €, 10 % ab 500 €
> Klassen: < 0 (ungültig) · 0 – 99,99 · 100 – 499,99 · ≥ 500 · keine Zahl (ungültig).
> Grenzwerte: −0,01 · 0 · 99,99 · 100 · 499,99 · 500.

**Sonderfälle nicht vergessen:** leere Liste / `null` · genau ein Element · nur negative Werte · doppelte Werte · sehr große Werte (Überlauf) · leere Zeichenkette und **nur Leerzeichen** (wie leer behandeln → Standard plus Hinweis) · Datumsgrenzen (Monatsende, Schaltjahr).

### Testtabelle
| Nr. | Testdaten | erwartetes Ergebnis | tatsächliches Ergebnis | Befund |
|---|---|---|---|---|
| 1 | `{10, 20, 30, 5, 17}` | 5 | 0 | **Fehler**: Minimum mit 0 statt mit `werte[0]` gestartet |
| 2 | `{10, −10, −20, −20, 30}` | −20 | −20 | OK (nur negative Minima fallen nicht auf) |
| 3 | `{10, 18, 30, 20, −15, −25}` | −25 | −15 | **Fehler**: letztes Element nicht geprüft (Schleife `< length − 1`) |
| 4 | `{−3}` | −3 | 0 | **Fehler** (siehe 1) |
| 5 | `null` | Exception „Array nicht auswertbar.“ | Exception | OK |

---

## 4. Unit-Tests

Ein **Unit-Test** prüft eine kleine Einheit (Methode) automatisiert: **Arrange** (Testdaten vorbereiten) – **Act** (Methode aufrufen) – **Assert** (Ergebnis mit Erwartung vergleichen). Frameworks: JUnit, NUnit/xUnit, pytest.

**F.I.R.S.T.-Prinzipien:**
- **Fast** – schnell, damit man sie oft ausführt
- **Independent** – unabhängig voneinander, beliebige Reihenfolge
- **Repeatable** – bei jeder Ausführung dasselbe Ergebnis (keine Abhängigkeit von Zeit, Netz, Zufall)
- **Self-Validating** – Test entscheidet selbst bestanden/fehlgeschlagen, keine manuelle Prüfung
- **Timely** – rechtzeitig, idealerweise **vor** dem Produktivcode (TDD)

**Test-Driven Development:** Red (Test schreiben, schlägt fehl) → Green (minimalen Code schreiben) → Refactor.
**Testabdeckung** (Code Coverage) = Anteil der Anweisungen, die durch die Tests ausgeführt werden – hohe Abdeckung beweist keine Fehlerfreiheit, zeigt aber ungetestete Bereiche.

**Weitere QS-Maßnahmen:** Code-Reviews, Pair Programming, statische Codeanalyse (Linter), Coding-Guidelines, CI mit automatischen Tests, Testkonzept und Testprotokolle, Abnahme. Automatisierte Tests allein decken **nicht alle** Szenarien ab – manuelle und explorative Tests ergänzen sie.

---

> [!warning] Typische Fehler in Prüfungen
> - Zweig- und Pfadüberdeckung verwechseln; behaupten, Pfadüberdeckung sei bei Schleifen immer möglich.
> - Black-Box-Testfälle „aus dem Code“ ableiten.
> - Nur gültige Testfälle, keine Grenz- und Sonderfälle.
> - Regressionstest als „Test von alten Fehlern“ beschreiben – er sichert **bestehende Funktionen nach Änderungen**.
> - In der Testtabelle das tatsächliche Ergebnis aus der Erwartung abschreiben statt den Code nachzuvollziehen.

## Verwandte Themen
- [[FIAE-9 Algorithmen in Pseudocode]] – Code, der getestet wird
- [[FIAE-2 Anforderungen und Use Cases]] – Black-Box-Tests aus Anforderungen
- [[S3 Algorithmen, Darstellung und Testen]] – Grundlagen aus AP1

## Zusammenfassung
- Stufen: Unit → Integration → System → Abnahme. Regressionstest nach jeder Änderung.
- White-Box (Code, Überdeckung) vs. Black-Box (Spezifikation, Äquivalenzklassen, Grenzwerte).
- C0 Anweisung ⊂ C1 Zweig ⊂ C2 Pfad; Pfadüberdeckung bei Schleifen unrealistisch.
- Testfälle: gültig/ungültig, Grenzen, leer/null, ein Element, nur negativ, Leerzeichen.
- Unit-Test: Arrange – Act – Assert; F.I.R.S.T.; TDD Red–Green–Refactor.

## Selbstcheck
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { modul: "FIAE-11" })
```

**Weitere Aufgaben:** [[Aufgaben Algorithmen#FIAE-11 Testen und Qualitätssicherung]] · **Karteikarten:** [[Karten Algorithmen]]

## Einschätzung
```dataviewjs
await dv.view("AP2/99 System/views/selbstcheck")
```

---
← [[FIAE-10 Objektorientierte Programmierung umsetzen]] · Weiter: [[FIAE-12 SQL für Entwickler]] →
