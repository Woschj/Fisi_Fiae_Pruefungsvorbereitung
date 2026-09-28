---
tags: [ap2/probepruefung, ap2/fisi]
fachrichtung: FISI
---
# FISI · AP2-Probeprüfung 4

> [!info] Durchführung
> Bearbeiten Sie die Prüfungsteile jeweils innerhalb der angegebenen Zeit. Öffnen Sie die Lösungshinweise erst nach Abschluss des jeweiligen Prüfungsteils, bewerten Sie sich anhand der **Bewertungshinweise** und tragen Sie Ihre erreichten Punkte anschließend im Dashboard ein.

## Teil 1 – Konzeption und Administration von IT-Systemen

> [!abstract] Ausgangssituation
> Die **Domblick Versicherungsmakler GmbH** (Köln-Deutz, 90 Mitarbeitende, Außenstelle in Bonn) ersetzt ihre alten Einzelserver durch einen Virtualisierungscluster und führt ein digitales Dokumentenarchiv ein. Sie sind Auszubildende bzw. Auszubildender beim betreuenden IT-Dienstleister.

**90 Minuten · 4 Aufgaben à 25 Punkte · Hilfsmittel: nicht programmierbarer Taschenrechner**

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FISI Probeprüfung 4 – Systeme", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – Virtualisierungshost und Cluster (25 Punkte)
Ein Host des neuen Clusters ist wie folgt ausgestattet:

| Komponente | Anzahl | Leistung je Stück |
|---|---:|---:|
| CPU | 2 | 205 W |
| RAM-Modul | 24 | 6 W |
| NVMe-SSD | 6 | 12 W |
| Mainboard | 1 | 70 W |
| Netzwerkkarte (25 GbE) | 2 | 20 W |
| Lüfter (gesamt) | 1 | 50 W |

**a) (7 P)** Berechnen Sie die maximale Leistungsaufnahme des Hosts. Wählen Sie unter Berücksichtigung von 20 % Reserve ein Netzteil aus den Größen 800 W, 1.000 W, 1.200 W und 1.600 W und beschreiben Sie, wie die Stromversorgung ausfallsicher ausgelegt wird.

**b) (6 P)** Im Durchschnitt nimmt der Host 540 W auf und läuft rund um die Uhr. Berechnen Sie die jährlichen Stromkosten bei 0,32 € je kWh (365 Tage).

**c) (6 P)** Begründen Sie, welcher Hypervisor-Typ für den Cluster eingesetzt wird, und grenzen Sie ihn vom anderen Typ ab.

**d) (6 P)** Der Cluster besteht aus zwei Hosts mit gemeinsamem Speicher. Erklären Sie den Unterschied zwischen **Live-Migration** und **Hochverfügbarkeit (HA-Neustart)** und nennen Sie eine Voraussetzung, die für beide gilt.

> [!success]- Lösung Aufgabe 1
> **a)** 2 × 205 + 24 × 6 + 6 × 12 + 70 + 2 × 20 + 50 = 410 + 144 + 72 + 70 + 40 + 50 = **786 W**. Mit Reserve: 786 W × 1,2 = **943,2 W** → Netzteil **1.000 W**. Ausfallsicher: **zwei redundante Hot-Swap-Netzteile (1+1)**, von denen jedes allein die volle Last trägt, angeschlossen an zwei getrennte Stromkreise bzw. USV.
>
> **b)** 0,54 kW × 8.760 h = 4.730,4 kWh; 4.730,4 kWh × 0,32 €/kWh = **1.513,73 €** pro Jahr.
>
> **c)** **Typ 1 (Bare Metal)**, z. B. VMware ESXi, Hyper-V Server, Proxmox VE: läuft direkt auf der Hardware, geringer Overhead, hohe Stabilität und Sicherheit, Clusterfunktionen. Typ 2 (Hosted) läuft als Anwendung auf einem Wirtsbetriebssystem und eignet sich für Test- und Schulungsumgebungen.
>
> **d)** **Live-Migration:** Eine **laufende** VM wird geplant und ohne Unterbrechung auf den anderen Host verschoben (z. B. für Wartung). **HA:** Fällt ein Host **ungeplant** aus, werden seine VMs auf dem verbleibenden Host **neu gestartet** – mit kurzer Ausfallzeit, der Arbeitsspeicherinhalt geht verloren. Voraussetzung: **gemeinsamer Speicher** (SAN/NAS bzw. replizierter Speicher), gleiche Netzwerkkonfiguration (VLANs, virtuelle Switches), kompatible CPUs und genügend Reserve-Ressourcen auf dem anderen Host.
>
> **Bewertungshinweise:** a) Summe 3 P, Auswahl 2 P, Redundanz 2 P · b) Energie 3 P, Kosten 3 P · c) Typ mit Begründung 4 P, Abgrenzung 2 P · d) je Begriff 2 P, Voraussetzung 2 P.

