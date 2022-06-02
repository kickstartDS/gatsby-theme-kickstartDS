import React from "react";
import { graphql } from "gatsby";

import { cleanKeys } from "@kickstartds/gatsby-theme-kickstartds/src/helpers/componentMapper";
import { BlogDetailPage } from "../components/BlogDetailPage";
import { SEO } from "../components/Seo";

export default function PostPage({ data }) {
  return (
    <>
      <SEO
        title={data.kickstartDsBlogPage.title}
        description={data.kickstartDsBlogPage.description}
        keywords={data.kickstartDsBlogPage.keywords}
        image={data.kickstartDsBlogPage.image && data.kickstartDsBlogPage.image.publicURL}
        cardImage={data.kickstartDsBlogPage.cardImage && data.kickstartDsBlogPage.cardImage.publicURL}
        twitterCreator={data.kickstartDsBlogPage.twitterCreator}
      />
      <BlogDetailPage {...cleanKeys(data.kickstartDsBlogPage)} />
    </>
  );
}

export const query = graphql` 
fragment ContactComponentDeepNesting on ContactComponent {
  image__a463 {
    ...PictureComponentDeepNesting
  }
  title__5426
  subtitle__92ac
  links__d246 {
    ...ContactComponentLinksDeepNesting
  }
  copy__cda3
  className__462e
  type
}
fragment HtmlComponentDeepNesting on HtmlComponent {
  html__8f99
  className__24cd
  type
}
fragment PostAsideComponentDeepNesting on PostAsideComponent {
  author__0f95 {
    ...PostAsideComponentAuthorDeepNesting
  }
  meta__3fe1 {
    ...PostMetaComponentDeepNesting
  }
  shareBar__55c7 {
    ...PostShareBarComponentDeepNesting
  }
  className__31d2
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
fragment PostShareBarComponentDeepNesting on PostShareBarComponent {
  headline__3ab8 {
    ...PostShareBarComponentHeadlineDeepNesting
  }
  links__0338 {
    ...PostShareBarComponentLinksDeepNesting
  }
  className__d6f2
  type
}
fragment ContactComponentLinksDeepNesting on ContactComponentLinks {
  icon__b943
  label__7ffb
  href__c779
  newTab__97e0
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
  type
}
fragment PostAsideComponentAuthorDeepNesting on PostAsideComponentAuthor {
  image__f40b {
    ...PictureComponentDeepNesting
  }
  title__a188
  subtitle__a4ed
  links__f230 {
    ...PostAsideComponentAuthorLinksDeepNesting
  }
  copy__f23d
  className__31d2
  type
  headline__e226
}
fragment PostMetaComponentDeepNesting on PostMetaComponent {
  author__a9d0 {
    ...PostMetaComponentAuthorDeepNesting
  }
  items__25cc {
    ...PostMetaComponentItemsDeepNesting
  }
  className__5dae
  type
}
fragment PostAsideComponentAuthorLinksDeepNesting on PostAsideComponentAuthorLinks {
  icon__05d7
  label__6e3e
  href__98b4
  newTab__2837
}
fragment PostMetaComponentAuthorDeepNesting on PostMetaComponentAuthor {
  name__3e80
  image__3b0a {
    ...PictureComponentDeepNesting
  }
}
fragment PostMetaComponentItemsDeepNesting on PostMetaComponentItems {
  icon__9fc4
  text__a6d7
}
fragment PostShareBarComponentHeadlineDeepNesting on PostShareBarComponentHeadline {
  content__00b0
  align__84ae
  level__d60e
  styleAs__cecb
  subheadline__75b9
  spaceAfter__3aa5
  pageHeader__0804
  className__d6f2
  type
  switchOrder__956d
}
fragment PostShareBarComponentLinksDeepNesting on PostShareBarComponentLinks {
  href__58b0
  icon__4d4f
  title__2454
  newTab__496f
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
  type
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
  noscript__e188
  lazy__82e1
  sources__9bbc {
    ...PostHeadComponentImageSourcesDeepNesting
  }
  pictureClassName__00ff
  type
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
  type
} 
query BLOG_BY_SLUG($slug: String) { 
  kickstartDsBlogPage(slug: { eq: $slug }) { 
    title 
    description 
    keywords 
    image { 
      publicURL 
    } 
    cardImage { 
      publicURL 
    } 
    postHead { 
      ...PostHeadComponentDeepNesting 
    } 
    postBody { 
      ...HtmlComponentDeepNesting 
    } 
    postAside { 
      ...PostAsideComponentDeepNesting 
    } 
    postShareBar { 
      ...PostShareBarComponentDeepNesting 
    } 
    postContact { 
      ...ContactComponentDeepNesting 
    } 
    postReadingTime 
    postWordCount 
  } 
} 
  `;