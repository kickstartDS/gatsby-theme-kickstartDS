import React from 'react';

const TemplateWrapper = ({ children }) => {
  return (
    <>
      <div className="page-wrap__content">
        <main className="content-wrap" id="content" tabIndex="-1">
          {children}
        </main>
        <a href="#🔝" className="scroll-to-top" data-component="base.scroll-to-top">
          <svg className="icon" role="img">
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#icon-arrow-up"></use>
          </svg>
        </a>
      </div>
    </>
  );
};

export default TemplateWrapper;