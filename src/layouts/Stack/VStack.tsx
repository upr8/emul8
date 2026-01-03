import { forwardRef } from 'react';
import { Stack } from './Stack';
import type { VStackProps } from './VStack.types';

/**
 * VStack is a vertical Stack (direction="vertical").
 *
 * A semantic shortcut for vertical layouts with consistent spacing.
 * This is the same as Stack's default behavior but more explicit.
 *
 * @example
 * <VStack gap="md">
 *   <Card>First</Card>
 *   <Card>Second</Card>
 *   <Card>Third</Card>
 * </VStack>
 */
export const VStack = forwardRef<HTMLDivElement, VStackProps>((props, ref) => {
  return <Stack ref={ref} direction="vertical" {...props} />;
});

VStack.displayName = 'VStack';
