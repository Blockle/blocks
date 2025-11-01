import { layer } from '@vanilla-extract/css';

const organismLayer = layer('blockle-organism');
const moleculeLayer = layer({ parent: organismLayer }, 'blockle-molecule');
const atomLayer = layer({ parent: moleculeLayer }, 'blockle-atom');
const resetLayer = layer({ parent: atomLayer }, 'blockle-reset');

export const layers = {
  reset: resetLayer,
  atom: atomLayer,
  molecule: moleculeLayer,
  organism: organismLayer,
} as const;
