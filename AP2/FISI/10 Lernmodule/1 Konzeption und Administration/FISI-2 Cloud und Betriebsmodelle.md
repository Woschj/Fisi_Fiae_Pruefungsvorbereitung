---
modul: FISI-2
titel: Cloud und Betriebsmodelle
bereich: Konzeption und Administration
pruefungsteil: "AP2 Teil 2 – Konzeption und Administration von IT-Systemen"
reihenfolge: 2
dauer: 90
status: neu
sicherheit: 0
zuletzt:
tags: [ap2/modul, ap2/fisi]
---
# FISI-2 · Cloud und Betriebsmodelle

> [!abstract] Überblick
> **Bereich:** [[Übersicht FISI Konzeption und Administration]]
> **Prüfung:** „Konzeption und Administration von IT-Systemen“
> **Dauer:** ca. 90 min · **Prüfungsrelevanz:** ★★★ – Cloud ist ein Dauerthema der AP2, häufig als Einstiegsaufgabe
> **Grundlagen aus AP1:** [[S5 Virtualisierung und Cloud]] · [[I2 Datenschutz]]

## Lernziele
- [ ] Ich kann IaaS, PaaS und SaaS erklären, abgrenzen und mit Beispielen belegen.
- [ ] Ich kann Public, Private, Hybrid und Community Cloud unterscheiden und für einen Fall empfehlen.
- [ ] Ich kann On-Premises und Cloud mit Vor- und Nachteilen vergleichen.
- [ ] Ich kann Abrechnungsmodelle und Kriterien für die Anbieterauswahl nennen.
- [ ] Ich kann Latenz, Datenschutz und Abhängigkeit als Risiken der Cloud beurteilen.

## So wird das geprüft
> [!info] Typische AP2-Aufgabentypen
> - **IaaS/PaaS/SaaS erläutern und mit Beispiel belegen** – als Tabelle oder als Zuordnung „welches Modell passt für E-Mail und Dateiablage?“.
> - **Vor- und Nachteile Cloud** bzw. **On-Premises vs. Public Cloud**.
> - **Public vs. Private Cloud** mit je zwei Argumenten, **Hybrid Cloud empfehlen** mit Vor- und Nachteil.
> - **Kriterien für die Anbieterauswahl**: Skalierbarkeit, Abrechnung, Sicherheit/Compliance (ISO 27001), Support und SLA, Standort der Daten.
> - **Pay-per-Use erklären** und **Latenz** als Problem bei vielen kleinen Zugriffen.
> - **Datenschutz in der Cloud**: Speicherort EU, Verschlüsselung, Auftragsverarbeitung.

---

## 1. Servicemodelle

**Merkhilfe:** Je weiter „oben“ das Modell, desto mehr erledigt der Anbieter – und desto weniger kannst du selbst anpassen.

| Ebene | On-Premises | **IaaS** | **PaaS** | **SaaS** |
|---|---|---|---|---|
| Anwendung | Kunde | Kunde | Kunde | **Anbieter** |
| Daten | Kunde | Kunde | Kunde | Kunde (Verantwortung bleibt!) |
| Laufzeit/Middleware | Kunde | Kunde | **Anbieter** | Anbieter |
| Betriebssystem | Kunde | Kunde | Anbieter | Anbieter |
| Virtualisierung, Server, Speicher, Netz | Kunde | **Anbieter** | Anbieter | Anbieter |

| Modell | Erläuterung | Beispiele |
|---|---|---|
| **IaaS** – Infrastructure as a Service | Der Kunde mietet **virtuelle Infrastruktur** (VMs, Speicher, Netze) und verwaltet Betriebssystem, Middleware und Anwendungen selbst. | virtuelle Maschine bei AWS EC2, Azure VM, Hetzner Cloud; Cloud-Speicher als Backupziel |
| **PaaS** – Platform as a Service | Der Kunde bekommt eine fertige **Entwicklungs- und Laufzeitumgebung** und kümmert sich nur um Anwendung und Daten. | Azure App Service, Google App Engine, verwaltete Datenbank (Azure SQL Database), Heroku |
| **SaaS** – Software as a Service | Der Kunde nutzt eine **fertige Anwendung** über das Internet, meist im Browser; Wartung und Updates übernimmt der Anbieter. | Microsoft 365, Gmail, Salesforce (CRM), Webshop-Baukasten, Cloud-Telefonanlage |

