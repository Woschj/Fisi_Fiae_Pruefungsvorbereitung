---
tags: [ap2/probepruefung, ap2/fisi]
fachrichtung: FISI
---
# FISI · AP2-Probeprüfung 1

> [!info] Durchführung
> Bearbeiten Sie die Prüfungsteile unter den angegebenen Zeitvorgaben. Nutzen Sie für Berechnungen ein Konzeptblatt und öffnen Sie die Lösungshinweise erst nach Abschluss des jeweiligen Prüfungsteils. Tragen Sie anschließend Ihre erreichten Punkte im Dashboard ein. Szenarien und Zahlenwerte sind eigens für diese Probeprüfung erstellt.

## Teil 1 – Konzeption und Administration von IT-Systemen

> [!abstract] Ausgangssituation
> Die **Nordlicht Energie GmbH** betreibt eine Zentrale und drei Außenstellen. 120 Mitarbeitende nutzen virtualisierte Server und mobile Dienstgeräte. Die IT plant den Umzug in einen neuen Serverraum und möchte Ausfälle begrenzen.

**90 Minuten · 4 Aufgaben à 25 Punkte · Hilfsmittel: Taschenrechner**

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FISI Probeprüfung 1 – Konzeption und Administration", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – Verfügbarkeit und Auslegung (25 Punkte)

**a) (8 P)** Ein für den Betrieb benötigter Dienst war innerhalb eines Monats mit 30 Tagen insgesamt drei Stunden nicht verfügbar. Berechnen Sie die Verfügbarkeit des Dienstes in Prozent und beurteilen Sie, ob ein vereinbartes SLA von 99,5 % eingehalten wurde.

**b) (9 P)** Ein Server ist mit zwei redundant betriebenen Netzteilen mit jeweils 750 W ausgestattet. Seine maximale Leistungsaufnahme beträgt 610 W. Erläutern Sie, welche Leistung bei Ausfall eines Netzteils weiterhin zur Verfügung steht, und prüfen Sie, ob dabei eine Leistungsreserve von mindestens 20 % verbleibt.

**c) (8 P)** Erläutern Sie die Begriffe RTO und RPO. Geben Sie für das Warenwirtschaftssystem jeweils ein Beispiel für einen möglichen Zielwert an.

> [!success]- Lösung Aufgabe 1
> **a)** Gesamtzeit: 720 h. Verfügbarkeit: (720 − 3) / 720 × 100 = **99,58 %**. SLA eingehalten.
>
> **b)** Im Redundanzbetrieb muss ein Netzteil die Last allein tragen: 750 W. Für 20 % Reserve darf die Last 600 W nicht überschreiten. Bei 610 W wird die Reserve knapp verfehlt. Zwei Netzteile ergeben im Redundanzbetrieb nicht automatisch 1 500 W nutzbare Last.
>
> **c)** **RTO** ist die maximal tolerierte Wiederherstellungszeit, z. B. vier Stunden. **RPO** ist der maximal tolerierte Datenverlust in Zeit, z. B. höchstens 30 Minuten. Die Werte werden aus Geschäftsanforderungen abgeleitet und durch Restore-Tests überprüft.

### Aufgabe 2 – Sicherung und Wiederanlauf (25 Punkte)

Die Datenbank umfasst 800 GB. Sonntags wird voll gesichert. Von Montag bis Samstag fallen täglich 18 GB Änderungen an; werktags wird inkrementell gesichert.

**a) (8 P)** Geben Sie an, welche Sicherungssätze in welcher Reihenfolge benötigt werden, um den Datenbestand nach der inkrementellen Sicherung am Donnerstag wiederherzustellen.

**b) (7 P)** Berechnen Sie den gesamten Speicherbedarf für die Vollsicherung am Sonntag und die bis einschließlich Donnerstag erstellten Inkremente. Berücksichtigen Sie keine Kompression und keine Metadaten.

**c) (10 P)** Entwickeln Sie für das Warenwirtschaftssystem ein Sicherungskonzept nach der 3-2-1-Regel, das mindestens eine unveränderbare Sicherungskopie enthält. Beschreiben Sie außerdem, wie Sie die Wiederherstellbarkeit regelmäßig überprüfen.

