export const SPECS = [
 {
  "key": "memoire",
  "title": "La mémoire pour entraîner",
  "sub": "1 milliard de paramètres, en gigaoctets",
  "kind": "mem",
  "scale": 0.3,
  "limit": 24,
  "limitLabel": "GPU 24 Go",
  "configs": [
   {
    "n": "Inférence bf16",
    "segs": [
     [
      "Poids",
      2,
      "blue"
     ]
    ]
   },
   {
    "n": "Entraînement fp32 + Adam",
    "segs": [
     [
      "Poids",
      4,
      "blue"
     ],
     [
      "Gradients",
      4,
      "paper"
     ],
     [
      "Adam",
      8,
      "red"
     ]
    ]
   },
   {
    "n": "Précision mixte + Adam",
    "segs": [
     [
      "Poids",
      2,
      "blue"
     ],
     [
      "Gradients",
      2,
      "paper"
     ],
     [
      "Maître fp32 + Adam",
      12,
      "red"
     ]
    ]
   }
  ],
  "info": "sans compter les activations, qui dépendent du lot et de la longueur",
  "x0": 0
 }
];
