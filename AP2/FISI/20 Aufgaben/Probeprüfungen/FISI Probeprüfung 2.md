---
tags: [ap2/probepruefung, ap2/fisi]
fachrichtung: FISI
---
# FISI · AP2-Probeprüfung 2

> [!info] Durchführung
> Bearbeiten Sie die Prüfungsteile jeweils innerhalb der angegebenen Zeit. Öffnen Sie die Lösungshinweise erst nach Abschluss des jeweiligen Prüfungsteils, bewerten Sie sich anhand der **Bewertungshinweise** und tragen Sie Ihre erreichten Punkte anschließend im Dashboard ein.

## Teil 1 – Konzeption und Administration von IT-Systemen

> [!abstract] Ausgangssituation
> Die **Hafenblick Logistik AG** (Köln-Niehl, 260 Mitarbeitende) konsolidiert virtualisierte Server für Warenwirtschaft und Dateidienste. Verfügbarkeit, Datenschutz und Wiederherstellbarkeit sind gefordert.

**90 Minuten · 4 Aufgaben à 25 Punkte · Hilfsmittel: nicht programmierbarer Taschenrechner**

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FISI Probeprüfung 2 – Systeme", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – Speicherredundanz (25 Punkte)
Für den Dateidienst sollen sechs Festplatten mit jeweils 4 TB eingesetzt werden.

**a) (8 P)** Berechnen Sie die nutzbare Kapazität eines RAID-6-Verbunds in TB und in TiB (zwei Nachkommastellen). Geben Sie außerdem an, wie viele Festplatten gleichzeitig ausfallen dürfen, ohne dass Daten verloren gehen.

**b) (10 P)** Vergleichen Sie den RAID-6-Verbund mit einem RAID-10-Verbund aus denselben sechs Festplatten hinsichtlich nutzbarer Kapazität, Ausfallsicherheit und Schreibleistung.

**c) (7 P)** Begründen Sie, warum ein RAID-Verbund keine Datensicherung ersetzt. Nennen Sie drei Schadensfälle, gegen die RAID nicht schützt.

> [!success]- Lösung Aufgabe 1
> **a)** (6 − 2) × 4 TB = **16 TB** = 16 × 10¹² B / 2⁴⁰ = **14,55 TiB** (vor Formatierungsverlusten); **zwei beliebige** Platten dürfen ausfallen.
>
> **b)** RAID 10: drei Spiegelpaare → 3 × 4 TB = **12 TB** nutzbar; garantiert **ein** Ausfall, bis zu drei, wenn jeweils verschiedene Spiegelpaare betroffen sind. RAID 6: **16 TB**, garantiert **zwei** Ausfälle. Schreibleistung: RAID 10 deutlich besser, weil keine Paritätsberechnung (RAID 6: doppelte Parität, Write Penalty 6).
>
> **c)** RAID schützt nur vor dem Ausfall von Datenträgern. Jede Änderung wird sofort auf alle Platten geschrieben: versehentliches Löschen · Ransomware-Verschlüsselung · Softwarefehler/Dateisystemfehler · Brand, Diebstahl, Überspannung (alle Platten im selben Gerät) · Ausfall des RAID-Controllers.
>
> **Bewertungshinweise:** a) TB 3 P, TiB 3 P, Ausfälle 2 P · b) je Kriterium mit beiden RAID-Leveln 3–4 P · c) Begründung 4 P, je Schadensfall 1 P.

### Aufgabe 2 – Sicherung und Wiederanlauf (25 Punkte)
Der Warenwirtschaftsserver enthält 2,4 TB Produktivdaten. Für die Kapazitätsplanung wird angenommen, dass sich pro Tag 3 % des ursprünglichen Datenbestands ändern (jeden Tag andere Daten). Geplant sind eine Vollsicherung am Sonntag und fünf tägliche Sicherungen von Montag bis Freitag. Für das Sicherungsziel sollen zusätzlich 30 % Reserve vorgesehen werden.

**a) (5 P)** Berechnen Sie den benötigten Speicherplatz für die Vollsicherung und fünf **inkrementelle** Sicherungen, zunächst ohne Reserve.

**b) (7 P)** Berechnen Sie den Speicherplatz für die Vollsicherung und fünf **differenzielle** Sicherungen ohne Reserve. Berechnen Sie für beide Varianten den einzuplanenden Speicherplatz einschließlich Reserve.

**c) (5 P)** Stellen Sie je einen Vor- und Nachteil der inkrementellen gegenüber der differenziellen Sicherung dar.

