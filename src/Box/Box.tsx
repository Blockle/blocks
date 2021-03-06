import { AllHTMLAttributes, createElement, ElementType, forwardRef, ReactNode } from 'react';
import { cx } from '../cx';
import { StyleProps, useStyles } from '../useStyles';

interface Props
  extends StyleProps,
    Omit<AllHTMLAttributes<HTMLElement>, 'color' | 'width' | 'height'> {
  className?: string;
  children?: ReactNode;
  component?: ElementType;
  htmlFor?: string;
}

const Box = forwardRef<HTMLElement, Props>(
  (
    {
      alignItems,
      backgroundColor,
      children,
      className,
      color,
      component = 'div',
      display,
      flexDirection,
      flexGrow,
      flexShrink,
      flexWrap,
      fontSize,
      fontStyle,
      fontWeight,
      height,
      justifyContent,
      negativeMarginLeft,
      negativeMarginTop,
      overflow,
      overflowX,
      overflowY,
      padding,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingX,
      paddingY,
      position,
      textAlign,
      width,
      ...restProps
    },
    ref,
  ) => {
    const boxStyles = useStyles({
      alignItems,
      backgroundColor,
      color,
      display,
      flexDirection,
      flexGrow,
      flexShrink,
      flexWrap,
      fontSize,
      fontStyle,
      fontWeight,
      height,
      justifyContent,
      negativeMarginLeft,
      negativeMarginTop,
      overflow,
      overflowX,
      overflowY,
      padding,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingX,
      paddingY,
      position,
      textAlign,
      width,
    });

    return createElement(
      component,
      {
        ref,
        className: cx(className, boxStyles),
        ...restProps,
      },
      children,
    );
  },
);

Box.displayName = 'Box';

export default Box;
