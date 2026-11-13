// Chapitre 22 : Comprendre l’inférence des modèles de langage (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 22 · Inférence",
  "title": "Comprendre l’inférence des modèles de langage",
  "sub": "le coût de chaque jeton",
  "body": "<p class=\"lede\">L’<b>inférence</b> est l’exécution du modèle pour répondre. Pour un service d’IA, c’est l’essentiel des coûts : un modèle est entraîné une fois, mais interrogé des millions de fois.</p>\n    <p>L’ingénierie de l’inférence cherche le meilleur compromis entre <b>latence</b> (vitesse pour chaque utilisateur), <b>débit</b> (jetons par seconde pour tous) et <b>coût</b> (GPU par million de jetons), sans sacrifier la qualité. Même en utilisant des API, comprendre ces mécanismes explique les prix, les limites et les latences.</p>",
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
  "lit": "cache",
  "look": {},
  "scene": "cache",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "22.1",
  "title": "Les fondamentaux de l’inférence",
  "sub": "génération autorégressive",
  "body": "<p class=\"lede\">Générer une réponse de N jetons demande N passes du modèle : chaque jeton produit est réinjecté pour calculer le suivant.</p>\n    <table class=\"data\"><tr><th>mesure</th><th>définition</th><th>ordre de grandeur</th></tr><tr><td>TTFT</td><td>temps jusqu’au premier jeton</td><td>0,1 à 2 s</td></tr><tr><td>TPOT / ITL</td><td>temps par jeton de sortie</td><td>10 à 50 ms</td></tr><tr><td>débit</td><td>jetons/s pour tout le serveur</td><td>milliers à dizaines de milliers</td></tr><tr><td>latence totale</td><td>TTFT + N × TPOT</td><td>500 jetons × 20 ms = 10 s</td></tr></table>\n    <p>À chaque jeton, il faut relire <b>tous les poids</b> depuis la mémoire : un modèle de 16 Go sur un GPU à 2 To/s ne peut pas dépasser ≈ 125 jetons/s pour une seule requête. La bande passante mémoire, plus que la puissance de calcul, fixe la vitesse de génération.</p>",
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
  "lit": "cache",
  "look": {},
  "scene": "cache",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "22.2",
  "title": "Préremplissage et décodage",
  "sub": "deux phases très différentes",
  "body": "<p class=\"lede\">Une requête passe par deux phases.</p>\n    <table class=\"data\"><tr><th></th><th>préremplissage (prefill)</th><th>décodage (decode)</th></tr><tr><td>quoi</td><td>lire tout le prompt d’un coup</td><td>produire les jetons un par un</td></tr><tr><td>parallélisme</td><td>tous les jetons du prompt en parallèle</td><td>un jeton par requête à chaque pas</td></tr><tr><td>limite</td><td>calcul (compute-bound)</td><td>bande passante mémoire (memory-bound)</td></tr><tr><td>mesure</td><td>TTFT</td><td>TPOT</td></tr><tr><td>coût API</td><td>jetons d’entrée (moins chers)</td><td>jetons de sortie (plus chers)</td></tr></table>\n    <p>Cette différence explique pourquoi la sortie coûte plus cher que l’entrée, et a donné lieu au <b>préremplissage par morceaux</b> (chunked prefill) et à la <b>désagrégation</b> (prefill et décodage sur des GPU différents).</p>",
  "cam": {
   "target": [
    80,
    1.8,
    0
   ],
   "az": 8,
   "el": 7,
   "dist": 26,
   "auto": true
  },
  "lit": "batch",
  "look": {},
  "scene": "batch",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "22.3",
  "title": "La gestion du cache clé-valeur",
  "sub": "la mémoire de l’attention",
  "body": "<p class=\"lede\">Le <b>cache KV</b> garde les clés et valeurs de tous les jetons déjà traités, pour chaque couche. Sa taille par jeton :</p>\n    <div class=\"eq\">2 × couches × têtes_KV × dim_tête × octets</div>\n    <ul class=\"rules\"><li>Exemple (32 couches, 8 têtes KV de 128, bf16) : 128 Ko par jeton, 4 Go pour 32 000 jetons.</li><li><b>GQA / MQA</b> réduisent le nombre de têtes KV ; <b>MLA</b> (DeepSeek) compresse le cache.</li><li><b>Quantifier</b> le cache en 8 bits (fp8) le divise par 2.</li><li><b>Cache de préfixe</b> : réutiliser le cache d’un début de prompt commun (instructions, documents) entre requêtes. C’est le « prompt caching » des API, et le RadixAttention de SGLang.</li><li>Quand le cache est plein, le serveur met des requêtes en attente ou les évince.</li></ul>",
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
  "lit": "cache",
  "look": {},
  "scene": "cache",
  "fig": "",
  "panel": "<h2>Calculer la taille du cache</h2><div class=\"psub\">à partir du config.json</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Lire</b><i></i></span><pre class=\"ex\">c = json.load(open(&#x27;config.json&#x27;))</pre></li><li class=\"blue\"><span class=\"st\"><b>Par jeton</b><i></i></span><pre class=\"ex\">par_jeton = 2 * c[&#x27;num_hidden_layers&#x27;] * c[&#x27;num_key_value_heads&#x27;] \\\n  * (c[&#x27;hidden_size&#x27;] // c[&#x27;num_attention_heads&#x27;]) * 2   # octets bf16</pre></li><li class=\"\"><span class=\"st\"><b>Pour la charge</b><i></i></span><pre class=\"ex\">total = par_jeton * contexte_moyen * requetes_simultanees</pre></li><li class=\"red\"><span class=\"st\"><b>Exemple</b><i></i></span><pre class=\"ex\">131 072 o × 8 000 × 20 ≈ 21 Go</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "22.4",
  "title": "Le batching continu",
  "sub": "ne jamais laisser le GPU attendre",
  "body": "<p class=\"lede\">Avec un batching <b>statique</b>, on attend que toutes les requêtes d’un lot soient finies avant d’en lancer d’autres : une longue réponse bloque les places libérées par les courtes.</p>\n    <p>Le <b>batching continu</b> (in-flight batching, Orca 2022) recompose le lot à <b>chaque pas</b> de décodage : une requête terminée sort, une nouvelle entre immédiatement.</p>\n    <ul class=\"rules\"><li>Gain de débit de plusieurs fois par rapport au batching statique.</li><li>Implémenté par tous les serveurs modernes : vLLM, SGLang, TGI, TensorRT-LLM.</li><li>Réglages : nombre maximal de séquences simultanées, jetons par pas, part réservée au préremplissage.</li></ul>",
  "cam": {
   "target": [
    80,
    1.8,
    0
   ],
   "az": 8,
   "el": 7,
   "dist": 26,
   "auto": true
  },
  "lit": "batch",
  "look": {},
  "scene": "batch",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "22.5",
  "title": "PagedAttention",
  "sub": "la mémoire virtuelle du cache",
  "body": "<p class=\"lede\">Avant 2023, chaque requête réservait d’avance un bloc de cache contigu de la taille maximale : 60 à 80 % de la mémoire était gaspillée.</p>\n    <p><b>PagedAttention</b> (vLLM, 2023) découpe le cache en petits <b>blocs</b> (16 jetons par exemple) alloués à la demande, comme les pages de la mémoire virtuelle d’un système d’exploitation. Une table relie chaque séquence à ses blocs.</p>\n    <ul class=\"rules\"><li>Presque plus de gaspillage : beaucoup plus de requêtes simultanées.</li><li>Partage de blocs entre séquences (même préfixe, échantillonnage parallèle) par copie à l’écriture.</li><li>Base de vLLM, reprise par la plupart des serveurs.</li></ul>",
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
  "lit": "mem",
  "look": {},
  "scene": "mem",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "22.6",
  "title": "Le décodage spéculatif",
  "sub": "deviner plusieurs jetons, vérifier d’un coup",
  "body": "<p class=\"lede\">Le décodage est limité par la mémoire : le GPU a du calcul disponible. Le <b>décodage spéculatif</b> en profite.</p>\n    <ul class=\"rules\"><li>Un mécanisme rapide <b>propose</b> plusieurs jetons (petit modèle « brouillon », têtes supplémentaires Medusa/EAGLE, recherche de n-grammes dans le prompt).</li><li>Le grand modèle les <b>vérifie</b> tous en une seule passe (comme un préremplissage).</li><li>On garde le plus long préfixe accepté ; le résultat est <b>identique</b> en distribution à la génération normale.</li><li>Gain typique : 2 à 3 fois plus rapide quand les propositions sont souvent acceptées (code, réécriture, extraction).</li></ul>",
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
  "lit": "cache",
  "look": {},
  "scene": "cache",
  "fig": "",
  "panel": "<h2>Activer le décodage spéculatif dans vLLM</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Modèle brouillon</b><i></i></span><pre class=\"ex\">vllm serve meta-llama/Llama-3.1-70B-Instruct \\\n  --speculative-config &#x27;{&quot;model&quot;: &quot;meta-llama/Llama-3.2-1B-Instruct&quot;,\n  &quot;num_speculative_tokens&quot;: 5}&#x27;</pre></li><li class=\"\"><span class=\"st\"><b>N-grammes</b><i>sans modèle</i></span><pre class=\"ex\">--speculative-config &#x27;{&quot;method&quot;: &quot;ngram&quot;, &quot;num_speculative_tokens&quot;: 5,\n  &quot;prompt_lookup_max&quot;: 4}&#x27;</pre></li><li class=\"red\"><span class=\"st\"><b>Mesurer</b><i></i></span><pre class=\"ex\">taux d’acceptation, TPOT avant / après</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "22.7",
  "title": "La quantification",
  "sub": "moins de bits par poids",
  "body": "<p class=\"lede\">La <b>quantification</b> stocke les poids (et parfois les activations et le cache) avec moins de bits : 8, 4, voire moins, au lieu de 16.</p>\n    <table class=\"data\"><tr><th>format</th><th>bits</th><th>outils</th><th>remarque</th></tr><tr><td>FP8</td><td>8</td><td>vLLM, TensorRT-LLM (H100+)</td><td>quasi sans perte</td></tr><tr><td>INT8 (W8A8)</td><td>8</td><td>llm-compressor, SmoothQuant</td><td>poids et activations</td></tr><tr><td>GPTQ, AWQ</td><td>4</td><td>vLLM, transformers</td><td>poids seulement, GPU</td></tr><tr><td>GGUF (k-quants)</td><td>2 à 8</td><td>llama.cpp, Ollama, LM Studio</td><td>CPU, Mac, GPU</td></tr><tr><td>MLX</td><td>3 à 8</td><td>Apple Silicon</td><td>Mac</td></tr><tr><td>NVFP4, MXFP4</td><td>4</td><td>GPU Blackwell</td><td>format matériel</td></tr></table>\n    <ul class=\"rules\"><li>Gains : mémoire divisée par 2 à 4, génération plus rapide (moins d’octets à lire), plus de place pour le cache.</li><li>Coût : légère perte de qualité, plus marquée sous 4 bits et sur les petits modèles ; toujours <b>évaluer</b> sur sa tâche.</li><li>Méthodes avec calibration (GPTQ, AWQ) : un petit jeu de données représentatif réduit la perte.</li></ul>",
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
  "lit": "mem",
  "look": {},
  "scene": "mem",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "22.8",
  "title": "L’élagage des modèles",
  "sub": "retirer ce qui sert peu",
  "body": "<p class=\"lede\">L’<b>élagage</b> (pruning) supprime des poids, des neurones, des têtes d’attention ou des couches entières peu utiles.</p>\n    <ul class=\"rules\"><li><b>Non structuré</b> : mettre des poids individuels à zéro (SparseGPT, Wanda). Accélère seulement avec un support matériel (parcimonie 2:4 des GPU NVIDIA).</li><li><b>Structuré</b> : retirer des couches, des têtes, des dimensions ; le modèle devient réellement plus petit et plus rapide.</li><li>Après un élagage important, un court réentraînement (souvent par distillation) récupère l’essentiel de la qualité : c’est ainsi que NVIDIA a produit Minitron à partir de modèles plus grands.</li></ul>\n    <p>En pratique, l’ingénieur utilise rarement l’élagage lui-même ; il choisit plutôt un modèle déjà plus petit ou quantifié.</p>",
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
  "lit": "mem",
  "look": {},
  "scene": "mem",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "22.9",
  "title": "La distillation de connaissances",
  "sub": "un élève qui imite un maître",
  "body": "<p class=\"lede\">La <b>distillation</b> entraîne un petit modèle (élève) à reproduire le comportement d’un grand (enseignant).</p>\n    <ul class=\"rules\"><li><b>Sur les sorties</b> : l’enseignant génère des réponses, l’élève apprend par SFT (le plus courant, chapitre 19).</li><li><b>Sur les distributions</b> : l’élève apprend à reproduire les probabilités de chaque jeton (logits) de l’enseignant, signal plus riche (même tokeniseur nécessaire).</li><li>Exemples : DistilBERT, les modèles R1-Distill de DeepSeek, beaucoup de petits modèles récents.</li></ul>\n    <p>Pour une tâche précise et fréquente, distiller un grand modèle en un petit modèle affiné peut diviser le coût par 10 à 50 avec une qualité proche. Vérifier les conditions d’utilisation de l’enseignant.</p>",
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
  "lit": "mem",
  "look": {},
  "scene": "mem",
  "fig": "",
  "panel": ""
 }
];
export const PLATES = {
  cache: { text: "À chaque nouveau jeton, l’attention a besoin des clés et des valeurs de tous les jetons précédents. Le cache les garde en mémoire : on ne calcule que celles du nouveau jeton. Le prix est la mémoire : le cache grandit avec la longueur du contexte et le nombre de requêtes simultanées.", facts: () => [["sans cache", "coût ∝ n² par réponse"], ["avec cache", "coût ∝ n"], ["prix", "de la mémoire GPU"]] },
  mem: { text: "Les poids occupent une taille fixe ; le cache clé-valeur grandit avec chaque jeton de chaque requête en cours. Pour servir beaucoup d’utilisateurs à la fois, c’est le cache qui remplit le GPU. D’où l’importance de GQA, de la quantification du cache et de PagedAttention.", facts: () => [["par jeton", "2 × couches × têtes KV × dim × 2 octets"], ["ici", "128 Ko / jeton"], ["32 000 jetons", "≈ 4 Go"]] },
  batch: { text: "Pendant le décodage, le GPU passe son temps à relire les poids. Traiter 32 requêtes ensemble relit les mêmes poids une seule fois pour 32 jetons : le débit total explose, pour une latence par jeton qui n’augmente que lentement. Jusqu’au moment où le calcul ou la mémoire saturent.", facts: () => [["décodage seul", "limité par la bande passante"], ["gros lots", "limités par le calcul"], ["réglage", "max_num_seqs, max_num_batched_tokens"]] }
};