> [!success]- Lösung Aufgabe 2
> **a)** Vollsicherung Sonntag plus Inkremente Montag, Dienstag, Mittwoch und Donnerstag: fünf Sätze in dieser Reihenfolge.
>
> **b)** 800 + 4 × 18 = **872 GB** (ohne Kompression und Metadaten).
>
> **c)** Drei Kopien auf zwei Medientypen, davon eine außer Haus. Beispielsweise Produktivspeicher, lokales Backup-Appliance und verschlüsselte externe Speicherung. Eine Kopie wird offline oder mit Object Lock gegen Löschen geschützt. Regelmäßig Stichproben und vollständige Wiederherstellungen testen, Dauer messen und Ergebnisse dokumentieren.

### Aufgabe 3 – Cloud und Datenschutz (25 Punkte)

Die Geschäftsleitung möchte Maildienst und Personalakten zu einem externen Anbieter verlagern.

**a) (8 P)** Ordnen Sie den drei Cloud-Service-Modellen IaaS, PaaS und SaaS jeweils eine passende Leistung zu. Erläutern Sie für jedes Modell, wer Betriebssystem und Anwendung betreibt.

**b) (9 P)** Nennen Sie drei Datenschutz- oder Sicherheitsmaßnahmen, die vor der Verarbeitung der Personalakten zu prüfen beziehungsweise umzusetzen sind.

**c) (8 P)** Vergleichen Sie Public Cloud und Private Cloud anhand von zwei geeigneten Kriterien.

> [!success]- Lösung Aufgabe 3
> **a)** **IaaS**: virtuelle Maschinen; der Kunde verwaltet üblicherweise Betriebssystem und Anwendung. **PaaS**: Anbieter betreibt Plattform und Laufzeit, der Kunde die Anwendung. **SaaS**: Anbieter betreibt die fertige Anwendung; der Kunde verwaltet Nutzer, Berechtigungen und eigene Inhalte.
>
> **b)** Beispiele: Auftragsverarbeitungsvertrag und Weisungsbindung; Speicherorte, Unterauftragnehmer und Drittlandtransfers klären; MFA und rollenbasierte Rechte; Verschlüsselung; Protokollierung; Löschfristen und Wiederherstellungskonzept.
>
> **c)** Public Cloud skaliert schnell und hat geringe Anfangsinvestitionen, bindet aber stärker an Anbieter und Plattform. Private Cloud bietet mehr Kontrolle, benötigt dafür mehr eigenes Betriebswissen und hat meist höhere Fixkosten. Die Auswahl hängt von Schutzbedarf, Vertrag und Betriebskonzept ab.

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

**a) (10 P)** Erstellen Sie eine Trace-Tabelle für alle Werte der Liste und geben Sie die abschließenden Werte von `summe`, `anzahl` sowie die Programmausgabe an.

**b) (7 P)** Ändern Sie die Bedingung so, dass nur Werte größer als 8 addiert werden. Geben Sie die resultierende Summe und Anzahl an.

**c) (8 P)** Ein Linux-Dienst startet nach einem Update nicht mehr. Beschreiben Sie vier systematische Prüfschritte zur Eingrenzung der Fehlerursache.

> [!success]- Lösung Aufgabe 4
> **a)** 12 und 18 sind gerade. Ausgabe: **Summe 30, Anzahl 2**.
>
> | Wert | Bedingung erfüllt? | Summe | Anzahl |
> |---:|---|---:|---:|
> | 7 | nein | 0 | 0 |
> | 12 | ja | 12 | 1 |
> | 5 | nein | 12 | 1 |
> | 18 | ja | 30 | 2 |
> | 9 | nein | 30 | 2 |
>
> **b)** Bei Bedingung „größer als 8“ ergibt sich 12 + 18 + 9 = **39**, Anzahl **3**.
>
> **c)** Dienststatus und Exit-Code prüfen; Protokolle zum Fehlerzeitpunkt auswerten; Konfiguration und Berechtigungen kontrollieren; Abhängigkeiten, Ports und Speicherplatz prüfen; Paketänderungen nachvollziehen. Vor Eingriffen sichern und Änderung dokumentieren.

