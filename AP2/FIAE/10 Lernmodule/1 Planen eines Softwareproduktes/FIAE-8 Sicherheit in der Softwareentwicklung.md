---
modul: FIAE-8
titel: Sicherheit in der Softwareentwicklung
bereich: Planen eines Softwareproduktes
pruefungsteil: "AP2 Teil 2 – Planen eines Softwareproduktes / Entwicklung und Umsetzung von Algorithmen"
reihenfolge: 8
dauer: 120
status: neu
sicherheit: 0
zuletzt:
tags: [ap2/modul, ap2/fiae]
---
# FIAE-8 · Sicherheit in der Softwareentwicklung

> [!abstract] Überblick
> **Bereich:** [[Übersicht FIAE Planen eines Softwareproduktes]]
> **Prüfung:** beide FIAE-Teile
> **Dauer:** ca. 120 min · **Prüfungsrelevanz:** ★★★ – Passwort-Hash mit Salt, Verschlüsselungsverfahren sym./asym./hybrid, Integrität und RSA, Datenschutzerklärung und Einwilligung, Sicherheitsanforderungen und Passwort-Reset
> **Grundlagen aus AP1:** [[I4 Kryptografie]] · [[I5 Bedrohungen und Schutzmaßnahmen]] · [[I2 Datenschutz]]

## Lernziele
- [ ] Ich kann Schutzziele nach BSI erklären und auf eine Anwendung beziehen.
- [ ] Ich kann symmetrische, asymmetrische und hybride Verfahren vergleichen und RSA einordnen.
- [ ] Ich kann Passwörter sicher speichern (Hash, Salt, langsame Hashverfahren) und Integrität mit Hash/Signatur/HMAC sichern.
- [ ] Ich kenne typische Schwachstellen (SQL-Injection, XSS, CSRF) und Gegenmaßnahmen nach OWASP.
- [ ] Ich kann Sicherheitsanforderungen, 2FA und einen sicheren Passwort-Reset entwerfen.
- [ ] Ich kann Datenschutzerklärung, Einwilligung und Privacy by Design begründen.

## So wird das geprüft
> [!info] Typische AP2-Aufgabentypen
> - **Passwort speichern:** Hashfunktion, Nachteil gleicher Hashes, **Salt**.
> - **Verschlüsselung:** symmetrisch erklären, Alternativen asymmetrisch und hybrid mit Vor-/Nachteilen; **Transportverschlüsselung bei E-Mail = hybrid**, kein Pre-Shared Secret nötig.
> - **Schutzziel Integrität** und Verfahren gegen unbemerkte Manipulation, **RSA** erklären und bewerten.
> - **Sicherheitsanforderungen** an eine Aktionärs-App, **Passwort-Reset-Link absichern** mit zweitem Kanal, Word-Einladungen als Risiko.
> - **Datenschutzerklärung und Einwilligung** begründen, **Zertifikate** für Ticketsysteme, **nicht signiertes Programm**.

---

## 1. Schutzziele

| Schutzziel (BSI) | Bedeutung | Maßnahme in der Software |
|---|---|---|
| **Vertraulichkeit** | nur Berechtigte sehen Daten | Verschlüsselung (TLS, at rest), Rollen und Rechte |
| **Integrität** | Daten werden nicht **unbemerkt** verändert | Hashwerte, **digitale Signaturen**, **HMAC**, Prüfsummen, Protokollierung |
| **Verfügbarkeit** | System und Daten nutzbar, wenn gebraucht | Redundanz, Backups, Lastverteilung, Schutz vor DoS |
| Authentizität | Absender/Nutzer ist echt | Anmeldung, 2FA, Zertifikate |
| Verbindlichkeit | Handlungen nachweisbar | Signaturen, Audit-Logs |

**Integrität bei Sensordaten sichern:** Sender bildet einen **HMAC** (Hash mit gemeinsamem geheimen Schlüssel) oder eine **digitale Signatur** über die Messwerte; der Empfänger prüft. Verändert jemand die Daten unterwegs, passt der Prüfwert nicht mehr. Zusätzlich TLS/verschlüsselte Übertragung und Zeitstempel/Zähler gegen Wiedereinspielen (Replay).

---

## 2. Verschlüsselungsverfahren

