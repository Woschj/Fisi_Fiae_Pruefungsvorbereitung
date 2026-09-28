---
tags: [ap2/probepruefung, ap2/fisi]
fachrichtung: FISI
---
# FISI · AP2-Probeprüfung 1

> [!info] Durchführung
> Bearbeiten Sie die Prüfungsteile unter den angegebenen Zeitvorgaben. Nutzen Sie für Berechnungen ein Konzeptblatt und öffnen Sie die Lösungshinweise erst nach Abschluss des jeweiligen Prüfungsteils. Bewerten Sie sich anhand der **Bewertungshinweise** und tragen Sie die erreichten Punkte im Dashboard ein. Szenarien und Zahlenwerte sind eigens für diese Probeprüfung erstellt.

## Teil 1 – Konzeption und Administration von IT-Systemen

> [!abstract] Ausgangssituation
> Die **Nordlicht Energie GmbH** betreibt eine Zentrale und drei Außenstellen. 120 Mitarbeitende nutzen virtualisierte Server und mobile Dienstgeräte. Die IT plant den Umzug in einen neuen Serverraum und möchte Ausfälle begrenzen.

**90 Minuten · 4 Aufgaben à 25 Punkte · Hilfsmittel: nicht programmierbarer Taschenrechner**

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FISI Probeprüfung 1 – Konzeption und Administration", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – Verfügbarkeit und Auslegung (25 Punkte)

**a) (6 P)** Ein für den Betrieb benötigter Dienst war innerhalb eines Monats mit 30 Tagen insgesamt drei Stunden nicht verfügbar. Berechnen Sie die Verfügbarkeit des Dienstes in Prozent (zwei Nachkommastellen) und beurteilen Sie, ob ein vereinbartes SLA von 99,5 % eingehalten wurde.

**b) (9 P)** Ein Server ist mit zwei redundant betriebenen Netzteilen (1+1) mit einer Nennleistung von jeweils 750 W ausgestattet. Seine maximale Leistungsaufnahme beträgt 610 W. Laut Betriebsvorgabe darf ein einzelnes Netzteil höchstens zu **80 % seiner Nennleistung** ausgelastet werden.
- Erläutern Sie, welche Leistung bei Ausfall eines Netzteils noch zur Verfügung steht.
- Prüfen Sie rechnerisch, ob die Betriebsvorgabe bei Ausfall eines Netzteils eingehalten wird.

**c) (10 P)** Erläutern Sie die Begriffe RTO und RPO. Geben Sie für das Warenwirtschaftssystem jeweils einen begründeten Zielwert an und nennen Sie je eine technische Maßnahme, mit der der Zielwert erreicht werden kann.

> [!success]- Lösung Aufgabe 1
> **a)** Gesamtzeit: 30 × 24 h = 720 h. Verfügbarkeit: (720 − 3) / 720 × 100 = **99,58 %** → SLA von 99,5 % **eingehalten** (zulässig wären 3,6 h Ausfall).
>
> **b)** Bei 1+1-Redundanz muss **ein** Netzteil die gesamte Last allein tragen – es stehen also **750 W** zur Verfügung, nicht 1 500 W. Zulässig: 750 W × 0,8 = **600 W**. Last 610 W > 600 W → Auslastung 610 / 750 = **81,3 %** → Vorgabe **nicht eingehalten** (Netzteile mit 800 W oder mehr wählen oder Last reduzieren).
>
> **c)** **RTO** (Recovery Time Objective) = maximal tolerierte Ausfalldauer bis zur Wiederherstellung, z. B. **4 Stunden**, weil Lager und Versand danach stillstehen → Maßnahme: Hochverfügbarkeitscluster, vorbereitete Wiederanlaufpläne. **RPO** (Recovery Point Objective) = maximal tolerierter Datenverlust als Zeitraum, z. B. **15 Minuten**, weil Bestellungen nicht erneut erfasst werden können → Maßnahme: Transaktionslog-Sicherung alle 15 min, Replikation.
>
> **Bewertungshinweise:** a) Rechenweg 3 P, Ergebnis 1 P, Beurteilung 2 P · b) Erläuterung Redundanz 3 P, Rechnung 4 P, Schlussfolgerung 2 P · c) je Begriff 2 P, je begründeter Zielwert mit Maßnahme 3 P.

