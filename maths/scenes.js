export const SPECS = [
 {
  "key": "vec",
  "title": "Des vecteurs",
  "sub": "direction, longueur, angle",
  "kind": "scatter",
  "by": 2.2,
  "points": [
   {
    "n": "origine",
    "x": 0,
    "y": 0,
    "c": "paper"
   },
   {
    "n": "a = (3, 1)",
    "x": 3,
    "y": 1,
    "c": "blue"
   },
   {
    "n": "b = (2, 2.5)",
    "x": 2,
    "y": 2.5,
    "c": "blue"
   },
   {
    "n": "c = (−2, 1.2)",
    "x": -2,
    "y": 1.2,
    "c": "red"
   },
   {
    "n": "a + b",
    "x": 5,
    "y": 3.5,
    "c": "dark"
   }
  ],
  "arrows": [
   [
    "origine",
    "a = (3, 1)",
    ""
   ],
   [
    "origine",
    "b = (2, 2.5)",
    ""
   ],
   [
    "origine",
    "c = (−2, 1.2)",
    ""
   ],
   [
    "a = (3, 1)",
    "a + b",
    ""
   ]
  ],
  "walk": [
   "a = (3, 1)",
   "b = (2, 2.5)",
   "a + b",
   "c = (−2, 1.2)"
  ],
  "info": "a·b = 3×2 + 1×2,5 = 8,5 : angle aigu\na·c = −6 + 1,2 = −4,8 : angle obtus",
  "x0": 0
 },
 {
  "key": "gauss",
  "title": "La loi normale",
  "sub": "trois courbes en cloche",
  "kind": "curve",
  "fn": "normale",
  "x0": 40
 }
];
