---
tags: [ap2/probepruefung, ap2/fiae]
fachrichtung: FIAE
---
# FIAE · AP2-Probeprüfung 4

> [!info] Durchführung
> Bearbeiten Sie die Prüfungsteile jeweils innerhalb der angegebenen Zeit. Öffnen Sie die Lösungshinweise erst nach Abschluss des jeweiligen Prüfungsteils, bewerten Sie sich anhand der **Bewertungshinweise** und tragen Sie Ihre erreichten Punkte anschließend im Dashboard ein. Andere fachlich richtige Lösungen sind gleichwertig.

## Teil 1 – Planen eines Softwareproduktes

> [!abstract] Ausgangssituation
> Die **LernOrt Rheinland gGmbH** (Köln-Kalk) bietet Weiterbildungskurse in Präsenz und online an. Bisher werden Anmeldungen per E-Mail und Tabellenkalkulation verwaltet. Ihr Ausbildungsbetrieb entwickelt eine Buchungsplattform mit Web-App und REST-Backend.

**90 Minuten · 4 Aufgaben à 25 Punkte · Hilfsmittel: nicht programmierbarer Taschenrechner**

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FIAE Probeprüfung 4 – Planen", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – Projektvorbereitung (25 Punkte)
**a) (4 P)** Vor Projektbeginn wird eine Machbarkeitsanalyse durchgeführt. Nennen Sie vier Aspekte, die dabei geprüft werden.

**b) (6 P)** Der Auftraggeber kann seine Anforderungen noch nicht vollständig beschreiben und möchte früh erste Ergebnisse sehen. Empfehlen Sie ein Vorgehensmodell und begründen Sie Ihre Wahl mit zwei Argumenten. Nennen Sie außerdem einen Nachteil Ihres Modells.

**c) (9 P)** Nennen Sie drei Projektrisiken und je eine geeignete Gegenmaßnahme.

**d) (6 P)** Nennen Sie drei Stakeholder mit je einer Erwartung an das Projekt.

> [!success]- Lösung Aufgabe 1
> **a)** technische Machbarkeit (Know-how, Schnittstellen, Infrastruktur) · wirtschaftliche Machbarkeit (Kosten und Nutzen) · rechtliche Machbarkeit (Datenschutz, Barrierefreiheit, Lizenzen) · personelle und zeitliche Machbarkeit · organisatorische Machbarkeit.
>
> **b)** **Agiles Vorgehen (Scrum):** Anforderungen dürfen sich ändern und werden im Product Backlog priorisiert; nach jedem Sprint entsteht ein nutzbares Inkrement, das im Sprint Review mit dem Auftraggeber besprochen wird; Fehlentwicklungen werden früh erkannt. Nachteil: Gesamtkosten und Endtermin sind zu Beginn schwer festzulegen; der Auftraggeber muss regelmäßig mitarbeiten (Product Owner).
>
> **c)** z. B. Anforderungen ändern sich häufig → agiles Vorgehen, Priorisierung, Change-Request-Verfahren · Ausfall einer Schlüsselperson → Wissen dokumentieren, Pair Programming, Vertretung · Schnittstelle zum Zahlungsdienst schlechter dokumentiert als erwartet → früher Prototyp (Spike) · Terminverzug → Puffer einplanen, MVP definieren · Datenschutzverstoß → Datenschutzbeauftragte früh einbinden.
>
> **d)** Teilnehmende: einfache Buchung auch am Smartphone · Dozierende: aktuelle Teilnehmerlisten · Verwaltung: weniger manueller Aufwand, automatische Rechnungen · Geschäftsführung: Kosten im Budget, mehr Buchungen · Datenschutzbeauftragte: DSGVO-konforme Verarbeitung · Betriebsrat: keine Leistungskontrolle der Beschäftigten.
>
> **Bewertungshinweise:** a) je Aspekt 1 P · b) Modell 2 P, je Argument 1,5 P, Nachteil 1 P · c) je Risiko 1 P, je Maßnahme 2 P · d) je Stakeholder mit Erwartung 2 P.

