---
bereich: IT-Sicherheit
tags: [ap1/aufgaben, ap1/sicherheit]
---
# Aufgaben IT-Sicherheit

★ Einstieg · ★★ Prüfungsniveau · ★★★ anspruchsvoll. Rechenaufgaben (Backup, Schlüssel, Passwörter): [[Trainer#IT-Sicherheit]].

> [!info] Ausgangssituation
> Die **Physiotherapie-Praxis Sonnenhof** (fiktiv, 3 Standorte, 25 Mitarbeitende) verwaltet Termine, Befunde und Abrechnungen digital. Nach einem Phishing-Vorfall bei einer Nachbarpraxis soll die IT-Sicherheit überprüft werden.

---

## I1 Informationssicherheit und IT-Grundschutz

### I1.1 ★ – Schutzziele (6 Punkte)
📘 **Nachlernen:** [[I1 Informationssicherheit und IT-Grundschutz#1. Schutzziele|I1 › Schutzziele]]

Ordne jedem Vorfall das hauptsächlich verletzte Schutzziel zu: a) Der Terminkalender ist nach einem Serverabsturz einen Tag nicht erreichbar. b) Eine Mitarbeiterin liest aus Neugier Befunde von Bekannten. c) Ein Trojaner verändert Beträge in Abrechnungsdateien. d) Ein Stromausfall legt das Netzwerk lahm. e) Befunde werden per unverschlüsselter Mail verschickt und abgefangen. f) Eine gefälschte Mail gibt sich als Krankenkasse aus.

> [!success]- Lösung
> a) Verfügbarkeit · b) Vertraulichkeit · c) Integrität · d) Verfügbarkeit · e) Vertraulichkeit · f) Authentizität (je 1 P)

### I1.2 ★★ – Schutzbedarf (8 Punkte)
📘 **Nachlernen:** [[I1 Informationssicherheit und IT-Grundschutz#3. Schutzbedarfsfeststellung (BSI-Standard 200-2)|I1 › Schutzbedarfsfeststellung]] · [[I1 Informationssicherheit und IT-Grundschutz#Vererbung auf IT-Systeme|I1 › Vererbung auf IT-Systeme]]

Auf einem Server laufen: Terminplanung (V normal, I hoch, A hoch), Patientenakte mit Befunden (V sehr hoch, I sehr hoch, A hoch), Intranet (alle normal).
a) Bestimme den Schutzbedarf des Servers und nenne das Prinzip. b) Begründe den Schutzbedarf „sehr hoch“ der Patientenakte mit zwei Schadensszenarien. c) Wie könnte man den Verfügbarkeitsbedarf des einzelnen Servers senken?

> [!success]- Lösung
> a) **Maximumprinzip**: V sehr hoch, I sehr hoch, A hoch. (3 P)
> b) Verstoß gegen Gesetze (DSGVO Art. 9 – Gesundheitsdaten, ärztliche Schweigepflicht) · Beeinträchtigung des informationellen Selbstbestimmungsrechts der Patient:innen · Gefahr für die Gesundheit durch falsche Befunde · Imageschaden/Vertrauensverlust (je 1,5 P, zwei nötig)
> c) **Verteilungseffekt**: Anwendung redundant auf mehreren Servern/im Cluster betreiben, damit der Ausfall eines einzelnen Systems den Betrieb nicht stoppt. (2 P)

