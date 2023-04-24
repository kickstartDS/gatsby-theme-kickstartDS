const stripHtml = require("string-strip-html").stripHtml;
const hashObjectKeys =
  require("@kickstartds/jsonschema2graphql/build/helpers").hashObjectKeys;
const readingTime = require("reading-time");

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
                  publicURL: { ne: "" },
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
                  publicURL: { ne: "" },
                },
              },
              type: "File",
            });

            const site = await context.nodeModel.findOne({
              query: {},
              type: "Site",
            });

            return fileNode &&
              fileNode.__gatsby_resolved &&
              fileNode.__gatsby_resolved.publicURL
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
                  publicURL: { ne: "" },
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
                  id: { eq: source.author },
                },
              },
              type: "WpUser",
            });

            if (wpUser && wpUser.name) {
              const contentfulPerson = await context.nodeModel.findOne({
                query: {
                  filter: {
                    name: { eq: wpUser && wpUser.name },
                  },
                },
                type: "ContentfulPerson",
              });

              if (contentfulPerson && contentfulPerson.name) {
                return contentfulPerson.name;
              } else {
                console.log(
                  "Missing ContentfulPerson for `author`",
                  contentfulPerson,
                  source.author,
                  source.id
                );
                return undefined;
              }
            } else {
              console.log(
                "Missing WpUser for `author`",
                wpUser,
                source.author,
                source.id
              );
              return undefined;
            }
          }

          return undefined;
        },
      },
      categories: {
        type: "[TagLabelComponent]",
        async resolve(source, args, context) {
          if (source.categories) {
            const categories = await Promise.all(
              source.categories.map(async (tagId) => {
                const wpTag = await context.nodeModel.findOne({
                  query: {
                    filter: {
                      id: { eq: tagId },
                    },
                  },
                  type: "WpTag",
                });

                if (wpTag && wpTag.name) {
                  const contentfulTag = await context.nodeModel.findOne({
                    query: {
                      filter: {
                        title: { eq: wpTag.name },
                      },
                    },
                    type: "ContentfulTag",
                  });

                  if (contentfulTag && contentfulTag.title) {
                    return {
                      label: contentfulTag.title,
                      link: `/tags/${contentfulTag.slug}/`,
                      type: "tag-label",
                    };
                  } else {
                    console.log(
                      "Missing ContentfulTag for `categories`",
                      contentfulTag,
                      wpTag,
                      source.categories,
                      source.id
                    );
                    return undefined;
                  }
                } else {
                  console.log(
                    "Missing WpTag for `categories`",
                    wpTag,
                    source.categories,
                    source.id
                  );
                  return undefined;
                }
              })
            );

            return categories.map((category) =>
              hashObjectKeys(category, "tag-label")
            );
          }

          return undefined;
        },
      },
      postHead: {
        type: "PostHeadComponent!",
        async resolve(source, args, context) {
          if (source.title && source.created) {
            const postHead = {
              type: "post-head",
              headline: {
                level: "h1",
                pageHeader: false,
                align: "left",
                content: source.title,
                spaceAfter: "minimum",
                type: "headline",
              },
            };

            if (source.categories) {
              postHead.categories = await Promise.all(
                source.categories.map(async (tagId) => {
                  const wpTag = await context.nodeModel.findOne({
                    query: {
                      filter: {
                        id: { eq: tagId },
                      },
                    },
                    type: "WpTag",
                  });

                  if (wpTag && wpTag.name) {
                    const contentfulTag = await context.nodeModel.findOne({
                      query: {
                        filter: {
                          title: { eq: wpTag.name },
                        },
                      },
                      type: "ContentfulTag",
                    });

                    if (contentfulTag && contentfulTag.title) {
                      return {
                        label: contentfulTag.title,
                        link: `/tags/${contentfulTag.slug}/`,
                        type: "tag-label",
                      };
                    } else {
                      console.log(
                        "Missing ContentfulTag for `postHead categories`",
                        contentfulTag,
                        source.categories,
                        source.id
                      );
                      return undefined;
                    }
                  } else {
                    console.log(
                      "Missing WpTag for `postHead categories`",
                      wpTag,
                      source.categories,
                      source.id
                    );
                    return undefined;
                  }
                })
              );
            }

            if (source.image) {
              const image = await context.nodeModel.findOne({
                query: {
                  filter: {
                    parent: { id: { eq: source.image } },
                    publicURL: { ne: "" },
                  },
                },
                type: "File",
              });

              postHead.image = {
                src___NODE: image.id,
                alt: source.title,
                width: 900,
                height: 380,
              };
            }

            return hashObjectKeys(postHead, "post-head");
          }
          return undefined;
        },
      },
      postBody: {
        type: "HtmlComponent!",
        async resolve(source, args, context) {
          if (source.postBody) {
            return hashObjectKeys(
              {
                type: "html",
                html: source.postBody,
              },
              "html"
            );
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

          const postAside = {
            type: "post-aside",
            meta: {
              items: [
                {
                  icon: "date",
                  text: new Date(source.created).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }),
                },
                {
                  icon: "time",
                  text: `${source.postReadingTime} min read`,
                },
              ],
            },
          };

          if (source.author) {
            const wpUser = await context.nodeModel.findOne({
              query: { filter: { id: { eq: source.author } } },
              type: "WpUser",
            });

            if (wpUser && wpUser.name) {
              const contentfulPerson = await context.nodeModel.findOne({
                query: {
                  filter: {
                    name: { eq: wpUser && wpUser.name },
                  },
                },
                type: "ContentfulPerson",
              });

              if (contentfulPerson && contentfulPerson.name) {
                postAside.author = {
                  title: contentfulPerson.name,
                  links: [
                    {
                      icon: "email",
                      label: contentfulPerson.email,
                      href: `mailto:${contentfulPerson.email}`,
                    },
                  ],
                  copy: contentfulPerson.role,
                  type: "contact",
                };

                if (contentfulPerson.twitterHandle) {
                  postAside.author.links.push({
                    icon: "twitter",
                    label: contentfulPerson.twitterHandle,
                    href: `https://twitter.com/${contentfulPerson.twitterHandle.replace(
                      "@",
                      ""
                    )}`,
                  });
                }

                if (contentfulPerson.avatar___NODE) {
                  const contentfulImage = await context.nodeModel.findOne({
                    query: {
                      filter: { id: { eq: contentfulPerson.avatar___NODE } },
                      fields: { localFile: { ne: "" } },
                    },
                    type: "ContentfulAsset",
                  });

                  if (
                    contentfulImage &&
                    contentfulImage.fields &&
                    contentfulImage.fields.localFile
                  ) {
                    postAside.author.image = {
                      src___NODE: contentfulImage.fields.localFile,
                      alt: `Profile image ${contentfulPerson.name}`,
                      width: 250,
                      height: 250,
                    };
                  } else {
                    console.log(
                      "Missing ContentfulAsset `author` image",
                      contentfulImage,
                      source.image,
                      source.id
                    );
                  }
                }
              } else {
                console.log(
                  "Missing ContentfulPerson for `author`",
                  contentfulPerson,
                  source.author,
                  source.id
                );
                return undefined;
              }
            } else {
              console.log(
                "Missing WpUser for `author`",
                wpUser,
                source.author,
                source.id
              );
              return undefined;
            }

            const site = await context.nodeModel.findOne({
              query: {},
              type: "Site",
            });

            postAside.shareBar = {
              headline: {
                content: "Share this article",
                level: "h3",
              },
              links: getLinks(
                `${site.siteMetadata.siteUrl}/${source.slug}`,
                source.excerpt,
                `Suggested article: ${source.title}`,
                `${site.siteMetadata.siteUrl}/${source.slug}`
              ),
            };

            return hashObjectKeys(postAside, "post-aside");
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

          return hashObjectKeys(
            {
              type: "post-share-bar",
              headline: {
                content: "Share this article",
                level: "h3",
              },
              links: getLinks(
                `${site.siteMetadata.siteUrl}/${source.slug}`,
                source.excerpt,
                `Suggested article: ${source.title}`,
                `${site.siteMetadata.siteUrl}/${source.slug}`
              ),
            },
            "post-share-bar"
          );
        },
      },
      postContact: {
        type: "ContactComponent",
        async resolve(source, args, context) {
          if (source.author) {
            const wpUser = await context.nodeModel.findOne({
              query: { filter: { id: { eq: source.author } } },
              type: "WpUser",
            });

            if (wpUser && wpUser.name) {
              const contentfulPerson = await context.nodeModel.findOne({
                query: {
                  filter: {
                    name: { eq: wpUser && wpUser.name },
                  },
                },
                type: "ContentfulPerson",
              });

              if (contentfulPerson && contentfulPerson.name) {
                const contact = {
                  title: contentfulPerson.name,
                  links: [
                    {
                      icon: "email",
                      label: contentfulPerson.email,
                      href: `mailto:${contentfulPerson.email}`,
                    },
                  ],
                  subtitle: contentfulPerson.role,
                  copy: contentfulPerson.bio.raw,
                  type: "contact",
                };

                if (contentfulPerson.twitterHandle) {
                  contact.links.push({
                    icon: "twitter",
                    label: contentfulPerson.twitterHandle,
                    href: `https://twitter.com/${contentfulPerson.twitterHandle.replace(
                      "@",
                      ""
                    )}`,
                  });
                }

                if (contentfulPerson.avatar___NODE) {
                  const contentfulImage = await context.nodeModel.findOne({
                    query: {
                      filter: { id: { eq: contentfulPerson.avatar___NODE } },
                      fields: { localFile: { ne: "" } },
                    },
                    type: "ContentfulAsset",
                  });

                  if (
                    contentfulImage &&
                    contentfulImage.fields &&
                    contentfulImage.fields.localFile
                  ) {
                    contact.image = {
                      src___NODE: contentfulImage.fields.localFile,
                      alt: `Profile image ${contentfulPerson.name}`,
                      width: 250,
                      height: 250,
                    };
                  } else {
                    console.log(
                      "Missing ContentfulAsset `author` image",
                      contentfulImage,
                      source.image,
                      source.id
                    );
                  }
                }

                return hashObjectKeys(contact, "contact");
              } else {
                console.log(
                  "Missing ContentfulPerson for `author`",
                  contentfulPerson,
                  source.author,
                  source.id
                );
                return undefined;
              }
            } else {
              console.log(
                "Missing WpUser for `author`",
                wpUser,
                source.author,
                source.id
              );
              return undefined;
            }
          }
          return undefined;
        },
      },
    },
  });
};

