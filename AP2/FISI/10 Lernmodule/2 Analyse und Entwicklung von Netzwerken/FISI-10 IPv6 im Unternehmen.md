---
modul: FISI-10
titel: IPv6 im Unternehmen
bereich: Netzwerke
pruefungsteil: "AP2 Teil 2 – Analyse und Entwicklung von Netzwerken"
reihenfolge: 10
dauer: 120
status: neu
sicherheit: 0
zuletzt:
tags: [ap2/modul, ap2/fisi]
---
# FISI-10 · IPv6 im Unternehmen

> [!abstract] Überblick
> **Bereich:** [[Übersicht FISI Netzwerke]]
> **Prüfung:** „Analyse und Entwicklung von Netzwerken“
> **Dauer:** ca. 120 min · **Prüfungsrelevanz:** ★★★ – IPv6-Präfixe in Teilnetze aufteilen sowie SLAAC, DHCPv6 und Dual Stack unterscheiden.
> **Grundlagen aus AP1:** [[N3 IPv6]]

## Lernziele
- [ ] Ich kann IPv6-Adressen kürzen und ausschreiben und Adresstypen erkennen.
- [ ] Ich kann ein Präfix (/48, /56) in /64-Netze aufteilen und erstes und letztes Netz angeben.
- [ ] Ich kann SLAAC, Router Advertisement und DHCPv6 erklären und begründen, wann DHCPv6 sinnvoll ist.
- [ ] Ich kann Vorteile von IPv6 gegenüber IPv4 und Dual Stack erklären.
- [ ] Ich erkenne typische IPv6-Probleme (VPN-Umgehung, Link-Local-Adressen in Mitschnitten).

## So wird das geprüft
> [!info] Typische AP2-Aufgabentypen
> - **/56 in /64 aufteilen:** 64 − 56 = 8 Bit → 256 Subnetze, erstes und letztes Netz angeben, vier gleich große Subnetze.
> - **Adresstypen zuordnen:** Global Unicast, Link-Local, öffentlich/privat IPv4, IPv4 only/IPv6 only/Dual Stack; **fe80:** erklären.
> - **SLAAC vs. DHCPv6** begründen, **Dual Stack** beschreiben.
> - **Vorteile IPv6**, **Anzahl Adressen in /64**.
> - **VPN wird über IPv6 umgangen**, IPv6-Adressen im Mitschnitt finden.

---

## 1. Schreibweise

128 Bit, 8 Blöcke à 16 Bit, hexadezimal: `2001:0db8:0000:0000:0a00:0000:0000:0010`
**Kürzen:** führende Nullen je Block weglassen; **eine** Folge von Null-Blöcken (die längste, bei Gleichstand die erste) durch `::` ersetzen → `2001:db8::a00:0:0:10`.
**Präfix:** `/64` = die ersten 64 Bit sind Netzanteil, die letzten 64 Bit sind der **Interface Identifier (IID)**.

### Adresstypen
| Typ | Präfix | Beschreibung |
|---|---|---|
| **Global Unicast** | 2000::/3 (beginnt mit 2 oder 3) | weltweit eindeutig und routbar |
| **Link-Local** | **fe80::/10** | automatisch auf **jeder** Schnittstelle, nur im eigenen Segment gültig, wird nicht geroutet (Nachbarerkennung, Router-Advertisement-Absender) |
| **Unique Local (ULA)** | fc00::/7 (praktisch **fd00::/8**) | privat, entspricht 10.0.0.0/8 |
| Loopback | ::1 | |
| Multicast | ff00::/8 | ersetzt Broadcast (z. B. ff02::1 = alle Knoten) |
| Dokumentation | 2001:db8::/32 | Beispiele in Prüfungen |

**IPv6 kennt keinen Broadcast.** ARP wird durch **NDP** (Neighbor Discovery Protocol, ICMPv6) ersetzt.

**Interface Identifier:** aus der MAC-Adresse gebildet (**EUI-64**: MAC in der Mitte mit `ff:fe` auffüllen, 7. Bit umkehren) oder **zufällig** (Privacy Extensions – schützt vor Verfolgung).

---

## 2. /64-Netze bilden

Provider vergeben meist ein **/48** (65 536 × /64) oder **/56** (256 × /64). Intern werden **ausschließlich /64-Netze** gebildet (SLAAC braucht 64 Bit IID).

**Rechnung:** Subnetzbits = 64 − Präfixlänge → Anzahl = 2^(64 − Präfix). Die Subnetzbits liegen im **4. Block**.

> [!example] Durchgerechnet (2001:db8:9876::/56)
> 64 − 56 = 8 Bit → **256 Subnetze**. Die 8 Bit sind die letzten beiden Hex-Ziffern des 4. Blocks:
> 1. Subnetz `2001:db8:9876::/64` (4. Block 0000)
> 2. Subnetz `2001:db8:9876:1::/64`
> vorletztes `2001:db8:9876:fe::/64`
> letztes `2001:db8:9876:ff::/64`

> [!example] Vier gleich große Subnetze aus einem /48
> 2 Bit → /50. Die ersten zwei Bit des 4. Blocks: 00, 01, 10, 11 → `…:0000::/50`, `…:4000::/50`, `…:8000::/50`, `…:c000::/50`.

