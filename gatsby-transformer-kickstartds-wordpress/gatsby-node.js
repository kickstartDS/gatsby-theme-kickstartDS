const stripHtml = require('string-strip-html').stripHtml;
const hashObjectKeys = require('@kickstartds/jsonschema2graphql/build/helpers').hashObjectKeys;
const { createRemoteFileNode } = require('gatsby-source-filesystem');
const readingTime = require('reading-time');

const getLinks = (url, twitterText, emailSubject, emailBody) => [
  {
    icon: "twitter",
    href: `https://twitter.com/intent/tweet?source=webclient&url=${url}%2F&text=${twitterText}`,
    title: "Share on Twitter",
    newTab: true,
  },
  {
    icon: "facebook",
    href: `http://www.facebook.com/sharer.php?u=${url}`,
    title: "Share on Facebook",
    newTab: true,
  },
  {
    icon: "xing",
    href: `https://www.xing.com/app/user?op=share;url=${url}`,
    title: "Share on Xing",
    newTab: true,
  },
  {
    icon: "email",
    href: `mailto:?subject=${emailSubject}&body=${emailBody}`,
    title: "Share by E-Mail",
  },
];

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
              "headline": {
                "level": "h1",
                "pageHeader": false,
                "align": "left",
                "content": source.title,
                "spaceAfter": "none",
                "type": "headline"
              },
            };
            
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

            if (source.image) {
              const image = await context.nodeModel.findOne({
                query: {
                  filter: {
                    parent: { id: { eq: source.image } },
                    publicURL: { ne: '' }
                  },
                },
                type: "File",
              });

              postHead.image = {
                "src___NODE": image.id,
                "alt": source.title,
                "width": 900,
                "height": 380,
              };
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
              "html": source.postBody,
            }, 'html');
          }

          return undefined;
        },
      },
      postAside: {
        type: "PostAsideComponent",
        async resolve(source, args, context) {
          const site = await context.nodeModel.findOne({
            query: {},
            type: "Site",
          });

          if (source.author) {
            const wpUser = await context.nodeModel.findOne({
              query: { filter: { id: { eq: source.author } } },
              type: "WpUser",
            });

            // TODO make dynamic again, deduplicate (see `postContact` below)
            const jonas = {
              headline: "Published by",
              title: "Jonas Ulrich",
              links: [
                {
                  icon: "twitter",
                  label: "@tsnmp",
                  href: "https://twitter.com/tsnmp",
                },
                {
                  icon: "email",
                  label: "jonas.ulrich@kickstartds.com",
                  href: "mailto:jonas.ulrich@kickstartds.com",
                },
              ],
              copy: "Founder & CTO, frontend first proponent since day one",
              type: "contact",
            };

            const daniel = {
              title: "Daniel Ley",
              subtitle: "Co-Founder + UX Strategist with heart & soul",
              links: [
                {
                  icon: "twitter",
                  label: "@DLey_de",
                  href: "https://twitter.com/DLey_de",
                },
                {
                  icon: "email",
                  label: "daniel.ley@kickstartds.com",
                  href: "mailto:daniel.ley@kickstartds.com",
                },
              ],
              copy: "More than 20 years ago I started creating user interfaces and web style guides, corporate design manuals and in the past years the first digital Design Systems.\n\nAfter working in a large tech corporation for a long time I very well know todays problems in gaining and maintaining consistency in UIs.",
              type: "contact",
            };

            // const contact = {
            //   "title": wpUser.name,
            //   "subtitle": "Founder and CTO with a faible for smart frontend solutions",
            //   "email": wpUser.email || 'info@kickstartds.com',
            //   "phone": "+49(0)22868896620",
            //   "copy": wpUser.description,
            //   "type": "contact",
            // };

            const postAside = {
              type: 'post-aside',
              meta: {
                items: [
                  {
                    icon: "date",
                    text: new Date(source.created).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                  },
                  {
                    icon: "time",
                    text: `${source.postReadingTime} min read`,
                  },
                ]
              }
            };

            if (wpUser.name === "Daniel Ley") {
              postAside.author = daniel;
              const authorImage = await context.nodeModel.findOne({
                query: {
                  filter: {
                    relativePath: { eq: 'img/author_images_dley.png' },
                    publicURL: { ne: '' }
                  },
                },
                type: "File",
              });

              postAside.author.image = {
                "src___NODE": authorImage.id,
                "alt": "Profile image Daniel Ley",
                "width": 250,
                "height": 250,
              };
            } else {
              postAside.author = jonas;
              const authorImage = await context.nodeModel.findOne({
                query: {
                  filter: {
                    relativePath: { eq: 'img/author_images_julrich.png' },
                    publicURL: { ne: '' }
                  },
                },
                type: "File",
              });

              postAside.author.image = {
                "src___NODE": authorImage.id,
                "alt": "Profile image Jonas Ulrich",
                "width": 250,
                "height": 250,
              };
            }

            const site = await context.nodeModel.findOne({
              query: {},
              type: "Site",
            });
  
            postAside.shareBar = {
              "headline": {
                "content": "Share this article",
                "level": "h3",
              },
              links: getLinks(
                `${site.siteMetadata.siteUrl}/${source.slug}`,
                source.excerpt,
                `Suggested article: ${source.title}`,
                `${site.siteMetadata.siteUrl}/${source.slug}`,
              ),
            };
            
            return hashObjectKeys(postAside, 'post-aside');
          }
          return undefined;
        },
      },
      postShareBar: {
        type: "PostShareBarComponent",
        async resolve(source, args, context) {
          const site = await context.nodeModel.findOne({
            query: {},
            type: "Site",
          });

          return hashObjectKeys({
            type: "post-share-bar",
            headline: {
              content: "Share this article",
              level: "h3",
            },
            links: getLinks(
              `${site.siteMetadata.siteUrl}/${source.slug}`,
              source.excerpt,
              `Suggested article: ${source.title}`,
              `${site.siteMetadata.siteUrl}/${source.slug}`,
            ),
          }, 'post-share-bar');
        },
      },
      postContact: {
        type: "ContactComponent",
        async resolve(source, args, context) {
          // TODO make dynamic again, deduplicate (see `postAside` above)
          if (source.author) {
            const wpUser = await context.nodeModel.findOne({
              query: { filter: { id: { eq: source.author } } },
              type: "WpUser",
            });

            const jonas = {
              title: "Jonas Ulrich",
              subtitle: "Founder & CTO, frontend first proponent since day one",
              links: [
                {
                  icon: "twitter",
                  label: "@tsnmp",
                  href: "https://twitter.com/tsnmp",
                },
                {
                  icon: "email",
                  label: "jonas.ulrich@kickstartds.com",
                  href: "mailto:jonas.ulrich@kickstartds.com",
                },
              ],
              copy: "After 15 years building websites and UIs ourselves, we wanted to improve the way teams collaborate when creating web frontends. That's why we started kickstartDS.\n\nWe want to share our experience and offer a huge library of best practice patterns and well tested web components. All the while following the principles of the Atomic Design methodology.",
              type: "contact",
            };

            const daniel = {
              title: "Daniel Ley",
              subtitle: "Co-Founder + UX Strategist with heart & soul",
              links: [
                {
                  icon: "twitter",
                  label: "@DLey_de",
                  href: "https://twitter.com/DLey_de",
                },
                {
                  icon: "email",
                  label: "daniel.ley@kickstartds.com",
                  href: "mailto:daniel.ley@kickstartds.com",
                },
              ],
              copy: "More than 20 years ago I started creating user interfaces and web style guides, corporate design manuals and in the past years the first digital Design Systems.\n\nAfter working in a large tech corporation for a long time I very well know todays problems in gaining and maintaining consistency in UIs.",
              type: "contact",
            };

            // const contact = {
            //   "title": wpUser.name,
            //   "subtitle": "Founder and CTO with a faible for smart frontend solutions",
            //   "email": wpUser.email || 'info@kickstartds.com',
            //   "phone": "+49(0)22868896620",
            //   "copy": wpUser.description,
            //   "type": "contact",
            // };

            if (wpUser.name === "Daniel Ley") {
              const contact = daniel;
              const contactImage = await context.nodeModel.findOne({
                query: {
                  filter: {
                    relativePath: { eq: 'img/profile_images_dley.png' },
                    publicURL: { ne: '' }
                  },
                },
                type: "File",
              });

              contact.image = {
                "src___NODE": contactImage.id,
                "alt": "Profile image Daniel Ley",
                "width": 250,
                "height": 250,
              };

              return hashObjectKeys(contact, 'contact');
            } else {
              const contact = jonas;
              const contactImage = await context.nodeModel.findOne({
                query: {
                  filter: {
                    relativePath: { eq: 'img/profile_images_julrich.png' },
                    publicURL: { ne: '' }
                  },
                },
                type: "File",
              });

              contact.image = {
                "src___NODE": contactImage.id,
                "alt": "Profile image Jonas Ulrich",
                "width": 250,
                "height": 250,
              };

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
