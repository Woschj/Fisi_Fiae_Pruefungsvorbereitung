---
modul: S4
titel: Betriebssysteme, Dateisysteme und Rechte
bereich: Software
reihenfolge: 17
dauer: 120
status: neu
sicherheit: 0
zuletzt:
berufsschule: "Evp-CPS · LF7 (Linux/Raspberry Pi) – Grundlagen aus der Praxis im Betrieb"
tags: [ap1/modul, ap1/software]
---
# S4 · Betriebssysteme, Dateisysteme und Rechte

> [!abstract] Überblick
> **Bereich:** [[Übersicht Software]]
> **Dauer:** ca. 2 h · **Prüfungsrelevanz:** ★★☆ – Installation planen, Dateisystem wählen, Rechte vergeben
> **Voraussetzungen:** [[H1 PC-Komponenten und Arbeitsplatzgeräte]], [[S1 Zahlensysteme und Codierung]] (Oktal für Linux-Rechte)

## Lernziele
- [ ] Ich kann Aufgaben eines Betriebssystems nennen und Betriebssysteme für Einsatzzwecke auswählen.
- [ ] Ich kann MBR und GPT, BIOS und UEFI vergleichen und Secure Boot erklären.
- [ ] Ich kann Dateisysteme (NTFS, FAT32, exFAT, ext4, APFS) nach Einsatz auswählen.
- [ ] Ich kann NTFS- und Freigaberechte kombinieren und Linux-Rechte in Oktal umrechnen.
- [ ] Ich kann den Rollout eines Arbeitsplatzes planen (Image, Softwareverteilung, Checkliste).

## Worum geht es?
25 neue Notebooks sollen einsatzbereit sein – mit Windows, Office, Fachsoftware, Druckern und den richtigen Rechten auf die Abteilungslaufwerke. Niemand installiert das 25-mal von Hand. Außerdem soll die Buchhaltung ihren Ordner lesen und schreiben, der Vertrieb ihn aber gar nicht sehen.

---

## 1. Aufgaben eines Betriebssystems
- **Prozessverwaltung** (Multitasking, Scheduling)
- **Speicherverwaltung** (RAM zuteilen, virtueller Speicher/Auslagerung)
- **Dateiverwaltung** (Dateisysteme)
- **Geräteverwaltung** über **Treiber**
- **Benutzer- und Rechteverwaltung**, Sicherheit
- **Benutzeroberfläche** (GUI/CLI) und **Schnittstellen (APIs)** für Anwendungen
- **Netzwerkfunktionen**

| Betriebssystem | typischer Einsatz |
|---|---|
| Windows 11 (Pro/Enterprise) | Büroarbeitsplätze, Domänenintegration, Fachsoftware |
| Windows Server | Active Directory, Datei-/Druckserver, Terminalserver |
| Linux (Debian, Ubuntu, RHEL …) | Server, Web, Container, Netzwerktechnik, Raspberry Pi; Open Source, lizenzkostenfrei |
| macOS | Grafik/Medien, Entwicklung |
| Android/iOS | Smartphones, Tablets (verwaltet per MDM) |

**Editionen beachten:** Windows **Home** kann **keiner Domäne beitreten** und hat kein BitLocker/Gruppenrichtlinien → im Unternehmen **Pro** oder **Enterprise**.

**Lebenszyklus:** Betriebssysteme bekommen nur für begrenzte Zeit Sicherheitsupdates (**End of Life/Support-Ende**). Ein System nach Support-Ende ist ein Sicherheitsrisiko → rechtzeitig migrieren.

---

## 2. Start des Systems – Firmware und Partitionierung

| | **BIOS (Legacy)** | **UEFI** |
|---|---|---|
| Oberfläche | textbasiert | grafisch, Maus |
| Partitionsschema | **MBR** | **GPT** |
| Sicherheit | – | **Secure Boot**: nur signierte Bootloader werden gestartet (Schutz vor Bootkits) |
| Start | langsamer | schneller |

| | **MBR** (Master Boot Record) | **GPT** (GUID Partition Table) |
|---|---|---|
| max. Laufwerksgröße | **2 TiB** | praktisch unbegrenzt (9,4 ZB) |
| Partitionen | 4 primäre (oder 3 primäre + 1 erweiterte mit logischen) | 128 (Windows) |
| Ausfallsicherheit | eine Kopie am Anfang | Kopie der Tabelle am Ende + Prüfsummen |

