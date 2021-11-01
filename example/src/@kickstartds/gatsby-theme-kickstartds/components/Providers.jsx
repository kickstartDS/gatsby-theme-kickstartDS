import React from 'react';

import { SectionProvider } from '@kickstartds/design-system/dist/components/section/SectionComponent';
import { CountUpProvider } from '@kickstartds/design-system/dist/components/count-up/CountUpComponent';
import { HeadlineProvider } from '@kickstartds/design-system/dist/components/headline/HeadlineComponent';

import { Providers as OriginalProviders } from '@kickstartds/gatsby-theme-kickstartds/src/components/Providers';

export const Providers = ({children}) =>
  <HeadlineProvider>
    <CountUpProvider>
      <SectionProvider>
        <OriginalProviders>
          {children}  
        </OriginalProviders>
      </SectionProvider>
    </CountUpProvider>
  </HeadlineProvider>;

export default Providers;