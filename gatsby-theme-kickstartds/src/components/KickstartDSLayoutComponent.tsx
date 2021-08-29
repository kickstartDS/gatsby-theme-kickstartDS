import { FunctionComponent } from 'react';

// TODO add `KickstartDSLayoutProps`
export const KickstartDSLayout: FunctionComponent<any> = ({ children }) => (
  <main tabIndex={-1}>
    {children}
  </main>
);
