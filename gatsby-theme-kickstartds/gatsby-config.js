module.exports = ({ contentPath = "content", urlSegment = "pages", gqlPath = "dist", netlifyConfigPath = "dist" }) => ({
  plugins: [
    { resolve: 'gatsby-source-filesystem', options: { path: 'static', name: 'images' } },
    { resolve: 'gatsby-source-filesystem', options: { path: contentPath, name: urlSegment } },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
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
    `gatsby-plugin-react-helmet`, 
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
   ],
});
