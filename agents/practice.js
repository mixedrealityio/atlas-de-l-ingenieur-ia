export const PRACTICE = {
 "1": [
  {
   "q": "Une tâche consiste toujours à : extraire 5 champs d’une facture, les valider, les enregistrer. Meilleur choix ?",
   "choices": [
    "un agent autonome multi-outils",
    "un workflow fixe avec un appel de modèle et des validations",
    "un système multi-agents",
    "un affinage complet"
   ],
   "answer": 1,
   "why": "<p>Le chemin est connu à l’avance : un workflow est plus fiable et moins cher.</p>"
  }
 ],
 "5": [
  {
   "q": "Un outil échoue car le numéro de commande est mal formé. Que renvoyer au modèle ?",
   "choices": [
    "rien, arrêter l’agent",
    "un résultat d’erreur explicite qui indique le format attendu",
    "une exception Python brute",
    "un résultat vide"
   ],
   "answer": 1,
   "why": "<p>Une erreur lisible permet au modèle de se corriger au tour suivant.</p>"
  }
 ]
};
