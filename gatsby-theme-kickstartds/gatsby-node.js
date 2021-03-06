
const createBlog = require(`./create/createBlog`);

exports.createPages = async (props) => {
  await createBlog(props);
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
    },
  });
};