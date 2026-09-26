---
bereich: Hardware
tags: [ap1/aufgaben, ap1/hardware]
---
# Aufgaben Hardware

★ Einstieg · ★★ Prüfungsniveau · ★★★ anspruchsvoll · ≈ 1 Minute pro Punkt. Unbegrenzte Rechenaufgaben: [[Trainer#Hardware]].

> [!info] Ausgangssituation
> Das Steuerbüro **Kranz & Partner** (fiktiv, 18 Mitarbeitende) erneuert seine IT: neue Arbeitsplätze, ein neuer Server mit NAS und eine USV. Du berätst die Kanzlei.

---

## H1 PC-Komponenten und Arbeitsplatzgeräte

### H1.1 ★★ – Arbeitsplätze ausstatten (9 Punkte)
📘 **Nachlernen:** [[H1 PC-Komponenten und Arbeitsplatzgeräte#10. So begründest du eine Auswahl|H1 › So begründest du eine Auswahl]] · [[H1 PC-Komponenten und Arbeitsplatzgeräte#8. Geräteklassen|H1 › Geräteklassen]] · [[H1 PC-Komponenten und Arbeitsplatzgeräte#3. Arbeitsspeicher (RAM)|H1 › Arbeitsspeicher]]

Drei Profile: (A) Sachbearbeitung mit Office, DATEV im Browser, zwei Monitore · (B) Auszubildende, wechselnde Plätze, auch Homeoffice · (C) Systemadministrator mit mehreren Test-VMs.
Empfiehl je Profil Geräteklasse, RAM und eine weitere entscheidende Komponente – mit Begründung.

> [!success]- Lösung (Beispiel)
> - **A:** Desktop- oder Mini-PC, **16 GB RAM**, CPU mit **iGPU**, die **zwei Monitore** unterstützt (2 × DisplayPort) – Office braucht keine dedizierte Grafik, spart Kosten und Strom. (3 P)
> - **B:** **Notebook** mit **16 GB** und **USB-C-/Thunderbolt-Dockingstation** – ein Kabel für Monitor, LAN, Peripherie, Strom → flexibel an jedem Platz und mobil fürs Homeoffice. (3 P)
> - **C:** leistungsfähiger Desktop/Workstation, **32–64 GB RAM** (jede VM reserviert eigenen RAM), **CPU mit vielen Kernen** und **Virtualisierungsunterstützung**, schnelle **NVMe-SSD** für die VM-Images. (3 P)

### H1.2 ★★ – Monitor bewerten (6 Punkte)
📘 **Nachlernen:** [[H1 PC-Komponenten und Arbeitsplatzgeräte#7. Monitor|H1 › Monitor]] · [[P5 Arbeitsplatz, Ergonomie und Umwelt#2. Der ergonomische Bildschirmarbeitsplatz|P5 › Der ergonomische Bildschirmarbeitsplatz]]

Zur Wahl stehen: Monitor 1: 24", 1920×1080, TN, 144 Hz, nicht höhenverstellbar · Monitor 2: 27", 2560×1440, IPS, 60 Hz, höhenverstellbar, entspiegelt, USB-C mit 65 W PD.
a) Berechne die Pixeldichte beider Monitore. b) Welchen empfiehlst du für die Sachbearbeitung? Begründe mit zwei Argumenten.

> [!success]- Lösung
> a) M1: √(1920² + 1080²) = 2 202,9 / 24 = **91,8 ppi** · M2: √(2560² + 1440²) = 2 937,2 / 27 = **108,8 ppi** (je 2 P)
> b) **Monitor 2**: höhere Pixeldichte und Arbeitsfläche (mehr Inhalt, schärfere Schrift), IPS farb- und blickwinkelstabil, **ergonomisch** (höhenverstellbar, entspiegelt – ArbStättV), USB-C mit PD versorgt ein Notebook über ein Kabel. 144 Hz bringt im Büro keinen Nutzen. (2 P)

### H1.3 ★ – Datenblatt lesen (4 Punkte)
📘 **Nachlernen:** [[H1 PC-Komponenten und Arbeitsplatzgeräte#2. Prozessor (CPU)|H1 › Prozessor]]

Erkläre die Angaben: „8 Kerne / 16 Threads, 3,8–5,1 GHz, 32 MB L3, 65 W TDP“.

> [!success]- Lösung
> 8 physische Rechenkerne, per SMT je 2 Threads (16 parallele Befehlsströme) · Basistakt 3,8 GHz, Boost bis 5,1 GHz · 32 MB schneller Zwischenspeicher (L3-Cache) auf dem Chip · typische Wärmeabgabe 65 W → Kühlung und Stromverbrauch. (je 1 P)

---

## H2 Massenspeicher und Schnittstellen

### H2.1 ★★ – Speicher auswählen (6 Punkte)
📘 **Nachlernen:** [[H2 Massenspeicher und Schnittstellen#1. Massenspeicher|H2 › Massenspeicher]]

Für die neuen PCs wird zwischen einer 1-TB-HDD (7 200 rpm) und einer 1-TB-NVMe-SSD (PCIe 4.0) gewählt. Vergleiche anhand von drei Kriterien und gib eine Empfehlung.

> [!success]- Lösung
> - **Geschwindigkeit/Zugriffszeit:** SSD ca. 7 000 MB/s und µs-Zugriff vs. HDD ~200 MB/s und ms → Systemstart, Programme deutlich schneller. (2 P)
> - **Robustheit/Geräusch:** SSD ohne mechanische Teile, stoßfest, lautlos. (2 P)
> - **Preis/TB und Kapazität:** HDD günstiger pro TB – für Arbeitsplatz-PCs mit 1 TB kaum relevant. (1 P)
> Empfehlung: **NVMe-SSD** als Systemlaufwerk; große Datenmengen gehören ohnehin auf den Server/das NAS. (1 P)

### H2.2 ★★ – Engpass (5 Punkte)
📘 **Nachlernen:** [[H2 Massenspeicher und Schnittstellen#4. Engpass-Denken|H2 › Engpass-Denken]] · [[H3 Datenmengen und Übertragung#3. Übertragungsdauer|H3 › Übertragungsdauer]]

Ein Mitarbeiter kopiert 60 GB Scans von einer externen SSD (USB 3.2 Gen 2) über einen USB-Hub (USB 2.0) auf seinen PC.
a) Wo liegt der Engpass? b) Wie lange dauert die Kopie mindestens? c) Was empfiehlst du?

> [!success]- Lösung
> a) Der **USB-2.0-Hub** (480 Mbit/s) begrenzt die Kette. (1 P)
> b) 60 · 10⁹ · 8 = 480 · 10⁹ Bit / 480 · 10⁶ Bit/s = **1 000 s ≈ 16 min 40 s** (theoretisch; praktisch länger). (2 P)
> c) Direkt an einen Port mit **USB 3.2 Gen 2 (10 Gbit/s)** anschließen → theoretisch 48 s. (2 P)

### H2.3 ★ – USB-C (4 Punkte)
📘 **Nachlernen:** [[H2 Massenspeicher und Schnittstellen#USB|H2 › USB]]

Die neuen Notebooks haben drei USB-C-Buchsen. Erkläre, warum man vor dem Anschluss eines Monitors und des Netzteils ins Datenblatt schauen sollte.

> [!success]- Lösung
> USB-C ist nur die **Steckerform**. Nicht jede Buchse unterstützt **DisplayPort Alt Mode/Thunderbolt** (Bildausgabe) oder **Power Delivery** (Laden) – oft kann das nur eine bestimmte Buchse (Symbole: Blitz, DP-Logo, Batterie). Datenrate kann zwischen 480 Mbit/s und 40 Gbit/s liegen. (4 P)

---

## H3 Datenmengen und Übertragung

### H3.1 ★★ – Scan-Archiv (8 Punkte)
📘 **Nachlernen:** [[H3 Datenmengen und Übertragung#5. Speicherbedarf planen|H3 › Speicherbedarf planen]] · [[H3 Datenmengen und Übertragung#2. Dezimale und binäre Präfixe|H3 › Dezimale und binäre Präfixe]]

Die Kanzlei scannt Belege: 300 Seiten pro Tag, 220 Arbeitstage, je Seite als PDF ca. 350 KiB. Aufbewahrung 10 Jahre (steuerrechtlich).
a) Speicherbedarf pro Jahr in GiB. b) Bedarf für 10 Jahre in TiB bei zusätzlich 20 % Reserve.

> [!success]- Lösung
> a) 300 × 220 × 350 KiB = 23 100 000 KiB = 23 100 000 / 1 024² GiB = **22,03 GiB** (4 P)
> b) × 10 Jahre = 220,3 GiB × 1,2 = 264,4 GiB = 264,4 / 1 024 = **0,258 TiB** – Speicherplatz ist hier nicht das Problem, wohl aber Backup und revisionssichere Archivierung. (4 P)

### H3.2 ★★ – Nächtliche Sicherung (6 Punkte)
📘 **Nachlernen:** [[H3 Datenmengen und Übertragung#3. Übertragungsdauer|H3 › Übertragungsdauer]]

Die Daten des Servers (1,2 TiB) werden nachts über eine 1-Gbit/s-Verbindung auf ein NAS gesichert, effektiv sind 80 % nutzbar. Das Backupfenster ist 22:00–5:00 Uhr.
Reicht das Fenster für eine Vollsicherung?

> [!success]- Lösung
> 1,2 × 2⁴⁰ B × 8 = 10 555 311 626 650 Bit (≈ 1,0555 · 10¹³) (2 P)
> / (10⁹ × 0,8) = 13 194 s ≈ **3 h 40 min** (3 P)
> Fenster 7 h → **reicht**. (1 P)

### H3.3 ★★★ – Videoüberwachung (8 Punkte)
📘 **Nachlernen:** [[H3 Datenmengen und Übertragung#4. Speicherbedarf von Medien|H3 › Speicherbedarf von Medien]] · [[H4 Server, NAS und RAID#Welches RAID wofür|H4 › Welches RAID wofür]] · [[I2 Datenschutz#2. Grundsätze der Verarbeitung (Art. 5)|I2 › Grundsätze der Verarbeitung]]

Vier Kameras zeichnen mit je 4 Mbit/s rund um die Uhr auf, die Aufnahmen sollen 14 Tage gespeichert werden (Datenschutz: nicht länger!).
a) Berechne den Speicherbedarf in TB. b) Welches NAS/RAID empfiehlst du (Platten à 4 TB verfügbar)?

> [!success]- Lösung
> a) 4 × 4 · 10⁶ Bit/s × 86 400 s × 14 = 1,93536 · 10¹³ Bit / 8 = **2,42 TB** (4 P)
> b) z. B. **3 × 4 TB in RAID 5** = 8 TB nutzbar (ausreichend Reserve, 1 Plattenausfall verkraftbar) oder **2 × 4 TB RAID 1** = 4 TB (einfach, 1 Ausfall). Begründung Kapazität + Ausfallsicherheit + **automatische Löschung nach 14 Tagen** (DSGVO, Speicherbegrenzung). (4 P)

---

## H4 Server, NAS und RAID

### H4.1 ★★ – RAID planen (8 Punkte)
📘 **Nachlernen:** [[H4 Server, NAS und RAID#Die RAID-Level|H4 › Die RAID-Level]] · [[H4 Server, NAS und RAID#Welches RAID wofür|H4 › Welches RAID wofür]]

Für den Fileserver stehen 6 Platten à 8 TB zur Verfügung. Die Geschäftsführung will „möglichst viel Platz und trotzdem sicher“.
a) Berechne die Nutzkapazität für RAID 5, RAID 6 und RAID 10. b) Empfiehl ein Level und begründe.

> [!success]- Lösung
> a) RAID 5: 5 × 8 = **40 TB** · RAID 6: 4 × 8 = **32 TB** · RAID 10: 3 × 8 = **24 TB** (je 2 P)
> b) **RAID 6**: bei großen Platten dauert der Rebuild lange; RAID 6 verkraftet auch einen zweiten Ausfall während des Rebuilds und bietet trotzdem 67 % Kapazität. (2 P)

