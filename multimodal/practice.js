export const PRACTICE = {
 "3": [
  {
   "q": "Comment fiabiliser l’extraction du total d’une facture par un VLM ?",
   "choices": [
    "demander deux fois",
    "valider : total = somme des lignes + TVA, et signaler les écarts",
    "augmenter la résolution seulement",
    "utiliser la température 1"
   ],
   "answer": 1,
   "why": "<p>Les règles métier détectent les erreurs que le modèle ne voit pas.</p>"
  }
 ],
 "7": [
  {
   "q": "Une vidéo d’une heure, échantillonnée à 1 image par seconde, à ≈ 250 jetons par image, représente…",
   "choices": [
    "≈ 9 000 jetons",
    "≈ 90 000 jetons",
    "≈ 900 000 jetons",
    "≈ 9 millions"
   ],
   "answer": 2,
   "why": "<p>3 600 × 250 = 900 000 : il faut réduire la fréquence ou sélectionner les plans.</p>"
  }
 ]
};
