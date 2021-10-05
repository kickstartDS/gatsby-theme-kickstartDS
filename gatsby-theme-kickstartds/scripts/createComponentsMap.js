const fs = require('fs')
const path = require('path');
const baseExports = require('@kickstartds/base/lib/exports.json');
const blogExports = require('@kickstartds/blog/lib/exports.json');
const contentExports = require('@kickstartds/content/lib/exports.json');

const reducer = (mod) => (prev, [key, value]) => {
  if (key !== "index.js" && key.indexOf('/') === -1 && value.length) {
    prev += `  '${key}': loadable(() => import('@kickstartds/${mod}/lib/${key}/index.js'), { resolveComponent: (exports) => exports.${value[0]} }),\n`
  }
  return prev
};

const base = Object.entries(baseExports).reduce(reducer("base"), '\n');
const blog = Object.entries(blogExports).reduce(reducer("blog"), '');
const content = Object.entries(contentExports).reduce(reducer("content"), '');

const dest = path.resolve(__dirname, '../src/components', 'ComponentsMap.ts');
const file = `
import loadable from '@loadable/component';

export default {${base}${blog}${content}};
`;
fs.writeFileSync(dest, file);