### Aufgabe 2 – Anforderungen und Anwendungsfälle (25 Punkte)
Für die Plattform ist Folgendes bekannt:
- Teilnehmende können Kurse suchen und einen Kurs buchen. Zu jeder Buchung gehört **immer** die Bezahlung, an der ein externer **Zahlungsdienstleister** beteiligt ist.
- Ist ein Kurs ausgebucht, können sich Teilnehmende bei der Buchung **optional** auf die Warteliste setzen lassen.
- Teilnehmende können eine Buchung stornieren.
- **Mitarbeitende** melden sich am Verwaltungsbereich an. Mitarbeitende sind entweder **Dozierende** oder **Verwaltungskräfte**. Dozierende rufen Teilnehmerlisten ab, Verwaltungskräfte legen Kurse an.

**a) (13 P)** Erstellen Sie ein UML-Anwendungsfalldiagramm mit Systemgrenze, Akteuren, Anwendungsfällen und Beziehungen.

**b) (5 P)** Ordnen Sie zu, ob die Anforderung funktional (F) oder nichtfunktional (NF) ist: (1) Die Plattform versendet nach der Buchung eine Bestätigung per E-Mail. (2) Die Kurssuche liefert Ergebnisse in unter einer Sekunde. (3) Die Plattform ist mit Tastatur und Screenreader bedienbar. (4) Verwaltungskräfte können Kurse als PDF exportieren. (5) Die Verfügbarkeit beträgt 99,5 % im Monat.

**c) (7 P)** Formulieren Sie eine User Story für die Warteliste und zwei prüfbare Akzeptanzkriterien.

> [!success]- Lösung Aufgabe 2
> **a)**
> - **Systemgrenze** „Buchungsplattform“ mit Namen.
> - **Akteure:** Teilnehmende (links), Mitarbeitende mit den Spezialisierungen Dozierende und Verwaltungskraft (**Generalisierungspfeil** mit hohler Dreiecksspitze von Dozierende bzw. Verwaltungskraft zu Mitarbeitende), Zahlungsdienstleister (sekundärer Akteur, rechts).
> - **Anwendungsfälle:** Kurse suchen · Kurs buchen · Bezahlen · Auf Warteliste setzen · Buchung stornieren · Anmelden · Teilnehmerliste abrufen · Kurs anlegen.
> - **Beziehungen:** Teilnehmende – Kurse suchen, Kurs buchen, Buchung stornieren · „Kurs buchen“ **«include»** „Bezahlen“ (Pfeil zu Bezahlen) · Zahlungsdienstleister – Bezahlen · „Auf Warteliste setzen“ **«extend»** „Kurs buchen“ (Pfeil zu Kurs buchen, Bedingung: Kurs ausgebucht) · Mitarbeitende – Anmelden · Dozierende – Teilnehmerliste abrufen · Verwaltungskraft – Kurs anlegen.
>
> **b)** (1) F · (2) NF · (3) NF · (4) F · (5) NF.
>
> **c)** „Als **Interessentin** möchte ich mich bei einem ausgebuchten Kurs **auf die Warteliste setzen**, damit ich **automatisch einen Platz erhalte, wenn jemand storniert**.“ Akzeptanzkriterien: Bei Stornierung erhält die erste Person der Warteliste innerhalb von 5 Minuten eine E-Mail · der Platz wird 48 Stunden reserviert, danach rückt die nächste Person nach · die eigene Position auf der Warteliste wird angezeigt.
>
> **Bewertungshinweise:** a) Systemgrenze 1 P, Akteure 3 P (davon Generalisierung 1 P), Anwendungsfälle 4 P, include/extend mit richtiger Pfeilrichtung 3 P, Assoziationen 2 P · b) je 1 P · c) Story 3 P, je Kriterium 2 P.

### Aufgabe 3 – Schnittstelle und Ablauf (25 Punkte)
Das Backend bietet eine REST-Schnittstelle an.

