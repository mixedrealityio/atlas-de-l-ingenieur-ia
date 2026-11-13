// Bibliothèque de figures de l'atlas de l'IA : chaque « kind » construit une scène à partir d'un petit dictionnaire de données.
// Toutes les scènes sont posées dans le plan x-y, face à la caméra ; le temps t (secondes) les anime en boucle.
import * as THREE from 'three';
import { part, box, cyl, lines, shadeMat, V } from './parts.js';
import * as K3 from './kit3d.js';
import { sizedBox, setBox, ball, rod, rodTo, liveCurve, board2d, plotTube, fr } from './kit.js';

const LEVELS = ['paper', 'blue', 'red'];
const heat = v => LEVELS[v < 0.2 ? 0 : v < 0.55 ? 1 : 2];
const setPal = (m, pal) => { if (m.userData.pal !== pal) { m.userData.pal = pal; m.material = shadeMat(pal); } };
const softmax = (z, T = 1) => { const m = Math.max(...z); const e = z.map(x => Math.exp((x - m) / T)); const s = e.reduce((a, b) => a + b, 0); return e.map(x => x / s); };
const wave = (t, period, lo, hi) => lo + (hi - lo) * (0.5 - 0.5 * Math.cos(2 * Math.PI * t / period));
const rnd = n => { const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
const pct = p => fr(100 * p, p < 0.1 ? 1 : 0) + ' %';

export function buildScenes(E, specs) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [], updates = [], infos = {}, frames = {};
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  for (const S of specs) {
    const g = asm(S.key, root, { title: S.title, sub: S.sub });
    const ctx = { g, S, x0: S.x0, label, part, V, E, ext: { w: 12, h: 6, cy: 2.2, cx: 0 } };
    const k = KINDS[S.kind]; if (!k) throw new Error('kind inconnu : ' + S.kind);
    const r = k(ctx) || {};
    const X = ctx.ext, tx = S.x0 + (X.cx || 0);
    frames[S.key] = { target: [tx, X.cy, 0], dist: Math.max(10, 2.3 * Math.max(X.w, X.h * 1.15) + 2) };
    g.userData.focus = () => ({ target: [tx, X.cy, 0], radius: Math.max(X.w, X.h) * 0.55 });
    if (r.update) updates.push(t => r.update(t));
    infos[S.key] = r.info || (() => '');
  }
  return { update: s => updates.forEach(u => u(s.t)), labels, info: key => (infos[key] ? infos[key]() : ''), frame: key => frames[key] };
}

// ------------------------------------------------------------------ jetons / identifiants
function tokens({ g, S, x0, label, ext }) {
  const items = S.items, W = items.map(it => 0.4 + 0.15 * [...it.t].length), gap = 0.12;
  const total = W.reduce((a, b) => a + b, 0) + gap * (items.length - 1);
  ext.w = total + 1.5; ext.h = 2.6; ext.cy = S.y ?? 1.2;
  let x = x0 - total / 2; const boxes = [];
  items.forEach((it, i) => {
    const m = part(g, box(W[i], 0.55, 0.4, 0.05), { pal: it.pal || 'paper', tone: 'hi', name: it.name || `Jeton « ${it.t} »`, pos: [x + W[i] / 2, S.y ?? 1.2, 0] });
    m.userData.pal = it.pal || 'paper'; boxes.push(m);
    const px = x + W[i] / 2;
    label('t1', it.t.replace(/ /g, '␣'), () => V(px, (S.y ?? 1.2) + 0.55, 0));
    if (it.id !== undefined) label('t2', String(it.id), () => V(px, (S.y ?? 1.2) - 0.55, 0));
    x += W[i] + gap;
  });
  return { update: t => { const c = Math.floor(t * 1.1) % items.length; boxes.forEach((m, i) => setPal(m, i === c ? 'blue' : (items[i].pal || 'paper'))); },
    info: () => S.info || '' };
}

// ------------------------------------------------------------------ nuage de points (plongements)
function scatter({ g, S, x0, label, ext }) {
  const P = {}; const balls = [], by = S.by ?? 1.2, xs = S.points.map(p => p.x), ys = S.points.map(p => p.y);
  ext.w = Math.max(...xs) - Math.min(...xs) + 3; ext.h = Math.max(...ys) - Math.min(...ys) + 2.5; ext.cy = by + (Math.max(...ys) + Math.min(...ys)) / 2; ext.cx = (Math.max(...xs) + Math.min(...xs)) / 2;
  for (const p of S.points) { const m = ball(g, p.c || 'paper', p.n, 0.14); m.position.set(x0 + p.x, by + p.y, 0); m.userData.pal = p.c || 'paper'; P[p.n] = m; balls.push([m, p]);
    label('t1', p.n, () => V(x0 + p.x + 0.12 + 0.075 * p.n.length * 1.6, by + p.y, 0)); }
  const rods = (S.arrows || []).map(([a, b, txt]) => { const r = rod(g, { r: 0.03, pal: 'red', name: 'Direction' }); rodTo(r, P[a].position, P[b].position);
    if (txt) label('vec red', txt, () => P[a].position.clone().lerp(P[b].position, 0.5).add(V(0.95, 0, 0))); return r; });
  const walk = S.walk || Object.keys(P);
  return { update: t => { const c = walk[Math.floor(t * 0.7) % walk.length]; balls.forEach(([m, p]) => setPal(m, p.n === c ? 'red' : (p.c || 'paper'))); },
    info: () => S.info || '' };
}

// ------------------------------------------------------------------ matrice d'attention
function attn({ g, S, x0, label, ext }) {
  const T = S.tokens, n = T.length, cs = 0.62;
  ext.w = n * cs + 3.2; ext.h = n * cs + 2; ext.cy = 0.4 + (n - 1) * cs / 2 + 0.2;
  const ox = x0 - (n * cs) / 2 + cs / 2, oy = 0.4 + (n - 1) * cs;
  const W = [];
  for (let i = 0; i < n; i++) { const z = S.scores[i].map((s, j) => (S.causal && j > i ? -1e9 : s)); W.push(softmax(z)); }
  const cells = [];
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const masked = S.causal && j > i;
    const m = sizedBox(g, { pal: masked ? 'ink' : 'paper', tone: 'mid', name: `Poids d’attention (${T[i]} → ${T[j]})` }); cells.push([m, i, j, masked]);
  }
  T.forEach((w, i) => { label('t1', w, () => V(ox - cs * 1.15, oy - i * cs, 0.2)); label('t1', w, () => V(ox + i * cs, oy + cs * 0.8, 0.2)); });
  label('mark', 'clés (ce qu’on regarde) →', () => V(x0, oy + cs * 1.6, 0)); label('mark', '↓ requêtes', () => V(ox - cs * 2.7, oy + cs * 0.8, 0));
  let cur = 0;
  return { update: t => {
    cur = Math.floor(t / 1.6) % n;
    for (const [m, i, j, masked] of cells) {
      const w = masked ? 0 : W[i][j], d = masked ? 0.05 : 0.08 + 1.1 * w, on = i === cur;
      setBox(m, ox + j * cs - cs * 0.42, ox + j * cs + cs * 0.42, oy - i * cs - cs * 0.42, oy - i * cs + cs * 0.42, 0, d);
      setPal(m, masked ? 'ink' : on ? heat(w * 1.2 + 0.25) : 'paper');
    } },
    info: () => { const w = W[cur], j = w.indexOf(Math.max(...w)); return `requête « ${T[cur]} »\nregarde surtout « ${T[j]} » (${pct(w[j])})`; } };
}

// ------------------------------------------------------------------ chaîne d'étapes (rangées de boîtes reliées)
function pipeline({ g, S, x0, label, ext }) {
  const st = S.stages, per = S.per || st.length, bw = S.bw || 1.9, gap = S.gap || 0.7, rowsN = Math.ceil(st.length / per), dy = 2.2;
  ext.w = Math.min(per, st.length) * (bw + gap) + 0.5; ext.h = rowsN * dy + 1.6; ext.cy = (S.y ?? 1.2) + (rowsN - 1) * dy / 2 + 0.3;
  const pos = st.map((_, i) => { const r = Math.floor(i / per), c0 = i % per, c = r % 2 ? per - 1 - c0 : c0; return V(x0 + (c - (per - 1) / 2) * (bw + gap), (S.y ?? 1.2) + (rowsN - 1 - r) * dy, 0); });
  const boxes = st.map((s, i) => { const m = part(g, box(bw, 0.8, 0.5, 0.06), { pal: s.pal || 'paper', tone: 'hi', name: s.n, pos: pos[i].toArray() }); m.userData.pal = s.pal || 'paper';
    label('t1', s.n, () => V(pos[i].x, pos[i].y + 0.66, 0.3)); if (s.s) label('t2', s.s, () => V(pos[i].x, pos[i].y - 0.62, 0.3)); return m; });
  for (let i = 0; i < st.length - 1; i++) { const r = rod(g, { r: 0.04, pal: 'ink', name: 'Flux' }); let a = pos[i], b = pos[i + 1];
    if (Math.abs(a.x - b.x) < 0.01) { const sx = (Math.floor(i / per) % 2 === 0 ? 1 : -1) * (bw / 2 - 0.12); a = V(a.x + sx, a.y - 0.4, 0); b = V(b.x + sx, b.y + 0.4, 0); } rodTo(r, a, b); }
  if (S.loop) { const top = Math.max(...pos.map(p => p.y)) + 1.2; label('vec red', '↺ ' + S.loop, () => V(x0, top, 0)); ext.h += 0.8; ext.cy += 0.4; }
  const pk = ball(g, 'red', 'Donnée', 0.16); let cur = 0;
  return { update: t => { const u = (t * 0.55) % st.length, i = Math.floor(u), f = u - i; cur = i;
    const a = pos[i], b = pos[(i + 1) % st.length]; pk.position.set(a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f + 0.5, 0.35);
    boxes.forEach((m, k) => setPal(m, k === i ? 'blue' : (st[k].pal || 'paper'))); },
    info: () => `étape ${cur + 1}/${st.length} : ${st[cur].n}` };
}

