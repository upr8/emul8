/**
 * @fileoverview Use logical position properties (start-*, end-*) instead of physical (left-*, right-*)
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Use logical position properties (start-*, end-*) instead of physical (left-*, right-*)",
      category: "Internationalization",
    },
    fixable: "code",
    messages: {
      physicalLeft:
        "Use 'start-{{size}}' instead of 'left-{{size}}' for RTL support",
      physicalRight:
        "Use 'end-{{size}}' instead of 'right-{{size}}' for RTL support",
    },
  },
  create(context) {
    const filename = context.getFilename?.() || context.filename || "";
    // Skip test and story files
    if (filename.includes(".test.") || filename.includes(".stories.")) {
      return {};
    }

    function checkString(node, value, rawNode) {
      // Check for left-* pattern
      const leftMatches = value.matchAll(/\bleft-(\d+)\b/g);
      for (const match of leftMatches) {
        const size = match[1];
        context.report({
          node,
          messageId: "physicalLeft",
          data: { size },
          fix(fixer) {
            const newValue = value.replace(
              new RegExp(`\\bleft-${size}\\b`),
              `start-${size}`
            );
            if (rawNode.type === "Literal" || rawNode.type === "StringLiteral") {
              return fixer.replaceText(rawNode, `"${newValue}"`);
            }
            return null;
          },
        });
      }

      // Check for right-* pattern
      const rightMatches = value.matchAll(/\bright-(\d+)\b/g);
      for (const match of rightMatches) {
        const size = match[1];
        context.report({
          node,
          messageId: "physicalRight",
          data: { size },
          fix(fixer) {
            const newValue = value.replace(
              new RegExp(`\\bright-${size}\\b`),
              `end-${size}`
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
