---
bereich: Software
tags: [ap1/aufgaben, ap1/software]
---
# Aufgaben Software

★ Einstieg · ★★ Prüfungsniveau · ★★★ anspruchsvoll. Unbegrenzte Umrechnungs- und Trace-Aufgaben: [[Trainer#Software]].

> [!info] Ausgangssituation
> Die **Fahrradmanufaktur Weber OHG** (fiktiv, 35 Mitarbeitende, Werkstatt, Verkauf, Onlineshop) digitalisiert ihre Abläufe. Du unterstützt die IT-Abteilung.

---

## S1 Zahlensysteme und Codierung

### S1.1 ★ – Umrechnen (6 Punkte)
📘 **Nachlernen:** [[S1 Zahlensysteme und Codierung#2. Umrechnungen|S1 › Umrechnungen]]

Vervollständige die Tabelle.

| Dezimal | Binär | Hexadezimal |
|---|---|---|
| 200 | | |
| | 0111 1011 | |
| | | 0x3C |

> [!success]- Lösung
> | Dezimal | Binär | Hexadezimal |
> |---|---|---|
> | 200 | 1100 1000 | C8 |
> | 123 | 0111 1011 | 7B |
> | 60 | 0011 1100 | 3C |
> je Feld 1 P

### S1.2 ★★ – MAC und Farben (4 Punkte)
📘 **Nachlernen:** [[S1 Zahlensysteme und Codierung#Binär ↔ Hex – in 4er-Gruppen (Nibbles)|S1 › Binär ↔ Hex – in 4er-Gruppen]] · [[N1 Netzwerkgrundlagen und OSI-Modell#4. Hex-Werte in Paketheadern lesen|N1 › Hex-Werte in Paketheadern lesen]]

a) Wie viele Bit hat die MAC-Adresse `3C:52:82:1A:9F:04`, und welcher Teil kennzeichnet den Hersteller? b) Der Webshop nutzt die Farbe `#2E8B57`. Gib die RGB-Anteile dezimal an.

> [!success]- Lösung
> a) 6 Byte = **48 Bit**; die ersten 3 Byte (`3C:52:82`) sind die **OUI** des Herstellers. (2 P)
> b) 2E = 46 · 8B = 139 · 57 = 87 → **RGB(46, 139, 87)** (2 P)

### S1.3 ★★ – Zweierkomplement (5 Punkte)
📘 **Nachlernen:** [[S1 Zahlensysteme und Codierung#3. Negative Zahlen – Zweierkomplement|S1 › Negative Zahlen – Zweierkomplement]]

Ein Temperatursensor liefert 8-Bit-Werte im Zweierkomplement.
a) Welche Temperatur bedeutet `1111 0110`? b) Wie wird −35 °C übertragen? c) Welchen Messbereich kann der Sensor abbilden?

> [!success]- Lösung
> a) 246 − 256 = **−10 °C** (2 P)
> b) 35 = 0010 0011 → invertiert 1101 1100 → +1 = **1101 1101** (2 P)
> c) **−128 bis +127 °C** (1 P)

