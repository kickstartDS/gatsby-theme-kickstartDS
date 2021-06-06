import React from 'react';

import { FunctionComponent } from 'react';
import { KickstartDSLayout } from './KickstartDSLayoutComponent';

import * as baseLib from '@kickstartds/base';
import * as blogLib from '@kickstartds/blog';
import * as contentLib from '@kickstartds/content';

import baseExports from '@kickstartds/base/lib/exports.json';
import blogExports from '@kickstartds/blog/lib/exports.json';
import contentExports from '@kickstartds/content/lib/exports.json';

const libs = { ...baseLib, ...blogLib, ...contentLib };
const components = {};
const componentCounter = [];

Object.entries({ ...baseExports, ...blogExports, ...contentExports }).forEach(([key, value]) => {
  if (key.indexOf('/') === -1 && value.length > 0) {
    components[key] = libs[value[0]];
  }
});

const getComponent = (element) => {
  componentCounter[element.type] = componentCounter[element.type]+1 || 1;
  const key = element.type+'-'+componentCounter[element.type];

  const Component = React.memo(components[element.type]);

  if (element.type === 'section') {
    const content = element.content;
    delete element.content;

    return (
      <Component key={key} { ...element }>
        {getContent(content)}
      </Component>
    )
  } else {
    return <Component key={key} { ...element } />
  }
};

const getContent = (content) => {
  if (content && content.length > 0) {
    return content.map((element) => getComponent(element));
  } 
};

export const KickstartDSPage: FunctionComponent<any> = ({
  content,
}) => (
  <KickstartDSLayout>
    {getContent(content)}
  </KickstartDSLayout>
);
