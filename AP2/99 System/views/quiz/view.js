// Quiz-Widget: Fragen aus den Fragenordnern der Konfiguration (*.js) mit Leitner-Wiederholung.
// Aufruf im Modul:  await dv.view("<Bereich>/99 System/views/quiz", { modul: "N2" })
// Freies Quiz:      await dv.view("<Bereich>/99 System/views/quiz", { auswahl: true })
// Einzige bereichsspezifische Zeile: Ort von Bibliothek und konfig.json
const BASIS = "AP2/99 System";
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
const opt = Object.assign({ modul: null, bereich: null, modus: "empfohlen", anzahl: 10, auswahl: false }, input || {});
const MODI = { empfohlen: "Empfohlen (Fälliges zuerst)", faellig: "Nur fällige", neu: "Nur neue", schwach: "Nur Schwächen", alle: "Alle (zufällig)" };

const { fragen: pool, fehler } = await lib.ladeFragen();
fehler.forEach(f => lib.fehlerAnzeige(wurzel, `Fragendatei fehlerhaft: ${f}`));
pool.forEach(q => { q.bereich = q.bereich || lib.bereichVon(q.modul) || "Sonstiges"; });
let statistik = await lib.ladeStatistik();

const S = lib.sitzung(`quiz:${dv.current().file.path}:${JSON.stringify(opt)}`);
S.filter = S.filter || { modul: opt.modul || "", bereich: opt.bereich || "", modus: opt.modus, anzahl: opt.anzahl };

function kandidaten(filter) {
  return pool.filter(q => (!filter.modul || q.modul === filter.modul) && (!filter.bereich || q.bereich === filter.bereich));
}
function waehle(filter) {
  const alle = kandidaten(filter);
  const st = id => statistik.fragen[id];
  let liste;
  switch (filter.modus) {
    case "faellig": liste = kern.mische(alle.filter(q => st(q.id) && lib.istFaellig(st(q.id)))); break;
    case "neu": liste = kern.mische(alle.filter(q => !st(q.id))); break;
    case "schwach": liste = kern.mische(alle.filter(q => st(q.id) && st(q.id).f > 0 && st(q.id).box <= 1)); break;
    case "alle": liste = kern.mische(alle); break;
    default: {
      const faellig = kern.mische(alle.filter(q => st(q.id) && lib.istFaellig(st(q.id))));
      const neu = kern.mische(alle.filter(q => !st(q.id)));
      const rest = kern.mische(alle.filter(q => st(q.id) && !lib.istFaellig(st(q.id))));
      liste = [...faellig, ...neu, ...rest];
    }
  }
  return liste.slice(0, Number(filter.anzahl) || 10).map(q => q.id);
}
function frage(id) { return pool.find(q => q.id === id); }

function starte(ids) {
  S.ids = ids; S.pos = 0; S.antworten = {}; S.laeuft = ids.length > 0; S.fertig = false;
  S.reihenfolge = {};
  ids.forEach(id => { const q = frage(id); if (q.optionen) S.reihenfolge[id] = kern.mische(q.optionen.map((_, i) => i)); });
  render();
}

// ---------------------------------------------------------------- Bewertung
function bewerte(q, antwort) {
  switch (q.typ) {
    case "mc": return antwort === q.richtig;
    case "multi": { const soll = [...q.richtig].sort().join(","); return [...antwort].sort().join(",") === soll; }
    case "zahl": return kern.pruefeFeld({ art: "zahl", loesung: q.richtig, toleranz: q.toleranz, alternativen: q.alternativen }, antwort).ok;
    default: {
      const loes = Array.isArray(q.richtig) ? q.richtig : [q.richtig];
      return kern.pruefeFeld({ art: "text", loesung: loes[0], alternativen: loes.slice(1) }, antwort).ok;
    }
  }
}
function loesungText(q) {
  if (q.typ === "mc") return q.optionen[q.richtig];
  if (q.typ === "multi") return q.richtig.map(i => q.optionen[i]).join(" · ");
  if (q.typ === "zahl") return kern.de(q.richtig, 4) + (q.einheit ? " " + q.einheit : "");
  return Array.isArray(q.richtig) ? q.richtig[0] : q.richtig;
}
async function antworte(q, antwort) {
  if (S.antworten[q.id]) return;
  const ok = bewerte(q, antwort);
  S.antworten[q.id] = { antwort, ok };
  render();
  await lib.speichereFrage(q.id, ok);
}

