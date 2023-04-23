import React from "react";
import { FunctionComponent } from "react";

import { Section } from "@kickstartds/base/lib/section";
import { PostTeaser } from "@kickstartds/blog/lib/post-teaser";

import { Layout } from "./Layout";

export const BlogListPage: FunctionComponent<any> = ({
  postTeaser,
  ...rest
}) => (
  <Layout {...rest}>
    <Section
      headline={{
        content: "Welcome to the Blog",
        level: "h1",
        subheadline: "Here we keep you up to date on everything important",
        align: "center",
      }}
      width="wide"
      spaceAfter="none"
    />

    {postTeaser && postTeaser.length > 0 && (
      <Section spaceBefore="default" width="narrow" mode="list" gutter="large">
        {postTeaser.map((teaser) => (
          <PostTeaser {...teaser} />
        ))}
      </Section>
    )}
  </Layout>
);
