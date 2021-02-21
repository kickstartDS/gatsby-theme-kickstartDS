const { resolve } = require(`path`)
const chunk = require(`lodash/chunk`)

module.exports = async ({ actions, graphql }, options) => {
  const perPage = 5;

  const { data } = await graphql(/* GraphQL */ `
    {
      allKickstartDsPost {
        nodes {
          title
          id
        }
      }
    }
  `)

  console.log('data', data);

  const chunkedContentNodes = chunk(data.allKickstartDsPost.nodes, perPage)

  await Promise.all(
    chunkedContentNodes.map(async (nodesChunk, index) => {
      const firstNode = nodesChunk[0]

      console.log('createPage', index);

      await actions.createPage({
        component: resolve(`./src/templates/archive.js`),
        path: `kickstartdspage/${index + 1}/`,
        context: { data },
      })
    })
  )
}
