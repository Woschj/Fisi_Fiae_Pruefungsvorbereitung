---
modul: W3
titel: Investition und Finanzierung
bereich: Wirtschaft
reihenfolge: 30
dauer: 120
status: neu
sicherheit: 0
zuletzt:
berufsschule: "GiD · LF2 LS2.2 (Server kaufen oder leasen, Darlehensarten)"
tags: [ap1/modul, ap1/wirtschaft]
---
# W3 · Investition und Finanzierung

> [!abstract] Überblick
> **Bereich:** [[Übersicht Wirtschaft]]
> **Dauer:** ca. 2 h · **Prüfungsrelevanz:** ★★☆ – Kauf/Leasing/Miete vergleichen, Amortisation, Abschreibung
> **Voraussetzungen:** [[W1 Beschaffung und Kalkulation]]
> **Berufsschule:** GiD LF2 LS2.2 (Server kaufen oder leasen, Finanzierungsarten, Darlehen)

## Lernziele
- [ ] Ich kann Finanzierungsarten (Eigen-/Fremd-, Innen-/Außenfinanzierung) unterscheiden.
- [ ] Ich kann Kauf, Leasing und Miete nach Kosten und qualitativen Kriterien vergleichen und einen Break-even berechnen.
- [ ] Ich kann Abzahlungs-, Annuitäten- und Fälligkeitsdarlehen erklären und Zins/Tilgung berechnen.
- [ ] Ich kann lineare Abschreibung, GWG-Regeln und die Amortisationszeit anwenden.

## Worum geht es?
Der alte Server ist am Ende, ein neuer kostet 20 000 €. Die Firma hat aber gerade wenig Geld auf dem Konto. Kaufen und dafür einen Kredit aufnehmen? Leasen? Oder die Leistung als Cloud-Dienst mieten? Die richtige Antwort hängt von Kosten, Liquidität, Nutzungsdauer und Flexibilität ab.

---

## 1. Finanzierungsarten
| nach Herkunft | nach Rechtsstellung des Kapitalgebers |
|---|---|
| **Außenfinanzierung:** Kapital kommt von außen (Einlagen der Eigentümer, Kredite, Leasing) | **Eigenfinanzierung:** Kapitalgeber ist (Mit-)Eigentümer → Eigenkapital |
| **Innenfinanzierung:** aus dem Unternehmen selbst (einbehaltene Gewinne, Abschreibungsrückflüsse, Rückstellungen) | **Fremdfinanzierung:** Kapitalgeber ist Gläubiger (Bank, Lieferant) → Fremdkapital, Zinsen, Tilgung |

Sonderformen: **Leasing**, **Lieferantenkredit** (Zahlungsziel – teuer, siehe Skonto), **Kontokorrentkredit** (Dispo für kurzfristige Engpässe, teuer), **Fördermittel**.

## 2. Kauf, Leasing, Miete

| | **Kauf** | **Leasing** | **Miete** |
|---|---|---|---|
| Eigentum | Käufer | Leasinggeber | Vermieter |
| Kapitalbedarf zu Beginn | **hoch** (Kapitalbindung) | gering (ggf. Sonderzahlung) | gering |
| Laufzeit | – | fest, meist 24–60 Monate, **nicht kündbar** | kurz, meist kündbar |
| Gesamtkosten | meist **am günstigsten** | höher als Kauf (Zinsen, Gewinn des Leasinggebers) | am höchsten bei langer Nutzung |
| Wartung/Risiko | beim Käufer | meist beim Leasingnehmer | meist beim Vermieter |
| Technik | veraltet mit der Zeit | Austausch nach Laufzeit möglich | sehr flexibel |
| Bilanz/Steuer | Abschreibung | Raten als Betriebsausgabe, bilanzneutral (meist) | Aufwand |
| sinnvoll bei | langer Nutzung, ausreichend Kapital | regelmäßiger Erneuerung, Liquidität schonen, planbare Kosten | kurzfristigem Bedarf (Messe, Projekt, Überbrückung) |

