import React from 'react';
import { FunctionComponent } from 'react';
import { cleanObjectKeys } from '@kickstartds/jsonschema2graphql/build/dehashing';

import { Layout } from './Layout';
import components from "./ComponentsMap";

const componentCounter = [];
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
      <Component key={key} { ...cleanedElement }>
        {getContent(content)}
      </Component>
    );
  }

  const cleanedElement: Record<string, any> = cleanObjectKeys(element);
  const { typeProp, type, ...restElement } = cleanedElement;
  return <Component type={typeProp} key={key} { ...restElement } />;
};

const getContent = (content, sections = false) => {
  if (content && content.length > 0) {
    return content.map((element) => getComponent(element, sections));
  }
};

export const Page: FunctionComponent<any> = ({
  sections,
}) => (
  <Layout>
    {getContent(sections, true)}
  </Layout>
);
