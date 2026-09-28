---
modul: H3
titel: Datenmengen und Übertragung
bereich: Hardware
reihenfolge: 10
dauer: 120
status: neu
sicherheit: 0
zuletzt:
berufsschule: "Evp-CPS · LF3 LS3.1 (Übertragungsdauer) · LS3.5 (Speicherbedarf Video)"
tags: [ap1/modul, ap1/hardware]
---
# H3 · Datenmengen und Übertragung

> [!abstract] Überblick
> **Bereich:** [[Übersicht Hardware]]
> **Dauer:** ca. 2 h (plus Training) · **Prüfungsrelevanz:** ★★★ – fast jede AP1 enthält eine Rechnung mit Datenmengen oder Übertragungszeiten
> **Voraussetzungen:** Potenzrechnung · **Danach:** [[H4 Server und Netzwerkspeicher]]
> **Berufsschule:** Evp-CPS LF3 LS3.1 (Übertragungsdauer im WLAN), LS3.5 (Speicherbedarf für Videos)

## Lernziele
- [ ] Ich kann Bit und Byte sowie dezimale (kB, MB, GB) und binäre (KiB, MiB, GiB) Einheiten sicher umrechnen.
- [ ] Ich kann Übertragungsdauern berechnen, auch mit effektiver Datenrate.
- [ ] Ich kann Speicherbedarf für Bilder, Audio und Video berechnen.
- [ ] Ich kann Speicherbedarf für Datensätze, Backups und Wachstum abschätzen.
- [ ] Ich schreibe Rechenwege mit Einheiten so auf, dass Folgefehler Teilpunkte bekommen.

## Worum geht es?
„Wie lange dauert die nächtliche Sicherung von 1,5 TB über die 1-Gbit/s-Leitung – ist sie bis 6 Uhr fertig?“ – „Wie viel Speicher braucht die Videoüberwachung für 30 Tage?“ Das sind echte Planungsfragen. In der Prüfung gibt es dafür viele Punkte, aber auch viele Fallen: Bit oder Byte? 1000 oder 1024?

---

## 1. Bit und Byte
- **1 Byte (B) = 8 Bit (b)**
- **Datenmengen** (Dateien, Speicher) meist in **Byte**
- **Datenraten** (Leitungen, Schnittstellen) fast immer in **Bit pro Sekunde** (Mbit/s, Gbit/s)
- → Vor jeder Übertragungsrechnung: **Datenmenge × 8**

## 2. Dezimale und binäre Präfixe

| dezimal (SI) | Faktor | binär (IEC) | Faktor |
|---|---|---|---|
| kB (Kilobyte) | 10³ = 1 000 | **KiB** (Kibibyte) | 2¹⁰ = 1 024 |
| MB (Megabyte) | 10⁶ | **MiB** | 2²⁰ = 1 048 576 |
| GB (Gigabyte) | 10⁹ | **GiB** | 2³⁰ = 1 073 741 824 |
| TB (Terabyte) | 10¹² | **TiB** | 2⁴⁰ = 1 099 511 627 776 |
| PB (Petabyte) | 10¹⁵ | PiB | 2⁵⁰ |

**Wer rechnet wie?**
- **Datenträgerhersteller:** dezimal (eine „2-TB-Platte“ hat 2 · 10¹² Byte)
- **Windows:** rechnet binär, schreibt aber „GB“ → die 2-TB-Platte erscheint als **1,81 „TB“** (eigentlich TiB)
- **Linux, macOS:** teils dezimal, teils binär (mit korrekten IEC-Einheiten)
- **Datenraten:** **immer dezimal** (100 Mbit/s = 100 · 10⁶ Bit/s)
- **RAM:** traditionell binär (16 GB RAM = 16 GiB)

> [!tip] Sicher umrechnen
> Immer **über Byte** gehen: Wert × Faktor der Ausgangseinheit = Byte → ÷ Faktor der Zieleinheit.
> Nützliche Faktoren: GB → GiB × **0,9313** · TB → TiB × **0,9095** · GiB → GB × **1,0737**

> [!example] Umrechnungen
> - 500 GB in GiB: 500 · 10⁹ / 2³⁰ = **465,66 GiB**
> - 4 TiB in TB: 4 · 2⁴⁰ / 10¹² = **4,398 TB**
> - 250 MB in MiB: 250 · 10⁶ / 2²⁰ = **238,42 MiB**

---

## 3. Übertragungsdauer

**t = Datenmenge [Bit] / Datenrate [Bit/s]**

Vorgehen:
1. Datenmenge in **Byte** umrechnen (Präfix beachten: dezimal oder binär?)
2. **× 8** → Bit
3. Datenrate in **Bit/s** (dezimal!) – ggf. mit Nutzdatenanteil/Effizienz multiplizieren
4. teilen, Ergebnis sinnvoll umrechnen (s → min → h)

> [!example] Beispiel 1 (dezimal)
> 12 GB über 250 Mbit/s: 12 · 10⁹ · 8 = 96 · 10⁹ Bit → 96 · 10⁹ / (250 · 10⁶) = **384 s = 6 min 24 s**

