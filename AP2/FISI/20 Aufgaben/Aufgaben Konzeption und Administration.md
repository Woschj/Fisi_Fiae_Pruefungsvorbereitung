---
bereich: Konzeption und Administration
tags: [ap2/aufgaben, ap2/fisi]
---
# Aufgaben Konzeption und Administration

Aufgaben im Stil der AP2 „Konzeption und Administration von IT-Systemen“ mit Punkten und Musterlösung – eigene Aufgaben, die sich an den Aufgabentypen der AP2-Aufgaben orientieren. Schwierigkeit: ★ Einstieg · ★★ Prüfungsniveau · ★★★ anspruchsvoll.
**So arbeitest du:** Zeit stoppen (≈ 0,9 Minuten pro Punkt – 90 min für 100 Punkte), schriftlich lösen, dann Lösung aufklappen und selbst bewerten. Fehler → [[AP2 FISI Fehlerlog]].
Unbegrenzte Rechenaufgaben: [[AP2 FISI Trainer]] · Probeprüfungen: [[AP2/FISI/20 Aufgaben/Pruefungen/Uebersicht FISI AP2|Probeprüfungen]].

> [!info] Ausgangssituation für alle Aufgaben
> Die **Brenner Logistik GmbH** (fiktiv, 180 Mitarbeitende, Zentrale in Dortmund, Lager in Hamm) erneuert ihre Serverlandschaft. Du bist Auszubildende:r in der IT-Abteilung und bereitest Entscheidungen vor.

---

## FISI-1 Server, Virtualisierung und Container

### K1.1 ★★ – Netzteil dimensionieren (6 Punkte)
📘 **Nachlernen:** [[FISI-1 Server, Virtualisierung und Container#Netzteil dimensionieren|FISI-1 › Netzteil dimensionieren]]

Der neue Virtualisierungshost enthält: 2 CPUs mit je 165 W TDP, 16 RAM-Module mit je 5 W, 8 SSDs mit je 9 W, Mainboard 60 W, 2 Netzwerkkarten mit je 15 W und Lüfter mit zusammen 40 W.
a) Berechne die Gesamtleistung. b) Wähle mit 25 % Reserve ein Netzteil aus 550 W, 750 W, 800 W und 1 100 W. c) Wie sollte das Netzteil für Hochverfügbarkeit ausgelegt sein?

> [!success]- Lösung
> a) 2·165 + 16·5 + 8·9 + 60 + 2·15 + 40 = 330 + 80 + 72 + 60 + 30 + 40 = **612 W** (2 P)
> b) 612 W · 1,25 = 765 W → **800 W** (750 W reicht nicht) (2 P)
> c) **Redundant (1+1)**: zwei Hot-Swap-Netzteile mit je 800 W, idealerweise an zwei getrennten Stromkreisen/USVs. Fällt eines aus, trägt das andere die volle Last. (2 P)

