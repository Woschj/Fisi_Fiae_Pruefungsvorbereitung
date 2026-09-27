---
modul: FISI-1
titel: Server, Virtualisierung und Container
bereich: Konzeption und Administration
pruefungsteil: "AP2 Teil 2 – Konzeption und Administration von IT-Systemen"
reihenfolge: 1
dauer: 120
status: neu
sicherheit: 0
zuletzt:
tags: [ap2/modul, ap2/fisi]
---
# FISI-1 · Server, Virtualisierung und Container

> [!abstract] Überblick
> **Bereich:** [[Übersicht FISI Konzeption und Administration]]
> **Prüfung:** „Konzeption und Administration von IT-Systemen“ (90 min, 4 Aufgaben)
> **Dauer:** ca. 120 min · **Prüfungsrelevanz:** ★★★ – Hypervisoren Typ 1/2, Serverauswahl, Netzteile und Energiekosten verstehen und berechnen.
> **Grundlagen aus AP1:** [[S5 Virtualisierung und Cloud]] · [[H4 Server, NAS und RAID]] · [[H5 Elektrotechnik, USV und Energie]]

## Lernziele
- [ ] Ich kann Servermodelle anhand einer Anforderung auswählen und die Wahl begründen.
- [ ] Ich kann ein Netzteil dimensionieren und Energiekosten vergleichen.
- [ ] Ich kann Hypervisor Typ 1 und Typ 2 erklären, mit Einsatzbeispiel und Produkt.
- [ ] Ich kann Virtualisierung und Containerisierung abgrenzen und Vor- und Nachteile nennen.
- [ ] Ich kann Cluster, Skalierung, Load Balancing und Blue-Green-Deployment erklären.

## So wird das geprüft
> [!info] Typische AP2-Aufgabentypen
> - **Hypervisor-Tabelle ausfüllen:** Typ 1 und Typ 2 jeweils erläutern, ein Einsatzbeispiel und ein Produkt nennen.
> - **Vor- und Nachteile der Virtualisierung** nennen und **Containerisierung** gegen VMs abgrenzen.
> - **Voraussetzungen für ein Cluster**: identische bzw. zertifizierte Hardware, gleicher Firmwarestand, gemeinsamer Speicher, identische Konfiguration.
> - **Server aus Angeboten auswählen**: Kerne, RAM, Speicher und 10-GbE-Schnittstellen der Aufgabe zuordnen und begründen.
> - **Rechnen:** Netzteil mit Reserve und Wirkungsgrad, Stromkosten alt/neu und Einsparung.
> - **Skalierung** horizontal/vertikal und **Blue-Green-Deployment**, **Load Balancing** mit Round Robin, Least Connections und IP-Hash.

---

## 1. Server auswählen

Ein Server wird nicht nach „mehr ist besser“ gekauft, sondern nach der **Rolle**. In der Prüfung stehen meist zwei bis drei Angebote nebeneinander; du ordnest sie den Rollen zu und **begründest mit den Werten aus der Tabelle**.

| Rolle | worauf es ankommt | typische Begründung |
|---|---|---|
| **Datenbankserver** | viele schnelle Kerne, viel RAM (Cache), schnelle SSD/NVMe, RAID 10 | „viel Arbeitsspeicher puffert Abfragen, NVMe senkt die Latenz“ |
| **Virtualisierungshost** | sehr viele Kerne, sehr viel RAM, viel Speicher, mehrere NICs | „mehrere VMs teilen sich Kerne und RAM; RAM ist meist der Engpass“ |
| **Fileserver/NAS** | viele Plattenschächte, Kapazität, RAID 6, 10 GbE | „große Datenmengen, parallele Zugriffe über das Netz“ |
| **Mailserver** | RAM, Kerne, Speicher, schnelle Netzanbindung, wachsender Bedarf | „10 GbE und skalierbarer Speicher für steigende Nutzerzahlen“ |
| **Firewall/Router** | Durchsatz, Anzahl Ports, Hardware-Krypto (AES-NI) | „VPN-Durchsatz hängt von der Hardwarebeschleunigung ab“ |

