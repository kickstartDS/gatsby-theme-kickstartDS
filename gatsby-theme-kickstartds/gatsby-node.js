const fs = require('fs');
const pascalCase =  require('change-case').pascalCase;

const { collectGraphQLFragments } = require('./src/util/collectGraphQLFragments');

const createBlogList = require(`./create/createBlogList.js`);
const createPages = require(`./create/createPages.js`);

const getGlossaryPageQuery = async (gqlPath) => {
  const glossaryFragments = await collectGraphQLFragments([
    'GlossaryComponentDeepNesting',
  ], gqlPath);

  const glossaryPageQuery = '\
export const query = graphql` \n\
'+glossaryFragments+' \n\
query GLOSSARY_BY_SLUG($slug: String) { \n\
  kickstartDsGlossaryPage(slug: { eq: $slug }) { \n\
    title \n\
    description \n\
    keywords \n\
    image { \n\
      publicURL \n\
    } \n\
    cardImage { \n\
      publicURL \n\
    } \n\
    glossary { \n\
      ...GlossaryComponentDeepNesting \n\
    } \n\
  } \n\
} \n\
  `;'

  return glossaryPageQuery;
};

const getBlogPageQuery = async (gqlPath) => {
  const blogFragments = await collectGraphQLFragments([
    'PostHeadComponentDeepNesting',
    'HtmlComponentDeepNesting',
    'ContactComponentDeepNesting',
  ], gqlPath);

  const blogPageQuery = '\
export const query = graphql` \n\
'+blogFragments+' \n\
query BLOG_BY_SLUG($slug: String) { \n\
  kickstartDsBlogPage(slug: { eq: $slug }) { \n\
    title \n\
    description \n\
    keywords \n\
    image { \n\
      publicURL \n\
    } \n\
    cardImage { \n\
      publicURL \n\
    } \n\
    postHead { \n\
      ...PostHeadComponentDeepNesting \n\
    } \n\
    postBody { \n\
      ...HtmlComponentDeepNesting \n\
    } \n\
    postBio { \n\
      ...ContactComponentDeepNesting \n\
    } \n\
    postReadingTime \n\
    postWordCount \n\
  } \n\
} \n\
  `;'

  return blogPageQuery;
};

exports.createPages = async (props, options) => {
  const { gqlPath } = options;

  const glossarySlugPage = fs.readFileSync(`${__dirname}/src/pages/{kickstartDsGlossaryPage.slug}.js`, 'utf8');
  fs.writeFileSync(
    `${__dirname}/src/pages/{kickstartDsGlossaryPage.slug}.js`,
    glossarySlugPage.replace(/export const query[\s\S]+/g, await getGlossaryPageQuery(gqlPath)),
    'utf8',
  );

  const blogSlugPage = fs.readFileSync(`${__dirname}/src/pages/{kickstartDsBlogPage.slug}.js`, 'utf8');
  fs.writeFileSync(
    `${__dirname}/src/pages/{kickstartDsBlogPage.slug}.js`,
    blogSlugPage.replace(/export const query[\s\S]+/g, await getBlogPageQuery(gqlPath)),
    'utf8',
  );

  await createBlogList(props, options);
  await createPages(props, options);
};

exports.createSchemaCustomization = ({ actions, schema }, options) => {
  const { createTypes } = actions;
  const { gqlPath } = options;

  const typesString = fs.readFileSync(`${gqlPath}/page.graphql`, 'utf8');
  
  const kickstartDsPageInterface = fs.readFileSync(`${__dirname}/src/schema/types/KickstartDsPageInterface.graphql`, 'utf8');
  const kickstartDsBlogPageInterface = fs.readFileSync(`${__dirname}/src/schema/types/KickstartDsBlogPageInterface.graphql`, 'utf8');
  
  const kickstartDsWordpressBlogPageType = fs.readFileSync(`${__dirname}/src/schema/types/KickstartDsWordpressBlogPageType.graphql`, 'utf8');
  const kickstartDsMdxBlogPageType = fs.readFileSync(`${__dirname}/src/schema/types/KickstartDsMdxBlogPageType.graphql`, 'utf8');
  const kickstartDsGlossaryPageType = fs.readFileSync(`${__dirname}/src/schema/types/KickstartDsGlossaryPageType.graphql`, 'utf8');
  const kickstartDsContentPageType = fs.readFileSync(`${__dirname}/src/schema/types/KickstartDsContentPageType.graphql`, 'utf8');

  // TODO generalize this
  const contentInterface = schema.buildInterfaceType({
    name: `ContentComponent`,
    fields: {
      type: 'String',
    },
    resolveType: (value) => `${pascalCase(value.type)}Component`,
  });

  // TODO generalize this
  const textMediaInterface = schema.buildInterfaceType({
    name: `TextMediaComponentMedia`,
    fields: {
      type: 'String',
    },
    resolveType: (value) => `${pascalCase(value.type)}Component`,
  });

  createTypes([
    typesString,
    kickstartDsPageInterface,
    kickstartDsBlogPageInterface,
    kickstartDsWordpressBlogPageType,
    kickstartDsMdxBlogPageType,
    kickstartDsGlossaryPageType,
    kickstartDsContentPageType,
    contentInterface,
    textMediaInterface
  ]);
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