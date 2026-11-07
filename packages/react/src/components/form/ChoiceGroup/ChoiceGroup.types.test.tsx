import { describe, expectTypeOf, it } from 'vitest';

import { Choice } from './Choice.js';
import { ChoiceGroup } from './ChoiceGroup.js';

type Color = 'teal' | 'red';

// These cases are checked by `tsc` through the @ts-expect-error comments; the
// JSX is never rendered.
describe('ChoiceGroup types', () => {
  it('infers the value union from value and onValueChange', () => {
    const element = (
      <ChoiceGroup
        aria-label="Colour"
        value={'teal' as Color}
        onValueChange={(value) => expectTypeOf(value).toEqualTypeOf<Color>()}
      >
        <Choice<Color> value="teal">Teal</Choice>
      </ChoiceGroup>
    );

    expectTypeOf(element).not.toBeAny();
  });

  it('infers the union from defaultValue', () => {
    const element = (
      <ChoiceGroup
        aria-label="Colour"
        defaultValue={'teal' as Color}
        onValueChange={(value) => expectTypeOf(value).toEqualTypeOf<Color>()}
      />
    );

    expectTypeOf(element).not.toBeAny();
  });

  it('rejects a Choice value outside the union', () => {
    const element = (
      <ChoiceGroup aria-label="Colour" value={'teal' as Color}>
        {/* @ts-expect-error blue is not in the union */}
        <Choice<Color> value="blue">Blue</Choice>
      </ChoiceGroup>
    );

    expectTypeOf(element).not.toBeAny();
  });

  it('requires aria-label or aria-labelledby on the group', () => {
    // @ts-expect-error the radiogroup needs an accessible name
    const missing = <ChoiceGroup>{null}</ChoiceGroup>;
    const labelled = <ChoiceGroup aria-labelledby="id">{null}</ChoiceGroup>;

    expectTypeOf(missing).not.toBeAny();
    expectTypeOf(labelled).not.toBeAny();
  });

  it('requires aria-label on a Choice without children', () => {
    const element = (
      <ChoiceGroup aria-label="Colour">
        {/* @ts-expect-error no children and no aria-label */}
        <Choice value="a" />
        <Choice value="b" aria-label="B" />
        <Choice value="c">C</Choice>
      </ChoiceGroup>
    );

    expectTypeOf(element).not.toBeAny();
  });
});