### Aufgabe 2 – Dokumentenarchiv und Speicher (25 Punkte)
Die Maklerpost wird künftig eingescannt und revisionssicher archiviert. Täglich fallen **400 Dokumente** mit durchschnittlich **3 Seiten** an; eine gescannte Seite belegt **450 KiB**. Es wird an **250 Tagen** im Jahr gearbeitet, die Aufbewahrungsfrist beträgt **10 Jahre**.

**a) (8 P)** Berechnen Sie den Speicherbedarf für die gesamte Aufbewahrungsfrist in **TiB** (zwei Nachkommastellen).

**b) (8 P)** Für den Fileserver werden 16 TB Nettokapazität benötigt, es stehen Festplatten mit je 4 TB zur Verfügung. Berechnen Sie die Anzahl der Platten für **RAID 5** und **RAID 6**, jeweils zuzüglich einer Hot-Spare-Platte, und begründen Sie, welches Level Sie bei großen Festplatten empfehlen.

**c) (5 P)** Nennen Sie vier Anforderungen an eine **revisionssichere** Archivierung und ein technisches Mittel, um sie umzusetzen.

**d) (4 P)** Die Geschäftsführung meint, das Archiv mache die Datensicherung überflüssig. Nehmen Sie Stellung.

> [!success]- Lösung Aufgabe 2
> **a)** 400 × 3 × 450 KiB = 540.000 KiB pro Tag · × 250 = 135.000.000 KiB pro Jahr · × 10 = 1.350.000.000 KiB. 1 TiB = 2³⁰ KiB = 1.073.741.824 KiB → 1.350.000.000 / 1.073.741.824 = **1,26 TiB**.
>
> **b)** Nutzplatten: 16 TB / 4 TB = 4. **RAID 5:** 4 + 1 Parität + 1 Hot Spare = **6 Platten**. **RAID 6:** 4 + 2 Parität + 1 Hot Spare = **7 Platten**. Empfehlung **RAID 6**: Der Rebuild großer Platten dauert lange; fällt währenddessen eine zweite Platte aus oder tritt ein Lesefehler auf, gehen bei RAID 5 alle Daten verloren – RAID 6 verkraftet zwei Ausfälle.
>
> **c)** Vollständigkeit · Unveränderbarkeit · Nachvollziehbarkeit (Protokollierung) · Auffindbarkeit/Ordnung · Einhaltung der Aufbewahrungsfrist · Schutz vor Verlust (GoBD). Technisch: **WORM-Speicher** (Write Once Read Many, z. B. Object Lock, WORM-Band) bzw. ein zertifiziertes Archivsystem.
>
> **d)** Falsch. Das Archiv ist selbst ein Datenbestand, der durch Defekte, Brand oder Ransomware verloren gehen kann, und muss daher **zusätzlich gesichert** werden (z. B. Kopie an einem zweiten Standort). Außerdem enthält es nur abgeschlossene Dokumente, nicht die laufenden Daten der Produktivsysteme.
>
> **Bewertungshinweise:** a) Rechenweg 5 P, Umrechnung und Ergebnis 3 P · b) je RAID-Level 3 P, Begründung 2 P · c) je Anforderung 1 P (max. 4), technisches Mittel 1 P · d) Stellungnahme mit Begründung 4 P.

### Aufgabe 3 – Datenschutz, Geräte und Lizenzen (25 Punkte)
**a) (6 P)** Die 70 Beschäftigten im Innendienst greifen jeweils mit einem Desktop-PC und einem Diensthandy auf den Server zu. 20 Aushilfen teilen sich im Schichtbetrieb 6 PCs. Berechnen Sie die Anzahl der Client-Zugriffslizenzen (CAL), wenn nur **User-CALs**, nur **Device-CALs** oder die **günstigste Kombination** gekauft wird.

