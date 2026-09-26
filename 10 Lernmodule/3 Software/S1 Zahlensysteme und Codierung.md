---
modul: S1
titel: Zahlensysteme und Codierung
bereich: Software
reihenfolge: 14
dauer: 120
status: neu
sicherheit: 0
zuletzt:
berufsschule: "SuD · LF5 LS5.1 (File Rescue: Zahlensysteme, Magic Numbers)"
tags: [ap1/modul, ap1/software]
---
# S1 · Zahlensysteme und Codierung

> [!abstract] Überblick
> **Bereich:** [[Übersicht Software]]
> **Dauer:** ca. 2 h · **Prüfungsrelevanz:** ★★★ – Grundlage für Subnetting, IPv6, MAC-Adressen, Farben, Rechte
> **Voraussetzungen:** keine · **Danach:** [[S2 Programmierung – Grundlagen]]
> **Berufsschule:** SuD LF5 LS5.1 (Hex-Editor, Magic Numbers)

## Lernziele
- [ ] Ich kann zwischen Dezimal-, Binär-, Oktal- und Hexadezimalsystem sicher umrechnen.
- [ ] Ich kann negative Zahlen im Zweierkomplement darstellen und Wertebereiche angeben.
- [ ] Ich kann ASCII, Unicode und UTF-8 erklären.
- [ ] Ich kann Dateitypen über Magic Numbers identifizieren.
- [ ] Ich kann logische Verknüpfungen (AND, OR, XOR, NOT) anwenden.

## Worum geht es?
Rechner kennen nur 0 und 1. Menschen lesen diese Bitfolgen lieber kompakter: als **Hexadezimalzahlen** (MAC-Adressen, IPv6, Farben `#1E90FF`, Hex-Editor) oder **Oktalzahlen** (Linux-Rechte `chmod 750`). Wer sicher umrechnet, hat es bei Subnetting, IPv6 und Programmieraufgaben deutlich leichter.

---

## 1. Stellenwertsysteme
In jedem Stellenwertsystem hat jede Stelle den Wert **Ziffer × Basis^Position** (Position von rechts ab 0).

| System | Basis | Ziffern | Schreibweisen |
|---|---|---|---|
| Dezimal | 10 | 0–9 | 202, 202₁₀ |
| **Binär (Dual)** | 2 | 0, 1 | 1100 1010₂, `0b11001010` |
| Oktal | 8 | 0–7 | 312₈, `0o312` |
| **Hexadezimal** | 16 | 0–9, A–F (A=10 … F=15) | CA₁₆, `0xCA`, `CAh`, `#CA` |

**Wichtige Zweierpotenzen:** 2⁰=1 · 2¹=2 · 2²=4 · 2³=8 · 2⁴=16 · 2⁵=32 · 2⁶=64 · 2⁷=128 · 2⁸=256 · 2¹⁰=1 024 · 2¹⁶=65 536 · 2³²≈4,29 Mrd.

---

## 2. Umrechnungen

### Beliebig → Dezimal – Stellenwerte addieren
- `1011 0110₂` = 128 + 32 + 16 + 4 + 2 = **182**
- `3F7₁₆` = 3·256 + 15·16 + 7 = 768 + 240 + 7 = **1 015**
- `750₈` = 7·64 + 5·8 + 0 = **488**

### Dezimal → Binär
**Methode A – Subtraktion der Stellenwerte** (schnell für Zahlen bis 255):
202: 128 passt (Rest 74) → 1 · 64 passt (10) → 1 · 32 nein → 0 · 16 nein → 0 · 8 passt (2) → 1 · 4 nein → 0 · 2 passt (0) → 1 · 1 nein → 0 ⇒ **1100 1010**

**Methode B – Restwertmethode** (fortlaufend durch 2 teilen, Reste **von unten nach oben** lesen):

| Rechnung | Ergebnis | Rest |
|---|---|---|
| 202 : 2 | 101 | 0 |
| 101 : 2 | 50 | 1 |
| 50 : 2 | 25 | 0 |
| 25 : 2 | 12 | 1 |
| 12 : 2 | 6 | 0 |
| 6 : 2 | 3 | 0 |
| 3 : 2 | 1 | 1 |
| 1 : 2 | 0 | 1 |
→ von unten: **1100 1010**

### Dezimal → Hex
Restwertmethode mit 16: 1 015 : 16 = 63 Rest **7** · 63 : 16 = 3 Rest **15 = F** · 3 : 16 = 0 Rest **3** → **3F7**

### Binär ↔ Hex – in 4er-Gruppen (Nibbles)
Eine Hex-Ziffer entspricht **genau 4 Bit**. Von rechts in Vierergruppen teilen:
`1011 0110` → `B` `6` → **0xB6** · `0x3F7` → `0011 1111 0111`

| Hex | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | A | B | C | D | E | F |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bin | 0000 | 0001 | 0010 | 0011 | 0100 | 0101 | 0110 | 0111 | 1000 | 1001 | 1010 | 1011 | 1100 | 1101 | 1110 | 1111 |

### Binär ↔ Oktal – in 3er-Gruppen
`111 101 000` → 7 5 0 → **750₈** – genau so funktionieren Linux-Rechte: `rwx r-x ---` = 111 101 000 = **750**.

> [!tip] Merke
> **2 Hex-Ziffern = 1 Byte** (00–FF = 0–255). Deshalb zeigen Hex-Editoren Dateien byteweise als Hex-Paare, und MAC-Adressen haben 6 Paare (6 Byte).

---

