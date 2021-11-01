const { collectGraphQLFragments } = require('../src/util/collectGraphQLFragments');

module.exports = async ({ actions, graphql }, options) => {
  const { gqlPath } = options;

  // TODO dedupe the components fragments below, this should not be necessary!
  const { data } = await graphql(/* GraphQL */ `
    ${await collectGraphQLFragments([
      'SectionComponentDeepNesting',
    ], gqlPath)}
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
              ...ButtonComponentDeepNesting,
              ...CheckboxComponentDeepNesting,
              ...CheckboxGroupComponentDeepNesting,
              ...CollapsibleBoxComponentDeepNesting,
              ...ContactComponentDeepNesting,
              ...ContentBoxComponentDeepNesting,
              ...CountUpComponentDeepNesting,
              ...CtaComponentDeepNesting,
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
              ...ToggleComponentDeepNesting,
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
      await actions.createPage({
        component: require.resolve('../src/templates/page.js'),
        path: page.node.slug,
        context: {
          page: page.node,
        },
      });
    })
  )
}
