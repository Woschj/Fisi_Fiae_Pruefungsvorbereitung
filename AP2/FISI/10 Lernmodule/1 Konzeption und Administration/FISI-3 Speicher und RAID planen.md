---
modul: FISI-3
titel: Speicher und RAID planen
bereich: Konzeption und Administration
pruefungsteil: "AP2 Teil 2 – Konzeption und Administration von IT-Systemen"
reihenfolge: 3
dauer: 150
status: neu
sicherheit: 0
zuletzt:
tags: [ap2/modul, ap2/fisi]
---
# FISI-3 · Speicher und RAID planen

> [!abstract] Überblick
> **Bereich:** [[Übersicht FISI Konzeption und Administration]]
> **Prüfung:** „Konzeption und Administration von IT-Systemen“
> **Dauer:** ca. 150 min · **Prüfungsrelevanz:** ★★★ – Speicherbedarf und Plattenanzahl berechnen sowie RAID-Level und Ausfallsicherheit vergleichen.
> **Grundlagen aus AP1:** [[H4 Server und Netzwerkspeicher]] · [[H3 Datenmengen und Übertragung]] · [[H2 Massenspeicher und Schnittstellen]]

## Lernziele
- [ ] Ich rechne sicher mit KiB, MiB, GiB und TiB und weiß, wann dezimal und wann binär gerechnet wird.
- [ ] Ich berechne den Speicherbedarf aus Altbestand, Füllgrad und Zuwachs – und wie viele Jahre ein System reicht.
- [ ] Ich bestimme die Plattenanzahl für RAID 5, 6 und 10 inklusive Hot Spare und die Nettokapazität.
- [ ] Ich kann DAS, NAS und SAN sowie JBOD, Deduplizierung und Komprimierung erklären.
- [ ] Ich kann MTBF, MTTF, Badewannenkurve und das Mix-and-Match-Prinzip erklären.

## So wird das geprüft
> [!info] Typische AP2-Aufgabentypen
> - **Speicherbedarf:** Altbestand (Kapazität × Füllgrad × 1 024) + jährlicher Zuwachs × Jahre, dann in TiB umrechnen.
> - **Plattenanzahl:** Bedarf ÷ Plattengröße → Datenplatten, + Parität (RAID 5: 1, RAID 6: 2), + Hot Spare.
> - **Nettokapazität** RAID 5/6/10 und **Ausfallsicherheit** RAID 6 vs. RAID 10.
> - **Begriffe:** Hot Spare, JBOD (Nachteile), Deduplizierung, Komprimierung, Clustergröße, MTBF/MTTF, Badewannenkurve, Mix-and-Match.
> - **Archivbedarf mit Kompression**.

---

## 1. Binäre Einheiten

| dezimal (Hersteller, Datenraten) | binär (Betriebssystem, Prüfungsrechnung) |
|---|---|
| 1 kB = 1 000 Byte | 1 KiB = 1 024 Byte |
| 1 MB = 10⁶ Byte | 1 MiB = 1 024² Byte |
| 1 GB = 10⁹ Byte | 1 GiB = 1 024³ Byte |
| 1 TB = 10¹² Byte | 1 TiB = 1 024⁴ Byte |

- Jede binäre Stufe ist **Faktor 1 024 = 2¹⁰ = 10 Bit** mehr.
- **Datenraten sind immer dezimal:** 1 Gbit/s = 10⁹ bit/s.
- Eine „4-TB“-Platte hat nur 4 × 10¹² / 1 024⁴ ≈ **3,64 TiB**.

### Speicherbedarf von Medien
Unkomprimiertes Bild: **Breite × Höhe × Farbtiefe (Bit)** ÷ 8 = Byte. Video: Bildgröße × Bilder pro Sekunde × Sekunden.

