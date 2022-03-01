const stripHtml = require('string-strip-html').stripHtml;
const { collectGraphQLFragments } = require('../src/util/collectGraphQLFragments');
const { cleanObjectKeys } = require('@kickstartds/jsonschema2graphql/build/dehashing');

module.exports = async ({ actions, graphql }, options) => {
  const { gqlPath } = options;

  const { data } = await graphql(/* GraphQL */ `
    ${await collectGraphQLFragments([
      'SectionComponentDeepNesting',
    ], gqlPath)}
    {
      allKickstartDsBlogPage {
        edges {
          node {
            slug
            title
            excerpt
            created
            author
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
            categories {
              ...TagLabelComponentDeepNesting
            }
            sections {
              ...SectionComponentDeepNesting
            }
            postAside {
              ...PostAsideComponentDeepNesting
            }
          }
        }
      }
    }
  `);

  const postTeaser = data.allKickstartDsBlogPage.edges.map((page, index) => {
    const teaser = {
      "date": page.node.created,
      "link": {
        "href": `/${page.node.slug}`,
        "label": "read more..."
      },
      "title": stripHtml(page.node.title).result,
      "body": `${stripHtml(page.node.excerpt).result}`,
      "categories": page.node.categories && page.node.categories.length ? page.node.categories.map((category) => cleanObjectKeys(category)) : [],
      "index": index,
      "meta": {
        ...cleanObjectKeys(page.node.postAside).meta,
        "author": {
          "name": cleanObjectKeys(page.node.postAside).author.title,
          "image": {
            ...cleanObjectKeys(page.node.postAside).author.image,
            "className": "c-post-meta__avatar",
          },
        },
      },
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
    path: `/blog/`,
    context: {
      page: {
        // TODO remove at a later time, currently used to have posts generated, but not on the list
        postTeaser: postTeaser.filter((teaser) => !teaser.categories.some((category) => category.label === 'Internal')),
        title: 'Blog – releases, updates, background info // kickstartDS',
        layout: 'blog-list',
        description: 'Read about the latest updates and changes, our rationale behind decisions and how to apply a Design System on our blog',
      },
    },
  });
}
