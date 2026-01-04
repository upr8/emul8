/**
 * @fileoverview Emul8 custom lint rules for oxlint
 *
 * Provides rules for:
 * - Accessibility (a11y)
 * - Internationalization (i18n)
 * - Performance (perf)
 * - Import hierarchy (imports)
 *
 * @see metadata/registry.json for rule metadata and governance tracking
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Load rule metadata registry
const registry = require("./metadata/registry.json");

// A11y rules
import noDivOnclick from "./rules/a11y/no-div-onclick.js";
import noSpanOnclick from "./rules/a11y/no-span-onclick.js";
import noPositiveTabindex from "./rules/a11y/no-positive-tabindex.js";

// i18n rules
import noPhysicalMargin from "./rules/i18n/no-physical-margin.js";
import noPhysicalPadding from "./rules/i18n/no-physical-padding.js";
import noPhysicalPosition from "./rules/i18n/no-physical-position.js";
import noPhysicalTextAlign from "./rules/i18n/no-physical-text-align.js";
import noPhysicalBorder from "./rules/i18n/no-physical-border.js";
import noPhysicalRounded from "./rules/i18n/no-physical-rounded.js";

// Perf rules
import noDirectWindow from "./rules/perf/no-direct-window.js";
import noDirectDocument from "./rules/perf/no-direct-document.js";
import noDirectStorage from "./rules/perf/no-direct-storage.js";
import noLayoutEffect from "./rules/perf/no-layout-effect.js";
import noRenderRandom from "./rules/perf/no-render-random.js";
import noRenderDate from "./rules/perf/no-render-date.js";
import noDeepNesting from "./rules/perf/no-deep-nesting.js";
import noFullLodash from "./rules/perf/no-full-lodash.js";
import noInlineStyleObject from "./rules/perf/no-inline-style-object.js";

// Structure rules
import noUnnecessaryWrapper from "./rules/structure/no-unnecessary-wrapper.js";

// Import hierarchy rules
import atomicHierarchy from "./rules/imports/atomic-hierarchy.js";

// Plugin definition
const plugin = {
  meta: {
    name: "emul8",
    version: registry.version,
  },
  rules: {
    // A11y rules
    "no-div-onclick": noDivOnclick,
    "no-span-onclick": noSpanOnclick,
    "no-positive-tabindex": noPositiveTabindex,

    // i18n rules
    "no-physical-margin": noPhysicalMargin,
    "no-physical-padding": noPhysicalPadding,
    "no-physical-position": noPhysicalPosition,
    "no-physical-text-align": noPhysicalTextAlign,
    "no-physical-border": noPhysicalBorder,
    "no-physical-rounded": noPhysicalRounded,

    // Perf rules
    "no-direct-window": noDirectWindow,
    "no-direct-document": noDirectDocument,
    "no-direct-storage": noDirectStorage,
    "no-layout-effect": noLayoutEffect,
    "no-render-random": noRenderRandom,
    "no-render-date": noRenderDate,
    "no-deep-nesting": noDeepNesting,
    "no-full-lodash": noFullLodash,
    "no-inline-style-object": noInlineStyleObject,

    // Structure rules
    "no-unnecessary-wrapper": noUnnecessaryWrapper,

    // Import hierarchy rules
    "atomic-hierarchy": atomicHierarchy,
  },
};

// Export plugin as default
export default plugin;

// Named exports for programmatic access
export { registry };

/**
 * Get metadata for a specific rule
 * @param {string} ruleName - Rule name (e.g., "no-div-onclick")
 * @returns {object|undefined} Rule metadata or undefined if not found
 */
export function getRuleMetadata(ruleName) {
  return registry.rules[ruleName];
}

/**
 * Get all rules in a category
 * @param {string} category - Category name (a11y, i18n, perf, imports)
 * @returns {object[]} Array of rule metadata objects
 */
export function getRulesByCategory(category) {
  return Object.values(registry.rules).filter((rule) => rule.category === category);
}

/**
 * Get all rules with a specific status
 * @param {string} status - Status (active, experimental, deprecated)
 * @returns {object[]} Array of rule metadata objects
 */
export function getRulesByStatus(status) {
  return Object.values(registry.rules).filter((rule) => rule.status === status);
}
