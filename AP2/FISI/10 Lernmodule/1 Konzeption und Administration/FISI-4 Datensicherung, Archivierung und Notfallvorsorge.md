---
modul: FISI-4
titel: Datensicherung, Archivierung und Notfallvorsorge
bereich: Konzeption und Administration
pruefungsteil: "AP2 Teil 2 – Konzeption und Administration von IT-Systemen"
reihenfolge: 4
dauer: 150
status: neu
sicherheit: 0
zuletzt:
tags: [ap2/modul, ap2/fisi]
---
# FISI-4 · Datensicherung, Archivierung und Notfallvorsorge

> [!abstract] Überblick
> **Bereich:** [[Übersicht FISI Konzeption und Administration]]
> **Prüfung:** „Konzeption und Administration von IT-Systemen“
> **Dauer:** ca. 150 min · **Prüfungsrelevanz:** ★★★ – Rücksicherung mit Bändern, Backup vs. Archiv, RTO/RPO und USV sind Dauerbrenner
> **Grundlagen aus AP1:** [[I3 Datensicherung]] · [[H5 Elektrotechnik, USV und Energie]] · [[P3 IT-Service, Support und Qualität]]

## Lernziele
- [ ] Ich kann Voll-, differenzielle und inkrementelle Sicherung mit dem Archivbit erklären.
- [ ] Ich bestimme, welche Bänder in welcher Reihenfolge für eine Wiederherstellung nötig sind – auch bei Fehlern im Plan.
- [ ] Ich kann Generationenprinzip, 3-2-1-Regel, D2D2T und Snapshots anwenden.
- [ ] Ich kann Backup und Archivierung abgrenzen und revisionssichere Archivierung (WORM) erklären.
- [ ] Ich kann RTO, RPO und Verfügbarkeit berechnen und erklären.
- [ ] Ich kann USV-Typen (VFI, VI, VFD) unterscheiden und Notstrom planen.

## So wird das geprüft
> [!info] Typische AP2-Aufgabentypen
> - **Backupverfahren-Tabelle** mit Erläuterung und Archivbit.
> - **Welche Bänder werden benötigt?** Mit Fehler im Plan, klassisch, mit Generationen.
> - **Backup vs. Archiv**, revisionssichere Archivierung, WORM, Vorteile der Archivierung.
> - **RTO und RPO** erklären und **Ausfallzeit/Umsatzverlust** bei 99,9 % berechnen.
> - **Wiederherstellung beschleunigen / Datenverlust vermeiden:** D2D2T, Snapshots, kurze Intervalle, **3-2-1-Regel**.
> - **USV:** Online (VFI), Offline (VFD), Line-Interactive (VI) zuordnen, Vor-/Nachteile Online-USV; **Notstromaggregat rechtzeitig starten**.
> - **LTO-Band:** Vorteile, LTFS, TCO.

---

## 1. Sicherungsarten

| Verfahren | sichert | Archivbit | Wiederherstellung braucht |
|---|---|---|---|
| **Vollsicherung** | alle ausgewählten Daten | wird **zurückgesetzt** | nur die letzte Vollsicherung |
| **Differenziell** | alles, was sich seit dem letzten **Zurücksetzen** geändert hat (normalerweise: seit der letzten Vollsicherung) | bleibt **gesetzt** | letzte Voll + **letzte** Differenzielle |
| **Inkrementell** | alles seit der **letzten Sicherung** (Voll oder inkrementell) | wird **zurückgesetzt** | letzte Voll + **alle** Inkremente danach, in Reihenfolge |
| **Klonen / Image** | 1:1-Abbild eines Datenträgers inkl. Dateisystem und Einstellungen | wird **nicht verändert** | das Image (Bare-Metal-Restore) |

**Archivbit:** Wird beim Ändern einer Datei gesetzt. Voll- und inkrementelle Sicherung setzen es zurück – deshalb „vergisst“ eine differenzielle Sicherung alles, was vor einer dazwischengeschobenen inkrementellen Sicherung lag.

**Hot Backup** (im laufenden Betrieb, z. B. mit Snapshot/Schattenkopie) und **Cold Backup** (Dienst gestoppt, garantiert konsistent) – siehe [[I3 Datensicherung]].

---

## 2. Rücksicherung

**Regel:** Beginne bei der **letzten Vollsicherung** vor dem Ausfall. Danach:
- **jede inkrementelle** Sicherung bis zum Ausfall, in zeitlicher Reihenfolge,
- plus die **letzte differenzielle** Sicherung nach dem letzten Zurücksetzen des Archivbits.

> [!example] Klassisch (Muster )
> Sonntag Voll (V5), werktags differenziell. Ausfall nach der zweiten Differenziellen → **V5, dann 5D2**. Die erste Differenzielle wird nicht gebraucht, die zweite enthält alles seit V5.