**Anzahl Adressen in einem /64:** 2^64 ≈ **1,84 × 10^19**.

---

## 3. Adressvergabe

| Verfahren | Wie | Was der Client bekommt |
|---|---|---|
| **SLAAC** (Stateless Address Autoconfiguration) | Router sendet **Router Advertisements (RA)** mit dem Präfix; Client bildet seine Adresse selbst aus Präfix + IID | Präfix, Standardgateway (= Absender des RA, Link-Local-Adresse des Routers), per RDNSS auch DNS-Server |
| **DHCPv6 stateful** | DHCPv6-Server vergibt Adressen aus einem Pool | Adresse, DNS, weitere Optionen; Zuordnung wird **protokolliert** |
| **DHCPv6 stateless** | SLAAC für die Adresse, DHCPv6 nur für Zusatzinfos | DNS, NTP … |

**Warum DHCPv6 statt SLAAC?** Zentrale **Kontrolle und Protokollierung**, wer welche Adresse hat (Nachvollziehbarkeit, Sicherheit), Adresspools für mehrere Subnetze, zusätzliche Optionen (Zeitserver, TFTP-Server für Telefone/PXE, Druckserver, Domänensuffix), einheitliche Verwaltung wie bei IPv4.

**Dual Stack:** Jede Schnittstelle hat **gleichzeitig IPv4- und IPv6-Adressen**; der Internetanschluss liefert beide Protokolle. Anwendungen bevorzugen meist IPv6 und nutzen IPv4 als Rückfall. Übergangstechniken: DS-Lite (IPv4 im IPv6-Tunnel, oft mit CGN), NAT64/DNS64.

---

## 4. Vorteile von IPv6

- **Adressraum:** 128 statt 32 Bit – IPv4-Adressen sind erschöpft.
- **Kein NAT nötig** → echte Ende-zu-Ende-Verbindungen (Sicherheit dann über Firewall, nicht über NAT).
- **Autokonfiguration** (SLAAC), einfachere Verwaltung.
- **Vereinfachter Header** mit fester Länge → effizientere Verarbeitung; keine Fragmentierung durch Router (Path MTU Discovery).
- **IPsec** ist fester Bestandteil der Spezifikation; Flow Label für QoS.
- Multicast statt Broadcast.

### Typische Probleme
- **VPN-Umgehung (IPv6 Leak):** Der VPN-Client tunnelt nur IPv4. Im Hotelnetz bekommt der Laptop zusätzlich IPv6 und baut Verbindungen am Tunnel vorbei auf. Abhilfe: IPv6 im VPN mit tunneln, IPv6 auf dem Client deaktivieren oder den VPN-Client so konfigurieren, dass er allen Verkehr erzwingt.
- **Firewall vergessen:** Regeln nur für IPv4 gepflegt – Dienste sind über IPv6 offen.
- In Mitschnitten: Link-Local (`fe80::`) für Nachbarschaft/RA, ULA (`fd00::`) für interne Dienste, Global Unicast für Internet.

---

> [!warning] Typische Fehler in Prüfungen
> - `::` zweimal in einer Adresse verwenden.
> - Subnetzbits im falschen Block zählen – bei /48 bis /64 ist es **immer der 4. Block**.
> - Bei „erstes Netz“ `2001:db8:9876:1::` angeben – das erste ist `2001:db8:9876::/64` (Block 0).
> - Link-Local-Adresse als „fehlerhaft“ deuten – sie ist bei IPv6 normal und immer vorhanden.

## Verwandte Themen
- [[FISI-9 IPv4-Subnetting und Routing]] – Subnetting-Prinzip
- [[FISI-13 DNS, DHCP und Netzdienste]] – AAAA-Einträge, DHCP
- [[FISI-15 VPN, TLS und PKI]] – VPN und IPv6
- [[N3 IPv6]] – Grundlagen aus AP1

## Zusammenfassung
- 128 Bit, 8 Blöcke, `::` nur einmal. /64 = Netz + 64-Bit-IID.
- Global Unicast 2000::/3 · Link-Local fe80::/10 · ULA fd00::/8 · kein Broadcast, NDP statt ARP.
- Anzahl /64 = 2^(64 − Präfix); /56 → 256 Netze, letztes `…:ff::/64`. /64 ≈ 1,84 × 10^19 Adressen.
- SLAAC (RA: Präfix + Gateway) vs. DHCPv6 (Kontrolle, Protokoll, Optionen). Dual Stack = v4 + v6 parallel.

## Direkt üben
```dataviewjs
await dv.view("AP2/99 System/views/trainer", { typen: ["ipv6-subnetze", "ipv6-praefix", "ipv6-kuerzen", "ipv6-expandieren"] })
```

## Selbstcheck
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { modul: "FISI-10" })
```

**Weitere Aufgaben:** [[Aufgaben Netzwerke#FISI-10 IPv6 im Unternehmen]] · **Karteikarten:** [[Karten Netzwerke]]

## Einschätzung
```dataviewjs
await dv.view("AP2/99 System/views/selbstcheck")
```

---
← [[FISI-9 IPv4-Subnetting und Routing]] · Weiter: [[FISI-11 Switching, VLAN und Verkabelung]] →
