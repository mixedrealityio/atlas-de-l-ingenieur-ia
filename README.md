# Atlas de l’ingénieur IA

Un manuel interactif, en français, pour devenir ingénieur IA : de Python aux systèmes d’IA en production. 30 chapitres et 357 pages, organisés en 23 étapes. Chaque page est accompagnée d’une fiche concrète (étapes, code, commandes, chiffres) ou d’une figure 3D animée (three.js), et beaucoup ont un exercice.

Ouvrir `index.html` dans un serveur web local (par exemple `python3 -m http.server`) : les modules JavaScript ne se chargent pas depuis `file://`.

## Étape 1 · Les fondations de la programmation

| N° | Chapitre | Contenu |
|---|---|---|
| 1 | Python pour l’ingénieur IA | Types, fonctions, objets, générateurs, décorateurs, asyncio, typage et paquets |
| 2 | Les outils du développeur | Le socle commun à tout ingénieur logiciel, vu sous l’angle de l’IA |

## Étape 2 · Mathématiques et bases de l’apprentissage

| N° | Chapitre | Contenu |
|---|---|---|
| 3 | Les mathématiques de l’IA | Juste ce qu’il faut de maths pour comprendre ce que font les modèles |
| 4 | Les bases de l’apprentissage automatique | Données d’entraînement et de test, surapprentissage, pertes, métriques, réseaux de neurones |

## Étape 3 · Ingénierie et traitement des données

| N° | Chapitre | Contenu |
|---|---|---|
| 5 | Ingénierie et traitement des données | Les données décident de la qualité d’un système d’IA plus que le modèle |

## Étape 4 · Apprentissage profond et réseaux de neurones

| N° | Chapitre | Contenu |
|---|---|---|
| 6 | Les réseaux de neurones profonds | Perceptrons, couches, pertes, optimiseurs, CNN, RNN, attention, transformeurs, plongements |

## Étape 5 · Les frameworks d’apprentissage profond

| N° | Chapitre | Contenu |
|---|---|---|
| 7 | PyTorch | Tenseurs, autograd, nn.Module, DataLoader, boucles d’entraînement, GPU, points de contrôle |
| 8 | TensorFlow, Hugging Face et CUDA | Keras, la bibliothèque Transformers, les jeux de données, les tokeniseurs, Accelerate et la programmation GPU |

## Étape 6 · Les fondamentaux des modèles de langage

| N° | Chapitre | Contenu |
|---|---|---|
| 9 | Comment fonctionne un modèle de langage | Transformeur, encodeurs et décodeurs, GPT, BERT, jetons, contexte, positions, attention |
| 10 | Entraîner et aligner un modèle de langage | Pré-entraînement, lois d’échelle, post-entraînement, instructions, RLHF, DPO, raisonnement |

## Étape 7 · Les API de modèles et l’intégration

| N° | Chapitre | Contenu |
|---|---|---|
| 11 | Appeler des modèles par API | Authentification, streaming, sorties structurées, outils, multimodal, erreurs, limites, coûts, routage |

## Étape 8 · Prompt et ingénierie du contexte

| N° | Chapitre | Contenu |
|---|---|---|
| 12 | Prompt et ingénierie du contexte | Instructions, exemples, raisonnement, gabarits, gestion et compression du contexte, versions, injections, évaluation |

## Étape 9 · Plongements et bases vectorielles

| N° | Chapitre | Contenu |
|---|---|---|
| 13 | Plongements et bases vectorielles | Plongements denses et creux, modèles, similarité, index approchés, Pinecone, Qdrant, Weaviate, Milvus, Chroma, filtres, recherche hybride |

## Étape 10 · La génération augmentée par récupération (RAG)

| N° | Chapitre | Contenu |
|---|---|---|
| 14 | Construire un système RAG | Architecture, ingestion, analyse de documents, découpage, chevauchement, plongements, stockage, transformation des requêtes, récupération |
| 15 | Le RAG avancé | Reranking, récupération hybride et contextuelle, parent-enfant, requêtes multiples, Graph RAG, RAG agentique, évaluation, optimisation |

## Étape 11 · Les agents et les systèmes agentiques

| N° | Chapitre | Contenu |
|---|---|---|
| 16 | Les agents d’IA | Architecture, raisonnement et planification, outils, exécution, mémoire, état, orchestration |
| 17 | Les systèmes agentiques | Mono-agent et multi-agents, humain dans la boucle, réflexion, boucles plan-exécution, fiabilité, évaluation, sécurité |

