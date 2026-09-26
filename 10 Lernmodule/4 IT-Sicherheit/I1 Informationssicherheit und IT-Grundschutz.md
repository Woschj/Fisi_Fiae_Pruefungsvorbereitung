---
modul: I1
titel: Informationssicherheit und IT-Grundschutz
bereich: IT-Sicherheit
reihenfolge: 23
dauer: 120
status: neu
sicherheit: 0
zuletzt:
berufsschule: "ITG · LF4 (IT-Grundschutz nach BSI, Schutzziele)"
tags: [ap1/modul, ap1/sicherheit]
---
# I1 · Informationssicherheit und IT-Grundschutz

> [!abstract] Überblick
> **Bereich:** [[Übersicht IT-Sicherheit]]
> **Dauer:** ca. 2 h · **Prüfungsrelevanz:** ★★★ – Schutzziele zuordnen, Schutzbedarf feststellen, Maßnahmen begründen
> **Voraussetzungen:** keine · **Danach:** [[I2 Datenschutz]]
> **Berufsschule:** ITG LF4 (BSI IT-Grundschutz, Bausteine, MUSS/SOLLTE)

## Lernziele
- [ ] Ich kann die Schutzziele Vertraulichkeit, Integrität und Verfügbarkeit (plus Authentizität, Verbindlichkeit) erklären und Vorfällen/Maßnahmen zuordnen.
- [ ] Ich kann Informationssicherheit und Datenschutz abgrenzen.
- [ ] Ich kann eine Schutzbedarfsfeststellung nach BSI (normal/hoch/sehr hoch) durchführen und Maximumprinzip, Kumulations- und Verteilungseffekt anwenden.
- [ ] Ich kann Aufbau und Vorgehen des IT-Grundschutzes (Kompendium, Bausteine, Anforderungen) beschreiben.
- [ ] Ich kann Maßnahmen nach technisch, organisatorisch, personell und infrastrukturell ordnen.

## Worum geht es?
Ein Ransomware-Angriff legt eine Arztpraxis für eine Woche lahm, ein verlorener USB-Stick enthält Kundendaten, ein manipulierter Überweisungsauftrag kostet 40 000 €. Drei Vorfälle – drei verschiedene **Schutzziele**. Wer die Schutzziele versteht, kann Risiken einordnen und die passenden Maßnahmen begründen.

---

## 1. Schutzziele

| Schutzziel | Bedeutung | Verletzung (Beispiel) | Maßnahmen (Beispiele) |
|---|---|---|---|
| **Vertraulichkeit** (Confidentiality) | Informationen sind **nur Berechtigten** zugänglich | Konkurrenz erfährt Kalkulationen; Patientendaten landen im Netz; Notebook gestohlen | Verschlüsselung, Zugriffsrechte, Authentifizierung, Bildschirmsperre, Clean Desk |
| **Integrität** (Integrity) | Daten sind **korrekt und unverändert**; Veränderungen sind erkennbar | manipulierte Kontonummer auf einer Rechnung; Übertragungsfehler; Schadsoftware ändert Dateien | Hashwerte/Prüfsummen, digitale Signaturen, Rechtekonzept, Protokollierung, Versionierung |
| **Verfügbarkeit** (Availability) | Systeme und Daten sind **nutzbar, wenn sie gebraucht werden** | Serverausfall, Stromausfall, DDoS, Ransomware verschlüsselt alles | RAID, USV, Backup, Redundanz, Wartungsverträge, Notfallplan |

Die drei Grundwerte heißen im Englischen **CIA-Triade**. Ergänzende Ziele:
- **Authentizität:** Echtheit – Absender/Kommunikationspartner ist der, der er vorgibt zu sein (Zertifikate, Signaturen, MFA)
- **Verbindlichkeit / Nichtabstreitbarkeit:** eine Handlung kann nicht geleugnet werden (qualifizierte Signatur, Protokolle)
- **Zurechenbarkeit:** Aktionen lassen sich einer Person zuordnen (persönliche Konten statt Sammelkonten)

> [!example] Zuordnen üben
> - Blitzeinschlag legt den Server lahm → **Verfügbarkeit**
> - Mitarbeiter ändert heimlich seine Arbeitszeiten in der Zeiterfassung → **Integrität**
> - Unverschlüsselte Mail mit Gehaltsliste wird mitgelesen → **Vertraulichkeit**
> - Gefälschte Mail „vom Chef“ fordert eine Überweisung → **Authentizität**

> [!info] Informationssicherheit vs. Datenschutz vs. Datensicherheit
> - **Informationssicherheit:** schützt **alle Informationen** (auch Papier, Wissen) – Ziel CIA
> - **IT-Sicherheit / Datensicherheit:** technischer Teil davon – Schutz von Daten und Systemen
> - **Datenschutz:** schützt **Personen** und ihr Recht auf informationelle Selbstbestimmung bei **personenbezogenen Daten** → [[I2 Datenschutz]]
> Beispiel: Die geheime Rezeptur eines Unternehmens ist ein Fall für Informationssicherheit, nicht für den Datenschutz.

