---
modul: FIAE-7
titel: Schnittstellen, Web und Architektur
bereich: Planen eines Softwareproduktes
pruefungsteil: "AP2 Teil 2 – Planen eines Softwareproduktes / Entwicklung und Umsetzung von Algorithmen"
reihenfolge: 7
dauer: 150
status: neu
sicherheit: 0
zuletzt:
tags: [ap2/modul, ap2/fiae]
---
# FIAE-7 · Schnittstellen, Web und Architektur

> [!abstract] Überblick
> **Bereich:** [[Übersicht FIAE Planen eines Softwareproduktes]]
> **Prüfung:** beide FIAE-Teile
> **Dauer:** ca. 150 min · **Prüfungsrelevanz:** ★★★ – REST-API mit CRUD, Request-Aufbau und Statuscodes, HTTP-Antwort bauen, XML/XSD-Validierung, Netzwerkkonzepte und Ethernet-Frame, LoRa, Compiler/Interpreter, Bibliotheken, Versionsverwaltung
> **Grundlagen aus AP1:** [[N7 Internet und Webanwendungen]] · [[N1 Netzwerkgrundlagen und OSI-Modell]] · [[S2 Programmierung – Grundlagen]]

## Lernziele
- [ ] Ich kann cyber-physische Systeme mit Sensoren und Aktoren beschreiben und Anforderungen an sie nennen.
- [ ] Ich kann Monitoring, Ticketsystem und Incident-Management im Betrieb einer Anwendung erklären.
- [ ] Ich kann das Konzept einer REST-API erklären, CRUD den HTTP-Methoden zuordnen und einen Request zerlegen.
- [ ] Ich kenne die HTTP-Statuscode-Klassen und kann eine HTTP-Antwort aufbauen.
- [ ] Ich kann JSON und XML lesen und Schemavalidierung (XSD) einordnen.
- [ ] Ich kann Architekturen (Client-Server, Schichten, MVC, Microservices) vergleichen.
- [ ] Ich kann Compiler und Interpreter, Bibliotheken, Versionsverwaltung und CI/CD erklären.
- [ ] Ich kann Netzwerkkonzepte (LAN, SAN, LPWAN/LoRa) zuordnen und den Aufbau eines Ethernet-Frames und einer MAC-Adresse erklären.

## So wird das geprüft
> [!info] Typische AP2-Aufgabentypen
> - **REST-API erklären, CRUD ↔ HTTP-Methoden, Bestandteile eines PUT-Requests (URL, Methode, Header, Body), Statuscode-Klassen**; **URL-Parameter beschreiben**, zwei weitere HTTP-Methoden.
> - **HTTP-Response in Pseudocode bauen** mit Statuscode, Content-Type, Content-Length und Body.
> - **eRechnung als XML**: Validierung, Schema prüft nur Struktur, Logikfehler Brutto/Netto.
> - **Netzwerkkonzept zuordnen** (IoT → LPWAN, Unternehmen → LAN, Rechenzentrum → SAN), **Ethernet-Frame ordnen**, **MAC-Adresse** erklären, PowerShell-Skript zum Netzscan; **LoRa** Merkmale und Eignung.
> - **Compiler vs. Interpreter**, **Bibliotheken**, **Klassendokumentation**, **Versionsverwaltung**, **Prototyping**.

---

## 1. REST-API

**REST** (Representational State Transfer) ist ein Architekturstil für Web-Schnittstellen:
- Jede **Ressource** ist über eine eindeutige **URL** erreichbar (`https://api.example.org/kunden/25`).
- Operationen über die **HTTP-Methoden**.
- **Zustandslos:** Jeder Request enthält alle nötigen Informationen; der Server speichert keinen Sitzungszustand zwischen Aufrufen.
- **Client und Server lose gekoppelt**, Daten meist als **JSON** (auch XML).
- Cachebar, einheitliche Schnittstelle, Schichtenarchitektur möglich.

| CRUD | Bedeutung | HTTP-Methode |
|---|---|---|
| **C**reate | Ressource anlegen | **POST** (bzw. PUT an eine feste URL) |
| **R**ead | lesen | **GET** |
| **U**pdate | ändern | **PUT** (komplett ersetzen) / **PATCH** (teilweise) |
| **D**elete | löschen | **DELETE** |