| | symmetrisch | asymmetrisch | hybrid |
|---|---|---|---|
| Prinzip | **ein** Schlüssel ver- und entschlüsselt | **öffentlicher** Schlüssel verschlüsselt, **privater** entschlüsselt | asymmetrisch den Sitzungsschlüssel austauschen, symmetrisch die Daten |
| + | schnell, effizient für große Daten | kein vorher geteiltes Geheimnis nötig, Signaturen möglich | schnell **und** ohne Pre-Shared Secret |
| − | Schlüsselaustausch, viele Schlüssel | langsam, braucht vertrauenswürdige Stelle (CA) | mehr Overhead beim Verbindungsaufbau, CA nötig |
| Beispiele | AES, ChaCha20 | **RSA**, ECC | TLS (HTTPS, E-Mail-Transport), S/MIME, PGP |

**RSA:** asymmetrisches Verfahren, dessen Sicherheit darauf beruht, dass das **Zerlegen des Produkts zweier großer Primzahlen** (Faktorisierung) praktisch unmöglich ist; Schlüssellänge heute mindestens 3 000 Bit. **Bewertung für Messwerte eines IoT-Geräts:** RSA ist **rechenaufwendig** und für große oder viele kleine Datenmengen ungeeignet – sinnvoll nur für Schlüsselaustausch und Signaturen; die Daten selbst verschlüsselt man symmetrisch (AES) bzw. sichert die Integrität per HMAC/Signatur.

---

## 3. Passwörter sicher speichern

**Nie im Klartext und nie umkehrbar verschlüsselt**, sondern als **Hash**:
1. **Hashfunktion** – Einwegfunktion, aus dem Passwort entsteht ein Wert fester Länge; beim Login wird die Eingabe gehasht und verglichen.
2. **Problem:** Gleiche Passwörter ergeben gleiche Hashes → erkennbar, und **Rainbow Tables** (vorberechnete Hashes) knacken schwache Passwörter sofort.
3. **Salt:** zufällige Zeichenkette **pro Benutzer**, die vor dem Hashen an das Passwort gehängt und **zusammen mit dem Hash gespeichert** wird → gleiche Passwörter haben verschiedene Hashes, Rainbow Tables nutzlos.
4. **Pepper** (optional): geheimer Zusatz, der **nicht** in der Datenbank liegt.
5. **Langsame, speicherintensive Verfahren** verwenden: **bcrypt, scrypt, Argon2, PBKDF2** – nicht MD5 oder ein einfaches SHA-256, weil diese für Brute Force viel zu schnell sind.

**Sicherer Passwort-Reset:** zeitlich begrenzter, **einmal nutzbarer** Link mit zufälligem Token; zusätzlich **zweiter Kanal** (SMS-Code, Authenticator), damit ein abgefangener Link allein nicht reicht; keine Auskunft, ob eine E-Mail-Adresse existiert; nach dem Reset alle Sitzungen beenden.

**Zwei-Faktor-Authentifizierung:** Wissen + Besitz (App/Token) oder Inhärenz (Biometrie). Passkeys (FIDO2) ersetzen Passwörter durch Schlüsselpaare.

**Kerberos:** Anmeldeverfahren mit **Tickets**, z. B. im Active Directory. Der Client meldet sich einmal am **Key Distribution Center** an und erhält ein **Ticket Granting Ticket**; damit bekommt er für jeden Dienst ein Serviceticket, ohne das Passwort erneut zu übertragen (**Single Sign-on**). Tickets sind zeitlich begrenzt – deshalb müssen die Uhren synchron sein (NTP).

---

## 4. Sichere Programmierung

| Schwachstelle (OWASP Top 10) | Beschreibung | Gegenmaßnahme |
|---|---|---|
| **SQL-Injection** | Eingaben werden als SQL-Code ausgeführt (`' OR 1=1 --`) | **Prepared Statements**/parametrisierte Abfragen, ORM, Eingabevalidierung, minimale DB-Rechte |
| **Cross-Site Scripting (XSS)** | eingeschleustes JavaScript läuft im Browser anderer Nutzer | **Ausgaben kodieren/escapen**, Content-Security-Policy, Eingaben validieren |
| **CSRF** | fremde Seite löst Aktionen im Namen eines angemeldeten Nutzers aus | CSRF-Token, SameSite-Cookies, erneute Bestätigung |
| Broken Access Control | Nutzer greifen auf fremde Daten zu (ID in der URL ändern) | Berechtigung **serverseitig** bei jedem Zugriff prüfen |
| unsichere Abhängigkeiten | bekannte Lücken in Bibliotheken | Updates, Dependency-Scanner |
| Fehlkonfiguration / sensible Daten | Debugmeldungen, Standardpasswörter, Klartext | Härtung, Verschlüsselung, keine Secrets im Code |

