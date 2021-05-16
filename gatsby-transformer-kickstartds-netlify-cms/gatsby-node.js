exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type KickstartDsNetlifyCMSPage implements Node & KickstartDsPage {
      id: ID!
      layout: String!
      heading: String!
      description: String
      title: String
      date: Date @dateformat
      content: [SectionComponent]
    }
  `);
};

exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;

  if (node.internal.type === 'MarkdownRemark' && node.frontmatter && node.frontmatter.Id) {
    const kickstartDSPageId = createNodeId(`${node.id} >>> KickstartDsNetlifyCMSPage`);
    const parent = getNode(node.parent);

    const page = {
      id: kickstartDSPageId,
      title: node.frontmatter.heading,
      description: node.frontmatter.content[0].text,
      date: new Date(parent.ctimeMs).toISOString(),
      ...node.frontmatter
    };

    page.internal = {
      contentDigest: createContentDigest(page),
      type: 'KickstartDsNetlifyCMSPage',
    };

    createNode(page);
    createParentChildLink({ parent: node, child: getNode(kickstartDSPageId) });
  }
};