Windows 11 setzt **UEFI, Secure Boot und TPM 2.0** voraus.

## 3. Dateisysteme

| Dateisystem | Betriebssystem | max. Dateigröße | Rechte | Journaling | Einsatz |
|---|---|---|---|---|---|
| **NTFS** | Windows | riesig | ✅ ACLs | ✅ | Systemlaufwerk Windows, Server; Kompression, Verschlüsselung (EFS), Schattenkopien |
| **FAT32** | alle | **4 GiB** | ❌ | ❌ | alte USB-Sticks, UEFI-Bootpartition |
| **exFAT** | alle | riesig | ❌ | ❌ | USB-Sticks, SD-Karten, externe Platten zum Datenaustausch |
| **ext4** | Linux | 16 TiB | ✅ (rwx) | ✅ | Linux-Standard |
| **Btrfs / ZFS** | Linux/NAS | | ✅ | Copy-on-Write | Snapshots, Prüfsummen (NAS, Server) |
| **APFS** | macOS | | ✅ | Copy-on-Write | Apple, Snapshots, Verschlüsselung |

**Journaling:** Änderungen werden erst protokolliert, dann ausgeführt → nach einem Absturz bleibt das Dateisystem konsistent.

> [!question]- Kurz nachgedacht: Warum lässt sich eine 6-GB-Videodatei nicht auf einen neuen USB-Stick kopieren, obwohl 32 GB frei sind?
> Der Stick ist mit **FAT32** formatiert – maximal **4 GiB pro Datei**. Lösung: Stick mit **exFAT** (oder NTFS) formatieren.

---

## 4. Benutzer, Gruppen und Rechte

**Grundsätze:**
- **Least Privilege** (Prinzip der minimalen Rechte): jeder nur so viel, wie für die Arbeit nötig
- Rechte an **Gruppen** vergeben, nicht an einzelne Benutzer (AGDLP-Prinzip im Active Directory: Accounts → Global Groups → Domain Local Groups → Permissions)
- **Keine Arbeit mit Administratorrechten** im Alltag; separates Admin-Konto
- **Need-to-know**, regelmäßige Überprüfung, Rechte bei Abteilungswechsel/Austritt entziehen

### Windows – NTFS- und Freigaberechte
| NTFS-Recht | erlaubt |
|---|---|
| Lesen | Inhalte und Attribute anzeigen |
| Lesen, Ausführen | + Programme starten |
| Ordnerinhalt anzeigen | Liste der Dateien |
| Schreiben | Dateien anlegen, ändern (nicht löschen) |
| **Ändern** | Lesen + Schreiben + **Löschen** |
| **Vollzugriff** | + Rechte ändern, Besitz übernehmen |

- **Vererbung:** Unterordner übernehmen die Rechte des übergeordneten Ordners (kann unterbrochen werden)
- **Verweigern** schlägt **Zulassen**
- Zugriff über das Netzwerk: **Freigaberecht UND NTFS-Recht** werden geprüft → **das restriktivere gilt**. Praxis: Freigabe „Jeder/Authentifizierte Benutzer: Vollzugriff“, die eigentliche Steuerung per NTFS.

> [!example] Beispiel
> Freigabe „Buchhaltung“: Freigaberecht *Lesen* · NTFS für Gruppe Buchhaltung: *Ändern*
> → Über das Netzwerk darf die Buchhaltung nur **lesen** (restriktiver gewinnt). Lokal am Server hätte sie *Ändern*.

### Linux – rwx und Oktalschreibweise
Drei Rechte (**r**ead = 4, **w**rite = 2, e**x**ecute = 1) für drei Kategorien: **Besitzer (u)**, **Gruppe (g)**, **Andere (o)**.

`-rwxr-x---` → Besitzer rwx = 4+2+1 = **7** · Gruppe r-x = 4+1 = **5** · Andere --- = **0** → `chmod 750 datei`