**d) (8 P)** Beschreiben Sie einen Wiederherstellungstest, mit dem überprüft werden kann, ob die festgelegten RTO- und RPO-Ziele eingehalten werden.

> [!success]- Lösung Aufgabe 2
> Tägliche Änderung: 0,03 × 2,4 TB = 0,072 TB.
>
> **a)** 2,4 + 5 × 0,072 = **2,76 TB**
>
> **b)** Differenziell: 0,072 × (1 + 2 + 3 + 4 + 5) = 1,08 TB → 2,4 + 1,08 = **3,48 TB**. Mit Reserve: inkrementell 2,76 × 1,3 = **3,588 TB**, differenziell 3,48 × 1,3 = **4,524 TB**.
>
> **c)** Inkrementell: Vorteil – geringster Speicherbedarf und kürzeste Sicherungsdauer; Nachteil – Wiederherstellung braucht Vollsicherung **und alle** Inkremente, dauert länger und ist fehleranfälliger (ein defektes Inkrement unterbricht die Kette).
>
> **d)** Isolierte Testumgebung vorbereiten · Zeitpunkt des simulierten Ausfalls festhalten · Vollsicherung und Inkremente zurückspielen · Datenbankkonsistenz und Anwendungsstart prüfen, Stichproben mit Fachabteilung · **RTO**: benötigte Zeit bis zur Nutzbarkeit messen und mit Vorgabe vergleichen · **RPO**: Zeitstempel des letzten wiederhergestellten Datensatzes mit dem Ausfallzeitpunkt vergleichen · Ergebnis und Abweichungen dokumentieren, Maßnahmen ableiten.
>
> **Bewertungshinweise:** a) Rechenweg 3 P, Ergebnis 2 P · b) differenziell 3 P, beide Reserven je 2 P · c) Vorteil 2,5 P, Nachteil 2,5 P · d) Ablauf 4 P, Messung RTO 2 P, Messung RPO 2 P.

### Aufgabe 3 – Schutzmaßnahmen (25 Punkte)
**a) (8 P)** Erläutern Sie das Prinzip „Least Privilege“ und nennen Sie zwei geeignete Schutzmaßnahmen für Administrationskonten.

**b) (9 P)** Ordnen Sie den Schutzzielen Vertraulichkeit, Integrität und Verfügbarkeit jeweils eine geeignete technische Maßnahme für den Warenwirtschaftsserver zu und erläutern Sie die Wirkung.

**c) (8 P)** Ein Notebook mit gespeicherten Personaldaten ist verloren gegangen. Die Festplatte war mit BitLocker verschlüsselt. Beschreiben Sie vier unmittelbar einzuleitende Maßnahmen und beurteilen Sie, ob eine Meldung an die Aufsichtsbehörde nach Art. 33 DSGVO erforderlich ist.

> [!success]- Lösung Aufgabe 3
> **a)** Jedes Konto erhält nur die Rechte, die es für seine Aufgabe braucht, und nur so lange wie nötig – ein kompromittiertes Konto richtet so weniger Schaden an. Maßnahmen: getrennte Admin-Konten ohne E-Mail/Internet · MFA · Just-in-Time-Rechte (zeitlich begrenzt) · Privileged Access Workstations · Protokollierung und Überprüfung der Admin-Anmeldungen.
>
> **b)** Vertraulichkeit: Verschlüsselung der Datenbank und rollenbasierte Rechte – Unbefugte können Daten nicht lesen. Integrität: Protokollierung/Audit-Trail oder Prüfsummen – unbefugte Änderungen werden erkannt. Verfügbarkeit: Cluster mit Failover und getestete Backups – der Dienst läuft bei Ausfall weiter bzw. ist schnell wiederhergestellt.
>
> **c)** Verlust dokumentieren und an IT-Sicherheit/Datenschutzbeauftragten melden · Gerät über MDM sperren bzw. Fernlöschung auslösen · Konten, Zertifikate, VPN-Zugänge und gespeicherte Tokens des Geräts widerrufen, Passwörter ändern · prüfen, ob der BitLocker-Wiederherstellungsschlüssel sicher verwahrt und nicht beim Gerät war. Beurteilung: Die Meldepflicht besteht, **außer** die Verletzung führt voraussichtlich nicht zu einem Risiko. Bei starker, dem Stand der Technik entsprechender Verschlüsselung und nicht kompromittiertem Schlüssel ist das Risiko gering → Meldung in der Regel **nicht** erforderlich, die Entscheidung ist aber zu **dokumentieren** (Art. 33 Abs. 5).
>
> **Bewertungshinweise:** a) Erläuterung 4 P, je Maßnahme 2 P · b) je Schutzziel 3 P · c) je Maßnahme 1,5 P, Beurteilung mit Begründung 2 P.

