import { useComponentStyles } from '../../../hooks/useComponentStyles';
import { createAsChildTemplate } from '../../../lib/asChildRenderer/createAsChildTemplate';
import { MarginAtoms } from '../../../lib/css/atoms';
import { LinkTheme } from '../../../lib/theme/componentThemes';
import { classnames } from '../../../lib/utils/classnames';
import { HTMLElementProps } from '../../../lib/utils/utils';

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
  const linkClassName = useComponentStyles('link', {
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
