const path = require("path");
const { createRemoteFileNode } = require("gatsby-source-filesystem");
const hashObjectKeys =
  require("@kickstartds/jsonschema2graphql/build/helpers").hashObjectKeys;

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

exports.onCreateNode = async ({
  node,
  actions,
  getNode,
  getNodesByType,
  createNodeId,
  createContentDigest,
  store,
  cache,
}) => {
  const { createNode, createParentChildLink } = actions;
  const files = getNodesByType("File");

  const addImages = (obj, parentId) => {
    return Promise.all(
      Object.keys(obj).map((property) => {
        if (Array.isArray(obj[property])) {
          return Promise.all(
            obj[property].map((item) => {
              return addImages(item, parentId);
            })
          );
        } else if (typeof obj[property] === "object") {
          return addImages(obj[property], parentId);
        } else {
          if (
            typeof obj[property] === "string" &&
            obj[property].indexOf("http") > -1 &&
            (property.indexOf("src") > -1 ||
              property.indexOf("image") > -1 ||
              property.indexOf("source") > -1 ||
              property.indexOf("srcMobile") > -1 ||
              property.indexOf("srcTable") > -1 ||
              property.indexOf("srcMobile") > -1 ||
              property.indexOf("backgroundImage") > -1 ||
              property.indexOf("cardImage") > -1)
          ) {
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
          } else if (
            typeof obj[property] === "string" &&
            obj[property].indexOf("http") === -1 &&
            obj[property].indexOf(".") > -1 &&
            (obj[property].indexOf("jpg") > -1 ||
              obj[property].indexOf("jpeg") > -1 ||
              obj[property].indexOf("png") > -1 ||
              obj[property].indexOf("gif") > -1 ||
              obj[property].indexOf("svg") > -1) &&
            (property.indexOf("src") > -1 ||
              property.indexOf("image") > -1 ||
              property.indexOf("source") > -1 ||
              property.indexOf("srcMobile") > -1 ||
              property.indexOf("srcTable") > -1 ||
              property.indexOf("srcMobile") > -1 ||
              property.indexOf("backgroundImage") > -1 ||
              property.indexOf("cardImage") > -1)
          ) {
            const file = findMatchingFile(obj[property], files, {
              staticFolderName: "static",
            });
            delete obj[property];
            obj[`${property}___NODE`] = file.id;

            return Promise.resolve();
          } else if (
            typeof obj[property] === "string" &&
            obj[property] === "" &&
            (property.indexOf("src") > -1 ||
              property.indexOf("image") > -1 ||
              property.indexOf("source") > -1 ||
              property.indexOf("srcMobile") > -1 ||
              property.indexOf("srcTable") > -1 ||
              property.indexOf("srcMobile") > -1 ||
              property.indexOf("backgroundImage") > -1 ||
              property.indexOf("cardImage") > -1)
          ) {
            delete obj[property];
            return Promise.resolve();
          } else {
            return Promise.resolve();
          }
        }
      })
    );
  };

  if (
    node.internal.type === "MarkdownRemark" &&
    node.frontmatter &&
    node.frontmatter.id
  ) {
    const kickstartDSPageId = createNodeId(
      `${node.id} >>> KickstartDsContentPage`
    );
    delete node.frontmatter.id;

    node.frontmatter.sections = node.frontmatter.sections.map((section) =>
      hashObjectKeys(section, "section")
    );
    await Promise.all(
      node.frontmatter.sections.map(
        async (section) => await addImages(section, kickstartDSPageId)
      )
    );

    if (node.frontmatter.cardImage || node.frontmatter.image) {
      const imageWrap = {
        cardImage: node.frontmatter.cardImage || node.frontmatter.image,
      };
      await addImages(imageWrap, kickstartDSPageId);

      node.frontmatter.cardImage = imageWrap.cardImage___NODE;
      node.frontmatter.image = imageWrap.cardImage___NODE;
    }

    const fileNode = getNode(node.parent);
    const { slug, layout, title, description, ...frontmatter } =
      node.frontmatter;

    const page = {
      id: kickstartDSPageId,
      slug: slug,
      layout: layout,

      title: title,
      description: description,

      updated: fileNode.modifiedTime,
      created: fileNode.birthTime,

      ...frontmatter,

      parent: node.id,
    };

    page.internal = {
      contentDigest: createContentDigest(page),
      content: JSON.stringify(page),
      type: "KickstartDsContentPage",
      description: `Netlify CMS implementation of the kickstartDS content page interface`,
    };

    createNode(page);
    createParentChildLink({ parent: node, child: getNode(kickstartDSPageId) });
  }

  if (
    node.internal.type === "MarkdownRemark" &&
    node.frontmatter &&
    node.fileAbsolutePath.includes("/settings/")
  ) {
    if (node.fileAbsolutePath.includes("header.md")) {
      const kickstartDSHeaderId = createNodeId(
        `${node.id} >>> KickstartDsHeader`
      );

      node.frontmatter = hashObjectKeys(node.frontmatter, "header");

      const header = {
        id: kickstartDSHeaderId,
        component: {
          ...node.frontmatter,
          type: "header",
        },
        parent: node.id,
      };

      header.internal = {
        contentDigest: createContentDigest(header),
        content: JSON.stringify(header),
        type: "KickstartDsHeader",
        description: `Netlify CMS implementation of the kickstartDS header`,
      };

      createNode(header);
      createParentChildLink({
        parent: node,
        child: getNode(kickstartDSHeaderId),
      });
    } else if (node.fileAbsolutePath.includes("footer.md")) {
      const kickstartDSFooterId = createNodeId(
        `${node.id} >>> KickstartDsFooter`
      );

      node.frontmatter = hashObjectKeys(node.frontmatter, "footer");

      const footer = {
        id: kickstartDSFooterId,
        component: {
          ...node.frontmatter,
          type: "footer",
        },
        parent: node.id,
      };

      footer.internal = {
        contentDigest: createContentDigest(footer),
        content: JSON.stringify(footer),
        type: "KickstartDsFooter",
        description: `Netlify CMS implementation of the kickstartDS footer`,
      };

      createNode(footer);
      createParentChildLink({
        parent: node,
        child: getNode(kickstartDSFooterId),
      });
    }
  }
};
