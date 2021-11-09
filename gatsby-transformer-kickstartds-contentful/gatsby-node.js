const stripHtml = require("string-strip-html").stripHtml;
const hashObjectKeys = require('@kickstartds/jsonschema2graphql/build/helpers').hashObjectKeys;

exports.createResolvers = async ({
  createResolvers,
}) => {
  await createResolvers({
    KickstartDsGlossaryPage: {
      image: {
        type: "File",
        async resolve(source, args, context) {
          if (source.image) {
            const image = await context.nodeModel.findOne({
              query: { filter: { id: { eq: source.image }, }, fields: { localFile: { ne: '' } } },
              type: "ContentfulAsset",
            });

            return await context.nodeModel.findOne({
              query: {
                filter: {
                  id: { eq: image.fields.localFile },
                  publicURL: { ne: '' }
                },
              },
              type: "File",
            });
          }

          return undefined;
        },
      },
      imageUrl: {
        type: "String",
        async resolve(source, args, context) {
          if (source.image) {
            const fileNode = await context.nodeModel.findOne({
              query: {
                filter: {
                  parent: { id: { eq: source.image } },
                  publicURL: { ne: '' }
                },
              },
              type: "File",
            });

            const site = await context.nodeModel.findOne({
              query: {},
              type: "Site",
            });

            return fileNode && fileNode.__gatsby_resolved && fileNode.__gatsby_resolved.publicURL
              ? `${site.siteMetadata.siteUrl}${fileNode.__gatsby_resolved.publicURL}`
              : undefined;
          }
          
          return undefined;
        },
      },
      cardImage: {
        type: "File",
        async resolve(source, args, context) {
          if (source.cardImage) {
            const image = await context.nodeModel.findOne({
              query: { filter: { id: { eq: source.cardImage } }, fields: { localFile: { ne: '' } } },
              type: "ContentfulAsset",
            });

            return await context.nodeModel.findOne({
              query: {
                filter: {
                  id: { eq: image.fields.localFile },
                  publicURL: { ne: '' }
                },
              },
              type: "File",
            });
          }

          return undefined;
        },
      },
      glossary: {
        type: "GlossaryComponent!",
        async resolve(source, args, context) {
          if (source.glossary) {
            const glossaryJson = source.glossary;

            if (source.glossary.tags && source.glossary.tags.length > 0) {
              glossaryJson.tags = await Promise.all(source.glossary.tags.map(async (tagId) => {
                const contentfulTag = await context.nodeModel.findOne({
                  query: {
                    filter: {
                      id: { eq: tagId },
                    },
                  },
                  type: "ContentfulTag",
                });
  
                return contentfulTag.title;
              }));
            }
  
            if (source.glossary.related && source.glossary.related.length > 0) {
              glossaryJson.related = await Promise.all(source.glossary.related.map(async (relatedId) => {
                const contentfulTerm = await context.nodeModel.findOne({
                  query: {
                    filter: {
                      id: { eq: relatedId },
                    },
                  },
                  type: "ContentfulTerm",
                });
  
                const contentfulImage = await context.nodeModel.findOne({
                  query: { filter: { id: { eq: contentfulTerm.cover___NODE } }, fields: { localFile: { ne: '' } } },
                  type: "ContentfulAsset",
                });
  
                return {
                  title: contentfulTerm.name,
                  excerpt: `${JSON.parse(contentfulTerm.definition.raw).content[0].content[0].value.substring(0,300)} …`,
                  url: `/glossary/${contentfulTerm.slug}`,
                  image___NODE: contentfulImage && contentfulImage.fields.localFile,
                };
              }));
            }
  
            if (source.image) {
              const contentfulImage = await context.nodeModel.findOne({
                query: { filter: { id: { eq: source.image } }, fields: { localFile: { ne: '' } } },
                type: "ContentfulAsset",
              });
  
              glossaryJson.cover = {
                src___NODE: contentfulImage.fields.localFile,
                caption: contentfulImage.description
              };
            }
  
            if (source.glossary.media && source.glossary.media.length > 0) {
              const { entries: contentfulMedia } = await context.nodeModel.findAll({
                query: { filter: { id: { in: source.glossary.media } }, fields: { localFile: { ne: '' } } },
                type: "ContentfulAsset",
              });
  
              glossaryJson.media = Array.from(contentfulMedia).map((media) => {
                return {
                  src___NODE: media.fields.localFile,
                  caption: media.description
                };
              });
            }
  
            glossaryJson.cta = {
              headline: {
                content: "Why we care?",
                styleAs: "h1",
                type: "headline",
              },
              storytelling: {
                box: {
                  text: "Read more, or chat with us, to learn how this helps create consistent frontend interfaces",
                  vAlign: "top",
                },
                full: true,
                type: "storytelling",
              },
              button: {
                href: "/",
                label: "About kickstartDS",
                size: "medium",
                type: "button",
                variant: "solid",
      
                iconAfter: true,
                icon: {
                  icon: "chevron-right"
                }
              },
              type: "cta",
            };
  
            const ctaImage = await context.nodeModel.findOne({
              query: {
                filter: {
                  relativePath: { eq: 'img/contact.svg' },
                  publicURL: { ne: '' }
                },
              },
              type: "File",
            });
  
            if (ctaImage) {
              glossaryJson.cta.storytelling.image = {
                source___NODE: ctaImage.id,
                vAlign: "top",
                order: {
                  desktopImageLast: true,
                },
              };
            }
  
            glossaryJson.type = 'glossary';

            return hashObjectKeys(glossaryJson, 'glossary');
          }

          return undefined;
        }
      }
    },
  });
};

exports.onCreateNode = async ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;

  if (node.internal.type === 'ContentfulTerm') {
    const kickstartDSPageId = createNodeId(`${node.id} >>> KickstartDsGlossaryPage`);

    const page = {
      id: kickstartDSPageId,
      slug: `glossary/${node.slug}`,
      layout: 'glossary',
      
      title: node.name,
      description: stripHtml(node.definition.raw).result,

      created: node.createdAt,
      updated: node.updatedAt,

      glossary: {
        term: node.name,
        definition: node.definition.raw,
        stackshare: node.stackShareDecision,
        tags: node.tags___NODE
          && node.tags___NODE.length > 0
          && node.tags___NODE || [],
        related: node.related___NODE
          && node.related___NODE.length > 0
          && node.related___NODE || [],
      },

      parent: node.id,
    };

    if (node.cover___NODE) {
      page.image = node.cover___NODE;
      page.cardImage = node.cover___NODE;
    };

    if (node.media___NODE) {
      page.glossary.media = node.media___NODE;
    }

    page.internal = {
      contentDigest: createContentDigest(page),
      content: JSON.stringify(page),
      type: 'KickstartDsGlossaryPage',
      description: `Contentful glossary implementation of the kickstartDS glossary page interface`,
    };

    createNode(page);
    createParentChildLink({ parent: node, child: getNode(kickstartDSPageId) });
  }
};
