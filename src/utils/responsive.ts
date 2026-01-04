/**
 * Responsive props utility for parsing responsive values.
 *
 * Uses object syntax for type-safe responsive values:
 * { base: 'sm', md: 'md', lg: 'lg' }
 *
 * @example
 * ```tsx
 * <Grid gap={{ base: 'sm', md: 'md', lg: 'lg' }} />
 * <Stack gap={{ base: 'xs', md: 'sm' }} />
 * <Box p={{ base: '2', md: '4', lg: '6' }} />
 * ```
 */

export const BREAKPOINTS = ['sm', 'md', 'lg', 'xl'] as const;
export type Breakpoint = (typeof BREAKPOINTS)[number];

/**
 * Standard gap size values for layout components.
 */
export type GapSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

/**
 * Parsed responsive value with base and breakpoint-specific values.
 */
export type ParsedResponsive = {
  base?: string;
} & Partial<Record<Breakpoint, string>>;

/**
 * Object syntax for responsive values.
 * @example { base: 'sm', md: 'md', lg: 'lg' }
 */
export type ResponsiveObject<T extends string = string> = {
  base?: T;
} & Partial<Record<Breakpoint, T>>;

/**
 * A responsive value that can be:
 * - A simple value: "md"
 * - Object syntax: { base: 'sm', md: 'md', lg: 'lg' }
 */
export type ResponsiveValue<T extends string = string> = T | ResponsiveObject<T>;

/**
 * Checks if a value is a responsive object (not a string or array).
 */
export function isResponsiveObject<T extends string>(
  value: ResponsiveValue<T> | null | undefined
): value is ResponsiveObject<T> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Parses a responsive value (string or object) into a normalized object.
 *
 * @param value - The responsive value (string or object)
 * @returns Parsed object with base and breakpoint-specific values
 *
 * @example
 * parseResponsive({ base: 'sm', md: 'md', lg: 'lg' })
 * // Returns: { base: "sm", md: "md", lg: "lg" }
 *
 * parseResponsive("md")
 * // Returns: { base: "md" }
 */
export function parseResponsive<T extends string>(
  value: ResponsiveValue<T> | undefined
): ParsedResponsive {
  if (!value) return {};

  // Object syntax - return as-is
  if (isResponsiveObject(value)) {
    return value as ParsedResponsive;
  }

  // Simple string value - treat as base
  return { base: value };
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
      // Handle multiple classes in a variant value (e.g., "ps-4 pe-4")
      // by prefixing each class with the breakpoint
      const prefixedClasses = variantMap[value]
        .split(' ')
        .map((cls) => `${bp}:${cls}`)
        .join(' ');
      classes.push(prefixedClasses);
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
 * Gap variants for CVA-based layout components.
 * Use this in cva() variant definitions for consistency.
 */
export const GAP_VARIANTS_CVA = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
  '3xl': 'gap-16',
} as const;

/**
 * Common padding variant map for container components.
 * Uses RTL-safe logical properties (ps/pe) instead of physical (px).
 */
export const PADDING_VARIANTS: Record<string, string> = {
  none: 'ps-0 pe-0',
  xs: 'ps-2 pe-2',
  sm: 'ps-4 pe-4',
  md: 'ps-6 pe-6',
  lg: 'ps-8 pe-8',
  xl: 'ps-12 pe-12',
};

/**
 * Helper to generate responsive gap classes.
 *
 * @param gap - Responsive gap value (string or object)
 * @returns Tailwind gap classes with breakpoint prefixes
 *
 * @example
 * responsiveGap({ base: 'sm', md: 'md', lg: 'lg' })
 * // Returns: "gap-2 md:gap-4 lg:gap-6"
 */
export function responsiveGap(gap: ResponsiveValue | null | undefined): string {
  if (!gap) return '';
  const parsed = parseResponsive(gap);
  return responsiveClasses(parsed, GAP_VARIANTS);
}

/**
 * Helper to generate responsive padding classes.
 *
 * @param padding - Responsive padding value (string or object)
 * @returns Tailwind padding classes with breakpoint prefixes
 *
 * @example
 * responsivePadding({ base: 'sm', md: 'md', lg: 'lg' })
 * // Returns: "px-4 md:px-6 lg:px-8"
 */
export function responsivePadding(padding: ResponsiveValue | null | undefined): string {
  if (!padding) return '';
  const parsed = parseResponsive(padding);
  return responsiveClasses(parsed, PADDING_VARIANTS);
}