### S1.4 ★★ – Datei ohne Endung (4 Punkte)
📘 **Nachlernen:** [[S1 Zahlensysteme und Codierung#4. Zeichencodierung|S1 › Zeichencodierung]]

Nach einem Datenverlust liegen Dateien ohne Endung vor. Eine beginnt mit `50 4B 03 04`, eine andere mit `FF D8 FF E0`. Wie erkennt man den Dateityp, und um welche Typen handelt es sich?

> [!success]- Lösung
> Mit einem **Hex-Editor** die ersten Bytes (**Magic Number/Dateisignatur**) lesen und mit einer Signaturliste vergleichen. (2 P) `50 4B 03 04` = „PK“ → **ZIP-Container** (auch DOCX/XLSX) · `FF D8 FF` → **JPEG** (2 P)

---

## S2 Programmierung – Grundlagen

### S2.1 ★★ – Rabattberechnung ergänzen (8 Punkte)
📘 **Nachlernen:** [[S2 Programmierung – Grundlagen#3. Verzweigung|S2 › Verzweigung]] · [[S2 Programmierung – Grundlagen#6. Funktionen|S2 › Funktionen]]

Im Onlineshop gilt: Bestellwert unter 200 € → kein Rabatt; ab 200 € → 5 %; ab 1 000 € → 10 %. Stammkunden erhalten zusätzlich 2 % auf den bereits rabattierten Preis. Schreibe eine Funktion `endpreis(wert, stammkunde)` in Pseudocode.

> [!success]- Lösung
> ```text
> FUNKTION endpreis(wert : Dezimal, stammkunde : Boolean) : Dezimal
>     WENN wert ≥ 1000 DANN
>         rabatt ← 0.10
>     SONST WENN wert ≥ 200 DANN
>         rabatt ← 0.05
>     SONST
>         rabatt ← 0
>     ENDE WENN
>     preis ← wert * (1 − rabatt)
>     WENN stammkunde = wahr DANN
>         preis ← preis * 0.98
>     ENDE WENN
>     RÜCKGABE preis
> ENDE FUNKTION
> ```
> Bewertung: Funktionskopf mit Parametern/Rückgabe (2 P), Verzweigung in richtiger Reihenfolge (3 P), Stammkundenrabatt auf rabattierten Preis (2 P), Rückgabe (1 P).

### S2.2 ★★ – Lagerliste auswerten (8 Punkte)
📘 **Nachlernen:** [[S2 Programmierung – Grundlagen#5. Arrays/Listen – die Standardmuster|S2 › Arrays/Listen – die Standardmuster]]

Gegeben: `bestand` (Liste von Ganzzahlen) und `mindest` (Ganzzahl). Schreibe einen Algorithmus, der
a) die Anzahl der Artikel unter Mindestbestand, b) den kleinsten Bestand und c) den durchschnittlichen Bestand ausgibt.

> [!success]- Lösung
> ```text
> anzahlUnter ← 0
> kleinster ← bestand[0]
> summe ← 0
> FÜR i ← 0 BIS länge(bestand) − 1
>     WENN bestand[i] < mindest DANN
>         anzahlUnter ← anzahlUnter + 1
>     ENDE WENN
>     WENN bestand[i] < kleinster DANN
>         kleinster ← bestand[i]
>     ENDE WENN
>     summe ← summe + bestand[i]
> ENDE FÜR
> ausgabe(anzahlUnter, kleinster, summe / länge(bestand))
> ```
> Initialisierungen (2 P), korrekte Schleife (2 P), je Teilaufgabe 1 P, Minimum mit erstem Element initialisiert (1 P). Zusatz: leere Liste abfangen.

### S2.3 ★ – Datentypen (5 Punkte)
📘 **Nachlernen:** [[S2 Programmierung – Grundlagen#2. Variablen und Datentypen|S2 › Variablen und Datentypen]]

Wähle für die Attribute eines Kunden passende Datentypen und begründe zwei davon: Kundennummer (fortlaufend), Name, PLZ, Umsatz des Jahres, Newsletter gewünscht.

> [!success]- Lösung
> Kundennummer: **Integer** · Name: **String** · PLZ: **String** (führende Null, keine Rechnung) · Umsatz: **Dezimal/Festkomma** (Geld, keine Rundungsfehler durch float) · Newsletter: **Boolean** (ja/nein). (je 1 P)

### S2.4 ★★★ – Eingabeprüfung (5 Punkte)
📘 **Nachlernen:** [[S2 Programmierung – Grundlagen#4. Schleifen (Wiederholung)|S2 › Schleifen]]

Die Anzahl bestellter Fahrräder soll so lange abgefragt werden, bis ein Wert zwischen 1 und 10 eingegeben wird. Welche Schleifenart passt? Schreibe den Pseudocode.

> [!success]- Lösung
> **Fußgesteuerte Schleife**, weil mindestens eine Eingabe nötig ist. (2 P)
> ```text
> WIEDERHOLE
>     anzahl ← eingabe("Anzahl (1–10): ")
>     WENN anzahl < 1 ODER anzahl > 10 DANN
>         ausgabe("Ungültige Eingabe")
>     ENDE WENN
> BIS anzahl ≥ 1 UND anzahl ≤ 10
> ```
> (3 P)

---

## S3 Algorithmen, Darstellung und Testen

> [!info] AP1-Priorität
> Aufgaben zu UML-Aktivitätsdiagrammen, Pseudocode und Schreibtischtests sind AP1-nah. Struktogramm- und PAP-Aufgaben darunter sind optionale Wiederholung älterer Darstellungen (seit Katalog 2025 aus AP1 gestrichen). [[Prüfung AP1]]

### S3.1 ★★ – Schreibtischtest (6 Punkte)
📘 **Nachlernen:** [[S3 Algorithmen, Darstellung und Testen#2. Schreibtischtest (Trace-Tabelle)|S3 › Schreibtischtest]] · [[S3 Algorithmen, Darstellung und Testen#Bubble Sort|S3 › Bubble Sort]]

```text
z ← [6, 3, 8, 1]
FÜR i ← 0 BIS 2
    WENN z[i] > z[i + 1] DANN
        tmp ← z[i]
        z[i] ← z[i + 1]
        z[i + 1] ← tmp
    ENDE WENN
ENDE FÜR
```
Führe einen Schreibtischtest durch. Welchen Inhalt hat `z` am Ende, und was bewirkt der Algorithmus?

> [!success]- Lösung
> | i | Vergleich | z danach |
> |---|---|---|
> | 0 | 6 > 3 → tauschen | [3, 6, 8, 1] |
> | 1 | 6 > 8 nein | [3, 6, 8, 1] |
> | 2 | 8 > 1 → tauschen | [3, 6, 1, 8] |
> Ergebnis **[3, 6, 1, 8]** (4 P) – ein **Durchlauf Bubble Sort**: das größte Element wandert ans Ende (2 P).

### S3.2 ★★ – Fehler finden (6 Punkte)
📘 **Nachlernen:** [[S3 Algorithmen, Darstellung und Testen#4. Fehlerarten und Debugging|S3 › Fehlerarten und Debugging]] · [[S2 Programmierung – Grundlagen#5. Arrays/Listen – die Standardmuster|S2 › Arrays/Listen – die Standardmuster]]

Der Algorithmus soll den Durchschnitt aller Noten berechnen. Finde drei Fehler und korrigiere sie.
```text
FÜR i ← 1 BIS länge(noten)
    summe ← summe + noten[i]
ENDE FÜR
schnitt ← summe / länge(noten)
```

> [!success]- Lösung (je 2 P)
> 1. `summe` nicht initialisiert → `summe ← 0` vor der Schleife
> 2. Indexbereich falsch (Index ab 0) → `FÜR i ← 0 BIS länge(noten) − 1`
> 3. Division durch 0 bei leerer Liste → vorher `WENN länge(noten) > 0 DANN …`

### S3.3 ★★ – Testfälle (6 Punkte)
📘 **Nachlernen:** [[S3 Algorithmen, Darstellung und Testen#Testfälle entwerfen|S3 › Testfälle entwerfen]]

Die Versandkosten: bis 50 € Bestellwert 4,90 €, ab 50 € versandkostenfrei; negative Werte sind ungültig. Erstelle einen Testfallkatalog mit mindestens fünf Testfällen (inkl. Grenzwerte).

> [!success]- Lösung
> | Nr. | Eingabe | Art | Soll |
> |---|---|---|---|
> | 1 | 20,00 € | Normalfall unter Grenze | 4,90 € |
> | 2 | 49,99 € | Grenzwert | 4,90 € |
> | 3 | 50,00 € | Grenzwert | 0,00 € |
> | 4 | 120,00 € | Normalfall über Grenze | 0,00 € |
> | 5 | 0,00 € | Randfall | 4,90 € (oder Hinweis „leerer Warenkorb“) |
> | 6 | −5,00 € | ungültig | Fehlermeldung |
> Grenzwerte (2 P), Äquivalenzklassen (2 P), Negativtest (1 P), Tabellenform mit Soll (1 P).

### S3.4 ★★ – Darstellung (6 Punkte)
📘 **Nachlernen:** [[S3 Algorithmen, Darstellung und Testen#Struktogramm (Nassi-Shneiderman, DIN 66261)|S3 › Struktogramm]] · [[S3 Algorithmen, Darstellung und Testen#Programmablaufplan (PAP, DIN 66001)|S3 › Programmablaufplan]]

Stelle den Algorithmus aus S2.4 (Eingabeprüfung) als Struktogramm **oder** PAP dar (Skizze beschreiben genügt) und nenne je einen Vorteil beider Darstellungen.

> [!success]- Lösung
> **Struktogramm:** fußgesteuerte Schleife – Rumpf (Eingabe, Verzweigung „ungültig?“ ja: Meldung / nein: ∅) eingerückt, Bedingung „bis 1 ≤ anzahl ≤ 10“ **unten**. (3 P)
> **PAP:** Start → Parallelogramm „Eingabe anzahl“ → Raute „1 ≤ anzahl ≤ 10?“ → nein: Parallelogramm „Meldung“, Pfeil zurück zur Eingabe · ja: Ende.
> Vorteile: Struktogramm erzwingt strukturierte Programmierung ohne Sprünge; PAP ist intuitiv lesbar, zeigt den Ablauf mit Pfeilen. (3 P)

---

## S4 Betriebssysteme, Dateisysteme und Rechte

### S4.1 ★★ – Rechtekonzept (8 Punkte)
📘 **Nachlernen:** [[S4 Betriebssysteme, Dateisysteme und Rechte#Windows – NTFS- und Freigaberechte|S4 › Windows – NTFS- und Freigaberechte]] · [[S4 Betriebssysteme, Dateisysteme und Rechte#4. Benutzer, Gruppen und Rechte|S4 › Benutzer, Gruppen und Rechte]]

Auf dem Fileserver gibt es die Ordner `Buchhaltung`, `Vertrieb` und `Alle`. Die Buchhaltung soll ihren Ordner bearbeiten, die Geschäftsführung ihn lesen; der Vertrieb soll ihn nicht sehen. Alle dürfen in `Alle` schreiben.
a) Entwirf die NTFS-Berechtigungen nach dem Gruppenprinzip. b) Erkläre, was gilt, wenn die Freigabe `Buchhaltung` nur „Lesen“ erlaubt.

> [!success]- Lösung
> a) Gruppen anlegen (GG_Buchhaltung, GG_Vertrieb, GG_Geschäftsführung, Domänen-Benutzer). (2 P)
>
> | Ordner | Gruppe | NTFS-Recht |
> |---|---|---|
> | Buchhaltung | GG_Buchhaltung | Ändern |
> | Buchhaltung | GG_Geschäftsführung | Lesen |
> | Buchhaltung | (Vertrieb) | keine Berechtigung (Vererbung deaktivieren) |
> | Alle | Domänen-Benutzer | Ändern |
> (4 P)
> b) Freigabe- und NTFS-Recht werden kombiniert, das **restriktivere** gilt → auch die Buchhaltung dürfte über das Netz nur **lesen**. Freigabe daher großzügig setzen, Steuerung über NTFS. (2 P)

### S4.2 ★ – Dateisystem (4 Punkte)
📘 **Nachlernen:** [[S4 Betriebssysteme, Dateisysteme und Rechte#3. Dateisysteme|S4 › Dateisysteme]]

Die Werkstatt will ein 12-GB-Video eines Montagevorgangs per USB-Stick an einen Mac weitergeben. Der Stick ist mit FAT32 formatiert. Erkläre das Problem und die Lösung.

> [!success]- Lösung
> FAT32 erlaubt max. **4 GiB pro Datei** → Kopieren scheitert. (2 P) Stick mit **exFAT** formatieren (keine 4-GiB-Grenze, unter Windows und macOS les- und schreibbar). (2 P)

### S4.3 ★★ – Rollout (6 Punkte)
📘 **Nachlernen:** [[S4 Betriebssysteme, Dateisysteme und Rechte#5. Arbeitsplätze bereitstellen|S4 › Arbeitsplätze bereitstellen]]

15 neue Notebooks sollen einheitlich eingerichtet werden. Beschreibe ein effizientes Verfahren und nenne vier Punkte einer Abnahmecheckliste.

> [!success]- Lösung
> Verfahren: **Softwareverteilung/Endpoint-Management** (z. B. Intune/Autopilot) oder **Image** eines Referenzgeräts per **PXE** verteilen → gleiche Konfiguration, zeitsparend, dokumentiert. (2 P)
> Checkliste (je 1 P): Updates installiert · BitLocker aktiv · Domänenbeitritt/Anmeldung funktioniert · Netzlaufwerke und Drucker verbunden · Virenschutz aktiv · Fachsoftware startet · Übergabeprotokoll unterschrieben.

### S4.4 ★★ – Linux-Rechte (4 Punkte)
📘 **Nachlernen:** [[S4 Betriebssysteme, Dateisysteme und Rechte#Linux – rwx und Oktalschreibweise|S4 › Linux – rwx und Oktalschreibweise]]

Ein Skript soll vom Besitzer gelesen, geschrieben und ausgeführt, von der Gruppe gelesen und ausgeführt und von anderen gar nicht genutzt werden können. Gib den `chmod`-Befehl an und erkläre die Zahl.

> [!success]- Lösung
> `chmod 750 skript.sh` – Besitzer rwx = 4+2+1 = 7, Gruppe r-x = 4+1 = 5, Andere --- = 0. (4 P)

---

## S5 Virtualisierung und Cloud

### S5.1 ★★ – Servervirtualisierung (8 Punkte)
📘 **Nachlernen:** [[S5 Virtualisierung und Cloud#1. Virtualisierung|S5 › Virtualisierung]] · [[S5 Virtualisierung und Cloud#Nachteile/Risiken|S5 › Nachteile/Risiken]]

Fünf alte Server (Datei-, Druck-, Warenwirtschafts-, Web- und Backupserver) sollen auf einen neuen Host virtualisiert werden.
a) Welchen Hypervisor-Typ empfiehlst du? Begründe. b) Nenne drei Vorteile. c) Nenne ein Risiko und eine Gegenmaßnahme.

> [!success]- Lösung
> a) **Typ 1 (bare metal)**, z. B. Hyper-V oder Proxmox – läuft direkt auf der Hardware, höhere Leistung und Stabilität als Typ 2. (2 P)
> b) weniger Hardware, Strom, Kühlung und Platz · Snapshots vor Updates · schnelle Bereitstellung neuer Server · einfache Migration auf neue Hardware (je 1 P, max. 3)
> c) Host als **Single Point of Failure** → zweiter Host im **Cluster** mit gemeinsamem Speicher bzw. Replikation; außerdem regelmäßige VM-Backups auf ein anderes System. (3 P)

### S5.2 ★★ – Cloudmodell zuordnen (6 Punkte)
📘 **Nachlernen:** [[S5 Virtualisierung und Cloud#Servicemodelle|S5 › Servicemodelle]]

Ordne IaaS, PaaS oder SaaS zu und begründe kurz: a) Online-Buchhaltungssoftware im Browser, b) gemietete virtuelle Maschine für den Webshop, c) Datenbank als Dienst, auf der der Webshop läuft.

> [!success]- Lösung
> a) **SaaS** – komplette Anwendung vom Anbieter · b) **IaaS** – Kunde verwaltet Betriebssystem und Software · c) **PaaS** – Plattform/Datenbank wird bereitgestellt, Kunde liefert Anwendung/Daten. (je 2 P)

### S5.3 ★★★ – Cloud bewerten (8 Punkte)
📘 **Nachlernen:** [[S5 Virtualisierung und Cloud#Vor- und Nachteile|S5 › Vor- und Nachteile]] · [[S5 Virtualisierung und Cloud#Cloud unter Datenschutzgesichtspunkten auswählen|S5 › Cloud unter Datenschutzgesichtspunkten auswählen]]

Die Geschäftsführung überlegt, den Mailserver und die Dateiablage in eine Public Cloud eines US-Anbieters zu verlagern. Erläutere zwei Vorteile, zwei Risiken und drei Punkte, die vertraglich/technisch geklärt werden müssen.

> [!success]- Lösung
> Vorteile (je 1 P): keine eigene Serverhardware/Wartung · hohe Verfügbarkeit laut SLA · ortsunabhängiger Zugriff · skalierbare Kosten
> Risiken (je 1 P): Abhängigkeit vom Internetzugang und Anbieter (Lock-in) · Datenschutz bei Übermittlung in ein Drittland · laufende Kosten
> Zu klären (je 1 P, max. 3 + 1 Zusatzpunkt): **AVV nach Art. 28 DSGVO** · **Serverstandort EU** und Rechtsgrundlage für Drittlandübermittlung (Data Privacy Framework/Standardvertragsklauseln) · **Verschlüsselung** · **SLA** (Verfügbarkeit, Support) · **Exit-Strategie**/Datenexport · MFA für alle Konten.

---

## S6 Software beschaffen und lizenzieren

### S6.1 ★★ – Standard oder individuell? (6 Punkte)
📘 **Nachlernen:** [[S6 Software beschaffen und lizenzieren#1. Standard- vs. Individualsoftware|S6 › Standard- vs. Individualsoftware]] · [[W4 Verträge und Kaufvertragsstörungen#3. Vertragsarten für IT-Leistungen|W4 › Vertragsarten für IT-Leistungen]]

Für die Werkstattplanung wird eine Terminsoftware gesucht. Vergleiche Standard- und Individualsoftware anhand von drei Kriterien und nenne die jeweilige Vertragsart.

> [!success]- Lösung
> Kriterien (je 1,5 P): **Kosten** (Standard günstiger) · **Verfügbarkeit** (Standard sofort, Individual nach Entwicklung) · **Passgenauigkeit** (Individual exakt an Abläufe angepasst) · Support/Updates (Standard vom Hersteller)
> Vertragsart: Standard = **Kaufvertrag** (bzw. Lizenz-/Abovertrag), Individual = **Werkvertrag** (1,5 P)

### S6.2 ★★ – Lizenzmodell wählen (6 Punkte)
📘 **Nachlernen:** [[S6 Software beschaffen und lizenzieren#Lizenzarten nach Zählweise|S6 › Lizenzarten nach Zählweise]]

Eine Konstruktionssoftware wird von 12 Mitarbeitenden gelegentlich genutzt, maximal 4 gleichzeitig. Named User: 900 €/Jahr, Concurrent: 2 100 €/Jahr.
a) Berechne die Kosten beider Modelle. b) Empfiehl ein Modell und nenne eine Voraussetzung.

> [!success]- Lösung
> a) Named: 12 × 900 = **10 800 €** · Concurrent: 4 × 2 100 = **8 400 €** (4 P)
> b) **Concurrent** (2 400 € günstiger); Voraussetzung: **Lizenzserver** im Netz, der die gleichzeitigen Nutzungen zählt; bei Spitzen evtl. eine Reservelizenz. (2 P)

### S6.3 ★ – Open Source (4 Punkte)
📘 **Nachlernen:** [[S6 Software beschaffen und lizenzieren#Open-Source-Lizenzen|S6 › Open-Source-Lizenzen]]

Die IT möchte ein Open-Source-Ticketsystem (GPL) einsetzen und selbst erweitern. Erkläre, was die GPL dabei bedeutet und ob die Erweiterung intern genutzt werden darf.

> [!success]- Lösung
> Die GPL erlaubt Nutzung, Veränderung und Weitergabe. **Copyleft:** Wer die veränderte Software **weitergibt**, muss sie unter der GPL mit Quellcode weitergeben. (2 P) Die **rein interne Nutzung** der Erweiterung ist ohne Veröffentlichung erlaubt, weil keine Weitergabe stattfindet. (2 P)

---

## S7 Datenbanken

> [!info] AP1-Priorität
> ER-Modell und Datenanomalien sind AP1-nah. SQL-Aufgaben sind optionale AP2-Vertiefung, da SQL laut AkA ausschließlich AP2 zugeordnet ist. [[Prüfung AP1]]

### S7.1 ★★ – ER-Modell für die Geräteausleihe (10 Punkte)
📘 **Nachlernen:** [[S7 Datenbanken#2. Das ER-Modell (Entity-Relationship)|S7 › Das ER-Modell]] · [[S7 Datenbanken#Kardinalitäten|S7 › Kardinalitäten]]

Die Weber OHG verleiht Geräte (Inventarnummer, Bezeichnung, Kaufdatum) an Mitarbeitende (Personalnummer, Name, Abteilung). Eine Person kann mehrere Geräte ausleihen und ein Gerät im Lauf der Zeit von verschiedenen Personen. Zu jeder Ausleihe werden Ausgabe- und Rückgabedatum gespeichert.
a) Erstelle ein ER-Modell in Chen-Notation mit Kardinalität. b) Begründe die Kardinalität mit zwei Sätzen. c) Wo gehören Ausgabe- und Rückgabedatum hin?

> [!success]- Lösung
> a) Entitätstypen **Mitarbeiter** (<u>PersNr</u>, Name, Abteilung) und **Gerät** (<u>InvNr</u>, Bezeichnung, Kaufdatum), Beziehung **leiht aus** (Raute), Kardinalität **n:m** (5 P: Symbole, Attribute, Schlüssel, Beziehung, Kardinalität)
> b) „Ein Mitarbeiter leiht **mehrere** Geräte aus.“ · „Ein Gerät wird (im Lauf der Zeit) von **mehreren** Mitarbeitern ausgeliehen.“ → n:m (2 P)
> c) An die **Beziehung** „leiht aus“ – sie beschreiben eine bestimmte Ausleihe, nicht die Person oder das Gerät allein (3 P).

### S7.2 ★★ – Tabellenmodell ableiten (8 Punkte)
📘 **Nachlernen:** [[S7 Datenbanken#3. Vom ER-Modell zu Tabellen (relationales Modell)|S7 › Vom ER-Modell zu Tabellen]]

Überführe das ER-Modell aus S7.1 in ein Tabellenmodell. Kennzeichne Primär- und Fremdschlüssel und erkläre, warum eine eigene Tabelle für die Ausleihe nötig ist.

> [!success]- Lösung
> - Mitarbeiter(<u>PersNr</u>, Name, Abteilung)
> - Geraet(<u>InvNr</u>, Bezeichnung, Kaufdatum)
> - Ausleihe(<u>AusleihNr</u>, ↑PersNr, ↑InvNr, Ausgabe, Rueckgabe) (6 P)
>
> Eine **n:m**-Beziehung lässt sich nicht mit einem einzelnen Fremdschlüssel abbilden: Ein Feld „PersNr“ in Geraet könnte nur **eine** Person speichern. Die Zwischentabelle nimmt beide Fremdschlüssel und die Beziehungsattribute auf. Weil dasselbe Gerät mehrfach von derselben Person geliehen werden kann, ist eine eigene AusleihNr als Primärschlüssel sinnvoll (2 P).

### S7.3 – AP2-Vertiefung: Redundanz erkennen und SQL (8 Punkte)
📘 **Nachlernen:** [[S7 Datenbanken#4. Redundanz, Anomalien und Normalisierung|S7 › Redundanz, Anomalien und Normalisierung]] · [[S7 Datenbanken#5. SQL-Grundlagen|S7 › SQL-Grundlagen]]

Die bisherige Excel-Liste hat die Spalten *InvNr, Bezeichnung, PersNr, Name, Abteilung, Ausgabe*.
a) Erkläre an diesem Beispiel zwei Anomalien. b) Schreibe eine SQL-Abfrage, die alle Geräte ausgibt, die noch nicht zurückgegeben wurden (Rückgabe leer), mit Name der Person, sortiert nach Ausgabedatum.

> [!success]- Lösung
> a) je 2 P: **Änderungsanomalie** – wechselt eine Person die Abteilung, muss das in allen ihren Zeilen geändert werden, sonst widersprüchliche Daten · **Löschanomalie** – löscht man die einzige Ausleihe eines Geräts, sind auch Bezeichnung und Inventardaten weg · **Einfügeanomalie** – ein neues Gerät kann erst gespeichert werden, wenn es jemand ausleiht
> b) (4 P)
> ```sql
> SELECT g.InvNr, g.Bezeichnung, m.Name, a.Ausgabe
> FROM Ausleihe a
> JOIN Geraet g ON g.InvNr = a.InvNr
> JOIN Mitarbeiter m ON m.PersNr = a.PersNr
> WHERE a.Rueckgabe IS NULL
> ORDER BY a.Ausgabe;
> ```

---

## S8 UML und Softwareentwurf

### S8.1 ★★ – Anwendungsfalldiagramm (8 Punkte)
📘 **Nachlernen:** [[S8 UML und Softwareentwurf#2. Anwendungsfalldiagramm (Use-Case-Diagramm)|S8 › Anwendungsfalldiagramm]]

Für die Geräteausleihe gilt: Mitarbeitende können Geräte **suchen** und **reservieren**. Beim Reservieren muss man sich immer **anmelden**. Die IT-Abteilung **gibt Geräte aus** und **nimmt sie zurück**; bei der Rücknahme kann optional ein **Schaden erfasst** werden. Auszubildende haben dieselben Möglichkeiten wie Mitarbeitende.
Erstelle das Anwendungsfalldiagramm.

> [!success]- Lösung
> - Systemgrenze „Geräteausleihe“, Akteure **Mitarbeiter:in** und **IT-Abteilung** außerhalb, **Auszubildende:r** mit Generalisierungspfeil (hohles Dreieck) zu Mitarbeiter:in (2 P)
> - Anwendungsfälle: Gerät suchen, Gerät reservieren, Anmelden, Gerät ausgeben, Gerät zurücknehmen, Schaden erfassen (2 P)
> - Assoziationen: Mitarbeiter:in – suchen, reservieren · IT – ausgeben, zurücknehmen (1 P)
> - **«include»** von „Gerät reservieren“ nach „Anmelden“ (1,5 P)
> - **«extend»** von „Schaden erfassen“ nach „Gerät zurücknehmen“ (1,5 P)

### S8.2 ★★ – Aktivitätsdiagramm (10 Punkte)
📘 **Nachlernen:** [[S8 UML und Softwareentwurf#3. Aktivitätsdiagramm|S8 › Aktivitätsdiagramm]]

Ablauf einer Geräterückgabe: Die IT prüft das Gerät. Ist es beschädigt, wird ein Schadensbericht erstellt und der Vorgesetzte informiert. Anschließend – oder direkt bei unbeschädigtem Gerät – werden **gleichzeitig** die Daten auf dem Gerät gelöscht und die Rückgabe im System gebucht. Danach ist der Vorgang abgeschlossen.
Zeichne das Aktivitätsdiagramm mit den Swimlanes „IT“ und „Vorgesetzte:r“.

> [!success]- Lösung
> Start ● → „Gerät prüfen“ (IT) → Raute mit **[beschädigt]** / **[nicht beschädigt]** (2 P)
> [beschädigt] → „Schadensbericht erstellen“ (IT) → „Schaden zur Kenntnis nehmen“ (Swimlane Vorgesetzte:r) → Zusammenführungs-Raute (2 P)
> [nicht beschädigt] → direkt zur Zusammenführung (1 P)
> → **Gabelungsbalken** → parallel „Daten löschen“ und „Rückgabe buchen“ → **Vereinigungsbalken** (3 P)
> → Ende ◉ (1 P) · Swimlanes korrekt, Aktionen mit Verben benannt (1 P)

### S8.3 ★ – Werkzeuge der Softwareentwicklung (6 Punkte)
📘 **Nachlernen:** [[S8 UML und Softwareentwurf#6. Vom Quelltext zum Programm – Werkzeuge|S8 › Vom Quelltext zum Programm – Werkzeuge]]

Für die Ausleihe soll ein kleines Python-Skript entstehen, das eine Web-API des Inventarsystems abfragt.
a) Erkläre, ob Python kompiliert oder interpretiert wird, und nenne einen Vor- und einen Nachteil. b) Erkläre die Begriffe API und Bibliothek am Beispiel.

> [!success]- Lösung
> a) Python wird **interpretiert** (genauer: zur Laufzeit in Bytecode übersetzt und ausgeführt) (1 P). Vorteil: schnell geschrieben und ausprobiert, plattformunabhängig (1 P). Nachteil: langsamer als kompilierte Programme, manche Fehler zeigen sich erst zur Laufzeit (1 P).
> b) **API:** die vom Inventarsystem festgelegte Schnittstelle (z. B. `GET /geraete?status=frei` liefert JSON), über die das Skript Daten abfragt, ohne die Datenbank direkt anzusprechen (1,5 P). **Bibliothek:** fertiger Code, den das Skript einbindet, z. B. eine HTTP-Bibliothek für die Anfragen oder eine Bibliothek zum Erzeugen von Excel-Dateien (1,5 P).

---

## S9 KI und Unternehmenssoftware

### S9.1 ★★ – KI in der Weber OHG (12 Punkte)
📘 **Nachlernen:** [[S9 KI und Unternehmenssoftware#2. Einsatzszenarien im Betrieb|S9 › Einsatzszenarien im Betrieb]] · [[S9 KI und Unternehmenssoftware#3. Chatbots – Vor- und Nachteile|S9 › Chatbots – Vor- und Nachteile]] · [[S9 KI und Unternehmenssoftware#4. Risiken und rechtlicher Rahmen|S9 › Risiken und rechtlicher Rahmen]]

Die Weber OHG möchte künstliche Intelligenz einsetzen.
a) Nenne zwei konkrete Einsatzszenarien für die Weber OHG. b) Die Geschäftsleitung erwägt einen Chatbot im Onlineshop. Erläutere je zwei Vor- und Nachteile. c) Einige Mitarbeitende haben Bedenken. Nenne zwei mögliche Bedenken und zwei Maßnahmen. d) Nenne zwei datenschutzrechtliche Anforderungen an den KI-Dienst.

> [!success]- Lösung
> a) je 1 P, max. 2 P: Chatbot nimmt außerhalb der Öffnungszeiten Anfragen und Werkstatttermine auf · Produktbeschreibungen für den Onlineshop entwerfen · eingehende E-Mails klassifizieren und an Werkstatt, Verkauf oder Buchhaltung weiterleiten · **Absatzprognose** für die Materialbeschaffung · Bilderkennung zur Qualitätskontrolle von Rahmen und Schweißnähten
> b) Vorteile (je 1 P): 24/7 erreichbar · entlastet den Verkauf bei Routinefragen (Lieferstatus, Öffnungszeiten) · Anfragen werden strukturiert erfasst. Nachteile (je 1 P): **Fehlauskünfte (Halluzinationen)**, z. B. zu Preisen oder Garantie · unpersönlich, Kundinnen und Kunden fühlen sich abgewimmelt · personenbezogene Daten in den Eingaben
> c) Bedenken (je 1 P): Arbeitsplatzverlust · Überwachung · Überforderung · Haftung bei Fehlern. Maßnahmen (je 1 P): früh und offen informieren · Betriebsrat einbinden · Schulungen · KI-Richtlinie · Pilotphase mit Freiwilligen
> d) je 1 P: Anbieter mit **Serverstandort EU** · **Auftragsverarbeitungsvertrag** · Eingaben werden **nicht zum Training** genutzt · keine Kundendaten in öffentliche Dienste · Transparenzhinweis für Nutzer (EU AI Act)

### S9.2 ★★ – Kosten und Nutzen (8 Punkte)
📘 **Nachlernen:** [[S9 KI und Unternehmenssoftware#5. Kosten eines KI-Dienstes berechnen|S9 › Kosten eines KI-Dienstes berechnen]]

Angebot für einen KI-Schreibassistenten: 18 Lizenzen zu je **24 € netto** im Monat, Einrichtung einmalig **900 € netto**. Jede Nutzerin spart geschätzt **3 Stunden** im Monat, der interne Stundensatz beträgt **38 €**.
a) Berechne die Kosten im ersten Jahr (netto). b) Berechne den geschätzten Nutzen im ersten Jahr. c) Beurteile das Ergebnis kurz.

> [!success]- Lösung
> a) 18 × 24 × 12 = 5 184 € + 900 € = **6 084 €** (3 P)
> b) 18 × 3 h × 38 € × 12 = **24 624 €** (3 P)
> c) Der rechnerische Nutzen übersteigt die Kosten deutlich. Einschränkungen: Die Zeitersparnis ist geschätzt, Ergebnisse müssen weiterhin geprüft werden, Schulungsaufwand und Datenschutzanforderungen kommen hinzu → Pilotphase mit Messung empfehlen. (2 P)

### S9.3 ★ – Unternehmenssoftware zuordnen (4 Punkte)
📘 **Nachlernen:** [[S9 KI und Unternehmenssoftware#6. Unternehmenssoftware|S9 › Unternehmenssoftware]]

Ordne zu: a) Kundenkontakte und Verkaufschancen verwalten · b) Einkauf, Lager, Rechnungswesen integriert steuern · c) Verträge revisionssicher ablegen · d) Lieferketten und Bestände planen

> [!success]- Lösung
> a) **CRM** · b) **ERP** · c) **DMS** · d) **SCM** (je 1 P)


Bereich: [[Übersicht Software]]