// ------------------------------------------------------------------ cycle (boucle fermée de nœuds)
function cycle({ g, S, x0, label, ext }) {
  const N = S.nodes, R = S.R || 2.4, cy = S.cy ?? 1.6; ext.w = R * 2.7 + 3.4; ext.h = R * 2 + 2.4; ext.cy = cy;
  const pos = N.map((_, i) => { const a = Math.PI / 2 - (2 * Math.PI * i) / N.length; return V(x0 + R * 1.35 * Math.cos(a), cy + R * Math.sin(a), 0); });
  const boxes = N.map((s, i) => { const m = part(g, box(1.7, 0.7, 0.45, 0.06), { pal: s.pal || 'paper', tone: 'hi', name: s.n, pos: pos[i].toArray() }); m.userData.pal = s.pal || 'paper';
    label('t1', s.n, () => V(pos[i].x, pos[i].y + 0.62, 0.3)); return m; });
  for (let i = 0; i < N.length; i++) { const r = rod(g, { r: 0.04, pal: 'ink', name: 'Flèche' }); rodTo(r, pos[i], pos[(i + 1) % N.length]); }
  if (S.center) label('board', S.center, () => V(x0, cy, 0));
  const pk = ball(g, 'red', 'Jeton qui circule', 0.17); let cur = 0;
  return { update: t => { const u = (t * (S.speed || 0.5)) % N.length, i = Math.floor(u), f = u - i; cur = i; const a = pos[i], b = pos[(i + 1) % N.length];
    pk.position.set(a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f, 0.4); boxes.forEach((m, k) => setPal(m, k === i ? 'blue' : (N[k].pal || 'paper'))); },
    info: () => `${S.unit || 'étape'} : ${N[cur].n}` };
}

// ------------------------------------------------------------------ barres de probabilités (réglages d'échantillonnage)
function bars({ g, S, x0, label, ext }) {
  const L = S.labels, n = L.length, bw = 0.78, ox = x0 - (n * bw) / 2 + bw / 2, base = 0.4, H = 3.6; ext.w = n * bw + 1.8; ext.h = H + 1.8; ext.cy = base + H / 2;
  const bs = L.map((w, i) => { const m = sizedBox(g, { pal: 'blue', tone: 'hi', name: `Jeton « ${w} »` }); label('t1', w, () => V(ox + i * bw, base - 0.35, 0.2)); return m; });
  let info = '';
  const probs = t => {
    let z = S.logits.slice(), T = 1, keep = z.map(() => true), mark = '', samp;
    const base0 = () => softmax(z, T);
    if (S.mode === 'temp') { T = wave(t, 10, 0.12, 2.2); info = `température T = ${fr(T, 2)}`; }
    else if (S.mode === 'penalty') { const r = wave(t, 10, 1, 2); z = z.map((v, i) => (S.seen.includes(i) ? (v > 0 ? v / r : v * r) : v)); info = `pénalité de répétition = ${fr(r, 2)}`; }
    let p = base0();
    if (S.mode === 'topk') { const k = 1 + Math.round(wave(t, 10, 0, n - 1)); const idx = p.map((v, i) => i).sort((a, b) => p[b] - p[a]); keep = p.map(() => false); idx.slice(0, k).forEach(i => keep[i] = true); info = `top-k : k = ${k}`; }
    if (S.mode === 'topp') { const th = wave(t, 10, 0.25, 1); const idx = p.map((v, i) => i).sort((a, b) => p[b] - p[a]); keep = p.map(() => false); let c = 0; for (const i of idx) { keep[i] = true; c += p[i]; if (c >= th) break; } info = `top-p : p = ${fr(th, 2)}`; }
    if (S.mode === 'minp') { const mp = wave(t, 10, 0.0, 0.5), mx = Math.max(...p); keep = p.map(v => v >= mp * mx); info = `min-p = ${fr(mp, 2)} (seuil ${pct(mp * mx)})`; }
    let s = 0; p.forEach((v, i) => { if (keep[i]) s += v; });
    const q = p.map((v, i) => (keep[i] ? v / s : 0));
    const u = rnd(Math.floor(t)); let c = 0; samp = q.findIndex(v => (c += v) >= u); if (samp < 0) samp = q.indexOf(Math.max(...q));
    return { p, q, keep, samp, T };
  };
  let cur;
  return { update: t => { cur = probs(t);
    bs.forEach((m, i) => { const h = 0.04 + H * cur.q[i], kept = cur.keep[i];
      setBox(m, ox + i * bw - bw * 0.38, ox + i * bw + bw * 0.38, base, base + (kept ? h : 0.04 + H * cur.p[i] * 0.35), -0.2, 0.2);
      setPal(m, !kept ? 'dark' : i === cur.samp ? 'red' : 'blue'); }); },
    info: () => (cur ? `${info}\ntirage : « ${L[cur.samp]} » (${pct(cur.q[cur.samp])})` : '') };
}

