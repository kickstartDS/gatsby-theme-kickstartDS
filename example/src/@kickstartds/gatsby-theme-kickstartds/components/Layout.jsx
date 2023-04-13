import React from 'react';

import { Layout as OriginalLayout } from '@kickstartds/gatsby-theme-kickstartds/src/components/Layout';

import { Header } from '@kickstartds/design-system/dist/components/header/HeaderComponent';
import { Footer } from '@kickstartds/design-system/dist/components/footer/FooterComponent';

import { IconSprite } from '@kickstartds/design-system/dist/components/icon-sprite/IconSpriteComponent';

import '@kickstartds/design-system/dist/index.css';
import '@kickstartds/design-system/dist/index.js';

export const Layout = ({ children, header, footer, ...rest }) => (
  <OriginalLayout {...rest}>
    <IconSprite />
    <Header {...header} />

    {children}

    <Footer {...footer} />
  </OriginalLayout>
);
