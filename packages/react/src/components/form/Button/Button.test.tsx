import { composeStories } from '@storybook/react';
import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import * as stories from './Button.stories.js';

const { Primary: Button } = composeStories(stories);

describe('Button', () => {
  it('should render', () => {
    render(<Button />);

    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  it('should render with spinner when set to loading', () => {
    render(<Button loading />);

    expect(screen.getByText('Button')).toBeInTheDocument();
    expect(screen.getByTestId('blocks-spinner')).toBeInTheDocument();
  });

  it('should render startSlot content', () => {
    render(<Button startSlot={<span>Start slot content</span>} />);

    expect(screen.getByText('Start slot content')).toBeInTheDocument();
  });

  it('should render endSlot content', () => {
    render(<Button endSlot={<span>End slot content</span>} />);

    expect(screen.getByText('End slot content')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is set', () => {
    render(<Button disabled />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should have the correct type attribute', () => {
    render(<Button type="submit" />);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('should apply custom className', () => {
    render(<Button className="custom-class" />);

    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('should render asChild correctly', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>,
    );

    const linkElement = screen.getByText('Link Button');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/test');
  });

  it('should log a warning when a type is provided while using asChild', () => {
    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    render(
      <Button asChild type="submit">
        <a href="/test">Link Button</a>
      </Button>,
    );

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Button: The `type` prop is ignored when using `asChild`. Please set the `type` prop on the child component instead.',
    );

    consoleWarnSpy.mockRestore();
  });
});
