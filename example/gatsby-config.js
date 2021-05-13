require("dotenv").config({
  path: `.env`,
})

// require .env.development or .env.production
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

/*
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets/images/uploads`,
        name: 'uploads',
      },
    },
*/

module.exports = {
  siteMetadata: {
    title: `kickstartDS WordPress Twenty Twenty`,
    description: `kickstartDS starter site for Twenty Twenty Theme.`,
    author: `@kickstartds`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/images`,
        name: 'images',
      },
    },
    { resolve: 'gatsby-source-filesystem', options: { path: `${__dirname}/content`, name: 'pages' } },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'images'
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
        ],
      },
    },
    { resolve: `gatsby-theme-kickstartds`, options: {} },
    //{ resolve: `gatsby-transformer-kickstartds-wordpress`, options: {} },
    { resolve: `gatsby-transformer-kickstartds-netlify-cms`, options: {} },
  ],
}
