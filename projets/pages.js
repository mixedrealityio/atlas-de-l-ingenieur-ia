// Chapitre 29 : Construire des projets réels (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 29 · Projets",
  "title": "Construire des projets réels",
  "sub": "apprendre en construisant",
  "body": "<p class=\"lede\">Les projets sont la meilleure façon d’apprendre et la meilleure preuve de compétence. Un recruteur regarde moins la liste des technologies que la capacité à <b>terminer</b> un système qui marche, à le <b>mesurer</b> et à <b>expliquer ses compromis</b>.</p>\n    <p>Ce chapitre propose treize projets, du plus accessible au plus complet. Pour chacun : ce qu’il fait, les briques suggérées, ce qu’il démontre et des jalons. Adaptez-les à un domaine qui vous intéresse (droit, santé, finance, éducation, industrie) : un projet ancré dans un vrai problème se remarque.</p>",
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
  "lit": "feuille",
  "look": {},
  "scene": "feuille",
  "fig": "",
  "panel": "<h2>Ce que chaque projet doit contenir</h2><div class=\"psub\">la liste de contrôle</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Démo</b><i></i></span><pre class=\"ex\">URL publique ou vidéo de 2 minutes</pre></li><li class=\"blue\"><span class=\"st\"><b>README</b><i></i></span><pre class=\"ex\">problème, architecture (schéma), lancement en une commande</pre></li><li class=\"red\"><span class=\"st\"><b>Évaluation</b><i></i></span><pre class=\"ex\">jeu de test, métriques, résultats chiffrés</pre></li><li class=\"\"><span class=\"st\"><b>Coûts et latence</b><i></i></span><pre class=\"ex\">mesurés, avec les choix faits pour les réduire</pre></li><li class=\"\"><span class=\"st\"><b>Tests et CI</b><i></i></span><pre class=\"ex\">pytest + GitHub Actions</pre></li><li class=\"\"><span class=\"st\"><b>Limites</b><i></i></span><pre class=\"ex\">ce qui ne marche pas encore, et pourquoi</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "29.1",
  "title": "Un assistant de recherche",
  "sub": "chercher, lire, synthétiser, citer",
  "body": "<p class=\"lede\">Un assistant qui reçoit une question, cherche sur le web et dans des articles (arXiv, Semantic Scholar), lit les sources pertinentes et rédige une synthèse structurée avec citations vérifiables.</p>\n    <table class=\"data\"><tr><th>brique</th><th>choix suggéré</th></tr><tr><td>modèle</td><td>API avec appels d’outils</td></tr><tr><td>outils</td><td>recherche web (Tavily, Brave), arXiv, lecture de page</td></tr><tr><td>orchestration</td><td>boucle d’agent maison ou Pydantic AI</td></tr><tr><td>interface</td><td>Streamlit ou Next.js avec streaming</td></tr></table>\n    <p><b>Ce que vous démontrez :</b> appels d’outils, boucle d’agent, gestion du contexte, citations, streaming.</p>\n    <p><b>Pour aller plus loin :</b> sous-agents parallèles par sous-question, rapport exporté en PDF, mémoire des recherches précédentes.</p>",
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
  "lit": "feuille",
  "look": {},
  "scene": "feuille",
  "fig": "",
  "panel": "<h2>Les jalons du projet</h2><div class=\"psub\">du minimum viable à la version présentable</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>V0</b><i>un seul appel</i></span><pre class=\"ex\">question → recherche → résumé</pre></li><li class=\"blue\"><span class=\"st\"><b>V1</b><i>boucle d’agent</i></span><pre class=\"ex\">plusieurs recherches, lecture de pages, limite de 10 tours</pre></li><li class=\"\"><span class=\"st\"><b>V2</b><i>citations vérifiées</i></span><pre class=\"ex\">chaque citation renvoie à un passage réel</pre></li><li class=\"red\"><span class=\"st\"><b>V3</b><i>évaluation</i></span><pre class=\"ex\">30 questions, juge de fidélité, coût par rapport</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "29.2",
  "title": "Une plateforme d’intelligence documentaire",
  "sub": "des documents aux données",
  "body": "<p class=\"lede\">Une application qui reçoit des documents (factures, contrats, formulaires, scans), les classe, en extrait les champs dans un schéma, valide les résultats et les envoie vers une base ou un tableur, avec une interface de vérification humaine.</p>\n    <table class=\"data\"><tr><th>brique</th><th>choix suggéré</th></tr><tr><td>analyse</td><td>Docling ou VLM ; OCR pour les scans</td></tr><tr><td>extraction</td><td>VLM + sorties structurées Pydantic</td></tr><tr><td>validation</td><td>règles métier (totaux, dates), score de confiance</td></tr><tr><td>stockage</td><td>PostgreSQL + S3</td></tr><tr><td>file</td><td>Celery pour le traitement par lots</td></tr></table>\n    <p><b>Ce que vous démontrez :</b> multimodal, sorties structurées, validation, traitement asynchrone, humain dans la boucle.</p>\n    <p><b>Pour aller plus loin :</b> apprentissage à partir des corrections humaines, comparaison VLM / OCR + LLM sur coût et précision.</p>",
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
  "lit": "feuille",
  "look": {},
  "scene": "feuille",
  "fig": "",
  "panel": "<h2>Les jalons du projet</h2><div class=\"psub\">du minimum viable à la version présentable</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>V0</b><i>un type de document</i></span><pre class=\"ex\">facture PDF → JSON validé</pre></li><li class=\"blue\"><span class=\"st\"><b>V1</b><i>classification</i></span><pre class=\"ex\">facture, contrat, devis → schéma adapté</pre></li><li class=\"\"><span class=\"st\"><b>V2</b><i>file et interface</i></span><pre class=\"ex\">dépôt en masse, écran de correction</pre></li><li class=\"red\"><span class=\"st\"><b>V3</b><i>mesure</i></span><pre class=\"ex\">exactitude par champ sur 200 documents annotés</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "29.3",
  "title": "Un système RAG prêt pour la production",
  "sub": "le projet phare",
  "body": "<p class=\"lede\">Un assistant qui répond aux questions sur un vrai corpus (documentation technique, textes de loi, cours) avec citations, refus quand l’information manque, droits d’accès et évaluation complète.</p>\n    <table class=\"data\"><tr><th>brique</th><th>choix suggéré</th></tr><tr><td>ingestion</td><td>incrémentale, Docling, découpage par sections</td></tr><tr><td>recherche</td><td>hybride (pgvector + BM25), reranking</td></tr><tr><td>génération</td><td>citations obligatoires, refus</td></tr><tr><td>API</td><td>FastAPI + SSE, authentification</td></tr><tr><td>éval et traces</td><td>Ragas, Langfuse</td></tr><tr><td>déploiement</td><td>Docker Compose ou Cloud Run</td></tr></table>\n    <p><b>Ce que vous démontrez :</b> tout le chapitre 14-15 : ingestion, recherche hybride, reranking, évaluation par étage, observabilité.</p>\n    <p><b>Pour aller plus loin :</b> RAG agentique pour les questions complexes, multi-locataires, réindexation sans interruption.</p>",
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
  "lit": "feuille",
  "look": {},
  "scene": "feuille",
  "fig": "",
  "panel": "<h2>Les jalons du projet</h2><div class=\"psub\">du minimum viable à la version présentable</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>V0</b><i>RAG naïf</i></span><pre class=\"ex\">découper, plonger, top 5, générer</pre></li><li class=\"red\"><span class=\"st\"><b>V1</b><i>jeu d’évaluation</i></span><pre class=\"ex\">100 questions + passages attendus ; rappel@10 mesuré</pre></li><li class=\"blue\"><span class=\"st\"><b>V2</b><i>améliorations mesurées</i></span><pre class=\"ex\">hybride, reranking, récupération contextuelle : tableau avant/après</pre></li><li class=\"\"><span class=\"st\"><b>V3</b><i>production</i></span><pre class=\"ex\">auth, droits, traces, CI d’évaluation, déploiement</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "29.4",
  "title": "Un système de recherche multi-agents",
  "sub": "un orchestrateur et ses spécialistes",
  "body": "<p class=\"lede\">Un système qui produit un rapport approfondi : un orchestrateur planifie, des sous-agents explorent en parallèle (web, articles, données chiffrées), un agent rédacteur assemble et un agent vérificateur contrôle les citations.</p>\n    <table class=\"data\"><tr><th>brique</th><th>choix suggéré</th></tr><tr><td>orchestration</td><td>LangGraph ou code maison</td></tr><tr><td>sous-agents</td><td>contexte propre, résumé structuré en sortie</td></tr><tr><td>parallélisme</td><td>asyncio</td></tr><tr><td>état</td><td>points de contrôle, reprise</td></tr><tr><td>évaluation</td><td>comparaison à un agent unique</td></tr></table>\n    <p><b>Ce que vous démontrez :</b> architecture multi-agents, gestion du contexte, coûts, comparaison honnête avec une base plus simple.</p>\n    <p><b>Pour aller plus loin :</b> validation humaine du plan, budget par sous-agent, interface de suivi en temps réel.</p>",
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
  "lit": "feuille",
  "look": {},
  "scene": "feuille",
  "fig": "",
  "panel": "<h2>Les jalons du projet</h2><div class=\"psub\">du minimum viable à la version présentable</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>V0</b><i>agent unique</i></span><pre class=\"ex\">ligne de base : qualité, coût, durée</pre></li><li class=\"blue\"><span class=\"st\"><b>V1</b><i>orchestrateur + 3 sous-agents</i></span><pre class=\"ex\">plan → recherche parallèle → synthèse</pre></li><li class=\"\"><span class=\"st\"><b>V2</b><i>vérificateur</i></span><pre class=\"ex\">citations contrôlées, contradictions signalées</pre></li><li class=\"red\"><span class=\"st\"><b>V3</b><i>bilan</i></span><pre class=\"ex\">qualité / coût / durée vs agent unique, sur 20 sujets</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "29.5",
  "title": "Un agent de support client",
  "sub": "résoudre, pas seulement répondre",
  "body": "<p class=\"lede\">Un agent qui répond aux clients d’une boutique fictive : FAQ (RAG), consultation de commandes, modification d’adresse, remboursement limité, escalade vers un humain avec résumé.</p>\n    <table class=\"data\"><tr><th>brique</th><th>choix suggéré</th></tr><tr><td>outils</td><td>commande, client, remboursement (≤ 50 €), ticket</td></tr><tr><td>données</td><td>base SQLite/Postgres simulée</td></tr><tr><td>garde-fous</td><td>confirmation, périmètre, PII</td></tr><tr><td>canal</td><td>widget web, éventuellement voix</td></tr><tr><td>évaluation</td><td>scénarios simulés avec un faux client (style τ-bench)</td></tr></table>\n    <p><b>Ce que vous démontrez :</b> agents avec outils sûrs, humain dans la boucle, évaluation de trajectoires, sécurité.</p>\n    <p><b>Pour aller plus loin :</b> tests d’injection de prompt, version vocale, tableau de bord pour les superviseurs.</p>",
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
  "lit": "feuille",
  "look": {},
  "scene": "feuille",
  "fig": "",
  "panel": "<h2>Les jalons du projet</h2><div class=\"psub\">du minimum viable à la version présentable</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>V0</b><i>FAQ</i></span><pre class=\"ex\">RAG sur les conditions de vente</pre></li><li class=\"blue\"><span class=\"st\"><b>V1</b><i>outils de lecture</i></span><pre class=\"ex\">statut de commande, historique</pre></li><li class=\"red\"><span class=\"st\"><b>V2</b><i>actions</i></span><pre class=\"ex\">remboursement avec limites et confirmation</pre></li><li class=\"\"><span class=\"st\"><b>V3</b><i>évaluation</i></span><pre class=\"ex\">50 scénarios simulés : taux de résolution, erreurs, coût</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "29.6",
  "title": "Un assistant de programmation",
  "sub": "un agent qui lit et modifie du code",
  "body": "<p class=\"lede\">Un agent en ligne de commande qui comprend un dépôt (recherche, lecture de fichiers), propose et applique des modifications, lance les tests et corrige jusqu’à ce qu’ils passent.</p>\n    <table class=\"data\"><tr><th>brique</th><th>choix suggéré</th></tr><tr><td>outils</td><td>lister, grep, lire, éditer (diff), exécuter les tests</td></tr><tr><td>isolation</td><td>conteneur Docker sans réseau</td></tr><tr><td>boucle</td><td>générer → tester → corriger, 3 essais</td></tr><tr><td>évaluation</td><td>un sous-ensemble de SWE-bench Lite ou des bogues maison</td></tr></table>\n    <p><b>Ce que vous démontrez :</b> conception d’outils, bac à sable, boucles d’autocorrection, évaluation objective (tests).</p>\n    <p><b>Pour aller plus loin :</b> serveur MCP pour l’exposer à d’autres agents, revue de code automatique sur les demandes de fusion.</p>",
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
  "lit": "feuille",
  "look": {},
  "scene": "feuille",
  "fig": "",
  "panel": "<h2>Les jalons du projet</h2><div class=\"psub\">du minimum viable à la version présentable</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>V0</b><i>explication</i></span><pre class=\"ex\">répondre à des questions sur un dépôt</pre></li><li class=\"blue\"><span class=\"st\"><b>V1</b><i>édition</i></span><pre class=\"ex\">appliquer une modification décrite</pre></li><li class=\"red\"><span class=\"st\"><b>V2</b><i>boucle de tests</i></span><pre class=\"ex\">corriger jusqu’au vert, dans un conteneur</pre></li><li class=\"\"><span class=\"st\"><b>V3</b><i>mesure</i></span><pre class=\"ex\">taux de réussite sur 30 tâches, coût moyen</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "29.7",
  "title": "Un assistant multimodal",
  "sub": "voir, entendre, parler",
  "body": "<p class=\"lede\">Un assistant qui accepte texte, photos et voix : on photographie un appareil en panne, on décrit le problème à l’oral, il identifie le modèle, cherche dans les manuels et répond à voix haute.</p>\n    <table class=\"data\"><tr><th>brique</th><th>choix suggéré</th></tr><tr><td>vision</td><td>VLM pour identifier et lire</td></tr><tr><td>voix</td><td>STT en flux + TTS</td></tr><tr><td>connaissance</td><td>RAG sur des manuels PDF (avec figures)</td></tr><tr><td>interface</td><td>application web mobile, WebRTC ou SSE</td></tr></table>\n    <p><b>Ce que vous démontrez :</b> VLM, parole, RAG multimodal, latence d’un pipeline temps réel.</p>\n    <p><b>Pour aller plus loin :</b> mode hors ligne avec modèles locaux, interruption de la voix par l’utilisateur.</p>",
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
  "lit": "feuille",
  "look": {},
  "scene": "feuille",
  "fig": "",
  "panel": "<h2>Les jalons du projet</h2><div class=\"psub\">du minimum viable à la version présentable</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>V0</b><i>photo + question</i></span><pre class=\"ex\">VLM seul</pre></li><li class=\"blue\"><span class=\"st\"><b>V1</b><i>RAG sur manuels</i></span><pre class=\"ex\">pages en images (ColPali) ou texte + figures</pre></li><li class=\"\"><span class=\"st\"><b>V2</b><i>voix</i></span><pre class=\"ex\">question orale, réponse parlée en flux</pre></li><li class=\"red\"><span class=\"st\"><b>V3</b><i>mesure</i></span><pre class=\"ex\">latence de bout en bout, exactitude sur 40 cas</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "29.8",
  "title": "Un système d’analyse de réunions",
  "sub": "transcrire, résumer, agir",
  "body": "<p class=\"lede\">Un service qui reçoit l’enregistrement d’une réunion, transcrit avec identification des locuteurs, produit un compte rendu (décisions, actions, responsables, échéances), et permet de poser des questions sur l’historique des réunions.</p>\n    <table class=\"data\"><tr><th>brique</th><th>choix suggéré</th></tr><tr><td>transcription</td><td>faster-whisper + pyannote</td></tr><tr><td>synthèse</td><td>LLM avec sortie structurée</td></tr><tr><td>recherche</td><td>RAG sur les transcriptions horodatées</td></tr><tr><td>intégrations</td><td>création de tâches (API d’un gestionnaire de projet)</td></tr><tr><td>tâches</td><td>traitement asynchrone, notification</td></tr></table>\n    <p><b>Ce que vous démontrez :</b> audio, pipelines asynchrones, sorties structurées, RAG temporel, intégrations.</p>\n    <p><b>Pour aller plus loin :</b> consentement et confidentialité, résumé en temps réel pendant la réunion.</p>",
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
  "lit": "feuille",
  "look": {},
  "scene": "feuille",
  "fig": "",
  "panel": "<h2>Les jalons du projet</h2><div class=\"psub\">du minimum viable à la version présentable</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>V0</b><i>transcription</i></span><pre class=\"ex\">fichier audio → texte horodaté</pre></li><li class=\"blue\"><span class=\"st\"><b>V1</b><i>compte rendu</i></span><pre class=\"ex\">décisions et actions en JSON</pre></li><li class=\"\"><span class=\"st\"><b>V2</b><i>questions</i></span><pre class=\"ex\">« qu’a-t-on décidé sur le budget en octobre ? »</pre></li><li class=\"red\"><span class=\"st\"><b>V3</b><i>qualité</i></span><pre class=\"ex\">WER mesuré, actions vérifiées par un humain sur 10 réunions</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "29.9",
  "title": "Un assistant de connaissances d’entreprise",
  "sub": "toute la documentation interne",
  "body": "<p class=\"lede\">Un assistant connecté à plusieurs sources (wiki, drive, tickets, base de données) qui respecte les droits de chaque employé, répond avec sources, et sait interroger des données chiffrées en SQL.</p>\n    <table class=\"data\"><tr><th>brique</th><th>choix suggéré</th></tr><tr><td>connecteurs</td><td>Confluence/Notion, Drive, tickets</td></tr><tr><td>droits</td><td>listes d’accès synchronisées, filtres</td></tr><tr><td>recherche</td><td>hybride + reranking + RAG agentique</td></tr><tr><td>données</td><td>outil texte-vers-SQL en lecture seule</td></tr><tr><td>auth</td><td>OIDC (Keycloak, Entra ID)</td></tr></table>\n    <p><b>Ce que vous démontrez :</b> multi-sources, sécurité et droits, routage RAG / SQL, architecture d’entreprise.</p>\n    <p><b>Pour aller plus loin :</b> mémoire des préférences, résumé hebdomadaire des nouveautés, déploiement sur Kubernetes.</p>",
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
  "lit": "feuille",
  "look": {},
  "scene": "feuille",
  "fig": "",
  "panel": "<h2>Les jalons du projet</h2><div class=\"psub\">du minimum viable à la version présentable</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>V0</b><i>une source</i></span><pre class=\"ex\">wiki indexé</pre></li><li class=\"red\"><span class=\"st\"><b>V1</b><i>droits</i></span><pre class=\"ex\">filtres par groupe, tests d’isolation</pre></li><li class=\"blue\"><span class=\"st\"><b>V2</b><i>multi-sources + SQL</i></span><pre class=\"ex\">routage selon la question</pre></li><li class=\"\"><span class=\"st\"><b>V3</b><i>exploitation</i></span><pre class=\"ex\">traces, retours utilisateurs, tableau de bord</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "29.10",
  "title": "Une plateforme d’automatisation de workflows",
  "sub": "des processus pilotés par l’IA",
  "body": "<p class=\"lede\">Une plateforme où l’on décrit des workflows (déclencheur → étapes → actions) combinant étapes classiques et étapes d’IA (classer, extraire, rédiger, décider), avec validation humaine, reprise et historique.</p>\n    <table class=\"data\"><tr><th>brique</th><th>choix suggéré</th></tr><tr><td>moteur</td><td>Temporal, ou LangGraph + Postgres</td></tr><tr><td>étapes IA</td><td>classification, extraction, rédaction</td></tr><tr><td>intégrations</td><td>courriel, webhooks, API</td></tr><tr><td>interface</td><td>éditeur simple de workflows, suivi des exécutions</td></tr></table>\n    <p><b>Ce que vous démontrez :</b> workflows durables, mélange code / IA, humain dans la boucle, idempotence.</p>\n    <p><b>Pour aller plus loin :</b> déclencheurs planifiés, coût par exécution, versionnement des workflows.</p>",
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
  "lit": "feuille",
  "look": {},
  "scene": "feuille",
  "fig": "",
  "panel": "<h2>Les jalons du projet</h2><div class=\"psub\">du minimum viable à la version présentable</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>V0</b><i>un workflow codé</i></span><pre class=\"ex\">courriel entrant → classé → réponse proposée</pre></li><li class=\"blue\"><span class=\"st\"><b>V1</b><i>durabilité</i></span><pre class=\"ex\">reprise après panne, réessais</pre></li><li class=\"\"><span class=\"st\"><b>V2</b><i>validation humaine</i></span><pre class=\"ex\">pause, approbation, reprise</pre></li><li class=\"red\"><span class=\"st\"><b>V3</b><i>plateforme</i></span><pre class=\"ex\">workflows configurables, tableau de bord</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "29.11",
  "title": "Un pipeline d’affinage sur mesure",
  "sub": "de la donnée au modèle servi",
  "body": "<p class=\"lede\">Un pipeline reproductible qui prépare un jeu de données (réel + synthétique), affine un petit modèle ouvert avec QLoRA, l’évalue contre un grand modèle et le sert avec vLLM.</p>\n    <table class=\"data\"><tr><th>brique</th><th>choix suggéré</th></tr><tr><td>données</td><td>génération synthétique + filtrage + DVC</td></tr><tr><td>entraînement</td><td>Unsloth ou TRL + PEFT, suivi W&B</td></tr><tr><td>évaluation</td><td>jeu de test, comparaison aux modèles d’API</td></tr><tr><td>service</td><td>vLLM avec adaptateur LoRA</td></tr><tr><td>automatisation</td><td>un script ou dvc repro de bout en bout</td></tr></table>\n    <p><b>Ce que vous démontrez :</b> données, affinage, évaluation honnête, service, reproductibilité, analyse coût / qualité.</p>\n    <p><b>Pour aller plus loin :</b> DPO à partir de préférences, distillation d’un modèle de raisonnement, quantification pour le service.</p>",
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
  "lit": "feuille",
  "look": {},
  "scene": "feuille",
  "fig": "",
  "panel": "<h2>Les jalons du projet</h2><div class=\"psub\">du minimum viable à la version présentable</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>V0</b><i>ligne de base</i></span><pre class=\"ex\">petit modèle + prompt, grand modèle + prompt : scores</pre></li><li class=\"blue\"><span class=\"st\"><b>V1</b><i>données</i></span><pre class=\"ex\">3 000 exemples nettoyés et versionnés</pre></li><li class=\"\"><span class=\"st\"><b>V2</b><i>affinage QLoRA</i></span><pre class=\"ex\">suivi des expériences, choix du meilleur point</pre></li><li class=\"red\"><span class=\"st\"><b>V3</b><i>bilan</i></span><pre class=\"ex\">qualité ≈ grand modèle ? coût ÷ ? latence ?</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "29.12",
  "title": "Une plateforme d’évaluation de modèles",
  "sub": "mesurer pour décider",
  "body": "<p class=\"lede\">Une application qui gère des jeux d’évaluation, lance des campagnes sur plusieurs modèles et versions de prompts, combine métriques automatiques, juges calibrés et annotation humaine, et affiche les comparaisons.</p>\n    <table class=\"data\"><tr><th>brique</th><th>choix suggéré</th></tr><tr><td>jeux</td><td>import JSONL, versions</td></tr><tr><td>exécution</td><td>file de tâches, appels parallèles bornés</td></tr><tr><td>métriques</td><td>exactes, juges, coûts, latence</td></tr><tr><td>annotation</td><td>interface de notation humaine</td></tr><tr><td>rapports</td><td>tableaux comparatifs, cas qui changent</td></tr></table>\n    <p><b>Ce que vous démontrez :</b> évaluation (chapitre 21), juges et leur calibration, statistiques, ingénierie logicielle.</p>\n    <p><b>Pour aller plus loin :</b> intervalles de confiance, tests appariés, détection de contamination.</p>",
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
  "lit": "feuille",
  "look": {},
  "scene": "feuille",
  "fig": "",
  "panel": "<h2>Les jalons du projet</h2><div class=\"psub\">du minimum viable à la version présentable</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>V0</b><i>un jeu, un modèle</i></span><pre class=\"ex\">script → tableau de scores</pre></li><li class=\"blue\"><span class=\"st\"><b>V1</b><i>comparaisons</i></span><pre class=\"ex\">plusieurs modèles et prompts, cas par cas</pre></li><li class=\"\"><span class=\"st\"><b>V2</b><i>juges calibrés</i></span><pre class=\"ex\">accord avec l’humain mesuré</pre></li><li class=\"red\"><span class=\"st\"><b>V3</b><i>CI</i></span><pre class=\"ex\">intégration GitHub Actions avec seuils</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "29.13",
  "title": "Un SaaS d’IA de bout en bout",
  "sub": "le projet de synthèse",
  "body": "<p class=\"lede\">Un produit complet pour un vrai public (par exemple un assistant pour cabinets comptables ou pour enseignants) : comptes, abonnements, multi-locataires, RAG, agents, évaluation, observabilité, déploiement, coûts maîtrisés.</p>\n    <table class=\"data\"><tr><th>brique</th><th>choix suggéré</th></tr><tr><td>produit</td><td>landing page, inscription, abonnement (Stripe)</td></tr><tr><td>backend</td><td>FastAPI, Postgres, Redis, Celery</td></tr><tr><td>IA</td><td>RAG + agent avec outils, passerelle LLM</td></tr><tr><td>plateforme</td><td>Docker, Terraform, CI/CD, Kubernetes ou PaaS</td></tr><tr><td>exploitation</td><td>traces, coûts par client, alertes, SLO</td></tr></table>\n    <p><b>Ce que vous démontrez :</b> tout l’atlas : la capacité à livrer et exploiter un produit d’IA réel.</p>\n    <p><b>Pour aller plus loin :</b> conformité RGPD et AI Act, mise à l’échelle, tableau de bord d’affaires (coût / revenu par client).</p>",
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
  "lit": "feuille",
  "look": {},
  "scene": "feuille",
  "fig": "",
  "panel": "<h2>Les jalons du projet</h2><div class=\"psub\">du minimum viable à la version présentable</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>V0</b><i>cœur de valeur</i></span><pre class=\"ex\">une fonctionnalité d’IA qui résout un vrai problème</pre></li><li class=\"blue\"><span class=\"st\"><b>V1</b><i>produit</i></span><pre class=\"ex\">comptes, multi-locataires, paiement</pre></li><li class=\"\"><span class=\"st\"><b>V2</b><i>qualité</i></span><pre class=\"ex\">évaluation continue, garde-fous, traces</pre></li><li class=\"red\"><span class=\"st\"><b>V3</b><i>utilisateurs</i></span><pre class=\"ex\">10 vrais utilisateurs, retours, itérations</pre></li></ol><p class=\"note\"></p>"
 }
];
export const PLATES = {

};
