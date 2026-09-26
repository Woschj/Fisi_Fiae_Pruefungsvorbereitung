// Karteikarten-Trainer: lernt die Karten aus „99 System/karten“ direkt in der Notiz (Leitner-Wiederholung).
// Funktioniert ohne das Plugin „Spaced Repetition“; ist es aktiv, gibt es zusätzlich einen Button dorthin.
// Ein Stapel:             await dv.view("99 System/views/karten", { stapel: "Netzwerk" })
// Alle Stapel (Auswahl):  await dv.view("99 System/views/karten", { alle: true })
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const wurzel = dv.container;
wurzel.classList.add("ap1");
let lib;
try {
  lib = await new AsyncFunction("app", await dv.app.vault.adapter.read("99 System/scripts/ap1-lib.js"))(dv.app);
} catch (e) {
  wurzel.createEl("div", { cls: "ap1-fehler", text: `⚠️ AP1-Bibliothek nicht ladbar: ${e.message}` });
  throw e;
}
const { h, fmt, kern } = lib;
const opt = Object.assign({ stapel: "", alle: false, anzahl: 20 }, input || {});
const SR_PLUGIN = "obsidian-spaced-repetition";
const MODI = { faellig: "Fällige und neue", alle: "Alle (zufällig)", schwach: "Nur nicht gewusste" };

const pfadHier = dv.current().file.path;
const stapelListe = await lib.ladeKarten();
let statistik = await lib.ladeStatistik();

const S = lib.sitzung(`karten:${pfadHier}:${opt.stapel}:${opt.alle}`);
S.stapel = S.stapel ?? opt.stapel;
S.modus = S.modus || "faellig";

function kartenPool() {
  return stapelListe.filter(s => !S.stapel || s.name === S.stapel).flatMap(s => s.karten);
}
const st = k => statistik.karten[k.id];
function zaehle(pool) {
  return { gesamt: pool.length, neu: pool.filter(k => !st(k)).length, faellig: pool.filter(k => st(k) && lib.istFaellig(st(k))).length };
}
function waehle() {
  const pool = kartenPool();
  let liste;
  if (S.modus === "alle") liste = kern.mische(pool);
  else if (S.modus === "schwach") liste = kern.mische(pool.filter(k => st(k) && st(k).box === 0 && st(k).f > 0));
  else liste = [...kern.mische(pool.filter(k => st(k) && lib.istFaellig(st(k)))), ...kern.mische(pool.filter(k => !st(k)))];
  return liste.slice(0, Number(opt.anzahl) || 20);
}
function starte() {
  S.karten = waehle(); S.pos = 0; S.offen = false; S.ergebnis = []; S.laeuft = S.karten.length > 0;
  render();
}
async function bewerte(gewusst) {
  const k = S.karten[S.pos];
  S.ergebnis.push({ frage: k.frage, gewusst });
  S.pos++; S.offen = false;
  if (S.pos >= S.karten.length) S.laeuft = false;
  render();
  statistik = (await lib.speichereKarte(k.id, gewusst)) || statistik;
}

// ---------------------------------------------------------------- Plugin-Anbindung
function pluginAktiv() { return !!dv.app.plugins?.enabledPlugins?.has(SR_PLUGIN); }
function pluginButton() {
  if (!pluginAktiv()) return null;
  const befehl = `${SR_PLUGIN}:srs-review-flashcards`;
  return h("button", { title: "Wiederholung mit dem Plugin „Spaced Repetition“ (eigener Lernstand)",
    onclick: () => dv.app.commands.executeCommandById(befehl) }, "🗂️ Im Plugin lernen");
}

// ---------------------------------------------------------------- Darstellung
function kopf() {
  const pool = kartenPool(), z = zaehle(pool);
  const titel = h("div", { class: "ap1-karte-titel" }, h("span", { class: "ap1-icon" }, "🃏"),
    `Karteikarten${S.stapel ? " · " + S.stapel : ""}`,
    h("span", { class: "ap1-badge" }, `${z.faellig} fällig`), h("span", { class: "ap1-badge leise" }, `${z.neu} neu · ${z.gesamt} gesamt`));
  const filter = h("div", { class: "ap1-filter" });
  if (opt.alle) {
    const sel = h("select", { onchange: ev => { S.stapel = ev.target.value; render(); } },
      h("option", { value: "" }, "Alle Stapel"),
      stapelListe.map(s => h("option", { value: s.name, selected: s.name === S.stapel }, `${s.name} (${s.karten.length})`)));
    filter.appendChild(sel);
  }
  filter.appendChild(h("select", { onchange: ev => { S.modus = ev.target.value; render(); } },
    Object.entries(MODI).map(([k, v]) => h("option", { value: k, selected: k === S.modus }, v))));
  filter.appendChild(h("button", { class: "mod-cta", onclick: starte }, "Lernen starten"));
  const pb = pluginButton();
  if (pb) filter.appendChild(pb);
  return [titel, filter];
}

