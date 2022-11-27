const stripHtml = require('string-strip-html').stripHtml;
const { collectGraphQLFragments } = require('../src/util/collectGraphQLFragments');
const { cleanObjectKeys } = require('@kickstartds/jsonschema2graphql/build/dehashing');

module.exports = async ({ actions, graphql }, options) => {
  const { gqlPath } = options;

  const { data } = await graphql(/* GraphQL */ `
    ${await collectGraphQLFragments([
      'AppearanceComponentDeepNesting',
      'HeaderComponentDeepNesting',
      'FooterComponentDeepNesting',
    ], gqlPath)}
    {
      allKickstartDsAppearancePage {
        edges {
          node {
            title 
            description 
            keywords 
            slug
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
            cardImage {
              childImageSharp {
                gatsbyImageData
              }
            }
            appearance { 
              ...AppearanceComponentDeepNesting 
            } 
          }
        }
      }
      kickstartDsHeader {
        component {
          ...HeaderComponentDeepNesting
        }
      }
      kickstartDsFooter {
        component {
          ...FooterComponentDeepNesting
        }
      }
    }
  `);

  const appearanceTeaser = data.allKickstartDsAppearancePage.edges.map((page, index) => {
    const teaser = {
      "date": cleanObjectKeys(page.node.appearance).date,
      "link": {
        "href": `/${page.node.slug}`,
        "label": "Details..."
      },
      "title": stripHtml(page.node.title).result,
      "body": `${stripHtml(cleanObjectKeys(page.node.appearance).description).result}`,
      "categories": cleanObjectKeys(page.node.appearance).participants.map((participant) => {
        return {
          "label": participant,
          "size": "m",
          "type": "tag-label"
        }
      }),
      "index": index,
      // "meta": {
      //   ...cleanObjectKeys(page.node.postAside).meta,
      //   "author": {
      //     "name": cleanObjectKeys(page.node.postAside).author.title,
      //     "image": {
      //       ...cleanObjectKeys(page.node.postAside).author.image,
      //       "className": "c-post-meta__avatar",
      //     },
      //   },
      // },
      "type": "post-teaser"
    };

    if (page.node.image) {
      teaser.image = {
        "src": page.node.image,
        "width": 400,
        "height": 300
      };
    }

    return teaser;
  });

  await actions.createPage({
    component: require.resolve('../src/templates/page.js'),
    path: `/appearance/`,
    context: {
      page: {
        // TODO remove at a later time, currently used to have posts generated, but not on the list
        postTeaser: appearanceTeaser.filter((teaser) => !teaser.categories.some((category) => category.label === 'Internal')).sort((a, b) => (new Date(b.date) - new Date(a.date))),
        title: 'Appearances – kickstartDS on podcasts, webinars, events, etc // kickstartDS',
        layout: 'appearance-list',
        description: 'Find our appearances on different formats. This includes podcast episodes, live streams, YouTube recordings, hosted webinars, etc.',
        header: cleanObjectKeys(data.kickstartDsHeader.component),
        footer: cleanObjectKeys(data.kickstartDsFooter.component),
      },
    },
  });
}
