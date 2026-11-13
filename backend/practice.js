export const PRACTICE = {
 "4": [
  {
   "q": "Votre flux SSE arrive d’un seul bloc à la fin, derrière Nginx. Cause probable ?",
   "choices": [
    "le modèle ne sait pas streamer",
    "la mise en tampon du proxy",
    "le JSON est invalide",
    "Redis"
   ],
   "answer": 1,
   "why": "<p>Désactiver le buffering (X-Accel-Buffering: no, proxy_buffering off).</p>"
  }
 ],
 "6": [
  {
   "q": "Quel risque présente un cache sémantique partagé entre tous les utilisateurs ?",
   "choices": [
    "aucun",
    "servir à un utilisateur une réponse contenant les données personnelles d’un autre",
    "trop de jetons",
    "un modèle plus lent"
   ],
   "answer": 1,
   "why": "<p>Scoper le cache par utilisateur ou ne cacher que des réponses publiques.</p>"
  }
 ]
};