### Aufgabe 2 – Sicherung und Wiederanlauf (25 Punkte)

Die Datenbank umfasst 800 GB. Sonntags wird voll gesichert. Von Montag bis Samstag fallen täglich 18 GB Änderungen an (jeweils andere Datenblöcke).

**a) (6 P)** Werktags wird inkrementell gesichert. Geben Sie an, welche Sicherungssätze in welcher Reihenfolge benötigt werden, um den Datenbestand nach der Sicherung am Donnerstag wiederherzustellen.

**b) (7 P)** Berechnen Sie den Speicherbedarf für die Vollsicherung und die bis einschließlich Donnerstag erstellten Sicherungen
- bei **inkrementeller** Sicherung,
- bei **differenzieller** Sicherung.

Berücksichtigen Sie keine Kompression und keine Metadaten.

**c) (12 P)** Entwickeln Sie für das Warenwirtschaftssystem ein Sicherungskonzept nach der 3-2-1-Regel, das mindestens eine unveränderbare Sicherungskopie enthält. Beschreiben Sie außerdem, wie Sie die Wiederherstellbarkeit regelmäßig überprüfen.

> [!success]- Lösung Aufgabe 2
> **a)** Vollsicherung Sonntag, danach **alle** Inkremente Montag, Dienstag, Mittwoch und Donnerstag in dieser Reihenfolge (5 Sätze).
>
> **b)** Inkrementell: 800 + 4 × 18 = **872 GB**. Differenziell: Mo 18, Di 36, Mi 54, Do 72 GB → 800 + 18 + 36 + 54 + 72 = **980 GB** (für die Wiederherstellung genügen hier Vollsicherung + Differenz Donnerstag).
>
> **c)** **3** Kopien (Produktivdaten, lokales Backup-Repository, Kopie außer Haus) auf **2** unterschiedlichen Medientypen (z. B. Disk-Repository und Band/Cloud-Objektspeicher), **1** Kopie außer Haus. Unveränderbar: Object Lock/WORM oder offline gelagertes Band (Air Gap). Verschlüsselung der ausgelagerten Kopie. Prüfung: automatische Prüfsummenkontrolle nach jeder Sicherung, monatliche Stichproben-Wiederherstellung einzelner Dateien, mindestens jährlich vollständiger Wiederherstellungstest in isolierter Umgebung mit Messung von RTO/RPO und Protokoll.
>
> **Bewertungshinweise:** a) richtige Sätze 4 P, Reihenfolge 2 P · b) je Verfahren 3,5 P · c) 3-2-1 korrekt umgesetzt 5 P, Unveränderbarkeit 3 P, Wiederherstellungstests 4 P.

### Aufgabe 3 – Cloud und Datenschutz (25 Punkte)

Die Geschäftsleitung möchte Maildienst und Personalakten zu einem externen Anbieter verlagern.

**a) (9 P)** Ordnen Sie den Cloud-Service-Modellen IaaS, PaaS und SaaS jeweils eine passende Leistung zu. Erläutern Sie für jedes Modell, wer Betriebssystem und Anwendung betreibt.

**b) (9 P)** Nennen Sie drei Datenschutz- oder Sicherheitsmaßnahmen, die vor der Verarbeitung der Personalakten beim Anbieter zu prüfen beziehungsweise umzusetzen sind, und begründen Sie jede Maßnahme.

**c) (7 P)** Vergleichen Sie Public Cloud und Private Cloud anhand von zwei geeigneten Kriterien.

