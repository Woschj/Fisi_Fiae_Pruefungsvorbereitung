---
bereich: Planen eines Softwareproduktes
tags: [ap2/kartenquelle, ap2/fiae]
---
# Kartenquelle Planen eines Softwareproduktes

> [!warning] Hier stehen die Antworten
> Zum Lernen [[Karten Planen eines Softwareproduktes]] öffnen. Diese Datei ist nur zum Bearbeiten und Ergänzen da – Format: `Frage::Antwort`, eine Karte pro Zeile.

#flashcards/ap2/fiae/planen

## FIAE-1 Projektmanagement in der Softwareentwicklung

Unterschied klassisches und agiles Vorgehen?::Klassisch: vollständige Planung vorab, Phasen nacheinander (Wasserfall) · agil: iterativ in kurzen Zyklen, Anforderungen dürfen sich ändern
Wann eignet sich das Wasserfallmodell?::Bei klaren, stabilen Anforderungen und festem Vertragsumfang
Welche Rollen gibt es in Scrum?::Product Owner, Scrum Master, Developers
Welche Artefakte gibt es in Scrum?::Product Backlog, Sprint Backlog, Inkrement
Welche Ereignisse gibt es in Scrum?::Sprint, Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective
Was ist ein Stakeholder?::Person oder Gruppe, die vom Projekt betroffen ist oder es beeinflussen kann
Was untersucht eine Machbarkeitsanalyse?::Technische, wirtschaftliche, rechtliche, personelle und zeitliche Umsetzbarkeit
Was ist ein Meilenstein?::Zeitpunkt, an dem ein wichtiges Zwischenergebnis überprüft wird (Dauer 0)
Was ist ein Change Request?::Formaler Antrag auf Änderung des vereinbarten Projektumfangs – wird bewertet und genehmigt
Was ist der kritische Pfad?::Folge von Vorgängen ohne Puffer – jede Verzögerung verschiebt das Projektende
Wie berechnest du den Gesamtpuffer?::SAZ − FAZ (bzw. SEZ − FEZ)
Wie berechnest du den freien Puffer?::Kleinstes FAZ der Nachfolger − eigenes FEZ
Was gehört in einen Projektabschluss?::Abnahme, Soll-Ist-Vergleich, Abschlussbericht, Lessons Learned, Übergabe/Dokumentation
Was sind Lessons Learned?::Gesammelte Erfahrungen aus dem Projekt, um künftige Projekte zu verbessern
Nennen Sie eine Methode zur Risikobewertung.::Risikomatrix: Eintrittswahrscheinlichkeit × Schadenshöhe

## FIAE-2 Anforderungen und Use Cases

Unterschied Lastenheft und Pflichtenheft?::Lastenheft: Anforderungen des Auftraggebers (Was?) · Pflichtenheft: Umsetzung durch den Auftragnehmer (Wie?)
Unterschied funktionale und nichtfunktionale Anforderung?::Funktional: was das System tun soll · nichtfunktional: wie gut (Leistung, Sicherheit, Benutzbarkeit)
Nennen Sie vier Qualitätsmerkmale nach ISO/IEC 25010.::Funktionale Eignung, Leistungseffizienz, Kompatibilität, Benutzbarkeit, Zuverlässigkeit, Sicherheit, Wartbarkeit, Übertragbarkeit
Was zeigt ein Use-Case-Diagramm?::Akteure, Anwendungsfälle und ihre Beziehungen innerhalb der Systemgrenze – das Was, nicht das Wie
Was bedeutet «include»?::Der Basisfall enthält den eingebundenen Fall immer; Pfeil zeigt zum eingebundenen Fall
Was bedeutet «extend»?::Der erweiternde Fall kommt optional unter einer Bedingung hinzu; Pfeil zeigt zum Basisfall
Wie werden Akteure vererbt?::Generalisierungspfeil (leere Dreiecksspitze) vom speziellen zum allgemeinen Akteur – der spezielle erbt alle Anwendungsfälle
Was gehört in eine Anwendungsfallbeschreibung?::Name, Akteure, Vorbedingung, Auslöser, Ablauf, Alternativen, Nachbedingung
Wie ist eine User Story aufgebaut?::Als [Rolle] möchte ich [Ziel], damit [Nutzen] – plus Akzeptanzkriterien
Was sind Akzeptanzkriterien?::Prüfbare Bedingungen, wann eine Anforderung erfüllt ist
Was ist die E-Rechnung?::Strukturierte elektronische Rechnung (z. B. XRechnung, ZUGFeRD), die maschinell verarbeitet werden kann – im B2B-Bereich schrittweise Pflicht

