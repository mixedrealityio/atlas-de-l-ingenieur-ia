export const PRACTICE = {
 "1": [
  {
   "q": "Une réponse du RAG est fausse. Première chose à vérifier ?",
   "choices": [
    "changer de modèle de langage",
    "si le bon passage figurait parmi les documents récupérés",
    "baisser la température",
    "allonger le prompt"
   ],
   "answer": 1,
   "why": "<p>Séparer échec de récupération et échec de génération.</p>"
  }
 ],
 "4": [
  {
   "q": "Quel enrichissement simple améliore souvent la récupération des morceaux ?",
   "choices": [
    "les mettre en majuscules",
    "préfixer chaque morceau par le titre du document et sa section",
    "retirer la ponctuation",
    "les traduire en anglais"
   ],
   "answer": 1,
   "why": "<p>Le morceau isolé perd son contexte ; le titre le lui rend.</p>"
  }
 ]
};
