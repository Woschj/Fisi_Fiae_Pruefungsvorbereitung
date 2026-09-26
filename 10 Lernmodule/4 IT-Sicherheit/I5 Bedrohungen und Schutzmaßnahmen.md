---
modul: I5
titel: Bedrohungen und Schutzmaßnahmen
bereich: IT-Sicherheit
reihenfolge: 27
dauer: 120
status: neu
sicherheit: 0
zuletzt:
berufsschule: "ITG · LF4 · Evp-CPS LF3 LS3.1 (Nutzerordnung/BYOD) · SuD LS5.4 (Passwort-Validator)"
tags: [ap1/modul, ap1/sicherheit]
---
# I5 · Bedrohungen und Schutzmaßnahmen

> [!abstract] Überblick
> **Bereich:** [[Übersicht IT-Sicherheit]]
> **Dauer:** ca. 2 h · **Prüfungsrelevanz:** ★★★ – Schadsoftware unterscheiden, Angriffe erkennen, Maßnahmen begründen, Verhalten bei Vorfällen
> **Voraussetzungen:** [[I1 Informationssicherheit und IT-Grundschutz]], [[I4 Kryptografie]]
> **Berufsschule:** ITG LF4 · Evp-CPS LF3 LS3.1 (Nutzerordnung) · SuD LF5 LS5.4 (Passwortkriterien, Entropie)

## Lernziele
- [ ] Ich kann Arten von Schadsoftware unterscheiden (Virus, Wurm, Trojaner, Ransomware, Spyware, Rootkit, Botnetz).
- [ ] Ich kann typische Angriffe (Phishing, Social Engineering, Brute Force, DDoS, MitM, SQL-Injection) erkennen und Gegenmaßnahmen nennen.
- [ ] Ich kann Authentifizierungsverfahren und MFA erklären und eine Passwortrichtlinie begründen.
- [ ] Ich kann Firewall-Arten und weitere Schutzmaßnahmen am Arbeitsplatz einordnen.
- [ ] Ich kann das richtige Vorgehen bei einem Sicherheitsvorfall beschreiben.

## Worum geht es?
Die meisten erfolgreichen Angriffe beginnen nicht mit „Hacker knacken die Firewall“, sondern mit einer **gut gemachten Mail**, einem **wiederverwendeten Passwort** oder einem **fehlenden Update**. Du musst Angriffe erkennen, Kolleg:innen beraten und im Ernstfall richtig reagieren.

---

## 1. Schadsoftware (Malware)

| Art | Merkmal | Verbreitung |
|---|---|---|
| **Virus** | hängt sich an Dateien/Programme; wird aktiv, wenn der **Wirt ausgeführt** wird | über infizierte Dateien, braucht Mitwirkung |
| **Wurm** | verbreitet sich **selbstständig** über Netzwerke und Sicherheitslücken | ohne Nutzeraktion, sehr schnell |
| **Trojaner** | **tarnt sich** als nützliches Programm, führt heimlich Schadfunktionen aus (z. B. Hintertür/Backdoor, RAT) | Download, Mailanhang |
| **Ransomware** | **verschlüsselt Daten** und erpresst Lösegeld; oft zusätzlich Datendiebstahl mit Veröffentlichungsdrohung (Double Extortion) | Phishing, Lücken, RDP |
| **Spyware / Keylogger** | späht Daten bzw. Tastatureingaben aus | Trojaner |
| **Adware** | unerwünschte Werbung | Bundles |
| **Rootkit** | versteckt sich tief im System (Kernel), verbirgt andere Malware | nach Kompromittierung |
| **Bot / Botnetz** | ferngesteuerte infizierte Rechner, z. B. für Spam oder DDoS | Wurm/Trojaner |
| **Scareware** | Falschmeldung („Ihr PC ist infiziert!“), verkauft nutzlose Software | Webseiten |

**Zero-Day-Exploit:** nutzt eine Lücke aus, für die es noch **kein Update** gibt.

## 2. Angriffe

