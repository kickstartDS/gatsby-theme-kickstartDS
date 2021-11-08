import React from 'react';
import { FunctionComponent } from 'react';

import { Section } from "@kickstartds/base/lib/section";
import { Html } from "@kickstartds/base/lib/html";
import { TeaserBox } from "@kickstartds/base/lib/teaser-box";
import { Contact } from "@kickstartds/content/lib/contact";
import { PostHead } from "@kickstartds/blog/lib/post-head";

import { Layout } from './Layout';
import { ScrollSpy } from './ScrollSpy';

export const BlogDetailPage: FunctionComponent<any> = ({
  postHead,
  postBody,
  postBio,
  postReadingTime,
  postWordCount,
  ...rest
}) => (
  <>
    <ScrollSpy readingTime={postReadingTime} />
    <Layout {...rest}>
      <Section
        className="l-section--content-width-narrow"
        mode="list"
        spaceBefore="small"
        width="wide"
        background="default"
        headline={{
          level: "p",
          align: "center",
          content: "",
          spaceAfter: "none",
        }}
        spaceAfter="default">

        <PostHead {...postHead} />
        <Html postReadingTime={postReadingTime} postWordCount={postWordCount} {...postBody} />
        <Contact {...postBio} />

      </Section>
      <Section
        className="l-section--content-width-narrow"
        mode="default"
        spaceBefore="small"
        width="wide"
        background="default"
        headline={{
          level: "p",
          align: "left",
          styleAs: "h2",
          content: "Dig deeper ⛏️",
          spaceAfter: "none",
        }}
        spaceAfter="default">
        <TeaserBox
          image="https://picsum.photos/seed/kdsteaserbox-01/500/300"
          link={{
            size: 'small',
            href: 'https://www.kickstartDS.com/blog/',
            label: "Read more",
            variant: "outline",
          }}
          ratio="16:9"
          text="Have a look through our other blog posts about all aspects kickstartDS, technical or not."
          topic="Back to blog"
        />
        <TeaserBox
          image="https://picsum.photos/seed/kdsteaserbox-02/500/300"
          link={{
            size: 'small',
            href: 'https://www.kickstartDS.com',
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
            href: 'https://www.kickstartDS.com/storybook/',
            label: "Explore components",
            variant: "outline",
          }}
          ratio="16:9"
          text="Discover all the different components included with kickstartDS, especially their controls and tokens."
          topic="Storybook"
        />
      </Section>
    </Layout>
  </>
);
