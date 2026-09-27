---
tags: [ap2/probepruefung, ap2/fisi]
fachrichtung: FISI
---
# FISI · AP2-Probeprüfung 3

> [!info] Durchführung
> Bearbeiten Sie die Prüfungsteile jeweils innerhalb der angegebenen Zeit. Öffnen Sie die Musterlösungen erst nach Abschluss des jeweiligen Prüfungsteils und tragen Sie Ihre erreichten Punkte anschließend im Dashboard ein.

## Teil 1 – Konzeption und Administration (90 Minuten)

> [!abstract] Szenario
> Die MediForm GmbH beschafft Clients und betreibt ein Laborinformationssystem, das gegen Ausfälle und unberechtigte Zugriffe geschützt werden muss.

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FISI Probeprüfung 3 – Systeme", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – Bezugskalkulation (25 P)
Für die Mitarbeitenden des Labors sollen 20 Notebooks beschafft werden. Zwei Anbieter haben folgende Angebote abgegeben:

| Angebot | Listenpreis je Notebook | Rabatt | Skonto | Versandkosten |
|---|---:|---:|---:|---:|
| A | 1.050,00 € | 8 % | 2 % | 80,00 € gesamt |
| B | 995,00 € | 3 % | kein Skonto | frei Haus |

**a) (12 P)** Berechnen Sie den Bezugspreis für beide Angebote. Berücksichtigen Sie beim Angebot A zunächst den Rabatt, anschließend das Skonto auf den verminderten Warenwert und addieren Sie danach die Versandkosten.

**b) (5 P)** Ermitteln Sie den Preisunterschied zwischen den beiden Angeboten und geben Sie an, welches Angebot günstiger ist.

**c) (8 P)** Nennen Sie je einen Vorteil des Kaufs und des Leasings. Nennen Sie außerdem zwei weitere Kriterien, die bei der Auswahl des Anbieters berücksichtigt werden sollten.

> [!success]- Lösung Aufgabe 1
> A: 20 × 1.050,00 € = 21.000,00 €; abzüglich 8 % Rabatt = 19.320,00 €; abzüglich 2 % Skonto = 18.933,60 €; zuzüglich 80,00 € Versand = **19.013,60 €**. B: 20 × 995,00 € = 19.900,00 €; abzüglich 3 % Rabatt = **19.303,00 €**. Angebot B ist **289,40 € günstiger**. Beim Kauf geht das Gerät in das Eigentum des Betriebs über; Leasing verteilt die Kosten und kann einen planbaren Austausch ermöglichen. Weitere Kriterien können Support, Lieferzeit, Energieverbrauch und Kompatibilität sein.

### Aufgabe 2 – USV (25 P)
Für den Serverraum sind Server (420 W), Switch (60 W) und Router (20 W) an eine USV anzuschließen. Für die Berechnung ist ein Leistungsfaktor von 0,8 anzusetzen; zusätzlich ist eine Leistungsreserve von 25 % einzuplanen. Zur Auswahl stehen folgende Geräte: 600 VA/360 W, 750 VA/450 W und 1.000 VA/600 W.

**a) (10 P)** Berechnen Sie die erforderliche Wirkleistung in Watt einschließlich der Reserve. Ermitteln Sie daraus die erforderliche Scheinleistung in Voltampere.

**b) (7 P)** Beurteilen Sie, ob eines der angebotenen USV-Modelle geeignet ist. Begründen Sie Ihre Auswahl.

**c) (8 P)** Nennen Sie vier Maßnahmen, die einen zuverlässigen Betrieb der USV im Serverraum unterstützen.

> [!success]- Lösung Aufgabe 2
> Last 500 W; mit Reserve **625 W**. Scheinleistung 625/0,8 = **781,25 VA**. Keines der Modelle reicht, da die größte angebotene USV höchstens 600 W Wirkleistung bereitstellt. Ein größeres Modell ist erforderlich. Für den zuverlässigen Betrieb sind insbesondere die Laufzeit passend zur Last zu dimensionieren, ein Shutdown-Agent einzurichten, Batterien regelmäßig zu prüfen und zu tauschen sowie Monitoring mit Alarmierung vorzusehen.

