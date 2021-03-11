const chunk = require('lodash/chunk');
const slugify = require('slugify');

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

  // TODO don't think this does anything right now... but it could, I guess? Probably only needs a `perPage` set...
  const chunkedContentNodes = chunk(data.allKickstartDsPage.nodes, perPage)

  // TODO should not be hard-coded
  const keyvisual = {
    "small": true,
    "media": {
      "mode": "image",
      "image": {
        "src-mobile": "/keyvisual.jpg",
        "src-tablet": "/keyvisual.jpg",
        "src-desktop": "/keyvisual.jpg"
      }
    },
    "box": {
      "enabled": false,
      "inbox": false,
      "center": false,
      "top": false,
      "bottom": false,
      "left": false,
      "right": false,
      "light": false,
      "transparent": false,
      "headline": "Lorem Ipsum",
      "text": "Lorem Ipsum",
      "link": {
        "link-button-text": "Button",
        "button--outline-inverted": true
      }
    }
  };

  // TODO should not be hard-coded
  const heading = "Aktuelle Artikel";

  const content = [{
    'news-items':  data.allKickstartDsPage.nodes.map((node) => {
      return {
        image: '/images/dummy/16-9-m.png',
        date: node.date,
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
            keyvisual,
            heading,
            content,
          },
        },
      })
    })
  )
}
