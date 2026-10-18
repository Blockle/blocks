import type React from 'react';
import { Children } from 'react';

export type BreadcrumbProps = {
  ref?: React.Ref<HTMLElement>;
  divider?: React.ReactNode;
  children?: React.ReactNode;
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  ref,
  children,
  divider = '/',
}) => {
  const links = Children.toArray(children);

  return (
    <nav ref={ref} aria-label="Breadcrumb">
      <ol>
        {links.map((link, index) => (
          <li key={index}>
            {link}
            {index < links.length - 1 && <span>{divider}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};
