export const PRACTICE = {
 "4": [
  {
   "q": "Une matrice 4096 × 4096 adaptée par LoRA de rang 8 : combien de paramètres entraînés ?",
   "choices": [
    "16,8 millions",
    "65 536",
    "32 768",
    "8"
   ],
   "answer": 1,
   "why": "<p>A (8 × 4096) + B (4096 × 8) = 65 536.</p>"
  }
 ],
 "12": [
  {
   "q": "Les tarifs de vos produits changent chaque semaine et l’assistant doit les connaître. Meilleure approche ?",
   "choices": [
    "affiner chaque semaine",
    "un RAG sur le catalogue à jour",
    "un modèle plus grand",
    "augmenter la température"
   ],
   "answer": 1,
   "why": "<p>Les connaissances changeantes vont dans le contexte, pas dans les poids.</p>"
  }
 ]
};