### H4.2 ★★ – RAID ist kein Backup (6 Punkte)
📘 **Nachlernen:** [[H4 Server, NAS und RAID#3. RAID|H4 › RAID]] · [[I3 Datensicherung#1. Sicherungsarten|I3 › Sicherungsarten]]

Der Chef meint: „Wir haben RAID 6, ein Backup brauchen wir nicht.“ Widerlege diese Aussage mit drei Beispielen.

> [!success]- Lösung (je 2 P)
> - **Versehentliches Löschen/Überschreiben** wird sofort auf alle Platten übernommen.
> - **Ransomware** verschlüsselt die Daten auf dem RAID genauso.
> - **Brand, Wasser, Diebstahl, Überspannung oder Controllerdefekt** zerstören das gesamte System.
> RAID erhöht nur die **Verfügbarkeit** bei Plattenausfall – für Wiederherstellung braucht man Backups (3-2-1).

### H4.3 ★★ – Serveranforderungen (6 Punkte)
📘 **Nachlernen:** [[H4 Server, NAS und RAID#Besondere Anforderungen an Serverhardware|H4 › Besondere Anforderungen an Serverhardware]]

Nenne drei Ausstattungsmerkmale, die einen Server von einem Arbeitsplatz-PC unterscheiden, und erläutere ihren Nutzen.

> [!success]- Lösung (je 2 P, drei davon)
> - **Redundante Hot-Plug-Netzteile** – Ausfall eines Netzteils ohne Unterbrechung, Tausch im Betrieb.
> - **ECC-RAM** – korrigiert Speicherfehler, verhindert Abstürze und Datenkorruption.
> - **Hardware-RAID mit Hot-Swap-Einschüben** – Plattentausch im laufenden Betrieb.
> - **Fernwartung (iDRAC/iLO/IPMI)** – Zugriff auch bei abgestürztem OS.
> - **Vor-Ort-Service** mit definierter Reaktionszeit.

### H4.4 ★★ – NAS oder SAN? (4 Punkte)
📘 **Nachlernen:** [[H4 Server, NAS und RAID#2. DAS, NAS, SAN|H4 › DAS, NAS, SAN]]

Die Kanzlei will zentrale Dateiablage und ein Backup-Ziel. Begründe, warum ein NAS statt eines SAN genügt.

> [!success]- Lösung
> Ein **NAS** stellt Dateifreigaben (SMB) direkt im vorhandenen LAN bereit, ist günstig und einfach zu verwalten. Ein **SAN** liefert Blockspeicher über ein eigenes Speichernetz – sinnvoll für große Virtualisierungscluster, für 18 Arbeitsplätze zu teuer und zu komplex. (4 P)

---

## H5 Elektrotechnik, USV und Energie

### H5.1 ★★ – USV dimensionieren (8 Punkte)
📘 **Nachlernen:** [[H5 Elektrotechnik, USV und Energie#Dimensionierung|H5 › Dimensionierung]] · [[H5 Elektrotechnik, USV und Energie#Bauarten (IEC 62040-3)|H5 › Bauarten]] · [[H5 Elektrotechnik, USV und Energie#3. Schein- und Wirkleistung|H5 › Schein- und Wirkleistung]]

An die USV kommen: Server 380 W, NAS 65 W, Switch 45 W, Firewall 30 W. Leistungsfaktor 0,8, Reserve 25 %.
Modelle: A 750 VA/450 W · B 1 000 VA/800 W · C 1 500 VA/1 000 W
a) Berechne Wirk- und Scheinleistung inkl. Reserve. b) Wähle ein Modell. c) Welche Bauart empfiehlst du für den Server? Begründe.

> [!success]- Lösung
> a) 380 + 65 + 45 + 30 = 520 W × 1,25 = **650 W**; S = 650 / 0,8 = **812,5 VA** (3 P)
> b) **Modell B (1 000 VA / 800 W)** – A reicht weder bei VA noch bei W. (2 P)
> c) **Online-USV (VFI)**: keine Umschaltzeit, schützt auch vor Spannungsschwankungen und Störungen – für den Server mit Datenbank kritisch. (3 P)

### H5.2 ★★ – Überbrückungszeit (5 Punkte)
📘 **Nachlernen:** [[H5 Elektrotechnik, USV und Energie#Überbrückungszeit aus Akkudaten|H5 › Überbrückungszeit aus Akkudaten]]

Die USV hat zwei Akkus à 12 V / 9 Ah in Reihe (24 V), Wirkungsgrad 85 %. Wie lange hält sie bei 650 W? Reicht das für ein geordnetes Herunterfahren (ca. 5 min)?

> [!success]- Lösung
> t = 9 Ah × 24 V × 0,85 / 650 W = 183,6 / 650 = 0,2825 h = **16,9 min** (4 P) → **reicht**; Shutdown-Software per USB/Netzwerk einrichten, damit das Herunterfahren automatisch startet. (1 P)

### H5.3 ★★ – Stromkosten und Einsparung (8 Punkte)
📘 **Nachlernen:** [[H5 Elektrotechnik, USV und Energie#5. Energiekosten|H5 › Energiekosten]] · [[W3 Investition und Finanzierung#5. Amortisation und Wirtschaftlichkeit|W3 › Amortisation und Wirtschaftlichkeit]]

18 alte PCs (je 95 W) sollen durch Mini-PCs (je 25 W) ersetzt werden. Betrieb 9 h an 225 Tagen, 0,34 €/kWh. Ein Mini-PC kostet 520 €.
a) Jährliche Stromkosten alt und neu. b) Einsparung pro Jahr. c) Amortisationszeit allein über den Strom.

> [!success]- Lösung
> Betriebsstunden: 9 × 225 = 2 025 h
> a) alt: 95 × 18 × 2 025 / 1 000 = 3 462,75 kWh × 0,34 = **1 177,34 €** · neu: 25 × 18 × 2 025 / 1 000 = 911,25 kWh × 0,34 = **309,83 €** (4 P)
> b) **867,51 €/Jahr** (1 P)
> c) 18 × 520 € = 9 360 € / 867,51 € = **10,8 Jahre** → allein über Strom nicht wirtschaftlich; Entscheidung braucht weitere Gründe (Leistung, Support-Ende, Platz, Lautstärke). (3 P)

