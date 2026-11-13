// Chapitre 1 : Python pour l’ingénieur IA (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 1 · Programmation",
  "title": "Python pour l’ingénieur IA",
  "sub": "pourquoi ce langage",
  "body": "<p class=\"lede\">Presque tout l’écosystème de l’IA s’écrit en <b>Python</b> : PyTorch, Hugging Face, les SDK d’OpenAI, d’Anthropic et de Google, LangChain, FastAPI, pandas.</p>\n    <p>Python n’est pas rapide en lui-même, mais il est lisible, interactif (carnets Jupyter) et sert de <b>colle</b> entre des bibliothèques écrites en C, C++ et CUDA. L’ingénieur IA écrit en Python la logique, les pipelines de données, les API et les évaluations ; le calcul intensif part vers le GPU.</p>\n    <p>Ce chapitre parcourt ce qu’il faut maîtriser pour lire et écrire du code de production : pas seulement la syntaxe, mais les générateurs, les décorateurs, l’asynchrone, le typage et le packaging.</p>",
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
  "lit": "exec",
  "look": {},
  "scene": "exec",
  "fig": "",
  "panel": "<h2>Comment Python exécute un programme</h2><div class=\"psub\">du fichier .py aux objets</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Source .py</b><i>texte</i></span><pre class=\"ex\">def f(x):\n    return x * 2</pre></li><li class=\"\"><span class=\"st\"><b>Analyse</b><i>arbre syntaxique</i></span><pre class=\"ex\">python -c &quot;import ast; print(ast.dump(ast.parse(&#x27;x*2&#x27;)))&quot;</pre></li><li class=\"blue\"><span class=\"st\"><b>Bytecode</b><i>.pyc, en cache</i></span><pre class=\"ex\">import dis; dis.dis(f)\n# LOAD_FAST x / LOAD_CONST 2 / BINARY_OP *</pre></li><li class=\"red\"><span class=\"st\"><b>Interpréteur</b><i>CPython, boucle d’évaluation</i></span><pre class=\"ex\">python3 --version   # Python 3.12+\npython -X importtime app.py  # imports lents</pre></li><li class=\"blue\"><span class=\"st\"><b>Objets</b><i>tout est objet</i></span><pre class=\"ex\">type(42), id(x), sys.getrefcount(x)</pre></li><li class=\"red\"><span class=\"st\"><b>Extensions C</b><i>NumPy, PyTorch</i></span><pre class=\"ex\">torch.matmul(a, b)  # s’exécute en CUDA,\n# Python ne fait qu’appeler</pre></li></ol><p class=\"note\">Python compile le source en bytecode, puis une boucle d’interprétation l’exécute instruction par instruction. Tout ce que manipule le programme est un objet sur le tas, avec un type et un compteur de références. Les calculs lourds de l’IA ne tournent pas en Python : ils sont délégués à des bibliothèques en C, C++ ou CUDA.</p><table class=\"data\"><tr><th>interpréteur</th><td>CPython</td></tr><tr><th>calcul lourd</th><td>en C/CUDA</td></tr><tr><th>rôle de Python</th><td>chef d’orchestre</td></tr></table>"
 },
 {
  "kicker": "1.1",
  "title": "Variables et types de données",
  "sub": "des noms sur des objets",
  "body": "<p class=\"lede\">Une variable Python n’est pas une boîte : c’est un <b>nom</b> attaché à un objet. <code>b = a</code> ne copie rien, les deux noms désignent le même objet.</p>\n    <table class=\"data\"><tr><th>type</th><th>exemple</th><th>modifiable ?</th></tr><tr><td>int, float, bool</td><td>42, 0.1, True</td><td>non</td></tr><tr><td>str</td><td>\"jeton\"</td><td>non</td></tr><tr><td>list</td><td>[1, 2, 3]</td><td>oui</td></tr><tr><td>tuple</td><td>(1, 2)</td><td>non</td></tr><tr><td>dict</td><td>{\"role\": \"user\"}</td><td>oui</td></tr><tr><td>set</td><td>{\"a\", \"b\"}</td><td>oui</td></tr></table>\n    <p>Piège classique : modifier une liste partagée entre deux noms, ou utiliser une liste comme valeur par défaut d’un argument. Les <code>dict</code> sont partout dans le code IA : messages de chat, réponses JSON, configurations.</p>",
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
  "lit": "exec",
  "look": {},
  "scene": "exec",
  "fig": "",
  "panel": "<h2>Les pièges des références</h2><div class=\"psub\">à reconnaître dans du code réel</div><ol class=\"flow\"><li class=\"red\"><span class=\"st\"><b>Alias</b><i>deux noms, un objet</i></span><pre class=\"ex\">a = [1, 2]; b = a; b.append(3)\nprint(a)  # [1, 2, 3]</pre></li><li class=\"\"><span class=\"st\"><b>Copie</b><i>superficielle ou profonde</i></span><pre class=\"ex\">b = a.copy()          # ou list(a)\nc = copy.deepcopy(cfg) # objets imbriqués</pre></li><li class=\"red\"><span class=\"st\"><b>Défaut mutable</b><i>partagé entre les appels</i></span><pre class=\"ex\">def f(x, h=[]): ...   # bogue\ndef f(x, h=None): h = h or []</pre></li><li class=\"\"><span class=\"st\"><b>Égalité / identité</b><i>== compare, is identifie</i></span><pre class=\"ex\">x == None  → écrire : x is None</pre></li><li class=\"blue\"><span class=\"st\"><b>Flottants</b><i>approximations binaires</i></span><pre class=\"ex\">0.1 + 0.2 == 0.3  # False\nmath.isclose(a, b)  # ou Decimal pour l’argent</pre></li></ol><p class=\"note\">Ces quatre pièges expliquent une bonne partie des bogues « impossibles » dans les scripts de traitement de données et les historiques de conversation partagés entre requêtes.</p><table class=\"data\"><tr><th>immuables</th><td>int, float, str, tuple, frozenset</td></tr><tr><th>modifiables</th><td>list, dict, set, objets</td></tr></table>"
 },
 {
  "kicker": "1.2",
  "title": "Fonctions et modules",
  "sub": "découper le programme",
  "body": "<p class=\"lede\">Une <b>fonction</b> regroupe une tâche ; un <b>module</b> est un fichier .py ; un <b>paquet</b> est un dossier de modules.</p>\n    <pre class=\"code\">def chunk(text: str, size: int = 500,\n          overlap: int = 50) -&gt; list[str]:\n    step = size - overlap\n    return [text[i:i + size]\n            for i in range(0, len(text), step)]</pre>\n    <p>Arguments par mot-clé, valeurs par défaut, <code>*args</code> et <code>**kwargs</code> permettent des interfaces souples. Les fonctions sont des objets : on peut les passer en argument, ce qui est la base des rappels (callbacks), des outils d’agents et des décorateurs.</p>",
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
  "lit": "exec",
  "look": {},
  "scene": "exec",
  "fig": "",
  "panel": "<h2>Organiser un projet</h2><div class=\"psub\">la disposition « src »</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Arborescence</b><i>un paquet importable</i></span><pre class=\"ex\">mon_rag/\n  pyproject.toml\n  src/mon_rag/__init__.py\n  src/mon_rag/chunking.py\n  tests/test_chunking.py</pre></li><li class=\"\"><span class=\"st\"><b>Importer</b><i>absolu, explicite</i></span><pre class=\"ex\">from mon_rag.chunking import chunk</pre></li><li class=\"\"><span class=\"st\"><b>Point d’entrée</b><i>exécuter un module</i></span><pre class=\"ex\">if __name__ == &quot;__main__&quot;:\n    main()\n# python -m mon_rag.cli</pre></li><li class=\"\"><span class=\"st\"><b>Arguments souples</b><i>*args, **kwargs</i></span><pre class=\"ex\">def log(msg, *args, niveau=&quot;info&quot;, **extra): ...</pre></li><li class=\"red\"><span class=\"st\"><b>Fonctions en valeur</b><i>rappels, outils d’agent</i></span><pre class=\"ex\">OUTILS = {&quot;meteo&quot;: meteo, &quot;calc&quot;: calc}\nOUTILS[nom](**arguments)</pre></li></ol><p class=\"note\">Un module par responsabilité (découpage, plongements, recherche, génération), des fonctions courtes et testables : c’est ce qui rend un prototype de RAG transformable en service.</p>"
 },
 {
  "kicker": "1.3",
  "title": "Objets et exceptions",
  "sub": "classes, héritage, erreurs",
  "body": "<p class=\"lede\">Une <b>classe</b> regroupe des données et des méthodes. Les <b>dataclasses</b> écrivent pour vous le constructeur et l’affichage.</p>\n    <pre class=\"code\">@dataclass\nclass Document:\n    id: str\n    text: str\n    meta: dict = field(default_factory=dict)</pre>\n    <p>Les <b>exceptions</b> signalent les erreurs : <code>try / except / finally</code>. En production, on attrape des exceptions précises (<code>TimeoutError</code>, <code>RateLimitError</code>), jamais un <code>except:</code> nu qui avale tout, et on crée ses propres classes d’erreurs pour le domaine.</p>",
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
  "lit": "exec",
  "look": {},
  "scene": "exec",
  "fig": "",
  "panel": "<h2>Gérer les erreurs d’une API</h2><div class=\"psub\">un modèle réutilisable</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Classes d’erreurs</b><i>propres au domaine</i></span><pre class=\"ex\">class ErreurModele(Exception): ...\nclass QuotaDepasse(ErreurModele): ...</pre></li><li class=\"\"><span class=\"st\"><b>Attraper précis</b><i>jamais except nu</i></span><pre class=\"ex\">try:\n    r = client.messages.create(...)\nexcept anthropic.RateLimitError:\n    attendre_et_reessayer()</pre></li><li class=\"red\"><span class=\"st\"><b>Relancer avec contexte</b><i>garder la cause</i></span><pre class=\"ex\">except KeyError as e:\n    raise ErreurModele(&quot;réponse sans contenu&quot;) from e</pre></li><li class=\"\"><span class=\"st\"><b>Nettoyer</b><i>toujours exécuté</i></span><pre class=\"ex\">finally:\n    session.close()</pre></li><li class=\"\"><span class=\"st\"><b>Journaliser</b><i>avec la trace</i></span><pre class=\"ex\">logger.exception(&quot;échec appel&quot;, extra={&quot;req&quot;: rid})</pre></li></ol><p class=\"note\">Les SDK d’OpenAI et d’Anthropic exposent des classes d’erreurs distinctes (authentification, limite de débit, délai, erreur serveur) : chacune appelle une réaction différente (chapitre 11).</p>"
 },
 {
  "kicker": "1.4",
  "title": "Compréhensions de listes et de dictionnaires",
  "sub": "transformer en une ligne",
  "body": "<p class=\"lede\">Une compréhension construit une collection à partir d’une autre, avec filtre éventuel.</p>\n    <pre class=\"code\">longs = [d for d in docs if len(d.text) &gt; 200]\nidx = {d.id: d for d in docs}\nmots = {m.lower() for m in texte.split()}</pre>\n    <p>C’est plus lisible et plus rapide qu’une boucle avec <code>append</code>. Avec des parenthèses, on obtient une <b>expression génératrice</b>, qui ne construit rien en mémoire : <code>sum(len(d.text) for d in docs)</code>. Au-delà de deux niveaux imbriqués, une boucle explicite redevient plus claire.</p>",
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
  "lit": "exec",
  "look": {},
  "scene": "exec",
  "fig": "",
  "panel": "<h2>Six compréhensions utiles</h2><div class=\"psub\">copier, adapter</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Filtrer</b><i>liste</i></span><pre class=\"ex\">ok = [r for r in resultats if r.score &gt; 0.7]</pre></li><li class=\"\"><span class=\"st\"><b>Indexer</b><i>dict</i></span><pre class=\"ex\">par_id = {d.id: d for d in docs}</pre></li><li class=\"\"><span class=\"st\"><b>Inverser</b><i>dict</i></span><pre class=\"ex\">id2tok = {v: k for k, v in vocab.items()}</pre></li><li class=\"blue\"><span class=\"st\"><b>Aplatir</b><i>double boucle</i></span><pre class=\"ex\">chunks = [c for d in docs for c in chunk(d.text)]</pre></li><li class=\"\"><span class=\"st\"><b>Compter</b><i>sans boucle</i></span><pre class=\"ex\">Counter(t.categorie for t in tickets).most_common(5)</pre></li><li class=\"red\"><span class=\"st\"><b>Agréger paresseusement</b><i>générateur</i></span><pre class=\"ex\">total = sum(len(enc.encode(d.text)) for d in docs)</pre></li></ol><p class=\"note\">Au-delà d’une condition et de deux boucles, revenir à une boucle explicite : la lisibilité prime.</p>"
 },
 {
  "kicker": "1.5",
  "title": "Itérateurs et générateurs",
  "sub": "les données en flux",
  "body": "<p class=\"lede\">Un <b>itérateur</b> donne ses éléments un à un (<code>next()</code>). Un <b>générateur</b> est une fonction qui contient <code>yield</code> : il produit un itérateur paresseux.</p>\n    <pre class=\"code\">def lire_jsonl(chemin):\n    with open(chemin) as f:\n        for ligne in f:\n            yield json.loads(ligne)</pre>\n    <p>On peut traiter un corpus de 50 Go avec quelques mégaoctets de mémoire. Les générateurs se composent en chaînes (lecture → nettoyage → découpage → lots), et c’est exactement ainsi que fonctionnent les réponses en <b>streaming</b> des API de modèles de langage.</p>",
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
  "lit": "gen",
  "look": {},
  "scene": "gen",
  "fig": "",
  "panel": "<h2>Un générateur</h2><div class=\"psub\">produire les valeurs une à une</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>next(g)</b><i>l’appelant demande</i></span><pre class=\"ex\">for doc in lire_jsonl(&quot;corpus.jsonl&quot;):</pre></li><li class=\"\"><span class=\"st\"><b>reprise</b><i>juste après le dernier yield</i></span><pre class=\"ex\">ligne = next(f)  # le fichier reste ouvert</pre></li><li class=\"\"><span class=\"st\"><b>calcul</b><i>une seule valeur</i></span><pre class=\"ex\">obj = json.loads(ligne)</pre></li><li class=\"red\"><span class=\"st\"><b>yield</b><i>valeur rendue</i></span><pre class=\"ex\">yield obj</pre></li><li class=\"\"><span class=\"st\"><b>suspendu</b><i>état gardé en mémoire</i></span><pre class=\"ex\"># variables locales et position conservées\n# fin du fichier → StopIteration</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · générateur</div><p class=\"note\">Un générateur garde son état entre deux appels. À chaque next(), il reprend juste après le dernier yield, calcule la valeur suivante, la renvoie et se suspend. Il ne garde jamais toute la séquence en mémoire : idéal pour lire un corpus de plusieurs gigaoctets ligne par ligne.</p><table class=\"data\"><tr><th>mémoire</th><td>une valeur à la fois</td></tr><tr><th>mot-clé</th><td>yield</td></tr><tr><th>fin</th><td>StopIteration</td></tr></table>"
 },
 {
  "kicker": "1.6",
  "title": "Décorateurs et gestionnaires de contexte",
  "sub": "envelopper du code",
  "body": "<p class=\"lede\">Un <b>décorateur</b> est une fonction qui en enveloppe une autre pour lui ajouter un comportement : journalisation, cache, nouvelles tentatives, mesure du temps.</p>\n    <pre class=\"code\">@retry(tries=3, backoff=2)\ndef appeler_modele(prompt): ...\n\nwith open(&quot;out.jsonl&quot;, &quot;w&quot;) as f: ...</pre>\n    <p>Un <b>gestionnaire de contexte</b> (<code>with</code>) garantit qu’une ressource est libérée même en cas d’erreur : fichier, connexion, verrou, session HTTP. FastAPI (<code>@app.post</code>), pytest et les frameworks d’agents (<code>@tool</code>) reposent entièrement sur les décorateurs.</p>",
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
  "lit": "exec",
  "look": {},
  "scene": "exec",
  "fig": "",
  "panel": "<h2>Écrire un décorateur de nouvelle tentative</h2><div class=\"psub\">et un gestionnaire de contexte</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Le décorateur</b><i>une fonction qui renvoie une fonction</i></span><pre class=\"ex\">def retry(tries=3, base=1.0):\n    def deco(fn):\n        @functools.wraps(fn)\n        def wrap(*a, **k):\n            for i in range(tries):\n                try: return fn(*a, **k)\n                except TransientError:\n                    if i == tries - 1: raise\n                    time.sleep(base * 2 ** i)\n        return wrap\n    return deco</pre></li><li class=\"\"><span class=\"st\"><b>L’usage</b><i></i></span><pre class=\"ex\">@retry(tries=4)\ndef appeler(prompt): ...</pre></li><li class=\"red\"><span class=\"st\"><b>Mesurer</b><i>gestionnaire de contexte</i></span><pre class=\"ex\">@contextlib.contextmanager\ndef chrono(nom):\n    t = time.perf_counter(); yield\n    log.info(nom, s=time.perf_counter() - t)</pre></li><li class=\"\"><span class=\"st\"><b>L’usage</b><i></i></span><pre class=\"ex\">with chrono(&quot;recherche&quot;):\n    hits = index.search(q)</pre></li><li class=\"\"><span class=\"st\"><b>En pratique</b><i>bibliothèques</i></span><pre class=\"ex\">tenacity (nouvelles tentatives)\nfunctools.lru_cache (cache)</pre></li></ol><p class=\"note\">functools.wraps conserve le nom et la documentation de la fonction décorée : indispensable pour que les frameworks (FastAPI, outils d’agents) lisent sa signature.</p>"
 },
 {
  "kicker": "1.7",
  "title": "Asyncio et concurrence",
  "sub": "attendre beaucoup de choses à la fois",
  "body": "<p class=\"lede\">Une application d’IA passe l’essentiel de son temps à <b>attendre</b> : le modèle, la base vectorielle, le réseau. <code>asyncio</code> permet d’attendre plusieurs choses en même temps.</p>\n    <pre class=\"code\">async def tout(prompts):\n    return await asyncio.gather(\n        *(client.complete(p) for p in prompts))</pre>\n    <table class=\"data\"><tr><th>besoin</th><th>outil</th></tr><tr><td>attentes réseau (I/O)</td><td>asyncio, threads</td></tr><tr><td>calcul CPU pur</td><td>multiprocessing</td></tr><tr><td>calcul numérique</td><td>NumPy, GPU</td></tr></table>\n    <p>Le verrou global (GIL) empêche deux fils Python de calculer en même temps ; les versions récentes proposent une variante sans GIL, encore marginale. Une fonction bloquante appelée dans du code async fige toute la boucle : c’est le bogue le plus fréquent.</p>",
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
  "panel": "<h2>La boucle d’événements</h2><div class=\"psub\">asyncio : un seul fil, beaucoup d’attentes</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Tâche prête</b><i>la boucle la choisit</i></span><pre class=\"ex\">asyncio.run(main())</pre></li><li class=\"\"><span class=\"st\"><b>Exécution</b><i>jusqu’au prochain await</i></span><pre class=\"ex\">r = await client.messages.create(...)</pre></li><li class=\"red\"><span class=\"st\"><b>Attente réseau</b><i>la tâche rend la main</i></span><pre class=\"ex\"># 100 requêtes en vol, 1 seul fil\nsem = asyncio.Semaphore(10)  # limiter</pre></li><li class=\"blue\"><span class=\"st\"><b>Autre tâche</b><i>avance pendant ce temps</i></span><pre class=\"ex\">await asyncio.gather(*taches)</pre></li><li class=\"\"><span class=\"st\"><b>Réveil</b><i>la réponse est arrivée</i></span><pre class=\"ex\"># reprise juste après le await\nasyncio.wait_for(coro, timeout=30)</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · event loop</div><p class=\"note\">La boucle d’événements exécute une tâche jusqu’à ce qu’elle attende (await) une entrée-sortie, puis passe à une autre. Cent appels à une API de modèle de langage peuvent ainsi attendre en même temps sur un seul fil, au lieu de s’enchaîner.</p><table class=\"data\"><tr><th>modèle</th><td>concurrence coopérative</td></tr><tr><th>idéal pour</th><td>réseau, API, fichiers</td></tr><tr><th>pas pour</th><td>calcul CPU</td></tr></table>"
 },
 {
  "kicker": "1.8",
  "title": "Typage et Pydantic",
  "sub": "des contrats lisibles et vérifiés",
  "body": "<p class=\"lede\">Les <b>annotations de type</b> (<code>def f(x: int) -> str</code>) ne changent pas l’exécution, mais un vérificateur (mypy, pyright) et l’éditeur détectent des erreurs avant de lancer le code.</p>\n    <p><b>Pydantic</b> va plus loin : il <b>valide</b> les données à l’exécution et convertit le JSON en objets.</p>\n    <pre class=\"code\">class Facture(BaseModel):\n    client: str\n    montant: float = Field(gt=0)\n\nf = Facture.model_validate_json(sortie_llm)</pre>\n    <p>C’est l’outil central pour les sorties structurées des modèles de langage (chapitre 11), les schémas d’outils des agents et les API FastAPI : une même classe décrit, valide et documente.</p>",
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
  "lit": "exec",
  "look": {},
  "scene": "exec",
  "fig": "",
  "panel": "<h2>Valider la sortie d’un modèle</h2><div class=\"psub\">de la chaîne JSON à l’objet sûr</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Décrire</b><i>le schéma</i></span><pre class=\"ex\">class Extraction(BaseModel):\n    societe: str\n    montant: float = Field(ge=0)\n    devise: Literal[&quot;EUR&quot;, &quot;USD&quot;]\n    date: datetime.date</pre></li><li class=\"\"><span class=\"st\"><b>Exporter</b><i>pour le modèle</i></span><pre class=\"ex\">Extraction.model_json_schema()\n# → JSON Schema envoyé à l’API</pre></li><li class=\"red\"><span class=\"st\"><b>Valider</b><i>la réponse</i></span><pre class=\"ex\">try:\n    e = Extraction.model_validate_json(txt)\nexcept ValidationError as err:\n    ...</pre></li><li class=\"\"><span class=\"st\"><b>Réparer</b><i>une seconde chance</i></span><pre class=\"ex\">renvoyer err.errors() au modèle\net redemander (1 ou 2 fois)</pre></li><li class=\"\"><span class=\"st\"><b>Vérifier statiquement</b><i>avant d’exécuter</i></span><pre class=\"ex\">uv run mypy src/   # ou pyright</pre></li></ol><p class=\"note\">Avec les sorties structurées des API (chapitre 11), le JSON est garanti conforme au schéma ; la validation Pydantic reste utile pour les règles métier (montant positif, date plausible).</p>"
 },
 {
  "kicker": "1.9",
  "title": "Environnements virtuels et packaging",
  "sub": "des installations reproductibles",
  "body": "<p class=\"lede\">Chaque projet a son <b>environnement virtuel</b> : ses propres versions de bibliothèques, sans conflit avec les autres projets.</p>\n    <pre class=\"code\">$ uv venv &amp;&amp; source .venv/bin/activate\n$ uv add torch transformers fastapi\n$ uv run pytest</pre>\n    <ul class=\"rules\"><li><b>pyproject.toml</b> : nom, version, dépendances, outils.</li><li><b>Fichier de verrouillage</b> (uv.lock, poetry.lock) : les versions exactes, pour que le serveur installe la même chose que votre machine.</li><li><b>uv</b> (rapide, en Rust), pip, Poetry, conda (utile pour les dépendances non Python comme CUDA).</li><li>Les versions de PyTorch dépendent de la version de CUDA : un environnement mal figé est la première cause de « ça marche chez moi ».</li></ul>",
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
  "lit": "paquet",
  "look": {},
  "scene": "paquet",
  "fig": "",
  "panel": "<h2>D’un projet à un paquet</h2><div class=\"psub\">environnement, dépendances, distribution</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>pyproject.toml</b><i>description du projet</i></span><pre class=\"ex\">[project]\nname = &quot;mon-rag&quot;\nrequires-python = &quot;&gt;=3.11&quot;\ndependencies = [&quot;fastapi&quot;, &quot;httpx&quot;]</pre></li><li class=\"\"><span class=\"st\"><b>Environnement virtuel</b><i>dépendances isolées</i></span><pre class=\"ex\">uv venv  # ou: python -m venv .venv\nsource .venv/bin/activate</pre></li><li class=\"red\"><span class=\"st\"><b>Verrou</b><i>versions exactes</i></span><pre class=\"ex\">uv lock   → uv.lock (à committer)\nuv sync --frozen  # en CI et en prod</pre></li><li class=\"\"><span class=\"st\"><b>Tests</b><i>pytest</i></span><pre class=\"ex\">uv run pytest -q\nuv run ruff check . &amp;&amp; uv run mypy src</pre></li><li class=\"blue\"><span class=\"st\"><b>Construction</b><i>wheel</i></span><pre class=\"ex\">uv build  → dist/mon_rag-0.1.0-py3-none-any.whl</pre></li><li class=\"\"><span class=\"st\"><b>Publication</b><i>PyPI ou dépôt privé</i></span><pre class=\"ex\">uv publish   # ou une image Docker (chap. 26)</pre></li></ol><p class=\"note\">Un projet moderne se décrit dans pyproject.toml. Ses dépendances vivent dans un environnement virtuel propre au projet, leurs versions exactes sont figées dans un fichier de verrouillage, et le paquet se construit en « wheel » installable partout.</p><table class=\"data\"><tr><th>description</th><td>pyproject.toml</td></tr><tr><th>outils</th><td>uv, pip, Poetry</td></tr><tr><th>format</th><td>wheel (.whl)</td></tr></table>"
 }
];
export const PLATES = {

};
