/**
 * @fileoverview Disallow onClick on span elements without proper accessibility
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Disallow onClick on span elements without role and tabIndex",
      category: "Accessibility",
    },
    messages: {
      spanWithClick: "span with onClick needs role='button' and tabIndex",
    },
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        // Check if element is a span
        if (node.name.type !== "JSXIdentifier" || node.name.name !== "span") {
          return;
        }

        // Check for onClick attribute
        const hasOnClick = node.attributes.some(
          (attr) =>
            attr.type === "JSXAttribute" &&
            attr.name?.type === "JSXIdentifier" &&
            attr.name.name === "onClick"
        );

        if (!hasOnClick) {
          return;
        }

        // Check for role attribute
        const hasRole = node.attributes.some(
          (attr) =>
            attr.type === "JSXAttribute" &&
            attr.name?.type === "JSXIdentifier" &&
            attr.name.name === "role"
        );

        // Check for tabIndex attribute
        const hasTabIndex = node.attributes.some(
          (attr) =>
            attr.type === "JSXAttribute" &&
            attr.name?.type === "JSXIdentifier" &&
            attr.name.name === "tabIndex"
        );

        if (!hasRole || !hasTabIndex) {
          context.report({
            node,
            messageId: "spanWithClick",
          });
        }
      },
    };
  },
};
