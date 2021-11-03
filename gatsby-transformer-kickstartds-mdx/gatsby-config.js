module.exports = {
  plugins: [{
    resolve: `gatsby-plugin-mdx`,
    options: {
      gatsbyRemarkPlugins: [{
        resolve: "gatsby-remark-shiki-twoslash",
          options: {
            theme: "nord",
          }
        },
      ],
    },
  }],
}
