import { action } from 'storybook/actions';

import preview from '../../../../../../.storybook/preview.js';
import { Button } from '../../form/Button/Button.js';
import { IconButton } from '../../form/IconButton/IconButton.js';
import { Alert } from './Alert.js';

const meta = preview.meta({
  title: 'Feedback/Alert',
  component: Alert,
  argTypes: {
    intent: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
    },
  },
});

const InfoIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </svg>
);

const CloseIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const Default = meta.story({
  render: (props) => {
    return <Alert {...props} />;
  },

  args: {
    children: 'This is an alert message.',
    intent: 'info',
  },
});

export const StartSlot = meta.story({
  render: (props) => {
    return <Alert {...props} />;
  },

  args: {
    children: 'Your changes are saved automatically.',
    intent: 'info',
    role: 'status',
    startSlot: <InfoIcon />,
  },
});

export const LastingNotice = meta.story({
  render: (props) => {
    return <Alert {...props} />;
  },

  args: {
    children: 'This Ticket is archived.',
    intent: 'info',
    role: 'status',
    endSlot: (
      <Button variant="outline" size="small" onClick={action('onRestore')}>
        Restore
      </Button>
    ),
  },
});

export const Dismissable = meta.story({
  render: (props) => {
    return <Alert {...props} />;
  },

  args: {
    children: 'This is an alert message.',
    intent: 'info',
    endSlot: (
      <IconButton
        label="Close"
        variant="ghost"
        size="small"
        intent="inherit"
        onClick={action('onClose')}
      >
        <CloseIcon />
      </IconButton>
    ),
  },
});