### K1.2 ★★ – Stromkosten durch Konsolidierung (5 Punkte)
📘 **Nachlernen:** [[FISI-1 Server, Virtualisierung und Container#Energiekosten|FISI-1 › Energiekosten]]

Bisher laufen drei physische Server mit durchschnittlich je 450 W rund um die Uhr. Sie sollen durch einen Host mit durchschnittlich 620 W ersetzt werden. Strompreis: 0,30 €/kWh. Berechne die jährliche Ersparnis (365 Tage).

> [!success]- Lösung
> - Alt: 3 · 0,45 kW · 8 760 h = 11 826 kWh → 11 826 · 0,30 € = **3 547,80 €** (2 P)
> - Neu: 0,62 kW · 8 760 h = 5 431,2 kWh → **1 629,36 €** (2 P)
> - Ersparnis: **1 918,44 € pro Jahr** (1 P) – ohne die zusätzlich gesparte Klimatisierung.

### K1.3 ★ – Hypervisor-Typen (4 Punkte)
📘 **Nachlernen:** [[FISI-1 Server, Virtualisierung und Container#Hypervisor Typ 1 und Typ 2|FISI-1 › Hypervisor Typ 1 und Typ 2]]

Erkläre den Unterschied zwischen Hypervisor Typ 1 und Typ 2 und nenne jeweils ein Einsatzgebiet.

> [!success]- Lösung
> - **Typ 1 (Bare Metal):** läuft direkt auf der Hardware, ohne Wirtsbetriebssystem – wenig Overhead, hohe Stabilität. Einsatz: Rechenzentrum/Serverbetrieb (z. B. ESXi, Hyper-V Server, Proxmox). (2 P)
> - **Typ 2 (Hosted):** läuft als Anwendung auf einem Wirtsbetriebssystem – einfacher einzurichten, aber langsamer. Einsatz: Test- und Schulungsumgebungen auf dem Arbeitsplatz (z. B. VirtualBox, VMware Workstation). (2 P)

### K1.4 ★★ – Container oder virtuelle Maschine (6 Punkte)
📘 **Nachlernen:** [[FISI-1 Server, Virtualisierung und Container#3. Container|FISI-1 › Container]]

Die Entwicklungsabteilung möchte ihre Webanwendung künftig in Containern betreiben. Nenne zwei Vorteile von Containern gegenüber VMs, einen Nachteil und erkläre, warum trotzdem oft beide Techniken kombiniert werden.

> [!success]- Lösung
> - **Vorteile:** geringer Ressourcenbedarf, da sich Container den Kernel des Hosts teilen; Start in Sekunden; identische Umgebung von Entwicklung bis Produktion (Image) – je 2 P, zwei davon
> - **Nachteil:** schwächere Isolation (gemeinsamer Kernel), Container brauchen dasselbe Betriebssystem wie der Host (1 P)
> - **Kombination:** Container laufen häufig **in VMs** – die VM liefert starke Isolation, Snapshot und Live-Migration, die Container liefern schnelle, portable Anwendungen. (1 P)

### K1.5 ★★ – Load Balancing (4 Punkte)
📘 **Nachlernen:** [[FISI-1 Server, Virtualisierung und Container#Load Balancing|FISI-1 › Load Balancing]]

Der Webshop läuft auf drei Webservern hinter einem Load Balancer. Erkläre die Verfahren **Round Robin** und **Least Connections** und nenne, welches bei sehr unterschiedlich langen Anfragen besser ist.

> [!success]- Lösung
> - **Round Robin:** Anfragen werden der Reihe nach verteilt (1, 2, 3, 1, …), ohne die aktuelle Last zu beachten. (1,5 P)
> - **Least Connections:** Die nächste Anfrage geht an den Server mit den wenigsten offenen Verbindungen. (1,5 P)
> - Bei unterschiedlich langen Anfragen ist **Least Connections** besser, weil sich lange Anfragen sonst auf einem Server stauen können. (1 P)

---

## FISI-2 Cloud und Betriebsmodelle

### K2.1 ★ – Servicemodelle zuordnen (6 Punkte)
📘 **Nachlernen:** [[FISI-2 Cloud und Betriebsmodelle#1. Servicemodelle|FISI-2 › Servicemodelle]]

Ordne IaaS, PaaS oder SaaS zu: a) gemietete virtuelle Server, auf denen die IT selbst Windows Server installiert, b) Office-Paket mit Mail im Browser, c) verwaltete Datenbank, bei der der Anbieter Updates und Backups übernimmt, d) Plattform, auf die die Entwickler nur ihren Code hochladen, e) Speicherplatz als Block-Storage, f) Online-Buchhaltung. 

> [!success]- Lösung
> a) IaaS · b) SaaS · c) PaaS · d) PaaS · e) IaaS · f) SaaS (je 1 P)
> Merkhilfe: Je weiter „oben“ im Stapel der Anbieter die Verantwortung übernimmt, desto näher an SaaS.

