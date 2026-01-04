/**
 * @fileoverview Disallow Math.random() in render - causes hydration mismatch
 */

export default {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow Math.random() in render - causes hydration mismatch",
      category: "Performance",
    },
    messages: {
      mathRandom:
        "Math.random() in render causes hydration mismatch. Move to useEffect or use useId()",
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
        // Check for Math.random()
        if (
          node.callee?.type === "MemberExpression" &&
          node.callee.object?.type === "Identifier" &&
          node.callee.object.name === "Math" &&
          node.callee.property?.type === "Identifier" &&
          node.callee.property.name === "random"
        ) {
          context.report({
            node,
            messageId: "mathRandom",
          });
        }
      },
    };
  },
};
