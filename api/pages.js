// Chapitre 11 : Appeler des modèles par API (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 11 · Intégration",
  "title": "Appeler des modèles par API",
  "sub": "l’essentiel du travail quotidien",
  "body": "<p class=\"lede\">La plupart des applications d’IA générative appellent un modèle par <b>API</b> : on envoie une conversation, on reçoit une réponse. Simple en apparence, mais une intégration de production gère l’authentification, le streaming, les formats structurés, les outils, les erreurs, les limites de débit et les coûts.</p>\n    <p>Ce chapitre passe en revue les trois grands fournisseurs (OpenAI, Anthropic, Google), les modèles ouverts servis derrière une API compatible, puis les techniques qui rendent l’intégration robuste.</p>",
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
  "lit": "appel",
  "look": {},
  "scene": "appel",
  "fig": "",
  "panel": "<h2>Un appel de bout en bout</h2><div class=\"psub\">de votre code au modèle et retour</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Construire</b><i>messages + paramètres</i></span><pre class=\"ex\">msgs = [{&#x27;role&#x27;: &#x27;user&#x27;, &#x27;content&#x27;: q}]</pre></li><li class=\"red\"><span class=\"st\"><b>Authentifier</b><i>clé dans l’en-tête</i></span><pre class=\"ex\">Authorization: Bearer sk-…  /  x-api-key: …\n# clé lue dans l’environnement</pre></li><li class=\"\"><span class=\"st\"><b>Envoyer</b><i>HTTPS POST</i></span><pre class=\"ex\">POST /v1/messages   (JSON)</pre></li><li class=\"blue\"><span class=\"st\"><b>Attendre</b><i>ou recevoir en flux</i></span><pre class=\"ex\">stream=True → événements SSE</pre></li><li class=\"red\"><span class=\"st\"><b>Gérer les erreurs</b><i>429, 5xx, délai</i></span><pre class=\"ex\">réessayer avec attente exponentielle</pre></li><li class=\"blue\"><span class=\"st\"><b>Exploiter</b><i>texte, JSON, appels d’outils</i></span><pre class=\"ex\">resp.content[0].text\nresp.usage → jetons, coût</pre></li></ol><p class=\"note\">Tous les fournisseurs suivent ce schéma : une requête HTTPS avec une liste de messages, une réponse avec le texte, la raison de l’arrêt et le décompte des jetons. Les SDK officiels ajoutent les réessais, le streaming et le typage.</p><table class=\"data\"><tr><th>format</th><td>JSON sur HTTPS</td></tr><tr><th>streaming</th><td>Server-Sent Events</td></tr><tr><th>facturation</th><td>jetons d’entrée + de sortie</td></tr></table>"
 },
 {
  "kicker": "11.1",
  "title": "L’API d’OpenAI",
  "sub": "Responses et Chat Completions",
  "body": "<p class=\"lede\">OpenAI propose l’API <b>Responses</b> (la plus récente, avec outils intégrés et état côté serveur facultatif) et l’historique <b>Chat Completions</b>, devenue un standard de fait : beaucoup d’autres fournisseurs et serveurs (vLLM, Ollama, OpenRouter) l’imitent.</p>\n    <pre class=\"code\">from openai import OpenAI\nclient = OpenAI()                     # lit OPENAI_API_KEY\nr = client.chat.completions.create(\n    model=MODELE,\n    messages=[{&#x27;role&#x27;: &#x27;system&#x27;, &#x27;content&#x27;: &#x27;Réponds en français, en 3 phrases.&#x27;},\n              {&#x27;role&#x27;: &#x27;user&#x27;, &#x27;content&#x27;: &#x27;Qu’est-ce que le RAG ?&#x27;}])\nprint(r.choices[0].message.content, r.usage.total_tokens)</pre>\n    <p>Grâce à cette compatibilité, changer <code>base_url</code> suffit souvent pour passer à un autre fournisseur ou à un modèle local.</p>",
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
  "lit": "appel",
  "look": {},
  "scene": "appel",
  "fig": "",
  "panel": "<h2>Un appel de bout en bout</h2><div class=\"psub\">de votre code au modèle et retour</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Construire</b><i>messages + paramètres</i></span><pre class=\"ex\">msgs = [{&#x27;role&#x27;: &#x27;user&#x27;, &#x27;content&#x27;: q}]</pre></li><li class=\"red\"><span class=\"st\"><b>Authentifier</b><i>clé dans l’en-tête</i></span><pre class=\"ex\">Authorization: Bearer sk-…  /  x-api-key: …\n# clé lue dans l’environnement</pre></li><li class=\"\"><span class=\"st\"><b>Envoyer</b><i>HTTPS POST</i></span><pre class=\"ex\">POST /v1/messages   (JSON)</pre></li><li class=\"blue\"><span class=\"st\"><b>Attendre</b><i>ou recevoir en flux</i></span><pre class=\"ex\">stream=True → événements SSE</pre></li><li class=\"red\"><span class=\"st\"><b>Gérer les erreurs</b><i>429, 5xx, délai</i></span><pre class=\"ex\">réessayer avec attente exponentielle</pre></li><li class=\"blue\"><span class=\"st\"><b>Exploiter</b><i>texte, JSON, appels d’outils</i></span><pre class=\"ex\">resp.content[0].text\nresp.usage → jetons, coût</pre></li></ol><p class=\"note\">Tous les fournisseurs suivent ce schéma : une requête HTTPS avec une liste de messages, une réponse avec le texte, la raison de l’arrêt et le décompte des jetons. Les SDK officiels ajoutent les réessais, le streaming et le typage.</p><table class=\"data\"><tr><th>format</th><td>JSON sur HTTPS</td></tr><tr><th>streaming</th><td>Server-Sent Events</td></tr><tr><th>facturation</th><td>jetons d’entrée + de sortie</td></tr></table>"
 },
 {
  "kicker": "11.2",
  "title": "L’API d’Anthropic",
  "sub": "Messages et Claude",
  "body": "<p class=\"lede\">L’API <b>Messages</b> d’Anthropic sert les modèles Claude. Les instructions système sont un paramètre à part, la réponse est une liste de <b>blocs de contenu</b> (texte, appel d’outil, réflexion).</p>\n    <pre class=\"code\">import anthropic\nclient = anthropic.Anthropic()        # lit ANTHROPIC_API_KEY\nr = client.messages.create(\n    model=&#x27;claude-sonnet-5-5&#x27;, max_tokens=1024,\n    system=&#x27;Tu es un assistant juridique précis.&#x27;,\n    messages=[{&#x27;role&#x27;: &#x27;user&#x27;, &#x27;content&#x27;: &#x27;Résume ce contrat : ...&#x27;}])\nprint(r.content[0].text, r.usage.input_tokens, r.usage.output_tokens)</pre>\n    <ul class=\"rules\"><li><code>max_tokens</code> est obligatoire.</li><li><b>Cache de prompt</b> : marquer un long préfixe stable (instructions, documents) le rend beaucoup moins cher et plus rapide à relire.</li><li>Réflexion étendue, outils côté serveur (recherche web, exécution de code), fichiers, traitement par lots.</li></ul>",
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
  "lit": "appel",
  "look": {},
  "scene": "appel",
  "fig": "",
  "panel": "<h2>Un appel de bout en bout</h2><div class=\"psub\">de votre code au modèle et retour</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Construire</b><i>messages + paramètres</i></span><pre class=\"ex\">msgs = [{&#x27;role&#x27;: &#x27;user&#x27;, &#x27;content&#x27;: q}]</pre></li><li class=\"red\"><span class=\"st\"><b>Authentifier</b><i>clé dans l’en-tête</i></span><pre class=\"ex\">Authorization: Bearer sk-…  /  x-api-key: …\n# clé lue dans l’environnement</pre></li><li class=\"\"><span class=\"st\"><b>Envoyer</b><i>HTTPS POST</i></span><pre class=\"ex\">POST /v1/messages   (JSON)</pre></li><li class=\"blue\"><span class=\"st\"><b>Attendre</b><i>ou recevoir en flux</i></span><pre class=\"ex\">stream=True → événements SSE</pre></li><li class=\"red\"><span class=\"st\"><b>Gérer les erreurs</b><i>429, 5xx, délai</i></span><pre class=\"ex\">réessayer avec attente exponentielle</pre></li><li class=\"blue\"><span class=\"st\"><b>Exploiter</b><i>texte, JSON, appels d’outils</i></span><pre class=\"ex\">resp.content[0].text\nresp.usage → jetons, coût</pre></li></ol><p class=\"note\">Tous les fournisseurs suivent ce schéma : une requête HTTPS avec une liste de messages, une réponse avec le texte, la raison de l’arrêt et le décompte des jetons. Les SDK officiels ajoutent les réessais, le streaming et le typage.</p><table class=\"data\"><tr><th>format</th><td>JSON sur HTTPS</td></tr><tr><th>streaming</th><td>Server-Sent Events</td></tr><tr><th>facturation</th><td>jetons d’entrée + de sortie</td></tr></table>"
 },
 {
  "kicker": "11.3",
  "title": "L’API Gemini de Google",
  "sub": "Gemini et Vertex AI",
  "body": "<p class=\"lede\">Google sert ses modèles <b>Gemini</b> par l’API Gemini (Google AI Studio, clé simple) ou par <b>Vertex AI</b> (Google Cloud, pour l’entreprise). Le SDK <code>google-genai</code> couvre les deux.</p>\n    <pre class=\"code\">from google import genai\nclient = genai.Client()               # lit GEMINI_API_KEY\nr = client.models.generate_content(\n    model=&#x27;gemini-2.5-flash&#x27;,\n    contents=&#x27;Explique la quantification en 2 phrases.&#x27;)\nprint(r.text)</pre>\n    <p>Points forts : très longs contextes, multimodalité native (vidéo, audio, PDF), ancrage sur la recherche Google. Les mêmes concepts (rôles, outils, schémas JSON, streaming) s’y retrouvent sous d’autres noms.</p>",
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
  "lit": "appel",
  "look": {},
  "scene": "appel",
  "fig": "",
  "panel": "<h2>Un appel de bout en bout</h2><div class=\"psub\">de votre code au modèle et retour</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Construire</b><i>messages + paramètres</i></span><pre class=\"ex\">msgs = [{&#x27;role&#x27;: &#x27;user&#x27;, &#x27;content&#x27;: q}]</pre></li><li class=\"red\"><span class=\"st\"><b>Authentifier</b><i>clé dans l’en-tête</i></span><pre class=\"ex\">Authorization: Bearer sk-…  /  x-api-key: …\n# clé lue dans l’environnement</pre></li><li class=\"\"><span class=\"st\"><b>Envoyer</b><i>HTTPS POST</i></span><pre class=\"ex\">POST /v1/messages   (JSON)</pre></li><li class=\"blue\"><span class=\"st\"><b>Attendre</b><i>ou recevoir en flux</i></span><pre class=\"ex\">stream=True → événements SSE</pre></li><li class=\"red\"><span class=\"st\"><b>Gérer les erreurs</b><i>429, 5xx, délai</i></span><pre class=\"ex\">réessayer avec attente exponentielle</pre></li><li class=\"blue\"><span class=\"st\"><b>Exploiter</b><i>texte, JSON, appels d’outils</i></span><pre class=\"ex\">resp.content[0].text\nresp.usage → jetons, coût</pre></li></ol><p class=\"note\">Tous les fournisseurs suivent ce schéma : une requête HTTPS avec une liste de messages, une réponse avec le texte, la raison de l’arrêt et le décompte des jetons. Les SDK officiels ajoutent les réessais, le streaming et le typage.</p><table class=\"data\"><tr><th>format</th><td>JSON sur HTTPS</td></tr><tr><th>streaming</th><td>Server-Sent Events</td></tr><tr><th>facturation</th><td>jetons d’entrée + de sortie</td></tr></table>"
 },
 {
  "kicker": "11.4",
  "title": "Les modèles à poids ouverts",
  "sub": "les servir derrière une API",
  "body": "<p class=\"lede\">Un modèle ouvert (Llama, Qwen, Mistral, Gemma, DeepSeek) s’utilise de trois façons :</p>\n    <table class=\"data\"><tr><th>moyen</th><th>exemple</th><th>pour</th></tr><tr><td>API d’un hébergeur</td><td>Together, Groq, Fireworks, Mistral, OpenRouter</td><td>essayer vite, sans GPU</td></tr><tr><td>serveur local</td><td>Ollama, LM Studio, llama.cpp</td><td>poste de travail, prototypes</td></tr><tr><td>serveur de production</td><td>vLLM, SGLang, TGI sur vos GPU</td><td>volume, confidentialité</td></tr></table>\n    <p>La plupart exposent une API compatible OpenAI : on garde le même code client.</p>",
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
  "lit": "appel",
  "look": {},
  "scene": "appel",
  "fig": "",
  "panel": "<h2>Un modèle local avec Ollama</h2><div class=\"psub\">même client, autre adresse</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Installer et lancer</b><i></i></span><pre class=\"ex\">ollama pull qwen3:8b\nollama serve   # port 11434</pre></li><li class=\"\"><span class=\"st\"><b>Tester</b><i></i></span><pre class=\"ex\">ollama run qwen3:8b &#x27;Bonjour&#x27;</pre></li><li class=\"blue\"><span class=\"st\"><b>Client OpenAI</b><i></i></span><pre class=\"ex\">client = OpenAI(base_url=&#x27;http://localhost:11434/v1&#x27;, api_key=&#x27;ollama&#x27;)</pre></li><li class=\"\"><span class=\"st\"><b>Appeler</b><i></i></span><pre class=\"ex\">client.chat.completions.create(model=&#x27;qwen3:8b&#x27;, messages=msgs)</pre></li><li class=\"red\"><span class=\"st\"><b>Limite</b><i></i></span><pre class=\"ex\">un poste ≠ un serveur multi-utilisateurs → vLLM</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "11.5",
  "title": "L’authentification",
  "sub": "protéger ses clés",
  "body": "<p class=\"lede\">Une <b>clé d’API</b> donne accès à votre compte et à votre facture. Elle se traite comme un mot de passe.</p>\n    <ul class=\"rules\"><li>Jamais dans le code ni dans Git : variable d’environnement, fichier <code>.env</code> ignoré, ou gestionnaire de secrets (Vault, AWS Secrets Manager).</li><li>Jamais dans un navigateur ou une application mobile : le client appelle <b>votre</b> serveur, qui appelle le fournisseur.</li><li>Une clé par environnement et par service, avec limites de dépense ; rotation régulière et révocation immédiate en cas de fuite.</li><li>En entreprise : identités du cloud (IAM, comptes de service) plutôt que clés statiques.</li></ul>",
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
  "lit": "appel",
  "look": {},
  "scene": "appel",
  "fig": "",
  "panel": "<h2>Gérer une clé proprement</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"red\"><span class=\"st\"><b>Fichier local</b><i>.env, ignoré par Git</i></span><pre class=\"ex\">ANTHROPIC_API_KEY=sk-ant-…\necho &#x27;.env&#x27; &gt;&gt; .gitignore</pre></li><li class=\"\"><span class=\"st\"><b>Charger</b><i></i></span><pre class=\"ex\">from dotenv import load_dotenv; load_dotenv()</pre></li><li class=\"blue\"><span class=\"st\"><b>Configuration typée</b><i></i></span><pre class=\"ex\">class Reglages(BaseSettings):\n    anthropic_api_key: SecretStr</pre></li><li class=\"\"><span class=\"st\"><b>Détecter une fuite</b><i>avant le commit</i></span><pre class=\"ex\">gitleaks detect  /  pre-commit</pre></li><li class=\"\"><span class=\"st\"><b>Production</b><i></i></span><pre class=\"ex\">secret injecté par la plateforme (K8s Secret, Secrets Manager)</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "11.6",
  "title": "Les réponses en flux",
  "sub": "afficher pendant la génération",
  "body": "<p class=\"lede\">Un modèle met plusieurs secondes à produire une longue réponse. En <b>streaming</b>, on reçoit les jetons au fur et à mesure (événements Server-Sent Events) : l’utilisateur voit le début en quelques centaines de millisecondes.</p>\n    <pre class=\"code\">with client.messages.stream(model=MODELE, max_tokens=1024, messages=msgs) as s:\n    for texte in s.text_stream:\n        print(texte, end=&#x27;&#x27;, flush=True)\n    final = s.get_final_message()   # usage, raison d’arrêt</pre>\n    <ul class=\"rules\"><li>Mesure clé : le <b>temps jusqu’au premier jeton</b> (TTFT).</li><li>Côté serveur, on relaie le flux au navigateur (SSE ou WebSocket, chapitre 24).</li><li>Gérer l’interruption : l’utilisateur ferme la page, il faut annuler la requête en amont pour ne pas payer pour rien.</li><li>Un JSON en flux n’est valide qu’à la fin : utiliser un analyseur partiel si on veut l’afficher progressivement.</li></ul>",
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
  "lit": "appel",
  "look": {},
  "scene": "appel",
  "fig": "",
  "panel": "<h2>Un appel de bout en bout</h2><div class=\"psub\">de votre code au modèle et retour</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Construire</b><i>messages + paramètres</i></span><pre class=\"ex\">msgs = [{&#x27;role&#x27;: &#x27;user&#x27;, &#x27;content&#x27;: q}]</pre></li><li class=\"red\"><span class=\"st\"><b>Authentifier</b><i>clé dans l’en-tête</i></span><pre class=\"ex\">Authorization: Bearer sk-…  /  x-api-key: …\n# clé lue dans l’environnement</pre></li><li class=\"\"><span class=\"st\"><b>Envoyer</b><i>HTTPS POST</i></span><pre class=\"ex\">POST /v1/messages   (JSON)</pre></li><li class=\"blue\"><span class=\"st\"><b>Attendre</b><i>ou recevoir en flux</i></span><pre class=\"ex\">stream=True → événements SSE</pre></li><li class=\"red\"><span class=\"st\"><b>Gérer les erreurs</b><i>429, 5xx, délai</i></span><pre class=\"ex\">réessayer avec attente exponentielle</pre></li><li class=\"blue\"><span class=\"st\"><b>Exploiter</b><i>texte, JSON, appels d’outils</i></span><pre class=\"ex\">resp.content[0].text\nresp.usage → jetons, coût</pre></li></ol><p class=\"note\">Tous les fournisseurs suivent ce schéma : une requête HTTPS avec une liste de messages, une réponse avec le texte, la raison de l’arrêt et le décompte des jetons. Les SDK officiels ajoutent les réessais, le streaming et le typage.</p><table class=\"data\"><tr><th>format</th><td>JSON sur HTTPS</td></tr><tr><th>streaming</th><td>Server-Sent Events</td></tr><tr><th>facturation</th><td>jetons d’entrée + de sortie</td></tr></table>"
 },
 {
  "kicker": "11.7",
  "title": "Les sorties structurées",
  "sub": "du JSON fiable",
  "body": "<p class=\"lede\">Pour qu’un programme exploite la réponse, il faut un format exact. Les <b>sorties structurées</b> contraignent le modèle à respecter un <b>schéma JSON</b> : le décodage n’autorise que des jetons valides.</p>\n    <pre class=\"code\">class Facture(BaseModel):\n    fournisseur: str\n    date: date\n    montant_ttc: float\n    lignes: list[Ligne]\nr = client.chat.completions.parse(model=MODELE, messages=msgs, response_format=Facture)\nfacture = r.choices[0].message.parsed</pre>\n    <ul class=\"rules\"><li>Définir le schéma avec <b>Pydantic</b> et valider à la réception, même si le fournisseur garantit le format.</li><li>Un schéma valide n’est pas un contenu juste : un montant peut être faux tout en étant un nombre.</li><li>Prévoir des champs nuls ou une valeur « inconnu » pour éviter que le modèle invente.</li><li>Bibliothèques utiles : <b>Instructor</b>, Outlines (modèles locaux), Pydantic AI.</li></ul>",
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
  "lit": "appel",
  "look": {},
  "scene": "appel",
  "fig": "",
  "panel": "<h2>Un appel de bout en bout</h2><div class=\"psub\">de votre code au modèle et retour</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Construire</b><i>messages + paramètres</i></span><pre class=\"ex\">msgs = [{&#x27;role&#x27;: &#x27;user&#x27;, &#x27;content&#x27;: q}]</pre></li><li class=\"red\"><span class=\"st\"><b>Authentifier</b><i>clé dans l’en-tête</i></span><pre class=\"ex\">Authorization: Bearer sk-…  /  x-api-key: …\n# clé lue dans l’environnement</pre></li><li class=\"\"><span class=\"st\"><b>Envoyer</b><i>HTTPS POST</i></span><pre class=\"ex\">POST /v1/messages   (JSON)</pre></li><li class=\"blue\"><span class=\"st\"><b>Attendre</b><i>ou recevoir en flux</i></span><pre class=\"ex\">stream=True → événements SSE</pre></li><li class=\"red\"><span class=\"st\"><b>Gérer les erreurs</b><i>429, 5xx, délai</i></span><pre class=\"ex\">réessayer avec attente exponentielle</pre></li><li class=\"blue\"><span class=\"st\"><b>Exploiter</b><i>texte, JSON, appels d’outils</i></span><pre class=\"ex\">resp.content[0].text\nresp.usage → jetons, coût</pre></li></ol><p class=\"note\">Tous les fournisseurs suivent ce schéma : une requête HTTPS avec une liste de messages, une réponse avec le texte, la raison de l’arrêt et le décompte des jetons. Les SDK officiels ajoutent les réessais, le streaming et le typage.</p><table class=\"data\"><tr><th>format</th><td>JSON sur HTTPS</td></tr><tr><th>streaming</th><td>Server-Sent Events</td></tr><tr><th>facturation</th><td>jetons d’entrée + de sortie</td></tr></table>"
 },
 {
  "kicker": "11.8",
  "title": "L’appel de fonctions et d’outils",
  "sub": "laisser le modèle agir",
  "body": "<p class=\"lede\">Avec l’<b>appel d’outils</b> (tool calling), on décrit des fonctions (nom, description, schéma des paramètres). Le modèle ne les exécute pas : il répond par une <b>demande d’appel</b> ; votre code l’exécute et renvoie le résultat ; le modèle continue.</p>\n    <ul class=\"rules\"><li>La <b>description</b> de l’outil est un prompt : elle décide quand le modèle l’utilise.</li><li>Valider les arguments, gérer les erreurs de l’outil et les renvoyer au modèle comme résultat.</li><li>Plusieurs appels en parallèle sont possibles dans une même réponse.</li><li>C’est la brique de base des agents (chapitre 16) et du protocole <b>MCP</b>, qui standardise la façon d’exposer des outils.</li></ul>",
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
  "lit": "appel",
  "look": {},
  "scene": "appel",
  "fig": "",
  "panel": "<h2>La boucle d’appel d’outil</h2><div class=\"psub\">API Messages d’Anthropic</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Déclarer</b><i></i></span><pre class=\"ex\">outils = [{&#x27;name&#x27;: &#x27;meteo&#x27;, &#x27;description&#x27;: &#x27;Météo actuelle d’une ville&#x27;,\n  &#x27;input_schema&#x27;: {&#x27;type&#x27;: &#x27;object&#x27;, &#x27;properties&#x27;: {&#x27;ville&#x27;: {&#x27;type&#x27;: &#x27;string&#x27;}},\n  &#x27;required&#x27;: [&#x27;ville&#x27;]}}]</pre></li><li class=\"\"><span class=\"st\"><b>Appeler</b><i></i></span><pre class=\"ex\">r = client.messages.create(..., tools=outils, messages=msgs)</pre></li><li class=\"\"><span class=\"st\"><b>Le modèle demande</b><i>stop_reason == &#x27;tool_use&#x27;</i></span><pre class=\"ex\">bloc = next(b for b in r.content if b.type == &#x27;tool_use&#x27;)\n# bloc.input == {&#x27;ville&#x27;: &#x27;Lyon&#x27;}</pre></li><li class=\"red\"><span class=\"st\"><b>Exécuter</b><i>votre code</i></span><pre class=\"ex\">res = meteo(**bloc.input)</pre></li><li class=\"\"><span class=\"st\"><b>Renvoyer</b><i></i></span><pre class=\"ex\">msgs += [{&#x27;role&#x27;: &#x27;assistant&#x27;, &#x27;content&#x27;: r.content},\n  {&#x27;role&#x27;: &#x27;user&#x27;, &#x27;content&#x27;: [{&#x27;type&#x27;: &#x27;tool_result&#x27;,\n    &#x27;tool_use_id&#x27;: bloc.id, &#x27;content&#x27;: json.dumps(res)}]}]</pre></li><li class=\"\"><span class=\"st\"><b>Recommencer</b><i>jusqu’à end_turn</i></span><pre class=\"ex\">while r.stop_reason == &#x27;tool_use&#x27;: ...</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1</div><p class=\"note\"></p>"
 },
 {
  "kicker": "11.9",
  "title": "Les API multimodales",
  "sub": "images, PDF, audio",
  "body": "<p class=\"lede\">Les modèles récents acceptent des <b>images</b>, des <b>PDF</b>, parfois de l’<b>audio</b> et de la <b>vidéo</b> dans les messages, et certains en produisent.</p>\n    <pre class=\"code\">{&#x27;role&#x27;: &#x27;user&#x27;, &#x27;content&#x27;: [\n  {&#x27;type&#x27;: &#x27;image&#x27;, &#x27;source&#x27;: {&#x27;type&#x27;: &#x27;base64&#x27;, &#x27;media_type&#x27;: &#x27;image/png&#x27;, &#x27;data&#x27;: b64}},\n  {&#x27;type&#x27;: &#x27;text&#x27;, &#x27;text&#x27;: &#x27;Extrais le total et la date de ce ticket.&#x27;}]}</pre>\n    <ul class=\"rules\"><li>Une image coûte des jetons selon sa taille : redimensionner avant envoi.</li><li>Pour les PDF : envoi direct (texte + images des pages) ou extraction préalable (chapitre 20).</li><li>Audio : transcription (Whisper, gpt-4o-transcribe), synthèse vocale, ou API temps réel parole-à-parole.</li></ul>",
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
  "lit": "appel",
  "look": {},
  "scene": "appel",
  "fig": "",
  "panel": "<h2>Un appel de bout en bout</h2><div class=\"psub\">de votre code au modèle et retour</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Construire</b><i>messages + paramètres</i></span><pre class=\"ex\">msgs = [{&#x27;role&#x27;: &#x27;user&#x27;, &#x27;content&#x27;: q}]</pre></li><li class=\"red\"><span class=\"st\"><b>Authentifier</b><i>clé dans l’en-tête</i></span><pre class=\"ex\">Authorization: Bearer sk-…  /  x-api-key: …\n# clé lue dans l’environnement</pre></li><li class=\"\"><span class=\"st\"><b>Envoyer</b><i>HTTPS POST</i></span><pre class=\"ex\">POST /v1/messages   (JSON)</pre></li><li class=\"blue\"><span class=\"st\"><b>Attendre</b><i>ou recevoir en flux</i></span><pre class=\"ex\">stream=True → événements SSE</pre></li><li class=\"red\"><span class=\"st\"><b>Gérer les erreurs</b><i>429, 5xx, délai</i></span><pre class=\"ex\">réessayer avec attente exponentielle</pre></li><li class=\"blue\"><span class=\"st\"><b>Exploiter</b><i>texte, JSON, appels d’outils</i></span><pre class=\"ex\">resp.content[0].text\nresp.usage → jetons, coût</pre></li></ol><p class=\"note\">Tous les fournisseurs suivent ce schéma : une requête HTTPS avec une liste de messages, une réponse avec le texte, la raison de l’arrêt et le décompte des jetons. Les SDK officiels ajoutent les réessais, le streaming et le typage.</p><table class=\"data\"><tr><th>format</th><td>JSON sur HTTPS</td></tr><tr><th>streaming</th><td>Server-Sent Events</td></tr><tr><th>facturation</th><td>jetons d’entrée + de sortie</td></tr></table>"
 },
 {
  "kicker": "11.10",
  "title": "Erreurs et réessais",
  "sub": "une API finit toujours par échouer",
  "body": "<p class=\"lede\">Délais dépassés, surcharges, limites de débit, pannes : en production, chaque appel peut échouer.</p>\n    <table class=\"data\"><tr><th>code</th><th>sens</th><th>réaction</th></tr><tr><td>400</td><td>requête invalide (contexte trop long…)</td><td>corriger, ne pas réessayer</td></tr><tr><td>401 / 403</td><td>clé invalide, droits</td><td>alerter</td></tr><tr><td>429</td><td>limite de débit</td><td>attendre (retry-after), réessayer</td></tr><tr><td>500 / 503 / 529</td><td>erreur ou surcharge du fournisseur</td><td>réessayer, puis modèle de secours</td></tr><tr><td>délai dépassé</td><td>réseau, génération longue</td><td>réessayer si idempotent</td></tr></table>\n    <p>Les SDK réessaient déjà (2 fois par défaut). Au-delà : bibliothèque <b>tenacity</b>, délai par appel, disjoncteur (circuit breaker) qui coupe un fournisseur en panne, et journalisation de chaque échec.</p>",
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
  "lit": "backoff",
  "look": {},
  "scene": "backoff",
  "fig": "",
  "panel": "<h2>Réessayer avec tenacity</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Décorer</b><i></i></span><pre class=\"ex\">@retry(wait=wait_random_exponential(min=1, max=30),\n       stop=stop_after_attempt(6),\n       retry=retry_if_exception_type((RateLimitError, APIStatusError)))</pre></li><li class=\"\"><span class=\"st\"><b>Délai</b><i></i></span><pre class=\"ex\">client = Anthropic(timeout=60, max_retries=2)</pre></li><li class=\"red\"><span class=\"st\"><b>Idempotence</b><i></i></span><pre class=\"ex\">même identifiant de requête → pas de double effet</pre></li><li class=\"\"><span class=\"st\"><b>Journaliser</b><i></i></span><pre class=\"ex\">log.warning(&#x27;retry&#x27;, attempt=n, status=e.status_code)</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "11.11",
  "title": "Les limites de débit",
  "sub": "requêtes et jetons par minute",
  "body": "<p class=\"lede\">Chaque compte a des <b>limites</b> : requêtes par minute (RPM), jetons d’entrée et de sortie par minute (TPM), parfois par jour. Elles augmentent avec le niveau de dépense.</p>\n    <ul class=\"rules\"><li>Limiter la concurrence côté client : sémaphore asyncio, file d’attente.</li><li>Lisser : un seau à jetons (token bucket) local qui respecte le budget.</li><li>Grouper les traitements non urgents dans l’<b>API de lots</b> (batch) : moins cher, limites séparées, résultats sous 24 h.</li><li>Répartir sur plusieurs fournisseurs ou régions si le volume l’exige.</li><li>Lire les en-têtes de réponse (<code>ratelimit-remaining</code>) pour ralentir avant le 429.</li></ul>",
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
  "lit": "backoff",
  "look": {},
  "scene": "backoff",
  "fig": "",
  "panel": "<h2>Traiter 10 000 documents sans dépasser les limites</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Concurrence bornée</b><i></i></span><pre class=\"ex\">sem = asyncio.Semaphore(16)\nasync def un(doc):\n    async with sem: return await appeler(doc)</pre></li><li class=\"\"><span class=\"st\"><b>Lancer</b><i></i></span><pre class=\"ex\">res = await asyncio.gather(*(un(d) for d in docs))</pre></li><li class=\"\"><span class=\"st\"><b>Ou par lots</b><i>−50 %</i></span><pre class=\"ex\">client.messages.batches.create(requests=[...])</pre></li><li class=\"red\"><span class=\"st\"><b>Reprendre</b><i></i></span><pre class=\"ex\">écrire chaque résultat en JSONL ; sauter les id déjà faits</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "11.12",
  "title": "Jetons, usage et coûts",
  "sub": "savoir ce qu’on dépense",
  "body": "<p class=\"lede\">On paie les jetons d’<b>entrée</b> (prompt, historique, documents) et de <b>sortie</b> (réponse, et réflexion des modèles de raisonnement). Chaque réponse d’API renvoie ces décomptes : on les enregistre tous.</p>\n    <div class=\"eq\">coût = jetons_entrée × prix_entrée + jetons_sortie × prix_sortie</div>\n    <ul class=\"rules\"><li>Exemple : 2 000 jetons d’entrée et 500 de sortie, à 3 $ et 15 $ par million → 0,006 + 0,0075 ≈ <b>0,014 $</b> par requête, 1 400 $ pour 100 000 requêtes.</li><li>Leviers : modèle plus petit, prompts plus courts, <b>cache de prompt</b>, limiter max_tokens, lots asynchrones, cache des réponses identiques.</li><li>Attribuer les coûts par fonctionnalité, client et utilisateur (métadonnées sur chaque appel) ; alertes de budget (chapitre 25).</li></ul>",
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
  "lit": "cout",
  "look": {},
  "scene": "cout",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "11.13",
  "title": "Routage et modèles de secours",
  "sub": "le bon modèle pour chaque requête",
  "body": "<p class=\"lede\">Toutes les requêtes ne méritent pas le modèle le plus cher, et aucun fournisseur n’est disponible à 100 %.</p>\n    <ul class=\"rules\"><li><b>Routage</b> : un classifieur (règles, petit modèle) envoie les questions simples à un modèle rapide et les difficiles à un modèle puissant ou de raisonnement.</li><li><b>Cascade</b> : essayer le petit modèle ; si la confiance ou la validation échoue, passer au grand.</li><li><b>Secours</b> (fallback) : en cas d’erreur ou de délai, basculer vers un autre fournisseur ou une autre région.</li><li><b>Passerelle</b> (gateway) : LiteLLM, OpenRouter, Portkey ou une passerelle maison unifient les API, les clés, les quotas, les journaux et le basculement.</li></ul>\n    <p>Chaque modèle de secours doit être <b>évalué</b> sur vos cas : un prompt réglé pour un modèle peut se comporter autrement sur un autre.</p>",
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
  "lit": "appel",
  "look": {},
  "scene": "appel",
  "fig": "",
  "panel": "<h2>Une passerelle avec LiteLLM</h2><div class=\"psub\">routage et secours</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Appel unifié</b><i></i></span><pre class=\"ex\">litellm.completion(model=&#x27;anthropic/claude-sonnet-5-5&#x27;, messages=msgs)</pre></li><li class=\"blue\"><span class=\"st\"><b>Routeur</b><i></i></span><pre class=\"ex\">router = Router(model_list=[...], fallbacks=[{&#x27;principal&#x27;: [&#x27;secours&#x27;]}])</pre></li><li class=\"\"><span class=\"st\"><b>Règle simple</b><i></i></span><pre class=\"ex\">modele = &#x27;rapide&#x27; if len(q) &lt; 300 and not besoin_raisonnement(q) else &#x27;fort&#x27;</pre></li><li class=\"red\"><span class=\"st\"><b>Suivi</b><i></i></span><pre class=\"ex\">coût, latence et erreurs par modèle</pre></li></ol><p class=\"note\"></p>"
 }
];
export const PLATES = {
  backoff: { text: "Quand une API répond 429 (trop de requêtes) ou 529/503 (surcharge), on réessaie après une attente qui double à chaque tentative, plafonnée, avec un peu de hasard (jitter) pour que tous les clients ne reviennent pas au même instant. Respecter l’en-tête retry-after quand il est présent.", facts: () => [["à réessayer", "429, 500, 502, 503, 529, délai dépassé"], ["à ne pas réessayer", "400, 401, 403, 404"], ["plafond", "≈ 30 à 60 s, 5 à 8 tentatives"]] },
  cout: { text: "Les prix varient d’un facteur 100 ou plus entre les modèles, et la sortie coûte en général 3 à 5 fois l’entrée. Le choix du modèle pour chaque tâche est la première source d’économies, avant toute optimisation de code. Prix indicatifs, qui changent souvent : consulter les grilles des fournisseurs.", facts: () => [["sortie / entrée", "≈ 3 à 5 ×"], ["cache de prompt", "entrée relue ≈ 10 % du prix"], ["lots asynchrones", "≈ −50 %"]] }
};
