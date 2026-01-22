import preview from '../../../../../../.storybook/preview.js';
import { Heading } from '../../typography/Heading/Heading.js';
import { Divider } from './Divider.js';

const meta = preview.meta({
  title: 'Display/Divider',
  component: Divider,
});

export const Default = meta.story();

export const WithText = meta.story({
  render: (args) => (
    <Divider {...args}>
      <Heading level={3}>Section 1</Heading>
    </Divider>
  ),
  args: {
    alignment: 'start',
  },
});