// ------------------------------------------------------------------ courbes (perte, planning du taux d'apprentissage, lois d'échelle…)
const CURVES = {
  activ: { x: [-4, 4], y: [-1.1, 4], xl: 'entrée z', yl: 'sortie de l’activation', ser: [
    ['ReLU : max(0, z)', 'blue', x => Math.max(0, x)], ['sigmoïde', 'red', x => 1 / (1 + Math.exp(-x))], ['tanh', 'dark', x => Math.tanh(x)]] },
  normale: { x: [-4, 4], y: [0, 0.85], xl: 'valeur', yl: 'densité de probabilité', ser: [
    ['μ = 0, σ = 1', 'blue', x => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI)], ['μ = 0, σ = 0,5', 'red', x => Math.exp(-2 * x * x) / (0.5 * Math.sqrt(2 * Math.PI))], ['μ = 1, σ = 1,5', 'dark', x => Math.exp(-((x - 1) ** 2) / (2 * 2.25)) / (1.5 * Math.sqrt(2 * Math.PI))]] },
  backoff: { x: [0, 6], y: [0, 70], xl: 'numéro de la nouvelle tentative', yl: 'attente avant la tentative (s)', ser: [
    ['exponentiel : 1 s × 2ⁿ', 'red', x => Math.pow(2, x)], ['exponentiel plafonné à 30 s', 'blue', x => Math.min(30, Math.pow(2, x))], ['attente fixe : 5 s', 'dark', x => 5]] },
  batching: { x: [1, 64], y: [0, 1.05], xl: 'taille du lot (requêtes traitées ensemble)', yl: 'valeur relative (illustratif)', ser: [
    ['débit total (jetons/s)', 'blue', x => x / (x + 10) * 1.16], ['latence par jeton', 'red', x => 0.25 + 0.75 * Math.pow((x - 1) / 63, 1.6)]] },
  precrappel: { x: [0, 1], y: [0, 1.05], xl: 'seuil de décision', yl: 'score', ser: [
    ['précision', 'blue', x => 0.5 + 0.48 * Math.pow(x, 0.7)], ['rappel', 'red', x => 1 - Math.pow(x, 2.2) * 0.95], ['F1', 'dark', x => { const p = 0.5 + 0.48 * Math.pow(x, 0.7), r = 1 - Math.pow(x, 2.2) * 0.95; return 2 * p * r / (p + r); }]] },
  descente: { x: [0, 30], y: [0, 1.05], xl: 'itérations', yl: 'perte (relative)', ser: [
    ['SGD', 'dark', x => 0.12 + 0.88 * Math.exp(-0.08 * x) + 0.03 * Math.sin(3 * x)], ['SGD + momentum', 'red', x => 0.08 + 0.92 * Math.exp(-0.15 * x) * Math.abs(Math.cos(0.35 * x))], ['Adam', 'blue', x => 0.05 + 0.95 * Math.exp(-0.22 * x)]] },
  loss: { x: [0, 10], y: [0, 3.2], xl: 'étapes d’entraînement (milliers)', yl: 'perte', ser: [
    ['taux trop faible', 'dark', x => 2.9 - 0.11 * x], ['taux adapté', 'blue', x => 0.5 + 2.4 * Math.exp(-0.5 * x)], ['taux trop fort', 'red', x => x < 1.5 ? 2.9 - 0.4 * x : 2.3 + 0.18 * (x - 1.5) * (1 + 0.7 * Math.sin(5 * x))]] },
  lrsched: { x: [0, 1], y: [0, 1.1], xl: 'avancement de l’entraînement', yl: 'taux d’apprentissage (relatif)', ser: [
    ['échauffement + cosinus', 'blue', x => x < 0.05 ? x / 0.05 : 0.05 + 0.95 * 0.5 * (1 + Math.cos(Math.PI * (x - 0.05) / 0.95))], ['constant', 'dark', x => 1]] },
  scaling: { x: [0, 6], y: [1.5, 5], xl: 'calcul (échelle logarithmique)', yl: 'perte (échelle illustrative)', ser: [
    ['loi de puissance', 'blue', x => 1.7 + 3.1 * Math.pow(10, -0.28 * x)], ['plancher irréductible', 'dark', x => 1.7]] },
  overfit: { x: [0, 10], y: [0, 3], xl: 'époques', yl: 'perte', ser: [
    ['entraînement', 'blue', x => 0.2 + 2.6 * Math.exp(-0.45 * x)], ['validation', 'red', x => 0.85 + 2.0 * Math.exp(-0.7 * x) + 0.0 + 0.045 * Math.max(0, x - 4) ** 2]] },
  reward: { x: [0, 10], y: [0, 1.1], xl: 'étapes de renforcement', yl: 'récompense', ser: [
    ['récompense du juge (proxy)', 'red', x => 1 / (1 + Math.exp(-(x - 3.5) * 0.9)) * 0.98], ['qualité réelle', 'blue', x => 0.92 / (1 + Math.exp(-(x - 3.5) * 0.9)) - 0.1 * Math.pow(Math.max(0, x - 5), 1.35)]] },
  chain: { x: [0, 30], y: [0, 1.05], xl: 'nombre d’étapes enchaînées', yl: 'probabilité de tout réussir', ser: [
    ['99 % par étape', 'blue', x => Math.pow(0.99, x)], ['95 % par étape', 'red', x => Math.pow(0.95, x)], ['90 % par étape', 'dark', x => Math.pow(0.9, x)]] },
  roofline: { x: [0, 400], y: [0, 1100], xl: 'intensité arithmétique (opérations par octet lu)', yl: 'performance atteignable (TFLOPs)', ser: [
    ['H100 : 3,35 To/s, 989 TFLOPs', 'blue', x => Math.min(3.35 * x, 989)], ['A100 : 2,0 To/s, 312 TFLOPs', 'dark', x => Math.min(2.0 * x, 312)]] },
  breakeven: { x: [0, 36], y: [0, 380], xl: 'mois d’utilisation', yl: 'coût cumulé (k€, exemple illustratif)', ser: [
    ['cloud : 10 k€ par mois', 'red', x => 10 * x], ['sur site : 180 k€ + 4 k€ par mois', 'blue', x => 180 + 4 * x]] },
  biasvar: { x: [0, 10], y: [0, 4.2], xl: 'complexité du modèle', yl: 'erreur sur des données neuves', ser: [
    ['biais² (trop simple)', 'dark', x => 3.4 * Math.exp(-0.42 * x) + 0.1], ['variance (trop souple)', 'red', x => 0.05 + 0.028 * x * x * 0.55], ['erreur totale', 'blue', x => 3.4 * Math.exp(-0.42 * x) + 0.15 + 0.0154 * x * x + 0.5]] },
  doubledescent: { x: [0, 10], y: [0, 4], xl: 'nombre de paramètres (relativement aux données)', yl: 'erreur sur des données neuves', ser: [
    ['erreur de test', 'blue', x => x < 4.5 ? 3.2 - 0.38 * x + 0.1 * x * x * 0.0 + 2.2 * Math.pow(Math.max(0, x - 3) / 1.5, 4) : 0.9 + 3.1 * Math.exp(-1.25 * (x - 4.5))], ['seuil d’interpolation', 'dark', x => (Math.abs(x - 4.5) < 0.07 ? 3.9 : 0)]] },
  complexite: { x: [0, 10], y: [0, 105], xl: 'longueur de la séquence (relative)', yl: 'coût de calcul (relatif)', ser: [
    ['attention : ∝ n²', 'red', x => x * x], ['modèle à état : ∝ n', 'blue', x => 10 * x]] },
  emergence: { x: [0, 10], y: [0, 1.05], xl: 'taille du modèle (échelle logarithmique)', yl: 'score sur la tâche', ser: [
    ['mesure tout-ou-rien', 'red', x => 1 / (1 + Math.exp(-(x - 6.5) * 2.4))], ['mesure continue', 'blue', x => 0.08 + 0.85 / (1 + Math.exp(-(x - 5) * 0.55))]] },
  testtime: { x: [0, 10], y: [0, 1.05], xl: 'calcul à l’inférence (échelle logarithmique)', yl: 'taux de réussite', ser: [
    ['modèle de raisonnement', 'blue', x => 0.28 + 0.62 * (1 - Math.exp(-0.28 * x))], ['réponse directe', 'dark', x => 0.3 + 0.0 * x]] },
  saturation: { x: [0, 10], y: [0, 1.05], xl: 'années (exemple illustratif)', yl: 'score sur le banc d’essai', ser: [
    ['banc d’essai ancien', 'dark', x => 0.97 / (1 + Math.exp(-(x - 2.2) * 1.4))], ['banc d’essai récent', 'blue', x => 0.97 / (1 + Math.exp(-(x - 5.2) * 1.1))], ['banc d’essai très difficile', 'red', x => 0.08 + 0.8 / (1 + Math.exp(-(x - 8.5) * 0.9))]] },
  elasticite: { x: [0, 80], y: [0, 170], xl: 'baisse du prix (en %, petites variations)', yl: 'hausse de la quantité demandée (en %)', ser: [
    ['inélastique : ε = 0,5', 'dark', x => 0.5 * x], ['unitaire : ε = 1', 'blue', x => x], ['élastique : ε = 2', 'red', x => 2 * x]] },
  atrophie: { x: [0, 10], y: [0, 1.05], xl: 'mois d’usage (exemple illustratif)', yl: 'niveau (relatif)', ser: [
    ['performance avec l’IA', 'blue', x => 0.45 + 0.5 * (1 - Math.exp(-0.5 * x))], ['sans l’IA : usage passif', 'red', x => 0.2 + 0.4 * Math.exp(-0.3 * x)], ['sans l’IA : usage actif', 'dark', x => 0.6 + 0.2 * (1 - Math.exp(-0.25 * x))]] },
  emploi: { x: [1, 5], y: [0, 2.6], xl: 'multiplicateur de productivité du développement', yl: 'emploi de développeurs (relatif)', ser: [
    ['demande peu élastique : ε = 0,5', 'red', x => Math.pow(x, -0.5)], ['ε = 1 : emploi stable', 'dark', x => 1], ['demande élastique : ε = 1,25', 'blue', x => Math.pow(x, 0.25)]] },
  amdahl: { x: [1, 10], y: [0, 10], xl: 'accélération de la partie automatisable', yl: 'accélération du travail complet', ser: [
    ['30 % du travail automatisable', 'red', x => 1 / (0.7 + 0.3 / x)], ['60 %', 'dark', x => 1 / (0.4 + 0.6 / x)], ['90 %', 'blue', x => 1 / (0.1 + 0.9 / x)]] },
  qualitebits: { x: [2, 8], y: [0, 1.05], xl: 'bits par poids (après quantification)', yl: 'perte de qualité (relative, illustratif)', ser: [
    ['petit modèle (≈ 8 Md)', 'red', x => 1 / (1 + Math.exp((x - 3.3) * 2.3))], ['grand modèle (≈ 70 Md)', 'blue', x => 1 / (1 + Math.exp((x - 2.7) * 2.3))]] },
  bisection: { x: [0, 10], y: [0, 1000], xl: 'nombre de tests (exemple illustratif)', yl: 'causes possibles restantes', ser: [
    ['méthode de la moitié', 'blue', x => 1000 / Math.pow(2, x)], ['un suspect à la fois', 'red', x => Math.max(0, 1000 - 100 * x)]] },
  passk: { x: [1, 16], y: [0, 1.05], xl: 'nombre d’essais k', yl: 'taux de réussite (pass@k)', ser: [
    ['p = 0,15 par essai', 'blue', x => 1 - Math.pow(0.85, x)], ['p = 0,05 par essai', 'dark', x => 1 - Math.pow(0.95, x)], ['p = 0,4 par essai', 'red', x => 1 - Math.pow(0.6, x)]] },
};
function curve({ g, S, x0, label, ext }) {
  const C = CURVES[S.fn], W = 7, H = 3.4; ext.w = W + 7.6; ext.h = H + 2.2; ext.cy = 0.5 + H / 2; ext.cx = 2.2;
  const X = x => x0 - W / 2 + (x - C.x[0]) / (C.x[1] - C.x[0]) * W, Y = y => 0.5 + (y - C.y[0]) / (C.y[1] - C.y[0]) * H;
  board2d(g, label, { x0: C.x[0], x1: C.x[1], y0: C.y[0], y1: C.y[1], X, Y, axes: false, name: 'Graphique' });
  lines(g, [X(C.x[0]), Y(C.y[0]), 0.02, X(C.x[1]), Y(C.y[0]), 0.02, X(C.x[0]), Y(C.y[0]), 0.02, X(C.x[0]), Y(C.y[1]), 0.02], '#57575a');
  label('mark', C.xl, () => V(x0, 0.05, 0)); label('mark', C.yl, () => V(x0 - W / 2 + 1.4, 0.5 + H + 0.4, 0));
  const dots = C.ser.map(([name, pal, f], i) => { plotTube(g, f, X, Y, C.x[0], C.x[1], { pal, r: 0.05, name, z: 0.12 }); label('lgl ' + (pal === 'blue' ? 'blue' : pal === 'red' ? 'red' : 'grey'), name, () => V(x0 + W / 2 + 0.35, 0.5 + H - 0.2 - i * 0.5, 0.2)); return ball(g, pal, name, 0.1); });
  const cur = rod(g, { r: 0.015, pal: 'ink', name: 'Curseur' }); let xc = C.x[0];
  return { update: t => { const u = wave(t, 9, 0, 1); xc = C.x[0] + (C.x[1] - C.x[0]) * u; rodTo(cur, V(X(xc), Y(C.y[0]), 0.12), V(X(xc), Y(C.y[1]), 0.12));
    dots.forEach((m, i) => m.position.set(X(xc), Y(C.ser[i][2](xc)), 0.14)); },
    info: () => `${C.xl.split(' (')[0]} = ${fr(xc, 1)}\n${C.ser.map(s => `${s[0]} : ${fr(s[2](xc), 2)}`).join('\n')}` };
}

