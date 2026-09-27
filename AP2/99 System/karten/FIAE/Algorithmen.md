---
bereich: Algorithmen
tags: [ap2/kartenquelle, ap2/fiae]
---
# Kartenquelle Algorithmen

> [!warning] Hier stehen die Antworten
> Zum Lernen [[Karten Algorithmen]] öffnen. Diese Datei ist nur zum Bearbeiten und Ergänzen da – Format: `Frage::Antwort`, eine Karte pro Zeile.

#flashcards/ap2/fiae/algorithmen

## FIAE-9 Algorithmen in Pseudocode

Was muss ein Pseudocode in der Prüfung erfüllen?::Eindeutig, vollständig, nachvollziehbar; vorgegebene Signatur und Getter exakt übernehmen
Wie berechnest du einen Durchschnitt sicher?::Summe und Anzahl mitführen, am Ende teilen – vorher Anzahl > 0 prüfen, keine Ganzzahldivision
Womit startest du bei der Maximumsuche?::Mit dem ersten Element (nicht mit 0, falls negative Werte möglich sind)
Wie zählst du Häufigkeiten je Kategorie 1 bis n?::Zählarray der Länge n, Zugriff mit Index kategorie − 1
Wie vergleichst du jedes Element mit seinem Vorgänger?::Schleife ab Index 1, Vergleich von element[i] mit element[i − 1]
Wie filterst du eine Liste?::Neue leere Ergebnisliste, passende Elemente mit add einfügen, Liste zurückgeben
Wie brichst du eine innere Suche ab, sobald ein Konflikt gefunden ist?::Flag (frei = true) und Schleifenbedingung „solange frei“
Wie arbeitet Bubblesort?::Benachbarte Elemente vergleichen und bei falscher Reihenfolge tauschen; nach jedem Durchlauf steht das größte Element am Ende
Laufzeit von Bubblesort?::O(n²)
Wie arbeitet die binäre Suche?::Im sortierten Array die Mitte prüfen und die Hälfte, in der das Ziel nicht liegen kann, verwerfen – O(log n)
Voraussetzung der binären Suche?::Die Daten müssen sortiert sein
Was gehört zu jeder Rekursion?::Eine Abbruchbedingung und ein rekursiver Aufruf, der sich ihr nähert
Nachteil von Rekursion?::Hoher Speicherbedarf auf dem Stack, Gefahr eines Stack Overflow
Was ergibt 437 div 60 und 437 mod 60?::7 und 17
Wie prüfst du, ob eine Zahl gerade ist?::zahl mod 2 == 0

## FIAE-10 Objektorientierte Programmierung umsetzen

Was ist ein Konstruktor?::Methode mit dem Klassennamen, die beim Erzeugen eines Objekts aufgerufen wird und es initialisiert
Warum sind Attribute privat?::Datenkapselung – Zugriff nur über Methoden, die Werte prüfen können
Unterschied Überladen und Überschreiben?::Überladen: gleicher Name, andere Parameter in derselben Klasse · Überschreiben: Unterklasse ersetzt geerbte Methode mit gleicher Signatur
Was ist dynamische Bindung?::Zur Laufzeit wird die Methode des tatsächlichen Objekttyps aufgerufen
Wozu super im Konstruktor der Unterklasse?::Ruft den Konstruktor der Oberklasse auf, um geerbte Attribute zu initialisieren
Unterschied Array und Liste?::Array: feste Größe · Liste (ArrayList): dynamische Größe mit add/remove
Wozu dient eine Map (Dictionary)?::Speichert Schlüssel-Wert-Paare für schnellen Zugriff über den Schlüssel
Wozu try, catch und finally?::try: kritischer Code · catch: Behandlung einer bestimmten Ausnahme · finally: wird immer ausgeführt (Ressourcen freigeben)
Warum spezifische Ausnahmen statt Exception fangen?::Nur erwartete Fehler gezielt behandeln, andere nicht verschlucken
Welcher Datentyp für Geldbeträge?::BigDecimal bzw. Dezimaltyp – oder Cent als Ganzzahl
Wann reicht int nicht mehr?::Über ca. 2,1 Milliarden – dann long
Was ist ein statisches Attribut?::Gehört zur Klasse, nicht zum Objekt – alle Objekte teilen sich den Wert
Was bedeutet Generizität (List`<T>`)?::Klassen/Methoden mit Typparameter – typsicher für verschiedene Datentypen wiederverwendbar

