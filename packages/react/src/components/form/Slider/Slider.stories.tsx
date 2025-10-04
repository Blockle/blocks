import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { type FC, useState } from 'react';
import { Stack } from '../../layout/Stack/Stack.js';
import { Text } from '../../typography/Text/Text.js';
import { Slider, type SliderProps } from './Slider.js';

export default {
  title: 'Form/Slider',
  component: Slider,
} as Meta<typeof Slider>;

export const Default: StoryObj<SliderProps> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByLabelText('How happy are you today?'),
    ).toBeInTheDocument();
  },

  args: {
    'aria-label': 'How happy are you today?',
    min: 0,
    max: 10,
  },
};

const SliderWithState: FC<SliderProps> = ({ value: _value, ...props }) => {
  const [value, setValue] = useState(60);

  return (
    <Stack spacing="medium">
      <Slider value={value} onChange={(value) => setValue(value)} {...props} />
      <Text>Value: {value}</Text>
    </Stack>
  );
};

export const WithState: StoryObj<SliderProps> = {
  render(props) {
    return <SliderWithState {...props} />;
  },

  args: {
    'aria-label': 'How happy are you today?',
    min: 0,
    max: 100,
  },
};

export const WithStepSize: StoryObj<SliderProps> = {
  render(props) {
    return <SliderWithState {...props} />;
  },

  args: {
    'aria-label': 'How many steps are you willing to take?',
    min: 0,
    max: 100,
    step: 10,
  },
};
