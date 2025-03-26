import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { Stack } from '../../layout/Stack';
import { Text } from '../../typography/Text';
import { Progress, type ProgressProps } from './Progress';

export default {
  title: 'Feedback/Progress',
  component: Progress,
  argTypes: {
    value: {
      name: 'Value',
      description: 'Progress bar value',
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
} as Meta;

export const Default: StoryObj<ProgressProps> = {
  render: (props) => {
    return (
      <Stack spacing="medium">
        <Text tag="label" id={props['aria-labelledby']}>
          Progress {props.value}%
        </Text>
        <Progress {...props} />
      </Stack>
    );
  },
  args: {
    value: 50,
    'aria-labelledby': 'progress-label',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByLabelText(/^Progress /)).toBeInTheDocument();
  },
};
