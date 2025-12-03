import { IconMask, type IconMaskProps } from './IconMask.js';

type CreateIconMaskProps<TName extends string> = Omit<IconMaskProps, 'src'> & {
  name: TName;
};

export const createIconMask = <TName extends string>(
  getIconUrl: (name: TName) => string,
) => {
  const CustomIconMask = ({ name, ...props }: CreateIconMaskProps<TName>) => {
    return <IconMask {...props} src={getIconUrl(name)} />;
  };

  return CustomIconMask;
};
