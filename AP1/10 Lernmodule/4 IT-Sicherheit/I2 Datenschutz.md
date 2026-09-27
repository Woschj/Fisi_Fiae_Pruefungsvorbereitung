---
modul: I2
titel: Datenschutz
bereich: IT-Sicherheit
reihenfolge: 24
dauer: 120
status: neu
sicherheit: 0
zuletzt:
berufsschule: "ITG · LF4 LS4.3 (Datenschutz, DSGVO-Fallprüfung)"
tags: [ap1/modul, ap1/sicherheit]
---
# I2 · Datenschutz

> [!abstract] Überblick
> **Bereich:** [[Übersicht IT-Sicherheit]]
> **Dauer:** ca. 2 h · **Prüfungsrelevanz:** ★★★ – TOM zuordnen, Rechtsgrundlagen, Pflichten bei Datenpannen, AVV
> **Voraussetzungen:** [[I1 Informationssicherheit und IT-Grundschutz]]
> **Berufsschule:** ITG LF4 LS4.3 (Prüfschema bei Datenlecks)

## Lernziele
- [ ] Ich kann personenbezogene und besondere Kategorien personenbezogener Daten erkennen.
- [ ] Ich kann die Grundsätze der DSGVO und die Rechtsgrundlagen einer Verarbeitung nennen.
- [ ] Ich kann die Rechte der Betroffenen und die Pflichten von Unternehmen erklären.
- [ ] Ich kann technische und organisatorische Maßnahmen (TOM) den Kontrollzielen zuordnen.
- [ ] Ich kann einen Datenschutzvorfall strukturiert prüfen (betroffene Daten → Meldung → Prävention).

## Worum geht es?
Ein Mitarbeiter verschickt eine Excel-Liste mit Kundendaten versehentlich an einen falschen Verteiler. Ein Cloud-Dienst wird ohne Vertrag eingesetzt. Die Videoüberwachung speichert Aufnahmen seit zwei Jahren. Alles Datenschutzverstöße – mit möglichen Bußgeldern und Imageschaden. Als IT-Fachkraft setzt du die technischen Maßnahmen um und musst wissen, was rechtlich verlangt ist.

---

## 1. Rechtlicher Rahmen und Begriffe
- **DSGVO** (Datenschutz-Grundverordnung): EU-Verordnung, gilt seit 25.05.2018 unmittelbar in allen EU-Staaten
- **BDSG** (Bundesdatenschutzgesetz): ergänzende deutsche Regeln (z. B. Beschäftigtendatenschutz, Datenschutzbeauftragte)
- **TDDDG** (früher TTDSG): Cookies und Endgerätezugriff bei Online-Diensten

| Begriff | Bedeutung |
|---|---|
| **personenbezogene Daten** (Art. 4) | alle Informationen über eine **identifizierte oder identifizierbare natürliche Person**: Name, Adresse, E-Mail, Telefonnummer, Geburtsdatum, Kundennummer, **IP-Adresse**, Standortdaten, Foto, Kfz-Kennzeichen |
| **besondere Kategorien** (Art. 9) | Gesundheit, ethnische Herkunft, politische Meinung, religiöse Überzeugung, Gewerkschaftszugehörigkeit, genetische und **biometrische** Daten, Sexualleben → **besonders streng geschützt** |
| **Verarbeitung** | jeder Vorgang: erheben, speichern, verändern, auslesen, übermitteln, löschen … |
| **Verantwortlicher** | entscheidet über Zweck und Mittel der Verarbeitung (das Unternehmen) |
| **Auftragsverarbeiter** | verarbeitet **im Auftrag und nach Weisung** (z. B. Cloud-Anbieter, Lohnbuchhaltung, IT-Dienstleister mit Datenzugriff) |
| **Pseudonymisierung** | Daten sind nur mit Zusatzwissen (Schlüssel/Zuordnungstabelle) einer Person zuordenbar → **bleiben** personenbezogen |
| **Anonymisierung** | Personenbezug ist dauerhaft entfernt → DSGVO gilt **nicht** mehr |

Keine personenbezogenen Daten: Daten über **juristische Personen** (Umsatz einer GmbH), echte anonyme Statistiken.

---

## 2. Grundsätze der Verarbeitung (Art. 5)
1. **Rechtmäßigkeit, Treu und Glauben, Transparenz** – mit Rechtsgrundlage, nachvollziehbar für Betroffene
2. **Zweckbindung** – nur für festgelegte, eindeutige Zwecke
3. **Datenminimierung** – nur so viele Daten wie nötig
4. **Richtigkeit** – sachlich richtig und aktuell
5. **Speicherbegrenzung** – nur so lange wie nötig, dann löschen
6. **Integrität und Vertraulichkeit** – angemessene Sicherheit (→ TOM)
7. **Rechenschaftspflicht** – der Verantwortliche muss die Einhaltung **nachweisen** können

