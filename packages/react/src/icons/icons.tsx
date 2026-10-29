// Blocks' own icons, used inside its components. Private: not exported from the
// package, since consumers bring their own icons (ADR 0005). Each icon is
// decorative; the accessible name belongs on the control that holds it.

type IconProps = Pick<React.SVGProps<SVGSVGElement>, 'className' | 'style'>;

type StrokeIconProps = {
  path: string;
  strokeWidth?: number;
} & IconProps;

const StrokeIcon: React.FC<StrokeIconProps> = ({
  path,
  strokeWidth = 2,
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d={path} />
  </svg>
);

// Icon from https://heroicons.com/
export const CheckIcon: React.FC<IconProps> = (props) => (
  <StrokeIcon path="m4.5 12.75 6 6 9-13.5" strokeWidth={1.5} {...props} />
);

export const ChevronDownIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="m11.625 14.3666 7.9365-7.653c.5241-.5055 1.3133-.4372 1.7625.1525.4493.5897.3886 1.4774-.1355 1.9829l-8.75 8.4375c-.4681.4513-1.1589.4513-1.627 0l-8.75-8.4375c-.5241-.5055-.5848-1.3932-.1356-1.9829.4493-.5897 1.2385-.658 1.7626-.1525l7.9365 7.653Z"
      clipRule="evenodd"
    />
  </svg>
);

export const MinusIcon: React.FC<IconProps> = (props) => (
  <StrokeIcon path="M5 12h14" {...props} />
);

export const PlusIcon: React.FC<IconProps> = (props) => (
  <StrokeIcon path="M12 5v14M5 12h14" {...props} />
);

export const CloseIcon: React.FC<IconProps> = (props) => (
  <StrokeIcon path="M18 6 6 18M6 6l12 12" {...props} />
);
