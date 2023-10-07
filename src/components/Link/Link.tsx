import { ForwardRefComponent } from '@radix-ui/react-polymorphic';
import { ReactNode, forwardRef } from 'react';
import { useComponentStyles } from '../../hooks/useComponentStyles/useComponentStyles';
import { Atoms } from '../../lib/css/atoms';
import { LinkTheme } from '../../lib/css/theme/componentThemes';
import { classnames } from '../../lib/utils/classnames';
import { HTMLElementProps } from '../../lib/utils/utils';
import { Box } from '../Box';

const defaultElement = 'a';

export type LinkProps = {
  variant: LinkTheme['variants']['variant'];
  underline?: LinkTheme['variants']['underline'];
  children?: ReactNode;
  className?: string;
} & Atoms &
  HTMLElementProps<HTMLAnchorElement>;

type PolymorphicLink = ForwardRefComponent<'a', LinkProps>;

export const Link = forwardRef(function Link(
  { as, className, variant, underline, ...restProps },
  ref,
) {
  const Component = as || defaultElement;
  const linkClassName = useComponentStyles('link', { base: true, variant, underline });

  return (
    <Box ref={ref} as={Component} className={classnames(className, linkClassName)} {...restProps} />
  );
}) as PolymorphicLink;
