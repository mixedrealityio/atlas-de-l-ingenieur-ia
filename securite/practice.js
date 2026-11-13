export const PRACTICE = {
 "1": [
  {
   "q": "Un assistant lit les courriels de l’utilisateur et peut afficher des images Markdown. Quel risque ?",
   "choices": [
    "aucun",
    "une injection dans un courriel peut faire fuiter des données dans l’URL d’une image",
    "le modèle devient lent",
    "les images coûtent cher"
   ],
   "answer": 1,
   "why": "<p>Le chargement de l’image envoie les données au serveur de l’attaquant.</p>"
  }
 ],
 "8": [
  {
   "q": "Pourquoi préférer le format safetensors à pickle pour des poids téléchargés ?",
   "choices": [
    "il est plus petit",
    "il ne peut pas exécuter de code au chargement",
    "il est plus rapide à entraîner",
    "il est obligatoire sur le Hub"
   ],
   "answer": 1,
   "why": "<p>Charger un pickle peut exécuter du code arbitraire.</p>"
  }
 ]
};
