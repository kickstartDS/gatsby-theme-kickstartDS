import React from 'react';
import { InfluxDB, Point } from '@influxdata/influxdb-client-browser';

import { cleanObjectKeys } from '@kickstartds/jsonschema2graphql/build/dehashing';

import components from "../components/ComponentsMap";

const url = process.env['INFLUX_URL'] || 'http://localhost:8086';
const token = process.env['INFLUX_TOKEN'] || 'my-token';
const org = process.env['INFLUX_ORG'] || 'my-org';
const bucket = process.env['INFLUX_BUCKET'] || 'my-bucket';

const writeApi = new InfluxDB({url, token}).getWriteApi(org, bucket, 'ns');
writeApi.useDefaultTags({location: 'calculon01'});

const componentStatistics = (componentName: string, componentProps: Record<string, any>) => {
  const componentStats = new Point(componentName)
    .tag(componentName, 'component_stats')
    .intField('value', componentProps.length || 0)
    .timestamp(new Date());
  writeApi.writePoint(componentStats);
  console.log(` ${componentStats.toLineProtocol(writeApi)}`);
  console.log('TEST');
  writeApi.flush();
};

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

  componentStatistics(typeProp, cleanedElement);
  
  return <Component type={typeProp} key={key} { ...restElement } />;
};

export const getContent = (content, sections = false) => {
  if (content && content.length > 0) {
    return content.map((element) => getComponent(element, sections));
  }
};

export const cleanKeys = (object) => cleanObjectKeys(object);