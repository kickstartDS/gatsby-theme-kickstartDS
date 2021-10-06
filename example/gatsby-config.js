require("dotenv").config({
  path: `.env`,
});

// require .env.development or .env.production
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    lang: "en",
    title: "kickstartDS – the frontend first framework",
    titleTemplate: "%s // kickstartDS",
    description:
      "kickstartDS is a comprehensive component and pattern library, enabling web development teams to create consistent and brand compliant web frontends super efficiently",
    keywords: "Design System, Frontend, UI, UX, Interface, Pattern Library, Component Library, Frontend first, React, Storybook, Gatsby, Next.js, Contentful, Storyblok, WordPress, UXPin, Netlify, Vercel",
    url: "https://www.kickstartDS.com",
    image: "/images/OG-Image.png",
    cardImage: "/images/kickstartDS_TwitterCard.png",
    twitterUsername: "@kickstartDS",
  },
  plugins: [
    {
      resolve: `@kickstartds/gatsby-theme-kickstartds`,
      options: {
        contentPath: "content",
        urlSegment: "pages",
        gqlPath: "dist",
        netlifyConfigPath: "dist"
      }
    },
    { resolve: `@kickstartds/gatsby-transformer-kickstartds-contentful`, options: {} },
    { resolve: `@kickstartds/gatsby-transformer-kickstartds-netlify-cms`, options: {} },
    { resolve: `@kickstartds/gatsby-transformer-kickstartds-wordpress`, options: {} },
  ],
}