## FIAE-3 UML Aktivität, Sequenz und Zustand

Was zeigt ein Aktivitätsdiagramm?::Ablauf eines Prozesses mit Aktionen, Entscheidungen und Parallelität
Was bedeutet ein Gabelungsbalken (Fork)?::Ab hier laufen mehrere Abläufe parallel
Was bedeutet ein Vereinigungsbalken (Join)?::Wartet, bis alle parallelen Abläufe fertig sind
Wie werden Bedingungen an Kanten notiert?::In eckigen Klammern als Wächter, z. B. [Betrag > 100]
Wozu Swimlanes (Partitionen)?::Zeigen, wer eine Aktion ausführt
Was zeigt ein Sequenzdiagramm?::Nachrichtenaustausch zwischen Objekten in zeitlicher Reihenfolge
Unterschied synchrone und asynchrone Nachricht?::Synchron: gefüllte Pfeilspitze, Sender wartet auf Antwort · asynchron: offene Pfeilspitze, Sender wartet nicht
Wie wird eine Antwort im Sequenzdiagramm dargestellt?::Gestrichelter Pfeil mit offener Spitze
Was bedeutet ein alt-Fragment?::Alternativen – je nach Wächter wird genau ein Bereich ausgeführt
Was bedeuten opt- und loop-Fragment?::opt: optional, nur wenn Bedingung wahr · loop: Wiederholung
Was zeigt ein Zustandsdiagramm?::Zustände eines Objekts und die Übergänge durch Ereignisse
Wie wird ein Übergang beschriftet?::Ereignis [Bedingung] / Aktion
Was bedeuten entry, do und exit?::entry: beim Betreten · do: solange im Zustand · exit: beim Verlassen

## FIAE-4 Objektorientierter Entwurf und Entwurfsmuster

Was bedeuten +, − und # im Klassendiagramm?::public, private, protected
Wie wird ein statisches Attribut dargestellt?::Unterstrichen
Wie wird eine abstrakte Klasse dargestellt?::Name kursiv oder mit {abstract}
Unterschied Aggregation und Komposition?::Aggregation (leere Raute): Teile können allein existieren · Komposition (gefüllte Raute): Teile existieren nur mit dem Ganzen
Was bedeutet die Multiplizität 1..*?::Mindestens eins, beliebig viele
Unterschied abstrakte Klasse und Interface?::Abstrakte Klasse: Attribute und Implementierungen möglich, nur einfache Vererbung · Interface: reiner Vertrag, mehrere implementierbar
Was ist Polymorphie?::Gleicher Methodenaufruf führt je nach Objekttyp zu unterschiedlichem Verhalten
In welche drei Kategorien teilt man Entwurfsmuster?::Erzeugungs-, Struktur- und Verhaltensmuster
Wozu dient das Observer-Muster?::Beobachter werden automatisch benachrichtigt, wenn sich der Zustand eines Subjekts ändert
Wozu dient das Singleton-Muster?::Es gibt genau eine Instanz einer Klasse mit globalem Zugriffspunkt
Wozu dient die Factory Method?::Objekterzeugung wird in eine Methode ausgelagert; Unterklassen entscheiden, welche Klasse erzeugt wird
Wozu dient das Adapter-Muster?::Passt eine vorhandene Schnittstelle an eine erwartete an
Wozu dient das Strategy-Muster?::Austauschbare Algorithmen hinter einer gemeinsamen Schnittstelle
Was ist MVC?::Model (Daten/Logik), View (Darstellung), Controller (Eingaben) – Trennung der Verantwortlichkeiten
Nennen Sie zwei Vorteile von Entwurfsmustern.::Bewährte Lösungen, gemeinsame Sprache im Team, wartbarer und erweiterbarer Code

