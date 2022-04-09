const { InfluxDB, Point, HttpError } = require('@influxdata/influxdb-client');
const { cleanObjectKeys } = require('@kickstartds/jsonschema2graphql/build/dehashing');
// TODO see below
// const { pack } = require('@kickstartds/core/lib/storybook/helpers/');

const url = process.env['GATSBY_INFLUX_URL'] || 'http://localhost:8086';
const token = process.env['GATSBY_INFLUX_TOKEN'] || 'my-token';
const org = process.env['GATSBY_INFLUX_ORG'] || 'my-org';
const bucket = process.env['GATSBY_INFLUX_BUCKET'] || 'my-bucket';

const db = new InfluxDB({ url, token });

// TODO de-dupe this, wouldn't cleanly import
const isObject = (obj) =>
  Object.prototype.toString.call(obj) === '[object Object]';
const pack = (obj) =>
  Object.entries(obj).reduce((prev, [key, value]) => {
    if (isObject(value) || Array.isArray(value)) {
      Object.entries(pack(value)).forEach(([key2, value2]) => {
        prev[`${key}.${key2}`] = value2;
      });
    } else {
      prev[key] = value;
    }
    return prev;
  }, {});

const componentStatistics = async (key, slug, componentName, componentProps, timestamp) => {
  const packedProps = pack(componentProps);
  const writeApi = db.getWriteApi(org, bucket, 'ns');
  writeApi.useDefaultTags({ location: 'kickstartDS' });
  
  const componentStats = new Point('components')
    .tag('componentName', componentName)
    .tag('id', key)
    .tag('slug', slug)
    .timestamp(timestamp);
  
  Object.keys(packedProps).forEach((packedPropName) => {
    switch (typeof packedProps[packedPropName]) {
      case 'boolean':
        componentStats.booleanField(packedPropName, packedProps[packedPropName]);
        break;
      case 'string':
        componentStats.stringField(packedPropName, packedProps[packedPropName] || '');
        break;
      case 'number':
        componentStats.intField(packedPropName, packedProps[packedPropName] || 0);
        break;
    }
  });
  
  writeApi.writePoint(componentStats);
  await writeApi.close();
};

const timestamp = new Date();

const componentCounter = [];
const analyzeComponent = async (slug, element, isSection = false) => {
  const componentType = isSection ? 'section' : element['type'];

  componentCounter[componentType] = componentCounter[componentType]+1 || 1;
  const key = componentType+'-'+componentCounter[componentType];

  if (isSection) {
    const contentKey = Object.keys(element).find(
      (key) => key.includes("content__") || key.includes("content"),
    );
    const { [contentKey]: content, ...clonedElement } = element;
    const cleanedElement = cleanObjectKeys(clonedElement);
    cleanedElement['headline'].type = 'headline';

    await componentStatistics(key, slug, componentType, cleanedElement, timestamp);
    await analyzeContent(slug, content);
  }

  const cleanedElement = cleanObjectKeys(element);
  const { typeProp, type, ...restElement } = cleanedElement;

  await componentStatistics(key, slug, componentType, restElement, timestamp);
};

const analyzeContent = async (slug, content, sections = false) => {
  if (content && content.length > 0) {
    await Promise.all(content.map(async (element) => await analyzeComponent(slug, element, sections)));
  }
};

exports.analyzeContent = analyzeContent;