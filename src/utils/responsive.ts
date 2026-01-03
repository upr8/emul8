/**
 * Responsive props utility for parsing Cedar-style @breakpoint notation.
 *
 * @example
 * ```tsx
 * <Grid gap="sm md@md lg@lg" />
 * <Stack gap="xs sm@md" />
 * <Container padding="sm md@lg" />
 * ```
 */

export const BREAKPOINTS = ['sm', 'md', 'lg', 'xl'] as const;
export type Breakpoint = (typeof BREAKPOINTS)[number];

/**
 * Parsed responsive value with base and breakpoint-specific values.
 */
export type ParsedResponsive = {
  base?: string;
} & Partial<Record<Breakpoint, string>>;

/**
 * A responsive value that can be a simple value or include @breakpoint notation.
 *
 * @example
 * - "sm" - single value for all breakpoints
 * - "sm md@md" - sm as base, md at md breakpoint
 * - "xs sm@sm md@md lg@lg" - different values at each breakpoint
 */
export type ResponsiveValue = string;

/**
 * Parses a responsive value string into an object with base and breakpoint values.
 *
 * @param value - The responsive value string (e.g., "sm md@md lg@lg")
 * @returns Parsed object with base and breakpoint-specific values
 *
 * @example
 * parseResponsive("sm md@md lg@lg")
 * // Returns: { base: "sm", md: "md", lg: "lg" }
 *
 * parseResponsive("md")
 * // Returns: { base: "md" }
 */
export function parseResponsive(value: string | undefined): ParsedResponsive {
  if (!value) return {};

  const parts = value.trim().split(/\s+/);
  const result: ParsedResponsive = {};

  for (const part of parts) {
    if (part.includes('@')) {
      const [val, bp] = part.split('@') as [string, Breakpoint];
      if (BREAKPOINTS.includes(bp)) {
        result[bp] = val;
      }
    } else {
      result.base = part;
    }
  }

  return result;
}

/**
 * Generates Tailwind CSS classes from parsed responsive values.
 *
 * @param parsed - The parsed responsive object
 * @param variantMap - Map of value names to Tailwind classes
 * @returns Space-separated Tailwind class string with breakpoint prefixes
 *
 * @example
 * const gapMap = { sm: 'gap-2', md: 'gap-4', lg: 'gap-6' };
 * responsiveClasses({ base: 'sm', md: 'md', lg: 'lg' }, gapMap)
 * // Returns: "gap-2 md:gap-4 lg:gap-6"
 */
export function responsiveClasses(
  parsed: ParsedResponsive,
  variantMap: Record<string, string>
): string {
  const classes: string[] = [];

  // Base class (no prefix)
  if (parsed.base && variantMap[parsed.base]) {
    classes.push(variantMap[parsed.base]);
  }

  // Breakpoint-specific classes
  for (const bp of BREAKPOINTS) {
    const value = parsed[bp];
    if (value && variantMap[value]) {
      classes.push(`${bp}:${variantMap[value]}`);
    }
  }

  return classes.join(' ');
}

/**
 * Common gap variant map for layout components.
 */
export const GAP_VARIANTS: Record<string, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-10',
  '3xl': 'gap-12',
};

/**
 * Common padding variant map for container components.
 */
export const PADDING_VARIANTS: Record<string, string> = {
  none: 'px-0',
  xs: 'px-2',
  sm: 'px-4',
  md: 'px-6',
  lg: 'px-8',
  xl: 'px-12',
};

/**
 * Helper to generate responsive gap classes.
 *
 * @param gap - Responsive gap value (e.g., "sm md@md lg@lg")
 * @returns Tailwind gap classes with breakpoint prefixes
 */
export function responsiveGap(gap: ResponsiveValue | undefined): string {
  if (!gap) return '';
  const parsed = parseResponsive(gap);
  return responsiveClasses(parsed, GAP_VARIANTS);
}

/**
 * Helper to generate responsive padding classes.
 *
 * @param padding - Responsive padding value (e.g., "sm md@md lg@lg")
 * @returns Tailwind padding classes with breakpoint prefixes
 */
export function responsivePadding(padding: ResponsiveValue | undefined): string {
  if (!padding) return '';
  const parsed = parseResponsive(padding);
  return responsiveClasses(parsed, PADDING_VARIANTS);
}
