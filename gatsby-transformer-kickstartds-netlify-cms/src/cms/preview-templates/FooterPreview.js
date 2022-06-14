import React from 'react';
import { Footer } from '@kickstartds/design-system/dist/components/footer/FooterComponent';
import { LocationProvider } from "@reach/router";

const FooterPreview = React.memo(({ entry }) => {
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
      <Footer {...data} />
    </LocationProvider>
  );
});

export default FooterPreview;