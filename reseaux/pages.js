// Chapitre 6 : Les réseaux de neurones profonds (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 6 · Apprentissage profond",
  "title": "Les réseaux de neurones profonds",
  "sub": "apprendre des représentations",
  "body": "<p class=\"lede\">L’<b>apprentissage profond</b> empile de nombreuses couches de neurones artificiels. Chaque couche transforme sa représentation de l’entrée : des pixels aux contours, des contours aux formes, des formes aux objets ; des lettres aux mots, des mots au sens.</p>\n    <p>Au lieu de concevoir les caractéristiques à la main, on laisse le réseau les <b>apprendre</b> à partir de grandes quantités de données, en ajustant ses paramètres par descente de gradient.</p>\n    <p>Ce chapitre suit l’histoire technique : le perceptron, les réseaux denses, la rétropropagation, les pertes et les optimiseurs, puis les architectures spécialisées (CNN, RNN, LSTM) jusqu’à l’attention et au transformeur, fondation de tous les modèles de langage.</p>",
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
  "lit": "mlp",
  "look": {},
  "scene": "mlp",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "6.1",
  "title": "Le perceptron",
  "sub": "le neurone artificiel",
  "body": "<p class=\"lede\">Le <b>perceptron</b> (Rosenblatt, 1958) fait une somme pondérée de ses entrées, ajoute un biais et compare à zéro.</p>\n    <div class=\"eq\">y = 1 si w · x + b > 0, sinon 0</div>\n    <p>Il trace une frontière droite (un hyperplan) entre deux classes. Sa règle d’apprentissage est simple : en cas d’erreur, on pousse les poids vers l’exemple mal classé. Mais un seul perceptron ne sait pas résoudre le <b>XOR</b> (ou exclusif), qui n’est pas séparable par une droite : il faut plusieurs couches.</p>",
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
  "lit": "mlp",
  "look": {},
  "scene": "mlp",
  "fig": "",
  "panel": "<h2>Un perceptron en 10 lignes</h2><div class=\"psub\">NumPy, règle d’apprentissage</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Données</b><i>porte ET</i></span><pre class=\"ex\">X = np.array([[0,0],[0,1],[1,0],[1,1]])\ny = np.array([0, 0, 0, 1])</pre></li><li class=\"\"><span class=\"st\"><b>Initialiser</b><i></i></span><pre class=\"ex\">w = np.zeros(2); b = 0.0</pre></li><li class=\"blue\"><span class=\"st\"><b>Prédire</b><i>seuil</i></span><pre class=\"ex\">pred = int(w @ x + b &gt; 0)</pre></li><li class=\"red\"><span class=\"st\"><b>Corriger</b><i>si erreur</i></span><pre class=\"ex\">w += lr * (yi - pred) * x\nb += lr * (yi - pred)</pre></li><li class=\"\"><span class=\"st\"><b>Converger</b><i></i></span><pre class=\"ex\"># ET : converge en quelques époques\n# XOR : ne converge jamais (pas séparable)</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "6.2",
  "title": "Les réseaux à propagation avant",
  "sub": "des couches empilées",
  "body": "<p class=\"lede\">Un <b>réseau à propagation avant</b> (feedforward, MLP) enchaîne des couches denses : chaque neurone d’une couche est relié à tous ceux de la suivante.</p>\n    <div class=\"eq\">h = σ(W₁x + b₁),   y = W₂h + b₂</div>\n    <p>Le <b>théorème d’approximation universelle</b> dit qu’une seule couche cachée assez large peut approcher n’importe quelle fonction continue ; en pratique, la profondeur est bien plus efficace que la largeur. Le MLP reste partout : c’est la moitié de chaque bloc de transformeur.</p>",
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
  "lit": "mlp",
  "look": {},
  "scene": "mlp",
  "fig": "",
  "panel": "<h2>Un MLP en PyTorch</h2><div class=\"psub\">classifier des vecteurs de 768 nombres</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Définir</b><i></i></span><pre class=\"ex\">model = nn.Sequential(\n  nn.Linear(768, 256), nn.ReLU(),\n  nn.Dropout(0.1),\n  nn.Linear(256, 12))</pre></li><li class=\"\"><span class=\"st\"><b>Compter</b><i>paramètres</i></span><pre class=\"ex\">sum(p.numel() for p in model.parameters())\n# 768·256 + 256 + 256·12 + 12 = 199 948</pre></li><li class=\"\"><span class=\"st\"><b>Appeler</b><i></i></span><pre class=\"ex\">logits = model(x)   # x : (32, 768) → (32, 12)</pre></li><li class=\"red\"><span class=\"st\"><b>Probabilités</b><i></i></span><pre class=\"ex\">probs = logits.softmax(-1)</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "6.3",
  "title": "Propagation avant et rétropropagation",
  "sub": "calculer, puis corriger",
  "body": "<p class=\"lede\">La <b>propagation avant</b> calcule la sortie couche par couche et garde les valeurs intermédiaires. La perte compare la sortie à la bonne réponse.</p>\n    <p>La <b>rétropropagation</b> parcourt ensuite le réseau à l’envers et applique la règle de la chaîne : à chaque couche, elle reçoit le gradient de la perte par rapport à sa sortie, calcule celui par rapport à ses poids (pour les mettre à jour) et celui par rapport à son entrée (qu’elle transmet à la couche précédente).</p>\n    <ul class=\"rules\"><li>Coût : environ deux fois la passe avant.</li><li>Mémoire : il faut garder les activations de toutes les couches ; c’est pourquoi l’entraînement consomme bien plus de mémoire que l’inférence.</li><li><b>Gradients qui disparaissent ou explosent</b> : multipliés couche après couche, ils peuvent tendre vers 0 ou l’infini. Remèdes : ReLU, normalisation, connexions résiduelles, écrêtage (clipping).</li></ul>",
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
  "lit": "mlp",
  "look": {},
  "scene": "mlp",
  "fig": "",
  "panel": "<h2>Une étape d’entraînement</h2><div class=\"psub\">les quatre lignes qui reviennent toujours</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Avant</b><i></i></span><pre class=\"ex\">logits = model(x)</pre></li><li class=\"blue\"><span class=\"st\"><b>Perte</b><i></i></span><pre class=\"ex\">loss = F.cross_entropy(logits, y)</pre></li><li class=\"red\"><span class=\"st\"><b>Arrière</b><i>rétropropagation</i></span><pre class=\"ex\">optimizer.zero_grad()\nloss.backward()   # remplit p.grad</pre></li><li class=\"\"><span class=\"st\"><b>Écrêter</b><i>facultatif</i></span><pre class=\"ex\">torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)</pre></li><li class=\"\"><span class=\"st\"><b>Mettre à jour</b><i></i></span><pre class=\"ex\">optimizer.step()</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1</div><p class=\"note\"></p>"
 },
 {
  "kicker": "6.4",
  "title": "Les fonctions de perte",
  "sub": "mesurer l’erreur",
  "body": "<p class=\"lede\">La <b>perte</b> (loss) est le nombre que l’entraînement cherche à faire baisser. Son choix dépend de la tâche.</p>\n    <table class=\"data\"><tr><th>tâche</th><th>perte</th><th>remarque</th></tr><tr><td>régression</td><td>erreur quadratique (MSE)</td><td>sensible aux valeurs aberrantes</td></tr><tr><td>régression robuste</td><td>MAE, Huber</td><td>moins sensible</td></tr><tr><td>classification</td><td>entropie croisée</td><td>sur les logits, avec softmax</td></tr><tr><td>binaire, multi-étiquette</td><td>entropie croisée binaire</td><td>sigmoïde par sortie</td></tr><tr><td>modèle de langage</td><td>entropie croisée sur le jeton suivant</td><td>perplexité = e^perte</td></tr><tr><td>plongements</td><td>contrastive (InfoNCE)</td><td>rapprocher les paires</td></tr></table>\n    <p>Pour un modèle de langage, une perte de 2,0 nats correspond à une <b>perplexité</b> de e² ≈ 7,4 : le modèle hésite en moyenne comme entre 7 jetons.</p>",
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
  "lit": "activ",
  "look": {},
  "scene": "activ",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "6.5",
  "title": "Les optimiseurs",
  "sub": "comment faire le pas",
  "body": "<p class=\"lede\">L’<b>optimiseur</b> transforme les gradients en mises à jour des poids.</p>\n    <table class=\"data\"><tr><th>optimiseur</th><th>idée</th><th>usage</th></tr><tr><td>SGD</td><td>pas = −η · gradient</td><td>vision, avec momentum</td></tr><tr><td>Momentum</td><td>accumuler une vitesse</td><td>traverser les plateaux</td></tr><tr><td>Adam</td><td>pas adapté à chaque paramètre</td><td>par défaut</td></tr><tr><td>AdamW</td><td>Adam + décroissance des poids séparée</td><td>transformeurs</td></tr><tr><td>Adafactor, Lion, Muon</td><td>moins de mémoire ou plus rapide</td><td>grands modèles</td></tr></table>\n    <p>Le <b>taux d’apprentissage</b> est l’hyperparamètre le plus important. On l’augmente progressivement au début (échauffement, warmup), puis on le fait décroître (cosinus). Adam garde deux nombres par poids : en fp32, l’optimiseur pèse deux fois le modèle.</p>",
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
  "lit": "descente",
  "look": {},
  "scene": "descente",
  "fig": "",
  "panel": "<h2>Configurer l’optimisation</h2><div class=\"psub\">le réglage standard d’un transformeur</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Optimiseur</b><i></i></span><pre class=\"ex\">opt = torch.optim.AdamW(model.parameters(),\n  lr=3e-4, betas=(0.9, 0.95), weight_decay=0.1)</pre></li><li class=\"\"><span class=\"st\"><b>Échauffement</b><i>puis cosinus</i></span><pre class=\"ex\">sched = get_cosine_schedule_with_warmup(\n  opt, num_warmup_steps=500, num_training_steps=20_000)</pre></li><li class=\"\"><span class=\"st\"><b>Chaque étape</b><i></i></span><pre class=\"ex\">opt.step(); sched.step(); opt.zero_grad()</pre></li><li class=\"red\"><span class=\"st\"><b>Diagnostic</b><i></i></span><pre class=\"ex\"># perte qui explose → lr trop fort\n# perte plate → lr trop faible ou bogue</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "6.6",
  "title": "CNN et RNN",
  "sub": "images et séquences",
  "body": "<p class=\"lede\">Avant les transformeurs, deux familles dominaient.</p>\n    <ul class=\"rules\"><li><b>Réseaux convolutifs (CNN)</b> : de petits filtres partagés glissent sur l’image. Ils exploitent la localité et l’invariance par translation. AlexNet (2012) puis ResNet (2015, connexions résiduelles) ont lancé la vague de l’apprentissage profond. Encore très utilisés en vision embarquée, en OCR, en audio.</li><li><b>Réseaux récurrents (RNN)</b> : ils lisent une séquence élément par élément en mettant à jour un état caché h_t = f(h_{t−1}, x_t). Naturels pour le texte et la parole, mais <b>séquentiels</b> (impossibles à paralléliser sur la longueur) et oublieux sur les longues séquences.</li></ul>\n    <p>Le transformeur a remplacé les RNN pour le texte, et concurrence les CNN en vision (ViT). Les idées restent : la convolution vit dans les encodeurs audio, la récurrence revient dans les modèles à espace d’états (Mamba).</p>",
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
  "lit": "conv",
  "look": {},
  "scene": "conv",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "6.7",
  "title": "LSTM et GRU",
  "sub": "des récurrents qui se souviennent",
  "body": "<p class=\"lede\">Les <b>LSTM</b> (1997) ajoutent au RNN une <b>cellule mémoire</b> et trois <b>portes</b> apprises : oubli, entrée, sortie. Les portes décident ce qu’on efface, ce qu’on écrit et ce qu’on lit dans la mémoire, ce qui laisse passer les gradients sur de longues distances.</p>\n    <p>Les <b>GRU</b> (2014) simplifient avec deux portes (mise à jour, réinitialisation) et des performances proches.</p>\n    <p>Ils ont porté la traduction automatique neuronale (seq2seq, 2014) et la reconnaissance vocale jusqu’en 2017. Aujourd’hui, on les croise encore pour des séries temporelles, du traitement embarqué et des flux à faible latence.</p>",
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
  "lit": "conv",
  "look": {},
  "scene": "conv",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "6.8",
  "title": "Les mécanismes d’attention",
  "sub": "regarder là où c’est utile",
  "body": "<p class=\"lede\">L’<b>attention</b> (Bahdanau, 2014) est née en traduction : au lieu de résumer toute la phrase source en un seul vecteur, le décodeur regarde, à chaque mot produit, les mots sources les plus pertinents.</p>\n    <div class=\"eq\">Attention(Q, K, V) = softmax(Q Kᵀ / √d) · V</div>\n    <p>Chaque position émet une <b>requête</b> Q, chaque position offre une <b>clé</b> K et une <b>valeur</b> V. Le produit scalaire requête-clé mesure la pertinence, le softmax en fait des poids, et la sortie est la moyenne pondérée des valeurs. L’<b>auto-attention</b> applique cela entre les positions d’une même séquence.</p>",
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
  "lit": "att",
  "look": {},
  "scene": "att",
  "fig": "",
  "panel": "<h2>L’attention en six lignes</h2><div class=\"psub\">une tête, avec masque causal</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Projections</b><i></i></span><pre class=\"ex\">Q, K, V = x @ Wq, x @ Wk, x @ Wv   # (n, d)</pre></li><li class=\"blue\"><span class=\"st\"><b>Scores</b><i></i></span><pre class=\"ex\">S = Q @ K.T / math.sqrt(d)        # (n, n)</pre></li><li class=\"red\"><span class=\"st\"><b>Masque causal</b><i>pas de futur</i></span><pre class=\"ex\">S = S.masked_fill(torch.triu(ones(n, n), 1).bool(), -inf)</pre></li><li class=\"\"><span class=\"st\"><b>Poids</b><i></i></span><pre class=\"ex\">A = S.softmax(-1)   # chaque ligne somme à 1</pre></li><li class=\"\"><span class=\"st\"><b>Mélange</b><i></i></span><pre class=\"ex\">out = A @ V                       # (n, d)</pre></li><li class=\"blue\"><span class=\"st\"><b>En pratique</b><i>noyau optimisé</i></span><pre class=\"ex\">F.scaled_dot_product_attention(Q, K, V, is_causal=True)</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "6.9",
  "title": "L’architecture transformeur",
  "sub": "« Attention is all you need »",
  "body": "<p class=\"lede\">Le <b>transformeur</b> (Vaswani et al., 2017) supprime la récurrence : toutes les positions sont traitées <b>en parallèle</b>, et l’attention relie directement n’importe quelles positions entre elles.</p>\n    <ul class=\"rules\"><li><b>Plongements</b> des jetons + information de <b>position</b>.</li><li><b>Attention multi-têtes</b> : plusieurs attentions en parallèle, chacune spécialisée.</li><li><b>MLP</b> appliqué à chaque position.</li><li><b>Connexions résiduelles</b> et <b>normalisation</b> (LayerNorm, RMSNorm) autour de chaque sous-bloc.</li><li>Une pile de N blocs identiques.</li></ul>\n    <p>Parallélisable sur GPU, il passe à l’échelle comme aucune architecture avant lui : c’est la base de GPT, BERT, des modèles de vision (ViT), de parole (Whisper) et de diffusion récents. Détails au chapitre 9.</p>",
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
  "lit": "transfo",
  "look": {},
  "scene": "transfo",
  "fig": "",
  "panel": "<h2>Un bloc de transformeur</h2><div class=\"psub\">répété 12 à 100 fois</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Jetons</b><i>identifiants</i></span><pre class=\"ex\">ids = tok(&#x27;Le chat dort&#x27;)  # [412, 8812, 3301]</pre></li><li class=\"blue\"><span class=\"st\"><b>Plongements</b><i>+ position</i></span><pre class=\"ex\">x = emb[ids] + pos   # (3, 4096)</pre></li><li class=\"red\"><span class=\"st\"><b>Attention</b><i>les jetons s’échangent l’information</i></span><pre class=\"ex\">x = x + Attn(Norm(x))</pre></li><li class=\"blue\"><span class=\"st\"><b>MLP</b><i>chaque jeton seul</i></span><pre class=\"ex\">x = x + MLP(Norm(x))   # 4× plus large</pre></li><li class=\"\"><span class=\"st\"><b>× N couches</b><i>même schéma</i></span><pre class=\"ex\">for bloc in blocs: x = bloc(x)</pre></li><li class=\"red\"><span class=\"st\"><b>Sortie</b><i>scores sur le vocabulaire</i></span><pre class=\"ex\">logits = x @ emb.T   # (3, 128 000)</pre></li></ol><p class=\"note\">Un transformeur est une pile de blocs identiques. Dans chaque bloc, l’attention mélange l’information entre les positions, puis un petit réseau dense (MLP) transforme chaque position séparément. Les connexions résiduelles (x + …) et la normalisation rendent la pile de 100 couches entraînable.</p><table class=\"data\"><tr><th>architecture</th><td>Vaswani et al., 2017</td></tr><tr><th>blocs</th><td>attention + MLP</td></tr><tr><th>stabilité</th><td>résiduel + normalisation</td></tr></table>"
 },
 {
  "kicker": "6.10",
  "title": "Les plongements",
  "sub": "des objets devenus vecteurs",
  "body": "<p class=\"lede\">Un <b>plongement</b> (embedding) représente un objet discret (mot, jeton, produit, utilisateur) ou complexe (phrase, image) par un vecteur dense de nombres.</p>\n    <p>Dans un réseau, la couche de plongement est une simple table : la ligne i est le vecteur du jeton i, apprise comme n’importe quel poids. Les modèles de plongement de phrases (chapitre 13) sont entraînés pour que des textes de même sens aient des vecteurs proches.</p>\n    <ul class=\"rules\"><li>word2vec (2013) : roi − homme + femme ≈ reine.</li><li>Plongements contextuels : le vecteur de « avocat » dépend de la phrase (BERT, 2018).</li><li>Usages : recherche sémantique, RAG, recommandation, regroupement, détection de doublons.</li></ul>",
  "cam": {
   "target": [
    200,
    1.8,
    0
   ],
   "az": 8,
   "el": 7,
   "dist": 26,
   "auto": true
  },
  "lit": "emb",
  "look": {},
  "scene": "emb",
  "fig": "",
  "panel": "<h2>Des plongements en pratique</h2><div class=\"psub\">une table, puis un modèle de phrases</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Table apprise</b><i>PyTorch</i></span><pre class=\"ex\">emb = nn.Embedding(50_000, 512)\nv = emb(torch.tensor([42]))   # (1, 512)</pre></li><li class=\"blue\"><span class=\"st\"><b>Modèle de phrases</b><i></i></span><pre class=\"ex\">m = SentenceTransformer(&#x27;BAAI/bge-m3&#x27;)\nE = m.encode(textes, normalize_embeddings=True)</pre></li><li class=\"red\"><span class=\"st\"><b>Comparer</b><i>cosinus</i></span><pre class=\"ex\">sim = E @ E[0]   # vecteurs normalisés</pre></li><li class=\"\"><span class=\"st\"><b>Visualiser</b><i>réduire en 2D</i></span><pre class=\"ex\">umap.UMAP(n_components=2).fit_transform(E)</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "6.11",
  "title": "L’apprentissage par transfert",
  "sub": "partir d’un modèle déjà entraîné",
  "body": "<p class=\"lede\">L’<b>apprentissage par transfert</b> réutilise un modèle pré-entraîné sur une énorme quantité de données pour une nouvelle tâche, avec peu de données.</p>\n    <table class=\"data\"><tr><th>stratégie</th><th>ce qu’on entraîne</th><th>quand</th></tr><tr><td>extraction de caractéristiques</td><td>une petite tête sur des plongements figés</td><td>très peu de données</td></tr><tr><td>affinage partiel</td><td>les dernières couches</td><td>données moyennes</td></tr><tr><td>affinage complet</td><td>tout</td><td>beaucoup de données, budget GPU</td></tr><tr><td>LoRA / PEFT</td><td>de petites matrices ajoutées</td><td>grands modèles (chapitre 19)</td></tr><tr><td>prompting</td><td>rien</td><td>modèles de langage</td></tr></table>\n    <p>C’est le principe de toute l’IA moderne : on entraîne une fois un <b>modèle de fondation</b> très coûteux, puis on l’adapte à bas coût. Pour un ingénieur IA, entraîner un modèle de zéro est l’exception.</p>",
  "cam": {
   "target": [
    200,
    1.8,
    0
   ],
   "az": 8,
   "el": 7,
   "dist": 26,
   "auto": true
  },
  "lit": "emb",
  "look": {},
  "scene": "emb",
  "fig": "",
  "panel": "<h2>Classifier des images avec 500 exemples</h2><div class=\"psub\">transfert depuis un modèle pré-entraîné</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Charger</b><i></i></span><pre class=\"ex\">m = timm.create_model(&#x27;convnext_tiny&#x27;, pretrained=True, num_classes=5)</pre></li><li class=\"blue\"><span class=\"st\"><b>Geler</b><i>le tronc</i></span><pre class=\"ex\">for p in m.parameters(): p.requires_grad = False\nfor p in m.get_classifier().parameters(): p.requires_grad = True</pre></li><li class=\"\"><span class=\"st\"><b>Entraîner la tête</b><i>quelques époques</i></span><pre class=\"ex\">opt = AdamW(m.get_classifier().parameters(), lr=1e-3)</pre></li><li class=\"red\"><span class=\"st\"><b>Dégeler</b><i>affinage léger</i></span><pre class=\"ex\">for p in m.parameters(): p.requires_grad = True\nlr = 1e-5   # petit taux</pre></li></ol><p class=\"note\"></p>"
 }
];
export const PLATES = {
  mlp: { text: "Chaque neurone fait la somme pondérée de ses entrées, ajoute un biais, puis applique une fonction d’activation. Les couches s’enchaînent : la sortie de l’une est l’entrée de la suivante. Entraîner, c’est régler les 93 nombres (des milliards dans un vrai modèle) pour que la sortie soit juste.", facts: () => [["poids", "4×6 + 6×6 + 6×3 = 78"], ["biais", "6 + 6 + 3 = 15"], ["total", "93 paramètres"]] },
  activ: { text: "Sans activation, empiler des couches revient à une seule multiplication de matrices. ReLU laisse passer le positif et coupe le négatif : simple et efficace. La sigmoïde écrase tout entre 0 et 1 (probabilité). Les transformeurs utilisent GELU ou SwiGLU, des variantes douces de ReLU.", facts: () => [["couches cachées", "ReLU, GELU, SwiGLU"], ["sortie binaire", "sigmoïde"], ["sortie multiclasse", "softmax"]] },
  descente: { text: "SGD fait un pas proportionnel au gradient. Le momentum accumule la vitesse et traverse les zones plates. Adam adapte le pas de chaque paramètre selon l’historique de ses gradients : c’est l’optimiseur par défaut des transformeurs (AdamW, avec décroissance des poids).", facts: () => [["défaut", "AdamW"], ["taux typique", "1e-4 à 3e-4"], ["mémoire Adam", "2 nombres de plus par poids"]] },
  conv: { text: "Un noyau de 3 × 3 poids glisse sur l’image et calcule à chaque position un produit scalaire. Les mêmes 9 poids servent partout : le réseau reconnaît un motif où qu’il soit. Les premières couches détectent des contours, les suivantes des formes, puis des objets.", facts: () => [["noyau", "3 × 3 = 9 poids partagés"], ["sortie", "une carte de caractéristiques"], ["appris", "les valeurs du noyau"]] },
  att: { text: "Chaque ligne montre où regarde un mot. « il » regarde surtout « chat » : l’attention a résolu la référence. Avec le masque causal, un mot ne voit que ceux qui le précèdent, ce qui permet de prédire la suite sans tricher.", facts: () => [["somme d’une ligne", "100 %"], ["masque causal", "ne regarde que le passé"], ["valeurs ici", "illustratives"]] },
  emb: { text: "Un plongement (embedding) place chaque mot, phrase ou image en un point d’un espace à plusieurs centaines de dimensions. Les choses proches par le sens sont proches dans l’espace, et certaines relations deviennent des directions.", facts: () => [["dimension", "384 à 4 096"], ["distance", "cosinus"], ["appris par", "l’entraînement"]] }
};
