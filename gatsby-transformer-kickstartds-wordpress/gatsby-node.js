const stripHtml = require("string-strip-html").stripHtml;
const hashFieldName = require('@kickstartds/jsonschema2graphql/build/schemaReducer').hashFieldName;
const typeResolutionField = 'type';

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type KickstartDsWordpressPage implements Node & KickstartDsPage @dontInfer {
      id: ID!
      layout: String!
      title: String!
      description: String
      keywords: String
      image: File @link(from: "image___NODE")
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

exports.onCreateNode = async ({ node, actions, getNode, createNodeId, createContentDigest }) => {
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
      description: stripHtml(node.excerpt).result,
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
      "type": "sections",
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
      "type": "sections",
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

        page.image___NODE = fileMediaItem.id;
      }
    };

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
