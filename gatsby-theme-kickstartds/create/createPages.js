const slugify = require('slugify');

module.exports = async ({ actions, graphql }) => {
  const { data } = await graphql(/* GraphQL */ `
    {
      allKickstartDsPage {
        nodes {
          id
          layout
          keyvisual {
            background_color
            small
            media {
              mode
              image {
                src_mobile
                src_tablet
                src_desktop
              }
            }
            box {
              enabled
              inbox
              indent
              headline
              text
              link {
                link_button_text
                button__outline_inverted
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
