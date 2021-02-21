import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PostPreview from "../components/PostPreview";

const KickstartArchive = (props) => {  
  const {
    data: {
      allKickstartDsPost: { nodes },
    },
  } = props;

  return (
    <Layout
      bodyClass="home">

      {nodes &&
      nodes.map((post, index) => {
        return (
          <PostPreview
            key={index}
            post={post}
          />
        )
      })}
    </Layout>
  );
}

export default KickstartArchive;
