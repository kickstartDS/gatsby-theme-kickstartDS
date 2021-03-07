exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type KickstartDSWordpressPost implements Node & KickstartDSPost {
      id: ID!
      title: String!
      image: String
      body: String
      link: String
      date: Date @dateformat
    }
  `);
};

exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;
  const kickstartDSPostId = createNodeId(`${node.id} >>> KickStartDSWordpressPost`)

  if (node.internal.type === 'WpPost') {
    const post = {
      id: kickstartDSPostId,
      title: node.title,
      parent: node.id,
      body: node.excerpt,
      link: node.link,
      date: node.date,
    };

    post.internal = {
      contentDigest: createContentDigest(post),
      type: 'KickstartDSWordpressPost',
    };

    createNode(post);
    createParentChildLink({ parent: node, child: getNode(kickstartDSPostId) })
  }
};