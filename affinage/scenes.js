export const SPECS = [
 {
  "key": "memoire",
  "title": "La mémoire pour affiner un modèle de 8 milliards",
  "sub": "ordre de grandeur, en gigaoctets",
  "kind": "mem",
  "scale": 0.05,
  "limit": 80,
  "limitLabel": "GPU 80 Go",
  "configs": [
   {
    "n": "Affinage complet bf16 + Adam",
    "segs": [
     [
      "Poids",
      16,
      "blue"
     ],
     [
      "Gradients",
      16,
      "paper"
     ],
     [
      "Adam + maître fp32",
      96,
      "red"
     ]
    ]
   },
   {
    "n": "LoRA (poids bf16)",
    "segs": [
     [
      "Poids figés",
      16,
      "blue"
     ],
     [
      "Adaptateurs + Adam",
      2,
      "red"
     ]
    ]
   },
   {
    "n": "QLoRA (poids 4 bits)",
    "segs": [
     [
      "Poids 4 bits",
      5,
      "blue"
     ],
     [
      "Adaptateurs + Adam",
      2,
      "red"
     ]
    ]
   }
  ],
  "info": "hors activations, qui ajoutent quelques Go selon le lot et la longueur",
  "x0": 0
 }
];
