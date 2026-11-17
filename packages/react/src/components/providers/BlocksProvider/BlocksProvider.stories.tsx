import { momotaro } from '@blockle/blocks-theme-momotaro';

import preview from '../../../../../../.storybook/preview.js';
import { ToastProvider } from '../../feedback/Toast/ToastProvider.js';
import { useToast } from '../../feedback/Toast/useToast.js';
import { Button } from '../../form/Button/Button.js';
import { Checkbox } from '../../form/Checkbox/Checkbox.js';
import { NumericInput } from '../../form/NumericInput/NumericInput.js';
import { Select } from '../../form/Select/Select.js';
import { Stack } from '../../layout/Stack/Stack.js';
import { type BlocksIcons, BlocksProvider } from './BlocksProvider.js';

// Stands in for an app's own icon library: square caps, a heavier stroke, and
// a hardcoded 24px size that the components override
const AppIcon: React.FC<{ d: string }> = ({ d }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="square"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

const appIcons: BlocksIcons = {
  check: <AppIcon d="M4 12l5 5L20 6" />,
  chevronDown: <AppIcon d="M5 9l7 7 7-7" />,
  minus: <AppIcon d="M4 12h16" />,
  plus: <AppIcon d="M12 4v16M4 12h16" />,
  close: <AppIcon d="M5 5l14 14M19 5L5 19" />,
};

const ToastButton: React.FC = () => {
  const { showToast } = useToast();

  return (
    <Button
      onClick={() => {
        showToast({ children: 'Saved' });
      }}
    >
      Show Toast
    </Button>
  );
};

const Components: React.FC = () => (
  <ToastProvider>
    <Stack gap={4} alignX="start">
      <Checkbox defaultChecked>Checked</Checkbox>
      <Select aria-label="Fruit">
        <option>Apple</option>
        <option>Pear</option>
      </Select>
      <NumericInput label="Amount" defaultValue={1} />
      <ToastButton />
    </Stack>
  </ToastProvider>
);

const meta = preview.meta({
  title: 'Providers/BlocksProvider',
  component: BlocksProvider,
  parameters: {
    docs: {
      description: {
        component:
          "Pass your own icons to `icons` to replace the ones Blocks draws itself: Checkbox's `check`, Select's `chevronDown`, NumericInput's `minus` and `plus`, and each Toast's `close`. Pass rendered elements, so a Server Component layout can pass them too. Each component sizes and colors the icon; keys you leave out keep Blocks' icons.",
      },
    },
  },
});

export const CustomIcons = meta.story({
  render: () => (
    <BlocksProvider theme={momotaro} icons={appIcons}>
      <Components />
    </BlocksProvider>
  ),
});

export const DefaultIcons = meta.story({
  render: () => <Components />,
});
