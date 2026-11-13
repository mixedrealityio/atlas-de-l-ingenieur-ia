export const SPECS = [
 {
  "key": "grappe",
  "title": "Une grappe de GPU",
  "sub": "quatre nœuds de huit GPU",
  "kind": "cluster",
  "nodes": 4,
  "gpus": 8,
  "x0": 0
 },
 {
  "key": "debits",
  "title": "La bande passante, de l’SSD à la HBM",
  "sub": "ce qui limite la génération",
  "kind": "logbars",
  "unit": "Go/s",
  "axis": "échelle logarithmique",
  "items": [
   {
    "n": "SSD NVMe",
    "v": 7,
    "pal": "dark"
   },
   {
    "n": "PCIe 5 ×16",
    "v": 64,
    "pal": "dark"
   },
   {
    "n": "DDR5 (serveur)",
    "v": 300,
    "pal": "paper"
   },
   {
    "n": "Mac M4 Max",
    "v": 546,
    "pal": "blue"
   },
   {
    "n": "RTX 4090",
    "v": 1008,
    "pal": "blue"
   },
   {
    "n": "H100 SXM",
    "v": 3350,
    "pal": "red"
   },
   {
    "n": "B200",
    "v": 8000,
    "pal": "red"
   }
  ],
  "x0": 40
 }
];
