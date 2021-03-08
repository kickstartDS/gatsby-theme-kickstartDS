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
        }
      }
    }
  `)

  await Promise.all(
    data.allKickstartDsPage.nodes.map(async (page) => {
      // console.log('page', page);

      /*await actions.createPage({
        component: require.resolve('../src/templates/page.js'),
        path: `page/${index}`,
        context: { props: page },
      })*/

      /*const id = edge.node.id
      console.log('edge', edge);
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.layout)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })*/
    })
  )
}
