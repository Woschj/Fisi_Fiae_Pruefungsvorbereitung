// AP1-Kern: reine Logik ohne Obsidian-Abhängigkeit (Zahlen, Prüfung, Aufgabengeneratoren).
// Wird von den Widgets per `new Function(code)()` geladen und ist dadurch auch in Node testbar.
// Die Datei endet mit `return {...}` – sie ist ein Funktionsrumpf, kein ES-Modul.

"use strict";

// ---------------------------------------------------------------------------
// Zufall
// ---------------------------------------------------------------------------
let zufall = Math.random;
function setzeZufall(fn) { zufall = fn; }
function rnd(a, b) { return a + Math.floor(zufall() * (b - a + 1)); }
function wahl(arr) { return arr[Math.floor(zufall() * arr.length)]; }
function mische(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(zufall() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function stichprobe(arr, n) { return mische(arr).slice(0, n); }

// ---------------------------------------------------------------------------
// Zahlen formatieren / einlesen (deutsche Schreibweise)
// ---------------------------------------------------------------------------
function runde(x, stellen = 2) { const f = Math.pow(10, stellen); return Math.round((x + Number.EPSILON) * f) / f; }

function de(x, stellen = 2) {
  if (!isFinite(x)) return String(x);
  const r = runde(x, stellen);
  const [ganz, frac] = Math.abs(r).toFixed(stellen).split(".");
  const ganzT = ganz.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const fracT = (frac || "").replace(/0+$/, "");
  return (r < 0 ? "−" : "") + ganzT + (fracT ? "," + fracT : "");
}
function euro(x) {
  const r = runde(x, 2);
  const [ganz, frac] = Math.abs(r).toFixed(2).split(".");
  return (r < 0 ? "−" : "") + ganz.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + frac + " €";
}
function prozent(x, stellen = 2) { return de(x * 100, stellen) + " %"; }

// Akzeptiert: 1234,5 · 1.234,5 · 1234.5 · 1 234,5 · 2,1e14 · 2,1·10^14 · 2,1*10^14 · −3
function parseZahl(eingabe) {
  if (eingabe === null || eingabe === undefined) return NaN;
  let s = String(eingabe).trim().toLowerCase()
    .replace(/[−–]/g, "-").replace(/\s+/g, "").replace(/[€%]|[a-zäöü\/]+$/g, "");
  if (s === "") return NaN;
  let exp = 0;
  const zehn = s.match(/^(.*?)[·*x×]10\^?\(?\+?(-?\d+)\)?$/);
  if (zehn) { s = zehn[1]; exp = parseInt(zehn[2], 10); }
  const e = s.match(/^(.*?)e\+?(-?\d+)$/);
  if (e) { s = e[1]; exp += parseInt(e[2], 10); }
  if (s.includes(",")) {
    s = s.replace(/\./g, "").replace(",", ".");
  } else if (/^-?\d{1,3}(\.\d{3})+$/.test(s)) {
    s = s.replace(/\./g, "");  // 1.234.567 → Tausenderpunkte
  }
  if (!/^-?\d*\.?\d+$/.test(s)) return NaN;
  return parseFloat(s) * Math.pow(10, exp);
}

// ---------------------------------------------------------------------------
// Antwortprüfung
// ---------------------------------------------------------------------------
function normText(s) {
  return String(s ?? "").toLowerCase().normalize("NFC")
    .replace(/[„“"'`´]/g, "").replace(/[‐-―−]/g, "-").replace(/\s+/g, " ").trim();
}
function normKompakt(s) { return normText(s).replace(/[\s\-_.,;:/()]/g, ""); }

function normIp(s) {
  const teile = String(s ?? "").trim().split(".");
  if (teile.length !== 4 || teile.some(t => !/^\d{1,3}$/.test(t.trim()))) return null;
  const zahlen = teile.map(t => parseInt(t, 10));
  return zahlen.some(z => z > 255) ? null : zahlen.join(".");
}
function normBin(s, exakt) {
  let t = String(s ?? "").toLowerCase().replace(/[\s_]/g, "").replace(/^0b/, "").replace(/b$/, "");
  if (!/^[01]+$/.test(t)) return null;
  return exakt ? t : (t.replace(/^0+(?=.)/, ""));
}
function normHex(s, exakt) {
  let t = String(s ?? "").toLowerCase().replace(/[\s_:\-]/g, "").replace(/^0x/, "").replace(/h$/, "");
  if (!/^[0-9a-f]+$/.test(t)) return null;
  return exakt ? t : (t.replace(/^0+(?=.)/, ""));
}

// Liefert {ok, teilweise?, hinweis?}
function pruefeFeld(feld, eingabe) {
  const roh = String(eingabe ?? "").trim();
  if (roh === "") return { ok: false, leer: true };
  const art = feld.art || "zahl";
  const loes = feld.loesung;
  switch (art) {
    case "zahl": {
      const x = parseZahl(roh);
      if (isNaN(x)) return { ok: false, hinweis: "Keine Zahl erkannt." };
      // „3.163“ ist mehrdeutig (Tausenderpunkt oder englischer Dezimalpunkt) → beide Lesarten gelten lassen
      const kandidaten = [x];
      if (/^-?\d{1,3}(\.\d{3})+$/.test(roh.replace(/[−–]/g, "-"))) kandidaten.push(parseFloat(roh.replace(/[−–]/g, "-")));
      const tol = feld.toleranz !== undefined ? feld.toleranz : Math.max(Math.abs(loes) * 0.005, 0.01);
      const ziele = [loes, ...(feld.alternativen || [])];
      return { ok: kandidaten.some(k => ziele.some(zl => Math.abs(k - zl) <= tol + 1e-9)) };
    }
    case "ip": {
      const n = normIp(roh);
      if (!n) return { ok: false, hinweis: "Format: vier Oktette 0–255, z. B. 192.168.1.0" };
      return { ok: n === normIp(loes) };
    }
    case "ipv6": {  // inhaltlich gleich (Kürzung egal), Präfix muss passen, falls angegeben
      const [adr, pre] = roh.split("/");
      const [ladr, lpre] = String(loes).split("/");
      const a = ipv6Voll(adr), b = ipv6Voll(ladr);
      if (!a) return { ok: false, hinweis: "Keine gültige IPv6-Adresse." };
      if (pre !== undefined && lpre !== undefined && pre.trim() !== lpre.trim()) return { ok: false, hinweis: "Präfixlänge stimmt nicht." };
      return { ok: a === b };
    }
    case "ipv6kurz": {  // exakt die kanonische Kurzform
      const e = roh.toLowerCase().replace(/\s/g, "");
      if (e === String(loes).toLowerCase()) return { ok: true };
      const a = ipv6Voll(e);
      if (a && a === ipv6Voll(loes)) return { ok: false, teilweise: true, hinweis: "Adresse stimmt, ist aber nicht maximal/regelkonform gekürzt." };
      return { ok: false };
    }
    case "bin": {
      const a = normBin(roh, feld.exakt), b = normBin(loes, feld.exakt);
      if (a === null) return { ok: false, hinweis: "Nur 0 und 1 erlaubt." };
      if (feld.exakt && a !== b && normBin(roh, false) === normBin(loes, false)) return { ok: false, teilweise: true, hinweis: `Wert stimmt, aber es werden genau ${b.length} Bit verlangt.` };
      return { ok: a === b };
    }
    case "hex": {
      const a = normHex(roh, feld.exakt), b = normHex(loes, feld.exakt);
      if (a === null) return { ok: false, hinweis: "Nur 0–9 und A–F erlaubt." };
      return { ok: a === b };
    }
    case "wahl": return { ok: normText(roh) === normText(loes) };
    case "menge": {  // Reihenfolge egal, z. B. kritischer Pfad „A, C, E“
      const a = normText(roh).split(/[\s,;\-–>→]+/).filter(Boolean).sort().join(",");
      const b = [...loes].map(normText).sort().join(",");
      return { ok: a === b };
    }
    case "text":
    default: {
      const kand = [loes, ...(feld.alternativen || [])].map(normKompakt);
      return { ok: kand.includes(normKompakt(roh)) };
    }
  }
}

// ---------------------------------------------------------------------------
// IPv4 / IPv6
// ---------------------------------------------------------------------------
function ipZuInt(s) { return s.split(".").reduce((a, o) => ((a << 8) + parseInt(o, 10)) >>> 0, 0) >>> 0; }
function intZuIp(n) { return [24, 16, 8, 0].map(v => (n >>> v) & 255).join("."); }
function maske(p) { return p === 0 ? 0 : (0xFFFFFFFF << (32 - p)) >>> 0; }
function netzVon(ip, p) { return (ip & maske(p)) >>> 0; }
function bcastVon(ip, p) { return (netzVon(ip, p) | (~maske(p) >>> 0)) >>> 0; }
function bin8(n) { return n.toString(2).padStart(8, "0"); }
function maskeBinaer(p) { return intZuIp(maske(p)).split(".").map(o => bin8(+o)).join("."); }
function hostsBei(p) { return Math.pow(2, 32 - p) - 2; }

function ipv6Voll(s) {
  if (!s) return null;
  let t = String(s).trim().toLowerCase();
  if (!/^[0-9a-f:]+$/.test(t) || (t.match(/::/g) || []).length > 1) return null;
  let bloecke;
  if (t.includes("::")) {
    const [l, r] = t.split("::");
    const L = l ? l.split(":") : [], R = r ? r.split(":") : [];
    const fehlt = 8 - L.length - R.length;
    if (fehlt < 1) return null;
    bloecke = [...L, ...Array(fehlt).fill("0"), ...R];
  } else bloecke = t.split(":");
  if (bloecke.length !== 8 || bloecke.some(b => !/^[0-9a-f]{1,4}$/.test(b))) return null;
  return bloecke.map(b => b.padStart(4, "0")).join(":");
}
// Kanonische Kurzform nach RFC 5952
function ipv6Kurz(voll) {
  const b = ipv6Voll(voll).split(":").map(x => x.replace(/^0+(?=.)/, ""));
  let bestS = -1, bestL = 0, s = -1;
  for (let i = 0; i <= 8; i++) {
    if (i < 8 && b[i] === "0") { if (s < 0) s = i; }
    else if (s >= 0) { const l = i - s; if (l > bestL) { bestL = l; bestS = s; } s = -1; }
  }
  if (bestL < 2) return b.join(":");
  const links = b.slice(0, bestS).join(":"), rechts = b.slice(bestS + bestL).join(":");
  return links + "::" + rechts;
}

// ---------------------------------------------------------------------------
// Generator-Hilfen
// ---------------------------------------------------------------------------
// Jede Aufgabe: { titel, text, code?, tabelle?, felder:[{key,label,art,loesung,anzeige?,einheit?,toleranz?,optionen?}], weg:[...] }
function z(label, loesung, extra = {}) { return Object.assign({ key: label, label, art: "zahl", loesung }, extra); }
function f(label, art, loesung, extra = {}) { return Object.assign({ key: label, label, art, loesung }, extra); }

function privateIp(minPrefix) {
  const bereich = wahl([
    { b: 10, p: 8, gen: () => [10, rnd(0, 255), rnd(0, 255), rnd(0, 255)] },
    { b: 172, p: 12, gen: () => [172, rnd(16, 31), rnd(0, 255), rnd(0, 255)] },
    { b: 192, p: 16, gen: () => [192, 168, rnd(0, 255), rnd(0, 255)] },
  ].filter(x => x.p <= minPrefix));
  return ipZuInt(bereich.gen().join("."));
}

function oktettErklaerung(ip, p) {
  const zeilen = [];
  const m = intZuIp(maske(p));
  zeilen.push(`Präfix /${p} → ${p} Einsen: \`${maskeBinaer(p)}\` → Maske **${m}**`);
  if (p % 8 === 0) {
    zeilen.push(`/${p} endet genau an einer Oktettgrenze: Die ersten ${p / 8} Oktette sind Netzanteil, der Rest ist Hostanteil.`);
  } else {
    const k = Math.floor(p / 8);
    const mw = +m.split(".")[k];
    const wert = +intZuIp(ip).split(".")[k];
    const block = 256 - mw;
    zeilen.push(`Interessantes Oktett: ${k + 1}. Oktett (Maskenwert ${mw}) → Blockgröße 256 − ${mw} = **${block}**`);
    zeilen.push(`Wert im ${k + 1}. Oktett: ${wert} → größtes Vielfaches von ${block}, das ≤ ${wert} ist: **${Math.floor(wert / block) * block}**`);
  }
  return zeilen;
}

// ---------------------------------------------------------------------------
// Generatoren: Netzwerk
// ---------------------------------------------------------------------------
const G = {};

G["subnetz-analyse"] = {
  titel: "IPv4: Adresse analysieren", bereich: "Netzwerk", modul: "N2",
  erzeuge() {
    const p = wahl([16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 26, 27, 27, 28, 28, 29, 30]);
    let ip, netz, bc;
    do { ip = privateIp(p); netz = netzVon(ip, p); bc = bcastVon(ip, p); } while (ip === netz || ip === bc);
    const n = netz, b = bc;
    return {
      titel: this.titel,
      text: `Ein Host hat die Adresse **${intZuIp(ip)}/${p}**. Bestimme:`,
      felder: [
        f("Subnetzmaske", "ip", intZuIp(maske(p))),
        f("Netzadresse", "ip", intZuIp(n)),
        f("Broadcastadresse", "ip", intZuIp(b)),
        f("Erste Hostadresse", "ip", intZuIp(n + 1)),
        f("Letzte Hostadresse", "ip", intZuIp(b - 1)),
        z("Anzahl nutzbarer Hosts", hostsBei(p), { toleranz: 0 }),
      ],
      weg: [
        ...oktettErklaerung(ip, p),
        `Netzadresse (alle Hostbits 0): **${intZuIp(n)}** · nächstes Netz: ${intZuIp((b + 1) >>> 0)}`,
        `Broadcast = eine Adresse vor dem nächsten Netz: **${intZuIp(b)}**`,
        `Hostbereich: **${intZuIp(n + 1)} – ${intZuIp(b - 1)}**`,
        `Hosts: 2^(32 − ${p}) − 2 = 2^${32 - p} − 2 = **${de(hostsBei(p), 0)}**`,
      ],
    };
  },
};

G["subnetz-teilen"] = {
  titel: "IPv4: Netz in Subnetze teilen", bereich: "Netzwerk", modul: "N2",
  erzeuge() {
    let bp, n, s, np;
    do {
      bp = wahl([16, 20, 22, 23, 24, 24, 24]);
      n = wahl([3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20, 30]);
      s = Math.ceil(Math.log2(n)); np = bp + s;
    } while (np > 30);
    const basis = netzVon(privateIp(bp), bp);
    const k = rnd(2, n);
    const block = Math.pow(2, 32 - np);
    const netzK = (basis + (k - 1) * block) >>> 0;
    return {
      titel: this.titel,
      text: `Das Netz **${intZuIp(basis)}/${bp}** soll in **${n} gleich große** Subnetze aufgeteilt werden (so groß wie möglich). Die Subnetze werden ab 1 gezählt.`,
      felder: [
        z("Neues Präfix (Zahl nach /)", np, { toleranz: 0 }),
        f("Neue Subnetzmaske", "ip", intZuIp(maske(np))),
        z("Nutzbare Hosts pro Subnetz", hostsBei(np), { toleranz: 0 }),
        f(`Netzadresse des ${k}. Subnetzes`, "ip", intZuIp(netzK)),
        f(`Broadcast des ${k}. Subnetzes`, "ip", intZuIp((netzK + block - 1) >>> 0)),
      ],
      weg: [
        `Benötigte Subnetzbits: kleinstes s mit 2^s ≥ ${n} → s = **${s}** (2^${s} = ${Math.pow(2, s)} Subnetze)`,
        `Neues Präfix: ${bp} + ${s} = **/${np}** → Maske **${intZuIp(maske(np))}**`,
        `Adressen pro Subnetz: 2^(32 − ${np}) = ${de(block, 0)} → Hosts: **${de(hostsBei(np), 0)}**`,
        `Das ${k}. Subnetz beginnt bei Basis + (${k} − 1) × ${de(block, 0)} Adressen → **${intZuIp(netzK)}**`,
        `Broadcast = Netzadresse + ${de(block - 1, 0)} → **${intZuIp((netzK + block - 1) >>> 0)}**`,
      ],
    };
  },
};

G["subnetz-hosts"] = {
  titel: "IPv4: Präfix für Hostanzahl", bereich: "Netzwerk", modul: "N2",
  erzeuge() {
    const h = wahl([rnd(3, 14), rnd(15, 62), rnd(63, 254), rnd(255, 1022), rnd(1023, 4094)]);
    const hb = Math.ceil(Math.log2(h + 2));
    const p = 32 - hb;
    return {
      titel: this.titel,
      text: `In einem Subnetz müssen **${de(h, 0)} Geräte** (inkl. Gateway) adressiert werden. Wähle das kleinstmögliche Subnetz.`,
      felder: [
        z("Präfixlänge", p, { toleranz: 0 }),
        f("Subnetzmaske", "ip", intZuIp(maske(p))),
        z("Maximal nutzbare Hosts", hostsBei(p), { toleranz: 0 }),
      ],
      weg: [
        `Gesucht: kleinstes h mit 2^h − 2 ≥ ${h}`,
        `2^${hb - 1} − 2 = ${de(Math.pow(2, hb - 1) - 2, 0)} reicht nicht, 2^${hb} − 2 = ${de(hostsBei(p), 0)} reicht → **${hb} Hostbits**`,
        `Präfix = 32 − ${hb} = **/${p}** → Maske **${intZuIp(maske(p))}**`,
      ],
    };
  },
};

G["subnetz-gleich"] = {
  titel: "IPv4: Gleiches Netz?", bereich: "Netzwerk", modul: "N2",
  erzeuge() {
    const p = rnd(20, 29);
    const a = privateIp(p);
    const netzA = netzVon(a, p), block = Math.pow(2, 32 - p);
    const gleich = zufall() < 0.5;
    let b;
    if (gleich) { do { b = (netzA + rnd(1, block - 2)) >>> 0; } while (b === a); }
    else { const nb = (netzA + (zufall() < 0.5 ? block : -block)) >>> 0; b = (nb + rnd(1, block - 2)) >>> 0; }
    return {
      titel: this.titel,
      text: `Liegen **${intZuIp(a)}/${p}** und **${intZuIp(b)}/${p}** im selben Netz?`,
      felder: [
        f("Netzadresse von A", "ip", intZuIp(netzA)),
        f("Netzadresse von B", "ip", intZuIp(netzVon(b, p))),
        f("Selbes Netz?", "wahl", gleich ? "ja" : "nein", { optionen: ["ja", "nein"] }),
      ],
      weg: [
        ...oktettErklaerung(a, p),
        `A: Netz **${intZuIp(netzA)}** · B: Netz **${intZuIp(netzVon(b, p))}**`,
        gleich ? "Gleiche Netzadresse → **selbes Netz**, direkte Kommunikation über den Switch möglich."
               : "Unterschiedliche Netzadressen → **verschiedene Netze**, ein Router (Gateway) ist nötig.",
      ],
    };
  },
};

G["vlsm"] = {
  titel: "IPv4: VLSM-Planung", bereich: "Netzwerk", modul: "N2",
  erzeuge() {
    const namen = mische(["Verwaltung", "Vertrieb", "Lager", "Werkstatt", "Gäste-WLAN", "Server", "Drucker", "Entwicklung", "Schulung"]);
    let anf;
    do {
      const anzahl = rnd(3, 4);
      anf = Array.from({ length: anzahl }, (_, i) => ({ name: namen[i], hosts: wahl([rnd(2, 12), rnd(13, 28), rnd(29, 60), rnd(61, 120)]) }));
      anf.forEach(a => { a.hb = Math.ceil(Math.log2(a.hosts + 2)); a.groesse = Math.pow(2, a.hb); a.p = 32 - a.hb; });
    } while (anf.reduce((s, a) => s + a.groesse, 0) > 256 || new Set(anf.map(a => a.groesse)).size < anf.length);
    const basis = ipZuInt(`192.168.${rnd(0, 250)}.0`);
    const sortiert = anf.slice().sort((x, y) => y.groesse - x.groesse);
    let pos = basis;
    sortiert.forEach(a => { a.netz = pos; pos = (pos + a.groesse) >>> 0; });
    const felder = [];
    sortiert.forEach(a => {
      felder.push(z(`${a.name}: Präfix`, a.p, { toleranz: 0 }));
      felder.push(f(`${a.name}: Netzadresse`, "ip", intZuIp(a.netz)));
    });
    return {
      titel: this.titel,
      text: `Aus **${intZuIp(basis)}/24** sollen lückenlos (ab der ersten Adresse) möglichst kleine Subnetze vergeben werden. Große Netze zuerst.\n` +
        mische(anf).map(a => `- ${a.name}: **${a.hosts} Hosts**`).join("\n"),
      felder,
      weg: [
        "1. Nach Größe **absteigend** sortieren, 2. pro Netz kleinstes h mit 2^h − 2 ≥ Hosts, 3. lückenlos vergeben.",
        ...sortiert.map(a => `${a.name} (${a.hosts}): 2^${a.hb} − 2 = ${a.groesse - 2} → **/${a.p}**, Netz **${intZuIp(a.netz)}** – Broadcast ${intZuIp((a.netz + a.groesse - 1) >>> 0)}`),
        `Frei ab ${intZuIp(pos)}`,
      ],
    };
  },
};

G["maske-praefix"] = {
  titel: "IPv4: Maske ↔ Präfix", bereich: "Netzwerk", modul: "N2",
  erzeuge() {
    const p = rnd(8, 30);
    const richtung = zufall() < 0.5;
    return {
      titel: this.titel,
      text: richtung ? `Wandle das Präfix **/${p}** um.` : `Wandle die Subnetzmaske **${intZuIp(maske(p))}** um.`,
      felder: [
        richtung ? f("Subnetzmaske", "ip", intZuIp(maske(p))) : z("Präfixlänge", p, { toleranz: 0 }),
        z("Adressen im Netz", Math.pow(2, 32 - p), { toleranz: 0 }),
        z("Nutzbare Hosts", hostsBei(p), { toleranz: 0 }),
      ],
      weg: [
        `Binär: \`${maskeBinaer(p)}\` → ${p} Einsen = **/${p}** = **${intZuIp(maske(p))}**`,
        `Adressen: 2^${32 - p} = **${de(Math.pow(2, 32 - p), 0)}**, Hosts: **${de(hostsBei(p), 0)}**`,
      ],
    };
  },
};

function zufallsIpv6() {
  // realistische Adressen mit Nullblöcken und führenden Nullen
  for (;;) {
    const bloecke = [];
    const praefix = wahl([["2001", "0db8"], ["fd00", null], ["fe80", "0000"], ["2a02", null]]);
    bloecke.push(praefix[0]); bloecke.push(praefix[1] ?? rnd(0, 0xffff).toString(16).padStart(4, "0"));
    for (let i = 2; i < 8; i++) {
      const r = zufall();
      bloecke.push(r < 0.45 ? "0000" : r < 0.75 ? rnd(1, 0xff).toString(16).padStart(4, "0") : rnd(0x100, 0xffff).toString(16).padStart(4, "0"));
    }
    const voll = bloecke.join(":");
    if (/0000:0000/.test(voll)) return voll;  // mindestens eine kürzbare Nullfolge
  }
}

G["ipv6-kuerzen"] = {
  titel: "IPv6: Adresse kürzen", bereich: "Netzwerk", modul: "N3",
  erzeuge() {
    const voll = zufallsIpv6();
    const kurz = ipv6Kurz(voll);
    return {
      titel: this.titel,
      text: `Kürze die Adresse so weit wie möglich (Regeln nach RFC 5952):\n\`${voll}\``,
      felder: [f("Kurzform", "ipv6kurz", kurz)],
      weg: [
        `1. Führende Nullen je Block streichen: \`${voll.split(":").map(x => x.replace(/^0+(?=.)/, "")).join(":")}\``,
        "2. Die **längste** Folge von Null-Blöcken (mind. 2) durch `::` ersetzen – bei Gleichstand die **erste**, `::` nur **einmal**.",
        `Ergebnis: **\`${kurz}\`**`,
      ],
    };
  },
};

G["ipv6-expandieren"] = {
  titel: "IPv6: Adresse ausschreiben", bereich: "Netzwerk", modul: "N3",
  erzeuge() {
    const voll = zufallsIpv6();
    const kurz = ipv6Kurz(voll);
    return {
      titel: this.titel,
      text: `Schreibe die Adresse vollständig aus (8 Blöcke à 4 Hex-Ziffern):\n\`${kurz}\``,
      felder: [f("Vollständige Adresse", "text", voll)],
      weg: [
        `Anzahl vorhandener Blöcke zählen → \`::\` steht für die fehlenden Null-Blöcke bis insgesamt 8.`,
        "Jeden Block links mit Nullen auf 4 Ziffern auffüllen.",
        `Ergebnis: **\`${voll}\`**`,
      ],
    };
  },
};

G["ipv6-praefix"] = {
  titel: "IPv6: Präfix aufteilen", bereich: "Netzwerk", modul: "N3",
  erzeuge() {
    const b3 = rnd(1, 0xfff).toString(16) + "0";
    const np = wahl([52, 56, 60]);
    const anzahl = Math.pow(2, np - 48);
    const k = rnd(1, Math.min(anzahl - 1, 20));
    const wert = (k * Math.pow(2, 64 - np)).toString(16);
    const voll = ipv6Voll(`2001:db8:${b3}:${wert}::`);
    const kurz = ipv6Kurz(voll);
    return {
      titel: this.titel,
      text: `Ein Unternehmen erhält das Präfix **2001:db8:${b3}::/48** und teilt es in gleich große **/${np}**-Subnetze. Die Subnetze werden ab 0 nummeriert.`,
      felder: [
        z("Anzahl /" + np + "-Subnetze", anzahl, { toleranz: 0 }),
        z("Anzahl /64-Netze je Subnetz", Math.pow(2, 64 - np), { toleranz: 0 }),
        f(`Präfix von Subnetz Nr. ${k}`, "ipv6", `${kurz}/${np}`, { anzeige: `${kurz}/${np}` }),
      ],
      weg: [
        `Subnetzbits: ${np} − 48 = ${np - 48} → 2^${np - 48} = **${anzahl}** Subnetze`,
        `Je Subnetz bleiben 64 − ${np} = ${64 - np} Bit bis /64 → 2^${64 - np} = **${de(Math.pow(2, 64 - np), 0)}** /64-Netze`,
        `Die Subnetzbits liegen im 4. Block (Bits 49–64). Schrittweite im 4. Block: 2^${64 - np} = 0x${Math.pow(2, 64 - np).toString(16)}`,
        `Subnetz ${k}: ${k} × 0x${Math.pow(2, 64 - np).toString(16)} = 0x${wert} → **${kurz}/${np}**`,
      ],
    };
  },
};

const PORTS = [
  { p: "20/21", alt: ["21", "20 21", "20,21", "20/21"], n: ["FTP"], t: "TCP" },
  { p: "22", n: ["SSH", "SFTP", "SCP"], t: "TCP" },
  { p: "23", n: ["Telnet"], t: "TCP" },
  { p: "25", n: ["SMTP"], t: "TCP" },
  { p: "53", n: ["DNS"], t: "UDP/TCP" },
  { p: "67/68", alt: ["67", "67 68", "67,68", "67/68"], n: ["DHCP"], t: "UDP" },
  { p: "80", n: ["HTTP"], t: "TCP" },
  { p: "110", n: ["POP3"], t: "TCP" },
  { p: "123", n: ["NTP"], t: "UDP" },
  { p: "143", n: ["IMAP"], t: "TCP" },
  { p: "161", n: ["SNMP"], t: "UDP" },
  { p: "389", n: ["LDAP"], t: "TCP" },
  { p: "443", n: ["HTTPS"], t: "TCP" },
  { p: "445", n: ["SMB"], t: "TCP" },
  { p: "465", n: ["SMTPS"], t: "TCP" },
  { p: "587", n: ["SMTP Submission", "Submission", "SMTP"], t: "TCP" },
  { p: "636", n: ["LDAPS"], t: "TCP" },
  { p: "993", n: ["IMAPS"], t: "TCP" },
  { p: "995", n: ["POP3S"], t: "TCP" },
  { p: "3389", n: ["RDP"], t: "TCP" },
  { p: "5060", n: ["SIP"], t: "UDP/TCP" },
];
G["ports"] = {
  titel: "Ports und Protokolle", bereich: "Netzwerk", modul: "N4",
  erzeuge() {
    const e = wahl(PORTS);
    if (zufall() < 0.5 && !e.p.includes("/")) {
      return {
        titel: this.titel, text: `Welches Protokoll nutzt standardmäßig **Port ${e.p}**?`,
        felder: [f("Protokoll", "text", e.n[0], { alternativen: e.n.slice(1), anzeige: e.n.join(" / ") })],
        weg: [`Port ${e.p} → **${e.n.join(" / ")}** (${e.t})`],
      };
    }
    return {
      titel: this.titel, text: `Welchen Port nutzt **${e.n[0]}** standardmäßig?`,
      felder: [f("Port", "text", e.p, { alternativen: e.alt || [], anzeige: e.p })],
      weg: [`${e.n[0]} → **Port ${e.p}** (${e.t})`],
    };
  },
};

G["hex-header"] = {
  titel: "Hex-Werte aus Paketheadern", bereich: "Netzwerk", modul: "N1",
  erzeuge() {
    const art = wahl(["ip", "ip", "port", "zurueck"]);
    if (art === "port") {
      const port = wahl([rnd(1024, 65535), wahl([22, 25, 53, 80, 110, 143, 443, 993, 3389])]);
      const hex = port.toString(16).padStart(4, "0");
      const d = hex.split("").map(c => parseInt(c, 16));
      return {
        titel: this.titel, text: `Im TCP-Header steht der Zielport als Hex-Wert **${hex.slice(0, 2)} ${hex.slice(2)}**. Wie lautet der Port dezimal?`,
        felder: [z("Port (dezimal)", port, { toleranz: 0 })],
        weg: [`${d[0]}·16³ + ${d[1]}·16² + ${d[2]}·16 + ${d[3]} = ${d[0] * 4096} + ${d[1] * 256} + ${d[2] * 16} + ${d[3]} = **${port}**`],
      };
    }
    const okt = [rnd(1, 223), rnd(0, 255), rnd(0, 255), rnd(1, 254)];
    const hex = okt.map(o => o.toString(16).padStart(2, "0"));
    if (art === "zurueck") {
      return {
        titel: this.titel, text: `Wie steht die IP-Adresse **${okt.join(".")}** hexadezimal im IP-Header? (4 Bytes, z. B. \`0a 00 00 01\`)`,
        felder: [f("Hex-Darstellung", "hex", hex.join(""), { exakt: true, anzeige: hex.join(" ") })],
        weg: okt.map((o, i) => `${o} = ${Math.floor(o / 16)}·16 + ${o % 16} → **${hex[i]}**`),
      };
    }
    return {
      titel: this.titel, text: `Die Quell-IP im IP-Header lautet hexadezimal **${hex.join(" ")}**. Wie lautet sie in Punktschreibweise?`,
      felder: [f("IP-Adresse", "ip", okt.join("."))],
      weg: [...hex.map((h, i) => `${h} → ${parseInt(h[0], 16)}·16 + ${parseInt(h[1], 16)} = **${okt[i]}**`), `→ **${okt.join(".")}**`],
    };
  },
};

G["db"] = {
  titel: "Pegel und Dämpfung (dB)", bereich: "Netzwerk", modul: "N5",
  erzeuge() {
    const art = wahl(["u", "p", "dbm", "mw", "kette", "acr"]);
    if (art === "u") {
      const ue = rnd(10, 50), ua = runde(ue * (0.3 + zufall() * 0.6), 1);
      const a = 20 * Math.log10(ue / ua);
      return { titel: this.titel, text: `Am Kabelanfang liegen **${de(ue)} V** an, am Ende werden **${de(ua)} V** gemessen. Berechne die Dämpfung.`,
        felder: [z("Dämpfung a in dB", runde(a, 2), { toleranz: 0.02 })],
        weg: [`Spannungsverhältnis → Faktor **20**: a = 20 · log(U_ein / U_aus)`, `a = 20 · log(${de(ue)} / ${de(ua)}) = 20 · log(${de(ue / ua, 4)}) = **${de(a, 2)} dB**`] };
    }
    if (art === "p") {
      const pe = wahl([10, 20, 40, 50, 80, 100]), pa = runde(pe * wahl([0.5, 0.25, 0.1, 0.4, 0.8, 0.2]), 2);
      const a = 10 * Math.log10(pe / pa);
      return { titel: this.titel, text: `Eine Strecke erhält **${de(pe)} mW** und gibt **${de(pa)} mW** ab. Berechne die Dämpfung.`,
        felder: [z("Dämpfung a in dB", runde(a, 2), { toleranz: 0.02 })],
        weg: [`Leistungsverhältnis → Faktor **10**: a = 10 · log(P_ein / P_aus)`, `a = 10 · log(${de(pe)} / ${de(pa)}) = **${de(a, 2)} dB**`, "Merke: Halbierung der Leistung ≈ 3 dB, Zehntel = 10 dB."] };
    }
    if (art === "dbm") {
      const p = wahl([1, 2, 5, 10, 20, 50, 100, 200, 500, 1000]);
      const l = 10 * Math.log10(p);
      return { titel: this.titel, text: `Ein Access Point sendet mit **${de(p)} mW**. Wie groß ist der Pegel in dBm?`,
        felder: [z("Pegel in dBm", runde(l, 2), { toleranz: 0.02 })],
        weg: [`dBm = 10 · log(P / 1 mW) = 10 · log(${de(p)}) = **${de(l, 2)} dBm**`] };
    }
    if (art === "mw") {
      const l = wahl([0, 3, 7, 10, 13, 17, 20, 23, 27, 30]);
      const p = Math.pow(10, l / 10);
      return { titel: this.titel, text: `Ein Sender hat einen Pegel von **${l} dBm**. Welche Leistung ist das?`,
        felder: [z("Leistung in mW", runde(p, 2))],
        weg: [`P = 1 mW · 10^(dBm / 10) = 10^(${l}/10) = **${de(p, 2)} mW**`] };
    }
    if (art === "kette") {
      const teile = Array.from({ length: rnd(2, 4) }, () => runde(0.5 + zufall() * 6, 1));
      const ges = runde(teile.reduce((s, x) => s + x, 0), 1);
      const ue = rnd(2, 12);
      const ua = ue / Math.pow(10, ges / 20);
      return { titel: this.titel, text: `Ein Signal durchläuft Teilstrecken mit den Dämpfungen ${teile.map(x => de(x) + " dB").join(", ")}. Am Eingang liegen **${ue} V** an.`,
        felder: [z("Gesamtdämpfung in dB", ges, { toleranz: 0.05 }), z("Ausgangsspannung in V", runde(ua, 3), { toleranz: Math.max(ua * 0.01, 0.005) })],
        weg: [`dB-Werte einer Kette werden **addiert**: ${teile.map(x => de(x)).join(" + ")} = **${de(ges)} dB**`,
          `U_aus = U_ein / 10^(a/20) = ${ue} / 10^(${de(ges)}/20) = ${ue} / ${de(Math.pow(10, ges / 20), 3)} = **${de(ua, 3)} V**`] };
    }
    const next = runde(30 + zufall() * 30, 1), a = runde(5 + zufall() * 20, 1);
    return { titel: this.titel, text: `Für ein Kabel wurden **NEXT = ${de(next)} dB** und eine Dämpfung von **a = ${de(a)} dB** gemessen. Wie groß ist der ACR?`,
      felder: [z("ACR in dB", runde(next - a, 1), { toleranz: 0.05 })],
      weg: [`ACR = NEXT − a = ${de(next)} − ${de(a)} = **${de(next - a)} dB**`, "Je größer der ACR, desto besser hebt sich das Nutzsignal vom Übersprechen ab."] };
  },
};

// ---------------------------------------------------------------------------
// Generatoren: Hardware
// ---------------------------------------------------------------------------
const EINHEITEN = {
  B: 1, kB: 1e3, MB: 1e6, GB: 1e9, TB: 1e12,
  KiB: 1024, MiB: 1024 ** 2, GiB: 1024 ** 3, TiB: 1024 ** 4,
};
G["einheiten"] = {
  titel: "Speichereinheiten umrechnen", bereich: "Hardware", modul: "H3",
  erzeuge() {
    const paare = [["TB", "TiB"], ["GB", "GiB"], ["GiB", "GB"], ["MiB", "MB"], ["TB", "GiB"], ["GiB", "MiB"], ["MB", "kB"], ["TiB", "GB"], ["GB", "MiB"]];
    const [von, nach] = wahl(paare);
    const wert = wahl([1, 2, 4, 8, 16, 32, 64, 120, 250, 256, 500, 512, 750, 1000, 1024, 2000]);
    const erg = wert * EINHEITEN[von] / EINHEITEN[nach];
    const bitArt = zufall() < 0.3;
    if (bitArt) {
      const mb = wahl([10, 25, 50, 100, 250, 500, 1000]);
      return { titel: this.titel, text: `Wie viele **MB/s** entsprechen **${mb} Mbit/s**?`,
        felder: [z("MB/s", mb / 8)], weg: [`1 Byte = 8 Bit → ${mb} / 8 = **${de(mb / 8, 3)} MB/s**`] };
    }
    const bin = s => s.includes("i");
    return {
      titel: this.titel, text: `Rechne **${de(wert, 0)} ${von}** in **${nach}** um.`,
      felder: [z(nach, runde(erg, 4), { toleranz: Math.max(Math.abs(erg) * 0.002, 0.005) })],
      weg: [
        `${von} ist ${bin(von) ? "binär (Basis 1024)" : "dezimal (Basis 1000)"}, ${nach} ist ${bin(nach) ? "binär" : "dezimal"}.`,
        `Über Byte rechnen: ${de(wert, 0)} ${von} = ${de(wert, 0)} × ${de(EINHEITEN[von], 0)} B = ${de(wert * EINHEITEN[von], 0)} B`,
        `÷ ${de(EINHEITEN[nach], 0)} = **${de(erg, 4)} ${nach}**`,
      ],
    };
  },
};

function dauerText(s) {
  if (s < 60) return `${de(s, 1)} s`;
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), r = Math.round(s % 60);
  return (h ? `${h} h ` : "") + `${m} min ${r} s`;
}
G["uebertragung"] = {
  titel: "Übertragungsdauer", bereich: "Hardware", modul: "H3",
  erzeuge() {
    const einheit = wahl(["GB", "GiB", "MB", "MiB", "TB"]);
    const menge = einheit === "TB" ? wahl([0.5, 1, 2, 4]) : einheit.startsWith("M") ? wahl([150, 350, 700, 800, 1500]) : wahl([1.5, 2, 4, 4.7, 8, 12, 18, 25, 40]);
    const rate = wahl([16, 25, 40, 50, 100, 150, 250, 300, 600, 1000]);
    const eff = zufall() < 0.35 ? wahl([0.6, 0.7, 0.8]) : 1;
    const bits = menge * EINHEITEN[einheit] * 8;
    const t = bits / (rate * 1e6 * eff);
    return {
      titel: this.titel,
      text: `Eine Datei mit **${de(menge)} ${einheit}** wird über eine Leitung mit **${rate} Mbit/s** übertragen` + (eff < 1 ? `, von denen effektiv nur **${eff * 100} %** für Nutzdaten zur Verfügung stehen.` : " (ohne Overhead)."),
      felder: [z("Dauer in Sekunden", runde(t, 2), { toleranz: Math.max(t * 0.005, 0.5) })],
      weg: [
        `Datenmenge in Bit: ${de(menge)} × ${de(EINHEITEN[einheit], 0)} B × 8 = ${de(bits, 0)} Bit`,
        `Datenrate (immer dezimal!): ${rate} × 10⁶ Bit/s` + (eff < 1 ? ` × ${de(eff)} = ${de(rate * eff)} × 10⁶ Bit/s` : ""),
        `t = ${de(bits, 0)} / ${de(rate * 1e6 * eff, 0)} = **${de(t, 2)} s** ≈ ${dauerText(t)}`,
      ],
    };
  },
};

G["datenmenge"] = {
  titel: "Datenmenge: Bild, Audio, Video", bereich: "Hardware", modul: "H3",
  erzeuge() {
    const art = wahl(["bild", "audio", "video"]);
    const aufl = wahl([[1920, 1080, "Full HD"], [2560, 1440, "WQHD"], [3840, 2160, "4K"], [1280, 720, "HD"]]);
    if (art === "bild") {
      const tiefe = wahl([8, 16, 24, 32]);
      const b = aufl[0] * aufl[1] * tiefe / 8;
      return { titel: this.titel, text: `Wie groß ist ein unkomprimiertes Bild mit ${aufl[0]} × ${aufl[1]} Pixeln und **${tiefe} Bit** Farbtiefe?`,
        felder: [z("Größe in MB", runde(b / 1e6, 3)), z("Größe in MiB", runde(b / 1024 ** 2, 3)), z("Anzahl darstellbarer Farben", Math.pow(2, tiefe), { toleranz: 0 })],
        weg: [`${aufl[0]} × ${aufl[1]} = ${de(aufl[0] * aufl[1], 0)} Pixel × ${tiefe / 8} Byte = **${de(b, 0)} Byte**`, `= ${de(b / 1e6, 3)} MB = ${de(b / 1024 ** 2, 3)} MiB`, `Farben: 2^${tiefe} = ${de(Math.pow(2, tiefe), 0)}`] };
    }
    if (art === "audio") {
      const rate = wahl([44100, 48000, 96000]), tiefe = wahl([16, 24]), kan = wahl([1, 2]), min = rnd(1, 90);
      const bit = rate * tiefe * kan * min * 60;
      return { titel: this.titel, text: `Eine unkomprimierte Tonaufnahme: **${de(rate, 0)} Hz**, **${tiefe} Bit**, **${kan === 2 ? "Stereo" : "Mono"}**, **${min} min**. Wie groß ist die Datei?`,
        felder: [z("Größe in MB", runde(bit / 8 / 1e6, 2))],
        weg: [`${de(rate, 0)} × ${tiefe} × ${kan} × ${min * 60} s = ${de(bit, 0)} Bit`, `÷ 8 = ${de(bit / 8, 0)} Byte = **${de(bit / 8 / 1e6, 2)} MB**`] };
    }
    const fps = wahl([25, 30, 50, 60]), min = wahl([1, 5, 10, 30, 60]);
    const b = aufl[0] * aufl[1] * 3 * fps * min * 60;
    return { titel: this.titel, text: `Ein unkomprimiertes Video in ${aufl[2]} (${aufl[0]} × ${aufl[1]}), 24 Bit Farbtiefe, **${fps} fps**, Länge **${min} min**. Wie viel Speicher wird benötigt?`,
      felder: [z("Größe in GB", runde(b / 1e9, 2), { toleranz: Math.max(b / 1e9 * 0.005, 0.01) })],
      weg: [`Kette: Pixel × Farbtiefe × Bildrate × Zeit`, `${aufl[0]} × ${aufl[1]} × 3 B × ${fps} × ${min * 60} s = ${de(b, 0)} Byte = **${de(b / 1e9, 2)} GB**`] };
  },
};

G["raid"] = {
  titel: "RAID-Kapazität", bereich: "Hardware", modul: "H4",
  erzeuge() {
    const level = wahl([0, 1, 5, 5, 6, 10]);
    const min = { 0: 2, 1: 2, 5: 3, 6: 4, 10: 4 }[level];
    let n = level === 1 ? 2 : level === 10 ? wahl([4, 6, 8]) : rnd(min, 8);
    const c = wahl([1, 2, 4, 6, 8, 12, 16]);
    const kap = { 0: n * c, 1: c, 5: (n - 1) * c, 6: (n - 2) * c, 10: n / 2 * c }[level];
    const ausfall = { 0: 0, 1: n - 1, 5: 1, 6: 2, 10: 1 }[level];
    return {
      titel: this.titel, text: `Ein NAS wird mit **${n} Festplatten à ${c} TB** als **RAID ${level}** eingerichtet.`,
      felder: [
        z("Nutzbare Kapazität in TB", kap, { toleranz: 0.01 }),
        z("Nutzbare Kapazität in TiB", runde(kap * 1e12 / 1024 ** 4, 2), { toleranz: 0.02 }),
        z("Garantiert verkraftbare Plattenausfälle", ausfall, { toleranz: 0 }),
        z("Speichereffizienz in %", runde(kap / (n * c) * 100, 1), { toleranz: 0.2 }),
      ],
      weg: [
        { 0: `RAID 0: n × C = ${n} × ${c}`, 1: `RAID 1: Spiegel → Kapazität einer Platte`, 5: `RAID 5: (n − 1) × C = ${n - 1} × ${c}`, 6: `RAID 6: (n − 2) × C = ${n - 2} × ${c}`, 10: `RAID 10: n/2 × C = ${n / 2} × ${c}` }[level] + ` = **${kap} TB**`,
        `In TiB: ${kap} × 10¹² / 2⁴⁰ = **${de(kap * 1e12 / 1024 ** 4, 2)} TiB**`,
        { 0: "RAID 0 hat **keine** Redundanz – eine defekte Platte = Totalverlust.", 1: `RAID 1 übersteht den Ausfall von bis zu ${n - 1} Platte(n), solange eine intakt ist.`, 5: "RAID 5: **1** Platte darf ausfallen (Parität).", 6: "RAID 6: **2** Platten dürfen ausfallen (doppelte Parität).", 10: "RAID 10: **1** Ausfall ist garantiert verkraftbar; mehr nur, wenn sie in verschiedenen Spiegelpaaren liegen." }[level],
        `Effizienz: ${kap} / ${n * c} = **${de(kap / (n * c) * 100, 1)} %**`,
      ],
    };
  },
};

const USV_MODELLE = [[500, 300], [700, 420], [750, 675], [1000, 600], [1000, 900], [1500, 1350], [2000, 1800], [3000, 2700]];
G["usv-dimension"] = {
  titel: "USV dimensionieren", bereich: "Hardware", modul: "H5",
  erzeuge() {
    const geraete = stichprobe([["Server", rnd(25, 60) * 10], ["Switch", rnd(3, 12) * 10], ["Router", rnd(2, 5) * 10], ["NAS", rnd(4, 10) * 10], ["Firewall", rnd(3, 8) * 10]], rnd(2, 4));
    const cos = wahl([0.6, 0.7, 0.8, 0.9]);
    const res = wahl([0.2, 0.25]);
    const p = geraete.reduce((s, g) => s + g[1], 0);
    const pRes = p * (1 + res), s = pRes / cos;
    const passend = USV_MODELLE.filter(([va, w]) => va >= s - 1e-9 && w >= pRes - 1e-9).sort((a, b) => a[0] - b[0] || a[1] - b[1])[0];
    const optionen = USV_MODELLE.map(([va, w]) => `${va} VA / ${w} W`);
    const felder = [z("Wirkleistung inkl. Reserve in W", runde(pRes, 1)), z("Mindest-Scheinleistung in VA", runde(s, 1))];
    if (passend) felder.push(f("Kleinstes passendes Modell", "wahl", `${passend[0]} VA / ${passend[1]} W`, { optionen }));
    return {
      titel: this.titel,
      text: `An eine USV werden angeschlossen: ${geraete.map(g => `${g[0]} **${g[1]} W**`).join(", ")}. Leistungsfaktor cos φ = **${de(cos)}**, Reserve **${res * 100} %**.` + (passend ? " Verfügbare Modelle: " + optionen.join(" · ") : ""),
      felder,
      weg: [
        `Summe Wirkleistung: ${geraete.map(g => g[1]).join(" + ")} = ${p} W`,
        `+ ${res * 100} % Reserve: ${p} × ${de(1 + res)} = **${de(pRes, 1)} W**`,
        `S = P / cos φ = ${de(pRes, 1)} / ${de(cos)} = **${de(s, 1)} VA**`,
        passend ? `Modell muss **beide** Werte erfüllen (VA **und** W) → **${passend[0]} VA / ${passend[1]} W**` : "Kein Modell der Liste reicht – größere USV nötig.",
      ],
    };
  },
};

G["usv-akku"] = {
  titel: "USV: Überbrückungszeit", bereich: "Hardware", modul: "H5",
  erzeuge() {
    const q = wahl([7, 7.2, 9, 12, 18, 26]), u = wahl([12, 24, 48]), eta = wahl([0.6, 0.7, 0.8, 0.85, 0.9]), p = rnd(5, 60) * 10;
    const t = q * u * eta / p;
    return {
      titel: this.titel, text: `Der Akku einer USV hat **${de(q)} Ah** bei **${u} V**, Wirkungsgrad η = **${de(eta)}**. Angeschlossene Last: **${p} W**. Wie lange wird überbrückt?`,
      felder: [z("Überbrückungszeit in Minuten", runde(t * 60, 1), { toleranz: 0.3 }), z("Akkustrom in A", runde(p / u, 2), { toleranz: 0.02 })],
      weg: [
        `Gespeicherte Energie: W = Q · U = ${de(q)} Ah × ${u} V = ${de(q * u)} Wh, nutzbar: × ${de(eta)} = ${de(q * u * eta)} Wh`,
        `t = (Q · U · η) / P = ${de(q * u * eta)} Wh / ${p} W = ${de(t, 3)} h = **${de(t * 60, 1)} min**`,
        `Akkustrom: I = P / U = ${p} / ${u} = **${de(p / u, 2)} A**`,
      ],
    };
  },
};

G["druckkosten"] = {
  titel: "Druckkosten: Tinte oder Laser?", bereich: "Hardware", modul: "H6",
  erzeuge() {
    // Nur realistische Kombinationen: Seitenkosten Laser deutlich unter Tinte, sonst gibt es keinen Break-even
    let gT, pT, rT, gL, pL, rL;
    do {
      gT = wahl([89, 120, 149, 179]); pT = wahl([19.9, 24.5, 28, 32.9]); rT = wahl([300, 400, 450, 600]);
      gL = wahl([249, 320, 389, 449]); pL = wahl([69, 85, 99, 119]); rL = wahl([2000, 2500, 3000, 4000]);
    } while (pT / rT < 1.5 * (pL / rL));
    const seiten = rnd(4, 30) * 50, monate = wahl([24, 36, 48]);
    const kT = pT / rT, kL = pL / rL, n = seiten * monate;
    const gesT = gT + n * kT, gesL = gL + n * kL, be = (gL - gT) / (kT - kL);
    return {
      titel: this.titel,
      text: `Für ein Büro mit **${seiten} Seiten pro Monat** (s/w) stehen zur Wahl:
- **Tintenstrahldrucker:** ${euro(gT)}, Patrone ${euro(pT)} für ${rT} Seiten
- **Laserdrucker:** ${euro(gL)}, Toner ${euro(pL)} für ${rL} Seiten
Betrachtet werden **${monate} Monate** (Papier und Strom bleiben unberücksichtigt).`,
      felder: [z("Kosten pro Seite Tinte in Cent", runde(kT * 100, 2), { toleranz: 0.01 }), z("Kosten pro Seite Laser in Cent", runde(kL * 100, 2), { toleranz: 0.01 }),
        z("Gesamtkosten Tinte in €", runde(gesT, 2), { toleranz: 0.5 }), z("Gesamtkosten Laser in €", runde(gesL, 2), { toleranz: 0.5 }),
        z("Ab wie vielen Seiten ist Laser günstiger?", Math.ceil(be), { toleranz: 1 })],
      weg: [
        `Seitenkosten = Preis Verbrauchsmaterial ÷ Reichweite: Tinte ${euro(pT)} ÷ ${rT} = **${de(kT * 100, 2)} ct** · Laser ${euro(pL)} ÷ ${rL} = **${de(kL * 100, 2)} ct**`,
        `Seiten im Zeitraum: ${seiten} × ${monate} = ${de(n, 0)}`,
        `Tinte: ${euro(gT)} + ${de(n, 0)} × ${de(kT, 4)} € = **${euro(gesT)}** · Laser: ${euro(gL)} + ${de(n, 0)} × ${de(kL, 4)} € = **${euro(gesL)}**`,
        `Break-even: ${de(gT, 2)} + x · ${de(kT, 4)} = ${de(gL, 2)} + x · ${de(kL, 4)} → x = (${de(gL, 2)} − ${de(gT, 2)}) ÷ (${de(kT, 4)} − ${de(kL, 4)}) ≈ **${de(Math.ceil(be), 0)} Seiten**`,
        gesL < gesT ? "→ Der **Laserdrucker** ist im Betrachtungszeitraum günstiger." : "→ Der **Tintenstrahldrucker** ist im Betrachtungszeitraum günstiger.",
      ],
    };
  },
};

G["kostenrechnung"] = {
  titel: "Deckungsbeitrag und Stundensatz", bereich: "Wirtschaft", modul: "W6",
  erzeuge() {
    if (zufall() < 0.5) {
      const preis = rnd(12, 30) * 5, varK = rnd(4, Math.floor(preis / 5) - 2) * 5, db = preis - varK;
      const fix = db * rnd(20, 80), kunden = rnd(Math.round(fix / db) + 5, Math.round(fix / db) + 40);
      return {
        titel: this.titel,
        text: `Ein Dienst kostet Kunden **${euro(preis)}** im Monat, die variablen Kosten je Kunde betragen **${euro(varK)}**, die Fixkosten **${euro(fix)}** im Monat. Aktuell gibt es **${kunden} Kunden**.`,
        felder: [z("Deckungsbeitrag je Kunde in €", db), z("Gewinnschwelle (Anzahl Kunden)", Math.ceil(fix / db)), z("Monatsergebnis in €", kunden * db - fix)],
        weg: [`DB = Preis − variable Kosten = ${de(preis, 2)} − ${de(varK, 2)} = **${euro(db)}**`,
          `Gewinnschwelle = Fixkosten ÷ DB = ${de(fix, 2)} ÷ ${de(db, 2)} = **${de(Math.ceil(fix / db), 0)} Kunden**`,
          `Ergebnis = ${kunden} × ${de(db, 2)} − ${de(fix, 2)} = **${euro(kunden * db - fix)}**`],
      };
    }
    const pers = rnd(44, 66) * 1000, gem = rnd(12, 30) * 1000, std = wahl([1600, 1680, 1720]), quote = wahl([0.7, 0.75, 0.8]), gz = wahl([10, 12, 15, 20]);
    const verr = std * quote, kosten = (pers + gem) / verr, satz = kosten * (1 + gz / 100);
    return {
      titel: this.titel,
      text: `Personalkosten **${euro(pers)}** und anteilige Gemeinkosten **${euro(gem)}** im Jahr. Von **${std} h** Arbeitszeit sind **${de(quote * 100, 0)} %** verrechenbar. Gewinnzuschlag **${gz} %**.`,
      felder: [z("verrechenbare Stunden", runde(verr, 0)), z("Kosten je verrechenbarer Stunde in €", runde(kosten, 2), { toleranz: 0.02 }), z("Stundensatz inkl. Gewinn in €", runde(satz, 2), { toleranz: 0.05 })],
      weg: [`Verrechenbare Stunden: ${std} × ${de(quote, 2)} = **${de(verr, 0)} h**`,
        `Kosten je Stunde: (${de(pers, 0)} + ${de(gem, 0)}) ÷ ${de(verr, 0)} = **${euro(kosten)}**`,
        `Stundensatz: ${de(kosten, 2)} × ${de(1 + gz / 100, 2)} = **${euro(satz)}**`],
    };
  },
};

G["pruefziffer"] = {
  titel: "EAN-13-Prüfziffer", bereich: "Hardware", modul: "H3",
  erzeuge() {
    const ziffern = [4, 0, ...Array.from({ length: 10 }, () => rnd(0, 9))];
    const summe = ziffern.reduce((s, d, i) => s + d * (i % 2 === 0 ? 1 : 3), 0);
    const pz = (10 - (summe % 10)) % 10;
    return {
      titel: this.titel,
      text: `Berechne die Prüfziffer der EAN-13-Nummer **${ziffern.join(" ")} ?**. Die Ziffern werden von links abwechselnd mit **1** und **3** gewichtet.`,
      felder: [z("gewichtete Summe", summe), z("Prüfziffer", pz)],
      weg: [ziffern.map((d, i) => `${d}·${i % 2 === 0 ? 1 : 3}`).join(" + ") + ` = **${summe}**`,
        `Prüfziffer = Ergänzung zur nächsten Zehnerzahl: (10 − ${summe} mod 10) mod 10 = **${pz}** → ${ziffern.join("")}${pz}`],
    };
  },
};

G["strom"] = {
  titel: "Strom, Leistung, Arbeit", bereich: "Hardware", modul: "H5",
  erzeuge() {
    const art = wahl(["pui", "i", "kosten", "netzteil"]);
    if (art === "pui") {
      const i = runde(0.1 + zufall() * 4, 2);
      return { titel: this.titel, text: `Ein Gerät nimmt an **230 V** einen Strom von **${de(i)} A** auf. Welche Leistung hat es?`,
        felder: [z("Leistung in W", runde(230 * i, 1))], weg: [`P = U · I = 230 V × ${de(i)} A = **${de(230 * i, 1)} W**`] };
    }
    if (art === "i") {
      const p = rnd(3, 200) * 10;
      return { titel: this.titel, text: `Ein Server hat **${p} W** Leistungsaufnahme an **230 V**. Welcher Strom fließt?`,
        felder: [z("Strom in A", runde(p / 230, 3), { toleranz: 0.01 })], weg: [`I = P / U = ${p} / 230 = **${de(p / 230, 3)} A**`] };
    }
    if (art === "netzteil") {
      const ab = rnd(20, 80) * 10, eta = wahl([0.8, 0.82, 0.85, 0.87, 0.9, 0.92, 0.94]);
      return { titel: this.titel, text: `Ein PC benötigt **${ab} W** (Ausgangsleistung Netzteil). Das Netzteil hat einen Wirkungsgrad von **${de(eta * 100, 0)} %**.`,
        felder: [z("Aufnahme aus dem Netz in W", runde(ab / eta, 1)), z("Verlustleistung (Wärme) in W", runde(ab / eta - ab, 1))],
        weg: [`η = P_ab / P_zu → P_zu = P_ab / η = ${ab} / ${de(eta)} = **${de(ab / eta, 1)} W**`, `Verlust = ${de(ab / eta, 1)} − ${ab} = **${de(ab / eta - ab, 1)} W**`] };
    }
    const w = rnd(3, 60) * 5, h = wahl([4, 6, 8, 10, 24]), tage = h === 24 ? 365 : wahl([220, 230, 250]), preis = wahl([0.28, 0.30, 0.32, 0.35, 0.38]), n = wahl([1, 1, 5, 10, 12, 20, 25]);
    const kwh = w * h * tage * n / 1000;
    return { titel: this.titel, text: `${n > 1 ? `**${n} Geräte** mit je` : "Ein Gerät mit"} **${w} W** laufen **${h} h/Tag** an **${tage} Tagen** im Jahr. Strompreis **${de(preis)} €/kWh**.`,
      felder: [z("Energie pro Jahr in kWh", runde(kwh, 2)), z("Kosten pro Jahr in €", runde(kwh * preis, 2), { toleranz: 0.05 })],
      weg: [`Betriebsstunden: ${h} × ${tage} = ${h * tage} h`, `W = P · t = ${w} W × ${h * tage} h${n > 1 ? ` × ${n}` : ""} / 1000 = **${de(kwh, 2)} kWh**`, `Kosten: ${de(kwh, 2)} × ${de(preis)} € = **${euro(kwh * preis)}**`] };
  },
};

G["ppi"] = {
  titel: "Pixeldichte", bereich: "Hardware", modul: "H1",
  erzeuge() {
    const [w, h] = wahl([[1920, 1080], [2560, 1440], [3840, 2160], [1920, 1200], [3440, 1440]]);
    const d = wahl([13.3, 14, 15.6, 21.5, 24, 27, 32, 34]);
    const diag = Math.sqrt(w * w + h * h);
    return { titel: this.titel, text: `Ein **${de(d, 1)}-Zoll**-Display hat **${w} × ${h}** Pixel. Berechne die Pixeldichte.`,
      felder: [z("Pixeldichte in ppi", runde(diag / d, 1), { toleranz: 0.3 })],
      weg: [`Diagonale in Pixeln: √(${w}² + ${h}²) = √${de(w * w + h * h, 0)} = ${de(diag, 1)} px`, `ppi = ${de(diag, 1)} / ${de(d, 1)} = **${de(diag / d, 1)} ppi**`] };
  },
};

// ---------------------------------------------------------------------------
// Generatoren: Software
// ---------------------------------------------------------------------------
G["zahlensysteme"] = {
  titel: "Zahlensysteme umrechnen", bereich: "Software", modul: "S1",
  erzeuge() {
    const art = wahl(["d2b", "d2h", "b2d", "h2d", "b2h", "h2b"]);
    const n = art.includes("h") ? rnd(16, 4095) : rnd(5, 255);
    const b = n.toString(2), h = n.toString(16).toUpperCase();
    const gruppen = b.padStart(Math.ceil(b.length / 4) * 4, "0").match(/.{4}/g);
    const stellen = s => s.split("").reverse().map((c, i) => c !== "0" ? `${parseInt(c, 16)}·${art.startsWith("b") ? 2 : 16}^${i}` : null).filter(Boolean).reverse().join(" + ");
    const T = {
      d2b: [`Wandle **${n}** (dezimal) ins Binärsystem um.`, f("Binär", "bin", b), [`Restwertmethode: fortlaufend durch 2 teilen, Reste von unten lesen – oder Stellenwerte 128, 64, 32, … abziehen.`, `**${n}₁₀ = ${gruppen.join(" ")}₂**`]],
      d2h: [`Wandle **${n}** (dezimal) ins Hexadezimalsystem um.`, f("Hex", "hex", h), [`${n} ÷ 16 wiederholt, Reste von unten lesen (10=A … 15=F).`, `**${n}₁₀ = ${h}₁₆**`]],
      b2d: [`Wandle **${gruppen.join(" ")}₂** ins Dezimalsystem um.`, z("Dezimal", n, { toleranz: 0 }), [`${stellen(b)} = **${n}**`]],
      h2d: [`Wandle **${h}₁₆** ins Dezimalsystem um.`, z("Dezimal", n, { toleranz: 0 }), [`${stellen(h)} = **${n}**`]],
      b2h: [`Wandle **${gruppen.join(" ")}₂** ins Hexadezimalsystem um.`, f("Hex", "hex", h), [`4er-Gruppen (Nibbles) von rechts: ${gruppen.map(g => `${g}=${parseInt(g, 2).toString(16).toUpperCase()}`).join(" · ")}`, `**${h}₁₆**`]],
      h2b: [`Wandle **${h}₁₆** ins Binärsystem um.`, f("Binär", "bin", b), [`Jede Hex-Ziffer → 4 Bit: ${h.split("").map(c => `${c}=${parseInt(c, 16).toString(2).padStart(4, "0")}`).join(" · ")}`, `**${gruppen.join(" ")}₂**`]],
    }[art];
    return { titel: this.titel, text: T[0], felder: [T[1]], weg: T[2] };
  },
};

G["zweierkomplement"] = {
  titel: "Zweierkomplement (8 Bit)", bereich: "Software", modul: "S1",
  erzeuge() {
    const v = -rnd(1, 128);
    const muster = ((v + 256) & 255).toString(2).padStart(8, "0");
    const betrag = Math.abs(v).toString(2).padStart(8, "0");
    const inv = betrag.split("").map(c => c === "0" ? "1" : "0").join("");
    if (zufall() < 0.5) {
      return { titel: this.titel, text: `Stelle **${v}** als 8-Bit-Zweierkomplement dar.`,
        felder: [f("Binär (8 Bit)", "bin", muster, { exakt: true }), f("Hex", "hex", ((v + 256) & 255).toString(16).toUpperCase().padStart(2, "0"), { exakt: false })],
        weg: v === -128 ? ["−128 ist der Sonderfall: `1000 0000` (kleinste 8-Bit-Zahl)."] :
          [`Betrag ${-v} binär: \`${betrag}\``, `Invertieren: \`${inv}\``, `+1: **\`${muster}\`** = 0x${((v + 256) & 255).toString(16).toUpperCase()}`] };
    }
    return { titel: this.titel, text: `Welchen Dezimalwert hat das 8-Bit-Zweierkomplement **${muster.slice(0, 4)} ${muster.slice(4)}**?`,
      felder: [z("Dezimalwert", v, { toleranz: 0 })],
      weg: [`Höchstes Bit = 1 → negative Zahl.`, `Rückweg: invertieren und +1 ergibt den Betrag – oder: Wert − 256 = ${parseInt(muster, 2)} − 256 = **${v}**`] };
  },
};

const TRACE_VORLAGEN = [
  (a) => { const g = rnd(3, 7); let s = 0; a.forEach(x => { if (x > g) s += x; });
    return { code: `summe ← 0\nFÜR JEDES x IN liste\n    WENN x > ${g} DANN\n        summe ← summe + x\n    ENDE WENN\nENDE FÜR\nausgabe(summe)`, erg: s, erkl: `Addiert alle Werte größer ${g}.` }; },
  (a) => { let m = a[0]; for (let i = 1; i < a.length; i++) if (a[i] < m) m = a[i];
    return { code: `m ← liste[0]\nFÜR i ← 1 BIS länge(liste) − 1\n    WENN liste[i] < m DANN\n        m ← liste[i]\n    ENDE WENN\nENDE FÜR\nausgabe(m)`, erg: m, erkl: "Sucht das Minimum." }; },
  (a) => { let c = 0; a.forEach(x => { if (x % 2 === 0) c++; });
    return { code: `z ← 0\nFÜR JEDES x IN liste\n    WENN x MOD 2 = 0 DANN\n        z ← z + 1\n    ENDE WENN\nENDE FÜR\nausgabe(z)`, erg: c, erkl: "Zählt die geraden Zahlen." }; },
  (a) => { let x = 0; a.forEach(v => { x = v > x ? v : x - 1; });
    return { code: `x ← 0\nFÜR JEDES v IN liste\n    WENN v > x DANN\n        x ← v\n    SONST\n        x ← x − 1\n    ENDE WENN\nENDE FÜR\nausgabe(x)`, erg: x, erkl: "Übernimmt größere Werte, sonst wird x um 1 verringert." }; },
  (a) => { let s = 0; a.forEach((v, i) => { s += v * i; });
    return { code: `s ← 0\nFÜR i ← 0 BIS länge(liste) − 1\n    s ← s + liste[i] * i\nENDE FÜR\nausgabe(s)`, erg: s, erkl: "Gewichtete Summe: jeder Wert mal seinem Index." }; },
  () => { const n = rnd(20, 200); let k = n, c = 0; while (k > 1) { k = Math.floor(k / 2); c++; }
    return { code: `n ← ${n}\nschritte ← 0\nSOLANGE n > 1\n    n ← n DIV 2\n    schritte ← schritte + 1\nENDE SOLANGE\nausgabe(schritte)`, erg: c, erkl: "Zählt, wie oft man ganzzahlig halbieren kann (≈ log₂ n)." }; },
  () => { const n = rnd(4, 9); let e = 1; for (let i = 1; i <= n; i++) if (i % 2 === 1) e *= i;
    return { code: `n ← ${n}\nergebnis ← 1\ni ← 1\nSOLANGE i ≤ n\n    WENN i MOD 2 = 1 DANN\n        ergebnis ← ergebnis * i\n    ENDE WENN\n    i ← i + 1\nENDE SOLANGE\nausgabe(ergebnis)`, erg: e, erkl: "Produkt aller ungeraden Zahlen bis n." }; },
  (a) => { const b = a.slice(); for (let i = 0; i < b.length - 1; i++) if (b[i] > b[i + 1]) [b[i], b[i + 1]] = [b[i + 1], b[i]];
    return { code: `// ein Durchlauf Bubble Sort\nFÜR i ← 0 BIS länge(a) − 2\n    WENN a[i] > a[i+1] DANN\n        tausche a[i] und a[i+1]\n    ENDE WENN\nENDE FÜR\nausgabe(a[länge(a) − 1])`, erg: b[b.length - 1], erkl: "Nach einem Durchlauf steht das Maximum ganz hinten." }; },
];
G["trace"] = {
  titel: "Schreibtischtest (Pseudocode)", bereich: "Software", modul: "S3",
  erzeuge() {
    const a = Array.from({ length: rnd(4, 6) }, () => rnd(1, 12));
    const v = wahl(TRACE_VORLAGEN)(a);
    return { titel: this.titel, text: `Gegeben: \`liste ← [${a.join(", ")}]\` (Index ab 0). Was gibt der Algorithmus aus?`,
      code: v.code, felder: [z("Ausgabe", v.erg, { toleranz: 0 })],
      weg: [v.erkl, `Ausgabe: **${v.erg}**`, "Tipp: Lege eine Trace-Tabelle an (eine Spalte pro Variable, eine Zeile pro Schleifendurchlauf)."] };
  },
};

// ---------------------------------------------------------------------------
// Generatoren: Wirtschaft
// ---------------------------------------------------------------------------
function kalk(lep, rab, sko, bk) {
  const r = runde(lep * rab, 2), zep = runde(lep - r, 2);
  const s = runde(zep * sko, 2), bep = runde(zep - s, 2);
  return { r, zep, s, bep, bzp: runde(bep + bk, 2) };
}
function angebot() {
  return { menge: wahl([1, 2, 3, 5, 8, 10, 12, 15, 20, 25]), preis: runde(rnd(2000, 150000) / 100, 2), rab: wahl([0, 0.03, 0.05, 0.08, 0.1, 0.12, 0.15]), sko: wahl([0, 0.02, 0.02, 0.03]), bk: wahl([0, 0, 9.9, 14.9, 19.9, 25, 45, 60]) };
}
G["bezugskalkulation"] = {
  titel: "Bezugskalkulation", bereich: "Wirtschaft", modul: "W1",
  erzeuge() {
    const a = angebot(); const lep = runde(a.menge * a.preis, 2); const k = kalk(lep, a.rab, a.sko, a.bk);
    return {
      titel: this.titel,
      text: `Angebot: **${a.menge} Stück à ${euro(a.preis)}** netto, Rabatt **${a.rab * 100} %**, Skonto **${a.sko * 100} %**, Bezugskosten **${euro(a.bk)}**.`,
      felder: [z("Zieleinkaufspreis in €", k.zep, { toleranz: 0.02 }), z("Bareinkaufspreis in €", k.bep, { toleranz: 0.03 }), z("Bezugspreis in €", k.bzp, { toleranz: 0.03 })],
      weg: [
        `Listeneinkaufspreis: ${a.menge} × ${euro(a.preis)} = ${euro(lep)}`,
        `− Rabatt ${a.rab * 100} % (vom LEP): ${euro(k.r)} → Zieleinkaufspreis **${euro(k.zep)}**`,
        `− Skonto ${a.sko * 100} % (vom ZEP): ${euro(k.s)} → Bareinkaufspreis **${euro(k.bep)}**`,
        `+ Bezugskosten ${euro(a.bk)} → Bezugspreis **${euro(k.bzp)}**`,
      ],
    };
  },
};

G["angebotsvergleich"] = {
  titel: "Angebotsvergleich", bereich: "Wirtschaft", modul: "W1",
  erzeuge() {
    const menge = wahl([5, 8, 10, 12, 15, 20]);
    const basis = rnd(15000, 90000) / 100;
    const A = angebot(), B = angebot();
    A.preis = runde(basis * (0.95 + zufall() * 0.1), 2); B.preis = runde(basis * (0.95 + zufall() * 0.1), 2);
    const ka = kalk(runde(menge * A.preis, 2), A.rab, A.sko, A.bk), kb = kalk(runde(menge * B.preis, 2), B.rab, B.sko, B.bk);
    const beschr = (x) => `${euro(x.preis)}/Stück, ${x.rab * 100} % Rabatt, ${x.sko * 100} % Skonto, Bezugskosten ${x.bk ? euro(x.bk) : "frei Haus"}`;
    const sieger = ka.bzp <= kb.bzp ? "A" : "B";
    return {
      titel: this.titel, text: `Es werden **${menge} Geräte** benötigt.\n- Angebot A: ${beschr(A)}\n- Angebot B: ${beschr(B)}`,
      felder: [z("Bezugspreis A in €", ka.bzp, { toleranz: 0.03 }), z("Bezugspreis B in €", kb.bzp, { toleranz: 0.03 }), f("Günstigeres Angebot", "wahl", sieger, { optionen: ["A", "B"] }), z("Differenz in €", runde(Math.abs(ka.bzp - kb.bzp), 2), { toleranz: 0.05 })],
      weg: [
        `A: LEP ${euro(menge * A.preis)} − Rabatt ${euro(ka.r)} = ${euro(ka.zep)} − Skonto ${euro(ka.s)} = ${euro(ka.bep)} + ${euro(A.bk)} = **${euro(ka.bzp)}**`,
        `B: LEP ${euro(menge * B.preis)} − Rabatt ${euro(kb.r)} = ${euro(kb.zep)} − Skonto ${euro(kb.s)} = ${euro(kb.bep)} + ${euro(B.bk)} = **${euro(kb.bzp)}**`,
        `**${sieger}** ist um **${euro(Math.abs(ka.bzp - kb.bzp))}** günstiger` + ((A.sko || B.sko) ? " – vorausgesetzt, die Skontofrist wird eingehalten." : "."),
      ],
    };
  },
};

G["umsatzsteuer"] = {
  titel: "Umsatzsteuer", bereich: "Wirtschaft", modul: "W1",
  erzeuge() {
    const netto = runde(rnd(1000, 500000) / 100, 2);
    const brutto = runde(netto * 1.19, 2);
    if (zufall() < 0.5) {
      return { titel: this.titel, text: `Eine Rechnung lautet über **${euro(brutto)} brutto** (19 % USt).`,
        felder: [z("Nettobetrag in €", netto, { toleranz: 0.02 }), z("Umsatzsteuer in €", runde(brutto - netto, 2), { toleranz: 0.02 })],
        weg: [`Netto = Brutto / 1,19 = ${euro(brutto)} / 1,19 = **${euro(netto)}**`, `USt = ${euro(brutto)} − ${euro(netto)} = **${euro(brutto - netto)}**`, "Falle: Brutto × 0,81 ist falsch, weil die 19 % sich auf den Nettobetrag beziehen."] };
    }
    return { titel: this.titel, text: `Ein Artikel kostet **${euro(netto)} netto**.`,
      felder: [z("Umsatzsteuer in €", runde(netto * 0.19, 2), { toleranz: 0.02 }), z("Bruttobetrag in €", brutto, { toleranz: 0.02 })],
      weg: [`USt = ${euro(netto)} × 0,19 = **${euro(netto * 0.19)}**`, `Brutto = ${euro(netto)} × 1,19 = **${euro(brutto)}**`] };
  },
};

G["verkaufskalkulation"] = {
  titel: "Verkaufskalkulation (vorwärts)", bereich: "Wirtschaft", modul: "W1",
  erzeuge() {
    const bzp = runde(rnd(5000, 200000) / 100, 2), hkz = wahl([0.15, 0.2, 0.25, 0.3, 0.35, 0.4]), gew = wahl([0.05, 0.08, 0.1, 0.12, 0.15, 0.2]);
    const hk = runde(bzp * hkz, 2), sk = runde(bzp + hk, 2), g = runde(sk * gew, 2), bvp = runde(sk + g, 2);
    const schwer = zufall() < 0.5;
    if (!schwer) {
      const brutto = runde(bvp * 1.19, 2);
      return { titel: this.titel, text: `Bezugspreis **${euro(bzp)}**, Handlungskostenzuschlag **${hkz * 100} %**, Gewinnzuschlag **${gew * 100} %**, USt 19 %. (Ohne Kundenskonto/-rabatt.)`,
        felder: [z("Selbstkostenpreis in €", sk, { toleranz: 0.02 }), z("Nettoverkaufspreis in €", bvp, { toleranz: 0.03 }), z("Bruttoverkaufspreis in €", brutto, { toleranz: 0.05 })],
        weg: [`Bezugspreis ${euro(bzp)} + HKZ ${hkz * 100} % (${euro(hk)}) = Selbstkosten **${euro(sk)}**`, `+ Gewinn ${gew * 100} % (${euro(g)}) = Nettoverkaufspreis **${euro(bvp)}**`, `+ 19 % USt = **${euro(brutto)}**`] };
    }
    const ksko = wahl([0.02, 0.03]), krab = wahl([0.05, 0.1, 0.15]);
    const zvp = runde(bvp / (1 - ksko), 2), lvp = runde(zvp / (1 - krab), 2);
    return { titel: this.titel, text: `Bezugspreis **${euro(bzp)}**, HKZ **${hkz * 100} %**, Gewinn **${gew * 100} %**, Kundenskonto **${ksko * 100} %**, Kundenrabatt **${krab * 100} %**.`,
      felder: [z("Selbstkostenpreis in €", sk, { toleranz: 0.02 }), z("Barverkaufspreis in €", bvp, { toleranz: 0.03 }), z("Zielverkaufspreis in €", zvp, { toleranz: 0.05 }), z("Listenverkaufspreis netto in €", lvp, { toleranz: 0.08 })],
      weg: [`Selbstkosten: ${euro(bzp)} + ${euro(hk)} = **${euro(sk)}**`, `Barverkaufspreis: + Gewinn ${euro(g)} = **${euro(bvp)}**`,
        `Kundenskonto wird **im Hundert** gerechnet (der Kunde zieht es vom Zielpreis ab): ZVP = BVP / (1 − ${ksko}) = **${euro(zvp)}**`,
        `Kundenrabatt ebenfalls im Hundert: LVP = ZVP / (1 − ${krab}) = **${euro(lvp)}**`] };
  },
};

G["nutzwert"] = {
  titel: "Nutzwertanalyse", bereich: "Wirtschaft", modul: "W2",
  erzeuge() {
    const kriterien = stichprobe(["Preis", "Leistung", "Service", "Energieverbrauch", "Lautstärke", "Garantie", "Lieferzeit", "Erweiterbarkeit"], rnd(3, 4));
    let gew;
    do { gew = kriterien.map(() => rnd(1, 8) * 5); } while (gew.reduce((s, x) => s + x, 0) !== 100);
    const punkte = [0, 1].map(() => kriterien.map(() => rnd(3, 10)));
    const sum = punkte.map(p => runde(p.reduce((s, x, i) => s + x * gew[i] / 100, 0), 2));
    if (sum[0] === sum[1]) punkte[1][0] = Math.min(10, punkte[1][0] + 1);
    const s2 = punkte.map(p => runde(p.reduce((s, x, i) => s + x * gew[i] / 100, 0), 2));
    return {
      titel: this.titel, text: "Bewerte die Alternativen (Punkte 1–10):",
      tabelle: [["Kriterium", "Gewicht", "A", "B"], ...kriterien.map((k, i) => [k, gew[i] + " %", punkte[0][i], punkte[1][i]])],
      felder: [z("Nutzwert A", s2[0], { toleranz: 0.01 }), z("Nutzwert B", s2[1], { toleranz: 0.01 }), f("Bessere Alternative", "wahl", s2[0] > s2[1] ? "A" : "B", { optionen: ["A", "B"] })],
      weg: [
        "Teilnutzen = Gewicht × Punkte, dann aufsummieren.",
        `A: ${kriterien.map((k, i) => `${de(gew[i] / 100)}×${punkte[0][i]}`).join(" + ")} = **${de(s2[0])}**`,
        `B: ${kriterien.map((k, i) => `${de(gew[i] / 100)}×${punkte[1][i]}`).join(" + ")} = **${de(s2[1])}**`,
      ],
    };
  },
};

G["kauf-leasing"] = {
  titel: "Kauf oder Leasing", bereich: "Wirtschaft", modul: "W3",
  erzeuge() {
    const preis = rnd(8, 60) * 100, wart = wahl([0, 5, 10, 15, 20]), rate = runde(preis * wahl([0.025, 0.03, 0.035, 0.04, 0.045]) + wart + rnd(0, 10), 0);
    if (zufall() < 0.5) {
      const monate = wahl([24, 36, 48]);
      const kauf = preis + wart * monate, leas = rate * monate;
      return { titel: this.titel, text: `Kauf: **${euro(preis)}** + Wartung **${euro(wart)}/Monat**. Leasing: **${euro(rate)}/Monat** inkl. Wartung. Nutzungsdauer **${monate} Monate**.`,
        felder: [z("Gesamtkosten Kauf in €", kauf, { toleranz: 0.01 }), z("Gesamtkosten Leasing in €", leas, { toleranz: 0.01 }), f("Günstiger", "wahl", kauf <= leas ? "Kauf" : "Leasing", { optionen: ["Kauf", "Leasing"] })],
        weg: [`Kauf: ${euro(preis)} + ${monate} × ${euro(wart)} = **${euro(kauf)}**`, `Leasing: ${monate} × ${euro(rate)} = **${euro(leas)}**`, "Qualitativ zusätzlich abwägen: Liquidität, Kapitalbindung, Aktualität der Technik, Eigentum."] };
    }
    const be = preis / (rate - wart);
    return { titel: this.titel, text: `Kauf: **${euro(preis)}** + Wartung **${euro(wart)}/Monat**. Leasing: **${euro(rate)}/Monat** inkl. Wartung. Ab welcher Nutzungsdauer ist der Kauf günstiger?`,
      felder: [z("Break-even in Monaten", runde(be, 1), { toleranz: 0.15 })],
      weg: [`${euro(preis)} + ${wart} · m = ${rate} · m`, `${euro(preis)} = ${rate - wart} · m → m = **${de(be, 1)} Monate**`, `Bei längerer Nutzung ist der Kauf günstiger.`] };
  },
};

G["afa-amortisation"] = {
  titel: "Abschreibung und Amortisation", bereich: "Wirtschaft", modul: "W3",
  erzeuge() {
    if (zufall() < 0.5) {
      const ak = rnd(12, 200) * 100, nd = wahl([3, 4, 5, 6, 8]), k = rnd(1, nd - 1);
      const afa = runde(ak / nd, 2);
      return { titel: this.titel, text: `Ein Server kostet **${euro(ak)}** (netto) und wird **linear über ${nd} Jahre** abgeschrieben.`,
        felder: [z("Jährliche AfA in €", afa, { toleranz: 0.02 }), z(`Restbuchwert nach ${k} Jahren in €`, runde(ak - afa * k, 2), { toleranz: 0.05 })],
        weg: [`AfA = AK / ND = ${euro(ak)} / ${nd} = **${euro(afa)}**`, `Restbuchwert = ${euro(ak)} − ${k} × ${euro(afa)} = **${euro(ak - afa * k)}**`] };
    }
    const inv = rnd(20, 300) * 100, ers = rnd(5, 60) * 50;
    return { titel: this.titel, text: `Eine Investition kostet **${euro(inv)}** und spart jährlich **${euro(ers)}**.`,
      felder: [z("Amortisationszeit in Jahren", runde(inv / ers, 2), { toleranz: 0.02 })],
      weg: [`Amortisation = Investition / jährliche Einsparung = ${euro(inv)} / ${euro(ers)} = **${de(inv / ers, 2)} Jahre**`] };
  },
};

G["darlehen"] = {
  titel: "Darlehen (Abzahlung/Fälligkeit)", bereich: "Wirtschaft", modul: "W3",
  erzeuge() {
    const k = rnd(5, 50) * 1000, n = wahl([2, 3, 4, 5]), p = wahl([0.03, 0.04, 0.05, 0.06, 0.07]), j = rnd(1, n);
    if (zufall() < 0.5) {
      const tilg = k / n, rest = k - tilg * (j - 1), zins = rest * p;
      return { titel: this.titel, text: `**Abzahlungsdarlehen** über **${euro(k)}**, Laufzeit **${n} Jahre**, Zinssatz **${de(p * 100)} %** p. a. Betrachte das **${j}. Jahr**.`,
        felder: [z("Tilgung pro Jahr in €", runde(tilg, 2), { toleranz: 0.02 }), z(`Zinsen im ${j}. Jahr in €`, runde(zins, 2), { toleranz: 0.02 }), z(`Gesamtrate im ${j}. Jahr in €`, runde(tilg + zins, 2), { toleranz: 0.03 })],
        weg: [`Abzahlungsdarlehen: **gleiche Tilgung** = ${euro(k)} / ${n} = ${euro(tilg)}`, `Restschuld zu Beginn Jahr ${j}: ${euro(k)} − ${j - 1} × ${euro(tilg)} = ${euro(rest)}`, `Zinsen = ${euro(rest)} × ${de(p * 100)} % = **${euro(zins)}** → Rate **${euro(tilg + zins)}** (sinkt jedes Jahr)`] };
    }
    return { titel: this.titel, text: `**Fälligkeitsdarlehen** über **${euro(k)}**, Laufzeit **${n} Jahre**, Zinssatz **${de(p * 100)} %** p. a.`,
      felder: [z("Zinsen pro Jahr in €", runde(k * p, 2), { toleranz: 0.02 }), z("Zinsen gesamt in €", runde(k * p * n, 2), { toleranz: 0.03 }), z("Zahlung im letzten Jahr in €", runde(k + k * p, 2), { toleranz: 0.03 })],
      weg: [`Fälligkeitsdarlehen: Tilgung komplett **am Ende**, Zinsen jedes Jahr auf den vollen Betrag`, `Zinsen/Jahr: ${euro(k)} × ${de(p * 100)} % = **${euro(k * p)}**, gesamt × ${n} = **${euro(k * p * n)}**`, `Letztes Jahr: Zinsen + gesamte Tilgung = **${euro(k + k * p)}**`] };
  },
};

// ---------------------------------------------------------------------------
// Generatoren: Projekt & Service / Sicherheit
// ---------------------------------------------------------------------------
function netzplanBerechnen(v) {
  const byId = Object.fromEntries(v.map(x => [x.id, x]));
  v.forEach(x => { x.faz = Math.max(0, ...x.vor.map(p => byId[p].fez)); x.fez = x.faz + x.d; });
  const ende = Math.max(...v.map(x => x.fez));
  [...v].reverse().forEach(x => {
    const nach = v.filter(y => y.vor.includes(x.id));
    x.sez = nach.length ? Math.min(...nach.map(y => y.saz)) : ende;
    x.saz = x.sez - x.d; x.gp = x.saz - x.faz;
    x.fp = (nach.length ? Math.min(...nach.map(y => y.faz)) : ende) - x.fez;
  });
  return ende;
}
G["netzplan"] = {
  titel: "Netzplan", bereich: "Projekt", modul: "P2",
  erzeuge() {
    let v, ende;
    do {
      const n = rnd(5, 7);
      v = Array.from({ length: n }, (_, i) => ({ id: String.fromCharCode(65 + i), d: rnd(1, 6), vor: [] }));
      for (let i = 1; i < n; i++) {
        const kand = v.slice(0, i).map(x => x.id);
        v[i].vor = stichprobe(kand, i >= 2 && zufall() < 0.4 ? 2 : 1).sort();
      }
      ende = netzplanBerechnen(v);
    } while (!v.some(x => x.gp > 0));  // mindestens ein Vorgang mit Puffer
    const mitPuffer = wahl(v.filter(x => x.gp > 0));
    const kritisch = v.filter(x => x.gp === 0).map(x => x.id);
    return {
      titel: this.titel, text: "Berechne den Netzplan (Vorwärts- und Rückwärtsrechnung, Start bei 0).",
      tabelle: [["Vorgang", "Dauer", "Vorgänger"], ...v.map(x => [x.id, x.d, x.vor.join(", ") || "–"])],
      felder: [
        z("Projektdauer", ende, { toleranz: 0 }),
        f("Vorgänge mit GP = 0 (z. B. A, C, E)", "menge", kritisch, { anzeige: kritisch.join(", ") }),
        z(`Gesamtpuffer von ${mitPuffer.id}`, mitPuffer.gp, { toleranz: 0 }),
        z(`Freier Puffer von ${mitPuffer.id}`, mitPuffer.fp, { toleranz: 0 }),
      ],
      tabelleLoesung: [["Vorgang", "FAZ", "FEZ", "SAZ", "SEZ", "GP", "FP"], ...v.map(x => [x.id, x.faz, x.fez, x.saz, x.sez, x.gp, x.fp])],
      weg: [
        "Vorwärts: FAZ = größter FEZ der Vorgänger, FEZ = FAZ + D.",
        "Rückwärts: SEZ = kleinster SAZ der Nachfolger (am Ende = Projektdauer), SAZ = SEZ − D.",
        "GP = SAZ − FAZ · FP = kleinster FAZ der Nachfolger − eigener FEZ.",
        `Projektdauer **${ende}**, GP = 0 bei **${kritisch.join(", ")}**`,
      ],
    };
  },
};

G["verfuegbarkeit"] = {
  titel: "Verfügbarkeit (SLA)", bereich: "Projekt", modul: "P3",
  erzeuge() {
    const q = wahl([0.95, 0.98, 0.99, 0.995, 0.999, 0.9995]);
    const bezug = wahl([["Jahr (24/7)", 8760], ["Monat mit 30 Tagen (24/7)", 720], ["Jahr bei 250 Tagen × 10 h Servicezeit", 2500]]);
    if (zufall() < 0.6) {
      const aus = bezug[1] * (1 - q);
      return { titel: this.titel, text: `Ein SLA garantiert **${de(q * 100, 2)} %** Verfügbarkeit, bezogen auf ein **${bezug[0]}**.`,
        felder: [z("Maximale Ausfallzeit in Stunden", runde(aus, 2), { toleranz: 0.02 }), z("… in Minuten", runde(aus * 60, 1), { toleranz: 0.5 })],
        weg: [`Bezugszeit: ${de(bezug[1], 0)} h`, `Ausfall = ${de(bezug[1], 0)} × (1 − ${de(q, 4)}) = **${de(aus, 2)} h** = ${de(aus * 60, 1)} min`] };
    }
    const aus = runde(zufall() * bezug[1] * 0.02, 1);
    return { titel: this.titel, text: `In einem **${bezug[0]}** fiel ein System insgesamt **${de(aus, 1)} h** aus.`,
      felder: [z("Verfügbarkeit in %", runde((1 - aus / bezug[1]) * 100, 3), { toleranz: 0.005 })],
      weg: [`V = (${de(bezug[1], 0)} − ${de(aus, 1)}) / ${de(bezug[1], 0)} × 100 = **${de((1 - aus / bezug[1]) * 100, 3)} %**`] };
  },
};

G["backup"] = {
  titel: "Backup: Speicher und Wiederherstellung", bereich: "IT-Sicherheit", modul: "I3",
  erzeuge() {
    const voll = rnd(2, 40) * 50, delta = rnd(2, 20) * 5, tage = rnd(3, 6), art = wahl(["inkrementell", "differenziell"]);
    const tn = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
    const speicher = art === "inkrementell" ? voll + tage * delta : voll + delta * tage * (tage + 1) / 2;
    const sets = art === "inkrementell" ? 1 + tage : 2;
    return {
      titel: this.titel,
      text: `Montag: Vollsicherung (**${voll} GB**). ${tn[1]} bis ${tn[tage]}: jeweils **${art}e** Sicherung. Täglich ändern sich **${delta} GB** (immer andere Daten). Nach der Sicherung am **${tn[tage]}** fällt der Server aus.`,
      felder: [z("Speicherbedarf aller Sicherungen in GB", speicher, { toleranz: 0 }), z("Anzahl benötigter Sicherungen für die Wiederherstellung", sets, { toleranz: 0 })],
      weg: art === "inkrementell"
        ? [`Inkrementell sichert nur die Änderungen seit der **letzten Sicherung** → jeden Tag ${delta} GB`, `Speicher: ${voll} + ${tage} × ${delta} = **${speicher} GB**`, `Restore: Voll + **alle** ${tage} Inkremente = **${sets}** Sicherungen`]
        : [`Differenziell sichert alles seit der letzten **Vollsicherung** → wächst täglich: ${Array.from({ length: tage }, (_, i) => delta * (i + 1)).join(", ")} GB`, `Speicher: ${voll} + ${Array.from({ length: tage }, (_, i) => delta * (i + 1)).join(" + ")} = **${speicher} GB**`, "Restore: Voll + **letzte** Differenzielle = **2** Sicherungen"],
    };
  },
};

G["schluessel"] = {
  titel: "Anzahl Schlüssel", bereich: "IT-Sicherheit", modul: "I4",
  erzeuge() {
    const n = rnd(3, 60);
    return { titel: this.titel, text: `**${n} Personen** sollen paarweise vertraulich kommunizieren können.`,
      felder: [z("Schlüssel bei symmetrischer Verschlüsselung", n * (n - 1) / 2, { toleranz: 0 }), z("Schlüssel bei asymmetrischer Verschlüsselung", 2 * n, { toleranz: 0 })],
      weg: [`Symmetrisch: jedes Paar braucht einen eigenen Schlüssel → n·(n−1)/2 = ${n}·${n - 1}/2 = **${n * (n - 1) / 2}**`, `Asymmetrisch: jede Person ein Schlüsselpaar → 2·n = **${2 * n}**`] };
  },
};

G["passwort"] = {
  titel: "Passwortstärke (Brute Force)", bereich: "IT-Sicherheit", modul: "I5",
  erzeuge() {
    const [menge, beschr] = wahl([[10, "nur Ziffern"], [26, "nur Kleinbuchstaben"], [52, "Groß- und Kleinbuchstaben"], [62, "Buchstaben und Ziffern"], [94, "alle druckbaren ASCII-Zeichen"]]);
    const l = rnd(4, 12), rate = wahl([1e6, 1e8, 1e9, 1e10]);
    const komb = Math.pow(menge, l), sek = komb / rate;
    return { titel: this.titel, text: `Ein Passwort hat **${l} Zeichen** aus dem Zeichenvorrat „${beschr}“ (${menge} Zeichen). Ein Angreifer testet **${de(rate, 0)} Passwörter/s**.`,
      felder: [z("Anzahl Kombinationen", komb, { toleranz: komb * 0.01 }), z("Maximale Dauer in Tagen", runde(sek / 86400, 4), { toleranz: Math.max(sek / 86400 * 0.01, 0.0001) })],
      weg: [`Kombinationen = Zeichenvorrat^Länge = ${menge}^${l} = **${komb.toExponential(3).replace(".", ",")}**`, `Dauer = ${komb.toExponential(3).replace(".", ",")} / ${de(rate, 0)} = ${sek.toExponential(3).replace(".", ",")} s = **${de(sek / 86400, 4)} Tage**`, "Länge bringt mehr als Komplexität: jedes zusätzliche Zeichen multipliziert den Aufwand mit dem Zeichenvorrat."] };
  },
};

// ---------------------------------------------------------------------------
// Generatoren: AP2 (Systemintegration, Anwendungsentwicklung, WiSo)
// Die Modulzuordnung je Fachrichtung steht in „99 System/konfig.json“ (trainerModul).
// ---------------------------------------------------------------------------
const TIB = 1024;  // GiB je TiB – die AP2-Aufgaben rechnen durchgängig binär

G["speicherbedarf"] = {
  titel: "Speicherbedarf planen", bereich: "Konzeption", modul: "FISI-3",
  erzeuge() {
    const art = wahl(["bedarf", "bedarf", "jahre", "archiv"]);
    if (art === "bedarf") {
      const alt = wahl([4, 6, 8, 9, 10, 12, 16, 20]), fuell = wahl([0.6, 0.7, 0.75, 0.8, 0.85, 0.9]);
      const zuwachs = rnd(3, 18) * 50, jahre = rnd(2, 6);
      const altGiB = alt * TIB * fuell, neuGiB = zuwachs * jahre, sum = altGiB + neuGiB;
      return {
        titel: this.titel,
        text: `Das bisherige Speichersystem hat **${alt} TiB** und ist zu **${de(fuell * 100, 0)} %** belegt. Pro Jahr kommen **${zuwachs} GiB** hinzu. Das neue System soll den Bedarf der nächsten **${jahre} Jahre** abdecken.`,
        felder: [z("Altdatenbestand in GiB", runde(altGiB, 1), { toleranz: 0.5 }), z("Benötigter Speicher in GiB", runde(sum, 1), { toleranz: 0.5 }),
          z("Benötigter Speicher in TiB (1 Nachkommastelle, aufgerundet)", Math.ceil(sum / TIB * 10 - 1e-9) / 10, { toleranz: 0.001 })],
        weg: [`Altbestand: ${alt} TiB × ${de(fuell)} × 1.024 = **${de(altGiB, 1)} GiB**`, `Zuwachs: ${zuwachs} GiB/Jahr × ${jahre} Jahre = ${de(neuGiB, 0)} GiB`,
          `Summe: ${de(altGiB, 1)} + ${de(neuGiB, 0)} = **${de(sum, 1)} GiB**`, `In TiB: ${de(sum, 1)} / 1.024 = ${de(sum / TIB, 4)} → aufgerundet **${de(Math.ceil(sum / TIB * 10 - 1e-9) / 10, 1)} TiB** (abrunden hieße: Speicher reicht nicht)`],
      };
    }
    if (art === "jahre") {
      const alt = wahl([6, 8, 9, 10, 12]), fuell = wahl([0.8, 0.85, 0.9]), neu = wahl([16, 20, 24, 32]), max = wahl([0.7, 0.75, 0.8]), zuwachs = rnd(5, 16) * 50;
      const frei = neu * TIB * max - alt * TIB * fuell, jahre = frei / zuwachs;
      return {
        titel: this.titel,
        text: `Auf einem alten NAS mit **${alt} TiB** (zu **${de(fuell * 100, 0)} %** belegt) liegen die Firmendaten. Sie werden auf ein neues System mit **${neu} TiB** Nettokapazität umgezogen, das aus Performancegründen höchstens zu **${de(max * 100, 0)} %** gefüllt werden soll. Der Datenzuwachs beträgt **${zuwachs} GiB pro Jahr**.`,
        felder: [z("Zusätzlich nutzbarer Speicher in GiB", runde(frei, 1), { toleranz: 0.5 }), z("Wie viele volle Jahre reicht das neue System?", Math.floor(jahre), { toleranz: 0 })],
        weg: [`Nutzbar im neuen System: ${neu} × 1.024 × ${de(max)} = ${de(neu * TIB * max, 1)} GiB`, `Bereits belegt: ${alt} × 1.024 × ${de(fuell)} = ${de(alt * TIB * fuell, 1)} GiB`,
          `Reserve: **${de(frei, 1)} GiB**`, `${de(frei, 1)} / ${zuwachs} = ${de(jahre, 3)} → **${Math.floor(jahre)} volle Jahre** (immer abrunden – im angebrochenen Jahr ist der Speicher voll)`],
      };
    }
    const monat = rnd(10, 60), rate = wahl([0.4, 0.5, 0.6, 0.7]), jahre = wahl([5, 6, 8, 10]), ziel = wahl([512, 1024, 2048]);
    const proJahr = monat * (1 - rate) * 12, gesamt = proJahr * jahre;
    return {
      titel: this.titel,
      text: `Monatlich fallen **${monat} GiB** Logdaten an, die komprimiert archiviert werden (Kompression spart **${de(rate * 100, 0)} %** Platz). Die Aufbewahrungsfrist beträgt **${jahre} Jahre**. Reserviert sind **${ziel} GiB** Archivspeicher.`,
      felder: [z("Archivbedarf pro Jahr in GiB", runde(proJahr, 2), { toleranz: 0.05 }), z(`Archivbedarf für ${jahre} Jahre in GiB`, runde(gesamt, 1), { toleranz: 0.5 }),
        z("Wie viele volle Jahre reicht der reservierte Speicher?", Math.floor(ziel / proJahr), { toleranz: 0 })],
      weg: [`Nach Kompression bleiben ${de((1 - rate) * 100, 0)} %: ${monat} × ${de(1 - rate)} = ${de(monat * (1 - rate), 2)} GiB/Monat`, `× 12 = **${de(proJahr, 2)} GiB/Jahr**, × ${jahre} = **${de(gesamt, 1)} GiB**`,
        `${ziel} / ${de(proJahr, 2)} = ${de(ziel / proJahr, 2)} → **${Math.floor(ziel / proJahr)} volle Jahre**`],
    };
  },
};

G["raid-planung"] = {
  titel: "RAID planen: Plattenanzahl", bereich: "Konzeption", modul: "FISI-3",
  erzeuge() {
    const level = wahl([5, 6, 6, 10]), c = wahl([2, 4, 6, 8, 10, 12, 16]), spare = zufall() < 0.5;
    const bedarf = runde(c * rnd(3, 12) - (zufall() < 0.6 ? rnd(1, c * 10 - 1) / 10 : 0), 1);
    const daten = Math.ceil(bedarf / c - 1e-9);
    const platten = level === 10 ? 2 * daten : daten + (level === 5 ? 1 : 2);
    const gesamt = platten + (spare ? 1 : 0);
    const netto = level === 10 ? platten / 2 * c : daten * c;
    return {
      titel: this.titel,
      text: `Benötigt werden mindestens **${de(bedarf, 1)} TiB** Nettokapazität. Eingesetzt werden Festplatten mit je **${c} TiB** als **RAID ${level}**` + (spare ? " plus **eine Hot-Spare-Platte**." : " (ohne Hot Spare)."),
      felder: [z("Anzahl Festplatten insgesamt", gesamt, { toleranz: 0 }), z("Nettokapazität des RAID in TiB", netto, { toleranz: 0.01 }),
        f("Wie viele Plattenausfälle sind garantiert verkraftbar?", "wahl", level === 6 ? "2" : "1", { optionen: ["0", "1", "2", "3"] })],
      weg: [`Datenplatten: ${de(bedarf, 1)} / ${c} = ${de(bedarf / c, 3)} → aufrunden auf **${daten}**`,
        level === 10 ? `RAID 10 spiegelt jede Datenplatte: ${daten} × 2 = **${platten}**` : `RAID ${level}: + ${level === 5 ? "1 Platte" : "2 Platten"} für die Parität = **${platten}**`,
        spare ? `+ 1 Hot Spare = **${gesamt} Platten** (die Hot Spare zählt nicht zur Kapazität)` : `Gesamt: **${gesamt} Platten**`,
        `Netto: ${level === 10 ? `${platten} / 2 × ${c}` : `${daten} × ${c}`} = **${netto} TiB**`,
        level === 6 ? "RAID 6: doppelte Parität → 2 beliebige Platten dürfen ausfallen." : level === 5 ? "RAID 5: einfache Parität → 1 Platte darf ausfallen." : "RAID 10: garantiert nur 1 Ausfall – mehr nur, wenn es verschiedene Spiegelpaare trifft."],
    };
  },
};

const NETZTEILE = [300, 350, 400, 450, 500, 550, 600, 650, 750, 850, 1000, 1200, 1600];
G["netzteil"] = {
  titel: "Netzteil dimensionieren", bereich: "Konzeption", modul: "FISI-1",
  erzeuge() {
    const teile = stichprobe([["CPU", rnd(6, 25) * 5], ["Mainboard", rnd(6, 12) * 5], ["Arbeitsspeicher", rnd(2, 8) * 4], ["SSDs", rnd(2, 8) * 4], ["RAID-Controller", rnd(3, 6) * 5], ["Netzwerkkarte", rnd(2, 5) * 4], ["Lüfter", rnd(2, 6) * 3], ["Grafikkarte", rnd(6, 30) * 10]], rnd(4, 6));
    const puffer = wahl([0.2, 0.25, 0.3]), eta = wahl([0.85, 0.88, 0.9, 0.92]);
    const summe = teile.reduce((s, t) => s + t[1], 0), mitP = summe * (1 + puffer), noetig = mitP / eta;
    const passend = NETZTEILE.find(n => n >= noetig - 1e-9);
    return {
      titel: this.titel,
      text: `Ein Server enthält: ${teile.map(t => `${t[0]} **${t[1]} W**`).join(", ")}. Geplant wird mit **${de(puffer * 100, 0)} %** Leistungsreserve; der Wirkungsgrad des Netzteils beträgt **${de(eta * 100, 0)} %**. Lieferbar: ${NETZTEILE.join(" · ")} W.`,
      felder: [z("Summe der Leistungsaufnahme in W", summe, { toleranz: 0 }), z("Mindestleistung des Netzteils in W", runde(noetig, 2), { toleranz: 0.5 }),
        f("Kleinstes passendes Netzteil", "wahl", `${passend} W`, { optionen: NETZTEILE.map(n => `${n} W`) })],
      weg: [`Summe: ${teile.map(t => t[1]).join(" + ")} = **${summe} W**`, `+ Reserve: ${summe} × ${de(1 + puffer)} = ${de(mitP, 2)} W`,
        `Wirkungsgrad berücksichtigen: ${de(mitP, 2)} / ${de(eta)} = **${de(noetig, 2)} W**`, `Nächste marktübliche Größe: **${passend} W**`],
    };
  },
};

G["stromkosten"] = {
  titel: "Stromkosten und Einsparung", bereich: "Konzeption", modul: "FISI-1",
  erzeuge() {
    const nAlt = rnd(3, 8), wAlt = rnd(20, 60) * 10, nNeu = rnd(1, Math.max(1, nAlt - 2)), wNeu = rnd(30, 90) * 10;
    const preis = wahl([0.28, 0.3, 0.32, 0.35, 0.38]), h = 24 * 365;
    const kAlt = nAlt * wAlt * h / 1000 * preis, kNeu = nNeu * wNeu * h / 1000 * preis;
    return {
      titel: this.titel,
      text: `Bisher laufen **${nAlt} Server** mit je **${wAlt} W** rund um die Uhr. Sie werden durch **${nNeu} Virtualisierungshost${nNeu > 1 ? "s" : ""}** mit je **${wNeu} W** ersetzt. Strompreis: **${de(preis)} €/kWh**, 365 Tage im Jahr.`,
      felder: [z("Stromkosten bisher pro Jahr in €", runde(kAlt, 2), { toleranz: 0.5 }), z("Stromkosten neu pro Jahr in €", runde(kNeu, 2), { toleranz: 0.5 }), z("Einsparung pro Jahr in €", runde(kAlt - kNeu, 2), { toleranz: 1 })],
      weg: [`Bisher: ${nAlt} × ${wAlt} W = ${nAlt * wAlt} W = ${de(nAlt * wAlt / 1000, 2)} kW × 8.760 h = ${de(nAlt * wAlt * h / 1000, 1)} kWh × ${de(preis)} € = **${euro(kAlt)}**`,
        `Neu: ${nNeu} × ${wNeu} W = ${de(nNeu * wNeu / 1000, 2)} kW × 8.760 h = ${de(nNeu * wNeu * h / 1000, 1)} kWh × ${de(preis)} € = **${euro(kNeu)}**`, `Einsparung: **${euro(kAlt - kNeu)}** pro Jahr`],
    };
  },
};

G["verfuegbarkeit-kombi"] = {
  titel: "Verfügbarkeit: Reihe und Parallel", bereich: "Netzwerke", modul: "FISI-14",
  erzeuge() {
    const a = wahl([0.95, 0.98, 0.99, 0.995, 0.999]), b = wahl([0.95, 0.98, 0.99, 0.995]);
    const parallel = zufall() < 0.55, umsatz = rnd(2, 20) * 100;
    const g = parallel ? 1 - (1 - a) * (1 - b) : a * b, aus = 8760 * (1 - g);
    return {
      titel: this.titel,
      text: parallel
        ? `Ein Standort ist über **zwei unabhängige Internetleitungen** angebunden (Verfügbarkeit **${de(a * 100, 1)} %** und **${de(b * 100, 1)} %**). Der Standort ist nur offline, wenn **beide** gleichzeitig ausfallen. Ein Ausfall kostet **${umsatz} € Umsatz pro Stunde**.`
        : `Ein Webshop braucht **Firewall** (Verfügbarkeit **${de(a * 100, 1)} %**) **und** **Datenbankserver** (**${de(b * 100, 1)} %**) – fällt eine Komponente aus, steht der Shop. Ein Ausfall kostet **${umsatz} € Umsatz pro Stunde**.`,
      felder: [z("Gesamtverfügbarkeit in %", runde(g * 100, 4), { toleranz: 0.0005 }), z("Erwartete Ausfallzeit pro Jahr in h (24/7)", runde(aus, 2), { toleranz: 0.02 }), z("Erwarteter Umsatzverlust pro Jahr in €", runde(aus * umsatz, 2), { toleranz: Math.max(umsatz * 0.02, 1) })],
      weg: [parallel ? `Parallel: 1 − (1 − ${de(a, 3)}) × (1 − ${de(b, 3)}) = 1 − ${de(1 - a, 3)} × ${de(1 - b, 3)} = **${de(g * 100, 4)} %**` : `Reihe: ${de(a, 3)} × ${de(b, 3)} = **${de(g * 100, 4)} %** (Reihe ist immer schlechter als das schwächste Glied)`,
        `Ausfall: 8.760 h × ${de(1 - g, 6)} = **${de(aus, 2)} h**`, `Umsatzverlust: ${de(aus, 2)} h × ${umsatz} € = **${euro(aus * umsatz)}**`],
    };
  },
};

G["bandbreite"] = {
  titel: "Bandbreite berechnen", bereich: "Netzwerke", modul: "FISI-14",
  erzeuge() {
    const art = wahl(["voip", "iot", "video"]);
    if (art === "voip") {
      const n = rnd(5, 40), [codec, rate] = wahl([["G.711", 64], ["G.722", 64], ["G.729", 8]]), oh = wahl([0.1, 0.2, 0.25]);
      const bedarf = n * rate * (1 + oh);
      return { titel: this.titel, text: `Über die WAN-Leitung laufen bis zu **${n} gleichzeitige Telefonate** mit dem Codec **${codec}** (${rate} kbit/s Nutzdaten je Richtung). Für Header und Protokoll-Overhead werden **${de(oh * 100, 0)} %** aufgeschlagen.`,
        felder: [z("Benötigte Bandbreite je Richtung in kbit/s", runde(bedarf, 1), { toleranz: 0.5 }), z("… in Mbit/s", runde(bedarf / 1000, 3), { toleranz: 0.002 })],
        weg: [`${n} × ${rate} kbit/s = ${n * rate} kbit/s`, `+ ${de(oh * 100, 0)} % Overhead: × ${de(1 + oh)} = **${de(bedarf, 1)} kbit/s** = ${de(bedarf / 1000, 3)} Mbit/s`, "Sprache braucht die Bandbreite **gleichzeitig in beide Richtungen** – beim Upload asymmetrischer Anschlüsse wird es zuerst knapp."] };
    }
    if (art === "iot") {
      const n = rnd(2, 20) * 50, byte = rnd(40, 200), takt = wahl([10, 15, 30, 60]), leitung = wahl([5, 10, 20, 50]);
      const bit = n * byte * 8 / takt;
      return { titel: this.titel, text: `**${n} Sensoren** senden alle **${takt} s** eine MQTT-Nachricht mit **${byte} Byte** (inkl. Header) an den Broker. Die Funkstrecke bietet **${leitung} kbit/s**.`,
        felder: [z("Datenrate in bit/s", runde(bit, 2), { toleranz: 0.5 }), f("Reicht die Funkstrecke?", "wahl", bit <= leitung * 1000 ? "ja" : "nein", { optionen: ["ja", "nein"] })],
        weg: [`Pro Intervall: ${n} × ${byte} Byte = ${de(n * byte, 0)} Byte`, `Pro Sekunde: ${de(n * byte, 0)} / ${takt} = ${de(n * byte / takt, 2)} Byte/s × 8 = **${de(bit, 2)} bit/s** = ${de(bit / 1000, 3)} kbit/s`, `Vergleich mit ${leitung} kbit/s → **${bit <= leitung * 1000 ? "reicht" : "reicht nicht"}**`] };
    }
    const n = rnd(4, 15), up = wahl([1500, 2000, 2500, 3000]), down = wahl([3000, 4000, 5000]), dsl = wahl([[16, 1], [50, 10], [100, 40], [250, 40]]);
    const upGes = n * up / 1000, downGes = n * down / 1000;
    const engpass = downGes > dsl[0] || upGes > dsl[1];
    return { titel: this.titel, text: `An einer Videokonferenz nehmen **${n} Personen** aus dem Büro teil. Pro Person: **${up} kbit/s Upload** und **${down} kbit/s Download**. Der Anschluss liefert **${dsl[0]} Mbit/s Download / ${dsl[1]} Mbit/s Upload**.`,
      felder: [z("Benötigter Upload in Mbit/s", runde(upGes, 2), { toleranz: 0.01 }), z("Benötigter Download in Mbit/s", runde(downGes, 2), { toleranz: 0.01 }), f("Reicht der Anschluss?", "wahl", engpass ? "nein" : "ja", { optionen: ["ja", "nein"] })],
      weg: [`Upload: ${n} × ${up} kbit/s = **${de(upGes, 2)} Mbit/s** (verfügbar ${dsl[1]})`, `Download: ${n} × ${down} kbit/s = **${de(downGes, 2)} Mbit/s** (verfügbar ${dsl[0]})`, engpass ? "Mindestens eine Richtung ist überbucht → Ton/Bild bricht ein; QoS oder größerer Anschluss nötig." : "Beide Richtungen reichen."] };
  },
};

G["transferzeit"] = {
  titel: "Übertragungszeit mit Overhead", bereich: "Netzwerke", modul: "FISI-14",
  erzeuge() {
    const einheit = wahl(["MiB", "GiB", "GiB"]), menge = einheit === "MiB" ? rnd(2, 40) * 50 : rnd(2, 40);
    const rate = wahl([16, 50, 100, 250, 500, 1000]), oh = wahl([0, 0.1, 0.1, 0.15]);
    const bit = menge * EINHEITEN[einheit] * 8 * (1 + oh), s = bit / (rate * 1e6);
    return {
      titel: this.titel,
      text: `Ein Backup von **${de(menge, 0)} ${einheit}** wird über eine **${rate}-Mbit/s**-Leitung übertragen` + (oh ? `. Für Protokoll-Overhead werden **${de(oh * 100, 0)} %** auf die Datenmenge aufgeschlagen.` : " (Overhead vernachlässigt)."),
      felder: [z("Zu übertragende Bit (inkl. Overhead)", runde(bit, 0), { toleranz: Math.max(bit * 0.0005, 1) }), z("Dauer in Sekunden", runde(s, 2), { toleranz: Math.max(s * 0.005, 0.5) })],
      weg: [`${de(menge, 0)} ${einheit} = ${de(menge, 0)} × ${de(EINHEITEN[einheit], 0)} Byte × 8 = ${de(menge * EINHEITEN[einheit] * 8, 0)} Bit (binär!)`,
        oh ? `+ ${de(oh * 100, 0)} % Overhead: × ${de(1 + oh)} = ${de(bit, 0)} Bit` : "Kein Overhead.",
        `Leitung dezimal: ${rate} Mbit/s = ${de(rate * 1e6, 0)} bit/s`, `t = ${de(bit, 0)} / ${de(rate * 1e6, 0)} = **${de(s, 2)} s** ≈ ${dauerText(s)}`],
    };
  },
};

const TAGNAMEN = ["Mo", "Di", "Mi", "Do", "Fr", "Sa"];
G["backup-plan"] = {
  titel: "Rücksicherung planen", bereich: "Konzeption", modul: "FISI-4",
  erzeuge() {
    const n = rnd(4, 6), stil = wahl(["inkr", "diff", "mix", "mix"]);
    const plan = ["V"];
    for (let i = 1; i < n; i++) plan.push(stil === "inkr" ? "I" : stil === "diff" ? "D" : (zufall() < 0.12 ? "V" : wahl(["I", "D"])));
    const k = rnd(Math.min(2, n - 1), n - 1);  // Ausfall nach der Sicherung von Tag k
    const letzteV = plan.slice(0, k + 1).lastIndexOf("V");
    // Archivbit: Voll und inkrementell setzen es zurück, differenziell nicht → jede Sicherung enthält die Änderungen seit dem letzten Zurücksetzen
    const noetig = [letzteV];
    let letzterReset = letzteV;
    for (let i = letzteV + 1; i <= k; i++) if (plan[i] === "I") { noetig.push(i); letzterReset = i; }
    const diffs = [];
    for (let i = letzterReset + 1; i <= k; i++) if (plan[i] === "D") diffs.push(i);
    if (diffs.length) noetig.push(diffs[diffs.length - 1]);
    const lang = { V: "Voll", I: "inkrementell", D: "differenziell" };
    return {
      titel: this.titel,
      text: `Sicherungsplan einer Woche (Archivbit-Verfahren: Voll- und inkrementelle Sicherung setzen das Archivbit zurück, die differenzielle nicht). Nach der Sicherung am **${TAGNAMEN[k]}** fällt der Server aus. Welche Sicherungen spielst du zurück?`,
      tabelle: [["Tag", ...TAGNAMEN.slice(0, n)], ["Sicherung", ...plan.map(p => lang[p])]],
      felder: [f("Benötigte Sicherungen (Tage, z. B. Mo, Mi)", "menge", noetig.map(i => TAGNAMEN[i]), { anzeige: noetig.map(i => TAGNAMEN[i]).join(", ") }), z("Anzahl Sicherungen", noetig.length, { toleranz: 0 })],
      weg: [`Ausgangspunkt ist die letzte Vollsicherung vor dem Ausfall: **${TAGNAMEN[letzteV]}**`,
        "Jede inkrementelle Sicherung danach enthält nur die Änderungen seit dem letzten Zurücksetzen des Archivbits → **alle** werden gebraucht, in zeitlicher Reihenfolge.",
        "Eine differenzielle Sicherung enthält alles seit dem letzten Zurücksetzen (Voll **oder** inkrementell) → nur die **letzte** differenzielle nach dem letzten Zurücksetzen wird gebraucht.",
        `Ergebnis: **${noetig.map(i => `${TAGNAMEN[i]} (${lang[plan[i]]})`).join(" → ")}**`],
    };
  },
};

G["generationen"] = {
  titel: "Generationenprinzip: Medienbedarf", bereich: "Konzeption", modul: "FISI-4",
  erzeuge() {
    const tage = wahl([5, 6]), soehne = tage - 1, vaeter = wahl([4, 5]), grossv = wahl([3, 6, 12]);
    return {
      titel: this.titel,
      text: `Gesichert wird an **${tage} Tagen pro Woche** nach dem Großvater-Vater-Sohn-Prinzip: An den ersten ${soehne} Tagen jeweils ein **Sohn**-Band (wöchentlich überschrieben), am letzten Wochentag ein **Vater**-Band (${vaeter} Wochen aufbewahrt), zum Monatsende ein **Großvater**-Band (${grossv} Monate aufbewahrt).`,
      felder: [z("Anzahl Sohn-Bänder", soehne, { toleranz: 0 }), z("Anzahl Vater-Bänder", vaeter, { toleranz: 0 }), z("Bänder insgesamt", soehne + vaeter + grossv, { toleranz: 0 })],
      weg: [`Söhne: ein Band je Tag außer dem Vater-Tag → **${soehne}**`, `Väter: ein Band je aufbewahrter Woche → **${vaeter}**`, `Großväter: ein Band je Monat → ${grossv}`, `Summe: ${soehne} + ${vaeter} + ${grossv} = **${soehne + vaeter + grossv}**`],
    };
  },
};

G["ipv6-subnetze"] = {
  titel: "IPv6: /64-Netze bilden", bereich: "Netzwerke", modul: "FISI-9",
  erzeuge() {
    const p = wahl([48, 52, 56, 56, 60]);
    const b3 = rnd(1, 0xffff).toString(16), b4 = p === 48 ? 0 : rnd(0, 0xff) << 8 & (0xffff << (64 - p)) & 0xffff;
    const basis = p === 48 ? `2001:db8:${b3}::` : ipv6Kurz(ipv6Voll(`2001:db8:${b3}:${b4.toString(16)}::`));
    const anzahl = Math.pow(2, 64 - p), letztes = (b4 + anzahl - 1).toString(16);
    const erstes = ipv6Kurz(ipv6Voll(`2001:db8:${b3}:${b4.toString(16)}::`)), letzt = ipv6Kurz(ipv6Voll(`2001:db8:${b3}:${letztes}::`));
    return {
      titel: this.titel,
      text: `Der Provider weist das Präfix **${basis}/${p}** zu. Intern werden ausschließlich **/64-Netze** gebildet (die letzten 64 Bit sind der Interface Identifier).`,
      felder: [z("Anzahl möglicher /64-Netze", anzahl, { toleranz: 0 }), f("Erstes /64-Netz", "ipv6", `${erstes}/64`, { anzeige: `${erstes}/64` }), f("Letztes /64-Netz", "ipv6", `${letzt}/64`, { anzeige: `${letzt}/64` })],
      weg: [`Subnetzbits: 64 − ${p} = ${64 - p} → 2^${64 - p} = **${de(anzahl, 0)}** Netze`, `Die Subnetzbits liegen im 4. Block (Bits 49–64); dort zählt man von 0x${b4.toString(16)} bis 0x${letztes}.`,
        `Erstes: **${erstes}/64** · Letztes: **${letzt}/64**`, "Jedes /64 enthält 2^64 ≈ 1,84 × 10^19 Adressen."],
    };
  },
};

// Kleine Tabelle, Abfrage lesen, Ergebnis vorhersagen – übt SQL-Verständnis ohne Datenbank
const ORTE = ["Köln", "Essen", "Bonn", "Dortmund"];
G["sql-ergebnis"] = {
  titel: "SQL: Ergebnis vorhersagen", bereich: "Anwendungsentwicklung", modul: "FIAE-3",
  erzeuge() {
    const zeilen = Array.from({ length: rnd(6, 9) }, (_, i) => ({ id: 101 + i, ort: wahl(ORTE), umsatz: rnd(4, 60) * 50, aktiv: zufall() < 0.7 ? 1 : 0 }));
    const ort = wahl(zeilen).ort, grenze = rnd(8, 30) * 50;
    const vorlagen = [
      () => ({ sql: `SELECT COUNT(*)\nFROM Kunde\nWHERE Ort = '${ort}' AND Aktiv = 1;`, erg: zeilen.filter(r => r.ort === ort && r.aktiv).length, erkl: `Zeilen mit Ort = ${ort} **und** Aktiv = 1 zählen` }),
      () => ({ sql: `SELECT SUM(Umsatz)\nFROM Kunde\nWHERE Umsatz > ${grenze};`, erg: zeilen.filter(r => r.umsatz > grenze).reduce((s, r) => s + r.umsatz, 0), erkl: `Nur Umsätze **größer** ${grenze} (nicht gleich) addieren` }),
      () => ({ sql: `SELECT MAX(Umsatz)\nFROM Kunde\nWHERE Ort <> '${ort}';`, erg: Math.max(0, ...zeilen.filter(r => r.ort !== ort).map(r => r.umsatz)), erkl: `Größter Umsatz aller Kunden **außerhalb** von ${ort}` }),
      () => { const gruppen = {}; zeilen.forEach(r => { gruppen[r.ort] = (gruppen[r.ort] || 0) + 1; });
        return { sql: "SELECT Ort, COUNT(*)\nFROM Kunde\nGROUP BY Ort\nHAVING COUNT(*) >= 2;", erg: Object.values(gruppen).filter(n => n >= 2).length, erkl: `Gruppen je Ort: ${Object.entries(gruppen).map(([o, n]) => `${o} ${n}`).join(", ")} → HAVING behält nur Gruppen mit mindestens 2 Kunden. Gefragt ist die **Anzahl der Ergebniszeilen**` }; },
      () => { const sel = zeilen.filter(r => r.aktiv); return { sql: "SELECT AVG(Umsatz)\nFROM Kunde\nWHERE Aktiv = 1;", erg: sel.length ? runde(sel.reduce((s, r) => s + r.umsatz, 0) / sel.length, 2) : 0, erkl: `Durchschnitt der ${sel.length} aktiven Kunden` }; },
    ];
    let v; do { v = wahl(vorlagen)(); } while (!v.erg && zufall() < 0.9);
    const frage = v.sql.split("\n")[0].includes("Ort, COUNT") ? "Wie viele Zeilen liefert die Abfrage?" : "Welchen Wert liefert die Abfrage?";
    return {
      titel: this.titel, text: `Tabelle **Kunde**. ${frage}`,
      tabelle: [["KundenID", "Ort", "Umsatz", "Aktiv"], ...zeilen.map(r => [r.id, r.ort, r.umsatz, r.aktiv])],
      code: v.sql, felder: [z("Ergebnis", v.erg, { toleranz: 0.01 })],
      weg: [v.erkl, `Ergebnis: **${de(v.erg, 2)}**`, "Reihenfolge der Auswertung: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY."],
    };
  },
};

G["ganzzahl-modulo"] = {
  titel: "Ganzzahldivision und Modulo", bereich: "Anwendungsentwicklung", modul: "FIAE-2",
  erzeuge() {
    const art = wahl(["ziffer", "ziffer", "rest", "zeit"]);
    if (art === "ziffer") {
      const n = rnd(1000000, 9999999), k = rnd(1, 6), ziffer = Math.floor(n / Math.pow(10, k)) % 10;
      return { titel: this.titel, text: `Eine Service-ID ist die ganze Zahl **${n}**. Die **${k + 1}. Ziffer von rechts** codiert die Priorität. Ermittle sie nur mit \`/\` (Ganzzahldivision) und \`%\` (Modulo).`,
        code: `prioritaet = (serviceId / ${de(Math.pow(10, k), 0).replace(/\./g, "")}) % 10`,
        felder: [z(`Ergebnis von ${n} / ${Math.pow(10, k)}`, Math.floor(n / Math.pow(10, k)), { toleranz: 0 }), z("Priorität", ziffer, { toleranz: 0 })],
        weg: [`Ganzzahldivision schneidet die letzten ${k} Stellen ab: ${n} / ${Math.pow(10, k)} = **${Math.floor(n / Math.pow(10, k))}**`, `% 10 liefert die letzte Stelle davon: **${ziffer}**`] };
    }
    if (art === "rest") {
      const a = rnd(20, 500), b = rnd(3, 17);
      return { titel: this.titel, text: `Es gilt: \`a = ${a}\`, \`b = ${b}\` (Ganzzahlen).`,
        felder: [z("a / b (ganzzahlig)", Math.floor(a / b), { toleranz: 0 }), z("a % b", a % b, { toleranz: 0 })],
        weg: [`${a} = ${Math.floor(a / b)} × ${b} + ${a % b}`, `→ Quotient **${Math.floor(a / b)}**, Rest **${a % b}**`, "Probe: Quotient × Divisor + Rest = Dividend."] };
    }
    const sek = rnd(3600, 200000);
    return { titel: this.titel, text: `Eine Laufzeit wird in Sekunden gespeichert: **${sek} s**. Wandle sie mit \`/\` und \`%\` in Stunden, Minuten und Sekunden um.`,
      felder: [z("Stunden", Math.floor(sek / 3600), { toleranz: 0 }), z("Minuten", Math.floor(sek % 3600 / 60), { toleranz: 0 }), z("Sekunden", sek % 60, { toleranz: 0 })],
      weg: [`Stunden: ${sek} / 3600 = **${Math.floor(sek / 3600)}**`, `Minuten: (${sek} % 3600) / 60 = ${sek % 3600} / 60 = **${Math.floor(sek % 3600 / 60)}**`, `Sekunden: ${sek} % 60 = **${sek % 60}**`] };
  },
};

G["datentyp-bereich"] = {
  titel: "Datentypen und Wertebereiche", bereich: "Anwendungsentwicklung", modul: "FIAE-2",
  erzeuge() {
    if (zufall() < 0.6) {
      const [name, bits, signed] = wahl([["byte (vorzeichenlos)", 8, false], ["sbyte / Java-byte", 8, true], ["short", 16, true], ["ushort", 16, false], ["int", 32, true], ["uint", 32, false]]);
      const min = signed ? -Math.pow(2, bits - 1) : 0, max = signed ? Math.pow(2, bits - 1) - 1 : Math.pow(2, bits) - 1;
      return { titel: this.titel, text: `Welchen Wertebereich hat der Ganzzahltyp **${name}** mit **${bits} Bit**${signed ? " (vorzeichenbehaftet, Zweierkomplement)" : ""}?`,
        felder: [z("Kleinster Wert", min, { toleranz: 0 }), z("Größter Wert", max, { toleranz: 0 })],
        weg: signed ? [`Vorzeichenbehaftet: −2^${bits - 1} bis 2^${bits - 1} − 1`, `= **${de(min, 0)}** bis **${de(max, 0)}** (eine Zahl mehr im Negativen, weil die 0 bei den positiven mitzählt)`]
          : [`Vorzeichenlos: 0 bis 2^${bits} − 1 = **${de(max, 0)}**`] };
    }
    const werte = wahl([100, 256, 1000, 1440, 5000, 65536, 100000, 1000000, 17179869184]);
    const bits = Math.ceil(Math.log2(werte));
    return { titel: this.titel, text: `Wie viele Bit braucht man mindestens, um **${de(werte, 0)} verschiedene Werte** (z. B. 0 bis ${de(werte - 1, 0)}) darzustellen?`,
      felder: [z("Mindestanzahl Bit", bits, { toleranz: 0 })],
      weg: [`Gesucht ist das kleinste n mit 2^n ≥ ${de(werte, 0)}`, `2^${bits - 1} = ${de(Math.pow(2, bits - 1), 0)} < ${de(werte, 0)} ≤ 2^${bits} = ${de(Math.pow(2, bits), 0)} → **${bits} Bit**`] };
  },
};

// ---------------------------------------------------------------- WiSo
G["urlaub-jugend"] = {
  titel: "Urlaubsanspruch (JArbSchG/BUrlG)", bereich: "WiSo", modul: "WISO-1",
  erzeuge() {
    const jahr = wahl([2026, 2027, 2028]), alter = rnd(15, 19);
    const tag = rnd(2, 28), monat = rnd(1, 12);
    const geburt = `${String(tag).padStart(2, "0")}.${String(monat).padStart(2, "0")}.${jahr - alter}`;
    // Alter zu Beginn des Kalenderjahres (1. Januar): der Geburtstag im Jahr liegt danach (Tag ≥ 2)
    const alterJan = alter - 1;
    const min = alterJan < 16 ? 30 : alterJan < 17 ? 27 : alterJan < 18 ? 25 : 24;
    const vertrag = min + rnd(0, 6);
    return {
      titel: this.titel,
      text: `Eine Auszubildende ist am **${geburt}** geboren. Ihr Ausbildungsvertrag sieht für **${jahr}** **${vertrag} Werktage** Urlaub vor.\n- JArbSchG: zu Beginn des Kalenderjahres noch nicht 16 → 30, noch nicht 17 → 27, noch nicht 18 → 25 Werktage\n- BUrlG (ab 18): 24 Werktage`,
      felder: [z("Alter am 1. Januar", alterJan, { toleranz: 0 }), z("Gesetzlicher Mindesturlaub in Werktagen", min, { toleranz: 0 }), z("Werktage über dem Minimum", vertrag - min, { toleranz: 0 })],
      weg: [`Am 1.1.${jahr} ist sie **${alterJan}** (Geburtstag erst später im Jahr) – maßgeblich ist das Alter **zu Beginn** des Kalenderjahres.`,
        alterJan < 18 ? `JArbSchG § 19: **${min} Werktage**` : "Volljährig → BUrlG: **24 Werktage** (Werktage = Mo–Sa; bei 5-Tage-Woche 20 Arbeitstage)",
        `${vertrag} − ${min} = **${vertrag - min}** Werktage mehr`],
    };
  },
};

G["gewinnverteilung"] = {
  titel: "Gewinnverteilung nach Vertrag", bereich: "WiSo", modul: "WISO-5",
  erzeuge() {
    const namen = stichprobe(["Arslan", "Becker", "Chen", "Dietz", "Engel", "Fuchs"], rnd(2, 3));
    const einlagen = namen.map(() => rnd(2, 40) * 5000);
    const gewinn = rnd(40, 400) * 1000, gesamt = einlagen.reduce((s, e) => s + e, 0);
    if (zufall() < 0.5) {
      const zins = wahl([0.04, 0.05, 0.06]);
      const vorab = einlagen.map(e => e * zins), rest = gewinn - vorab.reduce((s, v) => s + v, 0), kopf = rest / namen.length;
      const i = rnd(0, namen.length - 1);
      return { titel: this.titel, text: `Eine OHG mit den Gesellschaftern ${namen.map((n, j) => `**${n}** (Einlage ${euro(einlagen[j])})`).join(", ")} erzielt **${euro(gewinn)}** Gewinn. Laut **Gesellschaftsvertrag** erhält jeder zunächst **${de(zins * 100, 0)} %** auf seine Einlage, der Rest wird **nach Köpfen** verteilt.`,
        felder: [z("Restgewinn nach Verzinsung in €", runde(rest, 2), { toleranz: 0.01 }), z(`Gewinnanteil ${namen[i]} in €`, runde(vorab[i] + kopf, 2), { toleranz: 0.01 })],
        weg: [`Verzinsung: ${namen.map((n, j) => `${n} ${euro(vorab[j])}`).join(", ")}`, `Rest: ${euro(gewinn)} − ${euro(gewinn - rest)} = **${euro(rest)}** → je Kopf ${euro(kopf)}`, `${namen[i]}: ${euro(vorab[i])} + ${euro(kopf)} = **${euro(vorab[i] + kopf)}**`, "Die frühere gesetzliche 4-%-Regel ist seit 2024 (MoPeG) entfallen – ohne Vertrag gilt das Verhältnis der Beteiligungen."] };
    }
    const i = rnd(0, namen.length - 1), anteil = gewinn * einlagen[i] / gesamt;
    return { titel: this.titel, text: `Die Gesellschafter einer GmbH halten Geschäftsanteile: ${namen.map((n, j) => `**${n}** ${euro(einlagen[j])}`).join(", ")}. Die Gesellschafterversammlung schüttet **${euro(gewinn)}** aus – nach dem Verhältnis der Geschäftsanteile.`,
      felder: [z(`Anteil ${namen[i]} in %`, runde(einlagen[i] / gesamt * 100, 2), { toleranz: 0.01 }), z(`Ausschüttung an ${namen[i]} in €`, runde(anteil, 2), { toleranz: 0.01 })],
      weg: [`Stammkapital gesamt: ${euro(gesamt)}`, `Anteil: ${euro(einlagen[i])} / ${euro(gesamt)} = **${de(einlagen[i] / gesamt * 100, 2)} %**`, `${euro(gewinn)} × ${de(einlagen[i] / gesamt, 4)} = **${euro(anteil)}**`] };
  },
};

G["sozialversicherung"] = {
  titel: "Sozialversicherungsbeiträge", bereich: "WiSo", modul: "WISO-4",
  erzeuge() {
    const brutto = rnd(12, 55) * 100, kinderlos = zufall() < 0.5;
    // Beispielsätze (in der Aufgabe angegeben, damit das Ergebnis unabhängig vom Jahr stimmt)
    const kv = 0.146, zusatz = wahl([0.025, 0.029]), rv = 0.186, av = 0.026, pv = 0.036, pvZ = 0.006;
    const an = brutto * (kv / 2 + zusatz / 2 + rv / 2 + av / 2 + pv / 2 + (kinderlos ? pvZ : 0));
    const ag = brutto * (kv / 2 + zusatz / 2 + rv / 2 + av / 2 + pv / 2);
    return {
      titel: this.titel,
      text: `Bruttogehalt **${euro(brutto)}** im Monat${kinderlos ? ", **kinderlos**, 25 Jahre" : ", ein Kind"}. Beitragssätze (Beispielwerte, je zur Hälfte Arbeitgeber/Arbeitnehmer): KV 14,6 % + Zusatzbeitrag ${de(zusatz * 100, 1)} %, RV 18,6 %, AV 2,6 %, PV 3,6 %${kinderlos ? " + 0,6 % Kinderlosenzuschlag (trägt der Arbeitnehmer allein)" : ""}. Beitragsbemessungsgrenzen werden nicht erreicht.`,
      felder: [z("Arbeitnehmeranteil gesamt in €", runde(an, 2), { toleranz: 0.05 }), z("Arbeitgeberanteil gesamt in €", runde(ag, 2), { toleranz: 0.05 })],
      weg: [`AN-Satz: (14,6 + ${de(zusatz * 100, 1)} + 18,6 + 2,6 + 3,6) % / 2${kinderlos ? " + 0,6 %" : ""} = ${de((kv + zusatz + rv + av + pv) / 2 * 100 + (kinderlos ? 0.6 : 0), 2)} %`,
        `AN: ${euro(brutto)} × ${de((kv + zusatz + rv + av + pv) / 2 * 100 + (kinderlos ? 0.6 : 0), 2)} % = **${euro(an)}**`, `AG: ${euro(brutto)} × ${de((kv + zusatz + rv + av + pv) / 2 * 100, 2)} % = **${euro(ag)}**`,
        "Die gesetzliche Unfallversicherung zahlt der Arbeitgeber allein (Berufsgenossenschaft)."],
    };
  },
};

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------- Karteikarten
// Liest Karten im Format des Plugins „Spaced Repetition“: „Frage::Antwort“ (auch „:::“) je Zeile oder
// mehrzeilig „Frage / ? / Antwort“ bis zur Leerzeile. Die Regeln folgen dem Plugin-Parser, damit der
// eingebaute Trainer dieselben Karten sieht; `warnungen` meldet Zeilen, die das Plugin falsch zerlegen würde.
function trennerAusserhalbCode(zeile, trenner) {
  const i = zeile.indexOf(trenner);
  if (i < 0) return -1;
  const vorher = (zeile.slice(0, i).match(/`/g) || []).length;
  const nachher = (zeile.slice(i + trenner.length).match(/`/g) || []).length;
  return vorher % 2 === 1 && nachher % 2 === 1 ? -1 : i;
}

function kartenParsen(text) {
  const zeilen = text.replace(/\r\n/g, "\n").split("\n");
  let start = 0;
  if (zeilen[0] === "---") { const ende = zeilen.indexOf("---", 1); if (ende > 0) start = ende + 1; }
  const karten = [], warnungen = [];
  let block = [], trennerIdx = -1, blockStart = start;
  const blockAbschliessen = () => {
    if (trennerIdx > 0 && trennerIdx < block.length - 1) {
      karten.push({ frage: block.slice(0, trennerIdx).join("\n").trim(), antwort: block.slice(trennerIdx + 1).join("\n").trim(), zeile: blockStart + 1 });
    }
    block = []; trennerIdx = -1;
  };
  for (let i = start; i < zeilen.length; i++) {
    const zeile = zeilen[i].trimEnd(), t = zeile.trim();
    if (t === "") { blockAbschliessen(); blockStart = i + 1; continue; }
    if (t.startsWith("<!--SR:")) continue;
    const pos = trennerAusserhalbCode(zeile, "::");
    if (pos >= 0) {
      if (block.length) warnungen.push({ zeile: i + 1, text: t, grund: "„::“ innerhalb eines Blocks – das Plugin macht daraus eine eigene Karte" });
      const lang = zeile.startsWith(":::", pos) ? 3 : 2;
      karten.push({ frage: zeile.slice(0, pos).trim(), antwort: zeile.slice(pos + lang).trim(), zeile: i + 1 });
      block = []; trennerIdx = -1; blockStart = i + 1;
      continue;
    }
    if (t === "?" && block.length && trennerIdx < 0) trennerIdx = block.length;
    block.push(zeile);
  }
  blockAbschliessen();
  return { karten: karten.filter(k => k.frage && k.antwort), warnungen };
}

// Kurzer stabiler Schlüssel für eine Karte (djb2), damit der Lernstand am Fragetext hängt statt an der Zeile
function kartenId(frage) {
  let h = 5381;
  for (const c of frage) h = ((h << 5) + h + c.codePointAt(0)) >>> 0;
  return h.toString(36);
}

return {
  setzeZufall, rnd, wahl, mische, stichprobe, runde, de, euro, prozent, parseZahl,
  normText, normIp, pruefeFeld, kartenParsen, kartenId, ipZuInt, intZuIp, ipv6Voll, ipv6Kurz, netzplanBerechnen,
  generatoren: G,
};
