import React from "react";

import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from '@mdx-js/react';
import { Layout } from "@kickstartds/gatsby-theme-kickstartds/src/components/Layout";
import { Section } from "@kickstartds/base/lib/section";
import { PostHead } from "@kickstartds/blog/lib/post-head";

import '@kickstartds/gatsby-transformer-kickstartds-mdx/src/shiki-twoslash.css';

const nonRteMdxTypes = [
  'Visual',
  'pre',
];

const components = {
  wrapper: ({ children }) =>
    <>
      {children.map((child) =>
        nonRteMdxTypes.includes(child.props.mdxType)
          ? child
          : <div className="c-rich-text">{child}</div>)}
    </>
};

export default function PostPage({ data }) {
  const {
    body,
    frontmatter: { title, date, image, categories },
  } = data.mdx;
  
  return (
    <Layout>
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

        <PostHead
          date={date}
          headline={{
            level: "h1",
            align: "left",
            content: title,
            spaceAfter: "none",
          }}
          imageAlignment="left"
          categories={categories.map((category) => {
            return { 
              label: category,
              size: 'm',
            };
          })}
          image={{
            src: image,
            width: 984,
            height: 478,
          }} />
        
        <MDXProvider components={components}>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </Section>
    </Layout>
  );
}

export const query = graphql`
  query POST_BY_SLUG($slug: String) {
    mdx(slug: { eq: $slug }) {
      id
      slug
      body
      frontmatter {
        date
        title
        image
        categories
      }
    }
  }
`;
