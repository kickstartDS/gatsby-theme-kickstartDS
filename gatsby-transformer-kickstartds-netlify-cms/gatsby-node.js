exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type KickstartDsNetlifyCMSPage implements Node & KickstartDsPage {
      id: ID!
      layout: String!
      keyvisual: KickstartDsKeyvisualComponent
      heading: String
    }
  `);
};

exports.createPages = ({ actions, graphql, createNodeId, getNode, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            frontmatter {
              Id
              layout
              keyvisual {
                background_color
                small
                media {
                  mode
                  image {
                    src_mobile {
                      childImageSharp {
                        gatsbyImageData(layout: FIXED)
                      }
                    }
                    src_tablet {
                      childImageSharp {
                        gatsbyImageData(layout: FIXED)
                      }
                    }
                    src_desktop {
                      childImageSharp {
                        gatsbyImageData(layout: FIXED)
                      }
                    }
                  }
                }
                box {
                  enabled
                  inbox
                  indent
                  headline
                  text
                  link {
                    link_button_text
                    button__outline_inverted
                  }
                  horizontal
                  vertical
                  style
                }
              }
              heading
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

    const markdownEdges = result.data.allMarkdownRemark.edges;

    markdownEdges.forEach((edge) => {
      const kickstartDSPageId = createNodeId(`${edge.node.id} >>> KickstartDSNetlifyCMSPage`);

      const page = {
        id: kickstartDSPageId,
        ...edge.node.frontmatter
      };

      if (edge.node && edge.node.frontmatter && edge.node.frontmatter.keyvisual) {
        if (edge.node.frontmatter.keyvisual.media && edge.node.frontmatter.keyvisual.media.mode === 'image') {
          // TODO integrate with images more elegantly in kickstartDS components, at least generate correct srcSet / versions of image for keyvisual here!
          page.keyvisual.media.image.src_mobile = edge.node.frontmatter.keyvisual.media.image.src_mobile.childImageSharp.gatsbyImageData.images.fallback.src;
          page.keyvisual.media.image.src_tablet = edge.node.frontmatter.keyvisual.media.image.src_tablet.childImageSharp.gatsbyImageData.images.fallback.src;
          page.keyvisual.media.image.src_desktop = edge.node.frontmatter.keyvisual.media.image.src_desktop.childImageSharp.gatsbyImageData.images.fallback.src;
        }
      }
  
      page.internal = {
        contentDigest: createContentDigest(page),
        type: 'KickstartDSNetlifyCMSPage',
      };
  
      console.log('page netlify cms', page);
      createNode(page);
      // TODO probably should switch back to `onCreateNode` / transformer plugins. Should not create pages! can't model the parent / child link this way
      // createParentChildLink({ parent: edge.node, child: getNode(kickstartDSPageId) });
    });
  })
};
