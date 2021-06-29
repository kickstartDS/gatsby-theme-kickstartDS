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
    title: `kickstartDS Gatsby Theme Demosite`,
    description: `kickstartDS demo site for the kickstartDS Gatsby Theme.`,
    author: `@kickstartds`,
  },
  plugins: [
    { 
      resolve: `@kickstartds/gatsby-theme-kickstartds`,
      options: {
        contentPath: "content",
        basePath: "/",
      } 
    },
    //{ resolve: `@kickstartds/gatsby-transformer-kickstartds-wordpress`, options: {} },
    { resolve: `@kickstartds/gatsby-transformer-kickstartds-netlify-cms`, options: {} },
  ],
}
