// Chapitre 17 : Les systèmes agentiques (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 17 · Agents",
  "title": "Les systèmes agentiques",
  "sub": "passer de la démo à la production",
  "body": "<p class=\"lede\">Un agent qui marche 7 fois sur 10 en démonstration ne suffit pas en production. Les <b>systèmes agentiques</b> combinent un ou plusieurs agents, des humains, des contrôles et une observation continue pour obtenir un comportement fiable.</p>\n    <p>Les erreurs se composent : une étape fiable à 95 %, répétée 20 fois, donne une tâche réussie seulement 36 % du temps. Tout ce chapitre vise à briser cette composition : vérifier, corriger, borner, mesurer.</p>",
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
  "lit": "multi",
  "look": {},
  "scene": "multi",
  "fig": "",
  "panel": "<h2>Un orchestrateur et ses sous-agents</h2><div class=\"psub\">le motif de la recherche approfondie</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Demande</b><i></i></span><pre class=\"ex\">« Compare les offres cloud GPU européennes »</pre></li><li class=\"red\"><span class=\"st\"><b>Orchestrateur</b><i>planifie, découpe</i></span><pre class=\"ex\">plan : 4 sous-questions</pre></li><li class=\"blue\"><span class=\"st\"><b>Sous-agents</b><i>en parallèle, contexte propre</i></span><pre class=\"ex\">A : prix · B : disponibilité\nC : conformité · D : réseau</pre></li><li class=\"\"><span class=\"st\"><b>Résumés</b><i>chacun renvoie l’essentiel</i></span><pre class=\"ex\">≈ 1 000 jetons chacun au lieu de 50 000</pre></li><li class=\"red\"><span class=\"st\"><b>Synthèse</b><i>l’orchestrateur assemble</i></span><pre class=\"ex\">rapport + sources</pre></li><li class=\"blue\"><span class=\"st\"><b>Vérification</b><i>citations, cohérence</i></span><pre class=\"ex\">agent relecteur ou règles</pre></li></ol><p class=\"note\">Les sous-agents explorent en parallèle, chacun dans un contexte propre, et ne renvoient qu’un résumé : l’orchestrateur garde un contexte clair. Ce gain se paie en jetons : un système multi-agents peut consommer plusieurs fois plus qu’un agent seul.</p><table class=\"data\"><tr><th>gain</th><td>parallélisme, contextes séparés</td></tr><tr><th>coût</th><td>souvent 3 à 15 × plus de jetons</td></tr><tr><th>pour</th><td>tâches larges, décomposables</td></tr></table>"
 },
 {
  "kicker": "17.1",
  "title": "Les systèmes mono-agents",
  "sub": "commencer simple",
  "body": "<p class=\"lede\">Un seul agent, un bon modèle, des outils bien conçus : c’est la bonne architecture par défaut.</p>\n    <ul class=\"rules\"><li>Plus facile à déboguer : une seule trace, un seul contexte.</li><li>Les modèles récents gèrent de longues tâches avec beaucoup d’outils (agents de code, assistants de bureau).</li><li>Ajouter de la structure par les <b>outils</b> et les <b>instructions</b> avant d’ajouter des agents.</li><li>Passer à plusieurs agents quand le contexte déborde, quand des sous-tâches indépendantes gagneraient à tourner en parallèle, ou quand les permissions doivent être séparées.</li></ul>",
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
  "panel": "<h2>La boucle d’un agent</h2><div class=\"psub\">penser, agir, observer, recommencer</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Contexte</b><i>but + historique + outils</i></span><pre class=\"ex\">msgs = [system, user, ...résultats précédents]</pre></li><li class=\"\"><span class=\"st\"><b>Décider</b><i>le modèle choisit</i></span><pre class=\"ex\">r = llm(msgs, tools=OUTILS)</pre></li><li class=\"red\"><span class=\"st\"><b>Agir</b><i>appel d’outil</i></span><pre class=\"ex\">if r.stop_reason == &#x27;tool_use&#x27;:\n    res = executer(r.tool_calls)</pre></li><li class=\"\"><span class=\"st\"><b>Observer</b><i>résultat ajouté au contexte</i></span><pre class=\"ex\">msgs += [r, resultats(res)]</pre></li><li class=\"blue\"><span class=\"st\"><b>Terminer ?</b><i>réponse finale ou limite</i></span><pre class=\"ex\">if r.stop_reason == &#x27;end_turn&#x27; or tours &gt; 25: break</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · agent</div><p class=\"note\">Un agent est un modèle de langage qui utilise des outils en boucle pour atteindre un but. À chaque tour, il lit tout ce qui s’est passé, choisit une action, en observe le résultat, et recommence jusqu’à la fin de la tâche. Toute la difficulté est de garder cette boucle fiable, bornée et sûre.</p><table class=\"data\"><tr><th>moteur</th><td>un LLM avec appels d’outils</td></tr><tr><th>arrêt</th><td>réponse finale, limite de tours ou de budget</td></tr><tr><th>état</th><td>le contexte + la mémoire externe</td></tr></table>"
 },
 {
  "kicker": "17.2",
  "title": "Les systèmes multi-agents",
  "sub": "diviser pour régner",
  "body": "<p class=\"lede\">Un système <b>multi-agents</b> répartit le travail entre plusieurs agents spécialisés.</p>\n    <table class=\"data\"><tr><th>architecture</th><th>principe</th><th>usage</th></tr><tr><td>orchestrateur-sous-agents</td><td>un chef découpe et délègue</td><td>recherche approfondie, gros changements de code</td></tr><tr><td>transfert (handoff)</td><td>un agent passe la main à un autre</td><td>support : accueil → facturation → technique</td></tr><tr><td>pipeline</td><td>chaque agent fait une étape</td><td>rédaction → vérification → mise en forme</td></tr><tr><td>débat, jury</td><td>plusieurs avis, puis arbitrage</td><td>décisions à fort enjeu</td></tr></table>\n    <ul class=\"rules\"><li>Chaque sous-agent reçoit une <b>consigne complète</b> : but, format de sortie, limites, ce qui est déjà fait.</li><li>Les agents communiquent par des <b>artefacts</b> (fichiers, résumés structurés) plutôt que par de longues conversations.</li><li>Coordination, coût et débogage deviennent plus difficiles : mesurer le gain réel par rapport à un agent seul.</li></ul>",
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
  "lit": "multi",
  "look": {},
  "scene": "multi",
  "fig": "",
  "panel": "<h2>Un orchestrateur et ses sous-agents</h2><div class=\"psub\">le motif de la recherche approfondie</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Demande</b><i></i></span><pre class=\"ex\">« Compare les offres cloud GPU européennes »</pre></li><li class=\"red\"><span class=\"st\"><b>Orchestrateur</b><i>planifie, découpe</i></span><pre class=\"ex\">plan : 4 sous-questions</pre></li><li class=\"blue\"><span class=\"st\"><b>Sous-agents</b><i>en parallèle, contexte propre</i></span><pre class=\"ex\">A : prix · B : disponibilité\nC : conformité · D : réseau</pre></li><li class=\"\"><span class=\"st\"><b>Résumés</b><i>chacun renvoie l’essentiel</i></span><pre class=\"ex\">≈ 1 000 jetons chacun au lieu de 50 000</pre></li><li class=\"red\"><span class=\"st\"><b>Synthèse</b><i>l’orchestrateur assemble</i></span><pre class=\"ex\">rapport + sources</pre></li><li class=\"blue\"><span class=\"st\"><b>Vérification</b><i>citations, cohérence</i></span><pre class=\"ex\">agent relecteur ou règles</pre></li></ol><p class=\"note\">Les sous-agents explorent en parallèle, chacun dans un contexte propre, et ne renvoient qu’un résumé : l’orchestrateur garde un contexte clair. Ce gain se paie en jetons : un système multi-agents peut consommer plusieurs fois plus qu’un agent seul.</p><table class=\"data\"><tr><th>gain</th><td>parallélisme, contextes séparés</td></tr><tr><th>coût</th><td>souvent 3 à 15 × plus de jetons</td></tr><tr><th>pour</th><td>tâches larges, décomposables</td></tr></table>"
 },
 {
  "kicker": "17.3",
  "title": "L’humain dans la boucle",
  "sub": "garder le contrôle",
  "body": "<p class=\"lede\">L’<b>humain dans la boucle</b> (human-in-the-loop) insère des points de validation humaine là où une erreur coûterait cher.</p>\n    <ul class=\"rules\"><li><b>Approbation</b> avant les actions irréversibles ou coûteuses : paiement, envoi de courriel, suppression, déploiement.</li><li><b>Validation du plan</b> avant une longue exécution.</li><li><b>Escalade</b> quand l’agent n’est pas sûr ou sort de son périmètre.</li><li><b>Correction</b> : l’humain modifie un résultat intermédiaire et l’agent reprend.</li><li><b>Revue a posteriori</b> d’un échantillon pour l’évaluation.</li></ul>\n    <p>Techniquement, cela demande un état persistant : l’agent se met en pause (statut « attente humain »), notifie, et reprend quand la réponse arrive, parfois des heures plus tard (LangGraph interrupt, files de tâches).</p>",
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
  "lit": "multi",
  "look": {},
  "scene": "multi",
  "fig": "",
  "panel": "<h2>Une approbation dans la boucle</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Classer l’action</b><i></i></span><pre class=\"ex\">SENSIBLES = {&#x27;rembourser&#x27;, &#x27;envoyer_courriel&#x27;, &#x27;supprimer&#x27;}</pre></li><li class=\"red\"><span class=\"st\"><b>Pause</b><i></i></span><pre class=\"ex\">if appel.name in SENSIBLES:\n    etat.statut = &#x27;attente_humain&#x27;; etat.en_attente = appel\n    notifier(responsable, resume(appel)); return</pre></li><li class=\"\"><span class=\"st\"><b>Décision</b><i></i></span><pre class=\"ex\">POST /approbations/{id}  {&#x27;ok&#x27;: true, &#x27;note&#x27;: &#x27;…&#x27;}</pre></li><li class=\"blue\"><span class=\"st\"><b>Reprise</b><i></i></span><pre class=\"ex\">res = executer(appel) if ok else refus(note)\netat.statut = &#x27;en_cours&#x27;; continuer(etat)</pre></li><li class=\"\"><span class=\"st\"><b>Tracer</b><i></i></span><pre class=\"ex\">qui a approuvé quoi, quand</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "17.4",
  "title": "Réflexion et autocorrection",
  "sub": "relire son propre travail",
  "body": "<p class=\"lede\">La <b>réflexion</b> fait critiquer une sortie (par le même modèle ou un autre) avant de la livrer, puis la corrige.</p>\n    <ul class=\"rules\"><li>Fonctionne bien quand il existe un <b>signal extérieur</b> : tests qui échouent, erreur de compilation, validation de schéma, citation introuvable.</li><li>Sans signal extérieur, un modèle qui se relit trouve moins d’erreurs qu’on l’espère, et peut même dégrader une bonne réponse.</li><li>Critique avec une <b>grille</b> précise plutôt que « vérifie ta réponse ».</li><li>Limiter le nombre de tours de correction (2 ou 3).</li></ul>",
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
  "panel": "<h2>Générer, vérifier, corriger</h2><div class=\"psub\">avec un signal objectif</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Générer</b><i></i></span><pre class=\"ex\">code = llm(&#x27;Écris la fonction …&#x27;)</pre></li><li class=\"blue\"><span class=\"st\"><b>Vérifier</b><i>signal extérieur</i></span><pre class=\"ex\">r = subprocess.run([&#x27;pytest&#x27;, &#x27;-q&#x27;], capture_output=True)</pre></li><li class=\"\"><span class=\"st\"><b>Critiquer</b><i></i></span><pre class=\"ex\">if r.returncode: retour = r.stdout[-3000:]</pre></li><li class=\"red\"><span class=\"st\"><b>Corriger</b><i></i></span><pre class=\"ex\">code = llm(f&#x27;Les tests échouent :\\n{retour}\\nCorrige.&#x27;)</pre></li><li class=\"\"><span class=\"st\"><b>Borner</b><i></i></span><pre class=\"ex\">au plus 3 essais, puis escalade</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1</div><p class=\"note\"></p>"
 },
 {
  "kicker": "17.5",
  "title": "Les boucles planification-exécution",
  "sub": "le plan comme fil conducteur",
  "body": "<p class=\"lede\">Pour une tâche longue, on sépare souvent <b>planifier</b> et <b>exécuter</b>.</p>\n    <ul class=\"rules\"><li>Un planificateur (modèle de raisonnement) produit une liste d’étapes vérifiables.</li><li>Un exécutant (modèle plus rapide, ou le même) réalise chaque étape avec les outils.</li><li>Après chaque étape : vérifier le résultat, cocher, et <b>replanifier</b> si la réalité diverge du plan.</li><li>Le plan persiste hors du contexte (fichier, état) : il survit à la compaction et sert de journal.</li></ul>\n    <p>Ce motif réduit les coûts (le gros modèle ne sert qu’à planifier) et rend le travail lisible pour un humain, qui peut valider ou modifier le plan.</p>",
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
  "panel": "<h2>La boucle d’un agent</h2><div class=\"psub\">penser, agir, observer, recommencer</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Contexte</b><i>but + historique + outils</i></span><pre class=\"ex\">msgs = [system, user, ...résultats précédents]</pre></li><li class=\"\"><span class=\"st\"><b>Décider</b><i>le modèle choisit</i></span><pre class=\"ex\">r = llm(msgs, tools=OUTILS)</pre></li><li class=\"red\"><span class=\"st\"><b>Agir</b><i>appel d’outil</i></span><pre class=\"ex\">if r.stop_reason == &#x27;tool_use&#x27;:\n    res = executer(r.tool_calls)</pre></li><li class=\"\"><span class=\"st\"><b>Observer</b><i>résultat ajouté au contexte</i></span><pre class=\"ex\">msgs += [r, resultats(res)]</pre></li><li class=\"blue\"><span class=\"st\"><b>Terminer ?</b><i>réponse finale ou limite</i></span><pre class=\"ex\">if r.stop_reason == &#x27;end_turn&#x27; or tours &gt; 25: break</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · agent</div><p class=\"note\">Un agent est un modèle de langage qui utilise des outils en boucle pour atteindre un but. À chaque tour, il lit tout ce qui s’est passé, choisit une action, en observe le résultat, et recommence jusqu’à la fin de la tâche. Toute la difficulté est de garder cette boucle fiable, bornée et sûre.</p><table class=\"data\"><tr><th>moteur</th><td>un LLM avec appels d’outils</td></tr><tr><th>arrêt</th><td>réponse finale, limite de tours ou de budget</td></tr><tr><th>état</th><td>le contexte + la mémoire externe</td></tr></table>"
 },
 {
  "kicker": "17.6",
  "title": "La fiabilité des agents",
  "sub": "rendre le comportement prévisible",
  "body": "<p class=\"lede\">Rendre un agent fiable, c’est surtout réduire les occasions d’erreur et les rattraper vite.</p>\n    <ul class=\"rules\"><li><b>Bornes</b> : nombre de tours, budget en jetons et en dollars, durée, nombre d’appels par outil.</li><li><b>Détection de boucles</b> : même appel répété avec les mêmes arguments → interrompre.</li><li><b>Outils robustes</b> : validation, erreurs explicites, idempotence, réessais côté outil.</li><li><b>Points de contrôle</b> et reprise après panne.</li><li><b>Sorties structurées</b> pour les décisions intermédiaires.</li><li><b>Contexte propre</b> : compaction, sous-agents, notes externes.</li><li><b>Observabilité</b> : chaque trace complète enregistrée et consultable (chapitre 25).</li></ul>",
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
  "panel": "<h2>Les garde-fous de la boucle</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Tours</b><i></i></span><pre class=\"ex\">if etat.tours &gt;= 30: return arreter(&#x27;limite de tours&#x27;)</pre></li><li class=\"red\"><span class=\"st\"><b>Budget</b><i></i></span><pre class=\"ex\">if etat.cout_usd &gt;= 2.0: return arreter(&#x27;budget&#x27;)</pre></li><li class=\"\"><span class=\"st\"><b>Boucle détectée</b><i></i></span><pre class=\"ex\">sig = (appel.name, json.dumps(appel.input, sort_keys=True))\nif vus[sig] &gt;= 3: return arreter(&#x27;répétition&#x27;)</pre></li><li class=\"\"><span class=\"st\"><b>Durée</b><i></i></span><pre class=\"ex\">asyncio.timeout(600)</pre></li><li class=\"blue\"><span class=\"st\"><b>Sortie</b><i></i></span><pre class=\"ex\">toujours un rapport : fait, pas fait, pourquoi</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "17.7",
  "title": "L’évaluation des agents",
  "sub": "juger une trajectoire",
  "body": "<p class=\"lede\">Évaluer un agent est plus difficile qu’évaluer une réponse : il faut juger le <b>résultat</b> et parfois la <b>trajectoire</b>.</p>\n    <table class=\"data\"><tr><th>niveau</th><th>question</th><th>méthode</th></tr><tr><td>résultat final</td><td>la tâche est-elle accomplie ?</td><td>vérification de l’état final (tests, base, fichiers)</td></tr><tr><td>trajectoire</td><td>les bons outils, dans un ordre raisonnable ?</td><td>comparaison à des trajectoires de référence, modèle juge</td></tr><tr><td>étape</td><td>chaque appel d’outil est-il correct ?</td><td>tests unitaires sur les décisions</td></tr><tr><td>efficacité</td><td>combien de tours, de jetons, de temps ?</td><td>métriques de trace</td></tr><tr><td>sûreté</td><td>a-t-il fait quelque chose d’interdit ?</td><td>règles sur la trace</td></tr></table>\n    <p>Utiliser des <b>environnements reproductibles</b> (bac à sable, base de test, API simulées) et lancer chaque tâche plusieurs fois : un agent peut réussir une fois sur trois. Repères publics : SWE-bench (code), τ-bench (support), GAIA, WebArena, OSWorld. Voir aussi le chapitre 21.</p>",
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
  "panel": "<h2>La boucle d’un agent</h2><div class=\"psub\">penser, agir, observer, recommencer</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Contexte</b><i>but + historique + outils</i></span><pre class=\"ex\">msgs = [system, user, ...résultats précédents]</pre></li><li class=\"\"><span class=\"st\"><b>Décider</b><i>le modèle choisit</i></span><pre class=\"ex\">r = llm(msgs, tools=OUTILS)</pre></li><li class=\"red\"><span class=\"st\"><b>Agir</b><i>appel d’outil</i></span><pre class=\"ex\">if r.stop_reason == &#x27;tool_use&#x27;:\n    res = executer(r.tool_calls)</pre></li><li class=\"\"><span class=\"st\"><b>Observer</b><i>résultat ajouté au contexte</i></span><pre class=\"ex\">msgs += [r, resultats(res)]</pre></li><li class=\"blue\"><span class=\"st\"><b>Terminer ?</b><i>réponse finale ou limite</i></span><pre class=\"ex\">if r.stop_reason == &#x27;end_turn&#x27; or tours &gt; 25: break</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · agent</div><p class=\"note\">Un agent est un modèle de langage qui utilise des outils en boucle pour atteindre un but. À chaque tour, il lit tout ce qui s’est passé, choisit une action, en observe le résultat, et recommence jusqu’à la fin de la tâche. Toute la difficulté est de garder cette boucle fiable, bornée et sûre.</p><table class=\"data\"><tr><th>moteur</th><td>un LLM avec appels d’outils</td></tr><tr><th>arrêt</th><td>réponse finale, limite de tours ou de budget</td></tr><tr><th>état</th><td>le contexte + la mémoire externe</td></tr></table>"
 },
 {
  "kicker": "17.8",
  "title": "La sécurité des agents",
  "sub": "un agent est un utilisateur privilégié",
  "body": "<p class=\"lede\">Un agent qui lit du contenu non fiable et dispose d’outils puissants est une cible de choix. Le danger maximal réunit trois éléments (la « triade létale ») : accès à des <b>données privées</b>, exposition à du <b>contenu non fiable</b>, capacité de <b>communiquer vers l’extérieur</b>.</p>\n    <ul class=\"rules\"><li><b>Moindre privilège</b> : chaque agent n’a que les outils et les droits nécessaires à sa tâche, avec l’identité de l’utilisateur qu’il sert.</li><li><b>Séparer</b> les agents qui lisent du contenu non fiable de ceux qui peuvent agir.</li><li><b>Bac à sable</b> pour le code et les commandes ; réseau restreint par liste blanche.</li><li><b>Confirmation humaine</b> pour les actions sensibles.</li><li><b>Journal</b> inaltérable de toutes les actions ; alertes sur les comportements anormaux.</li><li><b>Tests d’attaque</b> (red teaming) : injections dans les documents, pages web, courriels, résultats d’outils.</li></ul>\n    <p>Détails au chapitre 27.</p>",
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
  "panel": "<h2>La boucle d’un agent</h2><div class=\"psub\">penser, agir, observer, recommencer</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Contexte</b><i>but + historique + outils</i></span><pre class=\"ex\">msgs = [system, user, ...résultats précédents]</pre></li><li class=\"\"><span class=\"st\"><b>Décider</b><i>le modèle choisit</i></span><pre class=\"ex\">r = llm(msgs, tools=OUTILS)</pre></li><li class=\"red\"><span class=\"st\"><b>Agir</b><i>appel d’outil</i></span><pre class=\"ex\">if r.stop_reason == &#x27;tool_use&#x27;:\n    res = executer(r.tool_calls)</pre></li><li class=\"\"><span class=\"st\"><b>Observer</b><i>résultat ajouté au contexte</i></span><pre class=\"ex\">msgs += [r, resultats(res)]</pre></li><li class=\"blue\"><span class=\"st\"><b>Terminer ?</b><i>réponse finale ou limite</i></span><pre class=\"ex\">if r.stop_reason == &#x27;end_turn&#x27; or tours &gt; 25: break</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · agent</div><p class=\"note\">Un agent est un modèle de langage qui utilise des outils en boucle pour atteindre un but. À chaque tour, il lit tout ce qui s’est passé, choisit une action, en observe le résultat, et recommence jusqu’à la fin de la tâche. Toute la difficulté est de garder cette boucle fiable, bornée et sûre.</p><table class=\"data\"><tr><th>moteur</th><td>un LLM avec appels d’outils</td></tr><tr><th>arrêt</th><td>réponse finale, limite de tours ou de budget</td></tr><tr><th>état</th><td>le contexte + la mémoire externe</td></tr></table>"
 }
];
export const PLATES = {

};