> [!example] Beispiel Kamera
> 1 920 × 1 080 Pixel × 16 Bit = 33 177 600 Bit pro Bild · × 10 Bilder/s ÷ 8 = 41 472 000 Byte/s · × 60 s = 2 488 320 000 Byte · ÷ 1 024 ÷ 1 024 = **≈ 2 373 MiB pro Minute**.

---

## 2. Speicherbedarf berechnen

Der Rechenweg ist in fast jeder Prüfung derselbe:

1. **Altbestand:** Kapazität × Füllgrad, in GiB umrechnen (× 1 024)
2. **Zuwachs:** Zuwachs pro Jahr × Anzahl Jahre
3. **Summe** bilden
4. **In TiB umrechnen** (÷ 1 024) und **aufrunden** – abrunden hieße, der Speicher reicht nicht

> [!example] Durchgerechnet
> Altsystem 12 TiB zu 90 % belegt: 12 × 0,9 × 1 024 = **11 059,2 GiB** · Zuwachs 650 GiB/Jahr × 3 Jahre = **1 950 GiB** · Summe **13 009,2 GiB** · ÷ 1 024 = 12,70 → **12,8 TiB**.

**Umgekehrt – wie viele Jahre reicht das System?**
(nutzbare Kapazität × maximaler Füllgrad − Altbestand) ÷ Zuwachs pro Jahr → **abrunden** auf volle Jahre.

> [!example] Durchgerechnet
> Alt-NAS 9 TiB zu 90 % belegt = 8 294,4 GiB. Neues SAN 20 TiB, höchstens 70 % belegen = 14 336 GiB. Reserve 6 041,6 GiB ÷ 750 GiB/Jahr = 8,06 → **8 Jahre**.

**Archiv mit Kompression:** „60 % Kompressionsrate“ ist in Prüfungsaufgaben meist so gemeint: Es bleiben **40 %** übrig (× 0,4). Lies genau, ob die Rate die Ersparnis oder das Ergebnis beschreibt, und schreibe deine Annahme dazu.

---

## 3. RAID-Level im Vergleich

| Level | Prinzip | min. Platten | Nettokapazität (n Platten à C) | garantiert verkraftbare Ausfälle | Einsatz |
|---|---|---|---|---|---|
| **RAID 0** | Striping | 2 | n × C | **0** | nur Geschwindigkeit, keine Redundanz |
| **RAID 1** | Spiegelung | 2 | C | n − 1 | Systemplatten |
| **RAID 5** | Striping + einfache verteilte Parität | 3 | (n − 1) × C | **1** | Fileserver, gutes Verhältnis Kapazität/Sicherheit |
| **RAID 6** | Striping + doppelte Parität | 4 | (n − 2) × C | **2** | große Platten, Archiv, NAS/SAN |
| **RAID 10** | Spiegel, darüber Striping | 4 (gerade) | n/2 × C | **1** (mehr nur, wenn verschiedene Spiegelpaare betroffen sind) | Datenbanken: schnell beim Schreiben |

**Warum RAID 6 bei großen Platten?** Der **Rebuild** einer großen Platte dauert viele Stunden, in denen die übrigen Platten stark belastet sind. Fällt dabei bei RAID 5 eine zweite Platte aus oder tritt ein Lesefehler auf, sind alle Daten verloren. RAID 6 verkraftet in dieser Phase noch einen weiteren Ausfall.

**Hardware- oder Software-RAID?** Hardware-RAID-Controller (eigener Prozessor, Cache mit Batteriepufferung/BBU, Schnittstelle z. B. PCIe, Anzahl Anschlüsse, unterstützte Level als Auswahlkriterien) entlasten die CPU; Software-RAID (mdadm, Storage Spaces, ZFS) ist günstig und hardwareunabhängig.

> [!danger] RAID ist kein Backup
> RAID schützt nur gegen den Ausfall von Platten. Versehentliches Löschen, Ransomware, Brand oder Diebstahl treffen alle Platten gleichzeitig.

---

## 4. Plattenanzahl planen

