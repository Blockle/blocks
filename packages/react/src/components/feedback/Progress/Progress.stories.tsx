import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from '../../layout/Stack/Stack.js';
import { Text } from '../../typography/Text/Text.js';
import { Progress, type ProgressProps } from './Progress.js';

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
      <Stack spacing={3}>
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
};
