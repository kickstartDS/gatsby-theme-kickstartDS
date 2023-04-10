const {
  collectGraphQLFragments,
} = require("../src/util/collectGraphQLFragments");
const {
  cleanObjectKeys,
} = require("@kickstartds/jsonschema2graphql/build/dehashing");
// TODO re-activate: this is the entry point for usage based component metrics
// const { analyzeContent } = require('@kickstartds/gatsby-theme-kickstartds/src/helpers/componentAnalytics');

module.exports = async ({ actions, graphql }, options) => {
  const { gqlPath } = options;

  // TODO dedupe the components fragments below, this should not be necessary!
  const { data } = await graphql(/* GraphQL */ `
    ${await collectGraphQLFragments(
      [
        "SectionComponentDeepNesting",
        "HeaderComponentDeepNesting",
        "FooterComponentDeepNesting",
      ],
      gqlPath
    )}
    {
      allKickstartDsPage {
        edges {
          node {
            slug
            layout
            sections {
              ...SectionComponentDeepNesting
            }
            components {
              ...ButtonComponentDeepNesting
              ...CollapsibleBoxComponentDeepNesting
              ...ContactComponentDeepNesting
              ...ContentBoxComponentDeepNesting
              ...CountUpComponentDeepNesting
              ...HeadlineComponentDeepNesting
              ...LinkButtonComponentDeepNesting
              ...LogoTilesComponentDeepNesting
              ...QuoteComponentDeepNesting
              ...QuotesSliderComponentDeepNesting
              ...StorytellingComponentDeepNesting
              ...TagLabelComponentDeepNesting
              ...TeaserBoxComponentDeepNesting
              ...TeaserRowComponentDeepNesting
              ...TextMediaComponentDeepNesting
              ...VisualComponentDeepNesting
              ...VisualSliderComponentDeepNesting
            }
            title
            description
            keywords
            image {
              publicURL
            }
            cardImage {
              publicURL
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

  await Promise.all(
    data.allKickstartDsPage.edges.map(async (page) => {
      if (
        !(
          page.node.slug.includes("blog") || page.node.slug.includes("glossary")
        )
      ) {
        // TODO re-activate: this is the entry point for usage based component metrics
        // await analyzeContent(page.node.slug, page.node.sections, true);

        const headerDe = data.allKickstartDsHeader.edges.find((header) =>
          header.node.component.activeEntry__254f.includes("de")
        );
        const headerEn = data.allKickstartDsHeader.edges.find(
          (header) => !header.node.component.activeEntry__254f.includes("de")
        );

        const header =
          page.node.slug.includes("de/") ||
          page.node.slug === "de" ||
          page.node.slug.includes("ueber-uns")
            ? cleanObjectKeys(headerDe.node.component)
            : cleanObjectKeys(headerEn.node.component);

        const footerDe = data.allKickstartDsFooter.edges.find((footer) =>
          footer.node.component.sections__17ac[1].headline__b113.includes(
            "Kontakt"
          )
        );
        const footerEn = data.allKickstartDsFooter.edges.find(
          (footer) =>
            !footer.node.component.sections__17ac[1].headline__b113.includes(
              "Kontakt"
            )
        );

        const footer =
          page.node.slug.includes("de/") ||
          page.node.slug === "de" ||
          page.node.slug.includes("ueber-uns")
            ? cleanObjectKeys(footerDe.node.component)
            : cleanObjectKeys(footerEn.node.component);

        await actions.createPage({
          component: require.resolve("../src/templates/page.js"),
          path: page.node.slug,
          context: {
            page: {
              header,
              footer,
              ...page.node,
            },
          },
        });
      }
    })
  );
};
