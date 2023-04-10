const fs = require("fs");
const pascalCase = require("change-case").pascalCase;

const {
  collectGraphQLFragments,
} = require("./src/util/collectGraphQLFragments");

const createBlogList = require(`./create/createBlogList.js`);
const createAppearanceList = require(`./create/createAppearanceList.js`);
const createShowcaseList = require(`./create/createShowcaseList.js`);
const createPages = require(`./create/createPages.js`);

const getGlossaryPageQuery = async (gqlPath) => {
  const glossaryFragments = await collectGraphQLFragments(
    [
      "HeaderComponentDeepNesting",
      "FooterComponentDeepNesting",
      "GlossaryComponentDeepNesting",
    ],
    gqlPath
  );

  const glossaryPageQuery =
    "\
export const query = graphql` \n\
" +
    glossaryFragments +
    " \n\
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
  kickstartDsHeader { \n\
    component { \n\
      ...HeaderComponentDeepNesting \n\
    } \n\
  } \n\
  kickstartDsFooter { \n\
    component { \n\
      ...FooterComponentDeepNesting \n\
    } \n\
  } \n\
} \n\
  `;";

  return glossaryPageQuery;
};

const getAppearancePageQuery = async (gqlPath) => {
  const appearanceFragments = await collectGraphQLFragments(
    [
      "HeaderComponentDeepNesting",
      "FooterComponentDeepNesting",
      "AppearanceComponentDeepNesting",
    ],
    gqlPath
  );

  const appearancePageQuery =
    "\
export const query = graphql` \n\
" +
    appearanceFragments +
    " \n\
query APPEARANCE_BY_SLUG($slug: String) { \n\
  kickstartDsAppearancePage(slug: { eq: $slug }) { \n\
    title \n\
    description \n\
    keywords \n\
    image { \n\
      publicURL \n\
    } \n\
    cardImage { \n\
      publicURL \n\
    } \n\
    appearance { \n\
      ...AppearanceComponentDeepNesting \n\
    } \n\
  } \n\
  kickstartDsHeader { \n\
    component { \n\
      ...HeaderComponentDeepNesting \n\
    } \n\
  } \n\
  kickstartDsFooter { \n\
    component { \n\
      ...FooterComponentDeepNesting \n\
    } \n\
  } \n\
} \n\
  `;";

  return appearancePageQuery;
};

const getShowcasePageQuery = async (gqlPath) => {
  const showcaseFragments = await collectGraphQLFragments(
    [
      "HeaderComponentDeepNesting",
      "FooterComponentDeepNesting",
      "ShowcaseComponentDeepNesting",
    ],
    gqlPath
  );

  const showcasePageQuery =
    "\
export const query = graphql` \n\
" +
    showcaseFragments +
    " \n\
query SHOWCASE_BY_SLUG($slug: String) { \n\
  kickstartDsShowcasePage(slug: { eq: $slug }) { \n\
    title \n\
    description \n\
    keywords \n\
    image { \n\
      publicURL \n\
    } \n\
    cardImage { \n\
      publicURL \n\
    } \n\
    showcase { \n\
      ...ShowcaseComponentDeepNesting \n\
    } \n\
  } \n\
  kickstartDsHeader { \n\
    component { \n\
      ...HeaderComponentDeepNesting \n\
    } \n\
  } \n\
  kickstartDsFooter { \n\
    component { \n\
      ...FooterComponentDeepNesting \n\
    } \n\
  } \n\
} \n\
  `;";

  return showcasePageQuery;
};

const getBlogPageQuery = async (gqlPath) => {
  const blogFragments = await collectGraphQLFragments(
    [
      "HeaderComponentDeepNesting",
      "FooterComponentDeepNesting",
      "PostHeadComponentDeepNesting",
      "PostAsideComponentDeepNesting",
      "PostShareBarComponentDeepNesting",
      "HtmlComponentDeepNesting",
      "ContactComponentDeepNesting",
    ],
    gqlPath
  );

  const blogPageQuery =
    "\
export const query = graphql` \n\
" +
    blogFragments +
    " \n\
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
    postAside { \n\
      ...PostAsideComponentDeepNesting \n\
    } \n\
    postShareBar { \n\
      ...PostShareBarComponentDeepNesting \n\
    } \n\
    postContact { \n\
      ...ContactComponentDeepNesting \n\
    } \n\
    postReadingTime \n\
    postWordCount \n\
  } \n\
  kickstartDsHeader { \n\
    component { \n\
      ...HeaderComponentDeepNesting \n\
    } \n\
  } \n\
  kickstartDsFooter { \n\
    component { \n\
      ...FooterComponentDeepNesting \n\
    } \n\
  } \n\
} \n\
  `;";

  return blogPageQuery;
};

const getTagPageQuery = async (gqlPath) => {
  const tagFragments = await collectGraphQLFragments(
    [
      "HeaderComponentDeepNesting",
      "FooterComponentDeepNesting",
      "TagLabelComponentDeepNesting",
    ],
    gqlPath
  );

  const tagPageQuery =
    "\
export const query = graphql` \n\
" +
    tagFragments +
    " \n\
query TAG_BY_SLUG($slug: String) { \n\
  kickstartDsTagPage(slug: { eq: $slug }) { \n\
    title \n\
    description \n\
    keywords \n\
    image { \n\
      publicURL \n\
    } \n\
    cardImage { \n\
      publicURL \n\
    } \n\
    tagLabel { \n\
      ...TagLabelComponentDeepNesting \n\
    } \n\
  } \n\
  allKickstartDsHeader { \n\
    edges { \n\
      node { \n\
        component { \n\
          ...HeaderComponentDeepNesting \n\
        } \n\
      } \n\
    } \n\
  } \n\
  allKickstartDsFooter { \n\
    edges { \n\
      node { \n\
        component { \n\
          ...FooterComponentDeepNesting \n\
        } \n\
      } \n\
    } \n\
  } \n\
} \n\
  `;";

  return tagPageQuery;
};

