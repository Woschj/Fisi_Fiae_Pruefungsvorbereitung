---
modul: N3
titel: IPv6
bereich: Netzwerk
reihenfolge: 3
dauer: 90
status: neu
sicherheit: 0
zuletzt:
berufsschule: "Evp-CPS · LF3 (Ausblick) – Schwerpunkt meist erst im 2. Lehrjahr"
tags: [ap1/modul, ap1/netzwerk]
---
# N3 · IPv6

> [!abstract] Überblick
> **Bereich:** [[Übersicht Netzwerk]]
> **Dauer:** ca. 90 min · **Prüfungsrelevanz:** ★★☆ – Kürzen, Adresstypen und Präfixe werden regelmäßig gefragt
> **Voraussetzungen:** [[N2 IPv4 und Subnetting]], Hexadezimal aus [[S1 Zahlensysteme und Codierung]]

## Lernziele
- [ ] Ich kann den Aufbau einer IPv6-Adresse (128 Bit, 8 Blöcke, Präfix + Interface-ID) erklären.
- [ ] Ich kann IPv6-Adressen regelkonform kürzen und wieder vollständig ausschreiben.
- [ ] Ich kann die wichtigsten Adresstypen am Präfix erkennen.
- [ ] Ich kann SLAAC, DHCPv6 und EUI-64 unterscheiden.
- [ ] Ich kann ein /48-Präfix in Subnetze aufteilen.
- [ ] Ich kann Vorteile von IPv6 gegenüber IPv4 begründen.

## Worum geht es?
IPv4 bietet rund 4,3 Milliarden Adressen – längst zu wenig. Provider vergeben IPv4 nur noch sparsam (Stichwort **CGNAT**: viele Kunden teilen sich eine öffentliche Adresse). IPv6 löst das Problem dauerhaft. Viele Anschlüsse laufen heute im **Dual Stack** (IPv4 und IPv6 parallel). Als IT-Fachkraft musst du IPv6-Adressen lesen, einordnen und planen können.

---

## 1. Aufbau

- **128 Bit** = 8 **Blöcke** (Hextets) à 16 Bit
- jeder Block: **4 Hex-Ziffern** (1 Hex-Ziffer = 4 Bit), getrennt durch `:`
- Beispiel: `2001:0db8:0a3c:0012:0000:0000:ac10:0001`

| Teil | Bits | Bedeutung |
|---|---|---|
| **Präfix** (Netzanteil) | meist die ersten **64** | vom Provider/Admin vergeben, enthält Routing-Präfix + Subnetz-ID |
| **Interface-ID** (Hostanteil) | die letzten **64** | identifiziert das Gerät im Subnetz |

Typische Größen: Provider → Kunde **/48** (Firma) oder **/56** (Privatanschluss) · ein einzelnes LAN-Segment ist immer **/64**.

Anzahl Adressen: 2¹²⁸ ≈ 3,4 · 10³⁸. In **einem** /64-Netz sind 2⁶⁴ ≈ 1,8 · 10¹⁹ Adressen – „Adressen sparen“ ist bei IPv6 kein Thema mehr.

---

<!-- abb:ipv6-aufbau -->
![[ipv6-aufbau.svg]]
*Abb.: Aufbau einer IPv6-Adresse mit Präfix, Subnetz-ID und Interface-ID*

## 2. Kürzen und Ausschreiben

**Regel 1 – führende Nullen:** In jedem Block dürfen **führende** Nullen weggelassen werden. `0db8` → `db8`, `0012` → `12`, `0000` → `0`. **Nullen am Ende bleiben!** (`0a00` → `a00`, nicht `a`)

**Regel 2 – Doppelpunkt:** **Eine** zusammenhängende Folge von Null-Blöcken darf durch `::` ersetzt werden – **nur einmal** pro Adresse (sonst wüsste man nicht, wie viele Nullen wohin gehören).

**Regel 3 – Eindeutigkeit (RFC 5952):** Gibt es mehrere Null-Folgen, wird die **längste** gekürzt, bei Gleichstand die **erste**. Ein **einzelner** Null-Block wird *nicht* mit `::` gekürzt, sondern als `0` geschrieben. Buchstaben **klein** schreiben.

