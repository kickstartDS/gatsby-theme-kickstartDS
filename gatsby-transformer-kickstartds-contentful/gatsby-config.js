module.exports = {
  plugins: [    {
    resolve: `gatsby-source-contentful`,
    options: {
      spaceId: `6g9liq51xuol`,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      downloadLocal: true,
    },
  },],
}