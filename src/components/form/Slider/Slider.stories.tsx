import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { FC, useState } from 'react';
import { Stack } from '../../layout/Stack';
import { Text } from '../../typography/Text';
import { Slider, SliderProps } from './Slider';

export default {
  title: 'Form/Slider',
  component: Slider,
} as Meta<typeof Slider>;

export const Default: StoryObj<SliderProps> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByLabelText('How happy are you today?')).toBeInTheDocument();
  },

  args: {
    'aria-label': 'How happy are you today?',
    min: 0,
    max: 10,
  },
};

const SliderWithState: FC<SliderProps> = (props) => {
  const [value, setValue] = useState(5);

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
