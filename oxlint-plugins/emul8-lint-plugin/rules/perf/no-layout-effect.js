/**
 * @fileoverview Disallow useLayoutEffect - causes SSR warnings
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow useLayoutEffect - causes SSR warnings",
      category: "Performance",
    },
    messages: {
      useLayoutEffect:
        "useLayoutEffect causes SSR warnings. Use useIsomorphicLayoutEffect or useEffect",
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        // Check for useLayoutEffect()
        if (
          node.callee?.type === "Identifier" &&
          node.callee.name === "useLayoutEffect"
        ) {
          context.report({
            node,
            messageId: "useLayoutEffect",
          });
        }
      },
    };
  },
};
