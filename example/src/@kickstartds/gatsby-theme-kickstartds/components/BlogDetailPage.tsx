import React from 'react';
import { FunctionComponent } from 'react';

import { Divider } from "@kickstartds/base/lib/divider";
import { Section } from "@kickstartds/base/lib/section";
import { TeaserBox } from "@kickstartds/base/lib/teaser-box";
import { Contact } from "@kickstartds/content/lib/contact";

import { Html } from "@kickstartds/base/lib/html";
import { PostHead } from "@kickstartds/blog/lib/post-head";
import { PostAside } from "@kickstartds/blog/lib/post-aside";
import { PostShareBar } from "@kickstartds/blog/lib/post-share-bar";

import { Cta } from "@kickstartds/design-system/dist/components/cta/CtaComponent";

import { Layout } from './Layout';
import { ScrollSpy } from './ScrollSpy';

import { useStaticQuery, graphql } from "gatsby";

export const BlogDetailPage: FunctionComponent<any> = ({
  postHead,
  postBody,
  postAside,
  postShareBar,
  postContact,
  postReadingTime,
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
          className="l-section--blog"
          width="wide"
          mode="list"
          headline={{
            level: "p",
            align: "center",
            content: "",
            spaceAfter: "none",
          }}
          spaceBefore="small"
          spaceAfter="default">

          {postAside && <PostAside {...postAside} />}

          <div className="c-post__content">
            {postHead && <PostHead {...postHead} />}
            {postBody && <Html className="c-rich-text c-post-text" {...postBody} />}
            {postShareBar && <PostShareBar {...postShareBar} />}
          </div>
        </Section>

        <Section width="wide" spaceBefore="none" spaceAfter="none" align="center">
          <Divider />
        </Section> 

        <Section
          width="narrow"
          mode="list"
          spaceBefore="default"
          spaceAfter="small"
          gutter="large"
          headline={{
            level: "h2",
            spaceAfter: "none",
            content: "Get to know us",
            align: "center",
          }}
        >
          <Cta
            image={{
              order: {
                desktopImageLast: true,
                mobileImageLast: true,
              },
              source: "img/contact.svg",
            }}
            box={{
              headline: {
                content: "Find out if kickstartDS suits your project",
                level: "h2",
                spaceAfter: "none",
                align: "left",
              },
              text: "Get in contact with our team",
              link: {
                label: "Talk to us now",
                href: "https://www.kickstartDS.com",
                variant: "solid",
                size: "medium",
                iconAfter: true,
                icon: {
                  icon: "chevron-right",
                },
              }
            }}
          />
        </Section>

        <Section
          mode="list"
          spaceBefore="small"
          width="narrow"
          background="default"
          headline={{
            level: "p",
            align: "center",
            content: "",
            spaceAfter: "none",
          }}>
          <Contact {...postContact} />
        </Section>

        <Section
          className="col-three"
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
