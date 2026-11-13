// Chapitre 26 : Cloud et DevOps pour l’IA (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 26 · Cloud",
  "title": "Cloud et DevOps pour l’IA",
  "sub": "faire tourner tout cela quelque part",
  "body": "<p class=\"lede\">Une application d’IA vit dans le <b>cloud</b> (ou dans un centre de données) : machines, conteneurs, bases, stockage, GPU, réseau, secrets. Le <b>DevOps</b> automatise sa construction, son déploiement et son exploitation.</p>\n    <p>L’ingénieur IA n’a pas besoin d’être expert en infrastructure, mais il doit savoir conteneuriser son application, la déployer, comprendre les services de base des grands clouds et dialoguer avec l’équipe plateforme.</p>",
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
  "lit": "deploi",
  "look": {},
  "scene": "deploi",
  "fig": "",
  "panel": "<h2>Du commit à la production</h2><div class=\"psub\">un déploiement type</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Commit</b><i>Git</i></span><pre class=\"ex\">git push origin feature/rag-v2</pre></li><li class=\"blue\"><span class=\"st\"><b>CI</b><i>tests, évaluations</i></span><pre class=\"ex\">GitHub Actions : pytest, evals, ruff</pre></li><li class=\"\"><span class=\"st\"><b>Image</b><i>Docker</i></span><pre class=\"ex\">docker build -t registre/api:1.8.2 .</pre></li><li class=\"\"><span class=\"st\"><b>Registre</b><i></i></span><pre class=\"ex\">ECR, Artifact Registry, ACR, GHCR</pre></li><li class=\"red\"><span class=\"st\"><b>Infrastructure</b><i>Terraform</i></span><pre class=\"ex\">terraform apply : cluster, base, secrets</pre></li><li class=\"blue\"><span class=\"st\"><b>Déploiement</b><i>Kubernetes ou service géré</i></span><pre class=\"ex\">kubectl / Argo CD / ECS / Cloud Run</pre></li><li class=\"\"><span class=\"st\"><b>Observation</b><i></i></span><pre class=\"ex\">métriques, traces, alertes, retour arrière</pre></li></ol><p class=\"note\">Chaque changement suit le même chemin automatisé : tests, image immuable, infrastructure décrite en code, déploiement progressif, surveillance. Aucune étape manuelle sur les serveurs : tout se rejoue et se reconstruit.</p><table class=\"data\"><tr><th>artefact</th><td>image Docker immuable</td></tr><tr><th>infrastructure</th><td>en code (Terraform)</td></tr><tr><th>déploiement</th><td>progressif, réversible</td></tr></table>"
 },
 {
  "kicker": "26.1",
  "title": "AWS",
  "sub": "Amazon Web Services",
  "body": "<p class=\"lede\"><b>AWS</b> est le premier fournisseur de cloud. Pour l’IA, il propose à la fois des briques générales et des services dédiés : <b>Bedrock</b> (accès par API à Claude, Llama, Mistral, Nova… avec les garanties d’AWS), <b>SageMaker</b> (entraînement et déploiement de modèles), des instances GPU (P5, G6) et des puces maison (Trainium, Inferentia).</p>\n    <ul class=\"rules\"><li>Identités et droits : <b>IAM</b> (rôles plutôt que clés), principe du moindre privilège.</li><li>Réseau : VPC, sous-réseaux privés, points de terminaison privés vers Bedrock et S3.</li><li>Les pages suivantes présentent les services les plus utilisés par un ingénieur IA.</li></ul>",
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
  "lit": "deploi",
  "look": {},
  "scene": "deploi",
  "fig": "",
  "panel": "<h2>Du commit à la production</h2><div class=\"psub\">un déploiement type</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Commit</b><i>Git</i></span><pre class=\"ex\">git push origin feature/rag-v2</pre></li><li class=\"blue\"><span class=\"st\"><b>CI</b><i>tests, évaluations</i></span><pre class=\"ex\">GitHub Actions : pytest, evals, ruff</pre></li><li class=\"\"><span class=\"st\"><b>Image</b><i>Docker</i></span><pre class=\"ex\">docker build -t registre/api:1.8.2 .</pre></li><li class=\"\"><span class=\"st\"><b>Registre</b><i></i></span><pre class=\"ex\">ECR, Artifact Registry, ACR, GHCR</pre></li><li class=\"red\"><span class=\"st\"><b>Infrastructure</b><i>Terraform</i></span><pre class=\"ex\">terraform apply : cluster, base, secrets</pre></li><li class=\"blue\"><span class=\"st\"><b>Déploiement</b><i>Kubernetes ou service géré</i></span><pre class=\"ex\">kubectl / Argo CD / ECS / Cloud Run</pre></li><li class=\"\"><span class=\"st\"><b>Observation</b><i></i></span><pre class=\"ex\">métriques, traces, alertes, retour arrière</pre></li></ol><p class=\"note\">Chaque changement suit le même chemin automatisé : tests, image immuable, infrastructure décrite en code, déploiement progressif, surveillance. Aucune étape manuelle sur les serveurs : tout se rejoue et se reconstruit.</p><table class=\"data\"><tr><th>artefact</th><td>image Docker immuable</td></tr><tr><th>infrastructure</th><td>en code (Terraform)</td></tr><tr><th>déploiement</th><td>progressif, réversible</td></tr></table>"
 },
 {
  "kicker": "26.2",
  "title": "S3",
  "sub": "le stockage d’objets",
  "body": "<p class=\"lede\"><b>S3</b> stocke des fichiers (objets) de n’importe quelle taille dans des seaux (buckets), avec une durabilité très élevée. C’est le lieu naturel des documents sources d’un RAG, des jeux de données, des poids de modèles, des journaux et des sauvegardes.</p>\n    <pre class=\"code\">s3 = boto3.client(&#x27;s3&#x27;)\ns3.upload_file(&#x27;corpus.parquet&#x27;, &#x27;acme-ia-donnees&#x27;, &#x27;rag/v3/corpus.parquet&#x27;)\nurl = s3.generate_presigned_url(&#x27;get_object&#x27;, Params={&#x27;Bucket&#x27;: &#x27;acme-ia-donnees&#x27;, &#x27;Key&#x27;: cle}, ExpiresIn=600)</pre>\n    <ul class=\"rules\"><li>Seaux <b>privés</b> par défaut, chiffrement, versionnage, règles de cycle de vie (archivage, suppression).</li><li>URL présignées pour donner un accès temporaire sans exposer le seau.</li><li>Événements S3 → déclencher l’ingestion d’un document dès son dépôt.</li><li>Équivalents : Google Cloud Storage, Azure Blob Storage, MinIO (auto-hébergé).</li></ul>",
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
  "lit": "deploi",
  "look": {},
  "scene": "deploi",
  "fig": "",
  "panel": "<h2>Du commit à la production</h2><div class=\"psub\">un déploiement type</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Commit</b><i>Git</i></span><pre class=\"ex\">git push origin feature/rag-v2</pre></li><li class=\"blue\"><span class=\"st\"><b>CI</b><i>tests, évaluations</i></span><pre class=\"ex\">GitHub Actions : pytest, evals, ruff</pre></li><li class=\"\"><span class=\"st\"><b>Image</b><i>Docker</i></span><pre class=\"ex\">docker build -t registre/api:1.8.2 .</pre></li><li class=\"\"><span class=\"st\"><b>Registre</b><i></i></span><pre class=\"ex\">ECR, Artifact Registry, ACR, GHCR</pre></li><li class=\"red\"><span class=\"st\"><b>Infrastructure</b><i>Terraform</i></span><pre class=\"ex\">terraform apply : cluster, base, secrets</pre></li><li class=\"blue\"><span class=\"st\"><b>Déploiement</b><i>Kubernetes ou service géré</i></span><pre class=\"ex\">kubectl / Argo CD / ECS / Cloud Run</pre></li><li class=\"\"><span class=\"st\"><b>Observation</b><i></i></span><pre class=\"ex\">métriques, traces, alertes, retour arrière</pre></li></ol><p class=\"note\">Chaque changement suit le même chemin automatisé : tests, image immuable, infrastructure décrite en code, déploiement progressif, surveillance. Aucune étape manuelle sur les serveurs : tout se rejoue et se reconstruit.</p><table class=\"data\"><tr><th>artefact</th><td>image Docker immuable</td></tr><tr><th>infrastructure</th><td>en code (Terraform)</td></tr><tr><th>déploiement</th><td>progressif, réversible</td></tr></table>"
 },
 {
  "kicker": "26.3",
  "title": "EC2",
  "sub": "des machines virtuelles",
  "body": "<p class=\"lede\"><b>EC2</b> loue des machines virtuelles à la seconde : CPU pour les API, mémoire pour les bases, GPU pour l’inférence et l’entraînement.</p>\n    <table class=\"data\"><tr><th>famille</th><th>usage</th></tr><tr><td>t, m, c</td><td>API, travailleurs, usage général</td></tr><tr><td>r</td><td>beaucoup de mémoire (caches, bases)</td></tr><tr><td>g (L4, L40S…)</td><td>inférence de modèles moyens, rapport prix/performance</td></tr><tr><td>p (H100, H200, B200)</td><td>entraînement, grands modèles</td></tr><tr><td>inf, trn</td><td>puces AWS Inferentia / Trainium</td></tr></table>\n    <ul class=\"rules\"><li>Modes d’achat : à la demande, réservé ou Savings Plans (−30 à −70 %), Spot (jusqu’à −90 %, peut être interrompu).</li><li>Images préparées (Deep Learning AMI) avec pilotes NVIDIA, CUDA, PyTorch.</li><li>Pour une application, préférer des conteneurs orchestrés (ECS, EKS) à des machines configurées à la main.</li></ul>",
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
 },
 {
  "kicker": "26.4",
  "title": "Lambda",
  "sub": "des fonctions sans serveur",
  "body": "<p class=\"lede\"><b>AWS Lambda</b> exécute une fonction en réponse à un événement (requête HTTP, fichier déposé dans S3, message), sans serveur à gérer, facturée à la milliseconde.</p>\n    <pre class=\"code\">def handler(event, context):\n    for r in event[&#x27;Records&#x27;]:                       # fichier déposé dans S3\n        cle = r[&#x27;s3&#x27;][&#x27;object&#x27;][&#x27;key&#x27;]\n        sqs.send_message(QueueUrl=FILE, MessageBody=json.dumps({&#x27;cle&#x27;: cle}))\n    return {&#x27;statusCode&#x27;: 200}</pre>\n    <ul class=\"rules\"><li>Idéal pour la colle événementielle : déclencher une ingestion, transformer un fichier, appeler une API de modèle ponctuellement.</li><li>Limites : 15 minutes maximum, pas de GPU, démarrages à froid, paquet limité (ou image de conteneur).</li><li>Équivalents : Google Cloud Run functions, Azure Functions. Pour du sans-serveur avec GPU : Modal, RunPod Serverless, Cloud Run avec GPU.</li></ul>",
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
  "lit": "deploi",
  "look": {},
  "scene": "deploi",
  "fig": "",
  "panel": "<h2>Du commit à la production</h2><div class=\"psub\">un déploiement type</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Commit</b><i>Git</i></span><pre class=\"ex\">git push origin feature/rag-v2</pre></li><li class=\"blue\"><span class=\"st\"><b>CI</b><i>tests, évaluations</i></span><pre class=\"ex\">GitHub Actions : pytest, evals, ruff</pre></li><li class=\"\"><span class=\"st\"><b>Image</b><i>Docker</i></span><pre class=\"ex\">docker build -t registre/api:1.8.2 .</pre></li><li class=\"\"><span class=\"st\"><b>Registre</b><i></i></span><pre class=\"ex\">ECR, Artifact Registry, ACR, GHCR</pre></li><li class=\"red\"><span class=\"st\"><b>Infrastructure</b><i>Terraform</i></span><pre class=\"ex\">terraform apply : cluster, base, secrets</pre></li><li class=\"blue\"><span class=\"st\"><b>Déploiement</b><i>Kubernetes ou service géré</i></span><pre class=\"ex\">kubectl / Argo CD / ECS / Cloud Run</pre></li><li class=\"\"><span class=\"st\"><b>Observation</b><i></i></span><pre class=\"ex\">métriques, traces, alertes, retour arrière</pre></li></ol><p class=\"note\">Chaque changement suit le même chemin automatisé : tests, image immuable, infrastructure décrite en code, déploiement progressif, surveillance. Aucune étape manuelle sur les serveurs : tout se rejoue et se reconstruit.</p><table class=\"data\"><tr><th>artefact</th><td>image Docker immuable</td></tr><tr><th>infrastructure</th><td>en code (Terraform)</td></tr><tr><th>déploiement</th><td>progressif, réversible</td></tr></table>"
 },
 {
  "kicker": "26.5",
  "title": "ECS et EKS",
  "sub": "orchestrer des conteneurs",
  "body": "<p class=\"lede\">Pour faire tourner des conteneurs en production, AWS propose deux services.</p>\n    <table class=\"data\"><tr><th></th><th>ECS</th><th>EKS</th></tr><tr><td>quoi</td><td>orchestrateur propre à AWS</td><td>Kubernetes géré</td></tr><tr><td>simplicité</td><td>simple, bien intégré (Fargate : sans machines)</td><td>plus complexe</td></tr><tr><td>portabilité</td><td>AWS seulement</td><td>Kubernetes standard, multi-cloud</td></tr><tr><td>écosystème</td><td>limité</td><td>immense : KServe, vLLM, Ray, Argo, KEDA</td></tr><tr><td>GPU</td><td>oui (EC2)</td><td>oui, avec opérateur NVIDIA</td></tr></table>\n    <p>Règle pratique : une API et quelques travailleurs → ECS Fargate (ou Cloud Run, Azure Container Apps) ; une plateforme avec serveurs GPU, plusieurs équipes et outils Kubernetes → EKS.</p>",
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
  "lit": "deploi",
  "look": {},
  "scene": "deploi",
  "fig": "",
  "panel": "<h2>Du commit à la production</h2><div class=\"psub\">un déploiement type</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Commit</b><i>Git</i></span><pre class=\"ex\">git push origin feature/rag-v2</pre></li><li class=\"blue\"><span class=\"st\"><b>CI</b><i>tests, évaluations</i></span><pre class=\"ex\">GitHub Actions : pytest, evals, ruff</pre></li><li class=\"\"><span class=\"st\"><b>Image</b><i>Docker</i></span><pre class=\"ex\">docker build -t registre/api:1.8.2 .</pre></li><li class=\"\"><span class=\"st\"><b>Registre</b><i></i></span><pre class=\"ex\">ECR, Artifact Registry, ACR, GHCR</pre></li><li class=\"red\"><span class=\"st\"><b>Infrastructure</b><i>Terraform</i></span><pre class=\"ex\">terraform apply : cluster, base, secrets</pre></li><li class=\"blue\"><span class=\"st\"><b>Déploiement</b><i>Kubernetes ou service géré</i></span><pre class=\"ex\">kubectl / Argo CD / ECS / Cloud Run</pre></li><li class=\"\"><span class=\"st\"><b>Observation</b><i></i></span><pre class=\"ex\">métriques, traces, alertes, retour arrière</pre></li></ol><p class=\"note\">Chaque changement suit le même chemin automatisé : tests, image immuable, infrastructure décrite en code, déploiement progressif, surveillance. Aucune étape manuelle sur les serveurs : tout se rejoue et se reconstruit.</p><table class=\"data\"><tr><th>artefact</th><td>image Docker immuable</td></tr><tr><th>infrastructure</th><td>en code (Terraform)</td></tr><tr><th>déploiement</th><td>progressif, réversible</td></tr></table>"
 },
 {
  "kicker": "26.6",
  "title": "Les bases de SageMaker",
  "sub": "le ML géré d’AWS",
  "body": "<p class=\"lede\"><b>Amazon SageMaker</b> (dont la plateforme unifiée SageMaker AI) regroupe les services d’apprentissage automatique gérés.</p>\n    <ul class=\"rules\"><li><b>Training jobs</b> : lancer un entraînement sur des GPU loués pour la durée du travail, données lues depuis S3.</li><li><b>Endpoints</b> : déployer un modèle derrière une API, avec mise à l’échelle ; conteneurs prêts pour vLLM et TGI (LMI, DJL).</li><li><b>JumpStart</b> : modèles ouverts déployables en quelques clics.</li><li><b>HyperPod</b> : grappes résilientes pour les grands entraînements.</li><li>Studio (environnement de carnets), Pipelines, registre de modèles.</li></ul>\n    <p>Pour simplement appeler des modèles de fondation, <b>Bedrock</b> suffit ; SageMaker sert quand on entraîne, affine ou héberge ses propres modèles.</p>",
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
  "lit": "deploi",
  "look": {},
  "scene": "deploi",
  "fig": "",
  "panel": "<h2>Du commit à la production</h2><div class=\"psub\">un déploiement type</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Commit</b><i>Git</i></span><pre class=\"ex\">git push origin feature/rag-v2</pre></li><li class=\"blue\"><span class=\"st\"><b>CI</b><i>tests, évaluations</i></span><pre class=\"ex\">GitHub Actions : pytest, evals, ruff</pre></li><li class=\"\"><span class=\"st\"><b>Image</b><i>Docker</i></span><pre class=\"ex\">docker build -t registre/api:1.8.2 .</pre></li><li class=\"\"><span class=\"st\"><b>Registre</b><i></i></span><pre class=\"ex\">ECR, Artifact Registry, ACR, GHCR</pre></li><li class=\"red\"><span class=\"st\"><b>Infrastructure</b><i>Terraform</i></span><pre class=\"ex\">terraform apply : cluster, base, secrets</pre></li><li class=\"blue\"><span class=\"st\"><b>Déploiement</b><i>Kubernetes ou service géré</i></span><pre class=\"ex\">kubectl / Argo CD / ECS / Cloud Run</pre></li><li class=\"\"><span class=\"st\"><b>Observation</b><i></i></span><pre class=\"ex\">métriques, traces, alertes, retour arrière</pre></li></ol><p class=\"note\">Chaque changement suit le même chemin automatisé : tests, image immuable, infrastructure décrite en code, déploiement progressif, surveillance. Aucune étape manuelle sur les serveurs : tout se rejoue et se reconstruit.</p><table class=\"data\"><tr><th>artefact</th><td>image Docker immuable</td></tr><tr><th>infrastructure</th><td>en code (Terraform)</td></tr><tr><th>déploiement</th><td>progressif, réversible</td></tr></table>"
 },
 {
  "kicker": "26.7",
  "title": "Google Cloud et Vertex AI",
  "sub": "l’offre de Google",
  "body": "<p class=\"lede\"><b>Google Cloud</b> réunit ses services d’IA dans <b>Vertex AI</b> : modèles Gemini et autres (Model Garden, dont Claude et Llama), affinage, points de terminaison, recherche vectorielle, RAG géré, évaluation, agents (Agent Builder, Agent Engine).</p>\n    <ul class=\"rules\"><li>Calcul : Compute Engine (GPU NVIDIA), <b>TPU</b> (puces de Google, très efficaces pour JAX et l’entraînement à grande échelle), <b>GKE</b> (Kubernetes), <b>Cloud Run</b> (conteneurs sans serveur, avec GPU).</li><li>Données : Cloud Storage, BigQuery (entrepôt, avec fonctions d’IA en SQL), AlloyDB (PostgreSQL avec vecteurs).</li><li>Un choix naturel si l’on vise Gemini, les TPU, ou si les données sont déjà dans BigQuery.</li></ul>",
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
  "lit": "deploi",
  "look": {},
  "scene": "deploi",
  "fig": "",
  "panel": "<h2>Du commit à la production</h2><div class=\"psub\">un déploiement type</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Commit</b><i>Git</i></span><pre class=\"ex\">git push origin feature/rag-v2</pre></li><li class=\"blue\"><span class=\"st\"><b>CI</b><i>tests, évaluations</i></span><pre class=\"ex\">GitHub Actions : pytest, evals, ruff</pre></li><li class=\"\"><span class=\"st\"><b>Image</b><i>Docker</i></span><pre class=\"ex\">docker build -t registre/api:1.8.2 .</pre></li><li class=\"\"><span class=\"st\"><b>Registre</b><i></i></span><pre class=\"ex\">ECR, Artifact Registry, ACR, GHCR</pre></li><li class=\"red\"><span class=\"st\"><b>Infrastructure</b><i>Terraform</i></span><pre class=\"ex\">terraform apply : cluster, base, secrets</pre></li><li class=\"blue\"><span class=\"st\"><b>Déploiement</b><i>Kubernetes ou service géré</i></span><pre class=\"ex\">kubectl / Argo CD / ECS / Cloud Run</pre></li><li class=\"\"><span class=\"st\"><b>Observation</b><i></i></span><pre class=\"ex\">métriques, traces, alertes, retour arrière</pre></li></ol><p class=\"note\">Chaque changement suit le même chemin automatisé : tests, image immuable, infrastructure décrite en code, déploiement progressif, surveillance. Aucune étape manuelle sur les serveurs : tout se rejoue et se reconstruit.</p><table class=\"data\"><tr><th>artefact</th><td>image Docker immuable</td></tr><tr><th>infrastructure</th><td>en code (Terraform)</td></tr><tr><th>déploiement</th><td>progressif, réversible</td></tr></table>"
 },
 {
  "kicker": "26.8",
  "title": "Microsoft Azure AI",
  "sub": "l’offre de Microsoft",
  "body": "<p class=\"lede\"><b>Azure</b> propose <b>Azure OpenAI</b> (modèles d’OpenAI hébergés par Microsoft, avec résidence des données et contrats d’entreprise) et <b>Azure AI Foundry</b> (catalogue de modèles dont Llama, Mistral, DeepSeek, outils d’évaluation, de sécurité du contenu et d’agents).</p>\n    <ul class=\"rules\"><li><b>Azure AI Search</b> : recherche hybride et vectorielle, très utilisée pour le RAG d’entreprise.</li><li><b>Document Intelligence</b> (OCR, formulaires), Speech, Content Safety.</li><li>Calcul : machines GPU (ND H100), AKS (Kubernetes), Container Apps.</li><li>Intégration à Entra ID (identités), Microsoft 365, Copilot Studio ; souvent le choix par défaut des grandes entreprises déjà sur Microsoft.</li></ul>",
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
  "lit": "deploi",
  "look": {},
  "scene": "deploi",
  "fig": "",
  "panel": "<h2>Du commit à la production</h2><div class=\"psub\">un déploiement type</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Commit</b><i>Git</i></span><pre class=\"ex\">git push origin feature/rag-v2</pre></li><li class=\"blue\"><span class=\"st\"><b>CI</b><i>tests, évaluations</i></span><pre class=\"ex\">GitHub Actions : pytest, evals, ruff</pre></li><li class=\"\"><span class=\"st\"><b>Image</b><i>Docker</i></span><pre class=\"ex\">docker build -t registre/api:1.8.2 .</pre></li><li class=\"\"><span class=\"st\"><b>Registre</b><i></i></span><pre class=\"ex\">ECR, Artifact Registry, ACR, GHCR</pre></li><li class=\"red\"><span class=\"st\"><b>Infrastructure</b><i>Terraform</i></span><pre class=\"ex\">terraform apply : cluster, base, secrets</pre></li><li class=\"blue\"><span class=\"st\"><b>Déploiement</b><i>Kubernetes ou service géré</i></span><pre class=\"ex\">kubectl / Argo CD / ECS / Cloud Run</pre></li><li class=\"\"><span class=\"st\"><b>Observation</b><i></i></span><pre class=\"ex\">métriques, traces, alertes, retour arrière</pre></li></ol><p class=\"note\">Chaque changement suit le même chemin automatisé : tests, image immuable, infrastructure décrite en code, déploiement progressif, surveillance. Aucune étape manuelle sur les serveurs : tout se rejoue et se reconstruit.</p><table class=\"data\"><tr><th>artefact</th><td>image Docker immuable</td></tr><tr><th>infrastructure</th><td>en code (Terraform)</td></tr><tr><th>déploiement</th><td>progressif, réversible</td></tr></table>"
 },
 {
  "kicker": "26.9",
  "title": "Docker",
  "sub": "empaqueter l’application",
  "body": "<p class=\"lede\"><b>Docker</b> empaquette une application et toutes ses dépendances dans une <b>image</b> qui s’exécute de la même façon partout : poste de développement, CI, production.</p>\n    <pre class=\"code\">FROM python:3.12-slim\nCOPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv\nWORKDIR /app\nCOPY pyproject.toml uv.lock ./\nRUN uv sync --frozen --no-dev\nCOPY src/ src/\nUSER 1000\nEXPOSE 8000\nCMD [&quot;uv&quot;, &quot;run&quot;, &quot;uvicorn&quot;, &quot;src.api:app&quot;, &quot;--host&quot;, &quot;0.0.0.0&quot;, &quot;--port&quot;, &quot;8000&quot;]</pre>\n    <ul class=\"rules\"><li>Copier d’abord les fichiers de dépendances (cache des couches), utiliser des images minces, ne pas tourner en root.</li><li>Jamais de secrets dans l’image ; les poids de modèles volumineux dans un volume ou téléchargés au démarrage.</li><li>GPU : image <code>nvidia/cuda</code> ou <code>vllm/vllm-openai</code>, lancement avec <code>--gpus all</code>.</li><li><b>Docker Compose</b> pour lancer localement l’API, Postgres, Redis et Qdrant ensemble.</li></ul>",
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
  "lit": "deploi",
  "look": {},
  "scene": "deploi",
  "fig": "",
  "panel": "<h2>Du commit à la production</h2><div class=\"psub\">un déploiement type</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Commit</b><i>Git</i></span><pre class=\"ex\">git push origin feature/rag-v2</pre></li><li class=\"blue\"><span class=\"st\"><b>CI</b><i>tests, évaluations</i></span><pre class=\"ex\">GitHub Actions : pytest, evals, ruff</pre></li><li class=\"\"><span class=\"st\"><b>Image</b><i>Docker</i></span><pre class=\"ex\">docker build -t registre/api:1.8.2 .</pre></li><li class=\"\"><span class=\"st\"><b>Registre</b><i></i></span><pre class=\"ex\">ECR, Artifact Registry, ACR, GHCR</pre></li><li class=\"red\"><span class=\"st\"><b>Infrastructure</b><i>Terraform</i></span><pre class=\"ex\">terraform apply : cluster, base, secrets</pre></li><li class=\"blue\"><span class=\"st\"><b>Déploiement</b><i>Kubernetes ou service géré</i></span><pre class=\"ex\">kubectl / Argo CD / ECS / Cloud Run</pre></li><li class=\"\"><span class=\"st\"><b>Observation</b><i></i></span><pre class=\"ex\">métriques, traces, alertes, retour arrière</pre></li></ol><p class=\"note\">Chaque changement suit le même chemin automatisé : tests, image immuable, infrastructure décrite en code, déploiement progressif, surveillance. Aucune étape manuelle sur les serveurs : tout se rejoue et se reconstruit.</p><table class=\"data\"><tr><th>artefact</th><td>image Docker immuable</td></tr><tr><th>infrastructure</th><td>en code (Terraform)</td></tr><tr><th>déploiement</th><td>progressif, réversible</td></tr></table>"
 },
 {
  "kicker": "26.10",
  "title": "Kubernetes",
  "sub": "orchestrer à grande échelle",
  "body": "<p class=\"lede\"><b>Kubernetes</b> (K8s) fait tourner des conteneurs sur une grappe de machines : il les place, les redémarre, les met à l’échelle, les expose et les met à jour sans interruption.</p>\n    <table class=\"data\"><tr><th>objet</th><th>rôle</th></tr><tr><td>Pod</td><td>un ou plusieurs conteneurs qui tournent ensemble</td></tr><tr><td>Deployment</td><td>N copies d’un pod, mises à jour progressives</td></tr><tr><td>Service, Ingress</td><td>adresse stable, entrée HTTP</td></tr><tr><td>ConfigMap, Secret</td><td>configuration, secrets</td></tr><tr><td>HPA, KEDA</td><td>mise à l’échelle selon la charge ou la file d’attente</td></tr><tr><td>Job, CronJob</td><td>tâches ponctuelles ou planifiées</td></tr></table>\n    <ul class=\"rules\"><li>GPU : opérateur NVIDIA, demande <code>nvidia.com/gpu: 1</code>, nœuds GPU dédiés.</li><li>Pour l’IA : <b>KServe</b>, vLLM Production Stack, llm-d, Ray (KubeRay), Kueue (files de travaux GPU).</li><li>Déploiement déclaratif avec Helm et Argo CD (GitOps).</li></ul>",
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
  "panel": "<h2>Déployer vLLM sur Kubernetes</h2><div class=\"psub\">l’essentiel du manifeste</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Conteneur</b><i></i></span><pre class=\"ex\">image: vllm/vllm-openai:latest\nargs: [&#x27;--model&#x27;, &#x27;Qwen/Qwen3-8B&#x27;, &#x27;--max-model-len&#x27;, &#x27;16384&#x27;]</pre></li><li class=\"blue\"><span class=\"st\"><b>GPU</b><i></i></span><pre class=\"ex\">resources:\n  limits: {nvidia.com/gpu: 1}</pre></li><li class=\"\"><span class=\"st\"><b>Secret</b><i></i></span><pre class=\"ex\">env: [{name: HF_TOKEN, valueFrom: {secretKeyRef: {name: hf, key: token}}}]</pre></li><li class=\"\"><span class=\"st\"><b>Santé</b><i></i></span><pre class=\"ex\">readinessProbe: {httpGet: {path: /health, port: 8000}, initialDelaySeconds: 120}</pre></li><li class=\"red\"><span class=\"st\"><b>Échelle</b><i></i></span><pre class=\"ex\">KEDA sur vllm:num_requests_waiting &gt; 10</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "26.11",
  "title": "GitHub Actions",
  "sub": "l’automatisation dans le dépôt",
  "body": "<p class=\"lede\"><b>GitHub Actions</b> exécute des workflows décrits en YAML à chaque événement du dépôt (push, demande de fusion, étiquette, planning).</p>\n    <pre class=\"code\">name: ci\non: [pull_request]\njobs:\n  tests:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: astral-sh/setup-uv@v6\n      - run: uv sync --frozen\n      - run: uv run pytest -q\n      - run: uv run python -m evals.run --jeu fumee\n        env: {ANTHROPIC_API_KEY: &#x27;${{ secrets.ANTHROPIC_API_KEY }}&#x27;}</pre>\n    <ul class=\"rules\"><li>Secrets chiffrés du dépôt ; <b>OIDC</b> pour s’authentifier au cloud sans clé stockée.</li><li>Cache des dépendances, matrices (plusieurs versions), exécuteurs auto-hébergés avec GPU pour les évaluations lourdes.</li><li>Équivalents : GitLab CI, CircleCI, Buildkite.</li></ul>",
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
  "lit": "deploi",
  "look": {},
  "scene": "deploi",
  "fig": "",
  "panel": "<h2>Du commit à la production</h2><div class=\"psub\">un déploiement type</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Commit</b><i>Git</i></span><pre class=\"ex\">git push origin feature/rag-v2</pre></li><li class=\"blue\"><span class=\"st\"><b>CI</b><i>tests, évaluations</i></span><pre class=\"ex\">GitHub Actions : pytest, evals, ruff</pre></li><li class=\"\"><span class=\"st\"><b>Image</b><i>Docker</i></span><pre class=\"ex\">docker build -t registre/api:1.8.2 .</pre></li><li class=\"\"><span class=\"st\"><b>Registre</b><i></i></span><pre class=\"ex\">ECR, Artifact Registry, ACR, GHCR</pre></li><li class=\"red\"><span class=\"st\"><b>Infrastructure</b><i>Terraform</i></span><pre class=\"ex\">terraform apply : cluster, base, secrets</pre></li><li class=\"blue\"><span class=\"st\"><b>Déploiement</b><i>Kubernetes ou service géré</i></span><pre class=\"ex\">kubectl / Argo CD / ECS / Cloud Run</pre></li><li class=\"\"><span class=\"st\"><b>Observation</b><i></i></span><pre class=\"ex\">métriques, traces, alertes, retour arrière</pre></li></ol><p class=\"note\">Chaque changement suit le même chemin automatisé : tests, image immuable, infrastructure décrite en code, déploiement progressif, surveillance. Aucune étape manuelle sur les serveurs : tout se rejoue et se reconstruit.</p><table class=\"data\"><tr><th>artefact</th><td>image Docker immuable</td></tr><tr><th>infrastructure</th><td>en code (Terraform)</td></tr><tr><th>déploiement</th><td>progressif, réversible</td></tr></table>"
 },
 {
  "kicker": "26.12",
  "title": "Les pipelines CI/CD",
  "sub": "de la modification à la production",
  "body": "<p class=\"lede\">Un pipeline <b>CI/CD</b> complet pour une application d’IA :</p>\n    <ul class=\"rules\"><li><b>CI</b> : lint, typage, tests, évaluation de fumée, construction de l’image, analyse de sécurité (dépendances, image, secrets).</li><li><b>CD</b> : déploiement automatique en préproduction, tests de bout en bout, évaluation complète, puis production.</li><li><b>Stratégies</b> : progressif (canary), bleu-vert (deux environnements, bascule), drapeaux de fonctionnalité (activer un nouveau prompt pour 5 % des utilisateurs).</li><li><b>Retour arrière</b> automatique si les métriques se dégradent.</li><li><b>GitOps</b> : l’état voulu de la production est décrit dans Git ; Argo CD ou Flux l’appliquent.</li></ul>",
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
  "lit": "deploi",
  "look": {},
  "scene": "deploi",
  "fig": "",
  "panel": "<h2>Du commit à la production</h2><div class=\"psub\">un déploiement type</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Commit</b><i>Git</i></span><pre class=\"ex\">git push origin feature/rag-v2</pre></li><li class=\"blue\"><span class=\"st\"><b>CI</b><i>tests, évaluations</i></span><pre class=\"ex\">GitHub Actions : pytest, evals, ruff</pre></li><li class=\"\"><span class=\"st\"><b>Image</b><i>Docker</i></span><pre class=\"ex\">docker build -t registre/api:1.8.2 .</pre></li><li class=\"\"><span class=\"st\"><b>Registre</b><i></i></span><pre class=\"ex\">ECR, Artifact Registry, ACR, GHCR</pre></li><li class=\"red\"><span class=\"st\"><b>Infrastructure</b><i>Terraform</i></span><pre class=\"ex\">terraform apply : cluster, base, secrets</pre></li><li class=\"blue\"><span class=\"st\"><b>Déploiement</b><i>Kubernetes ou service géré</i></span><pre class=\"ex\">kubectl / Argo CD / ECS / Cloud Run</pre></li><li class=\"\"><span class=\"st\"><b>Observation</b><i></i></span><pre class=\"ex\">métriques, traces, alertes, retour arrière</pre></li></ol><p class=\"note\">Chaque changement suit le même chemin automatisé : tests, image immuable, infrastructure décrite en code, déploiement progressif, surveillance. Aucune étape manuelle sur les serveurs : tout se rejoue et se reconstruit.</p><table class=\"data\"><tr><th>artefact</th><td>image Docker immuable</td></tr><tr><th>infrastructure</th><td>en code (Terraform)</td></tr><tr><th>déploiement</th><td>progressif, réversible</td></tr></table>"
 },
 {
  "kicker": "26.13",
  "title": "Terraform",
  "sub": "l’infrastructure en code",
  "body": "<p class=\"lede\"><b>Terraform</b> (ou son équivalent open source <b>OpenTofu</b>) décrit l’infrastructure dans des fichiers : seaux, bases, grappes, réseaux, droits. On l’applique, on la versionne, on la relit, on la recrée à l’identique.</p>\n    <pre class=\"code\">resource &quot;aws_s3_bucket&quot; &quot;donnees&quot; { bucket = &quot;acme-ia-donnees&quot; }\nresource &quot;aws_db_instance&quot; &quot;pg&quot; {\n  engine = &quot;postgres&quot;; engine_version = &quot;17&quot;; instance_class = &quot;db.r6g.large&quot;\n  allocated_storage = 200; storage_encrypted = true; publicly_accessible = false\n}\n# terraform plan → relire ; terraform apply → créer</pre>\n    <ul class=\"rules\"><li>État partagé dans un stockage distant verrouillé ; modules réutilisables ; environnements séparés (dev, préprod, prod).</li><li>Le plan est relu comme du code, en demande de fusion.</li><li>Alternatives : Pulumi (en Python), AWS CDK, Bicep (Azure).</li></ul>",
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
  "lit": "deploi",
  "look": {},
  "scene": "deploi",
  "fig": "",
  "panel": "<h2>Du commit à la production</h2><div class=\"psub\">un déploiement type</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Commit</b><i>Git</i></span><pre class=\"ex\">git push origin feature/rag-v2</pre></li><li class=\"blue\"><span class=\"st\"><b>CI</b><i>tests, évaluations</i></span><pre class=\"ex\">GitHub Actions : pytest, evals, ruff</pre></li><li class=\"\"><span class=\"st\"><b>Image</b><i>Docker</i></span><pre class=\"ex\">docker build -t registre/api:1.8.2 .</pre></li><li class=\"\"><span class=\"st\"><b>Registre</b><i></i></span><pre class=\"ex\">ECR, Artifact Registry, ACR, GHCR</pre></li><li class=\"red\"><span class=\"st\"><b>Infrastructure</b><i>Terraform</i></span><pre class=\"ex\">terraform apply : cluster, base, secrets</pre></li><li class=\"blue\"><span class=\"st\"><b>Déploiement</b><i>Kubernetes ou service géré</i></span><pre class=\"ex\">kubectl / Argo CD / ECS / Cloud Run</pre></li><li class=\"\"><span class=\"st\"><b>Observation</b><i></i></span><pre class=\"ex\">métriques, traces, alertes, retour arrière</pre></li></ol><p class=\"note\">Chaque changement suit le même chemin automatisé : tests, image immuable, infrastructure décrite en code, déploiement progressif, surveillance. Aucune étape manuelle sur les serveurs : tout se rejoue et se reconstruit.</p><table class=\"data\"><tr><th>artefact</th><td>image Docker immuable</td></tr><tr><th>infrastructure</th><td>en code (Terraform)</td></tr><tr><th>déploiement</th><td>progressif, réversible</td></tr></table>"
 },
 {
  "kicker": "26.14",
  "title": "L’infrastructure GPU dans le cloud",
  "sub": "louer des GPU intelligemment",
  "body": "<p class=\"lede\">Les GPU dominent la facture d’une plateforme d’IA auto-hébergée.</p>\n    <table class=\"data\"><tr><th>fournisseur</th><th>exemples</th><th>pour</th></tr><tr><td>grands clouds</td><td>AWS, Google Cloud, Azure, OCI</td><td>intégration, conformité, réservations</td></tr><tr><td>néoclouds</td><td>CoreWeave, Lambda, Nebius, Crusoe, Scaleway, OVHcloud</td><td>prix, disponibilité des derniers GPU</td></tr><tr><td>sans serveur GPU</td><td>Modal, RunPod, Baseten, Replicate</td><td>charges variables, facturation à la seconde</td></tr><tr><td>places de marché</td><td>Vast.ai, RunPod community</td><td>expériences peu coûteuses</td></tr></table>\n    <ul class=\"rules\"><li>Choisir le GPU selon la <b>mémoire</b> nécessaire (poids + cache) puis le prix par million de jetons servis, pas le prix horaire seul.</li><li>Réserver pour la charge de base, préemptible ou sans serveur pour les pics et les travaux interruptibles (avec points de contrôle).</li><li>Souveraineté : en Europe, fournisseurs et régions européennes pour les données sensibles.</li></ul>",
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
 },
 {
  "kicker": "26.15",
  "title": "Déploiement et mise à l’échelle",
  "sub": "suivre la charge",
  "body": "<p class=\"lede\">Une application d’IA doit absorber des pics de charge sans payer des GPU inactifs la nuit.</p>\n    <ul class=\"rules\"><li><b>Horizontal</b> : ajouter des copies (pods, instances) derrière un répartiteur de charge ; l’API doit être <b>sans état</b> (état dans Postgres, Redis).</li><li><b>Mise à l’échelle automatique</b> selon le processeur, les requêtes en cours ou la longueur de file (KEDA) ; pour les GPU, sur la file d’attente du serveur d’inférence.</li><li><b>Démarrage à froid</b> des GPU : télécharger 16 à 140 Go de poids prend du temps ; cache local, images préchargées, chargement rapide (safetensors, Run:ai Model Streamer), un minimum d’instances chaudes.</li><li><b>Mise à zéro</b> la nuit pour les services internes.</li><li>Tests de charge (Locust, k6, vllm bench) avant le lancement.</li></ul>",
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
  "lit": "deploi",
  "look": {},
  "scene": "deploi",
  "fig": "",
  "panel": "<h2>Un test de charge avec Locust</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Scénario</b><i></i></span><pre class=\"ex\">class Utilisateur(HttpUser):\n    wait_time = between(2, 8)\n    @task\n    def question(self):\n        self.client.post(&#x27;/ask&#x27;, json={&#x27;texte&#x27;: random.choice(QUESTIONS)}, timeout=60)</pre></li><li class=\"\"><span class=\"st\"><b>Lancer</b><i></i></span><pre class=\"ex\">locust -f charge.py --users 200 --spawn-rate 10 --host https://preprod…</pre></li><li class=\"\"><span class=\"st\"><b>Observer</b><i></i></span><pre class=\"ex\">p95, erreurs, file vLLM, cache KV, coût par minute</pre></li><li class=\"red\"><span class=\"st\"><b>Décider</b><i></i></span><pre class=\"ex\">nombre de GPU, seuils KEDA, limites de débit</pre></li></ol><p class=\"note\"></p>"
 }
];
export const PLATES = {
  grappe: { text: "Les GPU sont la ressource la plus chère et la plus rare du cloud. On les loue à l’heure (à la demande, réservés ou préemptibles), chez les grands clouds ou des « néoclouds » spécialisés. Le choix se fait sur le prix par heure, la disponibilité, la mémoire par GPU et le réseau entre GPU.", facts: () => [["H100 à la demande", "≈ 2 à 10 $ / h selon le fournisseur"], ["préemptible", "−60 à −90 %, peut être coupé"], ["entraînement multi-nœuds", "InfiniBand ou RoCE indispensable"]] }
};
