import React from "react"

const PostPreview = ({ post }) => {
  return (
    <>
      <article
        className={`post-${post.id} post type-post`}
        id={`post-${post.id}`}
      >
        <p>{post.title}</p>
      </article>
    </>
  )
}

export default PostPreview
