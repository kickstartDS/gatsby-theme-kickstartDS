
const createList = require(`./create/createList`);
const createPage = require(`./create/createPage`);

exports.createPages = async (props) => {
  await createList(props);
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
  const { createTypes } = actions;

  createTypes(`
    type KickstartDsKeyvisualComponentBoxLink {
      link_button_text: String
      button__outline_inverted: Boolean
    }

    type KickstartDsKeyvisualComponentBox {
      enabled: Boolean
      inbox: Boolean
      indent: Boolean
      headline: String
      text: String
      link: KickstartDsKeyvisualComponentBoxLink
      horizontal: String
      vertical: String
      style: String
    }

    type KickstartDsKeyvisualComponentMediaImage {
      src_mobile: String
      src_tablet: String
      src_desktop: String
    }

    type KickstartDsKeyvisualComponentMedia {
      mode: String!
      image: KickstartDsKeyvisualComponentMediaImage
      show: Boolean
    }

    type KickstartDsKeyvisualComponent {
      background_color: String
      small: Boolean
      media: KickstartDsKeyvisualComponentMedia
      box: KickstartDsKeyvisualComponentBox 
    }

    interface KickstartDsPage implements Node {
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
