export const PRACTICE = {
 "2": [
  {
   "q": "Quel mécanisme de LangGraph permet de reprendre un agent après une panne ou une validation humaine ?",
   "choices": [
    "le streaming",
    "les points de contrôle (checkpointer) de l’état",
    "les chaînes LCEL",
    "le cache de prompt"
   ],
   "answer": 1,
   "why": "<p>L’état est sauvegardé après chaque nœud.</p>"
  }
 ],
 "11": [
  {
   "q": "Votre équipe ne voit plus quel prompt exact part vers le modèle à travers les couches du framework. Risque principal ?",
   "choices": [
    "aucun",
    "difficulté à déboguer et à optimiser coût et qualité",
    "fuite de clé",
    "le modèle refuse"
   ],
   "answer": 1,
   "why": "<p>Pouvoir inspecter le prompt réel est un critère de choix essentiel.</p>"
  }
 ]
};
