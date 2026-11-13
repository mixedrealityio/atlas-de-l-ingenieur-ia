import { startBook } from '../engine/book.js';
import { buildScenes } from '../engine/iakit.js';
import { PAGES, PLATES } from './pages.js';
import { SPECS } from './scenes.js';

let W;
startBook({
  no: 15, PAGES, PLATES, clock0: 0, lookKeys: [],
  buildWorld(E) {
    W = buildScenes(E, SPECS);
    for (const p of PAGES) if (p.cam.auto) Object.assign(p.cam, W.frame(p.scene));
    return { update: s => W.update(s), labels: W.labels };
  },
  state: (clock, reduced) => ({ t: reduced ? 4 : clock }),
  readout: (s, p) => W.info(p.scene),
});
