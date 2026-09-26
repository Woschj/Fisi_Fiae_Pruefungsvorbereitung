// AP1-Lib: Obsidian-Anbindung für alle Widgets (Statistik, Fragenpool, DOM-Helfer).
// Wird als AsyncFunction mit dem Parameter `app` ausgeführt und liefert ein Objekt zurück.

const STATS_PFAD = "99 System/daten/statistik.json";
const ORDNER_DATEN = "99 System/daten";
const ORDNER_FRAGEN = "99 System/fragen";
// Kartenquellen liegen getrennt von den Lernseiten, damit die Antworten beim Lernen nicht sichtbar sind
const ORDNER_KARTEN = "99 System/karten";
const KERN_PFAD = "99 System/scripts/ap1-kern.js";
// Leitner-Boxen: Wiederholungsabstand in Tagen je Box (falsch → Box 0 = sofort wieder fällig)
const INTERVALLE = [0, 1, 3, 7, 14, 30, 60];
// Wiederholungsabstand für Lernmodule je Selbsteinschätzung (0–5)
const MODUL_INTERVALLE = [0, 1, 2, 5, 12, 30];
const BEREICHE = ["Netzwerk", "Hardware", "Software", "IT-Sicherheit", "Wirtschaft", "Projekt"];

const STIL_PFAD = "99 System/styles/ap1.css";

const adapter = app.vault.adapter;
const kern = new Function(await adapter.read(KERN_PFAD))();

// Stile selbst einbinden statt über ein CSS-Snippet: Snippets werden nur beim Start bzw. nach
// manuellem Neuladen erkannt und können abgeschaltet sein – die Widgets sollen immer gestaltet sein.
async function stilLaden() {
  try {
    const css = await adapter.read(STIL_PFAD);
    let el = document.getElementById("ap1-stil");
    if (!el) { el = document.createElement("style"); el.id = "ap1-stil"; document.head.appendChild(el); }
    if (el.textContent !== css) el.textContent = css;
  } catch (e) {
    console.error(`AP1: Stylesheet ${STIL_PFAD} nicht ladbar`, e);
  }
}
await stilLaden();

// Abschnitt im Lernmodul, der zu einem Trainer-Aufgabentyp passt (Teilstring der Überschrift)
const TRAINER_ABSCHNITT = {
  "subnetz-analyse": "Blockgrößen", "subnetz-teilen": "Subnetze teilen", "subnetz-hosts": "VLSM", "subnetz-gleich": "Netzadresse per UND",
  "vlsm": "VLSM", "maske-praefix": "Subnetzmaske und Präfix", "ipv6-kuerzen": "Kürzen", "ipv6-expandieren": "Kürzen",
  "ipv6-praefix": "Subnetting mit IPv6", "ports": "Wichtige Ports", "hex-header": "Hex-Werte", "db": "Dämpfung, Pegel",
  "einheiten": "Dezimale und binäre", "uebertragung": "Übertragungsdauer", "datenmenge": "Speicherbedarf von Medien",
  "raid": "Die RAID-Level", "usv-dimension": "Dimensionierung", "usv-akku": "Überbrückungszeit", "strom": "Elektrotechnische Grundgrößen",
  "ppi": "Monitor", "zahlensysteme": "Umrechnungen", "zweierkomplement": "Zweierkomplement", "trace": "Schreibtischtest",
  "bezugskalkulation": "Bezugskalkulation", "angebotsvergleich": "Bezugskalkulation", "umsatzsteuer": "Umsatzsteuer",
  "verkaufskalkulation": "Vorwärtskalkulation", "nutzwert": "Ablauf der Nutzwertanalyse", "kauf-leasing": "Kauf, Leasing",
  "afa-amortisation": "Abschreibung", "darlehen": "Darlehen", "netzplan": "Rechenregeln", "verfuegbarkeit": "Verfügbarkeit berechnen",
  "backup": "Sicherungsarten", "druckkosten": "Druckkosten berechnen", "kostenrechnung": "Kosten, Deckungsbeitrag", "pruefziffer": "Prüfziffern", "schluessel": "Symmetrische", "passwort": "Passwortrichtlinie",
};

// Sucht die Moduldatei zu einer Modul-ID und optional die passende Überschrift → { ziel, text } oder null
function lernZiel(modulId, abschnitt) {
  const datei = app.vault.getMarkdownFiles?.().find(f => f.path.startsWith("10 Lernmodule/") && f.basename.startsWith(modulId + " "));
  if (!datei) return null;
  let ueberschrift = null;
  if (abschnitt) {
    const heads = app.metadataCache?.getFileCache(datei)?.headings || [];
    ueberschrift = heads.find(h => h.heading.includes(abschnitt))?.heading || null;
  }
  const kurz = ueberschrift ? ueberschrift.replace(/^\d+(\.\d+)?\.?\s+/, "").replace(/\s*\(.*\)$/, "") : datei.basename.replace(/^\S+\s/, "");
  return { ziel: ueberschrift ? `${datei.path}#${ueberschrift}` : datei.path, text: `${modulId} › ${kurz}` };
}

