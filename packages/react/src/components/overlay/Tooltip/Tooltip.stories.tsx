import preview from '../../../../../../.storybook/preview.js';
import { Button } from '../../form/Button/Button.js';
import { Box } from '../../layout/Box/Box.js';
import { Tooltip } from './Tooltip.js';

const meta = preview.meta({
  title: 'Overlay/Tooltip',
  component: Tooltip,
});

export const Default = meta.story({
  render({ children, ...props }) {
    return (
      <Box style={{ height: 1000, width: 1000 }}>
        <Box style={{ marginTop: 240, marginLeft: 240 }}>
          <Tooltip {...props}>
            <Button variant="outline">Hover me</Button>
          </Tooltip>
        </Box>
      </Box>
    );
  },

  args: {
    children: <i>ignored prop</i>,
    content: 'Hi there',
  },
});
