import { ForwardRefComponent } from '@radix-ui/react-polymorphic';
import { forwardRef } from 'react';
import { useComponentStyles } from '../../hooks/useComponentStyles';
import { Atoms } from '../../lib/css/atoms';
import { LinkTheme } from '../../lib/theme/componentThemes';
import { classnames } from '../../lib/utils/classnames';
import { HTMLElementProps } from '../../lib/utils/utils';
import { Box } from '../Box';

const defaultElement = 'a';

export type LinkProps = {
  children?: React.ReactNode;
  underline?: LinkTheme['variants']['underline'];
  variant?: LinkTheme['variants']['variant'];
} & Atoms &
  HTMLElementProps<HTMLAnchorElement>;

type PolymorphicLink = ForwardRefComponent<'a', LinkProps>;

export const Link = forwardRef(function Link(
  { as, className, variant, underline, ...restProps },
  ref,
) {
  const Component = as || defaultElement;
  const linkClassName = useComponentStyles('link', {
    base: true,
    variants: { variant, underline },
  });

  return (
    <Box ref={ref} as={Component} className={classnames(className, linkClassName)} {...restProps} />
  );
}) as PolymorphicLink;
