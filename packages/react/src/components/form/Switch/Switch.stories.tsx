import { useState } from 'react';

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
    onChange: (event) => console.log('onChange', event.target.checked),
  },
});

export const Controlled = meta.story({
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <Box display="flex" gap={2} alignItems="center">
        <label htmlFor="controlled-switch">
          Show archived ({checked ? 'on' : 'off'})
        </label>
        <Switch
          id="controlled-switch"
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
        />
      </Box>
    );
  },
});
