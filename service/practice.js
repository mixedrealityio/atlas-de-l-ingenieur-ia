export const PRACTICE = {
 "6": [
  {
   "q": "Vous augmentez --max-model-len de 8k à 128k sans changer de GPU. Effet probable ?",
   "choices": [
    "aucun",
    "moins de requêtes simultanées possibles, voire refus de démarrer",
    "plus de débit",
    "réponses plus courtes"
   ],
   "answer": 1,
   "why": "<p>Chaque requête peut réclamer bien plus de cache.</p>"
  }
 ],
 "4": [
  {
   "q": "Une équipe de 200 personnes doit utiliser un modèle interne en même temps. Quel serveur ?",
   "choices": [
    "Ollama sur un portable",
    "vLLM ou SGLang sur des GPU de serveur",
    "LM Studio",
    "un script model.generate()"
   ],
   "answer": 1,
   "why": "<p>Batching continu et gestion fine du cache pour la concurrence.</p>"
  }
 ]
};
