import { FC, ReactNode } from 'react';

export type DialogProps = {
  children?: ReactNode;
  open: boolean;
  onRequestClose: () => void;
  className?: string;
};

export const Dialog: FC<DialogProps> = ({ children, open, className, onRequestClose }) => {
  return <div>!DIALOG!</div>;
};