**b) (8 P)** Ein Mitarbeiter meldet am Dienstagmorgen, dass er am Montagabend einen **unverschlüsselten USB-Stick** mit Kundendaten (Namen, Anschriften, Vertragsnummern) in der Bahn verloren hat. Beschreiben Sie das weitere Vorgehen nach der DSGVO mit Fristen.

**c) (6 P)** Einige Beschäftigte möchten ihre privaten Smartphones dienstlich nutzen (BYOD). Nennen Sie drei Funktionen eines MDM-Systems, die dabei die Firmendaten schützen, und ein Problem, das bei BYOD entsteht.

**d) (5 P)** Ordnen Sie die Maßnahmen jeweils einer Kategorie der technisch-organisatorischen Maßnahmen zu: (1) Besucherbuch am Empfang, (2) Sperrbildschirm nach 5 Minuten, (3) Rollenkonzept im Maklerprogramm, (4) E-Mail-Verschlüsselung für Vertragsunterlagen, (5) Protokollierung von Änderungen an Kundendaten.

> [!success]- Lösung Aufgabe 3
> **a)** Nur User-CALs: 70 + 20 = **90**. Nur Device-CALs: 70 × 2 + 6 = **146**. Günstigste Kombination: **70 User-CALs** (Innendienst mit je zwei Geräten) + **6 Device-CALs** (geteilte PCs) = **76**.
>
> **b)** Datenpanne dokumentieren und die Datenschutzbeauftragte informieren · Risiko bewerten: unverschlüsselte Kundendaten → Risiko für die Betroffenen · **Meldung an die Aufsichtsbehörde** (in NRW: LDI NRW) **unverzüglich, möglichst innerhalb von 72 Stunden nach Bekanntwerden** (Dienstagmorgen), Art. 33 DSGVO · bei **voraussichtlich hohem Risiko** zusätzlich **Benachrichtigung der Betroffenen** (Art. 34) · Maßnahmen gegen Wiederholung: USB-Sticks nur verschlüsselt (z. B. BitLocker To Go), USB-Richtlinie per Gruppenrichtlinie/MDM.
>
> **c)** Container bzw. Arbeitsprofil zur Trennung von privaten und dienstlichen Daten · Erzwingen von Gerätesperre und Verschlüsselung · selektives Fernlöschen der Firmendaten · Verteilung und Sperre von Apps · Prüfung des Gerätezustands (Updates, kein Root/Jailbreak) vor dem Zugriff. Problem: Datenschutz der **privaten** Daten, Zugriff des Arbeitgebers muss begrenzt und geregelt sein (Mitbestimmung, Nutzungsvereinbarung); Support für viele Gerätetypen.
>
> **d)** (1) Zutrittskontrolle · (2) Zugangskontrolle · (3) Zugriffskontrolle · (4) Weitergabekontrolle · (5) Eingabekontrolle.
>
> **Bewertungshinweise:** a) je Variante 2 P · b) Risikobewertung 2 P, Meldung mit Frist 3 P, Betroffene 2 P, Maßnahme 1 P · c) je Funktion 1,5 P, Problem 1,5 P · d) je Zuordnung 1 P.

### Aufgabe 4 – Programmlogik (25 Punkte)
Kundennummern der Domblick GmbH enden mit einer Prüfziffer, die folgende Funktion berechnet (Arrays beginnen bei Index 0):

<pre>
FUNKTION pruefziffer(ziffern : Integer[]) : Integer
    summe ← 0
    FÜR i ← 0 BIS ziffern.laenge − 1
        WENN i MOD 2 = 0 DANN
            summe ← summe + ziffern[i] * 3
        SONST
            summe ← summe + ziffern[i]
        ENDE WENN
    ENDE FÜR
    RÜCKGABE (10 − summe MOD 10) MOD 10
ENDE FUNKTION
</pre>

**a) (10 P)** Führen Sie einen Schreibtischtest für `ziffern = [4, 0, 0, 7, 1, 2]` durch. Notieren Sie für jeden Durchlauf i, ziffern[i] und summe und geben Sie den Rückgabewert an.

