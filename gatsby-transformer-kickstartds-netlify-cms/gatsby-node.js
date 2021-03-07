exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type KickstartDSNetlifyCMSPage implements Node & KickstartDSPage {
      id: ID!
      layout: String!
      keyvisual: KickstartDSKeyvisualComponent
      heading: String
    }
  `);
};

exports.createPages = ({ actions, graphql, createNodeId, createContentDigest }) => {
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
                    src_mobile
                    src_tablet
                    src_desktop
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
      result.errors.forEach((e) => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const pages = result.data.allMarkdownRemark.edges

    pages.forEach((node) => {
      const kickstartDSPageId = createNodeId(`${node.id} >>> KickStartDSNetlifyCMSPage`);

      const page = {
        id: kickstartDSPageId,
        ...node.frontmatter
      };
  
      page.internal = {
        contentDigest: createContentDigest(page),
        type: 'KickstartDSNetlifyCMSPage',
      };
  
      createNode(page);
      // createParentChildLink({ parent: node, child: getNode(kickstartDSPageId) })
    });
  })
};
