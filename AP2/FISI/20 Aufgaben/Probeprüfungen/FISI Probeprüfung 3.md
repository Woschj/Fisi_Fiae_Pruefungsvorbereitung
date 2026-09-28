---
tags: [ap2/probepruefung, ap2/fisi]
fachrichtung: FISI
---
# FISI · AP2-Probeprüfung 3

> [!info] Durchführung
> Bearbeiten Sie die Prüfungsteile jeweils innerhalb der angegebenen Zeit. Öffnen Sie die Lösungshinweise erst nach Abschluss des jeweiligen Prüfungsteils, bewerten Sie sich anhand der **Bewertungshinweise** und tragen Sie Ihre erreichten Punkte anschließend im Dashboard ein.

## Teil 1 – Konzeption und Administration von IT-Systemen

> [!abstract] Ausgangssituation
> Die **MediForm GmbH** (Medizinlabor in Leverkusen, 140 Mitarbeitende) beschafft neue Clients und betreibt ein Laborinformationssystem (LIS), das gegen Ausfälle und unberechtigte Zugriffe geschützt werden muss.

**90 Minuten · 4 Aufgaben à 25 Punkte · Hilfsmittel: nicht programmierbarer Taschenrechner**

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FISI Probeprüfung 3 – Systeme", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – Client-Beschaffung und Rollout (25 Punkte)
Für die Mitarbeitenden des Labors sollen 20 Notebooks beschafft werden. Zwei Anbieter haben folgende Angebote abgegeben:

| Angebot | Listenpreis je Notebook | Rabatt | Skonto | Versandkosten |
|---|---:|---:|---:|---:|
| A | 1.050,00 € | 8 % | 2 % | 80,00 € je Lieferung |
| B | 995,00 € | 3 % | kein Skonto | frei Haus |

**a) (8 P)** Berechnen Sie den Bezugspreis für beide Angebote und geben Sie an, welches Angebot um wie viel Euro günstiger ist. Berücksichtigen Sie beim Angebot A zunächst den Rabatt, anschließend das Skonto und addieren Sie danach die Versandkosten.

**b) (9 P)** Die 20 Notebooks sollen ohne manuelle Installation an jedem Gerät bereitgestellt werden. Beschreiben Sie ein Verfahren zur automatisierten Bereitstellung von Betriebssystem, Anwendungen und Richtlinien und nennen Sie drei Schritte, die vor dem Rollout zu erledigen sind.

**c) (8 P)** Die Geschäftsleitung erwägt, die Notebooks zu leasen statt zu kaufen. Stellen Sie je zwei Vorteile von Kauf und Leasing gegenüber.

> [!success]- Lösung Aufgabe 1
> **a)** A: 20 × 1.050,00 € = 21.000,00 €; − 8 % Rabatt = 19.320,00 €; − 2 % Skonto = 18.933,60 €; + 80,00 € Versand = **19.013,60 €**. B: 20 × 995,00 € = 19.900,00 €; − 3 % Rabatt = **19.303,00 €**. **Angebot A ist um 289,40 € günstiger.**
>
> **b)** z. B. **Windows Autopilot mit Intune** (MDM): Geräte werden vom Händler mit ihrer Hardware-ID registriert, beim ersten Start meldet sich das Gerät am Entra ID an und erhält Konfiguration, Richtlinien und Apps automatisch. Alternativ **PXE-Boot mit WDS/MDT** oder einem anderen Imaging-Verfahren. Vorbereitung: Referenzkonfiguration/Image bzw. Profil erstellen und testen · Softwarepakete und Lizenzen bereitstellen · Richtlinien (BitLocker, Updates, Firewall) definieren · Geräte inventarisieren und Benutzern zuordnen · Pilotgruppe testen lassen.
>
> **c)** Kauf: Eigentum am Gerät, freie Nutzung und Weiterverwendung · auf Dauer meist günstiger, keine laufende Vertragsbindung · Abschreibung über die Nutzungsdauer. Leasing: keine hohe Anfangsinvestition, Liquidität bleibt erhalten · planbare monatliche Raten · regelmäßiger Austausch auf aktuelle Technik · Service und Rücknahme oft inklusive.
>
> **Bewertungshinweise:** a) Angebot A 4 P, Angebot B 2 P, Vergleich 2 P · b) Verfahren 3 P, je Vorbereitungsschritt 2 P · c) je Vorteil 2 P.

