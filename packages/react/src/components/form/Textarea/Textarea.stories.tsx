import preview from '../../../../../../.storybook/preview.js';
import { Grid } from '../../layout/Grid/Grid.js';
import { GridItem } from '../../layout/Grid/GridItem.js';
import { Stack } from '../../layout/Stack/Stack.js';
import { Textarea } from './Textarea.js';

const meta = preview.meta({
  title: 'Form/Textarea',
  component: Textarea,
});

export const Default = meta.story({
  render: ({ ...props }) => {
    return (
      <Stack gap={2}>
        <label htmlFor="textarea">Textarea label</label>
        <Textarea id="textarea" {...props} />
      </Stack>
    );
  },
  args: {
    name: 'textarea',
    placeholder: 'Type your text here...',
  },
});

export const Fill = meta.story({
  render: ({ ...props }) => {
    return (
      <Grid gap={3}>
        <GridItem colSpan={[12, 6]}>
          <Textarea aria-label="First textarea" {...props} />
        </GridItem>
        <GridItem colSpan={[12, 6]}>
          <Textarea aria-label="Second textarea" {...props} />
        </GridItem>
      </Grid>
    );
  },
  args: {
    grow: true,
    fill: true,
    placeholder: 'Type a long value to grow both textareas...',
  },
});
