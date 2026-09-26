---
modul: N2
titel: IPv4-Adressierung und Subnetting
bereich: Netzwerk
reihenfolge: 2
dauer: 150
status: neu
sicherheit: 0
zuletzt:
berufsschule: "Evp-CPS · LF3 LS3.2 (LAN-Party, IPv4-Adressierung, Adresskonflikt)"
tags: [ap1/modul, ap1/netzwerk]
---
# N2 · IPv4-Adressierung und Subnetting

> [!abstract] Überblick
> **Bereich:** [[Übersicht Netzwerk]]
> **Dauer:** ca. 2,5 h (plus Training!) · **Prüfungsrelevanz:** ★★★ – Subnetting ist *die* Rechenaufgabe der AP1
> **Voraussetzungen:** [[N1 Netzwerkgrundlagen und OSI-Modell]], Binärzahlen aus [[S1 Zahlensysteme und Codierung]]
> **Berufsschule:** Evp-CPS LF3 LS3.2 (LAN-Party-Planung)

## Lernziele
- [ ] Ich kann eine IPv4-Adresse binär darstellen und Netz- und Hostanteil mit der Subnetzmaske trennen.
- [ ] Ich kann zu jeder Adresse mit Präfix Netzadresse, Broadcast, Hostbereich und Hostanzahl bestimmen – ohne Binärrechnung, mit der Blockgrößen-Methode.
- [ ] Ich kann ein Netz in *n* gleich große Subnetze aufteilen.
- [ ] Ich kann nach Hostanforderungen das passende Präfix wählen (VLSM).
- [ ] Ich kenne private und besondere Adressbereiche und erkenne typische Fehlkonfigurationen.

## Worum geht es?
Deine Firma bezieht ein neues Gebäude: Verwaltung, Lager, Gäste-WLAN, Drucker und Server sollen **getrennte Netze** bekommen. Warum trennen? Weniger Broadcast-Verkehr, mehr Sicherheit (Gäste kommen nicht an die Server) und bessere Übersicht. Du bekommst **ein** Adressnetz und musst es sinnvoll aufteilen – das ist Subnetting.

---

## 1. Aufbau einer IPv4-Adresse

- **32 Bit**, geschrieben als 4 **Oktette** (je 8 Bit) in Dezimal, getrennt durch Punkte: `192.168.10.37`
- Jedes Oktett: 0 bis 255 (2⁸ = 256 Werte)
- Eine Adresse besteht aus **Netzanteil** (welches Netz?) und **Hostanteil** (welches Gerät im Netz?)
- Wo die Grenze liegt, bestimmt die **Subnetzmaske** bzw. das **Präfix**.

### Stellenwerte eines Oktetts
| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|---|---|---|---|---|---|---|---|

`37` = 32 + 4 + 1 = `0010 0101` · `192` = 128 + 64 = `1100 0000`

### Subnetzmaske und Präfix
Die Maske ist eine 32-Bit-Zahl, die **links nur Einsen** (Netzanteil) und **rechts nur Nullen** (Hostanteil) hat.

`/26` = 26 Einsen = `11111111.11111111.11111111.11000000` = **255.255.255.192**

Mögliche Werte eines Maskenoktetts (Einsen von links aufgefüllt):

| Bits | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|---|
| Wert | 0 | 128 | 192 | 224 | 240 | 248 | 252 | 254 | 255 |

> [!tip] Merke
> Die Reihe **128 – 192 – 224 – 240 – 248 – 252 – 254 – 255** solltest du auswendig können. Jeder Wert = vorheriger + halb so viel wie zuletzt dazukam.

<!-- abb:ipv4-subnetz-bits -->
![[ipv4-subnetz-bits.svg]]
*Abb.: Netz- und Hostanteil einer IPv4-Adresse, Netzadresse und Broadcast binär*

### Netzadresse per UND-Verknüpfung
Der Rechner bestimmt die Netzadresse, indem er IP und Maske **bitweise UND** verknüpft:

```text
IP      192.168.10.37   = 11000000.10101000.00001010.00100101
Maske   255.255.255.192 = 11111111.11111111.11111111.11000000
UND     192.168.10.0    = 11000000.10101000.00001010.00000000
```
So entscheidet ein PC, ob ein Ziel **im eigenen Netz** liegt (direkt zustellen) oder **in einem fremden** (an das Standardgateway schicken).

