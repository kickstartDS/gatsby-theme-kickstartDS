import React from 'react';
import { FunctionComponent } from 'react';

import { Section } from "@kickstartds/base/lib/section";
import { PostTeaser } from "@kickstartds/blog/lib/post-teaser";

import { Layout } from './Layout';

export const ShowcaseListPage: FunctionComponent<any> = ({
  postTeaser, ...rest
}) =>
  <Layout {...rest}>
    <Section
      headline={{
        content: "Showcases – projects built on kickstartDS",
        level: "h1",
        subheadline:
          "This includes Design Systems, websites, apps, etc.",
        align: "center",
      }}
      width="wide"
      spaceAfter="none"
    />

    {postTeaser && postTeaser.length > 0 && (
      <Section
        spaceBefore="default"
        width="narrow"
        mode="list"
        gutter="large">
        {postTeaser.map((teaser) => <PostTeaser {...teaser} />)}
      </Section>
    )}
  </Layout>;
