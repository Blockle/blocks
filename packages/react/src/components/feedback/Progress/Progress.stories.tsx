import preview from '../../../../../../.storybook/preview.js';
import { Stack } from '../../layout/Stack/Stack.js';
import { Text } from '../../typography/Text/Text.js';
import { Progress } from './Progress.js';

const meta = preview.meta({
  title: 'Feedback/Progress',
  component: Progress,
  argTypes: {
    value: {
      name: 'Value',
      description: 'Progress bar value',
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
});

export const Default = meta.story();

export const LabelledBy = meta.story({
  render: (props) => {
    return (
      <Stack gap={3}>
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
});
