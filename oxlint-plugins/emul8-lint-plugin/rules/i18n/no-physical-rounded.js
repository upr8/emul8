/**
 * @fileoverview Use logical rounded properties (rounded-s-*, rounded-e-*) instead of physical (rounded-l-*, rounded-r-*)
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Use logical rounded properties (rounded-s-*, rounded-e-*) instead of physical (rounded-l-*, rounded-r-*)",
      category: "Internationalization",
    },
    fixable: "code",
    messages: {
      physicalRoundedLeft:
        "Use 'rounded-s-{{suffix}}' instead of 'rounded-l-{{suffix}}' for RTL support",
      physicalRoundedRight:
        "Use 'rounded-e-{{suffix}}' instead of 'rounded-r-{{suffix}}' for RTL support",
    },
  },
  create(context) {
    const filename = context.getFilename?.() || context.filename || "";
    // Skip test and story files
    if (filename.includes(".test.") || filename.includes(".stories.")) {
      return {};
    }

    function checkString(node, value, rawNode) {
      // Check for rounded-l-* pattern
      const rlMatches = value.matchAll(/\brounded-l-(\S+)/g);
      for (const match of rlMatches) {
        const suffix = match[1];
        context.report({
          node,
          messageId: "physicalRoundedLeft",
          data: { suffix },
          fix(fixer) {
            const newValue = value.replace(
              new RegExp(`\\brounded-l-${suffix}\\b`),
              `rounded-s-${suffix}`
            );
            if (rawNode.type === "Literal" || rawNode.type === "StringLiteral") {
              return fixer.replaceText(rawNode, `"${newValue}"`);
            }
            return null;
          },
        });
      }

      // Check for rounded-r-* pattern
      const rrMatches = value.matchAll(/\brounded-r-(\S+)/g);
      for (const match of rrMatches) {
        const suffix = match[1];
        context.report({
          node,
          messageId: "physicalRoundedRight",
          data: { suffix },
          fix(fixer) {
            const newValue = value.replace(
              new RegExp(`\\brounded-r-${suffix}\\b`),
              `rounded-e-${suffix}`
            );
            if (rawNode.type === "Literal" || rawNode.type === "StringLiteral") {
              return fixer.replaceText(rawNode, `"${newValue}"`);
            }
            return null;
          },
        });
      }
    }

    return {
      Literal(node) {
        if (typeof node.value === "string") {
          checkString(node, node.value, node);
        }
      },
      TemplateElement(node) {
        if (node.value?.raw) {
          checkString(node, node.value.raw, node);
        }
      },
    };
  },
};
