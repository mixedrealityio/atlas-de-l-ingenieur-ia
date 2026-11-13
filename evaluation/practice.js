export const PRACTICE = {
 "3": [
  {
   "q": "Votre juge préfère presque toujours la réponse placée en premier dans les comparaisons A/B. Que faire ?",
   "choices": [
    "rien",
    "évaluer chaque paire dans les deux ordres et ne garder que les verdicts cohérents",
    "utiliser une température plus haute",
    "supprimer le juge"
   ],
   "answer": 1,
   "why": "<p>C’est le biais de position : alterner l’ordre neutralise l’effet.</p>"
  }
 ],
 "6": [
  {
   "q": "Un détecteur de tickets urgents (5 % du trafic) répond toujours « non urgent ». Son exactitude ?",
   "choices": [
    "5 %",
    "50 %",
    "95 %",
    "0 %"
   ],
   "answer": 2,
   "why": "<p>95 % d’exactitude pour un rappel nul : regarder précision et rappel.</p>"
  }
 ],
 "5": [
  {
   "q": "Sur 100 cas, votre nouveau prompt passe de 82 % à 85 %. Conclusion ?",
   "choices": [
    "amélioration certaine",
    "écart compatible avec le bruit : agrandir le jeu ou faire un test apparié",
    "régression",
    "il faut changer de modèle"
   ],
   "answer": 1,
   "why": "<p>± 8 points d’incertitude environ sur 100 cas.</p>"
  }
 ]
};