function kartenAnsicht() {
  const k = S.karten[S.pos];
  const teile = [lib.balken(S.pos / S.karten.length, "duenn"),
    h("div", { class: "ap1-meta" }, `Karte ${S.pos + 1} von ${S.karten.length}${opt.alle && !S.stapel ? " · " + k.stapel : ""}`),
    h("div", { class: "ap1-lernkarte" + (S.offen ? " offen" : "") },
      h("div", { class: "ap1-lernkarte-frage", html: fmt(k.frage) }),
      S.offen ? h("div", { class: "ap1-lernkarte-antwort", html: fmt(k.antwort) }) : null)];
  const aktionen = h("div", { class: "ap1-aktionen" });
  if (!S.offen) aktionen.appendChild(h("button", { class: "mod-cta", onclick: () => { S.offen = true; render(); } }, "Antwort zeigen"));
  else {
    aktionen.appendChild(h("button", { class: "ap1-nicht-gewusst", onclick: () => bewerte(false) }, "✗ Nicht gewusst"));
    aktionen.appendChild(h("button", { class: "ap1-gewusst", onclick: () => bewerte(true) }, "✓ Gewusst"));
  }
  aktionen.appendChild(h("button", { class: "ap1-leise", onclick: () => { S.laeuft = false; S.karten = null; render(); } }, "Beenden"));
  teile.push(aktionen);
  return teile;
}

function auswertung() {
  const r = S.ergebnis.filter(e => e.gewusst).length, n = S.ergebnis.length;
  const teile = [h("div", { class: "ap1-rueckmeldung " + (r / n >= 0.7 ? "ok" : "falsch") }, `${r} von ${n} gewusst (${Math.round(r / n * 100)} %)`)];
  const falsch = S.ergebnis.filter(e => !e.gewusst);
  if (falsch.length) {
    teile.push(h("div", { class: "ap1-meta" }, "Diese Karten kommen beim nächsten Durchgang sofort wieder:"));
    teile.push(h("ul", { class: "ap1-liste" }, falsch.map(e => h("li", { class: "falsch" }, e.frage.split("\n")[0]))));
  }
  return teile;
}

function render() {
  wurzel.empty();
  const karte = h("div", { class: "ap1-karte" });
  kopf().forEach(el => karte.appendChild(el));
  stapelListe.flatMap(s => s.warnungen.map(w => ({ ...w, stapel: s.name }))).filter(w => !S.stapel || w.stapel === S.stapel)
    .forEach(w => karte.appendChild(h("div", { class: "ap1-fehler" }, `⚠️ ${w.stapel}, Zeile ${w.zeile}: ${w.grund}`)));
  if (opt.stapel && !stapelListe.some(s => s.name === opt.stapel)) karte.appendChild(h("div", { class: "ap1-fehler" }, `⚠️ Stapel „${opt.stapel}“ nicht gefunden (Datei 99 System/karten/${opt.stapel}.md).`));
  if (!stapelListe.length) karte.appendChild(h("div", { class: "ap1-fehler" }, "⚠️ Keine Kartendateien in „99 System/karten“ gefunden."));
  else if (S.laeuft) kartenAnsicht().forEach(el => karte.appendChild(el));
  else if (S.ergebnis?.length) auswertung().forEach(el => karte.appendChild(el));
  else if (S.karten && !S.karten.length) karte.appendChild(h("div", { class: "ap1-meta" }, "Für diese Auswahl ist gerade nichts fällig – wähle „Alle (zufällig)“ oder komm später wieder. 🎉"));
  else karte.appendChild(h("div", { class: "ap1-meta" }, "Frage lesen, Antwort im Kopf formulieren, aufdecken, ehrlich bewerten. Nicht gewusste Karten kommen sofort wieder, gewusste in immer größeren Abständen (1, 3, 7, 14, 30, 60 Tage)."));
  wurzel.appendChild(karte);
}

render();
