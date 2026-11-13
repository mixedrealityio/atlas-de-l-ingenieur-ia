export const PRACTICE = {
 "2": [
  {
   "q": "Pourquoi appelle-t-on optimizer.zero_grad() à chaque étape ?",
   "choices": [
    "pour libérer le GPU",
    "parce que les gradients s’accumulent d’un backward à l’autre",
    "pour réinitialiser les poids",
    "c’est facultatif"
   ],
   "answer": 1,
   "why": "<p>Sans remise à zéro, chaque étape additionne les gradients des précédentes.</p>"
  }
 ],
 "3": [
  {
   "q": "Vous évaluez un modèle et obtenez des résultats qui varient d’un appel à l’autre sur les mêmes entrées. Oubli probable ?",
   "choices": [
    "model.eval()",
    "loss.backward()",
    "torch.save",
    "num_workers"
   ],
   "answer": 0,
   "why": "<p>En mode train, le dropout reste actif.</p>"
  }
 ],
 "6": [
  {
   "q": "Ordre de grandeur de la mémoire pour entraîner complètement un modèle de 7 milliards de paramètres avec Adam (hors activations) ?",
   "choices": [
    "14 Go",
    "28 Go",
    "≈ 112 Go",
    "7 Go"
   ],
   "answer": 2,
   "why": "<p>≈ 16 octets par paramètre × 7 milliards.</p>"
  }
 ]
};
