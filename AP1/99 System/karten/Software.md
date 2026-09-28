---
bereich: Software
tags: [ap1/kartenquelle]
---
# Kartenquelle Software

> [!info] AP1-Priorität
> Karten nach dem AP1-Katalog 2025. SQL steht im AP2-Bereich, Struktogramm und PAP sind gestrichen. [[Prüfung AP1]]

> [!warning] Hier stehen die Antworten
> Zum Lernen [[Karten Software]] öffnen. Diese Datei ist nur zum Bearbeiten und Ergänzen da – Format: `Frage::Antwort`, eine Karte pro Zeile.

#flashcards/ap1/software

Wie berechnest du den Stellenwert einer Ziffer in einem Stellenwertsystem?::Ziffer × Basis^Position – die Position zählt von rechts ab 0
Wie rechnest du eine Dezimalzahl mit der Restwertmethode ins Binärsystem um?::Fortlaufend durch 2 teilen und die Reste von unten nach oben lesen
Wie rechnest du zwischen Binär und Hexadezimal um?::In Vierergruppen (Nibbles) von rechts – jede Gruppe ist eine Hex-Ziffer
Wie rechnest du zwischen Binär und Oktal um?::In Dreiergruppen von rechts – jede Gruppe ist eine Oktalziffer
Welchen Dezimalwert hat 0xFF?::255
Welchen Dezimalwert hat 0x7F?::127
Wie lautet die Dezimalzahl 200 im Binärsystem?::1100 1000
Wie bildest du das Zweierkomplement einer negativen Zahl?::Betrag binär darstellen → alle Bits invertieren → 1 addieren
Welchen Wertebereich hat eine vorzeichenbehaftete 8-Bit-Zahl?::−128 bis 127
Wie viele Zeichen umfasst ASCII und welchen Code hat „A“?::7 Bit, 128 Zeichen – „A“ = 65 = 0x41
Wie speichert UTF-8 Zeichen?::1 bis 4 Byte pro Zeichen, ASCII-kompatibel, deckt ganz Unicode ab
Was ist eine Magic Number bei Dateien?::Eine Byte-Signatur am Dateianfang, die den Dateityp verrät, z. B. %PDF, PK (ZIP), FF D8 FF (JPEG)
Welche Zahlenwerte haben die Linux-Rechte r, w und x?::r = 4 · w = 2 · x = 1
Wann liefert XOR eine 1?::Wenn die beiden Bits verschieden sind

Welche fünf Grundkonzepte hat die Programmierung?::Anweisung, Sequenz, Verzweigung, Wiederholung (Schleife), Funktion
Welchen Datentyp wählst du für eine Postleitzahl oder Telefonnummer – und warum?::String – führende Nullen bleiben erhalten und man rechnet nicht damit
Warum speichert man Geldbeträge nicht als float?::Wegen Rundungsfehlern (0,1 + 0,2 ≠ 0,3) – besser Decimal oder Cent als Ganzzahl
Was bedeuten „←“ und „=“ im Pseudocode?::„←“ ist eine Zuweisung, „=“ ein Vergleich
Was berechnen DIV und MOD?::DIV: ganzzahliger Anteil der Division · MOD: Rest der Division
Was ist der Unterschied zwischen kopf- und fußgesteuerter Schleife?::Kopfgesteuert: Prüfung vorher, eventuell 0 Durchläufe · fußgesteuert: Prüfung nachher, mindestens 1 Durchlauf
Welche Indizes hat eine Liste mit n Elementen?::0 bis n − 1
Womit initialisierst du die Variable für das Maximum einer Liste?::Mit dem ersten Element der Liste – nicht mit 0, sonst scheitert es bei negativen Werten
Was ist der Unterschied zwischen Parameter und Argument?::Parameter stehen in der Funktionsdefinition, Argumente sind die Werte beim Aufruf
Was bedeutet „Early Return“?::Die Funktion wird verlassen, sobald das Ergebnis feststeht
Was ist der Unterschied zwischen Klasse und Objekt?::Die Klasse ist der Bauplan, das Objekt eine konkrete Instanz davon

