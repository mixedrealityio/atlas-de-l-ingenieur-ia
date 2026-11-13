export const PRACTICE = {
 "1": [
  {
   "q": "Ordre de grandeur du calcul pour entraîner un modèle de 8 milliards de paramètres sur 15 000 milliards de jetons ?",
   "choices": [
    "≈ 7 × 10¹⁷",
    "≈ 7 × 10²³ opérations",
    "≈ 10³⁰",
    "≈ 10¹²"
   ],
   "answer": 1,
   "why": "<p>6 × 8·10⁹ × 1,5·10¹³ ≈ 7,2 × 10²³.</p>"
  }
 ],
 "4": [
  {
   "q": "Quel avantage pratique DPO a-t-il sur le RLHF classique ?",
   "choices": [
    "il n’a pas besoin de données de préférences",
    "il n’a pas besoin de modèle de récompense ni de boucle de renforcement",
    "il est toujours meilleur",
    "il entraîne un modèle de base"
   ],
   "answer": 1,
   "why": "<p>Une perte directe sur les paires, entraînable comme du SFT.</p>"
  }
 ]
};