---

## Teil 2 – Analyse und Entwicklung von Netzwerken

> [!abstract] Ausgangssituation
> Die Nordlicht Energie GmbH eröffnet einen Standort mit Büro, Technik, Gäste-WLAN und Gebäudesteuerung. Ein zweiter Internetzugang und zentral verwaltete Access Points sollen ergänzt werden. Beide Provideranschlüsse werden zunächst über dieselbe Firewall und dieselbe Gebäudeeinführung geführt.

**90 Minuten · 4 Aufgaben à 25 Punkte · Hilfsmittel: Taschenrechner**

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FISI Probeprüfung 1 – Netzwerke", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – IPv4 und VLAN-Planung (25 Punkte)

Das Netz 10.44.8.0/23 soll lückenlos per VLSM aufgeteilt werden. Bedarf: Büro 110 Hosts, Technik 55 Hosts, Gäste 25 Hosts.

**a) (15 P)** Ermitteln Sie für jedes Teilnetz das passende Präfix sowie Netzadresse, nutzbaren Hostbereich und Broadcastadresse. Achten Sie auf eine lückenlose und überlappungsfreie Aufteilung.

**b) (5 P)** Für ein weiteres Teilnetz werden 14 nutzbare Hostadressen benötigt. Bestimmen Sie das kleinste dafür geeignete Präfix.

**c) (5 P)** Begründen Sie, warum das Gäste-WLAN und die Gebäudesteuerung in getrennten VLANs betrieben werden sollten.

> [!success]- Lösung Aufgabe 1
> **a)**
>
> | Netz | Präfix | Netzadresse | Hostbereich | Broadcast |
> |---|---|---|---|---|
> | Büro | /25 | 10.44.8.0 | 10.44.8.1–10.44.8.126 | 10.44.8.127 |
> | Technik | /26 | 10.44.8.128 | 10.44.8.129–10.44.8.190 | 10.44.8.191 |
> | Gäste | /27 | 10.44.8.192 | 10.44.8.193–10.44.8.222 | 10.44.8.223 |
>
> **b)** /28 stellt 16 Adressen, davon 14 Hostadressen, bereit.
>
> **c)** Gäste sollen nur ins Internet und nicht auf interne Systeme zugreifen. Gebäudesteuerung darf nur mit notwendigen Managementdiensten kommunizieren. VLANs trennen Broadcastbereiche; Firewallregeln begrenzen geroutete Verbindungen.

### Aufgabe 2 – IPv6 und Namensauflösung (25 Punkte)

**a) (8 P)** Kürzen Sie die IPv6-Adresse `2001:0db8:0044:0002:0000:0000:0000:00a5` nach den geltenden Regeln.

**b) (7 P)** Ein Client verfügt über eine IPv6-Adresse, kann jedoch den Namen eines internen Servers nicht auflösen. Nennen Sie vier Prüfpunkte, mit denen die Fehlerursache eingegrenzt werden kann.

**c) (10 P)** Erläutern Sie die Adresskonfiguration mit SLAAC und DHCPv6. Nennen Sie zwei weitere Informationen, die ein Router Advertisement bereitstellen kann.

> [!success]- Lösung Aufgabe 2
> **a)** **2001:db8:44:2::a5**.
>
> **b)** DNS-Server und Suchsuffix kontrollieren; Abfrage mit nslookup/dig ausführen; Erreichbarkeit des DNS-Servers und Firewall prüfen; AAAA-/A-Eintrag sowie Zone prüfen; VPN- oder Split-DNS-Kontext vergleichen.
>
> **c)** Bei SLAAC bildet der Host seine Adresse selbst aus dem angekündigten Präfix. DHCPv6 kann Adressen zustandsbehaftet vergeben oder zusätzliche Informationen bereitstellen. Router Advertisements können Präfix, Default Router und Flags für DHCPv6-Nutzung bekannt geben.

### Aufgabe 3 – Redundanz und Firewall (25 Punkte)

Zwei Provideranschlüsse sind vorhanden. Beide Router hängen am selben Switch; das interne Netz verwendet ein Standardgateway.