---

## 2. Bedrohungen, Schwachstellen, Risiko
- **Bedrohung:** mögliches schädigendes Ereignis (Feuer, Hacker, Bedienfehler, Hardwaredefekt)
- **Schwachstelle:** Lücke, durch die eine Bedrohung wirken kann (fehlendes Update, schwaches Passwort, offene Tür)
- **Risiko = Eintrittswahrscheinlichkeit × Schadenshöhe**
- Umgang mit Risiken: **vermeiden** (Tätigkeit lassen), **vermindern** (Maßnahmen), **übertragen** (Versicherung, Dienstleister), **akzeptieren** (bewusst tragen, dokumentiert)

Gefährdungsarten: **höhere Gewalt** (Blitz, Hochwasser), **organisatorische Mängel** (keine Regeln, fehlende Vertretung), **menschliche Fehlhandlungen** (Löschen, falsche Konfiguration), **technisches Versagen** (Plattendefekt), **vorsätzliche Handlungen** (Angriffe, Diebstahl, Sabotage).

---

## 3. Schutzbedarfsfeststellung (BSI-Standard 200-2)
Für jedes Zielobjekt (Geschäftsprozess, Anwendung, IT-System, Raum, Netzverbindung) wird **je Schutzziel** der Schutzbedarf eingeschätzt.

| Kategorie | Schadensauswirkung |
|---|---|
| **normal** | begrenzt und überschaubar |
| **hoch** | beträchtlich |
| **sehr hoch** | existenzbedrohend, katastrophal |

**Schadensszenarien** zur Begründung: Verstoß gegen Gesetze/Vorschriften/Verträge · Beeinträchtigung des informationellen Selbstbestimmungsrechts · Beeinträchtigung der persönlichen Unversehrtheit · Beeinträchtigung der Aufgabenerfüllung · negative Innen- oder Außenwirkung (Image) · finanzielle Auswirkungen.

### Vererbung auf IT-Systeme
- **Maximumprinzip:** Ein System übernimmt je Schutzziel den **höchsten** Schutzbedarf der darauf laufenden Anwendungen.
- **Kumulationseffekt:** Viele Anwendungen mit „normal“ auf einem System → gemeinsam kann der Schaden „hoch“ sein (z. B. Virtualisierungshost).
- **Verteilungseffekt:** Eine Anwendung mit hohem Verfügbarkeitsbedarf läuft **redundant** auf mehreren Systemen → das einzelne System kann niedriger eingestuft werden.

> [!example] Beispiel
> | Anwendung | V | I | A |
> |---|---|---|---|
> | Warenwirtschaft | hoch | hoch | hoch |
> | Intranet | normal | normal | normal |
> | Personalverwaltung | sehr hoch | hoch | normal |
> Server, auf dem alle drei laufen (Maximumprinzip): **V sehr hoch · I hoch · A hoch**

---

## 4. IT-Grundschutz des BSI
Das **Bundesamt für Sicherheit in der Informationstechnik (BSI)** bietet mit dem **IT-Grundschutz** eine Methode, um mit **Standardmaßnahmen** ein angemessenes Sicherheitsniveau zu erreichen – ohne für jedes System eine aufwendige Einzelrisikoanalyse.

**Bestandteile:**
- **BSI-Standards:** 200-1 (Managementsysteme für Informationssicherheit, **ISMS**), 200-2 (IT-Grundschutz-Methodik), 200-3 (Risikoanalyse), 200-4 (Business Continuity Management)
- **IT-Grundschutz-Kompendium:** Sammlung von **Bausteinen** (z. B. ISMS, Organisation, Personal, Betrieb, Detektion, Anwendungen, IT-Systeme, Industrielle IT, Netze, Infrastruktur), z. B. „SYS.2.1 Allgemeiner Client“, „INF.2 Rechenzentrum“, „NET.2.1 WLAN-Betrieb“

**Aufbau eines Bausteins:** Beschreibung (Einleitung, Zielsetzung, Abgrenzung) → **Gefährdungslage** → **Anforderungen** → weiterführende Informationen

| Anforderungsstufe | Bedeutung |
|---|---|
| **Basis-Anforderungen** | vorrangig und **zwingend** umzusetzen (Mindestschutz) |
| **Standard-Anforderungen** | Stand der Technik für normalen Schutzbedarf |
| **Anforderungen bei erhöhtem Schutzbedarf** | Vorschläge für hohen/sehr hohen Schutzbedarf |

**Modalverben** (wie in Normen, großgeschrieben):

| Ausdruck | Bedeutung |
|---|---|
| **MUSS / DARF NUR** | unbedingt zu erfüllen |
| **DARF NICHT / DARF KEIN** | darf in keinem Fall getan werden |
| **SOLLTE** | normalerweise umzusetzen; Abweichung nur mit **stichhaltiger, dokumentierter Begründung** |
| **SOLLTE NICHT** | normalerweise zu unterlassen, begründete Ausnahmen möglich |