Weitere „as a Service“-Begriffe: **BaaS** (Backup as a Service – Datensicherung wird an einen Cloud-Anbieter ausgelagert, hochverfügbar und skalierbar), **DaaS** (Desktop as a Service, virtuelle Arbeitsplätze), **FaaS/Serverless** (einzelne Funktionen werden bei Bedarf ausgeführt).

---

## 2. Bereitstellungsmodelle

| Modell | Beschreibung | passt, wenn … |
|---|---|---|
| **Public Cloud** | Ressourcen eines Anbieters werden von vielen Kunden geteilt (mandantenfähig), Zugriff über das Internet | schnelle Skalierung, wenig eigenes Personal, schwankende Last |
| **Private Cloud** | Cloud-Infrastruktur exklusiv für ein Unternehmen – im eigenen RZ oder bei einem Dienstleister | hohe Anforderungen an Datenschutz, Kontrolle und Compliance |
| **Hybrid Cloud** | Kombination: sensible Systeme privat/lokal, skalierende Dienste in der Public Cloud | Mischbetrieb, z. B. Webshop öffentlich, Warenwirtschaft privat |
| **Community Cloud** | gemeinsam genutzt von Organisationen mit gleichen Anforderungen (z. B. Behörden, Kliniken) | gleiche rechtliche Vorgaben |
| **Multi-Cloud** | mehrere Public-Cloud-Anbieter parallel | Abhängigkeit (Vendor Lock-in) vermeiden |

**Argumente Public Cloud:** schnelle Einführung, Know-how des Anbieters, Betrieb und Wartung ausgelagert, große Auswahl, keine Investition.
**Argumente Private Cloud:** Sicherheitsregeln und Datenschutz selbst gestalten und kontrollieren, keine Abhängigkeit vom Anbieter, Vertrauen von Geschäftspartnern.

> [!example] Hybrid Cloud begründen
> **Empfehlung:** Hybrid Cloud. **Vorteil:** Kundendaten und Warenwirtschaft mit hohen Compliance-Anforderungen bleiben in der Private Cloud, der Webshop mit stark schwankender Last skaliert in der Public Cloud. **Nachteil:** Betrieb und Integration zweier Umgebungen sind komplexer und brauchen Know-how und Schnittstellen.

---

## 3. On-Premises oder Cloud

| **On-Premises** (eigenes Rechenzentrum) | **Public Cloud** |
|---|---|
| volle Kontrolle und **Datenhoheit** | **keine Investition** in Hardware (Opex statt Capex) |
| Hardware frei wählbar, Nähe zu anderen lokalen Systemen, **geringe Latenz** | **flexible Skalierung**, Pay-per-Use |
| keine Abhängigkeit von Internetleitung und Anbieter | keine Verantwortung für Updates, Plattform und Infrastruktur |
| hohe Investition, eigenes Personal, Wartung, Energie | Backup und Recovery als Service buchbar |
| Skalierung nur durch Kauf neuer Hardware | **Abhängigkeit** von Anbieter (Lock-in) und Leitung, Datenschutz prüfen |

> [!tip] „Billiger“ reicht nicht
> Für „die Cloud ist billiger“ ohne Begründung gibt es keine volle Punktzahl. Formuliere z. B.: „Es fallen keine Anschaffungskosten für Server an; bezahlt wird nur die tatsächlich genutzte Leistung.“

### Latenz
**Latenz** ist die **Verzögerung zwischen Senden und Empfangen** eines Signals (Laufzeit). Ursachen: lange Leitungswege, viele aktive Komponenten, überlastete Geräte, Warteschlangen. Sie stört besonders bei **vielen kleinen Anfragen** (z. B. serielle SQL-Abfragen, viele kleine Dateien), weil jede Anfrage die volle Laufzeit abwartet. **Wichtig:** Die **Bandbreite** der Leitung ändert sich durch Latenz nicht; der **effektive Durchsatz** sinkt aber, weil zwischen Anfrage und Antwort gewartet wird.

---

## 4. Abrechnung und Anbieterauswahl