### H5.4 ★ – Netzteil (4 Punkte)
📘 **Nachlernen:** [[H5 Elektrotechnik, USV und Energie#2. Wirkungsgrad|H5 › Wirkungsgrad]]

Ein PC benötigt 350 W. Das alte Netzteil hat 75 % Wirkungsgrad, ein neues 80-PLUS-Gold-Netzteil 90 %. Berechne die Leistungsaufnahme beider und die Verlustleistung.

> [!success]- Lösung
> alt: 350 / 0,75 = **466,7 W** (Verlust 116,7 W) · neu: 350 / 0,9 = **388,9 W** (Verlust 38,9 W) (4 P)

---

## H6 Drucker, Peripherie und Mobilgeräte

### H6.1 ★★ – Abteilungsdrucker auswählen (10 Punkte)
📘 **Nachlernen:** [[H6 Drucker, Peripherie und Mobilgeräte#3. Druckkosten berechnen|H6 › Druckkosten berechnen]] · [[H6 Drucker, Peripherie und Mobilgeräte#2. Kenngrößen im Datenblatt|H6 › Kenngrößen im Datenblatt]]

Die Buchhaltung (6 Personen) druckt ca. **1 500 Seiten pro Monat** in Schwarz-Weiß. Zur Wahl stehen:
- **Gerät A** (Tintenstrahl): 159,00 €, Patrone 34,50 € für 500 Seiten
- **Gerät B** (Laser): 429,00 €, Toner 96,00 € für 4 000 Seiten, zusätzlich Trommel 60,00 € für 20 000 Seiten

a) Berechne die Seitenkosten beider Geräte in Cent. b) Berechne die Gesamtkosten für 36 Monate. c) Nach wie vielen Monaten ist Gerät B günstiger? d) Nenne zwei weitere Kriterien für die Entscheidung.