## 3. Rechtsgrundlagen (Art. 6 Abs. 1) – mindestens eine muss vorliegen
| Buchstabe | Rechtsgrundlage | Beispiel |
|---|---|---|
| a | **Einwilligung** | Newsletter-Anmeldung |
| b | **Vertrag** (Erfüllung/Anbahnung) | Lieferadresse für eine Bestellung |
| c | **rechtliche Verpflichtung** | Aufbewahrung von Rechnungen (Steuerrecht) |
| d | lebenswichtige Interessen | Notfall |
| e | öffentliche Aufgabe | Behörden |
| f | **berechtigtes Interesse** (nach Abwägung) | Videoüberwachung zum Schutz vor Diebstahl, IT-Sicherheit |

**Einwilligung:** freiwillig, für einen bestimmten Fall, informiert, **eindeutig** (aktives Handeln, kein vorangekreuztes Kästchen), **jederzeit widerrufbar**, nachweisbar.

## 4. Rechte der Betroffenen
| Recht | Artikel |
|---|---|
| Informationspflicht bei Erhebung | 13, 14 |
| **Auskunft** (welche Daten, Zweck, Empfänger, Dauer) | 15 |
| **Berichtigung** | 16 |
| **Löschung** („Recht auf Vergessenwerden“) | 17 |
| Einschränkung der Verarbeitung | 18 |
| **Datenübertragbarkeit** (in gängigem Format) | 20 |
| **Widerspruch** | 21 |
Antwortfrist grundsätzlich **ein Monat**. Beschwerderecht bei der **Aufsichtsbehörde** (Landesdatenschutzbeauftragte).

## 5. Pflichten des Unternehmens
- **Verzeichnis von Verarbeitungstätigkeiten** (Art. 30): welche Daten, Zweck, Rechtsgrundlage, Empfänger, Löschfristen, TOM
- **TOM** nach Art. 32 – angemessen zum Risiko und zum **Stand der Technik**
- **Datenschutz durch Technikgestaltung und datenschutzfreundliche Voreinstellungen** (Privacy by Design / by Default, Art. 25)
- **Auftragsverarbeitungsvertrag (AVV)** mit jedem Auftragsverarbeiter (Art. 28)
- **Meldung von Datenpannen** an die Aufsichtsbehörde **innerhalb von 72 Stunden** nach Bekanntwerden (Art. 33), bei hohem Risiko zusätzlich **Benachrichtigung der Betroffenen** (Art. 34)
- **Datenschutz-Folgenabschätzung** bei voraussichtlich hohem Risiko (Art. 35), z. B. umfangreiche Videoüberwachung, Gesundheitsdaten
- **Datenschutzbeauftragte:r** (Art. 37, § 38 BDSG): in Deutschland i. d. R., wenn **mindestens 20 Personen** ständig mit der automatisierten Verarbeitung personenbezogener Daten beschäftigt sind (oder bei Kerntätigkeit mit sensiblen Daten)
- **Übermittlung in Drittländer** nur mit Grundlage (Angemessenheitsbeschluss, z. B. EU-US Data Privacy Framework; Standardvertragsklauseln)
- **Sanktionen** (Art. 83): Bußgelder bis **20 Mio. €** oder **4 %** des weltweiten Jahresumsatzes; Schadensersatzansprüche Betroffener

---

## 6. Technische und organisatorische Maßnahmen (TOM)
**Art. 32 DSGVO** nennt u. a.: **Pseudonymisierung und Verschlüsselung** · Vertraulichkeit, Integrität, Verfügbarkeit und **Belastbarkeit** der Systeme · rasche **Wiederherstellbarkeit** nach einem Zwischenfall · Verfahren zur **regelmäßigen Überprüfung** der Wirksamkeit.

In Prüfungen und in der Praxis werden TOM oft nach den **Kontrollzielen** des alten BDSG gegliedert:

| Kontrolle | Leitfrage | Beispiele |
|---|---|---|
| **Zutrittskontrolle** | Wer kommt **in die Räume**? | Schlüsselregelung, Chipkarte, Alarmanlage, Besucherbuch, Serverraum abschließen |
| **Zugangskontrolle** | Wer kommt **an die Systeme**? | Passwortrichtlinie, **MFA**, Bildschirmsperre, Kontosperre nach Fehlversuchen |
| **Zugriffskontrolle** | Wer darf **welche Daten** lesen/ändern? | Rechtekonzept, Rollen, Need-to-know, Protokollierung von Zugriffen |
| **Weitergabekontrolle** | Schutz bei **Übertragung und Transport** | TLS, VPN, verschlüsselte Mails/USB-Sticks, sichere Entsorgung |
| **Eingabekontrolle** | Wer hat **was wann** eingegeben/geändert/gelöscht? | Protokollierung (Logs), Änderungshistorie |
| **Auftragskontrolle** | Arbeitet der Dienstleister **weisungsgemäß**? | AVV, Kontrollen, Zertifikate |
| **Verfügbarkeitskontrolle** | Schutz vor **zufälliger Zerstörung/Verlust** | Backup, USV, RAID, Brandschutz, Virenschutz |
| **Trennungsgebot** | Daten für **verschiedene Zwecke getrennt** verarbeiten | Mandantentrennung, getrennte Test- und Produktivdaten |