| Oktal | Rechte | typisch für |
|---|---|---|
| 755 | rwxr-xr-x | Programme, Verzeichnisse |
| 644 | rw-r--r-- | normale Dateien |
| 700 | rwx------ | privates Verzeichnis |
| 600 | rw------- | private Schlüssel (SSH) |
| 777 | rwxrwxrwx | **vermeiden!** – jeder darf alles |

Bei Verzeichnissen bedeutet `x` „betreten dürfen“. Befehle: `chmod` (Rechte), `chown` (Besitzer), `sudo` (Befehl mit Root-Rechten).

---

## 5. Arbeitsplätze bereitstellen

| Methode | Vorgehen | Vor-/Nachteile |
|---|---|---|
| manuell | USB-Stick, jeden Rechner einzeln | nur für Einzelgeräte |
| **Image/Klonen** | Musterrechner einrichten, Abbild auf alle kopieren | schnell bei gleicher Hardware; Images müssen gepflegt werden |
| **Netzwerkinstallation (PXE)** | Rechner bootet übers Netz und installiert automatisch | kein Datenträger nötig |
| **Softwareverteilung / Endpoint-Management** | z. B. Microsoft Intune, Configuration Manager, OPSI; Autopilot | zentral, automatisch, dokumentiert, auch für Updates |

### Checkliste Rollout eines Arbeitsplatzes
1. Hardware prüfen (Lieferschein, Seriennummer, Inventarisierung)
2. BIOS/UEFI-Update, Secure Boot, TPM aktiv
3. Betriebssystem + **Treiber** + **Updates**
4. Domänenbeitritt / Entra ID, Gruppenrichtlinien
5. Virenschutz/EDR, **Festplattenverschlüsselung** (BitLocker)
6. Standardsoftware und Fachanwendungen, **Lizenzen** dokumentieren
7. Netzlaufwerke, Drucker, Mail-Profil
8. **Funktionstest** mit Checkliste
9. **Übergabe/Einweisung** mit **Übergabeprotokoll** (Unterschrift)
10. Dokumentation in Inventar/CMDB

### Updates und Patchmanagement
Sicherheitsupdates zeitnah einspielen (Windows Update for Business, WSUS), vorher in einer **Testgruppe** prüfen, Updates für Drittsoftware nicht vergessen.

<!-- erg:Linux-Befehle -->
## 6. Linux auf der Kommandozeile
| Befehl | Aufgabe |
|---|---|
| `pwd` · `cd /etc` · `ls -l` | aktuelles Verzeichnis · wechseln · Inhalt mit Rechten anzeigen |
| `mkdir` · `cp` · `mv` · `rm` | Verzeichnis anlegen · kopieren · verschieben/umbenennen · löschen |
| `cat` · `less` · `tail -f` | Datei anzeigen · seitenweise · fortlaufend mitlesen (Logs) |
| `grep fehler /var/log/syslog` | Zeilen mit einem Suchbegriff finden |
| `find / -name "*.conf"` | Dateien suchen |
| `chmod 750 skript.sh` · `chown max:it datei` | Rechte ändern · Besitzer und Gruppe ändern |
| `ps aux` · `top` · `kill 1234` | Prozesse anzeigen · Auslastung live · Prozess beenden |
| `sudo` | Befehl mit Administratorrechten ausführen |
| `ip a` · `ping` · `ss -tulpen` | Netzwerkkonfiguration · Erreichbarkeit · offene Ports |
| `man ls` | Hilfe zu einem Befehl |

**Wichtige Verzeichnisse:** `/` Wurzel · `/home` Benutzerdaten · `/root` Administrator · `/etc` Konfiguration · `/var/log` Protokolle · `/bin`, `/usr/bin` Programme · `/tmp` temporär · `/dev` Geräte.
Unter Windows entsprechen z. B. `dir`, `cd`, `ipconfig`, `tasklist`, `taskkill` in der Eingabeaufforderung bzw. `Get-ChildItem`, `Get-Process` in der PowerShell.

