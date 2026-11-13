// Chapitre 16 : Les agents d’IA (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 16 · Agents",
  "title": "Les agents d’IA",
  "sub": "des modèles qui agissent",
  "body": "<p class=\"lede\">Un <b>agent</b> est un système où un modèle de langage <b>dirige lui-même</b> son travail : il décide quelles actions faire, avec quels outils, dans quel ordre, et quand s’arrêter.</p>\n    <p>Exemples : un agent de code qui lit un dépôt, modifie des fichiers et lance les tests ; un assistant de recherche qui enchaîne des dizaines de recherches web ; un agent de support qui consulte une commande et déclenche un remboursement.</p>\n    <p>Ce chapitre décrit les briques d’un agent ; le suivant traite des systèmes à plusieurs agents, de la fiabilité, de l’évaluation et de la sécurité.</p>",
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
  "kicker": "16.1",
  "title": "Qu’est-ce qu’un agent d’IA ?",
  "sub": "workflow ou agent",
  "body": "<p class=\"lede\">On distingue deux familles de systèmes à base de modèles de langage :</p>\n    <table class=\"data\"><tr><th></th><th>workflow</th><th>agent</th></tr><tr><td>qui décide de l’enchaînement ?</td><td>le code, écrit à l’avance</td><td>le modèle, à chaque étape</td></tr><tr><td>prévisibilité</td><td>élevée</td><td>moindre</td></tr><tr><td>tâches</td><td>bien définies, répétitives</td><td>ouvertes, de longueur variable</td></tr><tr><td>coût, latence</td><td>maîtrisés</td><td>variables, plus élevés</td></tr><tr><td>exemples</td><td>classer puis router, RAG fixe</td><td>agent de code, recherche approfondie</td></tr></table>\n    <p>Conseil d’Anthropic dans « Building effective agents » : commencer par la solution la plus simple (un appel, puis un workflow) et ne passer à un agent que lorsque la tâche l’exige vraiment. Beaucoup de « agents » en production sont des workflows bien conçus, et c’est très bien.</p>",
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
  "kicker": "16.2",
  "title": "L’architecture d’un agent",
  "sub": "un modèle, des outils, une boucle",
  "body": "<p class=\"lede\">Un agent se compose d’un <b>modèle</b>, d’<b>instructions</b>, d’<b>outils</b>, d’une <b>mémoire</b>, d’une <b>boucle d’orchestration</b> et de <b>garde-fous</b>.</p>\n    <pre class=\"code\">def agent(but, outils, max_tours=20):\n    msgs = [{&#x27;role&#x27;: &#x27;user&#x27;, &#x27;content&#x27;: but}]\n    for _ in range(max_tours):\n        r = client.messages.create(model=MODELE, system=SYSTEME, tools=schemas(outils), messages=msgs, max_tokens=4096)\n        msgs.append({&#x27;role&#x27;: &#x27;assistant&#x27;, &#x27;content&#x27;: r.content})\n        if r.stop_reason != &#x27;tool_use&#x27;:\n            return texte(r)\n        msgs.append({&#x27;role&#x27;: &#x27;user&#x27;, &#x27;content&#x27;: [executer(b, outils) for b in r.content if b.type == &#x27;tool_use&#x27;]})\n    raise TropDeTours()</pre>\n    <p>Ces quelques lignes sont le cœur de tous les frameworks d’agents. Les SDK d’agents (Claude Agent SDK, OpenAI Agents SDK) et les frameworks (chapitre 18) y ajoutent la gestion du contexte, le streaming, les sous-agents, les permissions et les traces.</p>",
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
  "lit": "archi",
  "look": {},
  "scene": "archi",
  "fig": "",
  "panel": "<h2>L’architecture d’un agent</h2><div class=\"psub\">les briques</div><ol class=\"flow\"><li class=\"red\"><span class=\"st\"><b>Modèle</b><i>le cerveau</i></span><pre class=\"ex\">claude-sonnet-5-5, gpt-…, qwen3 …</pre></li><li class=\"\"><span class=\"st\"><b>Instructions</b><i>rôle, règles, critères d’arrêt</i></span><pre class=\"ex\">« Tu résous des tickets de niveau 1 … »</pre></li><li class=\"blue\"><span class=\"st\"><b>Outils</b><i>lire et agir</i></span><pre class=\"ex\">chercher_doc, lire_commande, rembourser(≤ 50 €)</pre></li><li class=\"\"><span class=\"st\"><b>Mémoire</b><i>court et long terme</i></span><pre class=\"ex\">contexte du tour ; profil, notes, épisodes passés</pre></li><li class=\"blue\"><span class=\"st\"><b>Orchestration</b><i>la boucle, les limites</i></span><pre class=\"ex\">max 20 tours, 2 $ max, délai 5 min</pre></li><li class=\"red\"><span class=\"st\"><b>Garde-fous</b><i>permissions, validation</i></span><pre class=\"ex\">confirmation humaine au-delà de 50 €</pre></li></ol><p class=\"note\">Un agent n’est pas un modèle magique : c’est un programme assez simple autour d’un modèle. La qualité vient des outils (bien décrits, sûrs), du contexte (bien géré) et des garde-fous (limites, validations, journalisation).</p><table class=\"data\"><tr><th>outils</th><td>fonctions, API, MCP</td></tr><tr><th>boucle</th><td>quelques dizaines de lignes</td></tr><tr><th>fiabilité</th><td>outils + contexte + évaluation</td></tr></table>"
 },
 {
  "kicker": "16.3",
  "title": "Raisonnement et planification",
  "sub": "réfléchir avant d’agir",
  "body": "<p class=\"lede\">Pour les tâches longues, l’agent doit <b>planifier</b> : décomposer le but, ordonner les étapes, réviser le plan quand une étape échoue.</p>\n    <ul class=\"rules\"><li><b>ReAct</b> (2022) : alterner « pensée » et « action » ; le raisonnement explicite guide le choix d’outil.</li><li><b>Plan puis exécution</b> : écrire un plan (liste de tâches), l’exécuter, cocher, réviser.</li><li><b>Réflexion intercalée</b> : les modèles de raisonnement réfléchissent entre deux appels d’outils.</li><li><b>Liste de tâches</b> persistante (fichier TODO) : l’agent la relit et la met à jour, ce qui l’aide à ne pas se perdre.</li></ul>\n    <p>Un plan écrit est aussi un outil de contrôle : on peut le montrer à l’utilisateur et le faire valider avant l’exécution d’actions coûteuses.</p>",
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
  "kicker": "16.4",
  "title": "L’appel d’outils",
  "sub": "donner des mains au modèle",
  "body": "<p class=\"lede\">Les <b>outils</b> sont la façon dont l’agent perçoit et modifie le monde. Leur conception compte autant que le prompt.</p>\n    <ul class=\"rules\"><li><b>Peu d’outils, bien choisis</b>, plutôt qu’un outil par point d’API : « planifier_reunion » plutôt que lister_agendas + trouver_creneau + creer_evenement.</li><li><b>Descriptions</b> précises : quand l’utiliser, quand ne pas l’utiliser, format des arguments, exemples.</li><li><b>Résultats</b> compacts et utiles : identifiants lisibles, pagination, erreurs explicites qui disent comment corriger.</li><li><b>MCP</b> (Model Context Protocol) : standard ouvert pour exposer des outils, des ressources et des prompts à n’importe quel agent compatible.</li></ul>",
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
  "panel": "<h2>Un serveur MCP en Python</h2><div class=\"psub\">exposer un outil à tout agent compatible</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Créer</b><i></i></span><pre class=\"ex\">from mcp.server.fastmcp import FastMCP\nmcp = FastMCP(&#x27;commandes&#x27;)</pre></li><li class=\"blue\"><span class=\"st\"><b>Outil</b><i>docstring = description</i></span><pre class=\"ex\">@mcp.tool()\ndef statut_commande(numero: str) -&gt; dict:\n    &quot;&quot;&quot;Renvoie le statut et la date de livraison d’une commande\n    (numéro au format C-123456).&quot;&quot;&quot;\n    return db.commande(numero)</pre></li><li class=\"\"><span class=\"st\"><b>Lancer</b><i></i></span><pre class=\"ex\">mcp.run()   # stdio, ou transport HTTP</pre></li><li class=\"red\"><span class=\"st\"><b>Brancher</b><i></i></span><pre class=\"ex\">claude mcp add commandes -- python serveur.py</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "16.5",
  "title": "L’exécution des fonctions",
  "sub": "le code qui agit vraiment",
  "body": "<p class=\"lede\">Le modèle propose un appel ; c’est <b>votre code</b> qui l’exécute. C’est là que se jouent la sécurité et la robustesse.</p>\n    <ul class=\"rules\"><li><b>Valider</b> les arguments (Pydantic) avant d’exécuter ; refuser proprement ce qui est hors limites.</li><li><b>Délais</b> et taille maximale des résultats ; tronquer ce qui est trop long.</li><li><b>Erreurs</b> renvoyées au modèle comme résultat (« commande introuvable, format attendu C-123456 ») : il peut se corriger.</li><li><b>Idempotence</b> : un même appel rejoué ne doit pas payer deux fois.</li><li><b>Bac à sable</b> pour l’exécution de code ou de commandes (conteneur, microVM, chapitre 27).</li></ul>",
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
  "panel": "<h2>Exécuter un appel d’outil proprement</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Trouver</b><i></i></span><pre class=\"ex\">f = OUTILS.get(bloc.name) or erreur(&#x27;outil inconnu&#x27;)</pre></li><li class=\"blue\"><span class=\"st\"><b>Valider</b><i></i></span><pre class=\"ex\">args = f.Modele.model_validate(bloc.input)</pre></li><li class=\"red\"><span class=\"st\"><b>Autoriser</b><i></i></span><pre class=\"ex\">if f.sensible and not approuve(utilisateur, bloc): return refus()</pre></li><li class=\"\"><span class=\"st\"><b>Exécuter</b><i>avec délai</i></span><pre class=\"ex\">res = await asyncio.wait_for(f(**args.model_dump()), 30)</pre></li><li class=\"\"><span class=\"st\"><b>Résumer</b><i></i></span><pre class=\"ex\">contenu = tronquer(json.dumps(res), 8000)</pre></li><li class=\"\"><span class=\"st\"><b>Erreur</b><i>lisible</i></span><pre class=\"ex\">{&#x27;type&#x27;: &#x27;tool_result&#x27;, &#x27;is_error&#x27;: True,\n &#x27;content&#x27;: &#x27;Commande C-99 introuvable. Vérifie le numéro.&#x27;}</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "16.6",
  "title": "Mémoire à court et à long terme",
  "sub": "se souvenir",
  "body": "<p class=\"lede\">Un modèle n’a pas de mémoire entre deux appels. La mémoire d’un agent est construite par l’application.</p>\n    <table class=\"data\"><tr><th>mémoire</th><th>contenu</th><th>mise en œuvre</th></tr><tr><td>de travail (court terme)</td><td>la tâche en cours</td><td>le contexte : messages et résultats d’outils</td></tr><tr><td>de session</td><td>la conversation</td><td>historique résumé</td></tr><tr><td>sémantique (long terme)</td><td>faits, préférences, profil</td><td>base vectorielle ou fiche structurée</td></tr><tr><td>épisodique</td><td>ce qui s’est passé avant</td><td>journal d’épisodes résumés</td></tr><tr><td>procédurale</td><td>comment faire</td><td>instructions, fichiers de compétences</td></tr></table>\n    <ul class=\"rules\"><li>L’agent peut écrire lui-même sa mémoire via un outil (« noter », fichier de notes) ; on contrôle ce qui y entre (pas de données sensibles inutiles).</li><li>Une mémoire fausse est pire que pas de mémoire : dater les souvenirs, permettre leur correction et leur effacement (RGPD).</li><li>Outils : Mem0, Letta, Zep, LangGraph Store, ou une simple table.</li></ul>",
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
  "kicker": "16.7",
  "title": "La gestion de l’état d’un agent",
  "sub": "reprendre là où on en était",
  "body": "<p class=\"lede\">L’<b>état</b> d’un agent comprend les messages, le plan, les résultats intermédiaires, les fichiers produits, les compteurs (tours, coût). Il doit survivre à une panne et permettre une reprise.</p>\n    <ul class=\"rules\"><li>Persister l’état à chaque étape (base de données, point de contrôle LangGraph).</li><li>Séparer l’état <b>structuré</b> (variables, statut) du <b>texte</b> (messages).</li><li>Rendre les étapes rejouables : reprendre après la dernière étape réussie sans refaire les actions déjà faites.</li><li>Garder l’historique complet pour le débogage, et une version compacte pour le contexte.</li></ul>",
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
  "panel": "<h2>Un état explicite</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Modèle</b><i></i></span><pre class=\"ex\">class Etat(BaseModel):\n    but: str\n    plan: list[Tache]\n    messages: list[dict]\n    fichiers: dict[str, str] = {}\n    tours: int = 0\n    cout_usd: float = 0.0\n    statut: Literal[&#x27;en_cours&#x27;, &#x27;attente_humain&#x27;, &#x27;fini&#x27;, &#x27;echec&#x27;]</pre></li><li class=\"\"><span class=\"st\"><b>Sauver</b><i>à chaque tour</i></span><pre class=\"ex\">db.save(session_id, etat.model_dump_json())</pre></li><li class=\"\"><span class=\"st\"><b>Reprendre</b><i></i></span><pre class=\"ex\">etat = Etat.model_validate_json(db.load(session_id))</pre></li><li class=\"red\"><span class=\"st\"><b>Limites</b><i></i></span><pre class=\"ex\">if etat.tours &gt; 30 or etat.cout_usd &gt; 2: etat.statut = &#x27;echec&#x27;</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "16.8",
  "title": "L’orchestration des workflows",
  "sub": "les motifs de base",
  "body": "<p class=\"lede\">Avant les agents autonomes, quelques <b>motifs de workflow</b> couvrent la majorité des besoins.</p>\n    <table class=\"data\"><tr><th>motif</th><th>principe</th><th>exemple</th></tr><tr><td>enchaînement</td><td>la sortie d’un appel nourrit le suivant, avec contrôles</td><td>plan → rédaction → relecture</td></tr><tr><td>routage</td><td>classer puis envoyer au bon traitement</td><td>type de ticket → prompt spécialisé</td></tr><tr><td>parallélisation</td><td>plusieurs appels en même temps, puis agrégation</td><td>évaluer 5 critères en parallèle</td></tr><tr><td>orchestrateur-exécutants</td><td>un modèle découpe, d’autres exécutent</td><td>modifier 12 fichiers</td></tr><tr><td>évaluateur-optimiseur</td><td>générer, critiquer, améliorer</td><td>traduction exigeante</td></tr></table>\n    <p>Ces motifs se codent en quelques fonctions Python ; les frameworks (LangGraph, chapitre 18) aident quand il faut des graphes avec reprise, branches et validation humaine.</p>",
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
  "lit": "archi",
  "look": {},
  "scene": "archi",
  "fig": "",
  "panel": "<h2>L’architecture d’un agent</h2><div class=\"psub\">les briques</div><ol class=\"flow\"><li class=\"red\"><span class=\"st\"><b>Modèle</b><i>le cerveau</i></span><pre class=\"ex\">claude-sonnet-5-5, gpt-…, qwen3 …</pre></li><li class=\"\"><span class=\"st\"><b>Instructions</b><i>rôle, règles, critères d’arrêt</i></span><pre class=\"ex\">« Tu résous des tickets de niveau 1 … »</pre></li><li class=\"blue\"><span class=\"st\"><b>Outils</b><i>lire et agir</i></span><pre class=\"ex\">chercher_doc, lire_commande, rembourser(≤ 50 €)</pre></li><li class=\"\"><span class=\"st\"><b>Mémoire</b><i>court et long terme</i></span><pre class=\"ex\">contexte du tour ; profil, notes, épisodes passés</pre></li><li class=\"blue\"><span class=\"st\"><b>Orchestration</b><i>la boucle, les limites</i></span><pre class=\"ex\">max 20 tours, 2 $ max, délai 5 min</pre></li><li class=\"red\"><span class=\"st\"><b>Garde-fous</b><i>permissions, validation</i></span><pre class=\"ex\">confirmation humaine au-delà de 50 €</pre></li></ol><p class=\"note\">Un agent n’est pas un modèle magique : c’est un programme assez simple autour d’un modèle. La qualité vient des outils (bien décrits, sûrs), du contexte (bien géré) et des garde-fous (limites, validations, journalisation).</p><table class=\"data\"><tr><th>outils</th><td>fonctions, API, MCP</td></tr><tr><th>boucle</th><td>quelques dizaines de lignes</td></tr><tr><th>fiabilité</th><td>outils + contexte + évaluation</td></tr></table>"
 }
];
export const PLATES = {

};
