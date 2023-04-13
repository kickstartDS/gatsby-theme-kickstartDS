import React from 'react';

import { SectionProvider } from '@kickstartds/design-system/dist/components/section/SectionComponent';
import { CountUpProvider } from '@kickstartds/design-system/dist/components/count-up/CountUpComponent';
import { HeadlineProvider } from '@kickstartds/design-system/dist/components/headline/HeadlineComponent';
import { ButtonProvider } from '@kickstartds/design-system/dist/components/button/ButtonComponent';
import { VisualProvider } from '@kickstartds/design-system/dist/components/visual/VisualComponent';
import { StorytellingProvider } from '@kickstartds/design-system/dist/components/storytelling/StorytellingComponent';

import { Providers as GatsbyProviders } from '@kickstartds/gatsby-theme-kickstartds/src/components/Providers';

export const Providers = ({ children }) => {
  return (
    <GatsbyProviders>
      <ButtonProvider>
        <HeadlineProvider>
          <CountUpProvider>
            <VisualProvider>
              <StorytellingProvider>
                <SectionProvider>{children}</SectionProvider>
              </StorytellingProvider>
            </VisualProvider>
          </CountUpProvider>
        </HeadlineProvider>
      </ButtonProvider>
    </GatsbyProviders>
  );
};

export default Providers;
