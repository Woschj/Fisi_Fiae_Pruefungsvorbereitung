---
tags: [ap1/orga]
---
# Anleitung

## 1. Einrichtung (einmalig)
Der Vault bringt alles mit – Dataview und Spaced Repetition sind bereits im Ordner `.obsidian/plugins` (dieselben Versionen wie in deinem Berufsschul-Vault).

1. Obsidian **neu starten** bzw. den Vault neu öffnen.
2. Falls gefragt: **„Diesem Autor vertrauen und Plugins aktivieren“** bestätigen. Sonst: *Einstellungen → Community-Plugins → Eingeschränkten Modus deaktivieren*, dann **Dataview** und **Spaced Repetition** aktivieren.
3. *Einstellungen → Dataview*: **„Enable JavaScript Queries“** muss an sein (ist voreingestellt).
4. Das Design laden die Widgets selbst aus `99 System/styles/ap1.css` – kein CSS-Snippet nötig.
   Passend dazu gibt es das Theme **AP1 Lernvault** (*Einstellungen → Darstellung → Themes*): gleiche Farben und Schrift wie die Widgets, gestrichelte Rahmen um jedes Widget. Die Widgets sehen aber auch mit jedem anderen Theme gleich aus.
5. [[Start]] öffnen – oben sollte das Dashboard mit Kacheln erscheinen. Wenn stattdessen Code-Blöcke zu sehen sind, ist Dataview bzw. JavaScript noch nicht aktiv.

> [!info] Lese-Ansicht
> Die interaktiven Elemente (Trainer, Quiz, Dashboard) funktionieren in der **Lese-Ansicht** und in der **Live-Vorschau**. Im reinen Quelltextmodus siehst du nur den Code.

## 2. So ist der Vault aufgebaut
| Ordner | Inhalt |
|---|---|
| `00 Start` | Dashboard, diese Anleitung, Prüfungsinfos, Lernplan, Fehlerlog |
| `10 Lernmodule` | 39 Module in 6 Bereichen – Erklärung, Beispiele, Trainer, Selbstcheck, Einschätzung |
| `20 Aufgaben` | Aufgaben im IHK-Stil mit Musterlösung je Bereich + 3 Probeprüfungen |
| `30 Trainer` | Aufgabengeneratoren und freies Quiz |
| `40 Karteikarten` | Karteikarten-Trainer je Bereich (die Karten selbst stehen in `99 System/karten`) |
| `50 Nachschlagen` | Formelsammlung, Spickzettel, Glossar |
| `99 System` | Technik: Widgets, Fragenpool, Karteikarten-Quellen, Schaubilder (`bilder`), Statistik – normalerweise nicht anfassen |

## 3. Lernzyklus pro Modul
1. **Lesen** – Lernziele ansehen, Text durcharbeiten, bei „Kurz nachgedacht“ erst selbst überlegen, dann aufklappen.
2. **Trainieren** – den eingebauten Trainer rechnen, bis 5 Aufgaben in Folge klappen.
3. **Selbstcheck** – das Quiz am Modulende. Unter 70 % → Abschnitte gezielt nachlesen.
4. **Aufgaben** – 2–3 IHK-Aufgaben des Moduls schriftlich lösen, mit Musterlösung vergleichen.
5. **Einschätzen** – ehrlich 1–5 wählen. Das bestimmt, wann das Modul im Dashboard wieder zur Wiederholung auftaucht (1: morgen … 5: in 30 Tagen).
6. **Fehler** ins [[Fehlerlog]] eintragen.

## 4. Wiederholen
- **Dashboard → „Als Nächstes“** zeigt fällige Module, fällige Quizfragen und schwache Trainer-Aufgaben.
- **Quiz „Empfohlen“** wiederholt nach dem Leitner-Prinzip (falsch → sofort wieder, richtig → immer längere Abstände).
- **Karteikarten**: direkt in jeder Kartendatei bzw. in [[Karteikarten]] (alle Stapel) lernen – der eingebaute Trainer braucht nur Dataview. Alternativ mit dem Plugin Spaced Repetition (Button „Im Plugin lernen“ oder Karteikarten-Symbol links); das Plugin führt einen eigenen Lernstand.

