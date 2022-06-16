const { collectGraphQLFragments } = require('../src/util/collectGraphQLFragments');
// TODO re-activate: this is the entry point for usage based component metrics
// const { analyzeContent } = require('@kickstartds/gatsby-theme-kickstartds/src/helpers/componentAnalytics');

module.exports = async ({ actions, graphql }, options) => {
  const { gqlPath } = options;

  // TODO dedupe the components fragments below, this should not be necessary!
  const { data } = await graphql(/* GraphQL */ `
    ${await collectGraphQLFragments([
      'SectionComponentDeepNesting',
      'HeaderComponentDeepNesting',
      'FooterComponentDeepNesting',
    ], gqlPath)}
    {
      allKickstartDsPage {
        edges {
          node {
            slug
            layout
            header {
              ...HeaderComponentDeepNesting
            }
            footer {
              ...FooterComponentDeepNesting
            }
            sections {
              ...SectionComponentDeepNesting
            }
            components {
              ...ButtonComponentDeepNesting,
              ...CheckboxComponentDeepNesting,
              ...CheckboxGroupComponentDeepNesting,
              ...CollapsibleBoxComponentDeepNesting,
              ...ContactComponentDeepNesting,
              ...ContentBoxComponentDeepNesting,
              ...CountUpComponentDeepNesting,
              ...DividerComponentDeepNesting,
              ...GlossaryComponentDeepNesting,
              ...HeadlineComponentDeepNesting,
              ...HtmlComponentDeepNesting,
              ...IconComponentDeepNesting,
              ...InputComponentDeepNesting,
              ...LightboxLazyImageComponentDeepNesting,
              ...LinkButtonComponentDeepNesting,
              ...LogoTilesComponentDeepNesting,
              ...NewsItemComponentDeepNesting,
              ...PictureComponentDeepNesting,
              ...PostHeadComponentDeepNesting,
              ...PostTeaserComponentDeepNesting,
              ...QuoteComponentDeepNesting,
              ...QuotesSliderComponentDeepNesting,
              ...RadioComponentDeepNesting,
              ...RadioGroupComponentDeepNesting,
              ...SelectFieldComponentDeepNesting,
              ...SliderComponentDeepNesting,
              ...StorytellingComponentDeepNesting,
              ...TableComponentDeepNesting,
              ...TagLabelComponentDeepNesting,
              ...TeaserBoxComponentDeepNesting,
              ...TeaserComponentDeepNesting,
              ...TeaserRowComponentDeepNesting,
              ...TextAreaComponentDeepNesting,
              ...TextFieldComponentDeepNesting,
              ...TextMediaComponentDeepNesting,
              ...VisualComponentDeepNesting,
              ...VisualSlidePreviewComponentDeepNesting,
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
    }
  `);

  await Promise.all(
    data.allKickstartDsPage.edges.map(async (page) => {
      if (!(page.node.slug.includes('blog') || page.node.slug.includes('glossary'))) {
        // TODO re-activate: this is the entry point for usage based component metrics
        // await analyzeContent(page.node.slug, page.node.sections, true);

        await actions.createPage({
          component: require.resolve('../src/templates/page.js'),
          path: page.node.slug,
          context: {
            page: page.node,
          },
        });
      }
    })
  )
}
