const stripHtml = require("string-strip-html").stripHtml;
const hashObjectKeys = require('@kickstartds/jsonschema2graphql/build/helpers').hashObjectKeys;

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type KickstartDsContentfulPage implements Node & KickstartDsPage @dontInfer {
      id: ID!
      layout: String!
      title: String!
      description: String
      keywords: String
      image: File @link(from: "image___NODE")
      cardImage: File @link(from: "cardImage___NODE")
      slug: String!
      sections: [SectionComponent]
      updated: Date! @dateformat
      created: Date! @dateformat
    }
  `);
};

exports.onCreateNode = async ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;

  if (node.internal.type === 'ContentfulTerm') {
    const kickstartDSPageId = createNodeId(`${node.id} >>> KickstartDsContentfulPage`);

    const page = {
      id: kickstartDSPageId,
      parent: node.id,
      title: node.name,
      description: stripHtml(node.definition.raw).result,
      slug: `glossary/${node.slug}`,
      layout: 'default',
      created: node.createdAt,
      updated: node.updatedAt,
    };

    page.sections = [{
      "mode": "list",
      "spaceBefore": "none",
      "width": "wide",
      "background": "default",
      "headline": {
        "level": "p",
        "align": "center",
        "content": node.name,
        "spaceAfter": "none",
        "type": "headline"
      },
      "spaceAfter": "default",
      "content": [{
        "type": "text-media",
        "text": node.definition.raw,
      }],
      "type": "sections",
      "gutter": "default"
    }];

    if (page.sections && page.sections.length > 0) {
      page.sections = page.sections.map((section) => hashObjectKeys(section, 'section'));
    }

    page.internal = {
      contentDigest: createContentDigest(page),
      content: JSON.stringify(page),
      type: 'KickstartDsContentfulPage',
      description: `Contentful glossary implementation of the kickstartDS page interface`,
    };

    createNode(page);
    createParentChildLink({ parent: node, child: getNode(kickstartDSPageId) });
  }
};
