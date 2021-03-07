
const createBlog = require(`./create/createBlog`);
const createPage = require(`./create/createPage`);

exports.createPages = async (props) => {
  await createBlog(props);
  await createPage(props);
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
    },
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type KickstartDSKeyvisualComponentBoxLink {
      link_button_text: String
      button__outline_inverted: Boolean
    }

    type KickstartDSKeyvisualComponentBox {
      enabled: Boolean
      inbox: Boolean
      indent: Boolean
      headline: String
      text: String
      link: KickstartDSKeyvisualComponentBoxLink
      horizontal: String
      vertical: String
      style: String
    }

    type KickstartDSKeyvisualComponentMediaImage {
      src_mobile: String
      src_tablet: String
      src_desktop: String
    }

    type KickstartDSKeyvisualComponentMedia {
      mode: String!
      image: KickstartDSKeyvisualComponentMediaImage
      show: Boolean
    }

    type KickstartDSKeyvisualComponent {
      background_color: String
      small: Boolean
      media: KickstartDSKeyvisualComponentMedia
      box: KickstartDSKeyvisualComponentBox 
    }

    interface KickstartDSPost implements Node {
      id: ID!
      title: String!
      image: String
      body: String
      link: String
      date: Date @dateformat
    }

    interface KickstartDSPage implements Node {
      id: ID!
      layout: String!
      keyvisual: KickstartDSKeyvisualComponent
      heading: String
    }
  `);
};
