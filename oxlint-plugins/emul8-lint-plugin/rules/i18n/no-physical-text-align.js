/**
 * @fileoverview Use logical text alignment (text-start, text-end) instead of physical (text-left, text-right)
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Use logical text alignment (text-start, text-end) instead of physical (text-left, text-right)",
      category: "Internationalization",
    },
    fixable: "code",
    messages: {
      physicalTextLeft:
        "Use 'text-start' instead of 'text-left' for RTL support",
      physicalTextRight:
        "Use 'text-end' instead of 'text-right' for RTL support",
    },
  },
  create(context) {
    const filename = context.getFilename?.() || context.filename || "";
    // Skip test and story files
    if (filename.includes(".test.") || filename.includes(".stories.")) {
      return {};
    }

    function checkString(node, value, rawNode) {
      // Check for text-left pattern
      if (/\btext-left\b/.test(value)) {
        context.report({
          node,
          messageId: "physicalTextLeft",
          fix(fixer) {
            const newValue = value.replace(/\btext-left\b/g, "text-start");
            if (rawNode.type === "Literal" || rawNode.type === "StringLiteral") {
              return fixer.replaceText(rawNode, `"${newValue}"`);
            }
            return null;
          },
        });
      }

      // Check for text-right pattern
      if (/\btext-right\b/.test(value)) {
        context.report({
          node,
          messageId: "physicalTextRight",
          fix(fixer) {
            const newValue = value.replace(/\btext-right\b/g, "text-end");
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
