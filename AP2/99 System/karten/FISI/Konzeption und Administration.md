---
bereich: Konzeption und Administration
tags: [ap2/kartenquelle, ap2/fisi]
---
# Kartenquelle Konzeption und Administration

> [!warning] Hier stehen die Antworten
> Zum Lernen [[Karten Konzeption und Administration]] öffnen. Diese Datei ist nur zum Bearbeiten und Ergänzen da – Format: `Frage::Antwort`, eine Karte pro Zeile.

#flashcards/ap2/fisi/konzeption

## FISI-1 Server, Virtualisierung und Container

Wie dimensionierst du ein Server-Netzteil?::Leistung aller Komponenten addieren, Reserve (meist 20–30 %) aufschlagen, nächstgrößeres Netzteil wählen – für Hochverfügbarkeit redundant (1+1, Hot-Swap)
Was bedeutet „1+1-redundantes Netzteil“?::Zwei Netzteile, von denen jedes allein die volle Last tragen kann – fällt eines aus, läuft der Server weiter
Wie berechnest du jährliche Stromkosten eines Servers?::Leistung in kW · 8 760 h · Preis je kWh
Was unterscheidet Hypervisor Typ 1 und Typ 2?::Typ 1 (Bare Metal) läuft direkt auf der Hardware (Server), Typ 2 (Hosted) als Programm auf einem Wirtsbetriebssystem (Test, Arbeitsplatz)
Nennen Sie drei Vorteile der Servervirtualisierung.::Bessere Hardwareauslastung, weniger Strom/Platz, schnelle Bereitstellung, Snapshots, Live-Migration, Hochverfügbarkeit
Was ist ein Snapshot – und warum ist er kein Backup?::Momentaufnahme einer VM zum schnellen Zurücksetzen; liegt auf demselben Speicher und hängt von der Basisplatte ab – fällt der Speicher aus, ist er weg
Was ist Live-Migration?::Verschieben einer laufenden VM auf einen anderen Host ohne Unterbrechung (z. B. für Wartung)
Was ist Overcommitment?::Den VMs zusammen mehr virtuelle Ressourcen (RAM/CPU) zuweisen, als physisch vorhanden sind – spart Hardware, riskiert Engpässe
Worin unterscheiden sich Container und VMs?::Container teilen sich den Kernel des Hosts (leicht, schnell startend), VMs haben ein eigenes Betriebssystem (stärkere Isolation)
Was ist ein Container-Image?::Unveränderliche Vorlage mit Anwendung und allen Abhängigkeiten, aus der Container gestartet werden
Was ist ein Cluster?::Verbund mehrerer Server, die gemeinsam einen Dienst bereitstellen – für Hochverfügbarkeit (Failover) oder Leistung
Unterschied horizontale und vertikale Skalierung?::Horizontal: mehr Server hinzufügen (scale out) · vertikal: einen Server aufrüsten (scale up)
Wie arbeitet Round Robin beim Load Balancing?::Anfragen werden der Reihe nach auf die Server verteilt, ohne deren aktuelle Last zu beachten
Wie arbeitet Least Connections?::Die nächste Anfrage geht an den Server mit den wenigsten aktiven Verbindungen
Was ist Blue-Green-Deployment?::Zwei gleiche Umgebungen: Die neue Version wird auf der inaktiven installiert und getestet, dann wird umgeschaltet – schnelles Zurückschalten möglich

## FISI-2 Cloud und Betriebsmodelle

Was bedeutet IaaS?::Infrastructure as a Service – der Anbieter stellt virtuelle Server, Speicher und Netz; Betriebssystem und Anwendungen verwaltet der Kunde
Was bedeutet PaaS?::Platform as a Service – der Anbieter stellt Laufzeitumgebung/Datenbank bereit, der Kunde bringt nur Anwendung und Daten
Was bedeutet SaaS?::Software as a Service – fertige Anwendung über das Internet (z. B. Office im Browser), der Kunde nutzt sie nur
Was ist eine Hybrid Cloud?::Kombination aus Private Cloud/On-Premises und Public Cloud, die zusammenarbeiten
Was ist eine Community Cloud?::Cloud, die sich mehrere Organisationen mit ähnlichen Anforderungen teilen (z. B. Behörden)
Nennen Sie zwei Vorteile der Public Cloud.::Keine Investitionen (Pay-per-Use), schnelle Skalierung, Betrieb beim Anbieter, hohe Verfügbarkeit
Nennen Sie zwei Risiken der Public Cloud.::Abhängigkeit von der Internetanbindung (Latenz), Datenschutz/Datenhoheit, Vendor-Lock-in, laufende Kosten
Was ist Latenz?::Verzögerung zwischen Senden und Empfangen eines Datenpakets – wichtig bei Echtzeitanwendungen
Was regelt ein SLA?::Vereinbarte Dienstgüte zwischen Anbieter und Kunde: Verfügbarkeit, Reaktionszeiten, Supportzeiten, Vertragsstrafen
Welcher Vertrag ist nötig, wenn ein Cloud-Anbieter personenbezogene Daten verarbeitet?::Auftragsverarbeitungsvertrag (AVV) nach Art. 28 DSGVO
Was ist ein Vendor-Lock-in?::Starke Abhängigkeit von einem Anbieter, weil ein Wechsel technisch oder finanziell sehr aufwendig ist
CAPEX oder OPEX – was trifft auf die Cloud zu?::OPEX – laufende Betriebskosten statt einmaliger Investition (CAPEX)

