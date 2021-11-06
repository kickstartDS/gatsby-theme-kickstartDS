module.exports = {
  plugins: [{
    resolve: `gatsby-plugin-mdx`,
    options: {
      gatsbyRemarkPlugins: [
        {
          resolve: require.resolve("gatsby-remark-shiki-twoslash"),
          options: {
            theme: "material-default",
          }
        },
      ],
    },
  }],
}