1. **Datenplatten** = Bedarf ÷ Plattengröße → **aufrunden**
2. **Redundanz** hinzufügen: RAID 5 **+1**, RAID 6 **+2**, RAID 10 **× 2**
3. **Hot Spare** hinzufügen (zählt nicht zur Kapazität)

> [!example] Durchgerechnet
> Bedarf 5 + 3 + 5 = 13 TiB, Platten à 2 TiB → 13 ÷ 2 = 6,5 → **7** Datenplatten · + 2 für RAID 6 · + 1 Hot Spare = **10 Platten**.

> [!example] Vergleich (20 TiB mit 4-TiB-Platten)
> 20 ÷ 4 = 5 Datenplatten → RAID 10: 5 × 2 = **10** · RAID 5: 5 + 1 = **6** · RAID 6: 5 + 2 = **7**. Die wenigsten Platten braucht RAID 5.

> [!example] Erweiterung
> Vorhanden: RAID 6 aus 12 Platten à 8 TiB (80 TiB netto = 10 Daten + 2 Parität). Künftig 160 TiB nötig → 20 Datenplatten + 2 Parität = 22 Platten → **10 zusätzliche** Platten. Als RAID 10 ergäben dieselben 22 Platten nur 11 × 8 = 88 TiB.

### Hot Spare, Mix and Match
- **Hot Spare:** eingebaute, laufende, aber **ungenutzte** Platte. Fällt eine Platte aus, beginnt der Controller **sofort und automatisch** den Rebuild auf der Hot Spare – ohne dass jemand eine Platte tauschen muss.
- **Mix-and-Match-Prinzip:** Platten aus **unterschiedlichen Chargen** (oder Herstellern) kombinieren, damit nicht mehrere Platten mit demselben Produktionsfehler gleichzeitig ausfallen.

---

## 5. Speicherarchitekturen und Speicheroptimierung

| | **DAS** (Direct Attached Storage) | **NAS** (Network Attached Storage) | **SAN** (Storage Area Network) |
|---|---|---|---|
| Anbindung | direkt am Server (SAS, USB, SATA) | über das LAN (Ethernet) | eigenes Speichernetz (Fibre Channel, iSCSI) |
| Zugriff | Blockebene, nur ein Server | **Dateiebene** (SMB, NFS) | **Blockebene**, Server sehen „lokale“ Platten |
| Einsatz | Einzelserver | Dateiablage für Clients | Virtualisierungscluster, Datenbanken |

**JBOD** (Just a Bunch of Disks): Platten werden einfach aneinandergehängt. Nachteile: **keine Redundanz** – fällt eine Platte aus, ist das logische Volume gefährdet; kein Striping, daher keine Leistungssteigerung; keine Lastverteilung.

**Deduplizierung:** identische Dateien oder **Blöcke werden nur einmal physisch gespeichert**, weitere Vorkommen verweisen darauf. Beispiele: gleicher Mailanhang an 50 Empfänger, tägliche Backups mit kaum veränderten Daten. Spart Speicher und beschleunigt Backups.
**Komprimierung:** entfernt Redundanz innerhalb der Daten. **Verlustfrei** (ZIP, PNG, Programme – exakt wiederherstellbar) oder **verlustbehaftet** (JPEG, MP3, Video – unwichtige Informationen fallen weg).

**Clustergröße (Zuordnungseinheit):** kleinste Einheit, die ein Dateisystem für eine Datei belegt. Eine 1-KiB-Datei belegt bei 64-KiB-Clustern trotzdem 64 KiB. **Kleine Cluster für viele kleine Dateien** (Texte), **große Cluster für große Dateien** (Video, Images) – weniger Verwaltungsaufwand.

---

## 6. Lebensdauer und Ausfallkennzahlen