**Weitere Grundsätze:** Eingaben **nie vertrauen** (serverseitig validieren), **Least Privilege**, sichere Standardeinstellungen, Fehler ohne interne Details anzeigen, Sitzungen begrenzen (Timeout bei Inaktivität), sichere Übertragung (TLS), **Code-Reviews und Security-Tests**, Programme **signieren**.
**Dateien aus externen Quellen** (Word-Dokumente mit Makros) sind ein Einfallstor – Inhalte lieber direkt in der Web-Plattform anzeigen.

---

## 5. Datenschutz in Anwendungen

- **Datenschutzerklärung:** informiert **transparent**, welche personenbezogenen Daten wofür, wie lange und auf welcher Rechtsgrundlage verarbeitet werden und welche Rechte Betroffene haben (Informationspflicht nach Art. 13 DSGVO).
- **Einwilligung:** freiwillig, informiert, **aktiv** (Opt-in, kein vorangekreuztes Kästchen), widerrufbar – schafft die Rechtsgrundlage, wenn keine andere greift (z. B. Standortdaten für Werbung).
- **Privacy by Design / by Default:** Datenschutz von Anfang an einplanen, **Datensparsamkeit**, datenschutzfreundliche Voreinstellungen, Pseudonymisierung, Löschkonzept.
- **Rechtliche Compliance** schützt vor Bußgeldern und schafft Vertrauen; der **Datenschutzbeauftragte** wird früh einbezogen.

---

> [!warning] Typische Fehler in Prüfungen
> - „Passwörter mit AES verschlüsseln“ – Passwörter werden **gehasht**, nicht verschlüsselt.
> - Salt als Geheimnis beschreiben – das Salt ist **nicht geheim**, es liegt neben dem Hash.
> - Integrität mit Vertraulichkeit verwechseln: Verschlüsselung allein bemerkt keine Manipulation.
> - SQL-Injection nur mit „Eingaben prüfen“ beantworten – die sichere Lösung sind **Prepared Statements**.

## Verwandte Themen
- [[FIAE-7 Schnittstellen, Web und Architektur]] – Authentifizierung an APIs, Code-Signatur
- [[FIAE-12 SQL für Entwickler]] – Rechte mit GRANT/REVOKE, SQL-Injection
- [[FISI-15 VPN, TLS und PKI]] – TLS und Zertifikate im Detail
- [[I4 Kryptografie]] – Grundlagen aus AP1

## Zusammenfassung
- Schutzziele: Vertraulichkeit, Integrität (Hash/Signatur/HMAC), Verfügbarkeit, Authentizität.
- Symmetrisch schnell, asymmetrisch ohne Geheimnisaustausch, hybrid (TLS) vereint beides. RSA: Faktorisierung, langsam, für Schlüssel/Signaturen.
- Passwörter: Hash + individuelles Salt (+ Pepper) mit bcrypt/Argon2 – nie Klartext, nie MD5.
- OWASP: SQL-Injection → Prepared Statements; XSS → Ausgaben escapen; CSRF → Token; Zugriff serverseitig prüfen.
- Datenschutzerklärung (Transparenz), Einwilligung (Opt-in), Privacy by Design.

## Direkt üben
```dataviewjs
await dv.view("AP2/99 System/views/trainer", { typen: ["passwort", "schluessel"] })
```

## Selbstcheck
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { modul: "FIAE-8" })
```

**Weitere Aufgaben:** [[Aufgaben Planen eines Softwareproduktes#FIAE-8 Sicherheit in der Softwareentwicklung]] · **Karteikarten:** [[Karten Planen eines Softwareproduktes]]

## Einschätzung
```dataviewjs
await dv.view("AP2/99 System/views/selbstcheck")
```

---
← [[FIAE-7 Schnittstellen, Web und Architektur]] · Weiter: [[Übersicht FIAE Algorithmen]] →
