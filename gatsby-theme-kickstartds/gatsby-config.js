module.exports = ({ contentPath = "content", urlSegment = "pages", gqlPath = "dist", netlifyConfigPath = "dist" }) => ({
  plugins: [
    { resolve: 'gatsby-source-filesystem', options: { path: 'static', name: 'images' } },
    { resolve: 'gatsby-source-filesystem', options: { path: contentPath, name: urlSegment } },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-relative-source`,
            options: {
              name: `images`,
              htmlSources: [{tagName: `post-video`, attributes: [`image`]}] // post-video is a component referenced later by gatsby-remark-custom-image-component
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1600,
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
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `blurred`,
          quality: 50,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
    `gatsby-transformer-sharp`,
    'gatsby-plugin-loadable-components-ssr',
   ],
});
