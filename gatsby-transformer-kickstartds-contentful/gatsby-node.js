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

            if (image && image.fields && image.fields.localFile) {
              return await context.nodeModel.findOne({
                query: {
                  filter: {
                    id: { eq: image.fields.localFile },
                    publicURL: { ne: '' }
                  },
                },
                type: "File",
              });
            } else {
              console.log('Missing ContentfulAsset `image`', image, source.image, source.id);
              return undefined;
            }
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
            
            if (fileNode && site) {
              return fileNode && fileNode.__gatsby_resolved && fileNode.__gatsby_resolved.publicURL
              ? `${site.siteMetadata.siteUrl}${fileNode.__gatsby_resolved.publicURL}`
              : undefined;  
            } else {
              console.log('Missing File or Site for `imageUrl`', fileNode, site, source.id);
              return undefined;
            }
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

            if (image && image.fields && image.fields.localFile) {
              return await context.nodeModel.findOne({
                query: {
                  filter: {
                    id: { eq: image.fields.localFile },
                    publicURL: { ne: '' }
                  },
                },
                type: "File",
              });
            } else {
              console.log('Missing ContentfulAsset `image`', image, source.image, source.id);
              return undefined;
            }
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

                if (contentfulTag) {
                  return contentfulTag.title;
                } else {
                  console.log('Missing ContentfulTag `glossary`', contentfulTag, tagId, source.glossary.tags, source.id);
                  return undefined;
                }
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

                if (contentfulTerm) {
                  const related = {
                    title: contentfulTerm.name,
                    excerpt: `${JSON.parse(contentfulTerm.definition.raw).content[0].content[0].value.substring(0,300)} …`,
                    url: `/glossary/${contentfulTerm.slug}`,
                  };

                  if (contentfulTerm.cover___NODE) {
                    const contentfulImage = await context.nodeModel.findOne({
                      query: { filter: { id: { eq: contentfulTerm.cover___NODE } }, fields: { localFile: { ne: '' } } },
                      type: "ContentfulAsset",
                    });

                    related.image___NODE = contentfulImage.fields.localFile || '';
                  }

                  return related;
                } else {
                  console.log('Missing ContentfulAsset / ContentfulTerm for `glossary` related', contentfulTerm, contentfulImage, source.id, source.glossary.related);
                  return undefined;
                }
              }));
            }
  
            if (source.image) {
              const contentfulImage = await context.nodeModel.findOne({
                query: { filter: { id: { eq: source.image } }, fields: { localFile: { ne: '' } } },
                type: "ContentfulAsset",
              });

              if (contentfulImage && contentfulImage.fields && contentfulImage.fields.localFile) {
                glossaryJson.cover = {
                  src___NODE: contentfulImage.fields.localFile,
                  caption: contentfulImage.description
                };
              } else {
                console.log('Missing ContentfulAsset `glossary` image', contentfulImage, source.image, source.id);
              }
            }
  
            if (source.glossary.media && source.glossary.media.length > 0) {
              const { entries: contentfulMedia } = await context.nodeModel.findAll({
                query: { filter: { id: { in: source.glossary.media } }, fields: { localFile: { ne: '' } } },
                type: "ContentfulAsset",
              });

              if (contentfulMedia) {
                glossaryJson.media = Array.from(contentfulMedia).map((media) => {
                  return {
                    src___NODE: media.fields.localFile,
                    caption: media.description
                  };
                });
              } else {
                console.log('Missing ContentfulAssets `glossary` media', contentfulMedia, source.glossary.media, source.id);
              }
            }
  
            glossaryJson.cta = {
              box: {
                text: "Read more, or chat with us, to learn how this helps create consistent frontend interfaces",
                vAlign: "top",
                headline: {
                  content: "Why we care?",
                  styleAs: "h1",
                  type: "headline",
                },
                link: {
                  href: "/",
                  label: "About kickstartDS",
                  size: "medium",
                  type: "button",
                  variant: "solid",
        
                  iconAfter: true,
                  icon: {
                    icon: "person",
                  },
                },
              },
              full: true,
              type: "storytelling",
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
              glossaryJson.cta.image = {
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
    KickstartDsAppearancePage: {
      image: {
        type: "File",
        async resolve(source, args, context) {
          if (source.image) {
            const image = await context.nodeModel.findOne({
              query: { filter: { id: { eq: source.image }, }, fields: { localFile: { ne: '' } } },
              type: "ContentfulAsset",
            });

            if (image && image.fields && image.fields.localFile) {
              return await context.nodeModel.findOne({
                query: {
                  filter: {
                    id: { eq: image.fields.localFile },
                    publicURL: { ne: '' }
                  },
                },
                type: "File",
              });
            } else {
              console.log('Missing ContentfulAsset `image`', image, source.image, source.id);
              return undefined;
            }
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
            
            if (fileNode && site) {
              return fileNode && fileNode.__gatsby_resolved && fileNode.__gatsby_resolved.publicURL
              ? `${site.siteMetadata.siteUrl}${fileNode.__gatsby_resolved.publicURL}`
              : undefined;  
            } else {
              console.log('Missing File or Site for `imageUrl`', fileNode, site, source.id);
              return undefined;
            }
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

            if (image && image.fields && image.fields.localFile) {
              return await context.nodeModel.findOne({
                query: {
                  filter: {
                    id: { eq: image.fields.localFile },
                    publicURL: { ne: '' }
                  },
                },
                type: "File",
              });
            } else {
              console.log('Missing ContentfulAsset `image`', image, source.image, source.id);
              return undefined;
            }
          }

          return undefined;
        },
      },
      appearance: {
        type: "AppearanceComponent!",
        async resolve(source, args, context) {
          if (source.appearance) {
            const appearanceJson = source.appearance;

            if (source.appearance.tags && source.appearance.tags.length > 0) {
              appearanceJson.tags = await Promise.all(source.appearance.tags.map(async (tagId) => {
                const contentfulTag = await context.nodeModel.findOne({
                  query: {
                    filter: {
                      id: { eq: tagId },
                    },
                  },
                  type: "ContentfulTag",
                });

                if (contentfulTag) {
                  return contentfulTag.title;
                } else {
                  console.log('Missing ContentfulTag `appearance`', contentfulTag, tagId, source.appearance.tags, source.id);
                  return undefined;
                }
              }));
            }
  
            if (source.appearance.related && source.appearance.related.length > 0) {
              appearanceJson.related = await Promise.all(source.appearance.related.map(async (relatedId) => {
                const contentfulAppearance = await context.nodeModel.findOne({
                  query: {
                    filter: {
                      id: { eq: relatedId },
                    },
                  },
                  type: "ContentfulAppearance",
                });

                if (contentfulAppearance) {
                  const related = {
                    title: contentfulAppearance.name,
                    excerpt: `${JSON.parse(contentfulAppearance.description.raw).content[0].content[0].value.substring(0,300)} …`,
                    url: `/appearance/${contentfulAppearance.slug}`,
                  };

                  if (contentfulAppearance.cover___NODE) {
                    const contentfulImage = await context.nodeModel.findOne({
                      query: { filter: { id: { eq: contentfulAppearance.cover___NODE } }, fields: { localFile: { ne: '' } } },
                      type: "ContentfulAsset",
                    });

                    related.image___NODE = contentfulImage.fields.localFile || '';
                  }

                  return related;
                } else {
                  console.log('Missing ContentfulAsset / ContentfulAppearance for `appearance` related', contentfulTerm, contentfulImage, source.id, source.appearance.related);
                  return undefined;
                }
              }));
            }
  
            if (source.image) {
              const contentfulImage = await context.nodeModel.findOne({
                query: { filter: { id: { eq: source.image } }, fields: { localFile: { ne: '' } } },
                type: "ContentfulAsset",
              });

              if (contentfulImage && contentfulImage.fields && contentfulImage.fields.localFile) {
                appearanceJson.cover = {
                  src___NODE: contentfulImage.fields.localFile,
                  caption: contentfulImage.description
                };
              } else {
                console.log('Missing ContentfulAsset `appearance` image', contentfulImage, source.image, source.id);
              }
            }
  
            if (source.appearance.media && source.appearance.media.length > 0) {
              const { entries: contentfulMedia } = await context.nodeModel.findAll({
                query: { filter: { id: { in: source.appearance.media } }, fields: { localFile: { ne: '' } } },
                type: "ContentfulAsset",
              });

              if (contentfulMedia) {
                appearanceJson.media = Array.from(contentfulMedia).map((media) => {
                  return {
                    src___NODE: media.fields.localFile,
                    caption: media.description
                  };
                });
              } else {
                console.log('Missing ContentfulAssets `appearance` media', contentfulMedia, source.appearance.media, source.id);
              }
            }
  
            appearanceJson.type = 'appearance';
            
            return hashObjectKeys(appearanceJson, 'appearance');
          }

          return undefined;
        }
      }
    },
    KickstartDsShowcasePage: {
      image: {
        type: "File",
        async resolve(source, args, context) {
          if (source.image) {
            const image = await context.nodeModel.findOne({
              query: { filter: { id: { eq: source.image }, }, fields: { localFile: { ne: '' } } },
              type: "ContentfulAsset",
            });

            if (image && image.fields && image.fields.localFile) {
              return await context.nodeModel.findOne({
                query: {
                  filter: {
                    id: { eq: image.fields.localFile },
                    publicURL: { ne: '' }
                  },
                },
                type: "File",
              });
            } else {
              console.log('Missing ContentfulAsset `image`', image, source.image, source.id);
              return undefined;
            }
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
            
            if (fileNode && site) {
              return fileNode && fileNode.__gatsby_resolved && fileNode.__gatsby_resolved.publicURL
              ? `${site.siteMetadata.siteUrl}${fileNode.__gatsby_resolved.publicURL}`
              : undefined;  
            } else {
              console.log('Missing File or Site for `imageUrl`', fileNode, site, source.id);
              return undefined;
            }
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

            if (image && image.fields && image.fields.localFile) {
              return await context.nodeModel.findOne({
                query: {
                  filter: {
                    id: { eq: image.fields.localFile },
                    publicURL: { ne: '' }
                  },
                },
                type: "File",
              });
            } else {
              console.log('Missing ContentfulAsset `image`', image, source.image, source.id);
              return undefined;
            }
          }

          return undefined;
        },
      },
      showcase: {
        type: "ShowcaseComponent!",
        async resolve(source, args, context) {
          if (source.showcase) {
            const showcaseJson = source.showcase;

            if (source.showcase.tags && source.showcase.tags.length > 0) {
              showcaseJson.tags = await Promise.all(source.showcase.tags.map(async (tagId) => {
                const contentfulTag = await context.nodeModel.findOne({
                  query: {
                    filter: {
                      id: { eq: tagId },
                    },
                  },
                  type: "ContentfulTag",
                });

                if (contentfulTag) {
                  return contentfulTag.title;
                } else {
                  console.log('Missing ContentfulTag `showcase`', contentfulTag, tagId, source.showcase.tags, source.id);
                  return undefined;
                }
              }));
            }
  
            if (source.showcase.related && source.showcase.related.length > 0) {
              showcaseJson.related = await Promise.all(source.showcase.related.map(async (relatedId) => {
                const contentfulShowcase = await context.nodeModel.findOne({
                  query: {
                    filter: {
                      id: { eq: relatedId },
                    },
                  },
                  type: "ContentfulShowcase",
                });

                if (contentfulShowcase) {
                  const related = {
                    title: contentfulShowcase.name,
                    excerpt: `${JSON.parse(contentfulShowcase.description.raw).content[0].content[0].value.substring(0,300)} …`,
                    url: `/showcase/${contentfulShowcase.slug}`,
                  };

                  if (contentfulShowcase.cover___NODE) {
                    const contentfulImage = await context.nodeModel.findOne({
                      query: { filter: { id: { eq: contentfulShowcase.cover___NODE } }, fields: { localFile: { ne: '' } } },
                      type: "ContentfulAsset",
                    });

                    related.image___NODE = contentfulImage.fields.localFile || '';
                  }

                  return related;
                } else {
                  console.log('Missing ContentfulAsset / ContentfulShowcase for `showcase` related', contentfulTerm, contentfulImage, source.id, source.showcase.related);
                  return undefined;
                }
              }));
            }
  
            if (source.image) {
              const contentfulImage = await context.nodeModel.findOne({
                query: { filter: { id: { eq: source.image } }, fields: { localFile: { ne: '' } } },
                type: "ContentfulAsset",
              });

              if (contentfulImage && contentfulImage.fields && contentfulImage.fields.localFile) {
                showcaseJson.cover = {
                  src___NODE: contentfulImage.fields.localFile,
                  caption: contentfulImage.description
                };
              } else {
                console.log('Missing ContentfulAsset `showcase` image', contentfulImage, source.image, source.id);
              }
            }
  
            if (source.showcase.media && source.showcase.media.length > 0) {
              const { entries: contentfulMedia } = await context.nodeModel.findAll({
                query: { filter: { id: { in: source.showcase.media } }, fields: { localFile: { ne: '' } } },
                type: "ContentfulAsset",
              });

              if (contentfulMedia) {
                showcaseJson.media = Array.from(contentfulMedia).map((media) => {
                  return {
                    src___NODE: media.fields.localFile,
                    caption: media.description
                  };
                });
              } else {
                console.log('Missing ContentfulAssets `showcase` media', contentfulMedia, source.showcase.media, source.id);
              }
            }
  
            showcaseJson.type = 'showcase';
            
            return hashObjectKeys(showcaseJson, 'showcase');
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
  } else if (node.internal.type === 'ContentfulAppearance') {
    const kickstartDSPageId = createNodeId(`${node.id} >>> KickstartDsAppearancePage`);

    const page = {
      id: kickstartDSPageId,
      slug: `appearance/${node.slug}`,
      layout: 'appearance',
      
      title: node.title,
      description: stripHtml(node.description.raw).result,

      created: node.createdAt,
      updated: node.updatedAt,

      appearance: {
        link: node.link,
        title: node.title,
        description: node.description.raw,
        host: {
          name: node.hostName,
          url: node.hostUrl,
        },
        participants: node.participants,
        date: new Date(node.date).toLocaleDateString(),
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
      page.appearance.media = node.media___NODE;
    }

    page.internal = {
      contentDigest: createContentDigest(page),
      content: JSON.stringify(page),
      type: 'KickstartDsAppearancePage',
      description: `Contentful appearance implementation of the kickstartDS appearance page interface`,
    };

    createNode(page);
    createParentChildLink({ parent: node, child: getNode(kickstartDSPageId) });
  } else if (node.internal.type === 'ContentfulShowcase') {
    const kickstartDSPageId = createNodeId(`${node.id} >>> KickstartDsShowcasePage`);

    const page = {
      id: kickstartDSPageId,
      slug: `showcase/${node.slug}`,
      layout: 'showcase',
      
      title: node.title,
      description: stripHtml(node.description.raw).result,

      created: node.createdAt,
      updated: node.updatedAt,

      showcase: {
        link: node.link,
        title: node.title,
        description: node.description.raw,
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
      page.showcase.media = node.media___NODE;
    }

    page.internal = {
      contentDigest: createContentDigest(page),
      content: JSON.stringify(page),
      type: 'KickstartDsShowcasePage',
      description: `Contentful showcase implementation of the kickstartDS showcase page interface`,
    };

    createNode(page);
    createParentChildLink({ parent: node, child: getNode(kickstartDSPageId) });    
  }
};
