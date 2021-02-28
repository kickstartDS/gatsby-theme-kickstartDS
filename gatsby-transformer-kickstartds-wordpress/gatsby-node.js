exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  createTypes(`interface KickstartDSPost @nodeInterface {
      id: ID!
      title: String!
      image: String
      body: String
      link: String
      date: Date @dateformat
  }`);

  // TODO: should not change schema to fit underlying structure (`featuredImage`)
  createTypes(
    schema.buildObjectType({
      name: `KickstartDSWordpressPost`,
      fields: {
        id: { type: `ID!` },
        title: {
          type: `String!`,
        },
        image: `String`,
        body: `String`,
        link: `String`,
        date: {
          type: `Date`,
          extensions: {
            dateformat: {},
          },
        },
      },
      interfaces: [`Node`, `KickstartDSPost`],
    })
  );
};

exports.onCreateNode = ({ node, actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;

  if (node.internal.type === 'WpPost') {
    const post = {
      id: createNodeId(node.title),
      title: node.title,
      parent: node.id,
      body: node.excerpt,
      link: node.link,
      date: node.date,
    };

    if(node.featuredImage) {
      console.log('node.featuredImage', node.featuredImage);
    }

    if (node.featuredImage
      && node.featuredImage.node.localFile 
      && node.featuredImage.node.localFile.childImageSharp
      && node.featuredImage.node.localFile.childImageSharp.fluid
      && node.featuredImage.node.localFile.childImageSharp.fluid.srcWebp) {
      post.image = node.featuredImage.node.localFile.childImageSharp.fluid.srcWebp;
    }

    post.internal = {
      contentDigest: createContentDigest(post),
      type: 'KickstartDSWordpressPost',
    };

    createNode(post);
  }
};