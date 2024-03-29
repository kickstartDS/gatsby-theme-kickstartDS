const stripHtml = require("string-strip-html").stripHtml;
const hashObjectKeys =
  require("@kickstartds/jsonschema2graphql/build/helpers").hashObjectKeys;
const { createRemoteFileNode } = require("gatsby-source-filesystem");
const path = require("path");
const documentToHtmlString =
  require("@contentful/rich-text-html-renderer").documentToHtmlString;
const createClient = require("@supabase/supabase-js").createClient;

// Inspired by https://community.shopify.com/c/Shopify-Design/Ordinal-Number-in-javascript-1st-2nd-3rd-4th/m-p/72156
function getOrdinal(date) {
  const options = { month: "long" };

  const day = date.getDate();
  const month = new Intl.DateTimeFormat("en-US", options).format(date);
  const year = date.getFullYear();

  const s = ["th", "st", "nd", "rd"];
  const v = day % 100;

  return `${month} ${day + (s[(v - 20) % 10] || s[v] || s[0])}, ${year}`;
}

function getSourceThumbnail(sourceUrl) {
  const url = new URL(sourceUrl);
  const domain = url.hostname
    .replace("rivet.iu", "rivet.ui")
    .replace(/\./g, "_");
  const path = url.pathname.endsWith("/")
    ? url.pathname.substring(1, url.pathname.length - 1).replace(/\//g, "-")
    : url.pathname.substring(1, url.pathname.length).replace(/\//g, "-");
  return `https://pzdzoelitkqizxopmwfg.supabase.co/storage/v1/object/public/screenshots/${domain}/${path}-chromium.png`;
}

exports.createResolvers = async ({
  cache,
  store,
  actions,
  createResolvers,
  createNodeId,
}) => {
  await createResolvers({
    KickstartDsGlossaryPage: {
      image: {
        type: "File",
        async resolve(source, args, context) {
          if (source.image) {
            const image = await context.nodeModel.findOne({
              query: {
                filter: { id: { eq: source.image } },
                fields: { localFile: { ne: "" } },
              },
              type: "ContentfulAsset",
            });

            if (image && image.fields && image.fields.localFile) {
              return await context.nodeModel.findOne({
                query: {
                  filter: {
                    id: { eq: image.fields.localFile },
                    publicURL: { ne: "" },
                  },
                },
                type: "File",
              });
            } else {
              console.log(
                "Missing ContentfulAsset `image`",
                image,
                source.image,
                source.id
              );
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
                  publicURL: { ne: "" },
                },
              },
              type: "File",
            });

            const site = await context.nodeModel.findOne({
              query: {},
              type: "Site",
            });

            if (fileNode && site) {
              return fileNode &&
                fileNode.__gatsby_resolved &&
                fileNode.__gatsby_resolved.publicURL
                ? `${site.siteMetadata.siteUrl}${fileNode.__gatsby_resolved.publicURL}`
                : undefined;
            } else {
              console.log(
                "Missing File or Site for `imageUrl`",
                fileNode,
                site,
                source.id
              );
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
              query: {
                filter: { id: { eq: source.cardImage } },
                fields: { localFile: { ne: "" } },
              },
              type: "ContentfulAsset",
            });

            if (image && image.fields && image.fields.localFile) {
              return await context.nodeModel.findOne({
                query: {
                  filter: {
                    id: { eq: image.fields.localFile },
                    publicURL: { ne: "" },
                  },
                },
                type: "File",
              });
            } else {
              console.log(
                "Missing ContentfulAsset `image`",
                image,
                source.image,
                source.id
              );
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
            const glossaryJson = { ...source.glossary };

            if (source.glossary.tags && source.glossary.tags.length > 0) {
              glossaryJson.tags = await Promise.all(
                source.glossary.tags.map(async (tagId) => {
                  const contentfulTag = await context.nodeModel.findOne({
                    query: {
                      filter: {
                        id: { eq: tagId },
                      },
                    },
                    type: "ContentfulTag",
                  });

                  if (contentfulTag) {
                    return {
                      label: contentfulTag.title,
                      link: `/tags/${contentfulTag.slug}`,
                      type: "tag-label",
                    };
                  } else {
                    console.log(
                      "Missing ContentfulTag `glossary`",
                      contentfulTag,
                      tagId,
                      source.glossary.tags,
                      source.id
                    );
                    return undefined;
                  }
                })
              );
            }

            if (source.glossary.related && source.glossary.related.length > 0) {
              glossaryJson.related = await Promise.all(
                source.glossary.related.map(async (relatedId) => {
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
                      url: `/glossary/${contentfulTerm.slug}`,
                      excerpt: `${JSON.parse(
                        contentfulTerm.definition.raw
                      ).content[0].content[0].value.substring(0, 300)} …`,
                      title: contentfulTerm.name,
                      typeLabel: "Glossary",
                    };

                    if (contentfulTerm.cover___NODE) {
                      const contentfulImage = await context.nodeModel.findOne({
                        query: {
                          filter: { id: { eq: contentfulTerm.cover___NODE } },
                          fields: { localFile: { ne: "" } },
                        },
                        type: "ContentfulAsset",
                      });

                      related.image___NODE =
                        contentfulImage.fields.localFile || "";
                    }

                    if (
                      contentfulTerm.tags___NODE &&
                      contentfulTerm.tags___NODE.length > 0
                    ) {
                      related.tags = await Promise.all(
                        contentfulTerm.tags___NODE.map(async (tagId) => {
                          const contentfulTag = await context.nodeModel.findOne(
                            {
                              query: {
                                filter: {
                                  id: { eq: tagId },
                                },
                              },
                              type: "ContentfulTag",
                            }
                          );

                          if (contentfulTag) {
                            return {
                              label: contentfulTag.title,
                              link: `/tags/${contentfulTag.slug}`,
                              type: "tag-label",
                              size: "s",
                            };
                          } else {
                            console.log(
                              "Missing ContentfulTag `showcase`",
                              contentfulTag,
                              tagId,
                              contentfulTerm.tags,
                              source.id
                            );
                            return undefined;
                          }
                        })
                      );
                    }

                    return related;
                  } else {
                    console.log(
                      "Missing ContentfulAsset / ContentfulTerm for `glossary` related",
                      contentfulTerm,
                      contentfulImage,
                      source.id,
                      source.glossary.related
                    );
                    return undefined;
                  }
                })
              );
            }

            if (source.image) {
              const contentfulImage = await context.nodeModel.findOne({
                query: {
                  filter: { id: { eq: source.image } },
                  fields: { localFile: { ne: "" } },
                },
                type: "ContentfulAsset",
              });

              if (
                contentfulImage &&
                contentfulImage.fields &&
                contentfulImage.fields.localFile
              ) {
                glossaryJson.cover = {
                  src___NODE: contentfulImage.fields.localFile,
                  caption: contentfulImage.description,
                };
              } else {
                console.log(
                  "Missing ContentfulAsset `glossary` image",
                  contentfulImage,
                  source.image,
                  source.id
                );
              }
            }

            if (source.glossary.media && source.glossary.media.length > 0) {
              glossaryJson.media = await Promise.all(
                source.glossary.media.map(async (mediaId) => {
                  const contentfulAsset = await context.nodeModel.findOne({
                    query: {
                      filter: { id: { eq: mediaId } },
                      fields: { localFile: { ne: "" } },
                    },
                    type: "ContentfulAsset",
                  });

                  if (contentfulAsset) {
                    return {
                      src___NODE: contentfulAsset.fields.localFile,
                      caption: contentfulAsset.description,
                    };
                  } else {
                    console.log(
                      "Missing ContentfulAssets `appearance` media",
                      contentfulAsset,
                      source.glossary.media,
                      source.id
                    );
                  }
                })
              );
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
                  relativePath: { eq: "img/contact.svg" },
                  publicURL: { ne: "" },
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

            glossaryJson.type = "glossary";

            return hashObjectKeys(glossaryJson, "glossary");
          }

          return undefined;
        },
      },
    },
    KickstartDsAppearancePage: {
      image: {
        type: "File",
        async resolve(source, args, context) {
          if (source.image) {
            const image = await context.nodeModel.findOne({
              query: {
                filter: { id: { eq: source.image } },
                fields: { localFile: { ne: "" } },
              },
              type: "ContentfulAsset",
            });

            if (image && image.fields && image.fields.localFile) {
              return await context.nodeModel.findOne({
                query: {
                  filter: {
                    id: { eq: image.fields.localFile },
                    publicURL: { ne: "" },
                  },
                },
                type: "File",
              });
            } else {
              console.log(
                "Missing ContentfulAsset `image`",
                image,
                source.image,
                source.id
              );
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
                  publicURL: { ne: "" },
                },
              },
              type: "File",
            });

            const site = await context.nodeModel.findOne({
              query: {},
              type: "Site",
            });

            if (fileNode && site) {
              return fileNode &&
                fileNode.__gatsby_resolved &&
                fileNode.__gatsby_resolved.publicURL
                ? `${site.siteMetadata.siteUrl}${fileNode.__gatsby_resolved.publicURL}`
                : undefined;
            } else {
              console.log(
                "Missing File or Site for `imageUrl`",
                fileNode,
                site,
                source.id
              );
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
              query: {
                filter: { id: { eq: source.cardImage } },
                fields: { localFile: { ne: "" } },
              },
              type: "ContentfulAsset",
            });

            if (image && image.fields && image.fields.localFile) {
              return await context.nodeModel.findOne({
                query: {
                  filter: {
                    id: { eq: image.fields.localFile },
                    publicURL: { ne: "" },
                  },
                },
                type: "File",
              });
            } else {
              console.log(
                "Missing ContentfulAsset `image`",
                image,
                source.image,
                source.id
              );
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
            const appearanceJson = { ...source.appearance };

            if (source.appearance.tags && source.appearance.tags.length > 0) {
              appearanceJson.tags = await Promise.all(
                source.appearance.tags.map(async (tagId) => {
                  const contentfulTag = await context.nodeModel.findOne({
                    query: {
                      filter: {
                        id: { eq: tagId },
                      },
                    },
                    type: "ContentfulTag",
                  });

                  if (contentfulTag) {
                    return {
                      label: contentfulTag.title,
                      link: `/tags/${contentfulTag.slug}`,
                      type: "tag-label",
                    };
                  } else {
                    console.log(
                      "Missing ContentfulTag `appearance`",
                      contentfulTag,
                      tagId,
                      source.appearance.tags,
                      source.id
                    );
                    return undefined;
                  }
                })
              );
            }

            if (
              source.appearance.related &&
              source.appearance.related.length > 0
            ) {
              appearanceJson.related = await Promise.all(
                source.appearance.related.map(async (relatedId) => {
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
                      url: `/appearances/${contentfulAppearance.slug}`,
                      excerpt: contentfulAppearance.excerpt.raw,
                      title: contentfulAppearance.title,
                      typeLabel: "Appearance",
                    };

                    if (contentfulAppearance.cover___NODE) {
                      const contentfulImage = await context.nodeModel.findOne({
                        query: {
                          filter: {
                            id: { eq: contentfulAppearance.cover___NODE },
                          },
                          fields: { localFile: { ne: "" } },
                        },
                        type: "ContentfulAsset",
                      });

                      related.image___NODE =
                        contentfulImage.fields.localFile || "";
                    }

                    if (
                      contentfulAppearance.tags___NODE &&
                      contentfulAppearance.tags___NODE.length > 0
                    ) {
                      related.tags = await Promise.all(
                        contentfulAppearance.tags___NODE.map(async (tagId) => {
                          const contentfulTag = await context.nodeModel.findOne(
                            {
                              query: {
                                filter: {
                                  id: { eq: tagId },
                                },
                              },
                              type: "ContentfulTag",
                            }
                          );

                          if (contentfulTag) {
                            return {
                              label: contentfulTag.title,
                              link: `/tags/${contentfulTag.slug}`,
                              type: "tag-label",
                              size: "s",
                            };
                          } else {
                            console.log(
                              "Missing ContentfulTag `appearance`",
                              contentfulTag,
                              tagId,
                              contentfulAppearance.tags,
                              source.id
                            );
                            return undefined;
                          }
                        })
                      );
                    }

                    return related;
                  } else {
                    console.log(
                      "Missing ContentfulAsset / ContentfulAppearance for `appearance` related",
                      contentfulTerm,
                      contentfulImage,
                      source.id,
                      source.appearance.related
                    );
                    return undefined;
                  }
                })
              );
            }

            if (source.image) {
              const contentfulImage = await context.nodeModel.findOne({
                query: {
                  filter: { id: { eq: source.image } },
                  fields: { localFile: { ne: "" } },
                },
                type: "ContentfulAsset",
              });

              if (
                contentfulImage &&
                contentfulImage.fields &&
                contentfulImage.fields.localFile
              ) {
                appearanceJson.cover = {
                  src___NODE: contentfulImage.fields.localFile,
                  caption: contentfulImage.description,
                };
              } else {
                console.log(
                  "Missing ContentfulAsset `appearance` image",
                  contentfulImage,
                  source.image,
                  source.id
                );
              }
            }

            if (source.appearance.media && source.appearance.media.length > 0) {
              appearanceJson.media = await Promise.all(
                source.appearance.media.map(async (mediaId) => {
                  const contentfulAsset = await context.nodeModel.findOne({
                    query: {
                      filter: { id: { eq: mediaId } },
                      fields: { localFile: { ne: "" } },
                    },
                    type: "ContentfulAsset",
                  });

                  if (contentfulAsset) {
                    return {
                      src___NODE: contentfulAsset.fields.localFile,
                      caption: contentfulAsset.description,
                    };
                  } else {
                    console.log(
                      "Missing ContentfulAssets `appearance` media",
                      contentfulAsset,
                      source.appearance.media,
                      source.id
                    );
                  }
                })
              );
            }

            if (
              source.appearance.participants &&
              source.appearance.participants.length > 0
            ) {
              appearanceJson.participants = await Promise.all(
                source.appearance.participants.map(async (personId) => {
                  const contentfulPerson = await context.nodeModel.findOne({
                    query: {
                      filter: {
                        id: { eq: personId },
                      },
                    },
                    type: "ContentfulPerson",
                  });

                  if (contentfulPerson) {
                    const participant = {
                      name: contentfulPerson.name,
                      title: contentfulPerson.role,
                      type: "person",
                    };

                    if (contentfulPerson.avatar___NODE) {
                      const contentfulImage = await context.nodeModel.findOne({
                        query: {
                          filter: {
                            id: { eq: contentfulPerson.avatar___NODE },
                          },
                          fields: { localFile: { ne: "" } },
                        },
                        type: "ContentfulAsset",
                      });

                      participant.avatar___NODE =
                        contentfulImage.fields.localFile || "";
                    }

                    return participant;
                  } else {
                    console.log(
                      "Missing ContentfulPerson for `participants`",
                      contentfulPerson,
                      source.appearance.participants,
                      source.id
                    );
                  }
                })
              );
            }

            appearanceJson.type = "appearance";

            return hashObjectKeys(appearanceJson, "appearance");
          }

          return undefined;
        },
      },
    },
    KickstartDsShowcasePage: {
      image: {
        type: "File",
        async resolve(source, args, context) {
          if (source.image) {
            const image = await context.nodeModel.findOne({
              query: {
                filter: { id: { eq: source.image } },
                fields: { localFile: { ne: "" } },
              },
              type: "ContentfulAsset",
            });

            if (image && image.fields && image.fields.localFile) {
              return await context.nodeModel.findOne({
                query: {
                  filter: {
                    id: { eq: image.fields.localFile },
                    publicURL: { ne: "" },
                  },
                },
                type: "File",
              });
            } else {
              console.log(
                "Missing ContentfulAsset `image`",
                image,
                source.image,
                source.id
              );
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
                  publicURL: { ne: "" },
                },
              },
              type: "File",
            });

            const site = await context.nodeModel.findOne({
              query: {},
              type: "Site",
            });

            if (fileNode && site) {
              return fileNode &&
                fileNode.__gatsby_resolved &&
                fileNode.__gatsby_resolved.publicURL
                ? `${site.siteMetadata.siteUrl}${fileNode.__gatsby_resolved.publicURL}`
                : undefined;
            } else {
              console.log(
                "Missing File or Site for `imageUrl`",
                fileNode,
                site,
                source.id
              );
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
              query: {
                filter: { id: { eq: source.cardImage } },
                fields: { localFile: { ne: "" } },
              },
              type: "ContentfulAsset",
            });

            if (image && image.fields && image.fields.localFile) {
              return await context.nodeModel.findOne({
                query: {
                  filter: {
                    id: { eq: image.fields.localFile },
                    publicURL: { ne: "" },
                  },
                },
                type: "File",
              });
            } else {
              console.log(
                "Missing ContentfulAsset `image`",
                image,
                source.image,
                source.id
              );
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
            const showcaseJson = { ...source.showcase };

            if (source.showcase.tags && source.showcase.tags.length > 0) {
              showcaseJson.tags = await Promise.all(
                source.showcase.tags.map(async (tagId) => {
                  const contentfulTag = await context.nodeModel.findOne({
                    query: {
                      filter: {
                        id: { eq: tagId },
                      },
                    },
                    type: "ContentfulTag",
                  });

                  if (contentfulTag) {
                    return {
                      label: contentfulTag.title,
                      link: `/tags/${contentfulTag.slug}`,
                      type: "tag-label",
                    };
                  } else {
                    console.log(
                      "Missing ContentfulTag `showcase`",
                      contentfulTag,
                      tagId,
                      source.showcase.tags,
                      source.id
                    );
                    return undefined;
                  }
                })
              );
            }

            if (source.showcase.related && source.showcase.related.length > 0) {
              showcaseJson.related = await Promise.all(
                source.showcase.related.map(async (relatedId) => {
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
                      url: `/showcases/${contentfulShowcase.slug}`,
                      excerpt: contentfulShowcase.excerpt.raw,
                      title: contentfulShowcase.title,
                      typeLabel: "Showcase",
                    };

                    if (contentfulShowcase.cover___NODE) {
                      const contentfulImage = await context.nodeModel.findOne({
                        query: {
                          filter: {
                            id: { eq: contentfulShowcase.cover___NODE },
                          },
                          fields: { localFile: { ne: "" } },
                        },
                        type: "ContentfulAsset",
                      });

                      related.image___NODE =
                        contentfulImage.fields.localFile || "";
                    }

                    if (
                      contentfulShowcase.tags___NODE &&
                      contentfulShowcase.tags___NODE.length > 0
                    ) {
                      related.tags = await Promise.all(
                        contentfulShowcase.tags___NODE.map(async (tagId) => {
                          const contentfulTag = await context.nodeModel.findOne(
                            {
                              query: {
                                filter: {
                                  id: { eq: tagId },
                                },
                              },
                              type: "ContentfulTag",
                            }
                          );

                          if (contentfulTag) {
                            return {
                              label: contentfulTag.title,
                              link: `/tags/${contentfulTag.slug}`,
                              type: "tag-label",
                              size: "s",
                            };
                          } else {
                            console.log(
                              "Missing ContentfulTag `showcase`",
                              contentfulTag,
                              tagId,
                              contentfulShowcase.tags,
                              source.id
                            );
                            return undefined;
                          }
                        })
                      );
                    }

                    return related;
                  } else {
                    console.log(
                      "Missing ContentfulAsset / ContentfulShowcase for `showcase` related",
                      contentfulTerm,
                      contentfulImage,
                      source.id,
                      source.showcase.related
                    );
                    return undefined;
                  }
                })
              );
            }

            if (source.image) {
              const contentfulImage = await context.nodeModel.findOne({
                query: {
                  filter: { id: { eq: source.image } },
                  fields: { localFile: { ne: "" } },
                },
                type: "ContentfulAsset",
              });

              if (
                contentfulImage &&
                contentfulImage.fields &&
                contentfulImage.fields.localFile
              ) {
                showcaseJson.cover = {
                  src___NODE: contentfulImage.fields.localFile,
                  caption: contentfulImage.description,
                };
              } else {
                console.log(
                  "Missing ContentfulAsset `showcase` image",
                  contentfulImage,
                  source.image,
                  source.id
                );
              }
            }

            if (source.showcase.media && source.showcase.media.length > 0) {
              showcaseJson.media = await Promise.all(
                source.showcase.media.map(async (mediaId) => {
                  const contentfulAsset = await context.nodeModel.findOne({
                    query: {
                      filter: { id: { eq: mediaId } },
                      fields: { localFile: { ne: "" } },
                    },
                    type: "ContentfulAsset",
                  });

                  if (contentfulAsset) {
                    return {
                      src___NODE: contentfulAsset.fields.localFile,
                      mode: [".svg", ".jpg", ".png", ".jpeg", ".webp"].includes(
                        path.extname(contentfulAsset.url)
                      )
                        ? "image"
                        : "video",
                      caption: contentfulAsset.description,
                    };
                  } else {
                    console.log(
                      "Missing ContentfulAssets `showcase` media",
                      contentfulAsset,
                      source.showcase.media,
                      source.id
                    );
                  }
                })
              );
            }

            if (source.showcase.quote) {
              const quote = {
                text: source.showcase.quote.text,
                source: source.showcase.quote.source,
                quoteToggle: source.showcase.quote.quoteToggle,
              };

              if (source.showcase.quote.image___NODE) {
                const contentfulImage = await context.nodeModel.findOne({
                  query: {
                    filter: { id: { eq: source.showcase.quote.image___NODE } },
                    fields: { localFile: { ne: "" } },
                  },
                  type: "ContentfulAsset",
                });

                if (
                  contentfulImage &&
                  contentfulImage.fields &&
                  contentfulImage.fields.localFile
                ) {
                  quote.image___NODE = contentfulImage.fields.localFile;
                } else {
                  console.log(
                    "Missing ContentfulAsset `showcase` image",
                    contentfulImage,
                    source.image,
                    source.id
                  );
                }
              }

              if (source.showcase.quote.byline) {
                quote.byline = source.showcase.quote.byline;
              }

              showcaseJson.quote = quote;
            }

            showcaseJson.type = "showcase";

            return hashObjectKeys(showcaseJson, "showcase");
          }

          return undefined;
        },
      },
    },
    KickstartDsTagPage: {
      description: {
        type: "String",
        async resolve(source, args, context) {
          const keyword = source.title;
          const url = `/${source.slug}`;

          const supabaseUrl = process.env["GATSBY_SUPABASE_URL"];
          const supabaseServiceKey = process.env["GATSBY_SUPABASE_ANON_KEY"];
          const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

          const options = {
            body: {
              documents: [],
              keyword: keyword,
              url: url,
            },
          };

          const { data } = await supabaseClient.functions.invoke(
            "description",
            options
          );

          return data?.text || "";
        },
      },
      image: {
        type: "File",
        async resolve(source, args, context) {
          if (source.image) {
            const image = await context.nodeModel.findOne({
              query: {
                filter: { id: { eq: source.image } },
                fields: { localFile: { ne: "" } },
              },
              type: "ContentfulAsset",
            });

            if (image && image.fields && image.fields.localFile) {
              return await context.nodeModel.findOne({
                query: {
                  filter: {
                    id: { eq: image.fields.localFile },
                    publicURL: { ne: "" },
                  },
                },
                type: "File",
              });
            } else {
              console.log(
                "Missing ContentfulAsset `image`",
                image,
                source.image,
                source.id
              );
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
                  publicURL: { ne: "" },
                },
              },
              type: "File",
            });

            const site = await context.nodeModel.findOne({
              query: {},
              type: "Site",
            });

            if (fileNode && site) {
              return fileNode &&
                fileNode.__gatsby_resolved &&
                fileNode.__gatsby_resolved.publicURL
                ? `${site.siteMetadata.siteUrl}${fileNode.__gatsby_resolved.publicURL}`
                : undefined;
            } else {
              console.log(
                "Missing File or Site for `imageUrl`",
                fileNode,
                site,
                source.id
              );
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
              query: {
                filter: { id: { eq: source.cardImage } },
                fields: { localFile: { ne: "" } },
              },
              type: "ContentfulAsset",
            });

            if (image && image.fields && image.fields.localFile) {
              return await context.nodeModel.findOne({
                query: {
                  filter: {
                    id: { eq: image.fields.localFile },
                    publicURL: { ne: "" },
                  },
                },
                type: "File",
              });
            } else {
              console.log(
                "Missing ContentfulAsset `image`",
                image,
                source.image,
                source.id
              );
              return undefined;
            }
          }

          return undefined;
        },
      },
      tagLabel: {
        type: "TagLabelComponent!",
        async resolve(source, args, context) {
          if (source.tagLabel) {
            const tagLabelJson = source.tagLabel;

            return hashObjectKeys(tagLabelJson, "tag-label");
          }

          return undefined;
        },
      },
      external: {
        type: "[RelatedComponent!]",
        async resolve(source, args, context) {
          const externalContent = [];

          const keyword = source.title;
          const url = `/${source.slug}`;

          const supabaseUrl = process.env["GATSBY_SUPABASE_URL"];
          const supabaseServiceKey = process.env["GATSBY_SUPABASE_ANON_KEY"];
          const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

          const options = {
            body: {
              documents: [],
              keyword: keyword,
              url: url,
            },
          };

          const { data } = await supabaseClient.functions.invoke(
            "description",
            options
          );

          if (
            data &&
            data.externalSections &&
            data.externalSections.length > 0
          ) {
            const reducedPages = data.externalSections.reduce(
              (pages, pageSection) => {
                const source = pages.find(
                  (source) => source.page_url === pageSection.page_url
                );

                if (!source) {
                  pages.push({
                    page_url: pageSection.page_url,
                    page_title: pageSection.page_title,
                    page_summary: pageSection.page_summary,
                  });
                }

                return pages;
              },
              []
            );

            const { createNode } = actions;

            externalContent.push(
              ...(await Promise.all(
                reducedPages.slice(0, 3).map(async (page) => {
                  let fileNode;
                  try {
                    fileNode = await createRemoteFileNode({
                      url: getSourceThumbnail(page.page_url),
                      parentNodeId: source.id,
                      createNode,
                      createNodeId,
                      cache,
                      store,
                    });
                  } catch (err) {
                    console.error(
                      `[createResolvers] error in fetching remote image ${source.url}:`,
                      err
                    );
                  }

                  const related = {
                    url: page.page_url,
                    excerpt: page.page_summary.substring(0, 200),
                    title: page.page_title,
                    typeLabel: "External",
                    type: "related",
                    tags: [
                      {
                        label: "External",
                        link: `/tags/design-system`,
                        type: "tag-label",
                        size: "s",
                      },
                      {
                        label: source.title,
                        link: `/${source.slug}`,
                        type: "tag-label",
                        size: "s",
                      },
                    ],
                  };

                  if (fileNode && fileNode.id) {
                    related.image___NODE = fileNode.id;
                  }

                  return hashObjectKeys(related, "related");
                })
              ))
            );
          }

          return externalContent;
        },
      },
      related: {
        type: "[RelatedComponent!]",
        async resolve(source, args, context) {
          const relatedContent = [];

          const { entries: wpPosts } = await context.nodeModel.findAll({
            query: {
              filter: {
                tags: {
                  nodes: { elemMatch: { name: { eq: source.title } } },
                },
              },
            },
            type: "WpPost",
          });

          if (wpPosts) {
            relatedContent.push(
              ...(await Promise.all(
                Array.from(wpPosts).map(async (post) => {
                  const related = {
                    url: `/blog/${post.slug}`,
                    excerpt: `${stripHtml(post.excerpt).result.substring(
                      0,
                      200
                    )}`,
                    title: post.title,
                    typeLabel: "Blog",
                    type: "related",
                  };

                  if (
                    post.featuredImage &&
                    post.featuredImage.node &&
                    post.featuredImage.node.id
                  ) {
                    const image = await context.nodeModel.findOne({
                      query: {
                        filter: {
                          parent: { id: { eq: post.featuredImage.node.id } },
                          publicURL: { ne: "" },
                        },
                      },
                      type: "File",
                    });
                    related.image___NODE = image.id;
                  }

                  if (
                    post.tags &&
                    post.tags.nodes &&
                    post.tags.nodes.length > 0
                  ) {
                    related.tags = await Promise.all(
                      post.tags.nodes.map(async (tagId) => {
                        const wpTag = await context.nodeModel.findOne({
                          query: {
                            filter: {
                              id: { eq: tagId.id },
                            },
                          },
                          type: "WpTag",
                        });

                        if (wpTag && wpTag.name) {
                          const contentfulTag = await context.nodeModel.findOne(
                            {
                              query: {
                                filter: {
                                  title: { eq: wpTag.name },
                                },
                              },
                              type: "ContentfulTag",
                            }
                          );

                          if (contentfulTag && contentfulTag.title) {
                            return {
                              label: contentfulTag.title,
                              link: `/tags/${contentfulTag.slug}/`,
                              type: "tag-label",
                            };
                          } else {
                            console.log(
                              "Missing ContentfulTag for `tags`",
                              contentfulTag,
                              wpTag,
                              source.tags,
                              source.id
                            );
                            return undefined;
                          }
                        } else {
                          console.log(
                            "Missing WpTag for `tags`",
                            wpTag,
                            source.tags,
                            source.id
                          );
                          return undefined;
                        }
                      })
                    );
                  }

                  return hashObjectKeys(related, "related");
                })
              ))
            );
          }

          if (source.related && source.related.length > 0) {
            relatedContent.push(
              ...(await Promise.all(
                source.related.map(async (relatedObject) => {
                  if (relatedObject.type === "ContentfulTerm") {
                    const relatedTerm = await context.nodeModel.findOne({
                      query: {
                        filter: {
                          id: { eq: relatedObject.id },
                        },
                      },
                      type: "ContentfulTerm",
                    });

                    if (relatedTerm) {
                      const related = {
                        url: `/glossary/${relatedTerm.slug}`,
                        excerpt: `${JSON.parse(
                          relatedTerm.definition.raw
                        ).content[0].content[0].value.substring(0, 300)}`,
                        title: relatedTerm.name,
                        typeLabel: "Glossary",
                        type: "related",
                      };

                      if (relatedTerm.cover___NODE) {
                        const contentfulImage = await context.nodeModel.findOne(
                          {
                            query: {
                              filter: {
                                id: { eq: relatedTerm.cover___NODE },
                              },
                              fields: { localFile: { ne: "" } },
                            },
                            type: "ContentfulAsset",
                          }
                        );

                        related.image___NODE =
                          contentfulImage.fields.localFile || "";
                      }

                      if (
                        relatedTerm.tags___NODE &&
                        relatedTerm.tags___NODE.length > 0
                      ) {
                        related.tags = await Promise.all(
                          relatedTerm.tags___NODE.map(async (tagId) => {
                            const contentfulTag =
                              await context.nodeModel.findOne({
                                query: {
                                  filter: {
                                    id: { eq: tagId },
                                  },
                                },
                                type: "ContentfulTag",
                              });

                            if (contentfulTag) {
                              return {
                                label: contentfulTag.title,
                                link: `/tags/${contentfulTag.slug}`,
                                type: "tag-label",
                                size: "s",
                              };
                            } else {
                              console.log(
                                "Missing ContentfulTag `showcase`",
                                contentfulTag,
                                tagId,
                                relatedTerm.tags,
                                source.id
                              );
                              return undefined;
                            }
                          })
                        );
                      }

                      return hashObjectKeys(related, "related");
                    } else {
                      console.log(
                        "Missing ContentfulTerm `related`",
                        relatedTerm,
                        tagId,
                        source.glossary.tags,
                        source.id
                      );
                      return undefined;
                    }
                  } else if (relatedObject.type === "ContentfulAppearance") {
                    const relatedAppearance = await context.nodeModel.findOne({
                      query: {
                        filter: {
                          id: { eq: relatedObject.id },
                        },
                      },
                      type: "ContentfulAppearance",
                    });

                    if (relatedAppearance) {
                      const related = {
                        url: `/appearances/${relatedAppearance.slug}`,
                        excerpt: relatedAppearance.excerpt.raw,
                        title: relatedAppearance.title,
                        typeLabel: "Appearance",
                        type: "related",
                      };

                      if (relatedAppearance.cover___NODE) {
                        const contentfulImage = await context.nodeModel.findOne(
                          {
                            query: {
                              filter: {
                                id: { eq: relatedAppearance.cover___NODE },
                              },
                              fields: { localFile: { ne: "" } },
                            },
                            type: "ContentfulAsset",
                          }
                        );

                        related.image___NODE =
                          contentfulImage.fields.localFile || "";
                      }

                      if (
                        relatedAppearance.tags___NODE &&
                        relatedAppearance.tags___NODE.length > 0
                      ) {
                        related.tags = await Promise.all(
                          relatedAppearance.tags___NODE.map(async (tagId) => {
                            const contentfulTag =
                              await context.nodeModel.findOne({
                                query: {
                                  filter: {
                                    id: { eq: tagId },
                                  },
                                },
                                type: "ContentfulTag",
                              });

                            if (contentfulTag) {
                              return {
                                label: contentfulTag.title,
                                link: `/tags/${contentfulTag.slug}`,
                                type: "tag-label",
                                size: "s",
                              };
                            } else {
                              console.log(
                                "Missing ContentfulTag `showcase`",
                                contentfulTag,
                                tagId,
                                relatedAppearance.tags,
                                source.id
                              );
                              return undefined;
                            }
                          })
                        );
                      }

                      return hashObjectKeys(related, "related");
                    } else {
                      console.log(
                        "Missing ContentfulTerm `related`",
                        relatedTerm,
                        tagId,
                        source.glossary.tags,
                        source.id
                      );
                      return undefined;
                    }
                  } else if (relatedObject.type === "ContentfulShowcase") {
                    const relatedShowcase = await context.nodeModel.findOne({
                      query: {
                        filter: {
                          id: { eq: relatedObject.id },
                        },
                      },
                      type: "ContentfulShowcase",
                    });

                    if (relatedShowcase) {
                      const related = {
                        url: `/showcases/${relatedShowcase.slug}`,
                        excerpt: relatedShowcase.excerpt.raw,
                        title: relatedShowcase.title,
                        typeLabel: "Showcase",
                        type: "related",
                      };

                      if (relatedShowcase.cover___NODE) {
                        const contentfulImage = await context.nodeModel.findOne(
                          {
                            query: {
                              filter: {
                                id: { eq: relatedShowcase.cover___NODE },
                              },
                              fields: { localFile: { ne: "" } },
                            },
                            type: "ContentfulAsset",
                          }
                        );

                        related.image___NODE =
                          contentfulImage.fields.localFile || "";
                      }

                      if (
                        relatedShowcase.tags___NODE &&
                        relatedShowcase.tags___NODE.length > 0
                      ) {
                        related.tags = await Promise.all(
                          relatedShowcase.tags___NODE.map(async (tagId) => {
                            const contentfulTag =
                              await context.nodeModel.findOne({
                                query: {
                                  filter: {
                                    id: { eq: tagId },
                                  },
                                },
                                type: "ContentfulTag",
                              });

                            if (contentfulTag) {
                              return {
                                label: contentfulTag.title,
                                link: `/tags/${contentfulTag.slug}`,
                                type: "tag-label",
                                size: "s",
                              };
                            } else {
                              console.log(
                                "Missing ContentfulTag `showcase`",
                                contentfulTag,
                                tagId,
                                relatedShowcase.tags,
                                source.id
                              );
                              return undefined;
                            }
                          })
                        );
                      }

                      return hashObjectKeys(related, "related");
                    } else {
                      console.log(
                        "Missing ContentfulTerm `related`",
                        relatedTerm,
                        tagId,
                        source.glossary.tags,
                        source.id
                      );
                      return undefined;
                    }
                  } else {
                    console.log(
                      "Missing ContentfulEntry `related`",
                      source.related,
                      source.id
                    );
                    return undefined;
                  }
                })
              ))
            );
          }

          const documents = relatedContent.reduce((acc, cur) => {
            acc.push({
              url: cur.url__7c2a,
              excerpt: stripHtml(documentToHtmlString(cur.excerpt__b377)),
              title: cur.title__d9bc,
              type: cur.typeLabel__3922,
            });
            return acc;
          }, []);

          const keyword = source.title;
          const url = `/${source.slug}`;

          const supabaseUrl = process.env["GATSBY_SUPABASE_URL"];
          const supabaseServiceKey = process.env["GATSBY_SUPABASE_ANON_KEY"];
          const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

          const options = {
            body: {
              documents: documents,
              keyword: keyword,
              url: url,
            },
          };

          const { data } = await supabaseClient.functions.invoke(
            "description",
            options
          );

          if (
            data &&
            data.kickstartdsSections &&
            data.kickstartdsSections.length > 0
          ) {
            const reducedPages = data.kickstartdsSections.reduce(
              (pages, pageSection) => {
                const source = pages.find(
                  (source) => source.page_url === pageSection.page_url
                );

                if (!source) {
                  pages.push({
                    page_url: pageSection.page_url,
                    page_title: pageSection.page_title,
                    page_summary: pageSection.page_summary,
                  });
                }

                return pages;
              },
              []
            );

            const { createNode } = actions;

            relatedContent.push(
              ...(await Promise.all(
                reducedPages.slice(0, 3).map(async (page) => {
                  let fileNode;
                  try {
                    fileNode = await createRemoteFileNode({
                      url: getSourceThumbnail(page.page_url),
                      parentNodeId: source.id,
                      createNode,
                      createNodeId,
                      cache,
                      store,
                    });
                  } catch (err) {
                    console.error(
                      `[createResolvers] error in fetching remote image ${source.url}:`,
                      err
                    );
                  }

                  const related = {
                    url: page.page_url,
                    excerpt: page.page_summary.substring(0, 200),
                    title: page.page_title,
                    typeLabel: "Docs",
                    type: "related",
                    tags: [
                      {
                        label: "Documentation",
                        link: `/tags/documentation`,
                        type: "tag-label",
                        size: "s",
                      },
                      {
                        label: "kickstartDS",
                        link: `/tags/kickstartds`,
                        type: "tag-label",
                        size: "s",
                      },
                      {
                        label: source.title,
                        link: `/${source.slug}`,
                        type: "tag-label",
                        size: "s",
                      },
                    ],
                  };

                  if (fileNode && fileNode.id) {
                    related.image___NODE = fileNode.id;
                  }

                  return hashObjectKeys(related, "related");
                })
              ))
            );
          }

          return relatedContent;
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

  if (node.internal.type === "ContentfulTerm") {
    const kickstartDSPageId = createNodeId(
      `${node.id} >>> KickstartDsGlossaryPage`
    );

    const page = {
      id: kickstartDSPageId,
      slug: `glossary/${node.slug}`,
      layout: "glossary",

      title: node.name,
      description: stripHtml(node.definition.raw).result,

      created: node.createdAt,
      updated: node.updatedAt,

      glossary: {
        term: node.name,
        definition: node.definition.raw,
        stackshare: node.stackShareDecision,
        tags:
          (node.tags___NODE &&
            node.tags___NODE.length > 0 &&
            node.tags___NODE) ||
          [],
        related:
          (node.related___NODE &&
            node.related___NODE.length > 0 &&
            node.related___NODE) ||
          [],
      },

      parent: node.id,
    };

    if (node.cover___NODE) {
      page.image = node.cover___NODE;
      page.cardImage = node.cover___NODE;
    }

    if (node.media___NODE) {
      page.glossary.media = node.media___NODE;
    }

    page.internal = {
      contentDigest: createContentDigest(page),
      content: JSON.stringify(page),
      type: "KickstartDsGlossaryPage",
      description: `Contentful glossary implementation of the kickstartDS glossary page interface`,
    };

    createNode(page);
    createParentChildLink({ parent: node, child: getNode(kickstartDSPageId) });
  } else if (node.internal.type === "ContentfulAppearance") {
    const kickstartDSPageId = createNodeId(
      `${node.id} >>> KickstartDsAppearancePage`
    );

    const page = {
      id: kickstartDSPageId,
      slug: `appearances/${node.slug}`,
      layout: "appearance",

      title: node.title,
      description: stripHtml(node.description.raw).result,

      created: node.createdAt,
      updated: node.updatedAt,
      date: new Date(node.date),

      appearance: {
        link: node.link,
        title: node.title,
        description: node.description.raw,
        excerpt: node.excerpt.raw,
        host: {
          name: node.hostName,
          url: node.hostUrl,
        },
        language: node.language,
        participants:
          (node.participants___NODE &&
            node.participants___NODE.length > 0 &&
            node.participants___NODE) ||
          [],
        date: getOrdinal(new Date(node.date)),
        tags:
          (node.tags___NODE &&
            node.tags___NODE.length > 0 &&
            node.tags___NODE) ||
          [],
        related:
          (node.related___NODE &&
            node.related___NODE.length > 0 &&
            node.related___NODE) ||
          [],
        overviewPage: "/appearances/",
      },

      parent: node.id,
    };

    if (node.cover___NODE) {
      page.image = node.cover___NODE;
      page.cardImage = node.cover___NODE;
    }

    if (node.media___NODE) {
      page.appearance.media = node.media___NODE;
    }

    page.internal = {
      contentDigest: createContentDigest(page),
      content: JSON.stringify(page),
      type: "KickstartDsAppearancePage",
      description: `Contentful appearance implementation of the kickstartDS appearance page interface`,
    };

    createNode(page);
    createParentChildLink({ parent: node, child: getNode(kickstartDSPageId) });
  } else if (node.internal.type === "ContentfulShowcase") {
    const kickstartDSPageId = createNodeId(
      `${node.id} >>> KickstartDsShowcasePage`
    );

    const page = {
      id: kickstartDSPageId,
      slug: `showcases/${node.slug}`,
      layout: "showcase",

      title: node.title,
      description: stripHtml(node.description.raw).result,

      created: node.createdAt,
      updated: node.updatedAt,

      showcase: {
        link: node.link,
        title: node.title,
        description: node.description.raw,
        summary: node.summary.raw,
        excerpt: node.excerpt.raw,
        tags:
          (node.tags___NODE &&
            node.tags___NODE.length > 0 &&
            node.tags___NODE) ||
          [],
        related:
          (node.related___NODE &&
            node.related___NODE.length > 0 &&
            node.related___NODE) ||
          [],
        overviewPage: "/showcases/",
      },

      parent: node.id,
    };

    if (node.cover___NODE) {
      page.image = node.cover___NODE;
      page.cardImage = node.cover___NODE;
    }

    if (node.media___NODE) {
      page.showcase.media = node.media___NODE;
    }

    if (
      node.testimonial_visible &&
      node.testimonial_text &&
      node.testimonial_source
    ) {
      page.showcase.quote = {
        quoteToggle: node.testimonial_visible,
        text: node.testimonial_text.raw,
        source: node.testimonial_source,
      };

      if (node.testimonial_byline)
        page.showcase.quote.byline = node.testimonial_byline;
      if (node.testimonial_image___NODE)
        page.showcase.quote.image___NODE = node.testimonial_image___NODE;
    }

    page.internal = {
      contentDigest: createContentDigest(page),
      content: JSON.stringify(page),
      type: "KickstartDsShowcasePage",
      description: `Contentful showcase implementation of the kickstartDS showcase page interface`,
    };

    createNode(page);
    createParentChildLink({ parent: node, child: getNode(kickstartDSPageId) });
  } else if (node.internal.type === "ContentfulTag") {
    const kickstartDSPageId = createNodeId(`${node.id} >>> KickstartDsTagPage`);

    const page = {
      id: kickstartDSPageId,
      slug: `tags/${node.slug}`,
      layout: "tag-label",

      title: node.title,
      description: "",

      created: node.createdAt,
      updated: node.updatedAt,

      tagLabel: {
        label: node.title,
        size: "l",
        removable: false,
      },
      related: [],

      parent: node.id,
    };

    if (node.appearance___NODE && node.appearance___NODE.length > 0) {
      page.related = page.related.concat(
        node.appearance___NODE.map((id) => {
          return { id, type: "ContentfulAppearance" };
        })
      );
    }

    if (node.term___NODE && node.term___NODE.length > 0) {
      page.related = page.related.concat(
        node.term___NODE.map((id) => {
          return { id, type: "ContentfulTerm" };
        })
      );
    }

    if (node.showcase___NODE && node.showcase___NODE.length > 0) {
      page.related = page.related.concat(
        node.showcase___NODE.map((id) => {
          return { id, type: "ContentfulShowcase" };
        })
      );
    }

    page.internal = {
      contentDigest: createContentDigest(page),
      content: JSON.stringify(page),
      type: "KickstartDsTagPage",
      description: `Contentful tag implementation of the kickstartDS tag page interface`,
    };

    createNode(page);
    createParentChildLink({ parent: node, child: getNode(kickstartDSPageId) });
  }
};
