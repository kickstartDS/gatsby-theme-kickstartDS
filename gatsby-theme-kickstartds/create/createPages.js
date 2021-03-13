const slugify = require('slugify');

module.exports = async ({ actions, graphql }) => {
  const { data } = await graphql(/* GraphQL */ `
    {
      allKickstartDsPage {
        nodes {
          id
          layout
          keyvisual {
            backgroundColor
            small
            media {
              mode
              image {
                srcMobile
                srcTablet
                srcDesktop
              }
            }
            box {
              enabled
              inbox
              indent
              headline
              text
              link {
                linkButtonText
                buttonOutlineInverted
              }
              horizontal
              vertical
              style
            }
          }
          heading
          content {
            type
          }
        }
      }
    }
  `)

  await Promise.all(
    data.allKickstartDsPage.nodes.map(async (page) => {
      await actions.createPage({
        component: require.resolve('../src/templates/page.js'),
        path: `page/${slugify(page.heading)}`,
        context: {
          page
        },
      });
    })
  )
}