| Abrechnungsmodell | Bedeutung |
|---|---|
| **Pay-per-Use / Pay-as-you-go** | nur die tatsächlich genutzten Ressourcen (Speicher in GB, CPU-Stunden, RAM, Datenverkehr) |
| **Pay-as-you-grow** | Preis wächst mit der Nutzerzahl bzw. Größe |
| **Flatrate / Abo** | fester Monatsbetrag pro Nutzer oder Paket (typisch bei SaaS) |
| **Reservierung** | langfristige Zusage (1–3 Jahre) gegen Rabatt |

**Kriterien für die Anbieterauswahl:**
- **Skalierbarkeit** und flexible Abrechnung
- **Sicherheit und Compliance:** Zertifizierung (ISO 27001, BSI C5), Verschlüsselung, Authentifizierung (MFA)
- **Datenschutz:** Rechenzentren in der **EU**, **Auftragsverarbeitungsvertrag** (Art. 28 DSGVO), keine Übermittlung in unsichere Drittländer
- **SLA:** garantierte Verfügbarkeit, Reaktionszeiten, Support rund um die Uhr, Ticketsystem, Vertragsstrafen
- **Exit-Strategie:** Datenexport in offenen Formaten, Kündigungsfristen – gegen **Vendor Lock-in**
- Performance und Anbindung (Latenz, Bandbreite zum Standort)

### Datenschutz in der Cloud
Die **Verantwortung für die Daten bleibt beim Unternehmen**, auch in SaaS. Zu klären: Ort der Speicherung (Deutschland/EU oder Drittland), Klassifizierung der Daten, Zugriffsschutz, **Verschlüsselung** (am besten mit eigenem Schlüssel), Löschkonzept. Besonders schützenswerte Daten (Zahlungsdaten, Passwörter, Gesundheitsdaten nach Art. 9 DSGVO) nur verschlüsselt und mit konformem AV-Vertrag in die Cloud; Kartenprüfnummern werden **nie** gespeichert, Passwörter nur als **Hash mit Salt**.

---

> [!warning] Typische Fehler in Prüfungen
> - PaaS und SaaS verwechseln: **PaaS = Plattform zum Entwickeln/Betreiben eigener Anwendungen**, SaaS = fertige Anwendung.
> - Bei „Kriterien für einen Provider“ nur „Preis“ nennen – gefragt sind Sicherheit, SLA, Skalierbarkeit, Datenschutz.
> - Private Cloud mit „im eigenen Keller“ gleichsetzen – sie kann auch bei einem Dienstleister laufen, entscheidend ist die **exklusive Nutzung**.
> - Vergessen, dass auch in der Cloud die DSGVO-Verantwortung beim Unternehmen bleibt.

## Verwandte Themen
- [[FISI-1 Server, Virtualisierung und Container]] – Technik hinter der Cloud
- [[FISI-4 Datensicherung, Archivierung und Notfallvorsorge]] – Backup as a Service, RTO/RPO
- [[FISI-6 Datenschutz, Geräteverwaltung und Lizenzen]] – Auftragsverarbeitung, TOM
- [[FISI-16 Netzwerkanalyse, Fehlersuche und WAN]] – Anbindung und Latenz
- [[S5 Virtualisierung und Cloud]] – Grundlagen aus AP1

## Zusammenfassung
- IaaS = Infrastruktur mieten · PaaS = Plattform zum Entwickeln/Betreiben · SaaS = fertige Anwendung.
- Public (geteilt), Private (exklusiv), Hybrid (Mischung), Community (gleiche Anforderungen), Multi-Cloud.
- Cloud: Opex statt Capex, Skalierung, Pay-per-Use – aber Abhängigkeit, Latenz, Datenschutz.
- Anbieterauswahl: Skalierbarkeit, Abrechnung, ISO 27001/C5, SLA/Support, EU-Rechenzentrum + AVV, Exit-Strategie.

## Selbstcheck
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { modul: "FISI-2" })
```

**Weitere Aufgaben:** [[Aufgaben Konzeption und Administration#FISI-2 Cloud und Betriebsmodelle]] · **Karteikarten:** [[Karten Konzeption und Administration]]

## Einschätzung
```dataviewjs
await dv.view("AP2/99 System/views/selbstcheck")
```

---
← [[FISI-1 Server, Virtualisierung und Container]] · Weiter: [[FISI-3 Speicher und RAID planen]] →