### K2.2 ★★ – On-Premises oder Public Cloud (6 Punkte)
📘 **Nachlernen:** [[FISI-2 Cloud und Betriebsmodelle#3. On-Premises oder Cloud|FISI-2 › On-Premises oder Cloud]]

Die Geschäftsführung überlegt, das Lagerverwaltungssystem in eine Public Cloud zu verlagern. Nenne je zwei Vorteile und zwei Risiken und leite eine Empfehlung ab, wenn die Scanner im Lager in Echtzeit auf das System zugreifen.

> [!success]- Lösung
> - **Vorteile:** keine Investition in Hardware (OPEX statt CAPEX), flexible Skalierung, Betrieb/Wartung beim Anbieter, hohe Verfügbarkeit durch Rechenzentren (2 P)
> - **Risiken:** Abhängigkeit von der Internetanbindung und **Latenz**, Datenschutz/Datenhoheit, Vendor-Lock-in, laufende Kosten (2 P)
> - **Empfehlung:** Bei Echtzeitzugriff aus dem Lager nur mit **redundanter, schneller Anbindung** (zwei Provider); alternativ **Hybrid**: zeitkritische Teile lokal, Auswertungen in der Cloud. Begründete Entscheidung zählt. (2 P)

### K2.3 ★★ – Anbieter auswählen (5 Punkte)
📘 **Nachlernen:** [[FISI-2 Cloud und Betriebsmodelle#4. Abrechnung und Anbieterauswahl|FISI-2 › Abrechnung und Anbieterauswahl]] · [[FISI-2 Cloud und Betriebsmodelle#Datenschutz in der Cloud|FISI-2 › Datenschutz in der Cloud]]

Nenne fünf Kriterien, nach denen ein Cloud-Anbieter für personenbezogene Kundendaten ausgewählt werden sollte.

> [!success]- Lösung (je 1 P)
> Serverstandort in der EU/Deutschland · Vertrag zur **Auftragsverarbeitung** (Art. 28 DSGVO) · Zertifizierungen (ISO 27001, BSI C5) · zugesicherte Verfügbarkeit im **SLA** · Verschlüsselung (auch at rest) · Exit-Strategie/Datenexport · Support in deutscher Sprache · Abrechnungsmodell

---

## FISI-3 Speicher und RAID planen

### K3.1 ★★ – Speicherbedarf für Home-Verzeichnisse (8 Punkte)
📘 **Nachlernen:** [[FISI-3 Speicher und RAID planen#2. Speicherbedarf berechnen|FISI-3 › Speicherbedarf berechnen]] · [[FISI-3 Speicher und RAID planen#1. Binäre Einheiten|FISI-3 › Binäre Einheiten]]

Jede:r der 180 Mitarbeitenden belegt heute 8 GB. Der Bedarf wächst jährlich um 15 %. Das System soll für 3 Jahre reichen und zusätzlich 20 % Reserve haben.
a) Berechne den Bedarf in GB. b) Rechne das Ergebnis in TiB um (2 Nachkommastellen).

> [!success]- Lösung
> a) 180 · 8 GB = 1 440 GB → nach 3 Jahren 1 440 · 1,15³ = 1 440 · 1,520875 = 2 190,06 GB → mit Reserve · 1,2 = **2 628,07 GB** (5 P)
> b) 2 628,07 · 10⁹ B ÷ 2⁴⁰ B = **2,39 TiB** (3 P)

### K3.2 ★★ – Plattenanzahl planen (8 Punkte)
📘 **Nachlernen:** [[FISI-3 Speicher und RAID planen#4. Plattenanzahl planen|FISI-3 › Plattenanzahl planen]] · [[FISI-3 Speicher und RAID planen#Hot Spare, Mix and Match|FISI-3 › Hot Spare]]

Es werden **20 TB netto** benötigt, es stehen 4-TB-Platten zur Verfügung. Berechne die Anzahl der Platten für RAID 5, RAID 6 und RAID 10 jeweils **mit einer Hot-Spare-Platte** und empfiehl ein Level für eine Datenbank mit vielen Schreibzugriffen.

> [!success]- Lösung
> - Nutzplatten: 20 TB ÷ 4 TB = 5
> - **RAID 5:** 5 + 1 Parität + 1 Hot Spare = **7** (2 P)
> - **RAID 6:** 5 + 2 Parität + 1 Hot Spare = **8** (2 P)
> - **RAID 10:** 5 Spiegelpaare = 10 Platten (die Hälfte ist Spiegelung) + 1 Hot Spare = **11** (2 P)
> - **Empfehlung:** RAID 10 – keine Paritätsberechnung beim Schreiben, schnell und schnelle Wiederherstellung (2 P)

### K3.3 ★ – Deduplizierung und Kompression (4 Punkte)
📘 **Nachlernen:** [[FISI-3 Speicher und RAID planen#5. Speicherarchitekturen und Speicheroptimierung|FISI-3 › Speicheroptimierung]]

Erkläre Deduplizierung und Kompression und nenne je eine Datenart, bei der das Verfahren kaum etwas bringt.

> [!success]- Lösung
> - **Deduplizierung:** gleiche Datenblöcke werden nur einmal gespeichert, weitere Vorkommen verweisen darauf (1,5 P). Wenig Nutzen bei **einmaligen, verschlüsselten** Daten (0,5 P).
> - **Kompression:** Daten werden durch Algorithmen (Redundanz im Inhalt) verkleinert (1,5 P). Wenig Nutzen bei **bereits komprimierten** Dateien wie JPEG, MP4, ZIP (0,5 P).

### K3.4 ★★ – Ausfallkennzahlen (4 Punkte)
📘 **Nachlernen:** [[FISI-3 Speicher und RAID planen#6. Lebensdauer und Ausfallkennzahlen|FISI-3 › Lebensdauer und Ausfallkennzahlen]]

Ein Hersteller gibt für eine SSD eine MTBF von 2 000 000 Stunden an. Ein Kollege folgert: „Die Platte hält 228 Jahre.“ Nimm Stellung und erkläre MTTF und MTBF.

> [!success]- Lösung
> - Die Aussage ist falsch: MTBF ist ein **statistischer Mittelwert** über eine große Anzahl von Geräten in der Nutzungsphase, keine Lebensdauergarantie. Bei 1 000 Platten ist rechnerisch etwa alle 2 000 h ein Ausfall zu erwarten. (2 P)
> - **MTBF:** mittlere Zeit zwischen zwei Ausfällen bei **reparierbaren** Systemen; **MTTF:** mittlere Zeit bis zum Ausfall bei **nicht reparierbaren** Komponenten. (2 P)

---

## FISI-4 Datensicherung, Archivierung und Notfallvorsorge

### K4.1 ★★ – Rücksicherung planen (8 Punkte)
📘 **Nachlernen:** [[FISI-4 Datensicherung, Archivierung und Notfallvorsorge#1. Sicherungsarten|FISI-4 › Sicherungsarten]] · [[FISI-4 Datensicherung, Archivierung und Notfallvorsorge#2. Rücksicherung|FISI-4 › Rücksicherung]]

Der Fileserver wird jeden Montag voll gesichert, Dienstag bis Freitag jeweils abends. Am Freitag um 10 Uhr fällt das Volume aus.
a) Welche Sicherungen musst du einspielen, wenn Di–Do **differenziell** gesichert wurde?
b) Welche, wenn **inkrementell** gesichert wurde?
c) Wie behandeln beide Verfahren das Archivbit?
d) Welche Daten sind in beiden Fällen verloren?

> [!success]- Lösung
> a) Vollsicherung Montag + differenzielle Sicherung **Donnerstag** (2 P)
> b) Vollsicherung Montag + inkrementelle Sicherungen **Dienstag, Mittwoch, Donnerstag** in dieser Reihenfolge (2 P)
> c) Vollsicherung und inkrementelle Sicherung **setzen das Archivbit zurück**, die differenzielle Sicherung lässt es gesetzt – deshalb enthält sie alle Änderungen seit der letzten Vollsicherung. (2 P)
> d) Alle Änderungen seit der Sicherung am Donnerstagabend bis Freitag 10 Uhr. (2 P)

### K4.2 ★★ – RTO und RPO (6 Punkte)
📘 **Nachlernen:** [[FISI-4 Datensicherung, Archivierung und Notfallvorsorge#4. RTO, RPO und Verfügbarkeit|FISI-4 › RTO, RPO und Verfügbarkeit]]

Für das Lagerverwaltungssystem fordert die Geschäftsführung: höchstens **1 Stunde Datenverlust** und **4 Stunden Ausfallzeit**. Aktuell wird täglich um 22 Uhr gesichert, die Rücksicherung vom Band dauert 6 Stunden.
a) Ordne die Anforderungen RTO und RPO zu. b) Prüfe, ob die aktuelle Lösung sie erfüllt. c) Schlage je eine Verbesserung vor.

> [!success]- Lösung
> a) 1 h Datenverlust = **RPO**, 4 h Ausfallzeit = **RTO** (2 P)
> b) RPO nicht erfüllt: bei einem Ausfall am Nachmittag fehlen bis zu ~18 h. RTO nicht erfüllt: 6 h > 4 h. (2 P)
> c) RPO: stündliche Snapshots, Replikation oder Transaktionsprotokoll-Sicherungen. RTO: Sicherung zuerst auf Disk (D2D2T), Replikat auf einem Standby-Server. (2 P)