// ------------------------------------------------------------------ mémoire GPU (barres empilées)
function mem({ g, S, x0, label, ext }) {
  const C = S.configs, n = C.length, bw = 1.3, gap = 0.75, sc = S.scale || 0.04, ox = x0 - ((n - 1) * (bw + gap)) / 2, base = 0.5;
  ext.w = n * (bw + gap) + 3.5; ext.h = (S.limit || 80) * sc + 2.2; ext.cy = ((S.limit || 80) * sc + 0.8) / 2;
  const parts = [];
  C.forEach((c, i) => { let y = base; const tot = c.segs.reduce((a, s) => a + s[1], 0);
    let cum = 0; c.segs.forEach(s => { const m = sizedBox(g, { pal: s[2] || 'blue', tone: 'hi', name: `${s[0]} : ${s[1]} ${S.unit || 'Go'}` }); parts.push([m, i, cum, s]); cum += s[1]; y += s[1] * sc; });
    label('t1', c.n, () => V(ox + i * (bw + gap), base - 0.36, 0.3)); label('mark', `${fr(tot, tot < 10 ? 1 : 0)} ${S.unit || 'Go'}`, () => V(ox + i * (bw + gap), y + 0.28, 0.3)); });
  const lim = base + (S.limit || 80) * sc; lines(g, [x0 - (n * (bw + gap)) / 2, lim, 0.1, x0 + (n * (bw + gap)) / 2, lim, 0.1], '#e5484d');
  label('vec red', S.limitLabel || 'GPU 80 Go', () => V(x0 + (n * (bw + gap)) / 2 - 1.4, lim + 0.45, 0));
  return { update: t => { const r = Math.min(1, (t % 12) / 1); parts.forEach(([m, i, cum, s]) => { const x = ox + i * (bw + gap), y = base + cum * sc * r; setBox(m, x - bw / 2, x + bw / 2, y, y + Math.max(0.001, s[1] * sc * r), -0.35, 0.35); }); },
    info: () => S.info || '' };
}

// ------------------------------------------------------------------ convolution : image, noyau qui glisse, carte de caractéristiques
const KERNELS = { contours: [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]], flou: [[1, 1, 1], [1, 1, 1], [1, 1, 1]].map(r => r.map(v => v / 9)), vertical: [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]] };
function conv({ g, S, x0, label, ext }) {
  ext.w = 11; ext.h = 6; ext.cy = 2.4; ext.cx = 0;
  const img = S.img.map(r => [...r].map(c => (c === '#' ? 1 : c === '+' ? 0.5 : 0))), n = img.length, k = KERNELS[S.kernel], m = n - 2, cs = 0.5;
  const out = Array.from({ length: m }, (_, i) => Array.from({ length: m }, (_, j) => { let s = 0; for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) s += img[i + a][j + b] * k[a][b]; return Math.max(0, s); }));
  const mx = Math.max(...out.flat(), 1e-6), ix = x0 - 4.3, ox = x0 + 1.4, oy = 4.3;
  const inC = [], outC = [];
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const c = sizedBox(g, { pal: img[i][j] > 0.7 ? 'ink' : img[i][j] > 0.2 ? 'dark' : 'paper', tone: 'mid', name: `Pixel (${i},${j})` }); setBox(c, ix + j * cs, ix + (j + 0.9) * cs, oy - (i + 0.9) * cs, oy - i * cs, 0, 0.12 + 0.15 * img[i][j]); inC.push(c); }
  for (let i = 0; i < m; i++) for (let j = 0; j < m; j++) { const c = sizedBox(g, { pal: 'paper', tone: 'mid', name: `Activation (${i},${j})` }); outC.push([c, i, j]); }
  label('board', 'image', () => V(ix + n * cs / 2, oy + 0.45, 0)); label('board', `carte « ${S.kernel} »`, () => V(ox, oy + 0.45, 0));
  const frame = part(g, box(3 * cs, 3 * cs, 0.5, 0.03), { pal: 'red', tone: 'mid', name: 'Noyau 3 × 3', mat: shadeMat('red', { opacity: 0.45 }) });
  let cur = 0;
  return { update: t => { cur = Math.floor(t * 4) % (m * m + 6); const c = Math.min(cur, m * m - 1), ci = Math.floor(c / m), cj = c % m;
    frame.position.set(ix + (cj + 1.45) * cs, oy - (ci + 1.45) * cs, 0.3);
    outC.forEach(([cell, i, j]) => { const idx = i * m + j, show = idx <= cur, v = show ? out[i][j] / mx : 0; setBox(cell, ox + j * cs * 1.0, ox + (j + 0.9) * cs, oy - (i + 0.9) * cs, oy - i * cs, 0, 0.05 + 0.9 * v); setPal(cell, show ? heat(v) : 'paper'); }); },
    info: () => { const c = Math.min(cur, m * m - 1); return `noyau « ${S.kernel} »\nposition (${Math.floor(c / m)}, ${c % m}) → ${fr(out[Math.floor(c / m)][c % m], 1)}`; } };
}

// ------------------------------------------------------------------ découpage en patchs (ViT)
function patches({ g, S, x0, label, ext }) {
  ext.w = 10; ext.h = 7.6; ext.cy = 2.5;
  const img = S.img.map(r => [...r].map(c => (c === '#' ? 1 : c === '+' ? 0.5 : 0))), n = img.length, p = S.patch || 2, np = n / p, cs = 0.5, ix = x0 - (n * cs) / 2, oy = 5.2;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const c = sizedBox(g, { pal: img[i][j] > 0.7 ? 'ink' : img[i][j] > 0.2 ? 'dark' : 'paper', tone: 'mid', name: `Pixel (${i},${j})` }); setBox(c, ix + j * cs, ix + (j + 0.92) * cs, oy - (i + 0.92) * cs, oy - i * cs, 0, 0.1); }
  const L = []; for (let a = 0; a <= np; a++) { L.push(ix + a * p * cs, oy, 0.2, ix + a * p * cs, oy - n * cs, 0.2, ix, oy - a * p * cs, 0.2, ix + n * cs, oy - a * p * cs, 0.2); } lines(g, L, '#e5484d');
  const T = np * np, tw = Math.min(0.62, 6.4 / T), tx = x0 - (T * tw) / 2 + tw / 2, ty = 0.0, tk = [];
  for (let i = 0; i < T; i++) { const m = part(g, box(tw * 0.85, 0.6, 0.3, 0.03), { pal: 'paper', tone: 'hi', name: `Jeton-patch ${i + 1}`, pos: [tx + i * tw, ty, 0] }); m.userData.pal = 'paper'; tk.push(m); }
  label('board', `${np} × ${np} patchs de ${p} × ${p} pixels`, () => V(x0, oy + 0.5, 0)); label('board', `${T} jetons envoyés au transformeur`, () => V(x0, ty - 0.7, 0));
  const hl = part(g, box(p * cs, p * cs, 0.3, 0.03), { pal: 'blue', tone: 'mid', name: 'Patch courant', mat: shadeMat('blue', { opacity: 0.5 }) }); let cur = 0;
  return { update: t => { cur = Math.floor(t * 1.5) % T; const pi = Math.floor(cur / np), pj = cur % np; hl.position.set(ix + (pj + 0.5) * p * cs, oy - (pi + 0.5) * p * cs, 0.25); tk.forEach((m, i) => setPal(m, i === cur ? 'blue' : 'paper')); },
    info: () => `patch ${cur + 1}/${T} → un vecteur de ${S.dim || 768} nombres` };
}