**Bauformen:** Tower (kleine Büros, leise), **Rack** (19 Zoll, Höheneinheiten 1 HE = 4,445 cm, zentral im Serverraum), **Blade** (viele Server in einem Chassis mit gemeinsamer Stromversorgung und Kühlung – hohe Dichte).

**Redundanz in der Hardware**: redundante Netzteile an getrennten Stromkreisen, ECC-RAM, RAID, mehrere Netzwerkkarten an verschiedenen Switches (NIC-Teaming), Hot-Swap-Laufwerke, zweite CPU, USV. Merke: Jede Maßnahme beseitigt einen **Single Point of Failure**.

### Netzteil dimensionieren
Rechenweg wie in der Prüfung:
1. Leistungsaufnahme aller Komponenten addieren.
2. **Reserve** aufschlagen (z. B. 20 %): Summe × 1,2.
3. **Wirkungsgrad** berücksichtigen: Ergebnis ÷ η (z. B. 0,9).
4. Auf die **nächste marktübliche Größe aufrunden** (z. B. 450 W).

> [!example] Beispiel
> CPU 180 W, Mainboard 40 W, RAM 32 W, SSDs 40 W, Lüfter 12 W → 304 W · × 1,2 = 364,8 W · ÷ 0,9 = **405,3 W** → Netzteil mit **450 W**.

### Energiekosten
**Arbeit (kWh) = Leistung (kW) × Zeit (h)** · 24/7-Betrieb = **8 760 h** pro Jahr · Kosten = kWh × Preis.
Bei einer Konsolidierung (viele alte Server → wenige Virtualisierungshosts) vergleichst du die Jahreskosten vorher und nachher; laufende Nebenkosten (Wartungsvertrag pro Monat × 12) kommen dazu.

> [!example] Beispiel Konsolidierung
> Vorher 6 Server × 350 W = 2,1 kW × 8 760 h = 18 396 kWh × 0,32 €/kWh = **5 886,72 €**. Nachher 2 Hosts × 600 W = 1,2 kW → 10 512 kWh → **3 363,84 €**. Einsparung **2 522,88 €** pro Jahr – zusätzlich weniger Kühlung und Stellfläche.

