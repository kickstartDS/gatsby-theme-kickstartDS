const chunk = require(`lodash/chunk`)

module.exports = async ({ actions, graphql }) => {
  const perPage = 5;

  const { data } = await graphql(/* GraphQL */ `
    {
      allKickstartDsPage {
        nodes {
          id
          date(formatString: "D. MMMM YYYY", locale: "de")
          title
          description
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
        }
      }
    }
  `);

  const chunkedContentNodes = chunk(data.allKickstartDsPage.nodes, perPage)

  await Promise.all(
    chunkedContentNodes.map(async (nodesChunk, index) => {
      await actions.createPage({
        component: require.resolve('../src/templates/list.js'),
        path: `list/`,
        context: { props: data },
      })
    })
  )
}
