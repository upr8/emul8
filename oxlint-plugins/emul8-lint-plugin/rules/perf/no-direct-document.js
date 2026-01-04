/**
 * @fileoverview Disallow direct document access outside of typeof checks
 */

export default {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow direct document access - not SSR-safe",
      category: "Performance",
    },
    messages: {
      directDocumentAccess:
        "Direct document access is not SSR-safe. Use typeof document guard or useEffect",
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
        // Check if accessing document.*
        if (
          node.object?.type !== "Identifier" ||
          node.object.name !== "document"
        ) {
          return;
        }

        // Check if inside typeof (safe usage)
        const parent = node.parent;
        if (parent?.type === "UnaryExpression" && parent.operator === "typeof") {
          return;
        }

        // Check if it's part of a typeof comparison
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

        // Allow document access inside useEffect/useLayoutEffect/useCallback
        if (isInsideEffectOrCallback(node)) {
          return;
        }

        context.report({
          node,
          messageId: "directDocumentAccess",
        });
      },
    };
  },
};