| Angriff | Beschreibung | Gegenmaßnahmen |
|---|---|---|
| **Phishing** | gefälschte Mails/Webseiten, um Zugangsdaten oder Zahlungen zu erschleichen; **Spear-Phishing** = gezielt auf eine Person/Firma zugeschnitten; **Smishing** (SMS), **Vishing** (Anruf), **Quishing** (QR-Code) | Schulung, Mailfilter, Link-Prüfung, **MFA**, Meldeweg |
| **Social Engineering** | Manipulation von Menschen (Hilfsbereitschaft, Autorität, Zeitdruck), z. B. Anruf als „IT-Support“ | Awareness, Rückruf über bekannte Nummer, klare Prozesse |
| **CEO-Fraud** | angebliche Chef-Anweisung zu dringender, geheimer Überweisung | **Vier-Augen-Prinzip**, Rückruf, feste Freigabeprozesse |
| **Brute Force / Wörterbuch** | Passwörter systematisch durchprobieren | lange Passwörter, Kontosperre/Verzögerung nach Fehlversuchen, MFA |
| **Credential Stuffing** | geleakte Passwort-Kombinationen bei anderen Diensten ausprobieren | **kein Passwort mehrfach verwenden**, Passwortmanager, MFA |
| **Man-in-the-Middle** | Angreifer schaltet sich in die Verbindung (z. B. offenes WLAN, ARP-Spoofing) | TLS/VPN, Zertifikate prüfen, WPA3 |
| **DoS / DDoS** | Überlastung eines Dienstes (DDoS: von vielen Rechnern/Botnetz) | Provider-Schutz, CDN, Filter, Redundanz |
| **SQL-Injection** | Schadcode über Eingabefelder in Datenbankabfragen | **Prepared Statements**, Eingaben validieren |
| **Cross-Site-Scripting (XSS)** | Schadskript wird über eine Webseite im Browser anderer Nutzer ausgeführt | Ausgaben escapen, Content Security Policy |
| **Drive-by-Download** | Infektion schon beim Besuch einer präparierten Webseite | Updates von Browser/Plugins, Werbeblocker |
| **Baiting / USB-Drop** | „gefundener“ USB-Stick mit Schadsoftware | fremde Datenträger nie anschließen, USB-Ports sperren |
| **Shoulder Surfing / Tailgating** | Mitlesen über die Schulter / hinter jemandem durch die Tür schlüpfen | Blickschutzfolie, Zutrittskontrolle, Besucher begleiten |

> [!example] Phishing-Mail erkennen
> - Absenderadresse passt nicht (`service@paypa1-sicherheit.com`)
> - Druck und Drohung („Ihr Konto wird in 24 h gesperrt!“)
> - unpersönliche Anrede, Fehler, ungewöhnliche Aufforderung (Passwort, Überweisung, Makros aktivieren)
> - Link-Ziel (Mauszeiger darüber) führt auf eine fremde Domain
> - unerwarteter Anhang (`.zip`, `.iso`, `.html`, Office mit Makros)

---

## 3. Authentifizierung
**Identifikation** (wer behauptet man zu sein? – Benutzername) → **Authentifizierung** (Nachweis) → **Autorisierung** (was darf man? – Rechte).

**Faktoren:**

| Kategorie | Beispiele |
|---|---|
| **Wissen** | Passwort, PIN, Sicherheitsfrage |
| **Besitz** | Smartphone mit Authenticator-App (TOTP), Hardware-Token/Sicherheitsschlüssel (FIDO2), Chipkarte |
| **Inhärenz (Sein)** | Fingerabdruck, Gesichtserkennung |

**Mehr-Faktor-Authentifizierung (MFA/2FA):** mindestens **zwei Faktoren aus verschiedenen Kategorien** (Passwort + zweites Passwort ist *keine* MFA!). Selbst wenn das Passwort gestohlen wird, fehlt dem Angreifer der zweite Faktor. Am sichersten: **FIDO2/Passkeys** (phishing-resistent), dann Authenticator-App; SMS-Codes gelten als schwächer.

**Single Sign-on (SSO):** einmal anmelden, Zugriff auf viele Dienste – bequem, aber das eine Konto muss besonders geschützt sein (MFA).

### Passwortrichtlinie (nach BSI-Empfehlungen)
- **Länge vor Komplexität:** z. B. mind. 12 Zeichen mit mehreren Zeichenarten oder eine lange Passphrase (4–5 zufällige Wörter)
- **kein Wiederverwenden**, keine Wörter aus dem Wörterbuch, keine persönlichen Daten
- **Passwortmanager** nutzen
- **kein erzwungener regelmäßiger Wechsel ohne Anlass** – aber sofortiger Wechsel bei Verdacht auf Kompromittierung
- Standardpasswörter von Geräten immer ändern
- Anzahl möglicher Kombinationen: **Zeichenvorrat ^ Länge** → jedes zusätzliche Zeichen multipliziert den Aufwand

