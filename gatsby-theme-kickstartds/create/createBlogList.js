const stripHtml = require("string-strip-html").stripHtml;
const {
  collectGraphQLFragments,
} = require("../src/util/collectGraphQLFragments");
const {
  cleanObjectKeys,
} = require("@kickstartds/jsonschema2graphql/build/dehashing");

module.exports = async ({ actions, graphql }, options) => {
  const { gqlPath } = options;

  const { data } = await graphql(/* GraphQL */ `
    ${await collectGraphQLFragments(
      [
        "SectionComponentDeepNesting",
        "HeaderComponentDeepNesting",
        "FooterComponentDeepNesting",
        "PostAsideComponentDeepNesting",
      ],
      gqlPath
    )}
    {
      allKickstartDsBlogPage {
        edges {
          node {
            slug
            title
            excerpt
            created
            author
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
            categories {
              ...TagLabelComponentDeepNesting
            }
            sections {
              ...SectionComponentDeepNesting
            }
            postAside {
              ...PostAsideComponentDeepNesting
            }
          }
        }
      }
      allKickstartDsHeader {
        edges {
          node {
            component {
              ...HeaderComponentDeepNesting
            }
          }
        }
      }
      allKickstartDsFooter {
        edges {
          node {
            component {
              ...FooterComponentDeepNesting
            }
          }
        }
      }
    }
  `);

  const postTeaser = data.allKickstartDsBlogPage.edges.map((page, index) => {
    const teaser = {
      date: page.node.created,
      link: {
        href: `/${page.node.slug}`,
        label: "read more...",
      },
      title: stripHtml(page.node.title).result,
      body: `${stripHtml(page.node.excerpt).result}`,
      categories:
        page.node.categories && page.node.categories.length
          ? page.node.categories.map((category) => cleanObjectKeys(category))
          : [],
      index: index,
      meta: {
        ...cleanObjectKeys(page.node.postAside).meta,
        author: {
          name: cleanObjectKeys(page.node.postAside).author.title,
          image: {
            ...cleanObjectKeys(page.node.postAside).author.image,
            className: "c-post-meta__avatar",
          },
        },
      },
      type: "post-teaser",
    };

    if (page.node.image) {
      teaser.image = {
        src: page.node.image,
        width: 400,
        height: 300,
      };
    }

    return teaser;
  });

  const headerEn = data.allKickstartDsHeader.edges.find(
    (header) => !header.node.component.activeEntry__254f.includes("de")
  );
  const header = cleanObjectKeys(headerEn.node.component);

  const footerEn = data.allKickstartDsFooter.edges.find(
    (footer) =>
      !footer.node.component.sections__17ac[1].headline__b113.includes(
        "Kontakt"
      )
  );
  const footer = cleanObjectKeys(footerEn.node.component);

  await actions.createPage({
    component: require.resolve("../src/templates/page.js"),
    path: `/blog/`,
    context: {
      page: {
        // TODO remove at a later time, currently used to have posts generated, but not on the list
        postTeaser: postTeaser
          .filter(
            (teaser) =>
              !teaser.categories.some(
                (category) => category.label === "Internal"
              )
          )
          .sort((a, b) => new Date(b.date) - new Date(a.date)),
        title: "Blog – releases, updates, background info // kickstartDS",
        layout: "blog-list",
        description:
          "Read about the latest updates and changes, our rationale behind decisions and how to apply a Design System on our blog",
        header,
        footer,
      },
    },
  });
};
