const { resolve } = require(`path`)
const chunk = require(`lodash/chunk`)

module.exports = async ({ actions, graphql }, options) => {
  const perPage = 5;

  const { data } = await graphql(/* GraphQL */ `
    {
      allKickstartDsPost {
        nodes {
          id
          image
          date(formatString: "D. MMMM YYYY", locale: "de")
          link
          title
          body
        }
      }
    }
  `)

  const chunkedContentNodes = chunk(data.allKickstartDsPost.nodes, perPage)

  await Promise.all(
    chunkedContentNodes.map(async (nodesChunk, index) => {
      await actions.createPage({
        component: require.resolve('../src/templates/list.js'),
        path: `blog/`,
        context: { props: data },
      })
    })
  )
}