## FISI-3 Speicher und RAID planen

Wie viele Byte hat 1 TiB?::2⁴⁰ Byte = 1 099 511 627 776 Byte
Wie rechnest du TB in TiB um?::TB · 10¹² ÷ 2⁴⁰ (≈ · 0,9095)
Nettokapazität von RAID 5?::(n − 1) · Plattengröße – mindestens 3 Platten, 1 Platte darf ausfallen
Nettokapazität von RAID 6?::(n − 2) · Plattengröße – mindestens 4 Platten, 2 Platten dürfen ausfallen
Nettokapazität von RAID 10?::n ÷ 2 · Plattengröße – mindestens 4 Platten, je Spiegelpaar darf eine ausfallen
Welches RAID eignet sich für Datenbanken mit vielen Schreibzugriffen?::RAID 10 – keine Paritätsberechnung, schnelle Schreibzugriffe und schneller Rebuild
Was ist eine Hot-Spare-Platte?::Eingebaute, unbenutzte Reserveplatte, die bei einem Ausfall automatisch den Rebuild übernimmt
Warum ersetzt RAID kein Backup?::RAID schützt nur vor Plattenausfall – nicht vor Löschen, Ransomware, Brand oder Controllerdefekt
Was ist JBOD und sein Nachteil?::Just a Bunch of Disks – Platten werden aneinandergehängt, keine Redundanz: fällt eine aus, sind ihre Daten weg
Unterschied NAS und SAN?::NAS: Dateizugriff über das LAN (SMB/NFS) · SAN: eigenes Speichernetz mit Blockzugriff (iSCSI/Fibre Channel)
Was ist Deduplizierung?::Gleiche Datenblöcke werden nur einmal gespeichert, Duplikate verweisen darauf
Was bedeutet Thin Provisioning?::Speicher wird virtuell zugewiesen, aber erst belegt, wenn tatsächlich Daten geschrieben werden
Was beschreibt die Badewannenkurve?::Ausfallrate über die Zeit: hohe Frühausfälle, lange Phase mit niedriger Zufallsrate, dann steigende Verschleißausfälle
Unterschied MTBF und MTTF?::MTBF: mittlere Zeit zwischen Ausfällen reparierbarer Systeme · MTTF: mittlere Zeit bis zum Ausfall nicht reparierbarer Teile
Was bedeutet „Mix and Match“ bei RAID-Platten?::Platten unterschiedlicher Chargen/Hersteller mischen, damit nicht alle gleichzeitig ausfallen

## FISI-4 Datensicherung, Archivierung und Notfallvorsorge

Was sichert eine differenzielle Sicherung?::Alle Änderungen seit der letzten Vollsicherung – das Archivbit bleibt gesetzt
Was sichert eine inkrementelle Sicherung?::Alle Änderungen seit der letzten Sicherung (voll oder inkrementell) – setzt das Archivbit zurück
Welche Sicherungen brauchst du zur Rücksicherung bei differenziellem Verfahren?::Letzte Vollsicherung + letzte differenzielle Sicherung
Welche Sicherungen brauchst du bei inkrementellem Verfahren?::Letzte Vollsicherung + alle inkrementellen Sicherungen danach in richtiger Reihenfolge
Was ist die 3-2-1-Regel?::3 Kopien der Daten, auf 2 verschiedenen Medien, davon 1 außer Haus (heute oft zusätzlich 1 offline/unveränderlich)
Was ist das Generationenprinzip (GVS)?::Großvater-Vater-Sohn: tägliche, wöchentliche und monatliche Sicherungen werden rotierend aufbewahrt
Was bedeutet D2D2T?::Disk-to-Disk-to-Tape: erst schnelle Sicherung auf Festplatten, dann Auslagerung auf Band
Nennen Sie zwei Vorteile von LTO-Bändern.::Günstig pro TB, lange haltbar, offline (Schutz vor Ransomware), leicht auslagerbar, WORM-Varianten
Was ist der RPO?::Recovery Point Objective – maximal tolerierter Datenverlust (Zeit seit der letzten Sicherung)
Was ist der RTO?::Recovery Time Objective – maximal tolerierte Ausfallzeit bis zur Wiederherstellung
Unterschied Backup und Archiv?::Backup: Kopie zur Wiederherstellung, kurzfristig · Archiv: langfristige, unveränderbare Aufbewahrung, oft aus dem Produktivsystem entfernt
Was bedeutet revisionssichere Archivierung?::Vollständig, unveränderbar, nachvollziehbar und auffindbar über die Aufbewahrungsfrist (GoBD) – z. B. WORM-Medien
Unterschied USV-Klassen VFD, VI, VFI?::VFD Offline (Umschaltzeit), VI Line-Interactive (plus Spannungsregelung), VFI Online/Doppelwandler (keine Umschaltzeit, filtert alles)
Welche USV-Klasse für Server?::VFI (Online) – unterbrechungsfrei und saubere Spannung
Wozu dient eine Netzersatzanlage zusätzlich zur USV?::Die USV überbrückt Minuten, das Notstromaggregat (Diesel) versorgt über Stunden