**a) (8 P)** Geben Sie HTTP-Methode und URL an für: (1) alle Kurse in Köln abrufen, (2) die Details des Kurses 815 abrufen, (3) eine Buchung für Kurs 815 anlegen, (4) die Buchung 4711 stornieren.

**b) (5 P)** Welcher Statuscode passt? (1) Buchung angelegt, (2) Pflichtfeld „E-Mail“ fehlt, (3) kein gültiges Anmeldetoken, (4) Kurs 999 existiert nicht, (5) Kurs ist inzwischen ausgebucht.

**c) (12 P)** Beschreiben Sie ein UML-Sequenzdiagramm für die Buchung mit den Lebenslinien `:WebApp`, `:Backend`, `:Datenbank` und `:Zahlungsdienst`: Die WebApp sendet `buchen(kursNr)`. Das Backend fragt die freien Plätze ab. Sind Plätze frei, lässt es die Zahlung autorisieren, speichert die Buchung und bestätigt der WebApp. Ist der Kurs ausgebucht, erhält die WebApp eine Meldung mit dem Angebot der Warteliste.

> [!success]- Lösung Aufgabe 3
> **a)** (1) `GET /kurse?ort=Koeln` · (2) `GET /kurse/815` · (3) `POST /kurse/815/buchungen` (Daten im Body) · (4) `DELETE /buchungen/4711` (alternativ `PATCH /buchungen/4711` mit Status „storniert“, wenn die Buchung erhalten bleiben soll).
>
> **b)** (1) **201** Created · (2) **400** Bad Request · (3) **401** Unauthorized · (4) **404** Not Found · (5) **409** Conflict.
>
> **c)**
> - Vier Lebenslinien mit Aktivierungsbalken.
> - `buchen(kursNr)` WebApp → Backend (synchrone Nachricht, gefüllte Pfeilspitze).
> - `freiePlaetze(kursNr)` Backend → Datenbank, Antwort `anzahl` (gestrichelter Pfeil).
> - **alt-Fragment** mit den Wächtern `[anzahl > 0]` und `[anzahl = 0]` bzw. `[else]`.
> - Bereich `[anzahl > 0]`: `autorisieren(betrag)` Backend → Zahlungsdienst, Antwort `ok` · `speichereBuchung(...)` Backend → Datenbank · Antwort `bestaetigung` an die WebApp.
> - Bereich `[anzahl = 0]`: Antwort `ausgebucht, Warteliste anbieten` an die WebApp.
>
> **Bewertungshinweise:** a) je Zeile 2 P · b) je 1 P · c) Lebenslinien 2 P, Nachrichten und Antworten 4 P, alt-Fragment mit Wächtern 3 P, Inhalt beider Bereiche 3 P.

### Aufgabe 4 – Entwurf, Barrierefreiheit und Sicherheit (25 Punkte)
**a) (10 P)** Wird ein Platz frei, sollen alle Personen auf der Warteliste eines Kurses benachrichtigt werden, ohne dass die Klasse `Kurs` die konkreten Empfänger kennt. Nennen Sie das passende Entwurfsmuster und beschreiben Sie die benötigten Klassen bzw. Schnittstellen mit ihren wichtigsten Methoden.

**b) (8 P)** Erläutern Sie, warum die Plattform barrierefrei sein muss, und nennen Sie drei konkrete Maßnahmen.

**c) (7 P)** Die Kundenpasswörter sollen gespeichert werden. Beschreiben Sie ein sicheres Verfahren und begründen Sie, warum ein Salt verwendet wird.

