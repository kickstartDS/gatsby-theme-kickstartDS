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
      kickstartDsHeader {
        component {
          ...HeaderComponentDeepNesting
        }
      }
      kickstartDsFooter {
        component {
          ...FooterComponentDeepNesting
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

        await actions.createPage({
          component: require.resolve("../src/templates/page.js"),
          path: page.node.slug,
          context: {
            page: {
              header: cleanObjectKeys(data.kickstartDsHeader.component),
              footer: cleanObjectKeys(data.kickstartDsFooter.component),
              ...page.node,
            },
          },
        });
      }
    })
  );
};
