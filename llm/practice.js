export const PRACTICE = {
 "1": [
  {
   "q": "Un utilisateur se plaint que le chatbot « oublie » ce qu’il a dit trois messages plus tôt. Cause la plus probable ?",
   "choices": [
    "le modèle a une mauvaise mémoire interne",
    "l’application n’a pas renvoyé l’historique dans le contexte",
    "la température est trop haute",
    "le modèle est trop petit"
   ],
   "answer": 1,
   "why": "<p>Le modèle est sans état : seule l’application garde l’historique.</p>"
  }
 ],
 "7": [
  {
   "q": "Pourquoi un même document coûte-t-il plus de jetons en français qu’en anglais avec beaucoup de tokeniseurs ?",
   "choices": [
    "le français a plus de mots",
    "le vocabulaire a été appris sur des corpus majoritairement anglais",
    "les accents sont interdits",
    "c’est faux"
   ],
   "answer": 1,
   "why": "<p>Les fusions BPE favorisent les suites fréquentes du corpus d’apprentissage.</p>"
  }
 ],
 "13": [
  {
   "q": "Mémoire des poids d’un modèle de 70 milliards de paramètres en bf16 ?",
   "choices": [
    "7 Go",
    "35 Go",
    "140 Go",
    "280 Go"
   ],
   "answer": 2,
   "why": "<p>2 octets × 70 milliards.</p>"
  }
 ]
};
