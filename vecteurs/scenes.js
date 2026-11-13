export const SPECS = [
 {
  "key": "emb",
  "title": "Questions et documents dans un même espace",
  "sub": "la recherche sémantique",
  "kind": "scatter",
  "by": 2.4,
  "points": [
   {
    "n": "Q : résilier mon abonnement",
    "x": -0.6,
    "y": 0.9,
    "c": "red"
   },
   {
    "n": "doc : conditions de résiliation",
    "x": -1.1,
    "y": 1.5,
    "c": "blue"
   },
   {
    "n": "doc : préavis de 30 jours",
    "x": 0.2,
    "y": 1.6,
    "c": "blue"
   },
   {
    "n": "doc : tarifs 2026",
    "x": 2.8,
    "y": -0.6
   },
   {
    "n": "doc : export PDF",
    "x": -3.2,
    "y": -1.4
   },
   {
    "n": "doc : réinitialiser le mot de passe",
    "x": -2.6,
    "y": -0.4
   },
   {
    "n": "doc : facture en double",
    "x": 2.4,
    "y": 0.8
   }
  ],
  "arrows": [
   [
    "Q : résilier mon abonnement",
    "doc : conditions de résiliation",
    "proche"
   ],
   [
    "Q : résilier mon abonnement",
    "doc : préavis de 30 jours",
    "proche"
   ]
  ],
  "walk": [
   "Q : résilier mon abonnement",
   "doc : conditions de résiliation",
   "doc : préavis de 30 jours"
  ],
  "info": "projection en 2D ; en vrai, 384 à 3 072 dimensions",
  "x0": 0
 },
 {
  "key": "tailles",
  "title": "La mémoire d’un index",
  "sub": "10 millions de vecteurs de 1 024 dimensions",
  "kind": "logbars",
  "unit": "Go",
  "axis": "échelle logarithmique",
  "items": [
   {
    "n": "float32",
    "v": 41,
    "pal": "red"
   },
   {
    "n": "float16",
    "v": 20,
    "pal": "paper"
   },
   {
    "n": "int8 (quantification scalaire)",
    "v": 10,
    "pal": "blue"
   },
   {
    "n": "binaire (1 bit)",
    "v": 1.3,
    "pal": "blue"
   }
  ],
  "x0": 40
 }
];
