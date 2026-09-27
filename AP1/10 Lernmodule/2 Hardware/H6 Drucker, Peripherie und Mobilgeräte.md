---
modul: H6
titel: Drucker, Peripherie und Mobilgeräte
bereich: Hardware
reihenfolge: 13
dauer: 75
status: neu
sicherheit: 0
zuletzt:
berufsschule: "Evp-CPS · LF2 (Arbeitsplätze nach Kundenwunsch ausstatten) – Peripherie"
tags: [ap1/modul, ap1/hardware]
---
# H6 · Drucker, Peripherie und Mobilgeräte

> [!abstract] Überblick
> **Bereich:** [[Übersicht Hardware]]
> **Dauer:** ca. 75 min · **Prüfungsrelevanz:** ★★☆ – Druckkosten pro Seite und Break-even sind beliebte Rechenaufgaben, Notebook/Tablet-Auswahl und MDM kommen im Szenario vor
> **Voraussetzungen:** [[H1 PC-Komponenten und Arbeitsplatzgeräte]], [[W3 Investition und Finanzierung]] (Break-even)
> **Berufsschule:** Lernfeld 2 – Arbeitsplatz ausstatten

## Lernziele
- [ ] Ich kann Laser-, Tintenstrahl- und Thermodrucker vergleichen und passend zum Einsatz empfehlen.
- [ ] Ich kann Seitenkosten, Gesamtkosten und den Break-even zwischen zwei Druckern berechnen.
- [ ] Ich kann Kenngrößen von Druckern und Scannern (ppm, dpi, Duty Cycle) erklären.
- [ ] Ich kann Notebook, Tablet und Smartphone für einen Einsatzzweck auswählen und begründen.
- [ ] Ich kann erklären, wozu ein Mobile Device Management dient.

## Worum geht es?
Die Buchhaltung druckt täglich Rechnungen, der Außendienst braucht ein leichtes Notebook, das Lager scannt Etiketten. Für jeden Zweck gibt es passende Geräte – und die **Folgekosten** sind oft wichtiger als der Kaufpreis: Ein Drucker für 89 € kann über drei Jahre teurer sein als einer für 320 €.

---

## 1. Druckverfahren
| Verfahren | Funktionsweise | Stärken | Schwächen | typischer Einsatz |
|---|---|---|---|---|
| **Laser** | Trommel wird belichtet, zieht **Tonerpulver** an, das auf dem Papier **eingebrannt** (fixiert) wird | niedrige Seitenkosten, schnell, wischfest, hohe Druckvolumen | teurer in der Anschaffung, Feinstaub/Ozon (Aufstellort mit Lüftung), Fotos schwächer | Büro, Rechnungen, viele Seiten s/w |
| **Tintenstrahl** | Düsen spritzen winzige **Tintentropfen** (thermisch oder piezoelektrisch) | günstig in der Anschaffung, gute Farb- und Fotoqualität | hohe Seitenkosten mit Patronen, Düsen trocknen bei seltener Nutzung ein | wenig Druckvolumen, Fotos; **Tintentank**-Geräte senken die Seitenkosten stark |
| **Thermodirekt** | wärmeempfindliches Papier verfärbt sich an beheizten Stellen | kein Verbrauchsmaterial außer Papier, leise, robust | Ausdruck verblasst (Wärme, Licht) | Kassenbons, Versandetiketten |
| **Thermotransfer** | Farbband wird per Wärme auf das Etikett übertragen | beständige Etiketten | Farbband nötig | Barcode-, Inventar- und Typenschild-Etiketten |
| **Nadeldrucker** | Nadeln schlagen durch ein Farbband | **Durchschläge** (Mehrfachformulare), sehr robust | laut, langsam | Lieferscheine mit Durchschlag, Logistik |

**Multifunktionsgerät (MFP/MFD):** Drucken, Scannen, Kopieren, oft Fax und **Scan-to-Mail/Scan-to-Folder** in einem Gerät. Spart Platz und Anschaffungskosten; fällt es aus, fehlen alle Funktionen. Für Abteilungen üblich mit **Follow-Me-Printing** (Ausdruck erst nach Anmeldung per Karte/PIN am Gerät → Datenschutz, weniger Fehldrucke).

## 2. Kenngrößen im Datenblatt
| Angabe | Bedeutung |
|---|---|
| **ppm** (pages per minute) | Druckgeschwindigkeit in Seiten pro Minute (s/w und Farbe getrennt) |
| **dpi** (dots per inch) | Druckauflösung, z. B. 1 200 × 1 200 dpi; für Text reichen 600 dpi |
| **FPOT** (first page out time) | Zeit bis zur ersten Seite – wichtig bei vielen Einzelaufträgen |
| **Duty Cycle** | **maximale** Seiten pro Monat, die das Gerät verkraftet – nicht als Dauerlast gedacht |
| **empfohlenes Druckvolumen** | Seiten pro Monat für den Dauerbetrieb – danach auswählen |
| **Duplex** | automatischer beidseitiger Druck – spart Papier |
| **Reichweite** | Seiten pro Toner/Patrone nach **ISO/IEC 19752** (s/w) bzw. **19798** (Farbe) bei 5 % Deckung |
| **Anschlüsse** | USB, LAN, WLAN, AirPrint/Mopria, Druck aus der Cloud |
| **Papierfächer** | Kapazität, Formate, Etiketten und Umschläge |

