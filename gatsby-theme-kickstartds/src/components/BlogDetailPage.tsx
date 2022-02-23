import React from 'react';
import { FunctionComponent } from 'react';

import { Section } from "@kickstartds/base/lib/section";
import { Divider } from "@kickstartds/base/lib/divider";
import { Html } from "@kickstartds/base/lib/html";
import { PostHead } from "@kickstartds/blog/lib/post-head";
import { PostAside } from "@kickstartds/blog/lib/post-aside";

import { Layout } from './Layout';

export const BlogDetailPage: FunctionComponent<any> = ({
  postHead,
  postBody,
  postAside,
  postShareBar,
  postContact,
  postReadingTime,
  ...rest
}) => 
  <>
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
        </div>
      </Section>

      <Section width="wide" spaceBefore="none" spaceAfter="none" align="center">
        <Divider />
      </Section> 
    </Layout>
  </>;
