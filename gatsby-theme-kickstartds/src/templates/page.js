
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

import { PictureContextDefault, PictureContext } from "@kickstartds/base/lib/picture";
import { VisualContextDefault, VisualContext } from "@kickstartds/content/lib/visual";
import { StorytellingContextDefault, StorytellingContext } from "@kickstartds/content/lib/storytelling";
import { RichText, RichTextContext } from '@kickstartds/base/lib/rich-text';
import { LinkContextDefault, LinkContext } from '@kickstartds/base/lib/link';

import { Page } from "../components/Page";
import SEO from "../components/Seo";

const WrappedLink = ({ href, ...props }) =>
  href && href.startsWith('/')
    ? <Link to={href.endsWith('/') ? href : `${href}/`} {...props} />
    : <LinkContextDefault href={href} {...props} />;

const WrappedImage = (props) => {
  const { src, ...propsRest } = props;

  return src && src.childImageSharp
    ? <GatsbyImage image={getImage(src)} alt={propsRest.alt || ''} />
    : src && src.publicURL
      ? <PictureContextDefault src={src.publicURL} {...propsRest} />
      : null;
}

const WrappedVisual = (props) => {
  if (props.media && props.media.image) {
    if (props.media.image.srcDesktop && props.media.image.srcDesktop.publicURL) {
      props.media.image.srcDesktop = props.media.image.srcDesktop.publicURL;
    }
    if (props.media.image.srcTablet && props.media.image.srcTablet.publicURL) {
      props.media.image.srcTablet = props.media.image.srcTablet.publicURL;
    }
    if (props.media.image.srcMobile && props.media.image.srcMobile.publicURL) {
      props.media.image.src = props.media.image.srcMobile;
      if (props.media.image.src.childImageSharp) delete props.media.image.src.childImageSharp;
      props.media.image.srcMobile = props.media.image.srcMobile.publicURL;
    }
  }

  return <VisualContextDefault {...props} />;
}

const WrappedStorytelling = (props) =>
  props.backgroundImage && props.backgroundImage.publicURL
    ? <StorytellingContextDefault {...props} backgroundImage={props.backgroundImage.publicURL} />
    : <StorytellingContextDefault {...props} />;

const Bold = ({ children }) => <span className="bold">{children}</span>;
const Text = ({ children }) => <p className="align-center">{children}</p>;

const contentfulOptions = {
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
  console.log('ContentfulRichText', props);
  return props.text.includes('nodeType')
    ? <div>{renderRichText({ raw: props.text }, contentfulOptions)}</div>
    : <RichText {...props} />;
};

const RichTextProvider = (props) => {
  return <RichTextContext.Provider value={ContentfulRichText} {...props} />;
};

const LinkProvider = (props) => (
  <LinkContext.Provider value={WrappedLink} {...props} />
);

const PictureProvider = (props) => (
  <PictureContext.Provider value={WrappedImage} {...props} />
);

const VisualProvider = (props) => (
  <VisualContext.Provider value={WrappedVisual} {...props} />
);

const StorytellingProvider = (props) => (
  <StorytellingContext.Provider value={WrappedStorytelling} {...props} />
);

export const GatsbyPage = (props) => {
  const page = props.pageContext.page;
  const {
    title,
    description,
    keywords,
    image,
    cardImage,
  } = page;

  return (
    <>
      <SEO
        title={title} 
        description={description} 
        keywords={keywords}
        image={image && image.publicURL}
        cardImage={cardImage && cardImage.publicURL}
      />

      <LinkProvider>
        <PictureProvider>
          <StorytellingProvider>
            <VisualProvider>
              <RichTextProvider>
                <Page {...page} />
              </RichTextProvider>
            </VisualProvider>
          </StorytellingProvider>
        </PictureProvider>
      </LinkProvider>
    </>
  );
};

export default GatsbyPage;
