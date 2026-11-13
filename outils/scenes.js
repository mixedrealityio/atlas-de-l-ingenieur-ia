export const SPECS = [
 {
  "key": "cplx",
  "title": "Le coût des algorithmes",
  "sub": "nombre d’opérations selon la taille n (illustratif)",
  "kind": "logbars",
  "unit": "opérations",
  "axis": "échelle logarithmique, pour n = 1 000 000",
  "items": [
   {
    "n": "O(1) : dictionnaire",
    "v": 1,
    "pal": "blue"
   },
   {
    "n": "O(log n) : recherche dichotomique",
    "v": 20,
    "pal": "blue"
   },
   {
    "n": "O(n) : parcours",
    "v": 1000000.0,
    "pal": "paper"
   },
   {
    "n": "O(n log n) : tri",
    "v": 20000000.0,
    "pal": "paper"
   },
   {
    "n": "O(n²) : toutes les paires",
    "v": 1000000000000.0,
    "pal": "red"
   }
  ],
  "x0": 0
 }
];