**b) (4 P)** Erklären Sie, warum am Ende ein zweites Mal `MOD 10` gerechnet wird.

**c) (6 P)** Ein Kollege hat die Schleife als `FÜR i ← 1 BIS ziffern.laenge` geschrieben. Beschreiben Sie beide Fehler und ihre Auswirkungen und benennen Sie die jeweilige Fehlerart.

**d) (5 P)** Die Funktion soll in einem Skript regelmäßig für neue Kundennummern ausgeführt werden. Nennen Sie zwei Testfälle mit erwartetem Ergebnis, die besonders wichtig sind, und begründen Sie Ihre Wahl.

> [!success]- Lösung Aufgabe 4
> **a)**
>
> | i | ziffern[i] | i MOD 2 = 0 | summe |
> |---:|---:|---|---:|
> | 0 | 4 | ja (×3) | 12 |
> | 1 | 0 | nein | 12 |
> | 2 | 0 | ja (×3) | 12 |
> | 3 | 7 | nein | 19 |
> | 4 | 1 | ja (×3) | 22 |
> | 5 | 2 | nein | 24 |
>
> 24 MOD 10 = 4 → 10 − 4 = 6 → 6 MOD 10 = **6**.
>
> **b)** Ist `summe MOD 10 = 0`, ergäbe `10 − 0` den Wert **10** – eine Prüfziffer muss aber einstellig sein. Das zweite `MOD 10` macht daraus **0**.
>
> **c)** Start bei 1: Das **erste Element wird übersprungen** und die Gewichtung verschoben – falsche Prüfziffer (**Logikfehler**, semantischer Fehler). Ende bei `laenge`: Der letzte gültige Index ist `laenge − 1`; der Zugriff auf `ziffern[laenge]` liegt außerhalb des Arrays → **Laufzeitfehler** (Index außerhalb des gültigen Bereichs).
>
> **d)** z. B. das Beispiel aus a) mit bekanntem Ergebnis 6 (Normalfall) · eine Zahl, deren Summe durch 10 teilbar ist, z. B. `[5, 5]` → 5 × 3 + 5 = 20 → Ergebnis **0** (Grenzfall aus b) · eine leere Liste → Ergebnis 0 bzw. Fehlerbehandlung festlegen. Begründung: Normalfall und Grenzfälle decken typische Fehler auf.
>
> **Bewertungshinweise:** a) je richtige Zeile 1,5 P (max. 8 P), Rückgabewert 2 P · b) 4 P · c) je Fehler mit Auswirkung 2 P, Fehlerarten 2 P · d) je Testfall mit Begründung 2,5 P.

---

## Teil 2 – Analyse und Entwicklung von Netzwerken

> [!abstract] Ausgangssituation
> Die Domblick Versicherungsmakler GmbH strukturiert ihr Netz neu. Die Außenstelle in Bonn wird per Site-to-Site-VPN angebunden, die Beschäftigten im Außendienst erhalten einen VPN-Zugang mit zweitem Faktor.

**90 Minuten · 4 Aufgaben à 25 Punkte · Hilfsmittel: nicht programmierbarer Taschenrechner**

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FISI Probeprüfung 4 – Netzwerke", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – Adressplanung und Routing (25 Punkte)
Für das gesamte Unternehmen steht das Netz **172.18.64.0/21** zur Verfügung.

**a) (12 P)** Teilen Sie das Netz lückenlos und beginnend mit dem größten Bedarf auf. Geben Sie für jedes Teilnetz Präfix, Netzadresse und Broadcastadresse an.

| Teilnetz | benötigte Hosts |
|---|---:|
| Innendienst Köln | 500 |
| Außenstelle Bonn | 250 |
| Server | 100 |
| Gäste-WLAN | 60 |
| Management | 25 |
| VPN-Transfernetz | 2 |

**b) (4 P)** Wie viele Adressen des /21-Netzes bleiben nach dieser Aufteilung ungenutzt?