Wie wird eine Bedingung im UML-Aktivitätsdiagramm notiert?::In eckigen Klammern an der Kante, z. B. [x > 0]
Wie führst du einen Schreibtischtest durch?::Den Algorithmus von Hand ausführen – eine Spalte je Variable, eine Zeile je Schritt
Wie tauschst du die Werte zweier Variablen a und b?::Mit einer Hilfsvariablen: tmp ← a; a ← b; b ← tmp
Was unterscheidet lineare und binäre Suche?::Linear: bis zu n Vergleiche, funktioniert auch unsortiert · binär: etwa log₂ n Vergleiche, nur bei sortierten Daten
Wie funktioniert Bubble Sort und wie aufwendig ist er?::Benachbarte Elemente vergleichen und bei falscher Reihenfolge tauschen – Aufwand etwa n²
Woran unterscheidest du Syntax-, Laufzeit- und Logikfehler?::Syntaxfehler: Programm startet nicht · Laufzeitfehler: Absturz während der Ausführung · Logikfehler: falsches Ergebnis
Was macht man bei der Grenzwertanalyse?::Genau auf und direkt neben den Grenzen der Eingabebereiche testen
Was ist eine Äquivalenzklasse beim Testen?::Eine Gruppe von Eingaben, die gleich behandelt werden – ein Vertreter pro Klasse genügt
In welcher Reihenfolge laufen die Teststufen ab?::Komponenten-/Unittest → Integrationstest → Systemtest → Abnahmetest
Was ist ein Regressionstest?::Nach einer Änderung werden bestehende Tests erneut ausgeführt, um neue Fehler in altem Code zu finden
Was ist der Unterschied zwischen Black-Box- und White-Box-Test?::Black-Box: nach Spezifikation, ohne den Code zu kennen · White-Box: anhand des Quellcodes

Welche Aufgaben hat ein Betriebssystem?::Prozess-, Speicher-, Datei- und Geräteverwaltung (Treiber), Benutzer und Rechte, Benutzeroberfläche, Netzwerk
Welche Grenzen hat das Partitionsschema MBR?::Maximal 2 TiB pro Laufwerk und 4 primäre Partitionen
Welche Vorteile bietet GPT mit UEFI gegenüber MBR?::Sehr große Laufwerke, 128 Partitionen, Secure Boot, redundante Partitionstabelle
Welche Einschränkung hat FAT32?::Einzelne Dateien dürfen höchstens 4 GiB groß sein
Wofür eignet sich exFAT?::Für Wechseldatenträger – keine 4-GiB-Grenze und unter Windows, macOS und Linux nutzbar
Was bewirkt Journaling bei einem Dateisystem?::Änderungen werden zuerst protokolliert – nach einem Absturz bleibt das Dateisystem konsistent
Welches Recht gilt, wenn Freigabe- und NTFS-Rechte kombiniert werden?::Das restriktivere der beiden
Was gewinnt bei NTFS-Rechten: Verweigern oder Zulassen?::Verweigern
Was bedeutet das Least-Privilege-Prinzip?::Jeder bekommt nur die Rechte, die er für seine Aufgabe braucht
Welche Rechte ergeben sich aus chmod 750?::rwxr-x--- (Besitzer alles, Gruppe lesen und ausführen, andere nichts)
Warum ist Windows Home für Unternehmen ungeeignet?::Kein Domänenbeitritt, kein BitLocker, keine Gruppenrichtlinien

