// Chapitre 19 : Affiner et adapter un modèle (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 19 · Affinage",
  "title": "Affiner et adapter un modèle",
  "sub": "quand le prompt ne suffit plus",
  "body": "<p class=\"lede\">L’<b>affinage</b> (fine-tuning) poursuit l’entraînement d’un modèle pré-entraîné sur vos exemples pour changer son <b>comportement</b> : format, style, vocabulaire métier, tâche précise, appels d’outils particuliers.</p>\n    <p>Grâce aux méthodes économes (LoRA, QLoRA), affiner un modèle ouvert de 8 milliards de paramètres se fait en quelques heures sur un GPU. Les fournisseurs proposent aussi l’affinage de leurs modèles par API.</p>\n    <p>Mais l’affinage est rarement la première étape : prompt, exemples et RAG d’abord ; affinage quand l’évaluation montre qu’ils plafonnent.</p>",
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
  "lit": "lora",
  "look": {},
  "scene": "lora",
  "fig": "",
  "panel": "<h2>LoRA</h2><div class=\"psub\">une petite correction de rang faible</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Poids figé W</b><i>4096 × 4096</i></span><pre class=\"ex\">16,8 millions de nombres, inchangés</pre></li><li class=\"\"><span class=\"st\"><b>Matrice A</b><i>r × 4096</i></span><pre class=\"ex\">r = 16 → 65 536 nombres</pre></li><li class=\"\"><span class=\"st\"><b>Matrice B</b><i>4096 × r</i></span><pre class=\"ex\">65 536 nombres, initialisée à 0</pre></li><li class=\"red\"><span class=\"st\"><b>Correction</b><i>ΔW = B · A</i></span><pre class=\"ex\">rang ≤ 16, échelle α / r</pre></li><li class=\"blue\"><span class=\"st\"><b>Sortie</b><i></i></span><pre class=\"ex\">y = W x + (α/r) · B A x</pre></li><li class=\"\"><span class=\"st\"><b>Fusion</b><i>facultative</i></span><pre class=\"ex\">W&#x27; = W + (α/r) B A  → aucun surcoût à l’inférence</pre></li></ol><p class=\"note\">LoRA suppose que l’adaptation à une tâche n’a besoin que d’une correction de « faible rang » des poids. Au lieu d’entraîner 16,8 millions de nombres, on en entraîne 131 000 (0,8 %). Les adaptateurs pèsent quelques dizaines de mégaoctets et se changent à la volée.</p><table class=\"data\"><tr><th>paramètres entraînés</th><td>souvent 0,1 à 1 %</td></tr><tr><th>rang r</th><td>8 à 64</td></tr><tr><th>fichier</th><td>adapter_model.safetensors</td></tr></table>"
 },
 {
  "kicker": "19.1",
  "title": "Les modèles pré-entraînés",
  "sub": "choisir son point de départ",
  "body": "<p class=\"lede\">On part toujours d’un modèle existant. Le choix du modèle de base compte plus que les réglages de l’affinage.</p>\n    <table class=\"data\"><tr><th>critère</th><th>question</th></tr><tr><td>variante</td><td>base (pour un usage très spécifique) ou instruct (presque toujours)</td></tr><tr><td>taille</td><td>1–4B : classification, extraction, embarqué ; 7–14B : bon compromis ; 30B+ : tâches riches</td></tr><tr><td>langues</td><td>le modèle parle-t-il bien français ?</td></tr><tr><td>licence</td><td>usage commercial, redistribution</td></tr><tr><td>contexte</td><td>longueur des entrées de la tâche</td></tr><tr><td>écosystème</td><td>support dans vLLM, Unsloth, TRL, llama.cpp</td></tr></table>\n    <p>Commencer par mesurer le modèle <b>sans affinage</b> (avec un bon prompt) sur le jeu d’évaluation : c’est la ligne de base à battre.</p>",
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
  "lit": "lora",
  "look": {},
  "scene": "lora",
  "fig": "",
  "panel": "<h2>LoRA</h2><div class=\"psub\">une petite correction de rang faible</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Poids figé W</b><i>4096 × 4096</i></span><pre class=\"ex\">16,8 millions de nombres, inchangés</pre></li><li class=\"\"><span class=\"st\"><b>Matrice A</b><i>r × 4096</i></span><pre class=\"ex\">r = 16 → 65 536 nombres</pre></li><li class=\"\"><span class=\"st\"><b>Matrice B</b><i>4096 × r</i></span><pre class=\"ex\">65 536 nombres, initialisée à 0</pre></li><li class=\"red\"><span class=\"st\"><b>Correction</b><i>ΔW = B · A</i></span><pre class=\"ex\">rang ≤ 16, échelle α / r</pre></li><li class=\"blue\"><span class=\"st\"><b>Sortie</b><i></i></span><pre class=\"ex\">y = W x + (α/r) · B A x</pre></li><li class=\"\"><span class=\"st\"><b>Fusion</b><i>facultative</i></span><pre class=\"ex\">W&#x27; = W + (α/r) B A  → aucun surcoût à l’inférence</pre></li></ol><p class=\"note\">LoRA suppose que l’adaptation à une tâche n’a besoin que d’une correction de « faible rang » des poids. Au lieu d’entraîner 16,8 millions de nombres, on en entraîne 131 000 (0,8 %). Les adaptateurs pèsent quelques dizaines de mégaoctets et se changent à la volée.</p><table class=\"data\"><tr><th>paramètres entraînés</th><td>souvent 0,1 à 1 %</td></tr><tr><th>rang r</th><td>8 à 64</td></tr><tr><th>fichier</th><td>adapter_model.safetensors</td></tr></table>"
 },
 {
  "kicker": "19.2",
  "title": "L’affinage supervisé (SFT)",
  "sub": "apprendre par l’exemple",
  "body": "<p class=\"lede\">Le <b>SFT</b> entraîne le modèle à produire la réponse attendue pour chaque entrée : même perte que le pré-entraînement, mais uniquement sur les jetons de réponse.</p>\n    <pre class=\"code\">from trl import SFTTrainer, SFTConfig\nds = load_dataset(&#x27;json&#x27;, data_files=&#x27;train.jsonl&#x27;)[&#x27;train&#x27;]   # {&#x27;messages&#x27;: [...]}\ntrainer = SFTTrainer(model=&#x27;Qwen/Qwen3-8B&#x27;, train_dataset=ds,\n    args=SFTConfig(output_dir=&#x27;out&#x27;, num_train_epochs=2, learning_rate=2e-4,\n                   per_device_train_batch_size=4, gradient_accumulation_steps=4,\n                   bf16=True, assistant_only_loss=True),\n    peft_config=LoraConfig(r=16, lora_alpha=32, target_modules=&#x27;all-linear&#x27;))\ntrainer.train()</pre>\n    <ul class=\"rules\"><li>Quelques centaines à quelques milliers d’exemples de qualité suffisent souvent pour un format ou une tâche.</li><li>1 à 3 époques ; au-delà, risque de surapprentissage (le modèle récite).</li><li>Surveiller la perte de validation et, surtout, l’évaluation métier.</li></ul>",
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
  "lit": "lora",
  "look": {},
  "scene": "lora",
  "fig": "",
  "panel": "<h2>LoRA</h2><div class=\"psub\">une petite correction de rang faible</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Poids figé W</b><i>4096 × 4096</i></span><pre class=\"ex\">16,8 millions de nombres, inchangés</pre></li><li class=\"\"><span class=\"st\"><b>Matrice A</b><i>r × 4096</i></span><pre class=\"ex\">r = 16 → 65 536 nombres</pre></li><li class=\"\"><span class=\"st\"><b>Matrice B</b><i>4096 × r</i></span><pre class=\"ex\">65 536 nombres, initialisée à 0</pre></li><li class=\"red\"><span class=\"st\"><b>Correction</b><i>ΔW = B · A</i></span><pre class=\"ex\">rang ≤ 16, échelle α / r</pre></li><li class=\"blue\"><span class=\"st\"><b>Sortie</b><i></i></span><pre class=\"ex\">y = W x + (α/r) · B A x</pre></li><li class=\"\"><span class=\"st\"><b>Fusion</b><i>facultative</i></span><pre class=\"ex\">W&#x27; = W + (α/r) B A  → aucun surcoût à l’inférence</pre></li></ol><p class=\"note\">LoRA suppose que l’adaptation à une tâche n’a besoin que d’une correction de « faible rang » des poids. Au lieu d’entraîner 16,8 millions de nombres, on en entraîne 131 000 (0,8 %). Les adaptateurs pèsent quelques dizaines de mégaoctets et se changent à la volée.</p><table class=\"data\"><tr><th>paramètres entraînés</th><td>souvent 0,1 à 1 %</td></tr><tr><th>rang r</th><td>8 à 64</td></tr><tr><th>fichier</th><td>adapter_model.safetensors</td></tr></table>"
 },
 {
  "kicker": "19.3",
  "title": "L’affinage économe en paramètres",
  "sub": "n’entraîner qu’une petite partie",
  "body": "<p class=\"lede\">Le <b>PEFT</b> (Parameter-Efficient Fine-Tuning) regroupe les méthodes qui n’entraînent qu’une petite fraction des paramètres.</p>\n    <table class=\"data\"><tr><th>méthode</th><th>principe</th></tr><tr><td>LoRA</td><td>ajouter des matrices de rang faible à côté des poids</td></tr><tr><td>QLoRA</td><td>LoRA sur un modèle quantifié en 4 bits</td></tr><tr><td>DoRA</td><td>sépare l’amplitude et la direction des poids</td></tr><tr><td>adaptateurs</td><td>petites couches insérées dans chaque bloc</td></tr><tr><td>prompt / prefix tuning</td><td>apprendre des vecteurs ajoutés en entrée</td></tr><tr><td>IA³</td><td>apprendre des facteurs d’échelle</td></tr></table>\n    <ul class=\"rules\"><li>Avantages : peu de mémoire, entraînement rapide, fichiers légers, un modèle de base partagé par plusieurs adaptateurs.</li><li>Moins d’<b>oubli catastrophique</b> : les poids d’origine ne bougent pas.</li><li>Les serveurs (vLLM, LoRAX) servent des centaines d’adaptateurs LoRA sur un même modèle de base.</li></ul>",
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
  "lit": "lora",
  "look": {},
  "scene": "lora",
  "fig": "",
  "panel": "<h2>LoRA</h2><div class=\"psub\">une petite correction de rang faible</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Poids figé W</b><i>4096 × 4096</i></span><pre class=\"ex\">16,8 millions de nombres, inchangés</pre></li><li class=\"\"><span class=\"st\"><b>Matrice A</b><i>r × 4096</i></span><pre class=\"ex\">r = 16 → 65 536 nombres</pre></li><li class=\"\"><span class=\"st\"><b>Matrice B</b><i>4096 × r</i></span><pre class=\"ex\">65 536 nombres, initialisée à 0</pre></li><li class=\"red\"><span class=\"st\"><b>Correction</b><i>ΔW = B · A</i></span><pre class=\"ex\">rang ≤ 16, échelle α / r</pre></li><li class=\"blue\"><span class=\"st\"><b>Sortie</b><i></i></span><pre class=\"ex\">y = W x + (α/r) · B A x</pre></li><li class=\"\"><span class=\"st\"><b>Fusion</b><i>facultative</i></span><pre class=\"ex\">W&#x27; = W + (α/r) B A  → aucun surcoût à l’inférence</pre></li></ol><p class=\"note\">LoRA suppose que l’adaptation à une tâche n’a besoin que d’une correction de « faible rang » des poids. Au lieu d’entraîner 16,8 millions de nombres, on en entraîne 131 000 (0,8 %). Les adaptateurs pèsent quelques dizaines de mégaoctets et se changent à la volée.</p><table class=\"data\"><tr><th>paramètres entraînés</th><td>souvent 0,1 à 1 %</td></tr><tr><th>rang r</th><td>8 à 64</td></tr><tr><th>fichier</th><td>adapter_model.safetensors</td></tr></table>"
 },
 {
  "kicker": "19.4",
  "title": "LoRA",
  "sub": "Low-Rank Adaptation",
  "body": "<p class=\"lede\"><b>LoRA</b> (Hu et al., 2021) fige chaque matrice de poids W et apprend une correction ΔW = B·A, avec A et B très étroites (rang r).</p>\n    <div class=\"eq\">y = W x + (α / r) · B A x</div>\n    <ul class=\"rules\"><li><b>r</b> (rang) : 8 à 64 ; plus grand = plus de capacité, plus de paramètres.</li><li><b>α</b> (lora_alpha) : échelle, souvent 2 × r.</li><li><b>Modules ciblés</b> : toutes les couches linéaires (attention + MLP) donnent en général de meilleurs résultats que l’attention seule.</li><li><b>Taux d’apprentissage</b> plus élevé qu’en affinage complet : 1e-4 à 2e-4.</li><li>Après l’entraînement : garder l’adaptateur séparé, ou le <b>fusionner</b> dans les poids.</li></ul>",
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
  "lit": "lora",
  "look": {},
  "scene": "lora",
  "fig": "",
  "panel": "<h2>Configurer LoRA avec peft</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Configuration</b><i></i></span><pre class=\"ex\">cfg = LoraConfig(r=16, lora_alpha=32, lora_dropout=0.05,\n  target_modules=[&#x27;q_proj&#x27;, &#x27;k_proj&#x27;, &#x27;v_proj&#x27;, &#x27;o_proj&#x27;,\n                  &#x27;gate_proj&#x27;, &#x27;up_proj&#x27;, &#x27;down_proj&#x27;],\n  task_type=&#x27;CAUSAL_LM&#x27;)</pre></li><li class=\"\"><span class=\"st\"><b>Envelopper</b><i></i></span><pre class=\"ex\">model = get_peft_model(model, cfg)</pre></li><li class=\"\"><span class=\"st\"><b>Vérifier</b><i></i></span><pre class=\"ex\">model.print_trainable_parameters()\n# trainable: 42M || all: 8.2B || 0.51 %</pre></li><li class=\"\"><span class=\"st\"><b>Sauver</b><i></i></span><pre class=\"ex\">model.save_pretrained(&#x27;adaptateur&#x27;)   # ≈ 80 Mo</pre></li><li class=\"red\"><span class=\"st\"><b>Fusionner</b><i>pour servir</i></span><pre class=\"ex\">model.merge_and_unload().save_pretrained(&#x27;fusionne&#x27;)</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "19.5",
  "title": "QLoRA",
  "sub": "affiner un gros modèle sur un petit GPU",
  "body": "<p class=\"lede\"><b>QLoRA</b> (Dettmers et al., 2023) charge le modèle de base en <b>4 bits</b> (format NF4), garde les adaptateurs LoRA en 16 bits, et rétropropage à travers les poids quantifiés.</p>\n    <ul class=\"rules\"><li>Un modèle de 8B tient dans ≈ 6 Go de poids : affinage possible sur un GPU de 12 à 16 Go.</li><li>Un modèle de 70B tient dans ≈ 40 Go : un seul GPU de 48 ou 80 Go.</li><li>Qualité proche de LoRA en 16 bits ; entraînement un peu plus lent (déquantification à la volée).</li><li>Outils : bitsandbytes + peft, <b>Unsloth</b> (2 fois plus rapide, moins de mémoire), Axolotl, LLaMA-Factory.</li></ul>",
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
  "lit": "memoire",
  "look": {},
  "scene": "memoire",
  "fig": "",
  "panel": "<h2>Charger un modèle en 4 bits</h2><div class=\"psub\"></div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Quantification</b><i></i></span><pre class=\"ex\">bnb = BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_quant_type=&#x27;nf4&#x27;,\n  bnb_4bit_compute_dtype=torch.bfloat16, bnb_4bit_use_double_quant=True)</pre></li><li class=\"\"><span class=\"st\"><b>Charger</b><i></i></span><pre class=\"ex\">m = AutoModelForCausalLM.from_pretrained(nom, quantization_config=bnb, device_map=&#x27;auto&#x27;)</pre></li><li class=\"\"><span class=\"st\"><b>Préparer</b><i></i></span><pre class=\"ex\">m = prepare_model_for_kbit_training(m)  # + gradient checkpointing</pre></li><li class=\"\"><span class=\"st\"><b>LoRA</b><i></i></span><pre class=\"ex\">m = get_peft_model(m, cfg)</pre></li><li class=\"red\"><span class=\"st\"><b>Avec Unsloth</b><i></i></span><pre class=\"ex\">m, tok = FastLanguageModel.from_pretrained(nom, load_in_4bit=True)</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "19.6",
  "title": "PEFT",
  "sub": "la bibliothèque",
  "body": "<p class=\"lede\"><b>PEFT</b> est aussi le nom de la bibliothèque de Hugging Face qui implémente ces méthodes (LoRA, DoRA, adaptateurs, prompt tuning, IA³…) pour tous les modèles de transformers.</p>\n    <ul class=\"rules\"><li>Intégrée à TRL (SFT, DPO, GRPO), à Accelerate et au Trainer.</li><li>Chargement d’un adaptateur sur un modèle de base : <code>PeftModel.from_pretrained(base, 'mon-org/adaptateur')</code>.</li><li>Plusieurs adaptateurs chargés en même temps, et changement par requête (<code>set_adapter</code>).</li><li>Publication d’un adaptateur sur le Hub avec sa fiche : modèle de base, données, résultats d’évaluation.</li></ul>",
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
  "lit": "lora",
  "look": {},
  "scene": "lora",
  "fig": "",
  "panel": "<h2>Servir plusieurs adaptateurs avec vLLM</h2><div class=\"psub\">un modèle de base, plusieurs métiers</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Lancer</b><i></i></span><pre class=\"ex\">vllm serve Qwen/Qwen3-8B --enable-lora \\\n  --lora-modules juridique=./lora-jur support=./lora-sup --max-loras 4</pre></li><li class=\"\"><span class=\"st\"><b>Appeler</b><i>par nom</i></span><pre class=\"ex\">client.chat.completions.create(model=&#x27;juridique&#x27;, messages=msgs)</pre></li><li class=\"red\"><span class=\"st\"><b>Coût</b><i></i></span><pre class=\"ex\">les poids de base sont partagés en mémoire</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "19.7",
  "title": "Préparer le jeu de données",
  "sub": "la partie qui compte vraiment",
  "body": "<p class=\"lede\">La qualité de l’affinage dépend avant tout des données.</p>\n    <ul class=\"rules\"><li><b>Format</b> : JSONL au format conversation, avec le même gabarit de chat que celui utilisé en production.</li><li><b>Représentativité</b> : les entrées ressemblent à la production (longueur, style, fautes, cas limites).</li><li><b>Cohérence</b> : les réponses suivent toutes les mêmes règles ; des réponses contradictoires apprennent le flou.</li><li><b>Équilibre</b> entre catégories ; inclure des cas où la bonne réponse est « je ne sais pas » ou un refus.</li><li><b>Séparer</b> un jeu de test jamais vu, sans doublons ni quasi-doublons avec l’entraînement.</li><li><b>Relire</b> un échantillon à la main ; retirer les données personnelles inutiles.</li></ul>",
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
  "lit": "lora",
  "look": {},
  "scene": "lora",
  "fig": "",
  "panel": "<h2>Un exemple d’entraînement</h2><div class=\"psub\">format conversation</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Système</b><i>identique à la prod</i></span><pre class=\"ex\">{&#x27;role&#x27;: &#x27;system&#x27;, &#x27;content&#x27;: &#x27;Extrais les champs de la facture en JSON.&#x27;}</pre></li><li class=\"\"><span class=\"st\"><b>Entrée</b><i>texte réel</i></span><pre class=\"ex\">{&#x27;role&#x27;: &#x27;user&#x27;, &#x27;content&#x27;: &#x27;FACTURE N° 2026-118 … Total TTC : 1 284,00 €&#x27;}</pre></li><li class=\"blue\"><span class=\"st\"><b>Sortie</b><i>parfaite</i></span><pre class=\"ex\">{&#x27;role&#x27;: &#x27;assistant&#x27;, &#x27;content&#x27;: &#x27;{&quot;numero&quot;: &quot;2026-118&quot;, &quot;total_ttc&quot;: 1284.0, …}&#x27;}</pre></li><li class=\"\"><span class=\"st\"><b>Volume</b><i></i></span><pre class=\"ex\">500 à 5 000 exemples ; 10 % en validation</pre></li><li class=\"red\"><span class=\"st\"><b>Contrôle</b><i></i></span><pre class=\"ex\">chaque sortie valide le schéma Pydantic</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "19.8",
  "title": "Générer des données synthétiques",
  "sub": "quand les exemples manquent",
  "body": "<p class=\"lede\">Un modèle puissant peut <b>générer</b> des exemples d’entraînement : questions variées, réponses de référence, conversations, cas difficiles.</p>\n    <ul class=\"rules\"><li><b>Distillation</b> : un grand modèle (enseignant) produit les réponses que le petit modèle (élève) apprend à imiter. Vérifier que les conditions d’utilisation du fournisseur l’autorisent.</li><li><b>Diversité</b> : varier personas, sujets, longueurs, styles ; partir de documents réels.</li><li><b>Filtrage</b> : vérification automatique (exécution du code, validation de schéma), modèle juge, déduplication.</li><li><b>Mélange</b> avec des données réelles ; ne pas évaluer sur des données synthétiques produites de la même façon.</li><li>Outils : distilabel, Data Designer, ou des scripts simples avec l’API de lots (moins chère).</li></ul>",
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
  "lit": "lora",
  "look": {},
  "scene": "lora",
  "fig": "",
  "panel": "<h2>Un générateur de questions</h2><div class=\"psub\">à partir de vos documents</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Source</b><i></i></span><pre class=\"ex\">for m in echantillon(morceaux, 2000):</pre></li><li class=\"blue\"><span class=\"st\"><b>Générer</b><i></i></span><pre class=\"ex\">q = llm(f&#x27;À partir de ce passage, écris 3 questions qu’un client\\npourrait poser, de difficulté variée.\\n&lt;passage&gt;{m}&lt;/passage&gt;&#x27;)</pre></li><li class=\"\"><span class=\"st\"><b>Répondre</b><i>enseignant</i></span><pre class=\"ex\">r = llm_fort(prompt_rag(q, m))</pre></li><li class=\"red\"><span class=\"st\"><b>Filtrer</b><i></i></span><pre class=\"ex\">garder si juge(q, r, m) &gt;= 4/5 et non doublon</pre></li><li class=\"\"><span class=\"st\"><b>Écrire</b><i></i></span><pre class=\"ex\">jsonl.write({&#x27;messages&#x27;: [...]})</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "19.9",
  "title": "L’affinage sur instructions",
  "sub": "apprendre à suivre des consignes",
  "body": "<p class=\"lede\">L’<b>instruction tuning</b> (chapitre 10) est le SFT appliqué à des paires instruction → réponse variées. Pour un ingénieur, il sert surtout à :</p>\n    <ul class=\"rules\"><li><b>Spécialiser</b> un modèle instruct sur un domaine (juridique, médical, code interne) en lui apprenant la forme des réponses attendues.</li><li><b>Apprendre un format</b> strict ou un ton de marque sans le répéter dans chaque prompt (prompts plus courts, donc moins chers).</li><li><b>Apprendre l’usage d’outils</b> internes (exemples de trajectoires avec appels d’outils).</li><li><b>Réduire la taille</b> : un petit modèle affiné peut égaler un grand modèle généraliste sur une tâche étroite, 10 à 50 fois moins cher.</li></ul>\n    <p>Piège : affiner sur un domaine étroit peut dégrader des capacités générales ou la sûreté du modèle. Évaluer aussi ce qu’on ne voulait pas changer.</p>",
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
  "lit": "lora",
  "look": {},
  "scene": "lora",
  "fig": "",
  "panel": "<h2>LoRA</h2><div class=\"psub\">une petite correction de rang faible</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Poids figé W</b><i>4096 × 4096</i></span><pre class=\"ex\">16,8 millions de nombres, inchangés</pre></li><li class=\"\"><span class=\"st\"><b>Matrice A</b><i>r × 4096</i></span><pre class=\"ex\">r = 16 → 65 536 nombres</pre></li><li class=\"\"><span class=\"st\"><b>Matrice B</b><i>4096 × r</i></span><pre class=\"ex\">65 536 nombres, initialisée à 0</pre></li><li class=\"red\"><span class=\"st\"><b>Correction</b><i>ΔW = B · A</i></span><pre class=\"ex\">rang ≤ 16, échelle α / r</pre></li><li class=\"blue\"><span class=\"st\"><b>Sortie</b><i></i></span><pre class=\"ex\">y = W x + (α/r) · B A x</pre></li><li class=\"\"><span class=\"st\"><b>Fusion</b><i>facultative</i></span><pre class=\"ex\">W&#x27; = W + (α/r) B A  → aucun surcoût à l’inférence</pre></li></ol><p class=\"note\">LoRA suppose que l’adaptation à une tâche n’a besoin que d’une correction de « faible rang » des poids. Au lieu d’entraîner 16,8 millions de nombres, on en entraîne 131 000 (0,8 %). Les adaptateurs pèsent quelques dizaines de mégaoctets et se changent à la volée.</p><table class=\"data\"><tr><th>paramètres entraînés</th><td>souvent 0,1 à 1 %</td></tr><tr><th>rang r</th><td>8 à 64</td></tr><tr><th>fichier</th><td>adapter_model.safetensors</td></tr></table>"
 },
 {
  "kicker": "19.10",
  "title": "DPO",
  "sub": "affiner avec des préférences",
  "body": "<p class=\"lede\">Après le SFT, la <b>DPO</b> (chapitre 10) affine à partir de paires (réponse préférée, réponse rejetée) pour le même prompt.</p>\n    <pre class=\"code\">from trl import DPOTrainer, DPOConfig\nds = load_dataset(&#x27;json&#x27;, data_files=&#x27;prefs.jsonl&#x27;)[&#x27;train&#x27;]   # prompt, chosen, rejected\nDPOTrainer(model=modele_sft, args=DPOConfig(beta=0.1, learning_rate=5e-6, num_train_epochs=1),\n           train_dataset=ds, processing_class=tok, peft_config=cfg).train()</pre>\n    <ul class=\"rules\"><li>Utile pour ce qui se juge mieux par comparaison : ton, concision, refus appropriés, préférence pour citer ses sources.</li><li>Les paires viennent d’annotateurs, de retours utilisateurs (pouce haut/bas) ou d’un modèle juge.</li><li>β règle l’écart permis avec le modèle de référence.</li><li>Variantes : ORPO (SFT et préférences en une étape), KTO (avis binaires sans paires), SimPO ; GRPO pour les tâches à récompense vérifiable.</li></ul>",
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
  "lit": "lora",
  "look": {},
  "scene": "lora",
  "fig": "",
  "panel": "<h2>LoRA</h2><div class=\"psub\">une petite correction de rang faible</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Poids figé W</b><i>4096 × 4096</i></span><pre class=\"ex\">16,8 millions de nombres, inchangés</pre></li><li class=\"\"><span class=\"st\"><b>Matrice A</b><i>r × 4096</i></span><pre class=\"ex\">r = 16 → 65 536 nombres</pre></li><li class=\"\"><span class=\"st\"><b>Matrice B</b><i>4096 × r</i></span><pre class=\"ex\">65 536 nombres, initialisée à 0</pre></li><li class=\"red\"><span class=\"st\"><b>Correction</b><i>ΔW = B · A</i></span><pre class=\"ex\">rang ≤ 16, échelle α / r</pre></li><li class=\"blue\"><span class=\"st\"><b>Sortie</b><i></i></span><pre class=\"ex\">y = W x + (α/r) · B A x</pre></li><li class=\"\"><span class=\"st\"><b>Fusion</b><i>facultative</i></span><pre class=\"ex\">W&#x27; = W + (α/r) B A  → aucun surcoût à l’inférence</pre></li></ol><p class=\"note\">LoRA suppose que l’adaptation à une tâche n’a besoin que d’une correction de « faible rang » des poids. Au lieu d’entraîner 16,8 millions de nombres, on en entraîne 131 000 (0,8 %). Les adaptateurs pèsent quelques dizaines de mégaoctets et se changent à la volée.</p><table class=\"data\"><tr><th>paramètres entraînés</th><td>souvent 0,1 à 1 %</td></tr><tr><th>rang r</th><td>8 à 64</td></tr><tr><th>fichier</th><td>adapter_model.safetensors</td></tr></table>"
 },
 {
  "kicker": "19.11",
  "title": "Évaluer un affinage",
  "sub": "a-t-on vraiment gagné ?",
  "body": "<p class=\"lede\">Une perte de validation qui baisse ne dit pas que le modèle est meilleur pour l’usage réel.</p>\n    <ul class=\"rules\"><li>Comparer sur le <b>même jeu de test</b> : modèle de base + bon prompt, modèle de base + RAG, modèle affiné.</li><li>Métriques de la tâche (exactitude, F1, validité du JSON) + modèle juge + revue humaine d’un échantillon.</li><li>Tests de <b>non-régression</b> : capacités générales, sûreté, autres langues.</li><li>Vérifier la <b>contamination</b> : des exemples de test présents dans l’entraînement faussent tout.</li><li>Suivre chaque entraînement dans un outil d’expériences (W&B, MLflow, chapitre 25) : données, hyperparamètres, résultats.</li></ul>",
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
  "lit": "lora",
  "look": {},
  "scene": "lora",
  "fig": "",
  "panel": "<h2>Un tableau de comparaison</h2><div class=\"psub\">décider sur des chiffres</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Ligne de base</b><i></i></span><pre class=\"ex\">Qwen3-8B + prompt : exactitude 71 %, JSON valide 93 %</pre></li><li class=\"\"><span class=\"st\"><b>Grand modèle</b><i></i></span><pre class=\"ex\">modèle de pointe + prompt : 89 %, 99 %, coût × 20</pre></li><li class=\"blue\"><span class=\"st\"><b>Affiné</b><i>LoRA, 3 000 ex.</i></span><pre class=\"ex\">Qwen3-8B + LoRA : 87 %, 99,6 %</pre></li><li class=\"\"><span class=\"st\"><b>Régression</b><i></i></span><pre class=\"ex\">MMLU-fr : −0,8 pt ; refus dangereux : inchangé</pre></li><li class=\"red\"><span class=\"st\"><b>Décision</b><i></i></span><pre class=\"ex\">déployer l’affiné : qualité ≈, coût ÷ 20</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "19.12",
  "title": "Affiner ou faire du RAG ?",
  "sub": "deux outils pour deux besoins",
  "body": "<p class=\"lede\">On confond souvent les deux. Règle simple : le <b>RAG</b> apporte des <b>connaissances</b>, l’<b>affinage</b> change le <b>comportement</b>.</p>\n    <table class=\"data\"><tr><th>besoin</th><th>RAG</th><th>affinage</th></tr><tr><td>connaissances qui changent</td><td>oui : réindexer suffit</td><td>non : il faudrait réentraîner</td></tr><tr><td>citer des sources</td><td>oui</td><td>non</td></tr><tr><td>droits d’accès par utilisateur</td><td>oui (filtres)</td><td>non</td></tr><tr><td>format ou style constant</td><td>partiellement (prompt)</td><td>oui</td></tr><tr><td>tâche étroite à gros volume, coût</td><td>non</td><td>oui (petit modèle)</td></tr><tr><td>vocabulaire, jargon</td><td>un peu</td><td>oui</td></tr><tr><td>latence</td><td>+ récupération</td><td>prompt plus court</td></tr></table>\n    <p>Les deux se combinent : un modèle affiné pour bien exploiter les documents récupérés et suivre le format, alimenté par un RAG pour les faits. Ordre conseillé : prompt → RAG → affinage.</p>",
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
  "lit": "lora",
  "look": {},
  "scene": "lora",
  "fig": "",
  "panel": "<h2>LoRA</h2><div class=\"psub\">une petite correction de rang faible</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Poids figé W</b><i>4096 × 4096</i></span><pre class=\"ex\">16,8 millions de nombres, inchangés</pre></li><li class=\"\"><span class=\"st\"><b>Matrice A</b><i>r × 4096</i></span><pre class=\"ex\">r = 16 → 65 536 nombres</pre></li><li class=\"\"><span class=\"st\"><b>Matrice B</b><i>4096 × r</i></span><pre class=\"ex\">65 536 nombres, initialisée à 0</pre></li><li class=\"red\"><span class=\"st\"><b>Correction</b><i>ΔW = B · A</i></span><pre class=\"ex\">rang ≤ 16, échelle α / r</pre></li><li class=\"blue\"><span class=\"st\"><b>Sortie</b><i></i></span><pre class=\"ex\">y = W x + (α/r) · B A x</pre></li><li class=\"\"><span class=\"st\"><b>Fusion</b><i>facultative</i></span><pre class=\"ex\">W&#x27; = W + (α/r) B A  → aucun surcoût à l’inférence</pre></li></ol><p class=\"note\">LoRA suppose que l’adaptation à une tâche n’a besoin que d’une correction de « faible rang » des poids. Au lieu d’entraîner 16,8 millions de nombres, on en entraîne 131 000 (0,8 %). Les adaptateurs pèsent quelques dizaines de mégaoctets et se changent à la volée.</p><table class=\"data\"><tr><th>paramètres entraînés</th><td>souvent 0,1 à 1 %</td></tr><tr><th>rang r</th><td>8 à 64</td></tr><tr><th>fichier</th><td>adapter_model.safetensors</td></tr></table>"
 }
];
export const PLATES = {
  memoire: { text: "L’affinage complet d’un modèle de 8 milliards demande plus de 120 Go : plusieurs GPU. LoRA fige les poids et n’entraîne que de petites matrices : un GPU de 24 à 40 Go suffit. QLoRA stocke en plus les poids figés en 4 bits : un seul GPU grand public peut affiner un modèle de 8B, et un GPU de 48 à 80 Go un modèle de 70B.", facts: () => [["complet", "≈ 16 octets / paramètre"], ["LoRA", "≈ 2 octets / paramètre + adaptateurs"], ["QLoRA", "≈ 0,6 octet / paramètre + adaptateurs"]] }
};
