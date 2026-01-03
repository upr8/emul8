import type { StackProps } from './Stack.types';

/**
 * HStack props - same as Stack but without direction (always horizontal).
 */
export interface HStackProps extends Omit<StackProps, 'direction'> {}
