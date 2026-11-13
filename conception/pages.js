// Chapitre 28 : Concevoir des systèmes d’IA (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 28 · Conception",
  "title": "Concevoir des systèmes d’IA",
  "sub": "penser au-delà du prompt",
  "body": "<p class=\"lede\">La <b>conception de systèmes</b> (system design) consiste à choisir les composants, leurs interactions et leurs compromis pour atteindre des objectifs de qualité, de latence, de coût, de fiabilité et de sécurité, à une échelle donnée.</p>\n    <p>C’est aussi un exercice classique des entretiens d’ingénieur IA : « concevez un assistant de support pour 10 millions d’utilisateurs ». La méthode : clarifier les besoins et les volumes, proposer une architecture simple, puis approfondir les points durs et les compromis.</p>",
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
  "lit": "ref",
  "look": {},
  "scene": "ref",
  "fig": "",
  "panel": "<h2>La méthode d’un exercice de conception</h2><div class=\"psub\">45 minutes</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Clarifier</b><i>5 min</i></span><pre class=\"ex\">utilisateurs, volumes, latence, qualité attendue,\ndonnées, contraintes (confidentialité, budget)</pre></li><li class=\"blue\"><span class=\"st\"><b>Estimer</b><i>5 min</i></span><pre class=\"ex\">requêtes/s, jetons/jour, coût, stockage</pre></li><li class=\"\"><span class=\"st\"><b>Architecture</b><i>10 min</i></span><pre class=\"ex\">schéma simple de bout en bout</pre></li><li class=\"red\"><span class=\"st\"><b>Approfondir</b><i>15 min</i></span><pre class=\"ex\">RAG, modèles, évaluation, points de défaillance</pre></li><li class=\"\"><span class=\"st\"><b>Compromis</b><i>5 min</i></span><pre class=\"ex\">ce que je changerais à 10× l’échelle</pre></li><li class=\"\"><span class=\"st\"><b>Risques</b><i>5 min</i></span><pre class=\"ex\">sécurité, hallucinations, coûts, conformité</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "28.1",
  "title": "Concevoir des applications évolutives",
  "sub": "tenir la charge",
  "body": "<p class=\"lede\">Une application évolutive supporte une charge croissante en ajoutant des ressources, sans réécriture.</p>\n    <ul class=\"rules\"><li><b>Estimer</b> d’abord : 1 million de requêtes/jour ≈ 12 req/s en moyenne, 50 à 100 en pointe ; × 3 000 jetons = 3 milliards de jetons/jour.</li><li><b>Sans état</b> : n’importe quelle copie de l’API peut servir n’importe quelle requête.</li><li><b>Asynchrone</b> pour tout ce qui dépasse quelques secondes ou peut attendre.</li><li><b>Limites</b> partout (débit, jetons, concurrence vers chaque fournisseur) pour ne pas se faire submerger ni ruiner.</li><li><b>Mesurer</b> les goulots réels : limites de débit des fournisseurs et GPU sont souvent atteints avant la base de données.</li></ul>",
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
  "lit": "ref",
  "look": {},
  "scene": "ref",
  "fig": "",
  "panel": "<h2>Estimer un système</h2><div class=\"psub\">assistant interne, 20 000 employés</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Usage</b><i></i></span><pre class=\"ex\">20 000 × 30 % actifs × 10 questions/jour = 60 000 req/jour</pre></li><li class=\"blue\"><span class=\"st\"><b>Pointe</b><i></i></span><pre class=\"ex\">≈ 60 000 / 8 h / 3 600 × 3 ≈ 6 req/s</pre></li><li class=\"\"><span class=\"st\"><b>Jetons</b><i></i></span><pre class=\"ex\">60 000 × (5 000 entrée + 400 sortie) ≈ 324 M/jour</pre></li><li class=\"\"><span class=\"st\"><b>Coût API</b><i>3 $ / 15 $ par M</i></span><pre class=\"ex\">300 M × 3 $ + 24 M × 15 $ ≈ 1 260 $/jour</pre></li><li class=\"red\"><span class=\"st\"><b>Avec cache de prompt</b><i></i></span><pre class=\"ex\">≈ −40 % sur l’entrée → ≈ 900 $/jour</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "28.2",
  "title": "Concevoir un système RAG",
  "sub": "les décisions clés",
  "body": "<p class=\"lede\">Pour un RAG de production, les décisions structurantes :</p>\n    <table class=\"data\"><tr><th>question</th><th>options</th></tr><tr><td>ingestion</td><td>par lots planifiés ou événementielle ; incrémentale</td></tr><tr><td>analyse</td><td>texte simple, outil de mise en page, VLM</td></tr><tr><td>index</td><td>pgvector, Qdrant, service géré, + BM25</td></tr><tr><td>droits</td><td>filtres par locataire et par groupe, synchronisés avec les sources</td></tr><tr><td>récupération</td><td>hybride + reranking ; agentique pour les questions complexes</td></tr><tr><td>génération</td><td>modèle, citations, refus quand l’information manque</td></tr><tr><td>fraîcheur</td><td>délai acceptable entre modification d’un document et réponse à jour</td></tr><tr><td>évaluation</td><td>jeu de questions, métriques par étage, juges en ligne</td></tr></table>\n    <p>Points durs à anticiper : PDF complexes, tableaux, documents contradictoires ou périmés, multilinguisme, questions d’agrégation (à router vers SQL), suppression effective des documents retirés.</p>",
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
  "lit": "ref",
  "look": {},
  "scene": "ref",
  "fig": "",
  "panel": "<h2>Une architecture de référence</h2><div class=\"psub\">un assistant d’entreprise à grande échelle</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Clients</b><i>web, mobile, API</i></span><pre class=\"ex\">100 000 utilisateurs, pics à 500 req/s</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle</b><i>auth, limites, routage</i></span><pre class=\"ex\">API Gateway + WAF ; quotas par locataire</pre></li><li class=\"blue\"><span class=\"st\"><b>API sans état</b><i>N copies</i></span><pre class=\"ex\">FastAPI, mise à l’échelle horizontale</pre></li><li class=\"\"><span class=\"st\"><b>Orchestrateur</b><i>RAG, agents, garde-fous</i></span><pre class=\"ex\">budgets, délais, traces</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle LLM</b><i>routage, secours, cache</i></span><pre class=\"ex\">petit / grand modèle ; fournisseur A / B ; vLLM</pre></li><li class=\"blue\"><span class=\"st\"><b>Données</b><i></i></span><pre class=\"ex\">Postgres (+ réplicas), index vectoriel, Redis, S3</pre></li><li class=\"\"><span class=\"st\"><b>Asynchrone</b><i>files + travailleurs</i></span><pre class=\"ex\">ingestion, évaluations, lots</pre></li><li class=\"\"><span class=\"st\"><b>Observabilité</b><i></i></span><pre class=\"ex\">traces, coûts, qualité, alertes</pre></li></ol><p class=\"note\">Chaque couche se met à l’échelle indépendamment et peut tomber sans entraîner les autres. Les appels aux modèles, lents et coûteux, sont encadrés par une passerelle qui route, met en cache, réessaie et bascule.</p><table class=\"data\"><tr><th>API</th><td>sans état</td></tr><tr><th>modèles</th><td>derrière une passerelle</td></tr><tr><th>lent</th><td>en asynchrone</td></tr></table>"
 },
 {
  "kicker": "28.3",
  "title": "Concevoir un système d’agents",
  "sub": "autonomie sous contrôle",
  "body": "<p class=\"lede\">Concevoir un agent de production, c’est décider jusqu’où il est autonome et comment on le contrôle.</p>\n    <ul class=\"rules\"><li><b>Périmètre</b> : tâches couvertes, outils, données accessibles, actions interdites.</li><li><b>Architecture</b> : workflow, agent unique, ou orchestrateur et sous-agents.</li><li><b>État durable</b> : points de contrôle, reprise, pauses pour validation humaine (minutes à jours).</li><li><b>Exécution</b> : files de tâches, travailleurs, bacs à sable, délais.</li><li><b>Garde-fous</b> : budgets, limites de tours, détection de boucles, approbations.</li><li><b>Évaluation</b> : environnements de test, taux de réussite, coût par tâche.</li><li><b>Observabilité</b> : traces complètes consultables par le support.</li></ul>",
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
  "lit": "ref",
  "look": {},
  "scene": "ref",
  "fig": "",
  "panel": "<h2>Une architecture de référence</h2><div class=\"psub\">un assistant d’entreprise à grande échelle</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Clients</b><i>web, mobile, API</i></span><pre class=\"ex\">100 000 utilisateurs, pics à 500 req/s</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle</b><i>auth, limites, routage</i></span><pre class=\"ex\">API Gateway + WAF ; quotas par locataire</pre></li><li class=\"blue\"><span class=\"st\"><b>API sans état</b><i>N copies</i></span><pre class=\"ex\">FastAPI, mise à l’échelle horizontale</pre></li><li class=\"\"><span class=\"st\"><b>Orchestrateur</b><i>RAG, agents, garde-fous</i></span><pre class=\"ex\">budgets, délais, traces</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle LLM</b><i>routage, secours, cache</i></span><pre class=\"ex\">petit / grand modèle ; fournisseur A / B ; vLLM</pre></li><li class=\"blue\"><span class=\"st\"><b>Données</b><i></i></span><pre class=\"ex\">Postgres (+ réplicas), index vectoriel, Redis, S3</pre></li><li class=\"\"><span class=\"st\"><b>Asynchrone</b><i>files + travailleurs</i></span><pre class=\"ex\">ingestion, évaluations, lots</pre></li><li class=\"\"><span class=\"st\"><b>Observabilité</b><i></i></span><pre class=\"ex\">traces, coûts, qualité, alertes</pre></li></ol><p class=\"note\">Chaque couche se met à l’échelle indépendamment et peut tomber sans entraîner les autres. Les appels aux modèles, lents et coûteux, sont encadrés par une passerelle qui route, met en cache, réessaie et bascule.</p><table class=\"data\"><tr><th>API</th><td>sans état</td></tr><tr><th>modèles</th><td>derrière une passerelle</td></tr><tr><th>lent</th><td>en asynchrone</td></tr></table>"
 },
 {
  "kicker": "28.4",
  "title": "L’architecture de routage des modèles",
  "sub": "le bon modèle, au bon prix",
  "body": "<p class=\"lede\">Une <b>passerelle LLM</b> centralise l’accès aux modèles et applique des politiques.</p>\n    <ul class=\"rules\"><li><b>Routage par tâche</b> : classification et extraction → petit modèle ; rédaction → modèle moyen ; planification et cas difficiles → modèle de raisonnement.</li><li><b>Routage par difficulté</b> : un classifieur (ou un petit modèle) estime la difficulté ; cascade avec escalade si la validation échoue.</li><li><b>Secours</b> entre fournisseurs et régions ; disjoncteur sur un fournisseur dégradé.</li><li><b>Politiques</b> : données sensibles → modèle hébergé en interne ; client européen → région UE.</li><li><b>Mesure</b> : qualité, coût et latence par route ; chaque route évaluée.</li></ul>",
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
  "lit": "ref",
  "look": {},
  "scene": "ref",
  "fig": "",
  "panel": "<h2>Une politique de routage</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"red\"><span class=\"st\"><b>Sensible ?</b><i></i></span><pre class=\"ex\">if contient_donnees_sante(req): return &#x27;vllm-interne&#x27;</pre></li><li class=\"\"><span class=\"st\"><b>Tâche simple ?</b><i></i></span><pre class=\"ex\">if req.type in {&#x27;classer&#x27;, &#x27;extraire&#x27;}: return &#x27;petit&#x27;</pre></li><li class=\"\"><span class=\"st\"><b>Difficulté</b><i>classifieur</i></span><pre class=\"ex\">d = routeur.predire(req.texte)   # 0..1</pre></li><li class=\"blue\"><span class=\"st\"><b>Choix</b><i></i></span><pre class=\"ex\">return &#x27;raisonnement&#x27; if d &gt; 0.7 else &#x27;moyen&#x27;</pre></li><li class=\"\"><span class=\"st\"><b>Secours</b><i></i></span><pre class=\"ex\">fallbacks: moyen → autre fournisseur → interne</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "28.5",
  "title": "Les systèmes d’IA multi-locataires",
  "sub": "plusieurs clients, une plateforme",
  "body": "<p class=\"lede\">Un SaaS d’IA sert de nombreux clients (locataires) sur une même plateforme. L’isolation est critique.</p>\n    <table class=\"data\"><tr><th>niveau d’isolation</th><th>données</th><th>pour</th></tr><tr><td>filtre par tenant_id</td><td>mêmes tables et index, filtrés</td><td>nombreux petits clients</td></tr><tr><td>schéma ou collection par client</td><td>séparés logiquement</td><td>clients moyens</td></tr><tr><td>base ou déploiement dédié</td><td>séparés physiquement</td><td>grands comptes, exigences fortes</td></tr></table>\n    <ul class=\"rules\"><li>Le filtre de locataire est appliqué <b>par le serveur</b> sur chaque requête (base, index vectoriel, cache, mémoire d’agent, journaux), jamais déduit d’un paramètre envoyé par le client.</li><li>Quotas et coûts par locataire ; éviter qu’un client consomme toute la capacité (« voisin bruyant »).</li><li>Configuration par locataire : prompts, modèles autorisés, région, durée de conservation.</li><li>Tests automatiques d’isolation : un locataire ne doit jamais voir un document d’un autre.</li></ul>",
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
  "lit": "ref",
  "look": {},
  "scene": "ref",
  "fig": "",
  "panel": "<h2>Une architecture de référence</h2><div class=\"psub\">un assistant d’entreprise à grande échelle</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Clients</b><i>web, mobile, API</i></span><pre class=\"ex\">100 000 utilisateurs, pics à 500 req/s</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle</b><i>auth, limites, routage</i></span><pre class=\"ex\">API Gateway + WAF ; quotas par locataire</pre></li><li class=\"blue\"><span class=\"st\"><b>API sans état</b><i>N copies</i></span><pre class=\"ex\">FastAPI, mise à l’échelle horizontale</pre></li><li class=\"\"><span class=\"st\"><b>Orchestrateur</b><i>RAG, agents, garde-fous</i></span><pre class=\"ex\">budgets, délais, traces</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle LLM</b><i>routage, secours, cache</i></span><pre class=\"ex\">petit / grand modèle ; fournisseur A / B ; vLLM</pre></li><li class=\"blue\"><span class=\"st\"><b>Données</b><i></i></span><pre class=\"ex\">Postgres (+ réplicas), index vectoriel, Redis, S3</pre></li><li class=\"\"><span class=\"st\"><b>Asynchrone</b><i>files + travailleurs</i></span><pre class=\"ex\">ingestion, évaluations, lots</pre></li><li class=\"\"><span class=\"st\"><b>Observabilité</b><i></i></span><pre class=\"ex\">traces, coûts, qualité, alertes</pre></li></ol><p class=\"note\">Chaque couche se met à l’échelle indépendamment et peut tomber sans entraîner les autres. Les appels aux modèles, lents et coûteux, sont encadrés par une passerelle qui route, met en cache, réessaie et bascule.</p><table class=\"data\"><tr><th>API</th><td>sans état</td></tr><tr><th>modèles</th><td>derrière une passerelle</td></tr><tr><th>lent</th><td>en asynchrone</td></tr></table>"
 },
 {
  "kicker": "28.6",
  "title": "Les stratégies de cache",
  "sub": "à chaque étage",
  "body": "<p class=\"lede\">Le cache est le levier le plus puissant contre la latence et les coûts, à condition de bien gérer la fraîcheur et l’isolation.</p>\n    <table class=\"data\"><tr><th>cache</th><th>où</th><th>invalidation</th></tr><tr><td>cache de prompt</td><td>chez le fournisseur ou dans vLLM</td><td>automatique (préfixe identique)</td></tr><tr><td>réponses exactes</td><td>Redis, clé = hash du prompt complet</td><td>TTL, version des données</td></tr><tr><td>cache sémantique</td><td>index de questions déjà posées</td><td>seuil prudent, TTL court</td></tr><tr><td>plongements</td><td>clé = hash du texte + modèle</td><td>changement de modèle</td></tr><tr><td>résultats de récupération</td><td>clé = requête normalisée</td><td>réindexation</td></tr><tr><td>résultats d’outils</td><td>clé = outil + arguments</td><td>selon la donnée</td></tr></table>\n    <p>Règle : ne jamais partager un cache entre utilisateurs pour des contenus personnels ; inclure le locataire et les droits dans la clé.</p>",
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
  "lit": "lat",
  "look": {},
  "scene": "lat",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "28.7",
  "title": "Concevoir le stockage et les index",
  "sub": "où vit chaque donnée",
  "body": "<p class=\"lede\">Chaque type de donnée a son stockage adapté.</p>\n    <table class=\"data\"><tr><th>donnée</th><th>stockage</th></tr><tr><td>utilisateurs, conversations, coûts</td><td>PostgreSQL</td></tr><tr><td>documents sources, fichiers</td><td>stockage d’objets (S3)</td></tr><tr><td>morceaux + vecteurs</td><td>pgvector ou base vectorielle</td></tr><tr><td>index lexical</td><td>Postgres plein texte, OpenSearch, ou intégré à la base vectorielle</td></tr><tr><td>sessions, limites, cache</td><td>Redis</td></tr><tr><td>traces</td><td>outil d’observabilité (rétention limitée)</td></tr><tr><td>jeux d’évaluation</td><td>Git + DVC ou Hub</td></tr></table>\n    <ul class=\"rules\"><li>Dimensionner l’index vectoriel : nombre de morceaux × dimension × octets (+ graphe).</li><li>Stratégie de réindexation : nouvel index construit à côté, évalué, puis bascule d’alias.</li><li>Sauvegardes, réplicas de lecture, rétention conforme au RGPD.</li></ul>",
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
  "lit": "ref",
  "look": {},
  "scene": "ref",
  "fig": "",
  "panel": "<h2>Une architecture de référence</h2><div class=\"psub\">un assistant d’entreprise à grande échelle</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Clients</b><i>web, mobile, API</i></span><pre class=\"ex\">100 000 utilisateurs, pics à 500 req/s</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle</b><i>auth, limites, routage</i></span><pre class=\"ex\">API Gateway + WAF ; quotas par locataire</pre></li><li class=\"blue\"><span class=\"st\"><b>API sans état</b><i>N copies</i></span><pre class=\"ex\">FastAPI, mise à l’échelle horizontale</pre></li><li class=\"\"><span class=\"st\"><b>Orchestrateur</b><i>RAG, agents, garde-fous</i></span><pre class=\"ex\">budgets, délais, traces</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle LLM</b><i>routage, secours, cache</i></span><pre class=\"ex\">petit / grand modèle ; fournisseur A / B ; vLLM</pre></li><li class=\"blue\"><span class=\"st\"><b>Données</b><i></i></span><pre class=\"ex\">Postgres (+ réplicas), index vectoriel, Redis, S3</pre></li><li class=\"\"><span class=\"st\"><b>Asynchrone</b><i>files + travailleurs</i></span><pre class=\"ex\">ingestion, évaluations, lots</pre></li><li class=\"\"><span class=\"st\"><b>Observabilité</b><i></i></span><pre class=\"ex\">traces, coûts, qualité, alertes</pre></li></ol><p class=\"note\">Chaque couche se met à l’échelle indépendamment et peut tomber sans entraîner les autres. Les appels aux modèles, lents et coûteux, sont encadrés par une passerelle qui route, met en cache, réessaie et bascule.</p><table class=\"data\"><tr><th>API</th><td>sans état</td></tr><tr><th>modèles</th><td>derrière une passerelle</td></tr><tr><th>lent</th><td>en asynchrone</td></tr></table>"
 },
 {
  "kicker": "28.8",
  "title": "Le traitement distribué des tâches",
  "sub": "des millions de documents",
  "body": "<p class=\"lede\">Ingérer un corpus de 10 millions de documents, évaluer 50 000 cas, traiter un lot nocturne : il faut répartir le travail.</p>\n    <ul class=\"rules\"><li>Découper en petites tâches <b>idempotentes</b> (un document = une tâche) placées dans une file.</li><li>Des travailleurs en nombre ajustable consomment la file ; la concurrence vers chaque API est bornée.</li><li>Réessais avec attente ; file des échecs pour analyse ; reprise sans tout recommencer.</li><li>Pour les gros calculs (plongements sur GPU, inférence en lots) : <b>Ray</b>, Spark, ou le mode hors ligne de vLLM.</li><li>Suivi de l’avancement et du coût en temps réel.</li></ul>",
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
  "lit": "ref",
  "look": {},
  "scene": "ref",
  "fig": "",
  "panel": "<h2>Une architecture de référence</h2><div class=\"psub\">un assistant d’entreprise à grande échelle</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Clients</b><i>web, mobile, API</i></span><pre class=\"ex\">100 000 utilisateurs, pics à 500 req/s</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle</b><i>auth, limites, routage</i></span><pre class=\"ex\">API Gateway + WAF ; quotas par locataire</pre></li><li class=\"blue\"><span class=\"st\"><b>API sans état</b><i>N copies</i></span><pre class=\"ex\">FastAPI, mise à l’échelle horizontale</pre></li><li class=\"\"><span class=\"st\"><b>Orchestrateur</b><i>RAG, agents, garde-fous</i></span><pre class=\"ex\">budgets, délais, traces</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle LLM</b><i>routage, secours, cache</i></span><pre class=\"ex\">petit / grand modèle ; fournisseur A / B ; vLLM</pre></li><li class=\"blue\"><span class=\"st\"><b>Données</b><i></i></span><pre class=\"ex\">Postgres (+ réplicas), index vectoriel, Redis, S3</pre></li><li class=\"\"><span class=\"st\"><b>Asynchrone</b><i>files + travailleurs</i></span><pre class=\"ex\">ingestion, évaluations, lots</pre></li><li class=\"\"><span class=\"st\"><b>Observabilité</b><i></i></span><pre class=\"ex\">traces, coûts, qualité, alertes</pre></li></ol><p class=\"note\">Chaque couche se met à l’échelle indépendamment et peut tomber sans entraîner les autres. Les appels aux modèles, lents et coûteux, sont encadrés par une passerelle qui route, met en cache, réessaie et bascule.</p><table class=\"data\"><tr><th>API</th><td>sans état</td></tr><tr><th>modèles</th><td>derrière une passerelle</td></tr><tr><th>lent</th><td>en asynchrone</td></tr></table>"
 },
 {
  "kicker": "28.9",
  "title": "Tolérance aux pannes et réessais",
  "sub": "tout finit par tomber",
  "body": "<p class=\"lede\">Fournisseurs de modèles en surcharge, GPU qui redémarrent, réseau instable : un système d’IA doit dégrader son service plutôt que s’effondrer.</p>\n    <ul class=\"rules\"><li><b>Délais</b> sur chaque appel ; <b>réessais</b> avec attente exponentielle et aléa, uniquement pour les erreurs transitoires et les opérations idempotentes.</li><li><b>Disjoncteur</b> : après N échecs, couper un fournisseur et basculer vers le secours.</li><li><b>Dégradation gracieuse</b> : modèle plus petit, réponse sans reranking, message clair plutôt qu’une erreur.</li><li><b>Cloisons</b> (bulkheads) : un client ou une fonctionnalité ne peut pas épuiser toutes les ressources.</li><li><b>Points de contrôle</b> pour les tâches longues et les agents.</li><li>Tester les pannes (chaos engineering) : couper un fournisseur en préproduction.</li></ul>",
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
  "lit": "ref",
  "look": {},
  "scene": "ref",
  "fig": "",
  "panel": "<h2>Une architecture de référence</h2><div class=\"psub\">un assistant d’entreprise à grande échelle</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Clients</b><i>web, mobile, API</i></span><pre class=\"ex\">100 000 utilisateurs, pics à 500 req/s</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle</b><i>auth, limites, routage</i></span><pre class=\"ex\">API Gateway + WAF ; quotas par locataire</pre></li><li class=\"blue\"><span class=\"st\"><b>API sans état</b><i>N copies</i></span><pre class=\"ex\">FastAPI, mise à l’échelle horizontale</pre></li><li class=\"\"><span class=\"st\"><b>Orchestrateur</b><i>RAG, agents, garde-fous</i></span><pre class=\"ex\">budgets, délais, traces</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle LLM</b><i>routage, secours, cache</i></span><pre class=\"ex\">petit / grand modèle ; fournisseur A / B ; vLLM</pre></li><li class=\"blue\"><span class=\"st\"><b>Données</b><i></i></span><pre class=\"ex\">Postgres (+ réplicas), index vectoriel, Redis, S3</pre></li><li class=\"\"><span class=\"st\"><b>Asynchrone</b><i>files + travailleurs</i></span><pre class=\"ex\">ingestion, évaluations, lots</pre></li><li class=\"\"><span class=\"st\"><b>Observabilité</b><i></i></span><pre class=\"ex\">traces, coûts, qualité, alertes</pre></li></ol><p class=\"note\">Chaque couche se met à l’échelle indépendamment et peut tomber sans entraîner les autres. Les appels aux modèles, lents et coûteux, sont encadrés par une passerelle qui route, met en cache, réessaie et bascule.</p><table class=\"data\"><tr><th>API</th><td>sans état</td></tr><tr><th>modèles</th><td>derrière une passerelle</td></tr><tr><th>lent</th><td>en asynchrone</td></tr></table>"
 },
 {
  "kicker": "28.10",
  "title": "Optimiser les coûts",
  "sub": "chaque jeton compte",
  "body": "<p class=\"lede\">Le coût d’une application d’IA se pilote comme une métrique produit.</p>\n    <ul class=\"rules\"><li>Mesurer le <b>coût par tâche réussie</b> et par client ; identifier les 20 % de cas qui font 80 % des coûts.</li><li>Leviers par impact : choix et routage des modèles, cache de prompt, contexte plus court, sorties plus courtes, API de lots, cache de réponses, petits modèles affinés pour les tâches fréquentes, auto-hébergement au-delà d’un certain volume.</li><li>Côté GPU : quantification, batching, taux d’utilisation, réservation de la charge de base, préemptible pour le reste.</li><li>Garde-fous : budgets par agent et par utilisateur, alertes d’anomalie.</li></ul>",
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
  "lit": "lat",
  "look": {},
  "scene": "lat",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "28.11",
  "title": "Optimiser la latence",
  "sub": "la vitesse perçue",
  "body": "<p class=\"lede\">La latence perçue compte plus que la latence totale.</p>\n    <ul class=\"rules\"><li><b>Streaming</b> : le TTFT devient la mesure clé.</li><li><b>Paralléliser</b> les étapes indépendantes (récupération + garde-fous, outils indépendants).</li><li><b>Réduire</b> : prompts plus courts, moins de documents, sorties plus courtes, moins d’étapes d’agent.</li><li><b>Modèles</b> plus rapides pour les étapes intermédiaires (réécriture, routage) ; décodage spéculatif ; fournisseurs à faible latence.</li><li><b>Cache</b> de prompt et de réponses ; préchargement (pendant que l’utilisateur tape).</li><li><b>Interface</b> : afficher les étapes de l’agent, les sources trouvées, un indicateur d’avancement.</li></ul>",
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
  "lit": "lat",
  "look": {},
  "scene": "lat",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "28.12",
  "title": "La mise à l’échelle horizontale",
  "sub": "ajouter des machines",
  "body": "<p class=\"lede\">La <b>mise à l’échelle horizontale</b> ajoute des copies plutôt que d’agrandir une machine.</p>\n    <ul class=\"rules\"><li>API et travailleurs : sans état, derrière un répartiteur de charge, mise à l’échelle automatique sur la charge ou la file.</li><li>Serveurs de modèles : copies (parallélisme de données) avec un routage qui tient compte du <b>cache de préfixe</b> (envoyer les requêtes d’une même conversation sur la même copie).</li><li>Bases : réplicas de lecture, partitionnement par locataire, index vectoriels distribués (shards).</li><li>Limites externes : les quotas des fournisseurs ne grandissent pas avec vos machines ; négocier, répartir sur plusieurs comptes ou régions.</li></ul>",
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
  "lit": "ref",
  "look": {},
  "scene": "ref",
  "fig": "",
  "panel": "<h2>Une architecture de référence</h2><div class=\"psub\">un assistant d’entreprise à grande échelle</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Clients</b><i>web, mobile, API</i></span><pre class=\"ex\">100 000 utilisateurs, pics à 500 req/s</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle</b><i>auth, limites, routage</i></span><pre class=\"ex\">API Gateway + WAF ; quotas par locataire</pre></li><li class=\"blue\"><span class=\"st\"><b>API sans état</b><i>N copies</i></span><pre class=\"ex\">FastAPI, mise à l’échelle horizontale</pre></li><li class=\"\"><span class=\"st\"><b>Orchestrateur</b><i>RAG, agents, garde-fous</i></span><pre class=\"ex\">budgets, délais, traces</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle LLM</b><i>routage, secours, cache</i></span><pre class=\"ex\">petit / grand modèle ; fournisseur A / B ; vLLM</pre></li><li class=\"blue\"><span class=\"st\"><b>Données</b><i></i></span><pre class=\"ex\">Postgres (+ réplicas), index vectoriel, Redis, S3</pre></li><li class=\"\"><span class=\"st\"><b>Asynchrone</b><i>files + travailleurs</i></span><pre class=\"ex\">ingestion, évaluations, lots</pre></li><li class=\"\"><span class=\"st\"><b>Observabilité</b><i></i></span><pre class=\"ex\">traces, coûts, qualité, alertes</pre></li></ol><p class=\"note\">Chaque couche se met à l’échelle indépendamment et peut tomber sans entraîner les autres. Les appels aux modèles, lents et coûteux, sont encadrés par une passerelle qui route, met en cache, réessaie et bascule.</p><table class=\"data\"><tr><th>API</th><td>sans état</td></tr><tr><th>modèles</th><td>derrière une passerelle</td></tr><tr><th>lent</th><td>en asynchrone</td></tr></table>"
 },
 {
  "kicker": "28.13",
  "title": "Fiabilité et disponibilité",
  "sub": "promettre et tenir",
  "body": "<p class=\"lede\">La fiabilité se définit par des objectifs mesurables.</p>\n    <table class=\"data\"><tr><th>notion</th><th>exemple</th></tr><tr><td>SLI (indicateur)</td><td>part des requêtes réussies en moins de 3 s</td></tr><tr><td>SLO (objectif)</td><td>99,5 % sur 30 jours</td></tr><tr><td>budget d’erreur</td><td>0,5 % : au-delà, on gèle les nouveautés</td></tr><tr><td>SLA (contrat)</td><td>engagement envers le client, avec pénalités</td></tr></table>\n    <ul class=\"rules\"><li>Pour l’IA, ajouter des SLI de <b>qualité</b> : taux de réponses fidèles (juge en ligne), taux d’escalade.</li><li>Disponibilité composée : un service qui dépend de 3 composants à 99,9 % ne dépasse pas ≈ 99,7 % sans redondance.</li><li>Redondance : plusieurs fournisseurs, plusieurs zones, secours testés.</li><li>Procédures d’incident, post-mortems sans recherche de coupable, pages d’état.</li></ul>",
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
  "lit": "ref",
  "look": {},
  "scene": "ref",
  "fig": "",
  "panel": "<h2>Une architecture de référence</h2><div class=\"psub\">un assistant d’entreprise à grande échelle</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Clients</b><i>web, mobile, API</i></span><pre class=\"ex\">100 000 utilisateurs, pics à 500 req/s</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle</b><i>auth, limites, routage</i></span><pre class=\"ex\">API Gateway + WAF ; quotas par locataire</pre></li><li class=\"blue\"><span class=\"st\"><b>API sans état</b><i>N copies</i></span><pre class=\"ex\">FastAPI, mise à l’échelle horizontale</pre></li><li class=\"\"><span class=\"st\"><b>Orchestrateur</b><i>RAG, agents, garde-fous</i></span><pre class=\"ex\">budgets, délais, traces</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle LLM</b><i>routage, secours, cache</i></span><pre class=\"ex\">petit / grand modèle ; fournisseur A / B ; vLLM</pre></li><li class=\"blue\"><span class=\"st\"><b>Données</b><i></i></span><pre class=\"ex\">Postgres (+ réplicas), index vectoriel, Redis, S3</pre></li><li class=\"\"><span class=\"st\"><b>Asynchrone</b><i>files + travailleurs</i></span><pre class=\"ex\">ingestion, évaluations, lots</pre></li><li class=\"\"><span class=\"st\"><b>Observabilité</b><i></i></span><pre class=\"ex\">traces, coûts, qualité, alertes</pre></li></ol><p class=\"note\">Chaque couche se met à l’échelle indépendamment et peut tomber sans entraîner les autres. Les appels aux modèles, lents et coûteux, sont encadrés par une passerelle qui route, met en cache, réessaie et bascule.</p><table class=\"data\"><tr><th>API</th><td>sans état</td></tr><tr><th>modèles</th><td>derrière une passerelle</td></tr><tr><th>lent</th><td>en asynchrone</td></tr></table>"
 },
 {
  "kicker": "28.14",
  "title": "L’analyse des compromis",
  "sub": "il n’y a pas de solution parfaite",
  "body": "<p class=\"lede\">Chaque décision d’architecture échange une qualité contre une autre. Savoir expliciter ces compromis est la marque d’un ingénieur expérimenté.</p>\n    <table class=\"data\"><tr><th>compromis</th><th>d’un côté</th><th>de l’autre</th></tr><tr><td>qualité / coût</td><td>modèle de pointe</td><td>petit modèle affiné</td></tr><tr><td>qualité / latence</td><td>reranking, agent, raisonnement</td><td>réponse directe</td></tr><tr><td>contrôle / simplicité</td><td>auto-hébergement</td><td>API</td></tr><tr><td>flexibilité / fiabilité</td><td>agent autonome</td><td>workflow fixe</td></tr><tr><td>fraîcheur / coût</td><td>ingestion en continu</td><td>réindexation nocturne</td></tr><tr><td>rappel / précision</td><td>beaucoup de documents</td><td>peu, bien choisis</td></tr><tr><td>confidentialité / capacité</td><td>modèle local</td><td>modèle de pointe par API</td></tr></table>\n    <p>Toujours ramener le choix aux <b>besoins chiffrés</b> (latence cible, budget, exigences de données) et à des <b>mesures</b> sur ses propres cas, puis documenter la décision (ADR : Architecture Decision Record).</p>",
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
  "lit": "ref",
  "look": {},
  "scene": "ref",
  "fig": "",
  "panel": "<h2>Une architecture de référence</h2><div class=\"psub\">un assistant d’entreprise à grande échelle</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Clients</b><i>web, mobile, API</i></span><pre class=\"ex\">100 000 utilisateurs, pics à 500 req/s</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle</b><i>auth, limites, routage</i></span><pre class=\"ex\">API Gateway + WAF ; quotas par locataire</pre></li><li class=\"blue\"><span class=\"st\"><b>API sans état</b><i>N copies</i></span><pre class=\"ex\">FastAPI, mise à l’échelle horizontale</pre></li><li class=\"\"><span class=\"st\"><b>Orchestrateur</b><i>RAG, agents, garde-fous</i></span><pre class=\"ex\">budgets, délais, traces</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle LLM</b><i>routage, secours, cache</i></span><pre class=\"ex\">petit / grand modèle ; fournisseur A / B ; vLLM</pre></li><li class=\"blue\"><span class=\"st\"><b>Données</b><i></i></span><pre class=\"ex\">Postgres (+ réplicas), index vectoriel, Redis, S3</pre></li><li class=\"\"><span class=\"st\"><b>Asynchrone</b><i>files + travailleurs</i></span><pre class=\"ex\">ingestion, évaluations, lots</pre></li><li class=\"\"><span class=\"st\"><b>Observabilité</b><i></i></span><pre class=\"ex\">traces, coûts, qualité, alertes</pre></li></ol><p class=\"note\">Chaque couche se met à l’échelle indépendamment et peut tomber sans entraîner les autres. Les appels aux modèles, lents et coûteux, sont encadrés par une passerelle qui route, met en cache, réessaie et bascule.</p><table class=\"data\"><tr><th>API</th><td>sans état</td></tr><tr><th>modèles</th><td>derrière une passerelle</td></tr><tr><th>lent</th><td>en asynchrone</td></tr></table>"
 }
];
export const PLATES = {
  lat: { text: "Dans la plupart des applications de modèles de langage, la génération domine la latence. Optimiser la base de données de 20 ms ne change rien ; réduire la sortie, streamer, paralléliser les étapes indépendantes ou choisir un modèle plus rapide change tout. Mesurer avec des traces avant d’optimiser.", facts: () => [["dominant", "génération"], ["perçu", "TTFT avec streaming"], ["méthode", "traces, p95"]] }
};