### Aufgabe 2 – USV (25 Punkte)
Für den Serverraum sind Server (420 W), Switch (60 W) und Router (20 W) an eine USV anzuschließen. Für die Auswahl ist ein Leistungsfaktor von 0,8 anzusetzen; zusätzlich ist eine Leistungsreserve von 25 % einzuplanen. Zur Auswahl stehen folgende Geräte: 600 VA/360 W, 750 VA/450 W und 1.000 VA/600 W.

**a) (6 P)** Berechnen Sie die erforderliche Wirkleistung in Watt einschließlich der Reserve. Ermitteln Sie daraus die erforderliche Scheinleistung in Voltampere.

**b) (5 P)** Beurteilen Sie, ob eines der angebotenen USV-Modelle geeignet ist.

**c) (6 P)** Die schließlich beschaffte USV hat einen Akkusatz mit 48 V und 9 Ah; der Wirkungsgrad des Wechselrichters beträgt 90 %. Berechnen Sie die Überbrückungszeit bei der tatsächlichen Last in Minuten (eine Nachkommastelle).

**d) (8 P)** Nennen Sie vier Maßnahmen, die einen zuverlässigen Betrieb der USV im Serverraum unterstützen.

> [!success]- Lösung Aufgabe 2
> **a)** Last 420 + 60 + 20 = 500 W; mit Reserve 500 × 1,25 = **625 W**. Scheinleistung 625 W / 0,8 = **781,25 VA**.
>
> **b)** **Keines** der Modelle ist geeignet: Das größte liefert zwar 1.000 VA, aber nur 600 W < 625 W. Es muss ein Modell mit mindestens 625 W und 782 VA gewählt werden (z. B. 1.500 VA/900 W).
>
> **c)** t = 48 V × 9 Ah × 0,9 / 500 W = 388,8 Wh / 500 W = 0,7776 h = **46,7 min**.
>
> **d)** Shutdown-Agent auf den Servern einrichten (USB/Netzwerkkarte der USV) · Akku-Selbsttest und Austausch nach Herstellervorgabe (meist 3–5 Jahre) · Monitoring mit Alarmierung (SNMP, E-Mail) · Raumtemperatur überwachen (Akkulebensdauer) · Bypass-Schalter für Wartung · regelmäßiger Lasttest.
>
> **Bewertungshinweise:** a) Wirkleistung 3 P, Scheinleistung 3 P · b) Beurteilung mit Begründung 5 P · c) Formel 3 P, Ergebnis 3 P · d) je Maßnahme 2 P.

### Aufgabe 3 – Updates und Sicherheitsvorfall (25 Punkte)
**a) (8 P)** Beschreiben Sie einen sicheren Ablauf für die Planung, Prüfung und Verteilung kritischer Updates auf die Systeme des Labors.

**b) (9 P)** Auf einem Arbeitsplatz wird ein möglicher Ransomware-Befall festgestellt. Beschreiben Sie geeignete Sofortmaßnahmen, um eine weitere Ausbreitung zu verhindern und den Vorfall zu untersuchen.

**c) (8 P)** Erläutern Sie, warum regelmäßige Wiederherstellungstests erforderlich sind, auch wenn die Sicherungsaufträge fehlerfrei abgeschlossen wurden.

> [!success]- Lösung Aufgabe 3
> **a)** Sicherheitsmeldungen verfolgen und Updates nach Kritikalität priorisieren (z. B. CVSS) · in einer Testumgebung bzw. mit Pilotgruppe prüfen, Freigabe mit dem LIS-Hersteller abstimmen · vor der Installation Sicherung/Snapshot und Rückfallplan · Verteilung zentral (WSUS, Intune, Paketverwaltung) im Wartungsfenster · Erfolg überwachen, Fehler nachbearbeiten, Änderungsprotokoll (Change Management).
>
> **b)** Gerät **sofort vom Netz trennen** (Kabel/WLAN), aber nicht ausschalten (Arbeitsspeicher für Forensik) · Vorfall an IT-Sicherheit/Notfallteam melden · Konten des Benutzers sperren, Passwörter zurücksetzen · Netzfreigaben und andere Systeme auf verschlüsselte Dateien prüfen, ggf. Segmente isolieren · Logs und Indikatoren sichern · Meldepflichten prüfen (DSGVO 72 h, bei KRITIS/NIS-2-Einrichtungen BSI) · Wiederherstellung erst aus sauberer, geprüfter Sicherung.
>
> **c)** Ein erfolgreicher Sicherungsauftrag belegt nur, dass geschrieben wurde – nicht, dass die Daten lesbar, vollständig und konsistent sind. Medien können defekt sein, Datenbanken inkonsistent gesichert, Schlüssel fehlen, Abhängigkeiten (Dienste, Lizenzen) nicht berücksichtigt sein. Erst der Test zeigt, ob RTO und RPO tatsächlich erreicht werden.
>
> **Bewertungshinweise:** a) je sinnvoller Schritt in logischer Folge 2 P · b) Isolation 3 P, weitere Maßnahmen je 1,5 P · c) je Argument 2 P, Bezug zu RTO/RPO 2 P.

