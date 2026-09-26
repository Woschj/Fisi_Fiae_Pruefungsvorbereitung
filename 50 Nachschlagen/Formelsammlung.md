---
tags: [ap1/nachschlagen]
---
# Formelsammlung

## Daten und Übertragung → [[H3 Datenmengen und Übertragung]]
| Größe | Formel |
|---|---|
| Byte ↔ Bit | 1 B = 8 bit |
| Übertragungsdauer | **t = Datenmenge [Bit] / Datenrate [Bit/s]** (Datenrate immer dezimal, ggf. × Effizienz) |
| benötigte Datenrate | Datenmenge [Bit] / Zeit [s] |
| Bildgröße | Breite × Höhe × Farbtiefe [Bit] / 8 |
| Anzahl Farben | 2^Farbtiefe |
| Audio (PCM) | Abtastrate × Bittiefe × Kanäle × Dauer [s] / 8 |
| Video unkomprimiert | Breite × Höhe × Byte/Pixel × fps × Dauer [s] |
| Video komprimiert | Bitrate × Dauer / 8 |
| Pixeldichte | ppi = √(Breite² + Höhe²) / Diagonale [Zoll] |

| Präfix | dezimal | binär |
|---|---|---|
| Kilo / Kibi | 10³ | 2¹⁰ = 1 024 |
| Mega / Mebi | 10⁶ | 2²⁰ = 1 048 576 |
| Giga / Gibi | 10⁹ | 2³⁰ = 1 073 741 824 |
| Tera / Tebi | 10¹² | 2⁴⁰ = 1 099 511 627 776 |
GB → GiB ≈ × 0,9313 · TB → TiB ≈ × 0,9095

## Netzwerk → [[N2 IPv4 und Subnetting]] · [[N3 IPv6]] · [[N5 Verkabelung und Netzwerkkomponenten]]
| Größe | Formel |
|---|---|
| Adressen im Netz | 2^(32 − Präfix) |
| nutzbare Hosts | **2^(32 − Präfix) − 2** |
| Subnetzbits für n Netze | kleinstes s mit **2^s ≥ n** |
| Hostbits für h Hosts | kleinstes x mit **2^x − 2 ≥ h** |
| Blockgröße | 256 − Maskenwert (im interessanten Oktett) |
| Netzadresse | IP AND Maske |
| IPv6: /64-Netze in einem /n | 2^(64 − n) |
| Dämpfung Spannung | a = 20 · log(U_ein / U_aus) |
| Dämpfung Leistung | a = 10 · log(P_ein / P_aus) |
| Pegel | dBm = 10 · log(P / 1 mW) · P = 1 mW · 10^(dBm/10) |
| Ausgangsspannung | U_aus = U_ein / 10^(a/20) |
| ACR | NEXT − Dämpfung |
| EIRP | Sendeleistung [dBm] + Antennengewinn [dBi] − Kabelverlust [dB] |
| Switching Capacity | Ports × Portrate × 2 |

Maskenwerte: 128 · 192 · 224 · 240 · 248 · 252 · 254 · 255

## Hardware und Strom → [[H4 Server, NAS und RAID]] · [[H5 Elektrotechnik, USV und Energie]]
| RAID | Nutzkapazität | min. Platten | verkraftet |
|---|---|---|---|
| 0 | n × C | 2 | 0 |
| 1 | C | 2 | n − 1 |
| 5 | (n − 1) × C | 3 | 1 |
| 6 | (n − 2) × C | 4 | 2 |
| 10 | n/2 × C | 4 | 1 (garantiert) |

| Größe | Formel |
|---|---|
| Ohmsches Gesetz | U = R · I |
| Leistung | P = U · I |
| Arbeit/Energie | W = P · t → kWh = W × h / 1 000 |
| Energiekosten | kWh × €/kWh |
| Wirkungsgrad | η = P_ab / P_zu → P_zu = P_ab / η |
| Wirk-/Scheinleistung | P [W] = S [VA] × cos φ → S = P / cos φ |
| USV-Dimensionierung | (Σ P × (1 + Reserve)) / cos φ |
| USV-Überbrückungszeit | t = Q [Ah] × U [V] × η / P [W] |
| Stunden pro Jahr | 8 760 |

