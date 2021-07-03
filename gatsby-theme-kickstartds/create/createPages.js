const GatsbyParser = require('gatsby/dist/query/file-parser').default;

/**
 * Collect all graphql fragments from a directory
 * @see https://github.com/gatsbyjs/gatsby/issues/12155#issuecomment-618424527
 */
const collectGraphQLFragments = async (fragmentNamesToExtract) => {
  const parser = new GatsbyParser();
  const result = await parser.parseFile(path.resolve(__dirname, '../fragments.js'));

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

module.exports = async ({ actions, graphql }) => {
  const { data } = await graphql(/* GraphQL */ `
    ${await collectGraphQLFragments([
      'SectionComponentDeepNesting',
    ])}
    {
      allKickstartDsPage {
        edges {
          node {
            slug
            sections {
              ...SectionComponentDeepNesting
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
        path: page.node.slug,
        context: {
          page: page.node
        },
      });
    })
  )
}
