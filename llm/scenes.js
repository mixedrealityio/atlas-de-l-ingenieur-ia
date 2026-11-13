export const SPECS = [
 {
  "key": "tok",
  "title": "Le texte en jetons",
  "sub": "une phrase découpée en morceaux",
  "kind": "tokens",
  "y": 2.2,
  "info": "exemple illustratif : les identifiants varient selon le modèle",
  "items": [
   {
    "t": "L",
    "id": 43
   },
   {
    "t": "’",
    "id": 6
   },
   {
    "t": "intelligence",
    "id": 9120
   },
   {
    "t": " artificielle",
    "id": 18011
   },
   {
    "t": " apprend",
    "id": 5521
   },
   {
    "t": " à",
    "id": 311
   },
   {
    "t": " prédire",
    "id": 21874
   },
   {
    "t": " la",
    "id": 264
   },
   {
    "t": " suite",
    "id": 7312
   },
   {
    "t": ".",
    "id": 13
   }
  ],
  "x0": 0
 },
 {
  "key": "temp",
  "title": "Le jeton suivant",
  "sub": "une distribution, puis un tirage",
  "kind": "bars",
  "labels": [
   "Paris",
   "la",
   "une",
   "Lyon",
   "située",
   "le",
   "en",
   "Marseille"
  ],
  "logits": [
   6.0,
   3.2,
   2.6,
   2.2,
   1.9,
   1.6,
   1.2,
   0.8
  ],
  "mode": "temp",
  "x0": 40
 },
 {
  "key": "att",
  "title": "La matrice d’attention",
  "sub": "qui regarde qui",
  "kind": "attn",
  "causal": true,
  "tokens": [
   "Le",
   "chat",
   "dort",
   "car",
   "il",
   "est",
   "fatigué"
  ],
  "scores": [
   [
    1,
    0,
    0,
    0,
    0,
    0,
    0
   ],
   [
    1.2,
    1.5,
    0,
    0,
    0,
    0,
    0
   ],
   [
    0.4,
    2.2,
    1.2,
    0,
    0,
    0,
    0
   ],
   [
    0.2,
    1.0,
    1.3,
    1.0,
    0,
    0,
    0
   ],
   [
    0.1,
    2.9,
    0.8,
    0.3,
    0.9,
    0,
    0
   ],
   [
    0.2,
    1.7,
    0.4,
    0.2,
    1.8,
    0.7,
    0
   ],
   [
    0.1,
    1.6,
    0.9,
    0.2,
    1.5,
    0.8,
    0.9
   ]
  ],
  "x0": 80
 }
];
