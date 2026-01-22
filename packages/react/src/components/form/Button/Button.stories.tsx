import { action } from 'storybook/actions';

import preview from '../../../../../../.storybook/preview.js';
import { HeroIcon } from '../../display/Icon/exampleIconMask.js';
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
