import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { Stack } from '../layout/Stack';
import { Text } from '../typography/Text';
import { Progress, ProgressProps } from './Progress';

export default {
  title: 'Components/Progress',
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
      <Stack gap="medium">
        <Text tag="label" id={props['aria-labelledby']}>
          Progress{' '}
          {props.value === undefined ? (
            <Text fontStyle="italic">indeterminate</Text>
          ) : (
            `${props.value}%`
          )}
        </Text>
        <Progress {...props} />
      </Stack>
    );
  },
  args: {
    value: undefined,
    'aria-labelledby': 'progress-label',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByLabelText(/^Progress /)).toBeInTheDocument();
  },
};