> [!success]- Lösung
> a) A: 34,50 ÷ 500 = **6,90 ct** · B: 96 ÷ 4 000 + 60 ÷ 20 000 = 2,40 + 0,30 = **2,70 ct** (3 P)
> b) Seiten: 1 500 × 36 = 54 000 · A: 159 + 54 000 × 0,069 = **3 885,00 €** · B: 429 + 54 000 × 0,027 = **1 887,00 €** (3 P)
> c) 159 + x · 0,069 = 429 + x · 0,027 → x = 270 ÷ 0,042 ≈ 6 429 Seiten → 6 429 ÷ 1 500 ≈ **4,3 Monate**, also ab dem **5. Monat** (2 P)
> d) z. B. Druckgeschwindigkeit (ppm) und empfohlenes Druckvolumen, Duplex, Netzwerkanschluss, Follow-Me-Printing für vertrauliche Belege, Wartung/Service, Aufstellort (Emissionen) (2 P)

### H6.2 ★★ – Außendienst ausstatten (8 Punkte)
📘 **Nachlernen:** [[H6 Drucker, Peripherie und Mobilgeräte#5. Mobile Endgeräte|H6 › Mobile Endgeräte]] · [[H6 Drucker, Peripherie und Mobilgeräte#Mobile Device Management (MDM)|H6 › Mobile Device Management]]

Acht Servicetechniker sollen mobile Geräte bekommen. Sie erfassen Arbeitsberichte beim Kunden (auch in Werkhallen), lassen sie unterschreiben und scannen Barcodes an Ersatzteilen. Im Büro arbeiten sie gelegentlich am Schreibtisch.
a) Empfiehl eine Geräteklasse und begründe sie mit drei Anforderungen. b) Nenne vier Richtlinien, die per MDM auf den Geräten durchgesetzt werden sollten.

