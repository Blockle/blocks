import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';
import { responsiveProperties, unresponsiveProperties } from './atomicProperties';
import { breakpointNames, minMediaQuery } from './breakpoints';

const unresponsiveAtomicProperties = defineProperties({
  properties: unresponsiveProperties,
  shorthands: {
    inset: ['insetBlockStart', 'insetBlockEnd', 'insetInlineStart', 'insetInlineEnd'],
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
    margin: ['marginBlockStart', 'marginBlockEnd', 'marginInlineStart', 'marginInlineEnd'],
    marginBlock: ['marginBlockStart', 'marginBlockEnd'],
    marginInline: ['marginInlineStart', 'marginInlineEnd'],
    placeItems: ['justifyContent', 'alignItems'],
  },
});

export const atoms = createSprinkles(unresponsiveAtomicProperties, responsiveAtomicProperties);
