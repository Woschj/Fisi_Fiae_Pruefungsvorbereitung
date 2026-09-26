// Probeprüfung: 90-Minuten-Timer und Punkteerfassung je Aufgabe mit Live-Summe und Note.
// Aufruf: await dv.view("99 System/views/pruefung", { name: "Probeprüfung 1", aufgaben: [25, 25, 25, 25] })
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const wurzel = dv.container;
wurzel.classList.add("ap1");
const lib = await new AsyncFunction("app", await dv.app.vault.adapter.read("99 System/scripts/ap1-lib.js"))(dv.app);
const { h } = lib;
const opt = Object.assign({ name: dv.current().file.name, aufgaben: [25, 25, 25, 25], minuten: 90 }, input || {});
const SCHLUESSEL = `ap1-timer:${opt.name}`;
const MAX = opt.aufgaben.reduce((s, m) => s + m, 0);
// IHK-Notenschlüssel (100-Punkte-Skala)
const NOTE = p => p >= 92 ? 1 : p >= 81 ? 2 : p >= 67 ? 3 : p >= 50 ? 4 : p >= 30 ? 5 : 6;
const NOTE_TEXT = ["", "sehr gut", "gut", "befriedigend", "ausreichend", "mangelhaft", "ungenügend"];

function timerLesen() { try { return JSON.parse(localStorage.getItem(SCHLUESSEL)) || null; } catch { return null; } }
function timerSchreiben(v) { try { v ? localStorage.setItem(SCHLUESSEL, JSON.stringify(v)) : localStorage.removeItem(SCHLUESSEL); } catch { /* privater Modus o. Ä. – Timer läuft dann nur bis zum Neuladen */ } }
function verbrauchtSek(t) {
  if (!t) return 0;
  const ms = (t.pausiertBei || Date.now()) - t.start - t.pause;
  return Math.min(opt.minuten * 60, Math.max(0, Math.round(ms / 1000)));
}
const fmtZeit = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

const punkte = opt.aufgaben.map(() => "");
function auswerten() {
  const werte = punkte.map(p => (p.trim() === "" ? NaN : lib.kern.parseZahl(p)));
  const gueltig = werte.map((w, i) => !isNaN(w) && w >= 0 && w <= opt.aufgaben[i]);
  const summe = werte.reduce((s, w, i) => s + (gueltig[i] ? w : 0), 0);
  return { werte, gueltig, summe, prozent: Math.round(summe / MAX * 100), vollstaendig: gueltig.every(Boolean) };
}