> [!success]- Lösung Aufgabe 4
> **a)** **Observer (Beobachter)** – Verhaltensmuster.
> - Schnittstelle `Beobachter` mit `benachrichtigen(kurs : Kurs)`.
> - Klasse `Kurs` (Subjekt) mit einer Liste von Beobachtern sowie `anmelden(b : Beobachter)`, `abmelden(b : Beobachter)` und `benachrichtigeAlle()`, die bei jedem frei werdenden Platz für alle angemeldeten Beobachter `benachrichtigen(this)` aufruft.
> - Konkrete Beobachter, z. B. `WartelistenEintrag` bzw. `EMailBenachrichtigung`, implementieren `Beobachter`.
> - Vorteil: lose Kopplung – neue Benachrichtigungswege (SMS, Push) lassen sich ohne Änderung an `Kurs` ergänzen.
>
> **b)** Das **Barrierefreiheitsstärkungsgesetz (BFSG)** verpflichtet seit dem 28.06.2025 Anbieter von Dienstleistungen im elektronischen Geschäftsverkehr (z. B. Online-Buchung gegenüber Verbraucherinnen und Verbrauchern) zur Barrierefreiheit; Maßstab sind die WCAG-Kriterien (EN 301 549). Außerdem erreicht die Plattform so mehr Menschen. Maßnahmen: Bedienbarkeit per Tastatur mit sichtbarem Fokus · Alternativtexte und korrekte Beschriftung von Formularfeldern · Kontrast von mindestens 4,5 : 1 · skalierbare Schrift ohne Informationsverlust · Fehlermeldungen als Text und nicht nur über Farbe · keine Zeitlimits bzw. verlängerbare Zeitlimits.
>
> **c)** Passwörter **nie im Klartext** oder umkehrbar verschlüsselt speichern, sondern mit einem **langsamen Passwort-Hashverfahren** (Argon2id, bcrypt oder PBKDF2 mit vielen Iterationen) und einem **zufälligen Salt je Benutzer**. Salt und Hash werden gespeichert; beim Login wird die Eingabe mit demselben Salt gehasht und verglichen. Das Salt sorgt dafür, dass gleiche Passwörter unterschiedliche Hashes ergeben und vorberechnete Tabellen (Rainbow Tables) nutzlos werden; das langsame Verfahren erschwert Brute-Force-Angriffe.
>
> **Bewertungshinweise:** a) Muster 2 P, Schnittstelle 2 P, Subjekt mit Methoden 4 P, konkreter Beobachter 2 P · b) Begründung 2 P, je Maßnahme 2 P · c) Verfahren 4 P, Begründung Salt 3 P.

---

## Teil 2 – Entwicklung und Umsetzung von Algorithmen

> [!abstract] Ausgangssituation
> Sie entwickeln Teile des Backends der Buchungsplattform. Andere, gleichwertige Lösungen in Pseudocode oder einer gängigen Programmiersprache sind ebenfalls richtig.

**90 Minuten · 4 Aufgaben à 25 Punkte · Hilfsmittel: nicht programmierbarer Taschenrechner**

```dataviewjs
await dv.view("AP2/99 System/views/pruefung", { name: "FIAE Probeprüfung 4 – Algorithmen", aufgaben: [25, 25, 25, 25], minuten: 90 })
```

### Aufgabe 1 – Auslastung berechnen (25 Punkte)
Gegeben sind folgende Klassen:

<pre>
Kurs                               Buchung
- kursNr : Integer                 - kursNr : Integer
- plaetze : Integer                - status : String   // "bestätigt", "storniert", "warteliste"
+ getKursNr() : Integer            + getKursNr() : Integer
+ getPlaetze() : Integer           + getStatus() : String
</pre>

**a) (14 P)** Entwickeln Sie in Pseudocode die Methode `auslastung(kurs : Kurs, buchungen : List<Buchung>) : Double`. Sie liefert den Anteil der **bestätigten** Buchungen des Kurses an den Plätzen in Prozent. Hat der Kurs keine Plätze, wird 0 zurückgegeben.

**b) (11 P)** Entwickeln Sie in Pseudocode die Methode `ausgebucht(kurse : Kurs[], buchungen : List<Buchung>) : List<Kurs>`. Sie liefert alle Kurse mit einer Auslastung von mindestens 100 %. Verwenden Sie die Methode aus a).

