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

const typeResolutionField = 'internalType';

Object.entries({ ...baseExports, ...blogExports, ...contentExports }).forEach(([key, value]) => {
  if (key.indexOf('/') === -1 && value.length > 0) {
    components[key] = libs[value[0]];
  }
});

const cleanFieldName = (fieldName) => fieldName.replace(/__.*/i, '');

const cleanObjectKeys = (obj) => {
  const cleanedObject = {};

  Object.keys(obj).forEach((property) => {
    if (property === typeResolutionField) {
      cleanedObject[typeResolutionField] = obj[typeResolutionField];
    } else {
      if (Array.isArray(obj[property])) {
        cleanedObject[cleanFieldName(property)] = obj[property].map((item) => {
          return cleanObjectKeys(item);
        });
      } else if (typeof obj[property] === 'object') {
        cleanedObject[cleanFieldName(property)] = 
          obj[property] === null
            ? null
            : cleanObjectKeys(obj[property]);
      } else {
        cleanedObject[cleanFieldName(property)] = obj[property] || null;
      }
    }
  });

  return cleanedObject;
};

const getComponent = (element) => {
  const cleanedElement = cleanObjectKeys(element);

  if (cleanedElement['internalType']) {
    componentCounter[cleanedElement['internalType']] = componentCounter[cleanedElement['internalType']]+1 || 1;
    const key = cleanedElement['internalType']+'-'+componentCounter[cleanedElement['internalType']];
  
    const Component = React.memo(components[cleanedElement['internalType']]);
  
    if (cleanedElement['type'] === 'section') {
      const content = cleanedElement['content'];
      delete cleanedElement['content'];
  
      return (
        <Component key={key} { ...cleanedElement }>
          {getContent(content)}
        </Component>
      )
    } else {
      return <Component key={key} { ...cleanedElement } />
    }  
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