> [!example] Beispiel 2 (binär)
> 3 GiB über 150 Mbit/s: 3 · 2³⁰ · 8 = 25 769 803 776 Bit → / 150 · 10⁶ = **171,8 s ≈ 2 min 52 s**

> [!example] Beispiel 3 (mit Effizienz)
> Nächtliche Sicherung 1,5 TB über 1 Gbit/s, nutzbar sind **70 %**:
> 1,5 · 10¹² · 8 = 12 · 10¹² Bit → / (10⁹ · 0,7) = 17 142,9 s ≈ **4 h 46 min** → startet sie um 1 Uhr, ist sie vor 6 Uhr fertig.

> [!example] Beispiel 4 (Rückwärts: benötigte Datenrate)
> 40 GB sollen in 15 Minuten übertragen werden. 40 · 10⁹ · 8 = 320 · 10⁹ Bit / 900 s = **355,6 Mbit/s** → eine 1-Gbit/s-Leitung reicht, eine 250-Mbit/s-Leitung nicht.

**Warum ist die reale Rate geringer?** Protokoll-Overhead (Header von Ethernet/IP/TCP), Bestätigungen, WLAN als geteiltes Medium, Auslastung durch andere, langsame Gegenstelle.

---

## 4. Speicherbedarf von Medien

| Medium | Formel |
|---|---|
| **Bild** (unkomprimiert) | Breite × Höhe × Farbtiefe (Bit) / 8 = Byte |
| **Audio** (PCM) | Abtastrate (Hz) × Bittiefe × Kanäle × Dauer (s) / 8 |
| **Video** (unkomprimiert) | Breite × Höhe × Farbtiefe(Byte) × Bilder/s × Dauer (s) |
| **Video** (komprimiert) | Bitrate (Mbit/s) × Dauer (s) / 8 |

- **Farbtiefe:** 8 Bit = 256 Farben (bzw. Graustufen) · 24 Bit True Color = je 8 Bit R, G, B = **3 Byte pro Pixel** = 16,7 Mio. Farben · 32 Bit = mit Transparenz (Alpha)
- Anzahl Farben: **2^Farbtiefe**
- **Kompression:** verlustfrei (PNG, FLAC, ZIP) vs. verlustbehaftet (JPEG, MP3, H.264/H.265) – Letztere sparen viel Platz, verlieren aber Details

> [!example] Bild
> 3840 × 2160 × 24 Bit = 8 294 400 px × 3 B = **24 883 200 B ≈ 24,9 MB ≈ 23,73 MiB**

> [!example] Audio
> 5 min Stereo, 48 kHz, 24 Bit: 48 000 × 24 × 2 × 300 = 691 200 000 Bit / 8 = **86,4 MB**

> [!example] Video unkomprimiert
> 1 min Full HD, 24 Bit, 30 fps: 1920 × 1080 × 3 B × 30 × 60 = **11,2 GB** – deshalb wird Video immer komprimiert.

> [!example] Videoüberwachung komprimiert
> 8 Kameras, je 4 Mbit/s, 24/7, 30 Tage Aufbewahrung:
> 8 × 4 · 10⁶ Bit/s × 86 400 s × 30 / 8 = **10,37 TB** → mit 20 % Reserve rund **12,5 TB** Speicherplatz, z. B. auf einem NAS ([[H4 Server und Netzwerkspeicher]])

---

## 5. Speicherbedarf planen
Typische Aufgaben: Datensätze, Mailpostfächer, Wachstum, Backup-Generationen.

> [!example] Kundendatenbank mit Wachstum
> 120 000 Kunden × 4 KiB je Datensatz = 491 520 000 B ≈ **468,75 MiB**. Wachstum 15 % pro Jahr über 3 Jahre: × 1,15³ = × 1,5209 → ≈ **713 MiB**. Dazu Indizes, Logs, Backups → Reserve einplanen.

**Planungsregeln:** Wachstum (Prozent pro Jahr, Zinseszins-Effekt), Reserve (20–30 %), Backups/Versionen (Faktor!), Füllgrad (Dateisysteme nicht über ~80 % füllen).

<!-- erg:Multimedia -->
## 6. Multimedia – Grafik, Kompression und Codes
### Raster- und Vektorgrafik
| | **Rastergrafik** (Pixel) | **Vektorgrafik** (Formen) |
|---|---|---|
| Aufbau | Raster aus Bildpunkten mit Farbwerten | mathematisch beschriebene Linien, Kurven, Flächen |
| Skalieren | verliert beim Vergrößern Qualität (pixelig) | **verlustfrei** in jeder Größe |
| geeignet für | Fotos | Logos, Diagramme, Schriften, Pläne |
| Formate | JPEG, PNG, GIF, WebP, BMP | **SVG**, PDF, EPS |

