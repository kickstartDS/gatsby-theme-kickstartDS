import React from 'react';
import { FunctionComponent } from 'react';
import { format } from 'date-fns';

import { Button } from "@kickstartds/base/lib/button";
import { Headline } from "@kickstartds/base/lib/headline";
import { Divider } from "@kickstartds/base/lib/divider";
import { Section } from "@kickstartds/base/lib/section";
import { Html } from "@kickstartds/base/lib/html";
import { TeaserBox } from "@kickstartds/base/lib/teaser-box";
import { Contact } from "@kickstartds/content/lib/contact";
import { PostHead } from "@kickstartds/blog/lib/post-head";

import { Cta } from "@kickstartds/design-system";

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
          width="wide"
          headline={{
            level: "p",
            align: "center",
            content: "",
            spaceAfter: "none",
          }}
          spaceAfter="none"
          pattern="3">

          <PostHead 
            className="c-post-head--top"
            categories={postHead.categories}
            headline={{
              align: "left",
              content: postHead.headline.content,
              level: "h1",
              pageHeader: false,
              spaceAfter: "none"
            }}
          />
        </Section>

        <Section
          spaceBefore="none"
          spaceAfter="default"
          mode="list"
          width="wide"
          className="l-section--blog"
        >
          <div className="c-post__content">
            <PostHead 
              className="c-post-head--bottom"
              categories={postHead.categories}
              headline={{
                align: "left",
                content: "",
                level: "h1",
                pageHeader: false,
                spaceAfter: "none"
              }}
              image={postHead.image}
            />
            <Html postReadingTime={postReadingTime} postWordCount={postWordCount} {...postBody} />
          </div>
          <div className="c-post__info">
            <div className="c-post__author">
              <Headline
                level="h2"
                align="left"
                spaceAfter="none"
                content="Published by"
              />

              <Contact 
                image={postBio.image}
                twitter={postBio.twitter}
                email={postBio.email}
                title={postBio.title}
                subtitle={format(new Date(postHead.date), 'dd.MM.yyyy')}
                copy={postBio.subtitle}  
              />
              <Divider />
            </div>
            <div className="c-share-bar">
              <Headline
                content="Share this article"
                align="left"
                spaceAfter="none"
                level="h3"
              />
              <Button
                className="c-share-bar__icon"
                variant="clear"
                size="medium"
                label=""
                iconAfter
                icon={{
                  icon: "twitter",
                }}
              />
              <Button
                className="c-share-bar__icon"
                variant="clear"
                size="medium"
                label=""
                iconAfter
                icon={{
                  icon: "facebook",
                }}
              />
              <Button
                className="c-share-bar__icon"
                variant="clear"
                size="medium"
                label=""
                iconAfter
                icon={{
                  icon: "xing",
                }}
              />
              <Button
                className="c-share-bar__icon"
                variant="clear"
                size="medium"
                label=""
                iconAfter
                icon={{
                  icon: "email",
                }}
              />
            </div>
          </div>
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
          {/* <Cta
            headline={{
              level: "h2",
              align: "left",
              spaceAfter: "none",
              content: "",
            }}
            storytelling={{
              image: {
                order: {
                  desktopImageLast: true,
                  mobileImageLast: true,
                },
                source: "img/contact.svg",
              },
              box: {
                headline: {
                  content: "Find out if kickstartDS suits your project",
                  level: "h2",
                  spaceAfter: "none",
                  align: "left",
                },
                text: "Get in contact with our team",
              }
            }}
            button={{
              label: "",
              size: "medium",
              variant: "solid",
              href: "",
            }}
          /> */}
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