### K4.3 ★ – Backup oder Archiv (4 Punkte)
📘 **Nachlernen:** [[FISI-4 Datensicherung, Archivierung und Notfallvorsorge#3. Backup und Archivierung|FISI-4 › Backup und Archivierung]]

Die Buchhaltung meint: „Wir haben doch Backups, eine Archivierung brauchen wir nicht.“ Erkläre zwei Unterschiede und nenne eine gesetzliche Anforderung an die Archivierung.

> [!success]- Lösung
> - **Zweck:** Backup = Wiederherstellung nach Datenverlust (Kopie, wird überschrieben); Archiv = langfristige, unveränderbare Aufbewahrung, Original wird oft aus dem Produktivsystem entfernt. (1,5 P)
> - **Dauer:** Backup Tage/Wochen (Generationen), Archiv Jahre (z. B. 8 Jahre für Buchungsbelege, 10 Jahre für Bücher und Jahresabschlüsse). (1,5 P)
> - **Anforderung:** revisionssicher nach **GoBD** (unveränderbar, vollständig, auffindbar, z. B. WORM-Medien). (1 P)

### K4.4 ★★ – USV auswählen (5 Punkte)
📘 **Nachlernen:** [[FISI-4 Datensicherung, Archivierung und Notfallvorsorge#5. USV und Notstrom|FISI-4 › USV und Notstrom]]

Im Serverraum soll eine USV installiert werden. Erkläre die Klassen VFD, VI und VFI und begründe, welche du für die Server wählst.

> [!success]- Lösung
> - **VFD (Offline):** Last hängt direkt am Netz, bei Ausfall wird auf Batterie umgeschaltet (Umschaltzeit). (1 P)
> - **VI (Line-Interactive):** zusätzlich Spannungsregelung bei Unter-/Überspannung, kurze Umschaltzeit. (1 P)
> - **VFI (Online/Doppelwandler):** Last wird ständig über Gleich- und Wechselrichter versorgt, keine Umschaltzeit, filtert alle Netzstörungen. (1 P)
> - **Wahl: VFI**, weil Server unterbrechungsfrei und mit sauberer Spannung versorgt werden müssen; Nachteile (Wirkungsgrad, Preis) sind hier vertretbar. (2 P)

---

## FISI-5 Systemhärtung, Malware und Angriffe

### K5.1 ★ – Server härten (6 Punkte)
📘 **Nachlernen:** [[FISI-5 Systemhärtung, Malware und Angriffe#1. Systemhärtung|FISI-5 › Systemhärtung]] · [[FISI-5 Systemhärtung, Malware und Angriffe#BIOS/UEFI absichern|FISI-5 › BIOS/UEFI absichern]]

Nenne sechs Maßnahmen, um den neuen Webserver zu härten. Ordne sie den Bereichen Hardware/Firmware, Betriebssystem und Netzwerk zu.

> [!success]- Lösung (je 1 P, mindestens eine je Bereich)
> - **Firmware:** UEFI-Passwort, Secure Boot, Booten von USB deaktivieren, Firmware aktuell halten
> - **Betriebssystem:** nicht benötigte Dienste/Software entfernen, Updates/Patches zeitnah, Standardkonten deaktivieren/umbenennen, Least Privilege, Protokollierung
> - **Netzwerk:** nur benötigte Ports öffnen (Host-Firewall), Verwaltung nur aus dem Admin-Netz, SSH nur mit Schlüssel, TLS statt Klartextprotokollen

### K5.2 ★★ – Malware zuordnen (5 Punkte)
📘 **Nachlernen:** [[FISI-5 Systemhärtung, Malware und Angriffe#2. Schadsoftware und Angriffe|FISI-5 › Schadsoftware und Angriffe]]

Ordne zu: a) verschlüsselt Dateien und fordert Lösegeld, b) verbreitet sich selbstständig über Netzwerklücken, c) tarnt sich als nützliches Programm, d) versteckt sich tief im System und verschleiert andere Schadsoftware, e) späht unbemerkt Eingaben und Daten aus.

> [!success]- Lösung
> a) Ransomware · b) Wurm · c) Trojaner · d) Rootkit · e) Spyware/Keylogger (je 1 P)

