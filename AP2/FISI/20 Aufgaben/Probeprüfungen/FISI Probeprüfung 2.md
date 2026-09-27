---
tags: [ap2/probepruefung, ap2/fisi]
fachrichtung: FISI
---
# FISI · AP2-Probeprüfung 2

> [!info] Durchführung
> Bearbeiten Sie die Prüfungsteile jeweils innerhalb der angegebenen Zeit. Öffnen Sie die Musterlösungen erst nach Abschluss des jeweiligen Prüfungsteils und tragen Sie Ihre erreichten Punkte anschließend im Dashboard ein.

## Teil 1 – Konzeption und Administration (90 Minuten)

> [!abstract] Szenario
> Die Hafenblick Logistik AG konsolidiert virtualisierte Server für Warenwirtschaft und Dateidienste. Verfügbarkeit, Datenschutz und Wiederherstellbarkeit sind gefordert.

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FISI Probeprüfung 2 – Systeme", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – Speicherredundanz (25 P)
Für den Dateidienst sollen sechs Festplatten mit jeweils 4 TB eingesetzt werden.

**a) (10 P)** Berechnen Sie die nutzbare Kapazität eines RAID-6-Verbunds. Geben Sie außerdem an, wie viele Festplatten gleichzeitig ausfallen dürfen, ohne dass Daten verloren gehen.

**b) (8 P)** Vergleichen Sie den RAID-6-Verbund mit einem RAID-10-Verbund aus denselben sechs Festplatten hinsichtlich nutzbarer Kapazität und Ausfallsicherheit.

**c) (7 P)** Begründen Sie, warum ein RAID-Verbund keine Datensicherung ersetzt.

> [!success]- Lösung Aufgabe 1
> **a)** (6−2)×4 = **16 TB** vor Formatierungsverlusten; beliebige zwei Platten dürfen ausfallen.  
> **b)** RAID 10: drei Spiegelpaare, etwa 12 TB nutzbar; Ausfalltoleranz hängt davon ab, ob Ausfälle dieselben Spiegel betreffen. RAID 6: etwa 16 TB und sicher zwei Ausfälle. RAID 10 bietet meist bessere Schreibleistung.  
> **c)** RAID schützt nicht vor Löschen, Ransomware, Standortverlust oder fehlerhaften Änderungen; diese werden mitgespiegelt.

### Aufgabe 2 – Sicherung und Wiederanlauf (25 P)
Der Warenwirtschaftsserver enthält 2,4 TB Produktivdaten. Für die Kapazitätsplanung wird angenommen, dass sich pro Tag drei Prozent des ursprünglichen Datenbestands ändern. Geplant sind eine Vollsicherung und fünf tägliche inkrementelle Sicherungen. Für das Sicherungsziel sollen zusätzlich 30 % Reserve vorgesehen werden.

**a) (8 P)** Berechnen Sie den benötigten Speicherplatz für die Vollsicherung und die fünf Inkremente, zunächst ohne Reserve.

**b) (7 P)** Berechnen Sie den insgesamt einzuplanenden Speicherplatz einschließlich der Reserve.

**c) (10 P)** Beschreiben Sie einen Wiederherstellungstest, mit dem überprüft werden kann, ob die festgelegten RTO- und RPO-Ziele eingehalten werden.

> [!success]- Lösung Aufgabe 2
> **a)** 2,4 + 5×0,03×2,4 = **2,76 TB**. **b)** 2,76×1,30 = **3,588 TB**, rund 3,6 TB, ohne Metadaten/weitere Versionen.  
> **c)** Isolierte Testumgebung wählen, Vollsicherung und Inkremente zurückspielen, Datenintegrität und Anwendungsstart prüfen, Dauer (RTO) und Zeitstempel letzter Daten (RPO) messen, Ergebnis dokumentieren.

