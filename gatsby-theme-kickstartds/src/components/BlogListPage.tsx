import React from 'react';
import { FunctionComponent } from 'react';

import { Layout } from './Layout';
import { getContent } from '../helpers/componentMapper';

export const BlogListPage: FunctionComponent<any> = ({
  sections, ...rest
}) => (
  <Layout {...rest}>
    {getContent(sections, true)}
  </Layout>
);
