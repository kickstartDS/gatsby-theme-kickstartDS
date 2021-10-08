const fs = require('fs');
const pascalCase =  require('change-case').pascalCase;

const createBlogList = require(`./create/createBlogList.js`);
const createPages = require(`./create/createPages.js`);

exports.createPages = async (props, options) => {
  // Only try to run `createBlogList` when we actually have the blog plugin activated
  await createBlogList(props, options);
  await createPages(props, options);
};

exports.createSchemaCustomization = ({ actions, schema }, options) => {
  const { createTypes } = actions;
  const { gqlPath } = options;

  const typesString = fs.readFileSync(`${gqlPath}/page.graphql`, "utf8");

  const contentInterface = schema.buildInterfaceType({
    name: `ContentComponent`,
    fields: {
      type: 'String',
    },
    resolveType: value => `${pascalCase(value.type)}Component`,
  })

  createTypes([
    typesString,
    `interface KickstartDsPage implements Node @dontInfer {
      id: ID!
      layout: String!
      title: String!
      description: String
      keywords: String
      image: File @link(from: "image___NODE")
      cardImage: File @link(from: "cardImage___NODE")
      slug: String!
      sections: [SectionComponent]
      updated: Date! @dateformat
      created: Date! @dateformat
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

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        "assert": require.resolve('assert')
      }
    }
  })
}