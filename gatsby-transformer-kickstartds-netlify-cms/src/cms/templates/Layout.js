import React from 'react';

import "@kickstartds/base/lib/global/base.css";
import "@kickstartds/core/lib/design-tokens/tokens.css";

const TemplateWrapper = ({ children }) => {
  return (
    <div className="page-wrap__content">
      <main className="content-wrap" id="content" tabIndex="-1">
        {children}
      </main>
    </div>
  );
};

export default TemplateWrapper;