### Aufgabe 3 – Updates und Sicherheitsvorfall (25 P)
**a) (8 P)** Beschreiben Sie einen sicheren Ablauf für die Planung, Prüfung und Verteilung kritischer Updates auf die Systeme des Labors.

**b) (9 P)** Auf einem Arbeitsplatz wird ein möglicher Ransomware-Befall festgestellt. Beschreiben Sie geeignete Sofortmaßnahmen, um eine weitere Ausbreitung zu verhindern und den Vorfall zu untersuchen.

**c) (8 P)** Erläutern Sie, warum regelmäßige Wiederherstellungstests erforderlich sind, auch wenn die Sicherungsaufträge fehlerfrei abgeschlossen wurden.

> [!success]- Lösung Aufgabe 3
> Updates inventarisieren und priorisieren, in Testumgebung prüfen, Backup/Wartungsfenster sichern, kontrolliert ausrollen und überwachen. Bei Verdacht Gerät nach Prozess isolieren, Vorfall melden, Informationen sichern, Tokens/Konten widerrufen und Ausbreitung prüfen; nicht unüberlegt löschen. Restore-Test belegt Lesbarkeit, Konsistenz, Abhängigkeiten sowie erreichbare RTO/RPO.

### Aufgabe 4 – Datenübertragung (25 P)
Für die Übertragung eines 600 GB großen Labor-Datenbestands steht eine Verbindung mit 80 Mbit/s zur Verfügung. Wegen des Protokoll-Overheads werden 75 % der Nennrate als nutzbare Datenrate angenommen.

**a) (10 P)** Berechnen Sie die Übertragungsdauer in Stunden. Verwenden Sie für GB die dezimale Einheit und runden Sie das Ergebnis auf eine Nachkommastelle.

**b) (7 P)** Erläutern Sie den Unterschied zwischen GB und GiB.

**c) (8 P)** Ein Importskript liest aus einer CSV-Datei nur den ersten Datensatz ein. Nennen Sie vier mögliche Ursachen und jeweils eine geeignete Prüfmöglichkeit.

> [!success]- Lösung Aufgabe 4
> Effektive Rate: 80 Mbit/s × 0,75 = 60 Mbit/s. Bei dezimalen Einheiten entsprechen 600 GB = 4.800 Gbit = 4.800.000 Mbit. Übertragungszeit: 4.800.000 / 60 = 80.000 s = 22,2 h. GB = 10⁹ Byte; GiB = 2³⁰ Byte. Mögliche Ursachen und Prüfschritte: Schleifenbedingung/Zähler prüfen; `return` oder `break` im Schleifenkörper suchen; prüfen, ob die Datei innerhalb der Schleife geschlossen wird; Trennzeichen, Encoding und Zeilenenden mit der Parserkonfiguration abgleichen.

## Teil 2 – Analyse und Entwicklung von Netzwerken (90 Minuten)

> [!abstract] Szenario
> Die MediForm GmbH trennt Laborgeräte vom Büronetz und veröffentlicht einen Webdienst in einer DMZ. Der Webserver ist per HTTPS erreichbar und greift für einzelne Abfragen auf eine interne PostgreSQL-Datenbank zu (TCP-Port 5432).

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FISI Probeprüfung 3 – Netzwerke", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – IPv4/IPv6 (25 P)
**a) (8 P)** Ermitteln Sie für das IPv4-Netz 172.20.32.0/20 die Netzadresse, die Broadcastadresse und den nutzbaren Hostbereich.

**b) (7 P)** Berechnen Sie die Anzahl der nutzbaren Hostadressen in diesem Netz.

**c) (10 P)** Berechnen Sie, wie viele /64-Subnetze aus dem IPv6-Präfix 2001:db8:1200::/48 gebildet werden können. Geben Sie den Rechenweg an.

