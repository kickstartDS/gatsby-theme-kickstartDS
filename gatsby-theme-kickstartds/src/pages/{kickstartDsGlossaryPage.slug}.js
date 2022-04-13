import React from "react";
import { graphql } from "gatsby";

import { cleanKeys } from "@kickstartds/gatsby-theme-kickstartds/src/helpers/componentMapper";

import { Layout } from "@kickstartds/gatsby-theme-kickstartds/src/components/Layout";
// TODO this needs to be in @kickstartDS, not in design-ssytem
import { Glossary } from "@kickstartds/design-system/dist/components/glossary/GlossaryComponent";
import { SEO } from "../components/Seo";

export default function PostPage({ data }) {
  const { glossary } = cleanKeys(data.kickstartDsGlossaryPage);

  return (
    <Layout>
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
    ...StorytellingComponentDeepNesting
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
fragment StorytellingComponentDeepNesting on StorytellingComponent {
  box__5f7a {
    ...StorytellingComponentBoxDeepNesting
  }
  
  backgroundImage__cb66 {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
  backgroundColor__291a
  full__be79
  image__cc97 {
    ...StorytellingComponentImageDeepNesting
  }
  className__3b87
  type
}
fragment StorytellingComponentBoxDeepNesting on StorytellingComponentBox {
  links__83cd {
    ...LinkButtonComponentDeepNesting
  }
  headline__7c3f {
    ...StorytellingComponentBoxHeadlineDeepNesting
  }
  text__a401
  textAlign__4df6
  textColor__ad35
  vAlign__9bd7
  hAlign__9705
  link__5d0d {
    ...LinkButtonComponentDeepNesting
  }
}
fragment StorytellingComponentImageDeepNesting on StorytellingComponentImage {
  
  source__20fd {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
  ratio__f5fa
  vAlign__9bd7
  hAlign__9705
  order__eda1 {
    ...StorytellingComponentImageOrderDeepNesting
  }
}
fragment LinkButtonComponentDeepNesting on LinkButtonComponent {
  highlighted__83d6
  deko__e569
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
fragment StorytellingComponentBoxHeadlineDeepNesting on StorytellingComponentBoxHeadline {
  level__81f6
  styleAs__96c0
  align__6135
  content__539b
  subheadline__b4cd
  spaceAfter__bdba
  pageHeader__5be3
  className__3b87
}
fragment IconComponentDeepNesting on IconComponent {
  icon__dcfe
  role__ea32
  className__251a
  type
}
fragment StorytellingComponentImageOrderDeepNesting on StorytellingComponentImageOrder {
  mobileImageLast__f625
  desktopImageLast__ed82
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
} 
  `;