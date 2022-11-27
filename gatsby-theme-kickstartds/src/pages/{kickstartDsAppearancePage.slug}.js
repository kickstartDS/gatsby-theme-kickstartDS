import React from "react";
import { graphql } from "gatsby";

import { cleanKeys } from "@kickstartds/gatsby-theme-kickstartds/src/helpers/componentMapper";

import { Layout } from "@kickstartds/gatsby-theme-kickstartds/src/components/Layout";
// TODO this needs to be in @kickstartDS, not in design-ssytem
import { Appearance } from "@kickstartds/design-system/dist/components/appearance/AppearanceComponent";
import { SEO } from "../components/Seo";

export default function AppearancePage({ data }) {
  const { appearance } = cleanKeys(data.kickstartDsAppearancePage);

  return (
    <Layout
      header={cleanKeys(data.kickstartDsHeader.component)}
      footer={cleanKeys(data.kickstartDsFooter.component)}
    >
      <SEO
        title={data.kickstartDsAppearancePage.title}
        description={data.kickstartDsAppearancePage.description}
        keywords={data.kickstartDsAppearancePage.keywords}
        image={data.kickstartDsAppearancePage.image && data.kickstartDsAppearancePage.image.publicURL}
        cardImage={data.kickstartDsAppearancePage.cardImage && data.kickstartDsAppearancePage.cardImage.publicURL}
        twitterCreator={data.kickstartDsAppearancePage.twitterCreator}
      />
      <Appearance {...appearance} />
    </Layout>
  );
}

export const query = graphql` 
fragment AppearanceComponentDeepNesting on AppearanceComponent {
  cover__c9af {
    ...AppearanceComponentCoverDeepNesting
  }
  description__0c15
  link__5a2c
  media__9948 {
    ...AppearanceComponentMediaDeepNesting
  }
  related__7fc1 {
    ...AppearanceComponentRelatedDeepNesting
  }
  tags__53b2
  title__5953
  type
}
fragment FooterComponentDeepNesting on FooterComponent {
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
  homeLink__5dc0
  light__6e54
  navEnabled__7b87
  navEntries__8f4f {
    ...HeaderComponentNavEntriesDeepNesting
  }
  type
}
fragment AppearanceComponentCoverDeepNesting on AppearanceComponentCover {
  caption__bdf3
  
  src__e67d {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
}
fragment AppearanceComponentMediaDeepNesting on AppearanceComponentMedia {
  caption__bdf3
  
  src__e67d {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
}
fragment AppearanceComponentRelatedDeepNesting on AppearanceComponentRelated {
  excerpt__f719
  
  image__e4fa {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
  title__5953
  url__b835
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
query APPEARANCE_BY_SLUG($slug: String) { 
  kickstartDsAppearancePage(slug: { eq: $slug }) { 
    title 
    description 
    keywords 
    image { 
      publicURL 
    } 
    cardImage { 
      publicURL 
    } 
    appearance { 
      ...AppearanceComponentDeepNesting 
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