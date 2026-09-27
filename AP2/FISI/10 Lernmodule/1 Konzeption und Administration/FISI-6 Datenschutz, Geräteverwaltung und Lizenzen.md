---
modul: FISI-6
titel: Datenschutz, Geräteverwaltung und Lizenzen
bereich: Konzeption und Administration
pruefungsteil: "AP2 Teil 2 – Konzeption und Administration von IT-Systemen"
reihenfolge: 6
dauer: 120
status: neu
sicherheit: 0
zuletzt:
tags: [ap2/modul, ap2/fisi]
---
# FISI-6 · Datenschutz, Geräteverwaltung und Lizenzen

> [!abstract] Überblick
> **Bereich:** [[Übersicht FISI Konzeption und Administration]]
> **Prüfung:** „Konzeption und Administration von IT-Systemen“
> **Dauer:** ca. 120 min · **Prüfungsrelevanz:** ★★★ – TOM-Zuordnung, Datenpanne nach DSGVO, CALs und Update/Upgrade kamen mehrfach
> **Grundlagen aus AP1:** [[I2 Datenschutz]] · [[I1 Informationssicherheit und IT-Grundschutz]] · [[S6 Software beschaffen und lizenzieren]]

## Lernziele
- [ ] Ich kann die Schutzziele Vertraulichkeit, Integrität, Verfügbarkeit und Authentizität erklären.
- [ ] Ich kann technisch-organisatorische Maßnahmen (TOM) Kontrollzielen zuordnen.
- [ ] Ich weiß, was bei einer Datenpanne zu tun ist (Meldepflicht, 72 Stunden).
- [ ] Ich kann Anonymisierung und Pseudonymisierung unterscheiden und Datenträger sicher vernichten.
- [ ] Ich kann ein MDM-System auswählen und BYOD-Regeln begründen.
- [ ] Ich kann Nutzer- und Geräte-CALs, Update und Upgrade sowie Patchmanagement erklären.

## So wird das geprüft
> [!info] Typische AP2-Aufgabentypen
> - **TOM ankreuzen** (Zutritts-, Zugangs-, Zugriffskontrolle) oder **mit Beispielen nennen und erläutern**.
> - **Schutzziele** Vertraulichkeit, Integrität, Verfügbarkeit, Authentizität erklären.
> - **Datenpanne:** Meldung an Behörde binnen 72 h, Betroffene informieren, Dokumentation, technische Sofortmaßnahmen; Fragen nach der Schwere des Vorfalls.
> - **Anonymisierung vs. Pseudonymisierung**, **Datenträger sicher entsorgen**, **Löschfristen, Einwilligung, Zweckbindung** bei Videoüberwachung.
> - **MDM auswählen** (Lockdown/Wipe), **Container für Firmendaten auf privaten Geräten**, Inhalte einer Richtlinie.
> - **User-CAL vs. Device-CAL**, **Update vs. Upgrade**, **Patchmanagement**.
> - **Kontrolle von Mitarbeiter-Mails** durch Spamfilter/Admins.

---

## 1. Schutzziele

| Schutzziel | Bedeutung | Maßnahme (Beispiel) |
|---|---|---|
| **Vertraulichkeit** (Confidentiality) | Nur Berechtigte können Daten lesen | Verschlüsselung, Berechtigungen |
| **Integrität** (Integrity) | Daten werden nicht unbemerkt verändert | Hashwerte, Signaturen, Logging |
| **Verfügbarkeit** (Availability) | Dienste und Daten stehen in der zugesicherten Zeit bereit | RAID, Backup, USV, Cluster |
| **Authentizität** | Herkunft bzw. Identität ist echt und überprüfbar | Zertifikate, Signaturen, MFA |
| Verbindlichkeit / Nichtabstreitbarkeit | Handlungen sind nachweisbar zuzuordnen | digitale Signatur, Protokolle |

Die **Schutzbedarfsfeststellung** (BSI: normal, hoch, sehr hoch) bestimmt, wie stark ein System geschützt werden muss.

---

## 2. Technisch-organisatorische Maßnahmen (TOM)

Die DSGVO (Art. 32) verlangt „geeignete technische und organisatorische Maßnahmen“. In Prüfungen wird oft noch die klassische Einteilung in **Kontrollziele** verwendet:

| Kontrolle | Frage | Beispiele |
|---|---|---|
| **Zutrittskontrolle** | Wer kommt **physisch** in Gebäude/Räume? | RFID-Karte, Chipkarte Serverraum, Alarmanlage, Empfang/Besucheranmeldung, Videoüberwachung |
| **Zugangskontrolle** | Wer kann ein **System benutzen**? | Passwortregeln, biometrische Anmeldung, MFA, Bildschirmsperre |
| **Zugriffskontrolle** | Wer darf **welche Daten** lesen/ändern? | Berechtigungskonzept auf Dateiebene, Rollen, Verschlüsselung von Datenträgern, datenschutzgerechte Vernichtung |
| **Weitergabekontrolle** | Wie werden Daten sicher übertragen? | E-Mail-Verschlüsselung, VPN, HTTPS |
| **Eingabekontrolle** | Wer hat was wann geändert? | Änderungsprotokolle (Logging) |
| **Auftragskontrolle** | Verarbeiten Dienstleister nur nach Weisung? | Auftragsverarbeitungsvertrag (AVV) |
| **Verfügbarkeitskontrolle** | Schutz vor Verlust | Backup, USV, RAID, Brandschutz |
| **Trennungskontrolle** | Daten für verschiedene Zwecke getrennt | Mandantentrennung, Test- und Produktivsystem trennen |