> [!example] Fehler im Plan (Muster )
> Mo Voll · Di diff · **Mi versehentlich inkrementell** · Do diff · Fr Ausfall.
> Die inkrementelle Sicherung am Mittwoch hat das Archivbit zurückgesetzt. Die differenzielle Sicherung am Donnerstag enthält daher nur die Änderungen **seit Mittwoch**. Benötigt: **Mo (Voll) + Mi (inkr.) + Do (diff.)**. Die Differenzielle vom Dienstag ist überflüssig – ihr Inhalt steckt in der Mittwochs-Sicherung.

### Generationenprinzip
**Großvater – Vater – Sohn:** tägliche Söhne (werden wöchentlich überschrieben), wöchentliche Väter (z. B. 4 Wochen), monatliche Großväter (z. B. 12 Monate). So kann man auch auf ältere Stände zurückgreifen (Fehler, die erst nach Wochen auffallen), ohne unendlich viele Bänder zu brauchen.
Bei einer Rücksicherung über Generationen braucht man den passenden Großvater bzw. Vater als Vollsicherung und danach alle nötigen Teilsicherungen **in zeitlicher Reihenfolge**.

### Strategien
- **3-2-1-Regel:** **3** Kopien (Original + 2 Sicherungen) auf **2** verschiedenen Medientypen, **1** Kopie außer Haus. Erweitert: 3-2-1-**1-0** (eine Kopie offline/unveränderbar, 0 Fehler beim Restore-Test).
- **D2D2T (Disk-to-Disk-to-Tape):** zuerst schnell auf Festplatte sichern (schneller Restore), danach im Hintergrund auf Band (günstig, offline, lange haltbar). Verkürzt die Wiederherstellungszeit.
- **Snapshots in kurzen Abständen** oder häufige inkrementelle Sicherungen auf Festplatte verringern den Datenverlust zwischen zwei Backups.
- **Backup as a Service:** Sicherung beim Cloud-Anbieter, automatisch offsite (siehe [[FISI-2 Cloud und Betriebsmodelle]]).
- **Restore-Tests** regelmäßig – ein ungetestetes Backup ist kein Backup.

### Magnetband (LTO)
Vorteile: sehr **geringe Kosten pro TB** und niedrige TCO, hohe Kapazität, **Langlebigkeit** (bis 30 Jahre), **offline** gelagert (Schutz vor Ransomware, „Air Gap“), **WORM-Medien** für revisionssichere Ablage, **LTFS** (Linear Tape File System) erlaubt Zugriff wie auf ein Laufwerk (Drag & Drop). Nachteil: sequenzieller Zugriff, langsamer Restore einzelner Dateien.

---

## 3. Backup und Archivierung

| | **Backup** | **Archiv** |
|---|---|---|
| Zweck | **Wiederherstellung** nach Datenverlust | **langfristige, unveränderbare Aufbewahrung** |
| Daten | aktuelle Produktivdaten (Kopie) | Daten, die nicht mehr täglich gebraucht werden – oft vom Produktivsystem **entfernt** |
| Aufbewahrung | Tage bis Monate, rotierend | Jahre (§ 147 AO / § 257 HGB: Geschäftsbriefe 6 Jahre, Buchungsbelege 8 Jahre, Bücher und Jahresabschlüsse 10 Jahre) |
| Anforderung | schnell, vollständig | **revisionssicher**: vollständig, unveränderbar, nachvollziehbar, auffindbar, geschützt |

**Revisionssichere Archivierung** erfüllt rechtliche Anforderungen an Ordnungsmäßigkeit, Vollständigkeit, Sicherheit, Verfügbarkeit, Nachvollziehbarkeit, **Unveränderlichkeit** und Zugriffsschutz – technisch z. B. mit **WORM** (Write Once Read Many).
**Vorteile der Archivierung:** geringere Speicherkosten (günstige Archivspeicher), kleinere tägliche Backups und schnellere Restores, Einhaltung gesetzlicher Aufbewahrungspflichten.

---

## 4. RTO, RPO und Verfügbarkeit

- **RPO (Recovery Point Objective):** maximal tolerierbarer **Datenverlust**, ausgedrückt als Zeitraum = maximaler Abstand zwischen zwei Sicherungen. RPO 1 h → mindestens stündlich sichern.
- **RTO (Recovery Time Objective):** maximal tolerierbare **Ausfallzeit** vom Schaden bis zum wiederhergestellten Betrieb → bestimmt Verfahren und Medien (Image, Ersatzhardware, Cluster).

**Verfügbarkeit** = (Gesamtzeit − Ausfallzeit) ÷ Gesamtzeit.

