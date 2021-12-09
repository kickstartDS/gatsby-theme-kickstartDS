import { FunctionComponent } from 'react';

import { Providers } from "./Providers";

import '@kickstartds/gatsby-transformer-kickstartds-mdx/src/shiki-twoslash.css';

export const Layout: FunctionComponent<any> = (props) => (
  <Providers>
    <main tabIndex={-1}>
      {props.children}
    </main>
  </Providers>
);