### I1.3 ★★ – Maßnahmenarten (8 Punkte)
📘 **Nachlernen:** [[I1 Informationssicherheit und IT-Grundschutz#5. Maßnahmenarten|I1 › Maßnahmenarten]]

Nenne für die Praxis je zwei Maßnahmen der Kategorien technisch, organisatorisch, personell und infrastrukturell.

> [!success]- Lösung (je 1 P)
> - **technisch:** MFA für den Fernzugriff, Festplattenverschlüsselung, Backup, Firewall, Patchmanagement
> - **organisatorisch:** Rechtekonzept (Need-to-know), Sicherheitsleitlinie, Notfallplan, Vier-Augen-Prinzip bei Abrechnungen
> - **personell:** Awareness-Schulung (Phishing), Verpflichtung auf Vertraulichkeit, Prozess für Ein- und Austritt
> - **infrastrukturell:** abschließbarer Serverraum, USV, Brandschutz, Bildschirme nicht zum Wartebereich ausrichten

### I1.4 ★★ – IT-Grundschutz (6 Punkte)
📘 **Nachlernen:** [[I1 Informationssicherheit und IT-Grundschutz#4. IT-Grundschutz des BSI|I1 › IT-Grundschutz des BSI]]

Die Praxisleitung will „nach BSI-Grundschutz“ vorgehen. Beschreibe die Grundidee und den Unterschied zwischen MUSS- und SOLLTE-Anforderungen.

> [!success]- Lösung
> Grundidee: Mit **Standardmaßnahmen** aus dem **IT-Grundschutz-Kompendium** (Bausteine für typische Prozesse, Systeme, Räume) ein angemessenes Sicherheitsniveau erreichen, ohne jedes Risiko einzeln zu analysieren; Prüfung per **Soll-Ist-Vergleich** (Grundschutz-Check); zusätzliche Risikoanalyse nur bei hohem Schutzbedarf. (4 P)
> **MUSS**: zwingend umzusetzen · **SOLLTE**: grundsätzlich umzusetzen; Abweichung nur mit stichhaltiger, dokumentierter Begründung. (2 P)

---

## I2 Datenschutz

### I2.1 ★★ – TOM zuordnen (8 Punkte)
📘 **Nachlernen:** [[I2 Datenschutz#6. Technische und organisatorische Maßnahmen (TOM)|I2 › Technische und organisatorische Maßnahmen]]

Ordne die Maßnahmen der passenden Kontrollart zu: a) Besucher melden sich am Empfang an und werden begleitet. b) Anmeldung am PC mit Chipkarte und PIN. c) Therapeut:innen sehen nur Akten ihrer eigenen Patient:innen. d) Befunde werden per verschlüsseltem Portal an Ärzte übermittelt. e) Änderungen an Akten werden protokolliert. f) Tägliche Datensicherung. g) Vertrag mit dem Abrechnungsdienstleister regelt Weisungen und Kontrollen. h) Test- und Echtdaten liegen in getrennten Datenbanken.

> [!success]- Lösung (je 1 P)
> a) Zutritt · b) Zugang · c) Zugriff · d) Weitergabe · e) Eingabe · f) Verfügbarkeit · g) Auftrag · h) Trennungsgebot

### I2.2 ★★ – Datenpanne (10 Punkte)
📘 **Nachlernen:** [[I2 Datenschutz#7. Prüfschema bei einem Datenschutzvorfall|I2 › Prüfschema bei einem Datenschutzvorfall]] · [[I2 Datenschutz#5. Pflichten des Unternehmens|I2 › Pflichten des Unternehmens]]

Eine Rezeptionistin verschickt eine Excel-Datei mit Namen, Telefonnummern und Diagnosen von 180 Patient:innen versehentlich an einen externen Newsletter-Verteiler. Prüfe den Fall strukturiert.

> [!success]- Lösung
> **1. Betroffene Daten (4 P):** Namen, Telefonnummern = personenbezogen; **Diagnosen = Gesundheitsdaten (Art. 9)**, besonders schützenswert; 180 Betroffene; Vertraulichkeit verletzt; unzulässige Offenlegung ohne Rechtsgrundlage; hohes Risiko (Diskriminierung, Bloßstellung).
> **2. Meldepflichten (3 P):** Meldung an die **Datenschutz-Aufsichtsbehörde binnen 72 Stunden**; wegen hohen Risikos **Benachrichtigung der Betroffenen** (Art. 34); **Datenschutzbeauftragte:n** einbinden; Empfänger um Löschung bitten; Vorfall dokumentieren.
> **3. Prävention (3 P):** keine Patientenlisten per Mail, stattdessen berechtigungsgeschütztes System; Verteiler nur per BCC bzw. Newsletter-Tool; DLP-Regeln/Warnhinweis bei externen Empfängern; Datenminimierung (Diagnosen nicht in Kontaktlisten); **Schulung**.

### I2.3 ★ – Begriffe (4 Punkte)
📘 **Nachlernen:** [[I2 Datenschutz#1. Rechtlicher Rahmen und Begriffe|I2 › Rechtlicher Rahmen und Begriffe]]

Erkläre den Unterschied zwischen Pseudonymisierung und Anonymisierung am Beispiel einer Auswertung der Behandlungsdauer.

> [!success]- Lösung
> **Pseudonymisierung:** Namen werden durch eine Patienten-ID ersetzt, die Zuordnungstabelle liegt getrennt – mit ihr ist der Personenbezug wiederherstellbar → **weiterhin personenbezogen**, DSGVO gilt. (2 P)
> **Anonymisierung:** Personenbezug dauerhaft entfernt (z. B. nur Durchschnittswerte je Behandlungsart, keine IDs) → **nicht mehr personenbezogen**, DSGVO gilt nicht. (2 P)

### I2.4 ★★ – Rechte und Pflichten (6 Punkte)
📘 **Nachlernen:** [[I2 Datenschutz#4. Rechte der Betroffenen|I2 › Rechte der Betroffenen]] · [[I2 Datenschutz#3. Rechtsgrundlagen (Art. 6 Abs. 1) – mindestens eine muss vorliegen|I2 › Rechtsgrundlagen (Art. 6 Abs. 1) – mindestens eine muss vorliegen]]

Ein ehemaliger Patient verlangt Auskunft über seine gespeicherten Daten und anschließend deren Löschung.
a) Welche Rechte macht er geltend? b) Muss die Praxis alle Daten sofort löschen? Begründe.

> [!success]- Lösung
> a) **Auskunftsrecht** (Art. 15) und **Recht auf Löschung** (Art. 17); Antwort grundsätzlich innerhalb eines Monats. (2 P)
> b) **Nein, nicht alle:** Für Behandlungsdokumentation und Abrechnungsunterlagen gelten **gesetzliche Aufbewahrungsfristen** (rechtliche Verpflichtung, Art. 6 Abs. 1 lit. c). Diese Daten werden gesperrt/eingeschränkt und nach Ablauf gelöscht; nicht mehr benötigte Daten (z. B. Newsletter-Einwilligung) sind sofort zu löschen. (4 P)

---

## I3 Datensicherung

### I3.1 ★★ – Sicherungsarten (8 Punkte)
📘 **Nachlernen:** [[I3 Datensicherung#1. Sicherungsarten|I3 › Sicherungsarten]]

Der Praxisserver: Vollsicherung sonntags (600 GB), Mo–Sa tägliche Teilsicherung, täglich ändern sich ca. 15 GB (immer andere Daten).
a) Berechne den Speicherbedarf einer Woche bei inkrementeller und bei differenzieller Sicherung. b) Am Donnerstagabend (nach der Sicherung) fällt der Server aus. Welche Sicherungen braucht man jeweils? c) Empfiehl ein Verfahren und begründe.

> [!success]- Lösung
> a) inkrementell: 600 + 6 × 15 = **690 GB** · differenziell: 600 + 15 + 30 + 45 + 60 + 75 + 90 = **915 GB** (3 P)
> b) inkrementell: **So + Mo + Di + Mi + Do** · differenziell: **So + Do** (2 P)
> c) z. B. **differenziell**: schnellere und sicherere Wiederherstellung (nur 2 Sicherungen), Mehrbedarf an Speicher ist bei diesen Mengen gering – für eine Praxis, die schnell wieder arbeitsfähig sein muss, zählt die Wiederherstellungszeit (RTO). (3 P)

