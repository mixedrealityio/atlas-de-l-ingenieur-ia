export const SPECS = [
 {
  "key": "overfit",
  "title": "Le surapprentissage",
  "sub": "perte d’entraînement et de validation",
  "kind": "curve",
  "fn": "overfit",
  "x0": 0
 },
 {
  "key": "mlp",
  "title": "Un réseau de neurones",
  "sub": "4 → 6 → 6 → 3",
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
  "x0": 40
 },
 {
  "key": "activ",
  "title": "Les fonctions d’activation",
  "sub": "ReLU, sigmoïde, tanh",
  "kind": "curve",
  "fn": "activ",
  "x0": 80
 },
 {
  "key": "descente",
  "title": "La descente de gradient",
  "sub": "trois optimiseurs (illustratif)",
  "kind": "curve",
  "fn": "descente",
  "x0": 120
 },
 {
  "key": "pr",
  "title": "Précision et rappel",
  "sub": "déplacer le seuil de décision",
  "kind": "curve",
  "fn": "precrappel",
  "x0": 160
 }
];
