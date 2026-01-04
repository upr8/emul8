/**
 * @fileoverview Disallow onClick on div elements without proper accessibility
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow onClick on div elements - use button instead",
      category: "Accessibility",
    },
    messages: {
      divWithClick:
        "div with onClick should likely be a button for accessibility",
    },
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        // Check if element is a div
        if (node.name.type !== "JSXIdentifier" || node.name.name !== "div") {
          return;
        }

        // Check for onClick attribute
        const hasOnClick = node.attributes.some(
          (attr) =>
            attr.type === "JSXAttribute" &&
            attr.name?.type === "JSXIdentifier" &&
            attr.name.name === "onClick"
        );

        if (hasOnClick) {
          context.report({
            node,
            messageId: "divWithClick",
          });
        }
      },
    };
  },
};