> [!example] Beispiel: Server
> Kaufpreis 16 800 €, geplante Nutzung 4 Jahre. Leasing: 36 Monate, Sonderzahlung 3 000 €, Rate 1,6 % des Kaufpreises pro Monat (= 268,80 €), danach Übernahme zum Restwert möglich.
> - Leasingkosten 36 Monate: 3 000 + 36 × 268,80 = **12 676,80 €**
> - Für die restlichen 12 Monate: Restwert kaufen oder weiter leasen/erneuern
> - Kauf mit 5 % Barzahlungsrabatt: 16 800 × 0,95 = **15 960,00 €** (sofort fällig)
> Kostenbasiert über 4 Jahre ist der Kauf meist günstiger; **bei knapper Liquidität** spricht die geringe Anfangsbelastung für Leasing. Qualitativ: Aktualität der Technik, Flexibilität, Service-Umfang, Bindung.

### Break-even (Kostenvergleich über die Zeit)
Ab welcher Nutzungsdauer ist Kauf günstiger als Leasing/Miete? → Kostenfunktionen **gleichsetzen**:
Kauf: K(m) = Anschaffung + m × laufende Kosten · Leasing: L(m) = Sonderzahlung + m × Rate

> [!example] Beispiel
> Kopierer: Kauf 2 400 € + Wartungsvertrag 20 €/Monat · Miete 95 €/Monat inkl. Wartung
> 2 400 + 20m = 95m → 2 400 = 75m → **m = 32 Monate**. Bei längerer Nutzung ist der Kauf günstiger.

---

<!-- abb:break-even -->
![[break-even.svg]]
*Abb.: Break-even-Punkt zwischen Kauf und Miete*

## 3. Darlehen
| Darlehensart | Tilgung | Rate | Verlauf |
|---|---|---|---|
| **Fälligkeitsdarlehen** | komplett **am Ende** | während der Laufzeit nur Zinsen (konstant) | am Ende hohe Einmalzahlung |
| **Abzahlungs-(Raten-)darlehen** | **konstant** | Zinsen sinken mit der Restschuld → **Rate sinkt** | anfangs hohe Belastung |
| **Annuitätendarlehen** | steigt | **Rate (Annuität) konstant**, Zinsanteil sinkt, Tilgungsanteil steigt | gut planbar (Baufinanzierung, Autokredit) |

> [!example] Abzahlungsdarlehen 30 000 €, 3 Jahre, 5 % Zinsen
> | Jahr | Restschuld Anfang | Zinsen | Tilgung | Rate |
> |---|---|---|---|---|
> | 1 | 30 000 € | 1 500 € | 10 000 € | 11 500 € |
> | 2 | 20 000 € | 1 000 € | 10 000 € | 11 000 € |
> | 3 | 10 000 € | 500 € | 10 000 € | 10 500 € |
> | Σ | | **3 000 €** | 30 000 € | 33 000 € |
> Als **Fälligkeitsdarlehen**: jedes Jahr 1 500 € Zinsen, im 3. Jahr + 30 000 € → Zinsen gesamt **4 500 €**.

Kreditsicherheiten (Überblick): Bürgschaft, Sicherungsübereignung (z. B. der finanzierte Server), Grundschuld, Eigentumsvorbehalt beim Lieferantenkredit.

---

## 4. Abschreibung (AfA)
Anlagegüter verlieren durch Nutzung, Verschleiß und technischen Fortschritt an Wert. Die **Absetzung für Abnutzung (AfA)** verteilt die Anschaffungskosten als Aufwand auf die **Nutzungsdauer** (laut AfA-Tabellen).

- **Lineare AfA:** gleicher Betrag jedes Jahr: **AfA = Anschaffungskosten / Nutzungsdauer**
- **Restbuchwert** nach k Jahren = Anschaffungskosten − k × AfA
- Anschaffungskosten = Kaufpreis netto − Preisnachlässe + Anschaffungsnebenkosten (Lieferung, Installation)

