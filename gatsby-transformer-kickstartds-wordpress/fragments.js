import { graphql } from "gatsby";

export const fragments = graphql`
  fragment HeroImage on File {
    childImageSharp {
      gatsbyImageData(layout: FIXED)
    }
  }

  fragment AvatarImage on File {
    childImageSharp {
      gatsbyImageData(layout: FIXED)
    }
  }

  fragment Thumbnail on File {
    childImageSharp {
      gatsbyImageData(layout: FIXED)
    }
  }

  fragment PostPreviewContent on WpPost {
    uri
    title
    databaseId
    excerpt
    date(formatString: "LL")
    featuredImage {
      node {
        localFile {
          ...Thumbnail
        }
      }
    }
    author {
      node {
        name
        firstName
        lastName
        uri
      }
    }
    categories {
      nodes {
        name
        slug
        uri
      }
    }
  }

  fragment KickstartDSPostPreviewContent on KickstartDSPost {
    title
    link
    body
    date
  }

  fragment PostContent on WpPost {
    title
    content
    date(formatString: "LL")
    excerpt
    featuredImage {
      node {
        localFile {
          ...HeroImage
        }
      }
    }
    author {
      node {
        name
        firstName
        lastName
        uri
        description
        avatar {
          url
          width
          height
          imageFile {
            ...AvatarImage
          }
        }
      }
    }
    categories {
      nodes {
        name
        slug
        uri
      }
    }
  }

  fragment PageContent on WpPage {
    title
    content
    databaseId
    featuredImage {
      node {
        localFile {
          ...HeroImage
        }
      }
    }
  }
`;
