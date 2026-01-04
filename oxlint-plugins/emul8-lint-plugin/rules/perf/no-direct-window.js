/**
 * @fileoverview Disallow direct window access outside of typeof checks
 */

export default {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow direct window access - not SSR-safe",
      category: "Performance",
    },
    messages: {
      directWindowAccess:
        "Direct window access is not SSR-safe. Use typeof window guard or useEffect",
    },
  },
  create(context) {
    const filename = context.getFilename?.() || context.filename || "";
    // Skip test and story files
    if (filename.includes(".test.") || filename.includes(".stories.")) {
      return {};
    }

    // Check if node is inside a useEffect/useLayoutEffect/useCallback callback
    function isInsideEffectOrCallback(node) {
      let current = node.parent;
      while (current) {
        // Check for arrow function or function expression
        if (
          current.type === "ArrowFunctionExpression" ||
          current.type === "FunctionExpression"
        ) {
          const callExpr = current.parent;
          // Check if this function is passed to useEffect/useLayoutEffect/useCallback
          if (
            callExpr?.type === "CallExpression" &&
            callExpr.callee?.type === "Identifier" &&
            ["useEffect", "useLayoutEffect", "useCallback"].includes(
              callExpr.callee.name
            )
          ) {
            return true;
          }
        }
        current = current.parent;
      }
      return false;
    }

    return {
      MemberExpression(node) {
        // Check if accessing window.*
        if (
          node.object?.type !== "Identifier" ||
          node.object.name !== "window"
        ) {
          return;
        }

        // Check if inside typeof (safe usage)
        const parent = node.parent;
        if (parent?.type === "UnaryExpression" && parent.operator === "typeof") {
          return;
        }

        // Check if it's part of a typeof comparison
        // typeof window !== 'undefined' && window.something
        const grandparent = parent?.parent;
        if (
          grandparent?.type === "LogicalExpression" &&
          grandparent.operator === "&&"
        ) {
          const left = grandparent.left;
          if (
            left?.type === "BinaryExpression" &&
            left.left?.type === "UnaryExpression" &&
            left.left.operator === "typeof"
          ) {
            return;
          }
        }

        // Allow window access inside useEffect/useLayoutEffect/useCallback
        if (isInsideEffectOrCallback(node)) {
          return;
        }

        context.report({
          node,
          messageId: "directWindowAccess",
        });
      },
    };
  },
};