### Aufgabe 4 – Skript und Fehlersuche (25 Punkte)
<pre>
werte ← [4, 9, 12, 3, 8]
min ← werte[0]
FÜR i ← 1 BIS länge(werte) - 1
    WENN werte[i] < min DANN
        min ← werte[i]
    ENDE WENN
ENDE FÜR
ausgabe(min)
</pre>
**a) (7 P)** Erstellen Sie eine Trace-Tabelle für den dargestellten Algorithmus und geben Sie den ausgegebenen Wert an.

**b) (4 P)** Beschreiben Sie, wie der Algorithmus angepasst werden muss, damit auch eine leere Liste sicher verarbeitet wird.

**c) (8 P)** Das folgende Bash-Skript soll eine Warnung ins Syslog schreiben, wenn die Belegung von `/srv/daten` über 90 % liegt. Es enthält zwei Fehler. Nennen und korrigieren Sie diese.

```bash
#!/bin/bash
belegung=$(df --output=pcent /srv/daten | tail -1 | tr -dc '0-9')
if [ $belegung > 90 ]; then
    logger -p user.warning "Speicher /srv/daten zu $belegung % belegt"
fi
exit 1
```

**d) (6 P)** Ein Dateidienst meldet, dass kein Speicherplatz mehr verfügbar ist, während das Monitoring freien Speicherplatz anzeigt. Nennen Sie drei Prüfschritte zur Eingrenzung der Ursache.

> [!success]- Lösung Aufgabe 4
> **a)**
>
> | i | werte[i] | werte[i] < min? | min |
> |---:|---:|---|---:|
> | Start | – | – | 4 |
> | 1 | 9 | nein | 4 |
> | 2 | 12 | nein | 4 |
> | 3 | 3 | ja | 3 |
> | 4 | 8 | nein | 3 |
>
> Ausgabe: **3**.
>
> **b)** Vor dem Zugriff auf `werte[0]` prüfen, ob `länge(werte) = 0` ist; dann einen definierten Rückgabewert oder eine Fehlermeldung liefern und abbrechen.
>
> **c)** Fehler 1: `>` ist in `[ ]` eine **Umleitung** in eine Datei „90“, kein Zahlenvergleich → `if [ "$belegung" -gt 90 ]; then`. Fehler 2: `exit 1` meldet immer einen Fehler, auch im Normalfall → `exit 0`.
>
> **d)** Inodes prüfen (`df -i`) – viele kleine Dateien · Quotas des Benutzers/der Freigabe prüfen · gelöschte, aber noch geöffnete Dateien suchen (`lsof +L1`) · prüfen, ob das Monitoring denselben Mountpoint überwacht bzw. für root reservierte Blöcke berücksichtigt.
>
> **Bewertungshinweise:** a) Tabelle 5 P, Ausgabe 2 P · b) 4 P · c) je Fehler erkannt 2 P, je Korrektur 2 P · d) je Prüfschritt 2 P.

---

## Teil 2 – Analyse und Entwicklung von Netzwerken

> [!abstract] Ausgangssituation
> Die Hafenblick Logistik AG bindet zwei Lager per VPN an. Büro, Scanner, Server und Gäste erhalten getrennte Netze.

**90 Minuten · 4 Aufgaben à 25 Punkte · Hilfsmittel: nicht programmierbarer Taschenrechner**

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FISI Probeprüfung 2 – Netzwerke", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – Subnetze (25 Punkte)
Für den neuen Lagerstandort ist der Adressbereich 192.168.40.0/24 vorgesehen. Benötigt werden 90 Hostadressen für das Büro, 40 für die Scanner und 20 für die Netzwerkverwaltung. Die Teilnetze sollen nach Größe absteigend ab 192.168.40.0 lückenlos vergeben werden.

**a) (12 P)** Erstellen Sie einen VLSM-Adressplan. Geben Sie für jedes Teilnetz Netzadresse, Präfix und Broadcastadresse an.

**b) (3 P)** Nennen Sie für jedes Teilnetz eine gültige Gateway-Adresse (jeweils die erste nutzbare Adresse).

**c) (4 P)** Geben Sie den nicht verwendeten Adressbereich in CIDR-Schreibweise an.

