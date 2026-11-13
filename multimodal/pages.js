// Chapitre 20 : L’IA multimodale (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 20 · Multimodal",
  "title": "L’IA multimodale",
  "sub": "au-delà du texte",
  "body": "<p class=\"lede\">Les modèles <b>multimodaux</b> lisent (et parfois produisent) des images, des documents, de la parole, de l’audio et de la vidéo. Pour l’ingénieur, cela ouvre l’automatisation de tâches jusqu’ici manuelles : lire des factures scannées, répondre au téléphone, résumer des réunions, inspecter des photos, piloter une interface.</p>\n    <p>Ce chapitre passe en revue les modalités, les modèles et les pièges propres à chacune : coûts en jetons, latence, qualité des entrées, confidentialité.</p>",
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
  "lit": "vit",
  "look": {},
  "scene": "vit",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "20.1",
  "title": "Les modèles vision-langage",
  "sub": "voir et parler",
  "body": "<p class=\"lede\">Un <b>modèle vision-langage</b> (VLM) associe un encodeur d’images à un modèle de langage. On lui envoie des images et du texte, il répond en texte.</p>\n    <ul class=\"rules\"><li>Propriétaires : Claude, GPT, Gemini (natifs multimodaux).</li><li>Ouverts : Qwen-VL, Gemma 3, Llama 4, Pixtral, InternVL, Molmo, SmolVLM.</li><li>Usages : description, questions sur une image, extraction de champs, lecture de graphiques, comparaison d’images, contrôle qualité.</li><li>Limites : comptage précis, petits détails, positions exactes, hallucinations visuelles ; la résolution d’entrée compte.</li></ul>",
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
  "lit": "vit",
  "look": {},
  "scene": "vit",
  "fig": "",
  "panel": "<h2>Interroger une image</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Préparer</b><i>redimensionner</i></span><pre class=\"ex\">img = Image.open(p); img.thumbnail((1568, 1568))\nb64 = base64.b64encode(to_png(img)).decode()</pre></li><li class=\"blue\"><span class=\"st\"><b>Message</b><i>image puis question</i></span><pre class=\"ex\">content = [{&#x27;type&#x27;: &#x27;image&#x27;, &#x27;source&#x27;: {&#x27;type&#x27;: &#x27;base64&#x27;,\n  &#x27;media_type&#x27;: &#x27;image/png&#x27;, &#x27;data&#x27;: b64}},\n {&#x27;type&#x27;: &#x27;text&#x27;, &#x27;text&#x27;: &#x27;Liste les défauts visibles sur cette pièce.&#x27;}]</pre></li><li class=\"\"><span class=\"st\"><b>Sortie structurée</b><i></i></span><pre class=\"ex\">response_format = Defauts   # liste de {type, position, gravité}</pre></li><li class=\"red\"><span class=\"st\"><b>Coût</b><i></i></span><pre class=\"ex\">≈ (largeur × hauteur) / 750 jetons pour Claude</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "20.2",
  "title": "Comprendre les images",
  "sub": "classer, détecter, segmenter",
  "body": "<p class=\"lede\">Tous les problèmes d’image ne demandent pas un grand VLM.</p>\n    <table class=\"data\"><tr><th>tâche</th><th>outil rapide</th><th>quand un VLM</th></tr><tr><td>classification</td><td>CNN ou ViT affiné, CLIP zéro-shot</td><td>catégories floues, explications</td></tr><tr><td>détection d’objets</td><td>YOLO, RT-DETR</td><td>objets décrits en langage naturel</td></tr><tr><td>segmentation</td><td>SAM 2</td><td>—</td></tr><tr><td>similarité, doublons</td><td>plongements CLIP, SigLIP</td><td>—</td></tr><tr><td>description, raisonnement</td><td>—</td><td>oui</td></tr></table>\n    <p>Pour des millions d’images ou du temps réel (caméras), un petit modèle spécialisé, éventuellement entraîné avec des étiquettes produites par un VLM, est bien plus économique.</p>",
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
  "lit": "detect",
  "look": {},
  "scene": "detect",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "20.3",
  "title": "OCR et intelligence documentaire",
  "sub": "lire les documents",
  "body": "<p class=\"lede\">L’<b>intelligence documentaire</b> transforme des documents (scans, PDF, photos) en données structurées : texte, tableaux, champs, mise en page.</p>\n    <table class=\"data\"><tr><th>approche</th><th>outils</th><th>forces</th></tr><tr><td>OCR classique</td><td>Tesseract, PaddleOCR, docTR</td><td>rapide, local, bon sur texte net</td></tr><tr><td>services cloud</td><td>Azure Document Intelligence, AWS Textract, Google Document AI</td><td>formulaires, tableaux, modèles prêts</td></tr><tr><td>analyse de mise en page</td><td>Docling, Marker, MinerU</td><td>PDF → Markdown structuré</td></tr><tr><td>OCR par VLM</td><td>Mistral OCR, olmOCR, Qwen-VL, modèles de pointe</td><td>mises en page complexes, écriture manuscrite, tableaux</td></tr></table>\n    <ul class=\"rules\"><li>Extraire des <b>champs</b> : VLM + schéma JSON (Pydantic) + validation (totaux cohérents, dates valides).</li><li>Garder la <b>position</b> (page, coordonnées) pour montrer la preuve à l’utilisateur.</li><li>Mesurer sur un échantillon annoté : taux d’erreur par champ, pas une impression globale.</li></ul>",
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
  "lit": "detect",
  "look": {},
  "scene": "detect",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "20.4",
  "title": "La reconnaissance de la parole",
  "sub": "de la voix au texte",
  "body": "<p class=\"lede\">La <b>transcription</b> (speech-to-text, STT ou ASR) convertit l’audio en texte.</p>\n    <ul class=\"rules\"><li><b>Whisper</b> (OpenAI, ouvert) et ses dérivés rapides (faster-whisper, whisper.cpp, distil-whisper) ; Parakeet et Canary (NVIDIA), Voxtral (Mistral).</li><li>API : Deepgram, AssemblyAI, Speechmatics, gpt-4o-transcribe, Google, Azure.</li><li><b>Diarisation</b> (qui parle quand) : pyannote, ou intégrée aux API.</li><li><b>Temps réel</b> : transcription en flux avec résultats partiels, pour les agents vocaux.</li><li>Mesure : <b>WER</b> (taux d’erreur sur les mots) ; attention aux noms propres et au vocabulaire métier (glossaire, prompt de contexte).</li></ul>",
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
  "lit": "voix",
  "look": {},
  "scene": "voix",
  "fig": "",
  "panel": "<h2>Transcrire une réunion en local</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Modèle</b><i></i></span><pre class=\"ex\">m = WhisperModel(&#x27;large-v3-turbo&#x27;, device=&#x27;cuda&#x27;, compute_type=&#x27;float16&#x27;)</pre></li><li class=\"blue\"><span class=\"st\"><b>Transcrire</b><i></i></span><pre class=\"ex\">segs, info = m.transcribe(&#x27;reunion.m4a&#x27;, language=&#x27;fr&#x27;, vad_filter=True,\n  initial_prompt=&#x27;Acme, Kubernetes, vLLM, Durand&#x27;)</pre></li><li class=\"\"><span class=\"st\"><b>Texte horodaté</b><i></i></span><pre class=\"ex\">for s in segs: print(f&#x27;[{s.start:.0f}s] {s.text}&#x27;)</pre></li><li class=\"\"><span class=\"st\"><b>Locuteurs</b><i></i></span><pre class=\"ex\">pyannote/speaker-diarization-3.1 → aligner par horodatage</pre></li><li class=\"red\"><span class=\"st\"><b>Résumer</b><i></i></span><pre class=\"ex\">llm(&#x27;Décisions, actions, responsables :&#x27;, transcription)</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "20.5",
  "title": "La synthèse vocale",
  "sub": "du texte à la voix",
  "body": "<p class=\"lede\">La <b>synthèse vocale</b> (text-to-speech, TTS) produit une voix naturelle à partir de texte.</p>\n    <ul class=\"rules\"><li>API : ElevenLabs, OpenAI, Cartesia, Google, Azure ; modèles ouverts : Kokoro, XTTS, F5-TTS, Piper (léger, local), Sesame CSM, Voxtral.</li><li><b>Latence</b> du premier son (100 à 300 ms pour les meilleurs) : décisive pour la conversation.</li><li><b>Flux</b> : synthétiser phrase par phrase pendant que le modèle génère.</li><li>Prononciation des nombres, sigles, noms propres : normaliser le texte avant (« 3,5 % » → « trois virgule cinq pour cent »).</li><li><b>Clonage de voix</b> : exige le consentement de la personne ; risque d’usurpation à encadrer.</li></ul>",
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
  "lit": "voix",
  "look": {},
  "scene": "voix",
  "fig": "",
  "panel": "<h2>Un agent vocal</h2><div class=\"psub\">de la parole à la parole</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Micro</b><i>audio en flux</i></span><pre class=\"ex\">WebRTC, 16 kHz</pre></li><li class=\"\"><span class=\"st\"><b>Détection de parole</b><i>VAD, fin de tour</i></span><pre class=\"ex\">Silero VAD : l’utilisateur a fini ?</pre></li><li class=\"blue\"><span class=\"st\"><b>Transcription</b><i>STT</i></span><pre class=\"ex\">Whisper, Deepgram → texte partiel en direct</pre></li><li class=\"red\"><span class=\"st\"><b>Modèle de langage</b><i>réponse en flux</i></span><pre class=\"ex\">premiers jetons en ~300 ms</pre></li><li class=\"blue\"><span class=\"st\"><b>Synthèse vocale</b><i>TTS en flux</i></span><pre class=\"ex\">commence à parler dès la 1re phrase</pre></li><li class=\"\"><span class=\"st\"><b>Haut-parleur</b><i>interruption possible</i></span><pre class=\"ex\">l’utilisateur coupe → on arrête la voix</pre></li></ol><p class=\"note\">Un agent vocal enchaîne transcription, modèle de langage et synthèse, tout en flux, pour répondre en moins d’une seconde. Les modèles parole-à-parole (API temps réel) fusionnent ces étapes et gardent l’intonation, au prix d’un contrôle plus faible.</p><table class=\"data\"><tr><th>objectif de latence</th><td>&lt; 800 ms</td></tr><tr><th>frameworks</th><td>Pipecat, LiveKit Agents</td></tr><tr><th>difficile</th><td>tours de parole, interruptions</td></tr></table>"
 },
 {
  "kicker": "20.6",
  "title": "Comprendre l’audio",
  "sub": "au-delà des mots",
  "body": "<p class=\"lede\">Certains modèles écoutent directement l’audio, sans passer par une transcription : ton, émotion, bruits, musique, plusieurs locuteurs.</p>\n    <ul class=\"rules\"><li>Modèles audio-langage : Gemini, GPT-4o audio, Qwen2-Audio / Qwen-Omni, Voxtral.</li><li><b>Parole-à-parole</b> : les API temps réel (OpenAI Realtime, Gemini Live) prennent et rendent de l’audio, avec une latence très faible et une voix plus expressive.</li><li>Classification de sons (pannes de machines, alarmes) : petits modèles spécialisés (PANNs, AST, CLAP).</li><li>Prétraitement : rééchantillonnage (16 kHz), réduction de bruit, découpage par silences.</li></ul>\n    <p>Pour un agent vocal en production, le choix entre pipeline (STT → LLM → TTS) et parole-à-parole dépend du besoin de contrôle (outils, journaux texte, conformité) et de naturel.</p>",
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
  "lit": "voix",
  "look": {},
  "scene": "voix",
  "fig": "",
  "panel": "<h2>Un agent vocal</h2><div class=\"psub\">de la parole à la parole</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Micro</b><i>audio en flux</i></span><pre class=\"ex\">WebRTC, 16 kHz</pre></li><li class=\"\"><span class=\"st\"><b>Détection de parole</b><i>VAD, fin de tour</i></span><pre class=\"ex\">Silero VAD : l’utilisateur a fini ?</pre></li><li class=\"blue\"><span class=\"st\"><b>Transcription</b><i>STT</i></span><pre class=\"ex\">Whisper, Deepgram → texte partiel en direct</pre></li><li class=\"red\"><span class=\"st\"><b>Modèle de langage</b><i>réponse en flux</i></span><pre class=\"ex\">premiers jetons en ~300 ms</pre></li><li class=\"blue\"><span class=\"st\"><b>Synthèse vocale</b><i>TTS en flux</i></span><pre class=\"ex\">commence à parler dès la 1re phrase</pre></li><li class=\"\"><span class=\"st\"><b>Haut-parleur</b><i>interruption possible</i></span><pre class=\"ex\">l’utilisateur coupe → on arrête la voix</pre></li></ol><p class=\"note\">Un agent vocal enchaîne transcription, modèle de langage et synthèse, tout en flux, pour répondre en moins d’une seconde. Les modèles parole-à-parole (API temps réel) fusionnent ces étapes et gardent l’intonation, au prix d’un contrôle plus faible.</p><table class=\"data\"><tr><th>objectif de latence</th><td>&lt; 800 ms</td></tr><tr><th>frameworks</th><td>Pipecat, LiveKit Agents</td></tr><tr><th>difficile</th><td>tours de parole, interruptions</td></tr></table>"
 },
 {
  "kicker": "20.7",
  "title": "Comprendre la vidéo",
  "sub": "des images dans le temps",
  "body": "<p class=\"lede\">Une vidéo est une suite d’images avec du son. Les modèles la traitent en <b>échantillonnant</b> des images (1 par seconde par exemple) et en ajoutant la transcription.</p>\n    <ul class=\"rules\"><li>Gemini lit nativement de longues vidéos ; d’autres VLM acceptent quelques dizaines d’images.</li><li>Coût : 1 heure à 1 image/s = 3 600 images, soit des centaines de milliers de jetons ; réduire la fréquence, détecter les changements de plan (PySceneDetect).</li><li>Usages : résumé, recherche d’un moment, indexation de cours et de réunions, contrôle de sécurité, analyse sportive.</li><li>Pour la recherche dans une vidéothèque : découper en segments, décrire et plonger chaque segment, indexer avec les horodatages.</li></ul>",
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
  "lit": "vit",
  "look": {},
  "scene": "vit",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "20.8",
  "title": "Les plongements multimodaux",
  "sub": "texte et images dans un même espace",
  "body": "<p class=\"lede\">Des modèles comme <b>CLIP</b> (2021) et <b>SigLIP</b> apprennent un espace commun aux images et aux textes : l’image d’un chat et la phrase « un chat » ont des vecteurs proches.</p>\n    <ul class=\"rules\"><li><b>Recherche d’images par texte</b> et d’images par image.</li><li><b>Classification zéro-shot</b> : comparer l’image aux phrases « une photo de {classe} ».</li><li>Modèles pour documents : <b>ColPali</b> / ColQwen plongent directement des images de pages, sans OCR.</li><li>Plongements multimodaux par API : Cohere Embed, Voyage multimodal, Google, Jina CLIP.</li></ul>",
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
  "lit": "vit",
  "look": {},
  "scene": "vit",
  "fig": "",
  "panel": "<h2>Chercher des images par une phrase</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Modèle</b><i></i></span><pre class=\"ex\">m = SentenceTransformer(&#x27;clip-ViT-B-32&#x27;)</pre></li><li class=\"blue\"><span class=\"st\"><b>Indexer</b><i></i></span><pre class=\"ex\">I = m.encode([Image.open(p) for p in chemins], normalize_embeddings=True)</pre></li><li class=\"\"><span class=\"st\"><b>Requête</b><i></i></span><pre class=\"ex\">q = m.encode(&#x27;une palette renversée dans un entrepôt&#x27;, normalize_embeddings=True)</pre></li><li class=\"red\"><span class=\"st\"><b>Résultats</b><i></i></span><pre class=\"ex\">chemins[np.argsort(-(I @ q))[:10]]</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "20.9",
  "title": "Les modèles de génération d’images",
  "sub": "créer des visuels",
  "body": "<p class=\"lede\">Les modèles texte-vers-image produisent des images à partir d’une description, et souvent modifient une image existante.</p>\n    <table class=\"data\"><tr><th>famille</th><th>exemples</th></tr><tr><td>API propriétaires</td><td>GPT Image, Imagen, Midjourney, Firefly, Gemini image</td></tr><tr><td>ouverts</td><td>FLUX, Stable Diffusion 3.5, SDXL, Qwen-Image, HiDream</td></tr><tr><td>vidéo</td><td>Veo, Sora, Kling, Runway, Wan, HunyuanVideo</td></tr></table>\n    <ul class=\"rules\"><li>Usages : visuels marketing, maquettes, illustrations, variantes produit, édition (retirer un objet, changer un fond).</li><li>Contrôle : <b>ControlNet</b> (pose, contours), image de référence, LoRA de style ou de produit.</li><li>Questions de droits : licence du modèle, droits sur les images d’entraînement, marquage des contenus générés (C2PA, filigranes).</li></ul>",
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
  "lit": "vit",
  "look": {},
  "scene": "vit",
  "fig": "",
  "panel": ""
 },
 {
  "kicker": "20.10",
  "title": "Les modèles de diffusion",
  "sub": "partir du bruit",
  "body": "<p class=\"lede\">Un <b>modèle de diffusion</b> apprend à <b>enlever du bruit</b>. À l’entraînement, on ajoute progressivement du bruit gaussien à des images et le réseau apprend à prédire ce bruit. À la génération, on part d’un bruit pur et on le débruite pas à pas, guidé par le texte.</p>\n    <ul class=\"rules\"><li>La diffusion se fait dans un <b>espace latent</b> compressé (VAE), bien plus petit que les pixels : c’est la « latent diffusion ».</li><li>Le réseau de débruitage est un U-Net ou, de plus en plus, un transformeur (DiT, MM-DiT).</li><li>Le <b>guidage</b> (classifier-free guidance) règle à quel point l’image suit le texte.</li><li>Moins d’étapes = plus rapide : de 50 à 1–4 étapes avec la distillation et le <b>flow matching</b>.</li></ul>",
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
  "lit": "vit",
  "look": {},
  "scene": "vit",
  "fig": "",
  "panel": "<h2>Générer une image avec diffusers</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Charger</b><i></i></span><pre class=\"ex\">pipe = FluxPipeline.from_pretrained(&#x27;black-forest-labs/FLUX.1-schnell&#x27;,\n  torch_dtype=torch.bfloat16).to(&#x27;cuda&#x27;)</pre></li><li class=\"blue\"><span class=\"st\"><b>Générer</b><i></i></span><pre class=\"ex\">img = pipe(&#x27;photo produit d’une gourde bleue sur fond blanc, studio&#x27;,\n  num_inference_steps=4, guidance_scale=0.0,\n  generator=torch.Generator(&#x27;cuda&#x27;).manual_seed(42)).images[0]</pre></li><li class=\"\"><span class=\"st\"><b>Sauver</b><i></i></span><pre class=\"ex\">img.save(&#x27;gourde.png&#x27;)</pre></li><li class=\"red\"><span class=\"st\"><b>Mémoire</b><i></i></span><pre class=\"ex\">pipe.enable_model_cpu_offload()  # GPU modeste</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "20.11",
  "title": "Le RAG multimodal",
  "sub": "chercher dans des documents visuels",
  "body": "<p class=\"lede\">Beaucoup de documents d’entreprise sont visuels : schémas, tableaux, diapositives, plans, photos. Un RAG texte seul en perd une grande partie.</p>\n    <table class=\"data\"><tr><th>approche</th><th>principe</th></tr><tr><td>tout en texte</td><td>décrire chaque image et tableau par un VLM à l’ingestion, puis RAG classique</td></tr><tr><td>plongements multimodaux</td><td>indexer images et textes dans un même espace (CLIP, Cohere Embed)</td></tr><tr><td>pages en images</td><td>ColPali : plonger chaque page comme image, récupérer les pages, les envoyer à un VLM</td></tr><tr><td>hybride</td><td>texte extrait + image de la page dans le contexte de génération</td></tr></table>\n    <p>L’approche « pages en images » évite l’analyse fragile des PDF complexes ; elle coûte plus en stockage (multi-vecteurs) et en jetons d’image à la génération. Comme toujours, comparer sur un jeu d’évaluation qui contient des questions sur les figures et les tableaux.</p>",
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
  "lit": "vit",
  "look": {},
  "scene": "vit",
  "fig": "",
  "panel": ""
 }
];
export const PLATES = {
  vit: { text: "Un modèle vision-langage découpe l’image en patchs (souvent 14 × 14 ou 16 × 16 pixels), transforme chaque patch en vecteur avec un encodeur de vision, puis projette ces vecteurs dans l’espace des jetons du modèle de langage. L’image devient quelques centaines à quelques milliers de jetons, que le modèle lit comme du texte.", facts: () => [["patch courant", "14 ou 16 pixels"], ["image 1024 × 1024", "≈ 1 000 à 4 000 jetons"], ["coût", "les images se paient en jetons"]] },
  detect: { text: "Au-delà de la description, la compréhension d’image comprend la détection d’objets, la segmentation, la lecture de texte (OCR) et l’analyse de mise en page. Les modèles vision-langage récents savent aussi pointer des coordonnées, ce qui sert aux agents qui pilotent un écran.", facts: () => [["détection", "YOLO, DETR, Grounding DINO"], ["segmentation", "SAM"], ["VLM", "description, questions, extraction"]] }
};