**Idempotent** (mehrfach ausgeführt = gleiche Wirkung): GET, PUT, DELETE – **nicht** POST.

### Aufbau eines Requests
```
PUT https://api.example.org/members/25          ← Methode + Endpoint-URL
content-type: application/json               ← Header: Metadaten,
accept: application/json                        Authentifizierung (Token, API-Key),
authorization: Bearer eyJhbGciOi...             Cookies
                                             ← Leerzeile
{ "name": "Hannah Müller",                   ← Body: Daten (JSON)
  "address": [{ "street": "Hauptstr. 12", "pc": "50667", "city": "Köln" }],
  "id": 25 }
```
**URL-Parameter:** `https://api.example.org/v1/forecast?lat=51.45&lon=7.01&days=3&units=metric` – nach dem `?` stehen **Query-Parameter** als `name=wert`, getrennt mit `&` (Position, Anzahl Tage, Einheiten); Pfadparameter stehen im Pfad (`/kunden/25`).

### HTTP-Statuscodes
| Klasse | Bedeutung | Beispiele |
|---|---|---|
| **1xx** | Information | 101 Switching Protocols |
| **2xx** | **Erfolg** | 200 OK, **201 Created**, 204 No Content |
| **3xx** | Umleitung | 301 Moved Permanently, 304 Not Modified |
| **4xx** | **Fehler des Clients** | **400** Bad Request, **401** Unauthorized (nicht angemeldet), **403** Forbidden (keine Berechtigung), **404** Not Found, 409 Conflict |
| **5xx** | **Fehler des Servers** | **500** Internal Server Error, 502 Bad Gateway, 503 Service Unavailable |

**Antwort bauen**:
```
response ← new HttpResponse(statusCode)
response.addHeader("Content-Type", "text/plain")
response.addHeader("Content-Length", String(Length(nachricht)))
response.setBody(nachricht)
return response
```

**Authentifizierung an APIs:** API-Key im Header, **Basic Auth** (Base64 – nur über HTTPS!), **Bearer-Token/JWT**, **OAuth 2.0** (delegierte Berechtigung), mTLS mit Zertifikaten.

---

## 2. Datenformate

| Format | Merkmale |
|---|---|
| **JSON** | Objekte `{ }`, Arrays `[ ]`, Schlüssel-Wert-Paare, kompakt, Standard bei REST |
| **XML** | Tags `<rechnung>…</rechnung>`, Attribute, Namensräume; Struktur prüfbar mit **XSD** (Schema) |
| **CSV** | Tabellen als Text, Trennzeichen – einfach, aber nicht genormt |
| YAML | lesbar, Konfigurationen |

**Schemavalidierung (XSD)** prüft nur die **Struktur**: richtige Elemente, Reihenfolge, Datentypen, Pflichtfelder. **Logische Fehler** (Netto-Summe aus Bruttowerten gebildet) findet sie nicht – dafür braucht es **Unit-Tests** und fachliche Prüfregeln.

---

## 3. Architektur

| Architektur | Merkmal |
|---|---|
| **Client-Server** | Clients fordern Dienste beim Server an |
| **Schichtenarchitektur** (3-Tier) | **Präsentation** – **Logik** – **Datenhaltung** getrennt |
| **MVC** | **Model** (Daten und Geschäftslogik), **View** (Anzeige), **Controller** (verarbeitet Eingaben, steuert) |
| **Monolith** | eine große Anwendung – einfach zu starten, schwer zu skalieren und zu ändern |
| **Microservices** | viele kleine, unabhängig deploybare Dienste mit eigener Datenhaltung, kommunizieren über APIs – skalierbar, aber komplexer (Netz, Monitoring) |
| Serverless/FaaS | Funktionen laufen bei Bedarf in der Cloud |