## FIAE-11 Testen und Qualitätssicherung

Nenne die vier Teststufen.::Komponenten-/Unit-Test, Integrationstest, Systemtest, Abnahmetest
Unterschied White-Box- und Black-Box-Test?::White-Box: mit Kenntnis des Codes (Überdeckung) · Black-Box: nur gegen die Spezifikation (Ein-/Ausgaben)
Was fordert die Anweisungsüberdeckung (C0)?::Jede Anweisung wird mindestens einmal ausgeführt
Was fordert die Zweigüberdeckung (C1)?::Jeder Zweig jeder Entscheidung wird mindestens einmal durchlaufen (wahr und falsch)
Was fordert die Pfadüberdeckung?::Jeder mögliche Weg durch den Code wird getestet – bei Schleifen oft unendlich viele
Was sind Äquivalenzklassen?::Gruppen von Eingaben, die das Programm gleich behandeln sollte – je Klasse ein Testfall
Welche Werte testet die Grenzwertanalyse?::Werte direkt an und neben den Grenzen, z. B. 0, 1, 720, 721
Was ist ein Regressionstest?::Wiederholung bestehender Tests nach Änderungen, um neue Fehler in bisher funktionierendem Code zu finden
Was bedeutet das AAA-Muster?::Arrange, Act, Assert
Was ist ein Mock?::Platzhalterobjekt, das eine Abhängigkeit simuliert, damit eine Einheit isoliert getestet werden kann
Was bedeutet F.I.R.S.T. bei Unit-Tests?::Fast, Independent, Repeatable, Self-validating, Timely
Was gehört in eine Testtabelle?::Testfall-Nr., Eingaben, erwartetes Ergebnis (Soll), tatsächliches Ergebnis (Ist), Bewertung
Was ist testgetriebene Entwicklung (TDD)?::Erst den Test schreiben, dann den Code, bis der Test besteht, dann refaktorisieren
Was ist ein Code-Review?::Prüfung des Codes durch andere Entwickler auf Fehler, Lesbarkeit und Einhaltung von Richtlinien

## FIAE-12 SQL für Entwickler

In welcher Reihenfolge wird ein SELECT logisch ausgewertet?::FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY
Unterschied INNER JOIN und LEFT JOIN?::INNER: nur passende Zeilen beider Tabellen · LEFT: alle Zeilen der linken Tabelle, fehlende rechte Werte als NULL
Wie findest du Datensätze ohne Partner?::LEFT JOIN und WHERE rechts.Schlüssel IS NULL (oder NOT IN / NOT EXISTS)
Warum muss jede Spalte im SELECT bei GROUP BY gruppiert oder aggregiert sein?::Sonst ist unklar, welcher Wert der Gruppe ausgegeben werden soll
Wie prüfst du auf NULL?::Mit IS NULL bzw. IS NOT NULL – nie mit = NULL
Unterschied COUNT(*) und COUNT(spalte)?::COUNT(*) zählt alle Zeilen, COUNT(spalte) nur Zeilen, in denen die Spalte nicht NULL ist
Unterschied UNION und UNION ALL?::UNION entfernt Duplikate, UNION ALL behält sie (schneller)
Wie kopierst du Datensätze in eine Archivtabelle?::INSERT INTO archiv SELECT … FROM tabelle WHERE …
Warum Archivierung in einer Transaktion?::INSERT und DELETE gelingen nur gemeinsam – keine verlorenen oder doppelten Datensätze
Welche SQL-Befehle gehören zur DML?::INSERT, UPDATE, DELETE (und SELECT)
Welche Befehle gehören zur DDL?::CREATE, ALTER, DROP
Welche Befehle gehören zur DCL?::GRANT, REVOKE
Wie fügst du eine Spalte hinzu?::ALTER TABLE tabelle ADD spalte TYP
Was passiert bei UPDATE ohne WHERE?::Alle Zeilen der Tabelle werden geändert
Was ist ein Trigger?::Automatisch ausgeführter Code bei INSERT, UPDATE oder DELETE auf einer Tabelle
Was ist eine Stored Procedure?::In der Datenbank gespeicherte, aufrufbare Folge von SQL-Anweisungen
