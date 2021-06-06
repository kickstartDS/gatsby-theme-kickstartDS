const path = require('path');
const slugify = require('slugify');
const GatsbyParser = require('gatsby/dist/query/file-parser').default;

/**
 * Collect all graphql fragments from a directory
 * @see https://github.com/gatsbyjs/gatsby/issues/12155#issuecomment-618424527
 */
const collectGraphQLFragments = async (fragmentsNamesToExtract) => {
  const parser = new GatsbyParser();
  const result = await parser.parseFile(path.resolve(__dirname, '../fragments.js'));

  return result
    .filter((item) => item.doc && item.doc.kind === "Document")
    .flatMap((file) => {
      const fragments =
        file.doc.definitions.filter(
          (def) => def.kind === "FragmentDefinition"
        ) || [];

      return fragments
        .filter((fragment) =>
          fragmentsNamesToExtract.includes(fragment.name.value)
        )
        .map(({ loc: { start, end, source: { body } } }) =>
          body.slice(start, end)
        );
    })
    .join("\n");
};

module.exports = async ({ actions, graphql }) => {
  const { data } = await graphql(/* GraphQL */ `
    ${await collectGraphQLFragments([
      'CountUpComponentDeepNesting',
      'IconComponentDeepNesting',
      'LinkButtonComponentDeepNesting',
    ])}
    {
      allKickstartDsPage {
        edges {
          node {
            heading
            content {
              content {
                ...CountUpComponentDeepNesting
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
