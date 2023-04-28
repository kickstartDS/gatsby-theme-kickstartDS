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
        "ShowcaseComponentDeepNesting",
        "HeaderComponentDeepNesting",
        "FooterComponentDeepNesting",
      ],
      gqlPath
    )}
    {
      allKickstartDsShowcasePage {
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
            showcase {
              ...ShowcaseComponentDeepNesting
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

  const showcaseTeaser = data.allKickstartDsShowcasePage.edges.map(
    (page, index) => {
      const teaser = {
        date: cleanObjectKeys(page.node.showcase).date,
        link: {
          href: `/${page.node.slug}`,
          label: "Details...",
        },
        title: stripHtml(page.node.title).result,
        body: cleanObjectKeys(page.node.showcase).excerpt,
        categories: cleanObjectKeys(page.node.showcase).tags.map((tag) => {
          return {
            ...tag,
            size: "m",
            type: "tag-label",
          };
        }),
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
    path: `/showcases/`,
    context: {
      page: {
        // TODO remove at a later time, currently used to have posts generated, but not on the list
        showcaseTeaser: showcaseTeaser.filter(
          (teaser) =>
            !teaser.categories.some((category) => category.label === "Internal")
        ),
        title: "Showcases – projects built on kickstartDS // kickstartDS",
        layout: "showcase-list",
        description: "This includes Design Systems, websites, apps, etc.",
        header,
        footer,
      },
    },
  });
};
