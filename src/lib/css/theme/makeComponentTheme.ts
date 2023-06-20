import { ComplexStyleRule } from '@vanilla-extract/css';

type Theme = {
  type: string;
  variants?: Record<string, string | boolean>;
};

type ComponentTheme<Options extends Theme> = {
  type: Options['type'];
  base?: ComplexStyleRule;
  variants?: {
    [VariantGroup in keyof Options['variants']]?: Options['variants'][VariantGroup] extends string
      ? {
          [Variant in Options['variants'][VariantGroup]]?: ComplexStyleRule;
        }
      : ComplexStyleRule;
  };
  compoundVariants?: Array<{
    style: ComplexStyleRule;
    variants: {
      [VariantGroup in keyof Options['variants']]?: Options['variants'][VariantGroup];
    };
  }>;
  defaultVariants?: {
    [VariantGroup in keyof Options['variants']]?: Options['variants'][VariantGroup] extends string
      ? Options['variants'][VariantGroup]
      : boolean;
  };
};

// Define button theme
type ButtonTheme = ComponentTheme<{
  type: 'button';
  variants: {
    variant: 'solid' | 'outline' | 'ghost' | 'link';
    size: 'small' | 'medium' | 'large';
  };
}>;

// Define link theme
type LinkTheme = ComponentTheme<{
  type: 'link';
  variants: {
    variant: 'inherit' | 'primary' | 'secondary';
    underline: boolean;
  };
}>;

// All themes
type Themes = ButtonTheme | LinkTheme;

// Example
export const y: LinkTheme = {
  type: 'link',
  base: {},
  variants: {
    variant: {
      inherit: {},
      primary: {},
      secondary: {},
    },
    underline: {
      textDecoration: 'underline',
    },
  },
  defaultVariants: {
    variant: 'inherit',
    underline: false,
  },
};

// export const x: ButtonTheme = {
//   type: 'button',
//   variants: {
//     variant: {
//       solid: {},
//       outline: {},
//     },
//     size: {
//       small: {},
//       medium: {},
//     },
//   },
//   compoundVariants: [
//     {
//       variants: {
//         variant: 'solid',
//         size: 'small',
//       },
//       style: {
//         color: 'asd',
//       },
//     },
//   ],
//   defaultVariants: {
//     variant: 'solid',
//     size: 'small',
//   },
// };

// type ButtonTheme = {
//   type: 'button';
//   base?: RecipeStyleRule;
//   variants?: {
//     variant: {
//       solid: RecipeStyleRule;
//       outline: RecipeStyleRule;
//       ghost: RecipeStyleRule;
//       link: RecipeStyleRule;
//     };
//     size: {
//       small: RecipeStyleRule;
//       medium: RecipeStyleRule;
//       large: RecipeStyleRule;
//     };
//   };
//   compoundVariants?: Array<{
//     variants: {
//       variant: 'solid';
//     };
//     style: RecipeStyleRule;
//   }>;
//   defaultVariants?: {
//     variant: 'solid';
//     size: 'medium';
//   };
// };

// export const makeComponentTheme = <Variants extends VariantGroups>(
//   options: PatternOptions<Variants>,
// ) => options;

export const makeComponentTheme = (options: Themes) => options;