Was ist der Unterschied zwischen Hypervisor Typ 1 und Typ 2?::Typ 1 läuft direkt auf der Hardware (ESXi, Hyper-V, Proxmox) · Typ 2 läuft auf einem Wirtsbetriebssystem (VirtualBox, VMware Workstation)
Welche Vorteile bietet Servervirtualisierung?::Konsolidierung, Snapshots, Vorlagen, Hochverfügbarkeit/Live-Migration, Unabhängigkeit von der Hardware
Welches Risiko hat Virtualisierung ohne Cluster?::Der Host ist ein Single Point of Failure – fällt er aus, fallen alle VMs aus
Ist ein VM-Snapshot eine Datensicherung?::Nein – er liegt auf demselben Speicher und hängt von der Original-VM ab
Was unterscheidet eine VM von einem Container?::VM: eigenes Betriebssystem · Container: teilt sich den Kernel des Hosts, dadurch leicht und schnell
Was ist der Unterschied zwischen Terminalserver und VDI?::Terminalserver: ein Betriebssystem für viele Nutzer · VDI: eigene Desktop-VM je Nutzer
Was bedeuten IaaS, PaaS und SaaS?::IaaS: Infrastruktur · PaaS: Plattform (Laufzeitumgebung) · SaaS: fertige Anwendung – jeweils als Dienst
Was unterscheidet Public, Private und Hybrid Cloud?::Public: geteilte Ressourcen beim Anbieter · Private: exklusiv für ein Unternehmen · Hybrid: Kombination
Was prüfst du vor der Nutzung eines Cloud-Dienstes aus Datenschutzsicht?::Serverstandort EU, AVV, Verschlüsselung, Zertifikate (ISO 27001, BSI C5), SLA, Exit-Strategie

Was unterscheidet Standard- und Individualsoftware?::Standard: sofort verfügbar, günstig, erprobt · Individual: passgenau, aber teuer und meist per Werkvertrag
Was erwirbt man mit einer Softwarelizenz?::Ein Nutzungsrecht nach den Lizenzbedingungen (EULA) – nicht das Eigentum an der Software
Was ist eine OEM-Lizenz?::Eine Lizenz, die zusammen mit Hardware verkauft wird und an dieses Gerät gebunden ist
Was ist der Unterschied zwischen Named-User- und Concurrent-User-Lizenzen?::Named User: an eine bestimmte Person gebunden · Concurrent User: Anzahl gleichzeitiger Nutzungen
Was ist eine CAL?::Client Access License – berechtigt einen Benutzer oder ein Gerät zum Zugriff auf einen Server
Darf ein Unternehmen Freeware einfach einsetzen?::Nicht ohne Prüfung – viele Freeware-Lizenzen erlauben nur die private Nutzung
Was ist der Unterschied zwischen GPL und MIT-Lizenz?::GPL: Copyleft – Änderungen müssen unter GPL weitergegeben werden · MIT: permissiv, fast alles erlaubt
Welche Folgen hat Unterlizenzierung?::Rechtsverstoß – bei einem Audit drohen Nachzahlung und Schadensersatz

Welche Symbole verwendet ein ER-Modell in Chen-Notation?::Rechteck = Entitätstyp · Ellipse = Attribut (Schlüssel unterstrichen) · Raute = Beziehung · 1, n, m = Kardinalität
Wie bestimmst du eine Kardinalität sicher?::Die Beziehung in beide Richtungen als Satz lesen („Ein Kunde erteilt … Aufträge“, „Ein Auftrag wird von … Kunden erteilt“)
Wie setzt du eine 1:n-Beziehung in Tabellen um?::Der Primärschlüssel der 1-Seite kommt als Fremdschlüssel in die Tabelle der n-Seite
Wie setzt du eine n:m-Beziehung in Tabellen um?::Mit einer Zwischentabelle, die beide Primärschlüssel als Fremdschlüssel und die Beziehungsattribute enthält
Was ist der Unterschied zwischen Primär- und Fremdschlüssel?::Primärschlüssel identifiziert jede Zeile eindeutig · Fremdschlüssel verweist auf den Primärschlüssel einer anderen Tabelle
Welche Anomalien entstehen durch Redundanz?::Änderungs-, Einfüge- und Löschanomalie
Was verlangt die 1. Normalform?::Jede Zelle enthält nur einen atomaren Wert, keine Wiederholungsgruppen
Welche Aufgaben hat ein Datenbankmanagementsystem?::Datenintegrität, Mehrbenutzerbetrieb mit Transaktionen, Zugriffsschutz, Sicherung und Wiederherstellung, Abfragesprache SQL
Was zeigt ein UML-Anwendungsfalldiagramm – und was nicht?::Wer (Akteur) welche Funktionen des Systems nutzt – keine Reihenfolge und keine Technik
Was ist der Unterschied zwischen «include» und «extend»?::«include»: immer mit ausgeführt, Pfeil zum eingebundenen Fall · «extend»: optional, Pfeil zum Basisfall
Wie stellst du im Aktivitätsdiagramm Entscheidung und Parallelität dar?::Entscheidung: Raute mit [Bedingungen] an den Kanten · Parallelität: Gabelungs- und Vereinigungsbalken
Welche Sichtbarkeiten gibt es im Klassendiagramm?::+ public · − private · # protected · ~ package
Was ist der Unterschied zwischen Aggregation und Komposition?::Aggregation (hohle Raute): Teil existiert auch allein · Komposition (gefüllte Raute): Teil stirbt mit dem Ganzen
Was unterscheidet Compiler und Interpreter?::Compiler übersetzt das ganze Programm vor der Ausführung · Interpreter führt es Anweisung für Anweisung zur Laufzeit aus
Was ist eine API?::Eine festgelegte Programmierschnittstelle, über die Programme Daten oder Funktionen anderer Software nutzen
Was unterscheidet Wireframe, Mockup und Prototyp?::Wireframe: grobes Layout ohne Design · Mockup: gestaltet, statisch · Prototyp: klickbar

