import type { Theme } from '@blockle/blocks-core';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { testingTheme } from '../../../testUtils/testTheme.css.js';
import { render, screen } from '../../../testUtils/testUtils.js';
import { BlocksProvider } from '../../providers/BlocksProvider/BlocksProvider.js';
import { Tooltip } from './Tooltip.js';

const intentTheme: Theme = {
  ...testingTheme,
  components: {
    ...testingTheme.components,
    tooltip: {
      root: 'tooltip-root',
      variants: {
        intent: { primary: 'tooltip-primary', secondary: 'tooltip-secondary' },
      },
      defaultVariants: { intent: 'primary' },
    },
  },
};

function renderTooltip(intent?: 'primary' | 'secondary') {
  return render(
    <BlocksProvider theme={intentTheme}>
      <Tooltip content="Tooltip content" intent={intent}>
        <button type="button">Trigger</button>
      </Tooltip>
    </BlocksProvider>,
  );
}

describe('Tooltip', () => {
  it('should render the secondary styling for intent="secondary"', async () => {
    renderTooltip('secondary');

    await userEvent.hover(screen.getByRole('button'));

    expect(await screen.findByRole('tooltip', { hidden: true })).toHaveClass(
      'tooltip-secondary',
    );
  });

  it('should render the primary styling by default', async () => {
    renderTooltip();

    await userEvent.hover(screen.getByRole('button'));

    expect(await screen.findByRole('tooltip', { hidden: true })).toHaveClass(
      'tooltip-primary',
    );
  });
});
