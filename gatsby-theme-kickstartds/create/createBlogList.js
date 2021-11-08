const { collectGraphQLFragments } = require('../src/util/collectGraphQLFragments');
const stripHtml = require('string-strip-html').stripHtml;

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
          }
        }
      }
    }
  `);

  const heading = "Latest blog posts";
  const sections = [{
    "mode": "default",
    "className": "l-section--content-width-narrow",
    "spaceBefore": "none",
    "width": "wide",
    "background": "default",
    "headline": {
      "level": "h1",
      "align": "left",
      "content": heading,
      "subheadline": "kickstartDS releases, updates, background info",
      "spaceAfter": "none",
      "type": "headline"
    },
    "spaceAfter": "default",
    "type": "sections",
    "gutter": "default"
  }];

  sections[0].content = data.allKickstartDsBlogPage.edges.map((page, index) => {
    const teaser = {
      "date": page.node.created,
      "link": {
        "href": `/${page.node.slug}`,
        "label": "read more..."
      },
      "title": stripHtml(page.node.title).result,
      "body": `${stripHtml(page.node.excerpt).result}  \nby *${page.node.author}*`,
      "categories": page.node.categories,
      "index": index,
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

  // TODO remove at a later time, currently used to have posts generated, but not on the list
  sections[0].content = sections[0].content.filter((teaser) => !teaser.link.href.includes('development-focussed'));

  await actions.createPage({
    component: require.resolve('../src/templates/page.js'),
    path: `/blog/`,
    context: {
      page: {
        sections,
        title: 'Blog – releases, updates, background info',
        layout: 'blog-list',
        description: 'Read about the latest updates and changes, our rationale behind decisions and how to apply a Design System on our blog',
      },
    },
  });
}
