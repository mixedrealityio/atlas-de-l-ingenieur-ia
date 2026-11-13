export const PRACTICE = {
 "5": [
  {
   "q": "Quel est l’avantage principal d’un générateur pour lire un gros fichier ?",
   "choices": [
    "il est plus rapide que C",
    "il ne garde qu’un élément à la fois en mémoire",
    "il trie les lignes",
    "il évite les exceptions"
   ],
   "answer": 1,
   "why": "<p>Il produit les éléments à la demande, sans construire toute la liste.</p>"
  }
 ],
 "7": [
  {
   "q": "Une fonction bloquante (time.sleep, requests.get) appelée dans une coroutine asyncio…",
   "choices": [
    "s’exécute en parallèle automatiquement",
    "fige toute la boucle d’événements pendant son exécution",
    "lève une exception",
    "est ignorée"
   ],
   "answer": 1,
   "why": "<p>Il faut sa version async (asyncio.sleep, httpx.AsyncClient) ou l’envoyer dans un fil avec asyncio.to_thread.</p>"
  }
 ],
 "8": [
  {
   "q": "Que fait Pydantic en plus des annotations de type ordinaires ?",
   "choices": [
    "il compile le code",
    "il valide et convertit les données à l’exécution",
    "il accélère les boucles",
    "il remplace les tests"
   ],
   "answer": 1,
   "why": "<p>Les annotations seules ne sont pas vérifiées à l’exécution ; Pydantic les applique.</p>"
  }
 ]
};
