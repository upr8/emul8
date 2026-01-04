/**
 * @fileoverview Enforce atomic design import hierarchy
 *
 * Replaces dependency-cruiser rules for:
 * - Layer hierarchy (utils < layouts < atoms < molecules < organisms < templates)
 * - Same-layer independence (no cross-component imports within same layer)
 */

const LAYER_ORDER = [
  "utils",
  "layouts",
  "atoms",
  "molecules",
  "organisms",
  "templates",
];

const LAYER_ALLOWED_IMPORTS = {
  utils: [], // Can only import external packages
  layouts: ["utils"],
  atoms: ["utils", "layouts"],
  molecules: ["utils", "layouts", "atoms"],
  organisms: ["utils", "layouts", "atoms", "molecules"],
  templates: ["utils", "layouts", "atoms", "molecules", "organisms"],
};

/**
 * Extract the layer from a file path
 * @param {string} filePath - The file path to analyze
 * @returns {string|null} The layer name or null if not in a layer
 */
function getLayerFromFilePath(filePath) {
  for (const layer of LAYER_ORDER) {
    // Match /src/layer/ or \src\layer\ patterns
    const regex = new RegExp(`[/\\\\]src[/\\\\]${layer}[/\\\\]`);
    if (regex.test(filePath)) {
      return layer;
    }
  }
  return null;
}

/**
 * Extract the component name from a file path
 * @param {string} filePath - The file path
 * @param {string} layer - The layer the file is in
 * @returns {string|null} The component name or null
 */
function getComponentFromFilePath(filePath, layer) {
  // Match pattern like /src/atoms/Button/... or \src\atoms\Button\...
  const regex = new RegExp(`[/\\\\]src[/\\\\]${layer}[/\\\\]([^/\\\\]+)`);
  const match = filePath.match(regex);
  return match ? match[1] : null;
}

/**
 * Determine the layer being imported from an import path
 * @param {string} importPath - The import source path
 * @param {string} currentFilePath - The current file's path
 * @returns {string|null} The layer name or null for external/unknown
 */
function getLayerFromImportPath(importPath, currentFilePath) {
  // Absolute imports starting with @/ or direct layer references
  for (const layer of LAYER_ORDER) {
    if (
      importPath.startsWith(`@/${layer}/`) ||
      importPath.startsWith(`@/${layer}`)
    ) {
      return layer;
    }
  }

  // Relative imports - need to resolve based on current file path
  if (importPath.startsWith(".")) {
    // Check if the resolved path would be in a different layer
    // This is a simplified check - we look for layer names in the import path
    for (const layer of LAYER_ORDER) {
      // Pattern like ../../layouts/ or ../atoms/
      const patterns = [
        new RegExp(`\\.\\./+${layer}/`),
        new RegExp(`\\.\\./+${layer}$`),
      ];
      for (const pattern of patterns) {
        if (pattern.test(importPath)) {
          return layer;
        }
      }
    }

    // If importing from same directory or subdirectory, it's the same layer
    const currentLayer = getLayerFromFilePath(currentFilePath);
    if (currentLayer && !importPath.includes("../")) {
      // Relative import within same layer directory
      return currentLayer;
    }
  }

  return null; // External package or unrecognized
}

/**
 * Get component name from import path for same-layer check
 * @param {string} importPath - The import source path
 * @param {string} layer - The layer being imported from
 * @returns {string|null} The component name or null
 */
function getComponentFromImportPath(importPath, layer) {
  // Match @/layer/ComponentName or @/layer/ComponentName/...
  const absoluteRegex = new RegExp(`@/${layer}/([^/]+)`);
  const absoluteMatch = importPath.match(absoluteRegex);
  if (absoluteMatch) {
    return absoluteMatch[1];
  }

  // Match relative imports like ../../atoms/Button
  const relativeRegex = new RegExp(`${layer}/([^/]+)`);
  const relativeMatch = importPath.match(relativeRegex);
  if (relativeMatch) {
    return relativeMatch[1];
  }

  return null;
}

export default {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce atomic design import hierarchy",
      category: "Architecture",
    },
    messages: {
      invalidHierarchy:
        "'{{currentLayer}}' cannot import from '{{importedLayer}}'. Allowed: {{allowedLayers}}",
      sameLayerImport:
        "Components in '{{layer}}' should not import from other '{{layer}}' components. '{{currentComponent}}' cannot import from '{{importedComponent}}'",
    },
  },
  create(context) {
    const filename = context.getFilename?.() || context.filename || "";
    const currentLayer = getLayerFromFilePath(filename);

    // Skip files not in a known layer
    if (!currentLayer) {
      return {};
    }

    // Skip test and story files
    if (filename.includes(".test.") || filename.includes(".stories.")) {
      return {};
    }

    const currentComponent = getComponentFromFilePath(filename, currentLayer);

    return {
      ImportDeclaration(node) {
        const importPath = node.source?.value;
        if (!importPath) return;

        const importedLayer = getLayerFromImportPath(importPath, filename);

        // External packages are always allowed
        if (!importedLayer) {
          return;
        }

        const allowedLayers = LAYER_ALLOWED_IMPORTS[currentLayer];

        // Check hierarchy violation
        if (importedLayer !== currentLayer && !allowedLayers.includes(importedLayer)) {
          context.report({
            node,
            messageId: "invalidHierarchy",
            data: {
              currentLayer,
              importedLayer,
              allowedLayers:
                allowedLayers.length > 0
                  ? allowedLayers.join(", ")
                  : "external packages only",
            },
          });
          return;
        }

        // Check same-layer cross-component imports
        if (importedLayer === currentLayer && currentComponent) {
          const importedComponent = getComponentFromImportPath(
            importPath,
            importedLayer
          );

          if (
            importedComponent &&
            importedComponent !== currentComponent &&
            // Allow imports from index files (re-exports)
            !importPath.endsWith("/index") &&
            !importPath.endsWith("/")
          ) {
            context.report({
              node,
              messageId: "sameLayerImport",
              data: {
                layer: currentLayer,
                currentComponent,
                importedComponent,
              },
            });
          }
        }
      },
    };
  },
};