> [!example] Warum Länge zählt
> 8 Zeichen aus 62 (a–z, A–Z, 0–9): 62⁸ ≈ 2,2 · 10¹⁴ Kombinationen – bei 10¹⁰ Versuchen/s in **6 Stunden** durchprobiert.
> 12 Zeichen aus 62: 62¹² ≈ 3,2 · 10²¹ → bei gleicher Rate **ca. 10 000 Jahre**.

---

## 4. Technische Schutzmaßnahmen

### Firewall
| Art | prüft | Beispiel |
|---|---|---|
| **Paketfilter** (stateless) | einzelne Pakete nach IP, Port, Protokoll (Schicht 3/4) | „TCP 443 zu 192.168.60.10 erlauben“ |
| **Stateful Inspection** | zusätzlich den **Verbindungszustand** – Antworten zu erlaubten Verbindungen werden automatisch zugelassen | Standard jeder Firewall |
| **Application-Level-Gateway / Proxy** | Inhalte auf Anwendungsebene (Schicht 7) | Webproxy mit Filter |
| **Next-Generation-Firewall (NGFW)** | Anwendungserkennung, IPS, TLS-Inspektion, Benutzerbezug | Unternehmensgrenze |
| **Personal/Host-Firewall** | auf dem Endgerät | Windows-Firewall |
| **Web Application Firewall (WAF)** | schützt Webanwendungen (SQL-Injection, XSS) | vor dem Webshop |

Grundregel: **Default Deny** – alles verbieten, nur Benötigtes erlauben. **DMZ** für öffentlich erreichbare Server.

<!-- abb:dmz -->
![[dmz.svg]]
*Abb.: Netz mit DMZ und Firewall-Regeln zwischen den Zonen*

### Weitere Maßnahmen
- **Patchmanagement:** Betriebssystem, Anwendungen, Firmware zeitnah aktualisieren (die meisten Angriffe nutzen bekannte Lücken)
- **Virenschutz / EDR** (Endpoint Detection and Response – erkennt verdächtiges Verhalten)
- **IDS/IPS:** Angriffe im Netzwerk erkennen / verhindern; **SIEM** sammelt und korreliert Logs
- **Least Privilege**, keine Adminrechte im Alltag, Application Whitelisting
- **Netzsegmentierung** (VLANs), Gästenetz getrennt
- **Verschlüsselung** von Datenträgern und Verbindungen
- **E-Mail-Sicherheit:** Spamfilter, Anhangfilter, SPF/DKIM/DMARC, Makros deaktivieren
- **Backup** offline/unveränderbar ([[I3 Datensicherung]])
- **Mobile Device Management**, USB-Sperre
- organisatorisch: Schulungen, **Nutzungsordnung/Sicherheitsrichtlinie**, Clean-Desk, Bildschirmsperre (Win + L), Meldewege, Notfallplan

---

## 5. Verhalten bei einem Sicherheitsvorfall (z. B. Ransomware)
1. **Ruhe bewahren**, Gerät **vom Netzwerk trennen** (LAN-Kabel ziehen, WLAN aus) – **nicht ausschalten** (Spuren im Arbeitsspeicher für die Analyse)
2. **Sofort melden** an IT-Sicherheit/Vorgesetzte (definierter Meldeweg, Notfallnummer)
3. Nichts auf eigene Faust „reparieren“, Vorfall **dokumentieren** (Uhrzeit, Meldung, was getan wurde)
4. IT: Ausbreitung eindämmen (betroffene Konten sperren, Segmente isolieren), Ursache analysieren
5. **Datenschutz prüfen** – ggf. Meldung an die Aufsichtsbehörde binnen **72 h** ([[I2 Datenschutz]]); ggf. Strafanzeige
6. Systeme neu aufsetzen, aus **sauberem Backup** wiederherstellen, Passwörter ändern
7. **Kein Lösegeld zahlen** (Empfehlung von BSI und Polizei: keine Garantie, finanziert Kriminalität)
8. Lessons Learned: Maßnahmen verbessern