### K5.3 ★★ – Phishing erkennen (4 Punkte)
📘 **Nachlernen:** [[FISI-5 Systemhärtung, Malware und Angriffe#Phishing erkennen|FISI-5 › Phishing erkennen]]

Eine Mitarbeiterin erhält eine Mail „Ihr Postfach ist voll – bestätigen Sie jetzt Ihre Zugangsdaten“. Nenne vier Merkmale, an denen sie Phishing erkennen kann.

> [!success]- Lösung (je 1 P)
> Absenderadresse passt nicht zur Domain · Link-Ziel weicht vom angezeigten Text ab (Mouse-over) · Zeitdruck/Drohung · Aufforderung, Zugangsdaten einzugeben · unpersönliche Anrede · Rechtschreibfehler · unerwarteter Anhang

### K5.4 ★★ – Least Privilege und Zero Trust (4 Punkte)
📘 **Nachlernen:** [[FISI-5 Systemhärtung, Malware und Angriffe#Least Privilege und Zero Trust|FISI-5 › Least Privilege und Zero Trust]]

Erkläre beide Prinzipien mit je einem Beispiel aus der Brenner Logistik GmbH.

> [!success]- Lösung
> - **Least Privilege:** Jede Person/jeder Dienst erhält nur die Rechte, die für die Aufgabe nötig sind – z. B. Lagermitarbeitende nur Lesezugriff auf den Buchhaltungsordner oder gar keinen; Admins arbeiten mit getrenntem Admin-Konto. (2 P)
> - **Zero Trust:** Kein Gerät und kein Netz gilt automatisch als vertrauenswürdig, jeder Zugriff wird geprüft (Identität, Gerätezustand, MFA) – z. B. auch im internen Netz Anmeldung per MFA am Lagersystem, Segmentierung. (2 P)

---

## FISI-6 Datenschutz, Geräteverwaltung und Lizenzen

### K6.1 ★★ – TOM zuordnen (6 Punkte)
📘 **Nachlernen:** [[FISI-6 Datenschutz, Geräteverwaltung und Lizenzen#2. Technisch-organisatorische Maßnahmen (TOM)|FISI-6 › TOM]]

Ordne die Maßnahmen einem Schutzziel bzw. einer TOM-Kategorie zu und nenne je eine konkrete Umsetzung: a) Zutritt zum Serverraum, b) Anmeldung an Systemen, c) Rechte in Anwendungen, d) Übertragung an Dritte, e) Nachvollziehbarkeit von Änderungen, f) Schutz vor Ausfall.

