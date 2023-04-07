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
fragment GlossaryComponentDeepNesting on GlossaryComponent {
  cover__bb73 {
    ...GlossaryComponentCoverDeepNesting
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
  dark__f9be
  homeLink__5dc0
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
  tags__736d
  title__e835
  type
  url__b9d5
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