- **MTBF** (Mean Time Between Failures): mittlere Zeit zwischen zwei Ausfällen eines **reparierbaren** Systems – relevant für Backup-Systeme, Server, die repariert werden.
- **MTTF** (Mean Time To Failure): mittlere Zeit bis zum Ausfall eines **nicht reparierbaren** Bauteils – relevant für Festplatten, die getauscht und entsorgt werden.
- **MTTR** (Mean Time To Repair): mittlere Reparaturdauer.
- **Mehrere Platten:** Die MTBF des Verbunds sinkt: 800 000 h ÷ 16 Platten = **50 000 h ≈ 5,7 Jahre**, bis im Mittel irgendeine Platte ausfällt.

**Badewannenkurve:** Ausfallrate über die Lebensdauer.
1. **Frühausfälle** – hohe, sinkende Rate (Fertigungsfehler)
2. **Betriebsphase** – niedrige, konstante Rate (Zufallsausfälle)
3. **Verschleißphase** – steigende Rate (Alterung)

```
Ausfallrate
  ▲
  │█                                  █
  │ █                               █
  │   ██                         ██
  │      ███████████████████████
  └──────────────────────────────────────▶ Zeit
    Früh-      Betriebsphase        Verschleiß
    ausfälle   (Zufallsausfälle)    (Alterung)
```

**SMART-Werte** überwachen (reallocated sectors, pending sectors, Temperatur) und Platten **proaktiv** tauschen.

---

> [!warning] Typische Fehler in Prüfungen
> - GiB und GB mischen – in AP2-Aufgaben wird **binär** gerechnet (× 1 024), außer bei Datenraten.
> - Datenplatten **abrunden** statt aufrunden.
> - Die Hot Spare zur Kapazität zählen oder vergessen.
> - RAID 10 „2 Ausfälle garantiert“ – nein, garantiert nur **einer**.
> - Beim „Wie viele Jahre?“ aufrunden – das angebrochene Jahr passt **nicht** mehr.

## Verwandte Themen
- [[FISI-4 Datensicherung, Archivierung und Notfallvorsorge]] – RAID ist kein Backup, Archiv
- [[FISI-1 Server, Virtualisierung und Container]] – Shared Storage für Cluster
- [[H4 Server und Netzwerkspeicher]] – Grundlagen aus AP1
- [[H3 Datenmengen und Übertragung]] – Einheiten, Mediendaten

## Zusammenfassung
- Binär rechnen: × 1 024 je Stufe (10 Bit). Datenraten dezimal.
- Bedarf = Kapazität × Füllgrad × 1 024 + Zuwachs × Jahre → ÷ 1 024, aufrunden. Jahre = Reserve ÷ Zuwachs, abrunden.
- Platten = ⌈Bedarf ÷ C⌉ + Parität (5: +1, 6: +2) bzw. × 2 (RAID 10) + Hot Spare.
- RAID 5: 1 Ausfall · RAID 6: 2 · RAID 10: 1 garantiert. RAID ≠ Backup.
- DAS/NAS (Datei)/SAN (Block) · JBOD ohne Redundanz · Dedup spart Kopien · Kompression verlustfrei/-behaftet · Clustergröße nach Dateigröße.
- MTBF (reparierbar) · MTTF (Austauschteil) · Badewanne: früh – Betrieb – Verschleiß.

## Direkt üben
```dataviewjs
await dv.view("AP2/99 System/views/trainer", { typen: ["speicherbedarf", "raid-planung", "raid", "einheiten", "datenmenge"] })
```

## Selbstcheck
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { modul: "FISI-3" })
```

**Weitere Aufgaben:** [[Aufgaben Konzeption und Administration#FISI-3 Speicher und RAID planen]] · **Karteikarten:** [[Karten Konzeption und Administration]]

## Einschätzung
```dataviewjs
await dv.view("AP2/99 System/views/selbstcheck")
```

---
← [[FISI-2 Cloud und Betriebsmodelle]] · Weiter: [[FISI-4 Datensicherung, Archivierung und Notfallvorsorge]] →