## 3. Druckkosten berechnen
Die Kosten pro Seite entstehen fast nur durch das **Verbrauchsmaterial**:

**Seitenkosten = Preis des Verbrauchsmaterials ÷ Reichweite in Seiten** (+ ggf. Trommel, Papier, Strom, Wartung)

> [!example] Beispiel durchgerechnet – 600 Seiten pro Monat, 36 Monate
> | | Tintenstrahl | Laser |
> |---|---|---|
> | Anschaffung | 120,00 € | 320,00 € |
> | Verbrauchsmaterial | Patrone 28,00 € für 450 Seiten | Toner 85,00 € für 3 000 Seiten |
> | Seitenkosten | 28 ÷ 450 = **6,22 ct** | 85 ÷ 3 000 = **2,83 ct** |
> | Seiten gesamt | 600 × 36 = 21 600 | 21 600 |
> | Gesamtkosten | 120 + 21 600 × 0,0622 = **1 464,00 €** | 320 + 21 600 × 0,0283 = **932,00 €** |
>
> **Break-even:** 120 + x · 0,06222 = 320 + x · 0,02833 → x = 200 ÷ 0,03389 ≈ **5 902 Seiten** – bei 600 Seiten im Monat also nach knapp **10 Monaten**. Danach ist der Laser günstiger.
> (Mit gerundeten Seitenkosten ergeben sich wenige Cent Unterschied – in der Prüfung Rechenweg zeigen, dann zählt die Methode.)

> [!question]- Kurz nachgedacht: Warum rechnet man bei Druckern mit der Gesamtbetriebskostenbetrachtung (TCO)?
> Weil der Kaufpreis nur einen kleinen Teil ausmacht. Über die Nutzungsdauer dominieren Toner/Tinte, Papier, Wartung und Strom. Ein billiger Drucker mit teuren Patronen kann ein Vielfaches kosten ([[W1 Beschaffung und Kalkulation]], TCO).

**Weitere Kostensenker:** Duplex als Standard, s/w als Standard, Follow-Me-Printing, zentrale Abteilungsdrucker statt Einzelplatzdrucker, **Managed Print Services** (Anbieter stellt Geräte und Verbrauchsmaterial, Abrechnung pro Seite).

## 4. Scanner und weitere Peripherie
| Gerät | worauf achten |
|---|---|
| **Dokumentenscanner** | **ADF** (automatischer Einzug) und **Duplex-Scan**, Seiten pro Minute, **OCR** (Texterkennung → durchsuchbares PDF), 300 dpi für Dokumente, Ablage per Scan-to-Folder |
| **Flachbettscanner** | Bücher, empfindliche Vorlagen, Fotos (600+ dpi) |
| **Barcode-/QR-Scanner** | 1D/2D, kabellos, robust (Lager), meldet sich als Tastatur (HID) |
| **Headset** | USB oder Bluetooth, **Noise Cancelling** fürs Mikrofon, zertifiziert für das Konferenzsystem, bei Großraumbüros wichtig |
| **Webcam** | Auflösung, Autofokus, Lichtempfindlichkeit, Abdeckung (Privatsphäre) |
| **Dockingstation** | ein Kabel (USB-C/Thunderbolt) für Monitore, Netzwerk, Peripherie **und Laden** – prüfen: Anzahl/Auflösung der Monitore, **Power Delivery** in Watt passend zum Notebook |
| **Dokumentenkamera/Präsentation** | Beamer (Lumen, Auflösung), interaktive Displays |

## 5. Mobile Endgeräte
| Gerät | Stärken | Grenzen | typischer Einsatz |
|---|---|---|---|
| **Notebook** | vollwertiger Arbeitsplatz, mit Dockingstation am Schreibtisch | Gewicht, ergonomisch nur mit externem Monitor/Tastatur | Außendienst, Homeoffice, Wechselarbeitsplätze |
| **Convertible/2-in-1** | Notebook und Tablet mit Stift | teurer, Kompromisse bei Tastatur | Beratung beim Kunden, Notizen |
| **Tablet** | leicht, lange Akkulaufzeit, Touch, sofort bereit | eingeschränkte Software, kein Ersatz für Büroarbeit | Präsentation, Checklisten, Lieferung, Lager |
| **Rugged-Gerät** | Schutz gegen Stoß, Staub, Wasser (**IP65/IP67**), Scanner integriert | teuer, schwer | Baustelle, Logistik, Außeneinsatz |
| **Smartphone** | immer dabei, Kommunikation, Zwei-Faktor-App | kleiner Bildschirm | Erreichbarkeit, MFA, Fotos für Dokumentation |

