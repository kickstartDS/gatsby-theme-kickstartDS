import React from "react";
import { graphql } from "gatsby";

import { cleanKeys } from "@kickstartds/gatsby-theme-kickstartds/src/helpers/componentMapper";

import { Layout } from "@kickstartds/gatsby-theme-kickstartds/src/components/Layout";
// TODO this needs to be in @kickstartDS, not in design-ssytem
import { Glossary } from "@kickstartds/design-system/dist/components/glossary/GlossaryComponent";

export default function PostPage({ data }) {
  const { glossary } = cleanKeys(data.kickstartDsGlossaryPage);

  return (
    <Layout>
      <Glossary {...glossary} />
    </Layout>
  );
}

export const query = graphql` 
fragment GlossaryComponentDeepNesting on GlossaryComponent {
  term__e184
  definition__ac38
  cover__bb73 {
    ...GlossaryComponentCoverDeepNesting
  }
  media__a8ab {
    ...GlossaryComponentMediaDeepNesting
  }
  tags__736d
  related__390e {
    ...GlossaryComponentRelatedDeepNesting
  }
  stackshare__481c
  cta__4d5b {
    ...CtaComponentDeepNesting
  }
  type
}
fragment CtaComponentDeepNesting on CtaComponent {
  headline__6749 {
    ...CtaComponentHeadlineDeepNesting
  }
  storytelling__2e1a {
    ...CtaComponentStorytellingDeepNesting
  }
  button__99e5 {
    ...LinkButtonComponentDeepNesting
  }
  type
}
fragment GlossaryComponentCoverDeepNesting on GlossaryComponentCover {
  
  src__ba33 {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
  caption__47fa
}
fragment GlossaryComponentMediaDeepNesting on GlossaryComponentMedia {
  
  src__ba33 {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
  caption__47fa
}
fragment GlossaryComponentRelatedDeepNesting on GlossaryComponentRelated {
  title__e835
  excerpt__cf89
  url__b9d5
  
  image__e3ac {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
}
fragment CtaComponentHeadlineDeepNesting on CtaComponentHeadline {
  align__c75c
  level__ff4c
  styleAs__bcf3
  content__6359
  subheadline__0426
  spaceAfter__c679
  pageHeader__988f
  className__f46b
}
fragment CtaComponentStorytellingDeepNesting on CtaComponentStorytelling {
  image__0d56 {
    ...CtaComponentStorytellingImageDeepNesting
  }
  
  backgroundImage__3307 {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
  backgroundColor__1778
  full__3eb3
  box__bd42 {
    ...CtaComponentStorytellingBoxDeepNesting
  }
  className__f46b
}
fragment LinkButtonComponentDeepNesting on LinkButtonComponent {
  label__b988
  variant__a43d
  size__942c
  className__8726
  icon__157f {
    ...IconComponentDeepNesting
  }
  iconBefore__7991
  iconAfter__c8b6
  dataComponent__8d9e
  fillAnimation__2a89
  iconAnimation__9933
  href__11db
  newTab__dc35
  type
}
fragment CtaComponentStorytellingBoxDeepNesting on CtaComponentStorytellingBox {
  headline__6749 {
    ...CtaComponentStorytellingBoxHeadlineDeepNesting
  }
  text__7b7e
  textAlign__0722
  textColor__fe06
  vAlign__1c04
  hAlign__498c
  link__2569 {
    ...LinkButtonComponentDeepNesting
  }
}
fragment CtaComponentStorytellingImageDeepNesting on CtaComponentStorytellingImage {
  order__1a2c {
    ...CtaComponentStorytellingImageOrderDeepNesting
  }
  
  source__5019 {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
  ratio__141e
  vAlign__1c04
  hAlign__498c
}
fragment CtaComponentStorytellingBoxHeadlineDeepNesting on CtaComponentStorytellingBoxHeadline {
  level__ff4c
  styleAs__bcf3
  align__c75c
  content__6359
  subheadline__0426
  spaceAfter__c679
  pageHeader__988f
  className__f46b
}
fragment IconComponentDeepNesting on IconComponent {
  icon__dcfe
  role__ea32
  className__251a
  type
}
fragment CtaComponentStorytellingImageOrderDeepNesting on CtaComponentStorytellingImageOrder {
  desktopImageLast__ce0f
  mobileImageLast__2fd3
} 
query GLOSSARY_BY_SLUG($slug: String) { 
  kickstartDsGlossaryPage(slug: { eq: $slug }) { 
    glossary { 
      ...GlossaryComponentDeepNesting 
    } 
  } 
} 
  `;