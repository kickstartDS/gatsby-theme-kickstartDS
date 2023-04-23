import React from "react";
import { graphql } from "gatsby";

import { cleanObjectKeys } from "@kickstartds/jsonschema2graphql/build/dehashing";

import { Layout } from "@kickstartds/gatsby-theme-kickstartds/src/components/Layout";
import { TagLabel } from "@kickstartds/base/lib/tag-label";
import { SEO } from "../components/Seo";

export default function TagPage({ data }) {
  const { tagLabel } = cleanObjectKeys(data.kickstartDsTagPage);

  console.log("data.kickstartDsTagPage", data.kickstartDsTagPage);

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
        title={data.kickstartDsTagPage.title}
        description={data.kickstartDsTagPage.description}
        keywords={data.kickstartDsTagPage.keywords}
        image={
          data.kickstartDsTagPage.image &&
          data.kickstartDsTagPage.image.publicURL
        }
        cardImage={
          data.kickstartDsTagPage.cardImage &&
          data.kickstartDsTagPage.cardImage.publicURL
        }
        twitterCreator={data.kickstartDsTagPage.twitterCreator}
      />
      <TagLabel {...tagLabel} />
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
fragment TagLabelComponentDeepNesting on TagLabelComponent {
  className__2a76
  component__0189
  label__7246
  link__6ced
  removable__7eaf
  size__d93f
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
query TAG_BY_SLUG($slug: String) { 
  kickstartDsTagPage(slug: { eq: $slug }) { 
    title 
    description 
    keywords 
    image { 
      publicURL 
    } 
    cardImage { 
      publicURL 
    } 
    tagLabel { 
      ...TagLabelComponentDeepNesting 
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