## FISI-5 Systemhärtung, Malware und Angriffe

Was bedeutet Systemhärtung?::Angriffsfläche verkleinern: unnötige Dienste/Software entfernen, Updates, sichere Konfiguration, minimale Rechte
Wie sicherst du BIOS/UEFI ab?::Passwort setzen, Secure Boot aktivieren, Booten von externen Medien sperren, Firmware aktualisieren
Was ist Secure Boot?::UEFI-Funktion, die nur signierte Bootloader und Treiber startet – schützt vor Bootkits
Was bedeutet Least Privilege?::Jeder Benutzer/Dienst erhält nur die minimal nötigen Rechte
Was bedeutet Zero Trust?::Niemandem automatisch vertrauen – jeder Zugriff wird geprüft, auch im internen Netz
Was macht Ransomware?::Verschlüsselt Daten und fordert Lösegeld; oft werden Daten zusätzlich gestohlen (Double Extortion)
Unterschied Virus und Wurm?::Virus braucht ein Wirtsprogramm und Benutzeraktion; Wurm verbreitet sich selbstständig über das Netz
Was ist ein Trojaner?::Schadprogramm, das sich als nützliche Software tarnt
Was ist ein Rootkit?::Schadsoftware, die sich tief im System versteckt und andere Schadsoftware verschleiert
Nennen Sie drei Merkmale einer Phishing-Mail.::Gefälschter Absender, Link-Ziel passt nicht, Zeitdruck/Drohung, Aufforderung zur Eingabe von Zugangsdaten, unpersönliche Anrede
Was ist Spear-Phishing?::Gezielter Phishing-Angriff auf bestimmte Personen mit persönlich zugeschnittenen Inhalten
Was ist ein Penetrationstest?::Beauftragter, simulierter Angriff, um Schwachstellen zu finden – nur mit schriftlicher Genehmigung
Unterschied White Hat und Black Hat?::White Hat: legaler Sicherheitsforscher mit Auftrag · Black Hat: krimineller Angreifer
Was ist eine Sandbox?::Isolierte Umgebung, in der verdächtige Dateien gefahrlos ausgeführt und analysiert werden
Was ist ein DDoS-Angriff?::Viele verteilte Systeme (Botnetz) überlasten einen Dienst mit Anfragen, bis er nicht mehr erreichbar ist

## FISI-6 Datenschutz, Geräteverwaltung und Lizenzen

