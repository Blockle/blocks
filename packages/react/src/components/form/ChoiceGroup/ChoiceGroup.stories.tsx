import { useState } from 'react';

import preview from '../../../../../../.storybook/preview.js';
import { HeroIcon } from '../../display/Icon/exampleIconMask.js';
import { Stack } from '../../layout/Stack/Stack.js';
import { Text } from '../../typography/Text/Text.js';
import { Choice } from './Choice.js';
import { ChoiceGroup } from './ChoiceGroup.js';

const meta = preview.meta({
  title: 'Form/ChoiceGroup',
  component: ChoiceGroup,
});

type Color = 'teal' | 'red' | 'violet' | 'amber';

const colors: Record<Color, string> = {
  teal: '#14b8a6',
  red: '#ef4444',
  violet: '#8b5cf6',
  amber: '#f59e0b',
};

export const Button = meta.story({
  render: () => (
    <Stack gap={2}>
      <Text id="view-label">View</Text>
      <ChoiceGroup aria-labelledby="view-label" defaultValue="list">
        <Choice value="list">List</Choice>
        <Choice value="board">Board</Choice>
        <Choice value="calendar">Calendar</Choice>
      </ChoiceGroup>
    </Stack>
  ),
});

export const Icons = meta.story({
  render: () => (
    <ChoiceGroup aria-label="Icon" defaultValue="star">
      <Choice value="star" aria-label="Star">
        <HeroIcon name="star" />
      </Choice>
      <Choice value="heart" aria-label="Heart">
        <HeroIcon name="heart" />
      </Choice>
      <Choice value="bell" aria-label="Bell">
        <HeroIcon name="bell" />
      </Choice>
    </ChoiceGroup>
  ),
});

export const Swatch = meta.story({
  render: () => (
    <ChoiceGroup aria-label="Colour" variant="swatch" defaultValue="teal">
      {(Object.keys(colors) as Color[]).map((name) => (
        <Choice<Color>
          key={name}
          value={name}
          color={colors[name]}
          aria-label={name}
        />
      ))}
    </ChoiceGroup>
  ),
});

export const Uncontrolled = meta.story({
  render: () => (
    <ChoiceGroup aria-label="Colour" variant="swatch" defaultValue="teal">
      {(Object.keys(colors) as Color[]).map((name) => (
        <Choice<Color>
          key={name}
          value={name}
          color={colors[name]}
          aria-label={name}
        />
      ))}
    </ChoiceGroup>
  ),
});

export const Controlled = meta.story({
  render: () => {
    const [color, setColor] = useState<Color>('teal');

    return (
      <Stack gap={2}>
        <ChoiceGroup
          aria-label="Colour"
          variant="swatch"
          value={color}
          onValueChange={setColor}
        >
          {(Object.keys(colors) as Color[]).map((name) => (
            <Choice<Color>
              key={name}
              value={name}
              color={colors[name]}
              aria-label={name}
            />
          ))}
        </ChoiceGroup>
        <Text>Picked: {color}</Text>
      </Stack>
    );
  },
});

export const Disabled = meta.story({
  render: () => (
    <Stack gap={4}>
      <ChoiceGroup aria-label="View" defaultValue="list" disabled>
        <Choice value="list">List</Choice>
        <Choice value="board">Board</Choice>
      </ChoiceGroup>

      <ChoiceGroup aria-label="Colour" variant="swatch" defaultValue="teal">
        <Choice value="teal" color={colors.teal} aria-label="Teal" />
        <Choice value="red" color={colors.red} aria-label="Red" disabled />
      </ChoiceGroup>
    </Stack>
  ),
});
