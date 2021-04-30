import React from 'react';

import { Visual } from '@kickstartds/content';
import { TextMedia } from '@kickstartds/base';

import Layout from './Layout';

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
    {keyvisual && keyvisual.show && <Visual {...keyvisual} />}

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
