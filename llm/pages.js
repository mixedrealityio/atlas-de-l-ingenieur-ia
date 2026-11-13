// Chapitre 9 : Comment fonctionne un modèle de langage (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 9 · Modèles de langage",
  "title": "Comment fonctionne un modèle de langage",
  "sub": "prédire le jeton suivant",
  "body": "<p class=\"lede\">Un <b>grand modèle de langage</b> (LLM) est un réseau de neurones, presque toujours un transformeur, entraîné à une tâche d’apparence modeste : <b>prédire le jeton suivant</b> d’un texte.</p>\n    <p>Pour bien prédire la suite de milliers de milliards de mots (code, articles, livres, conversations), il doit absorber de la grammaire, des faits, des styles, du raisonnement. Après un post-entraînement (chapitre 10), il devient un assistant qui suit des instructions.</p>\n    <p>Pour l’ingénieur, trois conséquences pratiques : le modèle génère <b>jeton par jeton</b> (d’où le streaming et la latence) ; il ne voit que ce qui est dans son <b>contexte</b> (d’où le RAG) ; sa sortie est <b>probabiliste</b> (d’où l’évaluation systématique).</p>",
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
  "lit": "temp",
  "look": {},
  "scene": "temp",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "9.1",
  "title": "Qu’est-ce qu’un grand modèle de langage ?",
  "sub": "une fonction de texte vers texte",
  "body": "<p class=\"lede\">Concrètement, un LLM est un fichier de poids (des milliards de nombres) et un programme qui les applique.</p>\n    <table class=\"data\"><tr><th>élément</th><th>exemple</th></tr><tr><td>architecture</td><td>décodeur transformeur, 32 à 120 couches</td></tr><tr><td>paramètres</td><td>1 à plus de 1 000 milliards</td></tr><tr><td>vocabulaire</td><td>≈ 32 000 à 260 000 jetons</td></tr><tr><td>contexte</td><td>8 000 à plus de 1 million de jetons</td></tr><tr><td>entrée</td><td>jetons du prompt</td></tr><tr><td>sortie</td><td>une distribution sur le jeton suivant</td></tr></table>\n    <ul class=\"rules\"><li>Il n’a <b>pas de mémoire</b> entre deux appels : on renvoie la conversation entière à chaque fois.</li><li>Il ne <b>consulte rien</b> par lui-même : ses connaissances s’arrêtent à sa date de coupure, sauf si on lui donne des outils ou des documents.</li><li>Il peut <b>halluciner</b> : produire un texte plausible et faux avec assurance.</li></ul>",
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
  "lit": "temp",
  "look": {},
  "scene": "temp",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "9.2",
  "title": "L’architecture transformeur",
  "sub": "vue de l’intérieur",
  "body": "<p class=\"lede\">Un LLM moderne empile des blocs identiques. Pour un texte de n jetons :</p>\n    <ul class=\"rules\"><li>Chaque jeton devient un vecteur (plongement) de dimension d (4 096 par exemple).</li><li>Dans chaque bloc, l’<b>attention</b> laisse chaque position lire les précédentes, puis un <b>MLP</b> (souvent SwiGLU) transforme chaque position.</li><li>Connexions résiduelles : chaque bloc <i>ajoute</i> une correction au flux résiduel.</li><li>À la fin, une projection vers le vocabulaire donne un logit par jeton possible.</li></ul>\n    <p>Variantes courantes : <b>RMSNorm</b> avant chaque sous-bloc, <b>RoPE</b> pour les positions, <b>GQA</b> (moins de têtes clé-valeur) pour réduire le cache, <b>mélange d’experts</b> (MoE) où chaque jeton n’active qu’une partie des MLP, attention hybride (linéaire + complète) pour les contextes longs.</p>",
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
  "lit": "att",
  "look": {},
  "scene": "att",
  "fig": "",
  "panel": "<h2>Lire le config.json d’un modèle</h2><div class=\"psub\">les nombres qui décrivent l’architecture</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Couches</b><i>num_hidden_layers</i></span><pre class=\"ex\">36</pre></li><li class=\"blue\"><span class=\"st\"><b>Largeur</b><i>hidden_size</i></span><pre class=\"ex\">4096   # dimension du flux résiduel</pre></li><li class=\"\"><span class=\"st\"><b>Têtes</b><i>num_attention_heads / num_key_value_heads</i></span><pre class=\"ex\">32 / 8   # GQA : 4 têtes partagent K et V</pre></li><li class=\"\"><span class=\"st\"><b>MLP</b><i>intermediate_size</i></span><pre class=\"ex\">12288   # ≈ 3 × largeur (SwiGLU)</pre></li><li class=\"\"><span class=\"st\"><b>Vocabulaire</b><i>vocab_size</i></span><pre class=\"ex\">151936</pre></li><li class=\"red\"><span class=\"st\"><b>Positions</b><i>rope_theta, max_position_embeddings</i></span><pre class=\"ex\">1000000, 40960</pre></li><li class=\"\"><span class=\"st\"><b>Experts</b><i>si MoE</i></span><pre class=\"ex\">num_experts: 128, num_experts_per_tok: 8</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "9.3",
  "title": "Modèles encodeurs et décodeurs",
  "sub": "deux façons de lire",
  "body": "<p class=\"lede\">La différence tient au <b>masque d’attention</b>. Un <b>encodeur</b> laisse chaque jeton regarder toute la phrase (avant et après) : idéal pour comprendre. Un <b>décodeur</b> interdit de regarder le futur : idéal pour générer.</p>\n    <table class=\"data\"><tr><th>famille</th><th>objectif d’entraînement</th><th>usages</th></tr><tr><td>encodeur</td><td>deviner des mots masqués</td><td>classification, extraction, plongements, reranking</td></tr><tr><td>décodeur</td><td>jeton suivant</td><td>chat, génération, code, agents</td></tr><tr><td>encodeur-décodeur</td><td>reconstruire ou traduire</td><td>traduction, transcription (Whisper)</td></tr></table>\n    <p>Un ingénieur combine souvent les deux : un petit encodeur rapide pour les plongements et le reranking d’un RAG, un grand décodeur pour rédiger la réponse.</p>",
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
  "lit": "famille",
  "look": {},
  "scene": "famille",
  "fig": "",
  "panel": "<h2>Trois familles de transformeurs</h2><div class=\"psub\">encodeur, décodeur, les deux</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Encodeur seul</b><i>BERT, ModernBERT</i></span><pre class=\"ex\">voit toute la phrase dans les deux sens\n→ classification, plongements, reranking</pre></li><li class=\"red\"><span class=\"st\"><b>Décodeur seul</b><i>GPT, Llama, Claude, Qwen</i></span><pre class=\"ex\">masque causal, prédit le jeton suivant\n→ génération, chat, agents</pre></li><li class=\"\"><span class=\"st\"><b>Encodeur-décodeur</b><i>T5, BART, Whisper</i></span><pre class=\"ex\">l’encodeur lit l’entrée,\nle décodeur génère en la regardant\n→ traduction, résumé, transcription</pre></li></ol><p class=\"note\">Les trois partagent les mêmes blocs ; seuls le masque d’attention et l’objectif d’entraînement changent. Les grands modèles généralistes sont presque tous des décodeurs ; les encodeurs restent les meilleurs rapport qualité/coût pour classer et faire des plongements.</p><table class=\"data\"><tr><th>génération</th><td>décodeur</td></tr><tr><th>compréhension, recherche</th><td>encodeur</td></tr><tr><th>entrée → sortie</th><td>encodeur-décodeur</td></tr></table>"
 },
 {
  "kicker": "9.4",
  "title": "L’architecture GPT",
  "sub": "le décodeur génératif",
  "body": "<p class=\"lede\"><b>GPT</b> (Generative Pre-trained Transformer, OpenAI, 2018) a fixé la recette des modèles génératifs : un décodeur seul, pré-entraîné à prédire le jeton suivant sur un énorme corpus.</p>\n    <ul class=\"rules\"><li>GPT-2 (2019, 1,5 milliard) : génération de texte cohérent.</li><li>GPT-3 (2020, 175 milliards) : apprentissage <b>en contexte</b> ; quelques exemples dans le prompt suffisent.</li><li>InstructGPT puis ChatGPT (2022) : post-entraînement pour suivre des instructions.</li><li>Aujourd’hui : Claude, Gemini, Llama, Qwen, Mistral, DeepSeek suivent tous ce schéma, avec des variantes (MoE, raisonnement long, multimodalité).</li></ul>\n    <p>La génération est <b>autorégressive</b> : chaque jeton produit est ajouté à l’entrée pour produire le suivant. C’est pourquoi le temps de réponse croît avec la longueur de la sortie.</p>",
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
  "lit": "att",
  "look": {},
  "scene": "att",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "9.5",
  "title": "L’architecture BERT",
  "sub": "l’encodeur bidirectionnel",
  "body": "<p class=\"lede\"><b>BERT</b> (Google, 2018) est un encodeur pré-entraîné en masquant 15 % des jetons et en demandant de les retrouver à partir du contexte des deux côtés.</p>\n    <p>On ne s’en sert pas pour générer, mais pour obtenir des <b>représentations</b> de texte : on ajoute une petite tête et on affine pour classer des tickets, extraire des entités, détecter une intention.</p>\n    <ul class=\"rules\"><li>Descendants : RoBERTa, DeBERTa, CamemBERT et FlauBERT (français), ModernBERT (2024, contexte 8 000 jetons).</li><li>Les modèles de plongements (BGE, E5, GTE) et de reranking (cross-encoders) sont des encodeurs de cette famille.</li><li>Pour une classification à gros volume, un encodeur affiné est 100 fois moins cher qu’un appel à un grand modèle, souvent aussi précis.</li></ul>",
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
  "lit": "famille",
  "look": {},
  "scene": "famille",
  "fig": "",
  "panel": "<h2>Trois familles de transformeurs</h2><div class=\"psub\">encodeur, décodeur, les deux</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Encodeur seul</b><i>BERT, ModernBERT</i></span><pre class=\"ex\">voit toute la phrase dans les deux sens\n→ classification, plongements, reranking</pre></li><li class=\"red\"><span class=\"st\"><b>Décodeur seul</b><i>GPT, Llama, Claude, Qwen</i></span><pre class=\"ex\">masque causal, prédit le jeton suivant\n→ génération, chat, agents</pre></li><li class=\"\"><span class=\"st\"><b>Encodeur-décodeur</b><i>T5, BART, Whisper</i></span><pre class=\"ex\">l’encodeur lit l’entrée,\nle décodeur génère en la regardant\n→ traduction, résumé, transcription</pre></li></ol><p class=\"note\">Les trois partagent les mêmes blocs ; seuls le masque d’attention et l’objectif d’entraînement changent. Les grands modèles généralistes sont presque tous des décodeurs ; les encodeurs restent les meilleurs rapport qualité/coût pour classer et faire des plongements.</p><table class=\"data\"><tr><th>génération</th><td>décodeur</td></tr><tr><th>compréhension, recherche</th><td>encodeur</td></tr><tr><th>entrée → sortie</th><td>encodeur-décodeur</td></tr></table>"
 },
 {
  "kicker": "9.6",
  "title": "La tokenisation",
  "sub": "découper le texte",
  "body": "<p class=\"lede\">La <b>tokenisation</b> découpe le texte en unités du vocabulaire. Les tokeniseurs modernes utilisent le <b>BPE</b> (Byte Pair Encoding) : on part des octets et on fusionne itérativement les paires les plus fréquentes du corpus.</p>\n    <ul class=\"rules\"><li>Mots fréquents : un seul jeton (« the », « de »). Mots rares : plusieurs morceaux.</li><li>Les espaces font souvent partie du jeton (« ▁chat » ou « Ġchat »).</li><li>Langues, code et nombres sont inégalement servis : le même contenu coûte plus cher dans certaines langues.</li><li>Les bizarreries des LLM (compter les « r » de « strawberry », arithmétique) viennent en partie du découpage.</li></ul>",
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
  "lit": "tok",
  "look": {},
  "scene": "tok",
  "fig": "",
  "panel": "<h2>Le BPE en quatre fusions</h2><div class=\"psub\">sur le corpus « bas bat bas »</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Départ</b><i>caractères</i></span><pre class=\"ex\">b a s · b a t · b a s</pre></li><li class=\"blue\"><span class=\"st\"><b>Fusion 1</b><i>paire la plus fréquente : b a</i></span><pre class=\"ex\">ba s · ba t · ba s</pre></li><li class=\"\"><span class=\"st\"><b>Fusion 2</b><i>ba s</i></span><pre class=\"ex\">bas · ba t · bas</pre></li><li class=\"\"><span class=\"st\"><b>Fusion 3</b><i>ba t</i></span><pre class=\"ex\">bas · bat · bas</pre></li><li class=\"red\"><span class=\"st\"><b>Vocabulaire</b><i></i></span><pre class=\"ex\">{b, a, s, t, ba, bas, bat}</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "9.7",
  "title": "Vocabulaire et identifiants",
  "sub": "un entier par jeton",
  "body": "<p class=\"lede\">Le <b>vocabulaire</b> est la liste fixe des jetons connus du modèle, chacun associé à un identifiant entier. Sa taille (32 000 pour Llama 2, ≈ 128 000 pour Llama 3, ≈ 150 000 pour Qwen, ≈ 200 000 pour GPT-4o) est un compromis : plus grand, le texte prend moins de jetons, mais la table de plongements et la dernière couche grossissent.</p>\n    <table class=\"data\"><tr><th>jeton spécial</th><th>rôle</th></tr><tr><td><|begin_of_text|>, <s></td><td>début de séquence</td></tr><tr><td><|im_start|>user</td><td>début d’un message (format ChatML)</td></tr><tr><td><|eot_id|>, </s></td><td>fin : le modèle s’arrête</td></tr><tr><td><tool_call></td><td>appel d’outil (selon le modèle)</td></tr><tr><td><think></td><td>début du raisonnement (selon le modèle)</td></tr></table>\n    <p>Ces jetons spéciaux sont posés par le <b>gabarit de conversation</b> (chat template). Les API commerciales les cachent ; avec un modèle ouvert, un gabarit faux dégrade fortement les réponses.</p>",
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
  "lit": "tok",
  "look": {},
  "scene": "tok",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "9.8",
  "title": "Les fenêtres de contexte",
  "sub": "ce que le modèle voit",
  "body": "<p class=\"lede\">La <b>fenêtre de contexte</b> est le nombre maximal de jetons (entrée + sortie) que le modèle traite en une fois : de 8 000 à plus d’un million selon les modèles.</p>\n    <ul class=\"rules\"><li>Tout ce que le modèle doit utiliser doit y tenir : instructions, historique, documents, résultats d’outils.</li><li>Coût et latence croissent avec la longueur ; l’attention complète coûte ∝ n².</li><li>Un long contexte n’est pas un contexte bien lu : l’information au milieu est parfois moins exploitée (« lost in the middle »), et la qualité baisse avec le bruit.</li><li>La sortie a sa propre limite (max_tokens), souvent bien plus petite.</li></ul>\n    <p>D’où l’ingénierie du contexte (chapitre 12) et le RAG (chapitres 14 et 15) : choisir ce qui entre plutôt que tout y mettre.</p>",
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
  "lit": "att",
  "look": {},
  "scene": "att",
  "fig": "",
  "panel": "<h2>Budgéter une fenêtre de 128 000 jetons</h2><div class=\"psub\">exemple d’un assistant documentaire</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Instructions système</b><i></i></span><pre class=\"ex\">≈ 2 000 jetons</pre></li><li class=\"\"><span class=\"st\"><b>Définitions d’outils</b><i></i></span><pre class=\"ex\">≈ 3 000 jetons</pre></li><li class=\"\"><span class=\"st\"><b>Historique résumé</b><i></i></span><pre class=\"ex\">≈ 4 000 jetons</pre></li><li class=\"blue\"><span class=\"st\"><b>Documents récupérés</b><i></i></span><pre class=\"ex\">≈ 20 000 jetons (10 × 2 000)</pre></li><li class=\"\"><span class=\"st\"><b>Question</b><i></i></span><pre class=\"ex\">≈ 200 jetons</pre></li><li class=\"red\"><span class=\"st\"><b>Réserve de sortie</b><i>max_tokens</i></span><pre class=\"ex\">≈ 4 000 jetons</pre></li><li class=\"\"><span class=\"st\"><b>Marge</b><i></i></span><pre class=\"ex\">le reste : ne pas viser 100 %</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "9.9",
  "title": "L’encodage des positions",
  "sub": "savoir qui vient avant qui",
  "body": "<p class=\"lede\">L’attention est insensible à l’ordre : sans information de position, « le chien mord l’homme » et « l’homme mord le chien » seraient identiques. On injecte donc la position.</p>\n    <table class=\"data\"><tr><th>méthode</th><th>principe</th><th>modèles</th></tr><tr><td>sinusoïdale</td><td>vecteur fixe ajouté au plongement</td><td>transformeur original</td></tr><tr><td>apprise</td><td>un vecteur appris par position</td><td>BERT, GPT-2</td></tr><tr><td>RoPE</td><td>rotation des requêtes et clés selon la position</td><td>Llama, Qwen, Mistral…</td></tr><tr><td>ALiBi</td><td>pénalité selon la distance</td><td>quelques modèles</td></tr></table>\n    <p>Avec <b>RoPE</b>, le produit requête-clé ne dépend que de la distance relative entre jetons. On peut étendre la fenêtre d’un modèle après coup en ajustant la fréquence de base des rotations (YaRN, NTK), avec un peu d’affinage sur des textes longs.</p>",
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
  "lit": "att",
  "look": {},
  "scene": "att",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "9.10",
  "title": "L’auto-attention et l’attention multi-têtes",
  "sub": "le cœur du transformeur",
  "body": "<p class=\"lede\">Dans l’<b>auto-attention</b>, chaque jeton calcule une requête Q, une clé K et une valeur V. Il compare sa requête aux clés des autres jetons, et récupère une moyenne de leurs valeurs pondérée par ces scores.</p>\n    <div class=\"eq\">MultiHead(x) = Concat(tête₁, …, têteₕ) · Wₒ</div>\n    <ul class=\"rules\"><li>Les <b>têtes</b> multiples (32, 64…) travaillent en parallèle dans des sous-espaces différents : l’une suit l’accord sujet-verbe, une autre les références, une autre copie un motif déjà vu.</li><li><b>MQA / GQA</b> : plusieurs têtes de requête partagent les mêmes K et V, ce qui divise la taille du cache clé-valeur.</li><li><b>FlashAttention</b> calcule le même résultat sans matérialiser la matrice n × n, beaucoup plus vite.</li></ul>",
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
  "lit": "att",
  "look": {},
  "scene": "att",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "9.11",
  "title": "Pré-entraînement et post-entraînement",
  "sub": "deux grandes phases",
  "body": "<p class=\"lede\">Un modèle comme ceux qu’on appelle par API naît en deux temps.</p>\n    <table class=\"data\"><tr><th>phase</th><th>données</th><th>résultat</th></tr><tr><td>pré-entraînement</td><td>des milliers de milliards de jetons du web, de livres, de code</td><td>un modèle de base qui complète du texte</td></tr><tr><td>post-entraînement</td><td>instructions, conversations, préférences, tâches vérifiables</td><td>un assistant utile, sûr, qui raisonne</td></tr></table>\n    <p>Le pré-entraînement coûte des millions de dollars et des mois de GPU ; il donne les <b>connaissances</b> et les capacités. Le post-entraînement, bien moins coûteux, donne le <b>comportement</b> : format de réponse, ton, refus, usage des outils, raisonnement pas à pas. Détails au chapitre 10.</p>",
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
  "lit": "temp",
  "look": {},
  "scene": "temp",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "9.12",
  "title": "Les paramètres d’un modèle",
  "sub": "ce que « 70B » veut dire",
  "body": "<p class=\"lede\">Le nombre de <b>paramètres</b> (poids) donne la taille du modèle : « 8B » = 8 milliards. Il détermine la mémoire nécessaire et, en partie, la qualité.</p>\n    <table class=\"data\"><tr><th>précision</th><th>octets par paramètre</th><th>8B</th><th>70B</th></tr><tr><td>fp32</td><td>4</td><td>32 Go</td><td>280 Go</td></tr><tr><td>bf16</td><td>2</td><td>16 Go</td><td>140 Go</td></tr><tr><td>8 bits</td><td>1</td><td>8 Go</td><td>70 Go</td></tr><tr><td>4 bits</td><td>≈ 0,5</td><td>≈ 5 Go</td><td>≈ 40 Go</td></tr></table>\n    <ul class=\"rules\"><li>Un <b>MoE</b> « 235B-A22B » stocke 235 milliards de paramètres mais n’en active que 22 par jeton : mémoire d’un gros, vitesse d’un moyen.</li><li>Il faut ajouter le <b>cache clé-valeur</b>, qui grossit avec le contexte et le nombre d’utilisateurs.</li><li>Les <b>paramètres de génération</b> (température, top-p, max_tokens) sont autre chose : des réglages au moment de l’appel.</li></ul>",
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
  "lit": "temp",
  "look": {},
  "scene": "temp",
  "fig": "",
  "panel": "<h2>Réglages de génération</h2><div class=\"psub\">ce qu’on passe à chaque appel</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>temperature</b><i>aléa</i></span><pre class=\"ex\">0 à 0,3 : extraction, code\n0,7 à 1 : rédaction, idées</pre></li><li class=\"\"><span class=\"st\"><b>top_p</b><i>noyau</i></span><pre class=\"ex\">0,9 : ne tirer que dans les 90 % de probabilité cumulée</pre></li><li class=\"\"><span class=\"st\"><b>max_tokens</b><i>longueur max de sortie</i></span><pre class=\"ex\">1024 ; prévoir large pour le raisonnement</pre></li><li class=\"\"><span class=\"st\"><b>stop</b><i></i></span><pre class=\"ex\">[&#x27;\\n\\nQuestion:&#x27;]</pre></li><li class=\"\"><span class=\"st\"><b>seed</b><i>si disponible</i></span><pre class=\"ex\">reproductibilité partielle</pre></li><li class=\"red\"><span class=\"st\"><b>Attention</b><i></i></span><pre class=\"ex\">modèles de raisonnement : souvent température fixée</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "9.13",
  "title": "Modèles ouverts et propriétaires",
  "sub": "choisir son modèle",
  "body": "<p class=\"lede\">Deux mondes coexistent, et la plupart des systèmes en production combinent les deux.</p>\n    <table class=\"data\"><tr><th>critère</th><th>propriétaires (API)</th><th>ouverts (poids publiés)</th></tr><tr><td>exemples</td><td>Claude, GPT, Gemini</td><td>Llama, Qwen, Mistral, DeepSeek, Gemma</td></tr><tr><td>qualité de pointe</td><td>généralement en tête</td><td>proches, avec un décalage</td></tr><tr><td>mise en route</td><td>une clé d’API</td><td>GPU, serveur d’inférence</td></tr><tr><td>coût</td><td>au jeton</td><td>matériel, fixe</td></tr><tr><td>données</td><td>envoyées au fournisseur</td><td>restent chez vous</td></tr><tr><td>personnalisation</td><td>limitée</td><td>affinage complet possible</td></tr><tr><td>dépendance</td><td>au fournisseur</td><td>à votre équipe</td></tr></table>\n    <p>Lire la <b>licence</b> : Apache 2.0 et MIT sont permissives ; d’autres limitent l’usage commercial ou imposent des conditions. « Ouvert » désigne souvent les poids seulement, pas les données ni le code d’entraînement.</p>",
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
  "lit": "famille",
  "look": {},
  "scene": "famille",
  "fig": "",
  "panel": "<h2>Trois familles de transformeurs</h2><div class=\"psub\">encodeur, décodeur, les deux</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Encodeur seul</b><i>BERT, ModernBERT</i></span><pre class=\"ex\">voit toute la phrase dans les deux sens\n→ classification, plongements, reranking</pre></li><li class=\"red\"><span class=\"st\"><b>Décodeur seul</b><i>GPT, Llama, Claude, Qwen</i></span><pre class=\"ex\">masque causal, prédit le jeton suivant\n→ génération, chat, agents</pre></li><li class=\"\"><span class=\"st\"><b>Encodeur-décodeur</b><i>T5, BART, Whisper</i></span><pre class=\"ex\">l’encodeur lit l’entrée,\nle décodeur génère en la regardant\n→ traduction, résumé, transcription</pre></li></ol><p class=\"note\">Les trois partagent les mêmes blocs ; seuls le masque d’attention et l’objectif d’entraînement changent. Les grands modèles généralistes sont presque tous des décodeurs ; les encodeurs restent les meilleurs rapport qualité/coût pour classer et faire des plongements.</p><table class=\"data\"><tr><th>génération</th><td>décodeur</td></tr><tr><th>compréhension, recherche</th><td>encodeur</td></tr><tr><th>entrée → sortie</th><td>encodeur-décodeur</td></tr></table>"
 }
];
export const PLATES = {
  tok: { text: "Le modèle ne voit jamais de lettres : il voit une suite d’entiers, un par jeton. Tout ce qu’il « sait » de l’orthographe, il doit l’avoir appris à travers ce découpage, ce qui explique sa difficulté à compter les lettres d’un mot.", facts: () => [["jetons", "10"], ["vocabulaire typique", "32 000 à 260 000"], ["caractères", "46"]] },
  temp: { text: "À chaque pas, le modèle produit un score (logit) par jeton du vocabulaire. Le softmax en fait des probabilités ; la température les aplatit ou les durcit ; on tire un jeton, on l’ajoute au texte, et on recommence. Tout le texte généré sort de cette boucle.", facts: () => [["entrée", "le contexte entier"], ["formule", "p = softmax(z / T)"], ["T → 0", "choix du plus probable"]] },
  att: { text: "Dans un modèle décodeur, chaque jeton ne regarde que les jetons précédents (masque causal, triangle). Chaque couche a des dizaines de têtes d’attention, chacune avec son propre motif : certaines suivent la syntaxe, d’autres les références, d’autres recopient.", facts: () => [["somme d’une ligne", "100 %"], ["coût", "∝ n² en longueur"], ["valeurs ici", "illustratives"]] }
};
