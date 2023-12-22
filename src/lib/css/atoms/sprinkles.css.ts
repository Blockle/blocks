import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';
import { responsiveProperties, unresponsiveProperties } from './atomicProperties';
import { breakpointNames, breakpointQuery } from './breakpoints';

const unresponsiveAtomicProperties = defineProperties({
  properties: unresponsiveProperties,
  shorthands: {
    inset: ['top', 'bottom', 'left', 'right'],
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
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    placeItems: ['justifyContent', 'alignItems'],
  },
});

export const atoms = createSprinkles(unresponsiveAtomicProperties, responsiveAtomicProperties);