// ------------------------------------------------------------------ détection : cadres, étiquettes et scores
function detect({ g, S, x0, label, ext }) {
  ext.w = 9; ext.h = 5.8; ext.cy = 2.6;
  const W = 7, H = 4.2, bx = x0 - W / 2, by = 0.5;
  part(g, box(W, H, 0.12, 0.05), { pal: 'board', tone: 'lo', name: 'Image', pos: [x0, by + H / 2, -0.1] });
  for (const o of S.objects) { const x1 = bx + o.x * W, y1 = by + (1 - o.y) * H, w = o.w * W, h = o.h * H;
    part(g, box(w * 0.7, h * 0.7, 0.1, 0.08), { pal: o.pal || 'dark', tone: 'mid', name: o.n, pos: [x1 + w / 2, y1 - h / 2, 0] }); }
  const rects = S.objects.map(o => { const x1 = bx + o.x * W, y1 = by + (1 - o.y) * H, w = o.w * W, h = o.h * H; return [x1, y1 - h, x1 + w, y1]; });
  const L = []; rects.forEach(([a, b, c, d]) => L.push(a, b, 0.2, c, b, 0.2, c, b, 0.2, c, d, 0.2, c, d, 0.2, a, d, 0.2, a, d, 0.2, a, b, 0.2)); lines(g, L, '#e5484d');
  S.objects.forEach((o, i) => label('vec red', `${o.n} ${fr(o.score, 2)}`, () => V(rects[i][0] + 0.7, rects[i][3] + 0.25, 0.3)));
  const hl = part(g, box(0.4, 0.4, 0.2, 0.03), { pal: 'blue', tone: 'mid', name: 'Fenêtre de recherche', mat: shadeMat('blue', { opacity: 0.55 }) });
  return { update: t => { const u = (t * 0.35) % 1; hl.position.set(bx + 0.3 + u * (W - 0.6), by + 0.4 + 0.5 * Math.sin(u * 20) + 1.4, 0.4); }, info: () => S.info || '' };
}

// ------------------------------------------------------------------ monde en grille (agent, chemins réels et imaginés)
function grid({ g, S, x0, label, ext }) {
  const R = S.rows, C = S.cols, cs = 0.85, ox = x0 - (C * cs) / 2 + cs / 2, oy = 0.5 + (R - 1) * cs; ext.w = C * cs + 2.5; ext.h = R * cs + 2; ext.cy = 0.5 + (R - 1) * cs / 2;
  const at = (r, c) => V(ox + c * cs, oy - r * cs, 0);
  const has = (L, r, c) => (L || []).some(([a, b]) => a === r && b === c);
  for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
    const wall = has(S.walls, r, c), goal = S.goal[0] === r && S.goal[1] === c, trap = has(S.traps, r, c);
    const m = part(g, box(cs * 0.92, cs * 0.92, wall ? 0.5 : 0.14, 0.03), { pal: wall ? 'ink' : goal ? 'red' : trap ? 'dark' : 'paper', tone: 'mid', name: wall ? 'Mur' : goal ? 'But (+1)' : trap ? 'Piège (−1)' : 'Case', pos: [at(r, c).x, at(r, c).y, wall ? 0.15 : 0] }); m.userData.pal = null;
  }
  if (S.goal) label('vec red', S.goalLabel || '+1', () => at(S.goal[0], S.goal[1]).add(V(0, 0.55, 0.3)));
  (S.traps || []).forEach(([r, c]) => label('tick', '−1', () => at(r, c).add(V(0, 0.45, 0.3))));
  const paths = S.paths.map(p => p.cells), dots = [];
  S.paths.forEach(p => { if (p.ghost) p.cells.forEach(([r, c], i) => { const b = ball(g, p.pal || 'blue', 'Étape imaginée', 0.07); b.position.copy(at(r, c)).add(V(0, 0, 0.2)); dots.push([b, p]); }); });
  const ag = ball(g, 'red', 'Agent', 0.22); let cur = 0, pi = 0;
  return { update: t => { const P = S.paths.filter(p => !p.ghost), per = Math.max(...P.map(p => p.cells.length)), T = per + 2, u = (t * 1.4) % (T * P.length); pi = Math.floor(u / T); const k = Math.min(P[pi].cells.length - 1, Math.floor(u % T)); const cell = P[pi].cells[k]; cur = k;
    ag.position.copy(at(cell[0], cell[1])).add(V(0, 0, 0.3)); dots.forEach(([b, p]) => { b.visible = S.showGhost !== false; }); },
    info: () => (S.paths.filter(p => !p.ghost)[pi] || {}).info || S.info || `pas ${cur}` };
}

// ------------------------------------------------------------------ bras robotique à deux segments
function arm({ g, S, x0, label, ext }) {
  ext.w = 9; ext.h = 5.2; ext.cy = 2.2; ext.cx = 0.8;
  const L1 = 1.7, L2 = 1.4, base = V(x0 - 1.4, 0.7, 0);
  part(g, box(1.2, 0.7, 0.8, 0.05), { pal: 'dark', tone: 'mid', name: 'Socle', pos: [base.x, 0.35, 0] });
  const s1 = rod(g, { r: 0.12, pal: 'blue', name: 'Segment 1' }), s2 = rod(g, { r: 0.1, pal: 'blue', name: 'Segment 2' });
  const j1 = ball(g, 'ink', 'Articulation 1', 0.2), j2 = ball(g, 'ink', 'Articulation 2', 0.17), gr = part(g, box(0.34, 0.2, 0.3, 0.03), { pal: 'red', tone: 'hi', name: 'Pince' });
  const tg = ball(g, 'red', S.targetName || 'Objet à saisir', 0.2), table = part(g, box(3.4, 0.2, 1.2, 0.04), { pal: 'paper', tone: 'lo', name: 'Table', pos: [x0 + 2.2, 0.4, 0] });
  const cam = part(g, box(0.55, 0.4, 0.4, 0.05), { pal: 'ink', tone: 'mid', name: 'Caméra', pos: [x0 + 0.4, 3.9, 0.4] });
  const beam = rod(g, { r: 0.015, pal: 'blue', name: 'Ligne de visée' }); label('tick', 'caméra', () => V(x0 + 0.4, 4.3, 0.4)); label('tick', S.targetLabel || 'objet', () => tg.position.clone().add(V(0, 0.45, 0)));
  let ang = [0, 0], tgp = V();
  return { update: t => { const ph = (t * 0.22) % 1, tx = x0 + 0.9 + 2.0 * (0.5 + 0.5 * Math.sin(ph * 2 * Math.PI)), ty = 0.9 + 0.9 * (0.5 - 0.5 * Math.cos(ph * 4 * Math.PI)) + 0.2;
    tgp.set(tx, ty, 0); const dx = tx - base.x, dy = ty - base.y, d = Math.min(Math.hypot(dx, dy), L1 + L2 - 0.01), c2 = (d * d - L1 * L1 - L2 * L2) / (2 * L1 * L2), a2 = -Math.acos(Math.max(-1, Math.min(1, c2))), a1 = Math.atan2(dy, dx) - Math.atan2(L2 * Math.sin(a2), L1 + L2 * Math.cos(a2));
    const e = V(base.x + L1 * Math.cos(a1), base.y + L1 * Math.sin(a1), 0), h = V(e.x + L2 * Math.cos(a1 + a2), e.y + L2 * Math.sin(a1 + a2), 0); ang = [a1, a1 + a2];
    rodTo(s1, base, e); rodTo(s2, e, h); j1.position.copy(base); j2.position.copy(e); gr.position.copy(h); gr.rotation.z = a1 + a2; tg.position.copy(tgp);
    rodTo(beam, V(x0 + 0.4, 3.7, 0.4), V(tgp.x, tgp.y, 0.2)); },
    info: () => `θ₁ = ${fr(ang[0] * 180 / Math.PI, 0)}°   θ₂ = ${fr((ang[1] - ang[0]) * 180 / Math.PI, 0)}°` };
}

