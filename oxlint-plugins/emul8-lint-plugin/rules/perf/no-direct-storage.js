/**
 * @fileoverview Disallow direct localStorage/sessionStorage access
 */

export default {
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow direct localStorage/sessionStorage access - not SSR-safe",
      category: "Performance",
    },
    messages: {
      directStorageAccess:
        "{{storage}} is not available during SSR. Access in useEffect with try-catch",
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
        // Check if accessing localStorage.* or sessionStorage.*
        if (node.object?.type !== "Identifier") {
          return;
        }

        const storageName = node.object.name;
        if (storageName !== "localStorage" && storageName !== "sessionStorage") {
          return;
        }

        // Allow storage access inside useEffect/useLayoutEffect/useCallback
        if (isInsideEffectOrCallback(node)) {
          return;
        }

        context.report({
          node,
          messageId: "directStorageAccess",
          data: { storage: storageName },
        });
      },
    };
  },
};
