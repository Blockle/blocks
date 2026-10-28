import { vars } from '@blockle/blocks-core';
import { globalStyle } from '@vanilla-extract/css';

// The canvas background follows the surface role, so it tracks the color mode.
globalStyle('body', {
  backgroundColor: vars.colorRole.surface.default,
});
