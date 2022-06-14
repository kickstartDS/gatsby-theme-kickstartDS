import React from 'react';
import { Header } from '@kickstartds/design-system/dist/components/header/HeaderComponent';
import { LocationProvider } from "@reach/router";

const HeaderPreview = React.memo(({ entry }) => {
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
      <Header {...data} />
    </LocationProvider>
  );
});

export default HeaderPreview;