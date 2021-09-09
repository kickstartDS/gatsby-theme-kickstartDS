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

const typeResolutionField = 'type';

Object.entries({ ...baseExports, ...blogExports, ...contentExports }).forEach(([key, value]) => {
  if (key.indexOf('/') === -1 && value.length > 0) {
    components[key] = libs[value[0]];
  }
});

const cleanFieldName = (fieldName) => fieldName.replace(/__.*/i, '');
const cleanObjectKeys = (obj) => {
  const cleanedObject = {};

  Object.keys(obj).forEach((property) => {
    if (property !== typeResolutionField) {
      if (Array.isArray(obj[property])) {
        if (obj[property].length > 0) {
          cleanedObject[cleanFieldName(property)] = obj[property].map((item) => {
            return cleanObjectKeys(item);
          });
        }
      } else if (typeof obj[property] === 'object') {
        if (obj[property] !== null) {
          cleanedObject[cleanFieldName(property)] = 
            cleanObjectKeys(obj[property]);
        }
      } else if (obj[property]) {
        if (obj[property] !== null) {
          // TODO re-simplify this... only needed because of inconsistent handling of `-` vs `_` in schema enum values
          // TODO also `graphqlSafeEnumKey.ts` is destructive right now, as in: you can't deterministically convert
          // values back to their original form, once they are made safe. This is why different properties (like `ratio` 
          // or `pattern`) need to be handled explicitly here. To reconstruct the needed format. As properties can be
          // customized from a project-level (e.g. `pattern` already is an individualization for `kickstartDS/design-system`)
          // we can't have custom handling per property here. At least in the long run!
          if (cleanFieldName(property) === 'variant') {
            cleanedObject[cleanFieldName(property)] = obj[property].replace('_', '-');
          } else if (cleanFieldName(property) === 'ratio') {
            cleanedObject[cleanFieldName(property)] = obj[property].replace('VALUE_', '').replace('_', ':');
          } else if (cleanFieldName(property) === 'pattern') {
            cleanedObject[cleanFieldName(property)] = obj[property].replace('VALUE_', '');
          } else {
            cleanedObject[cleanFieldName(property)] = obj[property];
          }
        }
      }
    }
  });

  return cleanedObject;
};

const getComponent = (element, isSection = false) => {
  const componentType = isSection ? 'section' : element['type'];

  componentCounter[componentType] = componentCounter[componentType]+1 || 1;
  const key = componentType+'-'+componentCounter[componentType];

  const Component = React.memo(components[componentType]);

  if (isSection) {
    let content;

    Object.keys(element).forEach((property) => {
      if (property.includes('content__') || property.includes('content')) {
        content = element[property];
        delete element[property];
      }
    });
    const cleanedElement = cleanObjectKeys(element);
    cleanedElement['headline'].type = 'headline';

    return (
      <Component key={key} { ...cleanedElement }>
        {getContent(content)}
      </Component>
    );
  }

  const cleanedElement = cleanObjectKeys(element);
  return <Component key={key} { ...cleanedElement } />;
};

const getContent = (content, sections = false) => {
  if (content && content.length > 0) {
    return content.map((element) => getComponent(element, sections));
  } 
};

export const KickstartDSPage: FunctionComponent<any> = ({
  sections,
}) => (
  <KickstartDSLayout>
    {getContent(sections, true)}
  </KickstartDSLayout>
);