**d) (6 P)** Die Netzwerkverwaltung soll im nächsten Jahr um 25 Geräte wachsen. Prüfen Sie, ob das bisherige Teilnetz ausreicht, und schlagen Sie eine Anpassung des Adressplans vor, ohne die anderen Teilnetze zu ändern.

> [!success]- Lösung Aufgabe 1
> **a)** Büro **192.168.40.0/25**, Broadcast 192.168.40.127 · Scanner **192.168.40.128/26**, Broadcast 192.168.40.191 · Verwaltung **192.168.40.192/27**, Broadcast 192.168.40.223.
>
> **b)** 192.168.40.1 · 192.168.40.129 · 192.168.40.193
>
> **c)** **192.168.40.224/27** (192.168.40.224–192.168.40.255)
>
> **d)** Künftig 20 + 25 = 45 Hosts > 30 nutzbare Adressen eines /27 → **reicht nicht**. Da der anschließende Block .224/27 frei ist, kann die Verwaltung auf **192.168.40.192/26** (62 Hosts, Broadcast .255) erweitert werden; Gateway bleibt .193, nur die Maske ändert sich.
>
> **Bewertungshinweise:** a) je Teilnetz 4 P · b) je Gateway 1 P · c) 4 P · d) Prüfung 2 P, Vorschlag mit Präfix und Begründung 4 P.

### Aufgabe 2 – Routing und VPN (25 Punkte)
**a) (6 P)** Erläutern Sie den Unterschied zwischen statischem und dynamischem Routing und nennen Sie je einen Einsatzfall.

**b) (5 P)** Der Router der Zentrale hat folgende Einträge. Geben Sie an, über welchen Eintrag ein Paket an 10.20.5.17 weitergeleitet wird, und begründen Sie Ihre Antwort.

| Ziel | Next Hop |
|---|---|
| 10.20.0.0/16 | 172.16.0.2 (VPN Lager Nord) |
| 10.20.4.0/22 | 172.16.0.6 (VPN Lager Süd) |
| 0.0.0.0/0 | 203.0.113.1 (Internet) |

**c) (7 P)** Beschreiben Sie, wie ein Site-to-Site-VPN mit IPsec die Vertraulichkeit und Integrität der übertragenen Daten schützt.

**d) (7 P)** Der VPN-Tunnel ist aufgebaut, das entfernte Netz ist jedoch nicht erreichbar. Nennen Sie vier Prüfpunkte zur systematischen Fehlersuche.

> [!success]- Lösung Aufgabe 2
> **a)** Statisch: manuell gepflegt, keine Anpassung bei Ausfällen – z. B. kleine Außenstelle mit einer Default-Route. Dynamisch (OSPF, BGP): Router tauschen Routen aus und berechnen bei Änderungen neue Wege – z. B. Netz mit mehreren redundanten Verbindungen.
>
> **b)** 10.20.5.17 liegt in 10.20.0.0/16 **und** in 10.20.4.0/22 (10.20.4.0–10.20.7.255). Es gilt der **längste Präfix** (Longest Prefix Match) → **10.20.4.0/22 über 172.16.0.6 (Lager Süd)**.
>
> **c)** IKE: Die Gateways authentisieren sich (PSK oder Zertifikat) und handeln Schlüssel aus (Diffie-Hellman). ESP verschlüsselt die Nutzdaten (z. B. AES) → Vertraulichkeit, und sichert sie mit einem HMAC bzw. AEAD-Verfahren → Integrität und Authentizität; Sequenznummern verhindern Replay.
>
> **d)** Routen auf beiden Seiten (Hin- und Rückweg) · lokale/entfernte Netze in der Tunneldefinition (Traffic Selectors) identisch · Firewallregeln für den Tunnelverkehr · NAT-Ausnahme für VPN-Verkehr · Paketmitschnitt bzw. Zähler der Security Associations.
>
> **Bewertungshinweise:** a) Unterschied 4 P, Einsatzfälle je 1 P · b) Eintrag 2 P, Begründung 3 P · c) Authentisierung/Schlüsselaustausch 3 P, Verschlüsselung 2 P, Integrität 2 P · d) je Prüfpunkt 1,75 P.

### Aufgabe 3 – WLAN (25 Punkte)
**a) (8 P)** Nennen Sie vier Maßnahmen, mit denen das Unternehmens-WLAN gegen unberechtigte Zugriffe geschützt werden kann.

