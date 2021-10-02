const { createRemoteFileNode } = require("gatsby-source-filesystem");
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
      excerpt: String!
      author: String!
      date: Date! @dateformat
      featuredImage: File @link(from: "featuredImage___NODE")
      categories: [TagLabelComponent]
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
          } else if (outerComponent === 'post-head' && property === 'categories') {
            return hashObjectKeys(item, 'tag-label');
          } else {
            return hashObjectKeys(item, outerComponent === 'section' ? item[typeResolutionField] : outerComponent);
          }
        });
      } else if (typeof obj[property] === 'object') {
        // TODO re-simplify this... only needed because of inconsistent hashing on sub-types / link-button
        const outer = outerComponent === 'section' ? obj[property][typeResolutionField] : outerComponent;
        if (outer === 'storytelling' && property === 'link') {
          hashedObj[hashFieldName(property, outerComponent)] = hashObjectKeys(obj[property], 'link-button');
        } else if (outer === 'storytelling' && property === 'headline') {
          hashedObj[hashFieldName(property, outerComponent)] = hashObjectKeys(obj[property], 'headline');
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

exports.onCreateNode = async ({ node, actions, cache, store, getNode, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;

  if (node.internal.type === 'WpPost') {
    const kickstartDSPageId = createNodeId(`${node.id} >>> KickstartDsWordpressPage`);

    const categories = node.categories.nodes.map((categoryNode) => {
      const category = getNode(categoryNode.id);

      return {
        "label": category.name,
        "type": "tag-label"
      };
    });

    const author = getNode(node.author.node.id);

    const page = {
      id: kickstartDSPageId,
      parent: node.id,
      title: node.title,
      slug: `blog/${node.slug}`,
      excerpt: node.excerpt,
      date: node.date,
      author: author.name,
      categories: categories.map((category) => hashObjectKeys(category, 'tag-label')),
      layout: 'default',
    };

    page.sections = [{
      "mode": "list",
      "spaceBefore": "none",
      "width": "wide",
      "background": "default",
      "headline": {
        "level": "p",
        "align": "center",
        "content": "",
        "spaceAfter": "none",
        "type": "headline"
      },
      "spaceAfter": "none",
      "content": [{
        "type": "post-head",
        "date": node.date,
        "headline": {
          "level": "h1",
          "align": "left",
          "content": node.title,
          "subheadline": `published by: ${author.name}`,
          "spaceAfter": "none",
          "type": "headline"
        },
        "categories": categories
      }],
      "type": "section",
      "gutter": "default"
    }, {
      "mode": "list",
      "spaceBefore": "small",
      "width": "narrow",
      "background": "default",
      "headline": {
        "level": "p",
        "align": "center",
        "content": "",
        "spaceAfter": "none",
        "type": "headline"
      },
      "spaceAfter": "default",
      "content": [{
        "type": "html",
        "html": `<div class="c-rich-text">${node.content}</div>`
      }],
      "type": "section",
      "gutter": "default"
    }];

    if (page.sections && page.sections.length > 0) {
      page.sections = page.sections.map((section) => hashObjectKeys(section, 'section'));
    }

    if (node.featuredImage && node.featuredImage.node && node.featuredImage.node.id) {
      const wpMediaItem = getNode(node.featuredImage.node.id);

      if (wpMediaItem && wpMediaItem.localFile && wpMediaItem.localFile.id) {
        const fileMediaItem = getNode(wpMediaItem.localFile.id);

        page.featuredImage___NODE = fileMediaItem.id;
        page.sections[0].content__2cb4[0].image__c108 = {
          "src__2f94___NODE": fileMediaItem.id,
          "width__1054": 900,
          "height__c61c": 300
        }
      }
    };

    if (author && author.avatar && author.avatar.url) {
      const authorImage = await createRemoteFileNode({
        url: author.avatar.url.replace('s=96&', 's=250&'),
        parentNodeId: author.id,
        createNode,
        createNodeId,
        cache,
        store,
      });

      if (authorImage) {
        page.sections.push({
          "className__268a": "l-section--outer-width-wide",
          "background__44d0": "dark",
          "deko__3429": true,
          "pattern__9cdc": 2,
          "width__c976": "narrow",
          "content__2cb4": [{
            "title__5426": author.name,
            "subtitle__92ac": "Founder and CTO with a faible for smart frontend solutions",
            "email__70d5": author.email || 'info@kickstartds.com',
            "phone__520b": "+49(0)22868896620",
            "copy__cda3": author.description,
            "image__a463": {
              "src__197b___NODE": authorImage.id,
              "alt__1f75": author.name,
            },
            "type": "contact",
          }],
          "headline__77a3": {
            "level__503c": "p",
            "align__498d": "center",
            "content__3cc5": "",
            "spaceAfter__6f7d": "none",
            "type": "headline"
          },
          "type": "section",
        });
      }
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