// ---------------------------------------------------------------- Ansichten
function renderStart() {
  const f = S.filter;
  const alle = kandidaten(f);
  const st = id => statistik.fragen[id];
  const gesehen = alle.filter(q => st(q.id)).length;
  const faellig = alle.filter(q => st(q.id) && lib.istFaellig(st(q.id))).length;
  const karte = h("div", { class: "ap1-karte" });
  karte.appendChild(h("div", { class: "ap1-karte-titel" }, opt.modul ? `Selbstcheck ${opt.modul}` : "Quiz"));
  if (opt.auswahl) {
    const bereiche = [...new Set(pool.map(q => q.bereich))];
    const module = [...new Set(pool.filter(q => !f.bereich || q.bereich === f.bereich).map(q => q.modul))].sort();
    const sel = (werte, wert, onc, leer) => { const s = h("select", { class: "dropdown", onchange: onc }, h("option", { value: "" }, leer), werte.map(w => h("option", { value: w[0] }, w[1]))); s.value = wert; return s; };
    karte.appendChild(h("div", { class: "ap1-filter" },
      sel(bereiche.map(b => [b, b]), f.bereich, ev => { f.bereich = ev.target.value; f.modul = ""; render(); }, "Alle Bereiche"),
      sel(module.map(m => [m, m]), f.modul, ev => { f.modul = ev.target.value; render(); }, "Alle Module"),
      sel(Object.entries(MODI), f.modus, ev => { f.modus = ev.target.value; render(); }, "–"),
      sel([[5, "5 Fragen"], [10, "10 Fragen"], [20, "20 Fragen"], [40, "40 Fragen"]].map(x => [String(x[0]), x[1]]), String(f.anzahl), ev => { f.anzahl = Number(ev.target.value); }, "–")));
  }
  karte.appendChild(h("div", { class: "ap1-meta" }, `${alle.length} Fragen im Pool · ${gesehen} schon beantwortet · ${faellig} zur Wiederholung fällig`));
  karte.appendChild(lib.balken(alle.length ? gesehen / alle.length : 0));
  const ids = waehle(f);
  karte.appendChild(h("div", { class: "ap1-aktionen" },
    h("button", { class: "mod-cta", disabled: ids.length === 0, onclick: () => starte(waehle(f)) }, ids.length ? `Starten (${ids.length} Fragen)` : "Keine passenden Fragen"),
    !opt.auswahl && faellig ? h("button", { onclick: () => starte(waehle(Object.assign({}, f, { modus: "faellig" }))) }, `Nur Fälliges (${faellig})`) : null));
  wurzel.appendChild(karte);
}

function renderFrage() {
  const q = frage(S.ids[S.pos]);
  const a = S.antworten[q.id];
  const karte = h("div", { class: "ap1-karte" });
  karte.appendChild(h("div", { class: "ap1-karte-titel" }, `Frage ${S.pos + 1} von ${S.ids.length}`,
    h("span", { class: "ap1-badge" }, q.modul), q.niveau ? h("span", { class: "ap1-badge leise" }, "★".repeat(q.niveau)) : null));
  karte.appendChild(lib.balken(S.pos / S.ids.length, "duenn"));
  karte.appendChild(h("div", { class: "ap1-text ap1-frage", html: fmt(q.frage) }));
  if (q.code) karte.appendChild(h("pre", { class: "ap1-code" }, q.code));

  if (q.typ === "mc") {
    const liste = h("div", { class: "ap1-optionen" });
    S.reihenfolge[q.id].forEach(i => {
      let cls = "ap1-option";
      if (a) { if (i === q.richtig) cls += " ok"; else if (i === a.antwort) cls += " falsch"; else cls += " leise"; }
      liste.appendChild(h("button", { class: cls, disabled: !!a, onclick: () => antworte(q, i), html: fmt(q.optionen[i]) }));
    });
    karte.appendChild(liste);
  } else if (q.typ === "multi") {
    S.mehrfach = S.mehrfach || {};
    const gew = S.mehrfach[q.id] || (S.mehrfach[q.id] = new Set());
    karte.appendChild(h("div", { class: "ap1-meta" }, "Mehrere Antworten können richtig sein."));
    const liste = h("div", { class: "ap1-optionen" });
    S.reihenfolge[q.id].forEach(i => {
      let cls = "ap1-option ap1-check";
      if (a) cls += q.richtig.includes(i) ? " ok" : gew.has(i) ? " falsch" : " leise";
      else if (gew.has(i)) cls += " gewaehlt";
      liste.appendChild(h("button", { class: cls, disabled: !!a, onclick: () => { gew.has(i) ? gew.delete(i) : gew.add(i); render(); } },
        h("span", { class: "ap1-kaestchen" }, gew.has(i) ? "☑" : "☐"), h("span", { html: fmt(q.optionen[i]) })));
    });
    karte.appendChild(liste);
    if (!a) karte.appendChild(h("div", { class: "ap1-aktionen" }, h("button", { class: "mod-cta", onclick: () => antworte(q, [...gew]) }, "Prüfen")));
  } else {
    const feld = h("input", { type: "text", autocomplete: "off", spellcheck: "false", disabled: !!a, value: a ? a.antwort : (S.entwurf || ""),
      placeholder: q.typ === "zahl" ? `Zahl${q.einheit ? " in " + q.einheit : ""}` : "Antwort",
      oninput: ev => { S.entwurf = ev.target.value; },
      onkeydown: ev => { if (ev.key === "Enter") { ev.preventDefault(); antworte(q, ev.target.value); } } });
    karte.appendChild(h("div", { class: "ap1-felder" }, h("label", { class: `ap1-feld ${a ? (a.ok ? "ok" : "falsch") : ""}` }, feld, q.einheit ? h("span", { class: "ap1-meta" }, q.einheit) : null)));
    if (!a) karte.appendChild(h("div", { class: "ap1-aktionen" }, h("button", { class: "mod-cta", onclick: () => antworte(q, feld.value) }, "Prüfen")));
    if (!a) setTimeout(() => feld.focus(), 0);
  }

  if (a) {
    karte.appendChild(h("div", { class: `ap1-rueckmeldung ${a.ok ? "ok" : "falsch"}` },
      a.ok ? "✓ Richtig" : h("span", {}, "✗ Leider falsch – richtig ist: ", h("strong", { html: fmt(loesungText(q)) }))));
    if (q.erklaerung) karte.appendChild(h("div", { class: "ap1-weg", html: fmt(q.erklaerung) }));
    const nl = lib.nachlernen(q.modul, q.abschnitt, dv.current().file.path);
    if (nl) karte.appendChild(nl);
    karte.appendChild(h("div", { class: "ap1-aktionen" },
      h("button", { class: "mod-cta", onclick: () => { S.entwurf = ""; S.pos++; if (S.pos >= S.ids.length) { S.laeuft = false; S.fertig = true; } render(); } },
        S.pos + 1 < S.ids.length ? "Weiter →" : "Auswertung")));
  }
  karte.appendChild(h("div", { class: "ap1-aktionen rechts" }, h("button", { class: "clickable-icon", onclick: () => { S.laeuft = false; S.fertig = Object.keys(S.antworten).length > 0; render(); } }, "Abbrechen")));
  wurzel.appendChild(karte);
}

