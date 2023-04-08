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
      <BlogDetailPage
        header={cleanKeys(data.kickstartDsHeader.component)}
        footer={cleanKeys(data.kickstartDsFooter.component)}
        {...cleanKeys(data.kickstartDsBlogPage)}
      />
    </>
  );
}

export const query = graphql` 
fragment ContactComponentDeepNesting on ContactComponent {
  className__462e
  copy__cda3
  image__a463 {
    ...PictureComponentDeepNesting
  }
  links__d246 {
    ...ContactComponentLinksDeepNesting
  }
  subtitle__92ac
  title__5426
  type
}
fragment FooterComponentDeepNesting on FooterComponent {
  dark__1ff9
  homeLink__7c70
  sections__17ac {
    ...FooterComponentSectionsDeepNesting
  }
  subscriptionForm__afcd {
    ...FooterComponentSubscriptionFormDeepNesting
  }
  type
}
fragment HeaderComponentDeepNesting on HeaderComponent {
  activeEntry__254f
  announcementBar__2ba5 {
    ...HeaderComponentAnnouncementBarDeepNesting
  }
  cta__c294 {
    ...HeaderComponentCtaDeepNesting
  }
  dark__f9be
  homeLink__5dc0
  navEnabled__7b87
  navEntries__8f4f {
    ...HeaderComponentNavEntriesDeepNesting
  }
  type
}
fragment HtmlComponentDeepNesting on HtmlComponent {
  className__24cd
  html__8f99
  type
}
fragment PostAsideComponentDeepNesting on PostAsideComponent {
  author__0f95 {
    ...PostAsideComponentAuthorDeepNesting
  }
  className__31d2
  meta__3fe1 {
    ...PostMetaComponentDeepNesting
  }
  shareBar__55c7 {
    ...PostShareBarComponentDeepNesting
  }
  type
}
fragment PostHeadComponentDeepNesting on PostHeadComponent {
  categories__51d2 {
    ...TagLabelComponentDeepNesting
  }
  className__a3e5
  date__05dc
  headline__4ec9 {
    ...PostHeadComponentHeadlineDeepNesting
  }
  imageAlignment__4697
  image__c108 {
    ...PostHeadComponentImageDeepNesting
  }
  type
}
fragment PostShareBarComponentDeepNesting on PostShareBarComponent {
  className__d6f2
  headline__3ab8 {
    ...PostShareBarComponentHeadlineDeepNesting
  }
  links__0338 {
    ...PostShareBarComponentLinksDeepNesting
  }
  type
}
fragment ContactComponentLinksDeepNesting on ContactComponentLinks {
  href__c779
  icon__b943
  label__7ffb
  newTab__97e0
}
fragment PictureComponentDeepNesting on PictureComponent {
  alt__1f75
  className__a117
  height__23ff
  id__9f67
  itemProp__ba17
  lazy__55bf
  noscript__ec26
  pictureClassName__9f3e
  sources__a109 {
    ...PictureComponentSourcesDeepNesting
  }
  
  srcSet__866d {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
  
  src__197b {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
  style__ccee
  type
  width__4691
}
fragment PictureComponentSourcesDeepNesting on PictureComponentSources {
  media__420c
  
  srcSet__866d {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
  type
}
fragment FooterComponentSectionsDeepNesting on FooterComponentSections {
  headline__b113
  links__3f74 {
    ...FooterComponentSectionsLinksDeepNesting
  }
}
fragment FooterComponentSubscriptionFormDeepNesting on FooterComponentSubscriptionForm {
  action__a83d
  buttonLabel__d5bb
  headline__b113
  honeypot__bc4e
  placeholder__f8c9
  subheadline__163b
  tags__87c2
}
fragment FooterComponentSectionsLinksDeepNesting on FooterComponentSectionsLinks {
  href__8955
  label__f0f4
}
fragment HeaderComponentAnnouncementBarDeepNesting on HeaderComponentAnnouncementBar {
  content__4b31
  linkHref__738d
  linkLabel__e25c
}
fragment HeaderComponentCtaDeepNesting on HeaderComponentCta {
  href__815d
  label__e61b
}
fragment HeaderComponentNavEntriesDeepNesting on HeaderComponentNavEntries {
  href__815d
  id__7362
  label__e61b
}
fragment PostAsideComponentAuthorDeepNesting on PostAsideComponentAuthor {
  className__31d2
  copy__f23d
  headline__e226 {
    ...PostAsideComponentAuthorHeadlineDeepNesting
  }
  image__f40b {
    ...PictureComponentDeepNesting
  }
  links__f230 {
    ...PostAsideComponentAuthorLinksDeepNesting
  }
  subtitle__a4ed
  title__a188
  type
}
fragment PostMetaComponentDeepNesting on PostMetaComponent {
  author__a9d0 {
    ...PostMetaComponentAuthorDeepNesting
  }
  className__5dae
  items__25cc {
    ...PostMetaComponentItemsDeepNesting
  }
  type
}
fragment PostAsideComponentAuthorHeadlineDeepNesting on PostAsideComponentAuthorHeadline {
  align__b352
  className__31d2
  content__f35e
  level__f7a7
  pageHeader__7d53
  spaceAfter__c0ff
  styleAs__51ec
  subheadline__664c
  switchOrder__105c
  type
}
fragment PostAsideComponentAuthorLinksDeepNesting on PostAsideComponentAuthorLinks {
  href__98b4
  icon__05d7
  label__6e3e
  newTab__2837
}
fragment PostMetaComponentAuthorDeepNesting on PostMetaComponentAuthor {
  image__3b0a {
    ...PictureComponentDeepNesting
  }
  name__3e80
}
fragment PostMetaComponentItemsDeepNesting on PostMetaComponentItems {
  icon__9fc4
  text__a6d7
}
fragment PostShareBarComponentHeadlineDeepNesting on PostShareBarComponentHeadline {
  align__84ae {
    ...PostShareBarComponentHeadlineAlignDeepNesting
  }
  className__d6f2
  content__00b0 {
    ...PostShareBarComponentHeadlineContentDeepNesting
  }
  level__d60e
  pageHeader__0804
  spaceAfter__3aa5
  styleAs__cecb
  subheadline__75b9
  switchOrder__956d
  type
}
fragment PostShareBarComponentLinksDeepNesting on PostShareBarComponentLinks {
  href__58b0
  icon__4d4f
  newTab__496f
  title__2454
}
fragment PostShareBarComponentHeadlineAlignDeepNesting on PostShareBarComponentHeadlineAlign {
  align__84ae
  className__d6f2
  content__00b0
  level__d60e
  pageHeader__0804
  spaceAfter__3aa5
  styleAs__cecb
  subheadline__75b9
  switchOrder__956d
  type
}
fragment PostShareBarComponentHeadlineContentDeepNesting on PostShareBarComponentHeadlineContent {
  align__84ae
  className__d6f2
  content__00b0
  level__d60e
  pageHeader__0804
  spaceAfter__3aa5
  styleAs__cecb
  subheadline__75b9
  switchOrder__956d
  type
}
fragment PostHeadComponentHeadlineDeepNesting on PostHeadComponentHeadline {
  align__1b07
  className__a3e5
  content__1f5a
  level__cd70
  pageHeader__f637
  spaceAfter__f365
  styleAs__782c
  subheadline__8825
  switchOrder__e1f8
  type
}
fragment PostHeadComponentImageDeepNesting on PostHeadComponentImage {
  alt__bb36
  className__a3e5
  height__c61c
  id__5e93
  itemProp__e1f8
  lazy__82e1
  noscript__e188
  pictureClassName__00ff
  sources__9bbc {
    ...PostHeadComponentImageSourcesDeepNesting
  }
  
  srcSet__1861 {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
  
  src__2f94 {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
  style__87b8
  type
  width__1054
}
fragment TagLabelComponentDeepNesting on TagLabelComponent {
  className__2a76
  label__7246
  link__6ced
  removable__7eaf
  size__d93f
  type
}
fragment PostHeadComponentImageSourcesDeepNesting on PostHeadComponentImageSources {
  media__c4bf
  
  srcSet__1861 {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
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
  kickstartDsHeader { 
    component { 
      ...HeaderComponentDeepNesting 
    } 
  } 
  kickstartDsFooter { 
    component { 
      ...FooterComponentDeepNesting 
    } 
  } 
} 
  `;