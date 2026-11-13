// Chapitre 10 : Entraîner et aligner un modèle de langage (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 10 · Modèles de langage",
  "title": "Entraîner et aligner un modèle de langage",
  "sub": "du modèle de base à l’assistant",
  "body": "<p class=\"lede\">Un modèle de base, juste après le pré-entraînement, <b>complète</b> du texte : à la question « Quelle est la capitale de la France ? », il peut répondre par trois autres questions de quiz. Le post-entraînement en fait un assistant.</p>\n    <p>L’ingénieur IA n’entraîne presque jamais un modèle de zéro, mais il doit comprendre ces étapes : elles expliquent pourquoi un modèle suit (ou non) un format, refuse certaines demandes, raisonne, utilise des outils, et ce qu’on peut espérer d’un affinage (chapitre 19).</p>",
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
  "lit": "etapes",
  "look": {},
  "scene": "etapes",
  "fig": "",
  "panel": "<h2>De la page web à l’assistant</h2><div class=\"psub\">les étapes d’entraînement</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Données</b><i>filtrées, dédupliquées</i></span><pre class=\"ex\">15 000 milliards de jetons :\nweb, code, livres, maths</pre></li><li class=\"blue\"><span class=\"st\"><b>Pré-entraînement</b><i>jeton suivant</i></span><pre class=\"ex\">des semaines sur des milliers de GPU\n→ modèle de base</pre></li><li class=\"\"><span class=\"st\"><b>Mi-entraînement</b><i>contexte long, qualité</i></span><pre class=\"ex\">données choisies, contexte 32k → 128k</pre></li><li class=\"blue\"><span class=\"st\"><b>SFT</b><i>exemples de réponses</i></span><pre class=\"ex\">{&#x27;messages&#x27;: [user, assistant]}\n→ suit les instructions</pre></li><li class=\"red\"><span class=\"st\"><b>Préférences</b><i>RLHF, DPO</i></span><pre class=\"ex\">(prompt, préférée, rejetée)\n→ utile, honnête, inoffensif</pre></li><li class=\"red\"><span class=\"st\"><b>RL vérifiable</b><i>raisonnement</i></span><pre class=\"ex\">maths, code, tests : récompense\nsi la réponse est juste</pre></li></ol><p class=\"note\">Le pré-entraînement donne les connaissances, les étapes suivantes le comportement. Les modèles de raisonnement ajoutent un apprentissage par renforcement sur des tâches dont on peut vérifier automatiquement la réponse, qui leur apprend à « réfléchir » longuement avant de répondre.</p><table class=\"data\"><tr><th>coût pré-entraînement</th><td>≫ post-entraînement</td></tr><tr><th>SFT</th><td>dizaines de milliers d’exemples</td></tr><tr><th>préférences</th><td>centaines de milliers de paires</td></tr></table>"
 },
 {
  "kicker": "10.1",
  "title": "Le pré-entraînement",
  "sub": "absorber le monde écrit",
  "body": "<p class=\"lede\">Le <b>pré-entraînement</b> optimise une seule perte : l’entropie croisée sur le jeton suivant, sur des milliers de milliards de jetons.</p>\n    <ul class=\"rules\"><li><b>Données</b> : web filtré (FineWeb), code, livres, articles, mathématiques, données synthétiques. Le filtrage qualité et la déduplication comptent autant que le volume.</li><li><b>Calcul</b> : environ 6 × N × D opérations (N paramètres, D jetons). Un modèle de 70B sur 15 000 milliards de jetons : ≈ 6 × 10²⁴ opérations.</li><li><b>Infrastructure</b> : des milliers de GPU, parallélisme de données, de tenseurs et de pipeline, points de contrôle fréquents, gestion des pannes.</li><li><b>Lois d’échelle</b> : la perte baisse de façon prévisible ; on choisit taille et données à partir de petits essais.</li></ul>\n    <p>Le résultat sait beaucoup de choses mais n’a pas de « personnalité » : il imite la distribution de ses données.</p>",
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
  "lit": "echelle",
  "look": {},
  "scene": "echelle",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "10.2",
  "title": "Le post-entraînement",
  "sub": "donner un comportement",
  "body": "<p class=\"lede\">Le <b>post-entraînement</b> regroupe tout ce qui suit : affinage supervisé, apprentissage des préférences, apprentissage par renforcement, entraînement à la sécurité et à l’usage des outils.</p>\n    <table class=\"data\"><tr><th>technique</th><th>données</th><th>ce qu’elle apprend</th></tr><tr><td>SFT</td><td>paires instruction → réponse modèle</td><td>format, ton, suivre des consignes</td></tr><tr><td>RLHF</td><td>classements humains + modèle de récompense</td><td>préférences fines, utilité</td></tr><tr><td>DPO et variantes</td><td>paires préférée / rejetée</td><td>préférences, sans modèle de récompense</td></tr><tr><td>RL à récompense vérifiable</td><td>maths, code avec tests</td><td>raisonnement long et fiable</td></tr><tr><td>IA constitutionnelle</td><td>principes écrits, critiques du modèle</td><td>inoffensivité à grande échelle</td></tr></table>\n    <p>C’est ici que naissent les capacités que l’ingénieur exploite le plus : sortie JSON fiable, appels d’outils, refus appropriés, raisonnement.</p>",
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
  "lit": "etapes",
  "look": {},
  "scene": "etapes",
  "fig": "",
  "panel": "<h2>De la page web à l’assistant</h2><div class=\"psub\">les étapes d’entraînement</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Données</b><i>filtrées, dédupliquées</i></span><pre class=\"ex\">15 000 milliards de jetons :\nweb, code, livres, maths</pre></li><li class=\"blue\"><span class=\"st\"><b>Pré-entraînement</b><i>jeton suivant</i></span><pre class=\"ex\">des semaines sur des milliers de GPU\n→ modèle de base</pre></li><li class=\"\"><span class=\"st\"><b>Mi-entraînement</b><i>contexte long, qualité</i></span><pre class=\"ex\">données choisies, contexte 32k → 128k</pre></li><li class=\"blue\"><span class=\"st\"><b>SFT</b><i>exemples de réponses</i></span><pre class=\"ex\">{&#x27;messages&#x27;: [user, assistant]}\n→ suit les instructions</pre></li><li class=\"red\"><span class=\"st\"><b>Préférences</b><i>RLHF, DPO</i></span><pre class=\"ex\">(prompt, préférée, rejetée)\n→ utile, honnête, inoffensif</pre></li><li class=\"red\"><span class=\"st\"><b>RL vérifiable</b><i>raisonnement</i></span><pre class=\"ex\">maths, code, tests : récompense\nsi la réponse est juste</pre></li></ol><p class=\"note\">Le pré-entraînement donne les connaissances, les étapes suivantes le comportement. Les modèles de raisonnement ajoutent un apprentissage par renforcement sur des tâches dont on peut vérifier automatiquement la réponse, qui leur apprend à « réfléchir » longuement avant de répondre.</p><table class=\"data\"><tr><th>coût pré-entraînement</th><td>≫ post-entraînement</td></tr><tr><th>SFT</th><td>dizaines de milliers d’exemples</td></tr><tr><th>préférences</th><td>centaines de milliers de paires</td></tr></table>"
 },
 {
  "kicker": "10.3",
  "title": "L’affinage sur instructions",
  "sub": "apprendre à répondre",
  "body": "<p class=\"lede\">L’<b>instruction tuning</b> (affinage supervisé, SFT) entraîne le modèle de base sur des exemples « instruction → bonne réponse », au format conversation.</p>\n    <pre class=\"code\">{&#x27;messages&#x27;: [\n  {&#x27;role&#x27;: &#x27;system&#x27;, &#x27;content&#x27;: &#x27;Tu es un assistant juridique.&#x27;},\n  {&#x27;role&#x27;: &#x27;user&#x27;, &#x27;content&#x27;: &#x27;Résume ce contrat en 3 points : ...&#x27;},\n  {&#x27;role&#x27;: &#x27;assistant&#x27;, &#x27;content&#x27;: &#x27;1. Durée : 24 mois ...&#x27;}]}</pre>\n    <ul class=\"rules\"><li>La perte n’est calculée que sur les jetons de la réponse (on masque le prompt).</li><li>La <b>qualité</b> et la <b>diversité</b> priment : quelques milliers d’exemples excellents (LIMA, 2023) font mieux que des millions de médiocres.</li><li>Beaucoup de jeux sont aujourd’hui <b>synthétiques</b> : générés par un modèle plus fort, puis filtrés.</li></ul>",
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
  "lit": "etapes",
  "look": {},
  "scene": "etapes",
  "fig": "",
  "panel": "<h2>De la page web à l’assistant</h2><div class=\"psub\">les étapes d’entraînement</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Données</b><i>filtrées, dédupliquées</i></span><pre class=\"ex\">15 000 milliards de jetons :\nweb, code, livres, maths</pre></li><li class=\"blue\"><span class=\"st\"><b>Pré-entraînement</b><i>jeton suivant</i></span><pre class=\"ex\">des semaines sur des milliers de GPU\n→ modèle de base</pre></li><li class=\"\"><span class=\"st\"><b>Mi-entraînement</b><i>contexte long, qualité</i></span><pre class=\"ex\">données choisies, contexte 32k → 128k</pre></li><li class=\"blue\"><span class=\"st\"><b>SFT</b><i>exemples de réponses</i></span><pre class=\"ex\">{&#x27;messages&#x27;: [user, assistant]}\n→ suit les instructions</pre></li><li class=\"red\"><span class=\"st\"><b>Préférences</b><i>RLHF, DPO</i></span><pre class=\"ex\">(prompt, préférée, rejetée)\n→ utile, honnête, inoffensif</pre></li><li class=\"red\"><span class=\"st\"><b>RL vérifiable</b><i>raisonnement</i></span><pre class=\"ex\">maths, code, tests : récompense\nsi la réponse est juste</pre></li></ol><p class=\"note\">Le pré-entraînement donne les connaissances, les étapes suivantes le comportement. Les modèles de raisonnement ajoutent un apprentissage par renforcement sur des tâches dont on peut vérifier automatiquement la réponse, qui leur apprend à « réfléchir » longuement avant de répondre.</p><table class=\"data\"><tr><th>coût pré-entraînement</th><td>≫ post-entraînement</td></tr><tr><th>SFT</th><td>dizaines de milliers d’exemples</td></tr><tr><th>préférences</th><td>centaines de milliers de paires</td></tr></table>"
 },
 {
  "kicker": "10.4",
  "title": "RLHF et DPO",
  "sub": "apprendre des préférences",
  "body": "<p class=\"lede\">Il est plus facile de dire laquelle de deux réponses est la meilleure que d’écrire la réponse idéale. On exploite ces <b>préférences</b>.</p>\n    <ul class=\"rules\"><li><b>RLHF</b> (apprentissage par renforcement à partir de retours humains) : des annotateurs classent des réponses ; on entraîne un <b>modèle de récompense</b> qui prédit ces préférences ; puis on optimise le modèle (PPO) pour maximiser la récompense, avec une pénalité qui l’empêche de trop s’éloigner du modèle initial (divergence KL).</li><li><b>DPO</b> (Direct Preference Optimization, 2023) : une perte directe sur les paires (préférée, rejetée), sans modèle de récompense ni boucle de RL. Plus simple et stable, très utilisé en affinage (chapitre 19).</li><li><b>GRPO</b> et RL vérifiable : récompense calculée par un programme (réponse juste, tests qui passent) ; c’est ce qui a produit les modèles de raisonnement.</li></ul>\n    <p>Risque connu : le <b>piratage de la récompense</b> (reward hacking) : le modèle trouve des façons d’obtenir une bonne note sans faire ce qu’on voulait, par exemple des réponses longues et flatteuses.</p>",
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
  "lit": "etapes",
  "look": {},
  "scene": "etapes",
  "fig": "",
  "panel": "<h2>Une paire de préférence</h2><div class=\"psub\">le format des données DPO</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>prompt</b><i></i></span><pre class=\"ex\">« Mon code Python plante avec KeyError, que faire ? »</pre></li><li class=\"blue\"><span class=\"st\"><b>chosen</b><i>préférée</i></span><pre class=\"ex\">Explique la cause, propose dict.get() ou\nun test d’appartenance, donne un exemple.</pre></li><li class=\"red\"><span class=\"st\"><b>rejected</b><i>rejetée</i></span><pre class=\"ex\">« Les erreurs sont normales en programmation,\ncontinuez à apprendre ! »</pre></li><li class=\"\"><span class=\"st\"><b>Perte DPO</b><i></i></span><pre class=\"ex\">−log σ(β[(log πθ(c) − log πref(c)) − (log πθ(r) − log πref(r))])</pre></li><li class=\"\"><span class=\"st\"><b>Outil</b><i></i></span><pre class=\"ex\">trl.DPOTrainer(model, ref_model=None, beta=0.1, ...)</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "10.5",
  "title": "Les modèles de raisonnement",
  "sub": "réfléchir avant de répondre",
  "body": "<p class=\"lede\">Depuis 2024, les modèles de <b>raisonnement</b> (o1, o3, DeepSeek-R1, Claude avec réflexion étendue, Qwen3 en mode réflexion…) produisent une longue chaîne de pensée avant leur réponse finale.</p>\n    <ul class=\"rules\"><li>Entraînés par RL sur des tâches vérifiables, ils apprennent à décomposer, vérifier, revenir en arrière.</li><li>On échange du <b>calcul au moment de l’inférence</b> contre de la qualité : plus de jetons de réflexion, meilleures réponses en maths, code, planification.</li><li>Coût et latence augmentent ; on règle souvent un <b>budget de réflexion</b> (effort, nombre maximal de jetons).</li></ul>\n    <p>Pour l’ingénieur : utiliser un modèle de raisonnement pour les tâches difficiles et ponctuelles (planifier, déboguer, analyser), un modèle rapide pour les tâches simples et fréquentes (classer, extraire, reformuler). C’est la base du routage de modèles (chapitre 11).</p>",
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
  "lit": "echelle",
  "look": {},
  "scene": "echelle",
  "fig": "",
  "panel": ""
 }
];
export const PLATES = {
  echelle: { text: "La perte d’un modèle baisse de façon régulière, en loi de puissance, quand on augmente le calcul, les paramètres et les données ensemble. Ces lois permettent de prévoir le résultat d’un gros entraînement à partir de petits essais. Le rapport de Chinchilla (2022) : environ 20 jetons d’entraînement par paramètre pour un budget optimal ; les modèles actuels vont bien au-delà pour être moins chers à servir.", facts: () => [["calcul total", "≈ 6 × paramètres × jetons"], ["Chinchilla", "≈ 20 jetons / paramètre"], ["Llama 3 8B", "15 000 milliards de jetons"]] }
};
