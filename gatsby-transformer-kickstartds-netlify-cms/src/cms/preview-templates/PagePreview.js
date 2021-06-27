import React from 'react';
import { KickstartDSPage } from 'gatsby-theme-kickstartds/src/components/KickstartDSPageComponent';

const PagePreview = React.memo(({ entry }) => {
  const [data, setData] = React.useState({});

  React.useEffect(
    () => {
      setData(entry.getIn(['data']).toJS());
    },
    [entry]
  );

  React.useEffect(
    () => {
      const iframe = document.getElementsByTagName('iframe')[0];

      const link = iframe.contentDocument.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/index.css';
      iframe.contentDocument.head.appendChild(link);
  
      const script = iframe.contentDocument.createElement('script');
      script.src = '/index.js';
      iframe.contentDocument.body.appendChild(script);
    },
    []
  );

  return (
    <KickstartDSPage
      content={data.sections}
    />
  );
});

export default PagePreview;