> [!tip] Zutritt – Zugang – Zugriff
> **Zutritt** = Tür (Raum) → **Zugang** = Anmeldung (System) → **Zugriff** = Datei (Daten).
> Eselsbrücke: Man **tritt** in den Raum, man **geht** an den Rechner, man **greift** auf die Daten zu.

---

## 7. Prüfschema bei einem Datenschutzvorfall
1. **Betroffene Daten:** Welche personenbezogenen Daten? Besondere Kategorien? Wie viele Personen? Welche Grundsätze sind verletzt (Vertraulichkeit, Integrität, Zweckbindung, Speicherbegrenzung …)? Gab es eine Rechtsgrundlage?
2. **Meldepflichten:** Risiko bewerten → Meldung an die **Aufsichtsbehörde binnen 72 h** (Ausnahme: voraussichtlich kein Risiko – trotzdem intern dokumentieren); bei hohem Risiko **Betroffene informieren**; **Datenschutzbeauftragte:n** einbinden.
3. **Prävention:** Ursache abstellen, **TOM** verbessern (z. B. Verschlüsselung, Rechte, Filter), **Mitarbeitende schulen**, Vorfall dokumentieren.

> [!example] Beispiel
> Ein unverschlüsseltes Notebook mit der Kundendatenbank (Namen, Adressen, Bestellhistorie, IBAN) wird aus dem Auto gestohlen.
> 1. Personenbezogene Daten inkl. Bankdaten, viele Betroffene → Vertraulichkeit verletzt, Risiko **hoch**.
> 2. Meldung an die Aufsichtsbehörde binnen 72 h; da hohes Risiko (Missbrauch der IBAN): Kunden informieren.
> 3. Künftig **Festplattenverschlüsselung** (BitLocker) auf allen Mobilgeräten, Daten zentral statt lokal, Richtlinie zu Mobilgeräten, Schulung.
> Wäre das Notebook **verschlüsselt** gewesen, wäre das Risiko gering gewesen → oft keine Benachrichtigung der Betroffenen nötig.

---

> [!warning] Typische Fehler in Prüfungen
> - Zutritts-, Zugangs- und Zugriffskontrolle verwechseln.
> - Pseudonymisierte Daten als „nicht mehr personenbezogen“ bezeichnen.
> - Die 72-Stunden-Frist auf die Betroffenen statt auf die **Aufsichtsbehörde** beziehen.
> - Bei Cloud/IT-Dienstleistern den **AVV** vergessen.
> - Einwilligung als einzige Rechtsgrundlage nennen – oft ist es der Vertrag oder eine rechtliche Pflicht.

## Verwandte Themen
- [[I1 Informationssicherheit und IT-Grundschutz]] – Schutzziele und TOM
- [[I4 Kryptografie]] – Verschlüsselung als Schutzmaßnahme
- [[S5 Virtualisierung und Cloud]] – Cloud-Anbieter auswählen

## Zusammenfassung
- Personenbezogen = identifizierbare natürliche Person (auch IP-Adresse); Art. 9 = besonders sensibel.
- Grundsätze: Rechtmäßigkeit, Zweckbindung, Datenminimierung, Richtigkeit, Speicherbegrenzung, Integrität/Vertraulichkeit, Rechenschaftspflicht.
- Rechtsgrundlagen Art. 6: Einwilligung, Vertrag, rechtliche Pflicht, berechtigtes Interesse …
- Rechte: Auskunft, Berichtigung, Löschung, Einschränkung, Übertragbarkeit, Widerspruch.
- Pflichten: Verzeichnis, TOM, AVV, Meldung binnen 72 h, DSB ab 20 Personen, Bußgelder bis 20 Mio. €/4 %.
- TOM: Zutritt, Zugang, Zugriff, Weitergabe, Eingabe, Auftrag, Verfügbarkeit, Trennung.
- Vorfall: Daten → Meldung → Prävention.

## Selbstcheck
```dataviewjs
await dv.view("AP1/99 System/views/quiz", { modul: "I2" })
```

**Weitere Aufgaben:** [[Aufgaben IT-Sicherheit#I2 Datenschutz]] · **Karteikarten:** [[Karten IT-Sicherheit]]

## Einschätzung
```dataviewjs
await dv.view("AP1/99 System/views/selbstcheck")
```

---
← [[I1 Informationssicherheit und IT-Grundschutz]] · Weiter: [[I3 Datensicherung]] →
