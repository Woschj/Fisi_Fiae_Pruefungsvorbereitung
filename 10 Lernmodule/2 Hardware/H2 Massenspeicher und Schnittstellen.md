---
modul: H2
titel: Massenspeicher und Schnittstellen
bereich: Hardware
reihenfolge: 9
dauer: 90
status: neu
sicherheit: 0
zuletzt:
berufsschule: "GiD · LF2 LS2.1 (Schnittstellen im Modellvergleich) · LS2.3 (Festplatte)"
tags: [ap1/modul, ap1/hardware]
---
# H2 · Massenspeicher und Schnittstellen

> [!abstract] Überblick
> **Bereich:** [[Übersicht Hardware]]
> **Dauer:** ca. 90 min · **Prüfungsrelevanz:** ★★☆ – HDD vs. SSD begründen, Schnittstellen und Engpässe erkennen
> **Voraussetzungen:** [[H1 PC-Komponenten und Arbeitsplatzgeräte]]
> **Berufsschule:** GiD LF2 LS2.1 (Schnittstellen der Raspberry-Pi-Modelle)

## Lernziele
- [ ] Ich kann HDD, SATA-SSD und NVMe-SSD nach Technik, Tempo, Haltbarkeit und Einsatz vergleichen.
- [ ] Ich weiß, dass M.2 ein Formfaktor ist und NVMe ein Protokoll.
- [ ] Ich kann die USB-Generationen, Thunderbolt, HDMI und DisplayPort mit Datenraten einordnen.
- [ ] Ich erkenne in einer Gerätekette den Engpass (Flaschenhals).

## Worum geht es?
Ein Kunde kauft eine teure NVMe-SSD und steckt sie in ein billiges USB-Gehäuse – und wundert sich, warum die Kopie „nur“ mit 400 MB/s läuft. Oder: Das neue Notebook hat drei USB-C-Buchsen, aber nur eine davon kann den Monitor ansteuern. Wer Schnittstellen versteht, verhindert solche Fehlkäufe.

---

## 1. Massenspeicher

| | **HDD** (Festplatte) | **SATA-SSD** | **NVMe-SSD** |
|---|---|---|---|
| Technik | rotierende Magnetscheiben, Schreib-/Leseköpfe | Flash-Speicher (NAND) | Flash-Speicher, direkt an **PCIe** |
| sequenziell | ca. 150–280 MB/s | ca. 550 MB/s (SATA-Grenze) | PCIe 3.0 ~3 500, PCIe 4.0 ~7 000, PCIe 5.0 >10 000 MB/s |
| Zugriffszeit | Millisekunden (Kopf muss sich bewegen) | Mikrosekunden | Mikrosekunden |
| Stoßempfindlich | **ja** | nein | nein |
| Geräusch, Wärme | hörbar, mehr Strom | lautlos, sparsam | lautlos, kann heiß werden |
| Preis pro TB | **am günstigsten** | mittel | mittel |
| Kapazität | bis > 20 TB | bis 8 TB | bis 8 TB+ |
| Einsatz | Archiv, NAS, Backup, Videoüberwachung | Aufrüstung älterer PCs | **Systemlaufwerk**, Workstations, Server |

**Kenngrößen bei SSDs:**
- **TBW** (Terabytes Written): garantierte Schreibmenge bis zum Verschleiß · **DWPD** (Drive Writes Per Day) bei Server-SSDs
- **IOPS**: Ein-/Ausgaben pro Sekunde – wichtig für Datenbanken und viele kleine Dateien
- **TRIM**: Betriebssystem meldet gelöschte Blöcke, damit die SSD schnell bleibt
- Flash-Zelltypen: SLC > MLC > TLC > QLC (mehr Bits pro Zelle = günstiger, aber weniger haltbar und langsamer beim Dauerschreiben)

**Kenngröße bei HDDs:** Drehzahl (5 400 / 7 200 rpm), **MTBF** (mittlere Betriebsdauer zwischen Ausfällen), Cache. Für NAS-Dauerbetrieb **NAS-Platten** mit höherer Belastbarkeit wählen.

> [!info] M.2 ≠ NVMe
> **M.2** ist nur der **Formfaktor** (Steckkarte, z. B. 22 × 80 mm = „2280“). Es gibt M.2-SSDs mit **SATA**-Protokoll *und* mit **NVMe** über PCIe. Vor dem Kauf prüfen, was der M.2-Slot des Mainboards unterstützt (Handbuch; Kerben M/B-Key).