> [!example] Beispiel durchgerechnet
> `2001:0db8:0000:0000:0a00:0000:0000:0010`
> 1. Führende Nullen: `2001:db8:0:0:a00:0:0:10`
> 2. Zwei Null-Folgen gleicher Länge (Blöcke 3–4 und 6–7) → die **erste** kürzen
> 3. Ergebnis: **`2001:db8::a00:0:0:10`**

> [!example] Rückwärts ausschreiben
> `fe80::21a:2bff:fe3c:4d5e`
> 1. Vorhandene Blöcke zählen: links 1 (`fe80`), rechts 4 → es fehlen 8 − 5 = **3** Null-Blöcke
> 2. Auffüllen: `fe80:0000:0000:0000:021a:2bff:fe3c:4d5e`

> [!question]- Kurz nachgedacht: Warum ist `2001:db8::1::5` ungültig?
> Weil `::` zweimal vorkommt. Man wüsste nicht, ob links 1 und rechts 4 oder links 3 und rechts 2 Null-Blöcke gemeint sind.

---

## 3. Adresstypen

| Präfix | Typ | Vergleich IPv4 | Bemerkung |
|---|---|---|---|
| `::1/128` | Loopback | 127.0.0.1 | das eigene Gerät |
| `::/128` | unspezifiziert | 0.0.0.0 | „habe noch keine Adresse“ |
| `fe80::/10` | **Link-Local** | 169.254.x.x | **jede** IPv6-Schnittstelle hat automatisch eine; wird **nicht geroutet** |
| `fc00::/7` (praktisch `fd00::/8`) | **Unique Local (ULA)** | 10.x / 192.168.x | privat, nicht im Internet geroutet |
| `2000::/3` | **Global Unicast (GUA)** | öffentliche Adresse | weltweit eindeutig und routbar |
| `ff00::/8` | **Multicast** | 224.x.x.x | `ff02::1` = alle Knoten im Link, `ff02::2` = alle Router |
| `2001:db8::/32` | Dokumentation | – | nur für Beispiele/Bücher |

**Wichtig:** IPv6 kennt **keinen Broadcast** – Aufgaben, die früher Broadcast brauchten (z. B. ARP), laufen über **Multicast** (Neighbor Discovery ersetzt ARP).

Ein Gerät hat bei IPv6 **mehrere Adressen gleichzeitig**: mindestens eine Link-Local, dazu meist eine oder mehrere globale (und ggf. ULA, temporäre Privacy-Adressen).

---

## 4. Adressvergabe

| Verfahren | Wie? | Merkmal |
|---|---|---|
| **SLAAC** (Stateless Address Autoconfiguration) | Router schickt per **Router Advertisement (RA)** das Präfix, der Host bildet die Interface-ID selbst | kein Server nötig |
| **DHCPv6 stateful** | Server vergibt Adressen und merkt sich die Zuordnung | zentrale Kontrolle wie bei IPv4 |
| **DHCPv6 stateless** | Adresse per SLAAC, weitere Infos (DNS-Server) per DHCPv6 | Kombination |
| **statisch** | manuell | Server, Router |

### EUI-64 – Interface-ID aus der MAC-Adresse
1. MAC in der Mitte teilen: `00:1a:2b` | `3c:4d:5e`
2. `ff:fe` einfügen: `00:1a:2b:ff:fe:3c:4d:5e`
3. Das **7. Bit** des ersten Bytes (U/L-Bit) **invertieren**: `00` = `0000 0000` → `0000 0010` = `02`
4. Ergebnis: **`021a:2bff:fe3c:4d5e`**

**Datenschutz-Problem:** Mit EUI-64 steckt die MAC in jeder Adresse → das Gerät ist über Netze hinweg wiedererkennbar. Lösung: **Privacy Extensions** (zufällige, regelmäßig wechselnde Interface-IDs), bei Windows und Smartphones Standard.

---

## 5. Subnetting mit IPv6

Gerechnet wird in **Hex-Ziffern (Nibbles)**: 4 Bit mehr Präfix = 16-mal so viele Subnetze.

