import { FunctionComponent } from 'react';

import "@kickstartds/base/lib/global/base.css";
import "@kickstartds/core/lib/design-tokens/tokens.css";

// TODO add `KickstertLayoutProps`
export const KickstartDSLayout: FunctionComponent<KickstartLayoutProps> = ({ children }) => (
  <div className="page-wrap__content">
    <main className="content-wrap" id="content" tabIndex={-1}>
      {children}
    </main>
  </div>
);
