export const PRACTICE = {
 "1": [
  {
   "q": "Pourquoi ne pas utiliser un cross-encodeur directement sur toute la collection ?",
   "choices": [
    "il est moins précis",
    "il doit lire chaque paire question-document : bien trop lent sur des millions de passages",
    "il ne gère pas le français",
    "il demande un GPU"
   ],
   "answer": 1,
   "why": "<p>D’où les deux étages : recherche rapide, puis reranking sur quelques dizaines de candidats.</p>"
  }
 ],
 "8": [
  {
   "q": "La fidélité (faithfulness) est basse mais le rappel de récupération est bon. Où chercher ?",
   "choices": [
    "dans le découpage",
    "dans la génération : le modèle ajoute des affirmations absentes des passages",
    "dans la base vectorielle",
    "dans le modèle de plongement"
   ],
   "answer": 1,
   "why": "<p>Les bons passages sont là ; le modèle s’en écarte : prompt, modèle, citations obligatoires.</p>"
  }
 ]
};
