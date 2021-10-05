import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { useStaticQuery, graphql } from "gatsby";

// TODO refactor to .ts, get rid of `propTypes` accordingly

const SEO = ({ lang, title, description, keywords, image, article }) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery(query);

  const {
    defaultLang,
    defaultTitle,
    titleTemplate,
    defaultDescription,
    defaultKeywords,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = site.siteMetadata;

  const seo = {
    lang: lang || defaultLang,
    title: title || defaultTitle,
    description: description || defaultDescription,
    keywords: keywords || defaultKeywords,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <Helmet htmlAttributes={{lang: seo.lang}} title={seo.title} titleTemplate={titleTemplate}>
      <meta charSet="utf-8" />

      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="image" content={seo.image} />

      <link rel="canonical" href={seo.url} />

      {seo.url && <meta property="og:url" content={seo.url} />}
      {article 
        ? <meta property="og:type" content="article" />
        : <meta property="og:type" content="website" />
      }
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={seo.image} />}

      <meta name="twitter:card" content="summary_large_image" />
      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
  );
}

export default SEO;

SEO.propTypes = {
  lang: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
};

SEO.defaultProps = {
  lang: 'en',
  title: null,
  description: null,
  keywords: null,
  image: null,
  article: false,
};

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultLang: lang
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        defaultKeywords: keywords
        siteUrl: url
        defaultImage: image
        twitterUsername
      }
    }
  }
`;