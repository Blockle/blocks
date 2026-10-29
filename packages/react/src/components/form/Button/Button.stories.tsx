import { action } from 'storybook/actions';

import preview from '../../../../../../.storybook/preview.js';
import { HeroIcon } from '../../display/Icon/exampleIconMask.js';
import { Box } from '../../layout/Box/Box.js';
import { Inline } from '../../layout/Inline/Inline.js';
import { Button } from './Button.js';

const meta = preview.meta({
  title: 'Form/Button',
  component: Button,
});

export const Primary = meta.story({
  args: {
    children: 'Button',
    onClick: action('button-clicked'),
  },
});

export const InheritColor = meta.story({
  render: () => (
    <Box color="success-700">
      <Inline gap={3} alignY="center">
        Saved
        <Button intent="inherit" variant="ghost" onClick={action('undo')}>
          Undo
        </Button>
        <Button intent="inherit" variant="outline" onClick={action('view')}>
          View
        </Button>
      </Inline>
    </Box>
  ),
});

export const LinkButton = meta.story({
  args: {
    children: (
      <a href="https://google.com" target="_blank" rel="noreferrer">
        Link text
      </a>
    ),
    asChild: true,
    onClick: action('link-clicked'),
  },
});

export const Icons = meta.story({
  args: {
    children: 'Button with icons',
    startSlot: <HeroIcon name="academic-cap" size="small" />,
    endSlot: <HeroIcon name="arrow-right" size="small" />,
  },
});
