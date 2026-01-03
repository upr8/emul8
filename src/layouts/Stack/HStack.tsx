import { forwardRef } from 'react';
import type { HStackProps } from './HStack.types';
import { Stack } from './Stack';

/**
 * HStack is a horizontal Stack (direction="horizontal").
 *
 * A semantic shortcut for horizontal layouts with consistent spacing.
 *
 * @example
 * <HStack gap="md">
 *   <Button>Left</Button>
 *   <Button>Right</Button>
 * </HStack>
 */
export const HStack = forwardRef<HTMLDivElement, HStackProps>((props, ref) => {
  return <Stack ref={ref} direction="horizontal" {...props} />;
});

HStack.displayName = 'HStack';
