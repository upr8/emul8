import { Slot } from '@radix-ui/react-slot';

export { Slot };

/**
 * Re-export Slot from Radix UI for component composition.
 *
 * The Slot component merges its props onto its immediate child.
 * This is useful for components that need to be composable with `asChild` prop.
 *
 * @example
 * ```tsx
 * // Button with asChild prop
 * <Button asChild>
 *   <a href="/link">Link styled as button</a>
 * </Button>
 * ```
 */