### Bildformate und Kompression
| Format | Kompression | Besonderheit | Einsatz |
|---|---|---|---|
| **JPEG** | verlustbehaftet | stufenlos einstellbar, keine Transparenz | Fotos |
| **PNG** | verlustfrei | **Transparenz** | Screenshots, Grafiken, Logos (Raster) |
| **GIF** | verlustfrei, max. **256 Farben** | einfache Animationen | Icons, kleine Animationen |
| **SVG** | – (Vektor, Text/XML) | beliebig skalierbar | Logos, Diagramme im Web |
| **WebP/AVIF** | beides möglich | kleiner als JPEG/PNG | moderne Websites |

- **Verlustfrei** (ZIP, PNG, FLAC): Original lässt sich **exakt** wiederherstellen – für Texte, Programme, Dokumente zwingend.
- **Verlustbehaftet** (JPEG, MP3, AAC, H.264/H.265): entfernt Informationen, die Menschen kaum wahrnehmen – viel kleinere Dateien, aber nicht umkehrbar.
- **Kompressionsrate** z. B. 50 MB → 5 MB = 10 : 1 (Datei ist auf 10 % geschrumpft).
- **Videoauflösungen:** HD 1280 × 720 · Full HD 1920 × 1080 · 4K/UHD 3840 × 2160.
- **Audio:** Abtastrate (Sampling-Rate, z. B. 44,1 kHz) und Abtasttiefe (z. B. 16 Bit) bestimmen Qualität und Größe – Berechnung in Abschnitt 4.

### Prüfziffern, Barcodes und RFID
Eine **Prüfziffer** erkennt Tipp- und Lesefehler: Sie wird aus den übrigen Ziffern berechnet und mitgespeichert.
> [!example] EAN-13-Prüfziffer
> Die ersten 12 Ziffern `4 0 0 6 3 8 1 3 3 3 9 3` abwechselnd mit **1** und **3** gewichten:
> 4·1 + 0·3 + 0·1 + 6·3 + 3·1 + 8·3 + 1·1 + 3·3 + 3·1 + 3·3 + 9·1 + 3·3 = **89**
> Prüfziffer = Ergänzung zur nächsten Zehnerzahl: 90 − 89 = **1** → vollständige Nummer 400638133393**1**.
Weitere Beispiele: ISBN, IBAN (Prüfsumme modulo 97), Luhn-Verfahren bei Kreditkarten.

| Technik | Funktionsweise | Einsatz |
|---|---|---|
| **Barcode (1D)** | Strichcode, per Scanner/Kamera gelesen, Sichtkontakt nötig | Artikel (EAN), Inventarnummern |
| **QR-Code (2D)** | Matrix, speichert viel mehr Daten, **Fehlerkorrektur** (lesbar trotz Beschädigung) | Links, Tickets, WLAN-Zugang, Zahlungen |
| **RFID** | Funketikett, **ohne Sichtkontakt**, mehrere gleichzeitig lesbar, teils beschreibbar | Zutrittskarten, Inventur, Diebstahlsicherung, Logistik |
| **NFC** | RFID-Variante mit wenigen Zentimetern Reichweite | kontaktloses Bezahlen, Kopplung von Geräten |

---

> [!warning] Typische Fehler in Prüfungen
> - **× 8 vergessen** (Byte statt Bit durch Bit/s teilen).
> - Datenrate binär rechnen (Mbit/s ist **immer** 10⁶).
> - Farbtiefe in Bit mit Byte verwechseln (24 Bit = 3 Byte).
> - Sekunden nicht umrechnen oder Ergebnis ohne Einheit.
> - Anzahl (Bilder, Tage) ab- statt aufrunden – bzw. bei „wie viele passen drauf?“ aufrunden statt **abrunden**.

## Verwandte Themen
- [[H2 Massenspeicher und Schnittstellen]] – Datenraten der Schnittstellen
- [[I3 Datensicherung]] – Backupfenster und Speicherbedarf
- [[S1 Zahlensysteme und Codierung]] – Zweierpotenzen und Binärpräfixe

## Zusammenfassung
- 1 B = 8 bit; Dateien in Byte, Leitungen in Bit/s (dezimal).
- kB/MB/GB = 10³/10⁶/10⁹ · KiB/MiB/GiB = 2¹⁰/2²⁰/2³⁰; immer über Byte umrechnen.
- t = Bit / (Bit/s); ggf. × Effizienz.
- Bild = B × H × Farbtiefe · Audio = Rate × Bit × Kanäle × s · Video = Bild × fps × s bzw. Bitrate × s.
- Planung: Wachstum, Reserve, Backups, Füllgrad.

## Direkt üben
```dataviewjs
await dv.view("AP1/99 System/views/trainer", { typen: ["einheiten", "uebertragung", "datenmenge", "pruefziffer"] })
```

## Selbstcheck
```dataviewjs
await dv.view("AP1/99 System/views/quiz", { modul: "H3" })
```

**Weitere Aufgaben:** [[Aufgaben Hardware#H3 Datenmengen und Übertragung]] · **Formeln:** [[Formelsammlung]] · **Karteikarten:** [[Karten Hardware]]

## Einschätzung
```dataviewjs
await dv.view("AP1/99 System/views/selbstcheck")
```

---
← [[H2 Massenspeicher und Schnittstellen]] · Weiter: [[H4 Server und Netzwerkspeicher]] →