> [!success]- Lösung Aufgabe 3
> **a)** **IaaS**: virtuelle Maschinen/Speicher – der Kunde betreibt Betriebssystem und Anwendung. **PaaS**: Datenbank- oder Laufzeitplattform – der Anbieter betreibt Betriebssystem und Plattform, der Kunde die eigene Anwendung. **SaaS**: fertiger Maildienst – der Anbieter betreibt alles bis zur Anwendung; der Kunde verwaltet Nutzer, Berechtigungen und Inhalte.
>
> **b)** Auftragsverarbeitungsvertrag nach Art. 28 DSGVO (Weisungsbindung, TOM des Anbieters) · Speicherort und Drittlandtransfer klären (Server in der EU bzw. geeignete Garantien) · MFA und rollenbasierte Rechte, weil Personaldaten besonders schutzbedürftig sind · Verschlüsselung bei Übertragung und Speicherung · Löschkonzept und Protokollierung · Beteiligung von Datenschutzbeauftragtem und Betriebsrat.
>
> **c)** Kosten: Public Cloud nutzungsabhängig ohne hohe Anfangsinvestition; Private Cloud hohe Fixkosten. Kontrolle/Datenschutz: Private Cloud volle Kontrolle über Standort und Konfiguration; Public Cloud Abhängigkeit vom Anbieter. Skalierung: Public Cloud nahezu beliebig, Private Cloud durch eigene Hardware begrenzt.
>
> **Bewertungshinweise:** a) je Modell 3 P (Zuordnung 1 P, Betriebsverantwortung 2 P) · b) je Maßnahme mit Begründung 3 P · c) je Kriterium mit Gegenüberstellung 3,5 P.

### Aufgabe 4 – Skriptanalyse und Betrieb (25 Punkte)

<pre>
werte ← [7, 12, 5, 18, 9]
summe ← 0
anzahl ← 0
FÜR i ← 0 BIS länge(werte) - 1
    WENN werte[i] MOD 2 = 0 DANN
        summe ← summe + werte[i]
        anzahl ← anzahl + 1
    ENDE WENN
ENDE FÜR
ausgabe(summe, anzahl)
</pre>

**a) (8 P)** Erstellen Sie eine Trace-Tabelle für alle Werte der Liste und geben Sie die Programmausgabe an.

**b) (9 P)** Auf den Windows-Servern soll täglich geprüft werden, welche automatisch startenden Dienste nicht laufen. Ergänzen Sie die Lücken im folgenden PowerShell-Skript und erweitern Sie es so, dass das Ergebnis in die Datei `C:\Logs\dienste.csv` geschrieben wird.

```powershell
Get-Service |
    Where-Object { $_.StartType -eq ______ -and $_.Status -ne ______ } |
    Select-Object Name, DisplayName, Status
```

**c) (8 P)** Ein Linux-Dienst startet nach einem Update nicht mehr. Beschreiben Sie vier systematische Prüfschritte zur Eingrenzung der Fehlerursache und nennen Sie jeweils einen passenden Befehl.

> [!success]- Lösung Aufgabe 4
> **a)**
>
> | i | werte[i] | gerade? | summe | anzahl |
> |---:|---:|---|---:|---:|
> | 0 | 7 | nein | 0 | 0 |
> | 1 | 12 | ja | 12 | 1 |
> | 2 | 5 | nein | 12 | 1 |
> | 3 | 18 | ja | 30 | 2 |
> | 4 | 9 | nein | 30 | 2 |
>
> Ausgabe: **30, 2**.
>
> **b)**
> ```powershell
> Get-Service |
>     Where-Object { $_.StartType -eq 'Automatic' -and $_.Status -ne 'Running' } |
>     Select-Object Name, DisplayName, Status |
>     Export-Csv -Path 'C:\Logs\dienste.csv' -NoTypeInformation -Encoding UTF8
> ```
> Zeitgesteuert über die Aufgabenplanung (Task Scheduler) ausführen.
>
> **c)** Dienststatus und Exit-Code prüfen (`systemctl status dienst`) · Protokolle zum Fehlerzeitpunkt auswerten (`journalctl -u dienst --since "1 hour ago"`) · Konfiguration syntaktisch prüfen (z. B. `nginx -t`, `sshd -t`) · Berechtigungen, Ports und Speicherplatz prüfen (`ls -l`, `ss -tlnp`, `df -h`) · Paketänderungen nachvollziehen (Paketmanager-Log). Vor Eingriffen sichern, Änderung dokumentieren.
>
> **Bewertungshinweise:** a) Trace-Tabelle 6 P (je Zeile ca. 1 P), Ausgabe 2 P · b) je Lücke 2 P, Export-Csv mit Pfad 3 P, Hinweis auf zeitgesteuerte Ausführung 2 P · c) je Prüfschritt mit Befehl 2 P.

