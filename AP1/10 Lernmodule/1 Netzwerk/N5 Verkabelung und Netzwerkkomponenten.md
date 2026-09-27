---
modul: N5
titel: Verkabelung und Netzwerkkomponenten
bereich: Netzwerk
reihenfolge: 5
dauer: 120
status: neu
sicherheit: 0
zuletzt:
berufsschule: "Evp-CPS · LF3 LS3.3 (strukturierte Verkabelung, CAT, LWL, Dämpfung) · LS3.2 (Switchtechnik)"
tags: [ap1/modul, ap1/netzwerk]
---
# N5 · Verkabelung und Netzwerkkomponenten

> [!abstract] Überblick
> **Bereich:** [[Übersicht Netzwerk]]
> **Dauer:** ca. 2 h · **Prüfungsrelevanz:** ★★☆ – Kabel auswählen, Geräte zuordnen, PoE-Budget, VLAN begründen
> **Voraussetzungen:** [[N1 Netzwerkgrundlagen und OSI-Modell]]
> **Berufsschule:** Evp-CPS LF3 LS3.3 (EN 50173, CAT-Klassen, LWL, dB-Rechnung) und LS3.2 (Switchtechnik)

## Lernziele
- [ ] Ich kann die strukturierte Verkabelung (Primär, Sekundär, Tertiär) erklären.
- [ ] Ich kann Twisted-Pair-Kategorien, Schirmungsarten und Glasfasertypen begründet auswählen.
- [ ] Ich kann Dämpfung und Pegel in dB berechnen und NEXT, FEXT und ACR erklären.
- [ ] Ich kann Hub, Switch, Router, Access Point und Firewall nach Funktion und OSI-Schicht unterscheiden.
- [ ] Ich kann Switch-Kennzahlen, VLANs und PoE fachgerecht einsetzen.

## Worum geht es?
Ein neues Bürogebäude wird verkabelt. Welches Kabel kommt in die Wand, damit es auch in zehn Jahren noch reicht? Wie viele Switches, welche Ports, wie viel PoE für Telefone und Access Points? Und wie trennt man das Gäste-WLAN vom Firmennetz, ohne alles doppelt zu verkabeln? Solche Planungsaufgaben sind typisch für die AP1.

---

## 1. Strukturierte Verkabelung (EN 50173 / ISO/IEC 11801)

Statt jedes Gerät „irgendwie“ anzuschließen, wird ein Gebäude **anwendungsneutral** und **hierarchisch** verkabelt. Dann lässt sich jede Dose für jeden Dienst (PC, Telefon, Access Point) nutzen.

| Bereich | verbindet | typisches Medium |
|---|---|---|
| **Primär** (Campus) | Gebäude miteinander (Standortverteiler → Gebäudeverteiler) | Glasfaser (Singlemode) |
| **Sekundär** (Steigbereich) | Stockwerke im Gebäude (Gebäudeverteiler → Etagenverteiler) | Glasfaser (Multimode) oder Kupfer |
| **Tertiär** (Etage) | Etagenverteiler → Anschlussdose am Arbeitsplatz | Kupfer, Twisted Pair (Cat 6A/7) |

**Längen im Tertiärbereich:** Kupfer-Ethernet max. **100 m** Kanal = max. **90 m** festes Verlegekabel (Permanent Link) + max. **10 m** Patchkabel insgesamt.

**Vorteile:** herstellerunabhängig, flexibel (Umzüge nur umpatchen), übersichtlich (Fehlersuche), zukunftssicher, dokumentierbar (Patchfeld- und Dosenbeschriftung).

---

<!-- abb:strukturierte-verkabelung -->
![[strukturierte-verkabelung.svg]]
*Abb.: Strukturierte Verkabelung mit Primär-, Sekundär- und Tertiärbereich*

## 2. Kupferkabel (Twisted Pair)

Vier verdrillte Adernpaare, Stecker **RJ45** (8P8C). Die **Verdrillung** reduziert Störeinflüsse und Übersprechen.

### Kategorien und Klassen
Die **Kategorie (Cat)** beschreibt Kabel und Komponenten, die **Klasse** die gesamte Übertragungsstrecke. Maßgeblich ist die **Grenzfrequenz**.

