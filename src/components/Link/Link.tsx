import { ForwardRefComponent } from '@radix-ui/react-polymorphic';
import { ReactNode, forwardRef } from 'react';
import { useComponentStyles } from '../../hooks/useComponentStyles';
import { Atoms } from '../../lib/css/atoms';
import { classnames } from '../../lib/utils/classnames';
import { HTMLElementProps } from '../../lib/utils/utils';
import { Box } from '../Box';
import { LinkTheme } from '../../lib/theme/themeComponents';

const defaultElement = 'a';

export type LinkProps = {
  children?: ReactNode;
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