---

## Teil 2 – Analyse und Entwicklung von Netzwerken

> [!abstract] Ausgangssituation
> Die Nordlicht Energie GmbH eröffnet einen Standort mit Büro, Technik, Gäste-WLAN und Gebäudesteuerung. Ein zweiter Internetzugang und zentral verwaltete Access Points sollen ergänzt werden. Beide Provideranschlüsse werden zunächst über dieselbe Firewall und dieselbe Gebäudeeinführung geführt.

**90 Minuten · 4 Aufgaben à 25 Punkte · Hilfsmittel: nicht programmierbarer Taschenrechner**

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FISI Probeprüfung 1 – Netzwerke", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – IPv4 und VLAN-Planung (25 Punkte)

Das Netz 10.44.8.0/23 soll per VLSM aufgeteilt werden. Die Teilnetze sollen – beginnend bei der ersten Adresse und nach Größe absteigend – lückenlos aufeinander folgen. Bedarf: Büro 110 Hosts, Technik 55 Hosts, Gäste 25 Hosts.

**a) (15 P)** Ermitteln Sie für jedes Teilnetz das passende Präfix sowie Netzadresse, nutzbaren Hostbereich und Broadcastadresse.

**b) (4 P)** Für die Gebäudesteuerung werden 14 nutzbare Hostadressen benötigt. Bestimmen Sie das kleinste geeignete Präfix und die Netzadresse des nächsten freien Blocks.

**c) (6 P)** Begründen Sie, warum das Gäste-WLAN und die Gebäudesteuerung in getrennten VLANs betrieben werden sollten, und nennen Sie die Komponente, die den Verkehr zwischen den VLANs kontrolliert.

> [!success]- Lösung Aufgabe 1
> **a)**
>
> | Netz | Präfix | Netzadresse | Hostbereich | Broadcast |
> |---|---|---|---|---|
> | Büro | /25 | 10.44.8.0 | 10.44.8.1–10.44.8.126 | 10.44.8.127 |
> | Technik | /26 | 10.44.8.128 | 10.44.8.129–10.44.8.190 | 10.44.8.191 |
> | Gäste | /27 | 10.44.8.192 | 10.44.8.193–10.44.8.222 | 10.44.8.223 |
>
> **b)** 2⁴ − 2 = 14 → **/28**; nächster freier Block: **10.44.8.224/28** (Hosts .225–.238, Broadcast .239).
>
> **c)** Gäste dürfen nur ins Internet; Gebäudesteuerung (oft schlecht patchbare Geräte) darf nur mit ihrem Managementserver kommunizieren. VLANs trennen die Broadcastdomänen; ein kompromittiertes Gerät erreicht das andere Netz nicht direkt. Der Verkehr zwischen den VLANs wird von einer **Firewall bzw. einem Layer-3-Switch mit ACLs** kontrolliert.
>
> **Bewertungshinweise:** a) je Teilnetz 5 P (Präfix 1, Netzadresse 1, Hostbereich 2, Broadcast 1) · b) Präfix 2 P, Netzadresse 2 P · c) Begründung je Netz 2 P, Komponente 2 P.

### Aufgabe 2 – IPv6 und Namensauflösung (25 Punkte)

**a) (6 P)** Kürzen Sie die IPv6-Adresse `2001:0db8:0044:0002:0000:0000:0000:00a5` nach den geltenden Regeln. Geben Sie außerdem an, welche Art von Adresse `fe80::1` und `ff02::1` jeweils ist.

