/**
 * @fileoverview Disallow unnecessary wrapper divs with only className
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Wrapper div with only className may be unnecessary",
      category: "Structure",
    },
    messages: {
      unnecessaryWrapper:
        "Wrapper div with only className - consider applying styles to child",
    },
  },
  create(context) {
    return {
      JSXElement(node) {
        const openingElement = node.openingElement;

        // Check if element is a div
        if (openingElement.name?.name !== "div") {
          return;
        }

        // Check if div has only className attribute
        const attrs = openingElement.attributes || [];
        if (attrs.length !== 1) {
          return;
        }

        const attr = attrs[0];
        if (attr.type !== "JSXAttribute" || attr.name?.name !== "className") {
          return;
        }

        // Check if single JSX child element
        const children = (node.children || []).filter(
          (c) => c.type === "JSXElement" || c.type === "JSXFragment"
        );

        if (children.length !== 1) {
          return;
        }

        context.report({
          node,
          messageId: "unnecessaryWrapper",
        });
      },
    };
  },
};
