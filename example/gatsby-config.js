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
    siteUrl: "https://www.kickstartds.com",
    image: "/images/OG-Image.png",
    cardImage: "/images/kickstartDS_TwitterCard.png",
    twitterUsername: "@kickstartDS",
    email: "hello@kickstartDS.com",
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
    { resolve: `@kickstartds/gatsby-transformer-kickstartds-mdx`, options: {} },
    { resolve: `@kickstartds/gatsby-transformer-kickstartds-netlify-cms`, options: {} },
    { resolve: `@kickstartds/gatsby-transformer-kickstartds-wordpress`, options: {} },
    {
      resolve: `gatsby-plugin-force-trailing-slashes`,
      options: {
        excludedPaths: [`/404.html`],
      },
    },
    {
      resolve: `gatsby-plugin-advanced-sitemap`,
      options: {
        query: `
        {
          allKickstartDsContentPage {
            edges {
              node {
                id
                slug
                created_at: created
                updated_at: updated
              }
            }
          }
          allKickstartDsGlossaryPage {
            edges {
              node {
                id
                slug
                created_at: created
                updated_at: updated
              }
            }
          }
          allKickstartDsBlogPage {
            edges {
              node {
                id
                slug
                created_at: created
                updated_at: updated
                feature_image: imageUrl
              }
            }
          }
        }`,
        output: "/sitemap.xml",
        mapping: {
          allKickstartDsGlossaryPage: {
            sitemap: `glossary`,
          },
          allKickstartDsContentPage: {
            sitemap: `pages`,
          },
          allKickstartDsBlogPage: {
            sitemap: `posts`,
          },
        },
        exclude: [
          `/dev-404-page`,
          `/404`,
          `/404.html`,
          `/offline-plugin-app-shell-fallback`,
        ],
        createLinkInHead: true,
        addUncaughtPages: true,
      },
    },
  ],
}
