export const PRACTICE = {
 "9": [
  {
   "q": "Pourquoi copier pyproject.toml et uv.lock avant le code source dans le Dockerfile ?",
   "choices": [
    "obligation de Docker",
    "pour réutiliser la couche des dépendances tant qu’elles ne changent pas",
    "pour réduire la sécurité",
    "pour activer le GPU"
   ],
   "answer": 1,
   "why": "<p>Le cache des couches rend les reconstructions bien plus rapides.</p>"
  }
 ],
 "14": [
  {
   "q": "Pour comparer deux offres GPU pour l’inférence, le meilleur critère est…",
   "choices": [
    "le prix par heure",
    "le coût par million de jetons servis sur votre charge",
    "le nombre de cœurs CUDA",
    "la marque du fournisseur"
   ],
   "answer": 1,
   "why": "<p>Un GPU plus cher peut servir bien plus de jetons par dollar.</p>"
  }
 ]
};
