import { FunctionComponent } from 'react';
import { KickstartDSLayout } from './KickstartDSLayoutComponent';
import { KickstartDSPageProps } from './KickstartDSPageProps';

import * as baseLib from '@kickstartds/base';
import * as blogLib from '@kickstartds/blog';
import * as contentLib from '@kickstartds/content';

import baseExports from '@kickstartds/base/lib/exports.json';
import blogExports from '@kickstartds/blog/lib/exports.json';
import contentExports from '@kickstartds/content/lib/exports.json';
import { Headline } from '@kickstartds/base/lib/headline';
import { Section } from '@kickstartds/base';

const libs = { ...baseLib, ...blogLib, ...contentLib };
const components = {};

Object.entries({ ...baseExports, ...blogExports, ...contentExports }).forEach(([key, value]) => {
  if (key.indexOf('/') === -1 && value.length > 0) {
    components[key] = libs[value[0]];
  }
});

const elementCounter = [];
function getComponent(element) {
    elementCounter[element.type] = elementCounter[element.type]+1 || 1;
    const key = element.type+'-'+elementCounter[element.type];

    const Component = components[element.type];
    return <Component key={key} { ...element } />
};

// TODO add `KickstartDSPageProps`
export const KickstartDSPage: FunctionComponent<KickstartDSPageProps> = ({
  heading,
  content,
}) => (
  <KickstartDSLayout>
    <Section>
      <Headline content={heading} level="h1" />
    </Section>

    <Section>
      {content && content.length > 0 && content.map((element) => getComponent(element))}
    </Section>
  </KickstartDSLayout>
);