> [!success]- Lösung
> a) **Robustes Tablet bzw. 2-in-1 (Rugged, IP65/IP67) mit Stift, LTE und Barcode-Scanner** (1 P) – Begründung je 1 P: Einsatz in Werkhallen → Stoß- und Staubschutz · Unterschrift → Stifteingabe · Barcodes → integrierter Scanner/Kamera · beim Kunden ohne WLAN → LTE · am Schreibtisch → Dockingstation mit Monitor und Tastatur
> b) je 1 P: PIN/Bildschirmsperre · Geräteverschlüsselung · automatische Updates · nur freigegebene Apps · Remote-Sperre/-Löschung bei Verlust · VPN/WLAN-Profile · kein Root/Jailbreak

### H6.3 ★ – Multifunktionsgerät zurückgeben (4 Punkte)
📘 **Nachlernen:** [[H6 Drucker, Peripherie und Mobilgeräte#6. Entsorgung und Datenträger|H6 › Entsorgung und Datenträger]]

Ein geleastes Multifunktionsgerät wird nach Vertragsende abgeholt. Erkläre, welches Datenschutzrisiko besteht und wie du vorgehst.

> [!success]- Lösung
> Das Gerät hat eine **interne Festplatte/SSD** mit zwischengespeicherten Scans, Faxen und Druckaufträgen – darunter personenbezogene Daten (2 P). Vorgehen: Datenträger mit der Löschfunktion des Herstellers **sicher überschreiben** oder ausbauen und nach **DIN 66399** vernichten lassen, Löschung **dokumentieren** bzw. Löschzertifikat vom Leasinggeber verlangen, Adressbücher/Scan-Ziele entfernen (2 P).

Bereich: [[Übersicht Hardware]]
