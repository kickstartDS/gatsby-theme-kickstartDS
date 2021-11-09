import React from 'react';
import { FunctionComponent } from 'react';

import { StaticImage } from "gatsby-plugin-image";

import { Section } from "@kickstartds/base/lib/section";
import { Html } from "@kickstartds/base/lib/html";
import { TeaserBox } from "@kickstartds/base/lib/teaser-box";
import { Contact } from "@kickstartds/content/lib/contact";
import { PostHead } from "@kickstartds/blog/lib/post-head";

import { Layout } from './Layout';
import { ScrollSpy } from './ScrollSpy';

import { useStaticQuery, graphql } from "gatsby";

export const BlogDetailPage: FunctionComponent<any> = ({
  postHead,
  postBody,
  postBio,
  postReadingTime,
  postWordCount,
  ...rest
}) => {
  const teaserImages = useStaticQuery(graphql`
    query {
      blog: file(relativePath: { eq: "img/blog/back-to-blog.svg" }) {
        publicURL
      }
      kds: file(relativePath: { eq: "img/blog/kds.svg" }) {
        publicURL
      }
      storybook: file(relativePath: { eq: "img/blog/storybook.svg" }) {
        publicURL
      }
    }
  `);

  return (
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
        </Section>

        <Section
          className="l-section--content-width-narrow"
          mode="list"
          spaceBefore="none"
          width="wide"
          background="default"
          headline={{
            level: "p",
            align: "center",
            content: "",
            spaceAfter: "none",
          }}>
          <Contact {...postBio} />
        </Section>

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
            image={teaserImages.blog.publicURL}
            link={{
              size: 'small',
              href: '/blog/',
              label: "Read more",
              variant: "outline",
            }}
            imageSpacing
            text="Have a look through our other blog posts about all aspects kickstartDS, technical or not."
            topic="Back to blog"
          />
          <TeaserBox
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
        </Section>
      </Layout>
    </>
  );
};
