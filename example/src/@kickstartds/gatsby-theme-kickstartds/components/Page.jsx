import React from 'react';

import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { renderRichText } from 'gatsby-source-contentful/rich-text';

import { Page as OriginalPage } from '@kickstartds/gatsby-theme-kickstartds/src/components/Page';
import { Header } from '@kickstartds/design-system/dist/components/header/HeaderComponent';
import { Footer } from '@kickstartds/design-system/dist/components/footer/FooterComponent';
import { SectionProvider } from '@kickstartds/design-system/dist/components/section/SectionComponent';
import { RichText, RichTextContext } from '@kickstartds/base/lib/rich-text';
import { CountUpProvider } from '@kickstartds/design-system/dist/components/count-up/CountUpComponent';
import { HeadlineProvider } from '@kickstartds/design-system/dist/components/headline/HeadlineComponent';

import '@kickstartds/design-system/dist/index.css';
import '@kickstartds/design-system/dist/index.js';

const Bold = ({ children }) => <span className="bold">{children}</span>;
const Text = ({ children }) => <p className="align-center">{children}</p>;

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return (
        <>
          <h2>Embedded Asset</h2>
          <pre>
            <code>{JSON.stringify(node, null, 2)}</code>
          </pre>
        </>
      );
    },
  },
};

const ContentfulRichText = (props) => {
  return props.text.includes('nodeType') ? (
    <div>{renderRichText(props.text, options)}</div>
  ) : (
    <RichText {...props} />
  );
};

const RichTextProvider = (props) => {
  return <RichTextContext.Provider value={ContentfulRichText} {...props} />;
};

const AllContextProviders = (props) => (
  <HeadlineProvider>
    <CountUpProvider>
      <SectionProvider>{props.children}</SectionProvider>
    </CountUpProvider>
  </HeadlineProvider>
);

export const Page = (data) => (
  <>
    <Header />

    <AllContextProviders>
      <OriginalPage {...data} />
    </AllContextProviders>
    
    <Footer nav={[]} />
  </>
);