// „📘 Nachlernen“-Zeile mit klickbarem Link ins Lernmodul
function nachlernen(modulId, abschnitt, quelle = "") {
  const z = lernZiel(modulId, abschnitt);
  if (!z) return null;
  const a = h("a", { class: "internal-link", href: z.ziel, "data-href": z.ziel,
    onclick: ev => { ev.preventDefault(); app.workspace.openLinkText(z.ziel, quelle, ev.ctrlKey || ev.metaKey); } }, z.text);
  return h("div", { class: "ap1-nachlernen" }, "📘 Nachlernen:", a);
}

// ---------------------------------------------------------------- Datum
function heute() { return datumStr(new Date()); }
function datumStr(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
function tageZwischen(a, b) { return Math.round((Date.parse(b) - Date.parse(a)) / 86400000); }

// ---------------------------------------------------------------- Statistik
function leereStatistik() { return { version: 1, fragen: {}, trainer: {}, karten: {}, tage: {}, pruefungen: [] }; }

async function ordnerSicherstellen(pfad) { if (!(await adapter.exists(pfad))) await adapter.mkdir(pfad); }

async function ladeStatistik() {
  if (!(await adapter.exists(STATS_PFAD))) return leereStatistik();
  const roh = await adapter.read(STATS_PFAD);
  try {
    return Object.assign(leereStatistik(), JSON.parse(roh));
  } catch (e) {
    // Defekte Datei nicht überschreiben, sondern sichern – sonst wäre der Lernstand verloren
    const sicherung = `${ORDNER_DATEN}/statistik.defekt-${Date.now()}.json`;
    await adapter.write(sicherung, roh);
    console.error(`AP1: statistik.json war defekt und wurde nach ${sicherung} gesichert`, e);
    return leereStatistik();
  }
}

// Alle Schreibzugriffe laufen über eine Warteschlange, damit sich parallele Widgets nicht überschreiben.
function aktualisiereStatistik(fn) {
  const job = (window.__ap1Queue || Promise.resolve()).then(async () => {
    const s = await ladeStatistik();
    fn(s);
    await ordnerSicherstellen(ORDNER_DATEN);
    await adapter.write(STATS_PFAD, JSON.stringify(s, null, 1));
    return s;
  }).catch(e => { console.error("AP1: Statistik konnte nicht gespeichert werden", e); });
  window.__ap1Queue = job;
  return job;
}

function tagZaehlen(s, richtig) {
  const t = heute();
  const e = s.tage[t] || (s.tage[t] = { r: 0, f: 0 });
  richtig ? e.r++ : e.f++;
}

function speichereFrage(id, richtig) {
  return aktualisiereStatistik(s => {
    const e = s.fragen[id] || (s.fragen[id] = { r: 0, f: 0, box: 0, z: null });
    if (richtig) { e.r++; e.box = Math.min(e.box + 1, INTERVALLE.length - 1); }
    else { e.f++; e.box = 0; }
    e.z = heute();
    tagZaehlen(s, richtig);
  });
}

// Karteikarten nutzen dieselben Leitner-Boxen wie das Quiz, aber einen eigenen Bereich der Statistik
function speichereKarte(id, gewusst) {
  return aktualisiereStatistik(s => {
    const e = s.karten[id] || (s.karten[id] = { r: 0, f: 0, box: 0, z: null });
    if (gewusst) { e.r++; e.box = Math.min(e.box + 1, INTERVALLE.length - 1); }
    else { e.f++; e.box = 0; }
    e.z = heute();
    tagZaehlen(s, gewusst);
  });
}

function speichereTrainer(typ, richtig) {
  return aktualisiereStatistik(s => {
    const e = s.trainer[typ] || (s.trainer[typ] = { r: 0, f: 0, z: null, letzte: [] });
    richtig ? e.r++ : e.f++;
    e.z = heute();
    e.letzte = [...(e.letzte || []), richtig ? 1 : 0].slice(-20);
    tagZaehlen(s, richtig);
  });
}

function istFaellig(e) {
  if (!e || !e.z) return true;
  return tageZwischen(e.z, heute()) >= INTERVALLE[e.box || 0];
}

// ---------------------------------------------------------------- Fragenpool
async function ladeFragen() {
  const fragen = [], fehler = [];
  if (!(await adapter.exists(ORDNER_FRAGEN))) return { fragen, fehler };
  const liste = await adapter.list(ORDNER_FRAGEN);
  for (const pfad of liste.files.filter(p => p.endsWith(".js")).sort()) {
    try {
      const arr = new Function(`"use strict"; return (${await adapter.read(pfad)}\n);`)();
      if (!Array.isArray(arr)) throw new Error("Datei liefert kein Array");
      arr.forEach(q => { if (q && q.id) fragen.push(q); });
    } catch (e) {
      console.error(`AP1: Fragendatei ${pfad} konnte nicht gelesen werden`, e);
      fehler.push(`${pfad}: ${e.message}`);
    }
  }
  return { fragen, fehler };
}

// ---------------------------------------------------------------- Karteikarten
// Liefert alle Stapel aus „99 System/karten“ als [{ name, pfad, karten: [{ id, frage, antwort, zeile }], warnungen }]
async function ladeKarten() {
  const stapel = [];
  if (!(await adapter.exists(ORDNER_KARTEN))) return stapel;
  const liste = await adapter.list(ORDNER_KARTEN);
  for (const pfad of liste.files.filter(p => p.endsWith(".md")).sort()) {
    const name = pfad.split("/").pop().replace(/\.md$/, "");
    const { karten, warnungen } = kern.kartenParsen(await adapter.read(pfad));
    // Stapelname im Schlüssel: gleiche Frage in zwei Stapeln hat getrennten Lernstand
    karten.forEach(k => { k.id = `${name}:${kern.kartenId(k.frage)}`; k.stapel = name; k.pfad = pfad; });
    stapel.push({ name, pfad, karten, warnungen });
  }
  return stapel;
}

// ---------------------------------------------------------------- Lernmodule
function modulFaellig(p) {
  const s = Number(p.sicherheit ?? 0);
  if (!p.zuletzt) return s > 0;  // bewertet, aber ohne Datum → wiederholen
  const z = typeof p.zuletzt === "string" ? p.zuletzt : (p.zuletzt.toISODate ? p.zuletzt.toISODate() : String(p.zuletzt));
  return tageZwischen(z.slice(0, 10), heute()) >= MODUL_INTERVALLE[Math.max(0, Math.min(5, s))];
}

// ---------------------------------------------------------------- DOM
function h(tag, attrs = {}, ...kinder) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === undefined || v === null || v === false) continue;
    if (k === "class") el.className = v;
    else if (k === "html") el.innerHTML = v;
    else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
    else if (k === "style" && typeof v === "object") Object.assign(el.style, v);
    else el.setAttribute(k, v === true ? "" : v);
  }
  for (const k of kinder.flat()) {
    if (k === null || k === undefined || k === false) continue;
    el.appendChild(k instanceof Node ? k : document.createTextNode(String(k)));
  }
  return el;
}

