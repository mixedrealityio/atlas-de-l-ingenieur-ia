// Chapitre 25 : MLOps et LLMOps (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 25 · MLOps",
  "title": "MLOps et LLMOps",
  "sub": "passer du prototype au produit durable",
  "body": "<p class=\"lede\">Le <b>MLOps</b> applique les pratiques DevOps (automatisation, versions, tests, surveillance) aux systèmes d’apprentissage automatique. Le <b>LLMOps</b> en est la déclinaison pour les applications de modèles de langage.</p>\n    <p>Sans ces pratiques, une application d’IA se dégrade en silence : un fournisseur change de modèle, les documents évoluent, un prompt est modifié à la hâte, les coûts dérivent. Ce chapitre présente les outils et les routines qui gardent un système sous contrôle.</p>",
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
  "lit": "cycle",
  "look": {},
  "scene": "cycle",
  "fig": "",
  "panel": "<h2>Le cycle de vie LLMOps</h2><div class=\"psub\">un système d’IA n’est jamais fini</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Données</b><i>corpus, jeux d’évaluation</i></span><pre class=\"ex\">dvc pull ; evals/v12.jsonl</pre></li><li class=\"\"><span class=\"st\"><b>Développer</b><i>prompts, RAG, agents</i></span><pre class=\"ex\">branche Git, carnet, traces locales</pre></li><li class=\"red\"><span class=\"st\"><b>Évaluer</b><i>hors ligne</i></span><pre class=\"ex\">CI : pytest evals/ → seuils</pre></li><li class=\"\"><span class=\"st\"><b>Déployer</b><i>progressivement</i></span><pre class=\"ex\">canary 10 % → 100 %</pre></li><li class=\"red\"><span class=\"st\"><b>Observer</b><i>traces, coûts, qualité</i></span><pre class=\"ex\">Langfuse, Prometheus, alertes</pre></li><li class=\"blue\"><span class=\"st\"><b>Apprendre</b><i>échecs → nouveaux cas</i></span><pre class=\"ex\">annoter les pouces bas, enrichir le jeu</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · LLMOps</div><p class=\"note\">Le MLOps industrialise le cycle de vie des modèles : données, entraînement, déploiement, surveillance. Le LLMOps l’adapte aux modèles de langage : on entraîne moins, mais on versionne et évalue des prompts, on trace des chaînes d’appels, on surveille des coûts au jeton et une qualité qui se mesure mal.</p><table class=\"data\"><tr><th>MLOps</th><td>données + modèle + code</td></tr><tr><th>LLMOps</th><td>+ prompts, traces, coûts au jeton</td></tr><tr><th>outil clé</th><td>l’évaluation automatique</td></tr></table>"
 },
 {
  "kicker": "25.1",
  "title": "Le cycle de vie des modèles",
  "sub": "ML et LLM",
  "body": "<p class=\"lede\">Les deux cycles se ressemblent, avec des centres de gravité différents.</p>\n    <table class=\"data\"><tr><th>étape</th><th>ML classique</th><th>applications LLM</th></tr><tr><td>données</td><td>jeu d’entraînement</td><td>documents (RAG), jeux d’évaluation, exemples</td></tr><tr><td>développement</td><td>entraîner des modèles</td><td>écrire prompts, chaînes, outils</td></tr><tr><td>artefact</td><td>fichier de modèle</td><td>prompt + modèle + configuration + index</td></tr><tr><td>évaluation</td><td>métriques sur un jeu de test</td><td>métriques + juges + humains</td></tr><tr><td>déploiement</td><td>servir le modèle</td><td>déployer le code, le prompt, l’index</td></tr><tr><td>surveillance</td><td>dérive des données, performance</td><td>qualité, hallucinations, coûts, latence</td></tr></table>\n    <p>Point commun : chaque version déployée doit pouvoir être reliée à son code, ses données, sa configuration et ses résultats d’évaluation.</p>",
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
  "lit": "cycle",
  "look": {},
  "scene": "cycle",
  "fig": "",
  "panel": "<h2>Le cycle de vie LLMOps</h2><div class=\"psub\">un système d’IA n’est jamais fini</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Données</b><i>corpus, jeux d’évaluation</i></span><pre class=\"ex\">dvc pull ; evals/v12.jsonl</pre></li><li class=\"\"><span class=\"st\"><b>Développer</b><i>prompts, RAG, agents</i></span><pre class=\"ex\">branche Git, carnet, traces locales</pre></li><li class=\"red\"><span class=\"st\"><b>Évaluer</b><i>hors ligne</i></span><pre class=\"ex\">CI : pytest evals/ → seuils</pre></li><li class=\"\"><span class=\"st\"><b>Déployer</b><i>progressivement</i></span><pre class=\"ex\">canary 10 % → 100 %</pre></li><li class=\"red\"><span class=\"st\"><b>Observer</b><i>traces, coûts, qualité</i></span><pre class=\"ex\">Langfuse, Prometheus, alertes</pre></li><li class=\"blue\"><span class=\"st\"><b>Apprendre</b><i>échecs → nouveaux cas</i></span><pre class=\"ex\">annoter les pouces bas, enrichir le jeu</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · LLMOps</div><p class=\"note\">Le MLOps industrialise le cycle de vie des modèles : données, entraînement, déploiement, surveillance. Le LLMOps l’adapte aux modèles de langage : on entraîne moins, mais on versionne et évalue des prompts, on trace des chaînes d’appels, on surveille des coûts au jeton et une qualité qui se mesure mal.</p><table class=\"data\"><tr><th>MLOps</th><td>données + modèle + code</td></tr><tr><th>LLMOps</th><td>+ prompts, traces, coûts au jeton</td></tr><tr><th>outil clé</th><td>l’évaluation automatique</td></tr></table>"
 },
 {
  "kicker": "25.2",
  "title": "Le suivi des expériences",
  "sub": "se souvenir de ce qu’on a essayé",
  "body": "<p class=\"lede\">Le <b>suivi d’expériences</b> enregistre, pour chaque essai, les paramètres, les données, le code, les métriques et les artefacts.</p>\n    <ul class=\"rules\"><li>Entraînement et affinage : hyperparamètres, courbes de perte, évaluation, point de contrôle.</li><li>Applications LLM : version du prompt, modèle, taille de morceau, reranker, scores d’évaluation, coût.</li><li>Comparer des dizaines d’essais côte à côte, retrouver la configuration gagnante, la reproduire.</li><li>Outils : MLflow, Weights & Biases, Comet, Neptune ; pour les prompts : Langfuse, LangSmith, Braintrust.</li></ul>",
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
  "lit": "cycle",
  "look": {},
  "scene": "cycle",
  "fig": "",
  "panel": "<h2>Le cycle de vie LLMOps</h2><div class=\"psub\">un système d’IA n’est jamais fini</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Données</b><i>corpus, jeux d’évaluation</i></span><pre class=\"ex\">dvc pull ; evals/v12.jsonl</pre></li><li class=\"\"><span class=\"st\"><b>Développer</b><i>prompts, RAG, agents</i></span><pre class=\"ex\">branche Git, carnet, traces locales</pre></li><li class=\"red\"><span class=\"st\"><b>Évaluer</b><i>hors ligne</i></span><pre class=\"ex\">CI : pytest evals/ → seuils</pre></li><li class=\"\"><span class=\"st\"><b>Déployer</b><i>progressivement</i></span><pre class=\"ex\">canary 10 % → 100 %</pre></li><li class=\"red\"><span class=\"st\"><b>Observer</b><i>traces, coûts, qualité</i></span><pre class=\"ex\">Langfuse, Prometheus, alertes</pre></li><li class=\"blue\"><span class=\"st\"><b>Apprendre</b><i>échecs → nouveaux cas</i></span><pre class=\"ex\">annoter les pouces bas, enrichir le jeu</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · LLMOps</div><p class=\"note\">Le MLOps industrialise le cycle de vie des modèles : données, entraînement, déploiement, surveillance. Le LLMOps l’adapte aux modèles de langage : on entraîne moins, mais on versionne et évalue des prompts, on trace des chaînes d’appels, on surveille des coûts au jeton et une qualité qui se mesure mal.</p><table class=\"data\"><tr><th>MLOps</th><td>données + modèle + code</td></tr><tr><th>LLMOps</th><td>+ prompts, traces, coûts au jeton</td></tr><tr><th>outil clé</th><td>l’évaluation automatique</td></tr></table>"
 },
 {
  "kicker": "25.3",
  "title": "MLflow",
  "sub": "la plateforme open source",
  "body": "<p class=\"lede\"><b>MLflow</b> (Databricks, open source) couvre le suivi d’expériences, le registre de modèles, l’évaluation et, depuis la version 3, le traçage et la gestion des prompts pour les applications génératives.</p>\n    <pre class=\"code\">mlflow.set_experiment(&#x27;rag-support&#x27;)\nwith mlflow.start_run():\n    mlflow.log_params({&#x27;chunk_size&#x27;: 600, &#x27;reranker&#x27;: &#x27;bge-v2-m3&#x27;, &#x27;prompt&#x27;: &#x27;v8&#x27;})\n    mlflow.log_metrics({&#x27;rappel@10&#x27;: 0.91, &#x27;fidelite&#x27;: 0.94, &#x27;cout_par_requete&#x27;: 0.012})\n    mlflow.log_artifact(&#x27;evals/resultats.jsonl&#x27;)\nmlflow.anthropic.autolog()   # traces automatiques des appels</pre>\n    <p>Auto-hébergeable (<code>mlflow server</code>), intégré à Databricks, Azure ML et SageMaker. Un bon choix pour une équipe qui veut un outil unique ML + LLM sous son contrôle.</p>",
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
  "lit": "cycle",
  "look": {},
  "scene": "cycle",
  "fig": "",
  "panel": "<h2>Le cycle de vie LLMOps</h2><div class=\"psub\">un système d’IA n’est jamais fini</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Données</b><i>corpus, jeux d’évaluation</i></span><pre class=\"ex\">dvc pull ; evals/v12.jsonl</pre></li><li class=\"\"><span class=\"st\"><b>Développer</b><i>prompts, RAG, agents</i></span><pre class=\"ex\">branche Git, carnet, traces locales</pre></li><li class=\"red\"><span class=\"st\"><b>Évaluer</b><i>hors ligne</i></span><pre class=\"ex\">CI : pytest evals/ → seuils</pre></li><li class=\"\"><span class=\"st\"><b>Déployer</b><i>progressivement</i></span><pre class=\"ex\">canary 10 % → 100 %</pre></li><li class=\"red\"><span class=\"st\"><b>Observer</b><i>traces, coûts, qualité</i></span><pre class=\"ex\">Langfuse, Prometheus, alertes</pre></li><li class=\"blue\"><span class=\"st\"><b>Apprendre</b><i>échecs → nouveaux cas</i></span><pre class=\"ex\">annoter les pouces bas, enrichir le jeu</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · LLMOps</div><p class=\"note\">Le MLOps industrialise le cycle de vie des modèles : données, entraînement, déploiement, surveillance. Le LLMOps l’adapte aux modèles de langage : on entraîne moins, mais on versionne et évalue des prompts, on trace des chaînes d’appels, on surveille des coûts au jeton et une qualité qui se mesure mal.</p><table class=\"data\"><tr><th>MLOps</th><td>données + modèle + code</td></tr><tr><th>LLMOps</th><td>+ prompts, traces, coûts au jeton</td></tr><tr><th>outil clé</th><td>l’évaluation automatique</td></tr></table>"
 },
 {
  "kicker": "25.4",
  "title": "Weights & Biases",
  "sub": "suivre et comparer",
  "body": "<p class=\"lede\"><b>Weights & Biases</b> (W&B, racheté par CoreWeave) est très utilisé pour le suivi d’entraînements : tableaux de bord riches, comparaisons, balayages d’hyperparamètres (sweeps), artefacts versionnés, rapports partageables.</p>\n    <pre class=\"code\">wandb.init(project=&#x27;affinage-factures&#x27;, config={&#x27;lr&#x27;: 2e-4, &#x27;r&#x27;: 16, &#x27;epochs&#x27;: 2})\nfor step, loss in entrainement():\n    wandb.log({&#x27;loss&#x27;: loss, &#x27;lr&#x27;: sched.get_last_lr()[0]}, step=step)\nwandb.log({&#x27;exactitude_test&#x27;: 0.87})</pre>\n    <p>Intégré au Trainer de Hugging Face, à TRL, à Lightning (<code>report_to='wandb'</code>). <b>Weave</b> ajoute le traçage et l’évaluation des applications LLM.</p>",
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
  "lit": "cycle",
  "look": {},
  "scene": "cycle",
  "fig": "",
  "panel": "<h2>Le cycle de vie LLMOps</h2><div class=\"psub\">un système d’IA n’est jamais fini</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Données</b><i>corpus, jeux d’évaluation</i></span><pre class=\"ex\">dvc pull ; evals/v12.jsonl</pre></li><li class=\"\"><span class=\"st\"><b>Développer</b><i>prompts, RAG, agents</i></span><pre class=\"ex\">branche Git, carnet, traces locales</pre></li><li class=\"red\"><span class=\"st\"><b>Évaluer</b><i>hors ligne</i></span><pre class=\"ex\">CI : pytest evals/ → seuils</pre></li><li class=\"\"><span class=\"st\"><b>Déployer</b><i>progressivement</i></span><pre class=\"ex\">canary 10 % → 100 %</pre></li><li class=\"red\"><span class=\"st\"><b>Observer</b><i>traces, coûts, qualité</i></span><pre class=\"ex\">Langfuse, Prometheus, alertes</pre></li><li class=\"blue\"><span class=\"st\"><b>Apprendre</b><i>échecs → nouveaux cas</i></span><pre class=\"ex\">annoter les pouces bas, enrichir le jeu</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · LLMOps</div><p class=\"note\">Le MLOps industrialise le cycle de vie des modèles : données, entraînement, déploiement, surveillance. Le LLMOps l’adapte aux modèles de langage : on entraîne moins, mais on versionne et évalue des prompts, on trace des chaînes d’appels, on surveille des coûts au jeton et une qualité qui se mesure mal.</p><table class=\"data\"><tr><th>MLOps</th><td>données + modèle + code</td></tr><tr><th>LLMOps</th><td>+ prompts, traces, coûts au jeton</td></tr><tr><th>outil clé</th><td>l’évaluation automatique</td></tr></table>"
 },
 {
  "kicker": "25.5",
  "title": "Langfuse",
  "sub": "observabilité LLM open source",
  "body": "<p class=\"lede\"><b>Langfuse</b> est une plateforme open source (auto-hébergeable) dédiée aux applications de modèles de langage : traces, gestion des prompts, jeux de données, évaluations (juges, annotation humaine), suivi des coûts.</p>\n    <pre class=\"code\">from langfuse import observe, get_client\n@observe()\nasync def repondre(question: str):\n    docs = await recuperer(question)          # étape tracée\n    return await generer(question, docs)      # appels LLM tracés\nprompt = get_client().get_prompt(&#x27;support-systeme&#x27;, label=&#x27;production&#x27;)</pre>\n    <ul class=\"rules\"><li>Intégrations : SDK OpenAI et Anthropic, LangChain, LlamaIndex, OpenTelemetry.</li><li>Prompts versionnés avec étiquettes (production, test) : changer de version sans redéployer le code.</li><li>Tableaux de bord de coûts, latence et scores par version.</li></ul>",
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
  "lit": "trace",
  "look": {},
  "scene": "trace",
  "fig": "",
  "panel": "<h2>Une trace de bout en bout</h2><div class=\"psub\">ce qu’on enregistre pour chaque requête</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Requête</b><i>utilisateur, session</i></span><pre class=\"ex\">trace_id=7f3a…, user=u42, version=app 1.8.2</pre></li><li class=\"\"><span class=\"st\"><b>Réécriture</b><i>appel LLM</i></span><pre class=\"ex\">haiku · 180 ms · 312 → 41 jetons</pre></li><li class=\"blue\"><span class=\"st\"><b>Récupération</b><i></i></span><pre class=\"ex\">hybride 95 ms · 40 candidats · rerank 140 ms · top 6</pre></li><li class=\"red\"><span class=\"st\"><b>Génération</b><i>appel LLM</i></span><pre class=\"ex\">prompt support v8 · 2,1 s · 4 812 → 356 jetons · 0,020 $</pre></li><li class=\"\"><span class=\"st\"><b>Outil</b><i></i></span><pre class=\"ex\">statut_commande(C-12) · 230 ms · ok</pre></li><li class=\"blue\"><span class=\"st\"><b>Retour</b><i></i></span><pre class=\"ex\">pouce bas : « mauvaise date » → file d’annotation</pre></li></ol><p class=\"note\">Une trace relie toutes les étapes d’une requête, avec entrées, sorties, durées, jetons, coûts et versions. C’est l’outil de débogage principal d’un système d’IA, et la matière première des évaluations.</p><table class=\"data\"><tr><th>standard</th><td>OpenTelemetry (GenAI)</td></tr><tr><th>outils</th><td>Langfuse, LangSmith, Phoenix</td></tr><tr><th>attention</th><td>données personnelles dans les traces</td></tr></table>"
 },
 {
  "kicker": "25.6",
  "title": "LangSmith",
  "sub": "la plateforme de LangChain",
  "body": "<p class=\"lede\"><b>LangSmith</b> (LangChain) trace, évalue et surveille les applications de modèles de langage, avec ou sans LangChain.</p>\n    <ul class=\"rules\"><li>Traces détaillées des chaînes et des graphes LangGraph ; visualisation des étapes d’agent.</li><li>Jeux de données et évaluations (juges, comparaisons par paires, expériences).</li><li>Files d’annotation humaine ; surveillance en ligne avec règles et alertes.</li><li>Hub de prompts, terrain de jeu pour tester un prompt sur plusieurs modèles.</li></ul>\n    <p>Service géré (option auto-hébergée pour l’entreprise). Choix naturel si l’on utilise LangGraph ; Langfuse est l’alternative open source la plus proche.</p>",
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
  "lit": "trace",
  "look": {},
  "scene": "trace",
  "fig": "",
  "panel": "<h2>Une trace de bout en bout</h2><div class=\"psub\">ce qu’on enregistre pour chaque requête</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Requête</b><i>utilisateur, session</i></span><pre class=\"ex\">trace_id=7f3a…, user=u42, version=app 1.8.2</pre></li><li class=\"\"><span class=\"st\"><b>Réécriture</b><i>appel LLM</i></span><pre class=\"ex\">haiku · 180 ms · 312 → 41 jetons</pre></li><li class=\"blue\"><span class=\"st\"><b>Récupération</b><i></i></span><pre class=\"ex\">hybride 95 ms · 40 candidats · rerank 140 ms · top 6</pre></li><li class=\"red\"><span class=\"st\"><b>Génération</b><i>appel LLM</i></span><pre class=\"ex\">prompt support v8 · 2,1 s · 4 812 → 356 jetons · 0,020 $</pre></li><li class=\"\"><span class=\"st\"><b>Outil</b><i></i></span><pre class=\"ex\">statut_commande(C-12) · 230 ms · ok</pre></li><li class=\"blue\"><span class=\"st\"><b>Retour</b><i></i></span><pre class=\"ex\">pouce bas : « mauvaise date » → file d’annotation</pre></li></ol><p class=\"note\">Une trace relie toutes les étapes d’une requête, avec entrées, sorties, durées, jetons, coûts et versions. C’est l’outil de débogage principal d’un système d’IA, et la matière première des évaluations.</p><table class=\"data\"><tr><th>standard</th><td>OpenTelemetry (GenAI)</td></tr><tr><th>outils</th><td>Langfuse, LangSmith, Phoenix</td></tr><tr><th>attention</th><td>données personnelles dans les traces</td></tr></table>"
 },
 {
  "kicker": "25.7",
  "title": "Versionner les prompts",
  "sub": "en production",
  "body": "<p class=\"lede\">Rappel du chapitre 12, vu sous l’angle des opérations.</p>\n    <ul class=\"rules\"><li><b>Où</b> : dans Git (revue de code, CI) ou dans un registre (Langfuse, LangSmith, MLflow) avec étiquettes ; souvent les deux (Git source de vérité, synchronisé vers le registre).</li><li><b>Quoi</b> : texte du gabarit, modèle, paramètres (température, max_tokens), schémas d’outils et de sortie : tout ce qui change le comportement.</li><li><b>Traçabilité</b> : chaque trace porte la version du prompt.</li><li><b>Retour arrière</b> en un clic : repasser l’étiquette « production » sur la version précédente.</li></ul>",
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
  "lit": "cycle",
  "look": {},
  "scene": "cycle",
  "fig": "",
  "panel": "<h2>Le cycle de vie LLMOps</h2><div class=\"psub\">un système d’IA n’est jamais fini</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Données</b><i>corpus, jeux d’évaluation</i></span><pre class=\"ex\">dvc pull ; evals/v12.jsonl</pre></li><li class=\"\"><span class=\"st\"><b>Développer</b><i>prompts, RAG, agents</i></span><pre class=\"ex\">branche Git, carnet, traces locales</pre></li><li class=\"red\"><span class=\"st\"><b>Évaluer</b><i>hors ligne</i></span><pre class=\"ex\">CI : pytest evals/ → seuils</pre></li><li class=\"\"><span class=\"st\"><b>Déployer</b><i>progressivement</i></span><pre class=\"ex\">canary 10 % → 100 %</pre></li><li class=\"red\"><span class=\"st\"><b>Observer</b><i>traces, coûts, qualité</i></span><pre class=\"ex\">Langfuse, Prometheus, alertes</pre></li><li class=\"blue\"><span class=\"st\"><b>Apprendre</b><i>échecs → nouveaux cas</i></span><pre class=\"ex\">annoter les pouces bas, enrichir le jeu</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · LLMOps</div><p class=\"note\">Le MLOps industrialise le cycle de vie des modèles : données, entraînement, déploiement, surveillance. Le LLMOps l’adapte aux modèles de langage : on entraîne moins, mais on versionne et évalue des prompts, on trace des chaînes d’appels, on surveille des coûts au jeton et une qualité qui se mesure mal.</p><table class=\"data\"><tr><th>MLOps</th><td>données + modèle + code</td></tr><tr><th>LLMOps</th><td>+ prompts, traces, coûts au jeton</td></tr><tr><th>outil clé</th><td>l’évaluation automatique</td></tr></table>"
 },
 {
  "kicker": "25.8",
  "title": "Versionner les modèles",
  "sub": "registre et promotion",
  "body": "<p class=\"lede\">Un <b>registre de modèles</b> garde chaque version d’un modèle (ou d’un adaptateur LoRA) avec ses métadonnées : données d’entraînement, métriques, auteur, statut.</p>\n    <ul class=\"rules\"><li>Promotion par étapes : candidat → validé → production, avec évaluation à chaque passage.</li><li>Pour les modèles d’API : épingler une <b>version datée</b> du modèle plutôt qu’un alias qui change sous vos pieds ; suivre les dates de retrait annoncées.</li><li>Outils : registre MLflow, Hugging Face Hub (dépôts privés, révisions Git), W&B Registry, registres des clouds.</li><li>Les poids vont dans un stockage d’objets ou le Hub, jamais dans Git.</li></ul>",
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
  "lit": "cycle",
  "look": {},
  "scene": "cycle",
  "fig": "",
  "panel": "<h2>Le cycle de vie LLMOps</h2><div class=\"psub\">un système d’IA n’est jamais fini</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Données</b><i>corpus, jeux d’évaluation</i></span><pre class=\"ex\">dvc pull ; evals/v12.jsonl</pre></li><li class=\"\"><span class=\"st\"><b>Développer</b><i>prompts, RAG, agents</i></span><pre class=\"ex\">branche Git, carnet, traces locales</pre></li><li class=\"red\"><span class=\"st\"><b>Évaluer</b><i>hors ligne</i></span><pre class=\"ex\">CI : pytest evals/ → seuils</pre></li><li class=\"\"><span class=\"st\"><b>Déployer</b><i>progressivement</i></span><pre class=\"ex\">canary 10 % → 100 %</pre></li><li class=\"red\"><span class=\"st\"><b>Observer</b><i>traces, coûts, qualité</i></span><pre class=\"ex\">Langfuse, Prometheus, alertes</pre></li><li class=\"blue\"><span class=\"st\"><b>Apprendre</b><i>échecs → nouveaux cas</i></span><pre class=\"ex\">annoter les pouces bas, enrichir le jeu</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · LLMOps</div><p class=\"note\">Le MLOps industrialise le cycle de vie des modèles : données, entraînement, déploiement, surveillance. Le LLMOps l’adapte aux modèles de langage : on entraîne moins, mais on versionne et évalue des prompts, on trace des chaînes d’appels, on surveille des coûts au jeton et une qualité qui se mesure mal.</p><table class=\"data\"><tr><th>MLOps</th><td>données + modèle + code</td></tr><tr><th>LLMOps</th><td>+ prompts, traces, coûts au jeton</td></tr><tr><th>outil clé</th><td>l’évaluation automatique</td></tr></table>"
 },
 {
  "kicker": "25.9",
  "title": "Versionner les données (DVC)",
  "sub": "des données reproductibles",
  "body": "<p class=\"lede\"><b>DVC</b> (Data Version Control) versionne des données et des modèles volumineux à côté du code Git : Git garde de petits fichiers de description, les données vivent dans un stockage (S3, GCS, disque partagé).</p>\n    <pre class=\"code\">dvc init\ndvc remote add -d stockage s3://mon-bucket/dvc\ndvc add data/evals.jsonl data/corpus/     # crée des .dvc à committer\ngit add data/*.dvc .gitignore &amp;&amp; git commit -m &#x27;jeu d’évaluation v12&#x27;\ndvc push                                   # envoie les données\ngit checkout v1.4 &amp;&amp; dvc pull              # retrouver les données d’une version</pre>\n    <ul class=\"rules\"><li>Pipelines reproductibles (<code>dvc.yaml</code>) : préparation → entraînement → évaluation, relancés seulement si une entrée change.</li><li>Alternatives : Hugging Face Datasets (dépôts versionnés), LakeFS, Delta Lake ou Iceberg pour les grands volumes tabulaires.</li></ul>",
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
  "lit": "cycle",
  "look": {},
  "scene": "cycle",
  "fig": "",
  "panel": "<h2>Le cycle de vie LLMOps</h2><div class=\"psub\">un système d’IA n’est jamais fini</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Données</b><i>corpus, jeux d’évaluation</i></span><pre class=\"ex\">dvc pull ; evals/v12.jsonl</pre></li><li class=\"\"><span class=\"st\"><b>Développer</b><i>prompts, RAG, agents</i></span><pre class=\"ex\">branche Git, carnet, traces locales</pre></li><li class=\"red\"><span class=\"st\"><b>Évaluer</b><i>hors ligne</i></span><pre class=\"ex\">CI : pytest evals/ → seuils</pre></li><li class=\"\"><span class=\"st\"><b>Déployer</b><i>progressivement</i></span><pre class=\"ex\">canary 10 % → 100 %</pre></li><li class=\"red\"><span class=\"st\"><b>Observer</b><i>traces, coûts, qualité</i></span><pre class=\"ex\">Langfuse, Prometheus, alertes</pre></li><li class=\"blue\"><span class=\"st\"><b>Apprendre</b><i>échecs → nouveaux cas</i></span><pre class=\"ex\">annoter les pouces bas, enrichir le jeu</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · LLMOps</div><p class=\"note\">Le MLOps industrialise le cycle de vie des modèles : données, entraînement, déploiement, surveillance. Le LLMOps l’adapte aux modèles de langage : on entraîne moins, mais on versionne et évalue des prompts, on trace des chaînes d’appels, on surveille des coûts au jeton et une qualité qui se mesure mal.</p><table class=\"data\"><tr><th>MLOps</th><td>données + modèle + code</td></tr><tr><th>LLMOps</th><td>+ prompts, traces, coûts au jeton</td></tr><tr><th>outil clé</th><td>l’évaluation automatique</td></tr></table>"
 },
 {
  "kicker": "25.10",
  "title": "Traçage et observabilité",
  "sub": "voir à l’intérieur",
  "body": "<p class=\"lede\">L’<b>observabilité</b> combine trois signaux : <b>journaux</b> (événements), <b>métriques</b> (séries chiffrées) et <b>traces</b> (le parcours d’une requête).</p>\n    <ul class=\"rules\"><li>Instrumenter avec <b>OpenTelemetry</b> : un standard, plusieurs destinations (Langfuse, Phoenix, Datadog, Grafana Tempo…). Les conventions <b>GenAI</b> nomment les attributs (modèle, jetons, coût).</li><li>Tracer les appels de modèles, la récupération, les outils, les étapes d’agent, avec les versions.</li><li>Métriques : latence p50/p95/p99, taux d’erreur, jetons et coût par minute, taux de refus, retours négatifs.</li><li><b>Données personnelles</b> : masquer ou échantillonner le contenu des prompts, durée de conservation limitée, accès restreint.</li></ul>",
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
  "lit": "trace",
  "look": {},
  "scene": "trace",
  "fig": "",
  "panel": "<h2>Une trace de bout en bout</h2><div class=\"psub\">ce qu’on enregistre pour chaque requête</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Requête</b><i>utilisateur, session</i></span><pre class=\"ex\">trace_id=7f3a…, user=u42, version=app 1.8.2</pre></li><li class=\"\"><span class=\"st\"><b>Réécriture</b><i>appel LLM</i></span><pre class=\"ex\">haiku · 180 ms · 312 → 41 jetons</pre></li><li class=\"blue\"><span class=\"st\"><b>Récupération</b><i></i></span><pre class=\"ex\">hybride 95 ms · 40 candidats · rerank 140 ms · top 6</pre></li><li class=\"red\"><span class=\"st\"><b>Génération</b><i>appel LLM</i></span><pre class=\"ex\">prompt support v8 · 2,1 s · 4 812 → 356 jetons · 0,020 $</pre></li><li class=\"\"><span class=\"st\"><b>Outil</b><i></i></span><pre class=\"ex\">statut_commande(C-12) · 230 ms · ok</pre></li><li class=\"blue\"><span class=\"st\"><b>Retour</b><i></i></span><pre class=\"ex\">pouce bas : « mauvaise date » → file d’annotation</pre></li></ol><p class=\"note\">Une trace relie toutes les étapes d’une requête, avec entrées, sorties, durées, jetons, coûts et versions. C’est l’outil de débogage principal d’un système d’IA, et la matière première des évaluations.</p><table class=\"data\"><tr><th>standard</th><td>OpenTelemetry (GenAI)</td></tr><tr><th>outils</th><td>Langfuse, LangSmith, Phoenix</td></tr><tr><th>attention</th><td>données personnelles dans les traces</td></tr></table>"
 },
 {
  "kicker": "25.11",
  "title": "Surveiller les coûts",
  "sub": "le jeton est une ressource",
  "body": "<p class=\"lede\">Les coûts d’une application d’IA varient avec l’usage, les prompts, les modèles et le comportement des agents : ils doivent être suivis en temps réel.</p>\n    <ul class=\"rules\"><li>Enregistrer jetons et coût à chaque appel, avec fonctionnalité, client, utilisateur, version.</li><li>Tableaux de bord : coût par requête, par conversation, par client ; part de chaque modèle.</li><li>Alertes de budget (quotidien, mensuel) et anomalies (un agent en boucle, un client abusif).</li><li>Indicateur clé : <b>coût par tâche réussie</b>, pas seulement coût par requête.</li></ul>",
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
  "lit": "trace",
  "look": {},
  "scene": "trace",
  "fig": "",
  "panel": "<h2>Les leviers d’économie</h2><div class=\"psub\">par ordre d’impact habituel</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Modèle</b><i></i></span><pre class=\"ex\">router les tâches simples vers un petit modèle</pre></li><li class=\"\"><span class=\"st\"><b>Cache de prompt</b><i></i></span><pre class=\"ex\">préfixes stables en tête : −50 à −90 % sur l’entrée</pre></li><li class=\"\"><span class=\"st\"><b>Contexte</b><i></i></span><pre class=\"ex\">moins de documents, mieux choisis ; historique résumé</pre></li><li class=\"\"><span class=\"st\"><b>Sortie</b><i></i></span><pre class=\"ex\">réponses plus courtes, max_tokens adapté</pre></li><li class=\"\"><span class=\"st\"><b>Lots</b><i></i></span><pre class=\"ex\">API batch pour l’asynchrone : −50 %</pre></li><li class=\"red\"><span class=\"st\"><b>Agents</b><i></i></span><pre class=\"ex\">budgets et limites de tours</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "25.12",
  "title": "Surveiller les modèles",
  "sub": "détecter la dégradation",
  "body": "<p class=\"lede\">Un système d’IA peut se dégrader sans aucune erreur technique.</p>\n    <table class=\"data\"><tr><th>risque</th><th>signal à surveiller</th></tr><tr><td>dérive des entrées</td><td>nouveaux sujets, langues, longueurs (regroupement des questions)</td></tr><tr><td>connaissances périmées</td><td>questions sans réponse, « je ne sais pas » en hausse</td></tr><tr><td>changement du fournisseur</td><td>scores des juges en ligne, longueur et format des réponses</td></tr><tr><td>qualité</td><td>pouces bas, escalades, reformulations</td></tr><tr><td>sécurité</td><td>tentatives d’injection détectées, refus, contenus signalés</td></tr><tr><td>performance</td><td>latence, erreurs, saturation du cache GPU</td></tr></table>\n    <p>Mettre des <b>alertes</b> sur des seuils et revoir chaque semaine un échantillon de traces : les tableaux de bord ne remplacent pas la lecture.</p>",
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
  "lit": "trace",
  "look": {},
  "scene": "trace",
  "fig": "",
  "panel": "<h2>Une trace de bout en bout</h2><div class=\"psub\">ce qu’on enregistre pour chaque requête</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Requête</b><i>utilisateur, session</i></span><pre class=\"ex\">trace_id=7f3a…, user=u42, version=app 1.8.2</pre></li><li class=\"\"><span class=\"st\"><b>Réécriture</b><i>appel LLM</i></span><pre class=\"ex\">haiku · 180 ms · 312 → 41 jetons</pre></li><li class=\"blue\"><span class=\"st\"><b>Récupération</b><i></i></span><pre class=\"ex\">hybride 95 ms · 40 candidats · rerank 140 ms · top 6</pre></li><li class=\"red\"><span class=\"st\"><b>Génération</b><i>appel LLM</i></span><pre class=\"ex\">prompt support v8 · 2,1 s · 4 812 → 356 jetons · 0,020 $</pre></li><li class=\"\"><span class=\"st\"><b>Outil</b><i></i></span><pre class=\"ex\">statut_commande(C-12) · 230 ms · ok</pre></li><li class=\"blue\"><span class=\"st\"><b>Retour</b><i></i></span><pre class=\"ex\">pouce bas : « mauvaise date » → file d’annotation</pre></li></ol><p class=\"note\">Une trace relie toutes les étapes d’une requête, avec entrées, sorties, durées, jetons, coûts et versions. C’est l’outil de débogage principal d’un système d’IA, et la matière première des évaluations.</p><table class=\"data\"><tr><th>standard</th><td>OpenTelemetry (GenAI)</td></tr><tr><th>outils</th><td>Langfuse, LangSmith, Phoenix</td></tr><tr><th>attention</th><td>données personnelles dans les traces</td></tr></table>"
 },
 {
  "kicker": "25.13",
  "title": "CI/CD pour les applications d’IA",
  "sub": "livrer souvent, sans casser",
  "body": "<p class=\"lede\">L’<b>intégration continue</b> (CI) et le <b>déploiement continu</b> (CD) s’appliquent aux applications d’IA, avec une étape en plus : l’évaluation.</p>\n    <ul class=\"rules\"><li>À chaque commit : lint, typage, tests unitaires, tests de contrat, évaluation de fumée (quelques dizaines de cas).</li><li>À chaque demande de fusion touchant prompts, modèles ou RAG : évaluation complète, rapport en commentaire, seuils bloquants.</li><li>Construction de l’image Docker, analyse de vulnérabilités, déploiement en préproduction.</li><li>Déploiement progressif (canary) avec surveillance des métriques et retour arrière automatique.</li><li>Réindexation du RAG : nouvel index construit à côté, évalué, puis bascule par alias.</li></ul>",
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
  "lit": "cycle",
  "look": {},
  "scene": "cycle",
  "fig": "",
  "panel": "<h2>Un pipeline GitHub Actions</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Tests</b><i></i></span><pre class=\"ex\">- run: uv sync --frozen &amp;&amp; uv run ruff check &amp;&amp; uv run pytest -q tests/</pre></li><li class=\"blue\"><span class=\"st\"><b>Évaluation</b><i>si prompts/ ou rag/ changent</i></span><pre class=\"ex\">- run: uv run python -m evals.run --jeu reference --sortie res.json\n- run: uv run python -m evals.comparer res.json base.json --max-baisse 0.01</pre></li><li class=\"\"><span class=\"st\"><b>Image</b><i></i></span><pre class=\"ex\">- uses: docker/build-push-action@v6</pre></li><li class=\"red\"><span class=\"st\"><b>Déployer</b><i></i></span><pre class=\"ex\">- run: kubectl argo rollouts set image api api=$IMAGE  # canary</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "25.14",
  "title": "Les pipelines d’évaluation automatique",
  "sub": "évaluer en continu",
  "body": "<p class=\"lede\">L’évaluation devient un pipeline à part entière, qui tourne à plusieurs moments.</p>\n    <table class=\"data\"><tr><th>moment</th><th>quoi</th><th>durée</th></tr><tr><td>commit</td><td>jeu de fumée, contrôles déterministes</td><td>minutes</td></tr><tr><td>fusion</td><td>jeu de référence complet + juges</td><td>dizaines de minutes</td></tr><tr><td>nuit</td><td>jeux étendus, adversariaux, plusieurs modèles candidats</td><td>heures</td></tr><tr><td>nouvelle version du fournisseur</td><td>requalification complète</td><td>à la demande</td></tr><tr><td>production</td><td>juges en ligne sur un échantillon</td><td>continu</td></tr></table>\n    <ul class=\"rules\"><li>Résultats stockés et comparés dans le temps (Langfuse, MLflow, Braintrust).</li><li>Les échecs de production, annotés, alimentent automatiquement le jeu de régression.</li><li>Le coût des juges se surveille aussi : modèle juge moyen, échantillonnage.</li></ul>",
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
  "lit": "cycle",
  "look": {},
  "scene": "cycle",
  "fig": "",
  "panel": "<h2>Le cycle de vie LLMOps</h2><div class=\"psub\">un système d’IA n’est jamais fini</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Données</b><i>corpus, jeux d’évaluation</i></span><pre class=\"ex\">dvc pull ; evals/v12.jsonl</pre></li><li class=\"\"><span class=\"st\"><b>Développer</b><i>prompts, RAG, agents</i></span><pre class=\"ex\">branche Git, carnet, traces locales</pre></li><li class=\"red\"><span class=\"st\"><b>Évaluer</b><i>hors ligne</i></span><pre class=\"ex\">CI : pytest evals/ → seuils</pre></li><li class=\"\"><span class=\"st\"><b>Déployer</b><i>progressivement</i></span><pre class=\"ex\">canary 10 % → 100 %</pre></li><li class=\"red\"><span class=\"st\"><b>Observer</b><i>traces, coûts, qualité</i></span><pre class=\"ex\">Langfuse, Prometheus, alertes</pre></li><li class=\"blue\"><span class=\"st\"><b>Apprendre</b><i>échecs → nouveaux cas</i></span><pre class=\"ex\">annoter les pouces bas, enrichir le jeu</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · LLMOps</div><p class=\"note\">Le MLOps industrialise le cycle de vie des modèles : données, entraînement, déploiement, surveillance. Le LLMOps l’adapte aux modèles de langage : on entraîne moins, mais on versionne et évalue des prompts, on trace des chaînes d’appels, on surveille des coûts au jeton et une qualité qui se mesure mal.</p><table class=\"data\"><tr><th>MLOps</th><td>données + modèle + code</td></tr><tr><th>LLMOps</th><td>+ prompts, traces, coûts au jeton</td></tr><tr><th>outil clé</th><td>l’évaluation automatique</td></tr></table>"
 }
];
export const PLATES = {

};
