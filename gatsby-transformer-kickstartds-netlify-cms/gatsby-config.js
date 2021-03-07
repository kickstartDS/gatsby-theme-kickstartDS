const mapReplace = (str, map) => {
  const matchStr = Object.keys(map).join('|');
  if (!matchStr) return str;
  const regexp = new RegExp(matchStr, 'g');
  return str.replace(regexp, (match) => map[match]);
};

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
        customizeWebpackConfig: (config, { rules }) => {
          config.module.rules.push(
            {
              test: /\.[t|j]sx$/,
              use: [
                {
                  loader: 'text-transform-loader',
                  options: {
                    prependText: "import h from 'vhtml';",
                    transformText(content) {
                      // unfortunately, vhtml doesn't handle all special JSX attributes, so they have to be replaced manually
                      // https://github.com/developit/vhtml/blob/master/src/vhtml.js#L7 vs https://reactjs.org/docs/dom-elements.html#all-supported-html-attributes
                      return mapReplace(content, {
                        xmlnsXlink: '"xmlns:xlink"',
                        xlinkHref: '"xlink:href"',
                        tabIndex: 'tabindex',
                      });
                    },
                  },
                },
              ],
            },
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

// TODO: is this needed in this context? What is it for?
/*
                {
                  loader: 'ifdef-loader',
                  options: {
                    env: process.env,
                    modules: modulesConfig,
                    paths: rmConfig.config.paths,
                    target: subdir,
                    'ifdef-verbose': false,
                    'ifdef-triple-slash': false, // use double slash comment instead of default triple slash
                  },
                },
*/