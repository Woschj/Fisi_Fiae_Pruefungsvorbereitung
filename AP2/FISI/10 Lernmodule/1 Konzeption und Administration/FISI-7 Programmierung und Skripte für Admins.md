---
modul: FISI-7
titel: Programmierung und Skripte für Admins
bereich: Konzeption und Administration
pruefungsteil: "AP2 Teil 2 – Konzeption und Administration von IT-Systemen"
reihenfolge: 7
dauer: 150
status: neu
sicherheit: 0
zuletzt:
tags: [ap2/modul, ap2/fisi]
---
# FISI-7 · Programmierung und Skripte für Admins

> [!abstract] Überblick
> **Bereich:** [[Übersicht FISI Konzeption und Administration]]
> **Prüfungsbereich:** „Konzeption und Administration von IT-Systemen“ – Programmlogik, Code lesen, testen und korrigieren.
> **Dauer:** ca. 150 min · **Prüfungsrelevanz:** ★★★ – Schreibtischtest mit Array, fehlerhafte Codezeile finden, Codelücke füllen
> **Grundlagen aus AP1:** [[S2 Programmierung – Grundlagen]] · [[S3 Algorithmen, Darstellung und Testen]] · [[S4 Betriebssysteme, Dateisysteme und Rechte]]

## Lernziele
- [ ] Ich kann Pseudocode und C#/Java-ähnlichen Code lesen und einen Schreibtischtest mit Array durchführen.
- [ ] Ich finde fehlerhafte Codezeilen (Schleifengrenzen, falsche Variable, falscher Index) und korrigiere sie.
- [ ] Ich kann einfache Algorithmen ergänzen: Summe, Mittelwert, Maximum, Tausch, Bubblesort.
- [ ] Ich kenne Wertebereiche von Datentypen und rechne mit Ganzzahldivision und Modulo.
- [ ] Ich kann Syntax-, Semantik- und Laufzeitfehler unterscheiden und White- und Black-Box-Test erklären.
- [ ] Ich kenne wichtige Befehle unter Windows und Linux (Dateien, Aufgaben planen, Prozesse, Rechte, Boot).

## So wird das geprüft
> [!info] Typische AP2-Aufgabentypen
> - **Schreibtischtest:** Werte einer Variablen bzw. eines Arrays nach jedem Schleifendurchlauf eintragen.
> - **Fehler finden und korrigieren:** falsche Variable überschrieben, falsche Schleifengrenze/Index, Index um eins verschoben.
> - **Code ergänzen:** Bubblesort, Mittelwerte zweier Tageshälften, zwei fehlende Zuweisungen, Bereichsprüfung mit `&&` und Ziffer per `/` und `%`.
> - **Theorie:** Datentyp begründen (`byte` für Prozent, Wertebereich `int`), Syntax- vs. Semantikfehler, Laufzeitfehler, Vorteile von Pseudocode, White- vs. Black-Box, Array-Merkmale, CSV-Vor-/Nachteile.
> - **Befehle:** `copy` mit Platzhaltern, `SCHTASKS`, `PATH`, `chmod 664`, `kill`/`taskkill`, GRUB-Fehler beheben.

---

## 1. Code lesen

Die Prüfungen verwenden **Pseudocode** oder C#-ähnlichen Code. Wichtig:
- **Arrays beginnen bei Index 0.** Ein Array der Länge n hat die Indizes 0 bis n − 1.
- `for (int i = 0; i < n; i++)` läuft **n-mal** (0 … n − 1); `i <= n` läuft **n + 1-mal** → **Index außerhalb** (IndexOutOfRangeException).
- `i += 3` erhöht in Dreierschritten; `i++` ist `i = i + 1`.
- Ganzzahlen: `7 / 2` ergibt **3** (Nachkommastellen fallen weg), `7 % 2` ergibt **1** (Rest).
- `&&` = UND, `||` = ODER, `!` = NICHT, `==` Vergleich, `=` Zuweisung.

