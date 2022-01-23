import { createDefaultMapFromNodeModules } from "@typescript/vfs";
import { fs } from 'fs';

const fsMap = createDefaultMapFromNodeModules({});

const reactDts = fs.readFileSync(require.resolve('/node_modules/@types/react/index.d.ts'), 'utf-8');
const kdsDts = fs.readFileSync(require.resolve('/node_modules/@kickstartds/design-system/dist/components/types.d.ts'), 'utf-8');

console.log(reactDts);
console.log(kdsDts);

fsMap.set("react", reactDts);
fsMap.set("/node_modules/@kickstartds/design-system/dist/components/types.d.ts", kdsDts);

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
