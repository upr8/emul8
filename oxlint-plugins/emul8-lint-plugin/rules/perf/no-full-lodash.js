/**
 * @fileoverview Warn about importing full lodash library
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Warn about importing full lodash library (~70KB)",
      category: "Performance",
    },
    messages: {
      fullLodash:
        "Full lodash import adds ~70KB to bundle. Import specific functions: import debounce from 'lodash/debounce'",
    },
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        // Check for import _ from 'lodash' or import { ... } from 'lodash'
        if (node.source?.value === "lodash") {
          // Allow specific function imports like import { debounce } from 'lodash'
          // But warn on default imports like import _ from 'lodash'
          const hasDefaultImport = node.specifiers?.some(
            (spec) => spec.type === "ImportDefaultSpecifier"
          );

          if (hasDefaultImport) {
            context.report({
              node,
              messageId: "fullLodash",
            });
          }
        }
      },
    };
  },
};
