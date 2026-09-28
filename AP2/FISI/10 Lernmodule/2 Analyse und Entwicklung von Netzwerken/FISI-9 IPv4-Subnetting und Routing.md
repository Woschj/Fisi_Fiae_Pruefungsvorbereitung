---
modul: FISI-9
titel: IPv4-Subnetting und Routing
bereich: Netzwerke
pruefungsteil: "AP2 Teil 2 – Analyse und Entwicklung von Netzwerken"
reihenfolge: 9
dauer: 180
status: neu
sicherheit: 0
zuletzt:
tags: [ap2/modul, ap2/fisi]
---
# FISI-9 · IPv4-Subnetting und Routing

> [!abstract] Überblick
> **Bereich:** [[Übersicht FISI Netzwerke]]
> **Prüfung:** „Analyse und Entwicklung von Netzwerken“ (90 min, 4 Aufgaben)
> **Dauer:** ca. 180 min · **Prüfungsrelevanz:** ★★★ – IPv4-Subnetting, VLSM und Routingtabellen sicher berechnen und begründen.
> **Grundlagen aus AP1:** [[N2 IPv4 und Subnetting]] · [[N1 Netzwerkgrundlagen und OSI-Modell]]

## Lernziele
- [ ] Ich bestimme Netz-ID, Broadcast, Hostbereich und Hostanzahl für jede Adresse mit Präfix.
- [ ] Ich plane Subnetze mit VLSM lückenlos und ordne Gateways zu.
- [ ] Ich kenne private Bereiche, APIPA, Loopback, Multicast und /31-Transfernetze.
- [ ] Ich fülle eine Routingtabelle mit Netz, Maske, Interface und Next Hop inklusive Default-Route aus und finde Fehler darin.
- [ ] Ich vergleiche statisches und dynamisches Routing, Distanzvektor und Link-State, und erkläre Metrik und FHRP (VRRP).

## So wird das geprüft
> [!info] Typische AP2-Aufgabentypen
> - **VLSM-Tabelle:** Abteilungen mit Hostzahlen → Netzadresse und Maske.
> - **Adresse analysieren:** Netz-ID, erste/letzte Host-IP, Broadcast, Maske, Broadcast je Interface, nutzbare Adressen je Interface.
> - **Routingtabelle erstellen oder korrigieren:** Netzwerk, Maske, Interface, Next Hop, **Default-Route 0.0.0.0/0**, vertauschte Gateways finden.
> - **Statisch vs. dynamisch**, **Link-State vs. Distanzvektor**, **Metrik**.
> - **/31 für Punkt-zu-Punkt nach RFC 3021**, **private Bereiche mit CIDR und Broadcast**, **Unicast/Multicast/Broadcast** und Multicast-Bereich, **FHRP/VRRP**.

---

## 1. Adresse analysieren

**Blockgröße-Methode:** Im „interessanten“ Oktett (dort, wo die Maske weder 255 noch 0 ist) ist die Blockgröße **256 − Maskenwert**. Die Netze beginnen bei Vielfachen der Blockgröße.

| Präfix | Maske | Blockgröße | Hosts |
|---|---|---|---|
| /24 | 255.255.255.0 | 256 | 254 |
| /25 | 255.255.255.128 | 128 | 126 |
| /26 | 255.255.255.192 | 64 | 62 |
| /27 | 255.255.255.224 | 32 | 30 |
| /28 | 255.255.255.240 | 16 | 14 |
| /29 | 255.255.255.248 | 8 | 6 |
| /30 | 255.255.255.252 | 4 | 2 |
| /22 | 255.255.252.0 | 4 (3. Oktett) | 1 022 |
| /20 | 255.255.240.0 | 16 (3. Oktett) | 4 094 |

> [!example] Beispiel
> **203.0.113.170/27** → Blockgröße 32 → Netze bei .160 und .192 → Netz-ID **203.0.113.160**, erste Host-IP .161, letzte .190, Broadcast **.191**, Maske 255.255.255.224.

**Hosts** = 2^(32 − Präfix) − 2. **Gateway** ist üblicherweise die erste oder letzte nutzbare Adresse (Prüfungen verwenden oft die **letzte**, z. B. .254 oder .62).

### Besondere Adressbereiche
| Bereich | Zweck |
|---|---|
| **10.0.0.0/8**, **172.16.0.0/12**, **192.168.0.0/16** | private Adressen (RFC 1918) – im Internet nicht geroutet |
| 127.0.0.0/8 | Loopback (localhost) |
| **169.254.0.0/16** | **APIPA** / Link-Local – Client hat **keinen DHCP-Server** erreicht oder einen Adresskonflikt erkannt |
| **224.0.0.0 – 239.255.255.255** (224.0.0.0/4) | Multicast |
| 100.64.0.0/10 | Carrier-Grade-NAT beim Provider |
| 192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24 | Dokumentationsnetze (in Prüfungen als „öffentliche“ Adressen) |