> [!example] Umsatzverlust (Muster )
> 99,9 % Verfügbarkeit, 24/7: 8 760 h × 0,001 = **8,76 h** Ausfall pro Jahr. Bei 500 € Umsatz pro Stunde: 8,76 × 500 = **4 380 €** maximal tolerierter Verlust.

| Verfügbarkeit | Ausfall pro Jahr (24/7) |
|---|---|
| 99 % | 87,6 h |
| 99,9 % | 8,76 h |
| 99,99 % | 52,6 min |
| 99,999 % | 5,26 min |

**Maßnahmen für hohe Verfügbarkeit:** redundante Hardware (Netzteile, NICs, RAID), Cluster und Load Balancing, USV und Notstrom, Monitoring, Backups, Notfallpläne, geschultes Personal, physische Sicherheit.

---

## 5. USV und Notstrom

| Typ (IEC 62040-3) | Abkürzung | Funktionsweise | Eigenschaften |
|---|---|---|---|
| **Offline / Standby** | **VFD** – Voltage and Frequency Dependent | Last hängt direkt am Netz, bei Ausfall schaltet die USV um | günstig, Umschaltzeit einige ms, schützt nur gegen Ausfall |
| **Line-Interactive** | **VI** – Voltage Independent | wie Offline, zusätzlich Spannungsregelung (Transformator) | gleicht Unter-/Überspannung aus, kurze Umschaltzeit |
| **Online / Doppelwandler** | **VFI** – Voltage and Frequency Independent | Last wird **ständig** über Gleichrichter → Akku → Wechselrichter versorgt | **keine Umschaltzeit**, schützt vor allen Netzstörungen; teurer, geringerer Wirkungsgrad, Wärme |

**Notstromaggregat:** Die USV überbrückt nur die Zeit, bis der Generator läuft. Rechne die **Startzeit** des Aggregats als Anteil der Akkulaufzeit mit ein.

> [!example] Startzeitpunkt (Muster )
> Akku reicht 60 min (100 %), 1 % ≙ 0,6 min. Das Aggregat braucht 3 min zum Starten = **5 %**. Soll bei 30 % Restladung übernommen werden → **Start bei 35 %**.

---

> [!warning] Typische Fehler in Prüfungen
> - Inkrementell und differenziell vertauschen oder die Wirkung des **Archivbits** bei gemischten Plänen übersehen.
> - Bei inkrementeller Sicherung nur die letzte Teilsicherung nennen – es werden **alle** gebraucht, in Reihenfolge.
> - Archiv und Backup gleichsetzen.
> - RTO und RPO vertauschen: **RPO = Punkt (Datenstand), RTO = Zeit (bis es wieder läuft)**.
> - USV-Abkürzungen verwechseln: **Online = VFI** (völlig unabhängig).

## Verwandte Themen
- [[FISI-3 Speicher und RAID planen]] – RAID ist kein Backup
- [[FISI-5 Systemhärtung, Malware und Angriffe]] – Ransomware und Offline-Backups
- [[FISI-16 Netzwerkanalyse, Fehlersuche und WAN]] – Verfügbarkeit redundanter Leitungen
- [[I3 Datensicherung]] – Grundlagen aus AP1

## Zusammenfassung
- Voll/inkr. setzen das Archivbit zurück, differenziell nicht. Klonen verändert es nicht.
- Restore: letzte Voll + alle Inkremente + letzte Differenzielle nach dem letzten Reset.
- GVS-Prinzip, 3-2-1(-1-0), D2D2T, Snapshots, Restore-Tests. LTO: günstig, lange haltbar, offline, WORM.
- Archiv = langfristig, revisionssicher, unveränderbar ≠ Backup.
- RPO = max. Datenverlust (Sicherungsabstand), RTO = max. Ausfallzeit. 99,9 % ≙ 8,76 h/Jahr.
- USV: VFD (offline), VI (line-interactive), VFI (online, keine Umschaltzeit).

## Direkt üben
```dataviewjs
await dv.view("AP2/99 System/views/trainer", { typen: ["backup-plan", "backup", "generationen", "verfuegbarkeit"] })
```

## Selbstcheck
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { modul: "FISI-4" })
```

**Weitere Aufgaben:** [[Aufgaben Konzeption und Administration#FISI-4 Datensicherung, Archivierung und Notfallvorsorge]] · **Karteikarten:** [[Karten Konzeption und Administration]]

## Einschätzung
```dataviewjs
await dv.view("AP2/99 System/views/selbstcheck")
```

---
← [[FISI-3 Speicher und RAID planen]] · Weiter: [[FISI-5 Systemhärtung, Malware und Angriffe]] →