**c) (9 P)** Der Router in Köln hat folgende Schnittstellen: `eth0` im Netz Innendienst (erste Hostadresse), `eth1` im Servernetz (erste Hostadresse), `tun0` im VPN-Transfernetz (erste Hostadresse; der Router in Bonn hat die zweite) und `eth2` zum Provider mit 198.51.100.10/29, Gateway 198.51.100.9. Erstellen Sie die Routingtabelle des Kölner Routers (Ziel, Präfix, Gateway, Schnittstelle). Gäste- und Management-Netz bleiben unberücksichtigt.

> [!success]- Lösung Aufgabe 1
> **a)**
>
> | Teilnetz | Präfix (Hosts) | Netzadresse | Broadcast |
> |---|---|---|---|
> | Innendienst | /23 (510) | 172.18.64.0 | 172.18.65.255 |
> | Bonn | /24 (254) | 172.18.66.0 | 172.18.66.255 |
> | Server | /25 (126) | 172.18.67.0 | 172.18.67.127 |
> | Gäste-WLAN | /26 (62) | 172.18.67.128 | 172.18.67.191 |
> | Management | /27 (30) | 172.18.67.192 | 172.18.67.223 |
> | VPN-Transfer | /30 (2) | 172.18.67.224 | 172.18.67.227 |
>
> **b)** /21 = 2.048 Adressen; belegt 512 + 256 + 128 + 64 + 32 + 4 = 996 → **1.052 Adressen** frei (172.18.67.228 bis 172.18.71.255).
>
> **c)**
>
> | Ziel | Präfix | Gateway | Schnittstelle |
> |---|---|---|---|
> | 172.18.64.0 | /23 | direkt | eth0 |
> | 172.18.67.0 | /25 | direkt | eth1 |
> | 172.18.67.224 | /30 | direkt | tun0 |
> | 172.18.66.0 | /24 | 172.18.67.226 | tun0 |
> | 198.51.100.8 | /29 | direkt | eth2 |
> | 0.0.0.0 | /0 | 198.51.100.9 | eth2 |
>
> **Bewertungshinweise:** a) je Zeile 2 P · b) 4 P · c) je Zeile 1,5 P.

### Aufgabe 2 – Switching und VLAN (25 Punkte)
Es werden folgende VLANs eingerichtet: 10 Innendienst, 20 Gäste, 30 Voice, 99 Management.

**a) (6 P)** Geben Sie für jeden Switchport an, welche VLANs **untagged** und welche **tagged** zu konfigurieren sind: (1) Arbeitsplatz-PC, (2) IP-Telefon mit angeschlossenem PC, (3) Access Point mit den SSIDs „Domblick“ (VLAN 10) und „Gast“ (VLAN 20), der selbst im Management-VLAN verwaltet wird, (4) Uplink zum Router.

**b) (6 P)** Die Gäste erhalten keine IP-Adresse; ihre Geräte zeigen 169.254.x.x. Der DHCP-Server steht im Servernetz. Erklären Sie die Ursache und die Lösung.

**c) (7 P)** Zwei Etagenswitches werden zur Ausfallsicherheit mit zwei Kabeln verbunden. Erklären Sie, welches Problem ohne weitere Maßnahmen entsteht, und vergleichen Sie **Spanning Tree** und **Link Aggregation (LACP)** als Lösung.

**d) (6 P)** Nennen Sie drei Maßnahmen, mit denen die Switches selbst gegen Manipulation abgesichert werden.

> [!success]- Lösung Aufgabe 2
> **a)**
>
> | Port | untagged | tagged |
> |---|---|---|
> | (1) PC | 10 | – |
> | (2) Telefon + PC | 10 | 30 |
> | (3) Access Point | 99 | 10, 20 |
> | (4) Uplink Router | – | 10, 20, 30, 99 |
>
> **b)** DHCP-Discover ist ein **Broadcast**, der das VLAN nicht verlässt; der Router leitet ihn nicht weiter. Ohne Antwort vergeben sich die Clients eine **APIPA-Adresse**. Lösung: **DHCP-Relay** (IP-Helper) auf der Router-Schnittstelle des Gäste-VLANs einrichten und auf dem DHCP-Server einen Bereich für das Gäste-Netz anlegen.
>
> **c)** Ohne Maßnahme entsteht eine **Schleife**: Broadcasts kreisen endlos (Broadcast-Sturm), MAC-Tabellen werden instabil, das Netz fällt aus. **STP** blockiert eine der Verbindungen und aktiviert sie erst bei Ausfall – Redundanz, aber keine zusätzliche Bandbreite. **LACP** bündelt beide Leitungen zu einer logischen Verbindung – beide sind aktiv, mehr Bandbreite und Redundanz.
>
> **d)** Verwaltung nur aus dem Management-VLAN und nur per SSH/HTTPS · Standardpasswörter ändern, Konten mit AAA/RADIUS · nicht genutzte Ports deaktivieren · Native VLAN auf ein ungenutztes VLAN setzen (gegen VLAN-Hopping) · Port Security bzw. 802.1X · Firmware aktuell halten · Konfiguration sichern.
>
> **Bewertungshinweise:** a) je Port 1,5 P · b) Ursache 3 P, Lösung 3 P · c) Problem 2 P, STP 2,5 P, LACP 2,5 P · d) je Maßnahme 2 P.