### Aufgabe 3 – Schutzmaßnahmen (25 P)
**a) (8 P)** Erläutern Sie das Prinzip „Least Privilege“ und nennen Sie zwei geeignete Schutzmaßnahmen für Administrationskonten.  
**b) (9 P)** Ordnen Sie den Schutzzielen Vertraulichkeit, Integrität und Verfügbarkeit jeweils eine geeignete technische oder organisatorische Maßnahme zu.  
**c) (8 P)** Ein Notebook mit gespeicherten Personaldaten ist verloren gegangen. Beschreiben Sie vier unmittelbar einzuleitende Maßnahmen.

> [!success]- Lösung Aufgabe 3
> **a)** Nur nötige Rechte vergeben; getrennte Admin-Konten, MFA, zeitlich begrenzte Rechte und Protokollierung einsetzen.  
> **b)** Vertraulichkeit: Verschlüsselung/Rechte; Integrität: Änderungsprotokoll/Signatur; Verfügbarkeit: getestete Backups/Redundanz.  
> **c)** Verlust melden; Gerät über MDM sperren/orten/löschen; Tokens und Konten widerrufen; zuständige Datenschutz- und Sicherheitsverantwortliche einbeziehen, Vorfall dokumentieren und Meldepflicht prüfen.

### Aufgabe 4 – Skript und Fehlersuche (25 P)
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
**a) (10 P)** Erstellen Sie eine Trace-Tabelle für den dargestellten Algorithmus und geben Sie den ausgegebenen Wert an.

**b) (7 P)** Beschreiben Sie, wie der Algorithmus angepasst werden muss, damit auch eine leere Liste sicher verarbeitet wird.

**c) (8 P)** Ein Dateidienst meldet, dass kein Speicherplatz mehr verfügbar ist, während das Monitoring freien Speicherplatz anzeigt. Nennen Sie vier Prüfschritte zur Eingrenzung der Ursache.

> [!success]- Lösung Aufgabe 4
> **a)**
>
> | Index | Wert | min nach dem Vergleich |
> |---:|---:|---:|
> | Start | – | 4 |
> | 1 | 9 | 4 |
> | 2 | 12 | 4 |
> | 3 | 3 | 3 |
> | 4 | 8 | 3 |
>
> Der Algorithmus gibt **3** aus. **b)** Vor dem Zugriff auf `werte[0]` ist zu prüfen, ob die Liste leer ist; in diesem Fall muss ein definierter Fehler oder Rückgabewert geliefert werden.  
> **c)** Mountpoint und Dateisystem prüfen; freien Platz und Inodes prüfen; Quotas/reservierte Blöcke kontrollieren; gelöschte, noch geöffnete Dateien suchen; Monitoring-Zuordnung/Zeitpunkt vergleichen.

## Teil 2 – Analyse und Entwicklung von Netzwerken (90 Minuten)

> [!abstract] Szenario
> Die Hafenblick Logistik AG bindet zwei Lager per VPN an. Büro, Scanner, Server und Gäste erhalten getrennte Netze.

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FISI Probeprüfung 2 – Netzwerke", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – Subnetze (25 P)
Für das Büro, die Scanner und die Netzwerkverwaltung des neuen Lagerstandorts ist der Adressbereich 192.168.40.0/24 vorgesehen. Benötigt werden 90 Hostadressen für das Büro, 40 für die Scanner und 20 für die Netzwerkverwaltung.

**a) (15 P)** Erstellen Sie einen VLSM-Adressplan. Geben Sie für jedes Teilnetz Netzadresse, Präfix und Broadcastadresse an.

**b) (5 P)** Nennen Sie für jedes Teilnetz eine gültige Gateway-Adresse.

**c) (5 P)** Geben Sie den nicht verwendeten Adressbereich an.

> [!success]- Lösung Aufgabe 1
> Office **192.168.40.0/25**, Broadcast .127; Scanner **192.168.40.128/26**, Broadcast .191; Management **192.168.40.192/27**, Broadcast .223. Gateways z. B. .1, .129 und .193. Der /27-Block .224–.255 bleibt frei.