function renderAuswertung() {
  const beantwortet = S.ids.filter(id => S.antworten[id]);
  const richtig = beantwortet.filter(id => S.antworten[id].ok).length;
  const quote = beantwortet.length ? richtig / beantwortet.length : 0;
  const karte = h("div", { class: "ap1-karte" });
  karte.appendChild(h("div", { class: "ap1-karte-titel" }, "Auswertung"));
  karte.appendChild(h("div", { class: "ap1-gross" }, `${richtig} / ${beantwortet.length}`, h("span", { class: "ap1-meta" }, ` (${Math.round(quote * 100)} %)`)));
  karte.appendChild(lib.balken(quote, quote >= 0.8 ? "gut" : quote >= 0.5 ? "mittel" : "schlecht"));
  karte.appendChild(h("div", { class: "ap1-meta" }, quote >= 0.9 ? "Sehr sicher – Zeit für das nächste Thema." : quote >= 0.67 ? "Solide. Die Fehler unten noch einmal nachlesen." : "Noch wacklig – Modul nochmal durcharbeiten und die falschen Fragen wiederholen."));
  const liste = h("ul", { class: "ap1-liste" });
  beantwortet.forEach(id => {
    const q = frage(id), ok = S.antworten[id].ok;
    const z = ok ? null : lib.lernZiel(q.modul, q.abschnitt);
    liste.appendChild(h("li", { class: ok ? "ok" : "falsch" }, ok ? "✓ " : "✗ ", h("span", { html: fmt(q.frage.split("\n")[0]) }),
      z ? h("span", { class: "ap1-meta" }, " · 📘 ", h("a", { class: "internal-link", href: z.ziel, onclick: ev => { ev.preventDefault(); dv.app.workspace.openLinkText(z.ziel, dv.current().file.path); } }, z.text)) : null));
  });
  karte.appendChild(liste);
  const falsche = beantwortet.filter(id => !S.antworten[id].ok);
  karte.appendChild(h("div", { class: "ap1-aktionen" },
    falsche.length ? h("button", { class: "mod-cta", onclick: () => starte(kern.mische(falsche)) }, `Falsche wiederholen (${falsche.length})`) : null,
    h("button", { onclick: async () => { statistik = await lib.ladeStatistik(); S.fertig = false; render(); } }, "Neues Quiz")));
  wurzel.appendChild(karte);
}

function render() {
  wurzel.empty();
  if (!pool.length) { lib.fehlerAnzeige(wurzel, `Keine Fragen gefunden (Ordner: ${lib.ORDNER_FRAGEN.join(", ")}).`); return; }
  if (S.laeuft) renderFrage();
  else if (S.fertig) renderAuswertung();
  else renderStart();
}
render();
