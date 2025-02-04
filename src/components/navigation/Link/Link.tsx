import { createAsChildTemplate } from '../../../lib/asChildRenderer/createAsChildTemplate';
import type { MarginAtoms } from '../../../lib/css/atoms';
import type { LinkTheme } from '../../../lib/theme/componentThemes';
import { getComponentStyles } from '../../../lib/theme/store/theme';
import { classnames } from '../../../lib/utils/classnames';
import type { HTMLElementProps } from '../../../lib/utils/utils';

export type LinkProps = {
  asChild?: boolean;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLAnchorElement>;
  underline?: LinkTheme['variants']['underline'];
  variant?: LinkTheme['variants']['variant'];
} & MarginAtoms &
  HTMLElementProps<HTMLAnchorElement>;

const { Template, Slot } = createAsChildTemplate('a');

export const Link: React.FC<LinkProps> = ({
  asChild,
  children,
  className,
  ref,
  underline,
  variant,
  ...restProps
}) => {
  const linkClassName = getComponentStyles('link', {
    base: true,
    variants: { variant, underline },
  });

  return (
    <Template
      asChild={asChild}
      ref={ref}
      className={classnames(className, linkClassName)}
      {...restProps}
    >
      <Slot>{children}</Slot>
    </Template>
  );
};
