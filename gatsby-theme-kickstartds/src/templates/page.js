
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

import { PictureContextDefault, PictureContext } from "@kickstartds/base/lib/picture";
import { VisualContextDefault, VisualContext } from "@kickstartds/content/lib/visual";
import { StorytellingContextDefault, StorytellingContext } from "@kickstartds/content/lib/storytelling";
import { LinkContextDefault, LinkContext } from '@kickstartds/base/lib/link';

import { Page } from "../components/Page";
import SEO from "../components/Seo";

const WrappedLink = ({ href, ...props }) =>
  href && href.startsWith('/')
    ? <Link to={href} {...props} />
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
  } = page;

  console.log(props.pageContext.page);

  return (
    <>
      <SEO
        title={title} 
        description={description} 
        keywords={keywords}
        image={image && image.publicURL}
      />

      <LinkProvider>
        <PictureProvider>
          <StorytellingProvider>
            <VisualProvider>
              <Page {...page} />
            </VisualProvider>
          </StorytellingProvider>
        </PictureProvider>
      </LinkProvider>
    </>
  );
};

export default GatsbyPage;