## 7. Prozesse, Threads und Multitasking
- **Programm** = Datei auf dem Datenträger · **Prozess** = laufendes Programm mit **eigenem Speicherbereich** und Ressourcen · **Thread** = Ausführungsstrang **innerhalb** eines Prozesses; Threads eines Prozesses teilen sich den Speicher – leichtgewichtiger, aber ein Fehler kann den ganzen Prozess betreffen.
- **Multitasking:** Das Betriebssystem verteilt die CPU-Zeit in schnellen Wechseln auf viele Prozesse. **Präemptiv** (heute üblich): Das System entzieht einem Prozess die CPU nach seiner Zeitscheibe. **Kooperativ** (veraltet): Der Prozess gibt die CPU freiwillig ab – ein hängender Prozess blockiert alles.
- **Mehrkern-CPUs** führen Threads echt parallel aus ([[H1 PC-Komponenten und Arbeitsplatzgeräte]]).

## 8. PC in eine Domäne aufnehmen
**Voraussetzungen:** passende Edition (Windows **Pro/Enterprise**, nicht Home) · Netzwerkverbindung zum Domänencontroller · **DNS-Server des Clients zeigt auf den Domänencontroller** (sonst wird die Domäne nicht gefunden) · eindeutiger Computername · Konto mit Berechtigung zum Domänenbeitritt.
**Ablauf:** Einstellungen/Systemeigenschaften → „Domäne beitreten“ → Domänenname → Anmeldedaten → **Neustart** → Anmeldung mit Domänenkonto.
**Nutzen:** zentrale Anmeldung (Single Sign-on), **Gruppenrichtlinien** (Updates, Sicherheitsvorgaben, Laufwerkszuordnungen, Software), zentrale Rechteverwaltung über Gruppen.

## 9. Betriebssystem härten
Härtung = **Angriffsfläche verkleinern**:
- nicht benötigte Dienste, Programme, Benutzerkonten und Ports **deaktivieren/entfernen**
- **Standardpasswörter** ändern, Administratorkonto umbenennen/getrennt nutzen, **Least Privilege**
- **Updates** und Patchmanagement, nur signierte Software
- Firewall aktivieren, nur nötige Freigaben
- Festplattenverschlüsselung (BitLocker), Secure Boot, Bildschirmsperre
- Autostart von USB-Medien sperren, Makros einschränken
- Protokollierung aktivieren und auswerten
- sichere Konfigurationsvorgaben nutzen (z. B. BSI-Grundschutz-Bausteine, Herstellerbaselines)

---

> [!warning] Typische Fehler in Prüfungen
> - FAT32 für große Dateien empfehlen.
> - Windows Home für Firmenrechner in einer Domäne.
> - Bei Freigabe + NTFS die **weniger** restriktive Berechtigung annehmen.
> - Linux-Oktal falsch addieren (r = 4, w = 2, x = 1).
> - Rechte an einzelne Personen statt an Gruppen vergeben.

## Verwandte Themen
- [[I5 Bedrohungen und Schutzmaßnahmen]] – Least Privilege und Updates
- [[S1 Zahlensysteme und Codierung]] – chmod in Oktalschreibweise
- [[H2 Massenspeicher und Schnittstellen]] – Datenträger und Partitionen

## Zusammenfassung
- BS-Aufgaben: Prozesse, Speicher, Dateien, Geräte, Benutzer/Rechte, Oberfläche.
- UEFI + GPT + Secure Boot (+ TPM); MBR max. 2 TiB, 4 primäre Partitionen.
- NTFS (Rechte, Journaling) · FAT32 max. 4 GiB pro Datei · exFAT für Wechseldatenträger · ext4 Linux.
- Least Privilege, Gruppen statt Personen; Freigabe + NTFS → restriktiveres gilt; Verweigern schlägt Zulassen.
- Linux: r 4, w 2, x 1 → z. B. 750 = rwxr-x---.
- Rollout per Image/PXE/Softwareverteilung, Checkliste, Übergabeprotokoll.

## Selbstcheck
```dataviewjs
await dv.view("AP1/99 System/views/quiz", { modul: "S4" })
```

**Weitere Aufgaben:** [[Aufgaben Software#S4 Betriebssysteme, Dateisysteme und Rechte]] · **Karteikarten:** [[Karten Software]]

## Einschätzung
```dataviewjs
await dv.view("AP1/99 System/views/selbstcheck")
```

---
← [[S3 Algorithmen, Darstellung und Testen]] · Weiter: [[S5 Virtualisierung und Cloud]] →
