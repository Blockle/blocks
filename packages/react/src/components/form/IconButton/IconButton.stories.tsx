import { action } from 'storybook/actions';

import preview from '../../../../../../.storybook/preview.js';
import { HeroIcon } from '../../display/Icon/exampleIconMask.js';
import { Box } from '../../layout/Box/Box.js';
import { Inline } from '../../layout/Inline/Inline.js';
import { Tooltip } from '../../overlay/Tooltip/Tooltip.js';
import { Button } from '../Button/Button.js';
import { IconButton } from './IconButton.js';

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
  </svg>
);

const meta = preview.meta({
  title: 'Form/IconButton',
  component: IconButton,
  args: {
    label: 'Close',
    children: <CloseIcon />,
    onClick: action('icon-button-clicked'),
  },
});

export const Default = meta.story({});

export const Variants = meta.story({
  // Left out because a solid button can't take intent="inherit"
  render: ({ intent: _intent, ...props }) => (
    <Inline gap={3}>
      <IconButton {...props} variant="solid" />
      <IconButton {...props} variant="outline" />
      <IconButton {...props} variant="ghost" />
    </Inline>
  ),
});

export const Intents = meta.story({
  render: (props) => (
    <Inline gap={3}>
      <IconButton {...props} intent="primary" />
      <IconButton {...props} intent="secondary" />
      <IconButton {...props} intent="neutral" />
      <IconButton {...props} intent="success" />
      <IconButton {...props} intent="danger" />
    </Inline>
  ),
});

export const InheritColor = meta.story({
  render: ({ intent: _intent, variant: _variant, ...props }) => (
    <Box color="success-700">
      <Inline gap={3} alignY="center">
        Saved
        <IconButton {...props} intent="inherit" variant="ghost" />
        <IconButton {...props} intent="inherit" variant="outline" />
      </Inline>
    </Box>
  ),
});

export const Sizes = meta.story({
  render: (props) => (
    <Inline gap={3} alignY="center">
      <IconButton {...props} size="small" />
      <IconButton {...props} size="medium" />
      <IconButton {...props} size="large" />
    </Inline>
  ),
});

export const Shapes = meta.story({
  render: (props) => (
    <Inline gap={3}>
      <IconButton {...props} shape="square" />
      <IconButton {...props} shape="circle" />
    </Inline>
  ),
});

export const Loading = meta.story({
  args: {
    loading: true,
  },
});

export const WithIconMask = meta.story({
  args: {
    label: 'Next',
    children: <HeroIcon name="arrow-right" size="small" />,
  },
});

export const NextToButton = meta.story({
  render: (props) => (
    <Inline gap={2}>
      <Button>Save</Button>
      <IconButton {...props} variant="outline" />
    </Inline>
  ),
});

export const WithTooltip = meta.story({
  render: (props) => (
    <Tooltip content={props.label}>
      <IconButton {...props} />
    </Tooltip>
  ),
});