### Aufgabe 4 – Datenübertragung und Import (25 Punkte)
Für die Übertragung eines 600 GB großen Labordatenbestands steht eine Verbindung mit 80 Mbit/s zur Verfügung. Wegen des Protokoll-Overheads werden 75 % der Nennrate als nutzbare Datenrate angenommen.

**a) (7 P)** Berechnen Sie die Übertragungsdauer in Stunden (eine Nachkommastelle). Verwenden Sie für GB die dezimale Einheit.

**b) (6 P)** Erläutern Sie den Unterschied zwischen GB und GiB und rechnen Sie 600 GB in GiB um (zwei Nachkommastellen).

**c) (12 P)** Das folgende Python-Skript soll alle Datensätze einer CSV-Datei (erste Zeile: Spaltenüberschriften) importieren. Es liest jedoch nur einen Datensatz ein.

```python
def importiere(pfad):
    anzahl = 0
    with open(pfad, encoding="utf-8") as datei:
        for zeile in datei:
            felder = zeile.strip().split(";")
            speichere(felder)
            anzahl = anzahl + 1
            return anzahl
```

- Erläutern Sie die Ursache des Fehlers und korrigieren Sie das Skript.
- Das Skript importiert außerdem die Überschriftenzeile als Datensatz. Ergänzen Sie eine Lösung.
- Nennen Sie zwei weitere mögliche Ursachen für fehlerhafte CSV-Importe.

> [!success]- Lösung Aufgabe 4
> **a)** Nutzbare Rate: 80 Mbit/s × 0,75 = 60 Mbit/s. 600 GB = 600 × 8 = 4.800 Gbit = 4.800.000 Mbit. t = 4.800.000 / 60 = 80.000 s = **22,2 h**.
>
> **b)** GB ist dezimal (10⁹ Byte), GiB binär (2³⁰ = 1.073.741.824 Byte). 600 × 10⁹ / 2³⁰ = **558,79 GiB**.
>
> **c)** Das `return` steht **innerhalb** der Schleife – die Funktion endet nach dem ersten Durchlauf. Korrektur: `return anzahl` auf die Einrückungsebene der Funktion setzen (nach dem `with`-Block). Überschrift überspringen: vor der Schleife `next(datei)` aufrufen oder einen Zähler bzw. `csv.DictReader` verwenden. Weitere Ursachen: falsches Trennzeichen (Komma statt Semikolon) · abweichende Zeichenkodierung (ANSI statt UTF-8, BOM) · Trennzeichen oder Zeilenumbrüche innerhalb von Feldern ohne Anführungszeichen-Behandlung · abweichende Zeilenenden.
>
> **Bewertungshinweise:** a) Rechenweg 4 P, Ergebnis 3 P · b) Erläuterung 3 P, Umrechnung 3 P · c) Ursache 3 P, Korrektur 3 P, Überschrift 2 P, je weitere Ursache 2 P.

---

## Teil 2 – Analyse und Entwicklung von Netzwerken

> [!abstract] Ausgangssituation
> Die MediForm GmbH trennt Laborgeräte vom Büronetz und veröffentlicht einen Webdienst in einer DMZ. Der Webserver ist per HTTPS erreichbar und greift für einzelne Abfragen auf eine interne PostgreSQL-Datenbank zu (TCP-Port 5432).

**90 Minuten · 4 Aufgaben à 25 Punkte · Hilfsmittel: nicht programmierbarer Taschenrechner**

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FISI Probeprüfung 3 – Netzwerke", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – IPv4/IPv6 (25 Punkte)
**a) (8 P)** Ermitteln Sie für das IPv4-Netz 172.20.32.0/20 die Subnetzmaske in Punktdezimalschreibweise, die Broadcastadresse, den nutzbaren Hostbereich und die Anzahl der nutzbaren Hostadressen.

