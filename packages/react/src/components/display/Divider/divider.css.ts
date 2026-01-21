import { layers } from '@blockle/blocks-core';
import { createVar, style } from '@vanilla-extract/css';

export const dividerColorVar = createVar();

export const divider = style({
  '@layer': {
    [layers.molecule]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'right',
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
        '&[data-align="start"]:before': {
          maxInlineSize: '3rem',
        },
        '&[data-align="end"]:after': {
          maxInlineSize: '3rem',
        },
      },
    },
  },
});
