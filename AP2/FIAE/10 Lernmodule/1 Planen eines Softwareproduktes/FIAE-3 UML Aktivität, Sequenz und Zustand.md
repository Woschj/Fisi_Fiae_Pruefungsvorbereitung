---
modul: FIAE-3
titel: UML Aktivität, Sequenz und Zustand
bereich: Planen eines Softwareproduktes
pruefungsteil: "AP2 Teil 2 – Planen eines Softwareproduktes / Entwicklung und Umsetzung von Algorithmen"
reihenfolge: 3
dauer: 150
status: neu
sicherheit: 0
zuletzt:
tags: [ap2/modul, ap2/fiae]
---
# FIAE-3 · UML Aktivität, Sequenz und Zustand

> [!abstract] Überblick
> **Bereich:** [[Übersicht FIAE Planen eines Softwareproduktes]]
> **Prüfung:** beide FIAE-Teile – Diagramme bringen oft 20–29 Punkte am Stück
> **Dauer:** ca. 150 min · **Prüfungsrelevanz:** ★★★ – Aktivitätsdiagramm mit Parallelität, Sequenzdiagramm mit alt/opt, Zustandsdiagramm
> **Grundlagen aus AP1:** [[S8 UML und Softwareentwurf]] · [[S3 Algorithmen, Darstellung und Testen]]

## Lernziele
- [ ] Ich kann ein Aktivitätsdiagramm mit Start, Ende, Aktionen, Verzweigung, Zusammenführung, Parallelisierung und Synchronisation zeichnen.
- [ ] Ich kann ein Sequenzdiagramm mit Lebenslinien, synchronen/asynchronen Nachrichten, Antworten und Fragmenten (alt, opt, loop) ergänzen.
- [ ] Ich kann ein Zustandsdiagramm mit Zuständen, Übergängen, Ereignissen und Bedingungen erstellen.
- [ ] Ich kann einen Ist-Prozess analysieren und Digitalisierungspotenzial begründen.

## So wird das geprüft
> [!info] Typische AP2-Aufgabentypen
> - **Aktivitätsdiagramm** aus einem beschriebenen Ablauf: Punkte je Aktivität, für das Ende, **2 Punkte für die Synchronisation** und je Verzweigung;  Aktivitäten an die richtige Stelle setzen;  Bewässerungssteuerung.
> - **Sequenzdiagramm ergänzen:** Pfeile mit Beschriftung, Alternativfragment mit Bedingungen, Medikationsplan mit **opt** oder **alt**.
> - **Zustandsdiagramm:** Start- und Endpunkt, Zustände, Übergänge mit Bedingung.
> - **Prozess analysieren:** Probleme im Ist-Ablauf benennen und Digitalisierung begründen.

---

## 1. Aktivitätsdiagramm

Zeigt einen **Ablauf** (Algorithmus, Geschäftsprozess) – Nachfolger des Programmablaufplans.

| Element | Symbol | Bedeutung |
|---|---|---|
| **Startknoten** | ● gefüllter Kreis | Beginn |
| **Endknoten** | ◉ Kreis mit Punkt | Ende der **gesamten** Aktivität |
| Ablaufende | ⊗ | Ende **eines** Zweiges |
| **Aktion** | Rechteck mit runden Ecken | ein Schritt („Vitalwerte messen“) |
| **Verzweigung / Zusammenführung** | ◇ Raute | Entscheidung mit **Bedingungen in eckigen Klammern** `[Wert > 38]` / Zweige wieder zusammenführen |
| **Gabelung (Fork) / Vereinigung (Join)** | dicker Balken | Zweige laufen **parallel** / Warten, bis **alle** parallelen Zweige fertig sind (**Synchronisation**) |
| Objektfluss | Rechteck zwischen Aktionen | Daten/Dokument wird weitergegeben |
| Schwimmbahnen (Partitionen) | Spalten | wer führt die Aktion aus (Arzt, Pflege, System) |

```mermaid
flowchart TD
  S((Start)) --> A[Patientenakte öffnen]
  A --> F{{Fork}}
  F --> B[Vitalwerte messen]
  F --> C[Laborwerte prüfen]
  B --> J{{Join}}
  C --> J
  J --> D{Behandlungsplan anpassen?}
  D -->|"[ja]"| E[Plan ändern und Stationen informieren]
  D -->|"[nein]"| M(( ))
  E --> M
  M --> Z((Ende))
```

**Regeln:** Jede Verzweigung braucht **vollständige, sich ausschließende Bedingungen**; parallele Zweige werden **mit einem Join synchronisiert**, bevor es weitergeht; genau ein Startknoten.

### Ist-Prozess analysieren
Schwachstellen erkennen: **manuelle Übertragungen** (fehleranfällig, Zeitverlust), Medienbrüche (Papier → System), fehlende Priorisierung, Informationen erreichen Beteiligte zu spät, Entscheidungen nur aus Erfahrung. Digitalisierung begründen mit Zeitersparnis, weniger Fehlern, Automatisierung (Messgeräte liefern direkt), Vorschlägen aus Daten.

---

## 2. Sequenzdiagramm

Zeigt den **zeitlichen Nachrichtenaustausch** zwischen Objekten (von oben nach unten).

