const { fmImagesToRelative } = require('gatsby-remark-relative-source');
const { createRemoteFileNode } = require("gatsby-source-filesystem");
const path = require('path');
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
          } else if (outerComponent === 'quotes-slider') {
            return hashObjectKeys(item, 'quote');
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

exports.onCreateNode = async ({ node, actions, getNode, createNodeId, createContentDigest, store, cache }) => {
  const { createNode, createParentChildLink } = actions;

  const addRemoteImages = (obj, parentId) => {
    return Promise.all(Object.keys(obj).map((property) => {
      if (Array.isArray(obj[property])) {
        return Promise.all(obj[property].map((item) => {
          return addRemoteImages(item, parentId);
        }));
      } else if (typeof obj[property] === 'object') {
        return addRemoteImages(obj[property], parentId);
      } else {
        if (typeof obj[property] === 'string' && (obj[property].indexOf('http') > -1) && (
          property.indexOf('src') > -1 || 
          property.indexOf('image') > -1 || 
          property.indexOf('source') > -1 || 
          property.indexOf('srcMobile') > -1 || 
          property.indexOf('srcTable') > -1 || 
          property.indexOf('srcMobile') > -1
        )) {
          return new Promise((resolve, reject) => {
            const fileNode = createRemoteFileNode({
              url: obj[property],
              parentNodeId: parentId,
              createNode,
              createNodeId,
              cache,
              store,
            });

            fileNode.then((file) => {
              if (file) {
                obj[property] = path.relative(path.join(node.fileAbsolutePath, ".."), file.relativePath);
                resolve();
              } else {
                reject();
              }
            });
          });
        } else {
          return Promise.resolve();
        }
      }
    }));
  };

  fmImagesToRelative(node);
  
  if (node.internal.type === 'MarkdownRemark' && node.frontmatter && node.frontmatter.id) {
    const kickstartDSPageId = createNodeId(`${node.id} >>> KickstartDsNetlifyCMSPage`);
    delete node.frontmatter.id;

    node.frontmatter.sections = node.frontmatter.sections.map((section) => hashObjectKeys(section, 'section'));
    await Promise.all(node.frontmatter.sections.map(async (section) => await addRemoteImages(section, kickstartDSPageId)));

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
