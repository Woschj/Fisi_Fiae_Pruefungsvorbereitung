---
tags: [ap1/pruefung]
---
# Probeprüfung 3 – Pixelwerk GmbH

```dataviewjs
await dv.view("AP1/99 System/views/pruefung", { name: "Probeprüfung 3" })
```

> [!info] Ausgangssituation
> Die **Pixelwerk GmbH** (fiktiv) entwickelt Apps für Kunden. Zwölf neue Entwicklerinnen und Entwickler starten, außerdem betreibt Pixelwerk einen internen Git-Server und einen Support für Kunden-Apps. Sie arbeiten im IT-Team von Pixelwerk.
> **Bearbeitungszeit 90 Minuten · 4 Aufgaben à 25 Punkte · Hilfsmittel: Taschenrechner**

---

## Aufgabe 1 – Arbeitsplätze und Lizenzen (25 Punkte)

**a) (6 P)** Die Entwickler:innen arbeiten mit mehreren Containern und virtuellen Maschinen gleichzeitig. Nennen Sie drei Anforderungen an ihre Notebooks und begründen Sie sie.

> [!success]- Lösung a (je 2 P)
> - **32 GB RAM oder mehr** – jede VM/jeder Container belegt eigenen Arbeitsspeicher, sonst wird ausgelagert
> - **CPU mit vielen Kernen und Virtualisierungsunterstützung** (VT-x/AMD-V) – paralleles Kompilieren und VMs
> - **schnelle NVMe-SSD** mit ausreichender Kapazität (1 TB) – Images, Builds, viele kleine Dateien
> - **Thunderbolt/USB4** für Dockingstation mit zwei Monitoren
>
> 📘 **Nachlernen:** [[H1 PC-Komponenten und Arbeitsplatzgeräte#3. Arbeitsspeicher (RAM)|H1 › Arbeitsspeicher]] · [[H1 PC-Komponenten und Arbeitsplatzgeräte#2. Prozessor (CPU)|H1 › Prozessor]] · [[S5 Virtualisierung und Cloud#1. Virtualisierung|S5 › Virtualisierung]]

**b) (5 P)** Zur Wahl stehen zwei 27-Zoll-Monitore: WQHD (2560 × 1440) und 4K (3840 × 2160). Berechnen Sie beide Pixeldichten und nennen Sie einen Vorteil des 4K-Monitors für Entwickler:innen.

> [!success]- Lösung b
> WQHD: √(2560² + 1440²) ≈ 2 937,2 / 27 ≈ **108,8 ppi** · 4K: √(3840² + 2160²) = √19 411 200 ≈ 4 405,8 / 27 ≈ **163,2 ppi** (4 P)
> Vorteil: deutlich schärfere Schrift → angenehmeres Lesen von Code bei Skalierung. (1 P)
>
> 📘 **Nachlernen:** [[H1 PC-Komponenten und Arbeitsplatzgeräte#7. Monitor|H1 › Monitor]]

**c) (8 P)** Die Entwicklungsumgebung kostet als Named-User-Lizenz 690 €/Jahr, als Concurrent-Lizenz 1 450 €/Jahr. Alle 12 Entwickler:innen arbeiten täglich, meist gleichzeitig mindestens 10.
1. Berechnen Sie beide Varianten und empfehlen Sie eine. 2. Ein Entwickler möchte eine GPL-lizenzierte Bibliothek in eine App einbauen, die an Kunden verkauft wird. Erläutern Sie das Risiko und eine Alternative.

> [!success]- Lösung c
> 1. Named: 12 × 690 = **8 280 €** · Concurrent: 10 × 1 450 = **14 500 €** → **Named User**, weil fast alle gleichzeitig arbeiten. (4 P)
> 2. **GPL = Copyleft**: Wird die App mit der Bibliothek **weitergegeben**, muss sie ebenfalls unter der GPL mit Quellcode weitergegeben werden – das widerspricht dem Verkauf als geschlossenes Produkt. Alternative: Bibliothek mit **permissiver Lizenz** (MIT, Apache 2.0) oder kommerzielle Lizenz des Herstellers. (4 P)
>
> 📘 **Nachlernen:** [[S6 Software beschaffen und lizenzieren#Lizenzarten nach Zählweise|S6 › Lizenzarten nach Zählweise]] · [[S6 Software beschaffen und lizenzieren#Open-Source-Lizenzen|S6 › Open-Source-Lizenzen]]

**d) (6 P)** Die Geschäftsleitung möchte allen 12 Entwickler:innen einen KI-Programmierassistenten für **19 € netto je Person und Monat** bereitstellen.
1. Berechnen Sie die jährlichen Kosten (netto).
2. Nennen Sie zwei Chancen und zwei Risiken des Einsatzes in der Softwareentwicklung bei Pixelwerk.

> [!success]- Lösung d
> 1. 12 × 19 € × 12 Monate = **2 736 €** netto pro Jahr (2 P)
> 2. Chancen (je 1 P, max. 2 P): Routinecode, Tests und Dokumentation schneller erstellen · fremden Code erklären lassen, schnellere Einarbeitung der neuen Entwickler:innen · Fehlerhinweise und Refactoring-Vorschläge.
> Risiken (je 1 P, max. 2 P): **fehlerhafter oder unsicherer Code** (Halluzinationen) → Code-Review bleibt Pflicht · **Kundenquellcode** und Zugangsdaten gelangen zum Anbieter → Vertrag/AVV, keine Nutzung zum Training, Serverstandort prüfen · ungeklärte **Urheber- und Lizenzfragen** bei generiertem Code · Abhängigkeit vom Anbieter und Kompetenzverlust.
>
> 📘 **Nachlernen:** [[S9 KI und Unternehmenssoftware#4. Risiken und rechtlicher Rahmen|S9 › Risiken und rechtlicher Rahmen]] · [[S9 KI und Unternehmenssoftware#5. Kosten eines KI-Dienstes berechnen|S9 › Kosten eines KI-Dienstes berechnen]]

---

## Aufgabe 2 – Netzwerk (25 Punkte)

**a) (8 P)** Ein Testserver hat die Adresse `172.16.93.77/20`. Bestimmen Sie Subnetzmaske, Netzadresse, Broadcast, Hostbereich und Anzahl der Hosts.

> [!success]- Lösung a
> Maske **255.255.240.0**; Blockgröße im 3. Oktett 16 → 93 liegt im Block ab **80** → Netz **172.16.80.0**, Broadcast **172.16.95.255**, Hosts **172.16.80.1 – 172.16.95.254**, 2¹² − 2 = **4 094**. (je Wert 1,5 P, gerundet)
>
> 📘 **Nachlernen:** [[N2 IPv4 und Subnetting#3. Die Blockgrößen-Methode (ohne Binärrechnung)|N2 › Die Blockgrößen-Methode]]

**b) (5 P)** Test-VMs auf einem Virtualisierungshost sollen in einem eigenen VLAN (ID 30) laufen, die Verwaltungsschnittstelle des Hosts im VLAN 10. Beschreiben Sie, wie der Switchport des Hosts konfiguriert werden muss und warum.

> [!success]- Lösung b
> Der Port wird als **Trunk-Port** (IEEE 802.1Q) konfiguriert, der **VLAN 10 und 30 getaggt** transportiert; der virtuelle Switch des Hypervisors ordnet die VMs anhand der VLAN-ID zu. Ein Access-Port könnte nur ein VLAN übertragen. (5 P)
>
> 📘 **Nachlernen:** [[N5 Verkabelung und Netzwerkkomponenten#VLAN (IEEE 802.1Q)|N5 › VLAN]] · [[S5 Virtualisierung und Cloud#1. Virtualisierung|S5 › Virtualisierung]]

**c) (6 P)** Pixelwerk hat das IPv6-Präfix `2001:db8:77::/48`.
1. Geben Sie das /64-Präfix für VLAN 30 an, wenn die VLAN-ID hexadezimal im 4. Block steht. 2. Kürzen Sie regelkonform: `2001:0db8:0077:001e:0000:0000:0000:0a0b`.

> [!success]- Lösung c
> 1. 30 = 0x1e → **`2001:db8:77:1e::/64`** (3 P)
> 2. **`2001:db8:77:1e::a0b`** (3 P)
>
> 📘 **Nachlernen:** [[N3 IPv6#5. Subnetting mit IPv6|N3 › Subnetting mit IPv6]] · [[N3 IPv6#2. Kürzen und Ausschreiben|N3 › Kürzen und Ausschreiben]]

**d) (6 P)** Die Entwickler:innen greifen per Git über SSH auf den internen Server zu. Nennen Sie den Port und erklären Sie, wie die Anmeldung mit einem SSH-Schlüsselpaar funktioniert und warum sie sicherer ist als ein Passwort.

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

**b) (6 P)** Folgende Tickets gehen gleichzeitig ein: (1) Build-Server für alle Teams ausgefallen, Release morgen · (2) neue Maus für einen Entwickler · (3) Kunde meldet Absturz der App bei einer Funktion, Workaround bekannt · (4) VPN für eine Person im Homeoffice fällt aus, sie kann ins Büro kommen. Legen Sie Prioritäten fest und begründen Sie mit Auswirkung und Dringlichkeit.

> [!success]- Lösung b
> (1) **Prio 1** – alle Teams betroffen, dringend (Release) · (3) **Prio 2/3** – Kundenauswirkung, aber Workaround · (4) **Prio 3** – eine Person, Ausweichmöglichkeit · (2) **Prio 4** – Service Request, planbar. (je 1,5 P)
>
> 📘 **Nachlernen:** [[P3 IT-Service, Support und Qualität#3. Priorisierung|P3 › Priorisierung]]

**c) (7 P)** Ein Kunde ruft an: „Ihre App stürzt ständig ab, das kann doch nicht sein!“
1. Analysieren Sie die Aussage mit dem Vier-Seiten-Modell. 2. Formulieren Sie zwei Fragen zur weiteren Klärung und benennen Sie ihren Typ.

> [!success]- Lösung c
> 1. **Sachinhalt:** Die App stürzt häufig ab. **Selbstoffenbarung:** Ich bin verärgert/frustriert. **Beziehung:** Ihr liefert schlechte Qualität. **Appell:** Behebt den Fehler schnell! (4 P)
> 2. z. B. „Bei welcher Funktion bzw. in welcher Situation stürzt die App ab?“ (**offene Frage**) · „Tritt das seit dem letzten Update auf?“ (**geschlossene Frage**) · „Habe ich richtig verstanden, dass …?“ (**Kontrollfrage**) (je 1,5 P)
>
> 📘 **Nachlernen:** [[P4 Kommunikation und Kundenberatung#Vier-Seiten-Modell (Schulz von Thun)|P4 › Vier-Seiten-Modell]] · [[P4 Kommunikation und Kundenberatung#Fragetechniken („Wer fragt, der führt“)|P4 › Fragetechniken]]

**d) (6 P)** Nach der Fehlerbehebung soll verhindert werden, dass alte Fehler zurückkehren. Erklären Sie die Begriffe **Unit-Test** und **Regressionstest** und ordnen Sie die Teststufen der Testpyramide.

> [!success]- Lösung d
> **Unit-Test:** prüft einzelne Funktionen isoliert, automatisiert und schnell. **Regressionstest:** nach jeder Änderung werden die vorhandenen Tests erneut ausgeführt, um ungewollte Auswirkungen zu erkennen. (4 P)
> Pyramide von unten nach oben: **Unit-Tests (viele, günstig) → Integrationstests → Systemtests → (Abnahmetests)**. (2 P)
>
> 📘 **Nachlernen:** [[S3 Algorithmen, Darstellung und Testen#Teststufen und Testpyramide|S3 › Teststufen und Testpyramide]]

---

## Aufgabe 4 – Programmlogik und Rechnen (25 Punkte)

**a) (6 P)** Im Hex-Dump einer Datei steht das Byte `B7`.
1. Welchen Wert hat es dezimal (vorzeichenlos) und binär? 2. Welchen Wert hat es als 8-Bit-Zweierkomplement? 3. Stellen Sie −73 als 8-Bit-Zweierkomplement dar.

> [!success]- Lösung a
> 1. 0xB7 = 11·16 + 7 = **183**, binär **1011 0111** (2 P)
> 2. 183 − 256 = **−73** (2 P)
> 3. 73 = 0100 1001 → invertiert 1011 0110 → +1 = **1011 0111** – dasselbe Bitmuster wie in 1. (2 P)
>
> 📘 **Nachlernen:** [[S1 Zahlensysteme und Codierung#Binär ↔ Hex – in 4er-Gruppen (Nibbles)|S1 › Binär ↔ Hex – in 4er-Gruppen]] · [[S1 Zahlensysteme und Codierung#3. Negative Zahlen – Zweierkomplement|S1 › Negative Zahlen – Zweierkomplement]]

**b) (8 P)** Schreiben Sie eine Funktion `istSicher(pw)`, die **wahr** liefert, wenn das Passwort mindestens **12 Zeichen**, mindestens **eine Ziffer** und mindestens **einen Großbuchstaben** enthält. Die Hilfsfunktionen `istZiffer(z)` und `istGross(z)` stehen zur Verfügung.

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

**c) (6 P)** Führen Sie einen Schreibtischtest durch und beschreiben Sie, was der Algorithmus berechnet.
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

**d) (5 P)** Der Support für Kunden-Apps läuft so ab: Eine Kundin meldet einen Fehler über das Webformular. Der First-Level-Support prüft, ob es sich um einen bekannten Fehler handelt. Ist das der Fall, sendet er der Kundin die dokumentierte Lösung. Andernfalls übergibt er das Ticket an die Entwicklung, die den Fehler behebt und ein Update bereitstellt; danach informiert der Support die Kundin. Stellen Sie den Prozess als **BPMN-Diagramm** mit den Lanes *Support* und *Entwicklung* dar.

> [!success]- Lösung d
> ```mermaid
> flowchart LR
>     subgraph Support
>         S((Fehlermeldung eingegangen)) --> P(Fehler prüfen)
>         P --> G{X bekannt?}
>         G -- ja --> L(Lösung senden)
>         I(Kundin informieren)
>         L --> E(((Ticket geschlossen)))
>         I --> E
>     end
>     subgraph Entwicklung
>         B(Fehler beheben) --> U(Update bereitstellen)
>     end
>     G -- nein --> B
>     U --> I
> ```
> BPMN-Elemente: **Pool/Lanes** für Support und Entwicklung · **Startereignis** (dünner Kreis) · **Aktivitäten** (abgerundete Rechtecke) · **exklusives Gateway** (Raute mit X) mit beschrifteten Ausgängen · **Sequenzflüsse** zwischen den Lanes · **Endereignis** (dicker Kreis). Ein Zusammenführungs-Gateway vor dem Endereignis ist ebenfalls richtig.
>
> **Bewertung:** (Lanes 1 P, Start- und Endereignis 1 P, Aktivitäten 1 P, Gateway mit Bedingungen 2 P)
>
> 📘 **Nachlernen:** [[S8 UML und Softwareentwurf#8. Geschäftsprozesse mit BPMN|S8 › Geschäftsprozesse mit BPMN]]

---
Ergebnis oben im Widget eintragen · Fehler ins [[Fehlerlog]] · zurück zum [[Start]]