**a) (8 P)** Zwei Provideranschlüsse sind vorhanden, verwenden jedoch teilweise gemeinsame Netzinfrastruktur. Erläutern Sie, warum dadurch noch keine ausfallsichere Internetanbindung gewährleistet ist, und nennen Sie zwei geeignete zusätzliche Maßnahmen.

**b) (9 P)** Erläutern Sie die Funktion eines First-Hop-Redundanzprotokolls und beschreiben Sie, wie die Clients bei einem Ausfall des aktiven Routers weiterhin ein Gateway erreichen.

**c) (8 P)** Formulieren Sie zwei Firewallregeln für ein Gäste-VLAN, das den Internetzugriff erlaubt, den Zugriff auf interne Netze jedoch verhindert. Begründen Sie die Reihenfolge der Regeln.

> [!success]- Lösung Aufgabe 3
> **a)** Gemeinsame Ausfallpunkte können Switch, Stromversorgung, Gebäudezuführung oder Firewall sein. Physisch getrennte Leitungswege, redundante Netzkomponenten/Stromversorgung und überwachte Failover-Tests reduzieren das Risiko.
>
> **b)** Ein Protokoll wie VRRP stellt eine virtuelle Gateway-Adresse bereit. Ein Router leitet aktiv weiter; ein zweiter überwacht und übernimmt beim Ausfall. Clients behalten dieselbe Gateway-Adresse.
>
> **c)** Zuerst Gäste zu internen Netzen verweigern und protokollieren. Danach notwendige Verbindungen vom Gäste-VLAN ins Internet erlauben, etwa DNS und Web. Spezifische Sperren müssen vor allgemeinen Freigaben stehen; anschließend gilt die Standardverweigerung.

### Aufgabe 4 – Diagnose und Zugriffsschutz (25 Punkte)

Ein Arbeitsplatz hat Link, IP-Adresse und Gateway. Webzugriffe scheitern. Ein Mitschnitt zeigt wiederholte DNS-Anfragen ohne Antwort; ein zweiter Client im VLAN funktioniert.

**a) (8 P)** Beschreiben Sie eine systematische Diagnosefolge, mit der DNS-Anfragen vom betroffenen Client bis zum DNS-Dienst überprüft werden.

**b) (9 P)** Nennen Sie drei mögliche Ursachen für den beschriebenen Fehler und geben Sie zu jeder Ursache einen geeigneten Prüfschritt an.

**c) (8 P)** Beschreiben Sie zwei Maßnahmen, mit denen ein öffentlich zugänglicher Switchport gegen den Anschluss nicht autorisierter Geräte abgesichert werden kann. Erläutern Sie außerdem zwei Grenzen dieser Maßnahmen.

> [!success]- Lösung Aufgabe 4
> **a)** DNS-Konfiguration mit funktionierendem Client vergleichen; DNS-Server per IP erreichen; UDP/TCP 53 und Firewall prüfen; gezielte Abfrage senden; Serverprotokolle und Mitschnitt auf Ankunft und Antwort prüfen; Namensauflösung danach erneut testen.
>
> **b)** Falscher DNS-Server/Suchsuffix – Konfiguration vergleichen; Firewall/ACL blockiert DNS – Regeln und Portverbindung prüfen; lokaler Resolver defekt – Dienststatus und Clientprotokoll prüfen; falscher Datensatz – autoritative Zone abfragen.
>
> **c)** Access-Modus und vorgesehenes VLAN konfigurieren, maximale MAC-Adressen setzen, Sticky-Learning/Allowlist und Protokollierung aktivieren. Grenzen: MAC-Adressen sind manipulierbar; Gerätewechsel erzeugt Aufwand; Port Security ersetzt keine 802.1X-Authentifizierung und keine Netzsegmentierung.

---

## Teil 3 – Wirtschafts- und Sozialkunde

**60 Minuten · 20 Fragen à 5 Punkte.** [[WiSo Probeprüfung 1|WiSo-Teil öffnen und Antworten anklicken]]

Nachbereitung: [[AP2 FISI Fehlerlog]] · Prüfungsübersicht: [[Uebersicht FISI AP2]] · ← [[AP2 FISI Start]]

