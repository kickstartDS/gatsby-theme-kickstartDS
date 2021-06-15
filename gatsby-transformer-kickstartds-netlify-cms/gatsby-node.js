const hashFieldName = require('@kickstartds/jsonschema2graphql/build/schemaReducer').hashFieldName;
const typeResolutionField = 'internalType';

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type KickstartDsNetlifyCMSPage implements Node & KickstartDsPage @dontInfer {
      id: ID!
      layout: String!
      heading: String!
      description: String
      title: String
      date: Date @dateformat
      content: [SectionComponent]
    }
  `);
};

const hashObjectKeys = (obj) => {
  const hashedObj = {};

  Object.keys(obj).forEach((property) => {
    if (property === typeResolutionField) {
      hashedObj[typeResolutionField] = obj[typeResolutionField];
    } else {
      if (Array.isArray(obj[property])) {
        hashedObj[hashFieldName(property, obj[typeResolutionField])] = obj[property].map((item) => {
          return hashObjectKeys(item);
        });
      } else if (typeof obj[property] === 'object') {
        hashedObj[hashFieldName(property, obj[typeResolutionField])] = hashObjectKeys(obj[property])
      } else {
        hashedObj[hashFieldName(property, obj[typeResolutionField])] = obj[property];
      }
    }
  });

  return hashedObj;
};

exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;

  if (node.internal.type === 'MarkdownRemark' && node.frontmatter && node.frontmatter.Id) {
    const kickstartDSPageId = createNodeId(`${node.id} >>> KickstartDsNetlifyCMSPage`);
    const parent = getNode(node.parent);

    node.frontmatter.content = node.frontmatter.content.map((section) => hashObjectKeys(section));

    const page = {
      id: kickstartDSPageId,
      title: node.frontmatter.heading,
      description: `${node.frontmatter.heading} page`,
      date: new Date(parent.ctimeMs).toISOString(),
      ...node.frontmatter
    };

    page.internal = {
      contentDigest: createContentDigest(page),
      type: 'KickstartDsNetlifyCMSPage',
    };

    createNode(page);
    createParentChildLink({ parent: node, child: getNode(kickstartDSPageId) });
  }
};
