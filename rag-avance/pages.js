// Chapitre 15 : Le RAG avancé (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 15 · RAG",
  "title": "Le RAG avancé",
  "sub": "quand le RAG naïf ne suffit plus",
  "body": "<p class=\"lede\">Un RAG simple (découper, plonger, top-5, générer) fonctionne étonnamment bien en démonstration et déçoit souvent en production : passages manqués, questions comparatives, documents contradictoires, tableaux, questions qui portent sur l’ensemble du corpus.</p>\n    <p>Ce chapitre présente les techniques qui corrigent ces défauts. Règle d’or : n’en ajouter une que si l’<b>évaluation</b> montre qu’elle aide sur vos données ; chaque technique ajoute de la latence, du coût et de la complexité.</p>",
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
  "lit": "rerank",
  "look": {},
  "scene": "rerank",
  "fig": "",
  "panel": "<h2>Récupérer large, reclasser fin</h2><div class=\"psub\">deux étages</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Requête</b><i></i></span><pre class=\"ex\">« délai de préavis pour un CDD »</pre></li><li class=\"blue\"><span class=\"st\"><b>Bi-encodeur</b><i>plongements, rapide</i></span><pre class=\"ex\">top 50 en ~20 ms\n(vecteurs précalculés)</pre></li><li class=\"\"><span class=\"st\"><b>BM25</b><i>mots exacts</i></span><pre class=\"ex\">top 50 en ~5 ms</pre></li><li class=\"\"><span class=\"st\"><b>Fusion</b><i>RRF</i></span><pre class=\"ex\">≈ 70 candidats uniques</pre></li><li class=\"red\"><span class=\"st\"><b>Cross-encodeur</b><i>lit question + passage ensemble</i></span><pre class=\"ex\">score fin pour chaque paire\n~100–300 ms pour 50</pre></li><li class=\"blue\"><span class=\"st\"><b>Top 5</b><i>dans le prompt</i></span><pre class=\"ex\">précision bien meilleure</pre></li></ol><p class=\"note\">Un bi-encodeur compare des vecteurs calculés séparément : rapide mais grossier. Un cross-encodeur lit la question et le passage ensemble : précis mais trop lent pour toute la collection. On combine les deux : récupérer large, puis reclasser les meilleurs candidats.</p><table class=\"data\"><tr><th>rerankers</th><td>Cohere Rerank, BGE-reranker, Voyage, Jina</td></tr><tr><th>gain typique</th><td>plusieurs points de précision</td></tr><tr><th>coût</th><td>+100 à 300 ms</td></tr></table>"
 },
 {
  "kicker": "15.1",
  "title": "Le reranking",
  "sub": "reclasser les candidats",
  "body": "<p class=\"lede\">Le <b>reranking</b> reprend les 20 à 100 candidats de la première recherche et les reclasse avec un modèle plus précis, le plus souvent un <b>cross-encodeur</b>.</p>\n    <pre class=\"code\">from sentence_transformers import CrossEncoder\nrr = CrossEncoder(&#x27;BAAI/bge-reranker-v2-m3&#x27;)\nscores = rr.predict([(question, c.texte) for c in candidats])\ntop = [c for _, c in sorted(zip(scores, candidats), key=lambda x: -x[0])][:5]</pre>\n    <ul class=\"rules\"><li>Services : Cohere Rerank, Voyage, Jina ; modèles ouverts BGE-reranker, mxbai-rerank.</li><li>Un modèle de langage peut aussi reclasser (listwise), plus cher.</li><li>C’est souvent l’amélioration au meilleur rapport effort/gain d’un RAG existant.</li></ul>",
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
  "lit": "rerank",
  "look": {},
  "scene": "rerank",
  "fig": "",
  "panel": "<h2>Récupérer large, reclasser fin</h2><div class=\"psub\">deux étages</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Requête</b><i></i></span><pre class=\"ex\">« délai de préavis pour un CDD »</pre></li><li class=\"blue\"><span class=\"st\"><b>Bi-encodeur</b><i>plongements, rapide</i></span><pre class=\"ex\">top 50 en ~20 ms\n(vecteurs précalculés)</pre></li><li class=\"\"><span class=\"st\"><b>BM25</b><i>mots exacts</i></span><pre class=\"ex\">top 50 en ~5 ms</pre></li><li class=\"\"><span class=\"st\"><b>Fusion</b><i>RRF</i></span><pre class=\"ex\">≈ 70 candidats uniques</pre></li><li class=\"red\"><span class=\"st\"><b>Cross-encodeur</b><i>lit question + passage ensemble</i></span><pre class=\"ex\">score fin pour chaque paire\n~100–300 ms pour 50</pre></li><li class=\"blue\"><span class=\"st\"><b>Top 5</b><i>dans le prompt</i></span><pre class=\"ex\">précision bien meilleure</pre></li></ol><p class=\"note\">Un bi-encodeur compare des vecteurs calculés séparément : rapide mais grossier. Un cross-encodeur lit la question et le passage ensemble : précis mais trop lent pour toute la collection. On combine les deux : récupérer large, puis reclasser les meilleurs candidats.</p><table class=\"data\"><tr><th>rerankers</th><td>Cohere Rerank, BGE-reranker, Voyage, Jina</td></tr><tr><th>gain typique</th><td>plusieurs points de précision</td></tr><tr><th>coût</th><td>+100 à 300 ms</td></tr></table>"
 },
 {
  "kicker": "15.2",
  "title": "La récupération hybride",
  "sub": "lexical + sémantique",
  "body": "<p class=\"lede\">La <b>récupération hybride</b> (chapitre 13) combine BM25 et plongements, puis fusionne (RRF) avant le reranking.</p>\n    <ul class=\"rules\"><li>Indispensable dès que les questions contiennent des noms propres, références, codes d’erreur, numéros d’articles de loi.</li><li>Les deux index doivent contenir exactement les mêmes morceaux, avec les mêmes identifiants.</li><li>Mesurer séparément le rappel de chaque branche : si l’une n’apporte rien sur votre jeu d’évaluation, la retirer.</li></ul>",
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
  "lit": "rerank",
  "look": {},
  "scene": "rerank",
  "fig": "",
  "panel": "<h2>Une chaîne de récupération complète</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Transformer</b><i></i></span><pre class=\"ex\">q2 = reecrire(question, historique)</pre></li><li class=\"blue\"><span class=\"st\"><b>Chercher</b><i>en parallèle</i></span><pre class=\"ex\">lex, sem = await gather(bm25(q2, 50), dense(q2, 50, filtre))</pre></li><li class=\"\"><span class=\"st\"><b>Fusionner</b><i></i></span><pre class=\"ex\">cands = rrf(lex, sem)[:40]</pre></li><li class=\"red\"><span class=\"st\"><b>Reclasser</b><i></i></span><pre class=\"ex\">top = rerank(q2, cands)[:6]</pre></li><li class=\"\"><span class=\"st\"><b>Seuil</b><i></i></span><pre class=\"ex\">top = [d for d in top if d.score &gt; SEUIL]  # sinon « je ne sais pas »</pre></li><li class=\"\"><span class=\"st\"><b>Assembler</b><i></i></span><pre class=\"ex\">prompt = gabarit(question, top)</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "15.3",
  "title": "La récupération contextuelle",
  "sub": "redonner son contexte à chaque morceau",
  "body": "<p class=\"lede\">Un morceau isolé perd souvent l’information qui permettrait de le trouver : « Le chiffre d’affaires a augmenté de 3 % » ne dit ni quelle entreprise, ni quel trimestre.</p>\n    <p>La <b>récupération contextuelle</b> (Anthropic, 2024) fait écrire par un modèle, pour chaque morceau, une ou deux phrases qui le situent dans le document, et les ajoute avant de plonger et d’indexer (dense et BM25).</p>\n    <pre class=\"code\">&lt;document&gt;{document_entier}&lt;/document&gt;\nVoici un morceau de ce document : &lt;chunk&gt;{morceau}&lt;/chunk&gt;\nÉcris une courte phrase qui situe ce morceau dans le document,\npour améliorer sa recherche. Réponds uniquement par cette phrase.</pre>\n    <p>Avec le <b>cache de prompt</b>, le document entier n’est facturé qu’une fois pour tous ses morceaux. Gain publié : environ un tiers d’échecs de récupération en moins, près de la moitié avec le reranking.</p>",
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
  "lit": "rerank",
  "look": {},
  "scene": "rerank",
  "fig": "",
  "panel": "<h2>Récupérer large, reclasser fin</h2><div class=\"psub\">deux étages</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Requête</b><i></i></span><pre class=\"ex\">« délai de préavis pour un CDD »</pre></li><li class=\"blue\"><span class=\"st\"><b>Bi-encodeur</b><i>plongements, rapide</i></span><pre class=\"ex\">top 50 en ~20 ms\n(vecteurs précalculés)</pre></li><li class=\"\"><span class=\"st\"><b>BM25</b><i>mots exacts</i></span><pre class=\"ex\">top 50 en ~5 ms</pre></li><li class=\"\"><span class=\"st\"><b>Fusion</b><i>RRF</i></span><pre class=\"ex\">≈ 70 candidats uniques</pre></li><li class=\"red\"><span class=\"st\"><b>Cross-encodeur</b><i>lit question + passage ensemble</i></span><pre class=\"ex\">score fin pour chaque paire\n~100–300 ms pour 50</pre></li><li class=\"blue\"><span class=\"st\"><b>Top 5</b><i>dans le prompt</i></span><pre class=\"ex\">précision bien meilleure</pre></li></ol><p class=\"note\">Un bi-encodeur compare des vecteurs calculés séparément : rapide mais grossier. Un cross-encodeur lit la question et le passage ensemble : précis mais trop lent pour toute la collection. On combine les deux : récupérer large, puis reclasser les meilleurs candidats.</p><table class=\"data\"><tr><th>rerankers</th><td>Cohere Rerank, BGE-reranker, Voyage, Jina</td></tr><tr><th>gain typique</th><td>plusieurs points de précision</td></tr><tr><th>coût</th><td>+100 à 300 ms</td></tr></table>"
 },
 {
  "kicker": "15.4",
  "title": "La récupération parent-enfant",
  "sub": "chercher petit, donner grand",
  "body": "<p class=\"lede\">Petits morceaux = recherche précise ; grands morceaux = contexte suffisant pour répondre. La <b>récupération parent-enfant</b> obtient les deux.</p>\n    <ul class=\"rules\"><li>On indexe de <b>petits</b> morceaux (enfants, 100 à 300 jetons).</li><li>Chacun garde l’identifiant de son <b>parent</b> (section ou page, 1 000 à 2 000 jetons).</li><li>On cherche parmi les enfants, puis on donne au modèle les <b>parents</b> correspondants (dédupliqués).</li><li>Variante : la <b>fenêtre de phrases</b> : indexer des phrases, renvoyer la phrase avec ses voisines.</li></ul>",
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
  "lit": "rerank",
  "look": {},
  "scene": "rerank",
  "fig": "",
  "panel": "<h2>Parent-enfant à la main</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Parents</b><i>sections</i></span><pre class=\"ex\">parents = decouper(doc, taille=1500)</pre></li><li class=\"blue\"><span class=\"st\"><b>Enfants</b><i></i></span><pre class=\"ex\">for p in parents:\n  for e in decouper(p.texte, taille=200):\n    index.upsert(e, meta={&#x27;parent_id&#x27;: p.id})</pre></li><li class=\"\"><span class=\"st\"><b>Chercher</b><i></i></span><pre class=\"ex\">enfants = index.search(q, k=20)</pre></li><li class=\"red\"><span class=\"st\"><b>Remonter</b><i></i></span><pre class=\"ex\">ids = list(dict.fromkeys(e.meta[&#x27;parent_id&#x27;] for e in enfants))[:4]</pre></li><li class=\"\"><span class=\"st\"><b>Donner</b><i></i></span><pre class=\"ex\">contexte = [magasin[i] for i in ids]</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "15.5",
  "title": "La récupération à requêtes multiples",
  "sub": "plusieurs façons de demander",
  "body": "<p class=\"lede\">Une seule formulation peut rater des documents pertinents. Le <b>multi-query</b> fait générer 3 à 5 reformulations de la question, lance une recherche pour chacune et fusionne les résultats.</p>\n    <ul class=\"rules\"><li>Bon pour les questions vagues ou riches en synonymes.</li><li>La <b>décomposition</b> est une variante : « Compare les offres A et B » → une recherche pour A, une pour B.</li><li>RAG-Fusion : multi-query + fusion RRF.</li><li>Coût : un appel de modèle et N recherches de plus ; paralléliser les recherches.</li></ul>",
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
  "lit": "rerank",
  "look": {},
  "scene": "rerank",
  "fig": "",
  "panel": "<h2>Récupérer large, reclasser fin</h2><div class=\"psub\">deux étages</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Requête</b><i></i></span><pre class=\"ex\">« délai de préavis pour un CDD »</pre></li><li class=\"blue\"><span class=\"st\"><b>Bi-encodeur</b><i>plongements, rapide</i></span><pre class=\"ex\">top 50 en ~20 ms\n(vecteurs précalculés)</pre></li><li class=\"\"><span class=\"st\"><b>BM25</b><i>mots exacts</i></span><pre class=\"ex\">top 50 en ~5 ms</pre></li><li class=\"\"><span class=\"st\"><b>Fusion</b><i>RRF</i></span><pre class=\"ex\">≈ 70 candidats uniques</pre></li><li class=\"red\"><span class=\"st\"><b>Cross-encodeur</b><i>lit question + passage ensemble</i></span><pre class=\"ex\">score fin pour chaque paire\n~100–300 ms pour 50</pre></li><li class=\"blue\"><span class=\"st\"><b>Top 5</b><i>dans le prompt</i></span><pre class=\"ex\">précision bien meilleure</pre></li></ol><p class=\"note\">Un bi-encodeur compare des vecteurs calculés séparément : rapide mais grossier. Un cross-encodeur lit la question et le passage ensemble : précis mais trop lent pour toute la collection. On combine les deux : récupérer large, puis reclasser les meilleurs candidats.</p><table class=\"data\"><tr><th>rerankers</th><td>Cohere Rerank, BGE-reranker, Voyage, Jina</td></tr><tr><th>gain typique</th><td>plusieurs points de précision</td></tr><tr><th>coût</th><td>+100 à 300 ms</td></tr></table>"
 },
 {
  "kicker": "15.6",
  "title": "Le Graph RAG",
  "sub": "quand les relations comptent",
  "body": "<p class=\"lede\">Le <b>Graph RAG</b> construit un <b>graphe de connaissances</b> (entités, relations) à partir des documents, et s’en sert pour récupérer.</p>\n    <ul class=\"rules\"><li><b>Questions multi-sauts</b> : « quel préavis entre Acme et Durand ? » demande de relier contrat, clause et partenaires.</li><li><b>Questions globales</b> : « quels sont les grands thèmes de ces 5 000 rapports ? ». Microsoft GraphRAG regroupe le graphe en communautés et résume chacune.</li><li>Outils : Microsoft GraphRAG, LightRAG, Neo4j (+ GraphRAG Python), LlamaIndex PropertyGraph.</li></ul>\n    <p>Coût : l’extraction par modèle de langage sur tout le corpus est chère et imparfaite (entités en double, relations manquées). À réserver aux corpus où les relations sont centrales (juridique, renseignement, recherche, conformité), après avoir mesuré le gain.</p>",
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
  "lit": "graphe",
  "look": {},
  "scene": "graphe",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "15.7",
  "title": "Le RAG agentique",
  "sub": "laisser le modèle chercher",
  "body": "<p class=\"lede\">Dans le <b>RAG agentique</b>, la recherche devient un <b>outil</b> que le modèle appelle quand il le juge utile, autant de fois que nécessaire, avec ses propres requêtes.</p>\n    <ul class=\"rules\"><li>Le modèle décompose, cherche, lit, constate ce qui manque, cherche à nouveau, puis répond.</li><li>Il peut choisir parmi plusieurs sources : base documentaire, SQL, recherche web, API internes.</li><li>Il gère les questions multi-étapes et comparatives bien mieux qu’un pipeline fixe.</li><li>Contreparties : plus de latence, plus de coût, comportement moins prévisible ; borner le nombre d’étapes.</li></ul>\n    <p>C’est le mode de fonctionnement des assistants de recherche approfondie et des agents de code (qui cherchent dans le dépôt avec grep plutôt qu’avec des vecteurs). Voir le chapitre 16.</p>",
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
  "lit": "rerank",
  "look": {},
  "scene": "rerank",
  "fig": "",
  "panel": "<h2>La recherche comme outil</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Outil</b><i></i></span><pre class=\"ex\">{&#x27;name&#x27;: &#x27;rechercher_docs&#x27;,\n &#x27;description&#x27;: &#x27;Cherche dans la documentation interne. Utilise des\n  mots-clés précis ; appelle plusieurs fois si besoin.&#x27;,\n &#x27;input_schema&#x27;: {... &#x27;requete&#x27;: str, &#x27;annee&#x27;: int | None}}</pre></li><li class=\"\"><span class=\"st\"><b>Boucle</b><i></i></span><pre class=\"ex\">jusqu’à 6 recherches, puis réponse obligatoire</pre></li><li class=\"\"><span class=\"st\"><b>Résultats</b><i>compacts</i></span><pre class=\"ex\">id, titre, extrait de 300 caractères ; lire_doc(id) pour le reste</pre></li><li class=\"red\"><span class=\"st\"><b>Réponse</b><i></i></span><pre class=\"ex\">citations obligatoires des id lus</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "15.8",
  "title": "L’évaluation d’un RAG",
  "sub": "mesurer chaque étage",
  "body": "<p class=\"lede\">On évalue séparément la <b>récupération</b> et la <b>génération</b>, sur un jeu de questions réalistes avec, si possible, les passages attendus et une réponse de référence.</p>\n    <table class=\"data\"><tr><th>étage</th><th>métrique</th><th>question posée</th></tr><tr><td>récupération</td><td>rappel@k, MRR, nDCG</td><td>le bon passage est-il dans les k premiers ?</td></tr><tr><td>récupération</td><td>précision du contexte</td><td>les passages fournis sont-ils pertinents ?</td></tr><tr><td>génération</td><td>fidélité (faithfulness)</td><td>chaque affirmation est-elle appuyée par le contexte ?</td></tr><tr><td>génération</td><td>pertinence de la réponse</td><td>répond-elle à la question ?</td></tr><tr><td>bout en bout</td><td>exactitude</td><td>la réponse est-elle juste par rapport à la référence ?</td></tr><tr><td>citations</td><td>exactitude des citations</td><td>la source citée contient-elle l’affirmation ?</td></tr></table>\n    <p>Outils : <b>Ragas</b>, DeepEval, TruLens, Phoenix. Inclure des questions sans réponse dans le corpus : le système doit savoir dire « je ne sais pas ». Détails au chapitre 21.</p>",
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
  "lit": "rerank",
  "look": {},
  "scene": "rerank",
  "fig": "",
  "panel": "<h2>Mesurer le rappel de la récupération</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Jeu</b><i></i></span><pre class=\"ex\">evals = [{&#x27;q&#x27;: &#x27;préavis CDD ?&#x27;, &#x27;attendus&#x27;: {&#x27;cgv#12&#x27;}}, ...]  # 100 à 300</pre></li><li class=\"blue\"><span class=\"st\"><b>Chercher</b><i></i></span><pre class=\"ex\">trouves = [ids(recuperer(e[&#x27;q&#x27;], k=10)) for e in evals]</pre></li><li class=\"\"><span class=\"st\"><b>Rappel@10</b><i></i></span><pre class=\"ex\">np.mean([len(e[&#x27;attendus&#x27;] &amp; set(t)) / len(e[&#x27;attendus&#x27;])\n         for e, t in zip(evals, trouves)])</pre></li><li class=\"\"><span class=\"st\"><b>MRR</b><i></i></span><pre class=\"ex\">np.mean([1 / (t.index(next(iter(e[&#x27;attendus&#x27;]))) + 1) if ... else 0])</pre></li><li class=\"red\"><span class=\"st\"><b>Comparer</b><i>chaque changement</i></span><pre class=\"ex\">taille de morceau, modèle, hybride, reranker</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "15.9",
  "title": "Optimiser un RAG",
  "sub": "méthode et ordre des chantiers",
  "body": "<p class=\"lede\">Optimiser un RAG est un travail itératif guidé par les erreurs observées.</p>\n    <ul class=\"rules\"><li>1. Constituer un jeu d’évaluation à partir de vraies questions et classer les échecs (non trouvé, mal classé, mal lu, hors corpus).</li><li>2. Corriger d’abord les <b>données</b> : analyse des PDF, nettoyage, découpage, métadonnées.</li><li>3. Puis la <b>recherche</b> : hybride, reranking, récupération contextuelle, filtres, transformation des requêtes.</li><li>4. Puis la <b>génération</b> : prompt, nombre et ordre des passages, modèle, citations obligatoires.</li><li>5. Enfin la <b>performance</b> : cache sémantique des réponses, plus petits modèles, quantification des vecteurs, latence p95.</li></ul>\n    <p>Garder les traces de production (question, passages, réponse, retour utilisateur) : elles alimentent le jeu d’évaluation et révèlent les nouveaux types de questions.</p>",
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
  "lit": "rerank",
  "look": {},
  "scene": "rerank",
  "fig": "",
  "panel": "<h2>Récupérer large, reclasser fin</h2><div class=\"psub\">deux étages</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Requête</b><i></i></span><pre class=\"ex\">« délai de préavis pour un CDD »</pre></li><li class=\"blue\"><span class=\"st\"><b>Bi-encodeur</b><i>plongements, rapide</i></span><pre class=\"ex\">top 50 en ~20 ms\n(vecteurs précalculés)</pre></li><li class=\"\"><span class=\"st\"><b>BM25</b><i>mots exacts</i></span><pre class=\"ex\">top 50 en ~5 ms</pre></li><li class=\"\"><span class=\"st\"><b>Fusion</b><i>RRF</i></span><pre class=\"ex\">≈ 70 candidats uniques</pre></li><li class=\"red\"><span class=\"st\"><b>Cross-encodeur</b><i>lit question + passage ensemble</i></span><pre class=\"ex\">score fin pour chaque paire\n~100–300 ms pour 50</pre></li><li class=\"blue\"><span class=\"st\"><b>Top 5</b><i>dans le prompt</i></span><pre class=\"ex\">précision bien meilleure</pre></li></ol><p class=\"note\">Un bi-encodeur compare des vecteurs calculés séparément : rapide mais grossier. Un cross-encodeur lit la question et le passage ensemble : précis mais trop lent pour toute la collection. On combine les deux : récupérer large, puis reclasser les meilleurs candidats.</p><table class=\"data\"><tr><th>rerankers</th><td>Cohere Rerank, BGE-reranker, Voyage, Jina</td></tr><tr><th>gain typique</th><td>plusieurs points de précision</td></tr><tr><th>coût</th><td>+100 à 300 ms</td></tr></table>"
 }
];
export const PLATES = {
  graphe: { text: "Le Graph RAG extrait des entités et des relations des documents et les range dans un graphe. Une question qui relie plusieurs documents (« quels fournisseurs ont un contrat avec une clause X ? ») se résout en parcourant le graphe, là où une recherche par similarité ne renvoie que des passages isolés.", facts: () => [["extraction", "par un modèle de langage"], ["stockage", "Neo4j, graphe en mémoire"], ["atout", "questions multi-sauts, synthèses globales"]] }
};