Bei einem **/48** stehen die Bits 49–64 (= der **4. Block**) für Subnetze zur Verfügung → 2¹⁶ = **65 536** /64-Netze.

> [!example] Beispiel: `2001:db8:ab00::/48` in 16 gleich große Subnetze
> - 16 = 2⁴ → 4 Bit → **/52**
> - Die erste Hex-Ziffer des 4. Blocks zählt hoch:
>   `2001:db8:ab00:0000::/52` (= `2001:db8:ab00::/52`), `2001:db8:ab00:1000::/52`, `2001:db8:ab00:2000::/52`, …, `2001:db8:ab00:f000::/52`
> - Jedes /52 enthält 2^(64−52) = 2¹² = **4 096** /64-Netze.

> [!example] Praxisplanung
> Firma erhält `2001:db8:5a00::/48`. Plan: 4. Block = `SSVV` (Standort, VLAN):
> Standort 1, VLAN 10 → `2001:db8:5a00:010a::/64` · Standort 2, VLAN 20 → `2001:db8:5a00:0214::/64`
> So liest man schon an der Adresse ab, wo ein Gerät steht.

---

## 6. Vorteile und Besonderheiten

| Vorteil | Erklärung |
|---|---|
| riesiger Adressraum | jedes Gerät kann eine globale Adresse haben, **kein NAT nötig** |
| Autokonfiguration | SLAAC – Geräte konfigurieren sich selbst |
| effizienteres Routing | einfacher Header fester Länge (40 Byte), hierarchische Präfixe, keine Fragmentierung durch Router |
| Multicast statt Broadcast | weniger Last für unbeteiligte Geräte |
| IPsec vorgesehen | Sicherheit war von Anfang an Teil des Standards |

> [!warning] Sicherheitshinweis
> „Kein NAT“ heißt: Geräte sind **grundsätzlich erreichbar**. Eine **Firewall** am Router, die eingehende Verbindungen standardmäßig blockiert, ist Pflicht.

---

> [!warning] Typische Fehler in Prüfungen
> - Nullen am **Ende** eines Blocks streichen (`0a00` → ~~`a`~~).
> - `::` mehrfach verwenden oder für einen einzelnen Null-Block.
> - Bei Gleichstand die zweite statt der ersten Null-Folge kürzen.
> - IPv6 einen Broadcast zuschreiben.
> - 1 Hex-Ziffer = 8 Bit annehmen (richtig: **4 Bit**).

## Verwandte Themen
- [[N2 IPv4 und Subnetting]] – Vergleich mit IPv4
- [[N4 Netzwerkdienste und Protokolle]] – DHCP und DNS unter IPv6
- [[S1 Zahlensysteme und Codierung]] – Hexadezimalsystem

## Zusammenfassung
- 128 Bit, 8 Blöcke à 4 Hex-Ziffern; LAN-Segment = /64.
- Kürzen: führende Nullen weg, längste Null-Folge (≥ 2) einmal durch `::`, bei Gleichstand die erste.
- `fe80::/10` Link-Local · `fd00::/8` ULA · `2000::/3` global · `ff00::/8` Multicast · `::1` Loopback.
- SLAAC per Router Advertisement, DHCPv6, EUI-64 (ff:fe + 7. Bit kippen), Privacy Extensions.
- /48 → 4. Block für Subnetze, jede Hex-Ziffer = 4 Bit.

## Direkt üben
```dataviewjs
await dv.view("99 System/views/trainer", { typen: ["ipv6-kuerzen", "ipv6-expandieren", "ipv6-praefix"] })
```

## Selbstcheck
```dataviewjs
await dv.view("99 System/views/quiz", { modul: "N3" })
```

**Weitere Aufgaben:** [[Aufgaben Netzwerk#N3 IPv6]] · **Karteikarten:** [[Karten Netzwerk]]

## Einschätzung
```dataviewjs
await dv.view("99 System/views/selbstcheck")
```

---
← [[N2 IPv4 und Subnetting]] · Weiter: [[N4 Netzwerkdienste und Protokolle]] →