> [!example] Private Bereiche
> 10.0.0.0**/8** (letzte Adresse = Broadcast 10.255.255.255) · 172.16.0.0**/12** (bis 172.31.255.255) · 192.168.0.0**/16** (bis 192.168.255.255).

**Unicast – Multicast – Broadcast:** 1 zu 1 (Webseite abrufen) · 1 zu einer Gruppe (IPTV-Stream) · 1 zu allen im Netz (ARP-Request, DHCP-Discover). Der Layer-3-Broadcast (letzte Adresse des Netzes) wird im LAN als Layer-2-Broadcast an **FF:FF:FF:FF:FF:FF** zugestellt; **Router leiten Broadcasts nicht weiter**.

---

## 2. Subnetze bilden

**Gleich große Subnetze:** Für 2ⁿ Subnetze n Bit vom Hostanteil „leihen“.
> Aus 172.16.0.0/12 werden vier Netze → 2 Bit → /14, Blockgröße im 2. Oktett 4 → 172.16.0.0, 172.20.0.0, 172.24.0.0, 172.28.0.0 (jeweils 255.252.0.0). Letzte nutzbare Adresse z. B. 172.19.255.254 als Gateway.

### VLSM
**Variable Length Subnet Masking:** jedes Subnetz so klein wie möglich.
1. Netze **nach Größe absteigend** sortieren.
2. Pro Netz das kleinste h mit **2^h − 2 ≥ Hosts** bestimmen → Präfix 32 − h.
3. Lückenlos ab der ersten freien Adresse vergeben.

> [!example] Durchgerechnet (172.16.102.0/24)
>
> | Bereich | Hosts | Netzadresse | Maske | Broadcast |
> |---|---|---|---|---|
> | Abteilung 1 | 80 | 172.16.102.0 | 255.255.255.128 (/25) | .127 |
> | Abteilung 2 | 50 | 172.16.102.128 | 255.255.255.192 (/26) | .191 |
> | Abteilung 3 | 20 | 172.16.102.192 | 255.255.255.224 (/27) | .223 |
> | IT | 10 | 172.16.102.224 | 255.255.255.240 (/28) | .239 |

**Transfernetze:** Zwischen zwei Routern genügt ein **/30** (2 Hosts). Nach **RFC 3021** geht auch **/31** (beide Adressen nutzbar, keine Netz-ID und kein Broadcast nötig). Aus einem /16 lassen sich so 2^15 = **32 768** Punkt-zu-Punkt-Netze bilden.

---

## 3. Routing

Ein Router entscheidet anhand der **Routingtabelle**, wohin ein Paket geht. Es gewinnt der **längste passende Präfix** (spezifischste Route); passt nichts, gilt die **Default-Route**.

| Spalte | Bedeutung |
|---|---|
| Netzwerkziel | Netz-ID des Zielnetzes |
| Netzmaske / Präfix | Größe des Zielnetzes |
| Interface / Schnittstelle | Ausgang am eigenen Router (bei direkt angeschlossenen Netzen) |
| Next Hop / Gateway | IP des **nächsten Routers** (bei entfernten Netzen) – „direct“ bzw. „–“ bei direkt verbunden |
| Metrik | Kosten der Route – kleiner ist besser |

> [!example] Routingtabelle (Router Essen)
>
> | Ziel | Maske | Next Hop | Interface |
> |---|---|---|---|
> | 10.1.0.0 | 255.255.0.0 | direct | IF1 (eigenes LAN) |
> | 10.2.0.0 | 255.255.0.0 | 192.168.0.2 | – |
> | 10.3.0.0 | 255.255.0.0 | 192.168.0.6 | – |
> | 192.168.0.0 | 255.255.255.252 | direct | IF2 (Transfernetz) |
> | 192.168.0.4 | 255.255.255.252 | direct | IF3 |
> | **0.0.0.0** | **0.0.0.0** | 210.10.10.1 (Provider) | – |
>
> Die Default-Route schickt alles Unbekannte ins Internet. Spezifische Einträge für Netze hinter demselben Next Hop wie die Default-Route sind **optional**.

**Fehlersuche in Routingtabellen:** vertauschte Next Hops, Next Hop nicht im direkt angeschlossenen Netz, falsche Maske, fehlende Default-Route, fehlende Rückroute am Gegenüber.

