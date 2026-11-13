// Chapitre 13 : Plongements et bases vectorielles (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 13 · Plongements",
  "title": "Plongements et bases vectorielles",
  "sub": "chercher par le sens",
  "body": "<p class=\"lede\">Une recherche par mots-clés rate « comment arrêter mon contrat » si le document dit « résiliation ». Les <b>plongements</b> représentent le sens d’un texte par un vecteur, et une <b>base vectorielle</b> retrouve rapidement les vecteurs les plus proches d’une requête parmi des millions.</p>\n    <p>C’est la brique de base du RAG, de la recherche sémantique, de la recommandation, du regroupement de documents et de la détection de doublons.</p>",
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
  "lit": "emb",
  "look": {},
  "scene": "emb",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "13.1",
  "title": "Qu’est-ce qu’un plongement ?",
  "sub": "le sens devenu vecteur",
  "body": "<p class=\"lede\">Un <b>plongement</b> (embedding) est un vecteur de nombres (384 à 3 072 en général) produit par un modèle entraîné pour que des textes de sens proche aient des vecteurs proches.</p>\n    <pre class=\"code\">from openai import OpenAI\nv = OpenAI().embeddings.create(model=&#x27;text-embedding-3-small&#x27;, input=&#x27;Comment résilier ?&#x27;).data[0].embedding\nlen(v)   # 1536</pre>\n    <ul class=\"rules\"><li>Un plongement ne se lit pas dimension par dimension : seules les <b>distances</b> entre vecteurs ont un sens.</li><li>Les vecteurs de deux modèles différents ne sont pas comparables : on indexe et on interroge avec le <b>même modèle</b>.</li><li>Changer de modèle oblige à <b>réindexer</b> toute la collection.</li></ul>",
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
  "lit": "emb",
  "look": {},
  "scene": "emb",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "13.2",
  "title": "Plongements denses et creux",
  "sub": "deux représentations",
  "body": "<p class=\"lede\">Un plongement <b>dense</b> a toutes ses dimensions non nulles et capture le sens. Un plongement <b>creux</b> (sparse) a une dimension par mot du vocabulaire, presque toutes nulles, et capture les mots exacts.</p>\n    <table class=\"data\"><tr><th>type</th><th>exemples</th><th>forces</th><th>faiblesses</th></tr><tr><td>dense</td><td>BGE, E5, OpenAI, Voyage, Cohere</td><td>synonymes, paraphrases, multilingue</td><td>noms propres, codes, références</td></tr><tr><td>creux lexical</td><td>BM25</td><td>mots exacts, rapide, sans entraînement</td><td>synonymes</td></tr><tr><td>creux appris</td><td>SPLADE, BGE-M3 sparse</td><td>mots exacts + extension apprise</td><td>index plus lourd</td></tr><tr><td>multi-vecteurs</td><td>ColBERT</td><td>finesse au niveau du jeton</td><td>beaucoup de stockage</td></tr></table>\n    <p>En pratique, combiner dense et creux (recherche hybride) donne les meilleurs résultats sur des documents d’entreprise pleins de références et de codes produits.</p>",
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
  "lit": "emb",
  "look": {},
  "scene": "emb",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "13.3",
  "title": "Les modèles de plongement",
  "sub": "choisir et utiliser",
  "body": "<p class=\"lede\">Le choix du modèle de plongement influence directement la qualité d’un RAG.</p>\n    <ul class=\"rules\"><li>Consulter le classement <b>MTEB</b> (et sa partie multilingue/français), puis <b>tester sur ses propres données</b> : les classements ne reflètent pas votre domaine.</li><li>Critères : langues, longueur maximale d’entrée, dimension (coût de stockage), vitesse, licence, hébergement (API ou local).</li><li>Beaucoup de modèles demandent un <b>préfixe</b> différent pour les requêtes et les documents (« query: », « passage: ») : l’oublier dégrade les résultats.</li><li>Les dimensions <b>Matryoshka</b> permettent de tronquer un vecteur (3 072 → 256) avec une faible perte.</li></ul>",
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
  "lit": "emb",
  "look": {},
  "scene": "emb",
  "fig": "",
  "panel": "<h2>Plonger un corpus en local</h2><div class=\"psub\">sentence-transformers</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Charger</b><i></i></span><pre class=\"ex\">m = SentenceTransformer(&#x27;BAAI/bge-m3&#x27;, device=&#x27;cuda&#x27;)</pre></li><li class=\"blue\"><span class=\"st\"><b>Documents</b><i>par lots</i></span><pre class=\"ex\">D = m.encode(passages, batch_size=64, normalize_embeddings=True,\n  show_progress_bar=True)   # (n, 1024)</pre></li><li class=\"\"><span class=\"st\"><b>Requête</b><i></i></span><pre class=\"ex\">q = m.encode(&#x27;Comment résilier ?&#x27;, normalize_embeddings=True)</pre></li><li class=\"red\"><span class=\"st\"><b>Chercher</b><i>force brute</i></span><pre class=\"ex\">top = np.argsort(-(D @ q))[:5]</pre></li><li class=\"\"><span class=\"st\"><b>Sauver</b><i></i></span><pre class=\"ex\">np.save(&#x27;D.npy&#x27;, D.astype(np.float16))</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "13.4",
  "title": "Les mesures de similarité",
  "sub": "comparer deux vecteurs",
  "body": "<p class=\"lede\">Trois mesures dominent.</p>\n    <table class=\"data\"><tr><th>mesure</th><th>formule</th><th>remarque</th></tr><tr><td>produit scalaire</td><td>a · b</td><td>rapide ; dépend des longueurs</td></tr><tr><td>cosinus</td><td>a · b / (|a| |b|)</td><td>ne regarde que l’angle</td></tr><tr><td>distance euclidienne (L2)</td><td>|a − b|</td><td>plus petite = plus proche</td></tr></table>\n    <p>Pour des vecteurs <b>normalisés</b> (longueur 1), les trois donnent le même classement : cosinus = produit scalaire, et |a − b|² = 2 − 2 cos. On normalise donc souvent à l’indexation et on utilise le produit scalaire, le plus rapide. Utiliser la mesure recommandée par le modèle.</p>",
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
  "lit": "emb",
  "look": {},
  "scene": "emb",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "13.5",
  "title": "La similarité cosinus",
  "sub": "l’angle entre deux sens",
  "body": "<div class=\"eq\">cos(a, b) = (a · b) / (|a| · |b|)</div>\n    <p class=\"lede\">Elle vaut 1 pour deux vecteurs de même direction, 0 pour des vecteurs sans rapport, −1 pour des directions opposées. Pour les modèles de plongement de texte, les valeurs utiles tombent souvent entre 0,2 et 0,9.</p>\n    <ul class=\"rules\"><li>Un score de cosinus n’est <b>pas une probabilité</b> : le seuil de « pertinent » dépend du modèle et du corpus ; on le calibre sur des exemples.</li><li>Comparer des scores n’a de sens qu’avec le même modèle.</li><li>Un score élevé n’est pas une garantie de pertinence : « la résiliation est impossible » et « la résiliation est possible » sont très proches.</li></ul>",
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
  "lit": "emb",
  "look": {},
  "scene": "emb",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "13.6",
  "title": "La recherche sémantique",
  "sub": "trouver par le sens",
  "body": "<p class=\"lede\">La <b>recherche sémantique</b> plonge la requête, cherche les k vecteurs les plus proches dans l’index, et renvoie les documents correspondants.</p>\n    <ul class=\"rules\"><li>Indexation (une fois) : découper, plonger, stocker vecteur + texte + métadonnées.</li><li>Requête (à chaque fois) : plonger la question, chercher, filtrer, renvoyer.</li><li>Évaluer avec des paires question → documents attendus : rappel@k, MRR, nDCG (chapitre 21).</li></ul>\n    <p>Elle brille sur les paraphrases et les questions en langue naturelle ; elle peine sur les identifiants exacts, les négations et les questions qui demandent un calcul ou une agrégation (« combien de contrats en 2025 ? », qui relève du SQL).</p>",
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
  "lit": "emb",
  "look": {},
  "scene": "emb",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "13.7",
  "title": "L’indexation vectorielle",
  "sub": "ne pas tout comparer",
  "body": "<p class=\"lede\">Comparer la requête à 10 millions de vecteurs (force brute) prend du temps. Un <b>index</b> organise les vecteurs pour n’en visiter qu’une petite partie.</p>\n    <table class=\"data\"><tr><th>index</th><th>principe</th><th>usage</th></tr><tr><td>plat (flat)</td><td>tout comparer, exact</td><td>moins de ~100 000 vecteurs</td></tr><tr><td>HNSW</td><td>graphe de voisins à étages</td><td>défaut de la plupart des bases</td></tr><tr><td>IVF</td><td>regrouper en cellules, ne visiter que les plus proches</td><td>très grandes collections</td></tr><tr><td>PQ, quantification</td><td>compresser les vecteurs</td><td>réduire la mémoire</td></tr><tr><td>DiskANN</td><td>graphe sur SSD</td><td>milliards de vecteurs</td></tr></table>\n    <p>Le réglage échange <b>vitesse</b>, <b>mémoire</b> et <b>rappel</b> : on mesure le rappel de l’index approché par rapport à la force brute sur un échantillon.</p>",
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
  "lit": "hnsw",
  "look": {},
  "scene": "hnsw",
  "fig": "",
  "panel": "<h2>L’index HNSW</h2><div class=\"psub\">un graphe à plusieurs étages</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Étage du haut</b><i>peu de nœuds, longs sauts</i></span><pre class=\"ex\">on entre par un point fixe</pre></li><li class=\"\"><span class=\"st\"><b>Descente gloutonne</b><i>aller au voisin le plus proche</i></span><pre class=\"ex\">tant qu’un voisin est plus proche de q, y aller</pre></li><li class=\"\"><span class=\"st\"><b>Étage inférieur</b><i>plus dense</i></span><pre class=\"ex\">repartir du meilleur point trouvé</pre></li><li class=\"red\"><span class=\"st\"><b>Étage 0</b><i>tous les vecteurs</i></span><pre class=\"ex\">explorer ef_search candidats</pre></li><li class=\"blue\"><span class=\"st\"><b>Résultat</b><i>k plus proches approchés</i></span><pre class=\"ex\">rappel ≈ 95–99 % en quelques ms</pre></li></ol><p class=\"note\">HNSW (Hierarchical Navigable Small World) relie chaque vecteur à quelques voisins, sur plusieurs étages comme une carte routière (autoroutes en haut, rues en bas). On trouve les voisins approchés d’une requête en visitant une infime partie de la collection.</p><table class=\"data\"><tr><th>paramètres</th><td>M (liens), ef_construction, ef_search</td></tr><tr><th>complexité</th><td>≈ logarithmique</td></tr><tr><th>coût</th><td>mémoire du graphe</td></tr></table>"
 },
 {
  "kicker": "13.8",
  "title": "Les plus proches voisins approchés",
  "sub": "un peu d’exactitude contre beaucoup de vitesse",
  "body": "<p class=\"lede\">La recherche <b>ANN</b> (Approximate Nearest Neighbors) accepte de rater parfois un vrai voisin pour être 100 à 1 000 fois plus rapide.</p>\n    <ul class=\"rules\"><li>Le <b>rappel@10</b> mesure la part des 10 vrais plus proches retrouvés ; 95 à 99 % est courant.</li><li>HNSW : <code>M</code> (liens par nœud), <code>ef_construction</code> (qualité de construction), <code>ef_search</code> (largeur de recherche, réglable à chaque requête).</li><li>Bibliothèques : <b>FAISS</b> (Meta), hnswlib, ScaNN, USearch ; les bases vectorielles les intègrent.</li></ul>",
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
  "lit": "hnsw",
  "look": {},
  "scene": "hnsw",
  "fig": "",
  "panel": "<h2>Un index FAISS</h2><div class=\"psub\">HNSW sur des vecteurs normalisés</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Construire</b><i></i></span><pre class=\"ex\">index = faiss.IndexHNSWFlat(1024, 32, faiss.METRIC_INNER_PRODUCT)\nindex.hnsw.efConstruction = 200</pre></li><li class=\"blue\"><span class=\"st\"><b>Ajouter</b><i></i></span><pre class=\"ex\">index.add(D.astype(&#x27;float32&#x27;))</pre></li><li class=\"\"><span class=\"st\"><b>Chercher</b><i></i></span><pre class=\"ex\">index.hnsw.efSearch = 64\nscores, ids = index.search(q[None, :], 10)</pre></li><li class=\"red\"><span class=\"st\"><b>Mesurer le rappel</b><i></i></span><pre class=\"ex\">exact = faiss.IndexFlatIP(1024); exact.add(D)\nrappel = len(set(ids[0]) &amp; set(exact.search(q[None], 10)[1][0])) / 10</pre></li><li class=\"\"><span class=\"st\"><b>Sauver</b><i></i></span><pre class=\"ex\">faiss.write_index(index, &#x27;docs.faiss&#x27;)</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "13.9",
  "title": "Les bases de données vectorielles",
  "sub": "stocker, filtrer, servir",
  "body": "<p class=\"lede\">Une <b>base vectorielle</b> ajoute à l’index la persistance, les mises à jour, les métadonnées et les filtres, la réplication, la sécurité et une API.</p>\n    <table class=\"data\"><tr><th>base</th><th>type</th><th>points forts</th></tr><tr><td>Pinecone</td><td>service géré</td><td>zéro exploitation, serverless</td></tr><tr><td>Qdrant</td><td>open source (Rust) + cloud</td><td>filtres riches, quantification, rapide</td></tr><tr><td>Weaviate</td><td>open source (Go) + cloud</td><td>hybride intégré, modules de plongement</td></tr><tr><td>Milvus / Zilliz</td><td>open source distribué + cloud</td><td>milliards de vecteurs, GPU</td></tr><tr><td>Chroma</td><td>open source, embarqué</td><td>prototypes, simplicité</td></tr><tr><td>pgvector</td><td>extension PostgreSQL</td><td>une seule base, SQL, transactions</td></tr></table>\n    <p>Le choix dépend du volume, de l’équipe et de l’existant. En dessous de quelques millions de vecteurs, <b>pgvector</b> dans le PostgreSQL déjà en place est souvent le choix le plus simple.</p>",
  "cam": {
   "target": [
    40,
    1.8,
    0
   ],
   "az": 8,
   "el": 7,
   "dist": 26,
   "auto": true
  },
  "lit": "tailles",
  "look": {},
  "scene": "tailles",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "13.10",
  "title": "Pinecone",
  "sub": "le service géré",
  "body": "<p class=\"lede\"><b>Pinecone</b> est une base vectorielle entièrement gérée : pas de serveur à exploiter, mise à l’échelle automatique (mode serverless), espaces de noms par client.</p>\n    <pre class=\"code\">pc = Pinecone(api_key=os.environ[&#x27;PINECONE_API_KEY&#x27;])\nidx = pc.Index(&#x27;docs&#x27;)\nidx.upsert(vectors=[{&#x27;id&#x27;: &#x27;d1#3&#x27;, &#x27;values&#x27;: v, &#x27;metadata&#x27;: {&#x27;source&#x27;: &#x27;cgv.pdf&#x27;, &#x27;annee&#x27;: 2026}}], namespace=&#x27;client-42&#x27;)\nidx.query(vector=q, top_k=10, filter={&#x27;annee&#x27;: {&#x27;$gte&#x27;: 2025}}, include_metadata=True, namespace=&#x27;client-42&#x27;)</pre>\n    <p>Atouts : rapidité de mise en route, recherche hybride, reranking intégré. Limites : données chez un tiers, coûts qui montent avec le volume, dépendance au fournisseur.</p>",
  "cam": {
   "target": [
    40,
    1.8,
    0
   ],
   "az": 8,
   "el": 7,
   "dist": 26,
   "auto": true
  },
  "lit": "tailles",
  "look": {},
  "scene": "tailles",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "13.11",
  "title": "Qdrant",
  "sub": "open source, en Rust",
  "body": "<p class=\"lede\"><b>Qdrant</b> est une base vectorielle open source, rapide, avec des filtres sur les métadonnées très expressifs, plusieurs vecteurs nommés par point (dense + creux), et de la quantification intégrée.</p>\n    <pre class=\"code\">client = QdrantClient(url=&#x27;http://localhost:6333&#x27;)\nclient.create_collection(&#x27;docs&#x27;, vectors_config=VectorParams(size=1024, distance=Distance.COSINE))\nclient.upsert(&#x27;docs&#x27;, points=[PointStruct(id=1, vector=v, payload={&#x27;source&#x27;: &#x27;cgv.pdf&#x27;, &#x27;tenant&#x27;: &#x27;acme&#x27;})])\nclient.query_points(&#x27;docs&#x27;, query=q, limit=10,\n    query_filter=Filter(must=[FieldCondition(key=&#x27;tenant&#x27;, match=MatchValue(value=&#x27;acme&#x27;))]))</pre>\n    <p>Se lance en une commande (<code>docker run -p 6333:6333 qdrant/qdrant</code>), en mémoire pour les tests, ou en cloud géré.</p>",
  "cam": {
   "target": [
    40,
    1.8,
    0
   ],
   "az": 8,
   "el": 7,
   "dist": 26,
   "auto": true
  },
  "lit": "tailles",
  "look": {},
  "scene": "tailles",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "13.12",
  "title": "Weaviate",
  "sub": "base vectorielle et hybride",
  "body": "<p class=\"lede\"><b>Weaviate</b> (open source, en Go) organise les données en collections avec un schéma, intègre la recherche <b>hybride</b> (BM25 + vecteurs) et peut appeler lui-même un modèle de plongement à l’insertion (modules).</p>\n    <pre class=\"code\">docs = client.collections.get(&#x27;Docs&#x27;)\nres = docs.query.hybrid(query=&#x27;résiliation anticipée&#x27;, alpha=0.5, limit=10,\n    filters=Filter.by_property(&#x27;annee&#x27;).greater_or_equal(2025))</pre>\n    <p>Le paramètre <code>alpha</code> dose la part sémantique (1) et lexicale (0). Multi-locataires natif, réplication, service géré disponible.</p>",
  "cam": {
   "target": [
    40,
    1.8,
    0
   ],
   "az": 8,
   "el": 7,
   "dist": 26,
   "auto": true
  },
  "lit": "tailles",
  "look": {},
  "scene": "tailles",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "13.13",
  "title": "Milvus",
  "sub": "pour les très grands volumes",
  "body": "<p class=\"lede\"><b>Milvus</b> (open source, LF AI) est conçu pour des milliards de vecteurs : architecture distribuée (stockage objet, nœuds de requête et d’indexation séparés), nombreux types d’index (HNSW, IVF, DiskANN, index GPU).</p>\n    <pre class=\"code\">client = MilvusClient(&#x27;http://localhost:19530&#x27;)\nclient.create_collection(&#x27;docs&#x27;, dimension=1024, metric_type=&#x27;COSINE&#x27;)\nclient.insert(&#x27;docs&#x27;, [{&#x27;id&#x27;: 1, &#x27;vector&#x27;: v, &#x27;source&#x27;: &#x27;cgv.pdf&#x27;}])\nclient.search(&#x27;docs&#x27;, data=[q], limit=10, filter=&#x27;annee &gt;= 2025&#x27;, output_fields=[&#x27;source&#x27;])</pre>\n    <p><b>Milvus Lite</b> tourne dans un simple fichier pour le développement ; <b>Zilliz Cloud</b> en est la version gérée. Plus lourd à exploiter que Qdrant ou pgvector : à réserver aux gros volumes.</p>",
  "cam": {
   "target": [
    40,
    1.8,
    0
   ],
   "az": 8,
   "el": 7,
   "dist": 26,
   "auto": true
  },
  "lit": "tailles",
  "look": {},
  "scene": "tailles",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "13.14",
  "title": "Chroma",
  "sub": "simple, pour commencer",
  "body": "<p class=\"lede\"><b>Chroma</b> est une base vectorielle open source pensée pour la simplicité : elle s’installe avec pip, tourne dans le processus Python ou en serveur, et peut calculer les plongements elle-même.</p>\n    <pre class=\"code\">client = chromadb.PersistentClient(path=&#x27;./chroma&#x27;)\ncol = client.get_or_create_collection(&#x27;docs&#x27;, metadata={&#x27;hnsw:space&#x27;: &#x27;cosine&#x27;})\ncol.add(ids=[&#x27;d1&#x27;], documents=[&#x27;Le préavis est de 30 jours.&#x27;], metadatas=[{&#x27;source&#x27;: &#x27;cgv.pdf&#x27;}])\ncol.query(query_texts=[&#x27;délai pour résilier&#x27;], n_results=5, where={&#x27;source&#x27;: &#x27;cgv.pdf&#x27;})</pre>\n    <p>Idéale pour un prototype, un carnet Jupyter ou une application locale ; pour la production multi-utilisateurs, vérifier la tenue en charge ou passer à une base serveur.</p>",
  "cam": {
   "target": [
    40,
    1.8,
    0
   ],
   "az": 8,
   "el": 7,
   "dist": 26,
   "auto": true
  },
  "lit": "tailles",
  "look": {},
  "scene": "tailles",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "13.15",
  "title": "Le filtrage par métadonnées",
  "sub": "chercher dans le bon sous-ensemble",
  "body": "<p class=\"lede\">Chaque vecteur porte des <b>métadonnées</b> : source, date, langue, type de document, client, droits d’accès. Les filtres restreignent la recherche.</p>\n    <ul class=\"rules\"><li><b>Sécurité</b> : filtrer par locataire (tenant) et par droits, <b>dans la base</b>, jamais seulement après coup dans l’application.</li><li><b>Pertinence</b> : « les contrats de 2025 », « la documentation de la version 4 ».</li><li>Pré-filtrage (filtrer puis chercher) vs post-filtrage (chercher puis filtrer) : le second peut renvoyer trop peu de résultats si le filtre est sélectif ; les bonnes bases gèrent cela dans l’index.</li><li>Indexer les champs de filtre (index de payload) pour garder des requêtes rapides.</li></ul>",
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
  "lit": "emb",
  "look": {},
  "scene": "emb",
  "fig": "",
  "panel": "<h2>Des métadonnées utiles</h2><div class=\"psub\">à stocker avec chaque morceau</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Identité</b><i></i></span><pre class=\"ex\">doc_id, chunk_id, version, hash du contenu</pre></li><li class=\"\"><span class=\"st\"><b>Origine</b><i></i></span><pre class=\"ex\">source (URL, chemin), titre, section, page</pre></li><li class=\"blue\"><span class=\"st\"><b>Temps</b><i></i></span><pre class=\"ex\">date de création, date de mise à jour</pre></li><li class=\"red\"><span class=\"st\"><b>Accès</b><i></i></span><pre class=\"ex\">tenant_id, groupes autorisés</pre></li><li class=\"\"><span class=\"st\"><b>Classement</b><i></i></span><pre class=\"ex\">langue, type (FAQ, contrat, ticket), produit</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "13.16",
  "title": "La recherche hybride",
  "sub": "le meilleur des deux mondes",
  "body": "<p class=\"lede\">La <b>recherche hybride</b> lance en parallèle une recherche lexicale (BM25 ou creux) et une recherche dense, puis fusionne les classements.</p>\n    <div class=\"eq\">RRF(d) = Σ 1 / (k + rang_i(d)),   k ≈ 60</div>\n    <ul class=\"rules\"><li>La <b>fusion par rangs réciproques</b> (RRF) ne demande aucun réglage de poids et résiste aux échelles de scores différentes.</li><li>Alternative : combinaison pondérée de scores normalisés (le alpha de Weaviate).</li><li>Gain typique : plusieurs points de rappel, surtout sur les noms propres, codes, numéros de version et termes métier.</li><li>Disponible dans Qdrant, Weaviate, Milvus, Pinecone, Elasticsearch, OpenSearch, et en SQL avec pgvector + recherche plein texte.</li></ul>",
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
  "lit": "emb",
  "look": {},
  "scene": "emb",
  "fig": "",
  "panel": "<h2>Fusion RRF en dix lignes</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Deux listes</b><i></i></span><pre class=\"ex\">lex = bm25.search(q, 50)      # [id, ...]\nsem = vecteurs.search(q, 50)</pre></li><li class=\"blue\"><span class=\"st\"><b>Score</b><i></i></span><pre class=\"ex\">def rrf(*listes, k=60):\n    s = defaultdict(float)\n    for l in listes:\n        for r, d in enumerate(l): s[d] += 1 / (k + r + 1)\n    return sorted(s, key=s.get, reverse=True)</pre></li><li class=\"\"><span class=\"st\"><b>Fusionner</b><i></i></span><pre class=\"ex\">candidats = rrf(lex, sem)[:20]</pre></li><li class=\"red\"><span class=\"st\"><b>Puis</b><i></i></span><pre class=\"ex\">reranking des 20 candidats (chapitre 15)</pre></li></ol><p class=\"note\"></p>"
 }
];
export const PLATES = {
  emb: { text: "Un modèle de plongement transforme chaque texte en vecteur. Les textes de sens voisin tombent près les uns des autres, même sans mot commun : « résilier mon abonnement » est proche de « préavis de 30 jours ». La recherche sémantique renvoie les documents les plus proches de la question.", facts: () => [["mesure", "similarité cosinus"], ["k plus proches", "souvent 5 à 50"], ["index", "HNSW, IVF"]] },
  tailles: { text: "10 millions × 1 024 dimensions × 4 octets ≈ 41 Go en float32, sans compter le graphe. La quantification réduit fortement la mémoire ; on compense la perte de précision en recalculant les scores exacts sur les meilleurs candidats (rescoring).", facts: () => [["float32", "4 octets / dim"], ["int8", "÷ 4"], ["binaire", "÷ 32, puis rescoring"]] }
};
