const stripHtml = require("string-strip-html").stripHtml;
const {
  collectGraphQLFragments,
} = require("../src/util/collectGraphQLFragments");
const {
  cleanObjectKeys,
} = require("@kickstartds/jsonschema2graphql/build/dehashing");

module.exports = async ({ actions, graphql }, options) => {
  const { gqlPath } = options;

  const { data } = await graphql(/* GraphQL */ `
    ${await collectGraphQLFragments(
      [
        "AppearanceComponentDeepNesting",
        "HeaderComponentDeepNesting",
        "FooterComponentDeepNesting",
      ],
      gqlPath
    )}
    {
      allKickstartDsAppearancePage {
        edges {
          node {
            title
            description
            keywords
            slug
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
            cardImage {
              childImageSharp {
                gatsbyImageData
              }
            }
            appearance {
              ...AppearanceComponentDeepNesting
            }
          }
        }
      }
      allKickstartDsHeader {
        edges {
          node {
            component {
              ...HeaderComponentDeepNesting
            }
          }
        }
      }
      allKickstartDsFooter {
        edges {
          node {
            component {
              ...FooterComponentDeepNesting
            }
          }
        }
      }
    }
  `);

  const appearanceTeaser = data.allKickstartDsAppearancePage.edges.map(
    (page, index) => {
      const cleaned = cleanObjectKeys(page.node.appearance);

      const teaser = {
        date: cleaned.date,
        link: {
          href: `/${page.node.slug}`,
          label: "Details...",
        },
        title: stripHtml(page.node.title).result,
        body: `${stripHtml(cleaned.description).result}`,
        categories:
          cleaned.participants?.length > 0
            ? cleaned.participants.map((participant) => {
                return {
                  label: participant.name,
                  size: "m",
                  type: "tag-label",
                };
              })
            : [],
        index: index,
        type: "post-teaser",
      };

      if (page.node.image) {
        teaser.image = {
          src: page.node.image,
          width: 400,
          height: 300,
        };
      }

      return teaser;
    }
  );

  const headerEn = data.allKickstartDsHeader.edges.find(
    (header) => !header.node.component.activeEntry__254f.includes("de")
  );
  const header = cleanObjectKeys(headerEn.node.component);

  const footerEn = data.allKickstartDsFooter.edges.find(
    (footer) =>
      !footer.node.component.sections__17ac[1].headline__b113.includes(
        "Kontakt"
      )
  );
  const footer = cleanObjectKeys(footerEn.node.component);

  await actions.createPage({
    component: require.resolve("../src/templates/page.js"),
    path: `/appearances/`,
    context: {
      page: {
        // TODO remove at a later time, currently used to have posts generated, but not on the list
        appearanceTeaser: appearanceTeaser
          .filter(
            (teaser) =>
              !teaser.categories.some(
                (category) => category.label === "Internal"
              )
          )
          .sort((a, b) => new Date(b.date) - new Date(a.date)),
        title:
          "Appearances – kickstartDS on podcasts, webinars, events, etc // kickstartDS",
        layout: "appearance-list",
        description:
          "Find our appearances on different formats. This includes podcast episodes, live streams, YouTube recordings, hosted webinars, etc.",
        header,
        footer,
      },
    },
  });
};
