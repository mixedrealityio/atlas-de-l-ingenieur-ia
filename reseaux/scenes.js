export const SPECS = [
 {
  "key": "mlp",
  "title": "Un réseau à propagation avant",
  "sub": "4 → 6 → 6 → 3 neurones",
  "kind": "net",
  "layers": [
   4,
   6,
   6,
   3
  ],
  "names": [
   "Entrée",
   "Couche cachée 1",
   "Couche cachée 2",
   "Sortie"
  ],
  "params": "93 paramètres : 78 poids + 15 biais",
  "x0": 0
 },
 {
  "key": "activ",
  "title": "Les fonctions d’activation",
  "sub": "ce qui rend le réseau non linéaire",
  "kind": "curve",
  "fn": "activ",
  "x0": 40
 },
 {
  "key": "descente",
  "title": "Les optimiseurs",
  "sub": "trois façons de descendre la perte",
  "kind": "curve",
  "fn": "descente",
  "x0": 80
 },
 {
  "key": "conv",
  "title": "La convolution",
  "sub": "un petit filtre qui glisse sur l’image",
  "kind": "conv",
  "img": [
   "........",
   "..####..",
   ".#....#.",
   ".#....#.",
   ".######.",
   ".#....#.",
   ".#....#.",
   "........"
  ],
  "kernel": "contours",
  "x0": 120
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
  "x0": 160
 },
 {
  "key": "emb",
  "title": "L’espace des plongements",
  "sub": "des directions pour les relations",
  "kind": "scatter",
  "by": 2.6,
  "points": [
   {
    "n": "homme",
    "x": -3.6,
    "y": -0.8,
    "c": "blue"
   },
   {
    "n": "femme",
    "x": -3.6,
    "y": 0.8,
    "c": "blue"
   },
   {
    "n": "roi",
    "x": -1.2,
    "y": -0.5
   },
   {
    "n": "reine",
    "x": -1.2,
    "y": 1.1
   },
   {
    "n": "France",
    "x": 1.4,
    "y": -1.4,
    "c": "red"
   },
   {
    "n": "Paris",
    "x": 1.4,
    "y": 0.2,
    "c": "red"
   },
   {
    "n": "Italie",
    "x": 3.6,
    "y": -1.4,
    "c": "red"
   },
   {
    "n": "Rome",
    "x": 3.6,
    "y": 0.2,
    "c": "red"
   }
  ],
  "arrows": [
   [
    "homme",
    "femme",
    ""
   ],
   [
    "roi",
    "reine",
    "même direction"
   ],
   [
    "France",
    "Paris",
    ""
   ],
   [
    "Italie",
    "Rome",
    "capitale de"
   ]
  ],
  "walk": [
   "roi",
   "reine",
   "France",
   "Paris"
  ],
  "info": "projection en 2 dimensions (le vrai espace en a des centaines ou des milliers)",
  "x0": 200
 }
];
