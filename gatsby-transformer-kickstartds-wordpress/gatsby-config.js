module.exports = {
  plugins: [{
    resolve: `gatsby-source-wordpress`,
    options: {
      url: process.env.WPGRAPHQL_URL,
      verbose: true,
      develop: {
        hardCacheMediaFiles: true,
      },
      debug: {
        graphql: {
          writeQueriesToDisk: true,
        },
      },
      html: {
        fallbackImageMaxWidth: 800,
      },
      // fields can be excluded globally.
      // this example is for wp-graphql-gutenberg.
      // since we can get block data on the `block` field
      // we don't need these fields
      excludeFieldNames: [`blocksJSON`, `saveContent`],

      type: {
        Post: {
          limit:
            process.env.NODE_ENV === `development`
              ? // Lets just pull 50 posts in development to make it easy on ourselves.
              35
              : // And then we can pull all posts in production
              null,
        },
        // this shows how to exclude entire types from the schema
        // this example is for wp-graphql-gutenberg
        CoreParagraphBlockAttributesV2: {
          exclude: true,
        },
        MediaItem: {
          localFile: {
            maxFileSizeBytes: 104857600,
          },
        }
      },
    },
  }],
}
