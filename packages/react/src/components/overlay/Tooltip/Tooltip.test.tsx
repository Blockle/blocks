import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import { Tooltip } from './Tooltip.js';

describe('Tooltip', () => {
  it('shows its content when the trigger is hovered', async () => {
    const user = userEvent.setup();

    render(
      <Tooltip content="Tooltip content">
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    await user.hover(screen.getByRole('button', { name: 'Trigger' }));

    expect(
      await screen.findByRole('tooltip', { hidden: true }),
    ).toHaveTextContent('Tooltip content');
  });

  it('no longer accepts the colorScheme prop', () => {
    render(
      // @ts-expect-error the tooltip always contrasts with the surface
      <Tooltip content="Tooltip content" colorScheme="secondary">
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument();
  });
});
