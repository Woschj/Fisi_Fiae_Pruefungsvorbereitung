# FISI/FIAE-Prüfungsvorbereitung (IHK Köln)

Ein Obsidian-Vault zur Vorbereitung auf AP1 und AP2 für Fachinformatiker:innen Systemintegration (FISI) und Anwendungsentwicklung (FIAE), ausgerichtet auf die Prüfungen im Bezirk der IHK Köln (Aufgabensätze bundeseinheitlich von der ZPA Nord-West, Prüfungskatalog ab 2025). Enthalten sind Lernmodule, Aufgaben, interaktive Trainer, Karteikarten und Probeprüfungen. Gemeinsame AP2-Materialien für beide Fachrichtungen liegen unter `AP2/Gemeinsam`.

## Voraussetzungen

- [Obsidian Desktop](https://obsidian.md/download) installieren.
- [Git](https://git-scm.com/downloads) installieren, falls der Vault über GitHub bezogen und aktualisiert werden soll.
- Die interaktiven Module verwenden DataviewJS. Dataview ist im Vault unter `.obsidian/plugins/dataview` enthalten und als Community-Plugin eingetragen. Beim ersten Öffnen kann Obsidian fragen, ob Community-Plugins aktiviert werden dürfen.

## Vault von GitHub klonen

1. Auf GitHub die Vault-Seite öffnen und **Code → HTTPS** auswählen. Die Repository-Adresse sieht etwa so aus: `https://github.com/Woschj/Fisi_Fiae_Pruefungsvorbereitung.git`.
2. Ein Terminal öffnen und in den Ordner wechseln, in dem der Vault gespeichert werden soll.
3. Klonen:

   ```powershell
   git clone https://github.com/Woschj/Fisi_Fiae_Pruefungsvorbereitung.git
   ```

   Der Vault liegt im Repository [Woschj/Fisi_Fiae_Pruefungsvorbereitung](https://github.com/Woschj/Fisi_Fiae_Pruefungsvorbereitung).
4. In Obsidian **Vault öffnen → Als Vault in einem Ordner öffnen** wählen und den eben geklonten Repository-Ordner auswählen.
5. Falls Obsidian den eingeschränkten Modus aktiviert hat, unter **Einstellungen → Community-Plugins** den Modus deaktivieren und Dataview aktivieren. DataviewJS muss in den Dataview-Einstellungen zugelassen sein, damit die interaktiven Module und Probeprüfungen laufen.

> Lernfortschritte und Prüfungsergebnisse werden lokal gespeichert und nicht mit GitHub synchronisiert.

## Vault von GitHub aktualisieren

Im geklonten Ordner ein Terminal öffnen und ausführen:

```powershell
git pull
```

Vorher eigene Änderungen speichern und mit `git status` prüfen, ob lokale Dateien geändert wurden.

## Aufbau und Nutzung

- `AP1/00 Start` und `AP2/00 Start` enthalten die Einstiegsseiten und Übersichten.
- Unter AP2 sind FISI und FIAE getrennt organisiert; `AP2/Gemeinsam` enthält WiSo, Projektarbeit und gemeinsam nutzbare Inhalte.
- Öffne in Obsidian die Startseite der gewünschten Prüfung und folge den internen Wiki-Verknüpfungen.
- Die Probeprüfungen bieten Timer, interaktive Aufgaben, Musterlösungen und Punkteauswertung. Antworten und Fortschritt werden je nach Modul lokal in Obsidian gespeichert.
- Die Handreichungen und formalen Vorgaben der IHK Köln zur Projektarbeit sind nicht im Vault enthalten (Urheberrecht). Links zu den aktuellen Fassungen stehen in `AP2/Gemeinsam/50 Nachschlagen/IHK Köln – offizielle Informationen.md`.

## Offline-Nutzung

Nach dem Klonen liegen Markdown-Notizen und beigefügte Dateien lokal vor. Obsidian kann sie ohne Internet öffnen. Internet wird für GitHub-Aktualisierungen sowie zum Installieren oder Aktualisieren von Obsidian und Plugins benötigt.
