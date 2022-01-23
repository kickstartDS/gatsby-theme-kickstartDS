const { createDefaultMapFromNodeModules } = require('@typescript/vfs');
const fs = require('fs');

const fsMap = createDefaultMapFromNodeModules({});

const reactDts = fs.readFileSync(require.resolve('@types/react/index.d.ts'), 'utf-8');
const glossaryKdsDts = fs.readFileSync(require.resolve('@kickstartds/design-system/dist/components/glossary/GlossaryComponent.d.ts'), 'utf-8');

fsMap.set("/node_modules/@types/react/index.d.ts", reactDts);
fsMap.set("/node_modules/@kickstartds/design-system/dist/components/glossary/GlossaryComponent.d.ts", glossaryKdsDts);

module.exports = {
  plugins: [{
    resolve: `gatsby-plugin-mdx`,
    options: {
      gatsbyRemarkPlugins: [
        {
          resolve: require.resolve("gatsby-remark-shiki-twoslash"),
          options: {
            theme: "material-default",
            fsMap,
          },
        },
        `gatsby-remark-autolink-headers`,
      ],
    },
  }],
}