> [!success]- Lösung Aufgabe 1
> **a)**
> <pre>
> METHODE auslastung(kurs : Kurs, buchungen : List&lt;Buchung&gt;) : Double
>     WENN kurs.getPlaetze() = 0 DANN
>         RÜCKGABE 0
>     ENDE WENN
>     anzahl : Integer ← 0
>     FÜR i ← 0 BIS buchungen.size() − 1
>         b ← buchungen.get(i)
>         WENN b.getKursNr() = kurs.getKursNr() UND b.getStatus() = "bestätigt" DANN
>             anzahl ← anzahl + 1
>         ENDE WENN
>     ENDE FÜR
>     RÜCKGABE anzahl * 100.0 / kurs.getPlaetze()
> ENDE METHODE
> </pre>
>
> **b)**
> <pre>
> METHODE ausgebucht(kurse : Kurs[], buchungen : List&lt;Buchung&gt;) : List&lt;Kurs&gt;
>     ergebnis ← new List&lt;Kurs&gt;()
>     FÜR i ← 0 BIS kurse.length − 1
>         WENN auslastung(kurse[i], buchungen) >= 100 DANN
>             ergebnis.add(kurse[i])
>         ENDE WENN
>     ENDE FÜR
>     RÜCKGABE ergebnis
> ENDE METHODE
> </pre>
>
> **Bewertungshinweise:** a) Signatur 1 P, Prüfung auf 0 Plätze 2 P, Initialisierung 1 P, Schleife 3 P, Bedingung mit beiden Teilen 4 P, Berechnung ohne Ganzzahldivision 3 P · b) Ergebnisliste 2 P, Schleife 3 P, Aufruf aus a) mit Vergleich 4 P, Rückgabe 2 P.

### Aufgabe 2 – Objektorientierung (25 Punkte)
Das Klassenmodell sieht vor: Die **abstrakte** Klasse `Kurs` hat die privaten Attribute `titel : String` und `grundpreis : Double`, einen Konstruktor, `getGrundpreis() : Double` und die abstrakte Methode `preis() : Double`. `Praesenzkurs` erbt von `Kurs` und hat zusätzlich `raumkosten : Double`; sein Preis ist Grundpreis plus Raumkosten. `Onlinekurs` erbt ebenfalls von `Kurs`; sein Preis beträgt 80 % des Grundpreises.

**a) (10 P)** Implementieren Sie die Klassen `Kurs` und `Praesenzkurs` einschließlich der Konstruktoren in einer objektorientierten Programmiersprache oder in Pseudocode.

**b) (5 P)** Eine Liste enthält einen Präsenzkurs (Grundpreis 200 €, Raumkosten 40 €) und einen Onlinekurs (Grundpreis 200 €). Berechnen Sie die Summe von `preis()` über alle Elemente der Liste und erklären Sie, welches OOP-Prinzip dabei wirkt.

**c) (4 P)** Erklären Sie, warum von `Kurs` kein Objekt erzeugt werden kann und welchen Vorteil die abstrakte Methode hat.

**d) (6 P)** Ein Kurs besteht aus Terminen, die ohne den Kurs nicht existieren. Ein Kurs wird von Dozierenden geleitet, die auch unabhängig vom Kurs im System bleiben. Benennen Sie beide Beziehungsarten und ihre UML-Darstellung.

