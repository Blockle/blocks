import { layer } from '@vanilla-extract/css';

const resetLayer = layer('blockle-reset');
const atomLayer = layer('blockle-atom');
const moleculeLayer = layer('blockle-molecule');
const organismLayer = layer('blockle-organism');

export const layers = {
  reset: resetLayer,
  atom: atomLayer,
  molecule: moleculeLayer,
  organism: organismLayer,
} as const;
