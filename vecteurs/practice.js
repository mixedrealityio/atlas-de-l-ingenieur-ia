export const PRACTICE = {
 "1": [
  {
   "q": "Vous changez de modèle de plongement pour les requêtes mais pas pour les documents déjà indexés. Résultat ?",
   "choices": [
    "léger gain",
    "résultats incohérents : les espaces ne sont pas comparables",
    "aucun changement",
    "erreur de dimension seulement"
   ],
   "answer": 1,
   "why": "<p>Même si les dimensions coïncident, les espaces diffèrent : il faut réindexer.</p>"
  }
 ],
 "15": [
  {
   "q": "Comment garantir qu’un client ne récupère jamais les documents d’un autre client ?",
   "choices": [
    "le dire dans le prompt",
    "filtrer par tenant dans la requête à la base vectorielle",
    "trier les résultats",
    "utiliser un modèle plus grand"
   ],
   "answer": 1,
   "why": "<p>Le cloisonnement se fait dans la requête, côté serveur.</p>"
  }
 ],
 "16": [
  {
   "q": "Les utilisateurs cherchent souvent des références produit comme « XR-4410 ». Quelle approche ajoute le plus ?",
   "choices": [
    "un modèle de plongement plus grand",
    "ajouter une recherche lexicale (BM25) en hybride",
    "augmenter top_k",
    "baisser la température"
   ],
   "answer": 1,
   "why": "<p>Les identifiants exacts sont le point faible des plongements denses.</p>"
  }
 ]
};