### Schreibtischtest
Lege eine **Trace-Tabelle** an: eine Spalte je Variable, eine Zeile je Schleifendurchlauf. Trage nur ein, was sich **am Ende des Durchlaufs** geändert hat.

```
max ← 0 ; max2 ← 0
für i von 0 bis 4
    wenn last[i] > max dann
        max2 ← max
        max  ← last[i]
    sonst wenn last[i] > max2 dann
        max2 ← last[i]
    ende wenn
ende für
```

> [!example] Trace mit `last = [12, 40, 10, 73, 33]`
>
> | i | last[i] | max | max2 |
> |---|---|---|---|
> | 0 | 12 | 12 | 0 |
> | 1 | 40 | 40 | 12 |
> | 2 | 10 | 40 | 12 |
> | 3 | 73 | 73 | 40 |
> | 4 | 33 | 73 | 40 |
>
> Ergebnis: höchster Wert 73, zweithöchster 40. Typischer eingebauter Fehler: im `sonst`-Zweig wird fälschlich `max` statt `max2` überschrieben.

### Typische Fehler im Code
| Fehler | Beispiel | Korrektur |
|---|---|---|
| Schleife läuft eine Runde zu weit | `i <= werte.length` | `i < werte.length` |
| Schleife zu kurz | `i < 6` bei 9 Elementen | `i < 9` bzw. `i < werte.length` |
| Index verschoben | Task-Nummer 1–7 im Array 0–6 | Ausgabe `index + 1` |
| falsche Variable | `max = wert` statt `max2 = wert` | Zuweisung an die richtige Variable |
| Startwert falsch | Minimum mit `0` initialisiert | mit `werte[0]` initialisieren |
| Ganzzahldivision | `summe / anzahl` bei `int` | vorher in `double` umwandeln |

### Standardalgorithmen
**Summe und Mittelwert:**
```
summe ← 0
für i von 0 bis n − 1
    summe ← summe + werte[i]
mittelwert ← summe / n
```
**Maximum:** mit dem **ersten Element** starten, dann vergleichen. **Tausch zweier Werte** braucht eine Hilfsvariable: `temp ← a[i]; a[i] ← a[i+1]; a[i+1] ← temp`.
**Bubblesort:** äußere Schleife `p` von 0 bis n − 2, innere Schleife `i` von 0 bis n − 2 − p; wenn `a[i] > a[i+1]`, tauschen. Nach jedem Durchlauf steht das größte Element hinten.
**Zwei Teilbereiche** (z. B. Vor- und Nachmittag): erste Schleife 0 bis 11, zweite 12 bis 23 – und die Summe **vor** der zweiten Schleife wieder auf 0 setzen.

---

## 2. Ganzzahldivision und Modulo

| Ausdruck | Ergebnis | Anwendung |
|---|---|---|
| `n / 10` | letzte Ziffer abschneiden | 4738291 / 10 = 473829 |
| `n % 10` | letzte Ziffer | 4738291 % 10 = 1 |
| `(n / 10^k) % 10` | (k+1)-te Ziffer von rechts | Priorität = 5. Stelle: `(id / 10000) % 10` |
| `n % 2 == 0` | gerade Zahl | |
| `sek / 3600`, `(sek % 3600) / 60`, `sek % 60` | Stunden, Minuten, Sekunden | |

**Bereichsprüfung**: Eine 7-stellige ID liegt zwischen 1 111 111 und 9 999 999:
`if ((id >= 1111111) && (id <= 9999999))` – beide Bedingungen, mit UND verknüpft, sauber geklammert.

---

## 3. Datentypen