| Kategorie | Klasse | Frequenz | typische Nutzung |
|---|---|---|---|
| Cat 5e | D | 100 MHz | 1 Gbit/s |
| Cat 6 | E | 250 MHz | 1 Gbit/s, 10 Gbit/s nur bis ca. 55 m |
| **Cat 6A** | **EA** | 500 MHz | **10 Gbit/s bis 100 m** – heutiger Standard für Neuverkabelung |
| Cat 7 | F | 600 MHz | 10 Gbit/s, geschirmt (Verlegekabel) |
| Cat 7A | FA | 1 000 MHz | 10 Gbit/s+, Verlegekabel |
| Cat 8 | I/II | 2 000 MHz | 25/40 Gbit/s bis 30 m (Rechenzentrum) |

> [!tip] Merke
> Die **schwächste Komponente** bestimmt die Klasse der Strecke: Cat-7-Kabel mit Cat-5e-Dosen ergibt nur Klasse D.

### Schirmung
Bezeichnung **XX/YTP**: vor dem Schrägstrich die Gesamtschirmung, danach die Paarschirmung. U = ungeschirmt, F = Folie, S = Geflecht.
- **U/UTP**: ungeschirmt, günstig, flexibel
- **F/UTP**: Folienschirm um alle Paare
- **S/FTP**: Geflecht außen **und** Folie je Paar – sehr störfest (Cat 7)

Geschirmte Kabel lohnen sich in Umgebungen mit starken Störfeldern (Maschinen, parallel verlaufende Stromleitungen). Der Schirm muss dann korrekt geerdet sein.

### Belegung
Zwei Normen: **T568A** und **T568B** (Adernfarben an den Pins). **Patchkabel**: beide Enden gleich (1:1). **Crossover**: ein Ende A, ein Ende B – heute kaum noch nötig, weil moderne Ports per **Auto-MDI-X** selbst erkennen, welche Adern senden und welche empfangen.

---

<!-- abb:rj45-belegung -->
![[rj45-belegung.svg]]
*Abb.: RJ45-Belegung nach T568A und T568B*

## 3. Dämpfung, Pegel und Übersprechen (dB-Rechnung)

Signale werden auf dem Kabel schwächer. Verhältnisse gibt man logarithmisch in **Dezibel (dB)** an.

| Größe | Formel | Merkhilfe |
|---|---|---|
| Dämpfung (Spannung) | **a = 20 · log(U_ein / U_aus)** | Spannung → **20** |
| Dämpfung (Leistung) | **a = 10 · log(P_ein / P_aus)** | Leistung → **10** |
| absoluter Pegel | **dBm = 10 · log(P / 1 mW)** | 0 dBm = 1 mW, 20 dBm = 100 mW, 30 dBm = 1 W |
| Rückrechnung | U_aus = U_ein / 10^(a/20) · P = 1 mW · 10^(dBm/10) | |
| Kette | a_ges = a₁ + a₂ + a₃ + … | dB-Werte **addieren** sich |

Faustwerte (Leistung): **3 dB ≈ halbe Leistung**, **10 dB = ein Zehntel**, **20 dB = ein Hundertstel**.

> [!example] Beispiel durchgerechnet
> Eingang 30 V, Ausgang 26 V → a = 20 · log(30/26) = 20 · log(1,1538) = 20 · 0,0621 = **1,24 dB**
> Leistung 40 W → 20 W → a = 10 · log(2) = **3,01 dB**
> Drei Teilstrecken 2,1 dB + 3,4 dB + 1,5 dB = **7,0 dB**; bei 5 V Eingang: U_aus = 5 / 10^(7/20) = 5 / 2,239 = **2,23 V**

### Übersprechen (Crosstalk)
Ein Adernpaar „strahlt“ auf ein Nachbarpaar über.

| Begriff | Bedeutung |
|---|---|
| **NEXT** (Near End Crosstalk) | Übersprechen, gemessen am **nahen** Ende (Senderseite) – Angabe als Dämpfung in dB: **je größer, desto besser** |
| **FEXT** (Far End Crosstalk) | Übersprechen am **fernen** Ende |
| **ACR** (Attenuation to Crosstalk Ratio) | **ACR = NEXT − Dämpfung** – der Abstand zwischen Nutzsignal und Störung; **je größer, desto besser** |