/**
 * Column gap variant map for separate axis gap control.
 */
export const GAP_X_VARIANTS: Record<string, string> = {
  none: 'gap-x-0',
  xs: 'gap-x-1',
  sm: 'gap-x-2',
  md: 'gap-x-4',
  lg: 'gap-x-6',
  xl: 'gap-x-8',
  '2xl': 'gap-x-10',
  '3xl': 'gap-x-12',
};

/**
 * Row gap variant map for separate axis gap control.
 */
export const GAP_Y_VARIANTS: Record<string, string> = {
  none: 'gap-y-0',
  xs: 'gap-y-1',
  sm: 'gap-y-2',
  md: 'gap-y-4',
  lg: 'gap-y-6',
  xl: 'gap-y-8',
  '2xl': 'gap-y-10',
  '3xl': 'gap-y-12',
};

/**
 * Helper to generate responsive column gap classes.
 */
export function responsiveGapX(gapX: ResponsiveValue | null | undefined): string {
  if (!gapX) return '';
  const parsed = parseResponsive(gapX);
  return responsiveClasses(parsed, GAP_X_VARIANTS);
}

/**
 * Helper to generate responsive row gap classes.
 */
export function responsiveGapY(gapY: ResponsiveValue | null | undefined): string {
  if (!gapY) return '';
  const parsed = parseResponsive(gapY);
  return responsiveClasses(parsed, GAP_Y_VARIANTS);
}

/**
 * Grid columns variant map for SimpleGrid.
 */
export const GRID_COLUMNS_VARIANTS: Record<string, string> = {
  '1': 'grid-cols-1',
  '2': 'grid-cols-2',
  '3': 'grid-cols-3',
  '4': 'grid-cols-4',
  '5': 'grid-cols-5',
  '6': 'grid-cols-6',
  '7': 'grid-cols-7',
  '8': 'grid-cols-8',
  '9': 'grid-cols-9',
  '10': 'grid-cols-10',
  '11': 'grid-cols-11',
  '12': 'grid-cols-12',
};

/**
 * Helper to generate responsive grid columns classes.
 */
export function responsiveGridColumns(columns: ResponsiveValue | null | undefined): string {
  if (!columns) return '';
  const parsed = parseResponsive(columns);
  return responsiveClasses(parsed, GRID_COLUMNS_VARIANTS);
}

/**
 * Spacing variant maps for Box layout props.
 */
export const SPACING_VARIANTS: Record<string, string> = {
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '10': '10',
  '11': '11',
  '12': '12',
  '14': '14',
  '16': '16',
  '20': '20',
  '24': '24',
  '28': '28',
  '32': '32',
  auto: 'auto',
  px: 'px',
};

/**
 * Creates a responsive spacing class generator.
 * Pre-computes the variant map at creation time for performance.
 */
function createSpacingHelper(prefix: string) {
  // Pre-compute variant map at module initialization
  const variantMap: Record<string, string> = {};
  for (const [key, val] of Object.entries(SPACING_VARIANTS)) {
    variantMap[key] = `${prefix}-${val}`;
  }

  return (value: ResponsiveValue | null | undefined): string => {
    if (value === undefined || value === null) return '';
    return responsiveClasses(parseResponsive(value), variantMap);
  };
}

// Padding helpers
export const responsiveP = createSpacingHelper('p');
export const responsivePx = createSpacingHelper('px');
export const responsivePy = createSpacingHelper('py');
export const responsivePt = createSpacingHelper('pt');
export const responsivePr = createSpacingHelper('pr');
export const responsivePb = createSpacingHelper('pb');
export const responsivePl = createSpacingHelper('pl');

// Margin helpers
export const responsiveM = createSpacingHelper('m');
export const responsiveMx = createSpacingHelper('mx');
export const responsiveMy = createSpacingHelper('my');
export const responsiveMt = createSpacingHelper('mt');
export const responsiveMr = createSpacingHelper('mr');
export const responsiveMb = createSpacingHelper('mb');
export const responsiveMl = createSpacingHelper('ml');

// Width/Height helpers
export const responsiveW = createSpacingHelper('w');
export const responsiveH = createSpacingHelper('h');
export const responsiveMinW = createSpacingHelper('min-w');
export const responsiveMinH = createSpacingHelper('min-h');
export const responsiveMaxW = createSpacingHelper('max-w');
export const responsiveMaxH = createSpacingHelper('max-h');
