import * as styles from './visually-hidden.css';

export type VisuallyHiddenProps = {
  children: React.ReactNode;
};

export const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({ children }) => {
  return <span className={styles.visuallyHidden}>{children}</span>;
};