> [!example] Beispiel
> Server 12 000 € netto + 600 € Installation = 12 600 €, Nutzungsdauer 5 Jahre → AfA **2 520 €/Jahr**, Restbuchwert nach 2 Jahren **7 560 €**.

**Geringwertige Wirtschaftsgüter (GWG):** selbstständig nutzbare Güter bis **800 € netto** dürfen im Jahr der Anschaffung **sofort vollständig** abgeschrieben werden (Wahlrecht: Sammelposten für 250,01–1 000 € über 5 Jahre). **Computerhardware und Software** dürfen seit 2021 steuerlich mit einer Nutzungsdauer von **1 Jahr** abgeschrieben werden. *(Steuerliche Details ändern sich – aktuellen Stand im Unterricht prüfen.)*

---

## 5. Amortisation und Wirtschaftlichkeit
**Amortisationszeit** = Investition / jährlicher Rückfluss (Einsparung bzw. Gewinn + Abschreibung) → Wie viele Jahre, bis sich die Investition bezahlt gemacht hat? Je kürzer, desto geringer das Risiko.

> [!example] Beispiel
> Neue Serverhardware kostet 9 000 € und spart jährlich 1 800 € Strom und 1 200 € Wartung → 9 000 / 3 000 = **3 Jahre**. Liegt das unter der Nutzungsdauer (5 Jahre), lohnt sich die Investition.

Weitere Kennzahlen (Überblick): **Kostenvergleichsrechnung** (welche Alternative verursacht geringere Kosten pro Jahr?), **Rentabilität** (Gewinn / eingesetztes Kapital × 100), **TCO** (Gesamtkosten über den Lebenszyklus).

---

> [!warning] Typische Fehler in Prüfungen
> - Beim Leasing die Sonderzahlung vergessen.
> - Break-even aufstellen, aber laufende Kosten beim Kauf weglassen.
> - Zinsen beim Abzahlungsdarlehen immer auf den Anfangsbetrag rechnen (richtig: auf die **Restschuld**).
> - Nur Kosten vergleichen und qualitative Aspekte (Liquidität, Flexibilität, Technik) weglassen.

## Verwandte Themen
- [[W1 Beschaffung und Kalkulation]] – Anschaffungskosten ermitteln
- [[H5 Elektrotechnik, USV und Energie]] – Energiekosten und Amortisation
- [[H6 Drucker, Peripherie und Mobilgeräte]] – Druckkosten und Break-even

## Zusammenfassung
- Eigen-/Fremdfinanzierung (Kapitalgeber), Innen-/Außenfinanzierung (Herkunft).
- Kauf günstig auf Dauer, aber Kapitalbindung · Leasing schont Liquidität, planbar, Austausch · Miete flexibel, kurzfristig.
- Break-even: Kostenfunktionen gleichsetzen.
- Fälligkeit: Tilgung am Ende · Abzahlung: konstante Tilgung, sinkende Rate · Annuität: konstante Rate.
- Lineare AfA = AK / ND; GWG bis 800 € sofort; Hardware/Software 1 Jahr möglich.
- Amortisationszeit = Investition / jährliche Einsparung.

## Direkt üben
```dataviewjs
await dv.view("AP1/99 System/views/trainer", { typen: ["kauf-leasing", "afa-amortisation", "darlehen"] })
```

## Selbstcheck
```dataviewjs
await dv.view("AP1/99 System/views/quiz", { modul: "W3" })
```

**Weitere Aufgaben:** [[Aufgaben Wirtschaft#W3 Investition und Finanzierung]] · **Karteikarten:** [[Karten Wirtschaft]]

## Einschätzung
```dataviewjs
await dv.view("AP1/99 System/views/selbstcheck")
```

---
← [[W2 Nutzwertanalyse und Entscheidungen]] · Weiter: [[W4 Verträge und Kaufvertragsstörungen]] →
