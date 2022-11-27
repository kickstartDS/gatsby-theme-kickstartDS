import React from 'react';
import { FunctionComponent } from 'react';

import { Section } from "@kickstartds/base/lib/section";
import { PostTeaser } from "@kickstartds/blog/lib/post-teaser";

import { Layout } from './Layout';

export const AppearanceListPage: FunctionComponent<any> = ({
  postTeaser, ...rest
}) =>
  <Layout {...rest}>
    <Section
      headline={{
        content: "Have a look through our online appearances",
        level: "h1",
        subheadline:
          "We try to always keep you up-to-date on the places we've been to",
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