## FIAE-5 Datenmodellierung und Normalisierung

Was ist eine Änderungsanomalie?::Redundante Daten müssen an mehreren Stellen geändert werden – sonst inkonsistent
Was ist eine Einfügeanomalie?::Daten können nicht gespeichert werden, ohne andere, noch nicht vorhandene Daten einzugeben
Was ist eine Löschanomalie?::Beim Löschen eines Datensatzes gehen ungewollt andere Informationen verloren
Was fordert die 1. Normalform?::Alle Attribute atomar, keine Wiederholungsgruppen
Was fordert die 2. Normalform?::1. NF und jedes Nichtschlüsselattribut hängt vom gesamten Primärschlüssel ab
Was fordert die 3. Normalform?::2. NF und keine transitiven Abhängigkeiten zwischen Nichtschlüsselattributen
Wie wird eine 1:n-Beziehung in Tabellen umgesetzt?::Fremdschlüssel auf der n-Seite
Wie wird eine m:n-Beziehung umgesetzt?::Zwischentabelle mit beiden Fremdschlüsseln (meist zusammengesetzter Primärschlüssel)
Was bedeutet die Kardinalität 1:1?::Jedem Datensatz ist höchstens ein Datensatz der anderen Tabelle zugeordnet
Nennen Sie drei Merkmale von Datenqualität.::Vollständigkeit, Korrektheit, Konsistenz, Aktualität, Eindeutigkeit (keine Dubletten)
Wann ist eine NoSQL-Datenbank sinnvoll?::Große, schnell wachsende oder unstrukturierte Datenmengen, hoher Schreibdurchsatz, horizontale Skalierung
Was bedeutet ACID?::Atomarität, Konsistenz, Isolation, Dauerhaftigkeit von Transaktionen

## FIAE-6 Benutzeroberflächen, Barrierefreiheit und Usability

Unterschied Wireframe, Mockup und Prototyp?::Wireframe: grobe Struktur · Mockup: detaillierte, statische Gestaltung · Prototyp: klickbar/funktional
Nennen Sie drei Grundsätze der Dialoggestaltung nach DIN EN ISO 9241-110.::Aufgabenangemessenheit, Selbstbeschreibungsfähigkeit, Erwartungskonformität, Erlernbarkeit, Steuerbarkeit, Robustheit gegen Benutzungsfehler, Benutzerbindung
Wann Radiobuttons, wann Checkboxen?::Radiobuttons: genau eine Auswahl · Checkboxen: beliebig viele
Wann eine Dropdown-Liste?::Viele Auswahlmöglichkeiten bei wenig Platz, genau eine Auswahl
Wie wird Usability getestet?::Usability-Test mit echten Nutzern (Thinking Aloud), A/B-Test, Heuristische Evaluation, Eyetracking
Welches Gesetz fordert seit Juni 2025 barrierefreie digitale Angebote?::Das Barrierefreiheitsstärkungsgesetz (BFSG)
Welche Richtlinie beschreibt barrierefreie Webinhalte?::WCAG (Web Content Accessibility Guidelines), umgesetzt in der EN 301 549 / BITV 2.0
Nennen Sie die vier WCAG-Prinzipien.::Wahrnehmbar, bedienbar, verständlich, robust
Welcher Mindestkontrast gilt für normalen Text?::4,5 : 1 (WCAG AA)
Nennen Sie drei Maßnahmen für Barrierefreiheit.::Alternativtexte, Tastaturbedienbarkeit, ausreichender Kontrast, skalierbare Schrift, Information nicht nur über Farbe, Untertitel
Was bedeutet responsives Design?::Layout passt sich an Bildschirmgröße und Gerät an

## FIAE-7 Schnittstellen, Web und Architektur

