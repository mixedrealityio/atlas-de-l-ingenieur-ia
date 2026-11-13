// Chapitre 23 : Servir des modèles en production (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 23 · Inférence",
  "title": "Servir des modèles en production",
  "sub": "du fichier de poids au service",
  "body": "<p class=\"lede\">Héberger soi-même un modèle ouvert donne la maîtrise des données, des coûts à gros volume et de la personnalisation (adaptateurs LoRA), au prix d’une exploitation à assurer : GPU, mises à l’échelle, surveillance.</p>\n    <p>Ce chapitre présente le service de modèles, les principaux moteurs, la gestion de la mémoire GPU, l’optimisation de la latence et du débit, et la répartition sur plusieurs GPU.</p>",
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
  "lit": "serveur",
  "look": {},
  "scene": "serveur",
  "fig": "",
  "panel": "<h2>Un serveur d’inférence</h2><div class=\"psub\">de la requête HTTP au GPU</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>API</b><i>compatible OpenAI</i></span><pre class=\"ex\">POST /v1/chat/completions</pre></li><li class=\"blue\"><span class=\"st\"><b>Ordonnanceur</b><i>file, priorités</i></span><pre class=\"ex\">batching continu, préemption</pre></li><li class=\"\"><span class=\"st\"><b>Gestion du cache</b><i>blocs KV</i></span><pre class=\"ex\">PagedAttention, cache de préfixe</pre></li><li class=\"red\"><span class=\"st\"><b>Moteur</b><i>noyaux optimisés</i></span><pre class=\"ex\">FlashAttention, CUDA graphs, fp8</pre></li><li class=\"blue\"><span class=\"st\"><b>GPU</b><i>un ou plusieurs</i></span><pre class=\"ex\">parallélisme de tenseurs</pre></li><li class=\"\"><span class=\"st\"><b>Flux de sortie</b><i>SSE</i></span><pre class=\"ex\">jetons envoyés au fil de l’eau</pre></li></ol><p class=\"note\">Un moteur d’inférence transforme un modèle en service : il accepte des milliers de requêtes, les regroupe intelligemment, gère la mémoire du cache, et exécute des noyaux GPU optimisés. Le gain par rapport à un simple model.generate() se compte en dizaines de fois.</p><table class=\"data\"><tr><th>moteurs</th><td>vLLM, SGLang, TensorRT-LLM, TGI</td></tr><tr><th>poste local</th><td>Ollama, llama.cpp, LM Studio</td></tr><tr><th>mesures</th><td>TTFT, TPOT, débit, coût / M jetons</td></tr></table>"
 },
 {
  "kicker": "23.1",
  "title": "Le service de modèles",
  "sub": "ce qu’on attend d’un serveur",
  "body": "<p class=\"lede\">Un serveur de modèles de langage de production doit :</p>\n    <ul class=\"rules\"><li>Exposer une <b>API</b> standard (compatible OpenAI) avec streaming, sorties structurées, appels d’outils.</li><li>Maximiser le <b>débit</b> (batching continu) en tenant des objectifs de <b>latence</b> (SLO sur TTFT et TPOT).</li><li>Gérer la <b>mémoire</b> (cache paginé, préfixes, préemption).</li><li>Exposer des <b>métriques</b> (Prometheus) : requêtes en cours, file d’attente, utilisation du cache, débit.</li><li>Démarrer vite, se mettre à l’échelle selon la charge (Kubernetes, KServe, Ray Serve), répartir la charge en tenant compte du cache (routage par préfixe).</li></ul>\n    <p>Choisir entre API et hébergement : en dessous de quelques millions de jetons par jour, les API sont presque toujours moins chères et plus simples ; l’auto-hébergement se justifie par le volume, la confidentialité ou la personnalisation.</p>",
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
  "lit": "serveur",
  "look": {},
  "scene": "serveur",
  "fig": "",
  "panel": "<h2>Un serveur d’inférence</h2><div class=\"psub\">de la requête HTTP au GPU</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>API</b><i>compatible OpenAI</i></span><pre class=\"ex\">POST /v1/chat/completions</pre></li><li class=\"blue\"><span class=\"st\"><b>Ordonnanceur</b><i>file, priorités</i></span><pre class=\"ex\">batching continu, préemption</pre></li><li class=\"\"><span class=\"st\"><b>Gestion du cache</b><i>blocs KV</i></span><pre class=\"ex\">PagedAttention, cache de préfixe</pre></li><li class=\"red\"><span class=\"st\"><b>Moteur</b><i>noyaux optimisés</i></span><pre class=\"ex\">FlashAttention, CUDA graphs, fp8</pre></li><li class=\"blue\"><span class=\"st\"><b>GPU</b><i>un ou plusieurs</i></span><pre class=\"ex\">parallélisme de tenseurs</pre></li><li class=\"\"><span class=\"st\"><b>Flux de sortie</b><i>SSE</i></span><pre class=\"ex\">jetons envoyés au fil de l’eau</pre></li></ol><p class=\"note\">Un moteur d’inférence transforme un modèle en service : il accepte des milliers de requêtes, les regroupe intelligemment, gère la mémoire du cache, et exécute des noyaux GPU optimisés. Le gain par rapport à un simple model.generate() se compte en dizaines de fois.</p><table class=\"data\"><tr><th>moteurs</th><td>vLLM, SGLang, TensorRT-LLM, TGI</td></tr><tr><th>poste local</th><td>Ollama, llama.cpp, LM Studio</td></tr><tr><th>mesures</th><td>TTFT, TPOT, débit, coût / M jetons</td></tr></table>"
 },
 {
  "kicker": "23.2",
  "title": "vLLM",
  "sub": "le moteur open source de référence",
  "body": "<p class=\"lede\"><b>vLLM</b> (UC Berkeley, 2023) a introduit PagedAttention et s’est imposé comme le moteur d’inférence open source le plus utilisé.</p>\n    <pre class=\"code\">pip install vllm\nvllm serve Qwen/Qwen3-8B --max-model-len 32768 --gpu-memory-utilization 0.90 \\\n  --enable-prefix-caching --max-num-seqs 64</pre>\n    <ul class=\"rules\"><li>API compatible OpenAI, batching continu, cache de préfixe, préremplissage par morceaux.</li><li>Quantifications (FP8, AWQ, GPTQ…), LoRA multiples, décodage spéculatif, sorties structurées.</li><li>Parallélisme de tenseurs, de pipeline, d’experts, de données ; nombreux matériels (NVIDIA, AMD, TPU, Intel…).</li><li><code>LLM.generate()</code> pour le traitement par lots hors ligne, très efficace.</li></ul>",
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
  "lit": "serveur",
  "look": {},
  "scene": "serveur",
  "fig": "",
  "panel": "<h2>Mettre vLLM en service</h2><div class=\"psub\">Docker sur un GPU</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Lancer</b><i></i></span><pre class=\"ex\">docker run --gpus all -p 8000:8000 --ipc=host \\\n  -v ~/.cache/huggingface:/root/.cache/huggingface \\\n  vllm/vllm-openai:latest --model Qwen/Qwen3-8B</pre></li><li class=\"\"><span class=\"st\"><b>Tester</b><i></i></span><pre class=\"ex\">curl localhost:8000/v1/chat/completions -H &#x27;Content-Type: application/json&#x27; \\\n  -d &#x27;{&quot;model&quot;: &quot;Qwen/Qwen3-8B&quot;, &quot;messages&quot;: [{&quot;role&quot;: &quot;user&quot;, &quot;content&quot;: &quot;Bonjour&quot;}]}&#x27;</pre></li><li class=\"\"><span class=\"st\"><b>Mesurer</b><i></i></span><pre class=\"ex\">vllm bench serve --model Qwen/Qwen3-8B --dataset-name random \\\n  --random-input-len 1000 --random-output-len 300 --request-rate 8</pre></li><li class=\"red\"><span class=\"st\"><b>Surveiller</b><i></i></span><pre class=\"ex\">GET /metrics : vllm:num_requests_waiting, kv_cache_usage_perc</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "23.3",
  "title": "SGLang",
  "sub": "rapide et programmable",
  "body": "<p class=\"lede\"><b>SGLang</b> (LMSYS) est un moteur d’inférence très performant, avec un langage pour programmer des appels structurés.</p>\n    <ul class=\"rules\"><li><b>RadixAttention</b> : un arbre de préfixes partagé entre toutes les requêtes ; excellent pour les agents, le few-shot et les conversations à long historique.</li><li>Décodage contraint très rapide (JSON, expressions régulières).</li><li>Optimisé pour les grands MoE (DeepSeek, Qwen) : parallélisme d’experts, désagrégation préremplissage/décodage.</li><li>API compatible OpenAI : <code>python -m sglang.launch_server --model-path Qwen/Qwen3-8B</code>.</li></ul>\n    <p>vLLM et SGLang sont au coude-à-coude selon les modèles et les charges : comparer sur sa propre charge avant de choisir.</p>",
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
  "lit": "serveur",
  "look": {},
  "scene": "serveur",
  "fig": "",
  "panel": "<h2>Un serveur d’inférence</h2><div class=\"psub\">de la requête HTTP au GPU</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>API</b><i>compatible OpenAI</i></span><pre class=\"ex\">POST /v1/chat/completions</pre></li><li class=\"blue\"><span class=\"st\"><b>Ordonnanceur</b><i>file, priorités</i></span><pre class=\"ex\">batching continu, préemption</pre></li><li class=\"\"><span class=\"st\"><b>Gestion du cache</b><i>blocs KV</i></span><pre class=\"ex\">PagedAttention, cache de préfixe</pre></li><li class=\"red\"><span class=\"st\"><b>Moteur</b><i>noyaux optimisés</i></span><pre class=\"ex\">FlashAttention, CUDA graphs, fp8</pre></li><li class=\"blue\"><span class=\"st\"><b>GPU</b><i>un ou plusieurs</i></span><pre class=\"ex\">parallélisme de tenseurs</pre></li><li class=\"\"><span class=\"st\"><b>Flux de sortie</b><i>SSE</i></span><pre class=\"ex\">jetons envoyés au fil de l’eau</pre></li></ol><p class=\"note\">Un moteur d’inférence transforme un modèle en service : il accepte des milliers de requêtes, les regroupe intelligemment, gère la mémoire du cache, et exécute des noyaux GPU optimisés. Le gain par rapport à un simple model.generate() se compte en dizaines de fois.</p><table class=\"data\"><tr><th>moteurs</th><td>vLLM, SGLang, TensorRT-LLM, TGI</td></tr><tr><th>poste local</th><td>Ollama, llama.cpp, LM Studio</td></tr><tr><th>mesures</th><td>TTFT, TPOT, débit, coût / M jetons</td></tr></table>"
 },
 {
  "kicker": "23.4",
  "title": "Ollama",
  "sub": "les modèles sur son poste",
  "body": "<p class=\"lede\"><b>Ollama</b> rend l’utilisation locale de modèles aussi simple que Docker : <code>ollama run qwen3</code>. Il s’appuie sur llama.cpp et le format <b>GGUF</b> quantifié.</p>\n    <ul class=\"rules\"><li>Fonctionne sur Mac (Metal), Linux et Windows, CPU ou GPU.</li><li>API locale (port 11434) et compatibilité OpenAI.</li><li><b>Modelfile</b> pour fixer le prompt système, la température, le contexte.</li><li>Idéal pour le développement, les démonstrations, les données sensibles sur un poste, les petits usages internes.</li></ul>\n    <p>Limites : pensé pour un utilisateur ou une petite équipe ; pour servir beaucoup d’utilisateurs simultanés, vLLM ou SGLang offrent un débit bien supérieur. Alternatives locales : <b>LM Studio</b> (interface graphique, MLX sur Mac), <b>llama.cpp</b> directement (llama-server).</p>",
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
  "lit": "serveur",
  "look": {},
  "scene": "serveur",
  "fig": "",
  "panel": "<h2>Un serveur d’inférence</h2><div class=\"psub\">de la requête HTTP au GPU</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>API</b><i>compatible OpenAI</i></span><pre class=\"ex\">POST /v1/chat/completions</pre></li><li class=\"blue\"><span class=\"st\"><b>Ordonnanceur</b><i>file, priorités</i></span><pre class=\"ex\">batching continu, préemption</pre></li><li class=\"\"><span class=\"st\"><b>Gestion du cache</b><i>blocs KV</i></span><pre class=\"ex\">PagedAttention, cache de préfixe</pre></li><li class=\"red\"><span class=\"st\"><b>Moteur</b><i>noyaux optimisés</i></span><pre class=\"ex\">FlashAttention, CUDA graphs, fp8</pre></li><li class=\"blue\"><span class=\"st\"><b>GPU</b><i>un ou plusieurs</i></span><pre class=\"ex\">parallélisme de tenseurs</pre></li><li class=\"\"><span class=\"st\"><b>Flux de sortie</b><i>SSE</i></span><pre class=\"ex\">jetons envoyés au fil de l’eau</pre></li></ol><p class=\"note\">Un moteur d’inférence transforme un modèle en service : il accepte des milliers de requêtes, les regroupe intelligemment, gère la mémoire du cache, et exécute des noyaux GPU optimisés. Le gain par rapport à un simple model.generate() se compte en dizaines de fois.</p><table class=\"data\"><tr><th>moteurs</th><td>vLLM, SGLang, TensorRT-LLM, TGI</td></tr><tr><th>poste local</th><td>Ollama, llama.cpp, LM Studio</td></tr><tr><th>mesures</th><td>TTFT, TPOT, débit, coût / M jetons</td></tr></table>"
 },
 {
  "kicker": "23.5",
  "title": "TensorRT-LLM",
  "sub": "le maximum des GPU NVIDIA",
  "body": "<p class=\"lede\"><b>TensorRT-LLM</b> (NVIDIA) compile le modèle en moteurs optimisés pour un GPU précis : noyaux fusionnés, FP8 et FP4, batching en vol, cache paginé, décodage spéculatif.</p>\n    <ul class=\"rules\"><li>Souvent le débit le plus élevé sur matériel NVIDIA récent (H100, H200, Blackwell).</li><li>Servi via <b>Triton Inference Server</b> ou le serveur intégré ; <b>NVIDIA NIM</b> fournit des conteneurs prêts à l’emploi.</li><li><b>Dynamo</b> (NVIDIA) orchestre l’inférence distribuée et désagrégée au-dessus de TensorRT-LLM, vLLM ou SGLang.</li><li>Contrepartie : plus complexe, liée à NVIDIA ; la nouvelle interface PyTorch simplifie l’usage.</li></ul>",
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
  "lit": "serveur",
  "look": {},
  "scene": "serveur",
  "fig": "",
  "panel": "<h2>Un serveur d’inférence</h2><div class=\"psub\">de la requête HTTP au GPU</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>API</b><i>compatible OpenAI</i></span><pre class=\"ex\">POST /v1/chat/completions</pre></li><li class=\"blue\"><span class=\"st\"><b>Ordonnanceur</b><i>file, priorités</i></span><pre class=\"ex\">batching continu, préemption</pre></li><li class=\"\"><span class=\"st\"><b>Gestion du cache</b><i>blocs KV</i></span><pre class=\"ex\">PagedAttention, cache de préfixe</pre></li><li class=\"red\"><span class=\"st\"><b>Moteur</b><i>noyaux optimisés</i></span><pre class=\"ex\">FlashAttention, CUDA graphs, fp8</pre></li><li class=\"blue\"><span class=\"st\"><b>GPU</b><i>un ou plusieurs</i></span><pre class=\"ex\">parallélisme de tenseurs</pre></li><li class=\"\"><span class=\"st\"><b>Flux de sortie</b><i>SSE</i></span><pre class=\"ex\">jetons envoyés au fil de l’eau</pre></li></ol><p class=\"note\">Un moteur d’inférence transforme un modèle en service : il accepte des milliers de requêtes, les regroupe intelligemment, gère la mémoire du cache, et exécute des noyaux GPU optimisés. Le gain par rapport à un simple model.generate() se compte en dizaines de fois.</p><table class=\"data\"><tr><th>moteurs</th><td>vLLM, SGLang, TensorRT-LLM, TGI</td></tr><tr><th>poste local</th><td>Ollama, llama.cpp, LM Studio</td></tr><tr><th>mesures</th><td>TTFT, TPOT, débit, coût / M jetons</td></tr></table>"
 },
 {
  "kicker": "23.6",
  "title": "La gestion de la mémoire GPU",
  "sub": "faire tenir poids et cache",
  "body": "<p class=\"lede\">La mémoire d’un GPU d’inférence se partage entre les <b>poids</b> (fixe), le <b>cache KV</b> (variable), les <b>activations</b> et les tampons du moteur.</p>\n    <ul class=\"rules\"><li>vLLM réserve une fraction (<code>--gpu-memory-utilization</code>, 0,9 par défaut) et y loge les poids, puis remplit le reste de blocs de cache.</li><li>Plus de place pour le cache = plus de requêtes simultanées = plus de débit.</li><li>Leviers : quantifier les poids, quantifier le cache (fp8), réduire <code>max-model-len</code>, répartir sur plusieurs GPU.</li><li>Erreur au démarrage « not enough KV cache » : le contexte maximal demandé ne tient pas, le réduire ou ajouter des GPU.</li></ul>",
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
  "lit": "mem",
  "look": {},
  "scene": "mem",
  "fig": "",
  "panel": "<h2>Dimensionner un GPU</h2><div class=\"psub\">Qwen3-32B pour 30 utilisateurs</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Poids</b><i>fp8</i></span><pre class=\"ex\">32 Go</pre></li><li class=\"blue\"><span class=\"st\"><b>Cache par jeton</b><i>64 couches × 8 têtes KV × 128 × 2 × 1 octet</i></span><pre class=\"ex\">≈ 128 Ko en fp8</pre></li><li class=\"\"><span class=\"st\"><b>Charge</b><i></i></span><pre class=\"ex\">30 requêtes × 8 000 jetons = 240 000 jetons → ≈ 31 Go</pre></li><li class=\"\"><span class=\"st\"><b>Marge</b><i>activations, CUDA graphs</i></span><pre class=\"ex\">≈ 5 Go</pre></li><li class=\"red\"><span class=\"st\"><b>Total</b><i></i></span><pre class=\"ex\">≈ 68 Go → un H100 80 Go</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "23.7",
  "title": "Optimiser la latence et le débit",
  "sub": "deux objectifs en tension",
  "body": "<p class=\"lede\">Optimiser l’inférence, c’est choisir son point sur la courbe débit-latence en fonction des objectifs de service.</p>\n    <table class=\"data\"><tr><th>objectif</th><th>leviers</th></tr><tr><td>TTFT bas</td><td>cache de préfixe, préremplissage par morceaux, prompts plus courts, moins de requêtes en file</td></tr><tr><td>TPOT bas</td><td>quantification, décodage spéculatif, parallélisme de tenseurs, lots plus petits</td></tr><tr><td>débit élevé</td><td>gros lots, quantification, plus de mémoire pour le cache, traitement hors ligne</td></tr><tr><td>coût bas</td><td>plus petit modèle, quantification, GPU moins cher, mise à l’échelle à zéro</td></tr></table>\n    <ul class=\"rules\"><li>Mesurer avec une charge <b>réaliste</b> (longueurs d’entrée et de sortie, taux d’arrivée) : p50, p95, p99.</li><li>Côté application : streaming, réponses plus courtes, parallélisation des appels indépendants, cache des réponses.</li><li>Ne pas optimiser avant de savoir où part le temps : une trace montre souvent que la récupération ou un outil, pas le modèle, domine la latence.</li></ul>",
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
  "lit": "batch",
  "look": {},
  "scene": "batch",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "23.8",
  "title": "Les bases de l’inférence distribuée",
  "sub": "quand un GPU ne suffit pas",
  "body": "<p class=\"lede\">Un modèle de 70B en bf16 (140 Go) ne tient pas sur un GPU de 80 Go ; un modèle de 600B demande plusieurs nœuds. On répartit le travail.</p>\n    <table class=\"data\"><tr><th>parallélisme</th><th>principe</th><th>où</th></tr><tr><td>de tenseurs (TP)</td><td>chaque matrice coupée entre GPU, échange à chaque couche</td><td>dans un nœud (NVLink)</td></tr><tr><td>de pipeline (PP)</td><td>des groupes de couches sur des GPU différents</td><td>entre nœuds</td></tr><tr><td>d’experts (EP)</td><td>les experts d’un MoE répartis</td><td>grands MoE</td></tr><tr><td>de données (DP)</td><td>des copies complètes du modèle</td><td>pour le débit</td></tr></table>\n    <ul class=\"rules\"><li>Exemple : <code>vllm serve meta-llama/Llama-3.3-70B-Instruct --tensor-parallel-size 4</code>.</li><li><b>Désagrégation</b> : préremplissage et décodage sur des groupes de GPU distincts, transfert du cache entre eux.</li><li>Orchestration : Ray, Kubernetes (LeaderWorkerSet), llm-d, NVIDIA Dynamo.</li></ul>",
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
  "lit": "grappe",
  "look": {},
  "scene": "grappe",
  "fig": "",
  "panel": ""
 }
];
export const PLATES = {
  grappe: { text: "Un modèle trop grand pour un GPU est réparti : en parallélisme de tenseurs entre les GPU d’un même nœud (liaison NVLink très rapide), en parallélisme de pipeline ou d’experts entre nœuds (réseau InfiniBand plus lent). Le placement suit la vitesse des liens.", facts: () => [["NVLink (H100)", "900 Go/s par GPU"], ["InfiniBand NDR", "≈ 50 Go/s par port"], ["règle", "tenseurs dans le nœud, pipeline entre nœuds"]] },
  debits: { text: "La vitesse de génération d’une requête est à peu près la bande passante mémoire divisée par la taille des poids lus par jeton. Charger un modèle depuis le disque prend des dizaines de secondes ; le faire tourner depuis la mémoire du CPU est 10 fois plus lent que depuis la HBM.", facts: () => [["HBM H100", "3,35 To/s"], ["DDR5", "≈ 10 × moins"], ["démarrage", "chargement des poids depuis le disque"]] }
};