// ------------------------------------------------------------------ cache clé-valeur : une génération pas à pas
function kv({ g, S, x0, label, ext }) {
  const T = S.tokens, n = T.length, w = 1.15; ext.w = n * w + 3; ext.h = 5.4; ext.cy = 2.6;
  const _u = 0, ww = 0.95, ox = x0 - (n * w) / 2 + w / 2, y0 = 0.5;
  const toks = T.map((s, i) => { const m = part(g, box(w * 0.82, 0.5, 0.4, 0.05), { pal: 'paper', tone: 'hi', name: `Jeton « ${s} »`, pos: [ox + i * w, y0 + 3.55, 0] }); m.userData.pal = 'paper'; label('tick', s, () => V(ox + i * w, y0 + 4.05, 0.2)); return m; });
  const ks = T.map((s, i) => sizedBox(g, { pal: 'blue', tone: 'hi', name: `Clés K du jeton « ${s} » (en cache)` })), vs = T.map((s, i) => sizedBox(g, { pal: 'red', tone: 'hi', name: `Valeurs V du jeton « ${s} » (en cache)` }));
  label('mark', 'clés K', () => V(ox - w * 0.9, y0 + 1.55, 0)); label('mark', 'valeurs V', () => V(ox - w * 0.9, y0 + 0.65, 0));
  const rods = T.map(() => rod(g, { r: 0.012, pal: 'ink', name: 'Lecture du cache' })); let st = 0;
  return { update: t => { st = Math.floor(t * 0.8) % (n + 2); const cur = Math.min(st, n - 1);
    T.forEach((s, i) => { const on = i <= cur, x = ox + i * w; setBox(ks[i], x - w * 0.34, x + w * 0.34, y0 + 1.2, y0 + 1.9, -0.2, 0.2); setBox(vs[i], x - w * 0.34, x + w * 0.34, y0 + 0.3, y0 + 1.0, -0.2, 0.2); ks[i].visible = on; vs[i].visible = on;
      setPal(toks[i], i === cur ? 'red' : i < cur ? 'blue' : 'paper'); rods[i].visible = on && i < cur; if (on && i < cur) rodTo(rods[i], V(ox + cur * w, y0 + 3.3, 0), V(x, y0 + 1.95, 0)); }); },
    info: () => { const c = Math.min(st, n - 1); return `génération du jeton ${c + 1}/${n}\nrecalculé : 1 jeton · relu en cache : ${c}`; } };
}


// ------------------------------------------------------------------ réseau de neurones : couches de nœuds reliés
function net({ g, S, x0, label, ext }) {
  const L = S.layers, dx = 2.3, dy = 0.78, mx = Math.max(...L), cy = 2.2; ext.w = (L.length - 1) * dx + 4; ext.h = mx * dy + 2.6; ext.cy = cy;
  const P = L.map((n, i) => Array.from({ length: n }, (_, j) => V(x0 + (i - (L.length - 1) / 2) * dx, cy + (j - (n - 1) / 2) * dy, 0)));
  const C = []; for (let i = 0; i < L.length - 1; i++) for (const a of P[i]) for (const b of P[i + 1]) C.push(a.x, a.y, 0, b.x, b.y, 0); lines(g, C, '#b4b4b8');
  const nodes = P.map((col, i) => col.map((p, j) => { const m = ball(g, 'paper', `Neurone ${i + 1}.${j + 1}`, 0.17); m.position.copy(p); m.userData.pal = 'paper'; return m; }));
  (S.names || []).forEach((n, i) => label('t1', n, () => V(P[i][0].x, cy - (mx * dy) / 2 - 0.5, 0)));
  let cur = 0;
  return { update: t => { cur = Math.floor(t * 1.1) % L.length; nodes.forEach((col, i) => col.forEach((m, j) => setPal(m, i === cur ? (rnd(i * 7 + j + Math.floor(t * 1.1) * 3) > 0.4 ? 'red' : 'blue') : 'paper'))); },
    info: () => `couche ${cur + 1}/${L.length} : ${L[cur]} neurones actifs\n${S.params || ''}` };
}

// ------------------------------------------------------------------ cartes de caractéristiques d'un réseau convolutif (à la TensorSpace)
function fmaps({ g, S, x0, label, ext }) {
  const Ls = S.layers, sc = 0.085, gapx = 1.25; const widths = Ls.map(l => 0.2 + (l.depth || 1) * 0.16); const wsum = widths.reduce((a, b) => a + b, 0) + gapx * (Ls.length - 1);
  ext.w = wsum + 3; ext.h = 6.2; ext.cy = 2.5; let x = x0 - wsum / 2; const L = [];
  Ls.forEach((l, i) => {
    const plates = [], d = l.depth || 1, h = l.vec ? Math.min(4.2, 0.2 + l.vec * 0.025) : l.size * sc, w = l.vec ? 0.35 : l.size * sc, xx = x;
    for (let k = 0; k < d; k++) { const m = part(g, box(w, h, 0.05, 0.01), { pal: 'paper', tone: 'mid', name: `${l.n} : carte ${k + 1}`, pos: [xx + k * 0.16 + 0.1, 1.6 + h / 2 - 0.4, 0] }); m.userData.pal = 'paper'; plates.push(m); }
    label('t1', l.n, () => V(xx + widths[i] / 2, 0.45, 0)); label('t2', l.dim, () => V(xx + widths[i] / 2, 0.1, 0)); L.push(plates); x += widths[i] + gapx; });
  let cur = 0;
  return { update: t => { cur = Math.floor(t * 0.9) % Ls.length; L.forEach((pl, i) => pl.forEach(m => setPal(m, i === cur ? 'blue' : i < cur ? 'dark' : 'paper'))); }, info: () => `${Ls[cur].n} : ${Ls[cur].dim}` };
}

// ------------------------------------------------------------------ bloc de nombres : jetons × dimensions × couches
function tensor({ g, S, x0, label, ext }) {
  const nT = S.tokens || 6, nD = S.dims || 6, nL = S.depth || 5, cs = 0.5; ext.w = nT * cs + 5; ext.h = nD * cs + 3; ext.cy = 0.7 + nD * cs / 2;
  const cells = []; const ox = x0 - (nT * cs) / 2, oy = 0.7, oz = -(nL * cs) / 2;
  for (let l = 0; l < nL; l++) for (let d = 0; d < nD; d++) for (let t = 0; t < nT; t++) { const m = part(g, box(cs * 0.82, cs * 0.82, cs * 0.82, 0.03), { pal: 'paper', tone: 'faint', name: `Valeur (jeton ${t + 1}, dimension ${d + 1}, couche ${l + 1})`, pos: [ox + t * cs, oy + d * cs, oz + l * cs] }); m.userData.pal = 'paper'; cells.push([m, l, d, t]); }
  label('mark', 'jetons →', () => V(x0 + nT * cs / 2 + 0.2, oy - 0.7, oz + nL * cs + 0.2)); label('mark', 'dimensions ↑', () => V(ox - 1.7, oy + nD * cs / 2, oz)); label('mark', 'couches ↗', () => V(ox + nT * cs + 0.9, oy - 0.1, 0));
  let cur = 0;
  return { update: t => { cur = Math.floor(t * 0.8) % nL; for (const [m, l, d, tk] of cells) setPal(m, l === cur ? (rnd(l * 97 + d * 13 + tk) > 0.5 ? 'blue' : 'red') : 'paper'); }, info: () => `couche ${cur + 1}/${nL} : ${nT} × ${nD} nombres` };
}

// ------------------------------------------------------------------ paysage de la perte : la descente de gradient en 3D
function landscape({ g, S, x0, label, ext }) {
  ext.w = 11; ext.h = 8; ext.cy = 2.2; const R = 4;
  const f = (x, z) => 0.12 * (x * x + 2.2 * z * z) + 0.13 * Math.sin(2.2 * x) * Math.cos(2 * z);
  const geo = new THREE.PlaneGeometry(2 * R, 2 * R, 48, 48); geo.rotateX(-Math.PI / 2); const pa = geo.attributes.position;
  for (let i = 0; i < pa.count; i++) pa.setY(i, f(pa.getX(i), pa.getZ(i))); geo.computeVertexNormals();
  const surf = part(g, geo, { pal: 'base', tone: 'lo', name: 'Paysage de la perte', pos: [x0, 0, 0] }); surf.userData.noEdge = true;
  const grad = (x, z) => [(f(x + 1e-3, z) - f(x - 1e-3, z)) / 2e-3, (f(x, z + 1e-3) - f(x, z - 1e-3)) / 2e-3];
  const runs = [['taux trop faible', 'dark', 0.02], ['taux adapté', 'blue', 0.22], ['taux trop fort', 'red', 0.78]].map(([n, pal, lr]) => { let p = [3.3, 2.4]; const tr = [p.slice()]; for (let k = 0; k < 80; k++) { const gr = grad(p[0], p[1]); p = [Math.max(-R, Math.min(R, p[0] - lr * gr[0])), Math.max(-R, Math.min(R, p[1] - lr * gr[1]))]; tr.push(p.slice()); } return { n, pal, lr, tr, b: ball(g, pal, n, 0.17) }; });
  runs.forEach((r, i) => label('lgl ' + (r.pal === 'blue' ? 'blue' : r.pal === 'red' ? 'red' : 'grey'), `${r.n} (${fr(r.lr, 2)})`, () => V(x0 - 5.4, 5.2 - i * 0.55, 0)));
  let k = 0;
  return { update: t => { k = Math.floor((t * 5) % 90); runs.forEach(r => { const q = r.tr[Math.min(k, r.tr.length - 1)]; r.b.position.set(x0 + q[0], f(q[0], q[1]) + 0.2, q[1]); }); },
    info: () => { const e = runs.map(r => { const q = r.tr[Math.min(k, 80)]; return `${r.n} : perte ${fr(f(q[0], q[1]), 2)}`; }); return `étape ${k}\n${e.join('\n')}`; } };
}