Was bedeutet REST?::Representational State Transfer – zustandslose Schnittstelle, Ressourcen über URIs, Operationen über HTTP-Methoden
Welche HTTP-Methoden gehören zu CRUD?::Create – POST · Read – GET · Update – PUT/PATCH · Delete – DELETE
Unterschied PUT und PATCH?::PUT ersetzt die Ressource vollständig · PATCH ändert Teile
Was bedeutet idempotent?::Mehrfaches Ausführen hat dieselbe Wirkung wie einmaliges (GET, PUT, DELETE – nicht POST)
Bedeutung der Statuscode-Klassen?::1xx Info · 2xx Erfolg · 3xx Umleitung · 4xx Clientfehler · 5xx Serverfehler
Unterschied 401 und 403?::401: nicht authentifiziert · 403: authentifiziert, aber keine Berechtigung
Aus welchen Teilen besteht ein HTTP-Request?::Request-Zeile (Methode, Pfad, Version), Header, Leerzeile, optional Body
Unterschied wohlgeformtes und gültiges XML?::Wohlgeformt: Syntaxregeln eingehalten · gültig: entspricht zusätzlich einer XSD/DTD
Vorteile von JSON gegenüber XML?::Kompakter, leichter lesbar, direkt in JavaScript nutzbar
Was ist eine Microservice-Architektur?::Anwendung aus kleinen, unabhängig deploybaren Diensten mit eigenen Daten, Kommunikation über APIs
Was ist CI/CD?::Continuous Integration (automatisch bauen/testen bei jedem Commit) und Continuous Delivery/Deployment (automatisch ausliefern)
Wozu dient Versionsverwaltung wie Git?::Änderungen nachvollziehen, parallel arbeiten (Branches), zusammenführen, frühere Stände wiederherstellen
Unterschied Compiler und Interpreter?::Compiler übersetzt vorab das ganze Programm in Maschinencode · Interpreter führt den Quelltext zur Laufzeit Anweisung für Anweisung aus
Was ist LPWAN?::Low Power Wide Area Network (z. B. LoRaWAN) – große Reichweite, wenig Energie, geringe Datenrate für IoT-Sensoren

## FIAE-8 Sicherheit in der Softwareentwicklung

Warum Passwörter nicht mit schnellem Hash wie SHA-256 allein speichern?::Zu schnell berechenbar – Brute-Force/Rainbow Tables; besser Argon2, bcrypt, PBKDF2 mit Salt
Was ist ein Salt?::Zufallswert je Passwort, der vor dem Hashen angehängt und mitgespeichert wird – gleiche Passwörter ergeben verschiedene Hashes
Was ist ein Pepper?::Geheimer, nicht in der Datenbank gespeicherter Zusatzwert für alle Passwörter
Wie verhinderst du SQL-Injection?::Prepared Statements mit Parametern, Eingabevalidierung, minimale DB-Rechte
Was ist Cross-Site-Scripting (XSS)?::Eingeschleustes JavaScript wird im Browser anderer Nutzer ausgeführt – Schutz durch Kontext-Escaping der Ausgabe, CSP
Was ist CSRF?::Fremde Seite löst Aktionen im Namen eines angemeldeten Nutzers aus – Schutz durch CSRF-Token, SameSite-Cookies
Womit wird die Integrität einer Nachricht gesichert?::Hash bzw. HMAC oder digitale Signatur
Womit wird die Authentizität des Absenders nachgewiesen?::Digitale Signatur mit dem privaten Schlüssel, geprüft über ein Zertifikat
Was bedeutet Privacy by Design?::Datenschutz schon in Entwurf und Architektur berücksichtigen (Art. 25 DSGVO)
Was bedeutet Privacy by Default?::Datenschutzfreundliche Voreinstellungen – nur notwendige Daten, Freigaben standardmäßig aus
Was bedeutet Datenminimierung?::Nur die für den Zweck nötigen personenbezogenen Daten erheben und speichern
Welche Anforderungen gelten für eine wirksame Einwilligung?::Freiwillig, informiert, für einen bestimmten Zweck, eindeutig (aktive Handlung), jederzeit widerrufbar
Was ist Code-Signing?::Signieren von Software, damit Nutzer Herkunft und Unverändertheit prüfen können
