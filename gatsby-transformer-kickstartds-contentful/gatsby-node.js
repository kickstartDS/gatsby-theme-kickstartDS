const stripHtml = require("string-strip-html").stripHtml;
const hashObjectKeys = require('@kickstartds/jsonschema2graphql/build/helpers').hashObjectKeys;

exports.createResolvers = async ({
  createResolvers,
}) => {
  await createResolvers({
    KickstartDsContentfulPage: {
      image: {
        type: "File",
        async resolve(source, args, context) {
          if (source.image) {
            const image = await context.nodeModel.runQuery({
              query: { filter: { id: { eq: source.image } } },
              type: "ContentfulAsset",
              firstOnly: true,
            });

            return context.nodeModel.runQuery({
              query: {
                filter: {
                  id: { eq: image.localFile___NODE },
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
          if (source.cardImage) {
            const image = await context.nodeModel.runQuery({
              query: { filter: { id: { eq: source.cardImage } } },
              type: "ContentfulAsset",
              firstOnly: true,
            });

            return context.nodeModel.runQuery({
              query: {
                filter: {
                  id: { eq: image.localFile___NODE },
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
      cover: {
        type: "File",
        async resolve(source, args, context) {
          if (source.cover) {
            const image = await context.nodeModel.runQuery({
              query: { filter: { id: { eq: source.cover } } },
              type: "ContentfulAsset",
              firstOnly: true,
            });

            return context.nodeModel.runQuery({
              query: {
                filter: {
                  id: { eq: image.localFile___NODE },
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
      media: {
        type: "[File]",
        async resolve(source, args, context) {
          if (source.media && source.media.length > 0) {
            const media = await context.nodeModel.runQuery({
              query: { filter: { id: { in: source.media } } },
              type: "ContentfulAsset",
            });

            return context.nodeModel.runQuery({
              query: {
                filter: {
                  id: { in: media.map((media) => media.localFile___NODE) },
                  publicURL: { ne: '' }
                },
              },
              type: "File",
            });
          }

          return undefined;
        },
      },
      tags: {
        type: "[TagLabelComponent]",
        async resolve(source, args, context) {
          if (source.tags && source.tags.length > 0) {
            const tags = await Promise.all(source.tags.map(async (tagId) => {
              const contentfulTag = await context.nodeModel.runQuery({
                query: {
                  filter: {
                    id: { eq: tagId },
                  },
                },
                type: "ContentfulTag",
                firstOnly: true,
              });

              return {
                "label": contentfulTag.title,
                "type": "tag-label",
              };
            }));

            return tags.map((tag) => hashObjectKeys(tag, 'tag-label'));
          }

          return undefined;
        },
      },
      related: {
        type: "[TeaserBoxComponent]",
        async resolve(source, args, context) {
          if (source.related && source.related.length > 0) {
            const related = await Promise.all(source.related.map(async (relatedId) => {
              const contentfulTerm = await context.nodeModel.runQuery({
                query: {
                  filter: {
                    id: { eq: relatedId },
                  },
                },
                type: "ContentfulTerm",
                firstOnly: true,
              });

              return {
                "topic": contentfulTerm.name,
                "text": contentfulTerm.definition.raw,
                "darkStyle": true,
                "link": {
                  "label": "Learn more",
                  "variant": "solid",
                  "href": `/glossary/${contentfulTerm.slug}`,
                },
                "type": "teaser-box"
              };
            }));

            return related.map((related) => hashObjectKeys(related, 'teaser-box'));
          }

          return undefined;
        },
      },
      glossary: {
        type: "GlossaryComponent!",
        async resolve(source, args, context) {
          if (source.glossary) {
            const glossaryJson = source.glossary;

            if (source.tags && source.tags.length > 0) {
              glossaryJson.tags = await Promise.all(source.tags.map(async (tagId) => {
                const contentfulTag = await context.nodeModel.runQuery({
                  query: {
                    filter: {
                      id: { eq: tagId },
                    },
                  },
                  type: "ContentfulTag",
                  firstOnly: true,
                });

                return contentfulTag.title;
              }));
            }

            if (source.related && source.related.length > 0) {
              glossaryJson.related = await Promise.all(source.related.map(async (relatedId) => {
                const contentfulTerm = await context.nodeModel.runQuery({
                  query: {
                    filter: {
                      id: { eq: relatedId },
                    },
                  },
                  type: "ContentfulTerm",
                  firstOnly: true,
                });

                return {
                  title: contentfulTerm.name,
                  excerpt: contentfulTerm.definition.raw,
                  url: `/glossary/${contentfulTerm.slug}`
                };
              }));
            }

            if (source.cover) {
              const contentfulImage = await context.nodeModel.runQuery({
                query: { filter: { id: { eq: source.cover } } },
                type: "ContentfulAsset",
                firstOnly: true,
              });

              glossaryJson.cover = {
                src: contentfulImage.localFile___NODE,
                caption: contentfulImage.description
              };
            }

            if (source.media && source.media.length > 0) {
              const contentfulMedia = await context.nodeModel.runQuery({
                query: { filter: { id: { in: source.media } } },
                type: "ContentfulAsset",
              });

              glossaryJson.media = contentfulMedia.map((media) => {
                return {
                  src: media.localFile___NODE,
                  caption: media.description
                };
              })
            }

            return glossaryJson;
          }

          return undefined;
        }
      },
      components: {
        type: "[ContentComponent]",
        async resolve(source, args, context) {
          const glossaryJson = source.glossary;

          if (source.tags && source.tags.length > 0) {
            glossaryJson.tags = await Promise.all(source.tags.map(async (tagId) => {
              const contentfulTag = await context.nodeModel.runQuery({
                query: {
                  filter: {
                    id: { eq: tagId },
                  },
                },
                type: "ContentfulTag",
                firstOnly: true,
              });

              return contentfulTag.title;
            }));
          }

          if (source.related && source.related.length > 0) {
            glossaryJson.related = await Promise.all(source.related.map(async (relatedId) => {
              const contentfulTerm = await context.nodeModel.runQuery({
                query: {
                  filter: {
                    id: { eq: relatedId },
                  },
                },
                type: "ContentfulTerm",
                firstOnly: true,
              });

              const contentfulImage = await context.nodeModel.runQuery({
                query: { filter: { id: { eq: contentfulTerm.cover___NODE } } },
                type: "ContentfulAsset",
                firstOnly: true,
              });

              return {
                title: contentfulTerm.name,
                excerpt: contentfulTerm.definition.raw,
                url: `/glossary/${contentfulTerm.slug}`,
                image___NODE: contentfulImage && contentfulImage.localFile___NODE,
              };
            }));
          }

          if (source.cover) {
            const contentfulImage = await context.nodeModel.runQuery({
              query: { filter: { id: { eq: source.cover } } },
              type: "ContentfulAsset",
              firstOnly: true,
            });

            glossaryJson.cover = {
              src___NODE: contentfulImage.localFile___NODE,
              caption: contentfulImage.description
            };
          }

          if (source.media && source.media.length > 0) {
            const contentfulMedia = await context.nodeModel.runQuery({
              query: { filter: { id: { in: source.media } } },
              type: "ContentfulAsset",
            });

            glossaryJson.media = contentfulMedia.map((media) => {
              return {
                src___NODE: media.localFile___NODE,
                caption: media.description
              };
            })
          }

          glossaryJson.type = 'glossary';

          return [hashObjectKeys(glossaryJson, 'glossary')];
        },
      }
    },
  });
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type KickstartDsContentfulPage implements Node & KickstartDsPage @dontInfer {
      id: ID!
      layout: String!
      title: String!
      description: String
      keywords: String
      image: File
      cardImage: File
      slug: String!
      updated: Date! @dateformat
      created: Date! @dateformat
      sections: [SectionComponent]
      components: [ContentComponent]
      tags: [TagLabelComponent]
      related: [TeaserBoxComponent]
      glossary: GlossaryComponent!
      cover: File
      media: [File]
      stackShareDecision: String
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
      tags: node.tags___NODE
        && node.tags___NODE.length > 0
        && node.tags___NODE || [],
      related: node.related___NODE
        && node.related___NODE.length > 0
        && node.related___NODE || [],
      stackShareDecision: node.stackShareDecision,
    };

    if (node.cover___NODE) {
      page.image = node.cover___NODE;
      page.cardImage = node.cover___NODE;
      page.cover = node.cover___NODE;
    };

    if (node.media___NODE) {
      page.media = node.media___NODE;
    }

    page.glossary = {
      term: node.name,
      definition: node.definition.raw,
      stackshare: node.stackShareDecision,
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
