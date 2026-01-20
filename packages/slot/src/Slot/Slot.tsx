type SlotProps = {
  children?: React.ReactNode;
};

/**
 * Indicates a placeholder for slottable content.
 * The `children` prop is optional; when omitted, `Slot` renders nothing (`null`).
 */
export const Slot: React.FC<SlotProps> = ({ children }) => {
  return children;
};
