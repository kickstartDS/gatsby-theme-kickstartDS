import React from "react";
import { graphql } from "gatsby";

import { cleanObjectKeys } from "@kickstartds/jsonschema2graphql/build/dehashing";

import { Layout } from "@kickstartds/gatsby-theme-kickstartds/src/components/Layout";
import { Showcase } from "@kickstartds/design-system/dist/components/showcase/ShowcaseComponent";
import { SEO } from "../components/Seo";

export default function ShowcasePage({ data }) {
  const { showcase } = cleanObjectKeys(data.kickstartDsShowcasePage);

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
        title={data.kickstartDsShowcasePage.title}
        description={data.kickstartDsShowcasePage.description}
        keywords={data.kickstartDsShowcasePage.keywords}
        image={
          data.kickstartDsShowcasePage.image &&
          data.kickstartDsShowcasePage.image.publicURL
        }
        cardImage={
          data.kickstartDsShowcasePage.cardImage &&
          data.kickstartDsShowcasePage.cardImage.publicURL
        }
        twitterCreator={data.kickstartDsShowcasePage.twitterCreator}
      />
      <Showcase {...showcase} />
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
fragment ShowcaseComponentDeepNesting on ShowcaseComponent {
  cover__b563 {
    ...ShowcaseComponentCoverDeepNesting
  }
  description__80c3
  excerpt__0fe1
  link__5db3
  media__dbe9 {
    ...ShowcaseComponentMediaDeepNesting
  }
  overviewPage__7193
  quote__039f {
    ...ShowcaseComponentQuoteDeepNesting
  }
  related__7eba {
    ...ShowcaseComponentRelatedDeepNesting
  }
  summary__c9c8
  tags__c50c {
    ...ShowcaseComponentTagsDeepNesting
  }
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
  mode__fc36
  
  src__1db5 {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
}
fragment ShowcaseComponentQuoteDeepNesting on ShowcaseComponentQuote {
  byline__61ce
  className__07c7
  component__ad89
  
  image__e691 {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
  quoteToggle__4278
  source__93d0
  text__b7b2
  type
}
fragment ShowcaseComponentRelatedDeepNesting on ShowcaseComponentRelated {
  excerpt__0fe1
  
  image__e691 {
    childImageSharp {
      gatsbyImageData
    }
    publicURL
  }
  tags__c50c {
    ...ShowcaseComponentRelatedTagsDeepNesting
  }
  title__b176
  type
  typeLabel__2a43
  url__e10c
}
fragment ShowcaseComponentTagsDeepNesting on ShowcaseComponentTags {
  label__eb6b
  link__5db3
}
fragment ShowcaseComponentRelatedTagsDeepNesting on ShowcaseComponentRelatedTags {
  label__eb6b
  link__5db3
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