---

## 2. Besondere Adressen

| Adresse/Bereich | Bedeutung |
|---|---|
| **Netzadresse** | alle Hostbits 0 – bezeichnet das Netz, nicht für Geräte |
| **Broadcastadresse** | alle Hostbits 1 – an alle im Netz, nicht für Geräte |
| `10.0.0.0/8` | **privat** (RFC 1918) |
| `172.16.0.0/12` → 172.16.0.0 – 172.31.255.255 | **privat** |
| `192.168.0.0/16` | **privat** |
| `127.0.0.0/8` | **Loopback** (`127.0.0.1` = das eigene Gerät) |
| `169.254.0.0/16` | **APIPA / Link-Local** – selbst vergeben, wenn kein DHCP-Server antwortet |
| `100.64.0.0/10` | Carrier-Grade-NAT (Provider) |
| `224.0.0.0/4` | Multicast |
| `0.0.0.0` | „diese Adresse / unbekannt“, als Route: Standardroute |

**Private Adressen** werden im Internet nicht geroutet. Damit Geräte mit privaten Adressen ins Internet kommen, übersetzt der Router per **NAT** auf seine öffentliche Adresse – siehe [[N4 Netzwerkdienste und Protokolle]].

### Historisch – Adressklassen
Früher galt die Maske fest nach der ersten Zahl. Heute nutzt man **CIDR** (beliebige Präfixe), aber die Klassen tauchen in Aufgaben noch auf:

| Klasse | 1. Oktett | Standardmaske |
|---|---|---|
| A | 1 – 126 | /8 (255.0.0.0) |
| B | 128 – 191 | /16 (255.255.0.0) |
| C | 192 – 223 | /24 (255.255.255.0) |
| D | 224 – 239 | Multicast |
| E | 240 – 255 | reserviert |

---

## 3. Die Blockgrößen-Methode (ohne Binärrechnung)

Das ist das wichtigste Werkzeug dieses Moduls. Du brauchst nur die Maskenwerte.

**Schritt 1 – Interessantes Oktett finden:** das Oktett, in dem die Maske *nicht* 255 und *nicht* 0 ist (bei /8, /16, /24 liegt die Grenze genau zwischen zwei Oktetten).
**Schritt 2 – Blockgröße:** `256 − Maskenwert` in diesem Oktett.
**Schritt 3 – Netz finden:** größtes Vielfaches der Blockgröße, das **≤** dem Wert der IP in diesem Oktett ist.
**Schritt 4 – Broadcast:** nächstes Netz minus 1.
**Schritt 5 – Hosts:** `2^(32 − Präfix) − 2`.

> [!example] Beispiel 1: `192.168.10.37/27`
> 1. /27 → Maske 255.255.255.**224**, interessantes Oktett = 4.
> 2. Blockgröße: 256 − 224 = **32** → Netze bei 0, 32, 64, 96, …
> 3. 37 liegt zwischen 32 und 64 → Netz **192.168.10.32**
> 4. Nächstes Netz .64 → Broadcast **192.168.10.63**
> 5. Hosts **.33 – .62**, Anzahl 2⁵ − 2 = **30**

> [!example] Beispiel 2: `172.20.77.130/21` (Grenze im 3. Oktett)
> 1. /21 → 255.255.**248**.0, interessantes Oktett = 3.
> 2. Blockgröße 256 − 248 = **8** → 0, 8, 16, …, 72, 80
> 3. 77 → Netz **172.20.72.0**
> 4. Nächstes Netz 172.20.80.0 → Broadcast **172.20.79.255**
> 5. Hosts **172.20.72.1 – 172.20.79.254**, 2¹¹ − 2 = **2 046**
>
> Achtung: Im Oktett *nach* dem interessanten ist das Netz immer 0, der Broadcast immer 255.

