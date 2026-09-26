---
bereich: Hardware
tags: [ap1/kartenquelle]
---
# Kartenquelle Hardware

> [!warning] Hier stehen die Antworten
> Zum Lernen [[Karten Hardware]] öffnen. Diese Datei ist nur zum Bearbeiten und Ergänzen da – Format: `Frage::Antwort`, eine Karte pro Zeile.

#flashcards/ap1/hardware

Aus welchen Bestandteilen besteht ein Von-Neumann-Rechner?::Rechenwerk und Steuerwerk (zusammen die CPU), Speicher, Ein-/Ausgabewerk und Bussystem
Nach welchen Kenngrößen vergleichst du CPUs?::Kerne/Threads, Takt, Cache, TDP (Abwärme/Verbrauch), Sockel, integrierte Grafik (iGPU), Architektur/Generation
Was bedeutet SMT bzw. Hyper-Threading?::Ein physischer Kern bearbeitet zwei Threads gleichzeitig – bessere Auslastung, aber keine doppelte Leistung
Ist RAM flüchtig oder nicht flüchtig – und was bedeutet das?::Flüchtig – ohne Strom geht der Inhalt verloren
Was passiert, wenn ein PC zu wenig RAM hat?::Das Betriebssystem lagert auf den Massenspeicher aus (Auslagerungsdatei) – das System wird sehr langsam
Was kann ECC-RAM und wo setzt man ihn ein?::Erkennt und korrigiert Bitfehler im Speicher – in Servern und Workstations
Was bringt Dual Channel beim Arbeitsspeicher?::Zwei gleiche Module in den passenden Slots verdoppeln die Speicherbandbreite
Welche Vorteile hat UEFI gegenüber dem klassischen BIOS?::GPT-Unterstützung (Laufwerke > 2 TiB), Secure Boot, grafische Oberfläche, schnellerer Start
Wofür wird ein TPM 2.0 benötigt?::Sicherheitschip, der Schlüssel speichert (z. B. für BitLocker) – Voraussetzung für Windows 11
Braucht ein Büro-PC eine dedizierte Grafikkarte?::Nein – die integrierte Grafik (iGPU) reicht und spart Kosten und Strom
Wie berechnest du die Pixeldichte (ppi) eines Monitors?::ppi = √(Breite² + Höhe²) in Pixeln ÷ Diagonale in Zoll
Wie unterscheiden sich IPS-, TN- und VA-Panels?::IPS: farbtreu und blickwinkelstabil · TN: schnell, aber schlechte Blickwinkel · VA: hoher Kontrast
Was ist ein Thin Client?::Ein sparsames Endgerät ohne lokale Daten – die Rechenleistung liefert ein Server bzw. eine VDI
Nach welchem Muster begründest du eine Hardware-Empfehlung in der Prüfung?::Anforderung aus dem Szenario → passende Komponente → Begründung, warum sie die Anforderung erfüllt

Worin unterscheiden sich HDD und SSD?::HDD: günstig pro TB, groß, mechanisch, langsam, stoßempfindlich · SSD: schnell, robust, lautlos, begrenzte Schreibzyklen
Was ist der Unterschied zwischen M.2 und NVMe?::M.2 ist der Formfaktor (Steckplatz), NVMe das Übertragungsprotokoll über PCIe
Wie schnell ist eine SATA-SSD höchstens – und warum?::Ca. 550 MB/s – begrenzt durch SATA III mit 6 Gbit/s
Was gibt der TBW-Wert einer SSD an?::Terabytes Written – die garantierte Gesamtschreibmenge über die Lebensdauer
Welche Datenraten haben USB 2.0, USB 3.2 Gen 1, Gen 2 und Gen 2×2?::480 Mbit/s · 5 Gbit/s · 10 Gbit/s · 20 Gbit/s
Welche Datenraten haben USB4, Thunderbolt 4 und Thunderbolt 5?::USB4: 40 Gbit/s (Version 2: 80) · Thunderbolt 4: 40 Gbit/s · Thunderbolt 5: 80 Gbit/s
Was sagt „USB-C“ über die Leistung eines Anschlusses aus?::Nichts – USB-C ist nur der Steckertyp; Datenrate, Video und Laden stehen im Datenblatt
Welche Bandbreiten haben HDMI 2.0, HDMI 2.1 und DisplayPort 1.4?::18 Gbit/s · 48 Gbit/s · 32,4 Gbit/s
Mit welcher Schnittstelle kann man Monitore hintereinanderschalten (Daisy Chain)?::DisplayPort mit MST (Multi-Stream Transport)
Wie viel Datenrate liefert eine PCIe-Lane bei Version 3.0, 4.0 und 5.0?::Etwa 1 GB/s · 2 GB/s · 4 GB/s
Welche Komponente bestimmt die Geschwindigkeit einer Übertragungskette?::Die langsamste Komponente (Engpass)

