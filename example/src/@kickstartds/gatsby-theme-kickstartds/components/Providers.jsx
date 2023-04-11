import React from 'react';

import { SectionProvider } from '@kickstartds/design-system/dist/components/section/SectionComponent';
import { CountUpProvider } from '@kickstartds/design-system/dist/components/count-up/CountUpComponent';
import { HeadlineProvider } from '@kickstartds/design-system/dist/components/headline/HeadlineComponent';
import { ButtonProvider } from '@kickstartds/design-system/dist/components/button/ButtonComponent';

import { Providers as OriginalProviders } from '@kickstartds/gatsby-theme-kickstartds/src/components/Providers';

export const Providers = ({ children }) => (
  <ButtonProvider>
    <HeadlineProvider>
      <CountUpProvider>
        <SectionProvider>
          <OriginalProviders>{children}</OriginalProviders>
        </SectionProvider>
      </CountUpProvider>
    </HeadlineProvider>
  </ButtonProvider>
);

export default Providers;
