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

// TODO dedupe this
const hashObjectKeys = (obj, outerComponent) => {
  const hashedObj = {};

  if (!obj) return obj;

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
          } else if (outerComponent === 'post-head' && property === 'categories') {
            return hashObjectKeys(item, 'tag-label');
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

const slash = (path) => {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path);

  if (isExtendedLengthPath) {
    return path;
  }
  return path.replace(/\\/g, `/`);
};

const findMatchingFile = (src, files, options) => {
  const result = files.find((file) => {
    const staticPath = slash(path.join(options.staticFolderName, src));
    return slash(path.normalize(file.absolutePath)).endsWith(staticPath);
  });
  if (!result) {
    throw new Error(
      `No matching file found for src "${src}" in static folder "${options.staticFolderName}". Please check static folder name and that file exists at "${options.staticFolderName}${src}". This error will probably cause a "GraphQLDocumentError" later in build. All converted field paths MUST resolve to a matching file in the "static" folder.`
    );
  }
  return result;
};

exports.onCreateNode = async ({ node, actions, getNode, getNodesByType, createNodeId, createContentDigest, store, cache }) => {
  const { createNode, createParentChildLink } = actions;
  const files = getNodesByType('File');

  const addImages = (obj, parentId) => {
    return Promise.all(Object.keys(obj).map((property) => {
      if (Array.isArray(obj[property])) {
        return Promise.all(obj[property].map((item) => {
          return addImages(item, parentId);
        }));
      } else if (typeof obj[property] === 'object') {
        return addImages(obj[property], parentId);
      } else {
        if (typeof obj[property] === 'string' && (obj[property].indexOf('http') > -1) && (
          property.indexOf('src') > -1 || 
          property.indexOf('image') > -1 || 
          property.indexOf('source') > -1 || 
          property.indexOf('srcMobile') > -1 || 
          property.indexOf('srcTable') > -1 || 
          property.indexOf('srcMobile') > -1 || 
          property.indexOf('backgroundImage') > -1
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
              delete obj[property];
              if (file) {
                obj[`${property}___NODE`] = file.id;
                resolve();
              } else {
                reject();
              }
            });
          });
        } else if (typeof obj[property] === 'string' && (obj[property].indexOf('http') === -1) && (
          obj[property].indexOf('.') > -1 && (
            obj[property].indexOf('jpg') > -1 ||
            obj[property].indexOf('jpeg') > -1 ||
            obj[property].indexOf('png') > -1 ||
            obj[property].indexOf('gif') > -1 || 
            obj[property].indexOf('svg') > -1
          )) && (
            property.indexOf('src') > -1 || 
            property.indexOf('image') > -1 || 
            property.indexOf('source') > -1 || 
            property.indexOf('srcMobile') > -1 || 
            property.indexOf('srcTable') > -1 || 
            property.indexOf('srcMobile') > -1 || 
            property.indexOf('backgroundImage') > -1
          )
        ) {
          const file = findMatchingFile(obj[property], files, { staticFolderName: 'static' });
          delete obj[property];
          obj[`${property}___NODE`] = file.id;

          return Promise.resolve();
        } else if (typeof obj[property] === 'string' && (obj[property] === "") && (
          property.indexOf('src') > -1 || 
          property.indexOf('image') > -1 || 
          property.indexOf('source') > -1 || 
          property.indexOf('srcMobile') > -1 || 
          property.indexOf('srcTable') > -1 || 
          property.indexOf('srcMobile') > -1 || 
          property.indexOf('backgroundImage') > -1
        )) {
          delete obj[property];
          return Promise.resolve();
        } else {
          return Promise.resolve();
        }
      }
    }));
  };

  if (node.internal.type === 'MarkdownRemark' && node.frontmatter && node.frontmatter.id) {
    const kickstartDSPageId = createNodeId(`${node.id} >>> KickstartDsNetlifyCMSPage`);
    delete node.frontmatter.id;

    node.frontmatter.sections = node.frontmatter.sections.map((section) => hashObjectKeys(section, 'section'));
    await Promise.all(node.frontmatter.sections.map(async (section) => await addImages(section, kickstartDSPageId)));

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