// ------------------------------------------------------------------ nuage de gaussiennes qui converge vers une forme (3DGS)
function cloud({ g, S, x0, label, ext }) {
  ext.w = 8; ext.h = 6; ext.cy = 2.4; const N = S.n || 320, grp = new THREE.Group(); g.add(grp); grp.position.set(x0, 2.4, 0);
  const tgt = [], ini = [];
  for (let i = 0; i < N; i++) { const u = rnd(i * 3.1) * 2 * Math.PI, v = rnd(i * 5.7 + 1) * 2 * Math.PI, R = 1.8, r = 0.75;
    tgt.push([(R + r * Math.cos(v)) * Math.cos(u), r * Math.sin(v) * 1.2, (R + r * Math.cos(v)) * Math.sin(u)]); ini.push([(rnd(i * 1.7 + 4) - 0.5) * 7, (rnd(i * 2.3 + 9) - 0.5) * 5, (rnd(i * 4.1 + 2) - 0.5) * 7]); }
  const mk = pal => { const m = new THREE.InstancedMesh(new THREE.SphereGeometry(0.11, 10, 8), shadeMat(pal), N); m.userData.noEdge = true; m.frustumCulled = false; grp.add(m); return m; };
  const A = mk('blue'), B = mk('red'); const D = new THREE.Object3D(); let u = 0;
  label('mark', 'chaque point est une gaussienne 3D (position, taille, couleur)', () => V(x0, -0.6, 0));
  return { update: t => { const c = (t % 12) / 12; u = c < 0.55 ? 1 - Math.pow(1 - c / 0.55, 3) : 1; grp.rotation.y = t * 0.35;
    for (let i = 0; i < N; i++) { const a = ini[i], b = tgt[i]; D.position.set(a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u); const sc = 0.7 + 0.5 * u; D.scale.set(sc, sc, sc); D.updateMatrix(); (i % 5 === 0 ? B : A).setMatrixAt(i, D.matrix); }
    A.instanceMatrix.needsUpdate = true; B.instanceMatrix.needsUpdate = true; },
    info: () => `optimisation : ${fr(100 * u, 0)} %\nles points s’ajustent pour reproduire les photos` };
}

// ------------------------------------------------------------------ barres à échelle logarithmique (débits, puissances)
function logbars({ g, S, x0, label, ext }) {
  const it = S.items, n = it.length, bw = 1.15, ox = x0 - (n * bw) / 2 + bw / 2, base = 0.6, H = 3.9, lo = Math.log10(S.min ?? Math.min(...it.map(i => i.v)) / 3), hi = Math.log10(Math.max(...it.map(i => i.v)) * 1.25);
  ext.w = n * bw + 2.6; ext.h = H + 2.6; ext.cy = base + H / 2;
  const bs = it.map((e, i) => { const m = sizedBox(g, { pal: e.pal || 'blue', tone: 'hi', name: `${e.n} : ${e.v} ${S.unit}` }); label('t1', e.n, () => V(ox + i * bw, base - 0.38, 0.2)); label('mark', `${e.v >= 1000 ? e.v.toLocaleString('fr-FR') : fr(e.v, e.v < 10 ? 1 : 0)} ${S.unit}`, () => V(ox + i * bw, base + 0.3 + H * (Math.log10(e.v) - lo) / (hi - lo), 0.2)); return m; });
  label('mark', S.axis || 'échelle logarithmique', () => V(x0, base + H + 0.9, 0));
  return { update: t => { const r = Math.min(1, (t % 14) / 1.4); bs.forEach((m, i) => { const h = Math.max(0.04, H * (Math.log10(it[i].v) - lo) / (hi - lo) * r); setBox(m, ox + i * bw - bw * 0.36, ox + i * bw + bw * 0.36, base, base + h, -0.25, 0.25); }); }, info: () => S.info || '' };
}

// ------------------------------------------------------------------ puce GPU : unités de calcul et mémoire haute bande passante
function chip({ g, S, x0, label, ext }) {
  ext.w = 11; ext.h = 6; ext.cy = 2.4;
  part(g, box(6.4, 4.4, 0.3, 0.08), { pal: 'dark', tone: 'mid', name: 'Puce (silicium)', pos: [x0, 2.4, -0.1] });
  const sms = []; const cols = 8, rows = 5;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const m = part(g, box(0.58, 0.58, 0.18, 0.03), { pal: 'paper', tone: 'hi', name: `Multiprocesseur de flux (SM) ${r * cols + c + 1}`, pos: [x0 - 2.6 + c * 0.74, 3.95 - r * 0.78, 0.15] }); m.userData.pal = 'paper'; sms.push([m, r, c]); }
  const hbm = []; [[-4.2, 3.4], [-4.2, 1.4], [4.2, 3.4], [4.2, 1.4]].forEach(([dx, y], i) => hbm.push(part(g, box(1.05, 1.7, 0.6, 0.05), { pal: 'red', tone: 'hi', name: `Pile de mémoire HBM ${i + 1}`, pos: [x0 + dx, y, 0] })));
  label('t1', 'unités de calcul (SM)', () => V(x0, 5.1, 0.3)); label('t1', 'HBM', () => V(x0 - 4.2, 4.5, 0.3)); label('t1', 'HBM', () => V(x0 + 4.2, 4.5, 0.3)); label('mark', 'mémoire : 3 350 Go/s (H100)', () => V(x0, 0.0, 0)); label('mark', 'cœurs tenseur dans chaque SM', () => V(x0, 0.5, 0));
  let act = 0;
  return { update: t => { const w = (t * 2.2) % (cols + rows + 4); act = 0; sms.forEach(([m, r, c]) => { const on = Math.abs((r + c) - w) < 1.6; if (on) act++; setPal(m, on ? 'blue' : 'paper'); }); hbm.forEach((m, i) => setPal(m, Math.floor(t * 1.5) % 4 === i ? 'blue' : 'red')); },
    info: () => `SM actifs : ${act}/${cols * rows}\nles données arrivent par la HBM` };
}

// ------------------------------------------------------------------ cluster : nœuds de 8 GPU reliés par un réseau
function cluster({ g, S, x0, label, ext }) {
  const N = S.nodes || 4, gp = S.gpus || 8, nw = 2.9, gap = 0.7, ox = x0 - ((N - 1) * (nw + gap)) / 2; ext.w = N * (nw + gap) + 2; ext.h = 7; ext.cy = 2.6;
  part(g, box(5.2, 0.8, 0.5, 0.06), { pal: 'red', tone: 'hi', name: 'Commutateur réseau', pos: [x0, 5.1, 0] }); label('t1', S.switchName || 'Réseau InfiniBand', () => V(x0, 5.75, 0.3));
  const nodes = [];
  for (let n = 0; n < N; n++) { const cx = ox + n * (nw + gap); part(g, box(nw, 2.0, 0.5, 0.06), { pal: 'base', tone: 'mid', name: `Serveur ${n + 1}`, pos: [cx, 1.5, 0] }); label('t1', `Nœud ${n + 1}`, () => V(cx, 0.15, 0.3));
    const gs = []; for (let k = 0; k < gp; k++) { const m = part(g, box(0.5, 0.58, 0.36, 0.03), { pal: 'paper', tone: 'hi', name: `GPU ${k + 1} du nœud ${n + 1}`, pos: [cx - 1.05 + (k % 4) * 0.7, 1.85 - Math.floor(k / 4) * 0.8, 0.3] }); m.userData.pal = 'paper'; gs.push(m); }
    const r = rod(g, { r: 0.04, pal: 'ink', name: 'Lien InfiniBand' }); rodTo(r, V(cx, 2.5, 0), V(cx * 0.4 + x0 * 0.6, 4.7, 0)); nodes.push(gs); }
  label('mark', 'NVLink : les 8 GPU d’un nœud', () => V(ox, 3.0, 0)); label('mark', 'InfiniBand : entre les nœuds', () => V(x0 + 3.4, 4.1, 0));
  const pk = ball(g, 'red', 'Gradients en transit', 0.17); let cur = 0;
  return { update: t => { const u = (t * 0.6) % N; cur = Math.floor(u); nodes.forEach((gs, i) => gs.forEach(m => setPal(m, i === cur ? 'blue' : 'paper'))); const a = ox + cur * (nw + gap), b = ox + ((cur + 1) % N) * (nw + gap), f = u - cur;
    pk.position.set(a + (b - a) * f, 2.9 + 1.6 * Math.sin(Math.PI * f), 0.4); }, info: () => `somme des gradients : le nœud ${cur + 1} envoie au suivant` };
}


