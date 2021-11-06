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
// const slash = (path) => {
//   const isExtendedLengthPath = /^\\\\\?\\/.test(path);

//   if (isExtendedLengthPath) {
//     return path;
//   }
//   return path.replace(/\\/g, `/`);
// };

// const findMatchingFile = (src, files, options) => {
//   const result = files.find((file) => {
//     const staticPath = slash(path.join(options.staticFolderName, src));
//     return slash(path.normalize(file.absolutePath)).endsWith(staticPath);
//   });
//   if (!result) {
//     throw new Error(
//       `No matching file found for src "${src}" in static folder "${options.staticFolderName}". Please check static folder name and that file exists at "${options.staticFolderName}${src}". This error will probably cause a "GraphQLDocumentError" later in build. All converted field paths MUST resolve to a matching file in the "static" folder.`
//     );
//   }
//   return result;
// };

exports.onCreateNode = async ({ node, actions, getNode, getNodesByType, createNodeId, createContentDigest, store, cache }) => {
  // const { createNode, createParentChildLink } = actions;
  // const files = getNodesByType('File');

  if (node.internal.type === 'Mdx') {
    // const kickstartDSPageId = createNodeId(`${node.id} >>> KickstartDsMdxPage`);
    // delete node.frontmatter.id;

    // node.frontmatter.sections = node.frontmatter.sections.map((section) => hashObjectKeys(section, 'section'));
    // await Promise.all(node.frontmatter.sections.map(async (section) => await addImages(section, kickstartDSPageId)));

    // const fileNode = getNode(node.parent);
    // const page = {
    //   id: kickstartDSPageId,
    //   parent: node.id,
    //   updated: fileNode.modifiedTime,
    //   created: fileNode.birthTime,
    //   ...node.frontmatter
    // };

    // page.internal = {
    //   contentDigest: createContentDigest(page),
    //   content: JSON.stringify(page),
    //   type: 'KickstartDsMdxPage',
    //   description: `Markdown Mdx implementation of the kickstartDS page interface`,
    // };

    // createNode(page);
    // createParentChildLink({ parent: node, child: getNode(kickstartDSPageId) });
  }
};
