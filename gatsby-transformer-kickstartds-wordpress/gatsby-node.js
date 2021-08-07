const hashFieldName = require('@kickstartds/jsonschema2graphql/build/schemaReducer').hashFieldName;
const typeResolutionField = 'type';

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type KickstartDsWordpressPage implements Node & KickstartDsPage @dontInfer {
      id: ID!
      layout: String!
      title: String!
      slug: String!
      sections: [SectionComponent]
    }
  `);
};

// TODO dedupe this
const hashObjectKeys = (obj, outerComponent) => {
  const hashedObj = {};

  if (!obj) return obj;

  Object.keys(obj).forEach((property) => {
    if (property === typeResolutionField) {
      hashedObj[typeResolutionField] = obj[typeResolutionField];
    } else {
      if (Array.isArray(obj[property])) {
        hashedObj[hashFieldName(property, outerComponent)] = obj[property].map((item) => {
          // TODO re-simplify this... only needed because of inconsistent hashing on sub-types / picture
          if (outerComponent === 'logo-tiles') {
            return hashObjectKeys(item, 'picture');
          } else if (outerComponent === 'quotes-slider') {
            return hashObjectKeys(item, 'quote');
          } else {
            return hashObjectKeys(item, outerComponent === 'section' ? item[typeResolutionField] : outerComponent);
          }
        });
      } else if (typeof obj[property] === 'object') {
        // TODO re-simplify this... only needed because of inconsistent hashing on sub-types / link-button
        const outer = outerComponent === 'section' ? obj[property][typeResolutionField] : outerComponent;
        if (outer === 'storytelling' && property === 'link') {
          hashedObj[hashFieldName(property, outerComponent)] = hashObjectKeys(obj[property], 'link-button');
        } else {
          hashedObj[hashFieldName(property, outerComponent)] = hashObjectKeys(obj[property], outer);
        }
      } else {
        hashedObj[hashFieldName(property, outerComponent === 'section' ? 'section' : outerComponent)] = obj[property];
      }
    }
  });

  return hashedObj;
};

exports.onCreateNode = async ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;

  if (node.internal.type === 'WpPost') {
    const kickstartDSPageId = createNodeId(`${node.id} >>> KickstartDsWordpressPage`);

    const page = {
      id: kickstartDSPageId,
      parent: node.id,
      title: node.title,
      slug: node.slug,
      layout: 'default',
    };

    page.sections = [{
      "mode": "list",
      "spaceBefore": "none",
      "width": "wide",
      "background": "default",
      "headline": {
        "level": "h1",
        "align": "center",
        "content": new Date(node.date).toDateString(),
        "spaceAfter": "none",
        "type": "headline"
      },
      "spaceAfter": "default",
      "content": [{
        "type": "html",
        "html": node.content,
      }],
      "type": "sections",
      "gutter": "default"
    }];
    
    if (node.featuredImage && node.featuredImage.node && node.featuredImage.node.id) {
      const wpMediaItem = getNode(node.featuredImage.node.id);
      
      if (wpMediaItem && wpMediaItem.localFile && wpMediaItem.localFile.id) {
        const fileMediaItem = getNode(wpMediaItem.localFile.id);

        page.sections[0].content.unshift({
          "type": "visual",
          "height": "fullScreen",
          "media": {
            "mode": "image",
            "image": {
              "srcMobile": fileMediaItem.publicURL,
              "srcTablet": fileMediaItem.publicURL,
              "srcDesktop": fileMediaItem.publicURL,
              "indent": "none"
            },
            "video": {
              "srcMobile": "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4",
              "srcTablet": "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4",
              "srcDesktop": "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4"
            }
          },
          "box": {
            "enabled": true,
            "headline": node.title,
            "text": node.excerpt,
            "link": {
              "enabled": false,
              "label": "Request a guided demo",
              "variant": "solid",
              "size": "medium",
              "href": "https://preview.kickstartds.com/",
              "type": "link-button"
            },
            "horizontal": "left",
            "vertical": "center",
            "background": "default"
          },
          "backgroundColor": "#ccc",
          "overlay": false,
          "inbox": true,
          "skipButton": true
        });
      } else {
        page.sections[0].content.unshift({
          "level": "h2",
          "align": "center",
          "content": node.title,
          "spaceAfter": "none",
          "type": "headline"
        });
      }
    } else {
      page.sections[0].content.unshift({
        "level": "h2",
        "align": "center",
        "content": node.title,
        "spaceAfter": "none",
        "type": "headline"
      });
    }
    ;

    if (page.sections && page.sections.length > 0) {
      page.sections = page.sections.map((section) => hashObjectKeys(section, 'section'));
    }
      
    page.internal = {
      contentDigest: createContentDigest(page),
      content: JSON.stringify(page),
      type: 'KickstartDsWordpressPage',
      description: `Wordpress Post implementation of the kickstartDS page interface`,
    };

    createNode(page);
    createParentChildLink({ parent: node, child: getNode(kickstartDSPageId) });
  }
};
