// Dashboard: Lernstand über Module, Quiz, Trainer und Probeprüfungen.
// Aufruf: await dv.view("<Bereich>/99 System/views/dashboard")
// Einzige bereichsspezifische Zeile: Ort von Bibliothek und konfig.json
const BASIS = "AP1/99 System";
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const wurzel = dv.container;
wurzel.classList.add("ap1");
const lib = await new AsyncFunction("app", "basis", "seite", await dv.app.vault.adapter.read(`${BASIS}/scripts/ap1-lib.js`))(dv.app, BASIS, dv.current().file.path);
const { h, kern } = lib;
const pfad = dv.current().file.path;

const module = dv.pages(lib.MODUL_ORDNER.map(o => `"${o}"`).join(" or ")).where(p => p.modul).sort(p => p.reihenfolge ?? 0, "asc").array();
const { fragen } = await lib.ladeFragen();
const st = await lib.ladeStatistik();

function link(ziel, text) {
  return h("a", { class: "internal-link", href: ziel, "data-href": ziel, onclick: ev => { ev.preventDefault(); dv.app.workspace.openLinkText(ziel, pfad, ev.ctrlKey || ev.metaKey); } }, text || ziel);
}
function kachel(wert, label, zusatz) { return h("div", { class: "ap1-kachel" }, h("div", { class: "ap1-kachel-wert" }, wert), h("div", { class: "ap1-kachel-label" }, label), zusatz ? h("div", { class: "ap1-meta" }, zusatz) : null); }

// ---------------------------------------------------------------- Kennzahlen
const tage = Object.keys(st.tage).sort();
let serie = 0;
{ const d = new Date(); if (!st.tage[lib.datumStr(d)]) d.setDate(d.getDate() - 1);
  while (st.tage[lib.datumStr(d)]) { serie++; d.setDate(d.getDate() - 1); } }
const gesamtR = Object.values(st.tage).reduce((s, t) => s + t.r, 0), gesamtF = Object.values(st.tage).reduce((s, t) => s + t.f, 0);
const heuteT = st.tage[lib.heute()] || { r: 0, f: 0 };
const bearbeitet = module.filter(m => Number(m.sicherheit || 0) > 0).length;
const sicher = module.filter(m => Number(m.sicherheit || 0) >= 4).length;
const faelligeFragen = fragen.filter(q => st.fragen[q.id] && lib.istFaellig(st.fragen[q.id])).length;

wurzel.appendChild(h("div", { class: "ap1-kacheln" },
  kachel(`${sicher}/${module.length}`, "Module sicher", `${bearbeitet} bearbeitet`),
  kachel(gesamtR + gesamtF ? `${Math.round(gesamtR / (gesamtR + gesamtF) * 100)} %` : "–", "Trefferquote", `${gesamtR + gesamtF} Antworten gesamt`),
  kachel(String(heuteT.r + heuteT.f), "Heute geübt", heuteT.r + heuteT.f ? `${heuteT.r} richtig` : "Los geht's!"),
  kachel(`${serie} 🔥`, "Tage in Folge", tage.length ? `${tage.length} Lerntage insgesamt` : null),
  kachel(String(faelligeFragen), "Fragen fällig", faelligeFragen ? "→ Quiz „Empfohlen“" : "alles wiederholt")));

// ---------------------------------------------------------------- Aktivität (8 Wochen)
{
  const raster = h("div", { class: "ap1-heatmap" });
  const start = new Date(); start.setDate(start.getDate() - 55 - ((start.getDay() + 6) % 7) + 6);
  const max = Math.max(1, ...Object.values(st.tage).map(t => t.r + t.f));
  for (let i = 0; i < 56; i++) {
    const d = new Date(start); d.setDate(start.getDate() + i);
    const t = st.tage[lib.datumStr(d)], n = t ? t.r + t.f : 0;
    const stufe = n === 0 ? 0 : Math.min(4, 1 + Math.floor(n / max * 3.99));
    raster.appendChild(h("div", { class: `ap1-hm s${stufe}`, title: `${lib.datumStr(d)}: ${n} Antworten` }));
  }
  wurzel.appendChild(h("div", { class: "ap1-karte" }, h("div", { class: "ap1-karte-titel" }, "Aktivität der letzten 8 Wochen"), raster));
}

