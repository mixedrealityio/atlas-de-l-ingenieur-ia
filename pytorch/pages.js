// Chapitre 7 : PyTorch (généré par build.py)
export const PAGES = [
 {
  "kicker": "Chapitre 7 · Frameworks",
  "title": "PyTorch",
  "sub": "le framework de référence",
  "body": "<p class=\"lede\"><b>PyTorch</b> (Meta, 2016, aujourd’hui sous la PyTorch Foundation) est le framework dominant en recherche et dans l’écosystème des modèles de langage : Hugging Face, vLLM, la plupart des modèles ouverts sont écrits avec.</p>\n    <p>Ses atouts : un style Python naturel (on exécute le code ligne à ligne, on débogue avec print), la différentiation automatique, l’accélération GPU, et <code>torch.compile</code> pour gagner en vitesse sans réécrire le code.</p>\n    <p>L’ingénieur IA n’entraîne pas toujours des modèles, mais il doit savoir lire du code PyTorch, charger un modèle, faire une inférence par lots, affiner un petit modèle et comprendre les erreurs de forme et de mémoire.</p>",
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
  "lit": "boucle",
  "look": {},
  "scene": "boucle",
  "fig": "",
  "panel": "<h2>La boucle d’entraînement</h2><div class=\"psub\">ce que fait chaque itération</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Lot</b><i>DataLoader</i></span><pre class=\"ex\">for x, y in loader:\n    x, y = x.to(dev), y.to(dev)</pre></li><li class=\"\"><span class=\"st\"><b>Passe avant</b><i>nn.Module</i></span><pre class=\"ex\">logits = model(x)</pre></li><li class=\"red\"><span class=\"st\"><b>Perte</b><i></i></span><pre class=\"ex\">loss = F.cross_entropy(logits, y)</pre></li><li class=\"red\"><span class=\"st\"><b>Rétropropagation</b><i>autograd</i></span><pre class=\"ex\">loss.backward()</pre></li><li class=\"blue\"><span class=\"st\"><b>Mise à jour</b><i>optimiseur</i></span><pre class=\"ex\">opt.step(); opt.zero_grad()</pre></li><li class=\"\"><span class=\"st\"><b>Journal</b><i>toutes les N étapes</i></span><pre class=\"ex\">if step % 100 == 0: wandb.log({&#x27;loss&#x27;: loss.item()})</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · époque</div><p class=\"note\">Toute boucle d’entraînement PyTorch suit ce cycle. On l’écrit soi-même (contrôle total) ou on la délègue à un outil (Lightning, Trainer de Hugging Face, Accelerate) qui ajoute la précision mixte, la répartition sur plusieurs GPU et les points de contrôle.</p><table class=\"data\"><tr><th>avant</th><td>model(x)</td></tr><tr><th>arrière</th><td>loss.backward()</td></tr><tr><th>pas</th><td>opt.step()</td></tr></table>"
 },
 {
  "kicker": "7.1",
  "title": "Les tenseurs",
  "sub": "le tableau de PyTorch",
  "body": "<p class=\"lede\">Un <b>tenseur</b> est un tableau à n dimensions, comme un ndarray NumPy, mais qui peut vivre sur GPU et suivre ses gradients.</p>\n    <table class=\"data\"><tr><th>attribut</th><th>exemple</th><th>rôle</th></tr><tr><td>shape</td><td>(32, 512, 4096)</td><td>lot, séquence, dimension</td></tr><tr><td>dtype</td><td>float32, bfloat16, int64</td><td>précision et mémoire</td></tr><tr><td>device</td><td>cpu, cuda:0, mps</td><td>où il vit</td></tr><tr><td>requires_grad</td><td>True</td><td>suivre les gradients</td></tr></table>\n    <p>Les opérations entre tenseurs doivent être sur le même appareil et de formes compatibles (broadcasting). Les deux erreurs les plus fréquentes : <i>shape mismatch</i> et <i>expected all tensors to be on the same device</i>.</p>",
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
  "lit": "boucle",
  "look": {},
  "scene": "boucle",
  "fig": "",
  "panel": "<h2>Manipuler des tenseurs</h2><div class=\"psub\">les opérations du quotidien</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Créer</b><i></i></span><pre class=\"ex\">x = torch.randn(32, 128, 768)\nids = torch.tensor([[101, 2023, 102]])</pre></li><li class=\"\"><span class=\"st\"><b>Changer de forme</b><i></i></span><pre class=\"ex\">x.view(32, 128, 12, 64).transpose(1, 2)   # têtes d’attention</pre></li><li class=\"blue\"><span class=\"st\"><b>Réduire</b><i></i></span><pre class=\"ex\">x.mean(dim=1)   # (32, 768) : moyenne sur la séquence</pre></li><li class=\"\"><span class=\"st\"><b>Appareil et type</b><i></i></span><pre class=\"ex\">x = x.to(&#x27;cuda&#x27;, dtype=torch.bfloat16)</pre></li><li class=\"red\"><span class=\"st\"><b>Vers NumPy</b><i></i></span><pre class=\"ex\">x.detach().cpu().numpy()</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "7.2",
  "title": "Autograd",
  "sub": "la dérivation automatique",
  "body": "<p class=\"lede\"><b>Autograd</b> enregistre chaque opération faite sur des tenseurs qui demandent un gradient, construisant un graphe de calcul. <code>loss.backward()</code> parcourt ce graphe à l’envers et remplit l’attribut <code>.grad</code> de chaque paramètre.</p>\n    <pre class=\"code\">x = torch.tensor(2.0, requires_grad=True)\ny = (3 * x) ** 2 / 2       # y = 4,5 x²\ny.backward()\nprint(x.grad)              # dy/dx = 9x = 18</pre>\n    <ul class=\"rules\"><li>Les gradients <b>s’accumulent</b> : il faut les remettre à zéro à chaque étape (<code>zero_grad</code>).</li><li>En inférence, <code>torch.no_grad()</code> ou <code>torch.inference_mode()</code> évite de construire le graphe : moins de mémoire, plus de vitesse.</li><li><code>.detach()</code> coupe un tenseur du graphe.</li></ul>",
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
  "lit": "boucle",
  "look": {},
  "scene": "boucle",
  "fig": "",
  "panel": "<h2>La boucle d’entraînement</h2><div class=\"psub\">ce que fait chaque itération</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Lot</b><i>DataLoader</i></span><pre class=\"ex\">for x, y in loader:\n    x, y = x.to(dev), y.to(dev)</pre></li><li class=\"\"><span class=\"st\"><b>Passe avant</b><i>nn.Module</i></span><pre class=\"ex\">logits = model(x)</pre></li><li class=\"red\"><span class=\"st\"><b>Perte</b><i></i></span><pre class=\"ex\">loss = F.cross_entropy(logits, y)</pre></li><li class=\"red\"><span class=\"st\"><b>Rétropropagation</b><i>autograd</i></span><pre class=\"ex\">loss.backward()</pre></li><li class=\"blue\"><span class=\"st\"><b>Mise à jour</b><i>optimiseur</i></span><pre class=\"ex\">opt.step(); opt.zero_grad()</pre></li><li class=\"\"><span class=\"st\"><b>Journal</b><i>toutes les N étapes</i></span><pre class=\"ex\">if step % 100 == 0: wandb.log({&#x27;loss&#x27;: loss.item()})</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · époque</div><p class=\"note\">Toute boucle d’entraînement PyTorch suit ce cycle. On l’écrit soi-même (contrôle total) ou on la délègue à un outil (Lightning, Trainer de Hugging Face, Accelerate) qui ajoute la précision mixte, la répartition sur plusieurs GPU et les points de contrôle.</p><table class=\"data\"><tr><th>avant</th><td>model(x)</td></tr><tr><th>arrière</th><td>loss.backward()</td></tr><tr><th>pas</th><td>opt.step()</td></tr></table>"
 },
 {
  "kicker": "7.3",
  "title": "nn.Module",
  "sub": "construire un modèle",
  "body": "<p class=\"lede\">Un modèle PyTorch est une classe qui hérite de <code>nn.Module</code> : on déclare les couches dans <code>__init__</code> et le calcul dans <code>forward</code>.</p>\n    <pre class=\"code\">class Classifieur(nn.Module):\n    def __init__(self, d=768, n=12):\n        super().__init__()\n        self.couche = nn.Sequential(nn.Linear(d, 256), nn.GELU(), nn.Linear(256, n))\n    def forward(self, x):\n        return self.couche(x)</pre>\n    <p>Le module enregistre automatiquement ses paramètres (<code>model.parameters()</code>), se déplace d’un bloc sur GPU (<code>model.to('cuda')</code>) et bascule entre <code>model.train()</code> et <code>model.eval()</code>, ce qui change le comportement du dropout et de la normalisation par lots. Oublier <code>eval()</code> avant une évaluation est un bogue classique.</p>",
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
  "lit": "boucle",
  "look": {},
  "scene": "boucle",
  "fig": "",
  "panel": "<h2>La boucle d’entraînement</h2><div class=\"psub\">ce que fait chaque itération</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Lot</b><i>DataLoader</i></span><pre class=\"ex\">for x, y in loader:\n    x, y = x.to(dev), y.to(dev)</pre></li><li class=\"\"><span class=\"st\"><b>Passe avant</b><i>nn.Module</i></span><pre class=\"ex\">logits = model(x)</pre></li><li class=\"red\"><span class=\"st\"><b>Perte</b><i></i></span><pre class=\"ex\">loss = F.cross_entropy(logits, y)</pre></li><li class=\"red\"><span class=\"st\"><b>Rétropropagation</b><i>autograd</i></span><pre class=\"ex\">loss.backward()</pre></li><li class=\"blue\"><span class=\"st\"><b>Mise à jour</b><i>optimiseur</i></span><pre class=\"ex\">opt.step(); opt.zero_grad()</pre></li><li class=\"\"><span class=\"st\"><b>Journal</b><i>toutes les N étapes</i></span><pre class=\"ex\">if step % 100 == 0: wandb.log({&#x27;loss&#x27;: loss.item()})</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · époque</div><p class=\"note\">Toute boucle d’entraînement PyTorch suit ce cycle. On l’écrit soi-même (contrôle total) ou on la délègue à un outil (Lightning, Trainer de Hugging Face, Accelerate) qui ajoute la précision mixte, la répartition sur plusieurs GPU et les points de contrôle.</p><table class=\"data\"><tr><th>avant</th><td>model(x)</td></tr><tr><th>arrière</th><td>loss.backward()</td></tr><tr><th>pas</th><td>opt.step()</td></tr></table>"
 },
 {
  "kicker": "7.4",
  "title": "Les DataLoaders",
  "sub": "nourrir le modèle",
  "body": "<p class=\"lede\">Un <code>Dataset</code> sait renvoyer l’exemple i ; un <code>DataLoader</code> les regroupe en <b>lots</b>, les mélange et les charge en parallèle.</p>\n    <pre class=\"code\">class Tickets(Dataset):\n    def __init__(self, df, tok): self.df, self.tok = df, tok\n    def __len__(self): return len(self.df)\n    def __getitem__(self, i):\n        r = self.df.iloc[i]\n        return self.tok(r.texte, truncation=True, max_length=256), r.label\nloader = DataLoader(Tickets(df, tok), batch_size=32, shuffle=True, num_workers=4, collate_fn=collate)</pre>\n    <p>Pour du texte, la fonction <code>collate_fn</code> complète (padding) les séquences à la même longueur dans un lot. Un GPU qui attend les données est un GPU gaspillé : on surveille son taux d’utilisation.</p>",
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
  "lit": "boucle",
  "look": {},
  "scene": "boucle",
  "fig": "",
  "panel": "<h2>La boucle d’entraînement</h2><div class=\"psub\">ce que fait chaque itération</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Lot</b><i>DataLoader</i></span><pre class=\"ex\">for x, y in loader:\n    x, y = x.to(dev), y.to(dev)</pre></li><li class=\"\"><span class=\"st\"><b>Passe avant</b><i>nn.Module</i></span><pre class=\"ex\">logits = model(x)</pre></li><li class=\"red\"><span class=\"st\"><b>Perte</b><i></i></span><pre class=\"ex\">loss = F.cross_entropy(logits, y)</pre></li><li class=\"red\"><span class=\"st\"><b>Rétropropagation</b><i>autograd</i></span><pre class=\"ex\">loss.backward()</pre></li><li class=\"blue\"><span class=\"st\"><b>Mise à jour</b><i>optimiseur</i></span><pre class=\"ex\">opt.step(); opt.zero_grad()</pre></li><li class=\"\"><span class=\"st\"><b>Journal</b><i>toutes les N étapes</i></span><pre class=\"ex\">if step % 100 == 0: wandb.log({&#x27;loss&#x27;: loss.item()})</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · époque</div><p class=\"note\">Toute boucle d’entraînement PyTorch suit ce cycle. On l’écrit soi-même (contrôle total) ou on la délègue à un outil (Lightning, Trainer de Hugging Face, Accelerate) qui ajoute la précision mixte, la répartition sur plusieurs GPU et les points de contrôle.</p><table class=\"data\"><tr><th>avant</th><td>model(x)</td></tr><tr><th>arrière</th><td>loss.backward()</td></tr><tr><th>pas</th><td>opt.step()</td></tr></table>"
 },
 {
  "kicker": "7.5",
  "title": "Écrire sa boucle d’entraînement",
  "sub": "garder le contrôle",
  "body": "<p class=\"lede\">Écrire sa propre boucle permet de tout voir et tout modifier : pertes multiples, échantillonnage particulier, journalisation fine.</p>\n    <pre class=\"code\">for epoch in range(3):\n    model.train()\n    for x, y in train_loader:\n        x, y = x.to(dev), y.to(dev)\n        with torch.autocast(&#x27;cuda&#x27;, dtype=torch.bfloat16):\n            loss = F.cross_entropy(model(x), y)\n        loss.backward()\n        torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)\n        opt.step(); sched.step(); opt.zero_grad()\n    val = evaluer(model, val_loader)</pre>\n    <p>Vérification de bon sens indispensable : faire <b>surapprendre un seul lot</b>. Si la perte ne tombe pas presque à zéro sur 32 exemples répétés, il y a un bogue avant même de lancer le vrai entraînement.</p>",
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
  "lit": "boucle",
  "look": {},
  "scene": "boucle",
  "fig": "",
  "panel": "<h2>La boucle d’entraînement</h2><div class=\"psub\">ce que fait chaque itération</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Lot</b><i>DataLoader</i></span><pre class=\"ex\">for x, y in loader:\n    x, y = x.to(dev), y.to(dev)</pre></li><li class=\"\"><span class=\"st\"><b>Passe avant</b><i>nn.Module</i></span><pre class=\"ex\">logits = model(x)</pre></li><li class=\"red\"><span class=\"st\"><b>Perte</b><i></i></span><pre class=\"ex\">loss = F.cross_entropy(logits, y)</pre></li><li class=\"red\"><span class=\"st\"><b>Rétropropagation</b><i>autograd</i></span><pre class=\"ex\">loss.backward()</pre></li><li class=\"blue\"><span class=\"st\"><b>Mise à jour</b><i>optimiseur</i></span><pre class=\"ex\">opt.step(); opt.zero_grad()</pre></li><li class=\"\"><span class=\"st\"><b>Journal</b><i>toutes les N étapes</i></span><pre class=\"ex\">if step % 100 == 0: wandb.log({&#x27;loss&#x27;: loss.item()})</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · époque</div><p class=\"note\">Toute boucle d’entraînement PyTorch suit ce cycle. On l’écrit soi-même (contrôle total) ou on la délègue à un outil (Lightning, Trainer de Hugging Face, Accelerate) qui ajoute la précision mixte, la répartition sur plusieurs GPU et les points de contrôle.</p><table class=\"data\"><tr><th>avant</th><td>model(x)</td></tr><tr><th>arrière</th><td>loss.backward()</td></tr><tr><th>pas</th><td>opt.step()</td></tr></table>"
 },
 {
  "kicker": "7.6",
  "title": "L’entraînement sur GPU",
  "sub": "vitesse et mémoire",
  "body": "<p class=\"lede\">Un GPU accélère d’un facteur 10 à 100 les produits de matrices. Pour en tirer parti :</p>\n    <ul class=\"rules\"><li>Mettre modèle et données sur le même appareil : <code>model.to('cuda')</code>, <code>x.to('cuda')</code>.</li><li><b>Précision mixte</b> bf16 (<code>torch.autocast</code>) : deux fois moins de mémoire, cœurs tenseur utilisés.</li><li><b>Accumulation de gradients</b> : simuler un grand lot avec plusieurs petits.</li><li><b>Gradient checkpointing</b> : recalculer les activations au lieu de les garder.</li><li><b>Plusieurs GPU</b> : DDP (données en parallèle), FSDP ou DeepSpeed ZeRO (poids et états répartis).</li><li>Sur Mac, l’appareil <code>mps</code> utilise le GPU Apple.</li></ul>\n    <p>Le message <i>CUDA out of memory</i> se traite dans l’ordre : réduire le lot, activer bf16, le checkpointing, l’accumulation, puis LoRA ou la quantification (chapitre 19).</p>",
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
  "panel": "<h2>Diagnostiquer le GPU</h2><div class=\"psub\">commandes et réglages</div><ol class=\"flow\"><li class=\"\"><span class=\"st\"><b>Voir les GPU</b><i></i></span><pre class=\"ex\">nvidia-smi   # mémoire, utilisation, processus\nwatch -n 1 nvidia-smi</pre></li><li class=\"\"><span class=\"st\"><b>Depuis Python</b><i></i></span><pre class=\"ex\">torch.cuda.is_available(); torch.cuda.get_device_name()\ntorch.cuda.max_memory_allocated() / 2**30   # Go</pre></li><li class=\"blue\"><span class=\"st\"><b>Précision mixte</b><i></i></span><pre class=\"ex\">with torch.autocast(&#x27;cuda&#x27;, dtype=torch.bfloat16): ...</pre></li><li class=\"\"><span class=\"st\"><b>Accumuler</b><i>lot effectif 128</i></span><pre class=\"ex\">loss = loss / 4; loss.backward()\nif (i + 1) % 4 == 0: opt.step(); opt.zero_grad()</pre></li><li class=\"red\"><span class=\"st\"><b>Compiler</b><i></i></span><pre class=\"ex\">model = torch.compile(model)   # 1,3 à 2× plus rapide</pre></li></ol><p class=\"note\"></p>"
 },
 {
  "kicker": "7.7",
  "title": "Les points de contrôle",
  "sub": "sauvegarder et reprendre",
  "body": "<p class=\"lede\">Un entraînement peut s’arrêter (panne, machine préemptible) : on sauvegarde régulièrement un <b>point de contrôle</b> (checkpoint).</p>\n    <pre class=\"code\">torch.save({&#x27;model&#x27;: model.state_dict(), &#x27;opt&#x27;: opt.state_dict(),\n            &#x27;sched&#x27;: sched.state_dict(), &#x27;step&#x27;: step}, &#x27;ckpt.pt&#x27;)\n# reprise\nck = torch.load(&#x27;ckpt.pt&#x27;, map_location=&#x27;cpu&#x27;)\nmodel.load_state_dict(ck[&#x27;model&#x27;]); opt.load_state_dict(ck[&#x27;opt&#x27;])</pre>\n    <ul class=\"rules\"><li>On sauve le <code>state_dict</code> (les tenseurs), pas l’objet entier.</li><li>Pour partager des poids, préférer le format <b>safetensors</b> : il ne peut pas exécuter de code, contrairement à pickle (chapitre 27).</li><li>Garder le meilleur point selon la validation, pas seulement le dernier.</li><li>Fixer les graines aléatoires et noter versions et hyperparamètres pour la reproductibilité.</li></ul>",
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
  "lit": "boucle",
  "look": {},
  "scene": "boucle",
  "fig": "",
  "panel": "<h2>La boucle d’entraînement</h2><div class=\"psub\">ce que fait chaque itération</div><ol class=\"flow\"><li class=\"blue\"><span class=\"st\"><b>Lot</b><i>DataLoader</i></span><pre class=\"ex\">for x, y in loader:\n    x, y = x.to(dev), y.to(dev)</pre></li><li class=\"\"><span class=\"st\"><b>Passe avant</b><i>nn.Module</i></span><pre class=\"ex\">logits = model(x)</pre></li><li class=\"red\"><span class=\"st\"><b>Perte</b><i></i></span><pre class=\"ex\">loss = F.cross_entropy(logits, y)</pre></li><li class=\"red\"><span class=\"st\"><b>Rétropropagation</b><i>autograd</i></span><pre class=\"ex\">loss.backward()</pre></li><li class=\"blue\"><span class=\"st\"><b>Mise à jour</b><i>optimiseur</i></span><pre class=\"ex\">opt.step(); opt.zero_grad()</pre></li><li class=\"\"><span class=\"st\"><b>Journal</b><i>toutes les N étapes</i></span><pre class=\"ex\">if step % 100 == 0: wandb.log({&#x27;loss&#x27;: loss.item()})</pre></li></ol><div class=\"loop\">↺ retour à l’étape 1 · époque</div><p class=\"note\">Toute boucle d’entraînement PyTorch suit ce cycle. On l’écrit soi-même (contrôle total) ou on la délègue à un outil (Lightning, Trainer de Hugging Face, Accelerate) qui ajoute la précision mixte, la répartition sur plusieurs GPU et les points de contrôle.</p><table class=\"data\"><tr><th>avant</th><td>model(x)</td></tr><tr><th>arrière</th><td>loss.backward()</td></tr><tr><th>pas</th><td>opt.step()</td></tr></table>"
 }
];
export const PLATES = {
  memoire: { text: "Pour l’inférence, il suffit des poids : 2 octets par paramètre en bf16. Pour l’entraînement, il faut aussi les gradients et l’état de l’optimiseur (Adam garde deux moyennes par poids), soit environ 16 octets par paramètre. D’où l’intérêt de LoRA, qui n’entraîne qu’une infime partie des poids.", facts: () => [["inférence bf16", "2 octets / paramètre"], ["entraînement Adam", "≈ 16 octets / paramètre"], ["+ activations", "selon lot et séquence"]] }
};
