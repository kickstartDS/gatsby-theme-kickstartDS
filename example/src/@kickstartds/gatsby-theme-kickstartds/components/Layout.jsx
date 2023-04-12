import React from 'react';

import { Layout as OriginalLayout } from '@kickstartds/gatsby-theme-kickstartds/src/components/Layout';

import { Header } from '@kickstartds/design-system/dist/components/header/HeaderComponent';
import { Footer } from '@kickstartds/design-system/dist/components/footer/FooterComponent';

import { IconSprite } from '@kickstartds/design-system/dist/components/icon-sprite/IconSpriteComponent';

import { SectionProvider } from '@kickstartds/design-system/dist/components/section/SectionComponent';
import { HeadlineProvider } from '@kickstartds/design-system/dist/components/headline/HeadlineComponent';
import { CountUpProvider } from '@kickstartds/design-system/dist/components/count-up/CountUpComponent';
import { ButtonProvider } from '@kickstartds/design-system/dist/components/button/ButtonComponent';
import { StorytellingProvider } from '@kickstartds/design-system/dist/components/storytelling/StorytellingComponent';
import { VisualProvider } from '@kickstartds/design-system/dist/components/visual/VisualComponent';

import '@kickstartds/design-system/dist/index.css';
import '@kickstartds/design-system/dist/index.js';

export const Layout = ({ children, header, footer, ...rest }) => (
  <OriginalLayout {...rest}>
    <IconSprite />
    <ButtonProvider>
      <HeadlineProvider>
        <StorytellingProvider>
          <VisualProvider>
            <CountUpProvider>
              <SectionProvider>
                <Header {...header} />

                {children}

                <Footer {...footer} />
              </SectionProvider>
            </CountUpProvider>
          </VisualProvider>
        </StorytellingProvider>
      </HeadlineProvider>
    </ButtonProvider>
  </OriginalLayout>
);