### I3.2 ★★ – Backupkonzept (8 Punkte)
📘 **Nachlernen:** [[I3 Datensicherung#3-2-1-Regel|I3 › 3-2-1-Regel]] · [[I3 Datensicherung#Backupkonzept – Inhalte|I3 › Backupkonzept – Inhalte]] · [[I3 Datensicherung#3. Backupmedien|I3 › Backupmedien]]

Bisher sichert die Praxis einmal pro Woche auf eine USB-Festplatte, die dauerhaft am Server angeschlossen ist. Bewerte das Vorgehen und schlage ein besseres Konzept vor.

> [!success]- Lösung
> Schwächen (3 P): nur wöchentlich → bis zu einer Woche Datenverlust (RPO); dauerhaft angeschlossen → Ransomware verschlüsselt das Backup mit; gleicher Standort → Brand/Diebstahl vernichtet alles; kein Restore-Test.
> Konzept nach **3-2-1** (5 P): täglich automatische Sicherung auf ein **NAS** (eigene Zugangsdaten, nicht in der Domäne), zusätzlich **verschlüsselte Offsite-Kopie** (Cloud mit AVV oder rotierende Platten/Bänder an einem anderen Standort), mindestens eine **Offline- oder unveränderbare** Kopie, **Generationenprinzip**, **Verschlüsselung** der Backups (Gesundheitsdaten!), **Überwachung** der Backupjobs und **regelmäßige Restore-Tests**.

### I3.3 ★ – RPO und RTO (4 Punkte)
📘 **Nachlernen:** [[I3 Datensicherung#Kennzahlen|I3 › Kennzahlen]]

Die Praxisleitung sagt: „Wir können höchstens einen halben Tag Daten verlieren und müssen spätestens nach 4 Stunden wieder arbeiten.“ Ordne RPO und RTO zu und leite je eine Konsequenz ab.

> [!success]- Lösung
> **RPO = 12 h** (max. Datenverlust) → mindestens zweimal täglich sichern (z. B. mittags und abends). (2 P)
> **RTO = 4 h** (max. Ausfallzeit) → schnelles Restore-Verfahren (Image/VM-Backup, lokales NAS statt nur Cloud), Ersatzhardware bzw. Virtualisierung, dokumentierter Wiederanlaufplan. (2 P)

---

## I4 Kryptografie

### I4.1 ★★ – Befunde sicher versenden (8 Punkte)
📘 **Nachlernen:** [[I4 Kryptografie#4. Hybride Verschlüsselung|I4 › Hybride Verschlüsselung]] · [[I4 Kryptografie#6. Digitale Signatur|I4 › Digitale Signatur]]

Befunde sollen per E-Mail an Arztpraxen gehen.
a) Erkläre, warum rein symmetrische Verschlüsselung hier unpraktisch ist. b) Beschreibe, wie ein hybrides Verfahren (z. B. S/MIME) die Vertraulichkeit sicherstellt. c) Wie kann der Empfänger zusätzlich prüfen, dass der Befund von der Praxis stammt und unverändert ist?

> [!success]- Lösung
> a) Mit jeder Arztpraxis müsste vorher ein **gemeinsamer geheimer Schlüssel sicher ausgetauscht** werden; bei vielen Partnern entstehen sehr viele Schlüssel (n(n−1)/2). (2 P)
> b) Ein zufälliger **Sitzungsschlüssel** verschlüsselt die Mail **symmetrisch** (schnell); dieser Sitzungsschlüssel wird mit dem **öffentlichen Schlüssel des Empfängers** (aus dessen Zertifikat) verschlüsselt und mitgeschickt – nur der Empfänger kann ihn mit seinem **privaten Schlüssel** entschlüsseln. (4 P)
> c) **Digitale Signatur**: Die Praxis signiert den Mail-Hash mit ihrem **privaten Schlüssel**. Der Empfänger prüft die Signatur mit dem **öffentlichen Schlüssel** der Praxis und vergleicht den Dokument-Hash → Integrität und Authentizität. Die Signatur ist keine Verschlüsselung. (2 P)