exports.onCreateNode = async ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode, createParentChildLink } = actions;

  if (node.internal.type === "WpPost") {
    const kickstartDSPageId = createNodeId(
      `${node.id} >>> KickstartDsWordpressBlogPage`
    );

    const page = {
      id: kickstartDSPageId,
      slug: `blog/${node.slug}`,
      layout: "blog-detail",

      title: node.title,
      description: stripHtml(node.excerpt).result,

      created: node.date,
      updated: node.modified,

      excerpt: node.excerpt,
      author: node.author.node.id,
      categories: node.tags.nodes.map((tag) => tag.id),

      postBody: node.content,
      postReadingTime: Math.ceil(
        readingTime(
          stripHtml(typeof node.content === "string" ? node.content : "")
            .result,
          { wordsPerMinute: 140 }
        ).minutes || 0
      ),
      postWordCount:
        readingTime(
          stripHtml(typeof node.content === "string" ? node.content : "").result
        ).words || 0,

      parent: node.id,
    };

    if (
      node.featuredImage &&
      node.featuredImage.node &&
      node.featuredImage.node.id
    ) {
      page.image = node.featuredImage.node.id;
      page.cardImage = node.featuredImage.node.id;
    }

    page.internal = {
      contentDigest: createContentDigest(page),
      content: JSON.stringify(page),
      type: "KickstartDsWordpressBlogPage",
      description: `Wordpress Post implementation of the kickstartDS blog page interface`,
    };

    createNode(page);
    createParentChildLink({ parent: node, child: getNode(kickstartDSPageId) });
  }
};
