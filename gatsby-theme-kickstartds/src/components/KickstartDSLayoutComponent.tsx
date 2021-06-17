import { FunctionComponent } from 'react';

import "@kickstartds/base/lib/global/base.css";
import "@kickstartds/core/lib/design-tokens/tokens.css";
import "@kickstartds/base/lib/global/base.js"

// TODO add `KickstartDSLayoutProps`
export const KickstartDSLayout: FunctionComponent<any> = ({ children }) => (
  <main tabIndex={-1}>
    {children}
  </main>
);
