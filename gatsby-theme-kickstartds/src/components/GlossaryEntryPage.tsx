import React from 'react';
import { FunctionComponent } from 'react';

import { Layout } from './Layout';
import { getContent } from '../helpers/componentMapper';

export const GlossaryEntryPage: FunctionComponent<any> = ({
  components, ...rest
}) => (
  <Layout {...rest}>
    {getContent(components, false)}
  </Layout>
);