> [!success]- Lösung (je 1 P)
> a) **Zutrittskontrolle** – Chipkarte, Schließprotokoll · b) **Zugangskontrolle** – Passwortrichtlinie, MFA · c) **Zugriffskontrolle** – Berechtigungskonzept · d) **Weitergabekontrolle** – TLS/VPN, verschlüsselte Datenträger · e) **Eingabekontrolle** – Protokollierung mit Benutzerkennung · f) **Verfügbarkeitskontrolle** – Backup, USV, RAID

### K6.2 ★★ – Datenpanne (6 Punkte)
📘 **Nachlernen:** [[FISI-6 Datenschutz, Geräteverwaltung und Lizenzen#Datenpanne|FISI-6 › Datenpanne]]

Ein Außendienstmitarbeiter meldet am Montag, dass sein Notebook mit Kundendaten am Freitag im Zug gestohlen wurde.
a) Welche Frist gilt für die Meldung an die Aufsichtsbehörde und ab wann läuft sie? b) Wann müssen die Betroffenen informiert werden? c) Wie hätte die Meldepflicht vermieden werden können?

> [!success]- Lösung
> a) **72 Stunden** ab **Bekanntwerden** beim Verantwortlichen (Montag), Art. 33 DSGVO – außer die Verletzung führt voraussichtlich nicht zu einem Risiko. (2 P)
> b) Bei einem **voraussichtlich hohen Risiko** für die Betroffenen, unverzüglich (Art. 34). (2 P)
> c) Durch eine **Festplattenverschlüsselung** (z. B. BitLocker mit TPM + PIN): Die Daten sind für den Dieb nicht lesbar, ein Risiko besteht dann in der Regel nicht. Zusätzlich: MDM mit Fernlöschung. (2 P)