// ---------------------------------------------------------------- Als Nächstes
{
  const faelligeModule = module.filter(m => Number(m.sicherheit || 0) > 0 && lib.modulFaellig(m)).sort((a, b) => (a.sicherheit || 0) - (b.sicherheit || 0));
  const naechstesNeues = module.find(m => !Number(m.sicherheit || 0));
  const quote = e => e.r / (e.r + e.f);
  const schwacheTrainer = Object.entries(st.trainer)
    .filter(([typ, e]) => kern.generatoren[typ] && e.r + e.f >= 3 && quote(e) < 0.6)
    .sort((a, b) => quote(a[1]) - quote(b[1])).slice(0, 3);
  const liste = h("ul", { class: "ap1-todo" });
  faelligeModule.slice(0, 4).forEach(m => liste.appendChild(h("li", {}, "🔁 Wiederholen: ", link(m.file.name), h("span", { class: "ap1-meta" }, ` (Sicherheit ${m.sicherheit}/5)`))));
  if (naechstesNeues) liste.appendChild(h("li", {}, "📘 Neu lernen: ", link(naechstesNeues.file.name), h("span", { class: "ap1-meta" }, ` (~${naechstesNeues.dauer || 60} min)`)));
  if (faelligeFragen) liste.appendChild(h("li", {}, `🧠 ${faelligeFragen} Quizfragen fällig → `, link(lib.SEITEN.quiz, "Quiz")));
  schwacheTrainer.forEach(([typ, e]) => liste.appendChild(h("li", {}, `🎯 Schwäche: ${kern.generatoren[typ].titel} (${Math.round(e.r / (e.r + e.f) * 100)} %) → `, link(lib.SEITEN.trainer, "Trainer"))));
  if (!liste.children.length) liste.appendChild(h("li", {}, "🎉 Nichts fällig – eine Probeprüfung wäre jetzt ein guter Test."));
  wurzel.appendChild(h("div", { class: "ap1-karte" }, h("div", { class: "ap1-karte-titel" }, "Als Nächstes"), liste));
}

// ---------------------------------------------------------------- Bereiche
{
  // Kachel je Bereich statt breiter Tabelle – passt sich jeder Notizbreite an (auch Seitenleiste/Handy)
  const raster = h("div", { class: "ap1-bereichsraster" });
  const farbe = q => q >= 0.8 ? "gut" : q >= 0.5 ? "mittel" : "schlecht";
  const zeile = (label, anteil, text, cls) => h("div", { class: "ap1-bereich-zeile" },
    h("span", { class: "ap1-bereich-label" }, label), lib.balken(anteil, cls), h("span", { class: "ap1-bereich-wert" }, text));
  lib.BEREICHE.forEach((b, i) => {
    const ms = module.filter(m => m.bereich === b);
    const qs = fragen.filter(q => (q.bereich || lib.bereichVon(q.modul)) === b);
    const gesehen = qs.filter(q => st.fragen[q.id]);
    const qr = gesehen.reduce((s, q) => s + st.fragen[q.id].r, 0), qf = gesehen.reduce((s, q) => s + st.fragen[q.id].f, 0);
    const tr = Object.entries(st.trainer).filter(([typ]) => lib.trainerBereich(typ) === b);
    const tR = tr.reduce((s, [, e]) => s + e.r, 0), tF = tr.reduce((s, [, e]) => s + e.f, 0);
    const avg = ms.length ? ms.reduce((s, m) => s + Number(m.sicherheit || 0), 0) / ms.length : 0;
    const sicher = ms.filter(m => Number(m.sicherheit || 0) >= 4).length;
    raster.appendChild(h("div", { class: `ap1-bereich b${i}` },
      h("div", { class: "ap1-bereich-titel" }, b),
      zeile("Module sicher", ms.length ? sicher / ms.length : 0, `${sicher}/${ms.length}`),
      zeile("Ø Sicherheit", avg / 5, avg ? kern.de(avg, 1) : "–"),
      zeile("Quiz gesehen", qs.length ? gesehen.length / qs.length : 0, `${gesehen.length}/${qs.length}`),
      zeile("Quiz-Quote", qr + qf ? qr / (qr + qf) : 0, qr + qf ? `${Math.round(qr / (qr + qf) * 100)} %` : "–", farbe(qr / (qr + qf || 1))),
      zeile("Trainer-Quote", tR + tF ? tR / (tR + tF) : 0, tR + tF ? `${Math.round(tR / (tR + tF) * 100)} %` : "–", farbe(tR / (tR + tF || 1)))));
  });
  wurzel.appendChild(h("div", { class: "ap1-karte" }, h("div", { class: "ap1-karte-titel" }, "Stand je Bereich"), raster));
}

// ---------------------------------------------------------------- Module
{
  const karte = h("div", { class: "ap1-karte" }, h("div", { class: "ap1-karte-titel" }, "Alle Lernmodule"));
  const raster = h("div", { class: "ap1-modulraster" });
  module.forEach(m => {
    const s = Number(m.sicherheit || 0);
    raster.appendChild(h("div", { class: `ap1-modul s${s} ${s && lib.modulFaellig(m) ? "faellig" : ""}`, title: `${m.titel || m.file.name} – Sicherheit ${s}/5` },
      h("span", { class: "ap1-modul-id" }, m.modul), link(m.file.name, m.titel || m.file.name)));
  });
  karte.appendChild(raster);
  karte.appendChild(h("div", { class: "ap1-meta" }, "Farbe = Selbsteinschätzung (grau = neu … grün = kann ich erklären). Gestrichelter Rand = Wiederholung fällig."));
  wurzel.appendChild(karte);
}

// ---------------------------------------------------------------- Probeprüfungen
if (st.pruefungen && st.pruefungen.length) {
  const zeilen = [["Datum", "Prüfung", "Punkte", "Note"], ...st.pruefungen.slice().reverse().map(p => [p.datum, p.name, `${p.gesamt}/100`, p.note])];
  wurzel.appendChild(h("div", { class: "ap1-karte" }, h("div", { class: "ap1-karte-titel" }, "Probeprüfungen"), lib.tabelle(zeilen)));
}