### Aufgabe 3 – VPN, TLS und Zertifikate (25 Punkte)
**a) (6 P)** Nennen Sie die VPN-Art für die Anbindung der Außenstelle Bonn und für die Außendienstmitarbeitenden und beschreiben Sie den Unterschied zwischen **Full-Tunnel** und **Split-Tunnel** mit je einem Vor- oder Nachteil.

**b) (6 P)** Nennen Sie sechs Prüfungen, die ein Browser beim Aufruf des Kundenportals mit dem Serverzertifikat durchführt.

**c) (7 P)** Das Kundenportal nutzt TLS 1.3. Erklären Sie, warum TLS asymmetrische und symmetrische Verfahren kombiniert, welche Rolle das Diffie-Hellman-Verfahren spielt und was **Forward Secrecy** bedeutet.

**d) (6 P)** Für den VPN-Zugang wird ein zweiter Faktor eingeführt. Nennen Sie die drei Kategorien von Authentifizierungsfaktoren mit je einem Beispiel und begründen Sie, warum eine SMS als zweiter Faktor schwächer ist als eine Authenticator-App oder ein FIDO2-Token.

> [!success]- Lösung Aufgabe 3
> **a)** Bonn: **Site-to-Site-VPN** (z. B. IPsec zwischen den beiden Routern bzw. Firewalls). Außendienst: **End-to-Site** (Client-to-Site, Remote-Access-VPN). Full-Tunnel: gesamter Verkehr läuft über die Firmenfirewall – zentral gefiltert, aber mehr Last auf der Firmenanbindung. Split-Tunnel: nur der Verkehr ins Firmennetz läuft durch den Tunnel – entlastet die Leitung, der übrige Internetverkehr wird aber nicht von der Firmenfirewall geschützt.
>
> **b)** Signatur gültig und Kette bis zu einer vertrauenswürdigen Root-CA (Zwischenzertifikate vorhanden) · Gültigkeitszeitraum · Hostname passt zum Common Name bzw. Subject Alternative Name · nicht widerrufen (CRL/OCSP) · Verwendungszweck Serverauthentifizierung (Extended Key Usage) · zulässige Algorithmen und Schlüssellängen.
>
> **c)** Asymmetrische Verfahren lösen das **Schlüsselaustauschproblem** und ermöglichen die Authentifizierung über Zertifikate, sind aber langsam. Symmetrische Verfahren (z. B. AES-GCM) sind schnell und verschlüsseln die Nutzdaten. Mit **(EC)DHE** vereinbaren Client und Server einen gemeinsamen Sitzungsschlüssel, **ohne ihn zu übertragen**. Da für jede Sitzung neue, temporäre Schlüssel erzeugt werden, bleiben aufgezeichnete Sitzungen sicher, selbst wenn später der private Schlüssel des Servers bekannt wird (**Forward Secrecy**). TLS 1.3 erlaubt nur noch Verfahren mit Forward Secrecy.
>
> **d)** **Wissen** (Passwort, PIN) · **Besitz** (Smartphone mit Authenticator-App, FIDO2-Token, Smartcard) · **Inhärenz** (Fingerabdruck, Gesichtserkennung). SMS kann durch SIM-Swapping umgeleitet oder durch Phishing-Seiten abgefangen werden; FIDO2 ist an die echte Domain gebunden und damit phishing-resistent, TOTP-Codes entstehen lokal auf dem Gerät.
>
> **Bewertungshinweise:** a) VPN-Arten 2 P, Tunnelarten 4 P · b) je Prüfung 1 P · c) Kombination 3 P, DH 2 P, Forward Secrecy 2 P · d) Kategorien 3 P, Begründung 3 P.