## Software → [[S1 Zahlensysteme und Codierung]]
| Größe | Formel |
|---|---|
| Stellenwert | Ziffer × Basis^Position |
| Zweierkomplement | Betrag → invertieren → +1 · Wert = vorzeichenlos − 2^n |
| Wertebereich n Bit | unsigned 0 … 2ⁿ − 1 · signed −2ⁿ⁻¹ … 2ⁿ⁻¹ − 1 |
| Linux-Rechte | r = 4, w = 2, x = 1 |

## IT-Sicherheit → [[I3 Datensicherung]] · [[I4 Kryptografie]] · [[I5 Bedrohungen und Schutzmaßnahmen]]
| Größe | Formel |
|---|---|
| Speicher inkrementell | Voll + n × Δ |
| Speicher differenziell | Voll + Δ × (1 + 2 + … + n) = Voll + Δ × n(n+1)/2 |
| Restore inkrementell / differenziell | Voll + alle Inkremente / Voll + letzte Differenzielle |
| symmetrische Schlüssel | n · (n − 1) / 2 |
| asymmetrische Schlüssel | 2 · n |
| Passwort-Kombinationen | Zeichenvorrat^Länge |
| Brute-Force-Dauer | Kombinationen / Versuche pro Sekunde |
| Risiko | Eintrittswahrscheinlichkeit × Schadenshöhe |

## Wirtschaft → [[W1 Beschaffung und Kalkulation]] · [[W2 Nutzwertanalyse und Entscheidungen]] · [[W3 Investition und Finanzierung]]
| Größe | Formel |
|---|---|
| Bezugskalkulation | LEP − Rabatt = ZEP − Skonto = BEP + Bezugskosten = **Bezugspreis** |
| Brutto / Netto | Netto × 1,19 / Brutto ÷ 1,19 · USt aus Brutto = Brutto × 19/119 |
| Zahllast | Umsatzsteuer − Vorsteuer |
| Vorwärtskalkulation | Bezugspreis + HKZ = Selbstkosten + Gewinn = BVP → ZVP = BVP / (1 − Skonto) → LVP = ZVP / (1 − Rabatt) → × 1,19 |
| HKZ-Satz | Handlungskosten / Wareneinsatz × 100 |
| Rückwärtskalkulation | Bezugspreis = LVP netto / (1 + Gewinn) / (1 + HKZ) (ohne Kundenrabatt/-skonto) |
| Nutzwert | Σ (Gewicht × Punkte) |
| Break-even | Kostenfunktionen gleichsetzen: Fix₁ + m × lfd₁ = Fix₂ + m × lfd₂ |
| lineare AfA | Anschaffungskosten / Nutzungsdauer |
| Restbuchwert | AK − Jahre × AfA |
| Amortisationszeit | Investition / jährliche Einsparung |
| Zinsen (Jahr) | Restschuld × Zinssatz |
| Skonto als Jahreszins | Skontosatz × 360 / (Zahlungsziel − Skontofrist) |

## Projekt und Service → [[P2 Netzplan und Zeitplanung]] · [[P3 IT-Service, Support und Qualität]]
| Größe | Formel |
|---|---|
| FEZ | FAZ + D |
| FAZ | max(FEZ der Vorgänger) |
| SAZ | SEZ − D |
| SEZ | min(SAZ der Nachfolger) |
| Gesamtpuffer | SAZ − FAZ |
| Freier Puffer | min(FAZ der Nachfolger) − FEZ |
| Verfügbarkeit | (Soll-Zeit − Ausfall) / Soll-Zeit × 100 % |
| max. Ausfall | Soll-Zeit × (1 − Verfügbarkeit) |
| Priorität | Auswirkung × Dringlichkeit |

← [[Start]]
