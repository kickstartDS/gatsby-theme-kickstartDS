import React from 'react';
import { FunctionComponent } from 'react';

import { Layout } from './Layout';
import { getContent } from '../helpers/componentMapper';
import { ScrollSpy } from './ScrollSpy';

export const BlogDetailPage: FunctionComponent<any> = ({
  sections, ...rest
}) => (
  <>
    <ScrollSpy />
    <Layout {...rest}>
      {getContent(sections, true)}
    </Layout>
  </>
);