Nennen Sie die drei Schutzziele der Informationssicherheit.::Vertraulichkeit, Integrität, Verfügbarkeit
Was sind TOM?::Technische und organisatorische Maßnahmen zum Schutz personenbezogener Daten (Art. 32 DSGVO)
Beispiel für Zutrittskontrolle?::Chipkarte am Serverraum, Schließanlage, Besucherbuch
Beispiel für Zugangskontrolle?::Passwortrichtlinie, MFA, Bildschirmsperre
Beispiel für Zugriffskontrolle?::Berechtigungskonzept – wer darf welche Daten lesen/ändern
Innerhalb welcher Frist muss eine Datenpanne gemeldet werden?::72 Stunden nach Bekanntwerden an die Aufsichtsbehörde (Art. 33 DSGVO), außer es besteht voraussichtlich kein Risiko
Wann müssen Betroffene über eine Datenpanne informiert werden?::Bei voraussichtlich hohem Risiko für ihre Rechte und Freiheiten (Art. 34)
Unterschied Anonymisierung und Pseudonymisierung?::Anonymisiert: Personenbezug endgültig entfernt (keine DSGVO mehr) · pseudonymisiert: mit Zusatzwissen wieder zuordenbar (DSGVO gilt)
Wie entsorgst du Festplatten datenschutzkonform?::Mehrfach überschreiben bzw. Secure Erase oder physisch vernichten nach DIN 66399 mit Protokoll
Was ist MDM?::Mobile Device Management – zentrale Verwaltung mobiler Geräte (Richtlinien, Apps, Fernlöschung)
Was bedeutet BYOD?::Bring Your Own Device – private Geräte werden dienstlich genutzt; Trennung per Container nötig
Wann lohnt sich eine User-CAL?::Wenn eine Person mehrere Geräte nutzt
Wann lohnt sich eine Device-CAL?::Wenn sich viele Personen ein Gerät teilen (Schichtbetrieb)
Unterschied Update und Upgrade?::Update: Fehlerbehebung/kleine Verbesserung innerhalb einer Version · Upgrade: neue Hauptversion mit neuen Funktionen, oft kostenpflichtig
Was gehört zum Patchmanagement?::Patches erfassen, bewerten, testen, verteilen, Erfolg prüfen und dokumentieren – mit Rollback-Plan

## FISI-7 Programmierung und Skripte für Admins

Was ist ein Schreibtischtest?::Code gedanklich Zeile für Zeile ausführen und Variablenwerte in einer Tabelle festhalten
Was liefert 17 mod 5?::2 (Rest der Ganzzahldivision)
Was liefert 17 div 5?::3 (Ganzzahldivision ohne Rest)
Wie bekommst du die letzte Ziffer einer Zahl?::zahl mod 10
Wertebereich eines vorzeichenbehafteten 8-Bit-Integers (byte)?::−128 bis 127
Wertebereich eines 32-Bit-int?::−2 147 483 648 bis 2 147 483 647
Unterschied Syntax- und Logikfehler?::Syntaxfehler: Regelverstoß, Programm startet nicht · Logik-/Semantikfehler: läuft, liefert aber falsche Ergebnisse
Was ist ein Laufzeitfehler?::Fehler, der erst bei der Ausführung auftritt, z. B. Index außerhalb des Arrays, Division durch 0
Welcher Index ist bei einem Array der Länge n der letzte?::n − 1
Was bedeutet chmod 750?::Besitzer rwx, Gruppe r-x, andere keine Rechte
Wie beendest du einen Prozess unter Windows per Befehl?::taskkill /PID 4312 /F oder taskkill /IM name.exe
Wie planst du Aufgaben unter Windows und Linux?::Windows: Aufgabenplanung/schtasks · Linux: cron (crontab)
Was bewirkt die PATH-Variable?::Liste der Verzeichnisse, in denen das System ausführbare Programme sucht
Welche Vorteile hat Pseudocode?::Sprachunabhängig, leicht verständlich, Fokus auf Logik statt Syntax

## FISI-8 Datenbanken und Modellierung

Was ist ein Primärschlüssel?::Attribut(kombination), das jeden Datensatz eindeutig identifiziert, nicht NULL
Was ist ein Fremdschlüssel?::Attribut, das auf den Primärschlüssel einer anderen Tabelle verweist
Was bedeutet referenzielle Integrität?::Fremdschlüssel dürfen nur auf existierende Datensätze verweisen
Wie löst du eine m:n-Beziehung in Tabellen auf?::Mit einer Zwischentabelle, die beide Fremdschlüssel enthält
Welcher Datentyp für Geldbeträge?::DECIMAL(p,s) – kein FLOAT wegen Rundungsfehlern
Warum Postleitzahlen als Text speichern?::Führende Nullen bleiben erhalten, es wird nicht damit gerechnet
Unterschied WHERE und HAVING?::WHERE filtert Zeilen vor der Gruppierung, HAVING filtert Gruppen nach GROUP BY
Was zählt COUNT(*)?::Alle Zeilen (der Gruppe), inklusive NULL-Werte
Was bewirkt ein Index?::Beschleunigt Suchen und Sortieren, verlangsamt Schreibvorgänge und braucht Speicher
Was ist Locking?::Sperren von Datensätzen/Tabellen bei gleichzeitigem Zugriff, um Inkonsistenzen zu vermeiden
Nennen Sie vier Arten von NoSQL-Datenbanken.::Key-Value, dokumentenorientiert, spaltenorientiert, Graphdatenbank
Unterschied Aggregation und Komposition in UML?::Aggregation (leere Raute): Teile existieren auch allein · Komposition (gefüllte Raute): Teile existieren nur mit dem Ganzen
Was bedeutet Datenkapselung?::Attribute sind privat und nur über Methoden (Getter/Setter) zugänglich
