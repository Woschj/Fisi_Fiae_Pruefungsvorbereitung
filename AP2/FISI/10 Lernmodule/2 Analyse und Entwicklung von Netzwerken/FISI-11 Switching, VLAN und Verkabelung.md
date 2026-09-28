---
modul: FISI-11
titel: Switching, VLAN und Verkabelung
bereich: Netzwerke
pruefungsteil: "AP2 Teil 2 – Analyse und Entwicklung von Netzwerken"
reihenfolge: 11
dauer: 150
status: neu
sicherheit: 0
zuletzt:
tags: [ap2/modul, ap2/fisi]
---
# FISI-11 · Switching, VLAN und Verkabelung

> [!abstract] Überblick
> **Bereich:** [[Übersicht FISI Netzwerke]]
> **Prüfung:** „Analyse und Entwicklung von Netzwerken“
> **Dauer:** ca. 150 min · **Prüfungsrelevanz:** ★★★ – VLAN-Vorteile, Tagging-Tabellen, Trunk-Konfiguration und Inter-VLAN-Routing verstehen und anwenden.
> **Grundlagen aus AP1:** [[N5 Verkabelung und Netzwerkkomponenten]] · [[N1 Netzwerkgrundlagen und OSI-Modell]]

## Lernziele
- [ ] Ich kann Vorteile von VLANs nennen und portbasierte von dynamischen VLANs unterscheiden.
- [ ] Ich kann eine Switchport-Tabelle (VLAN, tagged/untagged) ausfüllen und das Tag nach IEEE 802.1Q erklären.
- [ ] Ich kann Inter-VLAN-Routing (Layer-3-Switch, Router-on-a-Stick mit Subinterfaces) und DHCP-Relay erklären.
- [ ] Ich kann native VLAN, VLAN-Hopping und die Absicherung des Switch-Managements erklären.
- [ ] Ich kann STP und Link Aggregation vergleichen und SFP/SFP+ sowie Glasfaser vs. Kupfer begründen.
- [ ] Ich kann einen PoE-Switch anhand von Port- und Leistungsbudget auswählen.

## So wird das geprüft
> [!info] Typische AP2-Aufgabentypen
> - **Vorteile von VLANs** – fast wortgleich.
> - **VLAN-Tag und Trunk:** Warum ein Tag, was steht drin (VLAN-ID), Uplinks auf „tagged“.
> - **Switchport-Tabelle** mit VLAN-Nummer und tagged/untagged ausfüllen.
> - **Statische/portbasierte vs. dynamische VLANs (802.1X)**.
> - **Router-on-a-Stick/Subinterfaces**, **falsches Gateway im Subinterface finden**, **DHCP-Relay**.
> - **Native VLAN und VLAN-Hopping**, Switch-Management absichern.
> - **STP vs. Link Aggregation**, **SFP/SFP+**, **SFP-Fehlersuche**, **Glasfaser statt Kupfer zwischen Gebäuden**.
> - **PoE-Switch auswählen**, **VoIP-VLAN**.

---

## 1. VLAN

Ein **VLAN** (Virtual LAN) teilt ein physisches Netz in **logisch getrennte Layer-2-Netze**. Jedes VLAN ist eine eigene **Broadcast-Domäne** und bekommt ein eigenes IP-Subnetz.

**Vorteile:**
- **Sicherheit** – logische Trennung (Gäste, Verwaltung, Produktion, Management)
- **kleinere Broadcast-Domänen** – weniger unnötiger Verkehr
- **Flexibilität** – Zuordnung unabhängig vom Standort, neue Segmente per Konfiguration
- **weniger Hardware und Verkabelung** – mehrere Netze über einen Switch/ein Kabel → geringere Kosten
- **QoS** – z. B. Sprachverkehr (Voice-VLAN) priorisieren
- einfachere Verwaltung und Fehlersuche

| VLAN-Art | Zuordnung | Beispiel |
|---|---|---|
| **portbasiert (statisch)** | Admin ordnet den **Switchport** fest einem VLAN zu | alle Ports in der Werkstatt → VLAN „Werkstatt“ |
| **dynamisch** | Zuordnung nach **Benutzer oder Gerät** (MAC, **802.1X**-Anmeldung mit RADIUS) | Konto „Chef“ landet immer im VLAN Verwaltung, egal an welchem Port |