> [!tip] Zutritt – Zugang – Zugriff
> **Zutritt** = Raum (Füße) · **Zugang** = System (Anmeldung) · **Zugriff** = Daten (Rechte). Die Verschlüsselung von Datenträgern ordnen die Lösungshinweise der **Zugriffskontrolle** zu; Benutzerprofile passen zu Zugang **und** Zugriff.

---

## 3. DSGVO in der Praxis

**Grundsätze (Art. 5):** Rechtmäßigkeit, **Zweckbindung**, **Datenminimierung**, Richtigkeit, **Speicherbegrenzung**, Integrität und Vertraulichkeit, Rechenschaftspflicht.

**Pflichten des Unternehmens:** Datenschutzbeauftragten benennen (ab 20 Personen, die regelmäßig personenbezogene Daten automatisiert verarbeiten), **Verzeichnis der Verarbeitungstätigkeiten** führen, Datenschutzerklärung, Löschkonzept mit **Löschfristen**, AVV mit Dienstleistern, Datenschutz-Folgenabschätzung bei hohem Risiko.

**Einwilligung:** freiwillig, informiert, eindeutig (**Opt-in**), jederzeit widerrufbar. Bei Foto- und Videoaufnahmen von Personal oder Kunden besonders wichtig.
**Recht auf Löschung (Art. 17):** Daten löschen, wenn der Zweck erfüllt ist oder die Einwilligung widerrufen wurde – außer gesetzliche Aufbewahrungspflichten stehen entgegen.

### Datenpanne
Bei einer Verletzung des Schutzes personenbezogener Daten (z. B. Mail an falschen Empfänger, gehackter Server, verlorener Laptop):
1. **Sofort:** interne Meldung an den **Datenschutzbeauftragten**, System sperren/isolieren, Beweise sichern (Logs), Backup stoppen bzw. sichern.
2. **Bewerten:** Welche Daten, wie viele Betroffene, verschlüsselt? Sind die Daten an Unbefugte gelangt, verändert, missbraucht worden, wiederherstellbar?
3. **Meldung an die Aufsichtsbehörde** innerhalb von **72 Stunden** (Art. 33), außer es besteht voraussichtlich kein Risiko.
4. **Betroffene informieren** (Art. 34), wenn ein **hohes Risiko** besteht.
5. **Dokumentieren** – jede Panne, auch ohne Meldepflicht; Ursache beheben (Härtung, Schulung, zusätzliche Sicherheitssysteme).

### Anonymisierung und Pseudonymisierung
- **Anonymisierung:** Personenbezug wird **unwiderruflich** entfernt – kein Rückschluss mehr möglich. Anonyme Daten fallen **nicht** mehr unter die DSGVO.
- **Pseudonymisierung:** Identifizierende Merkmale werden durch ein **Pseudonym** ersetzt (z. B. Patienten-ID statt Name); die Zuordnung liegt **getrennt** in einer geschützten Tabelle und kann wiederhergestellt werden. Pseudonyme Daten **bleiben personenbezogen**, das Risiko sinkt aber.

### Datenträger sicher entsorgen
Löschen oder Formatieren reicht **nicht** – meist wird nur der Index entfernt, Daten sind wiederherstellbar.
- **HDD:** mehrfach **überschreiben** mit geeigneter Software, **Degaussing** (Entmagnetisieren) oder **mechanisch zerstören** (Schreddern).
- **SSD:** Hersteller-**Secure-Erase** bzw. Kryptolöschung (Schlüssel vernichten) oder physische Zerstörung – Überschreiben erreicht wegen Wear-Leveling nicht alle Zellen.
- **Zertifizierter Dienstleister** nach **DIN 66399** (Sicherheitsstufen 1–7), mit **Vernichtungsnachweis**; auf Wunsch Anwesenheit bei der Vernichtung.

### Kontrolle von Mitarbeiter-E-Mails
Ist **private Nutzung erlaubt**, gilt der Arbeitgeber rechtlich als Anbieter von Telekommunikation → Einsicht nur sehr eingeschränkt. Lösung: private Nutzung **verbieten** oder klar regeln und Mitarbeitende **nachweislich informieren**; Betriebsrat einbeziehen (Mitbestimmung bei technischer Überwachung, § 87 BetrVG).

---

## 4. Mobile Geräte (MDM und BYOD)

