const fs = require('fs');
const pascalCase =  require('change-case').pascalCase;

const createBlogList = require(`./create/createBlogList.js`);
const createPages = require(`./create/createPages.js`);

exports.createPages = async (props, options) => {
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
      slug: String!
      sections: [SectionComponent]
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

// resolve.fallback: { "assert": require.resolve("assert/") }

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        "assert": require.resolve('assert')
      }
    }
  })
}