### K6.3 ★★ – CALs berechnen (5 Punkte)
📘 **Nachlernen:** [[FISI-6 Datenschutz, Geräteverwaltung und Lizenzen#Client Access Licenses (CAL)|FISI-6 › Client Access Licenses]]

60 Lagermitarbeitende teilen sich im Schichtbetrieb 15 PCs. 120 Büroangestellte nutzen je ein Notebook und ein Smartphone, die auf den Server zugreifen. Berechne die Anzahl der CALs, wenn nur User-CALs, nur Device-CALs oder die günstigste Mischung gekauft wird.

> [!success]- Lösung
> - **Nur User-CALs:** 60 + 120 = **180** (1 P)
> - **Nur Device-CALs:** 15 + 120 · 2 = **255** (1 P)
> - **Mischung:** Device-CALs für die 15 Lager-PCs + User-CALs für die 120 Büroangestellten = **135** (2 P)
> - Begründung: Device-CAL lohnt sich, wenn viele Personen ein Gerät teilen; User-CAL, wenn eine Person mehrere Geräte nutzt. (1 P)

### K6.4 ★ – Mobile Geräte verwalten (4 Punkte)
📘 **Nachlernen:** [[FISI-6 Datenschutz, Geräteverwaltung und Lizenzen#4. Mobile Geräte (MDM und BYOD)|FISI-6 › Mobile Geräte]]

Nenne vier Funktionen eines MDM-Systems, die bei dienstlichen Smartphones die Sicherheit erhöhen.

> [!success]- Lösung (je 1 P)
> Fernsperre/Fernlöschung · Erzwingen von PIN und Verschlüsselung · Trennung dienstlicher und privater Daten (Container) · App-Verteilung und -Sperrung · automatische Updates · Konfiguration von WLAN/VPN/Mail · Inventarisierung

---

## FISI-7 Programmierung und Skripte für Admins

### K7.1 ★★ – Schreibtischtest (8 Punkte)
📘 **Nachlernen:** [[FISI-7 Programmierung und Skripte für Admins#Schreibtischtest|FISI-7 › Schreibtischtest]]

```
zahlen = [4, 9, 2, 9, 7]
max = zahlen[0]
zaehler = 1
für i = 1 bis 4
    wenn zahlen[i] > max dann
        max = zahlen[i]
        zaehler = 1
    sonst wenn zahlen[i] == max dann
        zaehler = zaehler + 1
    ende wenn
ende für
```
a) Führe einen Schreibtischtest durch (i, zahlen[i], max, zaehler). b) Was berechnet der Algorithmus?

> [!success]- Lösung
> | i | zahlen[i] | max | zaehler |
> |---|---|---|---|
> | Start | – | 4 | 1 |
> | 1 | 9 | 9 | 1 |
> | 2 | 2 | 9 | 1 |
> | 3 | 9 | 9 | 2 |
> | 4 | 7 | 9 | 2 |
> a) je Zeile 1 P (5 P) · b) den **größten Wert** und **wie oft** er vorkommt (3 P)

### K7.2 ★★ – Fehler im Code (5 Punkte)
📘 **Nachlernen:** [[FISI-7 Programmierung und Skripte für Admins#4. Fehlerarten und Tests|FISI-7 › Fehlerarten und Tests]]

```
summe = 0
für i = 0 bis laenge(werte)
    summe = summe + werte[i]
ende für
durchschnitt = summe / laenge(werte)
```
Das Skript soll den Durchschnitt der Festplattenauslastungen (ganze Zahlen) berechnen. Finde zwei Fehler, benenne die Fehlerart und korrigiere sie.

> [!success]- Lösung
> - Schleife läuft bis `laenge(werte)` – der letzte Index ist `laenge(werte) - 1` → **Laufzeitfehler** (Index außerhalb des Bereichs). Korrektur: `bis laenge(werte) - 1`. (2,5 P)
> - Division zweier Ganzzahlen liefert in vielen Sprachen eine **Ganzzahl** → **logischer (semantischer) Fehler**, Nachkommastellen fehlen. Korrektur: `summe` als Gleitkommazahl oder Umwandlung vor der Division. (2,5 P)
> - Zusätzlich möglich: leere Liste → Division durch 0 abfangen.

### K7.3 ★ – Ganzzahldivision und Modulo (4 Punkte)
📘 **Nachlernen:** [[FISI-7 Programmierung und Skripte für Admins#2. Ganzzahldivision und Modulo|FISI-7 › Ganzzahldivision und Modulo]]

Ein Algorithmus berechnet die Quersumme mit `summe = summe + zahl % 10` und `zahl = zahl / 10` (Ganzzahldivision), solange `zahl > 0`. Berechne die Quersumme von 4711 mit allen Zwischenschritten.

> [!success]- Lösung
> 4711 % 10 = 1 → 471 · 471 % 10 = 1 → 47 · 47 % 10 = 7 → 4 · 4 % 10 = 4 → 0
> Summe = 1 + 1 + 7 + 4 = **13** (Zwischenschritte 3 P, Ergebnis 1 P)

### K7.4 ★★ – Befehle für Admins (6 Punkte)
📘 **Nachlernen:** [[FISI-7 Programmierung und Skripte für Admins#5. Befehle für Admins|FISI-7 › Befehle für Admins]]

a) Ein Linux-Skript `backup.sh` soll für den Besitzer lesbar, schreibbar und ausführbar sein, für die Gruppe lesbar und ausführbar, für andere gar nicht. Gib den `chmod`-Befehl in Oktalschreibweise an.
b) Ein hängender Prozess mit der PID 4312 soll unter Windows und unter Linux beendet werden.
c) Unter Windows soll das Skript jeden Tag um 23 Uhr laufen. Nenne das Werkzeug.

> [!success]- Lösung
> a) rwx = 7, r-x = 5, --- = 0 → `chmod 750 backup.sh` (2 P)
> b) Windows: `taskkill /PID 4312 /F` · Linux: `kill 4312` bzw. `kill -9 4312` (2 P)
> c) **Aufgabenplanung** (`schtasks` bzw. Task Scheduler); unter Linux wäre es `cron`. (2 P)

---

## FISI-8 Datenbanken und Modellierung

### K8.1 ★★ – SQL-Abfrage auswerten (6 Punkte)
📘 **Nachlernen:** [[FISI-8 Datenbanken und Modellierung#2. SQL-Abfragen lesen|FISI-8 › SQL-Abfragen lesen]]

Tabelle **Standort**: (1, Dortmund), (2, Hamm). Tabelle **Geraet** (id, typ, standort_id): (1, Laptop, 1), (2, Laptop, 1), (3, Drucker, 2), (4, Laptop, 2), (5, Server, 1), (6, Server, 1).

```sql
SELECT s.name, COUNT(*) AS anzahl
FROM Geraet g JOIN Standort s ON g.standort_id = s.id
WHERE g.typ <> 'Server'
GROUP BY s.name
HAVING COUNT(*) >= 2;
```
a) Gib das Ergebnis an. b) Was ändert sich, wenn die WHERE-Bedingung entfällt?

> [!success]- Lösung
> a) Dortmund 2 · Hamm 2 (4 P)
> b) Dortmund 4 · Hamm 2 – die beiden Server zählen mit. (2 P)

