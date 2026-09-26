---
bereich: IT-Sicherheit
tags: [ap1/kartenquelle]
---
# Kartenquelle IT-Sicherheit

> [!warning] Hier stehen die Antworten
> Zum Lernen [[Karten IT-Sicherheit]] öffnen. Diese Datei ist nur zum Bearbeiten und Ergänzen da – Format: `Frage::Antwort`, eine Karte pro Zeile.

#flashcards/ap1/sicherheit

Welche drei Grundwerte hat die Informationssicherheit?::Vertraulichkeit, Integrität, Verfügbarkeit
Was bedeutet das Schutzziel Vertraulichkeit?::Nur Berechtigte haben Zugang zu den Informationen
Was bedeutet das Schutzziel Integrität?::Daten sind korrekt und unverändert – Änderungen sind erkennbar
Was bedeutet das Schutzziel Verfügbarkeit?::Systeme und Daten sind nutzbar, wenn sie gebraucht werden
Was bedeutet Authentizität?::Die Echtheit eines Absenders bzw. von Daten ist nachweisbar
Was bedeutet Verbindlichkeit bzw. Nichtabstreitbarkeit?::Eine Handlung kann später nicht geleugnet werden
Wie wird ein Risiko bewertet?::Eintrittswahrscheinlichkeit × Schadenshöhe
Welche vier Möglichkeiten gibt es, mit einem Risiko umzugehen?::Vermeiden, vermindern, übertragen (z. B. Versicherung), akzeptieren
Welche Schutzbedarfskategorien nennt das BSI?::Normal, hoch, sehr hoch
Was besagt das Maximumprinzip bei der Schutzbedarfsfeststellung?::Ein System erbt den höchsten Schutzbedarf der Anwendungen, die darauf laufen
Was ist der Kumulationseffekt?::Viele Anwendungen mit normalem Schutzbedarf zusammen können einen höheren Schutzbedarf ergeben
Was ist der Verteilungseffekt?::Redundanz (z. B. zweiter Server) senkt den Schutzbedarf des einzelnen Systems
Worum geht es in den BSI-Standards 200-1 bis 200-4?::200-1 ISMS · 200-2 Grundschutz-Methodik · 200-3 Risikoanalyse · 200-4 Business Continuity Management
Was ist der Unterschied zwischen MUSS- und SOLLTE-Anforderungen im IT-Grundschutz?::MUSS ist zwingend · SOLLTE ist der Regelfall – Abweichung nur mit Begründung
Welche vier Arten von Sicherheitsmaßnahmen unterscheidet man?::Technisch, organisatorisch, personell, infrastrukturell
Was ist der Unterschied zwischen Informationssicherheit und Datenschutz?::Informationssicherheit schützt alle Informationen · Datenschutz schützt Personen bzw. ihre personenbezogenen Daten

Was sind personenbezogene Daten?::Informationen über eine identifizierte oder identifizierbare natürliche Person – auch eine IP-Adresse
Welche Daten gehören zu den besonderen Kategorien nach Art. 9 DSGVO?::Gesundheit, Religion, ethnische Herkunft, politische Meinung, Gewerkschaftszugehörigkeit, Biometrie, Genetik, Sexualleben
Welche Grundsätze nennt Art. 5 DSGVO?::Rechtmäßigkeit/Transparenz, Zweckbindung, Datenminimierung, Richtigkeit, Speicherbegrenzung, Integrität/Vertraulichkeit, Rechenschaftspflicht
Auf welchen Rechtsgrundlagen darf man nach Art. 6 DSGVO Daten verarbeiten?::Einwilligung, Vertrag, rechtliche Pflicht, lebenswichtige Interessen, öffentliche Aufgabe, berechtigtes Interesse
Welche Rechte haben Betroffene nach der DSGVO?::Auskunft (Art. 15), Berichtigung (16), Löschung (17), Einschränkung (18), Datenübertragbarkeit (20), Widerspruch (21)
Innerhalb welcher Frist muss eine Datenpanne gemeldet werden – und an wen?::Innerhalb von 72 Stunden an die Aufsichtsbehörde (Art. 33 DSGVO)
Wann brauchst du einen Auftragsverarbeitungsvertrag (AVV)?::Wenn ein Dienstleister personenbezogene Daten im Auftrag verarbeitet (Art. 28 DSGVO), z. B. Cloud- oder Wartungsanbieter
Ab wann muss ein Unternehmen einen Datenschutzbeauftragten benennen?::In der Regel ab 20 Personen, die ständig mit automatisierter Verarbeitung personenbezogener Daten beschäftigt sind (§ 38 BDSG)
Wie hoch können Bußgelder nach der DSGVO sein?::Bis 20 Mio. € oder 4 % des weltweiten Jahresumsatzes – je nachdem, was höher ist
Was ist der Unterschied zwischen Pseudonymisierung und Anonymisierung?::Pseudonymisiert: Personenbezug mit Zusatzwissen wiederherstellbar, bleibt personenbezogen · Anonymisiert: Bezug dauerhaft entfernt
Was unterscheidet Zutritts-, Zugangs- und Zugriffskontrolle?::Zutritt: zu Räumen · Zugang: zu Systemen · Zugriff: auf Daten
Was ist Weitergabekontrolle?::Schutz der Daten bei Übertragung und Transport, z. B. durch VPN, TLS oder verschlüsselte Datenträger
Was ist Eingabekontrolle?::Nachvollziehbarkeit, wer wann welche Daten eingegeben oder geändert hat – durch Protokollierung
Was verlangt das Trennungsgebot?::Daten, die zu unterschiedlichen Zwecken erhoben wurden, getrennt verarbeiten
Nach welchem Schema prüfst du einen Datenschutzvorfall in der Prüfung?::Welche Daten sind betroffen → welche Meldepflichten bestehen → welche Maßnahmen verhindern Wiederholung

