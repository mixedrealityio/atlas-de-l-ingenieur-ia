export const SPECS = [
 {
  "key": "vit",
  "title": "Une image devient des jetons",
  "sub": "le transformeur de vision",
  "kind": "patches",
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
  "patch": 2,
  "dim": 1024,
  "x0": 0
 },
 {
  "key": "detect",
  "title": "Comprendre une image",
  "sub": "où, quoi, avec quelle confiance",
  "kind": "detect",
  "objects": [
   {
    "n": "facture",
    "x": 0.06,
    "y": 0.1,
    "w": 0.5,
    "h": 0.8,
    "score": 0.97,
    "pal": "dark"
   },
   {
    "n": "tampon",
    "x": 0.62,
    "y": 0.2,
    "w": 0.3,
    "h": 0.3,
    "score": 0.81,
    "pal": "paper"
   }
  ],
  "info": "chaque cadre : une classe, une position, un score",
  "x0": 40
 }
];
