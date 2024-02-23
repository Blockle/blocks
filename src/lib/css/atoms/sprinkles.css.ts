import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';
import { responsiveProperties, unresponsiveProperties } from './atomicProperties';
import { breakpointNames, breakpointQuery } from './breakpoints';

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
      '@media': breakpointQuery('tablet'),
    },
    desktop: {
      '@media': breakpointQuery('desktop'),
    },
    wide: {
      '@media': breakpointQuery('wide'),
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
