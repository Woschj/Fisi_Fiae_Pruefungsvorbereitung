// Trainer-Widget: erzeugt Zufallsaufgaben aus ap1-kern.js und prüft die Eingaben.
// Aufruf: await dv.view("<Bereich>/99 System/views/trainer", { typen: ["subnetz-analyse", ...] })
// Einzige bereichsspezifische Zeile: Ort von Bibliothek und konfig.json
const BASIS = "AP1/99 System";
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const wurzel = dv.container;
wurzel.classList.add("ap1");
let lib;
try {
  lib = await new AsyncFunction("app", "basis", "seite", await dv.app.vault.adapter.read(`${BASIS}/scripts/ap1-lib.js`))(dv.app, BASIS, dv.current().file.path);
} catch (e) {
  wurzel.createEl("div", { cls: "ap1-fehler", text: `⚠️ Lern-Bibliothek nicht ladbar: ${e.message}` });
  throw e;
}
const { h, fmt, kern } = lib;
const G = kern.generatoren;
const typen = (input && input.typen ? input.typen : Object.keys(G)).filter(t => G[t]);
if (!typen.length) { lib.fehlerAnzeige(wurzel, "Keine gültigen Aufgabentypen angegeben."); return; }

const S = lib.sitzung(`trainer:${dv.current().file.path}:${typen.join(",")}`);
S.auswahl = S.auswahl || (typen.length > 1 ? "zufall" : typen[0]);
S.richtig = S.richtig || 0; S.gesamt = S.gesamt || 0;

const statistik = await lib.ladeStatistik();

function neueAufgabe() {
  const typ = S.auswahl === "zufall" ? kern.wahl(typen) : S.auswahl;
  S.typ = typ; S.aufgabe = G[typ].erzeuge(); S.eingaben = {}; S.geprueft = false; S.gewertet = false; S.loesungOffen = false;
}
if (!S.aufgabe) neueAufgabe();

function statZeile() {
  const e = statistik.trainer[S.typ];
  const gesamt = e ? e.r + e.f : 0;
  return h("div", { class: "ap1-meta" },
    `Diese Sitzung: ${S.richtig}/${S.gesamt} richtig`,
    gesamt ? ` · Dieser Aufgabentyp insgesamt: ${e.r}/${gesamt} (${Math.round(e.r / gesamt * 100)} %)` : " · Dieser Aufgabentyp: noch nicht geübt");
}

