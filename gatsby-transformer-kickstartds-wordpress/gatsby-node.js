exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type KickstartDsWordpressPage implements Node & KickstartDsPage {
      id: ID!
      layout: String!
      description: String
      title: String
      date: Date @dateformat
      content: [SectionSchema]
    }
  `);
};

exports.onCreateNode = async ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;

  if (node.internal.type === 'WpPost') {
    const kickstartDSPageId = createNodeId(`${node.id} >>> KickstartDsWordpressPage`);

    const page = {
      id: kickstartDSPageId,
      title: node.title,
      description: node.excerpt,
      date: new Date(node.date).toISOString(),
      heading: node.title,
      layout: 'default',
    };

    if (node.featuredImage) {
      const mediaItem = getNode(node.featuredImage.node.id);

      if (mediaItem && mediaItem.localFile) {
        // console.log(getNode(mediaItem.localFile.id))
      }
    }
    
    if (node.featuredImage && node.featuredImage.node && node.featuredImage.node.localFile) {
      // TODO integrate with images more elegantly in kickstartDS components, at least generate correct srcSet / versions of image for keyvisual here!
      page.keyvisual = {
        backgroundColor: '#ccc',
        small: false,
        show: true,
        media: {
          mode: 'image',
          image: {
            srcMobile: node.featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.fallback.src,
            srcTablet: node.featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.fallback.src,
            srcDesktop: node.featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.fallback.src,
          }
        },
        box: {
          enabled: true,
          inbox: false,
          indent: false,
          headline: node.title,
          text: node.body,
          horizontal: 'left',
          vertical: 'center',
          style: 'default',
        }
      };
    }

    page.internal = {
      contentDigest: createContentDigest(page),
      type: 'KickstartDsWordpressPage',
    };

    createNode(page);
    createParentChildLink({ parent: node, child: getNode(kickstartDSPageId) });
  }
};
