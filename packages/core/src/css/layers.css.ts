import { layer } from '@vanilla-extract/css';

export const blocksLayerComponent = layer('blocks-component');

export const blocksLayerAtom = layer(
  { parent: blocksLayerComponent },
  'blocks-atom',
);

export const blocksLayer = layer({ parent: blocksLayerAtom }, 'blockle-blocks');
