import type { VariantProps } from 'class-variance-authority';
import type { ElementType, HTMLAttributes } from 'react';
import type { ResponsiveValue } from '../../utils/responsive';
import type { boxVariants } from './Box.variants';

/** Spacing scale values */
type SpacingValue =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '14'
  | '16'
  | '20'
  | '24'
  | '28'
  | '32'
  | 'auto'
  | 'px';

export interface BoxProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof boxVariants> {
  /** Render as a different element using the Slot pattern. */
  asChild?: boolean;
  /** Render as a specific HTML element. */
  as?: ElementType;
  /**
   * Padding on all sides.
   * @example <Box p="4" /> or <Box p={{ base: '2', md: '4' }} />
   */
  p?: ResponsiveValue<SpacingValue>;
  /**
   * Horizontal padding (left and right).
   * @example <Box px="4" />
   */
  px?: ResponsiveValue<SpacingValue>;
  /**
   * Vertical padding (top and bottom).
   * @example <Box py="4" />
   */
  py?: ResponsiveValue<SpacingValue>;
  /**
   * Top padding.
   * @example <Box pt="4" />
   */
  pt?: ResponsiveValue<SpacingValue>;
  /**
   * Right padding.
   * @example <Box pr="4" />
   */
  pr?: ResponsiveValue<SpacingValue>;
  /**
   * Bottom padding.
   * @example <Box pb="4" />
   */
  pb?: ResponsiveValue<SpacingValue>;
  /**
   * Left padding.
   * @example <Box pl="4" />
   */
  pl?: ResponsiveValue<SpacingValue>;
  /**
   * Margin on all sides.
   * @example <Box m="4" /> or <Box m={{ base: '2', md: '4' }} />
   */
  m?: ResponsiveValue<SpacingValue>;
  /**
   * Horizontal margin (left and right).
   * @example <Box mx="auto" />
   */
  mx?: ResponsiveValue<SpacingValue>;
  /**
   * Vertical margin (top and bottom).
   * @example <Box my="4" />
   */
  my?: ResponsiveValue<SpacingValue>;
  /**
   * Top margin.
   * @example <Box mt="4" />
   */
  mt?: ResponsiveValue<SpacingValue>;
  /**
   * Right margin.
   * @example <Box mr="4" />
   */
  mr?: ResponsiveValue<SpacingValue>;
  /**
   * Bottom margin.
   * @example <Box mb="4" />
   */
  mb?: ResponsiveValue<SpacingValue>;
  /**
   * Left margin.
   * @example <Box ml="4" />
   */
  ml?: ResponsiveValue<SpacingValue>;
  /**
   * Width.
   * @example <Box w="full" />
   */
  w?: ResponsiveValue<SpacingValue | 'full' | 'screen' | 'fit' | 'min' | 'max'>;
  /**
   * Height.
   * @example <Box h="full" />
   */
  h?: ResponsiveValue<SpacingValue | 'full' | 'screen' | 'fit' | 'min' | 'max'>;
}
