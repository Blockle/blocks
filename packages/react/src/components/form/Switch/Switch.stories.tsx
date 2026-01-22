import preview from '../../../../../../.storybook/preview.js';
import { Box } from '../../layout/Box/Box.js';
import { Switch } from './Switch.js';

const meta = preview.meta({
  title: 'Form/Switch',
  component: Switch,
});

export const Default = meta.story({
  render: ({ ...props }) => {
    return (
      <Box display="flex" gap={2} alignItems="center">
        <label htmlFor="switch">Switch label</label>
        <Switch id="switch" {...props} />
      </Box>
    );
  },
  args: {
    onChange: (value) => console.log('onChange', value),
  },
});