| Typ | Größe | Wertebereich | Einsatz |
|---|---|---|---|
| `bool` | 1 Bit (meist 1 Byte) | true/false | Link up, Toner leer |
| `byte` | 8 Bit | 0 bis 255 (C#) | Prozentwerte 0–100 – keine negativen Werte möglich |
| `short` | 16 Bit | −32 768 bis 32 767 | |
| `int` | 32 Bit | −2 147 483 648 bis 2 147 483 647 | Zähler, IDs, Drehzahl |
| `long` | 64 Bit | ca. ±9,2 × 10¹⁸ | Byte-Zähler, Zeitstempel |
| `float`/`double` | 32/64 Bit | Gleitkomma | Last 10,5 %, Temperatur |
| `char`/`string` | – | Zeichen/Text | Standortbezeichnung, IP als Text |
| `date`/`DateTime` | – | Datum und Uhrzeit | |

**Allgemein:** vorzeichenbehaftet n Bit: −2ⁿ⁻¹ bis 2ⁿ⁻¹ − 1 · vorzeichenlos: 0 bis 2ⁿ − 1. **Mindestanzahl Bit** für x Werte: kleinstes n mit 2ⁿ ≥ x.

**Array vs. Liste:** Array = feste Länge, ein Datentyp, schneller Zugriff über den Index, wenig Speicher, ideal für Schleifen; Einfügen in der Mitte nicht möglich. Liste = dynamisch wachsend, Einfügen und Löschen möglich.

---

## 4. Fehlerarten und Tests

| Fehlerart | Erklärung | Beispiel |
|---|---|---|
| **Syntaxfehler** | verstößt gegen die Grammatik der Sprache – Compiler meldet ihn | `innt` statt `int`, fehlendes Semikolon, `array()` statt `array[]` |
| **Semantik-/Logikfehler** | Programm läuft, liefert aber **falsche Ergebnisse** | Ergebnis in `flaeche` statt `umfang` gespeichert, `<` statt `<=` |
| **Laufzeitfehler** | tritt erst **während der Ausführung** auf, Programm bricht ab | Index außerhalb des Arrays, Division durch 0, Lesen über Dateiende, NullReference |

- **White-Box-Test:** Testfälle aus dem **Quellcode** abgeleitet (Anweisungen, Zweige, Pfade abdecken); Code muss offengelegt werden, bei großen Programmen aufwendig.
- **Black-Box-Test:** Testfälle aus der **Spezifikation**, innere Struktur unbekannt; Qualität hängt von den gewählten Testdaten ab (Grenzwerte!).

**Vorteile von Pseudocode:** leicht lesbar, sprachunabhängig, kompakt, gut für Planung und Kommunikation mit Nicht-Programmierern.

**CSV** (Comma Separated Values): **Vorteile** – plattformunabhängig, einfache Textdatei, von fast jedem Programm lesbar, gut zum Datenaustausch. **Nachteile** – nicht streng genormt, unterschiedliche Trennzeichen (`,` `;` Tab) und Kodierungen, keine Datentypen, unhandlich bei großen und verschachtelten Daten (dann JSON/XML).

---

## 5. Befehle für Admins

| Aufgabe | Windows (CMD/PowerShell) | Linux (Bash) |
|---|---|---|
| Dateien kopieren | `copy`, `xcopy`, `robocopy`, `Copy-Item` | `cp`, `rsync` |
| Platzhalter | `*` beliebig viele Zeichen, `?` genau ein Zeichen: `copy log_2025-11-0?.txt X:\archiv` | `cp log_2025-11-0?.txt /mnt/archiv/` |
| Aufgabe planen | `schtasks /create /tn Name /tr programm.exe /sc DAILY /st 22:30` | `crontab -e` → `30 22 * * * /pfad/programm` |
| Prozesse anzeigen/beenden | Task-Manager, `tasklist`, `taskkill /PID 1234 /F` | `ps aux`, `top`, `kill 1234`, `kill -9 1234` |
| Dienste | `services.msc`, `sc query`, `Get-Service` | `systemctl status/start/stop/enable dienst` |
| Rechte | NTFS-Rechte, `icacls` | `chmod`, `chown`, `ls -l` |
| Suchpfad für Programme | Umgebungsvariable `%PATH%` | `$PATH` |
| Datenträger | `diskpart`, Datenträgerverwaltung | `lsblk`, `fdisk -l`, `df -h`, `mount` |
| Logs | Ereignisanzeige (`eventvwr`) | `journalctl`, `/var/log/` |

**„Befehl nicht gefunden“**: Das Programm liegt nicht in einem Verzeichnis aus `PATH`. Lösung: vollständigen Pfad angeben (`C:\Tools\sicherung.exe`) oder den Ordner zu `PATH` hinzufügen.

**Linux-Rechte:** `rwx` für Eigentümer, Gruppe, Andere; oktal r = 4, w = 2, x = 1.
`chmod 664 datei` → Eigentümer rw (6), Gruppe rw (6), Andere r (4). Hat der Eigentümer selbst keine Rechte, hilft `chmod u+rw` oder ihn in die berechtigte Gruppe aufnehmen.

**Bootprobleme (GRUB):** GRUB lädt den Kernel und zeigt das Bootmenü. „Partition nicht gefunden“ → Partition gelöscht/verändert oder GRUB zeigt auf die falsche Partition. Behebung: Live-System starten, Partitionen mit `lsblk`/`fdisk` prüfen, GRUB neu installieren bzw. `update-grub`.

---

> [!warning] Typische Fehler in Prüfungen
> - Beim Schreibtischtest den Wert **vor** statt **nach** dem Schleifendurchlauf eintragen.
> - Index 0 vergessen – der erste Durchlauf hat i = 0.
> - Ganzzahldivision übersehen: `5 / 2` ist in `int` **2**.
> - Syntax- und Semantikfehler vertauschen: **Syntax = Schreibweise**, **Semantik = Bedeutung/Logik**.
> - `?` und `*` verwechseln.

## Verwandte Themen
- [[FISI-8 Datenbanken und Modellierung]] – SQL und UML in derselben Prüfung
- [[FISI-16 Netzwerkanalyse, Fehlersuche und WAN]] – Netzwerkbefehle (`ping`, `tracert`, `nslookup`)
- [[S2 Programmierung – Grundlagen]] · [[S3 Algorithmen, Darstellung und Testen]] – Grundlagen aus AP1
- [[S4 Betriebssysteme, Dateisysteme und Rechte]] – Rechte und Dateisysteme

## Zusammenfassung
- Arrays ab 0; `i < n` läuft n-mal; `<=` → Index-Fehler. Ganzzahldivision schneidet ab, `%` liefert den Rest.
- Schreibtischtest: Tabelle je Variable und Durchlauf, Werte am Ende des Durchlaufs.
- Max/Min mit erstem Element starten, Tausch mit Hilfsvariable, Summe vor neuer Schleife zurücksetzen.
- Syntax (Grammatik) · Semantik (falsches Ergebnis) · Laufzeit (Abbruch). White-Box = Code, Black-Box = Spezifikation.
- `copy` mit `*`/`?`, `schtasks`/`cron`, `taskkill`/`kill`, `PATH`, `chmod 664`, GRUB reparieren.

## Direkt üben
```dataviewjs
await dv.view("AP2/99 System/views/trainer", { typen: ["trace", "ganzzahl-modulo", "datentyp-bereich"] })
```

## Selbstcheck
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { modul: "FISI-7" })
```

**Weitere Aufgaben:** [[Aufgaben Konzeption und Administration#FISI-7 Programmierung und Skripte für Admins]] · **Karteikarten:** [[Karten Konzeption und Administration]]

## Einschätzung
```dataviewjs
await dv.view("AP2/99 System/views/selbstcheck")
```

---
← [[FISI-6 Datenschutz, Geräteverwaltung und Lizenzen]] · Weiter: [[FISI-8 Datenbanken und Modellierung]] →
