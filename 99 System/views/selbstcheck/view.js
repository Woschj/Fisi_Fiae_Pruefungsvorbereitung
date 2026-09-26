// Selbsteinschätzung am Ende eines Lernmoduls: schreibt sicherheit/zuletzt/status ins Frontmatter.
// Aufruf: await dv.view("99 System/views/selbstcheck")
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const wurzel = dv.container;
wurzel.classList.add("ap1");
const lib = await new AsyncFunction("app", await dv.app.vault.adapter.read("99 System/scripts/ap1-lib.js"))(dv.app);
const { h } = lib;

const seite = dv.current();
const datei = dv.app.vault.getAbstractFileByPath(seite.file.path);
const STUFEN = [
  [1, "Neu für mich", "Ich habe es gelesen, kann es aber nicht wiedergeben."],
  [2, "Wacklig", "Ich erkenne es wieder, brauche aber die Notiz."],
  [3, "Geht so", "Standardaufgaben klappen, bei Varianten unsicher."],
  [4, "Sicher", "Ich löse Prüfungsaufgaben ohne Hilfe."],
  [5, "Kann ich erklären", "Ich könnte es jemand anderem beibringen."],
];
const STATUS = s => s <= 0 ? "neu" : s <= 2 ? "lernen" : s === 3 ? "wiederholen" : "sicher";
const TAGE = [0, 1, 2, 5, 12, 30];

function naechsteWiederholung(s, zuletzt) {
  if (!s || !zuletzt) return null;
  const d = new Date(String(zuletzt).slice(0, 10) + "T12:00:00");
  d.setDate(d.getDate() + TAGE[s]);
  return lib.datumStr(d);
}

function render(akt, zuletzt) {
  wurzel.empty();
  const karte = h("div", { class: "ap1-karte" });
  karte.appendChild(h("div", { class: "ap1-karte-titel" }, "Wie sicher bist du jetzt?"));
  const reihe = h("div", { class: "ap1-stufen" });
  STUFEN.forEach(([wert, name, beschr]) => {
    reihe.appendChild(h("button", { class: `ap1-stufe ${wert === akt ? "aktiv" : ""}`, title: beschr, onclick: () => setze(wert) },
      h("span", { class: "ap1-stufe-zahl" }, String(wert)), h("span", {}, name)));
  });
  karte.appendChild(reihe);
  const nw = naechsteWiederholung(akt, zuletzt);
  karte.appendChild(h("div", { class: "ap1-meta" }, akt
    ? `Eingeschätzt: ${akt}/5 am ${String(zuletzt).slice(0, 10)} · Status „${STATUS(akt)}“` + (nw ? ` · nächste Wiederholung ab ${nw}` : "")
    : "Noch nicht eingeschätzt. Tipp: erst den Selbstcheck oben machen, dann ehrlich bewerten."));
  wurzel.appendChild(karte);
}

async function setze(wert) {
  const tag = lib.heute();
  try {
    await dv.app.fileManager.processFrontMatter(datei, fm => { fm.sicherheit = wert; fm.zuletzt = tag; fm.status = STATUS(wert); });
    render(wert, tag);
  } catch (e) {
    console.error("AP1: Frontmatter konnte nicht geschrieben werden", e);
    lib.fehlerAnzeige(wurzel, `Speichern fehlgeschlagen: ${e.message}`);
  }
}

render(Number(seite.sicherheit || 0), seite.zuletzt ? (seite.zuletzt.toISODate ? seite.zuletzt.toISODate() : seite.zuletzt) : null);