**b) (9 P)** Erläutern Sie das Zusammenspiel von Supplicant, Authenticator und Authentication Server bei 802.1X im WLAN.

**c) (8 P)** Ein Access Point ist mit dem Netzwerk verbunden, WLAN-Clients erhalten jedoch keine IP-Adresse. Nennen Sie vier Prüfpunkte zur Eingrenzung der Ursache.

> [!success]- Lösung Aufgabe 3
> **a)** WPA3-Enterprise (bzw. WPA2-Enterprise) mit 802.1X für Firmengeräte · getrennte Gäste-SSID in eigenem VLAN mit reinem Internetzugang · Client-Isolation im Gästenetz · aktuelle Firmware und zentrales Management · Erkennung fremder Access Points (Rogue-AP-Detection) · Management-Zugang nur aus dem Verwaltungsnetz.
>
> **b)** **Supplicant** (Client) meldet sich mit Zertifikat oder Benutzerdaten an. **Authenticator** (Access Point bzw. Controller) lässt bis zur Freigabe nur EAP-Verkehr zu und leitet ihn an den **Authentication Server** (RADIUS) weiter. Der RADIUS-Server prüft die Identität, z. B. gegen das Active Directory, und sendet Access-Accept (ggf. mit VLAN-Zuweisung) oder Access-Reject; bei Accept gibt der AP den Zugang frei und die Schlüssel werden abgeleitet.
>
> **c)** SSID-zu-VLAN-Zuordnung am AP · Switchport als Trunk mit den erlaubten VLANs · DHCP-Pool vorhanden und nicht erschöpft · DHCP-Relay (IP-Helper) am Router für das VLAN · Firewall lässt DHCP (UDP 67/68) durch.
>
> **Bewertungshinweise:** a) je Maßnahme 2 P · b) je Rolle 2 P, Ablauf/Ergebnis 3 P · c) je Prüfpunkt 2 P.

### Aufgabe 4 – DNS und Mitschnitt (25 Punkte)
**a) (6 P)** Erläutern Sie die Funktion von A-, AAAA- und PTR-Einträgen im DNS.

**b) (4 P)** Geben Sie den vollständigen Namen des PTR-Eintrags für die Adresse 192.168.40.25 an.

**c) (8 P)** Ein interner Client erhält für einen Servernamen eine falsche IP-Adresse, während die externe Namensauflösung korrekt ist. Nennen Sie zwei mögliche Ursachen und beschreiben Sie geeignete Prüfschritte.

**d) (7 P)** Nennen Sie sensible Informationen, die ein Netzwerkmitschnitt enthalten kann, und beschreiben Sie Maßnahmen zum Schutz des Mitschnitts.

> [!success]- Lösung Aufgabe 4
> **a)** **A**: Name → IPv4-Adresse · **AAAA**: Name → IPv6-Adresse · **PTR**: IP-Adresse → Name (Reverse Lookup, z. B. für Mailserver-Prüfungen und Protokolle).
>
> **b)** **25.40.168.192.in-addr.arpa.**
>
> **c)** Veralteter Eintrag im DNS-Cache des Clients oder des internen Resolvers – Cache leeren (`ipconfig /flushdns`), TTL prüfen · falscher Eintrag in der internen Zone (Split-DNS) – internen und externen DNS-Server gezielt mit `nslookup name server` abfragen und vergleichen · Eintrag in der lokalen hosts-Datei prüfen.
>
> **d)** Unverschlüsselte Zugangsdaten und Inhalte, personenbezogene Daten, interne Adressen, Namen und Kommunikationsbeziehungen. Schutz: nur mit Auftrag und zweckgebunden mitschneiden, Filter setzen, Dauer begrenzen, Datei verschlüsselt ablegen, Zugriff beschränken, nach Abschluss sicher löschen; Betriebsrat/Datenschutz einbinden.
>
> **Bewertungshinweise:** a) je Eintrag 2 P · b) 4 P (umgekehrte Reihenfolge 2 P, Domäne in-addr.arpa 2 P) · c) je Ursache mit Prüfschritt 4 P · d) Informationen 3 P, Schutzmaßnahmen 4 P.

---

## Teil 3 – Wirtschafts- und Sozialkunde
**60 Minuten · 30 Aufgaben · Hilfsmittel: nicht programmierbarer Taschenrechner.** [[WiSo Probeprüfung 2|WiSo-Teil öffnen]]

Nachbereitung: [[AP2 FISI Fehlerlog]] · ← [[AP2 FISI Start]]