### I4.2 ★ – Schlüsselanzahl (4 Punkte)
📘 **Nachlernen:** [[I4 Kryptografie#2. Symmetrische Verschlüsselung|I4 › Symmetrische Verschlüsselung]] · [[I4 Kryptografie#3. Asymmetrische Verschlüsselung (Public-Key-Verfahren)|I4 › Asymmetrische Verschlüsselung]]

Die 25 Mitarbeitenden sollen untereinander verschlüsselt kommunizieren. Berechne die Anzahl der Schlüssel bei symmetrischer und asymmetrischer Verschlüsselung.

> [!success]- Lösung
> symmetrisch: 25 · 24 / 2 = **300** · asymmetrisch: 2 · 25 = **50** (25 Schlüsselpaare) (je 2 P)

### I4.3 ★★ – Passwörter speichern (6 Punkte)
📘 **Nachlernen:** [[I4 Kryptografie#5. Hashfunktionen|I4 › Hashfunktionen]]

Die neue Praxissoftware speichert Passwörter „mit MD5 verschlüsselt“. Bewerte das und beschreibe eine sichere Lösung.

> [!success]- Lösung
> - Passwörter werden nicht verschlüsselt, sondern **gehasht** – Begriff falsch. (1 P)
> - **MD5 ist unsicher** (sehr schnell berechenbar, Kollisionen, Rainbow-Tables). (2 P)
> - Sicher: langsame Passwort-Hashverfahren wie **Argon2, bcrypt oder PBKDF2** mit individuellem **Salt** je Benutzer; zusätzlich MFA und Kontosperre bei Fehlversuchen. (3 P)

### I4.4 ★★ – Zertifikat (4 Punkte)
📘 **Nachlernen:** [[I4 Kryptografie#7. Zertifikate und PKI|I4 › Zertifikate und PKI]]

Beim Aufruf des Online-Terminportals zeigt der Browser „Die Verbindung ist nicht sicher – Zertifikat ungültig“. Nenne zwei mögliche Ursachen und erkläre, warum man die Warnung nicht einfach wegklicken sollte.

> [!success]- Lösung
> Ursachen (je 1 P): Zertifikat **abgelaufen** · ausgestellt für einen **anderen Domainnamen** · von einer **nicht vertrauenswürdigen CA**/selbst signiert · Zertifikat gesperrt.
> Risiko (2 P): Es könnte ein **Man-in-the-Middle-Angriff** vorliegen – dann würden Zugangsdaten und Patientendaten an einen Angreifer gehen.

---

## I5 Bedrohungen und Schutzmaßnahmen

### I5.1 ★★ – Phishing-Mail (6 Punkte)
📘 **Nachlernen:** [[I5 Bedrohungen und Schutzmaßnahmen#2. Angriffe|I5 › Angriffe]] · [[I5 Bedrohungen und Schutzmaßnahmen#3. Authentifizierung|I5 › Authentifizierung]]

Eine Mail „Ihr Microsoft-365-Konto wird heute gesperrt – jetzt bestätigen!“ mit Link auf `login-microsoft365-verify.com` erreicht die Rezeption.
a) Nenne drei Merkmale, an denen man Phishing erkennt. b) Nenne drei Maßnahmen, die das Risiko verringern.

> [!success]- Lösung
> a) Zeitdruck/Drohung · fremde Domain im Link (nicht microsoft.com) · unpersönliche Anrede/Aufforderung zur Eingabe von Zugangsdaten (je 1 P)
> b) **Schulung/Awareness** und Meldebutton · **MFA** (gestohlenes Passwort allein reicht nicht; phishing-resistent mit FIDO2) · Mailfilter/Link-Scanning, Warnhinweis bei externen Mails (je 1 P)

### I5.2 ★★ – Ransomware-Vorfall (8 Punkte)
📘 **Nachlernen:** [[I5 Bedrohungen und Schutzmaßnahmen#5. Verhalten bei einem Sicherheitsvorfall (z. B. Ransomware)|I5 › Verhalten bei einem Sicherheitsvorfall]]

Am Standort 2 erscheinen auf einem PC Meldungen, dass alle Dateien verschlüsselt wurden und Bitcoin gezahlt werden soll. Beschreibe das Vorgehen in der richtigen Reihenfolge.

> [!success]- Lösung
> 1. Gerät sofort **vom Netzwerk trennen** (nicht ausschalten). (1 P)
> 2. **IT/Notfallkontakt informieren**, Vorfall dokumentieren. (1 P)
> 3. **Ausbreitung prüfen/eindämmen**: Netzlaufwerke, andere PCs, betroffene Konten sperren, ggf. Standort vom Netz trennen. (2 P)
> 4. **Datenschutz**: Gesundheitsdaten betroffen? Datenabfluss? → Meldung an die Aufsichtsbehörde binnen **72 h**, ggf. Betroffene informieren; Anzeige bei der Polizei. (2 P)
> 5. **Kein Lösegeld zahlen**; Systeme neu aufsetzen und aus **sauberem, offline gelagertem Backup** wiederherstellen, Passwörter ändern, Ursache (Einfallstor) schließen. (2 P)

### I5.3 ★★ – Schadsoftware unterscheiden (6 Punkte)
📘 **Nachlernen:** [[I5 Bedrohungen und Schutzmaßnahmen#1. Schadsoftware (Malware)|I5 › Schadsoftware]]

Erkläre den Unterschied zwischen Virus, Wurm und Trojaner.

> [!success]- Lösung (je 2 P)
> - **Virus:** hängt sich an Programme/Dateien und wird aktiv, wenn der Wirt **ausgeführt** wird; verbreitet sich mit den infizierten Dateien.
> - **Wurm:** verbreitet sich **selbstständig** über Netzwerke/Sicherheitslücken, ohne Wirt und ohne Nutzeraktion.
> - **Trojaner:** **tarnt sich** als nützliches Programm und führt heimlich Schadfunktionen aus (Backdoor, Datendiebstahl); verbreitet sich nicht selbst.

### I5.4 ★★ – Fernzugriff absichern (6 Punkte)
📘 **Nachlernen:** [[I5 Bedrohungen und Schutzmaßnahmen#Firewall|I5 › Firewall]] · [[I5 Bedrohungen und Schutzmaßnahmen#3. Authentifizierung|I5 › Authentifizierung]]

Die Physiotherapeut:innen sollen von zu Hause Termine einsehen. Ein Dienstleister schlägt vor, am Router Port 3389 (RDP) auf den Server weiterzuleiten. Bewerte den Vorschlag und nenne eine sichere Alternative.

> [!success]- Lösung
> RDP direkt im Internet ist ein **sehr häufiges Einfallstor** (Brute-Force-Angriffe, Lücken, Ransomware) – der Server wäre für jeden erreichbar. (3 P)
> Alternative: **VPN** mit **MFA** (z. B. WireGuard/IPsec), erst danach Zugriff auf das Terminsystem; oder ein Webportal mit TLS und MFA; Zugriffe protokollieren, nur notwendige Rechte. (3 P)

Bereich: [[Übersicht IT-Sicherheit]]