**Auswahlkriterien für Notebooks:** Prozessor/RAM passend zur Software · SSD-Größe · **Gewicht und Akkulaufzeit** (Außendienst) · Display (Größe, entspiegelt, Helligkeit für draußen) · Anschlüsse (USB-C mit Power Delivery, Dockingstation) · **LTE/5G** · **TPM** und Fingerabdruck/Kamera für Windows Hello · Robustheit · **Garantie mit Vor-Ort-Service** · Business-Serie mit langer Ersatzteilversorgung.

**Akkukapazität** wird in **Wh** angegeben (Energie): W = Q · U, z. B. 4 000 mAh × 15,4 V ≈ 61,6 Wh. Für Flugreisen gilt: bis **100 Wh** ohne Genehmigung im Handgepäck.

### Mobile Device Management (MDM)
Firmen verwalten mobile Geräte zentral mit einem **MDM** (z. B. Microsoft Intune):
- Geräte **registrieren** und Einstellungen verteilen (WLAN, VPN, E-Mail, Zertifikate)
- Apps verteilen, erlauben oder sperren; Updates erzwingen
- Richtlinien: **Bildschirmsperre/PIN**, **Geräteverschlüsselung**, kein Jailbreak/Root
- verlorenes Gerät **orten, sperren, löschen** (Remote Wipe)
- bei privaten Geräten (**BYOD**): **Containerlösung** trennt dienstliche und private Daten – die Firma löscht nur den Dienst-Container ([[N6 WLAN]], [[I5 Bedrohungen und Schutzmaßnahmen]])

## 6. Entsorgung und Datenträger
Drucker, Kopierer und Multifunktionsgeräte haben oft eine **Festplatte oder SSD** mit gespeicherten Scans und Druckaufträgen. Vor Rückgabe (Leasing!) oder Entsorgung: Daten sicher löschen bzw. Datenträger nach **DIN 66399** vernichten; Altgeräte nach **ElektroG** getrennt entsorgen; leere Toner über das Rücknahmesystem des Herstellers ([[P5 Arbeitsplatz, Ergonomie und Umwelt]]).

---

> [!warning] Typische Fehler in Prüfungen
> - Nur den Anschaffungspreis vergleichen und die Seitenkosten vergessen.
> - Seitenkosten in Euro und Cent vermischen – Einheit an jedes Zwischenergebnis.
> - Duty Cycle als Dauerlast interpretieren (entscheidend ist das empfohlene Druckvolumen).
> - Thermodirektdruck für Etiketten empfehlen, die Jahre halten müssen (richtig: Thermotransfer).
> - Tablet als vollwertigen Büroarbeitsplatz empfehlen, ohne Tastatur/Monitor/Software zu prüfen.
> - Beim Leasing-Rückläufer die Festplatte im Multifunktionsgerät vergessen.

## Verwandte Themen
- [[W3 Investition und Finanzierung]] – Break-even-Rechnung
- [[W1 Beschaffung und Kalkulation]] – TCO statt Kaufpreis
- [[I2 Datenschutz]] – Datenträger in Multifunktionsgeräten

## Zusammenfassung
- Laser: günstig pro Seite, hohes Volumen · Tinte: günstig in der Anschaffung, teure Seiten (außer Tintentank) · Thermo: Bons/Etiketten.
- Seitenkosten = Verbrauchsmaterial ÷ Reichweite; Gesamtkosten = Anschaffung + Seiten × Seitenkosten; Break-even durch Gleichsetzen.
- Datenblatt: ppm, dpi, FPOT, Duty Cycle vs. empfohlenes Volumen, Duplex, Reichweite nach ISO.
- Mobilgeräte nach Einsatz wählen: Gewicht, Akku, Robustheit (IP), LTE, Docking, Service.
- MDM: Konfiguration, Apps, Richtlinien, Verschlüsselung, Orten/Sperren/Löschen, BYOD-Container.

## Direkt üben
```dataviewjs
await dv.view("AP1/99 System/views/trainer", { typen: ["druckkosten"] })
```

## Selbstcheck
```dataviewjs
await dv.view("AP1/99 System/views/quiz", { modul: "H6" })
```

**Weitere Aufgaben:** [[Aufgaben Hardware#H6 Drucker, Peripherie und Mobilgeräte]] · **Karteikarten:** [[Karten Hardware]]

## Einschätzung
```dataviewjs
await dv.view("AP1/99 System/views/selbstcheck")
```

---
← [[H5 Elektrotechnik, USV und Energie]] · Weiter: [[S1 Zahlensysteme und Codierung]] →
