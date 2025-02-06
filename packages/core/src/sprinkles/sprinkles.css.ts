import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

import { breakpointNames, minMediaQuery } from '../utils/breakpoint/breakpoint';
import {
  responsiveProperties,
  unresponsiveProperties,
} from './atomicProperties';

const unresponsiveAtomicProperties = defineProperties({
  properties: unresponsiveProperties,
  shorthands: {
    inset: [
      'insetBlockStart',
      'insetBlockEnd',
      'insetInlineStart',
      'insetInlineEnd',
    ],
  },
});

const responsiveAtomicProperties = defineProperties({
  defaultCondition: 'mobile',
  conditions: {
    mobile: {},
    tablet: {
      '@media': minMediaQuery('tablet'),
    },
    desktop: {
      '@media': minMediaQuery('desktop'),
    },
    wide: {
      '@media': minMediaQuery('wide'),
    },
  },
  responsiveArray: breakpointNames,
  properties: responsiveProperties,
  shorthands: {
    margin: [
      'marginBlockStart',
      'marginBlockEnd',
      'marginInlineStart',
      'marginInlineEnd',
    ],
    marginBlock: ['marginBlockStart', 'marginBlockEnd'],
    marginInline: ['marginInlineStart', 'marginInlineEnd'],
    placeItems: ['justifyContent', 'alignItems'],
  },
});

export const sprinkles = createSprinkles(
  unresponsiveAtomicProperties,
  responsiveAtomicProperties,
);

export type Sprinkles = Parameters<typeof sprinkles>[0];