**b) (8 P)** Ein Client verfügt über eine IPv6-Adresse, kann jedoch den Namen eines internen Servers nicht auflösen. Nennen Sie vier Prüfpunkte, mit denen die Fehlerursache eingegrenzt werden kann.

**c) (11 P)** Erläutern Sie die Adresskonfiguration mit SLAAC und mit zustandsbehaftetem DHCPv6. Nennen Sie zwei Informationen, die ein Router Advertisement bereitstellen kann.

> [!success]- Lösung Aufgabe 2
> **a)** **2001:db8:44:2::a5** · `fe80::1` = **Link-Local-Adresse** (nur im eigenen Segment gültig) · `ff02::1` = **Multicast-Adresse** „alle Knoten im Link“.
>
> **b)** DNS-Server-Eintrag und Suchsuffix am Client kontrollieren (`ipconfig /all`) · Abfrage direkt mit `nslookup`/`dig` gegen den internen DNS-Server · Erreichbarkeit des DNS-Servers und Firewallfreigabe UDP/TCP 53 prüfen · AAAA- bzw. A-Eintrag in der Zone prüfen · lokalen DNS-Cache leeren.
>
> **c)** **SLAAC:** Der Router sendet Router Advertisements mit dem Präfix; der Host bildet seine Interface-ID selbst (zufällig oder EUI-64) und prüft per DAD auf Duplikate. **DHCPv6 (stateful):** Ein DHCPv6-Server vergibt Adressen und verwaltet sie zentral (Lease-Tabelle), das RA setzt dazu das M-Flag. RA-Inhalte: Präfix und Präfixlänge, Default-Router (Link-Local-Adresse), M/O-Flags, MTU, ggf. DNS-Server (RDNSS).
>
> **Bewertungshinweise:** a) Kürzung 2 P, je Adresstyp 2 P · b) je Prüfpunkt 2 P · c) SLAAC 4 P, DHCPv6 4 P, je RA-Information 1,5 P.

### Aufgabe 3 – Redundanz und Firewall (25 Punkte)

Zwei Provideranschlüsse sind vorhanden. Beide Router hängen am selben Switch; das interne Netz verwendet ein einziges Standardgateway.

**a) (8 P)** Erläutern Sie, warum dadurch noch keine ausfallsichere Internetanbindung gewährleistet ist, und nennen Sie zwei geeignete zusätzliche Maßnahmen.

**b) (9 P)** Erläutern Sie die Funktion eines First-Hop-Redundanzprotokolls und beschreiben Sie, wie die Clients bei einem Ausfall des aktiven Routers weiterhin ein Gateway erreichen.

**c) (8 P)** Formulieren Sie zwei Firewallregeln (Quelle, Ziel, Dienst, Aktion) für das Gäste-VLAN 10.44.8.192/27, die den Webzugriff ins Internet erlauben, den Zugriff auf interne Netze (10.0.0.0/8) jedoch verhindern. Begründen Sie die Reihenfolge der Regeln.

> [!success]- Lösung Aufgabe 3
> **a)** Switch, Firewall, Stromversorgung und Gebäudeeinführung sind gemeinsame **Single Points of Failure** – fällt eine davon aus (z. B. Bagger trennt die gemeinsame Zuführung), sind beide Anschlüsse weg. Maßnahmen: physisch getrennte Leitungswege/Hauseinführungen, redundante Switches und Firewall-Cluster, getrennte USV-Kreise, regelmäßige Failover-Tests.
>
> **b)** Ein Protokoll wie **VRRP** (oder HSRP) stellt eine **virtuelle Gateway-IP und -MAC** bereit, die die Clients als Standardgateway eingetragen haben. Ein Router ist aktiv (Master), der zweite überwacht ihn über Hello-Nachrichten. Fällt der Master aus, übernimmt der Backup-Router die virtuelle Adresse; die Clients müssen nichts ändern.
>
> **c)**
>
> | Nr. | Quelle | Ziel | Dienst | Aktion |
> |---|---|---|---|---|
> | 1 | 10.44.8.192/27 | 10.0.0.0/8 | any | deny (log) |
> | 2 | 10.44.8.192/27 | any | TCP 80, 443; UDP 53 zum DNS | allow |
> | 3 | any | any | any | deny (Standardregel) |
>
> Regeln werden von oben nach unten geprüft, die erste passende gilt – die spezifische Sperre muss **vor** der allgemeinen Freigabe stehen, sonst würde Regel 2 auch interne Ziele erlauben.
>
> **Bewertungshinweise:** a) SPOF-Erläuterung 4 P, je Maßnahme 2 P · b) virtuelle Adresse 3 P, Rollen/Überwachung 3 P, Übernahme 3 P · c) je Regel 3 P, Begründung Reihenfolge 2 P.

