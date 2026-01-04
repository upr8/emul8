/**
 * @fileoverview Use logical margin properties (ms-*, me-*) instead of physical (ml-*, mr-*)
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Use logical margin properties (ms-*, me-*) instead of physical (ml-*, mr-*)",
      category: "Internationalization",
    },
    fixable: "code",
    messages: {
      physicalMarginLeft:
        "Use 'ms-{{size}}' instead of 'ml-{{size}}' for RTL support",
      physicalMarginRight:
        "Use 'me-{{size}}' instead of 'mr-{{size}}' for RTL support",
    },
  },
  create(context) {
    const filename = context.getFilename?.() || context.filename || "";
    // Skip test and story files
    if (filename.includes(".test.") || filename.includes(".stories.")) {
      return {};
    }

    function checkString(node, value, rawNode) {
      // Check for ml-* pattern
      const mlMatches = value.matchAll(/\bml-(\d+)\b/g);
      for (const match of mlMatches) {
        const size = match[1];
        context.report({
          node,
          messageId: "physicalMarginLeft",
          data: { size },
          fix(fixer) {
            const newValue = value.replace(
              new RegExp(`\\bml-${size}\\b`),
              `ms-${size}`
            );
            if (rawNode.type === "Literal" || rawNode.type === "StringLiteral") {
              return fixer.replaceText(rawNode, `"${newValue}"`);
            }
            return null;
          },
        });
      }

      // Check for mr-* pattern
      const mrMatches = value.matchAll(/\bmr-(\d+)\b/g);
      for (const match of mrMatches) {
        const size = match[1];
        context.report({
          node,
          messageId: "physicalMarginRight",
          data: { size },
          fix(fixer) {
            const newValue = value.replace(
              new RegExp(`\\bmr-${size}\\b`),
              `me-${size}`
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
