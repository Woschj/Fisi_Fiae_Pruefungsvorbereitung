---
tags: [ap1/pruefung]
---
# Probeprüfung 3 – Pixelwerk GmbH

```dataviewjs
await dv.view("99 System/views/pruefung", { name: "Probeprüfung 3" })
```

> [!info] Ausgangssituation
> Die **Pixelwerk GmbH** (fiktiv) entwickelt Apps für Kunden. Zwölf neue Entwicklerinnen und Entwickler starten, außerdem betreibt Pixelwerk einen internen Git-Server und einen Support für Kunden-Apps. Du arbeitest im IT-Team von Pixelwerk.
> **Bearbeitungszeit 90 Minuten · 4 Aufgaben à 25 Punkte · Hilfsmittel: Taschenrechner**

---

## Aufgabe 1 – Arbeitsplätze und Lizenzen (25 Punkte)

**a) (6 P)** Die Entwickler:innen arbeiten mit mehreren Containern und virtuellen Maschinen gleichzeitig. Nenne drei Anforderungen an ihre Notebooks und begründe sie.

> [!success]- Lösung a (je 2 P)
> - **32 GB RAM oder mehr** – jede VM/jeder Container belegt eigenen Arbeitsspeicher, sonst wird ausgelagert
> - **CPU mit vielen Kernen und Virtualisierungsunterstützung** (VT-x/AMD-V) – paralleles Kompilieren und VMs
> - **schnelle NVMe-SSD** mit ausreichender Kapazität (1 TB) – Images, Builds, viele kleine Dateien
> - **Thunderbolt/USB4** für Dockingstation mit zwei Monitoren
>
> 📘 **Nachlernen:** [[H1 PC-Komponenten und Arbeitsplatzgeräte#3. Arbeitsspeicher (RAM)|H1 › Arbeitsspeicher]] · [[H1 PC-Komponenten und Arbeitsplatzgeräte#2. Prozessor (CPU)|H1 › Prozessor]] · [[S5 Virtualisierung und Cloud#1. Virtualisierung|S5 › Virtualisierung]]

**b) (5 P)** Zur Wahl stehen zwei 27-Zoll-Monitore: WQHD (2560 × 1440) und 4K (3840 × 2160). Berechne beide Pixeldichten und nenne einen Vorteil des 4K-Monitors für Entwickler:innen.

> [!success]- Lösung b
> WQHD: √(2560² + 1440²) ≈ 2 937,2 / 27 ≈ **108,8 ppi** · 4K: √(3840² + 2160²) = √19 411 200 ≈ 4 405,8 / 27 ≈ **163,2 ppi** (4 P)
> Vorteil: deutlich schärfere Schrift → angenehmeres Lesen von Code bei Skalierung. (1 P)
>
> 📘 **Nachlernen:** [[H1 PC-Komponenten und Arbeitsplatzgeräte#7. Monitor|H1 › Monitor]]

**c) (8 P)** Die Entwicklungsumgebung kostet als Named-User-Lizenz 690 €/Jahr, als Concurrent-Lizenz 1 450 €/Jahr. Alle 12 Entwickler:innen arbeiten täglich, meist gleichzeitig mindestens 10.
1. Berechne beide Varianten und empfiehl eine. 2. Ein Entwickler möchte eine GPL-lizenzierte Bibliothek in eine App einbauen, die an Kunden verkauft wird. Erläutere das Risiko und eine Alternative.

> [!success]- Lösung c
> 1. Named: 12 × 690 = **8 280 €** · Concurrent: 10 × 1 450 = **14 500 €** → **Named User**, weil fast alle gleichzeitig arbeiten. (4 P)
> 2. **GPL = Copyleft**: Wird die App mit der Bibliothek **weitergegeben**, muss sie ebenfalls unter der GPL mit Quellcode weitergegeben werden – das widerspricht dem Verkauf als geschlossenes Produkt. Alternative: Bibliothek mit **permissiver Lizenz** (MIT, Apache 2.0) oder kommerzielle Lizenz des Herstellers. (4 P)
>
> 📘 **Nachlernen:** [[S6 Software beschaffen und lizenzieren#Lizenzarten nach Zählweise|S6 › Lizenzarten nach Zählweise]] · [[S6 Software beschaffen und lizenzieren#Open-Source-Lizenzen|S6 › Open-Source-Lizenzen]]

**d) (6 P)** Notebooks: Kauf 1 850 € je Gerät plus 150 € Garantieverlängerung auf 3 Jahre, oder Leasing 58 €/Monat je Gerät über 36 Monate inkl. Service. Vergleiche die Kosten für alle 12 Geräte und nenne zwei qualitative Argumente.

> [!success]- Lösung d
> Kauf: 12 × (1 850 + 150) = **24 000 €** · Leasing: 12 × 58 × 36 = **25 056 €** → Kauf **1 056 €** günstiger. (4 P)
> Qualitativ (je 1 P): Leasing schont die Liquidität und ermöglicht nach 3 Jahren aktuelle Geräte; Kauf bedeutet Eigentum und Weiterverwendung nach Laufzeitende.
>
> 📘 **Nachlernen:** [[W3 Investition und Finanzierung#2. Kauf, Leasing, Miete|W3 › Kauf, Leasing, Miete]]

---

## Aufgabe 2 – Netzwerk (25 Punkte)

**a) (8 P)** Ein Testserver hat die Adresse `172.16.93.77/20`. Bestimme Subnetzmaske, Netzadresse, Broadcast, Hostbereich und Anzahl der Hosts.

> [!success]- Lösung a
> Maske **255.255.240.0**; Blockgröße im 3. Oktett 16 → 93 liegt im Block ab **80** → Netz **172.16.80.0**, Broadcast **172.16.95.255**, Hosts **172.16.80.1 – 172.16.95.254**, 2¹² − 2 = **4 094**. (je Wert 1,5 P, gerundet)
>
> 📘 **Nachlernen:** [[N2 IPv4 und Subnetting#3. Die Blockgrößen-Methode (ohne Binärrechnung)|N2 › Die Blockgrößen-Methode]]

**b) (5 P)** Test-VMs auf einem Virtualisierungshost sollen in einem eigenen VLAN (ID 30) laufen, die Verwaltungsschnittstelle des Hosts im VLAN 10. Beschreibe, wie der Switchport des Hosts konfiguriert werden muss und warum.

> [!success]- Lösung b
> Der Port wird als **Trunk-Port** (IEEE 802.1Q) konfiguriert, der **VLAN 10 und 30 getaggt** transportiert; der virtuelle Switch des Hypervisors ordnet die VMs anhand der VLAN-ID zu. Ein Access-Port könnte nur ein VLAN übertragen. (5 P)
>
> 📘 **Nachlernen:** [[N5 Verkabelung und Netzwerkkomponenten#VLAN (IEEE 802.1Q)|N5 › VLAN]] · [[S5 Virtualisierung und Cloud#1. Virtualisierung|S5 › Virtualisierung]]

**c) (6 P)** Pixelwerk hat das IPv6-Präfix `2001:db8:77::/48`.
1. Gib das /64-Präfix für VLAN 30 an, wenn die VLAN-ID hexadezimal im 4. Block steht. 2. Kürze regelkonform: `2001:0db8:0077:001e:0000:0000:0000:0a0b`.

> [!success]- Lösung c
> 1. 30 = 0x1e → **`2001:db8:77:1e::/64`** (3 P)
> 2. **`2001:db8:77:1e::a0b`** (3 P)
>
> 📘 **Nachlernen:** [[N3 IPv6#5. Subnetting mit IPv6|N3 › Subnetting mit IPv6]] · [[N3 IPv6#2. Kürzen und Ausschreiben|N3 › Kürzen und Ausschreiben]]

**d) (6 P)** Die Entwickler:innen greifen per Git über SSH auf den internen Server zu. Nenne den Port und erkläre, wie die Anmeldung mit einem SSH-Schlüsselpaar funktioniert und warum sie sicherer ist als ein Passwort.

> [!success]- Lösung d
> **Port 22** (1 P). Der Nutzer erzeugt ein **Schlüsselpaar**; der **öffentliche Schlüssel** wird auf dem Server hinterlegt, der **private** bleibt auf dem Notebook (mit Passphrase). Bei der Anmeldung beweist der Client mit seinem privaten Schlüssel (Signatur einer Herausforderung), dass er ihn besitzt – der private Schlüssel verlässt das Gerät nie. (3 P) Sicherer, weil kein Passwort übertragen/erraten werden kann (Brute Force, Phishing) und Schlüssel einzeln widerrufbar sind. (2 P)
>
> 📘 **Nachlernen:** [[N4 Netzwerkdienste und Protokolle#5. Wichtige Ports|N4 › Wichtige Ports]] · [[I4 Kryptografie#3. Asymmetrische Verschlüsselung (Public-Key-Verfahren)|I4 › Asymmetrische Verschlüsselung]]

---

## Aufgabe 3 – Service, Qualität und Kommunikation (25 Punkte)

**a) (6 P)** Für den Git-Server gilt intern eine Verfügbarkeit von **99,8 %** in der Servicezeit Mo–Fr 8–18 Uhr (Monat mit 22 Arbeitstagen). Im März fiel der Server insgesamt **50 Minuten** aus. Wurde die Zusage eingehalten?

> [!success]- Lösung a
> Servicezeit 22 × 10 h = **220 h**; erlaubt 220 × 0,002 = 0,44 h = **26,4 min** (3 P)
> Ausfall 50 min → Verfügbarkeit (220 − 0,833) / 220 = **99,62 %** → **nicht eingehalten**. (3 P)
>
> 📘 **Nachlernen:** [[P3 IT-Service, Support und Qualität#Verfügbarkeit berechnen|P3 › Verfügbarkeit berechnen]]

**b) (6 P)** Folgende Tickets gehen gleichzeitig ein: (1) Build-Server für alle Teams ausgefallen, Release morgen · (2) neue Maus für einen Entwickler · (3) Kunde meldet Absturz der App bei einer Funktion, Workaround bekannt · (4) VPN für eine Person im Homeoffice fällt aus, sie kann ins Büro kommen. Lege Prioritäten fest und begründe mit Auswirkung und Dringlichkeit.

> [!success]- Lösung b
> (1) **Prio 1** – alle Teams betroffen, dringend (Release) · (3) **Prio 2/3** – Kundenauswirkung, aber Workaround · (4) **Prio 3** – eine Person, Ausweichmöglichkeit · (2) **Prio 4** – Service Request, planbar. (je 1,5 P)
>
> 📘 **Nachlernen:** [[P3 IT-Service, Support und Qualität#3. Priorisierung|P3 › Priorisierung]]

**c) (7 P)** Ein Kunde ruft an: „Ihre App stürzt ständig ab, das kann doch nicht sein!“
1. Analysiere die Aussage mit dem Vier-Seiten-Modell. 2. Formuliere zwei Fragen zur weiteren Klärung und benenne ihren Typ.

> [!success]- Lösung c
> 1. **Sachinhalt:** Die App stürzt häufig ab. **Selbstoffenbarung:** Ich bin verärgert/frustriert. **Beziehung:** Ihr liefert schlechte Qualität. **Appell:** Behebt den Fehler schnell! (4 P)
> 2. z. B. „Bei welcher Funktion bzw. in welcher Situation stürzt die App ab?“ (**offene Frage**) · „Tritt das seit dem letzten Update auf?“ (**geschlossene Frage**) · „Habe ich richtig verstanden, dass …?“ (**Kontrollfrage**) (je 1,5 P)
>
> 📘 **Nachlernen:** [[P4 Kommunikation und Kundenberatung#Vier-Seiten-Modell (Schulz von Thun)|P4 › Vier-Seiten-Modell]] · [[P4 Kommunikation und Kundenberatung#Fragetechniken („Wer fragt, der führt“)|P4 › Fragetechniken]]

**d) (6 P)** Nach der Fehlerbehebung soll verhindert werden, dass alte Fehler zurückkehren. Erkläre die Begriffe **Unit-Test** und **Regressionstest** und ordne die Teststufen der Testpyramide.

> [!success]- Lösung d
> **Unit-Test:** prüft einzelne Funktionen isoliert, automatisiert und schnell. **Regressionstest:** nach jeder Änderung werden die vorhandenen Tests erneut ausgeführt, um ungewollte Auswirkungen zu erkennen. (4 P)
> Pyramide von unten nach oben: **Unit-Tests (viele, günstig) → Integrationstests → Systemtests → (Abnahmetests)**. (2 P)
>
> 📘 **Nachlernen:** [[S3 Algorithmen, Darstellung und Testen#Teststufen und Testpyramide|S3 › Teststufen und Testpyramide]]

---

## Aufgabe 4 – Programmlogik und Rechnen (25 Punkte)

**a) (6 P)** Im Hex-Dump einer Datei steht das Byte `B7`.
1. Welchen Wert hat es dezimal (vorzeichenlos) und binär? 2. Welchen Wert hat es als 8-Bit-Zweierkomplement? 3. Stelle −73 als 8-Bit-Zweierkomplement dar.

> [!success]- Lösung a
> 1. 0xB7 = 11·16 + 7 = **183**, binär **1011 0111** (2 P)
> 2. 183 − 256 = **−73** (2 P)
> 3. 73 = 0100 1001 → invertiert 1011 0110 → +1 = **1011 0111** – dasselbe Bitmuster wie in 1. (2 P)
>
> 📘 **Nachlernen:** [[S1 Zahlensysteme und Codierung#Binär ↔ Hex – in 4er-Gruppen (Nibbles)|S1 › Binär ↔ Hex – in 4er-Gruppen]] · [[S1 Zahlensysteme und Codierung#3. Negative Zahlen – Zweierkomplement|S1 › Negative Zahlen – Zweierkomplement]]

**b) (8 P)** Schreibe eine Funktion `istSicher(pw)`, die **wahr** liefert, wenn das Passwort mindestens **12 Zeichen**, mindestens **eine Ziffer** und mindestens **einen Großbuchstaben** enthält. Die Hilfsfunktionen `istZiffer(z)` und `istGross(z)` stehen zur Verfügung.

> [!success]- Lösung b
> ```text
> FUNKTION istSicher(pw : Text) : Boolean
>     WENN länge(pw) < 12 DANN
>         RÜCKGABE falsch
>     ENDE WENN
>     hatZiffer ← falsch
>     hatGross ← falsch
>     FÜR i ← 0 BIS länge(pw) − 1
>         WENN istZiffer(pw[i]) DANN
>             hatZiffer ← wahr
>         ENDE WENN
>         WENN istGross(pw[i]) DANN
>             hatGross ← wahr
>         ENDE WENN
>     ENDE FÜR
>     RÜCKGABE hatZiffer UND hatGross
> ENDE FUNKTION
> ```
> Längenprüfung (2 P), Initialisierung der Merker (2 P), Schleife und Prüfungen (3 P), korrekte Rückgabe (1 P)
>
> 📘 **Nachlernen:** [[S2 Programmierung – Grundlagen#6. Funktionen|S2 › Funktionen]] · [[I5 Bedrohungen und Schutzmaßnahmen#Passwortrichtlinie (nach BSI-Empfehlungen)|I5 › Passwortrichtlinie]]

**c) (6 P)** Führe einen Schreibtischtest durch und beschreibe, was der Algorithmus berechnet.
```text
n ← 37
bits ← ""
SOLANGE n > 0
    bits ← text(n MOD 2) + bits
    n ← n DIV 2
ENDE SOLANGE
ausgabe(bits)
```

> [!success]- Lösung c
> | n (vorher) | n MOD 2 | bits | n (nachher) |
> |---|---|---|---|
> | 37 | 1 | 1 | 18 |
> | 18 | 0 | 01 | 9 |
> | 9 | 1 | 101 | 4 |
> | 4 | 0 | 0101 | 2 |
> | 2 | 0 | 00101 | 1 |
> | 1 | 1 | 100101 | 0 |
> Ausgabe **100101** – die **Umwandlung einer Dezimalzahl in eine Binärzahl** (Restwertmethode). (Tabelle 4 P, Erklärung 2 P)
>
> 📘 **Nachlernen:** [[S3 Algorithmen, Darstellung und Testen#2. Schreibtischtest (Trace-Tabelle)|S3 › Schreibtischtest]] · [[S1 Zahlensysteme und Codierung#Dezimal → Binär|S1 › Dezimal → Binär]]

**d) (5 P)** Ein Container-Image von **3,5 GiB** wird über eine 250-Mbit/s-Leitung übertragen, effektiv stehen **80 %** zur Verfügung. Wie lange dauert die Übertragung?

> [!success]- Lösung d
> 3,5 × 2³⁰ B × 8 = 30 064 771 072 Bit · effektive Rate 250 × 10⁶ × 0,8 = 200 · 10⁶ Bit/s → **150,3 s ≈ 2 min 30 s** (5 P)
>
> 📘 **Nachlernen:** [[H3 Datenmengen und Übertragung#3. Übertragungsdauer|H3 › Übertragungsdauer]]

---
Ergebnis oben im Widget eintragen · Fehler ins [[Fehlerlog]] · zurück zum [[Start]]
