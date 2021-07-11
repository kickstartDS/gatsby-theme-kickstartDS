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
          // TODO re-simplify this... only needed because of inconsistent hashing on sub-types / picture
          if (outerComponent === 'logo-tiles') {
            return hashObjectKeys(item, 'picture');
          } else {
            return hashObjectKeys(item, outerComponent === 'section' ? item[typeResolutionField] : outerComponent);
          }
        });
      } else if (typeof obj[property] === 'object') {
        // TODO re-simplify this... only needed because of inconsistent hashing on sub-types / link-button
        const outer = outerComponent === 'section' ? obj[property][typeResolutionField] : outerComponent;
        if (outer === 'storytelling' && property === 'link') {
          hashedObj[hashFieldName(property, outerComponent)] = hashObjectKeys(obj[property], 'link-button');
        } else {
          hashedObj[hashFieldName(property, outerComponent)] = hashObjectKeys(obj[property], outer);
        }
      } else {
        hashedObj[hashFieldName(property, outerComponent === 'section' ? 'section' : outerComponent)] = obj[property];
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
