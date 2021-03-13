
const createList = require(`./create/createList`);
const createPages = require(`./create/createPages`);

exports.createPages = async (props) => {
  await createList(props);
  await createPages(props);
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type KickstartDsKeyvisualComponentBoxLink {
      linkButtonText: String
      buttonOutlineInverted: Boolean
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
      srcMobile: String
      srcTablet: String
      srcDesktop: String
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

    interface KickstartDsContentComponent {
      type: String!
      text: String
    }

    type KickstartDsContentTextMediaComponent implements KickstartDsContentComponent {
      type: String!
      text: String
    }

    type KickstartDsContentQuoteComponent implements KickstartDsContentComponent {
      type: String!
      image: String
      text: String
      source: String
      date: Date @dateformat
    }

    union KickstartDsContent = KickstartDsContentTextMediaComponent | KickstartDsContentQuoteComponent

    interface KickstartDsPage implements Node {
      id: ID!
      layout: String!
      keyvisual: KickstartDsKeyvisualComponent
      heading: String
      description: String
      title: String
      date: Date @dateformat
      content: [KickstartDsContentTextMediaComponent]
    }
  `);
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
    },
  });
};
