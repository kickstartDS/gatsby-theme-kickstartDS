import React from "react";

import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Layout } from "@kickstartds/gatsby-theme-kickstartds/src/components/Layout";
import { Section } from "@kickstartds/base/lib/section";
import { PostHead } from "@kickstartds/blog/lib/post-head";

export default function PostPage({ data }) {
  const {
    body,
    frontmatter: { title, date, image, categories },
  } = data.mdx;
  console.log('debug', title, date, image, categories);
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
        
        <div className="c-rich-text">
          <MDXRenderer>{body}</MDXRenderer>
        </div>
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
