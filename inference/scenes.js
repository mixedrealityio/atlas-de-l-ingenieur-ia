export const SPECS = [
 {
  "key": "cache",
  "title": "Le cache clé-valeur",
  "sub": "ne pas tout recalculer",
  "kind": "kv",
  "tokens": [
   "Paris",
   "est",
   "la",
   "capitale",
   "de",
   "la",
   "France"
  ],
  "cy": 3.0,
  "x0": 0
 },
 {
  "key": "mem",
  "title": "La mémoire d’un modèle de 8 milliards",
  "sub": "poids et cache en gigaoctets",
  "kind": "mem",
  "scale": 0.18,
  "limit": 24,
  "limitLabel": "GPU 24 Go",
  "configs": [
   {
    "n": "Poids bf16",
    "segs": [
     [
      "Poids",
      16,
      "blue"
     ]
    ]
   },
   {
    "n": "Poids 4 bits",
    "segs": [
     [
      "Poids",
      5,
      "blue"
     ]
    ]
   },
   {
    "n": "Cache : 1 × 32k jetons",
    "segs": [
     [
      "Cache KV",
      4,
      "red"
     ]
    ]
   },
   {
    "n": "Cache : 16 × 8k jetons",
    "segs": [
     [
      "Cache KV",
      16,
      "red"
     ]
    ]
   }
  ],
  "info": "exemple : 32 couches, 8 têtes KV de 128, bf16 → 128 Ko par jeton",
  "x0": 40
 },
 {
  "key": "batch",
  "title": "Le batching",
  "sub": "débit contre latence",
  "kind": "curve",
  "fn": "batching",
  "x0": 80
 }
];
