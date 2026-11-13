export const PRACTICE = {
 "1": [
  {
   "q": "Pourquoi un seul perceptron ne peut-il pas apprendre le XOR ?",
   "choices": [
    "il manque de données",
    "les classes ne sont pas séparables par une droite",
    "le taux d’apprentissage est trop faible",
    "il faut une sigmoïde"
   ],
   "answer": 1,
   "why": "<p>Le XOR demande une frontière non linéaire : au moins une couche cachée.</p>"
  }
 ],
 "3": [
  {
   "q": "Pourquoi l’entraînement demande-t-il plus de mémoire que l’inférence ?",
   "choices": [
    "les poids sont dupliqués",
    "il faut garder les activations, les gradients et l’état de l’optimiseur",
    "le GPU est plus lent",
    "la perte est stockée sur disque"
   ],
   "answer": 1,
   "why": "<p>Activations pour la rétropropagation, gradients et moments d’Adam s’ajoutent aux poids.</p>"
  }
 ],
 "5": [
  {
   "q": "Votre perte d’entraînement devient NaN après 200 étapes. Premier suspect ?",
   "choices": [
    "trop de données",
    "un taux d’apprentissage trop fort",
    "un tokeniseur trop petit",
    "le dropout"
   ],
   "answer": 1,
   "why": "<p>Baisser le taux, ajouter l’échauffement et l’écrêtage des gradients.</p>"
  }
 ],
 "8": [
  {
   "q": "Dans l’attention, à quoi sert la division par √d ?",
   "choices": [
    "accélérer le calcul",
    "éviter des scores trop grands qui saturent le softmax",
    "normaliser les valeurs V",
    "appliquer le masque causal"
   ],
   "answer": 1,
   "why": "<p>Sans elle, les produits scalaires grandissent avec d et le softmax devient presque one-hot.</p>"
  }
 ]
};
