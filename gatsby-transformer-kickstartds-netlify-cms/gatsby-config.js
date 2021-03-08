module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
        customizeWebpackConfig: (config, { rules }) => {
          config.module.rules.push(
            {
              test: /\.[t|j]sx?$/,
              exclude: [
                /node_modules\/core-js/,
                /node_modules\/webpack/,
                /node_modules\/pikaday/,
                /node_modules\/pubsub-js/,
              ],
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    envName: 'es5',
                    configFile: `${__dirname}/.babelrc`,
                    cacheDirectory: true,
                  },
                },
              ],
            }
          );
        },
      },
    },
  ],
}
