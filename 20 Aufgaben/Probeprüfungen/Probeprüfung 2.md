---
tags: [ap1/pruefung]
---
# Probeprüfung 2 – Bäckerei Kornfeld KG

```dataviewjs
await dv.view("99 System/views/pruefung", { name: "Probeprüfung 2" })
```

> [!info] Ausgangssituation
> Die **Bäckerei Kornfeld KG** (fiktiv) hat eine Zentrale mit Backstube und Verwaltung sowie drei Filialen. Kassen, Verwaltung und Warenwirtschaft sollen modernisiert und die Filialen sicher angebunden werden. Du unterstützt den IT-Dienstleister der Bäckerei.
> **Bearbeitungszeit 90 Minuten · 4 Aufgaben à 25 Punkte · Hilfsmittel: Taschenrechner**

---

## Aufgabe 1 – Hardware und Beschaffung (25 Punkte)

**a) (8 P)** Für die Verwaltung werden 4 Büro-PCs beschafft. Ermittle die Bezugspreise und das günstigere Angebot.
- Angebot A: 689,00 €/Stück, 5 % Rabatt, 2 % Skonto, Versand 29,00 €
- Angebot B: 649,00 €/Stück, kein Rabatt, 3 % Skonto, Versand 49,00 €

> [!success]- Lösung a
> | | A | B |
> |---|---|---|
> | Listenpreis | 2 756,00 € | 2 596,00 € |
> | − Rabatt | 137,80 € | 0,00 € |
> | = ZEP | 2 618,20 € | 2 596,00 € |
> | − Skonto | 52,36 € | 77,88 € |
> | = BEP | 2 565,84 € | 2 518,12 € |
> | + Versand | 29,00 € | 49,00 € |
> | **Bezugspreis** | **2 594,84 €** | **2 567,12 €** |
> **B** ist um **27,72 €** günstiger (bei Einhaltung der Skontofrist). (je Angebot 3 P, Entscheidung 2 P)
>
> 📘 **Nachlernen:** [[W1 Beschaffung und Kalkulation#3. Bezugskalkulation (Angebotsvergleich, quantitativ)|W1 › Bezugskalkulation]]

**b) (5 P)** Der Kassenserver in der Zentrale soll über eine USV abgesichert werden. Angeschlossen werden: Server 320 W, Router 25 W, Switch 35 W. Leistungsfaktor 0,8, Reserve 25 %.
Verfügbare Modelle: **600 VA/360 W · 750 VA/450 W · 1 000 VA/600 W**. Welches Modell wählst du?

> [!success]- Lösung b
> 320 + 25 + 35 = 380 W × 1,25 = **475 W** · S = 475 / 0,8 = **593,75 VA**
> 600 VA/360 W → Watt reichen nicht · 750 VA/450 W → Watt reichen nicht · **1 000 VA/600 W** erfüllt beide Werte. (5 P)
>
> 📘 **Nachlernen:** [[H5 Elektrotechnik, USV und Energie#Dimensionierung|H5 › Dimensionierung]]

**c) (6 P)** Die gewählte USV enthält zwei 12-V-Akkus mit je 7 Ah in Reihe (24 V), Wirkungsgrad 85 %. Berechne die Überbrückungszeit bei der tatsächlichen Last von 380 W. Reicht sie für ein geordnetes Herunterfahren (ca. 5 Minuten)?

> [!success]- Lösung c
> t = 7 Ah × 24 V × 0,85 / 380 W = 142,8 Wh / 380 W = 0,376 h ≈ **22,5 min** → **reicht**; Shutdown-Software einrichten, die den Server bei Stromausfall automatisch herunterfährt. (6 P)
>
> 📘 **Nachlernen:** [[H5 Elektrotechnik, USV und Energie#Überbrückungszeit aus Akkudaten|H5 › Überbrückungszeit aus Akkudaten]]

**d) (6 P)** In den Filialen sollen neue Kassenrechner (Mini-PCs) aufgestellt werden, einer davon direkt neben der Backstube. Nenne drei Auswahlkriterien und begründe sie.

> [!success]- Lösung d (je 2 P)
> - **lüfterloses, geschlossenes Gehäuse** – Mehlstaub würde Lüfter und Kühlkörper zusetzen
> - **ausreichend Schnittstellen** (USB für Scanner/Bondrucker, LAN, ggf. seriell) – Kassenperipherie muss angeschlossen werden
> - **geringer Stromverbrauch und kompakte Bauweise** – Dauerbetrieb, wenig Platz an der Theke
> - **Vor-Ort-Service mit kurzer Reaktionszeit** – ohne Kasse kein Verkauf
>
> 📘 **Nachlernen:** [[H1 PC-Komponenten und Arbeitsplatzgeräte#8. Geräteklassen|H1 › Geräteklassen]] · [[H1 PC-Komponenten und Arbeitsplatzgeräte#10. So begründest du eine Auswahl|H1 › So begründest du eine Auswahl]]

---

## Aufgabe 2 – Netzwerk (25 Punkte)

**a) (10 P)** Die Zentrale erhält das Netz `10.20.0.0/22`. Es werden benötigt: Gäste-WLAN 200 Geräte · Büro 120 Geräte · Kassen und Server 50 Geräte · Backstubengeräte (Sensoren, Öfen) 25 Geräte. Plane die Subnetze lückenlos ab `10.20.0.0` (VLSM, jeweils kleinstmöglich) mit Präfix, Netzadresse und Broadcast.

> [!success]- Lösung a
> | Netz | Bedarf | Präfix | Netzadresse | Broadcast |
> |---|---|---|---|---|
> | Gäste | 200 | /24 (254) | 10.20.0.0 | 10.20.0.255 |
> | Büro | 120 | /25 (126) | 10.20.1.0 | 10.20.1.127 |
> | Kassen/Server | 50 | /26 (62) | 10.20.1.128 | 10.20.1.191 |
> | Backstube | 25 | /27 (30) | 10.20.1.192 | 10.20.1.223 |
> Frei bleibt u. a. 10.20.1.224 – 10.20.3.255. (je Zeile 2,5 P)
>
> 📘 **Nachlernen:** [[N2 IPv4 und Subnetting#5. Nach Hostanzahl planen (VLSM)|N2 › Nach Hostanzahl planen]]

**b) (5 P)** Die Filialen sollen per VPN mit der Zentrale verbunden werden. Erläutere, was ein Site-to-Site-VPN ist und wie Vertraulichkeit hergestellt wird.

> [!success]- Lösung b
> Ein **Site-to-Site-VPN** verbindet zwei Standortnetze dauerhaft über einen **verschlüsselten Tunnel** durch das Internet; die Router/Firewalls an beiden Enden bauen den Tunnel auf, die Endgeräte merken davon nichts. (2 P)
> Vertraulichkeit: **hybrides Verfahren** (z. B. IPsec, WireGuard) – Authentifizierung und Schlüsselaustausch asymmetrisch bzw. per Diffie-Hellman, Datenverschlüsselung symmetrisch (z. B. AES), zusätzlich Integritätsschutz. (3 P)
>
> 📘 **Nachlernen:** [[I4 Kryptografie#4. Hybride Verschlüsselung|I4 › Hybride Verschlüsselung]] · [[I4 Kryptografie#8. Anwendungen im Überblick|I4 › Anwendungen im Überblick]]

**c) (5 P)** Ein Kassenrechner in Filiale 2 zeigt die IP-Adresse `169.254.10.3`. Erkläre die Ursache und beschreibe drei Prüfschritte.

> [!success]- Lösung c
> **APIPA-Adresse**: Der Rechner hat keine Antwort von einem **DHCP-Server** erhalten. (2 P)
> Prüfen (je 1 P): Kabel/Link-LED und Switchport (Schicht 1/2) · richtiges VLAN am Port · DHCP-Server bzw. DHCP-Relay über das VPN erreichbar, Pool nicht erschöpft · danach `ipconfig /renew`.
>
> 📘 **Nachlernen:** [[N2 IPv4 und Subnetting#Typische Fehlkonfigurationen|N2 › Typische Fehlkonfigurationen]] · [[N4 Netzwerkdienste und Protokolle#2. DHCP – automatische Adressvergabe|N4 › DHCP – automatische Adressvergabe]]

**d) (5 P)** Welche Zielports muss die Firewall für folgende Dienste erlauben? Webbasiertes Kassen-Backend (verschlüsselt) · Namensauflösung · Uhrzeitsynchronisation der Kassen · Mailversand vom Büro-PC an den Provider · verschlüsselter Mailabruf per IMAP.

> [!success]- Lösung d
> HTTPS **443/TCP** · DNS **53/UDP (TCP)** · NTP **123/UDP** · SMTP Submission **587/TCP** (oder 465) · IMAPS **993/TCP** (je 1 P)
>
> 📘 **Nachlernen:** [[N4 Netzwerkdienste und Protokolle#5. Wichtige Ports|N4 › Wichtige Ports]]

---

## Aufgabe 3 – IT-Sicherheit und Datenschutz (25 Punkte)

**a) (6 P)** Die Bäckerei startet ein Bonusprogramm: Kund:innen registrieren sich mit Name, E-Mail und Geburtsdatum und sammeln Punkte. Außerdem werden Tagesumsätze je Filiale ausgewertet.
Welche dieser Daten sind personenbezogen? Nenne eine passende Rechtsgrundlage für die Bonusdaten und zwei Pflichten der Bäckerei.

> [!success]- Lösung a
> Personenbezogen: **Name, E-Mail, Geburtsdatum, Punktestand/Einkäufe** der Kund:innen; **nicht** personenbezogen: Tagesumsätze je Filiale (keine Person identifizierbar). (2 P)
> Rechtsgrundlage: **Vertrag** (Teilnahmebedingungen des Bonusprogramms) bzw. **Einwilligung** für Werbemails. (2 P)
> Pflichten (je 1 P): Informationspflicht (Datenschutzerklärung) · Datenminimierung (Geburtsdatum wirklich nötig?) · Löschkonzept/Speicherbegrenzung · TOM · Verzeichnis von Verarbeitungstätigkeiten · Auskunft auf Anfrage.
>
> 📘 **Nachlernen:** [[I2 Datenschutz#1. Rechtlicher Rahmen und Begriffe|I2 › Rechtlicher Rahmen und Begriffe]] · [[I2 Datenschutz#3. Rechtsgrundlagen (Art. 6 Abs. 1) – mindestens eine muss vorliegen|I2 › Rechtsgrundlagen (Art. 6 Abs. 1) – mindestens eine muss vorliegen]]

**b) (8 P)** Die Warenwirtschaft wird sonntags voll gesichert (300 GB), Montag bis Samstag inkrementell; täglich ändern sich ca. 12 GB (immer andere Daten). Am **Freitagabend nach der Sicherung** fällt der Server aus.
1. Welche Sicherungen werden für die Wiederherstellung benötigt? 2. Wie groß ist der Speicherbedarf bis einschließlich Freitag? 3. Wie groß wäre er bei differenzieller Sicherung? 4. Wo sollten die Sicherungen liegen?

> [!success]- Lösung b
> 1. **So (voll) + Mo, Di, Mi, Do, Fr** – 6 Sicherungen (2 P)
> 2. 300 + 5 × 12 = **360 GB** (2 P)
> 3. 300 + 12 + 24 + 36 + 48 + 60 = **480 GB** (2 P)
> 4. **3-2-1**: z. B. NAS in der Zentrale + verschlüsselte Kopie außer Haus (Filiale/Cloud mit AVV), eine Kopie offline bzw. unveränderbar gegen Ransomware (2 P)
>
> 📘 **Nachlernen:** [[I3 Datensicherung#1. Sicherungsarten|I3 › Sicherungsarten]] · [[I3 Datensicherung#3-2-1-Regel|I3 › 3-2-1-Regel]]

**c) (6 P)** Bestimme den Schutzbedarf (normal/hoch/sehr hoch) des Kassensystems für die drei Grundwerte und begründe jeweils.

> [!success]- Lösung c (je 2 P, Begründung entscheidend)
> - **Verfügbarkeit: hoch** – ohne Kasse kein Verkauf in den Filialen, direkter Umsatzausfall
> - **Integrität: sehr hoch** – Kassendaten sind steuerlich relevant (manipulationssichere Aufzeichnung, GoBD), falsche Daten → rechtliche Folgen
> - **Vertraulichkeit: normal bis hoch** – Umsätze sind Betriebsgeheimnisse; bei Bonuskarten zusätzlich personenbezogene Daten
>
> 📘 **Nachlernen:** [[I1 Informationssicherheit und IT-Grundschutz#3. Schutzbedarfsfeststellung (BSI-Standard 200-2)|I1 › Schutzbedarfsfeststellung]]

**d) (5 P)** Eine Filialleiterin erhält eine Mail „vom Mehllieferanten“ mit geänderter Bankverbindung und der Bitte, die offene Rechnung dringend dorthin zu überweisen. Beurteile die Situation und nenne drei Maßnahmen.

> [!success]- Lösung d
> Typischer **Betrugsversuch (Business E-Mail Compromise/CEO-Fraud-Variante)** – Zeitdruck und geänderte Bankdaten sind Warnsignale. (2 P)
> Maßnahmen (je 1 P): **Rückruf beim Lieferanten über die bekannte Telefonnummer** (nicht aus der Mail) · **Vier-Augen-Prinzip** bei Änderung von Bankdaten · Schulung/Awareness · Mail an die IT melden, Absender blockieren.
>
> 📘 **Nachlernen:** [[I5 Bedrohungen und Schutzmaßnahmen#2. Angriffe|I5 › Angriffe]]

---

## Aufgabe 4 – Programmlogik und Projekt (25 Punkte)

**a) (8 P)** Das Array `umsatz` enthält die Tagesumsätze einer Filiale von Montag (Index 0) bis Sonntag (Index 6). Schreibe einen Algorithmus, der die **Wochensumme**, den **Index des umsatzstärksten Tages** und die **Anzahl der Tage unter 800 €** ausgibt. Teste mit `[920, 780, 1010, 650, 1200, 1580, 0]`.

> [!success]- Lösung a
> ```text
> summe ← 0
> besterIndex ← 0
> anzahlUnter ← 0
> FÜR i ← 0 BIS 6
>     summe ← summe + umsatz[i]
>     WENN umsatz[i] > umsatz[besterIndex] DANN
>         besterIndex ← i
>     ENDE WENN
>     WENN umsatz[i] < 800 DANN
>         anzahlUnter ← anzahlUnter + 1
>     ENDE WENN
> ENDE FÜR
> ausgabe(summe, besterIndex, anzahlUnter)
> ```
> Test: Summe **6 140 €**, bester Tag **Index 5** (Samstag, 1 580 €), unter 800 €: **3** Tage (780, 650, 0). (Initialisierung 2 P, Schleife 2 P, je Ergebnis 1 P, Test 1 P)
>
> 📘 **Nachlernen:** [[S2 Programmierung – Grundlagen#5. Arrays/Listen – die Standardmuster|S2 › Arrays/Listen – die Standardmuster]]

**b) (5 P)** Kund:innen erhalten ab 100 Bonuspunkten 5 % und ab 500 Punkten 10 % Rabatt; negative Punktzahlen sind ungültig. Erstelle fünf sinnvolle Testfälle.

> [!success]- Lösung b
> | Eingabe | Soll |
> |---|---|
> | 99 | 0 % |
> | 100 | 5 % |
> | 499 | 5 % |
> | 500 | 10 % |
> | −1 | Fehlermeldung |
> Grenzwerte jeweils **auf** und **neben** der Grenze + Negativtest. (5 P)
>
> 📘 **Nachlernen:** [[S3 Algorithmen, Darstellung und Testen#Testfälle entwerfen|S3 › Testfälle entwerfen]]

**c) (12 P)** Einführung des neuen Kassensystems:

| Vorgang | Beschreibung | Dauer (Tage) | Vorgänger |
|---|---|---|---|
| A | Anforderungen erheben | 3 | – |
| B | Angebote einholen/auswählen | 4 | A |
| C | Schulungskonzept erstellen | 2 | A |
| D | Lieferung | 5 | B |
| E | Installation Zentrale | 2 | D |
| F | Installation Filialen | 3 | D |
| G | Schulung | 2 | C, E |
| H | Echtbetrieb und Abnahme | 1 | F, G |
Berechne FAZ, FEZ, SAZ, SEZ und GP, bestimme Projektdauer und kritischen Pfad und erkläre den Puffer von C.

> [!success]- Lösung c
> | | D | FAZ | FEZ | SAZ | SEZ | GP |
> |---|---|---|---|---|---|---|
> | A | 3 | 0 | 3 | 0 | 3 | 0 |
> | B | 4 | 3 | 7 | 3 | 7 | 0 |
> | C | 2 | 3 | 5 | 12 | 14 | **9** |
> | D | 5 | 7 | 12 | 7 | 12 | 0 |
> | E | 2 | 12 | 14 | 12 | 14 | 0 |
> | F | 3 | 12 | 15 | 13 | 16 | 1 |
> | G | 2 | 14 | 16 | 14 | 16 | 0 |
> | H | 1 | 16 | 17 | 16 | 17 | 0 |
> Projektdauer **17 Tage**, kritischer Pfad **A → B → D → E → G → H** (Tabelle 8 P, Dauer/Pfad 2 P)
> C hat **9 Tage Gesamtpuffer**: Das Schulungskonzept kann bis Tag 12 begonnen werden, ohne das Projektende zu gefährden – Personal kann flexibel eingeplant werden. (2 P)
>
> 📘 **Nachlernen:** [[P2 Netzplan und Zeitplanung#2. Rechenregeln|P2 › Rechenregeln]]

---
Ergebnis oben im Widget eintragen · Fehler ins [[Fehlerlog]] · weiter mit [[Probeprüfung 3]]
