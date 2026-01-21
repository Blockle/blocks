import { layers } from '@blockle/blocks-core';
import { createVar, style } from '@vanilla-extract/css';

export const dividerColorVar = createVar();

export const divider = style({
  '@layer': {
    [layers.molecule]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      clear: 'both',
      minBlockSize: '1px',
      ':empty': {
        gap: 0,
      },
      ':before': {
        flex: 1,
        content: '""',
        display: 'block',
        backgroundColor: dividerColorVar,
      },
      ':after': {
        flex: 1,
        content: '""',
        display: 'block',
        backgroundColor: dividerColorVar,
      },
      selectors: {
        '&[data-alignment="start"]:before': {
          maxInlineSize: '3rem',
        },
        '&[data-alignment="end"]:after': {
          maxInlineSize: '3rem',
        },
      },
    },
  },
});
