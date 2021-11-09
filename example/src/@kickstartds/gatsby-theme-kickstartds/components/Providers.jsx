import React from 'react';

import { SectionProvider } from '@kickstartds/design-system/dist/components/section/SectionComponent';
import { CountUpProvider } from '@kickstartds/design-system/dist/components/count-up/CountUpComponent';
import { HeadlineProvider } from '@kickstartds/design-system/dist/components/headline/HeadlineComponent';
import { ContactProvider } from '@kickstartds/design-system/dist/components/contact/ContactComponent';

import { Providers as OriginalProviders } from '@kickstartds/gatsby-theme-kickstartds/src/components/Providers';

export const Providers = ({ children }) =>
  <HeadlineProvider>
    <CountUpProvider>
      <SectionProvider>
        <ContactProvider>
          <OriginalProviders>
            {children}
          </OriginalProviders>
        </ContactProvider>
      </SectionProvider>
    </CountUpProvider>
  </HeadlineProvider>;

export default Providers;