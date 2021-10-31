const fs = require('fs')
const fg = require("fast-glob");
const path = require('path');
const baseExports = require('@kickstartds/base/lib/exports.json');
const blogExports = require('@kickstartds/blog/lib/exports.json');
const contentExports = require('@kickstartds/content/lib/exports.json');

// TODO the following two reducers should be united into one
const reducer = (mod) => (prev, [key, value]) => {
  if (key !== "index.js" && key.indexOf('/') === -1 && value.length) {
    prev += `  '${key}': loadable(() => import('@kickstartds/${mod}/lib/${key}/index.js'), { resolveComponent: (exports) => exports.${value[0]} }),\n`
  }
  return prev
};

const additionalReducer = (mod) => (prev, [key, value]) => {
  if (key !== "index.js" && key.indexOf('/') === -1 && value.length) {
    prev += `  '${key}': loadable(() => import('${mod}/dist/components/${key}/${value[0]}Component'), { resolveComponent: (exports) => exports.${value[0]} }),\n`
  }
  return prev
};

// TODO handle this more elegantly, don't hardcode CI paths here
const pathPrefix = (fs.existsSync('../dist/.gitkeep') || process.cwd.includes('ramdisk')) ? '../' : '';
const exportJsons = fg.sync(`${pathPrefix}node_modules/**/dist/exports.json`);
const additionalPackage = exportJsons[0].match(/node_modules\/(.*)\/dist\/exports\.json/)[1];
const additionalExports = exportJsons.map((exportJson) => {
  return require(`@${exportJson.split('@')[1]}`);
})[0];

const defaultExports = [
  ...Object.entries(baseExports),
  ...Object.entries(blogExports),
  ...Object.entries(contentExports)
];

const uniquelyNewExports = Object.entries(additionalExports)
  .filter((additionalExport) => 
    defaultExports.every((defaultExport) => defaultExport[0] !== additionalExport[0]))
  .reduce((map, additionalExport) => {
    map[additionalExport[0]] = additionalExport[1];
    return map;
  }, {})

const base = Object.entries(baseExports).reduce(reducer("base"), '\n');
const blog = Object.entries(blogExports).reduce(reducer("blog"), '');
const content = Object.entries(contentExports).reduce(reducer("content"), '');
const additional = Object.entries({ ...uniquelyNewExports }).reduce(additionalReducer(additionalPackage), '');

const dest = path.resolve(__dirname, '../src/components', 'ComponentsMap.ts');
const file = `
import loadable from '@loadable/component';

export default {${base}${blog}${content}${additional}};
`;
fs.writeFileSync(dest, file);
