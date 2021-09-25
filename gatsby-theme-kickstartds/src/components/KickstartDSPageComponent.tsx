import React from 'react';

import { FunctionComponent } from 'react';
import loadable from '@loadable/component';

import { KickstartDSLayout } from './KickstartDSLayoutComponent';

import baseExports from '@kickstartds/base/lib/exports.json';
import blogExports from '@kickstartds/blog/lib/exports.json';
import contentExports from '@kickstartds/content/lib/exports.json';

const components = {};
const componentCounter = [];

const typeResolutionField = 'type';

Object.entries(baseExports).forEach(([key, value]) => {
  if (key.indexOf('/') === -1 && value.length > 0) {
    components[key] = loadable((component) => import(`@kickstartds/base/lib/${component}/index.js`), {
      resolveComponent: (exports) => exports[value[0]],
    });
  }
});

Object.entries(blogExports).forEach(([key, value]) => {
  if (key.indexOf('/') === -1 && value.length > 0) {
    components[key] = loadable((component) => import(`@kickstartds/blog/lib/${component}/index.js`), {
      resolveComponent: (exports) => exports[value[0]],
    });
  }
});

Object.entries(contentExports).forEach(([key, value]) => {
  if (key.indexOf('/') === -1 && value.length > 0) {
    components[key] = loadable((component) => import(`@kickstartds/content/lib/${component}/index.js`), {
      resolveComponent: (exports) => exports[value[0]],
    });
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

  const Component = components[componentType];

  if (isSection) {
    const contentKey = Object.keys(element).find(
      (key) => key.includes("content__") || key.includes("content"),
    );
    const { [contentKey]: content, ...clonedElement } = element;
    const cleanedElement = cleanObjectKeys(clonedElement);
    cleanedElement['headline'].type = 'headline';

    return (
      <Component component={componentType} key={key} { ...cleanedElement }>
        {getContent(content)}
      </Component>
    );
  }

  const cleanedElement = cleanObjectKeys(element);
  return <Component component={componentType} key={key} { ...cleanedElement } />;
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
