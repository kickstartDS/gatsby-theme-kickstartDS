exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type KickstartDsWordpressPage implements Node & KickstartDsPage {
      id: ID!
      layout: String!
      keyvisual: KickstartDsKeyvisualComponent
      heading: String
    }
  `);
};


exports.createPages = ({ actions, graphql, getNode, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;

  return graphql(`
    {
      allWpPost(limit: 1000) {
        edges {
          node {
            id
            uri
            title
            databaseId
            excerpt
            date(formatString: "LL")
            featuredImage {
              node {
                localFile {
                  childImageSharp {
                    gatsbyImageData(layout: FIXED)
                  }
                }
              }
            }
            author {
              node {
                name
                firstName
                lastName
                uri
              }
            }
            categories {
              nodes {
                name
                slug
                uri
              }
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const wordpressEdges = result.data.allWpPost.edges;

    wordpressEdges.forEach((edge) => {
      const kickstartDSPageId = createNodeId(`${edge.node.id} >>> KickstartDSWordpressPage`);

      const page = {
        id: kickstartDSPageId,
        heading: edge.node.title,
        layout: 'default',
      };

      if (edge.node.featuredImage && edge.node.featuredImage.node && edge.node.featuredImage.node.localFile) {
        // TODO integrate with images more elegantly in kickstartDS components, at least generate correct srcSet / versions of image for keyvisual here!
        page.keyvisual = {
          background_color: '#ccc',
          small: false,
          show: true,
          media: {
            mode: 'image',
            image: {
              src_mobile: edge.node.featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.fallback.src,
              src_tablet: edge.node.featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.fallback.src,
              src_desktop: edge.node.featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.fallback.src,
            }
          },
          box: {
            enabled: true,
            inbox: false,
            indent: false,
            headline: edge.node.title,
            text: edge.node.body,
            horizontal: 'left',
            vertical: 'center',
            style: 'default',
          }
        };
      }
  
      page.internal = {
        contentDigest: createContentDigest(page),
        type: 'KickstartDSWordpressPage',
      };
  
      console.log('page wordpress', page)
      createNode(page);
      // TODO probably should switch back to `onCreateNode` / transformer plugins. Should not create pages! can't model the parent / child link this way
      createParentChildLink({ parent: edge.node, child: getNode(kickstartDSPageId) });
    });
  })
};

exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;
  const kickstartDSPageId = createNodeId(`${edge.node.id} >>> KickstartDSWordpressPage`);

  const page = {
    id: kickstartDSPageId,
    heading: edge.node.title,
    layout: 'default',
  };

  if (edge.node.featuredImage && edge.node.featuredImage.node && edge.node.featuredImage.node.localFile) {
    // TODO integrate with images more elegantly in kickstartDS components, at least generate correct srcSet / versions of image for keyvisual here!
    page.keyvisual = {
      background_color: '#ccc',
      small: false,
      show: true,
      media: {
        mode: 'image',
        image: {
          src_mobile: edge.node.featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.fallback.src,
          src_tablet: edge.node.featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.fallback.src,
          src_desktop: edge.node.featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.fallback.src,
        }
      },
      box: {
        enabled: true,
        inbox: false,
        indent: false,
        headline: edge.node.title,
        text: edge.node.body,
        horizontal: 'left',
        vertical: 'center',
        style: 'default',
      }
    };
  }

  page.internal = {
    contentDigest: createContentDigest(page),
    type: 'KickstartDSWordpressPage',
  };

  console.log('page wordpress', page)
  createNode(page);
  // TODO probably should switch back to `onCreateNode` / transformer plugins. Should not create pages! can't model the parent / child link this way
  createParentChildLink({ parent: edge.node, child: getNode(kickstartDSPageId) });
};