**Vorgehensweisen:** **Basis-Absicherung** (schneller Einstieg, nur Basis-Anforderungen), **Standard-Absicherung** (vollständig, empfohlen), **Kern-Absicherung** (zuerst die „Kronjuwelen“ besonders schützen).
**Vorgehen der Standard-Absicherung:** Geltungsbereich festlegen → Strukturanalyse (Prozesse, Anwendungen, Systeme, Räume erfassen) → Schutzbedarfsfeststellung → Modellierung (passende Bausteine zuordnen) → **IT-Grundschutz-Check** (**Soll-Ist-Vergleich**) → ggf. Risikoanalyse → Umsetzung → Aufrechterhaltung. Zertifizierung möglich: **ISO 27001 auf Basis von IT-Grundschutz**.

**ISMS** (Informationssicherheits-Managementsystem): Regeln, Verantwortlichkeiten und Prozesse, um Informationssicherheit dauerhaft zu steuern und zu verbessern (PDCA-Zyklus) – mit **Informationssicherheitsbeauftragtem (ISB)**, **Sicherheitsleitlinie** und regelmäßigen Audits. Normen: **ISO/IEC 27001**.

---

## 5. Maßnahmenarten
| Art | Beispiele |
|---|---|
| **technisch** | Firewall, Virenschutz/EDR, Verschlüsselung, Backup, MFA, Patchmanagement, RAID, USV |
| **organisatorisch** | Sicherheitsleitlinie, Passwort- und Nutzungsrichtlinien, Rechtekonzept, Vier-Augen-Prinzip, Notfallplan, Vertretungsregeln |
| **personell** | Schulung und Sensibilisierung (Awareness), Verpflichtung auf Vertraulichkeit, geregelter Austritt (Konten sperren) |
| **infrastrukturell** | Zutrittskontrolle, Brandschutz, Klimatisierung, geschützter Serverraum, Einbruchschutz |

**Weitere Grundsätze:** **Defense in Depth** (mehrere Schutzschichten), **Least Privilege**, **Need-to-know**, **Security by Design/Default**, **Zero Trust** („Vertraue niemandem, prüfe jeden Zugriff“).

**Notfallmanagement:** Notfallhandbuch, Wiederanlaufpläne, Meldewege, Übungen; Kennzahlen **RTO** (max. Ausfallzeit) und **RPO** (max. Datenverlust) → [[I3 Datensicherung]]. Rechtlicher Rahmen für bestimmte Unternehmen: **NIS-2**, für Betreiber kritischer Infrastrukturen **KRITIS**-Vorgaben.

---

> [!warning] Typische Fehler in Prüfungen
> - Schutzziele falsch zuordnen – USV und RAID = **Verfügbarkeit**, nicht Integrität.
> - „Datenschutz“ sagen, wo Informationssicherheit gemeint ist (z. B. Betriebsgeheimnisse).
> - Beim Maximumprinzip den Durchschnitt statt des höchsten Werts nehmen.
> - SOLLTE als „optional“ verstehen – Abweichung braucht eine Begründung.
> - Nur technische Maßnahmen nennen – Schulung und Regeln sind genauso wichtig.

## Verwandte Themen
- [[I2 Datenschutz]] – Datenschutz als Teil der Sicherheit
- [[I3 Datensicherung]] – Verfügbarkeit durch Backups
- [[P3 IT-Service, Support und Qualität]] – Verfügbarkeit im SLA

## Zusammenfassung
- Vertraulichkeit (nur Berechtigte), Integrität (unverändert), Verfügbarkeit (nutzbar) + Authentizität, Verbindlichkeit.
- Risiko = Wahrscheinlichkeit × Schaden; vermeiden, vermindern, übertragen, akzeptieren.
- Schutzbedarf normal/hoch/sehr hoch; Maximumprinzip, Kumulation, Verteilung.
- IT-Grundschutz: BSI-Standards 200-1 bis 200-4, Kompendium mit Bausteinen, Basis-/Standard-/erhöhte Anforderungen, MUSS/SOLLTE, Soll-Ist-Vergleich.
- Maßnahmen technisch, organisatorisch, personell, infrastrukturell; ISMS nach ISO 27001.

## Selbstcheck
```dataviewjs
await dv.view("99 System/views/quiz", { modul: "I1" })
```

**Weitere Aufgaben:** [[Aufgaben IT-Sicherheit#I1 Informationssicherheit und IT-Grundschutz]] · **Karteikarten:** [[Karten IT-Sicherheit]]

## Einschätzung
```dataviewjs
await dv.view("99 System/views/selbstcheck")
```

---
← [[S9 KI und Unternehmenssoftware]] · Weiter: [[I2 Datenschutz]] →
