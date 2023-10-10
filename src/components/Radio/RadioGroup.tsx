import { FC } from 'react';
import { Stack } from '../Stack';
import { Atoms } from '../../lib/css/atoms';

export type RadioGroupProps = {
  'aria-labelledby'?: string;
  children: React.ReactNode;
  gap?: Atoms['gap'];
};

export const RadioGroup: FC<RadioGroupProps> = ({ children, gap = 'medium', ...restProps }) => {
  return (
    <Stack as="div" role="radiogroup" gap={gap} {...restProps}>
      {children}
    </Stack>
  );
};