function render() {
  wurzel.empty();
  const a = S.aufgabe;

  const kopf = h("div", { class: "ap1-kopf" });
  if (typen.length > 1) {
    const sel = h("select", { class: "dropdown", onchange: (ev) => { S.auswahl = ev.target.value; neueAufgabe(); render(); } },
      h("option", { value: "zufall" }, "🎲 Zufällig gemischt"),
      typen.map(t => h("option", { value: t }, G[t].titel)));
    sel.value = S.auswahl;
    kopf.appendChild(sel);
  }
  kopf.appendChild(h("button", { onclick: () => { neueAufgabe(); render(); } }, "↻ Neue Aufgabe"));
  wurzel.appendChild(kopf);

  const karte = h("div", { class: "ap1-karte" });
  karte.appendChild(h("div", { class: "ap1-karte-titel" }, a.titel, h("span", { class: "ap1-badge" }, `Modul ${lib.trainerModul(S.typ)}`)));
  karte.appendChild(h("div", { class: "ap1-text", html: fmt(a.text) }));
  if (a.tabelle) karte.appendChild(lib.tabelle(a.tabelle));
  if (a.code) karte.appendChild(h("pre", { class: "ap1-code" }, a.code));

  const felder = h("div", { class: "ap1-felder" });
  const ergebnisse = S.geprueft ? a.felder.map(fd => kern.pruefeFeld(fd, S.eingaben[fd.key])) : [];
  a.felder.forEach((fd, i) => {
    const r = ergebnisse[i];
    let eingabe;
    if (fd.art === "wahl") {
      eingabe = h("select", { class: "dropdown", onchange: (ev) => { S.eingaben[fd.key] = ev.target.value; } },
        h("option", { value: "" }, "– bitte wählen –"), fd.optionen.map(o => h("option", { value: o }, o)));
      eingabe.value = S.eingaben[fd.key] || "";
    } else {
      eingabe = h("input", { type: "text", autocomplete: "off", spellcheck: "false", placeholder: fd.art === "zahl" ? "Zahl, z. B. 12,5" : "",
        value: S.eingaben[fd.key] || "",
        oninput: (ev) => { S.eingaben[fd.key] = ev.target.value; },
        onkeydown: (ev) => { if (ev.key === "Enter") { ev.preventDefault(); pruefen(); } } });
    }
    const status = !r ? "" : r.ok ? "ok" : r.teilweise ? "teilweise" : "falsch";
    felder.appendChild(h("label", { class: `ap1-feld ${status}` },
      h("span", { class: "ap1-feld-label" }, fd.label),
      eingabe,
      r ? h("span", { class: "ap1-feld-status" }, r.ok ? "✓" : r.teilweise ? "≈" : "✗") : null,
      r && !r.ok ? h("span", { class: "ap1-feld-hinweis" }, (r.hinweis ? r.hinweis + " " : "") + (S.loesungOffen || S.geprueft ? `Lösung: ${fd.anzeige ?? formatLoesung(fd)}` : "")) : null));
  });
  karte.appendChild(felder);

  const alleOk = S.geprueft && ergebnisse.every(r => r.ok);
  karte.appendChild(h("div", { class: "ap1-aktionen" },
    h("button", { class: "mod-cta", onclick: pruefen }, "Prüfen"),
    h("button", { onclick: () => { S.loesungOffen = !S.loesungOffen; render(); } }, S.loesungOffen ? "Lösungsweg verbergen" : "Lösungsweg zeigen"),
    S.geprueft ? h("button", { onclick: () => { neueAufgabe(); render(); } }, "Nächste Aufgabe →") : null));

  if (S.geprueft) {
    karte.appendChild(h("div", { class: `ap1-rueckmeldung ${alleOk ? "ok" : "falsch"}` },
      alleOk ? "✓ Alles richtig!" : `${ergebnisse.filter(r => r.ok).length} von ${ergebnisse.length} Feldern richtig.`));
  }
  if (S.loesungOffen || S.geprueft) {
    const weg = h("div", { class: "ap1-weg" }, h("div", { class: "ap1-weg-titel" }, "Lösungsweg"));
    a.weg.forEach(z => weg.appendChild(h("div", { html: fmt(z) })));
    if (a.tabelleLoesung) weg.appendChild(lib.tabelle(a.tabelleLoesung));
    karte.appendChild(weg);
    const nl = lib.nachlernen(lib.trainerModul(S.typ), lib.TRAINER_ABSCHNITT[S.typ], dv.current().file.path);
    if (nl) karte.appendChild(nl);
  }
  wurzel.appendChild(karte);
  wurzel.appendChild(statZeile());
}

function formatLoesung(fd) {
  if (fd.art === "zahl") return kern.de(fd.loesung, 4);
  if (Array.isArray(fd.loesung)) return fd.loesung.join(", ");
  return String(fd.loesung);
}

async function pruefen() {
  const a = S.aufgabe;
  const erg = a.felder.map(fd => kern.pruefeFeld(fd, S.eingaben[fd.key]));
  if (erg.every(r => r.leer)) return;
  S.geprueft = true;
  if (!S.gewertet) {  // nur der erste Versuch zählt für die Statistik
    S.gewertet = true;
    const ok = erg.every(r => r.ok);
    S.gesamt++; if (ok) S.richtig++;
    await lib.speichereTrainer(S.typ, ok);
    const e = statistik.trainer[S.typ] || (statistik.trainer[S.typ] = { r: 0, f: 0 });
    ok ? e.r++ : e.f++;
  }
  render();
}

render();
