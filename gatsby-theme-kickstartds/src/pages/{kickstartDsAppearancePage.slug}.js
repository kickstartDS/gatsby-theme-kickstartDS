import React from "react";
import { graphql } from "gatsby";

import { cleanObjectKeys } from "@kickstartds/jsonschema2graphql/build/dehashing";

import { Layout } from "@kickstartds/gatsby-theme-kickstartds/src/components/Layout";
import { Appearance } from "@kickstartds/design-system/dist/components/appearance/AppearanceComponent";
import { SEO } from "../components/Seo";

export default function AppearancePage({ data }) {
  const { appearance } = cleanObjectKeys(data.kickstartDsAppearancePage);

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

  return (
    <Layout header={header} footer={footer}>
      <SEO
        title={data.kickstartDsAppearancePage.title}
        description={data.kickstartDsAppearancePage.description}
        keywords={data.kickstartDsAppearancePage.keywords}
        image={
          data.kickstartDsAppearancePage.image &&
          data.kickstartDsAppearancePage.image.publicURL
        }
        cardImage={
          data.kickstartDsAppearancePage.cardImage &&
          data.kickstartDsAppearancePage.cardImage.publicURL
        }
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
  date__3714
  description__0c15
  host__c039 {
    ...AppearanceComponentHostDeepNesting
  }
  language__9ebf
  link__5a2c
  media__9948 {
    ...AppearanceComponentMediaDeepNesting
  }
  overviewPage__42f7
  participants__d862 {
    ...PersonComponentDeepNesting
  }
  related__7fc1 {
    ...AppearanceComponentRelatedDeepNesting
  }
  tags__53b2 {
    ...AppearanceComponentTagsDeepNesting
  }
  title__5953
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
fragment AppearanceComponentCoverDeepNesting on AppearanceComponentCover {
  caption__bdf3
  
  src__e67d {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
}
fragment AppearanceComponentHostDeepNesting on AppearanceComponentHost {
  name__b20a
  url__b835
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
  tags__53b2 {
    ...AppearanceComponentRelatedTagsDeepNesting
  }
  title__5953
  type
  typeLabel__b70a
  url__b835
}
fragment AppearanceComponentTagsDeepNesting on AppearanceComponentTags {
  label__d957
  link__5a2c
}
fragment PersonComponentDeepNesting on PersonComponent {
  
  avatar__d3c6 {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
  className__fb40
  component__8c90
  name__fac5
  size__b1dd
  title__b0b7
  type
}
fragment AppearanceComponentRelatedTagsDeepNesting on AppearanceComponentRelatedTags {
  label__d957
  link__5a2c
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
  `;