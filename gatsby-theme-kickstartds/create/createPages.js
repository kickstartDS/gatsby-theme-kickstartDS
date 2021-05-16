const slugify = require('slugify');

module.exports = async ({ actions, graphql }) => {
  const { data } = await graphql(/* GraphQL */ `
    {
      allKickstartDsPage {
        edges {
          node {
            id
            title
            heading
            content {
              background
              gutter
              mode
              spaceAfter
              spaceBefore
              space_after
              space_before
              type
              width
              headline {
                align
                content
                level
                pageHeader
                spaceAfter
                subheadline
              }
              content {
                ... on ContentBoxSchema {
                  topic
                  alignement
                  type
                  text
                  ratio
                  image
                }
                ... on CountUpSchema {
                  topic
                  text
                  to
                  link {
                    className
                    dataComponent
                    fillAnimation
                    href
                    iconAfter
                    iconAnimation
                    iconBefore
                    label
                    newTab
                    variant
                    size
                    icon {
                      className
                      icon
                      role
                    }
                  }
                  icon {
                    className
                    icon
                    role
                  }
                }
                text
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
