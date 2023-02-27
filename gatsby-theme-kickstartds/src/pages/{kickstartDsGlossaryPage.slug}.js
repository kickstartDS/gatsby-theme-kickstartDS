import React from "react";
import { graphql } from "gatsby";

import { cleanKeys } from "@kickstartds/gatsby-theme-kickstartds/src/helpers/componentMapper";

import { Layout } from "@kickstartds/gatsby-theme-kickstartds/src/components/Layout";
// TODO this needs to be in @kickstartDS, not in design-ssytem
import { Glossary } from "@kickstartds/design-system/dist/components/glossary/GlossaryComponent";
import { SEO } from "../components/Seo";

export default function GlossaryPage({ data }) {
  const { glossary } = cleanKeys(data.kickstartDsGlossaryPage);

  return (
    <Layout
      header={cleanKeys(data.kickstartDsHeader.component)}
      footer={cleanKeys(data.kickstartDsFooter.component)}
    >
      <SEO
        title={data.kickstartDsGlossaryPage.title}
        description={data.kickstartDsGlossaryPage.description}
        keywords={data.kickstartDsGlossaryPage.keywords}
        image={data.kickstartDsGlossaryPage.image && data.kickstartDsGlossaryPage.image.publicURL}
        cardImage={data.kickstartDsGlossaryPage.cardImage && data.kickstartDsGlossaryPage.cardImage.publicURL}
        twitterCreator={data.kickstartDsGlossaryPage.twitterCreator}
      />
      <Glossary {...glossary} />
    </Layout>
  );
}

export const query = graphql` 
fragment FooterComponentDeepNesting on FooterComponent {
  sections__17ac {
    ...FooterComponentSectionsDeepNesting
  }
  subscriptionForm__afcd {
    ...FooterComponentSubscriptionFormDeepNesting
  }
  type
}
fragment GlossaryComponentDeepNesting on GlossaryComponent {
  cover__bb73 {
    ...GlossaryComponentCoverDeepNesting
  }
  cta__4d5b {
    ...StorytellingComponentDeepNesting
  }
  definition__ac38
  media__a8ab {
    ...GlossaryComponentMediaDeepNesting
  }
  related__390e {
    ...GlossaryComponentRelatedDeepNesting
  }
  stackshare__481c
  tags__736d
  term__e184
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
  homeLink__5dc0
  light__6e54
  navEnabled__7b87
  navEntries__8f4f {
    ...HeaderComponentNavEntriesDeepNesting
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
fragment GlossaryComponentCoverDeepNesting on GlossaryComponentCover {
  caption__47fa
  
  src__ba33 {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
}
fragment GlossaryComponentMediaDeepNesting on GlossaryComponentMedia {
  caption__47fa
  
  src__ba33 {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
}
fragment GlossaryComponentRelatedDeepNesting on GlossaryComponentRelated {
  excerpt__cf89
  
  image__e3ac {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
  title__e835
  url__b9d5
}
fragment StorytellingComponentDeepNesting on StorytellingComponent {
  backgroundColor__291a
  
  backgroundImage__cb66 {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
  box__5f7a {
    ...StorytellingComponentBoxDeepNesting
  }
  className__3b87
  full__be79
  image__cc97 {
    ...StorytellingComponentImageDeepNesting
  }
  type
}
fragment StorytellingComponentBoxDeepNesting on StorytellingComponentBox {
  hAlign__9705
  headline__7c3f {
    ...StorytellingComponentBoxHeadlineDeepNesting
  }
  link__5d0d {
    ...LinkButtonComponentDeepNesting
  }
  links__83cd {
    ...LinkButtonComponentDeepNesting
  }
  textAlign__4df6
  textColor__ad35
  text__a401
  vAlign__9bd7
}
fragment StorytellingComponentImageDeepNesting on StorytellingComponentImage {
  hAlign__9705
  order__eda1 {
    ...StorytellingComponentImageOrderDeepNesting
  }
  ratio__f5fa
  
  source__20fd {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
  vAlign__9bd7
}
fragment LinkButtonComponentDeepNesting on LinkButtonComponent {
  className__8726 {
    ...ButtonComponentDeepNesting
  }
  dataComponent__8d9e {
    ...ButtonComponentDeepNesting
  }
  deko__e569
  fillAnimation__2a89 {
    ...ButtonComponentDeepNesting
  }
  highlighted__83d6
  href__11db
  iconAfter__c8b6 {
    ...ButtonComponentDeepNesting
  }
  iconAnimation__9933 {
    ...ButtonComponentDeepNesting
  }
  iconBefore__7991 {
    ...ButtonComponentDeepNesting
  }
  icon__157f {
    ...IconComponentDeepNesting
  }
  inverted__2475
  label__b988 {
    ...ButtonComponentDeepNesting
  }
  newTab__dc35
  size__942c {
    ...ButtonComponentDeepNesting
  }
  type
  variant__a43d {
    ...ButtonComponentDeepNesting
  }
}
fragment StorytellingComponentBoxHeadlineDeepNesting on StorytellingComponentBoxHeadline {
  align__6135
  className__3b87
  content__539b
  level__81f6
  pageHeader__5be3
  spaceAfter__bdba
  styleAs__96c0
  subheadline__b4cd
  switchOrder__4fe4
  type
}
fragment ButtonComponentDeepNesting on ButtonComponent {
  className__f69c
  dataComponent__fb24
  deko__578c
  disabled__f1d0
  fillAnimation__a843
  highlighted__46cc
  iconAfter__9214
  iconAnimation__a42f
  iconBefore__ce4f
  icon__b287 {
    ...IconComponentDeepNesting
  }
  inverted__eb49
  label__634c
  name__6a5d
  size__1735
  type
  typeProp__0e9c
  value__ed44
  variant__c8d5
}
fragment IconComponentDeepNesting on IconComponent {
  className__251a
  icon__dcfe
  role__ea32
  type
}
fragment StorytellingComponentImageOrderDeepNesting on StorytellingComponentImageOrder {
  desktopImageLast__ed82
  mobileImageLast__f625
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
query GLOSSARY_BY_SLUG($slug: String) { 
  kickstartDsGlossaryPage(slug: { eq: $slug }) { 
    title 
    description 
    keywords 
    image { 
      publicURL 
    } 
    cardImage { 
      publicURL 
    } 
    glossary { 
      ...GlossaryComponentDeepNesting 
    } 
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