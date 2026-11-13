// Chapitre 5 : Ingénierie et traitement des données (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 5 · Données",
  "title": "Ingénierie et traitement des données",
  "sub": "« garbage in, garbage out »",
  "body": "<p class=\"lede\">Un modèle n’est jamais meilleur que ses données. Un système RAG qui indexe des PDF mal découpés, un affinage sur des exemples incohérents : aucun modèle ne rattrape cela.</p>\n    <p>L’ingénieur IA passe une grande partie de son temps sur les données : les trouver, les nettoyer, les transformer, les valider, les stocker, les versionner. Ce chapitre présente les outils (NumPy, pandas, SQL) et les pratiques.</p>",
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
  "lit": "pipe",
  "look": {},
  "scene": "pipe",
  "fig": "",
  "panel": "<h2>Un pipeline de données</h2><div class=\"psub\">de la source au jeu prêt à l’emploi</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Collecte</b><i>API, bases, scraping</i></span><pre class=\"ex\">httpx.get(url) · psql -c &quot;\\copy …&quot; · exports Zendesk</pre></li><li class=\"\"><span class=\"st\"><b>Ingestion</b><i>brut, horodaté</i></span><pre class=\"ex\">s3://lac/brut/tickets/2026-11-09/*.jsonl</pre></li><li class=\"red\"><span class=\"st\"><b>Nettoyage</b><i>doublons, erreurs</i></span><pre class=\"ex\">df = df.drop_duplicates(&quot;texte&quot;)\ndf = df[df.texte.str.len() &gt; 20]</pre></li><li class=\"blue\"><span class=\"st\"><b>Transformation</b><i>formats, jointures</i></span><pre class=\"ex\">df = df.merge(clients, on=&quot;client_id&quot;)</pre></li><li class=\"red\"><span class=\"st\"><b>Validation</b><i>schéma, règles</i></span><pre class=\"ex\">schema.validate(df)  # Pandera\nassert df.id.is_unique</pre></li><li class=\"blue\"><span class=\"st\"><b>Stockage</b><i>Parquet, base</i></span><pre class=\"ex\">df.to_parquet(&quot;propre/tickets.parquet&quot;)\ndvc add propre/  # version</pre></li></ol><p class=\"note\">Chaque étape est un programme testé, rejouable et journalisé. On garde toujours les données brutes : si une règle de nettoyage était fausse, on peut tout recalculer. L’orchestrateur (Airflow, Dagster, Prefect) lance les étapes dans l’ordre et relance celles qui échouent.</p><table class=\"data\"><tr><th>principe</th><td>brut immuable</td></tr><tr><th>orchestrateurs</th><td>Airflow, Dagster, Prefect</td></tr><tr><th>sortie</th><td>jeu versionné</td></tr></table>"
 },
 {
  "kicker": "5.1",
  "title": "NumPy",
  "sub": "les tableaux numériques",
  "body": "<p class=\"lede\"><b>NumPy</b> fournit le tableau à n dimensions (<code>ndarray</code>) et des opérations vectorisées écrites en C.</p>\n    <pre class=\"code\">a = np.random.randn(1000, 768)  # 1000 plongements\nn = a / np.linalg.norm(a, axis=1, keepdims=True)\nsim = n @ n[0]                   # cosinus avec le 1er\ntop = np.argsort(-sim)[:5]</pre>\n    <p>Règle d’or : pas de boucle Python sur les éléments, des opérations sur des tableaux entiers (100 fois plus rapide). Le <b>broadcasting</b> aligne automatiquement les formes compatibles. PyTorch reprend presque la même interface.</p>",
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
  "lit": "formats",
  "look": {},
  "scene": "formats",
  "fig": "",
  "panel": "<h2>Les opérations NumPy de l’ingénieur IA</h2><div class=\"psub\">formes entre parenthèses</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Créer</b><i></i></span><pre class=\"ex\">a = np.zeros((32, 768), dtype=np.float32)</pre></li><li class=\"\"><span class=\"st\"><b>Forme</b><i></i></span><pre class=\"ex\">a.shape → (32, 768) ; a.reshape(4, 8, 768)</pre></li><li class=\"blue\"><span class=\"st\"><b>Normaliser des lignes</b><i>broadcasting</i></span><pre class=\"ex\">a / np.linalg.norm(a, axis=1, keepdims=True)</pre></li><li class=\"red\"><span class=\"st\"><b>Similarités</b><i>toutes contre toutes</i></span><pre class=\"ex\">S = A @ B.T   # (n, d) @ (d, m) → (n, m)</pre></li><li class=\"\"><span class=\"st\"><b>Masque</b><i>sélection booléenne</i></span><pre class=\"ex\">a[scores &gt; 0.8]</pre></li><li class=\"\"><span class=\"st\"><b>Sauver</b><i></i></span><pre class=\"ex\">np.save(&quot;emb.npy&quot;, a) ; np.load(..., mmap_mode=&quot;r&quot;)</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "5.2",
  "title": "pandas",
  "sub": "les tableaux de données",
  "body": "<p class=\"lede\"><b>pandas</b> manipule des tableaux à colonnes nommées (<code>DataFrame</code>) : lire, filtrer, grouper, joindre.</p>\n    <pre class=\"code\">df = pd.read_parquet(&quot;tickets.parquet&quot;)\ndf = df[df.langue == &quot;fr&quot;].drop_duplicates(&quot;texte&quot;)\ndf.groupby(&quot;categorie&quot;).size().sort_values()</pre>\n    <p>Pour des volumes plus gros que la mémoire ou plus de vitesse : <b>Polars</b> (en Rust, paresseux, multicœur) ou <b>DuckDB</b> (SQL directement sur des fichiers Parquet). Les trois parlent le format en mémoire <b>Apache Arrow</b>.</p>",
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
  "lit": "formats",
  "look": {},
  "scene": "formats",
  "fig": "",
  "panel": "<h2>Dix lignes de pandas</h2><div class=\"psub\">les plus utilisées</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Lire</b><i></i></span><pre class=\"ex\">df = pd.read_csv(&quot;t.csv&quot;) / pd.read_parquet(...)</pre></li><li class=\"\"><span class=\"st\"><b>Regarder</b><i></i></span><pre class=\"ex\">df.head(); df.info(); df.describe()</pre></li><li class=\"blue\"><span class=\"st\"><b>Filtrer</b><i></i></span><pre class=\"ex\">df.query(&quot;langue == &#x27;fr&#x27; and longueur &gt; 50&quot;)</pre></li><li class=\"\"><span class=\"st\"><b>Nouvelle colonne</b><i></i></span><pre class=\"ex\">df[&quot;n_tok&quot;] = df.texte.map(lambda t: len(enc.encode(t)))</pre></li><li class=\"red\"><span class=\"st\"><b>Grouper</b><i></i></span><pre class=\"ex\">df.groupby(&quot;categorie&quot;).agg(n=(&quot;id&quot;, &quot;size&quot;), moy=(&quot;n_tok&quot;, &quot;mean&quot;))</pre></li><li class=\"\"><span class=\"st\"><b>Joindre</b><i></i></span><pre class=\"ex\">df.merge(clients, on=&quot;client_id&quot;, how=&quot;left&quot;)</pre></li><li class=\"\"><span class=\"st\"><b>Écrire</b><i></i></span><pre class=\"ex\">df.to_parquet(&quot;out.parquet&quot;, index=False)</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "5.3",
  "title": "Nettoyer les données",
  "sub": "le travail invisible",
  "body": "<p class=\"lede\">Les données réelles sont sales. Nettoyer, c’est décider quoi faire de chaque défaut, et l’écrire dans du code.</p>\n    <ul class=\"rules\"><li><b>Doublons</b> exacts et quasi-doublons (MinHash) : ils biaisent l’entraînement et l’évaluation.</li><li><b>Valeurs manquantes</b> : supprimer, imputer ou marquer.</li><li><b>Texte</b> : encodage (UTF-8), espaces, balises HTML, en-têtes et pieds de page répétés dans les PDF.</li><li><b>Aberrations</b> : un prix négatif, une date en 2099.</li><li><b>Données personnelles</b> à masquer (chapitre 27).</li></ul>\n    <p>Chaque règle se teste sur un échantillon que l’on regarde à la main. Regarder les données reste l’activité au meilleur rendement.</p>",
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
  "lit": "pipe",
  "look": {},
  "scene": "pipe",
  "fig": "",
  "panel": "<h2>Nettoyer un corpus de textes</h2><div class=\"psub\">étapes et code</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Encodage</b><i>réparer</i></span><pre class=\"ex\">ftfy.fix_text(t)   # « Ã© » → « é »</pre></li><li class=\"\"><span class=\"st\"><b>Espaces et HTML</b><i></i></span><pre class=\"ex\">t = re.sub(r&quot;\\s+&quot;, &quot; &quot;, BeautifulSoup(h).get_text())</pre></li><li class=\"blue\"><span class=\"st\"><b>Doublons exacts</b><i></i></span><pre class=\"ex\">df.drop_duplicates(&quot;texte&quot;)</pre></li><li class=\"\"><span class=\"st\"><b>Quasi-doublons</b><i>MinHash</i></span><pre class=\"ex\">datasketch.MinHashLSH(threshold=0.8)</pre></li><li class=\"\"><span class=\"st\"><b>Langue</b><i></i></span><pre class=\"ex\">fasttext lid.176 → garder &quot;fr&quot;</pre></li><li class=\"red\"><span class=\"st\"><b>Données personnelles</b><i>masquer</i></span><pre class=\"ex\">Presidio : e-mails, téléphones, IBAN → &lt;EMAIL&gt;</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "5.4",
  "title": "Transformer les données",
  "sub": "changer de forme",
  "body": "<p class=\"lede\">Transformer, c’est mettre les données dans la forme dont le modèle ou l’application a besoin.</p>\n    <table class=\"data\"><tr><th>opération</th><th>exemple</th></tr><tr><td>normaliser</td><td>mettre des valeurs numériques à la même échelle</td></tr><tr><td>encoder</td><td>catégories → nombres (one-hot)</td></tr><tr><td>joindre</td><td>tickets + fiches clients</td></tr><tr><td>agréger</td><td>nombre de commandes par mois</td></tr><tr><td>restructurer</td><td>conversation → liste de messages JSON</td></tr></table>\n    <p>On écrit les transformations comme des fonctions pures, testées, appliquées de la même façon à l’entraînement et en production ; sinon le modèle voit en production des données différentes de celles qu’il a apprises (training-serving skew).</p>",
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
  "lit": "pipe",
  "look": {},
  "scene": "pipe",
  "fig": "",
  "panel": "<h2>Des tickets aux conversations</h2><div class=\"psub\">restructurer pour un modèle</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Brut</b><i>une ligne par message</i></span><pre class=\"ex\">ticket_id, auteur, horodatage, texte</pre></li><li class=\"\"><span class=\"st\"><b>Trier</b><i></i></span><pre class=\"ex\">df.sort_values([&quot;ticket_id&quot;, &quot;horodatage&quot;])</pre></li><li class=\"blue\"><span class=\"st\"><b>Associer les rôles</b><i></i></span><pre class=\"ex\">role = &quot;user&quot; si auteur == client sinon &quot;assistant&quot;</pre></li><li class=\"\"><span class=\"st\"><b>Regrouper</b><i></i></span><pre class=\"ex\">df.groupby(&quot;ticket_id&quot;).apply(lambda g: g[[&quot;role&quot;, &quot;texte&quot;]].to_dict(&quot;records&quot;))</pre></li><li class=\"red\"><span class=\"st\"><b>Écrire en JSONL</b><i></i></span><pre class=\"ex\">{&quot;messages&quot;: [{&quot;role&quot;: &quot;user&quot;, &quot;content&quot;: …}, …]}</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "5.5",
  "title": "L’analyse exploratoire",
  "sub": "regarder avant de modéliser",
  "body": "<p class=\"lede\">L’<b>analyse exploratoire</b> (EDA) consiste à comprendre un jeu de données avant de s’en servir.</p>\n    <ul class=\"rules\"><li>Taille, colonnes, types, valeurs manquantes (<code>df.info()</code>, <code>df.describe()</code>).</li><li>Distributions : histogrammes, classes déséquilibrées, longueurs de textes en jetons.</li><li>Corrélations et croisements entre variables.</li><li>Lire 50 exemples au hasard, puis 50 cas extrêmes (les plus longs, les plus courts).</li></ul>\n    <p>Pour du texte, mesurer la longueur en <b>jetons</b> est essentiel : elle détermine le découpage d’un RAG, le coût d’API et la taille de contexte nécessaire.</p>",
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
  "lit": "formats",
  "look": {},
  "scene": "formats",
  "fig": "",
  "panel": "<h2>Explorer un corpus en dix minutes</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Volumes</b><i></i></span><pre class=\"ex\">len(df), df.source.value_counts()</pre></li><li class=\"blue\"><span class=\"st\"><b>Longueurs en jetons</b><i></i></span><pre class=\"ex\">df.n_tok.describe(percentiles=[.5, .9, .99])</pre></li><li class=\"\"><span class=\"st\"><b>Valeurs manquantes</b><i></i></span><pre class=\"ex\">df.isna().mean().sort_values()</pre></li><li class=\"\"><span class=\"st\"><b>Déséquilibre</b><i></i></span><pre class=\"ex\">df.label.value_counts(normalize=True)</pre></li><li class=\"red\"><span class=\"st\"><b>Lire</b><i>au hasard et aux extrêmes</i></span><pre class=\"ex\">df.sample(20).texte ; df.nlargest(5, &quot;n_tok&quot;)</pre></li></ol><p class=\"note\">La distribution des longueurs fixe la taille des morceaux d’un RAG et la fenêtre de contexte nécessaire.</p>"
 },
 {
  "kicker": "5.6",
  "title": "SQL et PostgreSQL",
  "sub": "le langage des données structurées",
  "body": "<p class=\"lede\">Les données des entreprises vivent dans des bases relationnelles. <b>SQL</b> est incontournable, et <b>PostgreSQL</b> est la base open source de référence.</p>\n    <pre class=\"code\">SELECT c.secteur, count(*) AS n\nFROM tickets t JOIN clients c ON c.id = t.client_id\nWHERE t.cree_le &gt; now() - interval &#x27;30 days&#x27;\nGROUP BY c.secteur ORDER BY n DESC;</pre>\n    <p>À maîtriser : jointures, agrégats, sous-requêtes et CTE (<code>WITH</code>), fonctions de fenêtre, index, transactions. Avec l’extension <b>pgvector</b>, PostgreSQL stocke aussi des plongements et fait de la recherche vectorielle (chapitre 13).</p>",
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
  "lit": "sql",
  "look": {},
  "scene": "sql",
  "fig": "",
  "panel": "<h2>Une requête SQL</h2><div class=\"psub\">l’ordre logique d’exécution</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>FROM / JOIN</b><i>tables sources</i></span><pre class=\"ex\">FROM tickets t JOIN clients c\n  ON c.id = t.client_id</pre></li><li class=\"\"><span class=\"st\"><b>WHERE</b><i>filtrer les lignes</i></span><pre class=\"ex\">WHERE t.statut = &#x27;ouvert&#x27;</pre></li><li class=\"\"><span class=\"st\"><b>GROUP BY</b><i>regrouper</i></span><pre class=\"ex\">GROUP BY c.secteur</pre></li><li class=\"\"><span class=\"st\"><b>HAVING</b><i>filtrer les groupes</i></span><pre class=\"ex\">HAVING count(*) &gt; 10</pre></li><li class=\"red\"><span class=\"st\"><b>SELECT</b><i>colonnes, calculs</i></span><pre class=\"ex\">SELECT c.secteur, count(*) AS n,\n  avg(t.duree_h) AS duree</pre></li><li class=\"\"><span class=\"st\"><b>ORDER BY / LIMIT</b><i>trier, couper</i></span><pre class=\"ex\">ORDER BY n DESC LIMIT 5;</pre></li></ol><p class=\"note\">On écrit SELECT en premier, mais la base exécute d’abord FROM et les jointures, filtre avec WHERE, regroupe, filtre les groupes, et seulement ensuite calcule les colonnes du SELECT. Comprendre cet ordre évite la plupart des erreurs.</p><table class=\"data\"><tr><th>base</th><td>PostgreSQL</td></tr><tr><th>vecteurs</th><td>extension pgvector</td></tr><tr><th>analyse</th><td>DuckDB</td></tr></table>"
 },
 {
  "kicker": "5.7",
  "title": "JSON et JSONL",
  "sub": "le format des modèles de langage",
  "body": "<p class=\"lede\">Le <b>JSON</b> est le format des API et des sorties structurées. Le <b>JSONL</b> (JSON Lines) met un objet par ligne : on peut le lire en flux, l’ajouter ligne à ligne, le découper.</p>\n    <pre class=\"code\">{&quot;messages&quot;: [{&quot;role&quot;: &quot;user&quot;, &quot;content&quot;: &quot;Bonjour&quot;},\n  {&quot;role&quot;: &quot;assistant&quot;, &quot;content&quot;: &quot;Bonjour !&quot;}]}</pre>\n    <p>C’est le format standard des jeux d’affinage, des jeux d’évaluation, des traitements par lots (batch API) et des journaux d’appels. Outil indispensable en ligne de commande : <code>jq</code>.</p>",
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
  "lit": "formats",
  "look": {},
  "scene": "formats",
  "fig": "",
  "panel": "<h2>Manipuler du JSONL</h2><div class=\"psub\">en Python et en ligne de commande</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Lire en flux</b><i></i></span><pre class=\"ex\">for l in open(p): r = json.loads(l)</pre></li><li class=\"\"><span class=\"st\"><b>Avec pandas</b><i></i></span><pre class=\"ex\">pd.read_json(p, lines=True)</pre></li><li class=\"\"><span class=\"st\"><b>Compter</b><i></i></span><pre class=\"ex\">wc -l data.jsonl</pre></li><li class=\"blue\"><span class=\"st\"><b>Filtrer</b><i>jq</i></span><pre class=\"ex\">jq -c &#x27;select(.label == &quot;urgent&quot;)&#x27; data.jsonl</pre></li><li class=\"red\"><span class=\"st\"><b>Valider</b><i>chaque ligne</i></span><pre class=\"ex\">for i, l in enumerate(f): Exemple.model_validate_json(l)</pre></li><li class=\"\"><span class=\"st\"><b>Découper</b><i></i></span><pre class=\"ex\">split -l 10000 data.jsonl part_</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "5.8",
  "title": "CSV, XML et Parquet",
  "sub": "les autres formats",
  "body": "<table class=\"data\"><tr><th>format</th><th>forces</th><th>pièges</th></tr><tr><td>CSV</td><td>universel, lisible</td><td>séparateurs, guillemets, encodage, pas de types</td></tr><tr><td>XML</td><td>documents structurés, échanges anciens</td><td>verbeux ; analyse sécurisée nécessaire</td></tr><tr><td>Parquet</td><td>colonnes, typé, compressé</td><td>binaire, pas modifiable ligne à ligne</td></tr><tr><td>Excel</td><td>partout en entreprise</td><td>cellules fusionnées, formules</td></tr></table>\n    <p class=\"lede\">Règle pratique : recevoir en CSV ou Excel, stocker en <b>Parquet</b>, échanger avec les modèles en <b>JSON</b>. Parquet est le format des jeux de données du Hub de Hugging Face.</p>",
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
  "lit": "formats",
  "look": {},
  "scene": "formats",
  "fig": "",
  "panel": "<h2>Convertir vers Parquet</h2><div class=\"psub\">et interroger sans charger</div><ol class=\"flow\"><li class=\"red\"><span class=\"st\"><b>CSV piégé</b><i></i></span><pre class=\"ex\">pd.read_csv(p, sep=&quot;;&quot;, encoding=&quot;latin-1&quot;, dtype=str)</pre></li><li class=\"\"><span class=\"st\"><b>Excel</b><i></i></span><pre class=\"ex\">pd.read_excel(&quot;export.xlsx&quot;, sheet_name=None)</pre></li><li class=\"\"><span class=\"st\"><b>XML</b><i>analyse sûre</i></span><pre class=\"ex\">defusedxml.ElementTree.parse(p)</pre></li><li class=\"blue\"><span class=\"st\"><b>Écrire Parquet</b><i></i></span><pre class=\"ex\">df.to_parquet(&quot;t.parquet&quot;, compression=&quot;zstd&quot;)</pre></li><li class=\"\"><span class=\"st\"><b>Interroger</b><i>DuckDB</i></span><pre class=\"ex\">duckdb.sql(&quot;SELECT categorie, count(*) FROM &#x27;t.parquet&#x27; GROUP BY 1&quot;)</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "5.9",
  "title": "Les pipelines de données",
  "sub": "automatiser et rejouer",
  "body": "<p class=\"lede\">Un <b>pipeline</b> enchaîne les étapes de traitement de façon automatique et reproductible.</p>\n    <ul class=\"rules\"><li><b>ETL / ELT</b> : extraire, transformer, charger (ou charger d’abord, puis transformer dans l’entrepôt, avec dbt).</li><li><b>Orchestrateurs</b> : Airflow, Dagster, Prefect planifient, relancent et tracent.</li><li><b>Idempotence</b> : relancer une étape ne doit pas créer de doublons.</li><li><b>Incrémental</b> : ne retraiter que ce qui a changé (important pour réindexer un RAG).</li><li>Lots (batch) ou flux continu (Kafka) selon la fraîcheur nécessaire.</li></ul>",
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
  "lit": "pipe",
  "look": {},
  "scene": "pipe",
  "fig": "",
  "panel": "<h2>Un pipeline de données</h2><div class=\"psub\">de la source au jeu prêt à l’emploi</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Collecte</b><i>API, bases, scraping</i></span><pre class=\"ex\">httpx.get(url) · psql -c &quot;\\copy …&quot; · exports Zendesk</pre></li><li class=\"\"><span class=\"st\"><b>Ingestion</b><i>brut, horodaté</i></span><pre class=\"ex\">s3://lac/brut/tickets/2026-11-09/*.jsonl</pre></li><li class=\"red\"><span class=\"st\"><b>Nettoyage</b><i>doublons, erreurs</i></span><pre class=\"ex\">df = df.drop_duplicates(&quot;texte&quot;)\ndf = df[df.texte.str.len() &gt; 20]</pre></li><li class=\"blue\"><span class=\"st\"><b>Transformation</b><i>formats, jointures</i></span><pre class=\"ex\">df = df.merge(clients, on=&quot;client_id&quot;)</pre></li><li class=\"red\"><span class=\"st\"><b>Validation</b><i>schéma, règles</i></span><pre class=\"ex\">schema.validate(df)  # Pandera\nassert df.id.is_unique</pre></li><li class=\"blue\"><span class=\"st\"><b>Stockage</b><i>Parquet, base</i></span><pre class=\"ex\">df.to_parquet(&quot;propre/tickets.parquet&quot;)\ndvc add propre/  # version</pre></li></ol><p class=\"note\">Chaque étape est un programme testé, rejouable et journalisé. On garde toujours les données brutes : si une règle de nettoyage était fausse, on peut tout recalculer. L’orchestrateur (Airflow, Dagster, Prefect) lance les étapes dans l’ordre et relance celles qui échouent.</p><table class=\"data\"><tr><th>principe</th><td>brut immuable</td></tr><tr><th>orchestrateurs</th><td>Airflow, Dagster, Prefect</td></tr><tr><th>sortie</th><td>jeu versionné</td></tr></table>"
 },
 {
  "kicker": "5.10",
  "title": "Le scraping web",
  "sub": "collecter des pages",
  "body": "<p class=\"lede\">Le <b>scraping</b> récupère du contenu web : HTTP (httpx), analyse HTML (BeautifulSoup, lxml), navigateur automatisé pour les pages dynamiques (Playwright).</p>\n    <ul class=\"rules\"><li>Respecter <b>robots.txt</b>, les conditions d’utilisation, le droit d’auteur et le RGPD.</li><li>Limiter le débit (une requête toutes les quelques secondes), s’identifier, mettre en cache.</li><li>Préférer une API officielle quand elle existe.</li><li>Extraire le texte principal sans menus ni publicités (trafilatura) ou convertir en Markdown pour un modèle.</li></ul>\n    <p>Le contenu récupéré est une donnée <b>non fiable</b> : il peut contenir des injections de prompt (chapitre 27).</p>",
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
  "lit": "pipe",
  "look": {},
  "scene": "pipe",
  "fig": "",
  "panel": "<h2>Un collecteur poli</h2><div class=\"psub\">récupérer et extraire</div><ol class=\"flow\"><li class=\"red\"><span class=\"st\"><b>Autorisé ?</b><i>robots.txt</i></span><pre class=\"ex\">urllib.robotparser.RobotFileParser(url + &quot;/robots.txt&quot;)</pre></li><li class=\"\"><span class=\"st\"><b>Télécharger</b><i>s’identifier, limiter</i></span><pre class=\"ex\">httpx.get(u, headers={&quot;User-Agent&quot;: &quot;MonBot/1.0 (contact@…)&quot;})\ntime.sleep(2)</pre></li><li class=\"\"><span class=\"st\"><b>Pages dynamiques</b><i>navigateur</i></span><pre class=\"ex\">page.goto(u); page.content()   # Playwright</pre></li><li class=\"blue\"><span class=\"st\"><b>Extraire le texte</b><i>sans menus</i></span><pre class=\"ex\">trafilatura.extract(html, output_format=&quot;markdown&quot;)</pre></li><li class=\"\"><span class=\"st\"><b>Mettre en cache</b><i></i></span><pre class=\"ex\">ne pas retélécharger : clé = URL + date</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "5.11",
  "title": "La validation des données",
  "sub": "des contrats sur les données",
  "body": "<p class=\"lede\">Valider, c’est vérifier automatiquement que les données respectent ce qu’on attend, avant qu’elles n’atteignent le modèle.</p>\n    <ul class=\"rules\"><li><b>Schéma</b> : colonnes, types, valeurs autorisées (Pydantic, Pandera, JSON Schema).</li><li><b>Règles</b> : unicité, plages, pourcentage de valeurs manquantes (Great Expectations).</li><li><b>Dérive</b> : la distribution change-t-elle d’un jour à l’autre ?</li><li>Une validation qui échoue <b>arrête</b> le pipeline et alerte, au lieu de laisser passer des données corrompues.</li></ul>",
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
  "lit": "pipe",
  "look": {},
  "scene": "pipe",
  "fig": "",
  "panel": "<h2>Un contrat de données</h2><div class=\"psub\">avec Pandera</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Schéma</b><i></i></span><pre class=\"ex\">schema = pa.DataFrameSchema({\n  &quot;id&quot;: pa.Column(str, unique=True),\n  &quot;texte&quot;: pa.Column(str, pa.Check.str_length(20)),\n  &quot;label&quot;: pa.Column(str, pa.Check.isin(LABELS))})</pre></li><li class=\"\"><span class=\"st\"><b>Valider</b><i></i></span><pre class=\"ex\">schema.validate(df, lazy=True)</pre></li><li class=\"\"><span class=\"st\"><b>Règle globale</b><i></i></span><pre class=\"ex\">assert df.texte.isna().mean() &lt; 0.01</pre></li><li class=\"red\"><span class=\"st\"><b>Échec</b><i></i></span><pre class=\"ex\">arrêter le pipeline + alerte</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "5.12",
  "title": "Préparer un jeu de données",
  "sub": "pour entraîner, affiner ou évaluer",
  "body": "<p class=\"lede\">Un jeu de données utile est <b>représentatif</b> de l’usage réel, <b>propre</b>, <b>équilibré</b> et <b>documenté</b>.</p>\n    <ul class=\"rules\"><li>Définir la tâche et le format exact d’un exemple (entrée, sortie attendue).</li><li>Échantillonner des cas réels, y compris les difficiles et les rares.</li><li>Étiqueter avec des consignes écrites ; mesurer l’accord entre annotateurs.</li><li>Séparer entraînement, validation et test sans fuite.</li><li>Versionner (DVC, Hub) et rédiger une fiche (dataset card) : origine, licence, limites.</li></ul>\n    <p>Quelques centaines d’exemples soignés valent mieux que des dizaines de milliers d’exemples bruités, pour l’affinage comme pour l’évaluation (chapitres 19 et 21).</p>",
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
  "lit": "pipe",
  "look": {},
  "scene": "pipe",
  "fig": "",
  "panel": "<h2>La fiche d’un jeu de données</h2><div class=\"psub\">ce qu’on documente</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Tâche</b><i></i></span><pre class=\"ex\">classer les tickets en 12 catégories</pre></li><li class=\"\"><span class=\"st\"><b>Format</b><i></i></span><pre class=\"ex\">{&quot;texte&quot;: str, &quot;label&quot;: str}  (JSONL)</pre></li><li class=\"\"><span class=\"st\"><b>Origine</b><i></i></span><pre class=\"ex\">tickets 2024-2026, clients FR, anonymisés</pre></li><li class=\"blue\"><span class=\"st\"><b>Annotation</b><i></i></span><pre class=\"ex\">2 annotateurs, accord κ = 0,81, consignes v3</pre></li><li class=\"\"><span class=\"st\"><b>Découpage</b><i></i></span><pre class=\"ex\">par client : 80 / 10 / 10</pre></li><li class=\"red\"><span class=\"st\"><b>Limites</b><i></i></span><pre class=\"ex\">peu d’exemples « résiliation » (1,2 %)</pre></li><li class=\"\"><span class=\"st\"><b>Version</b><i></i></span><pre class=\"ex\">dvc tag v1.2 · licence interne</pre></li></ol><p class=\"note\"></p>"
 }
];
export const PLATES = {
  formats: { text: "Parquet range les données par colonnes, avec un type par colonne et une compression efficace : une colonne de catégories répétées se compresse énormément. On ne lit que les colonnes utiles. Ordres de grandeur indicatifs, très variables selon les données.", facts: () => [["lignes", "CSV, JSON, JSONL"], ["colonnes", "Parquet, Arrow"], ["gain typique", "5 à 10 × plus petit"]] }
};