**Datenschutz bei Entsorgung:** SSDs nicht einfach „überschreiben“ (Wear Leveling!) – **Secure Erase** des Herstellers oder physische Vernichtung; bei verschlüsselten Laufwerken genügt das Löschen des Schlüssels (**Crypto Erase**). Siehe [[I2 Datenschutz]].

---

<!-- erg:S.M.A.R.T. -->
### Zustand überwachen mit S.M.A.R.T.
**S.M.A.R.T.** (Self-Monitoring, Analysis and Reporting Technology) – HDDs und SSDs überwachen sich selbst und speichern Werte wie Betriebsstunden, Temperatur, **neu zugewiesene (defekte) Sektoren**, Lesefehler und bei SSDs den **Verschleiß** (geschriebene Datenmenge, verbleibende Lebensdauer). Werkzeuge und Monitoring-Systeme lesen die Werte aus und **warnen frühzeitig**. S.M.A.R.T. kann einen Ausfall ankündigen, aber nicht garantiert vorhersagen – ein Backup ersetzt es nicht.

## 2. Externe Schnittstellen

### USB
| Bezeichnung (aktuell) | alter Name | Datenrate |
|---|---|---|
| USB 2.0 Hi-Speed | – | 480 Mbit/s |
| USB 3.2 Gen 1 (**USB 5Gbps**) | USB 3.0 / 3.1 Gen 1 | 5 Gbit/s |
| USB 3.2 Gen 2 (**USB 10Gbps**) | USB 3.1 Gen 2 | 10 Gbit/s |
| USB 3.2 Gen 2×2 (**USB 20Gbps**) | – | 20 Gbit/s |
| **USB4** (v1) | – | 20 / 40 Gbit/s |
| **USB4 v2** | – | 80 Gbit/s |

- **USB-C ist nur der Stecker!** Welche Datenrate und Funktionen (DisplayPort Alt Mode, Laden, Thunderbolt) eine Buchse kann, steht im Datenblatt/auf dem Symbol.
- **USB Power Delivery (PD):** Laden bis 100 W (mit EPR bis 240 W) – ein Kabel für Strom, Bild und Daten.
- USB ist **Hot-Plug-fähig** und **Plug & Play**, versorgt Geräte mit Strom, bis 127 Geräte am Host.

### Thunderbolt
- **Thunderbolt 3/4:** 40 Gbit/s über USB-C, PCIe-Tunnel (externe GPUs, schnelle SSDs), Daisy Chain; TB4 garantiert Mindeststandards (2 × 4K-Monitore, 32 Gbit/s PCIe, Laden)
- **Thunderbolt 5:** 80 Gbit/s (bis 120 Gbit/s in eine Richtung für Monitore)
- Einsatz: Dockingstations, Video-Storage

### Bildschirm
| Schnittstelle | Signal | Datenrate | Hinweis |
|---|---|---|---|
| VGA | analog | – | veraltet |
| DVI | digital (DVI-I auch analog) | – | veraltet |
| HDMI 2.0 | digital, Bild + Ton | 18 Gbit/s | 4K @ 60 Hz |
| HDMI 2.1 | digital | 48 Gbit/s | 4K @ 120 Hz, 8K |
| DisplayPort 1.4 | digital | 32,4 Gbit/s | **Daisy Chain (MST)**: mehrere Monitore an einem Port |
| DisplayPort 2.1 | digital | bis 80 Gbit/s | |
| USB-C (DP Alt Mode) | DisplayPort über USB-C | | Notebook ↔ Monitor mit einem Kabel |

<!-- abb:anschluesse -->
![[anschluesse.svg]]
*Abb.: Wichtige Anschlüsse im Vergleich*

### Netzwerk und Funk
RJ45 (Ethernet 1/2,5/10 Gbit/s), SFP/SFP+ (Glasfaser), WLAN, **Bluetooth** (Maus, Headset, kurze Reichweite), NFC.

---

<!-- erg:Stromversorgung und Symbole -->
### Stromversorgung und Symbole
| Anschluss | Einsatz |
|---|---|
| **Kaltgerätestecker/-buchse** (C13/C14) | Netzkabel für PC-Netzteile, Monitore, Server, USV-Ausgänge – „kalt“, weil nicht für heiße Geräte wie Wasserkocher gedacht |
| **C7/C8** („Achterstecker“) | kleine Netzteile, Drucker, Konsolen |
| **Schuko** (Typ F) | Steckdosen in Deutschland |
| **Hohlstecker** | externe Netzteile älterer Geräte |

