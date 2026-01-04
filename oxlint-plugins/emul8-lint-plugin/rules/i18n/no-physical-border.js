/**
 * @fileoverview Use logical border properties (border-s-*, border-e-*) instead of physical (border-l-*, border-r-*)
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Use logical border properties (border-s-*, border-e-*) instead of physical (border-l-*, border-r-*)",
      category: "Internationalization",
    },
    fixable: "code",
    messages: {
      physicalBorderLeft:
        "Use 'border-s-{{suffix}}' instead of 'border-l-{{suffix}}' for RTL support",
      physicalBorderRight:
        "Use 'border-e-{{suffix}}' instead of 'border-r-{{suffix}}' for RTL support",
    },
  },
  create(context) {
    const filename = context.getFilename?.() || context.filename || "";
    // Skip test and story files
    if (filename.includes(".test.") || filename.includes(".stories.")) {
      return {};
    }

    function checkString(node, value, rawNode) {
      // Check for border-l-* pattern
      const blMatches = value.matchAll(/\bborder-l-(\S+)/g);
      for (const match of blMatches) {
        const suffix = match[1];
        context.report({
          node,
          messageId: "physicalBorderLeft",
          data: { suffix },
          fix(fixer) {
            const newValue = value.replace(
              new RegExp(`\\bborder-l-${suffix}\\b`),
              `border-s-${suffix}`
            );
            if (rawNode.type === "Literal" || rawNode.type === "StringLiteral") {
              return fixer.replaceText(rawNode, `"${newValue}"`);
            }
            return null;
          },
        });
      }

      // Check for border-r-* pattern
      const brMatches = value.matchAll(/\bborder-r-(\S+)/g);
      for (const match of brMatches) {
        const suffix = match[1];
        context.report({
          node,
          messageId: "physicalBorderRight",
          data: { suffix },
          fix(fixer) {
            const newValue = value.replace(
              new RegExp(`\\bborder-r-${suffix}\\b`),
              `border-e-${suffix}`
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
