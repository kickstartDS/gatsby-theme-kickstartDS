import React from 'react';
import components from "../components/ComponentsMap";

import { cleanObjectKeys } from '@kickstartds/jsonschema2graphql/build/dehashing';

export const componentCounter = [];
export const getComponent = (element, isSection = false) => {
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
      <Component key={key} { ...cleanedElement }>
        {getContent(content)}
      </Component>
    );
  }

  const cleanedElement: Record<string, any> = cleanObjectKeys(element);
  const { typeProp, type, ...restElement } = cleanedElement;
  return <Component type={typeProp} key={key} { ...restElement } />;
};

export const getContent = (content, sections = false) => {
  if (content && content.length > 0) {
    return content.map((element) => getComponent(element, sections));
  }
};