---

## 4. Glasfaser (Lichtwellenleiter, LWL)

Überträgt Lichtimpulse statt Strom.
- **Vorteile:** sehr hohe Bandbreite und Reichweite, **unempfindlich gegen elektromagnetische Störungen**, keine Potenzialprobleme zwischen Gebäuden, abhörsicherer
- **Nachteile:** teurer in Verlegung und Konfektionierung (Spleißen), empfindlich gegen Knicken (Biegeradius), aktive Komponenten (Transceiver) nötig

| | **Multimode** (OM3, OM4, OM5) | **Singlemode** (OS2) |
|---|---|---|
| Kern | 50 µm, mehrere Lichtwege (Moden) | 9 µm, nur ein Lichtweg |
| Reichweite | bis einige hundert Meter | viele Kilometer |
| Einsatz | Gebäude, Sekundärbereich, Rechenzentrum | Campus, Provider |
| Problem | **Modendispersion** (Impulse „verschmieren“) | kaum Dispersion |

Stecker: **LC** (klein, Standard), SC. Anbindung an Switches per **SFP/SFP+-Modul** (1 bzw. 10 Gbit/s), schneller SFP28 (25G), QSFP+ (40G), QSFP28 (100G).

---

## 5. Netzwerkkomponenten

| Gerät | OSI | arbeitet mit | Funktion |
|---|---|---|---|
| **Repeater / Hub** | 1 | Signalen | verstärkt bzw. verteilt an **alle** Ports – ein Hub ist eine Kollisionsdomäne, veraltet |
| **Medienkonverter** | 1 | Signalen | z. B. Kupfer ↔ Glasfaser |
| **Switch** | 2 | **MAC-Adressen** | lernt, an welchem Port welche MAC hängt (**MAC-Tabelle / CAM**), und leitet Frames **gezielt** weiter; jeder Port eigene Kollisionsdomäne, Vollduplex |
| **Access Point** | 2 | MAC | verbindet WLAN-Clients mit dem kabelgebundenen LAN |
| **Layer-3-Switch** | 3 | IP | Switch, der zusätzlich zwischen VLANs routet |
| **Router** | 3 | **IP-Adressen** | verbindet **verschiedene Netze**, entscheidet per **Routingtabelle**, trennt Broadcast-Domänen, oft mit NAT |
| **Firewall** | 3–7 | IP, Ports, Inhalte | filtert Verkehr nach Regeln (Paketfilter, stateful, Next-Generation mit Anwendungserkennung) |

**Broadcast-Domäne:** alle Geräte, die einen Broadcast empfangen. Switches leiten Broadcasts weiter, **Router nicht** → Router (bzw. VLANs) begrenzen Broadcast-Domänen.

### Managed vs. unmanaged Switch
| unmanaged | managed |
|---|---|
| Plug & Play, keine Konfiguration | konfigurierbar per Web/CLI |
| günstig, für kleine Büros | **VLANs**, PoE-Steuerung, Port-Security, Link Aggregation, Monitoring (SNMP), Spanning Tree, QoS |

### Switch-Kennzahlen (Datenblatt)
- **Switching Capacity** (bit/s): Gesamtdurchsatz der Backplane. Für einen nicht blockierenden Switch: **Ports × Portgeschwindigkeit × 2** (Vollduplex). 24 × 1 Gbit/s × 2 = **48 Gbit/s**.
- **Forwarding Rate** (Pakete/s): wie viele Frames pro Sekunde weitergeleitet werden. Ein 1-Gbit/s-Port schafft bei kleinsten Frames (64 Byte + 20 Byte Präambel/Pause = 84 Byte = 672 Bit) ca. 10⁹ / 672 ≈ **1,488 Mio. pps**.
- **Puffer (Buffer)**: Zwischenspeicher bei unterschiedlichen Geschwindigkeiten/Spitzenlast.

