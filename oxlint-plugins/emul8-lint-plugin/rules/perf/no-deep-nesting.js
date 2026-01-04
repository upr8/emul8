/**
 * @fileoverview Warn about deeply nested divs (3+ levels)
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Warn about deeply nested divs (3+ levels)",
      category: "Performance",
    },
    messages: {
      deepNesting:
        "Deeply nested divs detected (3+ levels). Flatten DOM structure where possible",
    },
  },
  create(context) {
    const filename = context.getFilename?.() || context.filename || "";
    // Skip test and story files
    if (filename.includes(".test.") || filename.includes(".stories.")) {
      return {};
    }

    function countDivAncestors(node) {
      let count = 0;
      let current = node.parent;

      while (current) {
        if (
          current.type === "JSXElement" &&
          current.openingElement?.name?.type === "JSXIdentifier" &&
          current.openingElement.name.name === "div"
        ) {
          count++;
        }
        current = current.parent;
      }

      return count;
    }

    return {
      JSXOpeningElement(node) {
        // Check if this is a div
        if (
          node.name?.type !== "JSXIdentifier" ||
          node.name.name !== "div"
        ) {
          return;
        }

        // Count div ancestors
        const ancestorCount = countDivAncestors(node);

        // Report if 3+ levels deep (this div is the 3rd+ nested div)
        if (ancestorCount >= 2) {
          context.report({
            node,
            messageId: "deepNesting",
          });
        }
      },
    };
  },
};
