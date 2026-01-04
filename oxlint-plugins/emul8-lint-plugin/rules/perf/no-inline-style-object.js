/**
 * @fileoverview Disallow inline style objects - create new references on each render
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Inline style objects create new references on each render",
      category: "Performance",
    },
    messages: {
      inlineStyle:
        "Inline style objects create new references - move outside component or use useMemo",
    },
  },
  create(context) {
    return {
      JSXAttribute(node) {
        // Check for style attribute
        if (node.name?.name !== "style") {
          return;
        }

        // Check if value is JSX expression container with object expression
        if (node.value?.type !== "JSXExpressionContainer") {
          return;
        }

        if (node.value.expression?.type === "ObjectExpression") {
          context.report({
            node,
            messageId: "inlineStyle",
          });
        }
      },
    };
  },
};