### K8.2 ★★ – ER-Modell (8 Punkte)
📘 **Nachlernen:** [[FISI-8 Datenbanken und Modellierung#3. ER-Modell|FISI-8 › ER-Modell]]

Für die Inventarisierung gilt: Ein Gerät ist genau einer Person zugeordnet, eine Person kann mehrere Geräte haben. Auf einem Gerät können mehrere Softwarelizenzen installiert sein, eine Lizenz (Volumenlizenz) kann auf mehreren Geräten genutzt werden.
a) Nenne die Kardinalitäten. b) Leite die Tabellen mit Primär- und Fremdschlüsseln ab.

> [!success]- Lösung
> a) Person – Gerät **1:n** · Gerät – Lizenz **m:n** (2 P)
> b) (6 P)
> - **Person** (<u>PersonID</u>, Name, …)
> - **Geraet** (<u>GeraetID</u>, Typ, Seriennummer, *PersonID* → Person)
> - **Lizenz** (<u>LizenzID</u>, Produkt, Anzahl)
> - **Installation** (<u>*GeraetID*</u>, <u>*LizenzID*</u>, Installationsdatum) – Zwischentabelle für m:n mit zusammengesetztem Primärschlüssel

### K8.3 ★ – Datentypen wählen (4 Punkte)
📘 **Nachlernen:** [[FISI-8 Datenbanken und Modellierung#Datentypen wählen|FISI-8 › Datentypen wählen]]

Wähle je einen passenden SQL-Datentyp: a) Seriennummer „SN-2024-00815“, b) Kaufpreis 1 249,90 €, c) Kaufdatum, d) Postleitzahl 44137.

> [!success]- Lösung (je 1 P)
> a) `VARCHAR(20)` · b) `DECIMAL(10,2)` (kein FLOAT – Rundungsfehler bei Geld) · c) `DATE` · d) `CHAR(5)` bzw. VARCHAR – Text, weil führende Nullen (z. B. 01067) erhalten bleiben müssen

---
← [[AP2 FISI Start]] · [[Übersicht FISI Konzeption und Administration]]