## 5. Probeprüfungen
Unter echten Bedingungen: 90 Minuten Timer (im Dokument), nur Taschenrechner, Ergebnis eintragen – es erscheint im Dashboard mit Note.

## 6. Daten und Sicherung
- Dein Lernstand liegt in `99 System/daten/statistik.json` (Quiz, Trainer, Probeprüfungen) und im **Frontmatter** der Module (Selbsteinschätzung).
- Den Vault regelmäßig sichern oder – wie deinen Berufsschul-Vault – per Git versionieren.
- Mehrere Geräte: Obsidian Sync/Git synchronisieren auch die Statistik.

## 7. Eigene Inhalte ergänzen
- **Notizen/Fehler** direkt in die Module schreiben – es sind normale Markdown-Dateien.
- **Neue Quizfragen**: in `99 System/fragen/<bereich>.js` oder `<bereich>-vertiefung.js` einen Eintrag nach dem Muster der vorhandenen ergänzen (Typen `mc`, `multi`, `zahl`, `text`). Die `id` muss eindeutig sein. Eine fehlerhafte Datei wird im Quiz mit Fehlermeldung angezeigt, der Rest läuft weiter.
- **Neue Karteikarten**: in `99 System/karten/<Bereich>.md`, Format `Frage::Antwort` (eine Zeile) oder mehrzeilig mit `?`. Bitte als echte Frage formulieren.

## 8. Verbindung zum Berufsschul-Vault
Jedes Modul nennt im Feld **berufsschule** die passende Lernsituation (z. B. „Evp-CPS · LF3 LS3.2“). Die AP1 prüft die Inhalte der Lernfelder 1–6 übergreifend – der Vault ordnet sie nach Prüfungsthemen statt nach Fächern.

## 9. Navigation und Graph
- **Farben in der Seitenleiste:** Netzwerk blau, Hardware orange, Software lila, IT-Sicherheit rot, Wirtschaft grün, Projekt und Service türkis – auch bei den Aufgaben und Karteikarten. Das CSS-Snippet `ap1-navigation` ist aktiviert (*Einstellungen → Darstellung → CSS-Snippets*).
- **Bereichsübersichten** (🗺️ in jedem Modulordner) zeigen den Lernpfad als anklickbares Diagramm und bündeln Module, Aufgaben und Karten.
- **Graph** (`Strg+G`): Farben nach Bereich, Probeprüfungen gelb. Start, Anleitung, Glossar und Technik sind ausgefiltert, damit die fachlichen Verbindungen sichtbar werden. Jedes Modul verweist unter **Verwandte Themen** auf passende Module anderer Bereiche – im Graph die Brücken zwischen den Farbinseln. Tipp: die **lokale Graphansicht** eines Moduls (Befehl „Lokalen Graph öffnen“) zeigt dessen direktes Umfeld.

## Fehlerbehebung
| Problem | Lösung |
|---|---|
| Code statt Widgets | Dataview aktivieren, „Enable JavaScript Queries“ einschalten, Lese-Ansicht nutzen |
| Widgets ohne Gestaltung | Datei `99 System/styles/ap1.css` fehlt oder wurde verschoben – die Widgets laden sie selbst |
| „AP1-Bibliothek nicht ladbar“ | Ordner `99 System/scripts` wurde verschoben/umbenannt – zurückverschieben |
| Quiz zeigt „Fragendatei fehlerhaft“ | in der genannten Datei die zuletzt bearbeitete Frage prüfen (fehlendes Komma/Anführungszeichen) |
| Karteikarten-Trainer meldet „Zeile …“ | in der Kartendatei steht `::` in einer mehrzeiligen Karte – in Backticks setzen (`` `::` ``) |
| Statistik zurücksetzen | `99 System/daten/statistik.json` löschen (vorher sichern!) |

← [[Start]]