### Tabelle zum Nachschlagen
| Präfix | Maske | Adressen | Hosts | | Präfix | Maske | Adressen | Hosts |
|---|---|---|---|---|---|---|---|---|
| /30 | .252 | 4 | 2 | | /22 | 255.255.252.0 | 1 024 | 1 022 |
| /29 | .248 | 8 | 6 | | /21 | 255.255.248.0 | 2 048 | 2 046 |
| /28 | .240 | 16 | 14 | | /20 | 255.255.240.0 | 4 096 | 4 094 |
| /27 | .224 | 32 | 30 | | /16 | 255.255.0.0 | 65 536 | 65 534 |
| /26 | .192 | 64 | 62 | | /8 | 255.0.0.0 | 16 777 216 | 16 777 214 |
| /25 | .128 | 128 | 126 | | | | | |
| /24 | 255.255.255.0 | 256 | 254 | | | | | |
| /23 | 255.255.254.0 | 512 | 510 | | | | | |

---

## 4. Ein Netz in n Subnetze teilen

1. **Subnetzbits** s: kleinstes s mit **2^s ≥ n**
2. **Neues Präfix** = altes Präfix + s
3. **Blockgröße** = 2^(32 − neues Präfix) → Subnetze in diesen Schritten hochzählen

> [!example] Beispiel: `192.168.40.0/24` in 6 Subnetze
> 1. 2² = 4 reicht nicht, 2³ = 8 ≥ 6 → **s = 3**
> 2. /24 + 3 = **/27** (255.255.255.224)
> 3. Blockgröße 32:
>
> | Nr. | Netz | Hosts | Broadcast |
> |---|---|---|---|
> | 1 | .0 | .1 – .30 | .31 |
> | 2 | .32 | .33 – .62 | .63 |
> | 3 | .64 | .65 – .94 | .95 |
> | 4 | .96 | .97 – .126 | .127 |
> | 5 | .128 | .129 – .158 | .159 |
> | 6 | .160 | .161 – .190 | .191 |
> | (7, 8) | .192, .224 | Reserve | |

> [!example] Beispiel mit Grenze über mehrere Oktette: `10.10.0.0/16` in 12 Subnetze
> 2⁴ = 16 ≥ 12 → /20, Blockgröße im 3. Oktett: 256 − 240 = 16
> Subnetze: 10.10.**0**.0, 10.10.**16**.0, 10.10.**32**.0, … · das 5. Subnetz: 10.10.64.0 – Broadcast 10.10.79.255

> [!question]- Kurz nachgedacht: Was passiert, wenn man mehr Subnetzbits nimmt?
> Jedes zusätzliche Subnetzbit **verdoppelt die Anzahl der Subnetze** und **halbiert die Adressen pro Subnetz**. Es gibt also immer einen Zielkonflikt zwischen „viele Netze“ und „viele Hosts pro Netz“. In Aufgaben immer prüfen, ob beide Anforderungen erfüllt sind.

---

## 5. Nach Hostanzahl planen (VLSM)

Wenn Abteilungen unterschiedlich groß sind, wäre es Verschwendung, allen gleich große Netze zu geben. Mit **VLSM** (Variable Length Subnet Mask) bekommt jede Abteilung ein passend großes Netz.

**Vorgehen:**
1. Anforderungen **absteigend** nach Größe sortieren (große Netze zuerst – sonst entstehen Lücken und falsch ausgerichtete Netze).
2. Pro Anforderung: kleinstes h mit **2^h − 2 ≥ Hosts** (Router/Gateway und Drucker mitzählen!).
3. Präfix = 32 − h. Lückenlos hintereinander vergeben.

> [!example] Beispiel: `10.8.0.0/24`, Anforderungen: C 20 Hosts, A 100 Hosts, Router-Link 2 Hosts, B 50 Hosts
> Sortiert: A 100 → B 50 → C 20 → Link 2
>
> | Netz | Bedarf | h | Präfix | Netzadresse | Broadcast |
> |---|---|---|---|---|---|
> | A | 100 | 7 (126) | /25 | 10.8.0.0 | 10.8.0.127 |
> | B | 50 | 6 (62) | /26 | 10.8.0.128 | 10.8.0.191 |
> | C | 20 | 5 (30) | /27 | 10.8.0.192 | 10.8.0.223 |
> | Link | 2 | 2 (2) | /30 | 10.8.0.224 | 10.8.0.227 |
>
> Frei bleibt 10.8.0.228 – 10.8.0.255 (Reserve für später).

**Zukunft einplanen:** In der Praxis (und in guten Prüfungsantworten) plant man **Reserve** ein – z. B. „50 Hosts, Wachstum 20 %“ → 60 Hosts → trotzdem /26 (62).