### VLAN (IEEE 802.1Q)
Ein **VLAN** teilt einen physischen Switch in mehrere **logische Netze** – als stünden dort mehrere Switches.
- **Access-Port**: gehört genau zu einem VLAN, Frames **ohne** Tag (Endgeräte)
- **Trunk-Port**: transportiert mehrere VLANs, Frames **mit** 802.1Q-Tag (VLAN-ID 1–4094) – zwischen Switches, zum Router, zu Access Points mit mehreren SSIDs
- **Kommunikation zwischen VLANs** nur über Router/Layer-3-Switch (dort kann eine Firewall filtern)
- **Vorteile:** Sicherheit (Gäste, Verwaltung, Server, VoIP getrennt), kleinere Broadcast-Domänen, flexible Zuordnung ohne Umverkabelung, QoS für Telefonie

<!-- abb:netz-buero -->
![[netz-buero.svg]]
*Abb.: Typisches Büronetz: Firewall, Core-Switch, VLANs für Verwaltung, Server, Gäste und VoIP*

### PoE (Power over Ethernet)
Strom über das Netzwerkkabel – für Access Points, IP-Telefone, Kameras.

| Norm | Name | Leistung am Switchport (PSE) | am Gerät (PD) |
|---|---|---|---|
| IEEE 802.3af | PoE | 15,4 W | 12,95 W |
| IEEE 802.3at | PoE+ | 30 W | 25,5 W |
| IEEE 802.3bt Typ 3 | PoE++ | 60 W | 51 W |
| IEEE 802.3bt Typ 4 | PoE++ | 90 W | 71,3 W |

> [!example] PoE-Budget prüfen
> Switch mit **370 W** PoE-Budget. Angeschlossen: 12 IP-Telefone (PoE-Klasse 2, max. 7 W am Port), 6 Access Points (PoE+, 30 W am Port), 4 Kameras (PoE, 15,4 W am Port).
> Bedarf am Switch (Portleistung je Klasse – so rechnet der Switch sein Budget): 12 × 7 W = 84 W + 6 × 30 W = 180 W + 4 × 15,4 W = 61,6 W → **325,6 W < 370 W** ✓ – es bleiben 44,4 W Reserve.

---

> [!warning] Typische Fehler in Prüfungen
> - 100 m **Verlegekabel** annehmen – richtig: 90 m fest + 10 m Patch = 100 m Kanal.
> - Faktor **20** und **10** bei dB verwechseln (Spannung → 20, Leistung → 10).
> - Switch und Router vertauschen oder dem Switch Routing zuschreiben.
> - VLAN mit Subnetz gleichsetzen, ohne den Router für die Kommunikation zwischen VLANs zu nennen.
> - PoE-Budget des Switches vergessen.

## Verwandte Themen
- [[N6 WLAN]] – drahtlose Anbindung
- [[H5 Elektrotechnik, USV und Energie]] – PoE-Budget und Stromversorgung
- [[N2 IPv4 und Subnetting]] – Subnetze für die VLANs planen

## Zusammenfassung
- Strukturierte Verkabelung: Primär (Gebäude, LWL Singlemode), Sekundär (Etagen), Tertiär (Dose, Cat 6A); 90 + 10 m.
- Kategorie/Klasse: Cat 6A = 500 MHz = 10 Gbit/s auf 100 m; schwächste Komponente zählt.
- dB: Spannung 20·log, Leistung 10·log, dBm bezogen auf 1 mW, Ketten addieren; ACR = NEXT − a.
- LWL: Multimode kurz, Singlemode lang, störunempfindlich.
- Switch (2, MAC), Router (3, IP, trennt Broadcast-Domänen), VLAN per 802.1Q, PoE 15,4/30/60/90 W.

## Direkt üben
```dataviewjs
await dv.view("AP1/99 System/views/trainer", { typen: ["db"] })
```

## Selbstcheck
```dataviewjs
await dv.view("AP1/99 System/views/quiz", { modul: "N5" })
```

**Weitere Aufgaben:** [[Aufgaben Netzwerk#N5 Verkabelung und Netzwerkkomponenten]] · **Karteikarten:** [[Karten Netzwerk]]

## Einschätzung
```dataviewjs
await dv.view("AP1/99 System/views/selbstcheck")
```

---
← [[N4 Netzwerkdienste und Protokolle]] · Weiter: [[N6 WLAN]] →