// ------------------------------------------------------------------ réseau de microélectrodes avec cellules en culture (biocalcul)
function mea({ g, S, x0, label, ext }) {
  ext.w = 10; ext.h = 6.4; ext.cy = 2.4; const cols = 8, rows = 6, cs = 0.62, ox = x0 - ((cols - 1) * cs) / 2, oy = 1.2;
  part(g, box(cols * cs + 0.8, rows * cs + 0.8, 0.22, 0.06), { pal: 'dark', tone: 'mid', name: 'Puce à électrodes', pos: [x0, oy + ((rows - 1) * cs) / 2, -0.15] });
  const el = []; for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const m = part(g, cyl(0.1, 0.12, 14), { pal: 'paper', tone: 'hi', name: `Électrode ${r * cols + c + 1}`, pos: [ox + c * cs, oy + r * cs, 0.05], rot: [Math.PI / 2, 0, 0] }); m.userData.pal = 'paper'; el.push([m, r, c]); }
  const cells = []; for (let i = 0; i < 46; i++) { const m = ball(g, i % 4 === 0 ? 'red' : 'blue', 'Neurone cultivé', 0.07 + 0.04 * rnd(i)); m.position.set(ox + rnd(i * 1.3) * (cols - 1) * cs, oy + rnd(i * 2.9 + 3) * (rows - 1) * cs, 0.16); cells.push(m); }
  label('t1', 'cellules vivantes (≈ 10⁴ à 10⁶)', () => V(x0, oy + rows * cs + 0.5, 0)); label('vec red', 'stimuler →', () => V(ox - 1.7, oy + 2.4, 0)); label('vec blue', '← lire', () => V(ox + (cols - 1) * cs + 1.6, oy + 2.4, 0));
  let n = 0;
  return { update: t => { const w = (t * 3) % (cols + 4); n = 0; el.forEach(([m, r, c]) => { const on = Math.abs(c - w) < 1.1 && rnd(r * 11 + c * 7 + Math.floor(t * 3)) > 0.35; if (on) n++; setPal(m, on ? (c < 2 ? 'red' : 'blue') : 'paper'); }); cells.forEach((m, i) => m.scale.setScalar(1 + 0.25 * Math.sin(t * 3 + i))); },
    info: () => `électrodes actives : ${n}/${cols * rows}\nlecture et stimulation de cellules vivantes` };
}

// ------------------------------------------------------------------ robot quadrupède : démarche et capteurs
function quad({ g, S, x0, label, ext }) {
  ext.w = 11; ext.h = 6; ext.cy = 2.2; const L1 = 0.75, L2 = 0.75, by = 2.0, hx = [0.9, -0.9], hz = [0.38, -0.38];
  part(g, box(2.6, 0.55, 1.0, 0.1), { pal: 'blue', tone: 'hi', name: 'Corps', pos: [x0, by, 0] });
  const head = part(g, box(0.7, 0.5, 0.7, 0.08), { pal: 'dark', tone: 'hi', name: 'Tête (caméras, LiDAR)', pos: [x0 + 1.55, by + 0.1, 0] });
  const legs = []; [[0, 0], [0, 1], [1, 0], [1, 1]].forEach(([a, b], i) => { legs.push({ u: rod(g, { r: 0.08, pal: 'ink', name: 'Cuisse' }), l: rod(g, { r: 0.065, pal: 'ink', name: 'Jambe' }), foot: ball(g, 'red', 'Pied (capteur de force)', 0.1), hip: V(x0 + hx[a], by - 0.2, hz[b]), ph: (a ^ b) ? Math.PI : 0 }); });
  const tiles = []; for (let i = 0; i < 14; i++) { const m = part(g, box(0.9, 0.08, 1.6, 0.02), { pal: i % 2 ? 'paper' : 'base', tone: 'lo', name: 'Sol', pos: [x0, 0.04, 0] }); tiles.push(m); }
  label('t1', 'LiDAR et caméras', () => V(x0 + 2.0, by + 1.0, 0)); label('t1', 'centrale inertielle (IMU)', () => V(x0 - 0.9, by + 0.85, 0)); label('t1', 'capteurs de force des pieds', () => V(x0, 0.7, 0.9));
  return { update: t => { const w = 3.2 * t; legs.forEach(L => { const p = w + L.ph, fx = 0.38 * Math.sin(p), fy = -1.1 + 0.28 * Math.max(0, Math.cos(p)); const tx = L.hip.x + fx, ty = by - 0.2 + fy, dx = tx - L.hip.x, dy = ty - L.hip.y, d = Math.min(Math.hypot(dx, dy), L1 + L2 - 0.02), c2 = (d * d - L1 * L1 - L2 * L2) / (2 * L1 * L2), a2 = Math.acos(Math.max(-1, Math.min(1, c2))), a1 = Math.atan2(dy, dx) + Math.atan2(L2 * Math.sin(a2), L1 + L2 * Math.cos(a2));
      const k = V(L.hip.x + L1 * Math.cos(a1), L.hip.y + L1 * Math.sin(a1), L.hip.z), f = V(tx, ty, L.hip.z); rodTo(L.u, L.hip, k); rodTo(L.l, k, f); L.foot.position.copy(f); });
    tiles.forEach((m, i) => { const x = (((i * 0.9 - t * 1.4) % 12.6) + 12.6) % 12.6 - 6.3; m.position.x = x0 + x; }); head.position.y = by + 0.1 + 0.03 * Math.sin(w * 2); },
    info: () => 'marche en trot : pattes en diagonale\nperception, équilibre, planification' };
}


// ------------------------------------------------------------------ frise chronologique : événements et périodes (hivers)
function timeline({ g, S, x0, label, ext }) {
  const W = 15, a = S.from, b = S.to, X = y => x0 - W / 2 + (y - a) / (b - a) * W, ay = 2.0; ext.w = W + 4; ext.h = 7; ext.cy = ay + 0.9;
  const ax = rod(g, { r: 0.05, pal: 'ink', name: 'Axe du temps' }); rodTo(ax, V(X(a), ay, 0), V(X(b), ay, 0));
  for (let y = Math.ceil(a / 10) * 10; y <= b; y += 10) { label('t2', String(y), () => V(X(y), ay - 0.38, 0)); }
  (S.spans || []).forEach(sp => { const m = part(g, box(X(sp.b) - X(sp.a), 0.32, 0.3, 0.04), { pal: 'red', tone: 'mid', name: sp.n, pos: [(X(sp.a) + X(sp.b)) / 2, ay - 0.9, 0] }); label('vec red', sp.n, () => V((X(sp.a) + X(sp.b)) / 2, ay - 1.45, 0)); });
  const lv = [0.6, 1.2, 1.8, 2.4, 3.0, 3.6]; const ev = S.events.map((e, i) => { const m = ball(g, e.pal || 'paper', `${e.y} : ${e.n}`, 0.13); m.position.set(X(e.y), ay, 0.1); m.userData.pal = e.pal || 'paper';
    const up = lv[i % 6]; const r = rod(g, { r: 0.012, pal: 'dark', name: 'Repère' }); rodTo(r, V(X(e.y), ay + 0.13, 0), V(X(e.y), ay + up - 0.18, 0)); label('t1', `${e.y} · ${e.n}`, () => V(X(e.y), ay + up, 0.1)); return m; });
  const cur = ball(g, 'red', 'Curseur', 0.2); let yc = a, idx = 0;
  return { update: t => { yc = a + (b - a) * ((t % 26) / 26); cur.position.set(X(yc), ay, 0.2); idx = -1; S.events.forEach((e, i) => { if (e.y <= yc) idx = i; }); ev.forEach((m, i) => setPal(m, i === idx ? 'red' : (S.events[i].pal || 'paper'))); },
    info: () => `${Math.round(yc)}\n${idx >= 0 ? S.events[idx].y + ' : ' + S.events[idx].n : ''}` };
}

const KINDS = { ...K3.KINDS3D, timeline, mea, quad, net, fmaps, tensor, landscape, cloud, logbars, chip, cluster, tokens, scatter, attn, pipeline, cycle, bars, curve, mem, conv, patches, detect, grid, arm, kv };