### Tagging nach IEEE 802.1Q
Zwischen Switches (und zum Router) laufen **mehrere VLANs über eine Leitung** (**Trunk**). Damit der Empfänger weiß, zu welchem VLAN ein Frame gehört, wird im Ethernet-Header ein **4-Byte-Tag** eingefügt – mit der **VLAN-ID** (12 Bit, 1–4094) und der **Priorität** (3 Bit, PCP für QoS). Ein normaler Frame hat dafür kein Feld.

| Portmodus | Verhalten | Einsatz |
|---|---|---|
| **untagged / Access** | gehört zu **einem** VLAN, Frames ohne Tag | Endgeräte (PC, Drucker, Kamera) |
| **tagged / Trunk** | transportiert **mehrere** VLANs mit Tag | Uplinks zwischen Switches, zum Router/Firewall, zum Virtualisierungshost, zum Accesspoint mit mehreren SSIDs |

> [!example] Switchport-Tabelle
>
> | Interface | VLAN | Modus |
> |---|---|---|
> | G0/1, G0/2 (Telefone) | 233 | untagged |
> | G0/10 (Drucker) | 232 | untagged |
> | G0/22, G0/23 (PCs) | 231 | untagged |
> | G0/24 (Uplink zum Router) | 231, 232, 233 | **tagged** |

**Native VLAN:** Auf einem Trunk werden Frames des nativen VLANs **ohne Tag** übertragen. Ist das native VLAN gleich dem Default-VLAN 1, droht **VLAN-Hopping** (Double Tagging). Abhilfe: natives VLAN auf ein ungenutztes VLAN legen, VLAN 1 nicht verwenden, ungenutzte Ports deaktivieren.

**Switch-Management absichern:** eigenes **Management-VLAN** mit eigener IP, Zugriff nur per **SSH/HTTPS** (Telnet/HTTP aus), starke Passwörter und 2FA, Logging (Syslog), regelmäßige Firmware-Updates.

---

## 2. Inter-VLAN-Routing

VLANs sind getrennte Netze – Kommunikation zwischen ihnen braucht **Routing** (Layer 3).
- **Layer-3-Switch:** hat je VLAN ein virtuelles Interface (SVI) mit Gateway-IP und routet intern. Nur Verkehr ins Internet geht an den Router (Default-Route).
- **Router-on-a-Stick:** Ein Router mit **einer** physischen Schnittstelle zum Switch (Trunk); darauf je VLAN ein **Subinterface** (z. B. `Gi0/0.231`) mit **802.1Q-Kapselung** und der Gateway-IP des VLANs.

> [!example] Fehler im Subinterface
> VLAN 231 hat das Netz 192.168.23.0/29 (Hosts .1–.6). Am Subinterface ist .61 eingetragen – liegt **nicht im Netz**. Korrektur: Adresse aus .1–.6 mit Maske 255.255.255.248.

### DHCP über VLAN-Grenzen
Der **DHCP-Discover ist ein Broadcast** und endet am Router bzw. Layer-3-Switch. Liegt der DHCP-Server in einem anderen VLAN, muss am Gateway jedes VLANs ein **DHCP-Relay** (Cisco: `ip helper-address`) eingerichtet werden, das die Anfrage als Unicast an den Server weiterleitet. Fehlt es, bekommen Clients eine **APIPA-Adresse** (169.254.x.x).

---

## 3. Redundanz zwischen Switches

| | **Spanning Tree (STP, RSTP)** | **Link Aggregation (LACP, 802.3ad)** |
|---|---|---|
| Ziel | **Schleifen verhindern** (Broadcast-Sturm) bei redundanten Leitungen | mehrere Leitungen zu **einer logischen** bündeln |
| Normalbetrieb | eine Leitung aktiv, die redundante ist **blockiert** | alle Leitungen aktiv → **höherer Durchsatz** |
| bei Ausfall | STP aktiviert die blockierte Leitung | Verkehr läuft mit reduzierter Rate über die verbleibenden Leitungen |

Ein Port im Zustand „blocking“ ist also kein Defekt, sondern von STP (oder vom Admin) gesperrt, um Schleifen zu vermeiden.

---

## 4. Verkabelung und Module

