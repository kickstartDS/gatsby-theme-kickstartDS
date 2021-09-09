import React from 'react';
import { Helmet } from "react-helmet";

import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { Link } from "gatsby";

import { KickstartDSPage as OriginalKickstartDSPage } from '@kickstartds/gatsby-theme-kickstartds/src/components/KickstartDSPageComponent';
import { Header } from '@kickstartds/design-system/dist/components/header/HeaderComponent';
import { Footer } from '@kickstartds/design-system/dist/components/footer/FooterComponent';
import { Section } from '@kickstartds/design-system/dist/components/section/SectionComponent';
import { SectionContext } from '@kickstartds/base/lib/section';
import { RichText, RichTextContext } from '@kickstartds/base/lib/rich-text';
import { CountUp } from '@kickstartds/design-system/dist/components/count-up/CountUpComponent';
import { CountUpContext } from '@kickstartds/content/lib/count-up';
import { LinkContextDefault, LinkContext } from '@kickstartds/base/lib/link';

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
  return props.text.includes('nodeType')
    ? <div>{renderRichText(props.text, options)}</div>
    : <RichText {...props} />;
};

const RichTextProvider = (props) => {
  return (
    <RichTextContext.Provider value={ContentfulRichText} {...props} />
  );
};

// TODO dedupe this
const WrappedLink = ({ href, className, ...props }) => {
  console.log(href);
  return href.startsWith('/')
    ? <Link to={href} className={className} />
    : <LinkContextDefault href={href} className={className} {...props} />;
};

const LinkProvider = (props) => (
  <LinkContext.Provider value={WrappedLink} {...props} />
);

const SectionProvider = (props) => {
  return (
    <SectionContext.Provider value={Section} {...props} />
  );
}

const CountUpProvider = (props) => {
  return (
    <CountUpContext.Provider value={CountUp} {...props} />
  );
}

const AllContextProviders = (props) => (
  <CountUpProvider>
    <SectionProvider>
      {props.children}
    </SectionProvider>
  </CountUpProvider>
);

export const KickstartDSPage = (data) => (
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Demo Landingpage</title>
    </Helmet>
    <LinkProvider>
      <Header />
    </LinkProvider>
    <AllContextProviders>
      <OriginalKickstartDSPage {...data} />
    </AllContextProviders>
    <LinkProvider>
      <Footer />
    </LinkProvider>
  </>
);
