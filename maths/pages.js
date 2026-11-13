// Chapitre 3 : Les mathématiques de l’IA (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 3 · Mathématiques",
  "title": "Les mathématiques de l’IA",
  "sub": "ce qu’il faut vraiment savoir",
  "body": "<p class=\"lede\">Pas besoin d’être mathématicien pour être ingénieur IA, mais trois domaines reviennent sans cesse.</p>\n    <table class=\"data\"><tr><th>domaine</th><th>sert à</th></tr><tr><td>algèbre linéaire</td><td>représenter les données et calculer les couches</td></tr><tr><td>calcul différentiel</td><td>entraîner : savoir dans quel sens corriger</td></tr><tr><td>probabilités et statistiques</td><td>modéliser l’incertitude, évaluer</td></tr></table>\n    <p>Un modèle de langage est une gigantesque fonction faite de produits de matrices ; on l’entraîne en suivant des gradients ; il produit une distribution de probabilité sur le jeton suivant. Ce chapitre donne l’intuition de chaque outil.</p>",
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
  "lit": "vec",
  "look": {},
  "scene": "vec",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "3.1",
  "title": "Vecteurs et matrices",
  "sub": "des tableaux de nombres",
  "body": "<p class=\"lede\">Un <b>vecteur</b> est une liste de nombres : un pixel (r, g, b), un mot sous forme de plongement (768 ou 4 096 nombres). Une <b>matrice</b> est un tableau à deux dimensions ; un <b>tenseur</b> généralise à n dimensions.</p>\n    <table class=\"data\"><tr><th>objet</th><th>forme</th><th>exemple</th></tr><tr><td>scalaire</td><td>()</td><td>la perte</td></tr><tr><td>vecteur</td><td>(d,)</td><td>un plongement</td></tr><tr><td>matrice</td><td>(n, d)</td><td>un lot de plongements</td></tr><tr><td>tenseur</td><td>(lot, séquence, d)</td><td>les activations d’un transformeur</td></tr></table>\n    <p>Lire la <b>forme</b> (shape) des tenseurs est l’activité quotidienne de l’ingénieur : la moitié des bogues PyTorch sont des formes incompatibles.</p>",
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
  "lit": "vec",
  "look": {},
  "scene": "vec",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "3.2",
  "title": "Le produit scalaire",
  "sub": "mesurer la ressemblance",
  "body": "<div class=\"eq\">a · b = a₁b₁ + a₂b₂ + … + aₙbₙ = |a| |b| cos θ</div>\n    <p class=\"lede\">Le produit scalaire mesure à quel point deux vecteurs vont dans la même direction. Divisé par les longueurs, il donne la <b>similarité cosinus</b>, entre −1 et 1 (chapitre 13).</p>\n    <p>Il est partout : un neurone calcule un produit scalaire entre ses poids et l’entrée ; l’attention compare une requête à des clés par produit scalaire ; une base vectorielle cherche les documents dont le produit scalaire avec la question est le plus grand.</p>",
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
  "lit": "vec",
  "look": {},
  "scene": "vec",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "3.3",
  "title": "La multiplication de matrices",
  "sub": "l’opération reine",
  "body": "<p class=\"lede\">Multiplier une matrice (m × n) par une matrice (n × p) donne une matrice (m × p) : chaque case est le produit scalaire d’une ligne et d’une colonne.</p>\n    <div class=\"eq\">y = W x + b</div>\n    <p>Une couche dense d’un réseau est exactement cela. Les dimensions intérieures doivent coïncider. Le coût est m·n·p multiplications-additions : pour un modèle de 7 milliards de paramètres, générer un jeton coûte environ 14 milliards d’opérations. Le produit n’est pas commutatif : AB ≠ BA.</p>",
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
  "lit": "matmul",
  "look": {},
  "scene": "matmul",
  "fig": "",
  "panel": "<h2>Une couche, c’est un produit de matrices</h2><div class=\"psub\">y = W·x + b</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Entrée x</b><i>vecteur de 4 nombres</i></span><pre class=\"ex\">x = torch.tensor([1., 0., 2., -1.])  # (4,)</pre></li><li class=\"red\"><span class=\"st\"><b>Matrice W</b><i>3 lignes × 4 colonnes</i></span><pre class=\"ex\">W = torch.randn(3, 4)  # (3, 4)</pre></li><li class=\"\"><span class=\"st\"><b>Produits scalaires</b><i>une ligne de W · x</i></span><pre class=\"ex\">y₀ = W[0] @ x = W₀₀·1 + W₀₁·0 + W₀₂·2 − W₀₃</pre></li><li class=\"\"><span class=\"st\"><b>Biais b</b><i>on ajoute</i></span><pre class=\"ex\">b = torch.zeros(3)</pre></li><li class=\"blue\"><span class=\"st\"><b>Sortie y</b><i>vecteur de 3 nombres</i></span><pre class=\"ex\">y = W @ x + b   # (3,)\n# = nn.Linear(4, 3)(x)</pre></li></ol><p class=\"note\">Chaque sortie est le produit scalaire d’une ligne de W avec l’entrée. Un réseau de neurones est une suite de ces produits, séparés par des fonctions non linéaires. Les GPU sont des machines à multiplier des matrices : c’est pour cela qu’ils dominent l’IA.</p><table class=\"data\"><tr><th>(m×n)·(n×p)</th><td>→ m×p</td></tr><tr><th>coût</th><td>m·n·p multiplications</td></tr><tr><th>GPU</th><td>cœurs tenseur</td></tr></table>"
 },
 {
  "kicker": "3.4",
  "title": "Valeurs propres et vecteurs propres",
  "sub": "les directions privilégiées",
  "body": "<p class=\"lede\">Un <b>vecteur propre</b> d’une matrice A est une direction que A ne fait qu’étirer : <b>A v = λ v</b>. Le facteur λ est la <b>valeur propre</b>.</p>\n    <ul class=\"rules\"><li><b>ACP</b> (analyse en composantes principales) : les vecteurs propres de la covariance donnent les directions de plus grande variance ; on s’en sert pour réduire des plongements à 2 dimensions et les visualiser.</li><li><b>SVD</b> (décomposition en valeurs singulières) : toute matrice s’écrit U Σ Vᵀ. Garder les plus grandes valeurs singulières donne une approximation de rang faible : c’est l’idée derrière <b>LoRA</b> (chapitre 19).</li><li>Stabilité : des valeurs propres plus grandes que 1 répétées couche après couche font exploser les signaux (et les gradients).</li></ul>",
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
  "lit": "matmul",
  "look": {},
  "scene": "matmul",
  "fig": "",
  "panel": "<h2>Visualiser des plongements</h2><div class=\"psub\">réduire 768 dimensions à 2</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Plongements</b><i>matrice n × d</i></span><pre class=\"ex\">X = model.encode(textes)   # (500, 768)</pre></li><li class=\"\"><span class=\"st\"><b>Centrer</b><i>moyenne nulle</i></span><pre class=\"ex\">Xc = X - X.mean(axis=0)</pre></li><li class=\"blue\"><span class=\"st\"><b>SVD</b><i>directions principales</i></span><pre class=\"ex\">U, S, Vt = np.linalg.svd(Xc, full_matrices=False)</pre></li><li class=\"\"><span class=\"st\"><b>Projeter</b><i>2 premières composantes</i></span><pre class=\"ex\">X2 = Xc @ Vt[:2].T   # (500, 2)</pre></li><li class=\"red\"><span class=\"st\"><b>Variance expliquée</b><i>ce qu’on garde</i></span><pre class=\"ex\">(S[:2]**2).sum() / (S**2).sum()</pre></li><li class=\"\"><span class=\"st\"><b>Raccourci</b><i>scikit-learn</i></span><pre class=\"ex\">PCA(n_components=2).fit_transform(X)\n# non linéaire : UMAP, t-SNE</pre></li></ol><p class=\"note\">Les vecteurs propres de la covariance (les lignes de Vt) sont les directions de plus grande variance. Une projection en 2D perd beaucoup d’information : on s’en sert pour explorer, jamais pour mesurer.</p>"
 },
 {
  "kicker": "3.5",
  "title": "Les dérivées",
  "sub": "la pente d’une fonction",
  "body": "<p class=\"lede\">La dérivée f′(x) dit de combien f change quand x bouge un tout petit peu. Positive : la fonction monte ; nulle : on est sur un plat (minimum, maximum).</p>\n    <div class=\"eq\">f′(x) = lim (f(x + h) − f(x)) / h</div>\n    <p>Entraîner un modèle, c’est chercher les paramètres qui <b>minimisent</b> une perte. La dérivée indique dans quel sens bouger chaque paramètre pour que la perte baisse. Dérivées à connaître : xⁿ → n xⁿ⁻¹, eˣ → eˣ, ln x → 1/x.</p>",
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
  "lit": "chaine",
  "look": {},
  "scene": "chaine",
  "fig": "",
  "panel": "<h2>La règle de la chaîne</h2><div class=\"psub\">les dérivées se multiplient en remontant</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>x</b><i>entrée</i></span><pre class=\"ex\">x = 2</pre></li><li class=\"\"><span class=\"st\"><b>u = g(x)</b><i>∂u/∂x</i></span><pre class=\"ex\">u = 3x = 6        ∂u/∂x = 3</pre></li><li class=\"\"><span class=\"st\"><b>v = h(u)</b><i>∂v/∂u</i></span><pre class=\"ex\">v = u² = 36       ∂v/∂u = 2u = 12</pre></li><li class=\"red\"><span class=\"st\"><b>L = f(v)</b><i>perte</i></span><pre class=\"ex\">L = v / 2 = 18    ∂L/∂v = 0,5</pre></li><li class=\"red\"><span class=\"st\"><b>∂L/∂x</b><i>= f′ · h′ · g′</i></span><pre class=\"ex\">0,5 × 12 × 3 = 18\n# PyTorch : L.backward(); x.grad → 18</pre></li></ol><p class=\"note\">Pour savoir comment la perte L varie quand on touche x, on multiplie les dérivées locales de chaque étape, en partant de la fin. La rétropropagation (chapitre 4) n’est rien d’autre que cette règle appliquée efficacement à des millions de paramètres.</p><table class=\"data\"><tr><th>règle</th><td>(f∘g)′ = f′(g) · g′</td></tr><tr><th>sens</th><td>de la sortie vers l’entrée</td></tr><tr><th>nom en IA</th><td>rétropropagation</td></tr></table>"
 },
 {
  "kicker": "3.6",
  "title": "Les dérivées partielles",
  "sub": "plusieurs variables à la fois",
  "body": "<p class=\"lede\">Quand une fonction dépend de plusieurs variables, la <b>dérivée partielle</b> ∂f/∂xᵢ mesure l’effet d’une seule en gardant les autres fixes.</p>\n    <div class=\"eq\">f(x, y) = x² y   →   ∂f/∂x = 2xy,   ∂f/∂y = x²</div>\n    <p>Une perte de modèle dépend de milliards de paramètres : on a besoin d’une dérivée partielle par paramètre. Personne ne les calcule à la main : PyTorch le fait automatiquement (autograd, chapitre 7).</p>",
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
  "lit": "chaine",
  "look": {},
  "scene": "chaine",
  "fig": "",
  "panel": "<h2>Laisser PyTorch dériver</h2><div class=\"psub\">f(x, y) = x² y</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Variables suivies</b><i>requires_grad</i></span><pre class=\"ex\">x = torch.tensor(3.0, requires_grad=True)\ny = torch.tensor(2.0, requires_grad=True)</pre></li><li class=\"\"><span class=\"st\"><b>Calcul</b><i>le graphe se construit</i></span><pre class=\"ex\">f = x**2 * y   # 18</pre></li><li class=\"red\"><span class=\"st\"><b>Dériver</b><i>en une ligne</i></span><pre class=\"ex\">f.backward()</pre></li><li class=\"\"><span class=\"st\"><b>Résultat</b><i>dérivées partielles</i></span><pre class=\"ex\">x.grad → 2xy = 12\ny.grad → x² = 9</pre></li><li class=\"\"><span class=\"st\"><b>Vérifier</b><i>différences finies</i></span><pre class=\"ex\">(f(x+h, y) - f(x, y)) / h  avec h = 1e-4</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "3.7",
  "title": "Les gradients",
  "sub": "la direction de plus forte pente",
  "body": "<p class=\"lede\">Le <b>gradient</b> ∇L rassemble toutes les dérivées partielles en un vecteur. Il pointe vers la plus forte <b>montée</b> de la perte.</p>\n    <div class=\"eq\">θ ← θ − η ∇L(θ)</div>\n    <p>La <b>descente de gradient</b> fait un petit pas dans la direction opposée, de taille η (le taux d’apprentissage). Répété des millions de fois sur des lots de données, ce pas entraîne tous les réseaux de neurones. Des gradients qui explosent ou s’annulent signalent un problème d’architecture ou de taux.</p>",
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
  "lit": "chaine",
  "look": {},
  "scene": "chaine",
  "fig": "",
  "panel": "<h2>Une descente de gradient à la main</h2><div class=\"psub\">ajuster une droite y = a x + b</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Données</b><i></i></span><pre class=\"ex\">x = torch.rand(100); y = 3*x + 1 + 0.1*torch.randn(100)</pre></li><li class=\"blue\"><span class=\"st\"><b>Paramètres</b><i>au hasard</i></span><pre class=\"ex\">a = torch.zeros(1, requires_grad=True)\nb = torch.zeros(1, requires_grad=True)</pre></li><li class=\"\"><span class=\"st\"><b>Perte</b><i>erreur quadratique</i></span><pre class=\"ex\">loss = ((a*x + b - y)**2).mean()</pre></li><li class=\"red\"><span class=\"st\"><b>Gradient</b><i></i></span><pre class=\"ex\">loss.backward()</pre></li><li class=\"\"><span class=\"st\"><b>Pas</b><i>θ ← θ − η ∇L</i></span><pre class=\"ex\">with torch.no_grad():\n    a -= 0.1 * a.grad; b -= 0.1 * b.grad\n    a.grad.zero_(); b.grad.zero_()</pre></li><li class=\"\"><span class=\"st\"><b>Répéter</b><i>500 fois</i></span><pre class=\"ex\">→ a ≈ 3, b ≈ 1</pre></li></ol><p class=\"note\">C’est exactement ce que fait un optimiseur PyTorch, pour des milliards de paramètres au lieu de deux.</p>"
 },
 {
  "kicker": "3.8",
  "title": "La règle de la chaîne",
  "sub": "dériver une composition",
  "body": "<p class=\"lede\">Si y = f(g(x)), alors dy/dx = f′(g(x)) · g′(x) : les dérivées locales se <b>multiplient</b>.</p>\n    <p>Un réseau est une composition de dizaines de couches. Pour obtenir le gradient de la perte par rapport à un poids de la première couche, on multiplie les dérivées de toutes les couches suivantes, en remontant depuis la sortie.</p>\n    <p>Calculer ce produit de la fin vers le début (mode « inverse ») réutilise les résultats intermédiaires : le gradient de <b>tous</b> les paramètres coûte à peu près deux passes avant. C’est la rétropropagation.</p>",
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
  "lit": "chaine",
  "look": {},
  "scene": "chaine",
  "fig": "",
  "panel": "<h2>La règle de la chaîne</h2><div class=\"psub\">les dérivées se multiplient en remontant</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>x</b><i>entrée</i></span><pre class=\"ex\">x = 2</pre></li><li class=\"\"><span class=\"st\"><b>u = g(x)</b><i>∂u/∂x</i></span><pre class=\"ex\">u = 3x = 6        ∂u/∂x = 3</pre></li><li class=\"\"><span class=\"st\"><b>v = h(u)</b><i>∂v/∂u</i></span><pre class=\"ex\">v = u² = 36       ∂v/∂u = 2u = 12</pre></li><li class=\"red\"><span class=\"st\"><b>L = f(v)</b><i>perte</i></span><pre class=\"ex\">L = v / 2 = 18    ∂L/∂v = 0,5</pre></li><li class=\"red\"><span class=\"st\"><b>∂L/∂x</b><i>= f′ · h′ · g′</i></span><pre class=\"ex\">0,5 × 12 × 3 = 18\n# PyTorch : L.backward(); x.grad → 18</pre></li></ol><p class=\"note\">Pour savoir comment la perte L varie quand on touche x, on multiplie les dérivées locales de chaque étape, en partant de la fin. La rétropropagation (chapitre 4) n’est rien d’autre que cette règle appliquée efficacement à des millions de paramètres.</p><table class=\"data\"><tr><th>règle</th><td>(f∘g)′ = f′(g) · g′</td></tr><tr><th>sens</th><td>de la sortie vers l’entrée</td></tr><tr><th>nom en IA</th><td>rétropropagation</td></tr></table>"
 },
 {
  "kicker": "3.9",
  "title": "Les distributions de probabilité",
  "sub": "décrire l’incertain",
  "body": "<p class=\"lede\">Une <b>distribution</b> dit quelles valeurs sont probables. Discrète (un dé, le jeton suivant) ou continue (une taille, un bruit).</p>\n    <table class=\"data\"><tr><th>loi</th><th>exemple en IA</th></tr><tr><td>catégorielle</td><td>le jeton suivant parmi 100 000</td></tr><tr><td>Bernoulli</td><td>clic ou non, spam ou non</td></tr><tr><td>normale</td><td>initialisation, bruit de diffusion</td></tr><tr><td>uniforme</td><td>tirages aléatoires</td></tr></table>\n    <p>Un modèle de langage produit, à chaque pas, une <b>distribution catégorielle</b> sur son vocabulaire (via softmax) ; la température et le top-p modifient la façon d’y tirer le jeton (chapitre 9).</p>",
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
  "lit": "gauss",
  "look": {},
  "scene": "gauss",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "3.10",
  "title": "Le théorème de Bayes",
  "sub": "réviser une croyance",
  "body": "<div class=\"eq\">P(A | B) = P(B | A) · P(A) / P(B)</div>\n    <p class=\"lede\">On part d’une croyance a priori P(A), on observe B, et on obtient la croyance a posteriori.</p>\n    <p>Exemple : un détecteur de spam repère « gratuit » dans 60 % des spams et 5 % des courriels normaux ; si 20 % des courriels sont des spams, un courriel contenant « gratuit » est un spam avec une probabilité 0,6×0,2 / (0,6×0,2 + 0,05×0,8) = <b>75 %</b>. Le même raisonnement sert à interpréter un taux de faux positifs d’un détecteur d’hallucinations.</p>",
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
  "lit": "gauss",
  "look": {},
  "scene": "gauss",
  "fig": "",
  "panel": "<h2>Le calcul pas à pas</h2><div class=\"psub\">le filtre anti-spam</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>A priori</b><i>P(spam)</i></span><pre class=\"ex\">0,20</pre></li><li class=\"\"><span class=\"st\"><b>Vraisemblance</b><i>P(« gratuit » | spam)</i></span><pre class=\"ex\">0,60</pre></li><li class=\"\"><span class=\"st\"><b>Fausse alerte</b><i>P(« gratuit » | normal)</i></span><pre class=\"ex\">0,05</pre></li><li class=\"blue\"><span class=\"st\"><b>Évidence</b><i>P(« gratuit »)</i></span><pre class=\"ex\">0,6 × 0,2 + 0,05 × 0,8 = 0,16</pre></li><li class=\"red\"><span class=\"st\"><b>A posteriori</b><i>P(spam | « gratuit »)</i></span><pre class=\"ex\">0,12 / 0,16 = 0,75</pre></li></ol><p class=\"note\">Erreur fréquente : confondre P(B | A) et P(A | B). Un détecteur qui repère 95 % des hallucinations n’implique pas que 95 % de ses alertes soient de vraies hallucinations : tout dépend de la fréquence de base.</p>"
 },
 {
  "kicker": "3.11",
  "title": "Moyenne et variance",
  "sub": "résumer des données",
  "body": "<p class=\"lede\">La <b>moyenne</b> μ donne le centre ; la <b>variance</b> σ² la dispersion moyenne au carré autour du centre ; l’<b>écart type</b> σ est sa racine.</p>\n    <div class=\"eq\">σ² = (1/n) Σ (xᵢ − μ)²</div>\n    <ul class=\"rules\"><li>La <b>normalisation</b> (LayerNorm, BatchNorm) recentre les activations à moyenne 0 et variance 1 : l’entraînement devient stable.</li><li>Une évaluation sur 50 exemples a une grande variance : un écart de 4 points entre deux prompts peut n’être que du bruit.</li><li>La médiane et les percentiles (p50, p95, p99) décrivent mieux les latences que la moyenne.</li></ul>",
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
  "lit": "gauss",
  "look": {},
  "scene": "gauss",
  "fig": "",
  "panel": "<h2>Résumer des latences</h2><div class=\"psub\">pourquoi la moyenne ment</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Mesures</b><i>temps de réponse en s</i></span><pre class=\"ex\">[0.8, 0.9, 1.0, 1.1, 0.9, 1.0, 12.4]</pre></li><li class=\"red\"><span class=\"st\"><b>Moyenne</b><i>tirée par l’extrême</i></span><pre class=\"ex\">np.mean(t) → 2,6 s</pre></li><li class=\"blue\"><span class=\"st\"><b>Médiane (p50)</b><i>le cas typique</i></span><pre class=\"ex\">np.median(t) → 1,0 s</pre></li><li class=\"\"><span class=\"st\"><b>p95 / p99</b><i>les pires cas</i></span><pre class=\"ex\">np.percentile(t, [95, 99])</pre></li><li class=\"\"><span class=\"st\"><b>Écart type</b><i>dispersion</i></span><pre class=\"ex\">np.std(t) → 4,0 s</pre></li><li class=\"\"><span class=\"st\"><b>Normaliser</b><i>z-score</i></span><pre class=\"ex\">(x - x.mean()) / x.std()</pre></li></ol><p class=\"note\">On suit les latences en percentiles (p50, p95, p99) : un utilisateur sur vingt vit le p95.</p>"
 },
 {
  "kicker": "3.12",
  "title": "L’inférence statistique",
  "sub": "conclure à partir d’un échantillon",
  "body": "<p class=\"lede\">On ne mesure jamais tout : on <b>estime</b> à partir d’un échantillon, avec une marge d’erreur.</p>\n    <ul class=\"rules\"><li><b>Intervalle de confiance</b> : sur 400 questions, 80 % de réussite donne environ ± 4 points (à 95 %).</li><li><b>Test d’hypothèse</b> : la différence entre deux versions est-elle réelle ou due au hasard ? (valeur p, test apparié).</li><li><b>Test A/B</b> : comparer deux variantes en production sur des utilisateurs répartis au hasard.</li><li><b>Bootstrap</b> : rééchantillonner les résultats pour estimer l’incertitude sans formule.</li></ul>\n    <p>Ces outils sont la base d’une évaluation honnête des systèmes d’IA (chapitre 21).</p>",
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
  "lit": "gauss",
  "look": {},
  "scene": "gauss",
  "fig": "",
  "panel": "<h2>Deux prompts sont-ils vraiment différents ?</h2><div class=\"psub\">un test apparié par bootstrap</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Résultats</b><i>mêmes 200 questions</i></span><pre class=\"ex\">a = [1, 0, 1, …]   # prompt A juste ?\nb = [1, 1, 1, …]   # prompt B</pre></li><li class=\"blue\"><span class=\"st\"><b>Écart observé</b><i></i></span><pre class=\"ex\">np.mean(b) - np.mean(a) → +0,04</pre></li><li class=\"\"><span class=\"st\"><b>Rééchantillonner</b><i>10 000 fois</i></span><pre class=\"ex\">i = rng.integers(0, 200, (10000, 200))\nd = b[i].mean(1) - a[i].mean(1)</pre></li><li class=\"red\"><span class=\"st\"><b>Intervalle à 95 %</b><i></i></span><pre class=\"ex\">np.percentile(d, [2.5, 97.5]) → [−0,01 ; +0,09]</pre></li><li class=\"\"><span class=\"st\"><b>Conclusion</b><i></i></span><pre class=\"ex\">0 est dans l’intervalle : pas de preuve\nqu’il y ait un vrai gain</pre></li></ol><p class=\"note\">Toujours comparer deux versions sur les mêmes questions (test apparié) et rapporter un intervalle, pas un seul chiffre.</p>"
 }
];
export const PLATES = {
  vec: { text: "Un vecteur est une liste de nombres, qu’on peut voir comme une flèche. Le produit scalaire de a et b est grand et positif quand ils pointent dans la même direction, nul quand ils sont perpendiculaires, négatif quand ils s’opposent. C’est la mesure de ressemblance de toute l’IA moderne : attention, recherche sémantique, recommandation.", facts: () => [["a·b", "Σ aᵢbᵢ"], ["longueur", "√(a·a)"], ["cos θ", "a·b / (|a||b|)"]] },
  gauss: { text: "La loi normale (gaussienne) est décrite par sa moyenne μ (le centre) et son écart type σ (la largeur). On la retrouve dans l’initialisation des poids, le bruit des modèles de diffusion, les erreurs de mesure. L’aire sous chaque courbe vaut 1.", facts: () => [["μ", "centre"], ["σ", "dispersion"], ["68 %", "des valeurs à ± 1σ"]] }
};
