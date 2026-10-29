import { describe, expect, it } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import { Tag } from './Tag.js';

describe('Tag', () => {
  it('renders a span', () => {
    render(<Tag>bug</Tag>);

    expect(screen.getByText('bug').tagName).toBe('SPAN');
  });

  it('renders the child element instead with asChild', () => {
    render(
      <Tag asChild className="custom">
        <a href="/labels/bug">bug</a>
      </Tag>,
    );

    const link = screen.getByRole('link', { name: 'bug' });

    expect(link).toHaveClass('custom');
    expect(link.parentElement?.tagName).not.toBe('SPAN');
  });

  it('passes HTML attributes and ref to the span', () => {
    const ref = { current: null as HTMLSpanElement | null };

    render(
      <Tag ref={ref} title="Category" data-testid="tag">
        bug
      </Tag>,
    );

    expect(screen.getByTestId('tag')).toHaveAttribute('title', 'Category');
    expect(ref.current).toBe(screen.getByTestId('tag'));
  });

  it('renders the startSlot before and the endSlot after the text', () => {
    render(
      <Tag
        data-testid="tag"
        startSlot={<span>Icon</span>}
        endSlot={
          <button type="button" aria-label="Remove label bug">
            x
          </button>
        }
      >
        bug
      </Tag>,
    );

    expect(screen.getByTestId('tag')).toHaveTextContent(/^Icon\s*bug\s*x$/);
    expect(
      screen.getByRole('button', { name: 'Remove label bug' }),
    ).toBeInTheDocument();
  });

  it('renders nothing for empty Slots', () => {
    render(
      <Tag data-testid="tag" startSlot={null} endSlot={false}>
        bug
      </Tag>,
    );

    expect(screen.getByTestId('tag').childElementCount).toBe(0);
  });

  it('keeps the Slots inside the child element with asChild', () => {
    render(
      <Tag asChild startSlot={<span>Icon</span>}>
        <a href="/labels/bug">bug</a>
      </Tag>,
    );

    expect(screen.getByRole('link')).toHaveTextContent(/^Icon\s*bug$/);
  });
});
