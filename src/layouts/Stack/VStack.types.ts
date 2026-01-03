import type { StackProps } from './Stack.types';

/**
 * VStack props - same as Stack but without direction (always vertical).
 */
export interface VStackProps extends Omit<StackProps, 'direction'> {}