### Glasfaser oder Kupfer
Zwischen zwei Gebäuden (> 100 m) ist **Glasfaser (LWL)** Pflicht bzw. klar besser:
- **Reichweite:** Kupfer (Twisted Pair) max. **100 m**; Multimode einige hundert Meter bis ca. 2 km, Singlemode viele Kilometer
- **Bandbreite:** 10/40/100 Gbit/s und mehr, zukunftssicher
- **EMV-unempfindlich** (Maschinen, Magnetfelder) und **abhörsicherer** (keine Abstrahlung)
- **galvanische Trennung:** leitet keinen Strom → keine Ausgleichsströme bei unterschiedlichem Erdpotenzial der Gebäude, **Schutz bei Blitzeinschlag**

### SFP-Module
**SFP** (Small Form-factor Pluggable) sind steckbare Transceiver für Switch-Ports: Glasfaser (Multi-/Singlemode, verschiedene Wellenlängen) oder Kupfer. **SFP** bis 1 Gbit/s, **SFP+** 10 Gbit/s, SFP28 25 Gbit/s, QSFP+ 40 Gbit/s.

**Fehlersuche bei SFP/LWL**: Konfiguration auf falschem Port (SFP-Ports teilen sich die Nummer mit Kupferports oder liegen hinter ihnen), **unterschiedliche Wellenlängen** beider Module, **Sende- und Empfangsfaser vertauscht**, verschmutzte Stecker, defektes oder schlecht steckendes Modul, falscher Fasertyp.

### PoE-Switch auswählen
Prüfe **drei** Dinge: genug **Ports** (Endgeräte **plus Uplink**), **PoE-Standard** je Port (802.3af 15,4 W, 802.3at/PoE+ 30 W, 802.3bt bis 60/90 W) und das **Gesamt-PoE-Budget** des Switches.
> 8 Accesspoints à 17,9 W brauchen PoE+ und ein Budget von mindestens 8 × 17,9 = **143,2 W** sowie 9 Ports (8 + Uplink). Alternativ PoE-Injektoren.

**Voice-VLAN:** Telefone in eigenem VLAN → QoS-Priorisierung, Trennung vom Datennetz, Schutz vor Angriffen, einfachere Fehlersuche; oft hängt der PC am Telefon (Telefon-Port tagged für Voice, untagged für Daten).

---

> [!warning] Typische Fehler in Prüfungen
> - Endgeräteports als „tagged“ markieren – Endgeräte sind **untagged**; nur Uplinks tragen mehrere VLANs.
> - Vergessen, dass VLANs ohne Router **nicht** miteinander sprechen.
> - STP „erhöht die Bandbreite“ – nein, das macht Link Aggregation. STP verhindert Schleifen.
> - Beim PoE-Switch nur die Portanzahl prüfen und das **Gesamtbudget** oder den Uplink-Port vergessen.

## Verwandte Themen
- [[FISI-9 IPv4-Subnetting und Routing]] – ein Subnetz je VLAN
- [[FISI-13 DNS, DHCP und Netzdienste]] – DHCP und Relay
- [[FISI-14 WLAN und Netzzugangskontrolle]] – 802.1X, Port Security, Accesspoints mit mehreren VLANs
- [[N5 Verkabelung und Netzwerkkomponenten]] – Grundlagen aus AP1

## Zusammenfassung
- VLAN = logisches Layer-2-Netz, eigene Broadcast-Domäne, eigenes Subnetz. Vorteile: Sicherheit, weniger Broadcast, Flexibilität, weniger Hardware, QoS.
- 802.1Q-Tag (4 Byte, VLAN-ID 12 Bit). Endgerät untagged, Uplink tagged (Trunk). Native VLAN ≠ VLAN 1 gegen Hopping.
- Inter-VLAN: L3-Switch oder Router-on-a-Stick mit Subinterfaces. DHCP-Relay über VLAN-Grenzen.
- STP blockiert redundante Wege, LACP bündelt sie. Glasfaser: Reichweite, Bandbreite, EMV, galvanische Trennung. SFP 1G, SFP+ 10G. PoE: Ports + Uplink + Budget.

## Selbstcheck
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { modul: "FISI-11" })
```

**Weitere Aufgaben:** [[Aufgaben Netzwerke#FISI-11 Switching, VLAN und Verkabelung]] · **Karteikarten:** [[Karten Netzwerke]]

## Einschätzung
```dataviewjs
await dv.view("AP2/99 System/views/selbstcheck")
```

---
← [[FISI-10 IPv6 im Unternehmen]] · Weiter: [[FISI-12 NAT, Firewall, DMZ und Proxy]] →
