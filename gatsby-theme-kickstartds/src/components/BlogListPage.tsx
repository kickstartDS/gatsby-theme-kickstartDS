import React from 'react';
import { FunctionComponent } from 'react';

import { useStaticQuery, graphql } from "gatsby";

import { Section } from "@kickstartds/base/lib/section";
import { TeaserBox } from "@kickstartds/base/lib/teaser-box";

import { Layout } from './Layout';
import { getContent } from '../helpers/componentMapper';

export const BlogListPage: FunctionComponent<any> = ({
  sections, ...rest
}) => {
  const teaserImages = useStaticQuery(graphql`
    query {
      kds: file(relativePath: { eq: "img/blog/kds.svg" }) {
        publicURL
      }
      storybook: file(relativePath: { eq: "img/blog/storybook.svg" }) {
        publicURL
      }
      twitter: file(relativePath: { eq: "img/blog/kds-twitter.svg" }) {
        publicURL
      }
    }
  `);

  return (
    <Layout {...rest}>
      {getContent(sections, true)}
      <Section
          className="l-section--content-width-narrow"
          mode="default"
          spaceBefore="small"
          width="wide"
          background="accent"
          headline={{
            level: "p",
            align: "left",
            styleAs: "h2",
            content: "Dig deeper ⛏️",
            spaceAfter: "none",
          }}
          spaceAfter="none">
          <TeaserBox
            ratio="16:9"
            image={teaserImages.kds.publicURL}
            link={{
              size: 'small',
              href: '/',
              label: "Learn more",
              variant: "outline",
            }}
            imageSpacing
            text="Explore kickstartDS, and how it can help your team create consistent interfaces super fast."
            topic="kickstartDS"
          />
          <TeaserBox
            ratio="16:9"
            image={teaserImages.storybook.publicURL}
            link={{
              size: 'small',
              href: '/storybook/',
              label: "Explore components",
              variant: "outline",
            }}
            imageSpacing
            text="Discover all the different components included with kickstartDS, especially their controls and tokens."
            topic="Storybook"
          />
          <TeaserBox
            ratio="16:9"
            image={teaserImages.twitter.publicURL}
            link={{
              size: 'small',
              href: 'https://twitter.com/kickstartDS',
              label: "Visit profile",
              variant: "outline",
            }}
            imageSpacing
            text="Follow us on Twitter for news, updates, announcements and general talk around Design Systems."
            topic="Follow us"
          />
        </Section>
    </Layout>
  );
};
