export const PRACTICE = {
 "5": [
  {
   "q": "Vous chargez Llama et Qwen avec le même tokeniseur pour gagner du temps. Résultat ?",
   "choices": [
    "identique",
    "des sorties incohérentes : les identifiants n’ont pas le même sens",
    "plus rapide",
    "erreur de licence"
   ],
   "answer": 1,
   "why": "<p>Chaque modèle a appris son propre vocabulaire.</p>"
  }
 ],
 "7": [
  {
   "q": "Pour un modèle de langage, quelle ressource limite le plus souvent la vitesse de génération jeton par jeton ?",
   "choices": [
    "le nombre de cœurs CPU",
    "la bande passante de la mémoire GPU",
    "le disque",
    "le réseau"
   ],
   "answer": 1,
   "why": "<p>Chaque jeton relit tous les poids depuis la HBM.</p>"
  }
 ]
};
