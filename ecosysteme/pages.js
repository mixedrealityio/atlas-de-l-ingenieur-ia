// Chapitre 8 : TensorFlow, Hugging Face et CUDA (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 8 · Frameworks",
  "title": "TensorFlow, Hugging Face et CUDA",
  "sub": "l’écosystème",
  "body": "<p class=\"lede\">Autour de PyTorch gravite un écosystème que l’ingénieur IA utilise chaque jour : <b>Hugging Face</b> pour trouver, charger, affiner et partager modèles et jeux de données ; <b>CUDA</b> pour faire tourner le tout sur GPU.</p>\n    <p><b>TensorFlow</b> et <b>Keras</b> restent présents dans l’industrie, surtout pour des systèmes existants et l’embarqué, et <b>JAX</b> est utilisé par Google et certains laboratoires pour l’entraînement à grande échelle.</p>\n    <p>Ce chapitre donne les bases pour s’y retrouver et lire un code qui utilise l’un ou l’autre.</p>",
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
  "lit": "hub",
  "look": {},
  "scene": "hub",
  "fig": "",
  "panel": "<h2>Du Hub à la réponse</h2><div class=\"psub\">charger et utiliser un modèle ouvert</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Hub</b><i>modèle + fiche</i></span><pre class=\"ex\">huggingface.co/Qwen/Qwen3-8B\n# config.json, tokenizer.json, *.safetensors</pre></li><li class=\"\"><span class=\"st\"><b>Télécharger</b><i>cache local</i></span><pre class=\"ex\">hf download Qwen/Qwen3-8B\n# ~/.cache/huggingface/hub</pre></li><li class=\"blue\"><span class=\"st\"><b>Tokeniseur</b><i>texte → ids</i></span><pre class=\"ex\">tok = AutoTokenizer.from_pretrained(nom)</pre></li><li class=\"red\"><span class=\"st\"><b>Modèle</b><i>poids sur GPU</i></span><pre class=\"ex\">m = AutoModelForCausalLM.from_pretrained(nom,\n  torch_dtype=&#x27;auto&#x27;, device_map=&#x27;auto&#x27;)</pre></li><li class=\"blue\"><span class=\"st\"><b>Génération</b><i></i></span><pre class=\"ex\">out = m.generate(**tok(p, return_tensors=&#x27;pt&#x27;).to(m.device), max_new_tokens=200)</pre></li><li class=\"\"><span class=\"st\"><b>Décodage</b><i>ids → texte</i></span><pre class=\"ex\">tok.decode(out[0], skip_special_tokens=True)</pre></li></ol><p class=\"note\">Les classes Auto* lisent config.json et instancient la bonne architecture. device_map='auto' répartit les couches sur les GPU disponibles, voire sur le CPU. En production, on préfère un moteur de service (vLLM, chapitre 23) à generate().</p><table class=\"data\"><tr><th>modèles sur le Hub</th><td>plus de 2 millions</td></tr><tr><th>format des poids</th><td>safetensors</td></tr><tr><th>cache</th><td>~/.cache/huggingface</td></tr></table>"
 },
 {
  "kicker": "8.1",
  "title": "Les bases de TensorFlow et Keras",
  "sub": "l’autre grand framework",
  "body": "<p class=\"lede\"><b>TensorFlow</b> (Google, 2015) a dominé l’industrie avant PyTorch. <b>Keras</b>, son interface de haut niveau, décrit un modèle en quelques lignes ; Keras 3 fonctionne au-dessus de TensorFlow, JAX ou PyTorch.</p>\n    <pre class=\"code\">model = keras.Sequential([keras.layers.Dense(256, activation=&#x27;relu&#x27;), keras.layers.Dense(12, activation=&#x27;softmax&#x27;)])\nmodel.compile(optimizer=&#x27;adam&#x27;, loss=&#x27;sparse_categorical_crossentropy&#x27;, metrics=[&#x27;accuracy&#x27;])\nmodel.fit(X, y, epochs=5, validation_split=0.1)</pre>\n    <table class=\"data\"><tr><th>besoin</th><th>outil courant</th></tr><tr><td>recherche, LLM ouverts</td><td>PyTorch</td></tr><tr><td>mobile, embarqué</td><td>TensorFlow Lite / LiteRT, ONNX</td></tr><tr><td>navigateur</td><td>TensorFlow.js, ONNX Runtime Web</td></tr><tr><td>TPU, très grande échelle</td><td>JAX</td></tr></table>\n    <p>Pour passer d’un framework à l’autre, le format d’échange <b>ONNX</b> permet d’exporter un modèle et de l’exécuter avec ONNX Runtime.</p>",
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
  "lit": "hub",
  "look": {},
  "scene": "hub",
  "fig": "",
  "panel": "<h2>Du Hub à la réponse</h2><div class=\"psub\">charger et utiliser un modèle ouvert</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Hub</b><i>modèle + fiche</i></span><pre class=\"ex\">huggingface.co/Qwen/Qwen3-8B\n# config.json, tokenizer.json, *.safetensors</pre></li><li class=\"\"><span class=\"st\"><b>Télécharger</b><i>cache local</i></span><pre class=\"ex\">hf download Qwen/Qwen3-8B\n# ~/.cache/huggingface/hub</pre></li><li class=\"blue\"><span class=\"st\"><b>Tokeniseur</b><i>texte → ids</i></span><pre class=\"ex\">tok = AutoTokenizer.from_pretrained(nom)</pre></li><li class=\"red\"><span class=\"st\"><b>Modèle</b><i>poids sur GPU</i></span><pre class=\"ex\">m = AutoModelForCausalLM.from_pretrained(nom,\n  torch_dtype=&#x27;auto&#x27;, device_map=&#x27;auto&#x27;)</pre></li><li class=\"blue\"><span class=\"st\"><b>Génération</b><i></i></span><pre class=\"ex\">out = m.generate(**tok(p, return_tensors=&#x27;pt&#x27;).to(m.device), max_new_tokens=200)</pre></li><li class=\"\"><span class=\"st\"><b>Décodage</b><i>ids → texte</i></span><pre class=\"ex\">tok.decode(out[0], skip_special_tokens=True)</pre></li></ol><p class=\"note\">Les classes Auto* lisent config.json et instancient la bonne architecture. device_map='auto' répartit les couches sur les GPU disponibles, voire sur le CPU. En production, on préfère un moteur de service (vLLM, chapitre 23) à generate().</p><table class=\"data\"><tr><th>modèles sur le Hub</th><td>plus de 2 millions</td></tr><tr><th>format des poids</th><td>safetensors</td></tr><tr><th>cache</th><td>~/.cache/huggingface</td></tr></table>"
 },
 {
  "kicker": "8.2",
  "title": "L’écosystème Hugging Face",
  "sub": "le GitHub des modèles",
  "body": "<p class=\"lede\"><b>Hugging Face</b> est à la fois une plateforme (le <b>Hub</b> : modèles, jeux de données, démos) et une famille de bibliothèques open source.</p>\n    <table class=\"data\"><tr><th>bibliothèque</th><th>rôle</th></tr><tr><td>transformers</td><td>charger et utiliser des milliers d’architectures</td></tr><tr><td>datasets</td><td>charger et transformer des jeux de données</td></tr><tr><td>tokenizers</td><td>tokeniseurs rapides en Rust</td></tr><tr><td>accelerate</td><td>un même code sur CPU, 1 GPU ou 64</td></tr><tr><td>peft</td><td>LoRA et affinage économe</td></tr><tr><td>trl</td><td>SFT, DPO, GRPO</td></tr><tr><td>huggingface_hub</td><td>télécharger, publier</td></tr></table>\n    <p>Chaque modèle a une <b>fiche</b> (model card) : usage prévu, données, licence, limites. La lire avant d’utiliser un modèle fait partie du travail : la licence décide si un usage commercial est permis.</p>",
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
  "lit": "hub",
  "look": {},
  "scene": "hub",
  "fig": "",
  "panel": "<h2>Du Hub à la réponse</h2><div class=\"psub\">charger et utiliser un modèle ouvert</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Hub</b><i>modèle + fiche</i></span><pre class=\"ex\">huggingface.co/Qwen/Qwen3-8B\n# config.json, tokenizer.json, *.safetensors</pre></li><li class=\"\"><span class=\"st\"><b>Télécharger</b><i>cache local</i></span><pre class=\"ex\">hf download Qwen/Qwen3-8B\n# ~/.cache/huggingface/hub</pre></li><li class=\"blue\"><span class=\"st\"><b>Tokeniseur</b><i>texte → ids</i></span><pre class=\"ex\">tok = AutoTokenizer.from_pretrained(nom)</pre></li><li class=\"red\"><span class=\"st\"><b>Modèle</b><i>poids sur GPU</i></span><pre class=\"ex\">m = AutoModelForCausalLM.from_pretrained(nom,\n  torch_dtype=&#x27;auto&#x27;, device_map=&#x27;auto&#x27;)</pre></li><li class=\"blue\"><span class=\"st\"><b>Génération</b><i></i></span><pre class=\"ex\">out = m.generate(**tok(p, return_tensors=&#x27;pt&#x27;).to(m.device), max_new_tokens=200)</pre></li><li class=\"\"><span class=\"st\"><b>Décodage</b><i>ids → texte</i></span><pre class=\"ex\">tok.decode(out[0], skip_special_tokens=True)</pre></li></ol><p class=\"note\">Les classes Auto* lisent config.json et instancient la bonne architecture. device_map='auto' répartit les couches sur les GPU disponibles, voire sur le CPU. En production, on préfère un moteur de service (vLLM, chapitre 23) à generate().</p><table class=\"data\"><tr><th>modèles sur le Hub</th><td>plus de 2 millions</td></tr><tr><th>format des poids</th><td>safetensors</td></tr><tr><th>cache</th><td>~/.cache/huggingface</td></tr></table>"
 },
 {
  "kicker": "8.3",
  "title": "Transformers",
  "sub": "la bibliothèque centrale",
  "body": "<p class=\"lede\">La bibliothèque <b>transformers</b> donne une interface unique à des milliers de modèles : texte, vision, audio, multimodal.</p>\n    <pre class=\"code\">from transformers import pipeline\nclf = pipeline(&#x27;text-classification&#x27;, model=&#x27;cmarkea/distilcamembert-base-sentiment&#x27;)\nclf(&#x27;Le support a été parfait.&#x27;)   # [{&#x27;label&#x27;: &#x27;5 stars&#x27;, &#x27;score&#x27;: 0.8}]</pre>\n    <ul class=\"rules\"><li><code>pipeline()</code> : le plus simple, pour tester.</li><li><code>AutoTokenizer</code> + <code>AutoModelFor…</code> : le contrôle complet.</li><li><code>apply_chat_template</code> : mettre une conversation au format attendu par un modèle de chat (rôles, balises spéciales).</li><li><code>Trainer</code> : boucle d’entraînement prête à l’emploi.</li></ul>",
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
  "lit": "hub",
  "look": {},
  "scene": "hub",
  "fig": "",
  "panel": "<h2>Discuter avec un modèle ouvert</h2><div class=\"psub\">le gabarit de conversation</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Messages</b><i></i></span><pre class=\"ex\">msgs = [{&#x27;role&#x27;: &#x27;system&#x27;, &#x27;content&#x27;: &#x27;Tu réponds en français.&#x27;},\n        {&#x27;role&#x27;: &#x27;user&#x27;, &#x27;content&#x27;: &#x27;Explique LoRA en 2 phrases.&#x27;}]</pre></li><li class=\"blue\"><span class=\"st\"><b>Gabarit</b><i>balises du modèle</i></span><pre class=\"ex\">ids = tok.apply_chat_template(msgs, add_generation_prompt=True,\n  return_tensors=&#x27;pt&#x27;).to(m.device)</pre></li><li class=\"\"><span class=\"st\"><b>Générer</b><i></i></span><pre class=\"ex\">out = m.generate(ids, max_new_tokens=200, temperature=0.7, do_sample=True)</pre></li><li class=\"red\"><span class=\"st\"><b>Garder la réponse</b><i></i></span><pre class=\"ex\">tok.decode(out[0, ids.shape[1]:], skip_special_tokens=True)</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "8.4",
  "title": "Datasets",
  "sub": "des jeux de données en flux",
  "body": "<p class=\"lede\">La bibliothèque <b>datasets</b> charge un jeu du Hub ou des fichiers locaux (CSV, JSONL, Parquet), le stocke au format Arrow sur disque (mappé en mémoire) et applique des transformations en parallèle.</p>\n    <pre class=\"code\">ds = load_dataset(&#x27;json&#x27;, data_files=&#x27;tickets.jsonl&#x27;, split=&#x27;train&#x27;)\nds = ds.filter(lambda r: len(r[&#x27;texte&#x27;]) &gt; 20)\nds = ds.map(lambda b: tok(b[&#x27;texte&#x27;], truncation=True), batched=True, num_proc=8)\nds = ds.train_test_split(test_size=0.1, seed=42)\nds.push_to_hub(&#x27;mon-org/tickets-v1&#x27;, private=True)</pre>\n    <p>Le mode <b>streaming</b> lit un jeu de plusieurs téraoctets sans le télécharger entièrement.</p>",
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
  "lit": "hub",
  "look": {},
  "scene": "hub",
  "fig": "",
  "panel": "<h2>Du Hub à la réponse</h2><div class=\"psub\">charger et utiliser un modèle ouvert</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Hub</b><i>modèle + fiche</i></span><pre class=\"ex\">huggingface.co/Qwen/Qwen3-8B\n# config.json, tokenizer.json, *.safetensors</pre></li><li class=\"\"><span class=\"st\"><b>Télécharger</b><i>cache local</i></span><pre class=\"ex\">hf download Qwen/Qwen3-8B\n# ~/.cache/huggingface/hub</pre></li><li class=\"blue\"><span class=\"st\"><b>Tokeniseur</b><i>texte → ids</i></span><pre class=\"ex\">tok = AutoTokenizer.from_pretrained(nom)</pre></li><li class=\"red\"><span class=\"st\"><b>Modèle</b><i>poids sur GPU</i></span><pre class=\"ex\">m = AutoModelForCausalLM.from_pretrained(nom,\n  torch_dtype=&#x27;auto&#x27;, device_map=&#x27;auto&#x27;)</pre></li><li class=\"blue\"><span class=\"st\"><b>Génération</b><i></i></span><pre class=\"ex\">out = m.generate(**tok(p, return_tensors=&#x27;pt&#x27;).to(m.device), max_new_tokens=200)</pre></li><li class=\"\"><span class=\"st\"><b>Décodage</b><i>ids → texte</i></span><pre class=\"ex\">tok.decode(out[0], skip_special_tokens=True)</pre></li></ol><p class=\"note\">Les classes Auto* lisent config.json et instancient la bonne architecture. device_map='auto' répartit les couches sur les GPU disponibles, voire sur le CPU. En production, on préfère un moteur de service (vLLM, chapitre 23) à generate().</p><table class=\"data\"><tr><th>modèles sur le Hub</th><td>plus de 2 millions</td></tr><tr><th>format des poids</th><td>safetensors</td></tr><tr><th>cache</th><td>~/.cache/huggingface</td></tr></table>"
 },
 {
  "kicker": "8.5",
  "title": "Les tokeniseurs",
  "sub": "du texte aux nombres",
  "body": "<p class=\"lede\">Un modèle ne lit pas des caractères mais des <b>jetons</b> (tokens). Le tokeniseur découpe le texte en sous-mots appris sur un corpus (BPE, WordPiece, Unigram) et les remplace par des identifiants.</p>\n    <ul class=\"rules\"><li>Toujours utiliser <b>le tokeniseur du modèle</b> : un autre donne des identifiants sans signification.</li><li>Les <b>jetons spéciaux</b> (début, fin, rôles) structurent les conversations.</li><li>Compter les jetons sert à estimer le coût, découper les documents et respecter la fenêtre de contexte.</li><li>Les nombres, le code et les langues peu représentées se découpent mal, ce qui explique certaines erreurs de calcul ou d’orthographe des modèles.</li></ul>",
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
  "lit": "tok",
  "look": {},
  "scene": "tok",
  "fig": "",
  "panel": "<h2>Compter et inspecter les jetons</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Charger</b><i></i></span><pre class=\"ex\">tok = AutoTokenizer.from_pretrained(&#x27;mistralai/Mistral-7B-Instruct-v0.3&#x27;)</pre></li><li class=\"blue\"><span class=\"st\"><b>Découper</b><i></i></span><pre class=\"ex\">tok.tokenize(&#x27;L’ingénieur déploie&#x27;)\n# [&#x27;▁L&#x27;, &#x27;’&#x27;, &#x27;ing&#x27;, &#x27;énieur&#x27;, &#x27;▁dé&#x27;, &#x27;ploie&#x27;]</pre></li><li class=\"\"><span class=\"st\"><b>Compter</b><i></i></span><pre class=\"ex\">len(tok.encode(texte))</pre></li><li class=\"\"><span class=\"st\"><b>API OpenAI</b><i>tiktoken</i></span><pre class=\"ex\">tiktoken.get_encoding(&#x27;o200k_base&#x27;).encode(texte)</pre></li><li class=\"red\"><span class=\"st\"><b>Règle</b><i>approx.</i></span><pre class=\"ex\">français : ≈ 1 jeton pour 3,5 à 4 caractères</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "8.6",
  "title": "Accelerate",
  "sub": "passer à plusieurs GPU sans réécrire",
  "body": "<p class=\"lede\"><b>Accelerate</b> rend une boucle PyTorch indépendante du matériel : le même script tourne sur CPU, un GPU, plusieurs GPU ou plusieurs machines, avec précision mixte et DeepSpeed ou FSDP.</p>\n    <pre class=\"code\">accelerator = Accelerator(mixed_precision=&#x27;bf16&#x27;, gradient_accumulation_steps=4)\nmodel, opt, loader = accelerator.prepare(model, opt, loader)\nfor x, y in loader:\n    with accelerator.accumulate(model):\n        loss = F.cross_entropy(model(x), y)\n        accelerator.backward(loss)\n        opt.step(); opt.zero_grad()</pre>\n    <p>On lance avec <code>accelerate config</code> puis <code>accelerate launch train.py</code>. C’est la couche sur laquelle reposent le Trainer, TRL et beaucoup de scripts d’affinage.</p>",
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
  "lit": "hub",
  "look": {},
  "scene": "hub",
  "fig": "",
  "panel": "<h2>Du Hub à la réponse</h2><div class=\"psub\">charger et utiliser un modèle ouvert</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Hub</b><i>modèle + fiche</i></span><pre class=\"ex\">huggingface.co/Qwen/Qwen3-8B\n# config.json, tokenizer.json, *.safetensors</pre></li><li class=\"\"><span class=\"st\"><b>Télécharger</b><i>cache local</i></span><pre class=\"ex\">hf download Qwen/Qwen3-8B\n# ~/.cache/huggingface/hub</pre></li><li class=\"blue\"><span class=\"st\"><b>Tokeniseur</b><i>texte → ids</i></span><pre class=\"ex\">tok = AutoTokenizer.from_pretrained(nom)</pre></li><li class=\"red\"><span class=\"st\"><b>Modèle</b><i>poids sur GPU</i></span><pre class=\"ex\">m = AutoModelForCausalLM.from_pretrained(nom,\n  torch_dtype=&#x27;auto&#x27;, device_map=&#x27;auto&#x27;)</pre></li><li class=\"blue\"><span class=\"st\"><b>Génération</b><i></i></span><pre class=\"ex\">out = m.generate(**tok(p, return_tensors=&#x27;pt&#x27;).to(m.device), max_new_tokens=200)</pre></li><li class=\"\"><span class=\"st\"><b>Décodage</b><i>ids → texte</i></span><pre class=\"ex\">tok.decode(out[0], skip_special_tokens=True)</pre></li></ol><p class=\"note\">Les classes Auto* lisent config.json et instancient la bonne architecture. device_map='auto' répartit les couches sur les GPU disponibles, voire sur le CPU. En production, on préfère un moteur de service (vLLM, chapitre 23) à generate().</p><table class=\"data\"><tr><th>modèles sur le Hub</th><td>plus de 2 millions</td></tr><tr><th>format des poids</th><td>safetensors</td></tr><tr><th>cache</th><td>~/.cache/huggingface</td></tr></table>"
 },
 {
  "kicker": "8.7",
  "title": "Les bases de CUDA",
  "sub": "programmer le GPU",
  "body": "<p class=\"lede\"><b>CUDA</b> est la plateforme de NVIDIA pour exécuter du calcul général sur ses GPU. PyTorch s’appuie sur des bibliothèques CUDA optimisées : cuBLAS (matrices), cuDNN (réseaux), NCCL (communication entre GPU).</p>\n    <ul class=\"rules\"><li>Un <b>noyau</b> (kernel) est une fonction exécutée par des milliers de fils en parallèle, organisés en blocs.</li><li>La hiérarchie mémoire compte plus que le calcul : registres et mémoire partagée (rapides, petites), HBM (grande, plus lente). <b>FlashAttention</b> doit sa vitesse à cela : moins d’allers-retours en HBM.</li><li>On écrit rarement du CUDA à la main : <b>Triton</b> (Python) ou <code>torch.compile</code> génèrent des noyaux efficaces.</li><li>Compatibilité : pilote NVIDIA ≥ version CUDA de PyTorch ; image Docker <code>nvidia/cuda</code> ou <code>pytorch/pytorch</code>.</li></ul>\n    <p>Alternatives : ROCm (AMD), Metal / MLX (Apple), TPU (Google), puces d’inférence spécialisées.</p>",
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
  "lit": "puce",
  "look": {},
  "scene": "puce",
  "fig": "",
  "panel": "<h2>Un noyau GPU avec Triton</h2><div class=\"psub\">additionner deux vecteurs</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Noyau</b><i></i></span><pre class=\"ex\">@triton.jit\ndef add(x, y, out, n, BLOC: tl.constexpr):\n    i = tl.program_id(0) * BLOC + tl.arange(0, BLOC)\n    m = i &lt; n\n    tl.store(out + i, tl.load(x + i, mask=m) + tl.load(y + i, mask=m), mask=m)</pre></li><li class=\"\"><span class=\"st\"><b>Lancer</b><i>une grille de blocs</i></span><pre class=\"ex\">add[(triton.cdiv(n, 1024),)](x, y, out, n, BLOC=1024)</pre></li><li class=\"\"><span class=\"st\"><b>Vérifier</b><i></i></span><pre class=\"ex\">torch.testing.assert_close(out, x + y)</pre></li><li class=\"red\"><span class=\"st\"><b>Mesurer</b><i></i></span><pre class=\"ex\">triton.testing.do_bench(lambda: add[...](...))</pre></li></ol><p class=\"note\"></p>"
 }
];
export const PLATES = {
  puce: { text: "Un GPU contient plus d’une centaine de multiprocesseurs (SM), chacun avec des cœurs de calcul et des cœurs tenseur spécialisés dans les produits de matrices. La mémoire HBM, empilée à côté de la puce, débite plusieurs téraoctets par seconde. Pour les modèles de langage, c’est souvent cette bande passante, pas le calcul, qui limite.", facts: () => [["SM", "plus de 100 sur un H100"], ["HBM", "3,35 To/s (H100)"], ["cœurs tenseur", "produits de matrices"]] },
  tok: { text: "Le tokeniseur découpe le texte en sous-mots fréquents et les remplace par des identifiants entiers. Un même texte donne un nombre de jetons différent selon le tokeniseur : le français en consomme souvent 20 à 50 % de plus que l’anglais.", facts: () => [["jetons", "8"], ["vocabulaire typique", "32 000 à 260 000"], ["algorithmes", "BPE, SentencePiece"]] }
};
