/**
 * @fileoverview Use logical padding properties (ps-*, pe-*) instead of physical (pl-*, pr-*)
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Use logical padding properties (ps-*, pe-*) instead of physical (pl-*, pr-*)",
      category: "Internationalization",
    },
    fixable: "code",
    messages: {
      physicalPaddingLeft:
        "Use 'ps-{{size}}' instead of 'pl-{{size}}' for RTL support",
      physicalPaddingRight:
        "Use 'pe-{{size}}' instead of 'pr-{{size}}' for RTL support",
    },
  },
  create(context) {
    const filename = context.getFilename?.() || context.filename || "";
    // Skip test and story files
    if (filename.includes(".test.") || filename.includes(".stories.")) {
      return {};
    }

    function checkString(node, value, rawNode) {
      // Check for pl-* pattern
      const plMatches = value.matchAll(/\bpl-(\d+)\b/g);
      for (const match of plMatches) {
        const size = match[1];
        context.report({
          node,
          messageId: "physicalPaddingLeft",
          data: { size },
          fix(fixer) {
            const newValue = value.replace(
              new RegExp(`\\bpl-${size}\\b`),
              `ps-${size}`
            );
            if (rawNode.type === "Literal" || rawNode.type === "StringLiteral") {
              return fixer.replaceText(rawNode, `"${newValue}"`);
            }
            return null;
          },
        });
      }

      // Check for pr-* pattern
      const prMatches = value.matchAll(/\bpr-(\d+)\b/g);
      for (const match of prMatches) {
        const size = match[1];
        context.report({
          node,
          messageId: "physicalPaddingRight",
          data: { size },
          fix(fixer) {
            const newValue = value.replace(
              new RegExp(`\\bpr-${size}\\b`),
              `pe-${size}`
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
