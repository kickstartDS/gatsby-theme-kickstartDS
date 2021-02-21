module.exports = {
  plugins: [
    {
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
          __all: {
            // this function will run any time a node of any type will be created or updated
            beforeChangeNode: ({actionType, remoteNode, actions, helpers}) => {
              const { createNode } = actions;
              const { createNodeId, createContentDigest } = helpers;
              
              if (
                actionType === `CREATE_ALL` ||
                actionType === `CREATE` ||
                actionType === `UPDATE`
              ) {
                if (remoteNode.internal.type === 'WpPost') {
                  const post = {
                    id: createNodeId(remoteNode.title),
                    title: remoteNode.title,
                    parent: remoteNode.id,
                  };

                  post.internal = {
                    contentDigest: createContentDigest(post),
                    type: 'KickstartDSWordpressPost',
                  };

                  createNode(post);
                }
              }
    
              return {
                remoteNode: remoteNode
              }
            }
          },

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
        },
      },
    },
  ],
}