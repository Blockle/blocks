import { describe, expect, it } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import { Select } from './Select.js';

describe('Select', () => {
  it('takes a theme size, not the native numeric size', () => {
    render(
      <>
        <Select aria-label="Small" size="small">
          <option value="apple">Apple</option>
        </Select>
        {/* @ts-expect-error size is the theme size, not the visible row count */}
        <Select aria-label="Rows" size={4}>
          <option value="apple">Apple</option>
        </Select>
      </>,
    );

    expect(screen.getByLabelText('Small')).not.toHaveAttribute('size');
  });
});
