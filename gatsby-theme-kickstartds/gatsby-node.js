const fs = require('fs');
const path = require('path');
const pascalCase =  require('change-case').pascalCase;

// const createList = require(`./create/createList`);
const createPages = require(`./create/createPages.js`);

const typesString = fs.readFileSync(path.resolve(__dirname, 'types.graphql'), "utf8");

exports.createPages = async (props) => {
  // await createList(props);
  await createPages(props);
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  const contentInterface = schema.buildInterfaceType({
    name: `ContentComponent`,
    fields: {
      internalType: 'String',
    },
    resolveType: value => `${pascalCase(value.internalType)}Component`,
  })

  createTypes([
    typesString,
    `interface KickstartDsPage implements Node @dontInfer {
      id: ID!
      layout: String!
      heading: String!
      description: String
      title: String
      date: Date @dateformat
      content: [SectionComponent]
    }
  `, contentInterface]);
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
    },
  });
};