## Étape 12 · Frameworks d’IA et orchestration

| N° | Chapitre | Contenu |
|---|---|---|
| 18 | Les frameworks d’IA | Haystack, Semantic Kernel, Pydantic AI, DSPy, CrewAI, AutoGen, orchestration, choisir |

## Étape 13 · Affiner et adapter les modèles

| N° | Chapitre | Contenu |
|---|---|---|
| 19 | Affiner et adapter un modèle | Modèles pré-entraînés, affinage supervisé, PEFT, LoRA, QLoRA, données, données synthétiques, DPO, évaluation, affinage ou RAG |

## Étape 14 · L’ingénierie de l’IA multimodale

| N° | Chapitre | Contenu |
|---|---|---|
| 20 | L’IA multimodale | Modèles vision-langage, OCR, parole, synthèse vocale, audio, vidéo, plongements multimodaux, génération d’images, diffusion, RAG multimodal |

## Étape 15 · Évaluer et tester l’IA

| N° | Chapitre | Contenu |
|---|---|---|
| 21 | Évaluer et tester les systèmes d’IA | Tests, modèles juges, jeux de référence, exactitude, fidélité, pertinence, hallucinations, RAG, agents, humains, régression, en ligne et hors ligne, observabilité |

## Étape 16 · Infrastructure et ingénierie de l’inférence

| N° | Chapitre | Contenu |
|---|---|---|
| 22 | Comprendre l’inférence des modèles de langage | Préremplissage et décodage, cache clé-valeur, batching continu, PagedAttention, décodage spéculatif, quantification, élagage, distillation |
| 23 | Servir des modèles en production | Service de modèles, moteurs d’inférence, mémoire GPU, latence et débit, inférence distribuée |

## Étape 17 · Le backend des applications d’IA

| N° | Chapitre | Contenu |
|---|---|---|
| 24 | Le backend des applications d’IA | FastAPI, Flask, REST, WebSockets, asynchrone, Redis, PostgreSQL, tâches de fond, files de messages, authentification, limites, sécurité, microservices, architecture |

## Étape 18 · MLOps et LLMOps

| N° | Chapitre | Contenu |
|---|---|---|
| 25 | MLOps et LLMOps | Cycle de vie, suivi d’expériences, MLflow, Weights & Biases, Langfuse, LangSmith, versions de prompts, modèles et données, traces, coûts, surveillance, CI/CD, évaluations automatiques |

## Étape 19 · Cloud et DevOps

| N° | Chapitre | Contenu |
|---|---|---|
| 26 | Cloud et DevOps pour l’IA | AWS (S3, EC2, Lambda, ECS, EKS, SageMaker), Google Cloud et Vertex AI, Azure AI, Docker, Kubernetes, GitHub Actions, CI/CD, Terraform, GPU, mise à l’échelle |

## Étape 20 · Sécurité de l’IA et IA responsable

| N° | Chapitre | Contenu |
|---|---|---|
| 27 | Sécurité de l’IA et IA responsable | Injection de prompt, jailbreaks, fuites de données, PII, outils, bacs à sable, chaîne d’approvisionnement, attaques adverses, biais, explicabilité, gouvernance, garde-fous |

## Étape 21 · Conception et architecture des systèmes d’IA

| N° | Chapitre | Contenu |
|---|---|---|
| 28 | Concevoir des systèmes d’IA | Applications évolutives, conception de RAG et d’agents, routage, multi-locataires, caches, stockage, tâches distribuées, tolérance aux pannes, coûts, latence, disponibilité, compromis |

## Étape 22 · Construire des projets réels

| N° | Chapitre | Contenu |
|---|---|---|
| 29 | Construire des projets réels | Assistant de recherche, documents, RAG de production, multi-agents, support, code, multimodal, réunions, entreprise, automatisation, affinage, évaluation, SaaS |

## Étape 23 · Préparer sa carrière

| N° | Chapitre | Contenu |
|---|---|---|
| 30 | Préparer sa carrière d’ingénieur IA | Portfolio GitHub, CV, entretiens Python et SQL, fondamentaux ML et LLM, conception de systèmes, RAG et agents, inférence, études de cas, open source, articles, apprendre en public, candidater |

Moteur de pages et de figures repris de l’Atlas de l’IA (lui-même dérivé d’Atlas of Physics, licence MIT, voir `LICENSE`).
