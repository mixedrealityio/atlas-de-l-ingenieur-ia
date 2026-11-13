// Chapitre 14 : Construire un système RAG (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 14 · RAG",
  "title": "Construire un système RAG",
  "sub": "répondre à partir de vos documents",
  "body": "<p class=\"lede\">La <b>génération augmentée par récupération</b> (RAG, Retrieval-Augmented Generation) donne au modèle, à chaque question, les passages de documents qui contiennent la réponse.</p>\n    <ul class=\"rules\"><li>Le modèle répond sur des données <b>privées</b> et <b>récentes</b> qu’il n’a jamais vues.</li><li>Il peut <b>citer ses sources</b>, ce qui permet de vérifier.</li><li>Mettre à jour la connaissance = réindexer, sans réentraîner.</li><li>Les hallucinations diminuent (sans disparaître) quand la réponse est dans le contexte.</li></ul>\n    <p>C’est l’application d’entreprise la plus répandue des modèles de langage. Ce chapitre construit un RAG « naïf » solide ; le suivant présente les techniques avancées.</p>",
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
  "lit": "requete",
  "look": {},
  "scene": "requete",
  "fig": "",
  "panel": "<h2>La requête</h2><div class=\"psub\">en ligne, à chaque question</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Question</b><i></i></span><pre class=\"ex\">« Puis-je résilier avant 12 mois ? »</pre></li><li class=\"\"><span class=\"st\"><b>Transformation</b><i>réécriture, contexte</i></span><pre class=\"ex\">« résiliation anticipée contrat avant 12 mois préavis »</pre></li><li class=\"blue\"><span class=\"st\"><b>Récupération</b><i>hybride, filtres</i></span><pre class=\"ex\">top 30 candidats (tenant = acme)</pre></li><li class=\"blue\"><span class=\"st\"><b>Reranking</b><i></i></span><pre class=\"ex\">cross-encoder → top 5</pre></li><li class=\"red\"><span class=\"st\"><b>Génération</b><i>prompt + documents</i></span><pre class=\"ex\">« Réponds à partir des documents, cite [id]. »</pre></li><li class=\"\"><span class=\"st\"><b>Réponse</b><i>avec sources</i></span><pre class=\"ex\">« Oui, avec un préavis de 30 jours [cgv#12]. »</pre></li></ol><p class=\"note\">À chaque question, on récupère les passages pertinents et on les met dans le prompt. Le modèle répond en s’appuyant sur eux et cite ses sources. Latence typique : 0,2 à 1 s de récupération, puis la génération.</p><table class=\"data\"><tr><th>récupération</th><td>50–500 ms</td></tr><tr><th>documents dans le prompt</th><td>3 à 10 morceaux</td></tr><tr><th>sortie</th><td>réponse + citations</td></tr></table>"
 },
 {
  "kicker": "14.1",
  "title": "L’architecture RAG",
  "sub": "deux pipelines",
  "body": "<p class=\"lede\">Un système RAG se compose de deux pipelines qui partagent un index.</p>\n    <table class=\"data\"><tr><th>pipeline</th><th>quand</th><th>étapes</th></tr><tr><td>ingestion</td><td>hors ligne, à chaque changement de document</td><td>charger, analyser, découper, plonger, stocker</td></tr><tr><td>requête</td><td>en ligne, à chaque question</td><td>transformer, récupérer, reclasser, générer, citer</td></tr></table>\n    <ul class=\"rules\"><li>Composants : chargeurs de sources, analyseur de documents, modèle de plongement, base vectorielle (+ index lexical), reranker, modèle de langage, et une couche d’évaluation et d’observabilité.</li><li>Chaque composant se change indépendamment ; chaque changement se mesure.</li></ul>\n    <p>Règle de diagnostic : quand une réponse est fausse, vérifier d’abord si le bon passage a été <b>récupéré</b>. Si non, c’est un problème de recherche ; si oui, un problème de génération.</p>",
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
  "lit": "requete",
  "look": {},
  "scene": "requete",
  "fig": "",
  "panel": "<h2>La requête</h2><div class=\"psub\">en ligne, à chaque question</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Question</b><i></i></span><pre class=\"ex\">« Puis-je résilier avant 12 mois ? »</pre></li><li class=\"\"><span class=\"st\"><b>Transformation</b><i>réécriture, contexte</i></span><pre class=\"ex\">« résiliation anticipée contrat avant 12 mois préavis »</pre></li><li class=\"blue\"><span class=\"st\"><b>Récupération</b><i>hybride, filtres</i></span><pre class=\"ex\">top 30 candidats (tenant = acme)</pre></li><li class=\"blue\"><span class=\"st\"><b>Reranking</b><i></i></span><pre class=\"ex\">cross-encoder → top 5</pre></li><li class=\"red\"><span class=\"st\"><b>Génération</b><i>prompt + documents</i></span><pre class=\"ex\">« Réponds à partir des documents, cite [id]. »</pre></li><li class=\"\"><span class=\"st\"><b>Réponse</b><i>avec sources</i></span><pre class=\"ex\">« Oui, avec un préavis de 30 jours [cgv#12]. »</pre></li></ol><p class=\"note\">À chaque question, on récupère les passages pertinents et on les met dans le prompt. Le modèle répond en s’appuyant sur eux et cite ses sources. Latence typique : 0,2 à 1 s de récupération, puis la génération.</p><table class=\"data\"><tr><th>récupération</th><td>50–500 ms</td></tr><tr><th>documents dans le prompt</th><td>3 à 10 morceaux</td></tr><tr><th>sortie</th><td>réponse + citations</td></tr></table>"
 },
 {
  "kicker": "14.2",
  "title": "L’ingestion des documents",
  "sub": "faire entrer les sources",
  "body": "<p class=\"lede\">L’<b>ingestion</b> va chercher les documents là où ils vivent et les fait entrer dans le pipeline.</p>\n    <ul class=\"rules\"><li><b>Connecteurs</b> : systèmes de fichiers, S3, SharePoint, Google Drive, Confluence, Notion, bases de données, sites web.</li><li><b>Incrémental</b> : détecter les ajouts, modifications et suppressions (date, hash du contenu) ; supprimer de l’index ce qui a disparu des sources.</li><li><b>Droits</b> : récupérer les listes d’accès des documents et les stocker en métadonnées.</li><li><b>Traçabilité</b> : chaque morceau garde son document d’origine, sa version, sa page.</li></ul>",
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
  "lit": "ingest",
  "look": {},
  "scene": "ingest",
  "fig": "",
  "panel": "<h2>Une ingestion incrémentale</h2><div class=\"psub\">ne retraiter que ce qui change</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Lister</b><i></i></span><pre class=\"ex\">for f in source.lister(): h = sha256(f.contenu)</pre></li><li class=\"blue\"><span class=\"st\"><b>Comparer</b><i></i></span><pre class=\"ex\">if registre.get(f.id) == h: continue   # inchangé</pre></li><li class=\"\"><span class=\"st\"><b>Traiter</b><i></i></span><pre class=\"ex\">morceaux = decouper(analyser(f))</pre></li><li class=\"\"><span class=\"st\"><b>Remplacer</b><i></i></span><pre class=\"ex\">index.delete(filter={&#x27;doc_id&#x27;: f.id})\nindex.upsert(plonger(morceaux))</pre></li><li class=\"red\"><span class=\"st\"><b>Supprimés</b><i></i></span><pre class=\"ex\">for id in registre.keys() - ids_vus: index.delete(...)</pre></li><li class=\"\"><span class=\"st\"><b>Noter</b><i></i></span><pre class=\"ex\">registre[f.id] = h</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "14.3",
  "title": "L’analyse des documents",
  "sub": "le piège des PDF",
  "body": "<p class=\"lede\">Un PDF n’est pas du texte : c’est une description de page (caractères positionnés, images, tableaux dessinés). L’<b>analyse</b> (parsing) doit retrouver l’ordre de lecture, les titres, les listes, les tableaux.</p>\n    <table class=\"data\"><tr><th>outil</th><th>type</th><th>forces</th></tr><tr><td>pypdf, PyMuPDF</td><td>extraction de texte</td><td>rapide, PDF numériques simples</td></tr><tr><td>Docling (IBM)</td><td>analyse de mise en page</td><td>tableaux, titres, sortie Markdown/JSON</td></tr><tr><td>Unstructured</td><td>multi-formats</td><td>PDF, DOCX, HTML, e-mails</td></tr><tr><td>Marker, MinerU</td><td>PDF → Markdown</td><td>documents scientifiques, formules</td></tr><tr><td>OCR (Tesseract, PaddleOCR)</td><td>images de texte</td><td>documents scannés</td></tr><tr><td>modèles de vision</td><td>lire la page comme une image</td><td>mises en page complexes (chapitre 20)</td></tr></table>\n    <p>Toujours <b>regarder</b> la sortie de l’analyse sur un échantillon de documents réels : colonnes mélangées, tableaux aplatis, en-têtes répétés à chaque page sont les défauts les plus courants.</p>",
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
  "lit": "ingest",
  "look": {},
  "scene": "ingest",
  "fig": "",
  "panel": "<h2>L’ingestion</h2><div class=\"psub\">hors ligne, à chaque mise à jour</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Sources</b><i></i></span><pre class=\"ex\">SharePoint, Confluence, Drive, S3, site web, base SQL</pre></li><li class=\"red\"><span class=\"st\"><b>Analyse</b><i>PDF, HTML, DOCX → texte</i></span><pre class=\"ex\">Docling / Unstructured → Markdown + tableaux</pre></li><li class=\"\"><span class=\"st\"><b>Nettoyage</b><i></i></span><pre class=\"ex\">en-têtes, pieds de page, menus retirés</pre></li><li class=\"blue\"><span class=\"st\"><b>Découpage</b><i>morceaux de 300 à 1 000 jetons</i></span><pre class=\"ex\">par titres puis par taille, chevauchement 10–15 %</pre></li><li class=\"\"><span class=\"st\"><b>Plongements</b><i></i></span><pre class=\"ex\">model.encode(morceaux) → vecteurs</pre></li><li class=\"blue\"><span class=\"st\"><b>Stockage</b><i>vecteurs + texte + métadonnées</i></span><pre class=\"ex\">upsert(id=doc#n, vector, payload)</pre></li></ol><p class=\"note\">L’ingestion transforme une masse de documents hétérogènes en morceaux propres, plongés et indexés. Elle doit être incrémentale (ne retraiter que ce qui change), idempotente et surveillée : c’est là que naissent la plupart des mauvaises réponses d’un RAG.</p><table class=\"data\"><tr><th>sortie</th><td>un index interrogeable</td></tr><tr><th>fréquence</th><td>continue ou planifiée</td></tr><tr><th>piège n° 1</th><td>l’analyse des PDF</td></tr></table>"
 },
 {
  "kicker": "14.4",
  "title": "Les stratégies de découpage",
  "sub": "des morceaux qui ont du sens",
  "body": "<p class=\"lede\">On découpe les documents en <b>morceaux</b> (chunks) : assez petits pour être précis et tenir à plusieurs dans le prompt, assez grands pour garder le contexte.</p>\n    <table class=\"data\"><tr><th>stratégie</th><th>principe</th><th>quand</th></tr><tr><td>taille fixe</td><td>N jetons</td><td>base de comparaison</td></tr><tr><td>récursive</td><td>séparer par paragraphes, puis phrases, sous une taille max</td><td>défaut raisonnable</td></tr><tr><td>par structure</td><td>selon les titres, sections, articles</td><td>documentation, contrats, Markdown</td></tr><tr><td>sémantique</td><td>couper là où le sens change (plongements)</td><td>textes longs sans structure</td></tr><tr><td>par élément</td><td>un tableau, une FAQ, une fonction de code</td><td>contenus typés</td></tr></table>\n    <p>Ordre de grandeur : 300 à 1 000 jetons. Ajouter au morceau le <b>titre du document et le chemin de section</b> améliore nettement la récupération. Comparer plusieurs tailles sur le jeu d’évaluation plutôt que de choisir au hasard.</p>",
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
  "lit": "ingest",
  "look": {},
  "scene": "ingest",
  "fig": "",
  "panel": "<h2>Découper un Markdown par titres</h2><div class=\"psub\">puis par taille</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Par titres</b><i></i></span><pre class=\"ex\">sections = MarkdownHeaderTextSplitter(\n  [(&#x27;#&#x27;, &#x27;h1&#x27;), (&#x27;##&#x27;, &#x27;h2&#x27;)]).split_text(md)</pre></li><li class=\"blue\"><span class=\"st\"><b>Par taille</b><i></i></span><pre class=\"ex\">spl = RecursiveCharacterTextSplitter.from_tiktoken_encoder(\n  chunk_size=600, chunk_overlap=80)</pre></li><li class=\"\"><span class=\"st\"><b>Assembler</b><i></i></span><pre class=\"ex\">morceaux = spl.split_documents(sections)</pre></li><li class=\"red\"><span class=\"st\"><b>Enrichir</b><i></i></span><pre class=\"ex\">m.page_content = f&quot;{titre} &gt; {m.metadata.get(&#x27;h2&#x27;, &#x27;&#x27;)}\\n\\n{m.page_content}&quot;</pre></li><li class=\"\"><span class=\"st\"><b>Vérifier</b><i></i></span><pre class=\"ex\">distribution des tailles ; aucun morceau vide ou géant</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "14.5",
  "title": "Les morceaux qui se chevauchent",
  "sub": "ne pas couper une idée en deux",
  "body": "<p class=\"lede\">Un découpage net peut séparer une phrase de son contexte : la question se trouve à la fin d’un morceau et la réponse au début du suivant. Le <b>chevauchement</b> (overlap) répète la fin de chaque morceau au début du suivant.</p>\n    <ul class=\"rules\"><li>Valeur courante : 10 à 20 % de la taille du morceau (par exemple 80 jetons sur 600).</li><li>Plus de chevauchement = plus de stockage et des résultats redondants (dédupliquer à la récupération).</li><li>Avec un découpage par structure (sections), le chevauchement compte moins.</li><li>Alternative : récupérer aussi les morceaux <b>voisins</b> du meilleur résultat (fenêtre de phrases), ou le parent (chapitre 15).</li></ul>",
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
  "lit": "ingest",
  "look": {},
  "scene": "ingest",
  "fig": "",
  "panel": "<h2>L’ingestion</h2><div class=\"psub\">hors ligne, à chaque mise à jour</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Sources</b><i></i></span><pre class=\"ex\">SharePoint, Confluence, Drive, S3, site web, base SQL</pre></li><li class=\"red\"><span class=\"st\"><b>Analyse</b><i>PDF, HTML, DOCX → texte</i></span><pre class=\"ex\">Docling / Unstructured → Markdown + tableaux</pre></li><li class=\"\"><span class=\"st\"><b>Nettoyage</b><i></i></span><pre class=\"ex\">en-têtes, pieds de page, menus retirés</pre></li><li class=\"blue\"><span class=\"st\"><b>Découpage</b><i>morceaux de 300 à 1 000 jetons</i></span><pre class=\"ex\">par titres puis par taille, chevauchement 10–15 %</pre></li><li class=\"\"><span class=\"st\"><b>Plongements</b><i></i></span><pre class=\"ex\">model.encode(morceaux) → vecteurs</pre></li><li class=\"blue\"><span class=\"st\"><b>Stockage</b><i>vecteurs + texte + métadonnées</i></span><pre class=\"ex\">upsert(id=doc#n, vector, payload)</pre></li></ol><p class=\"note\">L’ingestion transforme une masse de documents hétérogènes en morceaux propres, plongés et indexés. Elle doit être incrémentale (ne retraiter que ce qui change), idempotente et surveillée : c’est là que naissent la plupart des mauvaises réponses d’un RAG.</p><table class=\"data\"><tr><th>sortie</th><td>un index interrogeable</td></tr><tr><th>fréquence</th><td>continue ou planifiée</td></tr><tr><th>piège n° 1</th><td>l’analyse des PDF</td></tr></table>"
 },
 {
  "kicker": "14.6",
  "title": "Générer les plongements",
  "sub": "plonger des millions de morceaux",
  "body": "<p class=\"lede\">La génération de plongements est une étape de calcul en lots, souvent la plus longue de l’ingestion.</p>\n    <ul class=\"rules\"><li>Grouper par lots (64 à 512 textes) ; sur GPU pour un modèle local, ou API de plongements (avec ses limites de débit).</li><li>Mettre en cache par hash du texte : un morceau inchangé n’est pas replongé.</li><li>Noter le <b>nom et la version du modèle</b> dans les métadonnées de la collection.</li><li>Coût par API : de l’ordre de quelques centimes à quelques dizaines de centimes par million de jetons ; 1 Go de texte ≈ 250 millions de jetons.</li></ul>\n    <p>Les mêmes préfixes et la même normalisation doivent être appliqués à l’indexation et à la requête : un écart ici dégrade silencieusement toute la recherche.</p>",
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
  "lit": "ingest",
  "look": {},
  "scene": "ingest",
  "fig": "",
  "panel": "<h2>L’ingestion</h2><div class=\"psub\">hors ligne, à chaque mise à jour</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Sources</b><i></i></span><pre class=\"ex\">SharePoint, Confluence, Drive, S3, site web, base SQL</pre></li><li class=\"red\"><span class=\"st\"><b>Analyse</b><i>PDF, HTML, DOCX → texte</i></span><pre class=\"ex\">Docling / Unstructured → Markdown + tableaux</pre></li><li class=\"\"><span class=\"st\"><b>Nettoyage</b><i></i></span><pre class=\"ex\">en-têtes, pieds de page, menus retirés</pre></li><li class=\"blue\"><span class=\"st\"><b>Découpage</b><i>morceaux de 300 à 1 000 jetons</i></span><pre class=\"ex\">par titres puis par taille, chevauchement 10–15 %</pre></li><li class=\"\"><span class=\"st\"><b>Plongements</b><i></i></span><pre class=\"ex\">model.encode(morceaux) → vecteurs</pre></li><li class=\"blue\"><span class=\"st\"><b>Stockage</b><i>vecteurs + texte + métadonnées</i></span><pre class=\"ex\">upsert(id=doc#n, vector, payload)</pre></li></ol><p class=\"note\">L’ingestion transforme une masse de documents hétérogènes en morceaux propres, plongés et indexés. Elle doit être incrémentale (ne retraiter que ce qui change), idempotente et surveillée : c’est là que naissent la plupart des mauvaises réponses d’un RAG.</p><table class=\"data\"><tr><th>sortie</th><td>un index interrogeable</td></tr><tr><th>fréquence</th><td>continue ou planifiée</td></tr><tr><th>piège n° 1</th><td>l’analyse des PDF</td></tr></table>"
 },
 {
  "kicker": "14.7",
  "title": "Le stockage des vecteurs",
  "sub": "un index interrogeable",
  "body": "<p class=\"lede\">Chaque morceau est stocké avec son <b>vecteur</b>, son <b>texte</b> et ses <b>métadonnées</b> dans une base vectorielle (chapitre 13), souvent à côté d’un index lexical.</p>\n    <ul class=\"rules\"><li>Identifiant stable et déterministe (<code>doc_id#n</code>) : un upsert remplace au lieu de dupliquer.</li><li>Une collection par modèle de plongement ; un alias pour basculer d’un index à l’autre sans interruption lors d’une réindexation.</li><li>Sauvegardes et instantanés ; le texte source reste aussi dans un stockage objet pour pouvoir tout reconstruire.</li><li>Surveiller la taille, la latence p95 et le rappel.</li></ul>",
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
  "lit": "ingest",
  "look": {},
  "scene": "ingest",
  "fig": "",
  "panel": "<h2>pgvector : tout dans PostgreSQL</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Activer</b><i></i></span><pre class=\"ex\">CREATE EXTENSION vector;</pre></li><li class=\"blue\"><span class=\"st\"><b>Table</b><i></i></span><pre class=\"ex\">CREATE TABLE morceaux (id text PRIMARY KEY, doc_id text,\n  tenant text, texte text, emb vector(1024));</pre></li><li class=\"\"><span class=\"st\"><b>Index</b><i></i></span><pre class=\"ex\">CREATE INDEX ON morceaux USING hnsw (emb vector_cosine_ops);</pre></li><li class=\"red\"><span class=\"st\"><b>Chercher</b><i></i></span><pre class=\"ex\">SELECT id, texte FROM morceaux WHERE tenant = &#x27;acme&#x27;\nORDER BY emb &lt;=&gt; $1 LIMIT 10;</pre></li><li class=\"\"><span class=\"st\"><b>Plein texte</b><i>pour l’hybride</i></span><pre class=\"ex\">… ts_rank(to_tsvector(&#x27;french&#x27;, texte), plainto_tsquery(&#x27;french&#x27;, $2))</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "14.8",
  "title": "Transformer les requêtes",
  "sub": "mieux poser la question",
  "body": "<p class=\"lede\">La question de l’utilisateur est souvent un mauvais point de départ pour la recherche : trop courte, ambiguë, dépendante de la conversation (« et pour l’Espagne ? »).</p>\n    <table class=\"data\"><tr><th>technique</th><th>principe</th></tr><tr><td>réécriture</td><td>un modèle reformule la question de façon autonome et explicite</td></tr><tr><td>condensation</td><td>intégrer l’historique : « et pour l’Espagne ? » → « délai de livraison en Espagne »</td></tr><tr><td>décomposition</td><td>découper une question complexe en sous-questions</td></tr><tr><td>HyDE</td><td>générer une réponse hypothétique et chercher avec son plongement</td></tr><tr><td>step-back</td><td>poser d’abord une question plus générale</td></tr><tr><td>extraction de filtres</td><td>« contrats de 2025 » → filtre annee = 2025</td></tr></table>\n    <p>Chaque transformation ajoute un appel de modèle (latence, coût) : utiliser un petit modèle rapide, et mesurer le gain.</p>",
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
  "lit": "requete",
  "look": {},
  "scene": "requete",
  "fig": "",
  "panel": "<h2>La requête</h2><div class=\"psub\">en ligne, à chaque question</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Question</b><i></i></span><pre class=\"ex\">« Puis-je résilier avant 12 mois ? »</pre></li><li class=\"\"><span class=\"st\"><b>Transformation</b><i>réécriture, contexte</i></span><pre class=\"ex\">« résiliation anticipée contrat avant 12 mois préavis »</pre></li><li class=\"blue\"><span class=\"st\"><b>Récupération</b><i>hybride, filtres</i></span><pre class=\"ex\">top 30 candidats (tenant = acme)</pre></li><li class=\"blue\"><span class=\"st\"><b>Reranking</b><i></i></span><pre class=\"ex\">cross-encoder → top 5</pre></li><li class=\"red\"><span class=\"st\"><b>Génération</b><i>prompt + documents</i></span><pre class=\"ex\">« Réponds à partir des documents, cite [id]. »</pre></li><li class=\"\"><span class=\"st\"><b>Réponse</b><i>avec sources</i></span><pre class=\"ex\">« Oui, avec un préavis de 30 jours [cgv#12]. »</pre></li></ol><p class=\"note\">À chaque question, on récupère les passages pertinents et on les met dans le prompt. Le modèle répond en s’appuyant sur eux et cite ses sources. Latence typique : 0,2 à 1 s de récupération, puis la génération.</p><table class=\"data\"><tr><th>récupération</th><td>50–500 ms</td></tr><tr><th>documents dans le prompt</th><td>3 à 10 morceaux</td></tr><tr><th>sortie</th><td>réponse + citations</td></tr></table>"
 },
 {
  "kicker": "14.9",
  "title": "Les stratégies de récupération",
  "sub": "combien, comment, quoi",
  "body": "<p class=\"lede\">La <b>récupération</b> choisit les passages qui iront dans le prompt.</p>\n    <ul class=\"rules\"><li><b>top-k</b> : en récupérer largement (20 à 50) puis réduire par reranking à 3 à 10.</li><li><b>Seuil</b> : ne rien renvoyer en dessous d’un score calibré, et laisser le modèle dire « je ne sais pas ».</li><li><b>MMR</b> (Maximal Marginal Relevance) : diversifier pour éviter cinq morceaux qui disent la même chose.</li><li><b>Filtres</b> : droits, dates, langue, type.</li><li><b>Ordre dans le prompt</b> : les plus pertinents en premier (et parfois aussi en dernier).</li></ul>",
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
  "lit": "requete",
  "look": {},
  "scene": "requete",
  "fig": "",
  "panel": "<h2>Le prompt de génération</h2><div class=\"psub\">ancrer et citer</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Système</b><i></i></span><pre class=\"ex\">Réponds uniquement à partir des documents. Si l’information\nn’y est pas, réponds « Je ne trouve pas cette information ».</pre></li><li class=\"\"><span class=\"st\"><b>Documents</b><i></i></span><pre class=\"ex\">&lt;doc id=&quot;cgv#12&quot; titre=&quot;CGV &gt; Résiliation&quot;&gt;…&lt;/doc&gt;\n&lt;doc id=&quot;faq#4&quot;&gt;…&lt;/doc&gt;</pre></li><li class=\"\"><span class=\"st\"><b>Question</b><i></i></span><pre class=\"ex\">&lt;question&gt;{question}&lt;/question&gt;</pre></li><li class=\"red\"><span class=\"st\"><b>Format</b><i></i></span><pre class=\"ex\">Réponse courte, puis citations [id] après chaque affirmation.</pre></li><li class=\"\"><span class=\"st\"><b>Vérifier</b><i></i></span><pre class=\"ex\">chaque [id] cité existe dans les documents fournis</pre></li></ol><p class=\"note\"></p>"
 }
];
export const PLATES = {

};