### Aufgabe 4 – Leistung, Verfügbarkeit und Fehlersuche (25 Punkte)
Die Außenstelle Bonn hat einen Anschluss mit 50 Mbit/s Download und 10 Mbit/s Upload.

**a) (7 P)** Über das VPN sollen bis zu 15 Telefonate gleichzeitig geführt werden. Codec G.711 (64 kbit/s), Paketierung 20 ms. Overhead je Paket: RTP 12 Byte, UDP 8 Byte, IPv4 20 Byte, Ethernet 18 Byte (VPN-Overhead bleibt unberücksichtigt). Berechnen Sie die benötigte Bandbreite je Richtung und ihren Anteil am Upload in Prozent.

**b) (6 P)** Eine nächtliche Sicherung von **40 GiB** wird über den Upload aus Bonn nach Köln übertragen. Berechnen Sie die Übertragungsdauer in Stunden, Minuten und Sekunden (ohne Overhead).

**c) (6 P)** Die Verfügbarkeit der Anbindung beträgt in Köln 99,9 % und in Bonn 99,5 %. Das VPN funktioniert nur, wenn beide Anschlüsse verfügbar sind. Berechnen Sie die Gesamtverfügbarkeit in Prozent (zwei Nachkommastellen) und die zu erwartende Ausfallzeit pro Jahr in Stunden.

**d) (6 P)** Ein Client in Bonn erreicht den Fileserver mit `ping 172.18.67.20`, aber nicht mit `ping fileserver.domblick.local`. Nennen Sie die wahrscheinliche Fehlerursache, ein Werkzeug zur Prüfung und zwei mögliche Ursachen im Detail.

> [!success]- Lösung Aufgabe 4
> **a)** 1.000 ms / 20 ms = 50 Pakete/s; Nutzdaten 64.000 bit/s / 50 = 1.280 bit = 160 Byte; Paket 160 + 12 + 8 + 20 + 18 = 218 Byte; je Gespräch 218 × 8 × 50 = 87.200 bit/s = **87,2 kbit/s**; 15 Gespräche **1.308 kbit/s ≈ 1,31 Mbit/s** je Richtung. Anteil am Upload: 1,308 / 10 = **13,08 %**.
>
> **b)** 40 × 2³⁰ Byte × 8 = 343.597.383.680 bit; / 10.000.000 bit/s = 34.359,74 s = **9 h 32 min 40 s**.
>
> **c)** Reihenschaltung: 0,999 × 0,995 = 0,994005 → **99,40 %**. Ausfall: (1 − 0,994005) × 8.760 h = **52,52 h** pro Jahr.
>
> **d)** Die IP-Verbindung funktioniert, die **Namensauflösung (DNS)** nicht. Prüfung mit `nslookup fileserver.domblick.local` bzw. `Resolve-DnsName`, `ipconfig /all` (eingetragener DNS-Server). Mögliche Ursachen: Client in Bonn verwendet einen öffentlichen DNS-Server (z. B. vom Router per DHCP verteilt), der die interne Zone nicht kennt · interner DNS-Server über das VPN nicht erreichbar (Firewallregel für UDP/TCP 53 fehlt) · A-Record fehlt oder ist falsch · falsches DNS-Suffix.
>
> **Bewertungshinweise:** a) Paketgröße 3 P, Bandbreite 3 P, Anteil 1 P · b) Umrechnung 3 P, Ergebnis 3 P · c) Verfügbarkeit 3 P, Ausfallzeit 3 P · d) Ursache 2 P, Werkzeug 1 P, je Detailursache 1,5 P.

---

## Teil 3 – Wirtschafts- und Sozialkunde
**60 Minuten · 30 Aufgaben · Hilfsmittel: nicht programmierbarer Taschenrechner.** [[WiSo Probeprüfung 4|WiSo-Teil öffnen]]

Nachbereitung: [[AP2 FISI Fehlerlog]] · ← [[AP2 FISI Start]]