### Aufgabe 4 – Diagnose und Zugriffsschutz (25 Punkte)

Ein Arbeitsplatz hat Link, IP-Adresse und Gateway. Webzugriffe scheitern. Ein Mitschnitt zeigt wiederholte DNS-Anfragen ohne Antwort; ein zweiter Client im selben VLAN funktioniert.

**a) (8 P)** Beschreiben Sie eine systematische Diagnosefolge, mit der die DNS-Anfragen vom betroffenen Client bis zum DNS-Dienst überprüft werden.

**b) (9 P)** Nennen Sie drei mögliche Ursachen für den beschriebenen Fehler und geben Sie zu jeder Ursache einen geeigneten Prüfschritt an.

**c) (8 P)** Beschreiben Sie zwei Maßnahmen, mit denen ein öffentlich zugänglicher Switchport gegen den Anschluss nicht autorisierter Geräte abgesichert werden kann. Erläutern Sie außerdem zwei Grenzen dieser Maßnahmen.

> [!success]- Lösung Aufgabe 4
> **a)** DNS-Konfiguration mit dem funktionierenden Client vergleichen → DNS-Server per IP anpingen → gezielte Abfrage (`nslookup name server-ip`) → Mitschnitt am Server bzw. an der Firewall: kommt die Anfrage an, geht eine Antwort zurück? → Firewall-/ACL-Protokolle auf UDP/TCP 53 prüfen → nach Korrektur erneut testen und dokumentieren.
>
> **b)** Falscher DNS-Server am Client (statisch eingetragen) – Konfiguration vergleichen · Host-Firewall oder Sicherheitssoftware blockiert ausgehend Port 53 – Regeln prüfen, testweise deaktivieren · DNS-Server beantwortet Anfragen dieser IP nicht (ACL/Rate-Limit, falsches Subnetz in der Freigabe) – Serverkonfiguration und Log prüfen.
>
> **c)** **Port Security** (maximal eine MAC-Adresse, Sticky-Learning, Port bei Verstoß abschalten) · **IEEE 802.1X** mit RADIUS (Authentifizierung per Zertifikat) · ungenutzte Ports deaktivieren bzw. in ein isoliertes VLAN legen. Grenzen: MAC-Adressen lassen sich fälschen · Gerätewechsel verursacht Verwaltungsaufwand · Geräte ohne 802.1X-Unterstützung (Drucker) brauchen Ausnahmen (MAB), die wieder angreifbar sind.
>
> **Bewertungshinweise:** a) logische Reihenfolge 4 P, mindestens vier sinnvolle Schritte 4 P · b) je Ursache mit Prüfschritt 3 P · c) je Maßnahme 2 P, je Grenze 2 P.

---

## Teil 3 – Wirtschafts- und Sozialkunde

**60 Minuten · 30 Aufgaben · Hilfsmittel: nicht programmierbarer Taschenrechner.** [[WiSo Probeprüfung 1|WiSo-Teil öffnen]]

Nachbereitung: [[AP2 FISI Fehlerlog]] · Prüfungsübersicht: [[Uebersicht FISI AP2]] · ← [[AP2 FISI Start]]
