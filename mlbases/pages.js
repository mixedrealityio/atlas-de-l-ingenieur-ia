// Chapitre 4 : Les bases de l’apprentissage automatique (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 4 · Apprentissage automatique",
  "title": "Les bases de l’apprentissage automatique",
  "sub": "apprendre à partir d’exemples",
  "body": "<p class=\"lede\">En programmation classique, on écrit les règles. En <b>apprentissage automatique</b>, on donne des exemples et l’algorithme trouve les règles.</p>\n    <p>Un modèle est une fonction à paramètres ; l’entraînement ajuste ces paramètres pour réduire une <b>perte</b> mesurée sur des données. Le but n’est pas de bien faire sur les exemples vus, mais de <b>généraliser</b> à des données nouvelles.</p>\n    <p>Même si vous n’entraînerez jamais de grand modèle, ces notions servent tous les jours : évaluer, choisir un modèle, affiner (chapitre 19), diagnostiquer.</p>",
  "cam": {
   "target": [
    0,
    1.8,
    0
   ],
   "az": 8,
   "el": 7,
   "dist": 26
  },
  "lit": "boucle",
  "look": {},
  "scene": "boucle",
  "fig": "",
  "panel": "<h2>La boucle d’entraînement</h2><div class=\"psub\">cinq temps répétés</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Lot de données</b><i>ex. 32 exemples</i></span><pre class=\"ex\">for x, y in loader:</pre></li><li class=\"blue\"><span class=\"st\"><b>Passe avant</b><i>prédiction</i></span><pre class=\"ex\">pred = model(x)</pre></li><li class=\"red\"><span class=\"st\"><b>Perte</b><i>mesure de l’erreur</i></span><pre class=\"ex\">loss = F.cross_entropy(pred, y)</pre></li><li class=\"blue\"><span class=\"st\"><b>Rétropropagation</b><i>gradients</i></span><pre class=\"ex\">opt.zero_grad(); loss.backward()</pre></li><li class=\"red\"><span class=\"st\"><b>Optimiseur</b><i>un pas</i></span><pre class=\"ex\">opt.step()   # AdamW, lr = 3e-4</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · une itération</div><p class=\"note\">Un lot d’exemples traverse le modèle (passe avant), on mesure l’erreur (perte), on calcule le gradient de la perte par rapport à chaque poids (rétropropagation), puis l’optimiseur ajuste les poids d’un petit pas. On recommence des milliers ou des millions de fois.</p><table class=\"data\"><tr><th>époque</th><td>un passage sur toutes les données</td></tr><tr><th>lot</th><td>16 à plusieurs milliers d’exemples</td></tr><tr><th>pas</th><td>taux d’apprentissage</td></tr></table>"
 },
 {
  "kicker": "4.1",
  "title": "Supervisé et non supervisé",
  "sub": "avec ou sans étiquettes",
  "body": "<table class=\"data\"><tr><th>type</th><th>données</th><th>exemples</th></tr><tr><td>supervisé</td><td>entrées + réponses attendues</td><td>classer un ticket, prédire un prix</td></tr><tr><td>non supervisé</td><td>entrées seules</td><td>regrouper des documents (k-means), réduire des dimensions</td></tr><tr><td>auto-supervisé</td><td>l’étiquette vient des données</td><td>prédire le mot suivant : le préentraînement des LLM</td></tr><tr><td>par renforcement</td><td>récompenses</td><td>RLHF, agents, jeux</td></tr></table>\n    <p class=\"lede\">Les grands modèles de langage combinent les quatre : préentraînement auto-supervisé, affinage supervisé, renforcement à partir de préférences humaines ou de vérificateurs (chapitre 10).</p>",
  "cam": {
   "target": [
    0,
    1.8,
    0
   ],
   "az": 8,
   "el": 7,
   "dist": 26
  },
  "lit": "boucle",
  "look": {},
  "scene": "boucle",
  "fig": "",
  "panel": "<h2>Un exemple de chaque</h2><div class=\"psub\">avec scikit-learn</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Supervisé</b><i>classer des tickets</i></span><pre class=\"ex\">clf = LogisticRegression().fit(X_train, y_train)\nclf.predict(X_test)</pre></li><li class=\"\"><span class=\"st\"><b>Non supervisé</b><i>regrouper des documents</i></span><pre class=\"ex\">KMeans(n_clusters=8).fit_predict(plongements)</pre></li><li class=\"red\"><span class=\"st\"><b>Auto-supervisé</b><i>l’étiquette = le mot suivant</i></span><pre class=\"ex\">entrée : « Le chat est »\ncible : « noir »</pre></li><li class=\"\"><span class=\"st\"><b>Renforcement</b><i>récompense</i></span><pre class=\"ex\">réponse → score du vérificateur → mise à jour</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "4.2",
  "title": "Entraînement et test",
  "sub": "ne jamais noter sur la copie apprise",
  "body": "<p class=\"lede\">On sépare les données en trois : <b>entraînement</b> (pour apprendre), <b>validation</b> (pour régler les choix), <b>test</b> (pour la note finale, une seule fois).</p>\n    <ul class=\"rules\"><li>Proportions typiques : 80 / 10 / 10.</li><li><b>Fuite de données</b> : un même document dans l’entraînement et le test gonfle les scores. Séparer par client, par date ou par document source.</li><li><b>Validation croisée</b> : pour les petits jeux, on tourne sur k découpages.</li><li>Pour les LLM, la <b>contamination</b> est le même problème : les questions d’un banc d’essai public se retrouvent dans le corpus d’entraînement.</li></ul>",
  "cam": {
   "target": [
    0,
    1.8,
    0
   ],
   "az": 8,
   "el": 7,
   "dist": 26,
   "auto": true
  },
  "lit": "overfit",
  "look": {},
  "scene": "overfit",
  "fig": "",
  "panel": "<h2>Découper sans fuite</h2><div class=\"psub\">la recette</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Découpage simple</b><i></i></span><pre class=\"ex\">train, test = train_test_split(df, test_size=0.2,\n    stratify=df.label, random_state=0)</pre></li><li class=\"blue\"><span class=\"st\"><b>Par groupe</b><i>un client d’un seul côté</i></span><pre class=\"ex\">GroupShuffleSplit(test_size=0.2).split(X, groups=df.client)</pre></li><li class=\"\"><span class=\"st\"><b>Par date</b><i>prédire le futur</i></span><pre class=\"ex\">train = df[df.date &lt; &quot;2026-06-01&quot;]\ntest  = df[df.date &gt;= &quot;2026-06-01&quot;]</pre></li><li class=\"red\"><span class=\"st\"><b>Doublons</b><i>vérifier</i></span><pre class=\"ex\">set(train.texte) &amp; set(test.texte)  # doit être vide</pre></li><li class=\"\"><span class=\"st\"><b>Geler le test</b><i></i></span><pre class=\"ex\">le regarder une seule fois, à la fin</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "4.3",
  "title": "Surapprentissage et sous-apprentissage",
  "sub": "trop souple ou trop rigide",
  "body": "<p class=\"lede\"><b>Sous-apprentissage</b> : le modèle est trop simple, il se trompe même sur l’entraînement. <b>Surapprentissage</b> : il colle aux exemples, bruit compris, et généralise mal.</p>\n    <table class=\"data\"><tr><th>symptôme</th><th>remède</th></tr><tr><td>erreur haute partout</td><td>modèle plus gros, meilleures variables, entraîner plus</td></tr><tr><td>entraînement bon, validation mauvaise</td><td>plus de données, régularisation (dropout, décroissance des poids), arrêt précoce, augmentation</td></tr></table>\n    <p>En affinage de LLM, le surapprentissage se voit vite : après quelques époques sur un petit jeu, le modèle récite ses exemples et oublie le reste.</p>",
  "cam": {
   "target": [
    0,
    1.8,
    0
   ],
   "az": 8,
   "el": 7,
   "dist": 26,
   "auto": true
  },
  "lit": "overfit",
  "look": {},
  "scene": "overfit",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "4.4",
  "title": "Les fonctions de perte",
  "sub": "mesurer l’erreur",
  "body": "<p class=\"lede\">La <b>perte</b> transforme l’erreur en un nombre que l’on cherche à minimiser.</p>\n    <table class=\"data\"><tr><th>perte</th><th>tâche</th></tr><tr><td>erreur quadratique moyenne (MSE)</td><td>régression : prix, durée</td></tr><tr><td>entropie croisée</td><td>classification ; prédiction du jeton suivant</td></tr><tr><td>contrastive (InfoNCE)</td><td>plongements : rapprocher les paires liées</td></tr><tr><td>préférences (DPO)</td><td>préférer la bonne réponse à la mauvaise</td></tr></table>\n    <div class=\"eq\">L = − log p(bonne réponse)</div>\n    <p>L’entropie croisée punit fort une bonne réponse jugée improbable. La <b>perplexité</b> d’un modèle de langage est l’exponentielle de cette perte moyenne.</p>",
  "cam": {
   "target": [
    0,
    1.8,
    0
   ],
   "az": 8,
   "el": 7,
   "dist": 26
  },
  "lit": "boucle",
  "look": {},
  "scene": "boucle",
  "fig": "",
  "panel": "<h2>L’entropie croisée en chiffres</h2><div class=\"psub\">prédire le mot suivant</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Logits</b><i>sortie brute</i></span><pre class=\"ex\">« noir » 2,0 · « blanc » 1,0 · « gros » 0,1</pre></li><li class=\"blue\"><span class=\"st\"><b>Softmax</b><i>probabilités</i></span><pre class=\"ex\">0,66 · 0,24 · 0,10</pre></li><li class=\"\"><span class=\"st\"><b>Bonne réponse : « noir »</b><i></i></span><pre class=\"ex\">L = −ln(0,66) = 0,42</pre></li><li class=\"red\"><span class=\"st\"><b>Bonne réponse : « gros »</b><i>jugée improbable</i></span><pre class=\"ex\">L = −ln(0,10) = 2,30</pre></li><li class=\"\"><span class=\"st\"><b>En PyTorch</b><i></i></span><pre class=\"ex\">F.cross_entropy(logits, cible)  # softmax inclus</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "4.5",
  "title": "Évaluer un modèle",
  "sub": "les métriques",
  "body": "<p class=\"lede\">La bonne métrique dépend du coût des erreurs.</p>\n    <table class=\"data\"><tr><th>métrique</th><th>quand</th></tr><tr><td>exactitude (accuracy)</td><td>classes équilibrées</td></tr><tr><td>précision</td><td>les faux positifs coûtent cher</td></tr><tr><td>rappel</td><td>les oublis coûtent cher (fraude, santé)</td></tr><tr><td>F1</td><td>compromis</td></tr><tr><td>AUC-ROC</td><td>qualité du classement, tous seuils</td></tr><tr><td>MAE, RMSE</td><td>régression</td></tr></table>\n    <p>Toujours regarder la <b>matrice de confusion</b> et une base de comparaison simple (classe majoritaire, règle métier) : 95 % d’exactitude ne vaut rien si 95 % des exemples sont de la même classe.</p>",
  "cam": {
   "target": [
    160,
    1.8,
    0
   ],
   "az": 8,
   "el": 7,
   "dist": 26,
   "auto": true
  },
  "lit": "pr",
  "look": {},
  "scene": "pr",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "4.6",
  "title": "Les réseaux de neurones",
  "sub": "des couches de fonctions simples",
  "body": "<p class=\"lede\">Un <b>neurone</b> calcule z = w·x + b, puis une activation a = φ(z). Une <b>couche</b> en contient beaucoup ; un <b>réseau</b> empile les couches.</p>\n    <p>Les premières couches apprennent des motifs simples, les suivantes les combinent en concepts plus abstraits. Personne ne programme ces motifs : ils émergent de l’entraînement.</p>\n    <p>Le <b>nombre de paramètres</b> (poids + biais) mesure la taille : 93 ici, 125 millions pour BERT-base, des centaines de milliards pour les plus grands modèles de langage.</p>",
  "cam": {
   "target": [
    40,
    1.8,
    0
   ],
   "az": 8,
   "el": 7,
   "dist": 26,
   "auto": true
  },
  "lit": "mlp",
  "look": {},
  "scene": "mlp",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "4.7",
  "title": "La rétropropagation",
  "sub": "distribuer la responsabilité de l’erreur",
  "body": "<p class=\"lede\">Après la passe avant et le calcul de la perte, la <b>rétropropagation</b> remonte le réseau couche par couche et calcule, par la règle de la chaîne (chapitre 3), le gradient de la perte par rapport à chaque poids.</p>\n    <p>Chaque couche reçoit le gradient de sa sortie, calcule celui de ses poids et celui de son entrée, et le transmet à la couche précédente.</p>\n    <p>Coût : environ deux fois la passe avant. Mémoire : il faut garder les activations de la passe avant, ce qui explique pourquoi l’entraînement demande bien plus de mémoire GPU que l’inférence (chapitre 7).</p>",
  "cam": {
   "target": [
    0,
    1.8,
    0
   ],
   "az": 8,
   "el": 7,
   "dist": 26
  },
  "lit": "boucle",
  "look": {},
  "scene": "boucle",
  "fig": "",
  "panel": "<h2>La boucle d’entraînement</h2><div class=\"psub\">cinq temps répétés</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Lot de données</b><i>ex. 32 exemples</i></span><pre class=\"ex\">for x, y in loader:</pre></li><li class=\"blue\"><span class=\"st\"><b>Passe avant</b><i>prédiction</i></span><pre class=\"ex\">pred = model(x)</pre></li><li class=\"red\"><span class=\"st\"><b>Perte</b><i>mesure de l’erreur</i></span><pre class=\"ex\">loss = F.cross_entropy(pred, y)</pre></li><li class=\"blue\"><span class=\"st\"><b>Rétropropagation</b><i>gradients</i></span><pre class=\"ex\">opt.zero_grad(); loss.backward()</pre></li><li class=\"red\"><span class=\"st\"><b>Optimiseur</b><i>un pas</i></span><pre class=\"ex\">opt.step()   # AdamW, lr = 3e-4</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · une itération</div><p class=\"note\">Un lot d’exemples traverse le modèle (passe avant), on mesure l’erreur (perte), on calcule le gradient de la perte par rapport à chaque poids (rétropropagation), puis l’optimiseur ajuste les poids d’un petit pas. On recommence des milliers ou des millions de fois.</p><table class=\"data\"><tr><th>époque</th><td>un passage sur toutes les données</td></tr><tr><th>lot</th><td>16 à plusieurs milliers d’exemples</td></tr><tr><th>pas</th><td>taux d’apprentissage</td></tr></table>"
 },
 {
  "kicker": "4.8",
  "title": "La descente de gradient",
  "sub": "et ses optimiseurs",
  "body": "<p class=\"lede\">On ne calcule pas le gradient sur toutes les données, mais sur un <b>mini-lot</b> : c’est la descente de gradient <b>stochastique</b> (SGD).</p>\n    <ul class=\"rules\"><li><b>Taux d’apprentissage</b> : trop grand, la perte diverge ; trop petit, rien ne bouge. On utilise un échauffement puis une décroissance (cosinus).</li><li><b>Momentum</b> : accumuler les gradients passés pour lisser.</li><li><b>Adam / AdamW</b> : un pas adapté à chaque paramètre ; standard pour les transformeurs.</li><li><b>Écrêtage du gradient</b> (gradient clipping) : limiter la norme pour éviter les explosions.</li></ul>",
  "cam": {
   "target": [
    120,
    1.8,
    0
   ],
   "az": 8,
   "el": 7,
   "dist": 26,
   "auto": true
  },
  "lit": "descente",
  "look": {},
  "scene": "descente",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "4.9",
  "title": "Les fonctions d’activation",
  "sub": "la non-linéarité",
  "body": "<p class=\"lede\">L’activation est ce qui permet au réseau de représenter autre chose que des droites.</p>\n    <table class=\"data\"><tr><th>activation</th><th>usage</th></tr><tr><td>ReLU</td><td>par défaut dans les réseaux classiques</td></tr><tr><td>GELU, SiLU / SwiGLU</td><td>transformeurs modernes</td></tr><tr><td>sigmoïde</td><td>sortie de probabilité binaire, portes des LSTM</td></tr><tr><td>tanh</td><td>RNN, valeurs centrées</td></tr><tr><td>softmax</td><td>sortie : distribution sur des classes ou des jetons</td></tr></table>\n    <p>La sigmoïde et tanh saturent : leurs dérivées sont presque nulles aux extrémités, ce qui étouffe les gradients dans les réseaux profonds (évanouissement du gradient). ReLU a corrigé ce problème.</p>",
  "cam": {
   "target": [
    80,
    1.8,
    0
   ],
   "az": 8,
   "el": 7,
   "dist": 26,
   "auto": true
  },
  "lit": "activ",
  "look": {},
  "scene": "activ",
  "fig": "",
  "panel": ""
 }
];
export const PLATES = {
  overfit: { text: "La perte d’entraînement baisse toujours. La perte de validation, mesurée sur des données que le modèle ne voit pas, baisse puis remonte : à partir de là le modèle apprend par cœur au lieu de généraliser. On arrête l’entraînement au minimum de la courbe rouge (arrêt précoce).", facts: () => [["entraînement", "baisse toujours"], ["validation", "baisse puis remonte"], ["remède", "arrêt précoce, régularisation, données"]] },
  mlp: { text: "Chaque neurone calcule une somme pondérée de ses entrées, ajoute un biais et applique une activation non linéaire. Empilées, ces couches peuvent approcher n’importe quelle fonction. Les grands modèles ont le même principe, avec des milliards de poids.", facts: () => [["poids", "4×6 + 6×6 + 6×3 = 78"], ["biais", "6 + 6 + 3 = 15"], ["total", "93 paramètres"]] },
  activ: { text: "Sans activation non linéaire, empiler des couches ne servirait à rien : une suite de produits de matrices reste un produit de matrices. ReLU (et ses variantes GELU, SiLU) est la plus utilisée ; la sigmoïde écrase tout entre 0 et 1 (probabilités) ; tanh entre −1 et 1.", facts: () => [["ReLU", "max(0, z)"], ["sigmoïde", "1 / (1 + e⁻ᶻ)"], ["transformeurs", "GELU, SwiGLU"]] },
  descente: { text: "SGD avance par petits pas bruités. Le momentum garde une inertie qui accélère dans les vallées mais peut osciller. Adam adapte le pas de chaque paramètre selon l’historique de ses gradients : c’est l’optimiseur par défaut des grands modèles (AdamW).", facts: () => [["SGD", "pas fixe"], ["momentum", "inertie"], ["AdamW", "pas adaptatif + décroissance des poids"]] },
  pr: { text: "Un classifieur donne un score ; le seuil décide à partir de quand on dit « oui ». Seuil haut : peu d’erreurs parmi les « oui » (précision) mais beaucoup d’oublis (rappel bas). Seuil bas : l’inverse. Le F1 résume les deux.", facts: () => [["précision", "VP / (VP + FP)"], ["rappel", "VP / (VP + FN)"], ["F1", "moyenne harmonique"]] }
};
