export const PRACTICE = {
 "5": [
  {
   "q": "Votre application mobile appelle directement l’API du fournisseur avec la clé intégrée. Problème ?",
   "choices": [
    "aucun",
    "la clé peut être extraite de l’application et utilisée par n’importe qui",
    "c’est plus lent",
    "le streaming ne marche pas"
   ],
   "answer": 1,
   "why": "<p>Toujours passer par votre serveur, qui garde la clé.</p>"
  }
 ],
 "10": [
  {
   "q": "Une requête renvoie 400 « prompt too long ». Faut-il réessayer avec attente exponentielle ?",
   "choices": [
    "oui, 5 fois",
    "non : l’erreur est dans la requête, il faut la raccourcir",
    "oui, mais une seule fois",
    "oui, sur un autre compte"
   ],
   "answer": 1,
   "why": "<p>Les erreurs 4xx (sauf 429) ne se résolvent pas en réessayant.</p>"
  }
 ],
 "12": [
  {
   "q": "Coût de 1 000 requêtes de 4 000 jetons d’entrée et 1 000 de sortie, à 3 $ / M en entrée et 15 $ / M en sortie ?",
   "choices": [
    "≈ 2,7 $",
    "≈ 27 $",
    "≈ 270 $",
    "≈ 0,27 $"
   ],
   "answer": 1,
   "why": "<p>1 000 × (0,012 + 0,015) = 27 $.</p>"
  }
 ]
};
