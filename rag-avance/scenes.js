export const SPECS = [
 {
  "key": "graphe",
  "title": "Un graphe de connaissances",
  "sub": "entités et relations extraites des documents",
  "kind": "scatter",
  "by": 2.4,
  "points": [
   {
    "n": "Acme SA",
    "x": -2.6,
    "y": 0.6,
    "c": "red"
   },
   {
    "n": "Contrat 2025-17",
    "x": 0,
    "y": 1.4,
    "c": "blue"
   },
   {
    "n": "Durand Logistique",
    "x": 2.6,
    "y": 0.6,
    "c": "red"
   },
   {
    "n": "Clause de résiliation",
    "x": 0,
    "y": -0.4
   },
   {
    "n": "Préavis 30 jours",
    "x": 2.2,
    "y": -1.3
   },
   {
    "n": "Marie Leroy (juriste)",
    "x": -2.4,
    "y": -1.3,
    "c": "paper"
   }
  ],
  "arrows": [
   [
    "Acme SA",
    "Contrat 2025-17",
    "signe"
   ],
   [
    "Durand Logistique",
    "Contrat 2025-17",
    "signe"
   ],
   [
    "Contrat 2025-17",
    "Clause de résiliation",
    "contient"
   ],
   [
    "Clause de résiliation",
    "Préavis 30 jours",
    "impose"
   ],
   [
    "Marie Leroy (juriste)",
    "Contrat 2025-17",
    "a rédigé"
   ]
  ],
  "walk": [
   "Acme SA",
   "Contrat 2025-17",
   "Clause de résiliation",
   "Préavis 30 jours"
  ],
  "info": "3 relations : Acme → contrat → clause → préavis",
  "x0": 0
 }
];
