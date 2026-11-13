// Chapitre 21 : Évaluer et tester les systèmes d’IA (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 21 · Évaluation",
  "title": "Évaluer et tester les systèmes d’IA",
  "sub": "la compétence qui distingue",
  "body": "<p class=\"lede\">Un système d’IA ne se teste pas comme un programme classique : la même entrée peut donner des sorties différentes, et « juste » est souvent une question de degré. Pourtant, sans mesure, impossible de savoir si un changement de prompt, de modèle ou de découpage améliore ou dégrade le système.</p>\n    <p>Les équipes qui réussissent ont un point commun : un <b>jeu d’évaluation</b> solide, exécuté automatiquement à chaque changement, et une <b>observation</b> continue de la production. C’est souvent ce qui distingue un prototype impressionnant d’un produit fiable.</p>",
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
  "lit": "evalcycle",
  "look": {},
  "scene": "evalcycle",
  "fig": "",
  "panel": "<h2>La boucle d’évaluation</h2><div class=\"psub\">du développement à la production et retour</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Cas réels</b><i>traces, retours</i></span><pre class=\"ex\">traces de production, pouces bas, tickets</pre></li><li class=\"\"><span class=\"st\"><b>Jeu d’évaluation</b><i>annoté, versionné</i></span><pre class=\"ex\">evals/v12.jsonl : 400 cas</pre></li><li class=\"\"><span class=\"st\"><b>Changement</b><i>prompt, modèle, code</i></span><pre class=\"ex\">prompt v9, nouveau reranker</pre></li><li class=\"red\"><span class=\"st\"><b>Évaluation hors ligne</b><i>CI</i></span><pre class=\"ex\">pytest evals/ → 91,2 % (v8 : 88,5 %)</pre></li><li class=\"\"><span class=\"st\"><b>Déploiement progressif</b><i></i></span><pre class=\"ex\">10 % du trafic, comparaison A/B</pre></li><li class=\"red\"><span class=\"st\"><b>Surveillance en ligne</b><i></i></span><pre class=\"ex\">juge en ligne sur 5 %, dérive, coûts</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · évaluation</div><p class=\"note\">L’évaluation n’est pas une étape finale mais une boucle : les échecs observés en production deviennent de nouveaux cas de test, chaque changement est mesuré avant d’être déployé, et la production est surveillée en continu.</p><table class=\"data\"><tr><th>hors ligne</th><td>avant de déployer</td></tr><tr><th>en ligne</th><td>sur le trafic réel</td></tr><tr><th>source des cas</th><td>la production</td></tr></table>"
 },
 {
  "kicker": "21.1",
  "title": "Pourquoi l’évaluation compte",
  "sub": "les « vibes » ne passent pas à l’échelle",
  "body": "<p class=\"lede\">Juger un système sur quelques essais à la main (« ça a l’air bien ») mène à des régressions invisibles et à des débats sans fin.</p>\n    <ul class=\"rules\"><li>Les modèles sont <b>non déterministes</b> et sensibles aux formulations.</li><li>Corriger un cas en casse souvent d’autres.</li><li>Les fournisseurs mettent à jour et retirent leurs modèles : il faut pouvoir requalifier vite.</li><li>Les décisions (quel modèle, quel coût, quand déployer) demandent des chiffres.</li><li>La conformité (AI Act européen, chapitre 27) exige de documenter les performances et les risques.</li></ul>\n    <p>Commencer petit : 30 à 50 cas réels bien choisis valent mieux qu’aucune évaluation, et mieux que 10 000 cas synthétiques jamais relus.</p>",
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
  "lit": "evalcycle",
  "look": {},
  "scene": "evalcycle",
  "fig": "",
  "panel": "<h2>La boucle d’évaluation</h2><div class=\"psub\">du développement à la production et retour</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Cas réels</b><i>traces, retours</i></span><pre class=\"ex\">traces de production, pouces bas, tickets</pre></li><li class=\"\"><span class=\"st\"><b>Jeu d’évaluation</b><i>annoté, versionné</i></span><pre class=\"ex\">evals/v12.jsonl : 400 cas</pre></li><li class=\"\"><span class=\"st\"><b>Changement</b><i>prompt, modèle, code</i></span><pre class=\"ex\">prompt v9, nouveau reranker</pre></li><li class=\"red\"><span class=\"st\"><b>Évaluation hors ligne</b><i>CI</i></span><pre class=\"ex\">pytest evals/ → 91,2 % (v8 : 88,5 %)</pre></li><li class=\"\"><span class=\"st\"><b>Déploiement progressif</b><i></i></span><pre class=\"ex\">10 % du trafic, comparaison A/B</pre></li><li class=\"red\"><span class=\"st\"><b>Surveillance en ligne</b><i></i></span><pre class=\"ex\">juge en ligne sur 5 %, dérive, coûts</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · évaluation</div><p class=\"note\">L’évaluation n’est pas une étape finale mais une boucle : les échecs observés en production deviennent de nouveaux cas de test, chaque changement est mesuré avant d’être déployé, et la production est surveillée en continu.</p><table class=\"data\"><tr><th>hors ligne</th><td>avant de déployer</td></tr><tr><th>en ligne</th><td>sur le trafic réel</td></tr><tr><th>source des cas</th><td>la production</td></tr></table>"
 },
 {
  "kicker": "21.2",
  "title": "Tests unitaires et d’intégration",
  "sub": "le code autour du modèle",
  "body": "<p class=\"lede\">Tout ce qui n’est pas le modèle se teste comme du logiciel classique, de façon déterministe.</p>\n    <ul class=\"rules\"><li><b>Unitaires</b> : découpage des documents, gabarits de prompt, analyse des sorties, validation des schémas, outils des agents.</li><li><b>Intégration</b> avec un modèle <b>simulé</b> (réponses enregistrées, faux client) : le pipeline enchaîne-t-il correctement les étapes ?</li><li><b>Tests de contrat</b> : la sortie respecte-t-elle le schéma JSON attendu ?</li><li><b>Tests de bout en bout</b> avec le vrai modèle, sur quelques cas critiques, avec des assertions tolérantes.</li><li>Séparer les tests rapides (à chaque commit) des évaluations coûteuses (à chaque fusion ou chaque nuit).</li></ul>",
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
  "lit": "evalcycle",
  "look": {},
  "scene": "evalcycle",
  "fig": "",
  "panel": "<h2>Tester sans appeler le modèle</h2><div class=\"psub\">pytest</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Faux modèle</b><i></i></span><pre class=\"ex\">class FauxLLM:\n    def __init__(self, reponses): self.r = iter(reponses)\n    async def complete(self, msgs, **kw): return next(self.r)</pre></li><li class=\"blue\"><span class=\"st\"><b>Test</b><i></i></span><pre class=\"ex\">async def test_agent_appelle_outil():\n    llm = FauxLLM([appel_outil(&#x27;statut_commande&#x27;, {&#x27;numero&#x27;: &#x27;C-12&#x27;}), fin(&#x27;Livrée&#x27;)])\n    r = await agent(&#x27;Où est C-12 ?&#x27;, llm=llm, outils=OUTILS)\n    assert r == &#x27;Livrée&#x27;</pre></li><li class=\"\"><span class=\"st\"><b>Analyse</b><i></i></span><pre class=\"ex\">def test_parse_json_tronque():\n    with pytest.raises(SortieInvalide): parse(&#x27;{&quot;a&quot;: 1&#x27;)</pre></li><li class=\"red\"><span class=\"st\"><b>Enregistrer</b><i>vraies réponses</i></span><pre class=\"ex\">pytest-recording / vcrpy : rejouer les appels HTTP</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "21.3",
  "title": "Le modèle juge",
  "sub": "un LLM pour noter un LLM",
  "body": "<p class=\"lede\">Le <b>LLM-as-a-judge</b> fait évaluer une réponse par un modèle (souvent plus puissant) à l’aide d’une grille. Indispensable quand la qualité ne se vérifie pas par programme.</p>\n    <ul class=\"rules\"><li>Grille <b>précise</b> et <b>binaire</b> si possible (« cite-t-il une source ? oui/non ») plutôt qu’une note de 1 à 10.</li><li>Un critère par appel ; demander la justification <b>avant</b> le verdict.</li><li>Fournir la référence ou le contexte quand ils existent.</li><li><b>Calibrer</b> : comparer le juge à des notes humaines sur 50 à 100 cas, mesurer l’accord, ajuster la grille.</li><li>Biais connus : préférence pour les réponses longues, pour la première position (comparaisons par paires : alterner l’ordre), pour son propre style.</li></ul>",
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
  "lit": "evalcycle",
  "look": {},
  "scene": "evalcycle",
  "fig": "",
  "panel": "<h2>Un juge de fidélité</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Prompt</b><i></i></span><pre class=\"ex\">Voici des DOCUMENTS et une RÉPONSE. Liste chaque affirmation de\nla réponse et indique si elle est appuyée par les documents.\nPuis réponds FIDELE si toutes le sont, sinon INFIDELE.</pre></li><li class=\"blue\"><span class=\"st\"><b>Sortie</b><i>structurée</i></span><pre class=\"ex\">class Verdict(BaseModel):\n    affirmations: list[Affirmation]\n    verdict: Literal[&#x27;FIDELE&#x27;, &#x27;INFIDELE&#x27;]</pre></li><li class=\"\"><span class=\"st\"><b>Calibrer</b><i></i></span><pre class=\"ex\">accord avec 2 annotateurs sur 80 cas : 92 % (κ = 0,81)</pre></li><li class=\"red\"><span class=\"st\"><b>Coût</b><i></i></span><pre class=\"ex\">juge = modèle moyen ; échantillon en production</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "21.4",
  "title": "Les jeux de référence",
  "sub": "les cas qui comptent",
  "body": "<p class=\"lede\">Un <b>jeu de référence</b> (golden dataset) rassemble des entrées avec leur sortie attendue (ou les critères de réussite), validées par des experts.</p>\n    <ul class=\"rules\"><li>Partir des <b>vraies demandes</b> des utilisateurs (anonymisées), pas d’exemples imaginés.</li><li>Couvrir les cas fréquents, les cas difficiles, les cas limites, les attaques, les questions hors périmètre.</li><li>Pour chaque cas : entrée, attendu (réponse, documents, appels d’outils), étiquettes (catégorie, difficulté).</li><li><b>Versionner</b> le jeu ; ne jamais l’utiliser pour l’entraînement ni pour choisir les exemples few-shot.</li><li>L’enrichir en continu à partir des échecs observés en production.</li></ul>",
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
  "lit": "evalcycle",
  "look": {},
  "scene": "evalcycle",
  "fig": "",
  "panel": "<h2>La boucle d’évaluation</h2><div class=\"psub\">du développement à la production et retour</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Cas réels</b><i>traces, retours</i></span><pre class=\"ex\">traces de production, pouces bas, tickets</pre></li><li class=\"\"><span class=\"st\"><b>Jeu d’évaluation</b><i>annoté, versionné</i></span><pre class=\"ex\">evals/v12.jsonl : 400 cas</pre></li><li class=\"\"><span class=\"st\"><b>Changement</b><i>prompt, modèle, code</i></span><pre class=\"ex\">prompt v9, nouveau reranker</pre></li><li class=\"red\"><span class=\"st\"><b>Évaluation hors ligne</b><i>CI</i></span><pre class=\"ex\">pytest evals/ → 91,2 % (v8 : 88,5 %)</pre></li><li class=\"\"><span class=\"st\"><b>Déploiement progressif</b><i></i></span><pre class=\"ex\">10 % du trafic, comparaison A/B</pre></li><li class=\"red\"><span class=\"st\"><b>Surveillance en ligne</b><i></i></span><pre class=\"ex\">juge en ligne sur 5 %, dérive, coûts</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · évaluation</div><p class=\"note\">L’évaluation n’est pas une étape finale mais une boucle : les échecs observés en production deviennent de nouveaux cas de test, chaque changement est mesuré avant d’être déployé, et la production est surveillée en continu.</p><table class=\"data\"><tr><th>hors ligne</th><td>avant de déployer</td></tr><tr><th>en ligne</th><td>sur le trafic réel</td></tr><tr><th>source des cas</th><td>la production</td></tr></table>"
 },
 {
  "kicker": "21.5",
  "title": "Les jeux d’évaluation",
  "sub": "construire et organiser",
  "body": "<p class=\"lede\">Au-delà du jeu de référence, on organise plusieurs jeux selon l’usage.</p>\n    <table class=\"data\"><tr><th>jeu</th><th>taille</th><th>usage</th></tr><tr><td>fumée (smoke)</td><td>10 à 30 cas</td><td>à chaque commit, en quelques minutes</td></tr><tr><td>référence</td><td>100 à 1 000 cas</td><td>avant chaque déploiement</td></tr><tr><td>régression</td><td>cas déjà corrigés</td><td>ne pas réintroduire un bogue</td></tr><tr><td>adversarial</td><td>attaques, pièges</td><td>sécurité, robustesse</td></tr><tr><td>par segment</td><td>langue, client, catégorie</td><td>voir où le système échoue</td></tr></table>\n    <ul class=\"rules\"><li>Sources complémentaires : données synthétiques relues, bancs d’essai publics (pour le choix initial d’un modèle seulement).</li><li>Mesurer la <b>taille nécessaire</b> : sur 100 cas, l’intervalle de confiance d’un taux de 80 % fait environ ± 8 points.</li></ul>",
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
  "lit": "evalcycle",
  "look": {},
  "scene": "evalcycle",
  "fig": "",
  "panel": "<h2>La boucle d’évaluation</h2><div class=\"psub\">du développement à la production et retour</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Cas réels</b><i>traces, retours</i></span><pre class=\"ex\">traces de production, pouces bas, tickets</pre></li><li class=\"\"><span class=\"st\"><b>Jeu d’évaluation</b><i>annoté, versionné</i></span><pre class=\"ex\">evals/v12.jsonl : 400 cas</pre></li><li class=\"\"><span class=\"st\"><b>Changement</b><i>prompt, modèle, code</i></span><pre class=\"ex\">prompt v9, nouveau reranker</pre></li><li class=\"red\"><span class=\"st\"><b>Évaluation hors ligne</b><i>CI</i></span><pre class=\"ex\">pytest evals/ → 91,2 % (v8 : 88,5 %)</pre></li><li class=\"\"><span class=\"st\"><b>Déploiement progressif</b><i></i></span><pre class=\"ex\">10 % du trafic, comparaison A/B</pre></li><li class=\"red\"><span class=\"st\"><b>Surveillance en ligne</b><i></i></span><pre class=\"ex\">juge en ligne sur 5 %, dérive, coûts</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · évaluation</div><p class=\"note\">L’évaluation n’est pas une étape finale mais une boucle : les échecs observés en production deviennent de nouveaux cas de test, chaque changement est mesuré avant d’être déployé, et la production est surveillée en continu.</p><table class=\"data\"><tr><th>hors ligne</th><td>avant de déployer</td></tr><tr><th>en ligne</th><td>sur le trafic réel</td></tr><tr><th>source des cas</th><td>la production</td></tr></table>"
 },
 {
  "kicker": "21.6",
  "title": "La justesse d’un modèle",
  "sub": "choisir la bonne métrique",
  "body": "<p class=\"lede\">« Exactitude » recouvre des mesures différentes selon la tâche.</p>\n    <table class=\"data\"><tr><th>tâche</th><th>métriques</th></tr><tr><td>classification</td><td>exactitude, précision, rappel, F1, matrice de confusion</td></tr><tr><td>extraction</td><td>exactitude par champ, correspondance exacte, F1 sur les entités</td></tr><tr><td>questions-réponses</td><td>correspondance exacte, F1 sur les mots, juge</td></tr><tr><td>génération libre</td><td>juge avec grille, préférences par paires</td></tr><tr><td>code</td><td>pass@k : les tests passent-ils ?</td></tr><tr><td>récupération</td><td>rappel@k, MRR, nDCG</td></tr></table>\n    <p>Avec des classes déséquilibrées, l’exactitude trompe : 95 % d’exactitude est un mauvais score si 95 % des tickets ne sont pas urgents et que le détecteur ne trouve aucun urgent.</p>",
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
  "lit": "prec",
  "look": {},
  "scene": "prec",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "21.7",
  "title": "Fidélité et ancrage",
  "sub": "la réponse s’appuie-t-elle sur les sources ?",
  "body": "<p class=\"lede\">La <b>fidélité</b> (faithfulness) ou l’<b>ancrage</b> (groundedness) mesure si chaque affirmation de la réponse est appuyée par le contexte fourni (documents récupérés, résultats d’outils).</p>\n    <ul class=\"rules\"><li>Méthode : décomposer la réponse en affirmations, vérifier chacune contre le contexte (juge, ou modèle d’inférence textuelle NLI).</li><li>Score = affirmations appuyées / affirmations totales.</li><li>Une réponse peut être juste mais non fidèle (le modèle a utilisé ses connaissances) : selon le produit, c’est acceptable ou non.</li><li>Vérifier aussi les <b>citations</b> : la source citée contient-elle vraiment l’affirmation ?</li></ul>",
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
  "lit": "evalcycle",
  "look": {},
  "scene": "evalcycle",
  "fig": "",
  "panel": "<h2>La boucle d’évaluation</h2><div class=\"psub\">du développement à la production et retour</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Cas réels</b><i>traces, retours</i></span><pre class=\"ex\">traces de production, pouces bas, tickets</pre></li><li class=\"\"><span class=\"st\"><b>Jeu d’évaluation</b><i>annoté, versionné</i></span><pre class=\"ex\">evals/v12.jsonl : 400 cas</pre></li><li class=\"\"><span class=\"st\"><b>Changement</b><i>prompt, modèle, code</i></span><pre class=\"ex\">prompt v9, nouveau reranker</pre></li><li class=\"red\"><span class=\"st\"><b>Évaluation hors ligne</b><i>CI</i></span><pre class=\"ex\">pytest evals/ → 91,2 % (v8 : 88,5 %)</pre></li><li class=\"\"><span class=\"st\"><b>Déploiement progressif</b><i></i></span><pre class=\"ex\">10 % du trafic, comparaison A/B</pre></li><li class=\"red\"><span class=\"st\"><b>Surveillance en ligne</b><i></i></span><pre class=\"ex\">juge en ligne sur 5 %, dérive, coûts</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · évaluation</div><p class=\"note\">L’évaluation n’est pas une étape finale mais une boucle : les échecs observés en production deviennent de nouveaux cas de test, chaque changement est mesuré avant d’être déployé, et la production est surveillée en continu.</p><table class=\"data\"><tr><th>hors ligne</th><td>avant de déployer</td></tr><tr><th>en ligne</th><td>sur le trafic réel</td></tr><tr><th>source des cas</th><td>la production</td></tr></table>"
 },
 {
  "kicker": "21.8",
  "title": "Pertinence et précision du contexte",
  "sub": "les bons documents, la bonne réponse",
  "body": "<p class=\"lede\">Deux mesures complètent la fidélité.</p>\n    <table class=\"data\"><tr><th>mesure</th><th>question</th></tr><tr><td>pertinence de la réponse</td><td>la réponse traite-t-elle la question posée, sans digresser ?</td></tr><tr><td>précision du contexte</td><td>parmi les passages fournis, combien sont utiles ? sont-ils bien classés ?</td></tr><tr><td>rappel du contexte</td><td>les passages fournis contiennent-ils toute l’information nécessaire ?</td></tr></table>\n    <p>Ces métriques (popularisées par <b>Ragas</b>) localisent le problème : rappel du contexte bas → récupération ; précision basse → trop de bruit dans le prompt ; fidélité basse → génération.</p>",
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
  "lit": "evalcycle",
  "look": {},
  "scene": "evalcycle",
  "fig": "",
  "panel": "<h2>La boucle d’évaluation</h2><div class=\"psub\">du développement à la production et retour</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Cas réels</b><i>traces, retours</i></span><pre class=\"ex\">traces de production, pouces bas, tickets</pre></li><li class=\"\"><span class=\"st\"><b>Jeu d’évaluation</b><i>annoté, versionné</i></span><pre class=\"ex\">evals/v12.jsonl : 400 cas</pre></li><li class=\"\"><span class=\"st\"><b>Changement</b><i>prompt, modèle, code</i></span><pre class=\"ex\">prompt v9, nouveau reranker</pre></li><li class=\"red\"><span class=\"st\"><b>Évaluation hors ligne</b><i>CI</i></span><pre class=\"ex\">pytest evals/ → 91,2 % (v8 : 88,5 %)</pre></li><li class=\"\"><span class=\"st\"><b>Déploiement progressif</b><i></i></span><pre class=\"ex\">10 % du trafic, comparaison A/B</pre></li><li class=\"red\"><span class=\"st\"><b>Surveillance en ligne</b><i></i></span><pre class=\"ex\">juge en ligne sur 5 %, dérive, coûts</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · évaluation</div><p class=\"note\">L’évaluation n’est pas une étape finale mais une boucle : les échecs observés en production deviennent de nouveaux cas de test, chaque changement est mesuré avant d’être déployé, et la production est surveillée en continu.</p><table class=\"data\"><tr><th>hors ligne</th><td>avant de déployer</td></tr><tr><th>en ligne</th><td>sur le trafic réel</td></tr><tr><th>source des cas</th><td>la production</td></tr></table>"
 },
 {
  "kicker": "21.9",
  "title": "Détecter les hallucinations",
  "sub": "repérer l’invention",
  "body": "<p class=\"lede\">Une <b>hallucination</b> est une affirmation fausse ou non étayée présentée comme vraie.</p>\n    <ul class=\"rules\"><li><b>Contre le contexte</b> : vérification de fidélité (juge, NLI) ; c’est le cas le plus maîtrisable.</li><li><b>Sans contexte</b> : cohérence entre plusieurs générations (SelfCheckGPT), vérification par recherche, probabilités des jetons (faible confiance).</li><li><b>Spécifiques au domaine</b> : références inventées (vérifier que les URL, articles de loi, identifiants existent), chiffres (recalculer).</li><li>Un détecteur a lui-même des faux positifs et négatifs : régler son seuil selon le coût des erreurs (courbe précision/rappel).</li></ul>\n    <p>Réduire en amont : bon contexte, consigne de dire « je ne sais pas », citations obligatoires, température basse pour les faits.</p>",
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
  "lit": "prec",
  "look": {},
  "scene": "prec",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "21.10",
  "title": "Évaluer un RAG",
  "sub": "chaque étage séparément",
  "body": "<p class=\"lede\">Rappel des métriques du chapitre 15, à intégrer dans une évaluation automatique.</p>\n    <ul class=\"rules\"><li><b>Récupération</b> : rappel@k et MRR sur des questions avec passages attendus.</li><li><b>Génération</b> : fidélité, pertinence, exactitude par rapport à la référence.</li><li><b>Questions sans réponse</b> dans le corpus : taux de « je ne sais pas » correct.</li><li><b>Robustesse</b> : fautes de frappe, formulations familières, questions en plusieurs langues.</li><li><b>Droits</b> : aucune réponse ne doit exploiter un document interdit à l’utilisateur.</li></ul>",
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
  "lit": "evalcycle",
  "look": {},
  "scene": "evalcycle",
  "fig": "",
  "panel": "<h2>Une évaluation Ragas</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Données</b><i></i></span><pre class=\"ex\">ds = EvaluationDataset.from_list([{&#x27;user_input&#x27;: q, &#x27;retrieved_contexts&#x27;: ctx,\n  &#x27;response&#x27;: rep, &#x27;reference&#x27;: ref} for ...])</pre></li><li class=\"blue\"><span class=\"st\"><b>Métriques</b><i></i></span><pre class=\"ex\">metrics = [Faithfulness(), ResponseRelevancy(), LLMContextPrecisionWithReference(),\n  LLMContextRecall()]</pre></li><li class=\"\"><span class=\"st\"><b>Évaluer</b><i></i></span><pre class=\"ex\">res = evaluate(ds, metrics=metrics, llm=juge)</pre></li><li class=\"red\"><span class=\"st\"><b>Analyser</b><i></i></span><pre class=\"ex\">res.to_pandas().sort_values(&#x27;faithfulness&#x27;).head(20)  # les pires</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "21.11",
  "title": "Évaluer un agent",
  "sub": "résultat, trajectoire, coût",
  "body": "<p class=\"lede\">Rappel du chapitre 17 : on évalue l’<b>état final</b> (la tâche est-elle faite ?), la <b>trajectoire</b> (outils, ordre, erreurs), l’<b>efficacité</b> (tours, jetons, durée) et la <b>sûreté</b> (actions interdites).</p>\n    <ul class=\"rules\"><li>Environnement reproductible : base de test réinitialisée, API simulées, bac à sable.</li><li>Plusieurs essais par tâche : rapporter le taux de réussite (pass@1) et la constance (réussir k fois sur k).</li><li>Vérifications par programme sur l’état final autant que possible ; juge pour le reste.</li><li>Suivre le coût moyen et la durée par tâche réussie.</li></ul>",
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
  "lit": "evalcycle",
  "look": {},
  "scene": "evalcycle",
  "fig": "",
  "panel": "<h2>La boucle d’évaluation</h2><div class=\"psub\">du développement à la production et retour</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Cas réels</b><i>traces, retours</i></span><pre class=\"ex\">traces de production, pouces bas, tickets</pre></li><li class=\"\"><span class=\"st\"><b>Jeu d’évaluation</b><i>annoté, versionné</i></span><pre class=\"ex\">evals/v12.jsonl : 400 cas</pre></li><li class=\"\"><span class=\"st\"><b>Changement</b><i>prompt, modèle, code</i></span><pre class=\"ex\">prompt v9, nouveau reranker</pre></li><li class=\"red\"><span class=\"st\"><b>Évaluation hors ligne</b><i>CI</i></span><pre class=\"ex\">pytest evals/ → 91,2 % (v8 : 88,5 %)</pre></li><li class=\"\"><span class=\"st\"><b>Déploiement progressif</b><i></i></span><pre class=\"ex\">10 % du trafic, comparaison A/B</pre></li><li class=\"red\"><span class=\"st\"><b>Surveillance en ligne</b><i></i></span><pre class=\"ex\">juge en ligne sur 5 %, dérive, coûts</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · évaluation</div><p class=\"note\">L’évaluation n’est pas une étape finale mais une boucle : les échecs observés en production deviennent de nouveaux cas de test, chaque changement est mesuré avant d’être déployé, et la production est surveillée en continu.</p><table class=\"data\"><tr><th>hors ligne</th><td>avant de déployer</td></tr><tr><th>en ligne</th><td>sur le trafic réel</td></tr><tr><th>source des cas</th><td>la production</td></tr></table>"
 },
 {
  "kicker": "21.12",
  "title": "L’évaluation humaine",
  "sub": "la référence ultime",
  "body": "<p class=\"lede\">Les humains restent la référence pour juger l’utilité, le ton, la justesse experte et les cas ambigus.</p>\n    <ul class=\"rules\"><li><b>Experts du domaine</b> pour les cas difficiles (juridique, médical) ; consignes écrites et exemples notés.</li><li><b>Comparaisons par paires</b> (A ou B ?) plus fiables que des notes absolues.</li><li>Mesurer l’<b>accord entre annotateurs</b> (kappa) : un faible accord signale une consigne floue.</li><li>Retours des utilisateurs en production : pouces, corrections, escalades, réclamations.</li><li>Coût élevé : réserver les humains au calibrage des juges automatiques et aux décisions importantes.</li></ul>\n    <p>Outils d’annotation : Argilla, Label Studio, files d’annotation de Langfuse ou LangSmith.</p>",
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
  "lit": "evalcycle",
  "look": {},
  "scene": "evalcycle",
  "fig": "",
  "panel": "<h2>La boucle d’évaluation</h2><div class=\"psub\">du développement à la production et retour</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Cas réels</b><i>traces, retours</i></span><pre class=\"ex\">traces de production, pouces bas, tickets</pre></li><li class=\"\"><span class=\"st\"><b>Jeu d’évaluation</b><i>annoté, versionné</i></span><pre class=\"ex\">evals/v12.jsonl : 400 cas</pre></li><li class=\"\"><span class=\"st\"><b>Changement</b><i>prompt, modèle, code</i></span><pre class=\"ex\">prompt v9, nouveau reranker</pre></li><li class=\"red\"><span class=\"st\"><b>Évaluation hors ligne</b><i>CI</i></span><pre class=\"ex\">pytest evals/ → 91,2 % (v8 : 88,5 %)</pre></li><li class=\"\"><span class=\"st\"><b>Déploiement progressif</b><i></i></span><pre class=\"ex\">10 % du trafic, comparaison A/B</pre></li><li class=\"red\"><span class=\"st\"><b>Surveillance en ligne</b><i></i></span><pre class=\"ex\">juge en ligne sur 5 %, dérive, coûts</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · évaluation</div><p class=\"note\">L’évaluation n’est pas une étape finale mais une boucle : les échecs observés en production deviennent de nouveaux cas de test, chaque changement est mesuré avant d’être déployé, et la production est surveillée en continu.</p><table class=\"data\"><tr><th>hors ligne</th><td>avant de déployer</td></tr><tr><th>en ligne</th><td>sur le trafic réel</td></tr><tr><th>source des cas</th><td>la production</td></tr></table>"
 },
 {
  "kicker": "21.13",
  "title": "Les tests de régression",
  "sub": "ne pas casser ce qui marchait",
  "body": "<p class=\"lede\">À chaque changement (prompt, modèle, données, code), on relance le jeu d’évaluation et on compare à la version précédente.</p>\n    <ul class=\"rules\"><li>Comparer <b>cas par cas</b>, pas seulement la moyenne : une hausse globale peut cacher des régressions graves sur un segment.</li><li>Seuils bloquants en intégration continue : « pas de baisse de plus de 1 point », « 100 % de JSON valide ».</li><li>Tenir compte du bruit : relancer, ou utiliser un test statistique apparié.</li><li>Re-qualifier quand le fournisseur publie une nouvelle version d’un modèle, et avant toute date de retrait.</li></ul>",
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
  "lit": "evalcycle",
  "look": {},
  "scene": "evalcycle",
  "fig": "",
  "panel": "<h2>Une évaluation dans la CI</h2><div class=\"psub\">GitHub Actions</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Déclencheur</b><i></i></span><pre class=\"ex\">on: pull_request  (chemins prompts/**, src/rag/**)</pre></li><li class=\"\"><span class=\"st\"><b>Lancer</b><i></i></span><pre class=\"ex\">uv run pytest evals/ --junitxml=res.xml</pre></li><li class=\"red\"><span class=\"st\"><b>Seuils</b><i></i></span><pre class=\"ex\">assert score[&#x27;exactitude&#x27;] &gt;= base[&#x27;exactitude&#x27;] - 0.01\nassert score[&#x27;json_valide&#x27;] == 1.0</pre></li><li class=\"blue\"><span class=\"st\"><b>Rapport</b><i></i></span><pre class=\"ex\">commentaire sur la PR : scores, cas changés, coût</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "21.14",
  "title": "Évaluation en ligne et hors ligne",
  "sub": "avant et après le déploiement",
  "body": "<p class=\"lede\">Les deux sont nécessaires.</p>\n    <table class=\"data\"><tr><th></th><th>hors ligne</th><th>en ligne</th></tr><tr><td>quand</td><td>avant de déployer</td><td>sur le trafic réel</td></tr><tr><td>données</td><td>jeux d’évaluation fixes</td><td>requêtes réelles</td></tr><tr><td>mesures</td><td>métriques sur références</td><td>juges sur échantillon, retours, conversions</td></tr><tr><td>force</td><td>reproductible, comparable</td><td>révèle les cas imprévus</td></tr><tr><td>limite</td><td>ne couvre que ce qu’on a imaginé</td><td>pas de référence, bruit</td></tr></table>\n    <ul class=\"rules\"><li>En ligne : tests <b>A/B</b>, déploiement progressif (canary), juge automatique sur un échantillon, signaux implicites (reformulation de la question, abandon, escalade vers un humain).</li><li>Les échecs détectés en ligne rejoignent le jeu hors ligne : c’est la boucle d’amélioration.</li></ul>",
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
  "lit": "evalcycle",
  "look": {},
  "scene": "evalcycle",
  "fig": "",
  "panel": "<h2>La boucle d’évaluation</h2><div class=\"psub\">du développement à la production et retour</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Cas réels</b><i>traces, retours</i></span><pre class=\"ex\">traces de production, pouces bas, tickets</pre></li><li class=\"\"><span class=\"st\"><b>Jeu d’évaluation</b><i>annoté, versionné</i></span><pre class=\"ex\">evals/v12.jsonl : 400 cas</pre></li><li class=\"\"><span class=\"st\"><b>Changement</b><i>prompt, modèle, code</i></span><pre class=\"ex\">prompt v9, nouveau reranker</pre></li><li class=\"red\"><span class=\"st\"><b>Évaluation hors ligne</b><i>CI</i></span><pre class=\"ex\">pytest evals/ → 91,2 % (v8 : 88,5 %)</pre></li><li class=\"\"><span class=\"st\"><b>Déploiement progressif</b><i></i></span><pre class=\"ex\">10 % du trafic, comparaison A/B</pre></li><li class=\"red\"><span class=\"st\"><b>Surveillance en ligne</b><i></i></span><pre class=\"ex\">juge en ligne sur 5 %, dérive, coûts</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · évaluation</div><p class=\"note\">L’évaluation n’est pas une étape finale mais une boucle : les échecs observés en production deviennent de nouveaux cas de test, chaque changement est mesuré avant d’être déployé, et la production est surveillée en continu.</p><table class=\"data\"><tr><th>hors ligne</th><td>avant de déployer</td></tr><tr><th>en ligne</th><td>sur le trafic réel</td></tr><tr><th>source des cas</th><td>la production</td></tr></table>"
 },
 {
  "kicker": "21.15",
  "title": "Évaluations et observabilité",
  "sub": "voir ce qui se passe vraiment",
  "body": "<p class=\"lede\">L’<b>observabilité</b> enregistre chaque requête de bout en bout (trace) : entrée, prompt exact, documents récupérés, appels d’outils, sortie, jetons, coût, latence, version.</p>\n    <ul class=\"rules\"><li>Relire régulièrement des traces : c’est la façon la plus rapide de comprendre les échecs (« look at your data »).</li><li>Brancher les évaluateurs sur les traces : juges en ligne, annotation humaine, création de cas de test en un clic.</li><li>Tableaux de bord : qualité, coût, latence p50/p95, taux d’erreur, par fonctionnalité et par version.</li><li>Outils : Langfuse, LangSmith, Arize Phoenix, Braintrust, Weights & Biases Weave, Logfire ; standard <b>OpenTelemetry</b> (conventions GenAI).</li></ul>\n    <p>Détails au chapitre 25.</p>",
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
  "lit": "evalcycle",
  "look": {},
  "scene": "evalcycle",
  "fig": "",
  "panel": "<h2>La boucle d’évaluation</h2><div class=\"psub\">du développement à la production et retour</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Cas réels</b><i>traces, retours</i></span><pre class=\"ex\">traces de production, pouces bas, tickets</pre></li><li class=\"\"><span class=\"st\"><b>Jeu d’évaluation</b><i>annoté, versionné</i></span><pre class=\"ex\">evals/v12.jsonl : 400 cas</pre></li><li class=\"\"><span class=\"st\"><b>Changement</b><i>prompt, modèle, code</i></span><pre class=\"ex\">prompt v9, nouveau reranker</pre></li><li class=\"red\"><span class=\"st\"><b>Évaluation hors ligne</b><i>CI</i></span><pre class=\"ex\">pytest evals/ → 91,2 % (v8 : 88,5 %)</pre></li><li class=\"\"><span class=\"st\"><b>Déploiement progressif</b><i></i></span><pre class=\"ex\">10 % du trafic, comparaison A/B</pre></li><li class=\"red\"><span class=\"st\"><b>Surveillance en ligne</b><i></i></span><pre class=\"ex\">juge en ligne sur 5 %, dérive, coûts</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · évaluation</div><p class=\"note\">L’évaluation n’est pas une étape finale mais une boucle : les échecs observés en production deviennent de nouveaux cas de test, chaque changement est mesuré avant d’être déployé, et la production est surveillée en continu.</p><table class=\"data\"><tr><th>hors ligne</th><td>avant de déployer</td></tr><tr><th>en ligne</th><td>sur le trafic réel</td></tr><tr><th>source des cas</th><td>la production</td></tr></table>"
 }
];
export const PLATES = {
  prec: { text: "Un détecteur (d’hallucinations, de contenus à risque, de tickets urgents) renvoie un score. En montant le seuil, on se trompe moins sur ce qu’on signale (précision) mais on en rate davantage (rappel). Le bon seuil dépend du coût de chaque erreur.", facts: () => [["précision", "VP / (VP + FP)"], ["rappel", "VP / (VP + FN)"], ["F1", "moyenne harmonique"]] }
};