function esc(s) { return String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

// Minimal-Markdown für Aufgabentexte: **fett**, `code`, Listen mit "- ", Zeilenumbrüche. Immer zuerst escapen.
function fmt(text) {
  const zeilen = esc(text).split("\n");
  let html = "", inListe = false;
  for (const z of zeilen) {
    const inhalt = z.replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    if (/^\s*- /.test(z)) {
      if (!inListe) { html += "<ul>"; inListe = true; }
      html += `<li>${inhalt.replace(/^\s*- /, "")}</li>`;
    } else {
      if (inListe) { html += "</ul>"; inListe = false; }
      html += inhalt + "<br>";
    }
  }
  if (inListe) html += "</ul>";
  return html.replace(/(<br>)+$/, "");
}

function tabelle(zeilen) {
  const [kopf, ...rest] = zeilen;
  return h("table", { class: "ap1-tabelle" },
    h("thead", {}, h("tr", {}, kopf.map(k => h("th", {}, String(k))))),
    h("tbody", {}, rest.map(r => h("tr", {}, r.map(c => h("td", {}, String(c)))))));
}

function balken(anteil, klasse = "") {
  const p = Math.max(0, Math.min(1, anteil || 0));
  return h("div", { class: `ap1-balken ${klasse}` }, h("div", { class: "ap1-balken-fuell", style: { width: `${Math.round(p * 100)}%` } }));
}

// Sitzungszustand überlebt das Neu-Rendern durch Dataview (z. B. nach einer Frontmatter-Änderung)
function sitzung(schluessel) {
  window.__ap1Sitzungen = window.__ap1Sitzungen || {};
  return window.__ap1Sitzungen[schluessel] || (window.__ap1Sitzungen[schluessel] = {});
}

function fehlerAnzeige(container, meldung) {
  container.appendChild(h("div", { class: "ap1-fehler" }, "⚠️ ", meldung));
}

return {
  kern, BEREICHE, INTERVALLE, heute, datumStr, tageZwischen,
  ladeStatistik, aktualisiereStatistik, speichereFrage, speichereTrainer, speichereKarte, istFaellig,
  ladeFragen, ladeKarten, modulFaellig, h, esc, fmt, tabelle, balken, sitzung, fehlerAnzeige,
  TRAINER_ABSCHNITT, lernZiel, nachlernen,
};
