import { FunctionComponent } from 'react';
import { KickstartDSLayoutProps } from './KickstartDSLayoutProps';

import "@kickstartds/base/lib/global/base.css";
import "@kickstartds/core/lib/design-tokens/tokens.css";

// TODO add `KickstartDSLayoutProps`
export const KickstartDSLayout: FunctionComponent<KickstartDSLayoutProps> = ({ children }) => (
  <main tabIndex={-1}>
    {children}
  </main>
);