Was sichert eine Vollsicherung und was brauchst du zur Wiederherstellung?::Alle Daten – zur Wiederherstellung reicht die letzte Vollsicherung
Was sichert eine differenzielle Sicherung und wie wird wiederhergestellt?::Alle Änderungen seit der letzten Vollsicherung – Restore: Vollsicherung + letzte differenzielle
Was sichert eine inkrementelle Sicherung und wie wird wiederhergestellt?::Nur Änderungen seit der letzten Sicherung jeder Art – Restore: Vollsicherung + alle Inkremente in Reihenfolge
Was besagt die 3-2-1-Regel der Datensicherung?::3 Kopien der Daten, auf 2 verschiedenen Medien, 1 davon außer Haus (erweitert: +1 offline/unveränderbar, 0 Fehler beim Restore-Test)
Wie funktioniert das Generationenprinzip?::Sohn: tägliche Sicherung · Vater: wöchentliche · Großvater: monatliche – ältere Generationen werden rotierend überschrieben
Was gibt der RPO an?::Recovery Point Objective – maximal tolerierbarer Datenverlust; bestimmt, wie oft gesichert wird
Was gibt der RTO an?::Recovery Time Objective – maximal tolerierbare Ausfallzeit; bestimmt das Wiederherstellungsverfahren
Warum sind Restore-Tests unverzichtbar?::Nur eine erfolgreiche Wiederherstellung beweist, dass das Backup funktioniert
Was ist der Unterschied zwischen Backup und Archivierung?::Backup: für die Wiederherstellung · Archivierung: langfristige, unveränderbare Aufbewahrung (z. B. wegen Aufbewahrungspflichten)
Welche Vorteile haben LTO-Bänder für die Datensicherung?::Günstig pro TB, langlebig, offline lagerbar (Air Gap gegen Ransomware)

Wie funktioniert symmetrische Verschlüsselung?::Ein gemeinsamer Schlüssel zum Ver- und Entschlüsseln – schnell, aber der Schlüsselaustausch ist das Problem; z. B. AES
Wie funktioniert asymmetrische Verschlüsselung?::Schlüsselpaar aus öffentlichem und privatem Schlüssel – löst den Schlüsselaustausch, ist aber langsam; z. B. RSA, ECC
Wie viele Schlüssel brauchen n Personen symmetrisch bzw. asymmetrisch?::Symmetrisch n·(n − 1) ÷ 2 · asymmetrisch 2n
Mit welchem Schlüssel verschlüsselst du eine vertrauliche Nachricht an Bob?::Mit Bobs öffentlichem Schlüssel – nur Bobs privater Schlüssel kann sie entschlüsseln
Mit welchem Schlüssel wird eine Nachricht signiert?::Mit dem eigenen privaten Schlüssel – geprüft wird mit dem öffentlichen Schlüssel
Was ist hybride Verschlüsselung und wo wird sie eingesetzt?::Asymmetrischer Austausch eines Sitzungsschlüssels + symmetrische Verschlüsselung der Daten – z. B. TLS, VPN, S/MIME
Welche Eigenschaften hat eine kryptografische Hashfunktion?::Einwegfunktion, feste Ausgabelänge, Lawineneffekt – SHA-256 gilt als sicher, MD5 und SHA-1 nicht mehr
Wie sollen Passwörter gespeichert werden?::Gehasht mit Salt und einem langsamen Verfahren wie Argon2, bcrypt oder PBKDF2 – nie im Klartext
Welche Schutzziele sichert eine digitale Signatur – und welches nicht?::Integrität, Authentizität, Nichtabstreitbarkeit – aber nicht Vertraulichkeit
Was bestätigt ein digitales Zertifikat?::Dass ein öffentlicher Schlüssel zu einer bestimmten Identität gehört – signiert von einer Zertifizierungsstelle (CA), Format X.509
Aus welchen Bestandteilen besteht eine PKI?::Zertifizierungsstelle (CA), Registrierungsstelle, Verzeichnisdienst, Sperrlisten (CRL/OCSP)
Was ist der Unterschied zwischen Transport- und Ende-zu-Ende-Verschlüsselung?::Transport: der Server kann mitlesen · Ende-zu-Ende: nur Absender und Empfänger können lesen

