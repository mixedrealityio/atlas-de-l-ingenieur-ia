export const PRACTICE = {
 "1": [
  {
   "q": "Un modèle de 16 Go de poids sur un GPU de 2 To/s : vitesse maximale pour une seule requête ?",
   "choices": [
    "≈ 12 jetons/s",
    "≈ 125 jetons/s",
    "≈ 2 000 jetons/s",
    "illimitée"
   ],
   "answer": 1,
   "why": "<p>Chaque jeton relit 16 Go : 2 000 / 16 = 125.</p>"
  }
 ],
 "3": [
  {
   "q": "Pourquoi le cache de prompt (préfixe commun) réduit-il le temps jusqu’au premier jeton ?",
   "choices": [
    "il réduit la sortie",
    "le préremplissage du préfixe déjà en cache est sauté",
    "il utilise un modèle plus petit",
    "il compresse le texte"
   ],
   "answer": 1,
   "why": "<p>Seule la partie nouvelle du prompt est calculée.</p>"
  }
 ],
 "7": [
  {
   "q": "Passer un modèle de bf16 à 4 bits sur un GPU limité par la mémoire a quel effet principal sur le décodage ?",
   "choices": [
    "plus lent",
    "plus rapide, car il y a moins d’octets à lire par jeton",
    "aucun effet",
    "la sortie devient déterministe"
   ],
   "answer": 1,
   "why": "<p>Le décodage est limité par la bande passante.</p>"
  }
 ]
};
