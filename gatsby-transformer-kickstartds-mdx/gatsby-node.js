const { createRemoteFileNode } = require("gatsby-source-filesystem");
const path = require('path');
const hashObjectKeys = require('@kickstartds/jsonschema2graphql/build/helpers').hashObjectKeys;

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type KickstartDsMdxPage implements Node & KickstartDsPage @dontInfer {
      id: ID!
      layout: String!
      title: String!
      description: String
      keywords: String
      image: File @link(from: "image___NODE")
      cardImage: File @link(from: "cardImage___NODE")
      slug: String!
      sections: [SectionComponent]
      components: [ContentComponent]
      updated: Date! @dateformat
      created: Date! @dateformat
    }
  `);
};

// TODO dedupe (-> wordpress)
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

  if (node.internal.type === 'MarkdownRemark' && node.frontmatter && node.frontmatter.id && false) {
    const kickstartDSPageId = createNodeId(`${node.id} >>> KickstartDsNetlifyCMSPage`);
    delete node.frontmatter.id;

    node.frontmatter.sections = node.frontmatter.sections.map((section) => hashObjectKeys(section, 'section'));
    await Promise.all(node.frontmatter.sections.map(async (section) => await addImages(section, kickstartDSPageId)));

    const fileNode = getNode(node.parent);
    const page = {
      id: kickstartDSPageId,
      parent: node.id,
      updated: fileNode.modifiedTime,
      created: fileNode.birthTime,
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
