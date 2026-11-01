import { layer } from '@vanilla-extract/css';

// Declaration order is precedence order, lowest first:
// reset < molecule (base styles) < theme (Component themes) < atom < organism.
const resetLayer = layer('blockle-reset');
const moleculeLayer = layer('blockle-molecule');
const themeLayer = layer('blockle-theme');
const atomLayer = layer('blockle-atom');
const organismLayer = layer('blockle-organism');

export const layers = {
  reset: resetLayer,
  atom: atomLayer,
  molecule: moleculeLayer,
  theme: themeLayer,
  organism: organismLayer,
} as const;