function render() {
  wurzel.empty();
  const t = timerLesen();
  const raster = h("div", { class: "ap1-pruefung" });

  // --- Timer-Karte
  const anzeige = h("div", { class: "ap1-timer" });
  const status = h("div", { class: "ap1-timer-status" });
  const balken = lib.balken(0, "duenn");
  const tick = () => {
    const t2 = timerLesen(), v = verbrauchtSek(t2), rest = opt.minuten * 60 - v;
    anzeige.textContent = fmtZeit(rest);
    anzeige.className = `ap1-timer ${!t2 ? "" : rest === 0 ? "ende" : rest < 600 ? "knapp" : ""}`;
    status.textContent = !t2 ? "bereit" : rest === 0 ? "Zeit abgelaufen – Stift weg!" : t2.pausiertBei ? "pausiert" : `läuft · ${Math.floor(v / 60)} min vergangen`;
    balken.firstChild.style.width = `${Math.round(v / (opt.minuten * 60) * 100)}%`;
    balken.className = `ap1-balken duenn ${rest < 600 && t2 ? "mittel" : ""}`;
  };
  tick();
  const knopf = !t ? h("button", { class: "mod-cta", onclick: () => { timerSchreiben({ start: Date.now(), pause: 0 }); render(); } }, "▶ Prüfung starten")
    : t.pausiertBei ? h("button", { class: "mod-cta", onclick: () => { t.pause += Date.now() - t.pausiertBei; delete t.pausiertBei; timerSchreiben(t); render(); } }, "▶ Fortsetzen")
    : h("button", { onclick: () => { t.pausiertBei = Date.now(); timerSchreiben(t); render(); } }, "⏸ Pause");
  raster.appendChild(h("div", { class: "ap1-karte" },
    h("div", { class: "ap1-karte-titel" }, h("span", { class: "ap1-icon" }, "⏱"), "Prüfungszeit", h("span", { class: "ap1-badge" }, `${opt.minuten} min`)),
    h("div", { class: "ap1-timer-anzeige" }, anzeige), status, balken,
    h("div", { class: "ap1-meta" }, "Nur Taschenrechner und Stift. Lösungen erst nach Ablauf aufklappen."),
    h("div", { class: "ap1-aktionen" }, knopf, t ? h("button", { onclick: () => { timerSchreiben(null); render(); } }, "↺ Zurücksetzen") : null)));

  // --- Ergebnis-Karte
  const summeWert = h("span", { class: "ap1-summe-wert" });
  const noteEl = h("span", { class: "ap1-note" });
  const kacheln = h("div", { class: "ap1-punkte", style: `--ap1-n: ${opt.aufgaben.length}` });
  const aktualisieren = () => {
    const e = auswerten();
    summeWert.textContent = `${lib.kern.de(e.summe, 1)} / ${MAX}`;
    const n = NOTE(e.prozent);
    noteEl.textContent = e.werte.some(w => !isNaN(w)) ? `Note ${n} · ${NOTE_TEXT[n]}` : "–";
    noteEl.className = `ap1-note ${e.werte.some(w => !isNaN(w)) ? "n" + n : ""}`;
    [...kacheln.children].forEach((k, i) => k.classList.toggle("ungueltig", punkte[i].trim() !== "" && !e.gueltig[i]));
  };
  opt.aufgaben.forEach((max, i) => kacheln.appendChild(h("label", { class: "ap1-punkt" },
    h("span", { class: "ap1-punkt-label" }, `Aufgabe ${i + 1}`),
    h("input", { type: "text", inputmode: "decimal", value: punkte[i], placeholder: "–", oninput: ev => { punkte[i] = ev.target.value; aktualisieren(); } }),
    h("span", { class: "ap1-punkt-max" }, `von ${max}`))));
  aktualisieren();
  raster.appendChild(h("div", { class: "ap1-karte" },
    h("div", { class: "ap1-karte-titel" }, h("span", { class: "ap1-icon" }, "📝"), "Ergebnis"),
    kacheln,
    h("div", { class: "ap1-summe" }, summeWert, noteEl),
    h("div", { class: "ap1-aktionen" }, h("button", { class: "mod-cta", onclick: speichern }, "Ergebnis speichern"))));

  wurzel.appendChild(raster);
  // Nur die Zeitanzeige aktualisieren – ein komplettes Neu-Rendern würde die Punktefelder zurücksetzen
  clearInterval(window.__ap1TimerTick);
  if (t && !t.pausiertBei && verbrauchtSek(t) < opt.minuten * 60) {
    window.__ap1TimerTick = setInterval(() => { if (!anzeige.isConnected) { clearInterval(window.__ap1TimerTick); return; } tick(); }, 1000);
  }
}

async function speichern() {
  const e = auswerten();
  if (!e.vollstaendig) { new Notice("Bitte für jede Aufgabe gültige Punkte eintragen (0 bis Maximum)."); return; }
  await lib.aktualisiereStatistik(s => { s.pruefungen.push({ name: opt.name, datum: lib.heute(), punkte: e.werte, gesamt: e.prozent, note: String(NOTE(e.prozent)) }); });
  timerSchreiben(null);
  new Notice(`Gespeichert: ${e.prozent}/100 Punkte → Note ${NOTE(e.prozent)}`);
  punkte.fill(""); render();
}
render();
