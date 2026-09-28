---
tags: [ap1/pruefung]
---
# Probeprüfung 1 – Hansen Logistik GmbH

```dataviewjs
await dv.view("AP1/99 System/views/pruefung", { name: "Probeprüfung 1" })
```

> [!info] Ausgangssituation
> Die **Hansen Logistik GmbH** (fiktiv, 40 Mitarbeitende) bezieht einen neuen Standort. Sie sind Auszubildende bzw. Auszubildender im IT-Team und unterstützen bei der Einrichtung der Arbeitsplätze, des Netzwerks und der Datensicherung.
> **Bearbeitungszeit 90 Minuten · 4 Aufgaben à 25 Punkte · Hilfsmittel: Taschenrechner**

---

## Aufgabe 1 – Arbeitsplätze beschaffen (25 Punkte)

**a) (8 P)** Für die Verwaltung werden 15 Notebooks benötigt. Ermitteln Sie die Bezugspreise und das günstigere Angebot.
- Angebot A: 899,00 €/Stück, 10 % Rabatt, 2 % Skonto, Versandkosten 45,00 €
- Angebot B: 865,00 €/Stück, 5 % Rabatt, kein Skonto, frei Haus

> [!success]- Lösung a
> | | A | B |
> |---|---|---|
> | Listenpreis | 13 485,00 € | 12 975,00 € |
> | − Rabatt | 1 348,50 € | 648,75 € |
> | = Zieleinkaufspreis | 12 136,50 € | 12 326,25 € |
> | − Skonto | 242,73 € | – |
> | = Bareinkaufspreis | 11 893,77 € | 12 326,25 € |
> | + Versand | 45,00 € | – |
> | **Bezugspreis** | **11 938,77 €** | **12 326,25 €** |
> A ist um **387,48 €** günstiger – sofern die Skontofrist eingehalten wird.
>
> **Bewertung:** (Bezugspreis A 3 P, Bezugspreis B 3 P, Vergleich mit Hinweis Skontofrist 2 P)
>
> 📘 **Nachlernen:** [[W1 Beschaffung und Kalkulation#3. Bezugskalkulation (Angebotsvergleich, quantitativ)|W1 › Bezugskalkulation]]

**b) (4 P)** Die Notebooks sollen eine NVMe-SSD statt einer SATA-SSD erhalten. Erläutern Sie zwei Unterschiede.

> [!success]- Lösung b
> - **Anbindung/Geschwindigkeit:** NVMe nutzt PCIe-Lanes (mehrere GB/s), SATA ist auf ca. 550 MB/s begrenzt → schnelleres Booten und Laden.
> - **Bauform/Protokoll:** NVMe meist als M.2-Modul direkt auf dem Mainboard, geringere Latenz durch ein für Flash optimiertes Protokoll; SATA-SSD oft 2,5" mit Kabel.
>
> **Bewertung:** (je Unterschied 2 P)
>
> 📘 **Nachlernen:** [[H2 Massenspeicher und Schnittstellen#1. Massenspeicher|H2 › Massenspeicher]]

**c) (4 P)** Die Monitore haben 24 Zoll und Full-HD-Auflösung. Berechnen Sie die Pixeldichte.

> [!success]- Lösung c
> √(1920² + 1080²) = √4 852 800 ≈ 2 202,9 px → / 24 ≈ **91,8 ppi**
>
> **Bewertung:** (Diagonale in Pixeln 2 P, Division 1 P, Ergebnis 1 P)
>
> 📘 **Nachlernen:** [[H1 PC-Komponenten und Arbeitsplatzgeräte#7. Monitor|H1 › Monitor]]

**d) (4 P)** Die Arbeitsplätze erhalten USB-C-Dockingstationen. Die Notebooks haben einen USB-C-Port mit DisplayPort Alt Mode und werden mit einem 100-W-Netzteil ausgeliefert. Auszug aus dem englischen Datenblatt der Dockingstation:

> *Host connection: USB-C (USB4 / Thunderbolt 4 compatible), Power Delivery up to 90 W · Video outputs: 2 × DisplayPort 1.4, max. 2 × 3840 × 2160 @ 60 Hz (requires DP Alt Mode or Thunderbolt host) · Network: 2.5 GbE (RJ45) · Note: Dual display not supported on macOS.*

1. Geben Sie an, wie viele externe Monitore angeschlossen werden können und mit welcher maximalen Auflösung und Bildwiederholrate.
2. Beurteilen Sie, ob die Stromversorgung der Notebooks über die Dockingstation ausreicht.

> [!success]- Lösung d
> 1. **Zwei** externe Monitore mit jeweils bis zu **3840 × 2160 (4K) bei 60 Hz**; Voraussetzung (DP Alt Mode) erfüllen die Notebooks. (2 P)
> 2. Die Dockingstation liefert höchstens **90 W**, das Notebook ist für **100 W** ausgelegt → bei Büroarbeit meist ausreichend, unter Volllast wird der Akku aber langsamer geladen oder sogar entladen. Empfehlung: Dock mit mindestens 100 W Power Delivery oder Herstellerangabe zur Mindestleistung prüfen. (2 P)
>
> 📘 **Nachlernen:** [[H2 Massenspeicher und Schnittstellen#USB|H2 › USB]] · [[Fachenglisch]]

**e) (5 P)** Alternativ bietet ein Händler Leasing für 29 €/Monat pro Notebook bei 36 Monaten Laufzeit an. Vergleichen Sie die Kosten pro Gerät mit Angebot A und nennen Sie je einen Vorteil von Kauf und Leasing.

> [!success]- Lösung e
> Leasing: 29 × 36 = **1 044,00 €** · Kauf A: 11 938,77 / 15 ≈ **795,92 €** → Leasing ist **248,08 € teurer** pro Gerät.
> Kauf: geringere Gesamtkosten, Eigentum. Leasing: keine Kapitalbindung, planbare Raten, regelmäßiger Austausch der Technik.
>
> **Bewertung:** (Kostenvergleich 3 P, je Vorteil 1 P)
>
> 📘 **Nachlernen:** [[W3 Investition und Finanzierung#2. Kauf, Leasing, Miete|W3 › Kauf, Leasing, Miete]]

---

## Aufgabe 2 – Netzwerk (25 Punkte)

**a) (10 P)** Das Netz `192.168.20.0/24` soll per VLSM auf vier VLANs aufgeteilt werden (lückenlos ab .0, jeweils kleinstmöglich):
Gäste 100 Hosts · Verwaltung 50 Hosts · Lager 25 Hosts · Drucker 10 Hosts. Geben Sie jeweils Präfix, Netzadresse, Hostbereich und Broadcast an.

> [!success]- Lösung a
> | VLAN | Präfix | Netz | Hosts | Broadcast |
> |---|---|---|---|---|
> | Gäste (100) | /25 | 192.168.20.0 | .1 – .126 | .127 |
> | Verwaltung (50) | /26 | 192.168.20.128 | .129 – .190 | .191 |
> | Lager (25) | /27 | 192.168.20.192 | .193 – .222 | .223 |
> | Drucker (10) | /28 | 192.168.20.224 | .225 – .238 | .239 |
>
> **Bewertung:** (je VLAN 2,5 P: Präfix, Netz, Hostbereich, Broadcast)
>
> 📘 **Nachlernen:** [[N2 IPv4 und Subnetting#5. Nach Hostanzahl planen (VLSM)|N2 › Nach Hostanzahl planen]]

**b) (4 P)** Kürzen Sie die IPv6-Adresse `fd00:0000:0000:0010:0000:0000:0000:0001` maximal und nennen Sie den Adresstyp.

> [!success]- Lösung b
> **`fd00:0:0:10::1`** (längste Nullfolge = Blöcke 5–7). Typ: **Unique Local Address** (privat, `fd00::/8`).
>
> **Bewertung:** (Kürzung 2 P, Adresstyp 2 P)
>
> 📘 **Nachlernen:** [[N3 IPv6#2. Kürzen und Ausschreiben|N3 › Kürzen und Ausschreiben]] · [[N3 IPv6#3. Adresstypen|N3 › Adresstypen]]

**c) (5 P)** Ordnen Sie die Ports zu: 22, 53, 443, 993, 3389.

> [!success]- Lösung c
> 22 SSH · 53 DNS · 443 HTTPS · 993 IMAPS · 3389 RDP
>
> **Bewertung:** (je Port 1 P)
>
> 📘 **Nachlernen:** [[N4 Netzwerkdienste und Protokolle#5. Wichtige Ports|N4 › Wichtige Ports]]

**d) (6 P)** Das Gäste-WLAN soll sicher betrieben werden. Beschreiben Sie drei Maßnahmen.

> [!success]- Lösung d
> - **eigene SSID in eigenem VLAN**, per Firewall vom Firmennetz getrennt, nur Internetzugang
> - **WPA3** (oder WPA2 mit starkem, regelmäßig gewechseltem Passwort) bzw. Captive Portal mit Voucher
> - **Client-Isolation**, Bandbreitenbegrenzung, Nutzungsbedingungen/Protokollierung
>
> **Bewertung:** (je Maßnahme 2 P)
>
> 📘 **Nachlernen:** [[N6 WLAN#Weitere Maßnahmen|N6 › Weitere Maßnahmen]]

---

## Aufgabe 3 – IT-Sicherheit und Datenschutz (25 Punkte)

**a) (6 P)** Nennen Sie die drei Grundwerte der Informationssicherheit und je eine Maßnahme für die Hansen Logistik GmbH.

> [!success]- Lösung a
> **Vertraulichkeit:** BitLocker auf den Notebooks, Rechtekonzept · **Integrität:** Protokollierung von Änderungen, digitale Signaturen · **Verfügbarkeit:** USV, redundante Netzteile, Backup, Wartungsvertrag
>
> **Bewertung:** (je Grundwert mit passender Maßnahme 2 P)
>
> 📘 **Nachlernen:** [[I1 Informationssicherheit und IT-Grundschutz#1. Schutzziele|I1 › Schutzziele]]

**b) (8 P)** Der Fileserver (1,2 TB) wird sonntags voll gesichert, Mo–Sa inkrementell (je ca. 25 GB).
1. Erklären Sie die 3-2-1-Regel. 2. Welche Sicherungen braucht man nach einem Ausfall am Mittwochabend (nach der Sicherung)? 3. Wie groß ist der Speicherbedarf der Woche bis einschließlich Mittwoch? 4. Nennen Sie einen Vorteil der differenziellen gegenüber der inkrementellen Sicherung.

> [!success]- Lösung b
> 1. **3** Kopien, auf **2** verschiedenen Medientypen, **1** Kopie außer Haus.
> 2. Vollsicherung **So** + inkrementelle **Mo, Di, Mi**.
> 3. 1 200 GB + 3 × 25 GB = **1 275 GB**
> 4. Schnellere, robustere Wiederherstellung: nur **Voll + letzte differenzielle** nötig.
>
> **Bewertung:** (je Teilaufgabe 2 P)
>
> 📘 **Nachlernen:** [[I3 Datensicherung#1. Sicherungsarten|I3 › Sicherungsarten]] · [[I3 Datensicherung#3-2-1-Regel|I3 › 3-2-1-Regel]]

**c) (6 P)** Ordnen Sie die Maßnahmen je einer Kontrollart zu: 1. Chipkarte für die Tür zum Serverraum · 2. Zwei-Faktor-Anmeldung am Notebook · 3. Lagermitarbeitende sehen keine Personaldaten.

> [!success]- Lösung c
> 1 **Zutrittskontrolle** · 2 **Zugangskontrolle** · 3 **Zugriffskontrolle**
>
> Hinweis: Die Kontrollarten stammen aus der Anlage zu § 9 BDSG a. F. Die DSGVO fordert allgemein „geeignete technische und organisatorische Maßnahmen“ (Art. 32); die Einteilung ist in IHK-Prüfungen aber weiterhin üblich.
>
> **Bewertung:** (je Zuordnung 2 P)
>
> 📘 **Nachlernen:** [[I2 Datenschutz#6. Technische und organisatorische Maßnahmen (TOM)|I2 › Technische und organisatorische Maßnahmen]]

**d) (5 P)** Mehrere Mitarbeitende haben Phishing-Mails erhalten. Nennen Sie je eine technische und eine organisatorische Maßnahme und erklären Sie, warum 2FA hier hilft.

> [!success]- Lösung d
> technisch: Spam-/Phishing-Filter, Warnhinweis bei externen Mails · organisatorisch: Schulung/Awareness, Meldeweg · 2FA: Selbst wenn das Passwort abgegriffen wird, fehlt dem Angreifer der **zweite Faktor**.
>
> **Bewertung:** (technische und organisatorische Maßnahme je 1,5 P, Erklärung 2FA 2 P)
>
> 📘 **Nachlernen:** [[I5 Bedrohungen und Schutzmaßnahmen#2. Angriffe|I5 › Angriffe]] · [[I5 Bedrohungen und Schutzmaßnahmen#3. Authentifizierung|I5 › Authentifizierung]]

---

## Aufgabe 4 – Rechnen und Programmlogik (25 Punkte)

**a) (6 P)** Die Lagerdatenbank (18 GiB) wird über eine Leitung mit 40 Mbit/s zum neuen Standort übertragen. Berechnen Sie die Dauer in h, min und s.

> [!success]- Lösung a
> 18 × 2³⁰ B = 19 327 352 832 B × 8 = 154 618 822 656 Bit / (40 · 10⁶ Bit/s) ≈ 3 865,5 s → **1 h 4 min 25 s**
>
> **Bewertung:** (Umrechnung in Bit 3 P, Division und Umrechnung in h/min/s 3 P)
>
> 📘 **Nachlernen:** [[H3 Datenmengen und Übertragung#3. Übertragungsdauer|H3 › Übertragungsdauer]]

**b) (5 P)** Der folgende Algorithmus soll das **Durchschnittsgewicht** der Pakete in der Liste `gewichte` berechnen (erstes Element hat den Index 0). Er enthält zwei Fehler. Nennen Sie die Fehler und korrigieren Sie den Algorithmus.
```text
summe ← 0
FÜR i ← 1 BIS länge(gewichte)
    summe ← summe + gewichte[i]
ENDE FÜR
schnitt ← summe / länge(gewichte)
ausgabe(schnitt)
```

> [!success]- Lösung b
> 1. **Falscher Indexbereich:** Die Schleife beginnt bei 1 (das erste Paket fehlt) und endet bei `länge(gewichte)` – dieser Index existiert nicht (Laufzeitfehler). Korrektur: `FÜR i ← 0 BIS länge(gewichte) − 1`.
> 2. **Leere Liste:** Bei `länge(gewichte) = 0` wird durch 0 geteilt. Korrektur: vor der Division `WENN länge(gewichte) > 0 DANN … SONST ausgabe("keine Pakete")`.
>
> **Bewertung:** (je Fehler erkannt 1 P, je Korrektur 1,5 P)
>
> 📘 **Nachlernen:** [[S3 Algorithmen, Darstellung und Testen#4. Fehlerarten und Debugging|S3 › Fehlerarten und Debugging]]

**c) (8 P)** Die Liste `gewichte` enthält Paketgewichte in kg. Schreiben Sie einen Algorithmus, der das **Gesamtgewicht** und die **Anzahl der Sperrgut-Pakete** (> 30 kg) ausgibt. Testen Sie mit `[12.5, 31.0, 8.2, 45.7, 29.9]`.

> [!success]- Lösung c
> ```text
> summe ← 0
> sperrgut ← 0
> FÜR i ← 0 BIS länge(gewichte) − 1
>     summe ← summe + gewichte[i]
>     WENN gewichte[i] > 30 DANN
>         sperrgut ← sperrgut + 1
>     ENDE WENN
> ENDE FÜR
> ausgabe(summe, sperrgut)
> ```
> Test: Summe **127,3 kg**, Sperrgut **2** (31,0 und 45,7)
>
> **Bewertung:** (Initialisierung 2 P, Schleife 2 P, Bedingung und Zähler 2 P, Testergebnis 2 P)
>
> 📘 **Nachlernen:** [[S2 Programmierung – Grundlagen#5. Arrays/Listen – die Standardmuster|S2 › Arrays/Listen – die Standardmuster]]

**d) (6 P)** Was gibt der folgende Algorithmus für `n ← 7` aus? Erstellen Sie eine Trace-Tabelle und beschreiben Sie, was er berechnet.
```text
ergebnis ← 1
i ← 1
SOLANGE i ≤ n
    WENN i MOD 2 = 1 DANN
        ergebnis ← ergebnis * i
    ENDE WENN
    i ← i + 1
ENDE SOLANGE
ausgabe(ergebnis)
```

> [!success]- Lösung d
> | i | ungerade? | ergebnis |
> |---|---|---|
> | 1 | ja | 1 |
> | 2 | nein | 1 |
> | 3 | ja | 3 |
> | 4 | nein | 3 |
> | 5 | ja | 15 |
> | 6 | nein | 15 |
> | 7 | ja | 105 |
> Ausgabe **105** – das **Produkt aller ungeraden Zahlen von 1 bis n**.
>
> **Bewertung:** (Trace-Tabelle 4 P, Beschreibung 2 P)
>
> 📘 **Nachlernen:** [[S3 Algorithmen, Darstellung und Testen#2. Schreibtischtest (Trace-Tabelle)|S3 › Schreibtischtest]]

---
Ergebnis oben im Widget eintragen · Fehler ins [[Fehlerlog]] · weiter mit [[Probeprüfung 2]]