> [!success]- Lösung Aufgabe 2
> **a)** (Java)
> <pre>
> public abstract class Kurs {
>     private String titel;
>     private double grundpreis;
>
>     public Kurs(String titel, double grundpreis) {
>         this.titel = titel;
>         this.grundpreis = grundpreis;
>     }
>     public double getGrundpreis() { return grundpreis; }
>     public abstract double preis();
> }
>
> public class Praesenzkurs extends Kurs {
>     private double raumkosten;
>
>     public Praesenzkurs(String titel, double grundpreis, double raumkosten) {
>         super(titel, grundpreis);
>         this.raumkosten = raumkosten;
>     }
>     @Override
>     public double preis() { return getGrundpreis() + raumkosten; }
> }
> </pre>
>
> **b)** Präsenzkurs 200 + 40 = 240 €, Onlinekurs 200 × 0,8 = 160 € → **400 €**. **Polymorphie mit dynamischer Bindung:** Der Aufruf `preis()` über den Typ `Kurs` führt zur Laufzeit die Methode der tatsächlichen Klasse aus.
>
> **c)** `Kurs` ist **abstrakt** – sie enthält eine Methode ohne Implementierung, ein Objekt wäre unvollständig. Die abstrakte Methode **erzwingt**, dass jede Unterklasse `preis()` implementiert, und ermöglicht den einheitlichen Aufruf über die Oberklasse.
>
> **d)** Kurs – Termin: **Komposition** (gefüllte Raute am Kurs, Termine existieren nur mit dem Kurs). Kurs – Dozierende: **Assoziation** bzw. **Aggregation** (hohle Raute am Kurs), Dozierende existieren unabhängig.
>
> **Bewertungshinweise:** a) abstrakte Klasse mit Attributen und Konstruktor 4 P, abstrakte Methode 1 P, Vererbung 1 P, Konstruktor mit super 2 P, preis() 2 P · b) Ergebnis 3 P, Prinzip 2 P · c) je Aussage 2 P · d) je Beziehung mit Darstellung 3 P.

### Aufgabe 3 – SQL (25 Punkte)
Gegeben ist folgendes Tabellenmodell (Primärschlüssel unterstrichen, Fremdschlüssel mit #):

- **Kurs** (<u>KursNr</u>, Titel, Plaetze, Preis, Beginn)
- **Teilnehmer** (<u>TnNr</u>, Name, Email, Ort)
- **Buchung** (<u>BuchungNr</u>, #KursNr, #TnNr, Datum, Status)

**a) (3 P)** Legen Sie die Teilnehmerin Nr. 1207, Aylin Demir, aylin.demir@example.org, aus Hürth an.

**b) (5 P)** Geben Sie Titel und Beginn der Kurse sowie die Namen der Teilnehmenden für alle **bestätigten** Buchungen von Kursen aus, die ab dem 01.10.2026 beginnen, sortiert nach Beginn.

**c) (6 P)** Geben Sie für jeden **ausgebuchten** Kurs die KursNr, den Titel und die Anzahl der bestätigten Buchungen aus. Ein Kurs ist ausgebucht, wenn die Anzahl bestätigter Buchungen mindestens der Anzahl der Plätze entspricht.

**d) (5 P)** Geben Sie Name und E-Mail aller Teilnehmenden aus, die noch **keine** Buchung haben.

**e) (3 P)** Erhöhen Sie die Preise aller Kurse, die im Jahr 2027 beginnen, um 5 %.

**f) (3 P)** Der Datenbankbenutzer `webportal` soll Kurse nur lesen, aber Buchungen lesen und anlegen dürfen. Vergeben Sie die Rechte.

> [!success]- Lösung Aufgabe 3
> <pre>
> -- a)
> INSERT INTO Teilnehmer (TnNr, Name, Email, Ort)
> VALUES (1207, 'Aylin Demir', 'aylin.demir@example.org', 'Hürth');
>
> -- b)
> SELECT k.Titel, k.Beginn, t.Name
> FROM Buchung b
> JOIN Kurs k ON b.KursNr = k.KursNr
> JOIN Teilnehmer t ON b.TnNr = t.TnNr
> WHERE b.Status = 'bestätigt' AND k.Beginn >= '2026-10-01'
> ORDER BY k.Beginn;
>
> -- c)
> SELECT k.KursNr, k.Titel, COUNT(b.BuchungNr) AS Anzahl
> FROM Kurs k
> JOIN Buchung b ON b.KursNr = k.KursNr
> WHERE b.Status = 'bestätigt'
> GROUP BY k.KursNr, k.Titel, k.Plaetze
> HAVING COUNT(b.BuchungNr) >= k.Plaetze;
>
> -- d)
> SELECT t.Name, t.Email
> FROM Teilnehmer t
> LEFT JOIN Buchung b ON b.TnNr = t.TnNr
> WHERE b.BuchungNr IS NULL;
>
> -- e)
> UPDATE Kurs SET Preis = Preis * 1.05
> WHERE Beginn BETWEEN '2027-01-01' AND '2027-12-31';
>
> -- f)
> GRANT SELECT ON Kurs TO webportal;
> GRANT SELECT, INSERT ON Buchung TO webportal;
> </pre>
>
> **Bewertungshinweise:** a) 3 P · b) Joins 2 P, Bedingungen 2 P, Sortierung 1 P · c) Join und WHERE 2 P, GROUP BY 2 P, HAVING 2 P · d) LEFT JOIN 3 P, IS NULL 2 P (alternativ NOT IN/NOT EXISTS) · e) 3 P · f) je Anweisung 1,5 P.

