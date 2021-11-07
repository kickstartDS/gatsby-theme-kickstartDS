const stripHtml = require('string-strip-html').stripHtml;
const hashObjectKeys = require('@kickstartds/jsonschema2graphql/build/helpers').hashObjectKeys;
const { createRemoteFileNode } = require('gatsby-source-filesystem');
const readingTime = require('reading-time');
const frontMatter = require('front-matter');
const removeMd = require('remove-markdown');

exports.createResolvers = async ({
  actions,
  createResolvers,
}) => {
  await createResolvers({
    KickstartDsMdxBlogPage: {
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
      categories: {
        type: "[TagLabelComponent]",
        async resolve(source, args, context) {
          if (source.categories) {
            const categories = source.categories.map((category) => {
              return {
                "label": category,
                "type": "tag-label"
              };
            });
            
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
              postHead.headline.subheadline = `published by: ${source.author}`;
            }

            if (source.categories) {
              console.log('Mdx PostHead source.categories', source.categories);
              postHead.categories = source.categories.map((category) => {
                return {
                  "label": category,
                  "type": "tag-label"
                };
              });
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
            const contact = {
              "title": source.author,
              "subtitle": "Founder and CTO with a faible for smart frontend solutions",
              "email": 'info@kickstartds.com',
              "phone": "+49(0)22868896620",
              "copy": "Add a dynamic blog bio here",
              "type": "contact",
            };

            return hashObjectKeys(contact, 'contact');
          }
          return undefined;
        },
      }
    },
  });
};

const getMarkdownExcerpt = (markdown, maxExcerptLength = 300) => {
  const parsedMarkdown = frontMatter(markdown);
  let contentText = removeMd(parsedMarkdown.body);
  // Trim and normalize whitespace in content text
  contentText = contentText.trim().replace(/\s+/g, ' ');
  const excerpt = contentText.slice(0, maxExcerptLength);

  if (contentText.length > maxExcerptLength) {
    return excerpt + '...';
  }

  return excerpt;
};

exports.onCreateNode = async ({ node, actions, getNode, cache, store, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;

  if (node.internal.type === 'Mdx') {
    const kickstartDSPageId = createNodeId(`${node.id} >>> KickstartDsMdxBlogPage`);

    const fileNode = getNode(node.parent);

    const page = {
      id: kickstartDSPageId,
      slug: `blog/${node.frontmatter.slug}`,
      layout: 'blog-detail',

      title: node.frontmatter.title,
      description: node.frontmatter.excerpt,

      updated: fileNode.modifiedTime,
      created: fileNode.birthTime,
      
      excerpt: node.frontmatter.excerpt,
      author: node.frontmatter.author,
      categories: node.frontmatter.categories,

      postBody: node.rawBody,
      postReadingTime: Math.ceil(readingTime(getMarkdownExcerpt(node.rawBody), { wordsPerMinute: 140 }).minutes || 0),
      postWordCount: readingTime(getMarkdownExcerpt(node.rawBody)).words || 0,

      parent: node.id,
    };

    if (node.frontmatter.featuredImage) {
      const featuredImage = await createRemoteFileNode({
        url: node.frontmatter.featuredImage,
        parentNodeId: page.id,
        createNode,
        createNodeId,
        cache,
        store,
      });

      page.image = featuredImage.id;
      page.cardImage = featuredImage.id;
    };

    page.internal = {
      contentDigest: createContentDigest(page),
      content: JSON.stringify(page),
      type: 'KickstartDsMdxBlogPage',
      description: `Mdx Post implementation of the kickstartDS blog page interface`,
    };

    createNode(page);
    createParentChildLink({ parent: node, child: getNode(kickstartDSPageId) });
  }
};
