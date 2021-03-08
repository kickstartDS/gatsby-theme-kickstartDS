exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type KickstartDsNetlifyCMSPage implements Node & KickstartDsPage {
      id: ID!
      layout: String!
      keyvisual: KickstartDsKeyvisualComponent
      heading: String
      description: String
      title: String
      date: String
    }
  `);
};

// TODO don't use `randomDate`, get some real date info from page / post
const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;

  if (node.internal.type === 'MarkdownRemark' && node.frontmatter && node.frontmatter.Id) {
    const kickstartDSPageId = createNodeId(`${node.id} >>> KickstartDsNetlifyCMSPage`);

    const page = {
      id: kickstartDSPageId,
      title: node.frontmatter.heading,
      description: node.frontmatter.content[0].text,
      date: randomDate(new Date(2012, 0, 1), new Date()),
      ...node.frontmatter
    };

    if (node && node.frontmatter && node.frontmatter.keyvisual) {
      if (node.frontmatter.keyvisual.media && node.frontmatter.keyvisual.media.mode === 'image' && node.frontmatter.keyvisual.media.image) {
        // TODO integrate with images more elegantly in kickstartDS components, at least generate correct srcSet / versions of image for keyvisual here!
        page.keyvisual.media.image.src_mobile = node.frontmatter.keyvisual.media.image.src_mobile;
        page.keyvisual.media.image.src_tablet = node.frontmatter.keyvisual.media.image.src_tablet;
        page.keyvisual.media.image.src_desktop = node.frontmatter.keyvisual.media.image.src_desktop;
      }
    }

    page.internal = {
      contentDigest: createContentDigest(page),
      type: 'KickstartDsNetlifyCMSPage',
    };

    createNode(page);
    createParentChildLink({ parent: node, child: getNode(kickstartDSPageId) });
  }
};