---

## 6. Konfiguration eines Clients

Ein Gerät braucht für die Kommunikation über das eigene Netz hinaus:

| Parameter | Wozu? |
|---|---|
| **IP-Adresse** | eigene Adresse |
| **Subnetzmaske** | eigenes Netz erkennen |
| **Standardgateway** | Router für alle fremden Netze (muss im **eigenen** Netz liegen!) |
| **DNS-Server** | Namen in IP-Adressen auflösen |

Vergabe **statisch** (Server, Drucker, Router – feste, dokumentierte Adressen) oder **dynamisch per DHCP** (Clients). Konvention: Gateway oft **erste** nutzbare Adresse, Server/Drucker aus einem reservierten Bereich, DHCP-Pool für den Rest.

### Typische Fehlkonfigurationen
| Symptom | Ursache |
|---|---|
| `169.254.x.x` | kein DHCP-Server erreichbar |
| „Adresskonflikt“-Meldung | **zwei Geräte mit derselben IP** (z. B. statische Adresse im DHCP-Pool) |
| Lokales Netz geht, Internet nicht | falsches/fehlendes Gateway, oder DNS fehlt |
| Nur manche Geräte im Netz erreichbar | falsche Subnetzmaske |
| Gateway „nicht erreichbar“ | Gateway liegt nicht im eigenen Subnetz |

> [!question]- Kurz nachgedacht: PC 192.168.1.10/24 soll PC 192.168.2.20/24 erreichen – geht das ohne Router?
> Nein. Mit /24 sind die Netze 192.168.**1**.0 und 192.168.**2**.0 verschieden. Der PC schickt das Paket an sein **Gateway**; ohne Router (oder mit falschem Gateway) kommt es nie an – auch wenn beide am selben Switch hängen.

---

> [!warning] Typische Fehler in Prüfungen
> - Hosts mit `2^h` statt `2^h − 2` berechnen.
> - Beim Teilen in *n* Subnetze **2^s > n** statt **2^s ≥ n** nehmen (bei n = 8 reichen 3 Bit!).
> - Netzadresse falsch, weil das Vielfache nicht **≤** dem IP-Wert gewählt wurde.
> - Bei VLSM **nicht sortieren** → Netze überlappen oder liegen nicht auf ihrer Blockgrenze.
> - Gateway und ggf. Reserve bei der Hostanzahl vergessen.
> - Broadcast als Hostadresse vergeben.

## Verwandte Themen
- [[N3 IPv6]] – dasselbe Prinzip mit 128 Bit
- [[N5 Verkabelung und Netzwerkkomponenten]] – ein VLAN je Subnetz
- [[S1 Zahlensysteme und Codierung]] – Binärdarstellung der Masken

## Zusammenfassung
- IPv4 = 32 Bit, Maske trennt Netz und Host; Netz = IP UND Maske.
- Blockgröße = 256 − Maskenwert → Netz, nächstes Netz, Broadcast.
- Hosts = 2^(Hostbits) − 2.
- n Subnetze: 2^s ≥ n → neues Präfix. Nach Hosts: 2^h − 2 ≥ Hosts.
- VLSM: absteigend sortieren, lückenlos vergeben.
- Privat: 10/8, 172.16/12, 192.168/16 · APIPA 169.254/16 · Loopback 127/8.

## Direkt üben
Rechne mindestens **10 Aufgaben** fehlerfrei hintereinander, bevor du weitermachst.
```dataviewjs
await dv.view("99 System/views/trainer", { typen: ["subnetz-analyse", "subnetz-teilen", "subnetz-hosts", "subnetz-gleich", "vlsm", "maske-praefix"] })
```

## Selbstcheck
```dataviewjs
await dv.view("99 System/views/quiz", { modul: "N2" })
```

**Weitere Aufgaben:** [[Aufgaben Netzwerk#N2 IPv4 und Subnetting]] · **Karteikarten:** [[Karten Netzwerk]]

## Einschätzung
```dataviewjs
await dv.view("99 System/views/selbstcheck")
```

---
← [[N1 Netzwerkgrundlagen und OSI-Modell]] · Weiter: [[N3 IPv6]] →
