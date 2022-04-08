import React from 'react';
import { ContentPage } from '@kickstartds/gatsby-theme-kickstartds/src/components/ContentPage';
import { LocationProvider } from "@reach/router";

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

      const script = iframe.contentDocument.createElement('script');
      script.src = '/index.js';
      script.type = 'module';
      iframe.contentDocument.body.appendChild(script);
    },
    []
  );

  return (
    <LocationProvider>
      <ContentPage {...data} />
    </LocationProvider>
  );
});

export default PagePreview;
