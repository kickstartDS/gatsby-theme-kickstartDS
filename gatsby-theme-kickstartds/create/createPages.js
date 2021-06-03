const slugify = require('slugify');

module.exports = async ({ actions, graphql }) => {
  const { data } = await graphql(/* GraphQL */ `
    {
      allKickstartDsPage {
        edges {
          node {
            content {
              content {
                ...CountUpComponentDeepNesting
                ...ContentBoxComponentDeepNesting
              }
            }
          }
        }
      }
    }
  `)

  await Promise.all(
    data.allKickstartDsPage.edges.map(async (page) => {
      await actions.createPage({
        component: require.resolve('../src/templates/page.js'),
        path: `page/${slugify(page.node.heading)}`,
        context: {
          page: page.node
        },
      });
    })
  )
}