**b) (7 P)** Das Netz 172.20.32.0/20 soll in gleich große /23-Teilnetze aufgeteilt werden. Geben Sie die Anzahl der Teilnetze sowie Netzadresse und Broadcastadresse des **dritten** Teilnetzes an.

**c) (6 P)** Berechnen Sie, wie viele /64-Subnetze aus dem IPv6-Präfix 2001:db8:1200::/48 gebildet werden können, und geben Sie das Präfix des **dritten** /64-Subnetzes an.

**d) (4 P)** Begründen Sie, warum für IPv6-LAN-Segmente grundsätzlich /64 verwendet wird.

> [!success]- Lösung Aufgabe 1
> **a)** Maske **255.255.240.0** · Broadcast **172.20.47.255** · Hosts **172.20.32.1–172.20.47.254** · 2¹² − 2 = **4.094** Hosts.
>
> **b)** 2^(23−20) = **8 Teilnetze** à 512 Adressen. Drittes Teilnetz: **172.20.36.0/23**, Broadcast **172.20.37.255**.
>
> **c)** 64 − 48 = 16 Bit → 2¹⁶ = **65.536** Subnetze. Drittes: **2001:db8:1200:2::/64** (erstes ist :0::, zweites :1::).
>
> **d)** SLAAC setzt eine 64 Bit lange Interface-ID voraus; kleinere Präfixe brechen die automatische Adresskonfiguration und Funktionen wie Privacy Extensions. Adressknappheit gibt es bei IPv6 nicht.
>
> **Bewertungshinweise:** a) je Angabe 2 P · b) Anzahl 2 P, Netzadresse 3 P, Broadcast 2 P · c) Anzahl 3 P, Präfix 3 P · d) 4 P.

### Aufgabe 2 – DMZ und Firewall (25 Punkte)
**a) (6 P)** Erläutern Sie den Zweck einer DMZ und nennen Sie zwei Systeme, die typischerweise dort betrieben werden.

**b) (11 P)** Formulieren Sie die Firewallregeln für den Zugriff aus dem Internet auf den Webdienst (DMZ-Adresse 192.0.2.10) sowie vom Webdienst auf die Datenbank (10.10.5.20). Geben Sie jeweils Quelle, Ziel, Protokoll/Port und Aktion an und ergänzen Sie eine abschließende Regel.

**c) (8 P)** Erläutern Sie das Prinzip der Stateful Inspection und nennen Sie eine Grenze dieses Verfahrens.

> [!success]- Lösung Aufgabe 2
> **a)** Die DMZ ist ein eigenes Netzsegment zwischen Internet und internem Netz für öffentlich erreichbare Dienste. Wird ein dortiger Server kompromittiert, hat der Angreifer keinen direkten Zugriff auf das interne Netz. Typische Systeme: Webserver, Reverse Proxy, Mail-Relay, VPN-Gateway.
>
> **b)**
>
> | Nr. | Quelle | Ziel | Protokoll/Port | Aktion |
> |---|---|---|---|---|
> | 1 | any (Internet) | 192.0.2.10 | TCP 443 | allow |
> | 2 | 192.0.2.10 | 10.10.5.20 | TCP 5432 | allow |
> | 3 | any | any | any | deny |
>
> Antworten sind bei einer Stateful Firewall automatisch erlaubt; administrativer Zugriff nur aus dem Adminnetz über eine eigene Regel.
>
> **c)** Die Firewall führt eine **Zustandstabelle** der Verbindungen (Quell-/Ziel-IP, Ports, TCP-Status) und lässt Rückverkehr nur zu, wenn er zu einer bestehenden, erlaubten Verbindung gehört. Grenze: Der **Inhalt** wird nicht geprüft – Angriffe über erlaubte Verbindungen (z. B. SQL-Injection über HTTPS) werden nicht erkannt; dafür sind WAF/IPS nötig.
>
> **Bewertungshinweise:** a) Zweck 4 P, Systeme je 1 P · b) Regel 1 und 2 je 4 P, abschließende Regel 3 P · c) Prinzip 5 P, Grenze 3 P.

