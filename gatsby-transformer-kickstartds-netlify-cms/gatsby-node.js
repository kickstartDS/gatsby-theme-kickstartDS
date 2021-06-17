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

const hashObjectKeys = (obj, outerComponent) => {
  const hashedObj = {};

  Object.keys(obj).forEach((property) => {
    if (property === typeResolutionField) {
      hashedObj[typeResolutionField] = obj[typeResolutionField];
    } else {
      if (Array.isArray(obj[property])) {
        hashedObj[hashFieldName(property, outerComponent)] = obj[property].map((item) => {
          return hashObjectKeys(item, outerComponent === 'section' ? item['internalType'] : outerComponent);
        });
      } else if (typeof obj[property] === 'object') {
        // TODO add correct headline-handling
        hashedObj[hashFieldName(property, outerComponent)] = hashObjectKeys(obj[property], outerComponent === 'section' ? obj[property]['internalType'] : property === 'headline' ? 'headline' : outerComponent);
      } else {
        hashedObj[hashFieldName(property, outerComponent)] = obj[property];
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

    node.frontmatter.content = node.frontmatter.content.map((section) => hashObjectKeys(section, 'section'));

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
