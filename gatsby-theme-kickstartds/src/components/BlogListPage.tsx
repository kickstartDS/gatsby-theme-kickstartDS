import React from 'react';
import { FunctionComponent } from 'react';

import { Section } from "@kickstartds/base/lib/section";
import { TeaserBox } from "@kickstartds/base/lib/teaser-box";

import { Layout } from './Layout';
import { getContent } from '../helpers/componentMapper';

export const BlogListPage: FunctionComponent<any> = ({
  sections, ...rest
}) => (
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
        spaceAfter="default">
        <TeaserBox
          image="https://picsum.photos/seed/kdsteaserbox-02/500/300"
          link={{
            size: 'small',
            href: '/',
            label: "Learn more",
            variant: "outline",
          }}
          ratio="16:9"
          text="Explore kickstartDS, and how it can help your team create consistent interfaces super fast."
          topic="kickstartDS"
        />
        <TeaserBox
          image="https://picsum.photos/seed/kdsteaserbox-03/500/300"
          link={{
            size: 'small',
            href: '/storybook/',
            label: "Explore components",
            variant: "outline",
          }}
          ratio="16:9"
          text="Discover all the different components included with kickstartDS, especially their controls and tokens."
          topic="Storybook"
        />
        <TeaserBox
          image="https://picsum.photos/seed/kdsteaserbox-04/500/300"
          link={{
            size: 'small',
            href: 'https://twitter.com/kickstartDS',
            label: "Visit profile",
            variant: "outline",
          }}
          ratio="16:9"
          text="Follow us on Twitter for news, updates, announcements and general talk around Design Systems."
          topic="Follow us"
        />
      </Section>
  </Layout>
);
