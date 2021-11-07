const stripHtml = require('string-strip-html').stripHtml;
const hashObjectKeys = require('@kickstartds/jsonschema2graphql/build/helpers').hashObjectKeys;
const { createRemoteFileNode } = require('gatsby-source-filesystem');
const readingTime = require('reading-time');

exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
}) => {
  const { createNode } = actions;

  await createResolvers({
    KickstartDsWordpressBlogPage: {
      image: {
        type: "File",
        async resolve(source, args, context) {
          if (source.image) {
            return context.nodeModel.findOne({
              query: {
                filter: {
                  parent: { id: { eq: source.image } },
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
            return context.nodeModel.findOne({
              query: {
                filter: {
                  parent: { id: { eq: source.cardImage } },
                  publicURL: { ne: '' }
                },
              },
              type: "File",
            });
          }
          
          return undefined;
        },
      },
      author: {
        type: "String!",
        async resolve(source, args, context) {
          if (source.author) {
            const wpUser = await context.nodeModel.findOne({
              query: {
                filter: {
                  id: { eq: source.author } ,
                },
              },
              type: "WpUser",
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
              const wpCategory = await context.nodeModel.findOne({
                query: {
                  filter: {
                    id: { eq: categoryId },
                  },
                },
                type: "WpCategory",
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
      postHead: {
        type: "PostHeadComponent!",
        async resolve(source, args, context) {
          if (source.title && source.created) {
            const postHead = {
              "type": "post-head",
              "date": source.created,
              "headline": {
                "level": "h1",
                "align": "left",
                "content": source.title,
                "spaceAfter": "none",
                "type": "headline"
              },
            };
            
            if (source.author) {
              const wpUser = await context.nodeModel.findOne({
                query: { filter: { id: { eq: source.author } } },
                type: "WpUser",
              });

              postHead.headline.subheadline = `published by: ${wpUser.name}`;
            }

            if (source.categories) {
              postHead.categories = await Promise.all(source.categories.map(async (categoryId) => {
                const wpCategory = await context.nodeModel.findOne({
                  query: {
                    filter: {
                      id: { eq: categoryId },
                    },
                  },
                  type: "WpCategory",
                });
  
                return {
                  "label": wpCategory.name,
                  "type": "tag-label"
                };
              }));
            }

            return hashObjectKeys(postHead, 'post-head');
          }
          return undefined;
        },
      },
      postBody: {
        type: "HtmlComponent!",
        async resolve(source, args, context) {
          if (source.postBody) {
            return hashObjectKeys({
              "type": "html",
              "html": `<div class="c-rich-text"><p><strong>Reading time estimate</strong>: ${source.postReadingTime}min, ${source.postWordCount} words</p>${source.postBody}</div>`
            }, 'html');
          }

          return undefined;
        },
      },
      postBio: {
        type: "ContactComponent",
        async resolve(source, args, context) {
          if (source.author) {
            const wpUser = await context.nodeModel.findOne({
              query: { filter: { id: { eq: source.author } } },
              type: "WpUser",
            });

            const contact = {
              "title": wpUser.name,
              "subtitle": "Founder and CTO with a faible for smart frontend solutions",
              "email": wpUser.email || 'info@kickstartds.com',
              "phone": "+49(0)22868896620",
              "copy": wpUser.description,
              "type": "contact",
            };

            if (wpUser.avatar && wpUser.avatar.url) {
              const authorImage = await createRemoteFileNode({
                url: wpUser.avatar.url.replace('s=96&', 's=250&'),
                parentNodeId: wpUser.id,
                createNode,
                createNodeId,
                cache,
                store,
              });

              if (authorImage) {
                contact.image = {
                  "src___NODE": authorImage.id,
                  "alt": wpUser.name,
                };
              }

              console.log('authorImage debuggin', authorImage, contact.image);

              return hashObjectKeys(contact, 'contact');
            }
          }
          return undefined;
        },
      }
    },
  });
};

exports.onCreateNode = async ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;

  if (node.internal.type === 'WpPost') {
    const kickstartDSPageId = createNodeId(`${node.id} >>> KickstartDsWordpressBlogPage`);

    const page = {
      id: kickstartDSPageId,
      slug: `blog/${node.slug}`,
      layout: 'blog-detail',

      title: node.title,
      description: stripHtml(node.excerpt).result,

      created: node.date,
      updated: node.modified,
      
      excerpt: node.excerpt,
      author: node.author.node.id,
      categories: node.categories.nodes.map((category) => category.id),

      postBody: node.content,
      postReadingTime: Math.ceil(readingTime(stripHtml(node.content).result, { wordsPerMinute: 140 }).minutes || 0),
      postWordCount: readingTime(stripHtml(node.content).result).words || 0,

      parent: node.id,
    };

    if (node.featuredImage && node.featuredImage.node && node.featuredImage.node.id) {
      page.image = node.featuredImage.node.id;
      page.cardImage = node.featuredImage.node.id;
    };

    page.internal = {
      contentDigest: createContentDigest(page),
      content: JSON.stringify(page),
      type: 'KickstartDsWordpressBlogPage',
      description: `Wordpress Post implementation of the kickstartDS blog page interface`,
    };

    createNode(page);
    createParentChildLink({ parent: node, child: getNode(kickstartDSPageId) });
  }
};