<!-- erg:XSS und CSRF -->
## 6. Weitere Angriffe und Schutzprinzipien
| Angriff | Funktionsweise | Schutz |
|---|---|---|
| **Cross-Site Scripting (XSS)** | Angreifer schleust **Skriptcode** über Eingaben (Kommentar, Formular) ein, der im Browser anderer Nutzer ausgeführt wird – z. B. um Sitzungscookies zu stehlen | Eingaben prüfen, **Ausgaben maskieren** (HTML-Encoding), Content Security Policy, Cookies mit HttpOnly |
| **Cross-Site Request Forgery (CSRF)** | eine fremde Seite löst unbemerkt eine Aktion im Namen des **eingeloggten** Nutzers aus (z. B. Überweisung, Passwortänderung) | **CSRF-Token** in Formularen, SameSite-Cookies, erneute Bestätigung bei kritischen Aktionen |
| **Spoofing** | Vortäuschen einer falschen Identität: gefälschte Absenderadresse (E-Mail), IP-, ARP- oder DNS-Spoofing | E-Mail: **SPF, DKIM, DMARC**; Netz: Port Security, DHCP-Snooping, signierte DNS-Antworten |
| **Brute Force / Wörterbuch** | Passwörter systematisch durchprobieren | lange Passwörter, Sperre/Verzögerung nach Fehlversuchen, MFA |

**Security by Design:** Sicherheit wird **von Anfang an** in Planung und Entwicklung berücksichtigt, nicht nachträglich angebaut (z. B. Eingaben grundsätzlich prüfen, verschlüsselte Übertragung, Rollenkonzept).
**Security by Default:** Auslieferung mit **sicheren Voreinstellungen** – nur nötige Dienste aktiv, kein Standardpasswort, Updates automatisch. Im Datenschutz entspricht das **Privacy by Design/by Default** (Art. 25 DSGVO).
**Endpoint Security:** Schutz der Endgeräte als ganzes Paket – Virenschutz bzw. **EDR** (erkennt verdächtiges Verhalten), Firewall, Geräteverschlüsselung, Gerätekontrolle (USB), Patchstand, zentrale Verwaltung. Dazu gehört die **Härtung** des Betriebssystems ([[S4 Betriebssysteme, Dateisysteme und Rechte]]).

---

> [!warning] Typische Fehler in Prüfungen
> - Virus und Wurm verwechseln (Wurm = **selbstständige** Verbreitung).
> - „Passwort + Sicherheitsfrage“ als 2FA bezeichnen (beides Wissen).
> - Bei Ransomware „PC ausschalten“ oder „Lösegeld zahlen“.
> - Nur technische Maßnahmen gegen Phishing nennen – **Schulung** ist die wichtigste.
> - Firewall als Schutz vor Phishing oder Social Engineering verkaufen.

## Verwandte Themen
- [[N4 Netzwerkdienste und Protokolle]] – Ports und Dienste
- [[I3 Datensicherung]] – Wiederherstellung nach Angriffen
- [[S4 Betriebssysteme, Dateisysteme und Rechte]] – Rechte und Patchmanagement

## Zusammenfassung
- Virus (Wirt), Wurm (selbstständig), Trojaner (Tarnung), Ransomware (Verschlüsselung + Erpressung), Spyware, Rootkit, Botnetz.
- Phishing/Social Engineering/CEO-Fraud: Schulung, MFA, Vier-Augen-Prinzip, Rückruf.
- Brute Force/Credential Stuffing: lange, einzigartige Passwörter, Passwortmanager, MFA, Sperren.
- MFA = Faktoren aus verschiedenen Kategorien (Wissen, Besitz, Sein).
- Firewall-Arten, Default Deny, Patchmanagement, EDR, Segmentierung, Backup.
- Vorfall: trennen, melden, dokumentieren, eindämmen, Datenschutz prüfen, aus Backup wiederherstellen.

## Direkt üben
```dataviewjs
await dv.view("99 System/views/trainer", { typen: ["passwort"] })
```

## Selbstcheck
```dataviewjs
await dv.view("99 System/views/quiz", { modul: "I5" })
```

**Weitere Aufgaben:** [[Aufgaben IT-Sicherheit#I5 Bedrohungen und Schutzmaßnahmen]] · **Karteikarten:** [[Karten IT-Sicherheit]]

## Einschätzung
```dataviewjs
await dv.view("99 System/views/selbstcheck")
```

---
← [[I4 Kryptografie]] · Weiter: [[W1 Beschaffung und Kalkulation]] →