### Aufgabe 4 – Testen (25 Punkte)
Für Kursgebühren wird ein Rabatt in Prozent berechnet:

<pre>
FUNKTION rabatt(alter : Integer, istMitglied : Boolean) : Integer
    WENN alter < 0 ODER alter > 120 DANN
        WIRF Fehler("ungültiges Alter")
    ENDE WENN
    r ← 0
    WENN alter < 18 ODER alter >= 65 DANN
        r ← 20
    ENDE WENN
    WENN istMitglied DANN
        r ← r + 10
    ENDE WENN
    RÜCKGABE r
ENDE FUNKTION
</pre>

**a) (6 P)** Bilden Sie die Äquivalenzklassen für den Parameter `alter` und geben Sie den jeweils erwarteten Rabatt ohne Mitgliedschaft an.

**b) (6 P)** Geben Sie alle Grenzwerte an, die bei der Grenzwertanalyse für `alter` getestet werden.

**c) (7 P)** Geben Sie eine minimale Menge von Testfällen (alter, istMitglied, erwartetes Ergebnis) für die **Zweigüberdeckung** an.

**d) (6 P)** Schreiben Sie zwei Unit-Tests für die Funktion, davon einen für den Fehlerfall.

> [!success]- Lösung Aufgabe 4
> **a)** ungültig: alter < 0 → Fehler · gültig 0–17 → 20 % · gültig 18–64 → 0 % · gültig 65–120 → 20 % · ungültig: alter > 120 → Fehler.
>
> **b)** −1, 0 · 17, 18 · 64, 65 · 120, 121.
>
> **c)** Drei Testfälle genügen:
>
> | Nr. | alter | istMitglied | erwartet | Zweige |
> |---:|---:|---|---|---|
> | 1 | −1 | false | Fehler | Bedingung 1 wahr |
> | 2 | 10 | true | 30 | B1 falsch, B2 wahr, B3 wahr |
> | 3 | 30 | false | 0 | B1 falsch, B2 falsch, B3 falsch |
>
> **d)** (Java/JUnit)
> <pre>
> @Test
> void seniorMitMitgliedschaftErhaelt30Prozent() {
>     assertEquals(30, Rabattrechner.rabatt(65, true));
> }
>
> @Test
> void negativesAlterLoestFehlerAus() {
>     assertThrows(IllegalArgumentException.class, () -> Rabattrechner.rabatt(-1, false));
> }
> </pre>
>
> **Bewertungshinweise:** a) je Klasse 1 P, erwartete Werte 1 P · b) je Grenzpaar 1,5 P · c) je Testfall 2 P, Minimalität 1 P · d) je Test 3 P.

---

## Teil 3 – Wirtschafts- und Sozialkunde
**60 Minuten · 30 Aufgaben · Hilfsmittel: nicht programmierbarer Taschenrechner.** [[WiSo Probeprüfung 4|WiSo-Teil öffnen]]

Nachbereitung: [[AP2 FIAE Fehlerlog]] · ← [[AP2 FIAE Start]]
