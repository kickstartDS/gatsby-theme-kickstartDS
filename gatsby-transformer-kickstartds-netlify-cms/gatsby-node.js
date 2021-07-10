const { fmImagesToRelative } = require('gatsby-remark-relative-source');
const hashFieldName = require('@kickstartds/jsonschema2graphql/build/schemaReducer').hashFieldName;
const typeResolutionField = 'type';

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type KickstartDsNetlifyCMSPage implements Node & KickstartDsPage @dontInfer {
      id: ID!
      layout: String!
      title: String!
      slug: String!
      sections: [SectionComponent]
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
          return hashObjectKeys(item, outerComponent === 'section' ? item[typeResolutionField] : outerComponent);
        });
      } else if (typeof obj[property] === 'object') {
        hashedObj[hashFieldName(property, outerComponent)] = hashObjectKeys(obj[property], obj[property][typeResolutionField] || outerComponent);
      } else {
        hashedObj[hashFieldName(property, outerComponent === 'section' ? 'section' : (obj[typeResolutionField] || outerComponent))] = obj[property];
      }
    }
  });

  return hashedObj;
};

exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;
  fmImagesToRelative(node);
  
  if (node.internal.type === 'MarkdownRemark' && node.frontmatter && node.frontmatter.id) {
    const kickstartDSPageId = createNodeId(`${node.id} >>> KickstartDsNetlifyCMSPage`);
    delete node.frontmatter.id;

    node.frontmatter.sections = node.frontmatter.sections.map((section) => hashObjectKeys(section, 'section'));

    const page = {
      id: kickstartDSPageId,
      parent: node.id,
      ...node.frontmatter
    };

    page.internal = {
      contentDigest: createContentDigest(page),
      content: JSON.stringify(page),
      type: 'KickstartDsNetlifyCMSPage',
      description: `Netlify CMS implementation of the kickstartDS page interface`,
    };

    createNode(page);
    createParentChildLink({ parent: node, child: getNode(kickstartDSPageId) });
  }
};