**Mobile Device Management** verwaltet Smartphones, Tablets und Laptops zentral: Richtlinien verteilen (PIN, Verschlüsselung), Apps installieren/sperren, **Lockdown** (Gerät sperren) und **Remote Wipe** (Fernlöschung) bei Verlust, Standort, Inventar, Updates erzwingen.

**BYOD (Bring Your Own Device):** Firmendaten laufen in einem **abgeschotteten Container** auf dem privaten Gerät. Das MDM verwaltet nur den Container und hat **keinen Zugriff auf private Daten**; beim Ausscheiden wird nur der Container gelöscht.

**Inhalte einer Richtlinie für mobile Geräte:** Passwort/PIN-Regeln, BYOD-Regelung, private Nutzung dienstlicher Geräte, Datenklassifizierung und Schutzbedarf, Umgang mit Standortdaten, Verlustmeldung, erlaubte Apps, Schulung, Rechtevergabe.

**Weitere Maßnahmen für Mobilgeräte:** 2FA mit Biometrie, TPM aktivieren, BIOS härten (Secure Boot, Bootoptionen), Daten nicht lokal speichern, Laufwerksverschlüsselung.

---

## 5. Lizenzen, Updates und Patches

### Client Access Licenses (CAL)
| | **User-CAL (Nutzer-CAL)** | **Device-CAL (Geräte-CAL)** |
|---|---|---|
| lizenziert | eine **Person**, egal mit wie vielen Geräten | ein **Gerät**, egal wie viele Personen es nutzen |
| sinnvoll bei | Mitarbeitende mit mehreren Geräten (PC, Laptop, Smartphone), Roaming | Schichtbetrieb, geteilte Geräte (Kasse, Werkstatt-PC) |

Weitere Modelle: Kernlizenz (per Core), Abo/Subscription, Volumenlizenz, OEM (an Hardware gebunden), Named User vs. Concurrent User, Open Source (GPL, MIT) – siehe [[S6 Software beschaffen und lizenzieren]].

### Update, Upgrade, Patch
| Begriff | Inhalt | Kosten |
|---|---|---|
| **Patch** | behebt einzelne Fehler oder Sicherheitslücken | kostenlos |
| **Update** | gebündelte Fehlerbehebungen und Sicherheitskorrekturen, **gleiche Hauptversion** (1.0 → 1.1) | meist kostenlos |
| **Upgrade** | **neue Hauptversion** (1.x → 2.0) mit neuen Funktionen und Konzepten | meist kostenpflichtig (ggf. rabattiert) |

### Patchmanagement
Zentraler Updateserver im eigenen Netz (z. B. WSUS, Intune, Landscape): Patches **bewerten und priorisieren** (Kritikalität), in einer **Testgruppe** prüfen, **gestaffelt** ausrollen, kritische Updates schnell, riskante zurückstellen, Erfolg überwachen und dokumentieren. Vorteil: Updates werden nur **einmal** aus dem Internet geladen – das spart Bandbreite.

---

> [!warning] Typische Fehler in Prüfungen
> - Zutritts-, Zugangs- und Zugriffskontrolle vertauschen.
> - „Pseudonymisierte Daten sind anonym“ – falsch, sie bleiben personenbezogen.
> - Meldefrist falsch: **72 Stunden** an die **Aufsichtsbehörde**, nicht an die Polizei.
> - „Formatieren“ als sicheres Löschen angeben.
> - User- und Device-CAL an der Zahl der Geräte statt am Nutzungsmuster festmachen.

## Verwandte Themen
- [[FISI-5 Systemhärtung, Malware und Angriffe]] – technische Umsetzung
- [[FISI-2 Cloud und Betriebsmodelle]] – Datenschutz in der Cloud, AVV
- [[WISO-3 Mitbestimmung und Tarifrecht]] – Betriebsrat bei Überwachungstechnik
- [[I2 Datenschutz]] – Grundlagen aus AP1

## Zusammenfassung
- Schutzziele: Vertraulichkeit, Integrität, Verfügbarkeit (+ Authentizität, Verbindlichkeit).
- TOM: Zutritt (Raum) – Zugang (System) – Zugriff (Daten) – Weitergabe – Eingabe – Auftrag – Verfügbarkeit – Trennung.
- Datenpanne: DSB, sichern, bewerten, **72 h** Behörde, bei hohem Risiko Betroffene, dokumentieren.
- Anonym = irreversibel (keine DSGVO) · Pseudonym = reversibel (DSGVO gilt).
- MDM: Lockdown, Wipe, Container für BYOD. User-CAL je Person, Device-CAL je Gerät. Update = gleiche Hauptversion, Upgrade = neue.

## Selbstcheck
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { modul: "FISI-6" })
```

**Weitere Aufgaben:** [[Aufgaben Konzeption und Administration#FISI-6 Datenschutz, Geräteverwaltung und Lizenzen]] · **Karteikarten:** [[Karten Konzeption und Administration]]

## Einschätzung
```dataviewjs
await dv.view("AP2/99 System/views/selbstcheck")
```

---
← [[FISI-5 Systemhärtung, Malware und Angriffe]] · Weiter: [[FISI-7 Programmierung und Skripte für Admins]] →