exports.createPages = async (props, options) => {
  const { gqlPath } = options;

  const glossarySlugPage = fs.readFileSync(
    `${__dirname}/src/pages/{kickstartDsGlossaryPage.slug}.js`,
    "utf8"
  );
  fs.writeFileSync(
    `${__dirname}/src/pages/{kickstartDsGlossaryPage.slug}.js`,
    glossarySlugPage.replace(
      /export const query[\s\S]+/g,
      await getGlossaryPageQuery(gqlPath)
    ),
    "utf8"
  );

  const appearanceSlugPage = fs.readFileSync(
    `${__dirname}/src/pages/{kickstartDsAppearancePage.slug}.js`,
    "utf8"
  );
  fs.writeFileSync(
    `${__dirname}/src/pages/{kickstartDsAppearancePage.slug}.js`,
    appearanceSlugPage.replace(
      /export const query[\s\S]+/g,
      await getAppearancePageQuery(gqlPath)
    ),
    "utf8"
  );

  const showcaseSlugPage = fs.readFileSync(
    `${__dirname}/src/pages/{kickstartDsShowcasePage.slug}.js`,
    "utf8"
  );
  fs.writeFileSync(
    `${__dirname}/src/pages/{kickstartDsShowcasePage.slug}.js`,
    showcaseSlugPage.replace(
      /export const query[\s\S]+/g,
      await getShowcasePageQuery(gqlPath)
    ),
    "utf8"
  );

  const blogSlugPage = fs.readFileSync(
    `${__dirname}/src/pages/{kickstartDsBlogPage.slug}.js`,
    "utf8"
  );
  fs.writeFileSync(
    `${__dirname}/src/pages/{kickstartDsBlogPage.slug}.js`,
    blogSlugPage.replace(
      /export const query[\s\S]+/g,
      await getBlogPageQuery(gqlPath)
    ),
    "utf8"
  );

  const tagSlugPage = fs.readFileSync(
    `${__dirname}/src/pages/{kickstartDsTagPage.slug}.js`,
    "utf8"
  );
  fs.writeFileSync(
    `${__dirname}/src/pages/{kickstartDsTagPage.slug}.js`,
    tagSlugPage.replace(
      /export const query[\s\S]+/g,
      await getTagPageQuery(gqlPath)
    ),
    "utf8"
  );

  await createBlogList(props, options);
  await createAppearanceList(props, options);
  await createShowcaseList(props, options);
  await createPages(props, options);
};

exports.createSchemaCustomization = ({ actions, schema }, options) => {
  const { createTypes } = actions;
  const { gqlPath } = options;

  const typesString = fs.readFileSync(`${gqlPath}/page.graphql`, "utf8");

  const kickstartDsPageInterface = fs.readFileSync(
    `${__dirname}/src/schema/types/KickstartDsPageInterface.graphql`,
    "utf8"
  );
  const kickstartDsBlogPageInterface = fs.readFileSync(
    `${__dirname}/src/schema/types/KickstartDsBlogPageInterface.graphql`,
    "utf8"
  );

  const kickstartDsWordpressBlogPageType = fs.readFileSync(
    `${__dirname}/src/schema/types/KickstartDsWordpressBlogPageType.graphql`,
    "utf8"
  );
  const kickstartDsMdxBlogPageType = fs.readFileSync(
    `${__dirname}/src/schema/types/KickstartDsMdxBlogPageType.graphql`,
    "utf8"
  );
  const kickstartDsGlossaryPageType = fs.readFileSync(
    `${__dirname}/src/schema/types/KickstartDsGlossaryPageType.graphql`,
    "utf8"
  );
  const kickstartDsAppearancePageType = fs.readFileSync(
    `${__dirname}/src/schema/types/KickstartDsAppearancePageType.graphql`,
    "utf8"
  );
  const kickstartDsShowcasePageType = fs.readFileSync(
    `${__dirname}/src/schema/types/KickstartDsShowcasePageType.graphql`,
    "utf8"
  );
  const kickstartDsContentPageType = fs.readFileSync(
    `${__dirname}/src/schema/types/KickstartDsContentPageType.graphql`,
    "utf8"
  );
  const kickstartDsTagPageType = fs.readFileSync(
    `${__dirname}/src/schema/types/KickstartDsTagPageType.graphql`,
    "utf8"
  );

  const kickstartDsHeaderType = fs.readFileSync(
    `${__dirname}/src/schema/types/KickstartDsHeaderType.graphql`,
    "utf8"
  );
  const kickstartDsFooterType = fs.readFileSync(
    `${__dirname}/src/schema/types/KickstartDsFooterType.graphql`,
    "utf8"
  );

  // TODO generalize this
  const contentInterface = schema.buildInterfaceType({
    name: `SectionComponentContent`,
    fields: {
      type: "String",
    },
    resolveType: (value) => `${pascalCase(value.type)}Component`,
  });

  // TODO generalize this
  const textMediaInterface = schema.buildInterfaceType({
    name: `TextMediaComponentMedia`,
    fields: {
      type: "String",
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
    kickstartDsAppearancePageType,
    kickstartDsShowcasePageType,
    kickstartDsContentPageType,
    kickstartDsTagPageType,
    kickstartDsHeaderType,
    kickstartDsFooterType,
    contentInterface,
    textMediaInterface,
  ]);
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: "@babel/plugin-transform-react-jsx",
    options: {
      runtime: "automatic",
    },
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        assert: require.resolve("assert"),
      },
    },
  });
};
