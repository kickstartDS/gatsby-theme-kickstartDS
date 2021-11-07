import React from "react";
import { graphql } from "gatsby";

import { cleanKeys } from "@kickstartds/gatsby-theme-kickstartds/src/helpers/componentMapper";
import { BlogDetailPage } from "../components/BlogDetailPage";

export default function PostPage({ data }) {
  return (
    <BlogDetailPage {...cleanKeys(data.kickstartDsBlogPage)} />
  );
}

export const query = graphql` 
fragment ContactComponentDeepNesting on ContactComponent {
  image__a463 {
    ...PictureComponentDeepNesting
  }
  title__5426
  subtitle__92ac
  phone__520b
  email__70d5
  copy__cda3
  className__462e
  type
}
fragment HtmlComponentDeepNesting on HtmlComponent {
  html__8f99
  className__24cd
  type
}
fragment PostHeadComponentDeepNesting on PostHeadComponent {
  image__c108 {
    ...PostHeadComponentImageDeepNesting
  }
  imageAlignment__4697
  date__05dc
  headline__4ec9 {
    ...PostHeadComponentHeadlineDeepNesting
  }
  categories__51d2 {
    ...TagLabelComponentDeepNesting
  }
  className__a3e5
  type
}
fragment PictureComponentDeepNesting on PictureComponent {
  
  src__197b {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
  
  srcSet__866d {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
  alt__1f75
  width__4691
  height__23ff
  className__a117
  id__9f67
  itemProp__ba17
  style__ccee
  objectFit__1269
  noscript__ec26
  lazy__55bf
  sources__a109 {
    ...PictureComponentSourcesDeepNesting
  }
  pictureClassName__9f3e
  type
}
fragment PictureComponentSourcesDeepNesting on PictureComponentSources {
  
  srcSet__866d {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
  media__420c
  typeProp__c1ea
}
fragment PostHeadComponentHeadlineDeepNesting on PostHeadComponentHeadline {
  level__cd70
  styleAs__782c
  align__1b07
  content__1f5a
  subheadline__8825
  spaceAfter__f365
  pageHeader__f637
  className__a3e5
  switchOrder__e1f8
}
fragment PostHeadComponentImageDeepNesting on PostHeadComponentImage {
  
  src__2f94 {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
  
  srcSet__1861 {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
  alt__bb36
  width__1054
  height__c61c
  className__a3e5
  id__5e93
  itemProp__e1f8
  style__87b8
  objectFit__f4e2
  noscript__e188
  lazy__82e1
  sources__9bbc {
    ...PostHeadComponentImageSourcesDeepNesting
  }
  pictureClassName__00ff
}
fragment TagLabelComponentDeepNesting on TagLabelComponent {
  label__7246
  size__d93f
  link__6ced
  removable__7eaf
  className__2a76
  type
}
fragment PostHeadComponentImageSourcesDeepNesting on PostHeadComponentImageSources {
  
  srcSet__1861 {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
  media__c4bf
  typeProp__be75
} 
query BLOG_BY_SLUG($slug: String) { 
  kickstartDsBlogPage(slug: { eq: $slug }) { 
    postHead { 
      ...PostHeadComponentDeepNesting 
    } 
    postBody { 
      ...HtmlComponentDeepNesting 
    } 
    postBio { 
      ...ContactComponentDeepNesting 
    } 
    postReadingTime 
    postWordCount 
  } 
} 
  `;