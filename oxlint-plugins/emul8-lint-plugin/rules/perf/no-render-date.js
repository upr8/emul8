/**
 * @fileoverview Disallow Date.now() or new Date() in render - may cause hydration mismatch
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Disallow Date.now() or new Date() in render - may cause hydration mismatch",
      category: "Performance",
    },
    messages: {
      dateInRender:
        "Date in render may cause hydration mismatch. Initialize in useEffect for client-only values",
    },
  },
  create(context) {
    const filename = context.getFilename?.() || context.filename || "";
    // Skip test and story files
    if (filename.includes(".test.") || filename.includes(".stories.")) {
      return {};
    }

    return {
      CallExpression(node) {
        // Check for Date.now()
        if (
          node.callee?.type === "MemberExpression" &&
          node.callee.object?.type === "Identifier" &&
          node.callee.object.name === "Date" &&
          node.callee.property?.type === "Identifier" &&
          node.callee.property.name === "now"
        ) {
          context.report({
            node,
            messageId: "dateInRender",
          });
        }
      },
      NewExpression(node) {
        // Check for new Date()
        if (
          node.callee?.type === "Identifier" &&
          node.callee.name === "Date"
        ) {
          context.report({
            node,
            messageId: "dateInRender",
          });
        }
      },
    };
  },
};