Was ist maschinelles Lernen?::Ein System erkennt Muster aus Trainingsdaten, statt fest programmierten Regeln zu folgen
Was ist eine Halluzination bei generativer KI?::eine überzeugend formulierte, aber falsche Ausgabe – Ergebnisse immer prüfen
Welche Vor- und Nachteile hat ein Chatbot im Kundenservice?::Vorteile: 24/7, entlastet, skalierbar · Nachteile: Fehlauskünfte, unpersönlich, Datenschutz, Übergabe an Menschen nötig
Was ist beim Datenschutz mit KI-Diensten zu beachten?::keine vertraulichen Daten in öffentliche Dienste, EU-Anbieter, AVV, keine Nutzung der Eingaben zum Training, Information der Betroffenen
Was verlangt der EU AI Act von Chatbots?::Transparenz – Nutzer müssen erkennen, dass sie mit einer KI kommunizieren
Wie nimmst du Mitarbeitenden die Sorge vor KI?::offen informieren, Betriebsrat einbinden, schulen, KI-Richtlinie, Pilotphase
Was unterscheidet ERP, CRM, SCM und DMS?::ERP: alle Geschäftsprozesse integriert · CRM: Kundenbeziehungen · SCM: Lieferkette · DMS: Dokumente revisionssicher ablegen
Welche Linux-Befehle zeigen Prozesse und durchsuchen Dateien?::ps aux bzw. top für Prozesse · grep für Suchbegriffe in Dateien
Was unterscheidet Prozess und Thread?::Prozess: laufendes Programm mit eigenem Speicher · Thread: Ausführungsstrang innerhalb eines Prozesses, teilt dessen Speicher
Was brauchst du, um einen PC in eine Domäne aufzunehmen?::Pro/Enterprise-Edition, DNS zeigt auf den Domänencontroller, Netzwerkverbindung, berechtigtes Konto, danach Neustart
Was bedeutet Härtung eines Betriebssystems?::Angriffsfläche verkleinern: unnötige Dienste und Konten entfernen, Standardpasswörter ändern, Updates, Firewall, Least Privilege
Welche Gateways gibt es in BPMN?::exklusiv (X): genau ein Weg · parallel (+): alle Wege · inklusiv (O): ein oder mehrere Wege
Was unterscheidet in BPMN Sequenz- und Nachrichtenfluss?::Sequenzfluss (durchgezogen) innerhalb eines Pools · Nachrichtenfluss (gestrichelt) zwischen Pools
Was prüft ein Lasttest?::das Verhalten unter der erwarteten Last, z. B. vielen gleichzeitigen Nutzern