### USV auswählen
Die USV wird nach **Wirkleistung (W) und Scheinleistung (VA)** gewählt; beide Werte müssen reichen (S = P / cos φ). Typen und Überbrückungszeit: siehe [[FISI-4 Datensicherung, Archivierung und Notfallvorsorge#5. USV und Notstrom]] und [[H5 Elektrotechnik, USV und Energie]].

---

## 2. Virtualisierung

**Virtualisierung** bildet Hardware in Software nach: Auf einem physischen Host laufen mehrere **virtuelle Maschinen (VMs)** mit eigenem Betriebssystem. Der **Hypervisor** (Virtual Machine Monitor) verteilt CPU, RAM, Speicher und Netzwerk und isoliert die VMs voneinander.

### Hypervisor Typ 1 und Typ 2
| | **Typ 1 – nativ / Bare Metal** | **Typ 2 – gehostet (hosted)** |
|---|---|---|
| **Erläuterung** | läuft **direkt auf der Hardware**, ohne Host-Betriebssystem; direkter Zugriff auf die Ressourcen | läuft **als Anwendung auf einem installierten Betriebssystem** |
| **Einsatz** | Rechenzentrum, Serverbetrieb, produktive Dienste | Arbeitsplatz: Entwicklung, Tests, Schulung, alte Software |
| **Produkte** | VMware vSphere/ESXi, Microsoft Hyper-V, KVM, Proxmox VE, Xen | VMware Workstation, Oracle VirtualBox, Parallels, VMware Fusion |
| **Leistung** | sehr gut, kaum Overhead | schlechter (zusätzliche Schicht Host-OS) |

> [!tip] So bekommst du die volle Punktzahl
> Die Tabelle hat drei Zeilen: **Erläuterung**, **Einsatzbeispiel**, **Produkt**. Nenne je Typ ein **marktgängiges** Produkt (nicht „Docker“ – das ist kein Hypervisor).

### Vor- und Nachteile
| Vorteile | Nachteile |
|---|---|
| bessere **Auslastung** der Hardware, weniger Server, weniger Energie, Platz und Kühlung | leistungsfähige, oft **zertifizierte Hardware** nötig |
| **schnelle Bereitstellung** neuer Server (Vorlagen/Templates) | Host wird **Single Point of Failure** (ohne Cluster) |
| **Snapshots**, einfaches Backup/Restore ganzer VMs | Leistungseinbußen durch geteilte Ressourcen |
| **Isolation** von Anwendungen, Testumgebungen | höhere Komplexität, Lizenzkosten für Hypervisor und Management |
| alte Betriebssysteme weiter nutzbar, Hardwareunabhängigkeit | Risiko von Seitenkanalangriffen zwischen VMs |
| **Live-Migration** (vMotion) im Cluster ohne Ausfall | Überbuchung (Overcommitment) kann alle VMs ausbremsen |

### Wichtige Begriffe
- **Snapshot:** eingefrorener Zustand einer VM – Rückfallpunkt vor Updates, **kein Backup** (liegt auf demselben Speicher).
- **Template/Klon:** Vorlage für schnelle Bereitstellung.
- **Thin Provisioning:** virtuelle Platte belegt nur den tatsächlich genutzten Platz – spart Speicher, Gefahr der Überbuchung.
- **Live-Migration:** laufende VM wandert ohne Unterbrechung auf einen anderen Host (braucht gemeinsamen Speicher, z. B. SAN).
- **P2V:** physischen Server in eine VM überführen.
- **vSwitch:** virtueller Switch im Host; verbindet VMs untereinander und über die physischen NICs mit dem LAN, kann VLANs taggen.

---

## 3. Container

**Containerisierung** virtualisiert nicht die Maschine, sondern die **Anwendung**: Container teilen sich den **Kernel des Host-Betriebssystems** und enthalten nur die Anwendung mit ihren Bibliotheken und Abhängigkeiten.

| | virtuelle Maschine | Container |
|---|---|---|
| Isolationsebene | Hardware (eigenes Betriebssystem) | Betriebssystem (gemeinsamer Kernel) |
| Größe | Gigabyte | Megabyte |
| Start | Minuten | Sekunden |
| Portabilität | an Hypervisor-Format gebunden | läuft überall, wo die Container-Runtime läuft |
| Sicherheit | stärkere Isolation | schwächere Isolation (gemeinsamer Kernel) |
| Beispiele | Hyper-V, ESXi, KVM | Docker, Podman; Orchestrierung mit Kubernetes |

**Vorteile von Containern:** schnell, ressourcensparend, **„läuft bei mir = läuft überall“**, ideal für Microservices und CI/CD. **Nachteil:** Ein Linux-Container braucht einen Linux-Kernel; Kernel-Lücken betreffen alle Container.

**Begriffe:** *Image* (unveränderliche Vorlage), *Container* (laufende Instanz), *Registry* (Ablage für Images, z. B. Docker Hub), *Volume* (dauerhafte Daten außerhalb des Containers), *Orchestrierung* (Kubernetes verteilt, skaliert und startet Container neu).

---

## 4. Cluster, Skalierung und Lastverteilung

### Cluster
Ein **Cluster** verbindet mehrere Server (Knoten) zu einem System.
- **Hochverfügbarkeitscluster (HA):** fällt ein Knoten aus, übernimmt ein anderer (**Failover**). *Aktiv/Passiv* (Standby wartet) oder *Aktiv/Aktiv* (alle arbeiten, Last wird verteilt).
- **Lastverteilungscluster:** mehrere Knoten bearbeiten parallel Anfragen.

**Voraussetzungen**: identische bzw. zertifizierte Hardware, **gleicher Firmware- und Softwarestand**, identische Konfiguration, **gemeinsamer Speicher** (SAN/Shared Storage), redundantes Netzwerk mit Heartbeat, geeignetes Betriebssystem.

### Skalierung
| | **vertikal (scale up)** | **horizontal (scale out)** |
|---|---|---|
| Vorgehen | Ressourcen **in einem System** erhöhen: mehr RAM, CPU, Speicher | **weitere Systeme** hinzufügen, Last verteilen |
| Grenze | Obergrenze der Hardware | praktisch unbegrenzt |
| Ausfallzeit | oft Neustart/Einbau nötig | meist unterbrechungsfrei |
| typisch | Datenbankserver | Webserver-Farm, Cloud |

### Load Balancing
Ein **Load Balancer** verteilt Anfragen auf mehrere Server. **Vorteile:** höhere Verfügbarkeit (ausgefallener Server bekommt keine Anfragen), Skalierbarkeit, kürzere Antwortzeiten.

| Verfahren | Prinzip |
|---|---|
| **Round Robin** | der Reihe nach: Server 1, 2, 3, 1, 2, 3 … |
| **Weighted Round Robin** | stärkere Server bekommen mehr Anfragen |
| **Least Connections** | an den Server mit den **wenigsten aktiven Verbindungen** |
| **IP-Hash** | aus der **Client-IP** wird ein Hashwert gebildet → ein Client landet immer beim selben Server (Sitzung bleibt erhalten) |

### Blue-Green-Deployment
Zwei identische Umgebungen: **eine ist live (z. B. Green)**, auf der anderen (Blue) wird die **neue Version** installiert und getestet. Dann wird der Verkehr **unterbrechungsfrei umgeschaltet**. Die alte Umgebung bleibt als **Fallback** und wird später zur Staging-Umgebung für die nächste Version. Vorteil: kein Ausfall, sofortiger Rollback.

---

> [!warning] Typische Fehler in Prüfungen
> - Typ 1 und Typ 2 vertauschen – **Typ 1 = Bare Metal = Rechenzentrum**.
> - Docker als Hypervisor nennen.
> - Beim Netzteil den Wirkungsgrad **multiplizieren** statt dividieren, oder nicht auf eine marktübliche Größe aufrunden.
> - Snapshots als Backup verkaufen.
> - Vorteile nennen, ohne sie zu **begründen** („billiger“ allein bringt nur halbe Punkte – *warum* billiger?).

## Verwandte Themen
- [[FISI-2 Cloud und Betriebsmodelle]] – Virtualisierung ist die Basis jeder Cloud
- [[FISI-3 Speicher und RAID planen]] – Shared Storage für Cluster
- [[FISI-4 Datensicherung, Archivierung und Notfallvorsorge]] – USV, Verfügbarkeit
- [[S5 Virtualisierung und Cloud]] – Grundlagen aus AP1

## Zusammenfassung
- Serverauswahl immer an der **Rolle** begründen (DB: RAM/NVMe, Virtualisierung: Kerne/RAM, File: Kapazität/10 GbE).
- Netzteil: Summe × (1 + Reserve) ÷ Wirkungsgrad → aufrunden. Energie: kW × 8 760 h × €/kWh.
- **Typ 1** = Bare Metal (ESXi, Hyper-V, KVM) · **Typ 2** = gehostet (VirtualBox, Workstation).
- Container teilen den Kernel: klein, schnell, portabel – schwächere Isolation.
- Cluster: gleiche Hardware/Firmware, Shared Storage. Scale up vs. scale out. Load Balancing: Round Robin, Least Connections, IP-Hash. Blue-Green: umschalten ohne Ausfall.

## Direkt üben
```dataviewjs
await dv.view("AP2/99 System/views/trainer", { typen: ["netzteil", "stromkosten", "usv-dimension", "usv-akku"] })
```

## Selbstcheck
```dataviewjs
await dv.view("AP2/99 System/views/quiz", { modul: "FISI-1" })
```

**Weitere Aufgaben:** [[Aufgaben Konzeption und Administration#FISI-1 Server, Virtualisierung und Container]] · **Karteikarten:** [[Karten Konzeption und Administration]]

## Einschätzung
```dataviewjs
await dv.view("AP2/99 System/views/selbstcheck")
```

---
← [[Übersicht FISI Konzeption und Administration]] · Weiter: [[FISI-2 Cloud und Betriebsmodelle]] →
