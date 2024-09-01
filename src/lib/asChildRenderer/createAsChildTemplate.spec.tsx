import { render } from '@testing-library/react';
import { createAsChildTemplate } from './createAsChildTemplate';

const { Template, Slot } = createAsChildTemplate('div');

type TestComponentProps = {
  asChild?: boolean;
  className?: string;
  children: React.ReactNode;
};

const TestComponent: React.FC<TestComponentProps> = ({ children, asChild, className }) => {
  return (
    <Template asChild={asChild} className={className}>
      <Slot>{children}</Slot>
    </Template>
  );
};

describe('asChildRenderer', () => {
  it('should render the default element', () => {
    const { getByText, container } = render(<TestComponent>Default</TestComponent>);
    const targetElement = container.firstElementChild as HTMLElement;

    expect(getByText('Default')).toBeInTheDocument();
    expect(targetElement.nodeName).toBe('DIV');
    expect(targetElement.textContent).toBe('Default');
  });

  it('should render the default element with className', () => {
    const { getByText, container } = render(
      <TestComponent className="test">Default</TestComponent>,
    );
    const targetElement = container.firstElementChild as HTMLElement;

    expect(getByText('Default')).toBeInTheDocument();
    expect(targetElement).toHaveClass('test');
  });

  it('should render the child element', () => {
    const { getByText, container } = render(
      <TestComponent asChild className="test">
        <a href="#">Link</a>
      </TestComponent>,
    );
    const targetElement = container.firstElementChild as HTMLElement;

    expect(getByText('Link')).toBeInTheDocument();
    // Check node type
    expect(targetElement.nodeName).toBe('A');
    expect(targetElement.textContent).toBe('Link');
    expect(targetElement).toHaveClass('test');
    expect(targetElement).toHaveAttribute('href', '#');
  });

  it('should render the child element with className', () => {
    const { getByText, container } = render(
      <TestComponent asChild className="test">
        <a href="#" className="link">
          Link
        </a>
      </TestComponent>,
    );
    const targetElement = container.firstElementChild as HTMLElement;

    expect(getByText('Link')).toBeInTheDocument();
    // Check node type
    expect(targetElement.nodeName).toBe('A');
    expect(targetElement).toHaveClass('test');
    expect(targetElement).toHaveClass('link');
  });
});