**Strom über USB:** USB 2.0 liefert **0,5 A** bei 5 V (2,5 W), USB 3.x **0,9 A** (4,5 W). Ladeports nach Battery Charging liefern bis **1,5 A**, viele Ladegeräte **2,4 A** (12 W). Mit **USB Power Delivery** sind bis 5 A und 48 V möglich (240 W). Hängt ein Gerät mit hohem Strombedarf an einem schwachen Port oder passiven Hub, lädt es nicht oder startet nicht.

**Symbole erkennen:** USB = Dreizack · Thunderbolt = Blitz · Bluetooth = Runenzeichen (verbundenes „B“) · WLAN = Fächer aus Kreisbögen · Netzwerk = drei verbundene Quadrate · DisplayPort = Rechteck mit Strichen · HDMI-Schriftzug.

## 3. Interne Schnittstellen

| Schnittstelle | Einsatz | Bandbreite |
|---|---|---|
| **SATA III** | HDD, 2,5"-SSD, optische Laufwerke | 6 Gbit/s (~550 MB/s netto) |
| **PCIe 3.0** | pro Lane | ~1 GB/s |
| **PCIe 4.0** | pro Lane | ~2 GB/s |
| **PCIe 5.0** | pro Lane | ~4 GB/s |
| **M.2** | Formfaktor für SSD (SATA oder NVMe), WLAN-Module | je nach Protokoll |

Lanes bündeln sich: **x1, x4, x8, x16**. NVMe-SSDs nutzen meist **x4**, Grafikkarten **x16**. Eine PCIe-4.0-x4-SSD schafft also bis ca. 8 GB/s brutto.

---

## 4. Engpass-Denken

> [!example] Beispiel: Wo ist der Flaschenhals?
> NVMe-SSD (7 000 MB/s) in einem **USB-3.2-Gen-1-Gehäuse** (5 Gbit/s) am Notebook:
> 5 Gbit/s / 8 = 625 MB/s brutto, abzüglich Protokoll-Overhead **ca. 400–450 MB/s**.
> → Die Schnittstelle begrenzt. Abhilfe: Gehäuse und Port mit USB 3.2 Gen 2 (10 Gbit/s), USB4 oder Thunderbolt.

**Regel:** Die **langsamste** Komponente in der Kette bestimmt das Tempo (Quelle, Schnittstelle, Kabel, Ziel, ggf. Netzwerk).

> [!question]- Kurz nachgedacht: Datensicherung vom NAS auf eine USB-Platte am PC, alles per Gigabit-LAN. Was begrenzt?
> Das **Netzwerk**: 1 Gbit/s ≈ 125 MB/s brutto, netto ca. 110 MB/s. Eine HDD (~200 MB/s) oder SSD wäre schneller – das LAN ist der Engpass.

---

> [!warning] Typische Fehler in Prüfungen
> - „USB-C = schnell“ – USB-C sagt nichts über die Datenrate.
> - M.2 mit NVMe gleichsetzen.
> - Datenraten in Bit und Byte vermischen (5 Gbit/s ≠ 5 GB/s).
> - Die SSD für jede Aufgabe empfehlen – für große Archive/Backups ist die HDD wirtschaftlicher.

## Verwandte Themen
- [[H3 Datenmengen und Übertragung]] – Übertragungsdauer berechnen
- [[H1 PC-Komponenten und Arbeitsplatzgeräte]] – Mainboard-Steckplätze
- [[I3 Datensicherung]] – Medien für die Datensicherung

## Zusammenfassung
- HDD günstig und groß, aber langsam und stoßempfindlich; SSD schnell und robust; NVMe über PCIe am schnellsten.
- M.2 = Formfaktor, NVMe = Protokoll, SATA-SSD ≈ 550 MB/s.
- USB 2.0 480 Mbit/s · 5 · 10 · 20 · USB4 40/80 Gbit/s; USB-C nur Stecker; TB 40/80 Gbit/s.
- HDMI 2.0 18, HDMI 2.1 48, DP 1.4 32,4 Gbit/s; DP kann Daisy Chain.
- Die langsamste Stelle der Kette bestimmt das Tempo.

## Direkt üben
```dataviewjs
await dv.view("99 System/views/trainer", { typen: ["einheiten", "uebertragung"] })
```

## Selbstcheck
```dataviewjs
await dv.view("99 System/views/quiz", { modul: "H2" })
```

**Weitere Aufgaben:** [[Aufgaben Hardware#H2 Massenspeicher und Schnittstellen]] · **Karteikarten:** [[Karten Hardware]]

## Einschätzung
```dataviewjs
await dv.view("99 System/views/selbstcheck")
```

---
← [[H1 PC-Komponenten und Arbeitsplatzgeräte]] · Weiter: [[H3 Datenmengen und Übertragung]] →