### Entwicklungswerkzeuge
| Begriff | Erklärung |
|---|---|
| **Compiler** | übersetzt den Quellcode **einmal vollständig** vor der Ausführung (C, C++, Rust; Java/C# in Bytecode) – schnelle Ausführung, Fehler vorab |
| **Interpreter** | übersetzt **bei jeder Ausführung** Zeile für Zeile (Python, PHP, JavaScript) – schnelles Testen, aber langsamer |
| **Bibliothek / Framework** | fertige, getestete Funktionen wiederverwenden – spart Zeit; Einarbeitung, Abhängigkeit, Lizenzen und Sicherheitslücken beachten |
| **Versionsverwaltung** (Git) | Änderungen nachvollziehen, **parallel arbeiten** (Branches, Merge), Konflikte auflösen, alte Stände wiederherstellen – bei mehreren Entwicklern unverzichtbar |
| **CI/CD** | Continuous Integration (bei jedem Commit bauen und testen) / Continuous Delivery/Deployment (automatisch ausliefern) |
| **Code signieren** | Hersteller signiert das Programm mit einem Zertifikat → Betriebssystem erkennt Herkunft und Unverändertheit (sonst Warnung „unbekannter Herausgeber“) |
| **Klassendokumentation** | Zweck der Klasse, Konstruktoren und Methoden mit Parametern, Rückgabewerten und Wirkung, Vorbedingungen, geerbte Methoden, Interfaces (z. B. Javadoc, XML-Doc) |

**Prototyping:** eine vereinfachte Version bauen, um Machbarkeit und Aufwand von Lösungsansätzen abzuschätzen – sinnvoll, wenn Erfahrungswerte fehlen oder weitere Entscheidungen davon abhängen.

---

## 4. Netzwerkgrundlagen für Entwickler

| Netzkonzept | passt für | Begründung |
|---|---|---|
| **LPWAN** (Low Power Wide Area Network, z. B. **LoRaWAN**, NB-IoT) | **IoT**, Sensoren im Feld | hohe Reichweite (km), sehr **niedriger Energieverbrauch** (Batterie für Jahre), günstig – dafür **geringe Datenrate** |
| **LAN** | Unternehmensnetz | hohe Bandbreite, geringe Latenz, Sicherheit |
| **SAN** | Rechenzentrum | schneller Blockzugriff zwischen Servern und Speichersystemen |
| WLAN, Bluetooth, 5G | mobile Endgeräte | |

**LoRa:** Funk im lizenzfreien Band (868 MHz in Europa), Reichweite mehrere Kilometer, sehr sparsam, kleine Datenmengen – ideal für Bodenfeuchte-Messwerte. Zur Integrität zusätzlich **Nachrichten signieren bzw. mit MAC absichern** (LoRaWAN verschlüsselt mit AES-128).

**Ethernet-Frame** (Reihenfolge): **Präambel + SFD** (8 Byte) → **Ziel-MAC** (6 Byte) → **Quell-MAC** (6 Byte) → **Typ/Länge** (2 Byte, bei VLAN davor 4-Byte-Tag) → **Nutzdaten** (46–1 500 Byte) → **FCS/Prüfsumme** (4 Byte).
**MAC-Adresse:** 6 Byte (48 Bit), hexadezimal geschrieben (`00:1A:2B:3C:4D:5E`); die ersten 3 Byte sind die **Herstellerkennung (OUI)**, die letzten 3 Byte identifizieren das Gerät.

**Netzscan als Skript** (Pseudocode/PowerShell): Schleife über alle Hostadressen 1–254 eines /24, IP zusammensetzen (`"$prefix.$host"`), MAC abfragen (ARP), gefundene Paare in ein Ergebnis-Array schreiben.

---

## 5. Cyber-physische Systeme

Ein **cyber-physisches System (CPS)** verbindet Software mit der physischen Welt: **Sensoren** erfassen Messwerte (Temperatur, Bodenfeuchte, Position), eine **Steuerung** mit eingebetteter Software wertet sie aus, **Aktoren** greifen ein (Ventil öffnen, Motor starten, Schloss entriegeln). Die Komponenten sind vernetzt und oft mit einem Backend in der Cloud verbunden (**IoT**).

| Baustein | Aufgabe | Beispiel |
|---|---|---|
| **Sensor** | wandelt eine physikalische Größe in ein Signal bzw. einen Messwert | Feuchtesensor im Feld |
| **Steuerung** | verarbeitet Messwerte nach Regeln, sendet Befehle | Mikrocontroller, Gateway |
| **Aktor** | setzt ein Steuersignal in eine physische Wirkung um | Magnetventil der Bewässerung |
| **Kommunikation** | überträgt Messwerte und Befehle | LoRaWAN, MQTT, REST |

**Besondere Anforderungen:** Echtzeitfähigkeit, geringer Energiebedarf, Ausfallsicherheit (sicherer Zustand bei Verbindungsverlust, z. B. Ventil schließt), Schutz vor Manipulation (Authentizität und Integrität der Befehle), Updates aus der Ferne.

---

## 6. Betrieb: Monitoring, Ticketsystem und Incident-Management

Nach dem Rollout muss eine Anwendung **überwacht und betreut** werden.

- **Monitoring:** Verfügbarkeit, Antwortzeiten, Fehlerraten, Auslastung (CPU, Speicher, Datenbank) und Logdateien laufend messen; bei Grenzwertüberschreitung **automatisch alarmieren**. Werkzeuge z. B. Prometheus/Grafana, Zabbix, zentrales Logging.
- **Ticketsystem:** Jede Störung und jede Anfrage wird als **Ticket** erfasst – mit Priorität, Zuständigkeit, Status und Verlauf. Vorteile: nichts geht verloren, Bearbeitungszeiten sind messbar, Wissen wird dokumentiert.
- **Incident-Management** (nach ITIL): Ziel ist, den **Normalbetrieb so schnell wie möglich wiederherzustellen** – erfassen → klassifizieren und priorisieren (Auswirkung × Dringlichkeit) → erste Lösung/Workaround → eskalieren (1st → 2nd → 3rd Level) → lösen → dokumentieren und schließen.
- **Problem-Management:** sucht die **Ursache** wiederkehrender Incidents und beseitigt sie dauerhaft.
- **SLA:** vereinbarte Reaktions- und Lösungszeiten je Priorität.

---

> [!warning] Typische Fehler in Prüfungen
> - POST und PUT gleichsetzen – POST legt neu an (nicht idempotent), PUT ersetzt an einer bekannten URL.
> - 401 und 403 verwechseln: 401 = **nicht authentifiziert**, 403 = **authentifiziert, aber nicht berechtigt**.
> - REST als „Protokoll“ bezeichnen – es ist ein **Architekturstil** auf Basis von HTTP.
> - Header und Body vertauschen.
> - Glauben, eine gültige XSD-Validierung garantiere richtige Beträge.

## Verwandte Themen
- [[FIAE-8 Sicherheit in der Softwareentwicklung]] – Authentifizierung, TLS, Signaturen
- [[FIAE-10 Objektorientierte Programmierung umsetzen]] – Methoden der API implementieren
- [[FIAE-11 Testen und Qualitätssicherung]] – Tests von Schnittstellen
- [[N7 Internet und Webanwendungen]] – HTTP-Grundlagen (AP1)

## Zusammenfassung
- CPS: Sensor misst → Steuerung entscheidet → Aktor wirkt; vernetzt, energiesparend, manipulationssicher.
- Betrieb: Monitoring mit Alarmierung, Ticketsystem, Incident-Management stellt den Betrieb schnell wieder her, Problem-Management beseitigt Ursachen.
- REST: Ressourcen per URL, HTTP-Methoden, zustandslos, JSON. CRUD = POST, GET, PUT/PATCH, DELETE.
- Request: Methode + URL (+ Query-Parameter), Header (Content-Type, Authorization), Body.
- Status: 2xx Erfolg, 3xx Umleitung, 4xx Client (401/403/404), 5xx Server.
- XSD prüft Struktur, nicht Logik. Architektur: Schichten, MVC, Microservices.
- Compiler (vorher komplett) vs. Interpreter (zur Laufzeit), Bibliotheken, Git, CI/CD, Code-Signatur.
- LPWAN/LoRa für IoT, LAN fürs Büro, SAN fürs RZ. Frame: Präambel, Ziel-MAC, Quell-MAC, Typ, Daten, FCS. MAC = 3 Byte OUI + 3 Byte Gerät.

## Selbstcheck
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { modul: "FIAE-7" })
```

**Weitere Aufgaben:** [[Aufgaben Planen eines Softwareproduktes#FIAE-7 Schnittstellen, Web und Architektur]] · **Karteikarten:** [[Karten Planen eines Softwareproduktes]]

## Einschätzung
```dataviewjs
await dv.view("AP2/99 System/views/selbstcheck")
```

---
← [[FIAE-6 Benutzeroberflächen, Barrierefreiheit und Usability]] · Weiter: [[FIAE-8 Sicherheit in der Softwareentwicklung]] →