Wie viele Bit hat ein Byte?::8 Bit
Wie viele Byte sind 1 kB und wie viele 1 KiB?::1 kB = 1 000 Byte · 1 KiB = 1 024 Byte
Wie rechnest du GB in GiB um?::× 10⁹ ÷ 2³⁰ – also etwa × 0,9313
Wie rechnest du TB in TiB um?::× 10¹² ÷ 2⁴⁰ – also etwa × 0,9095
Werden Datenraten dezimal oder binär angegeben?::Immer dezimal: 1 Mbit/s = 10⁶ Bit/s
Mit welcher Formel berechnest du die Übertragungsdauer?::t = Datenmenge in Bit ÷ Datenrate in Bit/s
Wie berechnest du den Speicherbedarf eines Bildes?::Breite × Höhe × Farbtiefe in Bit ÷ 8 = Byte
Wie berechnest du den Speicherbedarf einer Audioaufnahme?::Abtastrate × Bittiefe × Kanäle × Sekunden ÷ 8 = Byte
Wie berechnest du den Speicherbedarf eines unkomprimierten Videos?::Breite × Höhe × Byte pro Pixel × Bilder pro Sekunde × Sekunden
Wie viele Farben lassen sich mit n Bit Farbtiefe darstellen?::2ⁿ Farben
Wie viele Byte pro Pixel braucht True Color mit 24 Bit?::3 Byte

Was bedeuten Striping, Mirroring und Parität bei RAID?::Striping: Daten verteilen · Mirroring: Daten spiegeln · Parität: Prüfinformation (XOR), aus der sich eine ausgefallene Platte rekonstruieren lässt
Wie funktioniert RAID 0 und wie sicher ist es?::Striping, Kapazität n × C, keine Redundanz – eine defekte Platte = alle Daten weg; mindestens 2 Platten
Wie funktioniert RAID 1?::Spiegelung, Kapazität C (einer Platte), verkraftet 1 Ausfall; mindestens 2 Platten
Welche Kapazität und Ausfallsicherheit hat RAID 5?::(n − 1) × C, verkraftet 1 Ausfall; mindestens 3 Platten
Welche Kapazität und Ausfallsicherheit hat RAID 6?::(n − 2) × C, verkraftet 2 Ausfälle; mindestens 4 Platten
Welche Kapazität und Ausfallsicherheit hat RAID 10?::n ÷ 2 × C, garantiert 1 Ausfall (einer je Spiegelpaar); mindestens 4 Platten
Was ist der Unterschied zwischen Hot Spare und Hot Swap?::Hot Spare: Reserveplatte springt automatisch ein · Hot Swap: Platte im laufenden Betrieb tauschen
Ersetzt ein RAID die Datensicherung?::Nein – RAID schützt nicht vor Löschen, Ransomware, Brand oder Controllerdefekt
Wie unterscheiden sich NAS und SAN?::NAS: dateibasiert über das LAN (SMB/NFS) · SAN: blockbasiert über ein eigenes Speichernetz (Fibre Channel, iSCSI)
Welche Merkmale unterscheiden Serverhardware von Client-PCs?::Redundante Netzteile, ECC-RAM, RAID mit Hot-Swap, Fernwartung (iDRAC/iLO/IPMI), Rack-Bauform

Wie lautet das ohmsche Gesetz?::U = R · I
Wie berechnest du die elektrische Leistung?::P = U · I
Wie berechnest du die elektrische Arbeit bzw. Energie?::W = P · t
Wie berechnest du die gespeicherte Energie eines Akkus?::W = Q · U (Amperestunden × Volt = Wattstunden)
Wie ist der Wirkungsgrad definiert?::η = abgegebene Leistung ÷ zugeführte Leistung
Wie hängen Scheinleistung (VA) und Wirkleistung (W) zusammen?::P (W) = S (VA) × cos φ
Welche USV-Klassen gibt es und wie arbeiten sie?::VFD Offline: schaltet bei Ausfall um · VI Line-Interactive: zusätzlich Spannungsregelung · VFI Online: Doppelwandler, 0 ms Umschaltzeit
Wie dimensionierst du eine USV?::Leistung aller Geräte in W addieren + Reserve → S = P ÷ cos φ → Modell wählen, das VA- und W-Wert erfüllt
Wie berechnest du die Überbrückungszeit einer USV?::t = Q · U · η ÷ P
Wie berechnest du die jährlichen Energiekosten eines Geräts?::Leistung in W × Betriebsstunden ÷ 1000 × Preis pro kWh
Wie viele Stunden hat ein Jahr?::8 760 Stunden

