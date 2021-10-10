const GatsbyParser = require('gatsby/dist/query/file-parser').default;
const stripHtml = require('string-strip-html').stripHtml;

/**
 * Collect all graphql fragments from a directory
 * @see https://github.com/gatsbyjs/gatsby/issues/12155#issuecomment-618424527
 */
const collectGraphQLFragments = async (fragmentNamesToExtract, gqlPath) => {
  const parser = new GatsbyParser();
  const result = await parser.parseFile(`${gqlPath}/page.fragments.js`);

  const collectFromSpreads = (fragment) => fragment.selectionSet.selections
    .flatMap((item) => item.selectionSet ? item.selectionSet.selections : [])
    .filter((item) => item.kind === 'FragmentSpread')
    .map((spread) => spread.name.value);

  const getNestedFragments = (fragment, allFragments) => {
    const collectedFragmentNames = collectFromSpreads(fragment);
    const collectedFragments = allFragments.filter((fragment) => {
      return collectedFragmentNames.includes(fragment.name.value);
    });

    if (collectedFragments.length === 0) {
      return [];
    } else {
      return collectedFragments.concat(
        collectedFragments.flatMap((collectedFragment) => getNestedFragments(collectedFragment, allFragments))
      );
    }
  };

  const allFragments = result
    .filter((item) => item.doc && item.doc.kind === "Document")
    .flatMap((document) => document.doc.definitions.filter(
      (def) => def.kind === "FragmentDefinition"
    ) || []);

  const requiredFragments = allFragments
    .filter((fragment) =>
      fragmentNamesToExtract.includes(fragment.name.value)
    );

  const nestedFragments = requiredFragments
    .flatMap((requiredFragment) => getNestedFragments(requiredFragment, allFragments));

  return [...requiredFragments, ...nestedFragments]
    .filter((value, index, self) => self.map(x => x.name.value).indexOf(value.name.value) == index)
    .map(({ loc: { start, end, source: { body } } }) =>
      body.slice(start, end)
    )
    .join("\n");
};

module.exports = async ({ actions, graphql }, options) => {
  const { gqlPath } = options;

  const { data } = await graphql(/* GraphQL */ `
    ${await collectGraphQLFragments([
      'SectionComponentDeepNesting',
    ], gqlPath)}
    {
      allKickstartDsWordpressPage {
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
    "spaceBefore": "none",
    "width": "default",
    "background": "default",
    "headline": {
      "level": "h1",
      "align": "center",
      "content": heading,
      "subheadline": "kickstartDS releases, updates, background info",
      "spaceAfter": "none",
      "type": "headline"
    },
    "spaceAfter": "default",
    "type": "sections",
    "gutter": "default"
  }];

  sections[0].content = data.allKickstartDsWordpressPage.edges.map((page, index) => {
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

  await actions.createPage({
    component: require.resolve('../src/templates/page.js'),
    path: `/blog/`,
    context: {
      page: {
        sections
      },
      title: 'Blog list'
    },
  });
}
