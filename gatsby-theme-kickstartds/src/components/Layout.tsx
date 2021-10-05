import { FunctionComponent } from 'react';

// TODO add `LayoutProps`
export const Layout: FunctionComponent<any> = ({ children }) => (
  <>
    <main tabIndex={-1}>
      {children}
    </main>
  </>
);
