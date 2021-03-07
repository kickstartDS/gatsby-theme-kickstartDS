import React from 'react';

import Layout from '../templates/Layout';
import { Keyvisual } from '@rm-frontend/visuals/source/2-molecules/keyvisual/keyvisual/KeyvisualComponent';
import { TextMedia } from '@rm-frontend/base/source/2-molecules/text-media/TextMediaComponent';

const elementCounter = [];

function getComponent (element) {
    elementCounter[element.type] = elementCounter[element.type]+1 || 1;
    const key = element.type+'-'+elementCounter[element.type];

    switch (element.type) {
        case 'text-media':
            return <TextMedia key={key} {...element} />;
        default:
            return `No component definition for type: ${element.type}`;
    }
};

export const PageTemplate = ({
  keyvisual,
  heading,
  content,
}) => (
  <Layout>
    {keyvisual && keyvisual.show && <Keyvisual {...keyvisual} />}

    <div className="l-section">
      <div className="l-main-wrap">
        <header className="content-headline content-headline--page-header">
          <h1>{heading}</h1>
        </header>
      </div>
    </div>

    {content && content.length > 0 && content.map(element => getComponent(element))}
  </Layout>
); 
