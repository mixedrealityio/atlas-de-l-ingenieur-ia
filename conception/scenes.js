export const SPECS = [
 {
  "key": "lat",
  "title": "Où passe le temps d’une requête",
  "sub": "exemple d’un RAG, en millisecondes (illustratif)",
  "kind": "logbars",
  "unit": "ms",
  "axis": "échelle logarithmique",
  "items": [
   {
    "n": "Authentification, cache",
    "v": 5,
    "pal": "paper"
   },
   {
    "n": "Plongement de la question",
    "v": 40,
    "pal": "blue"
   },
   {
    "n": "Recherche hybride",
    "v": 60,
    "pal": "blue"
   },
   {
    "n": "Reranking",
    "v": 150,
    "pal": "blue"
   },
   {
    "n": "Premier jeton (TTFT)",
    "v": 700,
    "pal": "red"
   },
   {
    "n": "Génération complète (400 jetons)",
    "v": 6000,
    "pal": "red"
   }
  ],
  "x0": 0
 }
];