## 3. Negative Zahlen – Zweierkomplement
Rechner speichern ganze Zahlen mit **fester Bitbreite** (8, 16, 32, 64 Bit). Für negative Zahlen nutzt man das **Zweierkomplement**: Das höchste Bit hat den Wert **−2^(n−1)**.

**Bilden (−45 in 8 Bit):**
1. Betrag binär: 45 = `0010 1101`
2. alle Bits invertieren: `1101 0010`
3. +1: **`1101 0011`** (= 0xD3)

**Zurückrechnen:** höchstes Bit 1 → negativ. Invertieren und +1 ergibt den Betrag – oder schneller: vorzeichenlosen Wert − 256: `1101 0011` = 211 → 211 − 256 = **−45**.

| Bitbreite | vorzeichenlos (unsigned) | mit Vorzeichen (signed) |
|---|---|---|
| 8 Bit | 0 … 255 | −128 … 127 |
| 16 Bit | 0 … 65 535 | −32 768 … 32 767 |
| 32 Bit | 0 … 4 294 967 295 | −2 147 483 648 … 2 147 483 647 |

**Überlauf:** 127 + 1 in einem signed 8-Bit-Wert ergibt **−128**. Solche Fehler verursachen reale Softwarefehler.

---

## 4. Zeichencodierung
| Code | Bits | Umfang | Bemerkung |
|---|---|---|---|
| **ASCII** | 7 | 128 Zeichen | Buchstaben ohne Umlaute, Ziffern, Steuerzeichen; `A` = 65 = 0x41, `a` = 97 = 0x61, `0` = 48 = 0x30 |
| **ISO 8859-1 / -15** (Latin-1/-9) | 8 | 256 | westeuropäische Zeichen, Umlaute; -15 mit €-Zeichen |
| **Unicode** | – | > 150 000 Zeichen | Zeichensatz für alle Schriften und Emojis, Codepunkte wie U+00E4 (ä) |
| **UTF-8** | 8–32 (1–4 Byte) | ganz Unicode | **ASCII-kompatibel**, Standard im Web und unter Linux |
| UTF-16 | 16/32 | ganz Unicode | intern in Windows/Java |

Falsche Codierung → „Mojibake“: `Ã¤` statt `ä` (UTF-8-Text als Latin-1 gelesen).

**Magic Numbers:** Viele Dateiformate beginnen mit einer festen Bytefolge – daran erkennt man den Typ auch ohne Dateiendung (Hex-Editor, z. B. HxD):

| Format | Beginn (hex) | als Text |
|---|---|---|
| PDF | `25 50 44 46` | `%PDF` |
| PNG | `89 50 4E 47` | `.PNG` |
| JPEG | `FF D8 FF` | |
| ZIP (auch DOCX/XLSX) | `50 4B 03 04` | `PK..` |
| Windows-Programm (EXE) | `4D 5A` | `MZ` |

---

## 5. Logische Verknüpfungen
| A | B | AND | OR | XOR | NAND | NOR |
|---|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 | 1 | 1 |
| 0 | 1 | 0 | 1 | 1 | 1 | 0 |
| 1 | 0 | 0 | 1 | 1 | 1 | 0 |
| 1 | 1 | 1 | 1 | 0 | 0 | 0 |
NOT kehrt um (0 → 1).

**Anwendungen:** Netzadresse = IP **AND** Maske ([[N2 IPv4 und Subnetting]]) · RAID-Parität = **XOR** ([[H4 Server, NAS und RAID]]) · Bitmasken für Rechte und Flags · Bedingungen in Programmen (`and`, `or`, `not`).

---

> [!warning] Typische Fehler in Prüfungen
> - Restwertmethode von oben nach unten ablesen (richtig: **von unten nach oben**).
> - Hex-Buchstaben falsch umrechnen (B = 11, D = 13, E = 14).
> - Beim Zweierkomplement die feste Bitbreite ignorieren (führende Nullen/Einsen gehören dazu!).
> - Nibbles von links statt von rechts bilden, wenn die Bitzahl kein Vielfaches von 4 ist.

## Verwandte Themen
- [[N2 IPv4 und Subnetting]] – Subnetzmasken binär
- [[N1 Netzwerkgrundlagen und OSI-Modell]] – Hex-Werte in Paketheadern
- [[S4 Betriebssysteme, Dateisysteme und Rechte]] – Linux-Rechte oktal

## Zusammenfassung
- Stellenwert = Ziffer × Basis^Position; beliebig → dezimal durch Aufsummieren.
- Dezimal → andere Basis: Restwertmethode (von unten lesen) oder Stellenwerte abziehen.
- Bin ↔ Hex in 4er-Gruppen, Bin ↔ Oktal in 3er-Gruppen; 2 Hex-Ziffern = 1 Byte.
- Zweierkomplement: invertieren + 1; 8 Bit signed = −128 … 127.
- ASCII 7 Bit, UTF-8 variabel und ASCII-kompatibel; Magic Numbers erkennen Dateitypen.
- AND (Netzadresse), XOR (Parität).

## Direkt üben
```dataviewjs
await dv.view("99 System/views/trainer", { typen: ["zahlensysteme", "zweierkomplement"] })
```

## Selbstcheck
```dataviewjs
await dv.view("99 System/views/quiz", { modul: "S1" })
```

**Weitere Aufgaben:** [[Aufgaben Software#S1 Zahlensysteme und Codierung]] · **Karteikarten:** [[Karten Software]]

## Einschätzung
```dataviewjs
await dv.view("99 System/views/selbstcheck")
```

---
← [[H6 Drucker, Peripherie und Mobilgeräte]] · Weiter: [[S2 Programmierung – Grundlagen]] →
