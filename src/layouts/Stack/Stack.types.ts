import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes, ReactNode } from 'react';
import type { GapSize, ResponsiveValue } from '../../utils/responsive';
import type { stackVariants } from './Stack.variants';

export interface StackProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof stackVariants>, 'gap'> {
  /**
   * Gap between stack items.
   * Supports responsive values using object syntax.
   *
   * @example
   * // Static gap
   * <Stack gap="md" />
   *
   * @example
   * // Responsive gap
   * <Stack gap={{ base: 'sm', md: 'md', lg: 'lg' }} />
   */
  gap?: VariantProps<typeof stackVariants>['gap'] | ResponsiveValue<GapSize>;
  /**
   * Split the stack after this child index (0-based).
   * Children after this index will be pushed to the opposite end using auto margin.
   */
  splitAfter?: number;
  /**
   * Element to render between each child.
   * Useful for adding visual separators between stack items.
   *
   * @example
   * <Stack divider={<hr className="border-gray-200" />}>
   *   <Item />
   *   <Item />
   * </Stack>
   *
   * @example
   * <Stack direction="horizontal" divider={<span className="w-px h-4 bg-gray-300" />}>
   *   <Link>Home</Link>
   *   <Link>About</Link>
   * </Stack>
   */
  divider?: ReactNode;
}
