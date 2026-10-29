import { action } from 'storybook/actions';

import preview from '../../../../../../.storybook/preview.js';
import { Button } from '../../form/Button/Button.js';
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

export const Default = meta.story({
  render: (props) => {
    return <Alert {...props} />;
  },

  args: {
    children: 'This is an alert message.',
    intent: 'info',
    onRequestClose: action('onRequestClose'),
    closeLabel: 'Close',
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
    action: (
      <Button variant="outline" size="small" onClick={action('onRestore')}>
        Restore
      </Button>
    ),
  },
});