| Element | Darstellung |
|---|---|
| **Lebenslinie** | Objekt `name : Klasse` oben, gestrichelte Linie nach unten |
| **Aktivierungsbalken** | schmales Rechteck: Objekt ist aktiv |
| **synchrone Nachricht** | durchgezogener Pfeil mit **gefüllter** Spitze – Sender wartet auf Antwort |
| **asynchrone Nachricht** | durchgezogener Pfeil mit **offener** Spitze – Sender wartet nicht |
| **Antwort** | **gestrichelter** Pfeil zurück (Rückgabewert) |
| Objekterzeugung | Pfeil auf den Objektkopf, «create» |
| **alt** | Alternativen mit Bedingungen `[gefunden]` / `[else]` (wie if-else) |
| **opt** | optionaler Teil, nur wenn Bedingung gilt (wie if ohne else) |
| **loop** | Wiederholung `loop [für jeden Patienten]` |
| par | parallele Abschnitte |

```mermaid
sequenceDiagram
  actor Arzt
  participant UI as Oberfläche
  participant S as Medikationsservice
  participant DB as Datenbank
  Arzt->>UI: Medikationsplan anfordern(patientId)
  UI->>S: erstellePlan(patientId)
  S->>DB: holeVerordnungen(patientId)
  DB-->>S: verordnungen
  alt keine Verordnungen
    S->>DB: holeStandardmedikation()
    DB-->>S: standard
  else Verordnungen vorhanden
    S->>S: sortiereNachUhrzeit()
  end
  S-->>UI: plan
  UI-->>Arzt: Plan anzeigen
```

**Vom Code zum Diagramm:** jede Methodenaufruf-Zeile ist ein Pfeil vom aufrufenden zum aufgerufenen Objekt; `if` ohne `else` → **opt**, `if/else` → **alt**, Schleife → **loop**; Rückgabewerte als gestrichelte Antwort.

---

## 3. Zustandsdiagramm

Zeigt die **Zustände eines Objekts** und die **Übergänge** dazwischen – ideal für Status (Auftrag, Ampel, Auslastung, Ticket).

| Element | Darstellung |
|---|---|
| Startzustand | ● |
| Endzustand | ◉ |
| Zustand | Rechteck mit runden Ecken, optional `entry / do / exit`-Aktionen |
| **Transition** | Pfeil, beschriftet mit `Ereignis [Bedingung] / Aktion` |

```mermaid
stateDiagram-v2
  [*] --> Gering
  Gering --> Mittel : Fahrgäste [Auslastung > 40 %]
  Mittel --> Hoch : Fahrgäste [Auslastung > 80 %]
  Hoch --> Mittel : Ausstieg [Auslastung <= 80 %]
  Mittel --> Gering : Ausstieg [Auslastung <= 40 %]
  Gering --> [*] : Fahrtende
```

Ein Zustand wird nur über eine **Transition** verlassen; zu jedem Zustand gehört mindestens ein ein- und (außer Endzustand) ein ausgehender Übergang.

---

> [!warning] Typische Fehler in Prüfungen
> - Parallele Zweige ohne **Join** zusammenlaufen lassen (oder mit einer Raute statt eines Balkens).
> - Bedingungen ohne eckige Klammern oder nicht vollständig (`[> 38]` ohne `[<= 38]`).
> - Im Sequenzdiagramm Antworten als durchgezogene Pfeile zeichnen.
> - `opt` und `alt` verwechseln: **opt = nur ein Zweig**, **alt = mehrere Alternativen**.
> - Im Zustandsdiagramm Aktionen statt Zustände modellieren („Messen“ statt „Hohe Auslastung“).

## Verwandte Themen
- [[FIAE-2 Anforderungen und Use Cases]] – Anwendungsfälle
- [[FIAE-4 Objektorientierter Entwurf und Entwurfsmuster]] – Klassendiagramme
- [[FIAE-9 Algorithmen in Pseudocode]] – vom Diagramm zum Code
- [[S8 UML und Softwareentwurf]] – Grundlagen aus AP1

## Zusammenfassung
- Aktivität: Start ●, Aktionen, Raute mit `[Bedingungen]`, Fork/Join-Balken für Parallelität und Synchronisation, Ende ◉.
- Sequenz: Lebenslinien, synchron (gefüllte Spitze), asynchron (offen), Antwort gestrichelt; Fragmente alt, opt, loop.
- Zustand: Zustände, Transitionen `Ereignis [Bedingung] / Aktion`, Start und Ende.
- Ist-Prozess: Medienbrüche und manuelle Übertragungen sind Digitalisierungspotenzial.

## Selbstcheck
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { modul: "FIAE-3" })
```

**Weitere Aufgaben:** [[Aufgaben Planen eines Softwareproduktes#FIAE-3 UML Aktivität, Sequenz und Zustand]] · **Karteikarten:** [[Karten Planen eines Softwareproduktes]]

## Einschätzung
```dataviewjs
await dv.view("AP2/99 System/views/selbstcheck")
```

---
← [[FIAE-2 Anforderungen und Use Cases]] · Weiter: [[FIAE-4 Objektorientierter Entwurf und Entwurfsmuster]] →
