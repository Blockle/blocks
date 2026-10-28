import { describe, expect, it } from 'vitest';

import { atomicProperties } from '../atoms/atoms.css.js';
import { vars } from './vars.css.js';

const intents = [
  'primary',
  'secondary',
  'neutral',
  'danger',
  'success',
  'info',
  'warning',
];
const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900];

describe('Palette', () => {
  const palette = [
    'white',
    'black',
    ...intents.flatMap((intent) => shades.map((shade) => `${intent}-${shade}`)),
  ];

  it('is the intent scales plus white and black', () => {
    expect(Object.keys(vars.color).sort()).toEqual([...palette].sort());
  });

  it('offers exactly the Palette to the color atoms', () => {
    const fixed = ['currentColor', 'transparent'];

    for (const property of [
      'color',
      'backgroundColor',
      'borderColor',
    ] as const) {
      expect(Object.keys(atomicProperties[property].values).sort()).toEqual(
        [...palette, ...fixed].sort(),
      );
    }
  });

  it('has no focus or shadow contract outside the Color roles', () => {
    expect(vars).not.toHaveProperty('focus');
    expect(vars).not.toHaveProperty('shadow');
  });
});