### Statisch oder dynamisch
| **statisches Routing** | **dynamisches Routing** |
|---|---|
| Admin trägt Routen manuell ein | Router tauschen Routen per Protokoll aus |
| keine CPU-/Netzlast, vorhersehbar, sicher | reagiert **automatisch auf Ausfälle**, sucht Alternativwege → Redundanz |
| bei Änderungen/Ausfällen manuell anpassen | neue Standorte werden automatisch bekannt |
| für kleine, stabile Netze | höhere CPU- und Netzlast, Protokoll-Know-how nötig |

| Verfahren | Prinzip | Beispiele |
|---|---|---|
| **Distanzvektor** | Router kennen nur **Entfernung (Hops) und Richtung** und tauschen periodisch ihre Tabellen mit Nachbarn | RIP (Metrik: Hopcount, max. 15) |
| **Link-State** | jeder Router kennt die **gesamte Topologie** inkl. Leitungsbandbreiten und berechnet den kürzesten Weg (Dijkstra) | **OSPF**, IS-IS |
| Pfadvektor | zwischen Providern (autonome Systeme) | BGP |

**Metrik:** Wert, den das Routingprotokoll jedem Pfad zuordnet (Hops, Bandbreite, Verzögerung, Kosten). Der Pfad mit der **kleinsten** Metrik wird gewählt. Link-State berücksichtigt z. B., dass zwei schnelle Glasfaserstrecken besser sind als eine direkte langsame Leitung – Distanzvektor würde die direkte Leitung wegen weniger Hops bevorzugen.

### Redundantes Gateway (FHRP)
Ein **First Hop Redundancy Protocol** (VRRP, HSRP, CARP) lässt zwei Router eine **gemeinsame virtuelle IP** (und MAC) bereitstellen. Clients und Server tragen diese **virtuelle IP als Standardgateway** ein. Fällt der aktive Router aus, übernimmt der Backup-Router die virtuelle Adresse – ohne Änderung an den Clients.

---

> [!warning] Typische Fehler in Prüfungen
> - VLSM nicht absteigend sortiert → Netze überlappen oder Lücken entstehen.
> - Hosts ohne −2 gerechnet.
> - In der Routingtabelle beim direkt angeschlossenen Netz einen Next Hop eintragen oder beim entfernten Netz nur das Interface.
> - Default-Route als 255.255.255.255 notieren – richtig ist **0.0.0.0 / 0.0.0.0**.
> - APIPA-Adresse als „Fehler der Netzwerkkarte“ deuten – sie heißt: **kein DHCP** (oder Adresskonflikt).

## Verwandte Themen
- [[FISI-10 IPv6 im Unternehmen]] – dasselbe mit 128 Bit
- [[FISI-11 Switching, VLAN und Verkabelung]] – Subnetz je VLAN, Inter-VLAN-Routing
- [[FISI-12 NAT, Firewall, DMZ und Proxy]] – private Adressen ins Internet
- [[N2 IPv4 und Subnetting]] – Grundlagen aus AP1

## Zusammenfassung
- Blockgröße = 256 − Maskenwert, Hosts = 2^h − 2, Broadcast = eine Adresse vor dem nächsten Netz.
- VLSM: absteigend sortieren, kleinstes passendes Präfix, lückenlos. Transfernetz /30 oder /31 (RFC 3021).
- Privat: 10/8, 172.16/12, 192.168/16 · APIPA 169.254/16 · Multicast 224–239.
- Routingtabelle: Ziel, Maske, Interface (direkt) oder Next Hop (entfernt), Default 0.0.0.0/0; längster Präfix gewinnt.
- Statisch vs. dynamisch; RIP (Distanzvektor, Hops) vs. OSPF (Link-State, Topologie). FHRP: virtuelle Gateway-IP.

## Direkt üben
```dataviewjs
await dv.view("AP2/99 System/views/trainer", { typen: ["subnetz-analyse", "subnetz-teilen", "vlsm", "subnetz-hosts", "subnetz-gleich", "maske-praefix"] })
```

## Selbstcheck
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { modul: "FISI-9" })
```

**Weitere Aufgaben:** [[Aufgaben Netzwerke#FISI-9 IPv4-Subnetting und Routing]] · **Karteikarten:** [[Karten Netzwerke]]

## Einschätzung
```dataviewjs
await dv.view("AP2/99 System/views/selbstcheck")
```

---
← [[Übersicht FISI Netzwerke]] · Weiter: [[FISI-10 IPv6 im Unternehmen]] →
