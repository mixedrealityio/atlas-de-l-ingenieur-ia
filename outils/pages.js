// Chapitre 2 : Les outils du développeur (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 2 · Programmation",
  "title": "Les outils du développeur",
  "sub": "le socle commun",
  "body": "<p class=\"lede\">Un ingénieur IA est d’abord un <b>ingénieur logiciel</b>. Les modèles changent tous les six mois ; Git, le terminal, HTTP et les structures de données restent.</p>\n    <p>Ce chapitre rassemble ces bases : choisir la bonne structure de données, versionner son code, travailler sur un serveur Linux, comprendre ce qui se passe quand on appelle une API, et manipuler les formats d’échange (JSON, YAML).</p>",
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
  "lit": "git",
  "look": {},
  "scene": "git",
  "fig": "",
  "panel": "<h2>Le poste de travail type</h2><div class=\"psub\">ce qu’on installe le premier jour</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Éditeur</b><i>avec assistant</i></span><pre class=\"ex\">VS Code / Cursor / PyCharm + extension Python</pre></li><li class=\"\"><span class=\"st\"><b>Terminal</b><i>shell et multiplexeur</i></span><pre class=\"ex\">zsh ou bash, tmux, ssh avec clés</pre></li><li class=\"blue\"><span class=\"st\"><b>Python</b><i>gestionnaire</i></span><pre class=\"ex\">uv (Python + venv + dépendances)</pre></li><li class=\"\"><span class=\"st\"><b>Qualité</b><i>automatique</i></span><pre class=\"ex\">ruff (style + lint), mypy, pytest, pre-commit</pre></li><li class=\"\"><span class=\"st\"><b>Conteneurs</b><i>reproductibilité</i></span><pre class=\"ex\">Docker (chapitre 26)</pre></li><li class=\"red\"><span class=\"st\"><b>Outils CLI</b><i>au quotidien</i></span><pre class=\"ex\">git, gh, jq, curl, httpie, rg (ripgrep)</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "2.1",
  "title": "Structures de données et algorithmes",
  "sub": "choisir la bonne forme",
  "body": "<p class=\"lede\">Le choix de la structure décide souvent de la vitesse plus que le langage.</p>\n    <table class=\"data\"><tr><th>structure</th><th>usage typique en IA</th></tr><tr><td>list</td><td>séquence de messages, de jetons</td></tr><tr><td>dict / set</td><td>index par identifiant, dédoublonnage</td></tr><tr><td>deque</td><td>fenêtre glissante d’historique</td></tr><tr><td>heap (heapq)</td><td>garder les k meilleurs résultats</td></tr><tr><td>arbre, graphe</td><td>dépendances, graphe de connaissances</td></tr></table>\n    <p>À connaître : complexité (notation O), recherche dichotomique, tri, parcours de graphe (largeur, profondeur), hachage, programmation dynamique. Les entretiens d’ingénieur IA en posent toujours (chapitre 30).</p>",
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
  "lit": "cplx",
  "look": {},
  "scene": "cplx",
  "fig": "",
  "panel": "<h2>Les k meilleurs résultats</h2><div class=\"psub\">un tas plutôt qu’un tri</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Problème</b><i>garder les 5 meilleurs scores</i></span><pre class=\"ex\">scores de 1 000 000 passages</pre></li><li class=\"red\"><span class=\"st\"><b>Naïf</b><i>O(n log n)</i></span><pre class=\"ex\">sorted(hits, key=score, reverse=True)[:5]</pre></li><li class=\"blue\"><span class=\"st\"><b>Tas</b><i>O(n log k)</i></span><pre class=\"ex\">heapq.nlargest(5, hits, key=lambda h: h.score)</pre></li><li class=\"blue\"><span class=\"st\"><b>NumPy</b><i>partition</i></span><pre class=\"ex\">idx = np.argpartition(-s, 5)[:5]\nidx = idx[np.argsort(-s[idx])]</pre></li><li class=\"\"><span class=\"st\"><b>Dédoublonner</b><i>ensemble</i></span><pre class=\"ex\">vus = set()\nuniques = [h for h in hits if not (h.id in vus or vus.add(h.id))]</pre></li></ol><p class=\"note\">C’est l’opération centrale d’une recherche vectorielle exacte : produit scalaire avec tous les vecteurs, puis sélection des k plus grands.</p>"
 },
 {
  "kicker": "2.2",
  "title": "Git et GitHub",
  "sub": "versionner et collaborer",
  "body": "<p class=\"lede\"><b>Git</b> garde l’historique complet du code ; <b>GitHub</b> (ou GitLab) l’héberge et organise la collaboration.</p>\n    <pre class=\"code\">$ git switch -c feat/reranker\n$ git add -p &amp;&amp; git commit -m &quot;Ajoute un reranker&quot;\n$ git push -u origin feat/reranker</pre>\n    <ul class=\"rules\"><li>Une branche par changement, une <b>pull request</b> relue et testée avant fusion.</li><li>Ne jamais committer de clé d’API : <code>.env</code> dans <code>.gitignore</code>, et un scanner de secrets.</li><li>Les gros fichiers (poids de modèles, jeux de données) ne vont pas dans Git : Git LFS, DVC (chapitre 25) ou le Hub de Hugging Face.</li></ul>",
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
  "lit": "git",
  "look": {},
  "scene": "git",
  "fig": "",
  "panel": "<h2>Le cycle de Git</h2><div class=\"psub\">de la modification au dépôt partagé</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Répertoire de travail</b><i>fichiers modifiés</i></span><pre class=\"ex\">git status\ngit diff</pre></li><li class=\"blue\"><span class=\"st\"><b>Index</b><i>git add</i></span><pre class=\"ex\">git add -p   # choisir morceau par morceau</pre></li><li class=\"blue\"><span class=\"st\"><b>Commit local</b><i>git commit</i></span><pre class=\"ex\">git commit -m &quot;rag: ajoute le reranking&quot;</pre></li><li class=\"\"><span class=\"st\"><b>Branche</b><i>git switch -c</i></span><pre class=\"ex\">git switch -c feat/reranker\ngit rebase main   # se remettre à jour</pre></li><li class=\"red\"><span class=\"st\"><b>Dépôt distant</b><i>git push</i></span><pre class=\"ex\">git push -u origin feat/reranker</pre></li><li class=\"red\"><span class=\"st\"><b>Pull request</b><i>relecture, CI</i></span><pre class=\"ex\">gh pr create --fill\ngh pr checks   # état des tests</pre></li></ol><p class=\"note\">Git enregistre des instantanés (commits) du projet. On prépare les changements dans l’index, on les valide localement, puis on les pousse vers le dépôt partagé (GitHub), où une pull request les fait relire et tester avant fusion.</p><table class=\"data\"><tr><th>commit</th><td>instantané + message</td></tr><tr><th>branche</th><td>ligne de travail</td></tr><tr><th>PR</th><td>relecture + tests</td></tr></table>"
 },
 {
  "kicker": "2.3",
  "title": "Linux et la ligne de commande",
  "sub": "là où tournent les modèles",
  "body": "<p class=\"lede\">Les serveurs GPU, les conteneurs et le cloud tournent sous <b>Linux</b>. On y travaille au terminal, souvent par SSH.</p>\n    <pre class=\"code\">$ nvidia-smi                    # GPU et mémoire\n$ tail -f app.log | grep ERROR\n$ du -sh ~/.cache/huggingface\n$ tmux new -s train</pre>\n    <ul class=\"rules\"><li>Fichiers et droits : <code>ls, cd, cp, chmod</code> ; processus : <code>ps, top, kill</code> ; réseau : <code>curl, ss</code>.</li><li><b>Tubes</b> (|) : enchaîner de petits outils (grep, jq, sort, wc).</li><li><b>tmux</b> ou <b>screen</b> : un entraînement survit à la déconnexion SSH ; <b>systemd</b> : un service redémarre tout seul.</li></ul>",
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
  "lit": "http",
  "look": {},
  "scene": "http",
  "fig": "",
  "panel": "<h2>Les commandes d’un serveur GPU</h2><div class=\"psub\">diagnostiquer en une minute</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>GPU</b><i>occupation et mémoire</i></span><pre class=\"ex\">nvidia-smi\nwatch -n1 nvidia-smi</pre></li><li class=\"\"><span class=\"st\"><b>Processus</b><i>qui consomme</i></span><pre class=\"ex\">htop\nps aux --sort=-%mem | head</pre></li><li class=\"\"><span class=\"st\"><b>Disque</b><i>caches de modèles</i></span><pre class=\"ex\">df -h\ndu -sh ~/.cache/huggingface/*</pre></li><li class=\"\"><span class=\"st\"><b>Journaux</b><i>service systemd</i></span><pre class=\"ex\">journalctl -u mon-api -f\ngrep -c ERROR app.log</pre></li><li class=\"red\"><span class=\"st\"><b>Réseau</b><i>le service répond-il ?</i></span><pre class=\"ex\">ss -ltnp | grep 8000\ncurl -s localhost:8000/health</pre></li><li class=\"\"><span class=\"st\"><b>Session longue</b><i>survit à SSH</i></span><pre class=\"ex\">tmux new -s train   # Ctrl-b d pour détacher</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "2.4",
  "title": "HTTP et les bases du réseau",
  "sub": "ce qui circule entre client et serveur",
  "body": "<p class=\"lede\">Une requête HTTP a une <b>méthode</b> (GET, POST…), une <b>URL</b>, des <b>en-têtes</b> et un <b>corps</b> ; la réponse a un <b>code d’état</b>.</p>\n    <table class=\"data\"><tr><th>code</th><th>sens</th><th>réaction</th></tr><tr><td>200</td><td>succès</td><td>lire la réponse</td></tr><tr><td>400 / 422</td><td>requête invalide</td><td>corriger, ne pas réessayer</td></tr><tr><td>401 / 403</td><td>authentification</td><td>vérifier la clé</td></tr><tr><td>429</td><td>trop de requêtes</td><td>attendre et réessayer</td></tr><tr><td>500 / 503 / 529</td><td>erreur ou surcharge serveur</td><td>réessayer avec délai</td></tr></table>\n    <p>À connaître aussi : DNS, TCP, TLS (HTTPS), ports, délais d’attente (timeouts), proxys, et la différence entre latence (temps d’une requête) et débit (requêtes par seconde).</p>",
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
  "lit": "http",
  "look": {},
  "scene": "http",
  "fig": "",
  "panel": "<h2>Une requête HTTP vers une API</h2><div class=\"psub\">du client au serveur et retour</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Client</b><i>SDK, curl</i></span><pre class=\"ex\">httpx.Client(timeout=30)  # réutiliser\n# la connexion entre les appels</pre></li><li class=\"\"><span class=\"st\"><b>DNS</b><i>nom → adresse IP</i></span><pre class=\"ex\">dig +short api.anthropic.com</pre></li><li class=\"\"><span class=\"st\"><b>TCP + TLS</b><i>connexion chiffrée</i></span><pre class=\"ex\">curl -v https://api.openai.com 2&gt;&amp;1 | grep -i tls</pre></li><li class=\"red\"><span class=\"st\"><b>Requête</b><i>POST /v1/messages</i></span><pre class=\"ex\">POST /v1/messages HTTP/1.1\nx-api-key: $ANTHROPIC_API_KEY\ncontent-type: application/json\n{&quot;model&quot;: …, &quot;messages&quot;: […]}</pre></li><li class=\"blue\"><span class=\"st\"><b>Serveur</b><i>traitement, modèle</i></span><pre class=\"ex\">auth → limites de débit → file\n→ GPU → génération</pre></li><li class=\"red\"><span class=\"st\"><b>Réponse</b><i>200 + JSON</i></span><pre class=\"ex\">HTTP/1.1 200 OK\nrequest-id: req_…\n{&quot;content&quot;: [{&quot;type&quot;: &quot;text&quot;, …}],\n &quot;usage&quot;: {&quot;input_tokens&quot;: 12, …}}</pre></li></ol><p class=\"note\">Chaque appel à un modèle passe par ces étapes : résoudre le nom, ouvrir une connexion chiffrée, envoyer une requête (méthode, chemin, en-têtes, corps JSON) et recevoir un code d’état et un corps. Garder la connexion ouverte entre deux appels économise le coût de la poignée de main TLS.</p><table class=\"data\"><tr><th>chiffrement</th><td>TLS (HTTPS)</td></tr><tr><th>corps</th><td>JSON</td></tr><tr><th>codes</th><td>2xx, 4xx, 5xx</td></tr></table>"
 },
 {
  "kicker": "2.5",
  "title": "Les API REST",
  "sub": "des ressources et des verbes",
  "body": "<p class=\"lede\">Une API <b>REST</b> expose des ressources par des URL et des verbes HTTP : <code>GET /documents/42</code> lit, <code>POST /documents</code> crée, <code>DELETE</code> supprime.</p>\n    <pre class=\"code\">$ curl https://api.exemple.com/v1/documents \\\n    -H &quot;Authorization: Bearer $CLE&quot; \\\n    -H &quot;Content-Type: application/json&quot; \\\n    -d &#x27;{&quot;titre&quot;: &quot;Contrat&quot;}&#x27;</pre>\n    <p>Bonnes pratiques : versionner (<code>/v1/</code>), paginer les listes, renvoyer des codes d’état justes, documenter avec <b>OpenAPI</b>. Les API de modèles de langage sont des API REST (souvent avec streaming), et vous en construirez vous-même avec FastAPI (chapitre 24).</p>",
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
  "lit": "http",
  "look": {},
  "scene": "http",
  "fig": "",
  "panel": "<h2>Concevoir une petite API REST</h2><div class=\"psub\">un service de documents</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Lister</b><i>pagination</i></span><pre class=\"ex\">GET /v1/documents?limit=20&amp;cursor=abc</pre></li><li class=\"\"><span class=\"st\"><b>Lire</b><i>une ressource</i></span><pre class=\"ex\">GET /v1/documents/42 → 200 ou 404</pre></li><li class=\"blue\"><span class=\"st\"><b>Créer</b><i>renvoie l’identifiant</i></span><pre class=\"ex\">POST /v1/documents → 201 + Location</pre></li><li class=\"red\"><span class=\"st\"><b>Action longue</b><i>asynchrone</i></span><pre class=\"ex\">POST /v1/documents/42/index → 202 + job_id\nGET /v1/jobs/{id}</pre></li><li class=\"\"><span class=\"st\"><b>Supprimer</b><i>idempotent</i></span><pre class=\"ex\">DELETE /v1/documents/42 → 204</pre></li><li class=\"\"><span class=\"st\"><b>Erreurs</b><i>format constant</i></span><pre class=\"ex\">{&quot;error&quot;: {&quot;type&quot;: &quot;not_found&quot;, &quot;message&quot;: …}}</pre></li></ol><p class=\"note\">Les traitements longs (indexation, génération par lots) ne bloquent pas la requête : on renvoie 202 et un identifiant de tâche (chapitre 24).</p>"
 },
 {
  "kicker": "2.6",
  "title": "JSON, YAML et sérialisation",
  "sub": "les formats d’échange",
  "body": "<p class=\"lede\"><b>Sérialiser</b>, c’est transformer un objet en texte ou en octets pour le stocker ou l’envoyer.</p>\n    <table class=\"data\"><tr><th>format</th><th>usage</th></tr><tr><td>JSON</td><td>API, sorties structurées des modèles, appels d’outils</td></tr><tr><td>JSONL</td><td>un objet JSON par ligne : jeux de données, journaux</td></tr><tr><td>YAML</td><td>configurations (Kubernetes, CI, prompts)</td></tr><tr><td>TOML</td><td>pyproject.toml</td></tr><tr><td>Protobuf, MessagePack</td><td>binaire compact entre services</td></tr></table>\n    <p>Pièges : les dates et les nombres décimaux n’existent pas en JSON ; YAML interprète <code>no</code> comme faux et l’indentation compte ; ne jamais charger un <b>pickle</b> d’origine inconnue (il peut exécuter du code, chapitre 27).</p>",
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
  "lit": "http",
  "look": {},
  "scene": "http",
  "fig": "",
  "panel": "<h2>Lire et écrire chaque format</h2><div class=\"psub\">les appels essentiels</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>JSON</b><i>objet ↔ texte</i></span><pre class=\"ex\">json.dumps(obj, ensure_ascii=False)\njson.loads(txt)</pre></li><li class=\"blue\"><span class=\"st\"><b>JSONL</b><i>en flux</i></span><pre class=\"ex\">with open(p, &quot;a&quot;) as f:\n    f.write(json.dumps(r) + &quot;\\n&quot;)</pre></li><li class=\"red\"><span class=\"st\"><b>YAML</b><i>toujours safe_load</i></span><pre class=\"ex\">yaml.safe_load(open(&quot;config.yaml&quot;))</pre></li><li class=\"\"><span class=\"st\"><b>Pydantic</b><i>objet typé ↔ JSON</i></span><pre class=\"ex\">m.model_dump_json() / M.model_validate_json(t)</pre></li><li class=\"\"><span class=\"st\"><b>En ligne de commande</b><i>jq</i></span><pre class=\"ex\">jq -c &#x27;select(.score &gt; 0.8)&#x27; res.jsonl | wc -l</pre></li></ol><p class=\"note\"></p>"
 }
];
export const PLATES = {
  cplx: { text: "Pour un million d’éléments, une recherche dans un dictionnaire coûte une opération, un tri une vingtaine de millions, et comparer toutes les paires mille milliards. C’est exactement pourquoi la recherche vectorielle exacte ne passe pas à l’échelle et qu’on utilise des index approchés (chapitre 13).", facts: () => [["dict / set", "O(1) en moyenne"], ["tri", "O(n log n)"], ["toutes les paires", "O(n²)"]] }
};
