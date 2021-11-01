const stripHtml = require("string-strip-html").stripHtml;
const hashObjectKeys = require('@kickstartds/jsonschema2graphql/build/helpers').hashObjectKeys;

exports.createResolvers = async ({
  createResolvers,
}) => {
  await createResolvers({
    KickstartDsWordpressPage: {
      imageUrl: {
        type: "String",
        async resolve(source, args, context) {
          if (source.image___NODE) {
            const fileNode = await context.nodeModel.runQuery({
              query: {
                filter: {
                  parent: { id: { eq: source.image___NODE } },
                  publicURL: { ne: '' }
                },
              },
              type: "File",
              firstOnly: true,
            });

            const site = await context.nodeModel.runQuery({
              query: {},
              type: "Site",
              firstOnly: true,
            });

            return fileNode && fileNode.__gatsby_resolved && fileNode.__gatsby_resolved.publicURL
              ? `${site.siteMetadata.siteUrl}${fileNode.__gatsby_resolved.publicURL}`
              : undefined;
          }
          
          return undefined;
        },
      },
      image: {
        type: "File",
        async resolve(source, args, context) {
          if (source.image___NODE) {
            return context.nodeModel.runQuery({
              query: {
                filter: {
                  parent: { id: { eq: source.image___NODE } },
                  publicURL: { ne: '' }
                },
              },
              type: "File",
              firstOnly: true,
            });
          }
          
          return undefined;
        },
      },
      cardImage: {
        type: "File",
        async resolve(source, args, context) {
          if (source.cardImage___NODE) {
            return context.nodeModel.runQuery({
              query: {
                filter: {
                  parent: { id: { eq: source.cardImage___NODE } },
                  publicURL: { ne: '' }
                },
              },
              type: "File",
              firstOnly: true,
            });
          }
          
          return undefined;
        },
      },
      author: {
        type: "String!",
        async resolve(source, args, context) {
          if (source.author) {
            const wpUser = await context.nodeModel.runQuery({
              query: {
                filter: {
                  id: { eq: source.author } ,
                },
              },
              type: "WpUser",
              firstOnly: true,
            });

            return wpUser && wpUser.name
              ? wpUser.name
              : undefined;
          }
          
          return undefined;
        },
      },
      categories: {
        type: "[TagLabelComponent]",
        async resolve(source, args, context) {
          if (source.categories) {
            const categories = await Promise.all(source.categories.map(async (categoryId) => {
              const wpCategory = await context.nodeModel.runQuery({
                query: {
                  filter: {
                    id: { eq: categoryId },
                  },
                },
                type: "WpCategory",
                firstOnly: true,
              });

              return {
                "label": wpCategory.name,
                "type": "tag-label"
              };
            }));
            
            return categories.map((category) => hashObjectKeys(category, 'tag-label'));
          }

          return undefined;
        },
      },
      sections: {
        type: "[SectionComponent]",
        async resolve(source, args, context) {
          if (source.sections && source.sections.length > 0) {
            if (source.categories) {
              source.sections[0].content[0].categories = await Promise.all(source.categories.map(async (categoryId) => {
                const wpCategory = await context.nodeModel.runQuery({
                  query: {
                    filter: {
                      id: { eq: categoryId },
                    },
                  },
                  type: "WpCategory",
                  firstOnly: true,
                });
  
                return {
                  "label": wpCategory.name,
                  "type": "tag-label"
                };
              }));
            }

            if (source.image___NODE) {
              const fileNode = await context.nodeModel.runQuery({
                query: {
                  filter: {
                    parent: { id: { eq: source.image___NODE } },
                    publicURL: { ne: '' }
                  },
                },
                type: "File",
                firstOnly: true,
              });

              source.sections[0].content[0].image = {
                "src___NODE": fileNode.id,
                "width": 900,
                "height": 300,
              };
            }

            if (source.author) {
              const wpUser = await context.nodeModel.runQuery({
                query: {
                  filter: {
                    id: { eq: source.author } ,
                  },
                },
                type: "WpUser",
                firstOnly: true,
              });

              source.sections[0].content[0].headline.subheadline = `published by: ${wpUser.name}`;
            }

            return source.sections.map((section) => hashObjectKeys(section, 'section'));
          }

          return undefined;
        },
      }
    },
  });
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type KickstartDsWordpressPage implements Node & KickstartDsPage @dontInfer {
      id: ID!
      layout: String!
      title: String!
      description: String
      keywords: String
      image: File @link(from: "image___NODE")
      cardImage: File @link(from: "cardImage___NODE")
      slug: String!
      excerpt: String!
      author: String!
      categories: [TagLabelComponent]
      sections: [SectionComponent]
      components: [ContentComponent]
      updated: Date! @dateformat
      created: Date! @dateformat
    }
  `);
};

exports.onCreateNode = async ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;

  if (node.internal.type === 'WpPost') {
    const kickstartDSPageId = createNodeId(`${node.id} >>> KickstartDsWordpressPage`);

    const page = {
      id: kickstartDSPageId,
      parent: node.id,
      title: node.title,
      description: stripHtml(node.excerpt).result,
      slug: `blog/${node.slug}`,
      excerpt: node.excerpt,
      author: node.author.node.id,
      categories: node.categories.nodes.map((category) => category.id),
      layout: 'blog-detail',
      created: node.date,
      updated: node.modified,
    };

    page.sections = [{
      "className": "l-section--content-width-narrow",
      "mode": "list",
      "spaceBefore": "small",
      "width": "wide",
      "background": "default",
      "headline": {
        "level": "p",
        "align": "center",
        "content": "",
        "spaceAfter": "none",
        "type": "headline"
      },
      "spaceAfter": "default",
      "content": [{
        "type": "post-head",
        "date": node.date,
        "headline": {
          "level": "h1",
          "align": "left",
          "content": node.title,
          "spaceAfter": "none",
          "type": "headline"
        },
      }, {
        "type": "html",
        "html": `<div class="c-rich-text">${node.content}</div>`
      }],
      "type": "sections",
      "gutter": "default"
    }];

    if (node.featuredImage && node.featuredImage.node && node.featuredImage.node.id) {
      page.image___NODE = node.featuredImage.node.id;
      page.cardImage___NODE = node.featuredImage.node.id;
    };

    page.internal = {
      contentDigest: createContentDigest(page),
      content: JSON.stringify(page),
      type: 'KickstartDsWordpressPage',
      description: `Wordpress Post implementation of the kickstartDS page interface`,
    };

    createNode(page);
    createParentChildLink({ parent: node, child: getNode(kickstartDSPageId) });
  }
};
