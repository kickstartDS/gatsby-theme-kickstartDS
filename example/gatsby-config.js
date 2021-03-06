require("dotenv").config({
  path: `.env`,
})

// require .env.development or .env.production
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `kickstartDS WordPress Twenty Twenty`,
    description: `kickstartDS starter site for Twenty Twenty Theme.`,
    author: `@kickstartds`,
  },
  plugins: [
    { resolve: `gatsby-theme-kickstartds`, options: {} },
    { resolve: `gatsby-transformer-kickstartds-wordpress`, options: {} },
  ],
}
