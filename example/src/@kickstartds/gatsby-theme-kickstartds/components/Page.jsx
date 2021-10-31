import React from 'react';

import { Page as OriginalPage } from '@kickstartds/gatsby-theme-kickstartds/src/components/Page';
import { Header } from '@kickstartds/design-system/dist/components/header/HeaderComponent';
import { Footer } from '@kickstartds/design-system/dist/components/footer/FooterComponent';
import { SectionProvider } from '@kickstartds/design-system/dist/components/section/SectionComponent';
import { CountUpProvider } from '@kickstartds/design-system/dist/components/count-up/CountUpComponent';
import { HeadlineProvider } from '@kickstartds/design-system/dist/components/headline/HeadlineComponent';

import { IconSprite } from '@kickstartds/design-system/dist/components/icon-sprite/IconSpriteComponent';

import '@kickstartds/design-system/dist/index.css';
import '@kickstartds/design-system/dist/index.js';

const AllContextProviders = (props) => (
  <HeadlineProvider>
    <CountUpProvider>
      <SectionProvider>{props.children}</SectionProvider>
    </CountUpProvider>
  </HeadlineProvider>
);

export const Page = (data) => (
  <>
    <IconSprite />
    <Header />

    <AllContextProviders>
      <OriginalPage {...data} />
    </AllContextProviders>
    
    <Footer nav={[]} />
  </>
);