Wie berechnest du die Kosten pro Druckseite?::Preis des Toners bzw. der Patrone ÷ Reichweite in Seiten (+ ggf. Trommel, Papier, Wartung)
Wann ist ein Laserdrucker günstiger als ein Tintenstrahldrucker?::Ab dem Break-even: Anschaffung + Seiten × Seitenkosten gleichsetzen – bei hohem Druckvolumen fast immer der Laser
Wofür eignen sich Thermodirekt- und Thermotransferdruck?::Thermodirekt: Kassenbons, Versandetiketten (verblasst) · Thermotransfer: dauerhafte Barcode- und Inventaretiketten
Was ist der Unterschied zwischen Duty Cycle und empfohlenem Druckvolumen?::Duty Cycle = maximale Monatsleistung (Spitze) · empfohlenes Volumen = Dauerlast, nach der man auswählt
Was bedeuten ppm, dpi und FPOT im Druckerdatenblatt?::ppm = Seiten pro Minute · dpi = Auflösung · FPOT = Zeit bis zur ersten Seite
Welche Vorteile hat Follow-Me-Printing?::Ausdruck erst nach Anmeldung am Gerät – vertraulich, weniger vergessene und unnötige Ausdrucke
Was musst du vor der Rückgabe eines geleasten Multifunktionsgeräts tun?::Interne Festplatte mit Scans und Druckaufträgen sicher löschen bzw. vernichten (DIN 66399) und dokumentieren
Was kann ein Mobile Device Management (MDM)?::Geräte zentral einrichten, Apps verteilen, PIN und Verschlüsselung erzwingen, verlorene Geräte orten, sperren und löschen
Was bedeutet die Schutzart IP67?::6 = staubdicht · 7 = geschützt bei zeitweiligem Untertauchen
Wie berechnest du die Energie eines Notebook-Akkus in Wh?::W = Q · U, z. B. 4,5 Ah × 11,1 V = 49,95 Wh

Was prüft der POST beim Einschalten?::Power-On Self-Test: CPU, RAM, Grafik und wichtige Komponenten – Fehler als Pieptöne oder LED-Codes
Wie läuft der Bootvorgang ab?::Einschalten → POST → UEFI initialisiert Hardware → Bootloader von der EFI-Systempartition (Secure Boot) → Betriebssystem → Anmeldung
Was unterscheidet SRAM und DRAM?::SRAM: schnell, teuer, ohne Refresh, als CPU-Cache · DRAM: günstig, dicht, braucht Refresh, als Arbeitsspeicher
Wozu dient S.M.A.R.T.?::Selbstüberwachung von HDD/SSD (defekte Sektoren, Temperatur, Verschleiß) mit Frühwarnung – ersetzt kein Backup
Welchen Stecker hat das Netzkabel eines PC-Netzteils?::Kaltgerätestecker (C13) für die Kaltgerätebuchse (C14)
Wie viel Strom liefern USB 2.0 und USB 3.x standardmäßig?::USB 2.0: 0,5 A (2,5 W) · USB 3.x: 0,9 A (4,5 W) · mit Power Delivery bis 240 W
Was unterscheidet Raster- und Vektorgrafiken?::Raster: Pixel, verliert beim Vergrößern Qualität (Fotos) · Vektor: mathematische Formen, beliebig skalierbar (Logos, SVG)
Welche Bildformate sind verlustfrei und welche verlustbehaftet?::verlustfrei: PNG, GIF · verlustbehaftet: JPEG – WebP kann beides
Wozu dient eine Prüfziffer?::Sie erkennt Tipp- und Lesefehler, z. B. bei EAN, ISBN und IBAN
Wie berechnest du die EAN-13-Prüfziffer?::Ziffern abwechselnd mit 1 und 3 gewichten, addieren, Ergänzung zur nächsten Zehnerzahl
Was unterscheidet Barcode, QR-Code und RFID?::Barcode 1D mit Sichtkontakt · QR 2D mit mehr Daten und Fehlerkorrektur · RFID per Funk ohne Sichtkontakt