### Aufgabe 3 – DHCP, NAT und DNS (25 Punkte)
**a) (8 P)** Erläutern Sie die Aufgabe eines DHCP-Relay-Agenten in einem gerouteten Netzwerk.

**b) (9 P)** Erläutern Sie den Unterschied zwischen statischem NAT und PAT (NAT-Overload) und nennen Sie je einen Einsatzfall.

**c) (8 P)** Ein Arbeitsplatzrechner verwendet eine falsche DNS-Suchdomäne. Beschreiben Sie eine mögliche Auswirkung und nennen Sie zwei geeignete Prüfschritte.

> [!success]- Lösung Aufgabe 3
> **a)** DHCP-Discover ist ein **Broadcast** und wird von Routern nicht weitergeleitet. Der Relay-Agent (IP-Helper) auf dem Router nimmt die Anfrage im Clientnetz an, leitet sie als **Unicast** an den zentralen DHCP-Server weiter und trägt seine Schnittstellenadresse (giaddr) ein – daran erkennt der Server, aus welchem Pool er die Adresse vergeben muss.
>
> **b)** Statisches NAT: feste 1:1-Zuordnung einer internen zu einer öffentlichen Adresse – z. B. Server, der von außen erreichbar sein muss. PAT: viele interne Adressen teilen sich **eine** öffentliche Adresse, Verbindungen werden über **Portnummern** unterschieden – z. B. Internetzugang aller Clients über einen DSL-Anschluss.
>
> **c)** Kurze Namen (z. B. `lis`) werden mit der falschen Domäne ergänzt und nicht oder zu einem falschen Server aufgelöst. Prüfen: `ipconfig /all` bzw. `resolvectl status` mit einem funktionierenden Client vergleichen · Abfrage mit FQDN und mit Kurznamen gegen den Resolver durchführen · DHCP-Option 15/119 am Server kontrollieren.
>
> **Bewertungshinweise:** a) Problem Broadcast 3 P, Funktion 3 P, Pool-Auswahl 2 P · b) je Verfahren 3 P, je Einsatzfall 1,5 P · c) Auswirkung 4 P, je Prüfschritt 2 P.

### Aufgabe 4 – WLAN und Identität (25 Punkte)
**a) (8 P)** Erläutern Sie, was unter einem Rogue Access Point zu verstehen ist, und beschreiben Sie zwei Möglichkeiten, einen solchen Access Point zu erkennen.

**b) (9 P)** Nennen Sie drei Maßnahmen, mit denen Laborgeräte vom Büronetz getrennt und vor unberechtigten Zugriffen geschützt werden können.

**c) (8 P)** Erläutern Sie den Unterschied zwischen Authentifizierung und Autorisierung an einem Beispiel aus dem Labor.

> [!success]- Lösung Aufgabe 4
> **a)** Ein nicht autorisierter Access Point im Firmennetz, z. B. von Mitarbeitenden angeschlossen oder von Angreifern (Evil Twin), der Sicherheitsrichtlinien umgeht. Erkennung: WLAN-Controller mit Rogue-Detection/Funküberwachung · Abgleich unbekannter MAC-Adressen an Switchports · 802.1X an allen Ports, sodass unbekannte Geräte gar nicht ins Netz kommen.
>
> **b)** Eigenes VLAN für Laborgeräte · Firewall zwischen den VLANs mit Default-Deny, nur benötigte Verbindungen (z. B. Gerät → LIS) · Management nur aus dem Adminnetz · 802.1X bzw. MAB an den Ports · Protokollierung und Monitoring.
>
> **c)** **Authentifizierung** prüft, **wer** jemand ist – z. B. die Laborantin meldet sich mit Chipkarte und PIN am LIS an. **Autorisierung** legt fest, **was** sie danach darf – z. B. Befunde erfassen, aber nicht freigeben (nur Laborärztin).
>
> **Bewertungshinweise:** a) Erläuterung 4 P, je Erkennungsmöglichkeit 2 P · b) je Maßnahme 3 P · c) je Begriff mit Beispiel 4 P.

---

## Teil 3 – Wirtschafts- und Sozialkunde
**60 Minuten · 30 Aufgaben · Hilfsmittel: nicht programmierbarer Taschenrechner.** [[WiSo Probeprüfung 3|WiSo-Teil öffnen]]

Nachbereitung: [[AP2 FISI Fehlerlog]] · ← [[AP2 FISI Start]]
