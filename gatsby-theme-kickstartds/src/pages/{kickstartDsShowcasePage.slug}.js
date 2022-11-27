import React from "react";
import { graphql } from "gatsby";

import { cleanKeys } from "@kickstartds/gatsby-theme-kickstartds/src/helpers/componentMapper";

import { Layout } from "@kickstartds/gatsby-theme-kickstartds/src/components/Layout";
// TODO this needs to be in @kickstartDS, not in design-ssytem
import { Showcase } from "@kickstartds/design-system/dist/components/showcase/ShowcaseComponent";
import { SEO } from "../components/Seo";

export default function ShowcasePage({ data }) {
  const { showcase } = cleanKeys(data.kickstartDsShowcasePage);

  return (
    <Layout
      header={cleanKeys(data.kickstartDsHeader.component)}
      footer={cleanKeys(data.kickstartDsFooter.component)}
    >
      <SEO
        title={data.kickstartDsShowcasePage.title}
        description={data.kickstartDsShowcasePage.description}
        keywords={data.kickstartDsShowcasePage.keywords}
        image={data.kickstartDsShowcasePage.image && data.kickstartDsShowcasePage.image.publicURL}
        cardImage={data.kickstartDsShowcasePage.cardImage && data.kickstartDsShowcasePage.cardImage.publicURL}
        twitterCreator={data.kickstartDsShowcasePage.twitterCreator}
      />
      <Showcase {...showcase} />
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
fragment ShowcaseComponentDeepNesting on ShowcaseComponent {
  cover__b563 {
    ...ShowcaseComponentCoverDeepNesting
  }
  description__80c3
  link__5db3
  media__dbe9 {
    ...ShowcaseComponentMediaDeepNesting
  }
  related__7eba {
    ...ShowcaseComponentRelatedDeepNesting
  }
  tags__c50c
  title__b176
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
fragment ShowcaseComponentCoverDeepNesting on ShowcaseComponentCover {
  caption__7b99
  
  src__1db5 {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
}
fragment ShowcaseComponentMediaDeepNesting on ShowcaseComponentMedia {
  caption__7b99
  
  src__1db5 {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
}
fragment ShowcaseComponentRelatedDeepNesting on ShowcaseComponentRelated {
  excerpt__0fe1
  
  image__e691 {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
  title__b176
  url__e10c
} 
query SHOWCASE_BY_SLUG($slug: String) { 
  kickstartDsShowcasePage(slug: { eq: $slug }) { 
    title 
    description 
    keywords 
    image { 
      publicURL 
    } 
    cardImage { 
      publicURL 
    } 
    showcase { 
      ...ShowcaseComponentDeepNesting 
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