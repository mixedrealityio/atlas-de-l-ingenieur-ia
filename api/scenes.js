export const SPECS = [
 {
  "key": "backoff",
  "title": "Réessayer intelligemment",
  "sub": "l’attente exponentielle",
  "kind": "curve",
  "fn": "backoff",
  "x0": 0
 },
 {
  "key": "cout",
  "title": "Le coût par million de jetons",
  "sub": "ordre de grandeur, en dollars (illustratif)",
  "kind": "logbars",
  "unit": "$ / M jetons de sortie",
  "axis": "échelle logarithmique",
  "items": [
   {
    "n": "Petit modèle ouvert (auto-hébergé)",
    "v": 0.2,
    "pal": "paper"
   },
   {
    "n": "Petit modèle rapide (API)",
    "v": 1.5,
    "pal": "blue"
   },
   {
    "n": "Modèle moyen (API)",
    "v": 12,
    "pal": "blue"
   },
   {
    "n": "Modèle de pointe (API)",
    "v": 60,
    "pal": "red"
   }
  ],
  "x0": 40
 }
];