> [!success]- Lösung Aufgabe 1
> Netz 172.20.32.0, Broadcast 172.20.47.255, Hosts .32.1–.47.254. Anzahl 2^12−2 = **4.094**. IPv6: 16 Subnetzbits, 2^16 = **65.536 /64-Netze**.

### Aufgabe 2 – DMZ und Firewall (25 P)
**a) (8 P)** Erläutern Sie den Zweck einer DMZ und nennen Sie zwei Systeme, die typischerweise dort betrieben werden.

**b) (9 P)** Der Webdienst in der DMZ muss auf eine interne Datenbank zugreifen. Formulieren Sie geeignete Firewallregeln für den Zugriff aus dem Internet auf den Webdienst sowie vom Webdienst auf die Datenbank. Geben Sie jeweils Quelle, Ziel und benötigten Dienst beziehungsweise Port an.

**c) (8 P)** Erläutern Sie das Prinzip der Stateful Inspection und nennen Sie eine Grenze dieses Verfahrens.

> [!success]- Lösung Aufgabe 2
> Eine DMZ isoliert öffentlich erreichbare Systeme, zum Beispiel einen Reverse Proxy oder Webserver. Erlauben Sie vom Internet ausschließlich HTTPS zum Webserver in der DMZ (TCP 443). Erlauben Sie vom Webserver zur internen PostgreSQL-Datenbank ausschließlich Verbindungen zum festgelegten Datenbankserver auf TCP 5432. Sperren Sie andere Verbindungen zwischen DMZ und internem Netz; administrativer Zugriff erfolgt getrennt aus dem Adminnetz. Stateful Inspection erlaubt passenden Rückverkehr bestehender Sitzungen, erkennt aber nicht automatisch schädliche Inhalte oder kompromittierte Endpunkte.

### Aufgabe 3 – DHCP, NAT und DNS (25 P)
**a) (8 P)** Erläutern Sie die Aufgabe eines DHCP-Relay-Agenten in einem gerouteten Netzwerk.

**b) (9 P)** Erläutern Sie den Unterschied zwischen NAT und PAT.

**c) (8 P)** Ein Arbeitsplatzrechner verwendet eine falsche DNS-Suchdomäne. Beschreiben Sie eine mögliche Auswirkung und nennen Sie zwei geeignete Prüfschritte.

> [!success]- Lösung Aufgabe 3
> DHCP-Relay leitet Broadcast-Anfragen über Router zum DHCP-Server und übermittelt das Clientnetz zur Pool-Auswahl. NAT übersetzt private in öffentliche Adressen; PAT unterscheidet mehrere Verbindungen zusätzlich über Ports. Falsche Suchdomäne ergänzt kurze Namen fehlerhaft; Konfiguration vergleichen und FQDN/kurzen Namen separat gegen den Resolver abfragen.

### Aufgabe 4 – WLAN und Identität (25 P)
**a) (8 P)** Erläutern Sie, was unter einem Rogue Access Point zu verstehen ist, und beschreiben Sie eine Möglichkeit, einen solchen Access Point zu erkennen.

**b) (9 P)** Nennen Sie drei Maßnahmen, mit denen Laborgeräte vom Büronetz getrennt und vor unberechtigten Zugriffen geschützt werden können.

**c) (8 P)** Erläutern Sie den Unterschied zwischen Authentifizierung und Autorisierung.

> [!success]- Lösung Aufgabe 4
> Rogue AP ist ein nicht autorisierter WLAN-Zugang. Erkennung über Funküberwachung, Inventar und Zuordnung zum Switchport. Laborgeräte in eigenes VLAN; Default-Deny-Regeln mit benötigten Flows; Management nur aus Adminnetz; Geräteidentitäten und Protokollierung. Authentifizierung prüft Identität, Autorisierung die erlaubten Handlungen.

## Teil 3 – Wirtschafts- und Sozialkunde
**60 Minuten · 20 Fragen à 5 Punkte.** [[WiSo Probeprüfung 3|WiSo-Teil öffnen und Antworten anklicken]]

Nachbereitung: [[AP2 FISI Fehlerlog]] · ← [[AP2 FISI Start]]

