import React from 'react';
import { Helmet } from "react-helmet";

import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";

import { KickstartDSPage as OriginalKickstartDSPage } from '@kickstartds/gatsby-theme-kickstartds/src/components/KickstartDSPageComponent';
import { Header } from '@kickstartds/design-system/dist/components/header/HeaderComponent';
import { Section } from '@kickstartds/design-system/dist/components/section/SectionComponent';
import { SectionContext } from '@kickstartds/base/lib/section';
import { RichText, RichTextContext } from '@kickstartds/base/lib/rich-text';

import "@kickstartds/design-system/dist/index.css";
import "@kickstartds/design-system/dist/index.js";

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: node => {
      return (
        <>
          <h2>Embedded Asset</h2>
          <pre>
            <code>{JSON.stringify(node, null, 2)}</code>
          </pre>
        </>
      )
    },
  },
};

const ContentfulRichText = (props) => {
  console.log('WHYYYYY');
  return props.text.includes('nodeType')
    ? <div>{renderRichText(props.text, options)}</div>
    : <RichText {...props} />;
};

const RichTextProvider = (props) => {
  console.log('RichText props', props);
  return (
    <RichTextContext.Provider value={ContentfulRichText} {...props} />
  );
};

const SectionProvider = (props) => {
  console.log('Section props', props);
  return (
    <SectionContext.Provider value={Section} {...props} />
  );
}

const AllContextProviders = (props) => (
  <SectionProvider>
    {props.children}
  </SectionProvider>
);

export const KickstartDSPage = (data) => (
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Demo Landingpage</title>
    </Helmet>
    <Header />
    <AllContextProviders>
      <OriginalKickstartDSPage {...data} />
    </AllContextProviders>
  </>
);
