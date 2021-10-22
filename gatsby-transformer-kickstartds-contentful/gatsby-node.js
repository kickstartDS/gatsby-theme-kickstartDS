const stripHtml = require("string-strip-html").stripHtml;
const hashObjectKeys = require('@kickstartds/jsonschema2graphql/build/helpers').hashObjectKeys;

exports.createResolvers = async ({
  createResolvers,
}) => {
  await createResolvers({
    KickstartDsContentfulPage: {
      tags: {
        type: "[TagLabelComponent]",
        async resolve(source, args, context) {
          if (source.tags) {
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
          if (source.related) {
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
      sections: {
        type: "[SectionComponent]",
        async resolve(source, args, context) {
          if (source.sections && source.sections.length > 0) {
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

              source.sections.push({
                "mode": "default",
                "spaceBefore": "none",
                "width": "narrow",
                "background": "default",
                "headline": {
                  "level": "p",
                  "align": "center",
                  "content": "Tags",
                  "spaceAfter": "none",
                  "type": "headline"
                },
                "spaceAfter": "default",
                "content": tags,
                "type": "sections",
                "gutter": "default"
              });
            }

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
                  "link": {
                    "label": "Learn more",
                    "variant": "solid",
                    "href": `/glossary/${contentfulTerm.slug}`,
                  },
                  "type": "teaser-box"
                };
              }));
              
              source.sections.push({
                "mode": "default",
                "spaceBefore": "none",
                "width": "narrow",
                "background": "default",
                "headline": {
                  "level": "p",
                  "align": "center",
                  "content": "Related",
                  "spaceAfter": "none",
                  "type": "headline"
                },
                "spaceAfter": "default",
                "content": related,
                "type": "sections",
                "gutter": "default"
              });
            }

            if (source.stackShareDecision) {
              source.sections.push({
                "mode": "default",
                "spaceBefore": "none",
                "width": "default",
                "background": "default",
                "headline": {
                  "level": "p",
                  "align": "center",
                  "content": "Discuss",
                  "spaceAfter": "none",
                  "type": "headline"
                },
                "spaceAfter": "default",
                "content": [{
                  "label": "Read more about our decision",
                  "href": source.stackShareDecision,
                  "type": "link-button"
                }],
                "type": "sections",
                "gutter": "default"
              });
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
    type KickstartDsContentfulPage implements Node & KickstartDsPage @dontInfer {
      id: ID!
      layout: String!
      title: String!
      description: String
      keywords: String
      image: File @link(from: "image___NODE")
      cardImage: File @link(from: "cardImage___NODE")
      slug: String!
      sections: [SectionComponent]
      updated: Date! @dateformat
      created: Date! @dateformat
      tags: [TagLabelComponent]
      related: [TeaserBoxComponent]
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

    page.sections = [{
      "mode": "list",
      "spaceBefore": "none",
      "width": "wide",
      "background": "default",
      "headline": {
        "level": "p",
        "align": "center",
        "content": node.name,
        "spaceAfter": "none",
        "type": "headline"
      },
      "spaceAfter": "default",
      "content": [{
        "type": "text-media",
        "text": node.definition.raw,
      }],
      "type": "sections",
      "gutter": "default"
    }];

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
