// Chapitre 24 : Le backend des applications d’IA (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 24 · Backend",
  "title": "Le backend des applications d’IA",
  "sub": "le service autour du modèle",
  "body": "<p class=\"lede\">Une application d’IA reste une application web : utilisateurs, authentification, base de données, API, tâches de fond, déploiement. Elle a en plus des particularités : réponses en flux, appels lents et coûteux, résultats non déterministes, données sensibles dans les prompts.</p>\n    <p>Ce chapitre présente les briques du backend Python moderne et la façon de les assembler pour un produit d’IA.</p>",
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
  "panel": "<h2>Une application d’IA typique</h2><div class=\"psub\">les couches</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Client</b><i>web, mobile</i></span><pre class=\"ex\">React, application iOS</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle</b><i>TLS, auth, limites</i></span><pre class=\"ex\">Caddy / Nginx / API Gateway</pre></li><li class=\"blue\"><span class=\"st\"><b>API</b><i>FastAPI</i></span><pre class=\"ex\">POST /chat (SSE), POST /documents</pre></li><li class=\"\"><span class=\"st\"><b>Services</b><i>logique métier</i></span><pre class=\"ex\">RAG, agents, outils, gabarits</pre></li><li class=\"blue\"><span class=\"st\"><b>Données</b><i></i></span><pre class=\"ex\">PostgreSQL + pgvector, Redis, S3</pre></li><li class=\"\"><span class=\"st\"><b>Travailleurs</b><i>tâches longues</i></span><pre class=\"ex\">ingestion, évaluations, lots</pre></li><li class=\"red\"><span class=\"st\"><b>Modèles</b><i>API ou vLLM</i></span><pre class=\"ex\">via une passerelle LLM (secours, coûts)</pre></li></ol><p class=\"note\">Le modèle n’est qu’une dépendance parmi d’autres. Le backend gère les utilisateurs, les droits, les données, les tâches longues, les coûts et la fiabilité. La plupart des difficultés de production se trouvent ici, pas dans le prompt.</p><table class=\"data\"><tr><th>API</th><td>FastAPI</td></tr><tr><th>données</th><td>PostgreSQL, Redis, S3</td></tr><tr><th>asynchrone</th><td>files + travailleurs</td></tr></table>"
 },
 {
  "kicker": "24.1",
  "title": "FastAPI",
  "sub": "le framework web de l’IA en Python",
  "body": "<p class=\"lede\"><b>FastAPI</b> est devenu le standard pour les API d’IA en Python : asynchrone, typé (Pydantic), documentation OpenAPI automatique, très bon support du streaming.</p>\n    <pre class=\"code\">app = FastAPI()\nclass Question(BaseModel):\n    texte: str = Field(min_length=1, max_length=4000)\n@app.post(&#x27;/ask&#x27;)\nasync def ask(q: Question, user: User = Depends(utilisateur_courant)) -&gt; Reponse:\n    docs = await rag.recuperer(q.texte, tenant=user.tenant)\n    return await rag.generer(q.texte, docs)</pre>\n    <ul class=\"rules\"><li>Lancer : <code>uvicorn app:app --workers 4</code> (ou <code>fastapi run</code>).</li><li><b>Dépendances</b> (Depends) pour l’authentification, la base, les clients de modèles.</li><li>Validation automatique des entrées et sorties ; documentation sur /docs.</li></ul>",
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
  "panel": "<h2>Une application d’IA typique</h2><div class=\"psub\">les couches</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Client</b><i>web, mobile</i></span><pre class=\"ex\">React, application iOS</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle</b><i>TLS, auth, limites</i></span><pre class=\"ex\">Caddy / Nginx / API Gateway</pre></li><li class=\"blue\"><span class=\"st\"><b>API</b><i>FastAPI</i></span><pre class=\"ex\">POST /chat (SSE), POST /documents</pre></li><li class=\"\"><span class=\"st\"><b>Services</b><i>logique métier</i></span><pre class=\"ex\">RAG, agents, outils, gabarits</pre></li><li class=\"blue\"><span class=\"st\"><b>Données</b><i></i></span><pre class=\"ex\">PostgreSQL + pgvector, Redis, S3</pre></li><li class=\"\"><span class=\"st\"><b>Travailleurs</b><i>tâches longues</i></span><pre class=\"ex\">ingestion, évaluations, lots</pre></li><li class=\"red\"><span class=\"st\"><b>Modèles</b><i>API ou vLLM</i></span><pre class=\"ex\">via une passerelle LLM (secours, coûts)</pre></li></ol><p class=\"note\">Le modèle n’est qu’une dépendance parmi d’autres. Le backend gère les utilisateurs, les droits, les données, les tâches longues, les coûts et la fiabilité. La plupart des difficultés de production se trouvent ici, pas dans le prompt.</p><table class=\"data\"><tr><th>API</th><td>FastAPI</td></tr><tr><th>données</th><td>PostgreSQL, Redis, S3</td></tr><tr><th>asynchrone</th><td>files + travailleurs</td></tr></table>"
 },
 {
  "kicker": "24.2",
  "title": "Flask",
  "sub": "le classique",
  "body": "<p class=\"lede\"><b>Flask</b> est un micro-framework web Python éprouvé, synchrone par défaut, simple et très répandu dans les projets existants et les outils internes.</p>\n    <pre class=\"code\">app = Flask(__name__)\n@app.post(&#x27;/resume&#x27;)\ndef resume():\n    texte = request.get_json()[&#x27;texte&#x27;]\n    r = client.messages.create(model=MODELE, max_tokens=500, messages=[{&#x27;role&#x27;: &#x27;user&#x27;, &#x27;content&#x27;: f&#x27;Résume : {texte}&#x27;}])\n    return jsonify(resume=r.content[0].text)</pre>\n    <p>Pour une nouvelle API d’IA, FastAPI est souvent préférable (asynchrone natif pour les appels lents, typage, streaming). Flask reste parfait pour une petite application interne. Django convient quand on a besoin d’un back-office complet, avec Django Ninja pour l’API.</p>",
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
  "panel": "<h2>Une application d’IA typique</h2><div class=\"psub\">les couches</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Client</b><i>web, mobile</i></span><pre class=\"ex\">React, application iOS</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle</b><i>TLS, auth, limites</i></span><pre class=\"ex\">Caddy / Nginx / API Gateway</pre></li><li class=\"blue\"><span class=\"st\"><b>API</b><i>FastAPI</i></span><pre class=\"ex\">POST /chat (SSE), POST /documents</pre></li><li class=\"\"><span class=\"st\"><b>Services</b><i>logique métier</i></span><pre class=\"ex\">RAG, agents, outils, gabarits</pre></li><li class=\"blue\"><span class=\"st\"><b>Données</b><i></i></span><pre class=\"ex\">PostgreSQL + pgvector, Redis, S3</pre></li><li class=\"\"><span class=\"st\"><b>Travailleurs</b><i>tâches longues</i></span><pre class=\"ex\">ingestion, évaluations, lots</pre></li><li class=\"red\"><span class=\"st\"><b>Modèles</b><i>API ou vLLM</i></span><pre class=\"ex\">via une passerelle LLM (secours, coûts)</pre></li></ol><p class=\"note\">Le modèle n’est qu’une dépendance parmi d’autres. Le backend gère les utilisateurs, les droits, les données, les tâches longues, les coûts et la fiabilité. La plupart des difficultés de production se trouvent ici, pas dans le prompt.</p><table class=\"data\"><tr><th>API</th><td>FastAPI</td></tr><tr><th>données</th><td>PostgreSQL, Redis, S3</td></tr><tr><th>asynchrone</th><td>files + travailleurs</td></tr></table>"
 },
 {
  "kicker": "24.3",
  "title": "Les API REST",
  "sub": "concevoir des points d’accès",
  "body": "<p class=\"lede\">Une API d’IA bien conçue suit les principes REST (chapitre 2) avec quelques spécificités :</p>\n    <ul class=\"rules\"><li>Ressources claires : <code>/conversations/{id}/messages</code>, <code>/documents</code>, <code>/jobs/{id}</code>.</li><li>Opérations longues : répondre <b>202</b> avec un identifiant de tâche, puis interrogation ou webhook.</li><li>Clé d’<b>idempotence</b> pour les créations (un réessai ne crée pas deux conversations).</li><li>Versionner (<code>/v1/</code>), paginer, renvoyer des erreurs structurées.</li><li>Exposer les métadonnées utiles au client : sources, identifiant de trace (pour un retour « pouce bas » rattaché à la bonne réponse).</li></ul>",
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
  "panel": "<h2>Une application d’IA typique</h2><div class=\"psub\">les couches</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Client</b><i>web, mobile</i></span><pre class=\"ex\">React, application iOS</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle</b><i>TLS, auth, limites</i></span><pre class=\"ex\">Caddy / Nginx / API Gateway</pre></li><li class=\"blue\"><span class=\"st\"><b>API</b><i>FastAPI</i></span><pre class=\"ex\">POST /chat (SSE), POST /documents</pre></li><li class=\"\"><span class=\"st\"><b>Services</b><i>logique métier</i></span><pre class=\"ex\">RAG, agents, outils, gabarits</pre></li><li class=\"blue\"><span class=\"st\"><b>Données</b><i></i></span><pre class=\"ex\">PostgreSQL + pgvector, Redis, S3</pre></li><li class=\"\"><span class=\"st\"><b>Travailleurs</b><i>tâches longues</i></span><pre class=\"ex\">ingestion, évaluations, lots</pre></li><li class=\"red\"><span class=\"st\"><b>Modèles</b><i>API ou vLLM</i></span><pre class=\"ex\">via une passerelle LLM (secours, coûts)</pre></li></ol><p class=\"note\">Le modèle n’est qu’une dépendance parmi d’autres. Le backend gère les utilisateurs, les droits, les données, les tâches longues, les coûts et la fiabilité. La plupart des difficultés de production se trouvent ici, pas dans le prompt.</p><table class=\"data\"><tr><th>API</th><td>FastAPI</td></tr><tr><th>données</th><td>PostgreSQL, Redis, S3</td></tr><tr><th>asynchrone</th><td>files + travailleurs</td></tr></table>"
 },
 {
  "kicker": "24.4",
  "title": "WebSockets et streaming",
  "sub": "envoyer au fil de l’eau",
  "body": "<p class=\"lede\">Pour afficher la réponse pendant sa génération, le serveur relaie le flux du modèle au client.</p>\n    <table class=\"data\"><tr><th>technique</th><th>sens</th><th>usage</th></tr><tr><td>SSE (Server-Sent Events)</td><td>serveur → client</td><td>chat textuel ; simple, passe les proxys HTTP</td></tr><tr><td>WebSocket</td><td>bidirectionnel</td><td>voix, collaboration, interruption</td></tr><tr><td>WebRTC</td><td>audio/vidéo temps réel</td><td>agents vocaux</td></tr></table>\n    <ul class=\"rules\"><li>Désactiver la mise en tampon des proxys (<code>X-Accel-Buffering: no</code>) sinon le flux arrive d’un bloc.</li><li>Gérer la déconnexion du client : annuler l’appel au modèle.</li><li>Envoyer des événements typés : jeton, appel d’outil, sources, fin, erreur.</li></ul>",
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
  "panel": "<h2>Relayer un flux en SSE</h2><div class=\"psub\">FastAPI</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Générateur</b><i></i></span><pre class=\"ex\">async def flux(q):\n    async with client.messages.stream(model=MODELE, max_tokens=1024, messages=[...]) as s:\n        async for t in s.text_stream:\n            yield f&#x27;data: {json.dumps({&quot;t&quot;: t})}\\n\\n&#x27;\n    yield &#x27;data: [FIN]\\n\\n&#x27;</pre></li><li class=\"\"><span class=\"st\"><b>Route</b><i></i></span><pre class=\"ex\">@app.post(&#x27;/chat&#x27;)\nasync def chat(q: Question):\n    return StreamingResponse(flux(q), media_type=&#x27;text/event-stream&#x27;,\n        headers={&#x27;X-Accel-Buffering&#x27;: &#x27;no&#x27;})</pre></li><li class=\"\"><span class=\"st\"><b>Client</b><i></i></span><pre class=\"ex\">const r = await fetch(&#x27;/chat&#x27;, {method: &#x27;POST&#x27;, body});\nfor await (const morceau of r.body.pipeThrough(new TextDecoderStream())) …</pre></li><li class=\"red\"><span class=\"st\"><b>Annuler</b><i></i></span><pre class=\"ex\">if await request.is_disconnected(): break</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "24.5",
  "title": "Le traitement asynchrone",
  "sub": "attendre sans bloquer",
  "body": "<p class=\"lede\">Les appels aux modèles durent de 1 à 60 secondes : un serveur synchrone bloquerait un fil par requête. Avec <b>asyncio</b> (chapitre 1), un seul processus gère des centaines d’attentes simultanées.</p>\n    <ul class=\"rules\"><li>Utiliser des clients asynchrones partout : <code>AsyncAnthropic</code>, <code>httpx.AsyncClient</code>, <code>asyncpg</code>, <code>redis.asyncio</code>.</li><li>Ne jamais appeler de fonction bloquante dans une route async (requests, time.sleep, calcul lourd) ; sinon <code>asyncio.to_thread</code> ou un travailleur.</li><li>Paralléliser les appels indépendants avec <code>asyncio.gather</code>.</li><li>Délais partout : un appel sans délai peut bloquer indéfiniment.</li></ul>",
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
  "panel": "<h2>Une application d’IA typique</h2><div class=\"psub\">les couches</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Client</b><i>web, mobile</i></span><pre class=\"ex\">React, application iOS</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle</b><i>TLS, auth, limites</i></span><pre class=\"ex\">Caddy / Nginx / API Gateway</pre></li><li class=\"blue\"><span class=\"st\"><b>API</b><i>FastAPI</i></span><pre class=\"ex\">POST /chat (SSE), POST /documents</pre></li><li class=\"\"><span class=\"st\"><b>Services</b><i>logique métier</i></span><pre class=\"ex\">RAG, agents, outils, gabarits</pre></li><li class=\"blue\"><span class=\"st\"><b>Données</b><i></i></span><pre class=\"ex\">PostgreSQL + pgvector, Redis, S3</pre></li><li class=\"\"><span class=\"st\"><b>Travailleurs</b><i>tâches longues</i></span><pre class=\"ex\">ingestion, évaluations, lots</pre></li><li class=\"red\"><span class=\"st\"><b>Modèles</b><i>API ou vLLM</i></span><pre class=\"ex\">via une passerelle LLM (secours, coûts)</pre></li></ol><p class=\"note\">Le modèle n’est qu’une dépendance parmi d’autres. Le backend gère les utilisateurs, les droits, les données, les tâches longues, les coûts et la fiabilité. La plupart des difficultés de production se trouvent ici, pas dans le prompt.</p><table class=\"data\"><tr><th>API</th><td>FastAPI</td></tr><tr><th>données</th><td>PostgreSQL, Redis, S3</td></tr><tr><th>asynchrone</th><td>files + travailleurs</td></tr></table>"
 },
 {
  "kicker": "24.6",
  "title": "Redis et la mise en cache",
  "sub": "ne pas payer deux fois",
  "body": "<p class=\"lede\"><b>Redis</b> est une base clé-valeur en mémoire, utilisée pour le cache, les sessions, les limites de débit, les files simples et la diffusion d’événements.</p>\n    <table class=\"data\"><tr><th>cache</th><th>clé</th><th>gain</th></tr><tr><td>réponses exactes</td><td>hash(modèle + prompt complet)</td><td>coût et latence nuls sur les répétitions</td></tr><tr><td>cache sémantique</td><td>plongement de la question, seuil de similarité</td><td>questions reformulées (risque de faux positifs)</td></tr><tr><td>plongements</td><td>hash du texte</td><td>ne pas replonger</td></tr><tr><td>résultats d’outils</td><td>outil + arguments, avec durée de vie</td><td>API externes lentes</td></tr></table>\n    <ul class=\"rules\"><li>Toujours une durée de vie (TTL) et une invalidation quand les données changent.</li><li>Ne pas mettre en cache des réponses personnelles dans un cache partagé entre utilisateurs.</li><li>Le <b>cache de prompt</b> du fournisseur est complémentaire : il accélère les préfixes communs, pas les réponses entières.</li></ul>",
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
  "panel": "<h2>Une application d’IA typique</h2><div class=\"psub\">les couches</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Client</b><i>web, mobile</i></span><pre class=\"ex\">React, application iOS</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle</b><i>TLS, auth, limites</i></span><pre class=\"ex\">Caddy / Nginx / API Gateway</pre></li><li class=\"blue\"><span class=\"st\"><b>API</b><i>FastAPI</i></span><pre class=\"ex\">POST /chat (SSE), POST /documents</pre></li><li class=\"\"><span class=\"st\"><b>Services</b><i>logique métier</i></span><pre class=\"ex\">RAG, agents, outils, gabarits</pre></li><li class=\"blue\"><span class=\"st\"><b>Données</b><i></i></span><pre class=\"ex\">PostgreSQL + pgvector, Redis, S3</pre></li><li class=\"\"><span class=\"st\"><b>Travailleurs</b><i>tâches longues</i></span><pre class=\"ex\">ingestion, évaluations, lots</pre></li><li class=\"red\"><span class=\"st\"><b>Modèles</b><i>API ou vLLM</i></span><pre class=\"ex\">via une passerelle LLM (secours, coûts)</pre></li></ol><p class=\"note\">Le modèle n’est qu’une dépendance parmi d’autres. Le backend gère les utilisateurs, les droits, les données, les tâches longues, les coûts et la fiabilité. La plupart des difficultés de production se trouvent ici, pas dans le prompt.</p><table class=\"data\"><tr><th>API</th><td>FastAPI</td></tr><tr><th>données</th><td>PostgreSQL, Redis, S3</td></tr><tr><th>asynchrone</th><td>files + travailleurs</td></tr></table>"
 },
 {
  "kicker": "24.7",
  "title": "PostgreSQL",
  "sub": "la base à tout faire",
  "body": "<p class=\"lede\">Pour une application d’IA, <b>PostgreSQL</b> stocke les utilisateurs, conversations, messages, documents, retours, coûts, et souvent les vecteurs (pgvector).</p>\n    <pre class=\"code\">CREATE TABLE messages (\n  id bigserial PRIMARY KEY, conversation_id uuid NOT NULL REFERENCES conversations,\n  role text NOT NULL, contenu jsonb NOT NULL,\n  modele text, prompt_version text, jetons_entree int, jetons_sortie int, cout_usd numeric(10,6),\n  trace_id text, cree_le timestamptz DEFAULT now());</pre>\n    <ul class=\"rules\"><li>Accès asynchrone : SQLAlchemy 2 async, asyncpg ; migrations avec Alembic.</li><li><b>JSONB</b> pour les contenus de messages (blocs texte, outils, images).</li><li>Sécurité au niveau des lignes (RLS) pour isoler les locataires.</li><li>Une seule base pour les données et les vecteurs simplifie les transactions et les droits, jusqu’à quelques millions de vecteurs.</li></ul>",
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
  "panel": "<h2>Une application d’IA typique</h2><div class=\"psub\">les couches</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Client</b><i>web, mobile</i></span><pre class=\"ex\">React, application iOS</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle</b><i>TLS, auth, limites</i></span><pre class=\"ex\">Caddy / Nginx / API Gateway</pre></li><li class=\"blue\"><span class=\"st\"><b>API</b><i>FastAPI</i></span><pre class=\"ex\">POST /chat (SSE), POST /documents</pre></li><li class=\"\"><span class=\"st\"><b>Services</b><i>logique métier</i></span><pre class=\"ex\">RAG, agents, outils, gabarits</pre></li><li class=\"blue\"><span class=\"st\"><b>Données</b><i></i></span><pre class=\"ex\">PostgreSQL + pgvector, Redis, S3</pre></li><li class=\"\"><span class=\"st\"><b>Travailleurs</b><i>tâches longues</i></span><pre class=\"ex\">ingestion, évaluations, lots</pre></li><li class=\"red\"><span class=\"st\"><b>Modèles</b><i>API ou vLLM</i></span><pre class=\"ex\">via une passerelle LLM (secours, coûts)</pre></li></ol><p class=\"note\">Le modèle n’est qu’une dépendance parmi d’autres. Le backend gère les utilisateurs, les droits, les données, les tâches longues, les coûts et la fiabilité. La plupart des difficultés de production se trouvent ici, pas dans le prompt.</p><table class=\"data\"><tr><th>API</th><td>FastAPI</td></tr><tr><th>données</th><td>PostgreSQL, Redis, S3</td></tr><tr><th>asynchrone</th><td>files + travailleurs</td></tr></table>"
 },
 {
  "kicker": "24.8",
  "title": "Les tâches en arrière-plan",
  "sub": "le travail qui ne tient pas dans une requête",
  "body": "<p class=\"lede\">Ingérer 5 000 documents, lancer une évaluation, générer un rapport de 20 pages : ces travaux ne doivent pas bloquer une requête HTTP.</p>\n    <ul class=\"rules\"><li>L’API enregistre la tâche et répond 202 avec un identifiant ; un <b>travailleur</b> l’exécute ; le client suit l’avancement (interrogation, SSE, webhook).</li><li>Outils : <b>Celery</b>, <b>Dramatiq</b>, <b>RQ</b>, <b>ARQ</b> (asynchrone), Taskiq ; <b>Temporal</b> pour les workflows durables.</li><li>Réessais avec attente, délais, file des échecs (dead letter), idempotence.</li><li>Pour quelques tâches légères : <code>BackgroundTasks</code> de FastAPI, sans garantie en cas de redémarrage.</li></ul>",
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
  "panel": "<h2>Une tâche d’ingestion avec Celery</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Tâche</b><i></i></span><pre class=\"ex\">@celery.task(bind=True, max_retries=5, acks_late=True)\ndef ingerer(self, doc_id):\n    try: pipeline.ingerer(doc_id)\n    except ErreurTemporaire as e: raise self.retry(exc=e, countdown=2 ** self.request.retries)</pre></li><li class=\"\"><span class=\"st\"><b>Lancer</b><i></i></span><pre class=\"ex\">job = ingerer.delay(doc_id)\nreturn JSONResponse({&#x27;job_id&#x27;: job.id}, status_code=202)</pre></li><li class=\"\"><span class=\"st\"><b>Suivre</b><i></i></span><pre class=\"ex\">GET /jobs/{id} → AsyncResult(id).state</pre></li><li class=\"red\"><span class=\"st\"><b>Travailleur</b><i></i></span><pre class=\"ex\">celery -A app worker --concurrency 8</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "24.9",
  "title": "Les files de messages",
  "sub": "découpler les services",
  "body": "<p class=\"lede\">Une <b>file de messages</b> transporte des messages entre producteurs et consommateurs, qui travaillent chacun à leur rythme.</p>\n    <table class=\"data\"><tr><th>outil</th><th>modèle</th><th>usage</th></tr><tr><td>Redis (listes, streams)</td><td>file simple</td><td>petites charges</td></tr><tr><td>RabbitMQ</td><td>file avec accusés de réception</td><td>tâches, routage</td></tr><tr><td>Kafka, Redpanda</td><td>journal d’événements rejouable</td><td>flux massifs, analytique</td></tr><tr><td>SQS, Pub/Sub, Service Bus</td><td>services gérés</td><td>cloud</td></tr></table>\n    <ul class=\"rules\"><li>Absorber les pics : 10 000 documents arrivent, les travailleurs les traitent au rythme permis par les limites d’API.</li><li>Découpler : l’ingestion ne dépend pas de la disponibilité du service de plongements.</li><li>Penser « au moins une fois » : un message peut être livré deux fois, d’où l’idempotence.</li></ul>",
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
  "panel": "<h2>Une application d’IA typique</h2><div class=\"psub\">les couches</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Client</b><i>web, mobile</i></span><pre class=\"ex\">React, application iOS</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle</b><i>TLS, auth, limites</i></span><pre class=\"ex\">Caddy / Nginx / API Gateway</pre></li><li class=\"blue\"><span class=\"st\"><b>API</b><i>FastAPI</i></span><pre class=\"ex\">POST /chat (SSE), POST /documents</pre></li><li class=\"\"><span class=\"st\"><b>Services</b><i>logique métier</i></span><pre class=\"ex\">RAG, agents, outils, gabarits</pre></li><li class=\"blue\"><span class=\"st\"><b>Données</b><i></i></span><pre class=\"ex\">PostgreSQL + pgvector, Redis, S3</pre></li><li class=\"\"><span class=\"st\"><b>Travailleurs</b><i>tâches longues</i></span><pre class=\"ex\">ingestion, évaluations, lots</pre></li><li class=\"red\"><span class=\"st\"><b>Modèles</b><i>API ou vLLM</i></span><pre class=\"ex\">via une passerelle LLM (secours, coûts)</pre></li></ol><p class=\"note\">Le modèle n’est qu’une dépendance parmi d’autres. Le backend gère les utilisateurs, les droits, les données, les tâches longues, les coûts et la fiabilité. La plupart des difficultés de production se trouvent ici, pas dans le prompt.</p><table class=\"data\"><tr><th>API</th><td>FastAPI</td></tr><tr><th>données</th><td>PostgreSQL, Redis, S3</td></tr><tr><th>asynchrone</th><td>files + travailleurs</td></tr></table>"
 },
 {
  "kicker": "24.10",
  "title": "Authentification et autorisation",
  "sub": "qui est-ce, et a-t-il le droit ?",
  "body": "<p class=\"lede\"><b>Authentifier</b>, c’est vérifier l’identité ; <b>autoriser</b>, c’est vérifier les droits.</p>\n    <ul class=\"rules\"><li>Utilisateurs : OAuth 2.0 / OpenID Connect via un fournisseur d’identité (Auth0, Keycloak, Entra ID, Google), jetons JWT vérifiés à chaque requête.</li><li>Services : clés d’API par client, avec portée et rotation ; identités du cloud entre services.</li><li>Autorisation : rôles (RBAC) ou attributs (ABAC), vérifiés côté serveur pour chaque ressource.</li><li><b>Propager l’identité jusqu’aux outils et à la recherche</b> : un agent ou un RAG ne doit jamais lire ou faire plus que l’utilisateur qu’il sert.</li></ul>",
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
  "panel": "<h2>Vérifier un jeton dans FastAPI</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Schéma</b><i></i></span><pre class=\"ex\">bearer = HTTPBearer()</pre></li><li class=\"blue\"><span class=\"st\"><b>Dépendance</b><i></i></span><pre class=\"ex\">async def utilisateur_courant(c = Depends(bearer)) -&gt; User:\n    claims = jwt.decode(c.credentials, cle_publique, audience=&#x27;api&#x27;, algorithms=[&#x27;RS256&#x27;])\n    return await users.get(claims[&#x27;sub&#x27;])</pre></li><li class=\"red\"><span class=\"st\"><b>Autoriser</b><i></i></span><pre class=\"ex\">if doc.tenant != user.tenant: raise HTTPException(404)</pre></li><li class=\"\"><span class=\"st\"><b>Propager</b><i></i></span><pre class=\"ex\">rag.recuperer(q, tenant=user.tenant, groupes=user.groupes)</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "24.11",
  "title": "Limiter le débit",
  "sub": "protéger le service et le budget",
  "body": "<p class=\"lede\">Chaque requête coûte de l’argent : un utilisateur abusif ou un script mal écrit peut vider le budget en une nuit.</p>\n    <ul class=\"rules\"><li>Limites par utilisateur et par clé : requêtes par minute, <b>jetons</b> par jour, dépense par mois.</li><li>Algorithmes : seau à jetons, fenêtre glissante ; état partagé dans Redis.</li><li>Répondre <b>429</b> avec <code>Retry-After</code>.</li><li>Plafonds globaux de dépense et alertes ; coupure automatique au-delà d’un seuil.</li><li>Limiter aussi la taille des entrées (longueur des messages, nombre de fichiers).</li></ul>",
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
  "panel": "<h2>Un seau à jetons dans Redis</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Clé</b><i></i></span><pre class=\"ex\">cle = f&#x27;rl:{user.id}:{minute_courante}&#x27;</pre></li><li class=\"blue\"><span class=\"st\"><b>Compter</b><i></i></span><pre class=\"ex\">n = await redis.incr(cle); await redis.expire(cle, 60)</pre></li><li class=\"\"><span class=\"st\"><b>Refuser</b><i></i></span><pre class=\"ex\">if n &gt; 30: raise HTTPException(429, headers={&#x27;Retry-After&#x27;: &#x27;60&#x27;})</pre></li><li class=\"\"><span class=\"st\"><b>Budget jetons</b><i></i></span><pre class=\"ex\">await redis.incrby(f&#x27;tok:{user.id}:{jour}&#x27;, r.usage.output_tokens)</pre></li><li class=\"red\"><span class=\"st\"><b>Bibliothèque</b><i></i></span><pre class=\"ex\">slowapi, fastapi-limiter, ou la passerelle</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "24.12",
  "title": "La sécurité des API",
  "sub": "les bases, plus les risques propres à l’IA",
  "body": "<p class=\"lede\">Les règles classiques s’appliquent (OWASP API Top 10), avec des risques nouveaux.</p>\n    <ul class=\"rules\"><li>Classique : HTTPS partout, validation stricte des entrées, autorisation par objet, secrets hors du code, dépendances à jour, journaux sans données sensibles, en-têtes de sécurité, CORS restreint.</li><li>Propre à l’IA : injection de prompt (chapitre 27), fuite de données d’un utilisateur à l’autre via le contexte ou le cache, sorties du modèle insérées sans échappement dans une page (XSS) ou une requête SQL, coûts non bornés (déni de portefeuille).</li><li>Traiter toute sortie du modèle comme une <b>entrée non fiable</b> : l’échapper, la valider, ne jamais l’exécuter directement.</li></ul>",
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
  "panel": "<h2>Une application d’IA typique</h2><div class=\"psub\">les couches</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Client</b><i>web, mobile</i></span><pre class=\"ex\">React, application iOS</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle</b><i>TLS, auth, limites</i></span><pre class=\"ex\">Caddy / Nginx / API Gateway</pre></li><li class=\"blue\"><span class=\"st\"><b>API</b><i>FastAPI</i></span><pre class=\"ex\">POST /chat (SSE), POST /documents</pre></li><li class=\"\"><span class=\"st\"><b>Services</b><i>logique métier</i></span><pre class=\"ex\">RAG, agents, outils, gabarits</pre></li><li class=\"blue\"><span class=\"st\"><b>Données</b><i></i></span><pre class=\"ex\">PostgreSQL + pgvector, Redis, S3</pre></li><li class=\"\"><span class=\"st\"><b>Travailleurs</b><i>tâches longues</i></span><pre class=\"ex\">ingestion, évaluations, lots</pre></li><li class=\"red\"><span class=\"st\"><b>Modèles</b><i>API ou vLLM</i></span><pre class=\"ex\">via une passerelle LLM (secours, coûts)</pre></li></ol><p class=\"note\">Le modèle n’est qu’une dépendance parmi d’autres. Le backend gère les utilisateurs, les droits, les données, les tâches longues, les coûts et la fiabilité. La plupart des difficultés de production se trouvent ici, pas dans le prompt.</p><table class=\"data\"><tr><th>API</th><td>FastAPI</td></tr><tr><th>données</th><td>PostgreSQL, Redis, S3</td></tr><tr><th>asynchrone</th><td>files + travailleurs</td></tr></table>"
 },
 {
  "kicker": "24.13",
  "title": "Les bases des microservices",
  "sub": "découper, ou pas",
  "body": "<p class=\"lede\">Les <b>microservices</b> découpent une application en services indépendants qui communiquent par API ou messages.</p>\n    <ul class=\"rules\"><li>Découpages naturels en IA : service d’API, service d’ingestion, service de plongements, serveur de modèle (GPU), service d’évaluation.</li><li>Avantages : mise à l’échelle séparée (les GPU coûtent cher), déploiements indépendants, équipes autonomes.</li><li>Coûts : réseau, observabilité distribuée, cohérence des données, complexité d’exploitation.</li><li>Commencer par un <b>monolithe modulaire</b> bien structuré ; extraire un service quand une contrainte réelle l’exige (GPU, charge, équipe).</li></ul>",
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
  "panel": "<h2>Une application d’IA typique</h2><div class=\"psub\">les couches</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Client</b><i>web, mobile</i></span><pre class=\"ex\">React, application iOS</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle</b><i>TLS, auth, limites</i></span><pre class=\"ex\">Caddy / Nginx / API Gateway</pre></li><li class=\"blue\"><span class=\"st\"><b>API</b><i>FastAPI</i></span><pre class=\"ex\">POST /chat (SSE), POST /documents</pre></li><li class=\"\"><span class=\"st\"><b>Services</b><i>logique métier</i></span><pre class=\"ex\">RAG, agents, outils, gabarits</pre></li><li class=\"blue\"><span class=\"st\"><b>Données</b><i></i></span><pre class=\"ex\">PostgreSQL + pgvector, Redis, S3</pre></li><li class=\"\"><span class=\"st\"><b>Travailleurs</b><i>tâches longues</i></span><pre class=\"ex\">ingestion, évaluations, lots</pre></li><li class=\"red\"><span class=\"st\"><b>Modèles</b><i>API ou vLLM</i></span><pre class=\"ex\">via une passerelle LLM (secours, coûts)</pre></li></ol><p class=\"note\">Le modèle n’est qu’une dépendance parmi d’autres. Le backend gère les utilisateurs, les droits, les données, les tâches longues, les coûts et la fiabilité. La plupart des difficultés de production se trouvent ici, pas dans le prompt.</p><table class=\"data\"><tr><th>API</th><td>FastAPI</td></tr><tr><th>données</th><td>PostgreSQL, Redis, S3</td></tr><tr><th>asynchrone</th><td>files + travailleurs</td></tr></table>"
 },
 {
  "kicker": "24.14",
  "title": "L’architecture d’une application d’IA",
  "sub": "assembler le tout",
  "body": "<p class=\"lede\">Une architecture de référence pour un assistant d’entreprise :</p>\n    <table class=\"data\"><tr><th>couche</th><th>choix courant</th></tr><tr><td>interface</td><td>web (React, Next.js) avec flux SSE</td></tr><tr><td>API</td><td>FastAPI asynchrone, authentification OIDC</td></tr><tr><td>orchestration</td><td>code Python simple ou LangGraph</td></tr><tr><td>connaissance</td><td>pipeline d’ingestion + PostgreSQL/pgvector ou Qdrant</td></tr><tr><td>modèles</td><td>passerelle LLM (routage, secours, coûts) vers API et/ou vLLM</td></tr><tr><td>tâches</td><td>Celery ou Temporal + Redis/RabbitMQ</td></tr><tr><td>observabilité</td><td>OpenTelemetry + Langfuse, Prometheus, Grafana</td></tr><tr><td>évaluation</td><td>jeux versionnés, CI, juges en ligne</td></tr><tr><td>déploiement</td><td>conteneurs, Kubernetes ou PaaS (chapitre 26)</td></tr></table>\n    <p>Principes : séparer le métier des fournisseurs de modèles (interfaces), tout tracer, tout borner (délais, budgets), et garder le système <b>évaluable</b> à chaque changement.</p>",
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
  "panel": "<h2>Une application d’IA typique</h2><div class=\"psub\">les couches</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Client</b><i>web, mobile</i></span><pre class=\"ex\">React, application iOS</pre></li><li class=\"red\"><span class=\"st\"><b>Passerelle</b><i>TLS, auth, limites</i></span><pre class=\"ex\">Caddy / Nginx / API Gateway</pre></li><li class=\"blue\"><span class=\"st\"><b>API</b><i>FastAPI</i></span><pre class=\"ex\">POST /chat (SSE), POST /documents</pre></li><li class=\"\"><span class=\"st\"><b>Services</b><i>logique métier</i></span><pre class=\"ex\">RAG, agents, outils, gabarits</pre></li><li class=\"blue\"><span class=\"st\"><b>Données</b><i></i></span><pre class=\"ex\">PostgreSQL + pgvector, Redis, S3</pre></li><li class=\"\"><span class=\"st\"><b>Travailleurs</b><i>tâches longues</i></span><pre class=\"ex\">ingestion, évaluations, lots</pre></li><li class=\"red\"><span class=\"st\"><b>Modèles</b><i>API ou vLLM</i></span><pre class=\"ex\">via une passerelle LLM (secours, coûts)</pre></li></ol><p class=\"note\">Le modèle n’est qu’une dépendance parmi d’autres. Le backend gère les utilisateurs, les droits, les données, les tâches longues, les coûts et la fiabilité. La plupart des difficultés de production se trouvent ici, pas dans le prompt.</p><table class=\"data\"><tr><th>API</th><td>FastAPI</td></tr><tr><th>données</th><td>PostgreSQL, Redis, S3</td></tr><tr><th>asynchrone</th><td>files + travailleurs</td></tr></table>"
 }
];
export const PLATES = {

};
