// Chapitre 18 : Les frameworks d’IA (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 18 · Frameworks",
  "title": "Les frameworks d’IA",
  "sub": "ne pas réinventer la roue, ou si ?",
  "body": "<p class=\"lede\">De nombreux <b>frameworks</b> facilitent la construction d’applications à base de modèles : connecteurs de documents, abstractions de modèles, chaînes, agents, mémoire, évaluation, observabilité.</p>\n    <p>Ils accélèrent le prototype mais ajoutent des couches d’abstraction qui peuvent cacher ce qui est réellement envoyé au modèle. Beaucoup d’équipes commencent avec un framework et finissent par réécrire le cœur en Python simple ; d’autres s’appuient durablement sur LangGraph ou LlamaIndex. Ce chapitre présente les principaux et aide à choisir.</p>",
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
  "lit": "graphe",
  "look": {},
  "scene": "graphe",
  "fig": "",
  "panel": "<h2>Un graphe LangGraph</h2><div class=\"psub\">nœuds, arêtes, état partagé</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>État</b><i>TypedDict partagé</i></span><pre class=\"ex\">class Etat(TypedDict):\n    messages: Annotated[list, add_messages]</pre></li><li class=\"\"><span class=\"st\"><b>Nœud agent</b><i>appelle le modèle</i></span><pre class=\"ex\">def agent(e): return {&#x27;messages&#x27;: [llm.invoke(e[&#x27;messages&#x27;])]}</pre></li><li class=\"red\"><span class=\"st\"><b>Arête conditionnelle</b><i>outil ou fin ?</i></span><pre class=\"ex\">g.add_conditional_edges(&#x27;agent&#x27;, tools_condition)</pre></li><li class=\"\"><span class=\"st\"><b>Nœud outils</b><i>exécute</i></span><pre class=\"ex\">g.add_node(&#x27;tools&#x27;, ToolNode(outils))</pre></li><li class=\"\"><span class=\"st\"><b>Retour</b><i>vers l’agent</i></span><pre class=\"ex\">g.add_edge(&#x27;tools&#x27;, &#x27;agent&#x27;)</pre></li><li class=\"blue\"><span class=\"st\"><b>Compilation</b><i>avec points de contrôle</i></span><pre class=\"ex\">app = g.compile(checkpointer=PostgresSaver(...))</pre></li></ol><p class=\"note\">LangGraph décrit une application comme un graphe d’états : des nœuds (fonctions) qui lisent et modifient un état partagé, des arêtes (parfois conditionnelles) entre eux. Le point de contrôle après chaque nœud permet la reprise, le retour en arrière et les pauses pour validation humaine.</p><table class=\"data\"><tr><th>modèle</th><td>machine à états</td></tr><tr><th>persistance</th><td>checkpointer</td></tr><tr><th>pauses</th><td>interrupt()</td></tr></table>"
 },
 {
  "kicker": "18.1",
  "title": "LangChain",
  "sub": "la boîte à outils la plus répandue",
  "body": "<p class=\"lede\"><b>LangChain</b> fournit des interfaces communes pour les modèles, les prompts, les outils, les chargeurs de documents, les bases vectorielles, et des centaines d’intégrations.</p>\n    <pre class=\"code\">from langchain.chat_models import init_chat_model\nfrom langchain_core.prompts import ChatPromptTemplate\nllm = init_chat_model(&#x27;anthropic:claude-sonnet-5-5&#x27;)\nchaine = ChatPromptTemplate.from_messages([(&#x27;system&#x27;, &#x27;Résume en {n} points.&#x27;), (&#x27;user&#x27;, &#x27;{texte}&#x27;)]) | llm\nchaine.invoke({&#x27;n&#x27;: 3, &#x27;texte&#x27;: doc})</pre>\n    <ul class=\"rules\"><li>Points forts : écosystème, intégrations, documentation, communauté.</li><li>Points faibles : nombreuses abstractions, évolutions rapides de l’API, débogage parfois difficile.</li><li>Les agents LangChain reposent désormais sur LangGraph ; l’observabilité passe par LangSmith.</li></ul>",
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
  "lit": "graphe",
  "look": {},
  "scene": "graphe",
  "fig": "",
  "panel": "<h2>Un graphe LangGraph</h2><div class=\"psub\">nœuds, arêtes, état partagé</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>État</b><i>TypedDict partagé</i></span><pre class=\"ex\">class Etat(TypedDict):\n    messages: Annotated[list, add_messages]</pre></li><li class=\"\"><span class=\"st\"><b>Nœud agent</b><i>appelle le modèle</i></span><pre class=\"ex\">def agent(e): return {&#x27;messages&#x27;: [llm.invoke(e[&#x27;messages&#x27;])]}</pre></li><li class=\"red\"><span class=\"st\"><b>Arête conditionnelle</b><i>outil ou fin ?</i></span><pre class=\"ex\">g.add_conditional_edges(&#x27;agent&#x27;, tools_condition)</pre></li><li class=\"\"><span class=\"st\"><b>Nœud outils</b><i>exécute</i></span><pre class=\"ex\">g.add_node(&#x27;tools&#x27;, ToolNode(outils))</pre></li><li class=\"\"><span class=\"st\"><b>Retour</b><i>vers l’agent</i></span><pre class=\"ex\">g.add_edge(&#x27;tools&#x27;, &#x27;agent&#x27;)</pre></li><li class=\"blue\"><span class=\"st\"><b>Compilation</b><i>avec points de contrôle</i></span><pre class=\"ex\">app = g.compile(checkpointer=PostgresSaver(...))</pre></li></ol><p class=\"note\">LangGraph décrit une application comme un graphe d’états : des nœuds (fonctions) qui lisent et modifient un état partagé, des arêtes (parfois conditionnelles) entre eux. Le point de contrôle après chaque nœud permet la reprise, le retour en arrière et les pauses pour validation humaine.</p><table class=\"data\"><tr><th>modèle</th><td>machine à états</td></tr><tr><th>persistance</th><td>checkpointer</td></tr><tr><th>pauses</th><td>interrupt()</td></tr></table>"
 },
 {
  "kicker": "18.2",
  "title": "LangGraph",
  "sub": "des agents sous forme de graphes",
  "body": "<p class=\"lede\"><b>LangGraph</b> (équipe LangChain) construit des applications agentiques comme des <b>graphes d’états</b> : contrôle fin du flux, boucles, branches, parallélisme, persistance, reprise, humain dans la boucle.</p>\n    <ul class=\"rules\"><li>Bas niveau et explicite : on voit exactement le flux.</li><li><b>Checkpointers</b> (mémoire, SQLite, Postgres) : chaque étape est sauvegardée ; on peut reprendre, rejouer, « voyager dans le temps ».</li><li><code>interrupt()</code> met le graphe en pause pour une validation humaine.</li><li>Sous-graphes pour les multi-agents ; streaming des étapes et des jetons ; déploiement sur LangGraph Platform ou ses propres serveurs.</li></ul>\n    <p>C’est aujourd’hui l’un des choix les plus courants pour des agents de production qui ont besoin d’état durable.</p>",
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
  "lit": "graphe",
  "look": {},
  "scene": "graphe",
  "fig": "",
  "panel": "<h2>Un graphe LangGraph</h2><div class=\"psub\">nœuds, arêtes, état partagé</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>État</b><i>TypedDict partagé</i></span><pre class=\"ex\">class Etat(TypedDict):\n    messages: Annotated[list, add_messages]</pre></li><li class=\"\"><span class=\"st\"><b>Nœud agent</b><i>appelle le modèle</i></span><pre class=\"ex\">def agent(e): return {&#x27;messages&#x27;: [llm.invoke(e[&#x27;messages&#x27;])]}</pre></li><li class=\"red\"><span class=\"st\"><b>Arête conditionnelle</b><i>outil ou fin ?</i></span><pre class=\"ex\">g.add_conditional_edges(&#x27;agent&#x27;, tools_condition)</pre></li><li class=\"\"><span class=\"st\"><b>Nœud outils</b><i>exécute</i></span><pre class=\"ex\">g.add_node(&#x27;tools&#x27;, ToolNode(outils))</pre></li><li class=\"\"><span class=\"st\"><b>Retour</b><i>vers l’agent</i></span><pre class=\"ex\">g.add_edge(&#x27;tools&#x27;, &#x27;agent&#x27;)</pre></li><li class=\"blue\"><span class=\"st\"><b>Compilation</b><i>avec points de contrôle</i></span><pre class=\"ex\">app = g.compile(checkpointer=PostgresSaver(...))</pre></li></ol><p class=\"note\">LangGraph décrit une application comme un graphe d’états : des nœuds (fonctions) qui lisent et modifient un état partagé, des arêtes (parfois conditionnelles) entre eux. Le point de contrôle après chaque nœud permet la reprise, le retour en arrière et les pauses pour validation humaine.</p><table class=\"data\"><tr><th>modèle</th><td>machine à états</td></tr><tr><th>persistance</th><td>checkpointer</td></tr><tr><th>pauses</th><td>interrupt()</td></tr></table>"
 },
 {
  "kicker": "18.3",
  "title": "LlamaIndex",
  "sub": "le framework des données",
  "body": "<p class=\"lede\"><b>LlamaIndex</b> est centré sur le RAG et les données : chargeurs (LlamaHub), analyse de documents (LlamaParse), découpage, index, moteurs de requête, agents et workflows.</p>\n    <pre class=\"code\">from llama_index.core import VectorStoreIndex, SimpleDirectoryReader\ndocs = SimpleDirectoryReader(&#x27;./docs&#x27;).load_data()\nindex = VectorStoreIndex.from_documents(docs)\nreponse = index.as_query_engine(similarity_top_k=5).query(&#x27;Quel est le préavis ?&#x27;)\nprint(reponse, reponse.source_nodes)</pre>\n    <p>Points forts : RAG avancé prêt à l’emploi (parent-enfant, fenêtres de phrases, reranking, graphes de propriétés), très bonne analyse de documents complexes. Les <b>Workflows</b> (événements et étapes asynchrones) structurent les applications agentiques.</p>",
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
  "lit": "graphe",
  "look": {},
  "scene": "graphe",
  "fig": "",
  "panel": "<h2>Un graphe LangGraph</h2><div class=\"psub\">nœuds, arêtes, état partagé</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>État</b><i>TypedDict partagé</i></span><pre class=\"ex\">class Etat(TypedDict):\n    messages: Annotated[list, add_messages]</pre></li><li class=\"\"><span class=\"st\"><b>Nœud agent</b><i>appelle le modèle</i></span><pre class=\"ex\">def agent(e): return {&#x27;messages&#x27;: [llm.invoke(e[&#x27;messages&#x27;])]}</pre></li><li class=\"red\"><span class=\"st\"><b>Arête conditionnelle</b><i>outil ou fin ?</i></span><pre class=\"ex\">g.add_conditional_edges(&#x27;agent&#x27;, tools_condition)</pre></li><li class=\"\"><span class=\"st\"><b>Nœud outils</b><i>exécute</i></span><pre class=\"ex\">g.add_node(&#x27;tools&#x27;, ToolNode(outils))</pre></li><li class=\"\"><span class=\"st\"><b>Retour</b><i>vers l’agent</i></span><pre class=\"ex\">g.add_edge(&#x27;tools&#x27;, &#x27;agent&#x27;)</pre></li><li class=\"blue\"><span class=\"st\"><b>Compilation</b><i>avec points de contrôle</i></span><pre class=\"ex\">app = g.compile(checkpointer=PostgresSaver(...))</pre></li></ol><p class=\"note\">LangGraph décrit une application comme un graphe d’états : des nœuds (fonctions) qui lisent et modifient un état partagé, des arêtes (parfois conditionnelles) entre eux. Le point de contrôle après chaque nœud permet la reprise, le retour en arrière et les pauses pour validation humaine.</p><table class=\"data\"><tr><th>modèle</th><td>machine à états</td></tr><tr><th>persistance</th><td>checkpointer</td></tr><tr><th>pauses</th><td>interrupt()</td></tr></table>"
 },
 {
  "kicker": "18.4",
  "title": "Haystack",
  "sub": "des pipelines pour la production",
  "body": "<p class=\"lede\"><b>Haystack</b> (deepset) assemble des <b>composants</b> (convertisseurs, découpeurs, plongeurs, récupérateurs, générateurs) en <b>pipelines</b> explicites, sérialisables en YAML.</p>\n    <pre class=\"code\">p = Pipeline()\np.add_component(&#x27;emb&#x27;, SentenceTransformersTextEmbedder())\np.add_component(&#x27;ret&#x27;, QdrantEmbeddingRetriever(document_store=store, top_k=5))\np.add_component(&#x27;prompt&#x27;, ChatPromptBuilder(template=gabarit))\np.add_component(&#x27;llm&#x27;, AnthropicChatGenerator())\np.connect(&#x27;emb.embedding&#x27;, &#x27;ret.query_embedding&#x27;); p.connect(&#x27;ret&#x27;, &#x27;prompt.documents&#x27;); p.connect(&#x27;prompt&#x27;, &#x27;llm&#x27;)</pre>\n    <p>Apprécié pour sa clarté, la vérification des types entre composants et son orientation production (recherche, RAG, agents) ; populaire en Europe.</p>",
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
  "lit": "graphe",
  "look": {},
  "scene": "graphe",
  "fig": "",
  "panel": "<h2>Un graphe LangGraph</h2><div class=\"psub\">nœuds, arêtes, état partagé</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>État</b><i>TypedDict partagé</i></span><pre class=\"ex\">class Etat(TypedDict):\n    messages: Annotated[list, add_messages]</pre></li><li class=\"\"><span class=\"st\"><b>Nœud agent</b><i>appelle le modèle</i></span><pre class=\"ex\">def agent(e): return {&#x27;messages&#x27;: [llm.invoke(e[&#x27;messages&#x27;])]}</pre></li><li class=\"red\"><span class=\"st\"><b>Arête conditionnelle</b><i>outil ou fin ?</i></span><pre class=\"ex\">g.add_conditional_edges(&#x27;agent&#x27;, tools_condition)</pre></li><li class=\"\"><span class=\"st\"><b>Nœud outils</b><i>exécute</i></span><pre class=\"ex\">g.add_node(&#x27;tools&#x27;, ToolNode(outils))</pre></li><li class=\"\"><span class=\"st\"><b>Retour</b><i>vers l’agent</i></span><pre class=\"ex\">g.add_edge(&#x27;tools&#x27;, &#x27;agent&#x27;)</pre></li><li class=\"blue\"><span class=\"st\"><b>Compilation</b><i>avec points de contrôle</i></span><pre class=\"ex\">app = g.compile(checkpointer=PostgresSaver(...))</pre></li></ol><p class=\"note\">LangGraph décrit une application comme un graphe d’états : des nœuds (fonctions) qui lisent et modifient un état partagé, des arêtes (parfois conditionnelles) entre eux. Le point de contrôle après chaque nœud permet la reprise, le retour en arrière et les pauses pour validation humaine.</p><table class=\"data\"><tr><th>modèle</th><td>machine à états</td></tr><tr><th>persistance</th><td>checkpointer</td></tr><tr><th>pauses</th><td>interrupt()</td></tr></table>"
 },
 {
  "kicker": "18.5",
  "title": "Semantic Kernel",
  "sub": "l’orchestrateur de Microsoft",
  "body": "<p class=\"lede\"><b>Semantic Kernel</b> (Microsoft, C#, Python, Java) intègre les modèles dans des applications d’entreprise : <b>plugins</b> (fonctions exposées au modèle), connecteurs Azure OpenAI et autres, mémoire, filtres, télémétrie.</p>\n    <ul class=\"rules\"><li>Naturel dans un environnement .NET et Azure.</li><li>Les plugins sont de simples classes annotées ; le noyau gère l’appel automatique de fonctions.</li><li>Microsoft regroupe Semantic Kernel et AutoGen dans le <b>Microsoft Agent Framework</b> : vérifier la version et la feuille de route actuelles avant de démarrer un projet.</li></ul>",
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
  "lit": "graphe",
  "look": {},
  "scene": "graphe",
  "fig": "",
  "panel": "<h2>Un graphe LangGraph</h2><div class=\"psub\">nœuds, arêtes, état partagé</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>État</b><i>TypedDict partagé</i></span><pre class=\"ex\">class Etat(TypedDict):\n    messages: Annotated[list, add_messages]</pre></li><li class=\"\"><span class=\"st\"><b>Nœud agent</b><i>appelle le modèle</i></span><pre class=\"ex\">def agent(e): return {&#x27;messages&#x27;: [llm.invoke(e[&#x27;messages&#x27;])]}</pre></li><li class=\"red\"><span class=\"st\"><b>Arête conditionnelle</b><i>outil ou fin ?</i></span><pre class=\"ex\">g.add_conditional_edges(&#x27;agent&#x27;, tools_condition)</pre></li><li class=\"\"><span class=\"st\"><b>Nœud outils</b><i>exécute</i></span><pre class=\"ex\">g.add_node(&#x27;tools&#x27;, ToolNode(outils))</pre></li><li class=\"\"><span class=\"st\"><b>Retour</b><i>vers l’agent</i></span><pre class=\"ex\">g.add_edge(&#x27;tools&#x27;, &#x27;agent&#x27;)</pre></li><li class=\"blue\"><span class=\"st\"><b>Compilation</b><i>avec points de contrôle</i></span><pre class=\"ex\">app = g.compile(checkpointer=PostgresSaver(...))</pre></li></ol><p class=\"note\">LangGraph décrit une application comme un graphe d’états : des nœuds (fonctions) qui lisent et modifient un état partagé, des arêtes (parfois conditionnelles) entre eux. Le point de contrôle après chaque nœud permet la reprise, le retour en arrière et les pauses pour validation humaine.</p><table class=\"data\"><tr><th>modèle</th><td>machine à états</td></tr><tr><th>persistance</th><td>checkpointer</td></tr><tr><th>pauses</th><td>interrupt()</td></tr></table>"
 },
 {
  "kicker": "18.6",
  "title": "Pydantic AI",
  "sub": "des agents typés",
  "body": "<p class=\"lede\"><b>Pydantic AI</b> (par l’équipe de Pydantic) apporte aux agents le style de FastAPI : types Python, validation, injection de dépendances, sorties structurées.</p>\n    <pre class=\"code\">class Reponse(BaseModel):\n    categorie: Literal[&#x27;facturation&#x27;, &#x27;technique&#x27;, &#x27;compte&#x27;]\n    urgence: int = Field(ge=1, le=5)\nagent = Agent(&#x27;anthropic:claude-sonnet-5-5&#x27;, output_type=Reponse, deps_type=Client,\n              system_prompt=&#x27;Classe le ticket.&#x27;)\n@agent.tool\nasync def historique(ctx: RunContext[Client]) -&gt; list[str]:\n    return await ctx.deps.tickets_recents()\nr = await agent.run(texte, deps=client)   # r.output : Reponse validée</pre>\n    <p>Léger, explicite, agnostique du fournisseur, bien intégré à Logfire pour l’observabilité. Un bon choix pour des agents en Python typé sans grosse abstraction.</p>",
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
  "lit": "graphe",
  "look": {},
  "scene": "graphe",
  "fig": "",
  "panel": "<h2>Un graphe LangGraph</h2><div class=\"psub\">nœuds, arêtes, état partagé</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>État</b><i>TypedDict partagé</i></span><pre class=\"ex\">class Etat(TypedDict):\n    messages: Annotated[list, add_messages]</pre></li><li class=\"\"><span class=\"st\"><b>Nœud agent</b><i>appelle le modèle</i></span><pre class=\"ex\">def agent(e): return {&#x27;messages&#x27;: [llm.invoke(e[&#x27;messages&#x27;])]}</pre></li><li class=\"red\"><span class=\"st\"><b>Arête conditionnelle</b><i>outil ou fin ?</i></span><pre class=\"ex\">g.add_conditional_edges(&#x27;agent&#x27;, tools_condition)</pre></li><li class=\"\"><span class=\"st\"><b>Nœud outils</b><i>exécute</i></span><pre class=\"ex\">g.add_node(&#x27;tools&#x27;, ToolNode(outils))</pre></li><li class=\"\"><span class=\"st\"><b>Retour</b><i>vers l’agent</i></span><pre class=\"ex\">g.add_edge(&#x27;tools&#x27;, &#x27;agent&#x27;)</pre></li><li class=\"blue\"><span class=\"st\"><b>Compilation</b><i>avec points de contrôle</i></span><pre class=\"ex\">app = g.compile(checkpointer=PostgresSaver(...))</pre></li></ol><p class=\"note\">LangGraph décrit une application comme un graphe d’états : des nœuds (fonctions) qui lisent et modifient un état partagé, des arêtes (parfois conditionnelles) entre eux. Le point de contrôle après chaque nœud permet la reprise, le retour en arrière et les pauses pour validation humaine.</p><table class=\"data\"><tr><th>modèle</th><td>machine à états</td></tr><tr><th>persistance</th><td>checkpointer</td></tr><tr><th>pauses</th><td>interrupt()</td></tr></table>"
 },
 {
  "kicker": "18.7",
  "title": "DSPy",
  "sub": "programmer plutôt que prompter",
  "body": "<p class=\"lede\"><b>DSPy</b> (Stanford) remplace les prompts écrits à la main par des <b>signatures</b> (entrées → sorties) et des <b>modules</b>, puis <b>optimise</b> automatiquement les instructions et les exemples à partir d’un jeu de données et d’une métrique.</p>\n    <pre class=\"code\">class Repondre(dspy.Signature):\n    &quot;&quot;&quot;Répond à la question à partir du contexte.&quot;&quot;&quot;\n    contexte: list[str] = dspy.InputField()\n    question: str = dspy.InputField()\n    reponse: str = dspy.OutputField()\nprog = dspy.ChainOfThought(Repondre)\noptimise = dspy.MIPROv2(metric=exactitude).compile(prog, trainset=exemples)</pre>\n    <p>Intéressant quand on a une métrique claire et quelques dizaines à centaines d’exemples : l’optimiseur trouve des prompts que l’on n’aurait pas écrits, et l’on peut changer de modèle en réoptimisant.</p>",
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
  "lit": "graphe",
  "look": {},
  "scene": "graphe",
  "fig": "",
  "panel": "<h2>Un graphe LangGraph</h2><div class=\"psub\">nœuds, arêtes, état partagé</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>État</b><i>TypedDict partagé</i></span><pre class=\"ex\">class Etat(TypedDict):\n    messages: Annotated[list, add_messages]</pre></li><li class=\"\"><span class=\"st\"><b>Nœud agent</b><i>appelle le modèle</i></span><pre class=\"ex\">def agent(e): return {&#x27;messages&#x27;: [llm.invoke(e[&#x27;messages&#x27;])]}</pre></li><li class=\"red\"><span class=\"st\"><b>Arête conditionnelle</b><i>outil ou fin ?</i></span><pre class=\"ex\">g.add_conditional_edges(&#x27;agent&#x27;, tools_condition)</pre></li><li class=\"\"><span class=\"st\"><b>Nœud outils</b><i>exécute</i></span><pre class=\"ex\">g.add_node(&#x27;tools&#x27;, ToolNode(outils))</pre></li><li class=\"\"><span class=\"st\"><b>Retour</b><i>vers l’agent</i></span><pre class=\"ex\">g.add_edge(&#x27;tools&#x27;, &#x27;agent&#x27;)</pre></li><li class=\"blue\"><span class=\"st\"><b>Compilation</b><i>avec points de contrôle</i></span><pre class=\"ex\">app = g.compile(checkpointer=PostgresSaver(...))</pre></li></ol><p class=\"note\">LangGraph décrit une application comme un graphe d’états : des nœuds (fonctions) qui lisent et modifient un état partagé, des arêtes (parfois conditionnelles) entre eux. Le point de contrôle après chaque nœud permet la reprise, le retour en arrière et les pauses pour validation humaine.</p><table class=\"data\"><tr><th>modèle</th><td>machine à états</td></tr><tr><th>persistance</th><td>checkpointer</td></tr><tr><th>pauses</th><td>interrupt()</td></tr></table>"
 },
 {
  "kicker": "18.8",
  "title": "CrewAI",
  "sub": "des équipes d’agents à rôles",
  "body": "<p class=\"lede\"><b>CrewAI</b> décrit un système multi-agents comme une <b>équipe</b> : des agents avec un rôle, un objectif et une histoire, des tâches, et un processus (séquentiel ou hiérarchique).</p>\n    <pre class=\"code\">chercheur = Agent(role=&#x27;Analyste marché&#x27;, goal=&#x27;Trouver les chiffres clés&#x27;, tools=[recherche_web])\nredacteur = Agent(role=&#x27;Rédacteur&#x27;, goal=&#x27;Écrire une note claire de 1 page&#x27;)\nequipe = Crew(agents=[chercheur, redacteur],\n             tasks=[Task(description=&#x27;Marché des GPU cloud en Europe&#x27;, agent=chercheur),\n                    Task(description=&#x27;Rédiger la note&#x27;, agent=redacteur)])\nequipe.kickoff()</pre>\n    <p>Très rapide pour prototyper un système multi-agents lisible ; les <b>Flows</b> ajoutent un contrôle plus déterministe. Comme pour tout multi-agents, mesurer le coût et la fiabilité réels.</p>",
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
  "lit": "graphe",
  "look": {},
  "scene": "graphe",
  "fig": "",
  "panel": "<h2>Un graphe LangGraph</h2><div class=\"psub\">nœuds, arêtes, état partagé</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>État</b><i>TypedDict partagé</i></span><pre class=\"ex\">class Etat(TypedDict):\n    messages: Annotated[list, add_messages]</pre></li><li class=\"\"><span class=\"st\"><b>Nœud agent</b><i>appelle le modèle</i></span><pre class=\"ex\">def agent(e): return {&#x27;messages&#x27;: [llm.invoke(e[&#x27;messages&#x27;])]}</pre></li><li class=\"red\"><span class=\"st\"><b>Arête conditionnelle</b><i>outil ou fin ?</i></span><pre class=\"ex\">g.add_conditional_edges(&#x27;agent&#x27;, tools_condition)</pre></li><li class=\"\"><span class=\"st\"><b>Nœud outils</b><i>exécute</i></span><pre class=\"ex\">g.add_node(&#x27;tools&#x27;, ToolNode(outils))</pre></li><li class=\"\"><span class=\"st\"><b>Retour</b><i>vers l’agent</i></span><pre class=\"ex\">g.add_edge(&#x27;tools&#x27;, &#x27;agent&#x27;)</pre></li><li class=\"blue\"><span class=\"st\"><b>Compilation</b><i>avec points de contrôle</i></span><pre class=\"ex\">app = g.compile(checkpointer=PostgresSaver(...))</pre></li></ol><p class=\"note\">LangGraph décrit une application comme un graphe d’états : des nœuds (fonctions) qui lisent et modifient un état partagé, des arêtes (parfois conditionnelles) entre eux. Le point de contrôle après chaque nœud permet la reprise, le retour en arrière et les pauses pour validation humaine.</p><table class=\"data\"><tr><th>modèle</th><td>machine à états</td></tr><tr><th>persistance</th><td>checkpointer</td></tr><tr><th>pauses</th><td>interrupt()</td></tr></table>"
 },
 {
  "kicker": "18.9",
  "title": "AutoGen",
  "sub": "des agents qui conversent",
  "body": "<p class=\"lede\"><b>AutoGen</b> (Microsoft Research) a popularisé les systèmes où des agents <b>conversent</b> entre eux (et avec des humains) pour résoudre une tâche, y compris en écrivant et exécutant du code.</p>\n    <ul class=\"rules\"><li>Version 0.4 et suivantes : architecture asynchrone par événements, AgentChat (haut niveau), Core (bas niveau), AutoGen Studio (interface sans code).</li><li>Motifs : discussion de groupe avec sélecteur d’orateur, équipes, exécution de code en conteneur.</li><li>Le projet communautaire <b>AG2</b> poursuit l’ancienne API ; Microsoft converge vers le Microsoft Agent Framework. Bien vérifier quelle branche on adopte.</li></ul>",
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
  "lit": "graphe",
  "look": {},
  "scene": "graphe",
  "fig": "",
  "panel": "<h2>Un graphe LangGraph</h2><div class=\"psub\">nœuds, arêtes, état partagé</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>État</b><i>TypedDict partagé</i></span><pre class=\"ex\">class Etat(TypedDict):\n    messages: Annotated[list, add_messages]</pre></li><li class=\"\"><span class=\"st\"><b>Nœud agent</b><i>appelle le modèle</i></span><pre class=\"ex\">def agent(e): return {&#x27;messages&#x27;: [llm.invoke(e[&#x27;messages&#x27;])]}</pre></li><li class=\"red\"><span class=\"st\"><b>Arête conditionnelle</b><i>outil ou fin ?</i></span><pre class=\"ex\">g.add_conditional_edges(&#x27;agent&#x27;, tools_condition)</pre></li><li class=\"\"><span class=\"st\"><b>Nœud outils</b><i>exécute</i></span><pre class=\"ex\">g.add_node(&#x27;tools&#x27;, ToolNode(outils))</pre></li><li class=\"\"><span class=\"st\"><b>Retour</b><i>vers l’agent</i></span><pre class=\"ex\">g.add_edge(&#x27;tools&#x27;, &#x27;agent&#x27;)</pre></li><li class=\"blue\"><span class=\"st\"><b>Compilation</b><i>avec points de contrôle</i></span><pre class=\"ex\">app = g.compile(checkpointer=PostgresSaver(...))</pre></li></ol><p class=\"note\">LangGraph décrit une application comme un graphe d’états : des nœuds (fonctions) qui lisent et modifient un état partagé, des arêtes (parfois conditionnelles) entre eux. Le point de contrôle après chaque nœud permet la reprise, le retour en arrière et les pauses pour validation humaine.</p><table class=\"data\"><tr><th>modèle</th><td>machine à états</td></tr><tr><th>persistance</th><td>checkpointer</td></tr><tr><th>pauses</th><td>interrupt()</td></tr></table>"
 },
 {
  "kicker": "18.10",
  "title": "L’orchestration des workflows",
  "sub": "au-delà de l’appel au modèle",
  "body": "<p class=\"lede\">Une application d’IA en production a aussi besoin d’orchestration <b>classique</b> : tâches longues, reprises, planification, files de messages.</p>\n    <table class=\"data\"><tr><th>outil</th><th>usage</th></tr><tr><td>Temporal</td><td>workflows durables : reprise exacte après panne, attentes de plusieurs jours</td></tr><tr><td>Celery, RQ, Dramatiq</td><td>tâches en arrière-plan Python</td></tr><tr><td>Airflow, Dagster, Prefect</td><td>pipelines de données planifiés (ingestion RAG, évaluations)</td></tr><tr><td>Inngest, Restate, Hatchet</td><td>fonctions durables orientées événements</td></tr><tr><td>LangGraph Platform</td><td>agents LangGraph avec état, files, reprise</td></tr></table>\n    <p>Une règle utile : la logique d’<b>agent</b> (quel outil, quel prompt) dans le framework d’IA ; la <b>durabilité</b> (réessais, reprise, délais longs) dans un moteur de workflow éprouvé.</p>",
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
  "lit": "graphe",
  "look": {},
  "scene": "graphe",
  "fig": "",
  "panel": "<h2>Un graphe LangGraph</h2><div class=\"psub\">nœuds, arêtes, état partagé</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>État</b><i>TypedDict partagé</i></span><pre class=\"ex\">class Etat(TypedDict):\n    messages: Annotated[list, add_messages]</pre></li><li class=\"\"><span class=\"st\"><b>Nœud agent</b><i>appelle le modèle</i></span><pre class=\"ex\">def agent(e): return {&#x27;messages&#x27;: [llm.invoke(e[&#x27;messages&#x27;])]}</pre></li><li class=\"red\"><span class=\"st\"><b>Arête conditionnelle</b><i>outil ou fin ?</i></span><pre class=\"ex\">g.add_conditional_edges(&#x27;agent&#x27;, tools_condition)</pre></li><li class=\"\"><span class=\"st\"><b>Nœud outils</b><i>exécute</i></span><pre class=\"ex\">g.add_node(&#x27;tools&#x27;, ToolNode(outils))</pre></li><li class=\"\"><span class=\"st\"><b>Retour</b><i>vers l’agent</i></span><pre class=\"ex\">g.add_edge(&#x27;tools&#x27;, &#x27;agent&#x27;)</pre></li><li class=\"blue\"><span class=\"st\"><b>Compilation</b><i>avec points de contrôle</i></span><pre class=\"ex\">app = g.compile(checkpointer=PostgresSaver(...))</pre></li></ol><p class=\"note\">LangGraph décrit une application comme un graphe d’états : des nœuds (fonctions) qui lisent et modifient un état partagé, des arêtes (parfois conditionnelles) entre eux. Le point de contrôle après chaque nœud permet la reprise, le retour en arrière et les pauses pour validation humaine.</p><table class=\"data\"><tr><th>modèle</th><td>machine à états</td></tr><tr><th>persistance</th><td>checkpointer</td></tr><tr><th>pauses</th><td>interrupt()</td></tr></table>"
 },
 {
  "kicker": "18.11",
  "title": "Choisir un framework",
  "sub": "critères et compromis",
  "body": "<p class=\"lede\">Aucun framework n’est le meilleur partout. Questions à se poser :</p>\n    <table class=\"data\"><tr><th>besoin</th><th>piste</th></tr><tr><td>RAG sur des documents complexes</td><td>LlamaIndex, Haystack</td></tr><tr><td>agents avec état durable, reprise, validation humaine</td><td>LangGraph</td></tr><tr><td>agents Python typés, légers</td><td>Pydantic AI, SDK d’agents des fournisseurs</td></tr><tr><td>environnement .NET / Azure</td><td>Semantic Kernel / Microsoft Agent Framework</td></tr><tr><td>prototype multi-agents rapide</td><td>CrewAI</td></tr><tr><td>optimiser des prompts avec une métrique</td><td>DSPy</td></tr><tr><td>contrôle total, peu de dépendances</td><td>Python + SDK du fournisseur</td></tr></table>\n    <ul class=\"rules\"><li>Pouvoir voir et modifier le <b>prompt exact</b> envoyé au modèle.</li><li>Maturité, rythme des changements d’API, licence, communauté.</li><li>Observabilité et évaluation intégrées ou faciles à brancher.</li><li>Coût de sortie : garder sa logique métier hors du framework, derrière ses propres interfaces.</li></ul>",
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
  "lit": "graphe",
  "look": {},
  "scene": "graphe",
  "fig": "",
  "panel": "<h2>Un graphe LangGraph</h2><div class=\"psub\">nœuds, arêtes, état partagé</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>État</b><i>TypedDict partagé</i></span><pre class=\"ex\">class Etat(TypedDict):\n    messages: Annotated[list, add_messages]</pre></li><li class=\"\"><span class=\"st\"><b>Nœud agent</b><i>appelle le modèle</i></span><pre class=\"ex\">def agent(e): return {&#x27;messages&#x27;: [llm.invoke(e[&#x27;messages&#x27;])]}</pre></li><li class=\"red\"><span class=\"st\"><b>Arête conditionnelle</b><i>outil ou fin ?</i></span><pre class=\"ex\">g.add_conditional_edges(&#x27;agent&#x27;, tools_condition)</pre></li><li class=\"\"><span class=\"st\"><b>Nœud outils</b><i>exécute</i></span><pre class=\"ex\">g.add_node(&#x27;tools&#x27;, ToolNode(outils))</pre></li><li class=\"\"><span class=\"st\"><b>Retour</b><i>vers l’agent</i></span><pre class=\"ex\">g.add_edge(&#x27;tools&#x27;, &#x27;agent&#x27;)</pre></li><li class=\"blue\"><span class=\"st\"><b>Compilation</b><i>avec points de contrôle</i></span><pre class=\"ex\">app = g.compile(checkpointer=PostgresSaver(...))</pre></li></ol><p class=\"note\">LangGraph décrit une application comme un graphe d’états : des nœuds (fonctions) qui lisent et modifient un état partagé, des arêtes (parfois conditionnelles) entre eux. Le point de contrôle après chaque nœud permet la reprise, le retour en arrière et les pauses pour validation humaine.</p><table class=\"data\"><tr><th>modèle</th><td>machine à états</td></tr><tr><th>persistance</th><td>checkpointer</td></tr><tr><th>pauses</th><td>interrupt()</td></tr></table>"
 }
];
export const PLATES = {

};
