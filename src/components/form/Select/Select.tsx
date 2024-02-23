import { forwardRef } from 'react';
import { useComponentStyles } from '../../../hooks/useComponentStyles';
import { SelectTheme } from '../../../lib/theme/componentThemes';
import { classnames } from '../../../lib/utils/classnames';
import { HTMLElementProps } from '../../../lib/utils/utils';
import { Box } from '../../layout/Box';
import * as styles from './select.css';

export type SelectProps = {
  children: React.ReactNode;
  placeholder?: string;
  variant?: SelectTheme['variants'];
} & HTMLElementProps<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { children, placeholder, className, ...restProps },
  ref,
) {
  const wrapperClassName = useComponentStyles('select', { wrapper: true }, false);
  const selectClassName = useComponentStyles('select', { select: true });
  const iconClassName = useComponentStyles('select', { icon: true }, false);

  return (
    <Box className={classnames(styles.wrapper, wrapperClassName)}>
      <select
        ref={ref}
        className={classnames(styles.select, selectClassName, className)}
        {...restProps}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>
      <Box className={classnames(styles.icon, iconClassName)} role="presentation" aria-hidden>
        ICON
      </Box>
    </Box>
  );
});
