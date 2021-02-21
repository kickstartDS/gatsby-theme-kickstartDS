import React, { useState } from "react"

const Layout = ({ children, bodyClass }) => {
  return (
    <div
      id={"GatsbyBody"}
      className={bodyClass}
    >
      <main id="site-content" role="main">
        {children}
      </main>
    </div>
  )
}

export default Layout
