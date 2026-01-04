/**
 * @fileoverview Disallow positive tabIndex values
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow positive tabIndex values, use 0 or -1",
      category: "Accessibility",
    },
    messages: {
      positiveTabindex: "Avoid positive tabIndex values, use 0 or -1",
    },
  },
  create(context) {
    return {
      JSXAttribute(node) {
        // Check if this is a tabIndex attribute
        if (
          node.name?.type !== "JSXIdentifier" ||
          node.name.name !== "tabIndex"
        ) {
          return;
        }

        // Check for positive numeric literal: tabIndex={1}
        if (node.value?.type === "JSXExpressionContainer") {
          const expr = node.value.expression;
          if (
            expr?.type === "NumericLiteral" &&
            typeof expr.value === "number" &&
            expr.value > 0
          ) {
            context.report({
              node,
              messageId: "positiveTabindex",
            });
          }
        }

        // Check for positive string literal: tabIndex="1"
        if (node.value?.type === "Literal") {
          const val = Number(node.value.value);
          if (!Number.isNaN(val) && val > 0) {
            context.report({
              node,
              messageId: "positiveTabindex",
            });
          }
        }
      },
    };
  },
};
