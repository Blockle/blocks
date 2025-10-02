import { layer } from '@vanilla-extract/css';

export const blocksLayerAtom = layer('blocks-atom');

export const blocksLayerComponent = layer(
  { parent: blocksLayerAtom },
  'blocks-component',
);

export const blocksLayer = layer(
  { parent: blocksLayerComponent },
  'blockle-blocks',
);