Wie verbreitet sich ein Virus?::Er hängt sich an eine Wirtsdatei und wird aktiv, wenn diese ausgeführt wird
Wie verbreitet sich ein Wurm?::Selbstständig über Netzwerke, ohne Wirtsdatei und ohne Zutun des Nutzers
Was ist ein Trojaner?::Schadsoftware, die sich als nützliches Programm tarnt und z. B. eine Hintertür öffnet
Was macht Ransomware?::Sie verschlüsselt Daten und erpresst Lösegeld – oft werden die Daten zusätzlich gestohlen
Was ist ein Rootkit?::Schadsoftware, die sich tief im System versteckt und ihre Spuren verschleiert
Was ist ein Botnetz?::Ein Netz ferngesteuerter, infizierter Rechner – genutzt für Spam oder DDoS-Angriffe
Was ist eine Zero-Day-Lücke?::Eine Sicherheitslücke, für die es noch kein Update gibt
Was ist der Unterschied zwischen Phishing und Spear-Phishing?::Phishing: massenhaft gefälschte Nachrichten · Spear-Phishing: gezielt auf eine bestimmte Person zugeschnitten
Wie schützt man sich gegen CEO-Fraud?::Rückruf über eine bekannte Nummer, Vier-Augen-Prinzip bei Zahlungen, Mitarbeitende sensibilisieren
Was ist Credential Stuffing?::Angreifer probieren geleakte Zugangsdaten automatisiert bei anderen Diensten aus
Wie schützt man eine Anwendung vor SQL-Injection?::Prepared Statements (parametrisierte Abfragen) und Eingabevalidierung
Welche drei Faktoren der Authentifizierung gibt es?::Wissen (Passwort), Besitz (Token, Smartphone), Sein (Biometrie)
Wann ist eine Anmeldung eine echte Mehrfaktor-Authentifizierung?::Wenn mindestens zwei Faktoren aus verschiedenen Kategorien kombiniert werden
Was empfiehlt das BSI heute für Passwörter?::Lang und einzigartig, Passwortmanager nutzen, nur bei Verdacht wechseln, zusätzlich MFA
Was macht eine Stateful-Inspection-Firewall?::Sie merkt sich Verbindungszustände und lässt nur Antworten auf bestehende Verbindungen durch
Was bedeutet Default Deny bei Firewalls?::Alles ist verboten, nur ausdrücklich Benötigtes wird erlaubt
Was sind die ersten Schritte bei einem Ransomware-Befall?::Betroffene Systeme vom Netz trennen (nicht ausschalten), Vorfall melden, dokumentieren – kein Lösegeld zahlen

Was ist Cross-Site Scripting (XSS)?::eingeschleuster Skriptcode wird im Browser anderer Nutzer ausgeführt – Schutz: Ausgaben maskieren, Content Security Policy
Was ist CSRF und wie schützt man sich?::eine fremde Seite löst Aktionen im Namen eines eingeloggten Nutzers aus – Schutz: CSRF-Token, SameSite-Cookies
Was bedeuten Security by Design und Security by Default?::Sicherheit von Anfang an einplanen · sichere Voreinstellungen bei Auslieferung
Was unterscheidet Hot und Cold Backup?::Hot: im laufenden Betrieb · Cold: Dienst angehalten, konsistent, aber mit Ausfallzeit
