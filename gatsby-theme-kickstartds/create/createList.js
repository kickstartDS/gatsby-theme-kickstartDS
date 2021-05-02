const chunk = require('lodash/chunk');
const slugify = require('slugify');

module.exports = async ({ actions, graphql }) => {
  const perPage = 5;

  const { data } = await graphql(/* GraphQL */ `
    {
      allKickstartDsPage {
        nodes {
          id
          date(formatString: "x")
          title
          description
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
        }
      }
    }
  `);

  // TODO don't think this does anything right now... but it could, I guess? Probably only needs a `perPage` set...
  const chunkedContentNodes = chunk(data.allKickstartDsPage.nodes, perPage)

  // TODO should not be hard-coded
  const heading = "Aktuelle Artikel";

  const content = [{
    'newsItems':  data.allKickstartDsPage.nodes.map((node) => {
      return {
        image: '/images/dummy/16-9-m.png',
        date: parseInt(node.date, 10),
        link: `/page/${slugify(node.heading)}`,
        title: node.title,
        body: node.description,
      };
    }),
    type: 'news-list'
  }];

  await Promise.all(
    chunkedContentNodes.map(async (nodesChunk, index) => {
      await actions.createPage({
        component: require.resolve('../src/templates/page.js'),
        path: `/`,
        context: {
          page: {
            heading,
            content,
          },
        },
      })
    })
  )
}