### Aufgabe 2 – Routing und VPN (25 P)
**a) (8 P)** Erläutern Sie den Unterschied zwischen statischem und dynamischem Routing.

**b) (9 P)** Beschreiben Sie, wie ein Site-to-Site-VPN die Vertraulichkeit und Integrität der übertragenen Daten schützt.

**c) (8 P)** Der VPN-Tunnel ist aufgebaut, das entfernte Netz ist jedoch nicht erreichbar. Nennen Sie vier Prüfpunkte zur systematischen Fehlersuche.

> [!success]- Lösung Aufgabe 2
> Statische Routen werden manuell gepflegt; dynamische Protokolle tauschen Routen aus und passen sich an Änderungen an. VPN-Endpunkte authentisieren sich, handeln Schlüssel aus und schützen Nutzdaten mit Verschlüsselung plus Integritätsschutz. Prüfen: Hin- und Rückroute, lokale/entfernte Netze (Selectoren), Firewall/ACL und NAT-Ausnahmen, Tunnelstatus und Mitschnitt.

### Aufgabe 3 – WLAN (25 P)
**a) (8 P)** Nennen Sie vier Maßnahmen, mit denen das Unternehmens-WLAN gegen unberechtigte Zugriffe geschützt werden kann.

**b) (9 P)** Erläutern Sie das Zusammenspiel von 802.1X und RADIUS bei der Authentifizierung eines WLAN-Clients.

**c) (8 P)** Ein Access Point ist mit dem Netzwerk verbunden, WLAN-Clients erhalten jedoch keine IP-Adresse. Nennen Sie vier Prüfpunkte zur Eingrenzung der Ursache.

> [!success]- Lösung Aufgabe 3
> **a)** Getrennte Gäste-SSID/VLAN, Gäste nur Internet, WPA2/3-Enterprise für Firmengeräte, aktuelle Firmware, Client-Isolation und Funküberwachung.  
> **b)** 802.1X authentisiert den Client; der Access Point leitet Anfragen an RADIUS weiter. RADIUS prüft Identität/Richtlinie und kann Rechte oder VLAN zuweisen.  
> **c)** SSID-VLAN-Zuordnung, Switch-Trunk/erlaubte VLANs, DHCP-Pool/Relay, Servererreichbarkeit und Firewall prüfen.

### Aufgabe 4 – DNS und Mitschnitt (25 P)
**a) (8 P)** Erläutern Sie die Funktion von A-, AAAA- und PTR-Einträgen im DNS.

**b) (9 P)** Ein interner Client erhält für einen Servernamen eine falsche IP-Adresse, während die externe Namensauflösung korrekt ist. Nennen Sie zwei mögliche Ursachen und beschreiben Sie geeignete Prüfschritte.

**c) (8 P)** Nennen Sie sensible Informationen, die ein Netzwerk-Mitschnitt enthalten kann, und beschreiben Sie Maßnahmen zum Schutz des Mitschnitts.

> [!success]- Lösung Aufgabe 4
> A ordnet Name zu IPv4, AAAA zu IPv6, PTR ermöglicht Rückwärtsauflösung. Internes Split-DNS, veralteter Cache oder falscher Zoneneintrag sind mögliche Ursachen; internen Resolver und autoritative Zone getrennt abfragen, TTL/Cache prüfen. Mitschnitte können unverschlüsselte Daten, Namen, Adressen und Muster zeigen; Zugriff/Dauer begrenzen, verschlüsseln und sicher löschen.

## Teil 3 – Wirtschafts- und Sozialkunde
**60 Minuten · 20 Fragen à 5 Punkte.** [[WiSo Probeprüfung 2|WiSo-Teil öffnen und Antworten anklicken]]

Nachbereitung: [[AP2 FISI Fehlerlog]] · ← [[AP2 FISI Start]]

