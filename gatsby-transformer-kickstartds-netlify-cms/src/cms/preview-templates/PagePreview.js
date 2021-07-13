import React from 'react';
import { KickstartDSPage } from '@kickstartds/gatsby-theme-kickstartds/src/components/KickstartDSPageComponent';

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

      const linkIndex = iframe.contentDocument.createElement('link');
      linkIndex.rel = 'stylesheet';
      linkIndex.href = '/index.css';
      iframe.contentDocument.head.appendChild(linkIndex);

      const linkTokens = iframe.contentDocument.createElement('link');
      linkTokens.rel = 'stylesheet';
      linkTokens.href = '/tokens.css';
      iframe.contentDocument.head.appendChild(linkTokens);

      const script = iframe.contentDocument.createElement('script');
      script.src = '/index.js';
      iframe.contentDocument.body.appendChild(script);
    },
    []
  );

  return (
    <KickstartDSPage {...data} />
  );
});

export default PagePreview;
